// draggable div functions is used from https://stackoverflow.com/questions/9334084/moveable-draggable-div
window.onload = addListeners;
var initPosX = 0;
var initPosY = 0;
var id;

function setId(object) {
    id = object.id;
}
function addListeners() {
    document.getElementById("card_1").addEventListener('mousedown', mouseDown, false);
    document.getElementById("card_2").addEventListener('mousedown', mouseDown, false);
    document.getElementById("card_3").addEventListener('mousedown', mouseDown, false);
    document.getElementById("card_4").addEventListener('mousedown', mouseDown, false);
    document.getElementById("card_5").addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

}

function mouseUp() {
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e) {
    initPosX = e.clientX;
    initPosY = e.clientY;
    console.log(initPosX);
    console.log(initPosY);
    window.addEventListener('mousemove', divMove, true);
}

function divMove(e) {
    var div = document.getElementById(id);
    div.style.position = 'absolute';
    div.style.top = (e.clientY- 130) + 'px';
    div.style.left = (e.clientX - 225) + 'px';
}