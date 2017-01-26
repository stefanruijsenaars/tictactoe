var vorpal = require('vorpal')();
var Table = require('cli-table');

var Game = function() {
  this.board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];
  var players = [1, 2];
  // either the number 1 or the number 2
  this.currentPlayer = players[Math.round(Math.random())];
  this.prompt = require('inquirer').prompt;
}

Game.prototype.checkForWin = function () {
}

Game.prototype.drawBoard = function () {
  var table = new Table({head: ["", "Column 0", "Column 1", "Column 2"] });
  table.push(
    { 'Row 0': this.board[0] },
    { 'Row 1': this.board[1] },
    { 'Row 2': this.board[2] }
  );
  return table.toString();
}

Game.prototype.getPlayerInput = function () {
  this.prompt([{
    type: 'input',
    name: 'row',
    message: 'Player ' + this.currentPlayer + ', it\'s your turn! Please enter a row (0,1,2)'
  }, 
  {
    type: 'input',
    name: 'column',
    message: 'Player ' + this.currentPlayer + ', it\'s your turn! Please enter a column (0,1,2)'
  }]).then(function (answers) {
    this.processAnswer(answers.row, answers.column);
  });
}

Game.prototype.processAnswer(row, column) {
  var char;
  if (this.currentPlayer === 1) {
    char = 'X';
  }
  else if (this.currentPlayer === 2) {
    char = 'O';
  }
  this.board[row, column] = char
}

Game.prototype.start = function () {
  vorpal
    .delimiter('tictactoe$')
    .show();
  vorpal.log(this.drawBoard());
  this.getPlayerInput();
}

var game = new Game();
game.start();
