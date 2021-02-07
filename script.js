$(function(){
    var health = 800;
    var fuel = 100;
    var tankX = 25;
    var tankY = 530;
    
    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext('2d');
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
});

