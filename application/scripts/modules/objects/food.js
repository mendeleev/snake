(function() {
  define("modules/objects/food",
  [
    "modules/objects/food/apple",
    "modules/objects/food/strawberry",
    "modules/objects/food/mushroom",
    "modules/objects/food/elixir"
  ],
  function(apple, strawberry, mushroom, elixir) {
    var elements = [],
      /* what number of which sort of food will be generated */
      params = {
        apple:10,
        strawberry: 3,
        mushroom: 5,
        elixir: 1
      };

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

      getImage: function(type) {
        var images = {
              apple: apple,
              strawberry: strawberry,
              mushroom: mushroom,
              elixir: elixir
            },
            obj = images[type] || apple;

        return obj;
      },

      printItem: function(ctx, obj) {
        ctx.drawImage(obj.img, obj.x*this.tileSize, obj.y*this.tileSize, this.tileSize, this.tileSize);
      },

      add: function(cols, rows, obj) {
        var type = obj.type || "apple";
        elements.push(this. getFood(cols, rows, type));
      },

      generateFood: function(cols, rows, num) {
        var i;
        /*loop every param*/
        for(var name in params) {
          /*generate food for each param in the object*/
          for(i = 0; i < params[name]; i++) {
            elements.push(this.getFood(cols, rows, name));
          }
        }
      },

      getFood: function(cols, rows, type) {
        var obj = this.getImage(type);
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
