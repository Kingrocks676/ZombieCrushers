//player stuff
var player;
var playerImg;
var playerWalkAnimationR,playerWalkAnimationL;
var playerRunAnimationR,playerRunAnimationL;
var hurtAnimation;
//stats
var stamina = 100;
var health = 100;
var healthbar,healthbaroutline;

var gamestate = "play";

//hitboxes
var hitboxUp,hitboxDown,hitboxRight,hitboxLeft,hitboxGroup;

//zombie
var zombieImg;
var zombieWalkR,zombieWalkL;
var zombieDead;
var a,b;
//background
var bg;

var mute = "no";

//zombies stuff
waveNumber = 0;
var zombie,zombie2,zombie3,zombie4;
var zombieGroup,zombie2Group,zombie3Group,zombie4Group;

//weapons
var pistol,pistolImg;
var bullet,bulletImg,bulletGroup;
var pistolBcount = 7;
var totalPistolAmmo = 7;
var rifle,rifleImg;
var rifleBcount = 40;
var totalRifleAmmo = 40;
var shotgun,shotgunImg;
var shotgunBcount = 9;
var totalShotgunAmmo = 9;

var weaponState = "pistol";

var ammoCounter;

var i1,i2,i3,i4,i5;
var i1b,i2b,i3b,i4b,i5b;
var inventory;

//powerups
var coin,coinImg,coins = 0;
var coinGroup;
var energyImg,energy,drink = 0;
var energyGroup;
var medical,medicalKitImg,kits = 0;
var medicalKitGroup;

//shop
var shop,shopImg;
var shopOpenButton;
var shop_quit,shop_quitImg;

//gameover things & reset
var gameOverb,resetb;
var gameOverImg,resetImg;

//check
var rb = 0;
var sb = 0;
var mb = 0;
var db = 0;
//muteButton
var muteButton,muteImg,unmuteImg;
//waves
var waveState = 1;
var count=1;
function preload()
{
  playerImg = loadAnimation("./assets/Player/Woodcutter.png");

  playerWalkAnimationR = loadAnimation(
    "assets/Player/walk/walk-1.png", 
    "assets/Player/walk/walk-2.png", 
    "assets/Player/walk/walk-3.png",
    "assets/Player/walk/walk-4.png",
    "assets/Player/walk/walk-5.png");

  playerWalkAnimationL = loadAnimation(
  "assets/Player/walk/walk-6.png", 
  "assets/Player/walk/walk-7.png", 
  "assets/Player/walk/walk-8.png",
  "assets/Player/walk/walk-9.png",
  "assets/Player/walk/walk-10.png");

  playerRunAnimationR = loadAnimation(
    "assets/Player/run/run-1.png",
    "assets/Player/run/run-2.png",
    "assets/Player/run/run-3.png",
    "assets/Player/run/run-4.png",
    "assets/Player/run/run-5.png",
    "assets/Player/run/run-6.png",
  );
  playerRunAnimationL = loadAnimation(
    "assets/Player/run/run-7.png",
    "assets/Player/run/run-8.png",
    "assets/Player/run/run-9.png",
    "assets/Player/run/run-10.png",
    "assets/Player/run/run-11.png",
    "assets/Player/run/run-12.png"
  );

  hurtAnimation = loadAnimation(
    "assets/Player/hurt/hurt1.png",
    "assets/Player/hurt/hurt2.png",
    "assets/Player/hurt/hurt3.png"
  );

  coinAnim = loadAnimation(
    "assets/powerups/coin1.png",
    "assets/powerups/coin2.png",
    "assets/powerups/coin3.png",
    "assets/powerups/coin4.png",
    "assets/powerups/coin5.png"
  );
  secretButtonImg = loadImage("assets/secret.png");
  bg = loadImage("assets/city.jpg");

  wonImg=loadImage("assets/won.png");

  pistolImg = loadImage("assets/weapons/pistol.png");
  rifleImg = loadImage("assets/weapons/rifle.png");
  bulletImg = loadImage("assets/weapons/Bullet.png");
  shotgunImg = loadImage("assets/weapons/shotgun.png");

  gameOverImg = loadImage("assets/gameover.png");
  resetImg = loadImage("assets/reset.png");
  //zombie animations
    zombieImg = loadImage("assets/Zombies/idle.png");

  //powerups
  energyImg = loadImage("assets/powerups/energydrink.png");
  medicalKitImg = loadImage("assets/powerups/medicalkit.png");
  coinImg = loadImage("assets/powerups/coin.png");

  shopOpenButtonImg = loadImage("assets/shopButton.png");
  shopImg = loadImage("assets/ShopImg.png");
  shop_quitImg = loadImage("assets/shop_quitImg.png");

  buyImg = loadImage("assets/buy.png");

  pistolSound = loadSound("assets/sounds/pistol.mp3");
  rifleSound = loadSound("assets/sounds/rifle.mp3");
  shotgunSound = loadSound("assets/sounds/shotgun.mp3");
  hurtSound = loadSound("assets/sounds/hurt.wav");
  coinSounds = loadSound("assets/sounds/coin.wav");
  backgroundSounds = loadSound("assets/sounds/background.mp3");
  buySound = loadSound("assets/sounds/achievment.mp3");

  muteAnimation = loadAnimation("assets/muted.png");
  unmuteAnimation = loadAnimation("assets/unmuted.png");

  quitImg=loadImage("assets/quit.png");
}

