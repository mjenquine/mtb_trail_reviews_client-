import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Review from './Review'

class Search extends Component {
  state = {
    reviews: [],
    filter: ''
  }

  render() {
    return (
      <div>
        <div>
          Search
          <input
            type='text'
            onChange={e => this.setState({ filter: e.target.value })}
          />
          <button onClick={() => this._executeSearch()}>OK</button>
        </div>
        {this.state.reviews.map((review, index) => (
          <Review key={review.id} review={review} index={index} />
        ))}
      </div>
    )
  }

  _executeSearch = async () => {

  }
}

export default withApollo(Search)
