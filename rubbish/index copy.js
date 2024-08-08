import buildUrl from "./src/fetchData.js"
import fs from "fs";


const url = buildUrl(499);

const fetched = await fetch(url);
const { result } = await fetched.json();

const content = (result.match(/\$\$SOE([\s\S]*?)\$\$EOE/) || [])[1]?.trim();

// Splitta il contenuto in righe
const lines = content.trim().split("\n");

// Array per memorizzare i dati analizzati
const data = [];

// Variabili per accumulare le righe di dati
let currentDate = null;
let currentData = {};

lines.forEach((line, index) => {
  if (index % 4 === 0) {
    // Righe di data e tempo
    currentDate = parseInt(line.split("=")[0].trim());
  } else if (index % 4 === 1) {
    // Righe di X, Y, Z
    const parts = line.split(/\s*=\s*/);

    currentData = {
      X: parseFloat(parts[1].split(" ")[0]),
      Y: parseFloat(parts[2].split(" ")[0]),
      Z: parseFloat(parts[3]),
    };
  }

  if (index % 4 === 2 && currentDate !== null) {
    // Aggiungi i dati all'array
    data.push({ date: currentDate, data: currentData });
  }
});

// Crea l'oggetto JSON
const json = createJSON(data);

// Scrivi l'oggetto JSON in un file (opzionale)
fs.writeFile("output.json", JSON.stringify(json, null, 2), "utf8", (err) => {
  if (err) {
    console.error("Errore durante la scrittura del file JSON:", err);
    return;
  }
  console.log("File JSON creato con successo!");
});

// Serializza i dati e scrivili su file
const binaryData = serializeData(json);
fs.writeFileSync("data.bin", binaryData);

console.log("Dati scritti in data.bin");

// Funzione per convertire i dati in binario
function serializeData(data) {
  const keys = Object.keys(data);
  const bufferArray = [];

  // Calcola la lunghezza totale del buffer
  let totalLength = 0;
  keys.forEach((key) => {
    totalLength += 8 + 8 + 8; // 8 bytes per X, Y, Z
  });

  const buffer = Buffer.alloc(totalLength);
  let offset = 0;

  keys.forEach((key) => {
    const { X, Y, Z } = data[key];
    buffer.writeDoubleBE(X, offset);
    offset += 8;
    buffer.writeDoubleBE(Y, offset);
    offset += 8;
    buffer.writeDoubleBE(Z, offset);
    offset += 8;
  });

  return buffer;
}

// Funzione per creare l'oggetto JSON
function createJSON(data) {
  const json = {};
  data.forEach((entry) => {
    json[entry.date] = entry.data;
  });
  return json;
}
