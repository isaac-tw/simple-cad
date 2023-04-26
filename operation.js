//Array Transpose
function ArrayTranspose(tArray) {
	//new array for saving result data
	var tempArray = new Array(tArray[0].length);
	for (i=0 ; i<tArray[0].length ; i++)
		tempArray[i] = new Array(tArray.length);
	//transpose
	for (i=0 ; i<tArray[0].length ; i++) {
		for (j=0 ; j<tArray.length ; j++)
			tempArray[i][j] = tArray[j][i];
	}
	return tempArray;
}

//Array Operation
function ArrayOP(array1, array2, op) {
	//new array for saving result data
	var tempArray = new Array(array1.length);
	
	for (i=0 ; i<array1.length ; i++)
		tempArray[i] = new Array(array2[0].length);
	//initialize
	for (i=0 ; i<array1.length ; i++) {
		for (j=0 ; j<array2[0].length ; j++)
			tempArray[i][j] = 0;
	}
	//*
	if (op == "*") {
		if ( array1[0].length == array2.length ) {
			for (i=0 ; i<array1.length ; i++) {
				for (j=0 ; j<array2[0].length ; j++) {
					for (k=0 ; k<array1[0].length ; k++) {
						if( isNumber(array2[k][j]) )
							tempArray[i][j] += array1[i][k] * array2[k][j];
						else
							tempArray[i][j] = array2[k][j];
					}
				}
			}
		}
		//error
		else
			alert("Array Operation Error! (*)");
	}
	//+ or -
	else if (op == "+" || op == "-") {
		if ( ( array1.length == array2.length ) && ( array1[0].length == array2[0].length ) ) {
			//+
			if (op == "+") {
				for (i=0 ; i<array1.length ; i++) {
					for (j=0 ; j<array1[0].length ; j++) {
						if( isNumber(array1[i][j]) )
							tempArray[i][j] = array1[i][j] + array2[i][j];
						else
							tempArray[i][j] = array1[i][j];
					}
				}
			}
			//-
			else if (op == "-") {
				for (i=0 ; i<array1.length ; i++) {
					for (j=0 ; j<array1[0].length ; j++) {
						if( isNumber(array1[i][j]) )
							tempArray[i][j] = array1[i][j] - array2[i][j];
						else
							tempArray[i][j] = array1[i][j];
					}
				}
			}
		}
		//error
		else {
			alert("Array Operation Error! (+/-)");
		}
	}
	//other
	else
		alert("Array Operation Error! (unknow)");
		
	return tempArray;
}

//Array Adjustment
function arrayAdjust (tArray, plane, op) {
	var tempArray = new Array(tArray.length);
	for (i=0 ; i<tArray.length ; i++)
		tempArray[i] = new Array(tArray[0].length);
	//+ adjustment
	if(op == "+") {
		for (i=0 ; i<tArray.length ; i++) {
			if( isNumber(tArray[i][0]) ) {
				switch( plane ) {
					case "Draw":
						tempArray[i][0] = tArray[i][0] + 200;
						tempArray[i][1] = tArray[i][1] + 150;
						tempArray[i][2] = tArray[i][2];
						break;
					case "XY":
						tempArray[i][0] = tArray[i][0] + 150;
						tempArray[i][1] = tArray[i][1] + 125;
						tempArray[i][2] = tArray[i][2];
						break;
					case "YZ":
						tempArray[i][0] = tArray[i][0];
						tempArray[i][1] = tArray[i][1] + 150;
						tempArray[i][2] = tArray[i][2] + 125;
						break;
					case "XZ":
						tempArray[i][0] = tArray[i][0] + 150;
						tempArray[i][1] = tArray[i][1];
						tempArray[i][2] = tArray[i][2] + 125;
						break;
					case "ISO":
						tempArray[i][0] = tArray[i][0] + 105;
						tempArray[i][1] = tArray[i][1] + 145;
						tempArray[i][2] = tArray[i][2];
						break;
					case "PER":
						tempArray[i][0] = tArray[i][0] + 50;
						tempArray[i][1] = tArray[i][1] + 250;
						tempArray[i][2] = tArray[i][2];
						break;
					default:
						alert("Array Adjustment Error (+)");
						return false;
				}
			}
			else
				tempArray[i] = tArray[i];
		}
		return tempArray;
	}
	//- adjustment
	else if(op == "-") {
		for (i=0 ; i<tArray.length ; i++) {
			if( isNumber(tArray[i][0]) ) {
				switch( plane ) {
					case "Draw":
						tempArray[i][0] = tArray[i][0] - 200;
						tempArray[i][1] = tArray[i][1] - 150;
						tempArray[i][2] = tArray[i][2];
						break;
					case "XY":
						tempArray[i][0] = tArray[i][0] - 150;
						tempArray[i][1] = tArray[i][1] - 125;
						tempArray[i][2] = tArray[i][2];
						break;
					case "YZ":
						tempArray[i][0] = tArray[i][0];
						tempArray[i][1] = tArray[i][1] - 150;
						tempArray[i][2] = tArray[i][2] - 125;
						break;
					case "XZ":
						tempArray[i][0] = tArray[i][0] - 150;
						tempArray[i][1] = tArray[i][1];
						tempArray[i][2] = tArray[i][2] - 125;
						break;
					case "ISO":
						tempArray[i][0] = tArray[i][0] - 175;
						tempArray[i][1] = tArray[i][1] - 125;
						tempArray[i][2] = tArray[i][2];
						break;
					case "PER":
						tempArray[i][0] = tArray[i][0] - 10;
						tempArray[i][1] = tArray[i][1] - 10;
						tempArray[i][2] = tArray[i][2];
						break;
					default:
						alert("Array Adjustment Error (-)");
						return false;
				}
			}
			else
				tempArray[i] = tArray[i];
		}
		return tempArray;
	}
	else
		alert("Array Adjustment Error (unknown)");
}

