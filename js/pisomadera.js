const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
canvas.width =1000
canvas.height = 487

canvas.style.background = "#453635"
ctx.strokeStyle = "#251207";

function horizontal(y){
    ctx.strokeStyle = "#251207";
    for (y =0; y<1050; y+=50){
  ctx.moveTo(0,y);
  ctx.lineTo(1000,y);
  ctx.stroke();
}
}

function madera(x){
    ctx.fillStyle = "#513937";
    for (x=0; x<1050; x+=150){
  ctx.fillRect(750,0+x,250,50);
  ctx.strokeRect(750,0+x,250,50);
  ctx.fillRect(0,50+x,300,50);
  ctx.strokeRect(0,50+x,300,50);
  ctx.fillRect(350,100+x,350,50);
  ctx.strokeRect(350,100+x,350,50);
    }
 }  
 
 function madera2(x){
    ctx.fillStyle = "#3E302F";
    for (x=0; x<1050; x+=150){
  ctx.fillRect(0,0+x,450,50);
  ctx.strokeRect(0,0+x,450,50);
  ctx.fillRect(550,50+x,450,50);
  ctx.strokeRect(550,50+x,450,50);
    }
 }  
horizontal (50)
madera(50)
madera2 (50)
