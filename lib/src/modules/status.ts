const GIGABYTE = 1073741824 // bytes

function getClientLitter(): string[] {
  try {
    const iframe = document.createElement('iframe')
    document.body.appendChild(iframe)
    const iframeWindow = iframe.contentWindow
    const windowKeys = Object.getOwnPropertyNames(window)
    const iframeKeys = Object.getOwnPropertyNames(iframeWindow)
    document.body.removeChild(iframe)
    const clientKeys = windowKeys.filter(x => !iframeKeys.includes(x))
    return clientKeys
  }
  catch (error) {
    return []
  }
}

function getClientCode(): string[] {
  const limit = 50
  const names = Object.getOwnPropertyNames(window).slice(-limit)
  const [p1, p2] = (1).constructor.toString().split((1).constructor.name)
  const isEngine = (fn: unknown) => {
    return (
      typeof fn === 'function'
      && (`${fn}` === p1 + fn.name + p2 || `${fn}` === p1 + (fn.name || '').replace('get ', '') + p2)
    )
  }
  const isClient = (key: string) => {
    if (key.endsWith('_'))
      return true
    const d = Object.getOwnPropertyDescriptor(window, key)
    if (!d)
      return true
    return key === 'chrome' ? names.includes(key) : !isEngine(d.get || d.value)
  }
  return Object.keys(window)
    .slice(-limit)
    .filter(x => isClient(x))
}

async function getBattery() {
  if (!('getBattery' in navigator))
    return null
  // @ts-expect-error if not supported
  return navigator.getBattery()
}

async function getStorage() {
  if (!navigator?.storage?.estimate)
    return null
  return Promise.all([
    navigator.storage.estimate().then(({ quota }) => quota),
    new Promise((resolve) => {
      // @ts-expect-error if not supported
      navigator.webkitTemporaryStorage.queryUsageAndQuota((_, quota) => {
        resolve(quota)
      })
    }).catch(() => null),
  ]).then(([quota1, quota2]) => (quota2 || quota1) as number)
}

async function getScriptSize() {
  let url = null
  try {
    // @ts-expect-error if unsupported
    url = document?.currentScript?.src || import.meta.url
  }
  catch (error) { }

  if (!url)
    return null
  return fetch(url)
    .then(res => res.blob())
    .then(blob => blob.size)
    .catch(() => null)
}

export async function getStatus() {
  const [
    batteryInfo,
    quotaA,
    quotaB,
    scriptSize,
    clientLitter,
  ] = await Promise.all([
    getBattery(),
    getStorage(),
    getStorage(),
    getScriptSize(),
    [...new Set([...getClientLitter(), ...getClientCode()])].sort().slice(0, 50),
  ])

  // BatteryManager
  const {
    charging,
    chargingTime,
    dischargingTime,
    level,
  } = batteryInfo || {}

  // MemoryInfo
  // @ts-expect-error if not supported
  const memory = performance?.memory?.jsHeapSizeLimit || null
  const memoryInGigabytes = memory ? +(memory / GIGABYTE).toFixed(2) : null

  // StorageManager
  const quotaInGigabytes = quotaA ? +(+(quotaA) / GIGABYTE).toFixed(2) : null

  // Network Info
  const {
    downlink,
    effectiveType,
    rtt,
    saveData,
    downlinkMax,
    type,
    // @ts-expect-error if not supported
  } = navigator?.connection as NetworkInformation & {
    downlink?: number
    effectiveType?: string
    rtt?: number
    saveData?: boolean
    downlinkMax?: number
  } || {}

  const scripts: string[] = [
    ...document.querySelectorAll('script'),
  ].map(x => x.src.replace(/^https?:\/\//, '')).slice(0, 10)

  return {
    charging,
    chargingTime,
    dischargingTime,
    level,
    memory,
    memoryInGigabytes,
    quota: quotaA,
    quotaIsInsecure: quotaA !== quotaB,
    quotaInGigabytes,
    downlink,
    effectiveType,
    rtt,
    saveData,
    downlinkMax,
    type,
    clientLitter,
    scripts,
    scriptSize,
  }
}
