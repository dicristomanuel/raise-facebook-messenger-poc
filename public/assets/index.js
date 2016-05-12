const socket = io();

socket.on('welcome', function(data) {
    console.log('welcome', data);
});

socket.on('update', function(data) {
    console.log('update', data);
});

const element = document.querySelector("#app");

element.addEventListener('click', onEmitClick);

function onEmitClick() {
  socket.emit('clicked');
}
