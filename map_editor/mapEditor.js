let width;
let height;
let selectedElementName;
let map;

function initialializeLayout() {
	width = 10;
	height = 10;
	selectedElementName = 'ground';

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
	console.log('initialize rock')
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