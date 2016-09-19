import React from 'react'
import { browserHistory } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import persistState from 'redux-localstorage'
import { createDevTools } from 'redux-devtools'
import Inspector from 'redux-devtools-inspector';
import DockMonitor from 'redux-devtools-dock-monitor'

export const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={false}>
    <Inspector />
  </DockMonitor>
)

const combinedReducer = combineReducers({
  routing: routerReducer,
})

const enhancer = compose(
  DevTools.instrument()
)

export const store = createStore(combinedReducer, enhancer)
export const history = syncHistoryWithStore(browserHistory, store)

