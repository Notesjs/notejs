import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { fetchUser } from '../actions/action_user'
import { Link } from 'react-router'

class existingUser extends Component {
  onSubmit (props) {
    this.props.fetchUser(props)
    this.context.router.push('/folders')
  }

  render () {
    const { fields: { email, password }, handleSubmit } = this.props
    return (
      <form className='authForm' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h1>Sign In</h1>

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
        <a href="/api/github/auth/github?scope=user:email"><img src="https://www.sourcecoast.com/images/jfbconnect/features/button_github.jpg"/></a>
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
