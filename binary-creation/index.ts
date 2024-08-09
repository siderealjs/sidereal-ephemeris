import fetchData from "./fetchData.js";
import serializeData from "./serializeData.js";
import parseResponse from "./parseResponse.js";
import writeFile from "./writeFile";

const args = process.argv.slice(2);

// args è un array che contiene i parametri passati
const [param1] = args;

// Esempio di utilizzo dei parametri
if (!param1) {
  console.warn(
    "No body selected. Please redo command with npm run bin-gen ${celestialBodyName}"
  );
  process.exit();
}

const name = param1;
const apiResponse = await fetchData(name, "2000-01-01", "2100-01-01");

const json = parseResponse(apiResponse);

// const jsonString = JSON.stringify(json, null, 2);
// Scrivi la stringa JSON su un file
// fs.writeFile('output.json', jsonString, (err) => {
//     if (err) {
//         console.error('Errore durante la scrittura del file:', err);
//         return;
//     }
//     console.log('File JSON scritto correttamente!');
// });

// console.log(json)

console.log(json["2460531"]);
console.log(json["2484018"]);

// {
//     X: 0.7363128281138523,
//     Y: -0.6969568534803415,
//     Z: 0.00003500471829031955
//   }
const binaryData = serializeData(json);

writeFile(name, binaryData);

console.log(`Dati scritti in ${name}.bin`);
