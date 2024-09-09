import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAkXOUyeyiYCz1V0lGoR-54x-Zmk3SNerA',
  authDomain: 'react-native-proj-s.firebaseapp.com',
  projectId: 'react-native-proj-s',
  storageBucket: 'react-native-proj-s.appspot.com',
  messagingSenderId: '1042787090202',
  appId: '1:1042787090202:web:d930ddf8c2d212df67f6a3',
  measurementId: 'G-Y9B88K3ZBZ',
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export {auth};
