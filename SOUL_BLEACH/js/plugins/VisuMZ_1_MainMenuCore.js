//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.10] [MainMenuCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Main Menu Core plugin is designed to give you more control over the Main
 * Menu outside of RPG Maker MZ's editor's control. Game devs are given control
 * over how commands work, visual aesthetics pertaining to the Main Menu, and 
 * assign menu images to actors as background portraits.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general Main Menu settings.
 * * The ability to set Menu Background Portraits for individual actors.
 * * Flexibility in changing which commands appear in the Main Menu.
 * * Add new windows like the Playtime Window and Variable windows.
 * * Change the style of how the windows are arranged in the Main Menu.
 * * Change the way the status list is displayed and the way it's displayed.
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * <Menu Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Sets the menu image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 *
 * ---
 * 
 * <Menu Portrait Offset: +x, +y>
 * <Menu Portrait Offset: -x, -y>
 * 
 * <Menu Portrait Offset X: +x>
 * <Menu Portrait Offset X: -x>
 * 
 * <Menu Portrait Offset Y: +y>
 * <Menu Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Offsets the X and Y coordinates for the menu image.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * - This only applies to the Main Menu portraits.
 * 
 * ---
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Menu Image (Group)
 * Actor: Change Menu Image (Range)
 * Actor: Change Menu Image (JS)
 * - Changes the actor's Menu Image.
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Step 1: Actor:
 *   - Select which ID(s) to affect.
 *
 *     Single:
 *     - Select which specific ID to affect.
 *
 *     Variable Reference:
 *     - Which variable is used to determine which ID to affect?
 *
 *     Range Start:
 *     - Select where the ID range begins.
 *
 *     Range End:
 *     - Select where the ID range ends.
 *
 *     Group:
 *     - Select which group of ID(s) to affect.
 *
 *     JavaScript:
 *     - JavaScript code to return an array on which ID(s) to affect.
 *
 *   Step 2: Target:
 *   - Select operation on what to change the switch(es) to.
 *   - Depending on what you pick here, one of the following actions are used
 *     in combination with the ID's picked from Step 1.
 *
 *     Filename:
 *     - Selected actor(s) will have their menu images changed to this.
 *
 *     Variable Reference:
 *     - Select the variable used to determine filename used for the selected
 *       actor(s).
 *
 *     JavaScript:
 *     - JavaScript code to determine what filename is used for the selected
 *       actor(s).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These general settings contain various settings on how the Main Menu scene
 * displays certain windows, alters how specific windows behave, and determines
 * which scenes would display actor menu images as background portraits.
 *
 * ---
 *
 * Gold Window
 * 
 *   Thinner Gold Window:
 *   - Make the Gold Window thinner in the Main Menu?
 *   - Used to match the Playtime and Variable Windows.
 * 
 *   Auto Adjust Height:
 *   - Automatically adjust the height for the thinner Gold Window?
 *
 *   Auto Adjust Y:
 *   - Automatically adjust the Y position for the thinner Gold Window?
 *
 * ---
 * 
 * Status Window
 * 
 *   Select Last?:
 *   - When picking a personal command from the Command Window, select the
 *     last picked actor or always the first?
 * 
 * ---
 *
 * Solo Party
 *
 *   Solo Quick Mode:
 *   - When selecting "Skills", "Equip", or "Status" with one party member,
 *     immediately go to the scene.
 *
 * ---
 *
 * Sub Menus
 *
 *   Menus with Actor BG's:
 *   - A list of the menus that would be compatible with Actor Menu Backgrounds
 *
 *   JS: Actor BG Action:
 *   - Code used to determine how to display the sprites upon loading.
 *
 * ---
 * 
 * Party Window
 * 
 *   Show Reserve Memebers:
 *   - Show reserve members while on the Main Menu scene?
 * 
 *   Hide Main Menu Only
 *   - If reserve members are hidden, hide them only in the main menu or
 *     all scenes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window List
 * ============================================================================
 *
 * The Command Window functions as a hub to the various scenes linked from the
 * Main Menu. These include 'Item', 'Skill', 'Equip', 'Status', 'Save', and
 * so on. This Plugin Parameter is an array that lets you add, remove, and/or
 * alter the Command Window's various commands, how they're handled, whether or
 * not they're visible, and how they react when selected.
 *
 * These will require knowledge of JavaScript to use them properly.
 *
 * ---
 *
 * Command Window List
 * 
 *   Symbol:
 *   - The symbol used for this command.
 *
 *   Icon:
 *   - Icon used for this command.
 *   - Use 0 for no icon.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 *   JS: Personal Code:
 *   - JavaScript code that runs once the actor list is selected with this
 *     command highlighted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Playtime Window
 * ============================================================================
 *
 * The Playtime Window is an optional feature that can be displayed in the
 * Main Menu. As its name suggests, it displays the playtime of the player's
 * current play through.
 *
 * ---
 *
 * Playtime Window
 * 
 *   Enable:
 *   - Use the Playtime Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Playtime Window?
 *
 *   Background Type:
 *   - Select background type for the Playtime window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Playtime window.
 * 
 *   Time Icon:
 *   - Icon displayed for the 'Time' label.
 * 
 *   Time Text:
 *   - Text for the display of 'Time' in the Playtime window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Playtime window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Variable Window
 * ============================================================================
 *
 * The Variable Window is an optional feature that can be displayed in the
 * Main Menu. If enabled, the Variable Window will display variables of the
 * game dev's choice in the Main Menu itself.
 *
 * ---
 *
 * Variable Window
 * 
 *   Enable:
 *   - Use the Variable Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Variable Window?
 *
 *   Background Type:
 *   - Select background type for the Variable window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Variable window.
 * 
 *   Variable List:
 *   - Select variables to be displayed into the window.
 *     Use \i[x] to determine their icon.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Variable window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window Style & Command Style Settings
 * ============================================================================
 *
 * This determines how the Main Menu appears based on the Command Window Style.
 * If anything but the 'Default' is used, then these settings will take over
 * the window placement settings for the Main Menu. This means that even if you
 * are using VisuStella's Core Engine, the window layouts will be overwritten.
 *
 * ---
 *
 * Command Window Style:
 * - Choose the positioning and style of the Main Menu Command Window.
 * - This will automatically rearrange windows.
 * 
 *   Default Vertical Side Style:
 *   - The default Main Menu layout style.
 *   - Affected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Top Horizontal Style:
 *   - Puts the Command Window at the top of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 *   Bottom Horizontal Style:
 *   - Puts the Command Window at the bottom of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the top.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Mobile Full Screen Style:
 *   - Puts the Command Window at the center of the screen with larger buttons.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is hidden until prompted to be selected.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 * ---
 *
 * Command Style Settings
 *
 *   Style:
 *   - How do you wish to draw command entries in the Command Window?
 *   - Text Only: displays only text.
 *   - Icon Only: displays only the icon.
 *   - Icon + Text: displays icon first, then text.
 *   - Automatic: determines the best fit for the size
 *
 *   Text Alignment:
 *   - Decide how you want the text to be aligned.
 *   - Left, Center, or Right
 * 
 *   Rows:
 *   - Number of visible rows.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Mobile Thickness:
 *   - The thickness of the buttons for mobile version.
 *   - Applies only to Top, Bottom, and Mobile styles.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Graphic, Status List Style, & List Style Settings
 * ============================================================================
 *
 * Choose how the contents Actor Status List Window in the Main Menu appears.
 * This can range from the which actor graphic is drawn to the style used for
 * the data that's displayed.
 *
 * ---
 *
 * Status Graphic:
 * - Choose how the graphic for actor graphics appear in status-like menus.
 * 
 *   None:
 *   - Don't display any graphic for the actors.
 * 
 *   Face:
 *   - Display the actors' faces. This is the default option in RPG Maker MZ.
 *
 *   Map Sprite:
 *   - Display the actors' map sprites.
 * 
 *   Sideview Battler:
 *   - Display the actors' sideview battlers.
 *
 * ---
 *
 * Main Menu List Style
 * - Choose how the actor status list looks in the Main Menu.
 *
 * Inner-Menu List Style
 * - Choose how the actor status list looks in the inner menus like Scene_Item,
 *   Scene_Skill, etc.
 *
 *   Default Horizontal Style:
 *   - This is the default style found in RPG Maker MZ's Main Menu.
 *
 *   Vertical Style:
 *   - Makes the display for the actor list vertical instead of horizontal.
 *
 *   Portrait Style:
 *   - Similar to the vertical style, except each actor's Menu Image is
 *     displayed in the background instead. Portraits are required.
 *   - If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 *
 *   Solo Style:
 *   - Used for solo party member games. Extends the whole view of the Status
 *     Window to accomodate a single actor.
 *
 *   Thin Horizontal Style:
 *   - Makes the selectable menu entries for the actors a single line thin.
 *
 *   Thicker Horizontal Style:
 *   - Makes the selectable menu entries for the actors two lines thick.
 *
 * ---
 *
 * List Styles
 *   JavaScript code used to determine how the individual styles are drawn.
 *
 *   JS: Default:
 *   JS: Vertical:
 *   JS: Portrait:
 *   JS: Solo:
 *   JS: Thin:
 *   JS: Thicker:
 *   - Code used to draw the data for these styles.
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
 * Version 1.10: April 16, 2021
 * * Feature Update!
 * ** Default style for List Styles now have its code updated with the
 *    JS: Default plugin parameter for games whose vertical screen resolution
 *    is larger than normal.
 * *** To update this, do either of the following:
 * **** Open up the Main Menu Core Plugin Parameters. Select and press delete 
 *      on "List Style Settings". Press Enter. New updated settings will be
 *      replaced for the JS: Default settings.
 * **** Or Delete the existing VisuMZ_1_MainMenuCore.js in the Plugin Manager
 *      list and install the newest version.
 * 
 * Version 1.09: March 19, 2021
 * * Documentation Update!
 * ** Added clarity for the "Portrait Style" in Plugin Parameters section for
 *    "Status Graphic, Status List Style, & List Style Settings":
 * *** If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 * 
 * Version 1.08: February 26, 2021
 * * Feature Update!
 * ** Default Plugin Parameters for the List Style Settings defaults have been
 *    updated with tighter coordinate values to allow for more accurate display
 *    of UI element positioning. Update made by Olivia.
 * 
 * Version 1.07: January 1, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Removed "<Menu Image: filename>" version of notetag to reduce confusion
 *    and to stick with the norm declared by the Battle Core.
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Menu Portrait Offset: +x, +y>
 * *** <Menu Portrait Offset X: +x>
 * *** <Menu Portrait Offset Y: +y>
 * **** This is used with the "Portrait" style Main Menu list.
 * **** Offsets the X and Y coordinates for the menu portrait.
 * 
 * Version 1.06: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** Documentation added for the new plugin parameter.
 * * New Features!
 * ** New plugin parameter added by Yanfly.
 * *** Plugin Parameters > General > Status Window > Select Last?
 * **** When picking a personal command from the Command Window, select the
 *      last picked actor or always the first?
 * 
 * Version 1.04: October 4, 2020
 * * Feature Update!
 * ** Certain windows will now pre-load all associated image types for the
 *    actor upon being created to avoid custom JS drawing problems.
 *    Change made by Irina.
 * ** Failsafes have been added to prevent non-existent variables from crashing
 *    the game if a user does not remove them from the variable list. Change
 *    made by Irina.
 * 
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** Added the alternative notetag <Menu Portrait: filename> that also works
 *    the same way as <Menu Image: filename>.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Skill check plugin parameter for show fixed. Fixed by Yanfly and Shaz.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Command Window List > skill >
 *     JS: Show > and changing 'this.needsCommand("item")' to
 *     'this.needsCommand("skill")'
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
 * @command ChangeActorMenuImageGroup
 * @text Actor: Change Menu Image (Group)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageRange
 * @text Actor: Change Menu Image (Range)
 * @desc Changes the actor's Menu Image.
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageJS
 * @text Actor: Change Menu Image (JS)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
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
 * @param MainMenuCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to the Main Menu and related.
 * @default {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","StatusWindow":"","StatusSelectLast:eval":"false","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"[\"Scene_Skill\"]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"}
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Main Menu.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"combatLog\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.combatLog_BattleCmd_Name;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CombatLog &&\\\\n    this.isCombatLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCombatLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCombatLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
 *
 * @param Playtime:struct
 * @text Playtime Window
 * @type struct<Playtime>
 * @desc Settings for the Playtime Window.
 * @default {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Variable:struct
 * @text Variable Window
 * @type struct<Variable>
 * @desc Settings for the Variable Window.
 * @default {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"[\"1\",\"2\"]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param ParamBreak1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CommandWindowStyle:str
 * @text Command Window Style
 * @type select
 * @option Default Vertical Side Style
 * @value default
 * @option Top Horizontal Style
 * @value top
 * @option Thin Top Horizontal Style
 * @value thinTop
 * @option Bottom Horizontal Style
 * @value bottom
 * @option Thin Bottom Horizontal Style
 * @value thinBottom
 * @option Mobile Full Screen Style
 * @value mobile
 * @desc Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows.
 * @default top
 *
 * @param CustomCmdWin:struct
 * @text Command Style Settings
 * @parent CommandWindowStyle:str
 * @type struct<CustomCmdWin>
 * @desc Settings for the non-default Command Window Styles.
 * @default {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"}
 *
 * @param ParamBreak2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StatusGraphic:str
 * @text Status Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in status-like menus.
 * @default face
 *
 * @param StatusListStyle:str
 * @text Main Menu List Style
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the Main Menu.
 * @default portrait
 *
 * @param InnerMenuListStyle:str
 * @text Inner-Menu List Style
 * @parent StatusListStyle:str
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the inner menus
 * like Scene_Item, Scene_Skill, etc.
 * @default default
 *
 * @param ListStyles:struct
 * @text List Style Settings
 * @parent StatusListStyle:str
 * @type struct<ListStyles>
 * @desc JavaScript code used to determine how the individual styles are drawn.
 * @default {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""}
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
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this command.
 * Use 0 for no icon.
 * @default 0
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this menu command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default "const ext = arguments[0];"
 *
 * @param PersonalHandlerJS:func
 * @text JS: Personal Code
 * @type note
 * @desc JavaScript code that runs once the actor list is selected with this command highlighted.
 * @default "const ext = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param ThinGoldWindow:eval
 * @text Thinner Gold Window
 * @parent GoldWindow
 * @type boolean
 * @on Thinner
 * @off Normal
 * @desc Make the Gold Window thinner in the Main Menu?
 * Used to match the Playtime and Variable Windows.
 * @default true
 *
 * @param AutoGoldHeight:eval
 * @text Auto Adjust Height
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the height for the thinner Gold Window?
 * @default true
 *
 * @param AutoGoldY:eval
 * @text Auto Adjust Y
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the Y position for the thinner Gold Window?
 * @default true
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusSelectLast:eval
 * @text Select Last?
 * @parent StatusWindow
 * @type boolean
 * @on Last Picked Actor
 * @off Always First Actor
 * @desc When picking a personal command from the Command Window,
 * select the last picked actor or always the first?
 * @default false
 *
 * @param SoloParty
 * @text Solo Party
 *
 * @param SoloQuick:eval
 * @text Solo Quick Mode
 * @parent SoloParty
 * @type boolean
 * @on Quick
 * @off Normal
 * @desc When selecting "Skills", "Equip", or "Status" with one party member, immediately go to the scene.
 * @default true
 *
 * @param SubMenus
 * @text Sub Menus
 *
 * @param ActorBgMenus:arraystr
 * @text Menus with Actor BG's
 * @parent SubMenus
 * @type string[]
 * @desc A list of the menus that would be compatible with Actor Menu Backgrounds.
 * @default ["Scene_Skill","Scene_Equip","Scene_Status"]
 *
 * @param ActorBgMenuJS:func
 * @text JS: Actor BG Action
 * @parent SubMenus
 * @type note
 * @desc Code used to determine how to display the sprites upon loading.
 * @default "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;"
 *
 * @param PartyWindow
 * @text Party Window
 *
 * @param ShowReserve:eval
 * @text Show Reserve Memebers
 * @parent PartyWindow
 * @type boolean
 * @on Show Reserve Members
 * @off Hide Reserve Members
 * @desc Show reserve members while on the Main Menu scene?
 * @default true
 *
 * @param HideMainMenuOnly:eval
 * @text Hide Main Menu Only
 * @parent ShowReserve:eval
 * @type boolean
 * @on Hide in Main Menu Only
 * @off Hide in all Scenes
 * @desc If reserve members are hidden, hide them only in the main menu or all scenes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Playtime Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Playtime:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Playtime Window?
 * @default true
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Playtime Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Playtime window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Playtime window.
 * Default: 26
 * @default 20
 *
 * @param Icon:num
 * @text Time Icon
 * @desc Icon displayed for the 'Time' label.
 * @default 75
 *
 * @param Time:str
 * @text Time Text
 * @desc Text for the display of 'Time' in the Playtime window.
 * @default Time
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Playtime window.
 * @default "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Variable Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Variable:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Variable Window?
 * @default false
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Variable Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Variable window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Variable window.
 * Default: 26
 * @default 20
 *
 * @param VarList:arraynum
 * @text Variable List
 * @type variable[]
 * @desc Select variables to be displayed into the window.
 * Use \i[x] to determine their icon.
 * @default ["1","2","3"]
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Variable window.
 * @default "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Horizontal Command Window Style
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomCmdWin:
 *
 * @param Style:str
 * @text Command Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw command entries in the Command Window?
 * @default auto
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Rows:num
 * @text Rows
 * @type number
 * @min 1
 * @desc Number of visible rows.
 * @default 2
 *
 * @param Cols:num
 * @text Columns
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 4
 *
 * @param MobileThickness:num
 * @text Mobile Thickness
 * @type number
 * @min 1
 * @desc The thickness of the buttons for mobile version.
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * List Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ListStyles:
 *
 * @param DefaultStyle:func
 * @text JS: Default
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + Math.floor((rect.height - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS: Vertical
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS: Portrait
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS: Solo
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
 *
 * @param ThinStyle:func
 * @text JS: Thin
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);"
 *
 * @param ThickerStyle:func
 * @text JS: Thicker
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 */
//=============================================================================

const _0x3419=['addChild','playtimeWindowRectTopStyle','10WzfRDm','create','itemTextAlign','drawItemStatusThinStyle','right','GUKSi','addCommand','300071DVnDJg','thinTop','_duration','Step1End','drawItemActorSvBattler','currentExt','systemColor','push','onPersonalCancel','commandWindowRectThinTopStyle','itemHeight','concat','variableWindowRectBottomStyle','kzWjw','Settings','63217rWGTpE','_dummyWindow','Scene_Menu_commandWindowRect','save','statusWindowRect','smoothSelect','text','textSizeEx','changeTextColor','AdjustCommandHeight','StatusGraphic','createGoldWindow','FUNC','setup','default','addMainCommands','fill','drawItemStatus','1CkHOzi','sprite','colSpacing','none','goldWindowRectTopStyle','RNslJ','isSoloQuickMode','commandCommonEvent','adjustCommandHeightByPlaytime','width','Scene_MenuBase_updateActor','updateDuration','icon','commandStyleCheck','drawItemStyleIcon','commandWindowRectMobileStyle','selectLast','_commandWindow','options','statusWindowRectMobileStyle','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','wpFlw','ARRAYJSON','STRUCT','mTvjG','onFormationCancel','variableWindowRect','parameters','canCreatePlaytimeWindow','canCreateVariableWindow','TextJS','currentSymbol','showOnlyBattleMembers','updateOpacity','yjoja','834401CNgDRS','numVisibleRows','commandWindowStyle','fhfbE','StatusSelectLast','commandPersonal','addOriginalCommands','bind','PmBPm','addSymbolBridge','Scene_Menu_create','HlcEV','lbUoV','ENmxT','mainAreaBottom','length','addSaveCommand','PersonalHandlerJS','innerHeight','General','loadSvActor','drawItemActorMenuImage','Rows','ConvertParams','gdDeY','playtimeWindowRect','commandNameWindowCenter','mobile','isArray','createBackground','members','svActorVertCells','note','contents','exit','drawAllItems','variables','prototype','_actor','iconText','battlerName','maxBattleMembers','statusWindowRectTopStyle','_goldWindow','ShowJS','xWlrB','drawItemStatusDefaultStyle','YHotM','_targetX','DQWQD','Window_MenuStatus_maxItems','clear','RGmUX','CommandList','AAWdl','commandWindowRectBottomStyle','height','normalColor','addGameEndCommand','goldWindowRect','opacity','value','drawItemStatusPortraitStyle','maxCols','adjustCommandHeightByVariable','_commandNameWindow','boxHeight','ARRAYEVAL','faceWidth','statusWindowRectBottomStyle','Enable','EKEAI','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_scene','rrdxP','Scene_Menu_commandFormation','adjustStatusWindowMobile','_variableWindow','ListStyles','call','_playtimeText','format','DQopb','drawItemActorFace','setHandler','EVAL','drawSvActor','drawItemStatusVerticalStyle','characterName','onPersonalOk','drawTimeIcon','isCommandEnabled','CommandWindowStyle','DefaultStyle','update','Step1Start','max','StatusListStyle','asMPM','map','createCommandNameWindow','SoloStyle','ActorBgMenuJS','ChangeActorMenuImageRange','match','bitmap','updateActor','MainMenuCore','Scene_Menu_commandPersonal','svbattler','registerCommand','auto','shift','ExtJS','drawActorFace','setMenuImage','resetTextColor','729858qVuiui','needsDummyWindow','oXYtK','_menuImage','index','actor','wrmly','CustomCmdWin','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','playtimeWindowRectBottomStyle','Scene_Menu_onPersonalCancel','ZUftp','vjeIK','_targetY','vQEkB','setActor','TInlc','addWindow','Scene_Menu_createStatusWindow','loadOtherActorImages','AxAlX','iconWidth','IZPah','commandWindowRect','drawItemStatusSoloStyleOnLoad','commandNameWindowDrawText','maxItems','thinBottom','BgType','playtimeText','AutoGoldHeight','_list','ARRAYFUNC','popScene','MobileThickness','ThickerStyle','solo','VarList','isBigCharacter','RCtBw','JSON','Game_Actor_setup','isExpGaugeDrawn','createPlaytimeWindow','left','drawPlaytime','RZJUX','Cols','lJGAl','rRimo','resetFontSettings','SoloQuick','Ckqgr','boxWidth','variableWindowRectTopStyle','description','blt','top','AutoGoldY','HEBcg','AZePj','CyOuL','loadBitmap','loadPicture','faceHeight','vertical','ARRAYSTRUCT','ceil','drawTextEx','NUM','drawActorGraphic','isDisplayActorMenuBackgroundImage','getMenuImageOffsetX','mainCommandWidth','PortraitStyle','fontSize','floor','constructor','createActorMenuBackgroundImageSprite','kgvOt','Window_MenuStatus_drawItemImage','_statusWindow','drawText','initMenuImage','_commandList','\x5cI[%1]%2','commandName','commandFormation','Time','getMenuImage','addFormationCommand','bZiNb','commandStyle','graphicType','openness','_timer','item','322034PbopnJ','nQBMY','BsCYX','reserveCommonEvent','mainAreaHeight','ActorBgMenus','Variable','iconHeight','makeMainMenuCoreCommandList','loadFaceImages','return\x200','_actorMenuBgSprite','Scene_Menu_onFormationCancel','Scene_Menu_statusWindowRect','goldWindowRectBottomStyle','SiJHZ','setBackgroundType','TextStr','drawItemStatusThickerStyle','DIDJr','filter','toUpperCase','Window_StatusBase_loadFaceImages','updateTimer','Window_MenuStatus_itemHeight','Window_MenuCommand_initialize','getMenuImageOffsetY','EnableJS','calcWindowHeight','Step2','includes','updatePosition','drawIcon','FontSize','CallHandlerJS','SPFmV','HideMainMenuOnly','Window_MenuStatus_selectLast','createDummyWindow','commandWindowRectThinBottomStyle','Style','drawItemImage','Untitled','drawItemStyleIconText','WindowRect','callUpdateHelp','createVariableWindow','Playtime','replace','KkFeU','initialize','hUFNG','onBitmapLoad','parse','trim','eBCFZ','thinGoldWindow','InnerMenuListStyle','open','ChangeActorMenuImageJS','status','portrait','innerWidth','TextAlign','listStyle','updateCommandNameWindow','bottom','commandNameWindowDrawBackground','formation','815622MEKohI','fPiNO','_playtimeWindow','ThinGoldWindow','changePaintOpacity','thin','Symbol','characterIndex','ShowReserve','yOQtx','mainAreaTop','refresh','Scene_MenuBase_createBackground','addOptionsCommand','topIndex','loadCharacter','_data','version','adjustDefaultCommandWindowRect','lineHeight','drawItemStatusSoloStyle','isBattleMember','drawTimeLabel','RNzBv','VVccV','drawItemBackground','svActorHorzCells','commandWindowRectTopStyle','thicker','maxVisibleItems','windowPadding','Icon','Step1','drawItemStatusPortraitStyleOnLoad','center','cancel','min','drawItem','name','497419mNCzko','_bitmapReady','addLoadListener','drawItemActorSprite','close','VerticalStyle','ThinStyle','itemLineRect'];const _0x5899c9=_0x352b;(function(_0x44d36b,_0x2f6ce5){const _0x15c666=_0x352b;while(!![]){try{const _0x110661=parseInt(_0x15c666(0x159))+parseInt(_0x15c666(0x8c))+-parseInt(_0x15c666(0x132))*-parseInt(_0x15c666(0x18b))+-parseInt(_0x15c666(0x1ae))+parseInt(_0x15c666(0x163))*-parseInt(_0x15c666(0x179))+parseInt(_0x15c666(0x16a))+-parseInt(_0x15c666(0xed));if(_0x110661===_0x2f6ce5)break;else _0x44d36b['push'](_0x44d36b['shift']());}catch(_0x40f6a8){_0x44d36b['push'](_0x44d36b['shift']());}}}(_0x3419,0x8757d));function _0x352b(_0x16aa8e,_0x8eeace){_0x16aa8e=_0x16aa8e-0x6c;let _0x341979=_0x3419[_0x16aa8e];return _0x341979;}var label=_0x5899c9(0x82),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5899c9(0x101)](function(_0x330902){const _0x79a438=_0x5899c9;return _0x330902[_0x79a438(0x129)]&&_0x330902[_0x79a438(0xc3)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x5899c9(0x178)]=VisuMZ[label][_0x5899c9(0x178)]||{},VisuMZ[_0x5899c9(0x1c5)]=function(_0x3ac39b,_0x353b63){const _0x2e0617=_0x5899c9;for(const _0x393a38 in _0x353b63){if(_0x393a38['match'](/(.*):(.*)/i)){const _0x490c5a=String(RegExp['$1']),_0x255760=String(RegExp['$2'])[_0x2e0617(0x102)]()[_0x2e0617(0x123)]();let _0xc27072,_0x143481,_0x536714;switch(_0x255760){case _0x2e0617(0xd1):_0xc27072=_0x353b63[_0x393a38]!==''?Number(_0x353b63[_0x393a38]):0x0;break;case'ARRAYNUM':_0x143481=_0x353b63[_0x393a38]!==''?JSON[_0x2e0617(0x122)](_0x353b63[_0x393a38]):[],_0xc27072=_0x143481['map'](_0x1fc05d=>Number(_0x1fc05d));break;case _0x2e0617(0x6c):_0xc27072=_0x353b63[_0x393a38]!==''?eval(_0x353b63[_0x393a38]):null;break;case _0x2e0617(0x1f1):_0x143481=_0x353b63[_0x393a38]!==''?JSON[_0x2e0617(0x122)](_0x353b63[_0x393a38]):[],_0xc27072=_0x143481[_0x2e0617(0x7a)](_0x575f70=>eval(_0x575f70));break;case _0x2e0617(0xb4):_0xc27072=_0x353b63[_0x393a38]!==''?JSON[_0x2e0617(0x122)](_0x353b63[_0x393a38]):'';break;case _0x2e0617(0x1a1):_0x143481=_0x353b63[_0x393a38]!==''?JSON[_0x2e0617(0x122)](_0x353b63[_0x393a38]):[],_0xc27072=_0x143481[_0x2e0617(0x7a)](_0x4642c3=>JSON['parse'](_0x4642c3));break;case _0x2e0617(0x185):_0xc27072=_0x353b63[_0x393a38]!==''?new Function(JSON[_0x2e0617(0x122)](_0x353b63[_0x393a38])):new Function(_0x2e0617(0xf7));break;case _0x2e0617(0xac):_0x143481=_0x353b63[_0x393a38]!==''?JSON[_0x2e0617(0x122)](_0x353b63[_0x393a38]):[],_0xc27072=_0x143481[_0x2e0617(0x7a)](_0x2a6eb8=>new Function(JSON[_0x2e0617(0x122)](_0x2a6eb8)));break;case'STR':_0xc27072=_0x353b63[_0x393a38]!==''?String(_0x353b63[_0x393a38]):'';break;case'ARRAYSTR':_0x143481=_0x353b63[_0x393a38]!==''?JSON['parse'](_0x353b63[_0x393a38]):[],_0xc27072=_0x143481['map'](_0x583294=>String(_0x583294));break;case _0x2e0617(0x1a2):_0x536714=_0x353b63[_0x393a38]!==''?JSON[_0x2e0617(0x122)](_0x353b63[_0x393a38]):{},_0x3ac39b[_0x490c5a]={},VisuMZ['ConvertParams'](_0x3ac39b[_0x490c5a],_0x536714);continue;case _0x2e0617(0xce):_0x143481=_0x353b63[_0x393a38]!==''?JSON[_0x2e0617(0x122)](_0x353b63[_0x393a38]):[],_0xc27072=_0x143481[_0x2e0617(0x7a)](_0x15622d=>VisuMZ[_0x2e0617(0x1c5)]({},JSON['parse'](_0x15622d)));break;default:continue;}_0x3ac39b[_0x490c5a]=_0xc27072;}}return _0x3ac39b;},(_0x258a2c=>{const _0x5725d9=_0x5899c9,_0x37660a=_0x258a2c[_0x5725d9(0x158)];for(const _0x106489 of dependencies){if(!Imported[_0x106489]){alert(_0x5725d9(0x94)[_0x5725d9(0x1ff)](_0x37660a,_0x106489)),SceneManager[_0x5725d9(0x1d0)]();break;}}const _0x2870c1=_0x258a2c['description'];if(_0x2870c1[_0x5725d9(0x7f)](/\[Version[ ](.*?)\]/i)){if(_0x5725d9(0x13b)!==_0x5725d9(0xef)){const _0x207ecc=Number(RegExp['$1']);_0x207ecc!==VisuMZ[label][_0x5725d9(0x143)]&&(alert(_0x5725d9(0x19f)[_0x5725d9(0x1ff)](_0x37660a,_0x207ecc)),SceneManager[_0x5725d9(0x1d0)]());}else{function _0x400906(){const _0x108af2=_0x5725d9;_0x4f251a['prototype'][_0x108af2(0x157)]['call'](this,_0x5554fe);}}}if(_0x2870c1[_0x5725d9(0x7f)](/\[Tier[ ](\d+)\]/i)){const _0xc6a3d6=Number(RegExp['$1']);if(_0xc6a3d6<tier){if(_0x5725d9(0x168)!=='iToAY')alert(_0x5725d9(0x1f6)[_0x5725d9(0x1ff)](_0x37660a,_0xc6a3d6,tier)),SceneManager[_0x5725d9(0x1d0)]();else{function _0x2e2761(){const _0x5380b2=_0x5725d9;if([_0x5380b2(0x187),_0x5380b2(0x1c9)]['includes'](this['commandWindowStyle']()))return![];if(this[_0x5380b2(0x1fb)])return![];return!![];}}}else tier=Math[_0x5725d9(0x77)](_0xc6a3d6,tier);}VisuMZ[_0x5725d9(0x1c5)](VisuMZ[label][_0x5725d9(0x178)],_0x258a2c[_0x5725d9(0x1a6)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x5899c9(0x158)],'ChangeActorMenuImageGroup',_0x50bfd5=>{const _0x1de86a=_0x5899c9;VisuMZ[_0x1de86a(0x1c5)](_0x50bfd5,_0x50bfd5);const _0x362b6d=_0x50bfd5[_0x1de86a(0x152)],_0x19b41b=_0x50bfd5[_0x1de86a(0x10a)];for(let _0x3306ce of _0x362b6d){if('htJFy'!==_0x1de86a(0x133)){_0x3306ce=parseInt(_0x3306ce)||0x0;if(_0x3306ce<=0x0)continue;const _0x306a35=$gameActors['actor'](_0x3306ce);if(!_0x306a35)continue;_0x306a35[_0x1de86a(0x8a)](_0x19b41b);}else{function _0x17d90a(){const _0x995ae8=_0x1de86a;_0x397a3c[_0x995ae8(0x1d3)][_0x995ae8(0x11a)][_0x995ae8(0x1fd)](this);if(this[_0x995ae8(0x1ef)])this['updateCommandNameWindow']();}}}}),PluginManager[_0x5899c9(0x85)](pluginData[_0x5899c9(0x158)],_0x5899c9(0x7e),_0x1b0353=>{const _0x9cf17e=_0x5899c9;VisuMZ[_0x9cf17e(0x1c5)](_0x1b0353,_0x1b0353);const _0x3cc7b3=_0x1b0353[_0x9cf17e(0x16d)]>=_0x1b0353[_0x9cf17e(0x76)]?_0x1b0353[_0x9cf17e(0x76)]:_0x1b0353[_0x9cf17e(0x16d)],_0x24a79f=_0x1b0353[_0x9cf17e(0x16d)]>=_0x1b0353[_0x9cf17e(0x76)]?_0x1b0353['Step1End']:_0x1b0353[_0x9cf17e(0x76)],_0xc95b21=Array(_0x24a79f-_0x3cc7b3+0x1)[_0x9cf17e(0x189)]()[_0x9cf17e(0x7a)]((_0x1bb9c3,_0x108ae1)=>_0x3cc7b3+_0x108ae1),_0x2c8dcd=_0x1b0353[_0x9cf17e(0x10a)];for(let _0x2e1359 of _0xc95b21){if(_0x9cf17e(0x97)!=='ZUftp'){function _0x110d40(){const _0xcf44a5=_0x9cf17e;_0x5616db['MainMenuCore'][_0xcf44a5(0x1f9)][_0xcf44a5(0x1fd)](this);if(this[_0xcf44a5(0x1b0)]()===_0xcf44a5(0x1c9))this[_0xcf44a5(0xdd)]['open']();}}else{_0x2e1359=parseInt(_0x2e1359)||0x0;if(_0x2e1359<=0x0)continue;const _0x56b0af=$gameActors[_0x9cf17e(0x91)](_0x2e1359);if(!_0x56b0af)continue;_0x56b0af['setMenuImage'](_0x2c8dcd);}}}),PluginManager[_0x5899c9(0x85)](pluginData[_0x5899c9(0x158)],_0x5899c9(0x128),_0x319c15=>{const _0x54f851=_0x5899c9;VisuMZ[_0x54f851(0x1c5)](_0x319c15,_0x319c15);const _0x3dbdc5=_0x319c15[_0x54f851(0x152)];let _0x493833=[];while(_0x3dbdc5['length']>0x0){if(_0x54f851(0x1a0)===_0x54f851(0x1b9)){function _0x45571a(){const _0x30f275=_0x54f851;if(!this[_0x30f275(0x8d)]())return;const _0x2dfac5=this[_0x30f275(0x1a5)]();this[_0x30f275(0x17a)]=new _0x4c702d(_0x2dfac5),this[_0x30f275(0x17a)][_0x30f275(0xfd)](_0xd145f9[_0x30f275(0x82)][_0x30f275(0x178)]['Variable'][_0x30f275(0xa8)]),this['addWindow'](this[_0x30f275(0x17a)]);}}else{const _0x116013=_0x3dbdc5[_0x54f851(0x87)]();Array[_0x54f851(0x1ca)](_0x116013)?_0x493833=_0x493833[_0x54f851(0x175)](_0x116013):_0x493833[_0x54f851(0x171)](_0x116013);}}const _0x3b63fc=_0x319c15[_0x54f851(0x10a)];for(let _0x5308d8 of _0x493833){_0x5308d8=parseInt(_0x5308d8)||0x0;if(_0x5308d8<=0x0)continue;const _0x25b093=$gameActors['actor'](_0x5308d8);if(!_0x25b093)continue;_0x25b093[_0x54f851(0x8a)](_0x3b63fc);}}),VisuMZ[_0x5899c9(0x82)][_0x5899c9(0xb5)]=Game_Actor[_0x5899c9(0x1d3)][_0x5899c9(0x186)],Game_Actor['prototype'][_0x5899c9(0x186)]=function(_0x5b6d47){const _0x5e165d=_0x5899c9;VisuMZ[_0x5e165d(0x82)][_0x5e165d(0xb5)][_0x5e165d(0x1fd)](this,_0x5b6d47),this[_0x5e165d(0xdf)]();},Game_Actor['prototype'][_0x5899c9(0xdf)]=function(){const _0x1b461c=_0x5899c9;this['_menuImage']='',this['actor']()&&this[_0x1b461c(0x91)]()[_0x1b461c(0x1ce)][_0x1b461c(0x7f)](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x1b461c(0x8f)]=String(RegExp['$1']));},Game_Actor[_0x5899c9(0x1d3)][_0x5899c9(0xe5)]=function(){const _0x405258=_0x5899c9;if(this[_0x405258(0x8f)]===undefined)this['initMenuImage']();return this[_0x405258(0x8f)];},Game_Actor[_0x5899c9(0x1d3)][_0x5899c9(0x8a)]=function(_0xf3a5c3){const _0x6f2632=_0x5899c9;if(this[_0x6f2632(0x8f)]===undefined)this['initMenuImage']();this[_0x6f2632(0x8f)]=_0xf3a5c3;},Game_Actor['prototype'][_0x5899c9(0xd4)]=function(){const _0x5abdaa=_0x5899c9;if(this['actor']()[_0x5abdaa(0x1ce)]['match'](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x5abdaa(0x91)]()[_0x5abdaa(0x1ce)][_0x5abdaa(0x7f)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},Game_Actor[_0x5899c9(0x1d3)][_0x5899c9(0x107)]=function(){const _0x16f30c=_0x5899c9;if(this[_0x16f30c(0x91)]()[_0x16f30c(0x1ce)]['match'](/<MENU (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x16f30c(0x91)]()[_0x16f30c(0x1ce)][_0x16f30c(0x7f)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x16f30c(0x9a)!==_0x16f30c(0x9a)){function _0x487286(){const _0x1adce6=_0x16f30c;return _0x201da6[_0x1adce6(0x82)][_0x1adce6(0x178)][_0x1adce6(0x73)];}}else return Number(RegExp['$2']);}}return 0x0;},Scene_MenuBase[_0x5899c9(0x1d3)][_0x5899c9(0xd3)]=function(){const _0x1795f9=_0x5899c9;return VisuMZ[_0x1795f9(0x82)][_0x1795f9(0x178)][_0x1795f9(0x1c1)][_0x1795f9(0xf2)][_0x1795f9(0x10b)](this[_0x1795f9(0xd9)][_0x1795f9(0x158)]);},VisuMZ['MainMenuCore'][_0x5899c9(0x13e)]=Scene_MenuBase[_0x5899c9(0x1d3)][_0x5899c9(0x1cb)],Scene_MenuBase['prototype'][_0x5899c9(0x1cb)]=function(){const _0xd68ffd=_0x5899c9;VisuMZ['MainMenuCore'][_0xd68ffd(0x13e)][_0xd68ffd(0x1fd)](this),this['createActorMenuBackgroundImageSprite']();},Scene_MenuBase[_0x5899c9(0x1d3)][_0x5899c9(0xda)]=function(){const _0xd1eb13=_0x5899c9;this[_0xd1eb13(0xf8)]=new Sprite_MenuBackgroundActor(),this[_0xd1eb13(0x161)](this['_actorMenuBgSprite']);},VisuMZ['MainMenuCore'][_0x5899c9(0x195)]=Scene_MenuBase[_0x5899c9(0x1d3)][_0x5899c9(0x81)],Scene_MenuBase[_0x5899c9(0x1d3)][_0x5899c9(0x81)]=function(){const _0x20e375=_0x5899c9;VisuMZ[_0x20e375(0x82)][_0x20e375(0x195)][_0x20e375(0x1fd)](this);if(this['isDisplayActorMenuBackgroundImage']()&&this[_0x20e375(0xf8)]){if(_0x20e375(0xa0)===_0x20e375(0xa0))this[_0x20e375(0xf8)][_0x20e375(0x9b)](this['_actor']);else{function _0x182fe8(){const _0x26d6b9=_0x20e375,_0x16fb8d=this[_0x26d6b9(0x1ef)];_0x16fb8d[_0x26d6b9(0x1cf)][_0x26d6b9(0x1e1)]();const _0x4a6cf7=this['commandStyleCheck'](this[_0x26d6b9(0x90)]());if(_0x4a6cf7==='icon'){const _0x4c9968=this[_0x26d6b9(0x160)](this['index']());let _0xf3cbab=this[_0x26d6b9(0xe2)](this['index']());_0xf3cbab=_0xf3cbab['replace'](/\\I\[(\d+)\]/gi,''),_0x16fb8d[_0x26d6b9(0xbe)](),this[_0x26d6b9(0x130)](_0xf3cbab,_0x4c9968),this[_0x26d6b9(0xa5)](_0xf3cbab,_0x4c9968),this[_0x26d6b9(0x1c8)](_0xf3cbab,_0x4c9968);}}}}},VisuMZ[_0x5899c9(0x82)][_0x5899c9(0x1b8)]=Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x164)],Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x164)]=function(){const _0x4230b7=_0x5899c9;VisuMZ['MainMenuCore'][_0x4230b7(0x1b8)][_0x4230b7(0x1fd)](this),this[_0x4230b7(0xb7)](),this['createVariableWindow'](),this[_0x4230b7(0x113)]();},Scene_Menu[_0x5899c9(0x1d3)]['createCommandWindow']=function(){const _0x3abc86=_0x5899c9,_0x42b4d4=this['commandWindowRect'](),_0x438d02=new Window_MenuCommand(_0x42b4d4);_0x438d02[_0x3abc86(0x202)](_0x3abc86(0x155),this[_0x3abc86(0xad)]['bind'](this)),this[_0x3abc86(0x9d)](_0x438d02),this[_0x3abc86(0x19c)]=_0x438d02;},VisuMZ[_0x5899c9(0x82)]['Scene_Menu_commandWindowRect']=Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0xa3)],Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0xa3)]=function(){const _0x286aa3=_0x5899c9,_0x24dd40=this[_0x286aa3(0x1b0)]();if(_0x24dd40===_0x286aa3(0xc5))return this[_0x286aa3(0x14d)]();else{if(_0x24dd40===_0x286aa3(0x16b)){if('nQBMY'!==_0x286aa3(0xee)){function _0x10c569(){const _0x270e02=_0x286aa3,_0x3a66c4=this['commandWindowStyle']();if([_0x270e02(0xc5),_0x270e02(0x16b),'mobile']['includes'](_0x3a66c4))return this[_0x270e02(0x162)]();else return[_0x270e02(0x12f),_0x270e02(0xa7)][_0x270e02(0x10b)](_0x3a66c4)?this['playtimeWindowRectBottomStyle']():_0x54cdd6[_0x270e02(0x82)]['Settings']['Playtime']['WindowRect'][_0x270e02(0x1fd)](this);}}else return this[_0x286aa3(0x173)]();}else{if(_0x24dd40==='bottom')return this[_0x286aa3(0x1e5)]();else{if(_0x24dd40===_0x286aa3(0xa7)){if(_0x286aa3(0x120)!==_0x286aa3(0x120)){function _0x40eb3e(){const _0x2a48a1=_0x286aa3;_0x3529fc=_0x2362e0||_0x34be0b[_0x2a48a1(0x1f2)],_0x11ee1d=_0x158729||_0x59d677[_0x2a48a1(0xcc)];const _0x149736=_0x75bb27[_0x2a48a1(0x1c2)](_0x195ffd['battlerName']()),_0x564b8e=_0x149736[_0x2a48a1(0x194)]/_0x2850d3[_0x2a48a1(0x14c)],_0x372807=_0x149736[_0x2a48a1(0x1e6)]/_0x9b8bf3[_0x2a48a1(0x1cd)],_0x2b4e07=_0x48c5c2,_0x8769a4=_0x24cf13-0x2,_0x3616ed=_0x43ef3e+_0x3da181[_0x2a48a1(0xd8)](_0x2b4e07/0x2),_0x4e2493=_0x3c10c9+_0x204d8a[_0x2a48a1(0xcf)]((_0x3061a8+_0x372807)/0x2);this[_0x2a48a1(0xd9)]===_0xff2442&&this[_0x2a48a1(0x136)](_0x3c6bbc[_0x2a48a1(0x147)]());const _0x30de39=_0x3b9d0c['min'](_0x396724,_0x564b8e),_0x3777d3=_0x486646[_0x2a48a1(0x156)](_0x521d97,_0x372807),_0x1b4acb=_0x169823[_0x2a48a1(0xd8)](_0x242925+_0x22f8e3[_0x2a48a1(0x77)](_0x53175c-_0x564b8e,0x0)/0x2),_0x5c9da7=_0x5156bb[_0x2a48a1(0xd8)](_0x4505ea+_0x4e54a1[_0x2a48a1(0x77)](_0x185d42-_0x372807,0x0)/0x2),_0x2c1e91=0x0,_0x2834a4=0x0;this[_0x2a48a1(0x1cf)]['blt'](_0x149736,_0x2c1e91,_0x2834a4,_0x30de39,_0x3777d3,_0x1b4acb,_0x5c9da7),this[_0x2a48a1(0x136)](!![]);}}else return this['commandWindowRectThinBottomStyle']();}else{if(_0x24dd40===_0x286aa3(0x1c9))return this[_0x286aa3(0x19a)]();else{const _0x2121a9=VisuMZ[_0x286aa3(0x82)][_0x286aa3(0x17b)][_0x286aa3(0x1fd)](this);return this[_0x286aa3(0x144)](_0x2121a9),_0x2121a9;}}}}}},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x144)]=function(_0x194977){const _0x245810=_0x5899c9;this['adjustCommandHeightByPlaytime']()&&(_0x194977[_0x245810(0x1e6)]-=this[_0x245810(0x1c7)]()[_0x245810(0x1e6)]),this[_0x245810(0x1ee)]()&&(_0x194977[_0x245810(0x1e6)]-=this[_0x245810(0x1a5)]()[_0x245810(0x1e6)]);},Scene_Menu['prototype'][_0x5899c9(0x14d)]=function(){const _0x12ce08=_0x5899c9,_0x3c28da=VisuMZ[_0x12ce08(0x82)][_0x12ce08(0x178)][_0x12ce08(0x93)][_0x12ce08(0x1c4)],_0x361180=Graphics[_0x12ce08(0xc1)],_0x23379b=this[_0x12ce08(0x109)](_0x3c28da,!![]),_0x532cee=0x0,_0x21f0fb=this[_0x12ce08(0x13c)]();return new Rectangle(_0x532cee,_0x21f0fb,_0x361180,_0x23379b);},Scene_Menu['prototype']['commandWindowRectThinTopStyle']=function(){const _0x3eadd7=_0x5899c9,_0x537ae2=VisuMZ[_0x3eadd7(0x82)]['Settings'][_0x3eadd7(0x93)][_0x3eadd7(0x1c4)],_0x2ff564=Graphics['boxWidth'],_0x5013b5=this[_0x3eadd7(0x109)](0x1,!![]),_0x4d6df9=0x0,_0x2e31d9=this[_0x3eadd7(0x13c)]();return new Rectangle(_0x4d6df9,_0x2e31d9,_0x2ff564,_0x5013b5);},Scene_Menu['prototype']['commandWindowRectBottomStyle']=function(){const _0x1c6e3d=_0x5899c9,_0x826753=VisuMZ[_0x1c6e3d(0x82)][_0x1c6e3d(0x178)]['CustomCmdWin'][_0x1c6e3d(0x1c4)],_0x3c4eda=Graphics[_0x1c6e3d(0xc1)],_0x4bb96c=this['calcWindowHeight'](_0x826753,!![]),_0x35c8fe=0x0,_0x492af5=this[_0x1c6e3d(0x1bc)]()-_0x4bb96c;return new Rectangle(_0x35c8fe,_0x492af5,_0x3c4eda,_0x4bb96c);},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x114)]=function(){const _0xa17a35=_0x5899c9,_0x2fc764=VisuMZ[_0xa17a35(0x82)]['Settings'][_0xa17a35(0x93)]['Rows'],_0x411aec=Graphics[_0xa17a35(0xc1)],_0x321b67=this[_0xa17a35(0x109)](0x1,!![]),_0x3834b1=0x0,_0x1b94a5=this[_0xa17a35(0x1bc)]()-_0x321b67;return new Rectangle(_0x3834b1,_0x1b94a5,_0x411aec,_0x321b67);},Scene_Menu['prototype'][_0x5899c9(0x19a)]=function(){const _0x3f2acf=_0x5899c9,_0x1817d2=VisuMZ[_0x3f2acf(0x82)][_0x3f2acf(0x178)][_0x3f2acf(0x93)][_0x3f2acf(0x1c4)],_0x57e5db=Graphics[_0x3f2acf(0xc1)],_0x4a0fbd=Window_MenuCommand[_0x3f2acf(0x1d3)]['fittingHeight'](_0x1817d2),_0x2dd8ec=0x0,_0x3de0a8=Math['round']((Graphics[_0x3f2acf(0x1f0)]-_0x4a0fbd)/0x2);return new Rectangle(_0x2dd8ec,_0x3de0a8,_0x57e5db,_0x4a0fbd);},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x1b0)]=function(){const _0x17474f=_0x5899c9;return VisuMZ['MainMenuCore'][_0x17474f(0x178)][_0x17474f(0x73)];},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x125)]=function(){const _0x1f1126=_0x5899c9;if(this[_0x1f1126(0x1b0)]()!==_0x1f1126(0x187))return!![];return VisuMZ[_0x1f1126(0x82)][_0x1f1126(0x178)][_0x1f1126(0x1c1)][_0x1f1126(0x135)];},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x184)]=function(){const _0x1ceac0=_0x5899c9,_0x1dd234=this[_0x1ceac0(0x1e9)]();this['_goldWindow']=this['thinGoldWindow']()?new Window_ThinGold(_0x1dd234):new Window_Gold(_0x1dd234),this[_0x1ceac0(0x9d)](this[_0x1ceac0(0x1d9)]);},VisuMZ[_0x5899c9(0x82)]['Scene_Menu_goldWindowRect']=Scene_Menu['prototype']['goldWindowRect'],Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x1e9)]=function(){const _0xb9f3ff=_0x5899c9,_0x549fe9=this[_0xb9f3ff(0x1b0)]();if([_0xb9f3ff(0xc5),_0xb9f3ff(0x16b),_0xb9f3ff(0x1c9)][_0xb9f3ff(0x10b)](_0x549fe9))return this[_0xb9f3ff(0x18f)]();else{if([_0xb9f3ff(0x12f),'thinBottom'][_0xb9f3ff(0x10b)](_0x549fe9))return this['goldWindowRectBottomStyle']();else{const _0x88b5b0=VisuMZ[_0xb9f3ff(0x82)]['Scene_Menu_goldWindowRect']['call'](this);return this['applyThinnerGoldWindowRect'](_0x88b5b0),_0x88b5b0;}}},Scene_Menu[_0x5899c9(0x1d3)]['applyThinnerGoldWindowRect']=function(_0x3bb237){const _0x1d700f=_0x5899c9;if(this[_0x1d700f(0x125)]()){if(VisuMZ['MainMenuCore'][_0x1d700f(0x178)]['General'][_0x1d700f(0xc6)]){if('QrDfC'==='HLrQC'){function _0x2c20ff(){const _0x354459=_0x1d700f,_0x292a3c=this[_0x354459(0xd5)](),_0x19d3f4=this[_0x354459(0x109)](0x1,![]),_0x21d5ea=_0x358191[_0x354459(0xc1)]-_0x292a3c,_0x460a61=this['mainAreaBottom']()-_0x19d3f4;return new _0x199634(_0x21d5ea,_0x460a61,_0x292a3c,_0x19d3f4);}}else{const _0x3cbcaa=_0x3bb237[_0x1d700f(0x1e6)]-this['calcWindowHeight'](0x1,![]);_0x3bb237['y']+=_0x3cbcaa;}}if(VisuMZ[_0x1d700f(0x82)][_0x1d700f(0x178)][_0x1d700f(0x1c1)][_0x1d700f(0xaa)]){if(_0x1d700f(0x1f5)!==_0x1d700f(0x1f5)){function _0x38cfc7(){const _0x273584=_0x1d700f,_0x565eb3=this['listStyle']();switch(_0x565eb3){case _0x273584(0xcd):case _0x273584(0x12a):return 0x1;case _0x273584(0xb0):return 0x1;default:return _0x57ef0c[_0x273584(0x1d7)]();}}}else _0x3bb237[_0x1d700f(0x1e6)]=this['calcWindowHeight'](0x1,![]);}}},Scene_Menu[_0x5899c9(0x1d3)]['goldWindowRectTopStyle']=function(){const _0x5786c3=_0x5899c9,_0x44924f=this[_0x5786c3(0xd5)](),_0x24772f=this[_0x5786c3(0x109)](0x1,![]),_0x2f3dfa=Graphics[_0x5786c3(0xc1)]-_0x44924f,_0x109786=this[_0x5786c3(0x1bc)]()-_0x24772f;return new Rectangle(_0x2f3dfa,_0x109786,_0x44924f,_0x24772f);},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0xfb)]=function(){const _0x1e47d7=_0x5899c9,_0x4195d1=this[_0x1e47d7(0xd5)](),_0x15984b=this[_0x1e47d7(0x109)](0x1,![]),_0x2819e6=Graphics['boxWidth']-_0x4195d1,_0x1070bb=this['mainAreaTop']();return new Rectangle(_0x2819e6,_0x1070bb,_0x4195d1,_0x15984b);},VisuMZ[_0x5899c9(0x82)][_0x5899c9(0x9e)]=Scene_Menu[_0x5899c9(0x1d3)]['createStatusWindow'],Scene_Menu[_0x5899c9(0x1d3)]['createStatusWindow']=function(){const _0x58b19b=_0x5899c9;VisuMZ['MainMenuCore'][_0x58b19b(0x9e)][_0x58b19b(0x1fd)](this),this[_0x58b19b(0x1fa)]();},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x1fa)]=function(){const _0x51f405=_0x5899c9;if(this[_0x51f405(0x1b0)]()===_0x51f405(0x1c9)){if(_0x51f405(0xc0)!==_0x51f405(0xc0)){function _0x1e379e(){const _0x5bb77c=_0x51f405;_0x510116[_0x5bb77c(0x82)]['Settings'][_0x5bb77c(0x1fc)][_0x5bb77c(0xd6)][_0x5bb77c(0x1fd)](this,_0x4f4f19,_0x2f9db0);}}else this[_0x51f405(0xdd)][_0x51f405(0xea)]=0x0;}},VisuMZ[_0x5899c9(0x82)][_0x5899c9(0xfa)]=Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x17d)],Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x17d)]=function(){const _0x548b0a=_0x5899c9,_0x5c45d0=this[_0x548b0a(0x1b0)]();if([_0x548b0a(0xc5),_0x548b0a(0x16b)][_0x548b0a(0x10b)](_0x5c45d0)){if(_0x548b0a(0xdb)===_0x548b0a(0xdb))return this[_0x548b0a(0x1d8)]();else{function _0x3b8b63(){const _0x39ecaa=_0x548b0a,_0x2fbae8=_0x3a9691['boxWidth'],_0x4f4521=this[_0x39ecaa(0xf1)]()-this['_goldWindow']['height'],_0x43f9c5=0x0,_0x3198a3=this[_0x39ecaa(0x1bc)]()-this[_0x39ecaa(0x1d9)][_0x39ecaa(0x1e6)]-_0x4f4521;return new _0x2828e6(_0x43f9c5,_0x3198a3,_0x2fbae8,_0x4f4521);}}}else{if([_0x548b0a(0x12f),'thinBottom'][_0x548b0a(0x10b)](_0x5c45d0)){if(_0x548b0a(0x1b1)!=='fhfbE'){function _0x349c08(){const _0x14b434=_0x548b0a,_0x31e329=_0xd121fb['x']+_0x365095[_0x14b434(0xd8)]((_0x43883b[_0x14b434(0x194)]-_0x262c30)/0x2);this[_0x14b434(0xd0)](_0x5332d2,_0x31e329,_0x44a0a0['y'],_0x2b00c4);}}else return this['statusWindowRectBottomStyle']();}else return _0x5c45d0===_0x548b0a(0x1c9)?this[_0x548b0a(0x19e)]():VisuMZ[_0x548b0a(0x82)][_0x548b0a(0xfa)][_0x548b0a(0x1fd)](this);}},Scene_Menu['prototype'][_0x5899c9(0x1d8)]=function(){const _0x3b7bd3=_0x5899c9,_0x26acf0=Graphics[_0x3b7bd3(0xc1)],_0x10b29c=this[_0x3b7bd3(0xf1)]()-this['_commandWindow'][_0x3b7bd3(0x1e6)]-this['_goldWindow']['height'],_0x539dd9=0x0,_0x5ddff8=this[_0x3b7bd3(0x19c)]['y']+this[_0x3b7bd3(0x19c)][_0x3b7bd3(0x1e6)];return new Rectangle(_0x539dd9,_0x5ddff8,_0x26acf0,_0x10b29c);},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x1f3)]=function(){const _0x43d312=_0x5899c9,_0x42db2e=Graphics[_0x43d312(0xc1)],_0xcc82ff=this['mainAreaHeight']()-this[_0x43d312(0x19c)]['height']-this[_0x43d312(0x1d9)][_0x43d312(0x1e6)],_0x2c2a86=0x0,_0x30b1b0=this[_0x43d312(0x1d9)]['y']+this[_0x43d312(0x1d9)][_0x43d312(0x1e6)];return new Rectangle(_0x2c2a86,_0x30b1b0,_0x42db2e,_0xcc82ff);},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x19e)]=function(){const _0x3192c0=_0x5899c9,_0xbe70ac=Graphics[_0x3192c0(0xc1)],_0x178bcf=this[_0x3192c0(0xf1)]()-this[_0x3192c0(0x1d9)][_0x3192c0(0x1e6)],_0x208e26=0x0,_0x1c10ab=this[_0x3192c0(0x1bc)]()-this['_goldWindow'][_0x3192c0(0x1e6)]-_0x178bcf;return new Rectangle(_0x208e26,_0x1c10ab,_0xbe70ac,_0x178bcf);},Scene_Menu['prototype'][_0x5899c9(0xb7)]=function(){const _0x26cf0b=_0x5899c9;if(!this[_0x26cf0b(0x1a7)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x269a51=this[_0x26cf0b(0x1c7)]();this[_0x26cf0b(0x134)]=new Window_Playtime(_0x269a51),this[_0x26cf0b(0x134)][_0x26cf0b(0xfd)](VisuMZ[_0x26cf0b(0x82)]['Settings'][_0x26cf0b(0x11c)][_0x26cf0b(0xa8)]),this['addWindow'](this['_playtimeWindow']);},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x1a7)]=function(){const _0x314ecf=_0x5899c9;return VisuMZ[_0x314ecf(0x82)][_0x314ecf(0x178)][_0x314ecf(0x11c)][_0x314ecf(0x1f4)];},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x193)]=function(){const _0x1d8cd9=_0x5899c9;return this[_0x1d8cd9(0x1a7)]()&&VisuMZ['MainMenuCore'][_0x1d8cd9(0x178)][_0x1d8cd9(0x11c)][_0x1d8cd9(0x182)];},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x1c7)]=function(){const _0x65bf44=_0x5899c9,_0x2312e4=this[_0x65bf44(0x1b0)]();if([_0x65bf44(0xc5),'thinTop',_0x65bf44(0x1c9)][_0x65bf44(0x10b)](_0x2312e4)){if('rOeJh'===_0x65bf44(0xfc)){function _0x1734a4(){const _0x1dd2bf=_0x65bf44,_0x1eae08=_0x3e3b96+_0x1c796c;_0x1eae08<this[_0x1dd2bf(0xa6)]()&&(this[_0x1dd2bf(0x14b)](_0x1eae08),this[_0x1dd2bf(0x157)](_0x1eae08));}}else return this[_0x65bf44(0x162)]();}else{if(['bottom',_0x65bf44(0xa7)][_0x65bf44(0x10b)](_0x2312e4)){if(_0x65bf44(0x1bb)==='zwnPu'){function _0x1e3098(){const _0x33d9cd=_0x65bf44;this[_0x33d9cd(0x15a)]=![],this['_actor']?(this[_0x33d9cd(0x80)]=_0x3e412d[_0x33d9cd(0xcb)](this['_actor'][_0x33d9cd(0xe5)]()),this[_0x33d9cd(0x80)][_0x33d9cd(0x15b)](this[_0x33d9cd(0x121)][_0x33d9cd(0x1b5)](this))):this['bitmap']=new _0x50e017(0x1,0x1);}}else return this['playtimeWindowRectBottomStyle']();}else return VisuMZ[_0x65bf44(0x82)]['Settings'][_0x65bf44(0x11c)][_0x65bf44(0x119)][_0x65bf44(0x1fd)](this);}},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x162)]=function(){const _0x3d8689=_0x5899c9,_0x51927b=this[_0x3d8689(0xd5)](),_0x41b7ef=this[_0x3d8689(0x109)](0x1,![]),_0x4abeec=0x0,_0x199a58=this['mainAreaBottom']()-_0x41b7ef;return new Rectangle(_0x4abeec,_0x199a58,_0x51927b,_0x41b7ef);},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x95)]=function(){const _0x5be9ad=_0x5899c9,_0x41106a=this[_0x5be9ad(0xd5)](),_0x3c8296=this[_0x5be9ad(0x109)](0x1,![]),_0x34fe35=0x0,_0x5789cc=this[_0x5be9ad(0x13c)]();return new Rectangle(_0x34fe35,_0x5789cc,_0x41106a,_0x3c8296);},Scene_Menu['prototype'][_0x5899c9(0x11b)]=function(){const _0x19220a=_0x5899c9;if(!this[_0x19220a(0x1a8)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x5d278d=this['variableWindowRect']();this['_variableWindow']=new Window_MenuVariables(_0x5d278d),this[_0x19220a(0x1fb)]['setBackgroundType'](VisuMZ['MainMenuCore'][_0x19220a(0x178)][_0x19220a(0xf3)][_0x19220a(0xa8)]),this['addWindow'](this[_0x19220a(0x1fb)]);},Scene_Menu['prototype']['canCreateVariableWindow']=function(){const _0x29f481=_0x5899c9;return VisuMZ['MainMenuCore'][_0x29f481(0x178)]['Variable'][_0x29f481(0x1f4)];},Scene_Menu[_0x5899c9(0x1d3)]['adjustCommandHeightByVariable']=function(){const _0x2f6afa=_0x5899c9;return this[_0x2f6afa(0x1a8)]()&&VisuMZ[_0x2f6afa(0x82)][_0x2f6afa(0x178)][_0x2f6afa(0xf3)][_0x2f6afa(0x182)];},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x1a5)]=function(){const _0x14c111=_0x5899c9,_0xe23ef8=this[_0x14c111(0x1b0)]();if(['top',_0x14c111(0x16b),_0x14c111(0x1c9)][_0x14c111(0x10b)](_0xe23ef8)){if(_0x14c111(0x1f8)!==_0x14c111(0x1f8)){function _0x3a9ba8(){const _0x497e40=_0x14c111;if(_0x121838['Symbol']===_0x23d8e6){_0x44beb1[_0x497e40(0x1bf)][_0x497e40(0x1fd)](this,_0x407041);return;}}}else return this[_0x14c111(0xc2)]();}else return[_0x14c111(0x12f),'thinBottom'][_0x14c111(0x10b)](_0xe23ef8)?this[_0x14c111(0x176)]():VisuMZ[_0x14c111(0x82)][_0x14c111(0x178)][_0x14c111(0xf3)]['WindowRect'][_0x14c111(0x1fd)](this);},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0xc2)]=function(){const _0xc1fcc5=_0x5899c9,_0x37a64a=Graphics[_0xc1fcc5(0xc1)]-this[_0xc1fcc5(0x1d9)]['width']-(this[_0xc1fcc5(0x134)]?this['_playtimeWindow'][_0xc1fcc5(0x194)]:0x0),_0x303fd9=this[_0xc1fcc5(0x109)](0x1,![]),_0x52d70e=this[_0xc1fcc5(0x1d9)]['x']-_0x37a64a,_0x549104=this[_0xc1fcc5(0x1bc)]()-_0x303fd9;return new Rectangle(_0x52d70e,_0x549104,_0x37a64a,_0x303fd9);},Scene_Menu[_0x5899c9(0x1d3)]['variableWindowRectBottomStyle']=function(){const _0x3d6099=_0x5899c9,_0x199a4b=Graphics[_0x3d6099(0xc1)]-this['_goldWindow']['width']-(this[_0x3d6099(0x134)]?this[_0x3d6099(0x134)][_0x3d6099(0x194)]:0x0),_0x22e093=this['calcWindowHeight'](0x1,![]),_0x2bce55=this[_0x3d6099(0x1d9)]['x']-_0x199a4b,_0x2a6641=this[_0x3d6099(0x13c)]();return new Rectangle(_0x2bce55,_0x2a6641,_0x199a4b,_0x22e093);},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x113)]=function(){const _0x1f6d76=_0x5899c9;if(!this[_0x1f6d76(0x8d)]())return;const _0x3c0c7f=this[_0x1f6d76(0x1a5)]();this[_0x1f6d76(0x17a)]=new Window_Base(_0x3c0c7f),this[_0x1f6d76(0x17a)][_0x1f6d76(0xfd)](VisuMZ[_0x1f6d76(0x82)][_0x1f6d76(0x178)][_0x1f6d76(0xf3)][_0x1f6d76(0xa8)]),this[_0x1f6d76(0x9d)](this[_0x1f6d76(0x17a)]);},Scene_Menu[_0x5899c9(0x1d3)]['needsDummyWindow']=function(){const _0x4f0a03=_0x5899c9;if([_0x4f0a03(0x187),_0x4f0a03(0x1c9)][_0x4f0a03(0x10b)](this[_0x4f0a03(0x1b0)]()))return![];if(this[_0x4f0a03(0x1fb)])return![];return!![];},VisuMZ[_0x5899c9(0x82)][_0x5899c9(0x83)]=Scene_Menu['prototype'][_0x5899c9(0x1b3)],Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x1b3)]=function(){const _0x4dcbae=_0x5899c9;if(this[_0x4dcbae(0x191)]()&&this[_0x4dcbae(0xdd)])$gameParty['setTargetActor']($gameParty[_0x4dcbae(0x1cc)]()[0x0]),this[_0x4dcbae(0x70)]();else{if(this[_0x4dcbae(0x1b0)]()==='mobile')this[_0x4dcbae(0xdd)]['open']();VisuMZ[_0x4dcbae(0x82)][_0x4dcbae(0x83)]['call'](this);}},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x191)]=function(){const _0x589e02=_0x5899c9;return VisuMZ['MainMenuCore']['Settings']['General'][_0x589e02(0xbf)]&&$gameParty['members']()['length']<=0x1;},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x70)]=function(){const _0x534455=_0x5899c9,_0x32db67=this['_commandWindow'][_0x534455(0x1aa)](),_0x4c9435=this[_0x534455(0x19c)][_0x534455(0x16f)]();for(const _0x38bfae of Window_MenuCommand['_commandList']){if(_0x38bfae['Symbol']===_0x32db67){if(_0x534455(0x110)==='SPFmV'){_0x38bfae[_0x534455(0x1bf)][_0x534455(0x1fd)](this,_0x4c9435);return;}else{function _0x317740(){const _0x45477d=_0x534455;return this[_0x45477d(0x95)]();}}}}},VisuMZ[_0x5899c9(0x82)][_0x5899c9(0x96)]=Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x172)],Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x172)]=function(){const _0x27c944=_0x5899c9;VisuMZ['MainMenuCore'][_0x27c944(0x96)]['call'](this);if(this['commandWindowStyle']()===_0x27c944(0x1c9))this[_0x27c944(0xdd)]['close']();},Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x192)]=function(){const _0x112ac9=_0x5899c9,_0x46db91=parseInt(this[_0x112ac9(0x19c)][_0x112ac9(0x16f)]());if(_0x46db91)$gameTemp[_0x112ac9(0xf0)](_0x46db91),this[_0x112ac9(0xad)]();else{if(_0x112ac9(0x1ba)!==_0x112ac9(0x1df))this[_0x112ac9(0x19c)]['activate']();else{function _0x2bbfc2(){const _0x45a741=_0x112ac9;return this[_0x45a741(0x1a7)]()&&_0x291f96[_0x45a741(0x82)][_0x45a741(0x178)][_0x45a741(0x11c)][_0x45a741(0x182)];}}}},VisuMZ[_0x5899c9(0x82)]['Scene_Menu_commandFormation']=Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0xe3)],Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0xe3)]=function(){const _0x4c6411=_0x5899c9;VisuMZ[_0x4c6411(0x82)][_0x4c6411(0x1f9)][_0x4c6411(0x1fd)](this);if(this[_0x4c6411(0x1b0)]()===_0x4c6411(0x1c9))this[_0x4c6411(0xdd)][_0x4c6411(0x127)]();},VisuMZ['MainMenuCore'][_0x5899c9(0xf9)]=Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x1a4)],Scene_Menu[_0x5899c9(0x1d3)][_0x5899c9(0x1a4)]=function(){const _0x8c50d2=_0x5899c9;VisuMZ[_0x8c50d2(0x82)]['Scene_Menu_onFormationCancel'][_0x8c50d2(0x1fd)](this);if(this[_0x8c50d2(0x1b0)]()==='mobile')this[_0x8c50d2(0xdd)][_0x8c50d2(0x15d)]();};function Sprite_MenuBackgroundActor(){const _0x235b26=_0x5899c9;this[_0x235b26(0x11f)](...arguments);}Sprite_MenuBackgroundActor[_0x5899c9(0x1d3)]=Object['create'](Sprite[_0x5899c9(0x1d3)]),Sprite_MenuBackgroundActor['prototype'][_0x5899c9(0xd9)]=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0x5899c9(0x1d3)][_0x5899c9(0x11f)]=function(){const _0x44b094=_0x5899c9;this['_actor']=null,this[_0x44b094(0x15a)]=![],Sprite['prototype'][_0x44b094(0x11f)][_0x44b094(0x1fd)](this),this['x']=Graphics['width'];},Sprite_MenuBackgroundActor[_0x5899c9(0x1d3)][_0x5899c9(0x9b)]=function(_0x2fd82f){const _0x3a4258=_0x5899c9;this['_actor']!==_0x2fd82f&&(this['_actor']=_0x2fd82f,this[_0x3a4258(0xca)]());},Sprite_MenuBackgroundActor['prototype'][_0x5899c9(0xca)]=function(){const _0x4c5386=_0x5899c9;this[_0x4c5386(0x15a)]=![],this[_0x4c5386(0x1d4)]?(this[_0x4c5386(0x80)]=ImageManager[_0x4c5386(0xcb)](this[_0x4c5386(0x1d4)][_0x4c5386(0xe5)]()),this[_0x4c5386(0x80)][_0x4c5386(0x15b)](this[_0x4c5386(0x121)][_0x4c5386(0x1b5)](this))):this[_0x4c5386(0x80)]=new Bitmap(0x1,0x1);},Sprite_MenuBackgroundActor[_0x5899c9(0x1d3)][_0x5899c9(0x121)]=function(){const _0x106167=_0x5899c9;this[_0x106167(0x15a)]=!![],VisuMZ[_0x106167(0x82)]['Settings']['General'][_0x106167(0x7d)][_0x106167(0x1fd)](this);},Sprite_MenuBackgroundActor['prototype']['update']=function(){const _0x2e3e01=_0x5899c9;Sprite[_0x2e3e01(0x1d3)][_0x2e3e01(0x75)][_0x2e3e01(0x1fd)](this),this['_bitmapReady']&&(this[_0x2e3e01(0x1ac)](),this[_0x2e3e01(0x10c)](),this[_0x2e3e01(0x196)]());},Sprite_MenuBackgroundActor['prototype'][_0x5899c9(0x1ac)]=function(){const _0x52cdf0=_0x5899c9;if(this[_0x52cdf0(0x16c)]>0x0){if(_0x52cdf0(0x1e2)!==_0x52cdf0(0x1e2)){function _0x38b8d5(){return _0xa2e0c0(_0x2273c1['$2']);}}else{const _0x296811=this[_0x52cdf0(0x16c)];this[_0x52cdf0(0x1ea)]=(this['opacity']*(_0x296811-0x1)+0xff)/_0x296811;}}},Sprite_MenuBackgroundActor[_0x5899c9(0x1d3)][_0x5899c9(0x10c)]=function(){const _0x320e25=_0x5899c9;if(this[_0x320e25(0x16c)]>0x0){const _0x4b2bb3=this[_0x320e25(0x16c)];this['x']=(this['x']*(_0x4b2bb3-0x1)+this[_0x320e25(0x1de)])/_0x4b2bb3,this['y']=(this['y']*(_0x4b2bb3-0x1)+this[_0x320e25(0x99)])/_0x4b2bb3;}},Sprite_MenuBackgroundActor['prototype'][_0x5899c9(0x196)]=function(){const _0x6dd7a4=_0x5899c9;if(this[_0x6dd7a4(0x16c)]>0x0)this[_0x6dd7a4(0x16c)]--;},ImageManager[_0x5899c9(0x14c)]=ImageManager[_0x5899c9(0x14c)]||0x9,ImageManager[_0x5899c9(0x1cd)]=ImageManager[_0x5899c9(0x1cd)]||0x6,Window_Base[_0x5899c9(0x1d3)][_0x5899c9(0x6d)]=function(_0x97ec33,_0x492ecf,_0x1a3800){const _0x2207ba=_0x5899c9,_0x8fbc84=ImageManager[_0x2207ba(0x1c2)](_0x97ec33),_0x2b8724=_0x8fbc84[_0x2207ba(0x194)]/ImageManager[_0x2207ba(0x14c)],_0x7dc05a=_0x8fbc84[_0x2207ba(0x1e6)]/ImageManager[_0x2207ba(0x1cd)],_0x473775=0x0,_0x3d812c=0x0;this[_0x2207ba(0x1cf)][_0x2207ba(0xc4)](_0x8fbc84,_0x473775,_0x3d812c,_0x2b8724,_0x7dc05a,_0x492ecf-_0x2b8724/0x2,_0x1a3800-_0x7dc05a);},Window_MenuCommand[_0x5899c9(0xe0)]=VisuMZ['MainMenuCore'][_0x5899c9(0x178)][_0x5899c9(0x1e3)],VisuMZ[_0x5899c9(0x82)][_0x5899c9(0x106)]=Window_MenuCommand[_0x5899c9(0x1d3)][_0x5899c9(0x11f)],Window_MenuCommand['prototype'][_0x5899c9(0x11f)]=function(_0xe99921){const _0x4da328=_0x5899c9;VisuMZ['MainMenuCore'][_0x4da328(0x106)][_0x4da328(0x1fd)](this,_0xe99921),this[_0x4da328(0x7b)](_0xe99921);},Window_MenuCommand['prototype'][_0x5899c9(0x7b)]=function(_0x53ce49){const _0x5c72a7=_0x5899c9,_0x49b25d=new Rectangle(0x0,0x0,_0x53ce49[_0x5c72a7(0x194)],_0x53ce49[_0x5c72a7(0x1e6)]);this[_0x5c72a7(0x1ef)]=new Window_Base(_0x49b25d),this[_0x5c72a7(0x1ef)]['opacity']=0x0,this['addChild'](this['_commandNameWindow']),this[_0x5c72a7(0x12e)]();},Window_MenuCommand['prototype'][_0x5899c9(0x11a)]=function(){const _0x2d2691=_0x5899c9;Window_HorzCommand['prototype'][_0x2d2691(0x11a)][_0x2d2691(0x1fd)](this);if(this['_commandNameWindow'])this[_0x2d2691(0x12e)]();},Window_MenuCommand[_0x5899c9(0x1d3)][_0x5899c9(0x12e)]=function(){const _0x394bf2=_0x5899c9,_0x3e5024=this[_0x394bf2(0x1ef)];_0x3e5024['contents'][_0x394bf2(0x1e1)]();const _0x10d9f4=this[_0x394bf2(0x198)](this[_0x394bf2(0x90)]());if(_0x10d9f4===_0x394bf2(0x197)){if(_0x394bf2(0xb3)!==_0x394bf2(0x149)){const _0x24d038=this[_0x394bf2(0x160)](this['index']());let _0x1f6d0d=this['commandName'](this[_0x394bf2(0x90)]());_0x1f6d0d=_0x1f6d0d[_0x394bf2(0x11d)](/\\I\[(\d+)\]/gi,''),_0x3e5024[_0x394bf2(0xbe)](),this['commandNameWindowDrawBackground'](_0x1f6d0d,_0x24d038),this[_0x394bf2(0xa5)](_0x1f6d0d,_0x24d038),this[_0x394bf2(0x1c8)](_0x1f6d0d,_0x24d038);}else{function _0x46b78f(){const _0x1ed485=_0x394bf2,_0x51e743=this['itemLineRect'](_0x4a5c2a),_0xcd8fa9=this[_0x1ed485(0xe2)](_0x5f3831),_0x2b7b58=this[_0x1ed485(0x180)](_0xcd8fa9)['width'];this[_0x1ed485(0x136)](this[_0x1ed485(0x72)](_0xaa7882));let _0x47f941=this[_0x1ed485(0x165)]();if(_0x47f941==='right')this[_0x1ed485(0xd0)](_0xcd8fa9,_0x51e743['x']+_0x51e743[_0x1ed485(0x194)]-_0x2b7b58,_0x51e743['y'],_0x2b7b58);else{if(_0x47f941===_0x1ed485(0x154)){const _0x4758c8=_0x51e743['x']+_0x25cea8['floor']((_0x51e743[_0x1ed485(0x194)]-_0x2b7b58)/0x2);this['drawTextEx'](_0xcd8fa9,_0x4758c8,_0x51e743['y'],_0x2b7b58);}else this['drawTextEx'](_0xcd8fa9,_0x51e743['x'],_0x51e743['y'],_0x2b7b58);}}}}},Window_MenuCommand[_0x5899c9(0x1d3)][_0x5899c9(0x130)]=function(_0x55f005,_0x5a58ea){},Window_MenuCommand[_0x5899c9(0x1d3)][_0x5899c9(0xa5)]=function(_0x5c1ebe,_0x240b20){const _0x44aee1=_0x5899c9,_0x4f01a8=this[_0x44aee1(0x1ef)];_0x4f01a8[_0x44aee1(0xde)](_0x5c1ebe,0x0,_0x240b20['y'],_0x4f01a8[_0x44aee1(0x12b)],_0x44aee1(0x154));},Window_MenuCommand[_0x5899c9(0x1d3)][_0x5899c9(0x1c8)]=function(_0x51a61e,_0x4a379b){const _0x471fa0=_0x5899c9,_0x4d4d6e=this[_0x471fa0(0x1ef)],_0x273628=$gameSystem[_0x471fa0(0x150)](),_0x935e89=_0x4a379b['x']+Math['floor'](_0x4a379b[_0x471fa0(0x194)]/0x2)+_0x273628;_0x4d4d6e['x']=_0x4d4d6e[_0x471fa0(0x194)]/-0x2+_0x935e89,_0x4d4d6e['y']=Math[_0x471fa0(0xd8)](_0x4a379b[_0x471fa0(0x1e6)]/0x4);},Window_MenuCommand[_0x5899c9(0x1d3)]['itemHeight']=function(){const _0x573660=_0x5899c9,_0x14f9e8=SceneManager[_0x573660(0x1f7)]['commandWindowStyle']();if(_0x14f9e8===_0x573660(0x1c9)){const _0x2e6669=VisuMZ[_0x573660(0x82)]['Settings'][_0x573660(0x93)][_0x573660(0xae)];return this['lineHeight']()*_0x2e6669+0x8;}else return Window_Command['prototype'][_0x573660(0x174)][_0x573660(0x1fd)](this);},Window_MenuCommand[_0x5899c9(0x1d3)]['makeCommandList']=function(){const _0x4a382a=_0x5899c9;this[_0x4a382a(0xf5)]();},Window_MenuCommand[_0x5899c9(0x1d3)]['makeMainMenuCoreCommandList']=function(){const _0x4644f3=_0x5899c9;for(const _0x239418 of Window_MenuCommand['_commandList']){if('vjeIK'===_0x4644f3(0x98)){const _0x5cd087=_0x239418[_0x4644f3(0x138)];if(_0x239418[_0x4644f3(0x1da)][_0x4644f3(0x1fd)](this)){let _0x11333c=_0x239418[_0x4644f3(0xfe)];if(['',_0x4644f3(0x117)][_0x4644f3(0x10b)](_0x11333c))_0x11333c=_0x239418[_0x4644f3(0x1a9)][_0x4644f3(0x1fd)](this);const _0x18f63c=_0x239418[_0x4644f3(0x151)];_0x18f63c>0x0&&this[_0x4644f3(0xe8)]()!==_0x4644f3(0x17f)&&(_0x11333c=_0x4644f3(0xe1)[_0x4644f3(0x1ff)](_0x18f63c,_0x11333c));const _0xaa0c13=_0x239418[_0x4644f3(0x108)][_0x4644f3(0x1fd)](this),_0x16134a=_0x239418[_0x4644f3(0x88)][_0x4644f3(0x1fd)](this);this[_0x4644f3(0x169)](_0x11333c,_0x5cd087,_0xaa0c13,_0x16134a),this['setHandler'](_0x5cd087,_0x239418[_0x4644f3(0x10f)][_0x4644f3(0x1b5)](this,_0x16134a));}this[_0x4644f3(0x1b7)](_0x5cd087);}else{function _0x50a1d0(){const _0xe4a8f0=_0x4644f3,_0x707215=_0x573537[_0xe4a8f0(0xcb)](_0x1cd371[_0xe4a8f0(0xe5)]());_0x2ee6e8=(_0x131873||_0x20d012[_0xe4a8f0(0x1f2)])-0x2,_0x4a7c53=(_0x482718||_0x1ada6d[_0xe4a8f0(0xcc)])-0x2;const _0x5dab13=_0x707215[_0xe4a8f0(0x194)],_0x17c3ad=_0x707215[_0xe4a8f0(0x1e6)],_0x5a634c=_0x491274,_0x36573a=_0x4664a0-0x2,_0x1e0bdd=_0x2ae2c1+_0x136735[_0xe4a8f0(0xd8)](_0x5a634c/0x2),_0x458a6d=_0x507fd7+_0x11b88e[_0xe4a8f0(0xcf)]((_0x337102+_0x17c3ad)/0x2);this['constructor']===_0xb08a70&&this[_0xe4a8f0(0x136)](_0x4e8852[_0xe4a8f0(0x147)]());const _0x5b85f7=_0x4a8f6e[_0xe4a8f0(0x156)](_0x313bdd,_0x5dab13),_0x33f8b8=_0x3e3b7d[_0xe4a8f0(0x156)](_0x1ee197,_0x17c3ad),_0x7b1ecc=_0x117887+0x1,_0x1433ca=_0x5c0e18[_0xe4a8f0(0x77)](_0x5b4337+0x1,_0x5c99a8+_0x36573a-_0x17c3ad+0x3);let _0x33a48c=(_0x5dab13-_0x5b85f7)/0x2,_0x147086=(_0x17c3ad-_0x33f8b8)/0x2;_0x33a48c-=_0x4dd1e0[_0xe4a8f0(0xd4)](),_0x147086-=_0x1ff2fe[_0xe4a8f0(0x107)](),this[_0xe4a8f0(0x1cf)]['blt'](_0x707215,_0x33a48c,_0x147086,_0x5b85f7,_0x33f8b8,_0x7b1ecc,_0x1433ca),this['changePaintOpacity'](!![]);}}}},Window_MenuCommand['prototype'][_0x5899c9(0x1b7)]=function(_0x3477de){const _0x1b5b73=_0x5899c9;switch(_0x3477de){case _0x1b5b73(0xec):this['addMainCommands']();break;case _0x1b5b73(0x131):this[_0x1b5b73(0xe6)](),this[_0x1b5b73(0x1b4)]();break;case _0x1b5b73(0x19d):this[_0x1b5b73(0x13f)]();break;case _0x1b5b73(0x17c):this[_0x1b5b73(0x1be)]();break;case'gameEnd':this['addGameEndCommand']();break;}},Window_MenuCommand[_0x5899c9(0x1d3)][_0x5899c9(0x188)]=function(){},Window_MenuCommand[_0x5899c9(0x1d3)][_0x5899c9(0xe6)]=function(){},Window_MenuCommand[_0x5899c9(0x1d3)][_0x5899c9(0x1b4)]=function(){},Window_MenuCommand[_0x5899c9(0x1d3)]['addOptionsCommand']=function(){},Window_MenuCommand['prototype']['addSaveCommand']=function(){},Window_MenuCommand[_0x5899c9(0x1d3)][_0x5899c9(0x1e8)]=function(){},Window_MenuCommand[_0x5899c9(0x1d3)][_0x5899c9(0x1ed)]=function(){const _0x5035f8=_0x5899c9,_0x11041c=SceneManager[_0x5035f8(0x1f7)]['commandWindowStyle']();if([_0x5035f8(0x16b),_0x5035f8(0xa7)][_0x5035f8(0x10b)](_0x11041c)){if('rLIkf'!==_0x5035f8(0xe7))return this[_0x5035f8(0xab)]?this[_0x5035f8(0xa6)]():0x4;else{function _0x3d5d61(){const _0x4e754f=_0x5035f8;if(!this['canCreateVariableWindow']())return new _0x318c6a(0x0,0x0,0x0,0x0);const _0x1b3048=this['variableWindowRect']();this['_variableWindow']=new _0x27d380(_0x1b3048),this[_0x4e754f(0x1fb)][_0x4e754f(0xfd)](_0x865c1[_0x4e754f(0x82)]['Settings']['Variable'][_0x4e754f(0xa8)]),this[_0x4e754f(0x9d)](this['_variableWindow']);}}}else{if(_0x11041c!==_0x5035f8(0x187))return VisuMZ['MainMenuCore']['Settings']['CustomCmdWin'][_0x5035f8(0xbb)];else{if(_0x5035f8(0x92)===_0x5035f8(0x92))return Window_Command[_0x5035f8(0x1d3)][_0x5035f8(0x1ed)][_0x5035f8(0x1fd)](this);else{function _0x4a5f75(){const _0x988fff=_0x5035f8;return _0x550a87[_0x988fff(0x1d3)][_0x988fff(0x1ed)][_0x988fff(0x1fd)](this);}}}}},Window_MenuCommand['prototype'][_0x5899c9(0x165)]=function(){const _0x36c0aa=_0x5899c9;return VisuMZ[_0x36c0aa(0x82)][_0x36c0aa(0x178)][_0x36c0aa(0x93)][_0x36c0aa(0x12c)];},Window_MenuCommand[_0x5899c9(0x1d3)][_0x5899c9(0x157)]=function(_0x552608){const _0x87c27a=_0x5899c9,_0x1ca1c8=this[_0x87c27a(0x198)](_0x552608);if(_0x1ca1c8===_0x87c27a(0x1d5))this[_0x87c27a(0x118)](_0x552608);else{if(_0x1ca1c8===_0x87c27a(0x197))this[_0x87c27a(0x199)](_0x552608);else{if(_0x87c27a(0x200)===_0x87c27a(0xba)){function _0x1d74d7(){const _0x21c9ef=_0x87c27a;return this[_0x21c9ef(0x173)]();}}else Window_Command['prototype'][_0x87c27a(0x157)][_0x87c27a(0x1fd)](this,_0x552608);}}},Window_MenuCommand[_0x5899c9(0x1d3)][_0x5899c9(0xe8)]=function(){const _0x4d059f=_0x5899c9;return VisuMZ['MainMenuCore'][_0x4d059f(0x178)][_0x4d059f(0x93)][_0x4d059f(0x115)];},Window_MenuCommand[_0x5899c9(0x1d3)][_0x5899c9(0x198)]=function(_0x1cc585){const _0x4ef5b3=_0x5899c9,_0x319342=this[_0x4ef5b3(0xe8)]();if(_0x319342!==_0x4ef5b3(0x86)){if(_0x4ef5b3(0x1c6)===_0x4ef5b3(0x1c6))return _0x319342;else{function _0xb6e465(){const _0x559a60=_0x4ef5b3;return _0x5d21c6[_0x559a60(0x82)][_0x559a60(0x1e0)]['call'](this);}}}else{if(_0x4ef5b3(0x177)===_0x4ef5b3(0xc8)){function _0x56d590(){const _0x1685af=_0x4ef5b3;if(this[_0x1685af(0x16c)]>0x0)this[_0x1685af(0x16c)]--;}}else{const _0x2e7600=this[_0x4ef5b3(0xe2)](_0x1cc585);if(_0x2e7600[_0x4ef5b3(0x7f)](/\\I\[(\d+)\]/i)){if(_0x4ef5b3(0x1b6)!==_0x4ef5b3(0xc7)){const _0x32a7cb=this['itemLineRect'](_0x1cc585),_0x222025=this[_0x4ef5b3(0x180)](_0x2e7600)[_0x4ef5b3(0x194)];return _0x222025<=_0x32a7cb[_0x4ef5b3(0x194)]?_0x4ef5b3(0x1d5):_0x4ef5b3(0x197);}else{function _0x52fbca(){const _0x5cefea=_0x4ef5b3,_0x334ad6=this[_0x5cefea(0x12d)]();switch(_0x334ad6){case _0x5cefea(0xcd):case _0x5cefea(0x12a):case _0x5cefea(0xb0):return this[_0x5cefea(0x1c0)];case _0x5cefea(0x137):return _0x43c4cf['prototype']['itemHeight']['call'](this);case _0x5cefea(0x14e):return this[_0x5cefea(0x145)]()*0x2+0x8;default:return _0x489fd9[_0x5cefea(0x82)][_0x5cefea(0x105)][_0x5cefea(0x1fd)](this);}}}}else{if(_0x4ef5b3(0x11e)!==_0x4ef5b3(0xbc))return _0x4ef5b3(0x17f);else{function _0x58e55a(){return this['playtimeWindowRectTopStyle']();}}}}}},Window_MenuCommand[_0x5899c9(0x1d3)][_0x5899c9(0x118)]=function(_0x412017){const _0x507a2c=_0x5899c9,_0x506478=this[_0x507a2c(0x160)](_0x412017),_0x49f85a=this['commandName'](_0x412017),_0x28b1bb=this['textSizeEx'](_0x49f85a)[_0x507a2c(0x194)];this[_0x507a2c(0x136)](this[_0x507a2c(0x72)](_0x412017));let _0x5dda84=this[_0x507a2c(0x165)]();if(_0x5dda84==='right'){if(_0x507a2c(0x190)!==_0x507a2c(0x1dd))this[_0x507a2c(0xd0)](_0x49f85a,_0x506478['x']+_0x506478['width']-_0x28b1bb,_0x506478['y'],_0x28b1bb);else{function _0x48a6f0(){return 0x1;}}}else{if(_0x5dda84===_0x507a2c(0x154)){if(_0x507a2c(0xc9)!==_0x507a2c(0xc9)){function _0x552be6(){const _0x6216f7=_0x507a2c;this[_0x6216f7(0x17e)](0x0);}}else{const _0x474f8b=_0x506478['x']+Math[_0x507a2c(0xd8)]((_0x506478['width']-_0x28b1bb)/0x2);this[_0x507a2c(0xd0)](_0x49f85a,_0x474f8b,_0x506478['y'],_0x28b1bb);}}else{if(_0x507a2c(0x9c)==='TInlc')this[_0x507a2c(0xd0)](_0x49f85a,_0x506478['x'],_0x506478['y'],_0x28b1bb);else{function _0x561a5e(){const _0x22b83a=_0x507a2c,_0x311b6d=_0x1198a8[_0x22b83a(0x82)][_0x22b83a(0x178)][_0x22b83a(0x93)][_0x22b83a(0xae)];return this[_0x22b83a(0x145)]()*_0x311b6d+0x8;}}}}},Window_MenuCommand[_0x5899c9(0x1d3)][_0x5899c9(0x199)]=function(_0x4de24b){const _0x1693f1=_0x5899c9;this[_0x1693f1(0xe2)](_0x4de24b)['match'](/\\I\[(\d+)\]/i);const _0x3ec10d=Number(RegExp['$1']),_0x364db9=this[_0x1693f1(0x160)](_0x4de24b),_0x4ed429=_0x364db9['x']+Math[_0x1693f1(0xd8)]((_0x364db9['width']-ImageManager[_0x1693f1(0xa1)])/0x2),_0x3a3fcd=_0x364db9['y']+(_0x364db9['height']-ImageManager[_0x1693f1(0xf4)])/0x2;this['drawIcon'](_0x3ec10d,_0x4ed429,_0x3a3fcd);},VisuMZ[_0x5899c9(0x82)][_0x5899c9(0x103)]=Window_StatusBase[_0x5899c9(0x1d3)][_0x5899c9(0xf6)],Window_StatusBase[_0x5899c9(0x1d3)]['loadFaceImages']=function(){const _0x29e169=_0x5899c9;VisuMZ[_0x29e169(0x82)]['Window_StatusBase_loadFaceImages'][_0x29e169(0x1fd)](this),this['loadOtherActorImages']();},Window_StatusBase[_0x5899c9(0x1d3)][_0x5899c9(0x9f)]=function(){const _0x5f42b6=_0x5899c9;for(const _0x1676b5 of $gameParty[_0x5f42b6(0x1cc)]()){if(!_0x1676b5)continue;_0x1676b5[_0x5f42b6(0x6f)]()&&ImageManager[_0x5f42b6(0x141)](_0x1676b5['characterName']());if(_0x1676b5[_0x5f42b6(0x1d6)]()){if('rRimo'===_0x5f42b6(0xbd))ImageManager[_0x5f42b6(0x1c2)](_0x1676b5['battlerName']());else{function _0x131bfa(){const _0x27f6ec=_0x5f42b6;return this[_0x27f6ec(0x1ab)]()?_0x221797['battleMembers']()[_0x27f6ec(0x1bd)]:_0x286dbe[_0x27f6ec(0x82)][_0x27f6ec(0x1e0)][_0x27f6ec(0x1fd)](this);}}}if(_0x1676b5[_0x5f42b6(0xe5)]()){if(_0x5f42b6(0x1db)!==_0x5f42b6(0x100))ImageManager['loadPicture'](_0x1676b5['getMenuImage']());else{function _0x56026e(){const _0x788266=_0x5f42b6,_0x2307ac=_0x37d1e9[_0x788266(0xc1)]-this[_0x788266(0x1d9)][_0x788266(0x194)]-(this[_0x788266(0x134)]?this['_playtimeWindow']['width']:0x0),_0x526468=this[_0x788266(0x109)](0x1,![]),_0x3fc6e4=this[_0x788266(0x1d9)]['x']-_0x2307ac,_0x351525=this['mainAreaBottom']()-_0x526468;return new _0x2865fc(_0x3fc6e4,_0x351525,_0x2307ac,_0x526468);}}}}},Window_StatusBase[_0x5899c9(0x1d3)][_0x5899c9(0xe9)]=function(){const _0x5d6931=_0x5899c9;return VisuMZ[_0x5d6931(0x82)][_0x5d6931(0x178)][_0x5d6931(0x183)];},Window_StatusBase[_0x5899c9(0x1d3)][_0x5899c9(0x201)]=function(_0x459f7c,_0x1173b5,_0x2fb6df,_0x319258,_0xae446b){const _0x424348=_0x5899c9;_0x319258=_0x319258||ImageManager[_0x424348(0x1f2)],_0xae446b=_0xae446b||ImageManager[_0x424348(0xcc)];const _0x3d7be5=ImageManager[_0x424348(0x1f2)],_0x7accb1=_0xae446b-0x2,_0x21ad32=_0x1173b5+Math[_0x424348(0xd8)]((_0x319258-_0x3d7be5)/0x2);this['constructor']===Window_MenuStatus&&this[_0x424348(0x136)](_0x459f7c['isBattleMember']()),this['drawActorFace'](_0x459f7c,_0x21ad32,_0x2fb6df,_0x3d7be5,_0x7accb1),this[_0x424348(0x136)](!![]);},Window_StatusBase[_0x5899c9(0x1d3)][_0x5899c9(0x15c)]=function(_0x1cd763,_0x3138d1,_0x4c738f,_0x1a892b,_0x3b5e86){const _0x524975=_0x5899c9;_0x1a892b=_0x1a892b||ImageManager[_0x524975(0x1f2)],_0x3b5e86=_0x3b5e86||ImageManager[_0x524975(0xcc)];const _0x16efe2=_0x1cd763[_0x524975(0x6f)](),_0x261f98=_0x1cd763[_0x524975(0x139)](),_0x3a7a33=ImageManager['loadCharacter'](_0x16efe2),_0x227ae4=ImageManager[_0x524975(0xb2)](_0x16efe2),_0x17bcc1=_0x3a7a33[_0x524975(0x194)]/(_0x227ae4?0x3:0xc),_0x374503=_0x3a7a33[_0x524975(0x1e6)]/(_0x227ae4?0x4:0x8),_0x43063f=_0x1a892b,_0x4e675a=_0x3b5e86-0x2,_0x2acfa7=_0x3138d1+Math['floor'](_0x43063f/0x2),_0x384332=_0x4c738f+Math[_0x524975(0xcf)]((_0x3b5e86+_0x374503)/0x2);this['constructor']===Window_MenuStatus&&this['changePaintOpacity'](_0x1cd763[_0x524975(0x147)]());const _0x105fbd=Math[_0x524975(0x156)](_0x1a892b,_0x17bcc1),_0x5874d5=Math[_0x524975(0x156)](_0x3b5e86,_0x374503),_0x40fbb1=Math[_0x524975(0xd8)](_0x3138d1+Math[_0x524975(0x77)](_0x1a892b-_0x17bcc1,0x0)/0x2),_0x19a625=Math[_0x524975(0xd8)](_0x4c738f+Math[_0x524975(0x77)](_0x3b5e86-_0x374503,0x0)/0x2),_0x269c3e=_0x227ae4?0x0:_0x261f98,_0x414523=(_0x269c3e%0x4*0x3+0x1)*_0x17bcc1,_0x2a2608=Math[_0x524975(0xd8)](_0x269c3e/0x4)*0x4*_0x374503;this[_0x524975(0x1cf)][_0x524975(0xc4)](_0x3a7a33,_0x414523,_0x2a2608,_0x105fbd,_0x5874d5,_0x40fbb1,_0x19a625),this[_0x524975(0x136)](!![]);},Window_StatusBase[_0x5899c9(0x1d3)][_0x5899c9(0x16e)]=function(_0x15ed59,_0x21feb0,_0x304a9b,_0x4ab174,_0x3abed4){const _0x1a7a19=_0x5899c9;_0x4ab174=_0x4ab174||ImageManager[_0x1a7a19(0x1f2)],_0x3abed4=_0x3abed4||ImageManager[_0x1a7a19(0xcc)];const _0x52e9f7=ImageManager[_0x1a7a19(0x1c2)](_0x15ed59[_0x1a7a19(0x1d6)]()),_0x391bfd=_0x52e9f7[_0x1a7a19(0x194)]/ImageManager['svActorHorzCells'],_0x37071d=_0x52e9f7[_0x1a7a19(0x1e6)]/ImageManager[_0x1a7a19(0x1cd)],_0x425ae2=_0x4ab174,_0x5a2e02=_0x3abed4-0x2,_0x41d7c3=_0x21feb0+Math['floor'](_0x425ae2/0x2),_0x4e7f7e=_0x304a9b+Math[_0x1a7a19(0xcf)]((_0x3abed4+_0x37071d)/0x2);this['constructor']===Window_MenuStatus&&this['changePaintOpacity'](_0x15ed59[_0x1a7a19(0x147)]());const _0x386bc2=Math['min'](_0x4ab174,_0x391bfd),_0x6472f6=Math['min'](_0x3abed4,_0x37071d),_0x204d0c=Math[_0x1a7a19(0xd8)](_0x21feb0+Math[_0x1a7a19(0x77)](_0x4ab174-_0x391bfd,0x0)/0x2),_0x1a19a2=Math[_0x1a7a19(0xd8)](_0x304a9b+Math[_0x1a7a19(0x77)](_0x3abed4-_0x37071d,0x0)/0x2),_0x3428ad=0x0,_0x2cc02f=0x0;this[_0x1a7a19(0x1cf)][_0x1a7a19(0xc4)](_0x52e9f7,_0x3428ad,_0x2cc02f,_0x386bc2,_0x6472f6,_0x204d0c,_0x1a19a2),this[_0x1a7a19(0x136)](!![]);},Window_StatusBase['prototype'][_0x5899c9(0x1c3)]=function(_0x4845ce,_0xc458df,_0x1f5481,_0x3748b9,_0x958117){const _0x40150f=_0x5899c9,_0x1c7125=ImageManager[_0x40150f(0xcb)](_0x4845ce['getMenuImage']());_0x3748b9=(_0x3748b9||ImageManager[_0x40150f(0x1f2)])-0x2,_0x958117=(_0x958117||ImageManager['faceHeight'])-0x2;const _0x3cb975=_0x1c7125[_0x40150f(0x194)],_0x1c125e=_0x1c7125[_0x40150f(0x1e6)],_0x3690d0=_0x3748b9,_0x131007=_0x958117-0x2,_0x4da495=_0xc458df+Math[_0x40150f(0xd8)](_0x3690d0/0x2),_0x25ad86=_0x1f5481+Math[_0x40150f(0xcf)]((_0x958117+_0x1c125e)/0x2);this['constructor']===Window_MenuStatus&&this[_0x40150f(0x136)](_0x4845ce[_0x40150f(0x147)]());const _0xf5bdea=Math['min'](_0x3748b9,_0x3cb975),_0x4bf937=Math['min'](_0x958117,_0x1c125e),_0x3c9644=_0xc458df+0x1,_0x4a4375=Math['max'](_0x1f5481+0x1,_0x1f5481+_0x131007-_0x1c125e+0x3);let _0x305d41=(_0x3cb975-_0xf5bdea)/0x2,_0xa678e4=(_0x1c125e-_0x4bf937)/0x2;_0x305d41-=_0x4845ce['getMenuImageOffsetX'](),_0xa678e4-=_0x4845ce[_0x40150f(0x107)](),this['contents'][_0x40150f(0xc4)](_0x1c7125,_0x305d41,_0xa678e4,_0xf5bdea,_0x4bf937,_0x3c9644,_0x4a4375),this[_0x40150f(0x136)](!![]);},VisuMZ[_0x5899c9(0x82)][_0x5899c9(0x112)]=Window_MenuStatus[_0x5899c9(0x1d3)][_0x5899c9(0x19b)],Window_MenuStatus[_0x5899c9(0x1d3)][_0x5899c9(0x19b)]=function(){const _0x2566c8=_0x5899c9;if(VisuMZ['MainMenuCore'][_0x2566c8(0x178)]['General'][_0x2566c8(0x1b2)]){if('gCRZa'===_0x2566c8(0x1ad)){function _0x28f326(){const _0x1645e=_0x2566c8;let _0x56d0e7=_0x25800e[_0x1645e(0xfe)];if(['',_0x1645e(0x117)]['includes'](_0x56d0e7))_0x56d0e7=_0x2a6d72[_0x1645e(0x1a9)][_0x1645e(0x1fd)](this);const _0x291839=_0x21cd88[_0x1645e(0x151)];_0x291839>0x0&&this[_0x1645e(0xe8)]()!==_0x1645e(0x17f)&&(_0x56d0e7='\x5cI[%1]%2'[_0x1645e(0x1ff)](_0x291839,_0x56d0e7));const _0x344379=_0x3a28d0[_0x1645e(0x108)]['call'](this),_0x5b532e=_0x1f69df[_0x1645e(0x88)][_0x1645e(0x1fd)](this);this['addCommand'](_0x56d0e7,_0x59de63,_0x344379,_0x5b532e),this[_0x1645e(0x202)](_0x263969,_0x4d622a[_0x1645e(0x10f)][_0x1645e(0x1b5)](this,_0x5b532e));}}else VisuMZ[_0x2566c8(0x82)][_0x2566c8(0x112)]['call'](this);}else this[_0x2566c8(0x17e)](0x0);},VisuMZ[_0x5899c9(0x82)][_0x5899c9(0x1e0)]=Window_MenuStatus[_0x5899c9(0x1d3)][_0x5899c9(0xa6)],Window_MenuStatus[_0x5899c9(0x1d3)][_0x5899c9(0xa6)]=function(){const _0xea4e6=_0x5899c9;if(this['showOnlyBattleMembers']()){if(_0xea4e6(0xa2)==='IZPah')return $gameParty['battleMembers']()[_0xea4e6(0x1bd)];else{function _0x220a1a(){const _0x393cd7=_0xea4e6;_0x14fa98=_0x4f7a0d[_0x393cd7(0x77)](_0x33a6fe,_0x43446b);}}}else return VisuMZ[_0xea4e6(0x82)][_0xea4e6(0x1e0)][_0xea4e6(0x1fd)](this);},Window_MenuStatus[_0x5899c9(0x1d3)]['showOnlyBattleMembers']=function(){const _0x2e08c1=_0x5899c9,_0x11c74d=VisuMZ[_0x2e08c1(0x82)][_0x2e08c1(0x178)][_0x2e08c1(0x1c1)];if(_0x11c74d[_0x2e08c1(0x13a)]===undefined)_0x11c74d[_0x2e08c1(0x13a)]=!![];const _0x39c91e=SceneManager[_0x2e08c1(0x1f7)];if(!_0x11c74d[_0x2e08c1(0x13a)]){if(_0x11c74d[_0x2e08c1(0x111)])return _0x39c91e[_0x2e08c1(0xd9)]===Scene_Menu;return!![];}return![];},Window_MenuStatus['prototype'][_0x5899c9(0x12d)]=function(){const _0x38f0dd=_0x5899c9,_0x5385a0=SceneManager[_0x38f0dd(0x1f7)][_0x38f0dd(0xd9)];return _0x5385a0===Scene_Menu?VisuMZ[_0x38f0dd(0x82)][_0x38f0dd(0x178)][_0x38f0dd(0x78)]:VisuMZ[_0x38f0dd(0x82)][_0x38f0dd(0x178)][_0x38f0dd(0x126)];},Window_MenuStatus[_0x5899c9(0x1d3)][_0x5899c9(0x1af)]=function(){const _0xefc086=_0x5899c9,_0x472182=this[_0xefc086(0x12d)]();switch(_0x472182){case _0xefc086(0xcd):case _0xefc086(0x12a):return 0x1;case _0xefc086(0xb0):return 0x1;default:return $gameParty['maxBattleMembers']();}},Window_MenuStatus[_0x5899c9(0x1d3)]['maxCols']=function(){const _0x8eb511=_0x5899c9,_0x5c8fe0=this[_0x8eb511(0x12d)]();switch(_0x5c8fe0){case _0x8eb511(0xcd):case _0x8eb511(0x12a):return $gameParty[_0x8eb511(0x1d7)]();default:return 0x1;}},VisuMZ[_0x5899c9(0x82)]['Window_MenuStatus_itemHeight']=Window_MenuStatus['prototype'][_0x5899c9(0x174)],Window_MenuStatus['prototype']['itemHeight']=function(){const _0x224840=_0x5899c9,_0x751635=this['listStyle']();switch(_0x751635){case'vertical':case'portrait':case _0x224840(0xb0):return this[_0x224840(0x1c0)];case _0x224840(0x137):return Window_Selectable[_0x224840(0x1d3)][_0x224840(0x174)]['call'](this);case _0x224840(0x14e):return this['lineHeight']()*0x2+0x8;default:return VisuMZ[_0x224840(0x82)]['Window_MenuStatus_itemHeight'][_0x224840(0x1fd)](this);}},Window_MenuStatus[_0x5899c9(0x1d3)][_0x5899c9(0x157)]=function(_0x348b18){const _0x17fd5f=_0x5899c9;this['drawPendingItemBackground'](_0x348b18),this[_0x17fd5f(0x18a)](_0x348b18);},VisuMZ[_0x5899c9(0x82)][_0x5899c9(0xdc)]=Window_MenuStatus[_0x5899c9(0x1d3)][_0x5899c9(0x116)],Window_MenuStatus[_0x5899c9(0x1d3)][_0x5899c9(0xd2)]=function(_0x1dfdf5,_0x55ab42,_0x41ab79,_0x26c8b5,_0x34db4e){const _0x331b7c=_0x5899c9;switch(this[_0x331b7c(0xe9)]()){case _0x331b7c(0x18e):break;case _0x331b7c(0x18c):this[_0x331b7c(0x15c)](_0x1dfdf5,_0x55ab42,_0x41ab79+0x1,_0x26c8b5,_0x34db4e-0x2);break;case'svbattler':this['drawItemActorSvBattler'](_0x1dfdf5,_0x55ab42,_0x41ab79+0x1,_0x26c8b5,_0x34db4e-0x2);break;default:this[_0x331b7c(0x201)](_0x1dfdf5,_0x55ab42,_0x41ab79,_0x26c8b5,_0x34db4e);break;}},Window_MenuStatus[_0x5899c9(0x1d3)][_0x5899c9(0x18a)]=function(_0x14fac0){const _0x4c933c=_0x5899c9;this[_0x4c933c(0xbe)]();const _0x404f40=this[_0x4c933c(0x91)](_0x14fac0),_0x544d71=this['itemRect'](_0x14fac0),_0x37ed29=this[_0x4c933c(0x12d)]();switch(_0x37ed29){case _0x4c933c(0xcd):this[_0x4c933c(0x6e)](_0x404f40,_0x544d71);break;case _0x4c933c(0x12a):this[_0x4c933c(0x1ec)](_0x404f40,_0x544d71);break;case _0x4c933c(0xb0):this['drawItemStatusSoloStyle'](_0x404f40,_0x544d71);break;case _0x4c933c(0x137):this[_0x4c933c(0x166)](_0x404f40,_0x544d71);break;case _0x4c933c(0x14e):this[_0x4c933c(0xff)](_0x404f40,_0x544d71);break;default:this[_0x4c933c(0x1dc)](_0x404f40,_0x544d71);break;}},Window_MenuStatus[_0x5899c9(0x1d3)][_0x5899c9(0x6e)]=function(_0x1deab2,_0x46405e){const _0x486cbc=_0x5899c9;VisuMZ[_0x486cbc(0x82)]['Settings'][_0x486cbc(0x1fc)][_0x486cbc(0x15e)][_0x486cbc(0x1fd)](this,_0x1deab2,_0x46405e);},Window_MenuStatus[_0x5899c9(0x1d3)][_0x5899c9(0x1ec)]=function(_0x3e0e4b,_0x3834e8){const _0x2db3ab=_0x5899c9;if(_0x3e0e4b[_0x2db3ab(0xe5)]()!==''){const _0x3a4732=ImageManager[_0x2db3ab(0xcb)](_0x3e0e4b[_0x2db3ab(0xe5)]());_0x3a4732['addLoadListener'](this[_0x2db3ab(0x153)][_0x2db3ab(0x1b5)](this,_0x3e0e4b,_0x3834e8));}else{if(_0x2db3ab(0x1a3)===_0x2db3ab(0x1a3))this['drawItemStatusVerticalStyle'](_0x3e0e4b,_0x3834e8);else{function _0x573339(){const _0xc14103=_0x2db3ab;_0x5d5691[_0xc14103(0x82)]['Scene_Menu_onFormationCancel'][_0xc14103(0x1fd)](this);if(this['commandWindowStyle']()===_0xc14103(0x1c9))this[_0xc14103(0xdd)][_0xc14103(0x15d)]();}}}},Window_MenuStatus[_0x5899c9(0x1d3)]['drawItemStatusPortraitStyleOnLoad']=function(_0xda951d,_0x4c6706){const _0x581a76=_0x5899c9;VisuMZ['MainMenuCore']['Settings'][_0x581a76(0x1fc)][_0x581a76(0xd6)]['call'](this,_0xda951d,_0x4c6706);},Window_MenuStatus[_0x5899c9(0x1d3)][_0x5899c9(0x146)]=function(_0x27d0a8,_0x580ca7){const _0x40ccbc=_0x5899c9,_0x2e9c4f=ImageManager['loadPicture'](_0x27d0a8[_0x40ccbc(0xe5)]());_0x2e9c4f[_0x40ccbc(0x15b)](this[_0x40ccbc(0xa4)][_0x40ccbc(0x1b5)](this,_0x27d0a8,_0x580ca7));},Window_MenuStatus[_0x5899c9(0x1d3)]['drawItemStatusSoloStyleOnLoad']=function(_0x4e0ba8,_0x387cd2){const _0x500416=_0x5899c9;VisuMZ['MainMenuCore'][_0x500416(0x178)][_0x500416(0x1fc)][_0x500416(0x7c)][_0x500416(0x1fd)](this,_0x4e0ba8,_0x387cd2);},Window_MenuStatus['prototype'][_0x5899c9(0x166)]=function(_0x4228d3,_0x11fdc6){const _0x2d4a77=_0x5899c9;VisuMZ['MainMenuCore']['Settings'][_0x2d4a77(0x1fc)][_0x2d4a77(0x15f)][_0x2d4a77(0x1fd)](this,_0x4228d3,_0x11fdc6);},Window_MenuStatus[_0x5899c9(0x1d3)]['drawItemStatusThickerStyle']=function(_0x3c127b,_0x5d598e){const _0xe471cd=_0x5899c9;VisuMZ[_0xe471cd(0x82)]['Settings'][_0xe471cd(0x1fc)][_0xe471cd(0xaf)]['call'](this,_0x3c127b,_0x5d598e);},Window_MenuStatus['prototype'][_0x5899c9(0xb6)]=function(){const _0x3c2dcf=_0x5899c9,_0x363439=this[_0x3c2dcf(0x12d)]();if([_0x3c2dcf(0x137),'thicker']['includes'](_0x363439))return![];return Window_StatusBase['prototype']['isExpGaugeDrawn'][_0x3c2dcf(0x1fd)](this);},Window_MenuStatus[_0x5899c9(0x1d3)][_0x5899c9(0x1dc)]=function(_0x3ad1f0,_0x49eabc){const _0x421928=_0x5899c9;VisuMZ[_0x421928(0x82)][_0x421928(0x178)][_0x421928(0x1fc)][_0x421928(0x74)]['call'](this,_0x3ad1f0,_0x49eabc);},Window_SkillStatus[_0x5899c9(0x1d3)][_0x5899c9(0x89)]=function(_0xecb5f6,_0x36cfc3,_0x3e393f,_0x30f037,_0x5402ed){const _0x1fcb38=_0x5899c9;switch(this[_0x1fcb38(0xe9)]()){case'none':break;case'sprite':this['drawItemActorSprite'](_0xecb5f6,_0x36cfc3,_0x3e393f,_0x30f037,_0x5402ed);break;case _0x1fcb38(0x84):this[_0x1fcb38(0x16e)](_0xecb5f6,_0x36cfc3,_0x3e393f,_0x30f037,_0x5402ed);break;default:Window_StatusBase[_0x1fcb38(0x1d3)][_0x1fcb38(0x89)][_0x1fcb38(0x1fd)](this,_0xecb5f6,_0x36cfc3,_0x3e393f,_0x30f037,_0x5402ed);break;}},Window_EquipStatus['prototype'][_0x5899c9(0x89)]=function(_0x174983,_0x9ee988,_0x327dcd,_0x5d5a16,_0x59ea04){const _0x5321f8=_0x5899c9;switch(this[_0x5321f8(0xe9)]()){case _0x5321f8(0x18e):break;case _0x5321f8(0x18c):this[_0x5321f8(0x15c)](_0x174983,_0x9ee988,_0x327dcd,_0x5d5a16,_0x59ea04);break;case _0x5321f8(0x84):this['drawItemActorSvBattler'](_0x174983,_0x9ee988,_0x327dcd,_0x5d5a16,_0x59ea04);break;default:Window_StatusBase['prototype'][_0x5321f8(0x89)][_0x5321f8(0x1fd)](this,_0x174983,_0x9ee988,_0x327dcd,_0x5d5a16,_0x59ea04);break;}};function Window_ThinGold(){const _0x1f17b1=_0x5899c9;this[_0x1f17b1(0x11f)](...arguments);}Window_ThinGold[_0x5899c9(0x1d3)]=Object[_0x5899c9(0x164)](Window_Gold['prototype']),Window_ThinGold[_0x5899c9(0x1d3)][_0x5899c9(0xd9)]=Window_ThinGold,Window_ThinGold['prototype'][_0x5899c9(0x174)]=function(){return this['lineHeight']();},Window_ThinGold[_0x5899c9(0x1d3)]['colSpacing']=function(){const _0x546799=_0x5899c9;return Window_Selectable['prototype'][_0x546799(0x18d)][_0x546799(0x1fd)](this);};function Window_Playtime(){const _0x972539=_0x5899c9;this[_0x972539(0x11f)](...arguments);}Window_Playtime[_0x5899c9(0x1d3)]=Object[_0x5899c9(0x164)](Window_Selectable['prototype']),Window_Playtime[_0x5899c9(0x1d3)][_0x5899c9(0xd9)]=Window_Playtime,Window_Playtime[_0x5899c9(0x1d3)]['initialize']=function(_0x543dec){const _0x5ea78d=_0x5899c9;this[_0x5ea78d(0x1fe)]=$gameSystem[_0x5ea78d(0xa9)](),this[_0x5ea78d(0xeb)]=0x3c,Window_Selectable[_0x5ea78d(0x1d3)][_0x5ea78d(0x11f)][_0x5ea78d(0x1fd)](this,_0x543dec),this['refresh']();},Window_Playtime[_0x5899c9(0x1d3)][_0x5899c9(0x174)]=function(){const _0x39b442=_0x5899c9;return this[_0x39b442(0x145)]();},Window_Playtime[_0x5899c9(0x1d3)]['update']=function(){const _0x2b095a=_0x5899c9;Window_Selectable[_0x2b095a(0x1d3)][_0x2b095a(0x75)]['call'](this),this[_0x2b095a(0x104)]();},Window_Playtime[_0x5899c9(0x1d3)][_0x5899c9(0x104)]=function(){const _0x4796c4=_0x5899c9;if(this[_0x4796c4(0xeb)]-->0x0){if(_0x4796c4(0x79)!==_0x4796c4(0x79)){function _0x41789f(){return _0x3f65a0(_0x26c3ee['$1']);}}else{if(this[_0x4796c4(0xeb)]<=0x0)this[_0x4796c4(0x13d)]();}}},Window_Playtime[_0x5899c9(0x1d3)][_0x5899c9(0x13d)]=function(){const _0x4edcb6=_0x5899c9;this[_0x4edcb6(0xeb)]=0x3c;const _0x33aae9=this[_0x4edcb6(0x160)](0x0),_0x5e08b6=_0x33aae9['x'],_0xe09b8a=_0x33aae9['y'],_0x3d95c5=_0x33aae9[_0x4edcb6(0x194)];this[_0x4edcb6(0x1cf)][_0x4edcb6(0x1e1)](),this[_0x4edcb6(0x71)](_0x33aae9),this[_0x4edcb6(0x148)](_0x33aae9),this['drawPlaytime'](_0x33aae9);},Window_Playtime[_0x5899c9(0x1d3)]['resetFontSettings']=function(){const _0x59ee9b=_0x5899c9;Window_Selectable[_0x59ee9b(0x1d3)][_0x59ee9b(0xbe)][_0x59ee9b(0x1fd)](this),this['contents']['fontSize']=VisuMZ[_0x59ee9b(0x82)][_0x59ee9b(0x178)][_0x59ee9b(0x11c)][_0x59ee9b(0x10e)];},Window_Playtime[_0x5899c9(0x1d3)][_0x5899c9(0x71)]=function(_0x16cc3d){const _0x413ae6=_0x5899c9;if(VisuMZ[_0x413ae6(0x82)][_0x413ae6(0x178)][_0x413ae6(0x11c)][_0x413ae6(0x151)]>0x0){const _0x452799=VisuMZ[_0x413ae6(0x82)][_0x413ae6(0x178)][_0x413ae6(0x11c)][_0x413ae6(0x151)],_0x276682=_0x16cc3d['y']+(this[_0x413ae6(0x145)]()-ImageManager[_0x413ae6(0xf4)])/0x2;this['drawIcon'](_0x452799,_0x16cc3d['x'],_0x276682);const _0x458baa=ImageManager[_0x413ae6(0xa1)]+0x4;_0x16cc3d['x']+=_0x458baa,_0x16cc3d['width']-=_0x458baa;}},Window_Playtime[_0x5899c9(0x1d3)]['drawTimeLabel']=function(_0x1f61c0){const _0x3c3d67=_0x5899c9;this[_0x3c3d67(0xbe)](),this[_0x3c3d67(0x181)](ColorManager[_0x3c3d67(0x170)]());const _0x3cdb90=VisuMZ['MainMenuCore'][_0x3c3d67(0x178)][_0x3c3d67(0x11c)][_0x3c3d67(0xe4)];this[_0x3c3d67(0xde)](_0x3cdb90,_0x1f61c0['x'],_0x1f61c0['y'],_0x1f61c0[_0x3c3d67(0x194)],_0x3c3d67(0xb8)),this[_0x3c3d67(0x8b)]();},Window_Playtime['prototype'][_0x5899c9(0xb9)]=function(_0x487e8){const _0x1b2b35=_0x5899c9,_0x1462c6=$gameSystem['playtimeText']();this[_0x1b2b35(0xde)](_0x1462c6,_0x487e8['x'],_0x487e8['y'],_0x487e8[_0x1b2b35(0x194)],_0x1b2b35(0x167));};function Window_MenuVariables(){const _0x329e2b=_0x5899c9;this[_0x329e2b(0x11f)](...arguments);}Window_MenuVariables['prototype']=Object['create'](Window_Selectable[_0x5899c9(0x1d3)]),Window_MenuVariables[_0x5899c9(0x1d3)][_0x5899c9(0xd9)]=Window_MenuVariables,Window_MenuVariables['prototype']['initialize']=function(_0x327941){const _0xd133c9=_0x5899c9;Window_Selectable['prototype'][_0xd133c9(0x11f)][_0xd133c9(0x1fd)](this,_0x327941),this[_0xd133c9(0x142)]=VisuMZ[_0xd133c9(0x82)][_0xd133c9(0x178)][_0xd133c9(0xf3)][_0xd133c9(0xb1)],this[_0xd133c9(0x13d)]();},Window_MenuVariables['prototype'][_0x5899c9(0x174)]=function(){const _0x50d102=_0x5899c9;return this[_0x50d102(0x145)]();},Window_MenuVariables[_0x5899c9(0x1d3)]['maxCols']=function(){const _0x5609af=_0x5899c9,_0x24f2d8=SceneManager[_0x5609af(0x1f7)][_0x5609af(0x1b0)]();if(_0x24f2d8==='default'){if('QNDWc'!==_0x5609af(0x124))return 0x1;else{function _0x14dfb6(){const _0x458df1=_0x5609af,_0xe0563c=_0x138dea[_0x458df1(0x1e6)]-this[_0x458df1(0x109)](0x1,![]);_0x58b42c['y']+=_0xe0563c;}}}else return VisuMZ[_0x5609af(0x82)][_0x5609af(0x178)][_0x5609af(0xf3)]['VarList'][_0x5609af(0x1bd)];},Window_MenuVariables[_0x5899c9(0x1d3)][_0x5899c9(0xbe)]=function(){const _0x22e01b=_0x5899c9;Window_Selectable[_0x22e01b(0x1d3)][_0x22e01b(0xbe)][_0x22e01b(0x1fd)](this),this['contents'][_0x22e01b(0xd7)]=VisuMZ['MainMenuCore'][_0x22e01b(0x178)][_0x22e01b(0xf3)][_0x22e01b(0x10e)],this['changeTextColor'](ColorManager['systemColor']());},Window_MenuVariables[_0x5899c9(0x1d3)][_0x5899c9(0xa6)]=function(){const _0x3cf33b=_0x5899c9;return this[_0x3cf33b(0x142)][_0x3cf33b(0x1bd)];},Window_MenuVariables[_0x5899c9(0x1d3)][_0x5899c9(0x1d1)]=function(){const _0x388aae=_0x5899c9,_0x36a3a7=this[_0x388aae(0x140)]();for(let _0x58b2fc=0x0;_0x58b2fc<this[_0x388aae(0x14f)]();_0x58b2fc++){if(_0x388aae(0x1e4)!==_0x388aae(0x8e)){const _0x287951=_0x36a3a7+_0x58b2fc;_0x287951<this[_0x388aae(0xa6)]()&&(this[_0x388aae(0x14b)](_0x287951),this['drawItem'](_0x287951));}else{function _0xce0fb7(){const _0x31fa50=_0x388aae;_0x2c4da6[_0x31fa50(0x171)](_0x46a4fa);}}}},Window_MenuVariables['prototype'][_0x5899c9(0x14b)]=function(_0xbb85fd){},Window_MenuVariables['prototype'][_0x5899c9(0x157)]=function(_0x3db480){const _0x3a5b2d=_0x5899c9,_0x5040de=this['_data'][_0x3db480];if(_0x5040de<=0x0)return;if(!$dataSystem['variables'][_0x5040de])return;const _0x4722e4=this[_0x3a5b2d(0x160)](_0x3db480);this[_0x3a5b2d(0xbe)]();let _0x3928e3=0x0,_0x43336d=$dataSystem[_0x3a5b2d(0x1d2)][_0x5040de]['trim']();_0x43336d[_0x3a5b2d(0x7f)](/\\I\[(\d+)\]/i)&&(_0x3928e3=Number(RegExp['$1']),_0x43336d=_0x43336d[_0x3a5b2d(0x11d)](/\\I\[(\d+)\]/i,'')[_0x3a5b2d(0x123)]());if(_0x3928e3>0x0){if(_0x3a5b2d(0x14a)===_0x3a5b2d(0x14a)){const _0x1f1588=_0x4722e4['y']+(this[_0x3a5b2d(0x145)]()-ImageManager['iconHeight'])/0x2;this[_0x3a5b2d(0x10d)](_0x3928e3,_0x4722e4['x'],_0x1f1588);const _0x40f01f=ImageManager[_0x3a5b2d(0xa1)]+0x4;_0x4722e4['x']+=_0x40f01f,_0x4722e4[_0x3a5b2d(0x194)]-=_0x40f01f;}else{function _0x467897(){const _0x21886f=_0x3a5b2d;return _0x5d2162[_0x21886f(0x82)][_0x21886f(0x178)][_0x21886f(0x1c1)][_0x21886f(0xf2)]['includes'](this[_0x21886f(0xd9)]['name']);}}}this[_0x3a5b2d(0xde)](_0x43336d,_0x4722e4['x'],_0x4722e4['y'],_0x4722e4[_0x3a5b2d(0x194)],_0x3a5b2d(0xb8)),this[_0x3a5b2d(0x181)](ColorManager[_0x3a5b2d(0x1e7)]()),this['drawText']($gameVariables[_0x3a5b2d(0x1eb)](_0x5040de),_0x4722e4['x'],_0x4722e4['y'],_0x4722e4['width'],_0x3a5b2d(0x167));};