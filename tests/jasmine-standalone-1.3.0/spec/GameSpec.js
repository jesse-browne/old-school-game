/**
 * Jasmine unit tests
 * Connect Four 
 * Coding problem
 * 
 * Author: Jesse Browne
 *      e: jb@greenpag.es
 *         
 */

describe('Connect Four test suite', function() {
	
    beforeEach(function() {
		controller = new GameController();
	});
    
    afterEach(function() { 
    	controller.resetBoard();
    	controller = new GameController();
    	$('#game').hide();
    });
    
    it('Initial values are as they should be', function() {
    	
    	expect(controller.playerOne).toEqual({
    	    name: 'Player 1',
    	    color: null,
    	    hasWon: false
    	});
    	
    	expect(controller.playerTwo).toEqual({
    	    name: 'Player 2',
    	    color: null,
    	    hasWon: false
    	});
    	
    	expect(controller.currentPlayer).toEqual(controller.playerOne);
    	
    	expect(controller.boardSettings).toEqual({
    		rows: 6,
    		cols: 7
    	});
    	
    	expect(controller.board).toEqual([]);
    	
    });
    
    it('Player 1 can choose red', function() {
    	$('#game #menu-screen #color-selection .red').trigger('click');
    	expect(controller.playerOne.color).toEqual('red');
    	expect(controller.playerTwo.color).toEqual('yellow');
    });
    
    it('or yellow and Player 2 will have the opposite color assigned', function() {
    	$('#game #menu-screen #color-selection .yellow').trigger('click');
    	expect(controller.playerOne.color).toEqual('yellow');
    	expect(controller.playerTwo.color).toEqual('red');
    });
    
    it('Game board initializes correctly', function() {
    	var emptyBoard = [];
    	for (var i = 0; i < controller.boardSettings.rows; i++) {
    		var temp = [];
    		for (var j = 0; j < controller.boardSettings.cols; j++){
    			temp.push(null);
    		}
    		emptyBoard.push(temp);
    	}
    	$('#game #menu-screen h3.continue').trigger('click');
    	expect(controller.board).toEqual(emptyBoard);
    });
    
    it('Tokens fall to bottom of board of column clicked on, and stack on top of each other', function() {
    	
    	// set player one red and initialize board
    	$('#game #splash-screen h2.continue').trigger('click');
    	$('#game #menu-screen #color-selection .red').trigger('click');
    	$('#game #menu-screen h3.continue').trigger('click');
    	
    	// p1 clicks near top of grid move
    	$('#game #game-screen #token01').trigger('click');
    	expect(controller.board[5][1] === 0);
    	
    	// p2 clicks near top of grid move
    	$('#game #game-screen #token02').trigger('click');
    	expect(controller.board[4][1] === 1);
    	
    });
    
    it('Four token chain of the same color in a row results in a win', function() {
    	// set player one red and initialize board
    	$('#game #splash-screen h2.continue').trigger('click');
    	$('#game #menu-screen #color-selection .red').trigger('click');
    	$('#game #menu-screen h3.continue').trigger('click');
    	
    	// p1 
    	$('#game #game-screen #token00').trigger('click');
    	
    	// p2 
    	$('#game #game-screen #token06').trigger('click');
    	
    	// p1 
    	$('#game #game-screen #token01').trigger('click');
    	
    	// p2 
    	$('#game #game-screen #token06').trigger('click');   
    	
    	// p1 
    	$('#game #game-screen #token02').trigger('click');
    	
    	// p2 
    	$('#game #game-screen #token06').trigger('click');  
    	
    	// p1 
    	$('#game #game-screen #token03').trigger('click');
    	
    	expect(controller.currentPlayer.hasWon).toBe(true);
    });
    
    it('Four token chain of the same color in a column results in a win', function() {
    	// set player one red and initialize board
    	$('#game #splash-screen h2.continue').trigger('click');
    	$('#game #menu-screen #color-selection .red').trigger('click');
    	$('#game #menu-screen h3.continue').trigger('click');
    	
    	// p1 
    	$('#game #game-screen #token00').trigger('click');
    	
    	// p2 
    	$('#game #game-screen #token06').trigger('click');
    	
    	// p1 
    	$('#game #game-screen #token10').trigger('click');
    	
    	// p2 
    	$('#game #game-screen #token06').trigger('click');   
    	
    	// p1 
    	$('#game #game-screen #token20').trigger('click');
    	
    	// p2 
    	$('#game #game-screen #token06').trigger('click');  
    	
    	// p1 
    	$('#game #game-screen #token30').trigger('click');
    	
    	expect(controller.currentPlayer.hasWon).toBe(true);
    });
    
    it('Four token chain of the same color in a top-left to bottom-right diagonal result in a win', function() {
    	// set player one red and initialize board
    	$('#game #splash-screen h2.continue').trigger('click');
    	$('#game #menu-screen #color-selection .red').trigger('click');
    	$('#game #menu-screen h3.continue').trigger('click');
    	
    	// p1 
    	$('#game #game-screen #token04').trigger('click');
    	
    	// p2 
    	$('#game #game-screen #token03').trigger('click');
    	
    	// p1 
    	$('#game #game-screen #token03').trigger('click');
    	
    	// p2 
    	$('#game #game-screen #token02').trigger('click');   
    	
    	// p1 
    	$('#game #game-screen #token01').trigger('click');
    	
    	// p2 
    	$('#game #game-screen #token02').trigger('click');  
    	
    	// p1 
    	$('#game #game-screen #token02').trigger('click');
    	
    	// p1  
    	$('#game #game-screen #token00').trigger('click');
    	
    	// p2 
    	$('#game #game-screen #token01').trigger('click');
    	
    	// p1 
    	$('#game #game-screen #token01').trigger('click');
    	
    	// p2 
    	$('#game #game-screen #token01').trigger('click');    	
    	
    	expect(controller.currentPlayer.hasWon).toBe(true);    	
    });
    
    it('Four token chain of the same color in a top-right to bottom-left diagonal result in a win', function() {
    	// set player one red and initialize board
    	$('#game #splash-screen h2.continue').trigger('click');
    	$('#game #menu-screen #color-selection .red').trigger('click');
    	$('#game #menu-screen h3.continue').trigger('click');
    	
    	// p1 - 1
    	$('#game #game-screen #token00').trigger('click');
    	
    	// p2 - 2
    	$('#game #game-screen #token01').trigger('click');
    	
    	// p1 - 3
    	$('#game #game-screen #token01').trigger('click');
    	
    	// p2 - 4 
    	$('#game #game-screen #token02').trigger('click');   
    	
    	// p1 - 5
    	$('#game #game-screen #token03').trigger('click');
    	
    	// p2 - 6
    	$('#game #game-screen #token02').trigger('click');  
    	
    	// p1 - 7
    	$('#game #game-screen #token02').trigger('click');
    	
    	// p1 - 8
    	$('#game #game-screen #token04').trigger('click');
    	
    	// p2 - 9
    	$('#game #game-screen #token03').trigger('click');
    	
    	// p1 - 10
    	$('#game #game-screen #token03').trigger('click');
    	
    	// p2 - 11
    	$('#game #game-screen #token03').trigger('click');    	
    	
    	expect(controller.currentPlayer.hasWon).toBe(true);    	
    });    
    
}); 