// Date Function
let theDate = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
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

  let currentWeekDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDay = date.getDate();
  let currentYear = date.getFullYear();
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let currentDate = document.querySelector("h2");
  currentDate.innerHTML = `${currentWeekDay}, ${currentMonth} ${currentDay} ${currentYear} | ${currentHour}:${currentMinutes}`;

  return currentDate;
}

formatDate(theDate);


//Open Weather API App Functions

//Handle searched city
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "e744bfafcb3c1411c3f393198d753e28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

//Update weather display
function showWeather(response) {
  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#main-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  document.querySelector("#main-icon").setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`)


}


//Current location
function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "e744bfafcb3c1411c3f393198d753e28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

//Event listeners
let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Leeds");
