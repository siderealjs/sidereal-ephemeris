import fs from 'fs';
import path from "path";

const __dirname = path.resolve();

// Calcola l'offset del record specifico
function calculateOffset(key: number, recordSize: number) {
  const baseKey = 2451544; // La chiave base (la più piccola chiave nel tuo esempio)

  return (key - baseKey) * recordSize;
}

// Leggi un record specifico dal file binario
export default function readRecord(key: number) {
  const filePath = path.join(__dirname, "./../data/data.bin");

  const recordSize = 24; // Dimensione di un record (8 byte per X + 8 byte per Y + 8 byte per Z)

  // Calcola l'offset per il record richiesto
  const offset = calculateOffset(key, recordSize);

  // Leggi solo il segmento del file necessario
  const buffer = Buffer.alloc(recordSize);
  const fd = fs.openSync(filePath, "r");
  fs.readSync(fd, buffer, 0, recordSize, offset);
  fs.closeSync(fd);

  // Crea un DataView per interpretare i dati
  const view = new DataView(buffer.buffer);

  // Leggi i valori X, Y, Z
  const X = view.getFloat64(0);
  const Y = view.getFloat64(8);
  const Z = view.getFloat64(16);

  return { X, Y, Z };
}
