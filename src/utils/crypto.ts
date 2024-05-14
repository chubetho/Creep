export function hashMini(x: any) {
  const json = `${JSON.stringify(x)}`
  const hash = json.split('').reduce((hash, _, i) => {
    return Math.imul(31, hash) + json.charCodeAt(i) | 0
  }, 0x811C9DC5)
  const str = `0000000${(hash >>> 0).toString(16)}`
  return str.substring(str.length - 8)
}

export const instanceId = (
  String.fromCharCode(Math.random() * 26 + 97)
  + Math.random().toString(36).slice(-7)
)

export async function hashify(x: any, algorithm = 'SHA-256') {
  const json = `${JSON.stringify(x)}`
  const jsonBuffer = new TextEncoder().encode(json)
  return crypto.subtle.digest(algorithm, jsonBuffer).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => (`00${b.toString(16)}`).slice(-2)).join('')
    return hashHex
  })
}
