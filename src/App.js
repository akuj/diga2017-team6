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
        
        regionalLevelOptions: [],
        regionOptions: [],
        scenarioCollectionOptions: [],
        scenarioOptions: [],
        periodOptions: [],

        selectedRegionallevel: {},
        selectedRegion: {},
        selectedScenariocollection: {},
        selectedScenario: {},
        selectedPeriod: {},

        ScenarioMenureadytogo: false
      };    
  }

  componentDidMount(){
    this.updateIndicatorOptions();
  }

  updateIndicatorOptions = () => {
    ScenarioOptionsData.getRegionLevels().then(result => {
      this.setState({ regionalLevelOptions: result });
      console.log("Region level 1: ", this.state.regionalLevelOptions[0].name);
      console.log("Region level id: ", this.state.regionalLevelOptions[0].id);

      ScenarioOptionsData.getRegions(this.state.regionalLevelOptions[0].id).then(regionresult => {
        this.setState({ regionOptions: regionresult });
        console.log("Region 1:", this.state.regionOptions[0]);
        this.setState({ScenarioMenureadytogo: true});
      });
    });
  }

  callback = (regionalleveli, regioni, scenariocollectioni, scenarioi, periodi) => {
    this.setState({selectedRegionallevel : regionalleveli});
    this.setState({selectedRegion: regioni});
    this.setState({selectedScenariocollection: scenariocollectioni});
    this.setState({selectedScenario: scenarioi});
    this.setState({selectedPeriod: periodi});
    this.updateIndicatorOptions();
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.titleText}</h1>
        {this.state.ScenarioMenureadytogo ? <DropdownMenuScenarios regionalLevelOptionsFromParent={this.state.regionalLevelOptions}
                                                                    regionOptionsFromParent={this.state.regionOptions}
                                                                    sendChoicesToApp={this.callback}/>
        : <p>loading</p>}
      </div>
    );
  }
}

export default App;
