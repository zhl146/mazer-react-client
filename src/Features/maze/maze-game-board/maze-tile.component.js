import React from 'react';
import PropTypes from 'prop-types';
import { TileTypes } from 'mazer-shared';

const TileComponent = ({ tile, onClick, colors, size }) => {

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
    height: size + 'px',
    width: size + 'px',
    fontSize: size /2 + 'px',
  });

  return (
      <div className='tile '
           style={tileStyle}
           onClick={ () => onClick(tile) } >
        { pulseOverlay }
        { blockerOverlay }
        { textOverlay }
      </div>
  );
};

TileComponent.PropTypes = {
  onClick: PropTypes.func.isRequired,
  tile: PropTypes.object.isRequired
};

export default TileComponent;