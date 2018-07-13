class FlechaArriba extends Flecha{
    constructor(){
        super(55,55);
    }
    clicked(player,socket){
        let d=dist(mouseX,mouseY,this.x,this.y);
        if(d<this.r){
         
          this.message("click pulsado");
          this.isPressed=true;
          socket.emit('clickFlecha', {id:socket.id,y:player.y});
          player.moveUp();
        }
    }
    noClicked(player){
        this.message("click no pulsado");
        this.isPressed=false;
        player.moveUpStop();
    }
    message(mensaje){
       document.getElementById('messages').innerHTML=mensaje;
    }
}