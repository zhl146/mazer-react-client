import React from 'react';
import PropTypes from 'prop-types';

const TileComponent = (tile,onClick) => (    
    <div className="tile" >
        <div className="tile_tint_overlay" onClick={onClick}>
            <div className="tile_text absolute_center">
                <h1>I am MazeComponent</h1>
                <h2>"X: " + {tile.x}</h2>
                <h2>"Y: " + {tile.y}</h2>
                <h2>"Type: " + {tile.type} </h2>
            </div>
        </div>
    </div>
);

TileComponent.PropTypes = {
  onClick: PropTypes.func.isRequired,
  tile: PropTypes.object.isRequired
}

export default TileComponent;