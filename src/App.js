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
        selectedIndicators: [],

        dataGotFromAPI: false
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
                this.setState({dataGotFromAPI: true});
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
          this.setState({ scenariosData: scenarioResult });
        });      
    })
  };

  getChoicesFromScenarioMenu = (regionalleveli, regioni, scenariocollectioni, scenarioi, periodi) => {
    this.setState({selectedRegionallevel : regionalleveli});
    this.setState({selectedRegion: regioni});
    this.setState({selectedScenariocollection: scenariocollectioni});
    this.setState({selectedScenarios: scenarioi});
    this.setState({selectedPeriod: periodi}, () => {
      this.updateScenarioOptions();
    });
  }

  getChoicesFromIndicatorMenu = (gottenIndicators) => {
    this.setState({selectedIndicators: gottenIndicators});
  }

  render() {
    return (
      <div className="App">            
        <h1 className="App-title">{this.state.titleText}</h1>
        {this.state.dataGotFromAPI ? 
          <div className="container">
          <div className="row">          
              <div className="col-md-3">
                <div className="ScenarioMenu"> 
                  <DropdownMenuScenarios  regionalLevelsDataFromParent={this.state.regionalLevelsData}
                                          regionsDataFromParent={this.state.regionsData}
                                          scenariosDataFromParent={this.state.scenariosData}
                                          sendChoicesToApp={this.getChoicesFromScenarioMenu}/>
                </div>
              </div>
              <div className="col-md-6"><Graphs regionobject = {this.state.region}
                                                periodobject = {this.state.period} 
                                                scenarioobject = {this.state.scenario}/>
              </div>
              <div className="col-md-3"><Indicators scenariosDataFromParent={this.state.scenariosData}
                                                    sendIndicatorChoicesToApp={this.getChoicesFromIndicatorMenu}/></div>
          </div>
        </div> 
          : <p>Loading...</p>}
      </div>
    );
  }
}



export default App;
