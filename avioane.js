let gridx = 16, gridy = 16;
let player = [], computer = [];
let playerAirplanes = [], computerAirplanes = [];
let playerLives = 0, computerLives = 0;
let playerScore = 0, computerScore = 0;
let positions = [];
let selectedAirplane = 1;
let playerTurn = true;

/* UP */
positions[0] = [[-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1], [0, 2], [-1, 3], [0, 3], [1, 3]];

/* DOWN */
positions[1] = [[-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1], [0, -2], [-1, -3], [0, -3], [1, -3]];

/* LEFT */
positions[2] = [[1, -2], [1, -1], [1, 0], [1, 1], [1, 2], [2, 0], [3, -1], [3, 0], [3, 1]];

/* RIGHT */
positions[3] = [[-1, -2], [-1, -1], [-1, 0], [-1, 1], [-1, 2], [-2, 0], [-3, -1], [-3, 0], [-3, 1]];


/*****************************/

function loadImages() {
	const ids = ["e", "avion", "t", "d", "m"];
	console.log = "Loading images... Please wait...";
	for (const element of ids) {
		let img = new Image();
		let name = "av" + element + ".gif";
		img.src = name;
		// Assign the loaded image to a global variable or use it as needed
	}
	console.log = "Done";
}


function resetGame() {
	document.getElementById("replayButton").style.display = "none";
	document.getElementById("setupTable").style.display = "";
	document.getElementById("playerZone").innerHTML = "";
	document.getElementById("computerZone").innerHTML = "";
	preview();
}

function preview() {
	player = initializePlayer(true);
	if (player) displayGrid(false);
}

function startGame() {
	if (!(player = initializePlayer(false))) return;
	if (!(computer = initializeComputer())) return;

	playerTurn = true;
	document.getElementById("setupTable").style.display = "none";
	document.getElementById("playerLives").innerHTML = playerLives;
	document.getElementById("computerLives").innerHTML = computerLives;
	displayGrid(true);
	displayGrid(false);
}


function initializePlayer(preview) {
	let x, y, j, p, varfx, varfy, nrAvion = 0, orientare;

	let grid = [];
	for (y = 0; y < gridx; ++y) {
		grid[y] = [];
		for (x = 0; x < gridx; ++x)
			grid[y][x] = ["e", -1, 0];
	}

	playerLives = 0;

	for (j = 1; j < 6; j++) {
		varfx = document.getElementById("pozx" + j).value;
		varfy = document.getElementById("pozy" + j).value;

		if (varfx == "" || varfy == "") {
			if (!preview) {
				alert("Fill in the board with 5 planes!!!");
				return false;
			}
			else
				continue;
		}

		varfx = parseInt(varfx) - 1;
		varfy = parseInt(varfy) - 1;

		orientare = parseInt(document.getElementById("dir" + j).value);

		// checking the position of the airplane 

		if (varfx < 0 || varfx >= gridx || varfy < 0 || varfy >= gridy || grid[varfy][varfx][0] == "a") {
			alert("Plane " + j + " was not set right!!!");
			document.getElementById("pozx" + j).focus();
			return false;
		}

		for (p = 0; p < 9; p++) {
			let pozx = positions[orientare][p][0] + varfx;
			let pozy = positions[orientare][p][1] + varfy;

			if (pozx >= gridx || pozx < 0 || pozy >= gridy || pozy < 0) {
				alert("Plane " + j + " was not set right!!!");
				document.getElementById("pozx" + j).focus();
				return false;
			}

			if (grid[pozy][pozx][0] == "a") {
				alert("Plane " + j + " overlaps another plane!!!");
				document.getElementById("pozx" + j).focus();
				return false;
			}
		}

		for (p = 0; p < 9; p++) {
			let pozx = positions[orientare][p][0] + varfx;
			let pozy = positions[orientare][p][1] + varfy;
			grid[pozy][pozx][0] = "a";
			grid[pozy][pozx][1] = nrAvion;
		}
		grid[varfy][varfx][0] = "a";
		grid[varfy][varfx][1] = nrAvion;
		grid[varfy][varfx][2] = "cap";

		playerAirplanes[nrAvion] = 10;
		playerLives++;
		nrAvion++;
	}
	return grid;
}

