/* eslint-disable new-cap */
/* eslint-disable no-new */
import { instanceId } from '../utils/crypto'
import { IS_BLINK } from '../utils/helpers'
import { PARENT_PHANTOM } from '../utils/lies'

const SYSTEM_FONTS = [
  'caption',
  'icon',
  'menu',
  'message-box',
  'small-caption',
  'status-bar',
]

const Platform = {
  WINDOWS: 'Windows',
  MAC: 'Mac',
  LINUX: 'Linux',
  ANDROID: 'Android',
  CHROME_OS: 'Chrome OS',
} as const

const GeckoFonts: Record<string, string> = {
  '-apple-system': Platform.MAC,
  'Segoe UI': Platform.WINDOWS,
  'Tahoma': Platform.WINDOWS,
  'Yu Gothic UI': Platform.WINDOWS,
  'Microsoft JhengHei UI': Platform.WINDOWS,
  'Microsoft YaHei UI': Platform.WINDOWS,
  'Meiryo UI': Platform.WINDOWS,
  'Cantarell': Platform.LINUX,
  'Ubuntu': Platform.LINUX,
  'Sans': Platform.LINUX,
  'sans-serif': Platform.LINUX,
  'Fira Sans': Platform.LINUX,
  'Roboto': Platform.ANDROID,
}

export async function getHeadlessFeatures() {
  try {
    const mimeTypes = Object.keys({ ...navigator.mimeTypes })

    const systemFonts = getSystemFonts()
    const { scores, highestScore, headlessEstimate } = getPlatformEstimate()

    interface Headless {
      chromium: boolean
      likeHeadless: Record<string, boolean>
      headless: Record<string, boolean>
      stealth: Record<string, boolean>
    }
    const data: Headless = {
      chromium: IS_BLINK,
      likeHeadless: {
        noChrome: IS_BLINK && !('chrome' in window),
        hasPermissionsBug: (
          IS_BLINK
          && 'permissions' in navigator
          && await (async () => {
					  const res = await navigator.permissions.query({ name: 'notifications' })
					  return (
					    res.state === 'prompt'
					    && 'Notification' in window
					    && Notification.permission === 'denied'
					  )
          })()
        ),
        noPlugins: IS_BLINK && navigator.plugins.length === 0,
        noMimeTypes: IS_BLINK && mimeTypes.length === 0,
        notificationIsDenied: (
          IS_BLINK
          && 'Notification' in window
          && (Notification.permission === 'denied')
        ),
        hasKnownBgColor: IS_BLINK && (() => {
          let rendered = PARENT_PHANTOM
          if (!PARENT_PHANTOM) {
            rendered = document.createElement('div')
            document.body.appendChild(rendered)
          }
          if (!rendered)
            return false
          rendered.setAttribute('style', `background-color: ActiveText`)
          const { backgroundColor: activeText } = getComputedStyle(rendered) || []
          if (!PARENT_PHANTOM)
            document.body.removeChild(rendered)

          return activeText === 'rgb(255, 0, 0)'
        })(),
        prefersLightColor: matchMedia('(prefers-color-scheme: light)').matches,
        uaDataIsBlank: (
          'userAgentData' in navigator && (
          // @ts-expect-error if userAgentData is null
            navigator.userAgentData?.platform === ''
            // @ts-expect-error if userAgentData is null
            || await navigator.userAgentData.getHighEntropyValues(['platform']).platform === ''
          )
        ),
        pdfIsDisabled: (
          'pdfViewerEnabled' in navigator && navigator.pdfViewerEnabled === false
        ),
        noTaskbar: (
          screen.height === screen.availHeight
          && screen.width === screen.availWidth
        ),
        hasVvpScreenRes: (
          (innerWidth === screen.width && outerHeight === screen.height) || (
            'visualViewport' in window
            // @ts-expect-error if unsupported
            && (visualViewport.width === screen.width && visualViewport.height === screen.height)
          )
        ),
        noWebShare: IS_BLINK && CSS.supports('accent-color: initial') && (
          !('share' in navigator) || !('canShare' in navigator)
        ),
        noContentIndex: !!headlessEstimate?.noContentIndex,
        noContactsManager: !!headlessEstimate?.noContactsManager,
        noDownlinkMax: !!headlessEstimate?.noDownlinkMax,
      },
      headless: {
        webDriverIsOn: (
          (CSS.supports('border-end-end-radius: initial') && navigator.webdriver === undefined)
          || !!navigator.webdriver
        ),
        hasHeadlessUA: (
          /HeadlessChrome/.test(navigator.userAgent)
          || /HeadlessChrome/.test(navigator.appVersion)
        ),
      },
      stealth: {
        hasIframeProxy: (() => {
          try {
            const iframe = document.createElement('iframe')
            iframe.srcdoc = instanceId
            return !!iframe.contentWindow
          }
          catch (error) {
            return true
          }
        })(),
        hasHighChromeIndex: (() => {
          const key = 'chrome'
          const highIndexRange = -50
          return (
            Object.keys(window).slice(highIndexRange).includes(key)
            && Object.getOwnPropertyNames(window).slice(highIndexRange).includes(key)
          )
        })(),
        hasBadChromeRuntime: (() => {
          // @ts-expect-error if unsupported
          if (!('chrome' in window && 'runtime' in chrome))
            return false

          try {
            // @ts-expect-error if unsupported
            if ('prototype' in chrome.runtime.sendMessage
            // @ts-expect-error if unsupported
              || 'prototype' in chrome.runtime.connect)
              return true

            // @ts-expect-error if unsupported
            new chrome.runtime.sendMessage()
            // @ts-expect-error if unsupported
            new chrome.runtime.connect()
            return true
          }
          catch (err: any) {
            return err.constructor.name !== 'TypeError'
          }
        })(),
      },
    }

    const { likeHeadless, headless, stealth } = data
    const likeHeadlessKeys = Object.keys(likeHeadless)
    const headlessKeys = Object.keys(headless)
    const stealthKeys = Object.keys(stealth)

    const likeHeadlessRating = +((likeHeadlessKeys.filter(key => likeHeadless[key]).length / likeHeadlessKeys.length) * 100).toFixed(0)
    const headlessRating = +((headlessKeys.filter(key => headless[key]).length / headlessKeys.length) * 100).toFixed(0)
    const stealthRating = +((stealthKeys.filter(key => stealth[key]).length / stealthKeys.length) * 100).toFixed(0)

    return {
      ...data,
      likeHeadlessRating,
      headlessRating,
      stealthRating,
      systemFonts,
      platformEstimate: [scores, highestScore],
    }
  }
  catch (error) {}
}

