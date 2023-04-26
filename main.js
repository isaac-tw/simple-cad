var enterPoint;

var planeArraySync = ["ISO","XY","YZ","XZ"];

var recordArray = new Array();
var curveArray = new Array();
var endPointArray = new Array(1);
var modelBulid = false;
var printPos1 = 0;
var printPos2 = 1;
var adjust1;
var adjust2;

	//angle of rotation
var tempAngle = 15;

function isNumber(input) {
    return (input - 0) == input && (''+input).replace(/^\s+|\s+$/g, "").length > 0;
}

function inverse (tArray) {
	var tempArray = new Array(tArray.length);
	for (i=0 ; i<tArray.length ; i++)
		tempArray[i] = new Array(tArray[0].length);
	for (x=0 ; x<tArray.length ; x++) {
		for (y=0 ; y<tArray[0].length ; y++) {
			if( isNumber(tArray[x][y]) )
				tempArray[x][y] = tArray[x][y]*(-1);
			else
				tempArray[x][y] = tArray[x][y];
		}
	}
	return tempArray;
}

function printArray(tArray) {
	var output = "";
	//alert("tArray.length=" + tArray.length + " ; tArray[0].length=" + tArray[0].length);

	for (i=0 ; i<tArray.length ;i++){
		for (j=0 ; j<tArray[0].length ; j++) {
			output += tArray[i][j] + " ";
		}
		output += "<br/>";
	}
	document.getElementById("printArea").innerHTML = output;
}

function printArray2(tArray) {
			var output = "";
	
			for (i=0 ; i<tArray.length ;i++){
				for (j=0 ; j<tArray[0].length ; j++) {
					output += tArray[i][j] + " ";
				}
				output += "\n";
			}
			return output;
}

function planeJudge(mouseX, mouseY) {
	//X-Y
	if( ( mouseX > 7 && mouseX < 408 ) && ( mouseY > 207 && mouseY < 508 ) )
			return "Draw";
	else
			return false;
}

function planePointAdjust(pointX, pointY) {
	var currentPoint = new Array(1);
		currentPoint[0] = new Array(3);
	
	switch( planeJudge(pointX, pointY) ) {
		case "Draw":
			currentPoint[0][0] = pointX-8;
			currentPoint[0][1] = pointY-208;
			currentPoint[0][2] = 0;
			break;
		default:
			currentPoint[0] = [0, 0, 0];
	}
	return currentPoint;
}

function printControl(type) {
	var tempCanvas = document.getElementById("canvas_Draw");
	ctx = tempCanvas.getContext("2d");
	if (type == "cubic") {
		recordArray = recordArray.concat(recordArray);
		
		var tempX = (2/3) * (recordArray[1][0] - recordArray[0][0]) + recordArray[0][0];
		var tempY = (2/3) * (recordArray[1][1] - recordArray[0][1]) + recordArray[0][1];
		var tempZ = 125;
		recordArray[3] = [tempX, tempY, tempZ];
		
		var tempX = (1/3) * (recordArray[1][0] - recordArray[0][0]) + recordArray[0][0];
		var tempY = (1/3) * (recordArray[1][1] - recordArray[0][1]) + recordArray[0][1];
		var tempZ = 125;
		
		recordArray[1] = recordArray[0];
		recordArray[0] = new Array(tempX, tempY, tempZ);
		//printArray(recordArray);
	}

	var firstPoint = true;
		
		for(i=0 ; i<recordArray.length ; i++) {
			if(!isNumber(recordArray[i][0])) {
				ctx.strokeStyle = recordArray[i][0];
				ctx.stroke();
				ctx.beginPath();
				firstPoint = true;
			}
			else {
				//print rec
				ctx.fillStyle = "red";
				ctx.fillRect(recordArray[i][0]-4,recordArray[i][1]-4,6,6);
				
				if(firstPoint) {
					ctx.beginPath();
					ctx.moveTo(recordArray[i][0], recordArray[i][1]);
					firstPoint = false;
				}
				else {
					ctx.lineTo(recordArray[i][0], recordArray[i][1]);
				}
			}
		}
}

