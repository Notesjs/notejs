import React, { Component } from 'react'
import { Link } from 'react-router'
import AppBar, {muiTheme} from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import axios from 'axios'

class Payment extends Component {
  constructor (props) {
    super(props)
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(this.state.value);
  }

  componentDidMount(){

  }

  render () {
    return (
      <form>
        <input></input>
      </form>
      )
  }
}

export default Payment
