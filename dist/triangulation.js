(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.triangulation = factory());
}(this, function () { 'use strict';

    function triangulate(coords) {

        const trianglesOut = [];

        let pointsLength = coords[0].length - 1;
        const diagonals = pointsLength - 3;

        let i = 0;
        let n = 0;

        for (n; n < diagonals; n++) {
            for (i; i < pointsLength; i++) {
                if (isConvex(i) && isEmpty(i)) {
                    prune(i);
                    break
                }
            }
        }
        return trianglesOut

        function t(i, j, k) {
            return coords[0][i][0] * (coords[0][j][1] - coords[0][k][1]) + coords[0][j][0] * (coords[0][k][1] - coords[0][i][1]) + coords[0][k][0] * (coords[0][i][1] - coords[0][j][1])
        }

        function lv() {
            let out = 0;
            let miny = coords[0][0][1];

            for (let i = 0; i < pointsLength; i++) {
                if (miny > coords[0][i][1]) {
                    miny = coords[0][i][1];
                    out = i;
                }
            }
            return out
        }

        function ts(v) {
            let a = (v - 1);
            let b = (v + 1);
            if (a === -1) a = pointsLength - 1;
            if (b === pointsLength) b = 0;
            if (t(a, v, b) > 0) return 1
            return -1
        }

        function tv(i, j, k) {
            const x = t(i, j, k);
            if (x > 0) return 1
            else if (x < 0) return -1
            return 0
        }

        function isConvex(v) {
            if (ts(v) * ts(lv()) > 0) return 1
            return 0
        }

        function isEmpty(v) {
            let a = (v - 1);
            let b = (v + 1);
            if (a === -1) a = pointsLength - 1;
            if (b === pointsLength) b = 0;

            const tsv = tv(v, a, b);
            for (let i = 0; i < pointsLength; i++) {
                if ((i === v) || (i === a) || (i === b)) continue
                if ((tsv * tv(v, a, i) >= 0) && (tsv * tv(a, b, i) >= 0) && (tsv * tv(b, v, i) >= 0)) return 0
            }
            return 1
        }

        function prune(v) {
            
            pointsLength--;
            getOutTriangle(i);
            for (let i = v; i < pointsLength; i++) {
                coords[0][i][0] = coords[0][i + 1][0];
                coords[0][i][1] = coords[0][i + 1][1];
            }
        }

        function getOutTriangle(i) {
            const prev = i === 0 ? pointsLength - 1 : i - 1;
            const next = i !== pointsLength ? i + 1 : 0;

            trianglesOut.push([
                [coords[0][prev][0], coords[0][prev][1]],
                [coords[0][i][0], coords[0][i][1]],
                [coords[0][next][0], coords[0][next][1]]
            ]);
        }
    }

    return triangulate;

}));
