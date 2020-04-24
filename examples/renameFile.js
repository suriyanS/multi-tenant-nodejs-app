var fs = require('fs');

fs.rename('myrenamedfile.txt', 'suriyan.txt', function (err) {
  if (err) throw err;
  console.log('File Renamed!');
});