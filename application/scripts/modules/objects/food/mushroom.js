(function() {
  
  define("modules/objects/food/mushroom", [], function() {
    var img = new Image();
    img.src = 'images/mushroom.png';

    return {
      id: 4,
      pts: -1,
      img: img
    }
  });
})();
