(function() {

  define("modules/objects/food/elixir", [], function() {
    var img = new Image();
    img.src = 'images/elixir.png';

    return {
      id: 5,
      pts: 0,
      img: img,
      type: "elixir"
    }
  });
})();
