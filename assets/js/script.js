// API key
var apiKey = "84451525b0d6082d8cc3aa7f5d04ae49";
// var searchButton = $("#searchButton");
var searchCity = $("#searchCity");
var clearHistory = $("#clear-history");
var currentWeather = $("#current-weather");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentWindSpeed = $("#wind-speed");
var currentHumidity = $("#humidity");
var weatherNowURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;
// var weatherNowURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
// var weatherNowURL = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={APIkey}';

let city = "";


// fetch(weatherNowURL)
// .then (function (response){
// // console.log(response)
// return response.json()
// })
// .then(function(data){
// console.log(data);
// console.log(data[0].lat)
// console.log(data[0].lon)
// });



var cCity=[];
function find(c){
    for (var i=0; i<cCity.length; i++){
        if(c.toUpperCase()===cCity[i]){
            return -1;
        }
    }
    return 1;
}


// Fetch some data
function weatherNow() {
var city = document.getElementById('searchCity').value
fetch("https://api.openweathermap.org/data/3.0/weather?q=" + city + "&appid=" + apiKey)


.then(res => res.json())
.then(data => {
    console.log(data)
    saveSearchToLocalStorage(city)
})
.catch(err => {
    console.log(err)
})
}

var searchButton = document.getElementById('searchButton')
searchButton.addEventListener("click", weatherNow)

function saveSearchToLocalStorage(city) {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []

    searchHistory.push(city)

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))

    var historyList = document.getElementById('history-list')
    for (let index = 0; index < searchHistory.length; index++) {
        var item = document.createElement('p')
        item.innerHTML = searchHistory[index]
        
        historyList.appendChild(item)
    }
}


function currentWeatherNow(city) {
    $.ajax({
        url:`https://api.openweathermap.org/data/3.0/onecall?q=${city}&appid=${apiKey}`,
        method:"GET"
    }).then(function(response) {
        console.log(response); 
        // You can use the response data here to update the current weather information on the page
    });
}





$("#clear-history").on("click", function (event) {
    localStorage.clear();
  })

console.log(localStorage)


// "icon": "10d"
// {"coord":{"lon":10.99,"lat":44.34},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"base":"stations","main":{"temp":275.49,"feels_like":275.49,"temp_min":271.56,"temp_max":278.19,"pressure":1023,"humidity":87,"sea_level":1023,"grnd_level":933},"visibility":10000,"wind":{"speed":0.4,"deg":262,"gust":0.66},"clouds":{"all":55},"dt":1673669458,"sys":{"type":2,"id":2004688,"country":"IT","sunrise":1673678954,"sunset":1673712012},"timezone":3600,"id":3163858,"name":"Zocca","cod":200}

// var weatherIcon = 
// var IconUrl

//Display that data

//When I click on the button I want to see relevant data




