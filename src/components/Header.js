import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    return (
      <div>
        <Link to='/'> Reviews </Link>
        <Link to='/create'> Submit </Link>

      </div>
    )
  }
}
export default withRouter(Header)
