import { fetchLeaderBoard } from './leader-board.action';
import { connect } from 'react-redux';
import { LeaderBoardComponent } from './leader-board.component';

const mapStateToProps = state => {
  let seed = null;
  if ( state.appState.maze ) seed = state.appState.maze.seed;
  return {
    seed,
    topTen: state.domain.topTen,
    playerRank: null,
    pending: state.domain.leaderBoardPending
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
