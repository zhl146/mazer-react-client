import { connect } from 'react-redux'
import Path from './path.component'
import { resetPathError } from './path.actions'

const mapStateToProps = ({ mazeState }) => ({
  pathError: mazeState.pathError
})

const mapDispatchToProps = (dispatch) => ({
  resetPathError: () => dispatch(resetPathError)
})

export default connect(mapStateToProps, mapDispatchToProps)(
    Path
)
