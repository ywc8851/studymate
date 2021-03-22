import firebase from "firebase/app";
import "firebase/auth";
/*
보안을 위해 .env파일에 따로 보관하여 github에 올라가지 않게함
*/
const firebaseConfig = {
  measurementId: process.env.REACT_APP_MEASUR_ID,
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};
firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
