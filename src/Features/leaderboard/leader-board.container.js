import { fetchLeaderBoard } from './leader-board.action';
import { connect } from 'react-redux';
import { LeaderBoardComponent } from './leader-board.component';

const mapStateToProps = (state) => {
  return {
    seed: state.LeaderBoardReducer.seed,
    scores: state.LeaderBoardReducer.scores,
    pending: state.LeaderBoardReducer.pending
  };
};

const mapDispatchToProps  = dispatch => {
  return {
    fetchLeaderBoard: seed => {
      dispatch(fetchLeaderBoard(dispatch, seed));
    }
  };
};

export const ConnectedLeaderBoard = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeaderBoardComponent);
