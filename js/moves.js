'use strict'

var gNextNextLocation;
var isMouseClicked = false
var gOnWater = false;
var gWaterLoc;

function moveTo(i, j, direction) {
    var targetCell = gBoard[i][j];
    if (targetCell.type === WALL) return;

    // Calculate distance to ake sure we are moving to a neighbor cell
    var iAbsDiff = Math.abs(i - gSokoban.pos.i);
    var jAbsDiff = Math.abs(j - gSokoban.pos.j);

    if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

        if (targetCell.gameElement === gBox.name) {

            if (direction === 'ArrowLeft') gNextNextLocation = { i: i, j: j - 1 }
            else if (direction === 'ArrowRight') gNextNextLocation = { i: i, j: j + 1 }
            else if (direction === 'ArrowUp') gNextNextLocation = { i: i - 1, j: j }
            else if (direction === 'ArrowDown') gNextNextLocation = { i: i + 1, j: j }

            moveTo(gNextNextLocation.i, gNextNextLocation.j, direction)

            if (gNextNextLocation.i > gBoard.length - 1 ||
                gNextNextLocation.i < 0 ||
                gNextNextLocation.j > gBoard.length - 1 ||
                gNextNextLocation.j < 0 ||
                gBoard[gNextNextLocation.i][gNextNextLocation.j].gameElement === gBox.name ||
                (gBoard[gNextNextLocation.i][gNextNextLocation.j].type === 'WALL')
            ) return

            if (gBoard[gNextNextLocation.i][gNextNextLocation.j].gameElement === 'WATER') {

                gWaterLoc = { i: gNextNextLocation.i, j: gNextNextLocation.j }

                gBoard[gNextNextLocation.i][gNextNextLocation.j].gameElement = gBox.name
                gBox.pos = gNextNextLocation
                renderCell(gNextNextLocation, gBox.img)
                drop(gBoard, gWaterLoc, gBox)
            }

            gBoard[gNextNextLocation.i][gNextNextLocation.j].gameElement = gBox.name
            gBox.pos = gNextNextLocation
            renderCell(gNextNextLocation, gBox.img)
        }

        if (gGame.isClockOn) {
            gGame.countClockSteps--
            gameStatus()
            if (gGame.countClockSteps === 0) {
                CLOCK_SOUND.pause()
                gGame.countClockSteps = 10;
                gGame.isClockOn = false
            }
        } else gGame.countSteps++

        if (targetCell.gameElement === 'GOLD') {
            COINS_SOUND.play()
            gGame.points += 100
            gameStatus()
        }

        else if (targetCell.gameElement === 'CLOCK') {
            gGame.isClockOn = true
            CLOCK_SOUND.play()
            gameStatus()
        }

        else if (targetCell.gameElement === 'GLUE') {
            GLUE_SOUND.play()
            gGame.isOnGlue = true
            gGame.countSteps += 5
            setTimeout(function () {
                gGame.isOnGlue = false
            }, 3000);
        }

        else if (targetCell.gameElement === 'WATER') {
            WATER_SOUND.play()
            gOnWater = true
            gWaterLoc = { i: i, j: j }

        }

        else if (targetCell.gameElement === 'MAGNET') {
            gGame.isOnMagnet = true

        }

        updateGame(i, j, gSokoban)

        if (gOnWater) {

            drop(gBoard, gWaterLoc, gSokoban)
            gOnWater = false
        }
    }
    gameStatus()
    checkGameOver()
    checkWin()
}


window.oncontextmenu = (e) => {
    e.preventDefault();
}

// function rightClick(ev) {
//     if (ev.button === 2) {
//         var elBox = document.querySelector('.box')
//         // elBox.style.backgroundColor = 'blue'
//     }
// }

function updateGame(i, j, gameEl) {
    // MOVING
    // Model:
    gBoard[gameEl.pos.i][gameEl.pos.j].gameElement = null;

    // Dom:
    renderCell(gameEl.pos, '');

    // Model:
    gameEl.pos.i = i
    gameEl.pos.j = j;

    gBoard[gameEl.pos.i][gameEl.pos.j].gameElement = gameEl.name;

    // DOM:
    renderCell(gameEl.pos, gameEl.img);
}

function handleKey(event) {
    if (gGame.isGameOn) {
        if (!gGame.isOnGlue) {
            var i = gSokoban.pos.i;
            var j = gSokoban.pos.j;
            switch (event.key) {
                case 'ArrowLeft':
                    moveTo(i, j - 1, 'ArrowLeft');
                    break;
                case 'ArrowRight':
                    moveTo(i, j + 1, 'ArrowRight');
                    break;
                case 'ArrowUp':
                    moveTo(i - 1, j, 'ArrowUp');
                    break;
                case 'ArrowDown':
                    moveTo(i + 1, j, 'ArrowDown');
                    break;
            }
        }
    }
}