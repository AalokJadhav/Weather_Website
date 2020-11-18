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
    if (req.url == '/') {
        requests('http://api.openweathermap.org/data/2.5/weather?q=pune&appid=221df17143658c9770b1071a372aca52')
            .on('data', function (chunk) {
                const objData = JSON.parse (chunk);
                const arrData = [objData];
                console.log(objData);
                console.log(arrData);
                console.log('temp :' , arrData[0].main.temp);

                const realTimeData = arrData.map((val) => {
                    console.log(val.main);
                    replaceVal(homeFile, val);
                    console.log(realTimeData);
                    res.write(realTimeData);
                })

            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
                console.log('end');
            });
    }
});
server.listen(8000, '127.0.0.1');
