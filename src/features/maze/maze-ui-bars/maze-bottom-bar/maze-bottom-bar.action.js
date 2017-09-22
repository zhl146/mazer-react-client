import { createErrorAction, createStaticAction, createUpdateAction } from "../../../../utils/action-creator";
import { AUTH_ERROR, RESET_MAZE, SET_PROFILE, TOGGLE_HELP } from "../../../../store/action-constants";
import MyFireBase from '../../../../utils/auth.utils';
export const authError = error => createErrorAction(AUTH_ERROR, error);
export const setAuthProfile = (token, user) => createUpdateAction(SET_PROFILE, {token, user});
export const resetMaze = () => createStaticAction(RESET_MAZE);
export const toggleHelp = () => createStaticAction(TOGGLE_HELP);

export const submitScore = ( maze, history, user, token ) => async dispatch => {
  let payload = {
    seed: maze.seed,
    solution: maze.getUserChanges(),
    user: user,
    token: token,
  };
  try {
    let response = await( axios.post(solutionUrl, JSON.stringify(payload)) );
    console.log(response);
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