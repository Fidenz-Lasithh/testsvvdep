import axios from 'axios';

import LocalStorageUtil from '../utils/local-storage';

import CONFIG from '../config.json';

const APIHandler = axios.create({
  baseURL: CONFIG.HOST,
  headers: {
    'Content-Type': 'application/json',
    'Token': LocalStorageUtil.read('token'),
  },
});

/**
 * A helper to handle errors when using async await
 *
 * @param {Object} promise Promise to be resolved
 */
const to = (promise) => {
  return promise.then(data => {
    return [null, data];
  })
  .catch(err => {
    console.log(err)
    return [err.response];
  } );
};

export { APIHandler, to };
