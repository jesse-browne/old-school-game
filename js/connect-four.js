/**
 * Connect Four 
 * Coding problem
 * 
 * Author: Jesse Browne
 *      e: jb@greenpag.es
 *         
 */

var GameController = function() {
  
  this.playerOne = {
    name: 'Player 1',
    color: null,
    hasWon: false
  }
  
  this.playerTwo = {
    name: 'Player 2',
	color: null,
	hasWon: false
  }
  
  this.currentPlayer = this.playerOne;
  
  this.drawToken = function(target, color) {
	
	var canvas = document.getElementById(target);
	var ctx = canvas.getContext('2d');
	var x = y = 50;
	var r = 25;
	canvas.width = canvas.height = 100;
	
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2, true);
	ctx.fill();
	
  }
  
  this.setPlayerColors = function(color) {
	  $('#color-selection').hide();
	  switch(color) {
	    case 'red':
	      this.playerOne.color = 'red';
	      this.playerTwo.color = 'yellow';
	      $('#menu-screen #p1').addClass('red');
	      $('#menu-screen #p2').addClass('yellow');
	      $('#game-screen #p1-prompt').addClass('red');
	      $('#game-screen #p2-prompt').addClass('yellow');
	      $('#player-colors').show();
	      console.log('Player 1: ' + this.playerOne.color);
	      console.log('Player 2: ' + this.playerTwo.color);
	      break;
	    case 'yellow':
	      this.playerOne.color = 'yellow';
		  this.playerTwo.color = 'red';
		  $('#menu-screen #p1').addClass('yellow');
		  $('#menu-screen #p2').addClass('red');
	      $('#game-screen #p1-prompt').addClass('yellow');
	      $('#game-screen #p2-prompt').addClass('red');		  
		  $('#player-colors').show();
	      console.log('Player 1: ' + this.playerOne.color);
	      console.log('Player 2: ' + this.playerTwo.color);
		  break;
	  }
	  $('#menu-screen h2.continue').hide();
	  $('#menu-screen h3.continue').show();
  }
  
  this.boardSettings = {
    rows: 6,
    cols: 7
  }
  
  this.board = [];
  
  this.initBoard = function() {
	var divId, div, spanId, span, istr, jstr; 
	for (var i = 0; i < this.boardSettings.rows; i++) {
	  var temp = [];
	  istr = i.toString();
	  divId = 'row' + istr;
	  div = '<div id="' + divId + '"></div>';
	  $('#game-screen #game-board').append(div);
	  for (var j = 0; j < this.boardSettings.cols; j++){
		temp.push(null);
		jstr = j.toString();
		rowColNum = istr + jstr;
		spanId = 'rowCol' + rowColNum;
		canvasId = 'token' + rowColNum;
		span = '<span id="' + spanId + '"><canvas id="' + canvasId + '" onclick="controller.addToken(' + i + ',' + j + ');"></canvas></span>';
		$('#game-screen #game-board #' + divId).append(span);
	  }
	  this.board.push(temp);
	}
	console.log(this.board);
  }

  this.resetBoard = function() {
	var istr, divId, div;
	this.board = [];
	for (var i = 0; i < this.boardSettings.rows; i++) {
	  var temp = [];
	  istr = i.toString();
	  divId = 'row' + istr;
	  div = '<div id="' + divId + '"></div>';
	  $('#game-screen #game-board #' + divId).remove();
	  $('#game-screen').hide();
	}
  }
  
  this.checkWin = function(i,j) {
	console.log("checkWin:");
	var x, y, temp, chain;
	
	chain = 0;
	
	// check row for match 4
	for (x = 0; x < this.boardSettings.cols; x++) {
	  if ( (this.board[i][x] !== null) && (this.board[i][x] === temp) ) {
    	chain++;
      } else {
    	chain = 0;
      }
      temp = this.board[i][x];
      if (chain === 3) {
    	return true;
      }
	}
    
	temp = '';
	
	// check column for match 4
	for (x = 0; x < this.boardSettings.rows; x++) {
	  if ( (this.board[x][j] !== null) && (this.board[x][j] === temp) ) {
	   	chain++;
	  } else {
	   	chain = 0;
	  }
	  temp = this.board[x][j];
	  if (chain === 3) {
	   	return true;
	  }
	}

	temp = '';
	chain = 0;
	var a;

	// check diagonals for match 4
	
	for (x = 0; x < this.boardSettings.rows; x++) {
	  for (var y = 0; y < this.boardSettings.cols; y++){

		temp = this.board[x][y];
		chain = 0;

		for (a = 1; a < 4; a++) {
		  if( (x-a) >= 0 && (y-a) >= 0 ) {
			if ( (this.board[x-a][y-a] !== null) && (this.board[x-a][y-a] === temp) ) {
		      chain++;
		  	} else {
		  	  chain = 0;
		  	}
		  	if (chain === 3) {
		  	  return true;
		  	}
		  	temp = this.board[x-a][y-a];
		    }
		  }

		  temp = this.board[x][y];
		  chain = 0;
		    
		  for (a = 1; a < 4; a++) {
		    if( (x+a) <= this.boardSettings.rows - 1 && (y-a) >= 0 ) {
		      if ( (this.board[x+a][y-a] !== null) && (this.board[x+a][y-a] === temp) ) {
		  		chain++;
		  	  } else {
		  		chain = 0;
		  	  }
		  	  if (chain === 3) {
		  		return true;
		  	  }
		  	  temp = this.board[x+a][y-a];
		    }
		  }

	  } 
	}
	return false;
  }
  
  this.validMove = function(j) {
	  var i, istr, jstr, target, didWin;
	  var temp = [];
	  // check column has at least one grid square available
	  for (i = this.boardSettings.rows - 1; i >= 0; i--) {
		console.log('i:' + i);
		console.log('j:' + j);
		console.log(this.board);
		
		if (this.board[i][j] === null) {
		  this.board[i][j] = (this.currentPlayer.color === 'red') ? 0 : 1;
		  istr = i.toString();
    	  jstr = j.toString();
    	  target = 'token' + istr + jstr; 
		  this.drawToken(target, this.currentPlayer.color);
			
		  // check to see if win has occurred		  
		  didWin = this.checkWin(i,j);
		  
		  if (!didWin) {
			if (this.currentPlayer === this.playerOne) {
			  this.currentPlayer = this.playerTwo;
		    } else {
			  this.currentPlayer = this.playerOne;  
		    }
			$('#p1-prompt').toggle();
			$('#p2-prompt').toggle();
		  } else {
			this.currentPlayer.hasWon = true;
			alert(this.currentPlayer.name + ' is the winner! Game Over.');
			$('#game-screen').hide();
			this.resetBoard();
			$('#menu-screen').show();
		  }

          return true;
        }
	  }
	  
	  return false;
  }
  
  this.addToken = function(i,j) {
	  var istr, jstr, numstr, target, x, y;
	  istr = i.toString();
	  jstr = j.toString();
	  numstr = istr + jstr;

	  move = this.validMove(j);
	  
	  if (move) {
		console.log('Valid Move.');
	  } else {
		alert('Invalid Move Attempted! Go on ' + this.currentPlayer.name +', it\'s still your turn.');
	  }

  }
  
  // helper functions to manage UI and initialize game board
  this.showMenu = function() {
	$('#splash-screen').hide();
	$('#menu-screen').show();
  }
	  
  this.showGameBoard = function() {
	$('#menu-screen').hide();
	$('#game-screen').show();
	this.initBoard();
  }

};

