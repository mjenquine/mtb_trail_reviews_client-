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
        <input
          value={trailName}
          onChange{ e => this.setState({ trailName: e.target.value })}
          type='text'
          placeholder='ie. Hoyt Park'
        />
      </div>

    )
  }
}
