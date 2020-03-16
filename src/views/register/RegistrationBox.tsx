import React from 'react';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import { TextInput } from '../../components/inputs/TextInput';
import { TresLechesSession } from '../../services/TresLechesSession';
import { Redirect } from 'react-router-dom';

export interface RegistrationBoxProps {
  controller: RegistrationBoxController;
}

@observer
export class RegistrationBox extends React.Component<RegistrationBoxProps> {

  render() {
    return TresLechesSession.getInstance().user ? <Redirect to="/cookbook" /> :  <div>
                <div className="form register">
                  <TextInput type="email" id="email" placeholder="E-mail" value={this.props.controller.username}
                    onChange={(value) => this.props.controller.username = value} />
                  <br/>
                    <TextInput type="email" id="confirm-email" className={this.props.controller.isConfirmEmailValid ? '' : 'error'} placeholder="Confirm E-mail"
                    onChange={(value) => this.props.controller.confirmUsername = value} />
                  <br/>
                  <TextInput type="password" id="password" placeholder="Password" value={this.props.controller.password}
                    onChange={(value) => this.props.controller.password = value} />
                  <br/>
                  <TextInput type="password" id="confirm-password" className={this.props.controller.isConfirmPasswordValid ? '' : 'error'} placeholder="Confirm Password" value={this.props.controller.confirmPassword}
                    onChange={(value) => this.props.controller.confirmPassword = value} />
                  <br/>
                  <button disabled={!this.props.controller.canRegister} onClick={() => this.props.controller.register()}>Register</button>
              </div>
    </div>
  }
}

export class RegistrationBoxController {
  @observable public username: string = "";
  @observable public confirmUsername: string = "";
  @observable public password: string = "";
  @observable public confirmPassword: string = "";

  @computed
  get isConfirmEmailValid(): boolean {
    return this.username === this.confirmUsername;
  }

  // @computed
  // get isPasswordValid(): boolean {
  //   return this.username === this.confirmUsername && this.password === this.confirmPassword;
  // }

  @computed
  get canRegister(): boolean {
    return this.password !== '' && this.username !== '' && this.isConfirmEmailValid && this.isConfirmPasswordValid;
  }

  @computed
  get isConfirmPasswordValid(): boolean {
    return this.password === this.confirmPassword;
  }

  register() {
    TresLechesSession.getInstance().registerUser(this.username, this.password);
  }
}
