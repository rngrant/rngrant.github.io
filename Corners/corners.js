/* Given a list of moves checks for squares in check, and winning squares
 * Ends the game if a play has won
 */
function checkSquares(movesList){
    squaresEval = ProcessSquares(movesList);
    done= squaresEval.foundSquare;
    for (pos of squaresEval.wins){
	pieceAt(pos).win=true;
    }
    for (pos of squaresEval.checks){
	pieceAt(pos).check=true;
    }   
    if (movesList.length >= curDimension*curDimension)
    {
	done=true;
    }
}

/* Given a list of moves returns an object representing an
 * evaluation of the board
 * movesList :a list of move objects representing previous moves
 */
function ProcessSquares(movesList){
    var squaresEval = {foundSquare:false,corners:[],checks:[],
		       wins:[],whiteTempo:false, blackTempo:true};
    var moveBoard = generateMoveBoard(movesList);
       
    for (var i=0; i < movesList.length && !squaresEval.foundSquare; i++){
	var corner1 =movesList[i];
	for (var j=i+1; j <movesList.length && !squaresEval.foundSquare;j++){
	    var corner2 = movesList[j];
	    if (corner1.color == corner2.color){
		side = [corner1.x-corner2.x,
			corner1.y-corner2.y]
		if(corner2.color && sideLongEnough(side)){
		    squareEval = ProcessSquare([corner1.x,corner1.y],
					       [corner2.x,corner2.y],
					       side,moveBoard,1);
		    squaresEval.whiteTempo |= squareEval.whiteTempo;
		    squaresEval.blackTempo |= squareEval.blackTempo;
		    squaresEval.corners=
			squaresEval.corners.concat(squareEval.corners);
		    squaresEval.checks=
			squaresEval.checks.concat(squareEval.checks);
		    squaresEval.wins.concat(squareEval.wins);
		    squaresEval.wins=
			squaresEval.wins.concat(squareEval.wins);
		    squaresEval.foundSquare |= squareEval.foundSquare;;
		}
		else if (sideLongEnough(side)){
		    squareEval = ProcessSquare([corner1.x,corner1.y],
					 [corner2.x,corner2.y],
					       side,moveBoard,-1);
		    squaresEval.corners=
			squaresEval.corners.concat(squareEval.corners);
		    squaresEval.checks=
			squaresEval.checks.concat(squareEval.checks);
		    squaresEval.wins.concat(squareEval.wins);
		    squaresEval.wins=
			squaresEval.wins.concat(squareEval.wins);
		    squaresEval.foundSquare |= squareEval.foundSquare;
		    squaresEval.corners.concat(squareEval.corners);
		    squaresEval.checks.concat(squareEval.checks);
		    squaresEval.wins.concat(squareEval.wins);
		}
	    }
	}
    }
    return squaresEval;
}

/* Evaluate a single square to see if it forms a win, or is involved in check
 * pos1      : the position of the first piece
 * pos2      : the position of the second piece
 * side      : an array of size 2 representing the distance between the positions
 * moveBoard : a 2D array of integers representing the current state of the board
 * color     : an integer representing the color of the piece to evaluate
 */
