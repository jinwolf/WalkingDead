
var GameEngine = Class.extend({
      canvasHeight : 386,
      canvasWidth : 900,
      k : 60,

      canvas:null,
      context:null,

      debugCanvas:null,
      debugContext:null,

      stage:null,

      world : null,
      scale : 15,

      actors: [],
      bodies: [],

      balls:[],
      
      init: function() {
         console.log('init', this.scale);


         var that = this;

         
         this.world = new b2World(
               new b2Vec2(0, 150)    //gravity
            ,  true                 //allow sleep
         );
         
         var fixDef = new b2FixtureDef;
         fixDef.density = 1.0;
         fixDef.friction = 0.5;
         fixDef.restitution = 0.2;
         
         var bodyDef = new b2BodyDef;
         
         //create ground
         bodyDef.type = b2Body.b2_staticBody;
         bodyDef.position.x = 150/that.scale;
         bodyDef.position.y = 145/that.scale;
         fixDef.shape = new b2PolygonShape;
         fixDef.shape.SetAsBox(150/that.scale, 5/that.scale);
         this.world.CreateBody(bodyDef).CreateFixture(fixDef);


         //setup debug draw
         var debugDraw = new b2DebugDraw();

         this.canvas = document.getElementById("canvas");
         this.debugCanvas = document.getElementById("debugCanvas");

         if(this.canvas)
         {
            this.context = this.canvas.getContext("2d");
            this.debugContext = this.debugCanvas.getContext("2d");


            // stage will get real canvas to draw images
            this.stage = new createjs.Stage(canvas);
            this.stage.snapPixelsEnabled = true;

            // box2D will get debugCanvasContext to draw fixtures
            debugDraw.SetSprite(that.debugContext);
            debugDraw.SetDrawScale(that.scale);
            debugDraw.SetFillAlpha(0.3);
            debugDraw.SetLineThickness(1.0);
            debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

            this.world.SetDebugDraw(debugDraw);

            // starts the game loop
            this.startLoop();
         }

      },

      addBall: function(x,y)
      {
         //debugger;
         var ball = new factory["Ball"](x,y,"image/bird.png");

      },

      createBall: function(skin) {
         var that = this;
         //create a ball
         var fixDef = new b2FixtureDef;
         fixDef.density = 1.0;
         fixDef.friction = 0.5;
         fixDef.restitution = 1;

         var bodyDef = new b2BodyDef;
         bodyDef.type = b2Body.b2_dynamicBody;
         bodyDef.position.x = skin.x/that.scale;
         bodyDef.position.y = skin.y/that.scale;
         fixDef.shape = new b2CircleShape(10/that.scale);

         var body = this.world.CreateBody(bodyDef);
         body.CreateFixture(fixDef);

         // assign actor
         var actor = this.actorObject(body, skin);
         body.SetUserData(actor);  // set the actor as user data of the body so we can use it later: body.GetUserData()
         this.bodies.push(body);
      },

      actorObject : function(body, skin) {
         
         var that = this;

         var actor = 
         {
            body: body,
            skin: skin,
            update: function()// translate box2d positions to pixels
            {
               actor.skin.rotation = actor.body.GetAngle() * (180 / Math.PI);
               actor.skin.x = actor.body.GetWorldCenter().x * that.scale;
               actor.skin.y = actor.body.GetWorldCenter().y * that.scale;
            }
         };

         // this.update = function() {  // translate box2d positions to pixels
         //    actor.skin.rotation = actor.body.GetAngle() * (180 / Math.PI);
         //    actor.skin.x = actor.body.GetWorldCenter().x * that.scale;
         //    actor.skin.y = actor.body.GetWorldCenter().y * that.scale;
         // }

         that.actors.push(actor);

         return actor;
      },

      startLoop: function()
      {
         var that = this;

         this.createBall({x:100, y:45});

         createjs.Ticker.setFPS(30);
         createjs.Ticker.useRAF = true;
         createjs.Ticker.addListener(that);  // looks for "tick" function within THIS object
      },
      
      tick : function(dt, paused){
            // update active actors
         for(var i=0, l=this.actors.length; i<l; i++) {
            this.actors[i].update();
         }

         //console.log('update', arguments, this);
         this.world.Step(
               1 / 60   //frame-rate
            ,  10       //velocity iterations
            ,  10       //position iterations
         );
         this.world.DrawDebugData();
         this.world.ClearForces();

         this.stage.update();
      }

   });

var gGameEngine = new GameEngine();



var birds = (function() {

      var spawn = function() {
         var birdBMP = new createjs.Bitmap("image/bird.png");
         //birdBMP.x = Math.round(Math.random()*500);
         birdBMP.x = Math.round(Math.random()*200);
         birdBMP.y = 30;
         birdBMP.regX = 25;   // important to set origin point to center of your bitmap
         birdBMP.regY = 25; 
         birdBMP.snapToPixel = true;
         birdBMP.mouseEnabled = false;

         birdBMP.rotation = 90;

         birdBMP.scaleX = 0.5;
         birdBMP.scaleY = 0.5;

         gGameEngine.stage.addChild(birdBMP);
         gGameEngine.createBall(birdBMP);
         //box2d.createBird(birdBMP);
      }

      return {
         spawn: spawn
      }
   })();
