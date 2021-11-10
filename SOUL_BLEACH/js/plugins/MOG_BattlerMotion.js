
//=============================================================================
// MOG_BattlerMotion.js
//=============================================================================

/*:
 * @plugindesc (v2.1 *) Adiciona efeitos animados nos battlers.
 * @author Moghunter
 *
 * @param Default Damage Motion
 * @desc Definição da animação ao receber dano.
 * 0 - Shake   1 - Zoom     2-3 - Knockback R/L    4 - Knockback UP 
 * @default 0
 * @type select
 * @option Shake
 * @value 0
 * @option Zoom
 * @value 1
 * @option Knockback (Left)
 * @value 2 
 * @option Knockback (Right)
 * @value 3
 *
 * @param Damage Motion Actor
 * @desc Ativar o efeito tremer no aliado.
 * @default true
 * @type boolean 
 *
 * @param Damage Motion Enemy
 * @desc Ativar o efeito tremer no aliado.
 * @default true
 * @type boolean
 *
 * @param Disable Blink Damage
 * @desc Desativar o efeito de piscar o battler no dano.
 * @default true
 * @type boolean
 *
 * @param Actor Action Motion
 * @desc Ativar o Motion de ação para no grupo.
 * @default false
 * @type boolean
 *
 * @param Enemy Action Motion
 * @desc Ativar o Motion de ação para nos inimigos.
 * @default true
 * @type boolean
 *
 * @param Shadow (Float Motion)
 * @desc Ativar a sombra no movimento de levitar.
 * @default true
 * @type boolean
 *
 * @param Shadow Opacity
 * @desc Definição da transparência da sombra.
 * @default 170
 * @type boolean
 *
 * @param Shadow Zoom Effect
 * @desc Ativar o efeito de zoom na sombra.
 * @default true
 * @type boolean
 *
 * @param Battleback Ground Height
 * @desc O valor define o limite Y-axis da sombra baseado no battleback.
 * @default 200
 * @type number
 *
 * @help  
 * =============================================================================
 * +++ MOG - Battler Motion (v2.1) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Adiciona efeitos animados nos battlers.
 *
 * =============================================================================
 * - IDLE MOTION -      (Enemy Notetags)
 * =============================================================================
 * Para ativar os esfeitos de animações em posição de espera use as Tags abaixo
 * na caixa de notas dos battlers.
 *
 * breath motion: X
 * 
 *      0 -  Vertical Zoom
 *      1 -  Vertical & Horizontal Zoom
 *      2 -  Vertical & Horizontal Zoom (Strong/Slime Mode)
 *      3 -  Horizontal Zoom (Strong)
 *      4 -  Diagonal Breath (Right)
 *      5 -  Diagonal Breath (Left)
 *
 * float motion: X
 * 
 *      0 - Vertical
 *      1 - Vertical Right 
 *      2 - Vertical Left
 *      3 - Vertical Right & Left
 *
 * swing motion: X
 *   
 *      0 - Swing Left & Right
 *      1 - Rotation 360
 * 
 * damage motion: X
 *
 *      0 - Shake
 *      1 - Slime Mode
 *      2 - Move Left
 *      3 - Move Right
 *
 * =============================================================================
 * - ACTION MOTION -      (Skill Notetags)  
 * =============================================================================
 * Para ativar os esfeitos de animações de ação use as Tags abaixo na caixa
 * de notas das habilidades.
 *
 * action motion: X
 *
 *      0 - Zoom
 *      1 - Round Attack Right
 *      2 - Round Attack Left
 *      3 - Jump Attack
 *      4 - Jump Attack (Rotation)
 *      5 - Jump Slime
 *      6 - Rotation Attack
 *      7 - Move Down
 *      8 - Wave Attack
 *      9 - Shake
 *     10 - Swing Right
 *     11 - Swing Right (Double)
 *     12 - Move Right              
 *     13 - Charged Attack Right
 *
 * =============================================================================
 * - WHAT'S  NEW
 * =============================================================================
 * (Version 2.1)
 *   (BUG FIX) - Correção de não ativar o motion e ações forçadas.
 * 
 * (version 2.0)
 *   (NEW) - Novas animações
 *   (UPD) - Melhoria nas animações.
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_BattlerMotion = true;
　　var Moghunter = Moghunter || {}; 

    Moghunter.parameters = PluginManager.parameters('MOG_BattlerMotion');
    Moghunter.b_motion_shake_effect_actor = String(Moghunter.parameters['Damage Motion Actor'] || "true");
    Moghunter.b_motion_shake_effect_enemy = String(Moghunter.parameters['Damage Motion Enemy'] || "true");
    Moghunter.b_motion_disable_blink_damage = String(Moghunter.parameters['Disable Blink Damage'] || "true");
    Moghunter.b_motion_shadow = String(Moghunter.parameters['Shadow (Float Motion)'] || "true");
	Moghunter.b_motion_shadowOpacity = Number(Moghunter.parameters['Shadow Opacity'] || 170);
	Moghunter.b_motion_shadowZoom = String(Moghunter.parameters['Shadow Zoom Effect'] || "true");
	Moghunter.b_motion_defaultDamage = Number(Moghunter.parameters['Default Damage Motion'] || 0);
	Moghunter.b_motion_actorAction = String(Moghunter.parameters['Actor Action Motion'] || "false");
	Moghunter.b_motion_enemyAction = String(Moghunter.parameters['Enemy Action Motion'] || "true");
	Moghunter.b_motion_groundHeight = Number(Moghunter.parameters['Battleback Ground Height'] || 200);
	
//=============================================================================
// ** Game System
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_bmotion_sys_initialize = Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
	_mog_bmotion_sys_initialize.call(this);
	this._bmotion = [false,false,false,false];
    if (String(Moghunter.b_motion_shake_effect_actor) == "true") {this._bmotion[0] = true};
	if (String(Moghunter.b_motion_shake_effect_enemy) == "true") {this._bmotion[1] = true};
	if (String(Moghunter.b_motion_actorAction) == "true") {this._bmotion[2] = true};
	if (String(Moghunter.b_motion_enemyAction) == "true") {this._bmotion[3] = true};
};

//=============================================================================
// ** Game Action
//=============================================================================

//==============================
// * Prepare
//==============================
var _mog_bmotion_gaction_prepare = Game_Action.prototype.prepare
Game_Action.prototype.prepare = function() {	
	_mog_bmotion_gaction_prepare.call(this);
	if (this.canBmotionAction(this._item)){
		this.subject().prepareBmotionAction(this._item,0)
	    this.subject().	clearBwalk();
    };
};

//==============================
// * can Bmotion Action
//==============================
Game_Action.prototype.canBmotionAction = function(item) {
   if (this.subject().isActor() && !$gameSystem._bmotion[2]) {return false};
   if (this.subject().isEnemy() && !$gameSystem._bmotion[3]) {return false};
   return true;
};	

//==============================
// * need Set Bmotion Damage
//==============================
Game_Action.prototype.needSetBmotionDamage = function(target,oldhp) {
	if (target._bmotion.damage.mode == -1) {return false};
	if (target.hp >= oldhp) {return false};
	if (target.isActor() && !$gameSystem._bmotion[0]) {return false};
	if (target.isEnemy() && !$gameSystem._bmotion[1]) {return false};
	return true;
};

//==============================
// * Apply
//==============================
var _mog_bMotion_apply = Game_Action.prototype.apply
Game_Action.prototype.apply = function(target) {
	var oldHP = target.hp;
	_mog_bMotion_apply.call(this,target);
    if ($dataSystem.optSideView) {target.clearBwalk()};
	if (this.needSetBmotionDamage(target,oldHP)) {target.setBmotionDamageApply(target)}
};

//=============================================================================
// ** Game Battler
//=============================================================================

//==============================
// ** iniMembers
//==============================
var _mog_bmotion_gbattler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
	_mog_bmotion_gbattler_initMembers.call(this);
	this.setMotionData();	
};

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function() {
	if (this.isEnemy()) {return this.enemy().note.split(/[\r\n]+/)};
	if (this.isActor()) {return this.actor().note.split(/[\r\n]+/)};
};

//==============================
// ** Set Motion Data
//==============================
Game_Battler.prototype.setMotionData = function() {
	this._bmotion = {};	
	this._bmotion.action = {};	
	this.clearBaction();
	this._bmotion.idle = {};
	this._bmotion.idle.mode = -1;
	this._bmotion.idle.wait = false;
	this._bmotion.idle.walk = {};
	this._bmotion.idle.walk.enable = false;	
	this._bmotion.idle.walk.start = true;
	this._bmotion.idle.walk.rangeReal = 40;
	this._bmotion.idle.float = {};
	this._bmotion.idle.float.mode = 0;
	this._bmotion.idle.float.enable = false;
	this._bmotion.idle.float.shadow = Moghunter.b_motion_shadow == "true" ? true : false;	
	this._bmotion.idle.float.range = 1.00;	
	this._bmotion.idle.float.speed = 0.02;
	this._bmotion.idle.float.animation = [0,0,0,0,0,0,0,0,0,0,0];
	this._bmotion.idle.float.x = 0;
	this._bmotion.idle.float.y = 0;
	this._bmotion.idle.float.groundH = Moghunter.b_motion_groundHeight;
	if (Imported.MOG_BattleCameraFrontal) {
		this._bmotion.idle.float.groundH -= Moghunter.b_motion_groundHeight * 50 / 100
	};
	this._bmotion.idle.swing = {};
	this._bmotion.idle.swing.mode = 0;
	this._bmotion.idle.swing.enable = false;
	this._bmotion.idle.swing.range = 0.30;
	this._bmotion.idle.swing.rotation = 0;
	this._bmotion.idle.swing.speed = 0.005;
	this._bmotion.idle.swing.animation = [0,0,0,0,0,0,0,0,0,0,0];
	this._bmotion.idle.swing.y = 0;
	this.clearBidle();
	this._bmotion.damage = {};
	this._bmotion.damage.mode = Math.min(Math.max(Moghunter.b_motion_defaultDamage,0),3);
	this._bmotion.damage.wait = false;		
	this.clearBdamage();
};

//==============================
// ** clear Baction
//==============================
Game_Battler.prototype.clearBaction = function() {
	this._bmotion.action.mode = -1;	
	this._bmotion.action.initial = true;
	this._bmotion.action.wait = false;
	this._bmotion.action.x = 0;
	this._bmotion.action.y = 0;
	this._bmotion.action.y2 = 0;
	this._bmotion.action.orgX = 0;
	this._bmotion.action.orgY = 0;	
	this._bmotion.action.scaleX = 0;
	this._bmotion.action.scaleY = 0;
	this._bmotion.action.rotation = 0;
	this._bmotion.action.animation = [0,0,0,0,0,0];
	if (this._batPoses && this._batPoses[2] > 0) {this._batPoses[2] = 1};
};	


//==============================
// ** clear idle
//==============================
Game_Battler.prototype.clearBidle = function() {
    this._bmotion.idle.wait = false;
	this._bmotion.idle.x = 0;
	this._bmotion.idle.y = 0;
	this._bmotion.idle.orgX = 0;
	this._bmotion.idle.orgY = 0;
	this._bmotion.idle.walk.x = 0
	this._bmotion.idle.walk.y = 0
	this._bmotion.idle.walk.wait = 0;
	this._bmotion.idle.walk.scaleX = 0;
	this._bmotion.idle.walk.phase = 0;
	this._bmotion.idle.walk.duration = 0;
	this._bmotion.idle.walk.frequence = 20;
	this._bmotion.idle.walk.sX = 0;
	this._bmotion.idle.walk.sY = 0;	
	this._bmotion.idle.walk.speed = 0.007;
	this._bmotion.idle.walk.skip = 0;
	this._bmotion.idle.walk.skipN = false;
	this.clearBidleWalk();
	this._bmotion.idle.scaleX = 0;
	this._bmotion.idle.scaleY = 0;
	this._bmotion.idle.rotation = 0;
	this._bmotion.idle.animation = [0,0,0,0,0,0,0,0,0,0,0];
};	

//==============================
// ** clear Bidle Walk
//==============================
Game_Battler.prototype.clearBidleWalk = function() {
	this._bmotion.idle.walk.rangeRealM = this._bmotion.idle.walk.rangeReal * 70 / 100;
	this._bmotion.idle.walk.rangeX1 = -this._bmotion.idle.walk.rangeReal;
	this._bmotion.idle.walk.rangeX2 = this._bmotion.idle.walk.rangeReal;
	this._bmotion.idle.walk.rangeX3 = Graphics.boxWidth;
	this._bmotion.idle.walk.rangeY1 = -this._bmotion.idle.walk.rangeReal;
	this._bmotion.idle.walk.rangeY2 = this._bmotion.idle.walk.rangeReal;
	this._bmotion.idle.walk.rangeY3 = Graphics.boxHeight - 160;
};

//==============================
// ** clear B walk
//==============================
Game_Battler.prototype.clearBwalk = function() {
	this._bmotion.idle.walk.sX = 0;
	this._bmotion.idle.walk.sY = 0;
	this._bmotion.idle.walk.wait = 5;
    this._bmotion.idle.walk.duration = 30;
	this._bmotion.idle.walk.scaleX = 0;
	this._bmotion.idle.walk.scaleY = 0;
	this._bmotion.idle.walk.start = true;
};

//==============================
// ** clear idle
//==============================
Game_Battler.prototype.clearBdamage = function() {
    this._bmotion.damage.wait = false;
	this._bmotion.damage.duration = 0;
	this._bmotion.damage.x = 0;
	this._bmotion.damage.y = 0;
	this._bmotion.damage.orgX = 0;
	this._bmotion.damage.orgY = 0;
	this._bmotion.damage.scaleX = 0;
	this._bmotion.damage.scaleY = 0;
	this._bmotion.damage.rotation = 0;
	this._bmotion.damage.animation = [0,0,0,0,0,0];	
};

//==============================
// ** need Refresh Bmotion Walk
//==============================
Game_Battler.prototype.needRefreshBmotionWalk = function(x,y) {
	if (this._bmotion.idle.walk.skip > 0) {return false};
	if (this._bmotion.idle.walk.x < this._bmotion.idle.walk.rangeX1) {return true};
	if (this._bmotion.idle.walk.x > this._bmotion.idle.walk.rangeX2) {return true};
	if (this._bmotion.idle.walk.y < this._bmotion.idle.walk.rangeY1) {return true};
	if (this._bmotion.idle.walk.y > this._bmotion.idle.walk.rangeY2) {return true};
	if (x < 0) {return true};
	if (x > this._bmotion.idle.walk.rangeX3) {return true};
	if (y < 0) {return true};
	if (y > this._bmotion.idle.walk.rangeY3) {return true};	
	if (this._bmotion.idle.walk.duration <= 0) {return true};
	return false;
};

//==============================
// ** setBmotionWalkD
//==============================
Game_Battler.prototype.setBmotionWalkD = function(value,x,y) {
	if (x > this._bmotion.idle.walk.rangeX3) {return 1};
	if (x < 0) {return 0};
	if (y > this._bmotion.idle.walk.rangeY3) {return 1};
	if (y < 0) {return 0};	
    if (value > this._bmotion.idle.walk.rangeRealM) {return 1};
	if (value < -this._bmotion.idle.walk.rangeRealM) {return 0};
	return Math.randomInt(2)
};

//==============================
// ** refreshBmotionWalk
//==============================
Game_Battler.prototype.refreshBmotionWalk = function(x,y) {
    this._bmotion.idle.walk.duration = 60 + Math.randomInt(60);
	var wait = Math.randomInt(100);
	if (!this._bmotion.idle.walk.start && wait < this._bmotion.idle.walk.frequence) {
	   this._bmotion.idle.walk.sX = 0;
	   this._bmotion.idle.walk.sY = 0;
	   this._bmotion.idle.walk.wait = this._bmotion.idle.walk.duration; 
	   return;
	};
	this._bmotion.idle.walk.start = false;
	var preD = this._bmotion.idle.walk.sX
	var sx = (Math.randomInt(100) * this._bmotion.idle.walk.speed);
	var d = this.setBmotionWalkD(this._bmotion.idle.walk.x,x,y);
	this._bmotion.idle.walk.sX = d == 0 ? sx : -sx;
	var sy = (Math.randomInt(100) * this._bmotion.idle.walk.speed);
	var d = this.setBmotionWalkD(this._bmotion.idle.walk.y,x,y);
	this._bmotion.idle.walk.sY = d == 0 ? sy : -sy;
	this._bmotion.idle.walk.skip = 20
};


//==============================
// * update Bmotion Walk
//==============================
Sprite_Battler.prototype.updateBmotionWalk = function(x,y) {
	if (this._battler._bmotion.idle.walk.wait > 0) {this._battler._bmotion.idle.walk.wait--;return};
	if (this._battler._bmotion.idle.walk.skip > 0) {this._battler._bmotion.idle.walk.skip--};
	this._battler._bmotion.idle.walk.duration--;
    this._battler._bmotion.idle.walk.x += this._battler._bmotion.idle.walk.sX;
	this._battler._bmotion.idle.walk.y += this._battler._bmotion.idle.walk.sY;
	if (this._battler.needRefreshBmotionWalk(x,y)) {this._battler.refreshBmotionWalk(x,y)};
};


//==============================
// ** get Bmotion Idle
//==============================
Game_Battler.prototype.getBmotionIdle = function() {
    this.notetags().forEach(function(note) {			
         var note_data = note.split(': ')
    	 if (note_data[0].toLowerCase() == "breath motion"){
			 var par = note_data[1].split(':');
			 this._bmotion.idle.mode = Math.min(Math.max(Number(par[0]),0),5);
		 } else if (note_data[0].toLowerCase() == "float motion"){
			 var par = note_data[1].split(':');
			 var floatMode = Math.min(Math.max(Number(par[0]),0),3)
			 this._bmotion.idle.float.mode = floatMode;
			 this._bmotion.idle.float.enable = true;		 
		 } else if (note_data[0].toLowerCase() == "float motion height"){
			 var par = note_data[1].split(':');
			 var floatHeight = Math.min(Math.max(Number(par[0]),0),20);
			 this._bmotion.idle.float.range = floatHeight * 0.1;
			 this._bmotion.idle.float.enable = true;
		 } else if (note_data[0].toLowerCase() == "float motion speed"){
			 var par = note_data[1].split(':');
			 var floatSpeed = Math.min(Math.max(Number(par[0]),1),10);
			 this._bmotion.idle.float.speed = floatSpeed * 0.01;
			 this._bmotion.idle.float.enable = true;	
		 } else if (note_data[0].toLowerCase() == "swing motion"){
			 var par = note_data[1].split(':');
			 var mode = Math.min(Math.max(Number(par[0]),0),1);
			 this._bmotion.idle.swing.mode = mode;
			 this._bmotion.idle.swing.enable = true;
		 } else if (note_data[0].toLowerCase() == "swing motion speed"){
			 var par = note_data[1].split(':');
			 this._bmotion.idle.swing.speed = Number(par[0]) * 0.001;
			 this._bmotion.idle.swing.enable = true;			 
		 } else if (note_data[0].toLowerCase() == "swing motion rate"){
			 var par = note_data[1].split(':');
			 var rate = Math.min(Math.max(Number(par[0]),0),360);
			 this._bmotion.idle.swing.range = rate * 0.01;
			 this._bmotion.idle.swing.enable = true;			 			 
		 } else if (note_data[0].toLowerCase() == "walk motion speed") {
			 var par = note_data[1].split(':');   
			 var walkSpeed =  Math.min(Math.max(Number(par[0]),1),20); 
		     this._bmotion.idle.walk.speed = walkSpeed * 0.001;
			 this._bmotion.idle.walk.enable = true;
		 } else if (note_data[0].toLowerCase() == "walk motion frequence") {
			 var par = note_data[1].split(':');   
			 var walkfreq =  Math.min(Math.max(Number(par[0]),0),100);
			 var walkfreqReal = 100 - walkfreq;
		     this._bmotion.idle.walk.frequence = walkfreqReal;
			 this._bmotion.idle.walk.enable = true;	
		 } else if (note_data[0].toLowerCase() == "walk motion range") {
			 var par = note_data[1].split(':');   
			 var walkRange =  Math.min(Math.max(Number(par[0]),10),Graphics.boxWidth); 
		     this._bmotion.idle.walk.rangeReal = walkRange;
			 this._bmotion.idle.walk.enable = true;
			 this.clearBidleWalk();
		 } else if (note_data[0].toLowerCase() == "damage motion") {
			 var par = note_data[1].split(':');   
			 var mode =  Math.min(Math.max(Number(par[0]),0),3); 
		     this._bmotion.damage.mode = mode;
    	 };
	},this);
};

//==============================
// ** prepare Bmotion Action
//==============================
Game_Battler.prototype.prepareBmotionAction = function(item,mode) {
	if (!item) {return};
	if (mode == 1) {
    	var item_notes = item.note.split(/[\r\n]+/);
	} else {
		if (!item.object()) {return};
	    var item_notes = item.object().note.split(/[\r\n]+/);
	};
    item_notes.forEach(function(note) {
         var note_data = note.split(': ')
		 if (note_data[0].toLowerCase() == "action motion"){
			 var par = note_data[1].split(':');
			   this.clearBaction();
			   this.clearBdamage();
               this._bmotion.action.mode = Math.min(Math.max(Number(par[0]),0),13);
         };
	},this);
};

//==============================
// ** b motion X
//==============================
Game_Battler.prototype.bmotionX = function() {
    return this._bmotion.action.x + this._bmotion.idle.x + Math.abs(this._bmotion.damage.x) + this._bmotion.idle.walk.x + this._bmotion.idle.float.x;
};

//==============================
// ** b motion Y
//==============================
Game_Battler.prototype.bmotionY = function() {
   return this.bmotionFlyY() + this._bmotion.action.y + this._bmotion.idle.y + this._bmotion.damage.y + this._bmotion.idle.walk.y + this._bmotion.idle.swing.y;
}; 

//==============================
// ** bmotion Fly Y
//==============================
Game_Battler.prototype.bmotionFlyY = function() {
   return this._bmotion.idle.float.y + this._bmotion.action.y2
};

//==============================
// ** b motion scale X
//==============================
Game_Battler.prototype.bmotionScaleX = function() {
	var n = 1.00 + this._bmotion.action.scaleX + this._bmotion.idle.scaleX + this._bmotion.damage.scaleX;
    if (Imported.MOG_BattleCameraFrontal) {n += this.camScaleX()};
	return n;
};
//==============================
// ** b motion scale Y
//==============================
Game_Battler.prototype.bmotionScaleY = function() {
    var n =1.00 + this._bmotion.action.scaleY + this._bmotion.idle.scaleY + this._bmotion.damage.scaleY;
    if (Imported.MOG_BattleCameraFrontal) {n += this.camScaleY()};
    return n;
};

//==============================
// ** b motion rotation
//==============================
Game_Battler.prototype.bmotionRotation = function() {
    return this._bmotion.action.rotation + this._bmotion.idle.rotation + this._bmotion.idle.swing.rotation + this._bmotion.damage.rotation;
};

//==============================
// * Force Action
//==============================
var _mog_bmotion_gbattler_forceAction = Game_Battler.prototype.forceAction;
Game_Battler.prototype.forceAction = function(skillId, targetIndex) {
    _mog_bmotion_gbattler_forceAction.call(this,skillId, targetIndex);
    var itemD = $dataSkills[skillId]
	this.prepareBmotionAction(itemD,1);
};


//=============================================================================
// ** Sprite Battler
//=============================================================================

//==============================
// * init Members
//==============================
var _mog_bmotion_sprBat_initMembers = Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
	_mog_bmotion_sprBat_initMembers.call(this);
    this.initBmotion();
};

//==============================
// * init Bmotion
//==============================
Sprite_Battler.prototype.initBmotion = function() {
    this._bmotion = {};
	this._bmotion.initial = true;
	this._bmotion.shadow = false;
};

//==============================
// * set Init Bmotion Data
//==============================
Sprite_Battler.prototype.setInitBmotionData = function() {
	this._bmotion.initial = false;
	this._bmotion.shadow = this._battler._bmotion.idle.float.shadow
    this._battler.clearBaction();
	this._battler.clearBidle();
	this._battler.clearBdamage();
    this._battler._bmotion.idle.orgX = this.x;
	this._battler._bmotion.idle.orgY = this.y;
	this.setBmotionIdle();
};

//==============================
// * set Init Bmotion Data
//==============================
Sprite_Battler.prototype.setBmotionIdle = function() {
   this._battler.getBmotionIdle();
   if (this._battler._bmotion.idle.float.enable) {
	   this.setupBmotionFloat();
   } else if (this._battler._bmotion.idle.swing.enable) {
	   this.setupBmotionSwing()
   };
   if (this._battler._bmotion.idle.mode >= 0) {this.setupBmotionBreath()};   
   if (this._battler._bmotion.idle.walk.enable) {this._battler.refreshBmotionWalk()};
   this._battler._bmotion.idle.animation[10] = Math.randomInt(25);
};
   
//==============================
// * setup Bmotion Breath
//==============================
Sprite_Battler.prototype.setupBmotionBreath = function() {
    switch (this._battler._bmotion.idle.mode) {
	   case 0:
          this.setupBMotionIdle1(); // Normal Breath Effect
          break;
	   case 1:
          this.setupBMotionIdle1();; // Normal Breath Effect 2
          break;
	   case 2:
          this.setupBMotionIdle3();; // Normal Breath Effect 3
          break;
	   case 3:
          this.setupBMotionIdle1();; // Normal Breath Effect 3
          break;	
	   case 4:
          this.setupBMotionIdle4();; // Normal Breath Effect 3
          break;		  
	   case 5:
          this.setupBMotionIdle4();; // Normal Breath Effect 3
          break;			  	  
	   default :
          break				
    };
};

//==============================
// * update Idle Bmotion
//==============================
Sprite_Battler.prototype.updateIdleBmotion = function() {
	if (this._battler._bmotion.idle.animation[10] > 0) {this._battler._bmotion.idle.animation[10]--;return};
	if (this.canUpdateWalk()) {this.updateBmotionWalk(this.x,this.y)};
	if (this.canUpdateFloat()) {
		this.updateBMotionFloat();
	} else if (this._battler._bmotion.idle.swing.enable) {
		this.updateBmotionSwing()
	};
    this.updateBmotionBreathEffect(); 			
};

//==============================
// * update Bmotion Breath Effect
//==============================
Sprite_Battler.prototype.updateBmotionBreathEffect = function() {
    switch (this._battler._bmotion.idle.mode) {
	   case 0:
          this.updateBMotionIdle1();
          break;
	   case 1:
          this.updateBMotionIdle2();
          break;
	   case 2:
          this.updateBMotionIdle3();
          break;
	   case 3:
          this.updateBMotionIdle4();
          break;		  
	   case 5:
	     this.updateBMotionIdle5();
	      break;
	   case 6:
	     this.updateBMotionIdle6();
	      break		  
	   default :
          break				
    }; 
};

//==============================
// * setupBmotionSwing
//==============================
Sprite_Battler.prototype.setupBmotionSwing = function() {
    if (this._battler._bmotion.idle.swing.mode == 0) {
		this.setupBmotionSwingWave()
	} else if (this._battler._bmotion.idle.swing.mode == 1) {
		this.setupBmotionSwing360()
	};
};

//==============================
// * setupBmotionSwingWave
//==============================
Sprite_Battler.prototype.setupBmotionSwingWave = function() {
  	this._battler._bmotion.idle.swing.animation[0] = 0;
	var rds = Math.randomInt(100);
	var rds2 = rds * 0.0000001;		
	this._battler._bmotion.idle.swing.animation[2] = 0.00048 + (0.01  / this.bitmap.height) + rds2;
	this._battler._bmotion.idle.swing.animation[3] = 0.0096 + (0.25 / this.bitmap.height);
	var int = this._battler._bmotion.idle.swing.animation[3];
    var int2 = (Math.randomInt(int) * 0.0001).toFixed(4);
  	this._battler._bmotion.idle.swing.animation[1] = int2;
};

//==============================
// * updateBmotionSwing
//==============================
Sprite_Battler.prototype.updateBmotionSwing = function() {
    if (this._battler._bmotion.idle.swing.mode == 0) {
		 this.updateBmotionSwingWave();
	} else if (this._battler._bmotion.idle.swing.mode == 1) {
		 this.updateBmotionSwing360();
	};
};

//==============================
// * update Bmotion Swing Wave
//==============================
Sprite_Battler.prototype.updateBmotionSwingWave = function() {
	var maxAngle = this._battler._bmotion.idle.swing.range;
	if (this._battler._bmotion.idle.swing.animation[0] == 0) {	
	    var speed = this._battler._bmotion.idle.swing.speed + Math.abs(this._battler._bmotion.idle.swing.rotation -  maxAngle) * 0.015;
	    this._battler._bmotion.idle.swing.rotation += speed;		  
	    if (this._battler._bmotion.idle.swing.rotation >= maxAngle) {	
		    this._battler._bmotion.idle.swing.rotation = maxAngle
		    this._battler._bmotion.idle.swing.animation[0] = 1;
	    };	
	  } else {
	    var speed = this._battler._bmotion.idle.swing.speed + Math.abs(-this._battler._bmotion.idle.swing.rotation -  maxAngle) * 0.01;
    	this._battler._bmotion.idle.swing.rotation -= speed;		  
		if (this._battler._bmotion.idle.swing.rotation <= -maxAngle) {
		    this._battler._bmotion.idle.swing.rotation = -maxAngle
		    this._battler._bmotion.idle.swing.animation[0] = 0;
		};		  	  
	  }; 
};

//==============================
// * setupBmotionSwing360
//==============================
Sprite_Battler.prototype.setupBmotionSwing360 = function() {
   this._battler._bmotion.idle.swing.speed *= 3;
   this._battler._bmotion.idle.swing.y =  -(this.bitmap.height / 2);
   this._battler._bmotion.idle.swing.rotation = Math.randomInt(360);
   this.anchor.y = 0.5;
};

//==============================
// * update BmotionSwing360
//==============================
Sprite_Battler.prototype.updateBmotionSwing360 = function() {
   this._battler._bmotion.idle.swing.rotation += this._battler._bmotion.idle.swing.speed;
};

//==============================
// * need Get Data Motion
//==============================
Sprite_Battler.prototype.needGetDataBmotion = function() {
	if (!this._bmotion.initial) {return false};
	if (!this._battler) {return false};
	if (!this.bitmap) {return false};
	if (!this.bitmap.isReady()) {return false};
	return true;
};

//==============================
// * can Update Bmotion
//==============================
Sprite_Battler.prototype.canUpdateBmotion = function() {
    if (!this._battler) {return false};
   // if (this._battler.isDead()) {return false};
	if (!this.visible) {return false};
    return true;
};

//==============================
// * can Update Idle BMotion
//==============================
Sprite_Battler.prototype.canUpdateIdleBMotion = function() {   
    if (this.canUpdateActionBMotion()) {return false};
	if (this._battler.isDead()) {return false}
	return true;
};

//==============================
// * can Update Action BMotion
//==============================
Sprite_Battler.prototype.canUpdateActionBMotion = function() {
    if (this._battler._bmotion.action.mode < 0) {return false};
    return true;	
};

//==============================
// * can Update Walk
//==============================
Sprite_Battler.prototype.canUpdateWalk = function() {
   if (!this._battler._bmotion.idle.walk.enable) {return false};
   if (BattleManager.isBusy()) {return false};
   return true;	
};

//==============================
// * can Update Float
//==============================
Sprite_Battler.prototype.canUpdateFloat = function() {
	if (!this._battler._bmotion.idle.float.enable) {return false};
	return true;
};

//==============================
// * setup BMotion Idle 1
//==============================
Sprite_Battler.prototype.setupBMotionIdle1 = function() {
 	    this._battler._bmotion.idle.animation[0] = 0;
		var rds = Math.randomInt(100);
		var rds2 = rds * 0.0000001;		
		this._battler._bmotion.idle.animation[2] = 0.00003 + (0.01  / this.bitmap.height) + rds2;
	    this._battler._bmotion.idle.animation[3] = 0.0006 + (0.25 / this.bitmap.height);
		var int = this._battler._bmotion.idle.animation[3];
        var int2 = (Math.randomInt(int) * 0.0001).toFixed(4);
  	    this._battler._bmotion.idle.animation[1] = int2;
};

//==============================
// * update BMotion Idle 1
//==============================
Sprite_Battler.prototype.updateBMotionIdle1 = function() {
	  if (this._battler._bmotion.idle.animation[0] == 0) {		  
		  this._battler._bmotion.idle.animation[1] -= this._battler._bmotion.idle.animation[2]
		  this._battler._bmotion.idle.scaleY += this._battler._bmotion.idle.animation[1];		  
		  if (this._battler._bmotion.idle.animation[1] <= -this._battler._bmotion.idle.animation[3]) {	
			  this._battler._bmotion.idle.animation[1] = -this._battler._bmotion.idle.animation[3]
			  this._battler._bmotion.idle.animation[0] = 1;
		  };	
	  } else {
		  this._battler._bmotion.idle.animation[1] += this._battler._bmotion.idle.animation[2]
		  this._battler._bmotion.idle.scaleY += this._battler._bmotion.idle.animation[1];
		  
		  if (this._battler._bmotion.idle.animation[1] >= this._battler._bmotion.idle.animation[3]) {	
			  this._battler._bmotion.idle.animation[1] = this._battler._bmotion.idle.animation[3]
			  this._battler._bmotion.idle.animation[0] = 0;
		  };
	  };
};

//==============================
// * update BMotionIdle 2
//==============================
Sprite_Battler.prototype.updateBMotionIdle2 = function() {
	  if (this._battler._bmotion.idle.animation[0] == 0) {		  
		  this._battler._bmotion.idle.animation[1] -= this._battler._bmotion.idle.animation[2]
		  this._battler._bmotion.idle.scaleY += this._battler._bmotion.idle.animation[1];
		  this._battler._bmotion.idle.scaleX -= this._battler._bmotion.idle.animation[1];		  
		  if (this._battler._bmotion.idle.animation[1] <= -this._battler._bmotion.idle.animation[3]) {	
			  this._battler._bmotion.idle.animation[1] = -this._battler._bmotion.idle.animation[3]
			  this._battler._bmotion.idle.animation[0] = 1;
		  };	
	  } else {
		  this._battler._bmotion.idle.animation[1] += this._battler._bmotion.idle.animation[2]
		  this._battler._bmotion.idle.scaleY += this._battler._bmotion.idle.animation[1];
		  this._battler._bmotion.idle.scaleX -= this._battler._bmotion.idle.animation[1];
		  if (this._battler._bmotion.idle.animation[1] >= this._battler._bmotion.idle.animation[3]) {	
			  this._battler._bmotion.idle.animation[1] = this._battler._bmotion.idle.animation[3]
			  this._battler._bmotion.idle.animation[0] = 0;
		  };
	  };
};

//==============================
// * setup BMotion Idle 3
//==============================
Sprite_Battler.prototype.setupBMotionIdle3 = function() {
 	    this._battler._bmotion.idle.animation[0] = 0;
		var rds = Math.randomInt(100);
		var rds2 = rds * 0.0000001;		
		this._battler._bmotion.idle.animation[2] = 0.00001 + (0.01  / this.bitmap.height) + rds2;
	    this._battler._bmotion.idle.animation[3] = 0.0002 + (0.25 / this.bitmap.height);
		var int = this._battler._bmotion.idle.animation[3];
        var int2 = (Math.randomInt(int) * 0.0001).toFixed(4);
  	    this._battler._bmotion.idle.animation[1] = int2;
};

//==============================
// * update BMotionIdle 3
//==============================
Sprite_Battler.prototype.updateBMotionIdle3 = function() {
	  if (this._battler._bmotion.idle.animation[0] == 0) {		  
		  this._battler._bmotion.idle.animation[1] -= this._battler._bmotion.idle.animation[2];
		  var speed = this._battler._bmotion.idle.animation[1] * 5;
	      this._battler._bmotion.idle.scaleY += speed;
	      this._battler._bmotion.idle.scaleX -= speed * 1.5;
		  if (this._battler._bmotion.idle.animation[1] <= -this._battler._bmotion.idle.animation[3]) {	
			  this._battler._bmotion.idle.animation[1] = -this._battler._bmotion.idle.animation[3]
			  this._battler._bmotion.idle.animation[0] = 1;
		  };	
	  } else {
		  this._battler._bmotion.idle.animation[1] += this._battler._bmotion.idle.animation[2];
		  var speed = this._battler._bmotion.idle.animation[1] * 5;
	      this._battler._bmotion.idle.scaleY += speed;
	      this._battler._bmotion.idle.scaleX -= speed  * 1.5;
		  if (this._battler._bmotion.idle.animation[1] >= this._battler._bmotion.idle.animation[3]) {	
			  this._battler._bmotion.idle.animation[1] = this._battler._bmotion.idle.animation[3]
			  this._battler._bmotion.idle.animation[0] = 0;
		  };
	  };
};

//==============================
// * update BMotionIdle 4
//==============================
Sprite_Battler.prototype.updateBMotionIdle4 = function() {
	  if (this._battler._bmotion.idle.animation[0] == 0) {		  
		  this._battler._bmotion.idle.animation[1] -= this._battler._bmotion.idle.animation[2];
		  var speed = this._battler._bmotion.idle.animation[1] * 5;
	      this._battler._bmotion.idle.scaleX -= speed;
		  if (this._battler._bmotion.idle.animation[1] <= -this._battler._bmotion.idle.animation[3]) {	
			  this._battler._bmotion.idle.animation[1] = -this._battler._bmotion.idle.animation[3]
			  this._battler._bmotion.idle.animation[0] = 1;
		  };	
	  } else {
		  this._battler._bmotion.idle.animation[1] += this._battler._bmotion.idle.animation[2];
		  var speed = this._battler._bmotion.idle.animation[1] * 5;
	      this._battler._bmotion.idle.scaleX -= speed;
		  if (this._battler._bmotion.idle.animation[1] >= this._battler._bmotion.idle.animation[3]) {	
			  this._battler._bmotion.idle.animation[1] = this._battler._bmotion.idle.animation[3]
			  this._battler._bmotion.idle.animation[0] = 0;
		  };
	  };
};

//==============================
// * setup BMotion Idle 4
//==============================
Sprite_Battler.prototype.setupBMotionIdle4 = function() {
   this._battler._bmotion.idle.animation[1] = -Math.randomInt(60)
};

//==============================
// * updateBmotionDamageKnock
//==============================
Sprite_Battler.prototype.updateBMotionIdle5 = function() {
	var speed = 2;
	var speedScale = 0.003
	var rot = 0.003;
	var range = -80;
	if (this._battler._bmotion.idle.animation[0] == 0) {
        this._battler._bmotion.idle.animation[1] -= speed;
		this._battler._bmotion.idle.rotation +=rot;
		this._battler._bmotion.idle.scaleX -=  speedScale;
		this._battler._bmotion.idle.scaleY +=  speedScale;
		if (this._battler._bmotion.idle.animation[1] <= range) {
		    this._battler._bmotion.idle.animation[1]  = range;
			this._battler._bmotion.idle.animation[0] = 1;
		}
	} else if (this._battler._bmotion.idle.animation[0] == 1) {
		this._battler._bmotion.idle.animation[1] += speed;
		this._battler._bmotion.idle.rotation -=rot;
		this._battler._bmotion.idle.scaleX +=  speedScale;
		this._battler._bmotion.idle.scaleY -=  speedScale;		
		if (this._battler._bmotion.idle.animation[1] >= 0) {
		    this._battler._bmotion.idle.animation[0] = 0;
		};
	};
};

//==============================
// * updateBmotionDamageKnock
//==============================
Sprite_Battler.prototype.updateBMotionIdle6 = function() {
	var speed = 2;
	var speedScale = 0.003
	var rot = 0.003;
	var range = -80;
	if (this._battler._bmotion.idle.animation[0] == 0) {
        this._battler._bmotion.idle.animation[1] -= speed;
		this._battler._bmotion.idle.rotation -=rot;
		this._battler._bmotion.idle.scaleX -=  speedScale;
		this._battler._bmotion.idle.scaleY +=  speedScale;
		if (this._battler._bmotion.idle.animation[1]  <= range) {
		    this._battler._bmotion.idle.animation[1]  = range;
			this._battler._bmotion.idle.animation[0] = 1;
		}
	} else if (this._battler._bmotion.idle.animation[0] == 1) {
		this._battler._bmotion.idle.animation[1] += speed;
		this._battler._bmotion.idle.rotation +=rot;
		this._battler._bmotion.idle.scaleX +=  speedScale;
		this._battler._bmotion.idle.scaleY -=  speedScale;		
		if (this._battler._bmotion.idle.animation[1] >= 0) {
		    this._battler._bmotion.idle.animation[0] = 0;
		};
	};
};

//==============================
// * setup BMotion Float
//==============================
Sprite_Battler.prototype.setupBmotionFloat = function() {
 	    this._battler._bmotion.idle.animation[0] = 0;
		var rds = Math.randomInt(100);
		var rds2 = rds * 0.0001;
		this._battler._bmotion.idle.float.animation[2] = this._battler._bmotion.idle.float.speed + rds2; //+ (0.01  / this.bitmap.height) + rds2;
	    this._battler._bmotion.idle.float.animation[3] = this._battler._bmotion.idle.float.range;
		var int = this._battler._bmotion.idle.float.animation[3] * 10000;
        var int2 = Math.randomInt(int) * 0.01;
  	    this._battler._bmotion.idle.animation[1] = int2;
		this._battler._bmotion.idle.float.animation[9] = Math.randomInt(10);
		this._battler._bmotion.idle.float.animation[5] = 0;
		this._battler._bmotion.idle.float.animation[6] = Math.randomInt(2);
		this._battler._bmotion.idle.float.animation[7] = Math.random(2);
		this._d = [0,0];
};

//==============================
// * set Bmotion Float Mode
//==============================
Sprite_Battler.prototype.setBmotionFloatMode = function() {
	if (this._battler._bmotion.idle.float.mode == 0) {return 0;
    } else if (this._battler._bmotion.idle.float.mode == 1) {return -this._battler._bmotion.idle.float.animation[1]	;
	} else if (this._battler._bmotion.idle.float.mode == 2) {return this._battler._bmotion.idle.float.animation[1]	;
	} else if (this._battler._bmotion.idle.float.mode == 3) {
		if (this._battler._bmotion.idle.float.animation[6] == 0) {
			if (this._battler._bmotion.idle.float.animation[5] == 0) {
			  return -this._battler._bmotion.idle.float.animation[1];	
	 
			} else {
				
			  return this._battler._bmotion.idle.float.animation[1];
			};
		} else {
			if (this._battler._bmotion.idle.float.animation[5] == 0) {
			  return this._battler._bmotion.idle.float.animation[1];	
			} else {
			  return -this._battler._bmotion.idle.float.animation[1];
			};
		};
	};
    return this._battler._bmotion.idle.float.animation[1]	;
};

//==============================
// * update BMotion Float
//==============================
Sprite_Battler.prototype.updateBMotionFloat = function() {
	if (this._battler._bmotion.idle.float.animation[9] > 0) {
		this._battler._bmotion.idle.float.animation[9]--;
		return
	};		
    if (this._battler._bmotion.idle.float.animation[0] == 0) {		  
		this._battler._bmotion.idle.float.animation[1] -= this._battler._bmotion.idle.float.animation[2];
		this._battler._bmotion.idle.float.animation[4] = this.setBmotionFloatMode();
		this._battler._bmotion.idle.float.y += this._battler._bmotion.idle.float.animation[1];
		this._battler._bmotion.idle.float.x += this._battler._bmotion.idle.float.animation[4];	
		this._d[0] = 0;  
		if (this._battler._bmotion.idle.float.animation[1] <= -this._battler._bmotion.idle.float.animation[3]) {	
			  this._battler._bmotion.idle.float.animation[1] = -this._battler._bmotion.idle.float.animation[3]
			  this._battler._bmotion.idle.float.animation[0] = 1;
		};	
	  } else {
		this._battler._bmotion.idle.float.animation[1] += this._battler._bmotion.idle.float.animation[2];
		this._battler._bmotion.idle.float.animation[4] = this.setBmotionFloatMode();
		this._battler._bmotion.idle.float.y += this._battler._bmotion.idle.float.animation[1];
		this._battler._bmotion.idle.float.x += this._battler._bmotion.idle.float.animation[4];
		this._d[0] = 1;
	    if (this._battler._bmotion.idle.float.animation[1] >= this._battler._bmotion.idle.float.animation[3]) {	
			this._battler._bmotion.idle.float.animation[1] = this._battler._bmotion.idle.float.animation[3]
		    this._battler._bmotion.idle.float.animation[0] = 0;
		};
	  };
      this._d[0] = this._battler._bmotion.idle.float.animation[1] > 0 ? 0 : 1;
      if (this._d[1] != this._d[0]){
		  this._d[1] = this._d[0]
		  this._battler._bmotion.idle.float.animation[5]++;
		  if (this._battler._bmotion.idle.float.animation[5] > 1) {
			  this._battler._bmotion.idle.float.animation[5] = 0;
			  this._battler._bmotion.idle.float.animation[6]++;
			  if (this._battler._bmotion.idle.float.animation[6] > 1) {
				  this._battler._bmotion.idle.float.animation[6] = 0 
			  };
		  };
     }; 
};

//==============================
// * update Action Bmotion
//==============================
Sprite_Battler.prototype.updateActionBmotion = function() {
	if (this._battler._bmotion.action.initial) {this.setupInitialBmotionAction()};
	if (this._battler._bmotion.action.animation[9] > 0) {
		this._battler._bmotion.action.animation[9]--;
		return;
	};	
    switch (this._battler._bmotion.action.mode) {
	   case 0:
          this.updateBMotionActionZoom1();
          break;	
	   case 1:
          this.updateBMotionSwingRight();
          break;
	   case 2:
          this.updateBMotionSwingLeft();
          break;
	   case 3:
          this.updateBmotionJump();
          break;
	   case 4:
          this.updateBmotionJumpRoll();
          break;	
	   case 5:
	      this.updateBmotionJumpSlime();
          break;		  
	   case 6:
          this.updateBmotionRotation();
          break; 	
	   case 7: 
	      this.updateBmotionFrontalAttackCharge();
          break;
	   case 8:
         this.updateBmotionWaveAttack();	
          break;
	   case 9:
	      this.updateBmotionShakeAttack();
          break;		    
	   case 10:
	      this.updateBmotionSideRightSlash();
          break;
	   case 11:
          this.updateBmotionSideRightSlashDouble();
          break;
	   case 12:
          this.updateBmotionSideAttack();
		  break;
	   case 13:     
          this.updateBmotionSideRightAttackCharge();
		  break;
	   default :
          break				
    };
	if (this.needBmotionResetZoomAction()) {
		this._battler._bmotion.action.scaleX = 0;
		this._battler._bmotion.action.scaleY = 0
	};
};

//==============================
// * need Bmotion ResetZoom Action
//==============================
Sprite_Battler.prototype.needBmotionResetZoomAction = function() {
	if (Imported.MOG_BattleCameraFrontal ) {
    	//if (this._battler._bmotion.action.mode == 5) {return true};
	};
	return false;
};

//==============================
// * is Jump Action?
//==============================
Sprite_Battler.prototype.isBJumpAction = function() {
	if (this._battler._bmotion.action.mode == 3) {return true};
	if (this._battler._bmotion.action.mode == 4) {return true};
	if (this._battler._bmotion.action.mode == 10) {return true};
	return false;
};

//==============================
// * setup Initial Bmotion Action
//==============================
Sprite_Battler.prototype.setupInitialBmotionAction = function() {
	this._battler._bmotion.action.initial = false;
 	if (this._battler._bmotion.action.initial) {this.setupInitialBmotionAction()};
    switch (this._battler._bmotion.action.mode) {
	   case 0:
          this.setupBMotionActionZoom1();
          break;
	   case 3:
          this.setupBMotionActionJump1();
          break;
	   case 4:
          this.setupBMotionActionJumpRoll();
          break;
	   case 5:
          this.setupBmotionJumpSlime();		  
          break;
	   case 8:
          this.setupBmotionWaveAttack();			  
	   case 13:
          this.setupBmotionSideRightSlashCharge();		  
          break;
	   default :
          break				
    };  			
};

//==============================
// * setup B motion Action Zoom 1
//==============================
Sprite_Battler.prototype.setupBMotionActionZoom1 = function() {
 	this._battler._bmotion.action.animation[1] = 0.005 + (1.00 / this.bitmap.height);
};

//==============================
// * update BMotion Action 1
//==============================
Sprite_Battler.prototype.updateBMotionActionZoom1 = function() {
   	this._battler._bmotion.action.animation[0]+= 0.5;
	if (this._battler._bmotion.action.animation[0] < 15) {
		this._battler._bmotion.action.scaleX += this._battler._bmotion.action.animation[1];
		this._battler._bmotion.action.scaleY = this._battler._bmotion.action.scaleX;
	} else if (this._battler._bmotion.action.animation[0] < 30) {
	    this._battler._bmotion.action.scaleX -= this._battler._bmotion.action.animation[1];
		this._battler._bmotion.action.scaleY = this._battler._bmotion.action.scaleX;
	} else {
	    this._battler.clearBaction();
	};		
};

//==============================
// * updateBMotionSwingRight
//==============================
Sprite_Battler.prototype.updateBMotionSwingRight = function() {
    this._battler._bmotion.action.animation[0]++;
	var speed = 8;
	if (this._battler._bmotion.action.animation[0] < 10) {
        this._battler._bmotion.action.x += speed;
        this._battler._bmotion.action.y += speed;
		if (Imported.MOG_BattleCameraFrontal) {		
		    this._battler._bmotion.action.scaleX = -2.00 - this._battler.camScaleX() * 2.0;
		} else {
			this._battler._bmotion.action.scaleX = -2.00;
		};
	} else if (this._battler._bmotion.action.animation[0] < 30) {
        this._battler._bmotion.action.x -= speed;
 	} else if (this._battler._bmotion.action.animation[0] < 40) {
		this._battler._bmotion.action.scaleX = 0
        this._battler._bmotion.action.x += speed;
        this._battler._bmotion.action.y -= speed;			
	} else {
	    this._battler.clearBaction();
	};	
};

//==============================
// * updateBMotionSwingLeft
//==============================
Sprite_Battler.prototype.updateBMotionSwingLeft = function() {
    this._battler._bmotion.action.animation[0]++;
	var speed = 8;
	if (this._battler._bmotion.action.animation[0] < 10) {
        this._battler._bmotion.action.x -= speed;
        this._battler._bmotion.action.y += speed; 
	} else if (this._battler._bmotion.action.animation[0] < 30) {
        this._battler._bmotion.action.x += speed;
 	} else if (this._battler._bmotion.action.animation[0] < 40) {
        this._battler._bmotion.action.x -= speed;
        this._battler._bmotion.action.y -= speed;
		if (Imported.MOG_BattleCameraFrontal) {		
		    this._battler._bmotion.action.scaleX = -2.00 - this._battler.camScaleX() * 2.0;
		} else {
			this._battler._bmotion.action.scaleX = -2.00;
		};
	} else {
	    this._battler.clearBaction();
	};	
};

//==============================
// * setup B motion Action Jump 1
//==============================
Sprite_Battler.prototype.setupBMotionActionJump1 = function() {
	this._battler._bmotion.action.animation[1] = -7;
};

//==============================
// * update BMotion Jump
//==============================
Sprite_Battler.prototype.updateBmotionJump = function() {
	  this._battler._bmotion.action.animation[1] += 0.30;
	  this._battler._bmotion.action.y2 += this._battler._bmotion.action.animation[1];	  
	  if (this._battler._bmotion.action.animation[1] >= 7) {
		  this._battler._bmotion.action.y2 = 0
		  this._battler.clearBaction()
	  };
};

//==============================
// * setup B motion Action Jump Roll
//==============================
Sprite_Battler.prototype.setupBMotionActionJumpRoll = function() {
	this._battler._bmotion.action.animation[1] = -8;
};

//==============================
// * update BMotion Jump Roll
//==============================
Sprite_Battler.prototype.updateBmotionJumpRoll = function() {
	this._battler._bmotion.action.animation[0]++;		  
	this._battler._bmotion.action.animation[1] += 0.30;
	this._battler._bmotion.action.y2 += this._battler._bmotion.action.animation[1];	
	if (this._battler._bmotion.action.animation[1] >= 8) {this._battler.clearBaction()};
    if (this._battler._bmotion.action.animation[0] > 5) {
	    this._battler._bmotion.action.animation[0] = 0;
    	if (Imported.MOG_BattleCameraFrontal) {		
		    var s = -2.00 - this._battler.camScaleX() * 2.0;
	    	this._battler._bmotion.action.scaleX = this._battler._bmotion.action.scaleX == 0 ? s : 0;
		} else {
			this._battler._bmotion.action.scaleX = this._battler._bmotion.action.scaleX == 0 ? -2.00 : 0;
		};				
	};
};

//==============================
// * setup B motion Action Jump Slime
//==============================
Sprite_Battler.prototype.setupBmotionJumpSlime = function() {
	this._battler._bmotion.action.animation[1] = -14
	this._battler._bmotion.action.wait = true;
	this._movementDuration = 10	
};

//==============================
// * update BMotion Jump Slime
//==============================
Sprite_Battler.prototype.updateBmotionJumpSlime = function() {
	if (this._battler._bmotion.action.animation[0] == 0) { 		  
	    this._battler._bmotion.action.animation[1] += 1;
    	this._battler._bmotion.action.y2 += this._battler._bmotion.action.animation[1];	
		if (this._battler._bmotion.action.scaleX >= -0.8) {
			this._battler._bmotion.action.scaleX -= 0.02;
			this._battler._bmotion.action.scaleY += 0.05;
		};
	    if (this._battler._bmotion.action.animation[1] >= 14) {
			this._battler._bmotion.action.animation[0] = 1;
			this._battler._bmotion.action.y2 = 0;
	    };
	} else if (this._battler._bmotion.action.animation[0] == 1) { 
	    this._battler._bmotion.action.scaleX += 0.12;
		this._battler._bmotion.action.scaleY -= 0.08;		
	    if (this._battler._bmotion.action.scaleX >= 2.50) {
			this._battler._bmotion.action.animation[0] = 2;
	    	this._battler._bmotion.action.wait = false;
		    this._movementDuration = 0;
	    };
	} else if (this._battler._bmotion.action.animation[0] == 2) { 	
        if (this._battler._bmotion.action.scaleX >= 0.00) {
			this._battler._bmotion.action.scaleX -= 0.14;
			if (this._battler._bmotion.action.scaleX < 0.00) {this._battler._bmotion.action.scaleX = 0}
		}
        if (this._battler._bmotion.action.scaleY < 0.00) {
			this._battler._bmotion.action.scaleY += 0.06;
			if (this._battler._bmotion.action.scaleY >= 0.00) {this._battler._bmotion.action.scaleY = 0}
		};
		if (this._battler._bmotion.action.scaleX == 0 && this._battler._bmotion.action.scaleY == 0  ) {
			this._battler.clearBaction();
			this._movementDuration = 0;
		};
	};
};

//==============================
// * setup B motion Action Jump Frontal
//==============================
Sprite_Battler.prototype.setupBMotionActionJumpFrontal = function() {
	this._battler._bmotion.action.animation[1] = -7;
	this._battler._bmotion.action.wait = true;
	this._movementDuration = 10
};

//==============================
// * update BMotion Jump Frontal
//==============================
Sprite_Battler.prototype.updateBmotionJumpFrontal = function() {
	this._battler._bmotion.action.animation[1] += 0.30;
	this._battler._bmotion.action.y2 += this._battler._bmotion.action.animation[1];	  
	if (this._battler._bmotion.action.animation[1] > 4) {
		this._battler._bmotion.action.wait = false;
		this._movementDuration = 0
	};
	if (this._battler._bmotion.action.animation[1] >= 7) {
		if (this._battler._bmotion.action.animation[0] == 0) {
			this._battler._bmotion.action.animation[0] = 1; 
	    	this._battler._bmotion.action.animation[1] = -7;
			this._battler._bmotion.action.animation[9] = 5;
		} else {
		    this._battler.clearBaction();
		};
	};
	if (this._battler._bmotion.action.animation[0] == 0) {
		this._battler._bmotion.action.scaleX += 0.015;
		this._battler._bmotion.action.y2 += 3;
	} else {
	    this._battler._bmotion.action.scaleX -= 0.015;
		this._battler._bmotion.action.y2 -= 3;
	};
	this._battler._bmotion.action.scaleY = this._battler._bmotion.action.scaleX;
};

//==============================
// * update BMotion Rotation
//==============================
Sprite_Battler.prototype.updateBmotionRotation = function() {	
	this._battler._bmotion.action.animation[1]++;
	var speed = this._battler.isActor() ? -0.2 : 0.2;
    this._battler._bmotion.action.rotation += speed;
    if (this._battler._bmotion.action.animation[1] > 30) {
		this._battler.clearBaction();
		this._movementDuration = 0;
	};
};

//==============================
// * update BMotion Side Right Slash
//==============================
Sprite_Battler.prototype.updateBmotionSideRightSlash = function() {
	  var speed = this._battler.isActor() ? -0.1 : 0.1;
      this._battler._bmotion.action.animation[0]++;
	  if (this._battler._bmotion.action.animation[0] < 10) {
          this._battler._bmotion.action.rotation -= speed;
	  } else if (this._battler._bmotion.action.animation[0] < 30) {
          this._battler._bmotion.action.rotation += speed;
 	  } else if (this._battler._bmotion.action.animation[0] < 40) {
          this._battler._bmotion.action.rotation -= speed;			
	  } else {
	      this._battler.clearBaction();
	  };		  
};

//==============================
// * update BMotion Frontal Side Slash Double
//==============================
Sprite_Battler.prototype.updateBmotionSideRightSlashDouble = function() {
	  var speed = this._battler.isActor() ? -0.2 : 0.2; 		  
      this._battler._bmotion.action.animation[0]++;
	  if (this._battler._bmotion.action.animation[0] < 5) {
          this._battler._bmotion.action.rotation -= speed;
	  } else if (this._battler._bmotion.action.animation[0] < 15) {
          this._battler._bmotion.action.rotation += speed;
 	  } else if (this._battler._bmotion.action.animation[0] < 25) {
          this._battler._bmotion.action.rotation -= speed;
	  } else if (this._battler._bmotion.action.animation[0] < 35) {
          this._battler._bmotion.action.rotation += speed;
 	  } else if (this._battler._bmotion.action.animation[0] < 40) {
          this._battler._bmotion.action.rotation -= speed;			  
	  } else {
	      this._battler.clearBaction();
	  };			  
};


//==============================
// * update BMotion Side Attack
//==============================
Sprite_Battler.prototype.updateBmotionSideAttack = function() {
	var speed = this._battler.isActor() ? -3 : 3;
	this._battler._bmotion.action.animation[0]++
	if (this._battler._bmotion.action.animation[0] < 20) {
		this._battler._bmotion.action.x += speed;	
	} else if (this._battler._bmotion.action.animation[0] < 40) {
		this._battler._bmotion.action.x -= speed;	  	
	} else {
		this._battler.clearBaction();
	};
};

//==============================
// * setup BMotion Frontal Side Slash Charge
//==============================
Sprite_Battler.prototype.setupBmotionSideRightSlashCharge = function() {
	this._battler._bmotion.action.animation[1] = -8;
	this._battler._bmotion.action.wait = true;
	this._movementDuration = 10	
};

//==============================
// * update BMotion Frontal Side Attack Charge
//==============================
Sprite_Battler.prototype.updateBmotionSideRightAttackCharge = function() { 		  
	  if (this._battler._bmotion.action.animation[0] == 0) {
		  this._battler._bmotion.action.animation[1] += 0.45;
		  this._battler._bmotion.action.y += this._battler._bmotion.action.animation[1];
		  var speed = this._battler.isActor() ? -3 : 3; 
		  this._battler._bmotion.action.x -= speed;  
		  if (this._battler._bmotion.action.animation[1] >= 8) {
			  this._battler._bmotion.action.animation[0] = 1
			  this._battler._bmotion.action.y = 0;  
		  };	  
	  } else if (this._battler._bmotion.action.animation[0] == 1) {
		  this._battler._bmotion.action.animation[0] = 2;
		//  this._battler._bmotion.action.scaleX = -2.00;
		  this._battler._bmotion.action.animation[3] = -this._battler._bmotion.action.x;
		  this._battler._bmotion.action.animation[9] = 10;
		  this._movementDuration = 0;
		  this._battler._bmotion.action.wait = false;		  
	  } else if (this._battler._bmotion.action.animation[0] == 2) {
          this._battler._bmotion.action.scaleX = 0
		  if (this._battler.isActor()) {
			  this._battler._bmotion.action.x -= 24;
			  if (this._battler._bmotion.action.x <= this._battler._bmotion.action.animation[3] ) {
				  this._battler._bmotion.action.x = this._battler._bmotion.action.animation[3];
				  this._battler._bmotion.action.animation[0] = 3;
			  };		  
	      } else {
			  this._battler._bmotion.action.x += 24;
			  if (this._battler._bmotion.action.x >= this._battler._bmotion.action.animation[3] ) {
				  this._battler._bmotion.action.x = this._battler._bmotion.action.animation[3];
				  this._battler._bmotion.action.animation[0] = 3;
			  };
	      };
	  } else if (this._battler._bmotion.action.animation[0] == 3) {
		  if (this._battler.isActor()) {
			  var speed = this._battler.isActor() ? -3 : 3;
			  this._battler._bmotion.action.x -= speed;
			  if (this._battler._bmotion.action.x >= 0) {	
				  this._battler.clearBaction()
			  };		  
		  } else {
			  var speed = this._battler.isActor() ? -3 : 3;
			  this._battler._bmotion.action.x -= speed;
			  if (this._battler._bmotion.action.x <= 0) {	
				  this._battler.clearBaction();
			  };	
		  };
	  };
};

//==============================
// * setup BMotion Wave Attack
//==============================
Sprite_Battler.prototype.setupBmotionWaveAttack = function() {
	this._battler._bmotion.action.wait = true;
	this._movementDuration = 10		
};

//==============================
// * update BMotion Wave Attack
//==============================
Sprite_Battler.prototype.updateBmotionWaveAttack = function() { 	
     this._battler._bmotion.action.animation[0]++;
	 var speed = 0.2;
     if (this._battler._bmotion.action.animation[0] < 5) {
		 this._battler._bmotion.action.rotation += speed;
	 } else if (this._battler._bmotion.action.animation[0] < 15) {
		 this._battler._bmotion.action.rotation -= speed;
	 } else if (this._battler._bmotion.action.animation[0] < 25) {
		 this._battler._bmotion.action.rotation += speed;
		 this._battler._bmotion.action.wait = false;
		 this._movementDuration = 0;		 
	 } else if (this._battler._bmotion.action.animation[0] < 35) {	 	 
		 this._battler._bmotion.action.rotation -= speed;
	 } else if (this._battler._bmotion.action.animation[0] < 45) {	
		 this._battler._bmotion.action.rotation += speed;
	 } else if (this._battler._bmotion.action.animation[0] < 50) {	
		 this._battler._bmotion.action.rotation -= speed;		 		 
	 } else {
		 this._battler._bmotion.action.rotation = 0;
		 this._battler.clearBaction();
		 this._movementDuration = 0	;
	 };
};

//==============================
// * update BMotion Shake Attack
//==============================
Sprite_Battler.prototype.updateBmotionShakeAttack = function() { 	
     this._battler._bmotion.action.animation[0]++;
     this._battler._bmotion.action.animation[1]++;
     if (this._battler._bmotion.action.animation[1] < 2) {return};
     this._battler._bmotion.action.animation[1] = 0
     this._battler._bmotion.action.x = Math.randomInt(30) - 15;
	 this._battler._bmotion.action.y = Math.randomInt(30) - 15;
     if (this._battler._bmotion.action.animation[0] > 40) {
		 this._battler.clearBaction();
		 this._movementDuration = 0	;		 
	 };
};

//==============================
// * update BMotion Frontal Attack Charge
//==============================
Sprite_Battler.prototype.updateBmotionFrontalAttackCharge = function() {
	 this._movementDuration = 10	;
	 this._battler._bmotion.action.wait = true;
     this._battler._bmotion.action.animation[0]++;
     if (this._battler._bmotion.action.animation[0] < 20) {
	//	 this._battler._bmotion.action.scaleX = -2.00
	 } else if (this._battler._bmotion.action.animation[0] < 30) {
		 this._battler._bmotion.action.scaleX = 0
		 this._battler._bmotion.action.y += 15
	     this._movementDuration = 0	;
	     this._battler._bmotion.action.wait = false;		 
	 } else if (this._battler._bmotion.action.animation[0] < 40) {	 
		 this._battler._bmotion.action.y -= 15
	 } else {
		 this._battler.clearBaction();
		 this._movementDuration = 0	;			
	 };
};

//==============================
// * update Bmotion Base
//==============================
Sprite_Battler.prototype.updateBmotionBase = function() {
    if (this.canUpdateIdleBMotion()) {this.updateIdleBmotion()};
	if (this.canUpdateActionBMotion()) {this.updateActionBmotion()};
	if (this.canUpdateDamageBmotion()) {this.updateDamageBmotion()};
};

//==============================
// * can Update Damage Bmotion
//==============================
Sprite_Battler.prototype.canUpdateDamageBmotion = function() {
    if (this._battler._bmotion.damage.mode < 0) {return false};
	if (this._battler._bmotion.damage.duration <= 0) {return false};
    return true;
};

//==============================
// * update Damage Bmotion
//==============================
Sprite_Battler.prototype.updateDamageBmotion = function() {
   if (this._battler._bmotion.damage.mode == 0) {
	   this.updateBmotionDamageShake();
   } else if (this._battler._bmotion.damage.mode == 1) {
	   this.updateBmotionDamageZoom();
   } else if (this._battler._bmotion.damage.mode == 2) {
	   this.updateBmotionDamageKnockBackRight();	 
   } else if (this._battler._bmotion.damage.mode == 3) {
	   this.updateBmotionDamageKnockBackLeft();
   };
};

//==============================
// * update Bmotion Damage Shake
//==============================
Sprite_Battler.prototype.updateBmotionDamageShake = function() {
   this._battler._bmotion.damage.animation[0]++
   if (this._battler._bmotion.damage.animation[0] < 1) {return};
   this._battler._bmotion.damage.animation[0] = 0;
   this._battler._bmotion.damage.x = -10 + Math.randomInt(20);
   this._battler._bmotion.damage.duration--;
   if (this._battler._bmotion.damage.duration <= 0) {
	   this._movementDuration = 0;
	   this._battler.clearBdamage();
   };
};

//==============================
// * update Bmotion Damage Zoom
//==============================
Sprite_Battler.prototype.updateBmotionDamageZoom = function() {
	var speed = 0.03;
	var range = 0.40;
	if (this._battler._bmotion.damage.animation[0] == 0) {
        this._battler._bmotion.damage.scaleX -= speed;
		this._battler._bmotion.damage.scaleY += speed
		if (this._battler._bmotion.damage.scaleX <= -range) {
		    this._battler._bmotion.damage.scaleX = -range;
			this._battler._bmotion.damage.scaleY = range;
			this._battler._bmotion.damage.animation[0] = 1;
		}
	} else if (this._battler._bmotion.damage.animation[0] == 1) {
		this._battler._bmotion.damage.scaleX += speed;
		this._battler._bmotion.damage.scaleY -= speed;
		if (this._battler._bmotion.damage.scaleX >= 0.00) {
		    this._battler.clearBdamage();
		    this._movementDuration = 0;			
		};
	};
};


//==============================
// * updateBmotionDamageKnockBackLeft
//==============================
Sprite_Battler.prototype.updateBmotionDamageKnockBackLeft = function() {
	var speed = 3;
	var rot = 0.01;
	var range = 40;
	if (this._battler._bmotion.damage.animation[0] == 0) {
        this._battler._bmotion.damage.x += speed;
		this._battler._bmotion.damage.rotation +=rot;
		if (this._battler._bmotion.damage.x >= range) {
		    this._battler._bmotion.damage.x = range;
			this._battler._bmotion.damage.animation[0] = 1;
		}
	} else if (this._battler._bmotion.damage.animation[0] == 1) {
		this._battler._bmotion.damage.x -= speed;
		this._battler._bmotion.damage.rotation -=rot;
		if (this._battler._bmotion.damage.x <= 0) {
		    this._battler.clearBdamage();
		    this._movementDuration = 0;			
		};
	};
};

//==============================
// * updateBmotionDamageKnockBackRight
//==============================
Sprite_Battler.prototype.updateBmotionDamageKnockBackRight = function() {
	var speed = 3;
	var rot = 0.01;
	var range = -40;
	if (this._battler._bmotion.damage.animation[0] == 0) {
        this._battler._bmotion.damage.x -= speed;
		this._battler._bmotion.damage.rotation -=rot;
		if (this._battler._bmotion.damage.x <= range) {
		    this._battler._bmotion.damage.x = range;
			this._battler._bmotion.damage.animation[0] = 1;
		}
	} else if (this._battler._bmotion.damage.animation[0] == 1) {
		this._battler._bmotion.damage.x += speed;
		this._battler._bmotion.damage.rotation +=rot;
		if (this._battler._bmotion.damage.x >= 0) {
		    this._battler.clearBdamage();
		    this._movementDuration = 0;			
		};
	};
};

//==============================
// ** set Bmotion Damage Apply
//==============================
Game_Battler.prototype.setBmotionDamageApply = function(target) {
	target.clearBdamage();
	if (target._bmotion.damage.mode == 0) { 
	    target._bmotion.damage.duration = 45;
	} else {
		target._bmotion.damage.duration = 20;
	};
};

//==============================
// * init Members
//==============================
var _mog_bmotion_sprtEnemy_initMembers = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function() {
    _mog_bmotion_sprtEnemy_initMembers.call(this);
	this._skipBlink = String(Moghunter.b_motion_disable_blink_damage) == "true" ? true : false;
};

//==============================
// * startBlink
//==============================
var _mog_bmotion_srtenemy_startBlink = Sprite_Enemy.prototype.startBlink
Sprite_Enemy.prototype.startBlink = function() {
	if (this._skipBlink) {this._effectDuration = 1;return};
	_mog_bmotion_srtenemy_startBlink.call(this);
};

//==============================
// * can Update Battler Motion
//==============================
Sprite_Battler.prototype.canUpdateBattlerMotion = function() {
    if (!this._battler) {return false};
	if (Imported.MOG_EmergeMotion) {
	    if ($gameTemp._emerging[1] > 0) {return false};
	};
	return true;
};

//==============================
// * update Battler Motion
//==============================
Sprite_Battler.prototype.updateBattlerMotion = function() {
    if (this.needGetDataBmotion()) {this.setInitBmotionData()};
	if (this.canUpdateBmotion()) {this.updateBmotionBase()};
	if (this._battler) {this.updatepBmotionRealData()}; 
};

//==============================
// * update
//==============================
var _mog_bmotion_sptBat_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
	_mog_bmotion_sptBat_update.call(this);
    if (this.canUpdateBattlerMotion()) {this.updateBattlerMotion()}
};

//==============================
// * Update Bmotion Real Data
//==============================
Sprite_Battler.prototype.updatepBmotionRealData = function() {
	 this.x += this._battler.bmotionX();
	 this.y += this._battler.bmotionY();
	 this.scale.x = this._battler.bmotionScaleX();
	 this.scale.y = this._battler.bmotionScaleY();
	 this.rotation = this._battler.bmotionRotation();
	 if (this.scale.y < 0) {this.scale.y = 0};
};

//==============================
// * need Wait Update Move
//==============================
Sprite_Battler.prototype.needWaitUpdateMove = function() {
	if (!this._battler) {return false};
	if (this._battler._bmotion.action.wait) {return true};
	if (this._battler._bmotion.idle.wait) {return true};
	if (this._battler._bmotion.damage.wait) {return true};
	return false;
};

//==============================
// * Update Move
//==============================
var _mog_battlerMotion_sprbtr_updateMove = Sprite_Battler.prototype.updateMove;
Sprite_Battler.prototype.updateMove = function() {
	if (this.needWaitUpdateMove()) {return};
    _mog_battlerMotion_sprbtr_updateMove.call(this);
};

//==============================
// * refresh Bmotion Data
//==============================
Sprite_Battler.prototype.refreshBmotionData = function() {
	this._bmotion.initial = true;
	this._bmotion.shadow = false;
	if (this._bmotionShadow) {this.removeBShadow()};
	this._battler.setMotionData();
};

//==============================
// * update Idle Bmotion
//==============================
var _mog_bmotion_sprtBattler_updateIdleBmotion = Sprite_Battler.prototype.updateIdleBmotion;
Sprite_Battler.prototype.updateIdleBmotion = function() {
    _mog_bmotion_sprtBattler_updateIdleBmotion.call(this);
	if (this.needCreateBmotionShadow()) {this.createBmotionShadow()} 
};

//==============================
// * need Create Shadow
//==============================
Sprite_Battler.prototype.needCreateBmotionShadow = function() {
    if (this._bmotionShadow) {return false}
	if (!this._bmotion.shadow) {return false};
	if (!this._battler._bmotion.idle.float.enable) {return false};
	return true;
};

//==============================
// * create Bmotion Shadow
//==============================
Sprite_Battler.prototype.createBmotionShadow = function() {
    this._bmotionShadow = new Sprite(this.bitmap)
	this._bmotionShadow.anchor.x = 0.5
	this._bmotionShadow.anchor.y = 0.5
	this._bmotionShadow.y = 10;
	this._bmotionShadow.org = [this._bmotionShadow.x,this._bmotionShadow.y];
	this._bmotionShadow.zoomEffect = Moghunter.b_motion_shadowZoom == "true" ? true : false;
	this._bmotionShadow.scale.y = 0.20;
	this._bmotionShadow.opacity = Moghunter.b_motion_shadowOpacity;
	this._bmotionShadow.scale.mv = (this.bitmap.height * 10 / 100);
	this._bmotionShadow.setBlendColor([0, 0, 0, 255]);
	this.addChild(this._bmotionShadow); 
	if (Imported.MOG_EnemyPoses && this._battler._batPoses[0]) {
		w = this.bitmap.width / 4
		h = this.bitmap.height;
		this._bmotionShadow.setFrame(0,0,w,h)	
    };	
};

//==============================
// * setBmotionFloatActionOffset
//==============================
Sprite_Battler.prototype.setBmotionFloatActionOffset = function() {
	//if (this._battler._bmotion.action.mode == 5) {return this._battler._bmotion.action.scaleY * 300}
	return 0
};

//==============================
// * update Bmotion Shadow
//==============================
Sprite_Battler.prototype.updateBmotionShadow = function() {
	 var mz = (this.bitmap.height * 10 / 100);
	 var nz = this.setBmotionFloatActionOffset()
		 var rz = 0
		 if (this.y < this._battler._bmotion.idle.float.groundH) {
			 rz = this._battler._bmotion.idle.float.groundH - this.y;
		 };	 
	 this._bmotionShadow.y = mz + this._bmotionShadow.org[1] - this._battler.bmotionFlyY() + nz + rz;
	 this._bmotionShadow.rotation = -this._battler._bmotion.action.rotation;
	 if (this._bmotionShadow.zoomEffect) {
		 var nz = Number((this._battler.bmotionFlyY() / 5) * 0.004);
  	     this._bmotionShadow.scale.x = 1.0 + nz;
	     this._bmotionShadow.scale.y = 0.2 + nz;
	 };
};

//==============================
// * update Bmotion Base
//==============================
var _mog_bmotion_sprtBattler_updateBmotionBase = Sprite_Battler.prototype.updateBmotionBase;
Sprite_Battler.prototype.updateBmotionBase = function() {
    _mog_bmotion_sprtBattler_updateBmotionBase.call(this);
	if (this._bmotionShadow) {this.updateBmotionShadow()};
};

//==============================
// * remove BShadow
//==============================
Sprite_Battler.prototype.removeBShadow = function() {
     this.removeChild(this._bmotionShadow);
	 this._bmotionShadow = null;
};

//=============================================================================
// ** Sprite Battler
//=============================================================================

//==============================
// * init Visibility
//==============================
var _mog_bmotion_sprtEnemy_initVisibility = Sprite_Enemy.prototype.initVisibility;
Sprite_Enemy.prototype.initVisibility = function() {
	_mog_bmotion_sprtEnemy_initVisibility.call(this);
	this.refreshBmotionData();
};