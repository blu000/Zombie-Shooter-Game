var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieGroup;
var edges;
var score = 0;
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombiePNG=loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  bulletImg=loadImage("assets/bullet.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
zombieGroup=new Group()
bulletGroup=new Group()
//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


}

function draw() {
  background(0); 

function kill(bullet,zombie){
  zombie.remove()
  score = score +1
}

bulletGroup.bounceOff(zombieGroup,kill)

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 spawnBullet()
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
edges=createEdgeSprites();
// console.log(zombieGroup)
// for(var i=0;i<zombieGroup.length;i++){
//   zombieGroup[i],bounceOff(edges)
// }
spawnZomb();console.log(edges)
//zombieGroup.bounceOff(edges[0]);
zombieGroup.bounceOff(edges[1]);
zombieGroup.bounceOff(edges[2]);  
zombieGroup.bounceOff(edges[3]);
drawSprites();
textSize(24)
fill('white')
text('score:'+score,width-200,50)

}


function spawnZomb(){
  if(frameCount%100==0){
    var zombie=createSprite(random(width/2,width-50),random(150,height),10,100);
    zombie.addImage(zombiePNG)
    zombie.velocityX=random(-4,4);
    zombie.velocityY=random(-4,4);
    zombieGroup.add(zombie)
    zombie.bounceOff(edges)
    zombie.scale=0.2
  }
}

function spawnBullet(){
  var bullet=createSprite(player.x,player.y);
    bullet.addImage(bulletImg)
    bullet.velocityX=random(2,6);
    //zombie.velocityY=random(-4,4);
    bulletGroup.add(bullet)
    
    bullet.scale=0.2
}
