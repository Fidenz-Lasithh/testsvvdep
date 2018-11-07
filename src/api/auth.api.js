import APIhandler from './api-handler';

const signIn = () => {
  return APIhandler.get('/request?foo=bar&foo=baz');
};

export {
  signIn,
}
