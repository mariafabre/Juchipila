import React from 'react';
import './App.css';
import { LoginBox, LoginBoxController } from './views/login/LoginBox';
import { initializeApp } from 'firebase';
import { RegistrationBox, RegistrationBoxController } from './views/register/RegistrationBox';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

var firebaseConfig = {
  apiKey: "AIzaSyC1RR_SpCmX8k0ZADiBezv9l5W51RkIe0I",
  authDomain: "juchipila-be066.firebaseapp.com",
  databaseURL: "https://juchipila-be066.firebaseio.com",
  projectId: "juchipila-be066",
  storageBucket: "juchipila-be066.appspot.com",
  messagingSenderId: "756325522741",
  appId: "1:756325522741:web:29b82ad7ff89ce7d9e807c"
};

function App() {
  initializeApp(firebaseConfig);
  return (
    <div className="App">
      <LandingView />
    </div>
  );
}

@observer
export class LandingView extends React.Component {
  @observable showLogin: boolean = true;
  loginBoxController: LoginBoxController | undefined;
  registrationBoxController: RegistrationBoxController | undefined;
  componentWillMount() {
    this.loginBoxController = new LoginBoxController();
    this.registrationBoxController = new RegistrationBoxController();
  }
  render() {
    return <div>
      <button onClick={action(() => this.showLogin = !this.showLogin)}>{this.showLogin ? "Registration" : "Back To Login"}</button>
      <div className="App-header">
        <div>
          <div className="title">Tres Leches:</div>
          <div className="sub-title">The Collaborative Cookbook</div>
        </div>
        <div>
          {this.showLogin ?
            <LoginBox controller={this.loginBoxController || new LoginBoxController()} /> :
            <RegistrationBox controller={this.registrationBoxController || new RegistrationBoxController()} />}
        </div>
      </div>
    </div>
  }
}

export default App;
