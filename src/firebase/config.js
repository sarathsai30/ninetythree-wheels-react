
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { createClient } from '@supabase/supabase-js';

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

// Initialize Supabase for storage (avoids CORS issues)
export const supabase = createClient(
  'https://zbrjclkgmdoqhxjgeyro.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicmpjbGtnbWRvcWh4amdleXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5NzY1NzQsImV4cCI6MjA1MzU1MjU3NH0.LQ_OTLZbU_-x_bLslJdJN3_BdlQiU7HxPr0o4m9fhDQ'
);
