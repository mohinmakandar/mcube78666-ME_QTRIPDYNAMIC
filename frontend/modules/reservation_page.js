import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
    let APIEndpoint = config.backendEndpoint+"reservations/";

    try{
      let APIresponse = await fetch(APIEndpoint);
      let responseData = await APIresponse.json();
      console.log(responseData);
      return responseData; 
    }catch{
      return null;
    }

  // Place holder for functionality to work in the Stubs
 // return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
    if(reservations.length===0){
      document.getElementById("no-reservation-banner").style.display="block";
      document.getElementById("reservation-table-parent").style.display="none";
    }
    else{
      document.getElementById("no-reservation-banner").style.display="none";
      document.getElementById("reservation-table-parent").style.display="block";
      
      let tbody = document.getElementById("reservation-table");

      reservations.forEach((reservation)=>{

        
        let d1 = new Date(reservation.date);
        let d2 = new Date(reservation.time);
        const options = {dateStyle:'long', timeStyle:'medium'}
        let timeString = d2.toLocaleString('en-IN',options).split('at');
        console.log(timeString);
        let finaltimestring = timeString[0].slice(0,timeString[0].length-1)+","+timeString[1];
    
        let tr = document.createElement("tr");
        tr.innerHTML=`
        <td><strong>${reservation.id}</strong></td>
        <td>${reservation.name}</td>
        <td>${reservation.adventureName}</td>
        <td>${reservation.person}</td>
        <td>${d1.toLocaleDateString('en-IN')}</td>
        <td>${reservation.price}</td>
        <td>${finaltimestring}</td>
        <td><button id=${reservation.id} class="reservation-visit-button"><a href="../detail/?adventure=${reservation.adventure}">Visit Adventure</a</td>
         `;
        tbody.append(tr);
      })
    }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
