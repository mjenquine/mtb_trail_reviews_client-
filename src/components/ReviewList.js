import React, { Component } from 'react'
import Review from './Review'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { REVIEWS_PER_PAGE } from '../constants'

export const FEED_QUERY = gql`
  query FeedQuery($first: Int, $skip: Int, $orderBy: ReviewOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy) {
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
      count
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
        const exists = prev.feed.reviews.find(({ id }) => id === newReview.id);
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

  _getQueryVariables = () => {
    const isNewPage = this.props.location.pathname.includes('new')
    const page = parseInt(this.props.match.params.page, 10)

    const skip = isNewPage ? (page - 1) * REVIEWS_PER_PAGE : 0
    const first = isNewPage ? REVIEWS_PER_PAGE : 100
    const orderBy = isNewPage ? 'createdAt_DESC' : null
    return { first, skip, orderBy }
  }

  render() {
    return (
      <Query query={FEED_QUERY} variables={this._getQueryVariables()}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          this._subscribeToNewReviews(subscribeToMore)

          const reviewsToRender = this._getReviewsToRender(data)
          const isNewPage = this.props.location.pathname.includes('new')
          const pageIndex = this.props.match.params.page
            ? (this.props.match.params.page - 1) * REVIEWS_PER_PAGE
            : 0

          return (
            <div>
              {reviewsToRender.map((review, index) => (<Review key={review.id} review={review} index={index + pageIndex} />))}
              {isNewPage && (
                <div>
                  <div onClick={this._previousPage}>
                    Previous
                  </div>
                  <div onClick={() => this._nextPage(data)}>
                    Next
                  </div>
                </div>
              )}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default ReviewList
