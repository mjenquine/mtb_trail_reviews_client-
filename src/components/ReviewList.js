import React, { Component } from 'react'
import Review from './Review'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const FEED_QUERY = gql`
  {
    feed {
        id
        trailName
        trailCondition
    }
  }
`

class ReviewList extends Component {
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          const reviewsToRender = data.feed

          return (
            <div>
              {reviewsToRender.map(review => <Review key={review.id} review={review} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default ReviewList
