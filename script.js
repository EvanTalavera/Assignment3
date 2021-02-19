
var c = document.getElementById("gameCanvas");
var ctx = c.getContext('2d');

var playerHealth = 800;
var playerAttack = 100;
var playerFuel = 20;
var playerAmmo = 15;
var playerEngaged = false;
var playerScore = 0

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
const victoryMenu = document.querySelector(".win-container")
const defeatMenu = document.querySelector(".lose-container")


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

ammoLocationsX = [125,225,325,425,525,625,725,825,925,1025]
ammoLocationsY = [325,25,525,25,225,425,325,125,225,125]
ammoLocationsTotal = ammoLocationsX.length;
ammoLocations = [ammoLocationsX,ammoLocationsY]

armyBaseLocationX = 1025;
armyBaseLocationY = 25;

var engagedStatus = checkPlayerAtEnemyTank()

playerSprite.src ="images/playerSprite.png";
town.src = "images/Town.png";
enemyTank.src = "images/Enemy Tank.png";
wrench.src = "images/Wrench.png";
ammo.src = "images/Ammo.png"
base.src = "images/Army Base.png"

function drawSprite(img, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinatonY, destinationWidth,destinationHeight){
    ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinatonY, destinationWidth,destinationHeight)
}


//Player movement section    
$('html').keydown(function(e){
    eraseTank();
    clearFuelGauge()
    clearHealthBar()

    if(e.key == "w"){
        if (playerY > 25 && playerFuel >= 1 && (playerEngaged == false)){
        playerY -= 100; 
        playerFuel-=1; 
        playerFrameY=3;
        checkPlayerAtTown()
        checkPlayerAtEnemyTank()
        checkPlayerAtWrench()
        checkPlayerAtAmmo()
        checkPlayerAtBase()

        if(playerFuel<=0){
            openDefeat()
        }

        }

    }

    else if(e.key == "s"){
        if (playerY < 500 && playerFuel >= 1 && (playerEngaged == false)){
        playerY += 100; 
        playerFuel-=1; 
        playerFrameY=0;
        checkPlayerAtTown()
        checkPlayerAtEnemyTank()
        checkPlayerAtWrench()
        checkPlayerAtAmmo()
        checkPlayerAtBase()

        if(playerFuel<=0){
            openDefeat()
        }

        } 

        

    }
    
    else if(e.key == "a"){
        if(playerX >25 && playerFuel >= 1 && (playerEngaged == false)){
        playerX -=100; 
        playerFuel-=1; 
        playerFrameY=1;
        checkPlayerAtTown()
        checkPlayerAtEnemyTank()
        checkPlayerAtWrench()
        checkPlayerAtAmmo()
        checkPlayerAtBase()

        if(playerFuel<=0){
            openDefeat()
        }

        }
    }

    else if(e.key == "d"){
        if(playerX < 1025 && playerFuel >= 1&& (playerEngaged == false)){
        playerX += 100; 
        playerFuel-=1; 
        playerFrameY=2;
        checkPlayerAtTown()
        checkPlayerAtEnemyTank()
        checkPlayerAtWrench()
        checkPlayerAtAmmo()
        checkPlayerAtBase()

        if(playerFuel<=0){
            openDefeat()
        }

        }

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


 //Start of rendering section  
function fuelGauge(){
    for (i = 0; i < playerFuel; i +=1)
    {
        ctx.fillStyle="yellow";
        ctx.fillRect(50 + (10*i), 640, 20,40)

    };

}

function clearFuelGauge(){
    for (i = 0; i < 20; i +=1)
    {
        ctx.fillStyle="grey";
        ctx.fillRect(50 + (10*i), 640, 20,40)

    };

}

function healthBar(){

    for (i = 0; i < (playerHealth/100); i +=1)
    {
        ctx.fillStyle="green";
        ctx.fillRect(350 + (30*i), 640, 20,40)

    };
    
}

function clearHealthBar(){

    for (i = 0; i < 8; i +=1)
    {
        ctx.fillStyle="grey";
        ctx.fillRect(350 + (30*i), 640, 20,40)

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
    ctx.fillText("Health:",350,630);
    ctx.fillText("Fuel:", 50,630);
    ctx.fillText("Ammo: ",650,630);
    ctx.fillText(playerAmmo,650,665);
    ctx.fillText("Score:", 750,630);
    ctx.fillText(playerScore,750,665);

    ctx.drawImage(base,(armyBaseLocationX-25),(armyBaseLocationY-25),100,100);
    
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

function openVictory(){
    $(".score-display").text("Your score:" + playerScore)
    victoryMenu.classList.add("active")

}

function openDefeat(){
    $(".score-display").text("Your score:" + playerScore)
    defeatMenu.classList.add("active")

}

//End of render section

//Start of player position check section

function checkPlayerAtTown(){

    for(i=0; i<townLocationsTotal; i++){
        if((playerX - 25) == townLocations[0][i] && (playerY - 25) == townLocations[1][i] ){
            
            if(playerFuel<=15){
                playerFuel += 5
                clearFuelGauge()
                fuelGauge()

            } else if(15<playerFuel<20){
                playerFuel += (20-playerFuel)
                clearFuelGauge()
                fuelGauge()

            }
            
        }

    }
    

}

function checkPlayerAtEnemyTank(){

    for(i=0; i<enemyTankLocationsTotal; i++){
        if(playerX == enemyTankLocations[0][i] && playerY == enemyTankLocations[1][i] ){

            openCombat(i)

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

                ctx.fillStyle = "grey"
                ctx.fillText(playerScore,750,665)
                playerScore += 250
                ctx.fillStyle="black"
                ctx.fillText(playerScore,750,665);

            } else if(playerHealth == 700){

                playerHealth+=100
                wrenchLocations[0].splice(i,1)
                wrenchLocations[1].splice(i,1)
                clearHealthBar()
                healthBar()

                ctx.fillStyle = "grey"
                ctx.fillText(playerScore,750,665)
                playerScore += 250
                ctx.fillStyle="black"
                ctx.fillText(playerScore,750,665);

            }
        }
    }
}

function checkPlayerAtAmmo(){

    for(i=0; i<ammoLocationsTotal; i++){
        if(playerX == ammoLocations[0][i] && playerY == ammoLocations[1][i] ){
            
            ctx.fillStyle = "grey"
            ctx.fillText(playerAmmo,650,665)
            playerAmmo += 2
            ctx.fillStyle="black"
            ctx.fillText(playerAmmo,650,665);
            ammoLocations[0].splice(i,1)
            ammoLocations[1].splice(i,1)

            ctx.fillStyle = "grey"
            ctx.fillText(playerScore,750,665)
            playerScore += 250
            ctx.fillStyle="black"
            ctx.fillText(playerScore,750,665);

        }


    }

}



function checkPlayerAtBase(){
    if(playerX == armyBaseLocationX && playerY == armyBaseLocationY){
        openVictory()

    }
}

//End of player position check section

//Start of combat section

var engagedTank = ""

function openCombat(enemyEngaged){
    playerEngaged = true
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

    if (playerAmmo > 0){
        ctx.fillStyle = "grey"
        ctx.fillText(playerAmmo,650,665)
        engagedTank.health -= playerAttack
        playerAmmo -= 1
        ctx.fillStyle="black"
        ctx.fillText(playerAmmo,650,665);
        $("#enemy-health").text("Enemy health: " + engagedTank.health)
        $("#combat-status").text("You've hit the enemy!")

    } else if(playerAmmo == 0){
        $("#combat-status").text("You're out of ammo!")
        
    }
    
    var enemyHitChance = Math.floor(Math.random()*101)

    if(engagedTank.health <=0){
        enemyTankLocations[0].splice(engagedTank.number,1)
        enemyTankLocations[1].splice(engagedTank.number,1)
        setTimeout(function(){
            $("#combat-status").text("You defeated the enemy tank!")
        },2000)

        ctx.fillStyle = "grey"
        ctx.fillText(playerScore,750,665)
        playerScore += 1000
        ctx.fillStyle="black"
        ctx.fillText(playerScore,750,665);

        setTimeout(closeCombat,3000)

    } else{
        if (enemyHitChance<=70){
    
            setTimeout(function(){
                playerHealth -= engagedTank.attack
                $("#combat-status").text("The enemy hit you!")
                console.log(playerHealth)
                clearHealthBar()
                healthBar()
                if(playerHealth<=0){
                    setTimeout(function(){
                        closeCombat()
                        openDefeat()
                    },1000)
                }
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
    playerEngaged = false

}

//End of combat section
function recordScore(){
   console.log(localStorage);
   var highScore = JSON.parse(localStorage.getItem('score') || '[]');
   highScore.push(playerScore);
   localStorage.setItem('score', JSON.stringify(highScore));
   console.log("Score Updated");
   updateScoreBoard();
}

function updateScoreBoard(){
    var sb = document.getElementById("scoreboard");
    var retrievedScores = JSON.parse(localStorage.getItem('score'));

    for (var i = 0; i < retrievedScores.length; i++){
        sb.innerHTML += "<tr><td>" + retrievedScores[i].score + "</td></tr>";
    }

}


//Start of loading section
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
//End of loading section