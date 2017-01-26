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

// Returns false for no win, 1 for player 1, 2 for player 2
Game.prototype.checkForWin = function () {
  // Check for diagonals
  if ((this.board[0][0] == 'X' && this.board[1][1] == 'X' && this.board[2][2] == 'X') || (this.board[0][2] == 'X' && this.board[1][1] == 'X' && this.board[2][0] == 'X')) {
    return 1;
  }
  if ((this.board[0][0] == 'O' && this.board[1][1] == 'O' && this.board[2][2] == 'O') || (this.board[0][2] == 'O' && this.board[1][1] == 'O' && this.board[2][0] == 'O')) {
    return 2;
  }
  // check for rows and columns
  for (var i = 0; i < 3; i++) {
    if ((this.board[0][i] == 'O' && this.board[1][i] == 'O' && this.board[2][i] == 'O') || (this.board[i][0] == 'O' && this.board[i][1] == 'O' && this.board[i][2] == 'O')) {
      return 1;
    }
    if ((this.board[0][i] == 'O' && this.board[1][i] == 'O' && this.board[2][i] == 'O') || (this.board[i][0] == 'O' && this.board[i][1] == 'O' && this.board[i][2] == 'O')) {
      return 2;
    }
  }
  return false;
}

Game.prototype.drawBoard = function () {
  var table = new Table({head: [Math.random(), "Column 0", "Column 1", "Column 2"] });
  table.push(
    { 'Row 0': this.board[0] },
    { 'Row 1': this.board[1] },
    { 'Row 2': this.board[2] }
  );

  var tableString = table.toString();
  //return tableString;
  return JSON.stringify(this.board);
}

Game.prototype.newRound = function () {
  console.log(this.drawBoard());
  var self = this;
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
    self.processAnswer(answers.row, answers.column);
  });
}

Game.prototype.processAnswer = function(row, column) {
  var char;
  if (this.currentPlayer === 1) {
    char = 'X';
  }
  else if (this.currentPlayer === 2) {
    char = 'O';
  }
  if (row >= 0 && column >= 0 && row <= 2 && column <=2 && this.board[row][column] === ' ') {
    this.board[row][column] = char
    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }
  } else {
    vorpal.log('Invalid move!');
  }
  if (this.checkForWin()) {
    vorpal.log('Player ' + this.currentPlayer + 'wins!'); 
    process.exit();
  } else {
    // Continue game
    this.newRound();
  }
}

Game.prototype.start = function () {
  this.newRound();
}

var game = new Game();
game.start();
