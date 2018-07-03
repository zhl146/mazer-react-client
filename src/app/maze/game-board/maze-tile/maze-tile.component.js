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

  getPulseOverlay = () => {
    return this.props.tile.scoreMod > 1 && <div className="game-tile__pulse" />
  }

  getBlockerOverlay = () => {
    const { tile, colors } = this.props
    // set proper blocker overlay as content if tile is a blocker
    return (
      tile.type === TileTypes.Blocker && (
        <div
          className="game-tile__blocker-overlay"
          style={{
            background: tile.userPlaced
              ? colors.blockerUser
              : colors.blockerNatural,
          }}
        />
      )
    )
  }

  getTextOverlay = () => {
    const { tile } = this.props
    if (tile.type === TileTypes.Start) return 'S'
    if (tile.type === TileTypes.End) return 'E'
    if (tile.type === TileTypes.WayPoint) return tile.waypointIndex
    if (tile.scoreZoneCenter) return `${tile.scoreMod}x`
  }

  getTileStyle = () => {
    const { tile, colors, tileSize } = this.props
    const background =
      tile.userPlaced && tile.type === TileTypes.Empty
        ? colors.groundUser
        : colors.groundNatural

    return {
      background,
      height: tileSize + 'px',
      width: tileSize + 'px',
      fontSize: tileSize / 2 + 'px',
    }
  }

  render() {
    return (
      <div
        onClick={this.handleClick}
        className="game-tile"
        style={this.getTileStyle()}
      >
        {this.getPulseOverlay()}
        {this.getBlockerOverlay()}
        {this.getTextOverlay()}
      </div>
    )
  }
}
