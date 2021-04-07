var PLAY = 1;
var END = 0;
var gameState = PLAY;
var backGround,invisibleGround,backgroundImage; 
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var monkey , monkeyRunning;
var score = 0,survivalTime = 0;
var jump,die,eat;
var restart,restartImage,gameOver,gameOverImage;

function preload(){

monkeyRunning =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

monkeyCollide = loadAnimation("sprite_3.png")

backgroundImage = loadImage("background.jpg")

obstacleImage = loadImage("obstacle.png");

bananaImage = loadImage("banana.png");

jump = loadSound("jump sound.mp3");
  
die = loadSound("die sound.mp3")

eat = loadSound("eat sound.mp3")

restartImage = loadImage("Restart.jpg")

gameOverImage = loadImage("gameover.jpg")
}

function setup() {
createCanvas(500,500)

backGround = createSprite(225,225,450,450);
backGround.addImage("ground",backgroundImage);
backGround.scale = 1;
backGround.velocityX = -6;
backGround.x = backGround.width /2;

monkey = createSprite(85,395,30,50);
monkey.addAnimation("running",monkeyRunning) 
monkey.scale = 0.3 ;

invisibleGround = createSprite(250,480,500,10);
invisibleGround.visible = true;  

bananaGroup = new Group();
obstacleGroup = new Group();


monkey.setCollider("circle",0,0,300);
 monkey.debug = true;

gameOver = createSprite(250,180);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(250,333);
  restart.addImage(restartImage);
  
 gameOver.scale = 0.4;
restart.scale = 0.3;

score = 0;
survivalTime = 0
}

function draw() {


if (gameState === PLAY){
Banana()    
Obstacle()    
gameOver.visible = false;
restart.visible = false;
if(keyDown("space") && monkey.y > 325){
  jump.play();
  monkey.velocityY = -20;
      } 
monkey.velocityY = monkey.velocityY + 0.8
monkey.collide(invisibleGround)

if (backGround.x < 0) {
    backGround.x = backGround.width / 2;
}
obstacleGroup.setLifetimeEach(-1);
bananaGroup.setLifetimeEach(-1);

if (obstacleGroup.isTouching(monkey)) {
obstacleGroup.destroyEach();
die.play();

gameState = END;
}

  if (bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    eat.play();
    score = score + 1;
  }
}
else if (gameState === END){
   monkey.velocityX = 0; 
   backGround.velocityX = 0;
   bananaGroup.velocityX = 0;
   obstacle.velocityX = 0;         monkey.changeAnimation("monkeyCollide",monkeyCollide)
gameOver.visible = true;
restart.visible = true;
if(mousePressedOver(restart)) {
      reset();
    }
}
drawSprites();
stroke("black")
textSize(20)
fill("white");
text("Score: "+ score, 422,20);
  
stroke("black")
textSize(20)
fill("white");
survivalTime = survivalTime+Math.round(getFrameRate()/60);
text("Survival Time: "+ survivalTime, 10,20);

}

function Banana() {
 if (World.frameCount % 80 === 0) {
    banana = createSprite(500, random(90, 200), 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -8;
    banana.lifetime = 64;
    bananaGroup.add(banana);
  } 
}

function Obstacle(){
if (frameCount % 300 === 0) {
    obstacle = createSprite(500, 436, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.3;
    obstacle.velocityX = -8;
    obstacle.lifetime = 64;
    obstacleGroup.add(obstacle);
  }
}
function reset(){
gameState = PLAY;
gameOver.visible = false;
restart.visible = false;
bananaGroup.destroyEach()
obstacleGroup.destroyEach()
score = 0;
survivalTime = 0;
monkey.changeAnimation("running", monkeyRunning);
}