"use strict"

let autoPlay = false;
let tex_fg;
let tex_bg;

let collumnArr = [];
let collumnCount = 100;

let textArr = [];
let slices = [];

let isSorted = false;
let sliceIndex = 0;
let pos = 0;

function setup() {

  createCanvas(windowHeight, windowHeight, WEBGL);
  tex_bg = loadImage('assets/grass.jpg');
  tex_fg = loadImage('assets/black.jpg');

  //Initialize the collumn objects

  for (let i = 0; i < collumnCount; i++) {
    collumnArr.push(new Collumn(i));
  }


  //Initialize the textArr
  /*
   * MANUALLY ADDING VALUES FOR HOMEWORK PROBLEM 2.1-1
   */

  for (let i = 0; i < collumnCount; i++) {
    textArr[i] = ceil(random(collumnCount));
  }

  /*
  textArr[0] = 31;
  textArr[1] = 41;
  textArr[2] = 59;
  textArr[3] = 26;
  textArr[4] = 41;
  textArr[5] = 58;
  */
  insertionSortDescending(textArr);
  isSorted = true;

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {

  if (frameCount % 30 == 0) {
    document.title = floor(frameRate()) + " FPS";
  }


  background(51);
  translate(0, pos / 1.8, -pos);
  orbitControl();

  if (focused) {
    directionalLight(255, 0, 0, Math.cos(frameCount * 0.01), Math.sin(frameCount * 0.01), 0.5);
    directionalLight(0, 255, 0, Math.cos(frameCount * 0.02), Math.sin(frameCount * 0.02), 0.5);
    directionalLight(0, 0, 255, Math.cos(frameCount * 0.03), Math.sin(frameCount * 0.03), 0.5);
  }

  if (isSorted) {
    if (autoPlay) {
      sliceIndex++;
      if (sliceIndex >= slices.length) {
        sliceIndex = 0;
      }
    }

    //THIS LOOP UPDATES THE COLLUMN VALUE
    for (let i = 0; i < collumnCount; i++) {

      collumnArr[i].update();
      collumnArr[i].getValue(slices[sliceIndex][i]);
      collumnArr[i].show();

    }

  }
}

function keyPressed() {

  if (sliceIndex > 0 && keyCode === LEFT_ARROW) {
    sliceIndex--;
  } else if (keyCode === RIGHT_ARROW && sliceIndex < slices.length - 1) {
    sliceIndex++;
  } else if (keyCode === ENTER) {
    autoPlay = !autoPlay;

  }
  return false; // prevent default
}

function mouseWheel(event) {
  //move the square according to the vertical scroll amount
  pos += event.delta;
  //uncomment to block page scrolling
  //return false;
}

function insertionSortAscending(A) {
  for (let j = 1; j < A.length; j++) {
    let _key = A[j];
    //Insert A[j] into the sorted sequence A[1..j-1].
    let i = j - 1;
    while (A[i] > _key) {
      //addSlice(A, slices);
      A[i + 1] = A[i];
      i = i - 1;
      A[i + 1] = _key;
      addSlice(A, slices);
    }
  }
}

function insertionSortDescending(A) {
  for (let j = 1; j < A.length; j++) {
    let _key = A[j];
    //Insert A[j] into the sorted sequence A[1..j-1].
    let i = j - 1;
    while (A[i] < _key) {
      //addSlice(A, slices);
      A[i + 1] = A[i];
      i = i - 1;
      A[i + 1] = _key;
      addSlice(A, slices);
    }
  }
}

function addSlice(_source, _destination) {
  let temp = [];
  temp = deepCopy(_source);
  _destination.push(temp);
}

function deepCopy(o) {
  let output, v, key;
  output = Array.isArray(o) ? [] : {};
  for (key in o) {
    v = o[key];
    output[key] = (typeof v === "object") ? deepCopy(v) : v;
  }
  return output;
}