function setup() 
{
  backgroundSounds.setVolume(0.30);
  createCanvas(windowWidth, windowHeight);
  
  player = createSprite(windowWidth/2, windowHeight/2,50,50);
  player.addAnimation('idle',playerImg);
  player.addAnimation('walkingR',playerWalkAnimationR);
  player.addAnimation('walkingL',playerWalkAnimationL);
  player.addAnimation('runR',playerRunAnimationR);
  player.addAnimation('runL',playerRunAnimationL);
  player.addAnimation('hurt',hurtAnimation);
  player.scale = 2;

  quit=createSprite(100,250);
  quit.addImage(quitImg);
  quit.scale=0.125;
  //pistol
  pistol = createSprite(player.x + 20,player.y);
  pistol.addImage(pistolImg);
  pistol.scale = 1.35;

  won = createSprite(windowWidth/2, windowHeight/2);
  won.addImage(wonImg);
  won.scale = .15;
  won.visible =false;
  //rifle
  rifle = createSprite(player.x + 40,player.y+10);
  rifle.addImage(rifleImg);
  rifle.scale = 1;

  //shotgun
  shotgun = createSprite(player.x+20,player.y+10);
  shotgun.addImage(shotgunImg);
  shotgun.scale = 1;

  //hitbox
  hitboxUp = createSprite(player.x, player.y ,100,500);
  hitboxDown = createSprite(player.x, player.y,100,500);
  hitboxRight = createSprite(player.x, player.y,750,100);
  hitboxLeft = createSprite(player.x, player.y,750,100);
  hitboxLeft.visible = false;
  hitboxRight.visible = false;
  hitboxUp.visible = false;
  hitboxDown.visible = false;
  hitboxGroup = new Group;
  hitboxGroup.add(hitboxUp);
  hitboxGroup.add(hitboxDown);
  hitboxGroup.add(hitboxRight);
  hitboxGroup.add(hitboxLeft);

  zombieGroup = new Group;
  zombie2Group = new Group;
  zombie3Group = new Group;
  zombie4Group = new Group;
  bulletGroup = new Group;

  coinGroup = new Group;
  medicalKitGroup = new Group;
  energyGroup = new Group;

  healthbaroutline = createSprite(1300,50,310,35);
  healthbaroutline.shapeColor = 'black';
  healthbar = createSprite(1300,50,300,30);
  healthbar.shapeColor = "maroon";

  staminabaroutline = createSprite(1300,100,310,35);
  staminabaroutline.shapeColor = 'black';
  staminabar = createSprite(1300,100,300,30);
  staminabar.shapeColor = "gold";

  ammoCounter = createSprite(1400,650);
  ammoCounter.addImage(bulletImg);
  ammoCounter.pointTo(1400,550);

  inventory = createSprite(500,650,60,60);
  inventory.shapeColor = "gold";

  i1b = createSprite(500,650,50,50);
  i1b.shapeColor = 'black';

  i2b = createSprite(600,650,50,50);
  i2b.shapeColor = 'black';

  i3b = createSprite(700,650,50,50);
  i3b.shapeColor = 'black';

  i4b = createSprite(800,650,50,50);
  i4b.shapeColor = 'black';

  i5b = createSprite(900,650,50,50);
  i5b.shapeColor = 'black';

  i1 = createSprite(500,650,50,50);
  i1.addImage(pistolImg);

  i2 = createSprite(615,650,50,50);
  i2.addImage(rifleImg);
  i2.scale = 0.6;

  i3 = createSprite(700,650,50,50);
  i3.addImage(shotgunImg);
  i3.scale = 0.6;

  i4 = createSprite(800,650,50,50);
  i4.addImage(energyImg);
  i4.scale = 0.5;

  i5 = createSprite(900,650,50,50);
  i5.addImage(medicalKitImg);
  i5.scale = 0.5;

  i2.visible = false;
  i3.visible = false;

  shopOpenButton = createSprite(1000,650,50,50);
  shopOpenButton.addImage(shopOpenButtonImg);
  shopOpenButton.scale = 0.08;

  shop = createSprite(700,350,50,50);
  shop.addImage(shopImg);
  shop.scale = 0.7;
  shop.visible = false;

  shop_quit = createSprite(825,190,50,50);
  shop_quit.addImage(shop_quitImg);
  shop_quit.scale = 0.45;
  shop_quit.visible = false;

  rifleBuyButton = createSprite(shop.x+110,shop.y-40);
  rifleBuyButton.addImage(buyImg);
  rifleBuyButton.scale = 0.9;
  rifleBuyButton.visible = false;

    shotgunBuyButton = createSprite(shop.x+110,shop.y+100);
    shotgunBuyButton.addImage(buyImg);
    shotgunBuyButton.scale = 0.9;
    shotgunBuyButton.visible = false;
  

  gameOverb = createSprite(windowWidth/2, windowHeight/2);
  gameOverb.addImage(gameOverImg);
  gameOverb.visible = false;

  resetb = createSprite(gameOverb.x+175,gameOverb.y+75);
  resetb.addImage(resetImg);
  resetb.visible= false;

  secretButton = createSprite(100,700);
  secretButton.addImage(secretButtonImg);
  secretButton.scale = 0.75;

  muteButton = createSprite(75,30,50,50);
  muteButton.addAnimation('mute',muteAnimation);
  muteButton.addAnimation('unmute',unmuteAnimation);
  muteButton.scale = 0.035;
}

