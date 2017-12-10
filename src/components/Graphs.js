import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {Bootstrap, ToggleButton, MenuItem, ToggleButtonGroup, ButtonToolbar} from 'react-bootstrap';
import { Button, ButtonGroup } from 'reactstrap';
const ReactHighcharts = require('react-highcharts');

class Graphs extends Component {

    constructor (props) {
        super(props);
    
        this.state = { rSelected: 'column', polar1: false};
    
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
      }

    onRadioBtnClick(rSelected) {
        if (this.state.rSelected === 'polar')
        {
            this.setState({ polar1: true });
        }
        else(this.state.rSelected !== 'polar')
        {
            this.setState({ polar1: false });
            this.setState({ rSelected });
        }
      }

  render () {


      var config = {
        
            chart: {
                //{this.state.polar1 ? '' : type: this.state.rSelected}
                    type: this.state.rSelected,
                    
                    polar: this.state.polar1,
            },
            title: {
                text: this.props.regionobject.name + ' ' + this.props.periodobject.yearStart + '-' + this.props.periodobject.yearEnd
            },
            subtitle: {
                text: this.props.scenarioobject.length>0?'Scenarios: ' + this.props.scenarioobject.map((scenario) => ' '+scenario.description):null
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rainfall (mm)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                },

                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Tokyo',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        
            }, {
                name: 'New York',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
        
            }, {
                name: 'London',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
        
            }, {
                name: 'Berlin',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
        
            }]
    };

    return (
      <div>
        <h1>
          <ReactHighcharts config = {config}></ReactHighcharts>
        </h1>

        <ButtonGroup>
          <Button color="default" onClick={() => this.onRadioBtnClick('column')} active={this.state.rSelected.includes ('column')}>column</Button>
          <Button color="default" onClick={() => this.onRadioBtnClick('polar')} active={this.state.rSelected.includes ('polar')}>polar</Button>
          <Button color="default" onClick={() => this.onRadioBtnClick('pie')} active={this.state.rSelected.includes ('pie')}>pie</Button>
        </ButtonGroup>
        <p>Selected: {this.state.rSelected}</p>
      </div>)
  }
}

export default Graphs
