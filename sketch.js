"use strict"

let autoPlay = false;
let tex_fg;
let tex_bg;

let collumnArr = [];
let collumnCount;

let textArr = [];
let slices = [];

let isSorted = false;
let sliceIndex = 0;
//for the scroll wheel
let pos = 0;

function setup() {

  var raw = getURLParams();
  var params = split(raw.params, ',');
  collumnCount = params[1];

  createCanvas(windowWidth, windowHeight, WEBGL);
  tex_bg = loadImage('assets/grass.jpg');
  tex_fg = loadImage('assets/black.jpg');

  //Initialize the collumn objects

  for (let i = 0; i < collumnCount; i++) {
    let x = ((width / collumnCount) * i);
    collumnArr.push(new Collumn(i, x));
    collumnArr[i].update();
  }


  for (let i = 0; i < collumnCount; i++) {
    textArr[i] = ceil(random(collumnCount / 2));
  }

  /*
   * MANUALLY ADDING VALUES FOR HOMEWORK PROBLEM 2.1-1
   
  textArr[0] = 31;
  textArr[1] = 41;
  textArr[2] = 59;
  textArr[3] = 26;
  textArr[4] = 41;
  textArr[5] = 58;
  */

  if (params[0] == "ascending") {
    insertionSortAscending(textArr);
  } else if (params[0] == "descending") {
    insertionSortDescending(textArr);
  }

  isSorted = true;

}

function draw() {

  if (frameCount % 30 == 0) {
    document.title = floor(frameRate()) + " FPS";
  }


  background(51);

  orbitControl();
  translate(-width / 2 + collumnArr[0].width / 2, 0, -pos);

  if (focused) {
    ambientLight(255, 0, 0);
    directionalLight(255, 0, 255, Math.cos(frameCount * 0.01), Math.sin(frameCount * 0.01), 1);
    directionalLight(255, 255, 0, Math.sin(frameCount * 0.01), Math.cos(frameCount * 0.01), 1);
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
      collumnArr[i].getValue(slices[sliceIndex][i]);
      collumnArr[i].show();

    }

  }

  //swapX(collumnArr[0], collumnArr[2]);

}

function swapX(a, b) {

  let temp = 0;

  if (a.x < b.x) {
    let xDist = dist(a, b);

    a.dx = xDist * Math.cos(xDist);
    b.dx = xDist * Math.cos(xDist);
    a.dz--;
    b.dz++;

  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (let i = 0; i < collumnCount; i++) {
    collumnArr[i].update();
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