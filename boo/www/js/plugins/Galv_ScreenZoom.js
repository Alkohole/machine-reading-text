//-----------------------------------------------------------------------------
//  Galv's Screen Zoom
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  Galv_ScreenZoom.js
//-----------------------------------------------------------------------------
//  2020-09-14 - Version 1.2 - added plugin setting to disable battle zoom
//  2017-03-10 - Version 1.1 - fixed bug in battle zoom, added battle scale
//  2017-02-10 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_ScreenZoom = true;

var Galv = Galv || {};              // Galv's main object
Galv.ZOOM = Galv.ZOOM || {};          // Galv's stuff


//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.2) Zoom in on a certain part of the screen
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Enable Battle Zoom
 * @desc true have it enabled in battle. false to disable it (if causing conflicts)
 * @default false
 *
 * @param Battle Zoom
 * @desc The zoom scale battle will begin at.
 * Default: 1 (100%)
 * @default 1
 
 *
 * @help
 *   Galv's Screen Zoom
 * ----------------------------------------------------------------------------
 * This plugin allows you to zoom the screen to a certain x,y pixel location,
 * scale and taking a certain duration to do it. Only map sprites will be
 * affected by the zoom - window message and other scenes will not.
 * The zoomed screen can be moved around by calling the script again with
 * different x,y position or scale.
 *
 *
 *   Galv.ZOOM.move(x,y,scale,duration);    // zoom to x,y postion
 *                                          // scale 1 = 100%
 *                                          // duration in frames it takes to
 *                                          // zoom/move the screen
 *
 *   Galv.ZOOM.target(id,scale,duration); // zooms to event id or 0 for player
 *
 *   Galv.ZOOM.center(scale,duration);      // zooms in center of screen
 *
 *   Galv.ZOOM.restore(duration);           // set zoom to normal
 * 
 * NOTES:
 * If you move x,y as well as scale simultaneously, you may experience a strange
 * arc motion of the screen. I have not worked out a good way to remedy this so
 * this is currently just a 'For your information' :)
 *
 * This plugin does NOT modify how the map works and zooms around the screen
 * only. It does not zoom or pan the map itself. That means if your map is
 * the same size as the screen and you zoom in, player movement will not pan
 * the zoomed screen.
 */



//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

Galv.ZOOM.battleZoomEnabled = PluginManager.parameters('GALV_ScreenZoom')["Enable Battle Zoom"] == "true";	
Galv.ZOOM.battleScale = Number(PluginManager.parameters('GALV_ScreenZoom')["Battle Zoom"]);

Galv.ZOOM.setTo = function(x,y) {
	if ($gameScreen._zoomScale == 1) {
		$gameScreen._zoomX = x;
		$gameScreen._zoomY = y;
	}
};

Galv.ZOOM.move = function(x,y,scale,duration) {
	$gameScreen.startZoom(x,y,scale,duration);
};

Galv.ZOOM.center = function(scale,duration) {
	var x = Graphics.boxWidth / 2;
	var y = Graphics.boxHeight / 2;
	$gameScreen.startZoom(x,y,scale,duration);
};

Galv.ZOOM.target = function(id,scale,duration) {
	if (id <= 0) {
		var target = $gamePlayer;
	} else {
		var target = $gameMap.event(id);
	}
	var x = target.screenX();
	var y = target.screenY() - 12 - scale;
	$gameScreen.startZoom(x,y,scale,duration);
};

Galv.ZOOM.restore = function(duration) {
	var x = Graphics.boxWidth / 2;
	var y = Graphics.boxHeight / 2;
	$gameScreen.startZoom(x,y,1,duration);
};

Galv.ZOOM.saveZoomData = function() {
	$gameSystem._savedZoom.x = Number($gameScreen._zoomX);
	$gameSystem._savedZoom.xTarget = Number($gameScreen._zoomXTarget);
	$gameSystem._savedZoom.y = Number($gameScreen._zoomY);
	$gameSystem._savedZoom.yTarget = Number($gameScreen._zoomYTarget);
	$gameSystem._savedZoom.scale = Number($gameScreen._zoomScale);
	$gameSystem._savedZoom.scaleTarget = Number($gameScreen._zoomScaleTarget);
	$gameSystem._savedZoom.duration = Number($gameScreen._zoomDuration);
};


//-----------------------------------------------------------------------------
//  GAME SYSTEM
//-----------------------------------------------------------------------------

Galv.ZOOM.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Galv.ZOOM.Game_System_initialize.call(this);
	var cx = Graphics.boxWidth / 2;
	var cy = Graphics.boxHeight / 2
	this._savedZoom = {
		x: cx,
		y: cy,
		xTarget: cx,
		yTarget: cy,
		scale: 1,
		scaleTarget: 1,
		duration: 0
	}
};


