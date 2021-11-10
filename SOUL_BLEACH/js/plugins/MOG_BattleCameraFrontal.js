//=============================================================================
// MOG_BattleCameraFrontal.js
//=============================================================================

/*:
 * @plugindesc (v1.2) Adiciona o efeito de câmera de batalha.
 * @author Moghunter
 *
 * @param -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 *
 * @param Camera Speed
 * @desc Definição da velocidade da camera.
 * (0 - 100)    (Default - 30)
 * @default 30
 * @type number
 * @min 0
 * @max 100
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Depth Effect
 * @desc Ativar o efeito de profundidade nos sprites.
 * @default true
 * @type boolean 
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Depth Rate
 * @desc Definição da taxa de profundidade.
 * (0 - 6)    (Default - 6)
 * @default 6
 * @type number
 * @min 0
 * @max 6
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Actor Scale Offset
 * @desc Ajuste na taxa de zoom nos sprites dos aliados. (0-100)
 * @default 30
 * @type number
 * @min 0
 * @max 100
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param ATB Wait Focus
 * @desc Esperar o zoom focar no alvo para ativar o ATB.
 * Requer o plugin MOG_ATB
 * @default true
 * @type boolean 
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<< 
 * 
 * @param
 * 
 * @param -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 * 
 * @param Target X Offset
 * @desc Definição da posição X-axis da câmera no alvo.
 * (-9999   <->   9999)
 * @default 0
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<< 
 * 
 * @param Target Y Offset
 * @desc Definição da posição Y-Axis da câmera no alvo.
 * (-9999   <->   9999)
 * @default 40
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Idle X Offset
 * @desc Definição da posição X-axis no modo espera.
 * (-9999   <->   9999)
 * @default 0
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<< 
 * 
 * @param Idle Y Offset
 * @desc Definição da posição Y-Axis no modo espera.
 * (-9999   <->   9999)
 * @default 0
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param All Targets X Offset
 * @desc Definição da posição X-axis no modo todos os alvos.
 * (-9999   <->   9999)
 * @default 0
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<< 
 * 
 * @param All Targets Y Offset
 * @desc Definição da posição Y-Axis no modo todos os alvos.
 * (-9999   <->   9999)
 * @default 0
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<< 
 * 
 * @help  
 * =============================================================================
 * +++ MOG - (Frontal) Battle Camera (v1.2) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Adiciona o efeito de câmera de batalha.
 * Este plugin deve ser utilizado na batalha frontal.
 *
 * =============================================================================
 * - NOTETAGS
 * =============================================================================
 *
 * - Para desativar o efeito "Depth" em determinados inimigos utilize a tag 
 *   abaixo.
 *
 * Disable Depth Effect
 *
 * =============================================================================
 * - HISTÓRICO
 * =============================================================================
 * - (V1.2)
 * (BUG FIX) - Corrido o bug do zoom da animação fora da batalha.
 * (BUG FIX) - Corrido o bug do zoom da animação das faces (*Battle Hud plugin).
 *
 * - (V1.1)
 * (BUG FIX) - Correção de sobrescrever a função Shake.
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_BattleCameraFrontal = true;
　　var Moghunter = Moghunter || {}; 

    Moghunter.parameters = PluginManager.parameters('MOG_BattleCameraFrontal');
	Moghunter.bcam_ps = String(Moghunter.parameters['Depth Effect'] || "true");
	Moghunter.bcam_psRate = Number(Moghunter.parameters['Depth Rate'] || 6);
	Moghunter.bcam_camEnable = String(Moghunter.parameters['Camera Enable'] || "true");
	Moghunter.bcam_camFocus = String(Moghunter.parameters['Camera Focus'] || "false");
	Moghunter.bcam_camMove = String(Moghunter.parameters['Camera Movement'] || "true");
	Moghunter.bcam_camMoveSpeed = Number(Moghunter.parameters['Camera Speed'] || 25);
	Moghunter.bcam_actorScaleOffset = Number(Moghunter.parameters['Actor Scale Offset'] || 30);
	Moghunter.bcam_zoomFocus = String(Moghunter.parameters['Cam Zoom Focus'] || "true");
    Moghunter.bcam_animation = String(Moghunter.parameters[''] || "true");
	Moghunter.bcam_waitFocus = String(Moghunter.parameters['ATB Wait Focus'] || "true");
    Moghunter.bcam_deepRate1 = Number(Moghunter.parameters[''] || 0.125);
    Moghunter.bcam_deepRate2 = Number(Moghunter.parameters[''] || 0.0005);
	Moghunter.bcam_x3 = Number(Moghunter.parameters['Target X Offset'] || 0);
	Moghunter.bcam_y3 = Number(Moghunter.parameters['Target Y Offset'] || 0);
	Moghunter.bcam_x1 = Number(Moghunter.parameters['Idle X Offset'] || 0);
	Moghunter.bcam_y1 = Number(Moghunter.parameters['Idle Y Offset'] || 0);
	Moghunter.bcam_x2 = Number(Moghunter.parameters['All Targets X Offset'] || 0);
	Moghunter.bcam_y2 = Number(Moghunter.parameters['All Targets X Offset'] || 0);
	
//=============================================================================
// ** Game_Temp
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_bcam_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_mog_bcam_temp_initialize.call(this);
    this._bcam = {};
	this._bcam.x = 0;
	this._bcam.y = 0
	this._bcam.scale = 0;
	this._bcam.isMoving = true;
	this._bcam.waitD = 0;
	this._bcam.waitCamera = 0;
	this._bcam.waitTarget = null
	this._bcam.forceCenter = false;
	this._bcam.selection = {};
	this._bcam.action = {};
	this._bcam.action.target = {};
	this._bcam.action.user = {};
	this._bcam.atbwaitFocus = String(Moghunter.bcam_waitFocus) == "true" ? true : false;
	this._bcam.xMov = false;
	this._bcam.yMov = false;
	this._bcam.sMov = false;
	this.clearBcameraAction();
};

//==============================
// * is Cam Moving
//==============================
Game_Temp.prototype.isCamMoving = function() {
	if (this._bcam.xMov) {return true};
	if (this._bcam.yMov) {return true};
	if (this._bcam.sMov) {return true};
	return false;
};

//==============================
// * cam Perc
//==============================
Game_Temp.prototype.camPerc = function() {
	return (((this._bcam.scale  / 1.00) * 100) - 100);
};

//==============================
// * clear Cam Temp
//==============================
Game_Temp.prototype.clearCamTemp = function() {
	this._bcam.selection.active = false
	this._bcam.selection.target = null;
	this._bcam.selection.user = null;
	this._bcam.selection.alltargets = false;
	this._bcam.action.target.battler = null;
	this._bcam.action.target.sprite = null;
	this._bcam.action.user.battler = null;
	this._bcam.action.user.sprite = null;	
	this.clearBcameraAction();
};
	
//==============================
// * clear Bcamera Action
//==============================
Game_Temp.prototype.clearBcameraAction = function() {	
	this._bcam.action.active = false;
	this._bcam.action.target.battler = null;
	this._bcam.action.target.sprite = null;
	this._bcam.action.user.battler = null;
	this._bcam.action.user.sprite = null;	
	this._bcam.action.allTargets = false;
	this._bcam.action.x = 0;
	this._bcam.action.y = 0;
};

//=============================================================================
// ** Game_System
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_bcam_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_mog_bcam_sys_initialize.call(this);
    this._bcam = {};
	this._bcam.enable = String(Moghunter.bcam_camEnable) == "true" ? true : false;
	this._bcam.zoomEffect = String(Moghunter.bcam_zoomEffect) == "true" ? true : false;
	this._bcam.zoomPer = String(Moghunter.bcam_zoomPers) == "true" ? true : false;
	this._bcam.zoomFocus = String(Moghunter.bcam_zoomFocus) == "true" ? true : false;
	this._bcam.sortSprites = String(Moghunter.bcam_sortSprites) == "true" ? true : false;
	this._bcam.camMove = String(Moghunter.bcam_camMove) == "true" ? true : false;
	this._bcam.animation = String(Moghunter.bcam_animation) == "true" ? true : false;
	this._bcam.camMoveSpeed = Moghunter.bcam_camMoveSpeed;
	this._bcam.screenRate = 65;
	this._bcam.windowH = 0
};

//=============================================================================
// ** Game Battler
//=============================================================================

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function() {
	if (this.isEnemy()) {return this.enemy().note.split(/[\r\n]+/)};
	if (this.isActor()) {return this.actor().note.split(/[\r\n]+/)};
};

//==============================
// ** check Bcamera Depth
//==============================
Game_Battler.prototype.checkBcameraDepth = function() {
    this.notetags().forEach(function(note) {			
         var note_data = note.split(': ')
    	 if (note_data[0].toLowerCase() == "disable depth effect"){
			 this._camera.depth = false;
		 };
	},this);
};

//==============================
// ** iniMembers
//==============================
var _mog_bcamera_gbattler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
	_mog_bcamera_gbattler_initMembers.call(this);
	this.setCameraData();	
};

//==============================
// ** set Camera Data
//==============================
Game_Battler.prototype.setCameraData = function() {
	this._camera = {};
	this._camera.enable = true;
	this._camera.x = 0;
	this._camera.y = 0;
	this._camera.scaleX1 = 0;
	this._camera.scaleX2 = 0;
	this._camera.scaleY1 = 0;
	this._camera.scaleY2 = 0;
	this._camera.realScale = 0;
	this._camera.realX = 0;
	this._camera.realY = 0;
	this._camera.realX2 = 0;
	this._camera.realY2 = 0;	
	this._camera.spriteWait = 0;
	this._camera.spriteWidth = 0;
	this._camera.spriteHeight = 0;
	this._camera.spriteHeightRate0 = 0;	
	this._camera.spriteHeightRate1 = 0;
	this._camera.spriteHeightRate2 = 0;
	this._camera.scaleOffset = 0;
	this._camera.depth = true;
	this._camera.spriteSize = [-1,-1];
};

//==============================
// ** init Members
//==============================
var _mog_bcamera_gActor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
	_mog_bcamera_gActor_initMembers.call(this);
	var sc = Math.min(Math.max(Moghunter.bcam_actorScaleOffset,0),100);
	this._camera.scaleOffset = sc * 0.01;
};

//==============================
// ** camX
//==============================
Game_Battler.prototype.camX = function() {
 	return this._camera.x;
};

//==============================
// ** camY
//==============================
Game_Battler.prototype.camY = function() {
 	return this._camera.y;
};

//==============================
// ** cam Scale X
//==============================
Game_Battler.prototype.camScaleX = function() {
	if (Imported.MOG_Theatrhythm && $gameSystem._theatrhythm) {return 0};
 	return this._camera.scaleX1 + this._camera.scaleX2 + this._camera.scaleOffset;
};

//==============================
// ** cam Scale Y
//==============================
Game_Battler.prototype.camScaleY = function() {
	if (Imported.MOG_Theatrhythm && $gameSystem._theatrhythm) {return 0};
 	return this._camera.scaleY1 + this._camera.scaleY2 + this._camera.scaleOffset;
};

//=============================================================================
// ** Sprite Battler
//=============================================================================

//==============================
// * init Members
//==============================
var _mog_bcamera_sprBat_initMembers = Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
	_mog_bcamera_sprBat_initMembers.call(this);
    this.setupBcamInitial();
};

//==============================
// * setup Bcam Initial
//==============================
Sprite_Battler.prototype.setupBcamInitial = function() {
	this._camInitial = true;   
	this._camPS_Rate = [false,0,0,0,0];
	this._camPS_Rate[0] = String(Moghunter.bcam_ps) == "true" ? true : false;
	if (this._camPS_Rate[0]) {this.setupBcamPs()}
};

//==============================
// * setup Bcam Initial
//==============================
Sprite_Battler.prototype.setupBcamPs = function() {
	var h = Graphics.boxHeight - 700;
	this._camPS_Rate[1] = Math.min(Math.max(Moghunter.bcam_psRate,0),6);
	if ($gameSystem._bcam.animation) {
	   this._camPS_Rate[2] = this._camPS_Rate[1] * 0.055;
       this._camPS_Rate[3] = this._camPS_Rate[1] * 0.0003;
    } else { 
	   this._camPS_Rate[2] = this._camPS_Rate[1] * Moghunter.bcam_deepRate1;
	   this._camPS_Rate[3] = this._camPS_Rate[1] * Moghunter.bcam_deepRate2;	 
    }
	this._camPS_Rate[4] = h / 2;
};

//==============================
// * get Cam Initial Data
//==============================
Sprite_Battler.prototype.getCamInitialData = function() {
	this._camInitial = false;
	this._battler.checkBcameraDepth();
	if (Imported.MOG_EmergeMotion) {
	    this._battler._emerge = [false,0,0,0,-1,0,30,0,0,0,0,0,0,false,0,0,0,0,0,0];
	};	
};

//==============================
// * set Bcam Pes
//==============================
Sprite_Battler.prototype.updateBcamPes = function() {
   if (!this._battler._camera.depth) { 
	  var rate = 0.00 
   } else {
      var rate = -this._camPS_Rate[2] +  Math.abs((this.y * 1.08) - this._camPS_Rate[4]) * this._camPS_Rate[3];
   };
   this._battler._camera.scaleY2 = rate;
   this._battler._camera.scaleX2 = this._battler._camera.scaleY2;
};


//==============================
// * can Update Camera Base
//==============================
Sprite_Battler.prototype.canUpdateCameraBase = function() {
	 if (!this._battler) {return false};
	 if (!this._battler._camera.enable) {return false};
	 return true;
};

//==============================
// * can Update Cam Zoom Real
//==============================
Sprite_Battler.prototype.canUpdateCamZoomReal = function() {
   if (Imported.MOG_BattlerMotion) {return false};
   if (!$gameSystem._bcam.zoomEffect) {return false};
   return true;  
};

//==============================
// * update Cam Zoom Real
//==============================
Sprite_Battler.prototype.updateCamZoomReal = function() {
   this.scale.x = 1.00 + this._battler.camScaleX();
   this.scale.y = 1.00 + this._battler.camScaleY(); 
};

//==============================
// * update BCamera Get Data
//==============================
Sprite_Battler.prototype.updateBCameraGetData = function() {
	if ($gameTemp._bcam.action.target.battler == this._battler) {
		$gameTemp._bcam.action.target.sprite = this;
	};
	if ($gameTemp._bcam.action.user.battler == this._battler) {
		$gameTemp._bcam.action.user.sprite = this;
    };
	if (this._battler._camera.spriteSize[0] == -1 && this.bitmap && this.bitmap.isReady()) {this.camGetSpriteSize()}
};

//==============================
// * cam Get Sprite Size
//==============================
Sprite_Battler.prototype.camGetSpriteSize = function() {
   this._battler._camera.spriteSize[0] = this.width;
   this._battler._camera.spriteSize[1] = this.height;
};


//==============================
// * updateBCameraRealData
//==============================
Sprite_Battler.prototype.updateBCameraRealData = function() {
     this.x += this._battler.camX();
	 this.y += this._battler.camY();
	 if (this._battler.isSelected()) {
		 $gameTemp._bcam.selection.target = this;
		 if (!$gameSystem.isSideView() && this._battler.isActor()) { 
		      $gameTemp._bcam.selection.target = null;
		 };
	 }
	 if (this.canUpdateCamZoomReal()) {this.updateCamZoomReal()};
};

//==============================
// * update Bcamera Base
//==============================
Sprite_Battler.prototype.updateBcameraBase = function() {
	if (this._battler && this._camInitial) {this.getCamInitialData()};
    this.updateBCameraRealData();
	this.updateBCameraGetData();
	this.updateBCameraExData();
	if (this._camPS_Rate[0]) {this.updateBcamPes()};
};

//==============================
// * update B Camera EX Data
//==============================
Sprite_Battler.prototype.updateBCameraExData = function() {
    this._battler._camera.realScale = ($gameTemp._bcam.scale - this._battler._camera.scaleX2) * 100;
	this._battler._camera.realX = this.x + (this.x * $gameTemp.camPerc() / 100);
	this._battler._camera.realY = this.y + (this.y * $gameTemp.camPerc() / 100);
	this._battler._camera.realX2 = this._battler._camera.realX + $gameTemp._bcam.x;
	this._battler._camera.realY2 = this._battler._camera.realY + $gameTemp._bcam.y;
	
	
    if (this.needCamGetSpriteData()) {this.getCamSpriteData()}
};

//==============================
// * need Cam Get Sprite Data
//==============================
Sprite_Battler.prototype.needCamGetSpriteData = function() {
	if (this._battler._camera.spriteWait > 0) {return false};
	if (this._battler._camera.spriteWidth != 0) {return false};
	if (!this.bitmap) {return false};
	if (!this.bitmap.isReady()) {return false};
	return true;
};

//==============================
// * get Cam Sprite Data
//==============================
Sprite_Battler.prototype.getCamSpriteData = function() {
	this._battler._camera.spriteWidth = this.width;
	this._battler._camera.spriteHeight = this.height;
	this._battler._camera.spriteHeightRate0 = this.height / 1.2;
	this._battler._camera.spriteHeightRate1 = this._battler._camera.spriteHeightRate0 + (this._battler._camera.spriteHeightRate0 *  $gameTemp.camPerc() / 100);
	this._battler._camera.spriteHeightRate2 = this._battler._camera.spriteHeightRate0 * this._battler._camera.realScale / 250;	
};

//==============================
// * update
//==============================
var _mog_bcamera_sprBat_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
	_mog_bcamera_sprBat_update.call(this);
    if (this.canUpdateCameraBase()) {this.updateBcameraBase()};
};

//=============================================================================
// ** Spriteset Battle
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_bcam_sprt_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function() {
	this.setupBcamera();
	_mog_bcam_sprt_initialize.call(this);	
};

//==============================
// * setup B camera
//==============================
Spriteset_Battle.prototype.setupBcamera = function() {
	$gameTemp.clearCamTemp()
 	this._camera = {};
	this._camera.sx = 0;
	this._camera.sy = 0;
	this._camera.centerRate = [0,0,0,0,0,0,0,0,0,0,0,0]
	this._camera.centerRate[0] = 0.45
	this._camera.centerRate[1] = (Graphics.boxWidth * 30 / 100) - Moghunter.bcam_x2;
	this._camera.centerRate[2] = (Graphics.boxHeight * 30 / 100) - Moghunter.bcam_y2;;
	this._camera.bbOrg = [0,0,0,0];
	this._camera.bbSize = [0,0];
	this._camera.focusR = [false,false];
	this._camera.needCheckZ = true;
	this._camera.moveSpeed = Math.min(Math.max(Moghunter.bcam_camMoveSpeed,0),100);
	if (!$gameSystem._bcam.camMove) {
    	  this._camera.moveSpeed = 0;
	      this._camera.zoomSpeed = 0;
	}
	this._center = [(Graphics.boxWidth / 2),(Graphics.boxHeight / 2)];	
};

//==============================
// * setup B camera
//==============================
Spriteset_Battle.prototype.canUpdateBattleCameraBase = function() {
	if (!$gameSystem._bcam.enable) {return false};
	if ($gameTemp._bcam.waitCamera > 0) {return false};
    return true;
};

//==============================
// * move Battle Camera
//==============================
Spriteset_Battle.prototype.moveBattlecamera = function(value,real_value,speed,speedMin,type) {
	if (value == real_value) {
		return value;
	};
	var dnspeed = (Math.abs(value - real_value) / this._camera.moveSpeed);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return value
};

//==============================
// * move Battle Camera Zoom
//==============================
Spriteset_Battle.prototype.moveBattlecameraZoom = function(value,real_value,type) {
	$gameTemp._bcam.sMov = false;
	if (value == real_value) {
		$gameTemp._bcam.sMov = false;
		return value;
	};
	var dnspeed = ((Math.abs(value - real_value) / this._camera.moveSpeed));
	if (dnspeed > 0.003) {$gameTemp._bcam.sMov = true};
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return value;
};

//==============================
// * bcam Pos X
//==============================
Spriteset_Battle.prototype.bcamPosX = function(target) {
	var perc = (Math.floor((this.bcamScale()  / 1.00) * 100) - 100); 
	var center = (Graphics.boxWidth / 2);
	if (Imported.MOG_BattlerMotion) {
    	var x = target.x - Math.abs(target._battler._bmotion.damage.x)
	} else {
		var x = target.x
	};
	x += (x * perc / 100);
	var hr = target._mainSprite ? target._mainSprite.bitmap.width : target.bitmap.width;
	var b = ((hr * perc / 100) / 50);
	var z = x + b - center;
	z += Moghunter.bcam_x3;
	return -z;	
};

//==============================
// * bcam Pos Y
//==============================
Spriteset_Battle.prototype.bcamPosY = function(target) {
	var perc = (Math.floor((this.bcamScale()  / 1.00) * 120) - 100); 
	var y = target.y 
	y += (y * perc / 100);
	var hr = target._mainSprite ? target._mainSprite.bitmap.height : target.bitmap.height;
	var z = y - (Graphics.boxHeight / 2) - hr;
	z += Moghunter.bcam_y3;
	if (z < -this._camera.centerRate[7]) {z = -this._camera.centerRate[7]}
	return -z;	
};

//==============================
// * b Camera Focus All
//==============================
Spriteset_Battle.prototype.bCameraFocusAll = function() {
	if ($gameTemp._bcam.action.allTargets) {return true};
	if ($gameTemp._bcam.selection.alltargets) {return true};
	if (Imported.MOG_BattleCursor || Imported.MOG_BattleCursorFrontal) {
    	if ($gameTemp._arrowAllTargets[0]) {return true};
	    if ($gameTemp._arrowAllTargets[1]) {return true};
	};
    return false;
};

//==============================
// * B cam X Idle
//==============================
Spriteset_Battle.prototype.bcamXIdle = function() {
    if (this.bCameraFocusAll()) {return this._camera.centerRate[1]}
	return this._camera.centerRate[4];
};

//==============================
// * B cam X
//==============================
Spriteset_Battle.prototype.bcamX = function() {
	if (!$gameSystem._bcam.animation) {return 0}
	var n = this.bcamXIdle();
	if (this.bcamSprite() && !this.bCameraFocusAll()) {
		return this.bcamPosX(this.bcamSprite());
	} else if ($gameTemp._bcam.action.active) {
		return this.bcamPosX($gameTemp._bcam.action.target);
	};
    return n;
};

//==============================
// * B cam Y Idle
//==============================
Spriteset_Battle.prototype.bcamYIdle = function() {
    if (this.bCameraFocusAll()) {return this._camera.centerRate[2]}
	return this._camera.centerRate[5];
};

//==============================
// * B cam Y
//==============================
Spriteset_Battle.prototype.bcamY = function() {
	if (!$gameSystem._bcam.animation) {return 0}
	var n = this.bcamYIdle(); 
	if (this.bcamSprite() && !this.bCameraFocusAll()) { 
	    return this.bcamPosY(this.bcamSprite());
	};
	return n;
};

//==============================
// * bcam Sprite
//==============================
Spriteset_Battle.prototype.bcamSprite = function() {
	if($gameTemp._bcam.action.allTargets) {return null};
	if($gameTemp._bcam.selection.alltargets) {return null}; 
	if ($gameTemp._bcam.selection.target) {
		return $gameTemp._bcam.selection.target;
	} else if ($gameTemp._bcam.action.target.sprite) {
		return $gameTemp._bcam.action.target.sprite;
	} else if ($gameTemp._bcam.action.user.sprite) {
		return $gameTemp._bcam.action.user.sprite;		
		
	};
	return null;
};

//==============================
// * bcam Zoom Idle
//==============================
Spriteset_Battle.prototype.bcamZoomIdle = function() {
	if (this.bCameraFocusAll()) {return this._camera.centerRate[0]};
	return 0.60;
};

//==============================
// * bcamScale
//==============================
Spriteset_Battle.prototype.bcamScale = function() {
	if (!$gameSystem._bcam.animation) {return 1.00}
   var zoom = this.bcamZoomIdle();
   if (this.bcamSprite() && !this.bCameraFocusAll()) {
		var battler = this.bcamSprite()._battler;
		var zoom = 1.40 - battler._camera.scaleX2;
   };
   return zoom;
};

//==============================
// * can Update Cam Zoom Focus
//==============================
Spriteset_Battle.prototype.canUpdateCamZoomFocus = function() {
    if (!$gameSystem._bcam.zoomFocus) {return false};
	return true;
};

//==============================
// * update CamZoomFocus
//==============================
Spriteset_Battle.prototype.updateCamZommFocus = function() {
   var ns = this.bcamScale();
   this._battleField.scale.x = this.moveBattlecameraZoom(this._battleField.scale.x,ns,0);
   this._battleField.scale.y = this.moveBattlecameraZoom(this._battleField.scale.y,ns,1);
};

//==============================
// * update Battle Camera Real
//==============================
Spriteset_Battle.prototype.updateBattleCameraReal = function() {
   var nx = this.bcamX();
   var ny = this.bcamY();
   this._battleField.x = this.moveBattlecamera(this._battleField.x,nx,60,1,0);
   this._battleField.y = this.moveBattlecamera(this._battleField.y,ny,60,1,1);
   if (this.canUpdateCamZoomFocus()) {this.updateCamZommFocus()};
   $gameTemp._bcam.x = this._battleField.x;
   $gameTemp._bcam.y = this._battleField.y;
   $gameTemp._bcam.scale = this._battleField.scale.x;   
};

//==============================
// * update BCamera Base
//==============================
Spriteset_Battle.prototype.updateBattleCameraBase = function() {
    this.updateBattleCameraReal();
	$gameTemp._bcam.selection.target = null;
};

//==============================
// * update
//==============================
var _mog_bcam_sprt_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
	_mog_bcam_sprt_update.call(this);
    if (this.canUpdateBattleCameraBase()) {this.updateBattleCameraBase()};
	this.updateBcamLocateBattleback()

	if ($gameTemp._bcam.waitD > 0) {$gameTemp._bcam.waitD--};
	if ($gameTemp._bcam.waitCamera > 0) {$gameTemp._bcam.waitCamera--};
};

//==============================
// * locateBattleback
//==============================
var _mog_bcam_locateBattleback = Spriteset_Battle.prototype.locateBattleback;
Spriteset_Battle.prototype.locateBattleback = function() {
	 if ($gameSystem._bcam.enable && $gameSystem._bcam.animation) {
	 this.setBackScaleCam(this._back1Sprite);
     this.setBackScaleCam(this._back2Sprite);
		 if (Imported.MOG_BattlebackEX) {
		 	for (var i = 2; i < this._bbData.length; i++) {	   
			   this.setBackScaleCam2(this._backSpriteEx[i]);
	        };
	     };	 
     };
	 _mog_bcam_locateBattleback.call(this);
};

//==============================
// * setBackScaleCam
//==============================
Spriteset_Battle.prototype.setBackScaleCam = function(sprite) {
      if (!sprite.bitmap) {return};
	  var rate = $gameSystem._bcam.screenRate;
	  var wh = $gameSystem._bcam.windowH;
	  var margin = 32;
      var center_x = Graphics.boxWidth * rate / 100;
	  var center_y = Graphics.boxHeight * (rate / 1) / 100;
	  var width = Graphics.boxWidth  + (center_x * 2) + (margin * 2) 
	  var width2 = Graphics.boxWidth  + (center_x * 2) + (margin * 2) + 100;
	  var height = Graphics.boxHeight + (center_y * 2) + (margin * 2);
	  if (sprite.bitmap.width < width2) {sprite.scale.x = width2 / sprite.bitmap.width};
	  if (sprite.bitmap.height < height) {sprite.scale.y = (height - wh) / sprite.bitmap.height};
	  var x = center_x + margin;
	  var y = center_y + margin;
	  sprite.move(-x, -y, sprite.bitmap.width, sprite.bitmap.height);
	  this.setCameraOrg(sprite,x,y,center_x,center_y,margin)
};

//==============================
// * setBackScaleCam
//==============================
Spriteset_Battle.prototype.setBackScaleCam2 = function(sprite) {
      if (!sprite.bitmap) {return};
	  var rate = $gameSystem._bcam.screenRate;
	  var margin = 32;
	  var wh = $gameSystem._bcam.windowH;
      var center_x = Graphics.boxWidth * rate / 100;
	  var center_y = Graphics.boxHeight * (rate / 1) / 100;
	  var width = Graphics.boxWidth  + (center_x * 2) + (margin * 2);
	  var height = Graphics.boxHeight + (center_y * 2) + (margin * 2);
	  if (sprite.bitmap.width < width) {sprite.scale.x = width / sprite.bitmap.width};
	  if (sprite.bitmap.height < height) {sprite.scale.y = (height - wh) / sprite.bitmap.height};
	  var x = center_x + margin ;
	  var y = center_y + margin ;
	  sprite.move(-x, -y, sprite.bitmap.width, sprite.bitmap.height);
};

//==============================
// * setBackScaleCam
//==============================
Spriteset_Battle.prototype.setCameraOrg = function(sprite,x,y,center_x,center_y,margin) {
	  this._camera.bbOrg[0] = x;
	  this._camera.bbOrg[1] = y;
	  this._camera.centerRate[4] = (center_x / 2) - (margin * 3) - Moghunter.bcam_x1;
	  this._camera.centerRate[5] = (center_y / 2) - (margin * 1) - Moghunter.bcam_y1;
	  this._camera.centerRate[6] = center_x - (margin * 3);
	  this._camera.centerRate[7] = center_y * 1.5;
	  this._camera.centerRate[8] = (center_x / 2) - (margin * 4);
	  this._camera.centerRate[9] = (center_y / 2) - (margin * 2);
};

//==============================
// * locate Battleback
//==============================
Spriteset_Battle.prototype.updateBcamLocateBattleback = function() {
	if (Imported.MOG_BattlebackEX) {
		this.update_bbex_cam();    
    } else {
	   this._back1Sprite.origin.x = 0;
	   this._back1Sprite.origin.y = 0;
	   this._back2Sprite.origin.x = 0;
	   this._back2Sprite.origin.y = 0;	
	};
};

//==============================
// * Update BBex Cam
//==============================
Spriteset_Battle.prototype.update_bbex_cam = function() {
	 if (this._back1Sprite) {
	    this.updateBbCamMode(this._back1Sprite,0);
	    this.updateBbCamMode(this._back2Sprite,1);
	 };
	 for (var i = 2; i < this._bbData.length; i++) {	   
	   this.updateBbCamMode(this._backSpriteEx[i],i);
	 };	 
};

//==============================
// * updateBCamMode
//==============================
Spriteset_Battle.prototype.updateBbCamMode = function(sprite,index) {
	if (this._bbData[index] && this._bbData[index][5]) {
		var rate = this._bbData[index][5]; 
	} else {
		var rate = 0;
	};
	sprite.origin.x = sprite.ox -(this._battleField.x * (rate / 100));
	sprite.origin.y = sprite.oy;
};

//=============================================================================
// ** Sprite Animation
//=============================================================================

//==============================
// * update Position
//==============================
var _mog_Bcamera_sprtAnitmation_updatePosition = Sprite_Animation.prototype.updatePosition;
Sprite_Animation.prototype.updatePosition = function() {
	_mog_Bcamera_sprtAnitmation_updatePosition.call(this);
	if (this.needBcameraAniPos()) {this.updateBcameraAniPos()};
	if (this._battler && this._animation.position === 3) {
		this.scale.x = 2;
		this.scale.y = this.scale.x;
	};	
};

//==============================
// * need Bcamera Ani Pos
//==============================
Sprite_Animation.prototype.needBcameraAniPos = function() {
	if (!this._battler) {return false};
	if (!BattleManager._spriteset) {return false};
	if (this._animation.position == 3) {return false};
	if (this._animation.position == 0) {return false};
	if (this._battler.isActor() && !$gameSystem.isSideView()) {return false};
	return true;
};

//==============================
// * update Bcamera Ani Pos
//==============================
Sprite_Animation.prototype.updateBcameraAniPos = function() {
   var perc = 0.25 - this._battler.camScaleX();
   var perc2 = Math.abs(perc * 150); 
   this.y += perc2;
   this.scale.x = 1.00 + this._battler.camScaleX();
   this.scale.y = this.scale.x
};

//=============================================================================
// ** Sprite Damage
//=============================================================================

//==============================
// * Setup
//==============================
var _mog_bcaf_sprDam_setup = Sprite_Damage.prototype.setup
Sprite_Damage.prototype.setup = function(target) {
	_mog_bcaf_sprDam_setup.call(this,target)
	this._target = target
	var scale = $gameTemp._bcam.scale
	if (scale > 0.60) {	
		var h2 = this._target._camera.spriteHeightRate0 * 40 / 100;
		var ry = h2 - this._target._camera.realScale;
		if (ry < 0) {ry = 0};
		this.y -= ry;
	};
};

//==============================
// * Update
//==============================
var _mog_bcaf_sprDam_update = Sprite_Damage.prototype.update;
Sprite_Damage.prototype.update = function() {
	_mog_bcaf_sprDam_update.call(this);
    if (this._target) {this.updateCamDamage()};
};

//==============================
// * update Cam Damage
//==============================
Sprite_Damage.prototype.updateCamDamage = function() {
	var sc = 0
	if (this._target.isEnemy()) {
		if ($gameTemp._bcam.scale < 0.60) {
	        sc = $gameTemp._bcam.scale + 0.60
		} else {
		    sc = this._target.camScaleY() + 0.10
		};
    }
	var scale = 1.00 + sc
	this.scale.x = scale;
	this.scale.y = this.scale.x
};

//=============================================================================
// ** BattleManager
//=============================================================================

//==============================
// * Start Action
//==============================
var _mog_bcam_bmger_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
	 _mog_bcam_bmger_startAction.call(this);
	 $gameTemp.clearBcameraAction();
	if (this._subject) {$gameTemp._bcam.action.user = this._subject};
	if (this._targets &&  this._targets.length > 0) { 
	    $gameTemp._bcam.action.target.battler = this._targets[0];
	    $gameTemp._bcam.action.user.battler = this._subject;
		if (this._targets.length > 1) {$gameTemp._bcam.action.allTargets = true};
		if (!$gameSystem.isSideView()) {
		    if (this._targets[0].isActor()) {$gameTemp._bcam.action.target.battler = null};
			if (this._subject.isActor()) {$gameTemp._bcam.action.user.battler = null};
		};
	};
};

//==============================
// * End Turn
//==============================
var _mog_bcam_bmger_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function() {
	_mog_bcam_bmger_endTurn.call(this);
    $gameTemp.clearBcameraAction();
};

//==============================
// * End Battle
//==============================
var _mog_bcam_bmger_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
	_mog_bcam_bmger_endBattle.call(this,result);
	$gameTemp.clearCamTemp();
};