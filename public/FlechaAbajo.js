class FlechaAbajo extends Flecha{
    constructor(){
        super(55,height-55);
    }
    clicked(player,socket){
        let d=dist(mouseX,mouseY,this.x,this.y);
        if(d<this.r){
          this.message("click pulsado");
          this.isPressed=true;
          socket.emit('clickFlecha', {id:socket.id,y:player.y});
          player.moveDown();
        }
    }
    noClicked(player){
        this.message("click no pulsado");
        player.moveDownStop();
        this.isPressed=false;
    }
    message(mensaje){
        document.getElementById('messages').innerHTML=mensaje;
     }
}