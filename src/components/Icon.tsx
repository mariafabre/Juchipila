import React from 'react';
import logo from '../assets/images/logo.png';
import logoBW from '../assets/images/logoBW.png';
import logoV2 from '../assets/images/logoV2.png';


export enum IconSources {
    FONTAWESOME,
    ASSETS
}

export interface IconProps {
    name: string;
    source: IconSources;
    className?: string;
    onClick?: () => void;
}

export class Icon extends React.Component<IconProps> {
    get image(): string {
        switch (this.props.name) {
            case "logo":
                return logo;
            case "logoBW":
                return logoBW;
            case "logoV2":
                return logoV2;
        }
        return "";
    }
    render() {
        switch(this.props.source) {
            case IconSources.FONTAWESOME:
                return <i onClick={this.props.onClick} className={this.props.className + " " + this.props.name}/>;
            case IconSources.ASSETS:
                return <img {...this.props} src={this.image} alt={this.props.className}/>;
        }
    }
}