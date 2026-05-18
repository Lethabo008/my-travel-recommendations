const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

let travelData = {};

// Fetch JSON data
fetch("travel_recommendation_api.json")
  .then(response => response.json())
  .then(data => {
    travelData = data;
    console.log(data);
  })
  .catch(error => console.log("Error fetching data:", error));


// Display Results Function
function displayResults(items) {

  resultsDiv.innerHTML = "";

  items.forEach(item => {

    const card = document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}">

      <div class="card-content">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
    `;

    resultsDiv.appendChild(card);

  });

}


// Search Function
function searchRecommendations() {

  const keyword = searchInput.value.toLowerCase();

  let results = [];

  // Beaches
  if (keyword.includes("beach")) {

    results = travelData.beaches;

  }

  // Temples
  else if (keyword.includes("temple")) {

    results = travelData.temples;

  }

  // Countries
  else if (
    keyword.includes("country") ||
    keyword.includes("countries")
  ) {

    // Extract cities from countries
    travelData.countries.forEach(country => {

      country.cities.forEach(city => {

        results.push(city);

      });

    });

  }

  // Invalid Search
  else {

    resultsDiv.innerHTML = `
      <h3>No matching results found.</h3>
    `;

    return;
  }

  displayResults(results);

} 


// Clear Results
function clearResults() {

  resultsDiv.innerHTML = "";

  searchInput.value = "";

}


// Event Listeners
searchBtn.addEventListener("click", searchRecommendations);

resetBtn.addEventListener("click", clearResults);