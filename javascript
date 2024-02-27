// app.js

const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
const weatherInfoElement = document.getElementById('weatherInfo');

async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();

    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeatherInfo(data);
        } else {
            showError(data.message);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError('An error occurred while fetching weather data.');
    }
}

function displayWeatherInfo(data) {
    const { name, sys, main, weather } = data;

    const weatherInfoHTML = `
        <h2>${name}, ${sys.country}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
    `;

    weatherInfoElement.innerHTML = weatherInfoHTML;
}

function showError(message) {
    weatherInfoElement.innerHTML = `<p style="color: red;">Error: ${message}</p>`;
}
