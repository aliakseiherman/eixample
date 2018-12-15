var file = '../src/shared/service-proxies/service-proxies.ts';

var fs = require('fs')
fs.readFile(file, 'utf8', function (err,data) {
  
  var result = 
	data
		.split('"Accept": "application/json"')
		.join('"Accept": "application/json",\n\t\t\t\t"Authorization": "Bearer " + localStorage.getItem(\'token\')');

  fs.writeFile(file, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
  
});