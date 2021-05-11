const sliderBody = document.querySelector('#slider-body');
const envelope = document.querySelector('#envelope-body');
const envelopeButton = document.querySelector('#envelope-button');

const CSS_MOVE_CLASS_START = 'move-';

const TILE_COUNT = 15;
const INITIAL_TILE_ORDER = [
	'1/1', '1/2', '1/3', '1/4',
	'2/1', '2/2', '2/3', '2/4',
	'3/1', '3/2', '3/3', '3/4',
	'4/1', '4/2', '4/3', '4/4',
];

let tiles = [];

envelopeButton.addEventListener('click', function() {
	envelope.remove();
});

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
	const currentTarget = (e.target.classList.contains('tile-text')) ? e.target.parentElement : e.target;
	const currentPosition = currentTarget.dataset.position;
	const movePosition = findMovePosition(currentPosition);

	if (movePosition && Object.keys(movePosition).length !== 0 && movePosition.constructor === Object) {
		currentTarget.classList.add(CSS_MOVE_CLASS_START + Object.keys(movePosition));
		currentTarget.addEventListener('transitionend', () => {
			currentTarget.classList.remove(CSS_MOVE_CLASS_START + Object.keys(movePosition));
			currentTarget.dataset.position = movePosition[Object.keys(movePosition)[0]];
			currentTarget.style.gridArea = `${movePosition[Object.keys(movePosition)[0]]}/${movePosition[Object.keys(movePosition)[0]]}`;
			currentTarget.removeEventListener('transitionend', null);
		});
	}
}

function findMovePosition(currentPos) {
	let movePos = {left: null, right: null, up: null, down: null};
	const rowAndColumn = currentPos.split('/');
	movePos.left = rowAndColumn[0] + '/' + (+rowAndColumn[1] - 1).toString();
	movePos.right = rowAndColumn[0] + '/' + (+rowAndColumn[1] + 1).toString();
	movePos.down = (+rowAndColumn[0] + 1).toString() + '/' + rowAndColumn[1];
	movePos.up = (+rowAndColumn[0] - 1).toString() + '/' + rowAndColumn[1];
	for (const pos in movePos) {
		if (!INITIAL_TILE_ORDER.includes(movePos[pos])) delete movePos[pos];
		if (tiles.find(tile => tile.dataset.position === movePos[pos])) delete movePos[pos];
	}
	return movePos;
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