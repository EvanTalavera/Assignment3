
var c = document.getElementById("gameCanvas");
var ctx = c.getContext('2d');

var health = 800;
var fuel = 100;

var playerX = 25
var playerY = 525
var playerWidth = 50
var playerHeight = 50
var playerFrameX = 0
var playerFrameY = 0


const playerSprite = new Image();
playerSprite.src ="spritePlaceholder.png";

function drawSprite(img, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinatonY, destinationWidth,destinationHeight){
    ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinatonY, destinationWidth,destinationHeight)
}
    
$('html').keydown(function(e){
    eraseTank();

    if(e.key == "w"){
        if (playerY > 20) playerY -= 102; 
        fuel-=20; 
        playerFrameY=3;
         
    }

    else if(e.key == "s"){
        if (playerY < 500) playerY += 102; 
        fuel-=20; 
        playerFrameY=0;
    }
    
    else if(e.key == "a"){
        if(playerX >25 ) playerX -=100; 
        fuel-=20; 
        playerFrameY=1;
    }

    else if(e.key == "d"){
        if(playerX < 1025) playerX += 100; 
        fuel-=20; 
        playerFrameY=2;
    }
    
    drawSprite(playerSprite, playerWidth*playerFrameX, playerHeight * playerFrameY, playerWidth, playerHeight, 
        playerX,playerY, playerWidth, playerHeight);
    fuelGauge()
    
})
   
function fuelGauge(){
    ctx.fillStyle="yellow";
    ctx.fillRect(100,640,(fuel/100)*250,40);
}

function eraseTank(){
    ctx.fillStyle = "#DDA15E";
    ctx.fillRect(playerX,playerY,50,50);
    ctx.moveTo(playerX,playerY);
}
   
/*function drawTank(){
    ctx.fillStyle = "#283618";
    ctx.fillRect(playerX,playerY,50,50);
    ctx.moveTo(playerX,playerY);
}*/

function healthBar(){
    ctx.fillStyle = "green";
    ctx.fillRect(500,640,(health/800)*250,40);
    
}

function drawGame(){
    ctx.beginPath();
    ctx.fillStyle = "grey";
    ctx.fillRect(0,600,1110,100);
    ctx.stroke();

    for (i = 100; i < 600; i += 100) 
    {
	    ctx.moveTo(0, i);
        ctx.lineTo(c.width, i);
	    ctx.stroke();
    }
    
    for (i = 100; i < 1110; i += 100) 
    {
	    ctx.moveTo(i, 0);
	    ctx.lineTo(i,600);
	    ctx.stroke();
    }

    ctx.fillStyle ="black";
    ctx.font = "20px  Lucida Sans Typewriter ";
    ctx.fillText("Health:",500,630);
    ctx.fillText("Fuel:", 100,630);

}



$(function(){
    drawGame();
    healthBar();
    drawSprite(playerSprite, playerWidth*playerFrameX, playerHeight * playerFrameY, playerWidth, playerHeight, 
        playerX,playerY, playerWidth, playerHeight);
    fuelGauge();
});