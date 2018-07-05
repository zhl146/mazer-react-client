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
    const { tile, tileSize } = this.props

    if (this.props.tile.scoreMod <= 1)
    {
      return null
    }

    return (
        <rect
          className="game-tile__pulse game-tile__noevent"
          x={tile.x * tileSize}
          y={tile.y * tileSize}
          width={tileSize + 1}  // not sure why we need the +1 but
          height={tileSize + 1} // without it the borders are visible
          fill='rgb(0,100, 0)'
        />
      )
  }

  getBlockerOverlay = () => {
    const { tile, colors, tileSize } = this.props
    const points = [
      { x: 0.3, y: 0 },
      { x: 0.7, y: 0 },
      { x: 1, y: 0.3 },
      { x: 1, y: 0.7 },
      { x: 0.7, y: 1 },
      { x: 0.3, y: 1 },
      { x: 0, y: 0.7 },
      { x: 0, y: 0.3 },
    ]

    const polygonString = points.map(point => `${(tile.x + point.x) * tileSize},${(tile.y + point.y) * tileSize}`).join(' ')

    return (
        tile.type === TileTypes.Blocker && (
          <polygon
            className='game-tile__noevent'
            points={polygonString}
            fill={tile.userPlaced ? colors.blockerUser : colors.blockerNatural}
          />
        )
      )
    }

  getText = (tile) => {
    if (tile.type === TileTypes.Start) return 'S'
    if (tile.type === TileTypes.End) return 'E'
    if (tile.type === TileTypes.WayPoint) return tile.waypointIndex
    if (tile.scoreZoneCenter) return `${tile.scoreMod}x`
  }

  getTextOverlay = () => {
    const { tile, tileSize } = this.props
    const text = this.getText(tile)
    if (!text) return null

    return (
        <text
          className='game-tile__noevent'
          x={(tile.x + 0.5) * tileSize}
          y={(tile.y + 0.5) * tileSize}
          textAnchor='middle'
          alignmentBaseline='middle'
          fontFamily='VT323,monospace'
          fontSize={tileSize / 2 + 'px'}
        >
          {text}
        </text>
      )
  }

  getBackground = () => {
    const { tile, colors, tileSize } = this.props

    const background =
      tile.userPlaced && tile.type === TileTypes.Empty
        ? colors.groundUser
        : colors.groundNatural

    return (
        <rect
          className='game-tile'
          onClick={this.handleClick}
          x={tile.x * tileSize}
          y={tile.y * tileSize}
          width={tileSize}
          height={tileSize}
          fill={background}
          />
        )
  }

  render() {
    return [this.getBackground(),
      this.getPulseOverlay(),
      this.getBlockerOverlay(),
      this.getTextOverlay()]
  }
}
