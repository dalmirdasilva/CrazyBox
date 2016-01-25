function Box(e, parent) {
  this.e = e;
  this.parent = parent;
  this.xDirection = Math.random() > 0.5 ? Box.DIRECTION.RIGHT : Box.DIRECTION.LEFT;
  this.yDirection = Math.random() > 0.5 ? Box.DIRECTION.DOWN : Box.DIRECTION.UP;
  this.stepSize = 2;
  
  this.step = function() {
    var offset = $(this.e).offset();
    this.computeNextDirection();
    offset.top += (this.yDirection == Box.DIRECTION.DOWN) ? this.stepSize : -(this.stepSize);
    offset.left += (this.xDirection == Box.DIRECTION.RIGHT) ? this.stepSize : -(this.stepSize);
    $(this.e).offset(offset);
  };
  
  this.computeNextDirection = function() {
    var offset = Util.getOffset(this.e);
    var parentOffset = Util.getOffset(this.parent);
    if (offset.top <= parentOffset.top || offset.bottom >= parentOffset.bottom) {
      this.swapYDirection();
    }
    if (offset.left <= parentOffset.left || offset.right >= parentOffset.right) {
      this.swapXDirection();
    }
  };
  
  this.swapXDirection = function() {
    this.xDirection = (this.xDirection == Box.DIRECTION.RIGHT) ? Box.DIRECTION.LEFT : Box.DIRECTION.RIGHT;
  };
  
  this.swapYDirection = function() {
    this.yDirection = (this.yDirection == Box.DIRECTION.UP) ? Box.DIRECTION.DOWN : Box.DIRECTION.UP;
  };
}

Box.DIRECTION = {
  RIGHT: 0,
  LEFT: 1,
  UP: 2,
  DOWN: 3
};