function ProcessSquare(pos1,pos2,side,moveBoard,color){
    var squareEval = {foundSquare:false,corners:[],checks:[],
		      wins:[],whiteTempo:false,blackTempo:false};
    var pos3 = [pos1[0]+side[1],pos1[1]-side[0]];
    var pos4 = [pos2[0]+side[1],pos2[1]-side[0]];
    var pos5 = [pos1[0]-side[1],pos1[1]+side[0]];
    var pos6 = [pos2[0]-side[1],pos2[1]+side[0]];
    var p3exists = pos3[0]>=0 && pos3[0]<curDimension
	&& pos3[1]>=0 && pos3[1]<curDimension;
    var p3good =p3exists && moveBoard[pos3[0]][pos3[1]] == color;
    var p4exists = pos4[0]>=0 && pos4[0]<curDimension
	&& pos4[1]>=0 && pos4[1]<curDimension;
    var p4good = p4exists && moveBoard[pos4[0]][pos4[1]] == color;
    var p5exists = pos5[0]>=0 && pos5[0]<curDimension
	&& pos5[1]>=0 && pos5[1]<curDimension;
    var p5good = p5exists && moveBoard[pos5[0]][pos5[1]] == color;
    var p6exists = pos6[0]>=0 && pos6[0]<curDimension
	&& pos6[1]>=0 && pos6[1]<curDimension;
    var p6good = p6exists && moveBoard[pos6[0]][pos6[1]] == color;
    if(p3exists && p4exists){
	if (moveBoard[pos3[0]][pos3[1]]==0)
	{
	    squareEval.corners.push(pos3);
	}
	if (moveBoard[pos4[0]][pos4[1]]==0)
	{
	    squareEval.corners.push(pos4);
	}
        if (p3good && p4good) {
            squareEval.wins.push(pos1);
            squareEval.wins.push(pos2);
	    squareEval.wins.push(pos3);
	    squareEval.wins.push(pos4);	    
	    squareEval.foundSquare = true;
	    return squareEval;
	}
	else if (p3good && moveBoard[pos4[0]][pos4[1]]==0) {	    
	    squareEval.checks.push(pos4);
	    if(color ==1){ squareEval.whiteTempo=true;}
	    else{ squareEval.blackTempo=true; }
        }
	else if (p4good && moveBoard[pos3[0]][pos3[1]]==0) {
	    squareEval.checks.push(pos3);
	    if(color ==1){ squareEval.whiteTempo=true;}
	    else{ squareEval.blackTempo=true; }
        }
    }
    if(p5exists && p6exists){
	if (moveBoard[pos5[0]][pos5[1]]==0)
	{
	    squareEval.corners.push(pos5);
	}
	if (moveBoard[pos6[0]][pos6[1]]==0)
	{
	    squareEval.corners.push(pos6);
	}
	if (p5good && p6good) {
	    squareEval.wins.push(pos1);
            squareEval.wins.push(pos2);
	    squareEval.wins.push(pos5);
	    squareEval.wins.push(pos6);
	    squareEval.foundSquare = true;
	    return squareEval;
	}
	else if (p5good && moveBoard[pos6[0]][pos6[1]]==0) {
            squareEval.checks.push(pos6);
	    if(color ==1){ squareEval.whiteTempo=true;}
	    else{ squareEval.blackTempo=true; }
        }
	else if (p6good && moveBoard[pos5[0]][pos5[1]]==0) {
	    squareEval.checks.push(pos5);
	    if(color ==1){ squareEval.whiteTempo=true;}
	    else{ squareEval.blackTempo=true; }
        }
    }
    return squareEval;
}

/* Return the piece at the given position
 * pos: an array of size 2 representing a position on the board
 */
function pieceAt(pos) {
    return board[pos[0] + pos[1]*curDimension];
}

/* Given a side, return if the side is long enough to be part of a square
 * side: an array of size 2 representing the difference between 
 * two positions on the board
 */
function sideLongEnough(side){
    if(currentRule==0){
	return true;	
    }
    else if(currentRule==1){
	return (Math.abs(side[0])+Math.abs(side[1]))>1;
    }
    else{
	return Math.abs(side[0])>1 || Math.abs(side[1])>1;
    }
}



function generateMoveBoard(moves){
    var moveBoard = []
    for (var i=0; i<curDimension;i++){
	var row =[];
	for (var j=0; j<curDimension;j++){
	    row.push(0);
	}
	moveBoard.push(row);
    }
    for (var move of moves){
	if(move.color)
	{
	    moveBoard[move.x][move.y]=1;
	}
	else
	{
	    moveBoard[move.x][move.y]=-1;
	}	
    }

    return moveBoard;
}
			   
