let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let port = process.env.PORT || 3000;

let map = [
	['ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','ground','ground','ground','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','ground','ground','ground','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','rock','rock','rock','rock','rock','rock', 'rock','rock','rock','rock','rock','rock','rock','ground','ground','ground','ground', 'ground'],
	['grass','grass','ground','rock','ground','ground','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','rock','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','grass','grass','grass', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','grass','grass','grass', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','grass','grass','grass', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['grass','grass','ground','rock','ground','ground','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','rock','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','grass','grass','grass', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','grass','grass','grass', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','grass','grass','grass', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['grass','grass','ground','rock','ground','ground','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','rock','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','rock','rock','rock','rock','rock','rock', 'rock','rock','rock','rock','rock','rock','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','ground','ground','ground', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','grass','grass','grass', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','grass','grass','grass', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
	['ground','ground','ground','rock','ground','ground','ground','grass','grass','grass', 'ground', 'ground','ground','ground','ground','ground','rock','ground','ground','ground','ground', 'ground'],
];

let users = {};

let userSocket;
io.on('connection', function(socket){
	users[socket.id] = {'x':4, 'y':4, 'direction':'S'};

	userSocket = socket;
	socket.emit('display', {'map': determinerMapUtilisateur(users[socket.id].x, users[socket.id].y),'player':users[socket.id], 'personnages': obtenirPersonnagesAffichables(socket.id)});
	socket.on('input', function(key) {
		let clientId = socket.client.conn['id'];
		let moveSuccessful = false;
		if(key === 'ArrowUp') {
			moveSuccessful = movePlayer(clientId, 'up');
		}
		if(key === 'ArrowDown') {
			moveSuccessful = movePlayer(clientId, 'down');
		}
		if(key === 'ArrowLeft') {
			moveSuccessful = movePlayer(clientId, 'left');
		}
		if(key === 'ArrowRight') {
			moveSuccessful = movePlayer(clientId, 'right');
		}
		socket.emit('display', {'map': determinerMapUtilisateur(users[socket.id].x, users[socket.id].y),'player':users[socket.id], 'personnages': obtenirPersonnagesAffichables(socket.id)});

		// Se faire afficher auprès des autres joueurs à portée de vue
		for(let clientId of obtenirClientIdPersonnagesAffichables(socket.id)){
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
			if(otherUser.x >= currentUser.x-4 && otherUser.x < currentUser.x+5 
				&& otherUser.y >= currentUser.y-4 && otherUser.y < currentUser.y+5 ){
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
			if(otherUser.x >= currentUser.x-4 && otherUser.x < currentUser.x+5 
				&& otherUser.y >= currentUser.y-4 && otherUser.y < currentUser.y+5 ){
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
	let moveSuccessful;
	let destinationX;
	let destinationY;
	switch (destination) {
		case 'up':
			destinationY = users[clientId].y - 1;
			moveSuccessful = movePossible(users[clientId].x, destinationY);
			if(moveSuccessful) {	
				users[clientId].y = destinationY;
			}
			users[clientId].direction = 'N'
			break;
		case 'down':
			destinationY = users[clientId].y + 1;
			moveSuccessful = movePossible(users[clientId].x, destinationY);
			if(moveSuccessful) {
				users[clientId].y = destinationY;
			}
			users[clientId].direction = 'S'
			break;
		case 'left':
			destinationX = users[clientId].x - 1;
			moveSuccessful = movePossible(destinationX, users[clientId].y)
			if(moveSuccessful) {
				users[clientId].x = destinationX;
			}
			users[clientId].direction = 'O'
			break;
		case 'right':
			destinationX = users[clientId].x + 1;
			moveSuccessful = movePossible(destinationX, users[clientId].y);
			if(moveSuccessful) {
				users[clientId].x = destinationX;
			}
			users[clientId].direction = 'O'
			break;

		// checkTrainer
		// checkChangeMap
		// checkPokemon
	}	
	return moveSuccessful;
}

function movePossible(x, y) {
	if(map[y][x] == 'rock') {
		return false;
	}
	return true;
}

http.listen(port, function(){
  console.log('listening on *:' + port);
});
