const http = require("http");
const fs = require("fs");
var requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempVal, orgVal) => {
  let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
  temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
  temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
  temperature = temperature.replace("{%location%}", orgVal.name);
  temperature = temperature.replace("{%country%}", orgVal.sys.country);
  temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);

  return temperature;
};

const server = http.createServer((req, res) => {
  if (req.url == "/pune") {
    requests(
        'http://api.openweathermap.org/data/2.5/weather?q=pune&appid=221df17143658c9770b1071a372aca52'
        )
      .on("data", (chunk) => {
        const objdata = JSON.parse(chunk);
        const arrData = [objdata];
        // console.log(arrData[0].main.temp);
        const realTimeData = arrData
          .map((val) => replaceVal(homeFile, val))
          .join('')
        res.write(realTimeData);
        // console.log(realTimeData);
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        res.end();
      });
  } else if (req.url == "/kolhapur"){
        requests(
            'http://api.openweathermap.org/data/2.5/weather?q=kolhapur&appid=5333cd4efb2a839da304587febfec975'
        )
          .on("data", (chunk) => {
            const objdata = JSON.parse(chunk);
            const arrData = [objdata];
            // console.log(arrData[0].main.temp);
            const realTimeData = arrData
              .map((val) => replaceVal(homeFile, val))
              .join('')
            res.write(realTimeData);
            // console.log(realTimeData);
          })
          .on("end", (err) => {
            if (err) return console.log("connection closed due to errors", err);
            res.end();
          });
   } else if (req.url == "/mumbai"){
    requests(
        'http://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=6c01bd657e00331a81448b9485f0f7f9'
    )
      .on("data", (chunk) => {
        const objdata = JSON.parse(chunk);
        const arrData = [objdata];
        // console.log(arrData[0].main.temp);
        const realTimeData = arrData
          .map((val) => replaceVal(homeFile, val))
          .join('')
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



