import axios from 'axios';

function getRegionLevels(){
    
        // get the data from somewhere?
        return new Promise((resolve, reject) => {
    
            axios.get("http://melatupa.azurewebsites.net/regionLevels", {headers: {'Accept-Language': 'en'}})
            .then(results => {
                console.log("Dataa tulee: ", results);
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

function getRegions(regionLevelId){

        var url = "http://melatupa.azurewebsites.net/regionLevels/"+regionLevelId+"/"+"regions";
    
        // get the data from somewhere?
        return new Promise((resolve, reject) => {
    
            axios.get(url, {headers: {'Accept-Language': 'en'}})
            .then(regionresults => {
                //console.log("Dataa tulee: ",regionresults);
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

    export default { getRegionLevels, getRegions };