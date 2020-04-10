import React, { Component } from 'react'
import ReviewList from './ReviewList'
import CreateReview from './CreateReview'
import Header from './Header'
import Login from './Login'
import Search from './Search'
import { Switch, Route, Redirect } from 'react-router-dom'


class App extends Component {
  render () {
    return (
      <div >
        <Header />
        <br />
        <div className="container is-fluid">
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/new/1' />} />
            <Route exact path='/create' component={CreateReview} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/new/:page' component={ReviewList} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
