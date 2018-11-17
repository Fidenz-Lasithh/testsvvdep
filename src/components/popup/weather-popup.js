import React from 'react';
import { Popup } from "react-mapbox-gl";

export default (props) => {
  const { station } = props;
  return (
    <Popup 
      coordinates={station.geometry.coordinates}
      offset={{
        'bottom-left': [12, -38],  'bottom': [0, -10], 'bottom-right': [-12, -38]
      }}
      onClick={props.onClick}
    >
      <p>Air temperature (C): {station.properties['Lufttemperatur (§C)']}</p>
      <p>Quality: {station.properties['Kvalitet']}</p>
      <p>Relative humidity (%): {station.properties['Relativ luftfuktighet (%)']}</p>
      <p>Quality: {station.properties['Kvalitet']}</p>
      <p>Roadway temperature (C): {station.properties['Vegbanetemperatur (§C)']}</p>
      <p>Surface conditions: {station.properties['Friksjon i vegbane']}</p>
      <p>Nedb?rsintensitet (mm/t): {station.properties['Nedb?rsintensitet (mm/t)']}</p>
      <p>Precipitation type: {station.properties['Nedb?rstype']}</p>
      <p>Visibility of precipitation (m): {station.properties['Sikt i nedb?r (m)']}</p>
      <p>Wind speed (m/s): {station.properties['Vindhastighet (m/s)']}</p>
      <p>Wind direction (0 - 360): {station.properties['Vindretning (0 - 360ø) (§)']}</p>
      <p>Windshield (m/s): {station.properties['Vindkast (m/s)']}</p>
      <p>Amount of water in roadway (mm): {station.properties['Mengde vann i vegbane (mm)']}</p>
      <p>Amount of ice in roadway (mm): {station.properties['Mengde is i vegbane (mm)']}</p>
      <p>Amount of snow in roadway (mm): {station.properties['Mengde sn? i vegbane (mm)']}</p>
    </Popup>
  );
}