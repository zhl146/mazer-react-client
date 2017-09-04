import { setAuthProfile, setAuthHash, authError } from '../model/actions/Auth.action';
import { connect } from 'react-redux';
import AuthComponent from './Auth.component';

const mapStateToProps = (state) => {
    console.log(state);
    return {
        hash: state.AuthReducer.hash,
        id_token: state.AuthReducer.id_token,
        lock: state.AuthReducer.lock,
        profile: state.AuthReducer.profile,
        error: state.AuthReducer.error
    }
};

const mapDispatchToProps  = dispatch => {
    return {
        setAuthHash: (hash, id_token) => {
            dispatch(setAuthHash(dispatch, hash, id_token));
        },
        setAuthProfile: (profile) => {
            dispatch(setAuthProfile(profile))
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