import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './components/app'
import ViewFolder from './components/view_folder'
import ViewAllFiles from './components/view_allfiles'
import ViewNoteIndex from './components/view_note_index'
import ViewSignIn from './components/view_signin'
import ViewSignUp from './components/view_signup'
import ViewHomePage from './components/view_homepage'
import ViewFolders from './components/view_folders'
import ViewNoteContent from './components/view_notecontent'
import paymentInput from './components/view_payment_input'
import Payment from './components/payment'

export default (
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={ViewHomePage} />
        <Route path='notes/:id' component={ViewNoteContent} />
        <Route path='editNote/:id' component={ViewNoteIndex} />
        <Route path='signup' component={ViewSignUp} />
        <Route path='signin' component={ViewSignIn} />
        <Route path='all' component={ViewAllFiles} />
        <Route path='payment' component={Payment} />
        <Route path='donate' component={paymentInput} />
      </Route>
      <Route path='folders' component={ViewFolders} />
      <Route path='folders/:id' component={ViewFolder} />
    </Router>
)
