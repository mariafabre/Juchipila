import React from 'react';

export interface RecipebookProps {
  RecipebooksController: RecipebookController;
}

export class Recipebook extends React.Component<RecipebookProps> {
    render() {
      return <div className="recipebook">
        <div className="recipebook-panel">
        </div>
      </div>
    }
}

export class RecipebookController {

}