document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "00d3dfa86b516a0b893e4e8c422fa204"; // Replace with your API key

    const weatherInfo = document.getElementsByClassName(".card");
    const searchBtn = document.getElementById("searchBtn");
    const weatherIcon = document.getElementById("weather-icon");

    // Function to fetch weather data and display it
    function fetchWeather(location, unit) {
        // Make an AJAX request to the OpenWeatherMap API
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${unit}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.cod === 200) {

                    // Extract data from fetch data
                    const temperature = data.main.temp;
                    const humidity = data.main.humidity;
                    const windSpeed = data.wind.speed;
                    const description = data.weather[0].main;
                    const cityName = data.name;


                    // Display the extracted data
                    document.querySelector(".city").innerHTML = cityName;
                    document.querySelector(".temp").innerHTML = temperature;
                    document.querySelector(".weatherdesc").innerHTML = description;
                    document.querySelector(".humidity").innerHTML = humidity + " %";
                    document.querySelector(".wind").innerHTML = windSpeed + " km/h";

                    // Change the image as per weather
                    if (description == "Clouds") {
                        weatherIcon.setAttribute("src", "images/clouds.png");
                    }
                    else if (description == "Clear") {
                        weatherIcon.setAttribute("src", "images/clear.png");
                    }
                    else if (description == "Rain") {
                        weatherIcon.setAttribute("src", "images/rain.png");
                    }
                    else if (description == "Drizzle") {
                        weatherIcon.setAttribute("src", "images/drizzle.png");
                    }
                    else if (description == "Mist") {
                        weatherIcon.setAttribute("src", "images/mist.png");
                    }
                    else if (description == "Haze") {
                        weatherIcon.setAttribute("src", "images/haze.png");
                    }

                    document.querySelector(".weather").style.display = "block";
                    document.querySelector(".error").style.display = "none";


                } else {
                    document.querySelector(".error").style.display = "block"
                    document.querySelector(".weather").style.display = "none"
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                weatherInfo.innerHTML = "<p>An error occurred. Please try again later.</p>";
            });
    }

    // Event listener for the search button click
    searchBtn.addEventListener("click", () => {
        const location = document.getElementById("location").value;
        if (location.trim() === "") {
            alert("Please enter a location.");
            return;
        }

        const unit = document.querySelector('input[name="unit"]:checked').value;


        // Call the fetchWeather function with the location and unit
        fetchWeather(location, unit);
    });


});