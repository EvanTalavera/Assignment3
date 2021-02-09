
var c = document.getElementById("gameCanvas");
var ctx = c.getContext('2d');

var health = 800;
var playerFuel = 20;
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


//Player movement section    
$('html').keydown(function(e){
    eraseTank();
    clearFuelGauge()

    if(e.key == "w"){
        if (playerY > 20 && playerFuel >= 1) playerY -= 100; 
        playerFuel-=1; 
        playerFrameY=3;
        console.log(playerFuel)
        
         
    }

    else if(e.key == "s"){
        if (playerY < 500 && playerFuel >= 1) playerY += 100; 
        playerFuel-=1; 
        playerFrameY=0;
        console.log(playerFuel)
    }
    
    else if(e.key == "a"){
        if(playerX >25 && playerFuel >= 1 ) playerX -=100; 
        playerFuel-=1; 
        playerFrameY=1;
        console.log(playerFuel)
    }

    else if(e.key == "d"){
        if(playerX < 1025 && playerFuel >= 1) playerX += 100; 
        playerFuel-=1; 
        playerFrameY=2;
        console.log(playerFuel)
    }
    
    drawSprite(playerSprite, playerWidth*playerFrameX, playerHeight * playerFrameY, playerWidth, playerHeight, 
        playerX,playerY, playerWidth, playerHeight);
    fuelGauge(playerFuel)
    
})

//End of player movement section

//Player projectile section
class Projectile {
    constructor(x, y, radius, color, velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

const projectiles = []

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0, c.width, c.height)
    drawGame();
    healthBar();
    drawSprite(playerSprite, playerWidth*playerFrameX, playerHeight * playerFrameY, playerWidth, playerHeight, 
        playerX,playerY, playerWidth, playerHeight);
    fuelGauge();

    projectiles.forEach(projectile =>{
        projectile.update()
        
    })

}

window.addEventListener("click",(event) => {
    console.log(event.clientX)
    console.log(event.clientY)



    const angle = Math.atan2((event.clientY) - (playerY+25), (event.clientX) - (playerX+25))

    const velocity ={
        x: Math.cos(angle) ,
        y: Math.sin(angle),
    }
    console.log(velocity)


    projectiles.push(new Projectile(
        playerX+25,
        playerY+25,
        5,
        "red",
        velocity

    ))


});



animate()

//End of player projectile section
   
function fuelGauge(){
    for (i = 0; i < playerFuel; i +=1)
    {
        ctx.fillStyle="yellow";
        ctx.fillRect(100 + (10*i), 640, 20,40)

    };

}

function clearFuelGauge(){
    for (i = 0; i < 20; i +=1)
    {
        ctx.fillStyle="grey";
        ctx.fillRect(100 + (10*i), 640, 20,40)

    };

}

function eraseTank(){
    ctx.fillStyle = "#DDA15E";
    ctx.fillRect(playerX,playerY,50,50);
    ctx.moveTo(playerX,playerY);
}

function healthBar(){
    ctx.fillStyle = "green";
    ctx.fillRect(500,640,(health/800)*250,40);
    
}

function drawGame(){
    ctx.beginPath();
    ctx.fillStyle = "grey";
    ctx.fillRect(0,600,1100,100);
    ctx.stroke();

    for (i = 100; i < 600; i += 100) 
    {
	    ctx.moveTo(0, i);
        ctx.lineTo(c.width, i);
	    ctx.stroke();
    }
    
    for (i = 100; i < 1100; i += 100) 
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