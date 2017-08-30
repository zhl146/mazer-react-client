import { mazeAction, mazeCreate} from '../model/actions/Maze.action';
import { toggleHelp } from '../model/actions/View.action';
import { connect } from 'react-redux';
import MazeComponent from './Maze.component';

const mapStateToProps = (state) => {
    return {
        maze: state.MazeReducer.maze,
        score: state.MazeReducer.score,
        scoreMgr: state.MazeReducer.scoreMgr,
        path: state.MazeReducer.path,
        viewState: state.ViewReducer,
    }
};

const mapDispatchToProps  = dispatch => {
    return {
        clickHandlers: {
          onMazeClick: (maze, tile, ScoreMgr) => {
            dispatch(mazeAction(maze, tile, ScoreMgr));
          },
          onResetClick: seed => {
            dispatch(mazeCreate(seed));
          },
          onHelpClick: () => {
            dispatch(toggleHelp())
          }
        }
    }
};

const MazeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MazeComponent);

export default MazeContainer;