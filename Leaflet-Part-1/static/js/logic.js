// URL to fetch the earthquake data from USGS
var geoURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Fetch the data and create features
d3.json(geoURL).then(data => {
    console.log(data); 
    createFeatures(data.features);
});

// Function to determine marker size based on earthquake magnitude
function getMarkerSize(magnitude) {
    return Math.sqrt(magnitude) * 5;
}

// Function to determine marker color based on earthquake depth
function getMarkerColor(depth) {
    if (depth > 70) {
        return 'darkred';
    } else if (depth > 50) {
        return 'red';
    } else if (depth > 30) {
        return 'orange';
    } else if (depth > 10) {
        return 'yellow';
    } else {
        return 'green';
    }
}



// Function to create features from the earthquake data
function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer) {
        layer.bindPopup(
            `<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`
        );
    }

    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: getMarkerSize(feature.properties.mag),
                fillColor: getMarkerColor(feature.geometry.coordinates[2]),
                color: "black",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        }
    });

    createMap(earthquakes);
}

// Function to create the map and add features
function createMap(earthquakes) {
    // Initialize the map centered on the US
    var map = L.map('map').setView([37.09, -95.71], 5);

    // Create the base layers
    var outdoor = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var grayscale = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        className: 'grayscale-map'
    });

    // Create a baseMaps object
    let baseMaps = {
        "Outdoor": outdoor,
        "Grayscale": grayscale
    };

    // Create an overlay object to hold the overlay layer
    let overlayMaps = {
        Earthquakes: earthquakes
    };

    // Add the street layer and earthquakes layer to the map
    map.addLayer(outdoor);
    map.addLayer(earthquakes);

    // Add a layer control
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

    // Add a legend to the map
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        var depths = [0, 10, 30, 50, 70];
        var colors = ['green', 'yellow', 'orange', 'red', 'darkred'];
    
        for (var i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
        }
    
        return div;
    };    

    legend.addTo(map);
}
