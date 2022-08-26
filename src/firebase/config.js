// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//Este é um banco de dados (serviço do FB)
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChfru514kYS3-eALQZ5VMcCcah_abtKqI",
  authDomain: "miniblog-c7490.firebaseapp.com",
  projectId: "miniblog-c7490",
  storageBucket: "miniblog-c7490.appspot.com",
  messagingSenderId: "823724438918",
  appId: "1:823724438918:web:54546520db20097aa12807"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };