import React from 'react'
import ReactDOM from 'react-dom'

import App from 'components/app/App'
import AppFrame from 'components/app/AppFrame'
import AppIndex from 'components/app/AppIndex'

ReactDOM.render(
  <App>
    <AppFrame>
      <AppIndex />
    </AppFrame>
  </App>,
  document.getElementById('app')
)
