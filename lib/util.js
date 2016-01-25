var Util = {
  getOffset: function(e) {
    var offset = $(e).offset();
    return {
      top: offset.top,
      left: offset.left,
      right: offset.left + $(e).width(),
      bottom: offset.top + $(e).height()
    }
  }
};
