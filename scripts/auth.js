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
const user = auth.currentUser; // Get the current user from the auth module

if (!user) {
  console.log(
    "User is not logged in. Please log in to save your character sheet."
  );
}
// Event listener for sign up/sign in form
if (authForm) {
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
              localStorage.setItem("userId", user.uid);
            })
            .catch((signInError) => {
              console.error("Error signing in:", signInError.message);
            });
        } else {
          console.error("Error signing up:", error.message);
        }
      });
  });
}

if (signOutBtn) {
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
}
// Observe user state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userId = user.uid;
    const userRef = ref(database, "users/" + userId);

    // Check if the user record already exists
    get(child(ref(database), `users/${userId}`))
      .then((snapshot) => {
        if (!snapshot.exists()) {
          // If the user record doesn't exist, create it
          set(userRef, {
            email: user.email,
            createdAt: Date.now(),
          })
            .then(() => {
              console.log("User record created successfully.");
              localStorage.setItem("userId", user.uid);
            })
            .catch((error) => {
              console.error("Error creating user record: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking user record: ", error);
      });
  } else {
    // User is signed out
    console.log("User is signed out.");
    localStorage.removeItem("userId", user.uid);
  }
});

async function saveCharacterSheet() {
  const user = auth.currentUser; // Get the current user from the auth module
  console.log("saving...");
  if (!user) {
    alert(
      "User is still not logged in. Please log in to save your character sheet."
    );
    return;
  }

  const userId = user.uid; // Get user ID
  const characterId = user.uid + document.getElementById("characterName").value; // Generate a unique character ID

  // Gather character data from input fields
  const characterData = {
    name: document.getElementById("characterName").value, // Get character name from input
    stats: {
      "skill-INT": document.getElementById("skill-INT").value,
      "skill-REF": document.getElementById("skill-REF").value,
      "skill-DEX": document.getElementById("skill-DEX").value,
      "skill-TECH": document.getElementById("skill-TECH").value,
      "skill-COOL": document.getElementById("skill-COOL").value,
      "skill-WILL": document.getElementById("skill-WILL").value,
      "skill-EMP": document.getElementById("skill-EMP").value,
      "skill-LUCK": document.getElementById("skill-LUCK").value,
      "skill-MOVE": document.getElementById("skill-MOVE").value,
      "skill-BODY": document.getElementById("skill-BODY").value,
    },
    skills: {
      // Collect skills data
      //"skill-humanity": document.getElementById("skill-humanity").value,
      //"skill-hp": document.getElementById("skill-hp").value,
      //"skill-message": document.getElementById("skill-message").value,
      "skill-concentration": document.getElementById("skill-concentration")
        .value,
      "skill-concealreveal": document.getElementById("skill-concealreveal")
        .value,
      "skill-LipReading": document.getElementById("skill-LipReading").value,
      "skill-Perception": document.getElementById("skill-Perception").value,
      "skill-Tracking": document.getElementById("skill-Tracking").value,
      "skill-Athletics": document.getElementById("skill-Athletics").value,
      "skill-Contortionist": document.getElementById("skill-Contortionist")
        .value,
      "skill-Dance": document.getElementById("skill-Dance").value,
      "skill-Endurance": document.getElementById("skill-Endurance").value,
      "skill-ResistTortureDrugs": document.getElementById(
        "skill-ResistTortureDrugs"
      ).value,
      "skill-Stealth": document.getElementById("skill-Stealth").value,
      "skill-Accounting": document.getElementById("skill-Accounting").value,
      "skill-AnimalHandling": document.getElementById("skill-AnimalHandling")
        .value,
      "skill-Bureaucracy": document.getElementById("skill-Bureaucracy").value,
      "skill-Business": document.getElementById("skill-Business").value,
      "skill-Composition": document.getElementById("skill-Composition").value,
      "skill-Criminology": document.getElementById("skill-Criminology").value,
      "skill-Cryptography": document.getElementById("skill-Cryptography").value,
      "skill-Deduction": document.getElementById("skill-Deduction").value,
      "skill-Education": document.getElementById("skill-Education").value,
      "skill-Gamble": document.getElementById("skill-Gamble").value,
      "skill-Language": document.getElementById("skill-Language").value,
      //"skill-Streetslang": document.getElementById("skill-Streetslang").value,
      "skill-LibrarySearch": document.getElementById("skill-LibrarySearch")
        .value,
      "skill-LocalExpert": document.getElementById("skill-LocalExpert").value,
      "skill-LocalExpert_Home": document.getElementById(
        "skill-LocalExpert_Home"
      ).value,
      "skill-Science": document.getElementById("skill-Science").value,
      "skill-Tactics": document.getElementById("skill-Tactics").value,
      "skill-WildernessSurvival": document.getElementById(
        "skill-WildernessSurvival"
      ).value,
      "skill-Brawling": document.getElementById("skill-Brawling").value,
      "skill-Evasion": document.getElementById("skill-Evasion").value,
      "skill-MartialArts": document.getElementById("skill-MartialArts").value,
      "skill-MeleeWeapon": document.getElementById("skill-MeleeWeapon").value,
      "skill-Acting": document.getElementById("skill-Acting").value,
      "skill-PlayInstrument": document.getElementById("skill-PlayInstrument")
        .value,
      "skill-Archery": document.getElementById("skill-Archery").value,
      "skill-Autofire": document.getElementById("skill-Autofire").value,
      "skill-Handgun": document.getElementById("skill-Handgun").value,
      "skill-HeavyWeapons": document.getElementById("skill-HeavyWeapons").value,
      "skill-ShoulderArms": document.getElementById("skill-ShoulderArms").value,
      "skill-Bribery": document.getElementById("skill-Bribery").value,
      "skill-Conversation": document.getElementById("skill-Conversation").value,
      "skill-HumanPerception": document.getElementById("skill-HumanPerception")
        .value,
      "skill-Interrogation": document.getElementById("skill-Interrogation")
        .value,
      "skill-Persuasion": document.getElementById("skill-Persuasion").value,
      "skill-PersonalGrooming": document.getElementById(
        "skill-PersonalGrooming"
      ).value,
      "skill-Streetwise": document.getElementById("skill-Streetwise").value,
      "skill-Trading": document.getElementById("skill-Trading").value,
      "skill-WardrobeStyle": document.getElementById("skill-WardrobeStyle")
        .value,
      "skill-AirVehicleTech": document.getElementById("skill-AirVehicleTech")
        .value,
      "skill-BasicTech": document.getElementById("skill-BasicTech").value,
      "skill-Cybertech": document.getElementById("skill-Cybertech").value,
      "skill-Demolitions": document.getElementById("skill-Demolitions").value,
      "skill-ElectronicsSecurityTech": document.getElementById(
        "skill-ElectronicsSecurityTech"
      ).value,
      "skill-FirstAid": document.getElementById("skill-FirstAid").value,
      "skill-Forgery": document.getElementById("skill-Forgery").value,
      "skill-LandVehicleTech": document.getElementById("skill-LandVehicleTech")
        .value,
      "skill-PaintDrawSculpt": document.getElementById("skill-PaintDrawSculpt")
        .value,
      "skill-Paramedic": document.getElementById("skill-Paramedic").value,
      "skill-PhotographyFilm": document.getElementById("skill-PhotographyFilm")
        .value,
      "skill-PickLock": document.getElementById("skill-PickLock").value,
      "skill-PickPocket": document.getElementById("skill-PickPocket").value,
      "skill-SeaVehicleTech": document.getElementById("skill-SeaVehicleTech")
        .value,
      "skill-Weaponstech": document.getElementById("skill-Weaponstech").value,
      "skill-DriveLandVehicle": document.getElementById(
        "skill-DriveLandVehicle"
      ).value,
      "skill-PilotAirVehicle": document.getElementById("skill-PilotAirVehicle")
        .value,
      "skill-PilotSeaVehicle": document.getElementById("skill-PilotSeaVehicle")
        .value,
      "skill-Riding": document.getElementById("skill-Riding").value,
      // Add other skills as needed
    },
  };

  console.log("Saving character sheet:", characterData); // Debug: Log the character data

  // Use Firebase Database to save data
  try {
    console.log("Saving character sheet...");
    console.log("userId", userId);
    console.log("characterId", characterId);
    await set(
      ref(database, `users/${userId}/characterSheets/${characterId}`),
      characterData
    );
    alert("Character sheet saved successfully!");
  } catch (error) {
    console.error("Error saving character sheet:", error);
    alert("Failed to save character sheet: " + error.message);
  }
}

document
  .getElementById("saveCharacterSheet")
  .addEventListener("click", saveCharacterSheet);
