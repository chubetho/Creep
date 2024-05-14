import { LowerEntropy } from '../utils/helpers'

function hasTouch() {
  try {
    return 'ontouchstart' in window && !!document.createEvent('TouchEvent')
  }
  catch (err) {
    return false
  }
}

export async function getScreen() {
  try {
    const s = (window.screen || {})
    const {
      width,
      height,
      availWidth,
      availHeight,
      colorDepth,
      pixelDepth,
    } = s

    const noTaskbar = !(width - availWidth || height - availHeight)
    if (width > 800 && noTaskbar)
      LowerEntropy.SCREEN = true

    const data = {
      width,
      height,
      availWidth,
      availHeight,
      colorDepth,
      pixelDepth,
      touch: hasTouch(),
    }

    return data
  }
  catch (error) {
  }
}
