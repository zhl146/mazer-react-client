import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedMaze } from './app/maze/maze.container'

import registerServiceWorker from './registerServiceWorker'

import './utils/styles/normalize.css'
import './utils/styles/generic.css'

import configureStore from './store/store-config'

ReactDOM.render(
  <Provider store={configureStore()}>
    <ConnectedMaze />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
