<template>
  <div id="app"></div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import './coords'

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
  mounted: function () {
    const poly = {type: 'Polygon', coordinates: [[[-1.7578125, -2.460181181020993],[51.67968749999999,4.565473550710278],[19.6875,10.487811882056695],[18.28125,20.3034175184893],[5.9765625,22.59372606392931],[42.1875,29.22889003019423],[ 23.90625,44.59046718130883], [14.0625,29.22889003019423],[ 7.734374999999999,42.293564192170095],[-9.4921875,39.639537564366684],[-1.7578125,-2.460181181020993]]]}

    const layer = L.geoJSON(poly)
    let map = window.map = L.map('app', {
      crs: L.CRS.Simple
    }).fitBounds(layer.getBounds())  

    layer.addTo(map)
    map.addControl(new L.Coordinates());


    const out = triangulate(poly.coordinates)

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
 html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0px;
 }
</style>