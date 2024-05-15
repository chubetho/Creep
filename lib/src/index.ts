import { hashify } from './utils/crypto'

export async function getFP() {
  const modules = await import('./modules')
  const fns = Object.values(modules).map(fn => fn())
  const results = await Promise.allSettled(fns)

  const hashes = await Promise.all(
    results
      .filter(r => r.status === 'fulfilled')
      .map(r => hashify((r as PromiseFulfilledResult<string>).value)),
  )

  return await hashify(hashes)
}
