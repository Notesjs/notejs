import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { fetchUser } from '../actions/action_user'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'
import { Link } from 'react-router'

class existingUser extends Component {
  onSubmit (props) {
    this.props.fetchUser(props)
    this.context.router.push('/folders')
  }
  // onClick(){
  //   console.log('i was clicked');
  //   axios({
  //     method: 'get',
  //     url: '/login/facebook'
  //   })
  //   .then(function(resp){
  //     console.log('i reached it on the front end');
  //   })

  // }


  render () {
    const { fields: { email, password }, handleSubmit } = this.props
    return (
      <form className='authForm' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h1>Sign In</h1>
        <a href="/login/facebook"><img height="50" width="210" src="./images/facebook-login-button.png" /></a>


        <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
          <label>email</label>
          <input type='text' className='form-control' {...email} />
          <div className='text-help'>
            {email.touched ? email.error : ''}
          </div>
        </div>

        <div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}`}>
          <label>password</label>
          <input type='password' className='form-control' {...password} />
          <div className='text-help'>
            {password.touched ? password.error : ''}
          </div>
        </div>

        <button type='submit' className='signupButton'>Submit</button>
        <Link to='/' className='signupCancelButton'>Cancel</Link>
      </form>
    )
  }
}

existingUser.contextTypes = {
  router: PropTypes.object
}

function validate (values) {
  const errors = {}

  if (!values.email) {
    errors.email = 'Enter email'
  }
  if (!values.password) {
    errors.password = 'Enter password'
  }

  return errors
}

export default reduxForm({
  form: 'ExistingUserForm',
  fields: ['email', 'password'],
  validate
}, null, { fetchUser })(existingUser)