//-----------------------------------------------------------------------------
//  GAME SCREEN
//-----------------------------------------------------------------------------

Galv.ZOOM.Game_Screen_startZoom = Game_Screen.prototype.startZoom;
Game_Screen.prototype.startZoom = function(x, y, scale, duration) {
	
	if (!Galv.ZOOM.battleZoomEnabled && $gameParty.inBattle()) {
		return Galv.ZOOM.Game_Screen_startZoom.call(this,x, y, scale, duration)
	}
	
	Galv.ZOOM.setTo(x,y);

	var cx = Graphics.boxWidth / 2;
	if (x < 0) {
		x = this._zoomX;
	} else if (x != cx) {
		var pox = Graphics.boxWidth / (scale * 2 - 2);
		var difX = cx - x;
		if (difX != 0) difX = (difX / cx) * pox;
		x = x - difX;
	}

	var cy = Graphics.boxHeight / 2;	
	if (y < 0) {
		y = this._zoomY;
	} else if (y != cy) {
		var poy = Graphics.boxHeight / (scale * 2 - 2);
		var difY = cy - y;
		if (difY != 0) difY = (difY / cy) * poy;
		y = y - difY;
	}

	this._zoomXTarget = Math.min(Graphics.boxWidth,Math.max(x,0));
	this._zoomYTarget = Math.min(Graphics.boxHeight,Math.max(y,0));

    this._zoomScaleTarget = scale < 0 ? this._zoomScale : scale;
    this._zoomDuration = duration || 60;
};

Galv.ZOOM.Game_Screen_updateZoom = Game_Screen.prototype.updateZoom;
Game_Screen.prototype.updateZoom = function() {
	if (!Galv.ZOOM.battleZoomEnabled && $gameParty.inBattle()) {
		return Galv.ZOOM.Game_Screen_updateZoom.call(this);
	}
    if (this._zoomDuration > 0) {
        var d = this._zoomDuration;
        var t = this._zoomScaleTarget;
        this._zoomScale = (this._zoomScale * (d - 1) + t) / d;
		this._zoomX = (this._zoomX * (d - 1) + this._zoomXTarget) / d;
		this._zoomY = (this._zoomY * (d - 1) + this._zoomYTarget) / d;	
        this._zoomDuration--;
    }
};

// Overwrite
Game_Screen.prototype.clearZoom = function() {
	this._zoomX = Number($gameSystem._savedZoom.x);
	this._zoomXTarget = Number($gameSystem._savedZoom.xTarget);
	this._zoomY = Number($gameSystem._savedZoom.y);
	this._zoomYTarget = Number($gameSystem._savedZoom.yTarget);
	this._zoomScale = Number($gameSystem._savedZoom.scale);
	this._zoomScaleTarget = Number($gameSystem._savedZoom.scaleTarget);
	this._zoomDuration = Number($gameSystem._savedZoom.duration);
};


Galv.ZOOM.Game_Screen_onBattleStart = Game_Screen.prototype.onBattleStart;
Game_Screen.prototype.onBattleStart = function() {
	Galv.ZOOM.saveZoomData();
	Galv.ZOOM.dontSave = true;
	Galv.ZOOM.Game_Screen_onBattleStart.call(this);
};

Game_Screen.prototype.resetBattleZoom = function() {
	this._zoomX = Graphics.boxWidth / 2;
	this._zoomXTarget = Graphics.boxWidth / 2;
	this._zoomY = Graphics.boxHeight / 2;
	this._zoomYTarget = Graphics.boxHeight / 2
	this._zoomScale = Galv.ZOOM.battleScale;
	this._zoomScaleTarget = Galv.ZOOM.battleScale;
	this._zoomDuration = 0;
};


//-----------------------------------------------------------------------------
//  SCENE MAP
//-----------------------------------------------------------------------------

Galv.ZOOM.Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
	$gameScreen.clearZoom();
	Galv.ZOOM.Scene_Map_start.call(this);
};

Galv.ZOOM.Scene_Map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	if (!Galv.ZOOM.dontSave) Galv.ZOOM.saveZoomData();
	Galv.ZOOM.Scene_Map_terminate.call(this);
};


//-----------------------------------------------------------------------------
//  SCENE BATTLE
//-----------------------------------------------------------------------------

Galv.ZOOM.Scene_Battle_start = Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function() {
	$gameScreen.resetBattleZoom();
	Galv.ZOOM.Scene_Battle_start.call(this);
};

Galv.ZOOM.Scene_Battle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	Galv.ZOOM.dontSave = false;
	Galv.ZOOM.Scene_Battle_terminate.call(this);
};

})();