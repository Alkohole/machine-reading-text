//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.34;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.34] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the default battle system (DTB).
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
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
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
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
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
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
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","LargerResolution":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
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
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
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
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param LargerResolution
 * @text Larger Resolution
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
//=============================================================================

const _0x2459=['_repositioned','nextLevelExp','get','paramFlatBonus','Game_Action_itemEva','FDR','TTXzY','eOdYY','_inputSpecialKeyCode','Sprite_Button_initialize','encounterStep','command111','ihlnf','KeyboardInput','NUMPAD2','updatePositionCoreEngineShakeHorz','FUNC','SystemSetBattleSystem','onNameOk','jrXap','buttonAssistOk','performEscape','F16','targetScaleX','pagedown','buttons','MDR','MEXYo','_statusWindow','bRIcT','processEscape','_dimmerSprite','INQUINT','_setupEventHandlers','Total','SideView','ACCEPT','buttonY','SqfWm','processKeyboardDelete','GLGUK','PictureEasingType','targetX','_realScale','mainAreaHeightSideButtonLayout','BQPct','inputWindowRect','statusParamsWindowRect','initCoreEngineScreenShake','clear','Window_NumberInput_processDigitChange','ItemRect','optFb','_shakeDuration','xparamRate2','SceneManager_onKeyDown','Game_Picture_updateMove','GoldOverlap','resetFontSettings','aiUio','targetOpacity','DNxaP','BTestArmors','CustomParamAbb','Sprite_Animation_processSoundTimings','level','layoutSettings','BxOow','ButtonFadeSpeed','_scene','KNEMu','requestMotion','slice','Rate1','updateClose','TILDE','remove','NRVeP','RruIR','sdSUo','iconWidth','Window_Selectable_processTouch','_bitmap','_downArrowSprite','SHIFT','clearCachedKeys','RowSpacing','clone','WASD','isItemStyle','%2%1%3','determineSideButtonLayoutValid','reservePlayTestNewGameCommonEvent','DamageColor','eVDxb','WyGrk','SParamVocab9','homat','left','ARRAYEVAL','backgroundBitmap','lvhOl','XParamVocab3','sparamPlus1','_internalTextures','startAnimation','wait','pKNkO','scale','processTimingData','INQUAD','_centerElementCoreEngine','number','Bitmap_strokeRect','SQnMa','original','sTysh','qTcfL','strokeRect','PSjld','processDigitChange','OQCtK','GoldIcon','WDJlt','isPlaytest','INOUTCIRC','bgmVolume','Control\x20Variables\x20Script\x20Error','_actor','normalColor','ewZgk','BACK_SLASH','ModernControls','HANJA','setAttack','HOcPc','centerSprite','openURL','_hp','Tilemap_addShadow','ColorSystem','Scene_MenuBase_helpAreaTop','ParamMax','refreshDimmerBitmap','exjJS','_dummyWindow','qqZJC','mhHmW','ButtonAssist','Game_Map_setup','keyMapper','RCfls','tPEsX','setCoreEngineUpdateWindowBg','playEscape','Window','Spriteset_Battle_createEnemies','_targetOffsetY','setBattleSystem','_backgroundFilter','WIN_OEM_ATTN','Scene_Status_create','LUK','yWdPu','process_VisuMZ_CoreEngine_CustomParameters','fillText','ARRAYJSON','contentsOpacity','XHGTu','iGEDo','egvWx','DocumentTitleFmt','isGameActive','command357','drawActorExpGauge','SEMICOLON','CRI','key%1','ColorExpGauge2','onClick','expGaugeColor2','OptionsMenu','horizontal','EscapeAlways','param','CQTcR','CLOSE_CURLY_BRACKET','ColorGaugeBack','CustomParamNames','VisuMZ_2_BattleSystemSTB','updatePositionCoreEngineShakeOriginal','Power','BTestAddedQuantity','zPyhi','pop','sellWindowRect','_clickHandler','abs','Window_Base_initialize','SParamVocab4','drbJc','_lastPluginCommandInterpreter','StatusMenu','getColorDataFromPluginParameters','updateDocumentTitle','getLastPluginCommandInterpreter','keyCode','ParseItemNotetags','contentsBack','areButtonsOutsideMainUI','updatePictureAntiZoom','PDR','BottomHelp','F12','isCancelled','Bitmap_fillRect','Yuvlg','gaugeRate','paramName','getLevel','StatusEquipBgType','(\x5cd+)([%％])>','focus','XXKXq','ESC','cancelShowButton','Window_Base_drawFace','changeTextColor','cursorPageup','HIoAQ','RGQAI','setupValueFont','outlineColorDmg','constructor','targetY','loadPicture','RpoAj','INQUART','PA1','SParameterFormula','_categoryWindow','PLAY','VisuMZ_2_BattleSystemFTB','contains','exjDj','PYsNv','vxcWF','UejUb','actorWindowRect','process_VisuMZ_CoreEngine_Notetags','Game_Interpreter_PluginCommand','faceWidth','onInputBannedWords','buttonAssistKey3','ProfileRect','WIN_OEM_PA2','currentValue','MAXHP','VOLUME_UP','IconParam2','STB','XVCyh','dqTNb','_customModified','refresh','command105','drawIcon','openingSpeed','valueOutlineWidth','uiAreaHeight','win32','stringKeyMap','_destroyInternalTextures','_sideButtonLayout','bitmapWidth','MultiKeyFmt','DdcRO','down2','process_VisuMZ_CoreEngine_jsQuickFunctions','INOUTQUAD','IconSParam7','BuyBgType','PEYsC','DTB','makeFontSmaller','DECIMAL','innerWidth','runCombinedScrollingTextAsCode','picture','isMagical','TCR','ParseAllNotetags','SkillTypeRect','iMQsw','JUNJA','Game_Interpreter_command105','_movementDuration','_digitGroupingEx','expGaugeColor1','NUM_LOCK','QQfuR','buttonAssistKey4','ItemPadding','updateBackOpacity','fadeSpeed','Sprite_AnimationMV_processTimingData','areButtonsHidden','prAjs','paramWidth','updatePositionCoreEngineShakeVert','cos','mlNWl','traitsPi','helpAreaBottom','buttonAssistText4','_drawTextOutline','NewGameBoot','paramPlus','F24','getGamepads','parse','anchor','destroyCoreEngineMarkedBitmaps','buttonAssistOffset5','Settings','LoadMenu','MCR','IconXParam0','skipBranch','CAPSLOCK','F23','helpWindowRect','DisplayedParams','clearStencil','EISU','Version','isKeyItem','initBasic','skillTypeWindowRect','_shouldPreventDefault','isFullDocumentTitle','ctGaugeColor2','missed','tilesets','_stored_maxLvGaugeColor1','Game_Interpreter_command111','Plus','cmFod','characters','ParseActorNotetags','removeAllFauxAnimations','Game_BattlerBase_refresh','WIN_OEM_FJ_TOUROKU','outlineColor','itemLineRect','Conditional\x20Branch\x20Script\x20Error','_skillTypeWindow','BTB','_playtestF7Looping','createTitleButtons','adjustPictureAntiZoom','Script\x20Call\x20Error','_cancelButton','paramRate2','isMaskingEnabled','ceil','drawActorSimpleStatus','dummyWindowRect','setFrame','isArrowPressed','akotn','Sprite_Button_updateOpacity','OUTELASTIC','itemBackColor1','enable','ShopMenu','showDevTools','TRAIT_PARAM','open','home','CreateBattleSystemID','updateOrigin','EXR','currentLevelExp','addChildToBack','isCursorMovable','paOPA','note','_sellWindow','nickname','horzJS','_refreshPauseSign','F21','Game_Actor_changeClass','numActions','command122','Scene_Base_createWindowLayer','bgVXI','children','process_VisuMZ_CoreEngine_Functions','processKeyboardBackspace','WIN_OEM_CUSEL','adjustSprite','dfqwU','EditBgType','EbMtq','DataManager_setupNewGame','_shakeSpeed','uPtXw','hide','isClosed','IconSParam5','sparam','guardSkillId','faceHeight','processTouch','KeyItemProtect','isEnabled','image-rendering','onInputOk','traitObjects','ExtJS','Scene_Boot_onDatabaseLoaded','Basic','lEfzd','mainAreaTopSideButtonLayout','parameters','OUTSINE','Flat2','_pageupButton','_backgroundSprite','ZkOko','ValueJS','_opening','_stored_tpGaugeColor2','sv_actors','canUse','name','drawText','QUESTION_MARK','isDying','textColor','Icon','EXCLAMATION','SParamVocab7','setSize','ColorMaxLvGauge2','EsIAE','sparamFlat1','checkCacheKey','BattleManager_processEscape','LINEAR','BannedWords','isRightInputMode','MzaOg','TextStr','isSmartEventCollisionOn','isOpen','biECc','ColorNormal','updateKeyText','currencyUnit','DLThH','animationShouldMirror','targetSpritePosition','OPEN_PAREN','buttonAssistKey2','drawCharacter','DrawItemBackgroundJS','isUseModernControls','scaleMode','end','Spriteset_Base_destroy','HRG','eventsXyNt','ConvertNumberToString','Actor','xparam','_isWindow','qUbeL','targetContentsOpacity','onMoveEnd','popScene','createTextState','outlineColorGauge','isActor','processKeyboardHandling','OutlineColorGauge','iconHeight','version','FadeSpeed','createBuffer','eCwUS','_moveEasingType','gtICW','piayJ','battleSystem','Rate2','hoHzt','itemSuccessRate','Window_NameInput_cursorLeft','igqIM','option','addLoadListener','paramFlat','ikBEo','initialize','_upArrowSprite','mainFontSize','_hideTileShadows','setGuard','drawNewParam','params','IconXParam3','CLOSE_BRACKET','jIHKQ','initialBattleSystem','NoTileShadows','Window_Base_drawIcon','aObop','system','GREATER_THAN','loadSystemImages','_pressed','altKey','BaseTexture','ctGaugeColor1','WBckL','ColorTPGauge2','ParseTilesetNotetags','XParamVocab9','_index','ParamArrow','_offsetX','gameTitle','SlotRect','Sprite_Battler_startMove','isNextScene','shake','ColorHPGauge2','OnLoadJS','StatusParamsRect','bgsVolume','Scene_Skill_create','_numberWindow','resetTextColor','tOXwM','processKeyboardDigitChange','paramPlusJS','_forcedTroopView','makeDeepCopy','loadSystem','IconParam5','Vkuum','SParamVocab5','moveRelativeToResolutionChange','buttonAssistWindowButtonRect','createPageButtons','drawItem','EXSEL','NolIj','substring','filters','type','CommandBgType','loadTitle1','GxJIG','tpGaugeColor2','bDlOX','Color','WindowLayer_render','Window_StatusBase_drawActorLevel','Game_Character_processMoveCommand','MenuLayout','listWindowRect','index','reduce','Window_StatusBase_drawActorSimpleStatus','ScreenShake','nWMbI','fillStyle','SCALE_MODES','_number','_height','isMaxLevel','powerUpColor','_stored_expGaugeColor1','setMute','clamp','Game_BattlerBase_initMembers','cSUzd','_slotWindow','dimColor2','BTestWeapons','_stored_tpGaugeColor1','pageup','repositionEnemiesByResolution','result','background','random','buttonAreaHeight','NumberRect','buttonAssistOffset2','vknya','HelpBgType','duration','evaded','WIN_OEM_PA3','OptionsBgType','_optionsWindow','MainMenu','height','startAutoNewGame','CLOSE_PAREN','aBHpx','imageSmoothingEnabled','tpGaugeColor1','itemPadding','CommandRect','render','PEiXR','_margin','ParseEnemyNotetags','TextCodeClassNames','sv_enemies','xdg-open','getCombinedScrollingText','qSCJK','_listWindow','_blank','NameMenu','format','Input_update','IconXParam1','_cacheScaleY','COLON','NewGameCommonEventAll','pow','offsetY','tXeuR','KeySHIFT','top','paramchangeTextColor','WIN_OEM_WSCTRL','PcyLj','setup','framebuffer','INOUTQUINT','updateShadow','mute','width','_drawTextShadow','playMiss','pictureId','InputRect','WIN_OEM_AUTO','Game_Picture_y','BuyRect','SystemSetSideView','changeClass','wmixh','KEEP','titles1','title','SCROLL_LOCK','NUMPAD0','1012004LDFjWr','keyRepeatWait','QgcAC','BlurFilter','WMPMX','WIN_ICO_00','setActorHome','useDigitGrouping','outbounce','_menuButton','createCustomParameter','retrieveFauxAnimation','DigitGroupingLocale','Window_EquipItem_isEnabled','min','_backSprite1','nw.gui','0.00','drawSegment','98CZzqDc','SnapshotOpacity','nErYF','Scene_Battle_update','ApplyEasing','actor','includes','RepositionEnemies','IconParam0','_anchor','ImprovedAccuracySystem','sparamFlat2','getBackgroundOpacity','skillTypes','SideButtons','DefaultStyle','opacity','ItemMenu','ForceNoPlayTest','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','DefaultMode','Input_onKeyDown','clearZoom','SceneManager_initialize','MenuBg','kfndp','MULTIPLY','fJGcr','displayX','StartID','diIdr','learnings','_windowLayer','forceOutOfPlaytest','Enable','en-US','WIN_OEM_ENLW','NUMPAD7','Keyboard','advanced','cursorDown','StatusBgType','Spriteset_Base_updatePosition','GOMXQ','createCustomBackgroundImages','rxATZ','isOpenAndActive','_targetAnchor','MRF','updateAnchor','BattleSystem','Untitled','COMMA','qWZiz','StatusRect','updateMotion','INSINE','mainAreaHeight','updatePositionCoreEngine','areTileShadowsHidden','nWeHR','xparamFlat2','NDnaK','INOUTSINE','ProfileBgType','_stored_mpGaugeColor1','AnimationMirrorOffset','Speed','maxBattleMembers','destroy','drawTextEx','_duration','stencilFunc','battlebacks2','Bitmap_drawText','removeChild','smallParamFontSize','tab','diieS','start','pixelated','catchLoadError','itemHit','GRD','F14','PhEhK','MUEDg','value','TGR','isExpGaugeDrawn','playCursorSound','normal','GameEnd','VgIgb','visible','isOptionValid','alwaysDash','Game_System_initialize','STENCIL_BUFFER_BIT','paramMaxJS','Location','CustomParamType','renderNoMask','Rate','eEmpm','_baseTexture','getColor','Scene_Boot_startNormalGame','Sprite_Animation_setViewport','EnableMasking','iIInN','initCoreEngine','WIN_OEM_RESET','PtFpj','UbdRS','defineProperty','itemRect','_stored_expGaugeColor2','DELETE','GuFhv','playBuzzer','applyForcedGameTroopSettingsCoreEngine','boxWidth','XParameterFormula','setHandler','contents','levelUp','tileWidth','scaleSprite','maxGold','EVA','makeDocumentTitle','kQsFR','TitleCommandList','ColSpacing','BgFilename1','ConvertParams','targetScaleY','PIPE','Input_shouldPreventDefault','VPBat','_stored_pendingColor','SEPARATOR','code','mQEbS','setMoveEasingType','animationId','prototype','BACK_QUOTE','updateMain','IconParam1','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','initVisuMZCoreEngine','loadGameImagesCoreEngine','isRepeated','oeeCZ','Game_Screen_initialize','buttonAssistOffset1','drawCurrencyValue','gwucw','EndingID','enemy','targetPosition','animations','VOLUME_DOWN','CANCEL','ParamName','buttonAssistText3','WIN_OEM_CLEAR','statusWindowRect','buttonAssistKey%1','updatePosition','F17','_gamepadWait','buttonAssistKey1','targetEvaRate','EVAL','_effectsContainer','ColorManager_loadWindowskin','volume','isEnemy','hpGaugeColor2','_actorWindow','TimeProgress','setWindowPadding','setColorTone','ZeLzX','\x5c}❪TAB❫\x5c{','update','IUbJs','pictures','DummyRect','Scene_Boot_loadSystemImages','NUMPAD1','updateOpen','test','processHandling','INSERT','PAUSE','FontSmoothing','isWindowMaskingEnabled','_commandList','_isButtonHidden','Game_Action_updateLastTarget','isMVAnimation','_backSprite2','makeEncounterCount','_addShadow','ARRAYSTR','_stored_mpCostColor','PictureEraseRange','processCursorHomeEndTrigger','subtitle','worldTransform','IconSet','yIKbB','sqrt','XERYy','mhp','BTestItems','drawRightArrow','calcEasing','Flat1','GpnRQ','categoryWindowRect','xparamPlus1','Scene_MenuBase_createCancelButton','origin','toString','MEV','printError','RzfUx','OTB','trim','Game_Event_isCollidedWithEvents','KeyTAB','createFauxAnimation','setAction','ENTER','moveMenuButtonSideButtonLayout','INOUTCUBIC','Title','SLEEP','\x5c}❪SHIFT❫\x5c{','pictureButtons','1037617GAWYPJ','CallHandlerJS','drawActorClass','inbounce','originalJS','up2','sdnaQ','Enemy','upkuA','stencilOp','fywSh','_buttonAssistWindow','_mirror','createSpriteset','Bitmap_drawTextOutline','requestFauxAnimation','exit','EnBpS','active','kBuiQ','updateTransform','edfBD','WIN_OEM_FJ_ROYA','isNormalPriority','F7key','drawGameSubtitle','xparamRate1','qArxP','toLowerCase','PyHYP','Bitmap_measureTextWidth','_changingClass','playTestF6','uiAreaWidth','ListBgType','CRSEL','isNumpadPressed','_mainSprite','BvVBq','boxHeight','catchNormalError','mmp','lineHeight','onEscapeSuccess','NameInputMessage','makeCommandList','isNwjs','wJIBN','_stored_hpGaugeColor2','Scene_Battle_createCancelButton','removeFauxAnimation','fIOJX','batch','_forcedBattleSys','description','NEAREST','BgFilename2','Scene_MenuBase_mainAreaHeight','windowPadding','Window_Selectable_drawBackgroundRect','select','CommandList','easingType','HsVoq','DigitGroupingGaugeSprites','OHduY','_data','tpCostColor','flush','_coreEngineShakeStyle','_baseSprite','Flat','EditRect','F11','BACKSPACE','processSoundTimings','pressed','parseForcedGameTroopSettingsCoreEngine','text%1','createBackground','createFauxAnimationSprite','GoldBgType','ActorBgType','MDF','processKeyboardEnd','Bitmap_blt','OptionsRect','Gold','resetBattleSystem','optSideView','padding','OUTBOUNCE','drawGameTitle','SParamVocab1','drawGauge','SkillMenu','JSON','Duration','_screenX','getCoreEngineScreenShakeStyle','maxLvGaugeColor1','randomJS','BgType','SParamVocab8','ewsrm','XParamVocab8','sin','xHiZC','setSideButtonLayout','setHome','itemWindowRect','VisuMZ_2_BattleSystemCTB','_helpWindow','makeInputButtonString','OFrIf','F18','SParamVocab3','useDigitGroupingEx','smoothSelect','_colorCache','mJZzj','1ZrBLyv','commandWindowRows','retreat','replace','GroupDigits','Game_Picture_calcEasing','INCIRC','atbActive','yScrollLinkedOffset','okxdm','REPLACE','EnableNameInput','drawFace','faces','updateScene','create','_stored_hpGaugeColor1','setEnemyAction','createButtonAssistWindow','toUpperCase','WIN_OEM_BACKTAB','QoL','seVolume','AntiZoomPictures','WIN_ICO_CLEAR','numberWindowRect','NiCpv','mmfxG','Sprite_destroy','drawCurrentParam','textSizeEx','UlzXE','titleCommandWindow','GfLIy','JdEoy','onKeyDownKeysF6F7','UNDERSCORE','Scene_Name_onInputOk','VqXtq','CustomParam','processFauxAnimationRequests','deselect','addEventListener','Param','playCursor','Window_Base_update','_windowskin','RevertPreserveNumbers','Graphics','_spriteset','Padding','Graphics_printError','MAX_SAFE_INTEGER','map','itemHitImprovedAccuracy','REC','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','Jbvdz','ZBkEV','process_VisuMZ_CoreEngine_RegExp','destroyed','makeAutoBattleActions','Sprite_Actor_setActorHome','qfgod','UaGWq','DOUBLE_QUOTE','NUMPAD9','drawParamText','DATABASE','DigitGroupingExText','mpGaugeColor2','AWAtA','366534GnaXML','AutoStretch','backOpacity','_defaultStretchMode','paramRateJS','moveCancelButtonSideButtonLayout','asin','updateFauxAnimations','TtkVp','ColorTPCost','LPQea','QkRCn','NONCONVERT','PictureEraseAll','consumeItem','F6key','ShowItemBackground','loadBitmap','numberShowButton','Linear','length','SystemLoadAudio','Renderer','cRVus','XParamVocab7','IconXParam9','TextManager_param','_pollGamepads','translucentOpacity','hit','maxLevel','Window_NameInput_refresh','itemEva','eva','_animation','xparamFlatBonus','PHA','processTouchModernControls','toFixed','darwin','mainAreaTop','INELASTIC','setCoreEngineScreenShakeStyle','hpGaugeColor1','_editWindow','charCode','_commandWindow','setViewportCoreEngineFix','colSpacing','_list','ActorHPColor','AccuracyBoost','currentClass','KZlaE','Type','xScrollLinkedOffset','cancel','Scene_Battle_createSpriteset','backspace','filterArea','Scene_Shop_create','Scene_Boot_updateDocumentTitle','updateEffekseer','updateMainMultiply','AfIcC','GRmUz','AMKoF','child_process','XParamVocab0','_hovered','max','JtsyS','_stored_normalColor','drawGoldItemStyle','isBottomButtonMode','STRUCT','erasePicture','setTargetAnchor','_isPlaytest','DigitGroupingStandardText','Layer','measureTextWidth','TAB','Wait','setLastPluginCommandInterpreter','setBackgroundOpacity','updatePlayTestF7','ITOQL','evaluate','ParseWeaponNotetags','Window_Gold_refresh','buttonAssistSwitch','battlebacks1','Window_NameInput_processHandling','Scene_Unlisted','pendingColor','_storedStack','enableDigitGrouping','oONvd','createCommandWindow','Scene_Menu_create','Sprite_Gauge_gaugeRate','PERCENT','_stored_ctGaugeColor2','helpAreaTopSideButtonLayout','processCursorMove','attackSkillId','blendFunc','Window_NameInput_cursorUp','PixelateImageRendering','Window_NameInput_cursorDown','paramRate','snapForBackground','ATK','Game_Troop_setup','startNormalGame','NUMPAD4','fbXHE','BoxMargin','processBack','_stored_maxLvGaugeColor2','_offsetY','isMenuButtonAssistEnabled','viewport','ButtonHeight','LevelUpFullMp','Window_Selectable_processCursorMove','SmartEventCollisionPriority','style','Sprite_Picture_updateOrigin','fcQIk','inBattle','Window_Base_createTextState','checkSmartEventCollision','EQUALS','applyEasing','BFrYG','Window_NameInput_cursorRight','initButtonHidden','lRBRO','_pictureContainer','_pauseSignSprite','eQMWH','SkillTypeBgType','bitmap','axNle','stop','OutlineColorDmg','LevelUpFullHp','setMainFontSize','members','ctrlKey','createMenuButton','Manual','ADD','dmtfx','DEF','reserveNewGameCommonEvent','drawActorLevel','button','connected','isCollidedWithEvents','XParamVocab6','klcST','ONE_MINUS_SRC_ALPHA','Input_setupEventHandlers','ALTGR','META','_screenY','NUMPAD3','vertJS','zbLYA','zmYPC','MHvWB','maxLvGaugeColor2','OUTCUBIC','anBVb','FINAL','OPEN_CURLY_BRACKET','_onKeyDown','1603yrkGOV','drawActorNickname','isBottomHelpMode','ALT','_closing','oymgG','parallaxes','TzVlS','item','XOWqz','BxSJc','CategoryBgType','Game_Interpreter_command122','CTB','uXSfF','SwitchActorText','GoldFontSize','Bitmap_drawCircle','EnableJS','updateDashToggle','TPB\x20WAIT','shift','playOk','ctUMX','SellBgType','_goldWindow','_playTestFastMode','ctrl','endAnimation','DIVIDE','yjLod','initMembersCoreEngine','hJfnd','CNT','forceStencil','disable','xparamFlatJS','center','levelUpRecovery','PreserveNumbers','isBusy','Window_NameInput_initialize','_width','slotWindowRect','applyCoreEasing','platform','GoldRect','TextJS','KlNPZ','valueOutlineColor','mainCommandWidth','([\x5c+\x5c-]\x5cd+)([%％])>','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','WIN_OEM_FJ_JISHO','WIN_OEM_COPY','NUMPAD6','paramBaseAboveLevel99','buttonAssistText%1','Scene_Map_updateScene','SceneManager_isGameActive','_statusEquipWindow','PPnHR','meVolume','match','bgm','gradientFillRect','_pagedownButton','push','isSideButtonLayout','DrawIcons','OS_KEY','IconXParam7','Game_Temp_initialize','Window_Selectable_cursorUp','isAnimationForEach','Window_Selectable_itemRect','1295048tBCiuX','CEV','SParamVocab6','aFbJJ','HELP','itypeId','StatusParamsBgType','fontSize','Game_Picture_initBasic','NumberBgType','gaugeHeight','PGDN','targetObjects','Game_Party_consumeItem','ytCbh','tpColor','Scene_MenuBase_createBackground','targetBackOpacity','defaultInputMode','sparamFlatJS','buttonAssistText1','Scene_Title_drawGameTitle','drawBackgroundRect','VOLUME_MUTE','KqQvN','MIN_SAFE_INTEGER','keyboard','_cache','makeCoreEngineCommandList','buttonAssistWindowSideRect','updateLastTarget','blockWidth','FTB','Scene_Map_createSpriteset','displayY','isHandled','updateOpacity','_registerKeyInput','ONE','paramY','_backSprite','_maxDigits','escape','bind','isPressed','round','PERIOD','split','isFauxAnimationPlaying','_stored_deathColor','FunctionName','MiQjK','_CoreEngineSettings','createCancelButton','ActorMPColor','XParamVocab5','maxItems','ColorDeath','floor','Graphics_defaultStretchMode','eyWba','OpenURL','ParseSkillNotetags','eSEcV','SystemSetWindowPadding','LATIN1','context','gZBeL','OUTCIRC','qDrqL','isSpecialCode','IconSParam9','dashToggle','ZxGcn','setBackgroundType','terminate','isMapScrollLinked','goldWindowRect','gold','DOWN','subjectHitRate','bgs','_context','Plus2','toLocaleString','Window_Base_drawCharacter','Bitmap_clearRect','Window_Selectable_cursorDown','egbRH','QLYrr','OUTBACK','HIT','yLNcb','IconXParam4','JfFyb','LoadError','pVUCg','Game_Actor_levelUp','NewGameCommonEvent','targets','_tempActor','SellRect','RIGHT','Spriteset_Base_initialize','successRate','BackOpacity','onKeyDown','wnRxd','enter','isItem','hideButtonFromView','Scene_Map_createMenuButton','switchModes','call','CIRCUMFLEX','QWAdG','CodeJS','isSideView','xFNRh','_encounterCount','HelpRect','createEnemies','gaugeLineHeight','maxCols','_inputWindow','randomInt','_fauxAnimationSprites','setActorHomeRepositioned','NUMPAD5','isTpb','KaDgj','paramBase','getInputMultiButtonStrings','itemHeight','profileWindowRect','move','XcNBx','getInputButtonString','kkKTW','getCustomBackgroundSettings','OPEN_BRACKET','resize','addChild','hOWlK','addWindow','VisuMZ_1_OptionsCore','cursorUp','TRG','openness','setEasingType','ACRCO','registerCommand','_timerSprite','isAnimationOffsetXMirrored','expRate','ItemStyle','_coreEasing','ZERO','_mode','tVUhR','dimColor1','getButtonAssistLocation','SystemSetFontSize','ybBhS','dCnGg','UPsEr','Window_NumberInput_start','rgba(0,\x200,\x200,\x201.0)','down','subject','rightArrowWidth','enableDigitGroupingEx','griEq','ParseStateNotetags','sparamPlus','Window_NameInput_cursorPagedown','_muteSound','text','isTriggered','OkText','sparamPlusJS','DimColor2','titles2','animationBaseDelay','_statusParamsWindow','PRESERVCONVERSION(%1)','status','INOUTBACK','paramMax','process_VisuMZ_CoreEngine_Settings','RegExp','setupCoreEngine','catchUnknownError','default','IconSParam3','touchUI','repeat','calcCoreEasing','doesNameContainBannedWords','Scene_Equip_create','GoldMax','drawValue','njPSw','usableSkills','END','markCoreEngineModified','Plus1','(\x5cd+)>','apply','Window_NameInput_cursorPageup','_targetOffsetX','gaugeBackColor','IconSParam2','_digitGrouping','xparamPlusJS','PictureFilename','clearRect','_stored_ctGaugeColor1','startMove','xgnfR','fillRect','InputBgType','SaveMenu','ENTER_SPECIAL','_refreshBack','ColorHPGauge1','LEFT','MAXMP','CoreEngine','gezeZ','isGamepadConnected','ShowDevTools','blt','commandWindowRect','_viewportSize','_itemWindow','Xqpqm','startShake','ColorExpGauge1','F13','EQUAL','_centerElement','4241155hEUbsy','drawGameVersion','skillId','_cacheScaleX','Game_Interpreter_command355','MRG','filter','_fauxAnimationQueue','updateMove','qIbwr','none','cursorLeft','XParamVocab4','initDigitGrouping','_hideButtons','<%1\x20%2:[\x20]','ColorMPGauge1','drawParamName','setClickHandler','showFauxAnimations','mainAreaBottom','EXECUTE','OutlineColor','fuqsA','UQeKL','<JS\x20%1\x20%2:[\x20](.*)>','Scene_Name_create','F10','Game_Picture_show','createWindowLayer','getBattleSystem','allowShiftScrolling','loadWindowskin','446245csFtDr','Bitmap_gradientFillRect','log','SLASH','lIDIo','itemBackColor2','IconXParam6','systemColor','rowSpacing','setupNewGame','([\x5c+\x5c-]\x5cd+)>','Game_Actor_paramBase','mev','onButtonImageLoad','ZrrDx','CrisisRate','repositionCancelButtonSideButtonLayout','#%1','ErZWm','command355','buttonAssistCancel','maElT','textWidth','deathColor','_buyWindow','Page','ZnmLQ','caEmv','fromCharCode','Abbreviation','EOyoO','QUOTE','isGamepadButtonPressed','right','Game_Picture_x','LESS_THAN','drawIconBySize','ColorPowerUp','isPhysical','_inputString','VOGgh','Game_Action_itemHit','GetParamIcon','catchException','ParamChange','Window_Base_drawText','ItemBgType','dNzwp','updateCoreEasing','movePageButtonSideButtonLayout','VisuMZ_2_BattleSystemOTB','helpAreaTop','createFauxAnimationQueue','ColorPowerDown','setSideView','EncounterRateMinimum','createJsQuickFunction','terms','_profileWindow','WsuZs','sparamRate1','Input_pollGamepads','reserveCommonEvent','buttonAssistOffset%1','Spriteset_Base_update','ActorRect','paramValueByName','WIN_OEM_JUMP','SELECT','OUTQUART','AGI','eqlOx','cursorRight','ParseArmorNotetags','ALWAYS','Subtitle','save','_onKeyPress','INEXPO','isTouchedInsideFrame','buttonAssistWindowRect','clearForcedGameTroopSettingsCoreEngine','TvpjQ','ColorCTGauge2','ASTERISK','cCwMS','FontSize','bitmapHeight','_movementWholeDuration','IconXParam5','VisuMZ_2_BattleSystemBTB','Symbol','encounterStepsMinimum','Scene_Map_initialize','ActorTPColor','enemies','GDfew','ouXGV','_coreEasingType','drawCircle','concat','setAnchor','loadTitle2','Sprite_Gauge_currentValue','keypress','Scene_Item_create','OUTEXPO','CategoryRect','lRazc','updatePositionCoreEngineShakeRand','initialLevel','pagedownShowButton','_mapNameWindow','rmxWe','FHBjo','INBACK','innerHeight','StatusEquipRect','jsQuickFunc','stretch','sparamRate','img/%1/','CustomParamIcons','addCommand','INOUTELASTIC','Scene_MenuBase_mainAreaTop','URL','stypeId','ItemBackColor2','INCUBIC','ColorCTGauge1','ParseClassNotetags','ShowJS','STR','rETTF','initCoreEasing','%1%2','Game_Picture_move','TextFmt','processAlwaysEscape','MAT','ZOOM','charAt','updatePadding','_refreshArrows','kztHz','processCursorMoveModernControls'];const _0x231f54=_0x5618;(function(_0x551d01,_0x3b2c6b){const _0xffb1e2=_0x5618;while(!![]){try{const _0xb27193=parseInt(_0xffb1e2(0x51f))+-parseInt(_0xffb1e2(0x356))+-parseInt(_0xffb1e2(0x45e))+-parseInt(_0xffb1e2(0x61f))+-parseInt(_0xffb1e2(0x369))*parseInt(_0xffb1e2(0x5d3))+-parseInt(_0xffb1e2(0x732))+-parseInt(_0xffb1e2(0x711))*-parseInt(_0xffb1e2(0x4d7));if(_0xb27193===_0x3b2c6b)break;else _0x551d01['push'](_0x551d01['shift']());}catch(_0x4bc240){_0x551d01['push'](_0x551d01['shift']());}}}(_0x2459,0xa10e1));var label=_0x231f54(0x703),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x272427){const _0x1a332e=_0x231f54;return _0x272427['status']&&_0x272427[_0x1a332e(0x494)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x231f54(0x200)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x231f54(0x3f1)]=function(_0xb535c5,_0xe8f89f){const _0x2936ec=_0x231f54;for(const _0x2ba1d4 in _0xe8f89f){if(_0x2ba1d4[_0x2936ec(0x612)](/(.*):(.*)/i)){const _0x5db4d4=String(RegExp['$1']),_0x29ea09=String(RegExp['$2'])[_0x2936ec(0x4ea)]()[_0x2936ec(0x452)]();let _0x1df0c4,_0x4f9c58,_0x58aca0;switch(_0x29ea09){case'NUM':_0x1df0c4=_0xe8f89f[_0x2ba1d4]!==''?Number(_0xe8f89f[_0x2ba1d4]):0x0;break;case'ARRAYNUM':_0x4f9c58=_0xe8f89f[_0x2ba1d4]!==''?JSON['parse'](_0xe8f89f[_0x2ba1d4]):[],_0x1df0c4=_0x4f9c58[_0x2936ec(0x50c)](_0x98abf9=>Number(_0x98abf9));break;case _0x2936ec(0x419):_0x1df0c4=_0xe8f89f[_0x2ba1d4]!==''?eval(_0xe8f89f[_0x2ba1d4]):null;break;case _0x2936ec(0x828):_0x4f9c58=_0xe8f89f[_0x2ba1d4]!==''?JSON['parse'](_0xe8f89f[_0x2ba1d4]):[],_0x1df0c4=_0x4f9c58['map'](_0x32208c=>eval(_0x32208c));break;case _0x2936ec(0x4be):_0x1df0c4=_0xe8f89f[_0x2ba1d4]!==''?JSON[_0x2936ec(0x1fc)](_0xe8f89f[_0x2ba1d4]):'';break;case _0x2936ec(0x86b):_0x4f9c58=_0xe8f89f[_0x2ba1d4]!==''?JSON[_0x2936ec(0x1fc)](_0xe8f89f[_0x2ba1d4]):[],_0x1df0c4=_0x4f9c58[_0x2936ec(0x50c)](_0x28c5e2=>JSON[_0x2936ec(0x1fc)](_0x28c5e2));break;case _0x2936ec(0x7d5):_0x1df0c4=_0xe8f89f[_0x2ba1d4]!==''?new Function(JSON[_0x2936ec(0x1fc)](_0xe8f89f[_0x2ba1d4])):new Function('return\x200');break;case'ARRAYFUNC':_0x4f9c58=_0xe8f89f[_0x2ba1d4]!==''?JSON['parse'](_0xe8f89f[_0x2ba1d4]):[],_0x1df0c4=_0x4f9c58[_0x2936ec(0x50c)](_0x134b21=>new Function(JSON[_0x2936ec(0x1fc)](_0x134b21)));break;case _0x2936ec(0x7b7):_0x1df0c4=_0xe8f89f[_0x2ba1d4]!==''?String(_0xe8f89f[_0x2ba1d4]):'';break;case _0x2936ec(0x439):_0x4f9c58=_0xe8f89f[_0x2ba1d4]!==''?JSON['parse'](_0xe8f89f[_0x2ba1d4]):[],_0x1df0c4=_0x4f9c58[_0x2936ec(0x50c)](_0x19b56d=>String(_0x19b56d));break;case _0x2936ec(0x56a):_0x58aca0=_0xe8f89f[_0x2ba1d4]!==''?JSON[_0x2936ec(0x1fc)](_0xe8f89f[_0x2ba1d4]):{},_0xb535c5[_0x5db4d4]={},VisuMZ[_0x2936ec(0x3f1)](_0xb535c5[_0x5db4d4],_0x58aca0);continue;case'ARRAYSTRUCT':_0x4f9c58=_0xe8f89f[_0x2ba1d4]!==''?JSON['parse'](_0xe8f89f[_0x2ba1d4]):[],_0x1df0c4=_0x4f9c58[_0x2936ec(0x50c)](_0x56cfb8=>VisuMZ[_0x2936ec(0x3f1)]({},JSON['parse'](_0x56cfb8)));break;default:continue;}_0xb535c5[_0x5db4d4]=_0x1df0c4;}}return _0xb535c5;},(_0x2871b0=>{const _0x1b4aed=_0x231f54,_0x4eb374=_0x2871b0[_0x1b4aed(0x271)];for(const _0x4983b1 of dependencies){if(_0x1b4aed(0x561)==='spvsV'){function _0x46e23e(){const _0x2ebea8=_0x1b4aed;this[_0x2ebea8(0x2e1)]='FV';}}else{if(!Imported[_0x4983b1]){alert(_0x1b4aed(0x607)[_0x1b4aed(0x333)](_0x4eb374,_0x4983b1)),SceneManager[_0x1b4aed(0x46e)]();break;}}}const _0x465701=_0x2871b0['description'];if(_0x465701[_0x1b4aed(0x612)](/\[Version[ ](.*?)\]/i)){if('CrAis'!==_0x1b4aed(0x5dc)){const _0x3199f2=Number(RegExp['$1']);_0x3199f2!==VisuMZ[label]['version']&&(alert(_0x1b4aed(0x400)[_0x1b4aed(0x333)](_0x4eb374,_0x3199f2)),SceneManager[_0x1b4aed(0x46e)]());}else{function _0x566dae(){const _0x1ed8fb=_0x1b4aed;this[_0x1ed8fb(0x68f)](_0x1ed8fb(0x6e0));}}}if(_0x465701[_0x1b4aed(0x612)](/\[Tier[ ](\d+)\]/i)){const _0x1fef2c=Number(RegExp['$1']);if(_0x1fef2c<tier)alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1b4aed(0x333)](_0x4eb374,_0x1fef2c,tier)),SceneManager[_0x1b4aed(0x46e)]();else{if('lRazc'!==_0x1b4aed(0x79e)){function _0x1b6562(){const _0x27f9fd=_0x1b4aed;this[_0x27f9fd(0x4ce)][_0x27f9fd(0x669)](_0x11121f[_0x27f9fd(0x807)][_0x27f9fd(0x318)]);}}else tier=Math[_0x1b4aed(0x565)](_0x1fef2c,tier);}}VisuMZ[_0x1b4aed(0x3f1)](VisuMZ[label][_0x1b4aed(0x200)],_0x2871b0[_0x1b4aed(0x266)]);})(pluginData),VisuMZ['CoreEngine']['Activated']={'PluginCommands':!![]},PluginManager['registerCommand'](pluginData['name'],_0x231f54(0x65c),_0x3adaaf=>{const _0x14a666=_0x231f54;VisuMZ['ConvertParams'](_0x3adaaf,_0x3adaaf);const _0x37676e=_0x3adaaf[_0x14a666(0x7b0)];VisuMZ[_0x14a666(0x84e)](_0x37676e);}),PluginManager[_0x231f54(0x6b6)](pluginData[_0x231f54(0x271)],'GoldChange',_0x6daf7b=>{const _0x2ada69=_0x231f54;VisuMZ[_0x2ada69(0x3f1)](_0x6daf7b,_0x6daf7b);const _0x1a9303=_0x6daf7b[_0x2ada69(0x3c0)]||0x0;$gameParty['gainGold'](_0x1a9303);}),PluginManager[_0x231f54(0x6b6)](pluginData[_0x231f54(0x271)],_0x231f54(0x7ee),_0x289a02=>{const _0x4ce619=_0x231f54;VisuMZ[_0x4ce619(0x3f1)](_0x289a02,_0x289a02);const _0x3a6fdb=_0x289a02[_0x4ce619(0x349)]||0x1,_0x4af33e=_0x289a02[_0x4ce619(0x49c)]||_0x4ce619(0x532),_0x398745=$gameScreen[_0x4ce619(0x1dc)](_0x3a6fdb);_0x398745&&_0x398745[_0x4ce619(0x6b4)](_0x4af33e);}),PluginManager[_0x231f54(0x6b6)](pluginData[_0x231f54(0x271)],_0x231f54(0x52c),_0x567fde=>{for(let _0x382815=0x1;_0x382815<=0x64;_0x382815++){$gameScreen['erasePicture'](_0x382815);}}),PluginManager[_0x231f54(0x6b6)](pluginData[_0x231f54(0x271)],_0x231f54(0x43b),_0x26cc5d=>{const _0x1e0fe0=_0x231f54;VisuMZ[_0x1e0fe0(0x3f1)](_0x26cc5d,_0x26cc5d);const _0x20082e=Math[_0x1e0fe0(0x364)](_0x26cc5d[_0x1e0fe0(0x386)],_0x26cc5d[_0x1e0fe0(0x409)]),_0x548163=Math[_0x1e0fe0(0x565)](_0x26cc5d[_0x1e0fe0(0x386)],_0x26cc5d['EndingID']);for(let _0x453d59=_0x20082e;_0x453d59<=_0x548163;_0x453d59++){if(_0x1e0fe0(0x2cb)!=='WBckL'){function _0x124eb9(){const _0x128130=_0x1e0fe0;_0x1d4f71=_0x57754c[_0x128130(0x796)](_0x3e722d);}}else $gameScreen[_0x1e0fe0(0x56b)](_0x453d59);}}),PluginManager['registerCommand'](pluginData['name'],_0x231f54(0x2fe),_0x301d78=>{const _0x3d80ae=_0x231f54;VisuMZ['ConvertParams'](_0x301d78,_0x301d78);const _0xc29a5a=_0x301d78['Type']||_0x3d80ae(0x313),_0x46bf86=_0x301d78[_0x3d80ae(0x884)]['clamp'](0x1,0x9),_0x95db23=_0x301d78[_0x3d80ae(0x3ac)][_0x3d80ae(0x308)](0x1,0x9),_0x17d999=_0x301d78[_0x3d80ae(0x4bf)]||0x1,_0x27efdd=_0x301d78[_0x3d80ae(0x572)];$gameScreen[_0x3d80ae(0x549)](_0xc29a5a),$gameScreen[_0x3d80ae(0x70c)](_0x46bf86,_0x95db23,_0x17d999);if(_0x27efdd){const _0x3d93f4=$gameTemp[_0x3d80ae(0x892)]();if(_0x3d93f4)_0x3d93f4[_0x3d80ae(0x82f)](_0x17d999);}}),PluginManager[_0x231f54(0x6b6)](pluginData[_0x231f54(0x271)],_0x231f54(0x6c1),_0x2c21fe=>{const _0x4768aa=_0x231f54;VisuMZ[_0x4768aa(0x3f1)](_0x2c21fe,_0x2c21fe);const _0x50ecc9=_0x2c21fe[_0x4768aa(0x2b2)]||0x1;$gameSystem[_0x4768aa(0x5b4)](_0x50ecc9);}),PluginManager[_0x231f54(0x6b6)](pluginData['name'],_0x231f54(0x34e),_0x2b3f04=>{const _0x55e3a8=_0x231f54;if($gameParty['inBattle']())return;VisuMZ[_0x55e3a8(0x3f1)](_0x2b3f04,_0x2b3f04);const _0x8c9d83=_0x2b3f04[_0x55e3a8(0x2b2)];if(_0x8c9d83['match'](/Front/i))$gameSystem[_0x55e3a8(0x768)](![]);else _0x8c9d83['match'](/Side/i)?$gameSystem['setSideView'](!![]):$gameSystem[_0x55e3a8(0x768)](!$gameSystem['isSideView']());}),PluginManager[_0x231f54(0x6b6)](pluginData[_0x231f54(0x271)],_0x231f54(0x534),_0x41ad94=>{const _0x3d011c=_0x231f54;if($gameParty[_0x3d011c(0x5a2)]())return;VisuMZ[_0x3d011c(0x3f1)](_0x41ad94,_0x41ad94);const _0x1bc4ca=[_0x3d011c(0x613),_0x3d011c(0x670),'me','se'];for(const _0x1073e5 of _0x1bc4ca){if(_0x3d011c(0x471)!==_0x3d011c(0x471)){function _0xe77df2(){const _0x3926a2=_0x3d011c,_0x24feeb=_0x16e82f[_0x3926a2(0x236)](_0x2884ec,_0x3926a2(0x331));}}else{const _0x23322d=_0x41ad94[_0x1073e5],_0x53ec2e='%1/'[_0x3d011c(0x333)](_0x1073e5);for(const _0x21f665 of _0x23322d){if(_0x3d011c(0x317)!==_0x3d011c(0x317)){function _0x25ed03(){const _0x42d1e1=_0x3d011c,_0x216901=_0x42d1e1(0x306);this[_0x42d1e1(0x4d5)]=this[_0x42d1e1(0x4d5)]||{};if(this[_0x42d1e1(0x4d5)][_0x216901])return this[_0x42d1e1(0x4d5)][_0x216901];const _0x279bbb=_0xd19480[_0x42d1e1(0x703)]['Settings'][_0x42d1e1(0x2f5)][_0x42d1e1(0x70d)];return this[_0x42d1e1(0x890)](_0x216901,_0x279bbb);}}else console[_0x3d011c(0x734)](_0x53ec2e,_0x21f665),AudioManager[_0x3d011c(0x2a7)](_0x53ec2e,_0x21f665);}}}}),PluginManager['registerCommand'](pluginData[_0x231f54(0x271)],'SystemLoadImages',_0x49389f=>{const _0x472731=_0x231f54;if($gameParty[_0x472731(0x5a2)]())return;VisuMZ[_0x472731(0x3f1)](_0x49389f,_0x49389f);const _0x471b46=[_0x472731(0x40c),_0x472731(0x57b),'battlebacks2',_0x472731(0x218),_0x472731(0x791),_0x472731(0x4e4),_0x472731(0x5d9),_0x472731(0x427),_0x472731(0x26f),_0x472731(0x32c),_0x472731(0x2c4),_0x472731(0x213),_0x472731(0x352),'titles2'];for(const _0x5a5169 of _0x471b46){if(_0x472731(0x5aa)===_0x472731(0x5aa)){const _0x1de54a=_0x49389f[_0x5a5169],_0x3292f3=_0x472731(0x7ab)[_0x472731(0x333)](_0x5a5169);for(const _0x3744ec of _0x1de54a){if(_0x472731(0x566)!==_0x472731(0x566)){function _0x552a1b(){const _0x833d08=_0x472731,_0x4681b0=this[_0x833d08(0x2fb)]();_0x43205a[_0x833d08(0x6d1)](_0x833d08(0x237))&&this[_0x833d08(0x4d4)](_0x5579ab[_0x833d08(0x364)](this[_0x833d08(0x2fb)](),0x0)),_0x4b4e16[_0x833d08(0x6d1)](_0x833d08(0x293))&&this['smoothSelect'](_0x1a87fe[_0x833d08(0x565)](this[_0x833d08(0x2fb)](),this[_0x833d08(0x657)]()-0x1)),this['index']()!==_0x4681b0&&this[_0x833d08(0x3c3)]();}}else ImageManager[_0x472731(0x530)](_0x3292f3,_0x3744ec);}}else{function _0x3e8bb2(){const _0x4d954f=_0x472731;this['switchModes'](_0x4d954f(0x6e0));}}}}),PluginManager[_0x231f54(0x6b6)](pluginData[_0x231f54(0x271)],_0x231f54(0x7d6),_0x446148=>{const _0x5a796f=_0x231f54;if($gameParty[_0x5a796f(0x5a2)]())return;VisuMZ[_0x5a796f(0x3f1)](_0x446148,_0x446148);const _0x337ac6=_0x446148[_0x5a796f(0x2b2)][_0x5a796f(0x4ea)]()[_0x5a796f(0x452)](),_0x4b071f=VisuMZ[_0x5a796f(0x703)][_0x5a796f(0x238)](_0x337ac6);$gameSystem[_0x5a796f(0x863)](_0x4b071f);}),VisuMZ['CoreEngine']['CreateBattleSystemID']=function(_0x34e332){const _0x50695b=_0x231f54;_0x34e332=_0x34e332||_0x50695b(0x51b),_0x34e332=String(_0x34e332)[_0x50695b(0x4ea)]()[_0x50695b(0x452)]();switch(_0x34e332){case _0x50695b(0x1d7):return 0x0;case'TPB\x20ACTIVE':if(Imported[_0x50695b(0x6b0)]){if(_0x50695b(0x67d)==='tEmfG'){function _0x2fde60(){const _0x44f973=_0x50695b;_0x25dba5[_0x44f973(0x85b)][0x23]='end',_0x3f4bbc[_0x44f973(0x85b)][0x24]='home';}}else ConfigManager[_0x50695b(0x4de)]=!![];}return 0x1;case _0x50695b(0x5e7):if(Imported[_0x50695b(0x6b0)]){if(_0x50695b(0x517)!==_0x50695b(0x747))ConfigManager[_0x50695b(0x4de)]=![];else{function _0x1f40bb(){_0x4f9371+=_0x279775(_0x4e96df);}}}return 0x2;case _0x50695b(0x5e0):if(Imported[_0x50695b(0x4cd)]){if(_0x50695b(0x813)!=='RruIR'){function _0x27ba3a(){const _0x34cd7c=_0x50695b;return _0x5eb701[_0x34cd7c(0x703)]['Settings'][_0x34cd7c(0x4ec)][_0x34cd7c(0x552)]&&this[_0x34cd7c(0x6c8)]()[_0x34cd7c(0x2a1)]()?this[_0x34cd7c(0x6c8)]()[_0x34cd7c(0x53c)]+0.05:this[_0x34cd7c(0x6c8)]()[_0x34cd7c(0x53c)];}}else return _0x50695b(0x5e0);}break;case _0x50695b(0x1c0):if(Imported[_0x50695b(0x882)])return _0x50695b(0x1c0);break;case _0x50695b(0x221):if(Imported[_0x50695b(0x78c)])return _0x50695b(0x221);break;case _0x50695b(0x63f):if(Imported['VisuMZ_2_BattleSystemFTB'])return'FTB';break;case _0x50695b(0x451):if(Imported[_0x50695b(0x764)])return'OTB';break;}return $dataSystem[_0x50695b(0x2ac)];},PluginManager[_0x231f54(0x6b6)](pluginData[_0x231f54(0x271)],_0x231f54(0x65f),_0x241b67=>{const _0x39b9d9=_0x231f54;VisuMZ[_0x39b9d9(0x3f1)](_0x241b67,_0x241b67);const _0x41a42c=_0x241b67[_0x39b9d9(0x2b2)]||0x1;$gameSystem['setWindowPadding'](_0x41a42c);}),VisuMZ[_0x231f54(0x703)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x231f54(0x3fc)]['onDatabaseLoaded'],Scene_Boot[_0x231f54(0x3fc)]['onDatabaseLoaded']=function(){const _0x3335c4=_0x231f54;VisuMZ[_0x3335c4(0x703)]['Scene_Boot_onDatabaseLoaded'][_0x3335c4(0x690)](this),this['process_VisuMZ_CoreEngine_RegExp'](),this['process_VisuMZ_CoreEngine_Notetags'](),this[_0x3335c4(0x6dc)](),this[_0x3335c4(0x24b)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),VisuMZ['ParseAllNotetags']();},VisuMZ[_0x231f54(0x703)][_0x231f54(0x6dd)]={},Scene_Boot[_0x231f54(0x3fc)]['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x315462=_0x231f54,_0x3e21c8=[_0x315462(0x1bd),_0x315462(0x702),_0x315462(0x590),_0x315462(0x5bb),_0x315462(0x7be),_0x315462(0x4b1),_0x315462(0x778),_0x315462(0x867)],_0x58833c=['HIT',_0x315462(0x3eb),_0x315462(0x875),_0x315462(0x620),_0x315462(0x44e),_0x315462(0x399),_0x315462(0x5f4),_0x315462(0x295),_0x315462(0x716),_0x315462(0x6b2)],_0x3c3989=[_0x315462(0x3c1),_0x315462(0x3bc),_0x315462(0x50e),_0x315462(0x543),'MCR','TCR','PDR',_0x315462(0x7df),_0x315462(0x7ca),'EXR'],_0xf3fcdc=[_0x3e21c8,_0x58833c,_0x3c3989],_0xdd7dd1=[_0x315462(0x216),_0x315462(0x6ed),'Plus2','Max',_0x315462(0x3d0),_0x315462(0x80e),'Rate2','Flat','Flat1',_0x315462(0x268)];for(const _0x278769 of _0xf3fcdc){let _0x529cac='';if(_0x278769===_0x3e21c8)_0x529cac=_0x315462(0x87d);if(_0x278769===_0x58833c)_0x529cac=_0x315462(0x299);if(_0x278769===_0x3c3989)_0x529cac=_0x315462(0x258);for(const _0x34c2c0 of _0xdd7dd1){let _0x13ffee=_0x315462(0x7ba)['format'](_0x529cac,_0x34c2c0);VisuMZ[_0x315462(0x703)][_0x315462(0x6dd)][_0x13ffee]=[],VisuMZ[_0x315462(0x703)][_0x315462(0x6dd)][_0x13ffee+'JS']=[];let _0x29c7b7=_0x315462(0x720);if([_0x315462(0x216),_0x315462(0x4a5)][_0x315462(0x36f)](_0x34c2c0))_0x29c7b7+=_0x315462(0x73c);else{if([_0x315462(0x6ed),_0x315462(0x447)][_0x315462(0x36f)](_0x34c2c0))_0x29c7b7+=_0x315462(0x606);else{if([_0x315462(0x672),_0x315462(0x268)][_0x315462(0x36f)](_0x34c2c0))_0x29c7b7+=_0x315462(0x50f);else{if(_0x34c2c0==='Max')_0x29c7b7+='(\x5cd+)>';else{if(_0x34c2c0===_0x315462(0x80e))_0x29c7b7+=_0x315462(0x199);else _0x34c2c0===_0x315462(0x2ad)&&(_0x29c7b7+='(\x5cd+\x5c.?\x5cd+)>');}}}}for(const _0x20d612 of _0x278769){if(_0x315462(0x677)!==_0x315462(0x826)){let _0x49e021=_0x34c2c0[_0x315462(0x4da)](/[\d+]/g,'')[_0x315462(0x4ea)]();const _0x26d219=_0x29c7b7['format'](_0x20d612,_0x49e021);VisuMZ['CoreEngine'][_0x315462(0x6dd)][_0x13ffee][_0x315462(0x616)](new RegExp(_0x26d219,'i'));const _0xdf67cd=_0x315462(0x72a)[_0x315462(0x333)](_0x20d612,_0x49e021);VisuMZ[_0x315462(0x703)]['RegExp'][_0x13ffee+'JS'][_0x315462(0x616)](new RegExp(_0xdf67cd,'i'));}else{function _0xb0c02(){const _0x50a9a2=_0x315462;return _0x42c886=_0x5ea445[_0x50a9a2(0x4da)](/(\d)/gi,(_0x3febab,_0x1298d6)=>_0x50a9a2(0x6d8)[_0x50a9a2(0x333)](_0x3fee1b(_0x1298d6))),_0x50a9a2(0x81f)[_0x50a9a2(0x333)](_0x265e99,_0x42c9f7,_0x4ecd39);}}}}}},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_Notetags']=function(){if(VisuMZ['ParseAllNotetags'])return;},Scene_Boot[_0x231f54(0x3fc)][_0x231f54(0x6dc)]=function(){const _0xcf43dc=_0x231f54;VisuMZ[_0xcf43dc(0x703)]['Settings'][_0xcf43dc(0x4ec)]['OpenConsole']&&VisuMZ[_0xcf43dc(0x706)](!![]);if(VisuMZ[_0xcf43dc(0x703)][_0xcf43dc(0x200)][_0xcf43dc(0x4ec)]['ModernControls']){if('lYofc'===_0xcf43dc(0x33b)){function _0x3403e1(){const _0x3ff509=_0xcf43dc;this['_backgroundFilter']=new _0x25e2a1[(_0x3ff509(0x2ee))][(_0x3ff509(0x359))](_0x96605d=!![]),this[_0x3ff509(0x26a)]=new _0x599d17(),this['_backgroundSprite'][_0x3ff509(0x5af)]=_0x120b9e[_0x3ff509(0x829)](),this[_0x3ff509(0x26a)][_0x3ff509(0x2ee)]=[this[_0x3ff509(0x864)]],this[_0x3ff509(0x6ad)](this[_0x3ff509(0x26a)]),this[_0x3ff509(0x574)](0xc0),this['setBackgroundOpacity'](this['getBackgroundOpacity']()),this[_0x3ff509(0x395)]();}}else Input[_0xcf43dc(0x85b)][0x23]=_0xcf43dc(0x293),Input[_0xcf43dc(0x85b)][0x24]=_0xcf43dc(0x237);}if(VisuMZ['CoreEngine'][_0xcf43dc(0x200)][_0xcf43dc(0x859)]){const _0x1c147e=VisuMZ['CoreEngine'][_0xcf43dc(0x200)]['ButtonAssist'];_0x1c147e['KeySHIFT']=_0x1c147e[_0xcf43dc(0x33c)]||_0xcf43dc(0x45c),_0x1c147e[_0xcf43dc(0x454)]=_0x1c147e[_0xcf43dc(0x454)]||_0xcf43dc(0x424);}VisuMZ['CoreEngine'][_0xcf43dc(0x200)][_0xcf43dc(0x7d2)][_0xcf43dc(0x81d)]&&(Input['keyMapper'][0x57]='up',Input[_0xcf43dc(0x85b)][0x41]=_0xcf43dc(0x827),Input['keyMapper'][0x53]='down',Input[_0xcf43dc(0x85b)][0x44]=_0xcf43dc(0x753),Input[_0xcf43dc(0x85b)][0x45]=_0xcf43dc(0x7dd));if(VisuMZ['CoreEngine'][_0xcf43dc(0x200)][_0xcf43dc(0x7d2)]['DashToggleR']){if(_0xcf43dc(0x3bf)===_0xcf43dc(0x23e)){function _0xc098ce(){const _0x48f20d=_0xcf43dc;this[_0x48f20d(0x742)]();}}else Input[_0xcf43dc(0x85b)][0x52]=_0xcf43dc(0x667);}},Scene_Boot['prototype'][_0x231f54(0x24b)]=function(){this['process_VisuMZ_CoreEngine_jsQuickFunctions']();},Scene_Boot[_0x231f54(0x3fc)][_0x231f54(0x1d2)]=function(){const _0x2e1614=_0x231f54,_0x19e9d1=VisuMZ[_0x2e1614(0x703)]['Settings'][_0x2e1614(0x7a8)];for(const _0x19b940 of _0x19e9d1){const _0xa94f78=_0x19b940[_0x2e1614(0x651)]['replace'](/[ ]/g,''),_0x2e788a=_0x19b940[_0x2e1614(0x693)];VisuMZ[_0x2e1614(0x703)]['createJsQuickFunction'](_0xa94f78,_0x2e788a);}},VisuMZ[_0x231f54(0x703)][_0x231f54(0x76a)]=function(_0x4cfde4,_0x168a4c){const _0x24a1cc=_0x231f54;if(!!window[_0x4cfde4]){if($gameTemp[_0x24a1cc(0x841)]())console[_0x24a1cc(0x734)]('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'['format'](_0x4cfde4));}const _0x1456df=_0x24a1cc(0x37c)[_0x24a1cc(0x333)](_0x4cfde4,_0x168a4c);window[_0x4cfde4]=new Function(_0x1456df);},Scene_Boot['prototype'][_0x231f54(0x869)]=function(){const _0x4c1bef=_0x231f54,_0x3a6ea6=VisuMZ[_0x4c1bef(0x703)][_0x4c1bef(0x200)][_0x4c1bef(0x4fe)];if(!_0x3a6ea6)return;for(const _0x441905 of _0x3a6ea6){if(_0x4c1bef(0x68a)!==_0x4c1bef(0x35a)){if(!_0x441905)continue;VisuMZ['CoreEngine'][_0x4c1bef(0x360)](_0x441905);}else{function _0x4c2d72(){_0x1c694b+=_0xdf54e0(_0x1a9338);}}}},VisuMZ['CoreEngine']['CustomParamNames']={},VisuMZ[_0x231f54(0x703)][_0x231f54(0x7ac)]={},VisuMZ[_0x231f54(0x703)][_0x231f54(0x3ce)]={},VisuMZ[_0x231f54(0x703)][_0x231f54(0x804)]={},VisuMZ[_0x231f54(0x703)][_0x231f54(0x360)]=function(_0x1f5a22){const _0x2244dc=_0x231f54,_0x4ea4de=_0x1f5a22['Abbreviation'],_0x5bd502=_0x1f5a22['ParamName'],_0x1f35c1=_0x1f5a22[_0x2244dc(0x276)],_0x492b02=_0x1f5a22[_0x2244dc(0x555)],_0x2f04a2=new Function(_0x1f5a22['ValueJS']);VisuMZ['CoreEngine']['CustomParamNames'][_0x4ea4de[_0x2244dc(0x4ea)]()['trim']()]=_0x5bd502,VisuMZ[_0x2244dc(0x703)][_0x2244dc(0x7ac)][_0x4ea4de[_0x2244dc(0x4ea)]()[_0x2244dc(0x452)]()]=_0x1f35c1,VisuMZ[_0x2244dc(0x703)]['CustomParamType'][_0x4ea4de[_0x2244dc(0x4ea)]()[_0x2244dc(0x452)]()]=_0x492b02,VisuMZ['CoreEngine'][_0x2244dc(0x804)][_0x4ea4de[_0x2244dc(0x4ea)]()['trim']()]=_0x4ea4de,Object[_0x2244dc(0x3dc)](Game_BattlerBase[_0x2244dc(0x3fc)],_0x4ea4de,{'get'(){const _0x25438a=_0x2f04a2['call'](this);return _0x492b02==='integer'?Math['round'](_0x25438a):_0x25438a;}});},VisuMZ[_0x231f54(0x1df)]=function(){const _0xa92b79=_0x231f54;for(const _0x4c8a27 of $dataActors){if(_0x4c8a27)VisuMZ[_0xa92b79(0x219)](_0x4c8a27);}for(const _0x354f7d of $dataClasses){if(_0x354f7d)VisuMZ[_0xa92b79(0x7b5)](_0x354f7d);}for(const _0x342b6b of $dataSkills){if(_0x342b6b)VisuMZ[_0xa92b79(0x65d)](_0x342b6b);}for(const _0x537062 of $dataItems){if(_0xa92b79(0x5c2)!==_0xa92b79(0x5c2)){function _0x335d16(){const _0xa07afd=_0xa92b79;this[_0xa07afd(0x77a)](_0x9232e1[_0xa07afd(0x6d1)](_0xa07afd(0x753)));}}else{if(_0x537062)VisuMZ[_0xa92b79(0x894)](_0x537062);}}for(const _0x43d726 of $dataWeapons){if('hTTfT'==='hTTfT'){if(_0x43d726)VisuMZ[_0xa92b79(0x578)](_0x43d726);}else{function _0x1e5b90(){const _0x186b6b=_0xa92b79;_0x9922f7[_0x186b6b(0x703)]['Input_clear'][_0x186b6b(0x690)](this),this[_0x186b6b(0x759)]=_0x3a6b72,this['_inputSpecialKeyCode']=_0xa7b06e,this[_0x186b6b(0x416)]=_0x5bfeab[_0x186b6b(0x357)];}}}for(const _0x27fc86 of $dataArmors){if(_0x27fc86)VisuMZ[_0xa92b79(0x77b)](_0x27fc86);}for(const _0x4769e1 of $dataEnemies){if(_0x4769e1)VisuMZ[_0xa92b79(0x32a)](_0x4769e1);}for(const _0x48f07a of $dataStates){if(_0x48f07a)VisuMZ[_0xa92b79(0x6cc)](_0x48f07a);}for(const _0x422d6c of $dataTilesets){if(_0x422d6c)VisuMZ['ParseTilesetNotetags'](_0x422d6c);}},VisuMZ[_0x231f54(0x219)]=function(_0x51b42d){},VisuMZ[_0x231f54(0x7b5)]=function(_0x303eee){},VisuMZ[_0x231f54(0x65d)]=function(_0x21afe1){},VisuMZ[_0x231f54(0x894)]=function(_0x49b52d){},VisuMZ[_0x231f54(0x578)]=function(_0x4bc418){},VisuMZ['ParseArmorNotetags']=function(_0x5a3c9a){},VisuMZ[_0x231f54(0x32a)]=function(_0x42174b){},VisuMZ[_0x231f54(0x6cc)]=function(_0x365e5e){},VisuMZ[_0x231f54(0x2cd)]=function(_0x3f1c0e){},VisuMZ[_0x231f54(0x703)]['ParseActorNotetags']=VisuMZ[_0x231f54(0x219)],VisuMZ['ParseActorNotetags']=function(_0x203c8d){const _0x5377e3=_0x231f54;VisuMZ['CoreEngine'][_0x5377e3(0x219)][_0x5377e3(0x690)](this,_0x203c8d);const _0x7dab90=_0x203c8d['note'];if(_0x7dab90[_0x5377e3(0x612)](/<MAX LEVEL:[ ](\d+)>/i)){_0x203c8d[_0x5377e3(0x53d)]=Number(RegExp['$1']);if(_0x203c8d['maxLevel']===0x0)_0x203c8d[_0x5377e3(0x53d)]=Number[_0x5377e3(0x50b)];}_0x7dab90[_0x5377e3(0x612)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x203c8d[_0x5377e3(0x7a0)]=Math[_0x5377e3(0x364)](Number(RegExp['$1']),_0x203c8d[_0x5377e3(0x53d)]));},VisuMZ[_0x231f54(0x703)][_0x231f54(0x7b5)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x231f54(0x7b5)]=function(_0x548407){const _0x3efac=_0x231f54;VisuMZ[_0x3efac(0x703)]['ParseClassNotetags']['call'](this,_0x548407);if(_0x548407[_0x3efac(0x388)])for(const _0x3f1d45 of _0x548407[_0x3efac(0x388)]){if(_0x3f1d45[_0x3efac(0x23f)][_0x3efac(0x612)](/<LEARN AT LEVEL:[ ](\d+)>/i)){if(_0x3efac(0x86f)!==_0x3efac(0x7d8))_0x3f1d45[_0x3efac(0x806)]=Math[_0x3efac(0x565)](Number(RegExp['$1']),0x1);else{function _0x16fb39(){const _0x216a05=_0x3efac;if(this[_0x216a05(0x6bd)]==='keyboard'&&!_0x328654[_0x216a05(0x22d)]())return;if(_0x1c9072['isNumpadPressed']())return;_0x331c86[_0x216a05(0x703)][_0x216a05(0x58d)]['call'](this,_0x3af873),this[_0x216a05(0x68f)](_0x216a05(0x6e0));}}}}},VisuMZ['CoreEngine'][_0x231f54(0x32a)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x231f54(0x32a)]=function(_0xdb9a86){const _0x411a14=_0x231f54;VisuMZ[_0x411a14(0x703)]['ParseEnemyNotetags']['call'](this,_0xdb9a86),_0xdb9a86[_0x411a14(0x806)]=0x1;const _0x11d4dd=_0xdb9a86[_0x411a14(0x23f)];if(_0x11d4dd[_0x411a14(0x612)](/<LEVEL:[ ](\d+)>/i))_0xdb9a86[_0x411a14(0x806)]=Number(RegExp['$1']);if(_0x11d4dd['match'](/<MAXHP:[ ](\d+)>/i))_0xdb9a86[_0x411a14(0x2bc)][0x0]=Number(RegExp['$1']);if(_0x11d4dd[_0x411a14(0x612)](/<MAXMP:[ ](\d+)>/i))_0xdb9a86[_0x411a14(0x2bc)][0x1]=Number(RegExp['$1']);if(_0x11d4dd[_0x411a14(0x612)](/<ATK:[ ](\d+)>/i))_0xdb9a86[_0x411a14(0x2bc)][0x2]=Number(RegExp['$1']);if(_0x11d4dd[_0x411a14(0x612)](/<DEF:[ ](\d+)>/i))_0xdb9a86[_0x411a14(0x2bc)][0x3]=Number(RegExp['$1']);if(_0x11d4dd[_0x411a14(0x612)](/<MAT:[ ](\d+)>/i))_0xdb9a86['params'][0x4]=Number(RegExp['$1']);if(_0x11d4dd['match'](/<MDF:[ ](\d+)>/i))_0xdb9a86[_0x411a14(0x2bc)][0x5]=Number(RegExp['$1']);if(_0x11d4dd['match'](/<AGI:[ ](\d+)>/i))_0xdb9a86[_0x411a14(0x2bc)][0x6]=Number(RegExp['$1']);if(_0x11d4dd[_0x411a14(0x612)](/<LUK:[ ](\d+)>/i))_0xdb9a86[_0x411a14(0x2bc)][0x7]=Number(RegExp['$1']);if(_0x11d4dd[_0x411a14(0x612)](/<EXP:[ ](\d+)>/i))_0xdb9a86['exp']=Number(RegExp['$1']);if(_0x11d4dd['match'](/<GOLD:[ ](\d+)>/i))_0xdb9a86[_0x411a14(0x66d)]=Number(RegExp['$1']);},VisuMZ[_0x231f54(0x703)][_0x231f54(0x65a)]=Graphics['_defaultStretchMode'],Graphics[_0x231f54(0x522)]=function(){const _0x37fe85=_0x231f54;switch(VisuMZ[_0x37fe85(0x703)]['Settings']['QoL'][_0x37fe85(0x520)]){case _0x37fe85(0x7a9):return!![];case _0x37fe85(0x3c4):return![];default:return VisuMZ[_0x37fe85(0x703)][_0x37fe85(0x65a)][_0x37fe85(0x690)](this);}},VisuMZ[_0x231f54(0x703)][_0x231f54(0x50a)]=Graphics[_0x231f54(0x44f)],Graphics[_0x231f54(0x44f)]=function(_0x4e4633,_0x417036,_0x39ee3a=null){const _0x14070e=_0x231f54;VisuMZ['CoreEngine'][_0x14070e(0x50a)][_0x14070e(0x690)](this,_0x4e4633,_0x417036,_0x39ee3a),VisuMZ[_0x14070e(0x706)](![]);},VisuMZ[_0x231f54(0x703)]['Graphics_centerElement']=Graphics['_centerElement'],Graphics[_0x231f54(0x710)]=function(_0x2d361b){const _0x1d34e8=_0x231f54;VisuMZ[_0x1d34e8(0x703)]['Graphics_centerElement'][_0x1d34e8(0x690)](this,_0x2d361b),this[_0x1d34e8(0x834)](_0x2d361b);},Graphics[_0x231f54(0x834)]=function(_0x58e1f5){const _0xddb362=_0x231f54;VisuMZ[_0xddb362(0x703)]['Settings']['QoL'][_0xddb362(0x430)]&&(_0x58e1f5[_0xddb362(0x59f)]['font-smooth']=_0xddb362(0x71b));VisuMZ[_0xddb362(0x703)]['Settings'][_0xddb362(0x4ec)][_0xddb362(0x58c)]&&(_0x58e1f5[_0xddb362(0x59f)][_0xddb362(0x25e)]=_0xddb362(0x3b9));const _0x44d969=Math[_0xddb362(0x565)](0x0,Math[_0xddb362(0x659)](_0x58e1f5['width']*this[_0xddb362(0x7f0)])),_0xc1970f=Math[_0xddb362(0x565)](0x0,Math[_0xddb362(0x659)](_0x58e1f5[_0xddb362(0x31f)]*this['_realScale']));_0x58e1f5[_0xddb362(0x59f)][_0xddb362(0x346)]=_0x44d969+'px',_0x58e1f5[_0xddb362(0x59f)]['height']=_0xc1970f+'px';},Bitmap[_0x231f54(0x3fc)]['markCoreEngineModified']=function(){const _0x2faa74=_0x231f54;this[_0x2faa74(0x1c3)]=!![];},VisuMZ[_0x231f54(0x703)]['Sprite_destroy']=Sprite[_0x231f54(0x3fc)]['destroy'],Sprite[_0x231f54(0x3fc)][_0x231f54(0x3ae)]=function(){const _0x18c5d9=_0x231f54;VisuMZ['CoreEngine'][_0x18c5d9(0x4f3)][_0x18c5d9(0x690)](this),this[_0x18c5d9(0x1fe)]();},Sprite[_0x231f54(0x3fc)]['destroyCoreEngineMarkedBitmaps']=function(){const _0x405dbe=_0x231f54;if(!this[_0x405dbe(0x5af)])return;if(!this[_0x405dbe(0x5af)][_0x405dbe(0x1c3)])return;if(this[_0x405dbe(0x5af)][_0x405dbe(0x3d2)]&&!this[_0x405dbe(0x817)][_0x405dbe(0x3d2)][_0x405dbe(0x513)]){if(_0x405dbe(0x5a1)===_0x405dbe(0x48d)){function _0xed660(){const _0x252d31=_0x405dbe;this[_0x252d31(0x7e4)]=new _0x39027c(),this['_dimmerSprite']['bitmap']=new _0x5a7eea(0x0,0x0),this[_0x252d31(0x7e4)]['x']=0x0,this['addChildToBack'](this['_dimmerSprite']);}}else this[_0x405dbe(0x5af)][_0x405dbe(0x3ae)]();}},VisuMZ[_0x231f54(0x703)]['Bitmap_resize']=Bitmap[_0x231f54(0x3fc)][_0x231f54(0x6ac)],Bitmap[_0x231f54(0x3fc)][_0x231f54(0x6ac)]=function(_0xf9fdcd,_0x1f5440){const _0x201b07=_0x231f54;VisuMZ[_0x201b07(0x703)]['Bitmap_resize']['call'](this,_0xf9fdcd,_0x1f5440),this[_0x201b07(0x6ec)]();},VisuMZ['CoreEngine'][_0x231f54(0x4b3)]=Bitmap[_0x231f54(0x3fc)][_0x231f54(0x707)],Bitmap[_0x231f54(0x3fc)][_0x231f54(0x707)]=function(_0x207f2a,_0x16e96a,_0x5643c3,_0x53ea22,_0x341362,_0xb3c6cc,_0x3a4f49,_0x2f25d3,_0x18987c){const _0x4a4749=_0x231f54;VisuMZ[_0x4a4749(0x703)][_0x4a4749(0x4b3)]['call'](this,_0x207f2a,_0x16e96a,_0x5643c3,_0x53ea22,_0x341362,_0xb3c6cc,_0x3a4f49,_0x2f25d3,_0x18987c),this[_0x4a4749(0x6ec)]();},VisuMZ[_0x231f54(0x703)][_0x231f54(0x675)]=Bitmap[_0x231f54(0x3fc)][_0x231f54(0x6f7)],Bitmap['prototype'][_0x231f54(0x6f7)]=function(_0x17f602,_0x54d01a,_0x46edc2,_0x233822){const _0x475651=_0x231f54;VisuMZ['CoreEngine'][_0x475651(0x675)]['call'](this,_0x17f602,_0x54d01a,_0x46edc2,_0x233822),this['markCoreEngineModified']();},VisuMZ[_0x231f54(0x703)]['Bitmap_fillRect']=Bitmap[_0x231f54(0x3fc)][_0x231f54(0x6fb)],Bitmap['prototype']['fillRect']=function(_0x37b4b1,_0x530a87,_0x50f675,_0x363219,_0x3e112e){const _0x324ba2=_0x231f54;VisuMZ[_0x324ba2(0x703)][_0x324ba2(0x193)]['call'](this,_0x37b4b1,_0x530a87,_0x50f675,_0x363219,_0x3e112e),this[_0x324ba2(0x6ec)]();},VisuMZ[_0x231f54(0x703)]['Bitmap_strokeRect']=Bitmap[_0x231f54(0x3fc)][_0x231f54(0x83b)],Bitmap[_0x231f54(0x3fc)]['strokeRect']=function(_0x2db2c3,_0x170381,_0x55aef0,_0x4cb81b,_0x353a90){const _0x26caf1=_0x231f54;VisuMZ[_0x26caf1(0x703)][_0x26caf1(0x836)][_0x26caf1(0x690)](this,_0x2db2c3,_0x170381,_0x55aef0,_0x4cb81b,_0x353a90),this[_0x26caf1(0x6ec)]();},VisuMZ[_0x231f54(0x703)][_0x231f54(0x733)]=Bitmap[_0x231f54(0x3fc)][_0x231f54(0x614)],Bitmap[_0x231f54(0x3fc)]['gradientFillRect']=function(_0x4b44d5,_0x373411,_0x2bd956,_0x56c147,_0x21f6db,_0x5518ed,_0x5a5290){const _0x7ecf54=_0x231f54;VisuMZ['CoreEngine'][_0x7ecf54(0x733)]['call'](this,_0x4b44d5,_0x373411,_0x2bd956,_0x56c147,_0x21f6db,_0x5518ed,_0x5a5290),this[_0x7ecf54(0x6ec)]();},VisuMZ[_0x231f54(0x703)][_0x231f54(0x5e4)]=Bitmap[_0x231f54(0x3fc)][_0x231f54(0x795)],Bitmap[_0x231f54(0x3fc)]['drawCircle']=function(_0x5437b7,_0xe4df92,_0x12f3aa,_0x21bb46){const _0x46714e=_0x231f54;_0x5437b7=Math[_0x46714e(0x64c)](_0x5437b7),_0xe4df92=Math[_0x46714e(0x64c)](_0xe4df92),_0x12f3aa=Math[_0x46714e(0x64c)](_0x12f3aa),VisuMZ[_0x46714e(0x703)][_0x46714e(0x5e4)][_0x46714e(0x690)](this,_0x5437b7,_0xe4df92,_0x12f3aa,_0x21bb46),this[_0x46714e(0x6ec)]();},VisuMZ[_0x231f54(0x703)][_0x231f54(0x47c)]=Bitmap['prototype'][_0x231f54(0x570)],Bitmap[_0x231f54(0x3fc)]['measureTextWidth']=function(_0x3761cc){const _0xce9b11=_0x231f54;return Math[_0xce9b11(0x64c)](VisuMZ[_0xce9b11(0x703)]['Bitmap_measureTextWidth'][_0xce9b11(0x690)](this,_0x3761cc));},VisuMZ['CoreEngine'][_0x231f54(0x3b3)]=Bitmap[_0x231f54(0x3fc)][_0x231f54(0x272)],Bitmap[_0x231f54(0x3fc)][_0x231f54(0x272)]=function(_0xbd3562,_0x9f2487,_0x21118e,_0x125858,_0x5aead1,_0x17a508){const _0x45ddbc=_0x231f54;_0x9f2487=Math['round'](_0x9f2487),_0x21118e=Math[_0x45ddbc(0x64c)](_0x21118e),_0x125858=Math['round'](_0x125858),_0x5aead1=Math['round'](_0x5aead1),VisuMZ['CoreEngine']['Bitmap_drawText'][_0x45ddbc(0x690)](this,_0xbd3562,_0x9f2487,_0x21118e,_0x125858,_0x5aead1,_0x17a508),this['markCoreEngineModified']();},VisuMZ[_0x231f54(0x703)]['Bitmap_drawTextOutline']=Bitmap['prototype'][_0x231f54(0x1f7)],Bitmap[_0x231f54(0x3fc)][_0x231f54(0x1f7)]=function(_0x2f8d9c,_0x50ce2e,_0x4284a7,_0x4792a0){const _0x72dbb4=_0x231f54;if(VisuMZ['CoreEngine'][_0x72dbb4(0x200)][_0x72dbb4(0x4ec)]['FontShadows']){if(_0x72dbb4(0x4fd)===_0x72dbb4(0x4fd))this[_0x72dbb4(0x347)](_0x2f8d9c,_0x50ce2e,_0x4284a7,_0x4792a0);else{function _0x9d6f1d(){const _0x583d49=_0x72dbb4;_0x2305ae[_0x583d49(0x3e1)]();}}}else VisuMZ[_0x72dbb4(0x703)][_0x72dbb4(0x46c)][_0x72dbb4(0x690)](this,_0x2f8d9c,_0x50ce2e,_0x4284a7,_0x4792a0);},Bitmap[_0x231f54(0x3fc)][_0x231f54(0x347)]=function(_0x360cdb,_0x16087c,_0xfcd79b,_0x203276){const _0x1cf652=_0x231f54,_0x20ffa0=this[_0x1cf652(0x661)];_0x20ffa0[_0x1cf652(0x300)]=this[_0x1cf652(0x21d)],_0x20ffa0[_0x1cf652(0x86a)](_0x360cdb,_0x16087c+0x2,_0xfcd79b+0x2,_0x203276);},VisuMZ[_0x231f54(0x703)]['Input_clear']=Input[_0x231f54(0x7f6)],Input[_0x231f54(0x7f6)]=function(){const _0x2c9a42=_0x231f54;VisuMZ[_0x2c9a42(0x703)]['Input_clear']['call'](this),this[_0x2c9a42(0x759)]=undefined,this[_0x2c9a42(0x7cd)]=undefined,this[_0x2c9a42(0x416)]=Input['keyRepeatWait'];},VisuMZ['CoreEngine']['Input_update']=Input[_0x231f54(0x425)],Input[_0x231f54(0x425)]=function(){const _0x4cf02b=_0x231f54;VisuMZ['CoreEngine']['Input_update'][_0x4cf02b(0x690)](this);if(this[_0x4cf02b(0x416)])this['_gamepadWait']--;},VisuMZ[_0x231f54(0x703)][_0x231f54(0x76f)]=Input[_0x231f54(0x53a)],Input[_0x231f54(0x53a)]=function(){const _0x520b02=_0x231f54;if(this[_0x520b02(0x416)])return;VisuMZ[_0x520b02(0x703)][_0x520b02(0x76f)][_0x520b02(0x690)](this);},VisuMZ[_0x231f54(0x703)][_0x231f54(0x5c4)]=Input[_0x231f54(0x7e6)],Input['_setupEventHandlers']=function(){const _0x1dae4a=_0x231f54;VisuMZ[_0x1dae4a(0x703)]['Input_setupEventHandlers'][_0x1dae4a(0x690)](this),document['addEventListener'](_0x1dae4a(0x79a),this[_0x1dae4a(0x77f)][_0x1dae4a(0x64a)](this));},VisuMZ[_0x231f54(0x703)][_0x231f54(0x37e)]=Input['_onKeyDown'],Input[_0x231f54(0x5d2)]=function(_0xe8d328){const _0x421f55=_0x231f54;this[_0x421f55(0x7cd)]=_0xe8d328[_0x421f55(0x893)],VisuMZ[_0x421f55(0x703)][_0x421f55(0x37e)]['call'](this,_0xe8d328);},Input[_0x231f54(0x77f)]=function(_0x97d7a9){const _0x9e3fe0=_0x231f54;this[_0x9e3fe0(0x644)](_0x97d7a9);},Input[_0x231f54(0x644)]=function(_0x373769){const _0x48da3b=_0x231f54;this['_inputSpecialKeyCode']=_0x373769[_0x48da3b(0x893)];let _0x2e8b73=String[_0x48da3b(0x74e)](_0x373769[_0x48da3b(0x54c)]);this[_0x48da3b(0x759)]===undefined?this['_inputString']=_0x2e8b73:this[_0x48da3b(0x759)]+=_0x2e8b73;},VisuMZ[_0x231f54(0x703)][_0x231f54(0x3f4)]=Input['_shouldPreventDefault'],Input[_0x231f54(0x20f)]=function(_0x538933){const _0x1e04ff=_0x231f54;if(_0x538933===0x8)return![];return VisuMZ[_0x1e04ff(0x703)][_0x1e04ff(0x3f4)][_0x1e04ff(0x690)](this,_0x538933);},Input[_0x231f54(0x665)]=function(_0x5558e4){const _0x30fc6e=_0x231f54;if(_0x5558e4['match'](/backspace/i))return this[_0x30fc6e(0x7cd)]===0x8;if(_0x5558e4['match'](/enter/i))return this[_0x30fc6e(0x7cd)]===0xd;if(_0x5558e4[_0x30fc6e(0x612)](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input['isNumpadPressed']=function(){const _0x1bcb67=_0x231f54;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x1bcb67(0x1af)](this[_0x1bcb67(0x7cd)]);},Input[_0x231f54(0x22d)]=function(){const _0x5b742f=_0x231f54;return[0x25,0x26,0x27,0x28]['contains'](this[_0x5b742f(0x7cd)]);},Input[_0x231f54(0x705)]=function(){const _0x1a802d=_0x231f54;if(navigator[_0x1a802d(0x1fb)]){const _0x6fa938=navigator['getGamepads']();if(_0x6fa938)for(const _0x2c92f5 of _0x6fa938){if(_0x1a802d(0x7f9)!==_0x1a802d(0x6c4)){if(_0x2c92f5&&_0x2c92f5[_0x1a802d(0x5bf)])return!![];}else{function _0x5cd240(){const _0x204af1=_0x1a802d;return _0x204af1(0x63f);}}}}return![];},Input['isGamepadTriggered']=function(){const _0x24d87b=_0x231f54;if(navigator[_0x24d87b(0x1fb)]){if(_0x24d87b(0x808)==='BxOow'){const _0x59962a=navigator[_0x24d87b(0x1fb)]();if(_0x59962a){if('XWrNH'!==_0x24d87b(0x328))for(const _0x9a37bf of _0x59962a){if(_0x9a37bf&&_0x9a37bf[_0x24d87b(0x5bf)]){if(this[_0x24d87b(0x752)](_0x9a37bf))return!![];}}else{function _0x311d6a(){return _0x1d45ce;}}}}else{function _0x2c23de(){const _0x286839=_0x24d87b;this[_0x286839(0x26d)]=![];}}}return![];},Input[_0x231f54(0x752)]=function(_0xfa0906){const _0x1fa827=_0x231f54,_0x9a3ea7=_0xfa0906[_0x1fa827(0x7de)];for(let _0x4082bb=0x0;_0x4082bb<_0x9a3ea7[_0x1fa827(0x533)];_0x4082bb++){if(_0x9a3ea7[_0x4082bb][_0x1fa827(0x4aa)])return!![];}return![];},VisuMZ[_0x231f54(0x703)]['Tilemap_addShadow']=Tilemap[_0x231f54(0x3fc)][_0x231f54(0x438)],Tilemap[_0x231f54(0x3fc)][_0x231f54(0x438)]=function(_0x520bec,_0x17ddf9,_0x4baa43,_0x474e03){const _0x2c8fee=_0x231f54;if($gameMap&&$gameMap['areTileShadowsHidden']())return;VisuMZ[_0x2c8fee(0x703)][_0x2c8fee(0x850)][_0x2c8fee(0x690)](this,_0x520bec,_0x17ddf9,_0x4baa43,_0x474e03);},Tilemap[_0x231f54(0x535)][_0x231f54(0x3fc)]['_createInternalTextures']=function(){const _0x12dd85=_0x231f54;this[_0x12dd85(0x1cc)]();for(let _0x285be8=0x0;_0x285be8<Tilemap[_0x12dd85(0x56f)]['MAX_GL_TEXTURES'];_0x285be8++){const _0x48cedd=new PIXI[(_0x12dd85(0x2c9))]();_0x48cedd[_0x12dd85(0x279)](0x800,0x800);if(VisuMZ[_0x12dd85(0x703)]['Settings'][_0x12dd85(0x4ec)][_0x12dd85(0x58c)]){if(_0x12dd85(0x4c6)==='AbQlm'){function _0x597e89(){const _0x25d05f=_0x12dd85;this[_0x25d05f(0x320)]();}}else _0x48cedd[_0x12dd85(0x292)]=PIXI[_0x12dd85(0x301)][_0x12dd85(0x495)];}this[_0x12dd85(0x82d)][_0x12dd85(0x616)](_0x48cedd);}},WindowLayer[_0x231f54(0x3fc)][_0x231f54(0x228)]=function(){const _0x27463d=_0x231f54;return SceneManager&&SceneManager[_0x27463d(0x80a)]?SceneManager[_0x27463d(0x80a)][_0x27463d(0x431)]():!![];},VisuMZ['CoreEngine'][_0x231f54(0x2f6)]=WindowLayer[_0x231f54(0x3fc)][_0x231f54(0x327)],WindowLayer[_0x231f54(0x3fc)][_0x231f54(0x327)]=function render(_0x54082d){const _0xe2903=_0x231f54;if(this[_0xe2903(0x228)]()){if('gHJbu'===_0xe2903(0x29b)){function _0xe73282(){const _0x499b27=_0xe2903;_0x4f0f44[_0x499b27(0x703)][_0x499b27(0x816)][_0x499b27(0x690)](this);}}else VisuMZ[_0xe2903(0x703)][_0xe2903(0x2f6)][_0xe2903(0x690)](this,_0x54082d);}else{if(_0xe2903(0x87e)!==_0xe2903(0x5cf))this[_0xe2903(0x3cf)](_0x54082d);else{function _0x2c1ebb(){const _0x1eb3fe=_0xe2903;return _0x2e8fe7[_0x1eb3fe(0x6d9)]&&_0x24704c[_0x1eb3fe(0x494)][_0x1eb3fe(0x36f)]('['+_0x5b8953+']');}}}},WindowLayer['prototype']['renderNoMask']=function render(_0x7b624){const _0x1214cc=_0x231f54;if(!this[_0x1214cc(0x3c7)])return;const _0x529103=new PIXI[(_0x1214cc(0x507))](),_0xb5e4c9=_0x7b624['gl'],_0x535fe5=this[_0x1214cc(0x24a)][_0x1214cc(0x81c)]();_0x7b624[_0x1214cc(0x342)][_0x1214cc(0x5f5)](),_0x529103['transform']=this['transform'],_0x7b624[_0x1214cc(0x492)][_0x1214cc(0x4a2)](),_0xb5e4c9[_0x1214cc(0x232)](_0xb5e4c9['STENCIL_TEST']);while(_0x535fe5[_0x1214cc(0x533)]>0x0){const _0x4e42bd=_0x535fe5[_0x1214cc(0x5e8)]();_0x4e42bd[_0x1214cc(0x29a)]&&_0x4e42bd['visible']&&_0x4e42bd['openness']>0x0&&(_0xb5e4c9[_0x1214cc(0x3b1)](_0xb5e4c9[_0x1214cc(0x70f)],0x0,~0x0),_0xb5e4c9[_0x1214cc(0x467)](_0xb5e4c9[_0x1214cc(0x351)],_0xb5e4c9[_0x1214cc(0x351)],_0xb5e4c9['KEEP']),_0x4e42bd[_0x1214cc(0x327)](_0x7b624),_0x7b624[_0x1214cc(0x492)]['flush'](),_0x529103[_0x1214cc(0x7f6)](),_0xb5e4c9['stencilFunc'](_0xb5e4c9[_0x1214cc(0x77c)],0x1,~0x0),_0xb5e4c9[_0x1214cc(0x467)](_0xb5e4c9[_0x1214cc(0x4e1)],_0xb5e4c9['REPLACE'],_0xb5e4c9['REPLACE']),_0xb5e4c9['blendFunc'](_0xb5e4c9[_0x1214cc(0x6bc)],_0xb5e4c9[_0x1214cc(0x645)]),_0x529103[_0x1214cc(0x327)](_0x7b624),_0x7b624[_0x1214cc(0x492)][_0x1214cc(0x4a2)](),_0xb5e4c9[_0x1214cc(0x58a)](_0xb5e4c9[_0x1214cc(0x645)],_0xb5e4c9[_0x1214cc(0x5c3)]));}_0xb5e4c9[_0x1214cc(0x5f6)](_0xb5e4c9['STENCIL_TEST']),_0xb5e4c9[_0x1214cc(0x7f6)](_0xb5e4c9[_0x1214cc(0x3cb)]),_0xb5e4c9[_0x1214cc(0x209)](0x0),_0x7b624[_0x1214cc(0x492)][_0x1214cc(0x4a2)]();for(const _0xb25a9f of this[_0x1214cc(0x24a)]){!_0xb25a9f[_0x1214cc(0x29a)]&&_0xb25a9f[_0x1214cc(0x3c7)]&&_0xb25a9f[_0x1214cc(0x327)](_0x7b624);}_0x7b624[_0x1214cc(0x492)][_0x1214cc(0x4a2)]();},DataManager['isKeyItem']=function(_0xa3fd80){const _0x4f6ccb=_0x231f54;return this[_0x4f6ccb(0x68c)](_0xa3fd80)&&_0xa3fd80['itypeId']===0x2;},VisuMZ[_0x231f54(0x703)][_0x231f54(0x252)]=DataManager[_0x231f54(0x73b)],DataManager['setupNewGame']=function(){const _0x1ec59e=_0x231f54;VisuMZ[_0x1ec59e(0x703)][_0x1ec59e(0x252)][_0x1ec59e(0x690)](this),this[_0x1ec59e(0x821)](),this['reserveNewGameCommonEvent']();},DataManager[_0x231f54(0x821)]=function(){const _0x19c686=_0x231f54;if($gameTemp['isPlaytest']()){const _0x577244=VisuMZ[_0x19c686(0x703)][_0x19c686(0x200)]['QoL'][_0x19c686(0x681)];if(_0x577244>0x0)$gameTemp[_0x19c686(0x770)](_0x577244);}},DataManager[_0x231f54(0x5bc)]=function(){const _0x408014=_0x231f54,_0x3ab100=VisuMZ[_0x408014(0x703)][_0x408014(0x200)][_0x408014(0x4ec)][_0x408014(0x338)]||0x0;if(_0x3ab100>0x0)$gameTemp[_0x408014(0x770)](_0x3ab100);},TextManager['stringKeyMap']=['','','',_0x231f54(0x40e),'','',_0x231f54(0x623),'',_0x231f54(0x4a8),_0x231f54(0x571),'','','CLEAR',_0x231f54(0x457),_0x231f54(0x6fe),'',_0x231f54(0x819),'CTRL',_0x231f54(0x5d6),_0x231f54(0x42f),_0x231f54(0x205),'KANA',_0x231f54(0x20a),_0x231f54(0x1e2),_0x231f54(0x5d0),_0x231f54(0x84a),'',_0x231f54(0x19c),'CONVERT',_0x231f54(0x52b),_0x231f54(0x7e9),'MODECHANGE','SPACE','PGUP',_0x231f54(0x62a),_0x231f54(0x6eb),'HOME',_0x231f54(0x701),'UP',_0x231f54(0x685),_0x231f54(0x66e),_0x231f54(0x776),'PRINT',_0x231f54(0x726),'PRINTSCREEN',_0x231f54(0x42e),_0x231f54(0x3df),'','0','1','2','3','4','5','6','7','8','9',_0x231f54(0x337),_0x231f54(0x874),_0x231f54(0x755),_0x231f54(0x5a5),_0x231f54(0x2c5),_0x231f54(0x273),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x231f54(0x619),'','CONTEXT_MENU','',_0x231f54(0x45b),_0x231f54(0x355),_0x231f54(0x42a),_0x231f54(0x7d3),_0x231f54(0x5c8),_0x231f54(0x593),_0x231f54(0x69f),_0x231f54(0x60a),_0x231f54(0x38e),'NUMPAD8',_0x231f54(0x519),_0x231f54(0x383),_0x231f54(0x5b9),_0x231f54(0x3f7),'SUBTRACT',_0x231f54(0x1d9),_0x231f54(0x5f0),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x231f54(0x72c),_0x231f54(0x4a7),_0x231f54(0x191),_0x231f54(0x70e),_0x231f54(0x3bd),'F15',_0x231f54(0x7db),_0x231f54(0x415),_0x231f54(0x4d1),'F19','F20',_0x231f54(0x244),'F22',_0x231f54(0x206),_0x231f54(0x1fa),'','','','','','','','',_0x231f54(0x1e7),_0x231f54(0x354),_0x231f54(0x608),'WIN_OEM_FJ_MASSHOU',_0x231f54(0x21c),'WIN_OEM_FJ_LOYA',_0x231f54(0x474),'','','','','','','','','',_0x231f54(0x691),_0x231f54(0x277),_0x231f54(0x518),'HASH','DOLLAR',_0x231f54(0x585),'AMPERSAND',_0x231f54(0x4fb),_0x231f54(0x28d),_0x231f54(0x321),_0x231f54(0x786),'PLUS',_0x231f54(0x3f3),'HYPHEN_MINUS',_0x231f54(0x5d1),_0x231f54(0x87f),_0x231f54(0x810),'','','','',_0x231f54(0x636),_0x231f54(0x40d),_0x231f54(0x1be),'','',_0x231f54(0x874),_0x231f54(0x5a5),_0x231f54(0x39d),'MINUS',_0x231f54(0x64d),_0x231f54(0x735),_0x231f54(0x3fd),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x231f54(0x6ab),_0x231f54(0x848),_0x231f54(0x2be),_0x231f54(0x751),'',_0x231f54(0x5c6),_0x231f54(0x5c5),'','WIN_ICO_HELP',_0x231f54(0x35b),'',_0x231f54(0x4ef),'','',_0x231f54(0x3d9),_0x231f54(0x775),'WIN_OEM_PA1',_0x231f54(0x1bb),_0x231f54(0x31b),_0x231f54(0x33f),_0x231f54(0x24d),_0x231f54(0x865),'WIN_OEM_FINISH',_0x231f54(0x609),_0x231f54(0x34b),_0x231f54(0x38d),_0x231f54(0x4eb),'ATTN',_0x231f54(0x481),_0x231f54(0x2eb),'EREOF',_0x231f54(0x1ad),_0x231f54(0x7bf),'',_0x231f54(0x1aa),_0x231f54(0x411),''],TextManager[_0x231f54(0x7d9)]=VisuMZ[_0x231f54(0x703)][_0x231f54(0x200)][_0x231f54(0x859)][_0x231f54(0x6d2)],TextManager[_0x231f54(0x746)]=VisuMZ[_0x231f54(0x703)][_0x231f54(0x200)][_0x231f54(0x859)]['CancelText'],TextManager['buttonAssistSwitch']=VisuMZ[_0x231f54(0x703)][_0x231f54(0x200)][_0x231f54(0x859)][_0x231f54(0x5e2)],VisuMZ[_0x231f54(0x703)][_0x231f54(0x539)]=TextManager[_0x231f54(0x87d)],TextManager[_0x231f54(0x87d)]=function(_0x1448b8){const _0x3fc758=_0x231f54;return typeof _0x1448b8===_0x3fc758(0x835)?VisuMZ[_0x3fc758(0x703)][_0x3fc758(0x539)][_0x3fc758(0x690)](this,_0x1448b8):this[_0x3fc758(0x196)](_0x1448b8);},TextManager[_0x231f54(0x196)]=function(_0x23eb7){const _0x2c2bca=_0x231f54;_0x23eb7=String(_0x23eb7||'')['toUpperCase']();const _0x4d0993=VisuMZ[_0x2c2bca(0x703)][_0x2c2bca(0x200)][_0x2c2bca(0x502)];if(_0x23eb7==='MAXHP')return $dataSystem[_0x2c2bca(0x76b)][_0x2c2bca(0x2bc)][0x0];if(_0x23eb7===_0x2c2bca(0x702))return $dataSystem[_0x2c2bca(0x76b)][_0x2c2bca(0x2bc)][0x1];if(_0x23eb7===_0x2c2bca(0x590))return $dataSystem[_0x2c2bca(0x76b)][_0x2c2bca(0x2bc)][0x2];if(_0x23eb7===_0x2c2bca(0x5bb))return $dataSystem['terms']['params'][0x3];if(_0x23eb7===_0x2c2bca(0x7be))return $dataSystem[_0x2c2bca(0x76b)][_0x2c2bca(0x2bc)][0x4];if(_0x23eb7===_0x2c2bca(0x4b1))return $dataSystem['terms'][_0x2c2bca(0x2bc)][0x5];if(_0x23eb7===_0x2c2bca(0x778))return $dataSystem[_0x2c2bca(0x76b)][_0x2c2bca(0x2bc)][0x6];if(_0x23eb7===_0x2c2bca(0x867))return $dataSystem[_0x2c2bca(0x76b)][_0x2c2bca(0x2bc)][0x7];if(_0x23eb7===_0x2c2bca(0x67a))return _0x4d0993[_0x2c2bca(0x563)];if(_0x23eb7===_0x2c2bca(0x3eb))return _0x4d0993['XParamVocab1'];if(_0x23eb7===_0x2c2bca(0x875))return _0x4d0993['XParamVocab2'];if(_0x23eb7===_0x2c2bca(0x620))return _0x4d0993[_0x2c2bca(0x82b)];if(_0x23eb7==='MEV')return _0x4d0993[_0x2c2bca(0x71d)];if(_0x23eb7==='MRF')return _0x4d0993[_0x2c2bca(0x656)];if(_0x23eb7==='CNT')return _0x4d0993[_0x2c2bca(0x5c1)];if(_0x23eb7==='HRG')return _0x4d0993[_0x2c2bca(0x537)];if(_0x23eb7===_0x2c2bca(0x716))return _0x4d0993[_0x2c2bca(0x4c7)];if(_0x23eb7===_0x2c2bca(0x6b2))return _0x4d0993[_0x2c2bca(0x2ce)];if(_0x23eb7==='TGR')return _0x4d0993['SParamVocab0'];if(_0x23eb7===_0x2c2bca(0x3bc))return _0x4d0993[_0x2c2bca(0x4bb)];if(_0x23eb7===_0x2c2bca(0x50e))return _0x4d0993['SParamVocab2'];if(_0x23eb7===_0x2c2bca(0x543))return _0x4d0993[_0x2c2bca(0x4d2)];if(_0x23eb7===_0x2c2bca(0x202))return _0x4d0993[_0x2c2bca(0x88c)];if(_0x23eb7==='TCR')return _0x4d0993[_0x2c2bca(0x2e6)];if(_0x23eb7==='PDR')return _0x4d0993[_0x2c2bca(0x621)];if(_0x23eb7===_0x2c2bca(0x7df))return _0x4d0993[_0x2c2bca(0x278)];if(_0x23eb7==='FDR')return _0x4d0993[_0x2c2bca(0x4c5)];if(_0x23eb7===_0x2c2bca(0x23a))return _0x4d0993[_0x2c2bca(0x825)];if(VisuMZ['CoreEngine'][_0x2c2bca(0x881)][_0x23eb7])return VisuMZ[_0x2c2bca(0x703)][_0x2c2bca(0x881)][_0x23eb7];return'';},TextManager[_0x231f54(0x6a8)]=function(_0x287d64){const _0x28201f=_0x231f54;if(_0x287d64===_0x28201f(0x557))_0x287d64=_0x28201f(0x649);let _0x553861=[];for(let _0x389761 in Input[_0x28201f(0x85b)]){_0x389761=Number(_0x389761);if(_0x389761>=0x60&&_0x389761<=0x69)continue;if([0x12,0x20][_0x28201f(0x36f)](_0x389761))continue;if(_0x287d64===Input['keyMapper'][_0x389761]){if(_0x28201f(0x442)!==_0x28201f(0x442)){function _0x398cb8(){const _0x1d4966=_0x28201f;return _0x4db7b1[_0x1d4966(0x703)][_0x1d4966(0x200)][_0x1d4966(0x860)][_0x1d4966(0x3ef)];}}else _0x553861[_0x28201f(0x616)](_0x389761);}}for(let _0x471688=0x0;_0x471688<_0x553861[_0x28201f(0x533)];_0x471688++){_0x553861[_0x471688]=TextManager[_0x28201f(0x1cb)][_0x553861[_0x471688]];}return this[_0x28201f(0x4cf)](_0x553861);},TextManager['makeInputButtonString']=function(_0x457350){const _0x2a18d5=_0x231f54,_0xd9dce4=VisuMZ[_0x2a18d5(0x703)][_0x2a18d5(0x200)]['ButtonAssist'],_0x1feaaa=_0xd9dce4['KeyUnlisted'],_0x34c454=_0x457350[_0x2a18d5(0x887)](),_0x27ee46='Key%1'[_0x2a18d5(0x333)](_0x34c454);return _0xd9dce4[_0x27ee46]?_0xd9dce4[_0x27ee46]:_0x1feaaa[_0x2a18d5(0x333)](_0x34c454);},TextManager[_0x231f54(0x6a3)]=function(_0xe8c2d0,_0x3e48e7){const _0x12f2e6=_0x231f54,_0x111e69=VisuMZ[_0x12f2e6(0x703)][_0x12f2e6(0x200)]['ButtonAssist'],_0x56a430=_0x111e69['MultiKeyFmt'],_0x9a8e17=this[_0x12f2e6(0x6a8)](_0xe8c2d0),_0x2e2a76=this[_0x12f2e6(0x6a8)](_0x3e48e7);return _0x56a430[_0x12f2e6(0x333)](_0x9a8e17,_0x2e2a76);},VisuMZ[_0x231f54(0x703)][_0x231f54(0x41b)]=ColorManager[_0x231f54(0x731)],ColorManager[_0x231f54(0x731)]=function(){const _0x5e3691=_0x231f54;VisuMZ[_0x5e3691(0x703)]['ColorManager_loadWindowskin']['call'](this),this['_colorCache']=this[_0x5e3691(0x4d5)]||{};},ColorManager[_0x231f54(0x890)]=function(_0x265726,_0x18fd2e){const _0x3f7f5f=_0x231f54;_0x18fd2e=String(_0x18fd2e),this[_0x3f7f5f(0x4d5)]=this[_0x3f7f5f(0x4d5)]||{};if(_0x18fd2e[_0x3f7f5f(0x612)](/#(.*)/i))this['_colorCache'][_0x265726]=_0x3f7f5f(0x743)[_0x3f7f5f(0x333)](String(RegExp['$1']));else{if(_0x3f7f5f(0x39e)===_0x3f7f5f(0x88d)){function _0xf40ae3(){const _0x5169c8=_0x3f7f5f;if(_0x2be442&&_0xe4529e[_0x5169c8(0x5bf)])return!![];}}else this[_0x3f7f5f(0x4d5)][_0x265726]=this['textColor'](Number(_0x18fd2e));}return this[_0x3f7f5f(0x4d5)][_0x265726];},ColorManager[_0x231f54(0x3d3)]=function(_0x5ad1d6){const _0x2394df=_0x231f54;return _0x5ad1d6=String(_0x5ad1d6),_0x5ad1d6[_0x2394df(0x612)](/#(.*)/i)?'#%1'[_0x2394df(0x333)](String(RegExp['$1'])):this[_0x2394df(0x275)](Number(_0x5ad1d6));},ColorManager[_0x231f54(0x81a)]=function(){const _0x18f8c2=_0x231f54;this[_0x18f8c2(0x4d5)]={};},ColorManager[_0x231f54(0x846)]=function(){const _0x47dc9a=_0x231f54,_0x3e5634=_0x47dc9a(0x567);this[_0x47dc9a(0x4d5)]=this[_0x47dc9a(0x4d5)]||{};if(this['_colorCache'][_0x3e5634])return this[_0x47dc9a(0x4d5)][_0x3e5634];const _0x4c11c0=VisuMZ[_0x47dc9a(0x703)][_0x47dc9a(0x200)][_0x47dc9a(0x2f5)]['ColorNormal'];return this[_0x47dc9a(0x890)](_0x3e5634,_0x4c11c0);},ColorManager[_0x231f54(0x739)]=function(){const _0x8abee0=_0x231f54,_0x232d36='_stored_systemColor';this[_0x8abee0(0x4d5)]=this['_colorCache']||{};if(this[_0x8abee0(0x4d5)][_0x232d36])return this[_0x8abee0(0x4d5)][_0x232d36];const _0x4c52f3=VisuMZ[_0x8abee0(0x703)][_0x8abee0(0x200)]['Color'][_0x8abee0(0x851)];return this[_0x8abee0(0x890)](_0x232d36,_0x4c52f3);},ColorManager['crisisColor']=function(){const _0x578b0e=_0x231f54,_0xe11e9a='_stored_crisisColor';this[_0x578b0e(0x4d5)]=this[_0x578b0e(0x4d5)]||{};if(this[_0x578b0e(0x4d5)][_0xe11e9a])return this['_colorCache'][_0xe11e9a];const _0x215c13=VisuMZ['CoreEngine'][_0x578b0e(0x200)]['Color']['ColorCrisis'];return this[_0x578b0e(0x890)](_0xe11e9a,_0x215c13);},ColorManager[_0x231f54(0x749)]=function(){const _0x4f79a6=_0x231f54,_0xe5ac2=_0x4f79a6(0x650);this[_0x4f79a6(0x4d5)]=this[_0x4f79a6(0x4d5)]||{};if(this[_0x4f79a6(0x4d5)][_0xe5ac2])return this[_0x4f79a6(0x4d5)][_0xe5ac2];const _0x2be95a=VisuMZ[_0x4f79a6(0x703)][_0x4f79a6(0x200)]['Color'][_0x4f79a6(0x658)];return this[_0x4f79a6(0x890)](_0xe5ac2,_0x2be95a);},ColorManager[_0x231f54(0x6f2)]=function(){const _0x5b8aab=_0x231f54,_0x4ce91a='_stored_gaugeBackColor';this[_0x5b8aab(0x4d5)]=this['_colorCache']||{};if(this[_0x5b8aab(0x4d5)][_0x4ce91a])return this[_0x5b8aab(0x4d5)][_0x4ce91a];const _0x138098=VisuMZ[_0x5b8aab(0x703)][_0x5b8aab(0x200)][_0x5b8aab(0x2f5)][_0x5b8aab(0x880)];return this['getColorDataFromPluginParameters'](_0x4ce91a,_0x138098);},ColorManager[_0x231f54(0x54a)]=function(){const _0x55f643=_0x231f54,_0x48f127=_0x55f643(0x4e7);this['_colorCache']=this[_0x55f643(0x4d5)]||{};if(this[_0x55f643(0x4d5)][_0x48f127])return this[_0x55f643(0x4d5)][_0x48f127];const _0x1162f5=VisuMZ['CoreEngine'][_0x55f643(0x200)][_0x55f643(0x2f5)][_0x55f643(0x700)];return this['getColorDataFromPluginParameters'](_0x48f127,_0x1162f5);},ColorManager[_0x231f54(0x41e)]=function(){const _0x31d77d=_0x231f54,_0x1475dd='_stored_hpGaugeColor2';this[_0x31d77d(0x4d5)]=this['_colorCache']||{};if(this[_0x31d77d(0x4d5)][_0x1475dd])return this['_colorCache'][_0x1475dd];const _0x5bf2b2=VisuMZ['CoreEngine'][_0x31d77d(0x200)][_0x31d77d(0x2f5)][_0x31d77d(0x2d7)];return this[_0x31d77d(0x890)](_0x1475dd,_0x5bf2b2);},ColorManager['mpGaugeColor1']=function(){const _0x377894=_0x231f54,_0x303bc0=_0x377894(0x3aa);this[_0x377894(0x4d5)]=this[_0x377894(0x4d5)]||{};if(this[_0x377894(0x4d5)][_0x303bc0])return this['_colorCache'][_0x303bc0];const _0x2ea3f7=VisuMZ[_0x377894(0x703)][_0x377894(0x200)][_0x377894(0x2f5)][_0x377894(0x721)];return this[_0x377894(0x890)](_0x303bc0,_0x2ea3f7);},ColorManager[_0x231f54(0x51d)]=function(){const _0x50ee8d=_0x231f54,_0x5b6d80='_stored_mpGaugeColor2';this[_0x50ee8d(0x4d5)]=this[_0x50ee8d(0x4d5)]||{};if(this[_0x50ee8d(0x4d5)][_0x5b6d80])return this[_0x50ee8d(0x4d5)][_0x5b6d80];const _0x134f03=VisuMZ['CoreEngine']['Settings'][_0x50ee8d(0x2f5)]['ColorMPGauge2'];return this[_0x50ee8d(0x890)](_0x5b6d80,_0x134f03);},ColorManager['mpCostColor']=function(){const _0x3fd0b0=_0x231f54,_0x131d2a=_0x3fd0b0(0x43a);this[_0x3fd0b0(0x4d5)]=this[_0x3fd0b0(0x4d5)]||{};if(this[_0x3fd0b0(0x4d5)][_0x131d2a])return this[_0x3fd0b0(0x4d5)][_0x131d2a];const _0x1bbffd=VisuMZ[_0x3fd0b0(0x703)][_0x3fd0b0(0x200)][_0x3fd0b0(0x2f5)]['ColorMPCost'];return this[_0x3fd0b0(0x890)](_0x131d2a,_0x1bbffd);},ColorManager[_0x231f54(0x305)]=function(){const _0x3136a8=_0x231f54,_0x350b82='_stored_powerUpColor';this[_0x3136a8(0x4d5)]=this[_0x3136a8(0x4d5)]||{};if(this[_0x3136a8(0x4d5)][_0x350b82])return this['_colorCache'][_0x350b82];const _0x2b1de6=VisuMZ[_0x3136a8(0x703)]['Settings'][_0x3136a8(0x2f5)][_0x3136a8(0x757)];return this['getColorDataFromPluginParameters'](_0x350b82,_0x2b1de6);},ColorManager['powerDownColor']=function(){const _0x496bf2=_0x231f54,_0x20e994='_stored_powerDownColor';this['_colorCache']=this[_0x496bf2(0x4d5)]||{};if(this['_colorCache'][_0x20e994])return this[_0x496bf2(0x4d5)][_0x20e994];const _0x3a4983=VisuMZ[_0x496bf2(0x703)][_0x496bf2(0x200)][_0x496bf2(0x2f5)][_0x496bf2(0x767)];return this['getColorDataFromPluginParameters'](_0x20e994,_0x3a4983);},ColorManager[_0x231f54(0x2ca)]=function(){const _0xa2da5a=_0x231f54,_0x175225=_0xa2da5a(0x6f8);this[_0xa2da5a(0x4d5)]=this[_0xa2da5a(0x4d5)]||{};if(this[_0xa2da5a(0x4d5)][_0x175225])return this[_0xa2da5a(0x4d5)][_0x175225];const _0x449285=VisuMZ[_0xa2da5a(0x703)][_0xa2da5a(0x200)][_0xa2da5a(0x2f5)][_0xa2da5a(0x7b4)];return this[_0xa2da5a(0x890)](_0x175225,_0x449285);},ColorManager[_0x231f54(0x211)]=function(){const _0x517dc8=_0x231f54,_0x2a71f=_0x517dc8(0x586);this['_colorCache']=this[_0x517dc8(0x4d5)]||{};if(this['_colorCache'][_0x2a71f])return this[_0x517dc8(0x4d5)][_0x2a71f];const _0x5597d3=VisuMZ[_0x517dc8(0x703)]['Settings'][_0x517dc8(0x2f5)][_0x517dc8(0x785)];return this[_0x517dc8(0x890)](_0x2a71f,_0x5597d3);},ColorManager[_0x231f54(0x324)]=function(){const _0x4e82c6=_0x231f54,_0x37dba7=_0x4e82c6(0x30e);this['_colorCache']=this[_0x4e82c6(0x4d5)]||{};if(this[_0x4e82c6(0x4d5)][_0x37dba7])return this['_colorCache'][_0x37dba7];const _0x4bf572=VisuMZ['CoreEngine'][_0x4e82c6(0x200)][_0x4e82c6(0x2f5)]['ColorTPGauge1'];return this[_0x4e82c6(0x890)](_0x37dba7,_0x4bf572);},ColorManager[_0x231f54(0x2f3)]=function(){const _0x16d513=_0x231f54,_0x3ca9c4=_0x16d513(0x26e);this[_0x16d513(0x4d5)]=this[_0x16d513(0x4d5)]||{};if(this[_0x16d513(0x4d5)][_0x3ca9c4])return this[_0x16d513(0x4d5)][_0x3ca9c4];const _0x16cac8=VisuMZ['CoreEngine'][_0x16d513(0x200)][_0x16d513(0x2f5)][_0x16d513(0x2cc)];return this['getColorDataFromPluginParameters'](_0x3ca9c4,_0x16cac8);},ColorManager[_0x231f54(0x4a1)]=function(){const _0x409bde=_0x231f54,_0x602942='_stored_tpCostColor';this['_colorCache']=this[_0x409bde(0x4d5)]||{};if(this['_colorCache'][_0x602942])return this[_0x409bde(0x4d5)][_0x602942];const _0x175f57=VisuMZ[_0x409bde(0x703)][_0x409bde(0x200)][_0x409bde(0x2f5)][_0x409bde(0x528)];return this[_0x409bde(0x890)](_0x602942,_0x175f57);},ColorManager[_0x231f54(0x57e)]=function(){const _0x4ab0d0=_0x231f54,_0x2beb9b='_stored_pendingColor';this['_colorCache']=this[_0x4ab0d0(0x4d5)]||{};if(this[_0x4ab0d0(0x4d5)][_0x2beb9b])return this[_0x4ab0d0(0x4d5)][_0x2beb9b];const _0x106a03=VisuMZ['CoreEngine'][_0x4ab0d0(0x200)][_0x4ab0d0(0x2f5)][_0x4ab0d0(0x528)];return this['getColorDataFromPluginParameters'](_0x2beb9b,_0x106a03);},ColorManager['expGaugeColor1']=function(){const _0x167f94=_0x231f54,_0x5c391c='_stored_expGaugeColor1';this['_colorCache']=this[_0x167f94(0x4d5)]||{};if(this[_0x167f94(0x4d5)][_0x5c391c])return this[_0x167f94(0x4d5)][_0x5c391c];const _0x550f2e=VisuMZ[_0x167f94(0x703)][_0x167f94(0x200)][_0x167f94(0x2f5)][_0x167f94(0x70d)];return this[_0x167f94(0x890)](_0x5c391c,_0x550f2e);},ColorManager[_0x231f54(0x879)]=function(){const _0x4cc058=_0x231f54,_0x3bc990=_0x4cc058(0x3de);this[_0x4cc058(0x4d5)]=this[_0x4cc058(0x4d5)]||{};if(this[_0x4cc058(0x4d5)][_0x3bc990])return this[_0x4cc058(0x4d5)][_0x3bc990];const _0x57a16d=VisuMZ[_0x4cc058(0x703)][_0x4cc058(0x200)][_0x4cc058(0x2f5)][_0x4cc058(0x877)];return this[_0x4cc058(0x890)](_0x3bc990,_0x57a16d);},ColorManager[_0x231f54(0x4c2)]=function(){const _0x473fa5=_0x231f54,_0x2dee7f=_0x473fa5(0x214);this[_0x473fa5(0x4d5)]=this['_colorCache']||{};if(this[_0x473fa5(0x4d5)][_0x2dee7f])return this[_0x473fa5(0x4d5)][_0x2dee7f];const _0x2c0614=VisuMZ[_0x473fa5(0x703)]['Settings'][_0x473fa5(0x2f5)]['ColorMaxLvGauge1'];return this[_0x473fa5(0x890)](_0x2dee7f,_0x2c0614);},ColorManager['maxLvGaugeColor2']=function(){const _0x465269=_0x231f54,_0x4150fd='_stored_maxLvGaugeColor2';this[_0x465269(0x4d5)]=this['_colorCache']||{};if(this[_0x465269(0x4d5)][_0x4150fd])return this['_colorCache'][_0x4150fd];const _0x5950f3=VisuMZ[_0x465269(0x703)][_0x465269(0x200)]['Color'][_0x465269(0x27a)];return this[_0x465269(0x890)](_0x4150fd,_0x5950f3);},ColorManager['hpColor']=function(_0x55cc32){const _0x4cdaa1=_0x231f54;return VisuMZ[_0x4cdaa1(0x703)][_0x4cdaa1(0x200)][_0x4cdaa1(0x2f5)][_0x4cdaa1(0x551)][_0x4cdaa1(0x690)](this,_0x55cc32);},ColorManager['mpColor']=function(_0x1ace92){const _0xb5d0ad=_0x231f54;return VisuMZ['CoreEngine'][_0xb5d0ad(0x200)][_0xb5d0ad(0x2f5)][_0xb5d0ad(0x655)][_0xb5d0ad(0x690)](this,_0x1ace92);},ColorManager[_0x231f54(0x62e)]=function(_0x25d2dc){const _0x223fc6=_0x231f54;return VisuMZ[_0x223fc6(0x703)][_0x223fc6(0x200)][_0x223fc6(0x2f5)][_0x223fc6(0x790)]['call'](this,_0x25d2dc);},ColorManager[_0x231f54(0x33e)]=function(_0x5c9979){const _0x29c621=_0x231f54;return VisuMZ[_0x29c621(0x703)][_0x29c621(0x200)][_0x29c621(0x2f5)][_0x29c621(0x75e)]['call'](this,_0x5c9979);},ColorManager['damageColor']=function(_0x21bf2f){const _0x28864c=_0x231f54;return VisuMZ[_0x28864c(0x703)]['Settings'][_0x28864c(0x2f5)][_0x28864c(0x822)][_0x28864c(0x690)](this,_0x21bf2f);},ColorManager['outlineColor']=function(){const _0x599664=_0x231f54;return VisuMZ[_0x599664(0x703)]['Settings'][_0x599664(0x2f5)][_0x599664(0x727)];},ColorManager[_0x231f54(0x1a4)]=function(){const _0x2f9abb=_0x231f54;return VisuMZ[_0x2f9abb(0x703)]['Settings']['Color'][_0x2f9abb(0x5b2)]||'rgba(0,\x200,\x200,\x200.7)';},ColorManager[_0x231f54(0x2a0)]=function(){const _0xc21370=_0x231f54;return VisuMZ['CoreEngine'][_0xc21370(0x200)][_0xc21370(0x2f5)][_0xc21370(0x2a3)]||_0xc21370(0x6c6);},ColorManager['dimColor1']=function(){const _0xef47ff=_0x231f54;return VisuMZ['CoreEngine'][_0xef47ff(0x200)][_0xef47ff(0x2f5)]['DimColor1'];},ColorManager[_0x231f54(0x30c)]=function(){const _0x3616ba=_0x231f54;return VisuMZ[_0x3616ba(0x703)][_0x3616ba(0x200)][_0x3616ba(0x2f5)][_0x3616ba(0x6d4)];},ColorManager[_0x231f54(0x231)]=function(){const _0x2ca194=_0x231f54;return VisuMZ['CoreEngine'][_0x2ca194(0x200)][_0x2ca194(0x2f5)]['ItemBackColor1'];},ColorManager[_0x231f54(0x737)]=function(){const _0x31b1a1=_0x231f54;return VisuMZ[_0x31b1a1(0x703)]['Settings']['Color'][_0x31b1a1(0x7b2)];},SceneManager[_0x231f54(0x57f)]=[],VisuMZ[_0x231f54(0x703)][_0x231f54(0x380)]=SceneManager['initialize'],SceneManager[_0x231f54(0x2b6)]=function(){const _0x597a31=_0x231f54;VisuMZ['CoreEngine']['SceneManager_initialize'][_0x597a31(0x690)](this),this[_0x597a31(0x401)]();},VisuMZ[_0x231f54(0x703)][_0x231f54(0x7fc)]=SceneManager[_0x231f54(0x689)],SceneManager[_0x231f54(0x689)]=function(_0x2da463){const _0x2ef550=_0x231f54;if($gameTemp)this[_0x2ef550(0x4fa)](_0x2da463);VisuMZ[_0x2ef550(0x703)]['SceneManager_onKeyDown'][_0x2ef550(0x690)](this,_0x2da463);},SceneManager[_0x231f54(0x4fa)]=function(_0x8093dc){const _0x5c06eb=_0x231f54;if(!_0x8093dc[_0x5c06eb(0x5b6)]&&!_0x8093dc[_0x5c06eb(0x2c8)]){if(_0x5c06eb(0x84c)===_0x5c06eb(0x404)){function _0x3ac604(){const _0x548561=_0x5c06eb;this[_0x548561(0x4d5)]={};}}else switch(_0x8093dc[_0x5c06eb(0x893)]){case 0x75:this[_0x5c06eb(0x47e)]();break;case 0x76:if(Input['isPressed'](_0x5c06eb(0x5e8))||Input[_0x5c06eb(0x64b)](_0x5c06eb(0x5ee)))return;this['playTestF7']();break;}}},SceneManager[_0x231f54(0x47e)]=function(){const _0x19e580=_0x231f54;if($gameTemp[_0x19e580(0x841)]()&&VisuMZ[_0x19e580(0x703)][_0x19e580(0x200)]['QoL'][_0x19e580(0x52e)]){if(_0x19e580(0x840)!==_0x19e580(0x2ff)){if(ConfigManager['seVolume']!==0x0){if(_0x19e580(0x1a2)===_0x19e580(0x2bf)){function _0x41f5e1(){const _0x3d1930=_0x19e580;if(!this[_0x3d1930(0x69b)])return![];return _0xd11eea[_0x3d1930(0x703)][_0x3d1930(0x200)][_0x3d1930(0x7d2)]['EnableNameInput'];}}else ConfigManager[_0x19e580(0x843)]=0x0,ConfigManager[_0x19e580(0x2da)]=0x0,ConfigManager[_0x19e580(0x611)]=0x0,ConfigManager[_0x19e580(0x4ed)]=0x0;}else{if(_0x19e580(0x27b)===_0x19e580(0x27b))ConfigManager[_0x19e580(0x843)]=0x64,ConfigManager[_0x19e580(0x2da)]=0x64,ConfigManager['meVolume']=0x64,ConfigManager['seVolume']=0x64;else{function _0x52f485(){const _0x355c31=_0x19e580;_0x35d0f3[_0x355c31(0x703)][_0x355c31(0x334)]['call'](this);if(this['_gamepadWait'])this[_0x355c31(0x416)]--;}}}ConfigManager[_0x19e580(0x77e)]();if(this[_0x19e580(0x80a)][_0x19e580(0x1a5)]===Scene_Options){if(this['_scene']['_optionsWindow'])this['_scene'][_0x19e580(0x31d)]['refresh']();if(this[_0x19e580(0x80a)][_0x19e580(0x330)])this[_0x19e580(0x80a)][_0x19e580(0x330)][_0x19e580(0x1c4)]();}}else{function _0x510d7f(){const _0x3032e1=_0x19e580;return _0x445350[_0x3032e1(0x807)][_0x3032e1(0x315)][_0x3032e1(0x690)](this);}}}},SceneManager['playTestF7']=function(){const _0x5aad88=_0x231f54;if($gameTemp[_0x5aad88(0x841)]()&&VisuMZ[_0x5aad88(0x703)][_0x5aad88(0x200)]['QoL'][_0x5aad88(0x476)]){if(_0x5aad88(0x1a1)==='HIoAQ')$gameTemp['_playTestFastMode']=!$gameTemp[_0x5aad88(0x5ed)];else{function _0x3594f5(){const _0x3373b5=_0x5aad88;this['_categoryWindow'][_0x3373b5(0x669)](_0x55e294[_0x3373b5(0x807)][_0x3373b5(0x5de)]);}}}},SceneManager[_0x231f54(0x401)]=function(){const _0xf05a00=_0x231f54;this['_sideButtonLayout']=![],this['_hideButtons']=!VisuMZ[_0xf05a00(0x703)][_0xf05a00(0x200)]['UI']['ShowButtons'];},SceneManager[_0x231f54(0x4ca)]=function(_0x440d6f){const _0x367ae7=_0x231f54;VisuMZ['CoreEngine'][_0x367ae7(0x200)]['UI'][_0x367ae7(0x377)]&&(this[_0x367ae7(0x1cd)]=_0x440d6f);},SceneManager[_0x231f54(0x617)]=function(){const _0x1f4223=_0x231f54;return this[_0x1f4223(0x1cd)];},SceneManager[_0x231f54(0x1ee)]=function(){const _0x18c6c6=_0x231f54;return this[_0x18c6c6(0x71f)];},SceneManager[_0x231f54(0x18d)]=function(){const _0x3e980c=_0x231f54;return this[_0x3e980c(0x1ee)]()||this['isSideButtonLayout']();},VisuMZ[_0x231f54(0x703)][_0x231f54(0x60e)]=SceneManager[_0x231f54(0x871)],SceneManager['isGameActive']=function(){const _0x38e302=_0x231f54;if(VisuMZ[_0x38e302(0x703)][_0x38e302(0x200)][_0x38e302(0x4ec)]['RequireFocus']){if(_0x38e302(0x7cb)==='IXIjc'){function _0x5816e5(){const _0x240a01=_0x38e302;this[_0x240a01(0x7ec)]();}}else return VisuMZ[_0x38e302(0x703)][_0x38e302(0x60e)]['call'](this);}else return!![];},SceneManager[_0x231f54(0x75d)]=function(_0x301a84){const _0x325a6a=_0x231f54;if(_0x301a84 instanceof Error)this[_0x325a6a(0x486)](_0x301a84);else _0x301a84 instanceof Array&&_0x301a84[0x0]===_0x325a6a(0x67e)?this[_0x325a6a(0x3ba)](_0x301a84):this[_0x325a6a(0x6df)](_0x301a84);this[_0x325a6a(0x5b1)]();},VisuMZ['CoreEngine']['BattleManager_processEscape']=BattleManager[_0x231f54(0x7e3)],BattleManager[_0x231f54(0x7e3)]=function(){const _0x571c42=_0x231f54;if(VisuMZ[_0x571c42(0x703)][_0x571c42(0x200)]['QoL'][_0x571c42(0x87c)])this[_0x571c42(0x7bd)]();else return VisuMZ['CoreEngine'][_0x571c42(0x27e)][_0x571c42(0x690)](this);},BattleManager['processAlwaysEscape']=function(){const _0x55c545=_0x231f54;return $gameParty[_0x55c545(0x7da)](),SoundManager[_0x55c545(0x85f)](),this[_0x55c545(0x489)](),!![];},BattleManager[_0x231f54(0x6a0)]=function(){const _0x2783e2=_0x231f54;return $gameSystem[_0x2783e2(0x72f)]()>=0x1;},BattleManager['isActiveTpb']=function(){const _0x5dac1b=_0x231f54;return $gameSystem[_0x5dac1b(0x72f)]()===0x1;},VisuMZ['CoreEngine'][_0x231f54(0x61b)]=Game_Temp[_0x231f54(0x3fc)]['initialize'],Game_Temp['prototype'][_0x231f54(0x2b6)]=function(){const _0x4466cf=_0x231f54;VisuMZ[_0x4466cf(0x703)][_0x4466cf(0x61b)][_0x4466cf(0x690)](this),this[_0x4466cf(0x38a)](),this[_0x4466cf(0x766)]();},Game_Temp['prototype'][_0x231f54(0x38a)]=function(){const _0x31ef5d=_0x231f54;if(VisuMZ[_0x31ef5d(0x703)][_0x31ef5d(0x200)]['QoL'][_0x31ef5d(0x37b)]){if(_0x31ef5d(0x5dd)!==_0x31ef5d(0x7cc))this[_0x31ef5d(0x56d)]=![];else{function _0x341e72(){const _0x34fe1c=_0x31ef5d;_0x5c2d39[_0x34fe1c(0x703)][_0x34fe1c(0x583)][_0x34fe1c(0x690)](this),this[_0x34fe1c(0x85e)]();}}}},Game_Temp[_0x231f54(0x3fc)][_0x231f54(0x766)]=function(){const _0x14acea=_0x231f54;this[_0x14acea(0x718)]=[];},Game_Temp[_0x231f54(0x3fc)][_0x231f54(0x46d)]=function(_0x57b5b8,_0x540a16,_0x2e6904,_0x44df48){const _0x3986da=_0x231f54;if(!this[_0x3986da(0x724)]())return;_0x2e6904=_0x2e6904||![],_0x44df48=_0x44df48||![];if($dataAnimations[_0x540a16]){const _0x555d24={'targets':_0x57b5b8,'animationId':_0x540a16,'mirror':_0x2e6904,'mute':_0x44df48};this[_0x3986da(0x718)][_0x3986da(0x616)](_0x555d24);for(const _0x45f8fc of _0x57b5b8){if(_0x45f8fc[_0x3986da(0x82e)]){if(_0x3986da(0x3e0)!=='GuFhv'){function _0x236988(){const _0x4f4570=_0x3986da,_0x4ca8eb=this['currentClass']()[_0x4f4570(0x2bc)][_0x2eaa28][0x63],_0xf71592=this['currentClass']()['params'][_0x3fb9c4][0x62];return _0x4ca8eb+(_0x4ca8eb-_0xf71592)*(this['level']-0x63);}}else _0x45f8fc[_0x3986da(0x82e)]();}}}},Game_Temp[_0x231f54(0x3fc)][_0x231f54(0x724)]=function(){return!![];},Game_Temp[_0x231f54(0x3fc)]['retrieveFauxAnimation']=function(){const _0x4da3a6=_0x231f54;return this[_0x4da3a6(0x718)][_0x4da3a6(0x5e8)]();},Game_Temp[_0x231f54(0x3fc)][_0x231f54(0x573)]=function(_0x453923){const _0x4837c0=_0x231f54;this[_0x4837c0(0x88e)]=_0x453923;},Game_Temp[_0x231f54(0x3fc)][_0x231f54(0x892)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x231f54(0x3fc)][_0x231f54(0x783)]=function(){const _0x28408c=_0x231f54;this[_0x28408c(0x2e1)]=undefined,this['_forcedBattleSys']=undefined;},Game_Temp[_0x231f54(0x3fc)][_0x231f54(0x3e2)]=function(_0x365724){const _0x171e6e=_0x231f54;$gameMap&&$dataMap&&$dataMap['note']&&this[_0x171e6e(0x4ab)]($dataMap['note']);const _0x2ad073=$dataTroops[_0x365724];if(_0x2ad073){if(_0x171e6e(0x26b)!=='ZrBfQ')this[_0x171e6e(0x4ab)](_0x2ad073[_0x171e6e(0x271)]);else{function _0x58b8a2(){const _0x43a9dc=_0x171e6e;_0x2def48[_0x43a9dc(0x3f1)](_0x4d0d42,_0x5b97a8);const _0x1bdf4a=_0x529a6d['URL'];_0x32b4e7[_0x43a9dc(0x84e)](_0x1bdf4a);}}}},Game_Temp[_0x231f54(0x3fc)][_0x231f54(0x4ab)]=function(_0x270c17){const _0x35ca29=_0x231f54;if(!_0x270c17)return;if(_0x270c17[_0x35ca29(0x612)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i)){if(_0x35ca29(0x736)===_0x35ca29(0x736))this[_0x35ca29(0x2e1)]='FV';else{function _0x2f2547(){const _0xab8351=_0x35ca29;return _0xab8351(0x451);}}}else{if(_0x270c17[_0x35ca29(0x612)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i)){if(_0x35ca29(0x194)===_0x35ca29(0x194))this[_0x35ca29(0x2e1)]='SV';else{function _0x53bf1a(){const _0x55c7e4=_0x35ca29;return _0x2c6e60['CoreEngine'][_0x55c7e4(0x200)]['MenuLayout'][_0x55c7e4(0x45a)]['CommandRect'][_0x55c7e4(0x690)](this);}}}else{if(_0x270c17[_0x35ca29(0x612)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x1746ec=String(RegExp['$1']);if(_0x1746ec[_0x35ca29(0x612)](/(?:FRONTVIEW|FRONT VIEW|FV)/i)){if(_0x35ca29(0x67f)!==_0x35ca29(0x282))this[_0x35ca29(0x2e1)]='FV';else{function _0x46eba6(){var _0x111803=_0x2eea05(_0x27f4fe['$1'])/0x64;_0x88ed17+=_0x111803;}}}else _0x1746ec[_0x35ca29(0x612)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x35ca29(0x2e1)]='SV');}}}if(_0x270c17[_0x35ca29(0x612)](/<(?:DTB)>/i))this['_forcedBattleSys']=0x0;else{if(_0x270c17[_0x35ca29(0x612)](/<(?:TPB|ATB)[ ]ACTIVE>/i)){if(_0x35ca29(0x511)!==_0x35ca29(0x340))this[_0x35ca29(0x493)]=0x1;else{function _0x165b44(){const _0x29d958=_0x35ca29;_0x564d88[_0x29d958(0x212)]=![],_0x37e4aa[_0x29d958(0x31a)]=!![];}}}else{if(_0x270c17[_0x35ca29(0x612)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x35ca29(0x493)]=0x2;else{if(_0x270c17[_0x35ca29(0x612)](/<(?:CTB)>/i)){if(_0x35ca29(0x65e)===_0x35ca29(0x1d6)){function _0x1e9b56(){const _0x2f4228=_0x35ca29,_0x3be2c6=_0x434e91[_0x2f4228(0x296)](_0x54bc9f,_0x5a6299)[_0x2f4228(0x717)](_0x2414a2=>_0x2414a2[_0x2f4228(0x475)]());return _0x3be2c6[_0x2f4228(0x533)]>0x0;}}else Imported[_0x35ca29(0x4cd)]&&(this[_0x35ca29(0x493)]=_0x35ca29(0x5e0));}else{if(_0x270c17[_0x35ca29(0x612)](/<(?:STB)>/i))Imported[_0x35ca29(0x882)]&&(this['_forcedBattleSys']=_0x35ca29(0x1c0));else{if(_0x270c17[_0x35ca29(0x612)](/<(?:BTB)>/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0x35ca29(0x493)]='BTB');else{if(_0x270c17[_0x35ca29(0x612)](/<(?:FTB)>/i))Imported[_0x35ca29(0x1ae)]&&(this[_0x35ca29(0x493)]=_0x35ca29(0x63f));else{if(_0x270c17[_0x35ca29(0x612)](/<(?:OTB)>/i))Imported['VisuMZ_2_BattleSystemOTB']&&(this[_0x35ca29(0x493)]='OTB');else{if(_0x270c17[_0x35ca29(0x612)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x35ca29(0x384)!==_0x35ca29(0x36b)){const _0x14c6ae=String(RegExp['$1']);if(_0x14c6ae[_0x35ca29(0x612)](/DTB/i))this[_0x35ca29(0x493)]=0x0;else{if(_0x14c6ae['match'](/(?:TPB|ATB)[ ]ACTIVE/i)){if(_0x35ca29(0x744)===_0x35ca29(0x744))this[_0x35ca29(0x493)]=0x1;else{function _0x242517(){const _0x365e5c=_0x35ca29;_0x167687[_0x365e5c(0x703)][_0x365e5c(0x248)][_0x365e5c(0x690)](this),this[_0x365e5c(0x4e9)](),this['_windowLayer']['x']=_0x115ee1['round'](this['_windowLayer']['x']),this[_0x365e5c(0x389)]['y']=_0xb34964[_0x365e5c(0x64c)](this[_0x365e5c(0x389)]['y']);}}}else{if(_0x14c6ae['match'](/(?:TPB|ATB)[ ]WAIT/i))this['_forcedBattleSys']=0x2;else{if(_0x14c6ae[_0x35ca29(0x612)](/CTB/i)){if(_0x35ca29(0x350)!=='wCwjZ')Imported[_0x35ca29(0x4cd)]&&(this[_0x35ca29(0x493)]='CTB');else{function _0x25bfd6(){return 0x0;}}}else{if(_0x14c6ae[_0x35ca29(0x612)](/STB/i)){if('XXKXq'!==_0x35ca29(0x19b)){function _0x539401(){const _0x1ad70c=_0x35ca29;this[_0x1ad70c(0x2dc)][_0x1ad70c(0x669)](_0x9f8263[_0x1ad70c(0x807)][_0x1ad70c(0x628)]);}}else{if(Imported['VisuMZ_2_BattleSystemSTB']){if(_0x35ca29(0x4f6)!==_0x35ca29(0x264))this[_0x35ca29(0x493)]=_0x35ca29(0x1c0);else{function _0x4d610e(){const _0x46d2b9=_0x35ca29;_0x10d737=_0x166384[_0x46d2b9(0x565)](_0x36dd40,_0x25b983);}}}}}else{if(_0x14c6ae[_0x35ca29(0x612)](/BTB/i)){if(_0x35ca29(0x32f)!==_0x35ca29(0x32f)){function _0x552345(){return-0.5*(_0x5c66ba['sqrt'](0x1-_0x4dfbdc*_0x78e8ee)-0x1);}}else Imported[_0x35ca29(0x78c)]&&(this['_forcedBattleSys']=_0x35ca29(0x221));}else{if(_0x14c6ae[_0x35ca29(0x612)](/FTB/i))Imported[_0x35ca29(0x1ae)]&&(this[_0x35ca29(0x493)]=_0x35ca29(0x63f));else{if(_0x14c6ae[_0x35ca29(0x612)](/OTB/i)){if(Imported[_0x35ca29(0x764)]){if('fWBNX'!==_0x35ca29(0x5cb))this[_0x35ca29(0x493)]=_0x35ca29(0x451);else{function _0x283f28(){const _0xea83e7=_0x35ca29;this[_0xea83e7(0x4ab)](_0x3b9582['name']);}}}}}}}}}}}}else{function _0x4b7609(){const _0x42dd0b=_0x35ca29;_0x33b379['CoreEngine'][_0x42dd0b(0x50a)][_0x42dd0b(0x690)](this,_0x3ab4c8,_0x59b436,_0xe33177),_0x2c2819[_0x42dd0b(0x706)](![]);}}}}}}}}}}}},VisuMZ[_0x231f54(0x703)]['Game_System_initialize']=Game_System['prototype']['initialize'],Game_System[_0x231f54(0x3fc)]['initialize']=function(){const _0x10e90b=_0x231f54;VisuMZ['CoreEngine'][_0x10e90b(0x3ca)][_0x10e90b(0x690)](this),this[_0x10e90b(0x3d8)]();},Game_System[_0x231f54(0x3fc)][_0x231f54(0x3d8)]=function(){const _0x361363=_0x231f54;this[_0x361363(0x653)]={'SideView':$dataSystem[_0x361363(0x4b7)],'BattleSystem':this['initialBattleSystem'](),'FontSize':$dataSystem['advanced'][_0x361363(0x626)],'Padding':0xc};},Game_System[_0x231f54(0x3fc)][_0x231f54(0x694)]=function(){const _0x23054c=_0x231f54;if($gameTemp[_0x23054c(0x2e1)]==='SV'){if(_0x23054c(0x7c3)!==_0x23054c(0x7c3)){function _0x3a844d(){const _0x33d24f=_0x23054c;_0xfb448b[_0x33d24f(0x3b1)](_0x380e00[_0x33d24f(0x70f)],0x0,~0x0),_0x4a9cc1['stencilOp'](_0x5dedb5[_0x33d24f(0x351)],_0x446b4d[_0x33d24f(0x351)],_0xab3a3b[_0x33d24f(0x351)]),_0x193c3f['render'](_0x4cbdcf),_0x650916[_0x33d24f(0x492)]['flush'](),_0x36584a[_0x33d24f(0x7f6)](),_0x6b1536[_0x33d24f(0x3b1)](_0x969f6c[_0x33d24f(0x77c)],0x1,~0x0),_0x31e15e[_0x33d24f(0x467)](_0xb7f10b[_0x33d24f(0x4e1)],_0x13784b[_0x33d24f(0x4e1)],_0x58fa1f[_0x33d24f(0x4e1)]),_0x2301a7[_0x33d24f(0x58a)](_0x6c6fcc[_0x33d24f(0x6bc)],_0x115fe3[_0x33d24f(0x645)]),_0x367d65[_0x33d24f(0x327)](_0xa219d9),_0x45d2bf[_0x33d24f(0x492)]['flush'](),_0x2d10e9[_0x33d24f(0x58a)](_0x2d50c8['ONE'],_0x1c307f['ONE_MINUS_SRC_ALPHA']);}}else return!![];}else{if($gameTemp[_0x23054c(0x2e1)]==='FV'){if(_0x23054c(0x7a4)!=='FHBjo'){function _0x1f9c2e(){const _0x35ad62=_0x23054c;this[_0x35ad62(0x3fe)](),_0x11d60f[_0x35ad62(0x55d)]();}}else return![];}}if(this[_0x23054c(0x653)]===undefined)this[_0x23054c(0x3d8)]();if(this[_0x23054c(0x653)][_0x23054c(0x7e8)]===undefined)this[_0x23054c(0x3d8)]();return this[_0x23054c(0x653)][_0x23054c(0x7e8)];},Game_System[_0x231f54(0x3fc)][_0x231f54(0x768)]=function(_0x38ab1a){const _0xbc3205=_0x231f54;if(this[_0xbc3205(0x653)]===undefined)this['initCoreEngine']();if(this[_0xbc3205(0x653)][_0xbc3205(0x7e8)]===undefined)this['initCoreEngine']();this[_0xbc3205(0x653)][_0xbc3205(0x7e8)]=_0x38ab1a;},Game_System[_0x231f54(0x3fc)][_0x231f54(0x4b6)]=function(){const _0x3978b2=_0x231f54;if(this[_0x3978b2(0x653)]===undefined)this[_0x3978b2(0x3d8)]();this[_0x3978b2(0x653)][_0x3978b2(0x39b)]=this[_0x3978b2(0x2c0)]();},Game_System[_0x231f54(0x3fc)][_0x231f54(0x2c0)]=function(){const _0x1abeb1=_0x231f54,_0x51dcf1=(VisuMZ['CoreEngine'][_0x1abeb1(0x200)]['BattleSystem']||'DATABASE')[_0x1abeb1(0x4ea)]()[_0x1abeb1(0x452)]();return VisuMZ['CoreEngine'][_0x1abeb1(0x238)](_0x51dcf1);},Game_System[_0x231f54(0x3fc)][_0x231f54(0x72f)]=function(){const _0x41f9c7=_0x231f54;if($gameTemp[_0x41f9c7(0x493)]!==undefined)return $gameTemp[_0x41f9c7(0x493)];if(this[_0x41f9c7(0x653)]===undefined)this[_0x41f9c7(0x3d8)]();if(this[_0x41f9c7(0x653)][_0x41f9c7(0x39b)]===undefined)this[_0x41f9c7(0x4b6)]();return this['_CoreEngineSettings'][_0x41f9c7(0x39b)];},Game_System['prototype'][_0x231f54(0x863)]=function(_0x139709){const _0x12fd3c=_0x231f54;if(this[_0x12fd3c(0x653)]===undefined)this[_0x12fd3c(0x3d8)]();if(this[_0x12fd3c(0x653)][_0x12fd3c(0x39b)]===undefined)this[_0x12fd3c(0x4b6)]();this[_0x12fd3c(0x653)]['BattleSystem']=_0x139709;},Game_System['prototype'][_0x231f54(0x2b8)]=function(){const _0x5b0cfc=_0x231f54;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x5b0cfc(0x653)]['FontSize']===undefined)this[_0x5b0cfc(0x3d8)]();return this[_0x5b0cfc(0x653)][_0x5b0cfc(0x788)];},Game_System[_0x231f54(0x3fc)][_0x231f54(0x5b4)]=function(_0x50a4f9){const _0x247bea=_0x231f54;if(this[_0x247bea(0x653)]===undefined)this[_0x247bea(0x3d8)]();if(this[_0x247bea(0x653)][_0x247bea(0x420)]===undefined)this[_0x247bea(0x3d8)]();this[_0x247bea(0x653)][_0x247bea(0x788)]=_0x50a4f9;},Game_System[_0x231f54(0x3fc)][_0x231f54(0x498)]=function(){const _0x2e82fd=_0x231f54;if(this[_0x2e82fd(0x653)]===undefined)this[_0x2e82fd(0x3d8)]();if(this[_0x2e82fd(0x653)][_0x2e82fd(0x509)]===undefined)this['initCoreEngine']();return this[_0x2e82fd(0x653)][_0x2e82fd(0x509)];},Game_System['prototype'][_0x231f54(0x421)]=function(_0x26c6f2){const _0x43d4ca=_0x231f54;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x43d4ca(0x653)][_0x43d4ca(0x420)]===undefined)this[_0x43d4ca(0x3d8)]();this['_CoreEngineSettings'][_0x43d4ca(0x509)]=_0x26c6f2;},VisuMZ[_0x231f54(0x703)][_0x231f54(0x405)]=Game_Screen[_0x231f54(0x3fc)][_0x231f54(0x2b6)],Game_Screen[_0x231f54(0x3fc)][_0x231f54(0x2b6)]=function(){const _0x44bbb6=_0x231f54;VisuMZ[_0x44bbb6(0x703)][_0x44bbb6(0x405)][_0x44bbb6(0x690)](this),this[_0x44bbb6(0x7f5)]();},Game_Screen[_0x231f54(0x3fc)]['initCoreEngineScreenShake']=function(){const _0x222c27=_0x231f54,_0xfed398=VisuMZ[_0x222c27(0x703)][_0x222c27(0x200)]['ScreenShake'];this[_0x222c27(0x4a3)]=_0xfed398?.[_0x222c27(0x378)]||_0x222c27(0x313);},Game_Screen['prototype'][_0x231f54(0x4c1)]=function(){const _0x1112a9=_0x231f54;if(this[_0x1112a9(0x4a3)]===undefined)this['initCoreEngineScreenShake']();return this['_coreEngineShakeStyle'];},Game_Screen[_0x231f54(0x3fc)][_0x231f54(0x549)]=function(_0xa69e2b){const _0x24246c=_0x231f54;if(this[_0x24246c(0x4a3)]===undefined)this[_0x24246c(0x7f5)]();this[_0x24246c(0x4a3)]=_0xa69e2b[_0x24246c(0x47a)]()['trim']();},Game_Picture[_0x231f54(0x3fc)][_0x231f54(0x66b)]=function(){const _0xda6b57=_0x231f54;if($gameParty['inBattle']())return![];return this[_0xda6b57(0x271)]()&&this['name']()[_0xda6b57(0x7c0)](0x0)==='!';},VisuMZ[_0x231f54(0x703)][_0x231f54(0x754)]=Game_Picture[_0x231f54(0x3fc)]['x'],Game_Picture[_0x231f54(0x3fc)]['x']=function(){const _0x27bfdc=_0x231f54;return this['isMapScrollLinked']()?this[_0x27bfdc(0x556)]():VisuMZ['CoreEngine']['Game_Picture_x'][_0x27bfdc(0x690)](this);},Game_Picture[_0x231f54(0x3fc)]['xScrollLinkedOffset']=function(){const _0x33359c=_0x231f54,_0x1f9faf=$gameMap[_0x33359c(0x385)]()*$gameMap[_0x33359c(0x3e8)]();return this['_x']-_0x1f9faf;},VisuMZ[_0x231f54(0x703)][_0x231f54(0x34c)]=Game_Picture[_0x231f54(0x3fc)]['y'],Game_Picture[_0x231f54(0x3fc)]['y']=function(){const _0x22aabd=_0x231f54;if(this[_0x22aabd(0x66b)]()){if(_0x22aabd(0x6ae)!=='wJOHA')return this[_0x22aabd(0x4df)]();else{function _0x272bf4(){const _0x1e8c42=_0x22aabd;this['_forcedBattleSys']=_0x1e8c42(0x1c0);}}}else{if(_0x22aabd(0x576)!==_0x22aabd(0x576)){function _0x564400(){const _0x525ec1=_0x22aabd;_0x33f970['CoreEngine'][_0x525ec1(0x816)]['call'](this);}}else return VisuMZ[_0x22aabd(0x703)]['Game_Picture_y']['call'](this);}},Game_Picture[_0x231f54(0x3fc)][_0x231f54(0x4df)]=function(){const _0x8c1645=_0x231f54,_0x4cd98a=$gameMap[_0x8c1645(0x641)]()*$gameMap['tileHeight']();return this['_y']-_0x4cd98a;},Game_Picture[_0x231f54(0x3fc)][_0x231f54(0x6b4)]=function(_0xa33e2b){const _0x5c0158=_0x231f54;this[_0x5c0158(0x794)]=_0xa33e2b;},VisuMZ[_0x231f54(0x703)][_0x231f54(0x4dc)]=Game_Picture[_0x231f54(0x3fc)][_0x231f54(0x446)],Game_Picture[_0x231f54(0x3fc)]['calcEasing']=function(_0x1d1511){const _0x1c645f=_0x231f54;return this[_0x1c645f(0x794)]=this['_coreEasingType']||0x0,[0x0,0x1,0x2,0x3][_0x1c645f(0x36f)](this[_0x1c645f(0x794)])?VisuMZ[_0x1c645f(0x703)][_0x1c645f(0x4dc)]['call'](this,_0x1d1511):VisuMZ[_0x1c645f(0x36d)](_0x1d1511,this['_coreEasingType']);},VisuMZ[_0x231f54(0x703)][_0x231f54(0x75b)]=Game_Action[_0x231f54(0x3fc)][_0x231f54(0x3bb)],Game_Action[_0x231f54(0x3fc)][_0x231f54(0x3bb)]=function(_0x5d5fcf){const _0x55043e=_0x231f54;if(VisuMZ[_0x55043e(0x703)][_0x55043e(0x200)][_0x55043e(0x4ec)]['ImprovedAccuracySystem'])return this['itemHitImprovedAccuracy'](_0x5d5fcf);else{if(_0x55043e(0x1e1)!==_0x55043e(0x1e1)){function _0x1a50a0(){const _0x1508bb=_0x55043e;this[_0x1508bb(0x493)]=0x1;}}else return VisuMZ['CoreEngine'][_0x55043e(0x75b)]['call'](this,_0x5d5fcf);}},Game_Action[_0x231f54(0x3fc)][_0x231f54(0x50d)]=function(_0x328f75){const _0x1c4d4e=_0x231f54,_0x374739=this['itemSuccessRate'](_0x328f75),_0x323efb=this[_0x1c4d4e(0x66f)](_0x328f75),_0x456acb=this[_0x1c4d4e(0x418)](_0x328f75);return _0x374739*(_0x323efb-_0x456acb);},VisuMZ[_0x231f54(0x703)]['Game_Action_itemEva']=Game_Action['prototype'][_0x231f54(0x53f)],Game_Action['prototype']['itemEva']=function(_0x386daf){const _0x4409d5=_0x231f54;return VisuMZ[_0x4409d5(0x703)][_0x4409d5(0x200)][_0x4409d5(0x4ec)]['ImprovedAccuracySystem']?0x0:VisuMZ[_0x4409d5(0x703)][_0x4409d5(0x7c9)][_0x4409d5(0x690)](this,_0x386daf);},Game_Action['prototype'][_0x231f54(0x2af)]=function(_0x5068d8){const _0x303b21=_0x231f54;return this[_0x303b21(0x5db)]()[_0x303b21(0x687)]*0.01;},Game_Action[_0x231f54(0x3fc)][_0x231f54(0x66f)]=function(_0x17db08){const _0x499cc7=_0x231f54;if(VisuMZ[_0x499cc7(0x703)][_0x499cc7(0x200)][_0x499cc7(0x4ec)][_0x499cc7(0x552)]&&this[_0x499cc7(0x68c)]())return 0x1;if(this[_0x499cc7(0x758)]()){if(VisuMZ[_0x499cc7(0x703)][_0x499cc7(0x200)][_0x499cc7(0x4ec)][_0x499cc7(0x552)]&&this[_0x499cc7(0x6c8)]()[_0x499cc7(0x2a1)]()){if(_0x499cc7(0x30a)!==_0x499cc7(0x30a)){function _0x2f90e8(){const _0xd9b01f=_0x499cc7;this[_0xd9b01f(0x3ba)](_0x4cc6a4);}}else return this[_0x499cc7(0x6c8)]()['hit']+0.05;}else return this[_0x499cc7(0x6c8)]()[_0x499cc7(0x53c)];}else{if(_0x499cc7(0x7eb)!==_0x499cc7(0x7eb)){function _0x3efdd6(){const _0x1f2c78=_0x499cc7;this[_0x1f2c78(0x6b8)]()?this[_0x1f2c78(0x54e)](_0x50edad):_0x5699f3[_0x1f2c78(0x703)][_0x1f2c78(0x3d5)]['call'](this,_0x553934);}}else return 0x1;}},Game_Action[_0x231f54(0x3fc)][_0x231f54(0x418)]=function(_0xa9e3ba){const _0x341be0=_0x231f54;if(this['subject']()[_0x341be0(0x2a1)]()===_0xa9e3ba[_0x341be0(0x2a1)]())return 0x0;if(this['isPhysical']()){if('YrRUH'===_0x341be0(0x387)){function _0x21f6c9(){const _0x192251=_0x341be0;return _0x7e81b[_0x192251(0x72f)]()===0x1;}}else{if(VisuMZ[_0x341be0(0x703)][_0x341be0(0x200)][_0x341be0(0x4ec)][_0x341be0(0x552)]&&_0xa9e3ba[_0x341be0(0x41d)]()){if(_0x341be0(0x2aa)===_0x341be0(0x855)){function _0x3f2b2a(){const _0x46303a=_0x341be0,_0x596107=_0x1c219e(this[_0x46303a(0x1a5)][_0x46303a(0x271)]),_0x2b22b3=this['getCustomBackgroundSettings'](_0x596107);return _0x2b22b3?_0x2b22b3['SnapshotOpacity']:0xc0;}}else return _0xa9e3ba['eva']-0.05;}else{if(_0x341be0(0x4f8)===_0x341be0(0x4f8))return _0xa9e3ba[_0x341be0(0x540)];else{function _0x4e2135(){const _0x2fecd4=_0x341be0,_0x246764=_0x4f5a52[_0x2fecd4(0x36d)]((_0x3e7f96-_0x3d71d6)/_0x31ede4,_0x3ac26f||_0x2fecd4(0x532)),_0x1fead4=_0x2e7f3c[_0x2fecd4(0x36d)]((_0x19e343-_0x344c38+0x1)/_0x269960,_0x4fe305||'Linear'),_0x39ecb5=(_0x44df73-_0x4d0ae5*_0x246764)/(0x1-_0x246764);return _0x39ecb5+(_0x1f7473-_0x39ecb5)*_0x1fead4;}}}}}else{if(this[_0x341be0(0x1dd)]()){if('NlCXI'==='nuiWx'){function _0x18b8e3(){const _0x480b6d=_0x341be0,_0x43200b=new _0xc94e2a(_0x173ed3);this[_0x480b6d(0x6ad)](_0x43200b);}}else return _0xa9e3ba[_0x341be0(0x73e)];}else{if(_0x341be0(0x423)!=='uXeQZ')return 0x0;else{function _0x2983b7(){const _0x50115b=_0x341be0;_0x3595e3[_0x50115b(0x703)][_0x50115b(0x4fc)][_0x50115b(0x690)](this);}}}}},VisuMZ[_0x231f54(0x703)][_0x231f54(0x434)]=Game_Action[_0x231f54(0x3fc)]['updateLastTarget'],Game_Action[_0x231f54(0x3fc)][_0x231f54(0x63d)]=function(_0x3875fb){const _0x317b2a=_0x231f54;VisuMZ['CoreEngine'][_0x317b2a(0x434)][_0x317b2a(0x690)](this,_0x3875fb);if(VisuMZ[_0x317b2a(0x703)][_0x317b2a(0x200)][_0x317b2a(0x4ec)]['ImprovedAccuracySystem'])return;const _0x1a5a6e=_0x3875fb[_0x317b2a(0x311)]();if(_0x1a5a6e[_0x317b2a(0x212)]){if(_0x317b2a(0x2b1)===_0x317b2a(0x2b1)){if(0x1-this['itemEva'](_0x3875fb)>this[_0x317b2a(0x3bb)](_0x3875fb)){if('iFFYO'!=='iFFYO'){function _0x3c54bf(){const _0x114893=_0x317b2a;this[_0x114893(0x31d)]&&this[_0x114893(0x31d)]['setBackgroundType'](_0x3a07bf[_0x114893(0x807)][_0x114893(0x31c)]);}}else _0x1a5a6e['missed']=![],_0x1a5a6e[_0x317b2a(0x31a)]=!![];}}else{function _0x5f03af(){const _0x539d5b=_0x317b2a;_0x198af8[_0x539d5b(0x703)][_0x539d5b(0x3d4)][_0x539d5b(0x690)](this);}}}},VisuMZ[_0x231f54(0x703)][_0x231f54(0x309)]=Game_BattlerBase[_0x231f54(0x3fc)]['initMembers'],Game_BattlerBase['prototype']['initMembers']=function(){const _0x36cb13=_0x231f54;this[_0x36cb13(0x63a)]={},VisuMZ[_0x36cb13(0x703)][_0x36cb13(0x309)]['call'](this);},VisuMZ[_0x231f54(0x703)][_0x231f54(0x21b)]=Game_BattlerBase[_0x231f54(0x3fc)]['refresh'],Game_BattlerBase[_0x231f54(0x3fc)][_0x231f54(0x1c4)]=function(){const _0x5a103e=_0x231f54;this[_0x5a103e(0x63a)]={},VisuMZ['CoreEngine'][_0x5a103e(0x21b)][_0x5a103e(0x690)](this);},Game_BattlerBase[_0x231f54(0x3fc)]['checkCacheKey']=function(_0x35cacc){const _0x4fbf31=_0x231f54;return this['_cache']=this[_0x4fbf31(0x63a)]||{},this[_0x4fbf31(0x63a)][_0x35cacc]!==undefined;},Game_BattlerBase['prototype'][_0x231f54(0x1f9)]=function(_0x4097e6){const _0x4fa6b2=_0x231f54,_0x352ed0=(_0x34501c,_0x2d13c6)=>{const _0x17d668=_0x5618;if(!_0x2d13c6)return _0x34501c;if(_0x2d13c6[_0x17d668(0x23f)][_0x17d668(0x612)](VisuMZ[_0x17d668(0x703)][_0x17d668(0x6dd)]['paramPlus'][_0x4097e6])){var _0x5a8b6b=Number(RegExp['$1']);_0x34501c+=_0x5a8b6b;}if(_0x2d13c6[_0x17d668(0x23f)]['match'](VisuMZ['CoreEngine'][_0x17d668(0x6dd)][_0x17d668(0x2e0)][_0x4097e6])){if(_0x17d668(0x7b8)===_0x17d668(0x5d8)){function _0x2ddce3(){const _0x485409=_0x17d668;if(_0x3273cb[_0x485409(0x841)]())_0x12b81d[_0x485409(0x734)](_0x5df72c);}}else{var _0x126829=String(RegExp['$1']);try{if('rqVtS'!==_0x17d668(0x4f2))_0x34501c+=eval(_0x126829);else{function _0x6f5584(){const _0x42fa3c=_0x17d668;_0x56300e[_0x42fa3c(0x703)][_0x42fa3c(0x200)]['QoL'][_0x42fa3c(0x37b)]&&(this[_0x42fa3c(0x56d)]=![]);}}}catch(_0x47f2e5){if($gameTemp['isPlaytest']())console[_0x17d668(0x734)](_0x47f2e5);}}}return _0x34501c;};return this['traitObjects']()[_0x4fa6b2(0x2fc)](_0x352ed0,this['_paramPlus'][_0x4097e6]);},Game_BattlerBase[_0x231f54(0x3fc)]['paramMax']=function(_0xf9c22){const _0x3a641d=_0x231f54;var _0x319f48=_0x3a641d(0x263)+(this[_0x3a641d(0x2a1)]()?_0x3a641d(0x298):_0x3a641d(0x465))+_0x3a641d(0x853)+_0xf9c22;if(this[_0x3a641d(0x27d)](_0x319f48))return this[_0x3a641d(0x63a)][_0x319f48];this[_0x3a641d(0x63a)][_0x319f48]=eval(VisuMZ[_0x3a641d(0x703)][_0x3a641d(0x200)]['Param'][_0x319f48]);const _0x35bf72=(_0x4d41cd,_0x151052)=>{const _0x4db5ba=_0x3a641d;if(_0x4db5ba(0x440)!==_0x4db5ba(0x484)){if(!_0x151052)return _0x4d41cd;if(_0x151052['note'][_0x4db5ba(0x612)](VisuMZ[_0x4db5ba(0x703)][_0x4db5ba(0x6dd)][_0x4db5ba(0x6db)][_0xf9c22])){var _0x269b8a=Number(RegExp['$1']);if(_0x269b8a===0x0)_0x269b8a=Number['MAX_SAFE_INTEGER'];_0x4d41cd=Math[_0x4db5ba(0x565)](_0x4d41cd,_0x269b8a);}if(_0x151052[_0x4db5ba(0x23f)][_0x4db5ba(0x612)](VisuMZ['CoreEngine'][_0x4db5ba(0x6dd)][_0x4db5ba(0x3cc)][_0xf9c22])){var _0x2e7012=String(RegExp['$1']);try{_0x4d41cd=Math[_0x4db5ba(0x565)](_0x4d41cd,Number(eval(_0x2e7012)));}catch(_0x88c69e){if($gameTemp[_0x4db5ba(0x841)]())console[_0x4db5ba(0x734)](_0x88c69e);}}return _0x4d41cd;}else{function _0x4128f3(){const _0x2dc5df=_0x4db5ba,_0x147ccd=_0x16e76e[_0x2dc5df(0x703)][_0x2dc5df(0x200)][_0x2dc5df(0x2fe)];this[_0x2dc5df(0x4a3)]=_0x147ccd?.[_0x2dc5df(0x378)]||'random';}}};if(this[_0x3a641d(0x63a)][_0x319f48]===0x0)this[_0x3a641d(0x63a)][_0x319f48]=Number['MAX_SAFE_INTEGER'];return this['_cache'][_0x319f48]=this['traitObjects']()['reduce'](_0x35bf72,this['_cache'][_0x319f48]),this['_cache'][_0x319f48];},Game_BattlerBase[_0x231f54(0x3fc)][_0x231f54(0x58e)]=function(_0x46c685){const _0x33579e=_0x231f54,_0x7d9906=this[_0x33579e(0x1f4)](Game_BattlerBase[_0x33579e(0x235)],_0x46c685),_0x95ac27=(_0x11dc3e,_0xdc76e5)=>{const _0x233b5b=_0x33579e;if(_0x233b5b(0x1d0)===_0x233b5b(0x473)){function _0x4ad8ee(){const _0x23b19a=_0x233b5b;this['isItemStyle']()?this[_0x23b19a(0x568)]():_0x21bebe['CoreEngine'][_0x23b19a(0x579)][_0x23b19a(0x690)](this);}}else{if(!_0xdc76e5)return _0x11dc3e;if(_0xdc76e5[_0x233b5b(0x23f)][_0x233b5b(0x612)](VisuMZ[_0x233b5b(0x703)]['RegExp']['paramRate1'][_0x46c685])){var _0x101396=Number(RegExp['$1'])/0x64;_0x11dc3e*=_0x101396;}if(_0xdc76e5[_0x233b5b(0x23f)][_0x233b5b(0x612)](VisuMZ[_0x233b5b(0x703)][_0x233b5b(0x6dd)][_0x233b5b(0x227)][_0x46c685])){if(_0x233b5b(0x5a7)==='cugoP'){function _0x5e71fc(){const _0x486a54=_0x233b5b;this[_0x486a54(0x54d)]['setBackgroundType'](_0x17e805[_0x486a54(0x807)][_0x486a54(0x2f0)]);}}else{var _0x101396=Number(RegExp['$1']);_0x11dc3e*=_0x101396;}}if(_0xdc76e5[_0x233b5b(0x23f)][_0x233b5b(0x612)](VisuMZ[_0x233b5b(0x703)][_0x233b5b(0x6dd)][_0x233b5b(0x523)][_0x46c685])){if(_0x233b5b(0x1b2)!==_0x233b5b(0x6a9)){var _0x4bda5e=String(RegExp['$1']);try{_0x11dc3e*=eval(_0x4bda5e);}catch(_0x42b88d){if('ikBEo'===_0x233b5b(0x2b5)){if($gameTemp[_0x233b5b(0x841)]())console[_0x233b5b(0x734)](_0x42b88d);}else{function _0x14fd05(){const _0x4c3966=_0x233b5b;this[_0x4c3966(0x3b0)]>0x0&&(this[_0x4c3966(0x372)]['x']=this[_0x4c3966(0x5a6)](this[_0x4c3966(0x372)]['x'],this[_0x4c3966(0x398)]['x']),this[_0x4c3966(0x372)]['y']=this[_0x4c3966(0x5a6)](this[_0x4c3966(0x372)]['y'],this[_0x4c3966(0x398)]['y']));}}}}else{function _0x91ad67(){const _0x285c32=_0x233b5b;return this[_0x285c32(0x6c8)]()['hit'];}}}return _0x11dc3e;}};return this[_0x33579e(0x260)]()[_0x33579e(0x2fc)](_0x95ac27,_0x7d9906);},Game_BattlerBase['prototype'][_0x231f54(0x7c8)]=function(_0x5147be){const _0x2ba770=_0x231f54,_0x233019=(_0x253ae9,_0x3e0da1)=>{const _0xc31096=_0x5618;if(_0xc31096(0x1e8)===_0xc31096(0x1e8)){if(!_0x3e0da1)return _0x253ae9;if(_0x3e0da1[_0xc31096(0x23f)][_0xc31096(0x612)](VisuMZ[_0xc31096(0x703)][_0xc31096(0x6dd)][_0xc31096(0x2b4)][_0x5147be])){var _0x4cf6ac=Number(RegExp['$1']);_0x253ae9+=_0x4cf6ac;}if(_0x3e0da1[_0xc31096(0x23f)][_0xc31096(0x612)](VisuMZ[_0xc31096(0x703)]['RegExp']['paramFlatJS'][_0x5147be])){if(_0xc31096(0x4d6)!==_0xc31096(0x4d6)){function _0x2473cc(){const _0x24a1e7=_0xc31096;return this[_0x24a1e7(0x5a4)](_0x578195,_0x551c81);}}else{var _0x35f487=String(RegExp['$1']);try{_0x253ae9+=eval(_0x35f487);}catch(_0x1e37be){if($gameTemp[_0xc31096(0x841)]())console[_0xc31096(0x734)](_0x1e37be);}}}return _0x253ae9;}else{function _0x4ed8f3(){const _0x235bb4=_0xc31096;if(!this[_0x235bb4(0x6bb)])return;if(this['_coreEasing'][_0x235bb4(0x319)]<=0x0)return;this['x']=this[_0x235bb4(0x5ff)](this['x'],this[_0x235bb4(0x6bb)][_0x235bb4(0x7ef)]),this['y']=this[_0x235bb4(0x5ff)](this['y'],this['_coreEasing'][_0x235bb4(0x1a6)]),this[_0x235bb4(0x831)]['x']=this[_0x235bb4(0x5ff)](this[_0x235bb4(0x831)]['x'],this[_0x235bb4(0x6bb)][_0x235bb4(0x7dc)]),this[_0x235bb4(0x831)]['y']=this[_0x235bb4(0x5ff)](this[_0x235bb4(0x831)]['y'],this[_0x235bb4(0x6bb)]['targetScaleY']),this[_0x235bb4(0x379)]=this['applyCoreEasing'](this['opacity'],this[_0x235bb4(0x6bb)][_0x235bb4(0x801)]),this['backOpacity']=this['applyCoreEasing'](this['backOpacity'],this['_coreEasing'][_0x235bb4(0x630)]),this[_0x235bb4(0x86c)]=this[_0x235bb4(0x5ff)](this[_0x235bb4(0x86c)],this[_0x235bb4(0x6bb)][_0x235bb4(0x29c)]),this[_0x235bb4(0x6bb)][_0x235bb4(0x319)]--;}}};return this[_0x2ba770(0x260)]()[_0x2ba770(0x2fc)](_0x233019,0x0);},Game_BattlerBase[_0x231f54(0x3fc)][_0x231f54(0x87d)]=function(_0x4b37bc){const _0x4bd491=_0x231f54;let _0x46f4b5=_0x4bd491(0x87d)+_0x4b37bc+'Total';if(this['checkCacheKey'](_0x46f4b5))return this[_0x4bd491(0x63a)][_0x46f4b5];return this[_0x4bd491(0x63a)][_0x46f4b5]=Math[_0x4bd491(0x64c)](VisuMZ['CoreEngine']['Settings'][_0x4bd491(0x502)]['BasicParameterFormula'][_0x4bd491(0x690)](this,_0x4b37bc)),this[_0x4bd491(0x63a)][_0x46f4b5];},Game_BattlerBase[_0x231f54(0x3fc)]['xparamPlus']=function(_0x3bfd86){const _0x247fda=_0x231f54,_0x12ac87=(_0x10d71e,_0x1a0f59)=>{const _0x268450=_0x5618;if(!_0x1a0f59)return _0x10d71e;if(_0x1a0f59['note']['match'](VisuMZ[_0x268450(0x703)][_0x268450(0x6dd)][_0x268450(0x44a)][_0x3bfd86])){var _0x4c056f=Number(RegExp['$1'])/0x64;_0x10d71e+=_0x4c056f;}if(_0x1a0f59[_0x268450(0x23f)]['match'](VisuMZ[_0x268450(0x703)][_0x268450(0x6dd)]['xparamPlus2'][_0x3bfd86])){if(_0x268450(0x251)!=='jbwHe'){var _0x4c056f=Number(RegExp['$1']);_0x10d71e+=_0x4c056f;}else{function _0x4eb89f(){const _0x48a9d6=_0x268450;if(_0x3ff63f[_0x48a9d6(0x5a2)]())return![];return this['name']()&&this[_0x48a9d6(0x271)]()['charAt'](0x0)==='!';}}}if(_0x1a0f59[_0x268450(0x23f)][_0x268450(0x612)](VisuMZ[_0x268450(0x703)]['RegExp'][_0x268450(0x6f5)][_0x3bfd86])){var _0x17e57c=String(RegExp['$1']);try{if(_0x268450(0x692)===_0x268450(0x1b3)){function _0x6aa0eb(){const _0x547302=_0x268450;_0x3b982c[_0x547302(0x292)]=_0x1e384c[_0x547302(0x301)]['NEAREST'];}}else _0x10d71e+=eval(_0x17e57c);}catch(_0x4eda10){if($gameTemp['isPlaytest']())console['log'](_0x4eda10);}}return _0x10d71e;};return this['traitObjects']()[_0x247fda(0x2fc)](_0x12ac87,0x0);},Game_BattlerBase[_0x231f54(0x3fc)]['xparamRate']=function(_0x3ff000){const _0x9b1213=_0x231f54,_0x12e6bb=(_0x15b93f,_0x226b51)=>{const _0x4cceb6=_0x5618;if(!_0x226b51)return _0x15b93f;if(_0x226b51[_0x4cceb6(0x23f)][_0x4cceb6(0x612)](VisuMZ['CoreEngine'][_0x4cceb6(0x6dd)][_0x4cceb6(0x478)][_0x3ff000])){var _0x1a012c=Number(RegExp['$1'])/0x64;_0x15b93f*=_0x1a012c;}if(_0x226b51[_0x4cceb6(0x23f)][_0x4cceb6(0x612)](VisuMZ[_0x4cceb6(0x703)][_0x4cceb6(0x6dd)][_0x4cceb6(0x7fb)][_0x3ff000])){var _0x1a012c=Number(RegExp['$1']);_0x15b93f*=_0x1a012c;}if(_0x226b51['note'][_0x4cceb6(0x612)](VisuMZ[_0x4cceb6(0x703)][_0x4cceb6(0x6dd)]['xparamRateJS'][_0x3ff000])){var _0x16ceb1=String(RegExp['$1']);try{if(_0x4cceb6(0x71a)!==_0x4cceb6(0x71a)){function _0x7d2f4e(){const _0x69d300=_0x4cceb6;switch(_0xa9f3f4['CoreEngine'][_0x69d300(0x200)][_0x69d300(0x4ec)]['AutoStretch']){case'stretch':return!![];case _0x69d300(0x3c4):return![];default:return _0x40a52a['CoreEngine']['Graphics_defaultStretchMode'][_0x69d300(0x690)](this);}}}else _0x15b93f*=eval(_0x16ceb1);}catch(_0x47d1c8){if($gameTemp[_0x4cceb6(0x841)]())console[_0x4cceb6(0x734)](_0x47d1c8);}}return _0x15b93f;};return this[_0x9b1213(0x260)]()[_0x9b1213(0x2fc)](_0x12e6bb,0x1);},Game_BattlerBase[_0x231f54(0x3fc)][_0x231f54(0x542)]=function(_0x2c6f4b){const _0x4900fc=_0x231f54,_0x10ce4f=(_0x34f1b3,_0x4c6c4b)=>{const _0x38db82=_0x5618;if(!_0x4c6c4b)return _0x34f1b3;if(_0x4c6c4b[_0x38db82(0x23f)]['match'](VisuMZ[_0x38db82(0x703)][_0x38db82(0x6dd)]['xparamFlat1'][_0x2c6f4b])){var _0x19f85e=Number(RegExp['$1'])/0x64;_0x34f1b3+=_0x19f85e;}if(_0x4c6c4b['note'][_0x38db82(0x612)](VisuMZ[_0x38db82(0x703)][_0x38db82(0x6dd)][_0x38db82(0x3a6)][_0x2c6f4b])){if(_0x38db82(0x65b)===_0x38db82(0x65b)){var _0x19f85e=Number(RegExp['$1']);_0x34f1b3+=_0x19f85e;}else{function _0x24a3f1(){const _0x4a7f52=_0x38db82;return _0x1fe2bb[_0x4a7f52(0x807)][_0x4a7f52(0x326)][_0x4a7f52(0x690)](this);}}}if(_0x4c6c4b[_0x38db82(0x23f)][_0x38db82(0x612)](VisuMZ['CoreEngine'][_0x38db82(0x6dd)][_0x38db82(0x5f7)][_0x2c6f4b])){if(_0x38db82(0x3d1)===_0x38db82(0x7a3)){function _0x117914(){return _0x2b2241;}}else{var _0x53da2f=String(RegExp['$1']);try{_0x34f1b3+=eval(_0x53da2f);}catch(_0x39f97e){if($gameTemp[_0x38db82(0x841)]())console[_0x38db82(0x734)](_0x39f97e);}}}return _0x34f1b3;};return this[_0x4900fc(0x260)]()['reduce'](_0x10ce4f,0x0);},Game_BattlerBase[_0x231f54(0x3fc)][_0x231f54(0x299)]=function(_0x1978d0){const _0x449c3c=_0x231f54;let _0x386793=_0x449c3c(0x299)+_0x1978d0+'Total';if(this[_0x449c3c(0x27d)](_0x386793))return this[_0x449c3c(0x63a)][_0x386793];return this['_cache'][_0x386793]=VisuMZ[_0x449c3c(0x703)][_0x449c3c(0x200)][_0x449c3c(0x502)][_0x449c3c(0x3e4)][_0x449c3c(0x690)](this,_0x1978d0),this['_cache'][_0x386793];},Game_BattlerBase[_0x231f54(0x3fc)][_0x231f54(0x6cd)]=function(_0x58835d){const _0x8f6a1a=_0x231f54,_0x43439d=(_0x1488e3,_0x53f176)=>{const _0x676fd0=_0x5618;if(!_0x53f176)return _0x1488e3;if(_0x53f176[_0x676fd0(0x23f)]['match'](VisuMZ[_0x676fd0(0x703)][_0x676fd0(0x6dd)][_0x676fd0(0x82c)][_0x58835d])){var _0x3163bd=Number(RegExp['$1'])/0x64;_0x1488e3+=_0x3163bd;}if(_0x53f176[_0x676fd0(0x23f)][_0x676fd0(0x612)](VisuMZ[_0x676fd0(0x703)][_0x676fd0(0x6dd)]['sparamPlus2'][_0x58835d])){var _0x3163bd=Number(RegExp['$1']);_0x1488e3+=_0x3163bd;}if(_0x53f176[_0x676fd0(0x23f)][_0x676fd0(0x612)](VisuMZ[_0x676fd0(0x703)][_0x676fd0(0x6dd)][_0x676fd0(0x6d3)][_0x58835d])){if(_0x676fd0(0x3f9)!==_0x676fd0(0x3f9)){function _0x4db44a(){const _0x28c43c=_0x676fd0;this[_0x28c43c(0x223)]();const _0x2ca3d9=_0xd4b6e[_0x28c43c(0x4f7)][_0x28c43c(0x312)],_0x42a2ec=this[_0x28c43c(0x708)]();this['_commandWindow']=new _0x56a1c4(_0x42a2ec),this[_0x28c43c(0x54d)][_0x28c43c(0x669)](_0x2ca3d9);const _0x24a95e=this[_0x28c43c(0x708)]();this[_0x28c43c(0x54d)][_0x28c43c(0x6a6)](_0x24a95e['x'],_0x24a95e['y'],_0x24a95e[_0x28c43c(0x346)],_0x24a95e[_0x28c43c(0x31f)]),this[_0x28c43c(0x6af)](this[_0x28c43c(0x54d)]);}}else{var _0x2998ed=String(RegExp['$1']);try{if('dQWif'!==_0x676fd0(0x76d))_0x1488e3+=eval(_0x2998ed);else{function _0x114319(){const _0x1b1f49=_0x676fd0;_0x24f088['VisuMZ_2_BattleSystemOTB']&&(this[_0x1b1f49(0x493)]=_0x1b1f49(0x451));}}}catch(_0x46885b){if('oONvd'!==_0x676fd0(0x581)){function _0x2a5347(){const _0xf89ab8=_0x676fd0;return _0x15f0e6[_0xf89ab8(0x6a8)]('ok');}}else{if($gameTemp[_0x676fd0(0x841)]())console[_0x676fd0(0x734)](_0x46885b);}}}}return _0x1488e3;};return this[_0x8f6a1a(0x260)]()['reduce'](_0x43439d,0x0);},Game_BattlerBase[_0x231f54(0x3fc)][_0x231f54(0x7aa)]=function(_0x4e8b20){const _0x414888=_0x231f54,_0xa9c502=(_0x266974,_0x59f517)=>{const _0x15b46b=_0x5618;if(!_0x59f517)return _0x266974;if(_0x59f517['note']['match'](VisuMZ[_0x15b46b(0x703)][_0x15b46b(0x6dd)][_0x15b46b(0x76e)][_0x4e8b20])){var _0x14934d=Number(RegExp['$1'])/0x64;_0x266974*=_0x14934d;}if(_0x59f517['note'][_0x15b46b(0x612)](VisuMZ[_0x15b46b(0x703)][_0x15b46b(0x6dd)]['sparamRate2'][_0x4e8b20])){if(_0x15b46b(0x85d)===_0x15b46b(0x85d)){var _0x14934d=Number(RegExp['$1']);_0x266974*=_0x14934d;}else{function _0x8aec41(){const _0x537667=_0x15b46b;if(_0x21995a[_0x537667(0x705)]())return _0x537667(0x6e0);return _0x35d1f2[_0x537667(0x703)][_0x537667(0x200)]['KeyboardInput']['DefaultMode']||_0x537667(0x639);}}}if(_0x59f517['note'][_0x15b46b(0x612)](VisuMZ['CoreEngine']['RegExp']['sparamRateJS'][_0x4e8b20])){if(_0x15b46b(0x82a)==='rFZwM'){function _0x4405c2(){const _0x568e82=_0x15b46b;this['isUseModernControls']()?this['processTouchModernControls']():_0x249fda[_0x568e82(0x703)][_0x568e82(0x816)]['call'](this);}}else{var _0x5abb2b=String(RegExp['$1']);try{if(_0x15b46b(0x554)==='NSuhJ'){function _0x2c3157(){const _0xc2218e=_0x15b46b;return this[_0xc2218e(0x63a)]=this[_0xc2218e(0x63a)]||{},this[_0xc2218e(0x63a)][_0x3ffb33]!==_0x3d5b2e;}}else _0x266974*=eval(_0x5abb2b);}catch(_0x1d7731){if(_0x15b46b(0x7ed)!==_0x15b46b(0x6b5)){if($gameTemp[_0x15b46b(0x841)]())console[_0x15b46b(0x734)](_0x1d7731);}else{function _0x4cc758(){const _0x490037=_0x15b46b;return _0x28e356[_0x490037(0x36e)]()[_0x490037(0x270)](_0x1a96c7);}}}}}return _0x266974;};return this[_0x414888(0x260)]()['reduce'](_0xa9c502,0x1);},Game_BattlerBase[_0x231f54(0x3fc)]['sparamFlatBonus']=function(_0x121238){const _0x3ddccb=_0x231f54,_0x38dcd8=(_0x422be8,_0x5f0d0c)=>{const _0x2c167c=_0x5618;if('ihlnf'!==_0x2c167c(0x7d1)){function _0x82d1a7(){const _0x72cf33=_0x2c167c;for(const _0x56b54f of _0x47e3aa){if(_0x56b54f&&_0x56b54f[_0x72cf33(0x5bf)])return!![];}}}else{if(!_0x5f0d0c)return _0x422be8;if(_0x5f0d0c[_0x2c167c(0x23f)][_0x2c167c(0x612)](VisuMZ[_0x2c167c(0x703)][_0x2c167c(0x6dd)][_0x2c167c(0x27c)][_0x121238])){var _0x472b8c=Number(RegExp['$1'])/0x64;_0x422be8+=_0x472b8c;}if(_0x5f0d0c[_0x2c167c(0x23f)][_0x2c167c(0x612)](VisuMZ[_0x2c167c(0x703)][_0x2c167c(0x6dd)][_0x2c167c(0x374)][_0x121238])){if(_0x2c167c(0x1c1)==='XVCyh'){var _0x472b8c=Number(RegExp['$1']);_0x422be8+=_0x472b8c;}else{function _0x461382(){const _0xbd319e=_0x2c167c;if(!this[_0xbd319e(0x475)]())return![];else{const _0x2eb8f6=_0x203265[_0xbd319e(0x296)](_0x17d6e9,_0xcee8cd)['filter'](_0x332a18=>_0x332a18['isNormalPriority']());return _0x2eb8f6[_0xbd319e(0x533)]>0x0;}}}}if(_0x5f0d0c[_0x2c167c(0x23f)][_0x2c167c(0x612)](VisuMZ['CoreEngine'][_0x2c167c(0x6dd)][_0x2c167c(0x632)][_0x121238])){var _0x2aa8fb=String(RegExp['$1']);try{if(_0x2c167c(0x74c)===_0x2c167c(0x830)){function _0x2b7f2c(){const _0xa7fa2d=_0x2c167c;_0x3efef2[_0xa7fa2d(0x703)][_0xa7fa2d(0x680)][_0xa7fa2d(0x690)](this);if(!_0x3548ca[_0xa7fa2d(0x47d)])this[_0xa7fa2d(0x5f9)]();}}else _0x422be8+=eval(_0x2aa8fb);}catch(_0x32b245){if('XBcrI'!==_0x2c167c(0x761)){if($gameTemp[_0x2c167c(0x841)]())console[_0x2c167c(0x734)](_0x32b245);}else{function _0x21869f(){const _0x375a21=_0x2c167c;_0x5a1b6d[_0x375a21(0x703)][_0x375a21(0x78f)][_0x375a21(0x690)](this),_0x5dd5bb[_0x375a21(0x783)]();}}}}return _0x422be8;}};return this[_0x3ddccb(0x260)]()[_0x3ddccb(0x2fc)](_0x38dcd8,0x0);},Game_BattlerBase[_0x231f54(0x3fc)][_0x231f54(0x258)]=function(_0x3e03d2){const _0x418e1e=_0x231f54;let _0x390b13='sparam'+_0x3e03d2+_0x418e1e(0x7e7);if(this['checkCacheKey'](_0x390b13))return this[_0x418e1e(0x63a)][_0x390b13];return this['_cache'][_0x390b13]=VisuMZ[_0x418e1e(0x703)][_0x418e1e(0x200)]['Param'][_0x418e1e(0x1ab)]['call'](this,_0x3e03d2),this[_0x418e1e(0x63a)][_0x390b13];},Game_BattlerBase[_0x231f54(0x3fc)][_0x231f54(0x774)]=function(_0x2cf240,_0x3d066c){const _0x2d2c75=_0x231f54;if(typeof paramId===_0x2d2c75(0x835))return this[_0x2d2c75(0x87d)](_0x2cf240);_0x2cf240=String(_0x2cf240||'')['toUpperCase']();if(_0x2cf240==='MAXHP')return this[_0x2d2c75(0x87d)](0x0);if(_0x2cf240===_0x2d2c75(0x702))return this['param'](0x1);if(_0x2cf240===_0x2d2c75(0x590))return this[_0x2d2c75(0x87d)](0x2);if(_0x2cf240==='DEF')return this['param'](0x3);if(_0x2cf240==='MAT')return this[_0x2d2c75(0x87d)](0x4);if(_0x2cf240==='MDF')return this[_0x2d2c75(0x87d)](0x5);if(_0x2cf240===_0x2d2c75(0x778))return this[_0x2d2c75(0x87d)](0x6);if(_0x2cf240===_0x2d2c75(0x867))return this[_0x2d2c75(0x87d)](0x7);if(_0x2cf240==='HIT')return _0x3d066c?String(Math['round'](this[_0x2d2c75(0x299)](0x0)*0x64))+'%':this[_0x2d2c75(0x299)](0x0);if(_0x2cf240===_0x2d2c75(0x3eb))return _0x3d066c?String(Math[_0x2d2c75(0x64c)](this['xparam'](0x1)*0x64))+'%':this[_0x2d2c75(0x299)](0x1);if(_0x2cf240===_0x2d2c75(0x875))return _0x3d066c?String(Math[_0x2d2c75(0x64c)](this[_0x2d2c75(0x299)](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x2cf240===_0x2d2c75(0x620))return _0x3d066c?String(Math['round'](this[_0x2d2c75(0x299)](0x3)*0x64))+'%':this[_0x2d2c75(0x299)](0x3);if(_0x2cf240===_0x2d2c75(0x44e))return _0x3d066c?String(Math[_0x2d2c75(0x64c)](this[_0x2d2c75(0x299)](0x4)*0x64))+'%':this['xparam'](0x4);if(_0x2cf240===_0x2d2c75(0x399))return _0x3d066c?String(Math['round'](this['xparam'](0x5)*0x64))+'%':this[_0x2d2c75(0x299)](0x5);if(_0x2cf240===_0x2d2c75(0x5f4))return _0x3d066c?String(Math[_0x2d2c75(0x64c)](this[_0x2d2c75(0x299)](0x6)*0x64))+'%':this[_0x2d2c75(0x299)](0x6);if(_0x2cf240===_0x2d2c75(0x295))return _0x3d066c?String(Math['round'](this['xparam'](0x7)*0x64))+'%':this[_0x2d2c75(0x299)](0x7);if(_0x2cf240===_0x2d2c75(0x716))return _0x3d066c?String(Math['round'](this[_0x2d2c75(0x299)](0x8)*0x64))+'%':this[_0x2d2c75(0x299)](0x8);if(_0x2cf240===_0x2d2c75(0x6b2))return _0x3d066c?String(Math['round'](this['xparam'](0x9)*0x64))+'%':this[_0x2d2c75(0x299)](0x9);if(_0x2cf240==='TGR')return _0x3d066c?String(Math[_0x2d2c75(0x64c)](this[_0x2d2c75(0x258)](0x0)*0x64))+'%':this[_0x2d2c75(0x258)](0x0);if(_0x2cf240===_0x2d2c75(0x3bc))return _0x3d066c?String(Math['round'](this[_0x2d2c75(0x258)](0x1)*0x64))+'%':this['sparam'](0x1);if(_0x2cf240===_0x2d2c75(0x50e))return _0x3d066c?String(Math[_0x2d2c75(0x64c)](this[_0x2d2c75(0x258)](0x2)*0x64))+'%':this[_0x2d2c75(0x258)](0x2);if(_0x2cf240===_0x2d2c75(0x543))return _0x3d066c?String(Math[_0x2d2c75(0x64c)](this[_0x2d2c75(0x258)](0x3)*0x64))+'%':this[_0x2d2c75(0x258)](0x3);if(_0x2cf240===_0x2d2c75(0x202))return _0x3d066c?String(Math[_0x2d2c75(0x64c)](this[_0x2d2c75(0x258)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x2cf240===_0x2d2c75(0x1de))return _0x3d066c?String(Math[_0x2d2c75(0x64c)](this[_0x2d2c75(0x258)](0x5)*0x64))+'%':this[_0x2d2c75(0x258)](0x5);if(_0x2cf240===_0x2d2c75(0x18f))return _0x3d066c?String(Math[_0x2d2c75(0x64c)](this[_0x2d2c75(0x258)](0x6)*0x64))+'%':this['sparam'](0x6);if(_0x2cf240===_0x2d2c75(0x7df))return _0x3d066c?String(Math[_0x2d2c75(0x64c)](this['sparam'](0x7)*0x64))+'%':this[_0x2d2c75(0x258)](0x7);if(_0x2cf240===_0x2d2c75(0x7ca))return _0x3d066c?String(Math[_0x2d2c75(0x64c)](this[_0x2d2c75(0x258)](0x8)*0x64))+'%':this['sparam'](0x8);if(_0x2cf240==='EXR')return _0x3d066c?String(Math[_0x2d2c75(0x64c)](this[_0x2d2c75(0x258)](0x9)*0x64))+'%':this[_0x2d2c75(0x258)](0x9);if(VisuMZ[_0x2d2c75(0x703)][_0x2d2c75(0x804)][_0x2cf240]){const _0x66ccde=VisuMZ[_0x2d2c75(0x703)][_0x2d2c75(0x804)][_0x2cf240],_0x27722a=this[_0x66ccde];if(VisuMZ[_0x2d2c75(0x703)][_0x2d2c75(0x3ce)][_0x2cf240]==='integer'){if('mMSyo'!=='mMSyo'){function _0x28d0ab(){const _0x18a4bb=_0x2d2c75;return this[_0x18a4bb(0x40a)]()[_0x18a4bb(0x806)];}}else return _0x27722a;}else return _0x3d066c?String(Math[_0x2d2c75(0x64c)](_0x27722a*0x64))+'%':_0x27722a;}return'';},Game_BattlerBase[_0x231f54(0x3fc)][_0x231f54(0x274)]=function(){const _0x22ad1c=_0x231f54;return this['isAlive']()&&this[_0x22ad1c(0x84f)]<this['mhp']*VisuMZ['CoreEngine']['Settings'][_0x22ad1c(0x502)][_0x22ad1c(0x741)];},Game_Battler[_0x231f54(0x3fc)]['performMiss']=function(){const _0x32c027=_0x231f54;SoundManager[_0x32c027(0x348)](),this[_0x32c027(0x80c)]('evade');},VisuMZ[_0x231f54(0x703)][_0x231f54(0x73d)]=Game_Actor[_0x231f54(0x3fc)]['paramBase'],Game_Actor[_0x231f54(0x3fc)][_0x231f54(0x6a2)]=function(_0xc87ef3){const _0x5ca43a=_0x231f54;if(this[_0x5ca43a(0x806)]>0x63)return this[_0x5ca43a(0x60b)](_0xc87ef3);return VisuMZ[_0x5ca43a(0x703)]['Game_Actor_paramBase']['call'](this,_0xc87ef3);},Game_Actor[_0x231f54(0x3fc)]['paramBaseAboveLevel99']=function(_0x3cbe7b){const _0x493c25=_0x231f54,_0x23a7b6=this['currentClass']()[_0x493c25(0x2bc)][_0x3cbe7b][0x63],_0x1b5f48=this[_0x493c25(0x553)]()[_0x493c25(0x2bc)][_0x3cbe7b][0x62];return _0x23a7b6+(_0x23a7b6-_0x1b5f48)*(this[_0x493c25(0x806)]-0x63);},VisuMZ[_0x231f54(0x703)][_0x231f54(0x245)]=Game_Actor[_0x231f54(0x3fc)][_0x231f54(0x34f)],Game_Actor['prototype'][_0x231f54(0x34f)]=function(_0x407d91,_0x2ba2e4){const _0x421404=_0x231f54;$gameTemp['_changingClass']=!![],VisuMZ[_0x421404(0x703)]['Game_Actor_changeClass']['call'](this,_0x407d91,_0x2ba2e4),$gameTemp[_0x421404(0x47d)]=undefined;},VisuMZ[_0x231f54(0x703)][_0x231f54(0x680)]=Game_Actor['prototype'][_0x231f54(0x3e7)],Game_Actor[_0x231f54(0x3fc)][_0x231f54(0x3e7)]=function(){const _0x40a2dd=_0x231f54;VisuMZ[_0x40a2dd(0x703)]['Game_Actor_levelUp']['call'](this);if(!$gameTemp[_0x40a2dd(0x47d)])this[_0x40a2dd(0x5f9)]();},Game_Actor[_0x231f54(0x3fc)][_0x231f54(0x5f9)]=function(){const _0x1b14cd=_0x231f54;this['_cache']={};if(VisuMZ[_0x1b14cd(0x703)]['Settings'][_0x1b14cd(0x4ec)][_0x1b14cd(0x5b3)])this[_0x1b14cd(0x84f)]=this[_0x1b14cd(0x443)];if(VisuMZ['CoreEngine']['Settings']['QoL'][_0x1b14cd(0x59c)])this['_mp']=this[_0x1b14cd(0x487)];},Game_Actor[_0x231f54(0x3fc)][_0x231f54(0x6b9)]=function(){const _0x3711bd=_0x231f54;if(this[_0x3711bd(0x304)]())return 0x1;const _0x25b423=this[_0x3711bd(0x7c6)]()-this[_0x3711bd(0x23b)](),_0x2028c5=this['currentExp']()-this[_0x3711bd(0x23b)]();return(_0x2028c5/_0x25b423)[_0x3711bd(0x308)](0x0,0x1);},Game_Actor[_0x231f54(0x3fc)][_0x231f54(0x260)]=function(){const _0x200429=_0x231f54,_0x5d46d5=Game_Battler[_0x200429(0x3fc)][_0x200429(0x260)][_0x200429(0x690)](this);for(const _0x1e742f of this['equips']()){_0x1e742f&&_0x5d46d5[_0x200429(0x616)](_0x1e742f);}return _0x5d46d5[_0x200429(0x616)](this['currentClass'](),this[_0x200429(0x36e)]()),_0x5d46d5;},Object[_0x231f54(0x3dc)](Game_Enemy[_0x231f54(0x3fc)],_0x231f54(0x806),{'get':function(){const _0x204a74=_0x231f54;return this[_0x204a74(0x197)]();},'configurable':!![]}),Game_Enemy[_0x231f54(0x3fc)]['getLevel']=function(){const _0x33b8df=_0x231f54;return this[_0x33b8df(0x40a)]()['level'];},Game_Enemy[_0x231f54(0x3fc)][_0x231f54(0x2e7)]=function(){const _0x30cf97=_0x231f54;if(!this[_0x30cf97(0x7c5)]){if(_0x30cf97(0x448)===_0x30cf97(0x2f2)){function _0x1064ae(){const _0x1f150d=_0x30cf97;return this[_0x1f150d(0x1f5)]();}}else{this[_0x30cf97(0x5c7)]+=Math[_0x30cf97(0x64c)]((Graphics[_0x30cf97(0x31f)]-0x270)/0x2),this[_0x30cf97(0x5c7)]-=Math[_0x30cf97(0x659)]((Graphics[_0x30cf97(0x31f)]-Graphics[_0x30cf97(0x485)])/0x2);if($gameSystem[_0x30cf97(0x694)]())this[_0x30cf97(0x4c0)]-=Math[_0x30cf97(0x659)]((Graphics[_0x30cf97(0x346)]-Graphics[_0x30cf97(0x3e3)])/0x2);else{if('FOSpV'==='rcvGa'){function _0x15a833(){const _0x51b69e=_0x30cf97;return _0xaf90ff[_0x51b69e(0x807)][_0x51b69e(0x7f8)][_0x51b69e(0x690)](this);}}else this[_0x30cf97(0x4c0)]+=Math[_0x30cf97(0x64c)]((Graphics[_0x30cf97(0x3e3)]-0x330)/0x2);}}}this[_0x30cf97(0x7c5)]=!![];},Game_Party[_0x231f54(0x3fc)][_0x231f54(0x3ea)]=function(){const _0x358769=_0x231f54;return VisuMZ[_0x358769(0x703)][_0x358769(0x200)]['Gold'][_0x358769(0x6e7)];},VisuMZ[_0x231f54(0x703)][_0x231f54(0x62c)]=Game_Party[_0x231f54(0x3fc)]['consumeItem'],Game_Party[_0x231f54(0x3fc)][_0x231f54(0x52d)]=function(_0x5cab2c){const _0x605d9e=_0x231f54;if(VisuMZ['CoreEngine']['Settings'][_0x605d9e(0x4ec)]['KeyItemProtect']&&DataManager['isKeyItem'](_0x5cab2c))return;VisuMZ[_0x605d9e(0x703)][_0x605d9e(0x62c)]['call'](this,_0x5cab2c);},Game_Party[_0x231f54(0x3fc)]['setupBattleTestItems']=function(){const _0x5ef77f=_0x231f54,_0x2aea9b=VisuMZ[_0x5ef77f(0x703)][_0x5ef77f(0x200)][_0x5ef77f(0x4ec)],_0x418a98=_0x2aea9b[_0x5ef77f(0x885)]??0x63;let _0x14033e=[];(_0x2aea9b[_0x5ef77f(0x444)]??!![])&&(_0x14033e=_0x14033e[_0x5ef77f(0x796)]($dataItems));(_0x2aea9b[_0x5ef77f(0x30d)]??!![])&&(_0x14033e=_0x14033e[_0x5ef77f(0x796)]($dataWeapons));if(_0x2aea9b[_0x5ef77f(0x803)]??!![]){if(_0x5ef77f(0x4f1)!==_0x5ef77f(0x4f1)){function _0x9c9ea0(){const _0xa48e7a=_0x5ef77f;_0x77bccf[_0xa48e7a(0x703)]['Sprite_Button_updateOpacity'][_0xa48e7a(0x690)](this);}}else _0x14033e=_0x14033e[_0x5ef77f(0x796)]($dataArmors);}for(const _0x6dc0fd of _0x14033e){if(!_0x6dc0fd)continue;if(_0x6dc0fd[_0x5ef77f(0x271)][_0x5ef77f(0x452)]()<=0x0)continue;if(_0x6dc0fd[_0x5ef77f(0x271)][_0x5ef77f(0x612)](/-----/i))continue;this['gainItem'](_0x6dc0fd,_0x418a98);}},VisuMZ[_0x231f54(0x703)][_0x231f54(0x591)]=Game_Troop[_0x231f54(0x3fc)]['setup'],Game_Troop[_0x231f54(0x3fc)][_0x231f54(0x341)]=function(_0x30152d){const _0xd7799b=_0x231f54;$gameTemp[_0xd7799b(0x783)](),$gameTemp['applyForcedGameTroopSettingsCoreEngine'](_0x30152d),VisuMZ[_0xd7799b(0x703)]['Game_Troop_setup']['call'](this,_0x30152d);},VisuMZ['CoreEngine'][_0x231f54(0x85a)]=Game_Map['prototype'][_0x231f54(0x341)],Game_Map['prototype']['setup']=function(_0x5a4dbd){const _0x49beea=_0x231f54;VisuMZ[_0x49beea(0x703)]['Game_Map_setup'][_0x49beea(0x690)](this,_0x5a4dbd),this[_0x49beea(0x6de)](_0x5a4dbd);},Game_Map[_0x231f54(0x3fc)][_0x231f54(0x6de)]=function(){const _0x337d10=_0x231f54;this[_0x337d10(0x2b9)]=VisuMZ[_0x337d10(0x703)][_0x337d10(0x200)][_0x337d10(0x4ec)][_0x337d10(0x2c1)]||![];if($dataMap&&$dataMap[_0x337d10(0x23f)]){if($dataMap[_0x337d10(0x23f)][_0x337d10(0x612)](/<SHOW TILE SHADOWS>/i))this[_0x337d10(0x2b9)]=![];if($dataMap[_0x337d10(0x23f)][_0x337d10(0x612)](/<HIDE TILE SHADOWS>/i))this[_0x337d10(0x2b9)]=!![];}},Game_Map[_0x231f54(0x3fc)][_0x231f54(0x3a4)]=function(){const _0x4501f5=_0x231f54;if(this[_0x4501f5(0x2b9)]===undefined)this[_0x4501f5(0x6de)]();return this[_0x4501f5(0x2b9)];},VisuMZ[_0x231f54(0x703)][_0x231f54(0x2f8)]=Game_Character[_0x231f54(0x3fc)]['processMoveCommand'],Game_Character['prototype']['processMoveCommand']=function(_0x14340b){const _0xbeaaae=_0x231f54;try{if(_0xbeaaae(0x516)!=='PFZct')VisuMZ[_0xbeaaae(0x703)][_0xbeaaae(0x2f8)][_0xbeaaae(0x690)](this,_0x14340b);else{function _0x91d5db(){const _0x4aef93=_0xbeaaae;return _0x5736ef[_0x4aef93(0x807)][_0x4aef93(0x773)][_0x4aef93(0x690)](this);}}}catch(_0x108d31){if(_0xbeaaae(0x7e0)!==_0xbeaaae(0x7e0)){function _0x5eddd7(){const _0x10447e=_0xbeaaae;return _0x35b7cc[_0x10447e(0x703)][_0x10447e(0x754)][_0x10447e(0x690)](this);}}else{if($gameTemp[_0xbeaaae(0x841)]())console[_0xbeaaae(0x734)](_0x108d31);}}},Game_Player['prototype'][_0x231f54(0x437)]=function(){const _0x3c147=_0x231f54,_0x3dc701=$gameMap['encounterStep']();this[_0x3c147(0x696)]=Math[_0x3c147(0x69c)](_0x3dc701)+Math[_0x3c147(0x69c)](_0x3dc701)+this[_0x3c147(0x78e)]();},Game_Player[_0x231f54(0x3fc)][_0x231f54(0x78e)]=function(){const _0x37b8c0=_0x231f54;return $dataMap&&$dataMap[_0x37b8c0(0x23f)]&&$dataMap[_0x37b8c0(0x23f)][_0x37b8c0(0x612)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x37b8c0(0x703)][_0x37b8c0(0x200)][_0x37b8c0(0x4ec)][_0x37b8c0(0x769)];},VisuMZ[_0x231f54(0x703)][_0x231f54(0x453)]=Game_Event[_0x231f54(0x3fc)][_0x231f54(0x5c0)],Game_Event[_0x231f54(0x3fc)][_0x231f54(0x5c0)]=function(_0x27e3b7,_0x59b790){const _0x263276=_0x231f54;return this[_0x263276(0x284)]()?this[_0x263276(0x5a4)](_0x27e3b7,_0x59b790):VisuMZ[_0x263276(0x703)][_0x263276(0x453)]['call'](this,_0x27e3b7,_0x59b790);},Game_Event[_0x231f54(0x3fc)][_0x231f54(0x284)]=function(){const _0x57f35a=_0x231f54;return VisuMZ[_0x57f35a(0x703)][_0x57f35a(0x200)]['QoL']['SmartEventCollisionPriority'];},Game_Event[_0x231f54(0x3fc)][_0x231f54(0x5a4)]=function(_0x168752,_0x28af73){const _0x2c051b=_0x231f54;if(!this[_0x2c051b(0x475)]())return![];else{const _0x2fdba0=$gameMap[_0x2c051b(0x296)](_0x168752,_0x28af73)[_0x2c051b(0x717)](_0x2851bd=>_0x2851bd[_0x2c051b(0x475)]());return _0x2fdba0[_0x2c051b(0x533)]>0x0;}},VisuMZ['CoreEngine'][_0x231f54(0x1e3)]=Game_Interpreter[_0x231f54(0x3fc)]['command105'],Game_Interpreter[_0x231f54(0x3fc)][_0x231f54(0x1c5)]=function(_0x4378be){const _0x382577=_0x231f54,_0x68b237=this['getCombinedScrollingText']();if(_0x68b237[_0x382577(0x612)](/\/\/[ ]SCRIPT[ ]CALL/i))return this['runCombinedScrollingTextAsCode'](_0x68b237);else{if(_0x382577(0x695)===_0x382577(0x4e0)){function _0x400433(){return 0x0;}}else return VisuMZ['CoreEngine'][_0x382577(0x1e3)][_0x382577(0x690)](this,_0x4378be);}},Game_Interpreter[_0x231f54(0x3fc)][_0x231f54(0x32e)]=function(){const _0x147fd6=_0x231f54;let _0x383c80='',_0x4574f9=this[_0x147fd6(0x2cf)]+0x1;while(this[_0x147fd6(0x550)][_0x4574f9]&&this['_list'][_0x4574f9][_0x147fd6(0x3f8)]===0x195){if(_0x147fd6(0x5ca)===_0x147fd6(0x5ca))_0x383c80+=this[_0x147fd6(0x550)][_0x4574f9][_0x147fd6(0x266)][0x0]+'\x0a',_0x4574f9++;else{function _0x42449c(){this['setAttack']();}}}return _0x383c80;},Game_Interpreter[_0x231f54(0x3fc)][_0x231f54(0x1db)]=function(_0x53749a){const _0x5c3d88=_0x231f54;try{eval(_0x53749a);}catch(_0x5753d6){if(_0x5c3d88(0x793)===_0x5c3d88(0x793))$gameTemp[_0x5c3d88(0x841)]()&&(console[_0x5c3d88(0x734)]('Show\x20Scrolling\x20Text\x20Script\x20Error'),console[_0x5c3d88(0x734)](_0x5753d6));else{function _0x4de6e9(){return this['_anchor'];}}}return!![];},VisuMZ[_0x231f54(0x703)][_0x231f54(0x215)]=Game_Interpreter[_0x231f54(0x3fc)][_0x231f54(0x7d0)],Game_Interpreter[_0x231f54(0x3fc)][_0x231f54(0x7d0)]=function(_0x29753b){const _0x4b6395=_0x231f54;try{if(_0x4b6395(0x5e1)!==_0x4b6395(0x5e1)){function _0x386473(){const _0x193e0e=_0x4b6395;this[_0x193e0e(0x3af)](_0x5c306d[_0x193e0e(0x241)](),_0x7b2289,_0x41f007,_0x4440d5);}}else VisuMZ[_0x4b6395(0x703)]['Game_Interpreter_command111']['call'](this,_0x29753b);}catch(_0x40442e){$gameTemp['isPlaytest']()&&(console[_0x4b6395(0x734)](_0x4b6395(0x21f)),console[_0x4b6395(0x734)](_0x40442e)),this[_0x4b6395(0x204)]();}return!![];},VisuMZ[_0x231f54(0x703)]['Game_Interpreter_command122']=Game_Interpreter[_0x231f54(0x3fc)][_0x231f54(0x247)],Game_Interpreter[_0x231f54(0x3fc)][_0x231f54(0x247)]=function(_0x731cfc){const _0x587ef5=_0x231f54;try{VisuMZ[_0x587ef5(0x703)][_0x587ef5(0x5df)][_0x587ef5(0x690)](this,_0x731cfc);}catch(_0x487966){if($gameTemp[_0x587ef5(0x841)]()){if(_0x587ef5(0x1f3)===_0x587ef5(0x491)){function _0xabd72a(){var _0x840fa1=_0x34a1ab(_0x16a162['$1']);if(_0x840fa1===0x0)_0x840fa1=_0x19a4c3['MAX_SAFE_INTEGER'];_0x32ee37=_0x2f1176['max'](_0x49b2fb,_0x840fa1);}}else console[_0x587ef5(0x734)](_0x587ef5(0x844)),console[_0x587ef5(0x734)](_0x487966);}}return!![];},VisuMZ[_0x231f54(0x703)][_0x231f54(0x715)]=Game_Interpreter[_0x231f54(0x3fc)][_0x231f54(0x745)],Game_Interpreter[_0x231f54(0x3fc)][_0x231f54(0x745)]=function(){const _0x1446b0=_0x231f54;try{VisuMZ['CoreEngine'][_0x1446b0(0x715)][_0x1446b0(0x690)](this);}catch(_0x2ac0d0){$gameTemp[_0x1446b0(0x841)]()&&(console[_0x1446b0(0x734)](_0x1446b0(0x225)),console[_0x1446b0(0x734)](_0x2ac0d0));}return!![];},VisuMZ[_0x231f54(0x703)][_0x231f54(0x1b6)]=Game_Interpreter['prototype']['command357'],Game_Interpreter[_0x231f54(0x3fc)][_0x231f54(0x872)]=function(_0x13f9fa){const _0x246d8d=_0x231f54;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ['CoreEngine']['Game_Interpreter_PluginCommand'][_0x246d8d(0x690)](this,_0x13f9fa);},Scene_Base['prototype'][_0x231f54(0x1ec)]=function(){const _0x235782=_0x231f54;return VisuMZ['CoreEngine'][_0x235782(0x200)]['UI'][_0x235782(0x2a6)];},Scene_Base[_0x231f54(0x3fc)]['isBottomHelpMode']=function(){const _0x196266=_0x231f54;return VisuMZ[_0x196266(0x703)][_0x196266(0x200)]['UI'][_0x196266(0x190)];},Scene_Base[_0x231f54(0x3fc)][_0x231f54(0x569)]=function(){const _0xbcb2aa=_0x231f54;return VisuMZ[_0xbcb2aa(0x703)][_0xbcb2aa(0x200)]['UI']['BottomButtons'];},Scene_Base['prototype'][_0x231f54(0x281)]=function(){const _0x1a10dc=_0x231f54;return VisuMZ[_0x1a10dc(0x703)][_0x1a10dc(0x200)]['UI']['RightMenus'];},Scene_Base[_0x231f54(0x3fc)][_0x231f54(0x605)]=function(){const _0x173214=_0x231f54;return VisuMZ['CoreEngine'][_0x173214(0x200)]['UI']['CommandWidth'];},Scene_Base[_0x231f54(0x3fc)][_0x231f54(0x314)]=function(){const _0x4ff3e2=_0x231f54;return VisuMZ[_0x4ff3e2(0x703)]['Settings']['UI'][_0x4ff3e2(0x59b)];},Scene_Base[_0x231f54(0x3fc)][_0x231f54(0x431)]=function(){const _0x4dbcb9=_0x231f54;return VisuMZ[_0x4dbcb9(0x703)][_0x4dbcb9(0x200)]['Window'][_0x4dbcb9(0x3d6)];},VisuMZ[_0x231f54(0x703)]['Scene_Base_createWindowLayer']=Scene_Base[_0x231f54(0x3fc)][_0x231f54(0x72e)],Scene_Base[_0x231f54(0x3fc)][_0x231f54(0x72e)]=function(){const _0x3d2030=_0x231f54;VisuMZ[_0x3d2030(0x703)][_0x3d2030(0x248)][_0x3d2030(0x690)](this),this[_0x3d2030(0x4e9)](),this[_0x3d2030(0x389)]['x']=Math[_0x3d2030(0x64c)](this[_0x3d2030(0x389)]['x']),this['_windowLayer']['y']=Math[_0x3d2030(0x64c)](this[_0x3d2030(0x389)]['y']);},Scene_Base[_0x231f54(0x3fc)][_0x231f54(0x4e9)]=function(){},Scene_Base[_0x231f54(0x3fc)][_0x231f54(0x417)]=function(){const _0xbb753e=_0x231f54;return TextManager['getInputMultiButtonStrings'](_0xbb753e(0x30f),_0xbb753e(0x7dd));},Scene_Base['prototype'][_0x231f54(0x28e)]=function(){const _0x23191a=_0x231f54;return TextManager[_0x23191a(0x6a8)]('tab');},Scene_Base[_0x231f54(0x3fc)][_0x231f54(0x1b9)]=function(){const _0x4cd0c2=_0x231f54;return TextManager['getInputButtonString'](_0x4cd0c2(0x5e8));},Scene_Base['prototype'][_0x231f54(0x1e9)]=function(){const _0x2f504f=_0x231f54;return TextManager[_0x2f504f(0x6a8)]('ok');},Scene_Base['prototype']['buttonAssistKey5']=function(){const _0x2f143d=_0x231f54;return TextManager[_0x2f143d(0x6a8)]('cancel');},Scene_Base['prototype'][_0x231f54(0x633)]=function(){const _0x1d608a=_0x231f54;return this[_0x1d608a(0x269)]&&this[_0x1d608a(0x269)][_0x1d608a(0x3c7)]?TextManager[_0x1d608a(0x57a)]:'';},Scene_Base[_0x231f54(0x3fc)]['buttonAssistText2']=function(){return'';},Scene_Base[_0x231f54(0x3fc)][_0x231f54(0x410)]=function(){return'';},Scene_Base[_0x231f54(0x3fc)][_0x231f54(0x1f6)]=function(){return TextManager['buttonAssistOk'];},Scene_Base[_0x231f54(0x3fc)]['buttonAssistText5']=function(){const _0x5168d9=_0x231f54;return TextManager[_0x5168d9(0x746)];},Scene_Base[_0x231f54(0x3fc)][_0x231f54(0x406)]=function(){return 0x0;},Scene_Base['prototype'][_0x231f54(0x316)]=function(){return 0x0;},Scene_Base[_0x231f54(0x3fc)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base['prototype']['buttonAssistOffset4']=function(){return 0x0;},Scene_Base['prototype'][_0x231f54(0x1ff)]=function(){return 0x0;},VisuMZ[_0x231f54(0x703)][_0x231f54(0x429)]=Scene_Boot[_0x231f54(0x3fc)][_0x231f54(0x2c6)],Scene_Boot[_0x231f54(0x3fc)][_0x231f54(0x2c6)]=function(){const _0x5f0d51=_0x231f54;VisuMZ[_0x5f0d51(0x703)]['Scene_Boot_loadSystemImages'][_0x5f0d51(0x690)](this),this[_0x5f0d51(0x402)]();},Scene_Boot['prototype'][_0x231f54(0x402)]=function(){const _0x41d925=_0x231f54,_0x58ef44=['animations',_0x41d925(0x57b),_0x41d925(0x3b2),_0x41d925(0x218),'enemies',_0x41d925(0x4e4),'parallaxes',_0x41d925(0x427),'sv_actors',_0x41d925(0x32c),_0x41d925(0x2c4),_0x41d925(0x213),_0x41d925(0x352),_0x41d925(0x6d5)];for(const _0x5ed7db of _0x58ef44){if(_0x41d925(0x2e5)==='azdKw'){function _0x47c4b4(){return 0x0;}}else{const _0xa52210=VisuMZ[_0x41d925(0x703)][_0x41d925(0x200)]['ImgLoad'][_0x5ed7db],_0x2479dd=_0x41d925(0x7ab)['format'](_0x5ed7db);for(const _0x4eed73 of _0xa52210){ImageManager[_0x41d925(0x530)](_0x2479dd,_0x4eed73);}}}},VisuMZ[_0x231f54(0x703)]['Scene_Boot_startNormalGame']=Scene_Boot[_0x231f54(0x3fc)][_0x231f54(0x592)],Scene_Boot[_0x231f54(0x3fc)][_0x231f54(0x592)]=function(){const _0x2ea8e0=_0x231f54;if(Utils[_0x2ea8e0(0x3c8)](_0x2ea8e0(0x42c))&&VisuMZ['CoreEngine'][_0x2ea8e0(0x200)][_0x2ea8e0(0x4ec)][_0x2ea8e0(0x1f8)])this[_0x2ea8e0(0x320)]();else{if(_0x2ea8e0(0x662)!=='yUzNf')VisuMZ[_0x2ea8e0(0x703)]['Scene_Boot_startNormalGame'][_0x2ea8e0(0x690)](this);else{function _0x2bbb0d(){const _0x4be265=_0x2ea8e0;_0x4c90da[_0x4be265(0x3f1)](_0xaf554,_0x3de03d);const _0x26f316=_0x21a15f['value']||0x0;_0x1d7b72['gainGold'](_0x26f316);}}}},Scene_Boot['prototype'][_0x231f54(0x320)]=function(){const _0x3e501b=_0x231f54;DataManager[_0x3e501b(0x73b)](),SceneManager['goto'](Scene_Map);},Scene_Boot['prototype']['adjustBoxSize']=function(){const _0x32935f=_0x231f54,_0x1a112e=$dataSystem[_0x32935f(0x390)][_0x32935f(0x47f)],_0x4adc28=$dataSystem[_0x32935f(0x390)][_0x32935f(0x1c9)],_0x37fa12=VisuMZ[_0x32935f(0x703)][_0x32935f(0x200)]['UI'][_0x32935f(0x595)];Graphics['boxWidth']=_0x1a112e-_0x37fa12*0x2,Graphics[_0x32935f(0x485)]=_0x4adc28-_0x37fa12*0x2,this[_0x32935f(0x820)]();},VisuMZ[_0x231f54(0x703)][_0x231f54(0x55c)]=Scene_Boot['prototype']['updateDocumentTitle'],Scene_Boot[_0x231f54(0x3fc)][_0x231f54(0x891)]=function(){const _0xe64de0=_0x231f54;this['isFullDocumentTitle']()?this[_0xe64de0(0x3ec)]():VisuMZ[_0xe64de0(0x703)][_0xe64de0(0x55c)][_0xe64de0(0x690)](this);},Scene_Boot[_0x231f54(0x3fc)]['isFullDocumentTitle']=function(){const _0x3672d5=_0x231f54;if(Scene_Title[_0x3672d5(0x43d)]==='')return![];if(Scene_Title['subtitle']===_0x3672d5(0x77d))return![];if(Scene_Title[_0x3672d5(0x2a5)]==='')return![];if(Scene_Title[_0x3672d5(0x2a5)]===_0x3672d5(0x367))return![];return!![];},Scene_Boot[_0x231f54(0x3fc)][_0x231f54(0x3ec)]=function(){const _0x917efe=_0x231f54,_0xf23f7=$dataSystem[_0x917efe(0x2d2)],_0x210845=Scene_Title[_0x917efe(0x43d)]||'',_0x184000=Scene_Title['version']||'',_0x231a73=VisuMZ[_0x917efe(0x703)][_0x917efe(0x200)][_0x917efe(0x2f9)][_0x917efe(0x45a)][_0x917efe(0x870)],_0x3473a6=_0x231a73[_0x917efe(0x333)](_0xf23f7,_0x210845,_0x184000);document[_0x917efe(0x353)]=_0x3473a6;},Scene_Boot[_0x231f54(0x3fc)]['determineSideButtonLayoutValid']=function(){const _0x580f5a=_0x231f54;if(VisuMZ[_0x580f5a(0x703)][_0x580f5a(0x200)]['UI'][_0x580f5a(0x377)]){const _0x4310e5=Graphics[_0x580f5a(0x346)]-Graphics['boxWidth']-VisuMZ[_0x580f5a(0x703)]['Settings']['UI'][_0x580f5a(0x595)]*0x2,_0xa8e14e=Sprite_Button[_0x580f5a(0x3fc)]['blockWidth']['call'](this)*0x4;if(_0x4310e5>=_0xa8e14e)SceneManager[_0x580f5a(0x4ca)](!![]);}},Scene_Title[_0x231f54(0x43d)]=VisuMZ['CoreEngine']['Settings'][_0x231f54(0x2f9)][_0x231f54(0x45a)][_0x231f54(0x77d)],Scene_Title[_0x231f54(0x2a5)]=VisuMZ[_0x231f54(0x703)][_0x231f54(0x200)][_0x231f54(0x2f9)]['Title'][_0x231f54(0x20b)],Scene_Title[_0x231f54(0x45d)]=VisuMZ[_0x231f54(0x703)]['Settings']['TitlePicButtons'],VisuMZ[_0x231f54(0x703)][_0x231f54(0x634)]=Scene_Title[_0x231f54(0x3fc)]['drawGameTitle'],Scene_Title['prototype'][_0x231f54(0x4ba)]=function(){const _0x460989=_0x231f54;VisuMZ[_0x460989(0x703)][_0x460989(0x200)][_0x460989(0x2f9)][_0x460989(0x45a)][_0x460989(0x4ba)][_0x460989(0x690)](this);if(Scene_Title[_0x460989(0x43d)]!==''&&Scene_Title[_0x460989(0x43d)]!=='Subtitle')this[_0x460989(0x477)]();if(Scene_Title[_0x460989(0x2a5)]!==''&&Scene_Title[_0x460989(0x2a5)]!==_0x460989(0x367))this[_0x460989(0x712)]();},Scene_Title['prototype']['drawGameSubtitle']=function(){const _0x3a919c=_0x231f54;VisuMZ[_0x3a919c(0x703)][_0x3a919c(0x200)][_0x3a919c(0x2f9)]['Title']['drawGameSubtitle'][_0x3a919c(0x690)](this);},Scene_Title[_0x231f54(0x3fc)][_0x231f54(0x712)]=function(){const _0x47f324=_0x231f54;VisuMZ['CoreEngine']['Settings'][_0x47f324(0x2f9)][_0x47f324(0x45a)][_0x47f324(0x712)][_0x47f324(0x690)](this);},Scene_Title[_0x231f54(0x3fc)]['createCommandWindow']=function(){const _0x2759a5=_0x231f54;this[_0x2759a5(0x223)]();const _0x4211e1=$dataSystem['titleCommandWindow'][_0x2759a5(0x312)],_0x2c0af3=this[_0x2759a5(0x708)]();this[_0x2759a5(0x54d)]=new Window_TitleCommand(_0x2c0af3),this[_0x2759a5(0x54d)][_0x2759a5(0x669)](_0x4211e1);const _0x604743=this[_0x2759a5(0x708)]();this[_0x2759a5(0x54d)][_0x2759a5(0x6a6)](_0x604743['x'],_0x604743['y'],_0x604743[_0x2759a5(0x346)],_0x604743[_0x2759a5(0x31f)]),this[_0x2759a5(0x6af)](this[_0x2759a5(0x54d)]);},Scene_Title[_0x231f54(0x3fc)][_0x231f54(0x4d8)]=function(){const _0x4ab26b=_0x231f54;if(this[_0x4ab26b(0x54d)])return this[_0x4ab26b(0x54d)][_0x4ab26b(0x657)]();else{if(_0x4ab26b(0x594)!==_0x4ab26b(0x652))return VisuMZ['CoreEngine'][_0x4ab26b(0x200)][_0x4ab26b(0x3ee)][_0x4ab26b(0x533)];else{function _0x12589b(){const _0x588413=_0x4ab26b;this['_number']=_0x3c1bff(_0x5f5316(this[_0x588413(0x302)])['slice'](0x0,-0x1)),this[_0x588413(0x302)]=_0x110821[_0x588413(0x565)](0x0,this[_0x588413(0x302)]),_0x409933['clear'](),this['refresh'](),_0x38be2f[_0x588413(0x503)](),this['select'](this[_0x588413(0x648)]-0x1);}}}},Scene_Title[_0x231f54(0x3fc)][_0x231f54(0x708)]=function(){const _0x1d8891=_0x231f54;return VisuMZ[_0x1d8891(0x703)]['Settings'][_0x1d8891(0x2f9)][_0x1d8891(0x45a)][_0x1d8891(0x326)][_0x1d8891(0x690)](this);},Scene_Title['prototype'][_0x231f54(0x223)]=function(){const _0x1dfecb=_0x231f54;for(const _0x51796f of Scene_Title[_0x1dfecb(0x45d)]){const _0x2e4cb6=new Sprite_TitlePictureButton(_0x51796f);this[_0x1dfecb(0x6ad)](_0x2e4cb6);}},VisuMZ[_0x231f54(0x703)]['Scene_Map_initialize']=Scene_Map[_0x231f54(0x3fc)]['initialize'],Scene_Map[_0x231f54(0x3fc)][_0x231f54(0x2b6)]=function(){const _0x45caba=_0x231f54;VisuMZ[_0x45caba(0x703)]['Scene_Map_initialize'][_0x45caba(0x690)](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine']();},VisuMZ[_0x231f54(0x703)]['Scene_Map_updateMainMultiply']=Scene_Map[_0x231f54(0x3fc)][_0x231f54(0x55e)],Scene_Map[_0x231f54(0x3fc)][_0x231f54(0x55e)]=function(){const _0x4d9887=_0x231f54;VisuMZ[_0x4d9887(0x703)]['Scene_Map_updateMainMultiply'][_0x4d9887(0x690)](this);if($gameTemp[_0x4d9887(0x5ed)]&&!$gameMessage[_0x4d9887(0x5fb)]()){if(_0x4d9887(0x868)===_0x4d9887(0x3f5)){function _0x3e908b(){const _0x5498d5=_0x4d9887;return _0x5731c0&&_0xf140cc[_0x5498d5(0x23f)]&&_0x1740ba['note'][_0x5498d5(0x612)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?_0x5e2564(_0x38ca3c['$1']):_0x5b538c['CoreEngine'][_0x5498d5(0x200)][_0x5498d5(0x4ec)]['EncounterRateMinimum'];}}else this[_0x4d9887(0x3fe)](),SceneManager['updateEffekseer']();}},Scene_Map[_0x231f54(0x3fc)][_0x231f54(0x66a)]=function(){const _0x2406ef=_0x231f54;Scene_Message[_0x2406ef(0x3fc)][_0x2406ef(0x66a)][_0x2406ef(0x690)](this);if(!SceneManager[_0x2406ef(0x2d5)](Scene_Battle)){if(_0x2406ef(0x466)===_0x2406ef(0x792)){function _0x34fa11(){const _0x389a41=_0x2406ef;if(!this['_animation'])return![];const _0x4beb27=this[_0x389a41(0x541)]['name']||'';if(_0x4beb27[_0x389a41(0x612)](/<MIRROR OFFSET X>/i))return!![];if(_0x4beb27[_0x389a41(0x612)](/<NO MIRROR OFFSET X>/i))return![];return _0x3996c7[_0x389a41(0x703)][_0x389a41(0x200)]['QoL']['AnimationMirrorOffset'];}}else this[_0x2406ef(0x508)][_0x2406ef(0x425)](),this[_0x2406ef(0x7a2)][_0x2406ef(0x255)](),this[_0x2406ef(0x389)][_0x2406ef(0x3c7)]=![],SceneManager[_0x2406ef(0x58f)]();}$gameScreen[_0x2406ef(0x37f)]();},VisuMZ[_0x231f54(0x703)][_0x231f54(0x68e)]=Scene_Map[_0x231f54(0x3fc)]['createMenuButton'],Scene_Map[_0x231f54(0x3fc)][_0x231f54(0x5b7)]=function(){const _0x334033=_0x231f54;VisuMZ[_0x334033(0x703)][_0x334033(0x68e)][_0x334033(0x690)](this),SceneManager[_0x334033(0x617)]()&&this[_0x334033(0x458)]();},Scene_Map[_0x231f54(0x3fc)][_0x231f54(0x458)]=function(){const _0x5eb558=_0x231f54;this[_0x5eb558(0x35f)]['x']=Graphics[_0x5eb558(0x3e3)]+0x4;},VisuMZ[_0x231f54(0x703)]['Scene_Map_updateScene']=Scene_Map[_0x231f54(0x3fc)][_0x231f54(0x4e5)],Scene_Map[_0x231f54(0x3fc)][_0x231f54(0x4e5)]=function(){const _0x25fa1a=_0x231f54;VisuMZ['CoreEngine'][_0x25fa1a(0x60d)][_0x25fa1a(0x690)](this),this[_0x25fa1a(0x5e6)]();},Scene_Map[_0x231f54(0x3fc)]['updateDashToggle']=function(){const _0x1595e5=_0x231f54;Input[_0x1595e5(0x6d1)](_0x1595e5(0x667))&&(ConfigManager[_0x1595e5(0x3c9)]=!ConfigManager[_0x1595e5(0x3c9)],ConfigManager['save']());},VisuMZ['CoreEngine']['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x231f54(0x3fc)][_0x231f54(0x765)],Scene_MenuBase[_0x231f54(0x3fc)]['helpAreaTop']=function(){const _0x113ef8=_0x231f54;let _0x5b4868=0x0;if(SceneManager[_0x113ef8(0x18d)]()){if(_0x113ef8(0x83c)==='doEyH'){function _0x5f0521(){const _0x25f85a=_0x113ef8;return this['isItem'](_0x5aeeb3)&&_0x46a5ea[_0x25f85a(0x624)]===0x2;}}else _0x5b4868=this[_0x113ef8(0x587)]();}else _0x5b4868=VisuMZ['CoreEngine'][_0x113ef8(0x852)][_0x113ef8(0x690)](this);return this['isMenuButtonAssistEnabled']()&&this[_0x113ef8(0x6c0)]()===_0x113ef8(0x33d)&&(_0x5b4868+=Window_ButtonAssist[_0x113ef8(0x3fc)][_0x113ef8(0x488)]()),_0x5b4868;},Scene_MenuBase[_0x231f54(0x3fc)]['helpAreaTopSideButtonLayout']=function(){const _0x3062af=_0x231f54;if(this[_0x3062af(0x5d5)]()){if(_0x3062af(0x55f)!==_0x3062af(0x86e))return this[_0x3062af(0x725)]();else{function _0x3481ba(){const _0x3520ef=_0x3062af;this[_0x3520ef(0x4d4)](_0x58bc4a[_0x3520ef(0x364)](this[_0x3520ef(0x2fb)](),0x0));}}}else return 0x0;},VisuMZ['CoreEngine'][_0x231f54(0x7af)]=Scene_MenuBase['prototype']['mainAreaTop'],Scene_MenuBase['prototype'][_0x231f54(0x547)]=function(){const _0xf9791b=_0x231f54;return SceneManager[_0xf9791b(0x18d)]()?this[_0xf9791b(0x265)]():VisuMZ[_0xf9791b(0x703)][_0xf9791b(0x7af)]['call'](this);},Scene_MenuBase['prototype']['mainAreaTopSideButtonLayout']=function(){const _0x140ac6=_0x231f54;return!this['isBottomHelpMode']()?this[_0x140ac6(0x1f5)]():0x0;},VisuMZ['CoreEngine'][_0x231f54(0x497)]=Scene_MenuBase[_0x231f54(0x3fc)][_0x231f54(0x3a2)],Scene_MenuBase[_0x231f54(0x3fc)][_0x231f54(0x3a2)]=function(){const _0x299709=_0x231f54;let _0x364642=0x0;return SceneManager[_0x299709(0x18d)]()?_0x364642=this[_0x299709(0x7f1)]():_0x364642=VisuMZ[_0x299709(0x703)][_0x299709(0x497)][_0x299709(0x690)](this),this[_0x299709(0x599)]()&&this[_0x299709(0x6c0)]()!==_0x299709(0x5be)&&(_0x364642-=Window_ButtonAssist[_0x299709(0x3fc)][_0x299709(0x488)]()),_0x364642;},Scene_MenuBase[_0x231f54(0x3fc)]['mainAreaHeightSideButtonLayout']=function(){const _0x508c67=_0x231f54;return Graphics[_0x508c67(0x485)]-this['helpAreaHeight']();},VisuMZ[_0x231f54(0x703)][_0x231f54(0x62f)]=Scene_MenuBase[_0x231f54(0x3fc)][_0x231f54(0x4ad)],Scene_MenuBase[_0x231f54(0x3fc)][_0x231f54(0x4ad)]=function(){const _0x331bbb=_0x231f54;this[_0x331bbb(0x864)]=new PIXI[(_0x331bbb(0x2ee))][(_0x331bbb(0x359))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this['_backgroundSprite']['bitmap']=SceneManager[_0x331bbb(0x829)](),this[_0x331bbb(0x26a)]['filters']=[this[_0x331bbb(0x864)]],this[_0x331bbb(0x6ad)](this[_0x331bbb(0x26a)]),this[_0x331bbb(0x574)](0xc0),this[_0x331bbb(0x574)](this[_0x331bbb(0x375)]()),this[_0x331bbb(0x395)]();},Scene_MenuBase[_0x231f54(0x3fc)]['getBackgroundOpacity']=function(){const _0x1b17c6=_0x231f54,_0x385f29=String(this[_0x1b17c6(0x1a5)][_0x1b17c6(0x271)]),_0x2904f1=this['getCustomBackgroundSettings'](_0x385f29);return _0x2904f1?_0x2904f1[_0x1b17c6(0x36a)]:0xc0;},Scene_MenuBase['prototype']['createCustomBackgroundImages']=function(){const _0x1812c4=_0x231f54,_0x8277b0=String(this[_0x1812c4(0x1a5)][_0x1812c4(0x271)]),_0x5ec6e7=this[_0x1812c4(0x6aa)](_0x8277b0);if(_0x5ec6e7&&(_0x5ec6e7[_0x1812c4(0x3f0)]!==''||_0x5ec6e7['BgFilename2']!=='')){if(_0x1812c4(0x52a)!==_0x1812c4(0x52a)){function _0x52d7c3(){return this['_digitGroupingEx'];}}else this[_0x1812c4(0x365)]=new Sprite(ImageManager[_0x1812c4(0x2f1)](_0x5ec6e7[_0x1812c4(0x3f0)])),this[_0x1812c4(0x436)]=new Sprite(ImageManager[_0x1812c4(0x798)](_0x5ec6e7[_0x1812c4(0x496)])),this[_0x1812c4(0x6ad)](this[_0x1812c4(0x365)]),this[_0x1812c4(0x6ad)](this[_0x1812c4(0x436)]),this[_0x1812c4(0x365)][_0x1812c4(0x5af)]['addLoadListener'](this[_0x1812c4(0x24e)][_0x1812c4(0x64a)](this,this[_0x1812c4(0x365)])),this[_0x1812c4(0x436)]['bitmap'][_0x1812c4(0x2b3)](this[_0x1812c4(0x24e)]['bind'](this,this[_0x1812c4(0x436)]));}},Scene_MenuBase[_0x231f54(0x3fc)][_0x231f54(0x6aa)]=function(_0x7e637){const _0x51e6e4=_0x231f54;return VisuMZ['CoreEngine'][_0x51e6e4(0x200)][_0x51e6e4(0x381)][_0x7e637]||VisuMZ[_0x51e6e4(0x703)][_0x51e6e4(0x200)][_0x51e6e4(0x381)][_0x51e6e4(0x57d)];},Scene_MenuBase[_0x231f54(0x3fc)]['adjustSprite']=function(_0x44dd73){const _0xad368f=_0x231f54;this[_0xad368f(0x3e9)](_0x44dd73),this[_0xad368f(0x84d)](_0x44dd73);},VisuMZ[_0x231f54(0x703)][_0x231f54(0x44b)]=Scene_MenuBase['prototype'][_0x231f54(0x654)],Scene_MenuBase[_0x231f54(0x3fc)][_0x231f54(0x654)]=function(){const _0x3e347b=_0x231f54;VisuMZ[_0x3e347b(0x703)]['Scene_MenuBase_createCancelButton'][_0x3e347b(0x690)](this),SceneManager[_0x3e347b(0x617)]()&&this[_0x3e347b(0x524)]();},Scene_MenuBase[_0x231f54(0x3fc)][_0x231f54(0x524)]=function(){const _0x117278=_0x231f54;this[_0x117278(0x226)]['x']=Graphics[_0x117278(0x3e3)]+0x4;},VisuMZ[_0x231f54(0x703)]['Scene_MenuBase_createPageButtons']=Scene_MenuBase['prototype'][_0x231f54(0x2e9)],Scene_MenuBase[_0x231f54(0x3fc)][_0x231f54(0x2e9)]=function(){const _0x1b7992=_0x231f54;VisuMZ[_0x1b7992(0x703)]['Scene_MenuBase_createPageButtons'][_0x1b7992(0x690)](this),SceneManager[_0x1b7992(0x617)]()&&this[_0x1b7992(0x763)]();},Scene_MenuBase[_0x231f54(0x3fc)][_0x231f54(0x763)]=function(){const _0x4f3a0f=_0x231f54;this[_0x4f3a0f(0x269)]['x']=-0x1*(this['_pageupButton'][_0x4f3a0f(0x346)]+this[_0x4f3a0f(0x615)]['width']+0x8),this[_0x4f3a0f(0x615)]['x']=-0x1*(this[_0x4f3a0f(0x615)][_0x4f3a0f(0x346)]+0x4);},Scene_MenuBase[_0x231f54(0x3fc)][_0x231f54(0x599)]=function(){const _0x220631=_0x231f54;return VisuMZ[_0x220631(0x703)][_0x220631(0x200)][_0x220631(0x859)][_0x220631(0x38b)];},Scene_MenuBase[_0x231f54(0x3fc)]['getButtonAssistLocation']=function(){const _0x264f5c=_0x231f54;if(SceneManager[_0x264f5c(0x617)]()||SceneManager[_0x264f5c(0x1ee)]())return VisuMZ[_0x264f5c(0x703)][_0x264f5c(0x200)]['ButtonAssist'][_0x264f5c(0x3cd)];else{if(_0x264f5c(0x85c)!==_0x264f5c(0x779))return'button';else{function _0x169b44(){const _0x1071ba=_0x264f5c;return _0x539388[_0x1071ba(0x242)]['call'](this);}}}},Scene_MenuBase[_0x231f54(0x3fc)][_0x231f54(0x4e9)]=function(){const _0x5809ca=_0x231f54;if(!this[_0x5809ca(0x599)]())return;const _0x43dde1=this[_0x5809ca(0x782)]();this[_0x5809ca(0x469)]=new Window_ButtonAssist(_0x43dde1),this[_0x5809ca(0x6af)](this[_0x5809ca(0x469)]);},Scene_MenuBase[_0x231f54(0x3fc)][_0x231f54(0x782)]=function(){const _0x13c45d=_0x231f54;if(this[_0x13c45d(0x6c0)]()===_0x13c45d(0x5be)){if(_0x13c45d(0x5ba)!==_0x13c45d(0x536))return this[_0x13c45d(0x2e8)]();else{function _0x36460a(){_0x57561a['prototype']['createBackground']['call'](this);}}}else{if(_0x13c45d(0x784)===_0x13c45d(0x784))return this[_0x13c45d(0x63c)]();else{function _0x2afae0(){this['createFauxAnimation'](_0x518a26);}}}},Scene_MenuBase[_0x231f54(0x3fc)][_0x231f54(0x2e8)]=function(){const _0x2c175a=_0x231f54,_0x4c425e=ConfigManager[_0x2c175a(0x6e2)]?(Sprite_Button[_0x2c175a(0x3fc)][_0x2c175a(0x63e)]()+0x6)*0x2:0x0,_0x1cdb5d=this[_0x2c175a(0x7ea)](),_0x56d7a0=Graphics[_0x2c175a(0x3e3)]-_0x4c425e*0x2,_0x5ca72c=this[_0x2c175a(0x314)]();return new Rectangle(_0x4c425e,_0x1cdb5d,_0x56d7a0,_0x5ca72c);},Scene_MenuBase[_0x231f54(0x3fc)][_0x231f54(0x63c)]=function(){const _0x4eafbc=_0x231f54,_0x11d8c4=Graphics[_0x4eafbc(0x3e3)],_0x2c87f5=Window_ButtonAssist['prototype']['lineHeight'](),_0xa1ca16=0x0;let _0x8a5147=0x0;return this[_0x4eafbc(0x6c0)]()===_0x4eafbc(0x33d)?_0x8a5147=0x0:_0x8a5147=Graphics[_0x4eafbc(0x485)]-_0x2c87f5,new Rectangle(_0xa1ca16,_0x8a5147,_0x11d8c4,_0x2c87f5);},Scene_Menu[_0x231f54(0x807)]=VisuMZ[_0x231f54(0x703)][_0x231f54(0x200)][_0x231f54(0x2f9)][_0x231f54(0x31e)],VisuMZ['CoreEngine'][_0x231f54(0x583)]=Scene_Menu[_0x231f54(0x3fc)]['create'],Scene_Menu[_0x231f54(0x3fc)][_0x231f54(0x4e6)]=function(){const _0x1bdc19=_0x231f54;VisuMZ[_0x1bdc19(0x703)]['Scene_Menu_create'][_0x1bdc19(0x690)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Menu[_0x231f54(0x3fc)]['setCoreEngineUpdateWindowBg']=function(){const _0x364d44=_0x231f54;if(this[_0x364d44(0x54d)]){if('aVSZW'===_0x364d44(0x6a7)){function _0x4de418(){const _0x5e7bf5=_0x364d44;return this[_0x5e7bf5(0x197)]();}}else this[_0x364d44(0x54d)][_0x364d44(0x669)](Scene_Menu[_0x364d44(0x807)]['CommandBgType']);}this[_0x364d44(0x5ec)]&&this[_0x364d44(0x5ec)][_0x364d44(0x669)](Scene_Menu[_0x364d44(0x807)]['GoldBgType']);if(this[_0x364d44(0x7e1)]){if(_0x364d44(0x86d)===_0x364d44(0x857)){function _0x3fa465(){const _0x5d14a7=_0x364d44;_0x42423c[_0x5d14a7(0x7f6)](),this[_0x5d14a7(0x500)]();}}else this[_0x364d44(0x7e1)][_0x364d44(0x669)](Scene_Menu['layoutSettings'][_0x364d44(0x392)]);}},Scene_Menu[_0x231f54(0x3fc)][_0x231f54(0x708)]=function(){const _0xacdd55=_0x231f54;return Scene_Menu[_0xacdd55(0x807)][_0xacdd55(0x326)]['call'](this);},Scene_Menu[_0x231f54(0x3fc)][_0x231f54(0x66c)]=function(){const _0x23d568=_0x231f54;return Scene_Menu[_0x23d568(0x807)][_0x23d568(0x601)][_0x23d568(0x690)](this);},Scene_Menu[_0x231f54(0x3fc)][_0x231f54(0x412)]=function(){const _0x5aef7a=_0x231f54;return Scene_Menu[_0x5aef7a(0x807)][_0x5aef7a(0x39f)][_0x5aef7a(0x690)](this);},Scene_Item[_0x231f54(0x807)]=VisuMZ['CoreEngine'][_0x231f54(0x200)][_0x231f54(0x2f9)][_0x231f54(0x37a)],VisuMZ['CoreEngine'][_0x231f54(0x79b)]=Scene_Item['prototype']['create'],Scene_Item[_0x231f54(0x3fc)][_0x231f54(0x4e6)]=function(){const _0xd63a7b=_0x231f54;VisuMZ[_0xd63a7b(0x703)]['Scene_Item_create'][_0xd63a7b(0x690)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item[_0x231f54(0x3fc)][_0x231f54(0x85e)]=function(){const _0xdb2975=_0x231f54;if(this[_0xdb2975(0x4ce)]){if(_0xdb2975(0x46f)==='EnBpS')this[_0xdb2975(0x4ce)][_0xdb2975(0x669)](Scene_Item[_0xdb2975(0x807)][_0xdb2975(0x318)]);else{function _0x6185fe(){return!![];}}}this[_0xdb2975(0x1ac)]&&this['_categoryWindow'][_0xdb2975(0x669)](Scene_Item[_0xdb2975(0x807)][_0xdb2975(0x5de)]),this[_0xdb2975(0x70a)]&&this['_itemWindow'][_0xdb2975(0x669)](Scene_Item[_0xdb2975(0x807)]['ItemBgType']),this[_0xdb2975(0x41f)]&&this['_actorWindow'][_0xdb2975(0x669)](Scene_Item['layoutSettings'][_0xdb2975(0x4b0)]);},Scene_Item[_0x231f54(0x3fc)][_0x231f54(0x207)]=function(){const _0x656ccd=_0x231f54;return Scene_Item[_0x656ccd(0x807)][_0x656ccd(0x697)]['call'](this);},Scene_Item['prototype'][_0x231f54(0x449)]=function(){const _0x8e3c52=_0x231f54;return Scene_Item[_0x8e3c52(0x807)][_0x8e3c52(0x79d)][_0x8e3c52(0x690)](this);},Scene_Item[_0x231f54(0x3fc)][_0x231f54(0x4cc)]=function(){const _0x520070=_0x231f54;return Scene_Item[_0x520070(0x807)][_0x520070(0x7f8)]['call'](this);},Scene_Item[_0x231f54(0x3fc)]['actorWindowRect']=function(){const _0x54a0e0=_0x231f54;return Scene_Item[_0x54a0e0(0x807)][_0x54a0e0(0x773)][_0x54a0e0(0x690)](this);},Scene_Skill[_0x231f54(0x807)]=VisuMZ['CoreEngine'][_0x231f54(0x200)][_0x231f54(0x2f9)][_0x231f54(0x4bd)],VisuMZ[_0x231f54(0x703)][_0x231f54(0x2db)]=Scene_Skill['prototype'][_0x231f54(0x4e6)],Scene_Skill[_0x231f54(0x3fc)][_0x231f54(0x4e6)]=function(){const _0x11e4b3=_0x231f54;VisuMZ[_0x11e4b3(0x703)][_0x11e4b3(0x2db)]['call'](this),this[_0x11e4b3(0x85e)]();},Scene_Skill['prototype'][_0x231f54(0x85e)]=function(){const _0x3eae25=_0x231f54;this[_0x3eae25(0x4ce)]&&this['_helpWindow']['setBackgroundType'](Scene_Skill['layoutSettings'][_0x3eae25(0x318)]);this[_0x3eae25(0x220)]&&this[_0x3eae25(0x220)][_0x3eae25(0x669)](Scene_Skill[_0x3eae25(0x807)][_0x3eae25(0x5ae)]);if(this[_0x3eae25(0x7e1)]){if(_0x3eae25(0x3c6)!==_0x3eae25(0x49d))this[_0x3eae25(0x7e1)][_0x3eae25(0x669)](Scene_Skill['layoutSettings'][_0x3eae25(0x392)]);else{function _0x1bc444(){const _0x34ff10=_0x3eae25;this[_0x34ff10(0x4d4)]((_0x107c8b-_0x279bd1+_0x4e918b)%_0x47f778);}}}if(this[_0x3eae25(0x70a)]){if(_0x3eae25(0x217)!==_0x3eae25(0x450))this[_0x3eae25(0x70a)][_0x3eae25(0x669)](Scene_Skill[_0x3eae25(0x807)][_0x3eae25(0x760)]);else{function _0x567514(){const _0x3965ec=_0x3eae25,_0x175caf=this[_0x3965ec(0x2af)](_0x5bc003),_0x524eaa=this[_0x3965ec(0x66f)](_0x26ad8a),_0xe4b64=this[_0x3965ec(0x418)](_0x1162aa);return _0x175caf*(_0x524eaa-_0xe4b64);}}}this[_0x3eae25(0x41f)]&&this[_0x3eae25(0x41f)][_0x3eae25(0x669)](Scene_Skill[_0x3eae25(0x807)][_0x3eae25(0x4b0)]);},Scene_Skill[_0x231f54(0x3fc)][_0x231f54(0x207)]=function(){const _0x2f4a56=_0x231f54;return Scene_Skill[_0x2f4a56(0x807)][_0x2f4a56(0x697)][_0x2f4a56(0x690)](this);},Scene_Skill[_0x231f54(0x3fc)][_0x231f54(0x20e)]=function(){const _0x310c53=_0x231f54;return Scene_Skill[_0x310c53(0x807)][_0x310c53(0x1e0)]['call'](this);},Scene_Skill[_0x231f54(0x3fc)]['statusWindowRect']=function(){const _0x31affb=_0x231f54;return Scene_Skill[_0x31affb(0x807)][_0x31affb(0x39f)][_0x31affb(0x690)](this);},Scene_Skill[_0x231f54(0x3fc)][_0x231f54(0x4cc)]=function(){const _0x5f538a=_0x231f54;return Scene_Skill[_0x5f538a(0x807)][_0x5f538a(0x7f8)]['call'](this);},Scene_Skill[_0x231f54(0x3fc)][_0x231f54(0x1b4)]=function(){const _0x115ae3=_0x231f54;return Scene_Skill[_0x115ae3(0x807)]['ActorRect'][_0x115ae3(0x690)](this);},Scene_Equip['layoutSettings']=VisuMZ['CoreEngine'][_0x231f54(0x200)]['MenuLayout']['EquipMenu'],VisuMZ[_0x231f54(0x703)][_0x231f54(0x6e6)]=Scene_Equip[_0x231f54(0x3fc)][_0x231f54(0x4e6)],Scene_Equip[_0x231f54(0x3fc)][_0x231f54(0x4e6)]=function(){VisuMZ['CoreEngine']['Scene_Equip_create']['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip[_0x231f54(0x3fc)]['setCoreEngineUpdateWindowBg']=function(){const _0x39157e=_0x231f54;if(this[_0x39157e(0x4ce)]){if(_0x39157e(0x2ab)!==_0x39157e(0x637))this[_0x39157e(0x4ce)][_0x39157e(0x669)](Scene_Equip[_0x39157e(0x807)][_0x39157e(0x318)]);else{function _0xb616dd(){const _0x1ddc40=_0x39157e,_0x136c09=_0x1ddc40(0x567);this[_0x1ddc40(0x4d5)]=this[_0x1ddc40(0x4d5)]||{};if(this['_colorCache'][_0x136c09])return this[_0x1ddc40(0x4d5)][_0x136c09];const _0xd7fae5=_0x4f3d6e[_0x1ddc40(0x703)][_0x1ddc40(0x200)]['Color'][_0x1ddc40(0x287)];return this['getColorDataFromPluginParameters'](_0x136c09,_0xd7fae5);}}}if(this[_0x39157e(0x7e1)]){if('bIexo'==='cFbuQ'){function _0x2bb127(){const _0x26ba28=_0x39157e;_0x21d13c[_0x26ba28(0x703)][_0x26ba28(0x5c4)]['call'](this),_0x33f6de[_0x26ba28(0x501)](_0x26ba28(0x79a),this[_0x26ba28(0x77f)][_0x26ba28(0x64a)](this));}}else this['_statusWindow'][_0x39157e(0x669)](Scene_Equip[_0x39157e(0x807)][_0x39157e(0x392)]);}this[_0x39157e(0x54d)]&&this[_0x39157e(0x54d)][_0x39157e(0x669)](Scene_Equip['layoutSettings'][_0x39157e(0x2f0)]),this[_0x39157e(0x30b)]&&this[_0x39157e(0x30b)]['setBackgroundType'](Scene_Equip[_0x39157e(0x807)]['SlotBgType']),this[_0x39157e(0x70a)]&&this[_0x39157e(0x70a)]['setBackgroundType'](Scene_Equip[_0x39157e(0x807)][_0x39157e(0x760)]);},Scene_Equip[_0x231f54(0x3fc)][_0x231f54(0x207)]=function(){const _0x1a8ed5=_0x231f54;return Scene_Equip['layoutSettings']['HelpRect'][_0x1a8ed5(0x690)](this);},Scene_Equip[_0x231f54(0x3fc)][_0x231f54(0x412)]=function(){const _0x2415f8=_0x231f54;return Scene_Equip['layoutSettings'][_0x2415f8(0x39f)][_0x2415f8(0x690)](this);},Scene_Equip[_0x231f54(0x3fc)][_0x231f54(0x708)]=function(){const _0x5a8255=_0x231f54;return Scene_Equip['layoutSettings'][_0x5a8255(0x326)][_0x5a8255(0x690)](this);},Scene_Equip[_0x231f54(0x3fc)][_0x231f54(0x5fe)]=function(){const _0x1e97e8=_0x231f54;return Scene_Equip['layoutSettings'][_0x1e97e8(0x2d3)][_0x1e97e8(0x690)](this);},Scene_Equip['prototype'][_0x231f54(0x4cc)]=function(){const _0x12f89a=_0x231f54;return Scene_Equip[_0x12f89a(0x807)][_0x12f89a(0x7f8)]['call'](this);},Scene_Status[_0x231f54(0x807)]=VisuMZ[_0x231f54(0x703)][_0x231f54(0x200)][_0x231f54(0x2f9)][_0x231f54(0x88f)],VisuMZ[_0x231f54(0x703)][_0x231f54(0x866)]=Scene_Status[_0x231f54(0x3fc)][_0x231f54(0x4e6)],Scene_Status[_0x231f54(0x3fc)][_0x231f54(0x4e6)]=function(){const _0x4f7535=_0x231f54;VisuMZ[_0x4f7535(0x703)][_0x4f7535(0x866)]['call'](this),this[_0x4f7535(0x85e)]();},Scene_Status[_0x231f54(0x3fc)][_0x231f54(0x85e)]=function(){const _0x3a9957=_0x231f54;this[_0x3a9957(0x76c)]&&this[_0x3a9957(0x76c)]['setBackgroundType'](Scene_Status[_0x3a9957(0x807)][_0x3a9957(0x3a9)]),this['_statusWindow']&&this[_0x3a9957(0x7e1)]['setBackgroundType'](Scene_Status[_0x3a9957(0x807)]['StatusBgType']),this[_0x3a9957(0x6d7)]&&this[_0x3a9957(0x6d7)][_0x3a9957(0x669)](Scene_Status[_0x3a9957(0x807)][_0x3a9957(0x625)]),this[_0x3a9957(0x60f)]&&this['_statusEquipWindow'][_0x3a9957(0x669)](Scene_Status[_0x3a9957(0x807)][_0x3a9957(0x198)]);},Scene_Status[_0x231f54(0x3fc)][_0x231f54(0x6a5)]=function(){const _0xf8fec8=_0x231f54;return Scene_Status[_0xf8fec8(0x807)][_0xf8fec8(0x1ba)][_0xf8fec8(0x690)](this);},Scene_Status[_0x231f54(0x3fc)][_0x231f54(0x412)]=function(){const _0x594ab7=_0x231f54;return Scene_Status[_0x594ab7(0x807)][_0x594ab7(0x39f)][_0x594ab7(0x690)](this);},Scene_Status[_0x231f54(0x3fc)][_0x231f54(0x7f4)]=function(){const _0x2c89b8=_0x231f54;return Scene_Status['layoutSettings'][_0x2c89b8(0x2d9)]['call'](this);},Scene_Status[_0x231f54(0x3fc)]['statusEquipWindowRect']=function(){const _0x237109=_0x231f54;return Scene_Status[_0x237109(0x807)][_0x237109(0x7a7)][_0x237109(0x690)](this);},Scene_Options[_0x231f54(0x807)]=VisuMZ[_0x231f54(0x703)]['Settings'][_0x231f54(0x2f9)][_0x231f54(0x87a)],VisuMZ['CoreEngine']['Scene_Options_create']=Scene_Options[_0x231f54(0x3fc)][_0x231f54(0x4e6)],Scene_Options[_0x231f54(0x3fc)][_0x231f54(0x4e6)]=function(){const _0x49f099=_0x231f54;VisuMZ['CoreEngine']['Scene_Options_create'][_0x49f099(0x690)](this),this[_0x49f099(0x85e)]();},Scene_Options[_0x231f54(0x3fc)][_0x231f54(0x85e)]=function(){const _0x2ec864=_0x231f54;this[_0x2ec864(0x31d)]&&this[_0x2ec864(0x31d)][_0x2ec864(0x669)](Scene_Options[_0x2ec864(0x807)]['OptionsBgType']);},Scene_Options[_0x231f54(0x3fc)]['optionsWindowRect']=function(){const _0x5d102e=_0x231f54;return Scene_Options['layoutSettings'][_0x5d102e(0x4b4)]['call'](this);},Scene_Save[_0x231f54(0x807)]=VisuMZ[_0x231f54(0x703)][_0x231f54(0x200)]['MenuLayout'][_0x231f54(0x6fd)],Scene_Save[_0x231f54(0x3fc)][_0x231f54(0x4e6)]=function(){const _0xdcd71e=_0x231f54;Scene_File[_0xdcd71e(0x3fc)][_0xdcd71e(0x4e6)]['call'](this),this[_0xdcd71e(0x85e)]();},Scene_Save[_0x231f54(0x3fc)][_0x231f54(0x85e)]=function(){const _0xc18546=_0x231f54;this[_0xc18546(0x4ce)]&&this['_helpWindow'][_0xc18546(0x669)](Scene_Save[_0xc18546(0x807)][_0xc18546(0x318)]),this[_0xc18546(0x330)]&&this['_listWindow'][_0xc18546(0x669)](Scene_Save[_0xc18546(0x807)][_0xc18546(0x480)]);},Scene_Save['prototype'][_0x231f54(0x207)]=function(){const _0x24f701=_0x231f54;return Scene_Save[_0x24f701(0x807)][_0x24f701(0x697)][_0x24f701(0x690)](this);},Scene_Save[_0x231f54(0x3fc)][_0x231f54(0x2fa)]=function(){const _0x1c2cba=_0x231f54;return Scene_Save[_0x1c2cba(0x807)]['ListRect'][_0x1c2cba(0x690)](this);},Scene_Load[_0x231f54(0x807)]=VisuMZ[_0x231f54(0x703)]['Settings'][_0x231f54(0x2f9)][_0x231f54(0x201)],Scene_Load[_0x231f54(0x3fc)]['create']=function(){const _0x3654f2=_0x231f54;Scene_File[_0x3654f2(0x3fc)][_0x3654f2(0x4e6)][_0x3654f2(0x690)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load[_0x231f54(0x3fc)]['setCoreEngineUpdateWindowBg']=function(){const _0x1b0244=_0x231f54;if(this[_0x1b0244(0x4ce)]){if(_0x1b0244(0x22e)===_0x1b0244(0x22e))this[_0x1b0244(0x4ce)][_0x1b0244(0x669)](Scene_Load[_0x1b0244(0x807)][_0x1b0244(0x318)]);else{function _0x5bb09c(){const _0x55a8e4=_0x1b0244;return _0x51529d[_0x55a8e4(0x703)][_0x55a8e4(0x200)][_0x55a8e4(0x859)][_0x55a8e4(0x3cd)];}}}if(this[_0x1b0244(0x330)]){if(_0x1b0244(0x49f)===_0x1b0244(0x2ae)){function _0x575be9(){const _0x28ab34=_0x1b0244;let _0x2bea5d=_0x4df907[_0x3a17ec],_0x957ee1=this[_0x28ab34(0x4f5)](_0x2bea5d)[_0x28ab34(0x346)],_0x4eb84c=_0x1aad42[_0x28ab34(0x659)]((this[_0x28ab34(0x3e6)][_0x28ab34(0x346)]-_0x957ee1)/0x2);this[_0x28ab34(0x3af)](_0x2bea5d,_0x4eb84c,_0x4ff4ab),_0x4fb5f8+=this[_0x28ab34(0x488)]();}}else this[_0x1b0244(0x330)][_0x1b0244(0x669)](Scene_Load['layoutSettings']['ListBgType']);}},Scene_Load[_0x231f54(0x3fc)]['helpWindowRect']=function(){const _0x38857f=_0x231f54;return Scene_Load[_0x38857f(0x807)][_0x38857f(0x697)][_0x38857f(0x690)](this);},Scene_Load[_0x231f54(0x3fc)][_0x231f54(0x2fa)]=function(){const _0x39d644=_0x231f54;return Scene_Load[_0x39d644(0x807)]['ListRect'][_0x39d644(0x690)](this);},Scene_GameEnd[_0x231f54(0x807)]=VisuMZ[_0x231f54(0x703)]['Settings'][_0x231f54(0x2f9)][_0x231f54(0x3c5)],VisuMZ[_0x231f54(0x703)]['Scene_GameEnd_createBackground']=Scene_GameEnd['prototype'][_0x231f54(0x4ad)],Scene_GameEnd['prototype']['createBackground']=function(){const _0x417cea=_0x231f54;Scene_MenuBase[_0x417cea(0x3fc)]['createBackground'][_0x417cea(0x690)](this);},Scene_GameEnd[_0x231f54(0x3fc)][_0x231f54(0x582)]=function(){const _0x422cb8=_0x231f54,_0x5514c3=this[_0x422cb8(0x708)]();this[_0x422cb8(0x54d)]=new Window_GameEnd(_0x5514c3),this['_commandWindow'][_0x422cb8(0x3e5)]('cancel',this[_0x422cb8(0x29e)]['bind'](this)),this[_0x422cb8(0x6af)](this['_commandWindow']),this['_commandWindow'][_0x422cb8(0x669)](Scene_GameEnd[_0x422cb8(0x807)][_0x422cb8(0x2f0)]);},Scene_GameEnd[_0x231f54(0x3fc)][_0x231f54(0x708)]=function(){const _0x26b3bd=_0x231f54;return Scene_GameEnd[_0x26b3bd(0x807)][_0x26b3bd(0x326)][_0x26b3bd(0x690)](this);},Scene_Shop[_0x231f54(0x807)]=VisuMZ[_0x231f54(0x703)][_0x231f54(0x200)][_0x231f54(0x2f9)][_0x231f54(0x233)],VisuMZ[_0x231f54(0x703)][_0x231f54(0x55b)]=Scene_Shop['prototype'][_0x231f54(0x4e6)],Scene_Shop[_0x231f54(0x3fc)][_0x231f54(0x4e6)]=function(){const _0x2ae423=_0x231f54;VisuMZ[_0x2ae423(0x703)][_0x2ae423(0x55b)][_0x2ae423(0x690)](this),this[_0x2ae423(0x85e)]();},Scene_Shop[_0x231f54(0x3fc)]['setCoreEngineUpdateWindowBg']=function(){const _0x5c5b5e=_0x231f54;if(this['_helpWindow']){if(_0x5c5b5e(0x823)!==_0x5c5b5e(0x823)){function _0x4e117d(){const _0x49bef1=_0x5c5b5e;this['_statusEquipWindow'][_0x49bef1(0x669)](_0x5ef3d8['layoutSettings'][_0x49bef1(0x198)]);}}else this[_0x5c5b5e(0x4ce)]['setBackgroundType'](Scene_Shop[_0x5c5b5e(0x807)][_0x5c5b5e(0x318)]);}if(this[_0x5c5b5e(0x5ec)]){if(_0x5c5b5e(0x2f4)===_0x5c5b5e(0x2f4))this[_0x5c5b5e(0x5ec)][_0x5c5b5e(0x669)](Scene_Shop[_0x5c5b5e(0x807)][_0x5c5b5e(0x4af)]);else{function _0x561f66(){const _0x5e4bb8=_0x5c5b5e;return this['_fauxAnimationQueue'][_0x5e4bb8(0x5e8)]();}}}if(this['_commandWindow']){if(_0x5c5b5e(0x740)===_0x5c5b5e(0x740))this[_0x5c5b5e(0x54d)][_0x5c5b5e(0x669)](Scene_Shop[_0x5c5b5e(0x807)]['CommandBgType']);else{function _0x5bdc43(){return 0x0;}}}this[_0x5c5b5e(0x856)]&&this['_dummyWindow'][_0x5c5b5e(0x669)](Scene_Shop[_0x5c5b5e(0x807)]['DummyBgType']);if(this[_0x5c5b5e(0x2dc)]){if(_0x5c5b5e(0x3be)!==_0x5c5b5e(0x1c2))this[_0x5c5b5e(0x2dc)]['setBackgroundType'](Scene_Shop[_0x5c5b5e(0x807)][_0x5c5b5e(0x628)]);else{function _0x114180(){const _0xf7e41b=_0x5c5b5e;for(const _0xecde10 of _0x572fe7['learnings']){_0xecde10[_0xf7e41b(0x23f)][_0xf7e41b(0x612)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0xecde10[_0xf7e41b(0x806)]=_0x2a54d4['max'](_0x2949a4(_0x38edff['$1']),0x1));}}}}this[_0x5c5b5e(0x7e1)]&&this['_statusWindow'][_0x5c5b5e(0x669)](Scene_Shop[_0x5c5b5e(0x807)]['StatusBgType']);if(this[_0x5c5b5e(0x74a)]){if(_0x5c5b5e(0x7e2)===_0x5c5b5e(0x800)){function _0x2ea6d7(){const _0x1c145e=_0x5c5b5e;this[_0x1c145e(0x379)]+=this[_0x1c145e(0x3c7)]?this[_0x1c145e(0x1ec)]():-0x1*this['fadeSpeed'](),this[_0x1c145e(0x379)]=_0x23c44b['min'](0xc0,this[_0x1c145e(0x379)]);}}else this[_0x5c5b5e(0x74a)][_0x5c5b5e(0x669)](Scene_Shop[_0x5c5b5e(0x807)][_0x5c5b5e(0x1d5)]);}this['_categoryWindow']&&this['_categoryWindow'][_0x5c5b5e(0x669)](Scene_Shop['layoutSettings'][_0x5c5b5e(0x5de)]),this[_0x5c5b5e(0x240)]&&this[_0x5c5b5e(0x240)][_0x5c5b5e(0x669)](Scene_Shop['layoutSettings'][_0x5c5b5e(0x5eb)]);},Scene_Shop['prototype']['helpWindowRect']=function(){const _0x537d75=_0x231f54;return Scene_Shop[_0x537d75(0x807)][_0x537d75(0x697)][_0x537d75(0x690)](this);},Scene_Shop[_0x231f54(0x3fc)][_0x231f54(0x66c)]=function(){const _0x171c0a=_0x231f54;return Scene_Shop[_0x171c0a(0x807)]['GoldRect'][_0x171c0a(0x690)](this);},Scene_Shop[_0x231f54(0x3fc)][_0x231f54(0x708)]=function(){const _0x13525b=_0x231f54;return Scene_Shop[_0x13525b(0x807)][_0x13525b(0x326)][_0x13525b(0x690)](this);},Scene_Shop[_0x231f54(0x3fc)][_0x231f54(0x22b)]=function(){const _0xadad79=_0x231f54;return Scene_Shop[_0xadad79(0x807)][_0xadad79(0x428)][_0xadad79(0x690)](this);},Scene_Shop[_0x231f54(0x3fc)][_0x231f54(0x4f0)]=function(){const _0x319a98=_0x231f54;return Scene_Shop[_0x319a98(0x807)][_0x319a98(0x315)][_0x319a98(0x690)](this);},Scene_Shop[_0x231f54(0x3fc)][_0x231f54(0x412)]=function(){const _0x19e451=_0x231f54;return Scene_Shop['layoutSettings'][_0x19e451(0x39f)]['call'](this);},Scene_Shop[_0x231f54(0x3fc)]['buyWindowRect']=function(){const _0xc6b1cf=_0x231f54;return Scene_Shop[_0xc6b1cf(0x807)][_0xc6b1cf(0x34d)]['call'](this);},Scene_Shop[_0x231f54(0x3fc)]['categoryWindowRect']=function(){const _0x1f9fed=_0x231f54;return Scene_Shop[_0x1f9fed(0x807)]['CategoryRect'][_0x1f9fed(0x690)](this);},Scene_Shop[_0x231f54(0x3fc)][_0x231f54(0x888)]=function(){const _0x407515=_0x231f54;return Scene_Shop[_0x407515(0x807)][_0x407515(0x684)]['call'](this);},Scene_Name[_0x231f54(0x807)]=VisuMZ[_0x231f54(0x703)][_0x231f54(0x200)][_0x231f54(0x2f9)][_0x231f54(0x332)],VisuMZ[_0x231f54(0x703)][_0x231f54(0x72b)]=Scene_Name[_0x231f54(0x3fc)]['create'],Scene_Name['prototype'][_0x231f54(0x4e6)]=function(){const _0x1722fd=_0x231f54;VisuMZ['CoreEngine']['Scene_Name_create'][_0x1722fd(0x690)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Name['prototype'][_0x231f54(0x85e)]=function(){const _0x2e000d=_0x231f54;if(this['_editWindow']){if(_0x2e000d(0x527)!==_0x2e000d(0x527)){function _0x3703b2(){const _0x59423f=_0x2e000d,_0x35673f=_0x2f53bd[_0x59423f(0x7cf)]();this['_encounterCount']=_0x36425a[_0x59423f(0x69c)](_0x35673f)+_0x13ca22[_0x59423f(0x69c)](_0x35673f)+this[_0x59423f(0x78e)]();}}else this[_0x2e000d(0x54b)][_0x2e000d(0x669)](Scene_Name[_0x2e000d(0x807)][_0x2e000d(0x250)]);}this[_0x2e000d(0x69b)]&&this[_0x2e000d(0x69b)][_0x2e000d(0x669)](Scene_Name[_0x2e000d(0x807)][_0x2e000d(0x6fc)]);},Scene_Name[_0x231f54(0x3fc)]['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x231f54(0x3fc)]['editWindowRect']=function(){const _0x1342a0=_0x231f54;return Scene_Name[_0x1342a0(0x807)][_0x1342a0(0x4a6)]['call'](this);},Scene_Name[_0x231f54(0x3fc)][_0x231f54(0x7f3)]=function(){const _0x3ebe87=_0x231f54;return Scene_Name[_0x3ebe87(0x807)][_0x3ebe87(0x34a)][_0x3ebe87(0x690)](this);},Scene_Name[_0x231f54(0x3fc)][_0x231f54(0x4e2)]=function(){const _0x4e3be4=_0x231f54;if(!this[_0x4e3be4(0x69b)])return![];return VisuMZ['CoreEngine']['Settings'][_0x4e3be4(0x7d2)][_0x4e3be4(0x4e2)];},Scene_Name[_0x231f54(0x3fc)]['buttonAssistKey1']=function(){const _0x2f6949=_0x231f54;if(this['EnableNameInput']()){if(_0x2f6949(0x464)===_0x2f6949(0x464))return TextManager[_0x2f6949(0x6a8)](_0x2f6949(0x3b6));else{function _0x1097d6(){const _0x51394a=_0x2f6949;if(_0x133d96)_0x113622[_0x51394a(0x65d)](_0x57fa24);}}}else return Scene_MenuBase[_0x2f6949(0x3fc)][_0x2f6949(0x417)][_0x2f6949(0x690)](this);},Scene_Name[_0x231f54(0x3fc)][_0x231f54(0x633)]=function(){const _0x1d9352=_0x231f54;if(this[_0x1d9352(0x4e2)]()){if('zPyhi'===_0x1d9352(0x886)){const _0x44be7c=VisuMZ[_0x1d9352(0x703)]['Settings'][_0x1d9352(0x7d2)];if(this['_inputWindow'][_0x1d9352(0x6bd)]===_0x1d9352(0x639)){if(_0x1d9352(0x426)!==_0x1d9352(0x28a))return _0x44be7c[_0x1d9352(0x38f)]||_0x1d9352(0x38f);else{function _0x3cd59d(){const _0x52fb49=_0x1d9352;return _0x21af0c[_0x52fb49(0x703)][_0x52fb49(0x200)][_0x52fb49(0x4ec)][_0x52fb49(0x552)]&&_0x4a5adb[_0x52fb49(0x41d)]()?_0x5c511b[_0x52fb49(0x540)]-0.05:_0x5f3fc8[_0x52fb49(0x540)];}}}else return _0x44be7c[_0x1d9352(0x5b8)]||_0x1d9352(0x5b8);}else{function _0x5f1987(){const _0x2709ec=_0x1d9352;if(_0x4f2512[_0x2709ec(0x7b6)][_0x2709ec(0x690)](this)){const _0xf409c=_0x77f8c1[_0x2709ec(0x78d)];let _0x19ff33=_0x43c056[_0x2709ec(0x283)];if(['',_0x2709ec(0x39c)]['includes'](_0x19ff33))_0x19ff33=_0x313e2a[_0x2709ec(0x602)][_0x2709ec(0x690)](this);const _0x3ed500=_0x542b26[_0x2709ec(0x5e5)][_0x2709ec(0x690)](this),_0x327f7b=_0x2f3b42[_0x2709ec(0x261)][_0x2709ec(0x690)](this);this[_0x2709ec(0x7ad)](_0x19ff33,_0xf409c,_0x3ed500,_0x327f7b),this[_0x2709ec(0x3e5)](_0xf409c,_0x52c7b8['CallHandlerJS']['bind'](this,_0x327f7b));}}}}else return Scene_MenuBase[_0x1d9352(0x3fc)][_0x1d9352(0x633)][_0x1d9352(0x690)](this);},VisuMZ[_0x231f54(0x703)][_0x231f54(0x4fc)]=Scene_Name[_0x231f54(0x3fc)][_0x231f54(0x25f)],Scene_Name[_0x231f54(0x3fc)][_0x231f54(0x25f)]=function(){const _0x271ccc=_0x231f54;this[_0x271ccc(0x6e5)]()?this[_0x271ccc(0x1b8)]():VisuMZ[_0x271ccc(0x703)][_0x271ccc(0x4fc)]['call'](this);},Scene_Name[_0x231f54(0x3fc)][_0x231f54(0x6e5)]=function(){const _0x1eba90=_0x231f54,_0x404530=VisuMZ['CoreEngine'][_0x1eba90(0x200)]['KeyboardInput'];if(!_0x404530)return![];const _0x36b305=_0x404530[_0x1eba90(0x280)];if(!_0x36b305)return![];const _0x1cd5d3=this[_0x1eba90(0x54b)][_0x1eba90(0x271)]()[_0x1eba90(0x47a)]();for(const _0x5f03dd of _0x36b305){if('RUKSq'!=='sWkiQ'){if(_0x1cd5d3[_0x1eba90(0x36f)](_0x5f03dd[_0x1eba90(0x47a)]()))return!![];}else{function _0x46c534(){const _0x211253=_0x1eba90;try{_0x2e20f1[_0x211253(0x703)][_0x211253(0x715)]['call'](this);}catch(_0x105963){_0x2af381[_0x211253(0x841)]()&&(_0x19264f[_0x211253(0x734)](_0x211253(0x225)),_0x20ae97[_0x211253(0x734)](_0x105963));}return!![];}}}return![];},Scene_Name['prototype']['onInputBannedWords']=function(){SoundManager['playBuzzer']();},VisuMZ['CoreEngine']['Scene_Battle_update']=Scene_Battle[_0x231f54(0x3fc)][_0x231f54(0x425)],Scene_Battle['prototype'][_0x231f54(0x425)]=function(){const _0x17db73=_0x231f54;VisuMZ[_0x17db73(0x703)][_0x17db73(0x36c)][_0x17db73(0x690)](this);if($gameTemp[_0x17db73(0x5ed)])this[_0x17db73(0x575)]();},Scene_Battle['prototype'][_0x231f54(0x575)]=function(){const _0x6445b4=_0x231f54;if(!BattleManager['isInputting']()&&!this[_0x6445b4(0x222)]&&!$gameMessage[_0x6445b4(0x5fb)]()){if(_0x6445b4(0x62d)===_0x6445b4(0x62d))this[_0x6445b4(0x222)]=!![],this[_0x6445b4(0x425)](),SceneManager[_0x6445b4(0x55d)](),this['_playtestF7Looping']=![];else{function _0x1d01c1(){const _0x47ddff=_0x6445b4;this[_0x47ddff(0x3fa)](_0x47ddff(0x532)),this[_0x47ddff(0x78a)]=_0x85c267;}}}},VisuMZ[_0x231f54(0x703)]['Scene_Battle_createCancelButton']=Scene_Battle[_0x231f54(0x3fc)][_0x231f54(0x654)],Scene_Battle[_0x231f54(0x3fc)]['createCancelButton']=function(){const _0x5ad043=_0x231f54;VisuMZ[_0x5ad043(0x703)][_0x5ad043(0x48f)][_0x5ad043(0x690)](this),SceneManager[_0x5ad043(0x617)]()&&this[_0x5ad043(0x742)]();},Scene_Battle[_0x231f54(0x3fc)][_0x231f54(0x742)]=function(){const _0x16fb2d=_0x231f54;this[_0x16fb2d(0x226)]['x']=Graphics[_0x16fb2d(0x3e3)]+0x4,this[_0x16fb2d(0x569)]()?this['_cancelButton']['y']=Graphics['boxHeight']-this[_0x16fb2d(0x314)]():this[_0x16fb2d(0x226)]['y']=0x0;},VisuMZ['CoreEngine']['Sprite_Button_initialize']=Sprite_Button[_0x231f54(0x3fc)][_0x231f54(0x2b6)],Sprite_Button[_0x231f54(0x3fc)][_0x231f54(0x2b6)]=function(_0x2f003d){const _0x58c0d1=_0x231f54;VisuMZ[_0x58c0d1(0x703)][_0x58c0d1(0x7ce)][_0x58c0d1(0x690)](this,_0x2f003d),this[_0x58c0d1(0x5a9)]();},Sprite_Button['prototype'][_0x231f54(0x5a9)]=function(){const _0x3acf01=_0x231f54,_0x2ebad0=VisuMZ[_0x3acf01(0x703)]['Settings']['UI'];this[_0x3acf01(0x433)]=![];switch(this['_buttonType']){case _0x3acf01(0x557):this[_0x3acf01(0x433)]=!_0x2ebad0[_0x3acf01(0x19d)];break;case'pageup':case _0x3acf01(0x7dd):this['_isButtonHidden']=!_0x2ebad0[_0x3acf01(0x7a1)];break;case _0x3acf01(0x6c7):case'up':case _0x3acf01(0x1d1):case _0x3acf01(0x463):case'ok':this['_isButtonHidden']=!_0x2ebad0[_0x3acf01(0x531)];break;case'menu':this['_isButtonHidden']=!_0x2ebad0['menuShowButton'];break;}},VisuMZ[_0x231f54(0x703)][_0x231f54(0x22f)]=Sprite_Button[_0x231f54(0x3fc)][_0x231f54(0x643)],Sprite_Button[_0x231f54(0x3fc)][_0x231f54(0x643)]=function(){const _0x52f682=_0x231f54;if(SceneManager['areButtonsHidden']()||this['_isButtonHidden']){if(_0x52f682(0x3a7)===_0x52f682(0x3a7))this['hideButtonFromView']();else{function _0x30ca22(){const _0x3a7f6c=_0x52f682;return _0x2fa65c[_0x3a7f6c(0x703)]['Game_Interpreter_command105'][_0x3a7f6c(0x690)](this,_0xe65b31);}}}else VisuMZ[_0x52f682(0x703)]['Sprite_Button_updateOpacity']['call'](this);},Sprite_Button['prototype'][_0x231f54(0x68d)]=function(){const _0x5179fb=_0x231f54;this['visible']=![],this[_0x5179fb(0x379)]=0x0,this['x']=Graphics['width']*0xa,this['y']=Graphics['height']*0xa;},VisuMZ[_0x231f54(0x703)][_0x231f54(0x2d4)]=Sprite_Battler[_0x231f54(0x3fc)]['startMove'],Sprite_Battler[_0x231f54(0x3fc)][_0x231f54(0x6f9)]=function(_0x2f8ac6,_0x5659bb,_0xd8c1f9){const _0x4d9388=_0x231f54;(this['_targetOffsetX']!==_0x2f8ac6||this['_targetOffsetY']!==_0x5659bb)&&(this['setMoveEasingType'](_0x4d9388(0x532)),this[_0x4d9388(0x78a)]=_0xd8c1f9),VisuMZ['CoreEngine'][_0x4d9388(0x2d4)][_0x4d9388(0x690)](this,_0x2f8ac6,_0x5659bb,_0xd8c1f9);},Sprite_Battler[_0x231f54(0x3fc)][_0x231f54(0x3fa)]=function(_0x111005){this['_moveEasingType']=_0x111005;},Sprite_Battler[_0x231f54(0x3fc)][_0x231f54(0x719)]=function(){const _0x411e29=_0x231f54;if(this[_0x411e29(0x1e4)]<=0x0)return;const _0xfe0fb8=this[_0x411e29(0x1e4)],_0x30ec0d=this[_0x411e29(0x78a)],_0x2c985f=this[_0x411e29(0x2a9)];this[_0x411e29(0x2d1)]=this['applyEasing'](this[_0x411e29(0x2d1)],this[_0x411e29(0x6f1)],_0xfe0fb8,_0x30ec0d,_0x2c985f),this[_0x411e29(0x598)]=this['applyEasing'](this['_offsetY'],this[_0x411e29(0x862)],_0xfe0fb8,_0x30ec0d,_0x2c985f),this['_movementDuration']--;if(this[_0x411e29(0x1e4)]<=0x0)this[_0x411e29(0x29d)]();},Sprite_Battler[_0x231f54(0x3fc)][_0x231f54(0x5a6)]=function(_0x134d3e,_0xc59c3a,_0x55485e,_0x41d686,_0x3478b9){const _0x457964=_0x231f54,_0x17aefa=VisuMZ['ApplyEasing']((_0x41d686-_0x55485e)/_0x41d686,_0x3478b9||_0x457964(0x532)),_0x1b8fcb=VisuMZ[_0x457964(0x36d)]((_0x41d686-_0x55485e+0x1)/_0x41d686,_0x3478b9||'Linear'),_0x56760a=(_0x134d3e-_0xc59c3a*_0x17aefa)/(0x1-_0x17aefa);return _0x56760a+(_0xc59c3a-_0x56760a)*_0x1b8fcb;},VisuMZ[_0x231f54(0x703)]['Sprite_Actor_setActorHome']=Sprite_Actor[_0x231f54(0x3fc)]['setActorHome'],Sprite_Actor[_0x231f54(0x3fc)][_0x231f54(0x35c)]=function(_0x241e09){const _0x2d5777=_0x231f54;VisuMZ[_0x2d5777(0x703)][_0x2d5777(0x200)]['UI']['RepositionActors']?this['setActorHomeRepositioned'](_0x241e09):VisuMZ[_0x2d5777(0x703)][_0x2d5777(0x515)][_0x2d5777(0x690)](this,_0x241e09);},Sprite_Actor[_0x231f54(0x3fc)][_0x231f54(0x69e)]=function(_0x23d0dc){const _0xc8670f=_0x231f54;let _0x5ef2f2=Math['round'](Graphics[_0xc8670f(0x346)]/0x2+0xc0);_0x5ef2f2-=Math[_0xc8670f(0x659)]((Graphics[_0xc8670f(0x346)]-Graphics['boxWidth'])/0x2),_0x5ef2f2+=_0x23d0dc*0x20;let _0x441130=Graphics[_0xc8670f(0x31f)]-0xc8-$gameParty[_0xc8670f(0x3ad)]()*0x30;_0x441130-=Math['floor']((Graphics['height']-Graphics[_0xc8670f(0x485)])/0x2),_0x441130+=_0x23d0dc*0x30,this[_0xc8670f(0x4cb)](_0x5ef2f2,_0x441130);},Sprite_Actor[_0x231f54(0x3fc)][_0x231f54(0x4d9)]=function(){const _0x3eae43=_0x231f54;this[_0x3eae43(0x6f9)](0x4b0,0x0,0x78);},Sprite_Animation['prototype'][_0x231f54(0x307)]=function(_0x3be558){const _0xe11675=_0x231f54;this[_0xe11675(0x6cf)]=_0x3be558;},VisuMZ[_0x231f54(0x703)]['Sprite_Animation_processSoundTimings']=Sprite_Animation[_0x231f54(0x3fc)][_0x231f54(0x4a9)],Sprite_Animation[_0x231f54(0x3fc)][_0x231f54(0x4a9)]=function(){const _0x4ae110=_0x231f54;if(this[_0x4ae110(0x6cf)])return;VisuMZ['CoreEngine'][_0x4ae110(0x805)][_0x4ae110(0x690)](this);},VisuMZ[_0x231f54(0x703)][_0x231f54(0x3d5)]=Sprite_Animation['prototype']['setViewport'],Sprite_Animation[_0x231f54(0x3fc)]['setViewport']=function(_0x439bdb){const _0x32a026=_0x231f54;if(this[_0x32a026(0x6b8)]()){if(_0x32a026(0x3da)===_0x32a026(0x3da))this['setViewportCoreEngineFix'](_0x439bdb);else{function _0x9c2e4e(){_0x510960+=_0x56dd4f(_0x2830d0);}}}else VisuMZ['CoreEngine']['Sprite_Animation_setViewport']['call'](this,_0x439bdb);},Sprite_Animation[_0x231f54(0x3fc)][_0x231f54(0x6b8)]=function(){const _0x24495d=_0x231f54;if(!this[_0x24495d(0x541)])return![];const _0x18619a=this[_0x24495d(0x541)]['name']||'';if(_0x18619a[_0x24495d(0x612)](/<MIRROR OFFSET X>/i))return!![];if(_0x18619a[_0x24495d(0x612)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x24495d(0x703)][_0x24495d(0x200)][_0x24495d(0x4ec)][_0x24495d(0x3ab)];},Sprite_Animation[_0x231f54(0x3fc)]['setViewportCoreEngineFix']=function(_0xfc946e){const _0x482a6b=_0x231f54,_0x266423=this[_0x482a6b(0x709)],_0x4bf016=this[_0x482a6b(0x709)],_0x5f0633=this['_animation']['offsetX']*(this[_0x482a6b(0x46a)]?-0x1:0x1)-_0x266423/0x2,_0x3dc17f=this[_0x482a6b(0x541)][_0x482a6b(0x33a)]-_0x4bf016/0x2,_0x3ebeb4=this[_0x482a6b(0x40b)](_0xfc946e);_0xfc946e['gl'][_0x482a6b(0x59a)](_0x5f0633+_0x3ebeb4['x'],_0x3dc17f+_0x3ebeb4['y'],_0x266423,_0x4bf016);},Sprite_Animation[_0x231f54(0x3fc)][_0x231f54(0x28c)]=function(_0x3b8c38){const _0x391ea3=_0x231f54;if(_0x3b8c38[_0x391ea3(0x483)]){}const _0x34f423=this[_0x391ea3(0x541)][_0x391ea3(0x271)];let _0x190419=_0x3b8c38[_0x391ea3(0x31f)]*_0x3b8c38['scale']['y'],_0x2cc62a=0x0,_0x2da787=-_0x190419/0x2;if(_0x34f423['match'](/<(?:HEAD|HEADER|TOP)>/i))_0x2da787=-_0x190419;if(_0x34f423[_0x391ea3(0x612)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x2da787=0x0;if(_0x34f423[_0x391ea3(0x612)](/<(?:LEFT)>/i))_0x2cc62a=-_0x3b8c38[_0x391ea3(0x346)]/0x2;if(_0x34f423[_0x391ea3(0x612)](/<(?:RIGHT)>/i))_0x2da787=_0x3b8c38['width']/0x2;if(_0x34f423[_0x391ea3(0x612)](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x2cc62a=Number(RegExp['$1'])*_0x3b8c38['width'];_0x34f423[_0x391ea3(0x612)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x2da787=(0x1-Number(RegExp['$1']))*-_0x190419);if(_0x34f423['match'](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)){if(_0x391ea3(0x322)!==_0x391ea3(0x5ea))_0x2cc62a=Number(RegExp['$1'])*_0x3b8c38[_0x391ea3(0x346)],_0x2da787=(0x1-Number(RegExp['$2']))*-_0x190419;else{function _0x1f974e(){const _0x530776=_0x391ea3;this[_0x530776(0x3c3)]();}}}if(_0x34f423[_0x391ea3(0x612)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x2cc62a+=Number(RegExp['$1']);if(_0x34f423[_0x391ea3(0x612)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x2da787+=Number(RegExp['$1']);_0x34f423[_0x391ea3(0x612)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x2cc62a+=Number(RegExp['$1']),_0x2da787+=Number(RegExp['$2']));const _0x56aa5e=new Point(_0x2cc62a,_0x2da787);return _0x3b8c38[_0x391ea3(0x472)](),_0x3b8c38[_0x391ea3(0x43e)][_0x391ea3(0x6ef)](_0x56aa5e);},Sprite_AnimationMV[_0x231f54(0x3fc)][_0x231f54(0x307)]=function(_0x1c767d){const _0x3a9ba8=_0x231f54;this[_0x3a9ba8(0x6cf)]=_0x1c767d;},VisuMZ[_0x231f54(0x703)][_0x231f54(0x1ed)]=Sprite_AnimationMV['prototype'][_0x231f54(0x832)],Sprite_AnimationMV[_0x231f54(0x3fc)][_0x231f54(0x832)]=function(_0x34bc88){const _0x261c07=_0x231f54;this[_0x261c07(0x6cf)]&&(_0x34bc88=JsonEx['makeDeepCopy'](_0x34bc88),_0x34bc88['se']&&(_0x34bc88['se'][_0x261c07(0x41c)]=0x0)),VisuMZ[_0x261c07(0x703)][_0x261c07(0x1ed)][_0x261c07(0x690)](this,_0x34bc88);},Sprite_Damage[_0x231f54(0x3fc)]['createDigits']=function(_0x2c016f){const _0x525717=_0x231f54;let _0xfe4ed4=Math[_0x525717(0x88a)](_0x2c016f)[_0x525717(0x44d)]();this['useDigitGrouping']()&&(_0xfe4ed4=VisuMZ[_0x525717(0x4db)](_0xfe4ed4));const _0x43f9a7=this[_0x525717(0x626)](),_0x3dd521=Math[_0x525717(0x659)](_0x43f9a7*0.75);for(let _0x4dd055=0x0;_0x4dd055<_0xfe4ed4[_0x525717(0x533)];_0x4dd055++){const _0x58b898=this['createChildSprite'](_0x3dd521,_0x43f9a7);_0x58b898['bitmap'][_0x525717(0x272)](_0xfe4ed4[_0x4dd055],0x0,0x0,_0x3dd521,_0x43f9a7,_0x525717(0x5f8)),_0x58b898['x']=(_0x4dd055-(_0xfe4ed4[_0x525717(0x533)]-0x1)/0x2)*_0x3dd521,_0x58b898['dy']=-_0x4dd055;}},Sprite_Damage[_0x231f54(0x3fc)][_0x231f54(0x35d)]=function(){const _0x44161c=_0x231f54;return VisuMZ[_0x44161c(0x703)][_0x44161c(0x200)][_0x44161c(0x4ec)]['DigitGroupingDamageSprites'];},Sprite_Damage[_0x231f54(0x3fc)][_0x231f54(0x604)]=function(){const _0x3a42ff=_0x231f54;return ColorManager[_0x3a42ff(0x1a4)]();},VisuMZ['CoreEngine'][_0x231f54(0x584)]=Sprite_Gauge['prototype'][_0x231f54(0x195)],Sprite_Gauge[_0x231f54(0x3fc)][_0x231f54(0x195)]=function(){const _0x534aa0=_0x231f54;return VisuMZ[_0x534aa0(0x703)][_0x534aa0(0x584)][_0x534aa0(0x690)](this)[_0x534aa0(0x308)](0x0,0x1);},VisuMZ[_0x231f54(0x703)][_0x231f54(0x799)]=Sprite_Gauge['prototype']['currentValue'],Sprite_Gauge[_0x231f54(0x3fc)][_0x231f54(0x1bc)]=function(){const _0x5b6a60=_0x231f54;let _0x3b8a1a=VisuMZ['CoreEngine'][_0x5b6a60(0x799)][_0x5b6a60(0x690)](this);return _0x3b8a1a;},Sprite_Gauge[_0x231f54(0x3fc)][_0x231f54(0x6e8)]=function(){const _0x316323=_0x231f54;let _0x2455b2=this[_0x316323(0x1bc)]();if(this[_0x316323(0x35d)]()){if(_0x316323(0x622)===_0x316323(0x560)){function _0x11ce3c(){_0x3b7428+=_0x43c28e(_0xdd0581);}}else _0x2455b2=VisuMZ['GroupDigits'](_0x2455b2);}const _0x1dbc18=this[_0x316323(0x1ce)]()-0x1,_0x487e6a=this[_0x316323(0x789)]();this[_0x316323(0x1a3)](),this[_0x316323(0x5af)][_0x316323(0x272)](_0x2455b2,0x0,0x0,_0x1dbc18,_0x487e6a,_0x316323(0x753));},Sprite_Gauge[_0x231f54(0x3fc)][_0x231f54(0x1c8)]=function(){return 0x3;},Sprite_Gauge[_0x231f54(0x3fc)][_0x231f54(0x35d)]=function(){const _0x38994b=_0x231f54;return VisuMZ[_0x38994b(0x703)][_0x38994b(0x200)][_0x38994b(0x4ec)][_0x38994b(0x49e)];},Sprite_Gauge['prototype'][_0x231f54(0x604)]=function(){const _0x28ae7b=_0x231f54;return ColorManager[_0x28ae7b(0x2a0)]();};function Sprite_TitlePictureButton(){const _0x2f97ad=_0x231f54;this[_0x2f97ad(0x2b6)](...arguments);}function _0x5618(_0x5e6db6,_0x4e07d3){_0x5e6db6=_0x5e6db6-0x18c;let _0x245988=_0x2459[_0x5e6db6];return _0x245988;}Sprite_TitlePictureButton[_0x231f54(0x3fc)]=Object[_0x231f54(0x4e6)](Sprite_Clickable[_0x231f54(0x3fc)]),Sprite_TitlePictureButton[_0x231f54(0x3fc)][_0x231f54(0x1a5)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x231f54(0x3fc)][_0x231f54(0x2b6)]=function(_0x4922f9){const _0x372dec=_0x231f54;Sprite_Clickable['prototype'][_0x372dec(0x2b6)][_0x372dec(0x690)](this),this[_0x372dec(0x4a0)]=_0x4922f9,this['_clickHandler']=null,this[_0x372dec(0x341)]();},Sprite_TitlePictureButton[_0x231f54(0x3fc)][_0x231f54(0x341)]=function(){const _0x5fcb98=_0x231f54;this['x']=Graphics['width'],this['y']=Graphics[_0x5fcb98(0x31f)],this[_0x5fcb98(0x3c7)]=![],this['setupButtonImage']();},Sprite_TitlePictureButton[_0x231f54(0x3fc)]['setupButtonImage']=function(){const _0x2b6d9c=_0x231f54;this[_0x2b6d9c(0x5af)]=ImageManager[_0x2b6d9c(0x1a7)](this[_0x2b6d9c(0x4a0)][_0x2b6d9c(0x6f6)]),this[_0x2b6d9c(0x5af)][_0x2b6d9c(0x2b3)](this[_0x2b6d9c(0x73f)]['bind'](this));},Sprite_TitlePictureButton['prototype'][_0x231f54(0x73f)]=function(){const _0x54179f=_0x231f54;this['_data'][_0x54179f(0x2d8)][_0x54179f(0x690)](this),this[_0x54179f(0x4a0)]['PositionJS'][_0x54179f(0x690)](this),this[_0x54179f(0x723)](this['_data'][_0x54179f(0x45f)][_0x54179f(0x64a)](this));},Sprite_TitlePictureButton[_0x231f54(0x3fc)][_0x231f54(0x425)]=function(){const _0x55aab9=_0x231f54;Sprite_Clickable[_0x55aab9(0x3fc)][_0x55aab9(0x425)][_0x55aab9(0x690)](this),this[_0x55aab9(0x643)](),this[_0x55aab9(0x25b)]();},Sprite_TitlePictureButton[_0x231f54(0x3fc)][_0x231f54(0x1ec)]=function(){const _0x154faf=_0x231f54;return VisuMZ[_0x154faf(0x703)][_0x154faf(0x200)]['MenuLayout'][_0x154faf(0x45a)]['ButtonFadeSpeed'];},Sprite_TitlePictureButton[_0x231f54(0x3fc)][_0x231f54(0x643)]=function(){const _0x18a4eb=_0x231f54;if(this[_0x18a4eb(0x2c7)]||this[_0x18a4eb(0x564)])this['opacity']=0xff;else{if(_0x18a4eb(0x1a8)===_0x18a4eb(0x67b)){function _0x3531b5(){const _0x962764=_0x18a4eb;return _0x19ec59[_0x962764(0x807)][_0x962764(0x697)][_0x962764(0x690)](this);}}else this[_0x18a4eb(0x379)]+=this[_0x18a4eb(0x3c7)]?this['fadeSpeed']():-0x1*this[_0x18a4eb(0x1ec)](),this[_0x18a4eb(0x379)]=Math['min'](0xc0,this['opacity']);}},Sprite_TitlePictureButton[_0x231f54(0x3fc)][_0x231f54(0x723)]=function(_0x3d92f1){const _0x146974=_0x231f54;this[_0x146974(0x889)]=_0x3d92f1;},Sprite_TitlePictureButton['prototype'][_0x231f54(0x878)]=function(){const _0x15e7c5=_0x231f54;this[_0x15e7c5(0x889)]&&this[_0x15e7c5(0x889)]();},VisuMZ[_0x231f54(0x703)][_0x231f54(0x686)]=Spriteset_Base[_0x231f54(0x3fc)][_0x231f54(0x2b6)],Spriteset_Base[_0x231f54(0x3fc)][_0x231f54(0x2b6)]=function(){const _0x4f7c6f=_0x231f54;VisuMZ['CoreEngine'][_0x4f7c6f(0x686)]['call'](this),this['initMembersCoreEngine']();},Spriteset_Base[_0x231f54(0x3fc)][_0x231f54(0x5f2)]=function(){const _0x27122d=_0x231f54;this[_0x27122d(0x69d)]=[],this[_0x27122d(0x714)]=this[_0x27122d(0x831)]['x'],this[_0x27122d(0x336)]=this['scale']['y'];},VisuMZ[_0x231f54(0x703)]['Spriteset_Base_destroy']=Spriteset_Base[_0x231f54(0x3fc)][_0x231f54(0x3ae)],Spriteset_Base['prototype']['destroy']=function(_0x394212){const _0x1cdcbf=_0x231f54;this[_0x1cdcbf(0x21a)](),VisuMZ[_0x1cdcbf(0x703)][_0x1cdcbf(0x294)][_0x1cdcbf(0x690)](this,_0x394212);},VisuMZ[_0x231f54(0x703)][_0x231f54(0x772)]=Spriteset_Base[_0x231f54(0x3fc)][_0x231f54(0x425)],Spriteset_Base[_0x231f54(0x3fc)][_0x231f54(0x425)]=function(){const _0x12b96a=_0x231f54;VisuMZ[_0x12b96a(0x703)][_0x12b96a(0x772)]['call'](this),this['updatePictureAntiZoom'](),this[_0x12b96a(0x526)]();},Spriteset_Base[_0x231f54(0x3fc)][_0x231f54(0x18e)]=function(){const _0x299a36=_0x231f54;if(!VisuMZ[_0x299a36(0x703)][_0x299a36(0x200)][_0x299a36(0x4ec)][_0x299a36(0x4ee)])return;if(this[_0x299a36(0x714)]===this['scale']['x']&&this[_0x299a36(0x336)]===this[_0x299a36(0x831)]['y'])return;this[_0x299a36(0x224)](),this[_0x299a36(0x714)]=this[_0x299a36(0x831)]['x'],this[_0x299a36(0x336)]=this['scale']['y'];},Spriteset_Base[_0x231f54(0x3fc)][_0x231f54(0x224)]=function(){const _0x30a9b9=_0x231f54;this[_0x30a9b9(0x831)]['x']!==0x0&&(this[_0x30a9b9(0x5ab)][_0x30a9b9(0x831)]['x']=0x1/this[_0x30a9b9(0x831)]['x'],this[_0x30a9b9(0x5ab)]['x']=-(this['x']/this[_0x30a9b9(0x831)]['x']));if(this[_0x30a9b9(0x831)]['y']!==0x0){if(_0x30a9b9(0x858)===_0x30a9b9(0x83a)){function _0x1da1ab(){const _0x17550d=_0x30a9b9,_0x14e314=_0x17550d(0x48e);this[_0x17550d(0x4d5)]=this['_colorCache']||{};if(this[_0x17550d(0x4d5)][_0x14e314])return this[_0x17550d(0x4d5)][_0x14e314];const _0x4c621e=_0x5654b9[_0x17550d(0x703)][_0x17550d(0x200)][_0x17550d(0x2f5)][_0x17550d(0x2d7)];return this[_0x17550d(0x890)](_0x14e314,_0x4c621e);}}else this[_0x30a9b9(0x5ab)]['scale']['y']=0x1/this['scale']['y'],this['_pictureContainer']['y']=-(this['y']/this['scale']['y']);}},Spriteset_Base[_0x231f54(0x3fc)][_0x231f54(0x526)]=function(){const _0x58e579=_0x231f54;for(const _0x178078 of this[_0x58e579(0x69d)]){!_0x178078['isPlaying']()&&this[_0x58e579(0x490)](_0x178078);}this[_0x58e579(0x4ff)]();},Spriteset_Base['prototype'][_0x231f54(0x4ff)]=function(){const _0x18f5b1=_0x231f54;for(;;){const _0x424f47=$gameTemp[_0x18f5b1(0x361)]();if(_0x424f47){if(_0x18f5b1(0x5f3)==='hJfnd')this[_0x18f5b1(0x455)](_0x424f47);else{function _0x6db8e4(){const _0x5be41c=_0x18f5b1;_0x31e3c3[_0x5be41c(0x4ed)]!==0x0?(_0x2ece43[_0x5be41c(0x843)]=0x0,_0x3de870[_0x5be41c(0x2da)]=0x0,_0x58195e[_0x5be41c(0x611)]=0x0,_0x4cc210[_0x5be41c(0x4ed)]=0x0):(_0x44ccba[_0x5be41c(0x843)]=0x64,_0x369f0f[_0x5be41c(0x2da)]=0x64,_0x1f31aa[_0x5be41c(0x611)]=0x64,_0x19f815[_0x5be41c(0x4ed)]=0x64);_0x557868[_0x5be41c(0x77e)]();if(this[_0x5be41c(0x80a)][_0x5be41c(0x1a5)]===_0x18b2fe){if(this[_0x5be41c(0x80a)]['_optionsWindow'])this[_0x5be41c(0x80a)][_0x5be41c(0x31d)][_0x5be41c(0x1c4)]();if(this[_0x5be41c(0x80a)][_0x5be41c(0x330)])this[_0x5be41c(0x80a)][_0x5be41c(0x330)][_0x5be41c(0x1c4)]();}}}}else break;}},Spriteset_Base[_0x231f54(0x3fc)]['createFauxAnimation']=function(_0x8de8a4){const _0x1bbeec=_0x231f54,_0x328621=$dataAnimations[_0x8de8a4[_0x1bbeec(0x3fb)]],_0x2ee0db=_0x8de8a4[_0x1bbeec(0x682)],_0x43e45b=_0x8de8a4['mirror'],_0x508492=_0x8de8a4[_0x1bbeec(0x345)];let _0xcd4b57=this[_0x1bbeec(0x6d6)]();const _0x2d67d6=this['animationNextDelay']();if(this[_0x1bbeec(0x61d)](_0x328621)){if(_0x1bbeec(0x603)!=='rXxuY')for(const _0x586b6c of _0x2ee0db){this[_0x1bbeec(0x4ae)]([_0x586b6c],_0x328621,_0x43e45b,_0xcd4b57,_0x508492),_0xcd4b57+=_0x2d67d6;}else{function _0x4fa0e5(){const _0x4d86f6=_0x1bbeec;return _0x343396[_0x4d86f6(0x540)];}}}else this[_0x1bbeec(0x4ae)](_0x2ee0db,_0x328621,_0x43e45b,_0xcd4b57,_0x508492);},Spriteset_Base['prototype'][_0x231f54(0x4ae)]=function(_0x27c426,_0x4e28fc,_0x54ca51,_0x41c38e,_0x1c4fa4){const _0x52ff08=_0x231f54,_0x46ef2b=this[_0x52ff08(0x435)](_0x4e28fc),_0x473b73=new(_0x46ef2b?Sprite_AnimationMV:Sprite_Animation)(),_0x3669e6=this['makeTargetSprites'](_0x27c426);this[_0x52ff08(0x28b)](_0x27c426[0x0])&&(_0x54ca51=!_0x54ca51),_0x473b73[_0x52ff08(0x62b)]=_0x27c426,_0x473b73[_0x52ff08(0x341)](_0x3669e6,_0x4e28fc,_0x54ca51,_0x41c38e),_0x473b73[_0x52ff08(0x307)](_0x1c4fa4),this[_0x52ff08(0x41a)][_0x52ff08(0x6ad)](_0x473b73),this[_0x52ff08(0x69d)][_0x52ff08(0x616)](_0x473b73);},Spriteset_Base['prototype']['removeFauxAnimation']=function(_0x4977d3){const _0x1ca69b=_0x231f54;this['_fauxAnimationSprites'][_0x1ca69b(0x811)](_0x4977d3),this[_0x1ca69b(0x41a)][_0x1ca69b(0x3b4)](_0x4977d3);for(const _0x43f430 of _0x4977d3[_0x1ca69b(0x62b)]){if(_0x1ca69b(0x3a5)===_0x1ca69b(0x3a5))_0x43f430[_0x1ca69b(0x5ef)]&&_0x43f430[_0x1ca69b(0x5ef)]();else{function _0x45d7f1(){const _0x226dac=_0x1ca69b;_0x5bf440[_0x226dac(0x2e7)]();}}}_0x4977d3[_0x1ca69b(0x3ae)]();},Spriteset_Base['prototype'][_0x231f54(0x21a)]=function(){const _0x5b09ad=_0x231f54;for(const _0x13889f of this[_0x5b09ad(0x69d)]){this[_0x5b09ad(0x490)](_0x13889f);}},Spriteset_Base[_0x231f54(0x3fc)][_0x231f54(0x64f)]=function(){const _0x31faa0=_0x231f54;return this['_fauxAnimationSprites'][_0x31faa0(0x533)]>0x0;},VisuMZ[_0x231f54(0x703)][_0x231f54(0x393)]=Spriteset_Base['prototype'][_0x231f54(0x414)],Spriteset_Base[_0x231f54(0x3fc)]['updatePosition']=function(){const _0x52605f=_0x231f54;VisuMZ[_0x52605f(0x703)]['Spriteset_Base_updatePosition'][_0x52605f(0x690)](this),this['updatePositionCoreEngine']();},Spriteset_Base[_0x231f54(0x3fc)][_0x231f54(0x3a3)]=function(){const _0x59a81a=_0x231f54;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math[_0x59a81a(0x64c)]($gameScreen[_0x59a81a(0x2d6)]());const _0x3ae724=$gameScreen[_0x59a81a(0x4c1)]();switch($gameScreen[_0x59a81a(0x4c1)]()){case _0x59a81a(0x838):this[_0x59a81a(0x883)]();break;case _0x59a81a(0x87b):this['updatePositionCoreEngineShakeHorz']();break;case'vertical':this[_0x59a81a(0x1f1)]();break;default:this[_0x59a81a(0x79f)]();break;}},Spriteset_Base['prototype'][_0x231f54(0x883)]=function(){const _0x2b0576=_0x231f54,_0x24aecc=VisuMZ[_0x2b0576(0x703)][_0x2b0576(0x200)][_0x2b0576(0x2fe)];if(_0x24aecc&&_0x24aecc[_0x2b0576(0x462)])return _0x24aecc['originalJS'][_0x2b0576(0x690)](this);this['x']+=Math['round']($gameScreen['shake']());},Spriteset_Base[_0x231f54(0x3fc)]['updatePositionCoreEngineShakeRand']=function(){const _0x665b73=_0x231f54,_0x3e9740=VisuMZ[_0x665b73(0x703)][_0x665b73(0x200)]['ScreenShake'];if(_0x3e9740&&_0x3e9740[_0x665b73(0x4c3)])return _0x3e9740['randomJS'][_0x665b73(0x690)](this);const _0x685aa1=$gameScreen['_shakePower']*0.75,_0x396738=$gameScreen[_0x665b73(0x253)]*0.6,_0x150438=$gameScreen[_0x665b73(0x7fa)];this['x']+=Math[_0x665b73(0x64c)](Math[_0x665b73(0x69c)](_0x685aa1)-Math[_0x665b73(0x69c)](_0x396738))*(Math[_0x665b73(0x364)](_0x150438,0x1e)*0.5),this['y']+=Math[_0x665b73(0x64c)](Math[_0x665b73(0x69c)](_0x685aa1)-Math[_0x665b73(0x69c)](_0x396738))*(Math['min'](_0x150438,0x1e)*0.5);},Spriteset_Base[_0x231f54(0x3fc)][_0x231f54(0x7d4)]=function(){const _0x43e648=_0x231f54,_0x4328e6=VisuMZ[_0x43e648(0x703)][_0x43e648(0x200)][_0x43e648(0x2fe)];if(_0x4328e6&&_0x4328e6[_0x43e648(0x242)])return _0x4328e6['horzJS'][_0x43e648(0x690)](this);const _0x3deeac=$gameScreen['_shakePower']*0.75,_0x27cb63=$gameScreen[_0x43e648(0x253)]*0.6,_0xd1b9a5=$gameScreen[_0x43e648(0x7fa)];this['x']+=Math[_0x43e648(0x64c)](Math[_0x43e648(0x69c)](_0x3deeac)-Math[_0x43e648(0x69c)](_0x27cb63))*(Math[_0x43e648(0x364)](_0xd1b9a5,0x1e)*0.5);},Spriteset_Base[_0x231f54(0x3fc)][_0x231f54(0x1f1)]=function(){const _0x31c24d=_0x231f54,_0x275b62=VisuMZ[_0x31c24d(0x703)]['Settings']['ScreenShake'];if(_0x275b62&&_0x275b62[_0x31c24d(0x5c9)]){if(_0x31c24d(0x2c3)!==_0x31c24d(0x6e9))return _0x275b62[_0x31c24d(0x5c9)]['call'](this);else{function _0x567c96(){const _0x59315a=_0x31c24d,_0x24f2ae=_0x15ede6[_0x59315a(0x2e3)](_0x59315a(0x43f)),_0x1a6f30=_0x13fe53[_0x59315a(0x815)],_0x395e37=_0x2ca3e2[_0x59315a(0x2a4)],_0x475f99=_0x1fa5b0%0x10*_0x1a6f30,_0x424ef1=_0x350bb0[_0x59315a(0x659)](_0x5c8aa2/0x10)*_0x395e37,_0x1a8fca=_0x298551,_0x264858=_0x3b15bf;this[_0x59315a(0x3e6)]['_context'][_0x59315a(0x323)]=_0x7ef118,this[_0x59315a(0x3e6)]['blt'](_0x24f2ae,_0x475f99,_0x424ef1,_0x1a6f30,_0x395e37,_0x589e0a,_0xfa91b2,_0x1a8fca,_0x264858),this[_0x59315a(0x3e6)][_0x59315a(0x671)][_0x59315a(0x323)]=!![];}}}const _0x5622e6=$gameScreen['_shakePower']*0.75,_0xd36d07=$gameScreen['_shakeSpeed']*0.6,_0xd1b2da=$gameScreen[_0x31c24d(0x7fa)];this['y']+=Math[_0x31c24d(0x64c)](Math[_0x31c24d(0x69c)](_0x5622e6)-Math['randomInt'](_0xd36d07))*(Math[_0x31c24d(0x364)](_0xd1b2da,0x1e)*0.5);},Spriteset_Battle[_0x231f54(0x3fc)][_0x231f54(0x4ad)]=function(){const _0x209d2e=_0x231f54;this[_0x209d2e(0x864)]=new PIXI[(_0x209d2e(0x2ee))][(_0x209d2e(0x359))](clamp=!![]),this[_0x209d2e(0x26a)]=new Sprite(),this[_0x209d2e(0x26a)][_0x209d2e(0x5af)]=SceneManager[_0x209d2e(0x829)](),this[_0x209d2e(0x26a)][_0x209d2e(0x2ee)]=[this[_0x209d2e(0x864)]],this[_0x209d2e(0x4a4)]['addChild'](this[_0x209d2e(0x26a)]);},VisuMZ[_0x231f54(0x703)][_0x231f54(0x861)]=Spriteset_Battle[_0x231f54(0x3fc)][_0x231f54(0x698)],Spriteset_Battle[_0x231f54(0x3fc)][_0x231f54(0x698)]=function(){const _0x24560f=_0x231f54;VisuMZ['CoreEngine'][_0x24560f(0x200)]['UI'][_0x24560f(0x370)]&&this[_0x24560f(0x310)](),VisuMZ[_0x24560f(0x703)][_0x24560f(0x861)][_0x24560f(0x690)](this);},Spriteset_Battle[_0x231f54(0x3fc)][_0x231f54(0x310)]=function(){const _0x25dce2=_0x231f54;for(member of $gameTroop[_0x25dce2(0x5b5)]()){member[_0x25dce2(0x2e7)]();}},VisuMZ[_0x231f54(0x703)][_0x231f54(0x88b)]=Window_Base['prototype'][_0x231f54(0x2b6)],Window_Base[_0x231f54(0x3fc)][_0x231f54(0x2b6)]=function(_0x49bb79){const _0x1cb22d=_0x231f54;_0x49bb79['x']=Math[_0x1cb22d(0x64c)](_0x49bb79['x']),_0x49bb79['y']=Math[_0x1cb22d(0x64c)](_0x49bb79['y']),_0x49bb79['width']=Math['round'](_0x49bb79[_0x1cb22d(0x346)]),_0x49bb79[_0x1cb22d(0x31f)]=Math[_0x1cb22d(0x64c)](_0x49bb79[_0x1cb22d(0x31f)]),this[_0x1cb22d(0x71e)](),VisuMZ[_0x1cb22d(0x703)]['Window_Base_initialize']['call'](this,_0x49bb79),this[_0x1cb22d(0x7b9)]();},Window_Base['prototype'][_0x231f54(0x71e)]=function(){const _0x1f4c62=_0x231f54;this[_0x1f4c62(0x6f4)]=VisuMZ[_0x1f4c62(0x703)][_0x1f4c62(0x200)][_0x1f4c62(0x4ec)][_0x1f4c62(0x56e)],this[_0x1f4c62(0x1e5)]=VisuMZ[_0x1f4c62(0x703)][_0x1f4c62(0x200)][_0x1f4c62(0x4ec)][_0x1f4c62(0x51c)];},Window_Base[_0x231f54(0x3fc)][_0x231f54(0x488)]=function(){const _0x297e92=_0x231f54;return VisuMZ['CoreEngine'][_0x297e92(0x200)][_0x297e92(0x860)]['LineHeight'];},Window_Base[_0x231f54(0x3fc)]['itemPadding']=function(){const _0x180394=_0x231f54;return VisuMZ[_0x180394(0x703)][_0x180394(0x200)][_0x180394(0x860)][_0x180394(0x1ea)];},Window_Base['prototype'][_0x231f54(0x1eb)]=function(){const _0x4ec661=_0x231f54;this[_0x4ec661(0x521)]=VisuMZ[_0x4ec661(0x703)][_0x4ec661(0x200)]['Window'][_0x4ec661(0x688)];},Window_Base[_0x231f54(0x3fc)][_0x231f54(0x53b)]=function(){const _0x2ac0d1=_0x231f54;return VisuMZ[_0x2ac0d1(0x703)]['Settings'][_0x2ac0d1(0x860)]['TranslucentOpacity'];},Window_Base[_0x231f54(0x3fc)][_0x231f54(0x1c7)]=function(){const _0xe0c7a6=_0x231f54;return VisuMZ[_0xe0c7a6(0x703)][_0xe0c7a6(0x200)][_0xe0c7a6(0x860)]['OpenSpeed'];},VisuMZ['CoreEngine'][_0x231f54(0x504)]=Window_Base[_0x231f54(0x3fc)][_0x231f54(0x425)],Window_Base['prototype'][_0x231f54(0x425)]=function(){const _0x1b35d1=_0x231f54;VisuMZ[_0x1b35d1(0x703)][_0x1b35d1(0x504)][_0x1b35d1(0x690)](this),this[_0x1b35d1(0x762)]();},Window_Base['prototype'][_0x231f54(0x42b)]=function(){const _0x23d70f=_0x231f54;this[_0x23d70f(0x26d)]&&(this['openness']+=this[_0x23d70f(0x1c7)](),this['isOpen']()&&(this['_opening']=![]));},Window_Base[_0x231f54(0x3fc)][_0x231f54(0x80f)]=function(){const _0x2c7855=_0x231f54;if(this[_0x2c7855(0x5d7)]){if(_0x2c7855(0x2de)===_0x2c7855(0x814)){function _0x54f653(){const _0xecd3ce=_0x2c7855,_0x1c664c=_0x57ad0e[_0xecd3ce(0x703)][_0xecd3ce(0x200)][_0xecd3ce(0x2fe)];if(_0x1c664c&&_0x1c664c['randomJS'])return _0x1c664c['randomJS'][_0xecd3ce(0x690)](this);const _0x57b5be=_0x4fb02b['_shakePower']*0.75,_0x55e21c=_0x2d6bcd['_shakeSpeed']*0.6,_0x4c683b=_0x508028['_shakeDuration'];this['x']+=_0x13dc28[_0xecd3ce(0x64c)](_0x9017cb[_0xecd3ce(0x69c)](_0x57b5be)-_0x36e6d6[_0xecd3ce(0x69c)](_0x55e21c))*(_0x1bc1c9[_0xecd3ce(0x364)](_0x4c683b,0x1e)*0.5),this['y']+=_0x2a3a17[_0xecd3ce(0x64c)](_0xa0173e[_0xecd3ce(0x69c)](_0x57b5be)-_0x3dce47[_0xecd3ce(0x69c)](_0x55e21c))*(_0x7e36a[_0xecd3ce(0x364)](_0x4c683b,0x1e)*0.5);}}else this[_0x2c7855(0x6b3)]-=this[_0x2c7855(0x1c7)](),this[_0x2c7855(0x256)]()&&(this['_closing']=![]);}},VisuMZ[_0x231f54(0x703)][_0x231f54(0x75f)]=Window_Base[_0x231f54(0x3fc)]['drawText'],Window_Base['prototype'][_0x231f54(0x272)]=function(_0x46cfb5,_0x2ef87a,_0x5a9f98,_0x224a75,_0x31832f){const _0x363531=_0x231f54;if(this['useDigitGrouping']())_0x46cfb5=VisuMZ[_0x363531(0x4db)](_0x46cfb5);VisuMZ[_0x363531(0x703)][_0x363531(0x75f)]['call'](this,_0x46cfb5,_0x2ef87a,_0x5a9f98,_0x224a75,_0x31832f);},Window_Base[_0x231f54(0x3fc)][_0x231f54(0x35d)]=function(){const _0x227520=_0x231f54;return this[_0x227520(0x6f4)];},VisuMZ['CoreEngine'][_0x231f54(0x5a3)]=Window_Base[_0x231f54(0x3fc)][_0x231f54(0x29f)],Window_Base[_0x231f54(0x3fc)][_0x231f54(0x29f)]=function(_0x47bff4,_0x262114,_0x3d52b0,_0x1d71ba){const _0x27c191=_0x231f54;var _0x184596=VisuMZ[_0x27c191(0x703)][_0x27c191(0x5a3)][_0x27c191(0x690)](this,_0x47bff4,_0x262114,_0x3d52b0,_0x1d71ba);if(this[_0x27c191(0x4d3)]())_0x184596[_0x27c191(0x6d0)]=VisuMZ[_0x27c191(0x4db)](_0x184596[_0x27c191(0x6d0)]);return _0x184596;},Window_Base[_0x231f54(0x3fc)]['useDigitGroupingEx']=function(){const _0x112e52=_0x231f54;return this[_0x112e52(0x1e5)];},Window_Base[_0x231f54(0x3fc)][_0x231f54(0x580)]=function(_0x4396b3){const _0x3b31c2=_0x231f54;this[_0x3b31c2(0x6f4)]=_0x4396b3;},Window_Base[_0x231f54(0x3fc)][_0x231f54(0x6ca)]=function(_0x451ba2){this['_digitGroupingEx']=_0x451ba2;},VisuMZ[_0x231f54(0x703)][_0x231f54(0x2c2)]=Window_Base[_0x231f54(0x3fc)][_0x231f54(0x1c6)],Window_Base[_0x231f54(0x3fc)]['drawIcon']=function(_0x2eae57,_0x1e83e4,_0x44016b){const _0x565f13=_0x231f54;_0x1e83e4=Math[_0x565f13(0x64c)](_0x1e83e4),_0x44016b=Math[_0x565f13(0x64c)](_0x44016b),VisuMZ[_0x565f13(0x703)]['Window_Base_drawIcon'][_0x565f13(0x690)](this,_0x2eae57,_0x1e83e4,_0x44016b);},VisuMZ['CoreEngine']['Window_Base_drawFace']=Window_Base[_0x231f54(0x3fc)]['drawFace'],Window_Base[_0x231f54(0x3fc)][_0x231f54(0x4e3)]=function(_0x5bd19b,_0x56553b,_0x38a630,_0x11aad2,_0x1a83e9,_0x356c1a){const _0x17b986=_0x231f54;_0x1a83e9=_0x1a83e9||ImageManager[_0x17b986(0x1b7)],_0x356c1a=_0x356c1a||ImageManager[_0x17b986(0x25a)],_0x38a630=Math[_0x17b986(0x64c)](_0x38a630),_0x11aad2=Math[_0x17b986(0x64c)](_0x11aad2),_0x1a83e9=Math[_0x17b986(0x64c)](_0x1a83e9),_0x356c1a=Math['round'](_0x356c1a),VisuMZ[_0x17b986(0x703)][_0x17b986(0x19e)][_0x17b986(0x690)](this,_0x5bd19b,_0x56553b,_0x38a630,_0x11aad2,_0x1a83e9,_0x356c1a);},VisuMZ[_0x231f54(0x703)][_0x231f54(0x674)]=Window_Base[_0x231f54(0x3fc)][_0x231f54(0x28f)],Window_Base[_0x231f54(0x3fc)][_0x231f54(0x28f)]=function(_0x35d523,_0x449c82,_0x2dab07,_0x1ee963){const _0x321320=_0x231f54;_0x2dab07=Math['round'](_0x2dab07),_0x1ee963=Math[_0x321320(0x64c)](_0x1ee963),VisuMZ[_0x321320(0x703)][_0x321320(0x674)][_0x321320(0x690)](this,_0x35d523,_0x449c82,_0x2dab07,_0x1ee963);},VisuMZ['CoreEngine'][_0x231f54(0x61e)]=Window_Selectable['prototype'][_0x231f54(0x3dd)],Window_Selectable[_0x231f54(0x3fc)]['itemRect']=function(_0x21762e){const _0x111307=_0x231f54;let _0x146ef0=VisuMZ[_0x111307(0x703)]['Window_Selectable_itemRect']['call'](this,_0x21762e);return _0x146ef0['x']=Math[_0x111307(0x64c)](_0x146ef0['x']),_0x146ef0['y']=Math[_0x111307(0x64c)](_0x146ef0['y']),_0x146ef0[_0x111307(0x346)]=Math[_0x111307(0x64c)](_0x146ef0[_0x111307(0x346)]),_0x146ef0[_0x111307(0x31f)]=Math[_0x111307(0x64c)](_0x146ef0[_0x111307(0x31f)]),_0x146ef0;},VisuMZ[_0x231f54(0x703)]['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase['prototype'][_0x231f54(0x22a)],Window_StatusBase[_0x231f54(0x3fc)][_0x231f54(0x22a)]=function(_0x28cfa5,_0x12490b,_0x28906d){const _0x5033fe=_0x231f54;_0x12490b=Math['round'](_0x12490b),_0x28906d=Math['round'](_0x28906d),VisuMZ[_0x5033fe(0x703)][_0x5033fe(0x2fd)][_0x5033fe(0x690)](this,_0x28cfa5,_0x12490b,_0x28906d);},Window_Base[_0x231f54(0x3fc)][_0x231f54(0x7b9)]=function(){const _0x4dcb63=_0x231f54;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':_0x4dcb63(0x27f),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x4dcb63(0x831)]['x'],'targetScaleY':this[_0x4dcb63(0x831)]['y'],'targetOpacity':this[_0x4dcb63(0x379)],'targetBackOpacity':this[_0x4dcb63(0x521)],'targetContentsOpacity':this[_0x4dcb63(0x86c)]};},Window_Base['prototype'][_0x231f54(0x762)]=function(){const _0x190cac=_0x231f54;if(!this[_0x190cac(0x6bb)])return;if(this[_0x190cac(0x6bb)][_0x190cac(0x319)]<=0x0)return;this['x']=this[_0x190cac(0x5ff)](this['x'],this['_coreEasing'][_0x190cac(0x7ef)]),this['y']=this['applyCoreEasing'](this['y'],this[_0x190cac(0x6bb)][_0x190cac(0x1a6)]),this[_0x190cac(0x831)]['x']=this['applyCoreEasing'](this[_0x190cac(0x831)]['x'],this[_0x190cac(0x6bb)][_0x190cac(0x7dc)]),this[_0x190cac(0x831)]['y']=this[_0x190cac(0x5ff)](this[_0x190cac(0x831)]['y'],this[_0x190cac(0x6bb)][_0x190cac(0x3f2)]),this[_0x190cac(0x379)]=this[_0x190cac(0x5ff)](this['opacity'],this[_0x190cac(0x6bb)]['targetOpacity']),this[_0x190cac(0x521)]=this['applyCoreEasing'](this[_0x190cac(0x521)],this[_0x190cac(0x6bb)]['targetBackOpacity']),this[_0x190cac(0x86c)]=this[_0x190cac(0x5ff)](this[_0x190cac(0x86c)],this[_0x190cac(0x6bb)][_0x190cac(0x29c)]),this['_coreEasing'][_0x190cac(0x319)]--;},Window_Base['prototype'][_0x231f54(0x5ff)]=function(_0x2e0185,_0x1768e9){const _0x18983=_0x231f54;if(!this[_0x18983(0x6bb)])return _0x1768e9;const _0x40227e=this['_coreEasing'][_0x18983(0x319)],_0x5108b7=this[_0x18983(0x6bb)]['wholeDuration'],_0x538154=this['calcCoreEasing']((_0x5108b7-_0x40227e)/_0x5108b7),_0x438dfc=this[_0x18983(0x6e4)]((_0x5108b7-_0x40227e+0x1)/_0x5108b7),_0x2cc1e3=(_0x2e0185-_0x1768e9*_0x538154)/(0x1-_0x538154);return _0x2cc1e3+(_0x1768e9-_0x2cc1e3)*_0x438dfc;},Window_Base[_0x231f54(0x3fc)][_0x231f54(0x6e4)]=function(_0x4cdb15){const _0x36c2db=_0x231f54;if(!this[_0x36c2db(0x6bb)])return _0x4cdb15;return VisuMZ[_0x36c2db(0x36d)](_0x4cdb15,this[_0x36c2db(0x6bb)][_0x36c2db(0x2ef)]||_0x36c2db(0x27f));},Window_Base['prototype']['anchorCoreEasing']=function(_0x3a5c62,_0x1e2467){const _0x540707=_0x231f54;if(!this['_coreEasing'])return;this['x']=this[_0x540707(0x6bb)]['targetX'],this['y']=this[_0x540707(0x6bb)][_0x540707(0x1a6)],this[_0x540707(0x831)]['x']=this['_coreEasing'][_0x540707(0x7dc)],this[_0x540707(0x831)]['y']=this[_0x540707(0x6bb)][_0x540707(0x3f2)],this['opacity']=this['_coreEasing']['targetOpacity'],this[_0x540707(0x521)]=this[_0x540707(0x6bb)][_0x540707(0x630)],this[_0x540707(0x86c)]=this[_0x540707(0x6bb)][_0x540707(0x29c)],this['setupCoreEasing'](_0x3a5c62,_0x1e2467,this['x'],this['y'],this[_0x540707(0x831)]['x'],this[_0x540707(0x831)]['y'],this[_0x540707(0x379)],this['backOpacity'],this[_0x540707(0x86c)]);},Window_Base['prototype']['setupCoreEasing']=function(_0x55de66,_0x4691fc,_0x17aa2d,_0x12ddd4,_0x435dc4,_0x397d79,_0x1feff6,_0x3cd4f0,_0x19254a){this['_coreEasing']={'duration':_0x55de66,'wholeDuration':_0x55de66,'type':_0x4691fc,'targetX':_0x17aa2d,'targetY':_0x12ddd4,'targetScaleX':_0x435dc4,'targetScaleY':_0x397d79,'targetOpacity':_0x1feff6,'targetBackOpacity':_0x3cd4f0,'targetContentsOpacity':_0x19254a};},Window_Base[_0x231f54(0x3fc)][_0x231f54(0x407)]=function(_0xcd4712,_0x1cabad,_0x3d3304,_0x612ce,_0x19ee86){const _0x564e19=_0x231f54;this[_0x564e19(0x7ff)](),this[_0x564e19(0x3e6)][_0x564e19(0x626)]=VisuMZ[_0x564e19(0x703)][_0x564e19(0x200)][_0x564e19(0x4b5)][_0x564e19(0x5e3)];const _0x197fc9=VisuMZ[_0x564e19(0x703)][_0x564e19(0x200)][_0x564e19(0x4b5)]['GoldIcon'];if(_0x197fc9>0x0&&_0x1cabad===TextManager['currencyUnit']){if(_0x564e19(0x1b1)==='PYsNv'){const _0x259797=_0x612ce+(this['lineHeight']()-ImageManager[_0x564e19(0x2a4)])/0x2;this[_0x564e19(0x1c6)](_0x197fc9,_0x3d3304+(_0x19ee86-ImageManager[_0x564e19(0x815)]),_0x259797),_0x19ee86-=ImageManager[_0x564e19(0x815)]+0x4;}else{function _0x51ab86(){const _0x140106=_0x564e19;if(_0x1bd960)_0x381945[_0x140106(0x219)](_0x3aba83);}}}else{if(_0x564e19(0x837)!=='SQnMa'){function _0x374272(){const _0x1e81fe=_0x564e19;return _0x4e876d['CoreEngine'][_0x1e81fe(0x200)][_0x1e81fe(0x4ec)][_0x1e81fe(0x59e)];}}else this['changeTextColor'](ColorManager[_0x564e19(0x739)]()),this[_0x564e19(0x272)](_0x1cabad,_0x3d3304,_0x612ce,_0x19ee86,'right'),_0x19ee86-=this[_0x564e19(0x748)](_0x1cabad)+0x6;}this['resetTextColor']();const _0x77f7fd=this[_0x564e19(0x748)](this['_digitGrouping']?VisuMZ['GroupDigits'](_0xcd4712):_0xcd4712);if(_0x77f7fd>_0x19ee86){if(_0x564e19(0x5da)==='TzVlS')this[_0x564e19(0x272)](VisuMZ['CoreEngine'][_0x564e19(0x200)][_0x564e19(0x4b5)][_0x564e19(0x7fe)],_0x3d3304,_0x612ce,_0x19ee86,'right');else{function _0xf711(){return this['_fauxAnimationSprites']['length']>0x0;}}}else this[_0x564e19(0x272)](_0xcd4712,_0x3d3304,_0x612ce,_0x19ee86,_0x564e19(0x753));this[_0x564e19(0x7ff)]();},Window_Base[_0x231f54(0x3fc)][_0x231f54(0x756)]=function(_0x5d0e43,_0x29b7be,_0x4ceb96,_0x659a7c,_0x38c35e){const _0x46543d=_0x231f54,_0x23df16=ImageManager[_0x46543d(0x2e3)](_0x46543d(0x43f)),_0x117a62=ImageManager['iconWidth'],_0x1fa891=ImageManager[_0x46543d(0x2a4)],_0x4e422a=_0x5d0e43%0x10*_0x117a62,_0x41f3a8=Math['floor'](_0x5d0e43/0x10)*_0x1fa891,_0x3387cb=_0x659a7c,_0x52d90c=_0x659a7c;this[_0x46543d(0x3e6)][_0x46543d(0x671)]['imageSmoothingEnabled']=_0x38c35e,this['contents']['blt'](_0x23df16,_0x4e422a,_0x41f3a8,_0x117a62,_0x1fa891,_0x29b7be,_0x4ceb96,_0x3387cb,_0x52d90c),this[_0x46543d(0x3e6)][_0x46543d(0x671)]['imageSmoothingEnabled']=!![];},Window_Base[_0x231f54(0x3fc)][_0x231f54(0x4bc)]=function(_0x31027c,_0x3f6773,_0x4c0a89,_0x994c78,_0x5a49c8,_0x1bb55e){const _0x3d74d8=_0x231f54,_0xacf1cc=Math[_0x3d74d8(0x659)]((_0x4c0a89-0x2)*_0x994c78),_0x670ec9=Sprite_Gauge['prototype'][_0x3d74d8(0x629)]['call'](this),_0x54e2d3=_0x3f6773+this['lineHeight']()-_0x670ec9-0x2;this[_0x3d74d8(0x3e6)][_0x3d74d8(0x6fb)](_0x31027c,_0x54e2d3,_0x4c0a89,_0x670ec9,ColorManager[_0x3d74d8(0x6f2)]()),this[_0x3d74d8(0x3e6)][_0x3d74d8(0x614)](_0x31027c+0x1,_0x54e2d3+0x1,_0xacf1cc,_0x670ec9-0x2,_0x5a49c8,_0x1bb55e);},Window_Selectable[_0x231f54(0x3fc)][_0x231f54(0x391)]=function(_0x496ccc){const _0x104e4d=_0x231f54;let _0x207422=this[_0x104e4d(0x2fb)]();const _0x118145=this[_0x104e4d(0x657)](),_0x1727fe=this[_0x104e4d(0x69a)]();if(this['isUseModernControls']()&&(_0x207422<_0x118145||_0x496ccc&&_0x1727fe===0x1)){_0x207422+=_0x1727fe;if(_0x207422>=_0x118145)_0x207422=_0x118145-0x1;this['smoothSelect'](_0x207422);}else{if(!this['isUseModernControls']()){if(_0x207422<_0x118145-_0x1727fe||_0x496ccc&&_0x1727fe===0x1){if(_0x104e4d(0x6a1)===_0x104e4d(0x6a1))this[_0x104e4d(0x4d4)]((_0x207422+_0x1727fe)%_0x118145);else{function _0x14016b(){const _0x2ef006=_0x104e4d,_0x1b53ae=_0x4a4702[_0x2ef006(0x703)][_0x2ef006(0x200)][_0x2ef006(0x2fe)];if(_0x1b53ae&&_0x1b53ae[_0x2ef006(0x462)])return _0x1b53ae[_0x2ef006(0x462)][_0x2ef006(0x690)](this);this['x']+=_0x3cdc30[_0x2ef006(0x64c)](_0x394e2b[_0x2ef006(0x2d6)]());}}}}}},VisuMZ['CoreEngine'][_0x231f54(0x676)]=Window_Selectable[_0x231f54(0x3fc)][_0x231f54(0x391)],Window_Selectable[_0x231f54(0x3fc)][_0x231f54(0x391)]=function(_0x5c05cf){const _0x476612=_0x231f54;this[_0x476612(0x291)]()&&_0x5c05cf&&this[_0x476612(0x69a)]()===0x1&&this[_0x476612(0x2fb)]()===this[_0x476612(0x657)]()-0x1?this[_0x476612(0x4d4)](0x0):VisuMZ[_0x476612(0x703)][_0x476612(0x676)][_0x476612(0x690)](this,_0x5c05cf);},Window_Selectable[_0x231f54(0x3fc)][_0x231f54(0x6b1)]=function(_0x17e70c){const _0x56831e=_0x231f54;let _0x20136d=Math[_0x56831e(0x565)](0x0,this[_0x56831e(0x2fb)]());const _0x507c4c=this[_0x56831e(0x657)](),_0x1790b1=this[_0x56831e(0x69a)]();if(this[_0x56831e(0x291)]()&&_0x20136d>0x0||_0x17e70c&&_0x1790b1===0x1){_0x20136d-=_0x1790b1;if(_0x20136d<=0x0)_0x20136d=0x0;this[_0x56831e(0x4d4)](_0x20136d);}else{if(!this[_0x56831e(0x291)]()){if(_0x20136d>=_0x1790b1||_0x17e70c&&_0x1790b1===0x1){if(_0x56831e(0x729)!==_0x56831e(0x529))this[_0x56831e(0x4d4)]((_0x20136d-_0x1790b1+_0x507c4c)%_0x507c4c);else{function _0x405538(){const _0x57efc5=_0x56831e;this['cursorUp'](_0x2c8ee4[_0x57efc5(0x6d1)]('up'));}}}}}},VisuMZ[_0x231f54(0x703)]['Window_Selectable_cursorUp']=Window_Selectable[_0x231f54(0x3fc)][_0x231f54(0x6b1)],Window_Selectable['prototype'][_0x231f54(0x6b1)]=function(_0x15b865){const _0xb7792d=_0x231f54;if(this['isUseModernControls']()&&_0x15b865&&this[_0xb7792d(0x69a)]()===0x1&&this['index']()===0x0){if('poubf'!==_0xb7792d(0x4f9))this[_0xb7792d(0x4d4)](this[_0xb7792d(0x657)]()-0x1);else{function _0x2822e1(){const _0x18875f=_0xb7792d,_0x2d6aa6=_0x18875f(0x597);this[_0x18875f(0x4d5)]=this['_colorCache']||{};if(this[_0x18875f(0x4d5)][_0x2d6aa6])return this[_0x18875f(0x4d5)][_0x2d6aa6];const _0x484740=_0x23d685['CoreEngine'][_0x18875f(0x200)][_0x18875f(0x2f5)][_0x18875f(0x27a)];return this['getColorDataFromPluginParameters'](_0x2d6aa6,_0x484740);}}}else VisuMZ[_0xb7792d(0x703)][_0xb7792d(0x61c)]['call'](this,_0x15b865);},Window_Selectable[_0x231f54(0x3fc)]['isUseModernControls']=function(){const _0x176374=_0x231f54;return VisuMZ['CoreEngine']['Settings'][_0x176374(0x4ec)][_0x176374(0x849)];},VisuMZ[_0x231f54(0x703)][_0x231f54(0x59d)]=Window_Selectable['prototype'][_0x231f54(0x588)],Window_Selectable['prototype'][_0x231f54(0x588)]=function(){const _0x113117=_0x231f54;this[_0x113117(0x291)]()?(this[_0x113117(0x7c4)](),this['processCursorHomeEndTrigger']()):VisuMZ['CoreEngine'][_0x113117(0x59d)][_0x113117(0x690)](this);},Window_Selectable[_0x231f54(0x3fc)][_0x231f54(0x730)]=function(){return!![];},Window_Selectable[_0x231f54(0x3fc)][_0x231f54(0x7c4)]=function(){const _0x5918ad=_0x231f54;if(this[_0x5918ad(0x23d)]()){const _0x5d2cc9=this[_0x5918ad(0x2fb)]();if(Input[_0x5918ad(0x403)]('down')){if(_0x5918ad(0x83e)==='MGkQr'){function _0x2c16be(){const _0x2f2c14=_0x5918ad;if(_0x254918)_0x173c2f[_0x2f2c14(0x77b)](_0x3d705c);}}else{if(Input['isPressed'](_0x5918ad(0x5e8))&&this[_0x5918ad(0x730)]()){if(_0x5918ad(0x396)!==_0x5918ad(0x396)){function _0x5cf49f(){return 0xc0;}}else this['cursorPagedown']();}else this[_0x5918ad(0x391)](Input['isTriggered'](_0x5918ad(0x6c7)));}}Input[_0x5918ad(0x403)]('up')&&(Input['isPressed'](_0x5918ad(0x5e8))&&this[_0x5918ad(0x730)]()?this['cursorPageup']():this[_0x5918ad(0x6b1)](Input[_0x5918ad(0x6d1)]('up')));if(Input[_0x5918ad(0x403)](_0x5918ad(0x753))){if('iIInN'===_0x5918ad(0x3d7))this[_0x5918ad(0x77a)](Input[_0x5918ad(0x6d1)]('right'));else{function _0x4e6b07(){const _0x441287=_0x5918ad;this[_0x441287(0x74a)][_0x441287(0x669)](_0x19b5f2[_0x441287(0x807)][_0x441287(0x1d5)]);}}}Input[_0x5918ad(0x403)](_0x5918ad(0x827))&&this[_0x5918ad(0x71c)](Input[_0x5918ad(0x6d1)](_0x5918ad(0x827)));!this[_0x5918ad(0x642)](_0x5918ad(0x7dd))&&Input[_0x5918ad(0x403)](_0x5918ad(0x7dd))&&this['cursorPagedown']();if(!this[_0x5918ad(0x642)](_0x5918ad(0x30f))&&Input[_0x5918ad(0x403)](_0x5918ad(0x30f))){if(_0x5918ad(0x47b)!==_0x5918ad(0x47b)){function _0x2decd4(){const _0xaa10=_0x5918ad;return _0xaa10(0x5be);}}else this[_0x5918ad(0x1a0)]();}this[_0x5918ad(0x2fb)]()!==_0x5d2cc9&&this[_0x5918ad(0x3c3)]();}},Window_Selectable['prototype'][_0x231f54(0x43c)]=function(){const _0x55e842=_0x231f54;if(this[_0x55e842(0x23d)]()){if(_0x55e842(0x6c2)!=='nrrsE'){const _0x3bbaca=this[_0x55e842(0x2fb)]();if(Input[_0x55e842(0x6d1)](_0x55e842(0x237))){if(_0x55e842(0x5cc)!==_0x55e842(0x5cc)){function _0x19f669(){const _0x36bd79=_0x55e842;this[_0x36bd79(0x1a0)]();}}else this[_0x55e842(0x4d4)](Math[_0x55e842(0x364)](this['index'](),0x0));}if(Input[_0x55e842(0x6d1)]('end')){if('ZUrpt'!==_0x55e842(0x812))this[_0x55e842(0x4d4)](Math['max'](this[_0x55e842(0x2fb)](),this[_0x55e842(0x657)]()-0x1));else{function _0x380bde(){const _0xcc764b=_0x55e842;return _0x275ee6[_0xcc764b(0x807)][_0xcc764b(0x2d3)][_0xcc764b(0x690)](this);}}}this[_0x55e842(0x2fb)]()!==_0x3bbaca&&this[_0x55e842(0x3c3)]();}else{function _0x510e09(){this['cursorPagedown']();}}}},VisuMZ[_0x231f54(0x703)][_0x231f54(0x816)]=Window_Selectable[_0x231f54(0x3fc)][_0x231f54(0x25b)],Window_Selectable['prototype'][_0x231f54(0x25b)]=function(){const _0x3ed957=_0x231f54;if(this['isUseModernControls']())this[_0x3ed957(0x544)]();else{if(_0x3ed957(0x6be)!==_0x3ed957(0x6c3))VisuMZ[_0x3ed957(0x703)][_0x3ed957(0x816)]['call'](this);else{function _0x478551(){const _0x42397e=_0x3ed957;return _0x1560a5[_0x42397e(0x36a)];}}}},Window_Selectable[_0x231f54(0x3fc)][_0x231f54(0x544)]=function(){const _0x1e6ffe=_0x231f54;VisuMZ[_0x1e6ffe(0x703)][_0x1e6ffe(0x816)][_0x1e6ffe(0x690)](this);},Window_Selectable[_0x231f54(0x3fc)][_0x231f54(0x54f)]=function(){const _0x1ddaf8=_0x231f54;return VisuMZ[_0x1ddaf8(0x703)][_0x1ddaf8(0x200)][_0x1ddaf8(0x860)]['ColSpacing'];},Window_Selectable[_0x231f54(0x3fc)][_0x231f54(0x73a)]=function(){const _0x564669=_0x231f54;return VisuMZ['CoreEngine'][_0x564669(0x200)][_0x564669(0x860)][_0x564669(0x81b)];},Window_Selectable[_0x231f54(0x3fc)][_0x231f54(0x6a4)]=function(){const _0x12007b=_0x231f54;return Window_Scrollable[_0x12007b(0x3fc)][_0x12007b(0x6a4)][_0x12007b(0x690)](this)+VisuMZ['CoreEngine'][_0x12007b(0x200)][_0x12007b(0x860)]['ItemHeight'];;},VisuMZ[_0x231f54(0x703)][_0x231f54(0x499)]=Window_Selectable['prototype']['drawBackgroundRect'],Window_Selectable[_0x231f54(0x3fc)][_0x231f54(0x635)]=function(_0xc7700d){const _0x357587=_0x231f54,_0x363043=VisuMZ['CoreEngine']['Settings'][_0x357587(0x860)];if(_0x363043[_0x357587(0x52f)]===![])return;if(_0x363043[_0x357587(0x290)])_0x363043[_0x357587(0x290)][_0x357587(0x690)](this,_0xc7700d);else{if(_0x357587(0x1b0)===_0x357587(0x1b0))VisuMZ[_0x357587(0x703)][_0x357587(0x499)][_0x357587(0x690)](this,_0xc7700d);else{function _0x2630e2(){const _0x32153f=_0x357587;_0x289ae7+=_0x32153f(0x6ee);}}}},VisuMZ[_0x231f54(0x703)][_0x231f54(0x579)]=Window_Gold[_0x231f54(0x3fc)][_0x231f54(0x1c4)],Window_Gold[_0x231f54(0x3fc)][_0x231f54(0x1c4)]=function(){const _0x2e29a1=_0x231f54;if(this[_0x2e29a1(0x81e)]()){if(_0x2e29a1(0x75a)!==_0x2e29a1(0x824))this['drawGoldItemStyle']();else{function _0x9e95ed(){const _0x739ca=_0x2e29a1,_0x150b53=_0x1ee370[_0x739ca(0x703)][_0x739ca(0x200)]['ImgLoad'][_0x183b8a],_0xe9792=_0x739ca(0x7ab)[_0x739ca(0x333)](_0x25016c);for(const _0x1cfc04 of _0x150b53){_0x1a8177['loadBitmap'](_0xe9792,_0x1cfc04);}}}}else VisuMZ[_0x2e29a1(0x703)][_0x2e29a1(0x579)][_0x2e29a1(0x690)](this);},Window_Gold[_0x231f54(0x3fc)][_0x231f54(0x81e)]=function(){const _0x565c93=_0x231f54;if(TextManager[_0x565c93(0x289)]!==this[_0x565c93(0x289)]())return![];return VisuMZ[_0x565c93(0x703)][_0x565c93(0x200)][_0x565c93(0x4b5)][_0x565c93(0x6ba)];},Window_Gold[_0x231f54(0x3fc)][_0x231f54(0x568)]=function(){const _0x48c959=_0x231f54;this[_0x48c959(0x7ff)](),this[_0x48c959(0x3e6)][_0x48c959(0x7f6)](),this[_0x48c959(0x3e6)][_0x48c959(0x626)]=VisuMZ[_0x48c959(0x703)][_0x48c959(0x200)]['Gold']['GoldFontSize'];const _0x393bfd=VisuMZ[_0x48c959(0x703)][_0x48c959(0x200)]['Gold'][_0x48c959(0x83f)],_0x525029=this[_0x48c959(0x21e)](0x0);if(_0x393bfd>0x0){const _0x3e4560=_0x525029['y']+(this[_0x48c959(0x488)]()-ImageManager[_0x48c959(0x2a4)])/0x2;this[_0x48c959(0x1c6)](_0x393bfd,_0x525029['x'],_0x3e4560);const _0x1977cd=ImageManager['iconWidth']+0x4;_0x525029['x']+=_0x1977cd,_0x525029[_0x48c959(0x346)]-=_0x1977cd;}this[_0x48c959(0x19f)](ColorManager['systemColor']()),this['drawText'](this['currencyUnit'](),_0x525029['x'],_0x525029['y'],_0x525029[_0x48c959(0x346)],_0x48c959(0x827));const _0x43072e=this['textWidth'](this['currencyUnit']())+0x6;;_0x525029['x']+=_0x43072e,_0x525029['width']-=_0x43072e,this['resetTextColor']();const _0x1b1480=this['value'](),_0xac61a9=this[_0x48c959(0x748)](this['_digitGrouping']?VisuMZ['GroupDigits'](this['value']()):this[_0x48c959(0x3c0)]());_0xac61a9>_0x525029[_0x48c959(0x346)]?this[_0x48c959(0x272)](VisuMZ[_0x48c959(0x703)][_0x48c959(0x200)][_0x48c959(0x4b5)][_0x48c959(0x7fe)],_0x525029['x'],_0x525029['y'],_0x525029[_0x48c959(0x346)],_0x48c959(0x753)):this[_0x48c959(0x272)](this[_0x48c959(0x3c0)](),_0x525029['x'],_0x525029['y'],_0x525029[_0x48c959(0x346)],_0x48c959(0x753)),this[_0x48c959(0x7ff)]();},Window_StatusBase[_0x231f54(0x3fc)][_0x231f54(0x51a)]=function(_0x367822,_0xc44d34,_0x200cd3,_0x445ba0,_0x169c1a){const _0x3bb269=_0x231f54;_0x445ba0=String(_0x445ba0||'')['toUpperCase']();if(VisuMZ[_0x3bb269(0x703)][_0x3bb269(0x200)][_0x3bb269(0x502)][_0x3bb269(0x618)]){const _0x39c8ad=VisuMZ['GetParamIcon'](_0x445ba0);if(_0x169c1a)this[_0x3bb269(0x756)](_0x39c8ad,_0x367822,_0xc44d34,this[_0x3bb269(0x699)]()),_0x200cd3-=this[_0x3bb269(0x699)]()+0x2,_0x367822+=this['gaugeLineHeight']()+0x2;else{if(_0x3bb269(0x74d)==='Heaqb'){function _0x1dd230(){const _0x3e4cd0=_0x3bb269,_0x1a4876=this[_0x3e4cd0(0x1f0)](),_0x190456=this['_tempActor'][_0x3e4cd0(0x774)](_0x10c03a),_0x3a51d8=_0x190456-this[_0x3e4cd0(0x845)]['paramValueByName'](_0x2c1341);this[_0x3e4cd0(0x19f)](_0x432a59[_0x3e4cd0(0x33e)](_0x3a51d8)),this['drawText'](this['_tempActor'][_0x3e4cd0(0x774)](_0x22c184,!![]),_0x253bbe,_0x477d96,_0x1a4876,_0x3e4cd0(0x753));}}else this[_0x3bb269(0x1c6)](_0x39c8ad,_0x367822+0x2,_0xc44d34+0x2),_0x200cd3-=ImageManager['iconWidth']+0x4,_0x367822+=ImageManager[_0x3bb269(0x815)]+0x4;}}const _0x5763dc=TextManager[_0x3bb269(0x87d)](_0x445ba0);this[_0x3bb269(0x7ff)](),this[_0x3bb269(0x19f)](ColorManager[_0x3bb269(0x739)]()),_0x169c1a?(this[_0x3bb269(0x3e6)][_0x3bb269(0x626)]=this[_0x3bb269(0x3b5)](),this[_0x3bb269(0x3e6)][_0x3bb269(0x272)](_0x5763dc,_0x367822,_0xc44d34,_0x200cd3,this[_0x3bb269(0x699)](),_0x3bb269(0x827))):this[_0x3bb269(0x272)](_0x5763dc,_0x367822,_0xc44d34,_0x200cd3),this['resetFontSettings']();},Window_StatusBase['prototype']['smallParamFontSize']=function(){const _0x2883d1=_0x231f54;return $gameSystem[_0x2883d1(0x2b8)]()-0x8;},Window_StatusBase['prototype'][_0x231f54(0x460)]=function(_0x4348c8,_0x26b31e,_0x1c5b74,_0x312fc0){const _0x2907d5=_0x231f54;_0x312fc0=_0x312fc0||0xa8,this[_0x2907d5(0x2dd)]();if(VisuMZ[_0x2907d5(0x703)][_0x2907d5(0x200)]['UI'][_0x2907d5(0x32b)]){if('Jbvdz'===_0x2907d5(0x510))this[_0x2907d5(0x3af)](_0x4348c8[_0x2907d5(0x553)]()['name'],_0x26b31e,_0x1c5b74,_0x312fc0);else{function _0x37e998(){const _0x4c3efc=_0x2907d5;if(_0x12f29f[_0x4c3efc(0x6d1)]()&&this[_0x4c3efc(0x781)]())this[_0x4c3efc(0x68f)]('default');else _0x17f8d4['isCancelled']()&&this[_0x4c3efc(0x68f)](_0x4c3efc(0x6e0));}}}else{const _0x2917f5=_0x4348c8['currentClass']()[_0x2907d5(0x271)][_0x2907d5(0x4da)](/\\I\[(\d+)\]/gi,'');this[_0x2907d5(0x272)](_0x2917f5,_0x26b31e,_0x1c5b74,_0x312fc0);}},Window_StatusBase[_0x231f54(0x3fc)][_0x231f54(0x5d4)]=function(_0x4675ae,_0xbc45f2,_0x127a5a,_0x5382d3){const _0x72fd61=_0x231f54;_0x5382d3=_0x5382d3||0x10e,this[_0x72fd61(0x2dd)]();if(VisuMZ[_0x72fd61(0x703)][_0x72fd61(0x200)]['UI']['TextCodeNicknames'])this[_0x72fd61(0x3af)](_0x4675ae['nickname'](),_0xbc45f2,_0x127a5a,_0x5382d3);else{const _0x37df09=_0x4675ae['nickname']()[_0x72fd61(0x4da)](/\\I\[(\d+)\]/gi,'');this[_0x72fd61(0x272)](_0x4675ae[_0x72fd61(0x241)](),_0xbc45f2,_0x127a5a,_0x5382d3);}},VisuMZ[_0x231f54(0x703)][_0x231f54(0x2f7)]=Window_StatusBase['prototype'][_0x231f54(0x5bd)],Window_StatusBase[_0x231f54(0x3fc)][_0x231f54(0x5bd)]=function(_0x3c3144,_0x52f91f,_0x337e0b){const _0x1c5873=_0x231f54;if(this[_0x1c5873(0x3c2)]())this[_0x1c5873(0x873)](_0x3c3144,_0x52f91f,_0x337e0b);VisuMZ[_0x1c5873(0x703)]['Window_StatusBase_drawActorLevel'][_0x1c5873(0x690)](this,_0x3c3144,_0x52f91f,_0x337e0b);},Window_StatusBase[_0x231f54(0x3fc)][_0x231f54(0x3c2)]=function(){const _0x182f67=_0x231f54;return VisuMZ[_0x182f67(0x703)][_0x182f67(0x200)]['UI']['LvExpGauge'];},Window_StatusBase[_0x231f54(0x3fc)]['drawActorExpGauge']=function(_0x2484a1,_0x4a0c7e,_0x2afec8){const _0x5f484e=_0x231f54;if(!_0x2484a1)return;if(!_0x2484a1[_0x5f484e(0x2a1)]())return;const _0x2b3a73=0x80,_0x354ddc=_0x2484a1['expRate']();let _0x135992=ColorManager[_0x5f484e(0x1e6)](),_0x58d061=ColorManager[_0x5f484e(0x879)]();_0x354ddc>=0x1&&(_0x135992=ColorManager['maxLvGaugeColor1'](),_0x58d061=ColorManager[_0x5f484e(0x5cd)]()),this[_0x5f484e(0x4bc)](_0x4a0c7e,_0x2afec8,_0x2b3a73,_0x354ddc,_0x135992,_0x58d061);},Window_EquipStatus[_0x231f54(0x3fc)]['drawAllParams']=function(){const _0x2429f5=_0x231f54;let _0x3b3e29=0x0;for(const _0x262e29 of VisuMZ[_0x2429f5(0x703)][_0x2429f5(0x200)][_0x2429f5(0x502)][_0x2429f5(0x208)]){if(_0x2429f5(0x249)!==_0x2429f5(0x249)){function _0x24d699(){return'';}}else{const _0x42a607=this[_0x2429f5(0x325)](),_0x5593d8=this[_0x2429f5(0x646)](_0x3b3e29);this[_0x2429f5(0x2ea)](_0x42a607,_0x5593d8,_0x262e29),_0x3b3e29++;}}},Window_EquipStatus[_0x231f54(0x3fc)][_0x231f54(0x722)]=function(_0x55de40,_0xd400db,_0x4f0cac){const _0x40b2cc=_0x231f54,_0x2d36f3=this['paramX']()-this['itemPadding']()*0x2;this[_0x40b2cc(0x51a)](_0x55de40,_0xd400db,_0x2d36f3,_0x4f0cac,![]);},Window_EquipStatus[_0x231f54(0x3fc)][_0x231f54(0x4f4)]=function(_0x4774fd,_0x459cf6,_0x1b94f9){const _0x112c6e=_0x231f54,_0x5315a3=this['paramWidth']();this['resetTextColor'](),this[_0x112c6e(0x272)](this[_0x112c6e(0x845)]['paramValueByName'](_0x1b94f9,!![]),_0x4774fd,_0x459cf6,_0x5315a3,_0x112c6e(0x753));},Window_EquipStatus['prototype'][_0x231f54(0x445)]=function(_0x341322,_0x3765b0){const _0x29dd1a=_0x231f54,_0x296e2d=this[_0x29dd1a(0x6c9)]();this[_0x29dd1a(0x19f)](ColorManager[_0x29dd1a(0x739)]());const _0x3abb9a=VisuMZ[_0x29dd1a(0x703)]['Settings']['UI'][_0x29dd1a(0x2d0)];this[_0x29dd1a(0x272)](_0x3abb9a,_0x341322,_0x3765b0,_0x296e2d,_0x29dd1a(0x5f8));},Window_EquipStatus[_0x231f54(0x3fc)][_0x231f54(0x2bb)]=function(_0x306e4f,_0x37ddc5,_0x1e42a2){const _0x5bc77c=_0x231f54,_0x4eb0c5=this[_0x5bc77c(0x1f0)](),_0x5c071b=this[_0x5bc77c(0x683)]['paramValueByName'](_0x1e42a2),_0x58c208=_0x5c071b-this[_0x5bc77c(0x845)][_0x5bc77c(0x774)](_0x1e42a2);this['changeTextColor'](ColorManager['paramchangeTextColor'](_0x58c208)),this[_0x5bc77c(0x272)](this[_0x5bc77c(0x683)][_0x5bc77c(0x774)](_0x1e42a2,!![]),_0x306e4f,_0x37ddc5,_0x4eb0c5,'right');},VisuMZ[_0x231f54(0x703)][_0x231f54(0x363)]=Window_EquipItem[_0x231f54(0x3fc)][_0x231f54(0x25d)],Window_EquipItem[_0x231f54(0x3fc)][_0x231f54(0x25d)]=function(_0x4184b9){const _0x3f6bdb=_0x231f54;return _0x4184b9&&this[_0x3f6bdb(0x845)]?this[_0x3f6bdb(0x845)]['canEquip'](_0x4184b9):VisuMZ[_0x3f6bdb(0x703)][_0x3f6bdb(0x363)][_0x3f6bdb(0x690)](this,_0x4184b9);},Window_StatusParams['prototype']['maxItems']=function(){const _0x23a5ac=_0x231f54;return VisuMZ[_0x23a5ac(0x703)][_0x23a5ac(0x200)][_0x23a5ac(0x502)][_0x23a5ac(0x208)][_0x23a5ac(0x533)];},Window_StatusParams['prototype'][_0x231f54(0x2ea)]=function(_0x1e2625){const _0x3ce087=_0x231f54,_0x247009=this[_0x3ce087(0x21e)](_0x1e2625),_0x4a3a0e=VisuMZ['CoreEngine'][_0x3ce087(0x200)][_0x3ce087(0x502)][_0x3ce087(0x208)][_0x1e2625],_0x498741=TextManager[_0x3ce087(0x87d)](_0x4a3a0e),_0x2306b1=this[_0x3ce087(0x845)][_0x3ce087(0x774)](_0x4a3a0e,!![]);this[_0x3ce087(0x51a)](_0x247009['x'],_0x247009['y'],0xa0,_0x4a3a0e,![]),this[_0x3ce087(0x2dd)](),this[_0x3ce087(0x272)](_0x2306b1,_0x247009['x']+0xa0,_0x247009['y'],0x3c,_0x3ce087(0x753));};if(VisuMZ['CoreEngine'][_0x231f54(0x200)][_0x231f54(0x7d2)]['EnableNameInput']){VisuMZ[_0x231f54(0x703)]['Settings'][_0x231f54(0x7d2)]['QwertyLayout']&&(Window_NameInput[_0x231f54(0x660)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x231f54(0x74b),'OK']);;VisuMZ[_0x231f54(0x703)]['Window_NameInput_initialize']=Window_NameInput[_0x231f54(0x3fc)][_0x231f54(0x2b6)],Window_NameInput[_0x231f54(0x3fc)][_0x231f54(0x2b6)]=function(_0x468d62){const _0x25921b=_0x231f54;this['_mode']=this[_0x25921b(0x631)](),VisuMZ[_0x25921b(0x703)][_0x25921b(0x5fc)][_0x25921b(0x690)](this,_0x468d62);if(this[_0x25921b(0x6bd)]===_0x25921b(0x6e0)){if(_0x25921b(0x4d0)!==_0x25921b(0x479))this['select'](0x0);else{function _0x589297(){const _0x12e411=_0x25921b;return _0x308fa4[_0x12e411(0x703)]['Settings'][_0x12e411(0x2f5)][_0x12e411(0x75e)]['call'](this,_0x2eb921);}}}else Input['clear'](),this['deselect']();},Window_NameInput[_0x231f54(0x3fc)][_0x231f54(0x631)]=function(){const _0x276840=_0x231f54;if(Input[_0x276840(0x705)]())return'default';return VisuMZ['CoreEngine'][_0x276840(0x200)][_0x276840(0x7d2)][_0x276840(0x37d)]||_0x276840(0x639);},VisuMZ[_0x231f54(0x703)][_0x231f54(0x57c)]=Window_NameInput[_0x231f54(0x3fc)][_0x231f54(0x42d)],Window_NameInput[_0x231f54(0x3fc)]['processHandling']=function(){const _0x25e3d7=_0x231f54;if(!this[_0x25e3d7(0x285)]())return;if(!this[_0x25e3d7(0x470)])return;if(this[_0x25e3d7(0x6bd)]===_0x25e3d7(0x639)&&Input['isGamepadTriggered']()){if(_0x25e3d7(0x24f)==='dfqwU')this[_0x25e3d7(0x68f)](_0x25e3d7(0x6e0));else{function _0x2859e3(){const _0x219871=_0x25e3d7;_0x358d31[_0x219871(0x4de)]=!![];}}}else{if(Input[_0x25e3d7(0x665)](_0x25e3d7(0x559))){if('WtQFc'==='tVVjQ'){function _0x2c4687(){const _0x2f4a13=_0x25e3d7;_0x361006[_0x2f4a13(0x1ee)]()||this['_isButtonHidden']?this[_0x2f4a13(0x68d)]():_0x536b8f[_0x2f4a13(0x703)][_0x2f4a13(0x22f)][_0x2f4a13(0x690)](this);}}else Input[_0x25e3d7(0x7f6)](),this[_0x25e3d7(0x596)]();}else{if(Input[_0x25e3d7(0x6d1)]('tab'))Input['clear'](),this['_mode']===_0x25e3d7(0x639)?this['switchModes'](_0x25e3d7(0x6e0)):this[_0x25e3d7(0x68f)]('keyboard');else{if(this[_0x25e3d7(0x6bd)]===_0x25e3d7(0x639))this[_0x25e3d7(0x2a2)]();else{if(Input[_0x25e3d7(0x665)](_0x25e3d7(0x649))){if(_0x25e3d7(0x802)===_0x25e3d7(0x678)){function _0x38884f(){const _0x20a0e0=_0x25e3d7;_0x4f207b[_0x20a0e0(0x703)][_0x20a0e0(0x48f)][_0x20a0e0(0x690)](this),_0x459b33[_0x20a0e0(0x617)]()&&this['repositionCancelButtonSideButtonLayout']();}}else Input['clear'](),this[_0x25e3d7(0x68f)](_0x25e3d7(0x639));}else VisuMZ['CoreEngine'][_0x25e3d7(0x57c)][_0x25e3d7(0x690)](this);}}}}},VisuMZ['CoreEngine']['Window_NameInput_processTouch']=Window_NameInput[_0x231f54(0x3fc)][_0x231f54(0x25b)],Window_NameInput[_0x231f54(0x3fc)][_0x231f54(0x25b)]=function(){const _0x2f01fb=_0x231f54;if(!this[_0x2f01fb(0x397)]())return;if(this[_0x2f01fb(0x6bd)]==='keyboard'){if(TouchInput[_0x2f01fb(0x6d1)]()&&this[_0x2f01fb(0x781)]())this[_0x2f01fb(0x68f)](_0x2f01fb(0x6e0));else TouchInput[_0x2f01fb(0x192)]()&&this[_0x2f01fb(0x68f)](_0x2f01fb(0x6e0));}else VisuMZ[_0x2f01fb(0x703)]['Window_NameInput_processTouch'][_0x2f01fb(0x690)](this);},Window_NameInput[_0x231f54(0x3fc)][_0x231f54(0x2a2)]=function(){const _0x443959=_0x231f54;if(Input[_0x443959(0x665)](_0x443959(0x68b)))Input[_0x443959(0x7f6)](),this[_0x443959(0x7d7)]();else{if(Input['_inputString']!==undefined){if(_0x443959(0x5b0)!==_0x443959(0x5b0)){function _0x4ff872(){const _0x16aed3=_0x443959;return _0x5a25ba[_0x16aed3(0x573)](this),_0x5a3621[_0x16aed3(0x703)][_0x16aed3(0x1b6)]['call'](this,_0x477f75);}}else{let _0x330073=Input[_0x443959(0x759)],_0x5081e8=_0x330073['length'];for(let _0x4d1888=0x0;_0x4d1888<_0x5081e8;++_0x4d1888){this[_0x443959(0x54b)]['add'](_0x330073[_0x4d1888])?SoundManager[_0x443959(0x5e9)]():SoundManager[_0x443959(0x3e1)]();}Input[_0x443959(0x7f6)]();}}}},Window_NameInput[_0x231f54(0x3fc)][_0x231f54(0x68f)]=function(_0x270413){const _0x4df23d=_0x231f54;let _0x2a1e5b=this['_mode'];this[_0x4df23d(0x6bd)]=_0x270413;if(_0x2a1e5b!==this[_0x4df23d(0x6bd)]){if(_0x4df23d(0x728)===_0x4df23d(0x728)){this['refresh'](),SoundManager[_0x4df23d(0x5e9)]();if(this[_0x4df23d(0x6bd)]===_0x4df23d(0x6e0)){if('huBIJ'!==_0x4df23d(0x5ad))this[_0x4df23d(0x49a)](0x0);else{function _0x1a558b(){const _0x4d2ede=_0x4df23d;this[_0x4d2ede(0x6b3)]+=this[_0x4d2ede(0x1c7)](),this[_0x4d2ede(0x285)]()&&(this[_0x4d2ede(0x26d)]=![]);}}}else this[_0x4df23d(0x49a)](-0x1);}else{function _0x37da60(){const _0x53e987=_0x4df23d;_0x44b9f0+=_0x3ed6de[_0x53e987(0x3fc)][_0x53e987(0x488)]();}}}},VisuMZ[_0x231f54(0x703)][_0x231f54(0x58d)]=Window_NameInput[_0x231f54(0x3fc)][_0x231f54(0x391)],Window_NameInput['prototype'][_0x231f54(0x391)]=function(_0xa2bc4b){const _0x53e7c5=_0x231f54;if(this['_mode']===_0x53e7c5(0x639)&&!Input[_0x53e7c5(0x22d)]())return;if(Input[_0x53e7c5(0x482)]())return;VisuMZ[_0x53e7c5(0x703)][_0x53e7c5(0x58d)][_0x53e7c5(0x690)](this,_0xa2bc4b),this[_0x53e7c5(0x68f)](_0x53e7c5(0x6e0));},VisuMZ['CoreEngine'][_0x231f54(0x58b)]=Window_NameInput[_0x231f54(0x3fc)][_0x231f54(0x6b1)],Window_NameInput[_0x231f54(0x3fc)][_0x231f54(0x6b1)]=function(_0x3283e1){const _0x32faf7=_0x231f54;if(this[_0x32faf7(0x6bd)]===_0x32faf7(0x639)&&!Input['isArrowPressed']())return;if(Input[_0x32faf7(0x482)]())return;VisuMZ[_0x32faf7(0x703)][_0x32faf7(0x58b)]['call'](this,_0x3283e1),this['switchModes'](_0x32faf7(0x6e0));},VisuMZ[_0x231f54(0x703)][_0x231f54(0x5a8)]=Window_NameInput[_0x231f54(0x3fc)][_0x231f54(0x77a)],Window_NameInput[_0x231f54(0x3fc)]['cursorRight']=function(_0x3688ae){const _0x48aedc=_0x231f54;if(this[_0x48aedc(0x6bd)]===_0x48aedc(0x639)&&!Input['isArrowPressed']())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x48aedc(0x703)][_0x48aedc(0x5a8)][_0x48aedc(0x690)](this,_0x3688ae),this[_0x48aedc(0x68f)]('default');},VisuMZ[_0x231f54(0x703)][_0x231f54(0x2b0)]=Window_NameInput[_0x231f54(0x3fc)][_0x231f54(0x71c)],Window_NameInput[_0x231f54(0x3fc)][_0x231f54(0x71c)]=function(_0x609933){const _0x146d1c=_0x231f54;if(this['_mode']==='keyboard'&&!Input['isArrowPressed']())return;if(Input[_0x146d1c(0x482)]())return;VisuMZ[_0x146d1c(0x703)][_0x146d1c(0x2b0)][_0x146d1c(0x690)](this,_0x609933),this['switchModes'](_0x146d1c(0x6e0));},VisuMZ['CoreEngine']['Window_NameInput_cursorPagedown']=Window_NameInput['prototype']['cursorPagedown'],Window_NameInput[_0x231f54(0x3fc)]['cursorPagedown']=function(){const _0x767171=_0x231f54;if(this['_mode']==='keyboard')return;if(Input[_0x767171(0x482)]())return;VisuMZ['CoreEngine'][_0x767171(0x6ce)][_0x767171(0x690)](this),this[_0x767171(0x68f)](_0x767171(0x6e0));},VisuMZ['CoreEngine']['Window_NameInput_cursorPageup']=Window_NameInput['prototype'][_0x231f54(0x1a0)],Window_NameInput[_0x231f54(0x3fc)][_0x231f54(0x1a0)]=function(){const _0x28e49e=_0x231f54;if(this[_0x28e49e(0x6bd)]===_0x28e49e(0x639))return;if(Input[_0x28e49e(0x482)]())return;VisuMZ[_0x28e49e(0x703)][_0x28e49e(0x6f0)][_0x28e49e(0x690)](this),this['switchModes']('default');},VisuMZ['CoreEngine'][_0x231f54(0x53e)]=Window_NameInput[_0x231f54(0x3fc)]['refresh'],Window_NameInput[_0x231f54(0x3fc)][_0x231f54(0x1c4)]=function(){const _0x2332ff=_0x231f54;if(this[_0x2332ff(0x6bd)]===_0x2332ff(0x639)){if(_0x2332ff(0x704)===_0x2332ff(0x51e)){function _0x155ec4(){const _0x47716f=_0x2332ff;return _0x4f60c5['CoreEngine'][_0x47716f(0x75b)][_0x47716f(0x690)](this,_0xc66df1);}}else{this[_0x2332ff(0x3e6)][_0x2332ff(0x7f6)](),this[_0x2332ff(0x18c)][_0x2332ff(0x7f6)](),this[_0x2332ff(0x2dd)]();let _0x886b74=VisuMZ['CoreEngine'][_0x2332ff(0x200)]['KeyboardInput'][_0x2332ff(0x48a)][_0x2332ff(0x64e)]('\x0a'),_0x504d32=_0x886b74[_0x2332ff(0x533)],_0x37ad88=(this[_0x2332ff(0x7a6)]-_0x504d32*this[_0x2332ff(0x488)]())/0x2;for(let _0x5c37aa=0x0;_0x5c37aa<_0x504d32;++_0x5c37aa){let _0x48825a=_0x886b74[_0x5c37aa],_0x3b028e=this['textSizeEx'](_0x48825a)['width'],_0x186cdf=Math[_0x2332ff(0x659)]((this[_0x2332ff(0x3e6)][_0x2332ff(0x346)]-_0x3b028e)/0x2);this['drawTextEx'](_0x48825a,_0x186cdf,_0x37ad88),_0x37ad88+=this[_0x2332ff(0x488)]();}}}else VisuMZ[_0x2332ff(0x703)][_0x2332ff(0x53e)][_0x2332ff(0x690)](this);};};VisuMZ[_0x231f54(0x703)]['Window_ShopSell_isEnabled']=Window_ShopSell[_0x231f54(0x3fc)]['isEnabled'],Window_ShopSell['prototype'][_0x231f54(0x25d)]=function(_0x4d4b7a){const _0x145fc4=_0x231f54;if(VisuMZ['CoreEngine'][_0x145fc4(0x200)]['QoL'][_0x145fc4(0x25c)]&&DataManager[_0x145fc4(0x20c)](_0x4d4b7a)){if(_0x145fc4(0x4c9)===_0x145fc4(0x468)){function _0x4a4b97(){const _0xdf347c=_0x145fc4;return _0x3f964a['CoreEngine'][_0xdf347c(0x200)]['QoL']['DigitGroupingDamageSprites'];}}else return![];}else return VisuMZ[_0x145fc4(0x703)]['Window_ShopSell_isEnabled'][_0x145fc4(0x690)](this,_0x4d4b7a);},Window_NumberInput['prototype']['isUseModernControls']=function(){return![];};VisuMZ[_0x231f54(0x703)]['Settings'][_0x231f54(0x7d2)]['EnableNumberInput']&&(VisuMZ[_0x231f54(0x703)][_0x231f54(0x6c5)]=Window_NumberInput['prototype'][_0x231f54(0x3b8)],Window_NumberInput[_0x231f54(0x3fc)][_0x231f54(0x3b8)]=function(){const _0x17ee57=_0x231f54;VisuMZ['CoreEngine'][_0x17ee57(0x6c5)][_0x17ee57(0x690)](this),this[_0x17ee57(0x49a)](this[_0x17ee57(0x648)]-0x1);},VisuMZ[_0x231f54(0x703)][_0x231f54(0x7f7)]=Window_NumberInput['prototype'][_0x231f54(0x83d)],Window_NumberInput['prototype']['processDigitChange']=function(){const _0x3e7b4c=_0x231f54;if(!this[_0x3e7b4c(0x397)]())return;if(Input[_0x3e7b4c(0x482)]()){if(_0x3e7b4c(0x3ed)!==_0x3e7b4c(0x6fa))this[_0x3e7b4c(0x2df)]();else{function _0x222036(){const _0x1d8ba4=_0x3e7b4c;var _0x3a4035=_0x545910[_0x1d8ba4(0x703)][_0x1d8ba4(0x5a3)][_0x1d8ba4(0x690)](this,_0x518444,_0x59247a,_0x45352f,_0x211b45);if(this[_0x1d8ba4(0x4d3)]())_0x3a4035[_0x1d8ba4(0x6d0)]=_0x11c2ed[_0x1d8ba4(0x4db)](_0x3a4035[_0x1d8ba4(0x6d0)]);return _0x3a4035;}}}else{if(Input[_0x3e7b4c(0x665)](_0x3e7b4c(0x559))){if(_0x3e7b4c(0x610)===_0x3e7b4c(0x610))this[_0x3e7b4c(0x24c)]();else{function _0x4ce8f5(){const _0x27b4be=_0x3e7b4c;_0x32cfab[_0x27b4be(0x703)][_0x27b4be(0x262)]['call'](this),this[_0x27b4be(0x512)](),this[_0x27b4be(0x1b5)](),this[_0x27b4be(0x6dc)](),this['process_VisuMZ_CoreEngine_Functions'](),this[_0x27b4be(0x869)](),_0x1cd2fa[_0x27b4be(0x1df)]();}}}else{if(Input['_inputSpecialKeyCode']===0x2e){if(_0x3e7b4c(0x70b)!==_0x3e7b4c(0x70b)){function _0x4cf2ea(){const _0x5030c7=_0x3e7b4c;this[_0x5030c7(0x653)]={'SideView':_0x426c46[_0x5030c7(0x4b7)],'BattleSystem':this['initialBattleSystem'](),'FontSize':_0x579823['advanced'][_0x5030c7(0x626)],'Padding':0xc};}}else this[_0x3e7b4c(0x7ec)]();}else{if(Input['_inputSpecialKeyCode']===0x24)this['processKeyboardHome']();else{if(Input[_0x3e7b4c(0x7cd)]===0x23)this[_0x3e7b4c(0x4b2)]();else{if(_0x3e7b4c(0x286)===_0x3e7b4c(0x286))VisuMZ['CoreEngine'][_0x3e7b4c(0x7f7)][_0x3e7b4c(0x690)](this),Input[_0x3e7b4c(0x7f6)]();else{function _0x478c12(){const _0xf13a80=_0x3e7b4c;var _0x2a6581=_0x788b75(_0x41b45d['$1']);try{_0x5925a8+=_0x32604d(_0x2a6581);}catch(_0x439771){if(_0x3f6ea5[_0xf13a80(0x841)]())_0x3c5aa9[_0xf13a80(0x734)](_0x439771);}}}}}}}}},Window_NumberInput[_0x231f54(0x3fc)][_0x231f54(0x588)]=function(){const _0x472a64=_0x231f54;if(!this[_0x472a64(0x23d)]())return;Input[_0x472a64(0x482)]()?this['processKeyboardDigitChange']():Window_Selectable[_0x472a64(0x3fc)][_0x472a64(0x588)][_0x472a64(0x690)](this);},Window_NumberInput['prototype']['processCursorHomeEndTrigger']=function(){},Window_NumberInput[_0x231f54(0x3fc)][_0x231f54(0x2df)]=function(){const _0x3fd714=_0x231f54;if(String(this[_0x3fd714(0x302)])['length']>=this[_0x3fd714(0x648)])return;this[_0x3fd714(0x302)]=Number(String(this[_0x3fd714(0x302)])+Input['_inputString']);const _0x30b985='9'[_0x3fd714(0x6e3)](this[_0x3fd714(0x648)]);this[_0x3fd714(0x302)]=this[_0x3fd714(0x302)][_0x3fd714(0x308)](0x0,_0x30b985),Input['clear'](),this[_0x3fd714(0x1c4)](),SoundManager[_0x3fd714(0x503)](),this[_0x3fd714(0x49a)](this[_0x3fd714(0x648)]-0x1);},Window_NumberInput['prototype']['processKeyboardBackspace']=function(){const _0x3602bc=_0x231f54;this[_0x3602bc(0x302)]=Number(String(this[_0x3602bc(0x302)])[_0x3602bc(0x80d)](0x0,-0x1)),this[_0x3602bc(0x302)]=Math[_0x3602bc(0x565)](0x0,this[_0x3602bc(0x302)]),Input[_0x3602bc(0x7f6)](),this[_0x3602bc(0x1c4)](),SoundManager[_0x3602bc(0x503)](),this[_0x3602bc(0x49a)](this[_0x3602bc(0x648)]-0x1);},Window_NumberInput[_0x231f54(0x3fc)]['processKeyboardDelete']=function(){const _0x170600=_0x231f54;this['_number']=Number(String(this[_0x170600(0x302)])[_0x170600(0x2ed)](0x1)),this['_number']=Math[_0x170600(0x565)](0x0,this[_0x170600(0x302)]),Input[_0x170600(0x7f6)](),this[_0x170600(0x1c4)](),SoundManager[_0x170600(0x503)](),this[_0x170600(0x49a)](this['_maxDigits']-0x1);});;Window_TitleCommand[_0x231f54(0x432)]=VisuMZ[_0x231f54(0x703)][_0x231f54(0x200)][_0x231f54(0x3ee)],Window_TitleCommand[_0x231f54(0x3fc)]['makeCommandList']=function(){const _0x32f509=_0x231f54;this[_0x32f509(0x63b)]();},Window_TitleCommand[_0x231f54(0x3fc)]['makeCoreEngineCommandList']=function(){const _0x97db54=_0x231f54;for(const _0x5b5a7e of Window_TitleCommand[_0x97db54(0x432)]){if(_0x5b5a7e[_0x97db54(0x7b6)]['call'](this)){const _0xce8cf2=_0x5b5a7e['Symbol'];let _0x54b876=_0x5b5a7e[_0x97db54(0x283)];if(['',_0x97db54(0x39c)][_0x97db54(0x36f)](_0x54b876))_0x54b876=_0x5b5a7e['TextJS'][_0x97db54(0x690)](this);const _0x36275b=_0x5b5a7e[_0x97db54(0x5e5)][_0x97db54(0x690)](this),_0x366321=_0x5b5a7e['ExtJS'][_0x97db54(0x690)](this);this[_0x97db54(0x7ad)](_0x54b876,_0xce8cf2,_0x36275b,_0x366321),this[_0x97db54(0x3e5)](_0xce8cf2,_0x5b5a7e[_0x97db54(0x45f)]['bind'](this,_0x366321));}}},Window_GameEnd[_0x231f54(0x432)]=VisuMZ[_0x231f54(0x703)][_0x231f54(0x200)][_0x231f54(0x2f9)][_0x231f54(0x3c5)][_0x231f54(0x49b)],Window_GameEnd[_0x231f54(0x3fc)][_0x231f54(0x48b)]=function(){const _0x37a4fb=_0x231f54;this[_0x37a4fb(0x63b)]();},Window_GameEnd[_0x231f54(0x3fc)][_0x231f54(0x63b)]=function(){const _0x470140=_0x231f54;for(const _0x35221e of Window_GameEnd[_0x470140(0x432)]){if(_0x35221e['ShowJS'][_0x470140(0x690)](this)){const _0x4d7009=_0x35221e[_0x470140(0x78d)];let _0x2fa560=_0x35221e[_0x470140(0x283)];if(['',_0x470140(0x39c)][_0x470140(0x36f)](_0x2fa560))_0x2fa560=_0x35221e[_0x470140(0x602)][_0x470140(0x690)](this);const _0x20d677=_0x35221e[_0x470140(0x5e5)]['call'](this),_0xd7ba4a=_0x35221e[_0x470140(0x261)]['call'](this);this['addCommand'](_0x2fa560,_0x4d7009,_0x20d677,_0xd7ba4a),this['setHandler'](_0x4d7009,_0x35221e['CallHandlerJS'][_0x470140(0x64a)](this,_0xd7ba4a));}}};function Window_ButtonAssist(){const _0x28d477=_0x231f54;this[_0x28d477(0x2b6)](...arguments);}Window_ButtonAssist[_0x231f54(0x3fc)]=Object[_0x231f54(0x4e6)](Window_Base[_0x231f54(0x3fc)]),Window_ButtonAssist[_0x231f54(0x3fc)][_0x231f54(0x1a5)]=Window_ButtonAssist,Window_ButtonAssist[_0x231f54(0x3fc)][_0x231f54(0x2b6)]=function(_0x3bc41f){const _0x48f497=_0x231f54;this[_0x48f497(0x4a0)]={},Window_Base['prototype']['initialize'][_0x48f497(0x690)](this,_0x3bc41f),this[_0x48f497(0x669)](VisuMZ['CoreEngine']['Settings']['ButtonAssist'][_0x48f497(0x4c4)]||0x0),this['refresh']();},Window_ButtonAssist[_0x231f54(0x3fc)]['makeFontBigger']=function(){const _0x402585=_0x231f54;this[_0x402585(0x3e6)]['fontSize']<=0x60&&(this[_0x402585(0x3e6)][_0x402585(0x626)]+=0x6);},Window_ButtonAssist['prototype'][_0x231f54(0x1d8)]=function(){const _0x29ea42=_0x231f54;this[_0x29ea42(0x3e6)][_0x29ea42(0x626)]>=0x18&&(this[_0x29ea42(0x3e6)]['fontSize']-=0x6);},Window_ButtonAssist[_0x231f54(0x3fc)][_0x231f54(0x425)]=function(){const _0x2ca831=_0x231f54;Window_Base[_0x2ca831(0x3fc)][_0x2ca831(0x425)][_0x2ca831(0x690)](this),this['updateKeyText']();},Window_ButtonAssist[_0x231f54(0x3fc)][_0x231f54(0x7c1)]=function(){const _0x12fc6a=_0x231f54;this[_0x12fc6a(0x4b8)]=SceneManager[_0x12fc6a(0x80a)][_0x12fc6a(0x6c0)]()!==_0x12fc6a(0x5be)?0x0:0x8;},Window_ButtonAssist[_0x231f54(0x3fc)][_0x231f54(0x288)]=function(){const _0x1ca1d2=_0x231f54,_0x2cdf58=SceneManager['_scene'];for(let _0x42e089=0x1;_0x42e089<=0x5;_0x42e089++){if(_0x1ca1d2(0x382)===_0x1ca1d2(0x382)){if(this[_0x1ca1d2(0x4a0)]['key%1'['format'](_0x42e089)]!==_0x2cdf58['buttonAssistKey%1'['format'](_0x42e089)]())return this[_0x1ca1d2(0x1c4)]();if(this[_0x1ca1d2(0x4a0)]['text%1'['format'](_0x42e089)]!==_0x2cdf58[_0x1ca1d2(0x60c)[_0x1ca1d2(0x333)](_0x42e089)]())return this['refresh']();}else{function _0x5e3811(){const _0x192920=_0x1ca1d2;return _0x5036fa(_0x4db2dd)[_0x192920(0x673)](_0x3b8430,_0x39507c);}}}},Window_ButtonAssist['prototype'][_0x231f54(0x1c4)]=function(){const _0x3485ce=_0x231f54;this[_0x3485ce(0x3e6)][_0x3485ce(0x7f6)]();for(let _0x3728c5=0x1;_0x3728c5<=0x5;_0x3728c5++){this[_0x3485ce(0x368)](_0x3728c5);}},Window_ButtonAssist[_0x231f54(0x3fc)][_0x231f54(0x368)]=function(_0x4b3376){const _0x53d91a=_0x231f54,_0x90faf9=this[_0x53d91a(0x1da)]/0x5,_0x3ea48c=SceneManager[_0x53d91a(0x80a)],_0x542087=_0x3ea48c[_0x53d91a(0x413)['format'](_0x4b3376)](),_0xdaf9c3=_0x3ea48c['buttonAssistText%1'[_0x53d91a(0x333)](_0x4b3376)]();this[_0x53d91a(0x4a0)][_0x53d91a(0x876)[_0x53d91a(0x333)](_0x4b3376)]=_0x542087,this[_0x53d91a(0x4a0)][_0x53d91a(0x4ac)[_0x53d91a(0x333)](_0x4b3376)]=_0xdaf9c3;if(_0x542087==='')return;if(_0xdaf9c3==='')return;const _0x43d367=_0x3ea48c[_0x53d91a(0x771)[_0x53d91a(0x333)](_0x4b3376)](),_0x18d2a0=this[_0x53d91a(0x325)](),_0x17fa0c=_0x90faf9*(_0x4b3376-0x1)+_0x18d2a0+_0x43d367,_0x543c40=VisuMZ['CoreEngine'][_0x53d91a(0x200)]['ButtonAssist'][_0x53d91a(0x7bc)];this[_0x53d91a(0x3af)](_0x543c40['format'](_0x542087,_0xdaf9c3),_0x17fa0c,0x0,_0x90faf9-_0x18d2a0*0x2);},VisuMZ['ShowDevTools']=function(_0x2865bb){const _0x4ead3b=_0x231f54;if(Utils[_0x4ead3b(0x3c8)](_0x4ead3b(0x42c))){var _0x103ba5=require(_0x4ead3b(0x366))[_0x4ead3b(0x860)]['get']();SceneManager[_0x4ead3b(0x234)]();if(_0x2865bb)setTimeout(_0x103ba5[_0x4ead3b(0x19a)][_0x4ead3b(0x64a)](_0x103ba5),0x190);}},VisuMZ[_0x231f54(0x36d)]=function(_0x4bcb3c,_0x5eabac){const _0x133b26=_0x231f54;_0x5eabac=_0x5eabac['toUpperCase']();var _0x5c755e=1.70158,_0xd27847=0.7;switch(_0x5eabac){case'LINEAR':return _0x4bcb3c;case _0x133b26(0x3a1):return-0x1*Math[_0x133b26(0x1f2)](_0x4bcb3c*(Math['PI']/0x2))+0x1;case _0x133b26(0x267):return Math[_0x133b26(0x4c8)](_0x4bcb3c*(Math['PI']/0x2));case _0x133b26(0x3a8):return-0.5*(Math[_0x133b26(0x1f2)](Math['PI']*_0x4bcb3c)-0x1);case _0x133b26(0x833):return _0x4bcb3c*_0x4bcb3c;case'OUTQUAD':return _0x4bcb3c*(0x2-_0x4bcb3c);case _0x133b26(0x1d3):return _0x4bcb3c<0.5?0x2*_0x4bcb3c*_0x4bcb3c:-0x1+(0x4-0x2*_0x4bcb3c)*_0x4bcb3c;case _0x133b26(0x7b3):return _0x4bcb3c*_0x4bcb3c*_0x4bcb3c;case _0x133b26(0x5ce):var _0x3ba06c=_0x4bcb3c-0x1;return _0x3ba06c*_0x3ba06c*_0x3ba06c+0x1;case _0x133b26(0x459):return _0x4bcb3c<0.5?0x4*_0x4bcb3c*_0x4bcb3c*_0x4bcb3c:(_0x4bcb3c-0x1)*(0x2*_0x4bcb3c-0x2)*(0x2*_0x4bcb3c-0x2)+0x1;case _0x133b26(0x1a9):return _0x4bcb3c*_0x4bcb3c*_0x4bcb3c*_0x4bcb3c;case _0x133b26(0x777):var _0x3ba06c=_0x4bcb3c-0x1;return 0x1-_0x3ba06c*_0x3ba06c*_0x3ba06c*_0x3ba06c;case'INOUTQUART':var _0x3ba06c=_0x4bcb3c-0x1;return _0x4bcb3c<0.5?0x8*_0x4bcb3c*_0x4bcb3c*_0x4bcb3c*_0x4bcb3c:0x1-0x8*_0x3ba06c*_0x3ba06c*_0x3ba06c*_0x3ba06c;case _0x133b26(0x7e5):return _0x4bcb3c*_0x4bcb3c*_0x4bcb3c*_0x4bcb3c*_0x4bcb3c;case'OUTQUINT':var _0x3ba06c=_0x4bcb3c-0x1;return 0x1+_0x3ba06c*_0x3ba06c*_0x3ba06c*_0x3ba06c*_0x3ba06c;case _0x133b26(0x343):var _0x3ba06c=_0x4bcb3c-0x1;return _0x4bcb3c<0.5?0x10*_0x4bcb3c*_0x4bcb3c*_0x4bcb3c*_0x4bcb3c*_0x4bcb3c:0x1+0x10*_0x3ba06c*_0x3ba06c*_0x3ba06c*_0x3ba06c*_0x3ba06c;case _0x133b26(0x780):if(_0x4bcb3c===0x0){if('dDYzd'!=='WUMzN')return 0x0;else{function _0xa64df7(){const _0x33dbab=_0x133b26;return _0x71c48c[_0x33dbab(0x703)][_0x33dbab(0x200)]['QoL'][_0x33dbab(0x373)]?0x0:_0x5f01dc[_0x33dbab(0x703)]['Game_Action_itemEva']['call'](this,_0x3ee075);}}}return Math[_0x133b26(0x339)](0x2,0xa*(_0x4bcb3c-0x1));case _0x133b26(0x79c):if(_0x4bcb3c===0x1){if(_0x133b26(0x394)===_0x133b26(0x394))return 0x1;else{function _0x45a48b(){const _0x15dd6d=_0x133b26;_0x56bec4[_0x15dd6d(0x841)]()&&(_0x2d2b0b[_0x15dd6d(0x734)](_0x15dd6d(0x21f)),_0x42c4ae[_0x15dd6d(0x734)](_0x3e4be6)),this['skipBranch']();}}}return-Math['pow'](0x2,-0xa*_0x4bcb3c)+0x1;case'INOUTEXPO':if(_0x4bcb3c===0x0||_0x4bcb3c===0x1)return _0x4bcb3c;var _0x574a51=_0x4bcb3c*0x2,_0x2c462b=_0x574a51-0x1;if(_0x574a51<0x1)return 0.5*Math[_0x133b26(0x339)](0x2,0xa*_0x2c462b);return 0.5*(-Math[_0x133b26(0x339)](0x2,-0xa*_0x2c462b)+0x2);case _0x133b26(0x4dd):var _0x574a51=_0x4bcb3c/0x1;return-0x1*(Math[_0x133b26(0x441)](0x1-_0x574a51*_0x4bcb3c)-0x1);case _0x133b26(0x663):var _0x3ba06c=_0x4bcb3c-0x1;return Math['sqrt'](0x1-_0x3ba06c*_0x3ba06c);case _0x133b26(0x842):var _0x574a51=_0x4bcb3c*0x2,_0x2c462b=_0x574a51-0x2;if(_0x574a51<0x1){if(_0x133b26(0x3b7)===_0x133b26(0x3b7))return-0.5*(Math[_0x133b26(0x441)](0x1-_0x574a51*_0x574a51)-0x1);else{function _0x114600(){const _0x4fc00f=_0x133b26;_0x15017c[_0x4fc00f(0x703)][_0x4fc00f(0x60d)][_0x4fc00f(0x690)](this),this[_0x4fc00f(0x5e6)]();}}}return 0.5*(Math['sqrt'](0x1-_0x2c462b*_0x2c462b)+0x1);case _0x133b26(0x7a5):return _0x4bcb3c*_0x4bcb3c*((_0x5c755e+0x1)*_0x4bcb3c-_0x5c755e);case _0x133b26(0x679):var _0x574a51=_0x4bcb3c/0x1-0x1;return _0x574a51*_0x574a51*((_0x5c755e+0x1)*_0x574a51+_0x5c755e)+0x1;break;case _0x133b26(0x6da):var _0x574a51=_0x4bcb3c*0x2,_0x16124c=_0x574a51-0x2,_0x37d6be=_0x5c755e*1.525;if(_0x574a51<0x1)return 0.5*_0x574a51*_0x574a51*((_0x37d6be+0x1)*_0x574a51-_0x37d6be);return 0.5*(_0x16124c*_0x16124c*((_0x37d6be+0x1)*_0x16124c+_0x37d6be)+0x2);case _0x133b26(0x548):if(_0x4bcb3c===0x0||_0x4bcb3c===0x1)return _0x4bcb3c;var _0x574a51=_0x4bcb3c/0x1,_0x2c462b=_0x574a51-0x1,_0x770a4c=0x1-_0xd27847,_0x37d6be=_0x770a4c/(0x2*Math['PI'])*Math[_0x133b26(0x525)](0x1);return-(Math[_0x133b26(0x339)](0x2,0xa*_0x2c462b)*Math[_0x133b26(0x4c8)]((_0x2c462b-_0x37d6be)*(0x2*Math['PI'])/_0x770a4c));case _0x133b26(0x230):var _0x770a4c=0x1-_0xd27847,_0x574a51=_0x4bcb3c*0x2;if(_0x4bcb3c===0x0||_0x4bcb3c===0x1)return _0x4bcb3c;var _0x37d6be=_0x770a4c/(0x2*Math['PI'])*Math['asin'](0x1);return Math[_0x133b26(0x339)](0x2,-0xa*_0x574a51)*Math[_0x133b26(0x4c8)]((_0x574a51-_0x37d6be)*(0x2*Math['PI'])/_0x770a4c)+0x1;case _0x133b26(0x7ae):var _0x770a4c=0x1-_0xd27847;if(_0x4bcb3c===0x0||_0x4bcb3c===0x1)return _0x4bcb3c;var _0x574a51=_0x4bcb3c*0x2,_0x2c462b=_0x574a51-0x1,_0x37d6be=_0x770a4c/(0x2*Math['PI'])*Math[_0x133b26(0x525)](0x1);if(_0x574a51<0x1){if(_0x133b26(0x254)==='uPtXw')return-0.5*(Math['pow'](0x2,0xa*_0x2c462b)*Math[_0x133b26(0x4c8)]((_0x2c462b-_0x37d6be)*(0x2*Math['PI'])/_0x770a4c));else{function _0x50e2fa(){const _0xabc8eb=_0x133b26;this['_clickHandler']&&this[_0xabc8eb(0x889)]();}}}return Math[_0x133b26(0x339)](0x2,-0xa*_0x2c462b)*Math[_0x133b26(0x4c8)]((_0x2c462b-_0x37d6be)*(0x2*Math['PI'])/_0x770a4c)*0.5+0x1;case _0x133b26(0x4b9):var _0x574a51=_0x4bcb3c/0x1;if(_0x574a51<0x1/2.75)return 7.5625*_0x574a51*_0x574a51;else{if(_0x574a51<0x2/2.75){if(_0x133b26(0x847)===_0x133b26(0x408)){function _0x8a2ee8(){this['makeDocumentTitle']();}}else{var _0x16124c=_0x574a51-1.5/2.75;return 7.5625*_0x16124c*_0x16124c+0.75;}}else{if(_0x574a51<2.5/2.75){var _0x16124c=_0x574a51-2.25/2.75;return 7.5625*_0x16124c*_0x16124c+0.9375;}else{var _0x16124c=_0x574a51-2.625/2.75;return 7.5625*_0x16124c*_0x16124c+0.984375;}}}case'INBOUNCE':var _0x1bada0=0x1-VisuMZ[_0x133b26(0x36d)](0x1-_0x4bcb3c,_0x133b26(0x35e));return _0x1bada0;case'INOUTBOUNCE':if(_0x4bcb3c<0.5){if('SLCkh'==='SLCkh')var _0x1bada0=VisuMZ[_0x133b26(0x36d)](_0x4bcb3c*0x2,_0x133b26(0x461))*0.5;else{function _0x144820(){const _0x433368=_0x133b26,_0x300577=_0x16e671[_0x433368(0x703)][_0x433368(0x200)]['ButtonAssist'],_0x17d990=_0x300577[_0x433368(0x1cf)],_0x25ad56=this['getInputButtonString'](_0x463749),_0x1d8d73=this[_0x433368(0x6a8)](_0x4fc44f);return _0x17d990['format'](_0x25ad56,_0x1d8d73);}}}else{if(_0x133b26(0x668)===_0x133b26(0x7f2)){function _0x49a298(){const _0x58ab0d=_0x133b26;var _0x24dd54=_0x69582f(_0x58ab0d(0x366))[_0x58ab0d(0x860)][_0x58ab0d(0x7c7)]();_0x1427c4['showDevTools']();if(_0x3c91b0)_0x2c2bee(_0x24dd54[_0x58ab0d(0x19a)][_0x58ab0d(0x64a)](_0x24dd54),0x190);}}else var _0x1bada0=VisuMZ[_0x133b26(0x36d)](_0x4bcb3c*0x2-0x1,_0x133b26(0x35e))*0.5+0.5;}return _0x1bada0;default:return _0x4bcb3c;}},VisuMZ[_0x231f54(0x75c)]=function(_0xba0e77){const _0x34f3e6=_0x231f54;_0xba0e77=String(_0xba0e77)[_0x34f3e6(0x4ea)]();const _0x2b2fe2=VisuMZ[_0x34f3e6(0x703)][_0x34f3e6(0x200)][_0x34f3e6(0x502)];if(_0xba0e77===_0x34f3e6(0x1bd))return _0x2b2fe2[_0x34f3e6(0x371)];if(_0xba0e77===_0x34f3e6(0x702))return _0x2b2fe2[_0x34f3e6(0x3ff)];if(_0xba0e77==='ATK')return _0x2b2fe2[_0x34f3e6(0x1bf)];if(_0xba0e77===_0x34f3e6(0x5bb))return _0x2b2fe2['IconParam3'];if(_0xba0e77===_0x34f3e6(0x7be))return _0x2b2fe2['IconParam4'];if(_0xba0e77===_0x34f3e6(0x4b1))return _0x2b2fe2[_0x34f3e6(0x2e4)];if(_0xba0e77===_0x34f3e6(0x778))return _0x2b2fe2['IconParam6'];if(_0xba0e77===_0x34f3e6(0x867))return _0x2b2fe2['IconParam7'];if(_0xba0e77===_0x34f3e6(0x67a))return _0x2b2fe2[_0x34f3e6(0x203)];if(_0xba0e77===_0x34f3e6(0x3eb))return _0x2b2fe2[_0x34f3e6(0x335)];if(_0xba0e77==='CRI')return _0x2b2fe2['IconXParam2'];if(_0xba0e77===_0x34f3e6(0x620))return _0x2b2fe2[_0x34f3e6(0x2bd)];if(_0xba0e77===_0x34f3e6(0x44e))return _0x2b2fe2[_0x34f3e6(0x67c)];if(_0xba0e77==='MRF')return _0x2b2fe2[_0x34f3e6(0x78b)];if(_0xba0e77===_0x34f3e6(0x5f4))return _0x2b2fe2[_0x34f3e6(0x738)];if(_0xba0e77===_0x34f3e6(0x295))return _0x2b2fe2[_0x34f3e6(0x61a)];if(_0xba0e77===_0x34f3e6(0x716))return _0x2b2fe2['IconXParam8'];if(_0xba0e77===_0x34f3e6(0x6b2))return _0x2b2fe2[_0x34f3e6(0x538)];if(_0xba0e77===_0x34f3e6(0x3c1))return _0x2b2fe2['IconSParam0'];if(_0xba0e77===_0x34f3e6(0x3bc))return _0x2b2fe2['IconSParam1'];if(_0xba0e77===_0x34f3e6(0x50e))return _0x2b2fe2[_0x34f3e6(0x6f3)];if(_0xba0e77===_0x34f3e6(0x543))return _0x2b2fe2[_0x34f3e6(0x6e1)];if(_0xba0e77===_0x34f3e6(0x202))return _0x2b2fe2['IconSParam4'];if(_0xba0e77===_0x34f3e6(0x1de))return _0x2b2fe2[_0x34f3e6(0x257)];if(_0xba0e77===_0x34f3e6(0x18f))return _0x2b2fe2['IconSParam6'];if(_0xba0e77==='MDR')return _0x2b2fe2[_0x34f3e6(0x1d4)];if(_0xba0e77===_0x34f3e6(0x7ca))return _0x2b2fe2['IconSParam8'];if(_0xba0e77==='EXR')return _0x2b2fe2[_0x34f3e6(0x666)];if(VisuMZ['CoreEngine'][_0x34f3e6(0x7ac)][_0xba0e77])return VisuMZ[_0x34f3e6(0x703)][_0x34f3e6(0x7ac)][_0xba0e77]||0x0;return 0x0;},VisuMZ[_0x231f54(0x297)]=function(_0x19fa1c,_0x2a1dfa,_0x4eb378){const _0x3e2a33=_0x231f54;if(_0x4eb378===undefined&&_0x19fa1c%0x1===0x0)return _0x19fa1c;if(_0x4eb378!==undefined&&[_0x3e2a33(0x1bd),_0x3e2a33(0x702),_0x3e2a33(0x590),_0x3e2a33(0x5bb),'MAT',_0x3e2a33(0x4b1),'AGI',_0x3e2a33(0x867)][_0x3e2a33(0x36f)](String(_0x4eb378)[_0x3e2a33(0x4ea)]()[_0x3e2a33(0x452)]()))return _0x19fa1c;_0x2a1dfa=_0x2a1dfa||0x0;if(VisuMZ['CoreEngine'][_0x3e2a33(0x804)][_0x4eb378]){if(VisuMZ['CoreEngine'][_0x3e2a33(0x3ce)][_0x4eb378]==='integer')return _0x19fa1c;else{if(_0x3e2a33(0x6cb)!==_0x3e2a33(0x664))return String((_0x19fa1c*0x64)[_0x3e2a33(0x545)](_0x2a1dfa))+'%';else{function _0x4a0dab(){const _0x2ab11a=_0x3e2a33;this[_0x2ab11a(0x210)]()?this[_0x2ab11a(0x3ec)]():_0x588343[_0x2ab11a(0x703)][_0x2ab11a(0x55c)][_0x2ab11a(0x690)](this);}}}}return String((_0x19fa1c*0x64)[_0x3e2a33(0x545)](_0x2a1dfa))+'%';},VisuMZ[_0x231f54(0x4db)]=function(_0x55b5fb){const _0x56c239=_0x231f54;_0x55b5fb=String(_0x55b5fb);if(!_0x55b5fb)return _0x55b5fb;if(typeof _0x55b5fb!=='string')return _0x55b5fb;const _0x30cc50=VisuMZ[_0x56c239(0x703)][_0x56c239(0x200)][_0x56c239(0x4ec)][_0x56c239(0x362)]||_0x56c239(0x38c),_0x222363={'maximumFractionDigits':0x6};_0x55b5fb=_0x55b5fb[_0x56c239(0x4da)](/\[(.*?)\]/g,(_0x455d34,_0x561a35)=>{if('GyVge'!=='jMbgO')return VisuMZ['PreserveNumbers'](_0x561a35,'[',']');else{function _0x1fd3d1(){const _0x19f7af=_0x5618;return _0x15745c[_0x19f7af(0x703)]['Settings']['MenuLayout'][_0x19f7af(0x45a)][_0x19f7af(0x809)];}}}),_0x55b5fb=_0x55b5fb[_0x56c239(0x4da)](/<(.*?)>/g,(_0x3c7b1a,_0x15686e)=>{return VisuMZ['PreserveNumbers'](_0x15686e,'<','>');}),_0x55b5fb=_0x55b5fb[_0x56c239(0x4da)](/\{\{(.*?)\}\}/g,(_0x159e52,_0xe57fcd)=>{const _0xcfd110=_0x56c239;if(_0xcfd110(0x2a8)!=='dTnky')return VisuMZ['PreserveNumbers'](_0xe57fcd,'','');else{function _0x1f868b(){const _0x36534f=_0xcfd110;!_0x3823f3[_0x36534f(0x29a)]&&_0x1f85d5[_0x36534f(0x3c7)]&&_0x480422['render'](_0x229dd4);}}}),_0x55b5fb=_0x55b5fb[_0x56c239(0x4da)](/(\d+\.?\d*)/g,(_0x1ff8b9,_0x4da640)=>{const _0x1789d8=_0x56c239;let _0x2ad0b6=_0x4da640;if(_0x2ad0b6[0x0]==='0')return _0x2ad0b6;if(_0x2ad0b6[_0x2ad0b6['length']-0x1]==='.'){if(_0x1789d8(0x2ec)===_0x1789d8(0x750)){function _0x4c5beb(){const _0xa9315=_0x1789d8;this[_0xa9315(0x7e1)][_0xa9315(0x669)](_0x272841[_0xa9315(0x807)][_0xa9315(0x392)]);}}else return Number(_0x2ad0b6)[_0x1789d8(0x673)](_0x30cc50,_0x222363)+'.';}else{if(_0x2ad0b6[_0x2ad0b6['length']-0x1]===','){if('yjLod'===_0x1789d8(0x5f1))return Number(_0x2ad0b6)[_0x1789d8(0x673)](_0x30cc50,_0x222363)+',';else{function _0x28761c(){const _0x5e9900=_0x1789d8;return this[_0x5e9900(0x265)]();}}}else return Number(_0x2ad0b6)[_0x1789d8(0x673)](_0x30cc50,_0x222363);}});let _0x1235f7=0x3;while(_0x1235f7--){if(_0x56c239(0x1ef)===_0x56c239(0x358)){function _0x1c28ae(){const _0x37e5a4=_0x56c239;this[_0x37e5a4(0x70a)][_0x37e5a4(0x669)](_0x4144de[_0x37e5a4(0x807)]['ItemBgType']);}}else _0x55b5fb=VisuMZ[_0x56c239(0x506)](_0x55b5fb);}return _0x55b5fb;},VisuMZ[_0x231f54(0x5fa)]=function(_0x564036,_0x277c94,_0x368666){const _0x336459=_0x231f54;return _0x564036=_0x564036[_0x336459(0x4da)](/(\d)/gi,(_0xf996b9,_0x201782)=>'PRESERVCONVERSION(%1)'[_0x336459(0x333)](Number(_0x201782))),_0x336459(0x81f)['format'](_0x564036,_0x277c94,_0x368666);},VisuMZ[_0x231f54(0x506)]=function(_0x334d8f){const _0x5f419e=_0x231f54;return _0x334d8f=_0x334d8f[_0x5f419e(0x4da)](/PRESERVCONVERSION\((\d+)\)/gi,(_0xf69888,_0x4cdd2d)=>Number(parseInt(_0x4cdd2d))),_0x334d8f;},VisuMZ[_0x231f54(0x84e)]=function(_0x4ff75a){const _0x4d0899=_0x231f54;SoundManager['playOk']();if(!Utils[_0x4d0899(0x48c)]()){const _0x17ded5=window[_0x4d0899(0x236)](_0x4ff75a,_0x4d0899(0x331));}else{const _0x2f69e8=process['platform']==_0x4d0899(0x546)?_0x4d0899(0x236):process[_0x4d0899(0x600)]==_0x4d0899(0x1ca)?'start':_0x4d0899(0x32d);require(_0x4d0899(0x562))['exec'](_0x2f69e8+'\x20'+_0x4ff75a);}},Game_Picture[_0x231f54(0x3fc)][_0x231f54(0x1fd)]=function(){return this['_anchor'];},VisuMZ[_0x231f54(0x703)][_0x231f54(0x627)]=Game_Picture[_0x231f54(0x3fc)][_0x231f54(0x20d)],Game_Picture[_0x231f54(0x3fc)][_0x231f54(0x20d)]=function(){const _0x44015f=_0x231f54;VisuMZ['CoreEngine'][_0x44015f(0x627)][_0x44015f(0x690)](this),this[_0x44015f(0x372)]={'x':0x0,'y':0x0},this[_0x44015f(0x398)]={'x':0x0,'y':0x0};},VisuMZ[_0x231f54(0x703)][_0x231f54(0x7fd)]=Game_Picture[_0x231f54(0x3fc)][_0x231f54(0x719)],Game_Picture['prototype'][_0x231f54(0x719)]=function(){const _0x3bfd61=_0x231f54;this[_0x3bfd61(0x39a)](),VisuMZ[_0x3bfd61(0x703)][_0x3bfd61(0x7fd)][_0x3bfd61(0x690)](this);},VisuMZ[_0x231f54(0x703)]['Game_Picture_show']=Game_Picture['prototype']['show'],Game_Picture['prototype']['show']=function(_0x163c1e,_0xada48c,_0x2839e,_0x5d6b3e,_0xc27da0,_0x201085,_0x5a95be,_0x4cc357){const _0x58f144=_0x231f54;VisuMZ[_0x58f144(0x703)][_0x58f144(0x72d)][_0x58f144(0x690)](this,_0x163c1e,_0xada48c,_0x2839e,_0x5d6b3e,_0xc27da0,_0x201085,_0x5a95be,_0x4cc357),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0xada48c]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0x231f54(0x7bb)]=Game_Picture['prototype'][_0x231f54(0x6a6)],Game_Picture[_0x231f54(0x3fc)]['move']=function(_0x25351a,_0x27fa72,_0x50f123,_0x181f08,_0x50db1f,_0x5434a2,_0x2d7559,_0x1d632c,_0x1e45cd){const _0x24fcce=_0x231f54;VisuMZ[_0x24fcce(0x703)][_0x24fcce(0x7bb)][_0x24fcce(0x690)](this,_0x25351a,_0x27fa72,_0x50f123,_0x181f08,_0x50db1f,_0x5434a2,_0x2d7559,_0x1d632c,_0x1e45cd),this[_0x24fcce(0x56c)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x25351a]||{'x':0x0,'y':0x0});},Game_Picture[_0x231f54(0x3fc)]['updateAnchor']=function(){const _0x1adf3f=_0x231f54;this[_0x1adf3f(0x3b0)]>0x0&&(this['_anchor']['x']=this['applyEasing'](this[_0x1adf3f(0x372)]['x'],this[_0x1adf3f(0x398)]['x']),this[_0x1adf3f(0x372)]['y']=this[_0x1adf3f(0x5a6)](this[_0x1adf3f(0x372)]['y'],this[_0x1adf3f(0x398)]['y']));},Game_Picture[_0x231f54(0x3fc)][_0x231f54(0x797)]=function(_0x3cba07){const _0x1606d9=_0x231f54;this[_0x1606d9(0x372)]=_0x3cba07,this[_0x1606d9(0x398)]=JsonEx[_0x1606d9(0x2e2)](this[_0x1606d9(0x372)]);},Game_Picture['prototype'][_0x231f54(0x56c)]=function(_0x5dbcc1){const _0x51f5af=_0x231f54;this[_0x51f5af(0x398)]=_0x5dbcc1;},VisuMZ['CoreEngine'][_0x231f54(0x5a0)]=Sprite_Picture['prototype'][_0x231f54(0x239)],Sprite_Picture[_0x231f54(0x3fc)][_0x231f54(0x239)]=function(){const _0x4bb95f=_0x231f54,_0x45a1c6=this[_0x4bb95f(0x1dc)]();if(!_0x45a1c6[_0x4bb95f(0x1fd)]())VisuMZ[_0x4bb95f(0x703)][_0x4bb95f(0x5a0)]['call'](this);else{if(_0x4bb95f(0x787)!=='dUHBG')this[_0x4bb95f(0x1fd)]['x']=_0x45a1c6[_0x4bb95f(0x1fd)]()['x'],this[_0x4bb95f(0x1fd)]['y']=_0x45a1c6['anchor']()['y'];else{function _0x41e6ad(){const _0x35c48f=_0x4bb95f;_0x11305c&&_0x46350a&&_0x511959[_0x35c48f(0x23f)]&&this[_0x35c48f(0x4ab)](_0x2126e7[_0x35c48f(0x23f)]);const _0x5ee119=_0x3522e0[_0x3fbf1f];_0x5ee119&&this[_0x35c48f(0x4ab)](_0x5ee119[_0x35c48f(0x271)]);}}}},Game_Action[_0x231f54(0x3fc)][_0x231f54(0x4e8)]=function(_0x344cdd){const _0x35a8e1=_0x231f54;if(_0x344cdd){if('kcbVa'!=='kenqq'){const _0x4f6305=_0x344cdd[_0x35a8e1(0x713)];if(_0x4f6305===0x1&&this[_0x35a8e1(0x6c8)]()[_0x35a8e1(0x589)]()!==0x1)this[_0x35a8e1(0x84b)]();else _0x4f6305===0x2&&this[_0x35a8e1(0x6c8)]()[_0x35a8e1(0x259)]()!==0x2?this[_0x35a8e1(0x2ba)]():this['setSkill'](_0x4f6305);}else{function _0x8d6bfd(){const _0x5f023d=_0x35a8e1,_0x3d633c=_0x5f023d(0x3f6);this['_colorCache']=this[_0x5f023d(0x4d5)]||{};if(this[_0x5f023d(0x4d5)][_0x3d633c])return this[_0x5f023d(0x4d5)][_0x3d633c];const _0x498919=_0x4b53a3[_0x5f023d(0x703)][_0x5f023d(0x200)][_0x5f023d(0x2f5)][_0x5f023d(0x528)];return this[_0x5f023d(0x890)](_0x3d633c,_0x498919);}}}else this['clear']();},Game_Actor[_0x231f54(0x3fc)][_0x231f54(0x6ea)]=function(){const _0x8900d2=_0x231f54;return this['skills']()[_0x8900d2(0x717)](_0x4d512f=>this[_0x8900d2(0x270)](_0x4d512f)&&this[_0x8900d2(0x376)]()[_0x8900d2(0x36f)](_0x4d512f[_0x8900d2(0x7b1)]));},Window_Base['prototype']['createDimmerSprite']=function(){const _0x34e073=_0x231f54;this[_0x34e073(0x7e4)]=new Sprite(),this[_0x34e073(0x7e4)][_0x34e073(0x5af)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x34e073(0x23c)](this[_0x34e073(0x7e4)]);},Window_Base['prototype'][_0x231f54(0x854)]=function(){const _0x3012b7=_0x231f54;if(this[_0x3012b7(0x7e4)]){if(_0x3012b7(0x3db)===_0x3012b7(0x3db)){const _0x30e2a8=this[_0x3012b7(0x7e4)][_0x3012b7(0x5af)],_0x543a8d=this[_0x3012b7(0x346)],_0x3bed0d=this[_0x3012b7(0x31f)],_0x4e11ad=this[_0x3012b7(0x4b8)],_0x557eea=ColorManager[_0x3012b7(0x6bf)](),_0x265491=ColorManager[_0x3012b7(0x30c)]();_0x30e2a8[_0x3012b7(0x6ac)](_0x543a8d,_0x3bed0d),_0x30e2a8[_0x3012b7(0x614)](0x0,0x0,_0x543a8d,_0x4e11ad,_0x265491,_0x557eea,!![]),_0x30e2a8[_0x3012b7(0x6fb)](0x0,_0x4e11ad,_0x543a8d,_0x3bed0d-_0x4e11ad*0x2,_0x557eea),_0x30e2a8[_0x3012b7(0x614)](0x0,_0x3bed0d-_0x4e11ad,_0x543a8d,_0x4e11ad,_0x557eea,_0x265491,!![]),this[_0x3012b7(0x7e4)][_0x3012b7(0x22c)](0x0,0x0,_0x543a8d,_0x3bed0d);}else{function _0x3f8922(){const _0x523e78=_0x3012b7;let _0x1ba4f2=this[_0x523e78(0x6bd)];this['_mode']=_0x727c0a,_0x1ba4f2!==this['_mode']&&(this['refresh'](),_0x5a0b2b[_0x523e78(0x5e9)](),this[_0x523e78(0x6bd)]==='default'?this[_0x523e78(0x49a)](0x0):this[_0x523e78(0x49a)](-0x1));}}}},Game_Actor[_0x231f54(0x3fc)][_0x231f54(0x514)]=function(){const _0x574ee7=_0x231f54;for(let _0x134053=0x0;_0x134053<this[_0x574ee7(0x246)]();_0x134053++){const _0x6a6d4a=this['makeActionList']();let _0x534cfb=Number[_0x574ee7(0x638)];this['setAction'](_0x134053,_0x6a6d4a[0x0]);for(const _0x42e589 of _0x6a6d4a){const _0x4451de=_0x42e589[_0x574ee7(0x577)]();if(_0x4451de>_0x534cfb){if('EwqXw'!==_0x574ee7(0x80b))_0x534cfb=_0x4451de,this[_0x574ee7(0x456)](_0x134053,_0x42e589);else{function _0x202825(){const _0x3b4b18=_0x574ee7,_0x3b8243=_0x4833a9[_0x3b4b18(0x74f)],_0x25fddc=_0x2797e3[_0x3b4b18(0x40f)],_0x420d13=_0x2a4b0b[_0x3b4b18(0x276)],_0xca745f=_0x35a8b0['Type'],_0x5205c1=new _0x3e7398(_0x2f6b50[_0x3b4b18(0x26c)]);_0x2dc81c[_0x3b4b18(0x703)][_0x3b4b18(0x881)][_0x3b8243[_0x3b4b18(0x4ea)]()[_0x3b4b18(0x452)]()]=_0x25fddc,_0x40cc1d[_0x3b4b18(0x703)][_0x3b4b18(0x7ac)][_0x3b8243[_0x3b4b18(0x4ea)]()[_0x3b4b18(0x452)]()]=_0x420d13,_0x393545[_0x3b4b18(0x703)]['CustomParamType'][_0x3b8243[_0x3b4b18(0x4ea)]()[_0x3b4b18(0x452)]()]=_0xca745f,_0x455fef['CoreEngine'][_0x3b4b18(0x804)][_0x3b8243['toUpperCase']()['trim']()]=_0x3b8243,_0x270606[_0x3b4b18(0x3dc)](_0x3d02ce[_0x3b4b18(0x3fc)],_0x3b8243,{'get'(){const _0x1fdfb5=_0x3b4b18,_0x331c1e=_0x5205c1[_0x1fdfb5(0x690)](this);return _0xca745f==='integer'?_0x22ee66['round'](_0x331c1e):_0x331c1e;}});}}}}}this['setActionState']('waiting');},Window_BattleItem['prototype']['isEnabled']=function(_0x31efed){const _0x17509a=_0x231f54;if(BattleManager[_0x17509a(0x36e)]())return BattleManager['actor']()[_0x17509a(0x270)](_0x31efed);else{if(_0x17509a(0x839)!==_0x17509a(0x839)){function _0xc7cd6d(){const _0x6d16d6=_0x17509a;_0x2531e1[_0x6d16d6(0x703)][_0x6d16d6(0x405)]['call'](this),this[_0x6d16d6(0x7f5)]();}}else return Window_ItemList[_0x17509a(0x3fc)]['isEnabled']['call'](this,_0x31efed);}},VisuMZ[_0x231f54(0x703)][_0x231f54(0x640)]=Scene_Map[_0x231f54(0x3fc)][_0x231f54(0x46b)],Scene_Map['prototype']['createSpriteset']=function(){const _0x215ce1=_0x231f54;VisuMZ[_0x215ce1(0x703)][_0x215ce1(0x640)]['call'](this);const _0x4b7881=this[_0x215ce1(0x508)]['_timerSprite'];if(_0x4b7881)this[_0x215ce1(0x6ad)](_0x4b7881);},VisuMZ[_0x231f54(0x703)][_0x231f54(0x558)]=Scene_Battle['prototype']['createSpriteset'],Scene_Battle[_0x231f54(0x3fc)][_0x231f54(0x46b)]=function(){const _0x483d60=_0x231f54;VisuMZ['CoreEngine'][_0x483d60(0x558)][_0x483d60(0x690)](this);const _0x11abf7=this[_0x483d60(0x508)][_0x483d60(0x6b7)];if(_0x11abf7)this[_0x483d60(0x6ad)](_0x11abf7);},Sprite_Actor[_0x231f54(0x3fc)][_0x231f54(0x425)]=function(){const _0x288501=_0x231f54;Sprite_Battler[_0x288501(0x3fc)]['update'][_0x288501(0x690)](this),this[_0x288501(0x344)]();if(this['_actor'])this[_0x288501(0x3a0)]();else this['_battlerName']!==''&&(this['_battlerName']='');},Window[_0x231f54(0x3fc)][_0x231f54(0x7c2)]=function(){const _0x51ee6d=_0x231f54,_0x4b18c7=this[_0x51ee6d(0x5fd)],_0x290590=this[_0x51ee6d(0x303)],_0x2665a9=0x18,_0x142568=_0x2665a9/0x2,_0x411fe7=0x60+_0x2665a9,_0x8efecc=0x0+_0x2665a9;this[_0x51ee6d(0x818)][_0x51ee6d(0x5af)]=this['_windowskin'],this[_0x51ee6d(0x818)][_0x51ee6d(0x1fd)]['x']=0.5,this[_0x51ee6d(0x818)][_0x51ee6d(0x1fd)]['y']=0.5,this[_0x51ee6d(0x818)][_0x51ee6d(0x22c)](_0x411fe7+_0x142568,_0x8efecc+_0x142568+_0x2665a9,_0x2665a9,_0x142568),this[_0x51ee6d(0x818)]['move'](Math[_0x51ee6d(0x64c)](_0x4b18c7/0x2),Math['round'](_0x290590-_0x142568)),this[_0x51ee6d(0x2b7)][_0x51ee6d(0x5af)]=this[_0x51ee6d(0x505)],this['_upArrowSprite'][_0x51ee6d(0x1fd)]['x']=0.5,this[_0x51ee6d(0x2b7)]['anchor']['y']=0.5,this[_0x51ee6d(0x2b7)][_0x51ee6d(0x22c)](_0x411fe7+_0x142568,_0x8efecc,_0x2665a9,_0x142568),this[_0x51ee6d(0x2b7)]['move'](Math['round'](_0x4b18c7/0x2),Math['round'](_0x142568));},Window[_0x231f54(0x3fc)][_0x231f54(0x243)]=function(){const _0x18bd7a=_0x231f54,_0xc3e94b=0x90,_0x10dd5c=0x60,_0x26c586=0x18;this[_0x18bd7a(0x5ac)]['bitmap']=this['_windowskin'],this['_pauseSignSprite']['anchor']['x']=0.5,this[_0x18bd7a(0x5ac)]['anchor']['y']=0x1,this[_0x18bd7a(0x5ac)][_0x18bd7a(0x6a6)](Math[_0x18bd7a(0x64c)](this[_0x18bd7a(0x5fd)]/0x2),this[_0x18bd7a(0x303)]),this[_0x18bd7a(0x5ac)][_0x18bd7a(0x22c)](_0xc3e94b,_0x10dd5c,_0x26c586,_0x26c586),this[_0x18bd7a(0x5ac)]['alpha']=0x0;},Window['prototype']['_updateFilterArea']=function(){const _0x5cecaf=_0x231f54,_0x2e2f60=this['_clientArea'][_0x5cecaf(0x43e)][_0x5cecaf(0x6ef)](new Point(0x0,0x0)),_0x406243=this['_clientArea'][_0x5cecaf(0x55a)];_0x406243['x']=_0x2e2f60['x']+this[_0x5cecaf(0x44c)]['x'],_0x406243['y']=_0x2e2f60['y']+this['origin']['y'],_0x406243['width']=Math[_0x5cecaf(0x229)](this[_0x5cecaf(0x1da)]*this[_0x5cecaf(0x831)]['x']),_0x406243['height']=Math[_0x5cecaf(0x229)](this['innerHeight']*this[_0x5cecaf(0x831)]['y']);},Window[_0x231f54(0x3fc)][_0x231f54(0x6ff)]=function(){const _0x516c4f=_0x231f54,_0x2f186b=this[_0x516c4f(0x329)],_0xa096d8=Math['max'](0x0,this[_0x516c4f(0x5fd)]-_0x2f186b*0x2),_0x5952b6=Math[_0x516c4f(0x565)](0x0,this[_0x516c4f(0x303)]-_0x2f186b*0x2),_0x525b15=this[_0x516c4f(0x647)],_0x22cd17=_0x525b15[_0x516c4f(0x24a)][0x0];_0x525b15[_0x516c4f(0x5af)]=this[_0x516c4f(0x505)],_0x525b15[_0x516c4f(0x22c)](0x0,0x0,0x60,0x60),_0x525b15[_0x516c4f(0x6a6)](_0x2f186b,_0x2f186b),_0x525b15[_0x516c4f(0x831)]['x']=_0xa096d8/0x60,_0x525b15[_0x516c4f(0x831)]['y']=_0x5952b6/0x60,_0x22cd17[_0x516c4f(0x5af)]=this[_0x516c4f(0x505)],_0x22cd17[_0x516c4f(0x22c)](0x0,0x60,0x60,0x60),_0x22cd17[_0x516c4f(0x6a6)](0x0,0x0,_0xa096d8,_0x5952b6),_0x22cd17[_0x516c4f(0x831)]['x']=0x60/_0xa096d8,_0x22cd17[_0x516c4f(0x831)]['y']=0x60/_0x5952b6,_0x525b15[_0x516c4f(0x422)](this['_colorTone']);};