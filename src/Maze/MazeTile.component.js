import React from 'react';
import PropTypes from 'prop-types';
import shared from 'mazer-shared';

const TileComponent = ({ tile, onClick }) => {
    let cssClass;
    let text = '';
    switch ( tile.type ) {
        case shared.MazeTileEnum.Blocker:
            if(tile.userPlaced) cssClass = 'BlockerTile';
            else cssClass = 'StartingBlockTile';
        break;
        case shared.MazeTileEnum.Start:
            cssClass = 'StartTile';
            text = 'Start';
        break;
        case shared.MazeTileEnum.End:
            cssClass = 'EndTile';
            text = 'End';
        break;
        case shared.MazeTileEnum.WayPoint:
            cssClass = 'WayPointTile';
            text = tile.waypointIndex;
        break;
        default:
            if(tile.scoreMod > 1){
                cssClass = 'ScoreModTile';
            }
            else cssClass = 'EmptyTile';
        break;
    }
    if(tile.scoreZoneCenter) text = tile.scoreMod + 'x';
    return <div className={cssClass} onClick={ () => onClick(tile) } >{text} </div>
};

TileComponent.PropTypes = {
  onClick: PropTypes.func.isRequired,
  tile: PropTypes.object.isRequired
};

export default TileComponent;