import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { TextInput } from '../../components/inputs/TextInput';
import { auth } from 'firebase';
import { Cookbook } from '../../services/TresLechesModels';
import { TresLechesServices } from '../../services/TresLechesServices';

export interface LoginBoxProps {
  controller: LoginBoxController;
}

@observer
export class LoginBox extends React.Component<LoginBoxProps> {
  @observable cookbook: Cookbook | undefined;

  render() {
    return <div>
      {this.props.controller.signed && <div> Congrats </div>}
      <TextInput type="email" value={this.props.controller.username}
        onChange={(value) => this.props.controller.username = value} />
      <TextInput type="password" value={this.props.controller.password}
        onChange={(value) => this.props.controller.password = value} />
        <i className="fa fa-book"/>
      <button onClick={() => this.props.controller.login()}>Login</button>
      <button onClick={() => this.props.controller.register()}>Register</button>
      <button onClick={() => this.props.controller.addCookbook().then(action((cb) => this.cookbook = cb))}>Cookbook</button>
      {this.cookbook && this.cookbook.name}
    </div>
  }
}

export class LoginBoxController {
  @observable public username: string = "";
  @observable public password: string = "";
  @observable public signed: boolean = false;

  services: TresLechesServices;
  constructor() {
    this.services = new TresLechesServices();
  }

  login() {
    console.log(this.username);
    this.services.openUser(this.username, this.password).then(action(() => this.signed = true))
    .catch(action(() => this.signed = false));
  }

  register() {
    this.services.registerUser(this.username, this.password).then(action(() => this.signed = true))
    .catch(action(() => this.signed = false));
  }

  addCookbook(): Promise<Cookbook> {
    return this.services.addNewCookbook({name: "First cookbook", recipes: [], code: "FCB", id: "FCB"});
  }
}
