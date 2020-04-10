import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

class Review extends Component {
  render() {
    return (

      <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{ this.props.review.trailName }</strong>
              <br />
              { this.props.review.trailCondition }
              <br />
              <strong className="has-text-danger">
                {this.props.review.postedBy
                  ? this.props.review.postedBy.name
                  : 'Unknown'}{' '}
              </strong>
              <small>
                {timeDifferenceForDate(this.props.review.createdAt)}
              </small>
            </p>
          </div>
        </div>
      </article>
    )
  }
}

export default Review
