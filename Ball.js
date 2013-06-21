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