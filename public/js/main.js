var container = document.getElementById('container');

var pics = [];
var displayedPics = [];


var socket = io('localhost:8000');
socket.on('initData', function (data) {
    for (let pic of data.pics) {
        pics.push(pic);
    }
    
});

function animate() {
    for (pic of pics) {
        if (!displayedPics.includes(pic)) {
            let tmp = document.createElement("img");
            tmp.src = pic
            container.appendChild(tmp);
            displayedPics.push(pic);
        }
    }
    
    requestAnimationFrame(animate);
}

animate();