/* eslint-disable no-restricted-properties */
/* eslint-disable no-proto */
import { CSS_FONT_FAMILY, EMOJIS } from '../utils/helpers'
import { html, patch } from '../utils/html'
import { PHANTOM_DARKNESS } from '../utils/lies'

export async function getSVG() {
  try {
    const doc = (
      PHANTOM_DARKNESS
      && PHANTOM_DARKNESS.document
      && PHANTOM_DARKNESS.document.body
        ? PHANTOM_DARKNESS.document
        : document
    )

    const divElement = document.createElement('div')
    doc.body.appendChild(divElement)

    // patch div
    patch(divElement, html`
      <div id="svg-container">
        <style>
        #svg-container {
          position: absolute;
          left: -9999px;
          height: auto;
        }
        #svg-container .shift-svg {
          transform: scale(1.000999) !important;
        }
        .svgrect-emoji {
          font-family: ${CSS_FONT_FAMILY};
          font-size: 200px !important;
          height: auto;
          position: absolute !important;
          transform: scale(1.000999);
        }
        </style>
        <svg>
          <g id="svgBox">
            ${
              EMOJIS.map((emoji) => {
                return `<text x="32" y="32" class="svgrect-emoji">${emoji}</text>`
              }).join('')
            }
          </g>
        </svg>
      </div>
    `)

    // SVG
    const reduceToObject = (nativeObj: any) => {
      const keys = Object.keys(nativeObj.__proto__)
      return keys.reduce((acc, key) => {
        const val = nativeObj[key]
        const isMethod = typeof val == 'function'
        return isMethod ? acc : { ...acc, [key]: val }
      }, {})
    }
    const reduceToSum = (nativeObj: any) => {
      const keys = Object.keys(nativeObj.__proto__)
      return keys.reduce((acc, key) => {
        const val = nativeObj[key]
        return Number.isNaN(val) ? acc : (acc += val)
      }, 0)
    }

    const getObjectSum = (obj: Record<string, number>) => !obj ? 0 : Object.keys(obj).reduce((acc, key) => acc += Math.abs(obj[key]), 0)

    // SVGRect
    const svgBox = doc.getElementById('svgBox') as unknown as SVGGraphicsElement
    const bBox = reduceToObject(svgBox.getBBox())

    // compute SVGRect emojis
    const pattern = new Set<string>()
    const svgElems = [...svgBox.getElementsByClassName('svgrect-emoji')] as SVGTextContentElement[]

    const emojiSet = svgElems.reduce((emojiSet, el, i) => {
      const emoji = EMOJIS[i]
      const dimensions = `${el.getComputedTextLength()}`
      if (!pattern.has(dimensions)) {
        pattern.add(dimensions)
        emojiSet.add(emoji)
      }
      return emojiSet
    }, new Set<string>())

    // svgRect System Sum
    const svgrectSystemSum = 0.00001 * [...pattern].map((x) => {
      return x.split(',').reduce((acc, x) => {
        acc += (+x || 0)
        return acc
      }, 0)
    }).reduce((acc, x) => acc += x, 0)

    const data = {
      bBox: getObjectSum(bBox),
      extentOfChar: reduceToSum(svgElems[0].getExtentOfChar(+EMOJIS[0])),
      subStringLength: svgElems[0].getSubStringLength(0, 10),
      computedTextLength: svgElems[0].getComputedTextLength(),
      emojiSet: [...emojiSet],
      svgrectSystemSum,
    }

    const container = doc.getElementById('svg-container')
    container && doc.body.removeChild(container)

    return data
  }
  catch (error) {

  }
}
