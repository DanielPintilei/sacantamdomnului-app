import React from 'react'
import PropTypes from 'prop-types'

const media = {
  // raw files taken from https://github.com/mathiasbynens/small
  WebM:
    'data:video/webm;base64, GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FAAw9CQE2AQAZ3aGFtbXlXQUAGd2hhbW15RIlACECPQAAAAAAAFlSua0AxrkAu14EBY8WBAZyBACK1nEADdW5khkAFVl9WUDglhohAA1ZQOIOBAeBABrCBCLqBCB9DtnVAIueBAKNAHIEAAIAwAQCdASoIAAgAAUAmJaQAA3AA/vz0AAA=',
  MP4:
    'data:video/mp4;base64, AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAGm1kYXQAAAGzABAHAAABthBgUYI9t+8AAAMNbW9vdgAAAGxtdmhkAAAAAMXMvvrFzL76AAAD6AAAACoAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAABhpb2RzAAAAABCAgIAHAE/////+/wAAAiF0cmFrAAAAXHRraGQAAAAPxcy++sXMvvoAAAABAAAAAAAAACoAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAgAAAAIAAAAAAG9bWRpYQAAACBtZGhkAAAAAMXMvvrFzL76AAAAGAAAAAEVxwAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABaG1pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAShzdGJsAAAAxHN0c2QAAAAAAAAAAQAAALRtcDR2AAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAgACABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAAXmVzZHMAAAAAA4CAgE0AAQAEgICAPyARAAAAAAMNQAAAAAAFgICALQAAAbABAAABtYkTAAABAAAAASAAxI2IAMUARAEUQwAAAbJMYXZjNTMuMzUuMAaAgIABAgAAABhzdHRzAAAAAAAAAAEAAAABAAAAAQAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAASAAAAAQAAABRzdGNvAAAAAAAAAAEAAAAsAAAAYHVkdGEAAABYbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAraWxzdAAAACOpdG9vAAAAG2RhdGEAAAABAAAAAExhdmY1My4yMS4x',
}

const ugiEvents = ['mousedown', 'touchend']

function addSourceToVideo (element, type, dataURI) {
  const source = document.createElement('source')
  source.src = dataURI
  source.type = 'video/' + type
  element.appendChild(source)
}

class WakeLockAndroid extends React.Component {
  static propTypes = {
    preventSleep: PropTypes.bool,
  }

  static defaultProps = {
    preventSleep: true,
  }

  componentDidMount () {
    // Create a <video> tag that plays a blank/dummy in a loop.
    // It's not necessary to *add* the tag to the document.
    this.dummyVideo = document.createElement('video')
    this.dummyVideo.setAttribute('loop', '')

    addSourceToVideo(this.dummyVideo, 'webm', media.WebM)
    addSourceToVideo(this.dummyVideo, 'mp4', media.MP4)

    this.syncState(this.props.preventSleep)
  }

  componentWillUnmount () {
    delete this.dummyVideo
  }

  componentWillReceiveProps (nextProps) {
    this.syncState(nextProps.preventSleep)
  }

  syncState = preventSleep => {
    if (preventSleep) {
      if (this.dummyVideo.paused) {
        // We need a "user generated intervention" to start the video.
        // Otherwise the browser won't prevent sleep.
        this.removeListeners()
        this.addListeners()
      }
      this.dummyVideo.play().catch(err => console.log(err))
    } else {
      this.removeListeners()

      this.dummyVideo.pause()
    }
  }

  removeListeners = () => {
    for (let i = 0; i < ugiEvents.length; i++) {
      document.removeEventListener(ugiEvents[i], this.startVideo, false)
    }
  }

  addListeners = () => {
    for (let i = 0; i < ugiEvents.length; i++) {
      document.addEventListener(ugiEvents[i], this.startVideo, false)
    }
  }

  startVideo = () => {
    this.removeListeners()
    this.dummyVideo.play().catch(err => console.log(err))
  }

  render () {
    return null
  }
}

export default WakeLockAndroid