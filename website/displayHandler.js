let canvas  = document.querySelector('#game');
	let context = canvas.getContext('2d');
	let tileSize = 16;

	function loadImage(path) {
		return new Promise((fulfill, reject) => {
			let imageObj = new Image();
			imageObj.src = path;
			imageObj.onload = () => fulfill(imageObj);
		});
	}

	function getPartialImage(image, startX, startY, width, height) {
		let canvasPartial = document.createElement('canvas');
		let context = canvasPartial.getContext('2d');
		canvasPartial.width = width; 
		canvasPartial.height = height;

		context.drawImage(image, startX, startY, width, height,0,0,width,height);

		return new Promise((fulfill, reject) => {
			let tile = new Image();
			tile.src = canvasPartial.toDataURL('image/png');
			tile.onload = () => fulfill(tile);
		}, canvasPartial);
	}

	Promise.all([
		loadImage("./tileset_floor.png"),
		loadImage("./tileset_perso.png"),
	])
	.then((images) => {
		const tilesetConstante = {};
		tilesetConstante['tilesetFloor'] = images[0];
		tilesetConstante['tilesetPerso'] = images[1];

		socket.on('display', function(gameInformation) {
			afficherSol(gameInformation.map);
			afficherPersonnage(gameInformation.player.x, gameInformation.player.y, gameInformation.player.d);
		});
		function drawTileOnCanvas(context,image,i,j){
			context.drawImage(image,((i)*tileSize), ((j)*tileSize), tileSize, tileSize)
		}
		function afficherSol(map){
			for(let i = 0; i < map[0].length; i++) {
				for(let j = 0; j < map.length; j++) {
					caseMap = displayConstante[map[j][i]];
					let tileX = caseMap.x;
					let tileY = caseMap.y
					let tileset = caseMap.tileset;

					fn = drawTileOnCanvas.bind(null, null,i,j)

					getPartialImage(tilesetConstante[tileset], tileX,tileY,tileSize, tileSize).then(((i, j) => (image) => {
					  context.drawImage(image,((i)*tileSize), ((j)*tileSize), tileSize, tileSize)
					})(i, j));
				}
			}
		}

		function afficherPersonnage(x, y, d) {
			let xPixel = 0;
			let yPixel = 0;

			if(d == 'S') {
				xPixel = 113;
				yPixel = 269;
			}
			if(d == 'N') {
				xPixel = 132;
				yPixel = 269;
			}
			if(d == 'O') {
				xPixel = 7;
				yPixel = 288;
			}
			getPartialImage(images[1], xPixel, yPixel, tileSize, tileSize).then((image) => {
				context.drawImage(image,x*tileSize, y*tileSize, tileSize, tileSize)
			})
		}
	});	