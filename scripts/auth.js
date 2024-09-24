// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
  set,
child,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
// Reference to form and buttons
const authForm = document.getElementById("authForm");
const signOutBtn = document.getElementById("signOutBtn");

// Event listener for sign up/sign in form
authForm.addEventListener("submit", (e) => {
  console.log("Signing up");
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signing up");
      const user = userCredential.user;
      console.log("User signed up:", user);
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        console.log("User already exists, signing in");
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed in:", user);
          })
          .catch((signInError) => {
            console.error("Error signing in:", signInError.message);
          });
      } else {
        console.error("Error signing up:", error.message);
      }
    });
});

// Event listener for signing out
signOutBtn.addEventListener("click", () => {
  console.log("Signing out");
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out:", error.message);
    });
});

// Observe user state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      const userRef = ref(database, 'users/' + userId);
  
      // Check if the user record already exists
      get(child(ref(database), `users/${userId}`)).then((snapshot) => {
        if (!snapshot.exists()) {
          // If the user record doesn't exist, create it
          set(userRef, {
            email: user.email,
            createdAt: Date.now(),
          })
          .then(() => {
            console.log("User record created successfully.");
          })
          .catch((error) => {
            console.error("Error creating user record: ", error);
          });
        }
      }).catch((error) => {
        console.error("Error checking user record: ", error);
      });
    } else {
      // User is signed out
      console.log("User is signed out.");
    }
  });
  

document.onload = () => {
  console.log("Document loaded");
  if (user) {
      console.log("User signed in with email:", user.email);
  } else {
    console.log("No user is signed in.");
  }
};
