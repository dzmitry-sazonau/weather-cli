import {DICTIONARY, getKeyValue} from "./storage.service.js";
import axios from "axios";
import {printError} from "./log.service.js";

const getToken = async () => {
  const token = await getKeyValue(DICTIONARY.token);

  if (!token) {
    throw new Error('Не задан ключ API, задайте есть через команду -t [API_KEY]')
  }

  return token
}

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

export const getCoordinate = async (city) => {
  const token = await getToken();

  const { data } =  await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
    params: {
      q: city,
      appid: token
    }
  })

  if (!data.length) {
    return {
      lat: undefined,
      lon: undefined
    }
  }

  return {
    lat: data[0].lat,
    lon: data[0].lon
  }
}