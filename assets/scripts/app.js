const sliderBody = document.querySelector('#slider-body');

const TILE_COUNT = 15;

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
	return tile
}

function clickHandler(e) {
	let message = 'You clicked me! Said tile #';
	message += (e.target.classList.contains('tile-text')) ? e.target.parentElement.dataset.id : e.target.dataset.id;
	console.log(message);
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
	for (const tile of tiles) {
		sliderBody.appendChild(tile);
	}
}