function getSystemFonts(): string {
  const { body } = document
  const el = document.createElement('div')
  body.appendChild(el)
  try {
    const systemFonts = String(
      [
        ...SYSTEM_FONTS.reduce((acc, font) => {
          el.setAttribute('style', `font: ${font} !important`)
          return acc.add(getComputedStyle(el).fontFamily)
        }, new Set()),
      ],
    )
    const geckoPlatform = GeckoFonts[systemFonts]
    return GeckoFonts[systemFonts] ? `${systemFonts}:${geckoPlatform}` : systemFonts
  }
  catch (error) {
    return ''
  }
  finally {
    body.removeChild(el)
  }
}

function getPlatformEstimate() {
  if (!IS_BLINK)
    return { store: {} as Record<string, number>, highestScore: 0, headlessEstimate: {} as Record<string, boolean> }
  const v80 = 'getVideoPlaybackQuality' in HTMLVideoElement.prototype
  const v81 = CSS.supports('color-scheme: initial')
  const v84 = CSS.supports('appearance: initial')
  const v86 = 'DisplayNames' in Intl
  const v88 = CSS.supports('aspect-ratio: initial')
  const v89 = CSS.supports('border-end-end-radius: initial')
  const v95 = 'randomUUID' in Crypto.prototype
  const hasBarcodeDetector = 'BarcodeDetector' in window
  // @ts-expect-error if not supported
  const hasDownlinkMax = 'downlinkMax' in (window.NetworkInformation?.prototype || {})
  const hasContentIndex = 'ContentIndex' in window
  const hasContactsManager = 'ContactsManager' in window
  const hasEyeDropper = 'EyeDropper' in window
  const hasFileSystemWritableFileStream = 'FileSystemWritableFileStream' in window
  const hasHid = 'HID' in window && 'HIDDevice' in window
  const hasSerialPort = 'SerialPort' in window && 'Serial' in window
  const hasSharedWorker = 'SharedWorker' in window
  const hasTouch = 'ontouchstart' in Window && 'TouchEvent' in window
  const hasAppBadge = 'setAppBadge' in Navigator.prototype

  const hasFeature = (version: boolean, condition: boolean) => {
    return (version ? [condition] : [])
  }
  const estimate: Record<string, boolean[]> = {
    [Platform.ANDROID]: [
      ...hasFeature(v88, hasBarcodeDetector),
      ...hasFeature(v84, hasContentIndex),
      ...hasFeature(v80, hasContactsManager),
      hasDownlinkMax,
      ...hasFeature(v95, !hasEyeDropper),
      ...hasFeature(v86, !hasFileSystemWritableFileStream),
      ...hasFeature(v89, !hasHid),
      ...hasFeature(v89, !hasSerialPort),
      !hasSharedWorker,
      hasTouch,
      ...hasFeature(v81, !hasAppBadge),
    ],
    [Platform.CHROME_OS]: [
      ...hasFeature(v88, hasBarcodeDetector),
      ...hasFeature(v84, !hasContentIndex),
      ...hasFeature(v80, !hasContactsManager),
      hasDownlinkMax,
      ...hasFeature(v95, hasEyeDropper),
      ...hasFeature(v86, hasFileSystemWritableFileStream),
      ...hasFeature(v89, hasHid),
      ...hasFeature(v89, hasSerialPort),
      hasSharedWorker,
      hasTouch || !hasTouch,
      ...hasFeature(v81, !hasAppBadge),
    ],
    [Platform.WINDOWS]: [
      ...hasFeature(v88, !hasBarcodeDetector),
      ...hasFeature(v84, !hasContentIndex),
      ...hasFeature(v80, !hasContactsManager),
      !hasDownlinkMax,
      ...hasFeature(v95, hasEyeDropper),
      ...hasFeature(v86, hasFileSystemWritableFileStream),
      ...hasFeature(v89, hasHid),
      ...hasFeature(v89, hasSerialPort),
      hasSharedWorker,
      hasTouch || !hasTouch,
      ...hasFeature(v81, hasAppBadge),
    ],
    [Platform.MAC]: [
      ...hasFeature(v88, hasBarcodeDetector),
      ...hasFeature(v84, !hasContentIndex),
      ...hasFeature(v80, !hasContactsManager),
      !hasDownlinkMax,
      ...hasFeature(v95, hasEyeDropper),
      ...hasFeature(v86, hasFileSystemWritableFileStream),
      ...hasFeature(v89, hasHid),
      ...hasFeature(v89, hasSerialPort),
      hasSharedWorker,
      !hasTouch,
      ...hasFeature(v81, hasAppBadge),
    ],
    [Platform.LINUX]: [
      ...hasFeature(v88, !hasBarcodeDetector),
      ...hasFeature(v84, !hasContentIndex),
      ...hasFeature(v80, !hasContactsManager),
      !hasDownlinkMax,
      ...hasFeature(v95, hasEyeDropper),
      ...hasFeature(v86, hasFileSystemWritableFileStream),
      ...hasFeature(v89, hasHid),
      ...hasFeature(v89, hasSerialPort),
      hasSharedWorker,
      !hasTouch || !hasTouch,
      ...hasFeature(v81, !hasAppBadge),
    ],
  }

  // Chrome only features
  const headlessEstimate: Record<string, boolean> = {
    noContentIndex: v84 && !hasContentIndex,
    noContactsManager: v80 && !hasContactsManager,
    noDownlinkMax: !hasDownlinkMax,
  }

  const scores = Object.keys(estimate).reduce((acc, key) => {
    const list = estimate[key]
    const score = +((list.filter(x => x).length / list.length).toFixed(2))
    acc[key] = score
    return acc
  }, {} as Record<string, number>)

  const platform = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b)
  const highestScore = scores[platform]

  return { scores, highestScore, headlessEstimate }
}
