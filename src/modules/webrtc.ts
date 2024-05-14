export async function getWebRTCDevices() {
  if (!navigator?.mediaDevices?.enumerateDevices)
    return null
  return navigator.mediaDevices.enumerateDevices().then((devices) => {
    return devices.map(device => device.kind).sort()
  })
}

export async function getMediaCapabilities() {
  const video = {
    width: 1920,
    height: 1080,
    bitrate: 120000,
    framerate: 60,
  }

  const audio = {
    channels: 2,
    bitrate: 300000,
    samplerate: 5200,
  }

  const codecs = [
    'audio/ogg; codecs=vorbis',
    'audio/ogg; codecs=flac',
    'audio/mp4; codecs="mp4a.40.2"',
    'audio/mpeg; codecs="mp3"',
    'video/ogg; codecs="theora"',
    'video/mp4; codecs="avc1.42E01E"',
  ]

  const decodingInfo = codecs.map((codec) => {
    const config = getMediaConfig(codec, video, audio) as MediaDecodingConfiguration
    return navigator.mediaCapabilities.decodingInfo(config).then(support => ({
      codec,
      ...support,
    }))
      .catch(error => console.error(codec, error))
  })

  const capabilities = await Promise.all(decodingInfo).then((data) => {
    return data.reduce((acc, support) => {
      const { codec, supported, smooth, powerEfficient } = support || {}
      if (!supported)
        return acc
      return {
        ...acc,
        [`${codec}`]: [
          ...(smooth ? ['smooth'] : []),
          ...(powerEfficient ? ['efficient'] : []),
        ],
      }
    }, {})
  }).catch(error => console.error(error))

  return capabilities
}

function getMediaConfig(
  codec: string,
  video: {
    width: number
    height: number
    bitrate: number
    framerate: number
  },
  audio: {
    channels: number
    bitrate: number
    samplerate: number
  },
) {
  return {
    type: 'file',
    video: !codec.startsWith('video')
      ? undefined
      : {
          contentType: codec,
          ...video,
        },
    audio: !codec.startsWith('audio')
      ? undefined
      : {
          contentType: codec,
          ...audio,
        },
  }
}

function getExtensions(sdp: string) {
  const extensions = ((`${sdp}`).match(/extmap:\d+ [^\n|\r]+/g) || [])
    .map(x => x.replace(/extmap:[^\s]+ /, ''))
  return [...new Set(extensions)].sort()
}

function createCounter() {
  let counter = 0
  return {
    increment: () => counter += 1,
    getValue: () => counter,
  }
}

interface Description {
  channels?: number
  mimeType?: string
  feedbackSupport?: string[]
  sdpFmtpLine?: string[]
  clockRates?: number[]
}
function constructDescriptions({ mediaType, sdp, sdpDescriptors, rtxCounter }: {
  mediaType: string
  sdp: string
  sdpDescriptors: string[]
  rtxCounter: ReturnType<typeof createCounter>

}) {
  if (!(`${sdpDescriptors}`))
    return

  const getLineData = (x: string) => x.replace(/[^\s]+ /, '')

  return sdpDescriptors.reduce((descriptionAcc, descriptor) => {
    const matcher = `(rtpmap|fmtp|rtcp-fb):${descriptor} (.+)`
    const formats = (sdp.match(new RegExp(matcher, 'g')) || [])
    if (!(`${formats}`))
      return descriptionAcc

    const isRtxCodec = (`${formats}`).includes(' rtx/')
    if (isRtxCodec) {
      if (rtxCounter.getValue())
        return descriptionAcc

      rtxCounter.increment()
    }
    const description = formats.reduce((acc, x) => {
      const rawData = getLineData(x)
      const data = rawData.split('/')
      const codec = data[0]
      const _description: Description = {}

      if (x.includes('rtpmap')) {
        if (mediaType === 'audio')
          _description.channels = (+data[2]) || 1

        _description.mimeType = `${mediaType}/${codec}`
        _description.clockRates = [+data[1]]
        return {
          ...acc,
          ..._description,
        }
      }
      else if (x.includes('rtcp-fb')) {
        return {
          ...acc,
          feedbackSupport: [...(acc.feedbackSupport || []), rawData],
        }
      }
      else if (isRtxCodec) {
        return acc // no sdpFmtpLine
      }
      return { ...acc, sdpFmtpLine: [...rawData.split(';')] }
    }, {} as Description)

    let shouldMerge = false
    const mergerAcc = descriptionAcc.map((x) => {
      shouldMerge = x.mimeType === description.mimeType
      if (shouldMerge) {
        if (x.feedbackSupport) {
          x.feedbackSupport = [
            ...new Set([...x.feedbackSupport, ...(description.feedbackSupport ?? [])]),
          ]
        }
        if (x.sdpFmtpLine) {
          x.sdpFmtpLine = [
            ...new Set([...x.sdpFmtpLine, ...(description.sdpFmtpLine ?? [])]),
          ]
        }
        if (x.clockRates) {
          x.clockRates = [
            ...new Set([...x.clockRates, ...(description.clockRates ?? [])]),
          ]
        }
        return x
      }

      return x
    })
    if (shouldMerge)
      return mergerAcc

    return [...descriptionAcc, description]
  }, [] as Description[])
}

