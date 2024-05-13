export const IS_WORKER_SCOPE = !self.document && (self as any).WorkerGlobalScope

function getEngine() {
  const x = [].constructor
  try {
    (-1).toFixed(-1)
  }
  catch (err) {
    return (err as Error).message.length + (`${x}`).split(x.name).join('').length
  }
}

const ENGINE_IDENTIFIER = getEngine()
export const IS_BLINK = ENGINE_IDENTIFIER === 80
