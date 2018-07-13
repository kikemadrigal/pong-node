class Ball{
  constructor(){
    this.x = width/2;
    this.y = height/2;
    this.w=15;
    this.h=15;
    var r = floor(random(2));
    //this.xv = (r === 0)?-5:5;
    this.v=5;
    this.xv = this.v;
    this.yv = this.v;
    //this.vector=createVector(this.x,this.y);
  }
  

  show(){
    ellipse(this.x,this.y,this.w,this.h);
    //this.vector.normalize();
  }

  move(socket){
  
    
    if(this.y < 1)
      this.yv =this.v;
    if(this.y >= height)
      this.yv = -this.v;
    if(this.x < 1)
      this.xv= this.v;
    if(this.x >= width)
      this.xv= -this.v;
    
    this.y += this.yv;
    this.x += this.xv;

   

    //this.angulo=acos(this.x/this.y);
    //console.log("x: "+this.x+", y: "+this.y);
    //console.log(this.vector.heading());

    socket.emit('bolaSeMueve', {x:this.x,y:this.y});
  }
  

  colision (p){
      var d = dist(this.x,this.y,p.x,p.y);
      var r = floor(random(2));
      if(d < this.w )
        
              this.yv = 5;
            
            else
              this.yv = -5;
       
      
  }


  setX(x){
    this.x=x;
  }
  setY(y){
    this.y=y;
  }
}
