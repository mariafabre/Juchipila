import React from 'react';
import { Card } from '../../components/panels/Card';
import './Welcome.css';
import { EditCookbook, EditCookbookController } from '../cookbooks/EditCookbook';

export class Welcome extends React.Component {
    addCookbook() {
      EditCookbook.addCookbook({editCookbookController: new EditCookbookController()});
    }
    
    render() {
      return <div className="welcome">
        <div className="welcome-panel">
          <label>Most Recient Cookbooks</label>
          <ul id="cookbooks">
            <li><Card title="Cookbook 1" image="logo" description="Mama loves Baba"/></li>
            <li><Card title="Cookbook 2"/></li>
            <li><Card title="Cookbook 3"/></li>
          </ul>
          <button onClick={this.addCookbook}>Add New Cookbook</button>
          <br />
          <label>Top Recipes</label>
          <ul id="recipes">
            <li><Card title="Recipes 1"/></li>
            <li><Card title="Recipes 2"/></li>
            <li><Card title="Recipes 3"/></li>
          </ul>
        </div>
      </div>
    }
}