var fs = require('fs');

fs.appendFile('mynewfile1.txt', 'Hello content! Newly added !', function (err) {
  if (err) throw err;
  console.log('Saved!');
});