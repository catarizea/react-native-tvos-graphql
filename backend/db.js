const fs = require('fs');

const jsonString = fs.readFileSync(`${__dirname}/./dataSet.json`, 'utf-8');

module.exports = JSON.parse(jsonString);
