const WebGLConstants = [
  'ALIASED_LINE_WIDTH_RANGE',
  'ALIASED_POINT_SIZE_RANGE',
  'ALPHA_BITS',
  'BLUE_BITS',
  'DEPTH_BITS',
  'GREEN_BITS',
  'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
  'MAX_CUBE_MAP_TEXTURE_SIZE',
  'MAX_FRAGMENT_UNIFORM_VECTORS',
  'MAX_RENDERBUFFER_SIZE',
  'MAX_TEXTURE_IMAGE_UNITS',
  'MAX_TEXTURE_SIZE',
  'MAX_VARYING_VECTORS',
  'MAX_VERTEX_ATTRIBS',
  'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
  'MAX_VERTEX_UNIFORM_VECTORS',
  'MAX_VIEWPORT_DIMS',
  'RED_BITS',
  'RENDERER',
  'SHADING_LANGUAGE_VERSION',
  'STENCIL_BITS',
  'VERSION',
]

const WebGL2Constants = [
  'MAX_VARYING_COMPONENTS',
  'MAX_VERTEX_UNIFORM_COMPONENTS',
  'MAX_VERTEX_UNIFORM_BLOCKS',
  'MAX_VERTEX_OUTPUT_COMPONENTS',
  'MAX_PROGRAM_TEXEL_OFFSET',
  'MAX_3D_TEXTURE_SIZE',
  'MAX_ARRAY_TEXTURE_LAYERS',
  'MAX_COLOR_ATTACHMENTS',
  'MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS',
  'MAX_COMBINED_UNIFORM_BLOCKS',
  'MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS',
  'MAX_DRAW_BUFFERS',
  'MAX_ELEMENT_INDEX',
  'MAX_FRAGMENT_INPUT_COMPONENTS',
  'MAX_FRAGMENT_UNIFORM_COMPONENTS',
  'MAX_FRAGMENT_UNIFORM_BLOCKS',
  'MAX_SAMPLES',
  'MAX_SERVER_WAIT_TIMEOUT',
  'MAX_TEXTURE_LOD_BIAS',
  'MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS',
  'MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS',
  'MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS',
  'MAX_UNIFORM_BLOCK_SIZE',
  'MAX_UNIFORM_BUFFER_BINDINGS',
  'MIN_PROGRAM_TEXEL_OFFSET',
  'UNIFORM_BUFFER_OFFSET_ALIGNMENT',
]

const Categories: Record<string, string[]> = {
  uniformBuffers: [
    'MAX_UNIFORM_BUFFER_BINDINGS',
    'MAX_UNIFORM_BLOCK_SIZE',
    'UNIFORM_BUFFER_OFFSET_ALIGNMENT',
    'MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS',
    'MAX_COMBINED_UNIFORM_BLOCKS',
    'MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS',
  ],
  debugRendererInfo: [
    'UNMASKED_VENDOR_WEBGL',
    'UNMASKED_RENDERER_WEBGL',
  ],
  fragmentShader: [
    'MAX_FRAGMENT_UNIFORM_VECTORS',
    'MAX_TEXTURE_IMAGE_UNITS',
    'MAX_FRAGMENT_INPUT_COMPONENTS',
    'MAX_FRAGMENT_UNIFORM_COMPONENTS',
    'MAX_FRAGMENT_UNIFORM_BLOCKS',
    'FRAGMENT_SHADER_BEST_FLOAT_PRECISION',
    'MIN_PROGRAM_TEXEL_OFFSET',
    'MAX_PROGRAM_TEXEL_OFFSET',
  ],
  frameBuffer: [
    'MAX_DRAW_BUFFERS',
    'MAX_COLOR_ATTACHMENTS',
    'MAX_SAMPLES',
    'RGBA_BITS',
    'DEPTH_STENCIL_BITS',
    'MAX_RENDERBUFFER_SIZE',
    'MAX_VIEWPORT_DIMS',
  ],
  rasterizer: [
    'ALIASED_LINE_WIDTH_RANGE',
    'ALIASED_POINT_SIZE_RANGE',
  ],
  textures: [
    'MAX_TEXTURE_SIZE',
    'MAX_CUBE_MAP_TEXTURE_SIZE',
    'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
    'MAX_TEXTURE_MAX_ANISOTROPY_EXT',
    'MAX_3D_TEXTURE_SIZE',
    'MAX_ARRAY_TEXTURE_LAYERS',
    'MAX_TEXTURE_LOD_BIAS',
  ],
  transformFeedback: [
    'MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS',
    'MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS',
    'MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS',
  ],
  vertexShader: [
    'MAX_VARYING_VECTORS',
    'MAX_VERTEX_ATTRIBS',
    'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
    'MAX_VERTEX_UNIFORM_VECTORS',
    'MAX_VERTEX_UNIFORM_COMPONENTS',
    'MAX_VERTEX_UNIFORM_BLOCKS',
    'MAX_VERTEX_OUTPUT_COMPONENTS',
    'MAX_VARYING_COMPONENTS',
    'VERTEX_SHADER_BEST_FLOAT_PRECISION',
  ],
  webGLContextInfo: [
    'CONTEXT',
    'ANTIALIAS',
    'DIRECT_3D',
    'MAJOR_PERFORMANCE_CAVEAT',
    'RENDERER',
    'SHADING_LANGUAGE_VERSION',
    'VERSION',
  ],
}

