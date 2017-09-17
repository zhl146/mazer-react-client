import { setAuthProfile, authError } from './auth.action';
import { connect } from 'react-redux';
import { SignInButton } from './signin-button.component';

const mapStateToProps = ({ state }) => {
    return {
        token: state.token,
        user: state.user,
        error: state.authError
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

export const ConnectedSignInButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInButton);
