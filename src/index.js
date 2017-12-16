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
    user-select: none;
  }
  body,
  pre {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }
  a {
    display: block;
  }
  button {
    padding-left: 12px;
    padding-right: 12px;
  }
  button,
  .button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    &:active {
      transform: scale(0.9);
    }
  }
  .headroom {
    z-index: 5 !important;
  }
`

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

if (module.hot) module.hot.accept()
