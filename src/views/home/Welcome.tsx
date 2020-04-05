import React from 'react';
import { Card } from '../../components/panels/Card';
import './Welcome.css';
import { EditCookbook, EditCookbookController } from '../cookbooks/EditCookbook';
import { observable, action } from 'mobx';
import { Cookbook } from '../../services/TresLechesModels';
import { TresLechesSession } from '../../services/TresLechesSession';
import { observer } from 'mobx-react';

@observer
export class Welcome extends React.Component {
  //TODO: For testing purposes, make a controller
  @observable cookbooks: Cookbook[] = [];

  componentWillMount() {
    TresLechesSession.getInstance().fetchUserCookbooks().then(action((cookbooks) => {
      this.cookbooks = cookbooks
    }));
  }
  addCookbook() {
    EditCookbook.addCookbook({ editCookbookController: new EditCookbookController()});
  }

  render() {
    return <div className="welcome">
      <div className="welcome-panel">
        <label>Most Recient Cookbooks</label>
        <ul id="cookbooks">
          {this.cookbooks.map((cookbook) => <li><Card title={cookbook.name} image="logo" description={cookbook.code}
            onClick={() => EditCookbook.editCookbook({ editCookbookController: new EditCookbookController(cookbook), onCommit: action((updatedCB) => cookbook = updatedCB) })} /></li>)}
        </ul>
        <button onClick={this.addCookbook}>Add New Cookbook</button>
        <br />
        <label>Top Recipes</label>
        <ul id="recipes">
          <li><Card title="Recipes 1" /></li>
          <li><Card title="Recipes 2" /></li>
          <li><Card title="Recipes 3" /></li>
        </ul>
      </div>
    </div>
  }
}