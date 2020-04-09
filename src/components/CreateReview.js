import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FEED_QUERY } from './ReviewList'
import { REVIEWS_PER_PAGE } from '../constants'

const POST_MUTATION = gql`
  mutation PostMutation($trailName: String!, $trailCondition: String!) {
    post(trailName: $trailName, trailCondition: $trailCondition) {
      id
      createdAt
      trailName
      trailCondition
    }
  }
`



class CreateReview extends Component {
  state = {
    trailName: '',
    trailCondition: '',
  }

  render() {
    const { trailName, trailCondition } = this.state
    return (
      <div>
        <div>
          <input
            value={trailName}
            onChange={e => this.setState({ trailName: e.target.value })}
            type='text'
            placeholder='e.g. hoyt park'
          />
          <input
            value={trailCondition}
            onChange={e => this.setState({ trailCondition: e.target.value })}
            type='text'
            placeholder='e.g. wet and muddy'
          />
        </div>
        <Mutation
          mutation={ POST_MUTATION }
          variables={{ trailName, trailCondition }}
          onCompleted={() => this.props.history.push('/new/1')}
          update={(store, { data: { post } }) => {
            const first = REVIEWS_PER_PAGE
            const skip = 0
            const orderBy = 'createdAt_DESC'
            const data = store.readQuery({
              query: FEED_QUERY,
              variables: { first, skip, orderBy }
            })
            data.feed.reviews.unshift(post)
            store.writeQuery({
              query: FEED_QUERY,
              data,
              variables: { first, skip, orderBy }
            })
          }}
        >
          {postMutation => <button onClick={postMutation}>submit</button>}
        </Mutation>
      </div>
    )
  }
}
export default CreateReview
