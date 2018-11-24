import React from 'react'
import { render } from 'react-dom'
import GlobalStyle from './components/GlobalStyle'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

const rootElement = document.getElementById('root')

render(
  <>
    <GlobalStyle />
    <App />
  </>,
  rootElement,
)

serviceWorker.register()
