import React from 'react';
import { action } from 'mobx';

export interface TextInputProps {
  type: string;
  onChange: (value: string) => void;  
  placeholder?: string;
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