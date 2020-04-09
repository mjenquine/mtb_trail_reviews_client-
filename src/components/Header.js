import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div>

        <div>
          <Link to='/'> Reviews </Link>
        </div>

        <div>
          <Link to='/search'> Search </Link>
        </div>

        <div>
          {authToken && (
            <Link to='/create'> Submit </Link>
          )}
        </div>

        <div>
          {authToken ? (
            <div
              onClick={() => {localStorage.removeItem(AUTH_TOKEN)
              this.props.history.push('/')
              }}
            >
              Logout
            </div>
          ) : (
            <Link to='/login'>
              login
            </Link>
          )}
        </div>

      </div>
    )
  }
}
export default withRouter(Header)
