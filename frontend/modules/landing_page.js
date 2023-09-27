import config from "../conf/index.js";

async function init() {
  try {
    // Fetches list of all cities along with their images and description
    let cities = await fetchCities();

    // Updates the DOM with the cities
    cities.forEach((cityData) => {
      addCityToDOM(cityData.id, cityData.city, cityData.description, cityData.image);
    });
  } catch (error) {
    console.error("Error in init():", error);
  }
}

// Implementation of fetch call
async function fetchCities() {
  try {
    // TODO: Make an actual API call here to fetch cities from your backend
    // Example using the Fetch API:
    const response = await fetch(config.apiUrl + "/cities");
    
    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }

    const cities = await response.json();
    return cities;
  } catch (error) {
    throw error;
  }
}

// Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let container = document.createElement("div");
  container.className = "col-6";
  let innerHTML = `<p>${city}<p><img src="${image}" class="img-responsive">`;
  container.innerHTML = innerHTML;

  document.getElementById("data").appendChild(container);
}

export { init, fetchCities, addCityToDOM };