function draw() 
{
  background(bg);
  fill("white");
  textSize(32);
  text("1",490,710);
  text("2",590,710);
  text("3",690,710);
  text("4",790,710);
  text("5",890,710);
  //texts
  fill("white");
  textSize(32);
  text("Health: ",1020,60);
  text("Stamina: ",1000,110);
  text("Drink: "+drink,50,100);
  text("Medical: "+kits,50,150);
  text("Coins: "+coins,50,200);
  if(mousePressedOver(secretButton))
  {
    rickroll();
  }
  if(mousePressedOver(rifleBuyButton) && gamestate === "shop")
  {
    if(coins>=300)
    {
      if(rb==0)
      {
        coins-=600;
        rb=1;
        weaponState === "rifle";
        i2.visible= true;
      }
    }
  }
  if(mousePressedOver(shotgunBuyButton) && gamestate === "shop")
  {
    if(coins>=100)
    {
      if(sb==0)
      {
        coins-=300;
        sb=1;
        weaponState === "rifle";
        i3.visible= true;
      }
    }
  }
  if(mousePressedOver(muteButton) && mute === "no")
  {
    mute = "yes";
    muteButton.changeAnimation('unmute');
  }
  else if(mousePressedOver(muteButton)&&mute === "yes")
  {
    mute = "no";
    muteButton.changeAnimation('mute');
  }

  if (gamestate === "play")
  {

if(waveState === 1)
{
  if(frameCount%50=== 0)
  {
    spawnZombie2();
    count+= 1;
  }
}
if(count===30)
{
  waveState = 2;
}
if(waveState===2)
{
  if(frameCount%50=== 0)
  {
    spawnZombie2();
  }
  if(frameCount%60=== 0)
  {
    spawnZombie();
    count+=1;
  }
}
if(count===60)
{
  waveState=3;
}
if(waveState===3)
{
  if(frameCount%25 === 0)
  {
    spawnZombie2();
  }
  if(frameCount%30===0)
  {
    spawnZombie();
    count+=2;
  }
}
if(count===100)
{
wavestate=4;
}
if(waveState===4)
{
  if(frameCount%25 === 0)
  {
    spawnZombie2();
  }
  if(frameCount%30===0)
  {
    spawnZombie();
  }
  if(frameCount%50 === 0)
  {
    spawnZombie3();
    count+=1;
  }
}
if(count===125)
{
  waveState=5;
}
if(waveState===5)
{
  if(frameCount%25 === 0)
  {
    spawnZombie2();
  }
  if(frameCount%30===0)
  {
    spawnZombie();
  }
  if(frameCount%50 === 0)
  {
    spawnZombie3();
  }
  if(frameCount%55 === 0)
  {
    spawnZombie4();
    count+=1;
  }
}
if(count===145)
{
  gamestate==="won";
}

  if (keyWentUp("1"))
  {
    weaponState = "pistol";
    inventory.x = 500;
    inventory.y = 650;
  }

  if (keyWentUp("2") && rb === 1)
  {
    weaponState = "rifle";
    inventory.x = 600;
    inventory.y = 650;
  }
  
  if (keyWentUp("3")&&sb==1)
  {
    weaponState = "shotgun";
    inventory.x = 700;
    inventory.y = 650;
  }
  
  if (keyWentUp("4"))
  {
    inventory.x = 800;
    inventory.y = 650;
    if (drink> 0 && stamina < 100)
    {
      drink -= 1;
      staminabar.width = 300;
      staminabar.x = 1300;
      staminabar.y = 100;
      stamina = 100;
    }
  }
  
  if (keyWentUp("5"))
  {
    inventory.x = 900;
    inventory.y = 650;
    if (kits > 0 && health < 100)
    {
      kits -= 1;
      healthbar.width = 300;
      healthbar.x = 1300;
      healthbar.y = 50;
    }
  }



  if (weaponState === "pistol")
  {
    text("Ammo: "+ pistolBcount+"/"+totalPistolAmmo,1200,675);
    pistol.visible = true;
    rifle.visible = false;
    shotgun.visible = false;
  }
  if (weaponState === "rifle")
  {
    rifle.visible = true;
    pistol.visible = false;
    shotgun.visible = false;
    text("Ammo: "+ rifleBcount+"/"+totalRifleAmmo,1200,675);
  }

  if (weaponState === "shotgun")
  {
    shotgun.visible = true;
    rifle.visible = false;
    pistol.visible = false;
    text("Ammo: "+ shotgunBcount+"/"+totalShotgunAmmo,1200,675);
  }

  hitboxUp.x = player.x;
  hitboxUp.y = player.y - 300;
  hitboxDown.x = player.x;
  hitboxDown.y = player.y + 300;
  hitboxRight.x = player.x + 450;
  hitboxRight.y = player.y;
  hitboxLeft.x = player.x - 450;
  hitboxLeft.y = player.y;
  pistol.x = player.x + 20;
  pistol.y = player.y;
  pistol.pointTo(mouseX,mouseY);
  rifle.x = player.x+30;
  rifle.y = player.y+10;
  rifle.pointTo(mouseX,mouseY);
  shotgun.x = player.x+20;
  shotgun.y = player.y+10;
  shotgun.pointTo(mouseX,mouseY);


  if (!keyDown("W") || !keyDown("S") || !keyDown("A") || !keyDown("D") || !keyDown("SHIFT"))
  {
    player.changeAnimation('idle');
  }

  //player controls
  if (keyDown("W") || keyDown("UP_ARROW"))
  {
    player.changeAnimation('walkingR');
    player.y -= 5.25;
    if (keyDown("SHIFT") && stamina > 0)
    {
      player.changeAnimation('runR');
      player.y -= 6;
      stamina -= 1.5;
      staminabar.width -= 4.5;
      staminabar.x -= 2.25;
    }
  }
  if (keyDown("S") || keyDown("DOWN_ARROW"))
  {
    player.changeAnimation('walkingR');
    player.y += 5.25;
    if (keyDown("SHIFT") && stamina > 0)
    {
      player.changeAnimation('runR');
      player.y += 6;
      stamina -= 1.5;
      staminabar.width -= 4.5;
      staminabar.x -= 2.25;
    }
  }

  if (keyDown("A") || keyDown("LEFT_ARROW"))
  {
    player.changeAnimation('walkingL');
    player.x -= 5.25;
    if (keyDown("SHIFT") && stamina > 0)
    {
      player.changeAnimation('runL');
      player.x -= 6;
      stamina -= 1.5;
      staminabar.width -= 4.5;
      staminabar.x -= 2.25;
    }
  }
  if (keyDown("D") || keyDown("RIGHT_ARROW"))
  {
    player.changeAnimation('walkingR');
    player.x += 5.25;
    if (keyDown("SHIFT") && stamina > 0)
    {
      player.changeAnimation('runR');
      player.x += 6;
      stamina -= 1.5;
      staminabar.width -= 4.5;
      staminabar.x -= 2.25;
    }
  }


  if (!keyDown("SHIFT") && stamina <= 100 && staminabar.width <= 300)
  {
    stamina += 0.5;
    staminabar.width += 1.5;
    staminabar.x += 0.75;
  }

  if (player.x <=20)
  {
    player.x = 20;
  }
  if (player.x > 1500)
  {
    player.x = 1500;
  }
  if (player.y < 200)
  {
    player.y = 200;
  }
  if (player.y > 550)
  {
    player.y = 550;
  }

  if (health > 0)
  {
    if (player.isTouching(zombieGroup)  || player.isTouching(zombie2Group)|| player.isTouching(zombie3Group) || player.isTouching(zombie4Group))
    {
      player.changeAnimation('hurt');
      if (frameCount % 10 === 0)
      {
        hit();
        if(mute === "no")
        {
        hurtSound.play();
      }}
    }
  }

  if (health === 0)
  {
    gamestate = "over";
  }
  if (health <= 0)
  {
    console.log("ur ded lol");
    healthbar.visible = false;
  }
  if (stamina <= 0)
  {
    staminabar.visible = false;
  }
  if (stamina >= 0)
  {
    staminabar.visible = true;
  }

  if (mousePressedOver(hitboxUp))
  {
    if (frameCount % 4 === 0 && weaponState === "pistol" && pistolBcount > 0)
    {
      shootUp();
      if(mute === "no"){
      pistolSound.play();
      }
    }
    
    if (frameCount % 2 === 0 && weaponState === "rifle" && rifleBcount > 0)
    {
      shootUp();
      if(mute === "no"){
      rifleSound.play();
      }
    }
    if (frameCount % 5 === 0 && weaponState === "shotgun" && shotgunBcount > 0)
    {
      shootUp();
      if(mute === "no"){
      shotgunSound.play();
      }
    }
  }
  if (mousePressedOver(hitboxDown))
  {
    if (frameCount % 4 === 0 && weaponState === "pistol" && pistolBcount > 0)
    {
      if(mute === "no"){
      pistolSound.play();
      }
      shootDown();
    }
    
    if (frameCount % 2 === 0 && weaponState === "rifle" && rifleBcount > 0)
    {
      shootDown();
      if(mute === "no"){
      rifleSound.play();
      }
    }

    if (frameCount % 5 === 0 && weaponState === "shotgun" && shotgunBcount > 0)
    {
      shootDown();
      if(mute === "no"){
      shotgunSound.play();
      }
    }
  }
  if (mousePressedOver(hitboxLeft))
  {
    if (frameCount % 4 === 0 && weaponState === "pistol" && pistolBcount > 0)
    {
      shootLeft();
      if(mute === "no"){
      pistolSound.play();}
    }
    
    if (frameCount % 2 === 0 && weaponState === "rifle" && rifleBcount > 0)
    {
      shootLeft();
      if(mute === "no"){
      rifleSound.play();
      }
    }
    if (frameCount % 5 === 0 && weaponState === "shotgun" && shotgunBcount > 0)
    {
      shootLeft();
      if(mute === "no"){
      shotgunSound.play();
      }
    }
  }
  if (mousePressedOver(hitboxRight))
  {
    if (frameCount % 4 === 0 && weaponState === "pistol" && pistolBcount > 0)
    {
      shootRight();
      if(mute === "no"){
      pistolSound.play();
      }
    }
    
    if (frameCount % 2 === 0 && weaponState === "rifle" && rifleBcount > 0)
    {
      shootRight();
      if(mute === "no"){
      rifleSound.play();
      }
    }
    if (frameCount % 5 === 0 && weaponState === "shotgun" && shotgunBcount > 0)
    {
      shootRight();
      if(mute === "no"){
      shotgunSound.play();
      }
    }
  }

  if (bulletGroup.isTouching(zombieGroup))
  {
    for (var i = 0; i < zombieGroup.length;i++)
    {
      zombieGroup[i].destroy();
      bullet.destroy();
      coins+=10;
    }
  }

  if (bulletGroup.isTouching(zombie2Group))
  {
    for (var j = 0; j < zombie2Group.length;j++)
    {
      zombie2Group[j].destroy();
      bullet.destroy();
      coins+=10;
    }
  }

  
  if (bulletGroup.isTouching(zombie3Group))
  {
    for (var a = 0; a < zombie3Group.length;a++)
    {
      zombie3Group[a].destroy();
      bullet.destroy();
      coins+=10;
    }
  }

  
  if (bulletGroup.isTouching(zombie4Group))
  {
    for (var b = 0; b < zombie4Group.length;b++)
    {
      zombie4Group[b].destroy();
      bullet.destroy();
      coins+=10;
    }
  }
  if (keyDown("R"))
  {
    reload();
  }

  if (frameCount % 500 === 0)
  {
    energydrink();
  }
  if (frameCount % 700 === 0)
  {
    medicalKit();
  }

  if (frameCount % 200 === 0)
  {
    SpawnCoins();
  }

  if(mousePressedOver(quit))
  {
    menu();
  }
  if (player.isTouching(energyGroup))
  {
    energy.destroy();
    drink += 1;
    if(mute === "no"){
    coinSounds.play();
    }
  }
  if (player.isTouching(medicalKitGroup))
  {
    medical.destroy();
    kits += 1;
    if(mute === "no"){
    coinSounds.play();
    }
  }
}
if(mute === "no"){
if(frameCount%100=== 0)
{
  backgroundSounds.play();
}
}
if(mute === "yes")
{
  backgroundSounds.stop();
}
if (mousePressedOver(shopOpenButton))
{
  gamestate = "shop";
  shop.visible = true;
  shop_quit.visible = true;
  rifleBuyButton.visible = true;
  shotgunBuyButton.visible = true;
}
if (mousePressedOver(shop_quit))
{
  gamestate = "play";
  shop.visible = false;
  shop_quit.visible = false;
  rifleBuyButton.visible = false;
  shotgunBuyButton.visible = false;


}
if (gamestate === "over")
{
  gameOver();
}

if (player.isTouching(coinGroup))
{
  coinGroup.destroyEach();
  coins += 10;
  if(mute === "no"){
  coinSounds.play();
  }

}
if(mousePressedOver(resetb) && gamestate === "over")
{
  location.reload();
}
if(gamestate==="won")
{
  zombieGroup.destroyEach();
  player.destroy();
  won.visible=true;
  resetb.visible =true;
  quit.visible =true;
}
  drawSprites();
}

