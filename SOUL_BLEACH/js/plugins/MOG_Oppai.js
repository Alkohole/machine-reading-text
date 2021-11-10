//=============================================================================
// MOG_Oppai.js
//=============================================================================

/*:
 * @plugindesc (v1.2) >_<
 * @author Moghunter
 *
 * @param Outline
 * @desc Adicionar contorno.
 * @default true
 * 
 * @param X - Axis Front
 * @desc Definição X-axis dos peitos (Frente).
 * @default 0
 *
 * @param Y - Axis Front
 * @desc Definição Y-axis dos peitos (Frente).
 * @default 0
 *
 * @param X - Axis Side
 * @desc Definição X-axis dos peitos (Lateral).
 * @default 0
 *
 * @param Y - Axis Side
 * @desc Definição Y-axis dos peitos (Lateral).
 * @default 0
 *
 * @help  
 * =============================================================================
 * +++ MOG Oppai (v1.2) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Aumenta o tamanho dos peitos dos personagens sem a necessidade de editar
 * os sprites. Na verdade um plugin totalmente inútil....>_<
 * 
 * ============================================================================
 * COMENTÁRIOS
 * ============================================================================
 * Utilize o comentário abaixo para aumentar os peitos dos personagem.
 *        
 * oppai : MODE : X1 : Y1 : X2 : Y2
 *
 * Mode -> 0 Left Side    /   1 Center 
 * X1 ->  Posição X-axis (Frontal).
 * Y1 ->  Posição Y-axis (Frontal).
 * X2 ->  Posição X-axis (Lateral).
 * Y2 ->  Posição Y-axis (Lateral).
 *
 * EX
 *
 * oppai : 1 : 0 : 0 : 0 : 0
 * 
 * ============================================================================
 * - WHAT'S  NEW  
 * ============================================================================
 * (version 1.2)
 * - (UPD) - Melhoria na performance.
 *
 * (version 1.1)
 * - (BUG FIX) - Standalone ,não é mais necessário MOG_CharPoses para funcionar.   
 * - (NEW) - Adicionado o efeito contorno. 
 * - (UPD) - Compatibilidade com sprites de 64px (64 - 96).
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_Oppai = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_Oppai');
    Moghunter.oppai_X = Number(Moghunter.parameters['X - Axis Front'] || 0);
    Moghunter.oppai_Y = Number(Moghunter.parameters['Y - Axis Front'] || 0);
    Moghunter.oppai_X2 = Number(Moghunter.parameters['X - Axis Side'] || 0);
    Moghunter.oppai_Y2 = Number(Moghunter.parameters['Y - Axis Side'] || 0);	
	Moghunter.oppai_Space = Number(Moghunter.parameters['Space'] || 0);
	Moghunter.oppai_Bold = String(Moghunter.parameters['Outline'] || 'true');
	   
//=============================================================================
// ** Game Actor
//=============================================================================

//==============================
// * Init Members
//==============================
var _mog_oppai_gActor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
	_mog_oppai_gActor_initMembers.call(this);
	this.initOppaiDataActor();
};

//==============================
// * Init Members
//==============================
Game_Actor.prototype.initOppaiDataActor = function() {
	this._oppaiData = {};
	this._oppaiData.enabled = false;
	this._oppaiData.x = Moghunter.oppai_X;
	this._oppaiData.y = Moghunter.oppai_Y;
	this._oppaiData.x2 = Moghunter.oppai_X2;
	this._oppaiData.y2 = Moghunter.oppai_Y2;	
	this._oppaiData.mode = 0; 
};

//=============================================================================
// ** Game Player
//=============================================================================

//==============================
// * refresh
//==============================
var _mog_oppai_gPlayer_refresh = Game_Player.prototype.refresh;
Game_Player.prototype.refresh = function() {
	_mog_oppai_gPlayer_refresh.call(this);
	this.checkOppaiDataActor($gameParty.leader());
};

//==============================
// * refresh
//==============================
var _mog_oppai_gFollower_refresh = Game_Follower.prototype.refresh;
Game_Follower.prototype.refresh = function() {
	_mog_oppai_gFollower_refresh.call(this);
	this.checkOppaiDataActor(this.actor());
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _mog_oppai_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_mog_oppai_pluginCommand.call(this,command, args)
	this.oppaiPluginCommand(command, args);
	return true;
};

//==============================
// * PluginCommand
//==============================
Game_Interpreter.prototype.oppaiPluginCommand = function(command, args) {
   if (command === "oppai")  {
	   var id = args[1] != null ? args[1] : 0;
	   var mode = args[3] != null ? args[3] : 0;
	   var x1 = args[5] != null ? args[5] : 0;
	   var y1 = args[7] != null ? args[7] : 0;
	   var x2 = args[9] != null ? args[9] : 0;
	   var y2 = args[11] != null ? args[11] : 0;
	   var actor = $gameParty.members()[id]
	   if (!actor) {return} 
	   actor._oppaiData.enabled = true;
	   actor._oppaiData.mode = Number(mode);
	   actor._oppaiData.x1 = Number(x1);
	   actor._oppaiData.y1 = Number(y1);
	   actor._oppaiData.x2 = Number(x2);
	   actor._oppaiData.y2 = Number(y2);
	   $gamePlayer.refresh();
   };
};

//=============================================================================
// ** Character Base
//=============================================================================

//==============================
// * Init Members
//==============================
var _mog_oppai_cbase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
    _mog_oppai_cbase_initMembers.call(this);
	this.initOppaiData();
};
	
//==============================
// * Init Oppai Data
//==============================
Game_CharacterBase.prototype.initOppaiData = function() {
    this._oppaiData = {};
	this._oppaiData.enabled = false;
	this._oppaiData.x = Moghunter.oppai_X;
	this._oppaiData.y = Moghunter.oppai_Y;
	this._oppaiData.x2 = Moghunter.oppai_X2;
	this._oppaiData.y2 = Moghunter.oppai_Y2;	
	this._oppaiData.bustSize = 1.50;
	this._oppaiData.mode = 0;
	this._oppaiData.needRefresh = false;
	this._oppaiData.space = Moghunter.oppai_Space;
	this._oppaiData.direction = -1;
	this._oppaiData.outline = String(Moghunter.oppai_Bold) == 'true' ? true : false;
};
		
//==============================
// * checkOppaiDataActor
//==============================
Game_CharacterBase.prototype.checkOppaiDataActor = function(actor) {
	if (!actor) {return};
	if (this._oppaiData.enabled != actor._oppaiData.enabled) {this._oppaiData.needRefresh = true}
    this._oppaiData.enabled = actor._oppaiData.enabled;
	this._oppaiData.x = actor._oppaiData.x;
	this._oppaiData.y = actor._oppaiData.y;
	this._oppaiData.x2 = actor._oppaiData.x2;
	this._oppaiData.y2 = actor._oppaiData.x2;
	this._oppaiData.mode = actor._oppaiData.mode;
};

//=============================================================================
// ** Game Event
//=============================================================================
	
//==============================
// * Setup Page
//==============================
var _mog_oppai_gevent_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_mog_oppai_gevent_setupPage.call(this);
    this.checkOppaiComments();
};	

//==============================
// * check Oppai Comments
//==============================
Game_Event.prototype.checkOppaiComments = function() {
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
	       if (l.code === 108) {var comment = l.parameters[0].split(' : ')
			    if (comment[0].toLowerCase() == "oppai"){
					var mode = comment[1] ? comment[1] : 0;
					this._oppaiData.mode = Number(mode);					
					this._oppaiData.enabled = true;
					var x = comment[2] ? comment[2] : 0;
					this._oppaiData.x = Number(x);
					var y = comment[3] ? comment[3] : 0;
					this._oppaiData.y = Number(y);
					var x2 = comment[4] ? comment[4] : 0;
					this._oppaiData.x2 = Number(x2);								
					var y2 = comment[5] ? comment[5] : 0;
					this._oppaiData.y2 = Number(y2);
			     };
		    };
	}, this);};
};	
	
//=============================================================================
// ** Sprite Character
//=============================================================================

//==============================
// * update Half Body
//==============================
var _mog_Oppai_sprChar_updateHalfBodySprites = Sprite_Character.prototype.updateHalfBodySprites;
Sprite_Character.prototype.updateHalfBodySprites = function() {
	_mog_Oppai_sprChar_updateHalfBodySprites.call(this);
	if (this._character) {this.updateOppaiBase()};
};
	
//==============================
// * update Oppai Base
//==============================
Sprite_Character.prototype.updateOppaiBase = function() {	
	if (this.canCreateOppai()) {this.createOppaiSprites()};
	if (this.needRemoveOppaiSprite()) {this.removeOppaiSprite()};
    if (this._oppaiBody) {
		for (var i = 0; i < this._oppaiBody.length; i++) {
		     this.updateOppaiBody(this._oppaiBody[i])
		};
	};
	this._character._oppaiData.direction = this._character.direction;
	if (this._upperBody && !this._upperBody.mz) {this.sortOppaiMZ()};
};

//==============================
// * need Refresh Oppai Bitmap
//==============================
Sprite_Character.prototype.needRefreshOppaiBitmap = function() {
    if (this._character._oppaiData.direction != this._character.direction) {return true};
    return false;
};

//==============================
// * create Oppai Sprites
//==============================
Sprite_Character.prototype.createOppaiSprites = function() {
    this._oppaiBody = [];
	for (var i = 0; i < 2; i++) {
		 this._oppaiBody[i] = new Sprite();
		 this._oppaiBody[i].mz = 15 + i;
		 this._oppaiBody[i].index = i;
		 this._oppaiBody[i].anchor.x = 0.5;
         this._oppaiBody[i].anchor.y = 0.5;
		 this._oppaiBody[i].visible = false;
		 this.addChild(this._oppaiBody[i])
	};
};

//==============================
// * sort Oppai MZ
//==============================
Sprite_Character.prototype.sortOppaiMZ = function() {
	this._lowerBody.mz = 10;
	this._upperBody.mz = 11;
    this.children.sort(function(a, b){return a.mz-b.mz});
};

//==============================
// * can Create Oppai
//==============================
Sprite_Character.prototype.canCreateOppai = function() {
   if (this._oppaiBody) {return false};
   if (!this._character) {return false};
   if (!this._character._oppaiData.enabled) {return false};
   if (this.patternHeight() == 0) {return false};
   return true;
};

//==============================
// * set Oppai Frame
//==============================
Sprite_Character.prototype.setOppaiFrame = function(sprite) {
    var pw = this.patternHeight();
    var ph = this.patternWidth();
    var sx = (this.characterBlockX() + 1) * pw;
    var sy = (this.characterBlockY()) * ph;	
	var bx = pw - 31;
	if (this.patternHeight() >= 52) {      
	    var by = ph - (this.patternHeight() - 40);
	} else {
	    var by = ph - 12;
	};
	sprite.bitmap.clear();
	sprite.bitmap.blt(this.bitmap,sx + bx + 2,sy + by - 2,3,1,2,0,3,1);
	sprite.bitmap.blt(this.bitmap,sx + bx + 1,sy + by - 1,5,1,1,1,5,1);
	sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,6,1,0,2,6,1);
	sprite.bitmap.blt(this.bitmap,sx + bx,sy + by + 1,2,1,0,3,6,1);
	sprite.bitmap.blt(this.bitmap,sx + bx + 1,sy + by + 2,1 ,1,1,4,4,1);
 	if (this._character._oppaiData.outline) {this.drawOppaiOutline(sprite)};
};

//==============================
// * drawOppaiOutLine
//==============================
Sprite_Character.prototype.drawOppaiOutline = function(sprite,xsize) {	
	var color = "#300000"
	sprite.bitmap.fillRect(0,1,1,1,color);
	sprite.bitmap.fillRect(0,2,1,1,color);
	sprite.bitmap.fillRect(0,3,1,1,color);
	sprite.bitmap.fillRect(1,4,4,1,color);
	sprite.bitmap.fillRect(5,3,1,1,color);
	sprite.bitmap.fillRect(6,1,1,1,color);		
};

//==============================
// * update Oppai Position
//==============================
Sprite_Character.prototype.updateOppaiPosition = function(sprite) {
	sprite.visible = true;
    sprite.scale.x = this._character._oppaiData.bustSize;
	sprite.scale.y = this._character._oppaiData.bustSize;	  	
	if (this._character.direction() == 8) {
		sprite.visible = false;
	} else if (this._character.direction() == 4) {
	    this.updateOppaiPosLeft(sprite); 
	} else if (this._character.direction() == 6) {
	    this.updateOppaiPosRight(sprite);
	} else  {
	     this.updateOppaiPosFront(sprite);
	};
    this.updateOppaiBouncing(sprite)
};

//==============================
// * update Oppai Bouncing
//==============================
Sprite_Character.prototype.updateOppaiBouncing = function(sprite) {
 	if (this._character.pattern() == 2) {
	    sprite.y -= this._character.pattern();
	} else {
	    sprite.y -= this._character.pattern() * 1.5;
	}; 	
};	

//==============================
// * update Oppai Pos Right
//==============================
Sprite_Character.prototype.updateOppaiPosRight = function(sprite) {
	sprite.scale.x = -this._character._oppaiData.bustSize
	var bsize = this.patternWidth() < 52 ? false : true
	var xf = this.patternWidth() / 2;
	var yf = this.patternHeight() / 2;
	var rx = !bsize ? 1 : 2;
	var ry = !bsize ? -2 : -8;
	if (sprite.index == 0) {
  	    sprite.x = -(xf + rx + this._character._oppaiData.x2);
	} else {
		sprite.visible = bsize;
		sprite.x = -5 - (xf + rx + this._character._oppaiData.x2);
	};
	sprite.y = ry + yf + this._character._oppaiData.y2;
};

//==============================
// * update Oppai Pos Left
//==============================
Sprite_Character.prototype.updateOppaiPosLeft = function(sprite) {
	var bsize = this.patternWidth() < 52 ? false : true
	var xf = this.patternWidth() / 2;
	var yf = this.patternHeight() / 2;
	var rx = !bsize ? 0 : 2;
	var ry = !bsize ? -2 : -8;
	if (sprite.index == 0) {
  	    sprite.x = xf + rx + this._character._oppaiData.x2;
	} else {
		sprite.visible = bsize;
		sprite.x = 5 + (xf + rx + this._character._oppaiData.x2);
	};
	sprite.y = ry + yf + this._character._oppaiData.y2;	
};

//==============================
// * update Oppai Pos Front
//==============================
Sprite_Character.prototype.updateOppaiPosFront = function(sprite) {
	var xf = this.patternWidth() / 2;
	var yf = this.patternHeight() / 2;
	var rx = this.patternWidth() < 52 ? 4 : 8;
	var ry = this.patternHeight() < 52 ? -4 : -6;
	if (sprite.index == 0) {
  	    sprite.x = xf + rx + this._character._oppaiData.x
	} else {
		if (this._character._oppaiData.mode == 1) {
			sprite.x = 7 + (xf + rx + this._character._oppaiData.x)
    	} else { 
		    sprite.scale.x = -this._character._oppaiData.bustSize
		    sprite.x = -(xf + rx + this._character._oppaiData.x) 
		};
	};
	sprite.y = ry + yf + this._character._oppaiData.y;
};

//==============================
// * set Tile Bitmap
//==============================
var _mog_oppai_sprtChar_setTileBitmap = Sprite_Character.prototype.setTileBitmap;
Sprite_Character.prototype.setTileBitmap = function() {
    _mog_oppai_sprtChar_setTileBitmap.call(this);
	this._character._oppaiData.enabled = false;
};

//==============================
// * need Remove Oppai Sprite
//==============================
Sprite_Character.prototype.needRemoveOppaiSprite = function() {
   if (!this._oppaiBody) {return false};
   if (!this._character) {return true};
   if (!this._character._oppaiData.enabled) {return true};
   return false;
};

//==============================
// * remove Oppai Sprite
//==============================
Sprite_Character.prototype.removeOppaiSprite = function() {
	for (var i = 0; i < this._oppaiBody.length; i++) {
		 this.removeChild(this._oppaiBody[i])
    }; 
	this._oppaiBody = null;
};

//==============================
// * set Character Bitmap
//==============================
var _mog_oppai_sprtChar_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
Sprite_Character.prototype.setCharacterBitmap = function() {
    _mog_oppai_sprtChar_setCharacterBitmap.call(this);
	if (this._oppaiBody){
	    this.setOppaiBitmap(this._oppaiBody[0]);
    	this.setOppaiBitmap(this._oppaiBody[1]);
	};
};

//==============================
// * set Oppai Bitmap
//==============================
Sprite_Character.prototype.setOppaiBitmap = function(sprite) {
      var pw = this.patternHeight();
      var ph = this.patternWidth();
	  sprite.bitmap = new Bitmap(pw ,ph);
      sprite.scale.x = this._character._oppaiData.bustSize;
	  sprite.scale.y = this._character._oppaiData.bustSize;	  
	  this.setOppaiFrame(sprite);
};

//==============================
// * update Oppai Body
//==============================
Sprite_Character.prototype.updateOppaiBody = function(sprite) {
      if (!sprite.bitmap) {
	      this.setOppaiBitmap(sprite);
	  } else {
          if (this.needRefreshOppaiBitmap()) {this.setOppaiFrame(sprite)};
	      this.updateOppaiPosition(sprite);
	  };
};