
var c = document.getElementById("gameCanvas");
var ctx = c.getContext('2d');

var health = 800;
var playerFuel = 20;
var playerX = 25;
var playerY = 525;
var playerWidth = 50;
var playerHeight = 50;
var playerFrameX = 0;
var playerFrameY = 0;



const playerSprite = new Image();
const town = new Image();
const enemyTank = new Image();
const wrench = new Image();
const ammo = new Image();

playerSprite.src ="playerSprite.png";
town.src = "Town.png";
enemyTank.src = "Enemy Tank.png";
wrench.src = "Wrench.png";
ammo.src = "Ammo.png"

function drawSprite(img, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinatonY, destinationWidth,destinationHeight){
    ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinatonY, destinationWidth,destinationHeight)
}


//Player movement section    
$('html').keydown(function(e){
    eraseTank();
    clearFuelGauge()

    if(e.key == "w"){
        if (playerY > 25 && playerFuel >= 1) playerY -= 100; 
        playerFuel-=1; 
        playerFrameY=3;
        console.log(playerFuel)
        console.log(playerX,playerY) 
    }

    else if(e.key == "s"){
        if (playerY < 500 && playerFuel >= 1) playerY += 100; 
        playerFuel-=1; 
        playerFrameY=0;
        console.log(playerFuel)
        console.log(playerX,playerY) 
    }
    
    else if(e.key == "a"){
        if(playerX >25 && playerFuel >= 1 ) playerX -=100; 
        playerFuel-=1; 
        playerFrameY=1;
        console.log(playerFuel)
        console.log(playerX,playerY) 
    }

    else if(e.key == "d"){
        if(playerX < 1025 && playerFuel >= 1) playerX += 100; 
        playerFuel-=1; 
        playerFrameY=2;
        console.log(playerFuel)
        console.log(playerX,playerY) 
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
    createTowns(town);
    createEnemy(enemyTank);
    createHealth(wrench);
    createAmmo(ammo);
}

function createTowns(){
    ctx.drawImage(town,0,200,100,100);
    ctx.drawImage(town,200,100,100,100);
    ctx.drawImage(town,300,200,100,100);
    ctx.drawImage(town,400,400,100,100);
    ctx.drawImage(town,600,200,100,100);
    ctx.drawImage(town,800,0,100,100);
    ctx.drawImage(town,900,300,100,100);
    ctx.drawImage(town,1000,500,100,100);
   
}

function createEnemy(){
    ctx.drawImage(enemyTank,25,325,50,50);
    ctx.drawImage(enemyTank,25,25,50,50);
    ctx.drawImage(enemyTank,125,225,50,50);
    ctx.drawImage(enemyTank,125,425,50,50);
    ctx.drawImage(enemyTank,225,525,50,50);
    ctx.drawImage(enemyTank,325,25,50,50);
    ctx.drawImage(enemyTank,425,225,50,50);
    ctx.drawImage(enemyTank,525,25,50,50);
    ctx.drawImage(enemyTank,525,525,50,50);
    ctx.drawImage(enemyTank,625,325,50,50);
    ctx.drawImage(enemyTank,725,425,50,50);
    ctx.drawImage(enemyTank,725,125,50,50);
    ctx.drawImage(enemyTank,825,225,50,50);
    ctx.drawImage(enemyTank,925,125,50,50);
    ctx.drawImage(enemyTank,925,425,50,50);
    ctx.drawImage(enemyTank,1025,25,50,50);
    ctx.drawImage(enemyTank,1025,325,50,50);
}

function createHealth(){
    ctx.drawImage(wrench,25,125,50,50);
    ctx.drawImage(wrench,125,25,50,50);
    ctx.drawImage(wrench,225,225,50,50);
    ctx.drawImage(wrench,325,425,50,50);
    ctx.drawImage(wrench,425,125,50,50);
    ctx.drawImage(wrench,525,325,50,50 );
    ctx.drawImage(wrench,625,25,50,50);
    ctx.drawImage(wrench,725,225,50,50);
    ctx.drawImage(wrench,825,525,50,50);
    ctx.drawImage(wrench,925,25,50,50);
    ctx.drawImage(wrench,1025,425,50,50);
}

function createAmmo(){
    ctx.drawImage(ammo,125,325,50,50);
    ctx.drawImage(ammo,225,25,50,50);
    ctx.drawImage(ammo,325,525,50,50);
    ctx.drawImage(ammo,425,25,50,50);
    ctx.drawImage(ammo,525,225,50,50);
    ctx.drawImage(ammo,625,425,50,50);
    ctx.drawImage(ammo,725,325,50,50);
    ctx.drawImage(ammo,825,125,50,50);
    ctx.drawImage(ammo,925,225,50,50);
    ctx.drawImage(ammo,1025,125,50,50);
}

function loadingTime(){
    var loadingTime = setTimeout(loadGame , 2800);
}

function loadGame(){
    $(".game-container").show();
    $(".gametitle").show();
    $(".loading-bar").hide();
    $(".loading-text").hide();
}


$(function(){
    drawGame();
    healthBar();
    drawSprite(playerSprite, playerWidth*playerFrameX, playerHeight * playerFrameY, playerWidth, playerHeight, 
        playerX,playerY, playerWidth, playerHeight);
    fuelGauge();
    $(".game-container").hide();
    $(".gametitle").hide();
    $(".loading-bar").show();
    $(".loading-text").show();
    loadingTime();
    
});