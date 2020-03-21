import React from 'react';

export interface NavigationProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export class Navigation extends React.Component<NavigationProps> {
    render() {
      return <div {...this.props}>
        <a href="/home">Home</a>
        <a href="/recipes">Recipes</a>
        <a href="/ingredients">Ingredients</a>
      </div>
    }
}