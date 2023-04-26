var oldX, oldY;
var movingVertex = false;
var vertexMoved;
var alphaArray = new Array(4);
var alpha, beta;
var c12, c23, c34;
var thx, thy, thz, theta;

function pbMouseDown(event) {
	//if right canvas
	if ( planeJudge(event.pageX, event.pageY) == "Draw" ) {
		var tempCanvas = document.getElementById("canvas_Draw");
		ctx = tempCanvas.getContext("2d");
		
		var tempPoint = planePointAdjust(event.pageX, event.pageY);
		if (enterPoint == 0) {
			for(i=0 ; i<recordArray.length ; i++) {
				if( isNumber(recordArray[i][0]) ) {
					if ( ( tempPoint[0][0] > recordArray[i][0]-2 ) && ( tempPoint[0][0] < recordArray[i][0]+5 ) &&
						 ( tempPoint[0][1] > recordArray[i][1]-2 ) && ( tempPoint[0][1] < recordArray[i][1]+5 ) ) {
						movingVertex = true;
						vertexMoved = i;
						//alert("bingo, movingVertex=" + movingVertex);
						break;
					}
					else
						movingVertex = false;
				}
			}
		}
		//enterPoint != 0
		else {
			showMsg ();
			
			ctx.fillStyle = "red";
			ctx.fillRect(tempPoint[0][0]-4,tempPoint[0][1]-4,6,6);
	
				//add only one color array in the end
				if (recordArray.length == 0)
					recordArray = recordArray.concat(tempPoint);
				else
					recordArray[recordArray.length-1] = tempPoint[0];
				
				var tempColor = "cyan";
				endPointArray[0] = new Array(tempColor, tempColor, tempColor);
				recordArray = recordArray.concat(endPointArray);
				//printArray(recordArray);
				
			enterPoint--;
			
			if(enterPoint == 0){
				clearCanvas();
				pbPrint();
			}
		}
		oldX = event.pageX;
		oldY = event.pageY;
	}
}
function pbMouseMove(event) {
	var tempCanvas = document.getElementById("canvas_Draw");
	ctx = tempCanvas.getContext("2d");
	//print position
	var tempPoint = planePointAdjust(event.pageX, event.pageY);
	
	switch( planeJudge(event.pageX, event.pageY) ) {
		case "Draw":
			p = "(" + (tempPoint[0][0]-200) + "," + (150-tempPoint[0][1]) + "," + 0 + ")\n";
			break;
		default:
			p = "(" + 0 + "," + 0 + "," + 0 + ")\n";
	}
	document.getElementById("point").innerHTML = p;
	
	//adding new point
	if (enterPoint != 0) {
		clearCanvas();
		printControl();
		
		ctx.beginPath();
		ctx.moveTo(recordArray[recordArray.length-2][0], recordArray[recordArray.length-2][1]);
		ctx.lineTo(tempPoint[0][0], tempPoint[0][1]);
		ctx.strokeStyle = "cyan";
		ctx.stroke();
		//alert("!!");
	}
	//move vertex
	else{
		//alert("movingVertex=" + movingVertex);
		if (movingVertex) {
			//alert("moving");
			var distanceX = event.pageX - oldX ;
			var distanceY = event.pageY - oldY ;
			//alert("moving ; dX=" + distanceX + " ; dY=" + distanceY);
			recordArray[vertexMoved][0] += distanceX;
			recordArray[vertexMoved][1] += distanceY;
			pbPrint();
		}
	}
		
	oldX = event.pageX;
	oldY = event.pageY;
}

function pbMouseUp() {
	ctx.beginPath();
	movingVertex = false;
}


function pbPrint() {
	if (!modelBulid) {
		clearCanvas();
		printControl();
		
		c12 = Math.sqrt( Math.pow( ( recordArray[1][0] - recordArray[0][0] ) , 2) + Math.pow( ( recordArray[1][1] - recordArray[0][1] ) , 2) );
		c23 = Math.sqrt( Math.pow( ( recordArray[2][0] - recordArray[1][0] ) , 2) + Math.pow( ( recordArray[2][1] - recordArray[1][1] ) , 2) );
		c34 = Math.sqrt( Math.pow( ( recordArray[3][0] - recordArray[2][0] ) , 2) + Math.pow( ( recordArray[3][1] - recordArray[2][1] ) , 2) );
		
		alpha = c12 / (c23 + c12);
		beta  = c23 / (c23 + c34);
		
		alphaArray[0] = new Array( ( -Math.pow((1-alpha), 2) / alpha ) , ( ( (1-alpha) + alpha*beta) / alpha )          , ( ( -(1-alpha) - alpha*beta) / (1-beta) )                , ( Math.pow(beta, 2) / (1-beta) ) );
		alphaArray[1] = new Array( ( 2*Math.pow((1-alpha), 2) / alpha ), ( ( (-2)*(1-alpha) - alpha*beta ) / alpha ), ( ( 2*(1-alpha) - ( beta*( 1 - 2*alpha ) ) ) / (1-beta) ), ( -Math.pow(beta, 2) / (1-beta) ) );
	    alphaArray[2] = new Array( ( -Math.pow((1-alpha), 2) / alpha ) , ( ( 1 - 2*alpha ) / alpha ), alpha, 0);
	    alphaArray[3] = new Array(0, 1, 0, 0);
	    
	    for(i=0 ; i<=10 ; i++){
	    	var t = (i / 10);
	    	thX   = ( Math.pow(t, 3) * alphaArray[0][0] ) + ( Math.pow(t, 2) * alphaArray[1][0] ) + ( t * alphaArray[2][0] ) + alphaArray[3][0];
	    	thY   = ( Math.pow(t, 3) * alphaArray[0][1] ) + ( Math.pow(t, 2) * alphaArray[1][1] ) + ( t * alphaArray[2][1] ) + alphaArray[3][1];
	    	thZ   = ( Math.pow(t, 3) * alphaArray[0][2] ) + ( Math.pow(t, 2) * alphaArray[1][2] ) + ( t * alphaArray[2][2] ) + alphaArray[3][2];
	    	theta = ( Math.pow(t, 3) * alphaArray[0][3] ) + ( Math.pow(t, 2) * alphaArray[1][3] ) + ( t * alphaArray[2][3] ) + alphaArray[3][3];
	    	
	    	
	    	var tempX = thX*recordArray[0][0] + thY*recordArray[1][0] + thZ*recordArray[2][0] + theta*recordArray[3][0];
	    	var tempY = thX*recordArray[0][1] + thY*recordArray[1][1] + thZ*recordArray[2][1] + theta*recordArray[3][1];
	    	var tempZ = thX*recordArray[0][2] + thY*recordArray[1][2] + thZ*recordArray[2][2] + theta*recordArray[3][2];
	    	//var tempZ = 125;
	    	
	    	curveArray[i] = new Array(tempX, tempY, tempZ);
	    }
	    
	    if (!movingVertex) {
			var tempColor = document.getElementById("colorID").value;
			endPointArray[0] = new Array(tempColor, tempColor, tempColor);
			curveArray = curveArray.concat(endPointArray);
		}
		//alert(printArray2(curveArray));
		
		printCurve(curveArray);
	}
}



















