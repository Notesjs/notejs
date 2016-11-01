import React, { Component } from 'react'
import { Link } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar, {muiTheme} from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MenuItem from 'material-ui/MenuItem'
import Drawer from 'material-ui/Drawer'

injectTapEventPlugin()

class HomePage extends Component {

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

  render () {
    return (
      <div>
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
        <div className='background'>
          <div>
            <h1 className='title'><strong>NoteJS</strong></h1>
            <h3 className='tagline'>The premier note taking app for developers</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
