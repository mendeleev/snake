/**
 * menu module for snake game
 * @author - Andrii Priadko
 */

(function() {
  define("modules/objects/menu", [], function() {

    return {
      ctx: null, //canvas 2d context
      cols: 0, //number of cols in game field
      rows: 0, //number of rows in game field
      tileSize: 0, //size of tile in the game field
      width: 0, //game field width
      height: 0, //game field height

      /**
       * Initialize a begining state
       */
      init: function(cols, rows, tileSize) {
        this.cols = cols;
        this.rows = rows;
        this.tileSize = tileSize;
        this.width = this.cols * this.tileSize;
        this.height = this.rows * this.tileSize;
      },

      /**
       * That function renders a gameover screen
       *
       */
      gameOver: function(ctx, pts) {
        var best = this.getBestScore() > pts ? this.getBestScore() : pts;

        ctx.clearRect(0, 0, this.cols*this.tileSize, this.rows*this.tileSize);
        ctx.font = "bold 20px serif";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", this.width/2, this.height/2-40);

        ctx.font = "16px serif";
        ctx.textAlign = "center";
        ctx.fillText("press <Enter> to start a new game", this.width/2, this.height/2-20);

        ctx.font = "16px serif";
        ctx.textAlign = "center";
        ctx.fillText("your score is: "+(pts || 0), this.width/2, this.height - 100);

        ctx.font = "16px serif";
        ctx.textAlign = "center";
        ctx.fillText("the best score is: " + best, this.width/2, this.height - 80);

        this.setBestScore(best);
      },

      /**
       * Gets a bestScore value from the localStorage
       * @return {Number} - best score
       */
      getBestScore: function() {
        return localStorage.getItem("bestScore") || 0;
      },

      /**
       * Store best score value to the localStorage
       * @return {Boolean} - best score save result
       */
      setBestScore: function(pts) {
        return localStorage.setItem("bestScore", (pts || 0));
      }
    }
  });
})();
