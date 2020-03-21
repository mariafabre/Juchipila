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
  type?: CardTypes;
  image?: string; //TODO
  title?: string;
  description?: string;
  className?: string;
  stats?: string[];
  style?: React.CSSProperties;
  flat?: boolean;
  onClick?: () => {};
}

export class Card extends React.Component<CardProps> {
  render() {
    let comuptedClass = this.props.className ? this.props.className : 'card';
    comuptedClass = this.props.type ? `${comuptedClass} ${this.props.type}` :  comuptedClass;
    comuptedClass = this.props.flat ? `${comuptedClass} ${'flat'}` : `${comuptedClass} ${'floating'}`;
    return <div className={comuptedClass} onClick={this.props.onClick}>
      {this.props.title ? <div className="card-title">{this.props.title}</div> : null}
      {this.props.description ? <div className="card-desc">{this.props.description}</div> : null}
      {this.props.image ? <Icon source={IconSources.ASSETS} name="logo" /> : null}
      {this.props.stats ? <div className="card-stats">{this.props.stats}</div> : null}
    </div>
  }
}