function hit()
{
  health -= 10;
  healthbar.width -= 30;
  healthbar.x -= 15;
}
function shootUp()
{
  if (weaponState === "pistol")
  {
    bullet = createSprite(pistol.x - 10,pistol.y - 20);
    bullet.addImage(bulletImg);
    bullet.scale = 0.25;
    bullet.pointTo(hitboxUp.x, hitboxUp.y);
    bullet.velocityY = -10;
    bulletGroup.add(bullet);
    pistolBcount -= 1;
  }

  if (weaponState === "rifle")
  {
    bullet = createSprite(rifle.x-10,rifle.y-20);
    bullet.addImage(bulletImg);
    bullet.scale = 0.25;
    bullet.pointTo(hitboxUp.x, hitboxUp.y);
    bullet.velocityY = -20;
    bulletGroup.add(bullet);
    rifleBcount -= 1;
  }

  
  if (weaponState === "shotgun")
  {
    bullet = createSprite(shotgun.x - 10,shotgun.y - 20);
    bullet2 = createSprite(shotgun.x - 10,shotgun.y -20);
    bullet3 = createSprite(shotgun.x - 10,shotgun.y-20);
    bullet.addImage(bulletImg);
    bullet.scale = 0.25;
    bullet2.addImage(bulletImg);
    bullet2.scale = 0.25;
    bullet3.addImage(bulletImg);
    bullet3.scale = 0.25;
    bullet.pointTo(hitboxUp.x, hitboxUp.y);
    bullet2.pointTo(hitboxUp.x-100, hitboxUp.y);
    bullet3.pointTo(hitboxUp.x+100, hitboxUp.y);
    bullet.velocityY = -10;
    bullet2.velocityY = - 10;
    bullet2.velocityX = -5;
    bullet3.velocityY =  -10;
    bullet3.velocityX = 5;
    bulletGroup.add(bullet);
    bulletGroup.add(bullet2);
    bulletGroup.add(bullet3);
    shotgunBcount -= 3;
  }
}
function shootDown()
{
  if (weaponState === "pistol")
  {
    bullet = createSprite(pistol.x - 10,pistol.y + 20);
    bullet.addImage(bulletImg);
    bullet.scale = 0.25;
    bullet.pointTo(hitboxDown.x, hitboxDown.y);
    bullet.velocityY = 10;
    bulletGroup.add(bullet);
    pistolBcount -= 1;
  }

  if (weaponState === "rifle")
  {
    bullet = createSprite(rifle.x - 10,rifle.y + 20);
    bullet.addImage(bulletImg);
    bullet.scale = 0.25;
    bullet.pointTo(hitboxDown.x, hitboxDown.y);
    bullet.velocityY = 10;
    bulletGroup.add(bullet);
    rifleBcount -= 1;
  }

  if (weaponState === "shotgun")
  {
    bullet = createSprite(shotgun.x - 10,shotgun.y + 20);
    bullet2 = createSprite(shotgun.x - 10,shotgun.y +20);
    bullet3 = createSprite(shotgun.x - 10,shotgun.y+20);
    bullet.addImage(bulletImg);
    bullet.scale = 0.25;
    bullet2.addImage(bulletImg);
    bullet2.scale = 0.25;
    bullet3.addImage(bulletImg);
    bullet3.scale = 0.25;
    bullet.pointTo(hitboxDown.x, hitboxDown.y);
    bullet2.pointTo(hitboxDown.x-100, hitboxDown.y);
    bullet3.pointTo(hitboxDown.x+100, hitboxDown.y);
    bullet.velocityY = 10;
    bullet2.velocityY =  10;
    bullet2.velocityX = -5;
    bullet3.velocityY =  10;
    bullet3.velocityX = 5;
    bulletGroup.add(bullet);
    bulletGroup.add(bullet2);
    bulletGroup.add(bullet3);
    shotgunBcount -= 3;
  }
}

