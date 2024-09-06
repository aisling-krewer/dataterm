import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const categoriesRef = ref(db, "Categories");

//when button with id generate is clicked, generateNightMarket function is called and we log to the console
//document.getElementById('generate').addEventListener('click', generateNightMarket);
document.addEventListener("DOMContentLoaded", function() {
    console.log("Button loading");
document
  .getElementById("generateButton")
  .addEventListener("click", () => {
    console.log("Button clicked");
    get(categoriesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const categories = snapshot.val();
          const marketHTML = generateNightMarket(categories);
          document.getElementById("marketDisplay").innerHTML = marketHTML;
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
function getRandomElements(arr, count) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateNightMarket(categories) {
  const categoryKeys = Object.keys(categories[0]);
  const selectedCategories = getRandomElements(
    categoryKeys,
    Math.floor(Math.random() * 3) + 2
  );

  let marketHTML = "";

  selectedCategories.forEach((categoryKey) => {
    marketHTML += `<div class='listing'><h2>Category: ${categoryKey}</h2><div class="dt-line"></div>`;

    const subcategories = categories[0][categoryKey][0];
    const subcategoryKeys = Object.keys(subcategories);
    const selectedSubcategories = getRandomElements(
      subcategoryKeys,
      Math.floor(Math.random() * 2) + 1
    );

    selectedSubcategories.forEach((subcategoryKey) => {
      marketHTML += `<h4>Subcategory: ${subcategoryKey}</h4>`;

      const items = subcategories[subcategoryKey];
      const selectedItems = getRandomElements(
        items,
        Math.floor(Math.random() * 4) + 1
      );

      selectedItems.forEach((item) => {
        marketHTML += `<p>${
          item.name
        } (References: ${item.references.join(", ")})</p>`;
      });
    });
    marketHTML += "</div>";
  });

  return marketHTML;
}

document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('verify-button');
  
  button.addEventListener('click', function() {
      verifyAllocation();
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('verify-button');
  
  button.addEventListener('click', function() {
      verifyAllocation();
  });
});

function verifyAllocation() {
  const maxPoints = 62;
  const inputs = document.querySelectorAll('.stat');
  let totalPoints = 0;
  let valid = true;
  let message = "";

  inputs.forEach(input => {
      // Parse input value, default to 0 if the value is not a valid number
      const value = parseInt(input.value) || 0;

      // Ensure value is between 2 and 8
      if (value < 2 || value > 8) {
          valid = false;
      }
      totalPoints += value;
  });

  if (!valid) {
      message = "Each skill must be between 2 and 8.";
  } else if (totalPoints !== maxPoints) {

      message = `You must allocate exactly ${maxPoints} points. Currently allocated: ${totalPoints}.`;
  } else {
      message = "Points allocated correctly!";
  }

  document.getElementById('message').textContent = message;
}
