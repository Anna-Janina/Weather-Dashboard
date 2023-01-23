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
            weatherNow(city);
            saveSearchToLocalStorage(city);
            getWeatherForecast(city);
            createHistoryButton(city)
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


function updateWeatherInfo(data) {
    let iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
    var date=new Date(data.dt*1000).toLocaleDateString();
    $("#current-city").html(data.name + " " + "("+date+")");
    $("#current-city").append("<img src='" + iconUrl + "'>");
    let today = new Date();
    let day = today.toLocaleDateString();
    let temperatureInCelsius = (data.main.temp - 273.15).toFixed(1);
    $("#temperature").html(" " + temperatureInCelsius + "°C");
    let windSpeed = data.wind.speed;
    $("#wind-speed").html(" " + windSpeed + " MPH");
    let humidity = data.main.humidity;
    $("#humidity").html(" " + humidity + " %");
}


function getWeatherForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        const forecastData = data.list
        let forecastHTML = '';
        for (let i = 0; i < forecastData.length; i += 8) {
            const forecast = forecastData[i]
            const date = new Date(forecast.dt * 1000)
            const temp = forecast.main.temp;
            const wind = forecast.wind.speed;
            const icon = forecast.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
                 forecastHTML += `<div class="col-sm-2 border border-dark forecast ml-2 mb-3 p-2 mt-2 rounded" style="background-color: rgb(160, 162, 87);">
                 <p>${date.toLocaleDateString()}</p>
                 <img src="${iconUrl}">
                 <p>Temp: ${convertTemperature(temp, "C").toFixed(1)}°C</p>

                 <p>Wind: ${wind}MPH</p>
                 <p>Humidity: ${forecast.main.humidity}%</p>
                 </div>`;
        }
        $(".forecast-container").html(forecastHTML);
    })
}


function saveSearchToLocalStorage(city) {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
    searchHistory.push(city)
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
    var historyList = $('#history-list')
    historyList.append(`<p>${city}</p>`)
}


function createHistoryButton(city) {
    var historyContainer = document.getElementById("history-container");
    var newButton = document.createElement("button");
    newButton.classList.add("btn", "btn-secondary", "history-button");
    newButton.innerHTML = city;
    newButton.addEventListener("click", function() {
        weatherNow(city);
        getWeatherForecast(city);
    });
    historyContainer.appendChild(newButton);
}


fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey)
    .then(res => res.json())
    .then(data => {
        updateWeatherInfo(data);
        createHistoryButton(city);
    })


$(document).ready(function() {
    let previousSearches = JSON.parse(localStorage.getItem("searches")) || [];
    previousSearches.forEach(createHistoryButton);
});


function saveSearchToLocalStorage(city) {
    localStorage.setItem(city, city);
  }


$(document).ready(function() {
    let previousSearches = JSON.parse(localStorage.getItem("searches")) || [];
    previousSearches.forEach(createHistoryButton);
});


clearHistory.on("click", function(){
    localStorage.clear();
});


$("#clear-history").on("click", clearHistory);

$("#searchButton").on("click", displayWeather); 