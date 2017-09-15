import {connect} from 'react-redux';
import { clickTile } from "./maze-tile.action";
import { MazeTile } from "./maze-tile.component";

const mapStateToProps = state => ({
  tileSize: state.MazeReducer.tileSize,
  colors: state.MazeReducer.maze.params.mazeColors.colors
});

const mapDispatchToProps = dispatch => ({
  onClick: ( tile) => {
    dispatch(clickTile(tile));
  }
});

export const ConnectedMazeTile = connect(
    mapStateToProps,
    mapDispatchToProps
)(MazeTile);