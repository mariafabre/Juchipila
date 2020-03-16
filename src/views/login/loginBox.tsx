import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { TextInput } from '../../components/inputs/TextInput';
import { Cookbook } from '../../services/TresLechesModels';
import { TresLechesSession } from '../../services/TresLechesSession';

export interface LoginBoxProps {
  controller: LoginBoxController;
}

@observer
export class LoginBox extends React.Component<LoginBoxProps> {
  @observable cookbook: Cookbook | undefined;

  render() {
    return <div>
              <div className="form login" >
                <TextInput type="email" id="loginBox" placeholder="E-mail" value={this.props.controller.username}
                  onChange={(value) => this.props.controller.username = value} />
                <br/>
                <TextInput type="password" id="passwordBox" placeholder="Password" value={this.props.controller.password}
                  onChange={(value) => this.props.controller.password = value} />
                <br/>
                <button onClick={() => this.props.controller.login()}>Login</button>
              </div>
              {/* {this.props.controller.signed && <div> Congrats </div>} */}
              {/* <button onClick={() => this.props.controller.addCookbook().then(action((cb) => this.cookbook = cb))}>Cookbook</button> */}
              {this.cookbook && this.cookbook.name}
    </div>
  }
}

export class LoginBoxController {
  @observable public username: string = "";
  @observable public password: string = "";
  @observable public signed: boolean = false;
  @observable public showLogin: boolean = true;

  login() {
    console.log(this.username);
    TresLechesSession.getInstance().signInUser(this.username, this.password).then(action(() => this.signed = true))
    .catch(action(() => this.signed = false));
  }

  goToReg() {

  }
  addCookbook(): Promise<Cookbook> {
    return TresLechesSession.getInstance().addNewCookbook({name: "First cookbook", recipes: [], code: "FCB", id: "FCB"});
  }
}
