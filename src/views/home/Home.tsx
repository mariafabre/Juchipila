import React from 'react';
import { Sidebar } from '../sidebar/Sidebar';
import { TextInput } from '../../components/inputs/TextInput';
import { Navigation } from '../navigation/Navigation';
import { Welcome } from './Welcome';
import './Home.css';

export class Home extends React.Component {
    render() {
      return <div className="home">
        <div className="navbar">
          <Navigation className="top-nav"/>
          <TextInput className="search" id="search" type="search" onChange={() => console.log('TODO')}/>
        </div>
        <div className="content">
          <Sidebar />
          <Welcome />
        </div>
      </div>
    }
}