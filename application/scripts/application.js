(function() {

  var version = 0.02;

  requirejs.config({
    urlArgs: "v="+version
  });

  define("application", ["modules/game"], function(game) {
    game.init();
  });

})();
