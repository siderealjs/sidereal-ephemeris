import path from "path";
import { BodyName } from "./types/BodyName.type.js";
import { Ephemeris } from "./models/Ephemeris.js";
import { fileURLToPath } from "url";

const loadEphemeris = (bodyName: BodyName) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.resolve(__dirname, `../data/${bodyName}.bin`);

  return new Ephemeris(bodyName, filePath);
};

export default loadEphemeris;
