/* Global Variables*/
var board = [];
var moves=[];

var done =false;
var whiteTurn =true;
var AIColor = false;
var showMoveIds =true;
var showChecks = true;
var playAI = true;
//false means black, true means white
// Will be used in the statement AIColor == whiteTurn
var squareSize =50;

var rules = ["any size", "not all touching", "no touching"];

var curDimension=5;
var nextDimension=5;

var currentRule = 1;
var nextRule =1;

/*Setup the game */
displayGame(curDimension);
setupSettings();

/*Setup and Display functions*/

function setupSettings(){
    var config = d3.select("#otherSettings");
    setupShowMoves(config);
    setupShowChecks(config);
    setupPlayAI(config);
    setupDimensions();
    setupSquaresize();      
}


function displayGame(dimension){
    var svg = initSvg(dimension);
    displaySquares(svg);
    displayPieces(svg);
    displayPieceNums(svg);                   
}

/*Helper methods for setupSettings*/
function setupShowMoves(config){
    config.append('label')
    .attr('for', 'showMoves')
    .text("Show Move Numbers");
    config.append('input')
	.attr('type', 'checkbox')
	.attr('checked', showMoveIds)
	.attr('id', 'showMoves')
	.on('change', function() {
	    showMoveIds = this.checked;
	    updateBoard();
	});
}
function setupShowChecks(config){
    config.append('label')
	.attr('for', 'showChecks')
	.text("Show Forced Squares");
    config.append('input')
	.attr('type', 'checkbox')
	.attr('checked', showChecks)
	.attr('id', 'showChecks')
	.on('change', function() {
	    showChecks = this.checked;
	    updateBoard();
	});
}
function setupPlayAI(config){
    config.append('label')
	.attr('for', 'playAI')
	.text("Play Against AI");
    config.append('input')
	.attr('type', 'checkbox')
	.attr('checked', playAI)
	.attr('id', 'playAI')
	.on('change', function() {
	    playAI = this.checked;
	    if (playAI)
	    {
		AIColor = !whiteTurn;
	    }
	    updateBoard();
	});
}


function setupDimensions(){
    // Setup dimension    
    d3.select('#dimensions')
	.append('input')
	.attr('id','dimension')
	.attr('type','number')
	.attr('value',nextDimension)
	.on('change',function(){
	    nextDimension = this.value;
	});    
    d3.select('#dimOption'+curDimension).attr('selected','true');
}
function setupSquaresize(){
    d3.select('#squareSizes')
	.append('select')
	.attr('id','squareSize')
	.on('change',function(){
	    nextRule =d3.select(this).node().value;
	}).selectAll('option')
	.data(rules)
	.enter()
	.append('option')
	.attr('id',function(d,i){return 'squareSize'+i;})
	.attr('value', function(d,i){	
	    return i;
	}).text(function(d){
	    return d;
	});
    
    d3.select('#squareSize'+currentRule).attr('selected','true');
}

/*Helper methods for displayGame*/
function initSvg(dimension){
    d3.select('#svg-area').select('svg').remove();

    for (var i=0; i <dimension; i++)
    {
	for (var j =0; j <dimension; j++)
	{
	    var square = {x:j,y:i,piece:"empty",win:false};
	    board.push(square);
	}
    }    
    
    var svg = d3.select('#svg-area')
	.append('svg')
	.attr('width',dimension*squareSize)
	.attr('height',dimension*squareSize);
    return svg;
}

function displaySquares(svg){
    svg.selectAll('rect')
	.data(board)
	.enter()
	.append('rect')
	.attr('id', function(d){return "square"+d.x+"-"+d.y;})
	.attr('width',squareSize)
	.attr('x',function(d){ return d.x*squareSize;})
	.attr('y',function(d){ return d.y*squareSize;})
	.attr('stroke','black')
	.attr('stroke-width','3')
	.attr('height',squareSize)
	.style('fill','green')
}

function displayPieces(svg){
    svg.selectAll('circle')
	.data(board)
	.enter()
	.append('circle')
	.attr('cx',function(d){return d.x*squareSize+0.5*squareSize;})
	.attr('cy',function(d){return d.y*squareSize+0.5*squareSize;})
	.attr('r',0.4*squareSize)
	.style('fill','green')
	.attr('id',function(d){return "circle"+d.x+"-"+d.y;})
	.on('click', playerMove);
}

function displayPieceNums(svg){
    svg.selectAll('text')
	.data(board)
	.enter()
	.append('text')
	.attr('x',function(d){ return d.x*squareSize + 0.5*squareSize;})
	.attr('y',function(d){ return d.y*squareSize + 0.5*squareSize;})
	.attr('text-anchor', 'middle')
	.attr('dominant-baseline', 'middle')
	.attr('id',function(d){return "text"+d.x+"-"+d.y;});
}

function playerMove(d) {
    if (d.piece=="empty" && !done){
	d.moveId = moves.length;
	if(whiteTurn){
	    d.piece ="white";
	    moves.push({x:d.x,y:d.y,color:true});
	}
	else{
	    d.piece ="black";
	    moves.push({x:d.x,y:d.y,color:false});
	}
	whiteTurn = !whiteTurn;
	checkSquares(moves);
	updateBoard();
	//AI move Here
	if (playAI){
	    AIMove();
	}
	checkSquares(moves);
	updateBoard();
    }
}
