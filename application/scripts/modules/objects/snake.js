(function() {
  define("modules/objects/snake", [], function() {
    var size = 3,
      _ID = 1,
      /*controll keys*/
      _LEFT = 37,
      _RIGHT = 39,
      _UP = 38,
      _DOWN = 40,
      /*food*/
      _APPLE = 2,
      _STRAWBERRY = 3,
      _MUSHROOM = 4,
      _ELIXIR = 5,
      /*snake elements*/
      elements, direction;

    return {
      cols: 0,
      rows: 0,
      tileSize: 0,
      gameOver: false,
      pts: 0,
      godMode: true,

      /**
       * Snake initialize function
       */
      init: function(cols, rows, tileSize) {
        this.gameOver = false;
        this.godMode = false;
        direction = _RIGHT;
        elements = [];
        this.pts = 0;
        this.cols = cols,
        this.rows = rows,
        this.tileSize = tileSize,

        this.initElements(cols, rows);
        this.initEvents();
      },

      getId: function() {
        return _ID;
      },

      /**
       * Returns a collection of elements with snake coordinates
       * @return {Array} - collection with coordinates
       */
      getElements: function() {
        return elements;
      },

      /**
       * Prints one cell styled for snake object
       */
      printItem: function(ctx, coords) {
        ctx.fillStyle = this.godMode ? "blue" : "green";
        ctx.fillRect(coords.x*this.tileSize, coords.y*this.tileSize, this.tileSize, this.tileSize);
      },

      /**
       * Initialize snake elements
       */
      initElements: function(cols, rows) {
        var x = Math.floor(cols/2),
          y = Math.floor(rows/2);

        for(var i = 0; i < size; i++) {
          elements.push(this.getElement(x+i, y));
        }
      },

      /**
       * Creates a new element for a snake cell
       * @return {Object} - snake cell
       */
      getElement: function(x, y) {
        return {
          x: x,
          y: y,
          id: _ID
        }
      },

      getLength: function() {
        return elements.length;
      },

      /**
       * Event handlers
       * @listens keyup
       */
      initEvents: function() {
        document.addEventListener("keyup", function(e) {
          if(this.lock) return;
          switch(true) {
            case Boolean(e.keyCode === _UP && direction !== _DOWN):
            case Boolean(e.keyCode === _DOWN && direction !== _UP):
            case Boolean(e.keyCode === _LEFT && direction !== _RIGHT):
            case Boolean(e.keyCode === _RIGHT && direction !== _LEFT):
              this.lock = true;
              direction = e.keyCode;
          }
        }.bind(this));
      },

      /**
       * Moves snake
       */
      move: function() {
        var tail = elements.shift(),
          head = elements[elements.length-1];

        switch(direction) {
          case _UP:
            tail.y = head.y-1;
            tail.x = head.x;
            break;
          case _DOWN:
            tail.y = head.y+1;
            tail.x = head.x;
            break;
          case _LEFT:
            tail.y = head.y;
            tail.x = head.x-1;
            break;
          case _RIGHT:
            tail.y = head.y;
            tail.x = head.x+1;
            break;
        }

        this.gameOver = this.isOverboard(tail) || this.isBitten(tail);
        this.lock = false;
        elements.push(tail);
      },

      /**
       * add one more cell to snake elements
       */
      increase: function(pts) {
        var tail = this.getElement(elements[0].x, elements[0].y);
        switch(direction) {
          case _UP:
            tail.y += 1;
            break;
          case _DOWN:
            tail.y -= 1;
            break;
          case _LEFT:
            tail.x += 1;
            break;
          case _RIGHT:
            tail.x -= 1;
            break;
        }

        elements.unshift(tail);
        this.pts += pts;
      },

      /**
       * Checks if snake is out of border
       * @return {Boolean}
       */
      isOverboard: function(coords) {
        return coords.x < 0 || coords.x > this.cols-1 ||
          coords.y < 0 || coords.y > this.rows-1;
      },

      /**
       * Checks if snake is bitten by itself
       * @return {Boolean}
       */
      isBitten: function(coords) {
        if(this.godMode) {
          return false;
        }
        for(var i = 0; i < elements.length; i++) {
          if(elements[i].x === coords.x && elements[i].y === coords.y) {
            return true;
          }
        }

        return false;
      },

      /**
       * detects if head has collision with objects
       * calls a collisionWith function if collision detected
       */
      detectCollision: function(apples) {
        var head = elements[elements.length-1];
        for(var i = 0; i < apples.length; i++) {
          if(head.x === apples[i].x && head.y === apples[i].y) {
            this.collisionWith(apples[i], apples);
            break;
          }
        }
      },

      /**
       * desides what to do with collision depends on object
       */
      collisionWith: function(obj, apples) {
        switch (obj.id) {
          case _APPLE:
          case _STRAWBERRY:
          case _MUSHROOM:
            this.godMode = false;
            this.increase(obj.pts || 0);
            break;
          case _ELIXIR:
            this.godMode = true;
            break;
          default:
            this.gameOver = true;
            console.log("collision with unknown object -> ", obj);
        }

        /*removes the eaten apple from Array*/
        if(apples.indexOf(obj) >= 0) {
          apples.splice(apples.indexOf(obj), 1);
        }
      }

    }
  })

})();
