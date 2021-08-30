const BLOCK_NUMBER_HOR = 200;
const BLOCK_NUMBER_VER = 100;
const SLEEP = 100


var canvas = document.getElementById('canvas');

const WIDTH = canvas.style.width;
const HEIGHT = canvas.style.height;

// RESOLUTION CHEAT
canvas.width=2000;
canvas.height=1000;
canvas.style.width=WIDTH;
canvas.style.height=HEIGHT;

const BLOCK_WIDTH = canvas.width / BLOCK_NUMBER_HOR
const BLOCK_HEIGHT = canvas.height / BLOCK_NUMBER_VER

var ctx = canvas.getContext('2d');

// INIT
let matrix = [];
for (let i = 0; i < BLOCK_NUMBER_HOR; i++) {
    matrix[i] = [];
    for (let j = 0; j < BLOCK_NUMBER_VER; j++) {
        matrix[i][j] = getRandomInt(10);
        // matrix[i][j] = 0;
    }
}

// matrix[100][50] = 1;
// matrix[100][51] = 1;
// matrix[100][52] = 1;
// matrix[101][52] = 1;
// matrix[102][52] = 1;
// matrix[102][51] = 1;
// matrix[102][50] = 1;

// ANIMATE
let startTime, now, then, elapsed;

function startAnimating() {
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
	requestAnimationFrame(animate);
	now = Date.now();
    elapsed = now - then;

    if (elapsed > SLEEP) {
        then = now - (elapsed % SLEEP);
		draw();
		playgame();
    }
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < BLOCK_NUMBER_HOR; i++) {
		for (let j = 0; j < BLOCK_NUMBER_VER; j++) {
			if (matrix[i][j] == 1) {
				ctx.fillStyle = 'black';
			} else {
				ctx.fillStyle = 'white';
			}
			ctx.fillRect(i * BLOCK_WIDTH, j * BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);
		}
	}
}

function playgame() {
	let futureMatrix = [];
	for (let i = 0; i < BLOCK_NUMBER_HOR; i++) {
		futureMatrix[i] = [];
		for (let j = 0; j < BLOCK_NUMBER_VER; j++) {
			futureMatrix[i][j] = 0;
		}
	}

	for (let i = 0; i < BLOCK_NUMBER_HOR; i++) {
		for (let j = 0; j < BLOCK_NUMBER_VER; j++) {
			let neighbour = aliveNeighbour(i, j);

			if (neighbour == 3 || (matrix[i][j] == 1 && neighbour == 2)) {
				futureMatrix[i][j] = 1;
			}
		}
	}

	matrix = futureMatrix
}

function aliveNeighbour(i, j) {
	let alive = 0;
	if (i > 0 && matrix[i - 1][j] == 1) {
		alive++;
	}
	if (i < BLOCK_NUMBER_HOR - 2 && matrix[i + 1][j] == 1) {
		alive++;
	}
	if (j > 0 && matrix[i][j - 1] == 1) {
		alive++;
	}
	if (j < BLOCK_NUMBER_VER - 2 && matrix[i][j + 1] == 1) {
		alive++;
	}
	if (i > 0 && j > 0 && matrix[i - 1][j - 1] == 1) {
		alive++;
	}
	if (i > 0 && j < BLOCK_NUMBER_VER - 2 && matrix[i - 1][j + 1] == 1) {
		alive++;
	}
	if (i < BLOCK_NUMBER_HOR - 2 && j > 0 && matrix[i + 1][j - 1] == 1) {
		alive++;
	}
	if (i < BLOCK_NUMBER_HOR - 2 && j < BLOCK_NUMBER_VER - 2 && matrix[i + 1][j + 1] == 1) {
		alive++;
	}
	return alive
}

// UTILS
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

startAnimating();