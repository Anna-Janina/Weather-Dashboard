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
        displayForecast(city);
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

  function getWeatherForecast() {
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
/////////////////////////////////////////
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


function convertTemperature(temp, unit) {
    if (unit === "C") {
      return temp - 273.15;
    } else if (unit === "F") {
      return (temp - 273.15) * 9/5 + 32;
    }
  }
 
  
function getForecastData(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
      .then(response => response.json());
}

function displayForecast(city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey)
        .then(res => res.json())
        .then(data => {
            updateForecastInfo(data);
        })
        .catch(error => {
            $("#error-message").html("Error: " + error.message);
            $("#error-message").show();
        });
}

function displayForecast(event) {
    event.preventDefault();
    if (searchCity.val().trim() !== "") {
        city = searchCity.val().trim();
        getForecastData(city)
            .then(updateForecastInfo)
            .catch(error => {
                $("#error-message").html("Error: " + error.message);
                $("#error-message").show();
            });
    }
}

function getForecastData(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
        .then(response => response.json());
}



function updateForecastInfo(data) {
    let forecastData = data.list;

    for(let i = 0; i < forecastData.length; i++) {
        // Get the date and time of the forecast
        let forecastTime = forecastData[i].dt_txt;
        let forecastDate = new Date(forecastTime);

        // Only display forecasts for 15:00 (3:00 PM)
        if(forecastDate.getUTCHours() === 15) {
            let forecastIndex = i;
            let fDate = forecastData[forecastIndex].dt_txt;
            let fImg = "http://openweathermap.org/img/w/" + forecastData[forecastIndex].weather[0].icon + ".png";
            let fTemp = forecastData[forecastIndex].main.temp - 273.15;
            let fWind = forecastData[forecastIndex].wind.speed;
            let fHumidity = forecastData[forecastIndex].main.humidity;

            // Display the forecast information
            $("#fDate" + i).html(fDate);
            $("#fImg" + i).html("<img src='" + fImg + "'>");
            $("#fTemp" + i).html(" " + fTemp + "°C");
            $("#fWind" + i).html(" " + fWind + " m/s");
            $("#fHumidity" + i).html(" " + fHumidity + " %");
        }
    }
}





function displayWeather(event) {
    event.preventDefault();
    if (searchCity.val().trim() !== "") {
      city = searchCity.val().trim();
      getWeatherData(city)
        .then(updateWeatherInfo)
        .then(() => saveSearchToLocalStorage(city))
        .then(() => displayForecast(city))
        .catch(error => {
          $("#error-message").html("Error: " + error.message);
          $("#error-message").show();
        });
    }
  }









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


// "icon": "10d"
// {"coord":{"lon":10.99,"lat":44.34},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"base":"stations","main":{"temp":275.49,"feels_like":275.49,"temp_min":271.56,"temp_max":278.19,"pressure":1023,"humidity":87,"sea_level":1023,"grnd_level":933},"visibility":10000,"wind":{"speed":0.4,"deg":262,"gust":0.66},"clouds":{"all":55},"dt":1673669458,"sys":{"type":2,"id":2004688,"country":"IT","sunrise":1673678954,"sunset":1673712012},"timezone":3600,"id":3163858,"name":"Zocca","cod":200}






