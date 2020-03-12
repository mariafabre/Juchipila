import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { TextInput } from '../../components/inputs/TextInput';
import { auth } from 'firebase';

export interface LoginBoxProps {
  controller: LoginBoxController;
}

@observer
export class LoginBox extends React.Component<LoginBoxProps> {
  render() {
    return <div>
      {this.props.controller.signed && <div> Congrats </div>}
      <TextInput type="email" value={this.props.controller.username}
        onChange={(value) => this.props.controller.username = value} />
      <TextInput type="password" value={this.props.controller.password}
        onChange={(value) => this.props.controller.password = value} />
        <i className="fa fa-book"/>
      <button onClick={() => this.props.controller.login()}>Login</button>]
    </div>
  }
}

export class LoginBoxController {
  @observable public username: string = "";
  @observable public password: string = "";
  @observable public signed: boolean = false;

  login() {
    console.log(this.username);
    auth().signInWithEmailAndPassword(this.username, this.password).then(action(() => this.signed = true))
    .catch(action(() => this.signed = false));
  }
}