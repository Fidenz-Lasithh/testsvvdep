import axios from 'axios';

import LocalStorageUtil from '../utils/local-storage';

import CONFIG from '../config.json';

const handler = axios.create({
  baseURL: CONFIG.HOST,
  headers: {
    'Content-Type': 'application/json',
    'Token': LocalStorageUtil.read('token'),
  },
});

export default handler;
