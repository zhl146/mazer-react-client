import React from 'react';
import PropTypes from 'prop-types';
import shared from 'mazer-shared';

const TileComponent = ({ tile, onClick }) => {
    let cssClass;
    switch ( tile.type ) {
        case shared.MazeTileEnum.Blocker:
            cssClass = 'FiledTile';
        break;
        case shared.MazeTileEnum.Start:
            cssClass = 'StartTile';
        break;
        case shared.MazeTileEnum.End:
            cssClass = 'EndTile';
        break;
        case shared.MazeTileEnum.WayPoint:
            cssClass = 'WaypointTile';
        break;
        default:
            if(tile.scoreMod > 1){
                cssClass = 'ScoreModTile';
            }
            cssClass = 'EmptyTile';
        break;
    }
    return <div className={cssClass} onClick={ () => onClick(tile) } />
};

TileComponent.PropTypes = {
  onClick: PropTypes.func.isRequired,
  tile: PropTypes.object.isRequired
}

export default TileComponent;