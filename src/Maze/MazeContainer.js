import {mazeAction, mazeCreate} from './MazeActions';
import { connect } from 'react-redux';
import MazeComponent from './MazeComponent';

const getMaze = (seed, maze) => {
    return {
        seed, 
        maze
    }
}

const mapStateToProps = state => {
  return {
    mazeState: getMaze(state.seed, state.maze)
  }
}

const mapDispatchToProps  = dispatch => {
    return {
        onMazeClick: tile => {
            dispatch(mazeAction(tile))
        },
        startMaze: seed => {
            dispatch(mazeCreate(seed))
        }
    }
}

const MazeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MazeComponent);

export default MazeContainer;