function shootLeft()
{
  if (weaponState === "pistol")
  {
    bullet = createSprite(pistol.x - 20,pistol.y+10);
    bullet.addImage(bulletImg);
    bullet.scale = 0.25;
    bullet.pointTo(hitboxLeft.x, hitboxLeft.y);
    bullet.velocityX = -10;
    bulletGroup.add(bullet);
    pistolBcount -= 1;
  }

  if (weaponState === "rifle")
  {
    bullet = createSprite(rifle.x - 20,rifle.y+10);
    bullet.addImage(bulletImg);
    bullet.scale = 0.25;
    bullet.pointTo(hitboxLeft.x, hitboxLeft.y);
    bullet.velocityX = -10;
    bulletGroup.add(bullet);
    rifleBcount -= 1;
  }

  if (weaponState === "shotgun")
  {
    bullet = createSprite(shotgun.x - 40,shotgun.y);
    bullet2 = createSprite(shotgun.x - 40,shotgun.y);
    bullet3 = createSprite(shotgun.x - 40,shotgun.y);
    bullet.addImage(bulletImg);
    bullet.scale = 0.25;
    bullet2.addImage(bulletImg);
    bullet2.scale = 0.25;
    bullet3.addImage(bulletImg);
    bullet3.scale = 0.25;
    bullet.pointTo(hitboxLeft.x, hitboxLeft.y);
    bullet2.pointTo(hitboxLeft.x-100, hitboxLeft.y);
    bullet3.pointTo(hitboxLeft.x+100, hitboxLeft.y);
    bullet.velocityX = -10;
    bullet2.velocityX =  -10;
    bullet2.velocityY = -5;
    bullet3.velocityX =  -10;
    bullet3.velocityY = 5;
    bulletGroup.add(bullet);
    bulletGroup.add(bullet2);
    bulletGroup.add(bullet3);
    shotgunBcount -= 3;
  }
}

