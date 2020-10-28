var boton = document.getElementById("botonAi");
var sound2 = document.getElementById ("sound2");
var v = document.getElementsByTagName ("audio")[0];
var sound = true;


boton.addEventListener("click", function (){
  if(sound == true){ 
    v.pause();
    sound2.src ="https://img.icons8.com/carbon-copy/100/000000/mute.png";
    sound = false;
  }else {
    v.play();
    sound2.src = "https://img.icons8.com/carbon-copy/100/000000/low-volume.png";
    sound = true;
  }

});

var grito = document.getElementById("grito")