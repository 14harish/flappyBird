
var myGamePiece;
var myObstacle;

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myObstacle  = new component(10, 200, "green", 300, 120);    
    s2  = new component(14, 202, "pink", 500, 100);    
    myGameArea.start();
}

var obstciles ={
    dow1 :{
        x:800,
        y:120,
        width :10,
        height:200
    },
    top1 :{
        x:800,
        y:8,
        width :10,
        height:200
    },
    dow2 :{
        x:800,
        y:120,
        width :10,
        height:200
    }
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
            this.x = obstciles.dow1.x;
            this.y = obstciles.dow1.y;
        }
    }
}

function updateGameArea() {
    if(myGamePiece.crash(myObstacle)){
        myGameArea.stop();
        startGame();
    }else if(myGamePiece.crash(s2)){
        myGameArea.stop();
        startGame();
    }
    else{
    myGameArea.clear();
    myObstacle.update();
    myObstacle.x -= 1;        
    s2.update();
    s2.x -= 1;        
    myGamePiece.newPos();    
    myGamePiece.update();
    myObstacle.check();
    s2.check();
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
