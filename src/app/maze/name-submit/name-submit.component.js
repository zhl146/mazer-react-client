import React, { Component } from 'react'
import { func, bool, object } from 'prop-types'

import './name-submit.css'

export class NameSubmit extends Component {
  static propTypes = {
    toggleDisplay: func.isRequired,
    onSubmit: func.isRequired,
    display: bool.isRequired,
    history: object.isRequired,
  }

  state = { input: '' }

  handleChange = e => this.setState({ input: e.target.value })
  handleSubmit = () => {
    this.props.toggleDisplay()
    this.props.onSubmit(this.state.input, this.props.history)
  }

  render() {
    const { toggleDisplay, display } = this.props
    return !display ? null : (
      <div className="name-submit">
        <div className="name-submit__box">
          <input
            className="name-submit__input"
            placeholder="DISPLAY NAME"
            value={this.state.input}
            onChange={this.handleChange}
          />
          <button className="generic__btn" onClick={toggleDisplay}>
            Cancel
          </button>
          <button className="generic__btn" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    )
  }
}
