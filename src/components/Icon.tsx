import React from 'react';

export enum IconSources {
    FONTAWESOME,
    ASSETS,
    URL
}

export interface IconProps {
    name: string;
    source: IconSources;
    className?: string;
    onClick?: () => void;
    tooltip?: string;
}

export class Icon extends React.Component<IconProps> {
    render() {
        switch(this.props.source) {
            case IconSources.FONTAWESOME:
                return <i title={this.props.tooltip} onClick={this.props.onClick} className={this.props.className + " " + this.props.name}/>;
            case IconSources.ASSETS:
                return <img {...this.props} title={this.props.tooltip} src={require("../assets/images/" + this.props.name + ".png")} alt={this.props.className}/>;
            case IconSources.URL:
                return <img {...this.props} title={this.props.tooltip} src={require(this.props.name)} alt={this.props.className}/>;
        }
    }
}