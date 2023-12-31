import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCrJ4qrwVg5W4CcM0f-l6D-ZeZ_CLp3Ytg",
    authDomain: "engfluencers.firebaseapp.com",
    projectId: "engfluencers",
    storageBucket: "engfluencers.appspot.com",
    messagingSenderId: "1092840688378",
    appId: "1:1092840688378:web:145d0aa0487dc1296e1743",
    measurementId: "G-PP6V2MCT66"
  };


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const storage = getStorage(app);

export { storage, app ,auth };
