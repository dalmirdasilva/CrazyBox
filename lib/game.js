var Game = {
  
  numberOfBoxes: null,
  state: null,
  boxes: null,
  interval: null,
  stepDelay: 7,
  startedAt: null,
  stoppedAt: null,
  
  run: function(numberOfBoxes) {
    this.ELEMENTS.gameOverOverlay().hide();
    this.numberOfBoxes = numberOfBoxes;
    this.initComponents();
    this.state = Game.STATE.INITIALIZED;
  },
  
  initComponents: function() {
    this.createCrazyBoxes();
    this.ELEMENTS.wantedBox().draggable({
      enable: true,
      containment: 'parent',
      start: Game.unpause.bind(Game),
      stop: Game.pause.bind(Game)
    }).css({left: 'calc(50% - 20px)', top: 'calc(50% - 20px)'});
  },
  
  step: function() {
    this.boxes.map(function(box) {
      box.step();
      if (Game.colisionHappend(box)) {
        Game.gameOver();
      }
    });
  },
  
  start: function() {
    if (this.state != Game.STATE.RUNNIG) {
      this.startedAt = new Date();
      this.createCrazyBoxes();
      this.setInterval();
      this.ELEMENTS.wantedBox().draggable({enable: true});
      this.state = Game.STATE.RUNNIG;
    }
  },
  
  stop: function() {
    if (this.state != Game.STATE.STOPPED) {
      this.stoppedAt = new Date();
      this.clearInterval();
      this.ELEMENTS.wantedBox().trigger('mouseup').draggable({enable: false});
      this.state = Game.STATE.STOPPED;
    }
  },
  
  unpause: function() {
    switch(this.state) {
      case Game.STATE.INITIALIZED:
        this.start();
        break;
      case Game.STATE.PAUSED:
        this.setInterval();
        break;
    }
  },
  
  pause: function() {
    this.clearInterval();
    this.state = Game.STATE.PAUSED;
  },
  
  restart: function() {
    this.stop();
    this.start();
  },
  
  clearInterval: function() {
    clearInterval(this.interval);
  },
  
  setInterval: function() {
    this.interval = setInterval(Game.step.bind(Game), this.stepDelay);
  },
  
  createCrazyBoxes: function() {
    this.boxes = new Array();
    this.ELEMENTS.crazyBoxes().remove();
    for (var i = 0; i < this.numberOfBoxes; i++) {
      var e = this.ELEMENTS.crazyBoxSample.clone();
      this.boxes.push(new Box(e, Game.ELEMENTS.gameContainer()));
      this.ELEMENTS.gameContainer().append(e);
    }
  },
  
  colisionHappend: function(box) {
    var boxOffset = Util.getOffset(box.e);
    var wantedOffset = Util.getOffset(Game.ELEMENTS.wantedBox());
    return boxOffset.left < wantedOffset.right && boxOffset.right > wantedOffset.left && boxOffset.top < wantedOffset.bottom && boxOffset.bottom > wantedOffset.top;
  },
  
  showScore: function() {
    var time = this.stoppedAt - this.startedAt;
    Game.ELEMENTS.scorePlaceHolder().text(time);
  },
  
  gameOver: function(box) {
    this.stop();
    this.showScore();
    Game.ELEMENTS.gameOverOverlay().show();
  }     
};

Game.STATE = {
  INITIALIZED: 0,
  GAMEOVER: 1,
  STOPPED: 1,
  RUNNIG: 2,
  PAUSED: 3
};

Game.ELEMENTS = {
    scorePlaceHolder: function() { return $('#score-place-holder') },
    gameContainer: function() { return $('#game-container') },
    wantedBox: function() { return $('#wanted-box') },
    crazyBoxSample: $('<div class="box crazy"></div>'),
    crazyBoxes: function() { return $('.crazy') },
    gameOverOverlay: function() { return $('#game-over-overlay') }
};
