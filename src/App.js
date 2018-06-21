import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chatroom from './Chatroom.js';
import tpLogo from './1200px-Travis_Perkins.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Chatroom />
    </div>
    );
  }
}

export default App;
