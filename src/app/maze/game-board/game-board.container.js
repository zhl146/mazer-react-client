import { connect } from 'react-redux'
import { GameBoard } from './game-board.component'
import { doActionOnTile } from './game-board.action'

const mapStateToProps = ({ mazeState }) => ({
  tileSize: mazeState.tileSize,
  colors: mazeState.maze.params.mazeColors.colors,
})

const mapDispatchToProps = dispatch => ({
  onTileClick: (tile) => dispatch(doActionOnTile(tile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(
    GameBoard
)
