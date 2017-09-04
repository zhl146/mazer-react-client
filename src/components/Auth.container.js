import { setAuthProfile, authError } from '../model/actions/Auth.action';
import { connect } from 'react-redux';
import AuthComponent from './Auth.component';

const mapStateToProps = (state) => {
    console.log(state);
    return {
        token: state.AuthReducer.token,
        user: state.AuthReducer.user,
        error: state.AuthReducer.error
    }
};

const mapDispatchToProps  = dispatch => {
    return {
        setAuthProfile: (token, user) => {
            dispatch(setAuthProfile(token, user))
        },
        authError: (error) => {
            dispatch(authError(error))
        }
    }
};

const AuthContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthComponent);

export default AuthContainer;