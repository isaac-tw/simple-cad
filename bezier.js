var oldX, oldY;
var movingVertex = false;
var vertexMoved;

function bezierMouseDown(event) {
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
				bezierPrint();
			}
		}
		oldX = event.pageX;
		oldY = event.pageY;
	}
}
function bezierMouseMove(event) {
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
			bezierPrint();
		}
	}
		
	oldX = event.pageX;
	oldY = event.pageY;
}

function bezierMouseUp() {
	ctx.beginPath();
	movingVertex = false;
}


function bezierPrint() {
	if (!modelBulid) {
		clearCanvas();
		printControl();
		
	    for(i=0 ; i<=10 ; i++){
	    	var t = (i / 10);
	    	var tempX = ( Math.pow((1-t), 3) * recordArray[0][0] ) + ( 3 * t * Math.pow((1-t), 2) * recordArray[1][0] ) + ( 3 * (1-t) * Math.pow(t, 2) * recordArray[2][0] ) + ( Math.pow(t, 3) * recordArray[3][0] );
	    	var tempY = ( Math.pow((1-t), 3) * recordArray[0][1] ) + ( 3 * t * Math.pow((1-t), 2) * recordArray[1][1] ) + ( 3 * (1-t) * Math.pow(t, 2) * recordArray[2][1] ) + ( Math.pow(t, 3) * recordArray[3][1] );
	    	var tempZ = ( Math.pow((1-t), 3) * recordArray[0][2] ) + ( 3 * t * Math.pow((1-t), 2) * recordArray[1][2] ) + ( 3 * (1-t) * Math.pow(t, 2) * recordArray[2][2] ) + ( Math.pow(t, 3) * recordArray[3][2] );
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



















