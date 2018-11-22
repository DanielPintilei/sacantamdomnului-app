import { createGlobalStyle } from 'styled-components'
const OpenSans = require('../fonts/Open_Sans/OpenSans-Regular.ttf')
const OpenSansItalic = require('../fonts/Open_Sans/OpenSans-Italic.ttf')
const Lora = require('../fonts/Lora/Lora-Regular.ttf')
const LoraItalic = require('../fonts/Lora/Lora-Italic.ttf')

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Open Sans';
    font-weight: 400;
    font-style: normal;
    font-display: fallback;
    src: local('Open Sans Regular'), local('OpenSans-Regular'), url('${OpenSans}') format('truetype');
  }
  @font-face {
    font-family: 'Open Sans';
    font-weight: 400;
    font-style: italic;
    font-display: fallback;
    src: local('Open Sans Italic'), local('OpenSans-Italic'), url('${OpenSansItalic}') format('truetype');
  }
  @font-face {
    font-family: 'Lora';
    font-weight: 400;
    font-style: normal;
    font-display: fallback;
    src: local('Lora Regular'), local('Lora-Regular'), url('${Lora}') format('truetype');
  }
  @font-face {
    font-family: 'Lora';
    font-weight: 400;
    font-style: italic;
    font-display: fallback;
    src: local('Lora Italic'), local('Lora-Italic'), url('${LoraItalic}') format('truetype');
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

export default GlobalStyle
