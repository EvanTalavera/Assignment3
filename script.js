$(function(){
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
