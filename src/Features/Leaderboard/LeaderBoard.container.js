import { fetchLeaderBoard } from './LeaderBoard.action';
import { connect } from 'react-redux';
import LeaderBoardComponent from './LeaderBoard.component';

const mapStateToProps = (state) => {
    return {
        seed: state.LeaderBoardReducer.seed,
        scores: state.LeaderBoardReducer.scores,
        pending: state.LeaderBoardReducer.pending
    }
};

const mapDispatchToProps  = dispatch => {
    return {
        fetchLeaderBoard: seed => {
            dispatch(fetchLeaderBoard(dispatch, seed));
        }
    }
};

const LeaderBoardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeaderBoardComponent);

export default LeaderBoardContainer;