/* parameter helpers */
// https://developer.mozilla.org/en-US/docs/Web/API/EXT_texture_filter_anisotropic
function getMaxAnisotropy(context: WebGL2RenderingContext) {
  try {
    const extension = (
      context.getExtension('EXT_texture_filter_anisotropic')
      || context.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
      || context.getExtension('MOZ_EXT_texture_filter_anisotropic')
    )
    return context.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
  }
  catch (error) {
    console.error(error)
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_draw_buffers
function getMaxDrawBuffers(context: WebGL2RenderingContext) {
  try {
    const extension = (
      context.getExtension('WEBGL_draw_buffers')
      || context.getExtension('WEBKIT_WEBGL_draw_buffers')
      || context.getExtension('MOZ_WEBGL_draw_buffers')
    )
    return context.getParameter(extension.MAX_DRAW_BUFFERS_WEBGL)
  }
  catch (error) {
    return undefined
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/WebGLShaderPrecisionFormat/precision
// https://developer.mozilla.org/en-US/docs/Web/API/WebGLShaderPrecisionFormat/rangeMax
// https://developer.mozilla.org/en-US/docs/Web/API/WebGLShaderPrecisionFormat/rangeMin
function getShaderData(shader: Record<string, WebGLShaderPrecisionFormat | null> | undefined) {
  if (!shader)
    return

  const shaderData: Record<string, any> = {}
  try {
    for (const prop in shader) {
      const shaderPrecisionFormat = shader[prop]
      if (!shaderPrecisionFormat)
        continue

      shaderData[prop] = {
        precision: shaderPrecisionFormat.precision,
        rangeMax: shaderPrecisionFormat.rangeMax,
        rangeMin: shaderPrecisionFormat.rangeMin,
      }
    }
    return shaderData
  }
  catch (error) {

  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderPrecisionFormat
function getShaderPrecisionFormat(context: WebGL2RenderingContext, shaderType: string) {
  const props = ['LOW_FLOAT', 'MEDIUM_FLOAT', 'HIGH_FLOAT']
  const precisionFormat: Record<string, WebGLShaderPrecisionFormat | null> = {}
  try {
    props.forEach((prop) => {
      precisionFormat[prop] = context.getShaderPrecisionFormat((context as any)[shaderType], (context as any)[prop])
    })
    return precisionFormat
  }
  catch (error) {
    return undefined
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_debug_renderer_info
function getUnmasked(context: WebGL2RenderingContext, constant: any) {
  try {
    const extension = context.getExtension('WEBGL_debug_renderer_info')
    if (!extension)
      return
    const unmasked = context.getParameter((extension as any)[constant])
    return unmasked
  }
  catch (error) {

  }
}

// Takes the parameter object and generate a fingerprint of sorted numeric values
function getNumericValues(parameters: Record<string, string>) {
  if (!parameters)
    return
  return [
    ...new Set(Object.values(parameters)
      .filter(val => val && typeof val != 'string')
      .flat()
      .map(val => Number(val) || 0)),
  ].sort((a, b) => (a - b))
}

// Highlight common GPU brands
function getGpuBrand(gpu: string) {
  if (!gpu)
    return
  const gpuBrandMatcher = /(adreno|amd|apple|intel|llvm|mali|microsoft|nvidia|parallels|powervr|samsung|swiftshader|virtualbox|vmware)/i

  const brand = (
    /radeon/i.test(gpu)
      ? 'AMD'
      : /geforce/i.test(gpu)
        ? 'NVIDIA'
        : ((gpuBrandMatcher.exec(gpu) || [])[0] || 'Other')
  )

  return brand
}

/* get WebGLRenderingContext or WebGL2RenderingContext */
// https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext
// https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext
function getWebGL(contextType: string) {
  let data = {}
  const isWebGL = /^(?:experimental-)?webgl$/
  const isWebGL2 = /^(?:experimental-)?webgl2$/
  const supportsWebGL = isWebGL.test(contextType) && 'WebGLRenderingContext' in window
  const supportsWebGL2 = isWebGL2.test(contextType) && 'WebGLRenderingContext' in window

  // detect support
  if (!supportsWebGL && !supportsWebGL2)
    return data

  // get canvas context
  let canvas: HTMLCanvasElement
  let context: WebGL2RenderingContext
  let hasMajorPerformanceCaveat
  try {
    canvas = document.createElement('canvas')
    context = canvas.getContext(contextType, { failIfMajorPerformanceCaveat: true }) as WebGL2RenderingContext
    if (!context) {
      hasMajorPerformanceCaveat = true
      context = canvas.getContext(contextType) as WebGL2RenderingContext
      if (!context)
        throw new Error(`context of type ${typeof context}`)
    }
  }
  catch (error) {
    console.error(error)
    return data
  }

  // get supported extensions
  // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getSupportedExtensions
  // https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Using_Extensions
  let webGLExtensions
  try {
    webGLExtensions = context.getSupportedExtensions()
  }
  catch (error) {
    console.error(error)
  }

  // get parameters
  let parameters: Record<string, any> = {}
  try {
    const VERTEX_SHADER = getShaderData(getShaderPrecisionFormat(context, 'VERTEX_SHADER'))
    const FRAGMENT_SHADER = getShaderData(getShaderPrecisionFormat(context, 'FRAGMENT_SHADER'))

    parameters = {
      ANTIALIAS: context.getContextAttributes()?.antialias,
      CONTEXT: contextType,
      MAJOR_PERFORMANCE_CAVEAT: hasMajorPerformanceCaveat,
      MAX_TEXTURE_MAX_ANISOTROPY_EXT: getMaxAnisotropy(context),
      MAX_DRAW_BUFFERS_WEBGL: getMaxDrawBuffers(context),
      VERTEX_SHADER,
      VERTEX_SHADER_BEST_FLOAT_PRECISION: Object.values(VERTEX_SHADER?.HIGH_FLOAT),
      FRAGMENT_SHADER,
      FRAGMENT_SHADER_BEST_FLOAT_PRECISION: Object.values(FRAGMENT_SHADER?.HIGH_FLOAT),
      UNMASKED_VENDOR_WEBGL: getUnmasked(context, 'UNMASKED_VENDOR_WEBGL'),
      UNMASKED_RENDERER_WEBGL: getUnmasked(context, 'UNMASKED_RENDERER_WEBGL'),
    }

    const glConstants = [...WebGLConstants, ...(supportsWebGL2 ? WebGL2Constants : [])]
    glConstants.forEach((key) => {
      const result = context.getParameter((context as any)[key])
      const typedArray = result && (
        result.constructor === Float32Array
        || result.constructor === Int32Array
      )
      parameters[key] = typedArray ? [...result] : result
    })

    parameters.RGBA_BITS = [
      parameters.RED_BITS,
      parameters.GREEN_BITS,
      parameters.BLUE_BITS,
      parameters.ALPHA_BITS,
    ]

    parameters.DEPTH_STENCIL_BITS = [
      parameters.DEPTH_BITS,
      parameters.STENCIL_BITS,
    ]

    parameters.DIRECT_3D = /Direct3D|D3D\d+/.test(parameters.UNMASKED_RENDERER_WEBGL)
  }
  catch (error) {
    console.error(error)
  }

  const gpu = String([parameters.UNMASKED_VENDOR_WEBGL, parameters.UNMASKED_RENDERER_WEBGL])
  const gpuBrand = getGpuBrand(gpu)

  // Structure parameter data
  const components: Record<string, Record<string, any>> = {}
  if (parameters) {
    Object.keys(Categories).forEach((name) => {
      const componentData = Categories[name].reduce((acc, key) => {
        if (parameters[key] !== undefined)
          acc[key] = parameters[key]

        return acc
      }, {} as Record<string, any>)

      if (Object.keys(componentData).length)
        components[name] = componentData
    })
  }

  data = {
    gpuHash: !parameters ? undefined : [gpuBrand, ...(getNumericValues(parameters) ?? [])].join(':'),
    gpu,
    gpuBrand,
    ...components,
    webGLExtensions,
  }

  return data
}

export async function getWebGl() {
  try {
    const [webGL, webGL2, experimentalWebGL] = await Promise.all([
      getWebGL('webgl'),
      getWebGL('webgl2'),
      getWebGL('experimental-webgl'),
    ])
    return {
      webGL,
      webGL2,
      experimentalWebGL,
    }
  }
  catch (error) {
    console.error(error)
  }
}
