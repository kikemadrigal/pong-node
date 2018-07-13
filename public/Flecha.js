class Flecha{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.velocidad=5;
        this.r=55/2;
        this.isPressed=false;
    }
   
    show (){
        if(!this.isPressed){
            strokeWeight(1);
            var c = color(255, 204, 0); 
        }  
        else{
            strokeWeight(4);
            var c = color(255, 0, 0);
        }
             
        fill(c);
        ellipse(this.x,this.y, 55, 55);  
        noFill();
    }
    showPressed(){
        var c = color(255, 0, 0); 
        fill(c);
        ellipse(this.x,this.y, 55, 55);  
        noFill();
    }


    
    
}
