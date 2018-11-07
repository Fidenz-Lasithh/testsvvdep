import React from 'react';
import { Subscribe } from 'unstated';

import UserContainer from '../../containers/user.container';
import SignIn from './sign-in';;

const SignInComponent = () => {
  return (
    <Subscribe to={[UserContainer]}>
      {user => (
        <SignIn userContainer={user} />
      )}
    </Subscribe>
  )
}

export default SignInComponent;