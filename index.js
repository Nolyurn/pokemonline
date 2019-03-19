let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let port = process.env.PORT || 3000;

let map = [
	['ground','ground','ground','ground','ground','ground','ground','grass','grass','grass', 'ground'],
	['ground','ground','ground','ground','ground','ground','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','ground','ground','ground','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','ground','ground','ground','ground','ground','ground','ground', 'ground'],
	['grass','grass','ground','ground','ground','ground','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','ground','ground','ground','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','ground','ground','ground','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','ground','ground','ground','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','ground','ground','ground','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','ground','ground','ground','ground','grass','grass','grass', 'ground'],
	['ground','ground','ground','ground','ground','ground','ground','grass','grass','grass', 'ground'],
	['ground','ground','ground','ground','ground','ground','ground','grass','grass','grass', 'ground'],
];

let users = {};

let userSocket;
io.on('connection', function(socket){
	users[socket.id] = {'x':4, 'y':4, 'direction':'S'};

	userSocket = socket;
	socket.emit('display', {'map': determinerMapUtilisateur(users[socket.id].x, users[socket.id].y),'player':users[socket.id], 'personnages': obtenirPersonnagesAffichables(socket.id)});
	socket.on('input', function(key) {
		let clientId = socket.client.conn['id'];
		if(key === 'ArrowUp') {
			movePlayer(clientId, 'up');
		}
		if(key === 'ArrowDown') {
			movePlayer(clientId, 'down');
		}
		if(key === 'ArrowLeft') {
			movePlayer(clientId, 'left');
		}
		if(key === 'ArrowRight') {
			movePlayer(clientId, 'right');
		}
		socket.emit('display', {'map': determinerMapUtilisateur(users[socket.id].x, users[socket.id].y),'player':users[socket.id], 'personnages': obtenirPersonnagesAffichables(socket.id)});

		for(let clientId of obtenirClientIdPersonnagesAffichables(socket.id)){
			console.log(socket.id, clientId);
			io.to(clientId).emit('display', {'map': determinerMapUtilisateur(users[clientId].x, users[clientId].y),'player':users[clientId], 'personnages': obtenirPersonnagesAffichables(clientId)});
		}
	});

	socket.on('disconnect', function(socket){
		delete users[socket.id];
	});
});

function obtenirPersonnagesAffichables(clientId){
	let personnagesAffichables = [];
	for (let userId in users) {
		if(userId != clientId){
			currentUser = users[clientId];
			otherUser = users[userId];
			if(otherUser.x >= currentUser.x-4 && otherUser.x <= currentUser.x+5 
				&& otherUser.y >= currentUser.y-4 && otherUser.y <= currentUser.y+5 ){
				personnagesAffichables.push(otherUser);
			}
		}
	}
	return personnagesAffichables;
}

function obtenirClientIdPersonnagesAffichables(clientId){
	let clientIdPersonnagesAffichables = [];
	for (let userId in users) {
		if(userId != clientId){
			currentUser = users[clientId];
			otherUser = users[userId];
			if(otherUser.x >= currentUser.x-4 && otherUser.x <= currentUser.x+5 
				&& otherUser.y >= currentUser.y-4 && otherUser.y <= currentUser.y+5 ){
				clientIdPersonnagesAffichables.push(userId);
			}
		}
	}
	return clientIdPersonnagesAffichables;
}

function determinerMapUtilisateur(x , y) {
	baseX = x - 4;
	baseY = y - 4;
	var userMap = []; // Initialize array
	for (var i = baseX ; i < baseX + 9; i++) {
	    userMap[i - baseX] = []; // Initialize inner array
	    for (var j = baseY; j < baseY + 9; j++) { // i++ needs to be j++
	        userMap[i - baseX][j - baseY] = map[j][i];
	    }
	}
	return userMap;
}

function movePlayer(clientId, destination) {
	movedSuccessful = false;
	switch (destination) {
		case 'up':
			// movedSuccessful = checkMove(xDestination, yDestination);
			movedSuccessful = true;
			users[clientId].direction = 'N'
			users[clientId].y--;
			break;
		case 'down':
			// movedSuccessful = checkMove(xDestination, yDestination);
			movedSuccessful = true;
			users[clientId].direction = 'S'
			users[clientId].y++;
			break;
		case 'left':
			// movedSuccessful = checkMove(xDestination, yDestination);
			movedSuccessful = true;
			users[clientId].direction = 'O'
			users[clientId].x--;
			break;
		case 'right':
			// movedSuccessful = checkMove(xDestination, yDestination);
			movedSuccessful = true;
			users[clientId].x++;
			break;

		// checkTrainer
		// checkChangeMap
		// checkPokemon
	}	
}

http.listen(port, function(){
  console.log('listening on *:' + port);
});
