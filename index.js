//Feature 1
let weekDay = document.querySelector("#day-of-the-week");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = new Date();
let hour = today.getHours();
let minutes = today.getMinutes();
let day = today.getDay();
weekDay.innerHTML = `${days[day]} ${hour}:${minutes}`;

//Feature 2
function searchCity(city) {
  let apiKey = "537c3d37c769caaf570d888c9dbdd727";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(getTempAndInfo);
}
function getTempAndInfo(response) {
  let temp = response.data.main.temp;
  let wind = response.data.wind.speed;
  let humid = response.data.main.humidity;
  let description = response.data.weather[0].main;
  let ctemp = document.querySelector("#temp");
  ctemp.innerHTML = Math.round(temp);
  let cwind = document.querySelector("#wind");
  cwind.innerHTML = `Wind ${Math.round(wind)}km/h`;
  let chumid = document.querySelector("#humidity");
  chumid.innerHTML = `Humidity ${humid}% `;
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.name;
  let cdescription = document.querySelector("#description");
  cdescription.innerHTML = description;
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCity);

//Feature 3
function toF(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let temperature = temp.innerHTML;
  let symbolF = document.querySelector("#symbol");
  let newTemp = Math.round((temperature * 9) / 5 + 32);
  symbolF.innerHTML = "°F";
  temp.innerHTML = newTemp;
}
function toC(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let temperature = temp.innerHTML;
  let symbolC = document.querySelector("#symbol");
  let newTemp = Math.round(((temperature - 32) * 5) / 9);
  symbolC.innerHTML = "°C";
  temp.innerHTML = newTemp;
}
let celcius = document.querySelector("#c");
celcius.addEventListener("click", toC);
let fahrenheit = document.querySelector("#f");
fahrenheit.addEventListener("click", toF);

//Curent
let button = document.querySelector("#current");
function changeInfo(response) {
  let temp = response.data.main.temp;
  let wind = response.data.wind.speed;
  let humid = response.data.main.humidity;
  let description = response.data.weather[0].main;
  let ctemp = document.querySelector("#temp");
  ctemp.innerHTML = Math.round(temp);
  let cwind = document.querySelector("#wind");
  cwind.innerHTML = `Wind ${Math.round(wind)}km/h`;
  let chumid = document.querySelector("#humidity");
  chumid.innerHTML = `Humidity ${humid}% `;
  let place = response.data.name;
  let city = document.querySelector("#current-city");
  city.innerHTML = place;
  let cdescription = document.querySelector("#description");
  cdescription.innerHTML = description;
}
function getTempInfoCurrent(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "537c3d37c769caaf570d888c9dbdd727";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(changeInfo);
}
function getGeo(event) {
  navigator.geolocation.getCurrentPosition(getTempInfoCurrent);
}
button.addEventListener("click", getGeo);

// Default
searchCity("Mexico City");
