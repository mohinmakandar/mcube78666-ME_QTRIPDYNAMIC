
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  const params= new URLSearchParams(search);
  let city = params.get('city');
  console.log(city);
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
    try{
    const response = await fetch(config.backendEndpoint+"adventures?city="+city);

    const data = await response.json();
    console.log(data);
    return data;
    }catch{
      return null;
    }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  let outerdiv = document.getElementById("data");
  
  for(let i=0;i<adventures.length;i++){

      let id = adventures[i].id;
      let image = adventures[i].image;
      let name = adventures[i].name;
      let price = adventures[i].costPerHead;
      let currency = adventures[i].currency;
      let duration = adventures[i].duration;
      let category=adventures[i].category;

      let link = "detail/?adventure="+id;

      let innerdiv = document.createElement("div");
      innerdiv.classList.add("col-6","col-lg-3","mb-4", "divcard");

      innerdiv.innerHTML = `
        <a id=${id} href="${link}">
        <div class="category-banner">${category}</div>
          <div class="activity-card">
            <img src="${image}" class="activity-card-image" alt="..." />
            <div class="activity-body">
              <div class="activity-item">
                <h5>${name}</h5>
                <p>₹ ${price}</p>
               </div>
               <div class="activity-item">  
                <h5>Duration</h5>
                <p>${duration} Hours</p>
               </div>  
              </div>
            </div>
           </div>  
        </a>
      `;

      outerdiv.appendChild(innerdiv);
  }

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let advlist =[];
  for(let i=0;i<list.length;i++){
      if(parseInt(list[i]["duration"])>=low && parseInt(list[i]["duration"])<=high){
        advlist.push(list[i]);
      }
  }
  console.log("duration filtered list: ",advlist);
  return advlist;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

    let advlist = [];
    for(let i=0;i<categoryList.length;i++){
      for(let j=0;j<list.length;j++){
        //console.log("current: ",list[j]["category"]);
        if(categoryList[i]==list[j]["category"]){
          advlist.push(list[j])
        }
      }
    }
    //console.log("old list: ",list);
    console.log("category filtered list: ",advlist);
    return advlist;


}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
      
  //console.log(filters);
      let categories =[];
      let adventureslist=[];
      if(filters["category"].length>0)
      {
        for(let i=0;i<filters["category"].length;i++){
          categories[i]=filters["category"][i];
        }
       adventureslist = filterByCategory(list,categories);
      }

      //Filter by duration code
      let advlist =[];
      if(filters["duration"].length>0){
        let splitarr = filters["duration"].split("-");
        let low = parseInt(splitarr[0]);
        let high = parseInt(splitarr[1]);
        
        if(adventureslist.length>0){
        advlist = filterByDuration(adventureslist,low,high); 
        }else{
          console.log("length: ",adventureslist.length);
          advlist = filterByDuration(list,low,high); 
          //console.log("list to send",list);
          //console.log("list received",advlist);
        }
      }

      if(advlist.length>0){  //if filtered by duration and category / only duration
        return advlist
      }
      else if(categories.length>0){ // if filtered by category
        return adventureslist;
      }
  // Place holder for functionality to work in the Stubs
  return list;  //not filtered by anything
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

    localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
    const obj = JSON.parse(localStorage.getItem("filters"));
    return obj;
    // Place holder for functionality to work in the Stubs
 // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value=filters['duration'];

  let categoryList = document.getElementById("category-list");

  for(let i=0;i<filters.category.length;i++){
    console.log(filters["category"][i]);
    let pill = document.createElement("div");
    pill.className = "category-filter";
    pill.textContent = filters["category"][i];
    categoryList.append(pill);
  }

  //document.getElementById("category-list").children.length).toEqual(filters.category.length);

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
