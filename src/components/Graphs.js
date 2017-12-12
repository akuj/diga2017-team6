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

    var selectedindicators = this.props.Indicatorsobject.length

    var seriesarray = []
    var seriesarray2 = { name: 'perkele', data: [40, 30, 20, 10]}
    //var seriesarray3 = { name: 'saatana', data: [10, 20, 30, 40]}
    //console.log("data1111", seriesarray2[0].data)
    var perkele = Array.prototype.slice.call(seriesarray2, data)
    //var perkele = seriesarray2.data.slice(1, 4);
    //var vittu = seriesarray3.data.slice(1, selectedindicators);
    seriesarray.push(perkele);
    //seriesarray.push(vittu);
    
    seriesarray2.data[2];
    
    /*var dataperkele = [{"scenarioId":10,"indicatorId":141,"timePeriodId":20,"value":0.88},
    {"scenarioId":10,"indicatorId":125,"timePeriodId":20,"value":0.7},  {"scenarioId":10,"indicatorId":139,"timePeriodId":20,"value":0.64},
    {"scenarioId":10,"indicatorId":124,"timePeriodId":20,"value":0.11}, {"scenarioId":10,"indicatorId":137,"timePeriodId":20,"value":0.57},
    {"scenarioId":10,"indicatorId":123,"timePeriodId":20,"value":0.65}, {"scenarioId":10,"indicatorId":134,"timePeriodId":20,"value":0.64},
    {"scenarioId":10,"indicatorId":122,"timePeriodId":20,"value":0.99}, {"scenarioId":10,"indicatorId":133,"timePeriodId":20,"value":0.37},
    {"scenarioId":10,"indicatorId":120,"timePeriodId":20,"value":0.13}, {"scenarioId":10,"indicatorId":131,"timePeriodId":20,"value":0.26},
    {"scenarioId":10,"indicatorId":129,"timePeriodId":20,"value":0.13}, {"scenarioId":10,"indicatorId":127,"timePeriodId":20,"value":0.22},
    {"scenarioId":10,"indicatorId":134,"timePeriodId":21,"value":0.91}, {"scenarioId":10,"indicatorId":122,"timePeriodId":21,"value":0.12},    
    {"scenarioId":10,"indicatorId":133,"timePeriodId":21,"value":0.94}, {"scenarioId":10,"indicatorId":120,"timePeriodId":21,"value":0.79},
    {"scenarioId":10,"indicatorId":131,"timePeriodId":21,"value":0.2},  {"scenarioId":10,"indicatorId":129,"timePeriodId":21,"value":0.35},
    {"scenarioId":10,"indicatorId":127,"timePeriodId":21,"value":0.84}, {"scenarioId":10,"indicatorId":141,"timePeriodId":21,"value":0.59},
    {"scenarioId":10,"indicatorId":125,"timePeriodId":21,"value":0.95}, {"scenarioId":10,"indicatorId":139,"timePeriodId":21,"value":0.23},
    {"scenarioId":10,"indicatorId":124,"timePeriodId":21,"value":0.16}, {"scenarioId":10,"indicatorId":137,"timePeriodId":21,"value":0.28},
    {"scenarioId":10,"indicatorId":123,"timePeriodId":21,"value":0.13}, {"scenarioId":10,"indicatorId":129,"timePeriodId":22,"value":0.76},
    {"scenarioId":10,"indicatorId":127,"timePeriodId":22,"value":0.03}, {"scenarioId":10,"indicatorId":141,"timePeriodId":22,"value":0.79},
    {"scenarioId":10,"indicatorId":125,"timePeriodId":22,"value":0.67}, {"scenarioId":10,"indicatorId":139,"timePeriodId":22,"value":0.33},
    {"scenarioId":10,"indicatorId":124,"timePeriodId":22,"value":0.7},  {"scenarioId":10,"indicatorId":137,"timePeriodId":22,"value":0.06},
    {"scenarioId":10,"indicatorId":123,"timePeriodId":22,"value":0.74}, {"scenarioId":10,"indicatorId":134,"timePeriodId":22,"value":0.5},
    {"scenarioId":10,"indicatorId":122,"timePeriodId":22,"value":0.26}, {"scenarioId":10,"indicatorId":133,"timePeriodId":22,"value":0.36},
    {"scenarioId":10,"indicatorId":120,"timePeriodId":22,"value":0.75}, {"scenarioId":10,"indicatorId":131,"timePeriodId":22,"value":0.24},
    {"scenarioId":10,"indicatorId":139,"timePeriodId":23,"value":0.76}, {"scenarioId":10,"indicatorId":124,"timePeriodId":23,"value":0.75},
    {"scenarioId":10,"indicatorId":137,"timePeriodId":23,"value":0.92}, {"scenarioId":10,"indicatorId":123,"timePeriodId":23,"value":0.46},
    {"scenarioId":10,"indicatorId":134,"timePeriodId":23,"value":0.92}, {"scenarioId":10,"indicatorId":122,"timePeriodId":23,"value":0.75},
    {"scenarioId":10,"indicatorId":133,"timePeriodId":23,"value":0.04}, {"scenarioId":10,"indicatorId":120,"timePeriodId":23,"value":0.48},
    {"scenarioId":10,"indicatorId":131,"timePeriodId":23,"value":0.14}, {"scenarioId":10,"indicatorId":129,"timePeriodId":23,"value":0.17},
    {"scenarioId":10,"indicatorId":127,"timePeriodId":23,"value":0.91}, {"scenarioId":10,"indicatorId":141,"timePeriodId":23,"value":0.82},
    {"scenarioId":10,"indicatorId":125,"timePeriodId":23,"value":0.76}, {"scenarioId":11,"indicatorId":133,"timePeriodId":20,"value":0.09},
    {"scenarioId":11,"indicatorId":120,"timePeriodId":20,"value":0.18}, {"scenarioId":11,"indicatorId":131,"timePeriodId":20,"value":0.8},
    {"scenarioId":11,"indicatorId":129,"timePeriodId":20,"value":0.94}, {"scenarioId":11,"indicatorId":127,"timePeriodId":20,"value":0.59},
    {"scenarioId":11,"indicatorId":141,"timePeriodId":20,"value":0.22}, {"scenarioId":11,"indicatorId":125,"timePeriodId":20,"value":0.9},
    {"scenarioId":11,"indicatorId":139,"timePeriodId":20,"value":0.75}, {"scenarioId":11,"indicatorId":124,"timePeriodId":20,"value":0.11},
    {"scenarioId":11,"indicatorId":137,"timePeriodId":20,"value":0.72}, {"scenarioId":11,"indicatorId":123,"timePeriodId":20,"value":0},
    {"scenarioId":11,"indicatorId":134,"timePeriodId":20,"value":0.16}, {"scenarioId":11,"indicatorId":122,"timePeriodId":20,"value":0.9},
    {"scenarioId":11,"indicatorId":127,"timePeriodId":21,"value":0.46}]*/


    /*var indicatornames = []

    console.log("123", this.props.Indicatorsobject)

    this.props.Indicatorsobject.map((indicator)=>
    indicatornames.push(indicator.name))

    console.log("indicators", indicatornames)

    console.log("map", this.props.Indicatorsobject.map((indicator)=>
    indicator.name))*/

      var config = {
        
            chart: {
                //{this.state.polar1 ? '' : type: this.state.rSelected}
                    type: this.state.rSelected,
                    
                    //polar: this.state.polar1,
            },
            title: {
                text: this.props.regionobject.name + ' ' + this.props.periodobject.yearStart + '-' + this.props.periodobject.yearEnd
            },
            subtitle: {
                text: this.props.scenarioobject.length>0?'Scenarios: ' + this.props.scenarioobject.map((scenario) => ' '+scenario.name):null
            },
            xAxis: {

                categories: 
                    this.props.Indicatorsobject.map((indicator)=>
                    indicator.name)
                ,
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
            /*series: [{
                name: 'Tokyo',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 194.1, 95.6, 194.1, 95.6, selectedindicators]
        
            }, {
                name: 'New York',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 194.1, 95.6, 194.1, 95.6]
        
            }, {
                name: 'London',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 194.1, 95.6, 194.1, 95.6]
        
            }, {
                name: 'Berlin',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 194.1, 95.6, 194.1, 95.6]

            }, {
                name: 'Perkele',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 194.1, 95.6, 194.1, 95.6]
        
            }]*/
            series: 
                seriesarray
            

            
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
