  
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var width = c.width;
var height = c.height;
var pos =250;
var orientation = "down";
var changer;
var ground = 400;
var moveFlag = true;
var game = true;
var speed = 3;
var score = 0;
var scoringParameter = 50;
var blockTimeInterval = 4000;
var check = 1;
var floorColor = "yellow"//"#B34A34";
var holeColor = "black"//"#2e0303";
var objectColor = "#9932CC"//"purple"//"#7a0606";

var scoring = function() {
	score += (speed/100)
	document.getElementById("score").style.color = "yellow"
	document.getElementById("score").innerHTML = Math.round(score).toString();
	
	window.requestAnimationFrame(scoring);
}

start();

function start(){
	try {
		hScore = localStorage.highScore;
	} catch(error) {
		hScore = 0;
	}

	ctx.fillStyle = floorColor;
	ctx.fillRect(0, 0, 800, 100);
	ctx.fillRect(0, 400, 800, 100);
	requestAnimationFrame(scoring);
	move();
	setInterval(createLowerHole, blockTimeInterval);
	setTimeout(callUpper = function() {setInterval(createUpperHole, blockTimeInterval)}, 3000)
}




document.addEventListener("keydown", function(event) {
	if (event.keyCode == 32) {
		event.preventDefault();
		changeOrientation(orientation);
		if (!moveFlag) {
			move();  
		}
	}
	else if (event.keyCode == 112) {
		alert("Game Paused, Click any key continue.");
	}
})


document.addEventListener("click", function(event) {
	

		changeOrientation(orientation);
		if (!moveFlag) {
			move();  
		}
	

})





function gameOver() {
	window.location.href = "end.html";
	window.cancelAnimationFrame(move)
	window.cancelAnimationFrame(scoring);
	var finalScore = Math.round(score);

	if (finalScore > hScore) {
		localStorage.highScore = finalScore;
		alert("GAME OVER! " + "congratulations! you hit the high score: " + Math.round(score));
	} else {
		alert("GAME OVER! " + "Score: " + Math.round(score));
	}
	
	clearInterval(createLowerHole);
	clearInterval(createUpperHole);

}


function move(){
	
	if (checkIfReached(pos)) {
		stopMoving();
		return; 
	}

	ctx.clearRect(200,changer,50,50);
	ctx.beginPath();
	ctx.fillStyle = objectColor;
	ctx.fillRect(200,pos,50,50);

	ctx.closePath();
	changer = pos;
	if(orientation == "up") pos -= speed;
	else pos += speed;
	requestAnimationFrame(move);
}


function createLowerHole(){
	var holeWide = (Math.floor(Math.random()*4)+1)*100; 
	var xcor = 800;
	check += 1;
	moveHole(xcor, holeWide, 0, 400);
}

function createUpperHole(){
	var holeWide = (Math.floor(Math.random()*4)+1)*100; 
	var xcor = 800;
	check += 1;
	moveHole(xcor, holeWide, 0, 0);
}


function moveHole(xCoordinate, size, temp, yCoordinate){
	
	if (isHole()) {
		gameOver();
		return;
	}
	ctx.fillStyle = floorColor;
	ctx.fillRect(temp, yCoordinate, size, 100);
	ctx.beginPath();
	ctx.fillStyle = holeColor;
	ctx.fillRect(xCoordinate, yCoordinate, size, 100);
	ctx.closePath();
	temp = xCoordinate; 
	xCoordinate -= speed;
	if(xCoordinate == (-1)*(size)) { 
		ctx.clearRect(xCoordinate, yCoordinate, size, 100);
		return;
	}	 
	requestAnimationFrame( ()=> {moveHole(xCoordinate, size, temp, yCoordinate)});

}
