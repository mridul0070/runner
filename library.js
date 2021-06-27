


function changeOrientation(){
	if(orientation=="down") orientation="up" ;
	else orientation="down";
}

function checkIfReached(yPosition) {
	//console.log('Reach ', moveFlag, yPosition, pos, ori)
	if (!moveFlag) { 
		moveFlag = true;
		return false
	}

	if(yPosition >= 350 || yPosition <= 100) return true;
	else return false;
}

function stopMoving() {
	moveFlag = false;
}

function drawFc(){
	ctx.beginPath();
	ctx.fillStyle = "black" ;
	ctx.fillRect(0 , height-100 , width , 100);
	ctx.fillRect(0, 0 , width ,100);
}



function isHole() {   
	var lowerObjectColor = ctx.getImageData(225, 398, 1, 1).data;
	var lowerHoleColor = ctx.getImageData(225, 425, 1, 1).data;

	var upperHoleColor = ctx.getImageData(225, 90, 1, 1).data;
	var upperObjectColor = ctx.getImageData(225, 103, 1, 1).data;


	if ((lowerObjectColor[1] == 50 && lowerHoleColor[1] == 0) || (upperObjectColor[1] == 50 && upperHoleColor[1] == 0)) return true;
	else return false;
}  