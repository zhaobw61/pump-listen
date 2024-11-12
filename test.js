import fs from 'fs';
import * as cheerio from 'cheerio';
fs.readFile('./detail.txt', 'utf8', (err, data) => {
  const cleanedText = data.replace(/\\[nt"\\]/g, '');

  const regex = /twitter:https:\/\/x\.com\/[a-zA-Z0-9_]+/;
  const matchRes = cleanedText.match(regex);
  console.log(matchRes[0]);
});
