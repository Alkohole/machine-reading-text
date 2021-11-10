//=============================================================================
// MOG_EmotionFace.js
//=============================================================================

/*:
 * @plugindesc (v1.1) Adiciona faces emotivas nos sprites dos characters.
 * @author Moghunter
 *
 * @param -> Front 48px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 *
 * @param Pos X-axis Front 48px
 * @text Position X-axis Offset
 * @parent -> Front 48px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis da posição da esclera.
 * @default 0
 *
 * @param Pos Y-axis Front 48px
 * @text Position Y-axis Offset
 * @parent -> Front 48px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição Y-axis da posição da esclera.
 * @default 0
 *
 * @param Rect X Front White 48px
 * @text Rect X Sclera
 * @parent -> Front 48px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis origin da esclera.
 * @default -30
 *
 * @param Rect Y Front White 48px
 * @text Rect Y Sclera
 * @parent -> Front 48px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição Y-axis origin da esclera.
 * @default -21
 *
 * @param Rect X Front Iris 48px
 * @text Rect X Iris
 * @parent -> Front 48px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis origin da íris.
 * @default -32
 *
 * @param Rect Y Front Iris 48px
 * @text Rect Y Iris
 * @parent -> Front 48px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis origin da íris.
 * @default -26
 *
 * @param Rect X Front Iris Left Eye 48px
 * @text Rect X Iris Left Eye
 * @parent -> Front 48px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis origin da íris do olho esquerdo.
 * @default 12
 *
 * @param
 * 
 * @param -> Side 48px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Pos X-axis Side 48px
 * @text Position X-axis Offset
 * @parent -> Side 48px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis da posição da esclera.
 * @default 0
 *
 * @param Pos Y-axis Side 48px
 * @text Position Y-axis Offset
 * @parent -> Side 48px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição Y-axis da posição da esclera.
 * @default 0
 *
 * @param Rect X Side White 48px
 * @text Rect X Sclera
 * @parent -> Side 48px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis origin da esclera.
 * @default -30
 *
 * @param Rect Y Side White 48px
 * @text Rect Y Sclera
 * @parent -> Side 48px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição Y-axis origin da esclera.
 * @default -21
 *
 * @param Rect X Side Iris 48px
 * @text Rect X Iris
 * @parent -> Side 48px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis origin da íris.
 * @default -32
 *
 * @param Rect Y Side Iris 48px
 * @text Rect Y Iris
 * @parent -> Side 48px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis origin da íris.
 * @default -26
 *
 * @param Rect X Side Iris Left Eye 48px
 * @text Rect X Iris Left Eye
 * @parent -> Side 48px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis origin da íris do olho esquerdo.
 * @default 12
 *
 * @param
 * 
 * @param -> Front 64px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 *
 * @param Pos X-axis Front 64px
 * @text Position X-axis Offset
 * @parent -> Front 64px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis da posição da esclera.
 * @default 0
 *
 * @param Pos Y-axis Front 64px
 * @text Position Y-axis Offset
 * @parent -> Front 64px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição Y-axis da posição da esclera.
 * @default 0
 *
 * @param Rect X Front White 64px
 * @text Rect X Sclera
 * @parent -> Front 64px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis origin da esclera.
 * @default -30
 *
 * @param Rect Y Front White 64px
 * @text Rect Y Sclera
 * @parent -> Front 64px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição Y-axis origin da esclera.
 * @default 24
 *
 * @param Rect X Front Iris 64px
 * @text Rect X Iris
 * @parent -> Front 64px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis origin da íris.
 * @default -39
 *
 * @param Rect Y Front Iris 64px
 * @text Rect Y Iris
 * @parent -> Front 64px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis origin da íris.
 * @default 26
 *
 * @param Rect X Front Iris Left Eye 64px
 * @text Rect X Iris Left Eye
 * @parent -> Front 64px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis origin da íris do olho esquerdo.
 * @default 12
 *
 * @param
 * 
 * @param -> Side 64px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Pos X-axis Side 64px
 * @text Position X-axis Offset
 * @parent -> Side 64px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis da posição da esclera.
 * @default 0
 *
 * @param Pos Y-axis Side 64px
 * @text Position Y-axis Offset
 * @parent -> Side 64px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição Y-axis da posição da esclera.
 * @default 0
 *
 * @param Rect X Side White 64px
 * @text Rect X Sclera
 * @parent -> Side 64px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis origin da esclera.
 * @default -30
 *
 * @param Rect Y Side White 64px
 * @text Rect Y Sclera
 * @parent -> Side 64px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição Y-axis origin da esclera.
 * @default 24
 *
 * @param Rect X Side Iris 64px
 * @text Rect X Iris
 * @parent -> Side 64px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis origin da íris.
 * @default -39
 *
 * @param Rect Y Side Iris 64px
 * @text Rect Y Iris
 * @parent -> Side 64px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis origin da íris.
 * @default 26
 *
 * @param Rect X Side Iris Left Eye 64px
 * @text Rect X Iris Left Eye
 * @parent -> Side 64px Size <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição X-axis origin da íris do olho esquerdo.
 * @default 12
 *
 * @help  
 * =============================================================================
 * +++ MOG Emotion Face (v1.1) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Adiciona faces emotivas nos sprites dos characters, sem a necessidade
 * editar as imagens.
 * Compatível com characters de tamanho padrão 48px e 64px.
 * 
 * ============================================================================
 * * PLUGIN COMMAND
 * ============================================================================ 
 * Utilize o comando abaixo para ativar as faces nos personagens.
 * 
 * player_face : PLAYER_INDEX : FACE_TYPE : LEFT_EYE_VISIBLE : RIGHT_EYE_VISIBLE
 *
 * PLAYER_INDEX - Index dos personagens (0....)
 * FACE_TYPE - (0..12)
 *      0 - Olhando para direita.
 *      1 - Olhando para esquerda.
 *      2 - Olhando para cima.
 *      3 - Olhando para baixo.
 *      4 - Assustado.
 *      5 - Piscar esquerda.
 *      6 - Piscar direita.
 *      7 - Piscar ambos.
 *      8 - Cara de bravo.
 *      9 - Cansado.
 *      10 - Chorando.
 *      11 - Ahegao
 *      12 - Branco.
 *
 * LEFT_EYE_VISIBLE - Olho esquerdo visível (true / false).
 * RIGHT_EYE_VISIBLE - Olho direito visível (true / false). 
 *
 * Ex
 * player_face : 0 : 7 : true : true
 *
 * ============================================================================ 
 * Utilize o comando abaixo para ativar a face nos eventos.
 *
 * event_face : EVENT_ID : FACE_TYPE : LEFT_EYE_VISIBLE : RIGHT_EYE_VISIBLE
 *
 * ============================================================================ 
 * * REMOVER AS FACES
 * ============================================================================ 
 * Utilize o plugin commando abaixo para remover as faces.
 *
 * player_face_clear : PLAYER_INDEX
 *
 * event_face_clear : EVENT_ID
 *
 * ============================================================================
 * * SCRIPT COMMAND (EVENTS)
 * ============================================================================
 * É possíve ativar as faces usando o script comando através da rota de 
 * movimento.
 *
 * this.setFace(mode,left_Eye,right_Eye)
 *
 * Ex
 * this.setFace(4,true,true) 
 *
 * ============================================================================
 * Para remover a face use o comando abaixo.
 * 
 * this.removeFace()
 *
 * ============================================================================
 * * COMENTÁRIOS
 * ============================================================================
 * Utilize o comentário abaixo para ativar automaticamente as faces nos eventos.
 *        
 * face : MODE : LEFT_EYE_VISIBLE : RIGHT_EYE_VISIBLE
 *
 * ============================================================================
 * * OPCIONAL - (X & Y Axis offset)
 * ============================================================================ 
 * Utilize os comandos abaixos caso queira definir uma posição especifica para
 * as faces.
 * 
 * player_face : ID : FACE : L_EYE : R_EYE : X1_OFF : Y1_OFF : X2_OFF : Y2_OFF
 * event_face : ID : FACE : L_EYE : R_EYE : X1_OFF : Y1_OFF : X2_OFF : Y2_OFF
 * this.setFace(mode,left_Eye,right_Eye,x1_off,y1_off,x2_off,y2_off)
 *
 * ID      - PLAYER_ID
 * FACE    - FACE_TYPE
 * L_EYES  - LEFT_EYE_VISIBLE
 * R_EYES  - RIGHT_EYE_VISIBLE 
 * X1_OFF  - X-Axis offset no modo frontal.
 * Y1_OFF  - Y-Axis offset no modo frontal.
 * X2_OFF  - X-Axis offset no modo lateral.
 * Y2_OFF  - Y-Axis offset no modo lateral. 
 *
 * Ex
 * player_face : 0 : 4 : true : true : 10 : 10 : 0 : 10
 * evebt_face : 0 : 4 : true : true : 10 : 10 : 0 : 10
 * this.setFace(3,true,true,10,10,10,10)
 *
 * ============================================================================
 * - WHAT'S  NEW (version 1.1) 
 * ============================================================================
 * - (BUG FIX) - Correção do valor "Default" do plugin parameter nos 
 *               characters de 64px.
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_EmotionFace = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_EmotionFace');
	Moghunter.face_RectX_48_F1 = Number(Moghunter.parameters['Rect X Front White 48px'] || -30);
	Moghunter.face_RectY_48_F1 = Number(Moghunter.parameters['Rect Y Front White 48px'] || -21);
	Moghunter.face_RectX_48_F2 = Number(Moghunter.parameters['Rect X Front Iris 48px'] || -32);
	Moghunter.face_RectY_48_F2 = Number(Moghunter.parameters['Rect Y Front Iris 48px'] || -26);	
	Moghunter.face_RectX_48_F3 = Number(Moghunter.parameters['Rect X Front Iris Left Eye 48px'] || 12);
	Moghunter.face_PosX_48_F = Number(Moghunter.parameters['Pos X-axis Front 48px'] || 0);
	Moghunter.face_PosY_48_F = Number(Moghunter.parameters['Pos Y-axis Front 48px'] || 0);
	
	
	Moghunter.face_RectX_48_S1 = Number(Moghunter.parameters['Rect X Side White 48px'] || -30);
	Moghunter.face_RectY_48_S1 = Number(Moghunter.parameters['Rect Y Side White 48px'] || -21);
	Moghunter.face_RectX_48_S2 = Number(Moghunter.parameters['Rect X Side Iris 48px'] || -32);
	Moghunter.face_RectY_48_S2 = Number(Moghunter.parameters['Rect Y Side Iris 48px'] || -26);
	Moghunter.face_RectX_48_S3 = Number(Moghunter.parameters['Rect X Front Iris Left Eye 48px'] || 12);
	Moghunter.face_PosX_48_S = Number(Moghunter.parameters['Pos X-axis Side 48px'] || 0);
	Moghunter.face_PosY_48_S = Number(Moghunter.parameters['Pos Y-axis Side 48px'] || 0);   

	Moghunter.face_RectX_64_F1 = Number(Moghunter.parameters['Rect X Front White 64px'] || -30);
	Moghunter.face_RectY_64_F1 = Number(Moghunter.parameters['Rect Y Front White 64px'] || 24);
	Moghunter.face_RectX_64_F2 = Number(Moghunter.parameters['Rect X Front Iris 64px'] || -39);
	Moghunter.face_RectY_64_F2 = Number(Moghunter.parameters['Rect Y Front Iris 64px'] || 26);	
	Moghunter.face_RectX_64_F3 = Number(Moghunter.parameters['Rect X Front Iris Left Eye 64px'] || 12);
	Moghunter.face_PosX_64_F = Number(Moghunter.parameters['Pos X-axis Front 64px'] || 0);
	Moghunter.face_PosY_64_F = Number(Moghunter.parameters['Pos Y-axis Front 64px'] || 0); 
	
	Moghunter.face_RectX_64_S1 = Number(Moghunter.parameters['Rect X Side White 64px'] || -30);
	Moghunter.face_RectY_64_S1 = Number(Moghunter.parameters['Rect Y Side White 64px'] || 24);
	Moghunter.face_RectX_64_S2 = Number(Moghunter.parameters['Rect X Side Iris 64px'] || -39);
	Moghunter.face_RectY_64_S2 = Number(Moghunter.parameters['Rect Y Side Iris 64px'] || 26);
	Moghunter.face_RectX_64_S3 = Number(Moghunter.parameters['Rect X Side Iris Left Eye 64px'] || 12);
	Moghunter.face_PosX_64_S = Number(Moghunter.parameters['Pos X-axis Side 64px'] || 0);
	Moghunter.face_PosY_64_S = Number(Moghunter.parameters['Pos Y-axis Side 64px'] || 0); 
		
//==============================
// * face PluginCommand
//==============================
Game_Interpreter.prototype.facePluginCommand = function(command, args) {
   if (command === "player_face")  {
	   var id = args[1] != null ? Number(args[1]) : 0;
       var char = this.getPlayerChar(id);
	   if (char) {this.setFaceDataChar(args,char)};
   } else if (command === "player_face_clear")  {
	   var id = args[1] != null ? Number(args[1]) : 0;
       var char = this.getPlayerChar(id);
	   if (char && char._faceData.enabled) {char._faceData.needRemove = true};   
   } else if (command === "event_face")  {
	   var id = args[1] != null ? Number(args[1]) : 0;
	   var char = this.getEventChar(id);
	   if (char) {this.setFaceDataChar(args,char)};
   } else if (command === "event_face_clear")  {    
	   var id = args[1] != null ? Number(args[1]) : 0;
	   var char = this.getEventChar(id);
	   if (char && char._faceData.enabled) {char._faceData.needRemove = true};    
   };
};

//==============================
// * set Face Data Char
//==============================
Game_Interpreter.prototype.setFaceDataChar = function(args,char) {
	   var mode = args[3] != null ? args[3] : 0;
	   var eleft = args[5] != null ? args[5] : true;
	   var eright = args[7] != null ? args[7] : true;	   
	   var x1 = args[9] != null ? args[9] : 0;
	   var y1 = args[11] != null ? args[11] : 0;
	   var x2 = args[13] != null ? args[13] : 0;
	   var y2 = args[15] != null ? args[15] : 0;
	   char._faceData.enabled = true;
	   char._faceData.mode = Number(mode);
	   char._faceData.eyeL = String(eleft) == "true" ? true : false;
	   char._faceData.eyeR = String(eright) == "true" ? true : false;
	   char._faceData.x = Number(x1);
	   char._faceData.y = Number(y1);
	   char._faceData.x2 = Number(x2);
	   char._faceData.y2 = Number(y2);	
	   char._faceData.needRefresh = true;
}
	
//==============================
// * get Player Char
//==============================
Game_Interpreter.prototype.getPlayerChar = function(id) {	 
     var char = null;
	 var actor = $gameParty.members()[id];
	 if (actor) {
		 if (id == 0) {char = $gamePlayer
		 } else {char = $gamePlayer.followers().follower(id - 1);
		 };
	 };
	 return char;
};	
	 
//==============================
// * get Event Char
//==============================
Game_Interpreter.prototype.getEventChar = function(event_id) {	 
     var ev = null;
	 $gameMap.events().forEach(function(event) { 
	 if (event.eventId() == event_id) {ev = event};
	 }, this);
	 return ev;
};

//==============================
// * PluginCommand
//==============================
var _mog_face_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_mog_face_pluginCommand.call(this,command, args)
	this.facePluginCommand(command, args);
	return true;
};

//=============================================================================
// ** Character Base
//=============================================================================

//==============================
// * Init Members
//==============================
var _mog_face_cbase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
    _mog_face_cbase_initMembers.call(this);
	this.initFaceData();
};
	
//==============================
// * Init Face Data
//==============================
Game_CharacterBase.prototype.initFaceData = function() {
    this._faceData = {};
	this._faceData.enabled = false;
	this._faceData.x = 0;
	this._faceData.y = 0;
	this._faceData.x2 = 0;
	this._faceData.y2 = 0;	
	this._faceData.realX = 0;
	this._faceData.realY = 0; 
	this._faceData.mode = 0;
	this._faceData.eyeL = true;
	this._faceData.eyeR = true;
	this._faceData.needRefresh = false;
	this._faceData.direction = -1;
	this._faceData.needRemove = false;
};

//==============================
// * set Face
//==============================
Game_CharacterBase.prototype.setFace = function(mode,eleft,eright,x1,y1,x2,y2) {
	   var mode = mode != null ? mode : 0;
	   var eleft = eleft != null ? eleft : true;
	   var eright = eright != null ? eright : true;	   
	   var x1 = x1 != null ? x1 : 0;
	   var y1 = y1 != null ? y1 : 0;
	   var x2 = x2 != null ? x2 : 0;
	   var y2 = y2 != null ? y2 : 0;
	   this._faceData.enabled = true;
	   this._faceData.mode = Number(mode);
	   this._faceData.eyeL = String(eleft) == "true" ? true : false;
	   this._faceData.eyeR = String(eright) == "true" ? true : false;
	   this._faceData.x = Number(x1);
	   this._faceData.y = Number(y1);
	   this._faceData.x2 = Number(x2);
	   this._faceData.y2 = Number(y2);	
	   this._faceData.needRefresh = true;
};

//==============================
// * remove Face
//==============================
Game_CharacterBase.prototype.removeFace = function() {
     if (this._faceData.enabled) {this._faceData.needRemove = true};
};


//=============================================================================
// ** Game Event
//=============================================================================
	
//==============================
// * Setup Page
//==============================
var _mog_face_gevent_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_mog_face_gevent_setupPage.call(this);
    this.checkFaceComments();
};	

//==============================
// * check Face Comments
//==============================
Game_Event.prototype.checkFaceComments = function() {
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
	       if (l.code === 108) {var comment = l.parameters[0].split(' : ')
			    if (comment[0].toLowerCase() == "face"){
					var mode = comment[1] ? comment[1] : 0;					
				    var eleft = comment[2] != null ? comment[2] : true;
				    var eright = comment[3] != null ? comment[3] : true;	   
				    var x1 = comment[4] != null ? comment[4] : 0;
				    var y1 = comment[5] != null ? comment[5] : 0;
				    var x2 = comment[6] != null ? comment[6] : 0;
				    var y2 = comment[7] != null ? comment[7] : 0;	
    				this._faceData.enabled = true;
					this._faceData.mode = Number(mode);	
				    this._faceData.eyeL = String(eleft) == "true" ? true : false;
				    this._faceData.eyeR = String(eright) == "true" ? true : false;					
					this._faceData.x = Number(x1);
					this._faceData.y = Number(y1);
					this._faceData.x2 = Number(x2);	
					this._faceData.y2 = Number(y2);
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
var _mog_Face_sprChar_updateHalfBodySprites = Sprite_Character.prototype.updateHalfBodySprites;
Sprite_Character.prototype.updateHalfBodySprites = function() {
	_mog_Face_sprChar_updateHalfBodySprites.call(this);
	if (this._character) {this.updateFaceBase()};
};
	
//==============================
// * update Face Base
//==============================
Sprite_Character.prototype.updateFaceBase = function() {	
	if (this.canCreateFace()) {this.createFaceSprites()};
	if (this.needRemoveFaceSprite()) {this.removeFaceSprite()};
    if (this._faceBody) {
		for (var i = 0; i < this._faceBody.length; i++) {
		     this.updateFaceBody(this._faceBody[i])
		};
	};
	if (this._FaceField) {this._FaceField.y = this._character.pattern() == 1 ? -1 : 0};
	this._character._faceData.direction = this._character.direction();
	this._character._faceData.needRefresh = false;
	if (this._upperBody && !this._upperBody.mz) {this.sortFaceMZ()};
};

//==============================
// * update Face Body
//==============================
Sprite_Character.prototype.updateFaceBody = function(sprite) {
      if (!sprite.bitmap) {
	      this.setFaceBitmap(sprite);
	  } else {
		  if (this.needRefreshFaceFrame()) {this.setFaceFrame(sprite)};
		  if (this.needHideFace(sprite)) {sprite.visible = false};
	  };
};

//==============================
// * needHideFace
//==============================
Sprite_Character.prototype.needHideFace = function(sprite) {
   if (this._character.direction == 8) {return true};
   if (!this._character._faceData.eyeL) {
	   if (sprite.index == 1 || sprite.index == 3) {return true};
   };
   if (!this._character._faceData.eyeR) {
	   if (sprite.index == 0 || sprite.index == 2) {return true};
   };
   return false;
};


//==============================
// * needRefreshFaceFrame
//==============================
Sprite_Character.prototype.needRefreshFaceFrame = function(sprite) {
   if (this._character._faceData.direction != this._character.direction()) {return true};
   if (this._character._faceData.needRefresh) {return true};
   return false;
};

//==============================
// * need Refresh Face Bitmap
//==============================
Sprite_Character.prototype.needRefreshFaceBitmap = function() {
    if (this._character._faceData.direction != this._character.direction) {return true};
    return false;
};

//==============================
// * create Face Sprites
//==============================
Sprite_Character.prototype.createFaceSprites = function() {
	if (!this._FaceField) {
		this._FaceField = new Sprite();
		this._FaceField.mz = 15;
		this.addChild(this._FaceField);
    };
	if (!this._faceBody) {
		this._faceBody = [];
		for (var i = 0; i < 4; i++) {
			 this._faceBody[i] = new Sprite();
			 this._faceBody[i].index = i;
			 this._faceBody[i].anchor.x = 0.5;
			 this._faceBody[i].anchor.y = 0.5;
			 this._faceBody[i].visible = false;
			 this._FaceField.addChild(this._faceBody[i])
		};
	};
};

//==============================
// * sort Face MZ
//==============================
Sprite_Character.prototype.sortFaceMZ = function() {
	this._lowerBody.mz = 10;
	this._upperBody.mz = 11;
    this.children.sort(function(a, b){return a.mz-b.mz});
};

//==============================
// * can Create Face
//==============================
Sprite_Character.prototype.canCreateFace = function() {
   if (this._faceBody) {return false};
   if (!this._character) {return false};
   if (!this._character._faceData.enabled) {return false};
   if (!this.bitmap) {return false};
   if (this.patternHeight() == 0) {return false};
   if (this._character.isTransparent()) {return false};
   if (this._character.characterName() == '') {return false};
   return true;
};
//==============================
// * face Mode
//==============================
Sprite_Character.prototype.faceMode = function() {
   return this._character._faceData.mode;
};

//==============================
// * set Face Pos X
//==============================
Sprite_Character.prototype.setFacePosX = function(sprite,xf,rx,x) {
	return x + xf + rx + (11 * (sprite.index - 2)) + this._character._faceData.x;
};

//==============================
// * set Face Pos Y
//==============================
Sprite_Character.prototype.setFacePosY = function(sprite,yf,ry,y) {
	return y + ry + yf + this._character._faceData.y;
};

//==============================
// * set Face Frame
//==============================
Sprite_Character.prototype.setFaceFrame = function(sprite) {
    var pw = this.patternHeight();
    var ph = this.patternWidth();
    var sx = (this.characterBlockX() + 1) * pw;
    var sy = (this.characterBlockY()) * ph;	
	var bx = pw - 31;
	if (this.patternHeight() >= 60) {      
	    var by = ph - (this.patternHeight() - 40);
	} else {
	    var by = ph - 12;
	};
	sprite.bitmap.clear();
	sprite.visible = true;
	if (sprite.index < 2) {
	    this.setBitmapEyesBack(sprite,sx,sy,pw,ph)
	} else {
		this.setBitmapEyes(sprite,sx,sy,pw,ph)
	};	
	this.setFacePosition(sprite);
	if (this.needHideFace(sprite)) {sprite.visible = false};
};
	
//==============================
// * set Face Frame Front
//==============================
Sprite_Character.prototype.setFaceFrameFront = function(sprite,pw,ph,sx,sy,bx,by) {
	if (sprite.index < 2) {
	    this.setBitmapEyesBack(sprite,sx,sy,pw,ph)
	} else {
		this.setBitmapEyes(sprite,sx,sy,pw,ph)
	};
};

//==============================
// * set Bitmap Eyes Back
//==============================
Sprite_Character.prototype.setBitmapEyesBack = function(sprite,sx,sy,pw,ph) {	
		if (this._character.direction() == 2) {
		    this.setBitmapEyesBackFront(sprite,sx,sy,pw,ph);
		} else {
			this.setBitmapEyesBackSide(sprite,sx,sy,pw,ph);
		};
};
	
//==============================
// * set Bitmap Eyes Back Front
//==============================	
Sprite_Character.prototype.setBitmapEyesBackFront = function(sprite,sx,sy,pw,ph) {	
		if (this.patternHeight() >= 60) {
			var bx = pw + Moghunter.face_RectX_64_F1;
			var by = ph - this.patternHeight() + Moghunter.face_RectY_64_F1;
			var wx = 1;
			var wy = 6;
		} else {
			var bx = pw + Moghunter.face_RectX_48_F1;
			var by = ph + Moghunter.face_RectY_48_F1;
			var wx = 1;
			var wy = 1;
		};		
		if (this.faceMode() == 5) {
    	    sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,wx,wy,0,0,6,6);
		    if (sprite.index == 1) {
				this.setBitmapEyeBackWhite(sprite,5,4)

			} else {;
                this.setBitmapEyesBackFrontHp(sprite,sx,sy,pw,ph)
			};
		} else if (this.faceMode() == 6) {
    	    sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,wx,wy,0,0,6,6);
		    if (sprite.index == 0) {
				this.setBitmapEyeBackWhite(sprite,5,4)
			} else {;
                this.setBitmapEyesBackFrontHp(sprite,sx,sy,pw,ph);
			};	
		} else if (this.faceMode() == 7) {
			sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,wx,wy,0,0,6,6);
			this.setBitmapEyesBackFrontHp(sprite,sx,sy,pw,ph);
		} else if (this.faceMode() == 8) {
		} else if (this.faceMode() == 9) {
			sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,1,1,0,0,6,4);
			var color = "#FFFFFF"
	        sprite.bitmap.fillRect(0,2,5,3,color);
			var color = "#200000"
			sprite.bitmap.fillRect(0,2,5,1,color);
		} else if (this.faceMode() == 10) {
			sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,1,1,0,0,6,4);
			this.setBitmapEyeBackWhite(sprite,5,6);
	  	    var color = "#FFFFFF"
			if (sprite.index == 0) {
		        sprite.bitmap.fillRect(1,2,4,5,color);
		    	sprite.bitmap.fillRect(2,3,3,5,color);
			    sprite.bitmap.fillRect(3,4,2,4,color);
			} else {
		        sprite.bitmap.fillRect(0,2,4,5,color);
		    	sprite.bitmap.fillRect(0,3,3,5,color);
			    sprite.bitmap.fillRect(0,2,2,4,color);				
			};
		} else if (this.faceMode() == 11) {
			sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,1,1,0,0,6,4);
			this.setBitmapEyeBackWhite(sprite,5,2);
	  	    var color = "#FFFFFF"
			sprite.bitmap.fillRect(0,2,1,1,color);
			sprite.bitmap.fillRect(4,2,1,1,color);
			if (sprite.index == 0) {
				var color = "#500000"
			    sprite.bitmap.fillRect(7,6,3,2,color);
				var color = "#700000"
				sprite.bitmap.fillRect(7,7,3,1,color);
				var color = "#FF9000"
				sprite.bitmap.fillRect(0,4,3,1,color);				
				sprite.bitmap.fillRect(13,4,3,1,color);	
			};
		} else {
			sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,1,1,0,0,6,4);
            this.setBitmapEyeBackWhite(sprite,5,4);
		};
};

//==============================
// * set Bitmap Eyes Back HP
//==============================	
Sprite_Character.prototype.setBitmapEyesBackFrontHp = function(sprite,sx,sy,pw,ph) {	
	 var color = "#200000"
	 sprite.bitmap.fillRect(0,3,1,1,color);
	 sprite.bitmap.fillRect(1,2,4,1,color);
	 sprite.bitmap.fillRect(5,3,1,1,color);	
};
		
//==============================
// * set Bitmap Eye Back White
//==============================	
Sprite_Character.prototype.setBitmapEyeBackWhite = function(sprite,w,h) {	
      var color = "#FFFFFF"
	  sprite.bitmap.fillRect(0,0,w,h,color);
};

//==============================
// * set Bitmap Eyes Back Side
//==============================	
Sprite_Character.prototype.setBitmapEyesBackSide = function(sprite,sx,sy,pw,ph) {	
		var color = "#200000"
		if (this.patternHeight() >= 60) {
			var bx = pw + Moghunter.face_RectX_64_S1;
			var by = ph - this.patternHeight() + Moghunter.face_RectY_64_S1;
		} else {
			var bx = pw + Moghunter.face_RectX_48_S1;
			var by = ph + Moghunter.face_RectY_48_S1;
		};		
		sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,1,1,0,0,3,5);
		if (this.faceMode() == 5) {
			sprite.bitmap.fillRect(0,3,1,1,color);
			sprite.bitmap.fillRect(1,2,3,1,color);
		} else if (this.faceMode() == 6) {
			sprite.bitmap.fillRect(0,2,3,1,color);
			sprite.bitmap.fillRect(3,3,1,1,color);
		} else if (this.faceMode() == 7) {
				if (this._character.direction() == 4) {	
	    			sprite.bitmap.fillRect(0,2,3,1,color);
				    sprite.bitmap.fillRect(3,3,1,1,color);
				} else {
					sprite.bitmap.fillRect(0,3,1,1,color);
					sprite.bitmap.fillRect(1,2,3,1,color);					
				};
		} else if (this.faceMode() == 9) {		
			var color = "#FFFFFF"
	        sprite.bitmap.fillRect(0,2,5,2,color);
			var color = "#200000"
			sprite.bitmap.fillRect(0,1,5,1,color);
		} else if (this.faceMode() == 10) {		
            this.setBitmapEyeBackWhite(sprite,3,8);
	  	    var color = "#FFFFFF"
			if (this._character.direction() == 4) {
		        sprite.bitmap.fillRect(1,4,3,6,color);
		    	sprite.bitmap.fillRect(2,5,2,5,color);
			    sprite.bitmap.fillRect(3,6,1,4,color);
			} else {
		        sprite.bitmap.fillRect(0,4,3,6,color);
		    	sprite.bitmap.fillRect(0,5,2,5,color);
			    sprite.bitmap.fillRect(0,6,1,4,color);				
			};
		} else if (this.faceMode() == 11) {		
            this.setBitmapEyeBackWhite(sprite,4,2);
	  	    var color = "#FFFFFF"
 			if (sprite.index == 0) {
				sprite.bitmap.fillRect(0,2,1,1,color);	
				var color = "#500000"
				sprite.bitmap.fillRect(0,7,3,1,color);
				var color = "#700000"
				sprite.bitmap.fillRect(0,8,3,1,color);
			} else {
				sprite.bitmap.fillRect(3,2,1,1,color);	
				var color = "#500000"
				sprite.bitmap.fillRect(0,7,3,1,color);
				var color = "#700000"
				sprite.bitmap.fillRect(0,8,3,1,color);
			};
		} else {
			this.setBitmapEyeBackWhite(sprite,3,5);
		};
};

//==============================
// * set Bitmap Eyes
//==============================
Sprite_Character.prototype.setBitmapEyes = function(sprite,sx,sy,pw,ph) {
	if (this._character.direction() == 2) {
		this.setBitmapEyesFront(sprite,sx,sy,pw,ph);
	} else {
		this.setBitmapEyesSide(sprite,sx,sy,pw,ph);
	};
};
	
//==============================
// * set Bitmap Eyes Front
//==============================
Sprite_Character.prototype.setBitmapEyesFront = function(sprite,sx,sy,pw,ph) {	
	if (this.patternHeight() >= 60) {
	    var es = sprite.index == 3 ? Moghunter.face_RectX_64_F3 : 0;
	    var bx = pw + es + Moghunter.face_RectX_64_F2;      
	    var by = ph - this.patternHeight() + Moghunter.face_RectY_64_F2;		  
	} else {
		var es = sprite.index == 3 ? Moghunter.face_RectX_48_F3 : 0; 
		var bx = pw + es + Moghunter.face_RectX_48_F2 ;
		var by = ph + Moghunter.face_RectY_48_F2 ;
	};
	if (this.faceMode() == 2) {
    	sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,3,4,0,0,3,2);
	} else if (this.faceMode() == 3) {
    	sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,3,4,0,0,3,3);	
	} else if (this.faceMode() == 4) {
    	sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,3,4,0,0,3,2);		
	} else if (this.faceMode() == 8) {
		var color = "#400000"
		if (sprite.index == 2) {
			sprite.bitmap.fillRect(2,0,2,3,color);
			sprite.bitmap.fillRect(3,1,2,3,color);
			sprite.bitmap.fillRect(4,2,1,2,color);		
			sprite.bitmap.fillRect(5,3,1,1,color);
			sprite.bitmap.fillRect(6,4,1,1,color);
		} else {;
			sprite.bitmap.fillRect(4,0,2,3,color);
			sprite.bitmap.fillRect(3,1,2,3,color);
			sprite.bitmap.fillRect(2,2,1,2,color);
			sprite.bitmap.fillRect(1,3,1,1,color);
			sprite.bitmap.fillRect(0,3,1,1,color);
		};
    } else if (this.faceMode() == 9) {
		sprite.bitmap.blt(this.bitmap,sx + bx,sy + by + 2,3,1,0,0,3,2);
    } else if (this.faceMode() == 10) {
		sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,3,4,0,0,3,2);	
    } else if (this.faceMode() == 11) {
		sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,3,4,0,0,3,2);			
	} else {
		sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,3,4,0,0,3,4);
	}
};

//==============================
// * set Bitmap Eyes Side
//==============================
Sprite_Character.prototype.setBitmapEyesSide = function(sprite,sx,sy,pw,ph) {	
	if (this.patternHeight() >= 60) {      
	    var es = sprite.index == 3 ? Moghunter.face_RectX_64_S3 : 0;
	    var bx = pw + es + Moghunter.face_RectX_64_S2;      
	    var by = ph - this.patternHeight() + Moghunter.face_RectY_64_S2;		
	} else {
		var es = sprite.index == 3 ? Moghunter.face_RectX_48_S3 : 0; 
		var bx = pw + es + Moghunter.face_RectX_48_S2;
		var by = ph + Moghunter.face_RectY_48_S2;
	};
	if (this.faceMode() == 2) {
	    sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,2,5,0,0,2,3);
	} else if (this.faceMode() == 4) {
	    sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,2,5,0,0,2,3);
	} else if (this.faceMode() == 8) {
		var color = "#400000"
		if (this._character.direction() == 4) {
			sprite.bitmap.fillRect(6,0,2,1,color);
			sprite.bitmap.fillRect(5,1,2,1,color);
			sprite.bitmap.fillRect(4,2,1,1,color);		
			sprite.bitmap.fillRect(3,3,1,1,color);
			sprite.bitmap.fillRect(2,4,1,1,color);
		} else {;
			sprite.bitmap.fillRect(2,0,2,1,color);
			sprite.bitmap.fillRect(3,1,2,1,color);
			sprite.bitmap.fillRect(4,2,1,1,color);		
			sprite.bitmap.fillRect(5,3,1,1,color);
			sprite.bitmap.fillRect(6,4,1,1,color);		 
		};	
	} else if (this.faceMode() == 9) {
		sprite.bitmap.blt(this.bitmap,sx + bx,sy + by + 2,2,2,0,2,2,2);
	} else if (this.faceMode() == 10) {
	    sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,2,5,0,0,2,3);	
	} else if (this.faceMode() == 11) {
	    sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,3,5,0,0,3,3);			
	} else {
		sprite.bitmap.blt(this.bitmap,sx + bx,sy + by,2,5,0,0,2,5);
	};
};

//==============================
// * set Face Pos Right
//==============================
Sprite_Character.prototype.setFacePosRight = function(sprite) {
	var bsize = this.patternHeight() < 60 ? false : true;
	var esX = !bsize ? Moghunter.face_PosX_48_S : Moghunter.face_PosX_64_S;
	var esY = !bsize ? Moghunter.face_PosY_48_S : Moghunter.face_PosY_64_S;	
	var xf = (this.patternWidth() / 2) + esX;
	var yf = (this.patternHeight() / 2) + esY;
	var rx = !bsize ? 4 : 5;
	var ry = !bsize ? -26 : -38;
	if (sprite.index == 1 || sprite.index == 3) {sprite.visible = false};
	if (sprite.index < 2) {
  	    sprite.x = xf + rx + this._character._faceData.x2;
		sprite.y = ry + yf + this._character._faceData.y2;	
		 if (this.faceMode() == 6 || this.faceMode() == 8) {
			sprite.visible = false;	
		 };		
	} else {
	    if (this.faceMode() == 0) {
			sprite.x = -1 + xf + rx + this._character._faceData.x2;
			sprite.y = ry + yf + this._character._faceData.y2;				
		} else if (this.faceMode() == 1) {			
			sprite.x = 1 + xf + rx + this._character._faceData.x2;
			sprite.y = ry + yf + this._character._faceData.y2;	
		} else if (this.faceMode() == 2) {			
			sprite.x = 1 + xf + rx + this._character._faceData.x2;
			sprite.y = ry + yf + this._character._faceData.y2;
		} else if (this.faceMode() == 3) {			
			sprite.x = 1 + xf + rx + this._character._faceData.x2;
			sprite.y = 2 + ry + yf + this._character._faceData.y2;
		} else if (this.faceMode() == 4) {			
			sprite.x = 1 + xf + rx + this._character._faceData.x2;
			sprite.y = 1 + ry + yf + this._character._faceData.y2;	
		} else if (this.faceMode() == 5) {			
			sprite.visible = false;		
		} else if (this.faceMode() == 6) {			
			sprite.visible = false;							
		} else if (this.faceMode() == 7) {	
		    sprite.visible = false;
		} else if (this.faceMode() == 8) {	
			sprite.x = -2 + xf + rx + this._character._faceData.x2;
			sprite.y = -2 + ry + yf + this._character._faceData.y2;	
		} else if (this.faceMode() == 9) {	
			sprite.x = 1 + xf + rx + this._character._faceData.x2;
			sprite.y = ry + yf + this._character._faceData.y2;
		} else if (this.faceMode() == 10) {			
			sprite.x = 1 + xf + rx + this._character._faceData.x2;
			sprite.y = 1 + ry + yf + this._character._faceData.y2;
		} else if (this.faceMode() == 11) {			
			sprite.x = 0 + xf + rx + this._character._faceData.x2;
			sprite.y = -1 + ry + yf + this._character._faceData.y2;											
		} else {	
		    sprite.visible = false;						
		};
	};
};

//==============================
// * set Face Pos Left
//==============================
Sprite_Character.prototype.setFacePosLeft = function(sprite) {
	var bsize = this.patternHeight() < 60 ? false : true
	var esX = !bsize ? Moghunter.face_PosX_48_S : Moghunter.face_PosX_64_S;
	var esY = !bsize ? Moghunter.face_PosY_48_S : Moghunter.face_PosY_64_S;	
	var xf = (this.patternWidth() / 2) - esX;
	var yf = (this.patternHeight() / 2) + esY;
	var rx = !bsize ? -8 : -7;
	var ry = !bsize ? -26 : -38;
	if (sprite.index == 0 || sprite.index == 2) {sprite.visible = false};
	if (sprite.index < 2) {
  	    sprite.x = xf + rx - this._character._faceData.x2;
		sprite.y = ry + yf + this._character._faceData.y2;
		 if (this.faceMode() == 5 || this.faceMode() == 8) {
			sprite.visible = false;	 
    	 };
	} else {
	    if (this.faceMode() == 0) {
			sprite.x = xf + rx - this._character._faceData.x2;
			sprite.y = ry + yf + this._character._faceData.y2;				
		} else if (this.faceMode() == 1) {
			sprite.x = 2 + xf + rx - this._character._faceData.x2;
			sprite.y = ry + yf + this._character._faceData.y2;
		} else if (this.faceMode() == 2) {
			sprite.x = xf + rx - this._character._faceData.x2;
			sprite.y = ry + yf + this._character._faceData.y2;
		} else if (this.faceMode() == 3) {
			sprite.x = xf + rx - this._character._faceData.x2;
			sprite.y = 2 + ry + yf + this._character._faceData.y2;		
		} else if (this.faceMode() == 4) {
			sprite.x = xf + rx - this._character._faceData.x2;
			sprite.y = 1 + ry + yf + this._character._faceData.y2;	
		} else if (this.faceMode() == 5) {
			sprite.x = xf + rx - this._character._faceData.x2;
			sprite.y = ry + yf + this._character._faceData.y2;	
		} else if (this.faceMode() == 6) {
	 		 sprite.visible = false;										
		} else if (this.faceMode() == 7) {	
		    sprite.visible = false;
		} else if (this.faceMode() == 8) {	
			sprite.x = - 4 + xf + rx - this._character._faceData.x2;
			sprite.y = - 2 + ry + yf + this._character._faceData.y2;	
		} else if (this.faceMode() == 9) {	
			sprite.x = 1 + xf + rx - this._character._faceData.x2;
			sprite.y = ry + yf + this._character._faceData.y2;	
		} else if (this.faceMode() == 10) {
			sprite.x = xf + rx - this._character._faceData.x2;
			sprite.y = 1 + ry + yf + this._character._faceData.y2;	
		} else if (this.faceMode() == 11) {
			sprite.x = xf + rx - this._character._faceData.x2;
			sprite.y = -1 + ry + yf + this._character._faceData.y2;								
		} else {	
		    sprite.visible = false;				 
		};
	};
	
};

//==============================
// * set Face Pos Front
//==============================
Sprite_Character.prototype.setFacePosFront = function(sprite) {
	var bsize = this.patternHeight() < 60 ? false : true;
	var esX = !bsize ? Moghunter.face_PosX_48_F : Moghunter.face_PosX_64_F;
	var esY = !bsize ? Moghunter.face_PosY_48_F : Moghunter.face_PosY_64_F;
	var xf = (this.patternWidth() / 2) + esX;
	var yf = (1 + this.patternHeight() / 2) + esY;
	var rx = !bsize ? -9 : -8;
	var ry = !bsize ? -26 : -38;
	if (this.faceMode() == 5) {
	    if (sprite.index == 1 || sprite.index == 3) {sprite.visible = false};	
	} else if (this.faceMode() == 5) {
	    if (sprite.index == 0 || sprite.index == 2) {sprite.visible = false};			
	}
	if (sprite.index < 2) {
  	    sprite.x = xf + rx + (11 * sprite.index) + this._character._faceData.x;
	    if (this.faceMode() == 5 && sprite.index == 0) {	
		    sprite.y = -1 + ry + yf + this._character._faceData.y;
		} else if (this.faceMode() == 6 && sprite.index == 1) {	
		    sprite.y = -1 + ry + yf + this._character._faceData.y;	
		} else if (this.faceMode() == 7) {
			sprite.y = -1 + ry + yf + this._character._faceData.y;	
		} else if (this.faceMode() == 8) {
			sprite.y = -1 + ry + yf + this._character._faceData.y;
		} else if (this.faceMode() == 9) {
			sprite.y = -1 + ry + yf + this._character._faceData.y;										
		} else {
    		sprite.y = ry + yf + this._character._faceData.y;
		};
	} else {
		if (this.faceMode() == 0) {
		   sprite.x = this.setFacePosX(sprite,xf,rx,0);
		   sprite.y = this.setFacePosY(sprite,yf,ry,0);
		} else if (this.faceMode() == 1) {
		   sprite.x = this.setFacePosX(sprite,xf,rx,2);
		   sprite.y = this.setFacePosY(sprite,yf,ry,0);
		} else if (this.faceMode() == 2) {	
		   sprite.x = this.setFacePosX(sprite,xf,rx,1);
           sprite.y = this.setFacePosY(sprite,yf,ry,0);
		} else if (this.faceMode() == 3) {	
		   sprite.x = this.setFacePosX(sprite,xf,rx,1); 		   
		   sprite.y = this.setFacePosY(sprite,yf,ry,2);
		} else if (this.faceMode() == 4) {	
		   sprite.x = this.setFacePosX(sprite,xf,rx,1);
		   sprite.y = this.setFacePosY(sprite,yf,ry,1);
		} else if (this.faceMode() == 5) {	
		   sprite.x = this.setFacePosX(sprite,xf,rx,1);
		   sprite.y = this.setFacePosY(sprite,yf,ry,0);
		   if (sprite.index == 2) {sprite.visible = false};		
		} else if (this.faceMode() == 6) {	
		   sprite.x = this.setFacePosX(sprite,xf,rx,1);
           sprite.y = this.setFacePosY(sprite,yf,ry,0);
		   if (sprite.index == 3) {sprite.visible = false};			      		   		
		} else if (this.faceMode() == 7) {
		   sprite.visible = false;
		} else if (this.faceMode() == 8) {
		   sprite.x = this.setFacePosX(sprite,xf,rx,-1);
		   sprite.y = this.setFacePosY(sprite,yf,ry,-2);
		} else if (this.faceMode() == 9) {
		   sprite.x = this.setFacePosX(sprite,xf,rx,1);
		   sprite.y = this.setFacePosY(sprite,yf,ry,2);	
		} else if (this.faceMode() == 10) {
		   sprite.x = this.setFacePosX(sprite,xf,rx,1);
		   sprite.y = this.setFacePosY(sprite,yf,ry,1);
		} else if (this.faceMode() == 11) {
		   sprite.x = this.setFacePosX(sprite,xf,rx,1);
		   sprite.y = this.setFacePosY(sprite,yf,ry,-1);			   
    	} else {
		   sprite.visible = false;			   
		};
	};
};

//==============================
// * set Tile Bitmap
//==============================
var _mog_face_sprtChar_setTileBitmap = Sprite_Character.prototype.setTileBitmap;
Sprite_Character.prototype.setTileBitmap = function() {
    _mog_face_sprtChar_setTileBitmap.call(this);
	this._character._faceData.enabled = false;
};

//==============================
// * need Remove Face Sprite
//==============================
Sprite_Character.prototype.needRemoveFaceSprite = function() {
   if (!this._faceBody) {return false};
   if (!this._character) {return true};
   if (!this._character._faceData.enabled) {return true};
   if (this._character._faceData.needRemove) {return true};
   return false;
};

//==============================
// * remove Face Sprite
//==============================
Sprite_Character.prototype.removeFaceSprite = function() {
	for (var i = 0; i < this._faceBody.length; i++) {
		this._FaceField.removeChild(this._faceBody[i])
    }; 
	this._faceBody = null;
	this._character.initFaceData();
};

//==============================
// * set Character Bitmap
//==============================
var _mog_face_sprtChar_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
Sprite_Character.prototype.setCharacterBitmap = function() {
    _mog_face_sprtChar_setCharacterBitmap.call(this);
	if (this._faceBody){
	    this.setFaceBitmap(this._faceBody[0]);
    	this.setFaceBitmap(this._faceBody[1]);
	};
};

//==============================
// * set Face Bitmap
//==============================
Sprite_Character.prototype.setFaceBitmap = function(sprite) {
      var pw = this.patternHeight();
      var ph = this.patternWidth();
	  sprite.bitmap = new Bitmap(pw ,ph);
	  this.setFaceFrame(sprite);
};

//==============================
// * set Face Position
//==============================
Sprite_Character.prototype.setFacePosition = function(sprite) {
	sprite.visible = true;
	if (this._character.direction() == 8) {
		sprite.visible = false;
	} else if (this._character.direction() == 4) {
	    this.setFacePosLeft(sprite); 
	} else if (this._character.direction() == 6) {
	    this.setFacePosRight(sprite);
	} else  {
	     this.setFacePosFront(sprite);
	};
};