import { Component } from 'react'

// method taken from https://github.com/richtr/NoSleep.js/blob/master/NoSleep.js
// needs testing.

type WakeLockIOSProps = {
  preventSleep: boolean
}
class WakeLockIOS extends Component<WakeLockIOSProps> {
  static defaultProps = {
    preventSleep: true,
  }
  timer: any
  componentDidMount () {
    this.syncState(this.props.preventSleep)
  }
  componentWillUnmount () {
    this.syncState(false)
  }
  componentWillReceiveProps (nextProps: WakeLockIOSProps) {
    this.syncState(nextProps.preventSleep)
  }
  syncState = (preventSleep: boolean) => {
    if (preventSleep && !this.timer) {
      this.timer = setInterval(() => {
        if (!document.hidden) {
          // gh-richtr/NoSleep.js#25
          window.location.href = window.location.href // gh-richtr/NoSleep.js#12
          setTimeout(window.stop, 0)
        }
      }, 15000)
    }
    if (!preventSleep && this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
  render (): any {
    return null
  }
}

export default WakeLockIOS
