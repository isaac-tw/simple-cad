var oldX, oldY;

function moveMouseDown(event) {
	//if right canvas
	if ( planeJudge(event.pageX, event.pageY) == "Draw" ) {
		var tempCanvas = document.getElementById("canvas_Draw");
		ctx = tempCanvas.getContext("2d");
		
		ctx.beginPath();
		ctx.strokeStyle = document.getElementById("colorID").value;
		oldX = event.pageX;
		oldY = event.pageY;
		moving = true;
	}
}

function moveMouseMove(event) {
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

	if (moving) {
		clearCanvas();
		curveArray = ArrayTrans(curveArray, "move", "Draw", ( event.pageX - oldX ), ( event.pageY - oldY ));
//				printArray(recordArray);
		printTrans();
		oldX = event.pageX;
		oldY = event.pageY;
	}
}

function moveMouseUp() {
	ctx.beginPath();
	moving = false;
}