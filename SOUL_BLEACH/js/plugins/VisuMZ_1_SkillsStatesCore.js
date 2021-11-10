//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.16;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.16] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.hpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.mpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.tpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x1592=['eFdTs','hasSkill','length','jRkeU','KfAXH','isStateAddable','Game_Battler_addBuff','isStateRemoved','ParseClassIDs','adjustItemWidthByShopStatus','_battler','DataFontSize','clearStatesWithStateRetain','removeBuff','createShopStatusWindow','HyVUV','HsVTI','match','includesSkillsStatesCore','MHUNz','OPMLs','stateColor','sOMqt','format','KsUaB','enemyId','ERsMZ','_stateDisplay','XgmFC','drawActorIcons','onExpireStateCustomJS','RhfkK','rBrUp','oTHYD','Name','stateData','LUK','currentMaxValue','ARRAYFUNC','height','refresh','stateMaximumTurns','BvmIN','colSpacing','forgetSkill','vzDNW','stateMpSlipDamageJS','applyDebuffTurnManipulationEffects','getCurrentStateOriginKey','ParseSkillNotetags','ehMEi','isActor','checkShowHideSwitchNotetags','setStateOrigin','54490lMqITW','LGfgc','Sprite_Gauge_currentValue','dMuHe','paySkillCost','Game_Battler_addDebuff','concat','meetsSkillConditionsGlobalJS','Enemy','shopStatusWindowRectSkillsStatesCore','OBwUk','hasState','_skillTypeWindow','Sprite_Gauge_initMembers','ColorNegative','skillTypeWindowRectSkillsStatesCore','user','normalColor','drawActorBuffRates','inVlL','makeAdditionalSkillCostText','boiDY','resetStateCounts','onAddState','Game_Actor_skillTypes','index','Skills','Game_BattlerBase_initMembers','Param','DWHPF','toLowerCase','resetTextColor','createAllSkillCostText','Parse_Notetags_State_ApplyRemoveLeaveJS','fontSize','convertGaugeTypeSkillsStatesCore','useDigitGrouping','NUM','onAddStateGlobalJS','itemLineRect','keys','JAkCn','sort','drawTextEx','hcBvh','buffColor','_categoryWindow','States','DataOffsetX','isRightInputMode','AGI','ConvertParams','uJYjo','itemWindowRect','actor','resetFontSettings','applyStateCategoryRemovalEffects','xtbcV','description','removeStatesByCategoryAll','convertTargetToStateOriginKey','debuffTurns','_stateOrigin','meetsPassiveStateConditionSwitches','Game_BattlerBase_skillMpCost','qDWGR','CmdStyle','currentValue','onExpireStateGlobalJS','gainMp','setStateData','ARRAYEVAL','canClearState','onRemoveState','Sprite_StateIcon_updateFrame','_stateIDs','priority','increaseBuff','addState','Sprite_Gauge_redraw','CalcJS','status','_states','skill','isBuffAffected','ParseStateNotetags','_skillIDs','debuffColor','parameters','addChild','jDZIe','drawActorStateData','setBuffTurns','HkUau','calcWindowHeight','JRCYf','%1\x20%2\x20%3','addPassiveStates','6ppBSsB','TurnFontSize','helpWindowRectSkillsStatesCore','recoverAll','_stateRetainType','onAddBuffGlobalJS','width','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','IconStypeNorm','8527CyTmbW','HUUxx','zPuuG','greater','iconIndex','addStateTurns','QuWNa','Zqype','Buffs','overwriteBuffTurns','Game_Troop_setup','canPaySkillCost','stateTurns','helpAreaTop','stateExpireJS','<enemy-%1>','ikMcr','TGAKA','itemTextAlign','map','bHNue','_stateMaxTurns','QUVgp','isStateExpired','mpCost','XioCC','VisuMZ_1_ItemsEquipsCore','slice','onEraseBuff','Parse_Notetags_State_Category','<actor-%1>','PassiveConditionJS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','isAllDead','_subject','skillVisibleJS','cgERK','Window_SkillList_includes','_buffs','onExpireBuff','hNhMA','ShowData','textColor','add','RXGtM','commandStyle','replace','meetsPassiveStateConditions','isUseModernControls','Game_Battler_isStateAddable','Game_BattlerBase_decreaseBuff','checkShowHideNotetags','Game_Action_applyItemUserEffect','Game_BattlerBase_eraseState','addWindow','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','ColorNeutral','setupSkillsStatesCore','process_VisuMZ_SkillsStatesCore_Skill_Notetags','iconText','ARRAYNUM','clamp','recalculateSlipDamageJS','zkmVy','TextJS','TurnOffsetY','callUpdateHelp','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','uiMenuStyle','onExpireDebuffGlobalJS','menuActor','addDebuffTurns','ShowJS','state','OTSHE','item','Game_BattlerBase_increaseBuff','Game_BattlerBase_resetStateCounts','addBuff','cDdRm','isCommandEnabled','remove','FUNC','changeTextColor','shift','stateEraseJS','NEGATIVE','placeGauge','Mmxqv','stateAddJS','slipMp','SkillsStatesCore','bitmap','shopStatusWidth','ROnzv','statesByCategory','meetsPassiveStateConditionJS','getCurrentTroopUniqueID','_currentActor','_cache','ARRAYJSON','785186TTySIJ','<member-%1>','fBYvd','krptY','mainFontSize','Scene_Skill_helpWindowRect','384108ekRngY','UGpIl','getStateRetainType','bzaGP','note','oveYL','meetsSkillConditions','hasStateCategory','Game_Battler_addState','BkOHk','Window_SkillList_maxCols','otJhW','_statusWindow','IvIHr','statusWindowRectSkillsStatesCore','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','MDF','removeState','death','changeOutlineColor','BVRqg','isGroupDefeatStateAffected','EARxJ','setStypeId','innerWidth','_stored_buffColor','lnTbX','drawText','initMembersSkillsStatesCore','_classIDs','UTzwQ','Eqyta','uJfBN','iconHeight','isBuffOrDebuffAffected','isDebuffAffected','PoRBk','onAddDebuff','getStateDisplay','Sprite_StateIcon_loadBitmap','onEraseStateJS','_tempBattler','ParseAllNotetags','icon','Game_BattlerBase_meetsSkillConditions','Game_Battler_regenerateAll','_scene','untitled','rDZoP','POSITIVE','Scene_Skill_itemWindowRect','FTIrW','fpURf','applyStateTurnManipulationEffects','uiHelpPosition','_shopStatusWindow','createCommandNameWindow','Game_BattlerBase_buffIconIndex','HiddenSkillTypes','STRUCT','fontFace','bwVAp','Game_BattlerBase_refresh','ihaAg','_hidden','ignore','die','outlineColor','createSkillCostText','skillTpCost','kLEqB','initialize','text','SDhcm','YMwCB','Scene_Skill_statusWindowRect','FtHmj','ColorDebuff','_stypeId','onExpireDebuff','RXXFT','YGQkS','onAddStateMakeCustomSlipValues','nldGQ','EVAL','toUpperCase','hide','isStateRestrict','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','zUwlD','fillRect','pJGWi','maxSlipDamage','commandName','EnableLayout','version','_costSettings','mainAreaTop','stateTpSlipHealJS','MiROT','passiveStateObjects','gainSilentTp','decreaseBuff','clearStateOrigin','members','onExpireState','anchor','eraseState','Game_Unit_isAllDead','DCTTW','convertPassiveStates','itemWindowRectSkillsStatesCore','MAT','_actor','wcLZY','CmdTextAlign','gLaWR','skillTypeWindowRect','checkShowHideSkillNotetags','PassiveStates','setStateDisplay','drawItemStyleIconText','tkoWm','Game_BattlerBase_skillTpCost','canUse','gaugeLineHeight','Sprite_Gauge_gaugeRate','onRegenerateCustomStateDamageOverTime','isPartyAllAffectedByGroupDefeatStates','onDatabaseLoaded','passiveStates','removeBuffsAuto','helpWindowRect','_itemWindow','loadBitmap','damage','_stateData','boxWidth','AFYBU','getStateOrigin','HUZyw','redrawSkillsStatesCore','contents','isStateAffected','frameCount','DEF','VZAbK','onExpireBuffJS','Parse_Notetags_Skill_Cost','createTurnDisplaySprite','skillCostSeparator','wjQZe','SkillMenuStatusRect','ZrkZJ','clearStates','uiInputPosition','vQIVJ','HNfzA','ColorPositive','tFQdm','DisplayedParams','process_VisuMZ_SkillsStatesCore_Notetags','alterSkillName','inBattle','OPdqZ','currentClass','isPlaytest','fontBold','commandNameWindowDrawBackground','_turnDisplaySprite','jcvzI','DataOffsetY','meetsStateCondition','paramBuffRate','Parse_Notetags_State_PassiveJS','ListWindowCols','maxCols','SkillSceneStatusBgType','_checkingPassiveStates','itemAt','stateHpSlipDamageJS','setPassiveStateSlipDamageJS','CPzFf','sAFsP','Sprite_Gauge_setup','changePaintOpacity','name','center','mEYYi','OwyXX','stateMpSlipHealJS','Window_SkillList_setActor','VisuMZ_1_MainMenuCore','autoRemovalTiming','_checkingVisuMzPassiveStateObjects','ZdaZU','prototype','Scene_Skill_createItemWindow','drawFullGauge','VQayo','applyBuffTurnManipulationEffects','_skills','\x5cI[%1]%2','test','checkSkillTypeMatch','totalStateCategory','buffIconIndex','skillMpCost','states','VIlcs','usableSkills','getColorDataFromPluginParameters','mainFontFace','NvvUH','GroupDigits','checkCacheKey','maxItems','onExpireBuffGlobalJS','ovwFe','fnWiT','meetsPassiveStateConditionClasses','meetsSkillConditionsEnableJS','drawItem','enemy','onEraseBuffGlobalJS','split','getCurrentStateActiveUser','groupDefeat','buttonAssistSwitch','currentValueSkillsStatesCore','gSJho','gradientFillRect','OYRKs','process_VisuMZ_SkillsStatesCore_State_Notetags','MrqYe','TurnOffsetX','rYdeS','Window_SkillList_drawItem','getStateOriginByKey','HhPZb','onAddStateCustomJS','eraseBuff','Scene_Skill_skillTypeWindowRect','reset','onEraseDebuff','PRxgT','isUseSkillsStatesCoreUpdatedLayout','psgiN','Settings','Scene_Boot_onDatabaseLoaded','Sprite_Gauge_currentMaxValue','getSkillIdWithName','onAddStateJS','getSkillTypes','Window_SkillList_updateHelp','value','scrollTo','Window_StatusBase_drawActorIcons','isPassiveStateStackable','Window_SkillType_initialize','EMCke','onExpireStateJS','auto','Window_SkillStatus_refresh','setBackgroundType','jyihd','Zkgpw','OXGYx','setActor','drawItemStyleIcon','buffTurns','drawSkillCost','updatedLayoutStyle','textSizeEx','multiclasses','WGPkm','skillId','#%1','_colorCache','ATK','Global','CELlA','onEraseDebuffJS','stateHpSlipHealJS','ReapplyRules','_stateSteps','onAddBuff','checkSkillConditionsSwitchNotetags','xfYHz','_stored_state-%1-color','_tempActor','removeStatesByCategory','YVJYv','%1%','drawExtendedParameter','skills','checkShowHideBattleNotetags','onAddBuffJS','isSkillCostShown','buffLength','filter','Parse_Notetags_Skill_JS','skillEnableJS','stateId','setDebuffTurns','MultiplierJS','stypeId','return\x200','MAXMP','Game_Actor_forgetSkill','_stypeIDs','number','getClassIdWithName','iconWidth','gaugeRate','402448woFVxI','addPassiveStatesByPluginParameters','GgXVs','commandNameWindowDrawText','rgzUi','VhIUo','onEraseStateCustomJS','actions','ShowShopStatus','StackBuffMax','drawActorStateTurns','Actor','paramValueByName','onExpireDebuffJS','createItemWindow','constructor','JVwTa','currentMaxValueSkillsStatesCore','isSkillUsableForAutoBattle','hQjhp','gNMxr','ShowTurns','isDBB','OVhiN','34268QHQwVB','buff','79ouYYeI','uCulP','pdOyY','setup','IconStypeMagic','_stateTurns','updateTurnDisplaySprite','VisuMZ_1_ElementStatusCore','Game_BattlerBase_recoverAll','getStateData','makeCommandName','VisuMZ_0_CoreEngine','isBuffExpired','right','kNrCT','addCommand','updateStateTurns','heal','updateVisibility','slipHp','VisuMZ_2_ClassChangeSystem','GNLoA','removeStatesAuto','isBuffPrevented','gJSXI','getStateIdWithName','recover\x20all','addDebuff','allowCreateShopStatusWindow','Game_BattlerBase_overwriteBuffTurns','<troop-%1>','updateStatesActionEnd','uTCCM','Game_BattlerBase_states','categories','ARRAYSTR','push','checkSkillConditionsNotetags','JLJFf','setStatusWindow','wILWn','MHOXs','addPassiveStatesTraitSets','ktFJp','isStateCategoryAffected','LayoutStyle','CanPayJS','statusWindowRect','620654TphRSM','applySkillsStatesCoreEffects','commandNameWindowCenter','clearStateRetainType','includes','addPassiveStatesByNotetag','drawParamText','shopStatusWindowRect','setStateRetainType','onAddDebuffGlobalJS','_commandNameWindow','ceil','Window_StatusBase_placeGauge','_buffTurns','commandStyleCheck','helpAreaHeight','regenerateAll','checkShowHideJS','SApPw','addBuffTurns','Game_BattlerBase_clearStates','YDLGr','gmCsP','statePassiveConditionJS','lineHeight','mainAreaHeight','SkillConditionJS','skillTypes','onEraseStateGlobalJS','MAXHP','GaugeMaxJS','addPassiveStatesFromOtherPlugins','OHFsA','success','trim','meetsPassiveStateGlobalConditionJS','Parse_Notetags_State_SlipEffectJS','gainHp','placeExactGauge','BattleManager_endAction','updateFrame','setStateTurns','yDtLA','_result','_currentTroopUniqueID','QIsGQ','exit','11vlvwLq','Costs','clearStateData','setItem','log','clear','makeSuccess','DBJYB','isLearnedSkill','updateHelp','RFuMR','endAction','retrieveStateColor','makeCurrentTroopUniqueID','max','actorId','parse','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','drawActorBuffTurns','MaxTurns','AICLI','drawExtendedSkillsStatesCoreStatus','slipTp','RZvlr','innerHeight','getStypeIdWithName','equips','Game_Actor_learnSkill','floor','isStateResist','gTtIY','stateTpSlipDamageJS','initMembers','learnSkill','indexOf','fOcyb','lgUuF','rgba(0,\x200,\x200,\x201)','1zsfqAK','getStateReapplyRulings','call','mainCommandWidth'];const _0x421f4a=_0x2368;(function(_0x2b1301,_0xf6b294){const _0x27a4ab=_0x2368;while(!![]){try{const _0x5c71f4=-parseInt(_0x27a4ab(0x21d))*parseInt(_0x27a4ab(0x1bc))+-parseInt(_0x27a4ab(0x2df))*-parseInt(_0x27a4ab(0x27d))+-parseInt(_0x27a4ab(0x1a4))*parseInt(_0x27a4ab(0x243))+parseInt(_0x27a4ab(0x1be))*parseInt(_0x27a4ab(0x2e8))+parseInt(_0x27a4ab(0x353))+parseInt(_0x27a4ab(0x34d))+-parseInt(_0x27a4ab(0x1ee));if(_0x5c71f4===_0xf6b294)break;else _0x2b1301['push'](_0x2b1301['shift']());}catch(_0x10aa9c){_0x2b1301['push'](_0x2b1301['shift']());}}}(_0x1592,0xbbf19));function _0x2368(_0x221355,_0x33d6af){_0x221355=_0x221355-0x9d;let _0x1592e8=_0x1592[_0x221355];return _0x1592e8;}var label=_0x421f4a(0x343),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x421f4a(0x195)](function(_0x190563){const _0x26d5b9=_0x421f4a;return _0x190563[_0x26d5b9(0x2ce)]&&_0x190563[_0x26d5b9(0x2b7)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x421f4a(0x161)]=VisuMZ[label][_0x421f4a(0x161)]||{},VisuMZ[_0x421f4a(0x2b0)]=function(_0x5e2bee,_0x3a60e8){const _0x5941c4=_0x421f4a;for(const _0x33ff54 in _0x3a60e8){if(_0x33ff54['match'](/(.*):(.*)/i)){const _0x1357b7=String(RegExp['$1']),_0x419236=String(RegExp['$2'])['toUpperCase']()[_0x5941c4(0x210)]();let _0x1eaa88,_0x5587e6,_0x35b306;switch(_0x419236){case _0x5941c4(0x2a2):_0x1eaa88=_0x3a60e8[_0x33ff54]!==''?Number(_0x3a60e8[_0x33ff54]):0x0;break;case _0x5941c4(0x324):_0x5587e6=_0x3a60e8[_0x33ff54]!==''?JSON[_0x5941c4(0x22d)](_0x3a60e8[_0x33ff54]):[],_0x1eaa88=_0x5587e6[_0x5941c4(0x2fb)](_0x3da44d=>Number(_0x3da44d));break;case _0x5941c4(0xbd):_0x1eaa88=_0x3a60e8[_0x33ff54]!==''?eval(_0x3a60e8[_0x33ff54]):null;break;case _0x5941c4(0x2c4):_0x5587e6=_0x3a60e8[_0x33ff54]!==''?JSON[_0x5941c4(0x22d)](_0x3a60e8[_0x33ff54]):[],_0x1eaa88=_0x5587e6[_0x5941c4(0x2fb)](_0x541f20=>eval(_0x541f20));break;case'JSON':_0x1eaa88=_0x3a60e8[_0x33ff54]!==''?JSON[_0x5941c4(0x22d)](_0x3a60e8[_0x33ff54]):'';break;case _0x5941c4(0x34c):_0x5587e6=_0x3a60e8[_0x33ff54]!==''?JSON[_0x5941c4(0x22d)](_0x3a60e8[_0x33ff54]):[],_0x1eaa88=_0x5587e6[_0x5941c4(0x2fb)](_0x19d32b=>JSON[_0x5941c4(0x22d)](_0x19d32b));break;case _0x5941c4(0x33a):_0x1eaa88=_0x3a60e8[_0x33ff54]!==''?new Function(JSON['parse'](_0x3a60e8[_0x33ff54])):new Function(_0x5941c4(0x19c));break;case _0x5941c4(0x26d):_0x5587e6=_0x3a60e8[_0x33ff54]!==''?JSON[_0x5941c4(0x22d)](_0x3a60e8[_0x33ff54]):[],_0x1eaa88=_0x5587e6[_0x5941c4(0x2fb)](_0x30cc19=>new Function(JSON[_0x5941c4(0x22d)](_0x30cc19)));break;case'STR':_0x1eaa88=_0x3a60e8[_0x33ff54]!==''?String(_0x3a60e8[_0x33ff54]):'';break;case _0x5941c4(0x1e1):_0x5587e6=_0x3a60e8[_0x33ff54]!==''?JSON[_0x5941c4(0x22d)](_0x3a60e8[_0x33ff54]):[],_0x1eaa88=_0x5587e6[_0x5941c4(0x2fb)](_0x11cf50=>String(_0x11cf50));break;case _0x5941c4(0xa4):_0x35b306=_0x3a60e8[_0x33ff54]!==''?JSON[_0x5941c4(0x22d)](_0x3a60e8[_0x33ff54]):{},_0x5e2bee[_0x1357b7]={},VisuMZ[_0x5941c4(0x2b0)](_0x5e2bee[_0x1357b7],_0x35b306);continue;case'ARRAYSTRUCT':_0x5587e6=_0x3a60e8[_0x33ff54]!==''?JSON[_0x5941c4(0x22d)](_0x3a60e8[_0x33ff54]):[],_0x1eaa88=_0x5587e6[_0x5941c4(0x2fb)](_0x300a95=>VisuMZ[_0x5941c4(0x2b0)]({},JSON[_0x5941c4(0x22d)](_0x300a95)));break;default:continue;}_0x5e2bee[_0x1357b7]=_0x1eaa88;}}return _0x5e2bee;},(_0x10a05c=>{const _0x27a698=_0x421f4a,_0x1a91cc=_0x10a05c[_0x27a698(0x123)];for(const _0x371313 of dependencies){if(!Imported[_0x371313]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x27a698(0x25e)](_0x1a91cc,_0x371313)),SceneManager[_0x27a698(0x21c)]();break;}}const _0x482c55=_0x10a05c[_0x27a698(0x2b7)];if(_0x482c55[_0x27a698(0x258)](/\[Version[ ](.*?)\]/i)){const _0x5e3463=Number(RegExp['$1']);_0x5e3463!==VisuMZ[label][_0x27a698(0xc8)]&&(alert(_0x27a698(0xc1)[_0x27a698(0x25e)](_0x1a91cc,_0x5e3463)),SceneManager['exit']());}if(_0x482c55[_0x27a698(0x258)](/\[Tier[ ](\d+)\]/i)){if(_0x27a698(0x12c)!=='rSnEM'){const _0x648e03=Number(RegExp['$1']);_0x648e03<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x27a698(0x25e)](_0x1a91cc,_0x648e03,tier)),SceneManager[_0x27a698(0x21c)]()):tier=Math[_0x27a698(0x22b)](_0x648e03,tier);}else{function _0x262efa(){const _0x3bdf91=_0x27a698;_0x3d916b[_0x3bdf91(0x2d9)](_0x98e22f,_0x1e3764),this[_0x3bdf91(0x223)](_0x540e8c);}}}VisuMZ['ConvertParams'](VisuMZ[label][_0x27a698(0x161)],_0x10a05c[_0x27a698(0x2d5)]);})(pluginData),VisuMZ[_0x421f4a(0x343)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x421f4a(0x12d)]['onDatabaseLoaded'],Scene_Boot[_0x421f4a(0x12d)][_0x421f4a(0xea)]=function(){const _0x2bf778=_0x421f4a;VisuMZ['SkillsStatesCore'][_0x2bf778(0x162)]['call'](this),this[_0x2bf778(0x10a)]();},Scene_Boot[_0x421f4a(0x12d)][_0x421f4a(0x10a)]=function(){const _0x3ae47d=_0x421f4a;if(VisuMZ[_0x3ae47d(0x37d)])return;this[_0x3ae47d(0x322)](),this[_0x3ae47d(0x152)]();},Scene_Boot[_0x421f4a(0x12d)][_0x421f4a(0x322)]=function(){const _0x5694b7=_0x421f4a;for(const _0x13b6b1 of $dataSkills){if(!_0x13b6b1)continue;VisuMZ[_0x5694b7(0x343)][_0x5694b7(0xfd)](_0x13b6b1),VisuMZ[_0x5694b7(0x343)][_0x5694b7(0x196)](_0x13b6b1);}},Scene_Boot[_0x421f4a(0x12d)]['process_VisuMZ_SkillsStatesCore_State_Notetags']=function(){const _0x4e0e7f=_0x421f4a;for(const _0x21d1bc of $dataStates){if(!_0x21d1bc)continue;VisuMZ[_0x4e0e7f(0x343)][_0x4e0e7f(0x305)](_0x21d1bc),VisuMZ[_0x4e0e7f(0x343)]['Parse_Notetags_State_PassiveJS'](_0x21d1bc),VisuMZ[_0x4e0e7f(0x343)][_0x4e0e7f(0x212)](_0x21d1bc),VisuMZ['SkillsStatesCore'][_0x4e0e7f(0x29e)](_0x21d1bc);}},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x278)]=VisuMZ[_0x421f4a(0x278)],VisuMZ[_0x421f4a(0x278)]=function(_0x227855){const _0x30b553=_0x421f4a;VisuMZ[_0x30b553(0x343)][_0x30b553(0x278)][_0x30b553(0x245)](this,_0x227855),VisuMZ[_0x30b553(0x343)][_0x30b553(0xfd)](_0x227855),VisuMZ[_0x30b553(0x343)][_0x30b553(0x196)](_0x227855);},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x2d2)]=VisuMZ[_0x421f4a(0x2d2)],VisuMZ[_0x421f4a(0x2d2)]=function(_0x8128df){const _0xf826e0=_0x421f4a;VisuMZ[_0xf826e0(0x343)][_0xf826e0(0x2d2)][_0xf826e0(0x245)](this,_0x8128df),VisuMZ[_0xf826e0(0x343)][_0xf826e0(0x305)](_0x8128df),VisuMZ['SkillsStatesCore'][_0xf826e0(0x117)](_0x8128df),VisuMZ[_0xf826e0(0x343)][_0xf826e0(0x212)](_0x8128df),VisuMZ['SkillsStatesCore'][_0xf826e0(0x29e)](_0x8128df);},VisuMZ[_0x421f4a(0x343)]['Parse_Notetags_Skill_Cost']=function(_0x5ba549){const _0x5e0713=_0x421f4a,_0x192c90=_0x5ba549['note'];_0x192c90[_0x5e0713(0x258)](/<MP COST:[ ](\d+)>/i)&&(_0x5ba549[_0x5e0713(0x300)]=Number(RegExp['$1'])),_0x192c90[_0x5e0713(0x258)](/<TP COST:[ ](\d+)>/i)&&(_0x5ba549['tpCost']=Number(RegExp['$1']));},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x197)]={},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x30b)]={},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x196)]=function(_0x2ee680){const _0x10a834=_0x421f4a,_0xd2668a=_0x2ee680['note'];if(_0xd2668a[_0x10a834(0x258)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){if('XlIDC'===_0x10a834(0x1a9)){function _0x3f1f25(){const _0x3be88a=_0x10a834;return _0x3a81c9[_0x3be88a(0x343)][_0x3be88a(0x161)]['Skills'][_0x3be88a(0x1ac)];}}else{const _0x4512c3=String(RegExp['$1']),_0x1c9e10='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x10a834(0x25e)](_0x4512c3);VisuMZ[_0x10a834(0x343)]['skillEnableJS'][_0x2ee680['id']]=new Function('skill',_0x1c9e10);}}if(_0xd2668a[_0x10a834(0x258)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x1ed4d8=String(RegExp['$1']),_0x581484=_0x10a834(0x32b)[_0x10a834(0x25e)](_0x1ed4d8);VisuMZ[_0x10a834(0x343)][_0x10a834(0x30b)][_0x2ee680['id']]=new Function(_0x10a834(0x2d0),_0x581484);}},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x305)]=function(_0x3ff897){const _0x4dd38e=_0x421f4a;_0x3ff897[_0x4dd38e(0x1e0)]=['ALL','ANY'];const _0x10536f=_0x3ff897[_0x4dd38e(0x357)],_0x161df8=_0x10536f[_0x4dd38e(0x258)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x161df8)for(const _0x4e8203 of _0x161df8){if('IGdiX'!==_0x4dd38e(0x234)){_0x4e8203[_0x4dd38e(0x258)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x2d1b62=String(RegExp['$1'])['toUpperCase']()[_0x4dd38e(0x210)]()['split'](',');for(const _0x4fdfb2 of _0x2d1b62){_0x3ff897['categories']['push'](_0x4fdfb2[_0x4dd38e(0x210)]());}}else{function _0x720f10(){const _0x270298=_0x4dd38e,_0x3d0c7f='<enemy-%1>'['format'](_0x837e73[_0x270298(0x260)]()),_0xd388aa=_0x270298(0x34e)[_0x270298(0x25e)](_0xacf3eb[_0x270298(0x296)]()),_0x29fd1b=_0x270298(0x1dc)[_0x270298(0x25e)](_0x21ea89[_0x270298(0x349)]());return'%1\x20%2\x20%3'[_0x270298(0x25e)](_0x3d0c7f,_0xd388aa,_0x29fd1b);}}}if(_0x10536f['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x51047b=RegExp['$1'][_0x4dd38e(0x14a)](/[\r\n]+/);for(const _0x2b4372 of _0x51047b){_0x3ff897[_0x4dd38e(0x1e0)]['push'](_0x2b4372[_0x4dd38e(0xbe)]()[_0x4dd38e(0x210)]());}}if(_0x10536f['match'](/<POSITIVE STATE>/i)){if(_0x4dd38e(0x383)===_0x4dd38e(0x383))_0x3ff897[_0x4dd38e(0x1e0)][_0x4dd38e(0x1e2)](_0x4dd38e(0x384));else{function _0x899a27(){const _0x825b03=this['statesByCategory'](_0x5ad8f1);return _0x825b03['length'];}}}if(_0x10536f[_0x4dd38e(0x258)](/<NEGATIVE STATE>/i)){if(_0x4dd38e(0x11f)!==_0x4dd38e(0x1a8))_0x3ff897[_0x4dd38e(0x1e0)][_0x4dd38e(0x1e2)](_0x4dd38e(0x33e));else{function _0x436fdd(){const _0x48abd6=_0x4dd38e;return _0x5339b5[_0x48abd6(0x343)][_0x48abd6(0x161)][_0x48abd6(0xe0)][_0x48abd6(0x307)][_0x48abd6(0x245)](this,_0x1372c8);}}}},VisuMZ[_0x421f4a(0x343)]['statePassiveConditionJS']={},VisuMZ[_0x421f4a(0x343)]['Parse_Notetags_State_PassiveJS']=function(_0xa31ea0){const _0x20a4a6=_0x421f4a,_0x277cec=_0xa31ea0[_0x20a4a6(0x357)];if(_0x277cec['match'](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){if('ihaAg'===_0x20a4a6(0xa8)){const _0x4b4ba5=String(RegExp['$1']),_0x5315eb=_0x20a4a6(0x31f)[_0x20a4a6(0x25e)](_0x4b4ba5);VisuMZ[_0x20a4a6(0x343)][_0x20a4a6(0x205)][_0xa31ea0['id']]=new Function('state',_0x5315eb);}else{function _0x53f5f2(){const _0x276092=_0x20a4a6,_0xa240cb=this['aliveMembers']();for(const _0x2bc242 of _0xa240cb){if(!_0x2bc242[_0x276092(0x368)]())return![];}return!![];}}}},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x11d)]={},VisuMZ[_0x421f4a(0x343)]['stateHpSlipHealJS']={},VisuMZ['SkillsStatesCore'][_0x421f4a(0x275)]={},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x127)]={},VisuMZ[_0x421f4a(0x343)]['stateTpSlipDamageJS']={},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0xcb)]={},VisuMZ['SkillsStatesCore'][_0x421f4a(0x212)]=function(_0x364a33){const _0x232c6c=_0x421f4a,_0x2cbe88=_0x364a33['note'],_0x452dd5=_0x232c6c(0x362);if(_0x2cbe88[_0x232c6c(0x258)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x1a6986=String(RegExp['$1']),_0xc0ad3b=_0x452dd5[_0x232c6c(0x25e)](_0x1a6986,_0x232c6c(0xf0),-0x1,_0x232c6c(0x1d1));VisuMZ[_0x232c6c(0x343)]['stateHpSlipDamageJS'][_0x364a33['id']]=new Function(_0x232c6c(0x198),_0xc0ad3b);}else{if(_0x2cbe88[_0x232c6c(0x258)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x4e4daa=String(RegExp['$1']),_0x5a357f=_0x452dd5[_0x232c6c(0x25e)](_0x4e4daa,_0x232c6c(0x1cf),0x1,_0x232c6c(0x1d1));VisuMZ[_0x232c6c(0x343)][_0x232c6c(0x184)][_0x364a33['id']]=new Function('stateId',_0x5a357f);}}if(_0x2cbe88['match'](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){if('nnMCh'===_0x232c6c(0x144)){function _0x435f19(){const _0x4fe066=_0x232c6c,_0x321c82=_0x349ac5(_0x39b3db['$1'])[_0x4fe066(0x14a)](',')[_0x4fe066(0x2fb)](_0x2b5368=>_0x2b5368[_0x4fe066(0x210)]()),_0x2db30f=_0x3f52e1[_0x4fe066(0x343)][_0x4fe066(0x24f)](_0x321c82);let _0x5be6fe=[this[_0x4fe066(0x10e)]()];return _0xe7563[_0x4fe066(0x1d2)]&&this['multiclasses']&&(_0x5be6fe=this[_0x4fe066(0x17b)]()),_0x2db30f['filter'](_0x438fd5=>_0x5be6fe[_0x4fe066(0x1f2)](_0x438fd5))[_0x4fe066(0x249)]>0x0;}}else{const _0x364aa0=String(RegExp['$1']),_0x1e7da4=_0x452dd5[_0x232c6c(0x25e)](_0x364aa0,'damage',-0x1,_0x232c6c(0x342));VisuMZ['SkillsStatesCore'][_0x232c6c(0x275)][_0x364a33['id']]=new Function(_0x232c6c(0x198),_0x1e7da4);}}else{if(_0x2cbe88[_0x232c6c(0x258)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x861978=String(RegExp['$1']),_0x349a18=_0x452dd5[_0x232c6c(0x25e)](_0x861978,_0x232c6c(0x1cf),0x1,'slipMp');VisuMZ['SkillsStatesCore'][_0x232c6c(0x127)][_0x364a33['id']]=new Function(_0x232c6c(0x198),_0x349a18);}}if(_0x2cbe88[_0x232c6c(0x258)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){if('tFQdm'!==_0x232c6c(0x108)){function _0x385189(){const _0xf04351=_0x232c6c,_0x2ced18=this[_0xf04351(0x347)](_0x362c50)[_0xf04351(0x195)](_0x66d658=>this['isStateAffected'](_0x66d658['id']));return _0x2ced18[_0xf04351(0x249)];}}else{const _0x262467=String(RegExp['$1']),_0x3ea7f4=_0x452dd5[_0x232c6c(0x25e)](_0x262467,_0x232c6c(0xf0),-0x1,_0x232c6c(0x233));VisuMZ['SkillsStatesCore']['stateTpSlipDamageJS'][_0x364a33['id']]=new Function(_0x232c6c(0x198),_0x3ea7f4);}}else{if(_0x2cbe88[_0x232c6c(0x258)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x447d41=String(RegExp['$1']),_0x2ed09c=_0x452dd5[_0x232c6c(0x25e)](_0x447d41,_0x232c6c(0x1cf),0x1,'slipTp');VisuMZ['SkillsStatesCore']['stateTpSlipHealJS'][_0x364a33['id']]=new Function(_0x232c6c(0x198),_0x2ed09c);}}},VisuMZ['SkillsStatesCore'][_0x421f4a(0x341)]={},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x33d)]={},VisuMZ['SkillsStatesCore'][_0x421f4a(0x2f6)]={},VisuMZ['SkillsStatesCore']['Parse_Notetags_State_ApplyRemoveLeaveJS']=function(_0x15ce34){const _0x1f486c=_0x421f4a,_0x3dc6f3=_0x15ce34['note'],_0x5c9525=_0x1f486c(0x308);if(_0x3dc6f3[_0x1f486c(0x258)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x54f679=String(RegExp['$1']),_0x1d0f23=_0x5c9525[_0x1f486c(0x25e)](_0x54f679);VisuMZ[_0x1f486c(0x343)]['stateAddJS'][_0x15ce34['id']]=new Function(_0x1f486c(0x198),_0x1d0f23);}if(_0x3dc6f3[_0x1f486c(0x258)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x4aa60e=String(RegExp['$1']),_0x341f94=_0x5c9525[_0x1f486c(0x25e)](_0x4aa60e);VisuMZ[_0x1f486c(0x343)][_0x1f486c(0x33d)][_0x15ce34['id']]=new Function(_0x1f486c(0x198),_0x341f94);}if(_0x3dc6f3[_0x1f486c(0x258)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x166948=String(RegExp['$1']),_0x56455b=_0x5c9525[_0x1f486c(0x25e)](_0x166948);VisuMZ[_0x1f486c(0x343)][_0x1f486c(0x2f6)][_0x15ce34['id']]=new Function(_0x1f486c(0x198),_0x56455b);}},DataManager['getClassIdWithName']=function(_0x80ce70){const _0x49855b=_0x421f4a;_0x80ce70=_0x80ce70[_0x49855b(0xbe)]()[_0x49855b(0x210)](),this[_0x49855b(0x370)]=this[_0x49855b(0x370)]||{};if(this[_0x49855b(0x370)][_0x80ce70])return this[_0x49855b(0x370)][_0x80ce70];for(const _0x1e2d83 of $dataClasses){if(!_0x1e2d83)continue;let _0x560b6a=_0x1e2d83[_0x49855b(0x123)];_0x560b6a=_0x560b6a[_0x49855b(0x316)](/\x1I\[(\d+)\]/gi,''),_0x560b6a=_0x560b6a['replace'](/\\I\[(\d+)\]/gi,''),this[_0x49855b(0x370)][_0x560b6a[_0x49855b(0xbe)]()['trim']()]=_0x1e2d83['id'];}return this[_0x49855b(0x370)][_0x80ce70]||0x0;},DataManager['getSkillTypes']=function(_0x2e8515){const _0x2077bb=_0x421f4a;this[_0x2077bb(0x19f)]=this[_0x2077bb(0x19f)]||{};if(this[_0x2077bb(0x19f)][_0x2e8515['id']])return this[_0x2077bb(0x19f)][_0x2e8515['id']];this[_0x2077bb(0x19f)][_0x2e8515['id']]=[_0x2e8515[_0x2077bb(0x19b)]];if(_0x2e8515[_0x2077bb(0x357)][_0x2077bb(0x258)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2077bb(0x172)===_0x2077bb(0xc2)){function _0x5cb142(){const _0x3bcdcc=_0x2077bb;return _0x4e8df6=_0x4583fc[_0x3bcdcc(0xbe)]()[_0x3bcdcc(0x210)](),this[_0x3bcdcc(0x139)]()['filter'](_0x44dbb1=>_0x44dbb1[_0x3bcdcc(0x1e0)]['includes'](_0x2dd7f9));}}else{const _0x207ecc=JSON[_0x2077bb(0x22d)]('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x2077bb(0x19f)][_0x2e8515['id']]=this[_0x2077bb(0x19f)][_0x2e8515['id']]['concat'](_0x207ecc);}}else{if(_0x2e8515[_0x2077bb(0x357)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x5b51f3=RegExp['$1'][_0x2077bb(0x14a)](',');for(const _0x116439 of _0x5b51f3){if(_0x2077bb(0x2ee)!==_0x2077bb(0x2ee)){function _0x17754c(){const _0x256498=_0x2077bb,_0x4785ba=_0x870b17[_0x256498(0x22d)]('['+_0x307652['$1'][_0x256498(0x258)](/\d+/g)+']');for(const _0x521826 of _0x4785ba){if(!_0x2ba9fb[_0x256498(0x168)](_0x521826))return![];}return!![];}}else{const _0x587ce7=DataManager[_0x2077bb(0x236)](_0x116439);if(_0x587ce7)this['_stypeIDs'][_0x2e8515['id']][_0x2077bb(0x1e2)](_0x587ce7);}}}}return this[_0x2077bb(0x19f)][_0x2e8515['id']];},DataManager[_0x421f4a(0x236)]=function(_0x2422ca){const _0x1efc97=_0x421f4a;_0x2422ca=_0x2422ca['toUpperCase']()['trim'](),this[_0x1efc97(0x19f)]=this[_0x1efc97(0x19f)]||{};if(this[_0x1efc97(0x19f)][_0x2422ca])return this[_0x1efc97(0x19f)][_0x2422ca];for(let _0x4db878=0x1;_0x4db878<0x64;_0x4db878++){if(!$dataSystem['skillTypes'][_0x4db878])continue;let _0x4d5310=$dataSystem['skillTypes'][_0x4db878][_0x1efc97(0xbe)]()[_0x1efc97(0x210)]();_0x4d5310=_0x4d5310[_0x1efc97(0x316)](/\x1I\[(\d+)\]/gi,''),_0x4d5310=_0x4d5310[_0x1efc97(0x316)](/\\I\[(\d+)\]/gi,''),this[_0x1efc97(0x19f)][_0x4d5310]=_0x4db878;}return this['_stypeIDs'][_0x2422ca]||0x0;},DataManager[_0x421f4a(0x164)]=function(_0x752f8f){const _0x1c1ba0=_0x421f4a;_0x752f8f=_0x752f8f['toUpperCase']()['trim'](),this[_0x1c1ba0(0x2d3)]=this['_skillIDs']||{};if(this[_0x1c1ba0(0x2d3)][_0x752f8f])return this[_0x1c1ba0(0x2d3)][_0x752f8f];for(const _0xdae625 of $dataSkills){if(_0x1c1ba0(0x105)===_0x1c1ba0(0x23b)){function _0x5dbe65(){const _0xd69349=_0x1c1ba0;if(_0x3b8e62[_0xd69349(0x258)](/<member-(\d+)>/i))return _0x505610[_0xd69349(0xd1)]()[_0x2df3fc(_0x1f33bf['$1'])];}}else{if(!_0xdae625)continue;this[_0x1c1ba0(0x2d3)][_0xdae625[_0x1c1ba0(0x123)][_0x1c1ba0(0xbe)]()[_0x1c1ba0(0x210)]()]=_0xdae625['id'];}}return this[_0x1c1ba0(0x2d3)][_0x752f8f]||0x0;},DataManager[_0x421f4a(0x1d7)]=function(_0x11aecf){const _0x4f0578=_0x421f4a;_0x11aecf=_0x11aecf[_0x4f0578(0xbe)]()[_0x4f0578(0x210)](),this['_stateIDs']=this[_0x4f0578(0x2c8)]||{};if(this[_0x4f0578(0x2c8)][_0x11aecf])return this[_0x4f0578(0x2c8)][_0x11aecf];for(const _0x19773d of $dataStates){if(!_0x19773d)continue;this[_0x4f0578(0x2c8)][_0x19773d[_0x4f0578(0x123)][_0x4f0578(0xbe)]()[_0x4f0578(0x210)]()]=_0x19773d['id'];}return this[_0x4f0578(0x2c8)][_0x11aecf]||0x0;},DataManager[_0x421f4a(0x270)]=function(_0xcef726){const _0x35f95b=_0x421f4a;this[_0x35f95b(0x2fd)]=this['_stateMaxTurns']||{};if(this[_0x35f95b(0x2fd)][_0xcef726])return this[_0x35f95b(0x2fd)][_0xcef726];if($dataStates[_0xcef726][_0x35f95b(0x357)]['match'](/<MAX TURNS:[ ](\d+)>/i)){if(_0x35f95b(0x337)===_0x35f95b(0x356)){function _0x180709(){const _0x1f4243=_0x35f95b;if(typeof _0x51d917!=='number')_0x3d2b7f=_0x52410d['id'];return this[_0x1f4243(0xf1)]=this[_0x1f4243(0xf1)]||{},this['_stateData'][_0x410908]=this['_stateData'][_0x3344bb]||{},this[_0x1f4243(0xf1)][_0x33c3b6];}}else this[_0x35f95b(0x2fd)][_0xcef726]=Number(RegExp['$1']);}else{if(_0x35f95b(0x372)===_0x35f95b(0x372))this[_0x35f95b(0x2fd)][_0xcef726]=VisuMZ[_0x35f95b(0x343)]['Settings']['States']['MaxTurns'];else{function _0x5ce351(){const _0x1b68d8=_0x35f95b,_0x233aa7=_0x28f029[_0x1b68d8(0x343)][_0x1b68d8(0xe7)][_0x1b68d8(0x245)](this);return _0x233aa7['clamp'](0x0,0x1);}}}return this[_0x35f95b(0x2fd)][_0xcef726];},ColorManager[_0x421f4a(0x13c)]=function(_0x58c8e6,_0x485bae){const _0x1c0eb3=_0x421f4a;_0x485bae=String(_0x485bae),this[_0x1c0eb3(0x17f)]=this['_colorCache']||{};if(_0x485bae['match'](/#(.*)/i)){if(_0x1c0eb3(0x1e4)!==_0x1c0eb3(0x126))this['_colorCache'][_0x58c8e6]=_0x1c0eb3(0x17e)[_0x1c0eb3(0x25e)](String(RegExp['$1']));else{function _0x209d91(){const _0x56f045=_0x1c0eb3;if(typeof _0x39810d!=='number')_0x586dd3=_0x3646f9['id'];this[_0x56f045(0x2bb)]=this[_0x56f045(0x2bb)]||{},this['_stateOrigin'][_0x200170]=this[_0x56f045(0x2bb)][_0x279f53]||_0x56f045(0x28d);const _0x1b22cb=this['_stateOrigin'][_0x99a01f];return this[_0x56f045(0x157)](_0x1b22cb);}}}else this[_0x1c0eb3(0x17f)][_0x58c8e6]=this[_0x1c0eb3(0x312)](Number(_0x485bae));return this['_colorCache'][_0x58c8e6];},ColorManager['getColor']=function(_0x5993cd){const _0x313b47=_0x421f4a;return _0x5993cd=String(_0x5993cd),_0x5993cd[_0x313b47(0x258)](/#(.*)/i)?'#%1'[_0x313b47(0x25e)](String(RegExp['$1'])):this[_0x313b47(0x312)](Number(_0x5993cd));},ColorManager['stateColor']=function(_0x46495b){const _0x5d9d0e=_0x421f4a;if(typeof _0x46495b===_0x5d9d0e(0x1a0))_0x46495b=$dataStates[_0x46495b];const _0x46d9c1=_0x5d9d0e(0x18a)[_0x5d9d0e(0x25e)](_0x46495b['id']);this[_0x5d9d0e(0x17f)]=this[_0x5d9d0e(0x17f)]||{};if(this[_0x5d9d0e(0x17f)][_0x46d9c1])return this[_0x5d9d0e(0x17f)][_0x46d9c1];const _0x4b7dc3=this[_0x5d9d0e(0x229)](_0x46495b);return this['getColorDataFromPluginParameters'](_0x46d9c1,_0x4b7dc3);},ColorManager['retrieveStateColor']=function(_0x7b13cc){const _0x3a8d81=_0x421f4a,_0xa2cfdc=_0x7b13cc[_0x3a8d81(0x357)];if(_0xa2cfdc[_0x3a8d81(0x258)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0xa2cfdc[_0x3a8d81(0x258)](/<POSITIVE STATE>/i)){if(_0x3a8d81(0xdd)!==_0x3a8d81(0xdd)){function _0x22ab29(){const _0x265aaf=_0x3a8d81,_0x50e4cd=0x0,_0x417127=this[_0x265aaf(0x2f5)](),_0x32fefd=_0xeb69bb[_0x265aaf(0xf2)],_0x11b433=this['helpAreaHeight']();return new _0x51bc25(_0x50e4cd,_0x417127,_0x32fefd,_0x11b433);}}else return VisuMZ[_0x3a8d81(0x343)][_0x3a8d81(0x161)][_0x3a8d81(0x2ac)][_0x3a8d81(0x107)];}else return _0xa2cfdc[_0x3a8d81(0x258)](/<NEGATIVE STATE>/i)?VisuMZ['SkillsStatesCore'][_0x3a8d81(0x161)]['States'][_0x3a8d81(0x28b)]:VisuMZ['SkillsStatesCore'][_0x3a8d81(0x161)]['States'][_0x3a8d81(0x320)];}},ColorManager[_0x421f4a(0x2aa)]=function(){const _0x108849=_0x421f4a,_0xd8560=_0x108849(0x36c);this[_0x108849(0x17f)]=this['_colorCache']||{};if(this[_0x108849(0x17f)][_0xd8560])return this[_0x108849(0x17f)][_0xd8560];const _0x33531c=VisuMZ[_0x108849(0x343)][_0x108849(0x161)][_0x108849(0x2f0)]['ColorBuff'];return this['getColorDataFromPluginParameters'](_0xd8560,_0x33531c);},ColorManager[_0x421f4a(0x2d4)]=function(){const _0x889100=_0x421f4a,_0x423a61='_stored_debuffColor';this[_0x889100(0x17f)]=this[_0x889100(0x17f)]||{};if(this['_colorCache'][_0x423a61])return this[_0x889100(0x17f)][_0x423a61];const _0x12da63=VisuMZ[_0x889100(0x343)]['Settings'][_0x889100(0x2f0)][_0x889100(0xb6)];return this[_0x889100(0x13c)](_0x423a61,_0x12da63);},VisuMZ['SkillsStatesCore'][_0x421f4a(0x215)]=BattleManager[_0x421f4a(0x228)],BattleManager[_0x421f4a(0x228)]=function(){const _0xe65217=_0x421f4a;this[_0xe65217(0x1dd)](),VisuMZ[_0xe65217(0x343)][_0xe65217(0x215)]['call'](this);},BattleManager[_0x421f4a(0x1dd)]=function(){const _0x503276=_0x421f4a,_0x452890=VisuMZ[_0x503276(0x343)]['Settings'][_0x503276(0x2ac)];if(!_0x452890)return;if(_0x452890['ActionEndUpdate']===![])return;if(!this['_subject'])return;this[_0x503276(0x30a)][_0x503276(0x1dd)]();},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x1dd)]=function(){const _0x24659a=_0x421f4a;for(const _0x1b5a7f of this[_0x24659a(0x2cf)]){const _0xe4705a=$dataStates[_0x1b5a7f];if(!_0xe4705a)continue;if(_0xe4705a[_0x24659a(0x12a)]!==0x1)continue;this[_0x24659a(0x1c3)][_0x1b5a7f]>0x0&&this[_0x24659a(0x1c3)][_0x1b5a7f]--;}this[_0x24659a(0x1d4)](0x1);},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x1ce)]=function(){const _0xea05b0=_0x421f4a,_0xe8a79c=VisuMZ[_0xea05b0(0x343)][_0xea05b0(0x161)][_0xea05b0(0x2ac)];for(const _0x1b3474 of this[_0xea05b0(0x2cf)]){const _0x283976=$dataStates[_0x1b3474];if(_0xe8a79c&&_0xe8a79c['ActionEndUpdate']!==![]){if(_0x283976&&_0x283976[_0xea05b0(0x12a)]===0x1)continue;}if(this['_stateTurns'][_0x1b3474]>0x0){if(_0xea05b0(0x354)!==_0xea05b0(0x1e7))this[_0xea05b0(0x1c3)][_0x1b3474]--;else{function _0x34d5da(){const _0x268acd=_0xea05b0,_0x195466=_0x2d43a0[_0x268acd(0x22d)]('['+_0x540328['$1'][_0x268acd(0x258)](/\d+/g)+']');for(const _0x1ba852 of _0x195466){if(!this['_actor'][_0x268acd(0x248)](_0x1ba852))return![];}return!![];}}}}},VisuMZ['SkillsStatesCore'][_0x421f4a(0x31c)]=Game_Action[_0x421f4a(0x12d)]['applyItemUserEffect'],Game_Action[_0x421f4a(0x12d)]['applyItemUserEffect']=function(_0x5e9028){const _0x4d20c0=_0x421f4a;VisuMZ[_0x4d20c0(0x343)]['Game_Action_applyItemUserEffect'][_0x4d20c0(0x245)](this,_0x5e9028),this[_0x4d20c0(0x1ef)](_0x5e9028);},Game_Action['prototype'][_0x421f4a(0x1ef)]=function(_0x527b13){const _0x4c572d=_0x421f4a;this['applyStateCategoryRemovalEffects'](_0x527b13),this[_0x4c572d(0x9e)](_0x527b13),this[_0x4c572d(0x131)](_0x527b13),this['applyDebuffTurnManipulationEffects'](_0x527b13);},Game_Action[_0x421f4a(0x12d)][_0x421f4a(0x2b5)]=function(_0x3138e8){const _0xd8a88d=_0x421f4a;if(_0x3138e8[_0xd8a88d(0x139)]()[_0xd8a88d(0x249)]<=0x0)return;const _0x5908ad=this[_0xd8a88d(0x333)]()['note'];if(_0x5908ad[_0xd8a88d(0x258)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i)){if('mYiLl'==='qFbTJ'){function _0xf7b462(){const _0x4619d0=_0xd8a88d,_0x19bfb8=_0x308630['_scene'];if(![_0x498879,_0x49104f]['includes'](_0x19bfb8[_0x4619d0(0x1b3)]))return _0x2fc1ae[_0x4619d0(0x32e)]();}}else{const _0x310f69=String(RegExp['$1']);_0x3138e8['removeStatesByCategoryAll'](_0x310f69);}}const _0x541804=_0x5908ad[_0xd8a88d(0x258)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x541804)for(const _0x22de31 of _0x541804){_0x22de31[_0xd8a88d(0x258)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x5b37a2=String(RegExp['$1']),_0x19bacf=Number(RegExp['$2']);_0x3138e8['removeStatesByCategory'](_0x5b37a2,_0x19bacf);}},Game_Action[_0x421f4a(0x12d)][_0x421f4a(0x9e)]=function(_0x278b67){const _0x19246d=_0x421f4a,_0xc513ca=this[_0x19246d(0x333)]()['note'],_0x213633=_0xc513ca[_0x19246d(0x258)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x213633)for(const _0x41703d of _0x213633){if(_0x19246d(0x340)==='Mmxqv'){let _0x2c7fa3=0x0,_0x59caf3=0x0;if(_0x41703d[_0x19246d(0x258)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x2c7fa3=Number(RegExp['$1']),_0x59caf3=Number(RegExp['$2']);else _0x41703d[_0x19246d(0x258)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x2c7fa3=DataManager['getStateIdWithName'](RegExp['$1']),_0x59caf3=Number(RegExp['$2']));_0x278b67['setStateTurns'](_0x2c7fa3,_0x59caf3),this['makeSuccess'](_0x278b67);}else{function _0xb6b55a(){const _0x78129=_0x19246d;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x78129(0x28c)]():_0x2a1b6d[_0x78129(0x343)][_0x78129(0x15b)][_0x78129(0x245)](this);}}}const _0x2cfd45=_0xc513ca[_0x19246d(0x258)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x2cfd45)for(const _0x19877c of _0x2cfd45){if(_0x19246d(0x36d)!=='lnTbX'){function _0x3e9667(){const _0x3f8bf8=_0x19246d,_0x19de96=_0x3cc8c7['parse']('['+_0x152bb1['$1'][_0x3f8bf8(0x258)](/\d+/g)+']');for(const _0x529a53 of _0x19de96){if(!_0xfead1e[_0x3f8bf8(0x168)](_0x529a53))return!![];}return![];}}else{let _0x1e0af0=0x0,_0x2756b7=0x0;if(_0x19877c['match'](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x1e0af0=Number(RegExp['$1']),_0x2756b7=Number(RegExp['$2']);else{if(_0x19877c[_0x19246d(0x258)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)){if('inVlL'!==_0x19246d(0x290)){function _0x403a22(){const _0x2b2d8f=_0x19246d,_0x327510=_0x28a7cc[_0x2b2d8f(0x2c9)],_0x5aa36d=_0x587a38[_0x2b2d8f(0x2c9)];if(_0x327510!==_0x5aa36d)return _0x5aa36d-_0x327510;return _0x2775e2-_0x56d3b9;}}else _0x1e0af0=DataManager[_0x19246d(0x1d7)](RegExp['$1']),_0x2756b7=Number(RegExp['$2']);}}_0x278b67[_0x19246d(0x2ed)](_0x1e0af0,_0x2756b7),this[_0x19246d(0x223)](_0x278b67);}}},Game_Action[_0x421f4a(0x12d)][_0x421f4a(0x131)]=function(_0x5cc234){const _0x5810b8=_0x421f4a,_0x202f9e=[_0x5810b8(0x20b),_0x5810b8(0x19d),'ATK',_0x5810b8(0xfa),'MAT',_0x5810b8(0x363),_0x5810b8(0x2af),_0x5810b8(0x26b)],_0x40d213=this[_0x5810b8(0x333)]()[_0x5810b8(0x357)],_0x2c5b74=_0x40d213['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x2c5b74)for(const _0x14f96d of _0x2c5b74){if(_0x5810b8(0x241)==='lgUuF'){_0x14f96d[_0x5810b8(0x258)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x4b2a19=_0x202f9e[_0x5810b8(0x23f)](String(RegExp['$1'])['toUpperCase']()),_0x4b0149=Number(RegExp['$2']);_0x4b2a19>=0x0&&(_0x5cc234[_0x5810b8(0x2d9)](_0x4b2a19,_0x4b0149),this[_0x5810b8(0x223)](_0x5cc234));}else{function _0x516080(){const _0x634a28=_0x5810b8;this[_0x634a28(0x35f)]&&this[_0x634a28(0x35f)][_0x634a28(0x1b3)]===_0x1e267e&&this[_0x634a28(0x35f)]['setItem'](this[_0x634a28(0x11c)](0x0));}}}const _0x4cc066=_0x40d213[_0x5810b8(0x258)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x4cc066){if(_0x5810b8(0xb2)==='SDhcm')for(const _0x5a1265 of _0x2c5b74){_0x5a1265['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x3a2047=_0x202f9e['indexOf'](String(RegExp['$1'])[_0x5810b8(0xbe)]()),_0x2eb39c=Number(RegExp['$2']);_0x3a2047>=0x0&&(_0x5cc234[_0x5810b8(0x201)](_0x3a2047,_0x2eb39c),this[_0x5810b8(0x223)](_0x5cc234));}else{function _0x3f6d48(){const _0x2c2cc8=_0x5810b8,_0x2c5bf4=_0x252e72[_0x2c2cc8(0x22d)]('['+_0x3504c5['$1'][_0x2c2cc8(0x258)](/\d+/g)+']');for(const _0x1624d7 of _0x2c5bf4){if(!_0x3fb599[_0x2c2cc8(0x168)](_0x1624d7))return![];}return!![];}}}},Game_Action[_0x421f4a(0x12d)][_0x421f4a(0x276)]=function(_0x1d9435){const _0x4c54ee=_0x421f4a,_0x1eef61=[_0x4c54ee(0x20b),'MAXMP',_0x4c54ee(0x180),_0x4c54ee(0xfa),_0x4c54ee(0xd9),_0x4c54ee(0x363),'AGI',_0x4c54ee(0x26b)],_0x1aa8e9=this[_0x4c54ee(0x333)]()['note'],_0x35a277=_0x1aa8e9['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x35a277){if('IKFka'!==_0x4c54ee(0x257))for(const _0x28f2d7 of _0x35a277){if('ZftpN'!==_0x4c54ee(0x2da)){_0x28f2d7[_0x4c54ee(0x258)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x3d210f=_0x1eef61[_0x4c54ee(0x23f)](String(RegExp['$1'])[_0x4c54ee(0xbe)]()),_0x46f41e=Number(RegExp['$2']);if(_0x3d210f>=0x0){if(_0x4c54ee(0x34f)!==_0x4c54ee(0xdb))_0x1d9435[_0x4c54ee(0x199)](_0x3d210f,_0x46f41e),this[_0x4c54ee(0x223)](_0x1d9435);else{function _0x204d84(){return _0x4836a2(_0x115d67['$1']);}}}}else{function _0xc91f80(){const _0x22797d=_0x4c54ee,_0x269d37=this[_0x22797d(0xe6)]();this[_0x22797d(0x2b4)](),this[_0x22797d(0x1f4)](_0x6e1dde,_0x349289,_0x4dafc8,_0xeb5ec2,!![]),this['resetTextColor'](),this[_0x22797d(0xf7)][_0x22797d(0x29f)]-=0x8;const _0x306804=this[_0x22797d(0xda)][_0x22797d(0x1b0)](_0x4c9147,!![]);this[_0x22797d(0xf7)]['drawText'](_0x306804,_0x56a015,_0x18b5b8,_0x5e9721,_0x269d37,_0x22797d(0x1cb));}}}else{function _0x216435(){const _0x469340=_0x4c54ee;this[_0x469340(0x186)]=this[_0x469340(0x186)]||{},_0x20ae75[_0x469340(0x12d)]['clearStates'][_0x469340(0x245)](this);}}}const _0x700bd5=_0x1aa8e9[_0x4c54ee(0x258)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x700bd5)for(const _0x1ba13d of _0x35a277){if('LOGGo'!==_0x4c54ee(0x13a)){_0x1ba13d['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x3c99a1=_0x1eef61[_0x4c54ee(0x23f)](String(RegExp['$1'])[_0x4c54ee(0xbe)]()),_0x467967=Number(RegExp['$2']);if(_0x3c99a1>=0x0){if(_0x4c54ee(0xf5)!==_0x4c54ee(0xf5)){function _0xb200eb(){const _0x4c8253=_0x4c54ee,_0x5ce29d=_0x124dcf[_0x4c8253(0x343)]['Settings'][_0x4c8253(0x21e)][_0x4c8253(0x195)](_0x13eac5=>_0x13eac5[_0x4c8253(0x269)][_0x4c8253(0xbe)]()===_0x13b09c[_0x4c8253(0xbe)]());_0x5ce29d['length']>=0x1?this[_0x4c8253(0xc9)]=_0x5ce29d[0x0]:this[_0x4c8253(0xc9)]=null;}}else _0x1d9435['addDebuffTurns'](_0x3c99a1,_0x467967),this[_0x4c54ee(0x223)](_0x1d9435);}}else{function _0x2e8029(){const _0x2e39a2=_0x4c54ee;if(typeof _0x3cfa44===_0x2e39a2(0x1a0))_0x26906a=_0x2057cb[_0x1610b5];const _0x494826=_0x2e39a2(0x18a)[_0x2e39a2(0x25e)](_0x16433c['id']);this['_colorCache']=this[_0x2e39a2(0x17f)]||{};if(this[_0x2e39a2(0x17f)][_0x494826])return this['_colorCache'][_0x494826];const _0x188f68=this['retrieveStateColor'](_0x38fda6);return this[_0x2e39a2(0x13c)](_0x494826,_0x188f68);}}}},VisuMZ['SkillsStatesCore'][_0x421f4a(0x298)]=Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x23d)],Game_BattlerBase['prototype'][_0x421f4a(0x23d)]=function(){const _0x4645d9=_0x421f4a;this['_cache']={},this['initMembersSkillsStatesCore'](),VisuMZ['SkillsStatesCore'][_0x4645d9(0x298)][_0x4645d9(0x245)](this);},Game_BattlerBase['prototype'][_0x421f4a(0x36f)]=function(){const _0x3d1c1d=_0x421f4a;this[_0x3d1c1d(0x2e3)]='',this[_0x3d1c1d(0xf1)]={},this[_0x3d1c1d(0x262)]={},this['_stateOrigin']={};},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x140)]=function(_0x52cd14){const _0x21e7f8=_0x421f4a;return this[_0x21e7f8(0x34b)]=this[_0x21e7f8(0x34b)]||{},this[_0x21e7f8(0x34b)][_0x52cd14]!==undefined;},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0xa7)]=Game_BattlerBase[_0x421f4a(0x12d)]['refresh'],Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x26f)]=function(){const _0x481f51=_0x421f4a;this[_0x481f51(0x34b)]={},VisuMZ[_0x481f51(0x343)][_0x481f51(0xa7)][_0x481f51(0x245)](this);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_eraseState']=Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0xd4)],Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0xd4)]=function(_0x2e9a4e){const _0x48f541=_0x421f4a;let _0x1310e8=this['isStateAffected'](_0x2e9a4e);VisuMZ[_0x48f541(0x343)][_0x48f541(0x31d)]['call'](this,_0x2e9a4e);if(_0x1310e8&&!this['isStateAffected'](_0x2e9a4e))this[_0x48f541(0x2c6)](_0x2e9a4e);},Game_BattlerBase[_0x421f4a(0x12d)]['onRemoveState']=function(_0x43dcf4){const _0x175dfa=_0x421f4a;this[_0x175dfa(0x21f)](_0x43dcf4),this['clearStateDisplay'](_0x43dcf4),this[_0x175dfa(0xd0)](_0x43dcf4);},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x335)]=Game_BattlerBase[_0x421f4a(0x12d)]['resetStateCounts'],Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x293)]=function(_0x4235c7){const _0x9a14a9=_0x421f4a,_0x5b7bf6=$dataStates[_0x4235c7],_0x408390=this[_0x9a14a9(0x2f4)](_0x4235c7),_0x7381b6=this[_0x9a14a9(0x244)](_0x5b7bf6)[_0x9a14a9(0x29b)]()['trim']();switch(_0x7381b6){case _0x9a14a9(0xaa):if(_0x408390<=0x0)VisuMZ[_0x9a14a9(0x343)][_0x9a14a9(0x335)][_0x9a14a9(0x245)](this,_0x4235c7);break;case _0x9a14a9(0x15c):VisuMZ[_0x9a14a9(0x343)][_0x9a14a9(0x335)]['call'](this,_0x4235c7);break;case _0x9a14a9(0x2eb):VisuMZ[_0x9a14a9(0x343)][_0x9a14a9(0x335)][_0x9a14a9(0x245)](this,_0x4235c7),this[_0x9a14a9(0x1c3)][_0x4235c7]=Math['max'](this[_0x9a14a9(0x1c3)][_0x4235c7],_0x408390);break;case _0x9a14a9(0x313):VisuMZ[_0x9a14a9(0x343)][_0x9a14a9(0x335)][_0x9a14a9(0x245)](this,_0x4235c7),this[_0x9a14a9(0x1c3)][_0x4235c7]+=_0x408390;break;default:VisuMZ[_0x9a14a9(0x343)][_0x9a14a9(0x335)]['call'](this,_0x4235c7);break;}},Game_BattlerBase['prototype'][_0x421f4a(0x244)]=function(_0x4ded3a){const _0xf4e1b4=_0x421f4a,_0x176355=_0x4ded3a[_0xf4e1b4(0x357)];return _0x176355[_0xf4e1b4(0x258)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0xf4e1b4(0x343)][_0xf4e1b4(0x161)]['States'][_0xf4e1b4(0x185)];},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x1db)]=Game_BattlerBase['prototype'][_0x421f4a(0x2f1)],Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x2f1)]=function(_0x5626df,_0x41c4b8){const _0x2e96cd=_0x421f4a,_0xecc453=VisuMZ['SkillsStatesCore']['Settings']['Buffs']['ReapplyRules'],_0x1b1d4a=this['buffTurns'](_0x5626df);switch(_0xecc453){case _0x2e96cd(0xaa):if(_0x1b1d4a<=0x0)this['_buffTurns'][_0x5626df]=_0x41c4b8;break;case _0x2e96cd(0x15c):this[_0x2e96cd(0x1fb)][_0x5626df]=_0x41c4b8;break;case _0x2e96cd(0x2eb):this[_0x2e96cd(0x1fb)][_0x5626df]=Math['max'](_0x1b1d4a,_0x41c4b8);break;case'add':this[_0x2e96cd(0x1fb)][_0x5626df]+=_0x41c4b8;break;default:VisuMZ[_0x2e96cd(0x343)]['Game_BattlerBase_overwriteBuffTurns'][_0x2e96cd(0x245)](this,_0x5626df,_0x41c4b8);break;}const _0x29c1e7=VisuMZ[_0x2e96cd(0x343)]['Settings']['Buffs'][_0x2e96cd(0x230)];this[_0x2e96cd(0x1fb)][_0x5626df]=this[_0x2e96cd(0x1fb)][_0x5626df][_0x2e96cd(0x325)](0x0,_0x29c1e7);},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x368)]=function(){const _0x5ae7a1=_0x421f4a;if(this['_cache'][_0x5ae7a1(0x14c)]!==undefined)return this[_0x5ae7a1(0x34b)]['groupDefeat'];this[_0x5ae7a1(0x34b)][_0x5ae7a1(0x14c)]=![];const _0x26c1af=this[_0x5ae7a1(0x139)]();for(const _0x3aa54f of _0x26c1af){if(!_0x3aa54f)continue;if(_0x3aa54f['note'][_0x5ae7a1(0x258)](/<GROUP DEFEAT>/i)){this[_0x5ae7a1(0x34b)][_0x5ae7a1(0x14c)]=!![];break;}}return this[_0x5ae7a1(0x34b)][_0x5ae7a1(0x14c)];},VisuMZ['SkillsStatesCore']['Game_BattlerBase_clearStates']=Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x103)],Game_BattlerBase['prototype'][_0x421f4a(0x103)]=function(){const _0x69b0d0=_0x421f4a;if(this[_0x69b0d0(0x355)]()!=='')this[_0x69b0d0(0x253)]();else{if('iKXAJ'!==_0x69b0d0(0x27e))VisuMZ[_0x69b0d0(0x343)][_0x69b0d0(0x202)][_0x69b0d0(0x245)](this),this[_0x69b0d0(0x36f)]();else{function _0x735f48(){const _0xf17427=_0x69b0d0,_0x120e95=this[_0xf17427(0x246)](),_0x5d4db2=this[_0xf17427(0x2db)](0x3,!![]),_0x4efc35=this['isRightInputMode']()?_0x30dcf7[_0xf17427(0xf2)]-_0x120e95:0x0,_0x38cc4e=this[_0xf17427(0xca)]();return new _0x1fc0a4(_0x4efc35,_0x38cc4e,_0x120e95,_0x5d4db2);}}}},Game_Actor[_0x421f4a(0x12d)][_0x421f4a(0x103)]=function(){const _0x3a7990=_0x421f4a;this[_0x3a7990(0x186)]=this[_0x3a7990(0x186)]||{},Game_Battler[_0x3a7990(0x12d)][_0x3a7990(0x103)][_0x3a7990(0x245)](this);},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x253)]=function(){const _0x4e45ce=_0x421f4a,_0x2b183a=this[_0x4e45ce(0x139)]();for(const _0x33b147 of _0x2b183a){if(_0x4e45ce(0x2e9)===_0x4e45ce(0x2e9)){if(_0x33b147&&this[_0x4e45ce(0x2c5)](_0x33b147))this['eraseState'](_0x33b147['id']);}else{function _0x23448d(){return this;}}}this[_0x4e45ce(0x34b)]={};},Game_BattlerBase[_0x421f4a(0x12d)]['canClearState']=function(_0x2326b4){const _0x528b6c=_0x421f4a,_0x329894=this[_0x528b6c(0x355)]();if(_0x329894!==''){const _0x172ad0=_0x2326b4[_0x528b6c(0x357)];if(_0x329894===_0x528b6c(0x365)&&_0x172ad0[_0x528b6c(0x258)](/<NO DEATH CLEAR>/i))return![];if(_0x329894===_0x528b6c(0x1d8)&&_0x172ad0[_0x528b6c(0x258)](/<NO RECOVER ALL CLEAR>/i))return![];}return this['isStateAffected'](_0x2326b4['id']);},Game_BattlerBase['prototype'][_0x421f4a(0x355)]=function(){const _0xa09e97=_0x421f4a;return this[_0xa09e97(0x2e3)];},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x1f6)]=function(_0x1cde60){const _0x30ae0a=_0x421f4a;this[_0x30ae0a(0x2e3)]=_0x1cde60;},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x1f1)]=function(){const _0x5f1c19=_0x421f4a;this[_0x5f1c19(0x2e3)]='';},VisuMZ[_0x421f4a(0x343)]['Game_BattlerBase_die']=Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0xab)],Game_BattlerBase['prototype'][_0x421f4a(0xab)]=function(){const _0x25c044=_0x421f4a;this['setStateRetainType'](_0x25c044(0x365)),VisuMZ[_0x25c044(0x343)]['Game_BattlerBase_die'][_0x25c044(0x245)](this),this[_0x25c044(0x1f1)]();},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x1c6)]=Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x2e2)],Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x2e2)]=function(){const _0x5e5c29=_0x421f4a;this[_0x5e5c29(0x1f6)](_0x5e5c29(0x1d8)),VisuMZ[_0x5e5c29(0x343)][_0x5e5c29(0x1c6)][_0x5e5c29(0x245)](this),this[_0x5e5c29(0x1f1)]();},Game_BattlerBase['prototype'][_0x421f4a(0x2f3)]=function(_0x2898c1){const _0x533639=_0x421f4a;for(settings of VisuMZ['SkillsStatesCore'][_0x533639(0x161)][_0x533639(0x21e)]){const _0x36c171=settings['CalcJS'][_0x533639(0x245)](this,_0x2898c1);if(!settings[_0x533639(0x1ec)][_0x533639(0x245)](this,_0x2898c1,_0x36c171))return![];}return!![];},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x281)]=function(_0x3a191d){const _0x826f0d=_0x421f4a;for(settings of VisuMZ[_0x826f0d(0x343)][_0x826f0d(0x161)][_0x826f0d(0x21e)]){const _0x55813c=settings[_0x826f0d(0x2cd)][_0x826f0d(0x245)](this,_0x3a191d);settings['PayJS'][_0x826f0d(0x245)](this,_0x3a191d,_0x55813c);}},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x37f)]=Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x359)],Game_BattlerBase['prototype'][_0x421f4a(0x359)]=function(_0x55581f){const _0x20f320=_0x421f4a;if(!_0x55581f)return![];if(!VisuMZ['SkillsStatesCore'][_0x20f320(0x37f)][_0x20f320(0x245)](this,_0x55581f))return![];if(!this[_0x20f320(0x1e3)](_0x55581f))return![];if(!this[_0x20f320(0x146)](_0x55581f))return![];if(!this[_0x20f320(0x284)](_0x55581f))return![];return!![];},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x1e3)]=function(_0x5b4e6b){if(!this['checkSkillConditionsSwitchNotetags'](_0x5b4e6b))return![];return!![];},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x188)]=function(_0x530634){const _0x581c34=_0x421f4a,_0x1b24b8=_0x530634['note'];if(_0x1b24b8['match'](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4b9514=JSON[_0x581c34(0x22d)]('['+RegExp['$1'][_0x581c34(0x258)](/\d+/g)+']');for(const _0x3f0f33 of _0x4b9514){if('MiROT'!==_0x581c34(0xcc)){function _0x390814(){const _0xab1d61=_0x581c34;return _0x5a8100[_0xab1d61(0x343)][_0xab1d61(0x27f)][_0xab1d61(0x245)](this);}}else{if(!$gameSwitches[_0x581c34(0x168)](_0x3f0f33))return![];}}return!![];}if(_0x1b24b8['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x193a8b=JSON['parse']('['+RegExp['$1'][_0x581c34(0x258)](/\d+/g)+']');for(const _0x1308a6 of _0x193a8b){if(!$gameSwitches[_0x581c34(0x168)](_0x1308a6))return![];}return!![];}if(_0x1b24b8[_0x581c34(0x258)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('YHKqS'!=='YHKqS'){function _0x2d04d7(){const _0xc84244=_0x581c34;this['_stateOrigin']=this[_0xc84244(0x2bb)]||{},delete this['_stateOrigin'][_0x421e59];}}else{const _0x2606b2=JSON['parse']('['+RegExp['$1'][_0x581c34(0x258)](/\d+/g)+']');for(const _0x7ed7b4 of _0x2606b2){if(_0x581c34(0x377)===_0x581c34(0x377)){if($gameSwitches['value'](_0x7ed7b4))return!![];}else{function _0x3a0db1(){const _0x1debfb=_0x581c34;if(!_0x498a4e)return _0x2e5b35[_0x1debfb(0x343)]['Window_SkillList_includes'][_0x1debfb(0x245)](this,_0x39c51c);if(!this['checkSkillTypeMatch'](_0x1b1052))return![];if(!this['checkShowHideNotetags'](_0x10eac2))return![];if(!this[_0x1debfb(0x1ff)](_0x5621f0))return![];return!![];}}}return![];}}if(_0x1b24b8['match'](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('bhyjB'===_0x581c34(0x274)){function _0x39420c(){const _0x398fb6=_0x581c34,_0x4dd1e1=this[_0x398fb6(0xc6)](_0x1641b9);if(_0x4dd1e1[_0x398fb6(0x258)](/\\I\[(\d+)\]/i)){const _0xc5ff8b=this[_0x398fb6(0x2a4)](_0x7db275),_0x14be91=this[_0x398fb6(0x17a)](_0x4dd1e1)[_0x398fb6(0x2e5)];return _0x14be91<=_0xc5ff8b[_0x398fb6(0x2e5)]?_0x398fb6(0x323):_0x398fb6(0x37e);}}}else{const _0x65f980=JSON[_0x581c34(0x22d)]('['+RegExp['$1'][_0x581c34(0x258)](/\d+/g)+']');for(const _0x4f7efb of _0x65f980){if(!$gameSwitches['value'](_0x4f7efb))return!![];}return![];}}if(_0x1b24b8[_0x581c34(0x258)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x581c34(0x301)!==_0x581c34(0x2ea)){const _0x22fa6f=JSON[_0x581c34(0x22d)]('['+RegExp['$1'][_0x581c34(0x258)](/\d+/g)+']');for(const _0x55e4cb of _0x22fa6f){if(_0x581c34(0x25d)!==_0x581c34(0x25d)){function _0x5ba2b2(){const _0x3b7316=_0x581c34;_0x567354=_0x24bb24[_0x3b7316(0x1d7)](_0x5785d6['$1']),_0x48322d=_0x5881e4(_0x464221['$2']);}}else{if(!$gameSwitches[_0x581c34(0x168)](_0x55e4cb))return!![];}}return![];}else{function _0x1a8a58(){const _0x224b8a=_0x581c34;if(typeof _0x113ad4!==_0x224b8a(0x1a0))_0x1be821=_0x1d1a07['id'];this[_0x224b8a(0x262)]=this[_0x224b8a(0x262)]||{},this[_0x224b8a(0x262)][_0x33a244]=_0x480d14;}}}if(_0x1b24b8[_0x581c34(0x258)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x19b916=JSON[_0x581c34(0x22d)]('['+RegExp['$1'][_0x581c34(0x258)](/\d+/g)+']');for(const _0x1b34e3 of _0x19b916){if($gameSwitches[_0x581c34(0x168)](_0x1b34e3))return![];}return!![];}return!![];},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x146)]=function(_0x1dee1f){const _0x39fb3f=_0x421f4a,_0x32da4e=_0x1dee1f[_0x39fb3f(0x357)],_0x1be618=VisuMZ['SkillsStatesCore'][_0x39fb3f(0x197)];return _0x1be618[_0x1dee1f['id']]?_0x1be618[_0x1dee1f['id']]['call'](this,_0x1dee1f):!![];},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x284)]=function(_0xdcc4d1){const _0x2760e3=_0x421f4a;return VisuMZ[_0x2760e3(0x343)][_0x2760e3(0x161)]['Skills'][_0x2760e3(0x208)][_0x2760e3(0x245)](this,_0xdcc4d1);},VisuMZ['SkillsStatesCore'][_0x421f4a(0x2bd)]=Game_BattlerBase[_0x421f4a(0x12d)]['skillMpCost'],Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x138)]=function(_0x36ae4c){const _0x5d3d2e=_0x421f4a;for(settings of VisuMZ[_0x5d3d2e(0x343)][_0x5d3d2e(0x161)][_0x5d3d2e(0x21e)]){if(_0x5d3d2e(0x2dc)==='deRag'){function _0x4205b6(){const _0x3352f7=_0x5d3d2e;_0x13407f['categories'][_0x3352f7(0x1e2)](_0x288d82[_0x3352f7(0xbe)]()[_0x3352f7(0x210)]());}}else{if(settings[_0x5d3d2e(0x269)][_0x5d3d2e(0xbe)]()==='MP')return settings[_0x5d3d2e(0x2cd)][_0x5d3d2e(0x245)](this,_0x36ae4c);}}return VisuMZ[_0x5d3d2e(0x343)][_0x5d3d2e(0x2bd)][_0x5d3d2e(0x245)](this,_0x36ae4c);},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0xe4)]=Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0xae)],Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0xae)]=function(_0x530926){const _0x43f58a=_0x421f4a;for(settings of VisuMZ['SkillsStatesCore'][_0x43f58a(0x161)][_0x43f58a(0x21e)]){if('FTIrW'===_0x43f58a(0x386)){if(settings['Name'][_0x43f58a(0xbe)]()==='TP'){if(_0x43f58a(0xfb)===_0x43f58a(0x268)){function _0x10e4d0(){const _0x3f7f8=_0x43f58a;return this[_0x3f7f8(0x259)](_0x4f14ae);}}else return settings['CalcJS'][_0x43f58a(0x245)](this,_0x530926);}}else{function _0x3e1484(){const _0x5d8207=_0x43f58a,_0x137aee=this[_0x5d8207(0x30e)][_0x49f616];_0x49e5d6['SkillsStatesCore']['Game_BattlerBase_eraseBuff'][_0x5d8207(0x245)](this,_0x154150);if(_0x137aee>0x0)this[_0x5d8207(0x304)](_0x3b7636);if(_0x137aee<0x0)this[_0x5d8207(0x15d)](_0x5517c3);}}}return VisuMZ[_0x43f58a(0x343)][_0x43f58a(0xe4)]['call'](this,_0x530926);},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x288)]=function(_0x19f756){const _0x3ffa69=_0x421f4a;if(typeof _0x19f756==='number')_0x19f756=$dataStates[_0x19f756];return this[_0x3ffa69(0x139)]()[_0x3ffa69(0x1f2)](_0x19f756);},VisuMZ[_0x421f4a(0x343)]['Game_BattlerBase_states']=Game_BattlerBase[_0x421f4a(0x12d)]['states'],Game_BattlerBase[_0x421f4a(0x12d)]['states']=function(){const _0xd4a801=_0x421f4a;let _0x7b80c5=VisuMZ['SkillsStatesCore']['Game_BattlerBase_states'][_0xd4a801(0x245)](this);if(this[_0xd4a801(0x11b)])return _0x7b80c5;return this[_0xd4a801(0x11b)]=!![],this[_0xd4a801(0x2de)](_0x7b80c5),this[_0xd4a801(0x11b)]=undefined,_0x7b80c5;},Game_BattlerBase['prototype'][_0x421f4a(0x2de)]=function(_0x474e3a){const _0xc9dc4c=_0x421f4a,_0x4e920c=this['passiveStates']();for(state of _0x4e920c){if(!state)continue;if(!this[_0xc9dc4c(0x16b)](state)&&_0x474e3a[_0xc9dc4c(0x1f2)](state))continue;_0x474e3a[_0xc9dc4c(0x1e2)](state);}_0x4e920c[_0xc9dc4c(0x249)]>0x0&&_0x474e3a[_0xc9dc4c(0x2a7)]((_0x2b83c7,_0x1600d9)=>{const _0x83f1f3=_0xc9dc4c;if('kmfKe'!=='kmfKe'){function _0x200fc0(){const _0x30e1e2=_0x2368;this['setupSkillsStatesCore'](_0x5df011,_0x45c111),_0x465650=_0x2c530d[_0x30e1e2(0x29b)](),_0x2df864[_0x30e1e2(0x343)][_0x30e1e2(0x121)]['call'](this,_0x45d8cb,_0x22b074);}}else{const _0x3eb1a6=_0x2b83c7[_0x83f1f3(0x2c9)],_0x4a2810=_0x1600d9[_0x83f1f3(0x2c9)];if(_0x3eb1a6!==_0x4a2810)return _0x4a2810-_0x3eb1a6;return _0x2b83c7-_0x1600d9;}});},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x16b)]=function(_0x3f872c){const _0x305a35=_0x421f4a;return _0x3f872c[_0x305a35(0x357)][_0x305a35(0x258)](/<PASSIVE STACKABLE>/i);},Game_BattlerBase[_0x421f4a(0x12d)]['convertPassiveStates']=function(){const _0xd505f=_0x421f4a,_0x4e492c=[];for(const _0x5027fc of this[_0xd505f(0x34b)][_0xd505f(0xeb)]){if(_0xd505f(0x1ba)==='isDBB'){const _0x3c2f12=$dataStates[_0x5027fc];if(!_0x3c2f12)continue;if(!this['meetsPassiveStateConditions'](_0x3c2f12))continue;_0x4e492c[_0xd505f(0x1e2)](_0x3c2f12);}else{function _0x45669b(){const _0x500711=_0xd505f;for(const _0x204a0a of this['states']()){this[_0x500711(0x2ff)](_0x204a0a['id'])&&_0x204a0a[_0x500711(0x12a)]===_0x36af02&&(this[_0x500711(0x364)](_0x204a0a['id']),this[_0x500711(0xd2)](_0x204a0a['id']),this[_0x500711(0x2c1)](_0x204a0a['id']));}}}}return _0x4e492c;},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x317)]=function(_0x3c2424){const _0x5175e6=_0x421f4a;if(!this[_0x5175e6(0x145)](_0x3c2424))return![];if(!this['meetsPassiveStateConditionSwitches'](_0x3c2424))return![];if(!this['meetsPassiveStateConditionJS'](_0x3c2424))return![];if(!this[_0x5175e6(0x211)](_0x3c2424))return![];return!![];},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x145)]=function(_0x3cb417){return!![];},Game_Actor[_0x421f4a(0x12d)][_0x421f4a(0x145)]=function(_0x4c27f4){const _0x792ae=_0x421f4a,_0x46a7e3=_0x4c27f4[_0x792ae(0x357)];if(_0x46a7e3['match'](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){if(_0x792ae(0x2d7)===_0x792ae(0x173)){function _0x50cd93(){const _0xa708e4=_0x792ae;if(typeof _0x41d2e5!==_0xa708e4(0x1a0))_0x4fc4d3=_0x2e609c['id'];return this['_stateDisplay']=this[_0xa708e4(0x262)]||{},this[_0xa708e4(0x262)][_0x3c65dc]===_0x3cd327&&(this['_stateDisplay'][_0x3b3ce4]=''),this['_stateDisplay'][_0x2bd545];}}else{const _0x188b30=String(RegExp['$1'])['split'](',')['map'](_0x3db366=>_0x3db366['trim']()),_0x11c688=VisuMZ[_0x792ae(0x343)]['ParseClassIDs'](_0x188b30);return _0x11c688['includes'](this[_0x792ae(0x10e)]());}}if(_0x46a7e3[_0x792ae(0x258)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0xaf0aba=String(RegExp['$1'])[_0x792ae(0x14a)](',')['map'](_0x4c2d0f=>_0x4c2d0f[_0x792ae(0x210)]()),_0x13fc6f=VisuMZ[_0x792ae(0x343)][_0x792ae(0x24f)](_0xaf0aba);let _0x527ad1=[this[_0x792ae(0x10e)]()];if(Imported[_0x792ae(0x1d2)]&&this[_0x792ae(0x17b)]){if(_0x792ae(0x2a6)===_0x792ae(0x160)){function _0x425b64(){const _0x306a7d=_0x792ae,_0x3431e6=this[_0x306a7d(0x2a4)](_0x3e8f82),_0x1813fe=this[_0x306a7d(0xc6)](_0xa1cfbf),_0x449588=this[_0x306a7d(0x17a)](_0x1813fe)[_0x306a7d(0x2e5)];this[_0x306a7d(0x122)](this[_0x306a7d(0x338)](_0x5f5207));const _0x46029f=this[_0x306a7d(0x2fa)]();if(_0x46029f===_0x306a7d(0x1cb))this['drawTextEx'](_0x1813fe,_0x3431e6['x']+_0x3431e6[_0x306a7d(0x2e5)]-_0x449588,_0x3431e6['y'],_0x449588);else{if(_0x46029f===_0x306a7d(0x124)){const _0x50387b=_0x3431e6['x']+_0x352251[_0x306a7d(0x239)]((_0x3431e6['width']-_0x449588)/0x2);this[_0x306a7d(0x2a8)](_0x1813fe,_0x50387b,_0x3431e6['y'],_0x449588);}else this[_0x306a7d(0x2a8)](_0x1813fe,_0x3431e6['x'],_0x3431e6['y'],_0x449588);}}}else _0x527ad1=this['multiclasses']();}return _0x13fc6f[_0x792ae(0x195)](_0x179fce=>_0x527ad1[_0x792ae(0x1f2)](_0x179fce))[_0x792ae(0x249)]>0x0;}return Game_BattlerBase[_0x792ae(0x12d)][_0x792ae(0x145)][_0x792ae(0x245)](this,_0x4c27f4);},VisuMZ['SkillsStatesCore'][_0x421f4a(0x24f)]=function(_0x107db7){const _0x580aae=_0x421f4a,_0x1866c4=[];for(let _0x18d36a of _0x107db7){if(_0x580aae(0x327)!==_0x580aae(0x200)){_0x18d36a=(String(_0x18d36a)||'')[_0x580aae(0x210)]();const _0xfa74d9=/^\d+$/[_0x580aae(0x134)](_0x18d36a);if(_0xfa74d9){if(_0x580aae(0x15e)===_0x580aae(0x15e))_0x1866c4[_0x580aae(0x1e2)](Number(_0x18d36a));else{function _0x448adf(){const _0x217f25=_0x580aae;if(typeof _0x372b81===_0x217f25(0x1a0))_0x3776ed=_0x37cb84[_0x1bb89c];return this[_0x217f25(0x139)]()['includes'](_0x3be397);}}}else _0x1866c4[_0x580aae(0x1e2)](DataManager[_0x580aae(0x1a1)](_0x18d36a));}else{function _0x124581(){const _0x4204c2=_0x580aae;let _0x54fd9c=_0xda3378['SkillsStatesCore'][_0x4204c2(0x1df)]['call'](this);if(this[_0x4204c2(0x11b)])return _0x54fd9c;return this['_checkingPassiveStates']=!![],this[_0x4204c2(0x2de)](_0x54fd9c),this['_checkingPassiveStates']=_0x2fdf41,_0x54fd9c;}}}return _0x1866c4[_0x580aae(0x2fb)](_0x48912e=>$dataClasses[Number(_0x48912e)])[_0x580aae(0x339)](null);},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x2bc)]=function(_0x215d49){const _0x2d6ba0=_0x421f4a,_0xd53b5f=_0x215d49[_0x2d6ba0(0x357)];if(_0xd53b5f[_0x2d6ba0(0x258)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2d6ba0(0x279)!==_0x2d6ba0(0x279)){function _0x4ccf86(){const _0xf473b5=_0x2d6ba0;_0x3db616[_0xf473b5(0x343)]['ParseSkillNotetags'][_0xf473b5(0x245)](this,_0x2245bf),_0x48b5f6[_0xf473b5(0x343)][_0xf473b5(0xfd)](_0x4bba8d),_0xab8b5b[_0xf473b5(0x343)][_0xf473b5(0x196)](_0x55af39);}}else{const _0x319d9e=JSON['parse']('['+RegExp['$1'][_0x2d6ba0(0x258)](/\d+/g)+']');for(const _0xa730a9 of _0x319d9e){if(_0x2d6ba0(0x158)===_0x2d6ba0(0x125)){function _0x260439(){const _0x1595fe=_0x2d6ba0,_0x25ab33=this['commandStyleCheck'](_0x2152d0);if(_0x25ab33==='iconText')this[_0x1595fe(0xe2)](_0x100d29);else _0x25ab33===_0x1595fe(0x37e)?this[_0x1595fe(0x176)](_0x4782cd):_0x341355['prototype'][_0x1595fe(0x147)]['call'](this,_0x4ef3a6);}}else{if(!$gameSwitches[_0x2d6ba0(0x168)](_0xa730a9))return![];}}return!![];}}if(_0xd53b5f[_0x2d6ba0(0x258)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x538015=JSON['parse']('['+RegExp['$1'][_0x2d6ba0(0x258)](/\d+/g)+']');for(const _0x2299ad of _0x538015){if('hNhMA'!==_0x2d6ba0(0x310)){function _0x490ce9(){if(!_0x2d6a4b['value'](_0xd6f962))return!![];}}else{if(!$gameSwitches[_0x2d6ba0(0x168)](_0x2299ad))return![];}}return!![];}if(_0xd53b5f[_0x2d6ba0(0x258)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xdd572e=JSON[_0x2d6ba0(0x22d)]('['+RegExp['$1'][_0x2d6ba0(0x258)](/\d+/g)+']');for(const _0x207f6b of _0xdd572e){if($gameSwitches[_0x2d6ba0(0x168)](_0x207f6b))return!![];}return![];}if(_0xd53b5f[_0x2d6ba0(0x258)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x393531=JSON[_0x2d6ba0(0x22d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x18685d of _0x393531){if(!$gameSwitches[_0x2d6ba0(0x168)](_0x18685d))return!![];}return![];}if(_0xd53b5f['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2d6ba0(0x25f)!==_0x2d6ba0(0x25f)){function _0x318194(){const _0x56a9cc=_0x2d6ba0;this['_stateOrigin']=this[_0x56a9cc(0x2bb)]||{};const _0xbeed92=_0x45d220?this[_0x56a9cc(0x2b9)](_0x4789bb):this[_0x56a9cc(0x277)]();this[_0x56a9cc(0x2bb)][_0x412425]=_0xbeed92;}}else{const _0x1b1eb2=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3cb848 of _0x1b1eb2){if(_0x2d6ba0(0xd6)!==_0x2d6ba0(0xd6)){function _0x169438(){const _0x31908b=_0x2d6ba0;return this[_0x31908b(0x15f)]()?this[_0x31908b(0x361)]():_0x4a5f92[_0x31908b(0x343)]['Scene_Skill_statusWindowRect'][_0x31908b(0x245)](this);}}else{if(!$gameSwitches[_0x2d6ba0(0x168)](_0x3cb848))return!![];}}return![];}}if(_0xd53b5f[_0x2d6ba0(0x258)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5ba071=JSON[_0x2d6ba0(0x22d)]('['+RegExp['$1'][_0x2d6ba0(0x258)](/\d+/g)+']');for(const _0x43d2a0 of _0x5ba071){if($gameSwitches[_0x2d6ba0(0x168)](_0x43d2a0))return![];}return!![];}return!![];},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x348)]=function(_0x10d337){const _0x39db6d=_0x421f4a,_0x59b6f8=VisuMZ[_0x39db6d(0x343)][_0x39db6d(0x205)];if(_0x59b6f8[_0x10d337['id']]&&!_0x59b6f8[_0x10d337['id']][_0x39db6d(0x245)](this,_0x10d337))return![];return!![];},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x211)]=function(_0x14aaa2){const _0x4dfcf6=_0x421f4a;return VisuMZ[_0x4dfcf6(0x343)][_0x4dfcf6(0x161)]['PassiveStates'][_0x4dfcf6(0x307)][_0x4dfcf6(0x245)](this,_0x14aaa2);},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0xeb)]=function(){const _0x498a47=_0x421f4a;if(this[_0x498a47(0x140)](_0x498a47(0xeb)))return this['convertPassiveStates']();if(this[_0x498a47(0x12b)])return[];return this[_0x498a47(0x12b)]=!![],this[_0x498a47(0x34b)]['passiveStates']=[],this['addPassiveStatesFromOtherPlugins'](),this[_0x498a47(0x1f3)](),this[_0x498a47(0x1a5)](),this[_0x498a47(0x12b)]=undefined,this[_0x498a47(0xd7)]();},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x20d)]=function(){const _0x5c22ef=_0x421f4a;if(Imported[_0x5c22ef(0x1c5)])this[_0x5c22ef(0x1e8)]();},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0xcd)]=function(){return[];},Game_BattlerBase['prototype'][_0x421f4a(0x1f3)]=function(){const _0x2f04c9=_0x421f4a,_0x4ff351=this[_0x2f04c9(0xcd)]();for(const _0x33fcfd of _0x4ff351){if(!_0x33fcfd)continue;const _0x3e4e18=_0x33fcfd[_0x2f04c9(0x357)][_0x2f04c9(0x258)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x3e4e18)for(const _0x478cc9 of _0x3e4e18){if(_0x2f04c9(0x346)!==_0x2f04c9(0x367)){_0x478cc9[_0x2f04c9(0x258)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x2444db=RegExp['$1'];if(_0x2444db['match'](/(\d+(?:\s*,\s*\d+)*)/i)){if(_0x2f04c9(0x360)==='mFccn'){function _0x37022a(){const _0x1d7a6d=_0x2f04c9;return _0x292b0a=_0x5bb4d4(_0x4632ba),this[_0x1d7a6d(0x17f)]=this[_0x1d7a6d(0x17f)]||{},_0x22cc03[_0x1d7a6d(0x258)](/#(.*)/i)?this[_0x1d7a6d(0x17f)][_0x29b056]='#%1'[_0x1d7a6d(0x25e)](_0x3a3280(_0xbd7bc['$1'])):this['_colorCache'][_0x2e7005]=this[_0x1d7a6d(0x312)](_0x185bae(_0x28cf37)),this['_colorCache'][_0xfc374e];}}else{const _0x1e97bd=JSON[_0x2f04c9(0x22d)]('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x2f04c9(0x34b)][_0x2f04c9(0xeb)]=this[_0x2f04c9(0x34b)][_0x2f04c9(0xeb)][_0x2f04c9(0x283)](_0x1e97bd);}}else{if('gmCsP'===_0x2f04c9(0x204)){const _0x334028=_0x2444db[_0x2f04c9(0x14a)](',');for(const _0x3fc541 of _0x334028){if('ETjUM'===_0x2f04c9(0x350)){function _0x1a1269(){const _0xfb2544=_0x2f04c9;_0x1875fd[_0xfb2544(0x258)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x1ee6bc=_0x27d1c9[_0xfb2544(0x23f)](_0x50a1ac(_0x513424['$1'])[_0xfb2544(0xbe)]()),_0x530786=_0x3e849f(_0x5a0564['$2']);_0x1ee6bc>=0x0&&(_0x10a948[_0xfb2544(0x201)](_0x1ee6bc,_0x530786),this[_0xfb2544(0x223)](_0xf248bc));}}else{const _0x4889ce=DataManager[_0x2f04c9(0x1d7)](_0x3fc541);if(_0x4889ce)this['_cache'][_0x2f04c9(0xeb)][_0x2f04c9(0x1e2)](_0x4889ce);}}}else{function _0x10f2f8(){const _0x15f551=_0x2f04c9;return this['_categoryWindow']&&this[_0x15f551(0x2ab)][_0x15f551(0x318)]();}}}}else{function _0x5c4cce(){const _0x26c658=_0x2f04c9,_0x15f4ec=_0x56f90f(_0x10ed69['$1']),_0x1f5796=_0x26c658(0x22e)[_0x26c658(0x25e)](_0x15f4ec);_0x5e27c9[_0x26c658(0x343)][_0x26c658(0x197)][_0x3aaee9['id']]=new _0x27aa89('skill',_0x1f5796);}}}}},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x1a5)]=function(){const _0x1685d0=_0x421f4a,_0x51b540=VisuMZ[_0x1685d0(0x343)][_0x1685d0(0x161)]['PassiveStates'][_0x1685d0(0x181)];this['_cache'][_0x1685d0(0xeb)]=this[_0x1685d0(0x34b)][_0x1685d0(0xeb)][_0x1685d0(0x283)](_0x51b540);},Game_BattlerBase['prototype'][_0x421f4a(0x2f4)]=function(_0x3b40e8){const _0x47b3f4=_0x421f4a;if(typeof _0x3b40e8!==_0x47b3f4(0x1a0))_0x3b40e8=_0x3b40e8['id'];return this[_0x47b3f4(0x1c3)][_0x3b40e8]||0x0;},Game_BattlerBase[_0x421f4a(0x12d)]['setStateTurns']=function(_0x59254c,_0x1abe13){const _0x39f0bb=_0x421f4a;if(typeof _0x59254c!==_0x39f0bb(0x1a0))_0x59254c=_0x59254c['id'];if(this[_0x39f0bb(0xf8)](_0x59254c)){if(_0x39f0bb(0x287)!==_0x39f0bb(0x287)){function _0x3d260f(){const _0x121d01=_0x39f0bb,_0x4c41df=this['_commandNameWindow'];_0x4c41df[_0x121d01(0xf7)][_0x121d01(0x222)]();const _0x3f6600=this[_0x121d01(0x1fc)](this[_0x121d01(0x296)]());if(_0x3f6600===_0x121d01(0x37e)&&this[_0x121d01(0x141)]()>0x0){const _0x206d82=this[_0x121d01(0x2a4)](this['index']());let _0x1e5c81=this[_0x121d01(0xc6)](this[_0x121d01(0x296)]());_0x1e5c81=_0x1e5c81[_0x121d01(0x316)](/\\I\[(\d+)\]/gi,''),_0x4c41df['resetFontSettings'](),this[_0x121d01(0x111)](_0x1e5c81,_0x206d82),this[_0x121d01(0x1a7)](_0x1e5c81,_0x206d82),this[_0x121d01(0x1f0)](_0x1e5c81,_0x206d82);}}}else{const _0x4f3b22=DataManager[_0x39f0bb(0x270)](_0x59254c);this[_0x39f0bb(0x1c3)][_0x59254c]=_0x1abe13[_0x39f0bb(0x325)](0x0,_0x4f3b22);if(this[_0x39f0bb(0x1c3)][_0x59254c]<=0x0)this[_0x39f0bb(0x364)](_0x59254c);}}},Game_BattlerBase['prototype'][_0x421f4a(0x2ed)]=function(_0x376504,_0x35e6c9){const _0x33f2cc=_0x421f4a;if(typeof _0x376504!==_0x33f2cc(0x1a0))_0x376504=_0x376504['id'];this['isStateAffected'](_0x376504)&&(_0x35e6c9+=this['stateTurns'](_0x376504),this[_0x33f2cc(0x217)](_0x376504,_0x35e6c9));},VisuMZ['SkillsStatesCore']['Game_BattlerBase_eraseBuff']=Game_BattlerBase[_0x421f4a(0x12d)]['eraseBuff'],Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x15a)]=function(_0x10bf07){const _0x4275cb=_0x421f4a,_0x407130=this[_0x4275cb(0x30e)][_0x10bf07];VisuMZ[_0x4275cb(0x343)]['Game_BattlerBase_eraseBuff'][_0x4275cb(0x245)](this,_0x10bf07);if(_0x407130>0x0)this[_0x4275cb(0x304)](_0x10bf07);if(_0x407130<0x0)this[_0x4275cb(0x15d)](_0x10bf07);},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x334)]=Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x2ca)],Game_BattlerBase['prototype'][_0x421f4a(0x2ca)]=function(_0x3302f0){const _0x18442f=_0x421f4a;VisuMZ[_0x18442f(0x343)][_0x18442f(0x334)][_0x18442f(0x245)](this,_0x3302f0);if(!this[_0x18442f(0x375)](_0x3302f0))this[_0x18442f(0x15a)](_0x3302f0);},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x31a)]=Game_BattlerBase[_0x421f4a(0x12d)]['decreaseBuff'],Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0xcf)]=function(_0x5688f5){const _0xeca6b3=_0x421f4a;VisuMZ[_0xeca6b3(0x343)][_0xeca6b3(0x31a)][_0xeca6b3(0x245)](this,_0x5688f5);if(!this[_0xeca6b3(0x375)](_0x5688f5))this[_0xeca6b3(0x15a)](_0x5688f5);},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x304)]=function(_0x5d0e6e){},Game_BattlerBase['prototype']['onEraseDebuff']=function(_0x5249b6){},Game_BattlerBase[_0x421f4a(0x12d)]['isMaxBuffAffected']=function(_0x20b3e3){const _0xf419c6=_0x421f4a;return this[_0xf419c6(0x30e)][_0x20b3e3]===VisuMZ[_0xf419c6(0x343)][_0xf419c6(0x161)][_0xf419c6(0x2f0)][_0xf419c6(0x1ad)];},Game_BattlerBase[_0x421f4a(0x12d)]['isMaxDebuffAffected']=function(_0x25e1fd){const _0x2508b9=_0x421f4a;return this['_buffs'][_0x25e1fd]===-VisuMZ[_0x2508b9(0x343)][_0x2508b9(0x161)][_0x2508b9(0x2f0)]['StackDebuffMax'];},VisuMZ['SkillsStatesCore'][_0x421f4a(0xa2)]=Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x137)],Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x137)]=function(_0x4e4ba4,_0x15fcfd){const _0x159f25=_0x421f4a;return _0x4e4ba4=_0x4e4ba4[_0x159f25(0x325)](-0x2,0x2),VisuMZ[_0x159f25(0x343)]['Game_BattlerBase_buffIconIndex']['call'](this,_0x4e4ba4,_0x15fcfd);},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x116)]=function(_0x21ced5){const _0xd5b767=_0x421f4a,_0x71f03=this[_0xd5b767(0x30e)][_0x21ced5];return VisuMZ[_0xd5b767(0x343)]['Settings'][_0xd5b767(0x2f0)][_0xd5b767(0x19a)][_0xd5b767(0x245)](this,_0x21ced5,_0x71f03);},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x177)]=function(_0x44b320){const _0xee219b=_0x421f4a;return this[_0xee219b(0x1fb)][_0x44b320]||0x0;},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x2ba)]=function(_0x29f6fc){const _0x512430=_0x421f4a;return this[_0x512430(0x177)](_0x29f6fc);},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x2d9)]=function(_0x5ada1e,_0x451aa1){const _0x56b0e6=_0x421f4a;if(this[_0x56b0e6(0x2d1)](_0x5ada1e)){const _0x44c909=VisuMZ[_0x56b0e6(0x343)][_0x56b0e6(0x161)][_0x56b0e6(0x2f0)][_0x56b0e6(0x230)];this['_buffTurns'][_0x5ada1e]=_0x451aa1[_0x56b0e6(0x325)](0x0,_0x44c909);}},Game_BattlerBase['prototype'][_0x421f4a(0x201)]=function(_0xcd2dc4,_0x2b9941){const _0x2291b8=_0x421f4a;if(this['isBuffAffected'](_0xcd2dc4)){if(_0x2291b8(0x155)!=='rYdeS'){function _0x42b47c(){const _0x20f388=_0x2291b8;if(!_0x17ccf0[_0x20f388(0x343)][_0x20f388(0x161)]['Buffs'][_0x20f388(0x1b9)])return;const _0x136b5b=_0x40f52e[_0x20f388(0x1bd)](_0x466cee);if(_0x136b5b===0x0)return;const _0x3a87b2=_0x564362[_0x20f388(0x177)](_0x3d728d),_0x225f6b=_0x2db41d['iconWidth'],_0x3f0fc4=_0x136b5b>0x0?_0xf16003[_0x20f388(0x2aa)]():_0x12fbf6[_0x20f388(0x2d4)]();this[_0x20f388(0x33b)](_0x3f0fc4),this[_0x20f388(0x366)]('rgba(0,\x200,\x200,\x201)'),this[_0x20f388(0xf7)][_0x20f388(0x110)]=!![],this['contents'][_0x20f388(0x29f)]=_0x165217['SkillsStatesCore'][_0x20f388(0x161)][_0x20f388(0x2f0)][_0x20f388(0x2e0)],_0xb7337a+=_0x1c1cb6[_0x20f388(0x343)]['Settings'][_0x20f388(0x2f0)]['TurnOffsetX'],_0x53319b+=_0x4e8b56[_0x20f388(0x343)][_0x20f388(0x161)][_0x20f388(0x2f0)][_0x20f388(0x329)],this['drawText'](_0x3a87b2,_0x29b9d0,_0x41cf98,_0x225f6b,_0x20f388(0x1cb)),this[_0x20f388(0xf7)]['fontBold']=![],this[_0x20f388(0x2b4)]();}}else _0x2b9941+=this['buffTurns'](stateId),this[_0x2291b8(0x217)](_0xcd2dc4,_0x2b9941);}},Game_BattlerBase['prototype']['setDebuffTurns']=function(_0x4d443b,_0x3dc70a){const _0x4d9c47=_0x421f4a;if(this[_0x4d9c47(0x376)](_0x4d443b)){if(_0x4d9c47(0x102)===_0x4d9c47(0x102)){const _0x1b7986=VisuMZ[_0x4d9c47(0x343)][_0x4d9c47(0x161)]['Buffs'][_0x4d9c47(0x230)];this[_0x4d9c47(0x1fb)][_0x4d443b]=_0x3dc70a['clamp'](0x0,_0x1b7986);}else{function _0x220de3(){const _0x353b80=_0x4d9c47;this[_0x353b80(0xf7)][_0x353b80(0x36e)](_0x4481fc,_0xdd835a,_0x281816,_0x2d365a,this['contents'][_0x353b80(0x26e)],_0xf0c001);}}}},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x32f)]=function(_0x31c440,_0x148cd5){const _0x2ad443=_0x421f4a;this[_0x2ad443(0x376)](_0x31c440)&&(_0x148cd5+=this['buffTurns'](stateId),this['setStateTurns'](_0x31c440,_0x148cd5));},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x26a)]=function(_0xdf6132){const _0x45e391=_0x421f4a;if(typeof _0xdf6132!=='number')_0xdf6132=_0xdf6132['id'];return this[_0x45e391(0xf1)]=this[_0x45e391(0xf1)]||{},this[_0x45e391(0xf1)][_0xdf6132]=this[_0x45e391(0xf1)][_0xdf6132]||{},this[_0x45e391(0xf1)][_0xdf6132];},Game_BattlerBase['prototype'][_0x421f4a(0x1c7)]=function(_0x4a8471,_0x35d25b){const _0x5bc51b=_0x421f4a;if(typeof _0x4a8471!==_0x5bc51b(0x1a0))_0x4a8471=_0x4a8471['id'];const _0x4e1ea8=this[_0x5bc51b(0x26a)](_0x4a8471);return _0x4e1ea8[_0x35d25b];},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x2c3)]=function(_0x45cf52,_0x15825c,_0x3de594){const _0x288430=_0x421f4a;if(typeof _0x45cf52!=='number')_0x45cf52=_0x45cf52['id'];const _0x29aa90=this[_0x288430(0x26a)](_0x45cf52);_0x29aa90[_0x15825c]=_0x3de594;},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x21f)]=function(_0x478a75){const _0xc0c1b8=_0x421f4a;if(typeof _0x478a75!=='number')_0x478a75=_0x478a75['id'];this[_0xc0c1b8(0xf1)]=this[_0xc0c1b8(0xf1)]||{},this[_0xc0c1b8(0xf1)][_0x478a75]={};},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x379)]=function(_0xcd4375){const _0x330219=_0x421f4a;if(typeof _0xcd4375!==_0x330219(0x1a0))_0xcd4375=_0xcd4375['id'];return this[_0x330219(0x262)]=this[_0x330219(0x262)]||{},this[_0x330219(0x262)][_0xcd4375]===undefined&&(this[_0x330219(0x262)][_0xcd4375]=''),this['_stateDisplay'][_0xcd4375];},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0xe1)]=function(_0x3d9841,_0x1df9a1){const _0x627e4a=_0x421f4a;if(typeof _0x3d9841!==_0x627e4a(0x1a0))_0x3d9841=_0x3d9841['id'];this[_0x627e4a(0x262)]=this[_0x627e4a(0x262)]||{},this[_0x627e4a(0x262)][_0x3d9841]=_0x1df9a1;},Game_BattlerBase[_0x421f4a(0x12d)]['clearStateDisplay']=function(_0x35ed08){const _0x4b83d7=_0x421f4a;if(typeof _0x35ed08!==_0x4b83d7(0x1a0))_0x35ed08=_0x35ed08['id'];this[_0x4b83d7(0x262)]=this[_0x4b83d7(0x262)]||{},this[_0x4b83d7(0x262)][_0x35ed08]='';},Game_BattlerBase['prototype'][_0x421f4a(0xf4)]=function(_0x3c64eb){const _0x5084b1=_0x421f4a;if(typeof _0x3c64eb!=='number')_0x3c64eb=_0x3c64eb['id'];this['_stateOrigin']=this[_0x5084b1(0x2bb)]||{},this[_0x5084b1(0x2bb)][_0x3c64eb]=this[_0x5084b1(0x2bb)][_0x3c64eb]||_0x5084b1(0x28d);const _0x3b306a=this[_0x5084b1(0x2bb)][_0x3c64eb];return this[_0x5084b1(0x157)](_0x3b306a);},Game_BattlerBase['prototype'][_0x421f4a(0x27c)]=function(_0x38faac,_0x1d48f1){const _0x25dd1c=_0x421f4a;this['_stateOrigin']=this['_stateOrigin']||{};const _0x147276=_0x1d48f1?this['convertTargetToStateOriginKey'](_0x1d48f1):this[_0x25dd1c(0x277)]();this['_stateOrigin'][_0x38faac]=_0x147276;},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0xd0)]=function(_0x4a6c2a){const _0x3ffa41=_0x421f4a;this[_0x3ffa41(0x2bb)]=this[_0x3ffa41(0x2bb)]||{},delete this['_stateOrigin'][_0x4a6c2a];},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x277)]=function(){const _0x290db4=_0x421f4a,_0x5928a6=this['getCurrentStateActiveUser']();return this[_0x290db4(0x2b9)](_0x5928a6);},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x14b)]=function(){const _0x51a022=_0x421f4a;if($gameParty[_0x51a022(0x10c)]()){if(BattleManager[_0x51a022(0x30a)]){if(_0x51a022(0x1bb)!=='OVhiN'){function _0x4e4fd3(){const _0x596e02=_0x51a022,_0x5c5d13=_0x5abec5(_0xb798c6['$1']),_0x5ac29b=_0x981346[_0x596e02(0x25e)](_0x5c5d13,_0x596e02(0x1cf),0x1,_0x596e02(0x233));_0x377041['SkillsStatesCore'][_0x596e02(0xcb)][_0x1610c5['id']]=new _0x1a2484('stateId',_0x5ac29b);}}else return BattleManager[_0x51a022(0x30a)];}else{if(BattleManager[_0x51a022(0x34a)])return BattleManager['_currentActor'];}}else{const _0x1ec20c=SceneManager[_0x51a022(0x381)];if(![Scene_Map,Scene_Item][_0x51a022(0x1f2)](_0x1ec20c['constructor']))return $gameParty[_0x51a022(0x32e)]();}return this;},Game_BattlerBase['prototype'][_0x421f4a(0x2b9)]=function(_0x2ee6ec){const _0x21e1e7=_0x421f4a;if(!_0x2ee6ec)return _0x21e1e7(0x28d);if(_0x2ee6ec[_0x21e1e7(0x27a)]()){if(_0x21e1e7(0x2ef)===_0x21e1e7(0x2ef))return'<actor-%1>'[_0x21e1e7(0x25e)](_0x2ee6ec['actorId']());else{function _0x19c0ba(){const _0x3d1307=_0x21e1e7;this[_0x3d1307(0x1ae)](_0x46e862,_0x483902,_0x11c8cd,_0x5959aa);}}}else{const _0x5d5938=_0x21e1e7(0x2f7)[_0x21e1e7(0x25e)](_0x2ee6ec['enemyId']()),_0x4dbe92='<member-%1>'['format'](_0x2ee6ec[_0x21e1e7(0x296)]()),_0x265a25=_0x21e1e7(0x1dc)[_0x21e1e7(0x25e)]($gameTroop[_0x21e1e7(0x349)]());return _0x21e1e7(0x2dd)['format'](_0x5d5938,_0x4dbe92,_0x265a25);}return _0x21e1e7(0x28d);},Game_BattlerBase['prototype'][_0x421f4a(0x157)]=function(_0x47736b){const _0xac24e7=_0x421f4a;if(_0x47736b===_0xac24e7(0x28d)){if(_0xac24e7(0x1c0)!=='pdOyY'){function _0x1d907f(){const _0x216ab1=_0xac24e7;_0x2398a1['name']=_0x155946['name'][_0x216ab1(0x316)](/\\V\[(\d+)\]/gi,(_0xd4f2de,_0x925207)=>_0x37a195[_0x216ab1(0x168)](_0x9ced55(_0x925207)));}}else return this;}else{if(_0x47736b[_0xac24e7(0x258)](/<actor-(\d+)>/i))return $gameActors[_0xac24e7(0x2b3)](Number(RegExp['$1']));else{if($gameParty[_0xac24e7(0x10c)]()&&_0x47736b[_0xac24e7(0x258)](/<troop-(\d+)>/i)){if(_0xac24e7(0x10d)!==_0xac24e7(0x10d)){function _0x2ae36d(){const _0x5ce950=_0xac24e7;!_0x44c96e[_0x5ce950(0x1f2)](_0x16e56a)&&this[_0x5ce950(0x1ae)](_0x1e50aa,_0x2f46cb,_0x4c240e,_0x5b9401),this[_0x5ce950(0x2d8)](_0x363d61,_0x476e66,_0x4fba7c,_0x540cae),_0x5ed088[_0x5ce950(0x1e2)](_0x32b887);}}else{const _0x427374=Number(RegExp['$1']);if(_0x427374===$gameTroop['getCurrentTroopUniqueID']()){if(_0xac24e7(0xb9)===_0xac24e7(0x143)){function _0x26b613(){if(_0x7e778['value'](_0x29a498))return!![];}}else{if(_0x47736b[_0xac24e7(0x258)](/<member-(\d+)>/i)){if('QIsGQ'!==_0xac24e7(0x21b)){function _0x3157d7(){const _0x2849e9=_0xac24e7;this[_0x2849e9(0x2fd)][_0x5db031]=_0x579335[_0x2849e9(0x343)][_0x2849e9(0x161)]['States']['MaxTurns'];}}else return $gameTroop[_0xac24e7(0xd1)]()[Number(RegExp['$1'])];}}}}}if(_0x47736b[_0xac24e7(0x258)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ['SkillsStatesCore'][_0x421f4a(0x35b)]=Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x2cb)],Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x2cb)]=function(_0x2bd795){const _0x442c4c=_0x421f4a,_0x5c690e=this[_0x442c4c(0x24c)](_0x2bd795);VisuMZ[_0x442c4c(0x343)][_0x442c4c(0x35b)]['call'](this,_0x2bd795);if(_0x5c690e&&this['hasState']($dataStates[_0x2bd795])){this[_0x442c4c(0x294)](_0x2bd795);;}},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x319)]=Game_Battler[_0x421f4a(0x12d)]['isStateAddable'],Game_Battler[_0x421f4a(0x12d)]['isStateAddable']=function(_0x2f699d){const _0x1c7bac=_0x421f4a,_0x3b1d1a=$dataStates[_0x2f699d];if(_0x3b1d1a&&_0x3b1d1a['note'][_0x1c7bac(0x258)](/<NO DEATH CLEAR>/i))return!this[_0x1c7bac(0x23a)](_0x2f699d)&&!this[_0x1c7bac(0xc0)](_0x2f699d)&&!this[_0x1c7bac(0x219)][_0x1c7bac(0x24e)](_0x2f699d);return VisuMZ[_0x1c7bac(0x343)][_0x1c7bac(0x319)][_0x1c7bac(0x245)](this,_0x2f699d);},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x294)]=function(_0x5a6059){const _0x2e6e16=_0x421f4a;this[_0x2e6e16(0x27c)](_0x5a6059),this[_0x2e6e16(0xbb)](_0x5a6059),this['onAddStateCustomJS'](_0x5a6059),this[_0x2e6e16(0x2a3)](_0x5a6059);},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x2c6)]=function(_0x45ef1a){const _0x1b5dd8=_0x421f4a;Game_BattlerBase[_0x1b5dd8(0x12d)][_0x1b5dd8(0x2c6)]['call'](this,_0x45ef1a),this[_0x1b5dd8(0x1aa)](_0x45ef1a),this[_0x1b5dd8(0x20a)](_0x45ef1a);},Game_Battler['prototype']['removeStatesAuto']=function(_0x5b1420){const _0x1e1c80=_0x421f4a;for(const _0x144f6e of this[_0x1e1c80(0x139)]()){this[_0x1e1c80(0x2ff)](_0x144f6e['id'])&&_0x144f6e[_0x1e1c80(0x12a)]===_0x5b1420&&(this[_0x1e1c80(0x364)](_0x144f6e['id']),this['onExpireState'](_0x144f6e['id']),this[_0x1e1c80(0x2c1)](_0x144f6e['id']));}},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0xd2)]=function(_0x429e73){const _0x4ed177=_0x421f4a;this[_0x4ed177(0x265)](_0x429e73);},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x159)]=function(_0x2c50e9){const _0x102df9=_0x421f4a;if(this[_0x102df9(0x18b)]||this['_tempBattler'])return;const _0x563636=VisuMZ[_0x102df9(0x343)][_0x102df9(0x341)];if(_0x563636[_0x2c50e9])_0x563636[_0x2c50e9][_0x102df9(0x245)](this,_0x2c50e9);},Game_Battler[_0x421f4a(0x12d)]['onEraseStateCustomJS']=function(_0x27f56a){const _0x4ab044=_0x421f4a;if(this[_0x4ab044(0x18b)]||this['_tempBattler'])return;const _0x1513ab=VisuMZ[_0x4ab044(0x343)][_0x4ab044(0x33d)];if(_0x1513ab[_0x27f56a])_0x1513ab[_0x27f56a][_0x4ab044(0x245)](this,_0x27f56a);},Game_Battler['prototype']['onExpireStateCustomJS']=function(_0x28e505){const _0x5987e4=_0x421f4a;if(this[_0x5987e4(0x18b)]||this[_0x5987e4(0x37c)])return;const _0x924a8b=VisuMZ[_0x5987e4(0x343)][_0x5987e4(0x2f6)];if(_0x924a8b[_0x28e505])_0x924a8b[_0x28e505][_0x5987e4(0x245)](this,_0x28e505);},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x2a3)]=function(_0x4ecbf3){const _0x3820e7=_0x421f4a;if(this[_0x3820e7(0x18b)]||this['_tempBattler'])return;try{VisuMZ[_0x3820e7(0x343)]['Settings'][_0x3820e7(0x2ac)][_0x3820e7(0x165)]['call'](this,_0x4ecbf3);}catch(_0x3a9aac){if($gameTemp[_0x3820e7(0x10f)]())console['log'](_0x3a9aac);}},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x20a)]=function(_0x776240){const _0x419f82=_0x421f4a;if(this[_0x419f82(0x18b)]||this[_0x419f82(0x37c)])return;try{VisuMZ[_0x419f82(0x343)][_0x419f82(0x161)][_0x419f82(0x2ac)][_0x419f82(0x37b)]['call'](this,_0x776240);}catch(_0x562990){if('VQayo'===_0x419f82(0x130)){if($gameTemp[_0x419f82(0x10f)]())console['log'](_0x562990);}else{function _0xd59b16(){const _0x2facfa=_0x419f82;this[_0x2facfa(0x34b)]={},this[_0x2facfa(0x36f)](),_0x148019[_0x2facfa(0x343)]['Game_BattlerBase_initMembers'][_0x2facfa(0x245)](this);}}}},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x2c1)]=function(_0x5bb5c4){const _0x5a10bf=_0x421f4a;if(this[_0x5a10bf(0x18b)]||this['_tempBattler'])return;try{if(_0x5a10bf(0xc4)===_0x5a10bf(0xc4))VisuMZ[_0x5a10bf(0x343)][_0x5a10bf(0x161)][_0x5a10bf(0x2ac)][_0x5a10bf(0x16e)][_0x5a10bf(0x245)](this,_0x5bb5c4);else{function _0x53a616(){const _0x559773=_0x5a10bf,_0x4d93dc=_0x503e5a[_0x559773(0xf2)]-this[_0x559773(0x345)](),_0x7cd5a7=this[_0x559773(0x207)]()-this['_statusWindow'][_0x559773(0x26e)],_0x23621f=this[_0x559773(0x2ae)]()?_0x12851a['boxWidth']-_0x4d93dc:0x0,_0x4cb752=this['_statusWindow']['y']+this[_0x559773(0x35f)]['height'];return new _0x17a2f0(_0x23621f,_0x4cb752,_0x4d93dc,_0x7cd5a7);}}}catch(_0x469e73){if($gameTemp[_0x5a10bf(0x10f)]())console[_0x5a10bf(0x221)](_0x469e73);}},Game_Battler[_0x421f4a(0x12d)]['statesByCategory']=function(_0x3fca2c){const _0x5ebb79=_0x421f4a;return _0x3fca2c=_0x3fca2c['toUpperCase']()['trim'](),this[_0x5ebb79(0x139)]()[_0x5ebb79(0x195)](_0x1ecd3a=>_0x1ecd3a[_0x5ebb79(0x1e0)]['includes'](_0x3fca2c));},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x18c)]=function(_0x225cd6,_0x177f78){const _0x16d7ec=_0x421f4a;_0x225cd6=_0x225cd6[_0x16d7ec(0xbe)]()[_0x16d7ec(0x210)](),_0x177f78=_0x177f78||0x0;const _0x616280=this[_0x16d7ec(0x347)](_0x225cd6),_0x452571=[];for(const _0x27ed6f of _0x616280){if(!_0x27ed6f)continue;if(_0x177f78<=0x0)return;_0x452571[_0x16d7ec(0x1e2)](_0x27ed6f['id']),this[_0x16d7ec(0x219)][_0x16d7ec(0x20f)]=!![],_0x177f78--;}while(_0x452571[_0x16d7ec(0x249)]>0x0){if(_0x16d7ec(0x2b1)!=='BbDbK')this[_0x16d7ec(0x364)](_0x452571[_0x16d7ec(0x33c)]());else{function _0x1273d2(){const _0x44012c=_0x16d7ec;_0x24b805['SkillsStatesCore'][_0x44012c(0x31c)]['call'](this,_0x37c4fc),this[_0x44012c(0x1ef)](_0x2a6f54);}}}},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x2b8)]=function(_0x29db82){const _0x38d05c=_0x421f4a;_0x29db82=_0x29db82[_0x38d05c(0xbe)]()[_0x38d05c(0x210)]();const _0x598cd3=this['statesByCategory'](_0x29db82),_0x2e5daf=[];for(const _0x36c914 of _0x598cd3){if(!_0x36c914)continue;_0x2e5daf[_0x38d05c(0x1e2)](_0x36c914['id']),this[_0x38d05c(0x219)][_0x38d05c(0x20f)]=!![];}while(_0x2e5daf['length']>0x0){if('YDLGr'===_0x38d05c(0x203))this[_0x38d05c(0x364)](_0x2e5daf['shift']());else{function _0x26125c(){const _0x4fbd7e=_0x38d05c,_0x227a23=_0x709996[_0x4fbd7e(0x22d)]('['+_0x18b148['$1'][_0x4fbd7e(0x258)](/\d+/g)+']');for(const _0x221bcd of _0x227a23){if(!this[_0x4fbd7e(0xda)][_0x4fbd7e(0x225)](_0x221bcd))return![];}return!![];}}}},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x1ea)]=function(_0x12c588){return this['totalStateCategoryAffected'](_0x12c588)>0x0;},Game_Battler['prototype'][_0x421f4a(0x35a)]=function(_0x4a3f72){const _0x4bfbc0=_0x421f4a;return this[_0x4bfbc0(0x136)](_0x4a3f72)>0x0;},Game_Battler[_0x421f4a(0x12d)]['totalStateCategoryAffected']=function(_0x226232){const _0x6e67fd=_0x421f4a,_0x29b0e5=this[_0x6e67fd(0x347)](_0x226232)[_0x6e67fd(0x195)](_0x375dca=>this[_0x6e67fd(0xf8)](_0x375dca['id']));return _0x29b0e5['length'];},Game_Battler[_0x421f4a(0x12d)]['totalStateCategory']=function(_0x3f7d3a){const _0x327915=_0x421f4a,_0x49275d=this[_0x327915(0x347)](_0x3f7d3a);return _0x49275d[_0x327915(0x249)];},VisuMZ['SkillsStatesCore']['Game_Battler_addBuff']=Game_Battler['prototype'][_0x421f4a(0x336)],Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x336)]=function(_0x609da6,_0x304573){const _0x12d7dd=_0x421f4a;VisuMZ[_0x12d7dd(0x343)][_0x12d7dd(0x24d)][_0x12d7dd(0x245)](this,_0x609da6,_0x304573);if(this[_0x12d7dd(0x2d1)](_0x609da6)){if(_0x12d7dd(0x25b)===_0x12d7dd(0x224)){function _0x15a6b6(){const _0x7a00e7=_0x12d7dd;for(let _0x518e1d=0x0;_0x518e1d<this[_0x7a00e7(0x194)]();_0x518e1d++){if(this['isBuffExpired'](_0x518e1d)){const _0x5344cd=this[_0x7a00e7(0x30e)][_0x518e1d];this['removeBuff'](_0x518e1d);if(_0x5344cd>0x0)this[_0x7a00e7(0x30f)](_0x518e1d);if(_0x5344cd<0x0)this[_0x7a00e7(0xb8)](_0x518e1d);}}}}else this[_0x12d7dd(0x187)](_0x609da6,_0x304573);}},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x1d5)]=function(_0x30e2f7){},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x282)]=Game_Battler['prototype'][_0x421f4a(0x1d9)],Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x1d9)]=function(_0x578f30,_0x3a947d){const _0xd2a95f=_0x421f4a;VisuMZ['SkillsStatesCore'][_0xd2a95f(0x282)][_0xd2a95f(0x245)](this,_0x578f30,_0x3a947d),this[_0xd2a95f(0x376)](_0x578f30)&&this['onAddDebuff'](_0x578f30,_0x3a947d);},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0xec)]=function(){const _0x10143d=_0x421f4a;for(let _0xae445b=0x0;_0xae445b<this[_0x10143d(0x194)]();_0xae445b++){if(this[_0x10143d(0x1ca)](_0xae445b)){const _0x4b85fe=this['_buffs'][_0xae445b];this[_0x10143d(0x254)](_0xae445b);if(_0x4b85fe>0x0)this[_0x10143d(0x30f)](_0xae445b);if(_0x4b85fe<0x0)this[_0x10143d(0xb8)](_0xae445b);}}},Game_Battler['prototype'][_0x421f4a(0x187)]=function(_0x794754,_0x1e5ab2){const _0x4c27a3=_0x421f4a;this[_0x4c27a3(0x2e4)](_0x794754,_0x1e5ab2);},Game_Battler['prototype'][_0x421f4a(0x378)]=function(_0x3b98a3,_0x23f9cb){this['onAddDebuffGlobalJS'](_0x3b98a3,_0x23f9cb);},Game_Battler['prototype'][_0x421f4a(0x304)]=function(_0xe67fa6){const _0x1564d0=_0x421f4a;Game_BattlerBase[_0x1564d0(0x12d)][_0x1564d0(0x304)][_0x1564d0(0x245)](this,_0xe67fa6),this['onEraseBuffGlobalJS'](_0xe67fa6);},Game_Battler['prototype'][_0x421f4a(0x15d)]=function(_0x15429b){const _0x13078c=_0x421f4a;Game_BattlerBase[_0x13078c(0x12d)][_0x13078c(0x15d)][_0x13078c(0x245)](this,_0x15429b),this['onEraseDebuffGlobalJS'](_0x15429b);},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x30f)]=function(_0x38e22f){const _0x13623e=_0x421f4a;this[_0x13623e(0x142)](_0x38e22f);},Game_Battler['prototype'][_0x421f4a(0xb8)]=function(_0x502f19){const _0x20486b=_0x421f4a;this[_0x20486b(0x32d)](_0x502f19);},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x2e4)]=function(_0x361b34,_0x42dc57){const _0x180935=_0x421f4a;VisuMZ['SkillsStatesCore'][_0x180935(0x161)][_0x180935(0x2f0)][_0x180935(0x192)][_0x180935(0x245)](this,_0x361b34,_0x42dc57);},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x1f7)]=function(_0x489185,_0x14fe65){const _0x53f93d=_0x421f4a;VisuMZ[_0x53f93d(0x343)][_0x53f93d(0x161)][_0x53f93d(0x2f0)]['onAddDebuffJS'][_0x53f93d(0x245)](this,_0x489185,_0x14fe65);},Game_BattlerBase[_0x421f4a(0x12d)][_0x421f4a(0x149)]=function(_0x27431a){const _0x375bcb=_0x421f4a;VisuMZ[_0x375bcb(0x343)][_0x375bcb(0x161)][_0x375bcb(0x2f0)]['onEraseBuffJS'][_0x375bcb(0x245)](this,_0x27431a);},Game_BattlerBase[_0x421f4a(0x12d)]['onEraseDebuffGlobalJS']=function(_0x554cc1){const _0x438d4c=_0x421f4a;VisuMZ[_0x438d4c(0x343)][_0x438d4c(0x161)][_0x438d4c(0x2f0)][_0x438d4c(0x183)][_0x438d4c(0x245)](this,_0x554cc1);},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x142)]=function(_0x1d66e4){const _0x51c7fa=_0x421f4a;VisuMZ[_0x51c7fa(0x343)][_0x51c7fa(0x161)][_0x51c7fa(0x2f0)][_0x51c7fa(0xfc)][_0x51c7fa(0x245)](this,_0x1d66e4);},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x32d)]=function(_0xcf166){const _0x1e4ee1=_0x421f4a;VisuMZ[_0x1e4ee1(0x343)][_0x1e4ee1(0x161)][_0x1e4ee1(0x2f0)][_0x1e4ee1(0x1b1)][_0x1e4ee1(0x245)](this,_0xcf166);},Game_Battler['prototype'][_0x421f4a(0xbb)]=function(_0x52a72b){const _0x1c5bad=_0x421f4a,_0x2d5b72=VisuMZ[_0x1c5bad(0x343)],_0x3aae9e=[_0x1c5bad(0x11d),_0x1c5bad(0x184),_0x1c5bad(0x275),_0x1c5bad(0x127),_0x1c5bad(0x23c),_0x1c5bad(0xcb)];for(const _0xaaefd7 of _0x3aae9e){_0x2d5b72[_0xaaefd7][_0x52a72b]&&_0x2d5b72[_0xaaefd7][_0x52a72b][_0x1c5bad(0x245)](this,_0x52a72b);}},VisuMZ['SkillsStatesCore'][_0x421f4a(0x380)]=Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x1fe)],Game_Battler[_0x421f4a(0x12d)]['regenerateAll']=function(){const _0x399890=_0x421f4a;this[_0x399890(0x326)](),VisuMZ['SkillsStatesCore'][_0x399890(0x380)][_0x399890(0x245)](this),this[_0x399890(0x11e)](),this['regenerateAllSkillsStatesCore']();},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x11e)]=function(){const _0x5ca989=_0x421f4a;for(const _0x31dc6c of this['passiveStates']()){if(!_0x31dc6c)continue;this[_0x5ca989(0xbb)](_0x31dc6c['id']);}},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0x326)]=function(){const _0x99299c=_0x421f4a;for(const _0xbd8527 of this[_0x99299c(0x139)]()){if(_0x99299c(0x17c)===_0x99299c(0x17c)){if(!_0xbd8527)continue;_0xbd8527['note'][_0x99299c(0x258)](/<JS SLIP REFRESH>/i)&&this[_0x99299c(0xbb)](_0xbd8527['id']);}else{function _0x3322da(){const _0x29b296=_0x99299c,_0x2a0274=_0x24e9a8['parse']('['+_0x314e4b['$1'][_0x29b296(0x258)](/\d+/g)+']');for(const _0x3e4334 of _0x2a0274){if(!_0x2f8c87[_0x29b296(0x168)](_0x3e4334))return!![];}return![];}}}},Game_Battler['prototype']['regenerateAllSkillsStatesCore']=function(){const _0x599254=_0x421f4a;if(!this['isAlive']())return;const _0x5980b7=this[_0x599254(0x139)]();for(const _0x55c01b of _0x5980b7){if(!_0x55c01b)continue;this['onRegenerateCustomStateDamageOverTime'](_0x55c01b);}},Game_Battler[_0x421f4a(0x12d)][_0x421f4a(0xe8)]=function(_0x3db588){const _0xd1078c=_0x421f4a,_0x4d837a=this['getStateData'](_0x3db588['id'],_0xd1078c(0x1d1))||0x0,_0x4fd97a=-this[_0xd1078c(0xc5)](),_0x2114d1=Math['max'](_0x4d837a,_0x4fd97a);if(_0x2114d1!==0x0)this[_0xd1078c(0x213)](_0x2114d1);const _0x1b76c4=this[_0xd1078c(0x1c7)](_0x3db588['id'],'slipMp')||0x0;if(_0x1b76c4!==0x0)this[_0xd1078c(0x2c2)](_0x1b76c4);const _0xcf88b9=this[_0xd1078c(0x1c7)](_0x3db588['id'],'slipTp')||0x0;if(_0xcf88b9!==0x0)this[_0xd1078c(0xce)](_0xcf88b9);},VisuMZ['SkillsStatesCore'][_0x421f4a(0x295)]=Game_Actor['prototype']['skillTypes'],Game_Actor[_0x421f4a(0x12d)][_0x421f4a(0x209)]=function(){const _0x5a336b=_0x421f4a,_0xa1fd42=VisuMZ[_0x5a336b(0x343)][_0x5a336b(0x295)][_0x5a336b(0x245)](this),_0x14bbf6=VisuMZ[_0x5a336b(0x343)][_0x5a336b(0x161)][_0x5a336b(0x297)];let _0x3dae1a=_0x14bbf6[_0x5a336b(0xa3)];return $gameParty[_0x5a336b(0x10c)]()&&(_0x3dae1a=_0x3dae1a['concat'](_0x14bbf6['BattleHiddenSkillTypes'])),_0xa1fd42[_0x5a336b(0x195)](_0x3f577c=>!_0x3dae1a[_0x5a336b(0x1f2)](_0x3f577c));},Game_Actor['prototype'][_0x421f4a(0x13b)]=function(){const _0x27fb5d=_0x421f4a;return this[_0x27fb5d(0x190)]()[_0x27fb5d(0x195)](_0x319f62=>this[_0x27fb5d(0x1b6)](_0x319f62));},Game_Actor[_0x421f4a(0x12d)][_0x421f4a(0x1b6)]=function(_0x3185ff){const _0x17923d=_0x421f4a;if(!this[_0x17923d(0xe5)](_0x3185ff))return![];const _0x1c2eba=this['skillTypes'](),_0x4657b7=DataManager[_0x17923d(0x166)](_0x3185ff),_0x4653b8=_0x1c2eba[_0x17923d(0x195)](_0x3505a1=>_0x4657b7[_0x17923d(0x1f2)](_0x3505a1));return _0x4653b8['length']>0x0;},Game_Actor[_0x421f4a(0x12d)][_0x421f4a(0xcd)]=function(){const _0x1e464a=_0x421f4a;let _0x47a7f9=[this[_0x1e464a(0x2b3)](),this[_0x1e464a(0x10e)]()];_0x47a7f9=_0x47a7f9[_0x1e464a(0x283)](this[_0x1e464a(0x237)]()['filter'](_0x291d07=>_0x291d07));for(const _0x48f778 of this[_0x1e464a(0x132)]){if(_0x1e464a(0xaf)==='acSOd'){function _0x17457d(){const _0x253aef=_0x1e464a,_0xeed4cd=_0x3371f8[_0x253aef(0x357)];if(_0xeed4cd['match'](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x281d88=_0x5dd254(_0x302402['$1']),_0x4dc04c=_0x253aef(0x31f)['format'](_0x281d88);_0x3f8065[_0x253aef(0x343)]['statePassiveConditionJS'][_0x13921a['id']]=new _0x573836(_0x253aef(0x331),_0x4dc04c);}}}else{const _0x5da436=$dataSkills[_0x48f778];if(_0x5da436)_0x47a7f9[_0x1e464a(0x1e2)](_0x5da436);}}return _0x47a7f9;},Game_Actor[_0x421f4a(0x12d)][_0x421f4a(0x1a5)]=function(){const _0x2f021f=_0x421f4a;Game_Battler[_0x2f021f(0x12d)][_0x2f021f(0x1a5)][_0x2f021f(0x245)](this);const _0x572d2d=VisuMZ[_0x2f021f(0x343)][_0x2f021f(0x161)]['PassiveStates'][_0x2f021f(0x1af)];this[_0x2f021f(0x34b)][_0x2f021f(0xeb)]=this[_0x2f021f(0x34b)][_0x2f021f(0xeb)][_0x2f021f(0x283)](_0x572d2d);},VisuMZ['SkillsStatesCore'][_0x421f4a(0x238)]=Game_Actor[_0x421f4a(0x12d)][_0x421f4a(0x23e)],Game_Actor[_0x421f4a(0x12d)]['learnSkill']=function(_0x197456){const _0x5b4c35=_0x421f4a;VisuMZ[_0x5b4c35(0x343)][_0x5b4c35(0x238)][_0x5b4c35(0x245)](this,_0x197456),this[_0x5b4c35(0x34b)]={};},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x19e)]=Game_Actor[_0x421f4a(0x12d)]['forgetSkill'],Game_Actor[_0x421f4a(0x12d)][_0x421f4a(0x273)]=function(_0x53fcc4){const _0x77079e=_0x421f4a;VisuMZ[_0x77079e(0x343)][_0x77079e(0x19e)][_0x77079e(0x245)](this,_0x53fcc4),this[_0x77079e(0x34b)]={};},Game_Enemy[_0x421f4a(0x12d)][_0x421f4a(0xcd)]=function(){const _0x436cf0=_0x421f4a;let _0x1bf83e=[this['enemy']()];return _0x1bf83e[_0x436cf0(0x283)](this['skills']());},Game_Enemy[_0x421f4a(0x12d)][_0x421f4a(0x1a5)]=function(){const _0x10c080=_0x421f4a;Game_Battler[_0x10c080(0x12d)]['addPassiveStatesByPluginParameters'][_0x10c080(0x245)](this);const _0x478fda=VisuMZ[_0x10c080(0x343)]['Settings']['PassiveStates'][_0x10c080(0x285)];this[_0x10c080(0x34b)][_0x10c080(0xeb)]=this[_0x10c080(0x34b)]['passiveStates']['concat'](_0x478fda);},Game_Enemy['prototype'][_0x421f4a(0x190)]=function(){const _0x599527=_0x421f4a,_0x47af1d=[];for(const _0x3c3aa0 of this[_0x599527(0x148)]()[_0x599527(0x1ab)]){const _0x106d40=$dataSkills[_0x3c3aa0[_0x599527(0x17d)]];if(_0x106d40&&!_0x47af1d[_0x599527(0x1f2)](_0x106d40))_0x47af1d['push'](_0x106d40);}return _0x47af1d;},Game_Enemy[_0x421f4a(0x12d)][_0x421f4a(0x115)]=function(_0x3649f4){return this['hasState']($dataStates[_0x3649f4]);},VisuMZ[_0x421f4a(0x343)]['Game_Unit_isAllDead']=Game_Unit[_0x421f4a(0x12d)][_0x421f4a(0x309)],Game_Unit[_0x421f4a(0x12d)][_0x421f4a(0x309)]=function(){const _0x3ec8f9=_0x421f4a;if(this[_0x3ec8f9(0xe9)]())return!![];return VisuMZ[_0x3ec8f9(0x343)][_0x3ec8f9(0xd5)]['call'](this);},Game_Unit[_0x421f4a(0x12d)][_0x421f4a(0xe9)]=function(){const _0x52225a=_0x421f4a,_0x5ec8df=this['aliveMembers']();for(const _0x4f688f of _0x5ec8df){if('OgTkz'!==_0x52225a(0xba)){if(!_0x4f688f[_0x52225a(0x368)]())return![];}else{function _0x43d5ab(){const _0x319e3e=_0x52225a,_0x355fc4=this['gaugeRate'](),_0x4b302f=_0x5beb48[_0x319e3e(0x239)]((_0x166fb4-0x2)*_0x355fc4),_0x4a3e9e=_0x260308-0x2,_0x5cb8c7=this['gaugeBackColor']();this[_0x319e3e(0x344)][_0x319e3e(0xc3)](_0x56c858,_0x458d64,_0x5163e5,_0x4b78f9,_0x5cb8c7),this[_0x319e3e(0x344)]['gradientFillRect'](_0x25673f+0x1,_0x555033+0x1,_0x4b302f,_0x4a3e9e,_0x488b58,_0x48bf74);}}}return!![];},VisuMZ['SkillsStatesCore'][_0x421f4a(0x2f2)]=Game_Troop['prototype']['setup'],Game_Troop[_0x421f4a(0x12d)][_0x421f4a(0x1c1)]=function(_0x21a0a3){const _0x4ef0a6=_0x421f4a;VisuMZ[_0x4ef0a6(0x343)][_0x4ef0a6(0x2f2)]['call'](this,_0x21a0a3),this[_0x4ef0a6(0x22a)]();},Game_Troop['prototype'][_0x421f4a(0x22a)]=function(){const _0x8e98d0=_0x421f4a;this[_0x8e98d0(0x21a)]=Graphics['frameCount'];},Game_Troop[_0x421f4a(0x12d)][_0x421f4a(0x349)]=function(){const _0x1db108=_0x421f4a;return this[_0x1db108(0x21a)]=this['_currentTroopUniqueID']||Graphics[_0x1db108(0xf9)],this[_0x1db108(0x21a)];},Scene_Skill['prototype']['isBottomHelpMode']=function(){const _0x1c5535=_0x421f4a;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x1c5535(0x9f)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x1c5535(0x15f)]()){if(_0x1c5535(0x120)==='jhxzl'){function _0x9143e2(){const _0x299706=_0x1c5535;if(typeof _0x1ed8ec!==_0x299706(0x1a0))_0x522e8b=_0x566519['id'];this[_0x299706(0xf8)](_0x5e7c1d)&&(_0x164043+=this[_0x299706(0x2f4)](_0x391454),this['setStateTurns'](_0x3d892d,_0x355917));}}else return this[_0x1c5535(0x179)]()[_0x1c5535(0x258)](/LOWER/i);}else Scene_ItemBase[_0x1c5535(0x12d)]['isRightInputMode']['call'](this);}},Scene_Skill[_0x421f4a(0x12d)]['isRightInputMode']=function(){const _0x6a2f32=_0x421f4a;if(ConfigManager[_0x6a2f32(0x32c)]&&ConfigManager[_0x6a2f32(0x104)]!==undefined)return ConfigManager[_0x6a2f32(0x104)];else{if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x6a2f32(0x1e9)===_0x6a2f32(0x1e9))return this[_0x6a2f32(0x179)]()[_0x6a2f32(0x258)](/RIGHT/i);else{function _0x181e2c(){const _0x2b7cfa=_0x6a2f32;if(_0x5e76d5[_0x2b7cfa(0x1c5)])this[_0x2b7cfa(0x1e8)]();}}}else{if(_0x6a2f32(0x231)===_0x6a2f32(0x231))return Scene_ItemBase[_0x6a2f32(0x12d)][_0x6a2f32(0x2ae)][_0x6a2f32(0x245)](this);else{function _0xf95985(){const _0x15c574=_0x6a2f32;return!this['isStateResist'](_0x138e0a)&&!this['isStateRestrict'](_0xfca70)&&!this[_0x15c574(0x219)]['isStateRemoved'](_0x2b7556);}}}}},Scene_Skill[_0x421f4a(0x12d)]['updatedLayoutStyle']=function(){const _0xb79a8=_0x421f4a;return VisuMZ[_0xb79a8(0x343)][_0xb79a8(0x161)][_0xb79a8(0x297)][_0xb79a8(0x1eb)];},Scene_Skill[_0x421f4a(0x12d)][_0x421f4a(0x318)]=function(){const _0x24be87=_0x421f4a;return this[_0x24be87(0x2ab)]&&this[_0x24be87(0x2ab)]['isUseModernControls']();},Scene_Skill[_0x421f4a(0x12d)][_0x421f4a(0x15f)]=function(){const _0x391b68=_0x421f4a;return VisuMZ[_0x391b68(0x343)]['Settings'][_0x391b68(0x297)][_0x391b68(0xc7)];},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x352)]=Scene_Skill[_0x421f4a(0x12d)][_0x421f4a(0xed)],Scene_Skill[_0x421f4a(0x12d)][_0x421f4a(0xed)]=function(){const _0x5b49e2=_0x421f4a;if(this[_0x5b49e2(0x15f)]())return this[_0x5b49e2(0x2e1)]();else{if('UTzwQ'===_0x5b49e2(0x371))return VisuMZ[_0x5b49e2(0x343)][_0x5b49e2(0x352)]['call'](this);else{function _0x4dede5(){const _0x556862=_0x5b49e2;_0x22e614[_0x556862(0x343)]['Sprite_StateIcon_updateFrame'][_0x556862(0x245)](this),this['updateTurnDisplaySprite']();}}}},Scene_Skill[_0x421f4a(0x12d)][_0x421f4a(0x2e1)]=function(){const _0x582f33=_0x421f4a,_0x20173a=0x0,_0x24eabc=this[_0x582f33(0x2f5)](),_0x2e9768=Graphics[_0x582f33(0xf2)],_0x53bd6e=this[_0x582f33(0x1fd)]();return new Rectangle(_0x20173a,_0x24eabc,_0x2e9768,_0x53bd6e);},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x15b)]=Scene_Skill[_0x421f4a(0x12d)][_0x421f4a(0xde)],Scene_Skill[_0x421f4a(0x12d)][_0x421f4a(0xde)]=function(){const _0x5a454b=_0x421f4a;if(this[_0x5a454b(0x15f)]())return this[_0x5a454b(0x28c)]();else{if(_0x5a454b(0x292)!=='oWMrO')return VisuMZ[_0x5a454b(0x343)]['Scene_Skill_skillTypeWindowRect'][_0x5a454b(0x245)](this);else{function _0x24354c(){const _0x50c7db=_0x5a454b,_0x125332=_0xb985c5['$1'][_0x50c7db(0x14a)](/[\r\n]+/);for(const _0x2b86c7 of _0x125332){_0x47d0c7[_0x50c7db(0x1e0)][_0x50c7db(0x1e2)](_0x2b86c7['toUpperCase']()[_0x50c7db(0x210)]());}}}}},Scene_Skill['prototype'][_0x421f4a(0x28c)]=function(){const _0x2aa67e=_0x421f4a,_0x48c8b9=this[_0x2aa67e(0x246)](),_0x36b480=this[_0x2aa67e(0x2db)](0x3,!![]),_0x205d32=this['isRightInputMode']()?Graphics[_0x2aa67e(0xf2)]-_0x48c8b9:0x0,_0x2e035e=this[_0x2aa67e(0xca)]();return new Rectangle(_0x205d32,_0x2e035e,_0x48c8b9,_0x36b480);},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0xb4)]=Scene_Skill[_0x421f4a(0x12d)][_0x421f4a(0x1ed)],Scene_Skill[_0x421f4a(0x12d)][_0x421f4a(0x1ed)]=function(){const _0x5996be=_0x421f4a;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x5996be(0x361)]():VisuMZ['SkillsStatesCore'][_0x5996be(0xb4)][_0x5996be(0x245)](this);},Scene_Skill[_0x421f4a(0x12d)]['statusWindowRectSkillsStatesCore']=function(){const _0x29aa64=_0x421f4a,_0x2aa0c0=Graphics[_0x29aa64(0xf2)]-this[_0x29aa64(0x246)](),_0x1b8816=this[_0x29aa64(0x289)]['height'],_0x2177f6=this[_0x29aa64(0x2ae)]()?0x0:Graphics[_0x29aa64(0xf2)]-_0x2aa0c0,_0x340eb1=this[_0x29aa64(0xca)]();return new Rectangle(_0x2177f6,_0x340eb1,_0x2aa0c0,_0x1b8816);},VisuMZ['SkillsStatesCore'][_0x421f4a(0x12e)]=Scene_Skill[_0x421f4a(0x12d)][_0x421f4a(0x1b2)],Scene_Skill['prototype'][_0x421f4a(0x1b2)]=function(){const _0x3f4f47=_0x421f4a;VisuMZ[_0x3f4f47(0x343)][_0x3f4f47(0x12e)][_0x3f4f47(0x245)](this);if(this[_0x3f4f47(0x1da)]()){if(_0x3f4f47(0x106)!==_0x3f4f47(0x106)){function _0x72597(){const _0x408706=_0x3f4f47;if(_0x4e540c[_0x408706(0x30a)])return _0x4f9bee[_0x408706(0x30a)];else{if(_0x218c1e[_0x408706(0x34a)])return _0x3280ce['_currentActor'];}}}else this[_0x3f4f47(0x255)]();}},VisuMZ[_0x421f4a(0x343)]['Scene_Skill_itemWindowRect']=Scene_Skill[_0x421f4a(0x12d)][_0x421f4a(0x2b2)],Scene_Skill[_0x421f4a(0x12d)][_0x421f4a(0x2b2)]=function(){const _0x236b4e=_0x421f4a;if(this[_0x236b4e(0x15f)]()){if('ZIURh'!==_0x236b4e(0x153))return this[_0x236b4e(0xd8)]();else{function _0x4613ee(){const _0xb1b175=_0x236b4e;if(!_0x1377d6[_0xb1b175(0x343)][_0xb1b175(0x161)][_0xb1b175(0x2ac)]['ShowTurns'])return;if(!_0xdeca55['isStateAffected'](_0x48deaa['id']))return;if(_0x18fec0[_0xb1b175(0x12a)]===0x0)return;if(_0x27578b[_0xb1b175(0x357)][_0xb1b175(0x258)](/<HIDE STATE TURNS>/i))return;const _0x3c5e6a=_0x567ace['stateTurns'](_0x303033['id']),_0x6ffc54=_0x451df1[_0xb1b175(0x1a2)],_0x55828e=_0x3d82da[_0xb1b175(0x25c)](_0x11eb77);this[_0xb1b175(0x33b)](_0x55828e),this[_0xb1b175(0x366)](_0xb1b175(0x242)),this['contents']['fontBold']=!![],this[_0xb1b175(0xf7)][_0xb1b175(0x29f)]=_0x412876[_0xb1b175(0x343)][_0xb1b175(0x161)][_0xb1b175(0x2ac)]['TurnFontSize'],_0x2ffe85+=_0x29c052[_0xb1b175(0x343)][_0xb1b175(0x161)][_0xb1b175(0x2ac)]['TurnOffsetX'],_0x89bc8d+=_0x5b1949[_0xb1b175(0x343)][_0xb1b175(0x161)][_0xb1b175(0x2ac)]['TurnOffsetY'],this[_0xb1b175(0x36e)](_0x3c5e6a,_0x3c17cf,_0x4f0312,_0x6ffc54,_0xb1b175(0x1cb)),this[_0xb1b175(0xf7)][_0xb1b175(0x110)]=![],this[_0xb1b175(0x2b4)]();}}}else{if(_0x236b4e(0x2fc)==='GCMqU'){function _0x456a8e(){const _0x78391b=_0x236b4e;let _0x103198=this['currentValue']();return _0xb3c57f[_0x78391b(0x1c9)]&&this['useDigitGrouping']()&&(_0x103198=_0x130df1['GroupDigits'](_0x103198)),_0x103198;}}else{const _0x2bb0d2=VisuMZ[_0x236b4e(0x343)][_0x236b4e(0x385)][_0x236b4e(0x245)](this);return this['allowCreateShopStatusWindow']()&&this['adjustItemWidthByShopStatus']()&&(_0x2bb0d2[_0x236b4e(0x2e5)]-=this[_0x236b4e(0x345)]()),_0x2bb0d2;}}},Scene_Skill['prototype']['itemWindowRectSkillsStatesCore']=function(){const _0x36fb16=_0x421f4a,_0x2d69c3=Graphics[_0x36fb16(0xf2)]-this[_0x36fb16(0x345)](),_0x1e2d03=this[_0x36fb16(0x207)]()-this[_0x36fb16(0x35f)][_0x36fb16(0x26e)],_0x19d84e=this[_0x36fb16(0x2ae)]()?Graphics[_0x36fb16(0xf2)]-_0x2d69c3:0x0,_0x2fc868=this['_statusWindow']['y']+this['_statusWindow']['height'];return new Rectangle(_0x19d84e,_0x2fc868,_0x2d69c3,_0x1e2d03);},Scene_Skill['prototype'][_0x421f4a(0x1da)]=function(){const _0x55ec62=_0x421f4a;if(!Imported[_0x55ec62(0x302)]){if(_0x55ec62(0x20e)!==_0x55ec62(0x240))return![];else{function _0x3ed91f(){const _0x16868a=_0x55ec62;this[_0x16868a(0x1f7)](_0x143001,_0xb7a539);}}}else return this[_0x55ec62(0x15f)]()?!![]:VisuMZ['SkillsStatesCore']['Settings'][_0x55ec62(0x297)][_0x55ec62(0x1ac)];},Scene_Skill[_0x421f4a(0x12d)][_0x421f4a(0x250)]=function(){const _0x103368=_0x421f4a;return VisuMZ[_0x103368(0x343)][_0x103368(0x161)]['Skills']['SkillSceneAdjustSkillList'];},Scene_Skill[_0x421f4a(0x12d)][_0x421f4a(0x255)]=function(){const _0x1ec9db=_0x421f4a,_0x3e99b=this[_0x1ec9db(0x1f5)]();this[_0x1ec9db(0xa0)]=new Window_ShopStatus(_0x3e99b),this[_0x1ec9db(0x31e)](this[_0x1ec9db(0xa0)]),this['_itemWindow'][_0x1ec9db(0x1e5)](this[_0x1ec9db(0xa0)]);const _0x2b1d89=VisuMZ[_0x1ec9db(0x343)][_0x1ec9db(0x161)][_0x1ec9db(0x297)][_0x1ec9db(0x11a)];this[_0x1ec9db(0xa0)][_0x1ec9db(0x171)](_0x2b1d89||0x0);},Scene_Skill['prototype']['shopStatusWindowRect']=function(){const _0x331c83=_0x421f4a;if(this[_0x331c83(0x15f)]())return this[_0x331c83(0x286)]();else{if(_0x331c83(0x358)===_0x331c83(0x1d3)){function _0x53cfd9(){const _0x2c4a58=_0x331c83;this[_0x2c4a58(0x19f)]=this[_0x2c4a58(0x19f)]||{};if(this['_stypeIDs'][_0xda6da['id']])return this[_0x2c4a58(0x19f)][_0x938295['id']];this['_stypeIDs'][_0x302f8a['id']]=[_0x948fc2[_0x2c4a58(0x19b)]];if(_0x4f6dba[_0x2c4a58(0x357)][_0x2c4a58(0x258)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3d73e5=_0x8ccbb9['parse']('['+_0x1a4d10['$1']['match'](/\d+/g)+']');this[_0x2c4a58(0x19f)][_0x4b06fa['id']]=this[_0x2c4a58(0x19f)][_0x54dcbe['id']]['concat'](_0x3d73e5);}else{if(_0x19c8ba[_0x2c4a58(0x357)][_0x2c4a58(0x258)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x4af190=_0x4c7b05['$1'][_0x2c4a58(0x14a)](',');for(const _0x2a2853 of _0x4af190){const _0x36c7d2=_0x24e538['getStypeIdWithName'](_0x2a2853);if(_0x36c7d2)this[_0x2c4a58(0x19f)][_0x729553['id']][_0x2c4a58(0x1e2)](_0x36c7d2);}}}return this[_0x2c4a58(0x19f)][_0x472fd7['id']];}}else return VisuMZ[_0x331c83(0x343)][_0x331c83(0x161)][_0x331c83(0x297)][_0x331c83(0x101)][_0x331c83(0x245)](this);}},Scene_Skill[_0x421f4a(0x12d)][_0x421f4a(0x286)]=function(){const _0x3e1c4f=_0x421f4a,_0x121590=this[_0x3e1c4f(0x345)](),_0x4c9684=this[_0x3e1c4f(0xee)][_0x3e1c4f(0x26e)],_0x9fe0bc=this['isRightInputMode']()?0x0:Graphics[_0x3e1c4f(0xf2)]-this['shopStatusWidth'](),_0x172332=this[_0x3e1c4f(0xee)]['y'];return new Rectangle(_0x9fe0bc,_0x172332,_0x121590,_0x4c9684);},Scene_Skill[_0x421f4a(0x12d)][_0x421f4a(0x345)]=function(){const _0x34185a=_0x421f4a;if(Imported[_0x34185a(0x302)])return Scene_Shop[_0x34185a(0x12d)]['statusWidth']();else{if('jvIOa'!=='DjjjS')return 0x0;else{function _0x43faac(){const _0x3633d3=_0x34185a;if(!this[_0x3633d3(0xda)][_0x3633d3(0x248)](_0x898a0))return!![];}}}},Scene_Skill[_0x421f4a(0x12d)]['buttonAssistText1']=function(){const _0x326f6e=_0x421f4a;if(this['_skillTypeWindow']&&this[_0x326f6e(0x289)]['active'])return TextManager[_0x326f6e(0x14d)];else{if('hStEd'!=='hStEd'){function _0x7f66a3(){const _0x156c1b=_0x326f6e;for(const _0x45c35a of _0x517a9e){_0x45c35a[_0x156c1b(0x258)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x1030db=_0x4f7fd7['indexOf'](_0x2e9472(_0x2a1194['$1'])[_0x156c1b(0xbe)]()),_0x59250e=_0x272437(_0x1c67c2['$2']);_0x1030db>=0x0&&(_0x128368[_0x156c1b(0x199)](_0x1030db,_0x59250e),this[_0x156c1b(0x223)](_0x2a18a8));}}}else return'';}},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x28a)]=Sprite_Gauge[_0x421f4a(0x12d)]['initMembers'],Sprite_Gauge[_0x421f4a(0x12d)][_0x421f4a(0x23d)]=function(){const _0x446072=_0x421f4a;VisuMZ[_0x446072(0x343)][_0x446072(0x28a)][_0x446072(0x245)](this),this[_0x446072(0xc9)]=null;},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x121)]=Sprite_Gauge[_0x421f4a(0x12d)][_0x421f4a(0x1c1)],Sprite_Gauge[_0x421f4a(0x12d)][_0x421f4a(0x1c1)]=function(_0x4d88e7,_0x2c5e2b){const _0xa3357c=_0x421f4a;this[_0xa3357c(0x321)](_0x4d88e7,_0x2c5e2b),_0x2c5e2b=_0x2c5e2b['toLowerCase'](),VisuMZ[_0xa3357c(0x343)][_0xa3357c(0x121)]['call'](this,_0x4d88e7,_0x2c5e2b);},Sprite_Gauge[_0x421f4a(0x12d)][_0x421f4a(0x321)]=function(_0x1291f1,_0x59ac71){const _0x470650=_0x421f4a,_0x1dfb4b=VisuMZ['SkillsStatesCore'][_0x470650(0x161)][_0x470650(0x21e)][_0x470650(0x195)](_0x3eabfe=>_0x3eabfe['Name'][_0x470650(0xbe)]()===_0x59ac71[_0x470650(0xbe)]());if(_0x1dfb4b[_0x470650(0x249)]>=0x1)this[_0x470650(0xc9)]=_0x1dfb4b[0x0];else{if('MPoKI'!==_0x470650(0x266))this[_0x470650(0xc9)]=null;else{function _0x5189f6(){const _0x3fcd49=_0x470650;_0x55f516=this[_0x3fcd49(0x17b)]();}}}},VisuMZ['SkillsStatesCore'][_0x421f4a(0x27f)]=Sprite_Gauge[_0x421f4a(0x12d)][_0x421f4a(0x2c0)],Sprite_Gauge[_0x421f4a(0x12d)]['currentValue']=function(){const _0x29bc0c=_0x421f4a;if(this[_0x29bc0c(0x251)]&&this[_0x29bc0c(0xc9)]){if('YVJYv'===_0x29bc0c(0x18d))return this[_0x29bc0c(0x14e)]();else{function _0x381866(){const _0x37fb0e=_0x29bc0c;if(!_0x7fb538[_0x37fb0e(0x168)](_0x35a80c))return!![];}}}else{if('kIxzv'!==_0x29bc0c(0x1b7))return VisuMZ[_0x29bc0c(0x343)][_0x29bc0c(0x27f)][_0x29bc0c(0x245)](this);else{function _0xd0cf62(){return!![];}}}},Sprite_Gauge[_0x421f4a(0x12d)][_0x421f4a(0x14e)]=function(){const _0x525591=_0x421f4a;return this[_0x525591(0xc9)]['GaugeCurrentJS'][_0x525591(0x245)](this[_0x525591(0x251)]);},VisuMZ['SkillsStatesCore']['Sprite_Gauge_currentMaxValue']=Sprite_Gauge['prototype'][_0x421f4a(0x26c)],Sprite_Gauge[_0x421f4a(0x12d)][_0x421f4a(0x26c)]=function(){const _0x588da9=_0x421f4a;if(this[_0x588da9(0x251)]&&this['_costSettings']){if(_0x588da9(0x14f)!==_0x588da9(0x271))return this[_0x588da9(0x1b5)]();else{function _0x4ca4f2(){_0x363730+=_0x121e41+0x18;}}}else return VisuMZ['SkillsStatesCore'][_0x588da9(0x163)][_0x588da9(0x245)](this);},Sprite_Gauge['prototype'][_0x421f4a(0x1b5)]=function(){const _0x5a51b4=_0x421f4a;return this[_0x5a51b4(0xc9)][_0x5a51b4(0x20c)]['call'](this[_0x5a51b4(0x251)]);},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0xe7)]=Sprite_Gauge['prototype'][_0x421f4a(0x1a3)],Sprite_Gauge[_0x421f4a(0x12d)][_0x421f4a(0x1a3)]=function(){const _0x4e30aa=_0x421f4a,_0x20a6ca=VisuMZ['SkillsStatesCore'][_0x4e30aa(0xe7)][_0x4e30aa(0x245)](this);return _0x20a6ca[_0x4e30aa(0x325)](0x0,0x1);},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x2cc)]=Sprite_Gauge[_0x421f4a(0x12d)]['redraw'],Sprite_Gauge[_0x421f4a(0x12d)]['redraw']=function(){const _0x2a0a94=_0x421f4a;this[_0x2a0a94(0x251)]&&this[_0x2a0a94(0xc9)]?(this['bitmap'][_0x2a0a94(0x222)](),this[_0x2a0a94(0xf6)]()):VisuMZ['SkillsStatesCore']['Sprite_Gauge_redraw']['call'](this);},Sprite_Gauge['prototype']['currentDisplayedValue']=function(){const _0x48a809=_0x421f4a;let _0x482c7=this[_0x48a809(0x2c0)]();if(Imported['VisuMZ_0_CoreEngine']&&this[_0x48a809(0x2a1)]()){if('vRyDk'===_0x48a809(0x247)){function _0xa733bf(){const _0x17700a=_0x48a809,_0x4b323c=this[_0x17700a(0x11c)](_0x803383),_0x1ac1b0=_0x4b323c['name'];if(_0x4b323c)this['alterSkillName'](_0x4b323c);_0x50b656[_0x17700a(0x343)][_0x17700a(0x156)][_0x17700a(0x245)](this,_0x27073f);if(_0x4b323c)_0x4b323c[_0x17700a(0x123)]=_0x1ac1b0;}}else _0x482c7=VisuMZ[_0x48a809(0x13f)](_0x482c7);}return _0x482c7;},Sprite_Gauge['prototype'][_0x421f4a(0xf6)]=function(){const _0x543a02=_0x421f4a;this[_0x543a02(0xc9)]['GaugeDrawJS'][_0x543a02(0x245)](this);},Sprite_Gauge[_0x421f4a(0x12d)][_0x421f4a(0x12f)]=function(_0x176132,_0x287c44,_0x5161e8,_0x110ae8,_0x41656b,_0x3c60fd){const _0x5832f5=_0x421f4a,_0x2f3bd3=this[_0x5832f5(0x1a3)](),_0x2dc5ed=Math[_0x5832f5(0x239)]((_0x41656b-0x2)*_0x2f3bd3),_0x8d0e74=_0x3c60fd-0x2,_0x389aa2=this['gaugeBackColor']();this['bitmap'][_0x5832f5(0xc3)](_0x5161e8,_0x110ae8,_0x41656b,_0x3c60fd,_0x389aa2),this[_0x5832f5(0x344)][_0x5832f5(0x150)](_0x5161e8+0x1,_0x110ae8+0x1,_0x2dc5ed,_0x8d0e74,_0x176132,_0x287c44);},VisuMZ['SkillsStatesCore'][_0x421f4a(0x37a)]=Sprite_StateIcon[_0x421f4a(0x12d)][_0x421f4a(0xef)],Sprite_StateIcon[_0x421f4a(0x12d)]['loadBitmap']=function(){const _0x30d714=_0x421f4a;VisuMZ[_0x30d714(0x343)][_0x30d714(0x37a)][_0x30d714(0x245)](this),this['createTurnDisplaySprite']();},Sprite_StateIcon[_0x421f4a(0x12d)][_0x421f4a(0xfe)]=function(){const _0x73ab25=_0x421f4a,_0x2b1a79=Window_Base[_0x73ab25(0x12d)][_0x73ab25(0x206)]();this[_0x73ab25(0x112)]=new Sprite(),this[_0x73ab25(0x112)]['bitmap']=new Bitmap(ImageManager[_0x73ab25(0x1a2)],_0x2b1a79),this[_0x73ab25(0x112)][_0x73ab25(0xd3)]['x']=this[_0x73ab25(0xd3)]['x'],this['_turnDisplaySprite'][_0x73ab25(0xd3)]['y']=this[_0x73ab25(0xd3)]['y'],this[_0x73ab25(0x2d6)](this['_turnDisplaySprite']),this['contents']=this['_turnDisplaySprite'][_0x73ab25(0x344)];},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x2c7)]=Sprite_StateIcon[_0x421f4a(0x12d)][_0x421f4a(0x216)],Sprite_StateIcon[_0x421f4a(0x12d)]['updateFrame']=function(){const _0x5d24bb=_0x421f4a;VisuMZ[_0x5d24bb(0x343)][_0x5d24bb(0x2c7)][_0x5d24bb(0x245)](this),this[_0x5d24bb(0x1c4)]();},Sprite_StateIcon[_0x421f4a(0x12d)][_0x421f4a(0x36e)]=function(_0x5976ec,_0x53770f,_0x5de369,_0x4b4fc2,_0x5a7857){const _0x85d3ab=_0x421f4a;this[_0x85d3ab(0xf7)][_0x85d3ab(0x36e)](_0x5976ec,_0x53770f,_0x5de369,_0x4b4fc2,this[_0x85d3ab(0xf7)][_0x85d3ab(0x26e)],_0x5a7857);},Sprite_StateIcon['prototype'][_0x421f4a(0x1c4)]=function(){const _0x2dff9c=_0x421f4a;this['resetFontSettings'](),this['contents'][_0x2dff9c(0x222)]();const _0x33256b=this[_0x2dff9c(0x251)];if(!_0x33256b)return;const _0x55fb16=_0x33256b[_0x2dff9c(0x139)]()[_0x2dff9c(0x195)](_0x4048ab=>_0x4048ab[_0x2dff9c(0x2ec)]>0x0),_0x54a632=[...Array(0x8)[_0x2dff9c(0x2a5)]()][_0x2dff9c(0x195)](_0x36da1f=>_0x33256b[_0x2dff9c(0x1bd)](_0x36da1f)!==0x0),_0x3b639f=this['_animationIndex'],_0x36f641=_0x55fb16[_0x3b639f];if(_0x36f641)Window_Base[_0x2dff9c(0x12d)][_0x2dff9c(0x1ae)][_0x2dff9c(0x245)](this,_0x33256b,_0x36f641,0x0,0x0),Window_Base[_0x2dff9c(0x12d)]['drawActorStateData'][_0x2dff9c(0x245)](this,_0x33256b,_0x36f641,0x0,0x0);else{const _0x37328d=_0x54a632[_0x3b639f-_0x55fb16[_0x2dff9c(0x249)]];if(_0x37328d===undefined)return;Window_Base[_0x2dff9c(0x12d)][_0x2dff9c(0x22f)][_0x2dff9c(0x245)](this,_0x33256b,_0x37328d,0x0,0x0),Window_Base[_0x2dff9c(0x12d)][_0x2dff9c(0x28f)]['call'](this,_0x33256b,_0x37328d,0x0,0x0);}},Sprite_StateIcon['prototype'][_0x421f4a(0x2b4)]=function(){const _0x2148c5=_0x421f4a;this['contents'][_0x2148c5(0xa5)]=$gameSystem[_0x2148c5(0x13d)](),this[_0x2148c5(0xf7)][_0x2148c5(0x29f)]=$gameSystem[_0x2148c5(0x351)](),this[_0x2148c5(0x29c)]();},Sprite_StateIcon[_0x421f4a(0x12d)][_0x421f4a(0x29c)]=function(){const _0x3000e7=_0x421f4a;this[_0x3000e7(0x33b)](ColorManager['normalColor']()),this[_0x3000e7(0x366)](ColorManager[_0x3000e7(0xac)]());},Sprite_StateIcon['prototype']['changeTextColor']=function(_0x1a2e87){const _0x5ca773=_0x421f4a;this[_0x5ca773(0xf7)][_0x5ca773(0x312)]=_0x1a2e87;},Sprite_StateIcon[_0x421f4a(0x12d)]['changeOutlineColor']=function(_0x1918f7){const _0xecceed=_0x421f4a;this[_0xecceed(0xf7)][_0xecceed(0xac)]=_0x1918f7;},Sprite_StateIcon['prototype'][_0x421f4a(0xbf)]=function(){const _0x4937ad=_0x421f4a;this[_0x4937ad(0xa9)]=!![],this[_0x4937ad(0x1d0)]();},Window_Base['prototype']['drawSkillCost']=function(_0x3cb77b,_0x1ca13b,_0x590ddf,_0x18d771,_0x4b3b05){const _0x80e4da=_0x421f4a,_0x386b9a=this[_0x80e4da(0x29d)](_0x3cb77b,_0x1ca13b),_0x52b779=this[_0x80e4da(0x17a)](_0x386b9a,_0x590ddf,_0x18d771,_0x4b3b05),_0x158399=_0x590ddf+_0x4b3b05-_0x52b779[_0x80e4da(0x2e5)];this[_0x80e4da(0x2a8)](_0x386b9a,_0x158399,_0x18d771,_0x4b3b05),this['resetFontSettings']();},Window_Base[_0x421f4a(0x12d)][_0x421f4a(0x29d)]=function(_0x2f6fbf,_0x51b015){const _0x41be07=_0x421f4a;let _0x236979='';for(settings of VisuMZ[_0x41be07(0x343)]['Settings'][_0x41be07(0x21e)]){if(!this[_0x41be07(0x193)](_0x2f6fbf,_0x51b015,settings))continue;if(_0x236979[_0x41be07(0x249)]>0x0)_0x236979+=this[_0x41be07(0xff)]();_0x236979+=this['createSkillCostText'](_0x2f6fbf,_0x51b015,settings);}_0x236979=this[_0x41be07(0x291)](_0x2f6fbf,_0x51b015,_0x236979);if(_0x51b015[_0x41be07(0x357)][_0x41be07(0x258)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x236979[_0x41be07(0x249)]>0x0)_0x236979+=this[_0x41be07(0xff)]();_0x236979+=String(RegExp['$1']);}return _0x236979;},Window_Base['prototype'][_0x421f4a(0x291)]=function(_0x32402f,_0x570095,_0xf5e72c){return _0xf5e72c;},Window_Base[_0x421f4a(0x12d)][_0x421f4a(0x193)]=function(_0x5eccbd,_0x19d5a9,_0x11a2b4){const _0x514c01=_0x421f4a,_0x31f785=_0x11a2b4[_0x514c01(0x2cd)][_0x514c01(0x245)](_0x5eccbd,_0x19d5a9);return _0x11a2b4[_0x514c01(0x330)][_0x514c01(0x245)](_0x5eccbd,_0x19d5a9,_0x31f785,_0x11a2b4);},Window_Base[_0x421f4a(0x12d)][_0x421f4a(0xad)]=function(_0x5264eb,_0x1e2453,_0x1fa521){const _0x212727=_0x421f4a,_0x9fcdd8=_0x1fa521[_0x212727(0x2cd)][_0x212727(0x245)](_0x5264eb,_0x1e2453);return _0x1fa521['TextJS']['call'](_0x5264eb,_0x1e2453,_0x9fcdd8,_0x1fa521);},Window_Base[_0x421f4a(0x12d)][_0x421f4a(0xff)]=function(){return'\x20';},Window_Base[_0x421f4a(0x12d)][_0x421f4a(0x264)]=function(_0x5b5f52,_0x3eabc3,_0x4dfde5,_0x15ede9){const _0x46c79f=_0x421f4a;if(!_0x5b5f52)return;VisuMZ[_0x46c79f(0x343)]['Window_StatusBase_drawActorIcons'][_0x46c79f(0x245)](this,_0x5b5f52,_0x3eabc3,_0x4dfde5,_0x15ede9),this['drawActorIconsAllTurnCounters'](_0x5b5f52,_0x3eabc3,_0x4dfde5,_0x15ede9);},Window_Base[_0x421f4a(0x12d)]['drawActorIconsAllTurnCounters']=function(_0x3905c6,_0x246898,_0x3c43ec,_0xed3599){const _0x4bb947=_0x421f4a;_0xed3599=_0xed3599||0x90;const _0x2abfa6=ImageManager['iconWidth'],_0x4c98d6=_0x3905c6['allIcons']()[_0x4bb947(0x303)](0x0,Math[_0x4bb947(0x239)](_0xed3599/_0x2abfa6)),_0x2fe876=_0x3905c6[_0x4bb947(0x139)]()[_0x4bb947(0x195)](_0x1fcec3=>_0x1fcec3[_0x4bb947(0x2ec)]>0x0),_0x446d79=[...Array(0x8)['keys']()][_0x4bb947(0x195)](_0x5d6e31=>_0x3905c6[_0x4bb947(0x1bd)](_0x5d6e31)!==0x0),_0x1e4d2d=[];let _0x19be76=_0x246898;for(let _0x18f7a4=0x0;_0x18f7a4<_0x4c98d6['length'];_0x18f7a4++){if(_0x4bb947(0x2f9)!==_0x4bb947(0x2f9)){function _0x2bffdd(){return this['shopStatusWindowRectSkillsStatesCore']();}}else{this[_0x4bb947(0x2b4)]();const _0x3d77b0=_0x2fe876[_0x18f7a4];if(_0x3d77b0){if(_0x4bb947(0x1b4)===_0x4bb947(0x227)){function _0x1b3070(){const _0x544168=_0x4bb947;_0x51c01a['push'](_0x98da39[_0x544168(0x1a1)](_0xb1ec4e));}}else{if(!_0x1e4d2d['includes'](_0x3d77b0)){if(_0x4bb947(0x25a)===_0x4bb947(0xbc)){function _0x53b75d(){const _0x14b7eb=_0x4bb947;this[_0x14b7eb(0x2b4)]();const _0x1e0511=_0x2d3d2b[_0x45d29];if(_0x1e0511)!_0x24f8b6[_0x14b7eb(0x1f2)](_0x1e0511)&&this[_0x14b7eb(0x1ae)](_0x482df2,_0x1e0511,_0x1bfbc2,_0x18d816),this[_0x14b7eb(0x2d8)](_0xf6286e,_0x1e0511,_0xccc834,_0x362039),_0xc5d089[_0x14b7eb(0x1e2)](_0x1e0511);else{const _0x12a298=_0x38f192[_0x39d529-_0x22a3a8[_0x14b7eb(0x249)]];this[_0x14b7eb(0x22f)](_0x437575,_0x12a298,_0x552934,_0x3176fc),this[_0x14b7eb(0x28f)](_0x3156aa,_0x12a298,_0x1267a7,_0x32ba37);}_0x5a5ecd+=_0x12a666;}}else this['drawActorStateTurns'](_0x3905c6,_0x3d77b0,_0x19be76,_0x3c43ec);}this[_0x4bb947(0x2d8)](_0x3905c6,_0x3d77b0,_0x19be76,_0x3c43ec),_0x1e4d2d[_0x4bb947(0x1e2)](_0x3d77b0);}}else{if(_0x4bb947(0x332)===_0x4bb947(0x2f8)){function _0x245304(){const _0x5dea9e=_0x4bb947;if(this[_0x5dea9e(0xda)][_0x5dea9e(0x225)](_0x31283d))return![];}}else{const _0x4610b8=_0x446d79[_0x18f7a4-_0x2fe876[_0x4bb947(0x249)]];this[_0x4bb947(0x22f)](_0x3905c6,_0x4610b8,_0x19be76,_0x3c43ec),this['drawActorBuffRates'](_0x3905c6,_0x4610b8,_0x19be76,_0x3c43ec);}}_0x19be76+=_0x2abfa6;}}},Window_Base[_0x421f4a(0x12d)][_0x421f4a(0x1ae)]=function(_0x45c9b0,_0x2f90ac,_0x5874fb,_0x3b0982){const _0x4125a2=_0x421f4a;if(!VisuMZ[_0x4125a2(0x343)]['Settings'][_0x4125a2(0x2ac)][_0x4125a2(0x1b9)])return;if(!_0x45c9b0[_0x4125a2(0xf8)](_0x2f90ac['id']))return;if(_0x2f90ac[_0x4125a2(0x12a)]===0x0)return;if(_0x2f90ac[_0x4125a2(0x357)][_0x4125a2(0x258)](/<HIDE STATE TURNS>/i))return;const _0x4ee9f2=_0x45c9b0[_0x4125a2(0x2f4)](_0x2f90ac['id']),_0x17a4e1=ImageManager[_0x4125a2(0x1a2)],_0x3f675d=ColorManager[_0x4125a2(0x25c)](_0x2f90ac);this[_0x4125a2(0x33b)](_0x3f675d),this['changeOutlineColor'](_0x4125a2(0x242)),this[_0x4125a2(0xf7)][_0x4125a2(0x110)]=!![],this['contents'][_0x4125a2(0x29f)]=VisuMZ['SkillsStatesCore']['Settings']['States'][_0x4125a2(0x2e0)],_0x5874fb+=VisuMZ['SkillsStatesCore'][_0x4125a2(0x161)][_0x4125a2(0x2ac)][_0x4125a2(0x154)],_0x3b0982+=VisuMZ[_0x4125a2(0x343)][_0x4125a2(0x161)]['States'][_0x4125a2(0x329)],this[_0x4125a2(0x36e)](_0x4ee9f2,_0x5874fb,_0x3b0982,_0x17a4e1,_0x4125a2(0x1cb)),this[_0x4125a2(0xf7)][_0x4125a2(0x110)]=![],this[_0x4125a2(0x2b4)]();},Window_Base[_0x421f4a(0x12d)][_0x421f4a(0x2d8)]=function(_0x4ca25a,_0xe0181,_0x45dd03,_0x5e660c){const _0x324dcd=_0x421f4a;if(!VisuMZ[_0x324dcd(0x343)][_0x324dcd(0x161)][_0x324dcd(0x2ac)]['ShowData'])return;const _0x1a7d42=ImageManager[_0x324dcd(0x1a2)],_0x3312c3=ImageManager[_0x324dcd(0x374)]/0x2,_0x55d9cd=ColorManager[_0x324dcd(0x28e)]();this[_0x324dcd(0x33b)](_0x55d9cd),this[_0x324dcd(0x366)](_0x324dcd(0x242)),this[_0x324dcd(0xf7)]['fontBold']=!![],this[_0x324dcd(0xf7)][_0x324dcd(0x29f)]=VisuMZ['SkillsStatesCore']['Settings']['States'][_0x324dcd(0x252)],_0x45dd03+=VisuMZ[_0x324dcd(0x343)]['Settings']['States'][_0x324dcd(0x2ad)],_0x5e660c+=VisuMZ[_0x324dcd(0x343)][_0x324dcd(0x161)]['States'][_0x324dcd(0x114)];const _0x213cb9=String(_0x4ca25a[_0x324dcd(0x379)](_0xe0181['id']));this[_0x324dcd(0x36e)](_0x213cb9,_0x45dd03,_0x5e660c,_0x1a7d42,_0x324dcd(0x124)),this[_0x324dcd(0xf7)]['fontBold']=![],this[_0x324dcd(0x2b4)]();},Window_Base[_0x421f4a(0x12d)][_0x421f4a(0x22f)]=function(_0x57269d,_0x49e7f9,_0x53574f,_0x54e7c1){const _0x2b332c=_0x421f4a;if(!VisuMZ['SkillsStatesCore'][_0x2b332c(0x161)][_0x2b332c(0x2f0)][_0x2b332c(0x1b9)])return;const _0x164959=_0x57269d[_0x2b332c(0x1bd)](_0x49e7f9);if(_0x164959===0x0)return;const _0x557e54=_0x57269d['buffTurns'](_0x49e7f9),_0x57bab0=ImageManager[_0x2b332c(0x1a2)],_0x2d8b75=_0x164959>0x0?ColorManager[_0x2b332c(0x2aa)]():ColorManager[_0x2b332c(0x2d4)]();this[_0x2b332c(0x33b)](_0x2d8b75),this[_0x2b332c(0x366)](_0x2b332c(0x242)),this[_0x2b332c(0xf7)][_0x2b332c(0x110)]=!![],this[_0x2b332c(0xf7)]['fontSize']=VisuMZ[_0x2b332c(0x343)][_0x2b332c(0x161)][_0x2b332c(0x2f0)][_0x2b332c(0x2e0)],_0x53574f+=VisuMZ['SkillsStatesCore']['Settings']['Buffs'][_0x2b332c(0x154)],_0x54e7c1+=VisuMZ[_0x2b332c(0x343)][_0x2b332c(0x161)][_0x2b332c(0x2f0)]['TurnOffsetY'],this[_0x2b332c(0x36e)](_0x557e54,_0x53574f,_0x54e7c1,_0x57bab0,'right'),this['contents'][_0x2b332c(0x110)]=![],this[_0x2b332c(0x2b4)]();},Window_Base[_0x421f4a(0x12d)][_0x421f4a(0x28f)]=function(_0x5ee651,_0xbecc13,_0x389c45,_0x130580){const _0x3238da=_0x421f4a;if(!VisuMZ[_0x3238da(0x343)][_0x3238da(0x161)][_0x3238da(0x2f0)][_0x3238da(0x311)])return;const _0x52d6f0=_0x5ee651[_0x3238da(0x116)](_0xbecc13),_0x3ab9de=_0x5ee651[_0x3238da(0x1bd)](_0xbecc13),_0x5a5a78=ImageManager[_0x3238da(0x1a2)],_0x3eb720=ImageManager['iconHeight']/0x2,_0x1aabff=_0x3ab9de>0x0?ColorManager['buffColor']():ColorManager['debuffColor']();this[_0x3238da(0x33b)](_0x1aabff),this[_0x3238da(0x366)](_0x3238da(0x242)),this[_0x3238da(0xf7)][_0x3238da(0x110)]=!![],this[_0x3238da(0xf7)][_0x3238da(0x29f)]=VisuMZ[_0x3238da(0x343)][_0x3238da(0x161)][_0x3238da(0x2f0)][_0x3238da(0x252)],_0x389c45+=VisuMZ[_0x3238da(0x343)][_0x3238da(0x161)]['Buffs']['DataOffsetX'],_0x130580+=VisuMZ[_0x3238da(0x343)][_0x3238da(0x161)][_0x3238da(0x2f0)][_0x3238da(0x114)];const _0x28ba1d=_0x3238da(0x18e)[_0x3238da(0x25e)](Math['round'](_0x52d6f0*0x64));this['drawText'](_0x28ba1d,_0x389c45,_0x130580,_0x5a5a78,_0x3238da(0x124)),this['contents']['fontBold']=![],this[_0x3238da(0x2b4)]();},VisuMZ[_0x421f4a(0x343)]['Window_StatusBase_placeGauge']=Window_StatusBase[_0x421f4a(0x12d)][_0x421f4a(0x33f)],Window_StatusBase[_0x421f4a(0x12d)][_0x421f4a(0x33f)]=function(_0x44188e,_0xdd7022,_0x127ca4,_0x58a772){const _0x59f599=_0x421f4a;if(_0x44188e[_0x59f599(0x27a)]())_0xdd7022=this[_0x59f599(0x2a0)](_0x44188e,_0xdd7022);this[_0x59f599(0x214)](_0x44188e,_0xdd7022,_0x127ca4,_0x58a772);},Window_StatusBase[_0x421f4a(0x12d)][_0x421f4a(0x214)]=function(_0x1f9369,_0x6aec9c,_0x34f802,_0x3c74dc){const _0x3050a=_0x421f4a;if(['none',_0x3050a(0x382)][_0x3050a(0x1f2)](_0x6aec9c[_0x3050a(0x29b)]()))return;VisuMZ[_0x3050a(0x343)][_0x3050a(0x1fa)]['call'](this,_0x1f9369,_0x6aec9c,_0x34f802,_0x3c74dc);},Window_StatusBase[_0x421f4a(0x12d)][_0x421f4a(0x2a0)]=function(_0x4243c4,_0x25eff5){const _0x32fdd8=_0x421f4a,_0x490bbf=_0x4243c4[_0x32fdd8(0x10e)]()[_0x32fdd8(0x357)];if(_0x25eff5==='hp'&&_0x490bbf[_0x32fdd8(0x258)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x25eff5==='mp'&&_0x490bbf[_0x32fdd8(0x258)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x25eff5==='tp'&&_0x490bbf[_0x32fdd8(0x258)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x25eff5;}},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x16a)]=Window_StatusBase[_0x421f4a(0x12d)][_0x421f4a(0x264)],Window_StatusBase[_0x421f4a(0x12d)][_0x421f4a(0x264)]=function(_0x72f12d,_0x19bfe6,_0x36409b,_0x296808){const _0x228c61=_0x421f4a;if(!_0x72f12d)return;Window_Base[_0x228c61(0x12d)]['drawActorIcons'][_0x228c61(0x245)](this,_0x72f12d,_0x19bfe6,_0x36409b,_0x296808);},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x16c)]=Window_SkillType['prototype']['initialize'],Window_SkillType[_0x421f4a(0x12d)][_0x421f4a(0xb0)]=function(_0x3873ce){const _0x167299=_0x421f4a;VisuMZ[_0x167299(0x343)][_0x167299(0x16c)]['call'](this,_0x3873ce),this[_0x167299(0xa1)](_0x3873ce);},Window_SkillType[_0x421f4a(0x12d)][_0x421f4a(0xa1)]=function(_0x1e9e88){const _0x158c32=_0x421f4a,_0x1d1aa3=new Rectangle(0x0,0x0,_0x1e9e88['width'],_0x1e9e88[_0x158c32(0x26e)]);this[_0x158c32(0x1f8)]=new Window_Base(_0x1d1aa3),this[_0x158c32(0x1f8)]['opacity']=0x0,this[_0x158c32(0x2d6)](this[_0x158c32(0x1f8)]),this['updateCommandNameWindow']();},Window_SkillType[_0x421f4a(0x12d)][_0x421f4a(0x32a)]=function(){const _0x58f067=_0x421f4a;Window_Command['prototype'][_0x58f067(0x32a)]['call'](this);if(this[_0x58f067(0x1f8)])this['updateCommandNameWindow']();},Window_SkillType[_0x421f4a(0x12d)]['updateCommandNameWindow']=function(){const _0x7e7e3a=_0x421f4a,_0x21d31e=this[_0x7e7e3a(0x1f8)];_0x21d31e['contents'][_0x7e7e3a(0x222)]();const _0x4beeed=this[_0x7e7e3a(0x1fc)](this['index']());if(_0x4beeed===_0x7e7e3a(0x37e)&&this[_0x7e7e3a(0x141)]()>0x0){if(_0x7e7e3a(0x373)!==_0x7e7e3a(0xb5)){const _0x19a716=this[_0x7e7e3a(0x2a4)](this[_0x7e7e3a(0x296)]());let _0x54f9a0=this['commandName'](this[_0x7e7e3a(0x296)]());_0x54f9a0=_0x54f9a0[_0x7e7e3a(0x316)](/\\I\[(\d+)\]/gi,''),_0x21d31e[_0x7e7e3a(0x2b4)](),this[_0x7e7e3a(0x111)](_0x54f9a0,_0x19a716),this['commandNameWindowDrawText'](_0x54f9a0,_0x19a716),this['commandNameWindowCenter'](_0x54f9a0,_0x19a716);}else{function _0x348e16(){const _0x8f6d7c=_0x7e7e3a;return _0x5e7faf[_0x8f6d7c(0x343)][_0x8f6d7c(0x352)][_0x8f6d7c(0x245)](this);}}}},Window_SkillType[_0x421f4a(0x12d)]['commandNameWindowDrawBackground']=function(_0x44f79e,_0xf123fa){},Window_SkillType[_0x421f4a(0x12d)][_0x421f4a(0x1a7)]=function(_0x10bb24,_0x21078f){const _0x2a975f=_0x421f4a,_0x44c04e=this[_0x2a975f(0x1f8)];_0x44c04e[_0x2a975f(0x36e)](_0x10bb24,0x0,_0x21078f['y'],_0x44c04e['innerWidth'],'center');},Window_SkillType[_0x421f4a(0x12d)][_0x421f4a(0x1f0)]=function(_0x229d2c,_0x52dff8){const _0x40b68f=_0x421f4a,_0x51452d=this[_0x40b68f(0x1f8)],_0x3f0f80=$gameSystem['windowPadding'](),_0x41029d=_0x52dff8['x']+Math[_0x40b68f(0x239)](_0x52dff8[_0x40b68f(0x2e5)]/0x2)+_0x3f0f80;_0x51452d['x']=_0x51452d[_0x40b68f(0x2e5)]/-0x2+_0x41029d,_0x51452d['y']=Math[_0x40b68f(0x239)](_0x52dff8[_0x40b68f(0x26e)]/0x2);},Window_SkillType['prototype'][_0x421f4a(0x318)]=function(){const _0x390a45=_0x421f4a;return Imported[_0x390a45(0x1c9)]&&Window_Command[_0x390a45(0x12d)][_0x390a45(0x318)]['call'](this);},Window_SkillType['prototype']['makeCommandList']=function(){const _0x13409f=_0x421f4a;if(!this[_0x13409f(0xda)])return;const _0x480e48=this[_0x13409f(0xda)][_0x13409f(0x209)]();for(const _0x23112a of _0x480e48){const _0x5295ff=this[_0x13409f(0x1c8)](_0x23112a);this[_0x13409f(0x1cd)](_0x5295ff,'skill',!![],_0x23112a);}},Window_SkillType[_0x421f4a(0x12d)]['makeCommandName']=function(_0x4fa1a4){const _0x5638d1=_0x421f4a;let _0x57b3d5=$dataSystem[_0x5638d1(0x209)][_0x4fa1a4];if(_0x57b3d5[_0x5638d1(0x258)](/\\I\[(\d+)\]/i))return _0x57b3d5;if(this[_0x5638d1(0x315)]()===_0x5638d1(0xb1))return _0x57b3d5;const _0x1ca9c0=VisuMZ[_0x5638d1(0x343)]['Settings'][_0x5638d1(0x297)],_0x31f685=$dataSystem['magicSkills']['includes'](_0x4fa1a4),_0x39ab68=_0x31f685?_0x1ca9c0[_0x5638d1(0x1c2)]:_0x1ca9c0[_0x5638d1(0x2e7)];return _0x5638d1(0x133)['format'](_0x39ab68,_0x57b3d5);},Window_SkillType['prototype']['itemTextAlign']=function(){const _0x980361=_0x421f4a;return VisuMZ[_0x980361(0x343)][_0x980361(0x161)][_0x980361(0x297)][_0x980361(0xdc)];},Window_SkillType[_0x421f4a(0x12d)][_0x421f4a(0x147)]=function(_0x95ea73){const _0x27e8a3=_0x421f4a,_0x44dde5=this[_0x27e8a3(0x1fc)](_0x95ea73);if(_0x44dde5===_0x27e8a3(0x323))this[_0x27e8a3(0xe2)](_0x95ea73);else _0x44dde5===_0x27e8a3(0x37e)?this[_0x27e8a3(0x176)](_0x95ea73):Window_Command[_0x27e8a3(0x12d)]['drawItem'][_0x27e8a3(0x245)](this,_0x95ea73);},Window_SkillType['prototype'][_0x421f4a(0x315)]=function(){const _0x43d51a=_0x421f4a;return VisuMZ[_0x43d51a(0x343)][_0x43d51a(0x161)][_0x43d51a(0x297)][_0x43d51a(0x2bf)];},Window_SkillType[_0x421f4a(0x12d)]['commandStyleCheck']=function(_0x5d8c3f){const _0x25a7d4=_0x421f4a;if(_0x5d8c3f<0x0)return'text';const _0x2fb7f6=this[_0x25a7d4(0x315)]();if(_0x2fb7f6!==_0x25a7d4(0x16f)){if('uTffn'===_0x25a7d4(0xf3)){function _0x472d68(){const _0x1a4dc9=_0x25a7d4;return _0x1a4dc9(0x306)[_0x1a4dc9(0x25e)](_0x54e69a[_0x1a4dc9(0x22c)]());}}else return _0x2fb7f6;}else{if(this['maxItems']()>0x0){if(_0x25a7d4(0x1e6)!==_0x25a7d4(0x1e6)){function _0x275fa6(){const _0x54f8c6=_0x25a7d4;return _0x3c9756[_0x54f8c6(0x166)](_0x2e5223)[_0x54f8c6(0x1f2)](this[_0x54f8c6(0xb7)]);}}else{const _0x3662b3=this[_0x25a7d4(0xc6)](_0x5d8c3f);if(_0x3662b3[_0x25a7d4(0x258)](/\\I\[(\d+)\]/i)){const _0x2484c7=this[_0x25a7d4(0x2a4)](_0x5d8c3f),_0x510260=this[_0x25a7d4(0x17a)](_0x3662b3)['width'];return _0x510260<=_0x2484c7[_0x25a7d4(0x2e5)]?_0x25a7d4(0x323):_0x25a7d4(0x37e);}}}}return'text';},Window_SkillType['prototype'][_0x421f4a(0xe2)]=function(_0x437603){const _0x56ef27=_0x421f4a,_0x2bf337=this['itemLineRect'](_0x437603),_0x12f8bc=this[_0x56ef27(0xc6)](_0x437603),_0x1f1510=this[_0x56ef27(0x17a)](_0x12f8bc)[_0x56ef27(0x2e5)];this['changePaintOpacity'](this[_0x56ef27(0x338)](_0x437603));const _0x1fdd33=this['itemTextAlign']();if(_0x1fdd33===_0x56ef27(0x1cb))this[_0x56ef27(0x2a8)](_0x12f8bc,_0x2bf337['x']+_0x2bf337[_0x56ef27(0x2e5)]-_0x1f1510,_0x2bf337['y'],_0x1f1510);else{if(_0x1fdd33===_0x56ef27(0x124)){const _0x5e275d=_0x2bf337['x']+Math['floor']((_0x2bf337[_0x56ef27(0x2e5)]-_0x1f1510)/0x2);this[_0x56ef27(0x2a8)](_0x12f8bc,_0x5e275d,_0x2bf337['y'],_0x1f1510);}else{if('sOhKn'!==_0x56ef27(0x280))this[_0x56ef27(0x2a8)](_0x12f8bc,_0x2bf337['x'],_0x2bf337['y'],_0x1f1510);else{function _0x314d08(){const _0x52a510=_0x56ef27;if(typeof _0x55c8e6!==_0x52a510(0x1a0))_0x5dfa48=_0x537090['id'];this[_0x52a510(0x262)]=this[_0x52a510(0x262)]||{},this['_stateDisplay'][_0x333332]='';}}}}},Window_SkillType['prototype'][_0x421f4a(0x176)]=function(_0x4908fe){const _0x2668a8=_0x421f4a;this['commandName'](_0x4908fe)[_0x2668a8(0x258)](/\\I\[(\d+)\]/i);const _0x5953bc=Number(RegExp['$1'])||0x0,_0x253c1f=this['itemLineRect'](_0x4908fe),_0x4e4465=_0x253c1f['x']+Math['floor']((_0x253c1f['width']-ImageManager[_0x2668a8(0x1a2)])/0x2),_0xa8b47f=_0x253c1f['y']+(_0x253c1f['height']-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x5953bc,_0x4e4465,_0xa8b47f);},VisuMZ['SkillsStatesCore'][_0x421f4a(0x170)]=Window_SkillStatus[_0x421f4a(0x12d)][_0x421f4a(0x26f)],Window_SkillStatus[_0x421f4a(0x12d)][_0x421f4a(0x26f)]=function(){const _0x1fa3cc=_0x421f4a;VisuMZ[_0x1fa3cc(0x343)][_0x1fa3cc(0x170)][_0x1fa3cc(0x245)](this);if(this['_actor'])this['drawExtendedSkillsStatesCoreStatus']();},Window_SkillStatus[_0x421f4a(0x12d)][_0x421f4a(0x232)]=function(){const _0x472de2=_0x421f4a;if(!Imported[_0x472de2(0x1c9)])return;if(!Imported[_0x472de2(0x129)])return;const _0x111f41=this['gaugeLineHeight']();let _0x2274f1=this[_0x472de2(0x272)]()/0x2+0xb4+0xb4+0xb4,_0x3a73b5=this[_0x472de2(0x36b)]-_0x2274f1-0x2;if(_0x3a73b5>=0x12c){const _0x30e1b8=VisuMZ['CoreEngine'][_0x472de2(0x161)][_0x472de2(0x299)][_0x472de2(0x109)],_0x53823a=Math[_0x472de2(0x239)](_0x3a73b5/0x2)-0x18;let _0x447541=_0x2274f1,_0x55cf3b=Math[_0x472de2(0x239)]((this[_0x472de2(0x235)]-Math[_0x472de2(0x1f9)](_0x30e1b8[_0x472de2(0x249)]/0x2)*_0x111f41)/0x2),_0x1b0c66=0x0;for(const _0x17e7a6 of _0x30e1b8){this[_0x472de2(0x18f)](_0x447541,_0x55cf3b,_0x53823a,_0x17e7a6),_0x1b0c66++,_0x1b0c66%0x2===0x0?(_0x447541=_0x2274f1,_0x55cf3b+=_0x111f41):_0x447541+=_0x53823a+0x18;}}this[_0x472de2(0x2b4)]();},Window_SkillStatus[_0x421f4a(0x12d)][_0x421f4a(0x18f)]=function(_0x279aad,_0x25975c,_0x173a28,_0x447d77){const _0x340a54=_0x421f4a,_0x40fea1=this['gaugeLineHeight']();this[_0x340a54(0x2b4)](),this['drawParamText'](_0x279aad,_0x25975c,_0x173a28,_0x447d77,!![]),this[_0x340a54(0x29c)](),this[_0x340a54(0xf7)][_0x340a54(0x29f)]-=0x8;const _0x307755=this[_0x340a54(0xda)][_0x340a54(0x1b0)](_0x447d77,!![]);this[_0x340a54(0xf7)]['drawText'](_0x307755,_0x279aad,_0x25975c,_0x173a28,_0x40fea1,_0x340a54(0x1cb));},VisuMZ[_0x421f4a(0x343)]['Window_SkillList_includes']=Window_SkillList[_0x421f4a(0x12d)][_0x421f4a(0x1f2)],Window_SkillList[_0x421f4a(0x12d)][_0x421f4a(0x1f2)]=function(_0x5b64b1){return this['includesSkillsStatesCore'](_0x5b64b1);},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x35d)]=Window_SkillList[_0x421f4a(0x12d)][_0x421f4a(0x119)],Window_SkillList[_0x421f4a(0x12d)][_0x421f4a(0x119)]=function(){const _0x6882b8=_0x421f4a;return SceneManager[_0x6882b8(0x381)]['constructor']===Scene_Battle?VisuMZ['SkillsStatesCore'][_0x6882b8(0x35d)][_0x6882b8(0x245)](this):VisuMZ[_0x6882b8(0x343)][_0x6882b8(0x161)][_0x6882b8(0x297)][_0x6882b8(0x118)];},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x128)]=Window_SkillList[_0x421f4a(0x12d)][_0x421f4a(0x175)],Window_SkillList[_0x421f4a(0x12d)][_0x421f4a(0x175)]=function(_0x328e6c){const _0x98141f=_0x421f4a,_0x2032df=this[_0x98141f(0xda)]!==_0x328e6c;VisuMZ[_0x98141f(0x343)][_0x98141f(0x128)][_0x98141f(0x245)](this,_0x328e6c);if(_0x2032df){if(_0x98141f(0x263)==='XgmFC')this[_0x98141f(0x35f)]&&this[_0x98141f(0x35f)][_0x98141f(0x1b3)]===Window_ShopStatus&&this[_0x98141f(0x35f)]['setItem'](this[_0x98141f(0x11c)](0x0));else{function _0x5b3f4a(){const _0x1ac37b=_0x98141f,_0x391d56=this['getStateRetainType']();if(_0x391d56!==''){const _0x2f96c1=_0x4b8020['note'];if(_0x391d56==='death'&&_0x2f96c1[_0x1ac37b(0x258)](/<NO DEATH CLEAR>/i))return![];if(_0x391d56===_0x1ac37b(0x1d8)&&_0x2f96c1[_0x1ac37b(0x258)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x1ac37b(0xf8)](_0x368105['id']);}}}},Window_SkillList[_0x421f4a(0x12d)][_0x421f4a(0x36a)]=function(_0x38f6bd){const _0x533f9e=_0x421f4a;if(this['_stypeId']===_0x38f6bd)return;this[_0x533f9e(0xb7)]=_0x38f6bd,this[_0x533f9e(0x26f)](),this[_0x533f9e(0x169)](0x0,0x0);if(this[_0x533f9e(0x35f)]&&this['_statusWindow'][_0x533f9e(0x1b3)]===Window_ShopStatus){if('ayruD'!==_0x533f9e(0x2be))this[_0x533f9e(0x35f)][_0x533f9e(0x220)](this[_0x533f9e(0x11c)](0x0));else{function _0x25dd50(){const _0x390863=_0x533f9e;if(_0x51e529&&this['canClearState'](_0x2c0b9b))this[_0x390863(0xd4)](_0x5dcfcb['id']);}}}},Window_SkillList[_0x421f4a(0x12d)][_0x421f4a(0x259)]=function(_0x4de130){const _0xfdbcfc=_0x421f4a;if(!_0x4de130)return VisuMZ[_0xfdbcfc(0x343)][_0xfdbcfc(0x30d)][_0xfdbcfc(0x245)](this,_0x4de130);if(!this[_0xfdbcfc(0x135)](_0x4de130))return![];if(!this[_0xfdbcfc(0x31b)](_0x4de130))return![];if(!this[_0xfdbcfc(0x1ff)](_0x4de130))return![];return!![];},Window_SkillList[_0x421f4a(0x12d)][_0x421f4a(0x135)]=function(_0xce13aa){const _0x318d8d=_0x421f4a;return DataManager[_0x318d8d(0x166)](_0xce13aa)[_0x318d8d(0x1f2)](this['_stypeId']);},Window_SkillList[_0x421f4a(0x12d)][_0x421f4a(0x31b)]=function(_0x310ee6){const _0x43cd4a=_0x421f4a;if(!this[_0x43cd4a(0x191)](_0x310ee6))return![];if(!this[_0x43cd4a(0x27b)](_0x310ee6))return![];if(!this[_0x43cd4a(0xdf)](_0x310ee6))return![];return!![];},Window_SkillList[_0x421f4a(0x12d)][_0x421f4a(0x191)]=function(_0x24432c){const _0x634cca=_0x421f4a,_0x1232c0=_0x24432c[_0x634cca(0x357)];if(_0x1232c0[_0x634cca(0x258)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x634cca(0x10c)]())return![];else{if(_0x1232c0[_0x634cca(0x258)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x634cca(0x10c)]()){if(_0x634cca(0x256)!==_0x634cca(0x30c))return![];else{function _0x4d867f(){const _0x2144cd=_0x634cca;return this[_0x2144cd(0x179)]()['match'](/LOWER/i);}}}else{if(_0x634cca(0x2a9)!==_0x634cca(0x2a9)){function _0x5594ec(){if(!this['_actor']['isLearnedSkill'](_0x2b2bda))return![];}}else return!![];}}},Window_SkillList[_0x421f4a(0x12d)]['checkShowHideSwitchNotetags']=function(_0x43c1b8){const _0x414425=_0x421f4a,_0xb14ec4=_0x43c1b8['note'];if(_0xb14ec4[_0x414425(0x258)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4e0e82=JSON[_0x414425(0x22d)]('['+RegExp['$1'][_0x414425(0x258)](/\d+/g)+']');for(const _0x5bc12c of _0x4e0e82){if(!$gameSwitches[_0x414425(0x168)](_0x5bc12c))return![];}return!![];}if(_0xb14ec4[_0x414425(0x258)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x239ee4=JSON[_0x414425(0x22d)]('['+RegExp['$1'][_0x414425(0x258)](/\d+/g)+']');for(const _0xc0ac7f of _0x239ee4){if(!$gameSwitches[_0x414425(0x168)](_0xc0ac7f))return![];}return!![];}if(_0xb14ec4[_0x414425(0x258)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1058b4=JSON[_0x414425(0x22d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3ffac6 of _0x1058b4){if($gameSwitches[_0x414425(0x168)](_0x3ffac6))return!![];}return![];}if(_0xb14ec4[_0x414425(0x258)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x414425(0x189)!=='xfYHz'){function _0xbae952(){const _0x29d682=_0x414425,_0x1feac3=_0x5b3170[_0x48e8ad];if(_0x1feac3)_0x40bea0[_0x29d682(0x1e2)](_0x1feac3);}}else{const _0x5865ec=JSON[_0x414425(0x22d)]('['+RegExp['$1'][_0x414425(0x258)](/\d+/g)+']');for(const _0x2517f0 of _0x5865ec){if(!$gameSwitches[_0x414425(0x168)](_0x2517f0))return!![];}return![];}}if(_0xb14ec4[_0x414425(0x258)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x23d4b1=JSON[_0x414425(0x22d)]('['+RegExp['$1'][_0x414425(0x258)](/\d+/g)+']');for(const _0x497bd6 of _0x23d4b1){if(!$gameSwitches['value'](_0x497bd6))return!![];}return![];}if(_0xb14ec4['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x16963f=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x469c4d of _0x16963f){if($gameSwitches[_0x414425(0x168)](_0x469c4d))return![];}return!![];}return!![];},Window_SkillList[_0x421f4a(0x12d)][_0x421f4a(0xdf)]=function(_0x332838){const _0x22625e=_0x421f4a,_0x9d2828=_0x332838[_0x22625e(0x357)];if(_0x9d2828[_0x22625e(0x258)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x22625e(0x1d6)!==_0x22625e(0x1d6)){function _0x1e53fd(){const _0x41d3c0=_0x22625e;_0x24bad0(_0x41d3c0(0x2e6)[_0x41d3c0(0x25e)](_0x4cb764,_0x5c4b4b,_0x57d63a)),_0x212be3['exit']();}}else{const _0x30bb7c=JSON[_0x22625e(0x22d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x36c27b of _0x30bb7c){if(_0x22625e(0xa6)===_0x22625e(0xa6)){if(!this[_0x22625e(0xda)][_0x22625e(0x225)](_0x36c27b))return![];}else{function _0x5bec7c(){const _0x544c9d=_0x22625e;let _0x545dd8=[this[_0x544c9d(0x2b3)](),this[_0x544c9d(0x10e)]()];_0x545dd8=_0x545dd8[_0x544c9d(0x283)](this[_0x544c9d(0x237)]()[_0x544c9d(0x195)](_0x12ff29=>_0x12ff29));for(const _0x55d5cf of this[_0x544c9d(0x132)]){const _0x33c38a=_0x117ac8[_0x55d5cf];if(_0x33c38a)_0x545dd8[_0x544c9d(0x1e2)](_0x33c38a);}return _0x545dd8;}}}return!![];}}else{if(_0x9d2828[_0x22625e(0x258)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x22625e(0xb3)===_0x22625e(0xb3)){const _0x49dd12=RegExp['$1'][_0x22625e(0x14a)](',');for(const _0x28f0c9 of _0x49dd12){if(_0x22625e(0x9d)==='fpURf'){const _0x55731e=DataManager[_0x22625e(0x164)](_0x28f0c9);if(!_0x55731e)continue;if(!this['_actor'][_0x22625e(0x225)](_0x55731e))return![];}else{function _0x24b6a4(){const _0x110fce=_0x22625e;return this[_0x110fce(0x177)](_0x3b9e62);}}}return!![];}else{function _0x3e9ec9(){const _0x161ad1=_0x22625e,_0x110863=_0x2005c5[_0x161ad1(0x14a)](',');for(const _0x5b5f05 of _0x110863){const _0x2d891a=_0x3ba5c2[_0x161ad1(0x1d7)](_0x5b5f05);if(_0x2d891a)this[_0x161ad1(0x34b)][_0x161ad1(0xeb)][_0x161ad1(0x1e2)](_0x2d891a);}}}}}if(_0x9d2828[_0x22625e(0x258)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4a765d=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3f6ff2 of _0x4a765d){if(!this[_0x22625e(0xda)]['isLearnedSkill'](_0x3f6ff2))return![];}return!![];}else{if(_0x9d2828[_0x22625e(0x258)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x22625e(0x314)!=='RXGtM'){function _0x14cd92(){const _0x5a0faf=_0x22625e;return _0x1e4869['prototype'][_0x5a0faf(0x2ae)][_0x5a0faf(0x245)](this);}}else{const _0xb3690c=RegExp['$1'][_0x22625e(0x14a)](',');for(const _0x2cb2b3 of _0xb3690c){if(_0x22625e(0x1de)===_0x22625e(0x1de)){const _0x913a47=DataManager['getSkillIdWithName'](_0x2cb2b3);if(!_0x913a47)continue;if(!this[_0x22625e(0xda)][_0x22625e(0x225)](_0x913a47))return![];}else{function _0x285d2f(){const _0x5c30a2=_0x22625e;if(_0x2751d5[_0x5c30a2(0x168)](_0x3f88df))return!![];}}}return!![];}}}if(_0x9d2828[_0x22625e(0x258)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x367179=JSON[_0x22625e(0x22d)]('['+RegExp['$1'][_0x22625e(0x258)](/\d+/g)+']');for(const _0xf7c517 of _0x367179){if(_0x22625e(0x261)===_0x22625e(0x267)){function _0x52fc3a(){return![];}}else{if(this[_0x22625e(0xda)][_0x22625e(0x225)](_0xf7c517))return!![];}}return![];}else{if(_0x9d2828[_0x22625e(0x258)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x55e059=RegExp['$1'][_0x22625e(0x14a)](',');for(const _0x2e3a8f of _0x55e059){if(_0x22625e(0x29a)!=='hRQyr'){const _0x254f5a=DataManager[_0x22625e(0x164)](_0x2e3a8f);if(!_0x254f5a)continue;if(this['_actor']['isLearnedSkill'](_0x254f5a))return!![];}else{function _0x45c950(){if(!_0x312046['value'](_0x40f287))return![];}}}return![];}}if(_0x9d2828['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x167688=JSON[_0x22625e(0x22d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3a71f5 of _0x167688){if(_0x22625e(0x1a6)==='pUsjE'){function _0xd31f0(){this['onAddBuffGlobalJS'](_0x2936a0,_0x3d27d5);}}else{if(!this[_0x22625e(0xda)][_0x22625e(0x225)](_0x3a71f5))return!![];}}return![];}else{if(_0x9d2828['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5b5f8b=RegExp['$1'][_0x22625e(0x14a)](',');for(const _0x3c41dd of _0x5b5f8b){const _0xe33829=DataManager[_0x22625e(0x164)](_0x3c41dd);if(!_0xe33829)continue;if(!this[_0x22625e(0xda)][_0x22625e(0x225)](_0xe33829))return!![];}return![];}}if(_0x9d2828[_0x22625e(0x258)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x53b29d=JSON[_0x22625e(0x22d)]('['+RegExp['$1'][_0x22625e(0x258)](/\d+/g)+']');for(const _0x5a11a9 of _0x53b29d){if(!this[_0x22625e(0xda)][_0x22625e(0x225)](_0x5a11a9))return!![];}return![];}else{if(_0x9d2828[_0x22625e(0x258)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x110660=RegExp['$1']['split'](',');for(const _0x1c5b4e of _0x110660){const _0x15f72a=DataManager[_0x22625e(0x164)](_0x1c5b4e);if(!_0x15f72a)continue;if(!this[_0x22625e(0xda)]['isLearnedSkill'](_0x15f72a))return!![];}return![];}}if(_0x9d2828[_0x22625e(0x258)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x373bee=JSON[_0x22625e(0x22d)]('['+RegExp['$1'][_0x22625e(0x258)](/\d+/g)+']');for(const _0x4b1487 of _0x373bee){if(this[_0x22625e(0xda)]['isLearnedSkill'](_0x4b1487))return![];}return!![];}else{if(_0x9d2828[_0x22625e(0x258)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x22625e(0x1b8)==='gNMxr'){const _0x5e9fdb=RegExp['$1'][_0x22625e(0x14a)](',');for(const _0x105afc of _0x5e9fdb){const _0x2504b0=DataManager[_0x22625e(0x164)](_0x105afc);if(!_0x2504b0)continue;if(this[_0x22625e(0xda)][_0x22625e(0x225)](_0x2504b0))return![];}return!![];}else{function _0x55f985(){const _0xb2f069=_0x22625e;if(_0x49925d[_0xb2f069(0x168)](_0x2c1c5c))return![];}}}}if(_0x9d2828['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xc88a7b=JSON[_0x22625e(0x22d)]('['+RegExp['$1'][_0x22625e(0x258)](/\d+/g)+']');for(const _0x40c076 of _0xc88a7b){if(!this[_0x22625e(0xda)][_0x22625e(0x248)](_0x40c076))return![];}return!![];}else{if(_0x9d2828['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('xRVlL'!=='FokUO'){const _0x4cc2ee=RegExp['$1']['split'](',');for(const _0x4b7341 of _0x4cc2ee){const _0x362a67=DataManager[_0x22625e(0x164)](_0x4b7341);if(!_0x362a67)continue;if(!this[_0x22625e(0xda)][_0x22625e(0x248)](_0x362a67))return![];}return!![];}else{function _0x48332d(){const _0xcb02d6=_0x22625e;_0x33da60=_0x11c08d[_0xcb02d6(0x13f)](_0x5a427f);}}}}if(_0x9d2828['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x20a24a=JSON[_0x22625e(0x22d)]('['+RegExp['$1'][_0x22625e(0x258)](/\d+/g)+']');for(const _0x21b3a4 of _0x20a24a){if(!this['_actor'][_0x22625e(0x248)](_0x21b3a4))return![];}return!![];}else{if(_0x9d2828[_0x22625e(0x258)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xb2e0af=RegExp['$1']['split'](',');for(const _0x54dd76 of _0xb2e0af){if(_0x22625e(0x113)===_0x22625e(0x113)){const _0x3b6e71=DataManager['getSkillIdWithName'](_0x54dd76);if(!_0x3b6e71)continue;if(!this[_0x22625e(0xda)][_0x22625e(0x248)](_0x3b6e71))return![];}else{function _0xa981ea(){const _0x182a83=_0x22625e;return this[_0x182a83(0x28c)]();}}}return!![];}}if(_0x9d2828['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1b534c=JSON[_0x22625e(0x22d)]('['+RegExp['$1'][_0x22625e(0x258)](/\d+/g)+']');for(const _0x39e4e0 of _0x1b534c){if(this[_0x22625e(0xda)][_0x22625e(0x248)](_0x39e4e0))return!![];}return![];}else{if(_0x9d2828[_0x22625e(0x258)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1fa08d=RegExp['$1']['split'](',');for(const _0x3018a1 of _0x1fa08d){if(_0x22625e(0x2fe)===_0x22625e(0x24a)){function _0x116156(){const _0x31b122=_0x22625e;this[_0x31b122(0x35f)][_0x31b122(0x220)](this[_0x31b122(0x11c)](0x0));}}else{const _0x25d4be=DataManager[_0x22625e(0x164)](_0x3018a1);if(!_0x25d4be)continue;if(this[_0x22625e(0xda)][_0x22625e(0x248)](_0x25d4be))return!![];}}return![];}}if(_0x9d2828['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x482094=JSON[_0x22625e(0x22d)]('['+RegExp['$1'][_0x22625e(0x258)](/\d+/g)+']');for(const _0x51fb0f of _0x482094){if(!this[_0x22625e(0xda)][_0x22625e(0x248)](_0x51fb0f))return!![];}return![];}else{if(_0x9d2828['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1e2dac=RegExp['$1'][_0x22625e(0x14a)](',');for(const _0x9b1780 of _0x1e2dac){if(_0x22625e(0x35c)!==_0x22625e(0x218)){const _0x2d61b4=DataManager[_0x22625e(0x164)](_0x9b1780);if(!_0x2d61b4)continue;if(!this[_0x22625e(0xda)][_0x22625e(0x248)](_0x2d61b4))return!![];}else{function _0x522d93(){const _0x3adb56=_0x22625e;return this[_0x3adb56(0x288)](_0x4e5d71[_0x204106]);}}}return![];}}if(_0x9d2828[_0x22625e(0x258)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x22625e(0x100)===_0x22625e(0x2b6)){function _0x5ce5cc(){const _0x2bf560=_0x22625e,_0x2f0ef8=_0x1c37dd(_0x573a1e['$1']),_0x7d1d74=_0x5e74c3['format'](_0x2f0ef8);_0x40134b[_0x2bf560(0x343)][_0x2bf560(0x33d)][_0x322b3c['id']]=new _0x26dde3('stateId',_0x7d1d74);}}else{const _0x168fbf=JSON[_0x22625e(0x22d)]('['+RegExp['$1'][_0x22625e(0x258)](/\d+/g)+']');for(const _0x209329 of _0x168fbf){if(_0x22625e(0x24b)===_0x22625e(0x24b)){if(!this[_0x22625e(0xda)][_0x22625e(0x248)](_0x209329))return!![];}else{function _0x589c62(){const _0x595cee=_0x22625e,_0x142110=_0x33aedb[_0x595cee(0x22d)]('['+_0xed526b['$1']['match'](/\d+/g)+']');for(const _0x108c8d of _0x142110){if(_0x1aa6bd[_0x595cee(0x168)](_0x108c8d))return!![];}return![];}}}return![];}}else{if(_0x9d2828[_0x22625e(0x258)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5b3193=RegExp['$1'][_0x22625e(0x14a)](',');for(const _0x1a95a4 of _0x5b3193){const _0x296b4a=DataManager[_0x22625e(0x164)](_0x1a95a4);if(!_0x296b4a)continue;if(!this[_0x22625e(0xda)][_0x22625e(0x248)](_0x296b4a))return!![];}return![];}}if(_0x9d2828[_0x22625e(0x258)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x22625e(0x16d)!==_0x22625e(0x16d)){function _0x5b3ca9(){const _0x10d97c=_0x22625e;_0x5e32e7+=this[_0x10d97c(0x177)](_0x3fae5c),this[_0x10d97c(0x217)](_0x13adbd,_0x3bd662);}}else{const _0xc0721f=JSON[_0x22625e(0x22d)]('['+RegExp['$1'][_0x22625e(0x258)](/\d+/g)+']');for(const _0x12daae of _0xc0721f){if('NwjcU'!==_0x22625e(0x13e)){if(this['_actor'][_0x22625e(0x248)](_0x12daae))return![];}else{function _0x1601ed(){const _0x6a0fc6=_0x22625e;_0x390b02['setDebuffTurns'](_0x42af7c,_0x5e4ce6),this[_0x6a0fc6(0x223)](_0x673fb);}}}return!![];}}else{if(_0x9d2828[_0x22625e(0x258)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x22625e(0x1bf)!==_0x22625e(0x151)){const _0x5379e6=RegExp['$1']['split'](',');for(const _0x3e00aa of _0x5379e6){if('tkoWm'!==_0x22625e(0xe3)){function _0x3b8426(){const _0x58be0e=_0x22625e;if(typeof _0x15e2bc!==_0x58be0e(0x1a0))_0x341529=_0x46e154['id'];if(this[_0x58be0e(0xf8)](_0x5d0d42)){const _0x31ae1a=_0x37541c[_0x58be0e(0x270)](_0x4f64c1);this['_stateTurns'][_0x1a4e41]=_0x771b45[_0x58be0e(0x325)](0x0,_0x31ae1a);if(this['_stateTurns'][_0x2594fe]<=0x0)this['removeState'](_0x3f8e8b);}}}else{const _0x5e2a26=DataManager[_0x22625e(0x164)](_0x3e00aa);if(!_0x5e2a26)continue;if(this[_0x22625e(0xda)][_0x22625e(0x248)](_0x5e2a26))return![];}}return!![];}else{function _0x5066cb(){const _0x1bdbfd=_0x22625e,_0x4c05f2=_0x19a042[_0x1a11d0-_0x285e73[_0x1bdbfd(0x249)]];this['drawActorBuffTurns'](_0x37ef36,_0x4c05f2,_0x213472,_0x4e635c),this[_0x1bdbfd(0x28f)](_0x3cc0ca,_0x4c05f2,_0xdcdce2,_0x220593);}}}}return!![];},Window_SkillList[_0x421f4a(0x12d)][_0x421f4a(0x1ff)]=function(_0x30e406){const _0x349121=_0x421f4a,_0x59f49b=_0x30e406[_0x349121(0x357)],_0x5ef8df=VisuMZ[_0x349121(0x343)][_0x349121(0x30b)];if(_0x5ef8df[_0x30e406['id']])return _0x5ef8df[_0x30e406['id']]['call'](this,_0x30e406);else{if('hHDbi'==='hHDbi')return!![];else{function _0x4ba74f(){const _0x2a3530=_0x349121;_0x2515dc['SkillsStatesCore'][_0x2a3530(0x161)][_0x2a3530(0x2f0)][_0x2a3530(0x183)][_0x2a3530(0x245)](this,_0x174a43);}}}},VisuMZ[_0x421f4a(0x343)][_0x421f4a(0x156)]=Window_SkillList['prototype'][_0x421f4a(0x147)],Window_SkillList[_0x421f4a(0x12d)]['drawItem']=function(_0x2a1e42){const _0x506e81=_0x421f4a,_0x1c5ddf=this[_0x506e81(0x11c)](_0x2a1e42),_0x306b7a=_0x1c5ddf['name'];if(_0x1c5ddf)this[_0x506e81(0x10b)](_0x1c5ddf);VisuMZ['SkillsStatesCore'][_0x506e81(0x156)]['call'](this,_0x2a1e42);if(_0x1c5ddf)_0x1c5ddf[_0x506e81(0x123)]=_0x306b7a;},Window_SkillList[_0x421f4a(0x12d)][_0x421f4a(0x10b)]=function(_0xccd35e){const _0x5ac957=_0x421f4a;if(_0xccd35e&&_0xccd35e[_0x5ac957(0x357)][_0x5ac957(0x258)](/<LIST NAME:[ ](.*)>/i)){_0xccd35e['name']=String(RegExp['$1'])[_0x5ac957(0x210)]();for(;;){if(_0xccd35e[_0x5ac957(0x123)]['match'](/\\V\[(\d+)\]/gi)){if(_0x5ac957(0x1cc)===_0x5ac957(0x1cc))_0xccd35e[_0x5ac957(0x123)]=_0xccd35e[_0x5ac957(0x123)][_0x5ac957(0x316)](/\\V\[(\d+)\]/gi,(_0x5acba9,_0xe2901d)=>$gameVariables[_0x5ac957(0x168)](parseInt(_0xe2901d)));else{function _0x10c97b(){const _0x5c55ea=_0x5ac957;return _0x5c55ea(0x323);}}}else{if(_0x5ac957(0x174)!==_0x5ac957(0x369))break;else{function _0x5b3c91(){const _0x5c7e5d=_0x5ac957;if(!_0x4d7d8e['SkillsStatesCore'][_0x5c7e5d(0x161)]['States'][_0x5c7e5d(0x311)])return;const _0x3182e3=_0x5dcde2[_0x5c7e5d(0x1a2)],_0x1b496b=_0x3a7115[_0x5c7e5d(0x374)]/0x2,_0x2c99d3=_0x3b81b0[_0x5c7e5d(0x28e)]();this[_0x5c7e5d(0x33b)](_0x2c99d3),this[_0x5c7e5d(0x366)]('rgba(0,\x200,\x200,\x201)'),this[_0x5c7e5d(0xf7)][_0x5c7e5d(0x110)]=!![],this['contents']['fontSize']=_0x220e63[_0x5c7e5d(0x343)][_0x5c7e5d(0x161)][_0x5c7e5d(0x2ac)][_0x5c7e5d(0x252)],_0x59c807+=_0x32d7e9[_0x5c7e5d(0x343)][_0x5c7e5d(0x161)][_0x5c7e5d(0x2ac)][_0x5c7e5d(0x2ad)],_0xe0f222+=_0x1c4d85['SkillsStatesCore'][_0x5c7e5d(0x161)]['States'][_0x5c7e5d(0x114)];const _0x56c60a=_0x482f58(_0x1784f4[_0x5c7e5d(0x379)](_0x4f8842['id']));this['drawText'](_0x56c60a,_0x29dd61,_0x69d532,_0x3182e3,_0x5c7e5d(0x124)),this['contents']['fontBold']=![],this[_0x5c7e5d(0x2b4)]();}}}}}},Window_SkillList['prototype']['drawSkillCost']=function(_0x19eca0,_0x15b973,_0x431b04,_0x4f05d1){const _0x413d5c=_0x421f4a;Window_Base['prototype'][_0x413d5c(0x178)][_0x413d5c(0x245)](this,this[_0x413d5c(0xda)],_0x19eca0,_0x15b973,_0x431b04,_0x4f05d1);},Window_SkillList[_0x421f4a(0x12d)]['setStatusWindow']=function(_0x3065a3){const _0x103736=_0x421f4a;this[_0x103736(0x35f)]=_0x3065a3,this[_0x103736(0x32a)]();},VisuMZ['SkillsStatesCore'][_0x421f4a(0x167)]=Window_SkillList['prototype']['updateHelp'],Window_SkillList['prototype'][_0x421f4a(0x226)]=function(){const _0xd08ef3=_0x421f4a;VisuMZ[_0xd08ef3(0x343)]['Window_SkillList_updateHelp'][_0xd08ef3(0x245)](this);if(this[_0xd08ef3(0x35f)]&&this[_0xd08ef3(0x35f)][_0xd08ef3(0x1b3)]===Window_ShopStatus){if(_0xd08ef3(0x35e)!==_0xd08ef3(0x182))this['_statusWindow']['setItem'](this[_0xd08ef3(0x333)]());else{function _0x3dec50(){const _0x8b09fa=_0xd08ef3,_0x87a980=_0x3d915e[_0x8b09fa(0x2cd)][_0x8b09fa(0x245)](_0x2436b6,_0x12b34a);return _0xbd0dc3[_0x8b09fa(0x328)]['call'](_0x3c3c04,_0x1394ea,_0x87a980,_0x45292a);}}}};