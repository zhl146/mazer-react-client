import { createErrorAction, createStaticAction, createUpdateAction } from "../../../../utils/action-creator";
import { AUTH_ERROR, RESET_MAZE, SET_PROFILE, TOGGLE_HELP } from "../../../../store/action-constants";
import MyFireBase from '../../../../utils/auth.utils';
import axios from 'axios';
import {solutionUrl} from "../../../../server/url-generator";

export const authError = error => createErrorAction(AUTH_ERROR, error);
export const setAuthProfile = (token, user) => createUpdateAction(SET_PROFILE, {token, user});
export const resetMaze = () => createStaticAction(RESET_MAZE);
export const toggleHelp = () => createStaticAction(TOGGLE_HELP);

export const submitScore = (history) => async (dispatch, getState) => {
  let db = getState();
  console.log(history);
  let payload = {
    seed: db.state.maze.seed,
    solution: db.state.maze.getUserChanges(),
    user: db.state.user,
    token: db.state.token,
  };
  try {
    let response = await( axios.post(solutionUrl, JSON.stringify(payload)) );
    console.log(response);
    history.push('/leaderboard?seed='+db.state.maze.seed);
  } catch(e) {
    console.log(e);
  }
};

export const firebaseLogin = () => async dispatch => {
  try {
      let response = await( MyFireBase.auth().signInWithPopup(new MyFireBase.auth.GoogleAuthProvider()) );
      dispatch(setAuthProfile(response.credential, response.user));
  }catch(ex){
      dispatch(authError(ex));
  }
};

// export class SignInButton extends Component{
//
//   componentDidMount(){
//     MyFireBase.auth().getRedirectResult().then( (result) => {
//       if(result.credential){
//         this.props.setAuthProfile(result.credential.accessToken, result.user);
//       }
//     }).catch(
//         (err) => {
//           this.props.authError(err);
//         }
//     );
//   }
//
//   render(){
//     let buttonText = (this.props.user? "Logout":"Login");
//     return (
//         <ButtonTemplate
//             clickHandler={
//               () => {
//                 if(!this.props.user) {
//                   console.log(MyFireBase.auth);
//                   MyFireBase.auth().signInWithPopup(new MyFireBase.auth.GoogleAuthProvider()).then(
//                       (result) => {
//                         this.props.setAuthProfile(result.credential, result.user);
//                       }
//                   ).catch(
//                       (error) => {
//                         this.props.authError(error);
//                       }
//                   );
//                 }else{
//                   MyFireBase.auth().signOut().then(
//                       () => { this.props.setAuthProfile(null, null); }
//                   ).catch( (error) => {
//                     this.props.authError(error);
//                   });
//                 }
//               }
//             }
//             text={buttonText} cssAttributes="btn-generic"/>
//     );
//   }
// }