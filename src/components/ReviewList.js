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

const NEW_REVIEWS_SUBSCRIPTION = gql`
  subscription {
    newReview {
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
`

class ReviewList extends Component {

  _subscribeToNewReviews = subscribeToMore => {
    subscribeToMore({
      document: NEW_REVIEWS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newReview = subscriptionData.data.newReview
        const exists = prev.feed.reviews.find(({ id }) => id === newreview.id);
        if (exists) return prev;

        return Object.assign({}, prev, {
          feed: {
            reviews: [newReview, ...prev.feed.reviews],
            count: prev.feed.reviews.length + 1,
            __typename: prev.feed.__typename
          }
        })
      }
    })
  }

  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          this._subscribeToNewReviews(subscribeToMore)

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
