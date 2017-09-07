import { mazeAction, mazeCreate} from './Maze.action';
import { resizeMazeBoard, toggleHelp } from '../View.action';
import { connect } from 'react-redux';
import MazeComponent from './Maze.component';

const mapStateToProps = (state) => {
    return {
        maze: state.MazeReducer.maze,
        score: state.MazeReducer.maze.score,
        path: state.MazeReducer.maze.path,
        viewState: state.ViewReducer,
        user: state.AuthReducer.user,
        token: state.AuthReducer.token
    }
};

const mapDispatchToProps  = dispatch => {
    return {
        onMazeResize: (xDimension, yDimension) => {
          dispatch(resizeMazeBoard(xDimension, yDimension))
        },
        clickHandlers: {
          onMazeClick: (maze, tile) => {
            dispatch(mazeAction(maze, tile));
          },
          onResetClick: seed => {
            dispatch(mazeCreate(seed));
          },
          onHelpClick: () => {
            dispatch(toggleHelp())
          },
        }
    }
};

const MazeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MazeComponent);

export default MazeContainer;