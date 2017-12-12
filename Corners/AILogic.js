var infinity = 1000000;

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

function AIMoveSearch(moves,curDimension,AIColor)
{
    var moveBoard = generateMoveBoard(moves);
    var squaresEval = ProcessSquares(moves);
    var actionEval;
    if (AIColor)
    {
	actionEval = ABmax(moves,-infinity,infinity,evalMoves,1);
    }
    else{
	actionEval = ABmin(moves,-infinity,infinity,evalMoves,1);
    }
    var move ={x:actionEval.action[0], y:actionEval.action[1],color:AIColor}
    return move;
}


function ABmin(moves, alpha,beta,evalFun,depth)
{
    if (depth <= 0 || gameOver(moves)){
	return {action:null,value:evalFun(moves)};
    }
    else{
	var actions = generateActions(moves);
	var bestVal = infinity;
	var bestAction= actions[0];
	for (var i= 0; i<actions.length; i++){
	    var move = {x:actions[i][0],y:actions[i][1],color:false}
	    var newMoves = [move].concat(moves);
	    actionVal=ABmax(newMoves,alpha,beta,evalFun,depth-1);
	    if (actionVal<bestVal)
	    {
		bestAction = actions[i];
		bestVal = actionVal;
	    }
	    beta = Math.min(bestVal,beta);
	    if (beta < alpha){
		i =actions.length;
	    }
	}
	return {action:bestAction,value:bestVal};
    }
}

function ABmax(moves, alpha, beta,evalFun,depth){
    if (depth <= 0 || gameOver(moves)){
	return {action:null,value:evalFun(moves)};
    }
    else{
	var actions = generateActions(moves);
	var bestVal = - infinity;
	var bestAction= actions[0];
	for (var i= 0; i<actions.length; i++){
	    var move = {x:actions[i][0],y:actions[i][1],color:true}
	    var newMoves = [move].concat(moves);
	    actionVal=ABmin(newMoves,alpha,beta,evalFun);
	    if (actionVal>bestVal)
	    {
		bestAction = actions[i];
		bestVal = actionVal;
	    }
	    beta = Math.max(bestVal,alpha);
	    if (beta > alpha){
		i =actions.length;
	    }
	}
	return {action:bestAction,value:bestVal};
    }
}

function evalMoves(moves){
    var moveBoard = generateMoveBoard(moves);
    var squaresEval = ProcessSquares(moves);
    if(squaresEval.foundSquare){
	if(squaresEval.wins[0].color){
	    return 1000- moves.length;
	}
	else{
	    return -1000 +moves.length;
	}
    }
    if (squaresEval.whiteTempo ==squaresEval.blackTempo){
	return 0;
    }
    else if (squaresEval.whiteTempo)
    {
	return 100;
    }
    else if (squaresEval.blackTempo) {
	return -100;
    }
    //Possible future addition
    /*if (squaresEval.corners.length>0){
	var ctr=0;
	
    }*/
    return 0;

}

function gameOver(moves){
    if (moves.length >= curDimension*curDimension)
    {
	return true;
    }
    var squaresEval =ProcessSquares(moves);
    return squaresEval.foundSquare;
}

function generateActions(moves){
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
