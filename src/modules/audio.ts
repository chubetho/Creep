const AUDIO_TRAP = Math.random()

async function hasFakeAudio() {
  const context = new OfflineAudioContext(1, 100, 44100)
  const oscillator = context.createOscillator()
  oscillator.frequency.value = 0
  oscillator.start(0)
  context.startRendering()

  return new Promise((resolve) => {
    context.oncomplete = (event) => {
      const channelData = event.renderedBuffer.getChannelData?.(0)
      if (!channelData)
        resolve(false)
      resolve(`${[...new Set(channelData)]}` !== '0')
    }
  }).finally(() => oscillator.disconnect())
}

export async function getAudio() {
  try {
    window.OfflineAudioContext = OfflineAudioContext || webkitOfflineAudioContext

    if (!window.OfflineAudioContext)
      return

    const bufferLen = 5000
    const context = new OfflineAudioContext(1, bufferLen, 44100)
    const analyser = context.createAnalyser()
    const oscillator = context.createOscillator()
    const dynamicsCompressor = context.createDynamicsCompressor()
    const biquadFilter = context.createBiquadFilter()

    // detect lie
    const dataArray = new Float32Array(analyser.frequencyBinCount)
    analyser.getFloatFrequencyData?.(dataArray)

    const values = {
      'AnalyserNode.channelCount': () => analyser.channelCount,
      'AnalyserNode.channelCountMode': () => analyser.channelCountMode,
      'AnalyserNode.channelInterpretation': () => analyser.channelInterpretation,
      'AnalyserNode.context.sampleRate': () => analyser.context.sampleRate,
      'AnalyserNode.fftSize': () => analyser.fftSize,
      'AnalyserNode.frequencyBinCount': () => analyser.frequencyBinCount,
      'AnalyserNode.maxDecibels': () => analyser.maxDecibels,
      'AnalyserNode.minDecibels': () => analyser.minDecibels,
      'AnalyserNode.numberOfInputs': () => analyser.numberOfInputs,
      'AnalyserNode.numberOfOutputs': () => analyser.numberOfOutputs,
      'AnalyserNode.smoothingTimeConstant': () => analyser.smoothingTimeConstant,
      'AnalyserNode.context.listener.forwardX.maxValue': () => analyser.context.listener.forwardX.maxValue,
      'BiquadFilterNode.gain.maxValue': () => biquadFilter.gain.maxValue,
      'BiquadFilterNode.frequency.defaultValue': () => biquadFilter.frequency.defaultValue,
      'BiquadFilterNode.frequency.maxValue': () => biquadFilter.frequency.maxValue,
      'DynamicsCompressorNode.attack.defaultValue': () => dynamicsCompressor.attack.defaultValue,
      'DynamicsCompressorNode.knee.defaultValue': () => dynamicsCompressor.knee.defaultValue,
      'DynamicsCompressorNode.knee.maxValue': () => dynamicsCompressor.knee.maxValue,
      'DynamicsCompressorNode.ratio.defaultValue': () => dynamicsCompressor.ratio.defaultValue,
      'DynamicsCompressorNode.ratio.maxValue': () => dynamicsCompressor.ratio.maxValue,
      'DynamicsCompressorNode.release.defaultValue': () => dynamicsCompressor.release.defaultValue,
      'DynamicsCompressorNode.release.maxValue': () => dynamicsCompressor.release.maxValue,
      'DynamicsCompressorNode.threshold.defaultValue': () => dynamicsCompressor.threshold.defaultValue,
      'DynamicsCompressorNode.threshold.minValue': () => dynamicsCompressor.threshold.minValue,
      'OscillatorNode.detune.maxValue': () => oscillator.detune.maxValue,
      'OscillatorNode.detune.minValue': () => oscillator.detune.minValue,
      'OscillatorNode.frequency.defaultValue': () => oscillator.frequency.defaultValue,
      'OscillatorNode.frequency.maxValue': () => oscillator.frequency.maxValue,
      'OscillatorNode.frequency.minValue': () => oscillator.frequency.minValue,
    }

    interface AudioData {
      floatFrequencyData: Float32Array
      floatTimeDomainData: Float32Array
      buffer: AudioBuffer
      compressorGainReduction: number
    }
    const getRenderedBuffer = (context: OfflineAudioContext): Promise<AudioData | null> => (new Promise((resolve) => {
      const analyser = context.createAnalyser()
      const oscillator = context.createOscillator()
      const dynamicsCompressor = context.createDynamicsCompressor()

      try {
        oscillator.type = 'triangle'
        oscillator.frequency.value = 10000
        dynamicsCompressor.threshold.value = -50
        dynamicsCompressor.knee.value = 40
        dynamicsCompressor.attack.value = 0
      }
      catch (err) {}

      oscillator.connect(dynamicsCompressor)
      dynamicsCompressor.connect(analyser)
      dynamicsCompressor.connect(context.destination)

      oscillator.start(0)
      context.startRendering()

      return context.addEventListener('complete', (event) => {
        try {
          dynamicsCompressor.disconnect()
          oscillator.disconnect()
          const floatFrequencyData = new Float32Array(analyser.frequencyBinCount)
          analyser.getFloatFrequencyData?.(floatFrequencyData)
          const floatTimeDomainData = new Float32Array(analyser.fftSize)
          if ('getFloatTimeDomainData' in analyser)
            analyser.getFloatTimeDomainData(floatTimeDomainData)

          return resolve({
            floatFrequencyData,
            floatTimeDomainData,
            buffer: event.renderedBuffer,
            compressorGainReduction: (
            // @ts-expect-error if unsupported
              dynamicsCompressor.reduction.value // webkit
              || dynamicsCompressor.reduction
            ),
          })
        }
        catch (error) {
          return resolve(null)
        }
      })
    }))
    const [
      audioData,
    ] = await Promise.all([
      getRenderedBuffer(new OfflineAudioContext(1, bufferLen, 44100)),
      hasFakeAudio().catch(() => false),
    ])

    const {
      floatFrequencyData,
      floatTimeDomainData,
      buffer,
      compressorGainReduction,
    } = audioData || {}

    const getSnapshot = (arr: number[], start: number, end: number) => {
      const collection = []
      for (let i = start; i < end; i++)
        collection.push(arr[i])

      return collection
    }
    const getSum = (arr?: Float32Array | number[]) => !arr
      ? 0
      : [...arr]
          .reduce((acc, curr) => (acc += Math.abs(curr)), 0)
    const floatFrequencyDataSum = getSum(floatFrequencyData)
    const floatTimeDomainDataSum = getSum(floatTimeDomainData)

    const copy = new Float32Array(bufferLen)
    let bins = new Float32Array()
    if (buffer) {
      buffer.copyFromChannel?.(copy, 0)
      bins = buffer.getChannelData?.(0) || []
    }
    const copySample = getSnapshot([...copy], 4500, 4600)
    const binsSample = getSnapshot([...bins], 4500, 4600)
    const sampleSum = getSum(getSnapshot([...bins], 4500, bufferLen))

    // sample matching
    const copyFromChannelSupported = ('copyFromChannel' in AudioBuffer.prototype)

    // sample uniqueness
    const totalUniqueSamples = new Set([...bins]).size

    // sample noise factor
    const getRandFromRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
    const getCopyFrom = (rand: number, buffer: AudioBuffer, copy: Float32Array) => {
      const { length } = buffer

      const max = 20
      const start = getRandFromRange(275, length - (max + 1))
      const mid = start + max / 2
      const end = start + max

      buffer.getChannelData(0)[start] = rand
      buffer.getChannelData(0)[mid] = rand
      buffer.getChannelData(0)[end] = rand
      buffer.copyFromChannel(copy, 0)
      const attack = [
        buffer.getChannelData(0)[start] === 0 ? Math.random() : 0,
        buffer.getChannelData(0)[mid] === 0 ? Math.random() : 0,
        buffer.getChannelData(0)[end] === 0 ? Math.random() : 0,
      ]
      return [...new Set([...buffer.getChannelData(0), ...copy, ...attack])].filter(x => x !== 0)
    }

    const getCopyTo = (rand: number, buffer: AudioBuffer, copy: Float32Array) => {
      buffer.copyToChannel(copy.map(() => rand), 0)
      const frequency = buffer.getChannelData(0)[0]
      const dataAttacked = [...buffer.getChannelData(0)]
        .map(x => x !== frequency || !x ? Math.random() : x)
      return dataAttacked.filter(x => x !== frequency)
    }

    const getNoiseFactor = () => {
      const length = 2000
      try {
        const result = [...new Set([
          ...getCopyFrom(
            AUDIO_TRAP,
            new AudioBuffer({ length, sampleRate: 44100 }),
            new Float32Array(length),
          ),
          ...getCopyTo(
            AUDIO_TRAP,
            new AudioBuffer({ length, sampleRate: 44100 }),
            new Float32Array(length),
          ),
        ])]
        return +(
          result.length !== 1
          && result.reduce((acc, n) => acc += +n, 0)
        )
      }
      catch (error) {
        console.error(error)
        return 0
      }
    }

    const noiseFactor = getNoiseFactor()
    const noise = (
      noiseFactor || [...new Set(bins.slice(0, 100))]
        .reduce((acc, n) => acc += n, 0)
    )

    return {
      totalUniqueSamples,
      compressorGainReduction,
      floatFrequencyDataSum,
      floatTimeDomainDataSum,
      sampleSum,
      binsSample,
      copySample: copyFromChannelSupported ? copySample : [undefined],
      values,
      noise,
    }
  }
  catch (error) {
  }
}
