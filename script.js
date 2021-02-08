
var c = document.getElementById("gameCanvas");
var ctx = c.getContext('2d');

var health = 800;
var fuel = 100;
/*var tankX = 25;
var tankY = 530;*/

const player ={
    x: 25,
    y: 25,
    width: 50,
    height: 50,
    frameX:0,
    frameY:0,
    speed: 2,
    moving: false
}


const playerSprite = new Image();
playerSprite.src ="spritePlaceholder.png";

function drawSprite(img, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinatonY, destinationWidth,destinationHeight){
    ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinatonY, destinationWidth,destinationHeight)
};

    
$('html').keydown(function(e){
    eraseTank();

    if(e.key == "w"){
        if (tankY > 20) tankY -= 102; fuel-=20;
        player.frameY=3; 
    }

    else if(e.key == "s"){
        if (tankY < 530) tankY += 102;
        player.frameY=0
    }
    
    else if(e.key == "a"){
        if(tankX >25 ) tankX -=100;
        player.frameY=1
    }

    else if(e.key == "d"){
        if(tankX < 1025) tankX += 100;
        player.frameY=2
        
    }
    
    drawSprite(playerSprite, player.width*player.frameX, player.height * player.frameY, player.width, player.height, 
        player.x,player.y, player.width, player.height);
});
   
function fuelGauge(){
    ctx.fillStyle="yellow";
    ctx.fillRect(100,640,(fuel/100)*250,40);
}

function eraseTank(){
    ctx.fillStyle = "#DDA15E";
    ctx.fillRect(player.X,player.Y,50,50);
    ctx.moveTo(player.X,player.Y);
}
   
/*function drawTank(){
    ctx.fillStyle = "#283618";
    ctx.fillRect(tankX,tankY,50,50);
    ctx.moveTo(tankX,tankY);
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
    drawSprite(playerSprite, player.width*player.frameX, player.height * player.frameY, player.width, player.height, 
        player.x,player.y, player.width, player.height);
    fuelGauge();
});