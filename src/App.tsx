import React from 'react';
import './App.css';
import { LoginBox, LoginBoxController } from './views/login/LoginBox';
import { initializeApp } from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyC1RR_SpCmX8k0ZADiBezv9l5W51RkIe0I",
  authDomain: "juchipila-be066.firebaseapp.com",
  databaseURL: "https://juchipila-be066.firebaseio.com",
  projectId: "juchipila-be066",
  storageBucket: "juchipila-be066.appspot.com",
  messagingSenderId: "756325522741",
  appId: "1:756325522741:web:29b82ad7ff89ce7d9e807c"
};

function App() {
  initializeApp(firebaseConfig);
  return (
    <div className="App">
      <div className="App-header">
        <div>
          <div className="title">Tres Leches:</div>
          <div className="sub-title">The Collaborative Cookbook</div>
        </div>
        <LoginBox controller={new LoginBoxController()}/>
      </div>
    </div>
  );
}

export default App;
