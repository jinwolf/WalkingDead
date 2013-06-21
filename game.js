var factory = {};

Entity = Class.extend({
   init: function() {
   },

   update: function() {
   }
});

var Player = Entity.extend({
   init: function(position, controls, id) {
      if (id) {
         this.id = id;
      }

      if (controls) {
         this.controls = controls;
      }

      /*
      var spriteSheet = new createjs.SpriteSheet({
         images: [img],
         frames: { width: this.size.w, height: this.size.h, regX: 10, regY: 12 },
         animations: {
             idle: [0, 0, 'idle'],
             down: [0, 3, 'down', 10],
             left: [4, 7, 'left', 10],
             up: [8, 11, 'up', 10],
             right: [12, 15, 'right', 10],
             dead: [16, 16, 'dead', 10]
         }
      });
      this.bmp = new createjs.BitmapAnimation(spriteSheet);

      this.position = position;
      var pixels = Utils.convertToBitmapPosition(position);
      this.bmp.x = pixels.x;
      this.bmp.y = pixels.y;
      */
      var data = {
         images: ["image/walking-man.jpg"],
         frames: {width:50, height:50},
         animations: {run:[0,4], jump:[5,8,"run"]}
      };
      
      var spriteSheet = new createjs.SpriteSheet(data);
      var animation = new createjs.BitmapAnimation(spriteSheet);
      animation.gotoAndPlay("run");

      gGameEngine.stage.addChild(this.bmp);

      this.bombs = [];
      this.setBombsListener();
   },
});

factory['Player'] = Player;





var Ball = Entity.extend({
   init: function(x,y,radius)
   {

   }
});
