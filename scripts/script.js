import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

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
const db = getDatabase();
const categoriesRef = ref(db, "Categories");

//when button with id generate is clicked + generateNightMarket function is called and we log to the console
//document.getElementById('generate').addEventListener('click', generateNightMarket);
document.addEventListener("DOMContentLoaded", function () {
  console.log("Button loading");
  if (document.getElementById("generateButton") != null) {
    document.getElementById("generateButton").addEventListener("click", () => {
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
  }
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
        marketHTML += `<p>${item.name} (References: ${item.references.join(
          ", "
        )})</p>`;
      });
    });
    marketHTML += "</div>";
  });

  return marketHTML;
}

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("verify-button");

  button.addEventListener("click", function () {
    verifyAllocation();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("verify-button");

  button.addEventListener("click", function () {
    verifyAllocation();
  });
});

function verifyAllocation() {
  const maxPoints = 62;
  const inputs = document.querySelectorAll(".stat");
  let totalPoints = 0;
  let valid = true;
  let message = "";
  let bodyValue = 0;
  let willValue = 0;
  let empValue = 0;
  let intValue = 0;
  let refValue = 0;
  let dexValue = 0;
  let techValue = 0;
  let coolValue = 0;
  let luckValue = 0;
  let moveValue = 0;
  let humanityPoints = 0;

  inputs.forEach((input) => {
    // Parse input value, default to 0 if the value is not a valid number
    const value = parseInt(input.value) || 0;

    // Ensure value is between 2 and 8
    if (value < 2 || value > 8) {
      valid = false;
    }

    // Store BODY, WILL, and EMP values for respective calculations
    if (input.id === "skill-BODY") {
      bodyValue = value;
    }
    if (input.id === "skill-WILL") {
      willValue = value;
    }
    if (input.id === "skill-EMP") {
      empValue = value;
    }
    if (input.id === "skill-INT") {
      intValue = value;
    }
    if (input.id === "skill-REF") {
      refValue = value;
    }
    if (input.id === "skill-DEX") {
      dexValue = value;
    }
    if (input.id === "skill-TECH") {
      techValue = value;
    }
    if (input.id === "skill-COOL") {
      coolValue = value;
    }
    if (input.id === "skill-LUCK") {
      luckValue = value;
    }
    if (input.id === "skill-MOVE") {
      moveValue = value;
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
    const hitPoints = 10 + 5 * averageBodyWill;

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
    document.getElementById("skill-humanity").innerHTML = humanityPoints;
    document.getElementById("skill-hp").innerHTML = hitPoints;

    //find each instance of a class and change the innerHTML to the value of the variable
    document.querySelectorAll(".will-skill").forEach(function (element) {
      element.innerHTML = willValue;
    });
    document.querySelectorAll(".int-skill").forEach(function (element) {
      element.innerHTML = intValue;
    });
    document.querySelectorAll(".ref-skill").forEach(function (element) {
      element.innerHTML = refValue;
    });
    document.querySelectorAll(".dex-skill").forEach(function (element) {
      element.innerHTML = dexValue;
    });
    document.querySelectorAll(".tech-skill").forEach(function (element) {
      element.innerHTML = techValue;
    });
    document.querySelectorAll(".cool-skill").forEach(function (element) {
      element.innerHTML = coolValue;
    });
    document.querySelectorAll(".luck-skill").forEach(function (element) {
      element.innerHTML = luckValue;
    });
    document.querySelectorAll(".move-skill").forEach(function (element) {
      element.innerHTML = moveValue;
    });
  }

  document.getElementById("message").innerHTML = message;
}

document.addEventListener("DOMContentLoaded", function () {
  const verifyButton = document.getElementById("verify-skills");

  verifyButton.addEventListener("click", function () {
    verifySkills();
  });
});

//sanitize inputs, allow text, numbers and some special characters
function sanitizeInput(input) {
  return input.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]/g, "");
}

// Skills with x2 cost
const doubleCostSkills = [
  "MartialArts",
  "HeavyWeapons",
  "PilotAirVehicle",
  "PilotSeaVehicle",
  "Paramedic",
]; // Add more x2 skills if needed

function verifySkills() {
  let totalSkillPoints = 86;
  let pointsUsed = 0;
  let skillMessage = "";
  let valid = true;
  console.log(totalSkillPoints);
  // Retrieve input values
  const inputs = document.querySelectorAll('input[class="skill-input"]');

  inputs.forEach((input) => {
    const skillName = input.id.split("-")[1]; // Skill name derived from input ID
    let skillValue = parseInt(input.value) || 0;

    // Check if any skill exceeds max level of 6 or is lower than 2
    if (skillValue < 2 || skillValue > 6) {
      valid = false;
      console.log(skillName + ' is invalid:' + skillValue);
    }

    // Add skill points used, consider x2 cost skills
    if (doubleCostSkills.includes(skillName)) {
      pointsUsed += (skillValue - 2) * 2; // Minimum of 2, so subtract 2 and multiply by 2
    } else {
      pointsUsed += skillValue - 2; // Regular cost for other skills (1 point per level)
    }
  });

  // Add 4 free levels for Language skill
  const languageInput = document.getElementById("skill-Language");
  const languageLevel = parseInt(languageInput.value) || 0;
  pointsUsed -= 4; // Deduct 4 free points from Language

  // Validate and display results
  console.log('points used ' + pointsUsed + 'vs allocated' +totalSkillPoints);
  console.log(pointsUsed > totalSkillPoints);
  if (!valid) {
    skillMessage = "Each skill must be between 2 and 6.";
  }
  if (pointsUsed > totalSkillPoints) {
    console.log(pointsUsed, +", " + totalSkillPoints);
    skillMessage += ` You have exceeded the maximum of 86 points. Points used: ${pointsUsed}`;
  } else if (pointsUsed < totalSkillPoints) {
    skillMessage += ` You still have points to allocate. Remaining: ${
      totalSkillPoints - pointsUsed
    }`;
  }
  if (valid && pointsUsed === totalSkillPoints) {
    skillMessage = `Skills allocated correctly! Points used: ${pointsUsed}`;
  }

  document.getElementById("skill-message").textContent = skillMessage;
}
