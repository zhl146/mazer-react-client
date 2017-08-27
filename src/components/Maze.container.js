import {mazeAction, mazeCreate} from '../model/actions/Maze.action';
import { connect } from 'react-redux';
import MazeComponent from './Maze.component';

const mapStateToProps = (state) => {
    console.log(JSON.stringify(state));
    return {
        state
    }
};

const mapDispatchToProps  = dispatch => {
    return {
        onMazeClick: tile => {
            dispatch(mazeAction(tile));
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