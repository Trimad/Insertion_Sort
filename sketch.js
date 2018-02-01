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
  if (params[1]) {
    collumnCount = params[1];
  } else {
    collumnCount = 32;
  }

  createCanvas(windowWidth, windowHeight, WEBGL);
  //tex_bg = loadImage('assets/grass.jpg');
  //tex_fg = loadImage('assets/black.jpg');

  //Initialize the collumn objects
  for (let i = 0; i < collumnCount; i++) {
    let x = ((width / collumnCount) * i);
    collumnArr.push(new Collumn(i, x));
    collumnArr[i].update();
  }

//Populate an array of random integers

    for (let i = 0; i < collumnCount; i++) {
      textArr[i] = ceil(random(collumnCount / 2));
    }
   
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

  /*
    if (frameCount % 60 == 0) {
      isSorting = true;
    }
    swapX(collumnArr[0], collumnArr[1]);
    swapX(collumnArr[2], collumnArr[3]);
  */
}


let tempD = 0;
let isSorting = false;

/*
*
* swapX(var,var) is a broken function; still in progress
*
*/
function swapX(a, b) {
  //a.visible = false;
  //b.visible = false;
  //Update the first column
  let d = (a.x - b.x) / 2;
  let dx = d * Math.cos(frameCount * 0.1);
  let dz = d * Math.sin(frameCount * 0.1);

  //Show the first column
  for (let i = 0; i < a.value; i++) {
    let y = -(height / 2) + i * a.width + a.width - (a.width / 2);
    translate((a.width / 2 + dx), -y, dz);
    rotateY(frameCount * 0.05);
    specularMaterial(255);
    sphere(a.size, 16, 16);
    rotateY(-frameCount * 0.05);
    translate(-(a.width / 2 + dx), y, -dz);
  }

  //Show the second column
  for (let i = 0; i < b.value; i++) {
    let y = -(height / 2) + i * b.width + b.width - (b.width / 2);
    translate((b.width / 2 - dx), -y, -dz);
    rotateY(frameCount * 0.05);
    specularMaterial(255);
    sphere(a.size, 16, 16);
    rotateY(-frameCount * 0.05);
    translate(-(b.width / 2 - dx), y, dz);
  }

  if (dz === 0) {
    isSorting = true;
    a.visible = true;
    b.visible = false;
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
  pos += event.delta;
}

function insertionSortAscending(A) {
  addSlice(A, slices);
  for (let j = 1; j < A.length; j++) {
    let _key = A[j];
    //Insert A[j] into the sorted sequence A[1..j-1].
    let i = j - 1;
    while (A[i] > _key) {
      A[i + 1] = A[i];
      i = i - 1;
      A[i + 1] = _key;
      addSlice(A, slices);
    }
  }
}

function insertionSortDescending(A) {
  addSlice(A, slices);
  for (let j = 1; j < A.length; j++) {
    let _key = A[j];
    //Insert A[j] into the sorted sequence A[1..j-1].
    let i = j - 1;
    while (A[i] < _key) {
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