let weather = {
  // We set the APiKey here
  apiKey: "f4a15aa7507a13908374cae134d23cfa",
  // we create a function which passes the city parameter
  fetchWeather: function (city) {
    // IN this case we are fetchiong data from the api
    fetch(
      // we set the url we'll make the request from
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      //Use city to call the certain city user searches
        city +
        // we use the units and metrics such as celsius and wind speed
        "&units=metric&appid=" +
        this.apiKey
    )
    // Error handling in case the user inputs wrong option
      .then((response) => {
        if (!response.ok) {
          // Throw Error to user mishandling app
          alert("Error Has Occurred.");
          throw new Error("Something has gone wrong.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  // we now pass the data paarmeter  
  displayWeather: function (data) {

    // Here we set the const for the objects we will be using
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    
    // Using a query we are able to set the returns according to the text fields 
// Query for the city is used which then displays
    document.querySelector(".city").innerText = "Climate in: " + name;

  // Query sets an icon according to the climate or weather of the city
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";

      // Query sets a description fetched from the API
    document.querySelector(".description").innerText = description;

    // Query here allows to return a temperature form the searched city
    document.querySelector(".temp").innerText = temp + "°C";
    
    //Also queries for humidity and wind speed for chosen city
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind velocity: " + speed + " km/h";
      
      //Loading background image for entire web app
    document.querySelector(".weather").classList.remove("Processing");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  // Search function which fetches takes in the search bar values
  search: function () {
    this.fetchWeather(document.querySelector(".search-barHolder").value);
  },
};
// we set the search button to query through the api
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// finally we set the enter key as a return button when a city is inputted
document.querySelector(".search-barHolder").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Miami");
