import { connect } from 'react-redux'

import { NameSubmit } from './name-submit.component'
import { submitScore } from './name-submit.action'
import { toggleSubmit } from '../menu-bar/menu-bar.action'

const mapStateToProps = ({ view }) => ({
  display: view.displaySubmit,
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (name) => dispatch(submitScore(name)),
  toggleDisplay: () => dispatch(toggleSubmit()),
})

export const ConnectedNameSubmit = connect(mapStateToProps, mapDispatchToProps)(
  NameSubmit
)
