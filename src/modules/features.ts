import { IS_BLINK, IS_GECKO } from '../utils/helpers'
import { PHANTOM_DARKNESS } from '../utils/lies'

const BROWSER = (
  IS_BLINK ? 'Chrome' : IS_GECKO ? 'Firefox' : ''
)

function getEngineMaps(browser: string) {
  // Blink
  const blinkJS = {
    '76': ['Document.onsecuritypolicyviolation', 'Promise.allSettled'],
    '77': ['Document.onformdata', 'Document.onpointerrawupdate'],
    '78': ['Element.elementTiming'],
    '79': ['Document.onanimationend', 'Document.onanimationiteration', 'Document.onanimationstart', 'Document.ontransitionend'],
    '80': ['!Document.registerElement', '!Element.createShadowRoot', '!Element.getDestinationInsertionPoints'],
    '81': ['Document.onwebkitanimationend', 'Document.onwebkitanimationiteration', 'Document.onwebkitanimationstart', 'Document.onwebkittransitionend', 'Element.ariaAtomic', 'Element.ariaAutoComplete', 'Element.ariaBusy', 'Element.ariaChecked', 'Element.ariaColCount', 'Element.ariaColIndex', 'Element.ariaColSpan', 'Element.ariaCurrent', 'Element.ariaDisabled', 'Element.ariaExpanded', 'Element.ariaHasPopup', 'Element.ariaHidden', 'Element.ariaKeyShortcuts', 'Element.ariaLabel', 'Element.ariaLevel', 'Element.ariaLive', 'Element.ariaModal', 'Element.ariaMultiLine', 'Element.ariaMultiSelectable', 'Element.ariaOrientation', 'Element.ariaPlaceholder', 'Element.ariaPosInSet', 'Element.ariaPressed', 'Element.ariaReadOnly', 'Element.ariaRelevant', 'Element.ariaRequired', 'Element.ariaRoleDescription', 'Element.ariaRowCount', 'Element.ariaRowIndex', 'Element.ariaRowSpan', 'Element.ariaSelected', 'Element.ariaSort', 'Element.ariaValueMax', 'Element.ariaValueMin', 'Element.ariaValueNow', 'Element.ariaValueText', 'Intl.DisplayNames'],
    '83': ['Element.ariaDescription', 'Element.onbeforexrselect'],
    '84': ['Document.getAnimations', 'Document.timeline', 'Element.ariaSetSize', 'Element.getAnimations'],
    '85': ['Promise.any', 'String.replaceAll'],
    '86': ['Document.fragmentDirective', 'Document.replaceChildren', 'Element.replaceChildren', '!Atomics.wake'],
    '87-89': ['Atomics.waitAsync', 'Document.ontransitioncancel', 'Document.ontransitionrun', 'Document.ontransitionstart', 'Intl.Segmenter'],
    '90': ['Document.onbeforexrselect', 'RegExp.hasIndices', '!Element.onbeforexrselect'],
    '91': ['Element.getInnerHTML'],
    '92': ['Array.at', 'String.at'],
    '93': ['Error.cause', 'Object.hasOwn'],
    '94': ['!Error.cause', 'Object.hasOwn'],
    '95-96': ['WebAssembly.Exception', 'WebAssembly.Tag'],
    '97-98': ['Array.findLast', 'Array.findLastIndex', 'Document.onslotchange'],
    '99-101': ['Intl.supportedValuesOf', 'Document.oncontextlost', 'Document.oncontextrestored'],
    '102': ['Element.ariaInvalid', 'Document.onbeforematch'],
    '103-106': ['Element.role'],
    '107-109': ['Element.ariaBrailleLabel', 'Element.ariaBrailleRoleDescription'],
    '110': ['Array.toReversed', 'Array.toSorted', 'Array.toSpliced', 'Array.with'],
    '111': ['String.isWellFormed', 'String.toWellFormed', 'Document.startViewTransition'],
    '112-113': ['RegExp.unicodeSets'],
    '114-115': ['JSON.rawJSON', 'JSON.isRawJSON'],
  }

  const blinkCSS = {
    '76': ['backdrop-filter'],
    '77-80': ['overscroll-behavior-block', 'overscroll-behavior-inline'],
    '81': ['color-scheme', 'image-orientation'],
    '83': ['contain-intrinsic-size'],
    '84': ['appearance', 'ruby-position'],
    '85-86': ['content-visibility', 'counter-set', 'inherits', 'initial-value', 'page-orientation', 'syntax'],
    '87': ['ascent-override', 'border-block', 'border-block-color', 'border-block-style', 'border-block-width', 'border-inline', 'border-inline-color', 'border-inline-style', 'border-inline-width', 'descent-override', 'inset', 'inset-block', 'inset-block-end', 'inset-block-start', 'inset-inline', 'inset-inline-end', 'inset-inline-start', 'line-gap-override', 'margin-block', 'margin-inline', 'padding-block', 'padding-inline', 'text-decoration-thickness', 'text-underline-offset'],
    '88': ['aspect-ratio'],
    '89': ['border-end-end-radius', 'border-end-start-radius', 'border-start-end-radius', 'border-start-start-radius', 'forced-color-adjust'],
    '90': ['overflow-clip-margin'],
    '91': ['additive-symbols', 'fallback', 'negative', 'pad', 'prefix', 'range', 'speak-as', 'suffix', 'symbols', 'system'],
    '92': ['size-adjust'],
    '93': ['accent-color'],
    '94': ['scrollbar-gutter'],
    '95-96': ['app-region', 'contain-intrinsic-block-size', 'contain-intrinsic-height', 'contain-intrinsic-inline-size', 'contain-intrinsic-width'],
    '97-98': ['font-synthesis-small-caps', 'font-synthesis-style', 'font-synthesis-weight', 'font-synthesis'],
    '99-100': ['text-emphasis-color', 'text-emphasis-position', 'text-emphasis-style', 'text-emphasis'],
    '101-103': ['font-palette', 'base-palette', 'override-colors'],
    '104': ['object-view-box'],
    '105': ['container-name', 'container-type', 'container'],
    '106-107': ['hyphenate-character'],
    '108': ['hyphenate-character', '!orientation', '!max-zoom', '!min-zoom', '!user-zoom'],
    '109': ['hyphenate-limit-chars', 'math-depth', 'math-shift', 'math-style'],
    '110': ['initial-letter'],
    '111-113': ['baseline-source', 'font-variant-alternates', 'view-transition-name'],
    '114-115': ['text-wrap', 'white-space-collapse'],
  }

  const blinkWindow = {
    '80': ['CompressionStream', 'DecompressionStream', 'FeaturePolicy', 'FragmentDirective', 'PeriodicSyncManager', 'VideoPlaybackQuality'],
    '81': ['SubmitEvent', 'XRHitTestResult', 'XRHitTestSource', 'XRRay', 'XRTransientInputHitTestResult', 'XRTransientInputHitTestSource'],
    '83': ['BarcodeDetector', 'XRDOMOverlayState', 'XRSystem'],
    '84': ['AnimationPlaybackEvent', 'AnimationTimeline', 'CSSAnimation', 'CSSTransition', 'DocumentTimeline', 'FinalizationRegistry', 'LayoutShiftAttribution', 'ResizeObserverSize', 'WakeLock', 'WakeLockSentinel', 'WeakRef', 'XRLayer'],
    '85': ['AggregateError', 'CSSPropertyRule', 'EventCounts', 'XRAnchor', 'XRAnchorSet'],
    '86': ['RTCEncodedAudioFrame', 'RTCEncodedVideoFrame'],
    '87': ['CookieChangeEvent', 'CookieStore', 'CookieStoreManager', 'Scheduling'],
    '88': ['Scheduling', '!BarcodeDetector'],
    '89': ['ReadableByteStreamController', 'ReadableStreamBYOBReader', 'ReadableStreamBYOBRequest', 'ReadableStreamDefaultController', 'XRWebGLBinding'],
    '90': ['AbstractRange', 'CustomStateSet', 'NavigatorUAData', 'XRCPUDepthInformation', 'XRDepthInformation', 'XRLightEstimate', 'XRLightProbe', 'XRWebGLDepthInformation'],
    '91': ['CSSCounterStyleRule', 'GravitySensor', 'NavigatorManagedData'],
    '92': ['CSSCounterStyleRule', '!SharedArrayBuffer'],
    '93': ['WritableStreamDefaultController'],
    '94': ['AudioData', 'AudioDecoder', 'AudioEncoder', 'EncodedAudioChunk', 'EncodedVideoChunk', 'IdleDetector', 'ImageDecoder', 'ImageTrack', 'ImageTrackList', 'VideoColorSpace', 'VideoDecoder', 'VideoEncoder', 'VideoFrame', 'MediaStreamTrackGenerator', 'MediaStreamTrackProcessor', 'Profiler', 'VirtualKeyboard', 'DelegatedInkTrailPresenter', 'Ink', 'Scheduler', 'TaskController', 'TaskPriorityChangeEvent', 'TaskSignal', 'VirtualKeyboardGeometryChangeEvent'],
    '95-96': ['URLPattern'],
    '97-98': ['WebTransport', 'WebTransportBidirectionalStream', 'WebTransportDatagramDuplexStream', 'WebTransportError'],
    '99': ['CanvasFilter', 'CSSLayerBlockRule', 'CSSLayerStatementRule'],
    '100': ['CSSMathClamp'],
    '101-104': ['CSSFontPaletteValuesRule'],
    '105-106': ['CSSContainerRule'],
    '107-108': ['XRCamera'],
    '109': ['MathMLElement'],
    '110': ['AudioSinkInfo'],
    '111-112': ['ViewTransition'],
    '113-115': ['ViewTransition', '!CanvasFilter'],
  }

  // Gecko
  const geckoJS = {
    '71': ['Promise.allSettled'],
    '72-73': ['Document.onformdata', 'Element.part'],
    '74': ['!Array.toSource', '!Boolean.toSource', '!Date.toSource', '!Error.toSource', '!Function.toSource', '!Intl.toSource', '!JSON.toSource', '!Math.toSource', '!Number.toSource', '!Object.toSource', '!RegExp.toSource', '!String.toSource', '!WebAssembly.toSource'],
    '75-76': ['Document.getAnimations', 'Document.timeline', 'Element.getAnimations', 'Intl.Locale'],
    '77': ['String.replaceAll'],
    '78': ['Atomics.add', 'Atomics.and', 'Atomics.compareExchange', 'Atomics.exchange', 'Atomics.isLockFree', 'Atomics.load', 'Atomics.notify', 'Atomics.or', 'Atomics.store', 'Atomics.sub', 'Atomics.wait', 'Atomics.wake', 'Atomics.xor', 'Document.replaceChildren', 'Element.replaceChildren', 'Intl.ListFormat', 'RegExp.dotAll'],
    '79-84': ['Promise.any'],
    '85': ['!Document.onshow', 'Promise.any'],
    '86': ['Intl.DisplayNames'],
    '87': ['Document.onbeforeinput'],
    '88-89': ['RegExp.hasIndices'],
    '90-91': ['Array.at', 'String.at'],
    '92': ['Object.hasOwn'],
    '93-99': ['Intl.supportedValuesOf', 'Document.onsecuritypolicyviolation', 'Document.onslotchange'],
    '100': ['WebAssembly.Tag', 'WebAssembly.Exception'],
    '101-103': ['Document.adoptedStyleSheets'],
    '104-108': ['Array.findLast', 'Array.findLastIndex'],
    '109-112': ['Document.onscrollend'],
  }
  const geckoCSS = {
    '71': ['-moz-column-span'],
    '72': ['offset', 'offset-anchor', 'offset-distance', 'offset-path', 'offset-rotate', 'rotate', 'scale', 'translate'],
    '73': ['overscroll-behavior-block', 'overscroll-behavior-inline'],
    '74-79': ['!-moz-stack-sizing', 'text-underline-position'],
    '80-88': ['appearance'],
    '89-90': ['!-moz-outline-radius', '!-moz-outline-radius-bottomleft', '!-moz-outline-radius-bottomright', '!-moz-outline-radius-topleft', '!-moz-outline-radius-topright', 'aspect-ratio'],
    '91': ['tab-size'],
    '92-95': ['accent-color'],
    '96': ['color-scheme'],
    '97': ['print-color-adjust', 'scrollbar-gutter', 'd'],
    '98-101': ['hyphenate-character'],
    '102': ['overflow-clip-margin'],
    '103-106': ['scroll-snap-stop'],
    '107-108': ['backdrop-filter', 'font-palette', 'contain-intrinsic-block-size', 'contain-intrinsic-height', 'contain-intrinsic-inline-size', 'contain-intrinsic-width', 'contain-intrinsic-size'],
    '109': ['-webkit-clip-path'],
    '110': ['container-type', 'container-name', 'page', 'container'],
    '111': ['font-synthesis-small-caps', 'font-synthesis-style', 'font-synthesis-weight'],
    '112': ['font-synthesis-small-caps', '!-moz-image-region'],
  }

  const geckoWindow = {
    '71': ['MathMLElement', '!SVGZoomAndPan'],
    '72-73': ['!BatteryManager', 'FormDataEvent', 'Geolocation', 'GeolocationCoordinates', 'GeolocationPosition', 'GeolocationPositionError', '!mozPaintCount'],
    '74': ['FormDataEvent', '!uneval'],
    '75': ['AnimationTimeline', 'CSSAnimation', 'CSSTransition', 'DocumentTimeline', 'SubmitEvent'],
    '76-77': ['AudioParamMap', 'AudioWorklet', 'AudioWorkletNode', 'Worklet'],
    '78': ['Atomics'],
    '79-81': ['AggregateError', 'FinalizationRegistry'],
    '82': ['MediaMetadata', 'MediaSession', 'Sanitizer'],
    '83': ['MediaMetadata', 'MediaSession', '!Sanitizer'],
    '84': ['PerformancePaintTiming'],
    '85-86': ['PerformancePaintTiming', '!HTMLMenuItemElement', '!onshow'],
    '87': ['onbeforeinput'],
    '88': ['onbeforeinput', '!VisualViewport'],
    '89-92': ['!ondevicelight', '!ondeviceproximity', '!onuserproximity'],
    '93-95': ['ElementInternals'],
    '96': ['Lock', 'LockManager'],
    '97': ['CSSLayerBlockRule', 'CSSLayerStatementRule'],
    '98': ['HTMLDialogElement'],
    '99': ['NavigationPreloadManager'],
    '100-104': ['WritableStream'],
    '105-106': ['TextDecoderStream', 'OffscreenCanvasRenderingContext2D', 'OffscreenCanvas', 'TextEncoderStream'],
    '107-109': ['CSSFontPaletteValuesRule'],
    '110': ['CSSContainerRule'],
    '111': ['FileSystemFileHandle', 'FileSystemDirectoryHandle'],
    '112': ['FileSystemFileHandle', '!U2F'],
  }

  const IS_BLINK = browser === 'Chrome'
  const IS_GECKO = browser === 'Firefox'
  const css = (
    IS_BLINK ? blinkCSS : IS_GECKO ? geckoCSS : {}
  )
  const win = (
    IS_BLINK ? blinkWindow : IS_GECKO ? geckoWindow : {}
  )
  const js = (
    IS_BLINK ? blinkJS : IS_GECKO ? geckoJS : {}
  )
  return {
    css,
    win,
    js,
  }
}

