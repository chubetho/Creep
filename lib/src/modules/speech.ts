import { Analysis, IS_BLINK, LowerEntropy } from '../utils/helpers'

export async function getSpeech() {
  // Don't run voice immediately. This is unstable
  // wait a bit for services to load
  await new Promise(resolve => setTimeout(() => resolve(undefined), 50))
  return new Promise((resolve) => {
    try {
      // use window since iframe is unstable in FF
      const supported = 'speechSynthesis' in window
      supported && speechSynthesis.getVoices() // warm up
      if (!supported)
        return resolve(null)

      const giveUpOnVoices = setTimeout(() => {
        return resolve(null)
      }, 300)

      const getVoices = () => {
        const data = speechSynthesis.getVoices() ?? []
        const localServiceDidLoad = data.find(x => x.localService)
        if (!data.length || (IS_BLINK && !localServiceDidLoad))
          return

        clearTimeout(giveUpOnVoices)

        // filter first occurrence of unique voiceURI data
        const getUniques = (
          data: SpeechSynthesisVoice[],
          voiceURISet: Set<string>,
        ): SpeechSynthesisVoice[] => data
          .filter((x) => {
            const { voiceURI } = x
            if (!voiceURISet.has(voiceURI)) {
              voiceURISet.add(voiceURI)
              return true
            }
            return false
          })

        const dataUnique = getUniques(data, new Set())

        // https://wicg.github.io/speech-api/#speechsynthesisvoice-attributes
        const local = dataUnique.filter(x => x.localService).map(x => x.name)
        const remote = dataUnique.filter(x => !x.localService).map(x => x.name)
        const languages = [...new Set(dataUnique.map(x => x.lang))]
        const defaultLocalVoices = dataUnique.filter(x => x.default && x.localService)

        let defaultVoiceName = ''
        let defaultVoiceLang = ''
        if (defaultLocalVoices.length === 1) {
          const { name, lang } = defaultLocalVoices[0]
          defaultVoiceName = name
          defaultVoiceLang = (lang || '').replace(/_/, '-')
        }

        const { locale: localeLang } = Intl.DateTimeFormat().resolvedOptions()
        if (defaultVoiceLang
          && defaultVoiceLang.split('-')[0] !== localeLang.split('-')[0]) {
          // this is not trash
          Analysis.voiceLangMismatch = true
          LowerEntropy.TIME_ZONE = true
        }

        return resolve({
          local,
          remote,
          languages,
          defaultVoiceName,
          defaultVoiceLang,
        })
      }

      getVoices()
      if (speechSynthesis.addEventListener)
        return speechSynthesis.addEventListener('voiceschanged', getVoices)

      speechSynthesis.onvoiceschanged = getVoices
    }
    catch (error) {
      return resolve(null)
    }
  })
}
