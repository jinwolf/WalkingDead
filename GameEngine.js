var _body = null;
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

      players: [],
      zombies: [],

      playerImg: null,
      
      init: function() {
         // if canvas is not ready don't do anything
         if(!document.getElementById("canvas"))
         {
            return;
         }

         console.log('init', this.scale);


         var that = this;

         this.playerImg = "image/betty.png";

         
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

         //this.addBall(10, 10);
         //this.addPlayer(50, 10, 1);

         gGameEngine.addPlayer(20,20,1);
         gGameEngine.addZombie(100,20,1, 'image/einstein-zombie.png');


         if (!gInputEngine.bindings.length) {
            gInputEngine.setup();
         }
      },

      addBall: function(x,y)
      {
         var ball = new factory["Ball"](x,y,"image/bird.png");
         this.balls.push(ball);
         _body = ball;
         return ball;
      },

      addPlayer: function(x, y, id)
      {
         //debugger;
         var player = new factory["Player"]({x:x,y:y}, id);
         this.players.push(player);
         return player;
      },

      addZombie: function(x,y,id, imgSrc)
      {
         var zombie = new factory["Bot"]({x:x,y:y}, id, imgSrc);
         this.zombies.push(zombie);
         return zombie;
      },

      actorObject : function(body, skin, delta) {
         
         var deltaX = delta ? delta.x : 0;
         var deltaY = delta ? delta.y : 0;

         var that = this;

         var actor = 
         {
            body: body,
            skin: skin,
            update: function()// translate box2d positions to pixels
            {
               actor.skin.rotation = actor.body.GetAngle() * (180 / Math.PI);
               actor.skin.x = actor.body.GetWorldCenter().x * that.scale - deltaX;
               actor.skin.y = actor.body.GetWorldCenter().y * that.scale - deltaY ;
               
            }
         };


         that.actors.push(actor);

         return actor;
      },

      startLoop: function()
      {
         var that = this;

         //this.createBall({x:100, y:45});

         createjs.Ticker.setFPS(60);
         createjs.Ticker.useRAF = true;
         createjs.Ticker.addListener(that);  // looks for "tick" function within THIS object
      },
      
      tick : function(dt, paused){

        // Balls
        for (var i = 0; i < gGameEngine.balls.length; i++) {
            var ball = gGameEngine.balls[i];
            ball.update();
        }

        // Players
        for (var i = 0; i < gGameEngine.players.length; i++) {
            var player = gGameEngine.players[i];
            player.update();
        }

        // Zombies
        for (var i = 0; i < gGameEngine.zombies.length; i++) {
            var zombie = gGameEngine.zombies[i];
            zombie.update();
        }

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
      }

      return {
         spawn: spawn
      }
   })();
