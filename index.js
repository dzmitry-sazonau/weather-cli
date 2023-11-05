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

const initCLI = () => {
  const args = getArgs(process.argv)

  if (args.h) {
    printHelp()
  }

  if (args.s) {

  }

  if (args.t) {
    saveToken(args.t)
  }
}

initCLI();

getWeather('warsaw')