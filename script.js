
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

var playerAtTown = false;
var playerAtEnemyTank = false;
var playerAtWrench = false;
var playerAtAmmo = false;




const playerSprite = new Image();
const town = new Image();
const enemyTank = new Image();
const wrench = new Image();
const ammo = new Image();

const combatMenu = document.querySelector(".combat-menu")

$(".run-button").click(function(){
    closeCombat()
})

townLocationsX = [0,200,300,400,600,800,900,1000];
townLocationsY = [200,100,200,400,200,0,300,500];
townLocationsTotal = townLocationsX.length;
townLocations = [townLocationsX,townLocationsY]

enemyTankLocationsX = [25,25,125,125,225,325,425,525,525,625,725,925,1025];
enemyTankLocationsY = [325,25,225,425,525,25,225,25,525,325,425,125,25,325];
enemyTankLocationsTotal=enemyTankLocationsX.length;
enemyTankLocations= [enemyTankLocationsX,enemyTankLocationsY];

wrenchLocationsX = [25,125,225,325,425,525,625,725,825,925,1025];
wrenchlocationsY = [125,25,225,425,125,325,25,225,525,25,425];
wrenchLocationsTotal = wrenchLocationsX.length;
wrenchLocations = [wrenchLocationsX,wrenchlocationsY]

ammoLocationsX = [125,225,325,425,525,625,726,825,925,1025]
ammoLocationsY = [325,25,525,25,225,425,325,125,225,125]
ammoLocationsTotal = ammoLocationsX.length;
ammoLocations = [ammoLocationsX,ammoLocationsY]



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
        checkPlayerAtTown()
        checkPlayerAtEnemyTank()
        checkPlayerAtWrench
        checkPlayerAtAmmo()


        if (playerAtEnemyTank == true){
            openCombat()
        }

    }

    else if(e.key == "s"){
        if (playerY < 500 && playerFuel >= 1) playerY += 100; 
        playerFuel-=1; 
        playerFrameY=0;
        checkPlayerAtTown()
        checkPlayerAtEnemyTank()
        checkPlayerAtWrench
        checkPlayerAtAmmo()

        if (playerAtEnemyTank == true){
            openCombat()
        }
        

    }
    
    else if(e.key == "a"){
        if(playerX >25 && playerFuel >= 1 ) playerX -=100; 
        playerFuel-=1; 
        playerFrameY=1;
        checkPlayerAtTown()
        checkPlayerAtEnemyTank()
        checkPlayerAtWrench
        checkPlayerAtAmmo()

        if (playerAtEnemyTank == true){
            openCombat()
        }
        
    }

    else if(e.key == "d"){
        if(playerX < 1025 && playerFuel >= 1) playerX += 100; 
        playerFuel-=1; 
        playerFrameY=2;
        checkPlayerAtTown()
        checkPlayerAtEnemyTank()
        checkPlayerAtWrench
        checkPlayerAtAmmo()

        if (playerAtEnemyTank == true){
            openCombat()
        }
        

    }


    createTowns();
    createEnemy();
    createHealth();
    createAmmo();
    drawSprite(playerSprite, playerWidth*playerFrameX, playerHeight * playerFrameY, playerWidth, playerHeight, 
        playerX,playerY, playerWidth, playerHeight);
    fuelGauge(playerFuel)
    
})

//End of player movement section


   
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
    createTowns();
    createEnemy();
    createHealth();
    createAmmo();
}

function createTowns(){

    for(i=0; i<townLocationsTotal; i++){

        ctx.drawImage(town,townLocations[0][i],townLocations[1][i],100,100)

    }
   
}

function createEnemy(){

    for(i=0; i<enemyTankLocationsTotal; i++){
        ctx.drawImage(enemyTank,enemyTankLocations[0][i],enemyTankLocations[1][i],50,50)
    }

}

function createHealth(){

    for(i=0; i<wrenchLocationsTotal; i++){
        ctx.drawImage(wrench,wrenchLocations[0][i],wrenchLocations[1][i],50,50)
    }

}

function createAmmo(){

    for(i=0; i<ammoLocationsTotal; i++){
        ctx.drawImage(ammo,ammoLocations[0][i],ammoLocations[1][i],50,50)
    }

}

function checkPlayerAtTown(){

    for(i=0; i<townLocationsTotal; i++){
        if((playerX - 25) == townLocations[0][i] && (playerY - 25) == townLocations[1][i] ){    
            playerAtTown = true;
            return playerAtTown
        }

        else{
            playerAtTown = false;  
        }
    }
    

}

function checkPlayerAtEnemyTank(){

    for(i=0; i<enemyTankLocationsTotal; i++){
        if(playerX == enemyTankLocations[0][i] && playerY == enemyTankLocations[1][i] ){    

            playerAtEnemyTank = true;
            return playerAtEnemyTank

        }

        else{
            playerAtEnemyTank = false;
            
        }
    }


}

function checkPlayerAtWrench(){

    for(i=0; i<wrenchLocationsTotal; i++){
        if(playerX == wrenchLocations[0][i] && playerY == wrenchLocations[1][i] ){    

            playerAtWrench = true;
            return playerAtWrench
            
            

        }

        else{
            playerAtWrench = false;
            
        }
    }


}

function checkPlayerAtAmmo(){

    for(i=0; i<ammoLocationsTotal; i++){
        if(playerX == ammoLocations[0][i] && playerY == ammoLocations[1][i] ){    

            playerAtAmmo = true;
            return playerAtAmmo

        }

        else{
            playerAtAmmo = false;
            
        }
    }

}

function openCombat(){
    combatMenu.classList.add("active")

}

function closeCombat(){
    combatMenu.classList.remove("active")

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