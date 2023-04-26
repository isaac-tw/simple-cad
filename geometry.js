function geoMouseDown(event) {
	//if right canvas
	if ( planeJudge(event.pageX, event.pageY) == "Draw" ) {
		var tempCanvas = document.getElementById("canvas_Draw");
		ctx = tempCanvas.getContext("2d");
	
		var tempSide = parseInt(document.getElementById("text_side").value);
		var tempRadius = parseInt(document.getElementById("text_radius").value);
		
		if ( isNumber(tempSide) && isNumber(tempRadius) ) {
			document.getElementById("msgPanel").innerHTML = "";
			document.getElementById("msgPanel").style.backgroundColor = "transparent";
			var tempPoint = planePointAdjust(event.pageX, event.pageY);
			var tempAngle = ( 2/tempSide ) * Math.PI;
			
			//new array for saving position data
			var tempArray = new Array(tempSide+1);
			
			for (i=0 ; i<=tempSide ; i++)
				tempArray[i] = new Array(1, 1, 1);
				
			for (i=0 ; i<tempSide ; i++) {
				tempArray[i][0] = tempRadius * Math.cos( tempAngle * (i+1) );
				tempArray[i][1] = tempRadius * Math.sin( tempAngle * (i+1) );
				tempArray[i][2] = 0;
			}
		
			tempArray[tempSide][0] = tempArray[0][0];
			tempArray[tempSide][1] = tempArray[0][1];
			tempArray[tempSide][2] = tempArray[0][2];
			
			printGeometry(tempArray, tempPoint[0][0], tempPoint[0][1]);
		}
		else {
			if ( !isNumber(tempSide) && !isNumber(tempRadius) )
				var tempMsg = 'please enter "Side" & "Radius" numbers';
			else if ( !isNumber(tempSide) && isNumber(tempRadius) )
				var tempMsg = 'please enter "Side" number';
			else if ( isNumber(tempSide) && !isNumber(tempRadius) )
				var tempMsg = 'please enter "Radius" number';
			document.getElementById("msgPanel").style.backgroundColor = "gray";
			document.getElementById("msgPanel").innerHTML = tempMsg;
		}
	}
}

function geoMouseMove(event) {
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
}

function printGeometry(tArray, x, y) {	
	tArray[0][0] += x;
	tArray[0][1] += y;
	
	ctx.strokeStyle = document.getElementById("colorID").value;
	ctx.beginPath();
	ctx.moveTo(tArray[0][0],tArray[0][1]);

	for(i=1 ; i<tArray.length ; i++){
		tArray[i][0] += x;
		tArray[i][1] += y;
		ctx.lineTo(tArray[i][0],tArray[i][1]);
	}
	ctx.closePath();
	ctx.stroke();
	ctx.beginPath();
	curveArray = curveArray.concat(tArray);
	var tempColor = document.getElementById("colorID").value;
	endPointArray[0] = new Array(tempColor, tempColor, tempColor);
	curveArray = curveArray.concat(endPointArray);
}