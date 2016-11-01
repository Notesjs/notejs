import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import reducers from './reducers'
import routes from './routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import reduxThunk from 'redux-thunk'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)

render(
  <MuiThemeProvider>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={browserHistory}>{routes}</Router>
    </Provider>
  </MuiThemeProvider>
, document.getElementById('app'))
