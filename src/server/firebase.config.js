import configJSON from './firebase.config.json'

let config = {
  apiKey: configJSON.apiKey,
  authDomain: configJSON.authDomain,
  databaseURL: configJSON.databaseURL,
  projectId: configJSON.projectId,
  storageBucket: configJSON.storageBucket,
  messagingSenderId: configJSON.messagingSenderId,
}

export default config
