import { fetchLeaderBoard } from './leader-board.action';
import { connect } from 'react-redux';
import { LeaderBoardComponent } from './leader-board.component';
import { initializeMaze } from "../maze/maze.action";

const mapStateToProps = ({ state, data }) => {
  return {
    seed: state.maze ? state.maze.seed : null,
    topTen: data.topTen,
    playerRank: null,
    pending: data.leaderBoardPending
  };
};

const mapDispatchToProps  = dispatch => {
  return {
    initializeMaze: seed => {
      dispatch(initializeMaze(seed));
    },
    fetchLeaderBoard: seed => {
      dispatch(fetchLeaderBoard(seed));
    }
  };
};

export const ConnectedLeaderBoard = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeaderBoardComponent);
