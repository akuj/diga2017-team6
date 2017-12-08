import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import Graphs from './components/Graphs';
import DropdownMenuScenarios from './components/DropdownMenuScenarios';
import Indicators from './components/Indicators';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        titleText: "Forest Indicator Service",
        regionallevel: "",
        region: "",
        scenariocollection: "",
        scenario: "",
        period: ""
      };    
  }

  callback = (regionalleveli, regioni, scenariocollectioni, scenarioi, periodi) => {
    this.setState({regionallevel: regionalleveli});
    this.setState({region: regioni});
    this.setState({scenariocollection: scenariocollectioni});
    this.setState({scenario: scenarioi});
    this.setState({period: periodi});   
  }

  render() {
    return (
      <div className="App">            
        <h1 className="App-title">{this.state.titleText}</h1>
          <div className="container">
            <div className="row">          
                <div className="col-md-3">
                  <div className="ScenarioMenu"><DropdownMenuScenarios listNameFromParent={this.callback}/></div>
                </div>
                <div className="col-md-6"><Graphs/></div>
                <div className="col-md-3"><Indicators/></div>
            </div>
          </div>
      </div>
    );
  }
}



export default App;
