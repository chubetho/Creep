import { IS_GECKO } from '../utils/helpers'
import { PHANTOM_DARKNESS } from '../utils/lies'

export function getWindow() {
  try {
    const win = PHANTOM_DARKNESS || window
    let keys = Object.getOwnPropertyNames(win)
      .filter(key => !/_|\d{3,}/.test(key)) // clear out known ddg noise

    // if Firefox, remove the 'Event' key and push to end for consistent order
    // and disregard keys known to be missing in RFP mode
    const firefoxKeyMovedByInspect = 'Event'
    const varyingKeysMissingInRFP = ['PerformanceNavigationTiming', 'Performance']
    if (IS_GECKO) {
      const index = keys.indexOf(firefoxKeyMovedByInspect)
      if (index !== -1) {
        keys = keys.slice(0, index).concat(keys.slice(index + 1))
        keys = [...keys, firefoxKeyMovedByInspect]
      }
      varyingKeysMissingInRFP.forEach((key) => {
        const index = keys.indexOf(key)
        if (index !== -1)
          keys = keys.slice(0, index).concat(keys.slice(index + 1))

        return keys
      })
    }

    const moz = keys.filter(key => (/moz/i).test(key)).length
    const webkit = keys.filter(key => (/webkit/i).test(key)).length
    const apple = keys.filter(key => (/apple/i).test(key)).length
    const data = { keys, apple, moz, webkit }
    return { ...data }
  }
  catch (error) {
  }
}
