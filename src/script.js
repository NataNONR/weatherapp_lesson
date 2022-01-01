function formatTime() {
  let now = new Date();
  let dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let monthOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let showDay = dayOfWeek[now.getDay()];
  let showMonth = monthOfYear[now.getMonth()];

  return `${showDay}, ${now.getDate()} ${showMonth} ${now.getHours()}:${now.getMinutes()}`;
}
let dateLine = document.querySelector("#date");
dateLine.innerHTML = formatTime();

function forecastFormat(apiDay) {
  let date = new Date(apiDay * 1000);
  let day = date.getDay();
  let allDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return allDays[day];
}

function showForecast(response) {
  console.log(response);
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastCode = `<div class="row">`;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastCode =
        forecastCode +
        `<div class="col-2">
              ${forecastFormat(forecastDay.dt)}
              <br />
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="scattered clouds"
                id="forecast-icon"
                width="46"
              />
              <br />
              <span class="min-max"><img
          src="images/low therm.png"
          alt="low thermometer"
          id="thermometer"
          width="8px"
        />${Math.round(forecastDay.temp.min)}°  <img
          src="images/high therm.png"
          alt="high thermometer"
          id="thermometer"
          width="8px"
        />${Math.round(forecastDay.temp.max)}°</span>
            </div>`;
    }
  });

  forecastCode = forecastCode + `</div>`;
  forecastElement.innerHTML = forecastCode;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c4be51f5046646283f0c3e060fe5427e";
  let forecastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(forecastApi);
  axios.get(forecastApi).then(showForecast);
}

function showResult(response) {
  console.log(response);
  let iconElement = document.querySelector("#icon");

  document.querySelector("#city-line").innerHTML = response.data.name;

  celsiusDegree = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celsiusDegree);

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;

  document.querySelector("#wind-speed").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;

  document.querySelector("#min-temp").innerHTML = `Minimum: ${Math.round(
    response.data.main.temp_min
  )}°C`;

  document.querySelector("#max-temp").innerHTML = `Maximum: ${Math.round(
    response.data.main.temp_max
  )}°C`;

  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c4be51f5046646283f0c3e060fe5427e";
  let apiUrlAtLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`;
  axios.get(apiUrlAtLocation).then(showResult);
}

function searchCity(cityInput) {
  let apiKey = "c4be51f5046646283f0c3e060fe5427e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&APPID=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showResult);
}

function clickSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-box").value;
  searchCity(city);
}
let cityInput = document.querySelector("#search-bar");
cityInput.addEventListener("submit", clickSearch);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getLocation);

searchCity("Singapore");

//Units

function showCelsius(event) {
  event.preventDefault();
  let baseTemperature = document.querySelector("#temp");

  baseTemperature.innerHTML = Math.round(celsiusDegree);
}

let celsiusDegree = null;
