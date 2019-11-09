'use strict'

var gDifficultyChosen;
var gLevelNormal;
var gLevelHard;
var gLevelEasy;

function easy() {
    gDifficultyChosen = {}
    gSize = 6
    gSokoban = { pos: { i: 1, j: 1 }, name: 'SOKOBAN', img: '<img src="images/sokoban.png">' }
    gLevelEasy = {
        look: [],
        targets: [{ i: 1, j: 2 }, { i: 2, j: 1 }, { i: 3, j: 1 }, { i: 4, j: 1 }],
        boxes: [{ i: 1, j: 2 }, { i: 2, j: 2 }, { i: 3, j: 2 }, { i: 4, j: 1 }]
    }
    gDifficultyChosen = gLevelEasy
    level(gLevelEasy)
}

function normal() {
    gDifficultyChosen = {}
    gSize = 11
    gSokoban = { pos: { i: 1, j: 5 }, name: 'SOKOBAN', img: '<img src="images/sokoban.png">' }
    gLevelNormal = {
        look: [
            { i: 9, j: 0 }, { i: 10, j: 0 }, { i: 9, j: 10 }, { i: 10, j: 10 },
            { i: 8, j: 9 }, { i: 9, j: 9 }, { i: 8, j: 1 }, { i: 9, j: 1 }, { i: 8, j: 2 }, { i: 7, j: 2 }, { i: 6, j: 2 }, { i: 5, j: 2 }, { i: 4, j: 2 }, { i: 6, j: 3 },
            { i: 8, j: 8 }, { i: 7, j: 8 }, { i: 6, j: 8 }, { i: 5, j: 8 }, { i: 4, j: 8 }, { i: 6, j: 7 }],
        targets: [{ i: 9, j: 2 }, { i: 9, j: 4 }, { i: 9, j: 6 }, { i: 9, j: 8 }, { i: 8, j: 3 },
        { i: 8, j: 5 }, { i: 8, j: 7 }, { i: 7, j: 4 }, { i: 7, j: 6 }, { i: 6, j: 5 }],
        boxes: [{ i: 2, j: 2 }, { i: 2, j: 4 }, { i: 2, j: 6 }, { i: 2, j: 8 }, { i: 3, j: 3 },
        { i: 3, j: 5 }, { i: 3, j: 7 }, { i: 4, j: 4 }, { i: 4, j: 6 }, { i: 5, j: 5 }]
    }
    level(gLevelNormal)
    gDifficultyChosen = gLevelNormal
}

function hard() {
    gDifficultyChosen = {}
    gSize = 12
    gSokoban = { pos: { i: 5, j: 5 }, name: 'SOKOBAN', img: '<img src="images/sokoban.png">' };

    gLevelHard = {
        look: [],
        targets: [{ i: 1, j: 9 }, { i: 2, j: 9 }, { i: 3, j: 9 }, { i: 4, j: 9 }, { i: 5, j: 9 }, { i: 6, j: 9 }, { i: 7, j: 9 }, { i: 8, j: 9 }, { i: 8, j: 10 }, { i: 8, j: 8 }, { i: 8, j: 7 }, { i: 8, j: 6 }, { i: 8, j: 5 }, { i: 8, j: 4 }, { i: 8, j: 3 }, { i: 8, j: 2 }, { i: 7, j: 2 }, { i: 6, j: 2 }, { i: 5, j: 2 }, { i: 4, j: 2 }, { i: 3, j: 2 }, { i: 2, j: 2 }, { i: 2, j: 3 }, { i: 2, j: 4 }, { i: 2, j: 5 }, { i: 2, j: 6 }, { i: 2, j: 7 }, { i: 3, j: 7 }, { i: 4, j: 7 }, { i: 5, j: 7 }, { i: 6, j: 6 }, { i: 6, j: 5 }, { i: 6, j: 4 }, { i: 5, j: 4 }, { i: 9, j: 10 }],
        boxes: [{ i: 1, j: 9 }, { i: 2, j: 9 }, { i: 3, j: 9 }, { i: 4, j: 9 }, { i: 5, j: 9 }, { i: 6, j: 9 }, { i: 7, j: 9 }, { i: 8, j: 9 }, { i: 8, j: 10 }, { i: 8, j: 8 }, { i: 8, j: 7 }, { i: 8, j: 6 }, { i: 8, j: 5 }, { i: 8, j: 4 }, { i: 8, j: 3 }, { i: 8, j: 2 }, { i: 7, j: 2 }, { i: 6, j: 2 }, { i: 5, j: 2 }, { i: 4, j: 2 }, { i: 3, j: 2 }, { i: 2, j: 2 }, { i: 2, j: 3 }, { i: 2, j: 4 }, { i: 2, j: 5 }, { i: 2, j: 6 }, { i: 2, j: 7 }, { i: 3, j: 7 }, { i: 4, j: 7 }, { i: 5, j: 7 }, { i: 6, j: 7 }, { i: 6, j: 6 }, { i: 6, j: 5 }, { i: 6, j: 4 }, { i: 5, j: 4 },]
    }
    level(gLevelHard)
    gDifficultyChosen = gLevelHard
}

function level(difficulty) {
    initGame()
    for (let pos = 0; pos < difficulty.look.length; pos++) {
        var lookIdx = difficulty.look[pos]
        var elLook = document.querySelector(`.cell-${lookIdx.i}-${lookIdx.j}`)
        if (elLook.classList.contains('wall')) {
            elLook.classList.remove('wall')
            elLook.classList.add('transparent')

        } else if (elLook.classList.contains('floor')) {
            elLook.classList.remove('floor')
            elLook.classList.add('wall')
        }
        gBoard[lookIdx.i][lookIdx.j].type = WALL
    }

    for (let pos = 0; pos < difficulty.targets.length; pos++) {
        var targetIdx = difficulty.targets[pos]
        var elTarget = document.querySelector(`.cell-${targetIdx.i}-${targetIdx.j}`)
        elTarget.classList.add('target')
        gBoard[targetIdx.i][targetIdx.j].isTarget = true

        var boxIdx = difficulty.boxes[pos]
        var elBox = document.querySelector(`.cell-${boxIdx.i}-${boxIdx.j}`)
        gBoard[boxIdx.i][boxIdx.j].gameElement = gBox.name
        elBox.innerHTML = gBox.img
    }
}


