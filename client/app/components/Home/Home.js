import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  setInStorage,
  getFromStorage,
} from '../../utils/storage';
import '../../styles/css/Home.css'
import Planner from '../Planner/Planner';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp() {
    // Grab state and inform user of occurence
    const {
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json',json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;

    if (isLoading) {
      return (
        <div className="loading">
          <h1>WELCOME</h1>
        </div>
      );
    }

    if (!token) {
      return (
        <div className="box">
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
          <h2>Log In</h2>
          <form>
            <div className="inputBox">
              <input
                type="text"
                name=""
                value={signInEmail}
                onChange={this.onTextboxChangeSignInEmail}
                required
              />
              <label>Email</label>
              <br />
            </div>
            <div className="inputBox">
              <input
                type="password"
                name=""
                value={signInPassword}
                onChange={this.onTextboxChangeSignInPassword}
                required
              />
              <label>Password</label>
              <br />
            </div>
            <button type="submit" onClick={this.onSignIn}>Sign In</button>
          </form>
          <br />
          <br />
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
          <h2>Create Account</h2>
          <form>
            <div className="inputBox">
              <input
                type="text"
                name=""
                value={signUpEmail}
                onChange={this.onTextboxChangeSignUpEmail}
                required
              />
              <label>Email</label>
              <br />
            </div>
            <div className="inputBox">
              <input
                type="password"
                name=""
                value={signUpPassword}
                onChange={this.onTextboxChangeSignUpPassword}
              />
              <label>Password</label>
              <br />
              <button type="submit" onClick={this.onSignUp}>Sign Up</button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className="loggedIn">
        <Planner />
        <button id="logOut" onClick={this.logout}>Logout</button>
      </div>
    );
  }
}
export default Home;
