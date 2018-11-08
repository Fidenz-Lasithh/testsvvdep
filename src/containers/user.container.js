import { Container } from 'unstated';

import { signIn } from '../api/auth.api';

class UserContainer extends Container {
  state = {
    user: null,
  };

  signIn = async () => {
    try {
      const res = await signIn();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserContainer;
