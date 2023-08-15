import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyDFNQaK0w71Kg5245ftixMvC2-c_FnD2D8",
    authDomain: "tarefas-2c3a4.firebaseapp.com",
    databaseURL: "https://tarefas-2c3a4-default-rtdb.firebaseio.com",
    projectId: "tarefas-2c3a4",
    storageBucket: "tarefas-2c3a4.appspot.com",
    messagingSenderId: "144813972845",
    appId: "1:144813972845:web:69807d950ba8a22d8fce64"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  export default firebase;