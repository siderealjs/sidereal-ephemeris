import majorBodiesIDs from "./majorBodiesIDs.js";

const fetchData = async (
  majorBodyName,
  startDate = "2000-01-01",
  endDate = "2100-01-01"
) => {
  const baseUrl = "https://ssd.jpl.nasa.gov/api/horizons.api";

  const params = {
    format: "json",
    COMMAND: `'${majorBodiesIDs[majorBodyName]}'`,
    OBJ_DATA: "'YES'",
    MAKE_EPHEM: "'YES'",
    EPHEM_TYPE: "'VECTORS'",
    OUT_UNITS: "AU-D",
    CENTER: "'500@10'",
    START_TIME: `'${startDate}'`,
    STOP_TIME: `'${endDate}'`,
    STEP_SIZE: "'1 d'",
    VEC_TABLE: "1",
  };

  const queryString = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
  const url = `${baseUrl}?${queryString}`;

  console.log(url);
  const fetched = await fetch(url);
  const { result: apiResponse } = await fetched.json();

  return apiResponse;
};

// 2460531.500000000 = A.D. 2024-Aug-09 00:00:00.0000 TDB \n X = 7.363128281138523E-01 Y =-6.969568534803415E-01 Z = 3.500471829031955E-05\n2460532.500000000

export default fetchData;
