class Player{
  constructor(id,x){
    this.id=id;
    this.x = x;
    this.y = height/2;
    this.velocity = 1;
    this.w = 5;
    this.h = 50;
    this.points = 0;
    this.allowMoveUp=false;
    this.allowMoveDown=false;

  }
   

   show(){
    //rectMode(CENTER);
    noStroke();
    var c = color(0, 0,255); 
    fill(c);
    rect(this.x,this.y,this.w,this.h);
    strokeWeight(1); 
    if(this.allowMoveUp)
      this.y -= this.velocity;
    if(this.allowMoveDown)
      this.y += this.velocity;
  }
  moveUp(){
    this.allowMoveUp=true;
  }

  moveUpStop(){
    this.allowMoveUp=false;
  }
   moveDown(){
     this.allowMoveDown=true;
      //if(this.y<height && this.y>0)
      /*this.y += this.velocity;
      console.log('player ha bajado: '+this.y);*/

   }
   moveDownStop(){
     this.allowMoveDown=false;
   }
   setY(y){
    this.y=y;
   }
   setId(id){
    this.id=id;
   }
   getId(){
     return this.id;
   }


   colision(b){
    var hit=false;

    if(b.x+b.w>=this.x && b.x<this.x+this.w){
      if(b.y+b.h>=this.y && b.y <  this.y+this.h){
        hit=true;
        this.yv = -5
      }
    }
    if(b.x<=this.x && b.x+b.w>=this.x+this.w){
      if(b.y<=this.y&&b.y+b.h>=this.y+this.h){
        this.xv = 5
      }
    }

    if(this.y<=b.x && this.x +this.w >=b.x+b.w){
      if(this.y<=b.y&&this.y+this.h>=b.y+b.h){
        this.xv = -5
      }
    }
   if(hit){
    console.log(hit);
    //b.colision(this);
   }
   // 
    //return hit;
    
  }
}


/******forma ecmascrypt 5 */
/*function Player(x){
  this.x = x;
  this.y = height/2;
  this.velocityy = 4;
  this.w = 20;
  this.h = 80;
  this.points = 0;

  this.show = function(){
   rect(this.x,this.y,this.w,this.h)
  }

  this.move = function(b){
  }

}*/
