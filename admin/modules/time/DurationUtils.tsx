// Converts from seconds to 00:00:00
export function toString(rawSeconds: string | number, stringifyNull = false) {
  if (!rawSeconds) return stringifyNull ? "00:00:00" : undefined;
  if (typeof rawSeconds !== "number") {
    rawSeconds = parseInt(rawSeconds);
  }

  if (isNaN(rawSeconds)) return stringifyNull ? "00:00:00" : undefined;

  const hours = Math.floor(rawSeconds / 3600);
  const minutes = Math.floor(rawSeconds / 60) % 60;
  const seconds = rawSeconds % 60;

  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
}

// Converts from 00:00:00 to seconds
export function fromString(value: string) {
  const [hoursRaw, minutesRaw, secondsRaw] = value.split(":");
  const hours = parseInt(hoursRaw);
  if (isNaN(hours)) return 0;

  const minutes = parseInt(minutesRaw);
  if (isNaN(minutes)) return hours * 3600;

  const seconds = parseInt(secondsRaw);
  if (isNaN(seconds)) return hours * 3600 + minutes * 60;

  return hours * 3600 + minutes * 60 + seconds;
}
