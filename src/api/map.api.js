import { APIHandler, to } from './api-handler';

const getData = async (component) => {
  let err, res;
  switch (component) {
    case 'weather': {
      [err, res] = await to(APIHandler.get('/api/v1/data/stations/weather'));
      break;
    }
    case 'traffic': {
      [err, res] = await to(APIHandler.get('/api/v1/data/stations/traffic'));
      break;
    }
    default: {
      throw new Error('Invalid request');
    }
  };

  if (err) return [err, res];
  return [null, res.data];
};

const getWeatherStationData = async (stationName) => {
  let err, res;

  [err, res] = await to(APIHandler.get(`/api/v1/data/weather/${stationName}`));

  if (err) return [err, res];
  return [null, res.data];
}

const getTrafficStationData = async (stationName, dateFrom, dateTo, parameter) => {
  let err, res;

  console.log(stationName, dateFrom, dateTo, parameter);
  [err, res] = await to(APIHandler.get(`/api/v1/data/traffic/${stationName}?dateFrom=${dateFrom}&dateTo=${dateTo}&param=${parameter}`));
  
  if (err) return [err, res];
  return [null, res.data];
}

export { getData, getWeatherStationData, getTrafficStationData };