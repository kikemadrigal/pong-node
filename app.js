const express=require('express');
const app=express();
var server=require('http').Server(app);
var io=require('socket.io')(server);
app.use(express.static('public'));


//var sockets=[];
//Objetos que vamos a manipilar en el servidor
function Usuario(id,y){
  this.id=id;
  this.y=y;
}
function Ball(){
  this.x=250;
  this.y=250;
}

/**
 * Tendremos un array con todos los usuarios 
 * y otro con todos los sockets
 * tambien creamos un usuario para poder manipular
 * más tarde cuando recibamos cambios de posición
 */
var usuarios=[];


io.on('connection', function(socket){
  //socket.emit('mensajeServidor',"Tu socket es: "+socket.id);
  //console.log(socket.id);
  var usuario=new Usuario(socket.id,250);
  //Almacenamos en el array el nuevo usuario
  usuarios.push(usuario);
  //Creamos la bola
  var ball=new Ball();
  //Lo lanzamos a los clientes
  /*socket.emit('contadorDeUsuarios', usuarios);*/
  /**Lanzamos los sockets a los clientes para que no empiece la partida 
  *Hasta que hayan 2
  */
  /*sockets.push(socket);
  socket.emit('contadorDeSockets', sockets.length);*/

  //Al crear u socket le mandamos u mensaje a la escena:
  //socket.emit('messages', {text:"Usuario "+socket.id+", conectado, llevamos: "+usuarios.length});


  /************Cuando recibamos un click*******/
  socket.on('clickFlecha',function(data){
    //socket.emit('messages',"posicion de jugador actulizada"+data.id+", "+data.y);
    for(var i=0; i<usuarios.length;i++){
      if(socket.id===usuarios[i].id){
        usuarios[i].y=data.y;
        socket.emit('actualizarArrayDeUsuarios', usuarios);
        socket.emit('mensajeServidor',"posicion de jugador actulizada"+usuarios[i].id+", "+usuarios[i].y);
      }
    }
  });
  /**La información sobre la posición de a bola
   * la hiremos recibiendo todo el rato del scketch.
   */
  socket.on('bolaSeMueve',function(data){
    ball.x=data.x;
    ball.y=data.y;
    //console.log=("server: "+data.x);
  });


  socket.on('disconnect', function () {
    for(var i=0; i<usuarios.length;i++){
      if(socket.id===usuarios[i].id){
        usuarios.splice( usuarios.indexOf(usuarios[i].id), 1 );
      }
    }
  });



  /*Se llama a la funcion heartBeat cada 33 veces por segundo 
  *para que vaya actulizando las posiciones de los jugadores
  */
  function heartBeat(){
    socket.emit('heartNeat', usuarios, ball);
  }
  setInterval(heartBeat,20);
  /*********Final de cuando recibamos un cambio en un usuario */

});




server.listen(80, function(){
  console.log('Servidor escuchando.');
});