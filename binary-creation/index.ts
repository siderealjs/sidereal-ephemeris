import fetchData from "./fetchData.js";
import serializeData from "./serializeData.js";
import parseResponse from "./parseResponse.js";
import writeFile from "./writeFile";

const name = "earth";

const apiResponse = await fetchData(name);

const json = parseResponse(apiResponse);

const binaryData = serializeData(json);

writeFile(name, binaryData);

console.log(`Dati scritti in ${name}.bin`);
