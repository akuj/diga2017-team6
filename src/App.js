import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import ScenarioOptionsData from './data/ScenarioOptionsData'
import Graphs from './components/Graphs';
import DropdownMenuScenarios from './components/DropdownMenuScenarios';
import Indicators from './components/Indicators';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        titleText: "Forest Indicator Service",
    
        regionalLevelsData: [],
        regionsData: [],
        scenariosData: [],

        selectedRegionallevel: {},
        selectedRegion: {},
        selectedScenariocollection: {},
        selectedScenarios: {},
        selectedPeriod: {},

        ScenarioMenureadytogo: false
      };    
  }

  componentDidMount(){
    ScenarioOptionsData.getAllRegionLevelData().then(result => {
      this.setState({ regionalLevelsData: result });
      this.setState({ selectedRegionallevel: result[0] }, () => {
        ScenarioOptionsData.getRegionData(this.state.selectedRegionallevel.id).then(regionresult => {
          this.setState({ regionsData: regionresult });
          this.setState({ selectedRegion: regionresult[0] });
          this.setState({ selectedScenariocollection: regionresult[0].scenarioCollections[0] }, () => {
            ScenarioOptionsData.getScenarioCollectionData(this.state.selectedRegion.id, this.state.selectedScenariocollection.id).then(scenarioResult => {
              this.setState({ scenariosData: scenarioResult });
              this.setState({ selectedScenariocollection: scenarioResult[0] }, () => {
                this.setState({ScenarioMenureadytogo: true});
              })
            })
          })
        })
      })
    })
  }

  updateScenarioOptions = () => {
    ScenarioOptionsData.getRegionData(this.state.selectedRegionallevel.id).then(regionresult => {
        this.setState({ regionsData: regionresult });
        ScenarioOptionsData.getScenarioCollectionData(this.state.selectedRegion.id, this.state.selectedScenariocollection.id).then(scenarioResult => {
          this.setState({ scenariosData: scenarioResult }, function(){
            this.setState({ScenarioMenureadytogo: true});
          });      
        })
    })
  };

  getChoicesFromScenarioMenu = (regionalleveli, regioni, scenariocollectioni, scenarioiID, scenarioiName, periodiID, periodiYears) => {
    this.setState({selectedRegionallevel : regionalleveli});
    this.setState({selectedRegion: regioni});
    this.setState({selectedScenariocollection: scenariocollectioni});
    this.setState({selectedScenarios: {name: scenarioiName,
                                       id: scenarioiID}});
    this.setState({selectedPeriod: {years: periodiYears,
                                    id: periodiID}}, () => {
      this.updateScenarioOptions();
    });
  }

  render() {
    return (
      <div className="App">            
        <h1 className="App-title">{this.state.titleText}</h1>
          <div className="container">
            <div className="row">          
                <div className="col-md-3">
                  <div className="ScenarioMenu">{this.state.ScenarioMenureadytogo ? 
                                            <DropdownMenuScenarios  regionalLevelsDataFromParent={this.state.regionalLevelsData}
                                                                    regionsDataFromParent={this.state.regionsData}
                                                                    scenariosDataFromParent={this.state.scenariosData}
                                                                    sendChoicesToApp={this.getChoicesFromScenarioMenu}/>
                                            : <p>loading</p>}</div>
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
