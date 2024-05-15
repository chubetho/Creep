import { hashify } from './utils/crypto'

export async function getFP() {
  const modules = await import('./modules')
  const fns = Object.values(modules).map(fn => fn())
  const result = await Promise.allSettled(fns)

  const promises = result.map((r) => {
    if (r.status === 'rejected')
      return undefined

    return hashify(r.value)
  })

  const hashes = await Promise.all(promises)
  const fp = await hashify(hashes)
  return fp
}