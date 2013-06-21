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
        w: 136,
        h: 136
    },

    alive: true,
    isStopped: false,

    /**
	* Bitmap animation
	*/
    bmp: null,
    body: null,
    direction: "",
    isShooting: false,
    isPunching: false,

	init: function(position, id) {
		var img = gGameEngine.playerImg;
		if (!(this instanceof Bot)) {
			img = gGameEngine.playerImg;
		}

		if (id) {
		    this.id = id;
		}

		var spriteSheet = new createjs.SpriteSheet({
			images: [img],
			frames: { width: this.size.w, height: this.size.h, count:6 },
			animations: {
				idle: [0, 0, 'idle'],
				left: [4, 5, 'left', 10],
				right: [0, 1, 'right', 10],
				shoot_right: [2, 2, 'shoot_right'],
				shoot_left: [3, 3, 'shoot_left'],
				punch_right: [0, 1, 'punch_right', 10], // TODO: need updated sprite from Dave w/ Punch frames
				punch_left: [4, 5, 'punch_left', 10]
				//dead: [16, 16, 'dead', 10]
			}
		});
		
		this.bmp = new createjs.BitmapAnimation(spriteSheet);
		this.bmp.gotoAndPlay("right");

		this.bmp.scaleY = 0.45;
		this.bmp.scaleX = 0.45;

		b = this.bmp;

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
		var actor = gGameEngine.actorObject(that.body, skin, { x: 28, y:33 });

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
			this.isStopped = false;
            dirX = -1;
            that.vecX = -4;
            that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));
            that.direction = "left";
            this.isShooting = false;
			this.isPunching = false;
        } else if (gInputEngine.actions[this.controls.right]) {
            this.animate('right');
			this.isStopped = false;
            dirX = 1;
            that.vecX = 4;
            that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));
            that.direction = "right";
            this.isShooting = false;
			this.isPunching = false;
        } else if (gInputEngine.actions[this.controls.shoot]) {
			if(dirX && dirX > 0) {
				this.animate('shoot_right');
				that.vecX = -1;
			} else {
				this.animate('shoot_left');
				that.vecX = 1;
			}

			if(!this.isShooting)
			{
				createjs.Sound.play("bomb");
			}

			this.isStopped = false;
			this.isShooting = true;
			this.isPunching = false;
            that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));
		} else if (gInputEngine.actions[this.controls.punch]) {
			if(dirX && dirX > 0) {
				this.animate('punch_right');
				that.vecX = -1;
			} else {
				this.animate('punch_left');
				that.vecX = 1;
			}
			this.isStopped = false;
			this.isShooting = false;
			this.isPunching = true;
            that.body.SetLinearVelocity(new b2Vec2(that.vecX,0));
        } else {
            this.bmp.stop();
            that.body.SetLinearVelocity(new b2Vec2(0,0));
            that.isStopped = true;
            this.isShooting = false;
			this.isPunching = false;
        }
    },

	/**
	* Changes animation if requested animation is not already current.
	*/
    animate: function(animation) {
        if (this.bmp.currentAnimation.indexOf(animation) === -1 || this.isStopped) {
			this.bmp.gotoAndPlay(animation);
        }
    }
});

factory['Player'] = Player;