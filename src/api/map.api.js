import { APIHandler, to } from './api-handler';

const getData = async (component) => {
  let err, res;
  switch (component) {
    case 'weather': {
      [err, res] = await to(APIHandler.get('/api/v1/data/weather'));
      break;
    }
    case 'traffic': {
      [err, res] = await to(APIHandler.get('/api/v1/data/traffic'));
      break;
    }
    default: {
      throw new Error('Invalid request');
    }
  };

  if (err) return [err, res];
  return [null, res.data];
};

export { getData };