const http = require('http');
const fs = require('fs');
var requests = require('requests')

const homeFile = fs.readFileSync('home.html', 'utf-8');
const replaceVal = (tempVal, orgVal) => {
    let temprature = tempVal.replace('{%tempVal%}', orgVal.main.temp);
     temprature = temprature.replace('{%tempmin%}', orgVal.main.temp_min);
     temprature = temprature.replace('{%tempmax%}', orgVal.main.temp_max);
     temprature = temprature.replace('{%location%}', orgVal.main.name);
     temprature = temprature.replace('{%country%}', orgVal.sys.country);


}
const server = http.createServer((req, res) => {
    if (req.url == "/") {
      requests(
        "http://api.openweathermap.org/data/2.5/weather?q=pune&appid=221df17143658c9770b1071a372aca52"
      )
        .on("data", (chunk) => {
          const objdata = JSON.parse(chunk);
          const arrData = [objdata];
          // console.log(arrData[0].main.temp);
          const realTimeData = arrData
            .map((val) => replaceVal(homeFile, val))
            .join("");
          res.write(realTimeData);
          // console.log(realTimeData);
        })
        .on("end", (err) => {
          if (err) return console.log("connection closed due to errors", err);
          res.end();
        });
    } else {
      res.end("File not found");
    }
  });
  
  server.listen(8000, "127.0.0.1");
