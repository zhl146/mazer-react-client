import { setAuthProfile, authError } from './auth.action';
import { connect } from 'react-redux';
import { AuthComponent } from './auth.component';

const mapStateToProps = (state) => {
    return {
        token: state.AuthReducer.token,
        user: state.AuthReducer.user,
        error: state.AuthReducer.error
    };
};

const mapDispatchToProps  = dispatch => {
    return {
        setAuthProfile: (token, user) => {
            dispatch(setAuthProfile(token, user));
        },
        authError: (error) => {
            dispatch(authError(error));
        }
    };
};

export const AuthContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthComponent);