function printCurve(tArray) {
	var firstPoint = true;
	
	for(i=0 ; i<tArray.length ; i++) {
		if(!isNumber(tArray[i][0])) {
			ctx.strokeStyle = tArray[i][0];
			ctx.stroke();
			ctx.beginPath();
			firstPoint = true;
		}
		else {
			if(firstPoint) {
				ctx.beginPath();
				ctx.moveTo(tArray[i][printPos1], tArray[i][printPos2]);
				firstPoint = false;
			}
			else
				ctx.lineTo(tArray[i][printPos1], tArray[i][printPos2]);
		}
	}
	//printArray(tArray);
}

function clearCanvas() {
	ctx.clearRect(0,0,400,400);
	ctx.beginPath();
}

function clearAll() {
	for (p=0 ; p<planeArraySync.length ; p++) {
		var tempCanvasID = "canvas_";
		tempCanvasID = tempCanvasID.concat(planeArraySync[p]);

		var tempCanvas = document.getElementById(tempCanvasID);
		ctx = tempCanvas.getContext("2d");
		
		ctx.clearRect(0,0,400,400);
		ctx.beginPath();
	}
	
	var tempCanvas = document.getElementById("canvas_Draw");
	ctx = tempCanvas.getContext("2d");
	
	ctx.clearRect(0,0,400,400);
	ctx.beginPath();
	
	clearArray();
	enterPoint = 0;
	document.getElementById("panelForm").reset();
	
	document.getElementById("PANEL_1_3_forHide").style.visibility="hidden";
	document.getElementById("PANEL_1_4_forHide").style.visibility="hidden";
	document.getElementById("PANEL_1_5_forHide").style.visibility="hidden";
	document.getElementById("PANEL_2").style.visibility="hidden";
	document.getElementById("wholeDiv_2").style.visibility="hidden";
}

function clearArray() {
	curveArray.length = 0;
	recordArray.length = 0;
}

function initialize() {;
	clearAll();
	
	printPos1 = 0;
	printPos2 = 1;
	
	var tempCanvas = document.getElementById("canvas_Draw");
	ctx = tempCanvas.getContext("2d");
	
	document.onmousemove = null;
	document.onmousedown = null;
	document.onmouseup	 = null;
}

function radio_initialize() {
	clearAll();
	clearArray();
	
	var tempCanvas = document.getElementById("canvas_Draw");
	ctx = tempCanvas.getContext("2d");
}

function radio_Geometry() {
	document.getElementById("PANEL_1_3_forHide").style.visibility="visible";
	document.getElementById("PANEL_1_4_forHide").style.visibility="hidden";
	document.getElementById("PANEL_1_5_forHide").style.visibility="hidden";
	document.getElementById("PANEL_2").style.visibility="hidden";
	
	document.onmousemove = geoMouseMove;
	document.onmousedown = geoMouseDown;
	
	document.getElementById("canvas_Draw").style.cursor = "crosshair";
}

function radio_Curve() {
	document.getElementById("PANEL_1_3_forHide").style.visibility="hidden";
	document.getElementById("PANEL_1_4_forHide").style.visibility="visible";
	document.getElementById("PANEL_1_5_forHide").style.visibility="hidden";
	document.getElementById("PANEL_2").style.visibility="hidden";
	
	document.onmousemove = null;
	document.onmousedown = null;
}

function radio_Transform() {
	document.getElementById("PANEL_1_3_forHide").style.visibility="hidden";
	document.getElementById("PANEL_1_4_forHide").style.visibility="hidden";
	document.getElementById("PANEL_1_5_forHide").style.visibility="visible";
	document.getElementById("PANEL_2").style.visibility="hidden";
	
	document.onmousemove = null;
	document.onmousedown = null;
}

