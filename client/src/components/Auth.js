import React, { Component } from 'react';
import auth0 from 'auth0-js';

class Auth extends Component {
  constructor() {
    super();
    this.state = { url: '' };
  }

  componentDidMount() {
    this.buildAuthorizeUrl();
  }

  buildAuthorizeUrl() {
    const auth = new auth0.Authentication({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
    });

    const config = {
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: 'openid',
      responseType: 'code',
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      state: Buffer.from(process.env.REACT_APP_SESSION_SECRET).toString('base64'),
      prompt: 'none',
    };

    const url = auth.buildAuthorizeUrl(config);
    this.setState({ url });
  }

  render() {
    const { url } = this.state;
    return (
      <div>
        <a href={url}>
          Authorize
        </a>
      </div>
    );
  }
}

export default Auth;
