const baseApiUrl = 'https://www.metaweather.com/api/location' // get API 
const searchApiUrl = `${baseApiUrl}/search` // search for location

class requestController { 
    addCorsHeader() { 
        $.ajaxPrefilter(options => {  // pre-filters requests 
            if (options.crossDomain && $.support.cors) { 
                options.url = 'https://the-ultimate-api-challenge.herokuapp.com/' + options.url; 
            } 
        }); 
    } 
     
 
 
    getLocation() { 
         this.addCorsHeader(); 
        $.getJSON(searchApiUrl, {query:'Jurong West'}).done(data => console.log(data)); 
     } 
 
     getWeatherData(location) { 
         $.getJSON(`${baseApiUrl}/$(location}`).done(console.log('here ur weather', data)); 
     } 
} 
 
const request = new requestController(); // call method 
request.getLocation();