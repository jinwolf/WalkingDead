Bot = Player.extend({
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
        w: 136,
        h: 136
    },

    alive: true,

    isStopped: false,
    id: null,
        /**
* Bitmap animation
*/
    bmp: null,

    body: null,

   init: function(position, id, imgSrc) {
       var img = imgSrc;

      if (id) {
         this.id = id;
      }

      var spriteSheet = new createjs.SpriteSheet({
         images: [img],
         frames: { width: this.size.w, height: this.size.h, count: 8 },
         animations: {
             idle: [0, 0, 'idle'],
             //down: [0, 3, 'down', 10],
             left: [0, 1, 'left', 10],
             //up: [8, 11, 'up', 10],
             right: [4, 5, 'right', 10],
             dead_left: [2, 3, false, 10],
             dead_right: [6, 7, false, 10]
         }
      });
      this.bmp = new createjs.BitmapAnimation(spriteSheet);

      this.bmp.gotoAndPlay("right");


      this.bmp.scaleY = 0.45;
      this.bmp.scaleX = 0.45;

      this.bmp.x = position.x;
      this.bmp.y = position.y;


      /////// CREATING 
      this.createObj(this.bmp);

      gGameEngine.stage.addChild(this.bmp);
   },

      createObj: function(skin)
   {
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
         fixDef.shape.SetAsBox(15/gGameEngine.scale, 27/gGameEngine.scale);

         this.body = gGameEngine.world.CreateBody(bodyDef);
         this.body.CreateFixture(fixDef);

         // assign actor
         var actor = gGameEngine.actorObject(that.body, skin, { x: 30, y: 33});

         this.body.SetUserData(actor);  // set the actor as user data of the body so we can use it later: body.GetUserData()
         //gGameEngine.bodies.push(that.body);
         return that.body;
   },


      update: function() {

        var playerX = gGameEngine.players[0].body.GetPosition().x;
        var botX = this.body.GetPosition().x;
        var botY = this.body.GetPosition().y;

        var direction = "";
        if(playerX < botX)
        {
            direction = "left";
        }
        else
        {
            direction = "right";
        }

        if(botY<7)
        {
            direction = "";
        }


// DEAD Check
        if (!this.alive) {
            //console.log("dead zombie", this.id);
            //this.alive = true;
            //this.fade();
            this.animate('dead_'+direction);
            this.isStopped = false;
            this.body.SetLinearVelocity(new b2Vec2(0,0));
            this.fade();
            return;
        }



        var speed = 2;
        var that = this;

        if (direction == "left") {
            this.animate('left');
            this.isStopped = false;
            //position.x -= this.velocity;
            //dirX = -1;
            that.vecX = -speed;
            that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));

        } else if (direction == "right") {
            this.animate('right');
            this.isStopped = false;
            //position.x += this.velocity;
            //dirX = 1;
            that.vecX = speed;
            that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));
        }
        else {
            this.bmp.stop();
            that.body.SetLinearVelocity(new b2Vec2(0,0));
            that.isStopped = true;
        }



        // if (gInputEngine.actions[this.controls.up]) {
        //     //this.animate('up');
        //     // position.y -= this.velocity;
        //     // dirY = -1;
        //     //that.body.SetLinearVelocity(new b2Vec2(that.vecX, 500));

        // } else if (gInputEngine.actions[this.controls.down]) {
        //     //this.animate('down');
        //     // position.y += this.velocity;
        //     // dirY = 1;
        //     // that.body.SetLinearVelocity(new b2Vec2(0,0));

        // } else if (gInputEngine.actions[this.controls.left]) {
        //     this.animate('left');
        //     this.isStopped = false;
        //     //position.x -= this.velocity;
        //     //dirX = -1;
        //     that.vecX = -4;
        //     that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));

        // } else if (gInputEngine.actions[this.controls.right]) {
        //     this.animate('right');
        //     this.isStopped = false;
        //     //position.x += this.velocity;
        //     //dirX = 1;
        //     that.vecX = 4;
        //     that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));

        //  } else if (gInputEngine.actions[this.controls.shoot]) {
        //     //this.animate('right');
        //     //position.x += this.velocity;
        //     //dirX = 1;
        //     that.vecX = -1;
        //     that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));

        //  } else if (gInputEngine.actions[this.controls.punch]) {
        //     //this.animate('right');
        //     //position.x += this.velocity;
        //     //dirX = 1;
        //     that.vecX = 1;
        //     that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));

        // } else {
        //     this.bmp.stop();
        //     that.body.SetLinearVelocity(new b2Vec2(0,0));
        //     that.isStopped = true;
        // }

      },

       /**
      * Changes animation if requested animation is not already current.
      */
       animate: function(animation) {
           if (!this.bmp.currentAnimation || this.bmp.currentAnimation.indexOf(animation) === -1 || this.isStopped) {
               this.bmp.gotoAndPlay(animation);
           }
       },

       fade: function()
       {
            var that = this;
            
            setTimeout(function(){
                gGameEngine.removeZombie(that.id)
            }, 1000);
       }
});

factory['Bot'] = Bot;