import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar, {muiTheme} from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MenuItem from 'material-ui/MenuItem'
import Drawer from 'material-ui/Drawer'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {open: false}
  }

  handleToggle () {
    this.setState({open: !this.state.open})
  }

  handleClose () {
    this.setState({open: false})
  }
  handleTouchTap() {
  	browserHistory.push('/')
  }

  render () {
    return (
      <div>
      	<AppBar
		    title={<span id="tittle">NoteJS</span>}
		    className='navbar'
		    onTitleTouchTap={this.handleTouchTap}
		    iconElementRight={
            <span>
              <FlatButton label='Sign in' className='authButtons' containerElement={<Link to='signin' />} />
              <FlatButton label='Sign up' className='authButtons' containerElement={<Link to='signup' />} />
              <FlatButton label='Donate' className='authButtons' containerElement={<Link to='donate' />} />
            </span>
          }
		  />
        {this.props.children}
      </div>
    )
  }
}

export default App
