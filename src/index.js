import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { injectGlobal } from 'styled-components'
import OpenSans from './fonts/Open_Sans/OpenSans-Regular.ttf'
import OpenSansItalic from './fonts/Open_Sans/OpenSans-Italic.ttf'
import Lora from './fonts/Lora/Lora-Regular.ttf'
import LoraItalic from './fonts/Lora/Lora-Italic.ttf'

injectGlobal`
  @font-face {
    font-family: 'Open Sans';
    src: url('${OpenSans}') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Open Sans';
    src: url('${OpenSansItalic}') format('truetype');
    font-weight: 400;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'Lora';
    src: url('${Lora}') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Lora';
    src: url('${LoraItalic}') format('truetype');
    font-weight: 400;
    font-style: italic;
    font-display: swap;
  }
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
    will-change: transform;
    z-index: 5 !important;
  }
`

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

if (module.hot) module.hot.accept()
