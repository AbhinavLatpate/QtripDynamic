import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL


  // Place holder for functionality to work in the Stubs
  const prem = new URLSearchParams(search);
  return prem.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    const data = await res.json();
    // Place holder for functionality to work in the Stubs
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log(adventure);
  const nameEle = document.getElementById("adventure-name");
  nameEle.innerHTML = adventure.name;
  const subtitleEle = document.getElementById("adventure-subtitle");
  subtitleEle.innerHTML = adventure.subtitle;
  const imageArr = adventure.images;
  // console.log(imageArr);
  const imageEle = document.getElementById("photo-gallery");
  for(let i = 0 ; i < imageArr.length; i++){
    const img = document.createElement("img");
    img.className = "activity-card-image";
    img.src = imageArr[i];
    imageEle.append(img);
  }
  const contentEle = document.getElementById("adventure-content");
  contentEle.innerHTML = adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const imageEle = document.getElementById("photo-gallery");
  
  imageEle.innerHTML =  `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id = "carouselImg">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
  </button>
  </div>`;
  const carouselImg = document.getElementById("carouselImg");
  for(let i = 0 ; i < images.length; i++){
    const itemDiv = document.createElement("div");
    itemDiv.className = "carousel-item";
    const img = document.createElement("img");
    img.className = "activity-card-image d-block";
    img.src = images[i];
    
    itemDiv.append(img);
    carouselImg.append(itemDiv);
  }
  const carouselItem = document.getElementsByClassName("carousel-item");
  carouselItem[0].className = carouselItem[0].className+" active";
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(adventure);
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display ="none";
    document.getElementById("reservation-panel-available").style.display ="block";
    document.getElementById("reservation-person-cost").innerHTML=adventure["costPerHead"];
  }else{
    document.getElementById("reservation-panel-sold-out").style.display ="block";
    document.getElementById("reservation-panel-available").style.display = "none";

  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const totalPrice = adventure.costPerHead*persons;
  // console.log(totalPrice);
  document.getElementById("reservation-cost").innerHTML = totalPrice;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  const myForm=document.getElementById("myForm");
  myForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let  data={
      name:myForm.elements["name"].value,
      date:new Date(myForm.elements["date"].value),
      person:myForm.elements["person"].value,
      adventure:adventure["id"]
    }
    //console.log(data);
    try{
      const url=`${config.backendEndpoint}/reservations/new`;
      const res=await fetch(url,{
        method:"POST",
       headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(data)
      });
     alert("success");
     window.location.reload();
    }
    catch(error){
      console.log(error);
      alert("failed");
 
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure["reserved"]==true){
    document.getElementById("reserved-banner").style.display="block";
  }else{
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
