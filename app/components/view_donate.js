import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar, {muiTheme} from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MenuItem from 'material-ui/MenuItem'
import Drawer from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'

const style = {
  margin: 12
}

const body = {
  margin: 50
}

class ViewDonate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      clicked: false,
      value: '',
      approval_url: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleToggle () {
    this.setState({open: !this.state.open})
  }

  handleClose () {
    this.setState({open: false})
  }

  handleChange (event) {
    this.setState({value: event.target.value})
    console.log(this.state.value, 'value', event, 'event')
    axios.get('/api/donate/create', {
      params: {
        total: event.target.value
      }
    })
     .then((response) => {
      //  this.state.approval_url = response.data.approval_url
       console.log(response.data.approval_url, 'approval url')
       this.setState({approval_url: response.data.approval_url})
       this.setState({clicked: true})
     })
     .catch((error) => {
       console.log(error)
     })
  }

  handleSubmit (event) {
    // alert('Text field value is: ' + this.state.value);
    axios.get('/api/donate/create', {
      params: {
        total: this.state.value
      }
    })
     .then((response) => {
      //  this.state.approval_url = response.data.approval_url
       console.log(response.data.approval_url, 'approval url')
       this.setState({approval_url: response.data.approval_url})
       this.setState({clicked: true})
     })
     .catch((error) => {
       console.log(error)
     })
  }

  render () {
    return (
      <div>
        <AppBar
          title='NoteJS'
          className='navbar'
          iconClassNameRight='muidocs-icon-navigation-expand-more'
          onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
          iconElementRight={
            <span>
              <FlatButton label='Donate' className='donateButton' containerElement={<Link to='donate' />} />
              <FlatButton label='Sign in' className='authButtons' containerElement={<Link to='signin' />} />
              <FlatButton label='Sign up' className='authButtons' containerElement={<Link to='signup' />} />
            </span>
          }
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
          <h1>Donate</h1>
          <p>Your support will help Notejs continue providing excellent service and develop new features.</p>
          <RadioButtonGroup
            name='DonateRadioButtonGroup'>
            <RadioButton
              value='1'
              label='$1'
              style={style.radioButton}
              onClick={this.handleChange}
            />
            <RadioButton
              value='5'
              label='$5'
              style={style.radioButton}
              onClick={this.handleChange}
            />
            <RadioButton
              value='10'
              label='$10'
              style={style.radioButton}
              onClick={this.handleChange}
            />
            <RadioButton
              value='20'
              label='$20'
              style={style.radioButton}
              onClick={this.handleChange}
            />
            <RadioButton
              value='50'
              label='$50'
              style={style.radioButton}
              onClick={this.handleChange}
            />
            <RadioButton
              value='100'
              label='$100'
              style={style.radioButton}
              onClick={this.handleChange}
            />
          </RadioButtonGroup>
          <input type='text'
            placeholder='Other amount'
            value={this.state.value}
            onChange={this.handleChange}
            style={style} />

          {this.state.approval_url ? (
            <a href={this.state.approval_url}>
              <RaisedButton className='noteBottomButtons' label='Confirm Donation' primary={true} />
            </a>
          ) : (
            <RaisedButton label='Confirm Donation' disabled={true} />
          )}

          <br />(This will take you to PayPal to confirm your donation.)
        </div>
      </div>
    )
  }
}

export default ViewDonate
