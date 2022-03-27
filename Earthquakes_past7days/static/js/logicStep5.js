// Add console.log to check to see if our code is working.
console.log("working");

// // Create the map object with a center and zoom level.
// // let map = L.map('mapid').setView([30, 30], 2);
// let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
// });


// let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
// });


// // We create the tile layer that will be the background of our map.
// let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
// });

// // We create the dark view tile layer that will be an option for our map.
// let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
// });

// Streets view tile layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// SatelliteStreets view tile layer
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets,
    // "Day Navigation": day,
    // "Night Navigation": night,
    // Light: light,
    // Dark: dark,
};

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();
// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes
};





// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
})


// Then we add a control to the map that will allow the user to change
// which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// // Pass our map layers into our layers control and add the layers control to the map.
// L.control.layers(baseMaps).addTo(map);


// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// // Accessing the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/sarcars/13_Mapping_Earthquakes/main/majorAirports.json";

// // Accessing the Toronto airline routes GeoJSON URL.
// let torontoData = "https://raw.githubusercontent.com/sarcars/13_Mapping_Earthquakes/main/torontoRoutes.json";

// // Accessing the Toronto neighborhoods GeoJSON URL.
// let torontoHoods = "https://raw.githubusercontent.com/sarcars/13_Mapping_Earthquakes/main/torontoNeighborhoods.json";

// let earthquakeLast7Days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Create a style for the lines.
// let myStyle = {
//     color: "blue",
//     weight: 1,
//     fillColor: "yellow",
    
// }
// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    //   // Creating a GeoJSON layer with the retrieved data.
    //   L.geoJSON(data).addTo(map);
    // });

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into two separate functions
// to calculate the color and radius
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

        // This function determines the color of the circle based on the magnitude of the earthquake.
    function getColor(magnitude) {
        if (magnitude > 5) {
        return "#ea2c2c";
        }
        if (magnitude > 4) {
        return "#ea822c";
        }
        if (magnitude > 3) {
        return "#ee9c00";
        }
        if (magnitude > 2) {
        return "#eecc00";
        }
        if (magnitude > 1) {
        return "#d4ee00";
        }
        return "#98ee00";
    }

    // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude) {
        if (magnitude === 0) {
         return 1;
        }
        return magnitude * 4;
    }


    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {

      // We turn each feature into a circleMarker on the map.
    
            pointToLayer: function(feature, latlng) {
                    console.log(data);
                    return L.circleMarker(latlng);
                },
                 style: styleInfo,
                // We create a popup for each circleMarker to display the magnitude and
                //  location of the earthquake after the marker has been created and styled.
                onEachFeature: function(feature, layer) {
                layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
                }       
    }).addTo(earthquakes);

      //Then we add the eqrthquake layer to our map
    earthquakes.addTo(map);
      // Create a legend control object  
    let legend = L.control({
        position: 'bottomright'
    });

    // Then add all the details for the legend.
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
    
        const magnitudes = [0, 1, 2, 3, 4, 5];
        const colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"
        ];
        // Looping through our intervals to generate a label with a colored square for each interval.
        for (var i = 0; i < magnitudes.length; i++) {
            console.log(colors[i]);
            div.innerHTML +=
             "<i style='background: " + colors[i] + "'></i> " +
            magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
        }
        return div;
    };
    

    legend.addTo(map);

});




// // Grabbing our GeoJSON data.
// d3.json(torontoHoods).then(function(data) {
//     console.log(data);
// //   // Creating a GeoJSON layer with the retrieved data.
// //   L.geoJSON(data).addTo(map)
 
//   L.geoJSON(data, {
//     style: myStyle,
//     onEachFeature: function(feature, layer) {
//         console.log(layer);
//         layer.bindPopup("<h4>" + "Neighborhood: " + feature.properties.AREA_NAME +"</h4>");
//        }
//     }).addTo(map);
// });

// // Grabbing our GeoJSON data.
// d3.json(torontoData).then(function(data) {
//     console.log(data);
//   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJSON(data).addTo(map);
// });



// // Grabbing our GeoJSON data. (using onEachFeature Callback function)
// L.geoJSON(airportData, {
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h2>" + "Airport code: " + feature.properties.faa + "</h2> <hr><h3>Airport name: "  + feature.properties.name +"</h3>");
//    }
// }).addTo(map);


//---------------------------------------------------------------------------------------------------------------


// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// // // Grabbing our GeoJSON data. (using PointToLayer Callback function)
// // L.geoJson(sanFranAirport, {
// //   // We turn each feature into a marker on the map.
// //   pointToLayer: function(feature, latlng) {
// //     console.log(feature);
// //     return L.marker(latlng)
// //     .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>"  + feature.properties.city + ", " + feature.properties.country +"</h3>");
// //     // .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
// //   }

// // }).addTo(map);


// // Grabbing our GeoJSON data. (using onEachFeature Callback function)
// L.geoJSON(sanFranAirport, {
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h2>" + "Airport code: " + feature.properties.faa + "</h2> <hr><h3>Airport name: "  + feature.properties.name +"</h3>");
//    }
// }).addTo(map);


// function onEachFeature(feature, layer) {
//   layer.bindPopup("<h3>" + feature.properties.place +
//     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
// }

// // We create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
// });

// // Accessing the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/sarcars/13_Mapping_Earthquakes/main/majorAirports.json";


// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

//---------------------------------------------------------------------------------------


// // Create the map object with a center and zoom level.
// // let map = L.map("mapid", {
// //     center: [
// //       40.7, -94.5
// //     ],
// //     zoom: 4
// //   });

// // Coordinates for each point to be used in the polyline.
// let line = [
//     [37.6213, -122.3790],
//     [30.1975, -97.6664],
//     [43.6777, -79.6248],
//     [40.7128, -74.0059],
//     [44.8848, -93.2223]
//   ];

// // Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
//     color: "blue",
//     dashArray: '5, 5',
//     weight: 2,
//     mapOpacity: 0.5
//   }).addTo(map);

// Get data from cities.js
// let cityData = cities

// // Loop through the cities array and create one marker for each city.
// // cityData.forEach(function(city) {
// //     console.log(city)
// //     L.circleMarker(city.location, {
// //         radius: city.population/100000
// //     })
// //     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
// //   .addTo(map);
// // });

// //skilldrill to make orange and dark
// cityData.forEach(function(city) {
//     console.log(city)
//     L.circleMarker(city.location, {
//         radius: city.population/200000,
//         color: "orange",
//         fillColor: "orange",
//         // fillOpacity: 0.5,
//         weight: 4
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//   .addTo(map);
// });


//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);
// Add a cicle to the map
// L.circle([34.0522, -118.2437], {
//     radius: 100
//  }).addTo(map);


// L.circleMarker([34.0522, -118.2437], {
//     radius: 300,
//     color: "black",
//     fillColor: '#ffffa1',
//     fillOpacity: 0.5
//  }).addTo(map);



//  let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/dark-v10',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY

// We create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY
// });
// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// // We create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
// });

// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);