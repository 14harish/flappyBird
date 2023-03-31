
var myGamePiece;
var myObstacle;

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myObstacle  = new component(10, 200, "green", 400, 120);    
    s2  = new component(14, 200, "pink", 500, 170);    
    s3  = new component(14, 200, "violet", 600, 100);    
    s4  = new component(14, 200, "orange", 700, 100);    
    myGameArea.start();
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 900;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function(){
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    this.crash=function(object){
        let c=false;
        if(this.x <=object.x){
            if(this.x >=object.x-this.width && this.y>=object.y-this.height){
                c=true;
            }
        }
        // console.log(c);
        return c;
    }    
    this.check = function(){
        if(this.x == 0){
            this.x = 730;
            this.y = Math.random()*200;
        }
    }
}

function updateGameArea() {
    if(myGamePiece.crash(myObstacle)){
        myGameArea.stop();
        alert("Restart");
        startGame();
    }else if(myGamePiece.crash(s2)){
        myGameArea.stop();
        alert("Restart");
        startGame();
    }
    else if(myGamePiece.crash(s3)){
        myGameArea.stop();
        alert("Restart");
                startGame();
            }
    else if(myGamePiece.crash(s4)){
                myGameArea.stop();
                alert("Restart");
                        startGame();
        }
    else{
    myGameArea.clear();
    myObstacle.update();
    s3.update();
    s4.update();
    myObstacle.x -= 1;        
    s2.update();
    s2.x -= 1;        
    s3.x -= 1;        
    s4.x -= 1;        
    myGamePiece.newPos();    
    myGamePiece.update();
    myObstacle.check();
    s2.check();
    s4.check();
    s3.check();
  }
 }

function moveup() {
    myGamePiece.speedY = -1; 
}

function movedown() {
    myGamePiece.speedY = 1; 
}

function moveleft() {
    myGamePiece.speedX = -1; 
}

function moveright() {
    myGamePiece.speedX = 1; 
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
