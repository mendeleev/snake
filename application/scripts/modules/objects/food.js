(function() {
  define("modules/objects/food",
  [
    "modules/objects/food/apple",
    "modules/objects/food/strawberry",
    "modules/objects/food/mushroom",
    "modules/objects/food/elixir"
  ],
  function(apple, strawberry, mushroom, elixir) {
    var elements = [];

    return {
      tileSize: 0,

      init: function(cols, rows, tileSize, num) {
        elements = [];
        this.tileSize = tileSize;
        this.generateFood(cols, rows, num);
      },

      getId: function(ID) {
        return ID;
      },

      getImage: function() {
        var images = [
              apple,
              strawberry,
              mushroom,
              elixir
            ],
            obj = images[Math.floor(Math.random()*images.length)];

        return obj;
      },

      printItem: function(ctx, obj) {
        ctx.drawImage(obj.img, obj.x*this.tileSize, obj.y*this.tileSize, this.tileSize, this.tileSize);
      },

      generateFood: function(cols, rows, num) {
        for(var i = 0; i < num; i++) {
          elements.push(this.getFood(cols, rows));
        }
      },

      getFood: function(cols, rows) {
        var obj = this.getImage();
        return {
          x: Math.floor(Math.random()*cols-1)+1,
          y: Math.floor(Math.random()*rows-1)+1,
          id: obj.id,
          img: obj.img,
          pts: obj.pts,
          type: obj.type || ""
        }
      },

      getElements: function() {
        return elements;
      }
    }
  });
})();
