import React, { Component, Fragment } from 'react'
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

  _getReviewsToRender = data => {
    const isNewPage = this.props.location.pathname.includes('new')
    if (isNewPage) {
      return data.feed.reviews
    }

  }

  _nextPage = data => {
    const page = parseInt(this.props.match.params.page, 10)
    if (page <= data.feed.count / REVIEWS_PER_PAGE) {
      const nextPage = page + 1
      this.props.history.push(`/new/${nextPage}`)
    }
  }

  _previousPage = () => {
    const page = parseInt(this.props.match.params.page, 10)
    if (page > 1) {
      const previousPage = page - 1
      this.props.history.push(`/new/${previousPage}`)
    }
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
            <Fragment>
              {reviewsToRender.map((review, index) => (<Review key={review.id} review={review} index={index + pageIndex} />))}
              <br />
              <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                {isNewPage && (
                  <div>
                      <a
                        className="pagination-previous button is-dark is-small"    onClick={this._previousPage}
                      >
                        Previous
                      </a>
                      <a
                        className="pagination-next button is-dark is-small"
                        onClick={() => this._nextPage(data)}
                      >
                        Next page
                      </a>
                  </div>
                )}
              </nav>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default ReviewList
