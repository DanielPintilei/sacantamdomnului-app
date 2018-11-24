import { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

class RouteChangeWatcher extends Component<RouteComponentProps> {
  componentDidUpdate (prevProps: RouteComponentProps) {
    const { location } = this.props
    const locationIsNotTheSame = location !== prevProps.location
    if (locationIsNotTheSame) window.scrollTo(0, 0)
  }
  render () {
    return this.props.children
  }
}

export default withRouter(RouteChangeWatcher)
