const sliderBody = document.querySelector('#slider-body');

const TILE_COUNT = 15;
const INITIAL_TILE_ORDER = [
	'1/1', '1/2', '1/3', '1/4',
	'2/1', '2/2', '2/3', '2/4',
	'3/1', '3/2', '3/3', '3/4',
	'4/1', '4/2', '4/3', '4/4',
];

let tiles = [];

generateTiles();

function generateTiles() {
	createTiles();
	randomizeTiles();
	displayTiles();
}

function createTiles() {
	for (let i = 0; i < TILE_COUNT; i++) {
		const tile = createTile(i);
		const tileText = createTileText(i);
		tile.appendChild(tileText);
		tiles.push(tile);
	}
}

function createTile(i) {
	const tile = document.createElement('div');
	tile.classList.add('slider-tile');
	tile.dataset.id = (i + 1).toString();
	tile.style.background = (i % 2 === 0) ? 'var(--tan-color)' : 'linear-gradient(to bottom right, var(--red-color), var(--dark-red-color))';
	tile.addEventListener('click', clickHandler);
	return tile;
}

function clickHandler(e) {
	let currentTarget = (e.target.classList.contains('tile-text')) ? e.target.parentElement : e.target;
	let currentPosition = currentTarget.dataset.position;

	// Step 2: find what other positions we need to check
	let checkPositions = [];
	const positionArray = currentPosition.split('/');
	const leftOf = (parseInt(positionArray[0]) - 1).toString() + '/' + positionArray[1];
	const rightOf = (parseInt(positionArray[0]) + 1).toString() + '/' + positionArray[1];
	const below = positionArray[0] + '/' + (parseInt(positionArray[1]) - 1).toString();
	const above = positionArray[0] + '/' + (parseInt(positionArray[1]) + 1).toString();
	if (INITIAL_TILE_ORDER.includes(leftOf)) checkPositions.push(leftOf);
	if (INITIAL_TILE_ORDER.includes(rightOf)) checkPositions.push(rightOf);
	if (INITIAL_TILE_ORDER.includes(below)) checkPositions.push(below);
	if (INITIAL_TILE_ORDER.includes(above)) checkPositions.push(above);

	const adjacentTiles = tiles.filter(tile => checkPositions.includes(tile.dataset.position));
	const adjacentTilePositions = adjacentTiles.map(tile => tile.dataset.position);
		// Step 3b: if we find one that is empty, move the tile to that currentPosition
	const emptyPosition = checkPositions.filter(pos => !adjacentTilePositions.includes(pos))[0];

	if (emptyPosition) {
		currentTarget.dataset.position = emptyPosition;
		currentTarget.style.gridArea = `${emptyPosition}/${emptyPosition}`;
	}
}

function createTileText(i) {
	const tileText = document.createElement('div');
	tileText.classList.add('tile-text');
	tileText.textContent = (i + 1).toString();
	return tileText;
}

function randomizeTiles() {
	for(let i = tiles.length - 1; i > 0; i--){
		const j = Math.floor(Math.random() * i)
		const temp = tiles[i]
		tiles[i] = tiles[j]
		tiles[j] = temp
	}
}

function displayTiles() {
	let i = 0;
	for (const tile of tiles) {
		tile.dataset.position = INITIAL_TILE_ORDER[i];
		tile.style.gridArea = INITIAL_TILE_ORDER[i];
		sliderBody.appendChild(tile);
		i ++;
	}
}