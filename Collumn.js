"use strict"

function Collumn(_index, _x) {

  this.index = _index;
  this.width;
  this.height;
  this.value;
  this.x = _x;
  this.y;
  this.z = 0;
  this.visible = true;

  this.show = function() {
    if (this.visible) {
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

        translate(this.x, -this.y, this.z);
        rotateY(frameCount * 0.01);
        //normalMaterial(255);
        //texture(tex_fg);
        specularMaterial(255, 127, 127);
        sphere(this.size, 16, 16);
        rotateY(-frameCount * 0.01);
        translate(-this.x, this.y, -this.z);

      }
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
