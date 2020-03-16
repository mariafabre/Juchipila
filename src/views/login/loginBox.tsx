import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { TextInput } from '../../components/inputs/TextInput';
import { TresLechesSession } from '../../services/TresLechesSession';
import { Redirect } from 'react-router-dom';

export interface LoginBoxProps {
  controller: LoginBoxController;
}

@observer
export class LoginBox extends React.Component<LoginBoxProps> {

  render() {
    return TresLechesSession.getInstance().user ? <Redirect to="/cookbook" /> : <div>
              <div className="form login" >
                <TextInput type="email" id="loginBox" placeholder="E-mail" value={this.props.controller.username}
                  onChange={(value) => this.props.controller.username = value} />
                <br/>
                <TextInput type="password" id="passwordBox" placeholder="Password" value={this.props.controller.password}
                  onChange={(value) => this.props.controller.password = value} />
                <br/>
                <button onClick={() => this.props.controller.login()}>Login</button>
              </div>
    </div>
  }
}

export class LoginBoxController {
  @observable public username: string = "";
  @observable public password: string = "";
  @observable public signed: boolean = false;

  login() {
    console.log(this.username);
    TresLechesSession.getInstance().signInUser(this.username, this.password)
  }

  // addCookbook(): Promise<Cookbook> {
  //   return TresLechesSession.getInstance().addNewCookbook({name: "First cookbook", recipes: [], code: "FCB", id: "FCB"});
  // }
}
