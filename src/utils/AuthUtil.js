import config from '../server/firebase.config';
import * as firebase from 'firebase';

firebase.initializeApp(config);

export default firebase;