function getJSCoreFeatures(win: Record<string, any>) {
  const globalObjects = [
    'Object',
    'Function',
    'Boolean',
    'Symbol',
    'Error',
    'Number',
    'BigInt',
    'Math',
    'Date',
    'String',
    'RegExp',
    'Array',
    'Map',
    'Set',
    'WeakMap',
    'WeakSet',
    'Atomics',
    'JSON',
    'Promise',
    'Reflect',
    'Proxy',
    'Intl',
    'WebAssembly',
    'Document',
    'Element',
  ]
  try {
    const features = globalObjects.reduce((acc, name) => {
      const ignore = ['name', 'length', 'constructor', 'prototype', 'arguments', 'caller']
      const descriptorKeys = Object.keys(Object.getOwnPropertyDescriptors(win[name] || {}))
      const descriptorProtoKeys = Object.keys(Object.getOwnPropertyDescriptors((win[name] || {}).prototype || {}))
      const uniques = [...new Set([...descriptorKeys, ...descriptorProtoKeys].filter(key => !ignore.includes(key)))]
      const keys = uniques.map(key => `${name}.${key}`)
      return [...acc, ...keys]
    }, [] as string[])
    return features
  }
  catch (error) {
    console.error(error)
    return []
  }
}

function versionSort(x: Array<string>) {
  return x.sort((a, b) => {
    const _a = /\d+/.exec(a)?.[0] ?? '0'
    const _b = /\d+/.exec(b)?.[0] ?? '0'
    return +_a - +_b
  }).reverse()
}

