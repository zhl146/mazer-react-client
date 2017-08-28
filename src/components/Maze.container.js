import {mazeAction, mazeCreate} from '../model/actions/Maze.action';
import { connect } from 'react-redux';
import MazeComponent from './Maze.component';

const mapStateToProps = (state) => {
    console.log(state);
    return {
        maze: state.MazeReducer.maze,
        score: state.MazeReducer.score,
        ScoreMgr: state.MazeReducer.ScoreMgr
    }
};

const mapDispatchToProps  = dispatch => {
    return {
        onMazeClick: (maze, tile, ScoreMgr) => {
            dispatch(mazeAction(maze, tile, ScoreMgr));
        },
        onResetClick: seed => {
            dispatch(mazeCreate(seed));
        }
    }
};

const MazeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MazeComponent);

export default MazeContainer;