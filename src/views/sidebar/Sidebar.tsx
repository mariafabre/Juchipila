import React from 'react';
import './Sidebar.css'
import { Cookbook, Recipe } from '../../services/TresLechesModels';

export interface SidebarProps {
  cookbooks: Cookbook[];
  onCookbookSelection?: (cookbook: Cookbook) => void;
  onRecipeSelection?: (cookbook: Cookbook, recipe: Recipe) => void;
}

export class Sidebar extends React.Component<SidebarProps> {
    render() {
      return <div className="sidebar">
        <ul>
        {this.props.cookbooks.map((cookbook) =><div> <li className="cookbook-row" onClick={() => this.props.onCookbookSelection && this.props.onCookbookSelection(cookbook)}>
          {cookbook.name} </li>
          <ul>
          {cookbook.recipes?.map((recipe) => <li className="recipe-row" onClick={() => this.props.onRecipeSelection && this.props.onRecipeSelection(cookbook, recipe)}>
            {recipe.name || "Recipe"}
            </li>)}
            </ul>
          </div>)}
          </ul>
      </div>
    }
}