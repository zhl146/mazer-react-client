import React from 'react';
import { object, func, number } from 'prop-types';
import { TileTypes } from 'mazer-shared';

MazeTile.propTypes = {
  onClick: func.isRequired,
  tile: object.isRequired,
  tileSize: number.isRequired,
  colors: object.isRequired
};

export function MazeTile( { tile, onClick, colors, tileSize }) {

  let blockerOverlay = null;
  let textOverlay = null;
  let pulseOverlay = null;
  let colorStyle = {};

  // set proper blocker overlay as content if tile is a blocker
  if (tile.type === TileTypes.Blocker) {
    if(tile.userPlaced) blockerOverlay = <div className="blocker-polygon-overlay" style={{background: colors.blockerUser}} />;
    else blockerOverlay = <div className="blocker-polygon-overlay" style={{background: colors.blockerNatural}} />;
  }
  // set text if tile is start, end, or waypoint ( mutually exclusive )
  if (tile.type === TileTypes.Start) {
    textOverlay = 'S';
  } else if(tile.type === TileTypes.End) {
    textOverlay = 'E';
  } else if (tile.type === TileTypes.WayPoint) {
    textOverlay = tile.waypointIndex;
  }

  // tile is a score modifier zone
  if(tile.scoreMod > 1){
    if(tile.scoreZoneCenter) textOverlay = <div className="tile-pulse">{tile.scoreMod + 'x'}</div>;
    else pulseOverlay = <div className="tile-pulse" />;
  }
  // tile has default color
  if (tile.userPlaced && tile.type === TileTypes.Empty) {
    colorStyle = {
      background: colors.groundUser
    };
  }
  else {
    colorStyle = {
      background: colors.groundNatural
    };
  }

  const tileStyle = Object.assign({}, colorStyle, {
    height: tileSize + 'px',
    width: tileSize + 'px',
    fontSize: tileSize /2 + 'px',
  });

  const handleClick = () => {
    onClick(tile);
  };

  return (
      <div className='tile ' style={tileStyle} onClick={handleClick} >
        { pulseOverlay }
        { blockerOverlay }
        { textOverlay }
      </div>
  );
}
