import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities

  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
  
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let cities = [{
    "id": "bengaluru",
    "city": "Bengaluru",
    "description": "100+ Places",
    "image": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  }];

  return cities;

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let container = document.createElement("div")
  container.className = "col-6";
  let innerHTML = `<p>${city}<p><img src="${image}" class="img-response">`
  container.innerHTML = innerHTML;

  document.getElementById("data").appendChild(container);

}

export { init, fetchCities, addCityToDOM };
