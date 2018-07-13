/****Pantalla principal**********/
let pistaFutbol; //background

let flechaArriba; //Hub fleach arriba
let flechaAbajo; //Hub flech abajo

var players=[];
var localPlayer;
var remotePlayer;
var ball;
var puedeComenzarConUno=false;
var puedeComenzarConDos=false;
var socket;

function preload(){
  //flower=loadImage('images/flor.jpg');
  pistaFutbol=loadImage('images/pista-futbol.jpg');
}
function setup() {
  var myCanvas = createCanvas(600,230);
  myCanvas.parent('myContainer');
 
  flechaArriba=new FlechaArriba();
  flechaAbajo=new FlechaAbajo();

  

  localPlayer=new Player(1,120);
  remotePlayer=new Player(2,width-100);

  ball=new Ball();
 

  /*******************Rollo socket**************************/
  socket=io.connect('http://192.168.1.102:80', {'forceNew':true});
  /*El servidor responderá al evento 'messages' que creamos aquí y mandará unos datos
  *Ahora hiremos al lado del servidor y crearemos el evento messages dentro del conection
  *rRearemos en el servidor: socket.emit('messages',function (data){...}) 
  */
  socket.on('mensajeServidor', function(data){
      //console.log(data);
      var html=`<div>
                  <em>${data}</em>
              </div>`;
      document.getElementById('mensajeServidor').innerHTML=html;
  });
  socket.on('contadorDeUsuarios', function(players){

  });
  socket.on('heartNeat', function(players, serverBall){
   /* ball.setX(serverBall.x);
    ball.setY(serverBall.y);*/
  
    console.log("la bola" + ball.x+", y: "+ball.y);
    var html="Numero de usuarios: "+players.length+"<br>--------------------------<br>";
    for(var i=0; i<players.length;i++){
      if(socket.id===players[i].id){
        html+="<br>Este eres tu: Usuario "+(i+1)+": "+players[i].id+", x: "+players[i].y;
        //localPlayer.setY(players[i].y);
      }
      else{
        remotePlayer.setY(players[i].y);
        html+="<br> Usuario "+(i+1)+": "+players[i].id+", x: "+players[i].y;
      }
    }
    contadorDeUsuarios(players);
  
    document.getElementById('mostrarUsuarios').innerHTML=html;
  });

 
  function contadorDeUsuarios(data){
    
    //var html="jugadores: "+data.length+"<br>-----------------------<br>";
    if(data.length===1){
      html='Falta un usuario para poder jugar.  ';
      puedeComenzarConUno=true;
      puedeComenzarConDos=false;
    }else if(data.length===2){
      html="partida en marcha"+puedeComenzarConDos;
      puedeComenzarConUno=true;
      puedeComenzarConDos=true;

      
    }else{
      html='Partida ya comenzada, lo siento no puedes jugar. '+puedeComenzarConDos;
      puedeComenzarConDos=false;
      puedeComenzarConUno=true;
    }
    document.getElementById('messagesFaltaUsuario').innerHTML=html;
  }

 /***************Fin de rollo socket*********************/





  
}







function draw() {
  background(pistaFutbol);

  if(puedeComenzarConUno){
    flechaArriba.show(socket);
    flechaAbajo.show(socket);
    localPlayer.show();
  }
  if(puedeComenzarConDos){
    localPlayer.show()
    localPlayer.colision(ball);
    remotePlayer.show();
    remotePlayer.colision(ball);   
  }
  
  ball.show();
  //ball.move(socket);
}

function touchStarted() {
  flechaArriba.clicked(localPlayer,socket);
  flechaAbajo.clicked(localPlayer,socket);

}

function touchEnded() {
  flechaArriba.noClicked(localPlayer);
  flechaAbajo.noClicked(localPlayer);
}



