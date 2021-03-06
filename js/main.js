let buttonOn=document.querySelector("#on")
let container=document.querySelector("#cont")

let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d")
canvas.width =1010
canvas.height = 460


//Medidas del laberinto y sus paredes (en la misma hay operaciones que nos permiten cambiarle el tamaño a nuestro gusto)
let anchoLaberinto=canvas.width-70
let altoLaberinto=canvas.height-80
let xLab=30
let yLab=50
let op1=canvas.width/12
let op2=canvas.height/5
let anchoPared= op1+10
let altoPared=op2-22
let grosorPared=5
let interval
let seg=0
// Agregué el parámetro "color" para debuggear mejor cuál pared estaba tocando. Pueden sacarlo.
function Rectangulo(positionX, positionY, ancho, alto, color,vertical) {
    this.x = positionX+xLab;
    this.y = positionY+yLab;
    this.width = ancho;
    this.height = alto;
    this.color = color;
    this.vertical=vertical;

    this.dibujar = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
function Element (imagen,recorteX,recorteY,positionX, positionY, ancho, alto){
    this.x = positionX+xLab;
    this.y = positionY+yLab;
    this.width = ancho;
    this.height = alto;

    this.draw=function(){
        ctx.drawImage(imagen,0,0,recorteX,recorteY,this.x,this.y,this.width,this.height)
    }}
// Llamar a la imagen del personaje
let dani = new Image()
dani.src = "img/daniel.png"
let llave =new Image()
llave.src="img/llave.png"
// Convertí al héroe en una clase para poder darle métodos.
class Hero {
    constructor(personaje,widthImage,heightImage) {
        // Propiedades.
        this.src = personaje;
        this.frameX = 0;
        this.frameY=0
        this.x = 50;
        this.y = 60;
        this.width = 54;
        this.height = 54;
        this.collide = false;
        this.widthImage=widthImage
        this.heightImage=heightImage


        // Métodos.
        this.draw = function(){
            ctx.drawImage(this.src, this.frameX * this.widthImage, this.frameY*this.heightImage, this.widthImage, this.heightImage, this.x, this.y, this.width, this.height)
        }
        this.checkCollision = function (wall) {
            // Defino los bordes del héroe.
            this.top = this.y;
            this.bottom = this.y + this.height;
            this.left = this.x;
            this.right = this.x + this.width;

            // Defino los bordes de la pared.
            const wallTop = wall.y;
            const wallBottom = wall.y + wall.height;
            const wallLeft = wall.x;
            const wallRight = wall.x + wall.width;

            // Compruebo si los bordes chocan.
            if (
                this.left < wallRight &&
                this.right > wallLeft &&
                this.top < wallBottom &&
                this.bottom > wallTop

            ) {
                this.collide = true;
                 if(wall == gemelas){
                   
                    grito.play()
                    stop()

                }
                if(wall==llave1){
                    this.getDoorKey=true
                    } else{
                        this.getDoorKey=false
                    }
            }

        }
    }
}
class fantasma {
    constructor (src, x,y,ancho, alto, altoImg, anchoImg){
        this.src = src;
        this.frameX = 0;
        this.frameY=0
        this.x = x;
        this.y = y;
        this.speedX=5;
        this.speedY=0;
        this.width = ancho;
        this.height = alto;
        this.collide = false;
        this.anchoImg=anchoImg;
        this.altoImg=altoImg;


        // Métodos.
        this.draw = function(){
            ctx.drawImage(this.src, this.frameX * this.anchoImg, this.frameY*this.altoImg, this.anchoImg, this.altoImg, this.x, this.y, this.height, this.width)
        
        },
        this.newPos=function(){ 
            this.x+=this.speedX
            this.y+=this.speedY},
        this.movimiento=function(){

            if (this.x >canvas.width-100) {
                this.speedX=-this.speedX;
            }

            if(this.x<50){
                this.speedX=0;
                this.speedY=-3 ;
            }

            if (this.y<48) {
                this.speedY =0;
                this.speedX=3;
            }

            if (this.x> canvas.width) {
                this.reset()
            }

        },
        this.reset=function(){
            this.x=50;
            this.y=200;
        }

        //metodo para mover de lado a lado
        this.moveToSide = function(cantMov){
            aux = this.x
            while(this.x < cantMov){
                this.x += this.speedX
                this.frameY = 1
                this.draw()
                console.log(this.x)
            }
            if(this.x >= cantMov){
                this.moveToSide(-this.x,-aux)
            }

        }

    }
}
let source="img/twins.png"
let twins= new Image();
twins.src=source

// INSTANCIO A LOS FANTASMAS

let gemelas= new fantasma(twins,180,190,70,70,180,101)
let enemies= [gemelas]
// Genero un array vacío y voy pusheando paredes nuevas.
let paredes = []
paredes.push(new Rectangulo(0, altoPared, anchoPared,grosorPared, "#b3a659"))
paredes.push(new Rectangulo(anchoPared, altoPared, grosorPared, altoPared))
paredes.push(new Rectangulo(anchoPared*2,0,grosorPared,altoPared*2))

paredes.push(new Rectangulo(anchoPared,altoPared*4,anchoPared,grosorPared))
paredes.push(new Rectangulo(anchoPared,altoPared*3,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared,altoPared*3,anchoPared*2 +grosorPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*3,altoPared,grosorPared,altoPared*2))
paredes.push(new Rectangulo(anchoPared*3,altoPared,anchoPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*4,altoPared,grosorPared,altoPared))

paredes.push(new Rectangulo(anchoPared*3,altoPared*4,anchoPared*2,grosorPared))
paredes.push(new Rectangulo(anchoPared*5,altoPared*4,grosorPared,altoPared+altoPared/3))


paredes.push(new Rectangulo(anchoPared*5,0,grosorPared,altoPared))

paredes.push(new Rectangulo(anchoPared*5,0,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared*5,altoPared,anchoPared*2,grosorPared))
paredes.push(new Rectangulo(anchoPared*5,altoPared*4,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared*6,altoPared,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared*7,altoPared,grosorPared,altoPared))

paredes.push(new Rectangulo(anchoPared*6,altoPared*4,anchoPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*6,altoPared*3,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared*6,altoPared*3,anchoPared*2+grosorPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*8,0,grosorPared,altoPared*3))

paredes.push(new Rectangulo(anchoPared*9,0,grosorPared,altoPared*2))

paredes.push(new Rectangulo(anchoPared*9,altoPared*3,grosorPared,altoPared*2+altoPared/3))
paredes.push(new Rectangulo(anchoPared*9,altoPared*3,anchoPared-anchoPared/3,grosorPared))
// Bordes de la pantalla
paredes.push(new Rectangulo(0,0,anchoLaberinto,grosorPared))
paredes.push(new Rectangulo(anchoLaberinto-5,0,grosorPared,altoPared*2))
paredes.push(new Rectangulo(0,altoLaberinto-5,anchoLaberinto,grosorPared))
paredes.push(new Rectangulo(0,0,grosorPared,altoLaberinto))
// Instancio al héroe.
let heroe = new Hero(dani,120,190);
let llave1 = new Element(llave,800,575,300,200,50,50)
let elements=[llave1]
let colorDeFondo="#453635"
let widthPasillo1=anchoLaberinto
let xPasillo=canvas.width+20

//Variables auxiliares que nos permiten pasar de un nivel a otro
let aux=0
let aux2=0
let aux3=0
let aux4=0
let aux5=0
//Variables del TIEMPO Y LA PUNTUACION
let time=0
let score=0
//Estas son las coordenadas de los elementos que nos permitiran pasar de un nivel a otro
let xCuadradoN2=((canvas.width*3)-100)
let xPasilloN3=((canvas.width*4)-100)
let xCuadradoN3=((canvas.width*5)-100)
function dibujoCanvas() {
    //RECTANGULO CANVAS GENERAL
    //color de fondo del canvas
   ctx.fillStyle="black"
   //rectangulo
   ctx.fillRect(0,0,canvas.width,canvas.height)
    time++
   //TIMER
   time++
   //TIMER
   //armo los segundos
   if(time%60==0){
    seg=seg+1
   }
 if(time==60){
    time=0

}
   ctx.fillStyle="white"
   ctx.font="30px Amatic SC" 
   ctx.fillText(`TIME: ${seg}s   ${time}ms `,50,40 )
   ctx.fillText(`SCORE: ${score}`,canvas.width-200,40 )
 
   //RECTANGULO DEL LABERINTO
   ctx.fillStyle=colorDeFondo //Del laberinto
    ctx.fillRect(xLab,yLab,anchoLaberinto,altoLaberinto)

     // En cada ciclo: borro todo el canvas, dibujo al héroe, aumento el frame para animarlo y evito que pase del sexto,
     // ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle="#a70e06"
    ctx.font="50px Amatic SC" 
    ctx.fillText("REDRUM",380,250 ) 
   //ELEMENTOS PASAJE A SEGUNDO NIVEL
    ctx.fillStyle="white"
    ctx.font="26px Amatic SC"
  ctx.fillText("RUN RUN!! --> (acá podriamos poner fantasmitas que quieran atrapar al niño) ",xPasillo,100)
    ctx.fillStyle="red"
    ctx.fillRect(xPasillo,180,widthPasillo1,200)
    //ELEMENTOS SEGUNDO NIVEL
ctx.fillRect(xCuadradoN2,220,100,50)
ctx.fillStyle="white"
  ctx.fillText("Salida",xCuadradoN2,240)
   //ELEMENTOS DEL PASAJE AL TERCER NIVEL
   
    ctx.fillStyle="#cf98b2"
   ctx.fillRect(xPasilloN3,190,50,100)
   //ELEMENTOS DEL TERCER NIVEL
   ctx.fillStyle="green"
   ctx.fillRect(xCuadradoN3,220,100,50)
ctx.fillStyle="white"
  ctx.fillText("Salida",xCuadradoN3,240)
  elements.forEach(e=>{
    e.draw()
    heroe.checkCollision(e) 
})
 enemies.forEach(gemelas=>{
  gemelas.draw()
  // gemelas.moveToSide(500)
  gemelas.frameX++
  gemelas.frameX >= 5 ? gemelas.frameX = 0 : null;
  gemelas.newPos()
  gemelas.movimiento()
  heroe.checkCollision(gemelas)})
    heroe.draw()
    heroe.frameX++
    heroe.frameX >= 5 ? heroe.frameX = 0 : null;
    
    
    // luego por cada pared del array, la dibujo y le pregunto al héroe si la chocó.
    paredes.forEach(pared => {
        pared.dibujar()
        heroe.checkCollision(pared)
        
        
  
    })
    if(seg==30|| (seg==35&heroe.x+heroe.width<anchoLaberinto)){
        
        test2()
       
    }
    if(heroe.getDoorKey){
        elements=[]
        score=1
     } else{
         score=0
     }
    //PASAJE AL SEGUNDO NIVEL (SI SE QUIERE AGREGAR ELEMENTOS DEBE SER HECHO DENTRO DEL SECTOR "ELEMENTOS DE PASAJE A SEGUNDO NIVEL" 
    // TAMBIEN SE DEBE ARRANCAR A DIBUJAR DESDE 50 PARA EL INDICE X  & 50 PARA EL INDICE Y )
 if(heroe.x+heroe.width>anchoLaberinto){
                    aux=aux+1
                                }  
if(aux==1){
 xPasillo=30;
  paredes=[]
  enemies=[]
 heroe.x=xLab+10
 aux++
}

if(heroe.x+heroe.width>xPasillo+widthPasillo1){
    xPasillo=-canvas.width-20
    aux2++
}
if(aux2==1){
    heroe.x=xLab+10
  xCuadradoN2=anchoLaberinto-70

    aux2++
    
}
//LABERINTO SEGUNDO NIVEL
if(aux2>1){
    colorDeFondo="#7A9AAF"
    paredes.push(new Rectangulo(anchoPared, 0, grosorPared,altoPared*4, "#2C2B3D"))
paredes.push(new Rectangulo(anchoPared, altoPared*2, anchoPared, grosorPared))
paredes.push(new Rectangulo(anchoPared*2,altoPared*2,grosorPared,altoPared/4))
//pared cruzada
paredes.push(new Rectangulo(anchoPared+anchoPared/2,altoPared*2,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared,altoPared*3,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared,altoPared*3,anchoPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*2,altoPared*3,grosorPared,altoPared))

paredes.push(new Rectangulo(anchoPared*2,altoPared,anchoPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*3,altoPared,grosorPared,altoPared*4+altoPared/3))

paredes.push(new Rectangulo(anchoPared*3,altoPared*3,anchoPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*3+anchoPared/2,altoPared*3,grosorPared,altoPared+altoPared/2))


paredes.push(new Rectangulo(anchoPared*4,altoPared*3,grosorPared,altoPared+altoPared/2))

paredes.push(new Rectangulo(anchoPared*4,0,grosorPared,altoPared*2))
paredes.push(new Rectangulo(anchoPared*5,altoPared*2,grosorPared,altoPared*3+altoPared/3))

paredes.push(new Rectangulo(anchoPared*5,0,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared*5,altoPared,anchoPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*6,altoPared,grosorPared,altoPared*2))
paredes.push(new Rectangulo(anchoPared*6,altoPared*3,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared*6,altoPared*3+altoPared/2,anchoPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*6,altoPared*4,anchoPared,grosorPared))

paredes.push(new Rectangulo(anchoPared*6,altoPared*3,anchoPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*7,0,grosorPared,altoPared*3+grosorPared))
paredes.push(new Rectangulo(anchoPared*8,altoPared,grosorPared,altoPared*4+altoPared/3))

paredes.push(new Rectangulo(anchoPared*9,0,grosorPared,altoPared*2))

paredes.push(new Rectangulo(anchoPared*9,altoPared*3,grosorPared,altoPared*2+altoPared/3))
paredes.push(new Rectangulo(anchoPared*9,altoPared*3,anchoPared,grosorPared))
// Bordes de la pantalla
paredes.push(new Rectangulo(0,0,anchoLaberinto,grosorPared))
paredes.push(new Rectangulo(anchoLaberinto-5,0,grosorPared,altoPared*2))
paredes.push(new Rectangulo(0,altoLaberinto-5,anchoLaberinto,grosorPared))
paredes.push(new Rectangulo(0,0,grosorPared,altoLaberinto))
source="img/ghost2.png"
enemies=[gemelas]
if(heroe.x+heroe.width>xCuadradoN2+90){
    aux3++
}
//PASAJE AL TERCER NIVEL
if(aux3==1){
    heroe.x=xLab+10
    xPasilloN3=anchoLaberinto-25
    
    aux3++
     
}}
if(aux3>1){
    colorDeFondo="#c8ae8a"
    ctx.fillStyle="white"
  ctx.fillText("Este sería el pasaje al siguiente nivel (hay que cruzar el cuadrado rosa) ",xPasilloN3-800,100)

    paredes=[]
    xCuadradoN2=-500
}
if(heroe.x+heroe.width>xPasilloN3+50){
aux4++
}
if(aux4==1){
    heroe.x=xLab+10
    aux4++
    xPasilloN3=-500
    xCuadradoN3=anchoLaberinto-70
}
if(aux4>1){
    colorDeFondo="#1c7456"
    paredes.push(new Rectangulo(0, altoPared*3, anchoPared,grosorPared, "#2C2B3D"))
paredes.push(new Rectangulo(anchoPared, altoPared*3, grosorPared, altoPared))
    
paredes.push(new Rectangulo(anchoPared, altoPared*4, anchoPared+5, grosorPared))
paredes.push(new Rectangulo(anchoPared*2,altoPared*3,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared*2,altoPared*3,anchoPared,grosorPared))

paredes.push(new Rectangulo(anchoPared,altoPared,anchoPared*2,grosorPared))
paredes.push(new Rectangulo(anchoPared*3,altoPared,grosorPared,altoPared/2))
paredes.push(new Rectangulo(anchoPared*2,altoPared,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared*2,altoPared*2,anchoPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*3,altoPared*2,anchoPared/2,grosorPared))
paredes.push(new Rectangulo(anchoPared*3,altoPared*2,grosorPared,altoPared*1+altoPared/2))
paredes.push(new Rectangulo(anchoPared*3,altoPared*4+altoPared/2,grosorPared,altoPared-10))


paredes.push(new Rectangulo(anchoPared*4,0,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared*4,altoPared,anchoPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*5,altoPared,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared*4+anchoPared/2,altoPared*2,anchoPared/2,grosorPared))
paredes.push(new Rectangulo(anchoPared*5,altoPared*2,anchoPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*6,altoPared*2,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared*6,altoPared*3,anchoPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*5+anchoPared/2,altoPared*3,anchoPared/2,grosorPared))


paredes.push(new Rectangulo(anchoPared*4,altoPared*3,grosorPared,altoPared*2+altoPared/3))
paredes.push(new Rectangulo(anchoPared*4,altoPared*3,anchoPared/2,grosorPared))


paredes.push(new Rectangulo(anchoPared*5,altoPared*4,grosorPared,altoPared+altoPared/3))
paredes.push(new Rectangulo(anchoPared*5,altoPared*4,anchoPared*3+grosorPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*7,altoPared*2,anchoPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*8,altoPared*2,grosorPared,altoPared*2))

paredes.push(new Rectangulo(anchoPared*7,altoPared+altoPared/2,grosorPared,altoPared/2))
paredes.push(new Rectangulo(anchoPared*6,altoPared/2,anchoPared,grosorPared))

paredes.push(new Rectangulo(anchoPared*9,0,grosorPared,altoPared*3))
paredes.push(new Rectangulo(anchoPared*8,altoPared,anchoPared,grosorPared))

paredes.push(new Rectangulo(anchoPared*9,altoPared*3,anchoPared/2,grosorPared))

paredes.push(new Rectangulo(anchoPared*9,altoPared*4,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared*9,altoPared*4,anchoPared-5,grosorPared))

paredes.push(new Rectangulo(anchoPared*9+anchoPared/2.25,altoPared*2,anchoPared/2,grosorPared))

// Bordes de la pantalla
paredes.push(new Rectangulo(0,0,anchoLaberinto,grosorPared))
paredes.push(new Rectangulo(anchoLaberinto-5,0,grosorPared,altoPared*2))
paredes.push(new Rectangulo(0,altoLaberinto-5,anchoLaberinto,grosorPared))
paredes.push(new Rectangulo(0,0,grosorPared,altoLaberinto))
}
if(heroe.x+heroe.width>xCuadradoN3+50){
    aux5++
    }
    if(aux5==1){
        heroe.x=10
        aux5++
        
    }
    if(aux5>1){
        xCuadradoN3=-500
        paredes=[]
        colorDeFondo="pink"
        ctx.fillStyle="white"
        ctx.fillText("GANASTE!!",350,150)
      
    }
}
// Reitero la función "dibujoCanvas" 8 veces por segundo.
function on(){
    interval= setInterval(dibujoCanvas, 1000/15)
    container.removeChild(buttonOn)
  
  }
  
   function stop(){
     
      clearInterval(interval)
        reload.style.display="inline"
   }

 
// En todo el documento escucho los eventos de teclado.
document.addEventListener("keydown", (e) => {
    
    

    // En lugar de utilizar la propiedad "keyCode" que está quedando obsoleta, utilizo "key"
    // https://developer.mozilla.org/es/docs/Web/API/KeyboardEvent/key .
    // Al presionar una de las teclas, si el héroe NO está chocando con una pared, se va a mover en esa dirección 3px.
    // En caso de estar tocando una pared, rebotará 15px en sentido contrario.
    // La cantidad de píxeles de rebote es un número "mágico", inventado... no es lo ideal. Les dejo la tarea de mejorar esa parte.
    // También habría que evitar que cambie la dirección del movimiento en el eje secundario. Es decir:
    // si toco el lado izquierdo de una pared, así como está el código, al presionar la tecla ABAJO va a ir para arriba.
    // Con tiempo se puede corregir. 
    switch (e.key) {
        // Arriba
        case "ArrowUp":
        case "w":
        case "W":
            if (!heroe.collide) {
                heroe.y -= 3;
                heroe.frameY=2
            } else {
                heroe.y += 15;
                heroe.collide = false;
            }
            
            break;

        // Abajo
        case "ArrowDown":
        case "s":
        case "S":
            if (!heroe.collide) {
                heroe.y += 3;heroe.frameY=3
            } else {
                heroe.y -= 15;
                heroe.collide = false;

            }
            break;


        // Izquierda
        case "ArrowLeft":
        case "a":
        case "A":
            if (!heroe.collide) {
                heroe.x -= 3;
                heroe.frameY=1
            } else {
                heroe.x += 15;
                heroe.collide = false;
            }
            break;

        // Derecha
        case "ArrowRight":
        case "d":
        case "D":
            if (!heroe.collide) {
                heroe.x += 3;
                heroe.frameY=0
             
            } else {
                heroe.x -= 15;

              

                heroe.collide = false;
            }
            
              
    
            break;

        default:
            break;
    }
})

//FUNCIONES DE LOS BOTONES DE MOVIMIENTO
function moveUp(){
    if (!heroe.collide) {
        heroe.y -= 3;
        heroe.frameY=2
    } else {
        heroe.y += 15;
        heroe.collide = false;
    } 
}
function moveLeft(){
    if (!heroe.collide) {
        heroe.x -= 3;
        heroe.frameY=1
    } else {
        heroe.x += 15;
        heroe.collide = false;
    }
}
function moveRight(){
    if (!heroe.collide) {
        heroe.x += 3;
        heroe.frameY=0
        paredes.forEach(e=>e.color="#b3a659")
    } else {
        heroe.x -= 15;

        paredes.forEach(e=>e.color="white")

        heroe.collide = false;
    }
    
}
function moveDown(){
    if (!heroe.collide) {
        heroe.y += 3;heroe.frameY=3
    } else {
        heroe.y -= 15;
        heroe.collide = false;

    }
}
// let buttonUp= document.querySelector("#up")
// buttonUp.addEventListener('touchmove',moveUp())