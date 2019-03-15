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

    if (container.children.length != 0) {
        let picWidth = Number(window.getComputedStyle(root).getPropertyValue('--previous-img-width').slice(0, -2));
        let xDif = Number(window.getComputedStyle(root).getPropertyValue('--x-dif').slice(0, -2));
        
        
        if (picWidth != 0 && xDif > picWidth) {
            container.removeChild(container.children[0]);
            root.style.setProperty('--x-dif', "0px");
        }
    }
    
    let oldX = window.getComputedStyle(root).getPropertyValue('--x-dif').slice(0, -2);
    root.style.setProperty('--x-dif', Number(oldX) + 1 + "px");
    
    if (container.children.length != 0) {
        root.style.setProperty('--previous-img-width', container.children[0].offsetWidth + "px")
    }

    requestAnimationFrame(animate);
}

animate();