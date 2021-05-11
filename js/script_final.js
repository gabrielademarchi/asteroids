window.onload=function(){

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d'); 
    canvas.width=800;
    canvas.height=400;

    const keys = [] 

    let backgroundY1=0;
    let backgroundY2= 792;
    let backgroundSpeed = 1.5;

    let score = 0;
    var tInicial = new Date().getTime();
    var tAtual;

    let gameframe = 0;
    ctx.font = '20px Helvetica';

    let gameOver = false;

    //imagens
    const playerSprite = new Image();
    playerSprite.src="./images/ship_300x300.png";

    const background = new Image();
    background.src = "./images/fundo1.png";

    const background2 = new Image();
    background2.src = "./images/fundo2.png";

    const shipSprite = new Image();
    shipSprite.src="./images/asteroide.png";


//guardar evento pressionar seta
window.addEventListener("keydown", function(e){
    keys[e.key] = true;
    keys[e.keyCode] = true;
});

window.addEventListener("keyup", function(e){
    delete keys[e.key];
    delete keys[e.keyCode];
})

//CLASS PLAYER
class Player{
    constructor(){
        this.x = 200;
        this.y= 300;
        this.radius = 30;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.speed = 7;
        this.spriteWhidth = 150;
        this.spriteHeight = 75;
    }   
    update(){
        if (keys[38] && this.y > 10){ 
            this.y -= this.speed; 
            this.frameY = 0;
        }
        //esquerda
        if (keys[37] && this.x > 0){ 
            this.x -= this.speed; 
            this.frameY = 3; 
        }
        //abaixo
        if (keys[40] && this.y < canvas.height - 10){ 
            this.y += this.speed; 
            this.frameY = 2; 
        }
        //direita
        if (keys[39] && this.x < canvas.width - 10){ 
            this.x += this.speed; 
           this.frameY = 1; 
        }
        //animação ship
        if (gameframe % 2 == 0){
            if (player.frameX<1){
                player.frameX++
            } else {
                player.frameX=0
            }
        }
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath;
        ctx.drawImage(playerSprite, this.frameX*this.spriteWhidth, this.frameY*this.spriteHeight, this.spriteWhidth, this.spriteHeight, this.x-80, this.y-40, this.spriteWhidth, this.spriteHeight)
    } 
}   
    
const player = new Player();


//asteroides
    const asteroidesArray = [];
        class asteroide {
            constructor(){
                this.x = 0 + Math.random()*canvas.width; // posição aleatória
                this.y = -200; //sempre são geradas por inteiro antes de aparecer
                this.radius = 35 * (1+ Math.random());
                this.frameX = 0;
                this.frameY = 0;
                this.speed = Math.random()*5+1; //velocidade aleatória entre 1 e 6
                this.distance;
            }
            update(){
                this.y += this.speed; //move os asteróides pra cima no eixo y
                const dx = this.x - player.x;
                const dy = this.y - player.y;
                const distance = Math.sqrt(dx*dx+dy*dy);
                if (distance<this.radius+player.radius)
                handleGameOver();
            }
            draw(){
                ctx.fillStyle='blue';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
                ctx.fill();
                ctx.closePath();
                ctx.stroke();
                ctx.drawImage(shipSprite, this.x-this.radius, this.y-this.radius, this.radius*2.2, this.radius*2.2);            
            }
        }

let fase = 55
        
// animacao asteroides
function handleAsteroids(){
    if (gameframe % 60 ==0){
        fase -=1 
    }
    if (gameframe % fase == 0){
        asteroidesArray.push(new asteroide());
    }
    for (let i=0; i<asteroidesArray.length;i++){
        asteroidesArray[i].draw();     
        asteroidesArray[i].update();
    }
}
  
function handleGameOver(){
   // ctx.fillStyle = 'white';
   // ctx.fillText('FIM DE JOGO, sua pontuação é de '+ score, canvas.width/2-100, canvas.height/2);
    gameOver = true;

}


//pontuação
    function pontuacao(){
        tAtual = new Date().getTime();
        score = Math.floor((tAtual-tInicial)/1000);
    }



//RODAR
    function animate(){

        //background parallax
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(background, 0, backgroundY1);
        ctx.drawImage(background2, 0, backgroundY2);
            if (backgroundY1 < - 792) {
                backgroundY1 = 792 + backgroundY2 - backgroundSpeed;
            } else {
                backgroundY1 -= backgroundSpeed
            }
            if (backgroundY2 < - 792) {
                backgroundY2 = 792 + backgroundY1 - backgroundSpeed;
            } else {
                backgroundY2 -= backgroundSpeed
            }
         
            handleAsteroids();

            //animação foguete
           // drawSprite(playerSprite, player.width*player.frameX, player.height*player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
            //movePlayer();
           // handlePlayerFrame();
            player.update();
            player.draw();            
            
            //animação asteroides

            

           // colisao();
           
            pontuacao();

            ctx.fillStyle = 'white'
            ctx.fillText('Pontos: ' + score, 10, canvas.height-10)
            gameframe++;

            if (!gameOver){
                requestAnimationFrame(animate) 
            } else{
                ctx.fillStyle = 'white';
                ctx.fillText('FIM DE JOGO, sua pontuação é de '+ score, canvas.width/2-200, canvas.height/2);
            } 
            
        }
        
    animate();


}


