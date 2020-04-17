import React from 'react';
import { action } from 'mobx';
import { Icon, IconSources } from '../Icon';

export interface TextInputProps {
  onChange: (value: string) => void;
  onKeyPress?: (key: number) => void;
  placeholder?: string;
  type?: string;
  value?: string;
  pattern?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  list?: string;
  minLength?: number;
  maxLength?: number;
  hasError?: boolean | string;
}

export class TextInput extends React.Component<TextInputProps> {
  render() {
    return <div className="textinput-wrapper">
      <input {...this.props}
        onChange={action((event) => this.props.onChange(event.target.value))}
        onKeyPress={action((event) => this.props.onKeyPress && this.props.onKeyPress(event.keyCode))} />
      {this.props.hasError && <Icon name="fa fa-exclamation-circle"
        source={IconSources.FONTAWESOME} className="error-icon"
        tooltip={typeof this.props.hasError === "string" ? this.props.hasError : undefined} />}
    </div>;
  }
}