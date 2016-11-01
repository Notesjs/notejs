import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import AppBar, {muiTheme} from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import axios from 'axios'

class Payment extends Component {
  constructor (props) {
    super(props)
    this.state = {value: '', buttonValue: 'Continue'};
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(this.state.value);
  }

  componentDidMount(){
    const amount = localStorage.getItem("donation"); 
    const that = this;
    var form = document.querySelector('#my-sample-form');
    var submit = document.querySelector('input[type="submit"]');
    axios.get("/api/payments/client_token").
    then(function(token){
      console.log(token)
      braintree.client.create({
        authorization: `${token.data}`
        }, function (err, clientInstance) {
        if (err) {
          console.error(err);
          return;
        }
        // Create input fields and add text styles  
        braintree.hostedFields.create({
          client: clientInstance,
          styles: {
            'input': {
              'color': '#282c37',
              'font-size': '16px',
              'transition': 'color 0.1s',
              'line-height': '3',
            },
            // Style the text of an invalid input
            'input.invalid': {
              'color': '#E53A40'
            },
            // placeholder styles need to be individually adjusted
            '::-webkit-input-placeholder': {
              'color': 'rgba(0,0,0,0.6)'
            },
            ':-moz-placeholder': {
              'color': 'rgba(0,0,0,0.6)'
            },
            '::-moz-placeholder': {
              'color': 'rgba(0,0,0,0.6)'
            },
            ':-ms-input-placeholder ': {
              'color': 'rgba(0,0,0,0.6)'
            }

          },
          // Add information for individual fields
          fields: {
            number: {
              selector: '#card-number',
              placeholder: '1111 1111 1111 1111'
            },
            cvv: {
              selector: '#cvv',
              placeholder: '123'
            },
            expirationDate: {
              selector: '#expiration-date',
              placeholder: '10 / 2019'
            }
          }
        }, function (err, hostedFieldsInstance) {
          if (err) {
            console.error(err);
            return;
          }

          hostedFieldsInstance.on('validityChange', function (event) {
            // Check if all fields are valid, then show submit button
            var formValid = Object.keys(event.fields).every(function (key) {
              return event.fields[key].isValid;
            });

            if (formValid) {
              $('#button-pay').addClass('show-button');
            } else {
              $('#button-pay').removeClass('show-button');
            }
          });

          hostedFieldsInstance.on('empty', function (event) {
            $('header').removeClass('header-slide');
            $('#card-image').removeClass();
            $(form).removeClass();
          });

          hostedFieldsInstance.on('cardTypeChange', function (event) {
            // Change card bg depending on card type
            if (event.cards.length === 1) {
              $(form).removeClass().addClass(event.cards[0].type);
              $('#card-image').removeClass().addClass(event.cards[0].type);
              $('header').addClass('header-slide');
              
              // Change the CVV length for AmericanExpress cards
              if (event.cards[0].code.size === 4) {
                hostedFieldsInstance.setPlaceholder('cvv', '1234');
              } 
            } else {
              hostedFieldsInstance.setPlaceholder('cvv', '123');
            }
          });

          submit.addEventListener('click', function (event) {
            event.preventDefault();

            hostedFieldsInstance.tokenize(function (err, payload) {
              if (err) {
                console.error(err);
                return;
              }
              axios.post('/api/payments/nonce', {
                payload: payload,
                amount: amount,
              })
              .then(function (response) {
                console.log(response);
                that.setState({buttonValue: 'Thanks from the Notejs bois!'})
                setTimeout(function(){
                  browserHistory.push('/');
                }, 3000)
              })
              .catch(function (error) {
                console.log(error);
              });
            });
          }, false);
        });
      });
      })
  }

  render () {
    return (
      <div className="form-container">
        <header>
          <h1>Payment Method</h1>
        </header>
        <form id="my-sample-form" className="scale-down">
          <div className="cardinfo-card-number">
            <label className="cardinfo-label" htmlFor="card-number">Card Number</label>
            <div className='input-wrapper' id="card-number"></div>
            <div id="card-image"></div>
          </div>

          <div className="cardinfo-wrapper">
            <div className="cardinfo-exp-date">
              <label className="cardinfo-label" htmlFor="expiration-date">Valid Thru</label>
              <div className='input-wrapper' id="expiration-date"></div>
            </div>

            <div className="cardinfo-cvv">
              <label className="cardinfo-label" htmlFor="cvv">CVV</label>
              <div className='input-wrapper' id="cvv"></div>
            </div>
          </div>
        </form>

        <input id="button-pay" type="submit" value={this.state.buttonValue} />
      </div>
      )
  }
}

export default Payment
