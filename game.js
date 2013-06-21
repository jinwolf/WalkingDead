



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
