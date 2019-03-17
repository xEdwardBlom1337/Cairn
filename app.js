var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var https = require('https');

server.listen(8000, function () {
    console.log('Server is listening on port 8000');
});

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    var data = {
        pics: []
    };
    function getPic() {      
        return new Promise(resolve => {
            https.get("https://dog.ceo/api/breed/kuvasz/images/random", res => {
                res.setEncoding("utf8");
                let body = "";
                res.on("data", data => {
                    body += data;
                });
                res.on("end", () => {
                    body = JSON.parse(body);
                    resolve(body.message);
                });
            });
            
        });
    }

    async function pushPic() {
        data.pics.push(await getPic());
        socket.emit('initData', data);
    }
    
    for (let i = 0; i < 5; i++) {
        pushPic();
    }
    
});