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
        // getWeatherData(city);
        // displayForecast(city);
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
            getWeatherForecast(city)
            // getWeatherData(city)
            .then(updateWeatherInfo)
            .then(() => saveSearchToLocalStorage(city))
            // .then(() => displayForecast(city))
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
    let temperatureInCelsius = data.main.temp - 273.15;
    $("#temperature").html(" " + temperatureInCelsius + "°C");
    let windSpeed = data.wind.speed;
    $("#wind-speed").html(" " + windSpeed + " m/s");
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
            const weather = forecast.weather[0].description;

            forecastHTML += `<div>
                <div class="col-sm-2 border border-dark forecast ml-2 mb-3 p-2 mt-2 rounded" style="background-color: rgb(160, 162, 87);">
                <p id="fDate0>${date.toLocaleDateString()}</p>
                <p id="fImg0"></p>
                <p>Temp:<span id="fTemp0">${temp}</span></p>
                <p>Wind:<span id="fWind0">${weather}</span></p>
                <p>Humidity:<span id="fHumidity0">${temp}</span></p>
            </div>
            </div>`;
        }
        document.querySelector('.forecast-container').innerHTML = forecastHTML
    })
    .catch(err => console.log(err))
}
getWeatherForecast()





function saveSearchToLocalStorage(city) {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
    searchHistory.push(city)
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
    var historyList = $('#history-list')
    historyList.append(`<p>${city}</p>`)
}


$("#searchButton").on("click", displayWeather);
$("#clear-history").on("click", function (event) {
    localStorage.clear();
  })

console.log(localStorage)  