// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
let count = [];
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/FvdPGVIis/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function windowResized() {
  centerCanvas();
}

function setup() {
  cnv = createCanvas(640, 480);
 centerCanvas();
  // Create the video
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  //classifyVideo();
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}


function draw() {
//  background(0);
//  // Draw the video
//  image(flippedVideo, 0, 0);
//
//  // Draw the label
//  fill(255);
//  noStroke();
//  textSize(16);
//  textAlign(CENTER);
//  text(label, width / 2, height - 4);
//    
//  noFill();
//  stroke(0,255,255);
//    let i = random(0,10);
//    let j = random(0,10);
//  square(230+i, 150+j, 150);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}

IngredientList = ["milk", "egg", "orange", "apple", "garlic", "yogurt", "chicken"];

function searchRecepies(IngredientList, RecipeList, top_n){
    //IngredientList is the prediction list the model gives
    //RecipeList is the two dimensional array, where rows are recipe/dish names and cols are ingredient names
    
    count = []; 
    let indexes = [];
    
    for(let i = 0; i < RecipeList.length; i++){
        count[i] = 0;
        for(let j = 0; j< IngredientList.length; j++){
            if(RecipeList[i][1].join(" ").includes(IngredientList[j]) == true){
                count[i] = count[i] + 1;
            }
        }
    }
    console.log(count);
    
    for(let a = 1; a <= top_n; a++){
        let max = Math.max(...count);
        console.log(max);
        let index = count.indexOf(max);
        indexes.push(index);
        count[index] = 0;
    }
    
    return indexes;
}

console.log(searchRecepies(IngredientList, RecipeList, 5));