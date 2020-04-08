import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'

class Login extends Component {
  state = {
    login: true,
    email: '',
    password: '',
    name: '',
  }

  render() {
    const { login, email, password, name } = this.state
    return (
      <div>


        <h4> {login ? 'Login' : 'Sign Up'}</h4>


        <div>
          {!login && (
            <input
              value={name}
              onChange={ e => this.setState({ name: e.target.value })}
              type='text'
              placeholder='your name'
            />
          )}
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type='text'
            placeholder='your email'
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type='text'
            placeholder='password'
          />
        </div>


        <div>
          <div className="button" onClick={() => this._confirm()}>
            {login ? 'login' : 'create account'}
          </div>
          <div className="button" onClick={() => this.setState({ login: !login })}>
            {login ? 'need an account?' : 'already have an account?'}
          </div>
        </div>


      </div>
    )
  }


  _confirm = async () => {
    console.log("Hi");
  }
  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }


}

export default Login
