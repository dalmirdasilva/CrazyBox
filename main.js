$(document).ready(function() {
  Game.run(4);
  
  $('#restart-button').click(function() {
    Game.run(4);
  });
});

