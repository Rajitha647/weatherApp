import { useState, useEffect } from 'react';
import './weather.css';
import search from './images/search.jpg';
import clear from './images/clear.png';
import cloud from './images/cloud.png';
import drizzle from './images/drizzle.png';
import humidityIcon from './images/humidity.png';
import rain from './images/rain.png';
import snow from './images/snow.png';
import windIcon from './images/wind.png';

function WeatherApp() {
    const [location, setLocation] = useState("kakkanad");
    const [input, setInput] = useState("");
    const [weatherdata, setWeatherdata] = useState(null);

    const fetchWeatherData = async (location) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`);
            const result = await response.json();
            if (result.cod === 200) {
                setWeatherdata(result);
            } else {
                alert("Location not found. Please enter a valid location.");
                setWeatherdata(null); // Clear previous data if location is invalid
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchWeatherData(location);
    }, [location]);

    const handleSearchClick = () => {
        if (input) {
            setLocation(input);
        }
    };

    const weatherIcons = {
        Clear: clear,
        Clouds: cloud,
        Drizzle: drizzle,
        Rain: rain,
        Snow: snow,
        Thunderstorm: rain,
        Mist: drizzle,
    };

    return (
        <div className="contain">
            <div className="search">
                <input type="text" placeholder="enter location"
                    value={input}
                    onChange={(e) => { setInput(e.target.value) }} />
                <img src={search} onClick={handleSearchClick} alt="Search Icon" />
            </div>
            {weatherdata && (
                <>   <div className='weathericon'>
                    <img src={weatherIcons[weatherdata.weather[0].main] || clear} alt="Weather Icon" className="weatherIcon" />
                    <p className="temp">{weatherdata.main.temp}°C</p>
                    </div>
                    <p className="location">{weatherdata.name}</p>
                   
                    <div className="row">
                        <div className="col">
                            <img src={humidityIcon} alt="Humidity Icon" />
                            <div>
                                <p>{weatherdata.main.humidity} %</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={windIcon} alt="Wind Icon" />
                            <div>
                                <p>{weatherdata.wind.speed} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default WeatherApp;
