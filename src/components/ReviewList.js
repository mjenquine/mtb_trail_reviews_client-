import React, { Component } from 'react'
import Review from './Review'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const FEED_QUERY = gql`
  {
    feed {
      reviews {
        id
        createdAt
        trailName
        trailCondition
        postedBy {
          id
          name
        }
      }
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

          const reviewsToRender = data.feed.reviews

          return (
            <div>
              {reviewsToRender.map((review, index) => <Review key={review.id} review={review} index={index} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default ReviewList
