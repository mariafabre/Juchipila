import React from 'react';
import { Card } from '../../components/panels/Card';
import './Welcome.css';
import { EditCookbook, EditCookbookController } from '../cookbooks/EditCookbook';
import { action, observable } from 'mobx';
import { TresLechesSession } from '../../services/TresLechesSession';
import { observer } from 'mobx-react';
import { Cookbook, Recipe as RecipeModel } from '../../services/TresLechesModels';
import { Recipe } from '../recipe/Recipe';
import { Sidebar } from '../sidebar/Sidebar';

@observer
export class Welcome extends React.Component {
  public static recentCookbooksCount: number = 3;
  @observable pickedRecipe: RecipeModel | undefined;
  @observable pickedCookbook: Cookbook | undefined;

  addCookbook() {
    EditCookbook.addCookbook({
      editCookbookController: new EditCookbookController(),
      onCommit: action((cookbook) => {
        TresLechesSession.getInstance().cookbooks?.push(cookbook);
      })
    });
  }

  render() {
    let cookbooks = TresLechesSession.getInstance().cookbooks;
    return <div className="content">
      {cookbooks && <Sidebar cookbooks={cookbooks} onCookbookSelection={action(() => this.pickedRecipe = undefined)} onRecipeSelection={action((cookbook, recipe) => {
        this.pickedCookbook = cookbook;
        this.pickedRecipe  = recipe;
      })}/>}
      {this.pickedRecipe && this.pickedCookbook ? <Recipe recipe={this.pickedRecipe} cookbook={this.pickedCookbook} /> : 
      <div className="welcome">
      <div className="welcome-panel">
        <label>Most Recent Cookbooks</label>
        <ul id="cookbooks">
          {cookbooks 
          ? cookbooks.slice(cookbooks.length - Welcome.recentCookbooksCount)
          .map((cookbook) => <li><Card title={cookbook.name} image="logo" description={cookbook.code}
            onClick={() => EditCookbook.editCookbook({ editCookbookController: new EditCookbookController(cookbook), onCommit: action((updatedCB) => cookbook = updatedCB) })} /></li>)
            : null
          }
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
    </div>
  }
}