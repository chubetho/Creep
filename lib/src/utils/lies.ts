import { IS_BLINK, IS_WORKER_SCOPE } from './helpers'

try {
  speechSynthesis.getVoices()
}
catch (error) {}

const GHOST = `
  height: 100vh;
  width: 100vw;
  position: absolute;
  left:-10000px;
  visibility: hidden;
`
function getRandomValues() {
  return String.fromCharCode(Math.random() * 26 + 97)
    + Math.random().toString(36).slice(-7)
}

function getBehemothIframe(win: Window): Window | null {
  try {
    if (!IS_BLINK)
      return win

    const div = win.document.createElement('div')
    div.setAttribute('id', getRandomValues())
    div.setAttribute('style', GHOST)
    div.innerHTML = `<div><iframe></iframe></div>`
    win.document.body.appendChild(div)
    const iframe = [...[...div.childNodes][0].childNodes][0] as HTMLIFrameElement

    if (!iframe)
      return null

    const { contentWindow } = iframe || {}
    if (!contentWindow)
      return null

    const div2 = contentWindow.document.createElement('div')
    div2.innerHTML = `<div><iframe></iframe></div>`
    contentWindow.document.body.appendChild(div2)
    const iframe2 = [...[...div2.childNodes][0].childNodes][0] as HTMLIFrameElement
    return iframe2.contentWindow
  }
  catch (error) {
    return win
  }
}

function getPhantomIframe() {
  if (IS_WORKER_SCOPE)
    return { iframeWindow: self }
  try {
    const numberOfIframes = self.length
    const frag = new DocumentFragment()
    const div = document.createElement('div')
    const id = getRandomValues()
    div.setAttribute('id', id)
    frag.appendChild(div)
    div.innerHTML = `<div style="${GHOST}"><iframe></iframe></div>`
    document.body.appendChild(frag)
    const iframeWindow = self[numberOfIframes]
    const phantomWindow = getBehemothIframe(iframeWindow)
    return { iframeWindow: phantomWindow || self, div }
  }
  catch (error) {
    return { iframeWindow: self }
  }
}
const { iframeWindow: PHANTOM_DARKNESS, div: PARENT_PHANTOM } = getPhantomIframe()

export { getRandomValues, PHANTOM_DARKNESS, PARENT_PHANTOM }
