let width;
let height;
let selectedElementName;
let selectedMode;
let map;

let onCanvasDrag = false;

function initialializeLayout() {
	width = 10;
	height = 10;
	selectedElementName = 'ground';
	selectedMode = 'pen'

	map = [];
	for (let i = 0; i < height; i++) {
		map[i] = [];
	}

	let floorDomImg = document.getElementById('ground');
	getPartialImage(tilesetConstante['tilesetFloor'], displayConstante['ground'].x,displayConstante['ground'].y,tileSize, tileSize).then((image) => {
	  floorDomImg.src = image.src;
	});
	let grassDomImg = document.getElementById('grass');
	getPartialImage(tilesetConstante['tilesetFloor'], displayConstante['grass'].x,displayConstante['grass'].y,tileSize, tileSize).then((image) => {
	  grassDomImg.src = image.src;
	});
	let rockDomImg = document.getElementById('rock');
	getPartialImage(tilesetConstante['tilesetFloor'], displayConstante['rock'].x,displayConstante['rock'].y,tileSize, tileSize).then((image) => {
	  rockDomImg.src = image.src;
	});
	let selectedDomImg = document.getElementById('selected');
	getPartialImage(tilesetConstante['tilesetFloor'], displayConstante['ground'].x,displayConstante['ground'].y,tileSize, tileSize).then((image) => {
	  selectedDomImg.src = image.src;
	});
}

function initializeMapWithRock() {
	for(let i = 0; i < height; i++) {
		for(let j = 0; j < width; j++) {
			map[i][j] = 'rock';
		}
	}

	afficherSol(map);
}

function onWidthChange() {

}

function onHeightChange() {

}

function onElementClick(elementName) {
	selectedElementName = elementName;
	let selectedDomImg = document.getElementById('selected');
	getPartialImage(tilesetConstante['tilesetFloor'], displayConstante[elementName].x,displayConstante[elementName].y,tileSize, tileSize).then((image) => {
	  selectedDomImg.src = image.src;
	});
}

function onModeClick(modeName) {
	selectedMode = modeName;
	console.log(selectedMode)
}

function onCanvasMouseDown(event) {
	onCanvasDrag = true;
	let cursorPositon = getCursorPosition(canvas, event);
	let cursorMapPosition = getMapPositionFromCursorPosition(cursorPositon);

	// coordonnees drag depart = ...
	if(selectedMode === 'selection') {
		// Afficher Information
	}
	if(selectedMode === 'pen') {
		// Dessiner selectedElement
		console.log(cursorMapPosition);
		console.log(map)
		map[cursorMapPosition.x][cursorMapPosition.y] = selectedElementName;
		console.log(map)
		afficherSol(); // TODO: Pour optimiser, ajouter méthode afficher tile
	}
}

function onCanvasMouseMove(event) {

}

function onCanvasMouseUp(event) {
	onCanvasDrag = false;
	// coordonnees drag arrivés = ...
	if(selectedMode === 'rectangle') {

	}
}

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
		return {"x":x, "y":y}
}

function getMapPositionFromCursorPosition(cursorPosition) {
	return {"x":Math.floor(cursorPosition.x/tileSize), "y":Math.floor(cursorPosition.y/tileSize)}
}
