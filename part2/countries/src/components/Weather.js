import axios from 'axios';
import { useEffect, useState } from 'react';
const Weather = ({country}) =>{
    
    const [weatherData,setWeatherData] = useState(undefined);
    const api_key = process.env.REACT_APP_API_KEY;
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${api_key}`)
            .then(response =>{
                setWeatherData(response.data);
            })
            .catch((reason) => {
                console.log(reason);
            });

    },[]);

    if(weatherData === undefined)
        return(<p>Could not connect to weather server</p>);
    else
        return(
            <>
                <p>Temperature: {weatherData.current.temp} celsius</p>
                <p>Wind speed: {weatherData.current.wind_speed}</p>      
            </>
        );
};

export default Weather;