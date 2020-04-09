import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

class Review extends Component {
  render() {
    return (
      <div>
        <div>
          { this.props.review.trailName } | { this.props.review.trailCondition }
        </div>
        <div>
          {this.props.review.postedBy
            ? this.props.review.postedBy.name
            : 'Unknown'}{' '}
          {timeDifferenceForDate(this.props.review.createdAt)}
        </div>
      </div>
    )
  }
}

export default Review