function select_Curve() {
	//radio_initialize();
	modelBulid = false;
	
	switch( document.getElementById("select_CurveID").value ){
		case "select_cubic":
			select_cubic();
			break;
		case "select_pb":
			select_pb();
			break;
		case "select_bezier":
			select_bezier();
			break;
		case "select_bspline":
			select_bspline();
			break;
		default:
			enterPoint = 0;
			break;
	}
	
	if ( enterPoint > 0 ) {
		var tempMsg = "please enter  " + enterPoint + "  more vertex";
		document.getElementById("msgPanel").innerHTML = tempMsg;
		document.getElementById("canvas_Draw").style.cursor = "crosshair";
		document.getElementById("msgPanel").style.backgroundColor = "gray";
	}
	else {
		document.getElementById("msgPanel").innerHTML = "";
		document.getElementById("msgPanel").style.backgroundColor = "transparent";
	}
}

function printTrans() {
	var tempCanvas = document.getElementById("canvas_Draw");
	ctx = tempCanvas.getContext("2d");
	
	var firstPoint = true;
	
	for(i=0 ; i<curveArray.length ; i++) {
		if(!isNumber(curveArray[i][0])) {
			ctx.strokeStyle = curveArray[i][0];
			ctx.stroke();
			ctx.beginPath();
			firstPoint = true;
		}
		else {
			if(firstPoint) {
				ctx.beginPath();
				ctx.moveTo(curveArray[i][0], curveArray[i][1]);
				firstPoint = false;
			}
			else
				ctx.lineTo(curveArray[i][0], curveArray[i][1]);
		}
	}
}

function rotate(arg) {
	var AngleEle = document.getElementById("text_angle");
	clearCanvas();
	curveArray = ArrayTrans(curveArray, "rotation", "Draw", AngleEle.value, arg);
	printTrans();
}

function zoom(arg) {
	var ratioEle = document.getElementById("text_ratio");
	if(arg > 0)
		var tempRatio = ( 1 + (ratioEle.value/100) );
	else
		var tempRatio = ( 1 - (ratioEle.value/100) );
	clearCanvas();
	curveArray = ArrayTrans(curveArray, "zoom", "Draw", tempRatio);
	printTrans();
}

function reflect(arg) {
	if(arg > 0) {
		var vector1 = new Array(0, 0, 0);
		var vector2 = new Array(1, 0, 0);
	}
	else {
		var vector1 = new Array(0, 0, 0);
		var vector2 = new Array(0, 1, 0);
	}
	clearCanvas();
	curveArray = ArrayTrans(curveArray, "reflection", "Draw", vector1, vector2);
	printTrans();
}

function select_Trans() {
	switch( document.getElementById("select_TransID").value ){
		case "select_move":
			select_move();
			break;
		case "select_rotate":
			select_rotate();
			break;
		case "select_zoom":
			select_zoom();
			break;
		case "select_reflect":
			select_reflect();
			break;
	}
}

function select_move() {
	document.getElementById("PANEL_1_5_forHide_2").innerHTML = '';
	document.getElementById("PANEL_1_5_forHide_3").innerHTML = '';
	
	document.getElementById("canvas_Draw").style.cursor = "move";
	
	document.onmousemove = moveMouseMove;
	document.onmousedown = moveMouseDown;
	document.onmouseup = moveMouseUp;
}

function select_rotate() {
	document.getElementById("PANEL_1_5_forHide_2").innerHTML = 
		'<span id="block2_1_3_5_1" style="width: 50px; height: 25px; float: left">Angle:</span>' + 
		'<span id="block2_1_3_5_2" style="width: 50px; height: 25px; float: left">' + 
			'<input name="text_rotate" type="text" id="text_angle" size="1" style="width: 20px; height: 15px;">o' + 
		'</span>';
	document.getElementById("PANEL_1_5_forHide_3").innerHTML = 
		'<span id="block2_1_3_5_3" style="width: 70px; height: 25px; float: left">' + 
			'<input id="button_rotateC" type="button" value="+" style="height: 20px; width:25px;" onclick="rotate(1)">' + 
			'<input id="button_rotateCC" type="button" value="-" style="height: 20px; width:25px;" onclick="rotate(-1)">' + 
		'</span>';
}


