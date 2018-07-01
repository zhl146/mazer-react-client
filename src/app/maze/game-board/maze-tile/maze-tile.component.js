import React, { Component } from 'react'
import { isEqual } from 'lodash'
import { object, func, number } from 'prop-types'
import { TileTypes } from 'mazer-shared'

import './maze-tile.css'

export class MazeTile extends Component {
  static propTypes = {
    onClick: func.isRequired,
    tile: object.isRequired,
    tileSize: number.isRequired,
    colors: object.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return (
      !isEqual(this.props.tile, nextProps.tile) ||
      !isEqual(this.props.tileSize, nextProps.tileSize)
    )
  }

  handleClick = () => {
    this.props.onClick(this.props.tile)
  }

  getBlockerOverlay = () => {
    const { tile, colors } = this.props
    // set proper blocker overlay as content if tile is a blocker
    if (tile.type === TileTypes.Blocker) {
      return tile.userPlaced ? (
        <div
          className="game-tile__blocker-overlay"
          style={{ background: colors.blockerUser }}
        />
      ) : (
        <div
          className="game-tile__blocker-overlay"
          style={{ background: colors.blockerNatural }}
        />
      )
    }
  }

  getTextOverlay = () => {
    const { tile } = this.props
    if (tile.type === TileTypes.Start) return 'S'
    if (tile.type === TileTypes.End) return 'E'
    if (tile.type === TileTypes.WayPoint) return tile.waypointIndex
    if (tile.scoreMod > 1) {
      return tile.scoreZoneCenter ? (
        <div className="game-tile__pulse">{tile.scoreMod + 'x'}</div>
      ) : (
        <div className="game-tile__pulse" />
      )
    }
    return null
  }

  getTileStyle = () => {
    const background =
      this.props.tile.userPlaced && this.props.tile.type === TileTypes.Empty
        ? this.props.colors.groundUser
        : this.props.colors.groundNatural

    return {
      background,
      height: this.props.tileSize + 'px',
      width: this.props.tileSize + 'px',
      fontSize: this.props.tileSize / 2 + 'px',
    }
  }

  render() {
    return (
      <div
        className="game-tile"
        style={this.getTileStyle()}
        onClick={this.handleClick}
      >
        {this.getTextOverlay()}
        {this.getBlockerOverlay()}
      </div>
    )
  }
}
