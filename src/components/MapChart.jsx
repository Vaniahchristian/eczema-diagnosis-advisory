import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';

// You can replace this with a more detailed Uganda GeoJSON
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/africa.json";

const MapChart = ({ data, title }) => {
  const colorScale = scaleQuantile()
    .domain(data.map(d => d.value))
    .range([
      "#ffedea",
      "#ffcec5",
      "#ffad9f",
      "#ff8a75",
      "#ff5533",
      "#e2492d",
      "#be3d26",
      "#9a311f",
      "#782618"
    ]);

  return (
    <div>
      <h3 className="text-center mb-4">{title}</h3>
      <ComposableMap
        projectionConfig={{
          scale: 400,
          center: [32.2903, 1.3733] // Approximate center of Uganda
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const regionData = data.find(d => d.region === geo.properties.name);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={regionData ? colorScale(regionData.value) : "#EEE"}
                  stroke="#FFF"
                  strokeWidth={0.5}
                />
              );
            })
          }
        </Geographies>
        {data.map(({ region, coordinates, value }) => (
          <Marker key={region} coordinates={coordinates}>
            <circle r={5} fill="#F00" stroke="#FFF" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={-10}
              style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "8px" }}
            >
              {`${region}: ${value}`}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default MapChart;
