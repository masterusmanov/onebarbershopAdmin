
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBVB639tO_7pu_cJ71CN9w7RkvkJKJqPe8",
  authDomain: "fir-image-88d40.firebaseapp.com",
  projectId: "fir-image-88d40",
  storageBucket: "fir-image-88d40.appspot.com",
  messagingSenderId: "822195656355",
  appId: "1:822195656355:web:ab4cb48acc7194c6d81116"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };