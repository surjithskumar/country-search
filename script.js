async function fetchCountry(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching country data:', error);
        throw error;
    }
}

//style="width: 18rem;"

async function displayData(countryName) {
    try{
        let countryData = await fetchCountry(countryName);
        let cardcontainer = document.getElementById("display");

        let htmlCards = countryData.map(item => {
            return `
            <div class="card" style="width:18rem;"> 
            <img src="${item.flags.png}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title" style="overflow-y: hidden;">${item.name.official}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${item.capital}</li>
                <li class="list-group-item">${item.population}</li>
                <li class="list-group-item">${item.region}</li>
            </ul>
            </div>
            `;
        }).join(''); // Join the array into single string
        cardcontainer.innerHTML  = htmlCards; //set innerHTML after joining
    } catch (error) {
        console.error("Failed to display data:",error);
    }
}

// CEvent listener to the button

let btn = document.getElementById("button");
btn.addEventListener("click",()=>{
    const countryName = document.getElementById("search").value;
    if (countryName){
        displayData(countryName);
    } else {
        //clear the display if the input is empty
        document.getElementById("display").innerHTML =``;
    }
})