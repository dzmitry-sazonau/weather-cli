#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import {printError, printHelp, printSuccess} from "./services/log.service.js";
import {DICTIONARY, getKeyValue, saveKeyValue} from "./services/storage.service.js";
import {getCoordinate, getWeather} from "./services/api.service.js";

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

const getForecast = async () => {
  try {
    const weather = await getWeather('asdasdasdasds');
    console.log(weather);
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
  const args = getArgs(process.argv)

  if (args.h) {
    printHelp()
  }

  if (args.s) {

  }

  if (args.t) {
    return saveToken(args.t)
  }

  getForecast()
}

initCLI();
