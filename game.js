         var   b2Vec2 = Box2D.Common.Math.b2Vec2
            ,  b2BodyDef = Box2D.Dynamics.b2BodyDef
            ,  b2Body = Box2D.Dynamics.b2Body
            ,  b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            ,  b2Fixture = Box2D.Dynamics.b2Fixture
            ,  b2World = Box2D.Dynamics.b2World
            ,  b2MassData = Box2D.Collision.Shapes.b2MassData
            ,  b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
            ,  b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
            ,  b2DebugDraw = Box2D.Dynamics.b2DebugDraw
            ;


var factory = {};

Entity = Class.extend({
   init: function() {
   },

   update: function() {
   }
});




var Player = Entity.extend({
       controls: {
        'up': 'up',
        'left': 'left',
        'down': 'down',
        'right': 'right',
         'punch': 'punch',
         'shoot': 'shoot'
    },
    /**
   * Bitmap dimensions
   */
    size: {
        w: 48,
        h: 48
    },

    alive: true,

        /**
* Bitmap animation
*/
    bmp: null,

    body: null,

   init: function(position, id) {

         

         //debugger;
           var img = gGameEngine.playerImg;
           if (!(this instanceof Bot)) {
                   img = gGameEngine.playerImg;
           }

         // var skinBMP = new createjs.Bitmap(img);
         // skinBMP.x = position.x;
         // skinBMP.y = position.y;
         // skinBMP.regX = 25;   // important to set origin point to center of your bitmap
         // skinBMP.regY = 25; 
         // skinBMP.snapToPixel = true;
         // skinBMP.mouseEnabled = false;

         // //skinBMP.rotation = 90;

         // skinBMP.scaleX = 0.5;
         // skinBMP.scaleY = 0.5;

         //gGameEngine.stage.addChild(skinBMP);
         
         //gGameEngine.createBall(skinBMP);
         


      if (id) {
         this.id = id;
      }

      
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

      this.bmp.gotoAndPlay("right");


      this.bmp.scaleY = 0.8;
      this.bmp.scaleX = 0.8;

      b = this.bmp;

      // this.position = position;
      // var pixels = Utils.convertToBitmapPosition(position);
      // this.bmp.x = pixels.x;
      // this.bmp.y = pixels.y;
      
      //this.position = position;
      //var pixels = Utils.convertToBitmapPosition(position);


      this.bmp.x = position.x;
      this.bmp.y = position.y;





      /////// CREATING 
      this.createObj(this.bmp);


        // var spriteSheet = new createjs.SpriteSheet({
        //     images: [img],
        //     frames: { width: this.size.w, height: this.size.h, regX: 10, regY: 12 },
        //     animations: {
        //         idle: [0, 0, 'idle'],
        //         down: [0, 3, 'down', 10],
        //         left: [4, 7, 'left', 10],
        //         up: [8, 11, 'up', 10],
        //         right: [12, 15, 'right', 10],
        //         dead: [16, 16, 'dead', 10]
        //     }
        // });
        // this.bmp = new createjs.BitmapAnimation(spriteSheet);

        // this.position = position;
        // var pixels = Utils.convertToBitmapPosition(position);
        // this.bmp.x = pixels.x;
        // this.bmp.y = pixels.y;

        gGameEngine.stage.addChild(this.bmp);
   },

      createObj: function(skin)
   {
      console.log("skin", skin);
      //return;
      var that = this;
               //create a ball
         var fixDef = new b2FixtureDef;
         fixDef.density = 0.5;
         fixDef.friction = 0.5;
         fixDef.restitution = 0;

         var bodyDef = new b2BodyDef;
         bodyDef.type = b2Body.b2_dynamicBody;
         bodyDef.position.x = skin.x/gGameEngine.scale;
         bodyDef.position.y = skin.y/gGameEngine.scale;


         fixDef.shape = new b2PolygonShape;
         fixDef.shape.SetAsBox(10/gGameEngine.scale, 11/gGameEngine.scale);

         this.body = gGameEngine.world.CreateBody(bodyDef);
         this.body.CreateFixture(fixDef);

         // assign actor
         var actor = gGameEngine.actorObject(that.body, skin);

         this.body.SetUserData(actor);  // set the actor as user data of the body so we can use it later: body.GetUserData()
         //gGameEngine.bodies.push(that.body);
         return that.body;
   },





      update: function() {
        if (!this.alive) {
            //this.fade();
            return;
        }

              var that = this;
if (gInputEngine.actions[this.controls.up]) {

            this.animate('up');

            // position.y -= this.velocity;

            // dirY = -1;

            //that.body.SetLinearVelocity(new b2Vec2(that.vecX, 500));

        } else if (gInputEngine.actions[this.controls.down]) {

            this.animate('down');

            // position.y += this.velocity;

            // dirY = 1;

            // that.body.SetLinearVelocity(new b2Vec2(0,0));

        } else if (gInputEngine.actions[this.controls.left]) {

            this.animate('left');

            //position.x -= this.velocity;

            dirX = -1;

            that.vecX = -4;

            that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));

           

        } else if (gInputEngine.actions[this.controls.right]) {

            this.animate('right');

            //position.x += this.velocity;

            dirX = 1;

            that.vecX = 4;

            that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));

         } else if (gInputEngine.actions[this.controls.shoot]) {

            //this.animate('right');

            //position.x += this.velocity;

            //dirX = 1;

            that.vecX = -1;

            that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));

         } else if (gInputEngine.actions[this.controls.punch]) {

            //this.animate('right');

            //position.x += this.velocity;

            //dirX = 1;

            that.vecX = 1;

            that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));

        } else {
            this.bmp.stop();
            that.body.SetLinearVelocity(new b2Vec2(0,0));
        }


      },

       /**
      * Changes animation if requested animation is not already current.
      */
       animate: function(animation) {
           if (!this.bmp.currentAnimation || this.bmp.currentAnimation.indexOf(animation) === -1) {
               this.bmp.gotoAndPlay(animation);
           }
       }
});

