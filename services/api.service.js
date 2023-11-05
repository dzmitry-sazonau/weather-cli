import axios from "axios";
import {getToken} from "./data.service.js";

export const getWeather = async (city) => {
  const token = await getToken();
  const { lat, lon } = await getCoordinate(city);

  const { data } =  await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat,
      lon,
      appid: token,
      lang: 'ru',
      units: 'metric'
    }
  })

  return data;
}

export const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case '01':
      return '☀️';
    case '02':
      return '🌤️';
    case '03':
      return '☁️';
    case '04':
      return '☁️';
    case '09':
      return '🌧️';
    case '10':
      return '🌦️';
    case '11':
      return '🌩️';
    case '13':
      return '❄️';
    case '50':
      return '🌫️';
  }
};

const getCoordinate = async (city) => {
  const token = await getToken();

  const { data } =  await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
    params: {
      q: city,
      appid: token
    }
  })

  if (!data.length) {
    throw new Error('Неверно указан город')
  }

  return {
    lat: data[0].lat,
    lon: data[0].lon
  }
}