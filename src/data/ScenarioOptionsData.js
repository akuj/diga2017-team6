import axios from 'axios';

function getAllRegionLevelData(){
    
        // get the data from somewhere?
        return new Promise((resolve, reject) => {
    
            axios.get("http://melatupa.azurewebsites.net/regionLevels", {headers: {'Accept-Language': 'en'}})
            .then(results => {
                console.log("Region levels data: ", results);
                const regionLevels = results.data.map(element => {
                    element.name = element.name;
                    element.description = element.description;
                    element.id = element.id;
                    return element;
                });
                resolve(regionLevels);
            })
            .catch(error => {
                console.log(error);
                reject();
            })
        });
    }

function getRegionData(regionLevelId){

        var url = "http://melatupa.azurewebsites.net/regionLevels/"+regionLevelId+"/"+"regions";
    
        // get the data from somewhere?
        return new Promise((resolve, reject) => {
    
            axios.get(url, {headers: {'Accept-Language': 'en'}})
            .then(regionresults => {
                console.log("Regions data: ", regionresults);
                const regions = regionresults.data.map(element => {
                    element.name = element.name;
                    element.shortname = element.shortname;
                    element.id = element.id;
                    element.order = element.order;
                    return element;
                });
                resolve(regions);
            })
            .catch(error => {
                console.log(error);
                reject();
            })
        });
    }

    
    function getScenarioCollectionData(scenarioCollectionId, regionId){
        
                var url = "http://melatupa.azurewebsites.net/scenarioCollection/"+regionId+"/region/"+scenarioCollectionId;
            
                // get the data from somewhere?
                return new Promise((resolve, reject) => {
            
                    axios.get(url, {headers: {'Accept-Language': 'en'}})
                    .then(scenarioresults => {
                        console.log("Scenarios data: ", scenarioresults);
                        const scenarios = scenarioresults.data.map(element => {
                            element.name = element.name;
                            element.description = element.description;
                            element.id = element.id;
                            element.order = element.order;
                            return element;
                        });
                        resolve(scenarios);
                    })
                    .catch(error => {
                        console.log(error);
                        reject();
                    })
                });
            }

    export default { getAllRegionLevelData, getRegionData, getScenarioCollectionData };