export async function getFeatures() {
  try {
    const win = PHANTOM_DARKNESS || window
    const jsFeaturesKeys = getJSCoreFeatures(win)
    const isNative = (win: any, x: string) => (
      /\[native code\]/.test(`${win[x]}`)
      && 'prototype' in win[x]
      && win[x].prototype.constructor.name === x
    )

    const getFeatures = ({ context, engineMap, checkNative = false }: { context: Window, engineMap: Record<string, string[]>, checkNative?: boolean }) => {
      const features = new Set<string>()
      const match = Object.keys(engineMap || {}).reduce((acc, key) => {
        const version = engineMap[key]
        const versionLen = version.length
        const featureLen = version.filter((prop) => {
          const removedFromVersion = prop.charAt(0) === '!'
          if (removedFromVersion)
            return features.add(prop)

          return (
            (checkNative ? isNative(context, prop) : true)
            && features.add(prop)
          )
        }).length
        return versionLen === featureLen ? [...acc, key] : acc
      }, [] as string[])
      const version = versionSort(match)[0]
      return {
        version,
        features,
      }
    }

    // engine maps
    const {
      css: engineMapCSS,
      win: engineMapWindow,
      js: engineMapJS,
    } = getEngineMaps(BROWSER)

    // css version
    const {
      version: cssVersion,
      features: cssFeatures,
    } = getFeatures({
      context: win,
      engineMap: engineMapCSS,
    })

    // window version
    const {
      version: windowVersion,
      features: windowFeatures,
    } = getFeatures({
      context: win,
      engineMap: engineMapWindow,
      checkNative: true,
    })

    // js version
    const {
      version: jsVersion,
      features: jsFeatures,
    } = getFeatures({
      context: win,
      engineMap: engineMapJS,
    })

    // determine version based on 3 factors
    const getVersionFromRange = (range: string[], versionCollection: string[]) => {
      const exactVersion = versionCollection.find(version => version && !/-/.test(version))
      if (exactVersion)
        return exactVersion

      const len = range.length
      const first = range[0]
      const last = range[len - 1]
      return (
        !len
          ? ''
          : len === 1
            ? first
            : `${last}-${first}`
      )
    }
    const versionSet = new Set([
      cssVersion,
      windowVersion,
      jsVersion,
    ])
    versionSet.delete(undefined!)
    const versionRange = versionSort(
      [...versionSet].reduce((acc, x) => [...acc, ...x.split('-')], [] as string[]),
    )
    const version = getVersionFromRange(versionRange, [cssVersion, windowVersion, jsVersion])

    return {
      versionRange,
      version,
      cssVersion,
      windowVersion,
      jsVersion,
      cssFeatures: [...cssFeatures],
      windowFeatures: [...windowFeatures],
      jsFeatures: [...jsFeatures],
      jsFeaturesKeys,
    }
  }
  catch (error) {
  }
}
