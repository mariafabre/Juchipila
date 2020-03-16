import React from 'react';
import logo from '../assets/images/logo.png';

export enum IconSources {
    FONTAWESOME,
    ASSETS
}

export enum IconIDs {
    LOGO = "logo",
    BOOK = "fa fa-book"
}

export interface IconProps {
    name: IconIDs;
    source: IconSources
}

export class Icon extends React.Component<IconProps> {
    get image(): string {
        switch (this.props.name) {
            case IconIDs.LOGO:
                return logo;
        }
        return "";
    }
    render() {
        switch(this.props.source) {
            case IconSources.FONTAWESOME:
                return <i className={this.props.name}/>
            case IconSources.ASSETS:
                return <img src={this.image}/>;
        }
    }
}