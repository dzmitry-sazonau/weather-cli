#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import {printError, printHelp, printSuccess, printWeather} from "./services/log.service.js";
import { DICTIONARY, saveKeyValue } from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";
import { getCity } from "./services/data.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан токен')
    return;
  }

  try {
    await saveKeyValue(DICTIONARY.token, token)
    printSuccess('Токен сохранен')
  } catch (error) {
    printError(error.message)
  }
}


const saveCity = async (city) => {
  if (!city.length) {
    printError('Не передан город')
    return;
  }

  try {
    await saveKeyValue(DICTIONARY.city, city)
    printSuccess('Город сохранен')
  } catch (error) {
    printError(error.message)
  }

}

const getForecast = async () => {
  try {
    const city = await getCity()
    const weather = await getWeather(city);

    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (error) {
    if (error?.response?.status === 404 || error?.response?.status === 400) {
      printError('Неверно указан город')
    } else if (error?.response?.status === 401) {
      printError('Неверно указан токен')
    } else {
      printError(error.message)
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }

  if (args.s) {
    return saveCity(args.s);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  return getForecast();
}

initCLI();
