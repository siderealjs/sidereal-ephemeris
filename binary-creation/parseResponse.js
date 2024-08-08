const parseResponse = (apiResponse) => {
  const content = (apiResponse.match(/\$\$SOE([\s\S]*?)\$\$EOE/) ||
    [])[1]?.trim();

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
  const json = {};
  data.forEach((entry) => {
    json[entry.date] = entry.data;
  });
  return json;
};

export default parseResponse;
