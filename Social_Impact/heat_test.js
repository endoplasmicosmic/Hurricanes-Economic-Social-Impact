var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

fetch('hurricane_data.geojson')
    .then(response => response.json())
    .then(data => {
        // Extract coordinates for the heat map
        var heatMapData = data.features.map(feature => [
            feature.geometry.coordinates[1], // Latitude
            feature.geometry.coordinates[0]  // Longitude
        ]);

        // Define a custom gradient
        var gradient = {
            0.0: 'yellow',
            0.25: 'orange',
            0.5: 'red'
        };

        // Define options for the heat layer
        var heatLayerOptions = {
            radius: 25,  // Adjust radius to control the size of the heat points
            blur: 35,    // Adjust blur to control the spread of the heat points
            gradient: gradient,  // Apply custom gradient
            maxZoom: 17, // Adjust max zoom level
            minOpacity: 0.2  // Adjust minimum opacity
        };

        // Add the heat map layer with custom options to the map
        L.heatLayer(heatMapData, heatLayerOptions).addTo(map);
    });
