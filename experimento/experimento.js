
let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d")
canvas.width =1000
canvas.height = 487
// En lugar de pintar un rectangulo rosa, seteo el background del canvas con el color
// para consumir menos recursos.
// canvas.style.background= 'brown'

let anchoPared= 95
let altoPared=95
let grosorPared=5
// Le cambié el nombre a algunas propiedades para MI comodidad, no porque estuvieran mal.
// Agregué el parámetro "color" para debuggear mejor cuál pared estaba tocando. Pueden sacarlo.
function Rectangulo(positionX, positionY, ancho, alto, color) {
    this.x = positionX;
    this.y = positionY;
    this.width = ancho;
    this.height = alto;
    this.color = color;

    this.dibujar = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

let girl = new Image()
girl.src = "../img/nn-run.png"
// let pasillo=new Image()
// pasillo.src="img/pieza.png"

// Convertí al héroe en una clase para poder darle métodos.
class Hero {
    constructor() {
        // Propiedades.
        this.src = girl;
        this.frame = 0;
        this.x = 900;
        this.y = 10;
        this.width = 64;
        this.height = 64;
        this.collide = false;

        // Métodos.
        this.draw = function(){
            ctx.drawImage(this.src, this.frame * 142, 0, 142, 198, this.x, this.y, this.width, this.height)
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
            if ( this.left < wallRight &&
                this.right > wallLeft &&
                this.top < wallBottom &&
                this.bottom > wallTop
            ) {
                this.collide = true;
            }

        }
    }
}
// Genero un array vacío y voy pusheando paredes nuevas.
let bordesPantalla=[]
const paredes = [
    new Rectangulo(0, altoPared, anchoPared,grosorPared, "#b3a659"),
    new Rectangulo(anchoPared, altoPared, grosorPared, altoPared),
    new Rectangulo(anchoPared*2,0,grosorPared,altoPared*2),
    new Rectangulo(anchoPared,altoPared*4,anchoPared,grosorPared),
    new Rectangulo(anchoPared,altoPared*3,grosorPared,altoPared),
    new Rectangulo(anchoPared,altoPared*3,anchoPared*2,grosorPared),
    new Rectangulo(anchoPared*3,altoPared,grosorPared,altoPared*2),
    new Rectangulo(anchoPared*3,altoPared,anchoPared,grosorPared),
    new Rectangulo(anchoPared*4,altoPared,grosorPared,altoPared),
    new Rectangulo(anchoPared*3,altoPared*4,anchoPared*2,grosorPared),
    new Rectangulo(anchoPared*5,altoPared*4,grosorPared,altoPared*2),
    new Rectangulo(anchoPared*5,0,grosorPared,altoPared),
    new Rectangulo(anchoPared*5,altoPared,anchoPared*2,grosorPared),
    new Rectangulo(anchoPared*5,0,grosorPared,altoPared),
    new Rectangulo(anchoPared*5,altoPared*4,grosorPared,altoPared),
    new Rectangulo(anchoPared*6,altoPared,grosorPared,altoPared),
    new Rectangulo(anchoPared*7,altoPared,grosorPared,altoPared),

    new Rectangulo(anchoPared*6,altoPared*4,anchoPared,grosorPared),
    new Rectangulo(anchoPared*6,altoPared*3,grosorPared,altoPared),
    new Rectangulo(anchoPared*6,altoPared*3,anchoPared*2,grosorPared),
    new Rectangulo(anchoPared*8,0,grosorPared,altoPared*3),

    new Rectangulo(anchoPared*9,0,grosorPared,altoPared*2),

    new Rectangulo(anchoPared*9,altoPared*3,grosorPared,altoPared*3),
    new Rectangulo(anchoPared*9,altoPared*3,anchoPared,grosorPared),

    // BORDES DE LA PANTALLA
    new Rectangulo(0,0,canvas.width,grosorPared),
    new Rectangulo(canvas.width-5,0,grosorPared,altoPared*2),
    new Rectangulo(0,canvas.height-5,canvas.width,grosorPared),
    new Rectangulo(0,0,grosorPared,canvas.height)

]


// Instancio al héroe.
let heroe = new Hero();
let anchoP=canvas.width+10
let xPasillo=canvas.width+20

let condition=false
let aux=0
let aux2=0
let aux3=0
let xCuadradoBlanco=((canvas.width*3)-100)
function dibujoCanvas() {
    // En cada ciclo: borro todo el canvas, dibujo al héroe, aumento el frame para animarlo y evito que pase del sexto,
   ctx.fillStyle="#53290b"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle="#a70e06"
    ctx.font="50px Amatic SC" 
    
    ctx.fillText("REDRUM",380,250 ) 
   
    ctx.fillStyle="white"
    ctx.font="26px Amatic SC"
  ctx.fillText("RUN RUN!! --> (acá podriamos poner fantasmitas que quieran atrapar al niño) ",xPasillo,100)
    ctx.fillStyle="red"
    ctx.fillRect(xPasillo,180,anchoP,200)
    
ctx.fillRect(xCuadradoBlanco,200,100,100)
   
    heroe.draw()
    heroe.frame++
    heroe.frame >= 6 ? heroe.frame = 0 : null;
    
    
    // luego por cada pared del array, la dibujo y le pregunto al héroe si la chocó.
    paredes.forEach(pared => {
        pared.dibujar()
        heroe.checkCollision(pared)
  
    })
    
    
 if(heroe.x+heroe.width>canvas.width){
                    aux=aux+1
                                }  
if(aux==1){
 xPasillo=0;
  paredes=[]
 heroe.x=10
 aux++
}
if(heroe.x+heroe.width>xPasillo+anchoP){
    xPasillo=-canvas.width-20
    aux2++
}
if(aux2==1){
    heroe.x=10
  xCuadradoBlanco=canvas.width-100

    aux2++
    
}
if(aux2>1){
    paredes.push(new Rectangulo(0, altoPared, anchoPared,grosorPared, "#b3a659"))
paredes.push(new Rectangulo(anchoPared, altoPared, grosorPared, altoPared))
paredes.push(new Rectangulo(anchoPared*2,0,grosorPared,altoPared*2))

paredes.push(new Rectangulo(anchoPared,altoPared*4,anchoPared,grosorPared))
paredes.push(new Rectangulo(anchoPared,altoPared*3,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared,altoPared*3,anchoPared*2,grosorPared))
paredes.push(new Rectangulo(anchoPared*3,altoPared,grosorPared,altoPared*2))
paredes.push(new Rectangulo(anchoPared*3,altoPared,anchoPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*4,altoPared,grosorPared,altoPared))

paredes.push(new Rectangulo(anchoPared*3,altoPared*4,anchoPared*2,grosorPared))
paredes.push(new Rectangulo(anchoPared*5,altoPared*4,grosorPared,altoPared*2))


paredes.push(new Rectangulo(anchoPared*5,0,grosorPared,altoPared))

paredes.push(new Rectangulo(anchoPared*5,0,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared*5,altoPared,anchoPared*2,grosorPared))
paredes.push(new Rectangulo(anchoPared*5,altoPared*4,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared*6,altoPared,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared*7,altoPared,grosorPared,altoPared))

paredes.push(new Rectangulo(anchoPared*6,altoPared*4,anchoPared,grosorPared))
paredes.push(new Rectangulo(anchoPared*6,altoPared*3,grosorPared,altoPared))
paredes.push(new Rectangulo(anchoPared*6,altoPared*3,anchoPared*2,grosorPared))
paredes.push(new Rectangulo(anchoPared*8,0,grosorPared,altoPared*3))

paredes.push(new Rectangulo(anchoPared*9,0,grosorPared,altoPared*2))

paredes.push(new Rectangulo(anchoPared*9,altoPared*3,grosorPared,altoPared*3))
paredes.push(new Rectangulo(anchoPared*9,altoPared*3,anchoPared,grosorPared))
// Bordes de la pantalla
paredes.push(new Rectangulo(0,0,canvas.width,grosorPared))
paredes.push(new Rectangulo(canvas.width-5,0,grosorPared,altoPared*2))
paredes.push(new Rectangulo(0,canvas.height-5,canvas.width,grosorPared))
paredes.push(new Rectangulo(0,0,grosorPared,canvas.height))
ctx.fillStyle="white"
ctx.font="30px Amatic SC"
  ctx.fillText("Este sería el segundo nivel ",xCuadradoBlanco-300,50)
if(heroe.x+heroe.width>xCuadradoBlanco+90){
 

    aux3++
}
if(aux3==1){
    heroe.x=10
    
    
    aux3++
     
}}
if(aux3>1){
    ctx.fillStyle="white"
  ctx.fillText("Este sería el siguiente nivel ",10,50)

    paredes=[]
    xCuadradoBlanco=-500
}


}
// Reitero la función "dibujoCanvas" 8 veces por segundo.
setInterval(dibujoCanvas, 1000 / 15)

 
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
                heroe.y += 3;
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
            } else {
                heroe.x -= 15;
                heroe.collide = false;
            }
            
              
    
            break;

        default:
            break;
    }
})

