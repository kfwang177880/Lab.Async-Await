const fs = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);

const mostFrequentWord = (text) => {
  const words = text.toLowerCase().match(/[^_\W]+/g);
  const tally = {};
  let mostFrequentWord = null;
  
  words.forEach(word => {
    tally[word] = (tally[word] || 0) + 1 ;
    if(!tally[mostFrequentWord] || tally[word] > tally[mostFrequentWord])
      mostFrequentWord = word;
  });
  return mostFrequentWord;
}

const findPassword = async () => {
  try {
    const poem1 = await readFileAsync("poems/starting-poem.txt", "utf-8");
    const poem2FileName = mostFrequentWord(poem1);
    const poem2 = await readFileAsync(`poems/${poem2FileName}.txt`, "utf-8");
    const poem3FileName = mostFrequentWord(poem2);;
    const poem3 = await readFileAsync(`poems/${poem3FileName}.txt`, "utf-8");
    const password = mostFrequentWord(poem3);
    console.log(password)
  } catch(e) {
  console.log("Error:", e)
  }
}

findPassword();
