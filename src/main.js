// import {_renderLowestPoint, _renderOutTriangle, _renderRemainingCoords, _renderOutTriangles} from './debug'

export default function triangulate(coords) {
    const coordsToMutate = arrayClone(coords[0])

    const trianglesOut = []
    let pointsLength = coordsToMutate.length - 1
    const diagonals = pointsLength - 2

    let n = 0
    let i = 0

    let lowestRemainingPosition = 0
    let prevLowestY = null

    for (n; n < diagonals; n++) {
        i = 0
        for (i; i < pointsLength; i++) {
            if (isConvex(i) && isEmpty(i)) {
                prune(i)
                break
            }
        }
    }
    return trianglesOut

    function t(i, j, k) {
        return coordsToMutate[i][0] * (coordsToMutate[j][1] - coordsToMutate[k][1]) + coordsToMutate[j][0] * (coordsToMutate[k][1] - coordsToMutate[i][1]) + coordsToMutate[k][0] * (coordsToMutate[i][1] - coordsToMutate[j][1])
    }

    function getPositionOfLowestRemainingVertice() {
        let minY = coordsToMutate[0][1]

        if (prevLowestY === minY) return lowestRemainingPosition

        for (let ii = 0; ii < pointsLength; ii++) {
            if (minY > coordsToMutate[ii][1]) {
                minY = coordsToMutate[ii][1]
                lowestRemainingPosition = ii
            }
        }
        prevLowestY = minY
        // _renderLowestPoint(coords[0][lowestRemainingPosition])
        return lowestRemainingPosition
    }

    function ts(v) {
        const prev = v === 0 ? pointsLength - 1 : v - 1
        const next = v !== pointsLength - 1 ? v + 1 : 0
        if (t(prev, v, next) > 0) return 1
        return -1
    }

    function tv(ii, j, k) {
        const x = t(ii, j, k)
        if (x > 0) return 1
        else if (x < 0) return -1
        else return 0
    }

    function isConvex(v) {
        if (ts(v) * ts(getPositionOfLowestRemainingVertice()) > 0) return 1
        return 0
    }

    function isEmpty(v) {
        const prev = v === 0 ? pointsLength - 1 : v - 1
        const next = v !== pointsLength - 1 ? v + 1 : 0

        const tsv = tv(v, prev, next)
        for (let ii = 0; ii < pointsLength; ii++) {
            if ((ii === v) || (ii === prev) || (ii === next)) continue
            if ((tsv * tv(v, prev, ii) >= 0) && (tsv * tv(prev, next, ii) >= 0) && (tsv * tv(next, v, ii) >= 0)) return 0
        }
        return 1
    }

    function prune(v) {
        pointsLength--
        getOutTriangle(v)
        for (let ii = v; ii < pointsLength; ii++) {
            coordsToMutate[ii][0] = coordsToMutate[ii + 1][0]
            coordsToMutate[ii][1] = coordsToMutate[ii + 1][1]
        }
        // _renderRemainingCoords(coords, pointsLength)
        // _renderOutTriangles(trianglesOut)
    }

    function getOutTriangle(v) {
        const prev = v === 0 ? pointsLength : v - 1
        const next = v !== pointsLength ? v + 1 : 0

        const tri = [
            [coordsToMutate[prev][0], coordsToMutate[prev][1]],
            [coordsToMutate[v][0], coordsToMutate[v][1]],
            [coordsToMutate[next][0], coordsToMutate[next][1]]
        ]
        // _renderOutTriangle(tri)
        trianglesOut.push(tri)
    }

    function arrayClone(arr) {
        let i, copy
        if (Array.isArray(arr)) {
            copy = arr.slice(0)
            for (i = 0; i < copy.length; i++) {
                copy[ i ] = arrayClone(copy[ i ])
            }
            return copy
        } else if (typeof arr === 'object') {
            throw 'Cannot clone array containing an object!'
        } else {
            return arr
        }
    }

}
