import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <section className="hero is-black is-small">
        <div className="hero-body">
          <div className="container is-fluid has-text-centered">
            <h1 className="title has-text-weight-bold">
              TOSA MTB TRAIL CONDITIONS
            </h1>
            <h2 className="subtitle has-text-weight-bold">
              powered by local riders
            </h2>
          </div>
        </div>
        <div className="hero-foot">
          <nav className="tabs">
            <div className="container is-fluid has-background-black">
              <ul>
                <li className="has-text-weight-bold"><Link to='/'> Reviews </Link></li>
                <li className="has-text-weight-bold"><Link to='/search'> Search </Link></li>
                <li className="has-text-weight-bold">{authToken && (
                  <Link to='/create'> Submit </Link>
                )}</li>
                <li>{authToken ? (
                  <div
                    className="has-text-weight-bold"
                    onClick={() => {localStorage.removeItem(AUTH_TOKEN)
                    this.props.history.push('/')
                    }}
                  >
                    Logout
                  </div>
                ) : (
                  <Link
                    to='/login'
                    className="has-text-weight-bold"
                  >
                    Login
                  </Link>
                )}</li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    )
  }
}
export default withRouter(Header)
