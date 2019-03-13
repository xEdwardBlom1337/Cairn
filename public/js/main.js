var container = document.getElementById('container');
var root = document.documentElement;

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

    
    let oldX = window.getComputedStyle(root).getPropertyValue('--x-dif').slice(0, -2);
    console.log(oldX);
    root.style.setProperty('--x-dif', Number(oldX) + 1 + "px")
    
    requestAnimationFrame(animate);
}

animate();