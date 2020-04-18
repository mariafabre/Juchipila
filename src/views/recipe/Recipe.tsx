import React from 'react';

export interface RecipeProps {
  recipeController: RecipeController;
}

export class Recipe extends React.Component<RecipeProps> {
    render() {
      return <div className="recipe">
        <div className="recipe-panel">
        </div>
      </div>
    }
}

export class RecipeController {

}