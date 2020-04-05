import React from 'react';
import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';
import { TextInput } from '../../components/inputs/TextInput';
import { TresLechesSession } from '../../services/TresLechesSession';
import { Redirect } from 'react-router-dom';

export interface RegistrationProps {
  controller: RegistrationController;
}

@observer
export class Registration extends React.Component<RegistrationProps> {

  render() {
    return TresLechesSession.getInstance().user ? <Redirect to="/home" /> : <div>
      <div className="form register" onKeyPress={(event) => {
        (event.key === "Enter") && this.props.controller.register()
      }}>
        <TextInput type="email" id="email" placeholder="E-mail" value={this.props.controller.username}
          onChange={(value) => this.props.controller.username = value} />
        <TextInput type="email" id="confirm-email" className={this.props.controller.isConfirmEmailValid ? '' : 'error'} placeholder="Confirm E-mail"
          onChange={(value) => this.props.controller.confirmUsername = value} />
        <TextInput type="password" id="password" placeholder="Password" value={this.props.controller.password}
          onChange={(value) => this.props.controller.password = value} />
        <TextInput type="password" id="confirm-password" className={this.props.controller.isConfirmPasswordValid ? '' : 'error'} placeholder="Confirm Password" value={this.props.controller.confirmPassword}
          onChange={(value) => this.props.controller.confirmPassword = value} />
        <div className="text-error">
          {this.props.controller.error}
        </div>
        <button disabled={!this.props.controller.canRegister} onClick={() => this.props.controller.register()}>Register</button>
      </div>
    </div>
  }
}

export class RegistrationController {
  @observable public username: string = "";
  @observable public confirmUsername: string = "";
  @observable public password: string = "";
  @observable public confirmPassword: string = "";
  @observable public error: string | undefined;

  @computed
  get isConfirmEmailValid(): boolean {
    return this.username === this.confirmUsername;
  }

  @computed
  get canRegister(): boolean {
    return this.password !== '' && this.username !== '' && this.isConfirmEmailValid && this.isConfirmPasswordValid;
  }

  @computed
  get isConfirmPasswordValid(): boolean {
    return this.password === this.confirmPassword;
  }

  register() {
    TresLechesSession.getInstance().registerUser(this.username, this.password).catch(
      action((error) => {
        this.error = error.message
      }));
  }
}
