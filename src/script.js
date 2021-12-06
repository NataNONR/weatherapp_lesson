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

function showResult(response) {
  console.log(response);
  document.querySelector("#city-line").innerHTML = response.data.name;

  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;

  document.querySelector("#wind-speed").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;

  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
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
