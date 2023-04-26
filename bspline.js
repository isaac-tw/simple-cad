var oldX, oldY;
var movingVertex = false;
var vertexMoved;
var cArray = new Array(5);
var xArray = new Array(6);
var n13, n23, n33, n43;
var tempN, tempK;

function bsplineMouseDown(event) {
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
				bsplinePrint();
			}
		}
		oldX = event.pageX;
		oldY = event.pageY;
	}
}
function bsplineMouseMove(event) {
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
			bsplinePrint();
		}
	}
		
	oldX = event.pageX;
	oldY = event.pageY;
}

function bsplineMouseUp() {
	ctx.beginPath();
	movingVertex = false;
}


function bsplinePrint() {
	if (!modelBulid) {
		clearCanvas();
		printControl();
		
		tempN = 3;
		tempK = 2;
		
		
		cArray[0] = 0;
		cArray[1] = Math.sqrt( Math.pow((recordArray[1][0] - recordArray[0][0]), 2) + Math.pow((recordArray[1][1] - recordArray[0][1]), 2) );
		cArray[2] = Math.sqrt( Math.pow((recordArray[2][0] - recordArray[1][0]), 2) + Math.pow((recordArray[2][1] - recordArray[1][1]), 2) );
		cArray[3] = Math.sqrt( Math.pow((recordArray[3][0] - recordArray[2][0]), 2) + Math.pow((recordArray[3][1] - recordArray[2][1]), 2) );
		cArray[4] = cArray[1] + cArray[2] + cArray[3];
		
		//xArray[0], xArray[1]
		for(s=0 ; s<tempK ; s++)
			xArray[s] = 0;
		
		//xArray[2], xArray[3]
		for(s=0 ; s < (tempN - tempK + 1) ; s++)
			xArray[s + tempK] = ( tempN - tempK + 2 ) * ( ( ( ( (s+1) * cArray[s+2] ) / ( tempN - tempK + 2 ) ) + cArray[s+1] + cArray[s] ) / cArray[4] ) ;
		
		//xArray[4], xArray[5]
		for(s = ( tempN + 1 ) ; s < (tempN + tempK + 1) ; s++)
			xArray[s] = tempN - tempK + 2;
		
		
	    for(i=0 ; i<=25 ; i++){
	    	var t = (i / 10);
	    	
	    	if ( ( t >= 0 ) && ( t < xArray[2] ) ) {
	    		n13 = Math.pow(( xArray[2] - t ), 2) / Math.pow(xArray[2], 2);
	    		n23 = ( ( t*(xArray[2] - t) ) / Math.pow(xArray[2], 2) ) + (xArray[3] - t)*t / ( xArray[2] * xArray[3] );
	    		n33 = Math.pow(t, 2) / ( xArray[2] * xArray[3] );
	    		n43 = 0;
	    	}
	    	
	    	if ( ( t >= xArray[2] ) && ( t < xArray[3] ) ) {
	    		n13 = 0;
	    		n23 = Math.pow(( xArray[3] - t ), 2) / ( xArray[3] * ( xArray[3] - xArray[2] ) );
	    		n33 = ( t / xArray[3] ) * ( ( xArray[3] - t ) / ( xArray[3] - xArray[2] ) ) + ( ( 3 - t ) / ( 3 - xArray[2] ) ) * ( ( t - xArray[2] ) / ( xArray[3] - xArray[2] ) );
	    		n43 = Math.pow(( t - xArray[2] ), 2) / ( ( 3 - xArray[2] ) * ( xArray[3] - xArray[2] ) );
	    	}
	    	
	    	if ( ( t >= xArray[3] ) && ( t < 3 ) ) {
	    		n13 = 0;
	    		n23 = 0;
	    		n33 = Math.pow(( 3 - t ), 2) / ( ( 3 - xArray[2] ) * ( 3 - xArray[3] ) );
	    		n43 = ( ( t - xArray[2] ) * ( 3 - t ) ) / ( ( 3 - xArray[2] ) * ( 3 - xArray[3] ) ) + ( ( 3 - t ) * ( t - xArray[3] ) ) / Math.pow(( 3 - xArray[3] ), 2);
	    	}
	    	
	    	
	    	var tempX = n13*recordArray[0][0] + n23*recordArray[1][0] + n33*recordArray[2][0] + n43*recordArray[3][0];
	    	var tempY = n13*recordArray[0][1] + n23*recordArray[1][1] + n33*recordArray[2][1] + n43*recordArray[3][1];
	    	var tempZ = n13*recordArray[0][2] + n23*recordArray[1][2] + n33*recordArray[2][2] + n43*recordArray[3][2];
	    	//var tempZ = 125;
	    	
	    	curveArray[i] = new Array(tempX, tempY, tempZ);
	    }
	    
	    //curveArray[26] = recordArray[3];
	    curveArray[i] = new Array(recordArray[3][0], recordArray[3][1], 0);
		
	    if (!movingVertex) {
			var tempColor = document.getElementById("colorID").value;
			endPointArray[0] = new Array(tempColor, tempColor, tempColor);
			curveArray = curveArray.concat(endPointArray);
		}
		
		//alert(printArray2(curveArray));
		//printArray(curveArray);
		printCurve(curveArray);
	}
}



















