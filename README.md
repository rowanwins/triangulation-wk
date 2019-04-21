Based on the paper [Accurate, simple and efficient triangulation of a polygon by ear removal with lowest memory consumption](https://www.researchgate.net/publication/311245887_Accurate_simple_and_efficient_triangulation_of_a_polygon_by_ear_removal_with_lowest_memory_consumption)

- Works on polygons with holes

### Usage
Install via `npm install triangulation-wk`

````
const triangulate = require('triangulation-wk')
const polygon = [ [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ] ] ];
const triangles = triangulate(polygon)
````


### Comparisons
````
triangulation-wk x 95.80 ops/sec ±10.71% (75 runs sampled)
mapbox/earcut x 960 ops/sec ±1.62% (87 runs sampled)
Fastest is mapbox/earcut
````