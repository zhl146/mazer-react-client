import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { NameSubmit } from './name-submit.component'
import { submitScore } from './name-submit.action'
import { toggleSubmit } from '../menu-bar/menu-bar.action'

const mapStateToProps = ({ view }) => ({
  display: view.displaySubmit,
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (name, history) => dispatch(submitScore(name, history)),
  toggleDisplay: () => dispatch(toggleSubmit()),
})

export const ConnectedNameSubmit = connect(mapStateToProps, mapDispatchToProps)(
  withRouter(NameSubmit)
)
