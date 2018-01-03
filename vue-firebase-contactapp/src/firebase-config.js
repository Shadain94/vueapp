import { initializeApp } from 'firebase'
//settings for firebase database used
const app= initializeApp( {
  apiKey: 'AIzaSyCj3Sux-zqKVwFNugdscoZWAJFSa7zO8VQ',
  authDomain: 'vue-contact-manager-app.firebaseapp.com',
  databaseURL: 'https://vue-contact-manager-app.firebaseio.com',
  projectId: 'vue-contact-manager-app',
  storageBucket: 'vue-contact-manager-app.appspot.com',
  messagingSenderId: '169153762947'
});

 export const db= app.database();
 export const contactsRef= db.ref('Contacts');


