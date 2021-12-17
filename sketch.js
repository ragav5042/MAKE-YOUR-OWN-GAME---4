var boy
var life=300
var heart=[]
var PLAY=1
var END=0
var gameState = PLAY;
// var ground
function preload(){
  runningAni=loadAnimation("leg1.png","leg2.png","leg3.png","leg4.png","leg5.png","leg6.png","leg7.png","leg8.png")
  bgImage=loadImage("bluebg.jpeg")
  groundImg=loadImage("ground.png")
  sunImg=loadImage("sun.png")
  hurdleImg=loadImage("hurdle1.png")
  heartImg=loadImage("heart_1.png")
  gameOverImg=loadImage("gameOver.png")
  restartImg=loadImage("restart.png")
}


function setup() {

  createCanvas(800,400);
  ground=createSprite(400,360,50,50)
  ground.addImage("grou",groundImg)
  ground.scale=0.5
  ground.velocityX=-8


   boy= createSprite(100,300, 50, 50);
 boy.addAnimation("running",runningAni)
 boy.scale=0.9

boy.setCollider("rectangle",0,0,100,200)

heart1=createSprite(65,50,50,50)
heart1.addImage("heart",heartImg)
heart1.scale=0.3

heart2=createSprite(125,50,50,50)
heart2.addImage("heart",heartImg)
heart2.scale=0.3

heart3=createSprite(185,50,50,50)
heart3.addImage("heart",heartImg)
heart3.scale=0.3
// heart=[heart1,heart2,heart3]
sun=createSprite(700,80,20,20)
sun.addImage("suni",sunImg)
sun.scale=0.3

 gameOver=createSprite(400,175,50,50)
 gameOver.addImage("game",gameOverImg)


 gameOver.visible=false

 invisibleGround=createSprite(400,370,800,5)
 invisibleGround.visible=false

 hurdlesGroup= new Group()

}

function draw() {
  background(bgImage);  
  boy.collide(invisibleGround)
  
  if(ground.x<170){
    ground.x=400
  }
if(gameState==PLAY){
  if(keyDown("space")){
    boy.velocityY-=6
  }
  boy.velocityY+=1
  if(life===300){
    heart1.visible = true
    heart2.visible = true
    heart3.visible = true
    ground.velocityX=-9
   
  }
  if(life===200){
    heart1.visible = false
    heart2.visible = true
    heart3.visible = true
    ground.velocityX=-10
  }
  if(life===100){
    heart3.visible = true
    heart2.visible = false
    heart1.visible = false
    ground.velocityX=-11
  }
  if(life===0){
    heart1.visible = false
    heart3.visible = false
    heart2.visible = false
   gameState=END
    
  }
  spawnHurdles()
  if(hurdlesGroup.isTouching(boy)){
    for(var i=0;i<hurdlesGroup.length;i++){     
      
      if(hurdlesGroup[i].isTouching(boy)){
           hurdlesGroup[i].destroy()
    //Decrease the life
    life-=100 
           } 
     
     }
    }
}
drawSprites();
if(gameState===END){
gameOver.visible=true
// restart.visible=true
ground.velocityX=0
hurdlesGroup.destroyEach()
boy.visible=false
if(keyDown(UP_ARROW)){
  gameState=PLAY
  hurdlesGroup.destroyEach()
  gameOver.visible=false
  life=300
  boy.visible=true
}
textSize(32)
fill("red")
text("Press Up Arrow to reset the Game",175,250)
}
 
  
  fill("red")
  textSize(32)
  text("Life "+life,75,100)
}

function spawnHurdles(){
  if(frameCount % 130===0){
   var hurdle=createSprite(width-100,340,25,25)
    hurdle.addImage("hud",hurdleImg)
    hurdle.scale=0.2
    hurdle.velocityX=-4
hurdle.lifetime= 200

hurdle.setCollider("rectangle",0,0,300,200)
    hurdlesGroup.add(hurdle)
  }
 
}

