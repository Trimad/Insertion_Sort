"use strict"

function Collumn(_index, _x) {

  this.index = _index;
  this.width;
  this.height;
  this.value;
  this.x = _x;
  this.dx = 0;
  this.y;
  this.z = 0;
  this.dz = 0;

  this.focused = false;
  this.isSortKey = false;

  this.show = function() {

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

      this.y = -(height / 2) + i * this.width + this.width - (this.width / 2);

      translate(this.x + this.dx, -this.y, this.z + this.dz);
      rotateY(frameCount * 0.01);
      //normalMaterial(255);
      //texture(tex_fg);
      specularMaterial(255);
      sphere(this.size, 16, 16);
      rotateY(-frameCount * 0.01);
      translate(-this.x - this.dx, this.y, -this.z - this.dz);

    }

  }

  this.getValue = function(_num) {
    this.value = _num;
  }

  this.update = function() {
    this.width = width / collumnCount;
    this.x = ((width / collumnCount) * this.index);
    this.height = this.width * this.value;
    this.size = this.width / 2;
  }

}