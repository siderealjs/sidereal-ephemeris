import loadEphemerisFn from "./src/loadEphemeris";

declare const loadEphemeris: typeof loadEphemerisFn;

declare const SiderealEphemeris: {
  loadEphemeris: typeof loadEphemerisFn;
};

export { loadEphemeris };

export default SiderealEphemeris;
