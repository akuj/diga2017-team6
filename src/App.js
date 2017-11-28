import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DropdownMenuScenarios from './components/DropdownMenuScenarios'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Forest Indicator Service</h1>
        <DropdownMenuScenarios/>
      </div>
    );
  }
}

export default App;
