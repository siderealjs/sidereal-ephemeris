export const calculateJulianDay = (date: Date) => {
  const baseKey = 2451544; // La chiave base (la più piccola chiave nel tuo esempio)

  // Definisci l'epoca standard (1 gennaio 2000 00:00 UTC)
  const epoch = new Date(Date.UTC(2000, 0, 1, 0, 0, 0));
  // Calcola la differenza in millisecondi tra la data fornita e l'epoca
  const differenceInMillis = date.getTime() - epoch.getTime();

  // Converti la differenza da millisecondi a giorni
  const differenceInDaysFloat = differenceInMillis / (1000 * 60 * 60 * 24);

  const differenceInDays = Math.round(differenceInDaysFloat);

  return differenceInDays + baseKey;
};
