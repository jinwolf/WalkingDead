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
      
      init: function() {
         console.log('init', this.scale);


         var that = this;
         var   b2Vec2 = Box2D.Common.Math.b2Vec2
         	,	b2BodyDef = Box2D.Dynamics.b2BodyDef
         	,	b2Body = Box2D.Dynamics.b2Body
         	,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
         	,	b2Fixture = Box2D.Dynamics.b2Fixture
         	,	b2World = Box2D.Dynamics.b2World
         	,	b2MassData = Box2D.Collision.Shapes.b2MassData
         	,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
         	,	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
         	,	b2DebugDraw = Box2D.Dynamics.b2DebugDraw
            ;
         
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
         
         //create some objects
/*         bodyDef.type = b2Body.b2_dynamicBody;
         for(var i = 0; i < 10; ++i) {
            if(Math.random()*k > 0.5) {
               fixDef.shape = new b2PolygonShape;
               fixDef.shape.SetAsBox(
                     Math.random()*k + 0.1 //half width
                  ,  Math.random()*k + 0.1 //half height
               );
            } else {
               fixDef.shape = new b2CircleShape(
                  Math.random()*k + 0.1 //radius
               );
            }
            bodyDef.position.x = Math.random()*k * 10;
            bodyDef.position.y = Math.random()*k * 10;
            world.CreateBody(bodyDef).CreateFixture(fixDef);
         }*/


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

      startLoop: function()
      {
         var that = this;
         createjs.Ticker.setFPS(30);
         createjs.Ticker.useRAF = true;
         createjs.Ticker.addListener(that);  // looks for "tick" function within THIS object
      },
      
      tick : function(dt, paused){
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
         //box2d.createBird(birdBMP);
      }

      return {
         spawn: spawn
      }
   })();
