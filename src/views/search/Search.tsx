import React from 'react';
import { TextInput, TextInputProps } from '../../components/inputs/TextInput';

export interface SearchProps extends TextInputProps {
}

export class Search extends React.Component<SearchProps> {
    render() {
      
      return  <TextInput id="search" type="search" {...this.props}/>
    }
}