
var c = document.getElementById("gameCanvas");
var ctx = c.getContext('2d');

var playerHealth = 800;
var playerAttack = 100;
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

class Enemy{
    constructor(number,health,attack){
        this.number = number
        this.health = health
        this.attack = attack
    }
}





const playerSprite = new Image();
const town = new Image();
const enemyTank = new Image();
const wrench = new Image();
const ammo = new Image();
const base = new Image();

const combatMenu = document.querySelector(".combat-menu")


townLocationsX = [0,200,300,400,600,800,900,1000];
townLocationsY = [200,100,200,400,200,0,300,500];
townLocationsTotal = townLocationsX.length;
townLocations = [townLocationsX,townLocationsY]

enemyTankLocationsX = [25,25,125,125,225,325,425,525,525,625,725,925];
enemyTankLocationsY = [325,25,225,425,525,25,225,25,525,325,425,125,25];
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

armybaseLocationX = 1000;
armybaseLocationY = 0;

var engagedStatus = checkPlayerAtEnemyTank()

playerSprite.src ="playerSprite.png";
town.src = "Town.png";
enemyTank.src = "Enemy Tank.png";
wrench.src = "Wrench.png";
ammo.src = "Ammo.png"
base.src = "Army Base.png"

function drawSprite(img, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinatonY, destinationWidth,destinationHeight){
    ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinatonY, destinationWidth,destinationHeight)
}


//Player movement section    
$('html').keydown(function(e){
    eraseTank();
    clearFuelGauge()
    clearHealthBar()

    if(e.key == "w"){
        if (playerY > 25 && playerFuel >= 1) playerY -= 100; 
        playerFuel-=1; 
        playerFrameY=3;
        checkPlayerAtTown()
        checkPlayerAtEnemyTank()
        checkPlayerAtWrench()
        checkPlayerAtAmmo()

    }

    else if(e.key == "s"){
        if (playerY < 500 && playerFuel >= 1) playerY += 100; 
        playerFuel-=1; 
        playerFrameY=0;
        checkPlayerAtTown()
        checkPlayerAtEnemyTank()
        checkPlayerAtWrench()
        checkPlayerAtAmmo()

        

    }
    
    else if(e.key == "a"){
        if(playerX >25 && playerFuel >= 1 ) playerX -=100; 
        playerFuel-=1; 
        playerFrameY=1;
        checkPlayerAtTown()
        checkPlayerAtEnemyTank()
        checkPlayerAtWrench()
        checkPlayerAtAmmo()
    }

    else if(e.key == "d"){
        if(playerX < 1025 && playerFuel >= 1) playerX += 100; 
        playerFuel-=1; 
        playerFrameY=2;
        checkPlayerAtTown()
        checkPlayerAtEnemyTank()
        checkPlayerAtWrench()
        checkPlayerAtAmmo()

    }

   
    createTowns();
    createEnemy();
    createWrench();
    createAmmo();
    drawSprite(playerSprite, playerWidth*playerFrameX, playerHeight * playerFrameY, playerWidth, playerHeight, 
        playerX,playerY, playerWidth, playerHeight);
    fuelGauge(playerFuel)
    healthBar();
    
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

function healthBar(){

    for (i = 0; i < (playerHealth/100); i +=1)
    {
        ctx.fillStyle="green";
        ctx.fillRect(500 + (30*i), 640, 20,40)

    };
    
}

function clearHealthBar(){

    for (i = 0; i < 8; i +=1)
    {
        ctx.fillStyle="grey";
        ctx.fillRect(500 + (30*i), 640, 20,40)

    };
    
}

function eraseTank(){
    ctx.fillStyle = "#DDA15E";
    ctx.fillRect(playerX,playerY,50,50);
    ctx.moveTo(playerX,playerY);
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

    ctx.drawImage(base,armybaseLocationX,armybaseLocationY,100,100);
    createTowns();
    createEnemy();
    createWrench();
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

function createWrench(){

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
            openCombat(i)

        }

        else{
            playerAtEnemyTank = false;
            
        }
    }


}

function checkPlayerAtWrench(){

    for(i=0; i<wrenchLocationsTotal; i++){
        if(playerX == wrenchLocations[0][i] && playerY == wrenchLocations[1][i] ){
            if(playerHealth <= 600){
                playerHealth +=200
                wrenchLocations[0].splice(i,1)
                wrenchLocations[1].splice(i,1)
                clearHealthBar()
                healthBar()
            } else if(playerHealth == 700){
                playerHealth+=100
                wrenchLocations[0].splice(i,1)
                wrenchLocations[1].splice(i,1)
                clearHealthBar()
                healthBar()
            }
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

var engagedTank = ""

function openCombat(enemyEngaged){
    combatMenu.classList.add("active")
    $("#run-button").click(function(){
        closeCombat()
    })
    engagedTank = new Enemy(enemyEngaged,500,100)
    $("#combat-status").text("You have engaged a hostile tank!")
    $("#enemy-tank").text("Engaged tank: " + engagedTank.number)
    $("#enemy-health").text("Enemy health: " + engagedTank.health)
    $("#enemy-attack").text("Enemy attack: " + engagedTank.attack)

}

$("#attack-button").click(function(){
    $("#attack-button").attr("disabled","disabled")
    setTimeout(function(){
    $("#attack-button").removeAttr("disabled")
    },6000)

    engagedTank.health -= playerAttack
    $("#enemy-health").text("Enemy health: " + engagedTank.health)
    $("#combat-status").text("You've hit the enemy!")
    
    var enemyHitChance = Math.floor(Math.random()*101)

    if(engagedTank.health <=0){
        enemyTankLocations[0].splice(engagedTank.number,1)
        enemyTankLocations[1].splice(engagedTank.number,1)
        setTimeout(function(){
            $("#combat-status").text("You defeated the enemy tank!")
        },2000)
        setTimeout(closeCombat,3000)

    } else{
        if (enemyHitChance<=70){
    
            setTimeout(function(){
                playerHealth -= engagedTank.attack
                $("#combat-status").text("The enemy hit you!")
                console.log(playerHealth)
                clearHealthBar()
                healthBar()
            }, 3000)
    
        } else{
            setTimeout(function(){
                $("#combat-status").text("The enemy missed you!")
            },3000)
        }
    

    }

})

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