import fs from "fs";
import { calculateJulianDay } from "../utils/dates.js";
import { BodyName } from "./../types/BodyName.type.js";


export class Ephemeris {
  public name: string;
  private filePath: string;

  constructor(bodyName: BodyName, filePath: string) {
    this.name = bodyName;
    this.filePath = filePath;
  }

  getPositionAtDate = (date: Date) => {
    const dateMidnight = new Date(date.getTime());
    dateMidnight.setHours(1, 0, 0);

    const dateNextMidnight = new Date(date.getTime());
    dateNextMidnight.setDate(date.getDate() + 1);
    dateNextMidnight.setHours(1, 0, 0);

    const ratio =
      1 - (dateNextMidnight.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

    const keyMidnight = calculateJulianDay(dateMidnight);
    const keyNextMidnight = calculateJulianDay(dateNextMidnight);

    // Calcola l'offset per il record richiesto
    const recordMidnight = this.getRecordAtKey(keyMidnight);
    const recordNextMidnight = this.getRecordAtKey(keyNextMidnight);

    const x =
      recordMidnight.x + (recordNextMidnight.x - recordMidnight.x) * ratio;
    const y =
      recordMidnight.y + (recordNextMidnight.y - recordMidnight.y) * ratio;
    const z =
      recordMidnight.z + (recordNextMidnight.z - recordMidnight.z) * ratio;

    return { x, y, z };
  };

  private getRecordAtKey = (key: number) => {
    // Dimensione di un record (8 byte per X + 8 byte per Y + 8 byte per Z) tipo double in IEEE 754 = 8BYTE

    const recordSize = 24;

    const firstKey = 2451544;
    const offset = (key - firstKey) * recordSize;

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
