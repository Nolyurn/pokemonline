let canvas  = document.querySelector('#mapEditor');
let context = canvas.getContext('2d');
let tileSize = 16;
const tilesetConstante = {};

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
])
.then((images) => {	
	tilesetConstante['tilesetFloor'] = images[0];

	initialializeLayout();
	initializeMapWithRock();
});	

function drawTileOnCanvas(context,image,i,j){
		context.drawImage(image,((i)*tileSize), ((j)*tileSize), tileSize, tileSize)
	}

function afficherSol(map){
	console.log(map)
	for(let i = 0; i < map[0].length; i++) {
		for(let j = 0; j < map.length; j++) {
			caseMap = displayConstante[map[i][j]];
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