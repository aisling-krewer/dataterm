// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
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

// Set persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    const user = auth.currentUser; // Get the current user from the auth module

    if (!user) {
      console.log(
        "User is not logged in. Please log in to save your character sheet."
      );
      updateUI(null, "logging_out");
    } else {
      console.log("Persistence is set");
      console.log("User is logged in");
      updateUI(user, "logging_in");
    }
  })
  .catch((error) => {
    if (error.code === "auth/web-storage-unsupported") {
      console.error("Web storage is not supported in this browser.");
    } else if (error.code === "auth/operation-not-allowed") {
      console.error("Persistence is not enabled.");
    } else if (error.code) {
      console.error("Error setting persistence:", error.code, error.message);
    }
  });
// Event listener for sign up/sign in form
function updateUI(user, state) {
  console.log("Updating UI" + state);
  if (state === "logging_in") {
    console.log("logged in");
    if (authForm) {
      authForm.style.display = "none";
    }
    if (signOutBtn) {
      signOutBtn.style.display = "inline";
    }
    document.getElementById("welcome").innerHTML = "Welcome " + user.email;
    document.getElementById("generateButton").value = "ACCESS NIGHT MARKET";
  } else if (state === "logging_out") {
    console.log("User signed out");
    if (authForm) {
      authForm.style.display = "inline";
    }
    if (signOutBtn) {
      signOutBtn.style.display = "none";
    }
    document.getElementById("welcome").innerHTML = "Welcome Guest";
    document.getElementById("generateButton").value = "ACCESS DENIED";
  }
}
if (authForm) {
  authForm.addEventListener("submit", (e) => {
    console.log("Signing up");
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Try to sign in first, if it fails, create a new user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateUI(user, "logging_in");
      })
      .catch((error) => {
        // Handle sign-in errors here
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorCode, errorMessage);
        return createUserWithEmailAndPassword(auth, email, password);
      })
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        updateUI(user, "logging_in");
      })
      .catch((error) => {
        // Handle sign-up errors here
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing up:", errorCode, errorMessage);
      });
  });
}

if (signOutBtn) {
  // Event listener for signing out
  signOutBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        updateUI(null, "logging_out");
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  });
}

function sanitizeInput(input) {
  return input.replace(/[^a-zA-Z0-9.,\-_@!#$%^&*()_+-]/g, "");
}

async function saveCharacterSheet() {
  const user = auth.currentUser; // Get the current user from the auth module
  console.log("saving...");
  if (!user) {
    alert(
      "User is still not logged in. Please log in to save your character sheet."
    );
    return;
  }
  if (!document.getElementById("characterName").value) {
    alert("Please enter a character name to save the character sheet.");
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

  // Use Firebase Database to save data
  try {
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

// function to load character sheet from firebase using the character name
async function loadCharacterSheet() {
  const user = auth.currentUser; // Get the current user from the auth module
  if (!user) {
    alert(
      "User is still not logged in. Please log in to save your character sheet."
    );
    return;
  }
  const userId = user.uid; // Get user ID
  const characterName = document.getElementById("characterName").value; // Get character name from input
  const characterId = user.uid + characterName; // Generate a unique character ID
console.log(`users/${userId}/characterSheets/${characterId}`);
  // Use Firebase Database to load data
  try {
    const characterSheetSnapshot = await get(
      ref(database, `users/${userId}/characterSheets/${characterId}`)
    );
    const characterSheet = characterSheetSnapshot.val();
    if (characterSheet) {
      // Load character data into input fields
      document.getElementById("characterName").value = characterSheet.name;
      for (const [key, value] of Object.entries(characterSheet.stats)) {
        document.getElementById(key).value = value;
      }
      for (const [key, value] of Object.entries(characterSheet.skills)) {
        document.getElementById(key).value = value;
      }
      alert("Character sheet loaded successfully!");
    } else {
      alert("Character sheet not found.");
    }
  } catch (error) {
    console.error("Error loading character sheet:", error);
    alert("Failed to load character sheet: " + error.message);
  }
}

if (document.getElementById("saveCharacterSheet")) {
  document
    .getElementById("saveCharacterSheet")
    .addEventListener("click", saveCharacterSheet);
}

if (document.getElementById("loadCharacterSheet")) {
  document
    .getElementById("loadCharacterSheet")
    .addEventListener("click", loadCharacterSheet);
}
