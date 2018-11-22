import React from 'react'

// method taken from https://github.com/richtr/NoSleep.js/blob/master/NoSleep.js
// needs testing.

type WakeLockIOSProps = {
  preventSleep: boolean
}
class WakeLockIOS extends React.Component<WakeLockIOSProps> {
  static defaultProps = {
    preventSleep: true,
  }
  timer
  componentDidMount() {
    this.syncState(this.props.preventSleep)
  }

  componentWillUnmount() {
    this.syncState(false)
  }

  componentWillReceiveProps(nextProps) {
    this.syncState(nextProps.preventSleep)
  }

  syncState = preventSleep => {
    if (preventSleep && !this.timer) {
      this.timer = setInterval(() => {
        if (!document.hidden) {
          // gh-richtr/NoSleep.js#25
          // eslint-disable-next-line
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

  render() {
    return null
  }
}

export default WakeLockIOS
