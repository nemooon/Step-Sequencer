import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'
import numeralLangJa from 'numeral/languages/ja'

import App from 'components/app/App'
import routes from './routes'
import { store, DevTools } from './reducers'

import 'js-polyfills/url'

window.ondragover = window.ondrop = function(e) {
  e.preventDefault()
  return false
}

ReactDOM.render(
  <Provider store={store}>
    <App>
      {routes}
      <DevTools />
    </App>
  </Provider>,
  document.getElementById('app')
)

moment.locale('ja')

numeral.language('ja', numeralLangJa)
numeral.language('ja')

NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]
HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]
