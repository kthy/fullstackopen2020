import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ country, capital }) => {
  const [ weather, setWeather ] = useState({
    "temperature": "",
    "weather_descriptions": "",
    "weather_icons": "",
    "wind_dir": "",
    "wind_speed": "0",
  })

  const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY
  const q = `${capital},%20${country}`
  const hook = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${q}&units=m`)
      .then(response => setWeather(response.data.current))
  }
  useEffect(hook, [])

  return (
    <>
      <h3>Weather in {capital}</h3>
      <div><strong>temperature:</strong> {weather.temperature}°C</div>
      <img width="128px" src={weather.weather_icons} alt={weather.weather_descriptions} />
      <div><strong>wind: </strong> {(parseInt(weather.wind_speed, 10)/3.6).toFixed(1)} m/s direction {weather.wind_dir}</div>
    </>
  )
}

export default Weather
