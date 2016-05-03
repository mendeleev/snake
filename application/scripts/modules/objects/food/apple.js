(function() {

  define("modules/objects/food/apple", [], function() {
    var img = new Image();
    img.src = 'images/apple.png';

    return {
      id: 2,
      pts: 1,
      img: img,
      type: "apple"
    };
  });

})();
