const http = require('http');
const fs = require('fs');
var requests = require('requests')

const homeFile = fs.readFileSync('home.html', 'utf-8');

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        requests('http://api.openweathermap.org/data/2.5/weather?q=pune&appid=221df17143658c9770b1071a372aca52')
            .on('data', function (chunk) {
                const objData = JSON.parse
                console.log(chunk)
                console.log(objData)

            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);

                console.log('end');
            });
    }
});
server.listen(8000, '127.0.0.1');
