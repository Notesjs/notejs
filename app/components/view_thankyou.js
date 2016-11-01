import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar, {muiTheme} from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MenuItem from 'material-ui/MenuItem'
import Drawer from 'material-ui/Drawer'

const navStyle = {
  backgroundColor: '#1E88E5',
  fontFamily: 'sans-serif'
}

const navButtons = {
  color: 'white',
  marginTop: 5,
  backgroundColor: '#1E88E5'
}

const body = {
  margin: 50
}

class ViewThankYou extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  handleToggle () {
    this.setState({open: !this.state.open})
  }

  handleClose () {
    this.setState({open: false})
  }

  render () {
    return (
      <div>
        <AppBar
          title='NoteJS'
          iconClassNameRight='muidocs-icon-navigation-expand-more'
          onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
          iconElementRight={
            <span>
              <FlatButton label='Donate' className='donateButton' containerElement={<Link to='donate' />} style={navButtons} />
              <FlatButton label='Sign in' className='authButtons' containerElement={<Link to='signin' />} style={navButtons} />
              <FlatButton label='Sign up' className='authButtons' containerElement={<Link to='signup' />} style={navButtons} />
            </span>
          }
          style={navStyle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem >About Us</MenuItem>
          <MenuItem >Career Opportunities</MenuItem>
          <MenuItem >Contact Us</MenuItem>
        </Drawer>
        <div style={body}>
          <h1>Thank You</h1>
          <p>Your support will help Notejs continue providing excellent service and develop new features.</p>
        </div>
      </div>
    )
  }
}

export default ViewThankYou
