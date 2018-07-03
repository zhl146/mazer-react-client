import { connect } from 'react-redux'
import { GameBoard } from './game-board.component'

const mapStateToProps = ({ mazeState }) => ({
  tileSize: mazeState.tileSize,
  colors: mazeState.maze.params.mazeColors.colors,
})

export default connect(mapStateToProps)(
    GameBoard
)
