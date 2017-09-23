import { connect } from 'react-redux';
import { ScoreBar } from "./score-bar.component";
import { fetchHighScore } from "../maze.action";

const mapStateToProps = ({ state, data }) => ({
  actionError: state.actionError,
  usedActions: state.maze.actionsUsed,
  highScore: data.highScore,
  maxActions: state.maze.params.maxActionPoints,
  scoreValue: state.maze.score,
  seed: state.maze.seed
});

const mapDispatchToProps = dispatch => ({
  fetchHighScore: seed => dispatch(fetchHighScore(seed))
});

export const ConnectedScoreBar = connect(mapStateToProps, mapDispatchToProps)(ScoreBar);