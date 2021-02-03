$(function(){
    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.rect(0,550,1110,150);
    ctx.fillStyle = "#B7B7A4";
    console.log("Rectangle drawn");
    ctx.stroke();
    ctx.fill();

    for (i = 80; i < 560; i += 100) 
	{
	    ctx.moveTo(0, i);
		ctx.lineTo(c.width, i);
	    ctx.stroke();
	}
    
    for (i = 100; i < 1110; i += 100) 
	{
	    ctx.moveTo(i, 0);
	    ctx.lineTo(i,c.width/2);
	    ctx.stroke();
	}
});