var oldX, oldY;
var movingVertex = false;
var vertexMoved;

function cubicMouseDown(event) {
	//if right canvas
	if ( planeJudge(event.pageX, event.pageY) == "Draw" ) {
		var tempCanvas = document.getElementById("canvas_Draw");
		ctx = tempCanvas.getContext("2d");
		
		var tempPoint = planePointAdjust(event.pageX, event.pageY);
		if (enterPoint == 0) {
			for(i=0 ; i<recordArray.length ; i++) {
				if( isNumber(recordArray[i][0]) ) {
					//adjust
					if ( ( tempPoint[0][0] > recordArray[i][0]-2 ) && ( tempPoint[0][0] < recordArray[i][0]+5 ) &&
						 ( tempPoint[0][1] > recordArray[i][1]-2 ) && ( tempPoint[0][1] < recordArray[i][1]+5 ) ) {
						movingVertex = true;
						vertexMoved = i;
						//alert("bingo, movingVertex=" + movingVertex);
						break;
					}
					//nothing
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
			
			recordArray = recordArray.concat(tempPoint);
			//alert(recordArray.length);
			enterPoint--;
			
			if(enterPoint == 0){
				clearCanvas();
				var tempColor = "cyan";
				endPointArray[0] = new Array(tempColor, tempColor, tempColor);
				recordArray = recordArray.concat(endPointArray);
				//printArray(recordArray);
				cubicPrint();
			}
		}
		
		oldX = event.pageX;
		oldY = event.pageY;
	}
}
function cubicMouseMove(event) {
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
	
	//add new point
	if (enterPoint != 0) {
		clearCanvas();
		printControl();
		
		ctx.beginPath();
		ctx.moveTo(recordArray[recordArray.length-1][0], recordArray[recordArray.length-1][1]);
		ctx.lineTo(tempPoint[0][0], tempPoint[0][1]);
		ctx.strokeStyle = "cyan";
		ctx.stroke();
		//alert("!!");
	}
	//adjust
	else{
		//alert("movingVertex=" + movingVertex);
		if (movingVertex) {
			//alert("moving");
			var distanceX = event.pageX - oldX ;
			var distanceY = event.pageY - oldY ;
			//alert("moving ; dX=" + distanceX + " ; dY=" + distanceY);
			recordArray[vertexMoved][0] += distanceX;
			recordArray[vertexMoved][1] += distanceY;
			cubicPrint();
		}
	}
		
	oldX = event.pageX;
	oldY = event.pageY;
}

function cubicMouseUp() {
	ctx.beginPath();
	movingVertex = false;
}


function cubicPrint() {	
	if (!modelBulid) {
		clearCanvas();
		if (movingVertex)
			printControl();
		else
			printControl("cubic");
	    
		var primeX_0 = recordArray[0][0] - recordArray[1][0];
		var primeY_0 = recordArray[0][1] - recordArray[1][1];
		var primeZ_0 = recordArray[0][2] - recordArray[1][2];
	
		var primeX_1 = recordArray[4][0] - recordArray[3][0];
		var primeY_1 = recordArray[4][1] - recordArray[3][1];
		var primeZ_1 = recordArray[4][2] - recordArray[3][2];
		
		//alert('[tempX, tempY, tempZ]');
		
	    for(i=0 ; i<=10 ; i++){
	    	var t = (i / 10);
	    	var tempX = ( 2*Math.pow(t, 3) - 3*Math.pow(t, 2) +1 )*recordArray[1][0] + ( (-2)*Math.pow(t, 3) + 3*Math.pow(t, 2) )*recordArray[4][0] + ( Math.pow(t, 3) - 2*Math.pow(t, 2) + t )*primeX_0 + ( Math.pow(t, 3) - Math.pow(t, 2) )*primeX_1;
	    	var tempY = ( 2*Math.pow(t, 3) - 3*Math.pow(t, 2) +1 )*recordArray[1][1] + ( (-2)*Math.pow(t, 3) + 3*Math.pow(t, 2) )*recordArray[4][1] + ( Math.pow(t, 3) - 2*Math.pow(t, 2) + t )*primeY_0 + ( Math.pow(t, 3) - Math.pow(t, 2) )*primeY_1;
	    	var tempZ = ( 2*Math.pow(t, 3) - 3*Math.pow(t, 2) +1 )*recordArray[0][2] + ( (-2)*Math.pow(t, 3) + 3*Math.pow(t, 2) )*recordArray[1][2] + ( Math.pow(t, 3) - 2*Math.pow(t, 2) + t )*primeZ_0 + ( Math.pow(t, 3) - Math.pow(t, 2) )*primeZ_1;
	  	
	    	curveArray[i] = new Array(tempX, tempY, 0);
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

















