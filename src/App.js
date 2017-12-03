import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DropdownMenuScenarios from './components/DropdownMenuScenarios'
import ScenarioOptionsData from './data/ScenarioOptionsData'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        titleText: "Forest Indicator Service",
        
        selectedRegionallevel: "",
        selectedRegion: "",
        selectedScenariocollection: "",
        selectedScenario: "",
        selectedPeriod: "",

        ScenarioMenureadytogo: false
      };    
  }

  componentDidMount(){
    ScenarioOptionsData.getRegionLevels().then(result => {
      this.setState({ regionLevels: result });
      console.log("Leidies and gentlemen");
      console.log(this.state.regionLevels[0].name);
      console.log("wasnt that nice");
      this.setState({ScenarioMenureadytogo: true});
    });
  }

  callback = (regionalleveli, regioni, scenariocollectioni, scenarioi, periodi) => {
    this.setState({selectedRegionallevel: regionalleveli});
    this.setState({selectedRegion: regioni});
    this.setState({selectedScenariocollection: scenariocollectioni});
    this.setState({selectedScenario: scenarioi});
    this.setState({selectedPeriod: periodi});
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.titleText}</h1>
        {this.state.ScenarioMenureadytogo ? <DropdownMenuScenarios regionalLevelOptionsFromParent={this.state.regionLevels}
                                                                    sendChoicesToApp={this.callback}/>
        : <p>loading</p>}
      </div>
    );
  }
}

export default App;
