
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDM42veoA4H0Q2CRvhKdXF8yNbw9SN-nPo",
  authDomain: "cars-f3af4.firebaseapp.com",
  projectId: "cars-f3af4",
  storageBucket: "cars-f3af4.firebasestorage.app",
  messagingSenderId: "724994291026",
  appId: "1:724994291026:web:9d9ab3ee2ec6f14edfb68b",
  measurementId: "G-L876W5M1G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
