//=============================================================================
// MOG_BattleCursorFrontal.js
//=============================================================================

/*:
 * @plugindesc (v1.0 *) Adiciona flechas de indicação nos alvos selecionados.
 * @author Moghunter
 *
 * @param X-Axis
 * @desc Definição X-axis do cursor.
 * @default 0
 *
 * @param Y-Axis
 * @desc Definição Y-axis do cursor.
 * @default 0 
 *
 * @param Name Visible
 * @desc Apresentar o nome do alvo.
 * @type boolean 
 * @default true
 *
 * @param Name X-Axis
 * @desc Definição X-axis do nome.
 * @default 0
 *
 * @param Name Y-Axis
 * @desc Definição Y-axis do nome.
 * @default -40
 *
 * @param Font Size
 * @desc Definição Y-axis do nome.
 * @type number 
 * @default 18
 *
 * @param Face Hud X-Axis
 * @desc Posição X-Axis do cursor na Face.
 * @type number 
 * @default 0
 *
 * @param Face Hud Y-Axis
 * @desc Posição Y-Axis do cursor na Face.
 * @type number 
 * @default 30
 *
 * @param Float Effect
 * @desc Ativar o efeito flutuar no cursor.
 * @type boolean  
 * @default true
 *
 * @param Sort X-Axis
 * @desc Ordenar a ordem dos inimigos baseado no X-axis.
 * @type boolean 
 * @default true
 *
 * @param Window Visible
 * @desc Apresentar a janela dos alvos.
 * @type boolean 
 * @default false
 *
 * @param Touch Selection
 * @desc Selecionar os alvos ao "clicar" nos alvos.
 * @type boolean 
 * @default true
 *
 * @param  Help All Allies
 * @desc Definição do texto no modo todos os alvos.
 * @default All Allies
 *
 * @param  Help All Enemies
 * @desc Definição do texto no modo todos os alvos.
 * @default All Enemies 
 *
 * @help  
 * =============================================================================
 * +++ MOG - Battle Cursor Frontal (v1.0) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Adiciona flechas de indicação nos alvos selecionados.
 *
 * =============================================================================
 * As imagens dos cursores deverão ser gravados na pasta /img/system/
 *
 * BattleCursor_A.png
 * BattleCursor_B.png
 *
 * =============================================================================
 * Se desejar ajustar a posição do cursor baseado no inimigo, coloque este 
 * comentário na caixa de notas do inimigo.
 *
 * Arrow Offset: X:Y
 *
 * Exemplo
 * 
 * Arrow Offset: 25:30
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_BattleCursorFrontal = true;
　　var Moghunter = Moghunter || {}; 

    Moghunter.parameters = PluginManager.parameters('MOG_BattleCursorFrontal');
	Moghunter.bcursor_x = Number(Moghunter.parameters['X-Axis'] || 0);
	Moghunter.bcursor_y = Number(Moghunter.parameters['Y-Axis'] || 0);
	Moghunter.bcursor_x2 = Number(Moghunter.parameters['Face Hud X-Axis'] || 0);
	Moghunter.bcursor_y2 = Number(Moghunter.parameters['Face Hud Y-Axis'] || 30);	
    Moghunter.bcursor_float = String(Moghunter.parameters['Float Effect'] || "true");
	Moghunter.bcursor_name_visible = String(Moghunter.parameters['Name Visible'] || "true");
	Moghunter.bcursor_name_x = Number(Moghunter.parameters['Name X-Axis'] || 0);
	Moghunter.bcursor_name_y = Number(Moghunter.parameters['Name Y-Axis'] || -40);
	Moghunter.bcursor_fontSize = Number(Moghunter.parameters['Font Size'] || 18);
	Moghunter.bcursor_sort_x = String(Moghunter.parameters['Sort X-Axis'] || "true");
	Moghunter.bcursor_window = String(Moghunter.parameters['Window Visible'] || "false");
	Moghunter.bcursor_touch_selection = String(Moghunter.parameters['Touch Selection'] || "true");
	Moghunter.bcursor_helpAllAllies = String(Moghunter.parameters['Help All Allies'] || "All Allies");
	Moghunter.bcursor_helpAllEnemies = String(Moghunter.parameters['Help All Enemies'] || "All Enemies");
		
//=============================================================================
// ** Game_Temp
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_battlecursor_temp_initialize = Game_Temp.prototype.initialize
Game_Temp.prototype.initialize = function() {
	_alias_mog_battlecursor_temp_initialize.call(this);
	this._arrowAllTargets = [false,false];
	this._arrow_need_refresh = false;
	this._arrowTarget = [null,null];
	this._arrowPrePos = [0,0];
	this._needRefreshBattleCursor = false;
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================

//==============================
// * Command129
//==============================
var _alias_mog_battlecursor_command129 = Game_Interpreter.prototype.command129;
Game_Interpreter.prototype.command129 = function() {	
	_alias_mog_battlecursor_command129.call(this);	
	$gameTemp._arrow_need_refresh = true;
	return true;
};

//=============================================================================
// ** Game_Action
//=============================================================================

//==============================
// * NeedsSelection
//==============================
Game_Action.prototype.needsSelection = function() {
    return this.checkItemScope([1, 2, 7, 8, 9, 10]);
};

//=============================================================================
// ** Game_Enemy
//=============================================================================

//==============================
// * Transform
//==============================
var _alias_mog_bcursor_transform = Game_Enemy.prototype.transform
Game_Enemy.prototype.transform = function(enemyId) {
    _alias_mog_bcursor_transform.call(this,enemyId) 
	this._arrowData.needRefresh = true;	
	this._arrowData.wait = 10;
};

//=============================================================================
// ** Scene Battle
//=============================================================================

//==============================
// * onSelectAction
//==============================
var _alias_mog_battle_cursor_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function() {
	this.check_arrowforAllTagets();
	_alias_mog_battle_cursor_onSelectAction.call(this);    
};

//==============================
// * Check Arrow For All Targets
//==============================
Scene_Battle.prototype.check_arrowforAllTagets= function() {
    var action = BattleManager.inputtingAction();
	if (action.isForOpponent()) { 
   		$gameTemp._arrowAllTargets[0] = action.isForAll();
	} else {
		$gameTemp._arrowAllTargets[1] = action.isForAll();		
	};
};

//=============================================================================
// ** Game Battler
//=============================================================================	

//==============================
// * initMembers
//==============================
var _alias_mog_btcursor_gbat_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
	_alias_mog_btcursor_gbat_initMembers.call(this);
	this._arrowData = {};
	this._arrowData.visible = true;
	this._arrowData.selected = true;
	this._arrowData.needRefresh = false;
	this._arrowData.x_Offset = 0;
	this._arrowData.y_Offset = 0;
	this._arrowData.wait = 0;
	this._arrowData.faceSize = [-1,-1];
};

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function() {
	if (this.isEnemy()) {return this.enemy().note.split(/[\r\n]+/)};
	if (this.isActor()) {return this.actor().note.split(/[\r\n]+/)};
};

//==============================
// * Setup
//==============================
var _alias_mog_btcursor_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	_alias_mog_btcursor_setup.call(this,enemyId, x, y);
    this.notetags().forEach(function(note) {
         var note_data = note.split(': ')
		 if (note_data[0].toLowerCase() == "arrow offset"){
			 var par = note_data[1].split(':');
		     this._arrowData.x_Offset = Number(par[0]);
			 this._arrowData.y_Offset = Number(par[1]);
		 };
	},this);
};


if (Imported.MOG_BattleHud) {
	//==============================
	// * Update Face
	//==============================
	var _mog_bcursor_bhud_update_face = Battle_Hud.prototype.update_face;
	Battle_Hud.prototype.update_face = function() {
		_mog_bcursor_bhud_update_face.call(this);
		if (this._battler._arrowData.faceSize[0] == -1 && this._face && this._face.bitmap.isReady()) {
		   this._battler._arrowData.faceSize[0] = this._face.bitmap.width;
		   this._battler._arrowData.faceSize[1] = this._face.bitmap.height;	
		};
	};
	
	//==============================
	// * Refresh Face
	//==============================
	var _mog_bcursor_bhud_refresh_face = Battle_Hud.prototype.refresh_face;
	Battle_Hud.prototype.refresh_face = function() {
		_mog_bcursor_bhud_refresh_face.call(this);
		this._battler._arrowData.faceSize[0] = this._face.bitmap.width / 5;
		this._battler._arrowData.faceSize[1] = this._face.bitmap.height;
	};
};

//=============================================================================
// ** Scene Base
//=============================================================================

//==============================
// ** create Hud Field
//==============================
Scene_Base.prototype.createHudField = function() {
	this._hudField = new Sprite();
	this._hudField.z = 10;
	this.addChild(this._hudField);
};

//==============================
// ** sort MZ
//==============================
Scene_Base.prototype.sortMz = function() {
   this._hudField.children.sort(function(a, b){return a.mz-b.mz});
};

//=============================================================================
// ** Scene Battle
//=============================================================================

//==============================
// * create Spriteset
//==============================
var _mog_bcursor_sbattle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
	_mog_bcursor_sbattle_createSpriteset.call(this);
	if (!this._hudField) {this.createHudField()};
};

//==============================
// * create Display Objects
//==============================
var _mog_bcursor_sbat_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
	_mog_bcursor_sbat_createDisplayObjects.call(this);
    this.createBattleCursor();
	this.sortMz();
};

//==============================
// * create Battle Cursor
//==============================
Scene_Battle.prototype.createBattleCursor = function() {
	$gameTemp._arrowPrePos = [0,0];
	this._battleCursor_Actor = [];
	this._battleCursor_Enemy = [];
    for (var i = 0; i < this._spriteset._actorSprites.length; i++) {
		var sprite = this._spriteset._actorSprites[i]
		this._battleCursor_Actor[i]	 = new BattleCursor(sprite,0,i);
		this._battleCursor_Actor[i].mz = 120;
		this._battleCursor_Actor[i].z = 200;
		this._hudField.addChild(this._battleCursor_Actor[i]);
	};	
    for (var i = 0; i < this._spriteset._enemySprites.length; i++) {
		var sprite = this._spriteset._enemySprites[i]
		this._battleCursor_Enemy[i]	 = new BattleCursor(sprite,1,i);
		this._battleCursor_Enemy[i].mz = 90;
		this._battleCursor_Enemy[i].z = 200;
		this._hudField.addChild(this._battleCursor_Enemy[i]);
	};    
};

//==============================
// * remove Battle Cursor
//==============================
Scene_Battle.prototype.removeBattleCursor = function() {
    for (var i = 0; i < this._battleCursor_Actor.length; i++) {
         this._hudField.removeChild(this._battleCursor_Actor[i]);
	};	
    for (var i = 0; i < this._battleCursor_Enemy.length; i++) {
	     this._hudField.removeChild(this._battleCursor_Enemy[i]);
	};
	this._battleCursor_Actor = [];
	this._battleCursor_Enemy = [];	
};

//==============================
// * Update
//==============================
var _mog_batCursor_sBat_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_mog_batCursor_sBat_update.call(this);
	this.updateBattleCursorSB();
};
	
//==============================
// * update Battle Cursor SB
//==============================
Scene_Battle.prototype.updateBattleCursorSB = function() {
   if ($gameTemp._needRefreshBattleCursor) {this.refreshBattlerCursor()};
};

//==============================
// * refresh Battle Cursor
//==============================
Scene_Battle.prototype.refreshBattlerCursor = function() {
	$gameTemp._needRefreshBattleCursor = false;
    this.removeBattleCursor();
	this.createBattleCursor();
	this.sortMz();
};

//=============================================================================
// ** Sprite Enemy
//=============================================================================	

//==============================
// * Set Battler
//==============================
var _mog_bcursor_comp_sprenemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
    _mog_bcursor_comp_sprenemy_setBattler.call(this,battler)
	if (this._visualSelectWindow) {this._visualSelectWindow.visible = false};
};

//=============================================================================
// ** Game Party
//=============================================================================	

//==============================
// * Select
//==============================
var _mog_bat_cursor_gparty_select = Game_Party.prototype.select;
Game_Party.prototype.select = function(activeMember) {
	if ($gameTemp._arrowAllTargets[1]) {
        this.members().forEach(function(member) {
           member.select();
        });
		return;
	};
	_mog_bat_cursor_gparty_select.call(this,activeMember);
};

//=============================================================================
// ** Window Help
//=============================================================================	

//==============================
// * Refresh
//==============================
var _mog_bcursor_whelp_refresh = Window_Help.prototype.drawText;
Window_Help.prototype.drawText = function(text, x, y, maxWidth, align) {
    if ($gameTemp._arrowAllTargets[0]) {text = String(Moghunter.bcursor_helpAllEnemies)};
	if ($gameTemp._arrowAllTargets[1]) {text = String(Moghunter.bcursor_helpAllAllies)};
	_mog_bcursor_whelp_refresh.call(this,text, x, y, maxWidth, align);	
};

//=============================================================================
// ** Window BattleActor
//=============================================================================	

//==============================
// * Initialize
//==============================
var _alias_mog_bcursor_wbca_initialize = Window_BattleActor.prototype.initialize;
Window_BattleActor.prototype.initialize = function(x, y) {
	_alias_mog_bcursor_wbca_initialize.call(this,x, y)
	this._window_mode = false;
    if (String(Moghunter.bcursor_window) === "true" || (!$gameSystem.isSideView() && !Imported.MOG_BattleHud)) {this._window_mode = true};
};

//==============================
// * Select
//==============================
var _mog_alias_batcursor_wba_select = Window_BattleActor.prototype.select;
Window_BattleActor.prototype.select = function(index) {
    _mog_alias_batcursor_wba_select.call(this,index);
	if (this.actor()) {this.enableArrow(index)};
};

//==============================
// * Enable Arrow
//==============================
Window_BattleActor.prototype.enableArrow = function(index) {
    this.arrow_clear();
	this.actor()._arrowVisible = true;
	this.setCursorAll($gameTemp._arrowAllTargets[1]);
};

//==============================
// * Arrow Clear
//==============================
Window_BattleActor.prototype.arrow_clear = function(index) {	
	for (var i = 0; i < $gameParty.members().length; i++) {
		 $gameParty.members()[i]._arrowVisible = false;
	};
};

//==============================
// * Hide
//==============================
var _alias_mog_wba_hide = Window_BattleActor.prototype.hide;
Window_BattleActor.prototype.hide = function() {
	$gameTemp._arrowAllTargets[1] = false;
    _alias_mog_wba_hide.call(this);
	this.arrow_clear();
};

//==============================
// * Refresh Touch Selection
//==============================
Window_BattleActor.prototype.refresh_touch_selection = function() {
    if (this.isCursorMovable()) {	
	for (var i = 0; i < $gameParty.members().length; i++) {
		if ($gameParty.members()[i] === $gameTemp._arrowTarget[1]) {
			if (i === this._index) {
				this.processOk();
			} else {
			    this._index = i;			
			    this.select(this._index);
			};
		};
	};
	};
	$gameTemp._arrowTarget[1] = null;
};

//==============================
// * Process Cursor Move
//==============================
var _alias_mog_bcursor_wbac_processCursorMove = Window_BattleActor.prototype.processCursorMove;
Window_BattleActor.prototype.processCursorMove = function() {
	 if (!this._window_mode && this.isCursorMovable()) {
        var lastIndex = this.index();		
        if (Input.isRepeated('down')) {this.addIndex(1)};
        if (Input.isRepeated('up')) {this.addIndex(-1)};
        if (Input.isRepeated('right')) {this.addIndex(1)};
        if (Input.isRepeated('left')) {this.addIndex(-1)};
        if (this.index() !== lastIndex) {SoundManager.playCursor();};
		return;
     };
	 _alias_mog_bcursor_wbac_processCursorMove.call(this);
};

//==============================
// * Add Index
//==============================
Window_BattleActor.prototype.addIndex = function(value) {
	    this._index += value;
		if (this._index > (this.maxItems() - 1)) {this._index = 0};
		if (this._index < 0) {this._index = (this.maxItems() - 1)};
		this.select(this._index);
};

//==============================
// * Update
//==============================
var _alias_mog_bcursor_wactor_update = Window_BattleActor.prototype.update;
Window_BattleActor.prototype.update = function() {
	_alias_mog_bcursor_wactor_update.call(this);
	if (!this._window_mode) {this.visible = false};
	if ($gameTemp._arrowTarget[1] != null) {this.refresh_touch_selection()};
};

//==============================
// * Process Touch
//==============================
var _alias_mog_bcursor_wactor_processTouch = Window_BattleActor.prototype.processTouch;
Window_BattleActor.prototype.processTouch = function() {
	if (!this._window_mode && this.active) {
		if (TouchInput.isTriggered() && $gameTemp._arrowAllTargets[1]) {this.processOk();};
		if (Input.isTriggered("ok") && $gameTemp._arrowAllTargets[1]) {this.processOk();};
		if (TouchInput.isCancelled()) {this.processCancel()};
	    return;
	};
	_alias_mog_bcursor_wactor_processTouch.call(this);
};

//=============================================================================
// ** Game Troop
//=============================================================================	

//==============================
// * Select
//==============================
var _mog_bat_cursor_gtroop_select = Game_Troop.prototype.select;
Game_Troop.prototype.select = function(activeMember) {
	if ($gameTemp._arrowAllTargets[0]) {
        this.members().forEach(function(member) {
           if (!member.isDead() && !member.isHidden()) {member.select()};
        });
		return;
	};
	_mog_bat_cursor_gtroop_select.call(this,activeMember);
};

//=============================================================================
// ** Window BattleEnemy
//=============================================================================	

//==============================
// * Initialize
//==============================
var _alias_mog_bcursor_wbeny_initialize = Window_BattleEnemy.prototype.initialize;
Window_BattleEnemy.prototype.initialize = function(x, y) {
	_alias_mog_bcursor_wbeny_initialize.call(this,x, y)
	this._window_mode = false;
    if (String(Moghunter.bcursor_window) === "true") {this._window_mode = true};
};

//==============================
// * Select
//==============================
var _mog_alias_batcursor_wbe_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    _mog_alias_batcursor_wbe_select.call(this,index)
	if (this.enemy()) {this.enableArrow(index)};
};

//==============================
// * refresh
//==============================
var _mog_batCursor_wbatEnemy_refresh = Window_BattleEnemy.prototype.refresh;
Window_BattleEnemy.prototype.refresh = function() {
    _mog_batCursor_wbatEnemy_refresh.call(this);
	if (this._enemies) {this._enemies.sort(function(a, b){return a._screenX-b._screenX})};
};

//==============================
// * Enable Arrow
//==============================
Window_BattleEnemy.prototype.enableArrow = function(index) {	
    this.arrow_clear();
	this.enemy()._arrowVisible = true;
	this.setCursorAll($gameTemp._arrowAllTargets[0]);
};

//==============================
// * Arrow Clear
//==============================
Window_BattleEnemy.prototype.arrow_clear = function(index) {	
	for (var i = 0; i < $gameTroop.members().length; i++) {
		 $gameTroop.members()[i]._arrowVisible = false;
	};
};

//==============================
// * Hide
//==============================
var _alias_mog_wbe_hide = Window_BattleEnemy.prototype.hide; 
Window_BattleEnemy.prototype.hide = function() {
	$gameTemp._arrowAllTargets[0] = false;
	_alias_mog_wbe_hide.call(this);
	this.arrow_clear();
};

//==============================
// * Add Index
//==============================
Window_BattleEnemy.prototype.addIndex = function(value) {
	    this._index += value;
		if (this._index > (this.maxItems() - 1)) {this._index = 0};
		if (this._index < 0) {this._index = (this.maxItems() - 1)};
		this.select(this._index);
};

//==============================
// * Refresh Touch Selection
//==============================
Window_BattleEnemy.prototype.refresh_touch_selection = function() {
    if (this.isCursorMovable()) {
	for (var i = 0; i < $gameTroop.aliveMembers().length; i++) {		
		if ($gameTroop.aliveMembers()[i] === $gameTemp._arrowTarget[0]) {
			if (i === this._index) {
				this.processOk();
			} else {
			   this._index = i;			
		 	   this.select(this._index);
			};
		};
	};
	};
	$gameTemp._arrowTarget[0] = null;	
};

//==============================
// * Process Cursor Move
//==============================
var _alias_mog_bcursor_wbeny_processCursorMove = Window_BattleEnemy.prototype.processCursorMove;
Window_BattleEnemy.prototype.processCursorMove = function() {
	 if (!this._window_mode && this.isCursorMovable()) {
        var lastIndex = this.index();		
        if (Input.isRepeated('down')) {this.addIndex(1)};
        if (Input.isRepeated('up')) {this.addIndex(-1)};
        if (Input.isRepeated('right')) {this.addIndex(1)};
        if (Input.isRepeated('left')) {this.addIndex(-1)};
        if (this.index() !== lastIndex) {SoundManager.playCursor();};
		return;
     };
	 _alias_mog_bcursor_wbeny_processCursorMove.call(this);
};

//==============================
// * Update
//==============================
var _alias_mog_bcursor_wenmy_update = Window_BattleEnemy.prototype.update;
Window_BattleEnemy.prototype.update = function() {
	_alias_mog_bcursor_wenmy_update.call(this);
	if (!this._window_mode) {this.visible = false};
	if ($gameTemp._arrowTarget[0] != null) {this.refresh_touch_selection()};
};

//==============================
// * Process Touch
//==============================
var _alias_mog_bcursor_wenmy_processTouch = Window_BattleEnemy.prototype.processTouch;
Window_BattleEnemy.prototype.processTouch = function() {
	if (!this._window_mode && this.active) {
		if (TouchInput.isTriggered() && $gameTemp._arrowAllTargets[0]) {this.processOk();};
		if (Input.isTriggered("ok") && $gameTemp._arrowAllTargets[0]) {this.processOk();};
		if (TouchInput.isCancelled()) {this.processCancel()};
	    return;
	};
	_alias_mog_bcursor_wenmy_processTouch.call(this);
};

//=============================================================================
// * Battle Cursor
//=============================================================================
function BattleCursor() {
    this.initialize.apply(this, arguments);
};

BattleCursor.prototype = Object.create(Sprite.prototype);
BattleCursor.prototype.constructor = BattleCursor;

//==============================
// * Initialize
//==============================
BattleCursor.prototype.initialize = function(sprite,type,index) {
    Sprite.prototype.initialize.call(this);	
    this._sprite = sprite;
	this._sprite.h1 = 0;
	this._sprite.h2 = 0;
	this._type = type; 
	this._start = true;
	this._loaded = false;
	this._index = index;
	this._floatA = [true,0,0,0];
	this._floatA[0] = String(Moghunter.bcursor_float) == "true" ? true : false;
	this._faceHud = !$gameSystem.isSideView() && Imported.MOG_BattleHud && this._type == 0 ? true : false;
	this._visibleOld = this.visible;
	this.loadBitmapC();
	this.z = 300;
	if (String(Moghunter.bcursor_name_visible) == "true") {this.createName()};
};

//==============================
// * load Bitmap C
//==============================
BattleCursor.prototype.loadBitmapC = function() {
   var name = this._type == 0 ? "BattleCursor_A" : "BattleCursor_B"
   this.bitmap = ImageManager.loadSystem(name);
   this.anchor.x = 0.5;
   this.anchor.y = 1;
};

//==============================
// * create Name
//==============================
BattleCursor.prototype.createName = function() {
   this._nameSprite = new Sprite();
   this._nameSprite.bitmap = new Bitmap(200,40);
   this._nameSprite.bitmap.fontSize = Moghunter.bcursor_fontSize;
   this._nameSprite.x = Moghunter.bcursor_name_x;
   this._nameSprite.y = Moghunter.bcursor_name_y;
   this._nameSprite.anchor.x = 0.5;
   this._nameSprite.anchor.y = 0.5;
   this.addChild(this._nameSprite);
};

//==============================
// * refresh Name
//==============================
BattleCursor.prototype.refreshName = function() {
   var name = this.battler().name()
   this._nameSprite.bitmap.clear();
   this._nameSprite.bitmap.drawText(String(name),0,0,200,38,"center");
   
};

//==============================
// * refresh Cursor
//==============================
BattleCursor.prototype.refreshCursor = function() {
   this.refreshName();
};

//==============================
// * Battler
//==============================
BattleCursor.prototype.battler = function() {
    if (this._type == 0) {
		if (!$gameSystem.isSideView()) {return $gameParty.battleMembers()[this._index]};
		return this._sprite._actor;
	};
	return this._sprite._battler;
};

//==============================
// * need Refresh Data
//==============================
BattleCursor.prototype.needRefreshData = function() {
   if (this.battler() && this.battler()._arrowData.needRefresh && this.battler()._arrowData.wait == 0) {return true};
   if (!this._start) {return false};
   if (!this.battler()) {return false};
   if (this._type == 0) {
	  if ($gameSystem.isSideView()) {
		  if (!this._sprite._mainSprite) {return false};
		  if (!this._sprite._mainSprite.bitmap) {return false};
		  if (!this._sprite._mainSprite.bitmap.isReady()) {return false};
	  };  
   } else {
     if (!this._sprite.bitmap) {return false};
     if (!this._sprite.bitmap.isReady()) {return false};
   };
   return true;
};

//==============================
// * Refresh Data
//==============================
BattleCursor.prototype.refreshData = function() {
   this._start = false;
   this.battler()._arrowData.needRefresh = false;
   this.refreshCursor();
   if (this._type == 0) {
	   this._sprite.h1 = this._sprite._mainSprite.height;
	   this._sprite.h2 = this._sprite._mainSprite.height;
   } else {
	   this._sprite.h1 = this._sprite.bitmap.height;
	   this._sprite.h2 = Imported.MOG_BattleCameraFrontal ? this._sprite.bitmap.height / 1.2 : this._sprite.bitmap.height / 2;
   };
};

//==============================
// * UpdatePosition
//==============================
BattleCursor.prototype.updatePosition = function() {
	if (this._floatA[0]) {this.updateFloatAnimation()};
	if (this._faceHud) {this.updateFacePosition();return};
	if (Imported.MOG_BattleCameraFrontal) {this.updateCameraPosition();return}
    var x2 = this._sprite.x + this.battler()._arrowData.x_Offset;
	var y2 = this._sprite.y - this._sprite.h2 + this._floatA[3] + this.battler()._arrowData.y_Offset;
	this.x = this.spriteMoveTo(this.x,x2,10);
	this.y = this.spriteMoveTo(this.y,y2,10);		
};

//==============================
// * Update Float Animation
//==============================
BattleCursor.prototype.updateFloatAnimation = function() {
    this._floatA[2]++;
	if (this._floatA[2] < 20) {
		this._floatA[3] -= 0.5;
	} else if (this._floatA[2] < 40) {
		this._floatA[3] += 0.5;
	} else {
	   this._floatA[3] = 0;
	   this._floatA[2] = 0;
	};
};

//==============================
// * Update Camera Position
//==============================
BattleCursor.prototype.updateCameraPosition = function() {
	var h = this._sprite.h2 + (this._sprite.h2 *  $gameTemp.camPerc() / 100)
	var h2 = this._sprite.h2 * this.battler()._camera.realScale / 250;
    var x2 = this.battler()._camera.realX2 + this.battler()._arrowData.x_Offset;
	var y2 = this.battler()._camera.realY2 - h + h2 + this._floatA[3] + this.battler()._arrowData.y_Offset;	
	this.x = this.spriteMoveTo(this.x,x2,10);
	this.y = this.spriteMoveTo(this.y,y2,10);	
};

//==============================
// * Update Face Position
//==============================
BattleCursor.prototype.updateFacePosition = function() {
	if (!$gameTemp._bhud_position[this._index]) {return}
    var x2 = $gameTemp._bhud_position[this._index][0] + Moghunter.bhud_face_pos_x + Moghunter.bcursor_x2 + this.battler()._arrowData.x_Offset;
	var y2 = $gameTemp._bhud_position[this._index][1] + Moghunter.bhud_face_pos_y + Moghunter.bcursor_y2 + this._floatA[3] + this.battler()._arrowData.y_Offset;
	this.x = this.spriteMoveTo(this.x,x2,10);
	this.y = this.spriteMoveTo(this.y,y2,10);	
};

//==============================
// * is Visible
//==============================
BattleCursor.prototype.isVisible = function() {
	if (Imported.MOG_ATB && $gameSystem._atbEventPhase[3]) {return false};
	if (!this._faceHud && !this._sprite.visible) {return false};
	if (this._sprite.opacity == 0) {return false};
	if (!this.battler().isSelected()) {return false};
	return true;
};

//==============================
// * Sprite Move To
//==============================
BattleCursor.prototype.spriteMoveTo = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = 5 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//==============================
// * Refresh Data
//==============================
BattleCursor.prototype.updateCursor = function() {
	 if (this.battler()._arrowData.wait > 0) {this.battler()._arrowData.wait--};
	 this.visible = this.isVisible();
	 if (this._visibleOld != this.visible) {
		 this._visibleOld = this.visible;
		 if (this.visible) {
		     this.x = $gameTemp._arrowPrePos[0];
		     this.y = $gameTemp._arrowPrePos[1];			
		 };
	 };
	 if (this.visible) {
		 $gameTemp._arrowPrePos = [this.x,this.y];
		 this.opacity += 25
	 } else {
		 this.opacity = 0;
     }
	 this.updatePosition(); 
};

//==============================
// * Update
//==============================
BattleCursor.prototype.update = function() {
    Sprite.prototype.update.call(this);	
    if (this.needRefreshData()) {this.refreshData()}
	if (!this._loaded && this.battler() && this.bitmap.isReady()) {this._loaded = true};
	if (this._loaded) {this.updateCursor()};
};

