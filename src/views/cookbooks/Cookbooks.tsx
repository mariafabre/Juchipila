import React from 'react';
import { observable } from 'mobx';
import { EditCookbook, EditCookbookController } from './EditCookbook';

export interface CookbookProps {
  cookbooksController: CookbooksController;
}

export class Cookbooks extends React.Component<CookbookProps> {
    render() {
      return <div className="cookbooks">
        <div className="cookbook-panel">
          <button onClick={this.props.cookbooksController.addCookbook}>Add New Cookbook</button>
        </div>
      </div>
    }
}

export class CookbooksController {
  @observable public name: string = "";
  @observable public reciepes: number[] = [];
  @observable public permission: string[] = [];
  @observable public code: string = "";

  addCookbook() {
    EditCookbook.addCookbook({editCookbookController: new EditCookbookController()});
  }
}