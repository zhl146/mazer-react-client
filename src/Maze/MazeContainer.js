import { mazeAction } from './MazeActions';
import { connect } from 'react-redux';
import MazeComponent from './MazeComponent';

const getMaze = (maze) => {
    return maze
}

const mapStateToProps = state => {
  return {
    maze: getMaze(state.maze)
  }
}

const mapDispatchToProps  = dispatch => {
    return {
        onMazeClick: tile => {
            dispatch(mazeAction(tile))
        }
    }
}

const MazeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MazeComponent);

export default MazeContainer;