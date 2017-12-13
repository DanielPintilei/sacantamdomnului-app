import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { injectGlobal } from 'styled-components'

injectGlobal`
  * {
  box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }
  ::selection {
    color: #fff;
    background-color: slateblue;
  }
  button,
  label {
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    &:active {
      transform: scale(0.9);
    }
  }
`

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

if (module.hot) module.hot.accept()
