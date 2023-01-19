// API key
var apiKey = "84451525b0d6082d8cc3aa7f5d04ae49";
var searchCity = $("#searchCity");
var clearHistory = $("#clear-history");
var currentWeather = $("#current-weather");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentWindSpeed = $("#wind-speed");
var currentHumidity = $("#humidity");
let city = "";


function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        weatherNow(city);
    }
}

// Fetch some data
function weatherNow(city) {
fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey)
.then(res => res.json())
.then(data => {
    console.log(data)
    var city = data.name;
    $("#current-city").html(city);
    saveSearchToLocalStorage(city)
})
.catch(error => {
    $("#error-message").html("Error: " + error.message);
    $("#error-message").show();
})
}

function getWeatherData(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(response => response.json());
  }
  
function updateWeatherInfo(data) {
    let iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
    var date=new Date(data.dt*1000).toLocaleDateString();
    $("#current-city").html(data.name + " " + "("+date+")");
    $("#current-city").append("<img src='" + iconUrl + "'>");
    let today = new Date();
    let day = today.toLocaleDateString();
    let temperatureInCelsius = data.main.temp - 273.15;
    $("#temperature").html(" " + temperatureInCelsius + "°C");
    let windSpeed = data.wind.speed;
    $("#wind-speed").html(" " + windSpeed + " m/s");
    let humidity = data.main.humidity;
    $("#humidity").html(" " + humidity + " %");
}


function weatherNow(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey)
    .then(res => res.json())
    .then(data => {
        updateWeatherInfo(data);
        saveSearchToLocalStorage(city)
    })
    .catch(error => {
        $("#error-message").html("Error: " + error.message);
        $("#error-message").show();
    })
}

function displayWeather(event) {
    event.preventDefault();
    if (searchCity.val().trim() !== "") {
      city = searchCity.val().trim();
      getWeatherData(city)
        .then(updateWeatherInfo)
        .then(() => saveSearchToLocalStorage(city))
        .catch(error => {
          $("#error-message").html("Error: " + error.message);
          $("#error-message").show();
        });
    }
  }
  
function convertTemperature(temp, unit) {
    if (unit === "C") {
      return temp - 273.15;
    } else if (unit === "F") {
      return (temp - 273.15) * 9/5 + 32;
    }
  }
  
function updateForecastInfo(data) {
    $("#fDate0").html(data.date);
    let iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
    let icon = $("<img>").attr("src", iconUrl);
    $("#fImg0").append(icon);
    let temperatureInCelsius = data.main.temp - 273.15;
    $("#fTemp0").html(temperatureInCelsius + "°C");
    let windSpeed = data.wind.speed;
    $("#fWind0").html(windSpeed + " m/s");
    let humidity = data.main.humidity;
    $("#fHumidity0").html(humidity + " %");
}


$("#searchButton").on("click", displayWeather);



function saveSearchToLocalStorage(city) {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
    searchHistory.push(city)
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
    var historyList = $('#history-list')
    historyList.append(`<p>${city}</p>`)
}


$("#clear-history").on("click", function (event) {
    localStorage.clear();
  })

console.log(localStorage) 





// "icon": "10d"
// {"coord":{"lon":10.99,"lat":44.34},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"base":"stations","main":{"temp":275.49,"feels_like":275.49,"temp_min":271.56,"temp_max":278.19,"pressure":1023,"humidity":87,"sea_level":1023,"grnd_level":933},"visibility":10000,"wind":{"speed":0.4,"deg":262,"gust":0.66},"clouds":{"all":55},"dt":1673669458,"sys":{"type":2,"id":2004688,"country":"IT","sunrise":1673678954,"sunset":1673712012},"timezone":3600,"id":3163858,"name":"Zocca","cod":200}

// var weatherIcon = 
// var IconUrl






