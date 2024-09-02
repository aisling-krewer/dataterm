import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

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
    marketHTML += `<div class='listing'><h2>Category: ${categoryKey}</h2>`;

    const subcategories = categories[0][categoryKey][0];
    const subcategoryKeys = Object.keys(subcategories);
    const selectedSubcategories = getRandomElements(
      subcategoryKeys,
      Math.floor(Math.random() * 2) + 1
    );

    selectedSubcategories.forEach((subcategoryKey) => {
      marketHTML += `<h3>Subcategory: ${subcategoryKey}</h3>`;

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