function initializeComputer() {
	let y, x, p, grid, orientare;
	grid = [];
	for (y = 0; y < gridx; ++y) {
		grid[y] = [];
		for (x = 0; x < gridx; ++x)
			grid[y][x] = ["e", -1, 0];
	}
	let j, ok, varfx, varfy, nrAvion = 0;
	computerLives = 0;
	for (j = 0; j < 5; j++) {
		do {
			varfx = Math.floor(Math.random() * 12 + 2);
			varfy = Math.floor(Math.random() * 12 + 2);
			orientare = Math.round(Math.random() * 3);
			ok = true;

			// checking the position of the airplane
			if (grid[varfy][varfx][0] == "a") { ok = false; continue; }

			for (p = 0; p < 9; p++) {
				let pozx = positions[orientare][p][0] + varfx;
				let pozy = positions[orientare][p][1] + varfy;
				if ((pozx >= gridx || pozx < 0) || (pozy >= gridy || pozy < 0)) {
					ok = false; break;
				}

				if (grid[pozy][pozx][0] == "a") {
					ok = false; break;
				}
			}

		} while (!ok);

		for (p = 0; p < 9; p++) {
			let pozx = positions[orientare][p][0] + varfx;
			let pozy = positions[orientare][p][1] + varfy;
			grid[pozy][pozx][0] = "a";
			grid[pozy][pozx][1] = nrAvion;
		}
		grid[varfy][varfx][0] = "a";
		grid[varfy][varfx][1] = nrAvion;
		grid[varfy][varfx][2] = "cap";

		computerAirplanes[nrAvion] = 10;
		computerLives++;
		nrAvion++;
	}
	return grid;
}


function setImage(y, x, id, isComputer) {
	if (isComputer) {
		computer[y][x][0] = id;
		document.images["pc" + y + "_" + x].src = "av" + id + ".gif";
	}
	else {
		player[y][x][0] = id;
		document.images["ply" + y + "_" + x].src = "av" + id + ".gif";
	}
}

function displayGrid(isComputer) {
	let y, x, s;
	s = '<div class="pixel"></div>';
	for (y = 0; y < gridy; y++) {
		s += '<div class="pixel">' + (y + 1) + '</div>';
	}
	s += '<div style="clear:left;"></div>';
	if (isComputer) {
		for (y = 0; y < gridy; y++) {
			s += '<div class="pixel">' + (y + 1) + '</div>';
			for (x = 0; x < gridx; x++) {
				s += '<a href="javascript:gridClick(' + y + ',' + x + ');"><img name="pc' + y + '_' + x + '" src="ave.gif" width=16 height=16></a>';
			}
			s += '<br>';
		}
	} else {
		for (y = 0; y < gridy; y++) {
			s += '<div class="pixel">' + (y + 1) + '</div>';
			for (x = 0; x < gridx; x++) {
				s += '<a href="javascript:playerGridClick(' + y + ',' + x + ');"><img name="ply' + y + '_' + x + '" src="av' + player[y][x][0] + '.gif" width=16 height=16></a>';
			}
			s += '<br>';
		}
	}

	if (isComputer)
		document.getElementById("computerZone").innerHTML = "<center>Computer</center>" + s;
	else
		document.getElementById("playerZone").innerHTML = "<center>Player</center>" + s;
}

function playerGridClick(y, x) {
	if (selectedAirplane) {
		document.getElementById("pozx" + selectedAirplane).value = x + 1;
		document.getElementById("pozy" + selectedAirplane).value = y + 1;
		preview();
	}
}

function gridClick(y, x) {
	if (playerTurn) {
		if ((computer[y][x][2] == "cap") && (computer[y][x][0] == "a")) {
			let nrAvion = computer[y][x][1];
			computerAirplanes[nrAvion] = 0;
			shootDownAirplane(computer, nrAvion, true);
			alert("You struck down one of the opponent's planes!!!");
			if (--computerLives == 0) {
				alert("YOU WON!!! CONGRATS :)");
				playerScore++;
				document.getElementById("playerScore").innerHTML = playerScore;
				document.getElementById("replayButton").style.display = "";
				playerTurn = false;
			}
			document.getElementById("computerLives").innerHTML = computerLives;
		} else
			if (computer[y][x][0] == "a") {
				setImage(y, x, "t", true);
				let nrAvion = computer[y][x][1];
				if (--computerAirplanes[nrAvion] == 0) {
					shootDownAirplane(computer, nrAvion, true);
					alert("YOUR AIRPLANE WAS SHOT DOWN!!!");
					if (--computerLives == 0) {
						alert("YOU LOST!!! :(");
						playerTurn = false;
						playerScore++;
						document.getElementById("playerScore").innerHTML = playerScore;
						document.getElementById("replayButton").style.display = "";
					}
					document.getElementById("computerLives").innerHTML = computerLives;
				}


				if (playerTurn) computerGridClick();
			}
			else if (computer[y][x][0] == "e") {
				setImage(y, x, "m", true);
				computerGridClick();
			}
	}
}

