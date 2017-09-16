import { fetchLeaderBoard } from './leader-board.action';
import { connect } from 'react-redux';
import { LeaderBoardComponent } from './leader-board.component';

const mapStateToProps = state => {
  let seed = null;
  if ( state.LeaderBoardReducer.seed ) seed = state.LeaderBoardReducer.seed;
  else if ( state.MazeReducer.maze ) seed = state.MazeReducer.maze.seed;
  return {
    seed,
    scores: state.LeaderBoardReducer.scores,
    playerRank: null,
    pending: state.LeaderBoardReducer.pending
  };
};

const mapDispatchToProps  = dispatch => {
  return {
    fetchLeaderBoard: seed => {
      dispatch(fetchLeaderBoard(seed));
    }
  };
};

export const ConnectedLeaderBoard = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeaderBoardComponent);
