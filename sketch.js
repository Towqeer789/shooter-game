var player_img,player1,player2;

var enemy,enemy1,enemy2;

var score=0;

var bullet;

var background1;

var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver,reset;

function preload() {
    player_img = loadImage("images/player.png");
    player1 = loadImage("images/player1.png");
    player2 = loadImage("images/player2.png");
    enemy_img = loadImage("images/enemy.png");
    enemy1_img = loadImage("images/enemy1.png");
    enemy2_img = loadImage("images/enemy2.png");
    background_img = loadImage("images/bg.jpg");
    bullet_img = loadImage("images/bullet.png");
    gameOver_img = loadImage("images/game over.png");
    restart_img = loadImage("images/restart.png");
}

function setup(){
    createCanvas(1600,1000);

    background1 = createSprite(1000,50,1600,1000);
    background1.addImage("background",background_img);
    background1.velocityX= -2;
    background1.scale=9;
    background1.x = background1.width/2;

    player = createSprite(200,400,20,20);
    player.addImage("player",player_img);
    player.scale=0.5;
   
    enemyGroup = createGroup();
    enemy1Group = createGroup();
    enemy2Group = createGroup();
    bulletGroup = createGroup();
   
    gameOver = createSprite(600,400);
    restart = createSprite(800,400);
    gameOver.addImage("gameOver",gameOver_img);
    gameOver.scale = 0.5;
    restart.addImage("restart",restart_img);
    restart.scale = 0.5;
    gameOver.visible=false
    restart.visible=false;

}

function draw(){
    //background(background_img);
    //score = score + Math.round(getFrameRate()/60);
   if (gameState===PLAY){
    if(background1.x<0){
        background1.x=background1.width/2;
    }
     
     if(keyDown("space")) {
        createBullet();
     }

    if(keyDown(RIGHT_ARROW)){
        player.x=player.x+5;
    }

    if(keyDown(LEFT_ARROW)){
        player.x=player.x-5;
    }
    var select_enemy =Math.round(random(1,3));
    console.log(select_enemy);

    if (World.frameCount % 100 === 0) {
      if (select_enemy === 1) {
        createEnemy();
      } else if (select_enemy === 2) {
        createEnemy1();
      } else {
        createEnemy2();
      } 
      
    }
     
    if (enemyGroup.isTouching(bulletGroup)) {
        enemyGroup.destroyEach();
        bulletGroup.destroyEach();
        score = score + 1;
    }

    if (enemy1Group.isTouching(bulletGroup)) {
        enemy1Group.destroyEach();
        bulletGroup.destroyEach();
        score = score + 1;
    }

    if (enemy2Group.isTouching(bulletGroup)) {
        enemy2Group.destroyEach();
        bulletGroup.destroyEach();
        score = score + 1;
    }
    
    if (player.isTouching(enemyGroup) || player.isTouching(enemy1Group) || player.isTouching(enemy2Group)) {
    gameState=END;
  }
}else if(gameState===END){
  gameOver.visible=true;
  restart.visible=true;
  enemyGroup.destroyEach();
  enemy1Group.destroyEach();
  enemy2Group.destroyEach();
  bulletGroup.destroyEach();
  player.destroy();
  background1.velocityX=0;
}
   if(mousePressedOver(restart)){
     reset();
   }
    drawSprites();
    fill("red");
    text(" SCORE: "+ score,1200,150);


function reset(){
 score=0;
 gameState=PLAY;
 player.visible=true;
 gameOver.visible=false;
 restart.visible=false;
}

}
function createEnemy() {
    var enemy =  createSprite(random(500, 1600), 400, 10, 10);
    enemy.addImage("enemy",enemy2_img);
    enemy.scale=0.5;
    enemy.velocityX=-6;
    enemy.lifetime = 1000;
    enemyGroup.add(enemy);
  }

function createEnemy1() {
    var enemy1 =  createSprite(random(500, 1600), 400, 10, 10);
    enemy1.addImage("enemy1",enemy_img);
    enemy1.scale=0.5;
    enemy1.velocityX=-6;
    enemy1.lifetime = 1000;
    enemy1Group.add(enemy1);
  }

  function createEnemy2() {
    var enemy2 =  createSprite(random(500, 1600), 400, 10, 10);
    enemy2.addImage("enemy2",enemy1_img);
    enemy2.scale=0.5;
    enemy2.velocityX=-6;
    enemy2.lifetime = 1000;
    enemy2Group.add(enemy2);
  } 
  
  function createBullet() {
   
    bullet = createSprite(245,380,20,20);
    bullet.addImage("bullet",bullet_img);
    bullet.scale=0.05;
    bullet.x=player.x+40;
    bullet.velocityX = 16;
    bulletGroup.add(bullet);
  }
  
  
  
    
   