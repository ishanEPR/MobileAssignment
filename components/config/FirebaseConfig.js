// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebases from "firebase";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyB-N7r8Z6Jkbi_sPBiX_DDsIzwy6sVGN3k",
  authDomain: "expoproject-6fe2c.firebaseapp.com",
  databaseURL: "https://expoproject-6fe2c-default-rtdb.firebaseio.com",
  projectId: "expoproject-6fe2c",
  storageBucket: "expoproject-6fe2c.appspot.com",
  messagingSenderId: "531566967451",
  appId: "1:531566967451:web:257b911dec15b0d74ca43e"
};

// Initialize Firebase
firebases.initializeApp(firebaseConfig);
export default firebases;