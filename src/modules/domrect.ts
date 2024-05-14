import { instanceId } from '../utils/crypto'
import { CSS_FONT_FAMILY, EMOJIS } from '../utils/helpers'
import { html, patch } from '../utils/html'
import { PHANTOM_DARKNESS } from '../utils/lies'

export async function getDomRect() {
  try {
    const toNativeObject = (domRect: DOMRect): Record<string, number> => {
      return {
        bottom: domRect.bottom,
        height: domRect.height,
        left: domRect.left,
        right: domRect.right,
        width: domRect.width,
        top: domRect.top,
        x: domRect.x,
        y: domRect.y,
      }
    }

    const DOC = (
      PHANTOM_DARKNESS
      && PHANTOM_DARKNESS.document
      && PHANTOM_DARKNESS.document.body
        ? PHANTOM_DARKNESS.document
        : document
    )

    const getBestRect = (el: Element) => {
      let range
      let rect = el.getClientRects()[0]
      if (rect)
        return rect

      rect = el.getBoundingClientRect()
      if (rect)
        return rect

      range = DOC.createRange()
      range.selectNode(el)
      rect = range.getClientRects()[0]
      if (rect)
        return rect

      range = DOC.createRange()
      range.selectNode(el)
      rect = range.getBoundingClientRect()
      if (rect)
        return rect
    }

    const rectsId = `${instanceId}-client-rects-div`
    const divElement = document.createElement('div')
    divElement.setAttribute('id', rectsId)
    DOC.body.appendChild(divElement)

    patch(divElement, html`
		<div id="${rectsId}">
			<style>
			.rect-ghost,
			.rect-known {
				top: 0;
				left: 0;
				position: absolute;
				visibility: hidden;
			}
			.rect-known {
				width: 100px;
				height: 100px;
				transform: rotate(45deg);
			}
			.rect-ghost {
				width: 0;
				height: 0;
			}
			</style>
			<div class="rect-known"></div>
			<div class="rect-ghost"></div>
			<div style="perspective:100px;width:1000.099%;" id="rect-container">
				<style>
				.rects {
					width: 1000%;
					height: 1000%;
					max-width: 1000%;
				}
				.absolute {
					position: absolute;
				}
				#cRect1 {
					border: solid 2.715px;
					border-color: #F72585;
					padding: 3.98px;
					margin-left: 12.12px;
				}
				#cRect2 {
					border: solid 2px;
					border-color: #7209B7;
					font-size: 30px;
					margin-top: 20px;
					padding: 3.98px;
					transform: skewY(23.1753218deg) rotate3d(10.00099, 90, 0.100000000000009, 60000000000008.00000009deg);
				}
				#cRect3 {
					border: solid 2.89px;
					border-color: #3A0CA3;
					font-size: 45px;
					transform: skewY(-23.1753218deg) scale(1099.0000000099, 1.89) matrix(1.11, 2.0001, -1.0001, 1.009, 150, 94.4);
					margin-top: 50px;
				}
				#cRect4 {
					border: solid 2px;
					border-color: #4361EE;
					transform: matrix(1.11, 2.0001, -1.0001, 1.009, 150, 94.4);
					margin-top: 11.1331px;
					margin-left: 12.1212px;
					padding: 4.4545px;
					left: 239.4141px;
					top: 8.5050px;
				}
				#cRect5 {
					border: solid 2px;
					border-color: #4CC9F0;
					margin-left: 42.395pt;
				}
				#cRect6 {
					border: solid 2px;
					border-color: #F72585;
					transform: perspective(12890px) translateZ(101.5px);
					padding: 12px;
				}
				#cRect7 {
					margin-top: -350.552px;
					margin-left: 0.9099rem;
					border: solid 2px;
					border-color: #4361EE;
				}
				#cRect8 {
					margin-top: -150.552px;
					margin-left: 15.9099rem;
					border: solid 2px;
					border-color: #3A0CA3;
				}
				#cRect9 {
					margin-top: -110.552px;
					margin-left: 15.9099rem;
					border: solid 2px;
					border-color: #7209B7;
				}
				#cRect10 {
					margin-top: -315.552px;
					margin-left: 15.9099rem;
					border: solid 2px;
					border-color: #F72585;
				}
				#cRect11 {
					width: 10px;
					height: 10px;
					margin-left: 15.0000009099rem;
					border: solid 2px;
					border-color: #F72585;
				}
				#cRect12 {
					width: 10px;
					height: 10px;
					margin-left: 15.0000009099rem;
					border: solid 2px;
					border-color: #F72585;
				}
				#rect-container .shift-dom-rect {
					top: 1px !important;
					left: 1px !important;
				}
				</style>
				<div id="cRect1" class="rects"></div>
				<div id="cRect2" class="rects"></div>
				<div id="cRect3" class="rects"></div>
				<div id="cRect4" class="rects absolute"></div>
				<div id="cRect5" class="rects"></div>
				<div id="cRect6" class="rects"></div>
				<div id="cRect7" class="rects absolute"></div>
				<div id="cRect8" class="rects absolute"></div>
				<div id="cRect9" class="rects absolute"></div>
				<div id="cRect10" class="rects absolute"></div>
				<div id="cRect11" class="rects"></div>
				<div id="cRect12" class="rects"></div>
				<div id="emoji" class="emojis"></div>
			</div>
			<div id="emoji-container">
				<style>
				.domrect-emoji {
					font-family: ${CSS_FONT_FAMILY};
					font-size: 200px !important;
					height: auto;
					position: absolute !important;
					transform: scale(1.000999);
				}
				</style>
				${
					EMOJIS.map((emoji) => {
						return `<div class="domrect-emoji">${emoji}</div>`
					}).join('')
				}
			</div>
		</div>
		`)

    // get emoji set and system
    const pattern = new Set<string>()

    const emojiElems = [...DOC.getElementsByClassName('domrect-emoji')]
    const emojiSet = emojiElems.reduce((emojiSet, el, i) => {
      const emoji = EMOJIS[i]
      const { height, width } = getBestRect(el)!
      const dimensions = `${width},${height}`
      if (!pattern.has(dimensions)) {
        pattern.add(dimensions)
        emojiSet.add(emoji)
      }
      return emojiSet
    }, new Set() as Set<string>)

    const domrectSystemSum = 0.00001 * [...pattern].map((x) => {
      return x.split(',').reduce((acc, x) => acc += (+x || 0), 0)
    }).reduce((acc, x) => acc += x, 0)

    // get clientRects
    const range = document.createRange()
    const rectElems = DOC.getElementsByClassName('rects')

    const elementClientRects = [...rectElems].map((el) => {
      return toNativeObject(el.getClientRects()[0])
    })

    const elementBoundingClientRect = [...rectElems].map((el) => {
      return toNativeObject(el.getBoundingClientRect())
    })

    const rangeClientRects = [...rectElems].map((el) => {
      range.selectNode(el)
      return toNativeObject(range.getClientRects()[0])
    })

    const rangeBoundingClientRect = [...rectElems].map((el) => {
      range.selectNode(el)
      return toNativeObject(el.getBoundingClientRect())
    })

    // detect failed shift calculation
    // inspired by https://arkenfox.github.io/TZP
    const rect4 = [...rectElems][3]
    rect4.classList.add('shift-dom-rect')
    rect4.classList.remove('shift-dom-rect')

    // detect ghost dimensions

    DOC.body.removeChild(DOC.getElementById(rectsId) as HTMLElement)

    return {
      elementClientRects,
      elementBoundingClientRect,
      rangeClientRects,
      rangeBoundingClientRect,
      emojiSet: [...emojiSet],
      domrectSystemSum,
    }
  }
  catch (error) {}
}
