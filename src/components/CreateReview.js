import React, { Component } from 'react'

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
            onChange{ e => this.setState({ trailName: e.target.value })}
            type='text'
            placeholder='e.g. hoyt park'
          />
          <input
            value={trailCondition}
            onChange{ e => this.setState({ trailCondition: e.target.value })}
            type='text'
            placeholder='e.g. wet and muddy'
          />
        </div>
        <button onClick={}>submit</button>
      </div>

    )
  }
}
