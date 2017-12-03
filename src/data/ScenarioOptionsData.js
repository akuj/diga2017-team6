import axios from 'axios';

function getRegionLevels(){
    
        // get the data from somewhere?
        return new Promise((resolve, reject) => {
    
            axios.get("http://melatupa.azurewebsites.net/regionLevels?en")
            .then(results => {
                console.log(results);
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

    export default { getRegionLevels };