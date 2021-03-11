var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana, bananaImg;
var obstacle,obstacleImg;
var bananaGroup,ObstaclesGroup;
var over,overImg;

var END =0;
var PLAY =1;
var gameState = PLAY;

var score;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
  overImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(700,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  over=createSprite(350,200);
  over.addImage(overImg);
  over.visible=false;
  
  bananaGroup=createGroup();
  ObstaclesGroup=createGroup();
  
  score=0;
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") && player.y>=150 ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;

    if(bananaGroup.isTouching(player))
    {
      bananaGroup.destroyEach();
      score=score+2;
    }
  
    player.collide(ground);
    spawnFood();
    spawnObstacle();
  }

  if(ObstaclesGroup.isTouching(player)){
    gameState=END;
  }

  if(gameState===END){
    backgr.velocityX=0;
    ObstaclesGroup.velocityX=0;
    bananaGroup.velocityX=0;
    player.y=320;

    over.visible=true;

    score = 0;

    player.scale = 0.1;
  }
  drawSprites();

  fill("white")
  textSize(20);
  stroke(500);
     
      switch(score)
      {          
        case 10: player.scale=0.13;
                 break;
                 
        case 20: player.scale=0.14;
                 break;
                 
        case 30: player.scale=0.15;
                 break;
                 
        case 40: player.scale=0.17;
                 break;
                 
        case 50: player.scale=0.18;
                 break;
                 
        case 60: player.scale=0.19;
                 break;
                 
        case 70: player.scale=0.22;
                 break;
                 
         default: break;
      }
      text("Score : "+score,450,100);
}

function spawnFood(){
  if(frameCount % 170 === 0){
    banana = createSprite(850,450);
    banana.addImage(bananaImg);
    banana.y=Math.round(random(50,250))
    banana.velocityX= -8;
    banana.scale=0.06;

    banana.lifetime = 250;
    bananaGroup.add(banana);
  }
}

function spawnObstacle()
{
      if(frameCount%170===0)
      {
            obstacle=createSprite(870,310);
            obstacle.addImage(obstacleImg);
            obstacle.scale=0.32
            obstacle.velocityX=-10;
            obstacle.lifetime=180;
        
            obstacle.setCollider("rectangle",0,0,400,350);
            obstacle.debug=false;
        
            ObstaclesGroup.add(obstacle);
      }
}