// Page Elements
const inputField = document.getElementById('city');
const submitBtn = document.getElementById('button');
const container = document.querySelector(".container")

// Foursquare API Info
const clientId = '1FYL3UDSA4FEATQF0GZJJON1TCPWVYCK1QISOZPOYZG1IBG5';
const clientSecret = '4HULZXBJV0H1P3RKYBRH5IPFQRP44FKGDWUILLYTML4QXA4A';
const url = 'https://api.foursquare.com/v2/venues/explore?near='
//// WEATHER API Info
const weatherApi = '09eb77c925fcadfc57d718445ecec656'
const weatherUrl = 'http://api.weatherstack.com/current?access_key='

//// news api info

const newsKey = "44af7446604c499795c5376f9c702ade";
const newsApi = "https://newsapi.org/v2/everything?q="




// Add AJAX functions here:
let city = "";
const getVenues = async () => {


    const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20220128`

    //console.log(urlToFetch);
    try {
        let response = await fetch(urlToFetch);
        if (response.ok) {
            let jsonResponse = await response.json();
            //console.log(jsonResponse);
            let venues = jsonResponse.response.groups[0].items
            // console.log(venues);
            return venues
        }
    } catch (error) {
        console.log(error);
    }
}

const getForecast = async () => {
    const urlToFetch = `${weatherUrl + weatherApi}&query=${city}`
    // console.log(urlToFetch);
    try {
        let response = await fetch(urlToFetch);
        if (response.ok) {
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            // let venues = jsonResponse.response.groups[0].items
            // console.log(venues);
            return jsonResponse
        }

    } catch (error) {
        console.log(error);
    }

}

const getNews = async () => {
    const urlToFetch = `${newsApi + city}&from=2022-01-28&sortBy=publishedAt&apiKey=${newsKey}`
    console.log(urlToFetch);
    // console.log(urlToFetch);
    try {
        let response = await fetch(urlToFetch);
        if (response.ok) {
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse
        }

    } catch (error) {
        console.log(error);
    }


}
getNews()
submitBtn.onclick = () => {
    city = inputField.value
    container.style.visibility = "visible"


    getForecast().then(res => createWeatherHTML(res))
    getVenues().then(res => createVenuesHTML(res))
    //createVenuesHTML(getVenues())
    getNews().then(res => createSportsHTML(res))

}





// Execute function
