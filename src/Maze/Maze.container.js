import { mazeAction } from './MazeActions';
import { connect } from 'react-redux';
import MazeComponent from './MazeComponent';

const getMaze = (maze) => { return maze; };

const getScore = (score) => { return score; };

const mapStateToProps = state => {
  return {
    maze: getMaze(state.maze),
    score: getScore(state.score)
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