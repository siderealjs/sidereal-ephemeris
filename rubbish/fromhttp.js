import buildUrl from "./src/jplUrl.js";

const url = buildUrl(499);

const fetched = await fetch(url);
const {result} = await fetched.json();

const extracted = (result.match(/\$\$SOE([\s\S]*?)\$\$EOE/) || [])[1]?.trim();
console.log(extracted);



