export function hashMini(x: any) {
  const json = `${JSON.stringify(x)}`
  const hash = json.split('').reduce((hash, _, i) => {
    return Math.imul(31, hash) + json.charCodeAt(i) | 0
  }, 0x811C9DC5)
  const str = `0000000${(hash >>> 0).toString(16)}`
  return str.substring(str.length - 8)
}