factory['Player'] = Player;





var Ball = Entity.extend({
    controls: {
        'up': 'up',
        'left': 'left',
        'down': 'down',
        'right': 'right',
        'punch': 'punch',
        'shoot': 'shoot'
    },
    body: null,
    vecX: null,

   init: function(x,y,imgSrc)
   {
         //var skinBMP = new createjs.Bitmap("image/bird.png");
         var skinBMP = new createjs.Bitmap(imgSrc);
         //skinBMP.x = Math.round(Math.random()*500);
         skinBMP.x = x;
         skinBMP.y = y;
         skinBMP.regX = 25;   // important to set origin point to center of your bitmap
         skinBMP.regY = 25; 
         skinBMP.snapToPixel = true;
         skinBMP.mouseEnabled = false;

         skinBMP.rotation = 90;

         skinBMP.scaleX = 0.5;
         skinBMP.scaleY = 0.5;

         gGameEngine.stage.addChild(skinBMP);
         
         //gGameEngine.createBall(skinBMP);
         this.createObj(skinBMP);
   },

   createObj: function(skin)
   {
      var that = this;
               //create a ball
         var fixDef = new b2FixtureDef;
         fixDef.density = 0.5;
         fixDef.friction = 0.5;
         fixDef.restitution = 1;

         var bodyDef = new b2BodyDef;
         bodyDef.type = b2Body.b2_dynamicBody;
         bodyDef.position.x = skin.x/gGameEngine.scale;
         bodyDef.position.y = skin.y/gGameEngine.scale;
         fixDef.shape = new b2CircleShape(10/gGameEngine.scale);

         this.body = gGameEngine.world.CreateBody(bodyDef);
         this.body.CreateFixture(fixDef);

         // assign actor
         var actor = gGameEngine.actorObject(that.body, skin);
         this.body.SetUserData(actor);  // set the actor as user data of the body so we can use it later: body.GetUserData()
         //gGameEngine.bodies.push(that.body);
         return that.body;
   },

   update: function()
   {
      var that = this;
         if (gInputEngine.actions[this.controls.up]) {

            // this.animate('up');

            // position.y -= this.velocity;

            // dirY = -1;

            //that.body.SetLinearVelocity(new b2Vec2(that.vecX, 500));

        } else if (gInputEngine.actions[this.controls.down]) {

            // this.animate('down');

            // position.y += this.velocity;

            // dirY = 1;

            // that.body.SetLinearVelocity(new b2Vec2(0,0));

        } else if (gInputEngine.actions[this.controls.left]) {

                                                //this.animate('left');

            //position.x -= this.velocity;

            dirX = -1;

            that.vecX = -4;

            that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));

           

        } else if (gInputEngine.actions[this.controls.right]) {

            //this.animate('right');

            //position.x += this.velocity;

            dirX = 1;

            that.vecX = 4;

            that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));

                                } else if (gInputEngine.actions[this.controls.shoot]) {

            //this.animate('right');

            //position.x += this.velocity;

            //dirX = 1;

            that.vecX = -1;

            that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));

                               } else if (gInputEngine.actions[this.controls.punch]) {

            //this.animate('right');

            //position.x += this.velocity;

            //dirX = 1;

            that.vecX = 1;

            that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));

        } else {

            //this.animate('idle');

            that.body.SetLinearVelocity(new b2Vec2(0,0));

        }
   }
});

factory['Ball'] = Ball;