function computerGridClick() {
	let x, y, pass;
	let selectedX, selectedY;
	let selected = false;

	for (pass = 0; pass < 2; ++pass) {
		for (y = 0; y < gridy && !selected; ++y) {
			for (x = 0; x < gridx && !selected; ++x) {
				if (player[y][x][0] == "t") {
					selectedX = x; selectedY = y;
					if (pass == 0) {
						if ((x + 2 < gridx) && (player[y][x + 1][0] == "t") && ((player[y][x + 2][0] == "a") || (player[y][x + 2][0] == "e"))) { selectedX = x + 2; selected = true; }
						else if ((x - 1 >= 0) && (x + 1 < gridx) && (player[y][x + 1][0] == "t") && ((player[y][x - 1][0] == "a") || (player[y][x - 1][0] == "e"))) { selectedX = x - 1; selected = true; }
						else if ((y - 1 >= 0) && (y + 1 < gridy) && (player[y + 1][x][0] == "t") && ((player[y - 1][x][0] == "a") || (player[y - 1][x][0] == "e"))) { selectedY = y - 1; selected = true; }
						else if ((y + 2 < gridy) && (player[y + 1][x][0] == "t") && ((player[y + 2][x][0] == "a") || (player[y + 2][x][0] == "e"))) { selectedY = y + 2; selected = true; }
					}
					else {
						if ((x - 1 >= 0) && ((player[y][x - 1][0] == "a") || (player[y][x - 1][0] == "e"))) { selectedX = x - 1; selected = true; }
						else if ((x + 1 < gridx) && ((player[y][x + 1][0] == "a") || (player[y][x + 1][0] == "e"))) { selectedX = x + 1; selected = true; }
						else if ((y - 1 >= 0) && ((player[y - 1][x][0] == "a") || (player[y - 1][x][0] == "e"))) { selectedY = y - 1; selected = true; }
						else if ((y + 1 < gridy) && ((player[y + 1][x][0] == "a") || (player[y + 1][x][0] == "e"))) { selectedY = y + 1; selected = true; }
					}
				}
			}
		}
	}

	if (!selected) {
		do {
			selectedY = Math.floor(Math.random() * (gridy - 1));
			selectedX = Math.floor(Math.random() * (gridx - 1));
		} while ((player[selectedY][selectedX][0] == "t") || (player[selectedY][selectedX][0] == "d") || (player[selectedY][selectedX][0] == "m"));
	}

	if ((player[selectedY][selectedX][2] == "cap") || (player[selectedY][selectedX][0] == "a")) {
		setImage(selectedY, selectedX, "t", false);
		let nrAvion = player[selectedY][selectedX][1];
		if(player[selectedY][selectedX][2] == "cap") {
			playerAirplanes[nrAvion] = 1;
		}
		if (--playerAirplanes[nrAvion] == 0) {
			shootDownAirplane(player, nrAvion, false);
			alert("One of your planes was struck down!!!");
			playerLostLive()
		}
	} else if (player[selectedY][selectedX][0] == "e") {
		setImage(selectedY, selectedX, "m", false);
	}
	document.getElementById("playerLives").innerHTML = playerLives;
}

function playerLostLive() {
	if (--playerLives == 0) {
		displayEnemyAirplanes();
		alert("YOU LOST :(\n");
		playerTurn = false;

		computerScore++;
		document.getElementById("computerScore").innerHTML = computerScore;
		document.getElementById("replayButton").style.display = "";
	}
}

function shootDownAirplane(grid, nrAvion, isComputer) {
	let y, x;
	for (y = 0; y < gridx; ++y) {
		for (x = 0; x < gridx; ++x) {
			if (grid[y][x][1] == nrAvion)
				if (isComputer) setImage(y, x, "d", true);
				else setImage(y, x, "d", false);
		}
	}
}


function displayEnemyAirplanes() {
	console.log("DisplayAirplanes")
	let y, x;
	for (y = 0; y < gridx; ++y) {
		for (x = 0; x < gridx; ++x) {
			if (computer[y][x][0] == "t")
				setImage(y, x, "d", true);
			else if (computer[y][x][0] == "a")
				setImage(y, x, "a", true);
		}
	}
}