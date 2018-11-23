import { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

type RouteChangeWatcherProps = RouteComponentProps & {
  menuOpen: boolean
  callback: () => void
  location: {}
  children: {}
}
class RouteChangeWatcher extends Component<RouteChangeWatcherProps> {
  componentDidUpdate (prevProps: RouteChangeWatcherProps) {
    const { menuOpen, callback, history, location } = this.props
    const locationIsNotTheSame = location !== prevProps.location
    if (locationIsNotTheSame) {
      window.scrollTo(0, 0)
      if (menuOpen && history.action === 'POP') {
        history.goForward()
        callback()
      }
    }
  }
  render () {
    return this.props.children
  }
}

export default withRouter(RouteChangeWatcher)