function shootRight()
{
  if (weaponState === "pistol")
  {
    bullet = createSprite(pistol.x+20,pistol.y-10);
    bullet.addImage(bulletImg);
    bullet.scale = 0.25;
    bullet.pointTo(hitboxRight.x, hitboxRight.y);
    bullet.velocityX = 10;
    bulletGroup.add(bullet);
    pistolBcount -= 1;
  }
  
  if (weaponState === "rifle")
  {
    bullet = createSprite(rifle.x+20,rifle.y-10);
    bullet.addImage(bulletImg);
    bullet.scale = 0.25;
    bullet.pointTo(hitboxRight.x, hitboxRight.y);
    bullet.velocityX = 10;
    bulletGroup.add(bullet);
    rifleBcount -= 1;
  }

  if (weaponState === "shotgun")
  {
    bullet = createSprite(shotgun.x + 40,shotgun.y);
    bullet2 = createSprite(shotgun.x + 40,shotgun.y);
    bullet3 = createSprite(shotgun.x + 40,shotgun.y);
    bullet.addImage(bulletImg);
    bullet.scale = 0.25;
    bullet2.addImage(bulletImg);
    bullet2.scale = 0.25;
    bullet3.addImage(bulletImg);
    bullet3.scale = 0.25;
    bullet.pointTo(hitboxRight.x, hitboxRight.y);
    bullet2.pointTo(hitboxRight.x-100, hitboxRight.y);
    bullet3.pointTo(hitboxRight.x+100, hitboxRight.y);
    bullet.velocityX = 10;
    bullet2.velocityX =  10;
    bullet2.velocityY = -5;
    bullet3.velocityX =  10;
    bullet3.velocityY = 5;
    bulletGroup.add(bullet);
    bulletGroup.add(bullet2);
    bulletGroup.add(bullet3);
    shotgunBcount -= 3;
  }
}
function spawnZombie()
{
  zombie = createSprite(10,Math.round(random(200,550)));
  zombie.addAnimation('idle',zombieImg);
  zombie.scale = 0.2;
  zombie.velocityX = 4.7525725;
  zombie.lifetime = 500;
  zombieGroup.add(zombie);
}

