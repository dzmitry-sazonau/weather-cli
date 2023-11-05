import {DICTIONARY, getKeyValue} from "./storage.service.js";

export const getToken = async () => {
  const token = await getKeyValue(DICTIONARY.token);

  if (!token) {
    throw new Error('Не задан ключ API, задайте есть через команду -t [API_KEY]')
  }

  return token
}

export const getCity = async () => {
  const city = await getKeyValue(DICTIONARY.city);

  if (!city) {
    throw new Error('Не задан город, задайте есть через команду -s [CITY]')
  }

  return city
}