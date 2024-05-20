# leaflet-challenge

These are the sources I used to help write my code: leafletjs.com, openstreetmap.org, google, and BCS — watching our cloud recordings, using instructor activity solutions and the class activities as references.

In this assignment, the task is to develop a way to visualize USGS data that will allow them to better educate the public and other government organizations on issues facing our planet.

## Assignment Description

This assignment is part of an activity that is broken down into two parts:

- Part 1: Create the Earthquake Visualization
- Part 2: Gather and Plot More Data (Optional with no extra points earning)

For this repository, only Part 1 has been completed. The code and documentation provided herein pertain solely to the implementation of the Earthquake Visualization.

![outdoormap](https://github.com/AlyssaChand/leaflet-challenge/assets/151655013/16ad0724-409d-48b2-8221-d4c4948b5645)

![outdoormappopup](https://github.com/AlyssaChand/leaflet-challenge/assets/151655013/07b03936-bf08-4e18-b363-64cc073e8da4)

![grayscalemap](https://github.com/AlyssaChand/leaflet-challenge/assets/151655013/a0fd5ec9-c8ae-465f-8b5d-c4e312cf6c72)

Here are the steps I did to achieve this:

#### 1. Fetching Earthquake Data
   The script starts by defining the URL (geoURL) from which earthquake data is fetched from the USGS API.
#### 2. Fetching and Processing Data
  It then uses D3.js to fetch the earthquake data asynchronously. Once the data is retrieved, it's logged to the console for debugging purposes, and then the createFeatures function is called, passing in the features of the fetched data.
#### 3. Determining Marker Size and Color
  Two functions, getMarkerSize and getMarkerColor, are defined to determine the size and color of the markers based on earthquake magnitude and depth, respectively.
#### 4. Creating Features
  The createFeatures function is responsible for creating features from the earthquake data. It defines an onEachFeature function to bind popups to each feature, providing information about the earthquake when its associated marker is clicked. It then creates a GeoJSON      layer (earthquakes) using Leaflet's L.geoJSON method, specifying options for each feature, including marker size and color.
#### 5. Creating the Map
  The createMap function initializes a Leaflet map centered on the US. It defines two base layers: "Outdoor" and "Grayscale". The "Outdoor" layer is a standard map, while the "Grayscale" layer is the same map but with a grayscale style. These layers are added to the         baseMaps object. The overlayMaps object contains a single entry for the earthquake data. The outdoor layer and earthquake layer are added to the map. Additionally, a layer control is added to allow users to toggle between different base layers and overlays. Finally, a     legend is added to the map to provide information about the depth of earthquakes.

### CSS

I added a grayscale filter and styled the legend in the CSS file to ensure that the map is displayed correctly and that additional features like the grayscale filter and legend are both functional and visually appealing.

- ####  Grayscale Filter
   The .grayscale-map img selector applies a grayscale filter to the map tiles, converting the map to black and white. This is done by setting the CSS filter property to grayscale(100%).
- ####  Legend Box Styling
   The .legend class styles the legend box with a white background, padding, rounded corners, and a shadow effect. The font size is set to ensure readability.
- ####  Legend Items Styling
   The .legend i class styles the color boxes in the legend. Each box is 20x20 pixels, displayed inline with a small margin for spacing, and aligned with the text for a clean look.
