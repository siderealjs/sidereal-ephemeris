function serializeData(data) {
  const keys = Object.keys(data);

  // Calcola la lunghezza totale del buffer
  let totalLength = 0;
  keys.forEach(() => {
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

export default serializeData;
