import config from "../conf/index.js";

async function init() {
  
  //Checklist for init()
  console.log("From Init()");
  console.log(config.backendEndpoint+"cities");
  debugger;
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);
  
  //Updates the DOM with the cities
  cities.forEach((key) => {
    debugger
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let APIpath = config.backendEndpoint+"cities";
    let responseObj = await fetch(APIpath);
    debugger;
    let dataArray = await responseObj.json();

    return dataArray;  
}catch(err){
      return null;
}

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
    let data = document.getElementById("data");

    let divAdventureCard = document.createElement("div");
    divAdventureCard.classList.add("col-12","col-sm-6", "col-lg-3","mb-4");
    divAdventureCard.innerHTML=`
    <a id=${id} href="pages/adventures/?city=${id}">
      <div class="tile">
        <img src="${image}" />
        <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
      </div>
    </a>
    `;

    data.appendChild(divAdventureCard);

}

export { init, fetchCities, addCityToDOM };
