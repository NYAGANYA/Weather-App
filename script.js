const apiKEY = "9fec847c53bc4132b54e2d8848e42843";

const weatherData = document.getElementById("weather-data");
const city = document.getElementById("city-input");
const form = document.querySelector("form");
const detailsEl = document.querySelector(".details");
const btn = document.getElementById("btn");
const paragraph = document.createElement("em");


form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const cityValue = city.value;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue){

    try {
         weatherData.style.display = "none";
         paragraph.style.display = "none";

    btn.value = "Searching...."
    const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKEY}&units=metric`);


    
     if(!cityValue){
        paragraph.style.display = "block";
         btn.value = "Get Weather ";
        throw new Error("City name is required!");
    }

    if(!response.ok){
        paragraph.style.display = "block";
         btn.value = "Get Weather ";
        throw new Error("An error occurred, please try again!");
    }

    const data = await response.json();

    console.log(data)

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const details = [
        `Feels like: ${Math.round(data.main.feels_like)}`,
        `Humidity: ${data.main.humidity}`,
        `Wind speed: ${data.wind.speed}`
    ]

    weatherData.style.display = "block";

    weatherData.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`
    weatherData.querySelector(".temperature").textContent = `${temperature}°C`;
    weatherData.querySelector(".description").textContent = `${description}`;

    detailsEl.querySelector(".min-details1").textContent = `${details[0]}°`;
    detailsEl.querySelector(".min-details2").textContent = `${details[1]}%`;
    detailsEl.querySelector(".min-details3").textContent = `${details[2]} m/s`;

    btn.value = "Get Weather ";
    } catch (error) {
        paragraph.textContent = error;
        form.appendChild(paragraph);
    }

}