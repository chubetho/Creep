import { Analysis, CSS_FONT_FAMILY, EMOJIS, IS_BLINK, IS_GECKO, IS_WEBKIT, LIKE_BRAVE, LowerEntropy } from '../utils/helpers'
import { PHANTOM_DARKNESS } from '../utils/lies'

function getPixelMods() {
  const pattern1: string[] = []
  const pattern2: string[] = []
  const len = 8 // canvas dimensions
  const alpha = 255
  const visualMultiplier = 5

  try {
    // create 2 canvas contexts
    const options = {
      willReadFrequently: true,
      desynchronized: true,
    }
    const canvasDisplay1 = document.createElement('canvas')
    const canvasDisplay2 = document.createElement('canvas')
    const canvas1 = document.createElement('canvas')
    const canvas2 = document.createElement('canvas')
    const contextDisplay1 = canvasDisplay1.getContext('2d', options) as CanvasRenderingContext2D
    const contextDisplay2 = canvasDisplay2.getContext('2d', options) as CanvasRenderingContext2D
    const context1 = canvas1.getContext('2d', options) as CanvasRenderingContext2D
    const context2 = canvas2.getContext('2d', options) as CanvasRenderingContext2D

    if (!contextDisplay1 || !contextDisplay2 || !context1 || !context2)
      throw new Error('canvas context blocked')

    // set the dimensions
    canvasDisplay1.width = len * visualMultiplier
    canvasDisplay1.height = len * visualMultiplier
    canvasDisplay2.width = len * visualMultiplier
    canvasDisplay2.height = len * visualMultiplier
    canvas1.width = len
    canvas1.height = len
    canvas2.width = len
    canvas2.height = len

    // fill canvas1 with random image data
    ;[...Array(len)].forEach((_, x) => [...Array(len)].forEach((_, y) => {
      const red = ~~(Math.random() * 256)
      const green = ~~(Math.random() * 256)
      const blue = ~~(Math.random() * 256)
      const colors = `${red}, ${green}, ${blue}, ${alpha}`
      context1.fillStyle = `rgba(${colors})`
      context1.fillRect(x, y, 1, 1)
      // capture data in visuals
      contextDisplay1.fillStyle = `rgba(${colors})`
      contextDisplay1.fillRect(
        x * visualMultiplier,
        y * visualMultiplier,
        1 * visualMultiplier,
        1 * visualMultiplier,
      )
      return pattern1.push(colors) // collect the pixel pattern
    }))

    // fill canvas2 with canvas1 image data
    ;[...Array(len)].forEach((_, x) => [...Array(len)].forEach((_, y) => {
      // get context1 pixel data and mirror to context2
      const {
        data: [red, green, blue, alpha],
      } = context1.getImageData(x, y, 1, 1) || {}
      const colors = `${red}, ${green}, ${blue}, ${alpha}`
      context2.fillStyle = `rgba(${colors})`
      context2.fillRect(x, y, 1, 1)

      // capture noise in visuals
      const {
        data: [red2, green2, blue2, alpha2],
      } = context2.getImageData(x, y, 1, 1) || {}
      const colorsDisplay = `
        ${red !== red2 ? red2 : 255},
        ${green !== green2 ? green2 : 255},
        ${blue !== blue2 ? blue2 : 255},
        ${alpha !== alpha2 ? alpha2 : 1}
      `
      contextDisplay2.fillStyle = `rgba(${colorsDisplay})`
      contextDisplay2.fillRect(
        x * visualMultiplier,
        y * visualMultiplier,
        1 * visualMultiplier,
        1 * visualMultiplier,
      )
      return pattern2.push(colors) // collect the pixel pattern
    }))

    // compare the pattern collections and collect diffs
    const patternDiffs = []
    const rgbaChannels = new Set()

    ;[...Array(pattern1.length)].forEach((_, i) => {
      const pixelColor1 = pattern1[i]
      const pixelColor2 = pattern2[i]
      if (pixelColor1 !== pixelColor2) {
        const rgbaValues1 = pixelColor1.split(',')
        const rgbaValues2 = pixelColor2.split(',')
        const colors = [
          rgbaValues1[0] !== rgbaValues2[0] ? 'r' : '',
          rgbaValues1[1] !== rgbaValues2[1] ? 'g' : '',
          rgbaValues1[2] !== rgbaValues2[2] ? 'b' : '',
          rgbaValues1[3] !== rgbaValues2[3] ? 'a' : '',
        ].join('')
        rgbaChannels.add(colors)
        patternDiffs.push([i, colors])
      }
    })

    const pixelImage = canvasDisplay2.toDataURL()

    const rgba = rgbaChannels.size ? [...rgbaChannels].sort().join(', ') : undefined
    const pixels = patternDiffs.length || undefined
    return { rgba, pixels, pixelImage }
  }
  catch (error) {
    return console.error(error)
  }
}

