import { CSS_FONT_FAMILY, EMOJIS, USER_AGENT_OS } from '../utils/helpers'
import { html, patch } from '../utils/html'
import { PHANTOM_DARKNESS, getRandomValues } from '../utils/lies'
import { PlatformClassifier } from '../utils/types'

type FontMap = Record<string, string[]>
type FontVersion = Record<string, string | boolean | undefined>
function isFontOSBad(userAgentOS: string, fonts: string[]): boolean {
  if (!userAgentOS || !fonts || !fonts.length)
    return false

  const fontMap = fonts.reduce((acc, x) => {
    acc[x] = true
    return acc
  }, {} as Record<string, boolean>)

  const isLikeWindows = (
    'Cambria Math' in fontMap
    || 'Nirmala UI' in fontMap
    || 'Leelawadee UI' in fontMap
    || 'HoloLens MDL2 Assets' in fontMap
    || 'Segoe Fluent Icons' in fontMap
  )

  const isLikeApple = (
    'Helvetica Neue' in fontMap
    || 'Luminari' in fontMap
    || 'PingFang HK Light' in fontMap
    || 'InaiMathi Bold' in fontMap
    || 'Galvji' in fontMap
    || 'Chakra Petch' in fontMap
  )

  const isLikeLinux = (
    'Arimo' in fontMap
    || 'MONO' in fontMap
    || 'Ubuntu' in fontMap
    || 'Noto Color Emoji' in fontMap
    || 'Dancing Script' in fontMap
    || 'Droid Sans Mono' in fontMap
  )

  if (isLikeWindows && userAgentOS !== PlatformClassifier.WINDOWS)
    return true
	 else if (isLikeApple && userAgentOS !== PlatformClassifier.APPLE)
    return true
	 else if (isLikeLinux && userAgentOS !== PlatformClassifier.LINUX)
    return true

  return false
}

const WindowsFonts: FontMap = {
  // https://docs.microsoft.com/en-us/typography/fonts/windows_11_font_list
  7: [
    'Cambria Math',
    'Lucida Console',
  ],
  8: [
    'Aldhabi',
    'Gadugi',
    'Myanmar Text',
    'Nirmala UI',
  ],
  8.1: [
    'Leelawadee UI',
    'Javanese Text',
    'Segoe UI Emoji',
  ],
  10: [
    'HoloLens MDL2 Assets', // 10 (v1507) +
    'Segoe MDL2 Assets', // 10 (v1507) +
    'Bahnschrift', // 10 (v1709) +-
    'Ink Free', // 10 (v1803) +-
  ],
  11: ['Segoe Fluent Icons'],
}

const MacOSFonts: FontMap = {
  // Mavericks and below
  '10.9': [
    'Helvetica Neue',
    'Geneva', // mac (not iOS)
  ],
  // Yosemite
  '10.10': [
    'Kohinoor Devanagari Medium',
    'Luminari',
  ],
  // El Capitan
  '10.11': [
    'PingFang HK Light',
  ],
  // Sierra: https://support.apple.com/en-ie/HT206872
  '10.12': [
    'American Typewriter Semibold',
    'Futura Bold',
    'SignPainter-HouseScript Semibold',
  ],
  // High Sierra: https://support.apple.com/en-me/HT207962
  // Mojave: https://support.apple.com/en-us/HT208968
  '10.13-10.14': [
    'InaiMathi Bold',
  ],
  // Catalina: https://support.apple.com/en-us/HT210192
  // Big Sur: https://support.apple.com/en-sg/HT211240
  '10.15-11': [
    'Galvji',
    'MuktaMahee Regular',
  ],
  // Monterey: https://support.apple.com/en-us/HT212587
  '12': [
    'Noto Sans Gunjala Gondi Regular',
    'Noto Sans Masaram Gondi Regular',
    'Noto Serif Yezidi Regular',
  ],
  // Ventura: https://support.apple.com/en-us/HT213266
  '13': [
    'Apple SD Gothic Neo ExtraBold',
    'STIX Two Math Regular',
    'STIX Two Text Regular',
    'Noto Sans Canadian Aboriginal Regular',
  ],
}

const DesktopAppFonts: FontMap = {
  // docs.microsoft.com/en-us/typography/font-list/ms-outlook
  'Microsoft Outlook': ['MS Outlook'],
  // https://community.adobe.com/t5/postscript-discussions/zwadobef-font/m-p/3730427#M785
  'Adobe Acrobat': ['ZWAdobeF'],
  // https://wiki.documentfoundation.org/Fonts
  'LibreOffice': [
    'Amiri',
    'KACSTOffice',
    'Liberation Mono',
    'Source Code Pro',
  ],
  // https://superuser.com/a/611804
  'OpenOffice': [
    'DejaVu Sans',
    'Gentium Book Basic',
    'OpenSymbol',
  ],
}