function select_zoom() {
	document.getElementById("PANEL_1_5_forHide_2").innerHTML = 
		'<span id="block2_1_3_6_1" style="width: 50px; height: 25px; float: left">Ratio:</span>' + 
		'<span id="block2_1_3_6_2" style="width: 50px; height: 25px; float: left">' + 
			'<input name="text_zoom" type="text" id="text_ratio" size="1" style="width: 20px; height: 15px;">%' + 
		'</span>';
	document.getElementById("PANEL_1_5_forHide_3").innerHTML = 
		'<span id="block2_1_3_6_3" style="width: 70px; height: 25px; float: left">' + 
			'<input id="text_zoomIn" type="button" value="+" style="height: 20px; width:25px;" onclick="zoom(1)">' + 
			'<input id="text_zoomOut" type="button" value="-" style="height: 20px; width:25px;" onclick="zoom(-1)">' + 
		'</span>';
}

function select_reflect() {
	document.getElementById("PANEL_1_5_forHide_2").innerHTML = 
		'<span id="block2_1_3_7_3" style="width: 70px; height: 25px; float: left">' + 
			'<input id="text_zoomIn2" type="button" value="X" style="height: 20px; width:25px;" onclick="reflect(1)">' + 
			'<input id="text_zoomOut2" type="button" value="Y" style="height: 20px; width:25px;" onclick="reflect(-1)">' + 
		'</span>';
	document.getElementById("PANEL_1_5_forHide_3").innerHTML = '';
}

function select_cubic() {
	enterPoint = 2;
	document.onmousemove = cubicMouseMove;
	document.onmousedown = cubicMouseDown;
	document.onmouseup	 = cubicMouseUp;
}

function select_pb() {
	enterPoint = 4;
	document.onmousemove = pbMouseMove;
	document.onmousedown = pbMouseDown;
	document.onmouseup	 = pbMouseUp;
}

function select_bezier() {
	enterPoint = 4;
	document.onmousemove = bezierMouseMove;
	document.onmousedown = bezierMouseDown;
	document.onmouseup	 = bezierMouseUp;
}

function select_bspline() {
	enterPoint = 4;
	document.onmousemove = bsplineMouseMove;
	document.onmousedown = bsplineMouseDown;
	document.onmouseup	 = bsplineMouseUp;
}

function checkPartial(tArray) {
	for(x=0 ; x< (curveArray.length - tArray.length + 1) ; x++) {
		var s = 0;
		for(y=0 ; y<tArray.length ; y++) {
			if( curveArray[x+y][0] == tArray[y][0] &&
				curveArray[x+y][1] == tArray[y][1] &&
				curveArray[x+y][2] == tArray[y][2] ) {
				s++;
			}
		}
		if(s == tArray.length) {
			var nullArray = new Array();
			return nullArray;
		}
	}
	return tArray;
}

function checkArray(tArray) {
	var firstPoint = true;
	var partialArray = new Array();
	var saveArray = new Array();

	for(z=0 ; z<tArray.length ; z++) {
		if( !isNumber(tArray[z][0]) && (tArray[z][0] != null) ) {
			firstPoint = true;
			
			partialArray.push(tArray[z]);
			saveArray = saveArray.concat( checkPartial(partialArray) );
			
			partialArray.length = 0;
		}
		else {
			if(firstPoint)
				firstPoint = false;
			
			partialArray.push(tArray[z]);
		}
	}
	return saveArray;
}

