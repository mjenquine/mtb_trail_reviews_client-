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
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Search Trails</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type='text'
                  onChange={e => this.setState({ filter: e.target.value })}
                />
              </p>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-dark" onClick={() => this._executeSearch()}>Search</button>
              </div>
            </div>
          </div>
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
