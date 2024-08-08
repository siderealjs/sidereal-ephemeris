import fs from "fs";
import path from "path";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const filePath = path.join(__dirname, "mars.txt");

// Funzione per analizzare una riga di dati
function parseLine(line) {
  const parts = line.trim().split(/\s+/);
  const date = parseFloat(parts[0]);
  const data = {
    X: parseFloat(parts[2]),
    Y: parseFloat(parts[4]),
    Z: parseFloat(parts[6]),
  };
  return { date, data };
}

// Funzione per creare l'oggetto JSON
function createJSON(data) {
  const json = {};
  data.forEach((entry) => {
    json[entry.date] = entry.data;
  });
  return json;
}

// Leggi il file e analizza il contenuto
fs.readFile(filePath, "utf8", (err, content) => {
  if (err) {
    console.error("Errore durante la lettura del file:", err);
    return;
  }

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
});
