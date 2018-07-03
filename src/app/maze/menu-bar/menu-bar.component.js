import React from 'react'
import { bool, func, object } from 'prop-types'

import './menu-bar.css'
import { Link } from 'react-router-dom'
import { ConnectedNameSubmit } from '../name-submit/name-submit.container'

MenuBar.propTypes = {
  onResetClick: func.isRequired,
  toggleHelp: func.isRequired,
  toggleSubmit: func.isRequired,
  user: object,
  token: object,
  displayHelp: bool.isRequired,
  onLogoutClick: func.isRequired,
}

export function MenuBar({
  maze,
  user,
  token,
  toggleSubmit,
  onLoginClick,
  onResetClick,
  onLogoutClick,
  toggleHelp,
  displayHelp,
}) {
  const renderHelp = params => {
    if (!displayHelp) return null
    return (
      <div className="menu-bar__info">
        <p>Make the longest maze between S and E to beat the high score!</p>
        <p>The path must always link to all way-points in numerical order.</p>
        <p>
          You have {params.maxActionPoints} total action points (AP) to spend.
        </p>
        <p>
          It costs 1 AP to place a blocker on an empty tile. You can always undo
          this for free.
        </p>
        <p>
          It costs {params.naturalBlockerRemovalCost} AP to remove a blocker
          that you didn't place.
        </p>
        <p>Bonus scoring zones are marked with a pulsing green overlay.</p>
        <p>
          You receive bonus score based on the distance traveled within the
          bonus zone.
        </p>
      </div>
    )
  }

  const handleResetClick = (seed) => () => onResetClick(seed)

  const renderLogin = () =>
    user && token ? (
      <button className="menu-bar__btn generic__btn" onClick={onLogoutClick}>
        Logout
      </button>
    ) : (
      <button className="menu-bar__btn generic__btn" onClick={onLoginClick}>
        Login
      </button>
    )

  const renderSubmit = () =>
    user && token ? (
      <button className="menu-bar__btn generic__btn" onClick={toggleSubmit}>
        Submit
      </button>
    ) : null

  return (
    <div>
      {renderHelp(maze.params)}
      <ConnectedNameSubmit />
      <div className="menu-bar">
        <div className="menu-bar__section">
          <button
            id="help-btn"
            className="menu-bar__btn generic__btn"
            onClick={toggleHelp}
          >
            ?
          </button>
          <button className="menu-bar__btn generic__btn">
            <Link to="/leaderboard">Leaderboard</Link>
          </button>
          <span className="menu-bar__costs">
            <div>Place: 1 AP</div>
            <div>Remove: {maze.params.naturalBlockerRemovalCost} AP</div>
          </span>
        </div>
        <div className="menu-bar__section">
          <button onClick={handleResetClick(maze.seed)} className="menu-bar__btn generic__btn">
            Reset
          </button>
          {renderSubmit()}
          {renderLogin()}
        </div>
      </div>
    </div>
  )
}
