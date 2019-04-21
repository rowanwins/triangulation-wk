(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.triangulation = factory());
}(this, function () { 'use strict';

    // import {_renderLowestPoint, _renderOutTriangle, _renderRemainingCoords, _renderOutTriangles} from './debug'

    function triangulate(coords) {
        const coordsToMutate = coords.slice(0);

        const trianglesOut = [];
        let pointsLength = coordsToMutate[0].length - 1;
        const diagonals = pointsLength - 3;

        let n = 0;
        let i = 0;

        for (n; n < diagonals; n++) {
            i = 0;
            for (i; i < pointsLength; i++) {
                if (isConvex(i) && isEmpty(i)) {
                    prune(i);
                    break
                }
            }
        }
        prune(0);
        return trianglesOut

        function t(i, j, k) {
            return coordsToMutate[0][i][0] * (coordsToMutate[0][j][1] - coordsToMutate[0][k][1]) + coordsToMutate[0][j][0] * (coordsToMutate[0][k][1] - coordsToMutate[0][i][1]) + coordsToMutate[0][k][0] * (coordsToMutate[0][i][1] - coordsToMutate[0][j][1])
        }

        function lv() {
            let out = 0;
            let miny = coordsToMutate[0][0][1];

            for (let ii = 0; ii < pointsLength; ii++) {
                if (miny > coordsToMutate[0][ii][1]) {
                    miny = coordsToMutate[0][ii][1];
                    out = ii;
                }
            }
            // _renderLowestPoint(coords[0][out])
            return out
        }

        function ts(v) {
            const prev = v === 0 ? pointsLength - 1 : v - 1;
            const next = v !== pointsLength - 1 ? v + 1 : 0;
            if (t(prev, v, next) > 0) return 1
            return -1
        }

        function tv(ii, j, k) {
            const x = t(ii, j, k);
            if (x > 0) return 1
            else if (x < 0) return -1
            else return 0
        }

        function isConvex(v) {
            if (ts(v) * ts(lv()) > 0) return 1
            return 0
        }

        function isEmpty(v) {
            const prev = v === 0 ? pointsLength - 1 : v - 1;
            const next = v !== pointsLength - 1 ? v + 1 : 0;

            const tsv = tv(v, prev, next);
            for (let ii = 0; ii < pointsLength; ii++) {
                if ((ii === v) || (ii === prev) || (ii === next)) continue
                if ((tsv * tv(v, prev, ii) >= 0) && (tsv * tv(prev, next, ii) >= 0) && (tsv * tv(next, v, ii) >= 0)) return 0
            }
            return 1
        }

        function prune(v) {
            pointsLength--;
            getOutTriangle(v);
            for (let ii = v; ii < pointsLength; ii++) {
                coordsToMutate[0][ii][0] = coordsToMutate[0][ii + 1][0];
                coordsToMutate[0][ii][1] = coordsToMutate[0][ii + 1][1];
            }
            // _renderRemainingCoords(coords, pointsLength)
            // _renderOutTriangles(trianglesOut)
        }

        function getOutTriangle(v) {
            const prev = v === 0 ? pointsLength : v - 1;
            const next = v !== pointsLength ? v + 1 : 0;

            const tri = [
                [coordsToMutate[0][prev][0], coordsToMutate[0][prev][1]],
                [coordsToMutate[0][v][0], coordsToMutate[0][v][1]],
                [coordsToMutate[0][next][0], coordsToMutate[0][next][1]]
            ];
            // _renderOutTriangle(tri)
            trianglesOut.push(tri);
        }
    }

    return triangulate;

}));
