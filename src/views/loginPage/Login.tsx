import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { TextInput } from '../../components/inputs/TextInput';
import { TresLechesSession } from '../../services/TresLechesSession';
import { Redirect } from 'react-router-dom';

export interface LoginProps {
  controller: LoginController;
}

@observer
export class Login extends React.Component<LoginProps> {

  render() {
    return TresLechesSession.getInstance().user ? <Redirect to="/home" /> : <div>
      <div className="form login" onKeyPress={(event) => {
        (event.key === "Enter") && this.props.controller.login()
      }}>
        <TextInput type="email" id="loginBox" placeholder="E-mail" value={this.props.controller.email}
          onChange={(value) => this.props.controller.email = value} />
        <TextInput type="password" id="passwordBox" placeholder="Password" value={this.props.controller.password}
          onChange={(value) => this.props.controller.password = value} />
        <div className="text-error">
          {this.props.controller.error}
        </div>
        <button onClick={() => this.props.controller.login()}>Login</button>
      </div>
    </div>
  }
}

export class LoginController {
  @observable public email: string = "";
  @observable public password: string = "";
  @observable public error: string | undefined;

  login() {
    TresLechesSession.getInstance().signInUser(this.email, this.password).catch(
      action((error) => {
        this.error = error.message
      }));
  }
}
