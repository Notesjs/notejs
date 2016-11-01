import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import AppBar, {muiTheme} from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import CurrencyInput from 'react-currency-input';
import axios from 'axios'

class PaymentInput extends Component {
  constructor (props) {
    super(props)
    this.state = {value: '', buttonValue: 'Continue', amount: "0.00"};
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(newValue){
        this.setState({amount: newValue});
        console.log(this.state.amount)
    }

    handleSubmit(){
      const amount = document.getElementById("donattion-input").value;
      localStorage.setItem("donation", amount)
      browserHistory.push("/payment")
    }

  render () {
    return (
      <div className="row donate">
          <div className="text-center col-lg-12 donate-text">
          <h1 className="text-center">Help support our "Noters"</h1>
          <p>Your donatations help keep the Notejs team working away like little worker bees. Buzz buzz. Buzz buzz.</p>
          <form className="donation-form" onSubmit={this.handleSubmit}>
            <CurrencyInput id="donattion-input" value={this.state.amount} onChange={this.handleChange}/>
            <input type="submit" />
          </form>
        </div>
        <div className='contain'>
          <div className='bee'>
            <div className='bee-body'>
              <div className='antena'>
                <div className='top'></div>
                <div className='top top-right'></div>
              </div>
              <div className='antena antena-right'></div>
              <div className='eye'></div>
              <div className='eye eye-right'></div>
              <div className='smile'>
                <div className='mouth'></div>
              </div>
              <div className='stripe'></div>
              <div className='stripe stripe-bottom'></div>
              <div className='wings'></div>
              <div className='wings wings-right'></div>
              <div className='stinger'></div>
            </div>
          </div>
          <div className='trail'></div>
        </div>
        <div className='talk'>
          <div className='bubble'>
            <h2>Buzz Buzz</h2>
            <div className='triangle'></div>
          </div>
        </div>
      </div>
      )
  }
}

export default PaymentInput