function spawnZombie2()
{
  zombie2 = createSprite(1500,Math.round(random(200,550)));
  zombie2.addAnimation('idle',zombieImg);
  zombie2.scale = 0.2;
  zombie2.velocityX = -4.7525725;
  zombie2.lifetime = 500;
  zombieGroup.add(zombie2);
}

function spawnZombie3()
{
  zombie3 = createSprite(Math.round(random(75,1450)),10);
  zombie3.addAnimation('idle',zombieImg);
  zombie3.scale = 0.2;
  zombie3.velocityY = 4.7525725;
  zombie3.lifetime = 150;
  zombieGroup.add(zombie3);
}

function spawnZombie4()
{
  zombie4 = createSprite(Math.round(random(75,1450)),650);
  zombie4.addAnimation('idle',zombieImg);
  zombie4.scale = 0.2;
  zombie4.velocityY = -4.7525725;
  zombie4 .lifetime = 150;
  zombieGroup.add(zombie4);
}

function reload()
{
  if (frameCount % 2 === 0 && pistolBcount < 7 && pistolBcount < totalPistolAmmo)
  {
    pistolBcount += 1;
  }

  if (frameCount % 2 === 0 && rifleBcount < 40 && rifleBcount < totalRifleAmmo)
  {
    rifleBcount += 2;
  }

  if (frameCount % 2 === 0 && shotgunBcount < 9 && shotgunBcount % 3 === 0)
  {
    shotgunBcount += 3;
  }
}

