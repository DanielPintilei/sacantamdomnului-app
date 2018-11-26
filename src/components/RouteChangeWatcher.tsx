import React, { useEffect, FC } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

const RouteChangeWatcher: FC<RouteComponentProps> = ({
  location,
  children,
}) => {
  useEffect(
    () => {
      window.scrollTo(0, 0)
    },
    [location.pathname],
  )
  return <>{children}</>
}

export default withRouter(RouteChangeWatcher)
