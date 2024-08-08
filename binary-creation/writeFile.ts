import fs from "fs";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const writeFile = (fileName, binaryData) => {
  const filePath = path.join(__dirname, `../data/${fileName}.bin`);

  fs.writeFileSync(filePath, binaryData);
};


export default writeFile;