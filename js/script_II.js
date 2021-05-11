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

//foguete
/*    const player = {
        x: 200,
        y: 300,
        width: 150,
        height: 75,
        frameX: 0,
        frameY: 0,
        speed: 7,
    }; */

    //imagens
    const playerSprite = new Image();
    playerSprite.src="./images/ship_300x300.png";

    const background = new Image();
    background.src = "./images/fundo1.png";

    const background2 = new Image();
    background2.src = "./images/fundo2.png";

    const asteroidesSprite = new Image();
    asteroidesSprite.src="./images/asteroids_572x612.png";

    function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }

//CLASS PLAYER
class Player{
    constructor(){
        this.x = 200;
        this.y= 300;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.speed = 7;
        this.spriteWhidth = 300;
        this.spriteHeight = 300;
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
        if (keys[40] && this.y < canvas.height - this.height){ 
            this.y += this.speed; 
            this.frameY = 2; 
        }
        //direita
        if (keys[39] && this.x < canvas.width - this.height){ 
            this.x += this.speed; 
           this.frameY = 1; 
        }
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 50, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath;
    } 
}   
    

const player = new Player();

//movimento
//guardar evento pressionar seta
    window.addEventListener("keydown", function(e){
        keys[e.key] = true;
        keys[e.keyCode] = true;
    });

    window.addEventListener("keyup", function(e){
        delete keys[e.key];
        delete keys[e.keyCode];
    })

    /*
//setas    
    function movePlayer(){
        //acima
        if (keys[38] && player.y > 10){ 
            player.y -= player.speed; 
            player.frameY = 0;
        }
        //esquerda
        if (keys[37] && player.x > 0){ 
            player.x -= player.speed; 
            player.frameY = 3; 
        }
        //abaixo
        if (keys[40] && player.y < canvas.height - player.height){ 
            player.y += player.speed; 
            player.frameY = 2; 
        }
        //direita
        if (keys[39] && player.x < canvas.width - player.height){ 
            player.x += player.speed; 
            player.frameY = 1; 
        }
    } */


//efeito foguete
    function handlePlayerFrame(){
    if (gameframe % 2 == 0){
        if (player.frameX<1){
            player.frameX++
        } else {
            player.frameX=0
        }
    }
    }

//asteroides
    const asteroidesArray = [];
        class asteroide {
            constructor(){
                this.x = 0 + Math.random()*canvas.width; // posição aleatória
                this.y = -200; //sempre são geradas por inteiro antes de aparecer
                this.width = 143;
                this.height = 102;
                this.frameX = parseInt((Math.random() * 4), 10);
                this.frameY = parseInt((Math.random() * 6), 10);
                this.speed = Math.random()*5+1; //velocidade aleatória entre 1 e 6
                this.escala = Math.random() * 1 + 1;
            }
            update(){
                this.y += this.speed; //move os asteróides pra cima no eixo y
            }
            draw(){
                ctx.fillStyle='blue';
                ctx.beginPath();
                ctx.arc(this.x, this.y, 50, 0, Math.PI*2);
                ctx.fill();
                ctx.closePath();
                ctx.stroke();
                //ctx.drawImage(asteroidesSprite, this.width*this.frameX, this.height*this.frameY, this.width, this.height, this.x, this.y, this.width*this.escala, this.height*this.escala)
               
            }
        }
      
// animacao asteroides
    function handleAsteroids(){
        if (gameframe % 45 == 0){
            asteroidesArray.push(new asteroide());
        }
        for (let i = 0; i<asteroidesArray.length; i++){
            asteroidesArray[i].update();
            asteroidesArray[i].draw();
            if (asteroidesArray[i].y > canvas.height + asteroidesArray[i].height){
                asteroidesArray.splice(i,1);
                i--;
            }
            
        }
    }
  
function colisao(){
    for (let i = 0; i<asteroidesArray.length; i++){
        if ( ((asteroidesArray[i].x + asteroidesArray[i].width) > player.x && asteroidesArray[i].x < (player.x + player.width)) && ((asteroidesArray[i].y + asteroidesArray[i].height) > player.y && asteroidesArray[i].y < (player.y + player.height)) ) {
            handleGameOver();           
        }    
    } 
}

function handleGameOver(){
    ctx.fillStyle = 'white';
    ctx.fillText('FIM DE JOGO, sua pontuação é de '+ score, canvas.width/2-100, canvas.height/2);
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
         
            //animação foguete
           // drawSprite(playerSprite, player.width*player.frameX, player.height*player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
            //movePlayer();
           // handlePlayerFrame();

            
            //animação asteroides
            handleAsteroids();

            colisao();
           
            pontuacao();

            ctx.fillStyle = 'white'
            ctx.fillText('Pontos: ' + score, 10, canvas.height-10)
            gameframe++;

            if (!gameOver) requestAnimationFrame(animate);
            
        }
        
    animate();


}


