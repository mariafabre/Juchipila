import React from 'react';
import { action } from 'mobx';

export interface TextInputProps {
  type: string;
  placeholder?: string;
  onChange: (value: string) => void;  
  value?: string;
  pattern?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}
export class TextInput extends React.Component<TextInputProps> {
  render() {
    return <input {...this.props}
    onChange={action((event) => this.props.onChange(event.target.value))} />;
  }
}