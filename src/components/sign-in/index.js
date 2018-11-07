import React, { Component } from 'react';

class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.userContainer.signIn();
  }

  render() {
    return (
      <div>
        sign in module.
      </div>
    )
  }
}

export default SignIn;