function synchronize (sArray, planeArray) {
	for (p=0 ; p<planeArray.length ; p++) {
		//5 planes
		var tempSyncArray = ArrayTrans(sArray, "project", planeArray[p]);
		var tempSyncArray = arrayAdjust( tempSyncArray, planeArray[p], "+" );
		//printArray(tempSyncArray);
		//alert("stop");
		
		var tempCanvasID = "canvas_";
			tempCanvasID = tempCanvasID.concat(planeArray[p]);

		var tempCanvas = document.getElementById(tempCanvasID);
		ctx = tempCanvas.getContext("2d");
		
		//印的位置要改，否則都只印x,y
		switch(planeArray[p]) {
			case "XY":
				printPos1 = 0;
				printPos2 = 1;
				adjust1 = -200;
				adjust2 = -150;
				break;
			case "YZ":
				printPos1 = 1;
				printPos2 = 2;
				adjust1 = -150;
				adjust2 = 57;
				//should be 50+12.5=62.5
				break;
			case "XZ":
				printPos1 = 0;
				printPos2 = 2;
				adjust1 = -200;
				adjust2 = 57;
				break;
			case "ISO":
				printPos1 = 0;
				printPos2 = 1;
				adjust1 = -75;
				adjust2 = -150;
				break;
			case "PER":
				printPos1 = 0;
				printPos2 = 1;
				break;
		}
		//adjust vertical position in larger canvas
		for (i=0 ; i<tempSyncArray.length ; i++) {
			if(isNumber(tempSyncArray[i][0])) {
					//tempSyncArray[i][printPos1] = tempSyncArray[i][printPos1]+adjust1;
					//tempSyncArray[i][printPos2] = tempSyncArray[i][printPos2]+adjust2;
					tempSyncArray[i][printPos1] = tempSyncArray[i][printPos1]*(3/4)+adjust1*(9/16);
					tempSyncArray[i][printPos2] = tempSyncArray[i][printPos2]*(3/4)+adjust2*(9/16);
			}
		}
		printCurve(tempSyncArray);
		
		//printArray(tempSyncArray);
		//alert(planeArray[p]);
	}
}

function produceModel () {
	modelBulid = true;
	var tempColor;
	//curveArray = curveArray.concat( checkArray( ArrayTrans(curveArray, "rotation", "Draw", 20) ) );
	
	
	var oriLength = curveArray.length;
	
	for (times=0; times < (360 / tempAngle) ; times++)
		curveArray = curveArray.concat( checkArray( ArrayTrans(curveArray, "rotation", "Draw", tempAngle) ) );
	
	var planeArray = new Array("ISO","XY","YZ","XZ");
	synchronize (curveArray, planeArray);
	
	//printCurve(curveArray);
	
	var crossArray = new Array( (360 / tempAngle) + 2 );
	for (m=oriLength-1 ; m >= 0 ; m--) {
		for (n=0 ; n < (360 / tempAngle) ; n++) {
			//alert( curveArray[m+n*oriLength][0] );
			if( !isNumber( curveArray[m+n*oriLength][0] ) )
				tempColor = curveArray[m+n*oriLength][0];
				
			crossArray[n] = new Array(curveArray[m+n*oriLength][0], curveArray[m+n*oriLength][1], curveArray[m+n*oriLength][2]);
		}
		//var tempColor = "navy";
		crossArray[(360 / tempAngle)] = crossArray[0];
		crossArray[( (360 / tempAngle) + 1 )] = [tempColor, tempColor, tempColor];
		
		var planeArray = new Array("ISO","XY","YZ","XZ");
		synchronize (crossArray, planeArray);
		//printCurve(crossArray);
		
		//printArray(crossArray);
		//alert("cross");
	}
	curveArray.length = oriLength;
	document.getElementById("wholeDiv_2").style.visibility="visible";
	document.getElementById("PANEL_2").style.visibility="visible";
}

function download_curve() {
	var tempCanvas = document.getElementById("canvas_Draw");
	ctx = tempCanvas.getContext("2d");
	
	ctx.clearRect(0,0,400,400);
	ctx.beginPath();
	//printCurve(curveArray);
	printTrans();
}

function showMsg () {
	if ((enterPoint -1) > 0) {
		var tempMsg = "please enter  " + (enterPoint -1) + "  more vertex";
		document.getElementById("msgPanel").innerHTML = tempMsg;
	}
	else {
		document.getElementById("msgPanel").innerHTML = "";
		document.getElementById("msgPanel").style.backgroundColor = "transparent";
	}
}












