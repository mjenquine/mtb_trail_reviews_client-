import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Review from './Review'

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      reviews {
        id
        trailName
        trailCondition
        createdAt
        postedBy {
          id
          name
        }
      }
    }
  }
`

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
    const { filter } = this.state
    const result = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter },
    })
    const reviews = result.data.feed.reviews
    this.setState({ reviews })
  }
}

export default withApollo(Search)
