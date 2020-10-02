
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup
var score=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){  
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup(){
  createCanvas(600,300);
  
  
  monkey = createSprite(80,20,20,50);
  monkey.addAnimation("running", monkey_running);
  edges = createEdgeSprites();
  
  //adding scale and position to monkey
  monkey.scale = 0.1;
 monkey.x = 50
  
  ground = createSprite(200,280,800,20);
  ground.x=ground.width/2;
  
  ground.velocityX=-4;
  //logging the y position of the monkey
  console.log(ground.x);
  
  
 bananaGroup = new Group();
  obstacleGroup = new Group();
  
  
}



function draw(){
  
  //set background color 
 background("skyblue");
  fill("black");
  text("SURVIVAL TIME: "+score, 470, 20);

  
 
  //stop monkey from falling down
  monkey.collide(ground);
  
  
   
   bananas();
  obstacles();
  
  if(gameState===PLAY){
    
    score = score + Math.round(getFrameRate()/60);
    
      
    //jump when space key is pressed
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
   monkey.velocityY = monkey.velocityY + 0.8
    
   
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  
   if (monkey.isTouching(obstacleGroup)){
     gameState=END;
    
    }

    
  }
  drawSprites();
if (gameState===END){
    ground.velocityX = 0;
     monkey.velocityY = 0;
    monkey.velocityX = 0;
      
     obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
   bananaGroup.setLifetimeEach(-1);
   bananaGroup.destroyEach() ;
    obstacleGroup.destroyEach();
    
  }
  
  
 
}


function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-4;           
    banana.lifetime = 220;
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = banana.depth + 1;
    bananaGroup.add(banana); 
  }
}


function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(600,250,50,50);
   obstacle.addImage("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -4;
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}