function paintCanvas({
  canvas,
  context,
  strokeText = false,
  cssFontFamily = '',
  area = { width: 50, height: 50 },
  rounds = 10,
  maxShadowBlur = 50,
  seed = 500,
  offset = 2001000001,
  multiplier = 15000,
}: {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  strokeText?: boolean
  cssFontFamily?: string
  area?: { width: number, height: number }
  rounds?: number
  maxShadowBlur?: number
  seed?: number
  offset?: number
  multiplier?: number
}) {
  if (!context)
    return

  context.clearRect(0, 0, canvas.width, canvas.height)
  canvas.width = area.width
  canvas.height = area.height

  if (canvas.style)
    canvas.style.display = 'none'

  const createPicassoSeed = ({ seed, offset, multiplier }: { seed: number, offset: number, multiplier: number }) => {
    let current = Number(seed) % Number(offset)
    const getNextSeed = () => {
      current = (Number(multiplier) * current) % Number(offset)
      return current
    }
    return {
      getNextSeed,
    }
  }

  const picassoSeed = createPicassoSeed({ seed, offset, multiplier })
  const { getNextSeed } = picassoSeed

  const patchSeed = (current: number, offset: number, maxBound: number, computeFloat?: number) => {
    const result = (((current - 1) / offset) * (maxBound || 1)) || 0
    return computeFloat ? result : Math.floor(result)
  }

  const addRandomCanvasGradient = (offset: number, area: { width: number, height: number }, colors: string[], getNextSeed: () => number) => {
    const { width, height } = area
    const canvasGradient = context.createRadialGradient(
      patchSeed(getNextSeed(), offset, width),
      patchSeed(getNextSeed(), offset, height),
      patchSeed(getNextSeed(), offset, width),
      patchSeed(getNextSeed(), offset, width),
      patchSeed(getNextSeed(), offset, height),
      patchSeed(getNextSeed(), offset, width),
    )
    canvasGradient.addColorStop(0, colors[patchSeed(getNextSeed(), offset, colors.length)])
    canvasGradient.addColorStop(1, colors[patchSeed(getNextSeed(), offset, colors.length)])
    context.fillStyle = canvasGradient
  }

  const colors = [
    '#FF6633',
    '#FFB399',
    '#FF33FF',
    '#FFFF99',
    '#00B3E6',
    '#E6B333',
    '#3366E6',
    '#999966',
    '#99FF99',
    '#B34D4D',
    '#80B300',
    '#809900',
    '#E6B3B3',
    '#6680B3',
    '#66991A',
    '#FF99E6',
    '#CCFF1A',
    '#FF1A66',
    '#E6331A',
    '#33FFCC',
    '#66994D',
    '#B366CC',
    '#4D8000',
    '#B33300',
    '#CC80CC',
    '#66664D',
    '#991AFF',
    '#E666FF',
    '#4DB3FF',
    '#1AB399',
    '#E666B3',
    '#33991A',
    '#CC9999',
    '#B3B31A',
    '#00E680',
    '#4D8066',
    '#809980',
    '#E6FF80',
    '#1AFF33',
    '#999933',
    '#FF3380',
    '#CCCC00',
    '#66E64D',
    '#4D80CC',
    '#9900B3',
    '#E64D66',
    '#4DB380',
    '#FF4D4D',
    '#99E6E6',
    '#6666FF',
  ]

  const drawOutlineOfText = (context: CanvasRenderingContext2D, offset: number, area: { width: number, height: number }, getNextSeed: () => number) => {
    const { width, height } = area
    const fontSize = 2.99
    context.font = `${height / fontSize}px ${cssFontFamily.replace(/!important/gm, '')}`
    context.strokeText(
      '👾A',
      patchSeed(getNextSeed(), offset, width),
      patchSeed(getNextSeed(), offset, height),
      patchSeed(getNextSeed(), offset, width),
    )
  }

  const createCircularArc = (context: CanvasRenderingContext2D, offset: number, area: { width: number, height: number }, getNextSeed: () => number) => {
    const { width, height } = area
    context.beginPath()
    context.arc(
      patchSeed(getNextSeed(), offset, width),
      patchSeed(getNextSeed(), offset, height),
      patchSeed(getNextSeed(), offset, Math.min(width, height)),
      patchSeed(getNextSeed(), offset, 2 * Math.PI, 1),
      patchSeed(getNextSeed(), offset, 2 * Math.PI, 1),
    )
    context.stroke()
  }

  const createBezierCurve = (context: CanvasRenderingContext2D, offset: number, area: { width: number, height: number }, getNextSeed: () => number) => {
    const { width, height } = area
    context.beginPath()
    context.moveTo(
      patchSeed(getNextSeed(), offset, width),
      patchSeed(getNextSeed(), offset, height),
    )
    context.bezierCurveTo(
      patchSeed(getNextSeed(), offset, width),
      patchSeed(getNextSeed(), offset, height),
      patchSeed(getNextSeed(), offset, width),
      patchSeed(getNextSeed(), offset, height),
      patchSeed(getNextSeed(), offset, width),
      patchSeed(getNextSeed(), offset, height),
    )
    context.stroke()
  }

  const createQuadraticCurve = (context: CanvasRenderingContext2D, offset: number, area: { width: number, height: number }, getNextSeed: () => number) => {
    const { width, height } = area
    context.beginPath()
    context.moveTo(
      patchSeed(getNextSeed(), offset, width),
      patchSeed(getNextSeed(), offset, height),
    )
    context.quadraticCurveTo(
      patchSeed(getNextSeed(), offset, width),
      patchSeed(getNextSeed(), offset, height),
      patchSeed(getNextSeed(), offset, width),
      patchSeed(getNextSeed(), offset, height),
    )
    context.stroke()
  }

  const createEllipticalArc = (context: CanvasRenderingContext2D, offset: number, area: { width: number, height: number }, getNextSeed: () => number) => {
    if (!('ellipse' in context))
      return

    const { width, height } = area
    context.beginPath()
    context.ellipse(
      patchSeed(getNextSeed(), offset, width),
      patchSeed(getNextSeed(), offset, height),
      patchSeed(getNextSeed(), offset, Math.floor(width / 2)),
      patchSeed(getNextSeed(), offset, Math.floor(height / 2)),
      patchSeed(getNextSeed(), offset, 2 * Math.PI, 1),
      patchSeed(getNextSeed(), offset, 2 * Math.PI, 1),
      patchSeed(getNextSeed(), offset, 2 * Math.PI, 1),
    )
    context.stroke()
  }

  const methods = [
    createCircularArc,
    createBezierCurve,
    createQuadraticCurve,
  ]

  if (!IS_WEBKIT)
    methods.push(createEllipticalArc) // unstable in webkit
  if (strokeText)
    methods.push(drawOutlineOfText)

  ;[...Array(rounds)].forEach(() => {
    addRandomCanvasGradient(offset, area, colors, getNextSeed)
    context.shadowBlur = patchSeed(getNextSeed(), offset, maxShadowBlur, 1)
    context.shadowColor = colors[patchSeed(getNextSeed(), offset, colors.length)]
    const nextMethod = methods[patchSeed(getNextSeed(), offset, methods.length)]
    nextMethod(context, offset, area, getNextSeed)
    context.fill()
  })
}

