// var dog,dogImg,dogImg1;
// var database;
// var foodS,foodStock;

// function preload(){
//    dogImg=loadImage("Images/Dog.png");
//    dogImg1=loadImage("Images/happy dog.png");
//   }

// //Function to set initial environment
// function setup() {
//   database=firebase.database();
//   createCanvas(500,500);

//   dog=createSprite(250,300,150,150);
//   dog.addImage(dogImg);
//   dog.scale=0.15;

//   foodStock=database.ref('Food');
//   foodStock.on("value",readStock);
//   textSize(20); 
// }

// // function to display UI
// function draw() {
//   background(46,139,87);
 
//   if(keyWentDown(UP_ARROW)){
//     writeStock(foodS);
//     dog.addImage(dogImg1);
//   }

//   drawSprites();
//   fill(255,255,254);
//   stroke("black");
//   text("Food remaining : "+foodS,170,200);
//   textSize(13);
//   text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
// }

// //Function to read values from DB
// function readStock(data){
//   foodS=data.val();
// }

// //Function to write values in DB
// function writeStock(x){
//   if(x<=0){
//     x=0;
//   }else{
//     x=x-1;
//   } 
//   database.ref('/').update({
//     Food:x
//   })
// }
var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload(){
sadDog=loadImage("Images/Dog.png");
happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(1100,390);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(1200,390);
  addFood.mousePressed(addFoods);

}

function draw() {
  background("yellow");
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(25);
  if(lastFed>=12){
    fill("blue");
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     fill("blue")
     text("Last Feed : 12 AM",350,30);
   }else{
     fill("blue");
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}