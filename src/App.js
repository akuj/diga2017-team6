import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Graphs from './components/Graphs';
import { Row, Grid, Col } from 'react-bootstrap';
import DropdownMenuScenarios from './components/DropdownMenuScenarios'

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
        <h1>{this.state.titleText}</h1>
        
        <Grid>

    <Row className="show-grid">
      <Col xs={4} md={2}><DropdownMenuScenarios listNameFromParent={this.callback}/></Col>
      <Col xs={4} md={8}><Graphs/></Col>
      <Col xs={4} md={2}><Graphs/></Col>
    </Row>
  </Grid>
      </div>
    );
  }
}

export default App;
