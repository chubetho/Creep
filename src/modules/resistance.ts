import { IS_BLINK, IS_GECKO, braveBrowser, getBraveMode } from '../utils/helpers'

export async function getResistance() {
  try {
    const data = {
      privacy: '',
      security: {} as Record<string, unknown>,
      mode: '',
      engine: IS_BLINK ? 'Blink' : IS_GECKO ? 'Gecko' : '',
    }
    // Firefox/Tor Browser
    const regex = (n: string) => new RegExp(`${n}+$`)
    const delay = (ms: number, baseNumber: number, baseDate?: number) => new Promise(resolve => setTimeout(() => {
      const date = baseDate || +new Date()
      // @ts-expect-error regex
      const value = regex(baseNumber).test(date) ? regex(baseNumber).exec(date)[0] : date
      return resolve(value)
    }, ms))
    const getTimerPrecision = async () => {
      const baseDate = +new Date()
      const baseNumber = +(`${baseDate}`).slice(-1)

      const a = await delay(0, baseNumber, baseDate)
      const b = await delay(1, baseNumber)
      const c = await delay(2, baseNumber)
      const d = await delay(3, baseNumber)
      const e = await delay(4, baseNumber)
      const f = await delay(5, baseNumber)
      const g = await delay(6, baseNumber)
      const h = await delay(7, baseNumber)
      const i = await delay(8, baseNumber)
      const j = await delay(9, baseNumber)

      const lastCharA = (`${a}`).slice(-1)
      const lastCharB = (`${b}`).slice(-1)
      const lastCharC = (`${c}`).slice(-1)
      const lastCharD = (`${d}`).slice(-1)
      const lastCharE = (`${e}`).slice(-1)
      const lastCharF = (`${f}`).slice(-1)
      const lastCharG = (`${g}`).slice(-1)
      const lastCharH = (`${h}`).slice(-1)
      const lastCharI = (`${i}`).slice(-1)
      const lastCharJ = (`${j}`).slice(-1)

      const protection = (
        lastCharA === lastCharB
        && lastCharA === lastCharC
        && lastCharA === lastCharD
        && lastCharA === lastCharE
        && lastCharA === lastCharF
        && lastCharA === lastCharG
        && lastCharA === lastCharH
        && lastCharA === lastCharI
        && lastCharA === lastCharJ
      )
      const baseLen = (`${a}`).length
      const collection = [a, b, c, d, e, f, g, h, i, j]
      return {
        protection,
        delays: collection.map(n => (`${n}`).length > baseLen ? (`${n}`).slice(-baseLen) : n),
        precision: protection ? Math.min(...collection.map(val => (`${val}`).length)) : undefined,
        precisionValue: protection ? lastCharA : undefined,
      }
    }

    const [
      isBrave,
      timerPrecision,
    ] = await Promise.all([
      braveBrowser(),
      IS_BLINK ? undefined : getTimerPrecision(),
    ])

    if (isBrave) {
      const braveMode = getBraveMode()
      data.privacy = 'Brave'
      data.security = {
        FileSystemWritableFileStream: 'FileSystemWritableFileStream' in window,
        Serial: 'Serial' in window,
        ReportingObserver: 'ReportingObserver' in window,
      }
      data.mode = braveMode.allow ? 'allow' : braveMode.standard ? 'standard' : braveMode.strict ? 'strict' : ''
    }

    const { protection } = timerPrecision || {}
    if (IS_GECKO && protection) {
      const features = {
        OfflineAudioContext: 'OfflineAudioContext' in window, // dom.webaudio.enabled
        WebGL2RenderingContext: 'WebGL2RenderingContext' in window, // webgl.enable-webgl2
        WebAssembly: 'WebAssembly' in window, // javascript.options.wasm
        maxTouchPoints: 'maxTouchPoints' in navigator,
        RTCRtpTransceiver: 'RTCRtpTransceiver' in window,
        MediaDevices: 'MediaDevices' in window,
        Credential: 'Credential' in window,
      }
      const featureKeys = Object.keys(features)
      const targetSet = new Set([
        'RTCRtpTransceiver',
        'MediaDevices',
        'Credential',
      ])
      const torBrowser = featureKeys.filter(key => targetSet.has(key) && !features[key as keyof typeof features]).length === targetSet.size
      const safer = !features.WebAssembly
      data.privacy = torBrowser ? 'Tor Browser' : 'Firefox'
      data.security = {
        reduceTimerPrecision: true,
        ...features,
      }
      data.mode = (
        !torBrowser
          ? 'resistFingerprinting'
          : safer
            ? 'safer'
            : 'standard'
      )
    }

    return data
  }
  catch (error) {

  }
}
