import React from 'react';

export interface CookbookProps {
  cookbooksController: CookbookController;
}

export class Cookbook extends React.Component<CookbookProps> {
    render() {
      return <div className="cookbook">
        <div className="cookbook-panel">
        </div>
      </div>
    }
}

export class CookbookController {

}