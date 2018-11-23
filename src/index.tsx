import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStyle from './components/GlobalStyle'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root'),
)

serviceWorker.register()
