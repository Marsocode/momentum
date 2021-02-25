// jshint esversion:8

const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const windSpeed = document.querySelector('.wind-speed');
const windDir = document.querySelector('.wind-direction');
const weatherDesc = document.querySelector('.weather-description');

async function getWeatherDate() {
    try {
        const query = city.textContent;
        if (query != '[Enter City]' && query != '') {
            const apikey = '6f0ef649634923fc9c6b198669b39d7d';
            const units = 'metric';
            const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=' + units + '&appid=' + apikey;
            const res = await fetch(url);
            const data  = await res.json();
        
            if (res.statusCode === 404) {
                throw new Error();
            } 
            
            weatherIcon.className = 'weather-icon owf';
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
            weatherDesc.textContent = data.weather[0].description;
            pressure.textContent = `${(data.main.pressure *0.750062).toFixed(0)} mm Hg`;
            humidity.textContent = `${data.main.humidity.toFixed(0)}%`;
            windSpeed.textContent = `${data.wind.speed.toFixed(1)} m/s`;
            windDir.textContent = "";
            windDir.textContent = degString(parseInt(data.wind.deg));
        }
    } catch (e) {
        city.textContent = 'Wrong Name Of City';
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent = '';
        weatherDesc.textContent = '';
        pressure.textContent = '';
        humidity.textContent = '';
        windSpeed.textContent = '';
        windDir.textContent = '';
        console.log(e.stack);
    }
}

function getCity() {
    if (localStorage.getItem('city') === null) {
        localStorage.setItem('city', '[Enter City]');
        city.textContent = '[Enter City]';
    } else {
        city.textContent = localStorage.getItem('city');
    }
}

function setCity(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            if (city.textContent === '') city.textContent = localStorage.getItem('city');
            getWeatherDate();
            localStorage.setItem('city', e.target.textContent);
            city.blur();
        }
    } else {
        if (city.textContent === '') {
            if (localStorage.getItem('city') === null) {
                city.textContent = '[Enter City]';
            } else {
                city.textContent = localStorage.getItem('city');
            }
        }
        getWeatherDate();
        localStorage.setItem('city', e.target.textContent);
    }
}

city.addEventListener('keypress', setCity);
document.addEventListener('DOMContentLoaded', getWeatherDate);
city.addEventListener('blur', setCity);
city.addEventListener('click', function(e) {
    city.innerText = '';
});

getCity();

function degString(dir) {
    if (dir >= 0 && dir < 23) { 
        return 'N';
    } else if (dir >= 22.5 && dir < 67.5) {
        return  'NE';
    } else if (dir >= 67.5 && dir < 112.5)  {
        return 'E';
    } else if (dir >= 112.5 && dir < 157.5) {
        return 'SE';
    } else if (dir >= 157.5 && dir < 202.5) {
        return 'S';
    } else if (dir >= 202.5 && dir < 247.5) {
        return 'SW';
    } else if (dir >= 247.5 && dir < 292.5) {
        return 'W'; 
    }  else if (dir >= 292.5 && dir < 337.5) {
        return 'NW';
    }  else if (dir >= 337.5 && dir < 360) {
        return 'N';
    } else {
        return '';
    }
}