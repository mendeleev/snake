(function() {

  define("modules/objects/food/strawberry", [], function() {
    var img = new Image();
    img.src = 'images/strawberry.png';

    return {
      id: 3,
      pts: 2,
      img: img,
      type: "strawberry"
    }
  });
})();