export async function getCanvas() {
  try {
    // create canvas context
    let win = window
    if (!LIKE_BRAVE && PHANTOM_DARKNESS)
      win = PHANTOM_DARKNESS as any

    const doc = win.document

    const canvas = doc.createElement('canvas')
    const context = canvas.getContext('2d')
    const canvasCPU = doc.createElement('canvas')
    const contextCPU = canvasCPU.getContext('2d', {
      desynchronized: true,
      willReadFrequently: true,
    })!

    if (!context)
      throw new Error('canvas context blocked')

    const imageSizeMax = IS_WEBKIT ? 50 : 75 // webkit is unstable
    paintCanvas({
      canvas,
      context,
      strokeText: true,
      cssFontFamily: CSS_FONT_FAMILY,
      area: { width: imageSizeMax, height: imageSizeMax },
      rounds: 10,
    })

    const dataURI = canvas.toDataURL()

    const mods = getPixelMods()

    // TextMetrics: get emoji set and system
    context.font = `10px ${CSS_FONT_FAMILY.replace(/!important/gm, '')}`
    const pattern = new Set<string>()
    const emojiSet = EMOJIS.reduce((emojiSet, emoji) => {
      const {
        actualBoundingBoxAscent,
        actualBoundingBoxDescent,
        actualBoundingBoxLeft,
        actualBoundingBoxRight,
        fontBoundingBoxAscent,
        fontBoundingBoxDescent,
        width,
      } = context.measureText(emoji) || {}
      const dimensions = [
        actualBoundingBoxAscent,
        actualBoundingBoxDescent,
        actualBoundingBoxLeft,
        actualBoundingBoxRight,
        fontBoundingBoxAscent,
        fontBoundingBoxDescent,
        width,
      ].join(',')
      if (!pattern.has(dimensions)) {
        pattern.add(dimensions)
        emojiSet.add(emoji)
      }
      return emojiSet
    }, new Set())

    // textMetrics System Sum
    const textMetricsSystemSum = 0.00001 * [...pattern].map((x) => {
      return x.split(',').reduce((acc, x) => acc += (+x || 0), 0)
    }).reduce((acc, x) => acc += x, 0)

    // Paint
    const maxSize = 75
    paintCanvas({
      canvas,
      context,
      area: { width: maxSize, height: maxSize },
    }) // clears image
    const paintURI = canvas.toDataURL()

    // Paint with CPU
    paintCanvas({
      canvas: canvasCPU,
      context: contextCPU,
      area: { width: maxSize, height: maxSize },
    }) // clears image
    const paintCpuURI = canvasCPU.toDataURL()

    // Text
    context.restore()
    context.clearRect(0, 0, canvas.width, canvas.height)
    canvas.width = 50
    canvas.height = 50
    context.font = `50px ${CSS_FONT_FAMILY.replace(/!important/gm, '')}`
    context.fillText('A', 7, 37)
    const textURI = canvas.toDataURL()

    // Emoji
    context.restore()
    context.clearRect(0, 0, canvas.width, canvas.height)
    canvas.width = 50
    canvas.height = 50
    context.font = `35px ${CSS_FONT_FAMILY.replace(/!important/gm, '')}`
    context.fillText('👾', 0, 37)
    const emojiURI = canvas.toDataURL()

    // lies
    context.clearRect(0, 0, canvas.width, canvas.height)

    // verify low entropy image data
    canvas.width = 2
    canvas.height = 2
    context.fillStyle = '#000'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = '#fff'
    context.fillRect(2, 2, 1, 1)
    context.beginPath()
    context.arc(0, 0, 2, 0, 1, true)
    context.closePath()
    context.fill()
    const imageDataLowEntropy = context.getImageData(0, 0, 2, 2).data.join('')
    const KnownImageData: Record<string, string[]> = {
      BLINK: [
        '255255255255178178178255246246246255555555255',
        '255255255255192192192255240240240255484848255',
        '255255255255177177177255246246246255535353255',
        '255255255255128128128255191191191255646464255',
        '255255255255178178178255247247247255565656255', // ?
        '255255255255174174174255242242242255474747255',
        '255255255255229229229255127127127255686868255',
        '255255255255192192192255244244244255535353255',
      ],
      GECKO: [
        '255255255255191191191255207207207255646464255',
        '255255255255192192192255240240240255484848255',
        '255255255255191191191255239239239255646464255',
        '255255255255191191191255223223223255606060255', // ?
        '255255255255171171171255223223223255606060255', // ?
      ],
      WEBKIT: [
        '255255255255185185185255233233233255474747255',
        '255255255255185185185255229229229255474747255',
        '255255255255185185185255218218218255474747255',
        '255255255255192192192255240240240255484848255',
        '255255255255178178178255247247247255565656255',
        '255255255255178178178255247247247255565656255',
        '255255255255192192192255240240240255484848255',
        '255255255255186186186255218218218255464646255',
      ],
    }
    Analysis.imageDataLowEntropy = imageDataLowEntropy
    if (IS_BLINK && !KnownImageData.BLINK.includes(imageDataLowEntropy))
      LowerEntropy.CANVAS = true
    else if (IS_GECKO && !KnownImageData.GECKO.includes(imageDataLowEntropy))
      LowerEntropy.CANVAS = true
    else if (IS_WEBKIT && !KnownImageData.WEBKIT.includes(imageDataLowEntropy))
      LowerEntropy.CANVAS = true

    return {
      dataURI,
      paintURI,
      paintCpuURI,
      textURI,
      emojiURI,
      mods,
      textMetricsSystemSum,
      emojiSet: [...emojiSet],
    }
  }
  catch (error) {
  }
}
