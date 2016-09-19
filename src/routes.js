import React from 'react'
import { Router, Route, IndexRoute, Redirect, IndexRedirect } from 'react-router'

import { history } from './reducers'
import AppFrame from 'components/app/AppFrame'
import AppIndex from 'components/app/AppIndex'
// import Authenticate from 'components/route/Authenticate'
// import RedirectIfAuthenticated from 'components/route/RedirectIfAuthenticated'
// import AbilityCheck from 'components/route/AbilityCheck'

export default (
  <Router history={history}>
    <Route path="/" component={AppFrame}>
      <IndexRoute component={AppIndex} />
    </Route>
  </Router>
)
