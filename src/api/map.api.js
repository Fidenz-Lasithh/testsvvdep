import { APIHandler, to } from './api-handler';

const getData = async () => {
  let err, res;
  [err, res] = await to(APIHandler.get('/request?foo=bar&foo=baz'));

  if (err) return [err, res];
  return [null, res];
};

export { getData };