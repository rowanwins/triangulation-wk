<template>
  <div id="app">
    <div id="map"></div>
    <p id="pointCount"></p>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import './coords'
const dude = require('../../test/harness/dude.json')

import triangulate from '../../src/main'

// Hack to get the markers into Vue correctly
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
})

export default {
    name: 'App',
    mounted() {
        const poly = {type: 'Polygon', coordinates: [[[-1, -2], [51, 4], [19, 10], [18, 20], [5, 22], [42, 29], [23, 44], [14, 29], [7, 42], [-9, 39], [-1, -2]]]}

        const layer = L.geoJSON(dude)
        
        const map = window.map = L.map('map', {
            crs: L.CRS.Simple
        }).fitBounds(layer.getBounds())

        layer.addTo(map)
        map.addControl(new L.Coordinates())


        const out = triangulate(dude.coordinates)

        out.forEach(function (tri) {
            L.geoJSON({type: 'Polygon', coordinates: [tri]}, {
                fillOpacity: 0,
                weight: 1,
                color: 'red'
            }).addTo(map)
        })

    }
}

</script>

<style>
 html, body, #app, #map {
  height: 100%;
  width: 100%;
  margin: 0px;
 }

 #pointCount {
  position: absolute;
  bottom: 20px;
  left: 20px;
 }
</style>