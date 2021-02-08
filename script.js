$(function(){
    var health = 800;
    var fuel = 100;
    var tankX = 25;
    var tankY = 530;
    
    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext('2d');
    const keys = [];

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
    }

    function animate(){
        ctx.clearRect(0,0,c.width,c.height);
        ctx.beginPath();
        ctx.rect(0,600,1100,100);
        ctx.fillStyle = "#B7B7A4";
        ctx.stroke();
        ctx.fill();

        for (i = 0; i < 700; i += 100) 
        {
            ctx.moveTo(0, i);
            ctx.lineTo(c.width, i);
            ctx.stroke();
        }
        
        for (i = 0; i < 1100; i += 100) 
        {
            ctx.moveTo(i, 0);
            ctx.lineTo(i,c.height-100);
            ctx.stroke();
        }
        
        drawSprite(playerSprite, player.width*player.frameX, player.height * player.frameY, player.width, player.height, 
            player.x,player.y, player.width, player.height);
        requestAnimationFrame(animate);
        movePlayer();


    }
    animate();

    window.addEventListener("keydown", function(e){
        keys[e.key] = true;
        console.log(keys)
    })

    window.addEventListener("keyup", function(e){
        delete keys[e.key];
    })

    function movePlayer(){
        if (keys["w"] && player.y > 1){
            player.y -= player.speed;
            player.frameY=3;
        }

        if (keys["s"] && player.y < 550){
            player.y += player.speed;
            player.frameY=0
        }

        if (keys["a"] && player.x > 1){
            player.x -= player.speed;
            player.frameY=1
        }

        if (keys["d"] && player.x < 1050){
            player.x += player.speed;
            player.frameY=2
        }
    }


    





    
});

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
    ctx.fillStyle = "green";
    ctx.fillRect(500,640,(health/800)*250,40);
   
    function fuelGauge(){
     ctx.fillStyle="yellow";
     ctx.fillRect(100,640,(fuel/100)*250,40);
     console.log(fuel);
    }
   
    function drawTank(){
        ctx.fillStyle = "#283618"
        ctx.fillRect(tankX,tankY,50,50);
        ctx.moveTo(tankX,tankY);
    }

   drawTank();
   fuelGauge();


