import { connect } from 'react-redux';
import { ScoreBar } from "./score-bar.component";
import { fetchHighScore } from "../maze.action";

const mapStateToProps = ({ mazeState, leaderboard }) => ({
  actionError: mazeState.actionError,
  usedActions: mazeState.maze.actionsUsed,
  highScore: leaderboard.highScore,
  maxActions: mazeState.maze.params.maxActionPoints,
  scoreValue: mazeState.maze.score,
  seed: mazeState.maze.seed
});

const mapDispatchToProps = dispatch => ({
  fetchHighScore: seed => dispatch(fetchHighScore(seed))
});

export const ConnectedScoreBar = connect(mapStateToProps, mapDispatchToProps)(ScoreBar);