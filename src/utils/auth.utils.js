import config from '../server/firebase.config';
import * as firebase from 'firebase';

firebase.initializeApp(config);
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: 'select_account'
});

export default firebase;