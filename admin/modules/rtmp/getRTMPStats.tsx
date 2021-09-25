export default async function getRTMPStats(statHost: string) {
  const statUrl = `http://${statHost}/stat`;
  const response = await fetch(statUrl, { mode: "no-cors" });
  console.log(response);
  const text = await response.text();
  return text;
}
