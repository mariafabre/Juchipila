import React from 'react';
import './App.css';
import './stylesheets/General.css';
import { LoginBox, LoginBoxController } from './views/login/loginBox';
import { initializeApp } from 'firebase';
import { RegistrationBox, RegistrationBoxController } from './views/register/RegistrationBox';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { CookbookSum } from './views/CookbookSum/CookbookSum';
import { TresLechesSession } from './services/TresLechesSession';
import { IconSources, Icon } from './components/Icon';
import { ConverterController, Converter } from './views/Converter/Converter';

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
    <Router>
      <Switch>
        <Route exact path="/" component={() => <LandingView />}/>
        <Route excat path ="/cookbook" component={() => TresLechesSession.getInstance().user ? <CookbookSum/> : <Redirect to="/"/>}/>
      </Switch>
    </Router>
  );
}

@observer
export class LandingView extends React.Component {
  @observable showLogin: boolean = true;
  @observable originalIcon: boolean = true;

  converterMx = new ConverterController();
  loginBoxController: LoginBoxController | undefined;
  registrationBoxController: RegistrationBoxController | undefined;
  componentWillMount() {
    this.loginBoxController = new LoginBoxController();
    this.registrationBoxController = new RegistrationBoxController();
  }
  render() {
    return <div className="App">
      <div className="App-header">
      <button onClick={action(() => this.showLogin = !this.showLogin)}>{this.showLogin ? "Registration" : "Back To Login"}</button>
        <div>
          <div className="title">Tres Leches:</div>
          <div className="sub-title">The Collaborative Cookbook</div>
          <Icon className="logo" name={this.originalIcon ? "logoBW" : "logoV2"} onClick={action(() => this.originalIcon = !this.originalIcon)} source={IconSources.ASSETS}/>
        </div>
        <div>
          {this.showLogin ?
            <LoginBox controller={this.loginBoxController || new LoginBoxController()} /> :
            <RegistrationBox controller={this.registrationBoxController || new RegistrationBoxController()} />}
        </div>
        <button onClick={() => Converter.displayDialog(this.converterMx)}>
          <Icon source={IconSources.FONTAWESOME} name="fa fa-calculator"/>
        </button>
      </div>
    </div>
  }
}

export default App;
