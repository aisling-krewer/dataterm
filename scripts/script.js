import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

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
  let bodyValue = 0;
  let willValue = 0;
  let empValue = 0;
  let humanityPoints = 0;

  inputs.forEach(input => {
      // Parse input value, default to 0 if the value is not a valid number
      const value = parseInt(input.value) || 0;

      // Ensure value is between 2 and 8
      if (value < 2 || value > 8) {
          valid = false;
      }

      // Store BODY, WILL, and EMP values for respective calculations
      if (input.id === 'skill-BODY') {
          bodyValue = value;
      }
      if (input.id === 'skill-WILL') {
          willValue = value;
      }
      if (input.id === 'skill-EMP') {
          empValue = value;
      }

      totalPoints += value;
  });

  if (!valid) {
      message = "Each skill must be between 2 and 8.";
  } else if (totalPoints !== maxPoints) {
      message = `You must allocate exactly ${maxPoints} points. Currently allocated: ${totalPoints}.`;
  } else {
      // Calculate Hit Points: 10 + (5 × [BODY and WILL averaged, rounding up])
      const averageBodyWill = Math.ceil((bodyValue + willValue) / 2);
      const hitPoints = 10 + (5 * averageBodyWill);

      // Calculate Seriously Wounded Wound Threshold (half HP, rounded up)
      const seriouslyWoundedThreshold = Math.ceil(hitPoints / 2);

      // Calculate Death Save (equal to BODY stat)
      const deathSave = bodyValue;

      // Calculate Humanity Points (10 × EMP stat)
      humanityPoints = empValue * 10;

      // Check EMP reduction based on humanity points
      let adjustedEMP = empValue;
      if (humanityPoints % 10 !== 0) {
          adjustedEMP = Math.floor(humanityPoints / 10);
      }

      // Final message with all calculated values
      message = `
          Points allocated correctly! <br>
          Your Hit Points are: ${hitPoints} <br>
          Seriously Wounded Wound Threshold: ${seriouslyWoundedThreshold} <br>
          Death Save (BODY): ${deathSave} <br>
          Humanity Points: ${humanityPoints} <br>
          Adjusted EMP (based on Humanity): ${adjustedEMP}
      `;
  }

  document.getElementById('message').innerHTML = message;
}


