interface MimeType {
  mimeType: string
  audioPlayType: string
  videoPlayType: string
  mediaSource: boolean
  mediaRecorder: boolean
}

export function getMedia() {
  try {
    const _mimeTypes = [
      'audio/ogg; codecs="vorbis"',
      'audio/mpeg',
      'audio/mpegurl',
      'audio/wav; codecs="1"',
      'audio/x-m4a',
      'audio/aac',
      'video/ogg; codecs="theora"',
      'video/quicktime',
      'video/mp4; codecs="avc1.42E01E"',
      'video/webm; codecs="vp8"',
      'video/webm; codecs="vp9"',
      'video/x-matroska',
    ].sort()

    const videoEl = document.createElement('video')
    const audioEl = new Audio()
    const isMediaRecorderSupported = 'MediaRecorder' in window
    const mimeTypes = _mimeTypes.reduce((acc, type) => {
      const data: MimeType = {
        mimeType: type,
        audioPlayType: audioEl.canPlayType(type),
        videoPlayType: videoEl.canPlayType(type),
        mediaSource: MediaSource.isTypeSupported(type),
        mediaRecorder: isMediaRecorderSupported ? MediaRecorder.isTypeSupported(type) : false,
      }
      if (!data.audioPlayType && !data.videoPlayType && !data.mediaSource && !data.mediaRecorder)
        return acc

      acc.push(data)
      return acc
    }, [] as MimeType[])

    return { mimeTypes }
  }
  catch (error) {
  }
}
