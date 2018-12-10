let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let port = process.env.PORT || 3000;

let map = [
	['ground','ground','ground','ground','ground','ground','ground','grass','grass','grass'],
	['ground','ground','ground','ground','ground','ground','ground','ground','ground','ground'],
	['ground','ground','ground','ground','ground','ground','ground','ground','ground','ground'],
	['ground','ground','ground','ground','ground','ground','ground','ground','ground','ground'],
	['ground','ground','ground','ground','ground','ground','ground','ground','ground','ground'],
	['ground','ground','ground','ground','ground','ground','ground','ground','ground','ground'],
	['ground','ground','ground','ground','ground','ground','ground','ground','ground','ground'],
	['ground','ground','ground','ground','ground','ground','ground','ground','ground','ground'],
	['ground','ground','ground','ground','ground','ground','ground','ground','ground','ground'],
];

let x = 5;
let y = 3;
let direction = 'S';

let userSocket;
io.on('connection', function(socket){
	userSocket = socket;
	userSocket.emit('display', {'map': map,'player':{'x':x, 'y':y, 'direction':direction}});
	socket.on('input', function(key){
		if(key === 'ArrowUp') {
			movePlayer('up');
		}
		if(key === 'ArrowDown') {
			movePlayer('down');
		}
		if(key === 'ArrowLeft') {
			movePlayer('left');
		}
		if(key === 'ArrowRight') {
			movePlayer('right');
		}
		userSocket.emit('display', {'map': map,'player':{'x':x, 'y':y, 'd':d}});
	});
});

function movePlayer(destination) {
	movedSuccessful = false;
	switch (destination) {
		case 'up':
			// movedSuccessful = checkMove(xDestination, yDestination);
			movedSuccessful = true;
			y--;
			break;
		case 'down':
			// movedSuccessful = checkMove(xDestination, yDestination);
			movedSuccessful = true;
			y++;
			break;
		case 'left':
			// movedSuccessful = checkMove(xDestination, yDestination);
			movedSuccessful = true;
			x--;
			break;
		case 'right':
			// movedSuccessful = checkMove(xDestination, yDestination);
			movedSuccessful = true;
			x++;
			break;

		// checkTrainer
		// checkChangeMap
		// checkPokemon
	}	
}

http.listen(port, function(){
  console.log('listening on *:' + port);
});
