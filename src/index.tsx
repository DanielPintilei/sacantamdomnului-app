import React from 'react'
import { render } from 'react-dom'
// @ts-ignore
import App from './components/App'
import * as serviceWorker from './serviceWorker'

const rootElement = document.getElementById('root')

render(<App />, rootElement)

serviceWorker.register()
