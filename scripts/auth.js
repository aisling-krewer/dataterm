// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcHx7sYWlgUIGUA7imjmb5JKYFPAxbRcg",
    authDomain: "dataterm-5837a.firebaseapp.com",
    databaseURL:
      "https://dataterm-5837a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dataterm-5837a",
    storageBucket: "dataterm-5837a.appspot.com",
    messagingSenderId: "235367140412",
    appId: "1:235367140412:web:8f0ffb5dad9d13d2804739",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Reference to form and buttons
const authForm = document.getElementById('authForm');
const signOutBtn = document.getElementById('signOutBtn');
const anonymousSignInBtn = document.getElementById('anonymousSignInBtn');

// Event listener for sign up/sign in form
authForm.addEventListener('submit', (e) => {
    console.log('Signing up');
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User signed up:', user);
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log('User signed in:', user);
                    })
                    .catch((signInError) => {
                        console.error('Error signing in:', signInError.message);
                    });
            } else {
                console.error('Error signing up:', error.message);
            }
        });
});

// Event listener for signing out
signOutBtn.addEventListener('click', () => {
    console.log('Signing out');
    signOut(auth)
        .then(() => {
            console.log('User signed out');
        })
        .catch((error) => {
            console.error('Error signing out:', error.message);
        });
});

// Event listener for anonymous sign-in
anonymousSignInBtn.addEventListener('click', () => {
    console.log('Signing in anonymously');
    signInAnonymously(auth)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Signed in anonymously:', user);
        })
        .catch((error) => {
            console.error('Error signing in anonymously:', error.message);
        });
});

// Observe user state changes
onAuthStateChanged(auth, (user) => {
    console.log('User state changed');
    if (user) {
        if (user.isAnonymous) {
            console.log('Anonymous user signed in:', user);
        } else {
            console.log('User signed in with email:', user.email);
        }
    } else {
        console.log('No user is signed in.');
    }
});

document.onload = () => {
    console.log('Document loaded');
    if (user) {
        if (user.isAnonymous) {
            console.log('Anonymous user signed in:', user);
        } else {
            console.log('User signed in with email:', user.email);
        }
    } else {
        console.log('No user is signed in.');
    }
}