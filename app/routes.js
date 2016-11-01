import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/app'
import ViewFolder from './components/view_folder'
import ViewAllFiles from './components/view_allfiles'
import ViewNoteIndex from './components/view_note_index'
import ViewSignIn from './components/view_signin'
import ViewSignUp from './components/view_signup'
import ViewHomePage from './components/view_homepage'
import ViewFolders from './components/view_folders'
import ViewNoteContent from './components/view_notecontent'
import ViewDonate from './components/view_donate'
import ViewThankYou from './components/view_thankyou'

export default (
  <Route path='/' component={App} >
    <IndexRoute component={ViewHomePage} />
    <Route path='signup' component={ViewSignUp} />
    <Route path='signin' component={ViewSignIn} />
    <Route path='all' component={ViewAllFiles} />
    <Route path='folders' component={ViewFolders} />
    <Route path='folders/:id' component={ViewFolder} />
    <Route path='notes/:id' component={ViewNoteContent} />
    <Route path='editNote/:id' component={ViewNoteIndex} />
    <Route path='donate' component={ViewDonate} />
    <Route path='donate/thankyou' component={ViewThankYou} />
  </Route>
)
