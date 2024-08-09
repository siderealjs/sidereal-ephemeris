import { BodyName } from "../types/BodyName.type.js";
import fs from "fs";
import { calculateJulianDay } from "../utils/dates.js";

export class Ephemeris {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  getPositionAtDate = (date: Date) => {
    // Dimensione di un record (8 byte per X + 8 byte per Y + 8 byte per Z) tipo double in IEEE 754 = 8BYTE
    const recordSize = 24;

    const firstKey = 2451544;
    const key = calculateJulianDay(date);


    // Calcola l'offset per il record richiesto
    const offset = (key - firstKey) * recordSize

    // Leggi solo il segmento del file necessario
    const buffer = Buffer.alloc(recordSize);
    const fd = fs.openSync(this.filePath, "r");
    fs.readSync(fd, buffer, 0, recordSize, offset);
    fs.closeSync(fd);

    // Crea un DataView per interpretare i dati
    const view = new DataView(buffer.buffer);

    // Leggi i valori X, Y, Z
    const x = view.getFloat64(0);
    const y = view.getFloat64(8);
    const z = view.getFloat64(16);

    return { x, y, z };
  };
}
