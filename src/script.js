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

function showForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastCode = `<div class="row">`;

  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI"];
  days.forEach(function (day) {
    forecastCode =
      forecastCode +
      `<div class="col-2">
              ${day}
              <br />
              <img
                src="https://openweathermap.org/img/wn/03n@2x.png"
                alt="scattered clouds"
                id="forecast-icon"
                width="46"
              />
              <br />
              <span class="min-max">-4° 6°</span>
            </div>`;
  });

  forecastCode = forecastCode + `</div>`;
  forecastElement.innerHTML = forecastCode;
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

  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
function showFahrenheit(event) {
  event.preventDefault();
  let baseTemperature = document.querySelector("#temp");
  let fahrenheitTemp = (celsiusDegree * 9) / 5 + 32;

  cUnit.classList.remove("opened");
  fUnit.classList.add("opened");

  baseTemperature.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsius(event) {
  event.preventDefault();
  let baseTemperature = document.querySelector("#temp");

  cUnit.classList.add("opened");
  fUnit.classList.remove("opened");

  baseTemperature.innerHTML = Math.round(celsiusDegree);
}

showForecast();

let celsiusDegree = null;

let fUnit = document.querySelector("#fahrenheit");
let cUnit = document.querySelector("#celsius");
fUnit.addEventListener("click", showFahrenheit);
cUnit.addEventListener("click", showCelsius);
