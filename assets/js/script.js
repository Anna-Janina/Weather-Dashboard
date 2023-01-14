// API key
var apiKey = '84451525b0d6082d8cc3aa7f5d04ae49';
// var searchButton = $("#searchButton");
var searchCity = $("#searchCity");
var clearHistory = $("#clear-history");
var currentWeather = $("#current-weather");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentWindSpeed = $("#wind-speed");
var currentHumidity = $("#humidity");
var weatherNowURL = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}';




//Fetch some data
function weatherNow() {
var city = document.getElementById('searchCity').value
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
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

// "icon": "10d"


// var weatherIcon = 
// var IconUrl

//Display that data

//When I click on the button I want to see relevant data




