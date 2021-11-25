/*
 _______________________________________________________________________________
|===============================================================================|
|                                                                               |
|                                                                               |
|               //              Proyecto 32 "Plinkos"               \\          |                  
|                                  Miguel Correa                                |          
|                                                                               |
|                                                                               |
|===============================================================================|
|_______________________________________________________________________________|
*/


var Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies; 
var balls = [];
var plinkos = [];
var divisions =[];
var ball;
var bgImg;

var divisionHeight=300;
var score =0;
var gameState = "play"
var count = 0;

//Preload = precargar imagen de fondo
function preload(){
  bgImg = loadImage("bg.jpg");
}

function setup() {
  alert("Tienes solo 5 tiros! Veamos cuantos puntos haces B´)");
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  //Crea el suelo
  ground = new Ground(width/2,height,width,20);

  //Crea todas las divisiones{
   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }
    for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) {
        plinkos.push(new Plinko(j,175));
    }

    for (var j = 75; j <=width; j=j+50) {
        plinkos.push(new Plinko(j,275));
    }

    for (var j = 50; j <=width-10; j=j+50) {
        plinkos.push(new Plinko(j,375));
    }
    //}
}
 
function draw() {
  //Establece como fondo la variable de la imagen
  background(bgImg);
  textSize(35)
  fill("violet");
  //Muestra la puntacion que llevas acumulada
  text("Puntuación: "+score,15,40);
  //Muestra la cantidad de tiros que te quedan
  text("Tiros: " + count,680,40);
  fill("white");

  //Muestra la cantidad de puntos que te da cada caja{
  textSize(35)
  text(" 500 ", 5, 550);
  text(" 500 ", 80, 550);
  text(" 500 ", 160, 550);
  text(" 500 ", 240, 550);
  text(" 100 ", 320, 550);
  text(" 100 ", 400, 550);
  text(" 100 ", 480, 550);
  text(" 200 ", 560, 550);
  text(" 200 ", 640, 550);
  text(" 200 ", 720, 550);
  //}
  Engine.update(engine);
  //Muestra el fondo
  ground.display();

  //Corrije el bug para que no puedas llegar a MAS de 5 tiros
  if(count === 5){
    gameState = "end";
  }

  /*
  Establece que SI el estado es "end" muestra la instruccion de reinicio y 
  el aviso de turno acabado :)
  */
  if ( gameState =="end") {
    fill("lightgray");
    textSize(65);
    text("Tu Turno Ha Acabado", 90, 250);
    textSize(40);
    text("Presiona 'Espacio' para reiniciar :)",110,330);
  }

  //crea las bolitas/obstaculos (plinkos)
  for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();  
  }
 
  /*
  Si el body de la ball es diferente a null esta se muestra.
  SI la posicion en Y de la bola es mayor a "760" otorga sus diferentes puntuaciones
  SI la posicion en X de la bola es menor a 310 da 500pts 
  Pone la ball en null para reiniciar su estancia 
  SI el contador es mayor O igual a 5 = estado del juego END
  SI la posicion en X de la bola es mayor a 311 y menor a 600 da 100pts
  SI la posicion en X de la bola es mayor a 601 y menor a 900 da 200pts
  */
    if(ball!=null)
    {
       ball.display();

        if(ball.body.position.y >760){
          if(ball.body.position.x < 310){
            //puntos recibos:
            score = score + 500;
            //reinicia la ball:
            ball = null;
            //contador de tiros menor o igual = 5{gamestate = end}
            if(count >= 5) gameState = "end";
          }else if(ball.body.position.x > 311 && ball.body.position.x < 600){
            //puntos recibos:
            score = score + 100;
            //reinicia la ball:
            ball = null;
            //contador de tiros menor o igual = 5{gamestate = end}
            if(count >= 5) gameState = "end";
          }else if(ball.body.position.x > 601 && ball.body.position.x < 900){
            //puntos recibos:
            score = score + 200;
            //reinicia la ball:
            ball = null;
            //contador de tiros menor o igual = 5{gamestate = end}
            if(count >= 5) gameState = "end";
          }
        }
    }

    //muestra las divisiones
   for (var k = 0; k < divisions.length; k++) 
   {
     divisions[k].display();
   }
 
}

//Funcion para crear bolas en cualquier posicion del mouse que se de click
function mousePressed()
{
  /*Si el estado de juego es Diferente a "end" al dar click aumenta 1 tiro en
  count y crea las bolas en la coordenada x del mouse
  */
  if(gameState !== "end"){
    count++;
    ball=new Ball(mouseX, 10, 10, 10);
  }
}

//Funcion que agregue para reiniciar el juego sin tener que reiniciar la página
function keyPressed(){
  //Si presionas la tecla ESPACIO(32)
  if(keyCode === 32){
    //Cambia el estado de juego = play
    gameState = "play";
    //reestablece la cuenta de tiros a 0
    count = 0;
    //reestablece los puntos a 0
    score = 0;
  }
}

