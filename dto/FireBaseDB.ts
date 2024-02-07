import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyCrnuwMTMyUzTpWrUWePHxLMSok3Bi-gjE",
  authDomain: "ssm-frontend.firebaseapp.com",
  projectId: "ssm-frontend",
  storageBucket: "ssm-frontend.appspot.com",
  messagingSenderId: "603901471138",
  appId: "1:603901471138:web:c487fd5c8ada0046ff6afb",
  measurementId: "G-795TLX3NET",
  databaseURL: "https://ssm-frontend-default-rtdb.firebaseio.com/",
};


const firebase = initializeApp(config);
const database = getDatabase(firebase);
// enableIndexedDbPersistence(getFirestore(firebase));
export { database };
export default firebase;