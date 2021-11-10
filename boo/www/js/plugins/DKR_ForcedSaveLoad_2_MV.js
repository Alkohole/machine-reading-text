//-----------------------------------------------------------------------------
//  DKR ForcedSaveLoad 2.0
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  DKR_ForcedSaveLoad_2_MV.js
//-----------------------------------------------------------------------------
//  16.09.2021 - Версия 2.0.0
//-----------------------------------------------------------------------------
// Поставляется AS-IS.
// Вся ответственность при использовании - на Пользователе!
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.DKR_ForcedSaveLoad = true;

var DKR = DKR || {};          
DKR.ForcedSaveLoad = DKR.ForcedSaveLoad  || {}; 

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.2.0.0) Плагин позволяет сохранять/загружать игру в/из файл(а) сохранения без открытия экрана сохранения/загрузки. Аналог автосохранения.
 * 
 * @target MV
 * @author DarchanKaen
 *
 * @help
 *   DKR ForcedSaveLoad
 * ----------------------------------------------------------------------------
 * ---Общая информация:
 * Плагин позволяет сохранять/загружать игру в/из файл(а) сохранения без  
 * открытия экрана сохранения/загрузки. Аналог автосохранения.
 *
 * Также плагин позволяет закрыть / открыть возможность ручного сохранения в 
 * указанный слот сохранения (например, сделать слот автосохранения недоступным
 * для записи, как в MZ).
 *
 * Номер файла сохранения не должен больше нуля; по-умолчанию номер файла сохранения равняется 1.
 * 
 * Для корректной работы доступности слотов сохранения используется переменная, хранящая список
 * и по-умолчанию исп-ся переменная №7 - не затирайте ее!
 *
 * ---Команды(в эвенте команда "Скрипт"):
 * DKR.ForcedSaveLoad.onOffManualSaveSlot(isSaveFileEnabled, saveFileIndex) - вкл/выкл возможность ручного сохр-я в слот.
 * DKR.ForcedSaveLoad.forcedSave(saveFileIndex) - принудительное сохранение в указанный слот.
 * DKR.ForcedSaveLoad.forcedLoad(saveFileIndex) - принудительная загрузка из указанного слота.
 * где 
 * isSaveFileEnabled - true (можно сохранять в слот вручную) или false (слот закрыт для ручного сохранения).
 * saveFileIndex - номер слота сохранения для сохранения / загрузки (д.б. больше 0!).
 * ----------------------------------------------------------------------------
 *
 * @param saveSlotsStatusesListVarId
 * @type variable
 * @desc Номер переменной для сохранения Списка доступности слотов сохранения
 * @default 7
 *
 */

(function() { 



//----DATA
DKR.ForcedSaveLoad.parameters = PluginManager.parameters('DKR_ForcedSaveLoad_2_MV');
let saveSlotsStatusesListVarId = Number(DKR.ForcedSaveLoad.parameters["saveSlotsStatusesListVarId"]) || 7;



//----LOGIC
const isSavefileEnabled = function(savefileId){
	let saveSlotsStatusesList = $gameVariables.value(saveSlotsStatusesListVarId) || [];
	
	let isSavefileEnabled = false;
	
	const saveSlotStatus = saveSlotsStatusesList[savefileId];
	if(undefined === saveSlotStatus || true === saveSlotStatus.slotEnabled){
		isSavefileEnabled = true;
	}else{
		isSavefileEnabled = false;
	}
	
	return isSavefileEnabled;
}


const enableOrDisableSaveSlot = function(isSaveFileEnabled, savefileId){
	let saveSlotsStatusesList = $gameVariables.value(saveSlotsStatusesListVarId) || [];
	
	const saveSlotStatus = {slotId: savefileId, slotEnabled: isSaveFileEnabled};
	saveSlotsStatusesList[savefileId] = saveSlotStatus;
	
	$gameVariables.setValue(saveSlotsStatusesListVarId, saveSlotsStatusesList);
}


const saveForeced = function(saveFileIndex = 1){
	if(saveFileIndex < 1){
		console.log('DKR.ForcedSaveLoad_SAVE: save file index can\'t be below one!');
		return false
	}
	console.log('DKR.ForcedSaveLoad: force save in file #' + saveFileIndex + '...');
	$gameSystem.onBeforeSave();
	DataManager.saveGame(saveFileIndex);
}


const loadForced = function(loadFileIndex = 1){
	if(loadFileIndex < 1){
		console.log('DKR.ForcedSaveLoad_LOAD: save file index can\'t be below one!');
		return false
	}
	if(false === StorageManager.exists(loadFileIndex)){
		console.log('DKR.ForcedSaveLoad_LOAD: saveFile ' + loadFileIndex + ' not exist!');
		return false
	}
	if(true === DataManager.isAnySavefileExists()){
		console.log('DKR.ForcedSaveLoad: force load save file #' + loadFileIndex + '...');
		if (DataManager.loadGame(loadFileIndex)) {
			$gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
			$gamePlayer.requestMapReload();
			SceneManager.goto(Scene_Map);
		}
	}
}



//----MODIFY CORE-LIB
//--save process
Scene_Save.prototype.onSavefileOk = function() {
    Scene_File.prototype.onSavefileOk.call(this);
	
	let savefileId =  this.savefileId();
	
	if( true === isSavefileEnabled(savefileId) ){
		$gameSystem.onBeforeSave();
		if (DataManager.saveGame(this.savefileId())) {
			this.onSaveSuccess();
			
			let saveSlotsStatusesList = $gameVariables.value(saveSlotsStatusesListVarId) || [];
			saveSlotsStatusesList.push( {slotId: savefileId, slotEnabled: true} );
			$gameVariables.setValue(saveSlotsStatusesListVarId, saveSlotsStatusesList);
			
			//saveSlotsStatusesList.push( {slotId: savefileId, slotEnabled: true} );
		} else {
			this.onSaveFailure();
		}
	} else {
		this.onSaveFailure();
	}
    
};


//--save GUI
Window_SavefileList.prototype.drawItem = function(index) {
    var id = index + 1;
    var valid = DataManager.isThisGameFile(id);
	
	valid = isSavefileEnabled(id);
	
    var info = DataManager.loadSavefileInfo(id);
    var rect = this.itemRectForText(index);
    this.resetTextColor();
    if (this._mode === 'load') {
        this.changePaintOpacity(valid);
    }
    this.drawFileId(id, rect.x, rect.y);
    if (info) {
        this.changePaintOpacity(valid);
        this.drawContents(info, rect, valid);
        this.changePaintOpacity(true);
    }
};



//----COMMANDS
DKR.ForcedSaveLoad.onOffManualSaveSlot = function(isSaveFileEnabled, saveFileIndex){	
	enableOrDisableSaveSlot(isSaveFileEnabled, saveFileIndex);
}

DKR.ForcedSaveLoad.forcedSave = function(saveFileIndex){
	saveForeced(saveFileIndex);
}

DKR.ForcedSaveLoad.forcedLoad = function(loadFileIndex){
	loadForced(loadFileIndex);
}


	
})();