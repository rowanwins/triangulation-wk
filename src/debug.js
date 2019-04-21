export function _renderLowestPoint(point) {
    const map = window.map
    const lowestPoint = L.marker([point[1], point[0]]).addTo(map)

    // debugger
    map.removeLayer(lowestPoint)
}

export function _renderOutTriangle(tri) {
    const map = window.map

    const triangle = L.geoJSON({type: 'Polygon', coordinates: [tri]}, {
        color: 'red',
        weight: 1,
        fillOpacity: 0
    }).addTo(map)

    // debugger
    map.removeLayer(triangle)
}

export function _renderRemainingCoords(poly, pointCount) {
    const map = window.map

    const countEl = window.document.getElementById('pointCount')
    countEl.innerHTML = pointCount

    const polyLyr = L.geoJSON({type: 'Polygon', coordinates: poly}, {
        color: 'red',
        weight: 1,
        fillOpacity: 0
    }).addTo(map)

    // debugger
    map.removeLayer(polyLyr)
}

export function _renderOutTriangles(triangles) {
    const map = window.map
    const lyrGroup = L.layerGroup([]).addTo(map)
    triangles.forEach(function (tri) {
        L.geoJSON({type: 'Polygon', coordinates: [tri]}, {
            color: 'red',
            weight: 1,
            fillOpacity: 0
        }).addTo(lyrGroup)
    })
    // debugger
    lyrGroup.clearLayers()
    map.removeLayer(lyrGroup)
}
