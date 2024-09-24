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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
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

  // Function to save character sheet
async function saveCharacterSheet() {
  console.log('Saving character sheet...');
  const userId = firebase.auth().currentUser.uid; // Get the current user's ID
  console.log('User ID:', userId);  
  const characterId = document.getElementById('characterName').value+userId; // You should implement this function to create unique IDs
  console.log('Character ID:', characterId);
  const characterData = {
    name: document.getElementById('characterName').value, // Get character name from input
    stats: {
      'skill-INT': document.getElementById(skill-INT).value,
      'skill-REF': document.getElementById(skill-REF).value,
      'skill-DEX': document.getElementById(skill-DEX).value,
      'skill-TECH': document.getElementById(skill-TECH).value,
      'skill-COOL': document.getElementById(skill-COOL).value,
      'skill-WILL': document.getElementById(skill-WILL).value,
      'skill-EMP': document.getElementById(skill-EMP).value,
      'skill-LUCK': document.getElementById(skill-LUCK).value,
      'skill-MOVE': document.getElementById(skill-MOVE).value,
      'skill-BODY': document.getElementById(skill-BODY).value
    },
    skills: {
      // Collect skills data
'skill-humanity': document.getElementById('skill-humanity').VALUE,
'skill-hp': document.getElementById('skill-hp').VALUE,
'skill-message': document.getElementById('skill-message').VALUE,
'skill-concentration': document.getElementById('skill-concentration').VALUE,
'skill-concealreveal': document.getElementById('skill-concealreveal').VALUE,
'skill-LipReading': document.getElementById('skill-LipReading').VALUE,
'skill-Perception': document.getElementById('skill-Perception').VALUE,
'skill-Tracking': document.getElementById('skill-Tracking').VALUE,
'skill-Athletics': document.getElementById('skill-Athletics').VALUE,
'skill-Contortionist': document.getElementById('skill-Contortionist').VALUE,
'skill-Dance': document.getElementById('skill-Dance').VALUE,
'skill-Endurance': document.getElementById('skill-Endurance').VALUE,
'skill-ResistTortureDrugs': document.getElementById('skill-ResistTortureDrugs').VALUE,
'skill-Stealth': document.getElementById('skill-Stealth').VALUE,
'skill-Accounting': document.getElementById('skill-Accounting').VALUE,
'skill-AnimalHandling': document.getElementById('skill-AnimalHandling').VALUE,
'skill-Bureaucracy': document.getElementById('skill-Bureaucracy').VALUE,
'skill-Business': document.getElementById('skill-Business').VALUE,
'skill-Composition': document.getElementById('skill-Composition').VALUE,
'skill-Criminology': document.getElementById('skill-Criminology').VALUE,
'skill-Cryptography': document.getElementById('skill-Cryptography').VALUE,
'skill-Deduction': document.getElementById('skill-Deduction').VALUE,
'skill-Education': document.getElementById('skill-Education').VALUE,
'skill-Gamble': document.getElementById('skill-Gamble').VALUE,
'skill-Language': document.getElementById('skill-Language').VALUE,
'skill-Streetslang': document.getElementById('skill-Streetslang').VALUE,
'skill-LibrarySearch': document.getElementById('skill-LibrarySearch').VALUE,
'skill-LocalExpert': document.getElementById('skill-LocalExpert').VALUE,
'skill-LocalExpert_Home': document.getElementById('skill-LocalExpert_Home').VALUE,
'skill-Science': document.getElementById('skill-Science').VALUE,
'skill-Tactics': document.getElementById('skill-Tactics').VALUE,
'skill-WildernessSurvival': document.getElementById('skill-WildernessSurvival').VALUE,
'skill-Brawling': document.getElementById('skill-Brawling').VALUE,
'skill-Evasion': document.getElementById('skill-Evasion').VALUE,
'skill-MartialArts': document.getElementById('skill-MartialArts').VALUE,
'skill-MeleeWeapon': document.getElementById('skill-MeleeWeapon').VALUE,
'skill-Acting': document.getElementById('skill-Acting').VALUE,
'skill-PlayInstrument': document.getElementById('skill-PlayInstrument').VALUE,
'skill-Archery': document.getElementById('skill-Archery').VALUE,
'skill-Autofire': document.getElementById('skill-Autofire').VALUE,
'skill-Handgun': document.getElementById('skill-Handgun').VALUE,
'skill-HeavyWeapons': document.getElementById('skill-HeavyWeapons').VALUE,
'skill-ShoulderArms': document.getElementById('skill-ShoulderArms').VALUE,
'skill-Bribery': document.getElementById('skill-Bribery').VALUE,
'skill-Conversation': document.getElementById('skill-Conversation').VALUE,
'skill-HumanPerception': document.getElementById('skill-HumanPerception').VALUE,
'skill-Interrogation': document.getElementById('skill-Interrogation').VALUE,
'skill-Persuasion': document.getElementById('skill-Persuasion').VALUE,
'skill-PersonalGrooming': document.getElementById('skill-PersonalGrooming').VALUE,
'skill-Streetwise': document.getElementById('skill-Streetwise').VALUE,
'skill-Trading': document.getElementById('skill-Trading').VALUE,
'skill-WardrobeStyle': document.getElementById('skill-WardrobeStyle').VALUE,
'skill-AirVehicleTech': document.getElementById('skill-AirVehicleTech').VALUE,
'skill-BasicTech': document.getElementById('skill-BasicTech').VALUE,
'skill-Cybertech': document.getElementById('skill-Cybertech').VALUE,
'skill-Demolitions': document.getElementById('skill-Demolitions').VALUE,
'skill-ElectronicsSecurityTech': document.getElementById('skill-ElectronicsSecurityTech').VALUE,
'skill-FirstAid': document.getElementById('skill-FirstAid').VALUE,
'skill-Forgery': document.getElementById('skill-Forgery').VALUE,
'skill-LandVehicleTech': document.getElementById('skill-LandVehicleTech').VALUE,
'skill-PaintDrawSculpt': document.getElementById('skill-PaintDrawSculpt').VALUE,
'skill-Paramedic': document.getElementById('skill-Paramedic').VALUE,
'skill-PhotographyFilm': document.getElementById('skill-PhotographyFilm').VALUE,
'skill-PickLock': document.getElementById('skill-PickLock').VALUE,
'skill-PickPocket': document.getElementById('skill-PickPocket').VALUE,
'skill-SeaVehicleTech': document.getElementById('skill-SeaVehicleTech').VALUE,
'skill-Weaponstech': document.getElementById('skill-Weaponstech').VALUE,
'skill-DriveLandVehicle': document.getElementById('skill-DriveLandVehicle').VALUE,
'skill-PilotAirVehicle': document.getElementById('skill-PilotAirVehicle').VALUE,
'skill-PilotSeaVehicle': document.getElementById('skill-PilotSeaVehicle').VALUE,
'skill-Riding': document.getElementById('skill-Riding').VALUE
      // Add other skills as needed
    }
  };

  try {
    await firebase.database().ref(`users/${userId}/characterSheets/${characterId}`).set(characterData);
    alert('Character sheet saved successfully!');
  } catch (error) {
    console.error('Error saving character sheet:', error);
    alert('Failed to save character sheet.');
  }
}

// Event listener for the save button
document.getElementById('saveCharacterSheet').addEventListener('click', console.log('Saving character sheet...'));

console.log('Auth script loaded');