function getCapabilities(sdp: string) {
  const videoDescriptors = ((/m=video [^\s]+ [^\s]+ ([^\n|\r]+)/.exec(sdp) || [])[1] || '').split(' ')
  const audioDescriptors = ((/m=audio [^\s]+ [^\s]+ ([^\n|\r]+)/.exec(sdp) || [])[1] || '').split(' ')
  const rtxCounter = createCounter()
  return {
    audio: constructDescriptions({
      mediaType: 'audio',
      sdp,
      sdpDescriptors: audioDescriptors,
      rtxCounter,
    }),
    video: constructDescriptions({
      mediaType: 'video',
      sdp,
      sdpDescriptors: videoDescriptors,
      rtxCounter,
    }),
  }
}

function getIPAddress(sdp: string) {
  const blocked = '0.0.0.0'
  const candidateEncoding = /((udp|tcp)\s)((\d|\w)+\s)((\d|\w|(\.|\:))+)(?=\s)/ig
  const connectionLineEncoding = /(c=IN\s)(.+)\s/ig
  const connectionLineIpAddress = ((sdp.match(connectionLineEncoding) || [])[0] || '').trim().split(' ')[2]
  if (connectionLineIpAddress && (connectionLineIpAddress !== blocked))
    return connectionLineIpAddress

  const candidateIpAddress = ((sdp.match(candidateEncoding) || [])[0] || '').split(' ')[2]
  return candidateIpAddress && (candidateIpAddress !== blocked) ? candidateIpAddress : undefined
}

export async function getWebRTC() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    if (!window.RTCPeerConnection)
      return resolve(null)

    const config = {
      iceCandidatePoolSize: 1,
      iceServers: [
        {
          urls: [
            'stun:stun4.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
          ],
        },
      ],
    }

    const connection = new RTCPeerConnection(config)
    connection.createDataChannel('')

    const options = { offerToReceiveAudio: 1, offerToReceiveVideo: 1 }

    const offer = await connection.createOffer(options as unknown as RTCOfferOptions)

    connection.setLocalDescription(offer)
    const sdp = offer.sdp!

    const extensions = getExtensions(sdp)
    const codecsSdp = getCapabilities(sdp)

    let iceCandidate = ''
    let foundation = ''

    const giveUpOnIPAddress = setTimeout(() => {
      connection.removeEventListener('icecandidate', computeCandidate)
      connection.close()
      if (sdp) {
        return resolve({
          codecsSdp,
          extensions,
          foundation,
          iceCandidate,
        })
      }
      return resolve(null)
    }, 3000)

    function computeCandidate(event: RTCPeerConnectionIceEvent) {
      const { candidate, foundation: foundationProp } = event.candidate || {}

      if (!candidate)
        return

      if (!iceCandidate) {
        iceCandidate = candidate
        foundation = (/^candidate:([\w]+)/.exec(candidate) || [])[1] || ''
      }

      const { sdp } = connection.localDescription || {}
      if (!sdp)
        return
      const address = getIPAddress(sdp)

      const knownInterface: Record<string, string> = {
        842163049: 'public interface',
        2268587630: 'WireGuard',
      }

      connection.removeEventListener('icecandidate', computeCandidate)
      clearTimeout(giveUpOnIPAddress)
      connection.close()
      return resolve({
        codecsSdp,
        extensions,
        foundation: knownInterface[foundation] || foundation,
        foundationProp,
        iceCandidate,
        address,
        stunConnection: candidate,
      })
    }

    connection.addEventListener('icecandidate', computeCandidate)
  })
}
