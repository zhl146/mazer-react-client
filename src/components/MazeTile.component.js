import React from 'react';
import PropTypes from 'prop-types';
import shared from 'mazer-shared';

const TileComponent = ({ tile, onClick }) => {

  let content = null;
  let colorStyle = {};

  // set proper blocker overlay as content if tile is a blocker
  if (tile.type === shared.MazeTileEnum.Blocker) {
    if(tile.userPlaced) content = <div className="blocker-polygon-overlay" style={{background: 'red'}} />;
    else content = <div className="blocker-polygon-overlay" style={{background: 'green'}} />;
  }
  // set text if tile is start, end, or waypoint ( mutually exclusive )
  if (tile.type === shared.MazeTileEnum.Start) {
    content = 'S';
  } else if(tile.type === shared.MazeTileEnum.End) {
    content = 'E';
  } else if (tile.type === shared.MazeTileEnum.WayPoint) {
    content = tile.waypointIndex;
  }

  if (tile.type === shared.MazeTileEnum.Path) {
    colorStyle = {
      background: 'pink'
    };
  }

  // tile is a score modifier zone
  if(tile.scoreMod > 1){
    colorStyle = {
        background: 'lightgreen'
    };
    if(tile.scoreZoneCenter) content = tile.scoreMod + 'x';
  }
  // tile has default color
  else colorStyle = {
      background: 'sandybrown'
  };

  return (
      <div className='tile ' style={colorStyle} onClick={ () => onClick(tile) } >
        { content }
      </div>
  )
};

TileComponent.PropTypes = {
  onClick: PropTypes.func.isRequired,
  tile: PropTypes.object.isRequired
};

export default TileComponent;