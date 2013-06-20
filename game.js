
      var canvasHeight = 386;
      var canvasWidth = 900;
      var k = 60;


      var world;
      
      function init() {
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
         
         world = new b2World(
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
         bodyDef.position.x = 0;
         bodyDef.position.y = 300-12;
         fixDef.shape = new b2PolygonShape;
         fixDef.shape.SetAsBox(canvasWidth-20, 10);
         world.CreateBody(bodyDef).CreateFixture(fixDef);
         
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
			debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
			debugDraw.SetDrawScale(0.5);
			debugDraw.SetFillAlpha(0.3);
			debugDraw.SetLineThickness(2.0);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			world.SetDebugDraw(debugDraw);
         
         window.setInterval(update, 1000 / 60);
      };
      
      function update() {
         world.Step(
               1 / 60   //frame-rate
            ,  10       //velocity iterations
            ,  10       //position iterations
         );
         world.DrawDebugData();
         world.ClearForces();
      };



   var factory = {};

   var EntityClass = Class.extend({
   // TASK #1
   // Fill out the base class for game entities
   // with the following properties:
   // 
   // 1) a 'pos' object with 'x' and 'y' properties
   //    to keep track of the entity's position in
   //    the game world.
   // 
   // 2) a 'size' object with 'x' and 'y' properties
   //    to keep track of an entity's size for the
   //    purpose of drawing.
   // 
   // 3) a blank update function we can overload to
   //    update each entity in a specific manner.
   //    This is what allows us to give each entity
   //    type its own logic to perform each frame.
   //
   pos : {x:0,y:0},
   size : {x:0,y:0},
   last : {x:0,y:0},

   update : function() { }
   });

   var PlayerClass = EntityClass.extend({

   });

   factory['PlayerClass'] = PlayerClass;





GameEngineClass = Class.extend({
});