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
