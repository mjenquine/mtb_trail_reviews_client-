import React, { Component } from 'react'
import ReviewList from './ReviewList'
import CreateReview from './CreateReview'
import Header from './Header'
import Login from './Login'
import { Switch, Route } from 'react-router-dom'


class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path='/' component={ReviewList} />
            <Route exact path='/create' component={CreateReview} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
