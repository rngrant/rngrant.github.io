var infinity = 1000000;

/*
 * Function which controls response of the AI if playAI is true
 */
function AIMove(){
    if (AIColor == whiteTurn && !done)
    {
	var move = AIMoveSearch(moves,curDimension,AIColor);
	pieceAt([move.x,move.y]).moveId =moves.length;
	moves.push(move);
	if (AIColor){
	    pieceAt([move.x,move.y]).piece ="white"
	}
	else{
	    pieceAt([move.x,move.y]).piece ="black"
	}
	whiteTurn = !whiteTurn;
    }    
}

/*
 * Function which returns the move the AI should make given.
 * Currently uses random process to choose moves.
 * moves : List of moves already made on the board
 * curDimension: The current dimension of the board
 * AIColor : the current color of the AI 
 */
function AIMoveSearch(moves,curDimension,AIColor)
{
    var squaresEval = ProcessSquares(moves);
    var actions =generateActions(moves,squaresEval);
    var moveLoc = Math.floor(Math.random() * actions.length);
    var move ={x:actions[moveLoc][0], y:actions[moveLoc][1],color:AIColor}
    return move;
}

/* returns true if the game is over, otherwise false
 * moves: List of moves already made on the board
 */
function gameOver(moves){
    if (moves.length >= curDimension*curDimension)
    {
	return true;
    }
    var squaresEval =ProcessSquares(moves);
    return squaresEval.foundSquare;
}

/* Generates a list of possible next actions for the AI, with highest priority first
 * moves: List of moves already made on the board
 * squaresEval: An containing an evaluation of the board
 */
function generateActions(moves,squaresEval){
    var actions = [];
    if(squaresEval.checks.length>0){
	for (pos of squaresEval.checks)
	{
	    actions.push(pos);
	}
    }
    else if (squaresEval.corners.length>0){
	for (pos of squaresEval.corners)
	{
	    actions.push(pos);
	}
    }
    else{
	moveBoard = generateMoveBoard(moves);
	for (var i =0; i < curDimension; i++){
	    for (var j =0; j <curDimension; j++){	    
		if( moveBoard[i][j]==0){
		    actions.push([i,j]);
		}
	    }
	}
    }
    return actions;
}
