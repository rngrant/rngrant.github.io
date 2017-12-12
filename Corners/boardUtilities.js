function clearBoard()
{
    done =false;
    board = [];
    moves=[];
    currentRule=nextRule;
    curDimension = nextDimension;
    whiteTurn =true;
    displayGame(curDimension);
    updateBoard();
}

function undo()
{
    var lastsquare =moves.pop();
    board[lastsquare.x +lastsquare.y*curDimension].piece="empty";
    whiteTurn=!whiteTurn;
    for(square of board){
	square.win=false;
	square.check=false;
    }
    
    done =false;
    checkSquares(moves);
    updateBoard();
}


function updateBoard(){
    for (var i=0;i<curDimension; i++)
    {
	for (var j=0;j<curDimension; j++)
	{
	    var square = board[i*curDimension+j];
	    updateSquareFill(square);
	    updatePieceFill(square);
	    updateMoveId(square);	    	    
	}
    }
    
    if(done){
	d3.select('#svg-title').text("Game over");
    }
    else if (whiteTurn){
	d3.select('#svg-title').text("White's Turn");
    }
    else
    {
	d3.select('#svg-title').text("Black's Turn");
    }    
}

function updateSquareFill(square){
    var fillcolor;
    if(square.win){
	fillcolor='red';
    }
    else if (showChecks && !done &&
	     square.check && square.piece == "empty")
    {
	fillcolor='yellow';
    }
    else{
	fillcolor='green';
    }
    d3.select("#square"+square.x+"-"+square.y)
	.style('fill', fillcolor);    
}
function updatePieceFill(square){
    if (square.piece!="empty"){
	d3.select("#circle"+square.x+"-"+square.y)
	    .style('fill',square.piece);
    }
    else{
	if (showChecks && !done && square.check) {
            d3.select("#circle"+square.x+"-"+square.y)
		.style('fill', 'yellow');
        } else {
            d3.select("#circle"+square.x+"-"+square.y)
		.style('fill','green');
        }
	
	d3.select("#text"+square.x+"-"+square.y)
	    .text("");
    }
}
function updateMoveId(square){
    if (showMoveIds) {
        if (square.piece != "empty") {
            var invertedColor;
            if (square.piece == 'white') {
                invertedColor = 'black';
            } else {
                invertedColor = 'white';
            }
            d3.select("#text"+square.x+"-"+square.y)
		.style('fill', invertedColor)
		.text(square.moveId + 1);
        }
    }
    else {
        d3.select("#text"+square.x+"-"+square.y)
	    .text("");	    
    }
}