//Array Transformation
function ArrayTrans(tArray, style, scale1, scale2, scale3) {
	tArray = arrayAdjust(tArray, scale1, "-");
	tArray = ArrayTranspose(tArray);

	//printArray(tArray);
	//alert("tArray!");
	
	//new transformation array
	var transArray = new Array(3);
	for (i=0 ; i<3 ; i++)
		transArray[i] = new Array(3);
	//rotation
	if (style == "rotation") {
		var tempArg =  ( scale2 / 180 ) * Math.PI;
		
		
		if(scale3 == 1 || scale3 == -1) {
			if(scale3 == -1)
				tempArg *= -1;
			
			transArray[0] = new Array(Math.cos(tempArg), -Math.sin(tempArg), 0);
			transArray[1] = new Array(Math.sin(tempArg),  Math.cos(tempArg), 0);
			transArray[2] = new Array(0, 0, 1);
		}
		else {
		transArray[0] = new Array(Math.cos(tempArg), 0, Math.sin(tempArg));
		transArray[1] = new Array(0,  1, 0);
		transArray[2] = new Array(-Math.sin(tempArg), 0, Math.cos(tempArg));
		}
		
		return arrayAdjust( ArrayTranspose( ArrayOP(transArray, tArray, "*") ), scale1, "+" );
	}
	//zoom
	else if (style == "zoom") {
		transArray[0] = new Array(scale2, 0, 0);
		transArray[1] = new Array(0, scale2, 0);
		transArray[2] = new Array(0, 0, 1);
		
		return arrayAdjust( ArrayTranspose( ArrayOP(transArray, tArray, "*") ), scale1, "+" );
	}
	//reflection
	else if (style == "reflection") {
		var vectorX = scale2[0] - scale3[0];
		var vectorY = scale2[1] - scale3[1];
		var length  = Math.sqrt( Math.pow(vectorX, 2) + Math.pow(vectorY, 2) );
		var unitX   = vectorX / length;
		var unitY   = vectorY / length;
		
		transArray[0] = new Array( ( 2*( Math.pow(unitX, 2) ) - 1 ), 2*unitX*unitY, 0);
		transArray[1] = new Array( 2*unitX*unitY, ( 2*( Math.pow(unitY, 2) ) - 1 ), 0);
		transArray[2] = new Array(0, 0, 1);
		
		return arrayAdjust( ArrayTranspose( ArrayOP(transArray, tArray, "*") ), scale1, "+" );
	}
	//move
	else if (style == "move") {
		for (i=0 ; i<tArray.length ; i++) {
			for (j=0 ; j<tArray[0].length ; j++) {
				if (i == 0) {
					if( isNumber(tArray[i][j]) )
						tArray[i][j] = tArray[i][j] + scale2;
				}
				else if (i == 1){
					if( isNumber(tArray[i][j]) )
						tArray[i][j] = tArray[i][j] + scale3;
				}
			}
		}
		return arrayAdjust( ArrayTranspose(tArray), scale1, "+" );
	}
	//project
	else if (style == "project") {
		switch( scale1 ) {
			case "Draw":
				transArray[0] = new Array(1, 0, 0);
				transArray[1] = new Array(0, 1, 0);
				transArray[2] = new Array(0, 0, 0);
				break;
			case "XY":
				transArray[0] = new Array(1, 0, 0);
				transArray[1] = new Array(0, 1, 0);
				transArray[2] = new Array(0, 0, 0);
				break;
			case "YZ":
				transArray[0] = new Array(0, 0, 0);
				transArray[1] = new Array(0, 1, 0);
				transArray[2] = new Array(0, 0, 1);
				break;
			case "XZ":
				transArray[0] = new Array(1, 0, 0);
				transArray[1] = new Array(0, 0, 0);
				transArray[2] = new Array(0, 0, 1);
				break;
			case "ISO":
				var tempArg =  ( 35.264 / 180 ) * Math.PI;
				var rotateX = new Array(1);
				rotateX[0] = new Array(1, 0, 0);
				rotateX[1] = new Array(0,  Math.cos(tempArg), Math.sin(tempArg));
				rotateX[2] = new Array(0, -Math.sin(tempArg), Math.cos(tempArg));
				
				var tempArg2 =  ( -45 / 180 ) * Math.PI;
				var rotateY = new Array(1);
				rotateY[0] = new Array(Math.cos(tempArg2), 0, -Math.sin(tempArg2));
				rotateY[1] = new Array(0, 1, 0);
				rotateY[2] = new Array(Math.sin(tempArg2), 0, Math.cos(tempArg2));
				
				var tempArg3 =  ( -45 / 180 ) * Math.PI;
				var rotateZ = new Array(1);
				rotateZ[0] = new Array(Math.cos(tempArg3), Math.sin(tempArg3), 0);
				rotateZ[1] = new Array(-Math.sin(tempArg3), Math.cos(tempArg3), 0);
				rotateZ[2] = new Array(0, 0, 1);
				/*
				var SS = new Array(1);
				SS[0] = new Array(0.707, -0.707, 0);
				SS[1] = new Array(0.409, 0.409, -0.816);
				SS[2] = new Array(0.577, 0.577, 0.578);
				
				transArray = SS;
				//alert(printArray2(transArray));
				*/
				transArray = ArrayOP(rotateX, rotateZ, "*");
				break;
			case "PER":
				var tempCamera = new Array(tArray[0].length);
				for (i=0 ; i<tArray[0].length ; i++)
					tempCamera[i] = new Array(viewerX, viewerY, viewerZ);	//攝像機的位置
				tempCamera = ArrayTranspose(tempCamera);
				
				//攝像機的旋轉角度
				var tempArg =  -( thX / 180 ) * Math.PI;
				var rotateX = new Array(1);
				rotateX[0] = new Array(1, 0, 0);
				rotateX[1] = new Array(0,  Math.cos(tempArg), -Math.sin(tempArg));
				rotateX[2] = new Array(0, Math.sin(tempArg), Math.cos(tempArg));
				
				var tempArg2 =  -( thY / 180 ) * Math.PI;
				var rotateY = new Array(1);
				rotateY[0] = new Array(Math.cos(tempArg2), 0, Math.sin(tempArg2));
				rotateY[1] = new Array(0, 1, 0);
				rotateY[2] = new Array(-Math.sin(tempArg2), 0, Math.cos(tempArg2));
				
				var tempArg3 =  -( thZ / 180 ) * Math.PI;
				var rotateZ = new Array(1);
				rotateZ[0] = new Array(Math.cos(tempArg3), -Math.sin(tempArg3), 0);
				rotateZ[1] = new Array(Math.sin(tempArg3), Math.cos(tempArg3), 0);
				rotateZ[2] = new Array(0, 0, 1);
				
				transArray = ArrayOP(rotateX, rotateY, "*");
				transArray = ArrayOP(transArray, rotateZ, "*");
				
				//點a向攝像機坐標系所作的變換
				tempD = ArrayOP(transArray, ArrayOP(tArray, tempCamera, "-"), "*");
				
				var tempPeo = new Array(cameraX, cameraY, cameraZ);	//觀測者相對顯示平面的位置
				
				//a所產生的2D投影
				for (s=0 ; s<tempD[0].length ; s++) {
					if(isNumber(tempD[0][s])) {
						tempD[0][s] = ( tempD[0][s] - tempPeo[0] ) * ( tempPeo[2] / tempD[2][s] );
						tempD[1][s] = ( tempD[1][s] - tempPeo[1] ) * ( tempPeo[2] / tempD[2][s] );
					}
				}
				return arrayAdjust(  ArrayTranspose(tempD), scale1, "+");
				
				break;
			default:
				alert("Project Error!");
				return false;
		}
		return arrayAdjust( ArrayTranspose( ArrayOP(transArray, tArray, "*") ), scale1, "+" );
	}
	else
		alert("Array Transformation Error");
}
