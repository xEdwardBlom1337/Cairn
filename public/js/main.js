var container = document.getElementById('container');

var pics = [];

var socket = io('localhost:8000');
socket.on('initData', function (data) {
    console.log(data);
    
});