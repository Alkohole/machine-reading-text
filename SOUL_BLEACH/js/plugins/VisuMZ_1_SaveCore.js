//=============================================================================
// VisuStella MZ - Save Core
// VisuMZ_1_SaveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SaveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SaveCore = VisuMZ.SaveCore || {};
VisuMZ.SaveCore.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.04] [SaveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Save_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Save Core plugin adds upon the existing functionality of how saves
 * operate in RPG Maker MZ and how the Save Menu appears in-game. Control over
 * autosaves is also provided by this plugin as well as the ability to make
 * Global Switches and Variables accessible across all game saves (including
 * new games).
 *
 * Features include all (but not limited to) the following:
 * 
 * * Save file technicalities including how filenames are made and or how
 *   forage keys are labeled to distinguish games from one another.
 * * Save types (standard, slot-locked, or single) to change saving to be
 *   suited for each game type.
 * * Save confirmation window added to relay information to player on whether
 *   or not a save has been made successfully.
 * * Global Switches and Variables that span across all saves and new games.
 * * Control over how autosaves handle (their own file, save over existing
 *   files, and/or both).
 * * Plugin Commands that enable/disable autosaves and forcefully activate them
 *   or request them.
 * * Change up how the Save Menu appears with various save styles.
 * * Add descriptions and pictures to the save files.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Global Switches and Global Variables
 * ============================================================================
 *
 * Global Switches and Global Variables are now added into the game engine via
 * this plugin. Global Switches and Global Variables exist in the same state
 * across all save files. This means if Switch 40 is declared to be a Global
 * Switch and is turned ON, then whether you start up a new game or open a
 * different save file, Switch 40 will be in the ON state. Similar will occur
 * with Global Variables.
 *
 * ---
 *
 * <Global> Switch/Variable Name
 *
 * To declare Global Switches and/or Global Variables, insert <Global> into
 * the Switch/Variable's name. That's all there is to it. Whatever value you
 * change the Global Switch/Variable to after declaring it will be changed
 * across all saves.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <Global>, <JS>, or <Self> simultaneously.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Autosave Plugin Commands ===
 * 
 * ---
 *
 * Autosave: Enable/Disable
 * - Enable or Disable Autosave
 * - Requires Database => System 1 => [x] Enable Autosave
 *
 *   Enable or Disable?:
 *   - Enable or disable autosave?
 *
 * ---
 *
 * Autosave: (Stage 1) Request
 * - Autosaves the game at current point if enabled.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - Autosave does not go through if it is neither enabled in the database or
 *   in-game through the "Autosave: Enable/Disable" plugin command.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 2) Execute
 * - Executes autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 3) Force
 * - Forces autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 *
 * ---
 *
 * Save: Current Slot
 * - Process the game's current save at the current point.
 * - Must be outside of battle and on the map.
 *
 * ---
 * 
 * === Save Plugin Commands ===
 * 
 * ---
 *
 * Save: Set Description
 * - Set the description text that will appear in the save files.
 *
 *   Text:
 *   - Insert desired save description text here.
 *   - Text codes supported.
 *   - \V[x], \N[x], \P[x] are save local.
 *   - Other text codes will draw data from the currently active game.
 *
 * ---
 *
 * Save: Set Picture
 * - Set the picture that would appear in the save file.
 *
 *   Filename:
 *   - Input the filename here of the desired picture.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Save Settings
 * ============================================================================
 *
 * These are general settings pertaining to saves and the technicalities behind
 * how saves work in your game.
 *
 * ---
 *
 * General
 * 
 *   Save Style:
 *   - Select a save style for the game. Some of these options may alter other
 *     Plugin Parameter settings.
 *   - Standard: Save freely in any slot.
 *   - Slot-Locked: Select one dedicated slot at New Game.
 *   - Single: Only one slot is available for the game.
 * 
 *   Max Save Files:
 *   - Maximum number of save files for the game.
 * 
 *   Autosave Counts?:
 *   - Count the autosave file towards the max count?
 *
 * ---
 *
 * Local Mode
 * 
 *   Local Mode?:
 *   - When running the game on client, use the Local Mode of saving via files
 *     or store saves to forage keys?
 * 
 *   Filename Format:
 *   - Filename format for save files.
 *   - %1 - Save File ID
 * 
 *   Extension Format:
 *   - Filename extension format for save files.
 *   - %1 - Save Name
 *
 * ---
 *
 * Forage Key
 * 
 *   Forage Key Format:
 *   - Forage Key format when saving to memory.
 *   - %1 - Game ID, %2 - Save Name
 * 
 *   Forage Key Test:
 *   - Key used to test if saving a forage key is possible.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Help: Slot-Locked:
 *   - Help description used for initial slot-locked selection.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Save Success:
 *   - Code to perform when a save is successful.
 * 
 *   JS: On Save Failure:
 *   - Code to perform when a save has failed.
 * 
 *   JS: On Load Success:
 *   - Code to perform when a load is successful.
 * 
 *   JS: On Load Failure:
 *   - Code to perform when a load has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Confirm Window Settings
 * ============================================================================
 *
 * The Save Confirmation Window is a new feature added through this plugin.
 * It gives the player visual feedback letting the player know that a save is
 * successful or not.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Save Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions of the Save Confirmation Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for a "Save Success" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Save Failure:
 *   - Text used for a "Save Failure" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Load Failure:
 *   - Text used for a "Load Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Settings
 * ============================================================================
 *
 * These settings adjust how autosaves work in your game project. The settings
 * will encompass the original autosave settings made by RPG Maker MZ as well
 * as new settings added through this plugin.
 *
 * ---
 *
 * General
 * 
 *   Autosave Type:
 *   - Select autosave type.
 *   - Requires Database => System 1 => [x] Enable Autosave
 *   - Autosave File: Dedicated save file for autosaves.
 *   - Current File: Overwrites the current save file.
 *   - Autosave File + Current File: Both of the above.
 * 
 *   Start Enabled?:
 *   - Start with autosave enabled?
 *   - Requires Database => System 1 => [x] Enable Autosave
 *
 * ---
 *
 * Requests
 * 
 *   Requires Save Enable?:
 *   - Autosave requests require Saving to be enabled?
 * 
 *   Request after Battle?:
 *   - Requests an autosave after battle?
 * 
 *   Request on Transfer?:
 *   - Requests an autosave after a map transfer?
 * 
 *   Request on Menu Open?:
 *   - Requests an autosave after opening the main menu?
 * 
 *   Request on Menu Exit?:
 *   - Requests an autosave after exiting the main menu?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Success:
 *   - Code to perform when an autosave is successful.
 * 
 *   JS: On Failure:
 *   - Code to perform when an autosave has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Confirm Window Settings
 * ============================================================================
 *
 * The Autosave Confirmation Window is a new feature added by this plugin to
 * notify the player whenever autosaving occurs.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Autoave Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   Screen Position:
 *   - Where does this window appear on the screen?
 *   - Lower Left
 *   - Lower Center
 *   - Lower Right
 *   - Middle Left
 *   - Middle Center
 *   - Middle Right
 *   - Upper Left
 *   - Upper Center
 *   - Upper Right
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for an "Autosave Success" message popup.
 *   - Text codes are allowed
 * 
 *   Pop Up: Save Failure:
 *   - Text used for an "Autosave Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Options Settings
 * ============================================================================
 *
 * This plugin adds the "Autosave" option to the Options menu, allowing players
 * to decide if they want autosave enabled or not. This feature can be disabled
 * as well, to better suit games. If the "Autosave" option is turned off by the
 * player, then any Autosave requests and executions.
 *
 * ---
 *
 * Autosave Options
 * 
 *   Add Option?:
 *   - Add the 'Autosave' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - Determine the default value of this option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Graphic Settings
 * ============================================================================
 *
 * This Plugin Parameter lets you select which graphic to use for displaying
 * the actor party found inside the save menu.
 *
 * ---
 *
 * Actor Graphic
 * 
 *   None:
 *   - Don't display any actors.
 * 
 *   Face:
 *   - Display the face graphics for the actors.
 * 
 *   Map Sprite:
 *   - Display the sprite graphics for the actors.
 * 
 *   Sideview Battler:
 *   - Display the SV Battler graphics for the actors.
 *   * Note: If you have an existing save made before this plugin was
 *     installed, you may need to save over the existing ones to see the
 *     Sideview Battler graphics.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Menu Styles
 * ============================================================================
 *
 * Save Menu Styles affect how the save files themselves appear to the player,
 * as long horizontal lists, vertical columns, small boxes, or a large file.
 *
 * ---
 *
 * Save Menu Styles
 * 
 *   List:
 *   - Save files stretch horizontally across the screen.
 *   - Save files are listed as rows.
 * 
 *   Vertical:
 *   - Save files are stretched vertically across the screen.
 *   - Save files are depicted as columns.
 * 
 *   Box:
 *   - Save files are small boxes shown on the screen.
 *   - Save files are sign in both rows and columns.
 * 
 *   Large:
 *   - Save files take up the whole screen.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Style Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to manipulate how the save styles
 * appear in-game if they're not to your liking. JavaScript familiarity is a
 * must to adjust them.
 *
 * ---
 *
 * General
 * 
 *   Latest Text:
 *   - Text used to depict latest save file.
 * 
 *   Latest Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Sprite Width:
 *   - Pixel width of map sprites when drawn in the Save Menu.
 * 
 *   SV Battler Width:
 *   - Pixel width of sv battlers when drawn in the Save Menu.
 *
 *   JS: Save Display Info:
 *   - Code that, upon saving, determines which info is quickly stored
 *     for displaying.
 *
 * ---
 *
 * List Style
 * Vertical Style
 * Box Style
 * Large Style
 * 
 *   Rows:
 *   - Number of rows for this style.
 * 
 *   Columns:
 *   - Number of column for this style.
 * 
 *   JS: Draw Contents:
 *   - Code on how to draw the contents for this style.
 * 
 *   JS: Draw File Data:
 *   - Code on how to draw the file data for this style.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.04: March 12, 2021
 * * Bug Fixes!
 * ** Fixed a bug where using the Plugin Command to save the current slot would
 *    not reload properly if the audio file BGM was not synched. Fix made by
 *    Arisu.
 * 
 * Version 1.03: November 29, 2020
 * * Bug Fixes!
 * ** Displayed month should now show the correct numeric value.
 *    Fix made by Arisu.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * * Documentation Update!
 * ** The Plugin Command 'Save: Set Description' now has updated documentation
 *    for the text codes that are parsed on the local level.
 * * Feature Update!
 * ** The Plugin Command 'Save: Set Description' will now parse text code
 *    data for \V[x], \N[x], \P[x] on a local save file level. Feature updated
 *    by Yanfly.
 * 
 * Version 1.01: September 6, 2020
 * * Bug Fixes!
 * ** Disabling confirmation windows no longer cause crashes.
 *    Fix made by Yanfly.
 * ** Plugin Commands for for setting descriptions and save images work despite
 *    save settings found in the database. Fix made by Yanfly.
 * ** Save Core no longer crashes when going to the Save/Load scenes without
 *    the Core Engine enabled.
 * ** Single and Locked save styles no longer crash the game when loading.
 *    Fix made by Olivia.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveEnable
 * @text Autosave: Enable/Disable
 * @desc Enable or Disable Autosave
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @arg Enable:eval
 * @text Enable or Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable or disable autosave?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveRequest
 * @text Autosave: (Stage 1) Request
 * @desc Autosaves the game at current point if enabled.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveExecute
 * @text Autosave: (Stage 2) Execute
 * @desc Executes autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveForce
 * @text Autosave: (Stage 3) Force
 * @desc Force autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveCurrentSlot
 * @text Save: Current Slot
 * @desc Process the game's current save at the current point.
 * Must be outside of battle and on the map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveDescription
 * @text Save: Set Description
 * @desc Set the description text that will appear in the save files.
 *
 * @arg Text:str
 * @text Text
 * @desc Insert desired save description text here. 
 * Text codes supported. \V[x], \N[x], \P[x] are save local.
 * @default Text
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SavePicture
 * @text Save: Set Picture
 * @desc Set the picture that would appear in the save file.
 *
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Input the filename here of the desired picture.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SaveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Save:struct
 * @text Save Settings
 * @type struct<Save>
 * @desc General save settings pertaining to the game.
 * @default {"General":"","SaveStyle:str":"standard","MaxSaveFiles:num":"20","AutosaveMaxCount:eval":"false","LocalMode":"","LocalMode:eval":"true","FilenameFmt:str":"file%1","ExtensionFmt:str":"%1.rmmzsave","ForageKey":"","KeyFmt:str":"rmmzsave.%1.%2","TestKey:str":"rmmzsave.test","Vocabulary":"","VocabLockedSaveSlot:str":"Pick a file to start a new game.","JavaScript":"","OnSaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnSaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param SaveConfirm:struct
 * @text Confirm Window
 * @parent Save:struct
 * @type struct<SaveConfirm>
 * @desc Settings regarding the Save Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ConfirmRect:func":"\"const width = Graphics.boxWidth / 2;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = (Graphics.width - width) / 2;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Vocabulary":"","VocabSaveSuccess:str":"Save Successful!","VocabSaveFailure:str":"Could not save!","VocabLoadFailure:str":"Could not load save file!"}
 *
 * @param Autosave:struct
 * @text Autoave Settings
 * @type struct<Autosave>
 * @desc Game settings related to autosave.
 * @default {"General":"","AutosaveType:str":"file0","StartEnabled:eval":"true","Requests":"","RequestsRequireSaveEnable:eval":"true","AfterBattle:eval":"true","AfterTransfer:eval":"true","AfterMenuCall:eval":"true","AfterExitMenu:eval":"true","JavaScript":"","OnAutosaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnAutosaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param AutosaveConfirm:struct
 * @text Confirm Window
 * @parent Autosave:struct
 * @type struct<AutosaveConfirm>
 * @desc Settings regarding the Autosave Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ScreenPosition:str":"lower right","Vocabulary":"","VocabAutosaveSuccess:str":"\\I[193]Autosaved!","VocabAutosaveFailure:str":"\\I[194]Autosave failed!"}
 *
 * @param AutosaveOption:struct
 * @text Options Settings
 * @parent Autosave:struct
 * @type struct<AutosaveOption>
 * @desc Options Menu settings regarding Autosave.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Autosave","Default:num":"true"}
 *
 * @param StyleBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ActorGraphic:str
 * @text Actor Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in save menus.
 * @default face
 *
 * @param SaveMenuStyle:str
 * @text Save Menu Style
 * @type select
 * @option List
 * @value list
 * @option Vertical
 * @value vertical
 * @option Box
 * @value box
 * @option Large
 * @value large
 * @desc Choose what kind of style to use for the Save Menu.
 * @default box
 *
 * @param SaveMenu:struct
 * @text Style Settings
 * @parent SaveMenuStyle:str
 * @type struct<SaveMenu>
 * @desc Settings regarding the individual Save Menu styles.
 * @default {"General":"","LatestText:str":"NEW!","LatestColor:str":"#f49ac1","SpriteWidth:num":"48","SvBattlerWidth:num":"64","MakeSavefileInfoJS:func":"\"// Declare Constants\\nconst info = arguments[0];\\n\\n// Store Displayed Save Data\\ninfo.gold = $gameParty.gold();\\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\\ninfo.description = $gameSystem.getSaveDescription() || '';\\ninfo.picture = $gameSystem.getSavePicture() || '';\\n\\n// Return Save Info\\nreturn info;\"","List":"","ListRows:num":"4","ListCols:num":"1","ListContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nlet ch = rect.height;\\nif (this.actorStyle() === 'sprite') {\\n    ch -= lineHeight - 8;\\n} else if (this.actorStyle() === 'svbattler') {\\n    ch -= lineHeight - 12;\\n}\\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nif (info.gold || info.description) {\\n    const gy = rect.y + rect.height - lineHeight;\\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n}\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight;\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\"","ListFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);\"","Vertical":"","VertRows:num":"1","VertCols:num":"3","VertContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + rect.height - lineHeight;\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny -= lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    y -= lineHeight;\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","VertFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Box":"","BoxRows:num":"2","BoxCols:num":"3","BoxContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst rh = rect.height - lineHeight * 3;\\nconst ch = ImageManager.faceHeight;\\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + lineHeight;\\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\ny += lineHeight;\\nconst hw = rect.width / 2;\\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nif (info.gold) {\\n    // Ignore drawing gold in this style\\n    // y = rect.y + rect.height - lineHeight * 3;\\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\"","BoxFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Large":"","LargeRows:num":"1","LargeCols:num":"1","LargeContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 1.5;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","LargeFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Save Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Save:
 *
 * @param General
 *
 * @param SaveStyle:str
 * @text Save Style
 * @parent General
 * @type select
 * @option Standard: Save freely in any slot.
 * @value standard
 * @option Slot-Locked: Select one dedicated slot at New Game.
 * @value locked
 * @option Single: Only one slot is available for the game.
 * @value single
 * @desc Select a save style for the game. Some of these options
 * may alter other Plugin Parameter settings.
 * @default standard
 *
 * @param MaxSaveFiles:num
 * @text Max Save Files
 * @parent General
 * @desc Maximum number of save files for the game.
 * @default 20
 *
 * @param AutosaveMaxCount:eval
 * @text Autosave Counts?
 * @parent General
 * @type boolean
 * @on Counts Towards Max
 * @off Doesn't Count
 * @desc Count the autosave file towards the max count?
 * @default false
 *
 * @param LocalMode
 * @text Local Mode
 *
 * @param LocalMode:eval
 * @text Local Mode?
 * @parent LocalMode
 * @type boolean
 * @on Local File
 * @off Forage Key
 * @desc When running the game on client, use the Local Mode of
 * saving via files or store saves to forage keys?
 * @default true
 *
 * @param FilenameFmt:str
 * @text Filename Format
 * @parent LocalMode
 * @desc Filename format for save files.
 * %1 - Save File ID
 * @default file%1
 *
 * @param ExtensionFmt:str
 * @text Extension Format
 * @parent LocalMode
 * @desc Filename extension format for save files.
 * %1 - Save Name
 * @default %1.rmmzsave
 *
 * @param ForageKey
 * @text Forage Key
 *
 * @param KeyFmt:str
 * @text Forage Key Format
 * @parent ForageKey
 * @desc Forage Key format when saving to memory.
 * %1 - Game ID, %2 - Save Name
 * @default rmmzsave.%1.%2
 *
 * @param TestKey:str
 * @text Forage Key Test
 * @parent ForageKey
 * @desc Key used to test if saving a forage key is possible.
 * @default rmmzsave.test
 *
 * @param Vocabulary
 *
 * @param VocabLockedSaveSlot:str
 * @text Help: Slot-Locked
 * @parent Vocabulary
 * @desc Help description used for initial slot-locked selection.
 * @default Pick a file to start a new game.
 *
 * @param JavaScript
 *
 * @param OnSaveSuccessJS:func
 * @text JS: On Save Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnSaveFailureJS:func
 * @text JS: On Save Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadSuccessJS:func
 * @text JS: On Load Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadFailureJS:func
 * @text JS: On Load Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Save Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ConfirmRect:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions of the 
 * Save Confirmation Window.
 * @default "const width = Graphics.boxWidth / 2;\nconst height = this.calcWindowHeight(1, false);\nconst x = (Graphics.width - width) / 2;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Vocabulary
 *
 * @param VocabSaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for a "Save Success" message popup.
 * Text codes are allowed.
 * @default Save Successful!
 *
 * @param VocabSaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for a "Save Failure" message popup.
 * Text codes are allowed.
 * @default Could not save!
 *
 * @param VocabLoadFailure:str
 * @text Pop Up: Load Failure
 * @parent Vocabulary
 * @desc Text used for a "Load Failure" message popup.
 * Text codes are allowed.
 * @default Could not load save file!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Autosave:
 *
 * @param General
 *
 * @param AutosaveType:str
 * @text Autosave Type
 * @parent General
 * @type select
 * @option Autosave File: Dedicated file for autosaves.
 * @value file0
 * @option Current File: Overwrites the current save file.
 * @value current
 * @option Autosave File + Current File: Both of the above.
 * @value both
 * @desc Select autosave type.
 * Requires Database => System 1 => [x] Enable Autosave
 * @default file0
 *
 * @param StartEnabled:eval
 * @text Start Enabled?
 * @parent General
 * @type boolean
 * @on Start Enabled
 * @off Start Disabled
 * @desc Start with autosave enabled?
 * Requires Database => System 1 => [x] Enable Autosave
 * @default true
 *
 * @param Requests
 *
 * @param RequestsRequireSaveEnable:eval
 * @text Requires Save Enable?
 * @parent Requests
 * @type boolean
 * @on Requires Save Enable
 * @off Doesn't Require
 * @desc Autosave requests require Saving to be enabled?
 * @default true
 *
 * @param AfterBattle:eval
 * @text Request after Battle?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after battle?
 * @default true
 *
 * @param AfterTransfer:eval
 * @text Request on Transfer?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after a map transfer?
 * @default true
 *
 * @param AfterMenuCall:eval
 * @text Request on Menu Open?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after opening the main menu?
 * @default true
 *
 * @param AfterExitMenu:eval
 * @text Request on Menu Exit?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after exiting the main menu?
 * @default true
 *
 * @param JavaScript
 *
 * @param OnAutosaveSuccessJS:func
 * @text JS: On Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnAutosaveFailureJS:func
 * @text JS: On Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Autoave Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ScreenPosition:str
 * @text Screen Position
 * @parent General
 * @type select
 * @option Lower Left
 * @value lower left
 * @option Lower Center
 * @value lower center
 * @option Lower Right
 * @value lower right
 * @option Middle Left
 * @value middle left
 * @option Middle Center
 * @value middle center
 * @option Middle Right
 * @value middle right
 * @option Upper Left
 * @value upper left
 * @option Upper Center
 * @value upper center
 * @option Upper Right
 * @value upper right
 * @desc Where does this window appear on the screen?
 * @default lower right
 *
 * @param Vocabulary
 *
 * @param VocabAutosaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for an "Autosave Success" message popup.
 * Text codes are allowed.
 * @default \I[193]Autosaved!
 *
 * @param VocabAutosaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for an "Autosave Failure" message popup.
 * Text codes are allowed.
 * @default \I[194]Autosave failed!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveOption:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Autosave' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Autosave
 *
 * @param Default:eval
 * @text Default Value
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Determine the default value of this option.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param General
 *
 * @param LatestText:str
 * @text Latest Text
 * @parent General
 * @desc Text used to depict latest save file.
 * @default NEW!
 *
 * @param LatestColor:str
 * @text Latest Color
 * @parent General
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #f49ac1
 *
 * @param SpriteWidth:num
 * @text Sprite Width
 * @parent General
 * @type number
 * @desc Pixel width of map sprites when drawn in the Save Menu.
 * @default 48
 *
 * @param SvBattlerWidth:num
 * @text SV Battler Width
 * @parent General
 * @type number
 * @desc Pixel width of sv battlers when drawn in the Save Menu.
 * @default 64
 *
 * @param MakeSavefileInfoJS:func
 * @text JS: Save Display Info
 * @parent General
 * @type note
 * @desc Code that, upon saving, determines which info is quickly stored for displaying.
 * @default "// Declare Constants\nconst info = arguments[0];\n\n// Store Displayed Save Data\ninfo.gold = $gameParty.gold();\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\ninfo.description = $gameSystem.getSaveDescription() || '';\ninfo.picture = $gameSystem.getSavePicture() || '';\n\n// Return Save Info\nreturn info;"
 *
 * @param List
 * @text List Style
 *
 * @param ListRows:num
 * @text Rows
 * @parent List
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 4
 *
 * @param ListCols:num
 * @text Columns
 * @parent List
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param ListContentsJS:func
 * @text JS: Draw Contents
 * @parent List
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nlet ch = rect.height;\nif (this.actorStyle() === 'sprite') {\n    ch -= lineHeight - 8;\n} else if (this.actorStyle() === 'svbattler') {\n    ch -= lineHeight - 12;\n}\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nif (info.gold || info.description) {\n    const gy = rect.y + rect.height - lineHeight;\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n}\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight;\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');"
 *
 * @param ListFileDataJS:func
 * @text JS: Draw File Data
 * @parent List
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);"
 *
 * @param Vertical
 * @text Vertical Style
 *
 * @param VertRows:num
 * @text Rows
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param VertCols:num
 * @text Columns
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param VertContentsJS:func
 * @text JS: Draw Contents
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + rect.height - lineHeight;\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny -= lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    y -= lineHeight;\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param VertFileDataJS:func
 * @text JS: Draw File Data
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Box
 * @text Box Style
 *
 * @param BoxRows:num
 * @text Rows
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 2
 *
 * @param BoxCols:num
 * @text Columns
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param BoxContentsJS:func
 * @text JS: Draw Contents
 * @parent Box
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst rh = rect.height - lineHeight * 3;\nconst ch = ImageManager.faceHeight;\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + lineHeight;\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\ny += lineHeight;\nconst hw = rect.width / 2;\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nif (info.gold) {\n    // Ignore drawing gold in this style\n    // y = rect.y + rect.height - lineHeight * 3;\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);"
 *
 * @param BoxFileDataJS:func
 * @text JS: Draw File Data
 * @parent Box
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Large
 * @text Large Style
 *
 * @param LargeRows:num
 * @text Rows
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param LargeCols:num
 * @text Columns
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param LargeContentsJS:func
 * @text JS: Draw Contents
 * @parent Large
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 1.5;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param LargeFileDataJS:func
 * @text JS: Draw File Data
 * @parent Large
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 */
//=============================================================================

const _0x3f6f=['optAutosave','onAfterLoad','svbattler','ListRows','latestSavefileId','exitMenu','addSaveCoreCommands','shouldAutosave','fadeIn','file0','ConvertParams','EVAL','autosaveEnabled','createSaveConfirmationWindow','close','Scene_Title_terminate','textColor','onTransferEnd','getHours','Scene_Map_onTransferEnd','autosaveOption','AfterBattle','min','drawItem','setupNewGame','getColorDataFromPluginParameters','VocabLoadFailure','GlobalVariables','saveFailure','makeData','28685FZUAQO','Window_SavefileList_setMode','status','Scene_Map_onMapLoaded','1TulUbV','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','exit','ActorGraphic','isAutosaveConfirmWindowEnabled','drawContents','Enable','SaveDescription','LargeRows','single','forageTestKey','inBattle','OnSaveFailureJS','textSizeEx','Autosave','AfterMenuCall','sprite','replace','resetFontSettings','OnSaveSuccessJS','AdjustRect','saveSuccess','contentsOpacity','Game_Switches_value','addSaveCoreAutosaveCommand','SaveCore','AfterTransfer','STRUCT','ConfigManager_makeData','OnAutosaveSuccessJS','loadFailure','gradientFillRect','onSaveCoreLoadFailure','latestSave','playSave','drawTextEx','saveMenuSpriteWidth','SaveMenuStyle','height','ListFileDataJS','saveDescription','Scene_Boot_onDatabaseLoaded','saveGame','isSaveConfirmWindowEnabled','drawFileData','fileDirectoryPath','partyMemberName','onAutosaveSuccess','_loadSuccess','FilenameFmt','startNewGameLockedSave','drawVerticalStyleFileData','requestAutosave','_active','currencyUnit','Scene_Save_onSaveFailure','determineAutosaveBypass','SaveMenu','MaxSaveFiles','format','clear','closeAutosaveConfirmationWindow','_autosaveConfirmWindow','advanced','callMenu','windowPadding','13Qlbpir','drawListStyleContents','drawSvBattlerSprites','updateFade','setSaveDescription','VertCols','resetWordWrap','Filename','openSaveConfirmationWindow','[Year].[Month].[Date]\x20[Hour]:[Minute]:[Second]','STR','ConfirmRect','setFadeSpeed','getFullYear','savefileId','gold','value','SaveConfirm','setMode','AutosaveRequest','left','floor','_saveConfirmWindow','loadGame','join','loadPicture','getMonth','commandContinueSaveCoreSingle','maxBattleMembers','return\x200','VertContentsJS','catch','max','drawBoxStyleContents','commandNewGame','Scene_Base_requestAutosave','autosaveSuccess','Settings','timestamp','804612YHyWZn','bind','drawPicture','RequestsRequireSaveEnable','actorStyle','prototype','maxCommands','isNwjs','onSaveCoreSaveFailure','update','26819mvwqAa','Scene_Title_commandContinue','right','picture','OnLoadFailureJS','addGeneralOptions','onLoadSuccess','vertical','LatestColor','globalVariables','calcWindowHeight','latestSavefile','1HWJccG','Scene_Load_onLoadSuccess','drawLargeStyleContents','switches','version','Save','removeChild','changeTextColor','DataManager_makeSavefileInfo','1IUNnyr','ConfigManager_applyData','onMapLoaded','drawCurrency','_listWindow','_commandWindow','Scene_Options_maxCommands','call','VocabAutosaveFailure','padStart','7iTYIdZ','Scene_Title_initialize','Duration','getScreenPosition','ARRAYFUNC','_success','length','addChild','_bypassAutosave','create','Default','makeSavename','battlerName','1198LkjLSL','onSaveSuccess','saveConfirmationWindowRect','blt','svActorVertCells','ARRAYJSON','setGlobalValue','Scene_Title_commandNewGame','SpriteWidth','_saveCorePluginCommandSave','openAutosaveConfirmationWindow','goto','locked','OnAutosaveFailureJS','helpWindowText','StartEnabled','commandNewGameSaveCoreLocked','constructor','LargeCols','FUNC','registerCommand','onAutosaveFailure','indexToSavefileId','AutosaveEnable','SavePicture','Scene_Menu_create','Scene_Menu_commandSave','283496bJMVJZ','GlobalSwitches','characters','forceAutosave','ARRAYSTRUCT','setSetSuccess','actorName','globalSwitches','isLocalMode','BoxCols','current','match','loadFailureConfirmationWindow','onSaveFailure','_SaveCoreSettings','Game_System_savefileId','ARRAYNUM','65239GYaEqg','svbattlers','playtime','isBattleTest','savePicture','setValue','_processingAutosave','open','addCommand','_pickLockedSaveSlot','innerWidth','reloadMapIfUpdated','popScene','isEventTest','changePaintOpacity','_savefileId','initialize','AutosaveExecute','autosaveType','contentsBack','AutosaveForce','activate','ExtensionFmt','width','_fadeSpeed','278sXcBql','savefileInfo','terminate','createContents','SvBattlerWidth','drawBackground','BoxFileDataJS','applyData','drawText','filter','playLoad','contents','box','setSavefileId','opacity','_stored_latestSavefile','large','isAutosaveCompatible','innerHeight','ListContentsJS','parse','initSaveCore','drawTitle','OnLoadSuccessJS','mainCommandWidth','VocabSaveFailure','updatePosition','description','isSaveEnabled','onBeforeSave','createAutosaveConfirmationWindow','setWordWrap','ListCols','push','trim','round','drawActorFaces','VertFileDataJS','fadeOut','_scene','map','autosave','isEnabled','commandSaveLocked','Scene_Save_executeSave','setSavePicture','ARRAYSTR','SaveStyle','toUpperCase','executeSave','executeAutosave','Game_Variables_setValue','Game_Variables_value','AddOption','LocalMode','svActorHorzCells','getTimestamp','MakeSavefileInfoJS','saveStyle','Window_Options_addGeneralOptions','getSaveDescription','saveCurrentSlot','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','drawVerticalStyleContents','faceWidth','onSaveCoreSaveSuccess','drawLargeStyleFileData','center','commandContinue','variables','AutosaveOption','both','refresh','battle','playBuzzer','ceil','Scene_Base_onAutosaveSuccess','ScreenPosition','onSaveCoreLoadSuccess','fadeOutAll','maxCols','pickLockedSaveSlot','isPreviousScene','then','save','drawBoxStyleFileData','AutosaveMaxCount','drawActorSprites','process_VisuMZ_SaveCore_Switches_Variables','transfer','ParseTextCodes','getDate','NUM','VocabAutosaveSuccess','_colorCache','saveMenuSvBattlerWidth','maxSavefiles','AutosaveConfirm','globalValue','includes','LatestText','smoothSelect','forageKey','225178tOzccg','Scene_Save_helpWindowText','loadSvActor','drawFace','Name','isAutosaveEnabled','menuStyle','split','autosaveFailure','commandSave','drawCharacter','enableAutosave','process_VisuMZ_SaveCore_Settings','numVisibleRows','drawTimestamp','closeSaveConfirmationWindow','VisuMZ_1_MessageCore','isGlobal','name','Game_Switches_setValue'];const _0x351a=function(_0x36feaf,_0x43b63a){_0x36feaf=_0x36feaf-0x126;let _0x3f6f80=_0x3f6f[_0x36feaf];return _0x3f6f80;};const _0x2d27a4=_0x351a;(function(_0x39c7b1,_0x5e1ea6){const _0x35688b=_0x351a;while(!![]){try{const _0x2f5aba=parseInt(_0x35688b(0x254))*-parseInt(_0x35688b(0x222))+parseInt(_0x35688b(0x19a))*parseInt(_0x35688b(0x203))+-parseInt(_0x35688b(0x1dc))*-parseInt(_0x35688b(0x196))+-parseInt(_0x35688b(0x164))*parseInt(_0x35688b(0x219))+-parseInt(_0x35688b(0x22c))*-parseInt(_0x35688b(0x265))+-parseInt(_0x35688b(0x20d))+parseInt(_0x35688b(0x27e))*-parseInt(_0x35688b(0x239));if(_0x2f5aba===_0x5e1ea6)break;else _0x39c7b1['push'](_0x39c7b1['shift']());}catch(_0x52f0da){_0x39c7b1['push'](_0x39c7b1['shift']());}}}(_0x3f6f,0xbaed5));var label=_0x2d27a4(0x1b3),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2d27a4(0x287)](function(_0x5679c8){const _0x2b758a=_0x2d27a4;return _0x5679c8[_0x2b758a(0x198)]&&_0x5679c8['description']['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x2d27a4(0x201)]||{},VisuMZ['ConvertParams']=function(_0x2167e5,_0x2f1dec){const _0x489c7f=_0x2d27a4;for(const _0x8b4e85 in _0x2f1dec){if(_0x8b4e85['match'](/(.*):(.*)/i)){const _0x1df8d7=String(RegExp['$1']),_0x54131b=String(RegExp['$2'])[_0x489c7f(0x12d)]()[_0x489c7f(0x2a0)]();let _0x5ba2e5,_0x326455,_0x379725;switch(_0x54131b){case _0x489c7f(0x159):_0x5ba2e5=_0x2f1dec[_0x8b4e85]!==''?Number(_0x2f1dec[_0x8b4e85]):0x0;break;case _0x489c7f(0x264):_0x326455=_0x2f1dec[_0x8b4e85]!==''?JSON[_0x489c7f(0x292)](_0x2f1dec[_0x8b4e85]):[],_0x5ba2e5=_0x326455[_0x489c7f(0x2a6)](_0x44e400=>Number(_0x44e400));break;case _0x489c7f(0x183):_0x5ba2e5=_0x2f1dec[_0x8b4e85]!==''?eval(_0x2f1dec[_0x8b4e85]):null;break;case'ARRAYEVAL':_0x326455=_0x2f1dec[_0x8b4e85]!==''?JSON[_0x489c7f(0x292)](_0x2f1dec[_0x8b4e85]):[],_0x5ba2e5=_0x326455[_0x489c7f(0x2a6)](_0x801141=>eval(_0x801141));break;case'JSON':_0x5ba2e5=_0x2f1dec[_0x8b4e85]!==''?JSON['parse'](_0x2f1dec[_0x8b4e85]):'';break;case _0x489c7f(0x23e):_0x326455=_0x2f1dec[_0x8b4e85]!==''?JSON[_0x489c7f(0x292)](_0x2f1dec[_0x8b4e85]):[],_0x5ba2e5=_0x326455[_0x489c7f(0x2a6)](_0x36422a=>JSON[_0x489c7f(0x292)](_0x36422a));break;case _0x489c7f(0x24c):_0x5ba2e5=_0x2f1dec[_0x8b4e85]!==''?new Function(JSON['parse'](_0x2f1dec[_0x8b4e85])):new Function(_0x489c7f(0x1f9));break;case _0x489c7f(0x230):_0x326455=_0x2f1dec[_0x8b4e85]!==''?JSON['parse'](_0x2f1dec[_0x8b4e85]):[],_0x5ba2e5=_0x326455['map'](_0x53bfab=>new Function(JSON[_0x489c7f(0x292)](_0x53bfab)));break;case _0x489c7f(0x1e6):_0x5ba2e5=_0x2f1dec[_0x8b4e85]!==''?String(_0x2f1dec[_0x8b4e85]):'';break;case _0x489c7f(0x12b):_0x326455=_0x2f1dec[_0x8b4e85]!==''?JSON[_0x489c7f(0x292)](_0x2f1dec[_0x8b4e85]):[],_0x5ba2e5=_0x326455['map'](_0x314548=>String(_0x314548));break;case _0x489c7f(0x1b5):_0x379725=_0x2f1dec[_0x8b4e85]!==''?JSON[_0x489c7f(0x292)](_0x2f1dec[_0x8b4e85]):{},_0x2167e5[_0x1df8d7]={},VisuMZ[_0x489c7f(0x182)](_0x2167e5[_0x1df8d7],_0x379725);continue;case _0x489c7f(0x258):_0x326455=_0x2f1dec[_0x8b4e85]!==''?JSON['parse'](_0x2f1dec[_0x8b4e85]):[],_0x5ba2e5=_0x326455[_0x489c7f(0x2a6)](_0x2b5b75=>VisuMZ[_0x489c7f(0x182)]({},JSON[_0x489c7f(0x292)](_0x2b5b75)));break;default:continue;}_0x2167e5[_0x1df8d7]=_0x5ba2e5;}}return _0x2167e5;},(_0x549b33=>{const _0x3d67f3=_0x2d27a4,_0x17e113=_0x549b33[_0x3d67f3(0x176)];for(const _0x52ebfd of dependencies){if(!Imported[_0x52ebfd]){alert(_0x3d67f3(0x19b)[_0x3d67f3(0x1d5)](_0x17e113,_0x52ebfd)),SceneManager[_0x3d67f3(0x19c)]();break;}}const _0x43b74f=_0x549b33[_0x3d67f3(0x299)];if(_0x43b74f[_0x3d67f3(0x25f)](/\[Version[ ](.*?)\]/i)){const _0x2bb821=Number(RegExp['$1']);_0x2bb821!==VisuMZ[label][_0x3d67f3(0x21d)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x3d67f3(0x1d5)](_0x17e113,_0x2bb821)),SceneManager[_0x3d67f3(0x19c)]());}if(_0x43b74f['match'](/\[Tier[ ](\d+)\]/i)){const _0x163d27=Number(RegExp['$1']);_0x163d27<tier?(alert(_0x3d67f3(0x13b)[_0x3d67f3(0x1d5)](_0x17e113,_0x163d27,tier)),SceneManager[_0x3d67f3(0x19c)]()):tier=Math[_0x3d67f3(0x1fc)](_0x163d27,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x549b33['parameters']);})(pluginData),PluginManager[_0x2d27a4(0x24d)](pluginData[_0x2d27a4(0x176)],_0x2d27a4(0x250),_0x559a45=>{const _0x72b53f=_0x2d27a4;if(!DataManager[_0x72b53f(0x28f)]())return;VisuMZ[_0x72b53f(0x182)](_0x559a45,_0x559a45);if($gameSystem)$gameSystem[_0x72b53f(0x16f)](_0x559a45[_0x72b53f(0x1a0)]);}),PluginManager[_0x2d27a4(0x24d)](pluginData['name'],_0x2d27a4(0x1ef),_0x23a337=>{const _0x469ed2=_0x2d27a4;if(!DataManager[_0x469ed2(0x28f)]()||$gameParty[_0x469ed2(0x1a5)]())return;SceneManager[_0x469ed2(0x2a5)]['requestAutosave']();}),PluginManager[_0x2d27a4(0x24d)](pluginData[_0x2d27a4(0x176)],_0x2d27a4(0x276),_0x2c2da1=>{const _0x30ad99=_0x2d27a4;if(!DataManager[_0x30ad99(0x28f)]()||$gameParty[_0x30ad99(0x1a5)]())return;SceneManager[_0x30ad99(0x2a5)][_0x30ad99(0x12f)]();}),PluginManager[_0x2d27a4(0x24d)](pluginData[_0x2d27a4(0x176)],_0x2d27a4(0x279),_0x21d9d9=>{const _0x449d89=_0x2d27a4;if(!DataManager[_0x449d89(0x28f)]()||$gameParty[_0x449d89(0x1a5)]())return;SceneManager['_scene'][_0x449d89(0x257)]();}),PluginManager[_0x2d27a4(0x24d)](pluginData[_0x2d27a4(0x176)],'SaveCurrentSlot',_0x339ba7=>{const _0x162921=_0x2d27a4;SceneManager[_0x162921(0x2a5)]['saveCurrentSlot']();}),PluginManager['registerCommand'](pluginData['name'],_0x2d27a4(0x1a1),_0x3b47ae=>{const _0x37f8f5=_0x2d27a4;VisuMZ[_0x37f8f5(0x182)](_0x3b47ae,_0x3b47ae);if($gameSystem)$gameSystem[_0x37f8f5(0x1e0)](_0x3b47ae['Text']);}),PluginManager[_0x2d27a4(0x24d)](pluginData[_0x2d27a4(0x176)],_0x2d27a4(0x251),_0x41fa54=>{const _0x525180=_0x2d27a4;VisuMZ['ConvertParams'](_0x41fa54,_0x41fa54);if($gameSystem)$gameSystem[_0x525180(0x12a)](_0x41fa54[_0x525180(0x1e3)]);}),VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x1c3)]=Scene_Boot[_0x2d27a4(0x208)]['onDatabaseLoaded'],Scene_Boot[_0x2d27a4(0x208)]['onDatabaseLoaded']=function(){const _0x368f6a=_0x2d27a4;VisuMZ[_0x368f6a(0x1b3)][_0x368f6a(0x1c3)]['call'](this),this[_0x368f6a(0x170)](),this[_0x368f6a(0x155)]();},Scene_Boot['prototype'][_0x2d27a4(0x170)]=function(){const _0x5d46c2=_0x2d27a4;if(StorageManager[_0x5d46c2(0x137)]()===_0x5d46c2(0x1a3))$dataSystem[_0x5d46c2(0x178)]=!![];},VisuMZ[_0x2d27a4(0x255)]=[],VisuMZ[_0x2d27a4(0x193)]=[],Scene_Boot['prototype'][_0x2d27a4(0x155)]=function(){const _0x2d6ab5=_0x2d27a4;for(let _0x240011=0x1;_0x240011<$dataSystem[_0x2d6ab5(0x21c)]['length'];_0x240011++){if($dataSystem[_0x2d6ab5(0x21c)][_0x240011][_0x2d6ab5(0x25f)](/<GLOBAL>/i))VisuMZ[_0x2d6ab5(0x255)]['push'](_0x240011);}for(let _0x2b883d=0x1;_0x2b883d<$dataSystem['variables'][_0x2d6ab5(0x232)];_0x2b883d++){if($dataSystem[_0x2d6ab5(0x142)][_0x2b883d][_0x2d6ab5(0x25f)](/<GLOBAL>/i))VisuMZ[_0x2d6ab5(0x193)][_0x2d6ab5(0x29f)](_0x2b883d);}},DataManager[_0x2d27a4(0x28f)]=function(){const _0x21b82a=_0x2d27a4;return!DataManager['isBattleTest']()&&!DataManager[_0x21b82a(0x272)]()&&$dataSystem[_0x21b82a(0x178)];},DataManager[_0x2d27a4(0x15d)]=function(){const _0x12d1b7=_0x2d27a4;if(StorageManager['saveStyle']()===_0x12d1b7(0x1a3))return 0x1;let _0x3a8812=VisuMZ['SaveCore']['Settings'][_0x12d1b7(0x21e)][_0x12d1b7(0x153)]?0x0:0x1;return VisuMZ[_0x12d1b7(0x1b3)]['Settings'][_0x12d1b7(0x21e)][_0x12d1b7(0x1d4)]+_0x3a8812;},DataManager[_0x2d27a4(0x237)]=function(_0x547a62){const _0x394581=_0x2d27a4,_0x432ebc=VisuMZ[_0x394581(0x1b3)]['Settings'][_0x394581(0x21e)][_0x394581(0x1cb)];return _0x432ebc[_0x394581(0x1d5)](_0x547a62);},VisuMZ['SaveCore']['DataManager_makeSavefileInfo']=DataManager['makeSavefileInfo'],DataManager['makeSavefileInfo']=function(){const _0x35f41c=_0x2d27a4,_0x588b6f=VisuMZ['SaveCore'][_0x35f41c(0x221)][_0x35f41c(0x229)](this);return VisuMZ[_0x35f41c(0x1b3)]['Settings']['SaveMenu'][_0x35f41c(0x136)]['call'](this,_0x588b6f);},ConfigManager[_0x2d27a4(0x126)]=VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x201)][_0x2d27a4(0x143)][_0x2d27a4(0x236)],ConfigManager[_0x2d27a4(0x25b)]=[],ConfigManager['globalVariables']=[],VisuMZ[_0x2d27a4(0x1b3)]['ConfigManager_makeData']=ConfigManager[_0x2d27a4(0x195)],ConfigManager['makeData']=function(){const _0x450751=_0x2d27a4,_0x19bea4=VisuMZ[_0x450751(0x1b3)][_0x450751(0x1b6)][_0x450751(0x229)](this);return _0x19bea4[_0x450751(0x126)]=this['autosave']||VisuMZ[_0x450751(0x1b3)][_0x450751(0x201)][_0x450751(0x143)][_0x450751(0x236)],_0x19bea4['globalSwitches']=this[_0x450751(0x25b)]||[],_0x19bea4[_0x450751(0x216)]=this['globalVariables']||[],_0x19bea4;},VisuMZ['SaveCore'][_0x2d27a4(0x223)]=ConfigManager[_0x2d27a4(0x285)],ConfigManager[_0x2d27a4(0x285)]=function(_0x22f062){const _0x168a5e=_0x2d27a4;VisuMZ[_0x168a5e(0x1b3)][_0x168a5e(0x223)]['call'](this,_0x22f062),this[_0x168a5e(0x126)]=_0x22f062['autosave']!==undefined?_0x22f062['autosave']:VisuMZ[_0x168a5e(0x1b3)][_0x168a5e(0x201)][_0x168a5e(0x143)][_0x168a5e(0x236)],this[_0x168a5e(0x25b)]=_0x22f062['globalSwitches']||[],this[_0x168a5e(0x216)]=_0x22f062[_0x168a5e(0x216)]||[];},StorageManager[_0x2d27a4(0x25c)]=function(){const _0x40fda3=_0x2d27a4;return Utils[_0x40fda3(0x20a)]()?VisuMZ['SaveCore'][_0x40fda3(0x201)]['Save'][_0x40fda3(0x133)]:![];},StorageManager['filePath']=function(_0x7d9d51){const _0x6631d1=_0x2d27a4,_0x51ba78=this[_0x6631d1(0x1c7)](),_0x322c1e=VisuMZ['SaveCore'][_0x6631d1(0x201)][_0x6631d1(0x21e)][_0x6631d1(0x27b)];return _0x51ba78+_0x322c1e[_0x6631d1(0x1d5)](_0x7d9d51);},StorageManager[_0x2d27a4(0x163)]=function(_0x1b7b6d){const _0x1da4ed=_0x2d27a4,_0x579f8c=$dataSystem[_0x1da4ed(0x1d9)]['gameId'],_0x35da64=VisuMZ[_0x1da4ed(0x1b3)][_0x1da4ed(0x201)][_0x1da4ed(0x21e)]['KeyFmt'];return _0x35da64['format'](_0x579f8c,_0x1b7b6d);},StorageManager[_0x2d27a4(0x1a4)]=function(){const _0x521143=_0x2d27a4;return VisuMZ[_0x521143(0x1b3)][_0x521143(0x201)]['Save']['TestKey'];},StorageManager[_0x2d27a4(0x137)]=function(){const _0x13adb1=_0x2d27a4;return VisuMZ[_0x13adb1(0x1b3)][_0x13adb1(0x201)][_0x13adb1(0x21e)][_0x13adb1(0x12c)];},StorageManager[_0x2d27a4(0x277)]=function(){const _0x5239f8=_0x2d27a4;return this['saveStyle']()===_0x5239f8(0x1a3)?_0x5239f8(0x181):VisuMZ[_0x5239f8(0x1b3)]['Settings'][_0x5239f8(0x1a8)]['AutosaveType'];},TextManager[_0x2d27a4(0x14e)]=VisuMZ['SaveCore'][_0x2d27a4(0x201)][_0x2d27a4(0x21e)]['VocabLockedSaveSlot'],TextManager[_0x2d27a4(0x1af)]=VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x201)][_0x2d27a4(0x1ed)]['VocabSaveSuccess'],TextManager[_0x2d27a4(0x194)]=VisuMZ[_0x2d27a4(0x1b3)]['Settings'][_0x2d27a4(0x1ed)][_0x2d27a4(0x297)],TextManager[_0x2d27a4(0x1b8)]=VisuMZ['SaveCore']['Settings'][_0x2d27a4(0x1ed)][_0x2d27a4(0x192)],TextManager[_0x2d27a4(0x18c)]=VisuMZ['SaveCore'][_0x2d27a4(0x201)]['AutosaveOption'][_0x2d27a4(0x168)],TextManager['autosaveSuccess']=VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x201)][_0x2d27a4(0x15e)][_0x2d27a4(0x15a)],TextManager[_0x2d27a4(0x16c)]=VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x201)]['AutosaveConfirm'][_0x2d27a4(0x22a)],TextManager[_0x2d27a4(0x1bb)]=VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x201)][_0x2d27a4(0x1d3)][_0x2d27a4(0x161)],ColorManager['latestSavefile']=function(){const _0x10252d=_0x2d27a4,_0x2d9185=_0x10252d(0x28d);this[_0x10252d(0x15b)]=this[_0x10252d(0x15b)]||{};if(this[_0x10252d(0x15b)][_0x2d9185])return this[_0x10252d(0x15b)][_0x2d9185];const _0x5b833c=VisuMZ['SaveCore']['Settings'][_0x10252d(0x1d3)][_0x10252d(0x215)];return this[_0x10252d(0x191)](_0x2d9185,_0x5b833c);},ColorManager['getColorDataFromPluginParameters']=function(_0x4ebe0e,_0x3bc2b4){const _0x1c02c8=_0x2d27a4;return _0x3bc2b4=String(_0x3bc2b4),this[_0x1c02c8(0x15b)]=this[_0x1c02c8(0x15b)]||{},_0x3bc2b4[_0x1c02c8(0x25f)](/#(.*)/i)?this[_0x1c02c8(0x15b)][_0x4ebe0e]='#%1'[_0x1c02c8(0x1d5)](String(RegExp['$1'])):this[_0x1c02c8(0x15b)][_0x4ebe0e]=this[_0x1c02c8(0x188)](Number(_0x3bc2b4)),this['_colorCache'][_0x4ebe0e];},VisuMZ['SaveCore']['Game_System_initialize']=Game_System[_0x2d27a4(0x208)]['initialize'],Game_System[_0x2d27a4(0x208)][_0x2d27a4(0x275)]=function(){const _0x235cb4=_0x2d27a4;VisuMZ['SaveCore']['Game_System_initialize'][_0x235cb4(0x229)](this),this[_0x235cb4(0x293)]();},Game_System['prototype'][_0x2d27a4(0x293)]=function(){const _0x61f8cb=_0x2d27a4;this[_0x61f8cb(0x262)]={'autosaveEnabled':VisuMZ[_0x61f8cb(0x1b3)]['Settings']['Autosave'][_0x61f8cb(0x248)],'saveDescription':'','savePicture':''};},Game_System[_0x2d27a4(0x208)][_0x2d27a4(0x169)]=function(){const _0x5b9a8f=_0x2d27a4;if(!$dataSystem[_0x5b9a8f(0x178)])return![];if(this[_0x5b9a8f(0x262)]===undefined)this['initSaveCore']();if(this['_SaveCoreSettings'][_0x5b9a8f(0x184)]===undefined)this[_0x5b9a8f(0x293)]();return this[_0x5b9a8f(0x262)][_0x5b9a8f(0x184)];},Game_System[_0x2d27a4(0x208)][_0x2d27a4(0x16f)]=function(_0x33e081){const _0x3fc75f=_0x2d27a4;if(!$dataSystem[_0x3fc75f(0x178)])return;if(this[_0x3fc75f(0x262)]===undefined)this[_0x3fc75f(0x293)]();if(this[_0x3fc75f(0x262)][_0x3fc75f(0x184)]===undefined)this[_0x3fc75f(0x293)]();this[_0x3fc75f(0x262)]['autosaveEnabled']=_0x33e081;},Game_System[_0x2d27a4(0x208)][_0x2d27a4(0x139)]=function(){const _0x1b215a=_0x2d27a4;if(this[_0x1b215a(0x262)]===undefined)this['initSaveCore']();if(this['_SaveCoreSettings'][_0x1b215a(0x1c2)]===undefined)this[_0x1b215a(0x293)]();return this['_SaveCoreSettings'][_0x1b215a(0x1c2)];},Game_System[_0x2d27a4(0x208)][_0x2d27a4(0x1e0)]=function(_0x28cbff){const _0x24f8c2=_0x2d27a4;if(this[_0x24f8c2(0x262)]===undefined)this[_0x24f8c2(0x293)]();if(this[_0x24f8c2(0x262)]['saveDescription']===undefined)this[_0x24f8c2(0x293)]();this['_SaveCoreSettings'][_0x24f8c2(0x1c2)]=VisuMZ[_0x24f8c2(0x1b3)][_0x24f8c2(0x157)](_0x28cbff);},VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x157)]=function(_0x106ac1){const _0x211ba2=_0x2d27a4;while(_0x106ac1[_0x211ba2(0x25f)](/\\V\[(\d+)\]/gi)){_0x106ac1=_0x106ac1[_0x211ba2(0x1ab)](/\\V\[(\d+)\]/gi,(_0x3710db,_0x5e45e4)=>$gameVariables['value'](parseInt(_0x5e45e4)));}while(_0x106ac1[_0x211ba2(0x25f)](/\\N\[(\d+)\]/gi)){_0x106ac1=_0x106ac1[_0x211ba2(0x1ab)](/\\N\[(\d+)\]/gi,(_0x5a7412,_0x2f0264)=>Window_Base['prototype'][_0x211ba2(0x25a)](parseInt(_0x2f0264)));}while(_0x106ac1['match'](/\\P\[(\d+)\]/gi)){_0x106ac1=_0x106ac1['replace'](/\\P\[(\d+)\]/gi,(_0x129964,_0x54ce58)=>Window_Base[_0x211ba2(0x208)][_0x211ba2(0x1c8)](parseInt(_0x54ce58)));}return _0x106ac1;},Game_System[_0x2d27a4(0x208)]['getSavePicture']=function(){const _0x1c8c6b=_0x2d27a4;if(this[_0x1c8c6b(0x262)]===undefined)this[_0x1c8c6b(0x293)]();if(this[_0x1c8c6b(0x262)][_0x1c8c6b(0x269)]===undefined)this['initSaveCore']();return this['_SaveCoreSettings'][_0x1c8c6b(0x269)];},Game_System[_0x2d27a4(0x208)]['setSavePicture']=function(_0x2b95bb){const _0x3d5f1c=_0x2d27a4;if(this[_0x3d5f1c(0x262)]===undefined)this[_0x3d5f1c(0x293)]();if(this[_0x3d5f1c(0x262)][_0x3d5f1c(0x269)]===undefined)this[_0x3d5f1c(0x293)]();this[_0x3d5f1c(0x262)][_0x3d5f1c(0x269)]=_0x2b95bb;},VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x263)]=Game_System[_0x2d27a4(0x208)][_0x2d27a4(0x1ea)],Game_System[_0x2d27a4(0x208)][_0x2d27a4(0x1ea)]=function(){const _0x294630=_0x2d27a4,_0x255b18=StorageManager[_0x294630(0x137)]();switch(_0x255b18){case'locked':return VisuMZ['SaveCore'][_0x294630(0x263)][_0x294630(0x229)](this)||0x1;break;case _0x294630(0x1a3):return 0x0;break;default:return VisuMZ[_0x294630(0x1b3)][_0x294630(0x263)][_0x294630(0x229)](this);break;}},Game_Switches[_0x2d27a4(0x208)][_0x2d27a4(0x175)]=function(_0x212a0f){const _0x2280ef=_0x2d27a4;return $dataSystem[_0x2280ef(0x21c)][_0x212a0f]&&VisuMZ[_0x2280ef(0x255)][_0x2280ef(0x160)](_0x212a0f);},VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x1b1)]=Game_Switches[_0x2d27a4(0x208)]['value'],Game_Switches['prototype']['value']=function(_0x42b20d){const _0x465504=_0x2d27a4;return this[_0x465504(0x175)](_0x42b20d)?this[_0x465504(0x15f)](_0x42b20d):VisuMZ[_0x465504(0x1b3)][_0x465504(0x1b1)][_0x465504(0x229)](this,_0x42b20d);},Game_Switches[_0x2d27a4(0x208)][_0x2d27a4(0x15f)]=function(_0xbe22ee){const _0x2364d8=_0x2d27a4;return ConfigManager[_0x2364d8(0x25b)]=ConfigManager[_0x2364d8(0x25b)]||[],!!ConfigManager[_0x2364d8(0x25b)][_0xbe22ee];},VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x177)]=Game_Switches[_0x2d27a4(0x208)][_0x2d27a4(0x26a)],Game_Switches[_0x2d27a4(0x208)][_0x2d27a4(0x26a)]=function(_0x34e7a0,_0x34ad31){const _0x2cd03b=_0x2d27a4;if(this[_0x2cd03b(0x175)](_0x34e7a0))this[_0x2cd03b(0x23f)](_0x34e7a0,_0x34ad31);VisuMZ[_0x2cd03b(0x1b3)][_0x2cd03b(0x177)][_0x2cd03b(0x229)](this,_0x34e7a0,_0x34ad31);},Game_Switches['prototype'][_0x2d27a4(0x23f)]=function(_0x4e9738,_0x592f7f){const _0x2f59a2=_0x2d27a4;_0x4e9738>0x0&&_0x4e9738<$dataSystem[_0x2f59a2(0x21c)][_0x2f59a2(0x232)]&&(ConfigManager[_0x2f59a2(0x25b)]=ConfigManager[_0x2f59a2(0x25b)]||[],ConfigManager[_0x2f59a2(0x25b)][_0x4e9738]=_0x592f7f,ConfigManager[_0x2f59a2(0x151)]());},Game_Variables[_0x2d27a4(0x208)]['isGlobal']=function(_0x8c71ba){const _0x4b585e=_0x2d27a4;return $dataSystem[_0x4b585e(0x142)][_0x8c71ba]&&VisuMZ['GlobalVariables'][_0x4b585e(0x160)](_0x8c71ba);},VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x131)]=Game_Variables['prototype'][_0x2d27a4(0x1ec)],Game_Variables[_0x2d27a4(0x208)][_0x2d27a4(0x1ec)]=function(_0x4a2ecd){const _0x4b1b81=_0x2d27a4;return this[_0x4b1b81(0x175)](_0x4a2ecd)?this[_0x4b1b81(0x15f)](_0x4a2ecd):VisuMZ[_0x4b1b81(0x1b3)]['Game_Variables_value'][_0x4b1b81(0x229)](this,_0x4a2ecd);},Game_Variables[_0x2d27a4(0x208)][_0x2d27a4(0x15f)]=function(_0x145547){const _0x4b5850=_0x2d27a4;return ConfigManager[_0x4b5850(0x216)]=ConfigManager[_0x4b5850(0x216)]||[],ConfigManager[_0x4b5850(0x216)][_0x145547]===undefined&&(ConfigManager['globalVariables'][_0x145547]=0x0),ConfigManager[_0x4b5850(0x216)][_0x145547];},VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x130)]=Game_Variables[_0x2d27a4(0x208)]['setValue'],Game_Variables[_0x2d27a4(0x208)][_0x2d27a4(0x26a)]=function(_0x573bb0,_0x2a88b8){const _0x4a049b=_0x2d27a4;if(this[_0x4a049b(0x175)](_0x573bb0))this[_0x4a049b(0x23f)](_0x573bb0,_0x2a88b8);VisuMZ[_0x4a049b(0x1b3)][_0x4a049b(0x130)]['call'](this,_0x573bb0,_0x2a88b8);},Game_Variables['prototype']['setGlobalValue']=function(_0x3d623c,_0x565884){const _0x589204=_0x2d27a4;if(_0x3d623c>0x0&&_0x3d623c<$dataSystem[_0x589204(0x142)][_0x589204(0x232)]){ConfigManager[_0x589204(0x216)]=ConfigManager[_0x589204(0x216)]||[];if(typeof _0x565884==='number')_0x565884=Math['floor'](_0x565884);ConfigManager['globalVariables'][_0x3d623c]=_0x565884,ConfigManager[_0x589204(0x151)]();}},Game_Party[_0x2d27a4(0x208)]['svbattlersForSaveFile']=function(){const _0x2f667a=_0x2d27a4;return this['battleMembers']()[_0x2f667a(0x2a6)](_0x3639f8=>_0x3639f8[_0x2f667a(0x238)]());},Scene_Base[_0x2d27a4(0x208)][_0x2d27a4(0x1d2)]=function(_0x5494d3){const _0x29ccda=_0x2d27a4,_0x4a3d76=VisuMZ[_0x29ccda(0x1b3)][_0x29ccda(0x201)][_0x29ccda(0x1a8)];switch(_0x5494d3){case'battle':this['_bypassAutosave']=!_0x4a3d76[_0x29ccda(0x18d)];break;case _0x29ccda(0x156):if(!this[_0x29ccda(0x17f)]())return;this['_bypassAutosave']=!_0x4a3d76[_0x29ccda(0x1b4)];break;case _0x29ccda(0x1da):this[_0x29ccda(0x234)]=!_0x4a3d76[_0x29ccda(0x1a9)];break;case'exitMenu':this['_bypassAutosave']=!_0x4a3d76['AfterExitMenu'];break;}},VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x1ff)]=Scene_Base[_0x2d27a4(0x208)][_0x2d27a4(0x1ce)],Scene_Base['prototype']['requestAutosave']=function(){const _0x1c2e07=_0x2d27a4;!this['_bypassAutosave']&&VisuMZ[_0x1c2e07(0x1b3)]['Scene_Base_requestAutosave'][_0x1c2e07(0x229)](this),this['_bypassAutosave']=![];},Scene_Base[_0x2d27a4(0x208)]['isAutosaveEnabled']=function(){const _0x5a1e42=_0x2d27a4;return!DataManager[_0x5a1e42(0x268)]()&&!DataManager[_0x5a1e42(0x272)]()&&$gameSystem[_0x5a1e42(0x169)]()&&(VisuMZ[_0x5a1e42(0x1b3)][_0x5a1e42(0x201)][_0x5a1e42(0x1a8)][_0x5a1e42(0x206)]?$gameSystem[_0x5a1e42(0x29a)]():!![]);},Scene_Base['prototype'][_0x2d27a4(0x12f)]=function(){const _0x37a85e=_0x2d27a4;if(!ConfigManager[_0x37a85e(0x126)])return;this[_0x37a85e(0x257)]();},Scene_Base[_0x2d27a4(0x208)][_0x2d27a4(0x257)]=function(){const _0x45699c=_0x2d27a4;$gameSystem[_0x45699c(0x29b)](),this['_processingAutosave']=![];const _0x6279ab=StorageManager['autosaveType']();['file0',_0x45699c(0x144)][_0x45699c(0x160)](_0x6279ab)&&DataManager[_0x45699c(0x1c4)](0x0)['then'](()=>this['onAutosaveSuccess']())['catch'](()=>this['onAutosaveFailure']());if([_0x45699c(0x25e),'both'][_0x45699c(0x160)](_0x6279ab)){const _0x3f731c=$gameSystem['savefileId']();_0x3f731c>0x0&&DataManager[_0x45699c(0x1c4)](_0x3f731c)[_0x45699c(0x150)](()=>this[_0x45699c(0x1c9)]())['catch'](()=>this[_0x45699c(0x24e)]());}this[_0x45699c(0x26b)]=![];},VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x149)]=Scene_Base['prototype'][_0x2d27a4(0x1c9)],Scene_Base[_0x2d27a4(0x208)][_0x2d27a4(0x1c9)]=function(){const _0x1abf81=_0x2d27a4;if(this[_0x1abf81(0x26b)])return;VisuMZ[_0x1abf81(0x1b3)][_0x1abf81(0x149)]['call'](this),VisuMZ[_0x1abf81(0x1b3)][_0x1abf81(0x201)]['Autosave'][_0x1abf81(0x1b7)][_0x1abf81(0x229)](this),this[_0x1abf81(0x243)](!![]),this[_0x1abf81(0x26b)]=!![];},VisuMZ[_0x2d27a4(0x1b3)]['Scene_Base_onAutosaveFailure']=Scene_Base[_0x2d27a4(0x208)][_0x2d27a4(0x24e)],Scene_Base['prototype'][_0x2d27a4(0x24e)]=function(){const _0x1e058b=_0x2d27a4;if(this[_0x1e058b(0x26b)])return;VisuMZ[_0x1e058b(0x1b3)]['Scene_Base_onAutosaveFailure'][_0x1e058b(0x229)](this),VisuMZ[_0x1e058b(0x1b3)][_0x1e058b(0x201)][_0x1e058b(0x1a8)][_0x1e058b(0x246)][_0x1e058b(0x229)](this),this['openAutosaveConfirmationWindow'](![]);},Scene_Base[_0x2d27a4(0x208)][_0x2d27a4(0x185)]=function(){const _0x2af2cf=_0x2d27a4;if(this['_saveConfirmWindow'])return;const _0x240cd8=this[_0x2af2cf(0x23b)]();this[_0x2af2cf(0x1f2)]=new Window_Base(_0x240cd8),this['_saveConfirmWindow']['openness']=0x0;},Scene_Base['prototype'][_0x2d27a4(0x23b)]=function(){const _0xcd9154=_0x2d27a4;return VisuMZ[_0xcd9154(0x1b3)][_0xcd9154(0x201)][_0xcd9154(0x1ed)][_0xcd9154(0x1e7)][_0xcd9154(0x229)](this);},Scene_Base[_0x2d27a4(0x208)][_0x2d27a4(0x1c5)]=function(){const _0x2a4dc1=_0x2d27a4;return VisuMZ[_0x2a4dc1(0x1b3)][_0x2a4dc1(0x201)]['SaveConfirm'][_0x2a4dc1(0x1a0)];},Scene_Base[_0x2d27a4(0x208)][_0x2d27a4(0x1e4)]=function(_0x5f23b1,_0xcd3191){const _0x47f0e8=_0x2d27a4;if(!this['isSaveConfirmWindowEnabled']())return this[_0x47f0e8(0x173)](_0x5f23b1);if(!this['_saveConfirmWindow'])this[_0x47f0e8(0x185)]();const _0x3771aa=this[_0x47f0e8(0x1f2)];this['removeChild'](_0x3771aa),this[_0x47f0e8(0x233)](_0x3771aa),_0x3771aa['open'](),_0x3771aa[_0x47f0e8(0x1ac)](),_0x3771aa[_0x47f0e8(0x289)]['clear']();let _0x28d270='';_0xcd3191?_0x28d270=TextManager[_0x47f0e8(0x1b8)]:_0x28d270=_0x5f23b1?TextManager['saveSuccess']:TextManager[_0x47f0e8(0x194)];const _0x3a63bd=_0x3771aa['textSizeEx'](_0x28d270)['width'],_0x5760bb=(_0x3771aa[_0x47f0e8(0x26f)]-_0x3a63bd)/0x2;_0x3771aa[_0x47f0e8(0x1bd)](_0x28d270,_0x5760bb,0x0,_0x3a63bd);const _0x54d1b8=VisuMZ['SaveCore'][_0x47f0e8(0x201)][_0x47f0e8(0x1ed)][_0x47f0e8(0x22e)];setTimeout(this[_0x47f0e8(0x173)][_0x47f0e8(0x204)](this,_0x5f23b1),_0x54d1b8);},Scene_Base[_0x2d27a4(0x208)][_0x2d27a4(0x260)]=function(){const _0x1851aa=_0x2d27a4;this[_0x1851aa(0x1e4)](![],!![]);},Scene_Base['prototype'][_0x2d27a4(0x173)]=function(_0x31e117){if(this['_saveConfirmWindow'])this['_saveConfirmWindow']['close']();},Scene_Base[_0x2d27a4(0x208)][_0x2d27a4(0x29c)]=function(){const _0x414240=_0x2d27a4;if(this['_autosaveConfirmWindow'])return;const _0x4e0fe9=this['autosaveConfirmationWindowRect']();this[_0x414240(0x1d8)]=new Window_AutosaveConfirm(_0x4e0fe9);},Scene_Base[_0x2d27a4(0x208)]['autosaveConfirmationWindowRect']=function(){const _0x3644fe=_0x2d27a4,_0x424007=this[_0x3644fe(0x296)](),_0x298cd1=this[_0x3644fe(0x217)](0x1,![]),_0x4b537d=Graphics[_0x3644fe(0x27c)]-_0x424007,_0x42540a=Graphics[_0x3644fe(0x1c0)]-_0x298cd1;return new Rectangle(_0x4b537d,_0x42540a,_0x424007,_0x298cd1);},Scene_Base[_0x2d27a4(0x208)][_0x2d27a4(0x19e)]=function(){const _0x25b308=_0x2d27a4;return VisuMZ[_0x25b308(0x1b3)][_0x25b308(0x201)]['AutosaveConfirm']['Enable'];},Scene_Base[_0x2d27a4(0x208)][_0x2d27a4(0x243)]=function(_0x1fad3b){const _0x400127=_0x2d27a4;if(!this[_0x400127(0x19e)]())return this[_0x400127(0x1d7)](_0x1fad3b);if(!this[_0x400127(0x1d8)])this[_0x400127(0x29c)]();const _0xcc53ec=this[_0x400127(0x1d8)];this[_0x400127(0x21f)](_0xcc53ec),this[_0x400127(0x233)](_0xcc53ec),_0xcc53ec[_0x400127(0x259)](_0x1fad3b),_0xcc53ec[_0x400127(0x180)]();const _0x10cc77=VisuMZ[_0x400127(0x1b3)][_0x400127(0x201)][_0x400127(0x1ed)][_0x400127(0x22e)];setTimeout(this[_0x400127(0x1d7)][_0x400127(0x204)](this,_0x1fad3b),_0x10cc77);},Scene_Base[_0x2d27a4(0x208)]['closeAutosaveConfirmationWindow']=function(_0x57b61b){const _0x399ab3=_0x2d27a4;if(this[_0x399ab3(0x1d8)])this[_0x399ab3(0x1d8)]['fadeOut']();},Scene_Base[_0x2d27a4(0x208)][_0x2d27a4(0x13a)]=function(){},VisuMZ[_0x2d27a4(0x1b3)]['Scene_Title_initialize']=Scene_Title[_0x2d27a4(0x208)]['initialize'],Scene_Title['prototype'][_0x2d27a4(0x275)]=function(){const _0x316a6b=_0x2d27a4;VisuMZ[_0x316a6b(0x1b3)][_0x316a6b(0x22d)][_0x316a6b(0x229)](this),this[_0x316a6b(0x1ca)]=![];},VisuMZ['SaveCore'][_0x2d27a4(0x187)]=Scene_Title[_0x2d27a4(0x208)][_0x2d27a4(0x280)],Scene_Title[_0x2d27a4(0x208)][_0x2d27a4(0x280)]=function(){const _0x22aaa1=_0x2d27a4;VisuMZ[_0x22aaa1(0x1b3)]['Scene_Title_terminate'][_0x22aaa1(0x229)](this);if(this['_loadSuccess'])$gameSystem[_0x22aaa1(0x179)]();},VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x240)]=Scene_Title['prototype'][_0x2d27a4(0x1fe)],Scene_Title[_0x2d27a4(0x208)][_0x2d27a4(0x1fe)]=function(){const _0x1e5d50=_0x2d27a4;StorageManager[_0x1e5d50(0x137)]()===_0x1e5d50(0x245)?this[_0x1e5d50(0x249)]():VisuMZ[_0x1e5d50(0x1b3)][_0x1e5d50(0x240)][_0x1e5d50(0x229)](this);},Scene_Title[_0x2d27a4(0x208)][_0x2d27a4(0x249)]=function(){const _0x4ba48c=_0x2d27a4;DataManager[_0x4ba48c(0x190)](),$gameTemp[_0x4ba48c(0x26e)]=!![],this['_commandWindow'][_0x4ba48c(0x186)](),SceneManager['push'](Scene_Save);},VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x20e)]=Scene_Title[_0x2d27a4(0x208)][_0x2d27a4(0x141)],Scene_Title[_0x2d27a4(0x208)]['commandContinue']=function(){const _0x5e7ce5=_0x2d27a4;StorageManager[_0x5e7ce5(0x137)]()===_0x5e7ce5(0x1a3)?this[_0x5e7ce5(0x1f7)]():VisuMZ[_0x5e7ce5(0x1b3)][_0x5e7ce5(0x20e)][_0x5e7ce5(0x229)](this);},Scene_Title[_0x2d27a4(0x208)][_0x2d27a4(0x1f7)]=function(){const _0x5bc4a3=_0x2d27a4;DataManager[_0x5bc4a3(0x1f3)](0x0)[_0x5bc4a3(0x150)](()=>this['onSaveCoreLoadSuccess']())['catch'](()=>this[_0x5bc4a3(0x1ba)]());},Scene_Title[_0x2d27a4(0x208)][_0x2d27a4(0x14b)]=function(){const _0x4733e6=_0x2d27a4;this[_0x4733e6(0x227)][_0x4733e6(0x186)](),SoundManager[_0x4733e6(0x288)](),this[_0x4733e6(0x14c)](),Scene_Load[_0x4733e6(0x208)][_0x4733e6(0x270)](),SceneManager[_0x4733e6(0x244)](Scene_Map),this[_0x4733e6(0x1ca)]=!![],VisuMZ[_0x4733e6(0x1b3)][_0x4733e6(0x201)]['Save']['OnLoadSuccessJS']['call'](this);},Scene_Title[_0x2d27a4(0x208)][_0x2d27a4(0x1ba)]=function(){const _0x1b62f4=_0x2d27a4;SoundManager['playBuzzer'](),VisuMZ[_0x1b62f4(0x1b3)][_0x1b62f4(0x201)][_0x1b62f4(0x21e)][_0x1b62f4(0x211)][_0x1b62f4(0x229)](this),this['loadFailureConfirmationWindow']();},Scene_Title[_0x2d27a4(0x208)][_0x2d27a4(0x173)]=function(_0x9e1ba1){const _0x5e1156=_0x2d27a4;Scene_Base['prototype'][_0x5e1156(0x173)][_0x5e1156(0x229)](this,_0x9e1ba1),this[_0x5e1156(0x227)][_0x5e1156(0x26c)](),this['_commandWindow'][_0x5e1156(0x27a)]();},VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x199)]=Scene_Map[_0x2d27a4(0x208)][_0x2d27a4(0x224)],Scene_Map[_0x2d27a4(0x208)][_0x2d27a4(0x224)]=function(){const _0x38b6bc=_0x2d27a4;VisuMZ[_0x38b6bc(0x1b3)][_0x38b6bc(0x199)][_0x38b6bc(0x229)](this);if(SceneManager[_0x38b6bc(0x14f)](Scene_Menu))this[_0x38b6bc(0x1d2)](_0x38b6bc(0x17d)),this[_0x38b6bc(0x1ce)]();else SceneManager[_0x38b6bc(0x14f)](Scene_Battle)&&(this['determineAutosaveBypass'](_0x38b6bc(0x146)),this[_0x38b6bc(0x1ce)]());},VisuMZ['SaveCore'][_0x2d27a4(0x18b)]=Scene_Map['prototype'][_0x2d27a4(0x189)],Scene_Map[_0x2d27a4(0x208)]['onTransferEnd']=function(){const _0x30fd59=_0x2d27a4;this[_0x30fd59(0x17f)]()&&this[_0x30fd59(0x1d2)](_0x30fd59(0x156)),VisuMZ[_0x30fd59(0x1b3)][_0x30fd59(0x18b)]['call'](this);},Scene_Map[_0x2d27a4(0x208)][_0x2d27a4(0x13a)]=function(){const _0xd8b9ac=_0x2d27a4;if($gameSystem[_0xd8b9ac(0x242)])return;const _0xe5ffb4=$gameSystem['savefileId']();if(StorageManager[_0xd8b9ac(0x137)]()!==_0xd8b9ac(0x1a3)&&_0xe5ffb4<=0x0)return;this[_0xd8b9ac(0x1cf)]=![],$gameSystem[_0xd8b9ac(0x28b)](_0xe5ffb4),$gameSystem['onBeforeSave'](),$gameSystem[_0xd8b9ac(0x242)]=!![],DataManager[_0xd8b9ac(0x1c4)](_0xe5ffb4)['then'](()=>this[_0xd8b9ac(0x23a)]())[_0xd8b9ac(0x1fb)](()=>this[_0xd8b9ac(0x261)]()),$gameSystem[_0xd8b9ac(0x242)]=undefined;},Scene_Map[_0x2d27a4(0x208)][_0x2d27a4(0x23a)]=function(){const _0x249840=_0x2d27a4;SoundManager['playSave'](),VisuMZ[_0x249840(0x1b3)][_0x249840(0x201)][_0x249840(0x21e)][_0x249840(0x1ad)][_0x249840(0x229)](this),this[_0x249840(0x1e4)](!![]);},Scene_Map[_0x2d27a4(0x208)][_0x2d27a4(0x261)]=function(){const _0x2a8f80=_0x2d27a4;SoundManager[_0x2a8f80(0x147)](),VisuMZ[_0x2a8f80(0x1b3)]['Settings'][_0x2a8f80(0x21e)][_0x2a8f80(0x1a6)][_0x2a8f80(0x229)](this),this['openSaveConfirmationWindow'](![]);},Scene_Map['prototype'][_0x2d27a4(0x173)]=function(_0x89b56e){const _0x1658f3=_0x2d27a4;Scene_Message[_0x1658f3(0x208)][_0x1658f3(0x173)][_0x1658f3(0x229)](this,_0x89b56e),this[_0x1658f3(0x1cf)]=!![];},VisuMZ['SaveCore'][_0x2d27a4(0x252)]=Scene_Menu[_0x2d27a4(0x208)][_0x2d27a4(0x235)],Scene_Menu['prototype'][_0x2d27a4(0x235)]=function(){const _0x4a3d37=_0x2d27a4;VisuMZ[_0x4a3d37(0x1b3)][_0x4a3d37(0x252)][_0x4a3d37(0x229)](this),SceneManager[_0x4a3d37(0x14f)](Scene_Map)&&(this[_0x4a3d37(0x1d2)](_0x4a3d37(0x1da)),this[_0x4a3d37(0x1ce)]());},VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x253)]=Scene_Menu[_0x2d27a4(0x208)][_0x2d27a4(0x16d)],Scene_Menu[_0x2d27a4(0x208)][_0x2d27a4(0x16d)]=function(){const _0x500652=_0x2d27a4,_0x4c642e=StorageManager[_0x500652(0x137)]();switch(_0x4c642e){case _0x500652(0x245):case _0x500652(0x1a3):this[_0x500652(0x128)]();break;default:VisuMZ[_0x500652(0x1b3)]['Scene_Menu_commandSave'][_0x500652(0x229)](this);break;}},Scene_Menu[_0x2d27a4(0x208)][_0x2d27a4(0x128)]=function(){const _0x5d5c80=_0x2d27a4,_0x298991=$gameSystem[_0x5d5c80(0x1ea)]();$gameSystem['setSavefileId'](_0x298991),$gameSystem[_0x5d5c80(0x29b)](),DataManager[_0x5d5c80(0x1c4)](_0x298991)[_0x5d5c80(0x150)](()=>this[_0x5d5c80(0x13e)]())[_0x5d5c80(0x1fb)](()=>this[_0x5d5c80(0x20b)]());},Scene_Menu[_0x2d27a4(0x208)][_0x2d27a4(0x13e)]=function(){const _0x8b0bdb=_0x2d27a4;SoundManager[_0x8b0bdb(0x1bc)](),VisuMZ['SaveCore']['Settings'][_0x8b0bdb(0x21e)][_0x8b0bdb(0x1ad)][_0x8b0bdb(0x229)](this),this[_0x8b0bdb(0x1e4)](!![]);},Scene_Menu[_0x2d27a4(0x208)][_0x2d27a4(0x20b)]=function(){const _0x2b6c91=_0x2d27a4;SoundManager[_0x2b6c91(0x147)](),VisuMZ[_0x2b6c91(0x1b3)][_0x2b6c91(0x201)][_0x2b6c91(0x21e)][_0x2b6c91(0x1a6)]['call'](this),this[_0x2b6c91(0x1e4)](![]);},Scene_Menu[_0x2d27a4(0x208)][_0x2d27a4(0x173)]=function(_0x2d71ce){const _0x27a6ec=_0x2d27a4;Scene_MenuBase[_0x27a6ec(0x208)][_0x27a6ec(0x173)][_0x27a6ec(0x229)](this,_0x2d71ce),this[_0x27a6ec(0x227)][_0x27a6ec(0x27a)]();},Scene_Battle[_0x2d27a4(0x208)][_0x2d27a4(0x1ce)]=function(){},VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x228)]=Scene_Options[_0x2d27a4(0x208)][_0x2d27a4(0x209)],Scene_Options['prototype'][_0x2d27a4(0x209)]=function(){const _0x4245f7=_0x2d27a4;let _0x559c42=VisuMZ[_0x4245f7(0x1b3)]['Scene_Options_maxCommands'][_0x4245f7(0x229)](this);const _0x33bf5a=VisuMZ['SaveCore']['Settings'];if(_0x33bf5a[_0x4245f7(0x143)][_0x4245f7(0x132)]&&_0x33bf5a[_0x4245f7(0x143)][_0x4245f7(0x1ae)])_0x559c42++;return _0x559c42;},Scene_Save[_0x2d27a4(0x208)][_0x2d27a4(0x23a)]=function(){const _0x494bf9=_0x2d27a4;SoundManager[_0x494bf9(0x1bc)](),VisuMZ[_0x494bf9(0x1b3)][_0x494bf9(0x201)][_0x494bf9(0x21e)][_0x494bf9(0x1ad)][_0x494bf9(0x229)](this),this[_0x494bf9(0x226)][_0x494bf9(0x145)](),this[_0x494bf9(0x1e4)](!![]);},VisuMZ['SaveCore'][_0x2d27a4(0x1d1)]=Scene_Save[_0x2d27a4(0x208)][_0x2d27a4(0x261)],Scene_Save[_0x2d27a4(0x208)][_0x2d27a4(0x261)]=function(){const _0x440fb9=_0x2d27a4;SoundManager[_0x440fb9(0x147)](),VisuMZ['SaveCore']['Settings'][_0x440fb9(0x21e)][_0x440fb9(0x1a6)][_0x440fb9(0x229)](this),this[_0x440fb9(0x1e4)](![]);},Scene_Save['prototype']['closeSaveConfirmationWindow']=function(_0x25b8d2){const _0x1ed943=_0x2d27a4;Scene_File[_0x1ed943(0x208)]['closeSaveConfirmationWindow'][_0x1ed943(0x229)](this,_0x25b8d2),_0x25b8d2?this['activateListWindow']():this['activateListWindow']();},Scene_Save[_0x2d27a4(0x208)][_0x2d27a4(0x271)]=function(){const _0x4e24ad=_0x2d27a4;$gameTemp['_pickLockedSaveSlot']=![],Scene_File['prototype'][_0x4e24ad(0x271)][_0x4e24ad(0x229)](this);},VisuMZ['SaveCore']['Scene_Save_helpWindowText']=Scene_Save[_0x2d27a4(0x208)][_0x2d27a4(0x247)],Scene_Save[_0x2d27a4(0x208)]['helpWindowText']=function(){const _0x2c3fda=_0x2d27a4;return $gameTemp[_0x2c3fda(0x26e)]?TextManager[_0x2c3fda(0x14e)]:VisuMZ[_0x2c3fda(0x1b3)][_0x2c3fda(0x165)][_0x2c3fda(0x229)](this);},VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x129)]=Scene_Save['prototype']['executeSave'],Scene_Save[_0x2d27a4(0x208)][_0x2d27a4(0x12e)]=function(_0x4a5de7){const _0x2ecbb3=_0x2d27a4;$gameTemp['_pickLockedSaveSlot']?this[_0x2ecbb3(0x1cc)](_0x4a5de7):VisuMZ['SaveCore'][_0x2ecbb3(0x129)][_0x2ecbb3(0x229)](this,_0x4a5de7);},Scene_Save['prototype'][_0x2d27a4(0x1cc)]=function(_0xbfcdf7){const _0x14c869=_0x2d27a4;$gameTemp[_0x14c869(0x26e)]=![],SoundManager[_0x14c869(0x288)](),$gameSystem[_0x14c869(0x28b)](_0xbfcdf7),this[_0x14c869(0x14c)](),SceneManager[_0x14c869(0x244)](Scene_Map);},VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x21a)]=Scene_Load[_0x2d27a4(0x208)][_0x2d27a4(0x213)],Scene_Load[_0x2d27a4(0x208)][_0x2d27a4(0x213)]=function(){const _0x248e11=_0x2d27a4;VisuMZ[_0x248e11(0x1b3)][_0x248e11(0x21a)][_0x248e11(0x229)](this),VisuMZ[_0x248e11(0x1b3)][_0x248e11(0x201)][_0x248e11(0x21e)][_0x248e11(0x295)][_0x248e11(0x229)](this),setTimeout(VisuMZ['SaveCore']['RemoveSaveCoreCache']['bind'](this),0x3e8);},Scene_Load[_0x2d27a4(0x208)]['onLoadFailure']=function(){const _0x3119a5=_0x2d27a4;SoundManager['playBuzzer'](),VisuMZ[_0x3119a5(0x1b3)][_0x3119a5(0x201)]['Save']['OnLoadFailureJS'][_0x3119a5(0x229)](this),this[_0x3119a5(0x260)]();},Scene_Load[_0x2d27a4(0x208)]['closeSaveConfirmationWindow']=function(_0x4f36c1){const _0x2ab936=_0x2d27a4;Scene_File[_0x2ab936(0x208)][_0x2ab936(0x173)]['call'](this,_0x4f36c1),this['activateListWindow']();},VisuMZ[_0x2d27a4(0x1b3)]['RemoveSaveCoreCache']=function(){const _0x2c625e=_0x2d27a4;$gameSystem[_0x2c625e(0x242)]=undefined;},ImageManager[_0x2d27a4(0x134)]=ImageManager[_0x2d27a4(0x134)]||0x9,ImageManager[_0x2d27a4(0x23d)]=ImageManager[_0x2d27a4(0x23d)]||0x6,Window_Base[_0x2d27a4(0x208)]['drawSvActor']=function(_0xed929c,_0x219bf0,_0xd728ea){const _0x364e01=_0x2d27a4,_0x2b44a7=ImageManager[_0x364e01(0x166)](_0xed929c),_0x43ec50=_0x2b44a7[_0x364e01(0x27c)]/ImageManager[_0x364e01(0x134)],_0x1bee8d=_0x2b44a7[_0x364e01(0x1c0)]/ImageManager['svActorVertCells'],_0x2a684a=0x0,_0x55a259=0x0;this[_0x364e01(0x289)][_0x364e01(0x23c)](_0x2b44a7,_0x2a684a,_0x55a259,_0x43ec50,_0x1bee8d,_0x219bf0-_0x43ec50/0x2,_0xd728ea-_0x1bee8d);},VisuMZ['SaveCore'][_0x2d27a4(0x138)]=Window_Options[_0x2d27a4(0x208)][_0x2d27a4(0x212)],Window_Options[_0x2d27a4(0x208)][_0x2d27a4(0x212)]=function(){const _0xb28686=_0x2d27a4;VisuMZ[_0xb28686(0x1b3)][_0xb28686(0x138)]['call'](this),this['addSaveCoreCommands']();},Window_Options['prototype'][_0x2d27a4(0x17e)]=function(){const _0x2089c6=_0x2d27a4;VisuMZ['SaveCore'][_0x2089c6(0x201)][_0x2089c6(0x143)]['AddOption']&&this[_0x2089c6(0x1b2)]();},Window_Options[_0x2d27a4(0x208)][_0x2d27a4(0x1b2)]=function(){const _0x3cfaba=_0x2d27a4,_0x1b119b=TextManager['autosaveOption'],_0x415c2e=_0x3cfaba(0x126);this[_0x3cfaba(0x26d)](_0x1b119b,_0x415c2e);};function Window_AutosaveConfirm(){this['initialize'](...arguments);}Window_AutosaveConfirm['prototype']=Object['create'](Window_Base[_0x2d27a4(0x208)]),Window_AutosaveConfirm[_0x2d27a4(0x208)][_0x2d27a4(0x24a)]=Window_AutosaveConfirm,Window_AutosaveConfirm['prototype'][_0x2d27a4(0x275)]=function(_0x1081bf){const _0x3979fd=_0x2d27a4;this[_0x3979fd(0x27d)]=0x0,Window_Base['prototype'][_0x3979fd(0x275)][_0x3979fd(0x229)](this,_0x1081bf),this[_0x3979fd(0x28c)]=0x0,this['contentsOpacity']=0x0;},Window_AutosaveConfirm['prototype'][_0x2d27a4(0x283)]=function(){const _0x8fd5f9=_0x2d27a4,_0x99902f=0x0,_0x34fa97=0x0,_0x28c8f7=this['innerWidth'],_0x1164b6=this[_0x8fd5f9(0x290)],_0x5480c9=ColorManager['dimColor1'](),_0x5c8c0a=ColorManager['dimColor2'](),_0x4d85c5=_0x28c8f7/0x2;this['contents'][_0x8fd5f9(0x1b9)](_0x99902f,_0x34fa97,_0x4d85c5,_0x1164b6,_0x5c8c0a,_0x5480c9),this[_0x8fd5f9(0x289)][_0x8fd5f9(0x1b9)](_0x99902f+_0x4d85c5,_0x34fa97,_0x4d85c5,_0x1164b6,_0x5480c9,_0x5c8c0a);},Window_AutosaveConfirm[_0x2d27a4(0x208)][_0x2d27a4(0x259)]=function(_0x494a6e){const _0x1fc640=_0x2d27a4;this[_0x1fc640(0x231)]=_0x494a6e,this[_0x1fc640(0x145)]();},Window_AutosaveConfirm['prototype'][_0x2d27a4(0x145)]=function(){const _0x560f08=_0x2d27a4;this[_0x560f08(0x289)][_0x560f08(0x1d6)]();const _0x3648ca=this['_success']?TextManager[_0x560f08(0x200)]:TextManager[_0x560f08(0x16c)],_0x1348fe=this['textSizeEx'](_0x3648ca)[_0x560f08(0x27c)];this['width']=_0x1348fe+($gameSystem['windowPadding']()+this['itemPadding']())*0x2,this[_0x560f08(0x298)](),this[_0x560f08(0x281)]();const _0x254c1b=(this[_0x560f08(0x26f)]-_0x1348fe)/0x2;this[_0x560f08(0x283)](),this[_0x560f08(0x1bd)](_0x3648ca,_0x254c1b,0x0,_0x1348fe);},Window_AutosaveConfirm[_0x2d27a4(0x208)][_0x2d27a4(0x22f)]=function(){const _0x554c91=_0x2d27a4;return VisuMZ['SaveCore']['Settings'][_0x554c91(0x15e)][_0x554c91(0x14a)];},Window_AutosaveConfirm[_0x2d27a4(0x208)][_0x2d27a4(0x298)]=function(){const _0x584afb=_0x2d27a4,_0x4380d0=this['getScreenPosition']();if(_0x4380d0[_0x584afb(0x25f)](/upper/i))this['y']=-0x1*$gameSystem['windowPadding']();else _0x4380d0[_0x584afb(0x25f)](/lower/i)?this['y']=Graphics[_0x584afb(0x1c0)]-this[_0x584afb(0x1c0)]+$gameSystem[_0x584afb(0x1db)]():this['y']=(Graphics[_0x584afb(0x1c0)]-this[_0x584afb(0x1c0)])/0x2;if(_0x4380d0[_0x584afb(0x25f)](/left/i))this['x']=-0x1*$gameSystem['windowPadding']();else _0x4380d0['match'](/right/i)?this['x']=Graphics[_0x584afb(0x27c)]-this[_0x584afb(0x27c)]+$gameSystem['windowPadding']():this['x']=(Graphics[_0x584afb(0x27c)]-this[_0x584afb(0x27c)])/0x2;},Window_AutosaveConfirm[_0x2d27a4(0x208)][_0x2d27a4(0x20c)]=function(){const _0x35dd6a=_0x2d27a4;Window_Base['prototype'][_0x35dd6a(0x20c)][_0x35dd6a(0x229)](this);if(this[_0x35dd6a(0x27d)]!==0x0)this[_0x35dd6a(0x1df)]();},Window_AutosaveConfirm[_0x2d27a4(0x208)][_0x2d27a4(0x1df)]=function(){const _0x494338=_0x2d27a4;this[_0x494338(0x1b0)]+=this['_fadeSpeed'];if(this[_0x494338(0x1b0)]>=0xff||this['contentsOpacity']<=0x0)this[_0x494338(0x1e8)](0x0);},Window_AutosaveConfirm['prototype'][_0x2d27a4(0x1e8)]=function(_0x1ab35e){this['_fadeSpeed']=_0x1ab35e;},Window_AutosaveConfirm[_0x2d27a4(0x208)][_0x2d27a4(0x180)]=function(){const _0x51ccda=_0x2d27a4;this[_0x51ccda(0x1e8)](0x10);},Window_AutosaveConfirm['prototype'][_0x2d27a4(0x2a4)]=function(){const _0x5b77d8=_0x2d27a4;this[_0x5b77d8(0x1e8)](-0x10);},VisuMZ[_0x2d27a4(0x1b3)]['Window_SavefileList_setMode']=Window_SavefileList['prototype'][_0x2d27a4(0x1ee)],Window_SavefileList[_0x2d27a4(0x208)][_0x2d27a4(0x1ee)]=function(_0x5827a5,_0x17763c){const _0x310e64=_0x2d27a4;if(StorageManager[_0x310e64(0x277)]()==='current')_0x17763c=![];if($gameTemp[_0x310e64(0x26e)])_0x17763c=![];VisuMZ[_0x310e64(0x1b3)][_0x310e64(0x197)][_0x310e64(0x229)](this,_0x5827a5,_0x17763c);},Window_SavefileList[_0x2d27a4(0x208)][_0x2d27a4(0x171)]=function(){const _0x38c8fb=_0x2d27a4,_0x18b28e=VisuMZ[_0x38c8fb(0x1b3)][_0x38c8fb(0x201)][_0x38c8fb(0x1d3)],_0x384ff1=this[_0x38c8fb(0x16a)]();switch(_0x384ff1){case _0x38c8fb(0x214):return _0x18b28e['VertRows'];break;case _0x38c8fb(0x28a):return _0x18b28e['BoxRows'];break;case'large':return _0x18b28e[_0x38c8fb(0x1a2)];break;default:return _0x18b28e[_0x38c8fb(0x17b)];break;}},Window_SavefileList[_0x2d27a4(0x208)][_0x2d27a4(0x14d)]=function(){const _0x3f2c6c=_0x2d27a4,_0x8982bd=VisuMZ['SaveCore'][_0x3f2c6c(0x201)]['SaveMenu'],_0x48934a=this[_0x3f2c6c(0x16a)]();switch(_0x48934a){case _0x3f2c6c(0x214):return _0x8982bd[_0x3f2c6c(0x1e1)];break;case _0x3f2c6c(0x28a):return _0x8982bd[_0x3f2c6c(0x25d)];break;case _0x3f2c6c(0x28e):return _0x8982bd[_0x3f2c6c(0x24b)];break;default:return _0x8982bd[_0x3f2c6c(0x29e)];break;}},Window_SavefileList[_0x2d27a4(0x208)]['resetWordWrap']=function(){const _0x378e05=_0x2d27a4;Imported[_0x378e05(0x174)]&&Window_Selectable[_0x378e05(0x208)][_0x378e05(0x1e2)][_0x378e05(0x229)](this);},Window_SavefileList[_0x2d27a4(0x208)][_0x2d27a4(0x29d)]=function(_0x2f0271){const _0x16c4bf=_0x2d27a4;return Imported[_0x16c4bf(0x174)]?Window_Selectable[_0x16c4bf(0x208)]['setWordWrap'][_0x16c4bf(0x229)](this,_0x2f0271):'';},Window_SavefileList[_0x2d27a4(0x208)]['actorStyle']=function(){const _0x122c6a=_0x2d27a4;return VisuMZ[_0x122c6a(0x1b3)][_0x122c6a(0x201)][_0x122c6a(0x19d)];},Window_SavefileList[_0x2d27a4(0x208)][_0x2d27a4(0x16a)]=function(){const _0x40fa2d=_0x2d27a4;return VisuMZ[_0x40fa2d(0x1b3)][_0x40fa2d(0x201)][_0x40fa2d(0x1bf)];},Window_SavefileList[_0x2d27a4(0x208)]['selectSavefile']=function(_0x2b0552){const _0x15107b=_0x2d27a4,_0x264831=Math[_0x15107b(0x1fc)](0x0,this['savefileIdToIndex'](_0x2b0552));this[_0x15107b(0x162)](_0x264831);},Window_SavefileList[_0x2d27a4(0x208)][_0x2d27a4(0x18f)]=function(_0x35e714){const _0xf29ecd=_0x2d27a4,_0x1049c2=this[_0xf29ecd(0x24f)](_0x35e714),_0x4f6b5f=DataManager[_0xf29ecd(0x27f)](_0x1049c2);if(_0x4f6b5f)_0x4f6b5f[_0xf29ecd(0x1ea)]=_0x1049c2;this[_0xf29ecd(0x274)]=_0x1049c2;const _0x439258=this['itemRect'](_0x35e714);this[_0xf29ecd(0x1ac)](),this[_0xf29ecd(0x273)](this[_0xf29ecd(0x127)](_0x1049c2)),this[_0xf29ecd(0x19f)](_0x4f6b5f,_0x439258);},Window_SavefileList[_0x2d27a4(0x208)][_0x2d27a4(0x294)]=function(_0x56e6d0,_0x5c81ba,_0x17c626){const _0xcb89f9=_0x2d27a4;_0x56e6d0===0x0?this[_0xcb89f9(0x286)](TextManager[_0xcb89f9(0x126)],_0x5c81ba,_0x17c626,0xb4):this[_0xcb89f9(0x286)](TextManager['file']+'\x20'+_0x56e6d0,_0x5c81ba,_0x17c626,0xb4);},Window_SavefileList[_0x2d27a4(0x208)]['drawLatestMarker']=function(_0x5ed5fe,_0x3533b7,_0x5e7d6d){const _0x2cc5fc=_0x2d27a4;if(_0x5ed5fe===0x0||DataManager[_0x2cc5fc(0x17c)]()!==_0x5ed5fe)return;const _0x5d7805=TextManager[_0x2cc5fc(0x1bb)];this[_0x2cc5fc(0x220)](ColorManager[_0x2cc5fc(0x218)]()),this[_0x2cc5fc(0x286)](_0x5d7805,_0x3533b7,_0x5e7d6d,0xb4);},Window_SavefileList[_0x2d27a4(0x208)]['drawActors']=function(_0x42080b,_0xd27423,_0x48cd98,_0x219711,_0x2d9961){const _0x2ea164=_0x2d27a4;if(!_0x42080b[_0x2ea164(0x256)])return;const _0x3b7776=this[_0x2ea164(0x207)]();switch(_0x3b7776){case'face':this['drawActorFaces'](_0x42080b,_0xd27423,_0x48cd98,_0x219711,_0x2d9961);break;case _0x2ea164(0x1aa):this[_0x2ea164(0x154)](_0x42080b,_0xd27423,_0x48cd98,_0x219711,_0x2d9961);break;case _0x2ea164(0x17a):this[_0x2ea164(0x1de)](_0x42080b,_0xd27423,_0x48cd98,_0x219711,_0x2d9961);break;default:break;}},Window_SavefileList['prototype'][_0x2d27a4(0x2a2)]=function(_0x224e2c,_0x5a3a78,_0x1c3387,_0x2fd405,_0x676e7e){const _0x2133bb=_0x2d27a4,_0x4304a4=Math[_0x2133bb(0x18e)](_0x224e2c['faces'][_0x2133bb(0x232)],$gameParty[_0x2133bb(0x1f8)]()),_0x8f7265=Math[_0x2133bb(0x18e)](ImageManager[_0x2133bb(0x13d)],Math[_0x2133bb(0x1f1)](_0x2fd405/_0x4304a4));_0x5a3a78=_0x5a3a78+Math[_0x2133bb(0x2a1)]((_0x2fd405-_0x4304a4*_0x8f7265)/0x2);for(const _0x324b36 of _0x224e2c['faces']){this[_0x2133bb(0x167)](_0x324b36[0x0],_0x324b36[0x1],_0x5a3a78,_0x1c3387+0x1,_0x8f7265,_0x676e7e-0x2),_0x5a3a78+=_0x8f7265;}},ImageManager['saveMenuSpriteWidth']=VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x201)][_0x2d27a4(0x1d3)][_0x2d27a4(0x241)],ImageManager['saveMenuSvBattlerWidth']=VisuMZ[_0x2d27a4(0x1b3)][_0x2d27a4(0x201)][_0x2d27a4(0x1d3)][_0x2d27a4(0x282)],Window_SavefileList['prototype'][_0x2d27a4(0x154)]=function(_0x7ac12,_0x5b70fd,_0xd6497a,_0x4be7b3,_0x175b8f){const _0x4f3eca=_0x2d27a4,_0x30798c=Math[_0x4f3eca(0x18e)](_0x7ac12[_0x4f3eca(0x256)][_0x4f3eca(0x232)],$gameParty['maxBattleMembers']()),_0x37f996=ImageManager[_0x4f3eca(0x1be)];_0x5b70fd=_0x5b70fd+Math[_0x4f3eca(0x2a1)]((_0x4be7b3-_0x30798c*_0x37f996)/0x2)+_0x37f996/0x2,_0xd6497a=_0xd6497a+_0x175b8f-0x8;for(const _0x530c2b of _0x7ac12[_0x4f3eca(0x256)]){this[_0x4f3eca(0x16e)](_0x530c2b[0x0],_0x530c2b[0x1],_0x5b70fd,_0xd6497a),_0x5b70fd+=_0x37f996;}},Window_SavefileList[_0x2d27a4(0x208)]['drawSvBattlerSprites']=function(_0x44f690,_0x5e11c3,_0x5d953d,_0x46e258,_0x670533){const _0x593156=_0x2d27a4;if(!_0x44f690[_0x593156(0x266)])return this['drawActorSprites'](_0x44f690,_0x5e11c3,_0x5d953d,_0x46e258,_0x670533);const _0x49cbd6=Math[_0x593156(0x18e)](_0x44f690[_0x593156(0x266)][_0x593156(0x232)],$gameParty[_0x593156(0x1f8)]()),_0x4f3b72=ImageManager[_0x593156(0x15c)];_0x5e11c3=_0x5e11c3+Math[_0x593156(0x2a1)]((_0x46e258-_0x49cbd6*_0x4f3b72)/0x2)+_0x4f3b72/0x2,_0x5d953d=_0x5d953d+_0x670533-0x8;for(const _0x5e2d0a of _0x44f690['svbattlers']){this['drawSvActor'](_0x5e2d0a,_0x5e11c3,_0x5d953d),_0x5e11c3+=_0x4f3b72;}},Window_SavefileList['prototype'][_0x2d27a4(0x205)]=function(_0x80d106,_0xf10d5f,_0x11f8a3,_0x13d4fa,_0x52c689,_0x4cace0){const _0x1ae5a8=_0x2d27a4;if(_0x80d106==='')return;_0xf10d5f+=0x2,_0x11f8a3+=0x2,_0x13d4fa-=0x4,_0x52c689-=0x4;const _0x46ea03=ImageManager[_0x1ae5a8(0x1f5)](_0x80d106),_0x1367db=_0x46ea03['width'],_0x42bebd=_0x46ea03[_0x1ae5a8(0x1c0)],_0x2a0581=Math[_0x1ae5a8(0x18e)](_0x13d4fa/_0x1367db,_0x52c689/_0x42bebd,_0x4cace0?0x1:0x3e8),_0x25f8a7=Math['ceil'](_0x46ea03[_0x1ae5a8(0x27c)]*_0x2a0581),_0x1439f8=Math[_0x1ae5a8(0x148)](_0x46ea03[_0x1ae5a8(0x1c0)]*_0x2a0581);this['contentsBack'][_0x1ae5a8(0x23c)](_0x46ea03,0x0,0x0,_0x1367db,_0x42bebd,_0xf10d5f,_0x11f8a3,_0x25f8a7,_0x1439f8);},Window_SavefileList['prototype']['drawCenteredPicture']=function(_0x30b080,_0x4aa791,_0x117ad6,_0x185281,_0x14d956,_0x8f1e66){const _0x351fb2=_0x2d27a4;if(_0x30b080==='')return;_0x4aa791+=0x2,_0x117ad6+=0x2,_0x185281-=0x4,_0x14d956-=0x4;const _0x3505aa=ImageManager[_0x351fb2(0x1f5)](_0x30b080),_0x394b60=_0x3505aa[_0x351fb2(0x27c)],_0x210067=_0x3505aa[_0x351fb2(0x1c0)],_0x27c26f=Math['min'](_0x185281/_0x394b60,_0x14d956/_0x210067,_0x8f1e66?0x1:0x3e8),_0x1eda3e=Math['ceil'](_0x3505aa['width']*_0x27c26f),_0x316979=Math['ceil'](_0x3505aa['height']*_0x27c26f);_0x4aa791+=(_0x185281-_0x1eda3e)/0x2,_0x117ad6+=(_0x14d956-_0x316979)/0x2,this[_0x351fb2(0x278)]['blt'](_0x3505aa,0x0,0x0,_0x394b60,_0x210067,_0x4aa791,_0x117ad6,_0x1eda3e,_0x316979);},Window_SavefileList[_0x2d27a4(0x208)]['drawPlaytime']=function(_0x3f3c04,_0x1e496f,_0x9cd7fb,_0x4e72b8,_0x40b395){const _0x574e9b=_0x2d27a4;_0x3f3c04[_0x574e9b(0x267)]&&(_0x40b395=_0x40b395||_0x574e9b(0x1f0),this['drawText'](_0x3f3c04[_0x574e9b(0x267)],_0x1e496f,_0x9cd7fb,_0x4e72b8,_0x40b395));},Window_SavefileList[_0x2d27a4(0x208)][_0x2d27a4(0x172)]=function(_0x8ec43b,_0x335918,_0x45b40d,_0x391ef5,_0x48f082){const _0x25ba69=_0x2d27a4;if(_0x8ec43b[_0x25ba69(0x202)]){_0x48f082=_0x48f082||_0x25ba69(0x1f0);const _0x4a1d30=this[_0x25ba69(0x135)](_0x8ec43b);this[_0x25ba69(0x286)](_0x4a1d30,_0x335918,_0x45b40d,_0x391ef5,_0x48f082);}},Window_SavefileList[_0x2d27a4(0x208)]['getTimestamp']=function(_0x5f59db){const _0x4955a5=_0x2d27a4,_0x5e29f9=_0x5f59db[_0x4955a5(0x202)],_0x5f5f98=new Date(_0x5e29f9);let _0x3891f4=_0x4955a5(0x1e5);_0x3891f4=_0x3891f4[_0x4955a5(0x1ab)](/\[YEAR\]/gi,'%1'),_0x3891f4=_0x3891f4[_0x4955a5(0x1ab)](/\[MONTH\]/gi,'%2'),_0x3891f4=_0x3891f4['replace'](/\[DATE\]/gi,'%3'),_0x3891f4=_0x3891f4[_0x4955a5(0x1ab)](/\[HOUR\]/gi,'%4'),_0x3891f4=_0x3891f4['replace'](/\[MINUTE\]/gi,'%5'),_0x3891f4=_0x3891f4['replace'](/\[SECOND\]/gi,'%6');let _0x5ea8ff=String(_0x5f5f98[_0x4955a5(0x1e9)]())[_0x4955a5(0x16b)]('')[_0x4955a5(0x1f4)]('​');return _0x3891f4['format'](_0x5ea8ff['padStart'](0x4,'0'),String(_0x5f5f98[_0x4955a5(0x1f6)]()+0x1)[_0x4955a5(0x22b)](0x2,'0'),String(_0x5f5f98[_0x4955a5(0x158)]())[_0x4955a5(0x22b)](0x2,'0'),String(_0x5f5f98[_0x4955a5(0x18a)]())[_0x4955a5(0x22b)](0x2,'0'),String(_0x5f5f98['getMinutes']())[_0x4955a5(0x22b)](0x2,'0'),String(_0x5f5f98['getSeconds']())[_0x4955a5(0x22b)](0x2,'0'));},Window_SavefileList[_0x2d27a4(0x208)][_0x2d27a4(0x225)]=function(_0x4c2e55,_0x200836,_0x53daff,_0x383e3e){const _0x10b2b4=_0x2d27a4;if(_0x4c2e55[_0x10b2b4(0x1eb)]===undefined)return;const _0x5128a0=_0x4c2e55['gold'],_0x15674f=TextManager[_0x10b2b4(0x1d0)];Window_SavefileList[_0x10b2b4(0x208)]['drawCurrencyValue'][_0x10b2b4(0x229)](this,_0x5128a0,_0x15674f,_0x200836,_0x53daff,_0x383e3e);},Window_SavefileList['prototype']['drawDescription']=function(_0x41825f,_0x179404,_0x5c372e,_0x430e58,_0x3fa9c3){const _0x3d2d67=_0x2d27a4;if(_0x41825f['description']){const _0x5bc9a4=this[_0x3d2d67(0x1a7)](_0x41825f[_0x3d2d67(0x299)])['width'];_0x3fa9c3=_0x3fa9c3||'left';if(_0x3fa9c3===_0x3d2d67(0x20f))_0x179404=_0x179404+_0x430e58-_0x5bc9a4;else _0x3fa9c3===_0x3d2d67(0x140)&&(_0x179404=_0x179404+(_0x430e58-_0x5bc9a4)/0x2);this[_0x3d2d67(0x1bd)](_0x41825f[_0x3d2d67(0x299)],_0x179404,_0x5c372e,_0x430e58);}},Window_SavefileList[_0x2d27a4(0x208)]['drawContents']=function(_0x1bfde9,_0xccdd8d){const _0x525eb4=_0x2d27a4;if(_0x1bfde9){const _0x395402=ImageManager[_0x525eb4(0x1f5)](_0x1bfde9[_0x525eb4(0x210)]||'');_0x395402['addLoadListener'](this['drawContentsLoaded'][_0x525eb4(0x204)](this,_0x1bfde9,_0xccdd8d));}else this['drawFileData'](this[_0x525eb4(0x274)],_0xccdd8d);},Window_SavefileList[_0x2d27a4(0x208)]['drawContentsLoaded']=function(_0x1feef0,_0x366cd6){const _0x54818d=_0x2d27a4,_0x28bffc=this[_0x54818d(0x16a)]();switch(_0x28bffc){case _0x54818d(0x214):this[_0x54818d(0x13c)](_0x1feef0,_0x366cd6);break;case _0x54818d(0x28a):this[_0x54818d(0x1fd)](_0x1feef0,_0x366cd6);break;case _0x54818d(0x28e):this[_0x54818d(0x21b)](_0x1feef0,_0x366cd6);break;default:this[_0x54818d(0x1dd)](_0x1feef0,_0x366cd6);break;}this[_0x54818d(0x1ac)]();const _0x5000c0=_0x1feef0[_0x54818d(0x1ea)];this[_0x54818d(0x1c6)](_0x5000c0,_0x366cd6);},Window_SavefileList[_0x2d27a4(0x208)][_0x2d27a4(0x1c6)]=function(_0x5b9d7d,_0x265b8b){const _0x3f6bc1=_0x2d27a4,_0x1404ee=this['menuStyle']();switch(_0x1404ee){case _0x3f6bc1(0x214):this[_0x3f6bc1(0x1cd)](_0x5b9d7d,_0x265b8b);break;case _0x3f6bc1(0x28a):this[_0x3f6bc1(0x152)](_0x5b9d7d,_0x265b8b);break;case _0x3f6bc1(0x28e):this['drawLargeStyleFileData'](_0x5b9d7d,_0x265b8b);break;default:this['drawListStyleFileData'](_0x5b9d7d,_0x265b8b);break;}},Window_SavefileList[_0x2d27a4(0x208)]['drawListStyleContents']=function(_0xfa4f9a,_0x5c39b4){const _0xac9924=_0x2d27a4;VisuMZ[_0xac9924(0x1b3)][_0xac9924(0x201)][_0xac9924(0x1d3)][_0xac9924(0x291)]['call'](this,_0xfa4f9a,_0x5c39b4);},Window_SavefileList[_0x2d27a4(0x208)][_0x2d27a4(0x13c)]=function(_0x159ef2,_0x27280d){const _0x10b36d=_0x2d27a4;VisuMZ[_0x10b36d(0x1b3)][_0x10b36d(0x201)][_0x10b36d(0x1d3)][_0x10b36d(0x1fa)][_0x10b36d(0x229)](this,_0x159ef2,_0x27280d);},Window_SavefileList['prototype'][_0x2d27a4(0x1fd)]=function(_0x4b7baf,_0x532475){const _0x1be643=_0x2d27a4;VisuMZ[_0x1be643(0x1b3)][_0x1be643(0x201)][_0x1be643(0x1d3)]['BoxContentsJS'][_0x1be643(0x229)](this,_0x4b7baf,_0x532475);},Window_SavefileList[_0x2d27a4(0x208)][_0x2d27a4(0x21b)]=function(_0x2ed34e,_0x332961){const _0x138698=_0x2d27a4;VisuMZ[_0x138698(0x1b3)]['Settings'][_0x138698(0x1d3)]['LargeContentsJS'][_0x138698(0x229)](this,_0x2ed34e,_0x332961);},Window_SavefileList[_0x2d27a4(0x208)]['drawListStyleFileData']=function(_0x249520,_0x53e6b2){const _0x59d1a5=_0x2d27a4;VisuMZ['SaveCore'][_0x59d1a5(0x201)][_0x59d1a5(0x1d3)][_0x59d1a5(0x1c1)]['call'](this,_0x249520,_0x53e6b2);},Window_SavefileList[_0x2d27a4(0x208)][_0x2d27a4(0x1cd)]=function(_0x507bd3,_0x5ae4a9){const _0x4c4c73=_0x2d27a4;VisuMZ[_0x4c4c73(0x1b3)][_0x4c4c73(0x201)][_0x4c4c73(0x1d3)][_0x4c4c73(0x2a3)][_0x4c4c73(0x229)](this,_0x507bd3,_0x5ae4a9);},Window_SavefileList[_0x2d27a4(0x208)][_0x2d27a4(0x152)]=function(_0x2806ab,_0x3511e1){const _0x25bfdb=_0x2d27a4;VisuMZ[_0x25bfdb(0x1b3)][_0x25bfdb(0x201)]['SaveMenu'][_0x25bfdb(0x284)][_0x25bfdb(0x229)](this,_0x2806ab,_0x3511e1);},Window_SavefileList[_0x2d27a4(0x208)][_0x2d27a4(0x13f)]=function(_0x1d3955,_0x300251){const _0x2b4d54=_0x2d27a4;VisuMZ[_0x2b4d54(0x1b3)][_0x2b4d54(0x201)][_0x2b4d54(0x1d3)]['LargeFileDataJS'][_0x2b4d54(0x229)](this,_0x1d3955,_0x300251);};