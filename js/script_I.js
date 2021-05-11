window.onload=function(){

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d'); 
    canvas.width=800;
    canvas.height=400;

    const keys = [] //guarda evento pressionar seta

    let backgroundY1=0;
    let backgroundY2= 792;
    let backgroundSpeed = 3;

//imagens
    const player = {
        x: 200,
        y: 300,
        width: 150,
        height: 75,
        frameX: 0,
        frameY: 0,
        speed: 9,
        moving: false
    };

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

    
//movimento

    window.addEventListener("keydown", function(e){
        keys[e.key] = true;
        keys[e.keyCode] = true;
        player.moving = true;
    });

    window.addEventListener("keyup", function(e){
        delete keys[e.key];
        delete keys[e.keyCode];
        player.moving=false
    })

    function movePlayer(){
        //acima
        if (keys[38] && player.y > 10){ 
            player.y -= player.speed; 
            player.frameY = 0;
            player.moving = true 
        }
        //esquerda
        if (keys[37] && player.x > 0){ 
            player.x -= player.speed; 
            player.frameY = 3; 
            player.moving = true
        }
        //abaixo
        if (keys[40] && player.y < canvas.height - player.height){ 
            player.y += player.speed; 
            player.frameY = 2; 
            player.moving = true
        }
        //direita
        if (keys[39] && player.x < canvas.width - player.height){ 
            player.x += player.speed; 
            player.frameY = 1; 
            player.moving = true
        }
    }


    //efeito foguete
    function handlePlayerFrame(){
        if (player.frameX<1 && player.moving == true){
            player.frameX++
        } else {
            player.frameX=0
        }
    }


    //asteroides
    const asteroidesArray = [];
        class asteroide {
            constructor(){
                this.x = 0 + Math.random()*canvas.width;
                this.y = 0;
                this.radius = 50;
                this.speed = Math.random()*5+1 //aleatório entre 1 e 6
                this.distance;
            }
            update(){
                this.y += this.speed;
            }
            draw(){
                ctx.fillstyle = 'blue';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
                ctx.stroke();
            }
        }


        //animacao asteroides
    function handleAsteroids(){
        asteroidesArray.push(new asteroide());
        if (fps % 3 == 0) {
        for (let i = 0; i<asteroidesArray.length; i++){
            asteroidesArray[i].update();
            asteroidesArray[i].draw();
            if (asteroidesArray[i].y > canvas.height){
                asteroidesArray.splice(i,1);
            }
        }
        }
    }


    //controle da velocidade do jogo
    let fps, fpsInterval, startTime, now, then, elapsed;

    function startAnimating(fps){
        fpsInterval = 1000/fps;
        then= Date.now();
        startTime = then;
        animate();
    }


    //rodar jogo_animações
    function animate(){
        requestAnimationFrame(animate);
        
        now = Date.now();
        elapsed = now - then;
        if (elapsed > fpsInterval){
            then = now - (elapsed % fpsInterval)
            
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
            drawSprite(playerSprite, player.width*player.frameX, player.height*player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
            movePlayer();
            handlePlayerFrame();

            //animação asteroides
            handleAsteroids();
            
        }
        
        
    }

    startAnimating(30);






}
