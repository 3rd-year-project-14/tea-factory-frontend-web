// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT_ID.appspot.com",
//   messagingSenderId: "XXXXXX",
//   appId: "XXXXXX"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// src/firebase.js


//=========
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   // ... add rest of your config here
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// Import the functions you need from the SDKs you need
// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBTIBxYq6s123vEbqPXonMiRf5cM4CkLbo",
  authDomain: "tea-factory-project-902e0.firebaseapp.com",
  projectId: "tea-factory-project-902e0",
  storageBucket: "tea-factory-project-902e.firebaseapp.com",
  messagingSenderId: "501903422222",
  appId: "1:501903422222:web:xxxxxx",
  measurementId: "G-JVLYXWZDNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
