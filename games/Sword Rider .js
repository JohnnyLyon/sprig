/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Sword Rider
@author: Ludis
@tags: []
@addedOn: 2025-00-00
*/

const player = "p";
const car = "w";
const road = "r";
const opening = "o";
const gameOverBackground = "g";
var inGame = false;
var gameOver = false;
var difficulty = 6;
var speed = 500;
var points = 0;

setLegend(
  [ player, bitmap`
.......00.......
......0220......
.....021L10.....
.....021L10.....
.....021L10.....
.....021L10.....
.....021L10.....
.....021L10.....
.....021L10.....
.....021L10.....
.....021L10.....
....06633660....
.....063360.....
......0660......
......0660......
.......00.......` ],
  [ car, bitmap`
..3.33333333.3..
.22333333333322.
.26333333333362.
.22333333333322.
..333333333333..
...3333333333...
...3333333333...
...3322222233...
...3222222223...
...3222002223...
..332000000233..
.22303333330322.
.26333333333362.
.22333333333322.
..3..........3..
................` ],
  [ road, bitmap`
2200000660000022
2200000660000022
2200000660000022
2200000660000022
2200000000000022
2200000000000022
2200000660000022
2200000660000022
2200000660000022
2200000660000022
2200000660000022
2200000000000022
2200000000000022
2200000660000022
2200000660000022
2200000660000022` ],
  [ opening, bitmap`
2200000660000022
2200000660000022
2200000660000022
2200006666000022
2200006336000022
2200006336000022
2200002112000022
2200002112000022
2200002112000022
2200002112000022
2200002112000022
2200002112000022
2200000220000022
2200000660000022
2200000660000022
2200000660000022` ],
  [ gameOverBackground, bitmap`
3000000000000003
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
3000000000000003` ]
)

setSolids([player, car])

let roadLevel = 0
let gameOverLevel = 1
let openingScreen = 2
const levels = [
  map`
.....
.....
.....
.....
.....
.....
..p..
.....`,
  map`
g`,
  map`
o`
]

setMap(levels[openingScreen])

addText("Sword",{x: 4, color: color`3`})

addText("Rider",{x: 11, color: color`3`})

addText("Press",{x: 4, y: 12, color: color`2`})

addText("i",{x: 14, y: 12, color: color`2`})

addText("To",{x: 6, y: 14, color: color`2`})

addText("Play",{x: 11, y: 14, color: color`2`})

onInput("i", () => {
  if (!gameOver) {
  clearText()
  setMap(levels[roadLevel])
  setBackground(road)
  inGame = true;
  addText("Points: 0",{x: 5, y: 14, color: color`5`})
  addCar();
  }
})

function addCar()
{
  if (Math.random() * 10 > difficulty)
  {
    addSprite(Math.floor(Math.random() * 5), 0, car)
  }
}

function moveCars()
{
  if (inGame) {
      for (var i = 0; i < getAll("w").length; i++)
      {
        if (getAll("w").length <= 1) addCar();
        if (getAll("w")[i].y == 7)
        {
          getAll("w")[i].remove();
        }
        if (getAll("w")[i].y + 1 == getFirst("p").y && getAll("w")[i].x == getFirst("p").x)
        {
          gameOver = true;
          var objectNum = getAll().length;
          for (var i = 0; i < objectNum; i++)
          {
            getAll()[0].remove();
          }
          gameOverScreen()
        }
        else getAll("w")[i].y += 1;
      }
      addCar()
  }
}

function gameOverOverer()
{
  if (gameOver)
  {
    clearInterval(carMover);
    clearInterval(pointsCounter);
  }
}

var carMover = setInterval(moveCars, speed);
var pointsCounter = setInterval(pointsLoop, 400)

setInterval(gameOverOverer, 10);

onInput("d", () => {
  if (!gameOver && inGame)
  {
    if (getFirst(player).x == 4)
    getFirst(player).x = 0;
    else getFirst(player).x += 1
  }
})
onInput("a", () => {
  if (!gameOver && inGame)
  {
    if (getFirst(player).x == 0)
    getFirst(player).x = 4;
    else getFirst(player).x -= 1
  }
})

function pointsLoop()
{
  if (inGame)
  {
    points += 1;
    if (points % 10 == 0 && speed > 100)
    {
      speed -= 10;
      clearInterval(carMover)
      carMover = setInterval(moveCars,speed);
    }
    if (points % 100 == 0 && difficulty > 0)
    {
      difficulty - 1;
    }
    addText("Points: " + points,{x: 5, y: 14, color: color`5`})
    addText("Speed: " + (500 - speed) / 5,{x: 5, y: 15, color: color`5`})
  }
}



function gameOverScreen()
{
  setMap(levels[gameOverLevel])
  setBackground(gameOverBackground)
  addText("Game",{x: 6, y: 7, color: color`3`})
  addText("Over",{x: 10, y: 7, color: color`3`})
}