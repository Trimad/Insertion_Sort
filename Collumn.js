"use strict"

function Collumn(_index) {

  this.index = _index;
  this.width;
  this.height;
  this.value;

  this.focused = false;
  this.isSortKey = false;

  this.show = function() {
    let x = (this.width * this.index) - (width / 2) + (this.width / 2);
    /*
        //let x = this.index * this.width;
        
        if (this.isSortKey) {
          specularMaterial(0, 255, 0);
        } else if (this.focusedNext) {
          specularMaterial(0, 0, 255);
        } else {
          specularMaterial(255);
        }

        //the background
        translate(x, -this.height/2-(height/2)+height, 0);
        plane(this.width, this.height);
        translate(-x, this.height/2+(height/2)-height, 0);
    */
    for (let i = 0; i < this.value; i++) {

      //let y = -(height / 2 - (this.width / 2)) + (this.width * i);
      let y = -(height / 2) + i * this.width + this.width - (this.width / 2);

      translate(x, -y, 0);
      rotateY(frameCount * 0.01);
      //normalMaterial(255);
      //texture(tex_fg);
      specularMaterial(255);
      sphere(this.size, 16, 16);
      rotateY(-frameCount * 0.01);
      translate(-x, y, 0);

    }

  }

  this.getValue = function(_num) {
    //print("this.getValue();")
    this.value = _num;
  }

  this.update = function() {
    this.width = width / collumnCount;
    this.height = this.width * this.value;
    this.size = this.width / 2;
  }

}