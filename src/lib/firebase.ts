import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import config from '../../firebase-applet-config.json';

const getEnv = (key: string) => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta && import.meta.env) {
      return import.meta.env[key];
    }
  } catch {
    // Ignore error
  }
  return undefined;
};

const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY') || config.apiKey,
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN') || config.authDomain,
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID') || config.projectId,
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET') || config.storageBucket,
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID') || config.messagingSenderId,
  appId: getEnv('VITE_FIREBASE_APP_ID') || config.appId
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app, config.firestoreDatabaseId);



