/* Old code attempting to use alpha beta pruning
 * 
 */


/*
 * Function which returns the move the AI should make given
 * moves : List of moves already made on the board
 * curDimension: The current dimension of the board
 * AIColor :
 
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
}*/

/*
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
}*/

/*
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
    //if (squaresEval.corners.length>0){
    //var ctr=0;
    //
    //}
    return 0;

}*/
