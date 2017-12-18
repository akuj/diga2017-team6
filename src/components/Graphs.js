import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup } from 'reactstrap';
const ReactHighcharts = require('react-highcharts')
var HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);
var HighchartsExporting = require('highcharts-exporting');
HighchartsExporting(ReactHighcharts.Highcharts);

class Graphs extends Component {

    constructor (props) {
        super(props);
    
        this.state = { rSelected: 'column'};
    
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
      }

    onRadioBtnClick(selected) {
        this.setState({ rSelected: selected });
      }

  render () {
    var language = this.props.language;
    var data = this.props.scenariosDataFromParent[0].values;

    var scenarios = this.props.scenarioobject;
    var indicators = this.props.indicatorobject;
    var timeperiod = this.props.periodobject;

    if(this.props.scenarioobject===null){
        scenarios = [this.props.scenariosDataFromParent[0].scenarios[0]]
    }

    if(this.props.indicatorobject===null){
        indicators = [this.props.scenariosDataFromParent[0].indicatorCategories[0].indicators[0]]
    }

    if(this.props.periodobject===null){
        timeperiod = this.props.scenariosDataFromParent[0].timePeriods[0]
    }

    var dataFilteredByTimeperiod = [];
    data.map((value, i)=>
        {if(value.timePeriodId===timeperiod.id){
            dataFilteredByTimeperiod.push(value);
        }}
    )


    var dataFilteredByIndicators = [];
    dataFilteredByTimeperiod.map((value)=>
        indicators.map((indicator)=>
            {if(value.indicatorId===indicator.id){
                dataFilteredByIndicators.push(value);
            }}
        )
    )

    var dataFilteredByAllSelections = [];
    dataFilteredByIndicators.map((value, i)=>
        scenarios.map((scenario)=>
            {if(value.scenarioId===scenario.id){
                dataFilteredByAllSelections.push(value);
            }}
        )
    )


    function compare(a,b) {
        if(a.indicatorId < b.indicatorId)
            return -1;
        if(a.indicatorId > b.indicatorId)
            return 1;
        if(a.indicatorId === b.indicatorId){
            if(a.scenarioId < b.scenarioId)
                return -1;
            if(a.scenarioId > b.scenarioId)
                return 1;
        }
    }

    dataFilteredByAllSelections.sort(compare);

    var seriesnames = [];
    scenarios.map((scenario)=>
        seriesnames.push(scenario.name));

    var seriesdata = [];
    for(let scenario of scenarios){
        var dataforonescenario = [];
        for(let data of dataFilteredByAllSelections){
            if(data.scenarioId===scenario.id){
                dataforonescenario.push(data.value);
            }
        }
        seriesdata.push(dataforonescenario);
    }

    var dataForGraphs = [];
    for(var i=0; i<scenarios.length; i++){
        dataForGraphs.push({
            type: 'column',
            name: seriesnames[i],
            data: seriesdata[i]
        });
    }

    var indicatornames = [];
    indicators.map((indicator)=>
        indicatornames.push(indicator.name));
    
    var title = this.props.regionobject.name + ' ' + timeperiod.yearStart + '-' + timeperiod.yearEnd;
            
    if(this.state.rSelected!=='table'){
        var config = {
        
            chart: {
                    polar: this.state.rSelected==='polar'?true:false,
                    type: 'column',

            },
            title: {
                text: title
            },
            xAxis: {
                categories: indicators.map((indicator, i)=>
                    indicator.name),
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: language==='fi'?'Arvot':'Values'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                },
            },
            series: 
            dataForGraphs
        };
    }

    return (
      <div className="Graph">
          <p></p>
          <p></p>
          {this.state.rSelected==='table'
          ?
          <div class="table-responsive">
          <table class="table" border="1">
          <tr BGCOLOR="#E5E8E6">
            <th></th>
            {indicatornames.map((indicator)=>
                <th className="toptobottom">{indicator}</th>)}
          </tr>
          {dataForGraphs.map((data)=>
            <tr BGCOLOR="#E5E8E6">
                <th>{data.name}</th>
                {data.data.map((value)=>
                    <td>{value}</td>)}
            </tr>)}
        </table>
        </div>
          :<h1><ReactHighcharts config = {config}></ReactHighcharts></h1>}
        <p></p>
        <p></p>
        <ButtonGroup>
          <Button color="default" onClick={() => this.onRadioBtnClick('column')} active={this.state.rSelected.includes ('column')}>{language==='fi'?'Pylväs':'Column'}</Button>
          <Button color="default" onClick={() => this.onRadioBtnClick('polar')} active={this.state.rSelected.includes ('polar')}>Polar</Button>
          <Button color="default" onClick={() => this.onRadioBtnClick('table')} active={this.state.rSelected.includes ('table')}>{language==='fi'?'Taulukko':'Table'}</Button>
        </ButtonGroup>
      </div>)
  }
}

export default Graphs