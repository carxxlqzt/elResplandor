let miPersonaje
const anchoPared=5;
const largoPared=50;
function startGame() {
    miAreaDejuego.start();
     // ancho, alto, color, x, y, vertical
    miPersonaje= new component(20,20,"red",0,0,false);
    misParedes=[
        new component(largoPared,anchoPared,"black",30,30,false),
        new component(anchoPared,largoPared,"black",30,30,true),
        new component(anchoPared,largoPared,"black",80,30,true),
        new component(largoPared + 4,anchoPared,"black",30,80,false)
    ]
  }
  
  var miAreaDejuego = {
    canvas : document.getElementById('canvas'),
    start : function() {
      this.canvas.width = 480;
      this.canvas.height = 270;
      this.context = this.canvas.getContext("2d");
      this.interval = setInterval(updateGameArea, 20);
      window.addEventListener('keydown', function (e) {
        miAreaDejuego.key = e.keyCode;
      })
      window.addEventListener('keyup', function (e) {
        miAreaDejuego.key = false;
      })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
  }
// CONSTRUCTOR QUE DIBUJA LOS COMPONENTE DEL JUEGO
  function component(ancho, alto, color, x, y,vertical) {
    this.ancho = ancho;
    this.alto = alto;
    this.x = x;
    this.y = y;
    this.vertical=vertical;
    this.speedX=0;
    this.speedY=0;
    this.colision1=false;
    this.colision2=false;
    this.colision3=false;
    this.colision4=false;
    this.update= function(){
     ctx = miAreaDejuego.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    },
    this.nuevaPosicion=function () {
        this.x+=this.speedX;
        this.y+=this.speedY;
    },
    this.colision=function (obj) {
        // MI PERSONAJE
        let miDrc=this.x + (this.ancho);
        let miIzq=this.x;
        let miTop=this.y;
        let miBase=this.y + (this.alto);

        // PAREDES

        let paredDrc= obj.x + (obj.ancho);
        let paredIzq= obj.x;
        let paredTop= obj.y;
        let paredBase=obj.y + (obj.alto);
        let vertical= obj.vertical;


        if (vertical) {
            // <>
            
            if (miTop > paredBase || miBase < paredTop ) {
                this.colision1=false
            } else if(miDrc ==  paredIzq || miBase < paredTop){
             this.colision1=true
           }else if (miIzq==paredDrc) {
            this.colision2=true;
            }    
        }else{
            if (miIzq> paredDrc || miDrc < paredIzq ) {
                this.colision3=false;
            }else if(miTop == paredBase){
                this.colision3=true;
            }

            if (miIzq> paredDrc || miDrc < paredIzq) {
              this.colision4=false;
            }else if (miBase == paredTop) {
              this.colision4=true;
            }

        }
    }
    
  }


  function updateGameArea() {
   miAreaDejuego.clear();
   miPersonaje.speedX = 0;
   miPersonaje.speedY = 0;
   if (miAreaDejuego.key && miAreaDejuego.key == 37){
     if (miPersonaje.colision2) {
            miPersonaje.speedX=0;
            miPersonaje.colision2=false;
          } else {
          miPersonaje.speedX = -1;   
      } 

      }
    if (miAreaDejuego.key && miAreaDejuego.key == 39) {
      
      if (miPersonaje.colision1){
        miPersonaje.speedX=0;
        miPersonaje.colision1=false;
      } else if (miPersonaje.colision2 || !miPersonaje.colision1 || miPersonaje.colision3){
      miPersonaje.speedX = 1; 
      } 

    }
    if (miAreaDejuego.key && miAreaDejuego.key == 38) {
      if (miPersonaje.colision3) {
        miPersonaje.speedY=0;
        miPersonaje.colision3=false;
      }else{
      miPersonaje.speedY = -1;        
      }
     }
    if (miAreaDejuego.key && miAreaDejuego.key == 40) {
      if (miPersonaje.colision4) {
        miPersonaje.speedY=0;
        miPersonaje.colision4=false;
      }else{
      miPersonaje.speedY = 1;         

      }
     }


   
    miPersonaje.nuevaPosicion()
    miPersonaje.update();
    for (let i = 0; i < misParedes.length; i++) {
        misParedes[i].update() 
        miPersonaje.colision(misParedes[i])   
  
        
    }
  }
    
  