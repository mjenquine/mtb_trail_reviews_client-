import React, { Component } from 'react'

class Review extends Component {
  render() {
    return (
      <div>
        <div>
          { this.props.review.trailName } | { this.props.review.trailCondition }
        </div>
      </div>
    )
  }
}

export default Review
