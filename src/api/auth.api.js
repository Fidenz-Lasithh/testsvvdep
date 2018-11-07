import { APIHandler } from './api-handler';

const signIn = () => {
  return APIHandler.get('/request?foo=bar&foo=baz');
};

export {
  signIn,
}
