# Sidereal-Ephemeris

Sidereal-Ephemeris is a JavaScript library designed to handle ephemerides from the [JPL Solar System Dynamics Group](https://ssd.jpl.nasa.gov/). 

It stores these ephemerides in highly compressed binary files and provides methods to read and utilize this data efficiently.

## Features

- **Compressed Ephemerides:** Store and manage JPL ephemerides in compact binary formats.
- **Efficient Access:** Methods to efficiently read and utilize ephemeris data.
- **Compatibility:** Designed to be used in conjunction with the [Sidereal](https://github.com/siderealjs/sidereal) library but can be used independently.

## Installation

To install Sidereal-Ephemeris, use npm:

```bash
npm install sidereal-ephemeris
```

## Basic usage
Sidereal-Ephemeris is primarily meant to be used with the Sidereal library. 

### With Sidereal 
To use Sidereal-Ephemeris with Sidereal, simply import the desired ephemerides using the useEphemeris method. The Sidereal library will handle the rest.
``` javascript
import Sidereal from "sidereal";
import { loadEphemeris } from "sidereal-ephemeris";

const sidereal = new Sidereal();

// Load ephemerides for specific celestial bodies
const venusEphemeris = loadEphemeris('venus');
const earthEphemeris = loadEphemeris('earth');

sidereal.useEphemeris([venusEphemeris, earthEphemeris]);

const venus = sidereal.planet('venus');

```

### Standalone
Sidereal-Ephemeris can also be used independently to access and manage ephemerides data. Here’s how you can load and use ephemerides directly:

``` javascript
const marsEphemeris = loadEphemeris('mars');

const {x,y,z} = marsEphemeris.getPositionAtDate(new Date());

console.log(`Current ${marsEphemeris.name} coordinates:`);
console.log(x,y,z);

```
Result

```
Current mars coordinates:
1.18639001969063 0.8157971635742206 -0.012003712610288913
```


## License
Sidereal is licensed under the [MIT License](https://github.com/siderealjs/sidereal-ephemeris?tab=MIT-1-ov-file#readme).