function energydrink()
{
  energy = createSprite(0,Math.round(random(200,550),50,50));
  energy.addImage(energyImg);
  energy.scale = 0.5;
  energy.setVelocity(7.5,0);
  energy.lifetime = 200;
  energyGroup.add(energy);
}


function medicalKit()
{
  medical = createSprite(0,Math.round(random(200,550),50,50));
  medical.addImage(medicalKitImg);
  medical.scale = 0.5;
  medical.setVelocity(7.5,0);
  medical.lifetime = 200;
  medicalKitGroup.add(medical);
}

function SpawnCoins()
{
  coin = createSprite(0,Math.round(random(200,550)),50,50);
  coin.addAnimation("coins",coinAnim);
  coin.scale = 0.750;
  coin.setVelocity(7,0);
  coin.lifetime=200;
  coinGroup.add(coin);

}

function gameOver() 
{
  console.log("Game Over");
  zombieGroup.destroyEach();
  zombie2Group.destroyEach();
  zombie3Group.destroyEach();
  zombie4Group.destroyEach();
  coinGroup.destroyEach();
  medicalKitGroup.destroyEach();
  energyGroup.destroyEach();
  player.destroy();
  coins = 0;
  kits = 0;
  drink  = 0;
  pistol.visible = false;
  rifle.visible = false;
  shotgun.visible = false;
  gameOverb.visible = true;
  resetb.visible = true;
  backgroundSounds.stop();
}

function rickroll()
{
  window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
}


function menu()
{
  window.close();
  window.open("https://kingrocks676.github.io/Menu/");
}   