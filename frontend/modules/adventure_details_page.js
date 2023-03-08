import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
    console.log(search);
    const params = new URLSearchParams(search);

    let adventureId = params.get('adventure');
    console.log(adventureId);

    return adventureId;
  // Place holder for functionality to work in the Stubs
  //return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
     let APIEndPoint = config.backendEndpoint+"adventures/detail?adventure="+adventureId;
     console.log(APIEndPoint);
    try{
     let APIResponse = await fetch(APIEndPoint);
     let responseData = await APIResponse.json();
     //console.log(responseData);
     return responseData;
    }catch{
      return null;
    }
  // Place holder for functionality to work in the Stubs
   //return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
    //console.log(adventure);

    //Setting the name of adventure 
    document.getElementById("adventure-name").innerHTML=adventure.name;

    //Setting the subtitle
    document.getElementById("adventure-subtitle").innerHTML=adventure.subtitle;

    //Setting the images
    adventure.images.forEach((image)=>{
      //console.log(image);
      let div = document.createElement("div");
      div.innerHTML=`<img src="${image}" class="activity-card-image">`;
      document.getElementById("photo-gallery").append(div);
    });

    document.getElementById("adventure-content").innerHTML=adventure.content;
    addBootstrapPhotoGallery(adventure.images);
    
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  console.log(images);
  let startercode = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators" id="carousel-indicators">
    
  </div>
  <div class="carousel-inner" id="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
  document.getElementById("photo-gallery").innerHTML=startercode;

  images.forEach((image, index) => {
    let carouselIndicators = document.getElementById("carousel-indicators");

    let imagediv = document.createElement("div");
    if(index === 0){
      imagediv.classList.add("carousel-item", "active");

      let btn = document.createElement("button");
      btn.setAttribute("type","button");
      btn.setAttribute("data-bs-target","#carouselExampleIndicators");
      btn.setAttribute("data-bs-slide-to",""+index);
      btn.setAttribute("aria-current","true");
      btn.setAttribute("aria-label","Slide "+index);
      btn.classList.add("active");
        
      carouselIndicators.append(btn); 
      }else{
       imagediv.classList.add("carousel-item");
       let btn = document.createElement("button");
      btn.setAttribute("type","button");
      btn.setAttribute("data-bs-target","#carouselExampleIndicators");
      btn.setAttribute("data-bs-slide-to",""+index);
      btn.setAttribute("aria-label","Slide "+index);
      carouselIndicators.append(btn); 
      }
      imagediv.innerHTML = `<img src="${image}" class="activity-card-image d-block w-100" alt="image">`;
    const carouselInner = document.getElementById("carousel-inner");
    carouselInner.append(imagediv);
  })
  console.log(document.getElementsByClassName("carousel-item").length,images.length)

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
    if(adventure.available===true){
      document.getElementById("reservation-panel-available").style.display = "block";
      document.getElementById("reservation-panel-sold-out").style.display="none";
      console.log("Is adventure available: ",adventure.available);
      document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead ;
      console.log(adventure.costPerHead);
    }else{
      document.getElementById("reservation-panel-sold-out").style.display = "block";
      document.getElementById("reservation-panel-available").style.display="none";
    }
  

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
    let totalCost = adventure.costPerHead*persons;

    document.getElementById("reservation-cost").innerHTML=totalCost;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  document.getElementById("myForm").addEventListener("submit",async(e)=>{
        
    e.preventDefault();
    let myForm = document.getElementById("myForm");

    const {name, date, person} = myForm.elements;

    console.log(name.value,date.value,person.value,adventure.id);
    console.log(adventure);

    const obj = {
      name: name.value,
      date: date.value,
      person: person.value,
      adventure: adventure.id
    }
    

    let APIEndPoint = config.backendEndpoint+"reservations/new"; 
    console.log(APIEndPoint);
    try{
    let responseData = await fetch(APIEndPoint,{
      method: 'POST',
      headers:{ 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    });
  
    let data = await responseData.json();
    console.log(data);

    alert('Success!');
    location.reload();
    }catch{
      alert('Failed!');
    }
  });

  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure.reserved);
    if(adventure.reserved===true){
      document.getElementById("reserved-banner").style.display="block";
    }
    else{
      document.getElementById("reserved-banner").style.display="none";
    }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
