import React from 'react';
import './Card.css';
import { Icon, IconSources } from '../Icon';


export enum CardTypes {
  TOP_IMAGE = 'top-image',
  CENTER_IMAGE = 'center-image',
  BOTTOM_IMAGE = 'bottom-image'
}

export interface CardProps {
  id?: string;
  type?: CardTypes; //todo
  image?: string;
  title?: string;
  description?: string;
  className?: string;
  stats?: string[];
  style?: React.CSSProperties;
  flat?: boolean;
  onClick?: () => void;
}

export class Card extends React.Component<CardProps> {
  render() {
    let computedClass = this.props.className ? this.props.className : 'card';
    computedClass = this.props.type ? `${computedClass} ${this.props.type}` :  computedClass;
    computedClass = this.props.flat ? `${computedClass} ${'flat'}` : `${computedClass} ${'floating'}`;
    return <div className={computedClass} onClick={this.props.onClick}>
      {this.props.title ? <div className="card-title">{this.props.title}</div> : null}
      {this.props.description ? <div className="card-desc">{this.props.description}</div> : null}
      {this.props.image ? <Icon source={IconSources.ASSETS} name="logo" /> : null}
      {this.props.stats ? <div className="card-stats">{this.props.stats}</div> : null}
    </div>
  }
}