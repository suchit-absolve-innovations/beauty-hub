// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBtlN7iOdtANEkPIIWI4tVj4iELAy5Axt8",
  authDomain: "beautyhub-76894.firebaseapp.com",
  projectId: "beautyhub-76894",
  storageBucket: "beautyhub-76894.appspot.com",
  messagingSenderId: "645722580916",
  appId: "1:645722580916:web:fbc8bf19b3d224e57b74e1",
  measurementId: "G-FJ3NE22S1L"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();