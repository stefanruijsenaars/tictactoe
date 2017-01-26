var vorpal = require('vorpal')();

var Game = function() {
  this.board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];
}

Game.prototype.checkForWin = function () {
}

Game.prototype.drawBoard = function () {
}

Game.prototype.drawBoard = function () {
}

Game.prototype.start = function () {
  vorpal
    .delimiter('tictactoe$')
    .show();
}

var game = new Game();
game.start();