const APPLE_FONTS = Object.keys(MacOSFonts).map(key => MacOSFonts[key]).flat()
const WINDOWS_FONTS = Object.keys(WindowsFonts).map(key => WindowsFonts[key]).flat()
const DESKTOP_APP_FONTS = Object.keys(DesktopAppFonts).map(key => DesktopAppFonts[key]).flat()

const LINUX_FONTS = [
  'Arimo', // ubuntu, chrome os
  'Chilanka', // ubuntu (not TB)
  'Cousine', // ubuntu, chrome os
  'Jomolhari', // chrome os
  'MONO', // ubuntu, chrome os (not TB)
  'Noto Color Emoji', // Linux
  'Ubuntu', // ubuntu (not TB)
]
const ANDROID_FONTS = [
  'Dancing Script', // android
  'Droid Sans Mono', // Android
  'Roboto', // Android, Chrome OS
]

const FONT_LIST = [
  ...APPLE_FONTS,
  ...WINDOWS_FONTS,
  ...LINUX_FONTS,
  ...ANDROID_FONTS,
  ...DESKTOP_APP_FONTS,
].sort()

export async function getFont() {
  const getPixelEmojis = ({ doc, id, emojis }: { doc: Document, id: string, emojis: string[] }) => {
    try {
      patch(doc.getElementById(id), html`
				<div id="pixel-emoji-container">
				<style>
					.pixel-emoji {
						font-family: ${CSS_FONT_FAMILY};
						font-size: 200px !important;
						height: auto;
						position: absolute !important;
						transform: scale(1.000999);
					}
					</style>
					${
						emojis.map((emoji: string) => {
							return `<div class="pixel-emoji">${emoji}</div>`
						}).join('')
					}
				</div>
			`)

      // get emoji set and system
      const getEmojiDimensions = (style?: CSSStyleDeclaration) => {
        return {
          width: style?.inlineSize,
          height: style?.blockSize,
        }
      }

      const pattern = new Set<string>()
      const emojiElems = [...doc.getElementsByClassName('pixel-emoji')]
      const emojiSet = emojiElems.reduce((emojiSet, el, i) => {
        const style = getComputedStyle(el)
        const emoji = emojis[i]
        const { height, width } = getEmojiDimensions(style)
        const dimensions = `${width},${height}`
        if (!pattern.has(dimensions)) {
          pattern.add(dimensions)
          emojiSet.add(emoji)
        }
        return emojiSet
      }, new Set<string>())

      const pixelToNumber = (pixels: string) => +(pixels.replace('px', ''))
      const pixelSizeSystemSum = 0.00001 * [...pattern].map((x) => {
        return x.split(',').map(x => pixelToNumber(x)).reduce((acc, x) => acc += (+x || 0), 0)
      }).reduce((acc, x) => acc += x, 0)

      const container = doc.getElementById('pixel-emoji-container')
      container && doc.body.removeChild(container)

      return {
        emojiSet: [...emojiSet],
        pixelSizeSystemSum,
      }
    }
    catch (error) {
      console.error(error)
      return {
        emojiSet: [],
        pixelSizeSystemSum: 0,
      }
    }
  }

  const getFontFaceLoadFonts = async (fontList: string[]) => {
    try {
      let fontsChecked: string[] = []
      if (!document.fonts.check(`0px "${getRandomValues()}"`)) {
        fontsChecked = fontList.reduce((acc, font) => {
          const found = document.fonts.check(`0px "${font}"`)
          if (found)
            acc.push(font)
          return acc
        }, [] as string[])
      }
      const fontFaceList = fontList.map(font => new FontFace(font, `local("${font}")`))
      const responseCollection = await Promise
        .allSettled(fontFaceList.map(font => font.load()))
      const fontsLoaded = responseCollection.reduce((acc, font) => {
        if (font.status === 'fulfilled')
          acc.push(font.value.family)

        return acc
      }, [] as string[])
      return [...new Set([...fontsChecked, ...fontsLoaded])].sort()
    }
    catch (error) {
      console.error(error)
      return []
    }
  }

  const getPlatformVersion = (fonts: string[]) => {
    const getWindows = ({ fonts, fontMap }: { fonts: string[], fontMap: FontMap }) => {
      const fontVersion: FontVersion = {
        11: fontMap['11'].find(x => fonts.includes(x)),
        10: fontMap['10'].find(x => fonts.includes(x)),
        8.1: fontMap['8.1'].find(x => fonts.includes(x)),
        8: fontMap['8'].find(x => fonts.includes(x)),
        7: fontMap['7'].filter(x => fonts.includes(x)).length === fontMap['7'].length,
      }
      const hash = (
        `${Object.keys(fontVersion).sort().filter(key => !!fontVersion[key])}`
      )
      const hashMap: Record<string, string> = {
        '10,11,7,8,8.1': '11',
        '10,7,8,8.1': '10',
        '7,8,8.1': '8.1',
        '11,7,8,8.1': '8.1', // missing 10
        '7,8': '8',
        '10,7,8': '8', // missing 8.1
        '10,11,7,8': '8', // missing 8.1
        '7': '7',
        '7,8.1': '7',
        '10,7,8.1': '7', // missing 8
        '10,11,7,8.1': '7', // missing 8
      }
      const version = hashMap[hash]
      return version ? `Windows ${version}` : undefined
    }

    const getMacOS = ({ fonts, fontMap }: { fonts: string[], fontMap: FontMap }) => {
      const fontVersion: FontVersion = {
        '13': fontMap['13'].find(x => fonts.includes(x)),
        '12': fontMap['12'].find(x => fonts.includes(x)),
        '10.15-11': fontMap['10.15-11'].find(x => fonts.includes(x)),
        '10.13-10.14': fontMap['10.13-10.14'].find(x => fonts.includes(x)),
        '10.12': fontMap['10.12'].find(x => fonts.includes(x)),
        '10.11': fontMap['10.11'].find(x => fonts.includes(x)),
        '10.10': fontMap['10.10'].find(x => fonts.includes(x)),
        // require complete set of 10.9 fonts
        '10.9': fontMap['10.9'].filter(x => fonts.includes(x)).length === fontMap['10.9'].length,
      }
      const hash = (
        `${Object.keys(fontVersion).sort().filter(key => !!fontVersion[key])}`
      )
      const hashMap: Record<string, string> = {
        '10.10,10.11,10.12,10.13-10.14,10.15-11,10.9,12,13': 'Ventura',
        '10.10,10.11,10.12,10.13-10.14,10.15-11,10.9,12': 'Monterey',
        '10.10,10.11,10.12,10.13-10.14,10.15-11,10.9': '10.15-11',
        '10.10,10.11,10.12,10.13-10.14,10.9': '10.13-10.14',
        '10.10,10.11,10.12,10.9': 'Sierra', // 10.12
        '10.10,10.11,10.9': 'El Capitan', // 10.11
        '10.10,10.9': 'Yosemite', // 10.10
        '10.9': 'Mavericks', // 10.9
      }
      const version = hashMap[hash]
      return version ? `macOS ${version}` : undefined
    }

    return (
      getWindows({ fonts, fontMap: WindowsFonts })
      || getMacOS({ fonts, fontMap: MacOSFonts })
    )
  }

  const getDesktopApps = (fonts: string[]) => {
    const apps = Object.keys(DesktopAppFonts).reduce((acc, key) => {
      const appFontSet = DesktopAppFonts[key]
      const match = appFontSet.filter(x => fonts.includes(x)).length === appFontSet.length
      return match ? [...acc, key] : acc
    }, [] as string[])
    return apps
  }

  try {
    const doc = (
      PHANTOM_DARKNESS
      && PHANTOM_DARKNESS.document
      && PHANTOM_DARKNESS.document.body
        ? PHANTOM_DARKNESS.document
        : document
    )
    const id = `font-fingerprint`
    const div = doc.createElement('div')
    div.setAttribute('id', id)
    doc.body.appendChild(div)

    const {
      emojiSet,
      pixelSizeSystemSum,
    } = getPixelEmojis({
      doc,
      id,
      emojis: EMOJIS,
    }) || {}

    const fontList = FONT_LIST
    const fontFaceLoadFonts = await getFontFaceLoadFonts(fontList)
    const platformVersion = getPlatformVersion(fontFaceLoadFonts)
    const apps = getDesktopApps(fontFaceLoadFonts)

    return {
      fontFaceLoadFonts,
      platformVersion,
      apps,
      emojiSet,
      pixelSizeSystemSum,
      isFontOsBad: isFontOSBad(USER_AGENT_OS, fontFaceLoadFonts),
    }
  }
  catch (error) {
  }
}
