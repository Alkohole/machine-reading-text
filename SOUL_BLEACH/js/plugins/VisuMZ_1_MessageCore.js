//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.18;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.18] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<x>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<x>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace 'x' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
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
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
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
 * @param MessageCore
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
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
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
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 */
//=============================================================================

const _0x1bb7=['ConvertParams','calcWindowHeight','blt','</B>','HiBJF','7674YMhFRS','fpMgI','filter','windowWidth','obtainEscapeString','clearActorNameAutoColor','ParseItemNotetags','qmgKI','\x1bCOLORLOCK[1]','ZlAKb','NzgSY','height','ParseSkillNotetags','FontChangeValue','\x1bBOLD[0]','FastForwardKey','processAllText','Game_Map_setupEvents','AkhFc','defeat','toUpperCase','defaultColor','onNewPageMessageCore','processAutoSize','processColorLock','changeTextColor','updateEvents','PmYSO','_interpreter','znLFj','LineHeight','<B>','exit','moveTo','aQLSO','partyMemberName','IacHm','setWaitMode','updateOffsetPosition','LineBreakSpace','_moveEasingType','TextAlign','textSizeEx','toLowerCase','IhoVg','isChoiceVisible','format','updateDimensions','fontFace','tRGKa','LIyWz','TextCodeActions','messagePositionReset','lineHeight','Window_Help_refresh','drawing','_MessageCoreSettings','YuFGR','TextStr','_moveTargetWidth','addContinuousShowChoices','470947AXIchi','TightWrap','mHWUU','iuifl','registerCommand','Window_NameBox_refresh','applyData','\x1bWrapBreak[0]','setMessageWindowWordWrap','uDEhd','inBattle','addMessageCoreTextSpeedCommand','map\x20actor','Default','clampPlacementPosition','SortObjectByKeyLength','adjustShowChoiceExtension','event','PICTURE','iNSNT','isBreakShowTextCommands','updateTransform','Window_ChoiceList_updatePlacement','isContinuePrepareShowTextCommands','processDrawPicture','adjustShowChoiceCancel','1ABdvPD','isSceneBattle','yMXbq','_index','launchMessageCommonEvent','addWrapBreakAfterPunctuation','makeCommandList','getTextAlignment','battle\x20enemy','fofHD','startWait','changeOutlineColor','_messageCommonEvents','ChoiceWindowMaxRows','JdLRo','MessageWidth','setTextAlignment','Type','SIsUY','Window_Base_changeTextColor','value','HAwly','</RIGHT>','index','indexOf','shift','AddAutoColor','process_VisuMZ_MessageCore_TextCodes_Action','setRelativePosition','_moveDuration','EMJsQ','ARRAYJSON','omYRs','ConfigManager_applyData','ChoiceWindowLineHeight','<CENTER>','VisuMZ_0_CoreEngine','rtl','zIUvm','ChoiceWindowMaxCols','messageWidth','Instant','convertTextMacros','wXqzi','ConfigManager_makeData','updatePlacement','119037QwwjWy','_textColorStack','TextColor','ParseClassNotetags','addGeneralOptions','lastGainedObjectQuantity','SWITCH','message','currentExt','KTRXY','wkBLi','processPreviousColor','isTriggered','registerActorNameAutoColorChanges','push','CommonEvent','sAxyP','Game_System_initialize','processWrapBreak','processMessageCoreEscapeActions','DdNXU','_autoPositionTarget','outputWidth','startX','</WORDWRAP>','Game_Map_updateEvents','resetWordWrap','mYSNm','min','Armors','currentCommand','_nameBoxWindow','General','innerHeight','maxCommands','choice','AdjustRect','splice','TEXTALIGNMENT','bind','resetFontSettings','_textDelayCount','map\x20party','CreateAutoColorRegExpListEntries','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','replace','processCharacter','flushTextState','MessageTextDelay','initTextAlignement','FontSmallerCap','Weapons','drawBackPicture','Window_Message_updatePlacement','applyMoveEasing','easeInOut','Game_Map_initialize','_moveTargetY','isAutoColorAffected','Window_Options_statusText','includes','_messagePositionReset','_resetRect','Window_Options_isVolumeSymbol','NameBoxWindowOffsetY','convertMessageCoreEscapeActions','obtainEscapeParam','lastGainedObjectName','_data','Undefined','databaseObjectName','Scene_Boot_onDatabaseLoaded','NUM','HlXIR','changePaintOpacity','paintOpacity','EVAL','SsLQV','mainFontFace','postConvertEscapeCharacters','QUGaL','round','MessageCore','normalColor','Window_Message_terminateMessage','type','update','dGnVd','makeData','maxChoiceWidth','jhoKc','length','Window_Message_newPage','NIDvF','false','_list','resetTextColor','<RIGHT>','maxLines','processPyTextCode','createContents','floor','States','gainItem','DztTw','setColorLock','Window_ChoiceList_windowX','Tqpam','_autoSizeCheck','registerResetRect','\x1bTEXTALIGNMENT[0]','substring','_autoPosRegExp','maxCols','isCommandEnabled','pctEK','instantTextSpeed','return\x20\x27','yfJda','<LEFT>','choiceTextAlign','getChoiceListMaxColumns','Classes','resetRect','BOLD','choicePositionType','refresh','<COLORLOCK>','cmOWm','setupChoices','statusText','STRUCT','drawTextEx','outputHeight','Window_Base_processEscapeCharacter','PKcee','updateOverlappingY','windowX','textSpeedStatusText','ITALIC','Window_Message_clearFlags','convertVariableEscapeCharacters','xPxPZ','convertMessageCoreEscapeReplacements','rvqdq','isRunning','description','add','[0]','choiceLineHeight','trim','windowPadding','MessageWindow','followers','text','setSpeakerName','GSHpL','SKkSf','_moveTargetX','numVisibleRows','constructor','newPage','contents','<BR>','itemPadding','setChoiceListMaxColumns','_wholeMoveDuration','pGlkJ','ParseEnemyNotetags','setHelpWindowWordWrap','ConvertTextAutoColorRegExpFriendly','setLastGainedItemData','isHelpWindowWordWrap','CreateAutoColorFor','outlineWidth','nextEventCode','ENABLE','textCodeResult','_autoSizeRegexp','ARRAYFUNC','TextSpeed','Window_Message_synchronizeNameBox','\x1bi[%1]%2','ARRAYNUM','1IatSwG','call','UTaYh','nkhUo','Name','Game_Party_initialize','VCway','isMessageWindowWordWrap','URTZU','EiFxJ','getChoiceListTextAlign','MessageRows','addCommand','initMessageCore','messageWordWrap','\x1bC[%1]%2\x1bPREVCOLOR[0]','members','_cancelButton','\x1bTEXTALIGNMENT','synchronizeNameBox','processEscapeCharacter','_autoColorActorNames','Window_Base_initialize','ZaRHd','iconIndex','_indent','_eventId','cENhJ','uolnV','clearCommandList','updateNameBoxMove','updateMove','selectDefault','TextMacros','AddOption','getMessageWindowWidth','victory','OQuZa','_lastGainedItemData','ChoiceWindowTextAlign','getChoiceListMaxRows','levelUp','CreateAutoColorRegExpLists','textSizeExTextAlignment','DefaultOutlineWidth','teHuv','\x1bITALIC[0]','_textAlignment','WordWrap','anchor','getLastGainedItemData','stretchDimmerSprite','actorName','textCodeCheck','Items','_spriteset','process_VisuMZ_MessageCore_TextCodes_Replace','createTextState','clearFlags','setMessageWindowWidth','tRKzX','obtainExp','MessageWindowProperties','JcblM','QqDto','makeDeepCopy','parameters','default','messageCoreWindowX',')))','padding','setMessageWindowRows','iNCLz','findTargetSprite','tqgVf','SWITCHES','isPressed','messageCoreTextSpeed','updateAutoPosition','isItem','updateMessageCommonEvents','HyAcn','textColor','Match','processCommonEvent','NMRTk','colSpacing','Window_Options_addGeneralOptions','fontSize','substr','<WORDWRAP>','Window_Base_processControlCharacter','escapeStart','choiceCols','quantity','AwdNK','YBERK','textSpeed','itemLineRect','applyDatabaseAutoColor','Actors','Center','emerge','xEyYn','processTextAlignmentX','vYqbE','OqBnC','code','left','resetPositionX','Enemies','updateAutoSizePosition','_messageWindow','preConvertEscapeCharacters','isSceneMap','FexOd','fontItalic','RelativePXPY','makeFontBigger','boxHeight','setPositionType','PCkpB','process_VisuMZ_MessageCore_AutoColor','changeVolume','STR','processFontChangeBold','rtjWS','fontBold','name','processTextAlignmentChange','changeTextSpeed','setTextDelay','refreshDimmerBitmap','convertLockColorsEscapeCharacters','adjustShowChoiceDefault','clamp','FUNC','setChoiceListMaxRows','loadPicture','center','VGiEh','battle\x20party','_wordWrap','<%1>','processFsTextCode','isArmor','337196IxvWfS','processControlCharacter','width','_commonEventId','_showFast','\x1bBOLD[1]','innerWidth','ParseArmorNotetags','tEnRG','parse','start','oMdje','mainFontSize','follower','myevr','terminateMessage','choiceRows','_centerMessageWindow','</CENTER>','414227cJLKsz','_moveTargetHeight','Window_Options_changeVolume','_scene','open','updateRelativePosition','83872SOQUZh','textSizeExWordWrap','makeFontSmaller','FqrnI','processAutoColorWords','ARRAYSTR','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','convertBaseEscapeCharacters','COMMONEVENT','isWeapon','calcMoveEasing','map\x20player','return\x200','outLineColor','processAutoPosition','sort','COLORLOCK','commandSymbol','convertBackslashCharacters','setupEvents','Window_Base_textSizeEx','outlineColor','processDrawCenteredPicture','isWordWrapEnabled','openness','Skills','AutoColor','Window_Message_isTriggered','CDBQZ','HIDE','right','initialize','status','remove','helpWordWrap','nTfPu','onDatabaseLoaded','SXAXa','Window_Base_processNewLine','ALL','qOzqd','returnPreservedFontSettings','setFaceImage','TextCodeReplace','\x1bTEXTALIGNMENT[1]','FontBiggerCap','ParseWeaponNotetags','ParseAllNotetags','setChoiceListTextAlign','slice','<I>','prepareWordWrapEscapeCharacters','addMessageCommonEvent','processCustomWait','Window_Base_processAllText','ARRAYEVAL','addContinuousShowTextCommands','StretchDimmedBg','exec','obtainGold','35QPAuqh','ParseStateNotetags','pgFcO','prototype','qAozP','isVolumeSymbol','CENTERPICTURE','callOkHandler','ChoiceWindowProperties','_relativePosition','faceName','join','upOgp','HelpWindow','split','addLoadListener','boxWidth','setup','processActorNameAutoColorChanges','prepareShowTextCommand','updateBackground','clear','textWidth','getMessageWindowRows','map\x20event','\x1bITALIC[1]','wrOIz','processFontChangeItalic','Window_Message_processEscapeCharacter','match','onProcessCharacter','battle\x20actor','TextManager_message','test','Game_Party_gainItem','processNewLine','faceWidth','_dimmerSprite','AutoColorRegExp','ActionJS','actor','getPreservedFontSettings','MaxCols','convertShowChoiceEscapeCodes','indent','getConfigValue','setWordWrap','\x1bTEXTALIGNMENT[3]','onChoice','addMessageCoreCommands','MiVnT','TextJS','_colorLock','messageRows','canMove','ceil','Settings','true','choices','changeValue','setChoiceListLineHeight','Width','493233oSPYCX','Game_Interpreter_setupChoices','close','TABNS','startY','convertTextAlignmentEscapeCharacters','postFlushTextState','convertFontSettingsEscapeCharacters','_positionType','list','_textDelay','addExtraShowChoices','MAVbS','placeCancelButton','isChoiceEnabled','setBackground','isColorLocked','isBusy','map','oBvoe','none','prepareAutoSizeEscapeCharacters','ANY','contentsBack','</I>','process_VisuMZ_MessageCore_TextMacros','max','getChoiceListLineHeight','Window_Base_update'];const _0x42f345=_0x22a2;(function(_0x1c1a7a,_0x2826dc){const _0x3aee52=_0x22a2;while(!![]){try{const _0x3168d7=parseInt(_0x3aee52(0x1f8))*parseInt(_0x3aee52(0x198))+-parseInt(_0x3aee52(0x24f))*-parseInt(_0x3aee52(0x27d))+parseInt(_0x3aee52(0x235))+-parseInt(_0x3aee52(0x1d6))+parseInt(_0x3aee52(0x156))+-parseInt(_0x3aee52(0x15c))+parseInt(_0x3aee52(0x335))*-parseInt(_0x3aee52(0x143));if(_0x3168d7===_0x2826dc)break;else _0x1c1a7a['push'](_0x1c1a7a['shift']());}catch(_0x5d8ce2){_0x1c1a7a['push'](_0x1c1a7a['shift']());}}}(_0x1bb7,0x57864));function _0x22a2(_0x46d4a9,_0x341d79){_0x46d4a9=_0x46d4a9-0xb6;let _0x1bb79b=_0x1bb7[_0x46d4a9];return _0x1bb79b;}var label='MessageCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x42f345(0x1fa)](function(_0x2d2903){const _0x4a74d4=_0x42f345;return _0x2d2903['status']&&_0x2d2903[_0x4a74d4(0x30f)][_0x4a74d4(0x2b9)]('['+label+']');})[0x0];VisuMZ[label][_0x42f345(0x1d0)]=VisuMZ[label][_0x42f345(0x1d0)]||{},VisuMZ['ConvertParams']=function(_0x41535b,_0x2e66c5){const _0x254706=_0x42f345;for(const _0xaa90f3 in _0x2e66c5){if(_0x254706(0x2ca)!==_0x254706(0x2ca)){function _0x3aa7f7(){const _0x34d11d=_0x254706,_0x48e115=_0x2aee9f[_0x34d11d(0x2cf)][_0x34d11d(0x1d0)]['General'],_0xb21ee1=_0x23d933[_0x34d11d(0x2cf)]['Settings'][_0x34d11d(0xe1)];this[_0x34d11d(0x230)]={'messageRows':_0x48e115['MessageRows'],'messageWidth':_0x48e115[_0x34d11d(0x25e)],'messageWordWrap':_0xb21ee1[_0x34d11d(0x315)],'helpWordWrap':_0xb21ee1[_0x34d11d(0x1a5)],'choiceLineHeight':_0x48e115[_0x34d11d(0x271)],'choiceRows':_0x48e115[_0x34d11d(0x25c)],'choiceCols':_0x48e115[_0x34d11d(0x276)],'choiceTextAlign':_0x48e115[_0x34d11d(0xd8)]};}}else{if(_0xaa90f3[_0x254706(0x1b5)](/(.*):(.*)/i)){if(_0x254706(0x124)==='FexOd'){const _0x30dfac=String(RegExp['$1']),_0x3cecf7=String(RegExp['$2'])[_0x254706(0x20c)]()[_0x254706(0x313)]();let _0x490ab3,_0x1d3839,_0x46f592;switch(_0x3cecf7){case _0x254706(0x2c5):_0x490ab3=_0x2e66c5[_0xaa90f3]!==''?Number(_0x2e66c5[_0xaa90f3]):0x0;break;case _0x254706(0x334):_0x1d3839=_0x2e66c5[_0xaa90f3]!==''?JSON['parse'](_0x2e66c5[_0xaa90f3]):[],_0x490ab3=_0x1d3839[_0x254706(0x1e8)](_0x2df8ef=>Number(_0x2df8ef));break;case _0x254706(0x2c9):_0x490ab3=_0x2e66c5[_0xaa90f3]!==''?eval(_0x2e66c5[_0xaa90f3]):null;break;case _0x254706(0x193):_0x1d3839=_0x2e66c5[_0xaa90f3]!==''?JSON['parse'](_0x2e66c5[_0xaa90f3]):[],_0x490ab3=_0x1d3839[_0x254706(0x1e8)](_0x55b471=>eval(_0x55b471));break;case'JSON':_0x490ab3=_0x2e66c5[_0xaa90f3]!==''?JSON[_0x254706(0x14c)](_0x2e66c5[_0xaa90f3]):'';break;case _0x254706(0x26e):_0x1d3839=_0x2e66c5[_0xaa90f3]!==''?JSON[_0x254706(0x14c)](_0x2e66c5[_0xaa90f3]):[],_0x490ab3=_0x1d3839[_0x254706(0x1e8)](_0x9f5ad7=>JSON[_0x254706(0x14c)](_0x9f5ad7));break;case _0x254706(0x139):_0x490ab3=_0x2e66c5[_0xaa90f3]!==''?new Function(JSON[_0x254706(0x14c)](_0x2e66c5[_0xaa90f3])):new Function(_0x254706(0x168));break;case _0x254706(0x330):_0x1d3839=_0x2e66c5[_0xaa90f3]!==''?JSON[_0x254706(0x14c)](_0x2e66c5[_0xaa90f3]):[],_0x490ab3=_0x1d3839[_0x254706(0x1e8)](_0x10c141=>new Function(JSON[_0x254706(0x14c)](_0x10c141)));break;case _0x254706(0x12d):_0x490ab3=_0x2e66c5[_0xaa90f3]!==''?String(_0x2e66c5[_0xaa90f3]):'';break;case _0x254706(0x161):_0x1d3839=_0x2e66c5[_0xaa90f3]!==''?JSON[_0x254706(0x14c)](_0x2e66c5[_0xaa90f3]):[],_0x490ab3=_0x1d3839[_0x254706(0x1e8)](_0x3edaf9=>String(_0x3edaf9));break;case _0x254706(0x300):_0x46f592=_0x2e66c5[_0xaa90f3]!==''?JSON['parse'](_0x2e66c5[_0xaa90f3]):{},_0x41535b[_0x30dfac]={},VisuMZ[_0x254706(0x1f3)](_0x41535b[_0x30dfac],_0x46f592);continue;case'ARRAYSTRUCT':_0x1d3839=_0x2e66c5[_0xaa90f3]!==''?JSON[_0x254706(0x14c)](_0x2e66c5[_0xaa90f3]):[],_0x490ab3=_0x1d3839['map'](_0x76c4b=>VisuMZ[_0x254706(0x1f3)]({},JSON[_0x254706(0x14c)](_0x76c4b)));break;default:continue;}_0x41535b[_0x30dfac]=_0x490ab3;}else{function _0xde8c3a(){const _0x55b2d3=_0x254706;return this[_0x55b2d3(0x159)]&&this[_0x55b2d3(0x159)][_0x55b2d3(0x31d)]===_0x329e19;}}}}}return _0x41535b;},(_0x14d929=>{const _0x5df18a=_0x42f345,_0x1e0be6=_0x14d929[_0x5df18a(0x131)];for(const _0x1c6b39 of dependencies){if(!Imported[_0x1c6b39]){if(_0x5df18a(0x261)!=='SIsUY'){function _0x16fc72(){const _0x15734f=_0x5df18a;this['x']=(_0x24e465[_0x15734f(0x1a8)]-this[_0x15734f(0x145)])/0x2,_0x289f58[_0x15734f(0x154)]=_0x3f8379,this[_0x15734f(0x243)]();}}else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x5df18a(0x226)](_0x1e0be6,_0x1c6b39)),SceneManager[_0x5df18a(0x218)]();break;}}}const _0x54e864=_0x14d929[_0x5df18a(0x30f)];if(_0x54e864[_0x5df18a(0x1b5)](/\[Version[ ](.*?)\]/i)){if(_0x5df18a(0x237)==='hgDUo'){function _0x1be122(){return!![];}}else{const _0x5cfb7a=Number(RegExp['$1']);if(_0x5cfb7a!==VisuMZ[label]['version']){if(_0x5df18a(0x229)===_0x5df18a(0x229))alert(_0x5df18a(0x2a9)[_0x5df18a(0x226)](_0x1e0be6,_0x5cfb7a)),SceneManager[_0x5df18a(0x218)]();else{function _0xa79075(){const _0x3d8ba2=_0x5df18a;this[_0x3d8ba2(0x31f)][_0x3d8ba2(0x130)]=!!_0x1b2bcf;}}}}}if(_0x54e864['match'](/\[Tier[ ](\d+)\]/i)){if(_0x5df18a(0xb9)===_0x5df18a(0xb9)){const _0x4a9269=Number(RegExp['$1']);if(_0x4a9269<tier){if(_0x5df18a(0x1b2)==='vIuZe'){function _0x57461e(){const _0x2596a1=_0x5df18a;this[_0x2596a1(0x2dc)][_0x52db95][_0x2596a1(0xf3)][0x0]['push'](_0x2505dd);}}else alert(_0x5df18a(0x162)['format'](_0x1e0be6,_0x4a9269,tier)),SceneManager[_0x5df18a(0x218)]();}else tier=Math[_0x5df18a(0x1f0)](_0x4a9269,tier);}else{function _0x51a7d5(){const _0x7154de=_0x5df18a;this[_0x7154de(0x214)][_0x7154de(0x2d3)]();}}}VisuMZ[_0x5df18a(0x1f3)](VisuMZ[label][_0x5df18a(0x1d0)],_0x14d929[_0x5df18a(0xf3)]);})(pluginData),PluginManager[_0x42f345(0x239)](pluginData[_0x42f345(0x131)],_0x42f345(0x1a0),_0x22b2b4=>{const _0x48b744=_0x42f345;VisuMZ['ConvertParams'](_0x22b2b4,_0x22b2b4);const _0x3794bf=_0x22b2b4[_0x48b744(0x216)]||$gameSystem[_0x48b744(0x1f1)]()||0x1,_0x1b4f35=_0x22b2b4['MaxRows']||$gameSystem['getChoiceListMaxRows']()||0x1,_0x4901fa=_0x22b2b4[_0x48b744(0x1c2)]||$gameSystem[_0x48b744(0x2f6)]()||0x1,_0x64d91f=_0x22b2b4[_0x48b744(0x221)][_0x48b744(0x223)]()||_0x48b744(0xf4);$gameSystem[_0x48b744(0x1d4)](_0x3794bf),$gameSystem[_0x48b744(0x13a)](_0x1b4f35),$gameSystem[_0x48b744(0x322)](_0x4901fa),$gameSystem[_0x48b744(0x18c)](_0x64d91f);}),PluginManager[_0x42f345(0x239)](pluginData[_0x42f345(0x131)],_0x42f345(0xef),_0x2b0520=>{const _0x19c7bd=_0x42f345;VisuMZ[_0x19c7bd(0x1f3)](_0x2b0520,_0x2b0520);const _0x311905=_0x2b0520['Rows']||$gameSystem[_0x19c7bd(0x1af)]()||0x1,_0x279f2a=_0x2b0520[_0x19c7bd(0x1d5)]||$gameSystem[_0x19c7bd(0xd4)]()||0x1;$gameTemp[_0x19c7bd(0x154)]=_0x2b0520[_0x19c7bd(0x116)]||![];const _0x22b138=_0x2b0520[_0x19c7bd(0xe1)][_0x19c7bd(0x223)]();$gameSystem[_0x19c7bd(0xf8)](_0x311905),$gameSystem[_0x19c7bd(0xec)](_0x279f2a);[_0x19c7bd(0x1d1),_0x19c7bd(0x2db)][_0x19c7bd(0x2b9)](_0x22b138)&&$gameSystem[_0x19c7bd(0x23d)](eval(_0x22b138));const _0x5c24fb=SceneManager[_0x19c7bd(0x159)][_0x19c7bd(0x121)];_0x5c24fb&&(_0x5c24fb[_0x19c7bd(0x297)](),_0x5c24fb['updateDimensions'](),_0x5c24fb['createContents']());}),VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x2c4)]=Scene_Boot[_0x42f345(0x19b)][_0x42f345(0x180)],Scene_Boot[_0x42f345(0x19b)][_0x42f345(0x180)]=function(){const _0x15cae0=_0x42f345;VisuMZ[_0x15cae0(0x2cf)][_0x15cae0(0x2c4)]['call'](this),this[_0x15cae0(0x26a)](),this[_0x15cae0(0xe9)](),this[_0x15cae0(0x1ef)](),this[_0x15cae0(0x12b)]();},VisuMZ['MessageCore']['SortObjectByKeyLength']=function(_0x8c86cc){const _0x465849=_0x42f345,_0x532c6d=VisuMZ[_0x465849(0x2cf)]['Settings'][_0x8c86cc];_0x532c6d[_0x465849(0x16b)]((_0x34b5fc,_0x25c529)=>{const _0x3672f0=_0x465849;if('pGlkJ'!==_0x3672f0(0x324)){function _0x4b3f18(){const _0x2232cd=_0x3672f0;if(this['_MessageCoreSettings']===_0x3b8d67)this['initMessageCore']();if(this[_0x2232cd(0x230)][_0x2232cd(0x10e)]===_0x2c6e73)this['initMessageCore']();this[_0x2232cd(0x230)][_0x2232cd(0x10e)]=_0x49d8f3||0x1;}}else{if(!_0x34b5fc||!_0x25c529)return-0x1;return _0x25c529[_0x3672f0(0x104)][_0x3672f0(0x2d8)]-_0x34b5fc[_0x3672f0(0x104)][_0x3672f0(0x2d8)];}});},Scene_Boot[_0x42f345(0x19b)][_0x42f345(0x26a)]=function(){const _0x2385ed=_0x42f345;VisuMZ['MessageCore'][_0x2385ed(0x244)]('TextCodeActions');for(const _0x430616 of VisuMZ['MessageCore'][_0x2385ed(0x1d0)][_0x2385ed(0x22b)]){_0x430616['Match']=_0x430616[_0x2385ed(0x104)][_0x2385ed(0x20c)](),_0x430616[_0x2385ed(0xe6)]=new RegExp('\x1b'+_0x430616[_0x2385ed(0x104)],'gi'),_0x430616['textCodeResult']='\x1b'+_0x430616[_0x2385ed(0x104)];if(_0x430616[_0x2385ed(0x260)]==='')_0x430616[_0x2385ed(0x32e)]+=_0x2385ed(0x311);}},Scene_Boot[_0x42f345(0x19b)]['process_VisuMZ_MessageCore_TextCodes_Replace']=function(){const _0x5a2f9d=_0x42f345;VisuMZ[_0x5a2f9d(0x2cf)][_0x5a2f9d(0x244)]('TextCodeReplace');for(const _0x446de6 of VisuMZ['MessageCore'][_0x5a2f9d(0x1d0)][_0x5a2f9d(0x187)]){_0x446de6[_0x5a2f9d(0xe6)]=new RegExp('\x1b'+_0x446de6[_0x5a2f9d(0x104)]+_0x446de6['Type'],'gi'),_0x446de6[_0x5a2f9d(0x232)]!==''&&_0x446de6['TextStr']!==_0x5a2f9d(0x2c2)?_0x446de6['textCodeResult']=new Function(_0x5a2f9d(0x2f2)+_0x446de6[_0x5a2f9d(0x232)][_0x5a2f9d(0x2aa)](/\\/g,'\x1b')+'\x27'):_0x446de6['textCodeResult']=_0x446de6['TextJS'];}},Scene_Boot[_0x42f345(0x19b)][_0x42f345(0x1ef)]=function(){const _0x32422e=_0x42f345;for(const _0x280e56 of VisuMZ[_0x32422e(0x2cf)]['Settings']['TextMacros']){_0x280e56[_0x32422e(0xe6)]=new RegExp('\x5c['+_0x280e56[_0x32422e(0x104)]+'\x5c]','gi');if(_0x280e56[_0x32422e(0x232)]!==''&&_0x280e56[_0x32422e(0x232)]!==_0x32422e(0x2c2))_0x280e56[_0x32422e(0x32e)]=new Function(_0x32422e(0x2f2)+_0x280e56[_0x32422e(0x232)]['replace'](/\\/g,'\x1b')+'\x27');else{if(_0x32422e(0x2f3)===_0x32422e(0x2f3))_0x280e56[_0x32422e(0x32e)]=_0x280e56[_0x32422e(0x1cb)];else{function _0x475c08(){const _0x223873=_0x32422e;_0x4ccb12[_0x223873(0x2cf)]['ParseStateNotetags'][_0x223873(0x336)](this,_0x50ea1c);const _0x53161e=_0x1bad27[_0x223873(0x2cf)][_0x223873(0x1d0)][_0x223873(0x176)];_0x3e0fe1['MessageCore']['CreateAutoColorFor'](_0x22ae50,_0x53161e[_0x223873(0x2e3)]);}}}}},Scene_Boot[_0x42f345(0x19b)][_0x42f345(0x12b)]=function(){const _0x5f443e=_0x42f345,_0x2ace31=VisuMZ[_0x5f443e(0x2cf)][_0x5f443e(0x1d0)][_0x5f443e(0x176)];if(!VisuMZ[_0x5f443e(0x18b)]){if(_0x5f443e(0xed)===_0x5f443e(0xed))VisuMZ[_0x5f443e(0x2cf)]['AddAutoColor']($dataClasses,_0x2ace31['Classes']),VisuMZ[_0x5f443e(0x2cf)][_0x5f443e(0x269)]($dataSkills,_0x2ace31['Skills']),VisuMZ[_0x5f443e(0x2cf)][_0x5f443e(0x269)]($dataItems,_0x2ace31['Items']),VisuMZ[_0x5f443e(0x2cf)]['AddAutoColor']($dataWeapons,_0x2ace31[_0x5f443e(0x2b0)]),VisuMZ[_0x5f443e(0x2cf)][_0x5f443e(0x269)]($dataArmors,_0x2ace31[_0x5f443e(0x29a)]),VisuMZ['MessageCore'][_0x5f443e(0x269)]($dataEnemies,_0x2ace31[_0x5f443e(0x11f)]),VisuMZ[_0x5f443e(0x2cf)][_0x5f443e(0x269)]($dataStates,_0x2ace31['States']);else{function _0xb12996(){const _0x590312=_0x5f443e,_0x293175=this[_0x590312(0xea)](_0x59ff37,0x0,0x0,0x0),_0x1e5e0d=this[_0x590312(0x1c1)]();return _0x293175[_0x590312(0x22f)]=![],this[_0x590312(0x1c6)](![]),this[_0x590312(0x208)](_0x293175),this['setWordWrap'](!![]),this[_0x590312(0x185)](_0x1e5e0d),{'width':_0x293175[_0x590312(0x293)],'height':_0x293175['outputHeight']};}}}VisuMZ['MessageCore'][_0x5f443e(0xdb)]();},VisuMZ[_0x42f345(0x2cf)]['AutoColorBypassList']=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x42f345(0x217),_0x42f345(0x1f6),_0x42f345(0x18e),_0x42f345(0x1ee),_0x42f345(0x2f4),'</LEFT>',_0x42f345(0x272),_0x42f345(0x155),_0x42f345(0x2de),_0x42f345(0x265),_0x42f345(0x2fc),'</COLORLOCK>','(((',_0x42f345(0xf6),_0x42f345(0x10b),_0x42f345(0x295),_0x42f345(0x320),'<LINE\x20BREAK>',_0x42f345(0x247),_0x42f345(0x19e),_0x42f345(0x164),'WAIT','SHOW',_0x42f345(0x179),_0x42f345(0x32d),'DISABLE',_0x42f345(0x283),_0x42f345(0xfc),_0x42f345(0x183),_0x42f345(0x1ec)],VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x269)]=function(_0x27a915,_0x1a5697){const _0x465fe8=_0x42f345;if(_0x1a5697<=0x0)return;const _0x2d63e9=_0x27a915;for(const _0x30eab3 of _0x2d63e9){if(!_0x30eab3)continue;VisuMZ[_0x465fe8(0x2cf)][_0x465fe8(0x32a)](_0x30eab3,_0x1a5697);}},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0xdb)]=function(){const _0x1c916a=_0x42f345;VisuMZ[_0x1c916a(0x2cf)][_0x1c916a(0x1be)]=[];for(let _0x4f8db9=0x1;_0x4f8db9<=0x1f;_0x4f8db9++){const _0x2683c4='TextColor%1'[_0x1c916a(0x226)](_0x4f8db9),_0x3debc0=VisuMZ[_0x1c916a(0x2cf)][_0x1c916a(0x1d0)][_0x1c916a(0x176)][_0x2683c4];_0x3debc0[_0x1c916a(0x16b)]((_0x5bd9b3,_0x53068a)=>{const _0x23b8f8=_0x1c916a;if(_0x23b8f8(0x14e)!==_0x23b8f8(0xf0)){if(!_0x5bd9b3||!_0x53068a)return-0x1;return _0x53068a[_0x23b8f8(0x2d8)]-_0x5bd9b3[_0x23b8f8(0x2d8)];}else{function _0x5020c5(){const _0x1ff064=_0x23b8f8;if(!this['_autoPositionTarget'])return;const _0xfc97a9=_0x407e1e[_0x1ff064(0x159)];if(!_0xfc97a9)return;if(!_0xfc97a9[_0x1ff064(0xe8)])return;const _0x417165=_0xfc97a9[_0x1ff064(0xe8)][_0x1ff064(0xfa)](this['_autoPositionTarget']);if(!_0x417165)return;let _0x55000c=_0x417165['x'];_0x55000c-=this[_0x1ff064(0x145)]/0x2,_0x55000c-=(_0x23ca1e[_0x1ff064(0x145)]-_0x3e3370[_0x1ff064(0x1a8)])/0x2;let _0x177f45=_0x417165['y'];_0x177f45-=this[_0x1ff064(0x203)],_0x177f45-=(_0x514d16['height']-_0x268df9[_0x1ff064(0x128)])/0x2,_0x177f45-=_0x417165['height']+0x8,this['x']=_0x29195f[_0x1ff064(0x2ce)](_0x55000c),this['y']=_0x561dbd[_0x1ff064(0x2ce)](_0x177f45),this['clampPlacementPosition'](!![],![]),this['_nameBoxWindow']['updatePlacement']();}}}),this[_0x1c916a(0x2a8)](_0x3debc0,_0x4f8db9);}},VisuMZ['MessageCore'][_0x42f345(0x2a8)]=function(_0x3c8831,_0x4aab8f){const _0x5c11cf=_0x42f345;for(const _0x402a1c of _0x3c8831){if('fpMgI'!==_0x5c11cf(0x1f9)){function _0x17dc8f(){const _0xf6aef9=_0x5c11cf;return this[_0xf6aef9(0x297)](),_0x5ad115[_0xf6aef9(0x2cf)][_0xf6aef9(0x170)]['call'](this,_0x1b2a65);}}else{if(_0x402a1c[_0x5c11cf(0x2d8)]<=0x0)continue;if(/^\d+$/[_0x5c11cf(0x1b9)](_0x402a1c))continue;let _0x219f2d=VisuMZ[_0x5c11cf(0x2cf)][_0x5c11cf(0x327)](_0x402a1c);if(_0x402a1c[_0x5c11cf(0x1b5)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x3c4895=new RegExp(_0x219f2d,'i');else var _0x3c4895=new RegExp('\x5cb'+_0x219f2d+'\x5cb','g');VisuMZ[_0x5c11cf(0x2cf)]['AutoColorRegExp'][_0x5c11cf(0x28b)]([_0x3c4895,_0x5c11cf(0xc0)['format'](_0x4aab8f,_0x402a1c)]);}}},VisuMZ['MessageCore']['ConvertTextAutoColorRegExpFriendly']=function(_0x1af7d3){const _0x4fd50b=_0x42f345;return _0x1af7d3=_0x1af7d3[_0x4fd50b(0x2aa)](/(\W)/gi,(_0xdef138,_0x260db6)=>'\x5c%1'['format'](_0x260db6)),_0x1af7d3;},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x280)]=VisuMZ['ParseClassNotetags'],VisuMZ['ParseClassNotetags']=function(_0xb040f3){const _0x19933e=_0x42f345;VisuMZ[_0x19933e(0x2cf)][_0x19933e(0x280)][_0x19933e(0x336)](this,_0xb040f3);const _0x2a3371=VisuMZ[_0x19933e(0x2cf)][_0x19933e(0x1d0)][_0x19933e(0x176)];VisuMZ[_0x19933e(0x2cf)][_0x19933e(0x32a)](_0xb040f3,_0x2a3371[_0x19933e(0x2f7)]);},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x204)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x42f345(0x204)]=function(_0x9701f4){const _0x40095b=_0x42f345;VisuMZ[_0x40095b(0x2cf)][_0x40095b(0x204)][_0x40095b(0x336)](this,_0x9701f4);const _0x3cb9d6=VisuMZ[_0x40095b(0x2cf)][_0x40095b(0x1d0)][_0x40095b(0x176)];VisuMZ[_0x40095b(0x2cf)][_0x40095b(0x32a)](_0x9701f4,_0x3cb9d6[_0x40095b(0x175)]);},VisuMZ[_0x42f345(0x2cf)]['ParseItemNotetags']=VisuMZ[_0x42f345(0x1fe)],VisuMZ[_0x42f345(0x1fe)]=function(_0x295745){const _0x526be7=_0x42f345;VisuMZ[_0x526be7(0x2cf)]['ParseItemNotetags'][_0x526be7(0x336)](this,_0x295745);const _0x30e7ac=VisuMZ['MessageCore']['Settings']['AutoColor'];VisuMZ[_0x526be7(0x2cf)][_0x526be7(0x32a)](_0x295745,_0x30e7ac[_0x526be7(0xe7)]);},VisuMZ[_0x42f345(0x2cf)]['ParseWeaponNotetags']=VisuMZ[_0x42f345(0x18a)],VisuMZ[_0x42f345(0x18a)]=function(_0x78aa37){const _0x3c5a5b=_0x42f345;VisuMZ[_0x3c5a5b(0x2cf)]['ParseWeaponNotetags'][_0x3c5a5b(0x336)](this,_0x78aa37);const _0x58f0bf=VisuMZ[_0x3c5a5b(0x2cf)][_0x3c5a5b(0x1d0)][_0x3c5a5b(0x176)];VisuMZ[_0x3c5a5b(0x2cf)][_0x3c5a5b(0x32a)](_0x78aa37,_0x58f0bf[_0x3c5a5b(0x2b0)]);},VisuMZ['MessageCore'][_0x42f345(0x14a)]=VisuMZ[_0x42f345(0x14a)],VisuMZ[_0x42f345(0x14a)]=function(_0x231543){const _0x415358=_0x42f345;VisuMZ['MessageCore'][_0x415358(0x14a)]['call'](this,_0x231543);const _0x162370=VisuMZ[_0x415358(0x2cf)][_0x415358(0x1d0)]['AutoColor'];VisuMZ[_0x415358(0x2cf)]['CreateAutoColorFor'](_0x231543,_0x162370[_0x415358(0x29a)]);},VisuMZ[_0x42f345(0x2cf)]['ParseEnemyNotetags']=VisuMZ[_0x42f345(0x325)],VisuMZ[_0x42f345(0x325)]=function(_0x5ef126){const _0x3ba600=_0x42f345;VisuMZ['MessageCore']['ParseEnemyNotetags'][_0x3ba600(0x336)](this,_0x5ef126);const _0x4c1300=VisuMZ[_0x3ba600(0x2cf)][_0x3ba600(0x1d0)]['AutoColor'];VisuMZ[_0x3ba600(0x2cf)][_0x3ba600(0x32a)](_0x5ef126,_0x4c1300['Enemies']);},VisuMZ[_0x42f345(0x2cf)]['ParseStateNotetags']=VisuMZ[_0x42f345(0x199)],VisuMZ[_0x42f345(0x199)]=function(_0x200aac){const _0x549d46=_0x42f345;VisuMZ[_0x549d46(0x2cf)]['ParseStateNotetags'][_0x549d46(0x336)](this,_0x200aac);const _0x1b9df6=VisuMZ[_0x549d46(0x2cf)]['Settings'][_0x549d46(0x176)];VisuMZ[_0x549d46(0x2cf)][_0x549d46(0x32a)](_0x200aac,_0x1b9df6[_0x549d46(0x2e3)]);},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x32a)]=function(_0xcd945b,_0x2ba790){const _0x5559a1=_0x42f345;if(_0x2ba790<=0x0)return;const _0x3700c9=VisuMZ[_0x5559a1(0x2cf)][_0x5559a1(0x1d0)]['AutoColor'][_0x5559a1(0x27f)+_0x2ba790];let _0x3922cc=_0xcd945b[_0x5559a1(0x131)]['trim']();if(/^\d+$/[_0x5559a1(0x1b9)](_0x3922cc))return;if(VisuMZ[_0x5559a1(0x2cf)]['AutoColorBypassList'][_0x5559a1(0x2b9)](_0x3922cc[_0x5559a1(0x20c)]()))return;_0x3922cc=_0x3922cc[_0x5559a1(0x2aa)](/\\I\[(\d+)\]/gi,''),_0x3922cc=_0x3922cc['replace'](/\x1bI\[(\d+)\]/gi,'');if(_0x3922cc['length']<=0x0)return;if(_0x3922cc[_0x5559a1(0x1b5)](/-----/i))return;_0x3700c9['push'](_0x3922cc);},SceneManager[_0x42f345(0x250)]=function(){const _0x307639=_0x42f345;return this[_0x307639(0x159)]&&this[_0x307639(0x159)]['constructor']===Scene_Battle;},SceneManager[_0x42f345(0x123)]=function(){const _0x526509=_0x42f345;return this[_0x526509(0x159)]&&this[_0x526509(0x159)][_0x526509(0x31d)]===Scene_Map;},VisuMZ['MessageCore'][_0x42f345(0x1b8)]=TextManager[_0x42f345(0x284)],TextManager[_0x42f345(0x284)]=function(_0x2e1975){const _0x35c932=_0x42f345,_0x1a730b=[_0x35c932(0xda),_0x35c932(0x117),'preemptive','surprise',_0x35c932(0xd5),_0x35c932(0x20b),_0x35c932(0x10d),_0x35c932(0xee),_0x35c932(0x197),'obtainItem'];let _0x42811c=VisuMZ[_0x35c932(0x2cf)]['TextManager_message']['call'](this,_0x2e1975);return _0x1a730b[_0x35c932(0x2b9)](_0x2e1975)&&(_0x42811c=_0x35c932(0x295)+_0x42811c),_0x42811c;},ConfigManager[_0x42f345(0x112)]=VisuMZ['MessageCore'][_0x42f345(0x1d0)][_0x42f345(0x331)][_0x42f345(0x242)],VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x27b)]=ConfigManager[_0x42f345(0x2d5)],ConfigManager[_0x42f345(0x2d5)]=function(){const _0x32a4da=_0x42f345,_0x46cdd1=VisuMZ[_0x32a4da(0x2cf)][_0x32a4da(0x27b)][_0x32a4da(0x336)](this);return _0x46cdd1[_0x32a4da(0x112)]=this[_0x32a4da(0x112)],_0x46cdd1;},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x270)]=ConfigManager[_0x42f345(0x23b)],ConfigManager[_0x42f345(0x23b)]=function(_0x576b68){const _0x13e109=_0x42f345;VisuMZ[_0x13e109(0x2cf)][_0x13e109(0x270)][_0x13e109(0x336)](this,_0x576b68),_0x13e109(0x112)in _0x576b68?this[_0x13e109(0x112)]=Number(_0x576b68[_0x13e109(0x112)])['clamp'](0x1,0xb):this['textSpeed']=VisuMZ[_0x13e109(0x2cf)]['Settings'][_0x13e109(0x331)]['Default'];},TextManager[_0x42f345(0xfe)]=VisuMZ['MessageCore'][_0x42f345(0x1d0)][_0x42f345(0x331)][_0x42f345(0x339)],TextManager[_0x42f345(0x2f1)]=VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x1d0)][_0x42f345(0x331)][_0x42f345(0x278)],VisuMZ['MessageCore'][_0x42f345(0x28e)]=Game_System['prototype']['initialize'],Game_System[_0x42f345(0x19b)]['initialize']=function(){const _0x14fcd9=_0x42f345;VisuMZ[_0x14fcd9(0x2cf)][_0x14fcd9(0x28e)][_0x14fcd9(0x336)](this),this[_0x14fcd9(0xbe)]();},Game_System[_0x42f345(0x19b)][_0x42f345(0xbe)]=function(){const _0xda3283=_0x42f345,_0x68972b=VisuMZ[_0xda3283(0x2cf)][_0xda3283(0x1d0)]['General'],_0x12e4a2=VisuMZ[_0xda3283(0x2cf)]['Settings']['WordWrap'];this[_0xda3283(0x230)]={'messageRows':_0x68972b[_0xda3283(0xbc)],'messageWidth':_0x68972b[_0xda3283(0x25e)],'messageWordWrap':_0x12e4a2[_0xda3283(0x315)],'helpWordWrap':_0x12e4a2[_0xda3283(0x1a5)],'choiceLineHeight':_0x68972b[_0xda3283(0x271)],'choiceRows':_0x68972b[_0xda3283(0x25c)],'choiceCols':_0x68972b['ChoiceWindowMaxCols'],'choiceTextAlign':_0x68972b[_0xda3283(0xd8)]};},Game_System['prototype'][_0x42f345(0x1af)]=function(){const _0x582cf1=_0x42f345;if(this[_0x582cf1(0x230)]===undefined)this[_0x582cf1(0xbe)]();if(this[_0x582cf1(0x230)][_0x582cf1(0x1cd)]===undefined)this[_0x582cf1(0xbe)]();return this[_0x582cf1(0x230)][_0x582cf1(0x1cd)];},Game_System[_0x42f345(0x19b)][_0x42f345(0xf8)]=function(_0x21bb0e){const _0x2fa9ac=_0x42f345;if(this[_0x2fa9ac(0x230)]===undefined)this[_0x2fa9ac(0xbe)]();if(this[_0x2fa9ac(0x230)][_0x2fa9ac(0x1cd)]===undefined)this[_0x2fa9ac(0xbe)]();this[_0x2fa9ac(0x230)][_0x2fa9ac(0x1cd)]=_0x21bb0e||0x1;},Game_System[_0x42f345(0x19b)][_0x42f345(0xd4)]=function(){const _0x535c39=_0x42f345;if(this[_0x535c39(0x230)]===undefined)this[_0x535c39(0xbe)]();if(this[_0x535c39(0x230)][_0x535c39(0x277)]===undefined)this[_0x535c39(0xbe)]();return this['_MessageCoreSettings']['messageWidth'];},Game_System[_0x42f345(0x19b)][_0x42f345(0xec)]=function(_0xeb162c){const _0x18a5b7=_0x42f345;if(this[_0x18a5b7(0x230)]===undefined)this[_0x18a5b7(0xbe)]();if(this[_0x18a5b7(0x230)]['messageWidth']===undefined)this['initMessageCore']();_0xeb162c=Math[_0x18a5b7(0x1cf)](_0xeb162c);if(_0xeb162c%0x2!==0x0)_0xeb162c+=0x1;this[_0x18a5b7(0x230)][_0x18a5b7(0x277)]=_0xeb162c||0x2;},Game_System[_0x42f345(0x19b)][_0x42f345(0xb8)]=function(){const _0x59265f=_0x42f345;if(this[_0x59265f(0x230)]===undefined)this[_0x59265f(0xbe)]();if(this[_0x59265f(0x230)][_0x59265f(0xbf)]===undefined)this[_0x59265f(0xbe)]();return this[_0x59265f(0x230)][_0x59265f(0xbf)];},Game_System[_0x42f345(0x19b)][_0x42f345(0x23d)]=function(_0x220357){const _0xc3abee=_0x42f345;if(this[_0xc3abee(0x230)]===undefined)this[_0xc3abee(0xbe)]();if(this[_0xc3abee(0x230)]['messageWordWrap']===undefined)this[_0xc3abee(0xbe)]();this[_0xc3abee(0x230)][_0xc3abee(0xbf)]=_0x220357;},Game_System[_0x42f345(0x19b)][_0x42f345(0x329)]=function(){const _0x3d74ce=_0x42f345;if(this[_0x3d74ce(0x230)]===undefined)this['initMessageCore']();if(this[_0x3d74ce(0x230)]['helpWordWrap']===undefined)this[_0x3d74ce(0xbe)]();return this[_0x3d74ce(0x230)][_0x3d74ce(0x17e)];},Game_System[_0x42f345(0x19b)][_0x42f345(0x326)]=function(_0x20c742){const _0x2fb12e=_0x42f345;if(this[_0x2fb12e(0x230)]===undefined)this[_0x2fb12e(0xbe)]();if(this[_0x2fb12e(0x230)][_0x2fb12e(0x17e)]===undefined)this[_0x2fb12e(0xbe)]();this[_0x2fb12e(0x230)][_0x2fb12e(0x17e)]=_0x20c742;},Game_System['prototype'][_0x42f345(0x1f1)]=function(){const _0x328a37=_0x42f345;if(this[_0x328a37(0x230)]===undefined)this['initMessageCore']();if(this[_0x328a37(0x230)][_0x328a37(0x312)]===undefined)this[_0x328a37(0xbe)]();return this[_0x328a37(0x230)][_0x328a37(0x312)];},Game_System[_0x42f345(0x19b)]['setChoiceListLineHeight']=function(_0x3df2b1){const _0x140b52=_0x42f345;if(this[_0x140b52(0x230)]===undefined)this['initMessageCore']();if(this[_0x140b52(0x230)]['choiceLineHeight']===undefined)this[_0x140b52(0xbe)]();this['_MessageCoreSettings'][_0x140b52(0x312)]=_0x3df2b1||0x1;},Game_System['prototype'][_0x42f345(0xd9)]=function(){const _0x10bcb7=_0x42f345;if(this[_0x10bcb7(0x230)]===undefined)this[_0x10bcb7(0xbe)]();if(this['_MessageCoreSettings'][_0x10bcb7(0x153)]===undefined)this[_0x10bcb7(0xbe)]();return this['_MessageCoreSettings'][_0x10bcb7(0x153)];},Game_System[_0x42f345(0x19b)]['setChoiceListMaxRows']=function(_0x29fe0a){const _0x2c828b=_0x42f345;if(this[_0x2c828b(0x230)]===undefined)this[_0x2c828b(0xbe)]();if(this[_0x2c828b(0x230)][_0x2c828b(0x153)]===undefined)this[_0x2c828b(0xbe)]();this[_0x2c828b(0x230)][_0x2c828b(0x153)]=_0x29fe0a||0x1;},Game_System[_0x42f345(0x19b)][_0x42f345(0x2f6)]=function(){const _0x3d69c8=_0x42f345;if(this['_MessageCoreSettings']===undefined)this[_0x3d69c8(0xbe)]();if(this[_0x3d69c8(0x230)]['choiceCols']===undefined)this[_0x3d69c8(0xbe)]();return this[_0x3d69c8(0x230)][_0x3d69c8(0x10e)];},Game_System[_0x42f345(0x19b)]['setChoiceListMaxColumns']=function(_0x149340){const _0x2a59e5=_0x42f345;if(this['_MessageCoreSettings']===undefined)this[_0x2a59e5(0xbe)]();if(this['_MessageCoreSettings'][_0x2a59e5(0x10e)]===undefined)this[_0x2a59e5(0xbe)]();this['_MessageCoreSettings'][_0x2a59e5(0x10e)]=_0x149340||0x1;},Game_System[_0x42f345(0x19b)]['getChoiceListTextAlign']=function(){const _0x4f07a3=_0x42f345;if(this[_0x4f07a3(0x230)]===undefined)this[_0x4f07a3(0xbe)]();if(this[_0x4f07a3(0x230)][_0x4f07a3(0x2f5)]===undefined)this[_0x4f07a3(0xbe)]();return this[_0x4f07a3(0x230)][_0x4f07a3(0x2f5)];},Game_System[_0x42f345(0x19b)]['setChoiceListTextAlign']=function(_0x5ebab7){const _0x333825=_0x42f345;if(this[_0x333825(0x230)]===undefined)this[_0x333825(0xbe)]();if(this['_MessageCoreSettings'][_0x333825(0x2f5)]===undefined)this[_0x333825(0xbe)]();this[_0x333825(0x230)]['choiceTextAlign']=_0x5ebab7[_0x333825(0x223)]();},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0xb6)]=Game_Party[_0x42f345(0x19b)][_0x42f345(0x17b)],Game_Party[_0x42f345(0x19b)]['initialize']=function(){const _0x5243c3=_0x42f345;VisuMZ['MessageCore'][_0x5243c3(0xb6)][_0x5243c3(0x336)](this),this[_0x5243c3(0xbe)]();},Game_Party[_0x42f345(0x19b)][_0x42f345(0xbe)]=function(){const _0x37bac3=_0x42f345;this[_0x37bac3(0xd7)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party['prototype'][_0x42f345(0xe3)]=function(){const _0x1980db=_0x42f345;if(this['_lastGainedItemData']===undefined)this[_0x1980db(0xbe)]();return this[_0x1980db(0xd7)];},Game_Party[_0x42f345(0x19b)][_0x42f345(0x328)]=function(_0x22d3de,_0x4a4ef5){const _0x186ec2=_0x42f345;if(this[_0x186ec2(0xd7)]===undefined)this[_0x186ec2(0xbe)]();if(!_0x22d3de)return;if(DataManager[_0x186ec2(0x100)](_0x22d3de))this[_0x186ec2(0xd7)][_0x186ec2(0x2d2)]=0x0;else{if(DataManager[_0x186ec2(0x165)](_0x22d3de))this[_0x186ec2(0xd7)]['type']=0x1;else DataManager[_0x186ec2(0x142)](_0x22d3de)&&(this[_0x186ec2(0xd7)][_0x186ec2(0x2d2)]=0x2);}this[_0x186ec2(0xd7)]['id']=_0x22d3de['id'],this[_0x186ec2(0xd7)][_0x186ec2(0x10f)]=_0x4a4ef5;},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x1ba)]=Game_Party[_0x42f345(0x19b)][_0x42f345(0x2e4)],Game_Party['prototype'][_0x42f345(0x2e4)]=function(_0x11d514,_0x1bfa87,_0x202506){const _0x4c3583=_0x42f345;VisuMZ[_0x4c3583(0x2cf)][_0x4c3583(0x1ba)][_0x4c3583(0x336)](this,_0x11d514,_0x1bfa87,_0x202506),_0x1bfa87>0x0&&this['setLastGainedItemData'](_0x11d514,_0x1bfa87);},VisuMZ['MessageCore']['Game_Map_initialize']=Game_Map['prototype'][_0x42f345(0x17b)],Game_Map['prototype'][_0x42f345(0x17b)]=function(){const _0x24329e=_0x42f345;VisuMZ['MessageCore'][_0x24329e(0x2b5)][_0x24329e(0x336)](this),this[_0x24329e(0x25b)]=[];},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x209)]=Game_Map[_0x42f345(0x19b)][_0x42f345(0x16f)],Game_Map['prototype'][_0x42f345(0x16f)]=function(){const _0x1742a5=_0x42f345;VisuMZ['MessageCore'][_0x1742a5(0x209)][_0x1742a5(0x336)](this),this[_0x1742a5(0x25b)]=[];},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x296)]=Game_Map[_0x42f345(0x19b)]['updateEvents'],Game_Map[_0x42f345(0x19b)][_0x42f345(0x212)]=function(){const _0x5332ac=_0x42f345;VisuMZ['MessageCore'][_0x5332ac(0x296)][_0x5332ac(0x336)](this),this[_0x5332ac(0x101)]();},Game_Map[_0x42f345(0x19b)][_0x42f345(0x190)]=function(_0x2d16b1){const _0x582d17=_0x42f345;this['_messageCommonEvents']=this[_0x582d17(0x25b)]||[];const _0x1bda5a=this[_0x582d17(0x214)]['_eventId'],_0x3dd374=new Game_MessageCommonEvent(_0x2d16b1,_0x1bda5a);this[_0x582d17(0x25b)][_0x582d17(0x28b)](_0x3dd374);},Game_Map['prototype'][_0x42f345(0x101)]=function(){const _0x559cf9=_0x42f345;this[_0x559cf9(0x25b)]=this[_0x559cf9(0x25b)]||[];for(const _0x51b605 of this['_messageCommonEvents']){if(!_0x51b605[_0x559cf9(0x214)]){if('TABNS'!==_0x559cf9(0x1d9)){function _0x23df3e(){const _0x537ad0=_0x559cf9;return(_0x176b24['boxWidth']-this[_0x537ad0(0x1fb)]())/0x2;}}else this[_0x559cf9(0x25b)][_0x559cf9(0x17d)](_0x51b605);}else _0x51b605[_0x559cf9(0x2d3)]();}},Game_Interpreter[_0x42f345(0x19b)]['command101']=function(_0x4c4f19){const _0x108f51=_0x42f345;if($gameMessage[_0x108f51(0x1e7)]())return![];return this[_0x108f51(0x1ab)](_0x4c4f19),this[_0x108f51(0x194)](_0x4c4f19),this['prepareShowTextFollowups'](_0x4c4f19),this[_0x108f51(0x21d)](_0x108f51(0x284)),!![];},Game_Interpreter[_0x42f345(0x19b)]['prepareShowTextCommand']=function(_0x52f000){const _0x4d4f81=_0x42f345;$gameMessage[_0x4d4f81(0x186)](_0x52f000[0x0],_0x52f000[0x1]),$gameMessage[_0x4d4f81(0x1e5)](_0x52f000[0x2]),$gameMessage[_0x4d4f81(0x129)](_0x52f000[0x3]),$gameMessage[_0x4d4f81(0x318)](_0x52f000[0x4]);},Game_Interpreter[_0x42f345(0x19b)]['addContinuousShowTextCommands']=function(_0x3b8066){const _0xcd4822=_0x42f345;while(this[_0xcd4822(0x24c)]()){this[_0xcd4822(0x252)]++;if(this[_0xcd4822(0x29b)]()[_0xcd4822(0x11c)]===0x191){if(_0xcd4822(0x251)===_0xcd4822(0xc8)){function _0x4d5d8f(){const _0x3373b9=_0xcd4822;_0x430004[_0x3373b9(0x186)](_0x45bbaf[0x0],_0x4405d9[0x1]),_0xc1f626[_0x3373b9(0x1e5)](_0x16ee97[0x2]),_0x83ef56[_0x3373b9(0x129)](_0x12be8b[0x3]),_0x47e92b[_0x3373b9(0x318)](_0xb2dadb[0x4]);}}else $gameMessage[_0xcd4822(0x310)](this[_0xcd4822(0x29b)]()[_0xcd4822(0xf3)][0x0]);}if(this[_0xcd4822(0x249)]())break;}},Game_Interpreter[_0x42f345(0x19b)][_0x42f345(0x24c)]=function(){const _0x4d05a1=_0x42f345;return this['nextEventCode']()===0x65&&$gameSystem['getMessageWindowRows']()>0x4?!![]:this[_0x4d05a1(0x32c)]()===0x191;},Game_Interpreter[_0x42f345(0x19b)]['isBreakShowTextCommands']=function(){const _0x111986=_0x42f345;return $gameMessage['_texts'][_0x111986(0x2d8)]>=$gameSystem[_0x111986(0x1af)]()&&this[_0x111986(0x32c)]()!==0x191;},Game_Interpreter[_0x42f345(0x19b)]['prepareShowTextFollowups']=function(_0x5eb642){const _0x5d9b74=_0x42f345;switch(this[_0x5d9b74(0x32c)]()){case 0x66:this[_0x5d9b74(0x252)]++,this[_0x5d9b74(0x2fe)](this['currentCommand']()[_0x5d9b74(0xf3)]);break;case 0x67:this[_0x5d9b74(0x252)]++,this['setupNumInput'](this[_0x5d9b74(0x29b)]()[_0x5d9b74(0xf3)]);break;case 0x68:this[_0x5d9b74(0x252)]++,this['setupItemChoice'](this[_0x5d9b74(0x29b)]()[_0x5d9b74(0xf3)]);break;}},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x1d7)]=Game_Interpreter['prototype'][_0x42f345(0x2fe)],Game_Interpreter[_0x42f345(0x19b)][_0x42f345(0x2fe)]=function(_0x175942){const _0x3bc2ad=_0x42f345;_0x175942=this['addContinuousShowChoices'](),VisuMZ[_0x3bc2ad(0x2cf)]['Game_Interpreter_setupChoices']['call'](this,_0x175942);},Game_Interpreter[_0x42f345(0x19b)][_0x42f345(0x234)]=function(){const _0x2e1ae7=_0x42f345,_0x2e611a=this[_0x2e1ae7(0x252)],_0x16c10e=[];let _0x32aa4f=0x0;this['_index']++;while(this[_0x2e1ae7(0x252)]<this[_0x2e1ae7(0x2dc)][_0x2e1ae7(0x2d8)]){if('HiBJF'!==_0x2e1ae7(0x1f7)){function _0x3ebf2e(){const _0x46cec8=_0x2e1ae7;if(_0x36eec6[_0x46cec8(0x263)](_0x5c3cc8))return![];}}else{if(this[_0x2e1ae7(0x29b)]()[_0x2e1ae7(0x1c4)]===this[_0x2e1ae7(0xca)]){if(this['currentCommand']()[_0x2e1ae7(0x11c)]===0x194&&this[_0x2e1ae7(0x32c)]()!==0x66){if(_0x2e1ae7(0x13d)!==_0x2e1ae7(0x1ff))break;else{function _0x2164aa(){const _0x451328=_0x2e1ae7;this[_0x451328(0x253)](_0x494dda);}}}else{if(this[_0x2e1ae7(0x29b)]()[_0x2e1ae7(0x11c)]===0x66)this['adjustShowChoiceExtension'](_0x32aa4f,this['currentCommand'](),_0x2e611a),this[_0x2e1ae7(0x252)]-=0x2;else{if(this[_0x2e1ae7(0x29b)]()[_0x2e1ae7(0x11c)]===0x192){if(_0x2e1ae7(0x286)===_0x2e1ae7(0x286))this[_0x2e1ae7(0x29b)]()['parameters'][0x0]=_0x32aa4f,_0x32aa4f++;else{function _0x56f02c(){const _0x154fa8=_0x2e1ae7;if(this['_MessageCoreSettings']===_0x280d6f)this[_0x154fa8(0xbe)]();if(this[_0x154fa8(0x230)][_0x154fa8(0x17e)]===_0x4184d8)this[_0x154fa8(0xbe)]();this[_0x154fa8(0x230)][_0x154fa8(0x17e)]=_0x5a293c;}}}}}}this[_0x2e1ae7(0x252)]++;}}return this['_index']=_0x2e611a,this[_0x2e1ae7(0x29b)]()[_0x2e1ae7(0xf3)];},Game_Interpreter[_0x42f345(0x19b)][_0x42f345(0x245)]=function(_0x1ac5f2,_0x47620f,_0x41c84a){const _0x204904=_0x42f345;this[_0x204904(0x137)](_0x1ac5f2,_0x47620f,_0x41c84a),this['adjustShowChoiceCancel'](_0x1ac5f2,_0x47620f,_0x41c84a),this[_0x204904(0x1e1)](_0x47620f,_0x41c84a);},Game_Interpreter[_0x42f345(0x19b)][_0x42f345(0x137)]=function(_0x5b84fe,_0x51e0eb,_0xe74546){const _0x10fcec=_0x42f345;if(_0x51e0eb[_0x10fcec(0xf3)][0x2]<0x0)return;const _0x37cc5c=_0x51e0eb['parameters'][0x2]+_0x5b84fe;this['_list'][_0xe74546][_0x10fcec(0xf3)][0x2]=_0x37cc5c;},Game_Interpreter[_0x42f345(0x19b)][_0x42f345(0x24e)]=function(_0x59cbba,_0x143e47,_0x37411a){const _0x2fcbb7=_0x42f345;if(_0x143e47['parameters'][0x1]>=0x0){if('wuwav'!==_0x2fcbb7(0x118)){var _0x3c7af4=_0x143e47[_0x2fcbb7(0xf3)][0x1]+_0x59cbba;this[_0x2fcbb7(0x2dc)][_0x37411a][_0x2fcbb7(0xf3)][0x1]=_0x3c7af4;}else{function _0x10399f(){const _0x126828=_0x2fcbb7;this['_textDelayCount']=this[_0x126828(0x1e0)];if(this['_textDelay']<=0x0)this[_0x126828(0x147)]=!![];}}}else{if(_0x143e47[_0x2fcbb7(0xf3)][0x1]===-0x2){if(_0x2fcbb7(0x14b)==='uKoWW'){function _0x4d8e91(){const _0x5aa57a=_0x2fcbb7;_0x1464ac(_0x5aa57a(0x162)[_0x5aa57a(0x226)](_0x74af80,_0x19a119,_0x2e4067)),_0x429542[_0x5aa57a(0x218)]();}}else this[_0x2fcbb7(0x2dc)][_0x37411a][_0x2fcbb7(0xf3)][0x1]=_0x143e47[_0x2fcbb7(0xf3)][0x1];}}},Game_Interpreter[_0x42f345(0x19b)]['addExtraShowChoices']=function(_0x389535,_0x493864){const _0x1b1ed4=_0x42f345;for(const _0x26c582 of _0x389535[_0x1b1ed4(0xf3)][0x0]){this[_0x1b1ed4(0x2dc)][_0x493864][_0x1b1ed4(0xf3)][0x0][_0x1b1ed4(0x28b)](_0x26c582);}this[_0x1b1ed4(0x2dc)][_0x1b1ed4(0x2a2)](this[_0x1b1ed4(0x252)]-0x1,0x2);};function Game_MessageCommonEvent(){const _0x282283=_0x42f345;this[_0x282283(0x17b)](...arguments);}Game_MessageCommonEvent[_0x42f345(0x19b)][_0x42f345(0x17b)]=function(_0x33ad6e,_0x2b6137){const _0x166a6f=_0x42f345;this[_0x166a6f(0x146)]=_0x33ad6e,this[_0x166a6f(0xcb)]=_0x2b6137||0x0,this['refresh']();},Game_MessageCommonEvent['prototype'][_0x42f345(0x246)]=function(){return $dataCommonEvents[this['_commonEventId']];},Game_MessageCommonEvent[_0x42f345(0x19b)][_0x42f345(0x1df)]=function(){const _0x2bbe7d=_0x42f345;return this['event']()[_0x2bbe7d(0x1df)];},Game_MessageCommonEvent[_0x42f345(0x19b)][_0x42f345(0x2fb)]=function(){const _0x3c135b=_0x42f345;this[_0x3c135b(0x214)]=new Game_Interpreter(),this[_0x3c135b(0x214)][_0x3c135b(0x1a9)](this['list'](),this[_0x3c135b(0xcb)]);},Game_MessageCommonEvent[_0x42f345(0x19b)][_0x42f345(0x2d3)]=function(){const _0xac8a6=_0x42f345;if(this['_interpreter']){if(_0xac8a6(0x11a)!==_0xac8a6(0x25d)){if(this[_0xac8a6(0x214)][_0xac8a6(0x30e)]()){if(_0xac8a6(0x264)===_0xac8a6(0xcd)){function _0x13c5a0(){const _0x11f1da=_0xac8a6;return _0xac00ed[_0x11f1da(0x17c)]&&_0x3bbd2f[_0x11f1da(0x30f)][_0x11f1da(0x2b9)]('['+_0x28fe89+']');}}else this[_0xac8a6(0x214)]['update']();}else{if('sAxyP'!==_0xac8a6(0x28d)){function _0x46deaf(){const _0x5556e9=_0xac8a6;this[_0x5556e9(0x292)]=_0x4a0788[_0x5556e9(0x316)]()[_0x5556e9(0x150)](_0x344142-0x1);}}else this[_0xac8a6(0x1ad)]();}}else{function _0x3d05ff(){const _0x3e2b77=_0xac8a6;this[_0x3e2b77(0x2ae)](),this[_0x3e2b77(0x297)](),this['registerResetRect'](_0x447299);}}}},Game_MessageCommonEvent[_0x42f345(0x19b)][_0x42f345(0x1ad)]=function(){const _0x593a5b=_0x42f345;this[_0x593a5b(0x214)]=null;},Scene_Message[_0x42f345(0x19b)]['messageWindowRect']=function(){const _0x16aa17=_0x42f345,_0x108182=Math['min'](Graphics['width'],$gameSystem['getMessageWindowWidth']()),_0x31b7d4=$gameSystem[_0x16aa17(0x1af)](),_0x19abd1=this[_0x16aa17(0x1f4)](_0x31b7d4,![]),_0x440cac=(Graphics[_0x16aa17(0x1a8)]-_0x108182)/0x2,_0x39a1ae=0x0;return new Rectangle(_0x440cac,_0x39a1ae,_0x108182,_0x19abd1);},VisuMZ[_0x42f345(0x2cf)]['Scene_Options_maxCommands']=Scene_Options[_0x42f345(0x19b)][_0x42f345(0x29f)],Scene_Options[_0x42f345(0x19b)][_0x42f345(0x29f)]=function(){const _0x33199c=_0x42f345;let _0x4a1a78=VisuMZ['MessageCore']['Scene_Options_maxCommands'][_0x33199c(0x336)](this);const _0x5945f0=VisuMZ['MessageCore']['Settings'];if(_0x5945f0[_0x33199c(0x331)][_0x33199c(0xd3)]&&_0x5945f0[_0x33199c(0x331)][_0x33199c(0x2a1)])_0x4a1a78++;return _0x4a1a78;},VisuMZ['MessageCore'][_0x42f345(0xc7)]=Window_Base['prototype']['initialize'],Window_Base['prototype']['initialize']=function(_0x8ba199){const _0x44003c=_0x42f345;this[_0x44003c(0xbe)](_0x8ba199),VisuMZ[_0x44003c(0x2cf)][_0x44003c(0xc7)][_0x44003c(0x336)](this,_0x8ba199);},Window_Base[_0x42f345(0x19b)][_0x42f345(0xbe)]=function(_0x3cbe39){const _0x9bf530=_0x42f345;this[_0x9bf530(0x2ae)](),this['resetWordWrap'](),this[_0x9bf530(0x2ea)](_0x3cbe39);},Window_Base['prototype'][_0x42f345(0x2ae)]=function(){const _0x40a6bf=_0x42f345;this[_0x40a6bf(0x25f)]('default');},Window_Base[_0x42f345(0x19b)][_0x42f345(0x25f)]=function(_0x5728a1){this['_textAlignment']=_0x5728a1;},Window_Base[_0x42f345(0x19b)][_0x42f345(0x256)]=function(){const _0x5e41a5=_0x42f345;return this[_0x5e41a5(0xe0)];},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x170)]=Window_Base['prototype'][_0x42f345(0x222)],Window_Base['prototype'][_0x42f345(0x222)]=function(_0x2e74a7){const _0x11506f=_0x42f345;return this[_0x11506f(0x297)](),VisuMZ[_0x11506f(0x2cf)][_0x11506f(0x170)][_0x11506f(0x336)](this,_0x2e74a7);},VisuMZ['MessageCore'][_0x42f345(0x192)]=Window_Base['prototype'][_0x42f345(0x208)],Window_Base[_0x42f345(0x19b)][_0x42f345(0x208)]=function(_0x1ae0c0){const _0x2d2830=_0x42f345;VisuMZ['MessageCore'][_0x2d2830(0x192)][_0x2d2830(0x336)](this,_0x1ae0c0);if(_0x1ae0c0[_0x2d2830(0x22f)])this[_0x2d2830(0x25f)](_0x2d2830(0xf4));},Window_Base[_0x42f345(0x19b)][_0x42f345(0x297)]=function(){const _0x475beb=_0x42f345;this[_0x475beb(0x1c6)](![]);},Window_Base[_0x42f345(0x19b)][_0x42f345(0x173)]=function(){return this['_wordWrap'];},Window_Base[_0x42f345(0x19b)][_0x42f345(0x1c6)]=function(_0x18c4d5){return this['_wordWrap']=_0x18c4d5,'';},Window_Base['prototype'][_0x42f345(0x2ea)]=function(_0x2402a4){const _0x6d7d19=_0x42f345;this['_resetRect']=JsonEx[_0x6d7d19(0xf2)](_0x2402a4);},Window_Base[_0x42f345(0x19b)][_0x42f345(0x2a5)]=function(){const _0x18827d=_0x42f345;this[_0x18827d(0x31f)][_0x18827d(0x228)]=$gameSystem[_0x18827d(0x2cb)](),this[_0x18827d(0x31f)]['fontSize']=$gameSystem[_0x18827d(0x14f)](),this[_0x18827d(0x31f)]['fontBold']=![],this['contents'][_0x18827d(0x125)]=![],this[_0x18827d(0x2dd)]();},Window_Base['prototype'][_0x42f345(0x2dd)]=function(){const _0x58830e=_0x42f345;this['changeTextColor'](ColorManager[_0x58830e(0x2d0)]()),this[_0x58830e(0x25a)](ColorManager[_0x58830e(0x171)]());const _0x5b69df=VisuMZ['MessageCore'][_0x58830e(0x1d0)][_0x58830e(0x29d)];if(_0x5b69df[_0x58830e(0xdd)]===undefined){if(_0x58830e(0x2d7)===_0x58830e(0x1a4)){function _0x299acd(){const _0x5a9d25=_0x58830e,_0x2f2b75=-(_0x32d04e[_0x5a9d25(0x2e2)](_0x21246f[_0x5a9d25(0x145)]-_0x36442c[_0x5a9d25(0x1a8)])/0x2),_0x244c3b=_0x2f2b75+_0x1af3c7[_0x5a9d25(0x145)]-this[_0x5a9d25(0x145)],_0x26d806=-(_0x19d50f['floor'](_0x29e762[_0x5a9d25(0x203)]-_0xa15f7[_0x5a9d25(0x128)])/0x2),_0x4fb795=_0x26d806+_0x46e263[_0x5a9d25(0x203)]-this['height'];this['x']=this['x'][_0x5a9d25(0x138)](_0x2f2b75,_0x244c3b),this['y']=this['y'][_0x5a9d25(0x138)](_0x26d806,_0x4fb795);}}else _0x5b69df[_0x58830e(0xdd)]=0x3;}this['contents']['outlineWidth']=_0x5b69df['DefaultOutlineWidth'],this['setColorLock'](![]);},Window_Base[_0x42f345(0x19b)][_0x42f345(0x2e6)]=function(_0x39e71b){this['_colorLock']=_0x39e71b;},Window_Base[_0x42f345(0x19b)]['isColorLocked']=function(){const _0x2bb5e3=_0x42f345;return this[_0x2bb5e3(0x1cc)];},Window_Base['prototype'][_0x42f345(0x2b7)]=function(){return![];},Window_Base[_0x42f345(0x19b)][_0x42f345(0x1c1)]=function(){const _0xc350fe=_0x42f345,_0x574455=[_0xc350fe(0x228),_0xc350fe(0x109),_0xc350fe(0x130),'fontItalic',_0xc350fe(0x103),'outLineColor',_0xc350fe(0x32b),_0xc350fe(0x2c8)];let _0x5c837e={};for(const _0x4b2824 of _0x574455){_0x5c837e[_0x4b2824]=this[_0xc350fe(0x31f)][_0x4b2824];}return _0x5c837e;},Window_Base[_0x42f345(0x19b)]['returnPreservedFontSettings']=function(_0x43416f){const _0x79f92e=_0x42f345;for(const _0x205ee4 in _0x43416f){this[_0x79f92e(0x31f)][_0x205ee4]=_0x43416f[_0x205ee4];}},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x1f2)]=Window_Base['prototype'][_0x42f345(0x2d3)],Window_Base[_0x42f345(0x19b)][_0x42f345(0x2d3)]=function(){const _0x40e16b=_0x42f345;VisuMZ['MessageCore'][_0x40e16b(0x1f2)][_0x40e16b(0x336)](this),this[_0x40e16b(0xd0)]();},Window_Base[_0x42f345(0x19b)][_0x42f345(0x1ce)]=function(){return![];},Window_Base['prototype'][_0x42f345(0xd0)]=function(){const _0x5a6ebe=_0x42f345;if(this[_0x5a6ebe(0x26c)]>0x0){if('TpmKU'===_0x5a6ebe(0x298)){function _0x385b3f(){const _0x1c528c=_0x5a6ebe,_0x2f6f41=0xb-_0x40c44b[_0x1c528c(0x112)];_0x4117a4=_0x5a775d['round'](_0x49a386*_0x2f6f41),this[_0x1c528c(0x2a6)]=_0x107666,this[_0x1c528c(0x1e0)]=_0xf21018;}}else{if(this[_0x5a6ebe(0x1ce)]()){if('FqrnI'!==_0x5a6ebe(0x15f)){function _0x593bce(){const _0x4d3871=_0x5a6ebe;this[_0x4d3871(0x26c)]>0x0&&(this[_0x4d3871(0x1ce)]()&&(this['x']=this[_0x4d3871(0x2b3)](this['x'],this[_0x4d3871(0x31b)]),this['y']=this[_0x4d3871(0x2b3)](this['y'],this[_0x4d3871(0x2b6)]),this[_0x4d3871(0x145)]=this['applyMoveEasing'](this['width'],this[_0x4d3871(0x233)]),this[_0x4d3871(0x203)]=this[_0x4d3871(0x2b3)](this[_0x4d3871(0x203)],this['_moveTargetHeight']),this[_0x4d3871(0x243)]()),this[_0x4d3871(0x26c)]--);}}else this['x']=this[_0x5a6ebe(0x2b3)](this['x'],this['_moveTargetX']),this['y']=this['applyMoveEasing'](this['y'],this[_0x5a6ebe(0x2b6)]),this[_0x5a6ebe(0x145)]=this[_0x5a6ebe(0x2b3)](this[_0x5a6ebe(0x145)],this[_0x5a6ebe(0x233)]),this[_0x5a6ebe(0x203)]=this[_0x5a6ebe(0x2b3)](this[_0x5a6ebe(0x203)],this[_0x5a6ebe(0x157)]),this[_0x5a6ebe(0x243)]();}this[_0x5a6ebe(0x26c)]--;}}},Window_Base[_0x42f345(0x19b)][_0x42f345(0x243)]=function(_0x22737b,_0x2fba13){const _0x566da0=_0x42f345;if(!_0x22737b){if(_0x566da0(0x31a)!==_0x566da0(0x31a)){function _0x154fb4(){return!![];}}else this[_0x566da0(0x145)]=Math[_0x566da0(0x299)](this['width'],Graphics[_0x566da0(0x145)]),this[_0x566da0(0x203)]=Math[_0x566da0(0x299)](this[_0x566da0(0x203)],Graphics[_0x566da0(0x203)]);}if(!_0x2fba13){const _0x2a0726=-(Math[_0x566da0(0x2e2)](Graphics[_0x566da0(0x145)]-Graphics['boxWidth'])/0x2),_0xe6b8b1=_0x2a0726+Graphics[_0x566da0(0x145)]-this[_0x566da0(0x145)],_0x5a9a7e=-(Math['floor'](Graphics['height']-Graphics['boxHeight'])/0x2),_0x4bbe7e=_0x5a9a7e+Graphics[_0x566da0(0x203)]-this[_0x566da0(0x203)];this['x']=this['x'][_0x566da0(0x138)](_0x2a0726,_0xe6b8b1),this['y']=this['y']['clamp'](_0x5a9a7e,_0x4bbe7e);}},Window_Base[_0x42f345(0x19b)][_0x42f345(0x2b3)]=function(_0x5578da,_0x38d6c3){const _0x1a1465=_0x42f345,_0x46bfd7=this[_0x1a1465(0x26c)],_0x2c3f5e=this['_wholeMoveDuration'],_0x240dc0=this[_0x1a1465(0x166)]((_0x2c3f5e-_0x46bfd7)/_0x2c3f5e),_0xeb12ea=this['calcMoveEasing']((_0x2c3f5e-_0x46bfd7+0x1)/_0x2c3f5e),_0x2055ac=(_0x5578da-_0x38d6c3*_0x240dc0)/(0x1-_0x240dc0);return _0x2055ac+(_0x38d6c3-_0x2055ac)*_0xeb12ea;},Window_Base[_0x42f345(0x19b)][_0x42f345(0x166)]=function(_0x193ff5){const _0x2a0355=_0x42f345,_0x422822=0x2;switch(this[_0x2a0355(0x220)]){case 0x0:return _0x193ff5;case 0x1:return this['easeIn'](_0x193ff5,_0x422822);case 0x2:return this['easeOut'](_0x193ff5,_0x422822);case 0x3:return this[_0x2a0355(0x2b4)](_0x193ff5,_0x422822);default:return Imported[_0x2a0355(0x273)]?VisuMZ['applyMoveEasing'](_0x193ff5,this[_0x2a0355(0x220)]):_0x193ff5;}},Window_Base[_0x42f345(0x19b)][_0x42f345(0x219)]=function(_0x3d5370,_0x277170,_0x4ea131,_0x311d25,_0x27742f,_0x22bd22){const _0x58194a=_0x42f345;this[_0x58194a(0x31b)]=_0x3d5370,this[_0x58194a(0x2b6)]=_0x277170,this[_0x58194a(0x233)]=_0x4ea131||this['width'],this[_0x58194a(0x157)]=_0x311d25||this[_0x58194a(0x203)],this[_0x58194a(0x26c)]=_0x27742f||0x1;if(this['_moveDuration']<=0x0)this['_moveDuration']=0x1;this['_wholeMoveDuration']=this[_0x58194a(0x26c)],this[_0x58194a(0x220)]=_0x22bd22||0x0;if(_0x27742f<=0x0)this[_0x58194a(0xd0)]();},Window_Base['prototype']['moveBy']=function(_0x2f864c,_0x417d49,_0x1540a1,_0x3d0de3,_0x1b630d,_0x5163cf){const _0x2c45af=_0x42f345;this['_moveTargetX']=this['x']+_0x2f864c,this['_moveTargetY']=this['y']+_0x417d49,this[_0x2c45af(0x233)]=this[_0x2c45af(0x145)]+(_0x1540a1||0x0),this[_0x2c45af(0x157)]=this[_0x2c45af(0x203)]+(_0x3d0de3||0x0),this[_0x2c45af(0x26c)]=_0x1b630d||0x1;if(this[_0x2c45af(0x26c)]<=0x0)this['_moveDuration']=0x1;this[_0x2c45af(0x323)]=this[_0x2c45af(0x26c)],this['_moveEasingType']=_0x5163cf||0x0;if(_0x1b630d<=0x0)this[_0x2c45af(0xd0)]();},Window_Base['prototype'][_0x42f345(0x2f8)]=function(_0x512496,_0x50323c){const _0x5f2a91=_0x42f345;this['moveTo'](this[_0x5f2a91(0x2bb)]['x'],this[_0x5f2a91(0x2bb)]['y'],this[_0x5f2a91(0x2bb)][_0x5f2a91(0x145)],this[_0x5f2a91(0x2bb)][_0x5f2a91(0x203)],_0x512496,_0x50323c);},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x262)]=Window_Base[_0x42f345(0x19b)][_0x42f345(0x211)],Window_Base[_0x42f345(0x19b)][_0x42f345(0x211)]=function(_0x1335cf){const _0x53922f=_0x42f345;if(this[_0x53922f(0x1e6)]())return;_0x1335cf=_0x1335cf[_0x53922f(0x2aa)](/\,/g,''),this[_0x53922f(0x27e)]=this[_0x53922f(0x27e)]||[],this[_0x53922f(0x27e)]['unshift'](this['contents'][_0x53922f(0x103)]),VisuMZ['MessageCore'][_0x53922f(0x262)][_0x53922f(0x336)](this,_0x1335cf);},Window_Base[_0x42f345(0x19b)][_0x42f345(0x288)]=function(_0x3e9b5d){const _0x1f5c6e=_0x42f345;this[_0x1f5c6e(0x2bf)](_0x3e9b5d);if(this[_0x1f5c6e(0x1e6)]())return;_0x3e9b5d[_0x1f5c6e(0x22f)]&&(this[_0x1f5c6e(0x27e)]=this[_0x1f5c6e(0x27e)]||[],this[_0x1f5c6e(0x31f)][_0x1f5c6e(0x103)]=this[_0x1f5c6e(0x27e)][_0x1f5c6e(0x268)]()||ColorManager[_0x1f5c6e(0x2d0)]());},Window_Base[_0x42f345(0x19b)]['convertEscapeCharacters']=function(_0x134b7d){const _0x212638=_0x42f345;return _0x134b7d=this[_0x212638(0x279)](_0x134b7d),_0x134b7d=this[_0x212638(0x16e)](_0x134b7d),_0x134b7d=this['convertVariableEscapeCharacters'](_0x134b7d),_0x134b7d=this[_0x212638(0x122)](_0x134b7d),_0x134b7d=this[_0x212638(0x1c3)](_0x134b7d),_0x134b7d=this[_0x212638(0x1dd)](_0x134b7d),_0x134b7d=this[_0x212638(0x1db)](_0x134b7d),_0x134b7d=this[_0x212638(0x136)](_0x134b7d),_0x134b7d=this[_0x212638(0x163)](_0x134b7d),_0x134b7d=this[_0x212638(0x2be)](_0x134b7d),_0x134b7d=this['convertMessageCoreEscapeReplacements'](_0x134b7d),_0x134b7d=this['postConvertEscapeCharacters'](_0x134b7d),_0x134b7d=this[_0x212638(0x30a)](_0x134b7d),_0x134b7d=this['processAutoColorWords'](_0x134b7d),_0x134b7d=this[_0x212638(0x18f)](_0x134b7d),_0x134b7d;},Window_Base[_0x42f345(0x19b)]['convertTextMacros']=function(_0x5efeea){const _0x29d48e=_0x42f345;for(const _0x9c0f2a of VisuMZ[_0x29d48e(0x2cf)][_0x29d48e(0x1d0)][_0x29d48e(0xd2)]){if(_0x5efeea[_0x29d48e(0x1b5)](_0x9c0f2a[_0x29d48e(0xe6)])){if(_0x29d48e(0x184)!==_0x29d48e(0x184)){function _0x4be545(){const _0x5843fc=_0x29d48e;this[_0x5843fc(0x27e)]=this[_0x5843fc(0x27e)]||[],this['contents'][_0x5843fc(0x103)]=this[_0x5843fc(0x27e)][_0x5843fc(0x268)]()||_0x536c33[_0x5843fc(0x2d0)]();}}else _0x5efeea=_0x5efeea[_0x29d48e(0x2aa)](_0x9c0f2a[_0x29d48e(0xe6)],_0x9c0f2a['textCodeResult'][_0x29d48e(0x2a4)](this));}}return _0x5efeea;},Window_Base[_0x42f345(0x19b)][_0x42f345(0x16e)]=function(_0x44255b){const _0x3965d9=_0x42f345;return _0x44255b=_0x44255b[_0x3965d9(0x2aa)](/\\/g,'\x1b'),_0x44255b=_0x44255b['replace'](/\x1b\x1b/g,'\x5c'),_0x44255b;},Window_Base['prototype'][_0x42f345(0x30a)]=function(_0x131488){const _0x24a5dd=_0x42f345;for(;;){if(_0x24a5dd(0x30d)!==_0x24a5dd(0xba)){if(_0x131488['match'](/\\V\[(\d+)\]/gi))_0x131488=_0x131488[_0x24a5dd(0x2aa)](/\\V\[(\d+)\]/gi,(_0x4192fa,_0x1f3a1)=>this[_0x24a5dd(0x16e)](String($gameVariables[_0x24a5dd(0x263)](parseInt(_0x1f3a1)))));else{if(_0x131488[_0x24a5dd(0x1b5)](/\x1bV\[(\d+)\]/gi)){if('LBqKw'==='LBqKw')_0x131488=_0x131488[_0x24a5dd(0x2aa)](/\x1bV\[(\d+)\]/gi,(_0x5c9df0,_0x123915)=>this[_0x24a5dd(0x16e)](String($gameVariables[_0x24a5dd(0x263)](parseInt(_0x123915)))));else{function _0x44006b(){const _0x5d1e3e=_0x24a5dd;return this[_0x5d1e3e(0x32c)]()===0x191;}}}else break;}}else{function _0x54f9f7(){_0x53ba3c='';}}}return _0x131488;},Window_Base[_0x42f345(0x19b)]['preConvertEscapeCharacters']=function(_0x3b5392){const _0x22e33b=_0x42f345;return this[_0x22e33b(0x28a)](),_0x3b5392;},Window_Base[_0x42f345(0x19b)][_0x42f345(0x2cc)]=function(_0x35f2e9){return _0x35f2e9;},Window_Base['prototype']['convertShowChoiceEscapeCodes']=function(_0x533d35){const _0x1eba24=_0x42f345;return _0x533d35=_0x533d35['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x533d35=_0x533d35[_0x1eba24(0x2aa)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x533d35=_0x533d35[_0x1eba24(0x2aa)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x533d35;},Window_Base[_0x42f345(0x19b)][_0x42f345(0x1dd)]=function(_0x301f39){const _0x1ac24d=_0x42f345;return _0x301f39=_0x301f39[_0x1ac24d(0x2aa)](/<B>/gi,_0x1ac24d(0x148)),_0x301f39=_0x301f39[_0x1ac24d(0x2aa)](/<\/B>/gi,_0x1ac24d(0x206)),_0x301f39=_0x301f39['replace'](/<I>/gi,_0x1ac24d(0x1b1)),_0x301f39=_0x301f39['replace'](/<\/I>/gi,_0x1ac24d(0xdf)),_0x301f39;},Window_Base[_0x42f345(0x19b)]['convertTextAlignmentEscapeCharacters']=function(_0x35a061){const _0x40da19=_0x42f345;return _0x35a061=_0x35a061['replace'](/<LEFT>/gi,_0x40da19(0x188)),_0x35a061=_0x35a061[_0x40da19(0x2aa)](/<\/LEFT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x35a061=_0x35a061['replace'](/<CENTER>/gi,'\x1bTEXTALIGNMENT[2]'),_0x35a061=_0x35a061[_0x40da19(0x2aa)](/<\/CENTER>/gi,_0x40da19(0x2eb)),_0x35a061=_0x35a061[_0x40da19(0x2aa)](/<RIGHT>/gi,_0x40da19(0x1c7)),_0x35a061=_0x35a061[_0x40da19(0x2aa)](/<\/RIGHT>/gi,_0x40da19(0x2eb)),_0x35a061;},Window_Base['prototype'][_0x42f345(0x136)]=function(_0xc3a937){const _0x44de7b=_0x42f345;return _0xc3a937=_0xc3a937['replace'](/<COLORLOCK>/gi,_0x44de7b(0x200)),_0xc3a937=_0xc3a937[_0x44de7b(0x2aa)](/<\/COLORLOCK>/gi,'\x1bCOLORLOCK[0]'),_0xc3a937=_0xc3a937[_0x44de7b(0x2aa)](/\(\(\(/gi,'\x1bCOLORLOCK[1]'),_0xc3a937=_0xc3a937[_0x44de7b(0x2aa)](/\)\)\)/gi,'\x1bCOLORLOCK[0]'),_0xc3a937;},Window_Base['prototype'][_0x42f345(0x163)]=function(_0x375637){const _0x735fa5=_0x42f345;return _0x375637=_0x375637[_0x735fa5(0x2aa)](/\x1bN\[(\d+)\]/gi,(_0x106712,_0x29c575)=>this['actorName'](parseInt(_0x29c575))),_0x375637=_0x375637['replace'](/\x1bP\[(\d+)\]/gi,(_0x587b85,_0x4fad10)=>this['partyMemberName'](parseInt(_0x4fad10))),_0x375637=_0x375637[_0x735fa5(0x2aa)](/\x1bG/gi,TextManager['currencyUnit']),_0x375637;},Window_Base['prototype']['convertMessageCoreEscapeActions']=function(_0x12447a){const _0x433d48=_0x42f345;for(const _0xed33ef of VisuMZ[_0x433d48(0x2cf)]['Settings']['TextCodeActions']){if(_0x433d48(0x201)===_0x433d48(0x201))_0x12447a[_0x433d48(0x1b5)](_0xed33ef[_0x433d48(0xe6)])&&(_0x12447a=_0x12447a[_0x433d48(0x2aa)](_0xed33ef[_0x433d48(0xe6)],_0xed33ef[_0x433d48(0x32e)]),_0x12447a=this['convertVariableEscapeCharacters'](_0x12447a));else{function _0x57ea99(){const _0x22bc76=_0x433d48;_0x24aa66[_0x22bc76(0x2cf)][_0x22bc76(0x1fe)][_0x22bc76(0x336)](this,_0x51d504);const _0x19c1a2=_0x15ef9c[_0x22bc76(0x2cf)]['Settings'][_0x22bc76(0x176)];_0x334185[_0x22bc76(0x2cf)][_0x22bc76(0x32a)](_0x1bcad2,_0x19c1a2[_0x22bc76(0xe7)]);}}}return _0x12447a;},Window_Base[_0x42f345(0x19b)][_0x42f345(0x30c)]=function(_0x457b27){const _0x3d67b3=_0x42f345;for(const _0xfb8d26 of VisuMZ[_0x3d67b3(0x2cf)][_0x3d67b3(0x1d0)][_0x3d67b3(0x187)]){if(_0x3d67b3(0x19a)!==_0x3d67b3(0x110))_0x457b27[_0x3d67b3(0x1b5)](_0xfb8d26[_0x3d67b3(0xe6)])&&(_0x457b27=_0x457b27[_0x3d67b3(0x2aa)](_0xfb8d26[_0x3d67b3(0xe6)],_0xfb8d26[_0x3d67b3(0x32e)]['bind'](this)),_0x457b27=this[_0x3d67b3(0x30a)](_0x457b27));else{function _0x54e78e(){const _0x395520=_0x3d67b3;this[_0x395520(0x214)]=null;}}}return _0x457b27;},Window_Base[_0x42f345(0x19b)][_0x42f345(0xe5)]=function(_0x256bc4){const _0x7c79cd=_0x42f345,_0x3cf36f=_0x256bc4>=0x1?$gameActors['actor'](_0x256bc4):null,_0x37c290=_0x3cf36f?_0x3cf36f[_0x7c79cd(0x131)]():'',_0x26b93c=Number(VisuMZ[_0x7c79cd(0x2cf)][_0x7c79cd(0x1d0)][_0x7c79cd(0x176)][_0x7c79cd(0x115)]);if(this[_0x7c79cd(0x2b7)]()&&_0x26b93c!==0x0)return _0x7c79cd(0xc0)['format'](_0x26b93c,_0x37c290);else{if(_0x7c79cd(0x106)===_0x7c79cd(0x291)){function _0x21d595(){const _0x2ed842=_0x7c79cd;_0x2741ca[_0x2ed842(0xe6)]=new _0x132914('\x1b'+_0xabb3f6[_0x2ed842(0x104)]+_0x32c2c3[_0x2ed842(0x260)],'gi'),_0xed156b['TextStr']!==''&&_0x1cc1f6[_0x2ed842(0x232)]!==_0x2ed842(0x2c2)?_0x155c7c[_0x2ed842(0x32e)]=new _0x238621(_0x2ed842(0x2f2)+_0x5c8220[_0x2ed842(0x232)][_0x2ed842(0x2aa)](/\\/g,'\x1b')+'\x27'):_0x48cc10['textCodeResult']=_0xe9085['TextJS'];}}else return _0x37c290;}},Window_Base[_0x42f345(0x19b)][_0x42f345(0x21b)]=function(_0x55240f){const _0x109a7b=_0x42f345,_0x5a530d=_0x55240f>=0x1?$gameParty[_0x109a7b(0xc1)]()[_0x55240f-0x1]:null,_0x294153=_0x5a530d?_0x5a530d[_0x109a7b(0x131)]():'',_0x2e4ef6=Number(VisuMZ[_0x109a7b(0x2cf)]['Settings']['AutoColor'][_0x109a7b(0x115)]);if(this[_0x109a7b(0x2b7)]()&&_0x2e4ef6!==0x0)return _0x109a7b(0xc0)[_0x109a7b(0x226)](_0x2e4ef6,_0x294153);else{if(_0x109a7b(0x21c)!=='IacHm'){function _0x2179b5(){return!![];}}else return _0x294153;}},Window_Base[_0x42f345(0x19b)][_0x42f345(0x160)]=function(_0x9cbe20){const _0x1fa48f=_0x42f345;return this[_0x1fa48f(0x2b7)]()&&(_0x9cbe20=this['processStoredAutoColorChanges'](_0x9cbe20),_0x9cbe20=this[_0x1fa48f(0x1aa)](_0x9cbe20)),_0x9cbe20;},Window_Base[_0x42f345(0x19b)]['processStoredAutoColorChanges']=function(_0x46b94d){const _0x3f7ce0=_0x42f345;for(autoColor of VisuMZ['MessageCore'][_0x3f7ce0(0x1be)]){_0x46b94d=_0x46b94d[_0x3f7ce0(0x2aa)](autoColor[0x0],autoColor[0x1]);}return _0x46b94d;},Window_Base['prototype'][_0x42f345(0x1fd)]=function(){const _0x1c4fc7=_0x42f345;this[_0x1c4fc7(0xc6)]=[];},Window_Base[_0x42f345(0x19b)]['registerActorNameAutoColorChanges']=function(){const _0x5f5056=_0x42f345;this[_0x5f5056(0x1fd)]();const _0x4fc8e2=VisuMZ[_0x5f5056(0x2cf)][_0x5f5056(0x1d0)][_0x5f5056(0x176)],_0x9b60d=_0x4fc8e2[_0x5f5056(0x115)];if(_0x9b60d<=0x0)return;for(const _0x328015 of $gameActors[_0x5f5056(0x2c1)]){if(!_0x328015)continue;const _0x3c2a8c=_0x328015[_0x5f5056(0x131)]();if(_0x3c2a8c[_0x5f5056(0x313)]()['length']<=0x0)continue;if(/^\d+$/[_0x5f5056(0x1b9)](_0x3c2a8c))continue;if(_0x3c2a8c[_0x5f5056(0x1b5)](/-----/i))continue;let _0x3874fa=VisuMZ[_0x5f5056(0x2cf)][_0x5f5056(0x327)](_0x3c2a8c);const _0x5db6e9=new RegExp('\x5cb'+_0x3874fa+'\x5cb','g'),_0x130401=_0x5f5056(0xc0)[_0x5f5056(0x226)](_0x9b60d,_0x3c2a8c);this[_0x5f5056(0xc6)][_0x5f5056(0x28b)]([_0x5db6e9,_0x130401]);}},Window_Base[_0x42f345(0x19b)][_0x42f345(0x1aa)]=function(_0xc0cdea){const _0x5c9805=_0x42f345;this[_0x5c9805(0xc6)]===undefined&&this[_0x5c9805(0x28a)]();for(autoColor of this[_0x5c9805(0xc6)]){_0xc0cdea=_0xc0cdea[_0x5c9805(0x2aa)](autoColor[0x0],autoColor[0x1]);}return _0xc0cdea;},Window_Base[_0x42f345(0x19b)][_0x42f345(0x2c3)]=function(_0x4c01a6,_0x298fcf,_0x26a586){const _0x1ad3c9=_0x42f345;if(!_0x4c01a6)return'';const _0xed1ef1=_0x4c01a6[_0x298fcf];let _0x19d86f='';if(_0xed1ef1&&_0x26a586&&_0xed1ef1['iconIndex']){const _0x457a61=_0x1ad3c9(0x333);_0x19d86f=_0x457a61[_0x1ad3c9(0x226)](_0xed1ef1['iconIndex'],_0xed1ef1['name']);}else{if(_0xed1ef1){if('xXNDe'!==_0x1ad3c9(0x2d4))_0x19d86f=_0xed1ef1[_0x1ad3c9(0x131)];else{function _0x42a6da(){const _0x22b857=_0x1ad3c9;_0x16f8b9=_0x504cad[_0x22b857(0x2aa)](_0x3f7900[_0x22b857(0x32f)],''),_0x36e530=_0x434f0b['replace'](_0x25fd20[_0x22b857(0x2ed)],''),this[_0x22b857(0x2e9)]=!![];const _0x305bbc=this[_0x22b857(0x222)](_0x3cf781);if(_0x3fd157){let _0x360b13=_0x305bbc[_0x22b857(0x145)]+_0x51b8c6[_0x22b857(0x314)]()*0x2+0x6;const _0x48a8e8=_0x497d98[_0x22b857(0x1a2)]()!=='',_0x40779d=_0x17692f[_0x22b857(0x1bc)],_0x540051=0x14;_0x360b13+=_0x48a8e8?_0x40779d+_0x540051:0x4;if(_0x360b13%0x2!==0x0)_0x360b13+=0x1;_0x2a4138[_0x22b857(0xec)](_0x360b13);}if(_0xfbe067){let _0x526f5f=_0x2a56c5[_0x22b857(0x1cf)](_0x305bbc[_0x22b857(0x203)]/this['lineHeight']());_0x5c09f1[_0x22b857(0xf8)](_0x526f5f);}this[_0x22b857(0x120)](),this[_0x22b857(0x2e9)]=![],this[_0x22b857(0x2ba)]=!![];}}}else _0x19d86f='';}if(this[_0x1ad3c9(0x2b7)]()){if(_0x1ad3c9(0xb7)!==_0x1ad3c9(0x111))_0x19d86f=this['applyDatabaseAutoColor'](_0x19d86f,_0x4c01a6);else{function _0x13c3e6(){const _0x531bc1=_0x1ad3c9;if(_0x42c4b4[_0x531bc1(0x263)](_0x4d31af))return![];}}}return _0x19d86f;},Window_Base[_0x42f345(0x19b)][_0x42f345(0x2c0)]=function(_0x5bd01e){const _0x50a8af=_0x42f345,_0x4c3721=$gameParty[_0x50a8af(0xe3)]();if(_0x4c3721['id']<0x0)return'';let _0x263cce=null;if(_0x4c3721[_0x50a8af(0x2d2)]===0x0)_0x263cce=$dataItems[_0x4c3721['id']];if(_0x4c3721[_0x50a8af(0x2d2)]===0x1)_0x263cce=$dataWeapons[_0x4c3721['id']];if(_0x4c3721['type']===0x2)_0x263cce=$dataArmors[_0x4c3721['id']];if(!_0x263cce)return'';return _0x5bd01e?_0x50a8af(0x333)[_0x50a8af(0x226)](_0x263cce['iconIndex'],_0x263cce['name']):_0x263cce[_0x50a8af(0x131)];},Window_Base[_0x42f345(0x19b)][_0x42f345(0x282)]=function(){const _0x38218e=_0x42f345,_0x1bb465=$gameParty[_0x38218e(0xe3)]();if(_0x1bb465['id']<=0x0)return'';return _0x1bb465[_0x38218e(0x10f)];},Window_Base[_0x42f345(0x19b)][_0x42f345(0x114)]=function(_0x323100,_0x3a2811){const _0x5ecd35=_0x42f345,_0x333bb7=VisuMZ['MessageCore'][_0x5ecd35(0x1d0)]['AutoColor'];let _0x9df76f=0x0;if(_0x3a2811===$dataActors)_0x9df76f=_0x333bb7[_0x5ecd35(0x115)];if(_0x3a2811===$dataClasses)_0x9df76f=_0x333bb7['Classes'];if(_0x3a2811===$dataSkills)_0x9df76f=_0x333bb7[_0x5ecd35(0x175)];if(_0x3a2811===$dataItems)_0x9df76f=_0x333bb7[_0x5ecd35(0xe7)];if(_0x3a2811===$dataWeapons)_0x9df76f=_0x333bb7[_0x5ecd35(0x2b0)];if(_0x3a2811===$dataArmors)_0x9df76f=_0x333bb7[_0x5ecd35(0x29a)];if(_0x3a2811===$dataEnemies)_0x9df76f=_0x333bb7[_0x5ecd35(0x11f)];if(_0x3a2811===$dataStates)_0x9df76f=_0x333bb7[_0x5ecd35(0x2e3)];return _0x9df76f>0x0&&(_0x323100=_0x5ecd35(0xc0)[_0x5ecd35(0x226)](_0x9df76f,_0x323100)),_0x323100;},Window_Base[_0x42f345(0x19b)]['prepareWordWrapEscapeCharacters']=function(_0x177a58){const _0x3dd1b0=_0x42f345;_0x177a58=_0x177a58[_0x3dd1b0(0x2aa)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x2ee150,_0x2e6250)=>this[_0x3dd1b0(0x1c6)](!![])),_0x177a58=_0x177a58[_0x3dd1b0(0x2aa)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x1ecec1,_0x23e481)=>this[_0x3dd1b0(0x1c6)](![])),_0x177a58=_0x177a58[_0x3dd1b0(0x2aa)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x342e17,_0x1bee62)=>this[_0x3dd1b0(0x1c6)](![]));if(_0x177a58[_0x3dd1b0(0x1b5)](Window_Message[_0x3dd1b0(0x32f)])){if(_0x3dd1b0(0xfb)==='NXyLW'){function _0x4f4594(){const _0x86b725=_0x3dd1b0;this[_0x86b725(0x31b)]=_0xfe30e7,this[_0x86b725(0x2b6)]=_0xc5c455,this[_0x86b725(0x233)]=_0x2337c2||this[_0x86b725(0x145)],this[_0x86b725(0x157)]=_0x423579||this['height'],this[_0x86b725(0x26c)]=_0x2cef27||0x1;if(this[_0x86b725(0x26c)]<=0x0)this[_0x86b725(0x26c)]=0x1;this['_wholeMoveDuration']=this[_0x86b725(0x26c)],this[_0x86b725(0x220)]=_0x294fe3||0x0;if(_0xd82717<=0x0)this[_0x86b725(0xd0)]();}}else this['setWordWrap'](![]);}else _0x177a58['match'](Window_Message[_0x3dd1b0(0x2ed)])&&this['setWordWrap'](![]);if(!this['isWordWrapEnabled']())return _0x177a58;if(_0x177a58[_0x3dd1b0(0x2d8)]<=0x0)return _0x177a58;return VisuMZ[_0x3dd1b0(0x2cf)][_0x3dd1b0(0x1d0)][_0x3dd1b0(0xe1)][_0x3dd1b0(0x21f)]?(_0x177a58=_0x177a58['replace'](/[\n\r]+/g,'\x20'),_0x177a58=_0x177a58[_0x3dd1b0(0x2aa)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x177a58=_0x177a58[_0x3dd1b0(0x2aa)](/[\n\r]+/g,''),_0x177a58=_0x177a58[_0x3dd1b0(0x2aa)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x177a58=this[_0x3dd1b0(0x254)](_0x177a58),_0x177a58=_0x177a58[_0x3dd1b0(0x1a6)]('\x20')[_0x3dd1b0(0x1a3)](_0x3dd1b0(0x23c)),_0x177a58=_0x177a58['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x177a58=_0x177a58[_0x3dd1b0(0x2aa)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x177a58;},Window_Base[_0x42f345(0x19b)][_0x42f345(0x254)]=function(_0xcf770){return _0xcf770;},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x182)]=Window_Base[_0x42f345(0x19b)]['processNewLine'],Window_Base[_0x42f345(0x19b)][_0x42f345(0x1bb)]=function(_0x1e315d){const _0xcec7b9=_0x42f345;VisuMZ[_0xcec7b9(0x2cf)]['Window_Base_processNewLine'][_0xcec7b9(0x336)](this,_0x1e315d),this['processTextAlignmentX'](_0x1e315d);},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x10c)]=Window_Base[_0x42f345(0x19b)][_0x42f345(0x144)],Window_Base[_0x42f345(0x19b)][_0x42f345(0x144)]=function(_0x55e0ac,_0x5b16d9){const _0x38fcfb=_0x42f345;VisuMZ[_0x38fcfb(0x2cf)][_0x38fcfb(0x10c)][_0x38fcfb(0x336)](this,_0x55e0ac,_0x5b16d9);if(_0x5b16d9==='\x1bWrapBreak[0]'){if('QKNGh'!==_0x38fcfb(0x338))this[_0x38fcfb(0x28f)](_0x55e0ac);else{function _0x40459a(){const _0x47e34d=_0x38fcfb;_0x3344a7[_0x47e34d(0x2cf)][_0x47e34d(0x244)](_0x47e34d(0x187));for(const _0x5e16a1 of _0x55f886[_0x47e34d(0x2cf)][_0x47e34d(0x1d0)][_0x47e34d(0x187)]){_0x5e16a1[_0x47e34d(0xe6)]=new _0x23134e('\x1b'+_0x5e16a1[_0x47e34d(0x104)]+_0x5e16a1[_0x47e34d(0x260)],'gi'),_0x5e16a1[_0x47e34d(0x232)]!==''&&_0x5e16a1['TextStr']!=='Undefined'?_0x5e16a1[_0x47e34d(0x32e)]=new _0x1c4559(_0x47e34d(0x2f2)+_0x5e16a1[_0x47e34d(0x232)][_0x47e34d(0x2aa)](/\\/g,'\x1b')+'\x27'):_0x5e16a1[_0x47e34d(0x32e)]=_0x5e16a1[_0x47e34d(0x1cb)];}}}}},Window_Base[_0x42f345(0x19b)][_0x42f345(0x1fc)]=function(_0x16e939){const _0x1aa7d7=_0x42f345;var _0x2c3836=/^\<(.*?)\>/[_0x1aa7d7(0x196)](_0x16e939[_0x1aa7d7(0x317)]['slice'](_0x16e939[_0x1aa7d7(0x266)]));return _0x2c3836?(_0x16e939['index']+=_0x2c3836[0x0]['length'],String(_0x2c3836[0x0]['slice'](0x1,_0x2c3836[0x0][_0x1aa7d7(0x2d8)]-0x1))):'';},VisuMZ[_0x42f345(0x2cf)]['Window_Base_processEscapeCharacter']=Window_Base[_0x42f345(0x19b)]['processEscapeCharacter'],Window_Base[_0x42f345(0x19b)][_0x42f345(0xc5)]=function(_0x421ef5,_0x2abfad){const _0x446def=_0x42f345;switch(_0x421ef5){case'C':_0x2abfad[_0x446def(0x22f)]?VisuMZ[_0x446def(0x2cf)][_0x446def(0x303)][_0x446def(0x336)](this,_0x421ef5,_0x2abfad):this[_0x446def(0x2bf)](_0x2abfad);break;case'I':case'{':case'}':VisuMZ[_0x446def(0x2cf)][_0x446def(0x303)][_0x446def(0x336)](this,_0x421ef5,_0x2abfad);break;case'FS':this['processFsTextCode'](_0x2abfad);break;case'PX':this['processPxTextCode'](_0x2abfad);break;case'PY':this['processPyTextCode'](_0x2abfad);break;case _0x446def(0x2f9):this[_0x446def(0x12e)](this[_0x446def(0x2bf)](_0x2abfad));break;case _0x446def(0x19e):this[_0x446def(0x172)](_0x2abfad);break;case _0x446def(0x16c):this[_0x446def(0x210)](_0x2abfad);break;case _0x446def(0x164):this['processCommonEvent'](_0x2abfad);break;case _0x446def(0x308):this[_0x446def(0x1b3)](this['obtainEscapeParam'](_0x2abfad));break;case _0x446def(0x247):this[_0x446def(0x24d)](_0x2abfad);break;case'PREVCOLOR':this[_0x446def(0x288)](_0x2abfad);break;case _0x446def(0x2a3):this[_0x446def(0x132)](_0x2abfad);break;case'WAIT':this[_0x446def(0x191)](_0x2abfad);break;case'WRAPBREAK':this[_0x446def(0x28f)](_0x2abfad);break;default:this['processMessageCoreEscapeActions'](_0x421ef5,_0x2abfad);}},Window_Base['prototype'][_0x42f345(0x290)]=function(_0x1e2ca1,_0x53ffbd){const _0x4f2ff4=_0x42f345;for(const _0x5677d3 of VisuMZ[_0x4f2ff4(0x2cf)][_0x4f2ff4(0x1d0)][_0x4f2ff4(0x22b)]){if(_0x4f2ff4(0x12a)!==_0x4f2ff4(0x12a)){function _0x1f618e(){const _0x4932c6=_0x4f2ff4;_0xe9f07c[_0x4932c6(0x32e)]=new _0x240ca9(_0x4932c6(0x2f2)+_0x2c681c[_0x4932c6(0x232)]['replace'](/\\/g,'\x1b')+'\x27');}}else{if(_0x5677d3[_0x4f2ff4(0x104)]===_0x1e2ca1){if(_0x5677d3[_0x4f2ff4(0x260)]==='')this[_0x4f2ff4(0x2bf)](_0x53ffbd);_0x5677d3[_0x4f2ff4(0x1bf)][_0x4f2ff4(0x336)](this,_0x53ffbd);if(this['constructor']===Window_Message){if(_0x4f2ff4(0xf1)===_0x4f2ff4(0x1e9)){function _0x12cf8b(){const _0x5d9ead=_0x4f2ff4;return _0x13eaf7[_0x5d9ead(0x2b3)](_0x7410a7,this[_0x5d9ead(0x220)]);}}else{const _0x185c4a=_0x5677d3[_0x4f2ff4(0x28c)]||0x0;if(_0x185c4a>0x0)this[_0x4f2ff4(0x253)](_0x185c4a);}}}}}},Window_Base[_0x42f345(0x19b)][_0x42f345(0x127)]=function(){const _0x245b10=_0x42f345;this[_0x245b10(0x31f)][_0x245b10(0x109)]+=VisuMZ[_0x245b10(0x2cf)]['Settings'][_0x245b10(0x29d)][_0x245b10(0x205)],this[_0x245b10(0x31f)][_0x245b10(0x109)]=Math[_0x245b10(0x299)](this[_0x245b10(0x31f)]['fontSize'],VisuMZ['MessageCore'][_0x245b10(0x1d0)][_0x245b10(0x29d)][_0x245b10(0x189)]);},Window_Base[_0x42f345(0x19b)][_0x42f345(0x15e)]=function(){const _0x1f2cc0=_0x42f345;this[_0x1f2cc0(0x31f)][_0x1f2cc0(0x109)]-=VisuMZ['MessageCore']['Settings'][_0x1f2cc0(0x29d)][_0x1f2cc0(0x205)],this[_0x1f2cc0(0x31f)][_0x1f2cc0(0x109)]=Math[_0x1f2cc0(0x1f0)](this['contents'][_0x1f2cc0(0x109)],VisuMZ[_0x1f2cc0(0x2cf)][_0x1f2cc0(0x1d0)][_0x1f2cc0(0x29d)][_0x1f2cc0(0x2af)]);},Window_Base[_0x42f345(0x19b)][_0x42f345(0x141)]=function(_0x2940e3){const _0x291143=_0x42f345,_0x4c0fda=this['obtainEscapeParam'](_0x2940e3);this[_0x291143(0x31f)]['fontSize']=_0x4c0fda['clamp'](VisuMZ[_0x291143(0x2cf)][_0x291143(0x1d0)][_0x291143(0x29d)][_0x291143(0x2af)],VisuMZ[_0x291143(0x2cf)][_0x291143(0x1d0)][_0x291143(0x29d)][_0x291143(0x189)]);},Window_Base[_0x42f345(0x19b)]['maxFontSizeInLine']=function(_0x47c2fc){const _0x3a54e7=_0x42f345;let _0x48e860=this[_0x3a54e7(0x31f)][_0x3a54e7(0x109)];const _0x572406=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x4683b5=_0x572406[_0x3a54e7(0x196)](_0x47c2fc);if(!_0x4683b5){if('XARqE'!==_0x3a54e7(0x304))break;else{function _0x5d9154(){const _0x390c84=_0x3a54e7;let _0x569be4=_0x1ed340[_0x390c84(0x1cf)](_0x10871b[_0x390c84(0x203)]/this[_0x390c84(0x22d)]());_0x3d7765[_0x390c84(0xf8)](_0x569be4);}}}const _0x182e02=String(_0x4683b5[0x1])[_0x3a54e7(0x20c)]();if(_0x182e02==='{')this[_0x3a54e7(0x127)]();else{if(_0x182e02==='}')this[_0x3a54e7(0x15e)]();else _0x182e02==='FS'&&(this['contents']['fontSize']=parseInt(_0x4683b5[0x3])[_0x3a54e7(0x138)](VisuMZ[_0x3a54e7(0x2cf)][_0x3a54e7(0x1d0)][_0x3a54e7(0x29d)]['FontSmallerCap'],VisuMZ[_0x3a54e7(0x2cf)][_0x3a54e7(0x1d0)][_0x3a54e7(0x29d)][_0x3a54e7(0x189)]));}this[_0x3a54e7(0x31f)]['fontSize']>_0x48e860&&(_0x48e860=this[_0x3a54e7(0x31f)][_0x3a54e7(0x109)]);}return _0x48e860;},Window_Base[_0x42f345(0x19b)]['processPxTextCode']=function(_0x3e05b5){const _0x45a2a8=_0x42f345;_0x3e05b5['x']=this[_0x45a2a8(0x2bf)](_0x3e05b5);if(VisuMZ[_0x45a2a8(0x2cf)][_0x45a2a8(0x1d0)][_0x45a2a8(0x29d)][_0x45a2a8(0x126)]){if(_0x45a2a8(0x2da)!==_0x45a2a8(0x12f))_0x3e05b5['x']+=_0x3e05b5[_0x45a2a8(0x294)];else{function _0x545606(){const _0x498925=_0x45a2a8;_0x27bcd5[_0x498925(0x2cf)]['Window_Message_processEscapeCharacter'][_0x498925(0x336)](this,_0x52b1d9,_0x341324);}}}},Window_Base['prototype'][_0x42f345(0x2e0)]=function(_0x19ed5a){const _0xe842e4=_0x42f345;_0x19ed5a['y']=this[_0xe842e4(0x2bf)](_0x19ed5a),VisuMZ[_0xe842e4(0x2cf)][_0xe842e4(0x1d0)][_0xe842e4(0x29d)]['RelativePXPY']&&(_0x19ed5a['y']+=_0x19ed5a[_0xe842e4(0x1da)]);},Window_Base[_0x42f345(0x19b)]['processFontChangeBold']=function(_0x47870c){const _0x3745ca=_0x42f345;this[_0x3745ca(0x31f)]['fontBold']=!!_0x47870c;},Window_Base['prototype'][_0x42f345(0x1b3)]=function(_0x3e216d){const _0x304eb5=_0x42f345;this['contents'][_0x304eb5(0x125)]=!!_0x3e216d;},Window_Base[_0x42f345(0x19b)]['processTextAlignmentChange']=function(_0x577f20){const _0x40b659=_0x42f345,_0x435746=this[_0x40b659(0x2bf)](_0x577f20);if(!_0x577f20[_0x40b659(0x22f)])return;switch(_0x435746){case 0x0:this['setTextAlignment'](_0x40b659(0xf4));return;case 0x1:this[_0x40b659(0x25f)](_0x40b659(0x11d));break;case 0x2:this[_0x40b659(0x25f)]('center');break;case 0x3:this[_0x40b659(0x25f)](_0x40b659(0x17a));break;}this[_0x40b659(0x119)](_0x577f20);},Window_Base[_0x42f345(0x19b)][_0x42f345(0x119)]=function(_0x450251){const _0x19e5bb=_0x42f345;if(!_0x450251[_0x19e5bb(0x22f)])return;if(_0x450251[_0x19e5bb(0x274)])return;if(this[_0x19e5bb(0x256)]()===_0x19e5bb(0xf4))return;let _0x270aaf=_0x450251[_0x19e5bb(0x317)]['indexOf'](_0x19e5bb(0xc3),_0x450251[_0x19e5bb(0x266)]+0x1),_0x46f69e=_0x450251[_0x19e5bb(0x317)][_0x19e5bb(0x267)]('\x0a',_0x450251[_0x19e5bb(0x266)]+0x1);if(_0x270aaf<0x0)_0x270aaf=_0x450251[_0x19e5bb(0x317)][_0x19e5bb(0x2d8)]+0x1;if(_0x46f69e>0x0)_0x270aaf=Math[_0x19e5bb(0x299)](_0x270aaf,_0x46f69e);const _0x1eff19=_0x450251['text'][_0x19e5bb(0x2ec)](_0x450251[_0x19e5bb(0x266)],_0x270aaf),_0x15c1b8=this[_0x19e5bb(0xdc)](_0x1eff19)[_0x19e5bb(0x145)],_0x3b666e=_0x450251[_0x19e5bb(0x145)]||this['innerWidth'],_0x3bd647=this[_0x19e5bb(0x31d)]===Window_Message&&$gameMessage[_0x19e5bb(0x1a2)]()!=='';switch(this['getTextAlignment']()){case _0x19e5bb(0x11d):_0x450251['x']=_0x450251[_0x19e5bb(0x294)];break;case _0x19e5bb(0x13c):_0x450251['x']=_0x450251[_0x19e5bb(0x294)],_0x450251['x']+=Math[_0x19e5bb(0x2e2)]((_0x3b666e-_0x15c1b8)/0x2);if(_0x3bd647){if(_0x19e5bb(0x337)!==_0x19e5bb(0x181))_0x450251['x']-=_0x450251[_0x19e5bb(0x294)]/0x2;else{function _0x20a06d(){return _0x4023d2;}}}break;case _0x19e5bb(0x17a):_0x450251['x']=_0x3b666e-_0x15c1b8+_0x450251[_0x19e5bb(0x294)];_0x3bd647&&(_0x450251['x']-=_0x450251[_0x19e5bb(0x294)]);break;}},Window_Base[_0x42f345(0x19b)][_0x42f345(0xdc)]=function(_0x19b245){const _0x388569=_0x42f345;_0x19b245=_0x19b245[_0x388569(0x2aa)](/\x1b!/g,''),_0x19b245=_0x19b245[_0x388569(0x2aa)](/\x1b\|/g,''),_0x19b245=_0x19b245['replace'](/\x1b\./g,'');const _0x33a8e5=this[_0x388569(0xea)](_0x19b245,0x0,0x0,0x0),_0x3a3c61=this[_0x388569(0x1c1)]();return _0x33a8e5[_0x388569(0x22f)]=![],this[_0x388569(0x208)](_0x33a8e5),this[_0x388569(0x185)](_0x3a3c61),{'width':_0x33a8e5['outputWidth'],'height':_0x33a8e5[_0x388569(0x302)]};},Window_Base[_0x42f345(0x19b)][_0x42f345(0x28f)]=function(_0x18692f){const _0x29712c=_0x42f345,_0x41cc46=(_0x18692f[_0x29712c(0x274)]?-0x1:0x1)*this['textWidth']('\x20');_0x18692f['x']+=_0x41cc46;if(this['obtainEscapeParam'](_0x18692f)>0x0)_0x18692f['x']+=_0x41cc46;if(_0x18692f[_0x29712c(0x274)])return;let _0x4b2386=_0x18692f['text']['indexOf'](_0x29712c(0x23c),_0x18692f[_0x29712c(0x266)]+0x1),_0x4ed88f=_0x18692f[_0x29712c(0x317)][_0x29712c(0x267)]('\x0a',_0x18692f[_0x29712c(0x266)]+0x1);if(_0x4b2386<0x0)_0x4b2386=_0x18692f[_0x29712c(0x317)][_0x29712c(0x2d8)]+0x1;if(_0x4ed88f>0x0)_0x4b2386=Math[_0x29712c(0x299)](_0x4b2386,_0x4ed88f);const _0x3f1aeb=_0x18692f['text']['substring'](_0x18692f['index'],_0x4b2386),_0x57f26e=this[_0x29712c(0x15d)](_0x3f1aeb)['width'];let _0x58bd75=_0x18692f[_0x29712c(0x145)]||this[_0x29712c(0x149)];if(this['constructor']===Window_Message){const _0x108f11=$gameMessage[_0x29712c(0x1a2)]()===''?0x0:ImageManager[_0x29712c(0x1bc)]+0x14;_0x58bd75-=_0x108f11,VisuMZ[_0x29712c(0x2cf)][_0x29712c(0x1d0)]['WordWrap'][_0x29712c(0x236)]&&(_0x58bd75-=_0x108f11);}let _0x3315b5=![];if(_0x18692f['x']+_0x57f26e>_0x18692f['startX']+_0x58bd75)_0x3315b5=!![];if(_0x57f26e===0x0)_0x3315b5=!![];_0x3315b5&&(_0x18692f[_0x29712c(0x317)]=_0x18692f[_0x29712c(0x317)][_0x29712c(0x18d)](0x0,_0x18692f['index'])+'\x0a'+_0x18692f[_0x29712c(0x317)][_0x29712c(0x10a)](_0x18692f['index']));},Window_Base[_0x42f345(0x19b)][_0x42f345(0x15d)]=function(_0x24bf0d){const _0x2bd9ed=_0x42f345,_0x396e1b=this[_0x2bd9ed(0xea)](_0x24bf0d,0x0,0x0,0x0),_0x3c90fd=this['getPreservedFontSettings']();return _0x396e1b[_0x2bd9ed(0x22f)]=![],this[_0x2bd9ed(0x1c6)](![]),this[_0x2bd9ed(0x208)](_0x396e1b),this['setWordWrap'](!![]),this[_0x2bd9ed(0x185)](_0x3c90fd),{'width':_0x396e1b[_0x2bd9ed(0x293)],'height':_0x396e1b[_0x2bd9ed(0x302)]};},Window_Base[_0x42f345(0x19b)][_0x42f345(0x105)]=function(_0x2c2223){const _0x26e1d5=_0x42f345;return this[_0x26e1d5(0x2bf)](_0x2c2223);},Window_Base['prototype'][_0x42f345(0x24d)]=function(_0x5621be){const _0x1c4443=_0x42f345,_0x49221d=this[_0x1c4443(0x1fc)](_0x5621be)[_0x1c4443(0x1a6)](',');if(!_0x5621be[_0x1c4443(0x22f)])return;const _0x27b600=_0x49221d[0x0]['trim'](),_0xa68dcb=_0x49221d[0x1]||0x0,_0x55b274=_0x49221d[0x2]||0x0,_0x1e6a86=ImageManager['loadPicture'](_0x27b600),_0x56d001=this[_0x1c4443(0x31f)][_0x1c4443(0x2c8)];_0x1e6a86['addLoadListener'](this[_0x1c4443(0x2b1)]['bind'](this,_0x1e6a86,_0x5621be['x'],_0x5621be['y'],_0xa68dcb,_0x55b274,_0x56d001));},Window_Base['prototype'][_0x42f345(0x2b1)]=function(_0x7aa2bf,_0x2e5574,_0x517a31,_0x46cc43,_0x4b07ee,_0x5d16fc){const _0x1d8433=_0x42f345;_0x46cc43=_0x46cc43||_0x7aa2bf['width'],_0x4b07ee=_0x4b07ee||_0x7aa2bf[_0x1d8433(0x203)],this['contentsBack'][_0x1d8433(0x2c8)]=_0x5d16fc,this[_0x1d8433(0x1ed)][_0x1d8433(0x1f5)](_0x7aa2bf,0x0,0x0,_0x7aa2bf[_0x1d8433(0x145)],_0x7aa2bf[_0x1d8433(0x203)],_0x2e5574,_0x517a31,_0x46cc43,_0x4b07ee),this[_0x1d8433(0x1ed)][_0x1d8433(0x2c8)]=0xff;},Window_Base[_0x42f345(0x19b)][_0x42f345(0x172)]=function(_0x22b595){const _0x5dae02=_0x42f345,_0x57a947=this[_0x5dae02(0x1fc)](_0x22b595)[_0x5dae02(0x1a6)](',');if(!_0x22b595[_0x5dae02(0x22f)])return;const _0x5023dd=_0x57a947[0x0][_0x5dae02(0x313)](),_0x25c6ea=ImageManager[_0x5dae02(0x13b)](_0x5023dd),_0x584f07=JsonEx[_0x5dae02(0xf2)](_0x22b595),_0x1d9fe8=this[_0x5dae02(0x31f)]['paintOpacity'];_0x25c6ea[_0x5dae02(0x1a7)](this['drawBackCenteredPicture'][_0x5dae02(0x2a4)](this,_0x25c6ea,_0x584f07,_0x1d9fe8));},Window_Base['prototype']['drawBackCenteredPicture']=function(_0x5c09d6,_0x43150f,_0x1df81a){const _0x4f500d=_0x42f345,_0x17d56f=_0x43150f[_0x4f500d(0x145)]||this[_0x4f500d(0x149)],_0x3b800e=this[_0x4f500d(0x252)]!==undefined?this['itemHeight']():this[_0x4f500d(0x29e)],_0x58f671=_0x17d56f/_0x5c09d6[_0x4f500d(0x145)],_0x182881=_0x3b800e/_0x5c09d6[_0x4f500d(0x203)],_0x112c6e=Math[_0x4f500d(0x299)](_0x58f671,_0x182881,0x1),_0xc601b0=this[_0x4f500d(0x252)]!==undefined?(this['itemRectWithPadding'](0x0)[_0x4f500d(0x203)]-this[_0x4f500d(0x22d)]())/0x2:0x0,_0xe3256a=_0x5c09d6[_0x4f500d(0x145)]*_0x112c6e,_0x1f99d7=_0x5c09d6[_0x4f500d(0x203)]*_0x112c6e,_0x5239af=Math[_0x4f500d(0x2e2)]((_0x17d56f-_0xe3256a)/0x2)+_0x43150f['startX'],_0x161f96=Math[_0x4f500d(0x2e2)]((_0x3b800e-_0x1f99d7)/0x2)+_0x43150f['startY']-_0xc601b0*0x2;this[_0x4f500d(0x1ed)]['paintOpacity']=_0x1df81a,this[_0x4f500d(0x1ed)][_0x4f500d(0x1f5)](_0x5c09d6,0x0,0x0,_0x5c09d6['width'],_0x5c09d6[_0x4f500d(0x203)],_0x5239af,_0x161f96,_0xe3256a,_0x1f99d7),this[_0x4f500d(0x1ed)][_0x4f500d(0x2c8)]=0xff;},Window_Base[_0x42f345(0x19b)][_0x42f345(0x210)]=function(_0x2c6adf){const _0xb41374=_0x42f345,_0x12dc77=this[_0xb41374(0x2bf)](_0x2c6adf);if(_0x2c6adf[_0xb41374(0x22f)])this[_0xb41374(0x2e6)](_0x12dc77>0x0);},Window_Base[_0x42f345(0x19b)][_0x42f345(0x191)]=function(_0xd76887){const _0x5db892=_0x42f345,_0x3ccf56=this[_0x5db892(0x2bf)](_0xd76887);this[_0x5db892(0x31d)]===Window_Message&&_0xd76887[_0x5db892(0x22f)]&&this[_0x5db892(0x259)](_0x3ccf56);},Window_Help[_0x42f345(0x19b)][_0x42f345(0x297)]=function(){const _0x59ae6c=_0x42f345;this[_0x59ae6c(0x1c6)]($gameSystem[_0x59ae6c(0x329)]());},Window_Help[_0x42f345(0x19b)][_0x42f345(0x2b7)]=function(){return!![];},VisuMZ[_0x42f345(0x2cf)]['Window_Help_refresh']=Window_Help[_0x42f345(0x19b)][_0x42f345(0x2fb)],Window_Help['prototype'][_0x42f345(0x2fb)]=function(){const _0x1b572d=_0x42f345;this['clearActorNameAutoColor'](),VisuMZ[_0x1b572d(0x2cf)][_0x1b572d(0x22e)]['call'](this),this[_0x1b572d(0x297)]();},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x108)]=Window_Options[_0x42f345(0x19b)][_0x42f345(0x281)],Window_Options['prototype']['addGeneralOptions']=function(){const _0x362ffd=_0x42f345;VisuMZ[_0x362ffd(0x2cf)]['Window_Options_addGeneralOptions'][_0x362ffd(0x336)](this),this[_0x362ffd(0x1c9)]();},Window_Options[_0x42f345(0x19b)][_0x42f345(0x1c9)]=function(){const _0x3c0f03=_0x42f345;if(VisuMZ[_0x3c0f03(0x2cf)][_0x3c0f03(0x1d0)][_0x3c0f03(0x331)]['AddOption']){if(_0x3c0f03(0x151)!==_0x3c0f03(0x2c6))this['addMessageCoreTextSpeedCommand']();else{function _0x2fc8a8(){if(_0xdda8e0['value'](_0x12a6f5))return!![];}}}},Window_Options['prototype'][_0x42f345(0x240)]=function(){const _0x458860=_0x42f345,_0x5217c0=TextManager[_0x458860(0xfe)],_0x39db26=_0x458860(0x112);this['addCommand'](_0x5217c0,_0x39db26);},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x2b8)]=Window_Options[_0x42f345(0x19b)][_0x42f345(0x2ff)],Window_Options[_0x42f345(0x19b)][_0x42f345(0x2ff)]=function(_0x27bc9c){const _0x7060d3=_0x42f345,_0x29ff94=this[_0x7060d3(0x16d)](_0x27bc9c);if(_0x29ff94===_0x7060d3(0x112))return this[_0x7060d3(0x307)]();return VisuMZ[_0x7060d3(0x2cf)][_0x7060d3(0x2b8)][_0x7060d3(0x336)](this,_0x27bc9c);},VisuMZ['MessageCore'][_0x42f345(0x2bc)]=Window_Options['prototype'][_0x42f345(0x19d)],Window_Options[_0x42f345(0x19b)][_0x42f345(0x19d)]=function(_0x57559f){const _0x14ea14=_0x42f345;if(_0x57559f==='textSpeed')return!![];return VisuMZ[_0x14ea14(0x2cf)][_0x14ea14(0x2bc)][_0x14ea14(0x336)](this,_0x57559f);},Window_Options[_0x42f345(0x19b)]['textSpeedStatusText']=function(){const _0x2f44c8=_0x42f345,_0x17987d=this[_0x2f44c8(0x1c5)]('textSpeed');return _0x17987d>0xa?TextManager[_0x2f44c8(0x2f1)]:_0x17987d;},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x158)]=Window_Options[_0x42f345(0x19b)][_0x42f345(0x12c)],Window_Options[_0x42f345(0x19b)]['changeVolume']=function(_0x4f86aa,_0x269e8b,_0x4a95f1){const _0x300d31=_0x42f345;if(_0x4f86aa===_0x300d31(0x112))return this[_0x300d31(0x133)](_0x4f86aa,_0x269e8b,_0x4a95f1);VisuMZ[_0x300d31(0x2cf)][_0x300d31(0x158)]['call'](this,_0x4f86aa,_0x269e8b,_0x4a95f1);},Window_Options[_0x42f345(0x19b)][_0x42f345(0x133)]=function(_0xcbc1aa,_0x36fafb,_0x2e47cd){const _0x638129=_0x42f345,_0x4945fa=this[_0x638129(0x1c5)](_0xcbc1aa),_0x152599=0x1,_0x1eee78=_0x4945fa+(_0x36fafb?_0x152599:-_0x152599);if(_0x1eee78>0xb&&_0x2e47cd)this[_0x638129(0x1d3)](_0xcbc1aa,0x1);else{if(_0x638129(0x102)!==_0x638129(0x231))this[_0x638129(0x1d3)](_0xcbc1aa,_0x1eee78[_0x638129(0x138)](0x1,0xb));else{function _0x1080c9(){const _0x223cce=_0x638129;return _0x34043c=this[_0x223cce(0x279)](_0x255e2b),_0x239fd0=this[_0x223cce(0x16e)](_0x36e859),_0x17a48e=this[_0x223cce(0x30a)](_0x90a607),_0xcc299e=this['preConvertEscapeCharacters'](_0x42647f),_0x41e159=this[_0x223cce(0x1c3)](_0x57f782),_0x248b74=this[_0x223cce(0x1dd)](_0x3e5933),_0x5b896b=this[_0x223cce(0x1db)](_0x33305e),_0x49572c=this[_0x223cce(0x136)](_0x3f62f3),_0x184e6d=this[_0x223cce(0x163)](_0x533ef6),_0x2a0dbc=this['convertMessageCoreEscapeActions'](_0x40e2c6),_0x2bd46c=this[_0x223cce(0x30c)](_0xa01b0f),_0x59b19f=this[_0x223cce(0x2cc)](_0x55b6e8),_0x27240c=this[_0x223cce(0x30a)](_0xa63d7c),_0x1ff6be=this[_0x223cce(0x160)](_0x3bbee1),_0x1041d6=this[_0x223cce(0x18f)](_0x15ec59),_0x12ab52;}}}},Window_Message['prototype'][_0x42f345(0x135)]=function(){const _0x513258=_0x42f345;Window_Base[_0x513258(0x19b)]['refreshDimmerBitmap']['call'](this);if(VisuMZ[_0x513258(0x2cf)][_0x513258(0x1d0)][_0x513258(0x29d)][_0x513258(0x195)]){if('iNSNT'===_0x513258(0x248))this['stretchDimmerSprite']();else{function _0x370ad5(){const _0x98774c=_0x2bc557['parse']('['+_0x25d906['$1']['match'](/\d+/g)+']');for(const _0x167ca7 of _0x98774c){if(!_0x4d0fcf['value'](_0x167ca7))return![];}return!![];}}}},Window_Message['prototype'][_0x42f345(0xe4)]=function(){const _0x388088=_0x42f345;this[_0x388088(0x1bd)]['x']=Math[_0x388088(0x2ce)](this[_0x388088(0x145)]/0x2),this[_0x388088(0x1bd)][_0x388088(0xe2)]['x']=0.5,this[_0x388088(0x1bd)]['scale']['x']=Graphics[_0x388088(0x145)];},VisuMZ['MessageCore']['Window_Message_clearFlags']=Window_Message[_0x42f345(0x19b)][_0x42f345(0xeb)],Window_Message[_0x42f345(0x19b)][_0x42f345(0xeb)]=function(){const _0x568aef=_0x42f345;VisuMZ[_0x568aef(0x2cf)][_0x568aef(0x309)][_0x568aef(0x336)](this),this['clearActorNameAutoColor'](),this[_0x568aef(0x297)](),this[_0x568aef(0x2e6)](![]),this[_0x568aef(0x25f)]('default'),this['setTextDelay'](VisuMZ[_0x568aef(0x2cf)][_0x568aef(0x1d0)][_0x568aef(0x29d)][_0x568aef(0x2ad)]);},Window_Message[_0x42f345(0x19b)][_0x42f345(0x297)]=function(){const _0x37afe7=_0x42f345;this[_0x37afe7(0x1c6)]($gameSystem[_0x37afe7(0xb8)]());},Window_Message[_0x42f345(0x19b)]['isAutoColorAffected']=function(){return!![];},Window_Message[_0x42f345(0x19b)][_0x42f345(0x134)]=function(_0x4105d0){const _0x934fc=_0x42f345,_0xbffd64=0xb-ConfigManager[_0x934fc(0x112)];_0x4105d0=Math[_0x934fc(0x2ce)](_0x4105d0*_0xbffd64),this[_0x934fc(0x2a6)]=_0x4105d0,this[_0x934fc(0x1e0)]=_0x4105d0;},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x177)]=Window_Message[_0x42f345(0x19b)]['isTriggered'],Window_Message[_0x42f345(0x19b)][_0x42f345(0x289)]=function(){const _0x2d8274=_0x42f345;return VisuMZ[_0x2d8274(0x2cf)][_0x2d8274(0x177)][_0x2d8274(0x336)](this)||Input[_0x2d8274(0xfd)](VisuMZ[_0x2d8274(0x2cf)][_0x2d8274(0x1d0)]['General'][_0x2d8274(0x207)]);},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x2b2)]=Window_Message['prototype'][_0x42f345(0x27c)],Window_Message[_0x42f345(0x19b)][_0x42f345(0x27c)]=function(){const _0x5ab4c5=_0x42f345;let _0x8235aa=this['y'];VisuMZ[_0x5ab4c5(0x2cf)]['Window_Message_updatePlacement'][_0x5ab4c5(0x336)](this);if(this[_0x5ab4c5(0x292)])this['y']=_0x8235aa;this[_0x5ab4c5(0x243)]();},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x2d9)]=Window_Message[_0x42f345(0x19b)]['newPage'],Window_Message[_0x42f345(0x19b)][_0x42f345(0x31e)]=function(_0x516d3e){const _0x145ab1=_0x42f345;this[_0x145ab1(0x20e)](_0x516d3e),VisuMZ['MessageCore'][_0x145ab1(0x2d9)][_0x145ab1(0x336)](this,_0x516d3e),this[_0x145ab1(0x2e1)]();},Window_Message['prototype'][_0x42f345(0x20e)]=function(_0x5817aa){const _0x2128c7=_0x42f345;this[_0x2128c7(0x1eb)](_0x5817aa),this['updateDimensions']();},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x2d1)]=Window_Message[_0x42f345(0x19b)][_0x42f345(0x152)],Window_Message[_0x42f345(0x19b)][_0x42f345(0x152)]=function(){const _0x5ae5e5=_0x42f345;VisuMZ[_0x5ae5e5(0x2cf)][_0x5ae5e5(0x2d1)][_0x5ae5e5(0x336)](this),this[_0x5ae5e5(0xeb)]();if(this[_0x5ae5e5(0x2ba)])this[_0x5ae5e5(0x22c)]();},Window_Message[_0x42f345(0x19b)][_0x42f345(0x227)]=function(){const _0x5aa49d=_0x42f345;this[_0x5aa49d(0x145)]=$gameSystem[_0x5aa49d(0xd4)](),this['width']=Math[_0x5aa49d(0x299)](Graphics[_0x5aa49d(0x145)],this[_0x5aa49d(0x145)]);const _0x13d000=$gameSystem[_0x5aa49d(0x1af)]();this[_0x5aa49d(0x203)]=SceneManager[_0x5aa49d(0x159)][_0x5aa49d(0x1f4)](_0x13d000,![]),this[_0x5aa49d(0x203)]=Math[_0x5aa49d(0x299)](Graphics['height'],this[_0x5aa49d(0x203)]);if($gameTemp[_0x5aa49d(0x154)])this[_0x5aa49d(0x11e)]();},Window_Message[_0x42f345(0x19b)]['resetPositionX']=function(){const _0x583ce1=_0x42f345;this['x']=(Graphics[_0x583ce1(0x1a8)]-this[_0x583ce1(0x145)])/0x2,$gameTemp[_0x583ce1(0x154)]=undefined,this[_0x583ce1(0x243)]();},Window_Message[_0x42f345(0x19b)]['updateMove']=function(){const _0x8740e5=_0x42f345,_0xb4675b={'x':this['x'],'y':this['y']};Window_Base[_0x8740e5(0x19b)][_0x8740e5(0xd0)]['call'](this),this['updateNameBoxMove'](_0xb4675b);},Window_Message[_0x42f345(0x19b)][_0x42f345(0x1ce)]=function(){return!![];},Window_Message['prototype'][_0x42f345(0xcf)]=function(_0xef72bb){const _0x5c764e=_0x42f345;this[_0x5c764e(0x29c)]&&(this[_0x5c764e(0x29c)]['x']+=this['x']-_0xef72bb['x'],this[_0x5c764e(0x29c)]['y']+=this['y']-_0xef72bb['y']);},Window_Message[_0x42f345(0x19b)][_0x42f345(0x2f8)]=function(_0x18ce71,_0x2a1cf6){const _0x493a9a=_0x42f345;this[_0x493a9a(0x219)](this[_0x493a9a(0x2bb)]['x'],this[_0x493a9a(0x1de)]*(Graphics[_0x493a9a(0x128)]-this[_0x493a9a(0x203)])/0x2,this['_resetRect'][_0x493a9a(0x145)],this['_resetRect']['height'],_0x18ce71,_0x2a1cf6);},Window_Message[_0x42f345(0x19b)]['processCommonEvent']=function(_0x43556d){const _0x44547b=_0x42f345,_0x4281ae=Window_Base['prototype']['processCommonEvent'][_0x44547b(0x336)](this,_0x43556d);_0x43556d[_0x44547b(0x22f)]&&this[_0x44547b(0x253)](_0x4281ae);},Window_Message['prototype'][_0x42f345(0x253)]=function(_0x57d294){const _0x55d2f8=_0x42f345;if($gameParty[_0x55d2f8(0x23f)]()){}else $gameMap[_0x55d2f8(0x190)](_0x57d294);},Window_Message[_0x42f345(0x19b)][_0x42f345(0x2ab)]=function(_0x47ff2e){const _0x19cec7=_0x42f345;this[_0x19cec7(0x2a6)]--,this[_0x19cec7(0x2a6)]<=0x0&&(this['onProcessCharacter'](_0x47ff2e),Window_Base[_0x19cec7(0x19b)][_0x19cec7(0x2ab)][_0x19cec7(0x336)](this,_0x47ff2e));},Window_Message['prototype'][_0x42f345(0x1b6)]=function(_0x175b53){const _0x512196=_0x42f345;this[_0x512196(0x2a6)]=this[_0x512196(0x1e0)];if(this['_textDelay']<=0x0)this[_0x512196(0x147)]=!![];},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x1b4)]=Window_Message[_0x42f345(0x19b)]['processEscapeCharacter'],Window_Message[_0x42f345(0x19b)]['processEscapeCharacter']=function(_0x171f4f,_0x4ee368){const _0x2bff3b=_0x42f345;!_0x4ee368[_0x2bff3b(0x22f)]?Window_Base['prototype']['processEscapeCharacter'][_0x2bff3b(0x336)](this,_0x171f4f,_0x4ee368):VisuMZ[_0x2bff3b(0x2cf)]['Window_Message_processEscapeCharacter'][_0x2bff3b(0x336)](this,_0x171f4f,_0x4ee368);},Window_Message['prototype'][_0x42f345(0x1eb)]=function(_0x223129){const _0x30c3fa=_0x42f345;let _0x207755=_0x223129['text'];_0x207755=_0x207755[_0x30c3fa(0x2aa)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x371de9=_0x30c3fa;return this[_0x371de9(0x20f)](_0x207755,!![],!![]),this[_0x371de9(0x16a)]('none'),'';}),_0x207755=_0x207755['replace'](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x120467=_0x30c3fa;if('PNJyS'===_0x120467(0x178)){function _0x17ba8b(){const _0x4794ff=_0x120467,_0x161f91=_0xc7da7d[_0x4794ff(0x2cf)]['Settings'][_0x2f1870];_0x161f91[_0x4794ff(0x16b)]((_0x2dac9b,_0x1d3fa4)=>{const _0x50c7cf=_0x4794ff;if(!_0x2dac9b||!_0x1d3fa4)return-0x1;return _0x1d3fa4['Match'][_0x50c7cf(0x2d8)]-_0x2dac9b[_0x50c7cf(0x104)][_0x50c7cf(0x2d8)];});}}else return this[_0x120467(0x20f)](_0x207755,!![],![]),this['processAutoPosition'](_0x120467(0x1ea)),'';}),_0x207755=_0x207755[_0x30c3fa(0x2aa)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x3ba964=_0x30c3fa;return this[_0x3ba964(0x20f)](_0x207755,![],!![]),this[_0x3ba964(0x16a)](_0x3ba964(0x1ea)),'';});if(SceneManager['isSceneBattle']()){if('omYRs'!==_0x30c3fa(0x26f)){function _0x2bad62(){this['_autoColorActorNames']=[];}}else _0x207755=_0x207755[_0x30c3fa(0x2aa)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0xf30576,_0x103301)=>{const _0x404e04=_0x30c3fa;return this[_0x404e04(0x20f)](_0x207755,!![],!![]),this[_0x404e04(0x16a)](_0x404e04(0x1b7),Number(_0x103301)||0x1),'';}),_0x207755=_0x207755[_0x30c3fa(0x2aa)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x57c129,_0x47c611)=>{const _0x6991a2=_0x30c3fa;if(_0x6991a2(0xcc)===_0x6991a2(0xcc))return this['processAutoSize'](_0x207755,!![],!![]),this[_0x6991a2(0x16a)]('battle\x20party',Number(_0x47c611)||0x0),'';else{function _0x25ce5f(){const _0x5d62ca=_0x6991a2;this['x']=this['applyMoveEasing'](this['x'],this[_0x5d62ca(0x31b)]),this['y']=this[_0x5d62ca(0x2b3)](this['y'],this[_0x5d62ca(0x2b6)]),this[_0x5d62ca(0x145)]=this[_0x5d62ca(0x2b3)](this[_0x5d62ca(0x145)],this['_moveTargetWidth']),this[_0x5d62ca(0x203)]=this[_0x5d62ca(0x2b3)](this[_0x5d62ca(0x203)],this[_0x5d62ca(0x157)]),this[_0x5d62ca(0x243)]();}}}),_0x207755=_0x207755['replace'](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x7dc694,_0x343267)=>{const _0x43ef43=_0x30c3fa;return this['processAutoSize'](_0x207755,!![],!![]),this[_0x43ef43(0x16a)](_0x43ef43(0x257),Number(_0x343267)||0x0),'';});}else SceneManager[_0x30c3fa(0x123)]()&&(_0x207755=_0x207755['replace'](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x58580b,_0x549341)=>{const _0x5ccdb6=_0x30c3fa;if('pctEK'===_0x5ccdb6(0x2f0))return this[_0x5ccdb6(0x20f)](_0x207755,!![],!![]),this['processAutoPosition'](_0x5ccdb6(0x167),0x0),'';else{function _0x32f180(){return _0x1a9136;}}}),_0x207755=_0x207755[_0x30c3fa(0x2aa)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x335927,_0x18e7b8)=>{const _0x1131af=_0x30c3fa;return this[_0x1131af(0x20f)](_0x207755,!![],!![]),this[_0x1131af(0x16a)](_0x1131af(0x241),Number(_0x18e7b8)||0x1),'';}),_0x207755=_0x207755[_0x30c3fa(0x2aa)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x1ba24b,_0x3ec47d)=>{const _0x357d77=_0x30c3fa;return this[_0x357d77(0x20f)](_0x207755,!![],!![]),this[_0x357d77(0x16a)]('map\x20party',Number(_0x3ec47d)||0x0),'';}),_0x207755=_0x207755[_0x30c3fa(0x2aa)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x7e603a,_0xc28733)=>{const _0x513279=_0x30c3fa;if(_0x513279(0x238)!==_0x513279(0x2e8))return this[_0x513279(0x20f)](_0x207755,!![],!![]),this['processAutoPosition'](_0x513279(0x1b0),Number(_0xc28733)||0x0),'';else{function _0x31f4a8(){const _0x74a54b=_0x513279;_0x3f868e=_0x5d71b3||_0xb2589d[_0x74a54b(0x145)],_0xa04f8=_0x21e366||_0xfeea01['height'],this[_0x74a54b(0x1ed)][_0x74a54b(0x2c8)]=_0x20ade1,this[_0x74a54b(0x1ed)][_0x74a54b(0x1f5)](_0x53b5f8,0x0,0x0,_0x20d1cd[_0x74a54b(0x145)],_0x2e3e5d[_0x74a54b(0x203)],_0x9c1248,_0x21a170,_0x3999ce,_0x34ad72),this[_0x74a54b(0x1ed)][_0x74a54b(0x2c8)]=0xff;}}}));_0x223129[_0x30c3fa(0x317)]=_0x207755;},Window_Message[_0x42f345(0x32f)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x42f345(0x2ed)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x42f345(0x19b)]['processAutoSize']=function(_0x78ab8a,_0x93c78a,_0x765f82){const _0x1cad26=_0x42f345;_0x78ab8a=_0x78ab8a[_0x1cad26(0x2aa)](Window_Message[_0x1cad26(0x32f)],''),_0x78ab8a=_0x78ab8a[_0x1cad26(0x2aa)](Window_Message[_0x1cad26(0x2ed)],''),this[_0x1cad26(0x2e9)]=!![];const _0x47ef51=this[_0x1cad26(0x222)](_0x78ab8a);if(_0x93c78a){let _0x13c3a0=_0x47ef51['width']+$gameSystem['windowPadding']()*0x2+0x6;const _0x3d1a71=$gameMessage['faceName']()!=='',_0x1b3f05=ImageManager[_0x1cad26(0x1bc)],_0x3b7ddb=0x14;_0x13c3a0+=_0x3d1a71?_0x1b3f05+_0x3b7ddb:0x4;if(_0x13c3a0%0x2!==0x0)_0x13c3a0+=0x1;$gameSystem['setMessageWindowWidth'](_0x13c3a0);}if(_0x765f82){let _0x2b8781=Math[_0x1cad26(0x1cf)](_0x47ef51[_0x1cad26(0x203)]/this[_0x1cad26(0x22d)]());$gameSystem[_0x1cad26(0xf8)](_0x2b8781);}this[_0x1cad26(0x120)](),this[_0x1cad26(0x2e9)]=![],this[_0x1cad26(0x2ba)]=!![];},Window_Message[_0x42f345(0x19b)]['updateAutoSizePosition']=function(){const _0x36e41e=_0x42f345;this[_0x36e41e(0x227)](),this[_0x36e41e(0x27c)](),this['resetPositionX'](),this[_0x36e41e(0x24a)](),this['contents']['clear'](),this['createContents']();},Window_Message[_0x42f345(0x19b)][_0x42f345(0x16a)]=function(_0x566255,_0x47c4ae){const _0x105cee=_0x42f345;switch(_0x566255[_0x105cee(0x223)]()[_0x105cee(0x313)]()){case _0x105cee(0x1b7):this['_autoPositionTarget']=$gameActors[_0x105cee(0x1c0)](_0x47c4ae);break;case _0x105cee(0x13e):this[_0x105cee(0x292)]=$gameParty['members']()[_0x47c4ae-0x1];break;case'battle\x20enemy':this[_0x105cee(0x292)]=$gameTroop[_0x105cee(0xc1)]()[_0x47c4ae-0x1];break;case _0x105cee(0x167):this[_0x105cee(0x292)]=$gamePlayer;break;case _0x105cee(0x241):const _0x26fedf=$gameActors[_0x105cee(0x1c0)](_0x47c4ae)[_0x105cee(0x266)]();if(_0x26fedf===0x0){if(_0x105cee(0xf9)==='iNCLz')this[_0x105cee(0x292)]=$gamePlayer;else{function _0x16716d(){const _0x3bdf55=_0x105cee;_0x144dde=_0x1eb70d[_0x3bdf55(0x2aa)](_0x30b718[0x0],_0x1989b4[0x1]);}}}else{if(_0x105cee(0x224)===_0x105cee(0x224))this[_0x105cee(0x292)]=$gamePlayer['followers']()[_0x105cee(0x150)](_0x26fedf-0x1);else{function _0x1f000f(){const _0x2c3ea8=_0x105cee;return _0xf3f021[this[_0x2c3ea8(0x146)]];}}}break;case _0x105cee(0x2a7):if(_0x47c4ae===0x1)this[_0x105cee(0x292)]=$gamePlayer;else{if(_0x105cee(0x1e2)==='xVsRN'){function _0x4f5820(){const _0x1a7616=_0x105cee;return this[_0x1a7616(0x32c)]()===0x65&&_0x84a452['getMessageWindowRows']()>0x4?!![]:this[_0x1a7616(0x32c)]()===0x191;}}else this[_0x105cee(0x292)]=$gamePlayer[_0x105cee(0x316)]()[_0x105cee(0x150)](_0x47c4ae-0x2);}break;case _0x105cee(0x1b0):this['_autoPositionTarget']=$gameMap[_0x105cee(0x246)](_0x47c4ae);break;}if(this[_0x105cee(0x292)]){if('XHcyr'===_0x105cee(0x17f)){function _0x4d8168(){const _0x558d58=_0x105cee,_0x1d96c0=this[_0x558d58(0x16d)](_0x4e0457);if(_0x1d96c0==='textSpeed')return this[_0x558d58(0x307)]();return _0x287579[_0x558d58(0x2cf)]['Window_Options_statusText'][_0x558d58(0x336)](this,_0x432dff);}}else this[_0x105cee(0xff)]();}},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x332)]=Window_Message[_0x42f345(0x19b)][_0x42f345(0xc4)],Window_Message[_0x42f345(0x19b)][_0x42f345(0xc4)]=function(){const _0x314b83=_0x42f345;this[_0x314b83(0xff)](),VisuMZ[_0x314b83(0x2cf)]['Window_Message_synchronizeNameBox'][_0x314b83(0x336)](this);},Window_Message[_0x42f345(0x19b)]['updateAutoPosition']=function(){const _0x5547ae=_0x42f345;if(!this[_0x5547ae(0x292)])return;const _0x2094f4=SceneManager[_0x5547ae(0x159)];if(!_0x2094f4)return;if(!_0x2094f4['_spriteset'])return;const _0x3ea8f2=_0x2094f4['_spriteset'][_0x5547ae(0xfa)](this[_0x5547ae(0x292)]);if(!_0x3ea8f2)return;let _0x5f49c3=_0x3ea8f2['x'];_0x5f49c3-=this['width']/0x2,_0x5f49c3-=(Graphics[_0x5547ae(0x145)]-Graphics[_0x5547ae(0x1a8)])/0x2;let _0x25bf26=_0x3ea8f2['y'];_0x25bf26-=this['height'],_0x25bf26-=(Graphics['height']-Graphics['boxHeight'])/0x2,_0x25bf26-=_0x3ea8f2[_0x5547ae(0x203)]+0x8,this['x']=Math['round'](_0x5f49c3),this['y']=Math[_0x5547ae(0x2ce)](_0x25bf26),this[_0x5547ae(0x243)](!![],![]),this[_0x5547ae(0x29c)][_0x5547ae(0x27c)]();},Window_Message[_0x42f345(0x19b)]['messagePositionReset']=function(){const _0x168504=_0x42f345;this[_0x168504(0x2ba)]=![],this[_0x168504(0x292)]=undefined,$gameSystem[_0x168504(0xbe)](),this[_0x168504(0x120)](),this[_0x168504(0x174)]=0x0;},Window_Message[_0x42f345(0x19b)][_0x42f345(0x122)]=function(_0x346a63){const _0x47c434=_0x42f345;return Window_Base[_0x47c434(0x19b)][_0x47c434(0x122)][_0x47c434(0x336)](this,_0x346a63);},Window_Message[_0x42f345(0x19b)]['postConvertEscapeCharacters']=function(_0x260da6){const _0x46c07f=_0x42f345;return Window_Base[_0x46c07f(0x19b)]['postConvertEscapeCharacters'][_0x46c07f(0x336)](this,_0x260da6);},Window_Message[_0x42f345(0x19b)][_0x42f345(0x2ac)]=function(_0x51ac52){const _0x156e9e=_0x42f345;this['preFlushTextState'](_0x51ac52),Window_Base[_0x156e9e(0x19b)]['flushTextState']['call'](this,_0x51ac52),this[_0x156e9e(0x1dc)](_0x51ac52);},Window_Message[_0x42f345(0x19b)]['preFlushTextState']=function(_0x25dc51){},Window_Message['prototype']['postFlushTextState']=function(_0x55cf67){},Window_NameBox[_0x42f345(0x19b)][_0x42f345(0x2b7)]=function(){return![];},Window_NameBox['prototype'][_0x42f345(0x2dd)]=function(){const _0x19858e=_0x42f345;Window_Base['prototype'][_0x19858e(0x2dd)]['call'](this),this[_0x19858e(0x211)](this['defaultColor']());},Window_NameBox[_0x42f345(0x19b)][_0x42f345(0x20d)]=function(){const _0xab0932=_0x42f345,_0x53a967=VisuMZ[_0xab0932(0x2cf)][_0xab0932(0x1d0)][_0xab0932(0x29d)]['NameBoxWindowDefaultColor'];return ColorManager[_0xab0932(0x103)](_0x53a967);},VisuMZ[_0x42f345(0x2cf)]['Window_NameBox_updatePlacement']=Window_NameBox[_0x42f345(0x19b)][_0x42f345(0x27c)],Window_NameBox['prototype'][_0x42f345(0x27c)]=function(){const _0x1b1b26=_0x42f345;VisuMZ[_0x1b1b26(0x2cf)]['Window_NameBox_updatePlacement']['call'](this),this[_0x1b1b26(0x15b)](),this[_0x1b1b26(0x21e)](),this['clampPlacementPosition'](),this[_0x1b1b26(0x305)]();},Window_NameBox[_0x42f345(0x19b)][_0x42f345(0x122)]=function(_0xfbdb19){const _0xabfba3=_0x42f345;return _0xfbdb19=_0xfbdb19[_0xabfba3(0x2aa)](/<LEFT>/gi,this[_0xabfba3(0x26b)][_0xabfba3(0x2a4)](this,0x0)),_0xfbdb19=_0xfbdb19[_0xabfba3(0x2aa)](/<CENTER>/gi,this[_0xabfba3(0x26b)]['bind'](this,0x5)),_0xfbdb19=_0xfbdb19[_0xabfba3(0x2aa)](/<RIGHT>/gi,this[_0xabfba3(0x26b)][_0xabfba3(0x2a4)](this,0xa)),_0xfbdb19=_0xfbdb19[_0xabfba3(0x2aa)](/<POSITION:[ ](\d+)>/gi,(_0xf85c5,_0x52b720)=>this[_0xabfba3(0x26b)](parseInt(_0x52b720))),_0xfbdb19=_0xfbdb19['replace'](/<\/LEFT>/gi,''),_0xfbdb19=_0xfbdb19[_0xabfba3(0x2aa)](/<\/CENTER>/gi,''),_0xfbdb19=_0xfbdb19['replace'](/<\/RIGHT>/gi,''),Window_Base['prototype'][_0xabfba3(0x122)][_0xabfba3(0x336)](this,_0xfbdb19);},Window_NameBox[_0x42f345(0x19b)]['setRelativePosition']=function(_0x297b4f){const _0x1f371a=_0x42f345;return this[_0x1f371a(0x1a1)]=_0x297b4f,'';},Window_NameBox[_0x42f345(0x19b)][_0x42f345(0x15b)]=function(){const _0xb9ff29=_0x42f345;if($gameMessage['isRTL']())return;this['_relativePosition']=this[_0xb9ff29(0x1a1)]||0x0;const _0x4024a8=this[_0xb9ff29(0x121)],_0x14cc7a=Math[_0xb9ff29(0x2e2)](_0x4024a8[_0xb9ff29(0x145)]*this['_relativePosition']/0xa);this['x']=_0x4024a8['x']+_0x14cc7a-Math['floor'](this[_0xb9ff29(0x145)]/0x2),this['x']=this['x'][_0xb9ff29(0x138)](_0x4024a8['x'],_0x4024a8['x']+_0x4024a8['width']-this[_0xb9ff29(0x145)]);},Window_NameBox[_0x42f345(0x19b)]['updateOffsetPosition']=function(){const _0x53f11d=_0x42f345;if($gameMessage['isRTL']())return;this[_0x53f11d(0x1a1)]=this[_0x53f11d(0x1a1)]||0x0;const _0x34c7f2=VisuMZ[_0x53f11d(0x2cf)][_0x53f11d(0x1d0)][_0x53f11d(0x29d)]['NameBoxWindowOffsetX'],_0x36c42a=VisuMZ[_0x53f11d(0x2cf)]['Settings'][_0x53f11d(0x29d)][_0x53f11d(0x2bd)],_0x424c15=(0x5-this['_relativePosition'])/0x5;this['x']+=Math['floor'](_0x34c7f2*_0x424c15),this['y']+=_0x36c42a;},Window_NameBox[_0x42f345(0x19b)]['updateOverlappingY']=function(){const _0x1f227a=_0x42f345,_0x56f435=this[_0x1f227a(0x121)],_0x3a45f1=_0x56f435['y'],_0x7c95b9=VisuMZ[_0x1f227a(0x2cf)]['Settings'][_0x1f227a(0x29d)]['NameBoxWindowOffsetY'];if(_0x3a45f1>this['y']&&_0x3a45f1<this['y']+this[_0x1f227a(0x203)]-_0x7c95b9){if(_0x1f227a(0x20a)===_0x1f227a(0x20a))this['y']=_0x56f435['y']+_0x56f435[_0x1f227a(0x203)];else{function _0x1adea7(){const _0x2540de=_0x1f227a;this['_interpreter'][_0x2540de(0x30e)]()?this[_0x2540de(0x214)][_0x2540de(0x2d3)]():this['clear']();}}}},VisuMZ[_0x42f345(0x2cf)][_0x42f345(0x23a)]=Window_NameBox[_0x42f345(0x19b)][_0x42f345(0x2fb)],Window_NameBox['prototype'][_0x42f345(0x2fb)]=function(){const _0xfe2dac=_0x42f345;this[_0xfe2dac(0x1a1)]=0x0,VisuMZ[_0xfe2dac(0x2cf)][_0xfe2dac(0x23a)][_0xfe2dac(0x336)](this);},Window_ChoiceList['prototype'][_0x42f345(0x173)]=function(){return![];},Window_ChoiceList[_0x42f345(0x19b)][_0x42f345(0x2b7)]=function(){return!![];},Window_ChoiceList[_0x42f345(0x19b)][_0x42f345(0x22d)]=function(){const _0x38dba7=_0x42f345;return $gameSystem[_0x38dba7(0x1f1)]();},Window_ChoiceList[_0x42f345(0x19b)][_0x42f345(0x2ee)]=function(){const _0x27c8c1=_0x42f345;return $gameSystem[_0x27c8c1(0x2f6)]();},Window_ChoiceList[_0x42f345(0x19b)][_0x42f345(0x14d)]=function(){const _0x4039cd=_0x42f345;this[_0x4039cd(0x2fb)](),this[_0x4039cd(0xd1)](),this[_0x4039cd(0x15a)](),this['activate']();},Window_ChoiceList['prototype']['refresh']=function(){const _0x36b991=_0x42f345;this[_0x36b991(0xce)](),this['makeCommandList'](),this[_0x36b991(0x121)]&&(this['updatePlacement'](),this[_0x36b991(0x1e3)]()),this[_0x36b991(0x2e1)](),this[_0x36b991(0x1ac)](),this[_0x36b991(0x135)](),Window_Selectable[_0x36b991(0x19b)][_0x36b991(0x2fb)][_0x36b991(0x336)](this);},Window_ChoiceList[_0x42f345(0x19b)][_0x42f345(0x255)]=function(){const _0x2e178b=_0x42f345,_0x577990=$gameMessage[_0x2e178b(0x1d2)]();let _0x7d4a59=0x0;for(const _0xd6a740 of _0x577990){if(_0x2e178b(0x2cd)!==_0x2e178b(0x2cd)){function _0x2540b4(){const _0x1b4942=_0x2e178b;return this[_0x1b4942(0x121)]?this['messageCoreWindowX']():_0x51720c[_0x1b4942(0x2cf)][_0x1b4942(0x2e7)][_0x1b4942(0x336)](this);}}else{if(this['isChoiceVisible'](_0xd6a740)){const _0x7b0296=_0xd6a740,_0x41d596=this[_0x2e178b(0x1e4)](_0xd6a740);this[_0x2e178b(0xbd)](_0x7b0296,_0x2e178b(0x2a0),_0x41d596,_0x7d4a59);}_0x7d4a59++;}}},Window_ChoiceList[_0x42f345(0x19b)][_0x42f345(0x225)]=function(_0x5a94f3){const _0xd77a6f=_0x42f345;if(_0x5a94f3[_0xd77a6f(0x1b5)](/<HIDE>/i))return![];if(_0x5a94f3[_0xd77a6f(0x1b5)](/<SHOW>/i))return!![];if(_0x5a94f3[_0xd77a6f(0x1b5)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4873f0=JSON[_0xd77a6f(0x14c)]('['+RegExp['$1'][_0xd77a6f(0x1b5)](/\d+/g)+']');for(const _0x4faba9 of _0x4873f0){if(!$gameSwitches['value'](_0x4faba9))return![];}return!![];}if(_0x5a94f3[_0xd77a6f(0x1b5)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xd77a6f(0x275)==='SeuzE'){function _0x484be5(){const _0x42d3e3=_0xd77a6f,_0x5d4a95=['fontFace',_0x42d3e3(0x109),_0x42d3e3(0x130),_0x42d3e3(0x125),_0x42d3e3(0x103),_0x42d3e3(0x169),'outlineWidth',_0x42d3e3(0x2c8)];let _0x1f10de={};for(const _0x29af15 of _0x5d4a95){_0x1f10de[_0x29af15]=this[_0x42d3e3(0x31f)][_0x29af15];}return _0x1f10de;}}else{const _0x456dac=JSON['parse']('['+RegExp['$1'][_0xd77a6f(0x1b5)](/\d+/g)+']');for(const _0x51a478 of _0x456dac){if(_0xd77a6f(0x202)===_0xd77a6f(0x202)){if(!$gameSwitches['value'](_0x51a478))return![];}else{function _0x25c4c9(){const _0x154840=_0xd77a6f;this[_0x154840(0xd7)][_0x154840(0x2d2)]=0x0;}}}return!![];}}if(_0x5a94f3[_0xd77a6f(0x1b5)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xd153b1=JSON[_0xd77a6f(0x14c)]('['+RegExp['$1'][_0xd77a6f(0x1b5)](/\d+/g)+']');for(const _0x4a5ba8 of _0xd153b1){if(_0xd77a6f(0x27a)!==_0xd77a6f(0x27a)){function _0x49a6f4(){const _0x44c1e6=_0xd77a6f;this['width']=_0x130dd7[_0x44c1e6(0x299)](this['width'],_0xf02d69[_0x44c1e6(0x145)]),this[_0x44c1e6(0x203)]=_0x507f7d[_0x44c1e6(0x299)](this[_0x44c1e6(0x203)],_0x52f1c2[_0x44c1e6(0x203)]);}}else{if($gameSwitches[_0xd77a6f(0x263)](_0x4a5ba8))return!![];}}return![];}if(_0x5a94f3['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x32b4ce=JSON[_0xd77a6f(0x14c)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x33b7f9 of _0x32b4ce){if(_0xd77a6f(0x1ca)===_0xd77a6f(0x19c)){function _0x31c135(){const _0x1643b4=_0xd77a6f;return this[_0x1643b4(0x1cc)];}}else{if(!$gameSwitches[_0xd77a6f(0x263)](_0x33b7f9))return!![];}}return![];}if(_0x5a94f3[_0xd77a6f(0x1b5)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3939be=JSON[_0xd77a6f(0x14c)]('['+RegExp['$1'][_0xd77a6f(0x1b5)](/\d+/g)+']');for(const _0x250434 of _0x3939be){if(!$gameSwitches[_0xd77a6f(0x263)](_0x250434))return!![];}return![];}if(_0x5a94f3[_0xd77a6f(0x1b5)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xd77a6f(0x258)!==_0xd77a6f(0x258)){function _0x34f9ae(){const _0x2d37f7=_0xd77a6f;this[_0x2d37f7(0xbe)](_0x173e57),_0x200fec[_0x2d37f7(0x2cf)][_0x2d37f7(0xc7)][_0x2d37f7(0x336)](this,_0x5e754e);}}else{const _0x5e9a96=JSON[_0xd77a6f(0x14c)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x540d90 of _0x5e9a96){if(_0xd77a6f(0x319)===_0xd77a6f(0x30b)){function _0xe8d803(){const _0x12de59=_0xd77a6f,_0x2b7f1c=(this[_0x12de59(0x2d6)]()+this['colSpacing']())*this[_0x12de59(0x2ee)]()+this[_0x12de59(0xf7)]*0x2;return _0x4f1f85[_0x12de59(0x299)](_0x2b7f1c,_0x27e42b[_0x12de59(0x145)]);}}else{if($gameSwitches[_0xd77a6f(0x263)](_0x540d90))return![];}}return!![];}}return!![];},Window_ChoiceList[_0x42f345(0x19b)][_0x42f345(0x1e4)]=function(_0x3f4aef){const _0xa54c39=_0x42f345;if(_0x3f4aef[_0xa54c39(0x1b5)](/<DISABLE>/i))return![];if(_0x3f4aef[_0xa54c39(0x1b5)](/<ENABLE>/i))return!![];if(_0x3f4aef['match'](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x560d55=JSON[_0xa54c39(0x14c)]('['+RegExp['$1'][_0xa54c39(0x1b5)](/\d+/g)+']');for(const _0x437cdc of _0x560d55){if(!$gameSwitches['value'](_0x437cdc))return![];}return!![];}if(_0x3f4aef['match'](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3d2036=JSON['parse']('['+RegExp['$1'][_0xa54c39(0x1b5)](/\d+/g)+']');for(const _0x2a1248 of _0x3d2036){if(!$gameSwitches[_0xa54c39(0x263)](_0x2a1248))return![];}return!![];}if(_0x3f4aef['match'](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x11dc65=JSON[_0xa54c39(0x14c)]('['+RegExp['$1'][_0xa54c39(0x1b5)](/\d+/g)+']');for(const _0x1026dc of _0x11dc65){if($gameSwitches[_0xa54c39(0x263)](_0x1026dc))return!![];}return![];}if(_0x3f4aef[_0xa54c39(0x1b5)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xa54c39(0x2fd)==='cmOWm'){const _0x3cf313=JSON[_0xa54c39(0x14c)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x57e6b5 of _0x3cf313){if('oYJYN'===_0xa54c39(0x22a)){function _0x22e996(){const _0x322d32=_0xa54c39;return _0x4f18a8[_0x322d32(0x19b)][_0x322d32(0x122)]['call'](this,_0x485797);}}else{if(!$gameSwitches[_0xa54c39(0x263)](_0x57e6b5))return!![];}}return![];}else{function _0x44fed5(){const _0x5691c1=_0xa54c39;_0x6e93da['MessageCore']['Game_Party_initialize'][_0x5691c1(0x336)](this),this['initMessageCore']();}}}if(_0x3f4aef['match'](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x201363=JSON[_0xa54c39(0x14c)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3c726f of _0x201363){if(!$gameSwitches[_0xa54c39(0x263)](_0x3c726f))return!![];}return![];}if(_0x3f4aef[_0xa54c39(0x1b5)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xa54c39(0x215)!==_0xa54c39(0x287)){const _0x168b2f=JSON[_0xa54c39(0x14c)]('['+RegExp['$1'][_0xa54c39(0x1b5)](/\d+/g)+']');for(const _0x2c219e of _0x168b2f){if(_0xa54c39(0xde)===_0xa54c39(0x11b)){function _0x233fec(){const _0x5a9f12=_0xa54c39,_0x35c31b=_0x5a71f7[_0x5a9f12(0x28c)]||0x0;if(_0x35c31b>0x0)this[_0x5a9f12(0x253)](_0x35c31b);}}else{if($gameSwitches[_0xa54c39(0x263)](_0x2c219e))return![];}}return!![];}else{function _0x384ebd(){const _0x32e83c=_0xa54c39,_0xa9796a=_0x32e83c(0x333);_0x1f68e7=_0xa9796a['format'](_0x188e4f[_0x32e83c(0xc9)],_0x2194e0[_0x32e83c(0x131)]);}}}return!![];},VisuMZ[_0x42f345(0x2cf)]['Window_ChoiceList_updatePlacement']=Window_ChoiceList[_0x42f345(0x19b)][_0x42f345(0x27c)],Window_ChoiceList['prototype'][_0x42f345(0x27c)]=function(){const _0x44dabe=_0x42f345;VisuMZ[_0x44dabe(0x2cf)][_0x44dabe(0x24b)][_0x44dabe(0x336)](this),this[_0x44dabe(0x243)]();},Window_ChoiceList[_0x42f345(0x19b)][_0x42f345(0x1e3)]=function(){const _0x2c137=_0x42f345;if(!this[_0x2c137(0xc2)])return;const _0x4ad6ed=0x8,_0x4f0a59=this['_cancelButton'],_0x323edb=this['x']+this[_0x2c137(0x145)],_0x4cf233=Math['floor']((Graphics[_0x2c137(0x145)]-Graphics['boxWidth'])/0x2);if(_0x323edb>=Graphics[_0x2c137(0x1a8)]+_0x4cf233-_0x4f0a59[_0x2c137(0x145)]+_0x4ad6ed){if(_0x2c137(0x21a)!==_0x2c137(0x21a)){function _0x18ea25(){const _0x25739f=_0x2c137,_0x43b054=_0x3bd0b0[_0x25739f(0xe3)]();if(_0x43b054['id']<=0x0)return'';return _0x43b054[_0x25739f(0x10f)];}}else _0x4f0a59['x']=-_0x4f0a59[_0x2c137(0x145)]-_0x4ad6ed;}else _0x4f0a59['x']=this[_0x2c137(0x145)]+_0x4ad6ed;_0x4f0a59['y']=this[_0x2c137(0x203)]/0x2-_0x4f0a59[_0x2c137(0x203)]/0x2;},VisuMZ[_0x42f345(0x2cf)]['Window_ChoiceList_windowX']=Window_ChoiceList[_0x42f345(0x19b)][_0x42f345(0x306)],Window_ChoiceList['prototype']['windowX']=function(){const _0x1557ab=_0x42f345;if(this[_0x1557ab(0x121)])return this['messageCoreWindowX']();else{if(_0x1557ab(0xd6)!==_0x1557ab(0xd6)){function _0x523560(){const _0x224288=_0x1557ab;if(this[_0x224288(0x230)]===_0xdec19b)this[_0x224288(0xbe)]();if(this[_0x224288(0x230)][_0x224288(0x1cd)]===_0x33337a)this[_0x224288(0xbe)]();this[_0x224288(0x230)][_0x224288(0x1cd)]=_0x201be3||0x1;}}else return VisuMZ[_0x1557ab(0x2cf)][_0x1557ab(0x2e7)][_0x1557ab(0x336)](this);}},Window_ChoiceList['prototype'][_0x42f345(0xf5)]=function(){const _0x4cdc6b=_0x42f345,_0x41a55f=$gameMessage[_0x4cdc6b(0x2fa)]();if(_0x41a55f===0x1)return(Graphics['boxWidth']-this[_0x4cdc6b(0x1fb)]())/0x2;else return _0x41a55f===0x2?this[_0x4cdc6b(0x121)]['x']+this[_0x4cdc6b(0x121)]['width']-this[_0x4cdc6b(0x1fb)]():this[_0x4cdc6b(0x121)]['x'];},Window_ChoiceList['prototype'][_0x42f345(0x1fb)]=function(){const _0x448360=_0x42f345,_0x15b420=(this[_0x448360(0x2d6)]()+this[_0x448360(0x107)]())*this['maxCols']()+this['padding']*0x2;return Math[_0x448360(0x299)](_0x15b420,Graphics[_0x448360(0x145)]);},Window_ChoiceList[_0x42f345(0x19b)][_0x42f345(0x31c)]=function(){const _0x11e329=_0x42f345,_0x1cf08f=$gameMessage['choices']()[_0x11e329(0x1fa)](_0x1da5c9=>this[_0x11e329(0x225)](_0x1da5c9)),_0x16c2ad=Math[_0x11e329(0x1cf)](_0x1cf08f['length']/this[_0x11e329(0x2ee)]());return Math[_0x11e329(0x1f0)](0x1,Math[_0x11e329(0x299)](_0x16c2ad,this[_0x11e329(0x2df)]()));},Window_ChoiceList[_0x42f345(0x19b)]['maxLines']=function(){const _0x14a1ea=_0x42f345,_0x52af15=this['_messageWindow'],_0x470be0=_0x52af15?_0x52af15['y']:0x0,_0x4dc208=_0x52af15?_0x52af15[_0x14a1ea(0x203)]:0x0,_0x252998=Graphics['boxHeight']/0x2;if(_0x470be0<_0x252998&&_0x470be0+_0x4dc208>_0x252998){if(_0x14a1ea(0x213)!==_0x14a1ea(0x26d))return 0x4;else{function _0x6c7786(){const _0x5a8a1e=_0x14a1ea,_0x1410ce=(_0x3d9ee1['rtl']?-0x1:0x1)*this[_0x5a8a1e(0x1ae)]('\x20');_0x183f9d['x']+=_0x1410ce;if(this[_0x5a8a1e(0x2bf)](_0x328b16)>0x0)_0x574253['x']+=_0x1410ce;if(_0x90a9ef['rtl'])return;let _0x1b5ba1=_0x114112[_0x5a8a1e(0x317)][_0x5a8a1e(0x267)]('\x1bWrapBreak[0]',_0x5e4be3[_0x5a8a1e(0x266)]+0x1),_0x5f0d88=_0x1dc44b[_0x5a8a1e(0x317)][_0x5a8a1e(0x267)]('\x0a',_0x45c2ba[_0x5a8a1e(0x266)]+0x1);if(_0x1b5ba1<0x0)_0x1b5ba1=_0x61cfa['text'][_0x5a8a1e(0x2d8)]+0x1;if(_0x5f0d88>0x0)_0x1b5ba1=_0x14e655[_0x5a8a1e(0x299)](_0x1b5ba1,_0x5f0d88);const _0x3f87df=_0x58f69d[_0x5a8a1e(0x317)][_0x5a8a1e(0x2ec)](_0x324099[_0x5a8a1e(0x266)],_0x1b5ba1),_0x5e338e=this['textSizeExWordWrap'](_0x3f87df)['width'];let _0x51d25d=_0x1db807[_0x5a8a1e(0x145)]||this[_0x5a8a1e(0x149)];if(this[_0x5a8a1e(0x31d)]===_0x7cdd44){const _0x21653f=_0x17a34e[_0x5a8a1e(0x1a2)]()===''?0x0:_0x5667ae[_0x5a8a1e(0x1bc)]+0x14;_0x51d25d-=_0x21653f,_0x8f138c['MessageCore'][_0x5a8a1e(0x1d0)]['WordWrap']['TightWrap']&&(_0x51d25d-=_0x21653f);}let _0x511c91=![];if(_0x1ec4ff['x']+_0x5e338e>_0x37a186['startX']+_0x51d25d)_0x511c91=!![];if(_0x5e338e===0x0)_0x511c91=!![];_0x511c91&&(_0x2a96ca[_0x5a8a1e(0x317)]=_0xbc183a[_0x5a8a1e(0x317)][_0x5a8a1e(0x18d)](0x0,_0x38939d[_0x5a8a1e(0x266)])+'\x0a'+_0x2c716d[_0x5a8a1e(0x317)][_0x5a8a1e(0x10a)](_0x2e8322[_0x5a8a1e(0x266)]));}}}else return $gameSystem[_0x14a1ea(0xd9)]();},Window_ChoiceList[_0x42f345(0x19b)][_0x42f345(0x2d6)]=function(){const _0x58f755=_0x42f345;let _0x290482=0x60;for(const _0x3244e0 of this[_0x58f755(0x2dc)]){if(_0x58f755(0x2e5)!==_0x58f755(0x2e5)){function _0x2b3138(){const _0x22892b=_0x58f755;this[_0x22892b(0x145)]=_0x298022[_0x22892b(0xd4)](),this['width']=_0x4ae0fe[_0x22892b(0x299)](_0x94fa86[_0x22892b(0x145)],this['width']);const _0x136c34=_0x59ebf7[_0x22892b(0x1af)]();this['height']=_0x2c484c[_0x22892b(0x159)][_0x22892b(0x1f4)](_0x136c34,![]),this[_0x22892b(0x203)]=_0x743d0c[_0x22892b(0x299)](_0x3a2ad7[_0x22892b(0x203)],this[_0x22892b(0x203)]);if(_0x1c132b[_0x22892b(0x154)])this['resetPositionX']();}}else{const _0x4d3534=_0x3244e0[_0x58f755(0x131)],_0x19aca9=this[_0x58f755(0x222)](_0x4d3534)['width'],_0x2ddbaf=Math[_0x58f755(0x1cf)](_0x19aca9)+this[_0x58f755(0x321)]()*0x2;if(_0x290482<_0x2ddbaf){if('uDEhd'===_0x58f755(0x23e))_0x290482=_0x2ddbaf;else{function _0x34e786(){const _0x554ca3=_0x58f755;return this[_0x554ca3(0x13f)];}}}}}return _0x290482;},Window_ChoiceList['prototype']['drawItem']=function(_0x118092){const _0x5ad0f9=_0x42f345,_0x44e503=this[_0x5ad0f9(0x113)](_0x118092),_0x30c0d0=$gameSystem[_0x5ad0f9(0xbb)]()!==_0x5ad0f9(0xf4)?_0x5ad0f9(0x140)['format']($gameSystem[_0x5ad0f9(0xbb)]()):'',_0x5eb479=_0x30c0d0+this['commandName'](_0x118092);this[_0x5ad0f9(0x2c7)](this[_0x5ad0f9(0x2ef)](_0x118092)),this[_0x5ad0f9(0x301)](_0x5eb479,_0x44e503['x'],_0x44e503['y'],_0x44e503[_0x5ad0f9(0x145)]);},Window_ChoiceList[_0x42f345(0x19b)][_0x42f345(0x19f)]=function(){const _0x4ad003=_0x42f345;$gameMessage[_0x4ad003(0x1c8)](this[_0x4ad003(0x285)]()),this['_messageWindow'][_0x4ad003(0x152)](),this[_0x4ad003(0x1d8)]();};