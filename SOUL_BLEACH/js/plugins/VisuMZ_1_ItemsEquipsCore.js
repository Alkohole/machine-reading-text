//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.26;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.26] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
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
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for singul column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
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
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
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
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
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
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
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
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
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
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
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
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
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
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
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
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x4410=['Parse_Notetags_EquipSlots','Game_Actor_paramPlus','Scene_Shop_onBuyCancel','meetsItemConditionsJS','WKcRa','Speed2000','xsrFy','ExtDisplayedParams','SpeedNeg999','FpizE','gaugeBackColor','shift','ParamValueFontSize','MaxHP','FieldUsable','down','createItemWindow','mainFontFace','BvVlH','yOAdO','powerUpColor','WRIgB','LpcWx','CmdHideDisabled','511642QanYNH','KLjfy','+%1%','code','itemTextAlign','maxBattleMembers','bPjsL','setObject','addClearCommand','background','fqXWU','NRhHl','drawItemEquipType','OSOAM','sell','LabelConsume','mUJTU','IconSet','HtPaF','onSlotOk','isSceneShop','setStatusWindow','_categoryWindow','CmdCancelRename','efcTm','pPvmt','(%1)','OQtde','createCommandNameWindow','onBuyCancel','_scene','Scene_Equip_commandWindowRect','floor','nonOptimizeEtypes','getItemEffectsAddedStatesBuffsText','getItemDamageElementText','Window_ItemList_maxCols','refreshCursor','allowCreateStatusWindow','twvzn','FcgUJ','aUrqX','addChild','slotWindowRect','commandNameWindowDrawText','onMenuImageLoad','YgDqC','_tempActor','DKVVo','refresh','Step3Start','LBlsp','EFFECT_RECOVER_HP','isUseItemsEquipsCoreUpdatedLayout','addCommand','removeBuff','AVDwK','releaseUnequippableItems','UmwRz','itemWindowRectItemsEquipsCore','loadSystem','RDPQW','drawText','process_VisuMZ_ItemsEquipsCore_Notetags','5572115SPbiVL','sellingPrice','processDrawIcon','smoothSelect','Translucent','speed','axmuw','postCreateCategoryWindowItemsEquipsCore','drawItemSuccessRate','categoryStyle','top','goldWindowRectItemsEquipsCore','loadPicture','isEquipCommandEnabled','BatchShop','lCMPZ','trim','MANUAL','YYaBx','BackRectColor','ibJzd','ujtlc','getItemEffectsMpDamageLabel','create','left','yOXqd','isOpenAndActive','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','isSellCommandEnabled','Isxer','_forcedSlots','USER\x20TP\x20GAIN','commandName','mhp','characterName','isBuyCommandEnabled','tpGain','Window_ItemList_updateHelp','getItemConsumableLabel','hObyF','_resetFontColor','previousActor','updateHelp','lgANg','equip','nMOmV','ELEMENT','Scene_Shop_createSellWindow','EquipScene','hcRMb','name','_actor','itemWindowRect','forceResetEquipSlots','isHandled','EquipAdjustHpMp','actorParams','iKmRS','wCXZU','HAwUO','ScopeAlliesButUser','MoyDb','Game_Actor_tradeItemWithParty','Actors','getItemEffectsMpRecoveryText','EVAL','isEquipItem','CmdIconEquip','SpeedNeg2000','_resetFontSize','isOptimizeCommandEnabled','textWidth','DgJXj','setShopStatusWindowMode','CGZtw','updateNewLabelOpacity','mainFontSize','EggNF','values','onSellCancel','ejEte','onTouchSelectModern','getItemRepeatsLabel','_tempActorA','updateMoneyAmount','XdjyI','getItemScopeText','bxrGB','lkfNm','isClearCommandEnabled','jocKZ','commandBuyItemsEquipsCore','LabelDamageTP','drawItemEffectsHpRecovery','gainTP','price','determineBaseSellingPrice','categoryWindowRectItemsEquipsCore','helpWindowRect','isKeyItem','sellPriceRate','isClearEquipOk','iQakN','New','Game_Party_gainItem','buttonAssistItemListRequirement','ctyPF','_slotWindow','makeDeepCopy','drawItemEffectsHpDamage','_data','gWTdc','numberWindowRectItemsEquipsCore','uFfZv','PIevy','maxVisibleItems','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','DEF','JBvzS','getMatchingInitEquip','push','processHandling','select','EFFECT_ADD_BUFF','dRvhM','XnYAe','HVFUU','EnableLayout','isEquipCommandAdded','CmdTextAlign','show','canEquip','Window_EquipItem_includes','getItemEffectsRemovedStatesBuffsLabel','isCommandEnabled','nonRemovableEtypes','getItemHitTypeText','possession','bwVXC','rSUxl','drawParamsItemsEquipsCore','647312jNvaTD','parse','mslnl','ljvSX','formula','addLoadListener','weapon','JgnDp','isClicked','_commandNameWindow','buy','StatusWindow','getTextColor','addItemCategory','categoryNameWindowDrawText','move','sBVpn','cursorUp','RemoveEquipIcon','height','txTaE','equip2','bitmap','isGoodShown','LNlAV','statusWindowRect','createNewLabelSprite','processTouchModernControls','Scene_Equip_createSlotWindow','drawItemDarkRect','%1%','SpeedNeg1999','drawUpdatedBeforeParamValue','ShiftShortcutKey','BuyPriceJS','postCreateItemWindowModernControls','VrBIG','ConvertNumberToString','bestEquipItem','itemEnableJS','innerWidth','Step2Start','adjustHiddenShownGoods','commandNameWindowDrawBackground','prepareRefreshItemsEquipsCoreLayout','renzR','categoryStyleCheck','ytJus','Scene_Shop_commandSell','drawItemEffectsMpDamage','TextAlign','GlrpJ','ATK','\x5cI[%1]','buyWindowRect','drawItemEffectsMpRecovery','statusWindowRectItemsEquipsCore','ScopeRandomAny','buffIconIndex','CommandAddClear','drawEquipData','setTempActor','_money','Window_EquipStatus_refresh','SlEaN','DamageType%1','isPressed','buttonAssistCategory','isUseParamNamesWithIcons','Damage\x20Formula\x20Error\x20for\x20%1','wtypeId','changeTextColor','IncludeShopItem','boxWidth','Width','nJvCj','Scene_Equip_itemWindowRect','Speed1000','format','initNewLabelSprites','ZQnjY','getItemColor','cKDxC','MenuPortraits','W%1','buttonAssistKey1','atk','isBattleTest','ParseArmorNotetags','getColor','_statusWindow','value2','ItemQuantityFmt','KeyItems','buQgD','paramValueFontSize','_equips','drawCustomShopGraphicLoad','DAMAGE\x20MULTIPLIER','IFiDT','NeverUsable','hideNewLabelSprites','\x5cI[%1]%2','BorderRegExp','CmdIconClear','buttonAssistOffset3','pyYAd','AkWiZ','gainItem','value','loadCharacter','allowCommandWindowCursorUp','HiddenItemA','frImI','cancel','activateItemWindow','checkShiftRemoveShortcut','dataId','lgpKX','UtLlh','YeJvx','icon','buttonAssistKey3','iFEQY','Game_Party_initialize','Crzrc','Whitelist','category','UFHRe','jSTdM','text','TP\x20RECOVERY','vKlbl','ShowShopStatus','ARRAYEVAL','maxItemAmount','AlwaysUsable','rateHP','Window_ItemCategory_initialize','version','1486751lrwYdT','LFyaL','lineHeight','FontColor','xFdhG','Parse_Notetags_Batch','Scene_Item_create','setupItemDamageTempActors','SQqrj','kRzFV','helpWindowRectItemsEquipsCore','crkGH','prepare','commandStyleCheck','fillRect','drawItemEffectsTpRecovery','drawItemHitType','MaxMP','KBRgy','clearNewItem','Scene_Item_createCategoryWindow','Enable','YtKYY','getItemEffectsHpRecoveryLabel','REPEAT','NonRemoveETypes','Scene_Load_reloadMapIfUpdated','ZhsqM','Scene_Shop_activateSellWindow','numItems','drawItemKeyData','jVYPn','ODlOJ','onCategoryCancel','getItemEffectsRemovedStatesBuffsText','_numberWindow','rUyXd','DrawParamJS','isWeapon','Parse_Notetags_ParamJS','setItem','placeNewLabel','Scene_Equip_create','drawItemEffectsAddedStatesBuffs','QEtuG','Window_ShopBuy_refresh','onSellOk','drawItemCost','eXKUG','mainAreaTop','uOTjT','drawItemData','ARRAYSTR','Game_BattlerBase_meetsItemConditions','getItemEffectsHpRecoveryText','zdHpV','ANwmm','MaxWeapons','commandSell','updateCommandNameWindow','Style','Scene_Shop_numberWindowRect','equipTypes','toUpperCase','JHXVr','_newLabelOpacityChange','categoryNameWindowDrawBackground','jdqlA','innerHeight','isClearCommandAdded','MRATw','damage','call','KZdzJ','currentClass','drawItemNumber','YzvuP','equipAdjustHpMp','changeEquip','wwCRa','XEons','SaAGL','wlKqC','_bypassNewLabel','FyVeD','ListWindowCols','MP\x20DAMAGE','Consumable','uiHelpPosition','commandEquip','BattleUsable','changePaintOpacity','IZOHb','resetFontSettings','length','drawItemOccasion','vjJGr','drawItemEffects','xbTgw','Window_ItemCategory_setItemWindow','battleMembers','Step1End','itypeId','constructor','Scene_Shop_createCategoryWindow','wkznq','_itemData','RUuqN','LabelHitType','jFakA','hJVsB','buttonAssistText2','Scene_Item_itemWindowRect','WcPol','RhvWH','onTouchOk','Scene_Shop_sellWindowRect','SwitchSell','Scene_Shop_statusWindowRect','isRepeated','2ONokfA','onSlotOkAutoSelect','setHelpWindowItem','drawItemDamageAmount','getItemEffectsSelfTpGainLabel','YhfGg','gWZAn','wFxgJ','currentSymbol','atypeId','Speed0','VbWtL','SgatH','UZhZR','DrawIcons','DrawPortraitJS','calcWindowHeight','HP\x20RECOVERY','pop','createStatusWindow','RIplE','XtpIN','revertGlobalNamespaceVariables','process_VisuMZ_ItemsEquipsCore_RegExp','_item','isRightInputMode','fontSizeRatio','deactivate','itemDataFontSize','drawItemActorMenuImage','Scene_Equip_statusWindowRect','selfTP','makeItemData','isMainMenuCoreMenuImageOptionAvailable','KqUow','mwraw','commandNameWindowCenter','isShiftRemoveShortcutEnabled','abwwn','clearEquipments','addOptimizeCommand','AllItems','buyWindowRectItemsEquipsCore','LabelRecoverMP','createSlotWindow','return\x200','Parse_Notetags_ParamValues','Scene_Shop_onSellCancel','VYaxK','ARRAYNUM','auto','equipSlotIndex','getItemEffectsTpDamageLabel','tFaEy','Window_ShopCommand_initialize','AyzjS','anWfw','hitIndex','isBottomHelpMode','ShopScene','type','SUCCESS\x20RATE','splice','Window_ItemList_drawItem','uEjIh','LabelRepeats','includes','convertInitEquipsToItems','buttonAssistSlotWindowShift','drawNewLabelIcon','GsOII','getDamageStyle','index','MAT','fontSize','AGlHa','_newLabelOpacityUpperLimit','commandSellItemsEquipsCore','getItemDamageAmountTextOriginal','Scene_Equip_onSlotCancel','hitType','FontSize','HxCUG','paintOpacity','popScene','playCursorSound','KTXzP','getItemEffectsHpDamageText','Cazye','fill','onSlotCancel','zXucY','min','LHBec','setItemWindow','isEquipChangeOk','Window_EquipCommand_initialize','nextActor','iconHeight','prepareItemCustomData','postCreateSlotWindowItemsEquipsCore','successRate','LabelElement','RemoveEquipText','uiMenuStyle','OCCASION','Scene_Shop_categoryWindowRect','hide','textSizeEx','Scene_Shop_sellingPrice','hXkga','drawItemConsumable','Parse_Notetags_EnableJS','RegularItems','indexOf','isItem','paramJS','width','commandWindowRectItemsEquipsCore','changeEquipById','isOpen','FGsaZ','ParseWeaponNotetags','ItemQuantityFontSize','onSellOkItemsEquipsCore','drawItemQuantity','mpRate','updateCategoryNameWindow','Game_Actor_discardEquip','_buyWindow','CmdIconOptimize','setHp','drawItemRepeats','cursorPagedown','isCursorMovable','Scene_Equip_slotWindowRect','AlreadyEquipMarker','EFFECT_REMOVE_BUFF','drawItemCustomEntryLine','remove','CmdStyle','isUseModernControls','EFFECT_RECOVER_MP','getItemEffectsTpRecoveryText','jwXlD','VisuMZ_1_MainMenuCore','paramPlusItemsEquipsCoreCustomJS','goldWindowRect','right','Icon','getMenuImage','etypeId','isOptimizeCommandAdded','update','smallParamFontSize','DrawBackRect','NoChangeMarker','ActorChangeEquipSlots','drawItemDamageElement','map','drawItemDamage','getItemDamageElementLabel','initNewItemsList','kDlKR','money','VqEOM','VHqQb','isCancelled','CommandAddOptimize','buttonAssistText1','systemColor','damageColor','doSell','pageup','1590340GuPGLS','bwsBQ','(+%1)','getItemDamageAmountLabel','anpsg','DrawFaceJS','max','contentsBack','isShowNew','FadeLimit','CmPFj','ARRAYSTRUCT','drawItemStyleIconText','IhVIc','eNULY','categoryList','NjiQj','VisuMZ_0_CoreEngine','tradeItemWithParty','helpAreaTop','categoryItemTypes','Game_Actor_changeEquip','ParseItemNotetags','armorTypes','getItemQuantityText','active','A%1','stYkv','Gaxfg','modifiedBuyPriceItemsEquipsCore','ECPlD','Scene_Shop_prepare','drawIcon','forceChangeEquipSlots','isHovered','refreshItemsEquipsCoreNoMenuImage','SymQh','itemPadding','OXJPg','onCategoryCancelItemsEquipsCore','_newLabelOpacity','REulI','iconIndex','Window_EquipItem_isEnabled','cursorDown','hideDisabledCommands','_customItemInfo','cursorPageup','itemHasEquipLimit','jBCiN','xtLmH','ZnIhC','isNewItem','Parse_Notetags_Category','Game_BattlerBase_param','ADcoR','getItemsEquipsCoreBackColor2','iconText','equips','getItemDamageAmountLabelOriginal','removeStateBuffChanges','ParseAllNotetags','mainCommandWidth','_sellWindow','updatedLayoutStyle','removeDebuff','Step2End','itemAt','Step3End','ItemMenuStatusRect','toLowerCase','getItemEffectsAddedStatesBuffsLabel','fhrgf','registerCommand','eBntf','getItemOccasionText','addWindow','itemLineRect','center','isPlaytest','defaultItemMax','LCKed','Scene_Boot_onDatabaseLoaded','bVBWl','getItemEffectsMpRecoveryLabel','log','jeFBm','JMPaD','_doubleTouch','CannotEquipMarker','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','IeWpH','changeBuff','replace','getItemEffectsHpDamageLabel','maxItems','getItemSuccessRateLabel','_categoryNameWindow','Scene_Item_categoryWindowRect','amGdt','actor','updateChangedSlots','versionId','dhPIE','loadFaceImages','paramPlus','drawItem','KqMYd','drawParamText','wpxav','isArmor','flatHP','icTuw','getItemDamageAmountLabelBattleCore','onDatabaseLoaded','placeItemNewLabel','ceil','MultiplierStandard','EFFECT_GAIN_TP','XJFKu','processCursorMoveModernControls','FadeSpeed','paramId','getItemConsumableText','_calculatingJSParameters','ItemScene','_buttonAssistWindow','AllArmors','paramValueByName','0000','ilKUq','Param','Scope%1','normalColor','ShopMenuStatusStandard','89LLwoUC','_tempActorB','_purchaseOnly','\x5cb%1\x5cb','Occasion%1','Step1Start','match','isHoverEnabled','OffsetX','currencyUnit','maxCols','getItemDamageAmountText','Window_ShopSell_isEnabled','postCreateItemsEquipsCore','kHJql','ScopeRandomAllies','round','drawItemName','Window_Selectable_setHelpWindowItem','lorBC','mainAreaHeight','processCursorHomeEndTrigger','omokl','getItemSuccessRateText','Hzaca','YekSt','ZRekY','addBuyCommand','Scene_Shop_create','DhUOD','commandStyle','forceChangeEquip','sellWindowRectItemsEquipsCore','AVBeH','_handlers','setNewItem','item','%1-%2','CoreEngine','isSoleArmorType','Scene_Shop_onSellOk','reloadMapIfUpdated','jzWZw','HxDyc','paramchangeTextColor','geUpdatedLayoutStatusWidth','PmrDC','Slots','ARRAYFUNC','otnYQ','MVFhe','CONSUMABLE','_newItemsList','LNGqP','SellPriceJS','drawItemEffectsRemovedStatesBuffs','categoryWindowRect','addInnerChild','jLWDf','AKfqB','getItemSpeedLabel','postCreateSellWindowItemsEquipsCore','buttonAssistLargeIncrement','shouldCommandWindowExist','exit','ERDzj','weaponTypes','object','BPcSK','drawCustomShopGraphic','Lptqf','ItemMenuStatusBgType','onCategoryOk','consumable','windowPadding','drawItemStyleIcon','dYMHy','isSoleWeaponType','CJfGI','ADDED\x20EFFECTS','nWAgG','onTouchSelectModernControls','Scene_Equip_onSlotOk','clear','refreshActorEquipSlotsIfUpdated','NUM','drawing','flatMP','getItemsEquipsCoreBackColor1','saieU','PurchaseOnly','keyItem','isDrawItemNumber','hpRate','isShiftShortcutKeyForRemove','cPhIY','scrollTo','playOkSound','wSCon','WMkDv','smoothScrollTo','STRUCT','canShiftRemoveEquipment','EquipParams','Categories','addCancelCommand','discardEquip','currentExt','armor-%1','726883hhzuiy','drawParamName','prototype','GWsui','STR','AllWeapons','AXHou','onBuyCancelItemsEquipsCore','CmVTP','SwitchBuy','mmp','contents','isTriggered','drawPossession','AerRm','_commandWindow','XbsSw','description','limitedPageUpDownSceneCheck','LabelDamageMP','addStateBuffChanges','drawUpdatedAfterParamValue','gBtMv','getNextAvailableEtypeId','GHlOy','visible','cursorRight','unVMR','item-%1','processCursorMove','doBuy','itDde','getItemEffectsTpRecoveryLabel','_slotId','Scene_Shop_goldWindowRect','value1','_goodsCount','vCHcm','drawActorParamDifference','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ConvertParams','textColor','LXyHs','Window_ShopBuy_price','allowShiftScrolling','_list','statusWidth','newLabelEnabled','callUpdateHelp','JoTnK','categoryNameWindowCenter','RegExp','isOptimizeEquipOk','NzhLX','Game_Actor_forceChangeEquip','onTouchSelect','equipSlots','_shopStatusMenuMode','occasion','TP\x20DAMAGE','param','meetsItemConditionsNotetags','sellWindowRect','setBackgroundType','blt','optimize','iFrbh','parameters','commandWindowRect','initEquips','middle','setHandler','drawItemSpeed','sdbWM','QoL','hKxNG','getItemEffectsMpDamageText','pPEUX','resetShopSwitches','addEquipCommand','getItemEffectsTpDamageText','bind','activate','csSGI','helpAreaHeight','qGISg','opacity','NonOptimizeETypes','wbYxa','getInputMultiButtonStrings','MaxIcons','processCursorSpecialCheckModernControls','REMOVED\x20EFFECTS','clearNewLabelFromItem','1BkGGft','GTJKb','fFPvZ','members','prepareNewEquipSlotsOnLoad','armor','fontFace','KMkCr','uiInputPosition','process_VisuMZ_ItemsEquipsCore_EquipSlots','LayoutStyle','jxTRD','getItemRepeatsText','drawItemEffectsTpDamage','RhxKO','qEwXk','Window_Selectable_update','kfQJR','?????','IUDBZ','rGenP','isPageChangeRequested','getInputButtonString','Scene_Shop_onCategoryCancel','bepEC','filter','drawUpdatedParamValueDiff','optKeyItemsNumber','LeHOW','njGWP','Scene_Item_createItemWindow','categories','SIlng','_category','adjustItemWidthByStatus','initialize','nELsX','cursorLeft','note','IXNXY','Scene_Shop_doBuy','ItemsEquipsCore','#%1','drawRemoveItem','HP\x20DAMAGE','playBuzzerSound','clamp','tuNAC','VisuMZ_1_BattleCore','pagedown','Scene_ItemBase_activateItemWindow','10041NmQVar','JyETB','buttonAssistRemove','_shopStatusMenuAlly','Scene_Equip_onActorChange','+%1','_buyWindowLastIndex','Window_Selectable_initialize','createCategoryWindow','RTVQQ','NotConsumable','Scene_Equip_commandEquip','iconWidth','FzgOl','canUse','removeState','NYyCH','_itemWindow','setValue','Settings','LabelRecoverTP','BZufC','Window_ItemList_colSpacing','split','ScopeRandomEnemies','processShiftRemoveShortcut','MP\x20RECOVERY','getItemHitTypeLabel','PCnNY','Scene_Shop_commandBuy','LabelSpeed','setCategory','Parse_Notetags_Prices','resetTextColor','_newLabelSprites','VQVeU','isDualWield','OffsetY','QhZFU','meetsItemConditions','DrawEquipData','GCaXT','Scene_Shop_buyWindowRect','params','isEnabled','KTRhh','slotWindowRectItemsEquipsCore','ParseClassNotetags','activateSellWindow','drawTextEx','jmEUg','HIT\x20TYPE','MDF','ocbed','_dummyWindow','euFRQ','×%1','LCBGJ','addState','makeCommandList','onTouchCancel','buttonAssistKey2','lJnwe','HiddenItemB','effects','trbrp','buttonAssistSmallIncrement','elementId','deselect','zQjjZ','rateMP','weapon-%1','canConsumeItem','powerDownColor','FKKtr','LabelSuccessRate','DJWFZ','colSpacing'];function _0x5682(_0x5b86a6,_0x452d92){_0x5b86a6=_0x5b86a6-0xa0;let _0x44109f=_0x4410[_0x5b86a6];return _0x44109f;}const _0x292660=_0x5682;(function(_0x2889af,_0x4e77d9){const _0x4cdba0=_0x5682;while(!![]){try{const _0x2b0c3c=-parseInt(_0x4cdba0(0x452))*-parseInt(_0x4cdba0(0x354))+parseInt(_0x4cdba0(0x11b))+parseInt(_0x4cdba0(0x2cd))+-parseInt(_0x4cdba0(0x4b8))*-parseInt(_0x4cdba0(0x21f))+parseInt(_0x4cdba0(0x3c1))+parseInt(_0x4cdba0(0x1a7))+-parseInt(_0x4cdba0(0x41f))*parseInt(_0x4cdba0(0x4f8));if(_0x2b0c3c===_0x4e77d9)break;else _0x2889af['push'](_0x2889af['shift']());}catch(_0x430cba){_0x2889af['push'](_0x2889af['shift']());}}}(_0x4410,0xc25c8));var label='ItemsEquipsCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x292660(0x438)](function(_0x266e9a){const _0x10e999=_0x292660;return _0x266e9a['status']&&_0x266e9a[_0x10e999(0x3d2)][_0x10e999(0x261)]('['+label+']');})[0x0];VisuMZ[label][_0x292660(0x465)]=VisuMZ[label][_0x292660(0x465)]||{},VisuMZ[_0x292660(0x3e9)]=function(_0x47c70f,_0x14054e){const _0x2b9bf1=_0x292660;for(const _0x305580 in _0x14054e){if(_0x305580['match'](/(.*):(.*)/i)){if(_0x2b9bf1(0x47f)===_0x2b9bf1(0x46e)){function _0x268e94(){const _0x5cf0fc=_0x2b9bf1;_0x1a7ee3['gainItem'](_0x3d300d[_0x5cf0fc(0x397)](),0x1);}}else{const _0x5e87ea=String(RegExp['$1']),_0x790695=String(RegExp['$2'])[_0x2b9bf1(0x1e6)]()[_0x2b9bf1(0x508)]();let _0x119ac4,_0x529fe7,_0x5f1985;switch(_0x790695){case _0x2b9bf1(0x3a9):_0x119ac4=_0x14054e[_0x305580]!==''?Number(_0x14054e[_0x305580]):0x0;break;case _0x2b9bf1(0x250):_0x529fe7=_0x14054e[_0x305580]!==''?JSON[_0x2b9bf1(0x11c)](_0x14054e[_0x305580]):[],_0x119ac4=_0x529fe7[_0x2b9bf1(0x2be)](_0x863f61=>Number(_0x863f61));break;case _0x2b9bf1(0xcf):_0x119ac4=_0x14054e[_0x305580]!==''?eval(_0x14054e[_0x305580]):null;break;case _0x2b9bf1(0x1a1):_0x529fe7=_0x14054e[_0x305580]!==''?JSON['parse'](_0x14054e[_0x305580]):[],_0x119ac4=_0x529fe7['map'](_0x24e53a=>eval(_0x24e53a));break;case'JSON':_0x119ac4=_0x14054e[_0x305580]!==''?JSON[_0x2b9bf1(0x11c)](_0x14054e[_0x305580]):'';break;case'ARRAYJSON':_0x529fe7=_0x14054e[_0x305580]!==''?JSON[_0x2b9bf1(0x11c)](_0x14054e[_0x305580]):[],_0x119ac4=_0x529fe7[_0x2b9bf1(0x2be)](_0x18b058=>JSON[_0x2b9bf1(0x11c)](_0x18b058));break;case'FUNC':_0x119ac4=_0x14054e[_0x305580]!==''?new Function(JSON[_0x2b9bf1(0x11c)](_0x14054e[_0x305580])):new Function(_0x2b9bf1(0x24c));break;case _0x2b9bf1(0x384):_0x529fe7=_0x14054e[_0x305580]!==''?JSON['parse'](_0x14054e[_0x305580]):[],_0x119ac4=_0x529fe7['map'](_0x1cddea=>new Function(JSON[_0x2b9bf1(0x11c)](_0x1cddea)));break;case _0x2b9bf1(0x3c5):_0x119ac4=_0x14054e[_0x305580]!==''?String(_0x14054e[_0x305580]):'';break;case _0x2b9bf1(0x1db):_0x529fe7=_0x14054e[_0x305580]!==''?JSON[_0x2b9bf1(0x11c)](_0x14054e[_0x305580]):[],_0x119ac4=_0x529fe7[_0x2b9bf1(0x2be)](_0x112db6=>String(_0x112db6));break;case _0x2b9bf1(0x3b9):_0x5f1985=_0x14054e[_0x305580]!==''?JSON['parse'](_0x14054e[_0x305580]):{},_0x47c70f[_0x5e87ea]={},VisuMZ[_0x2b9bf1(0x3e9)](_0x47c70f[_0x5e87ea],_0x5f1985);continue;case _0x2b9bf1(0x2d8):_0x529fe7=_0x14054e[_0x305580]!==''?JSON[_0x2b9bf1(0x11c)](_0x14054e[_0x305580]):[],_0x119ac4=_0x529fe7[_0x2b9bf1(0x2be)](_0x4cd4f5=>VisuMZ['ConvertParams']({},JSON[_0x2b9bf1(0x11c)](_0x4cd4f5)));break;default:continue;}_0x47c70f[_0x5e87ea]=_0x119ac4;}}}return _0x47c70f;},(_0x19bf50=>{const _0x5adde7=_0x292660,_0x97eb11=_0x19bf50[_0x5adde7(0xc0)];for(const _0x3a4e14 of dependencies){if(!Imported[_0x3a4e14]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x97eb11,_0x3a4e14)),SceneManager[_0x5adde7(0x394)]();break;}}const _0x373977=_0x19bf50[_0x5adde7(0x3d2)];if(_0x373977['match'](/\[Version[ ](.*?)\]/i)){const _0x3357e0=Number(RegExp['$1']);_0x3357e0!==VisuMZ[label][_0x5adde7(0x1a6)]&&(alert(_0x5adde7(0x3e8)[_0x5adde7(0x169)](_0x97eb11,_0x3357e0)),SceneManager[_0x5adde7(0x394)]());}if(_0x373977[_0x5adde7(0x35a)](/\[Tier[ ](\d+)\]/i)){const _0x5e2ebc=Number(RegExp['$1']);if(_0x5e2ebc<tier)alert(_0x5adde7(0x327)[_0x5adde7(0x169)](_0x97eb11,_0x5e2ebc,tier)),SceneManager[_0x5adde7(0x394)]();else{if(_0x5adde7(0x33a)===_0x5adde7(0x15b)){function _0x35e3d4(){const _0x3db1e0=_0x5adde7;return _0x559c91[_0x3db1e0(0x448)][_0x3db1e0(0x465)][_0x3db1e0(0xbe)][_0x3db1e0(0x454)];}}else tier=Math[_0x5adde7(0x2d3)](_0x5e2ebc,tier);}}VisuMZ[_0x5adde7(0x3e9)](VisuMZ[label]['Settings'],_0x19bf50[_0x5adde7(0x404)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x292660(0xc0)],_0x292660(0x2bc),_0x17d650=>{const _0x3534dc=_0x292660;VisuMZ[_0x3534dc(0x3e9)](_0x17d650,_0x17d650);const _0x146071=_0x17d650['Actors'][_0x3534dc(0x2be)](_0x55c33b=>$gameActors[_0x3534dc(0x331)](_0x55c33b)),_0x378fb2=_0x17d650[_0x3534dc(0x383)][_0x3534dc(0x2be)](_0x51f8b0=>$dataSystem[_0x3534dc(0x1e5)][_0x3534dc(0x291)](_0x51f8b0[_0x3534dc(0x508)]()));for(const _0x1a33e9 of _0x146071){if(!_0x1a33e9)continue;_0x1a33e9[_0x3534dc(0x2ee)](_0x378fb2);}}),PluginManager[_0x292660(0x316)](pluginData[_0x292660(0xc0)],'ActorResetEquipSlots',_0x44e67b=>{const _0x5d545=_0x292660;VisuMZ[_0x5d545(0x3e9)](_0x44e67b,_0x44e67b);const _0x400c70=_0x44e67b[_0x5d545(0xcd)][_0x5d545(0x2be)](_0x5b8095=>$gameActors[_0x5d545(0x331)](_0x5b8095));for(const _0x169f70 of _0x400c70){if(!_0x169f70)continue;_0x169f70[_0x5d545(0xc3)]();}}),PluginManager[_0x292660(0x316)](pluginData[_0x292660(0xc0)],_0x292660(0x506),_0x5862e9=>{const _0x33a4f1=_0x292660;VisuMZ[_0x33a4f1(0x3e9)](_0x5862e9,_0x5862e9);const _0x290858=[],_0x286471=_0x5862e9['Blacklist']['map'](_0x1eb896=>_0x1eb896[_0x33a4f1(0x1e6)]()[_0x33a4f1(0x508)]()),_0xcb386f=_0x5862e9[_0x33a4f1(0x199)][_0x33a4f1(0x2be)](_0x3d5a54=>_0x3d5a54[_0x33a4f1(0x1e6)]()['trim']()),_0x287926=_0x5862e9['Step1End']>=_0x5862e9[_0x33a4f1(0x359)]?_0x5862e9[_0x33a4f1(0x359)]:_0x5862e9['Step1End'],_0x3e0575=_0x5862e9[_0x33a4f1(0x20c)]>=_0x5862e9['Step1Start']?_0x5862e9[_0x33a4f1(0x20c)]:_0x5862e9[_0x33a4f1(0x359)],_0x282a17=Array(_0x3e0575-_0x287926+0x1)[_0x33a4f1(0x278)]()[_0x33a4f1(0x2be)]((_0x1aa913,_0x448c1a)=>_0x287926+_0x448c1a);for(const _0x245ca9 of _0x282a17){const _0x466466=$dataItems[_0x245ca9];if(!_0x466466)continue;if(!VisuMZ['ItemsEquipsCore'][_0x33a4f1(0x163)](_0x466466,_0x286471,_0xcb386f))continue;_0x290858['push']([0x0,_0x245ca9,0x0,_0x466466['price']]);}const _0x1723cc=_0x5862e9['Step2End']>=_0x5862e9['Step2Start']?_0x5862e9[_0x33a4f1(0x144)]:_0x5862e9[_0x33a4f1(0x30f)],_0x1372df=_0x5862e9['Step2End']>=_0x5862e9[_0x33a4f1(0x144)]?_0x5862e9[_0x33a4f1(0x30f)]:_0x5862e9[_0x33a4f1(0x144)],_0x315326=Array(_0x1372df-_0x1723cc+0x1)[_0x33a4f1(0x278)]()[_0x33a4f1(0x2be)]((_0x1040db,_0x34849e)=>_0x1723cc+_0x34849e);for(const _0x1955bb of _0x315326){if(_0x33a4f1(0x324)===_0x33a4f1(0x324)){const _0x3e85a8=$dataWeapons[_0x1955bb];if(!_0x3e85a8)continue;if(!VisuMZ[_0x33a4f1(0x448)]['IncludeShopItem'](_0x3e85a8,_0x286471,_0xcb386f))continue;_0x290858[_0x33a4f1(0x106)]([0x1,_0x1955bb,0x0,_0x3e85a8['price']]);}else{function _0x2bc327(){const _0x231182=_0x33a4f1;this[_0x231182(0x339)](_0x43895b,_0x256e8b,_0x22110a,_0xa58b79,!![]),_0x43c755[_0x231182(0x37a)][_0x231182(0x465)][_0x231182(0x350)][_0x231182(0x22d)]&&(_0x4dfba0+=_0x2c0e28[_0x231182(0x45e)]+0x4);}}}const _0x4f9df2=_0x5862e9['Step3End']>=_0x5862e9[_0x33a4f1(0x4ea)]?_0x5862e9[_0x33a4f1(0x4ea)]:_0x5862e9[_0x33a4f1(0x311)],_0x6265df=_0x5862e9[_0x33a4f1(0x311)]>=_0x5862e9[_0x33a4f1(0x4ea)]?_0x5862e9[_0x33a4f1(0x311)]:_0x5862e9[_0x33a4f1(0x4ea)],_0xe396e=Array(_0x6265df-_0x4f9df2+0x1)[_0x33a4f1(0x278)]()['map']((_0x2700b6,_0x120df5)=>_0x4f9df2+_0x120df5);for(const _0x154df5 of _0xe396e){if(_0x33a4f1(0x27a)===_0x33a4f1(0x27a)){const _0x4eb94b=$dataArmors[_0x154df5];if(!_0x4eb94b)continue;if(!VisuMZ[_0x33a4f1(0x448)][_0x33a4f1(0x163)](_0x4eb94b,_0x286471,_0xcb386f))continue;_0x290858['push']([0x2,_0x154df5,0x0,_0x4eb94b[_0x33a4f1(0xed)]]);}else{function _0x4cf6d0(){const _0x122d9b=_0x33a4f1;if(_0x198ea1[_0x122d9b(0x35a)](_0x3ec6cf[_0x122d9b(0x448)][_0x122d9b(0x3f4)][_0x122d9b(0x182)][_0x43f73b])){const _0x4cd831=_0x122d9b(0x379)['format'](_0x5ba4cf,_0x2e368a);_0x5570a4[_0x122d9b(0x448)]['paramJS'][_0x4cd831]=new _0x1713ad(_0x122d9b(0x378),_0x122d9b(0x347),_0x32aa02);}}}}SceneManager['push'](Scene_Shop),SceneManager['prepareNextScene'](_0x290858,_0x5862e9[_0x33a4f1(0x3ae)]);}),VisuMZ['ItemsEquipsCore']['IncludeShopItem']=function(_0x5dac2b,_0x156b7e,_0x9c32cc){const _0x5e7a85=_0x292660;if(_0x5dac2b[_0x5e7a85(0xc0)][_0x5e7a85(0x508)]()==='')return![];if(_0x5dac2b['name'][_0x5e7a85(0x35a)](/-----/i))return![];const _0x5d110c=_0x5dac2b[_0x5e7a85(0x43e)];if(_0x156b7e[_0x5e7a85(0x205)]>0x0)for(const _0x4bf923 of _0x156b7e){if(_0x5e7a85(0x497)!==_0x5e7a85(0x426)){if(!_0x4bf923)continue;if(_0x5d110c[_0x5e7a85(0x261)](_0x4bf923))return![];}else{function _0x1f6099(){const _0x22d959=_0x5e7a85;_0x4dae7d[_0x22d959(0x448)][_0x22d959(0x137)]['call'](this),this[_0x22d959(0x2ac)]()&&this[_0x22d959(0x283)]();}}}if(_0x9c32cc['length']>0x0){for(const _0x15e814 of _0x9c32cc){if(!_0x15e814)continue;if(_0x5d110c[_0x5e7a85(0x261)](_0x15e814))return!![];}return![];}return!![];},VisuMZ[_0x292660(0x448)][_0x292660(0x31f)]=Scene_Boot[_0x292660(0x3c3)][_0x292660(0x33f)],Scene_Boot[_0x292660(0x3c3)][_0x292660(0x33f)]=function(){const _0x4aa96c=_0x292660;this['process_VisuMZ_ItemsEquipsCore_RegExp'](),VisuMZ[_0x4aa96c(0x448)]['Scene_Boot_onDatabaseLoaded'][_0x4aa96c(0x1ef)](this),this[_0x4aa96c(0x4f7)]();},Scene_Boot['prototype'][_0x292660(0x236)]=function(){const _0x4c9058=_0x292660;VisuMZ[_0x4c9058(0x448)]['RegExp']={},VisuMZ[_0x4c9058(0x448)]['RegExp'][_0x4c9058(0x3bb)]=[],VisuMZ['ItemsEquipsCore'][_0x4c9058(0x3f4)][_0x4c9058(0x182)]=[];const _0xc7e411=[_0x4c9058(0x4ad),_0x4c9058(0x1b8),_0x4c9058(0x14f),_0x4c9058(0x103),_0x4c9058(0x268),_0x4c9058(0x486),'AGI','LUK'];for(const _0x460643 of _0xc7e411){const _0xd44e22='<%1:[\x20]([\x5c+\x5c-]\x5cd+)>'[_0x4c9058(0x169)](_0x460643);VisuMZ[_0x4c9058(0x448)][_0x4c9058(0x3f4)]['EquipParams'][_0x4c9058(0x106)](new RegExp(_0xd44e22,'i'));const _0x1272eb=_0x4c9058(0x357)[_0x4c9058(0x169)](_0x460643);VisuMZ['ItemsEquipsCore'][_0x4c9058(0x3f4)][_0x4c9058(0x182)][_0x4c9058(0x106)](new RegExp(_0x1272eb,'g'));}},Scene_Boot['prototype'][_0x292660(0x4f7)]=function(){const _0x58acc4=_0x292660;if(VisuMZ[_0x58acc4(0x30a)])return;this[_0x58acc4(0x428)]();const _0x5bdbd5=[$dataItems,$dataWeapons,$dataArmors];for(const _0x5db811 of _0x5bdbd5){for(const _0x4e8785 of _0x5db811){if(_0x58acc4(0x234)===_0x58acc4(0xff)){function _0x251e84(){const _0x161b84=_0x58acc4,_0xb61cbf=this['itemLineRect'](_0x4c10c7),_0x41ab32=this[_0x161b84(0x28b)](_0x3b3bf1)[_0x161b84(0x294)];return _0x41ab32<=_0xb61cbf[_0x161b84(0x294)]?_0x161b84(0x306):'icon';}}else{if(!_0x4e8785)continue;VisuMZ[_0x58acc4(0x448)][_0x58acc4(0x302)](_0x4e8785,_0x5db811),VisuMZ['ItemsEquipsCore']['Parse_Notetags_Prices'](_0x4e8785,_0x5db811),VisuMZ['ItemsEquipsCore'][_0x58acc4(0x24d)](_0x4e8785,_0x5db811),VisuMZ[_0x58acc4(0x448)]['Parse_Notetags_ParamJS'](_0x4e8785,_0x5db811),VisuMZ['ItemsEquipsCore'][_0x58acc4(0x28f)](_0x4e8785,_0x5db811);}}}},Scene_Boot[_0x292660(0x3c3)][_0x292660(0x428)]=function(){const _0x462f26=_0x292660;for(const _0x36b1ab of $dataClasses){if(_0x462f26(0x4c5)!==_0x462f26(0x4c5)){function _0xc1afa1(){const _0x45c375=_0x462f26;return _0x45c375(0x449)['format'](_0x6c80ee(_0x458ef7['$1']));}}else{if(!_0x36b1ab)continue;VisuMZ['ItemsEquipsCore'][_0x462f26(0x4a0)](_0x36b1ab);}}},VisuMZ[_0x292660(0x448)][_0x292660(0x481)]=VisuMZ[_0x292660(0x481)],VisuMZ[_0x292660(0x481)]=function(_0x37cd3){const _0x17c97b=_0x292660;VisuMZ[_0x17c97b(0x448)]['ParseClassNotetags'][_0x17c97b(0x1ef)](this,_0x37cd3),VisuMZ['ItemsEquipsCore'][_0x17c97b(0x4a0)](_0x37cd3);},VisuMZ[_0x292660(0x448)]['ParseItemNotetags']=VisuMZ[_0x292660(0x2e3)],VisuMZ[_0x292660(0x2e3)]=function(_0x228296){const _0x131781=_0x292660;VisuMZ[_0x131781(0x448)][_0x131781(0x2e3)][_0x131781(0x1ef)](this,_0x228296),VisuMZ[_0x131781(0x448)][_0x131781(0x1ac)](_0x228296,$dataItems);},VisuMZ[_0x292660(0x448)][_0x292660(0x299)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x292660(0x299)]=function(_0x4104aa){const _0xefeb63=_0x292660;VisuMZ[_0xefeb63(0x448)][_0xefeb63(0x299)][_0xefeb63(0x1ef)](this,_0x4104aa),VisuMZ[_0xefeb63(0x448)][_0xefeb63(0x1ac)](_0x4104aa,$dataWeapons);},VisuMZ[_0x292660(0x448)][_0x292660(0x173)]=VisuMZ[_0x292660(0x173)],VisuMZ[_0x292660(0x173)]=function(_0x35580a){const _0x411794=_0x292660;VisuMZ[_0x411794(0x448)][_0x411794(0x173)]['call'](this,_0x35580a),VisuMZ[_0x411794(0x448)][_0x411794(0x1ac)](_0x35580a,$dataArmors);},VisuMZ[_0x292660(0x448)][_0x292660(0x4a0)]=function(_0x20941d){const _0x45c198=_0x292660;_0x20941d['equipSlots']=[];if(!BattleManager[_0x45c198(0x172)]()&&_0x20941d[_0x45c198(0x445)][_0x45c198(0x35a)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){if(_0x45c198(0x300)===_0x45c198(0x2fe)){function _0x3464fe(){const _0x139148=_0x45c198;return _0x41e561['VisuMZ_1_MainMenuCore']&&this[_0x139148(0xc1)][_0x139148(0x2b5)]()!==''&&_0x1cc585['ItemsEquipsCore'][_0x139148(0x465)][_0x139148(0xbe)][_0x139148(0x16e)];}}else{const _0x520fd7=String(RegExp['$1'])[_0x45c198(0x469)](/[\r\n]+/);for(const _0x436841 of _0x520fd7){if(_0x45c198(0x13f)!==_0x45c198(0x375)){const _0x3129cb=$dataSystem['equipTypes'][_0x45c198(0x291)](_0x436841['trim']());if(_0x3129cb>0x0)_0x20941d[_0x45c198(0x3f9)][_0x45c198(0x106)](_0x3129cb);}else{function _0x18a43b(){const _0x3d05fa=_0x45c198;return _0x40e9b0['ItemsEquipsCore'][_0x3d05fa(0x465)]['EquipScene'][_0x3d05fa(0x10d)];}}}}}else{if(_0x45c198(0x2c5)!==_0x45c198(0x484))for(const _0x58bedb of $dataSystem[_0x45c198(0x1e5)]){if('ywEJh'!==_0x45c198(0x2ff)){const _0x32da36=$dataSystem[_0x45c198(0x1e5)][_0x45c198(0x291)](_0x58bedb['trim']());if(_0x32da36>0x0)_0x20941d[_0x45c198(0x3f9)][_0x45c198(0x106)](_0x32da36);}else{function _0x2c9a3b(){const _0x2fa92f=_0x45c198,_0x20749e=_0x56b8b1[_0x2fa92f(0x448)][_0x2fa92f(0x465)][_0x2fa92f(0x126)][_0x2fa92f(0x3d4)];return _0x20749e[_0x2fa92f(0x169)](_0x3350bb['mp']);}}}else{function _0x4662a5(){const _0x5f5ab5=_0x45c198;return _0x5f5ab5(0x431);}}}},VisuMZ[_0x292660(0x448)][_0x292660(0x1ac)]=function(_0x617233,_0x9fa706){const _0xcc60c9=_0x292660;VisuMZ[_0xcc60c9(0x448)]['Parse_Notetags_Category'](_0x617233,_0x9fa706),VisuMZ[_0xcc60c9(0x448)][_0xcc60c9(0x472)](_0x617233,_0x9fa706),VisuMZ['ItemsEquipsCore'][_0xcc60c9(0x24d)](_0x617233,_0x9fa706),VisuMZ['ItemsEquipsCore'][_0xcc60c9(0x1ce)](_0x617233,_0x9fa706),VisuMZ[_0xcc60c9(0x448)][_0xcc60c9(0x28f)](_0x617233,_0x9fa706);},VisuMZ[_0x292660(0x448)][_0x292660(0x302)]=function(_0x6f8c10,_0x59d6bc){const _0x559dee=_0x292660;_0x6f8c10[_0x559dee(0x43e)]=[];const _0x21f638=_0x6f8c10[_0x559dee(0x445)],_0xd50387=_0x21f638['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0xd50387)for(const _0x595e10 of _0xd50387){_0x595e10[_0x559dee(0x35a)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x5cbc63=String(RegExp['$1'])[_0x559dee(0x1e6)]()[_0x559dee(0x508)]()[_0x559dee(0x469)](',');for(const _0x366f0a of _0x5cbc63){if(_0x559dee(0x3eb)!==_0x559dee(0x3eb)){function _0x56b144(){const _0x2554e9=_0x559dee;if(_0x20ff9e[_0x2554e9(0x287)]&&_0x530e0b[_0x2554e9(0x1ff)]!==_0x347aad)return _0x4efa60[_0x2554e9(0x1ff)];else{if(this[_0x2554e9(0x4ed)]())return this[_0x2554e9(0x30d)]()[_0x2554e9(0x35a)](/LOWER/i);else _0x23e1db[_0x2554e9(0x3c3)][_0x2554e9(0x238)][_0x2554e9(0x1ef)](this);}}}else _0x6f8c10[_0x559dee(0x43e)][_0x559dee(0x106)](_0x366f0a[_0x559dee(0x508)]());}}if(_0x21f638['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x4abc21=RegExp['$1'][_0x559dee(0x469)](/[\r\n]+/);for(const _0x3d64a2 of _0x4abc21){_0x6f8c10[_0x559dee(0x43e)][_0x559dee(0x106)](_0x3d64a2[_0x559dee(0x1e6)]()[_0x559dee(0x508)]());}}},VisuMZ[_0x292660(0x448)][_0x292660(0x472)]=function(_0x2ffa40,_0x1fd696){const _0x231e99=_0x292660;_0x2ffa40['note']['match'](/<PRICE:[ ](\d+)>/i)&&(_0x2ffa40[_0x231e99(0xed)]=Number(RegExp['$1']));},VisuMZ['ItemsEquipsCore']['Parse_Notetags_ParamValues']=function(_0x4ec777,_0x579f67){const _0x3610f9=_0x292660;if(_0x579f67===$dataItems)return;for(let _0x5427d5=0x0;_0x5427d5<0x8;_0x5427d5++){if(_0x3610f9(0x257)!==_0x3610f9(0xa7)){const _0x35a9c8=VisuMZ[_0x3610f9(0x448)][_0x3610f9(0x3f4)][_0x3610f9(0x3bb)][_0x5427d5];if(_0x4ec777[_0x3610f9(0x445)]['match'](_0x35a9c8)){if(_0x3610f9(0x16b)===_0x3610f9(0x16b))_0x4ec777[_0x3610f9(0x47d)][_0x5427d5]=parseInt(RegExp['$1']);else{function _0x58ae11(){const _0x561a95=_0x3610f9;_0x1c4b40=_0x561a95(0x3c0)[_0x561a95(0x169)](_0x1abe0a['id']);}}}}else{function _0x42d536(){const _0x46f29e=_0x3610f9,_0x406d86=_0x3e4fdd[_0x46f29e(0x3c3)]['buffIconIndex'](0x1,_0x4f40f2);if(_0x406d86>0x0){_0xa37389+=_0x46f29e(0x150)[_0x46f29e(0x169)](_0x406d86),_0x56c024++;if(_0x40dd0e>=_0x310124)return _0x4311d2;}}}}},VisuMZ[_0x292660(0x448)]['paramJS']={},VisuMZ['ItemsEquipsCore'][_0x292660(0x1ce)]=function(_0x5c86ec,_0x1837cb){const _0x45e602=_0x292660;if(_0x1837cb===$dataItems)return;if(_0x5c86ec['note']['match'](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x28fd72=String(RegExp['$1']),_0x5d82c6=(_0x1837cb===$dataWeapons?_0x45e602(0x16f):_0x45e602(0x2e7))[_0x45e602(0x169)](_0x5c86ec['id']),_0x369786=_0x45e602(0x102)[_0x45e602(0x169)](_0x28fd72);for(let _0x1bb5d9=0x0;_0x1bb5d9<0x8;_0x1bb5d9++){if(_0x28fd72[_0x45e602(0x35a)](VisuMZ[_0x45e602(0x448)][_0x45e602(0x3f4)][_0x45e602(0x182)][_0x1bb5d9])){const _0x46bd80=_0x45e602(0x379)['format'](_0x5d82c6,_0x1bb5d9);VisuMZ['ItemsEquipsCore']['paramJS'][_0x46bd80]=new Function(_0x45e602(0x378),_0x45e602(0x347),_0x369786);}}}},VisuMZ[_0x292660(0x448)][_0x292660(0x142)]={},VisuMZ[_0x292660(0x448)]['Parse_Notetags_EnableJS']=function(_0x32ca2b,_0x4f16a6){const _0x1c4abe=_0x292660;if(_0x4f16a6!==$dataItems)return;if(_0x32ca2b[_0x1c4abe(0x445)]['match'](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){if(_0x1c4abe(0x437)===_0x1c4abe(0x437)){const _0x3595a4=String(RegExp['$1']),_0x520e84=_0x1c4abe(0xa9)['format'](_0x3595a4);VisuMZ[_0x1c4abe(0x448)][_0x1c4abe(0x142)][_0x32ca2b['id']]=new Function(_0x1c4abe(0x378),_0x520e84);}else{function _0x1d2db1(){const _0x1f244f=_0x1c4abe;return this[_0x1f244f(0x4ed)]()?this[_0x1f244f(0x374)]():_0xea68b5[_0x1f244f(0x448)][_0x1f244f(0x21b)]['call'](this);}}}},DataManager['isKeyItem']=function(_0x2d01dd){const _0x3933fb=_0x292660;return this[_0x3933fb(0x292)](_0x2d01dd)&&_0x2d01dd['itypeId']===0x2;},DataManager[_0x292660(0x1a2)]=function(_0x4f4af6){const _0xc164cf=_0x292660;if(!_0x4f4af6)return 0x63;else return _0x4f4af6[_0xc164cf(0x445)][_0xc164cf(0x35a)](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this[_0xc164cf(0x31d)](_0x4f4af6);},DataManager['defaultItemMax']=function(_0xd5bbf2){const _0x300e3e=_0x292660;if(this[_0x300e3e(0x292)](_0xd5bbf2)){if('yVSgU'!=='yVSgU'){function _0x1d1459(){return this['helpWindowRectItemsEquipsCore']();}}else return VisuMZ['ItemsEquipsCore'][_0x300e3e(0x465)][_0x300e3e(0x34a)]['MaxItems'];}else{if(this['isWeapon'](_0xd5bbf2)){if(_0x300e3e(0x40c)===_0x300e3e(0x338)){function _0x5019bf(){const _0x2ff193=_0x300e3e;_0x46cd37[_0x2ff193(0x448)][_0x2ff193(0x2e3)][_0x2ff193(0x1ef)](this,_0x5a3301),_0x3d628a['ItemsEquipsCore'][_0x2ff193(0x1ac)](_0x5c2214,_0x497b0f);}}else return VisuMZ[_0x300e3e(0x448)][_0x300e3e(0x465)][_0x300e3e(0x34a)][_0x300e3e(0x1e0)];}else{if(this[_0x300e3e(0x33b)](_0xd5bbf2)){if('TDvbP'!=='TDvbP'){function _0x4368a8(){const _0x4df7c6=_0x300e3e;return this[_0x4df7c6(0x153)]();}}else return VisuMZ['ItemsEquipsCore'][_0x300e3e(0x465)][_0x300e3e(0x34a)]['MaxArmors'];}}}},ColorManager[_0x292660(0x16c)]=function(_0x1354a9){const _0x15130c=_0x292660;if(!_0x1354a9){if(_0x15130c(0x39a)!=='taywn')return this[_0x15130c(0x352)]();else{function _0x1fb50e(){const _0x2def3a=_0x15130c;return _0x2def3a(0x194);}}}else{if(_0x1354a9[_0x15130c(0x445)]['match'](/<COLOR:[ ](\d+)>/i)){if('gicHh'!=='gicHh'){function _0x51abb1(){const _0x4eac52=_0x15130c,_0x2f8919=_0x4eac52(0x3a3);if(!this['_itemData'][_0x4eac52(0x3d5)]&&!this[_0x4eac52(0x2fb)][_0x2f8919])return![];const _0x223068=this[_0x4eac52(0x314)]();this[_0x4eac52(0x1c5)](_0x223068,_0x40aca4,_0x4778a2,_0x29ed77,!![]);const _0x25a47c=this[_0x4eac52(0x4da)]();return this[_0x4eac52(0x1c5)](_0x25a47c,_0x87d1f1,_0x53a94a,_0x403b95,![],_0x4eac52(0x2b3)),this[_0x4eac52(0x138)](_0xe3535e,_0x50f515,_0x47195b),this[_0x4eac52(0x204)](),!![];}}else return this['textColor'](Number(RegExp['$1'])[_0x15130c(0x44d)](0x0,0x1f));}else{if(_0x1354a9[_0x15130c(0x445)][_0x15130c(0x35a)](/<COLOR:[ ]#(.*)>/i)){if(_0x15130c(0x28d)===_0x15130c(0x26a)){function _0x4fa314(){const _0x56b263=_0x15130c;return this[_0x56b263(0x30d)]()['match'](/LOWER/i);}}else return'#'+String(RegExp['$1']);}else return this['normalColor']();}}},ColorManager[_0x292660(0x174)]=function(_0x711636){const _0x3c57f2=_0x292660;_0x711636=String(_0x711636);if(_0x711636[_0x3c57f2(0x35a)](/#(.*)/i)){if('ukAHF'==='poLMe'){function _0x19b968(){const _0x424fbc=_0x3c57f2;this['_commandWindow'][_0x424fbc(0x23a)](),this['_commandWindow'][_0x424fbc(0x496)](),this['_slotWindow'][_0x424fbc(0x4fb)](0x0),this[_0x424fbc(0xf9)][_0x424fbc(0x413)]();}}else return _0x3c57f2(0x449)[_0x3c57f2(0x169)](String(RegExp['$1']));}else{if(_0x3c57f2(0x1fb)!==_0x3c57f2(0x4e8))return this[_0x3c57f2(0x3ea)](Number(_0x711636));else{function _0x2a061c(){const _0x209aa1=_0x3c57f2;return _0x91e7be['VisuMZ_1_BattleCore']&&_0x16c1bf['getDamageStyle'](this[_0x209aa1(0x237)])!==_0x209aa1(0x509)?this[_0x209aa1(0x33e)]():this[_0x209aa1(0x308)]();}}}},SceneManager[_0x292660(0x4cc)]=function(){const _0x5525e6=_0x292660;return this[_0x5525e6(0x4d6)]&&this[_0x5525e6(0x4d6)][_0x5525e6(0x20e)]===Scene_Shop;},Game_Temp['prototype'][_0x292660(0x3f0)]=function(){const _0x2927c4=_0x292660;if(this['_bypassNewLabel'])return![];return VisuMZ[_0x2927c4(0x448)][_0x2927c4(0x465)]['New'][_0x2927c4(0x1bc)];},VisuMZ[_0x292660(0x353)]=VisuMZ[_0x292660(0x448)]['Settings'][_0x292660(0x126)][_0x292660(0x342)],VisuMZ[_0x292660(0x448)][_0x292660(0x303)]=Game_BattlerBase[_0x292660(0x3c3)][_0x292660(0x3fd)],Game_BattlerBase['prototype'][_0x292660(0x3fd)]=function(_0x5b1da3){const _0x362c57=_0x292660;if(this['_shopStatusMenuMode']){if('KLjfy'===_0x362c57(0x4b9))return this[_0x362c57(0x455)]?VisuMZ['ShopMenuStatusStandard']:0x1;else{function _0xd9ea44(){const _0x597bae=_0x362c57;let _0x4d3a08=this[_0x597bae(0x3f9)]()[_0x597bae(0x205)];while(this[_0x597bae(0x17b)][_0x597bae(0x205)]>_0x4d3a08){const _0x2bd7c9=this['_equips'][this[_0x597bae(0x17b)][_0x597bae(0x205)]-0x1];_0x2bd7c9&&_0x2bd7c9[_0x597bae(0x397)]()&&_0x26061f['gainItem'](_0x2bd7c9[_0x597bae(0x397)](),0x1),this[_0x597bae(0x17b)][_0x597bae(0x231)]();}while(_0x4d3a08>this[_0x597bae(0x17b)][_0x597bae(0x205)]){this[_0x597bae(0x17b)][_0x597bae(0x106)](new _0x261029());}}}}else{if('DJWFZ'!==_0x362c57(0x49e)){function _0x167988(){const _0x5f4bdb=_0x362c57,_0x134e5d=_0x1a3842(_0x59f5c6['$1'])[_0x5f4bdb(0x1e6)]()[_0x5f4bdb(0x508)](),_0x466058=_0x4fc739(_0x33250f['$2'])[_0x5f4bdb(0x508)]();this[_0x5f4bdb(0x2fb)][_0x134e5d]=_0x466058;}}else return VisuMZ[_0x362c57(0x448)][_0x362c57(0x303)][_0x362c57(0x1ef)](this,_0x5b1da3);}},VisuMZ['ItemsEquipsCore']['Game_BattlerBase_meetsItemConditions']=Game_BattlerBase[_0x292660(0x3c3)][_0x292660(0x479)],Game_BattlerBase['prototype'][_0x292660(0x479)]=function(_0x1ce80b){const _0xb351b4=_0x292660;if(!_0x1ce80b)return![];if(!VisuMZ[_0xb351b4(0x448)][_0xb351b4(0x1dc)][_0xb351b4(0x1ef)](this,_0x1ce80b))return![];if(!this['meetsItemConditionsNotetags'](_0x1ce80b))return![];if(!this[_0xb351b4(0x4a3)](_0x1ce80b))return![];return!![];},Game_BattlerBase[_0x292660(0x3c3)][_0x292660(0x3fe)]=function(_0x6ed18c){if(!this['checkItemConditionsSwitchNotetags'](_0x6ed18c))return![];return!![];},Game_BattlerBase[_0x292660(0x3c3)]['checkItemConditionsSwitchNotetags']=function(_0x5a9a08){const _0x32eeb6=_0x292660,_0x1f985b=_0x5a9a08[_0x32eeb6(0x445)];if(_0x1f985b[_0x32eeb6(0x35a)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('OSfZt'===_0x32eeb6(0x12f)){function _0x10e560(){const _0x2c5f74=_0x32eeb6;this[_0x2c5f74(0x1c8)]();}}else{const _0x3cd53a=JSON[_0x32eeb6(0x11c)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x247ed5 of _0x3cd53a){if(!$gameSwitches[_0x32eeb6(0x188)](_0x247ed5))return![];}return!![];}}if(_0x1f985b[_0x32eeb6(0x35a)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('IhVIc'!==_0x32eeb6(0x2da)){function _0x481d57(){const _0x2f4179=_0x32eeb6;_0xa997e6[_0x2f4179(0x3c3)][_0x2f4179(0x4e9)][_0x2f4179(0x1ef)](this),this[_0x2f4179(0x4dd)]();}}else{const _0x3d274d=JSON['parse']('['+RegExp['$1'][_0x32eeb6(0x35a)](/\d+/g)+']');for(const _0x3c27ae of _0x3d274d){if(!$gameSwitches[_0x32eeb6(0x188)](_0x3c27ae))return![];}return!![];}}if(_0x1f985b[_0x32eeb6(0x35a)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('DCqSf'==='DCqSf'){const _0x2f11ce=JSON['parse']('['+RegExp['$1'][_0x32eeb6(0x35a)](/\d+/g)+']');for(const _0x279c86 of _0x2f11ce){if('NpfSc'===_0x32eeb6(0x2f3)){function _0x524fc1(){const _0xd27c4c=_0x32eeb6;_0xcbe67d[_0xd27c4c(0x3c3)]['callUpdateHelp'][_0xd27c4c(0x1ef)](this);if(this[_0xd27c4c(0x32e)])this[_0xd27c4c(0x29e)]();}}else{if($gameSwitches[_0x32eeb6(0x188)](_0x279c86))return!![];}}return![];}else{function _0x155772(){const _0x5cc889=_0x32eeb6,_0x2e84a5=_0x836146[_0x5cc889(0x448)][_0x5cc889(0x3f4)][_0x5cc889(0x3bb)][_0x2dbd8a];_0x8a2137['note'][_0x5cc889(0x35a)](_0x2e84a5)&&(_0xecc79b[_0x5cc889(0x47d)][_0x44cd83]=_0x141ebd(_0x364db4['$1']));}}}if(_0x1f985b['match'](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x32eeb6(0x34f)===_0x32eeb6(0x4d3)){function _0x33ca60(){const _0x5d4527=_0x32eeb6;return _0x280d83[_0x5d4527(0x448)]['Settings'][_0x5d4527(0x34a)][_0x5d4527(0x1a0)];}}else{const _0x15fc34=JSON['parse']('['+RegExp['$1'][_0x32eeb6(0x35a)](/\d+/g)+']');for(const _0x3c2d7f of _0x15fc34){if(_0x32eeb6(0x414)===_0x32eeb6(0x414)){if(!$gameSwitches[_0x32eeb6(0x188)](_0x3c2d7f))return!![];}else{function _0x383553(){const _0x10068f=_0x32eeb6,_0x1af183=this[_0x10068f(0x238)]()?0x0:_0x26f85b['boxWidth']-this[_0x10068f(0x3ef)](),_0x306646=this[_0x10068f(0x1d8)](),_0xe55f6b=this['statusWidth'](),_0x8e9a39=this[_0x10068f(0x368)]();return new _0x2e4b0e(_0x1af183,_0x306646,_0xe55f6b,_0x8e9a39);}}}return![];}}if(_0x1f985b['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x32eeb6(0x11e)!==_0x32eeb6(0x11e)){function _0x248598(){const _0x4e705a=_0x32eeb6;_0x5041c4[_0x4e705a(0x35a)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x5be5f0=_0x2008b7(_0x38817d['$1'])['toUpperCase']()[_0x4e705a(0x508)]()['split'](',');for(const _0x268f51 of _0x5be5f0){_0x33d271['categories'][_0x4e705a(0x106)](_0x268f51['trim']());}}}else{const _0x229778=JSON[_0x32eeb6(0x11c)]('['+RegExp['$1'][_0x32eeb6(0x35a)](/\d+/g)+']');for(const _0x104eff of _0x229778){if(_0x32eeb6(0x462)!==_0x32eeb6(0x462)){function _0xe7e4f0(){return _0x9e2bdc[_0x51dfd4];}}else{if(!$gameSwitches[_0x32eeb6(0x188)](_0x104eff))return!![];}}return![];}}if(_0x1f985b[_0x32eeb6(0x35a)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x133959=JSON[_0x32eeb6(0x11c)]('['+RegExp['$1'][_0x32eeb6(0x35a)](/\d+/g)+']');for(const _0x433a58 of _0x133959){if(_0x32eeb6(0x419)!==_0x32eeb6(0x419)){function _0x50ace5(){const _0x24760b=_0x32eeb6;return _0x4b1bb9[_0x24760b(0x3c3)]['isHoverEnabled']['call'](this);}}else{if($gameSwitches[_0x32eeb6(0x188)](_0x433a58))return![];}}return!![];}return!![];},Game_BattlerBase[_0x292660(0x3c3)][_0x292660(0x4a3)]=function(_0x3d73f9){const _0x156f60=_0x292660,_0x28c44a=_0x3d73f9['note'],_0x27c965=VisuMZ[_0x156f60(0x448)][_0x156f60(0x142)];return _0x27c965[_0x3d73f9['id']]?_0x27c965[_0x3d73f9['id']][_0x156f60(0x1ef)](this,_0x3d73f9):!![];},Game_Actor['prototype'][_0x292660(0x406)]=function(_0x31eec4){const _0x2c79cb=_0x292660;_0x31eec4=this[_0x2c79cb(0x262)](_0x31eec4);const _0x1aea1a=this['equipSlots']();this[_0x2c79cb(0x17b)]=[];for(let _0x555210=0x0;_0x555210<_0x1aea1a['length'];_0x555210++){this[_0x2c79cb(0x17b)][_0x555210]=new Game_Item();}for(let _0x4f976f=0x0;_0x4f976f<_0x1aea1a[_0x2c79cb(0x205)];_0x4f976f++){if(_0x2c79cb(0x507)!==_0x2c79cb(0x507)){function _0x11daa3(){return'iconText';}}else{const _0x3220e4=_0x1aea1a[_0x4f976f],_0x234f99=this[_0x2c79cb(0x105)](_0x31eec4,_0x3220e4);if(this[_0x2c79cb(0x111)](_0x234f99))this[_0x2c79cb(0x17b)][_0x4f976f][_0x2c79cb(0x4bf)](_0x234f99);}}this['releaseUnequippableItems'](!![]),this['refresh']();},Game_Actor[_0x292660(0x3c3)]['convertInitEquipsToItems']=function(_0x234b9c){const _0x41f801=_0x292660,_0x20afee=[];for(let _0x3236ab=0x0;_0x3236ab<_0x234b9c[_0x41f801(0x205)];_0x3236ab++){const _0x1fb3a5=_0x234b9c[_0x3236ab];if(_0x1fb3a5<=0x0)continue;const _0x22e58d=$dataSystem[_0x41f801(0x1e5)][_0x3236ab+0x1];if(_0x22e58d===$dataSystem[_0x41f801(0x1e5)][0x1]||_0x3236ab===0x1&&this[_0x41f801(0x476)]()){if(_0x41f801(0x33d)===_0x41f801(0x38e)){function _0x472899(){const _0x55ded5=_0x41f801;return this[_0x55ded5(0x34b)][_0x55ded5(0x294)]/0x5/-0x3;}}else _0x20afee[_0x41f801(0x106)]($dataWeapons[_0x1fb3a5]);}else{if(BattleManager[_0x41f801(0x172)]()){const _0x52c553=$dataArmors[_0x1fb3a5];_0x52c553[_0x41f801(0x2b6)]===_0x3236ab+0x1&&_0x20afee['push'](_0x52c553);}else _0x20afee[_0x41f801(0x106)]($dataArmors[_0x1fb3a5]);}}return _0x20afee;},Game_Actor[_0x292660(0x3c3)]['getMatchingInitEquip']=function(_0x306633,_0x4c3e3b){const _0x47b124=_0x292660;for(const _0x2c1e2f of _0x306633){if(!_0x2c1e2f)continue;if(_0x2c1e2f[_0x47b124(0x2b6)]===_0x4c3e3b)return _0x306633[_0x47b124(0x25d)](_0x306633[_0x47b124(0x291)](_0x2c1e2f),0x1),_0x2c1e2f;}return null;},Game_Actor[_0x292660(0x3c3)][_0x292660(0x3f9)]=function(){const _0x323aba=_0x292660,_0xf306b0=JsonEx[_0x323aba(0xfa)](this['_forcedSlots']||this[_0x323aba(0x1f1)]()[_0x323aba(0x3f9)]);if(_0xf306b0[_0x323aba(0x205)]>=0x2&&this[_0x323aba(0x476)]())_0xf306b0[0x1]=0x1;return _0xf306b0;},Game_Actor[_0x292660(0x3c3)][_0x292660(0x2ee)]=function(_0x304954){const _0x304095=_0x292660;_0x304954[_0x304095(0x2aa)](0x0),_0x304954['remove'](-0x1),this[_0x304095(0xac)]=_0x304954,this['refresh'](),this[_0x304095(0x332)]();},Game_Actor['prototype']['forceResetEquipSlots']=function(){const _0x17fc80=_0x292660;this[_0x17fc80(0xac)]=undefined,this[_0x17fc80(0x4e9)](),this['updateChangedSlots']();},Game_Actor[_0x292660(0x3c3)][_0x292660(0x332)]=function(){const _0xcb2f07=_0x292660;let _0x1a3141=this[_0xcb2f07(0x3f9)]()[_0xcb2f07(0x205)];while(this[_0xcb2f07(0x17b)][_0xcb2f07(0x205)]>_0x1a3141){if('ibJzd'!==_0xcb2f07(0xa2)){function _0x321474(){const _0x1d2a75=_0xcb2f07;if(!this[_0x1d2a75(0x30d)]())return![];if(!this[_0x1d2a75(0x2ac)]())return![];if(!this[_0x1d2a75(0x30c)])return![];if(!this[_0x1d2a75(0x30c)][_0x1d2a75(0x2e6)])return![];return this[_0x1d2a75(0x30d)]()&&this[_0x1d2a75(0x2ac)]();}}else{const _0x162816=this[_0xcb2f07(0x17b)][this[_0xcb2f07(0x17b)][_0xcb2f07(0x205)]-0x1];if(_0x162816&&_0x162816[_0xcb2f07(0x397)]()){if('NEAZb'!==_0xcb2f07(0x22c))$gameParty[_0xcb2f07(0x187)](_0x162816[_0xcb2f07(0x397)](),0x1);else{function _0x43b927(){return;}}}this[_0xcb2f07(0x17b)][_0xcb2f07(0x231)]();}}while(_0x1a3141>this['_equips']['length']){this['_equips'][_0xcb2f07(0x106)](new Game_Item());}},Game_Actor[_0x292660(0x3c3)][_0x292660(0x423)]=function(){const _0x7c455a=_0x292660,_0x42c199=this[_0x7c455a(0x3f9)]();for(let _0xa2540e=0x0;_0xa2540e<_0x42c199[_0x7c455a(0x205)];_0xa2540e++){if('vIbAK'===_0x7c455a(0x43c)){function _0x4a4377(){const _0x3e697e=_0x7c455a;this[_0x3e697e(0x128)](_0x58f1f1);}}else{if(!this['_equips'][_0xa2540e])this['_equips'][_0xa2540e]=new Game_Item();}}this[_0x7c455a(0x4f1)](![]),this[_0x7c455a(0x4e9)]();},VisuMZ[_0x292660(0x448)][_0x292660(0x2e2)]=Game_Actor[_0x292660(0x3c3)][_0x292660(0x1f5)],Game_Actor[_0x292660(0x3c3)][_0x292660(0x1f5)]=function(_0x236655,_0x30ec9f){const _0x997eed=_0x292660;if(!this[_0x997eed(0x4e7)]){if(_0x997eed(0x191)!=='lgpKX'){function _0x29ede4(){const _0x418809=_0x997eed,_0x253fc8=this[_0x418809(0x31a)](_0x31fec5),_0x4190c6=this[_0x418809(0x28b)](_0x3d2cab)[_0x418809(0x294)];return _0x4190c6<=_0x253fc8[_0x418809(0x294)]?_0x418809(0x306):_0x418809(0x194);}}else{const _0x4294d7=JsonEx[_0x997eed(0xfa)](this);_0x4294d7[_0x997eed(0x4e7)]=!![],VisuMZ['ItemsEquipsCore']['Game_Actor_changeEquip'][_0x997eed(0x1ef)](this,_0x236655,_0x30ec9f),this[_0x997eed(0x1f4)](_0x4294d7);}}else VisuMZ[_0x997eed(0x448)]['Game_Actor_changeEquip'][_0x997eed(0x1ef)](this,_0x236655,_0x30ec9f);},VisuMZ[_0x292660(0x448)]['Game_Actor_forceChangeEquip']=Game_Actor[_0x292660(0x3c3)][_0x292660(0x373)],Game_Actor[_0x292660(0x3c3)][_0x292660(0x373)]=function(_0x1e455e,_0x466dfd){const _0x4feeb2=_0x292660;if(!this[_0x4feeb2(0x4e7)]){const _0x24a99b=JsonEx[_0x4feeb2(0xfa)](this);_0x24a99b[_0x4feeb2(0x4e7)]=!![],VisuMZ[_0x4feeb2(0x448)][_0x4feeb2(0x3f7)][_0x4feeb2(0x1ef)](this,_0x1e455e,_0x466dfd),this[_0x4feeb2(0x1f4)](_0x24a99b);}else VisuMZ['ItemsEquipsCore'][_0x4feeb2(0x3f7)]['call'](this,_0x1e455e,_0x466dfd);},VisuMZ[_0x292660(0x448)][_0x292660(0x29f)]=Game_Actor[_0x292660(0x3c3)][_0x292660(0x3be)],Game_Actor[_0x292660(0x3c3)][_0x292660(0x3be)]=function(_0x3688ac){const _0x47ac0e=_0x292660;if(!this[_0x47ac0e(0x4e7)]){if(_0x47ac0e(0x47b)!==_0x47ac0e(0x271)){const _0x141f9e=JsonEx[_0x47ac0e(0xfa)](this);_0x141f9e[_0x47ac0e(0x4e7)]=!![],VisuMZ[_0x47ac0e(0x448)][_0x47ac0e(0x29f)][_0x47ac0e(0x1ef)](this,_0x3688ac),this['equipAdjustHpMp'](_0x141f9e);}else{function _0x3604ba(){const _0x36840b=_0x47ac0e;return this[_0x36840b(0x4ed)]()?this[_0x36840b(0xef)]():_0x3d4d69['ItemsEquipsCore']['Scene_Item_categoryWindowRect'][_0x36840b(0x1ef)](this);}}}else VisuMZ['ItemsEquipsCore'][_0x47ac0e(0x29f)]['call'](this,_0x3688ac);},Game_Actor[_0x292660(0x3c3)]['releaseUnequippableItems']=function(_0x5443b6){const _0x464e63=_0x292660;for(;;){if(_0x464e63(0x198)===_0x464e63(0xe5)){function _0x113ebc(){_0x463ac2='weapon-%1'['format'](_0x5334a0['id']);}}else{const _0x50c521=this['equipSlots'](),_0x2f9803=this[_0x464e63(0x307)](),_0x160896=_0x2f9803['length'];let _0x4ec835=![];for(let _0x3c5066=0x0;_0x3c5066<_0x160896;_0x3c5066++){const _0x40eb26=_0x2f9803[_0x3c5066];if(_0x40eb26&&(!this[_0x464e63(0x111)](_0x40eb26)||_0x40eb26[_0x464e63(0x2b6)]!==_0x50c521[_0x3c5066])){if(!_0x5443b6){if('evlzz'!==_0x464e63(0x475))this[_0x464e63(0x2df)](null,_0x40eb26);else{function _0x167eba(){const _0x3dfc81=_0x464e63;return this[_0x3dfc81(0x308)]();}}}if(!this[_0x464e63(0x4e7)]){const _0xcec381=JsonEx[_0x464e63(0xfa)](this);_0xcec381['_tempActor']=!![],this[_0x464e63(0x17b)][_0x3c5066][_0x464e63(0x4bf)](null),this[_0x464e63(0x1f4)](_0xcec381);}else this[_0x464e63(0x17b)][_0x3c5066]['setObject'](null);_0x4ec835=!![];}}if(!_0x4ec835){if(_0x464e63(0x122)!=='JgnDp'){function _0x6eced0(){const _0x175120=_0x464e63;return this[_0x175120(0xef)]();}}else break;}}}},Game_Actor[_0x292660(0x3c3)][_0x292660(0x1f4)]=function(_0x3ecefc){const _0x179aea=_0x292660;if(this[_0x179aea(0x4e7)])return;if(!VisuMZ['ItemsEquipsCore']['Settings'][_0x179aea(0xbe)][_0x179aea(0xc5)])return;const _0x431426=Math[_0x179aea(0x364)](_0x3ecefc[_0x179aea(0x3b1)]()*this[_0x179aea(0xaf)]),_0x1c143e=Math[_0x179aea(0x364)](_0x3ecefc[_0x179aea(0x29d)]()*this[_0x179aea(0x3cb)]);if(this['hp']>0x0)this[_0x179aea(0x2a2)](_0x431426);if(this['mp']>0x0)this['setMp'](_0x1c143e);},Game_Actor[_0x292660(0x3c3)][_0x292660(0x246)]=function(){const _0x2e588e=_0x292660,_0x168eb4=this[_0x2e588e(0x3f9)]()[_0x2e588e(0x205)];for(let _0x1d09f0=0x0;_0x1d09f0<_0x168eb4;_0x1d09f0++){if(this[_0x2e588e(0xf3)](_0x1d09f0))this['changeEquip'](_0x1d09f0,null);}},Game_Actor['prototype']['isClearEquipOk']=function(_0x275f80){const _0x550389=_0x292660;return this['nonRemovableEtypes']()[_0x550389(0x261)](this[_0x550389(0x3f9)]()[_0x275f80])?![]:this[_0x550389(0x27e)](_0x275f80);},Game_Actor['prototype'][_0x292660(0x115)]=function(){const _0x405fc8=_0x292660;return VisuMZ[_0x405fc8(0x448)][_0x405fc8(0x465)]['EquipScene'][_0x405fc8(0x1c0)];},Game_Actor[_0x292660(0x3c3)]['optimizeEquipments']=function(){const _0xe8c414=_0x292660,_0x3bda2b=this[_0xe8c414(0x3f9)]()['length'];for(let _0x2c3c14=0x0;_0x2c3c14<_0x3bda2b;_0x2c3c14++){if(this[_0xe8c414(0x3f5)](_0x2c3c14))this[_0xe8c414(0x1f5)](_0x2c3c14,null);}for(let _0x2812d7=0x0;_0x2812d7<_0x3bda2b;_0x2812d7++){if(this[_0xe8c414(0x3f5)](_0x2812d7))this[_0xe8c414(0x1f5)](_0x2812d7,this[_0xe8c414(0x141)](_0x2812d7));}},Game_Actor[_0x292660(0x3c3)][_0x292660(0x3f5)]=function(_0x429b2e){const _0x497ac4=_0x292660;return this[_0x497ac4(0x4d9)]()[_0x497ac4(0x261)](this[_0x497ac4(0x3f9)]()[_0x429b2e])?![]:this['isEquipChangeOk'](_0x429b2e);},Game_Actor['prototype'][_0x292660(0x4d9)]=function(){const _0x2a58be=_0x292660;return VisuMZ[_0x2a58be(0x448)]['Settings'][_0x2a58be(0xbe)][_0x2a58be(0x418)];},VisuMZ['ItemsEquipsCore'][_0x292660(0xcc)]=Game_Actor[_0x292660(0x3c3)][_0x292660(0x2df)],Game_Actor[_0x292660(0x3c3)][_0x292660(0x2df)]=function(_0x1832f2,_0x585053){const _0x2c900e=_0x292660;if(this['_tempActor'])return![];$gameTemp[_0x2c900e(0x1fa)]=!![];const _0x426665=VisuMZ[_0x2c900e(0x448)]['Game_Actor_tradeItemWithParty'][_0x2c900e(0x1ef)](this,_0x1832f2,_0x585053);return $gameTemp[_0x2c900e(0x1fa)]=![],_0x426665;},Game_Actor['prototype'][_0x292660(0x296)]=function(_0x31934d,_0x505d75){const _0x12ffff=_0x292660,_0x3c904b=this['getNextAvailableEtypeId'](_0x31934d);if(_0x3c904b<0x0)return;const _0x1005c1=_0x31934d===0x1?$dataWeapons[_0x505d75]:$dataArmors[_0x505d75];this[_0x12ffff(0x1f5)](_0x3c904b,_0x1005c1);},Game_Actor[_0x292660(0x3c3)][_0x292660(0x3d8)]=function(_0x228823){const _0x167276=_0x292660;let _0x28227f=0x0;const _0x245174=this['equipSlots'](),_0x6daf43=this['equips']();for(let _0x52f8b8=0x0;_0x52f8b8<_0x245174[_0x167276(0x205)];_0x52f8b8++){if(_0x245174[_0x52f8b8]===_0x228823){_0x28227f=_0x52f8b8;if(!_0x6daf43[_0x52f8b8])return _0x28227f;}}return _0x28227f;},VisuMZ[_0x292660(0x448)][_0x292660(0x4a1)]=Game_Actor[_0x292660(0x3c3)][_0x292660(0x336)],Game_Actor['prototype'][_0x292660(0x336)]=function(_0x3c8cb7){const _0x5bd6c8=_0x292660;let _0x2e3c27=VisuMZ[_0x5bd6c8(0x448)]['Game_Actor_paramPlus'][_0x5bd6c8(0x1ef)](this,_0x3c8cb7);for(const _0x202343 of this[_0x5bd6c8(0x307)]()){if('gltLz'!==_0x5bd6c8(0x4e0)){if(_0x202343)_0x2e3c27+=this['paramPlusItemsEquipsCoreCustomJS'](_0x202343,_0x3c8cb7);}else{function _0x440e1c(){const _0x70da5c=_0x5bd6c8;this['processShiftRemoveShortcut'](),this[_0x70da5c(0xb8)]();}}}return _0x2e3c27;},Game_Actor[_0x292660(0x3c3)]['paramPlusItemsEquipsCoreCustomJS']=function(_0x299e1d,_0x25455c){const _0x302dab=_0x292660;if(this[_0x302dab(0x349)])return 0x0;const _0x3d72cc=(DataManager[_0x302dab(0x1cd)](_0x299e1d)?_0x302dab(0x16f):'A%1')['format'](_0x299e1d['id']),_0x56c1f2=_0x302dab(0x379)[_0x302dab(0x169)](_0x3d72cc,_0x25455c);if(VisuMZ['ItemsEquipsCore'][_0x302dab(0x293)][_0x56c1f2]){this[_0x302dab(0x349)]=!![];const _0x13f6c2=VisuMZ[_0x302dab(0x448)]['paramJS'][_0x56c1f2][_0x302dab(0x1ef)](this,_0x299e1d,_0x25455c);return this[_0x302dab(0x349)]=![],_0x13f6c2;}else return 0x0;},Game_Actor[_0x292660(0x3c3)][_0x292660(0xd7)]=function(_0x177d79){const _0x25d86f=_0x292660;this[_0x25d86f(0x3fa)]=!![],this[_0x25d86f(0x455)]=_0x177d79;},VisuMZ['ItemsEquipsCore'][_0x292660(0x197)]=Game_Party[_0x292660(0x3c3)][_0x292660(0x442)],Game_Party['prototype']['initialize']=function(){const _0x5efcf4=_0x292660;VisuMZ[_0x5efcf4(0x448)][_0x5efcf4(0x197)]['call'](this),this['initNewItemsList']();},Game_Party['prototype'][_0x292660(0x2c1)]=function(){const _0x11a9c5=_0x292660;this[_0x11a9c5(0x388)]=[];},Game_Party[_0x292660(0x3c3)][_0x292660(0x301)]=function(_0x686d26){const _0x248ae7=_0x292660;if(!$gameTemp[_0x248ae7(0x3f0)]())return![];if(this[_0x248ae7(0x388)]===undefined)this[_0x248ae7(0x2c1)]();let _0x5a5fdf='';if(DataManager['isItem'](_0x686d26)){if(_0x248ae7(0x10c)!==_0x248ae7(0x10c)){function _0x5a77b0(){return![];}}else _0x5a5fdf='item-%1'['format'](_0x686d26['id']);}else{if(DataManager[_0x248ae7(0x1cd)](_0x686d26))_0x5a5fdf='weapon-%1'[_0x248ae7(0x169)](_0x686d26['id']);else{if(DataManager['isArmor'](_0x686d26))_0x5a5fdf='armor-%1'['format'](_0x686d26['id']);else return;}}return this[_0x248ae7(0x388)]['includes'](_0x5a5fdf);},Game_Party[_0x292660(0x3c3)][_0x292660(0x377)]=function(_0x42da28){const _0x5dc6ec=_0x292660;if(!$gameTemp[_0x5dc6ec(0x3f0)]())return;if(this[_0x5dc6ec(0x388)]===undefined)this[_0x5dc6ec(0x2c1)]();let _0x51ee2f='';if(DataManager[_0x5dc6ec(0x292)](_0x42da28))_0x51ee2f='item-%1'['format'](_0x42da28['id']);else{if(DataManager[_0x5dc6ec(0x1cd)](_0x42da28))_0x51ee2f='weapon-%1'[_0x5dc6ec(0x169)](_0x42da28['id']);else{if(DataManager[_0x5dc6ec(0x33b)](_0x42da28)){if(_0x5dc6ec(0x203)===_0x5dc6ec(0xc7)){function _0x1fe747(){const _0xca2f67=_0x5dc6ec;this[_0xca2f67(0x4ce)]['smoothSelect'](0x0),this[_0xca2f67(0x39c)]();}}else _0x51ee2f=_0x5dc6ec(0x3c0)['format'](_0x42da28['id']);}else return;}}if(!this[_0x5dc6ec(0x388)][_0x5dc6ec(0x261)](_0x51ee2f))this['_newItemsList'][_0x5dc6ec(0x106)](_0x51ee2f);},Game_Party[_0x292660(0x3c3)][_0x292660(0x1ba)]=function(_0x12f526){const _0x4958e0=_0x292660;if(!$gameTemp[_0x4958e0(0x3f0)]())return;if(this[_0x4958e0(0x388)]===undefined)this[_0x4958e0(0x2c1)]();let _0x4b468a='';if(DataManager[_0x4958e0(0x292)](_0x12f526))_0x4b468a=_0x4958e0(0x3dd)['format'](_0x12f526['id']);else{if(DataManager[_0x4958e0(0x1cd)](_0x12f526)){if(_0x4958e0(0xa3)!==_0x4958e0(0x40e))_0x4b468a=_0x4958e0(0x499)[_0x4958e0(0x169)](_0x12f526['id']);else{function _0x1b07c5(){const _0x5964a3=_0x4958e0;delete this[_0x5964a3(0x4ce)][_0x5964a3(0x376)]['ok'],delete this['_categoryWindow'][_0x5964a3(0x376)][_0x5964a3(0x18d)];}}}else{if(DataManager['isArmor'](_0x12f526))_0x4b468a=_0x4958e0(0x3c0)['format'](_0x12f526['id']);else{if(_0x4958e0(0x4c2)!==_0x4958e0(0x36a))return;else{function _0x331f2a(){const _0x1bfc34=_0x4958e0,_0x3c3f84=_0xd36d5b['weaponTypes'][_0x1bfc34(0x291)](_0x321302(_0x399ba5['$1'])[_0x1bfc34(0x508)]());return _0x514a90[_0x1bfc34(0x1cd)](_0x44ce18)&&_0x47f32b[_0x1bfc34(0x161)]===_0x3c3f84;}}}}}if(this[_0x4958e0(0x388)][_0x4958e0(0x261)](_0x4b468a)){if(_0x4958e0(0x214)!==_0x4958e0(0x214)){function _0x4aee46(){const _0x3fd116=_0x4958e0;return this[_0x3fd116(0x480)]();}}else this[_0x4958e0(0x388)][_0x4958e0(0x25d)](this[_0x4958e0(0x388)][_0x4958e0(0x291)](_0x4b468a),0x1);}},VisuMZ[_0x292660(0x448)][_0x292660(0xf6)]=Game_Party[_0x292660(0x3c3)][_0x292660(0x187)],Game_Party[_0x292660(0x3c3)][_0x292660(0x187)]=function(_0x224d16,_0x42d934,_0x19453e){const _0x45e72e=_0x292660,_0x11d80f=this[_0x45e72e(0x1c4)](_0x224d16);VisuMZ[_0x45e72e(0x448)][_0x45e72e(0xf6)][_0x45e72e(0x1ef)](this,_0x224d16,_0x42d934,_0x19453e);if(this[_0x45e72e(0x1c4)](_0x224d16)>_0x11d80f)this[_0x45e72e(0x377)](_0x224d16);},Game_Party[_0x292660(0x3c3)]['maxItems']=function(_0x31f108){return DataManager['maxItemAmount'](_0x31f108);},VisuMZ[_0x292660(0x448)][_0x292660(0x451)]=Scene_ItemBase['prototype'][_0x292660(0x18e)],Scene_ItemBase[_0x292660(0x3c3)][_0x292660(0x18e)]=function(){const _0x59c73d=_0x292660;VisuMZ[_0x59c73d(0x448)][_0x59c73d(0x451)]['call'](this),this['_itemWindow']['callUpdateHelp']();},Scene_Item[_0x292660(0x3c3)][_0x292660(0x259)]=function(){const _0x4ccd92=_0x292660;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x4ccd92(0x1ff)]!==undefined){if(_0x4ccd92(0x277)===_0x4ccd92(0x277))return ConfigManager[_0x4ccd92(0x1ff)];else{function _0x51a4b5(){const _0x287969=_0x4ccd92;_0x4bdd47['ItemsEquipsCore'][_0x287969(0x481)]['call'](this,_0x1135c6),_0x2b002e['ItemsEquipsCore']['Parse_Notetags_EquipSlots'](_0x3eabad);}}}else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x4ccd92(0x30d)]()[_0x4ccd92(0x35a)](/LOWER/i);else Scene_ItemBase[_0x4ccd92(0x3c3)][_0x4ccd92(0x238)][_0x4ccd92(0x1ef)](this);}},Scene_Item['prototype']['isRightInputMode']=function(){const _0x787ba=_0x292660;if(ConfigManager[_0x787ba(0x287)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x787ba(0x427)];else{if(this[_0x787ba(0x4ed)]()){if('buQgD'!==_0x787ba(0x179)){function _0x4b150a(){const _0x50e09a=_0x787ba;_0x5f0883+='\x5cI[%1]'['format'](_0x5d64dd[_0x50e09a(0x2f7)]),_0xc9bb07++;if(_0x14116f>=_0x397244)return _0x50f3bd;}}else return this['updatedLayoutStyle']()['match'](/RIGHT/i);}else Scene_ItemBase[_0x787ba(0x3c3)][_0x787ba(0x238)][_0x787ba(0x1ef)](this);}},Scene_Item['prototype'][_0x292660(0x30d)]=function(){const _0x85e648=_0x292660;return VisuMZ['ItemsEquipsCore']['Settings'][_0x85e648(0x34a)][_0x85e648(0x429)];},Scene_Item[_0x292660(0x3c3)][_0x292660(0x2ac)]=function(){const _0x4b5f6f=_0x292660;return this[_0x4b5f6f(0x4ce)]&&this[_0x4b5f6f(0x4ce)][_0x4b5f6f(0x2ac)]();},Scene_Item[_0x292660(0x3c3)][_0x292660(0x4ed)]=function(){return VisuMZ['ItemsEquipsCore']['Settings']['ItemScene']['EnableLayout'];},VisuMZ[_0x292660(0x448)][_0x292660(0x1ad)]=Scene_Item[_0x292660(0x3c3)][_0x292660(0xa5)],Scene_Item['prototype'][_0x292660(0xa5)]=function(){const _0x1bea2c=_0x292660;VisuMZ[_0x1bea2c(0x448)][_0x1bea2c(0x1ad)][_0x1bea2c(0x1ef)](this),this['isUseModernControls']()&&this[_0x1bea2c(0x39c)]();},Scene_Item[_0x292660(0x3c3)]['helpWindowRect']=function(){const _0x29f440=_0x292660;if(this[_0x29f440(0x4ed)]()){if(_0x29f440(0x37e)!=='jzWZw'){function _0x12210d(){const _0x5cf402=_0x29f440,_0x4e8229=_0x404414[_0x5cf402(0xfa)](_0x4bdc64);_0x4e8229[_0x5cf402(0x4e7)]=!![];const _0x525f11=_0x4e8229[_0x5cf402(0x3f9)]()[_0x5cf402(0x291)](this[_0x5cf402(0x237)]['etypeId']);if(_0x525f11>=0x0)_0x4e8229[_0x5cf402(0x373)](_0x525f11,this['_item']);let _0x582ffa=0x0,_0x23de8a=0x0,_0x3860fa=0x0;_0x547160['VisuMZ_0_CoreEngine']?(_0x582ffa=_0x4e8229[_0x5cf402(0x34d)](_0x1e838d),_0x23de8a=_0x582ffa-_0x4b5da3[_0x5cf402(0x34d)](_0x640164),this[_0x5cf402(0x162)](_0x353cad[_0x5cf402(0x380)](_0x23de8a)),_0x3860fa=(_0x23de8a>=0x0?'+':'')+_0x52c3cb[_0x5cf402(0x140)](_0x23de8a,0x0,_0x2f3015)):(_0x582ffa=_0x4e8229[_0x5cf402(0x3fd)](_0x5d928a),_0x23de8a=_0x582ffa-_0x115d83[_0x5cf402(0x3fd)](_0x3161fc),this['changeTextColor'](_0x2fea4d[_0x5cf402(0x380)](_0x23de8a)),_0x3860fa=(_0x23de8a>=0x0?'+':'')+_0x23de8a);if(_0x3860fa==='+0')_0x3860fa=_0x20ddc1[_0x5cf402(0x2bb)];this[_0x5cf402(0x4f6)](_0x3860fa,_0x48ca8c,_0x59c349,_0x5248f1,_0x5cf402(0x31b));}}else return this[_0x29f440(0x1b1)]();}else{if(_0x29f440(0x241)===_0x29f440(0xab)){function _0x2460bf(){const _0x35d202=_0x29f440;_0x576107['prototype'][_0x35d202(0x335)]['call'](this);for(const _0x28948a of _0x32a56d['members']()){_0x50f2e8[_0x35d202(0x189)](_0x28948a[_0x35d202(0xb0)]());}}}else return Scene_ItemBase[_0x29f440(0x3c3)][_0x29f440(0xf0)]['call'](this);}},Scene_Item[_0x292660(0x3c3)][_0x292660(0x1b1)]=function(){const _0x5ba704=_0x292660,_0x4f4790=0x0,_0x548f9d=this[_0x5ba704(0x2e0)](),_0x33e59a=Graphics[_0x5ba704(0x164)],_0x56b905=this[_0x5ba704(0x415)]();return new Rectangle(_0x4f4790,_0x548f9d,_0x33e59a,_0x56b905);},VisuMZ['ItemsEquipsCore'][_0x292660(0x1bb)]=Scene_Item[_0x292660(0x3c3)][_0x292660(0x45a)],Scene_Item[_0x292660(0x3c3)][_0x292660(0x45a)]=function(){const _0x215fb1=_0x292660;VisuMZ[_0x215fb1(0x448)][_0x215fb1(0x1bb)][_0x215fb1(0x1ef)](this),this[_0x215fb1(0x2ac)]()&&this[_0x215fb1(0x4ff)]();},Scene_Item['prototype'][_0x292660(0x4ff)]=function(){const _0x106b31=_0x292660;delete this[_0x106b31(0x4ce)][_0x106b31(0x376)]['ok'],delete this[_0x106b31(0x4ce)][_0x106b31(0x376)][_0x106b31(0x18d)];},VisuMZ['ItemsEquipsCore'][_0x292660(0x32f)]=Scene_Item[_0x292660(0x3c3)]['categoryWindowRect'],Scene_Item['prototype'][_0x292660(0x38c)]=function(){const _0x21a28d=_0x292660;return this[_0x21a28d(0x4ed)]()?this[_0x21a28d(0xef)]():VisuMZ[_0x21a28d(0x448)][_0x21a28d(0x32f)][_0x21a28d(0x1ef)](this);},Scene_Item[_0x292660(0x3c3)][_0x292660(0xef)]=function(){const _0xc828f=_0x292660,_0xca1d59=0x0,_0x5c9987=this[_0xc828f(0x1d8)](),_0x24e66d=Graphics[_0xc828f(0x164)],_0x5cb84c=this[_0xc828f(0x22f)](0x1,!![]);return new Rectangle(_0xca1d59,_0x5c9987,_0x24e66d,_0x5cb84c);},VisuMZ[_0x292660(0x448)][_0x292660(0x43d)]=Scene_Item['prototype'][_0x292660(0x4b0)],Scene_Item[_0x292660(0x3c3)]['createItemWindow']=function(){const _0x23a43c=_0x292660;VisuMZ['ItemsEquipsCore'][_0x23a43c(0x43d)][_0x23a43c(0x1ef)](this),this[_0x23a43c(0x2ac)]()&&this[_0x23a43c(0x13e)](),this[_0x23a43c(0x4de)]()&&this['createStatusWindow']();},VisuMZ[_0x292660(0x448)][_0x292660(0x217)]=Scene_Item[_0x292660(0x3c3)][_0x292660(0xc2)],Scene_Item[_0x292660(0x3c3)][_0x292660(0xc2)]=function(){const _0x6e8ced=_0x292660;if(this[_0x6e8ced(0x4ed)]())return this['itemWindowRectItemsEquipsCore']();else{const _0x31b15b=VisuMZ['ItemsEquipsCore'][_0x6e8ced(0x217)]['call'](this);return this[_0x6e8ced(0x4de)]()&&this['adjustItemWidthByStatus']()&&(_0x31b15b[_0x6e8ced(0x294)]-=this[_0x6e8ced(0x3ef)]()),_0x31b15b;}},Scene_Item['prototype']['itemWindowRectItemsEquipsCore']=function(){const _0x1d0972=_0x292660,_0x37c03a=this[_0x1d0972(0x238)]()?this[_0x1d0972(0x3ef)]():0x0,_0x3da6a5=this[_0x1d0972(0x4ce)]['y']+this[_0x1d0972(0x4ce)][_0x1d0972(0x12e)],_0x1c0414=Graphics[_0x1d0972(0x164)]-this['statusWidth'](),_0x1059ad=this['mainAreaBottom']()-_0x3da6a5;return new Rectangle(_0x37c03a,_0x3da6a5,_0x1c0414,_0x1059ad);},Scene_Item[_0x292660(0x3c3)]['postCreateItemWindowModernControls']=function(){const _0x595c46=_0x292660;this[_0x595c46(0x463)][_0x595c46(0x408)]('cancel',this['popScene'][_0x595c46(0x412)](this));},Scene_Item[_0x292660(0x3c3)][_0x292660(0x4de)]=function(){const _0x476a80=_0x292660;return this['isUseItemsEquipsCoreUpdatedLayout']()?!![]:VisuMZ[_0x476a80(0x448)][_0x476a80(0x465)][_0x476a80(0x34a)]['ShowShopStatus'];},Scene_Item['prototype']['adjustItemWidthByStatus']=function(){const _0x79ba78=_0x292660;return VisuMZ[_0x79ba78(0x448)][_0x79ba78(0x465)]['ItemScene']['ItemSceneAdjustItemList'];},Scene_Item[_0x292660(0x3c3)][_0x292660(0x232)]=function(){const _0x435fc0=_0x292660,_0x511f8f=this[_0x435fc0(0x134)]();this[_0x435fc0(0x175)]=new Window_ShopStatus(_0x511f8f),this[_0x435fc0(0x319)](this[_0x435fc0(0x175)]),this[_0x435fc0(0x463)]['setStatusWindow'](this[_0x435fc0(0x175)]);const _0x39511a=VisuMZ['ItemsEquipsCore'][_0x435fc0(0x465)]['ItemScene'][_0x435fc0(0x39b)];this['_statusWindow'][_0x435fc0(0x400)](_0x39511a||0x0);},Scene_Item[_0x292660(0x3c3)][_0x292660(0x134)]=function(){const _0x3feaef=_0x292660;return this[_0x3feaef(0x4ed)]()?this['statusWindowRectItemsEquipsCore']():VisuMZ[_0x3feaef(0x448)][_0x3feaef(0x465)][_0x3feaef(0x34a)][_0x3feaef(0x312)][_0x3feaef(0x1ef)](this);},Scene_Item[_0x292660(0x3c3)][_0x292660(0x153)]=function(){const _0x5a1654=_0x292660,_0x5c645d=this[_0x5a1654(0x3ef)](),_0x33d1c3=this['_itemWindow'][_0x5a1654(0x12e)],_0x3164ac=this[_0x5a1654(0x238)]()?0x0:Graphics[_0x5a1654(0x164)]-this['statusWidth'](),_0x4eadeb=this['_itemWindow']['y'];return new Rectangle(_0x3164ac,_0x4eadeb,_0x5c645d,_0x33d1c3);},Scene_Item['prototype'][_0x292660(0x3ef)]=function(){const _0x3fe91a=_0x292660;return Scene_Shop[_0x3fe91a(0x3c3)][_0x3fe91a(0x3ef)]();},Scene_Item[_0x292660(0x3c3)][_0x292660(0xf7)]=function(){const _0x295572=_0x292660;if(!this[_0x295572(0x30d)]())return![];if(!this[_0x295572(0x2ac)]())return![];if(!this['_itemWindow'])return![];if(!this[_0x295572(0x463)][_0x295572(0x2e6)])return![];return this[_0x295572(0x30d)]()&&this[_0x295572(0x2ac)]();},Scene_Item[_0x292660(0x3c3)]['buttonAssistKey1']=function(){const _0x131133=_0x292660;if(this[_0x131133(0xf7)]()){if(this[_0x131133(0x463)][_0x131133(0x35e)]()===0x1){if(_0x131133(0x443)===_0x131133(0x215)){function _0x195f63(){const _0x2d44d8=_0x131133;_0x1d7c56['log']('Damage\x20Formula\x20Error\x20for\x20%1'['format'](this[_0x2d44d8(0x237)][_0x2d44d8(0xc0)])),_0x4af744[_0x2d44d8(0x322)](_0x13a073);}}else return TextManager[_0x131133(0x41a)](_0x131133(0xa6),_0x131133(0x2b3));}else{if(_0x131133(0x3c9)!==_0x131133(0x3f6))return TextManager[_0x131133(0x41a)](_0x131133(0x2cc),'pagedown');else{function _0x1554cb(){const _0xc4a40a=_0x131133;_0x32c54a[_0xc4a40a(0x3c3)]['update'][_0xc4a40a(0x1ef)](this),this[_0xc4a40a(0x463)]&&this[_0xc4a40a(0x463)][_0xc4a40a(0x471)](this['currentExt']());}}}}return Scene_ItemBase[_0x131133(0x3c3)][_0x131133(0x170)]['call'](this);},Scene_Item[_0x292660(0x3c3)][_0x292660(0x2c8)]=function(){const _0x44bf78=_0x292660;if(this[_0x44bf78(0xf7)]())return VisuMZ['ItemsEquipsCore']['Settings'][_0x44bf78(0x34a)][_0x44bf78(0x15e)];return Scene_ItemBase[_0x44bf78(0x3c3)]['buttonAssistText1'][_0x44bf78(0x1ef)](this);},Scene_Equip[_0x292660(0x3c3)][_0x292660(0x259)]=function(){const _0x4e4faf=_0x292660;if(ConfigManager[_0x4e4faf(0x287)]&&ConfigManager['uiHelpPosition']!==undefined){if(_0x4e4faf(0x31e)==='UouLv'){function _0x3629c2(){const _0xd4d5ed=_0x4e4faf;this[_0xd4d5ed(0xae)](_0x12816a)['match'](/\\I\[(\d+)\]/i);const _0x4297b2=_0x1ad147(_0x1e364a['$1'])||0x0,_0x190b5f=this['itemLineRect'](_0x116493),_0x53fad1=_0x190b5f['x']+_0x3157cb[_0xd4d5ed(0x4d8)]((_0x190b5f[_0xd4d5ed(0x294)]-_0x35ff6f[_0xd4d5ed(0x45e)])/0x2),_0x5ad9e2=_0x190b5f['y']+(_0x190b5f['height']-_0x235d8c[_0xd4d5ed(0x281)])/0x2;this[_0xd4d5ed(0x2ed)](_0x4297b2,_0x53fad1,_0x5ad9e2);}}else return ConfigManager[_0x4e4faf(0x1ff)];}else{if(this[_0x4e4faf(0x4ed)]()){if(_0x4e4faf(0x226)==='KLBbM'){function _0x38d72c(){const _0x3f8976=_0x4e4faf;return _0x2c684d[_0x3f8976(0x448)]['Scene_Shop_goldWindowRect'][_0x3f8976(0x1ef)](this);}}else return this[_0x4e4faf(0x30d)]()['match'](/LOWER/i);}else Scene_MenuBase[_0x4e4faf(0x3c3)][_0x4e4faf(0x238)]['call'](this);}},Scene_Equip[_0x292660(0x3c3)][_0x292660(0x238)]=function(){const _0x4aea03=_0x292660;if(ConfigManager[_0x4aea03(0x287)]&&ConfigManager[_0x4aea03(0x427)]!==undefined){if(_0x4aea03(0x430)!==_0x4aea03(0x430)){function _0x101daf(){const _0x8b2229=_0x4aea03;this[_0x8b2229(0x21a)]();}}else return ConfigManager[_0x4aea03(0x427)];}else{if(this[_0x4aea03(0x4ed)]()){if('iuhkP'!==_0x4aea03(0x209))return this[_0x4aea03(0x30d)]()[_0x4aea03(0x35a)](/RIGHT/i);else{function _0x4b38be(){const _0x1be706=_0x4aea03;this[_0x1be706(0x3db)](_0x1b8c64['isTriggered'](_0x1be706(0x2b3)));}}}else Scene_MenuBase['prototype'][_0x4aea03(0x238)]['call'](this);}},Scene_Equip[_0x292660(0x3c3)][_0x292660(0x30d)]=function(){const _0x23baf1=_0x292660;return VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'][_0x23baf1(0x429)];},Scene_Equip[_0x292660(0x3c3)]['isUseModernControls']=function(){const _0x4c54a9=_0x292660;return this[_0x4c54a9(0x3d0)]&&this[_0x4c54a9(0x3d0)][_0x4c54a9(0x2ac)]();},Scene_Equip[_0x292660(0x3c3)][_0x292660(0x4ed)]=function(){const _0x3a275a=_0x292660;return VisuMZ[_0x3a275a(0x448)]['Settings'][_0x3a275a(0xbe)][_0x3a275a(0x10d)];},VisuMZ['ItemsEquipsCore'][_0x292660(0x1d1)]=Scene_Equip[_0x292660(0x3c3)]['create'],Scene_Equip[_0x292660(0x3c3)][_0x292660(0xa5)]=function(){const _0x3abf8c=_0x292660;VisuMZ[_0x3abf8c(0x448)]['Scene_Equip_create'][_0x3abf8c(0x1ef)](this);if(this[_0x3abf8c(0x2ac)]()){if(_0x3abf8c(0x242)===_0x3abf8c(0x242))this[_0x3abf8c(0x200)]();else{function _0x3129dc(){const _0x5c59d1=_0x3abf8c;this[_0x5c59d1(0x12c)](_0x1ff858[_0x5c59d1(0x3cd)]('up'));}}}},Scene_Equip[_0x292660(0x3c3)][_0x292660(0xf0)]=function(){const _0x3a9322=_0x292660;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x3a9322(0x4b6)!==_0x3a9322(0x4b6)){function _0x58c159(){const _0x2369e9=_0x3a9322;this[_0x2369e9(0x236)](),_0x2e2e67[_0x2369e9(0x448)][_0x2369e9(0x31f)][_0x2369e9(0x1ef)](this),this[_0x2369e9(0x4f7)]();}}else return this[_0x3a9322(0x1b1)]();}else{if(_0x3a9322(0x4e6)!==_0x3a9322(0x3b7))return Scene_MenuBase['prototype']['helpWindowRect'][_0x3a9322(0x1ef)](this);else{function _0x3b0c9f(){_0x4c27dd=_0x38e2ed;if(!_0x10e87d[_0xa90fb3])return _0xf0ace7;}}}},Scene_Equip[_0x292660(0x3c3)][_0x292660(0x1b1)]=function(){const _0x5dd657=_0x292660,_0x14aa0e=0x0,_0x23094f=this[_0x5dd657(0x2e0)](),_0x5e87b4=Graphics[_0x5dd657(0x164)],_0x29b745=this[_0x5dd657(0x415)]();return new Rectangle(_0x14aa0e,_0x23094f,_0x5e87b4,_0x29b745);},VisuMZ[_0x292660(0x448)][_0x292660(0x23d)]=Scene_Equip[_0x292660(0x3c3)]['statusWindowRect'],Scene_Equip[_0x292660(0x3c3)]['statusWindowRect']=function(){const _0x2b4b29=_0x292660;return this[_0x2b4b29(0x4ed)]()?this[_0x2b4b29(0x153)]():VisuMZ['ItemsEquipsCore'][_0x2b4b29(0x23d)][_0x2b4b29(0x1ef)](this);},Scene_Equip[_0x292660(0x3c3)][_0x292660(0x153)]=function(){const _0x320927=_0x292660,_0x56e317=this[_0x320927(0x238)]()?0x0:Graphics[_0x320927(0x164)]-this['statusWidth'](),_0x467574=this['mainAreaTop'](),_0xd471dc=this[_0x320927(0x3ef)](),_0x69b248=this['mainAreaHeight']();return new Rectangle(_0x56e317,_0x467574,_0xd471dc,_0x69b248);},VisuMZ[_0x292660(0x448)][_0x292660(0x4d7)]=Scene_Equip[_0x292660(0x3c3)][_0x292660(0x405)],Scene_Equip[_0x292660(0x3c3)][_0x292660(0x405)]=function(){const _0x46e0cc=_0x292660;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x46e0cc(0x295)]():VisuMZ[_0x46e0cc(0x448)][_0x46e0cc(0x4d7)][_0x46e0cc(0x1ef)](this);},Scene_Equip['prototype']['shouldCommandWindowExist']=function(){const _0x217375=_0x292660,_0x59506b=VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'];return _0x59506b[_0x217375(0x2c7)]||_0x59506b[_0x217375(0x156)];},Scene_Equip[_0x292660(0x3c3)][_0x292660(0x295)]=function(){const _0x55c29b=_0x292660,_0x4c7134=this[_0x55c29b(0x393)](),_0x12cb7b=this['isRightInputMode']()?this[_0x55c29b(0x3ef)]():0x0,_0x1278cc=this[_0x55c29b(0x1d8)](),_0x2e4215=Graphics['boxWidth']-this[_0x55c29b(0x3ef)](),_0x5e40b9=_0x4c7134?this[_0x55c29b(0x22f)](0x1,!![]):0x0;return new Rectangle(_0x12cb7b,_0x1278cc,_0x2e4215,_0x5e40b9);},VisuMZ[_0x292660(0x448)][_0x292660(0x137)]=Scene_Equip['prototype'][_0x292660(0x24b)],Scene_Equip['prototype'][_0x292660(0x24b)]=function(){const _0x241799=_0x292660;VisuMZ['ItemsEquipsCore'][_0x241799(0x137)]['call'](this);if(this[_0x241799(0x2ac)]()){if('ANwmm'!==_0x241799(0x1df)){function _0x15f641(){const _0x538814=_0x241799;_0x330d0f=this[_0x538814(0xc1)]['param'](_0x455077);}}else this['postCreateSlotWindowItemsEquipsCore']();}},VisuMZ[_0x292660(0x448)]['Scene_Equip_slotWindowRect']=Scene_Equip[_0x292660(0x3c3)][_0x292660(0x4e3)],Scene_Equip['prototype'][_0x292660(0x4e3)]=function(){const _0x538023=_0x292660;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['slotWindowRectItemsEquipsCore']():VisuMZ[_0x538023(0x448)][_0x538023(0x2a6)][_0x538023(0x1ef)](this);},Scene_Equip['prototype'][_0x292660(0x480)]=function(){const _0x792cc0=_0x292660,_0x1935f2=this[_0x792cc0(0x405)](),_0x5cbd73=this[_0x792cc0(0x238)]()?this['statusWidth']():0x0,_0x19b6ac=_0x1935f2['y']+_0x1935f2[_0x792cc0(0x12e)],_0xa3a38d=Graphics['boxWidth']-this['statusWidth'](),_0x552077=this[_0x792cc0(0x368)]()-_0x1935f2['height'];return new Rectangle(_0x5cbd73,_0x19b6ac,_0xa3a38d,_0x552077);},VisuMZ['ItemsEquipsCore'][_0x292660(0x167)]=Scene_Equip[_0x292660(0x3c3)]['itemWindowRect'],Scene_Equip[_0x292660(0x3c3)][_0x292660(0xc2)]=function(){const _0x4c19bc=_0x292660;return this[_0x4c19bc(0x4ed)]()?this['slotWindowRect']():VisuMZ[_0x4c19bc(0x448)][_0x4c19bc(0x167)]['call'](this);},Scene_Equip[_0x292660(0x3c3)]['statusWidth']=function(){const _0x453e37=_0x292660;if(this[_0x453e37(0x4ed)]()){if('lkfNm'===_0x453e37(0xe6))return this['geUpdatedLayoutStatusWidth']();else{function _0x3c3751(){const _0x465534=_0x453e37;return _0x2a1393['_scene'][_0x465534(0x3e5)]>0x0;}}}else{if('TzaXZ'==='TzaXZ')return VisuMZ[_0x453e37(0x448)]['Settings'][_0x453e37(0xbe)]['StatusWindowWidth'];else{function _0x4e1056(){const _0x2a2e6b=_0x453e37;_0x51e310[_0x2a2e6b(0x448)]['ParseArmorNotetags'][_0x2a2e6b(0x1ef)](this,_0x19822e),_0x36a7e9['ItemsEquipsCore'][_0x2a2e6b(0x1ac)](_0x39c760,_0x3cf295);}}}},Scene_Equip[_0x292660(0x3c3)][_0x292660(0x381)]=function(){const _0x169520=_0x292660;return Math['floor'](Graphics[_0x169520(0x164)]/0x2);},Scene_Equip[_0x292660(0x3c3)][_0x292660(0x283)]=function(){const _0x124de5=_0x292660;this[_0x124de5(0xf9)][_0x124de5(0x408)]('cancel',this['popScene'][_0x124de5(0x412)](this)),this[_0x124de5(0xf9)][_0x124de5(0x408)](_0x124de5(0x450),this[_0x124de5(0x280)][_0x124de5(0x412)](this)),this[_0x124de5(0xf9)][_0x124de5(0x408)](_0x124de5(0x2cc),this[_0x124de5(0xb7)][_0x124de5(0x412)](this));},VisuMZ[_0x292660(0x448)]['Scene_Equip_commandEquip']=Scene_Equip['prototype'][_0x292660(0x200)],Scene_Equip['prototype'][_0x292660(0x200)]=function(){const _0x264e7b=_0x292660;if(this['isUseModernControls']()){if(_0x264e7b(0x1b9)==='KBRgy')this[_0x264e7b(0x3d0)]['deselect'](),this[_0x264e7b(0x3d0)][_0x264e7b(0x23a)]();else{function _0xa73baf(){const _0x5cb730=_0x264e7b;return _0x21d1a8['ItemsEquipsCore'][_0x5cb730(0x47c)][_0x5cb730(0x1ef)](this);}}}VisuMZ[_0x264e7b(0x448)]['Scene_Equip_commandEquip'][_0x264e7b(0x1ef)](this);},VisuMZ[_0x292660(0x448)]['Scene_Equip_onSlotOk']=Scene_Equip[_0x292660(0x3c3)][_0x292660(0x4cb)],Scene_Equip[_0x292660(0x3c3)][_0x292660(0x4cb)]=function(){const _0x16086b=_0x292660;if(this[_0x16086b(0xf9)]['index']()>=0x0)VisuMZ[_0x16086b(0x448)][_0x16086b(0x3a6)][_0x16086b(0x1ef)](this),this['onSlotOkAutoSelect']();else{if(_0x16086b(0x40a)==='sdbWM')this[_0x16086b(0xf9)][_0x16086b(0x4fb)](0x0),this[_0x16086b(0xf9)][_0x16086b(0x413)]();else{function _0xe1cb6c(){const _0x512d22=_0x16086b,_0x2dab81=_0x55089b[_0x512d22(0x11c)]('['+_0x52f6e2['$1'][_0x512d22(0x35a)](/\d+/g)+']');for(const _0x52a405 of _0x2dab81){if(!_0x384ad4['value'](_0x52a405))return![];}return!![];}}}},Scene_Equip[_0x292660(0x3c3)][_0x292660(0x220)]=function(){const _0x531857=_0x292660;this[_0x531857(0x463)][_0x531857(0x4e9)]();const _0x1be165=this[_0x531857(0xf9)][_0x531857(0x378)](),_0x3cf0ee=this[_0x531857(0x463)][_0x531857(0xfc)][_0x531857(0x291)](_0x1be165),_0x20dbdd=Math['floor'](this[_0x531857(0x463)][_0x531857(0x101)]()/0x2)-0x1;this[_0x531857(0x463)][_0x531857(0x4fb)](_0x3cf0ee>=0x0?_0x3cf0ee:0x0),this[_0x531857(0x463)]['setTopRow'](this['_itemWindow'][_0x531857(0x267)]()-_0x20dbdd);},VisuMZ[_0x292660(0x448)]['Scene_Equip_onSlotCancel']=Scene_Equip[_0x292660(0x3c3)][_0x292660(0x279)],Scene_Equip[_0x292660(0x3c3)][_0x292660(0x279)]=function(){const _0x3e5632=_0x292660;VisuMZ['ItemsEquipsCore'][_0x3e5632(0x26e)]['call'](this);if(this[_0x3e5632(0x2ac)]()){if(_0x3e5632(0x433)!==_0x3e5632(0xa0))this['_commandWindow']['smoothSelect'](0x0),this[_0x3e5632(0xf9)]['deactivate']();else{function _0x421dcb(){const _0x25b4bc=_0x3e5632,_0x5290ca=_0x5bb24d[_0x25b4bc(0x448)][_0x25b4bc(0x465)]['New'][_0x25b4bc(0x2b4)];if(_0x5290ca<=0x0)return;const _0x11f863=_0x4e097b[_0x25b4bc(0x4f4)](_0x25b4bc(0x4c9)),_0x1a5dc1=_0x4a596a['iconWidth'],_0x19b2a9=_0x1ace71[_0x25b4bc(0x281)],_0x2d61a1=_0x5290ca%0x10*_0x1a5dc1,_0x37c364=_0x407ec8[_0x25b4bc(0x4d8)](_0x5290ca/0x10)*_0x19b2a9;this[_0x25b4bc(0x131)][_0x25b4bc(0x401)](_0x11f863,_0x2d61a1,_0x37c364,_0x1a5dc1,_0x19b2a9,0x0,0x0);}}}},VisuMZ[_0x292660(0x448)][_0x292660(0x456)]=Scene_Equip[_0x292660(0x3c3)]['onActorChange'],Scene_Equip[_0x292660(0x3c3)]['onActorChange']=function(){const _0x284cae=_0x292660;VisuMZ[_0x284cae(0x448)][_0x284cae(0x456)][_0x284cae(0x1ef)](this);if(this[_0x284cae(0x2ac)]()){if(_0x284cae(0x453)!==_0x284cae(0x44e))this[_0x284cae(0x3d0)][_0x284cae(0x23a)](),this[_0x284cae(0x3d0)][_0x284cae(0x496)](),this[_0x284cae(0xf9)]['smoothSelect'](0x0),this[_0x284cae(0xf9)][_0x284cae(0x413)]();else{function _0x474bbd(){const _0x507251=_0x284cae,_0x13ee79=_0x333bf8(_0x18bf0d['$1']);try{_0x55cae6(_0x13ee79);}catch(_0x1875fb){if(_0x29ee3b[_0x507251(0x31c)]())_0x135573['log'](_0x1875fb);}}}}},Scene_Equip[_0x292660(0x3c3)][_0x292660(0x263)]=function(){const _0x3b135b=_0x292660;if(!this[_0x3b135b(0xf9)])return![];if(!this[_0x3b135b(0xf9)]['active'])return![];return this[_0x3b135b(0xf9)]['isShiftRemoveShortcutEnabled']();},Scene_Equip['prototype'][_0x292660(0x195)]=function(){const _0x5a91bc=_0x292660;if(this[_0x5a91bc(0x263)]())return TextManager[_0x5a91bc(0x435)](_0x5a91bc(0x4ab));return Scene_MenuBase[_0x5a91bc(0x3c3)][_0x5a91bc(0x195)][_0x5a91bc(0x1ef)](this);},Scene_Equip[_0x292660(0x3c3)]['buttonAssistText3']=function(){const _0x248b55=_0x292660;if(this['buttonAssistSlotWindowShift']())return VisuMZ[_0x248b55(0x448)][_0x248b55(0x465)][_0x248b55(0xbe)][_0x248b55(0x454)];return Scene_MenuBase[_0x248b55(0x3c3)]['buttonAssistText3'][_0x248b55(0x1ef)](this);},Scene_Equip[_0x292660(0x3c3)][_0x292660(0x184)]=function(){const _0x7f65ac=_0x292660;if(this['buttonAssistSlotWindowShift']()){if(_0x7f65ac(0x2ce)!=='oDBoV')return this['_buttonAssistWindow'][_0x7f65ac(0x294)]/0x5/-0x3;else{function _0x8bfd7(){return'iconText';}}}return Scene_MenuBase[_0x7f65ac(0x3c3)]['buttonAssistOffset3']['call'](this);},VisuMZ['ItemsEquipsCore']['Scene_Load_reloadMapIfUpdated']=Scene_Load[_0x292660(0x3c3)][_0x292660(0x37d)],Scene_Load['prototype'][_0x292660(0x37d)]=function(){const _0xebf99=_0x292660;VisuMZ[_0xebf99(0x448)][_0xebf99(0x1c1)][_0xebf99(0x1ef)](this),this['refreshActorEquipSlotsIfUpdated']();},Scene_Load[_0x292660(0x3c3)][_0x292660(0x3a8)]=function(){const _0x3dbe98=_0x292660;if($gameSystem['versionId']()!==$dataSystem[_0x3dbe98(0x333)]){if(_0x3dbe98(0x42e)!==_0x3dbe98(0xfd))for(const _0x43bba3 of $gameActors[_0x3dbe98(0xfc)]){if(_0x43bba3)_0x43bba3['prepareNewEquipSlotsOnLoad']();}else{function _0x14613e(){const _0xae0ea1=_0x3dbe98;_0x2255a2[_0xae0ea1(0xed)]=_0x21cc0f(_0x21a7fb['$1']);}}}},Scene_Shop[_0x292660(0x3c3)][_0x292660(0x259)]=function(){const _0x2e1121=_0x292660;if(ConfigManager[_0x2e1121(0x287)]&&ConfigManager[_0x2e1121(0x1ff)]!==undefined)return ConfigManager[_0x2e1121(0x1ff)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x2e1121(0x467)===_0x2e1121(0x467))return this[_0x2e1121(0x30d)]()[_0x2e1121(0x35a)](/LOWER/i);else{function _0xac135a(){const _0x4c1a20=_0x2e1121;this[_0x4c1a20(0x39f)](_0x28472e);}}}else Scene_MenuBase['prototype'][_0x2e1121(0x238)][_0x2e1121(0x1ef)](this);}},Scene_Shop[_0x292660(0x3c3)]['isRightInputMode']=function(){const _0xa5101d=_0x292660;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0xa5101d(0x427)];else{if(this[_0xa5101d(0x4ed)]())return this[_0xa5101d(0x30d)]()['match'](/RIGHT/i);else{if(_0xa5101d(0x3d7)!==_0xa5101d(0x12b))Scene_MenuBase[_0xa5101d(0x3c3)][_0xa5101d(0x238)][_0xa5101d(0x1ef)](this);else{function _0x4b2401(){const _0x266bb0=_0xa5101d;_0x4ec87e=_0x266bb0(0x3dd)[_0x266bb0(0x169)](_0x3c5441['id']);}}}}},Scene_Shop['prototype'][_0x292660(0x30d)]=function(){const _0x4e7159=_0x292660;return VisuMZ[_0x4e7159(0x448)][_0x4e7159(0x465)][_0x4e7159(0x25a)][_0x4e7159(0x429)];},Scene_Shop[_0x292660(0x3c3)][_0x292660(0x2ac)]=function(){const _0x3cfbbb=_0x292660;return this['_categoryWindow']&&this[_0x3cfbbb(0x4ce)]['isUseModernControls']();},Scene_Shop[_0x292660(0x3c3)][_0x292660(0x4ed)]=function(){const _0x24ba9f=_0x292660;return VisuMZ[_0x24ba9f(0x448)][_0x24ba9f(0x465)][_0x24ba9f(0x25a)][_0x24ba9f(0x10d)];},VisuMZ['ItemsEquipsCore'][_0x292660(0x2ec)]=Scene_Shop[_0x292660(0x3c3)][_0x292660(0x1b3)],Scene_Shop['prototype'][_0x292660(0x1b3)]=function(_0x32a780,_0x49b05b){const _0x10d039=_0x292660;_0x32a780=JsonEx[_0x10d039(0xfa)](_0x32a780),VisuMZ[_0x10d039(0x448)]['Scene_Shop_prepare'][_0x10d039(0x1ef)](this,_0x32a780,_0x49b05b),this[_0x10d039(0x145)]();},Scene_Shop[_0x292660(0x3c3)][_0x292660(0x145)]=function(){const _0x935503=_0x292660;this['_goodsCount']=0x0;for(const _0x2e0cc1 of this['_goods']){if(this[_0x935503(0x132)](_0x2e0cc1)){if(_0x935503(0x24f)===_0x935503(0x3b6)){function _0x3c98e9(){return this['statusWindowRectItemsEquipsCore']();}}else this[_0x935503(0x3e5)]++;}else _0x2e0cc1[0x0]=-0x1;}},Scene_Shop['prototype'][_0x292660(0x132)]=function(_0xae28a0){const _0x25f31d=_0x292660;if(_0xae28a0[0x0]>0x2||_0xae28a0[0x0]<0x0)return![];const _0x3837ee=[$dataItems,$dataWeapons,$dataArmors][_0xae28a0[0x0]][_0xae28a0[0x1]];if(!_0x3837ee)return![];const _0x4d1582=_0x3837ee[_0x25f31d(0x445)]||'';if(_0x4d1582[_0x25f31d(0x35a)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2d882e=JSON[_0x25f31d(0x11c)]('['+RegExp['$1'][_0x25f31d(0x35a)](/\d+/g)+']');for(const _0x100e94 of _0x2d882e){if(!$gameSwitches[_0x25f31d(0x188)](_0x100e94))return![];}return!![];}if(_0x4d1582[_0x25f31d(0x35a)](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3af36f=JSON[_0x25f31d(0x11c)]('['+RegExp['$1'][_0x25f31d(0x35a)](/\d+/g)+']');for(const _0x5d8068 of _0x3af36f){if(!$gameSwitches['value'](_0x5d8068))return![];}return!![];}if(_0x4d1582[_0x25f31d(0x35a)](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('SQqrj'===_0x25f31d(0x1af)){const _0x390e9f=JSON['parse']('['+RegExp['$1'][_0x25f31d(0x35a)](/\d+/g)+']');for(const _0x1c8116 of _0x390e9f){if($gameSwitches[_0x25f31d(0x188)](_0x1c8116))return!![];}return![];}else{function _0x49cce0(){const _0x8539c=_0x25f31d,_0x33f470=_0x23fc5c[_0x8539c(0x448)][_0x8539c(0x465)][_0x8539c(0xf5)],_0x5a1031=_0x33f470['Text'];if(_0x5a1031==='')return;const _0x51fa0f=_0x1c5377[_0x8539c(0x45e)],_0x4b35ba=_0x2df4fe['iconHeight'];this[_0x8539c(0x131)][_0x8539c(0x425)]=_0x33f470['FontFace']||_0x17cf40[_0x8539c(0x4b1)](),this[_0x8539c(0x131)][_0x8539c(0x3ea)]=this['getTextColor'](),this[_0x8539c(0x131)][_0x8539c(0x269)]=_0x33f470[_0x8539c(0x270)],this[_0x8539c(0x131)][_0x8539c(0x4f6)](_0x5a1031,0x0,_0x4b35ba/0x2,_0x51fa0f,_0x4b35ba/0x2,_0x8539c(0x31b));}}}if(_0x4d1582[_0x25f31d(0x35a)](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4b7778=JSON['parse']('['+RegExp['$1'][_0x25f31d(0x35a)](/\d+/g)+']');for(const _0x3bf214 of _0x4b7778){if(!$gameSwitches[_0x25f31d(0x188)](_0x3bf214))return!![];}return![];}if(_0x4d1582[_0x25f31d(0x35a)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2bb4ae=JSON[_0x25f31d(0x11c)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x88c122 of _0x2bb4ae){if(!$gameSwitches[_0x25f31d(0x188)](_0x88c122))return!![];}return![];}if(_0x4d1582['match'](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x660747=JSON[_0x25f31d(0x11c)]('['+RegExp['$1'][_0x25f31d(0x35a)](/\d+/g)+']');for(const _0x267325 of _0x660747){if($gameSwitches[_0x25f31d(0x188)](_0x267325))return![];}return!![];}return!![];},VisuMZ['ItemsEquipsCore'][_0x292660(0x370)]=Scene_Shop[_0x292660(0x3c3)][_0x292660(0xa5)],Scene_Shop[_0x292660(0x3c3)][_0x292660(0xa5)]=function(){const _0x22fe81=_0x292660;VisuMZ['ItemsEquipsCore'][_0x22fe81(0x370)][_0x22fe81(0x1ef)](this),this[_0x22fe81(0x4ed)]()&&this[_0x22fe81(0x361)](),this['resetShopSwitches']();},Scene_Shop['prototype'][_0x292660(0x361)]=function(){const _0x18e70c=_0x292660;this[_0x18e70c(0x488)]['hide'](),this[_0x18e70c(0x2a0)]['show'](),this[_0x18e70c(0x2a0)][_0x18e70c(0x496)](),this[_0x18e70c(0x175)][_0x18e70c(0x110)]();},Scene_Shop[_0x292660(0x3c3)][_0x292660(0xf0)]=function(){const _0x34e511=_0x292660;return this[_0x34e511(0x4ed)]()?this[_0x34e511(0x1b1)]():Scene_MenuBase['prototype'][_0x34e511(0xf0)][_0x34e511(0x1ef)](this);},Scene_Shop[_0x292660(0x3c3)][_0x292660(0x1b1)]=function(){const _0xfe49c4=_0x292660,_0x320212=0x0,_0xbe0237=this[_0xfe49c4(0x2e0)](),_0x4828a8=Graphics[_0xfe49c4(0x164)],_0x50a825=this['helpAreaHeight']();return new Rectangle(_0x320212,_0xbe0237,_0x4828a8,_0x50a825);},VisuMZ[_0x292660(0x448)][_0x292660(0x3e3)]=Scene_Shop[_0x292660(0x3c3)]['goldWindowRect'],Scene_Shop[_0x292660(0x3c3)][_0x292660(0x2b2)]=function(){const _0x1a4a02=_0x292660;return this[_0x1a4a02(0x4ed)]()?this[_0x1a4a02(0x503)]():VisuMZ[_0x1a4a02(0x448)][_0x1a4a02(0x3e3)][_0x1a4a02(0x1ef)](this);},Scene_Shop[_0x292660(0x3c3)][_0x292660(0x503)]=function(){const _0x4db9ca=_0x292660,_0x1b1738=this[_0x4db9ca(0x30b)](),_0x44067f=this[_0x4db9ca(0x22f)](0x1,!![]),_0x4ab2e8=this[_0x4db9ca(0x238)]()?0x0:Graphics[_0x4db9ca(0x164)]-_0x1b1738,_0x5309a5=this[_0x4db9ca(0x1d8)]();return new Rectangle(_0x4ab2e8,_0x5309a5,_0x1b1738,_0x44067f);},VisuMZ[_0x292660(0x448)]['Scene_Shop_commandWindowRect']=Scene_Shop['prototype'][_0x292660(0x405)],Scene_Shop['prototype'][_0x292660(0x405)]=function(){const _0x22e1ef=_0x292660;return this[_0x22e1ef(0x4ed)]()?this[_0x22e1ef(0x295)]():VisuMZ['ItemsEquipsCore']['Scene_Shop_commandWindowRect']['call'](this);},Scene_Shop['prototype'][_0x292660(0x295)]=function(){const _0x28007d=_0x292660,_0x26094c=this[_0x28007d(0x238)]()?this['mainCommandWidth']():0x0,_0x2b1f96=this['mainAreaTop'](),_0x26fb44=Graphics[_0x28007d(0x164)]-this['mainCommandWidth'](),_0x13bf28=this[_0x28007d(0x22f)](0x1,!![]);return new Rectangle(_0x26094c,_0x2b1f96,_0x26fb44,_0x13bf28);},VisuMZ[_0x292660(0x448)][_0x292660(0x1e4)]=Scene_Shop[_0x292660(0x3c3)]['numberWindowRect'],Scene_Shop[_0x292660(0x3c3)]['numberWindowRect']=function(){const _0x2be406=_0x292660;if(this[_0x2be406(0x4ed)]()){if(_0x2be406(0x219)!==_0x2be406(0x219)){function _0x50704f(){this['postCreateItemWindowModernControls']();}}else return this['numberWindowRectItemsEquipsCore']();}else return VisuMZ[_0x2be406(0x448)][_0x2be406(0x1e4)]['call'](this);},Scene_Shop['prototype'][_0x292660(0xfe)]=function(){const _0x1cdbf8=_0x292660,_0x67ef7f=this['_commandWindow']['y']+this['_commandWindow']['height'],_0x51a311=Graphics[_0x1cdbf8(0x164)]-this[_0x1cdbf8(0x3ef)](),_0x274601=this[_0x1cdbf8(0x238)]()?Graphics[_0x1cdbf8(0x164)]-_0x51a311:0x0,_0x1f1019=this[_0x1cdbf8(0x368)]()-this[_0x1cdbf8(0x3d0)][_0x1cdbf8(0x12e)];return new Rectangle(_0x274601,_0x67ef7f,_0x51a311,_0x1f1019);},VisuMZ['ItemsEquipsCore'][_0x292660(0x21d)]=Scene_Shop[_0x292660(0x3c3)][_0x292660(0x134)],Scene_Shop['prototype']['statusWindowRect']=function(){const _0x1bba46=_0x292660;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x1bba46(0x224)===_0x1bba46(0x395)){function _0x1058b8(){const _0x1b18b7=_0x1bba46;return _0x5c2fba[_0x1b18b7(0x4d8)](_0x27a877[_0x1b18b7(0x164)]/0x2);}}else return this[_0x1bba46(0x153)]();}else return VisuMZ[_0x1bba46(0x448)]['Scene_Shop_statusWindowRect'][_0x1bba46(0x1ef)](this);},Scene_Shop['prototype'][_0x292660(0x153)]=function(){const _0x480ada=_0x292660,_0x5dd06b=this[_0x480ada(0x3ef)](),_0x4024c7=this[_0x480ada(0x368)]()-this[_0x480ada(0x3d0)][_0x480ada(0x12e)],_0x52e807=this[_0x480ada(0x238)]()?0x0:Graphics['boxWidth']-_0x5dd06b,_0x837d96=this[_0x480ada(0x3d0)]['y']+this['_commandWindow'][_0x480ada(0x12e)];return new Rectangle(_0x52e807,_0x837d96,_0x5dd06b,_0x4024c7);},VisuMZ['ItemsEquipsCore'][_0x292660(0x47c)]=Scene_Shop[_0x292660(0x3c3)][_0x292660(0x151)],Scene_Shop['prototype'][_0x292660(0x151)]=function(){const _0x32f030=_0x292660;return this[_0x32f030(0x4ed)]()?this[_0x32f030(0x249)]():VisuMZ[_0x32f030(0x448)][_0x32f030(0x47c)][_0x32f030(0x1ef)](this);},Scene_Shop[_0x292660(0x3c3)][_0x292660(0x249)]=function(){const _0x5cf0f0=_0x292660,_0x29a15c=this[_0x5cf0f0(0x3d0)]['y']+this[_0x5cf0f0(0x3d0)][_0x5cf0f0(0x12e)],_0xff15a1=Graphics[_0x5cf0f0(0x164)]-this['statusWidth'](),_0x24ac71=this[_0x5cf0f0(0x368)]()-this[_0x5cf0f0(0x3d0)][_0x5cf0f0(0x12e)],_0x33e982=this['isRightInputMode']()?Graphics[_0x5cf0f0(0x164)]-_0xff15a1:0x0;return new Rectangle(_0x33e982,_0x29a15c,_0xff15a1,_0x24ac71);},VisuMZ[_0x292660(0x448)][_0x292660(0x20f)]=Scene_Shop['prototype']['createCategoryWindow'],Scene_Shop[_0x292660(0x3c3)][_0x292660(0x45a)]=function(){const _0x2e741e=_0x292660;VisuMZ[_0x2e741e(0x448)][_0x2e741e(0x20f)][_0x2e741e(0x1ef)](this),this[_0x2e741e(0x2ac)]()&&this['postCreateCategoryWindowItemsEquipsCore']();},VisuMZ[_0x292660(0x448)]['Scene_Shop_categoryWindowRect']=Scene_Shop[_0x292660(0x3c3)][_0x292660(0x38c)],Scene_Shop['prototype'][_0x292660(0x38c)]=function(){const _0x659713=_0x292660;if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x659713(0xef)]();else{if(_0x659713(0x1b2)===_0x659713(0x1b2))return VisuMZ[_0x659713(0x448)]['Scene_Shop_categoryWindowRect'][_0x659713(0x1ef)](this);else{function _0x5e736f(){const _0x1592e7=_0x659713,_0x116937=this[_0x1592e7(0x267)]();return _0x420583['isPressed']('shift')?this[_0x1592e7(0x2a4)]():this[_0x1592e7(0x2f9)](_0x190672[_0x1592e7(0x3cd)]('down')),this[_0x1592e7(0x267)]()!==_0x116937&&this[_0x1592e7(0x274)](),!![];}}}},Scene_Shop['prototype']['categoryWindowRectItemsEquipsCore']=function(){const _0x178190=_0x292660,_0x5dcfa0=this[_0x178190(0x3d0)]['y'],_0x22df46=this[_0x178190(0x3d0)][_0x178190(0x294)],_0x376042=this[_0x178190(0x22f)](0x1,!![]),_0xd7c1ca=this['isRightInputMode']()?Graphics[_0x178190(0x164)]-_0x22df46:0x0;return new Rectangle(_0xd7c1ca,_0x5dcfa0,_0x22df46,_0x376042);},Scene_Shop['prototype'][_0x292660(0x4ff)]=function(){const _0x1edff4=_0x292660;delete this[_0x1edff4(0x4ce)][_0x1edff4(0x376)]['ok'],delete this[_0x1edff4(0x4ce)][_0x1edff4(0x376)][_0x1edff4(0x18d)];},VisuMZ['ItemsEquipsCore'][_0x292660(0xbd)]=Scene_Shop[_0x292660(0x3c3)]['createSellWindow'],Scene_Shop[_0x292660(0x3c3)]['createSellWindow']=function(){const _0x2d0227=_0x292660;VisuMZ[_0x2d0227(0x448)][_0x2d0227(0xbd)][_0x2d0227(0x1ef)](this),this[_0x2d0227(0x4ed)]()&&this[_0x2d0227(0x391)]();},VisuMZ[_0x292660(0x448)][_0x292660(0x21b)]=Scene_Shop[_0x292660(0x3c3)]['sellWindowRect'],Scene_Shop[_0x292660(0x3c3)][_0x292660(0x3ff)]=function(){const _0x481396=_0x292660;if(this[_0x481396(0x4ed)]()){if(_0x481396(0x38f)==='AKfqB')return this[_0x481396(0x374)]();else{function _0x21f343(){return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}}}else return VisuMZ[_0x481396(0x448)][_0x481396(0x21b)][_0x481396(0x1ef)](this);},Scene_Shop[_0x292660(0x3c3)][_0x292660(0x374)]=function(){const _0x39b837=_0x292660,_0x56a130=this['_categoryWindow']['y']+this[_0x39b837(0x4ce)][_0x39b837(0x12e)],_0x2b5d05=Graphics[_0x39b837(0x164)]-this[_0x39b837(0x3ef)](),_0x4e9880=this['mainAreaHeight']()-this[_0x39b837(0x4ce)][_0x39b837(0x12e)],_0x32ccc6=this['isRightInputMode']()?Graphics['boxWidth']-_0x2b5d05:0x0;return new Rectangle(_0x32ccc6,_0x56a130,_0x2b5d05,_0x4e9880);},Scene_Shop[_0x292660(0x3c3)][_0x292660(0x391)]=function(){const _0x44e496=_0x292660;this[_0x44e496(0x30c)][_0x44e496(0x4cd)](this[_0x44e496(0x175)]);},Scene_Shop[_0x292660(0x3c3)][_0x292660(0x3ef)]=function(){const _0x1ad796=_0x292660;return VisuMZ['ItemsEquipsCore'][_0x1ad796(0x465)][_0x1ad796(0x126)][_0x1ad796(0x165)];},VisuMZ[_0x292660(0x448)][_0x292660(0x1c3)]=Scene_Shop[_0x292660(0x3c3)][_0x292660(0x482)],Scene_Shop[_0x292660(0x3c3)][_0x292660(0x482)]=function(){const _0x21ee99=_0x292660;VisuMZ[_0x21ee99(0x448)]['Scene_Shop_activateSellWindow'][_0x21ee99(0x1ef)](this),this[_0x21ee99(0x4ed)]()&&this[_0x21ee99(0x175)]['show'](),this['_sellWindow'][_0x21ee99(0xb8)]();},VisuMZ[_0x292660(0x448)][_0x292660(0x46f)]=Scene_Shop[_0x292660(0x3c3)]['commandBuy'],Scene_Shop[_0x292660(0x3c3)]['commandBuy']=function(){const _0x1d321f=_0x292660;VisuMZ['ItemsEquipsCore'][_0x1d321f(0x46f)][_0x1d321f(0x1ef)](this);if(this[_0x1d321f(0x4ed)]()){if('COQRz'===_0x1d321f(0x265)){function _0x2ed4e4(){return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}}else this[_0x1d321f(0xe9)]();}},Scene_Shop['prototype'][_0x292660(0xe9)]=function(){const _0x865213=_0x292660;this[_0x865213(0x458)]=this[_0x865213(0x458)]||0x0,this[_0x865213(0x2a0)][_0x865213(0x4fb)](this[_0x865213(0x458)]);},VisuMZ[_0x292660(0x448)][_0x292660(0x14b)]=Scene_Shop[_0x292660(0x3c3)][_0x292660(0x1e1)],Scene_Shop['prototype'][_0x292660(0x1e1)]=function(){const _0x12fa54=_0x292660;VisuMZ[_0x12fa54(0x448)]['Scene_Shop_commandSell']['call'](this);if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x12fa54(0x25f)!=='uEjIh'){function _0x393f83(){const _0x71998f=_0x12fa54,_0x294c9a=_0xc98bfa[_0x71998f(0x11c)]('['+_0x14ea10['$1'][_0x71998f(0x35a)](/\d+/g)+']');for(const _0x3a9410 of _0x294c9a){if(!_0x2ba072[_0x71998f(0x188)](_0x3a9410))return!![];}return![];}}else this[_0x12fa54(0x26c)]();}if(this[_0x12fa54(0x2ac)]()){if(_0x12fa54(0x344)==='XJFKu')this[_0x12fa54(0x4ce)][_0x12fa54(0x4fb)](0x0),this[_0x12fa54(0x39c)]();else{function _0x52c87f(){const _0x316072=_0x12fa54,_0x58c8c6=_0x1b68f5['x']+_0x44b740['floor']((_0x57959c[_0x316072(0x294)]-_0x5c5c4d)/0x2);this[_0x316072(0x483)](_0x5210bc,_0x58c8c6,_0x428d53['y'],_0x475ed3);}}}},Scene_Shop[_0x292660(0x3c3)][_0x292660(0x26c)]=function(){const _0x412197=_0x292660;this[_0x412197(0x2a0)][_0x412197(0x28a)](),this[_0x412197(0x3d0)][_0x412197(0x28a)]();},VisuMZ[_0x292660(0x448)][_0x292660(0x4a2)]=Scene_Shop[_0x292660(0x3c3)][_0x292660(0x4d5)],Scene_Shop['prototype'][_0x292660(0x4d5)]=function(){const _0x59ff36=_0x292660;VisuMZ[_0x59ff36(0x448)]['Scene_Shop_onBuyCancel'][_0x59ff36(0x1ef)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x59ff36(0x3c8)]();},Scene_Shop[_0x292660(0x3c3)][_0x292660(0x3c8)]=function(){const _0x2b6103=_0x292660;this['_buyWindowLastIndex']=this['_buyWindow'][_0x2b6103(0x267)](),this[_0x2b6103(0x2a0)][_0x2b6103(0x110)](),this[_0x2b6103(0x2a0)][_0x2b6103(0x496)](),this[_0x2b6103(0x2a0)][_0x2b6103(0x3b8)](0x0,0x0),this['_statusWindow'][_0x2b6103(0x110)](),this[_0x2b6103(0x488)][_0x2b6103(0x28a)]();},VisuMZ['ItemsEquipsCore']['Scene_Shop_onCategoryCancel']=Scene_Shop[_0x292660(0x3c3)][_0x292660(0x1c8)],Scene_Shop['prototype'][_0x292660(0x1c8)]=function(){const _0x2043d8=_0x292660;VisuMZ[_0x2043d8(0x448)][_0x2043d8(0x436)]['call'](this);if(this[_0x2043d8(0x4ed)]()){if('XqiSK'===_0x2043d8(0x1ed)){function _0x5ab388(){const _0x14ed55=_0x209145['parse']('['+_0x3f93a4['$1']['match'](/\d+/g)+']');for(const _0x1d83d7 of _0x14ed55){if(_0xb82353['value'](_0x1d83d7))return![];}}}else this[_0x2043d8(0x2f4)]();}},Scene_Shop[_0x292660(0x3c3)]['onCategoryCancelItemsEquipsCore']=function(){const _0x321d98=_0x292660;this['_buyWindow'][_0x321d98(0x110)](),this['_commandWindow']['show']();},VisuMZ['ItemsEquipsCore'][_0x292660(0x37c)]=Scene_Shop[_0x292660(0x3c3)]['onSellOk'],Scene_Shop['prototype'][_0x292660(0x1d5)]=function(){const _0x1ce59a=_0x292660;VisuMZ[_0x1ce59a(0x448)][_0x1ce59a(0x37c)][_0x1ce59a(0x1ef)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x1ce59a(0x29b)]();},Scene_Shop[_0x292660(0x3c3)][_0x292660(0x29b)]=function(){const _0x4eb9b3=_0x292660;this[_0x4eb9b3(0x4ce)]['show']();},VisuMZ[_0x292660(0x448)][_0x292660(0x24e)]=Scene_Shop[_0x292660(0x3c3)][_0x292660(0xdd)],Scene_Shop['prototype']['onSellCancel']=function(){const _0x5b0ee3=_0x292660;VisuMZ[_0x5b0ee3(0x448)][_0x5b0ee3(0x24e)][_0x5b0ee3(0x1ef)](this);this[_0x5b0ee3(0x2ac)]()&&this[_0x5b0ee3(0x1c8)]();if(this[_0x5b0ee3(0x4ed)]()){if(_0x5b0ee3(0x4d1)===_0x5b0ee3(0x1ab)){function _0x231451(){const _0x2d65c6=_0x5b0ee3;if(this[_0x2d65c6(0x237)]['damage'][_0x2d65c6(0x25b)]<=0x0)return _0x717809;if(this[_0x2d65c6(0x2bd)](_0x337bca,_0x53324e,_0x105079))_0x38287a+=this[_0x2d65c6(0x1a9)]();if(this[_0x2d65c6(0x222)](_0x4dbcf2,_0x3f403b,_0x5c6abb))_0xed07bd+=this['lineHeight']();return this[_0x2d65c6(0x204)](),_0x5d1424;}}else this[_0x5b0ee3(0x488)][_0x5b0ee3(0x28a)]();}},VisuMZ[_0x292660(0x448)][_0x292660(0x28c)]=Scene_Shop['prototype'][_0x292660(0x4f9)],Scene_Shop['prototype']['sellingPrice']=function(){const _0xbea62=_0x292660;let _0x1cc607=this[_0xbea62(0xee)]();const _0x5850f4=this[_0xbea62(0x237)];return _0x1cc607=VisuMZ[_0xbea62(0x448)][_0xbea62(0x465)][_0xbea62(0x25a)][_0xbea62(0x38a)]['call'](this,_0x5850f4,_0x1cc607),_0x1cc607;},Scene_Shop[_0x292660(0x3c3)]['determineBaseSellingPrice']=function(){const _0x42382f=_0x292660;if(!this[_0x42382f(0x237)])return 0x0;else{if(this[_0x42382f(0x237)]['note'][_0x42382f(0x35a)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){if(_0x42382f(0x490)===_0x42382f(0x1ea)){function _0x421989(){const _0x499a9d=_0x42382f,_0x5eb87e=this[_0x499a9d(0x31a)](this[_0x499a9d(0x267)]());let _0x56f6b4=this[_0x499a9d(0xae)](this[_0x499a9d(0x267)]());_0x56f6b4=_0x56f6b4['replace'](/\\I\[(\d+)\]/gi,''),_0x343849['resetFontSettings'](),this['categoryNameWindowDrawBackground'](_0x56f6b4,_0x5eb87e),this[_0x499a9d(0x129)](_0x56f6b4,_0x5eb87e),this[_0x499a9d(0x3f3)](_0x56f6b4,_0x5eb87e);}}else{const _0x2f8ba3=String(RegExp['$1']);let _0x16bdb0=this[_0x42382f(0x237)],_0x1fc2e4=_0x16bdb0[_0x42382f(0xed)]*this[_0x42382f(0xf2)]();try{eval(_0x2f8ba3);}catch(_0x2f56e0){if('dCydR'!==_0x42382f(0x233)){if($gameTemp[_0x42382f(0x31c)]())console['log'](_0x2f56e0);}else{function _0x3bc4de(){const _0x3ad7ff=_0x42382f;_0x48ad2b[_0x3ad7ff(0x106)](_0xba43d8[_0x4a1b0f]);}}}if(isNaN(_0x1fc2e4))_0x1fc2e4=0x0;return Math['floor'](_0x1fc2e4);}}else{if(this['_item'][_0x42382f(0x445)][_0x42382f(0x35a)](/<SELL PRICE:[ ](\d+)>/i))return parseInt(RegExp['$1']);else{if(_0x42382f(0x432)!=='IUDBZ'){function _0x54dfaf(){const _0x5114f8=_0x42382f;_0x47cbf9=_0x4bb400||'',_0x5d28db=_0x4fcc92||_0x5114f8(0xa6),this[_0x5114f8(0xd3)]=this[_0x5114f8(0x23b)](),this[_0x5114f8(0xb6)]=_0x5375b3?_0x4f3f2b[_0x5114f8(0x2c9)]():this[_0x5114f8(0x3cc)][_0x5114f8(0x3ea)],_0x2047b2+=this[_0x5114f8(0x2f2)](),_0x459dfb-=this[_0x5114f8(0x2f2)]()*0x2;const _0x4f4e5d=this[_0x5114f8(0x28b)](_0x182fd0);if(_0x89bcd5==='center')_0x37ef27=_0x159fcd+_0x3f50b2[_0x5114f8(0x4d8)]((_0x520767-_0x4f4e5d[_0x5114f8(0x294)])/0x2);else _0x11bab6===_0x5114f8(0x2b3)&&(_0x487e20=_0x1cc8f3+_0x5deca6-_0x4f4e5d[_0x5114f8(0x294)]);_0x5204b7+=(this[_0x5114f8(0x1a9)]()-_0x4f4e5d[_0x5114f8(0x12e)])/0x2,this[_0x5114f8(0x483)](_0x2820af,_0x1c3378,_0x5700b2,_0x4cf820),this[_0x5114f8(0xd3)]=_0xfc5a0b,this[_0x5114f8(0xb6)]=_0x285f9b,this[_0x5114f8(0x204)]();}}else return Math['floor'](this[_0x42382f(0x237)][_0x42382f(0xed)]*this[_0x42382f(0xf2)]());}}}},Scene_Shop['prototype'][_0x292660(0xf2)]=function(){const _0x4f330e=_0x292660;return VisuMZ[_0x4f330e(0x448)][_0x4f330e(0x465)][_0x4f330e(0x25a)]['SellPriceRate'];},Scene_Shop[_0x292660(0x3c3)]['buttonAssistItemListRequirement']=function(){const _0x351d36=_0x292660;if(!this['updatedLayoutStyle']())return![];if(!this[_0x351d36(0x2ac)]())return![];if(!this[_0x351d36(0x30c)])return![];if(!this[_0x351d36(0x30c)][_0x351d36(0x2e6)])return![];return this[_0x351d36(0x30d)]()&&this['isUseModernControls']();},Scene_Shop[_0x292660(0x3c3)][_0x292660(0x170)]=function(){const _0x6edb83=_0x292660;if(this['buttonAssistItemListRequirement']()){if('pyYAd'!==_0x6edb83(0x185)){function _0x84fd9d(){_0x585a35['width']-=this['statusWidth']();}}else{if(this[_0x6edb83(0x30c)]['maxCols']()===0x1){if(_0x6edb83(0x298)!==_0x6edb83(0x4e1))return TextManager[_0x6edb83(0x41a)](_0x6edb83(0xa6),'right');else{function _0x57d1fd(){const _0x2dc572=_0x6edb83;_0x2920d0[_0x2dc572(0x3c3)][_0x2dc572(0x337)][_0x2dc572(0x1ef)](this,_0x119746);}}}else{if(_0x6edb83(0x315)===_0x6edb83(0x22b)){function _0x106fcd(){const _0x2ecd3c=_0x6edb83;let _0x7f18fe=_0x3604f2['ItemsEquipsCore']['Game_Actor_paramPlus'][_0x2ecd3c(0x1ef)](this,_0x2dcb9f);for(const _0x287f48 of this['equips']()){if(_0x287f48)_0x7f18fe+=this[_0x2ecd3c(0x2b1)](_0x287f48,_0x440c8b);}return _0x7f18fe;}}else return TextManager[_0x6edb83(0x41a)](_0x6edb83(0x2cc),_0x6edb83(0x450));}}}else{if(this[_0x6edb83(0x1ca)]&&this['_numberWindow']['active']){if(_0x6edb83(0x4f2)===_0x6edb83(0x3b3)){function _0x23b134(){return![];}}else return TextManager[_0x6edb83(0x41a)](_0x6edb83(0xa6),_0x6edb83(0x2b3));}}return Scene_MenuBase[_0x6edb83(0x3c3)][_0x6edb83(0x170)]['call'](this);},Scene_Shop['prototype'][_0x292660(0x48f)]=function(){const _0x3dd3e1=_0x292660;if(this[_0x3dd3e1(0x1ca)]&&this['_numberWindow'][_0x3dd3e1(0x2e6)]){if('NzBGq'!==_0x3dd3e1(0x49c))return TextManager[_0x3dd3e1(0x41a)]('up',_0x3dd3e1(0x4af));else{function _0x505f21(){const _0x47c7b0=_0x3dd3e1,_0x2aa493=_0x47c7b0(0x46c);if(this[_0x47c7b0(0x2fb)][_0x2aa493])return this[_0x47c7b0(0x2fb)][_0x2aa493];let _0x4b7da3='';if(this[_0x47c7b0(0x211)][_0x47c7b0(0x498)]>0x0)_0x4b7da3+=_0x47c7b0(0x4ba)[_0x47c7b0(0x169)](_0x530e7d['floor'](this[_0x47c7b0(0x211)][_0x47c7b0(0x498)]*0x64));if(this[_0x47c7b0(0x211)][_0x47c7b0(0x498)]>0x0&&this[_0x47c7b0(0x211)][_0x47c7b0(0x3ab)]>0x0)_0x4b7da3+='\x20';if(this[_0x47c7b0(0x211)]['flatMP']>0x0)_0x4b7da3+=_0x47c7b0(0x457)[_0x47c7b0(0x169)](this['_itemData'][_0x47c7b0(0x3ab)]);return _0x4b7da3;}}}return Scene_MenuBase[_0x3dd3e1(0x3c3)]['buttonAssistKey2'][_0x3dd3e1(0x1ef)](this);},Scene_Shop['prototype'][_0x292660(0x2c8)]=function(){const _0x35cbcd=_0x292660;if(this[_0x35cbcd(0xf7)]())return VisuMZ[_0x35cbcd(0x448)][_0x35cbcd(0x465)][_0x35cbcd(0x34a)]['buttonAssistCategory'];else{if(this['_numberWindow']&&this[_0x35cbcd(0x1ca)]['active'])return VisuMZ['ItemsEquipsCore'][_0x35cbcd(0x465)][_0x35cbcd(0x25a)][_0x35cbcd(0x494)];}return Scene_MenuBase[_0x35cbcd(0x3c3)]['buttonAssistText1'][_0x35cbcd(0x1ef)](this);},Scene_Shop[_0x292660(0x3c3)][_0x292660(0x216)]=function(){const _0x48bf22=_0x292660;if(this[_0x48bf22(0x1ca)]&&this[_0x48bf22(0x1ca)][_0x48bf22(0x2e6)]){if(_0x48bf22(0x1f6)!==_0x48bf22(0x1a8))return VisuMZ[_0x48bf22(0x448)]['Settings'][_0x48bf22(0x25a)][_0x48bf22(0x392)];else{function _0x3c6315(){const _0x582662=_0x48bf22,_0x2bd565=_0x52bb64['possession'];this[_0x582662(0x1c5)](_0x2bd565,_0xf24d64,_0x4ab687,_0xeb1fcf,!![]);const _0xdc6277=this['getItemQuantityText']();this[_0x582662(0x1c5)](_0xdc6277,_0x1c07f8,_0x298f38,_0x514eb8,![],_0x582662(0x2b3));}}}return Scene_MenuBase[_0x48bf22(0x3c3)][_0x48bf22(0x216)][_0x48bf22(0x1ef)](this);},Scene_Shop[_0x292660(0x3c3)][_0x292660(0x40f)]=function(){const _0x1888e8=_0x292660;if(!SceneManager[_0x1888e8(0x4cc)]())return;const _0x1c61ee=VisuMZ[_0x1888e8(0x448)]['Settings'][_0x1888e8(0x25a)];_0x1c61ee[_0x1888e8(0x3ca)]&&$gameSwitches['setValue'](_0x1c61ee[_0x1888e8(0x3ca)],![]),_0x1c61ee[_0x1888e8(0x21c)]&&$gameSwitches[_0x1888e8(0x464)](_0x1c61ee['SwitchSell'],![]);},VisuMZ[_0x292660(0x448)][_0x292660(0x447)]=Scene_Shop[_0x292660(0x3c3)][_0x292660(0x3df)],Scene_Shop[_0x292660(0x3c3)]['doBuy']=function(_0x4e3a65){const _0xa5fff7=_0x292660;VisuMZ['ItemsEquipsCore'][_0xa5fff7(0x447)][_0xa5fff7(0x1ef)](this,_0x4e3a65);if(_0x4e3a65<=0x0)return;const _0x1e8999=VisuMZ['ItemsEquipsCore'][_0xa5fff7(0x465)][_0xa5fff7(0x25a)];_0x1e8999[_0xa5fff7(0x3ca)]&&$gameSwitches['setValue'](_0x1e8999[_0xa5fff7(0x3ca)],!![]);},VisuMZ[_0x292660(0x448)]['Scene_Shop_doSell']=Scene_Shop[_0x292660(0x3c3)][_0x292660(0x2cb)],Scene_Shop[_0x292660(0x3c3)][_0x292660(0x2cb)]=function(_0x3df3e0){const _0x186bc0=_0x292660;VisuMZ[_0x186bc0(0x448)]['Scene_Shop_doSell'][_0x186bc0(0x1ef)](this,_0x3df3e0);if(_0x3df3e0<=0x0)return;const _0x445a8e=VisuMZ['ItemsEquipsCore'][_0x186bc0(0x465)][_0x186bc0(0x25a)];_0x445a8e[_0x186bc0(0x3ca)]&&$gameSwitches[_0x186bc0(0x464)](_0x445a8e[_0x186bc0(0x21c)],!![]);};function Sprite_NewLabel(){this['initialize'](...arguments);}Sprite_NewLabel['prototype']=Object['create'](Sprite['prototype']),Sprite_NewLabel[_0x292660(0x3c3)][_0x292660(0x20e)]=Sprite_NewLabel,Sprite_NewLabel[_0x292660(0x3c3)]['initialize']=function(){const _0x2aab1c=_0x292660;Sprite[_0x2aab1c(0x3c3)]['initialize']['call'](this),this['createBitmap']();},Sprite_NewLabel[_0x292660(0x3c3)]['createBitmap']=function(){const _0x49fafd=_0x292660,_0x4c850e=ImageManager[_0x49fafd(0x45e)],_0x3b26e8=ImageManager[_0x49fafd(0x281)];this[_0x49fafd(0x131)]=new Bitmap(_0x4c850e,_0x3b26e8),this[_0x49fafd(0x264)](),this['drawNewLabelText']();},Sprite_NewLabel['prototype']['drawNewLabelIcon']=function(){const _0xbfb9e0=_0x292660,_0x2478fa=VisuMZ[_0xbfb9e0(0x448)][_0xbfb9e0(0x465)][_0xbfb9e0(0xf5)]['Icon'];if(_0x2478fa<=0x0)return;const _0x44f1af=ImageManager[_0xbfb9e0(0x4f4)](_0xbfb9e0(0x4c9)),_0x240964=ImageManager[_0xbfb9e0(0x45e)],_0x7827d0=ImageManager[_0xbfb9e0(0x281)],_0x94c9fa=_0x2478fa%0x10*_0x240964,_0x4a3539=Math[_0xbfb9e0(0x4d8)](_0x2478fa/0x10)*_0x7827d0;this[_0xbfb9e0(0x131)][_0xbfb9e0(0x401)](_0x44f1af,_0x94c9fa,_0x4a3539,_0x240964,_0x7827d0,0x0,0x0);},Sprite_NewLabel[_0x292660(0x3c3)]['drawNewLabelText']=function(){const _0x21b3ff=_0x292660,_0xe18a72=VisuMZ[_0x21b3ff(0x448)][_0x21b3ff(0x465)][_0x21b3ff(0xf5)],_0x21e6cd=_0xe18a72['Text'];if(_0x21e6cd==='')return;const _0x2ece65=ImageManager[_0x21b3ff(0x45e)],_0x138171=ImageManager[_0x21b3ff(0x281)];this['bitmap'][_0x21b3ff(0x425)]=_0xe18a72['FontFace']||$gameSystem[_0x21b3ff(0x4b1)](),this[_0x21b3ff(0x131)][_0x21b3ff(0x3ea)]=this[_0x21b3ff(0x127)](),this[_0x21b3ff(0x131)][_0x21b3ff(0x269)]=_0xe18a72[_0x21b3ff(0x270)],this['bitmap'][_0x21b3ff(0x4f6)](_0x21e6cd,0x0,_0x138171/0x2,_0x2ece65,_0x138171/0x2,_0x21b3ff(0x31b));},Sprite_NewLabel['prototype'][_0x292660(0x127)]=function(){const _0x2a73a3=_0x292660,_0x2cccb6=VisuMZ[_0x2a73a3(0x448)]['Settings'][_0x2a73a3(0xf5)][_0x2a73a3(0x1aa)];return _0x2cccb6[_0x2a73a3(0x35a)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager['textColor'](_0x2cccb6);},Window_Base[_0x292660(0x3c3)][_0x292660(0x365)]=function(_0x2faed0,_0x1e8ca9,_0x3951c7,_0x16bf91){const _0x2635ce=_0x292660;if(_0x2faed0){if(_0x2635ce(0x1c6)==='jVYPn'){const _0x507db4=_0x3951c7+(this['lineHeight']()-ImageManager['iconHeight'])/0x2,_0x4c564f=ImageManager['iconWidth']+0x4,_0x537dc0=Math[_0x2635ce(0x2d3)](0x0,_0x16bf91-_0x4c564f);this[_0x2635ce(0x162)](ColorManager[_0x2635ce(0x16c)](_0x2faed0)),this['drawIcon'](_0x2faed0[_0x2635ce(0x2f7)],_0x1e8ca9,_0x507db4),this[_0x2635ce(0x4f6)](_0x2faed0[_0x2635ce(0xc0)],_0x1e8ca9+_0x4c564f,_0x3951c7,_0x537dc0),this['resetTextColor']();}else{function _0x389c70(){const _0x43b51a=_0x2635ce;return this[_0x43b51a(0x295)]();}}}},Window_Base[_0x292660(0x3c3)][_0x292660(0x1f2)]=function(_0x43261d,_0x3a832b,_0x3177aa,_0x15232c){const _0x5393cf=_0x292660;if(this[_0x5393cf(0x3b0)](_0x43261d)){this[_0x5393cf(0x204)]();const _0x5c4133=VisuMZ[_0x5393cf(0x448)][_0x5393cf(0x465)][_0x5393cf(0x34a)],_0x1007de=_0x5c4133[_0x5393cf(0x177)],_0x415399=_0x1007de[_0x5393cf(0x169)]($gameParty['numItems'](_0x43261d));this[_0x5393cf(0x3cc)][_0x5393cf(0x269)]=_0x5c4133['ItemQuantityFontSize'],this[_0x5393cf(0x4f6)](_0x415399,_0x3a832b,_0x3177aa,_0x15232c,_0x5393cf(0x2b3)),this['resetFontSettings']();}},Window_Base[_0x292660(0x3c3)]['isDrawItemNumber']=function(_0x2c2d50){const _0x3ebfcb=_0x292660;if(DataManager[_0x3ebfcb(0xf1)](_0x2c2d50))return $dataSystem[_0x3ebfcb(0x43a)];return!![];},Window_Base['prototype'][_0x292660(0x138)]=function(_0x2964df,_0x3f0d13,_0x4411de,_0x1ad293,_0x27d5ee){const _0x5649ae=_0x292660;_0x27d5ee=Math[_0x5649ae(0x2d3)](_0x27d5ee||0x1,0x1);while(_0x27d5ee--){_0x1ad293=_0x1ad293||this[_0x5649ae(0x1a9)](),this[_0x5649ae(0x2d4)][_0x5649ae(0x272)]=0xa0;const _0x1c9f72=ColorManager[_0x5649ae(0x4aa)]();this[_0x5649ae(0x2d4)][_0x5649ae(0x1b5)](_0x2964df+0x1,_0x3f0d13+0x1,_0x4411de-0x2,_0x1ad293-0x2,_0x1c9f72),this[_0x5649ae(0x2d4)][_0x5649ae(0x272)]=0xff;}},VisuMZ['ItemsEquipsCore']['Window_Selectable_initialize']=Window_Selectable[_0x292660(0x3c3)][_0x292660(0x442)],Window_Selectable[_0x292660(0x3c3)][_0x292660(0x442)]=function(_0xc32d61){const _0x5756ee=_0x292660;this[_0x5756ee(0x16a)](),VisuMZ[_0x5756ee(0x448)][_0x5756ee(0x459)][_0x5756ee(0x1ef)](this,_0xc32d61);},Window_Selectable[_0x292660(0x3c3)][_0x292660(0x16a)]=function(){const _0x4268f1=_0x292660;this['_newLabelSprites']={},this[_0x4268f1(0x2f5)]=0xff,this['_newLabelOpacityChange']=VisuMZ[_0x4268f1(0x448)]['Settings']['New'][_0x4268f1(0x346)],this[_0x4268f1(0x26b)]=VisuMZ[_0x4268f1(0x448)][_0x4268f1(0x465)]['New'][_0x4268f1(0x2d6)];},Window_Selectable[_0x292660(0x3c3)][_0x292660(0x2d5)]=function(){return![];},VisuMZ[_0x292660(0x448)][_0x292660(0x366)]=Window_Selectable['prototype'][_0x292660(0x221)],Window_Selectable[_0x292660(0x3c3)][_0x292660(0x221)]=function(_0x3cf6fc){const _0x394a3a=_0x292660;VisuMZ[_0x394a3a(0x448)]['Window_Selectable_setHelpWindowItem'][_0x394a3a(0x1ef)](this,_0x3cf6fc);if(this['isShowNew']())this[_0x394a3a(0x41e)](_0x3cf6fc);},Window_Selectable[_0x292660(0x3c3)][_0x292660(0x41e)]=function(_0x2f85b8){const _0x24352d=_0x292660;if(!_0x2f85b8)return;$gameParty[_0x24352d(0x1ba)](_0x2f85b8);let _0x7ce75a='';if(DataManager[_0x24352d(0x292)](_0x2f85b8))_0x7ce75a=_0x24352d(0x3dd)['format'](_0x2f85b8['id']);else{if(DataManager[_0x24352d(0x1cd)](_0x2f85b8))_0x7ce75a='weapon-%1'[_0x24352d(0x169)](_0x2f85b8['id']);else{if(DataManager[_0x24352d(0x33b)](_0x2f85b8)){if('KTXzP'===_0x24352d(0x275))_0x7ce75a=_0x24352d(0x3c0)[_0x24352d(0x169)](_0x2f85b8['id']);else{function _0x49a12b(){const _0x52656b=_0x24352d;if(!this[_0x52656b(0x2ac)]())_0x32a95f[_0x52656b(0x3c3)]['playOkSound'][_0x52656b(0x1ef)](this);}}}else return;}}const _0x369760=this[_0x24352d(0x474)][_0x7ce75a];if(_0x369760)_0x369760[_0x24352d(0x28a)]();},VisuMZ[_0x292660(0x448)]['Window_Selectable_refresh']=Window_Selectable[_0x292660(0x3c3)]['refresh'],Window_Selectable['prototype'][_0x292660(0x4e9)]=function(){const _0xf778b3=_0x292660;this[_0xf778b3(0x180)](),VisuMZ[_0xf778b3(0x448)]['Window_Selectable_refresh']['call'](this);},Window_Selectable[_0x292660(0x3c3)]['hideNewLabelSprites']=function(){const _0x3771d6=_0x292660;for(const _0x28de86 of Object[_0x3771d6(0xdc)](this[_0x3771d6(0x474)])){_0x28de86[_0x3771d6(0x28a)]();}},VisuMZ['ItemsEquipsCore'][_0x292660(0x42f)]=Window_Selectable['prototype'][_0x292660(0x2b8)],Window_Selectable[_0x292660(0x3c3)][_0x292660(0x2b8)]=function(){const _0x144e01=_0x292660;this['updateNewLabelOpacity'](),VisuMZ[_0x144e01(0x448)][_0x144e01(0x42f)][_0x144e01(0x1ef)](this);},Window_Selectable[_0x292660(0x3c3)][_0x292660(0xd9)]=function(){const _0x2bbaf8=_0x292660;if(!this['isShowNew']())return;const _0x54da97=this[_0x2bbaf8(0x26b)];this[_0x2bbaf8(0x2f5)]+=this[_0x2bbaf8(0x1e8)];(this['_newLabelOpacity']>=_0x54da97||this[_0x2bbaf8(0x2f5)]<=0x0)&&(this['_newLabelOpacityChange']*=-0x1);this[_0x2bbaf8(0x2f5)]=this[_0x2bbaf8(0x2f5)][_0x2bbaf8(0x44d)](0x0,_0x54da97);for(const _0x277d12 of Object[_0x2bbaf8(0xdc)](this[_0x2bbaf8(0x474)])){_0x277d12[_0x2bbaf8(0x417)]=this[_0x2bbaf8(0x2f5)];}},Window_Selectable[_0x292660(0x3c3)][_0x292660(0x135)]=function(_0x5f4d7c){const _0x50936d=_0x292660,_0x14273d=this[_0x50936d(0x474)];if(_0x14273d[_0x5f4d7c]){if('pOuVt'===_0x50936d(0x256)){function _0x419d03(){const _0x3bdbb7=_0x50936d;if(this[_0x3bdbb7(0x2ac)]())return;_0x26f4d7[_0x3bdbb7(0x3c3)][_0x3bdbb7(0x107)][_0x3bdbb7(0x1ef)](this);}}else return _0x14273d[_0x5f4d7c];}else{const _0x242c93=new Sprite_NewLabel();return _0x14273d[_0x5f4d7c]=_0x242c93,this[_0x50936d(0x38d)](_0x242c93),_0x242c93;}},Window_Selectable['prototype'][_0x292660(0x1d0)]=function(_0x1f8a51,_0xca0898,_0x54d42e){const _0x5bee1f=_0x292660;let _0x149a11='';if(DataManager['isItem'](_0x1f8a51))_0x149a11=_0x5bee1f(0x3dd)['format'](_0x1f8a51['id']);else{if(DataManager[_0x5bee1f(0x1cd)](_0x1f8a51)){if(_0x5bee1f(0x4b3)!==_0x5bee1f(0x3d9))_0x149a11=_0x5bee1f(0x499)['format'](_0x1f8a51['id']);else{function _0x48e65a(){const _0x215442=_0x5bee1f;if(this[_0x215442(0x4ed)]())return this[_0x215442(0x4f3)]();else{const _0x306fed=_0x4c9ec3['ItemsEquipsCore'][_0x215442(0x217)][_0x215442(0x1ef)](this);return this[_0x215442(0x4de)]()&&this[_0x215442(0x441)]()&&(_0x306fed[_0x215442(0x294)]-=this['statusWidth']()),_0x306fed;}}}}else{if(DataManager[_0x5bee1f(0x33b)](_0x1f8a51)){if(_0x5bee1f(0x27c)!==_0x5bee1f(0x27c)){function _0x290b2d(){const _0x521204=_0x5bee1f;return!this[_0x521204(0x2ac)]();}}else _0x149a11=_0x5bee1f(0x3c0)[_0x5bee1f(0x169)](_0x1f8a51['id']);}else return;}}const _0x4b355f=this[_0x5bee1f(0x135)](_0x149a11);_0x4b355f[_0x5bee1f(0x12a)](_0xca0898,_0x54d42e),_0x4b355f[_0x5bee1f(0x110)](),_0x4b355f[_0x5bee1f(0x417)]=this['_newLabelOpacity'];},Window_ItemCategory[_0x292660(0x2dc)]=VisuMZ[_0x292660(0x448)][_0x292660(0x465)]['Categories']['List'],Window_ItemCategory[_0x292660(0x2e1)]=[_0x292660(0x18b),_0x292660(0x491),'Nonconsumable',_0x292660(0x1fe),'AlwaysUsable',_0x292660(0x201),_0x292660(0x4ae),_0x292660(0x17f)],VisuMZ['ItemsEquipsCore'][_0x292660(0x1a5)]=Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x442)],Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x442)]=function(_0xe1f762){const _0x4d3ca4=_0x292660;VisuMZ[_0x4d3ca4(0x448)][_0x4d3ca4(0x1a5)]['call'](this,_0xe1f762),this['createCategoryNameWindow'](_0xe1f762);},Window_ItemCategory[_0x292660(0x3c3)]['createCategoryNameWindow']=function(_0x25e357){const _0x59c6b0=_0x292660,_0x447f66=new Rectangle(0x0,0x0,_0x25e357[_0x59c6b0(0x294)],_0x25e357[_0x59c6b0(0x12e)]);this[_0x59c6b0(0x32e)]=new Window_Base(_0x447f66),this['_categoryNameWindow'][_0x59c6b0(0x417)]=0x0,this[_0x59c6b0(0x4e2)](this[_0x59c6b0(0x32e)]),this[_0x59c6b0(0x29e)]();},Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x2ac)]=function(){const _0x26f50b=_0x292660;return Imported[_0x26f50b(0x2de)]&&Window_HorzCommand[_0x26f50b(0x3c3)][_0x26f50b(0x2ac)][_0x26f50b(0x1ef)](this);},Window_ItemCategory['prototype']['processCursorHomeEndTrigger']=function(){},Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x3b5)]=function(){const _0x4a8678=_0x292660;if(!this[_0x4a8678(0x2ac)]())Window_HorzCommand['prototype'][_0x4a8678(0x3b5)][_0x4a8678(0x1ef)](this);},Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x35e)]=function(){const _0x4294fc=_0x292660;return this[_0x4294fc(0x3ee)]?this['maxItems']():0x4;},Window_ItemCategory['prototype'][_0x292660(0x2b8)]=function(){const _0x1de077=_0x292660;Window_HorzCommand[_0x1de077(0x3c3)][_0x1de077(0x2b8)][_0x1de077(0x1ef)](this),this[_0x1de077(0x463)]&&this[_0x1de077(0x463)][_0x1de077(0x471)](this[_0x1de077(0x3bf)]());},Window_ItemCategory[_0x292660(0x3c3)]['processCursorMoveModernControls']=function(){const _0x20e66c=_0x292660;if(this[_0x20e66c(0x2a5)]()){if('SuFry'==='SuFry'){const _0x39a404=this['index']();if(this['_itemWindow']&&this[_0x20e66c(0x463)][_0x20e66c(0x35e)]()<=0x1){if(_0x20e66c(0x487)!==_0x20e66c(0xbf))Input[_0x20e66c(0x21e)]('right')&&this[_0x20e66c(0x3db)](Input[_0x20e66c(0x3cd)](_0x20e66c(0x2b3))),Input[_0x20e66c(0x21e)]('left')&&this[_0x20e66c(0x444)](Input['isTriggered'](_0x20e66c(0xa6)));else{function _0x35eef8(){const _0x549ad=_0x20e66c;return this[_0x549ad(0x4ed)]()?this[_0x549ad(0x1b1)]():_0x4116f5[_0x549ad(0x3c3)][_0x549ad(0xf0)][_0x549ad(0x1ef)](this);}}}else{if(this[_0x20e66c(0x463)]&&this['_itemWindow'][_0x20e66c(0x35e)]()>0x1){if(_0x20e66c(0xde)===_0x20e66c(0xde)){if(Input[_0x20e66c(0x21e)]('pagedown')&&!Input[_0x20e66c(0x15d)](_0x20e66c(0x4ab))){if(_0x20e66c(0x10a)!=='alCkp')this[_0x20e66c(0x3db)](Input[_0x20e66c(0x3cd)](_0x20e66c(0x450)));else{function _0x4b9cf9(){const _0x5ada70=_0x20e66c;return this[_0x5ada70(0x30d)]()[_0x5ada70(0x35a)](/RIGHT/i);}}}if(Input['isRepeated']('pageup')&&!Input[_0x20e66c(0x15d)]('shift')){if(_0x20e66c(0x43b)!=='zWfyn')this['cursorLeft'](Input['isTriggered'](_0x20e66c(0x2cc)));else{function _0x30b1c6(){const _0x5a2a02=_0x20e66c,_0x1040ea=_0x304e69[_0x5a2a02(0x448)][_0x5a2a02(0x465)][_0x5a2a02(0x126)],_0x1e5c7e=_0x5a2a02(0x15c)[_0x5a2a02(0x169)](this[_0x5a2a02(0x237)]['damage'][_0x5a2a02(0x25b)]),_0x1adf9f=[null,_0x5bd702['hp'],_0x50582c['mp'],_0x4b6883['hp'],_0x25195b['mp'],_0x3d47a4['hp'],_0x3f018a['mp']][this[_0x5a2a02(0x237)][_0x5a2a02(0x1ee)]['type']];return _0x1040ea[_0x1e5c7e][_0x5a2a02(0x169)](_0x1adf9f);}}}}else{function _0x5dede2(){const _0x3d0e8c=_0x20e66c;this['addEquipCommand'](),this[_0x3d0e8c(0x247)](),this['addClearCommand']();}}}}this[_0x20e66c(0x267)]()!==_0x39a404&&this[_0x20e66c(0x274)]();}else{function _0x1e5c9f(){const _0xff1dfc=_0x20e66c;this[_0xff1dfc(0x2ac)]()&&(this[_0xff1dfc(0x3d0)]['deselect'](),this['_commandWindow'][_0xff1dfc(0x23a)]()),_0x249f3f[_0xff1dfc(0x448)][_0xff1dfc(0x45d)]['call'](this);}}}},Window_ItemCategory[_0x292660(0x3c3)]['processHandling']=function(){const _0x16bb9c=_0x292660;if(this[_0x16bb9c(0x2ac)]())return;Window_HorzCommand[_0x16bb9c(0x3c3)][_0x16bb9c(0x107)][_0x16bb9c(0x1ef)](this);},Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x35b)]=function(){const _0x41caf0=_0x292660;return this[_0x41caf0(0x2ac)]()?![]:Window_HorzCommand[_0x41caf0(0x3c3)][_0x41caf0(0x35b)][_0x41caf0(0x1ef)](this);},Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x136)]=function(){const _0x5bce09=_0x292660;if(this[_0x5bce09(0xa8)]()){TouchInput[_0x5bce09(0x3cd)]()&&this[_0x5bce09(0x3f8)](!![]);if(TouchInput['isClicked']())this[_0x5bce09(0x21a)]();else TouchInput[_0x5bce09(0x2c6)]()&&this[_0x5bce09(0x48e)]();}},Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x3f8)]=function(_0x47e2c0){const _0x5ea188=_0x292660;if(this[_0x5ea188(0x2ac)]()){if(_0x5ea188(0x218)===_0x5ea188(0x478)){function _0x421aee(){const _0x5c4e17=_0x5ea188;this[_0x5c4e17(0x3e5)]++;}}else this[_0x5ea188(0xdf)](!![]);}else Window_HorzCommand[_0x5ea188(0x3c3)][_0x5ea188(0x3f8)]['call'](this,_0x47e2c0);},Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0xdf)]=function(_0x361b88){const _0x4e651a=_0x292660;this[_0x4e651a(0x325)]=![];if(this[_0x4e651a(0x2a5)]()){if(_0x4e651a(0x3c7)!==_0x4e651a(0x4a6)){const _0x298bef=this[_0x4e651a(0x267)](),_0x4399ee=this[_0x4e651a(0x258)]();if(_0x4399ee>=0x0&&_0x4399ee!==this[_0x4e651a(0x267)]()){if('eXKUG'===_0x4e651a(0x1d7))this[_0x4e651a(0x108)](_0x4399ee);else{function _0x2d5be9(){const _0x52783a=_0x4e651a;_0xe1a233=_0x122326||this[_0x52783a(0x1a9)](),this['contentsBack'][_0x52783a(0x272)]=0xa0;const _0x2704a7=_0x3fb132[_0x52783a(0x3ac)]();this[_0x52783a(0x2d4)][_0x52783a(0x1b5)](_0x1aeb01+0x1,_0x2698dd+0x1,_0x141d4e-0x2,_0x59fdb2-0x2,_0x2704a7),this[_0x52783a(0x2d4)][_0x52783a(0x272)]=0xff;}}}if(_0x361b88&&this[_0x4e651a(0x267)]()!==_0x298bef){if(_0x4e651a(0x398)===_0x4e651a(0xe3)){function _0x3a7f67(){const _0x5712b0=_0x4e651a;for(const _0x50dba7 of _0x1d354e[_0x5712b0(0x2dc)]){this[_0x5712b0(0x128)](_0x50dba7);}this[_0x5712b0(0x108)](this[_0x5712b0(0x267)]());}}else this['playCursorSound']();}}else{function _0x5004c2(){const _0x50e9a5=_0x4e651a,_0x134cd2=_0x50e9a5(0x46c);if(this['_itemData']['rateMP']<=0x0&&this[_0x50e9a5(0x211)][_0x50e9a5(0x3ab)]<=0x0&&!this[_0x50e9a5(0x2fb)][_0x134cd2])return![];const _0x759d01=this[_0x50e9a5(0x321)]();this['drawItemKeyData'](_0x759d01,_0xc4df6,_0x57c0e7,_0x34a3e4,!![]);const _0x2c03c6=this[_0x50e9a5(0xce)]();return this[_0x50e9a5(0x162)](_0x3f0a6c['damageColor'](0x3)),this[_0x50e9a5(0x1c5)](_0x2c03c6,_0x37be5e,_0x5b3fcd,_0xaff11c,![],_0x50e9a5(0x2b3)),this[_0x50e9a5(0x138)](_0x296521,_0x34bddc,_0x11d253),this[_0x50e9a5(0x204)](),!![];}}}},Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x48d)]=function(){const _0xb37c20=_0x292660;for(const _0x18012a of Window_ItemCategory[_0xb37c20(0x2dc)]){this[_0xb37c20(0x128)](_0x18012a);}this[_0xb37c20(0x108)](this[_0xb37c20(0x267)]());},Window_ItemCategory[_0x292660(0x3c3)]['addItemCategory']=function(_0x44e0ac){const _0x3767d7=_0x292660,_0x26e5e2=_0x44e0ac['Type'],_0x2f506d=_0x44e0ac[_0x3767d7(0x2b4)],_0x1aedc9=_0x44e0ac['SwitchID']||0x0;if(_0x1aedc9>0x0&&!$gameSwitches[_0x3767d7(0x188)](_0x1aedc9))return;let _0x41bf36='',_0x5d768f=_0x3767d7(0x19a),_0x21cde4=_0x26e5e2;if(_0x26e5e2['match'](/Category:(.*)/i)){if(_0x3767d7(0x1cb)!==_0x3767d7(0xd8))_0x41bf36=String(RegExp['$1'])[_0x3767d7(0x508)]();else{function _0xab39e3(){return![];}}}else{if(Window_ItemCategory[_0x3767d7(0x2e1)][_0x3767d7(0x261)](_0x26e5e2))_0x41bf36=VisuMZ[_0x3767d7(0x448)][_0x3767d7(0x465)][_0x3767d7(0x3bc)][_0x26e5e2];else{if(['AllItems','RegularItems'][_0x3767d7(0x261)](_0x26e5e2))_0x41bf36=TextManager[_0x3767d7(0x378)];else{if(_0x26e5e2===_0x3767d7(0x178))_0x41bf36=TextManager[_0x3767d7(0x3af)];else{if(_0x26e5e2===_0x3767d7(0x3c6)){if(_0x3767d7(0x2eb)!=='ECPlD'){function _0x4eb3b5(){const _0x19b579=_0x3767d7;_0x4c2e7c[_0x19b579(0x15d)](_0x19b579(0x4ab))&&this['allowShiftScrolling']()?this[_0x19b579(0x2fc)]():this[_0x19b579(0x12c)](_0x1e8135[_0x19b579(0x3cd)]('up'));}}else _0x41bf36=TextManager[_0x3767d7(0x121)];}else{if(_0x26e5e2===_0x3767d7(0x34c))_0x41bf36=TextManager[_0x3767d7(0x424)];else{if(_0x26e5e2[_0x3767d7(0x35a)](/WTYPE:(\d+)/i))_0x41bf36=$dataSystem['weaponTypes'][Number(RegExp['$1'])]||'';else{if(_0x26e5e2['match'](/ATYPE:(\d+)/i)){if(_0x3767d7(0x3c4)===_0x3767d7(0x371)){function _0x13c349(){const _0x1b71c4=_0x3767d7;return _0xd0f97d['ItemsEquipsCore'][_0x1b71c4(0x289)][_0x1b71c4(0x1ef)](this);}}else _0x41bf36=$dataSystem['armorTypes'][Number(RegExp['$1'])]||'';}else{if(_0x26e5e2[_0x3767d7(0x35a)](/ETYPE:(\d+)/i)){if('Dakgq'==='EeVSh'){function _0x43a099(){const _0x1b33c0=_0x3767d7;_0x577e5f+=0x1;if(_0x33c31f[_0x1b33c0(0x445)][_0x1b33c0(0x35a)](_0x3c439f)){const _0x3dc59c=_0x391072(_0x30670a['$1'])||0x1;if(_0xfff33a>=_0x3dc59c)return!![];}if(_0x294885['note']['match'](_0x36e160)){const _0x1af415=_0x1113fa(_0x25b645['$1'])||0x1;if(_0x3f3a91>=_0x1af415)return!![];}}}else _0x41bf36=$dataSystem['equipTypes'][Number(RegExp['$1'])]||'';}}}}}}}}}_0x2f506d>0x0&&this[_0x3767d7(0x501)]()!==_0x3767d7(0x19d)&&(_0x41bf36='\x5cI[%1]%2'[_0x3767d7(0x169)](_0x2f506d,_0x41bf36)),this['addCommand'](_0x41bf36,_0x5d768f,!![],_0x21cde4);},Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x4bc)]=function(){const _0x1c8dd5=_0x292660;return VisuMZ[_0x1c8dd5(0x448)][_0x1c8dd5(0x465)][_0x1c8dd5(0x3bc)][_0x1c8dd5(0x14d)];},Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x337)]=function(_0x17ce8e){const _0xf96830=_0x292660,_0x59e57b=this['categoryStyleCheck'](_0x17ce8e);if(_0x59e57b===_0xf96830(0x306)){if(_0xf96830(0x210)!==_0xf96830(0x3dc))this[_0xf96830(0x2d9)](_0x17ce8e);else{function _0x23b488(){const _0x3f45ec=_0xf96830;this[_0x3f45ec(0x361)]();}}}else _0x59e57b===_0xf96830(0x194)?this[_0xf96830(0x39f)](_0x17ce8e):Window_HorzCommand['prototype'][_0xf96830(0x337)]['call'](this,_0x17ce8e);},Window_ItemCategory['prototype'][_0x292660(0x501)]=function(){const _0x35920b=_0x292660;return VisuMZ[_0x35920b(0x448)][_0x35920b(0x465)][_0x35920b(0x3bc)][_0x35920b(0x1e3)];},Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x149)]=function(_0x356df5){const _0x3dd637=_0x292660;if(_0x356df5<0x0)return'text';const _0x195a76=this[_0x3dd637(0x501)]();if(_0x195a76!==_0x3dd637(0x251)){if(_0x3dd637(0x3d1)!==_0x3dd637(0x4eb))return _0x195a76;else{function _0x4b230e(){const _0x489e44=_0x3dd637;return!this[_0x489e44(0x115)]()[_0x489e44(0x261)](this['etypeId']());}}}else{const _0x3295c4=this[_0x3dd637(0xae)](_0x356df5);if(_0x3295c4[_0x3dd637(0x35a)](/\\I\[(\d+)\]/i)){if(_0x3dd637(0x489)!=='yUIzq'){const _0x5808d5=this[_0x3dd637(0x31a)](_0x356df5),_0x4f3786=this[_0x3dd637(0x28b)](_0x3295c4)['width'];if(_0x4f3786<=_0x5808d5[_0x3dd637(0x294)]){if(_0x3dd637(0x403)===_0x3dd637(0x17e)){function _0x5ac6a7(){const _0x4e7307=_0x3dd637;_0x54b448['isPressed']('shift')&&this[_0x4e7307(0x3ed)]()?this[_0x4e7307(0x2a4)]():this[_0x4e7307(0x2f9)](_0x89debb['isTriggered']('down'));}}else return _0x3dd637(0x306);}else{if(_0x3dd637(0x104)==='JBvzS')return _0x3dd637(0x194);else{function _0x31d793(){const _0x5c4587=_0x3dd637;return _0xbe3b74['ItemsEquipsCore'][_0x5c4587(0x465)][_0x5c4587(0xbe)][_0x5c4587(0x156)];}}}}else{function _0x16ab8a(){const _0x3a9cf9=_0x3dd637;_0x32b246=_0x3a9cf9(0x3dd)[_0x3a9cf9(0x169)](_0x3c0834['id']);}}}else{if(_0x3dd637(0x416)!=='LDWXh')return _0x3dd637(0x19d);else{function _0x1b8a2d(){return'icon';}}}}},Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x2d9)]=function(_0x4b273e){const _0x16683a=_0x292660,_0x1e57ac=this['itemLineRect'](_0x4b273e),_0x1933e4=this[_0x16683a(0xae)](_0x4b273e),_0x31864d=this[_0x16683a(0x28b)](_0x1933e4)[_0x16683a(0x294)];this['changePaintOpacity'](this['isCommandEnabled'](_0x4b273e));const _0x5f384b=this[_0x16683a(0x4bc)]();if(_0x5f384b==='right')this[_0x16683a(0x483)](_0x1933e4,_0x1e57ac['x']+_0x1e57ac[_0x16683a(0x294)]-_0x31864d,_0x1e57ac['y'],_0x31864d);else{if(_0x5f384b===_0x16683a(0x31b)){if(_0x16683a(0x36c)===_0x16683a(0x36c)){const _0x1e62e9=_0x1e57ac['x']+Math[_0x16683a(0x4d8)]((_0x1e57ac[_0x16683a(0x294)]-_0x31864d)/0x2);this[_0x16683a(0x483)](_0x1933e4,_0x1e62e9,_0x1e57ac['y'],_0x31864d);}else{function _0x2642bd(){const _0x1dfd3a=_0x16683a;this[_0x1dfd3a(0x2fb)]={};if(!this['_item'])return;const _0x56920c=this[_0x1dfd3a(0x237)][_0x1dfd3a(0x445)];if(_0x56920c[_0x1dfd3a(0x35a)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x129e9f=_0xf110ff(_0x12467a['$1'])['split'](/[\r\n]+/);for(const _0x43ca13 of _0x129e9f){if(_0x43ca13[_0x1dfd3a(0x35a)](/(.*):[ ](.*)/i)){const _0x1bbaba=_0x6d3bb8(_0x1516f2['$1'])[_0x1dfd3a(0x1e6)]()[_0x1dfd3a(0x508)](),_0x1bd332=_0x84e5d9(_0x57ed78['$2'])['trim']();this[_0x1dfd3a(0x2fb)][_0x1bbaba]=_0x1bd332;}}}}}}else{if(_0x16683a(0x1de)!==_0x16683a(0x1bd))this[_0x16683a(0x483)](_0x1933e4,_0x1e57ac['x'],_0x1e57ac['y'],_0x31864d);else{function _0x2aa868(){const _0x3bd95=_0x16683a;return _0x25261f[_0x3bd95(0x448)][_0x3bd95(0x465)]['StatusWindow'][_0x3bd95(0xd2)];}}}}},Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x39f)]=function(_0x54af17){const _0x262ca0=_0x292660,_0x59aeec=this[_0x262ca0(0xae)](_0x54af17);if(_0x59aeec[_0x262ca0(0x35a)](/\\I\[(\d+)\]/i)){if(_0x262ca0(0x166)===_0x262ca0(0x3e6)){function _0x478853(){if(!_0x75bf2e['value'](_0x5a742a))return!![];}}else{const _0x2edc43=Number(RegExp['$1'])||0x0,_0x198df3=this[_0x262ca0(0x31a)](_0x54af17),_0x2b2ddb=_0x198df3['x']+Math['floor']((_0x198df3['width']-ImageManager[_0x262ca0(0x45e)])/0x2),_0x37d2ec=_0x198df3['y']+(_0x198df3[_0x262ca0(0x12e)]-ImageManager[_0x262ca0(0x281)])/0x2;this[_0x262ca0(0x2ed)](_0x2edc43,_0x2b2ddb,_0x37d2ec);}}},VisuMZ[_0x292660(0x448)][_0x292660(0x20a)]=Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x27d)],Window_ItemCategory['prototype'][_0x292660(0x27d)]=function(_0x40beb2){const _0x37909a=_0x292660;VisuMZ[_0x37909a(0x448)]['Window_ItemCategory_setItemWindow']['call'](this,_0x40beb2),_0x40beb2[_0x37909a(0x4ce)]=this;},Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x3f1)]=function(){const _0x7f8bbc=_0x292660;Window_HorzCommand[_0x7f8bbc(0x3c3)][_0x7f8bbc(0x3f1)]['call'](this);if(this['_categoryNameWindow'])this['updateCategoryNameWindow']();},Window_ItemCategory['prototype'][_0x292660(0x29e)]=function(){const _0x556f30=_0x292660,_0x275962=this[_0x556f30(0x32e)];_0x275962[_0x556f30(0x3cc)][_0x556f30(0x3a7)]();const _0x4fede8=this['categoryStyleCheck'](this[_0x556f30(0x267)]());if(_0x4fede8==='icon'){const _0x20b3a5=this[_0x556f30(0x31a)](this['index']());let _0x303495=this['commandName'](this[_0x556f30(0x267)]());_0x303495=_0x303495[_0x556f30(0x32a)](/\\I\[(\d+)\]/gi,''),_0x275962[_0x556f30(0x204)](),this['categoryNameWindowDrawBackground'](_0x303495,_0x20b3a5),this[_0x556f30(0x129)](_0x303495,_0x20b3a5),this[_0x556f30(0x3f3)](_0x303495,_0x20b3a5);}},Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x1e9)]=function(_0x156df6,_0x43bd07){},Window_ItemCategory[_0x292660(0x3c3)][_0x292660(0x129)]=function(_0x221b4b,_0x5ddf11){const _0x3c626f=_0x292660,_0x2da8bd=this[_0x3c626f(0x32e)];_0x2da8bd[_0x3c626f(0x4f6)](_0x221b4b,0x0,_0x5ddf11['y'],_0x2da8bd['innerWidth'],_0x3c626f(0x31b));},Window_ItemCategory[_0x292660(0x3c3)]['categoryNameWindowCenter']=function(_0x2a8be6,_0xe88e84){const _0x19fade=_0x292660,_0x3651a8=this[_0x19fade(0x32e)],_0x49a9c6=$gameSystem[_0x19fade(0x39e)](),_0xf0343b=_0xe88e84['x']+Math[_0x19fade(0x4d8)](_0xe88e84['width']/0x2)+_0x49a9c6;_0x3651a8['x']=_0x3651a8[_0x19fade(0x294)]/-0x2+_0xf0343b,_0x3651a8['y']=Math['floor'](_0xe88e84['height']/0x2);},Window_ItemList[_0x292660(0x3c3)][_0x292660(0x345)]=function(){const _0x81b094=_0x292660;if(this[_0x81b094(0x2a5)]()){if(_0x81b094(0x148)!==_0x81b094(0x148)){function _0x572220(){const _0x53feb6=_0x81b094,_0x1f9ca3=this[_0x53feb6(0x2f2)]();let _0x37d677=0x0,_0x341b9a=0x0,_0x5b1e10='';if(this[_0x53feb6(0x4e7)]){_0x1af290['VisuMZ_0_CoreEngine']?(_0x37d677=this[_0x53feb6(0xc1)]['paramValueByName'](_0x137a2a,![]),_0x341b9a=this[_0x53feb6(0x4e7)][_0x53feb6(0x34d)](_0x571e99,![]),_0x5b1e10=this['_tempActor'][_0x53feb6(0x34d)](_0x1737fd,!![])):(_0x37d677=this[_0x53feb6(0xc1)][_0x53feb6(0x3fd)](_0x29e4b7),_0x341b9a=this['_tempActor'][_0x53feb6(0x3fd)](_0x4b5321),_0x5b1e10=this['_tempActor'][_0x53feb6(0x3fd)](_0x674051));const _0x535a25=_0x37d677,_0x4ead99=_0x341b9a;_0x4e6555=_0x4ead99-_0x535a25,this[_0x53feb6(0x162)](_0x28009d[_0x53feb6(0x380)](_0x366923)),this[_0x53feb6(0x4f6)](_0x5b1e10,_0x4a7e30,_0x2a747b,_0x716c4-_0x1f9ca3,_0x53feb6(0x2b3));}}}else{const _0x55204d=this[_0x81b094(0x267)]();if(this[_0x81b094(0x35e)]()<=0x1){if(_0x81b094(0x36d)===_0x81b094(0x493)){function _0xc06a5(){const _0x58b88b=_0x81b094,_0x4bdc3b=_0x5a0efb(_0x48eb5f['$1']);let _0x971345=this[_0x58b88b(0x237)],_0x527e82=_0x971345[_0x58b88b(0xed)]*this[_0x58b88b(0xf2)]();try{_0x3438c4(_0x4bdc3b);}catch(_0x183fee){if(_0x63afb8[_0x58b88b(0x31c)]())_0x37a4da[_0x58b88b(0x322)](_0x183fee);}if(_0x110513(_0x527e82))_0x527e82=0x0;return _0x486673[_0x58b88b(0x4d8)](_0x527e82);}}else{if(!this[_0x81b094(0xc4)]('pagedown')&&Input[_0x81b094(0x3cd)](_0x81b094(0x450))){if(_0x81b094(0x3e0)!==_0x81b094(0x382))this[_0x81b094(0x2a4)]();else{function _0x5b1e7a(){const _0x19ac6d=_0x81b094;return _0x563c8a[_0x43f5c5['id']][_0x19ac6d(0x1ef)](this,_0x4239a8);}}}!this['isHandled'](_0x81b094(0x2cc))&&Input[_0x81b094(0x3cd)]('pageup')&&this[_0x81b094(0x2fc)]();}}else{if(this[_0x81b094(0x35e)]()>0x1){if(Input[_0x81b094(0x21e)]('right')){if(_0x81b094(0x2d7)===_0x81b094(0x2d7))this['cursorRight'](Input['isTriggered'](_0x81b094(0x2b3)));else{function _0x110527(){const _0x228d2a=_0x81b094;return _0x3c9853[_0x228d2a(0xca)];}}}Input[_0x81b094(0x21e)]('left')&&this[_0x81b094(0x444)](Input['isTriggered']('left'));if(this[_0x81b094(0x3d3)]()){if(Input['isTriggered'](_0x81b094(0x450))&&Input[_0x81b094(0x15d)](_0x81b094(0x4ab))){if('stYkv'!==_0x81b094(0x2e8)){function _0x49b69e(){const _0x4eb96b=_0x81b094;_0x47953e[_0x4eb96b(0x3cd)]('pagedown')&&this[_0x4eb96b(0x2a4)](),_0x354518[_0x4eb96b(0x3cd)](_0x4eb96b(0x2cc))&&this[_0x4eb96b(0x2fc)]();}}else this[_0x81b094(0x2a4)]();}if(Input[_0x81b094(0x3cd)](_0x81b094(0x2cc))&&Input[_0x81b094(0x15d)](_0x81b094(0x4ab))){if(_0x81b094(0x1b0)===_0x81b094(0x4ca)){function _0x585047(){const _0x1f22d2=_0x81b094;return _0x4fcdaa[_0x1f22d2(0x363)]['format'](_0x5ac921(_0x45d853['$1']));}}else this[_0x81b094(0x2fc)]();}}else{if('DUjng'!==_0x81b094(0x100))Input[_0x81b094(0x3cd)](_0x81b094(0x450))&&this[_0x81b094(0x2a4)](),Input[_0x81b094(0x3cd)](_0x81b094(0x2cc))&&this[_0x81b094(0x2fc)]();else{function _0x4386c1(){const _0x317429=_0x81b094,_0x5620e9=_0xdeb7ae[_0x317429(0x1e5)][_0x317429(0x291)](_0x58cf74[_0x317429(0x508)]());if(_0x5620e9>0x0)_0x47b430['equipSlots'][_0x317429(0x106)](_0x5620e9);}}}}}if(Input[_0x81b094(0x21e)](_0x81b094(0x4af))){if('gJzAo'==='gJzAo'){if(Input['isPressed']('shift')&&this[_0x81b094(0x3ed)]()){if(_0x81b094(0x212)===_0x81b094(0x212))this[_0x81b094(0x2a4)]();else{function _0x15018f(){const _0x2a7f07=_0x81b094;this[_0x2a7f07(0x3a5)](!![]);}}}else{if(_0x81b094(0x19c)===_0x81b094(0x19c))this[_0x81b094(0x2f9)](Input[_0x81b094(0x3cd)](_0x81b094(0x4af)));else{function _0x235f0b(){const _0x2e7e15=_0x81b094;return _0x159149[_0x2e7e15(0x448)][_0x2e7e15(0x112)][_0x2e7e15(0x1ef)](this,_0x5b180c);}}}}else{function _0x48e744(){const _0x5147b5=_0x81b094;if(!_0x55e159[_0x5147b5(0x188)](_0x46cfae))return![];}}}if(Input[_0x81b094(0x21e)]('up')){if(Input['isPressed'](_0x81b094(0x4ab))&&this['allowShiftScrolling']()){if(_0x81b094(0x4f0)===_0x81b094(0x4f0))this[_0x81b094(0x2fc)]();else{function _0x5ae64f(){const _0x2c5603=_0x81b094;this[_0x2c5603(0x2a4)]();}}}else this['cursorUp'](Input[_0x81b094(0x3cd)]('up'));}Imported['VisuMZ_0_CoreEngine']&&this[_0x81b094(0x369)]();if(this[_0x81b094(0x267)]()!==_0x55204d){if('bwVXC'!==_0x81b094(0x118)){function _0x527e3f(){const _0xe1301d=_0x81b094,_0x24b09c=_0x18883b(_0x26bc1b['$1']);_0x24b09c!==_0x438faf[_0x186f5f][_0xe1301d(0x1a6)]&&(_0x36d012(_0xe1301d(0x3e8)['format'](_0x190b87,_0x24b09c)),_0x39069a[_0xe1301d(0x394)]());}}else this[_0x81b094(0x274)]();}}}},Window_ItemList[_0x292660(0x3c3)][_0x292660(0x3d3)]=function(){const _0x3d3ec4=_0x292660,_0x3f0965=SceneManager['_scene'],_0x73b47a=[Scene_Item,Scene_Shop];return _0x73b47a[_0x3d3ec4(0x261)](_0x3f0965[_0x3d3ec4(0x20e)]);},Window_ItemList['prototype'][_0x292660(0x413)]=function(){const _0xcd4f35=_0x292660;Window_Selectable[_0xcd4f35(0x3c3)][_0xcd4f35(0x413)]['call'](this);if(this[_0xcd4f35(0x4ce)]&&this[_0xcd4f35(0x4ce)][_0xcd4f35(0x2ac)]()){if(_0xcd4f35(0x1f0)!==_0xcd4f35(0x193))this[_0xcd4f35(0x4ce)]['activate']();else{function _0x4e4f37(){const _0x102ce4=_0xcd4f35;this[_0x102ce4(0x391)]();}}}},Window_ItemList[_0x292660(0x3c3)]['deactivate']=function(){const _0x3dbf56=_0x292660;Window_Selectable['prototype']['deactivate']['call'](this),this['_categoryWindow']&&this['_categoryWindow'][_0x3dbf56(0x2ac)]()&&this[_0x3dbf56(0x4ce)][_0x3dbf56(0x23a)]();},Window_ItemList[_0x292660(0x3c3)][_0x292660(0x471)]=function(_0x55c3e2){const _0x5ce79e=_0x292660;if(this[_0x5ce79e(0x440)]!==_0x55c3e2){if(_0x5ce79e(0xb5)!==_0x5ce79e(0x2d1)){this[_0x5ce79e(0x440)]=_0x55c3e2,this['refresh']();if(this[_0x5ce79e(0x4ce)]&&this[_0x5ce79e(0x4ce)][_0x5ce79e(0x2ac)]())this[_0x5ce79e(0x4fb)](0x0);else{if(_0x5ce79e(0x3a4)===_0x5ce79e(0x3ad)){function _0x58e0ab(){const _0x5104b6=_0x5ce79e;_0x2d7659[_0x5104b6(0x2de)]?(_0x4d7592=this[_0x5104b6(0xc1)][_0x5104b6(0x34d)](_0x1d50c2,![]),_0x451540=this['_tempActor'][_0x5104b6(0x34d)](_0x5461ef,![]),_0x5d3887=this['_tempActor']['paramValueByName'](_0x21f306,!![])):(_0xb5c22d=this['_actor'][_0x5104b6(0x3fd)](_0x2f7f68),_0x17f6be=this['_tempActor']['param'](_0x1cb9fb),_0x346d85=this[_0x5104b6(0x4e7)]['param'](_0x1ad0bf));const _0x5b57c5=_0x39d7bd,_0x6d3bdf=_0x464d71;_0x44aee3=_0x6d3bdf-_0x5b57c5,this['changeTextColor'](_0x4dfe53[_0x5104b6(0x380)](_0x1fe0f0)),this[_0x5104b6(0x4f6)](_0x5b70ff,_0xb218a2,_0xa7b03a,_0x3c5234-_0x42fea2,'right');}}else this[_0x5ce79e(0x3b4)](0x0,0x0);}}else{function _0x9359d(){const _0x461ab5=_0x5ce79e,_0x199f64=_0x301c6c[_0x4f7aac];_0x199f64[_0x461ab5(0x2b6)]===_0x3fb0ec+0x1&&_0x1104f0[_0x461ab5(0x106)](_0x199f64);}}}},VisuMZ['ItemsEquipsCore'][_0x292660(0x4dc)]=Window_ItemList['prototype']['maxCols'],Window_ItemList[_0x292660(0x3c3)][_0x292660(0x35e)]=function(){const _0x52cf5a=_0x292660;if(SceneManager[_0x52cf5a(0x4d6)][_0x52cf5a(0x20e)]===Scene_Battle)return VisuMZ[_0x52cf5a(0x448)][_0x52cf5a(0x4dc)][_0x52cf5a(0x1ef)](this);else return SceneManager[_0x52cf5a(0x4d6)][_0x52cf5a(0x20e)]===Scene_Map?VisuMZ[_0x52cf5a(0x448)][_0x52cf5a(0x4dc)]['call'](this):VisuMZ[_0x52cf5a(0x448)][_0x52cf5a(0x465)]['ItemScene'][_0x52cf5a(0x1fc)];},VisuMZ[_0x292660(0x448)]['Window_ItemList_colSpacing']=Window_ItemList[_0x292660(0x3c3)]['colSpacing'],Window_ItemList[_0x292660(0x3c3)][_0x292660(0x49f)]=function(){const _0x5e14e0=_0x292660;return this[_0x5e14e0(0x35e)]()<=0x1?Window_Selectable[_0x5e14e0(0x3c3)]['colSpacing'][_0x5e14e0(0x1ef)](this):VisuMZ['ItemsEquipsCore'][_0x5e14e0(0x468)]['call'](this);},Window_ItemList[_0x292660(0x3c3)][_0x292660(0x261)]=function(_0x2d8ea6){const _0x47be3e=_0x292660;switch(this[_0x47be3e(0x440)]){case _0x47be3e(0x248):return DataManager[_0x47be3e(0x292)](_0x2d8ea6);case _0x47be3e(0x290):return DataManager['isItem'](_0x2d8ea6)&&_0x2d8ea6[_0x47be3e(0x20d)]===0x1;case'KeyItems':return DataManager[_0x47be3e(0x292)](_0x2d8ea6)&&_0x2d8ea6[_0x47be3e(0x20d)]===0x2;case _0x47be3e(0x18b):return DataManager['isItem'](_0x2d8ea6)&&_0x2d8ea6['itypeId']===0x3;case _0x47be3e(0x491):return DataManager[_0x47be3e(0x292)](_0x2d8ea6)&&_0x2d8ea6[_0x47be3e(0x20d)]===0x4;case _0x47be3e(0x1fe):return DataManager[_0x47be3e(0x292)](_0x2d8ea6)&&_0x2d8ea6[_0x47be3e(0x39d)];case'Nonconsumable':return DataManager['isItem'](_0x2d8ea6)&&!_0x2d8ea6[_0x47be3e(0x39d)];case _0x47be3e(0x1a3):return DataManager[_0x47be3e(0x292)](_0x2d8ea6)&&[0x0]['includes'](_0x2d8ea6[_0x47be3e(0x3fb)]);case _0x47be3e(0x201):return DataManager['isItem'](_0x2d8ea6)&&[0x0,0x1][_0x47be3e(0x261)](_0x2d8ea6[_0x47be3e(0x3fb)]);case'FieldUsable':return DataManager[_0x47be3e(0x292)](_0x2d8ea6)&&[0x0,0x2]['includes'](_0x2d8ea6[_0x47be3e(0x3fb)]);case _0x47be3e(0x17f):return DataManager[_0x47be3e(0x292)](_0x2d8ea6)&&[0x3][_0x47be3e(0x261)](_0x2d8ea6[_0x47be3e(0x3fb)]);case _0x47be3e(0x3c6):return DataManager['isWeapon'](_0x2d8ea6);case _0x47be3e(0x34c):return DataManager[_0x47be3e(0x33b)](_0x2d8ea6);default:if(this['_category'][_0x47be3e(0x35a)](/WTYPE:(\d+)/i)){if(_0x47be3e(0x385)!==_0x47be3e(0x385)){function _0x4dfb35(){const _0x3501e0=_0x47be3e;this[_0x3501e0(0x3cc)][_0x3501e0(0x3a7)](),this['contentsBack'][_0x3501e0(0x3a7)](),this[_0x3501e0(0x237)]&&(this[_0x3501e0(0x204)](),this[_0x3501e0(0x202)](!![]),this[_0x3501e0(0x282)](),this['isEquipItem']()?this['drawEquipData']():this[_0x3501e0(0x1da)](),this['drawCustomShopGraphic']());}}else return DataManager[_0x47be3e(0x1cd)](_0x2d8ea6)&&_0x2d8ea6['wtypeId']===Number(RegExp['$1']);}else{if(this[_0x47be3e(0x440)][_0x47be3e(0x35a)](/WTYPE:(.*)/i)){const _0x17a7f0=$dataSystem[_0x47be3e(0x396)]['indexOf'](String(RegExp['$1'])[_0x47be3e(0x508)]());return DataManager[_0x47be3e(0x1cd)](_0x2d8ea6)&&_0x2d8ea6[_0x47be3e(0x161)]===_0x17a7f0;}else{if(this['_category'][_0x47be3e(0x35a)](/ATYPE:(\d+)/i))return DataManager[_0x47be3e(0x33b)](_0x2d8ea6)&&_0x2d8ea6[_0x47be3e(0x228)]===Number(RegExp['$1']);else{if(this['_category'][_0x47be3e(0x35a)](/ATYPE:(.*)/i)){const _0x75fa8e=$dataSystem['armorTypes'][_0x47be3e(0x291)](String(RegExp['$1'])[_0x47be3e(0x508)]());return DataManager[_0x47be3e(0x33b)](_0x2d8ea6)&&_0x2d8ea6[_0x47be3e(0x228)]===_0x75fa8e;}else{if(this['_category'][_0x47be3e(0x35a)](/ETYPE:(\d+)/i))return!!_0x2d8ea6&&_0x2d8ea6[_0x47be3e(0x2b6)]===Number(RegExp['$1']);else{if(this[_0x47be3e(0x440)][_0x47be3e(0x35a)](/ETYPE:(.*)/i)){if(_0x47be3e(0xe8)===_0x47be3e(0xe8)){const _0xdd75d6=$dataSystem[_0x47be3e(0x1e5)][_0x47be3e(0x291)](String(RegExp['$1'])[_0x47be3e(0x508)]());return DataManager[_0x47be3e(0x33b)](_0x2d8ea6)&&_0x2d8ea6[_0x47be3e(0x2b6)]===_0xdd75d6;}else{function _0x56976d(){const _0x5433fc=_0x22c840(_0x4e7992['$1'])||0x1;if(_0x2ac2e8>=_0x5433fc)return!![];}}}else{if(this[_0x47be3e(0x440)][_0x47be3e(0x35a)](/Category:(.*)/i))return!!_0x2d8ea6&&_0x2d8ea6[_0x47be3e(0x43e)][_0x47be3e(0x261)](String(RegExp['$1'])['toUpperCase']()[_0x47be3e(0x508)]());}}}}}}}return![];},Window_ItemList[_0x292660(0x3c3)]['isShowNew']=function(){return!![];},VisuMZ[_0x292660(0x448)]['Window_ItemList_drawItem']=Window_ItemList[_0x292660(0x3c3)][_0x292660(0x337)],Window_ItemList[_0x292660(0x3c3)][_0x292660(0x337)]=function(_0x4edaad){const _0x50a152=_0x292660;VisuMZ['ItemsEquipsCore'][_0x50a152(0x25e)][_0x50a152(0x1ef)](this,_0x4edaad),this[_0x50a152(0x340)](_0x4edaad);},Window_ItemList[_0x292660(0x3c3)][_0x292660(0x1f2)]=function(_0x3b8f54,_0x380b1f,_0x2a1fd4,_0x1877cb){const _0x58a595=_0x292660;Window_Selectable['prototype'][_0x58a595(0x1f2)][_0x58a595(0x1ef)](this,_0x3b8f54,_0x380b1f,_0x2a1fd4,_0x1877cb);},Window_ItemList[_0x292660(0x3c3)][_0x292660(0x340)]=function(_0x49aef2){const _0x1b552c=_0x292660,_0x26442d=this[_0x1b552c(0x310)](_0x49aef2);if(!_0x26442d||!this[_0x1b552c(0x2d5)]())return;if(!$gameParty[_0x1b552c(0x301)](_0x26442d))return;const _0x4f791a=this[_0x1b552c(0x31a)](_0x49aef2),_0x40fc96=_0x4f791a['x'],_0x263453=_0x4f791a['y']+(this[_0x1b552c(0x1a9)]()-ImageManager[_0x1b552c(0x281)])/0x2,_0x31f007=VisuMZ[_0x1b552c(0x448)]['Settings'][_0x1b552c(0xf5)][_0x1b552c(0x35c)],_0xd92596=VisuMZ[_0x1b552c(0x448)][_0x1b552c(0x465)][_0x1b552c(0xf5)][_0x1b552c(0x477)];this['placeNewLabel'](_0x26442d,_0x40fc96+_0x31f007,_0x263453+_0xd92596);},Window_ItemList[_0x292660(0x3c3)][_0x292660(0x4cd)]=function(_0x42c720){const _0x5af7eb=_0x292660;this[_0x5af7eb(0x175)]=_0x42c720,this[_0x5af7eb(0x3f1)]();},VisuMZ[_0x292660(0x448)][_0x292660(0xb3)]=Window_ItemList[_0x292660(0x3c3)][_0x292660(0xb8)],Window_ItemList[_0x292660(0x3c3)][_0x292660(0xb8)]=function(){const _0x5376ef=_0x292660;VisuMZ[_0x5376ef(0x448)][_0x5376ef(0xb3)][_0x5376ef(0x1ef)](this);if(this[_0x5376ef(0x175)]&&this[_0x5376ef(0x175)][_0x5376ef(0x20e)]===Window_ShopStatus){if(_0x5376ef(0x4c8)===_0x5376ef(0x43f)){function _0x40c4a8(){const _0x1232aa=_0x5376ef;_0x2da4eb=_0x5a7207[_0x1232aa(0x364)](_0x27505d(_0x533f48['$1'])*0.01*0xff)[_0x1232aa(0x44d)](0x0,0xff);}}else this['_statusWindow'][_0x5376ef(0x1cf)](this['item']());}},Window_BattleItem[_0x292660(0x3c3)][_0x292660(0x47e)]=function(_0x16b518){const _0x1d51f0=_0x292660;if(BattleManager[_0x1d51f0(0x331)]()){if('axmuw'!==_0x1d51f0(0x4fe)){function _0x34ffef(){_0x2408a2=_0x4945da(_0xc7dae3['$1']);}}else return BattleManager[_0x1d51f0(0x331)]()[_0x1d51f0(0x460)](_0x16b518);}else{if(_0x1d51f0(0x446)!==_0x1d51f0(0x446)){function _0x548c03(){return _0x309b47(_0x1934b9['$1']);}}else return Window_ItemList[_0x1d51f0(0x3c3)][_0x1d51f0(0x47e)]['call'](this,_0x16b518);}},Window_EventItem[_0x292660(0x3c3)][_0x292660(0x2d5)]=function(){return![];},Window_EquipStatus[_0x292660(0x3c3)][_0x292660(0x4ed)]=function(){const _0x5e1216=_0x292660;return VisuMZ[_0x5e1216(0x448)][_0x5e1216(0x465)][_0x5e1216(0xbe)][_0x5e1216(0x10d)];},VisuMZ[_0x292660(0x448)][_0x292660(0x15a)]=Window_EquipStatus['prototype'][_0x292660(0x4e9)],Window_EquipStatus[_0x292660(0x3c3)][_0x292660(0x4e9)]=function(){const _0x1e1ad2=_0x292660;this['hideAdditionalSprites'](),this['resetFontSettings']();if(this[_0x1e1ad2(0xc1)])this['_actor'][_0x1e1ad2(0x4e9)]();if(this['isUseItemsEquipsCoreUpdatedLayout']())this[_0x1e1ad2(0x147)]();else{if(_0x1e1ad2(0x2f1)!==_0x1e1ad2(0x2f1)){function _0x453bc1(){const _0x10035e=_0x1e1ad2;this[_0x10035e(0x369)]();}}else VisuMZ[_0x1e1ad2(0x448)][_0x1e1ad2(0x15a)][_0x1e1ad2(0x1ef)](this);}},Window_EquipStatus['prototype'][_0x292660(0x147)]=function(){const _0x42e392=_0x292660;this[_0x42e392(0x3cc)][_0x42e392(0x3a7)]();if(!this[_0x42e392(0xc1)])return;if(this['isMainMenuCoreMenuImageOptionAvailable']()){if('kHJql'!==_0x42e392(0x362)){function _0x1a80b6(){const _0x15b13b=_0x42e392;this[_0x15b13b(0x2a4)]();}}else{const _0xa4f399=ImageManager[_0x42e392(0x504)](this[_0x42e392(0xc1)][_0x42e392(0x2b5)]());_0xa4f399[_0x42e392(0x120)](this[_0x42e392(0x4e5)]['bind'](this));}}else this[_0x42e392(0x2f0)]();},Window_EquipStatus['prototype'][_0x292660(0x240)]=function(){const _0x4f2961=_0x292660;return Imported[_0x4f2961(0x2b0)]&&this[_0x4f2961(0xc1)]['getMenuImage']()!==''&&VisuMZ[_0x4f2961(0x448)][_0x4f2961(0x465)][_0x4f2961(0xbe)][_0x4f2961(0x16e)];},Window_EquipStatus[_0x292660(0x3c3)][_0x292660(0x4e5)]=function(){const _0x3c2e9d=_0x292660;VisuMZ[_0x3c2e9d(0x448)][_0x3c2e9d(0x465)][_0x3c2e9d(0xbe)][_0x3c2e9d(0x22e)][_0x3c2e9d(0x1ef)](this),this[_0x3c2e9d(0x11a)]();},Window_EquipStatus[_0x292660(0x3c3)][_0x292660(0x2f0)]=function(){const _0x36b3c1=_0x292660;VisuMZ[_0x36b3c1(0x448)]['Settings'][_0x36b3c1(0xbe)][_0x36b3c1(0x2d2)][_0x36b3c1(0x1ef)](this),this[_0x36b3c1(0x11a)]();},Window_EquipStatus['prototype']['drawParamsItemsEquipsCore']=function(){const _0x5e083c=_0x292660;this[_0x5e083c(0x204)](),VisuMZ[_0x5e083c(0x448)][_0x5e083c(0x465)]['EquipScene']['DrawParamJS']['call'](this);},Window_EquipStatus[_0x292660(0x3c3)][_0x292660(0x23c)]=function(_0x48bdef,_0x30eb31,_0x25e070,_0x33d4f7,_0x4d5848){const _0x1bdb45=_0x292660,_0x1056ac=ImageManager['loadPicture'](_0x48bdef[_0x1bdb45(0x2b5)]()),_0x518ce2=this[_0x1bdb45(0x143)]-_0x1056ac[_0x1bdb45(0x294)];_0x30eb31+=_0x518ce2/0x2;if(_0x518ce2<0x0)_0x33d4f7-=_0x518ce2;Window_StatusBase[_0x1bdb45(0x3c3)][_0x1bdb45(0x23c)]['call'](this,_0x48bdef,_0x30eb31,_0x25e070,_0x33d4f7,_0x4d5848);},Window_EquipStatus[_0x292660(0x3c3)][_0x292660(0xc6)]=function(){const _0x178910=_0x292660;return Imported[_0x178910(0x2de)]?VisuMZ[_0x178910(0x37a)][_0x178910(0x465)][_0x178910(0x350)]['ExtDisplayedParams']:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x292660(0x3c3)][_0x292660(0x17a)]=function(){const _0x58cd6a=_0x292660;return VisuMZ[_0x58cd6a(0x448)]['Settings']['EquipScene'][_0x58cd6a(0x4ac)];},Window_EquipStatus[_0x292660(0x3c3)][_0x292660(0x15f)]=function(){const _0x181328=_0x292660;return Imported[_0x181328(0x2de)]&&VisuMZ['CoreEngine'][_0x181328(0x465)][_0x181328(0x350)][_0x181328(0x22d)];},Window_EquipStatus[_0x292660(0x3c3)]['drawUpdatedParamName']=function(_0x2cc8b0,_0x531d93,_0x4b7db9,_0x25c22c){const _0x3862f6=_0x292660,_0x3648a4=this['itemPadding']();if(Imported[_0x3862f6(0x2de)])this['drawParamText'](_0x531d93+_0x3648a4,_0x4b7db9,_0x25c22c,_0x2cc8b0,![]);else{if(_0x3862f6(0x4df)!=='twvzn'){function _0x446d31(){const _0x39c1ae=_0x3862f6;this[_0x39c1ae(0xf9)][_0x39c1ae(0x408)](_0x39c1ae(0x18d),this[_0x39c1ae(0x273)]['bind'](this)),this[_0x39c1ae(0xf9)][_0x39c1ae(0x408)](_0x39c1ae(0x450),this['nextActor'][_0x39c1ae(0x412)](this)),this[_0x39c1ae(0xf9)][_0x39c1ae(0x408)](_0x39c1ae(0x2cc),this[_0x39c1ae(0xb7)][_0x39c1ae(0x412)](this));}}else this['drawText'](TextManager['param'](_0x2cc8b0),_0x531d93+_0x3648a4,_0x4b7db9,_0x25c22c);}},Window_EquipStatus['prototype'][_0x292660(0x13b)]=function(_0x85b559,_0x16460c,_0xd5c2bf,_0x5381d6){const _0x1f8b6d=_0x292660,_0xa98daf=this[_0x1f8b6d(0x2f2)]();let _0x378261=0x0;if(Imported[_0x1f8b6d(0x2de)]){if(_0x1f8b6d(0x1f9)==='KDOVr'){function _0x1699a4(){const _0x35da29=_0x1f8b6d;return this[_0x35da29(0x3ea)](_0x5b15d8(_0x1d2ad2['$1'])['clamp'](0x0,0x1f));}}else _0x378261=this[_0x1f8b6d(0xc1)][_0x1f8b6d(0x34d)](_0x85b559,!![]);}else _0x378261=this[_0x1f8b6d(0xc1)][_0x1f8b6d(0x3fd)](_0x85b559);const _0x5c8ce2=_0x378261;this[_0x1f8b6d(0x4f6)](_0x378261,_0x16460c,_0xd5c2bf,_0x5381d6-_0xa98daf,_0x1f8b6d(0x2b3));},Window_EquipStatus[_0x292660(0x3c3)][_0x292660(0x3d6)]=function(_0x718af9,_0x372963,_0x26fb15,_0x1991a3){const _0x24aafc=_0x292660,_0x30258a=this[_0x24aafc(0x2f2)]();let _0x4b4d49=0x0,_0xb888d6=0x0,_0x4d431c='';if(this[_0x24aafc(0x4e7)]){if(_0x24aafc(0xbb)===_0x24aafc(0xbb)){Imported[_0x24aafc(0x2de)]?(_0x4b4d49=this[_0x24aafc(0xc1)]['paramValueByName'](_0x718af9,![]),_0xb888d6=this['_tempActor']['paramValueByName'](_0x718af9,![]),_0x4d431c=this['_tempActor'][_0x24aafc(0x34d)](_0x718af9,!![])):(_0x4b4d49=this[_0x24aafc(0xc1)][_0x24aafc(0x3fd)](_0x718af9),_0xb888d6=this['_tempActor'][_0x24aafc(0x3fd)](_0x718af9),_0x4d431c=this[_0x24aafc(0x4e7)][_0x24aafc(0x3fd)](_0x718af9));const _0xa7841=_0x4b4d49,_0x28d4ee=_0xb888d6;diffValue=_0x28d4ee-_0xa7841,this[_0x24aafc(0x162)](ColorManager[_0x24aafc(0x380)](diffValue)),this['drawText'](_0x4d431c,_0x372963,_0x26fb15,_0x1991a3-_0x30258a,_0x24aafc(0x2b3));}else{function _0x3bb0d7(){const _0x580afa=_0x24aafc;this['changeTextColor'](_0x56d0f4[_0x580afa(0x4b4)]());}}}},Window_EquipStatus[_0x292660(0x3c3)][_0x292660(0x439)]=function(_0x572a5b,_0x718073,_0x35bf22,_0x106bc2){const _0x13bd4b=_0x292660,_0x2c5666=this[_0x13bd4b(0x2f2)]();let _0x1fe46e=0x0,_0x35742b=0x0,_0x1b0f22=![];if(this['_tempActor']){if(Imported[_0x13bd4b(0x2de)])_0x1fe46e=this['_actor'][_0x13bd4b(0x34d)](_0x572a5b,![]),_0x35742b=this[_0x13bd4b(0x4e7)][_0x13bd4b(0x34d)](_0x572a5b,![]),_0x1b0f22=String(this['_actor'][_0x13bd4b(0x34d)](_0x572a5b,!![]))[_0x13bd4b(0x35a)](/([%％])/i);else{if(_0x13bd4b(0x1e7)!=='eGRdL')_0x1fe46e=this[_0x13bd4b(0xc1)][_0x13bd4b(0x3fd)](_0x572a5b),_0x35742b=this[_0x13bd4b(0x4e7)]['param'](_0x572a5b),_0x1b0f22=_0x1fe46e%0x1!==0x0||_0x35742b%0x1!==0x0;else{function _0x66f693(){const _0x38d08c=_0x13bd4b;_0x982a62[_0x38d08c(0x448)]['Scene_Equip_onSlotCancel']['call'](this),this[_0x38d08c(0x2ac)]()&&(this[_0x38d08c(0x3d0)][_0x38d08c(0x4fb)](0x0),this[_0x38d08c(0xf9)][_0x38d08c(0x23a)]());}}}const _0x93e224=_0x1fe46e,_0x1f9a69=_0x35742b,_0x4dfb45=_0x1f9a69-_0x93e224;let _0x43a051=_0x4dfb45;if(_0x1b0f22)_0x43a051=Math['round'](_0x4dfb45*0x64)+'%';_0x4dfb45!==0x0&&(this[_0x13bd4b(0x162)](ColorManager[_0x13bd4b(0x380)](_0x4dfb45)),_0x43a051=(_0x4dfb45>0x0?_0x13bd4b(0x2cf):_0x13bd4b(0x4d2))['format'](_0x43a051),this['drawText'](_0x43a051,_0x718073+_0x2c5666,_0x35bf22,_0x106bc2,'left'));}},Window_EquipStatus[_0x292660(0x3c3)][_0x292660(0x138)]=function(_0xa16846,_0x59dd28,_0x19da94,_0x11e62c,_0x142988){const _0x493d97=_0x292660;if(VisuMZ[_0x493d97(0x448)][_0x493d97(0x465)][_0x493d97(0xbe)][_0x493d97(0x2ba)]===![])return;_0x142988=Math[_0x493d97(0x2d3)](_0x142988||0x1,0x1);while(_0x142988--){if(_0x493d97(0x1d3)==='AocVe'){function _0x259241(){const _0xf68c42=_0x493d97;this[_0xf68c42(0x21a)]();}}else{_0x11e62c=_0x11e62c||this[_0x493d97(0x1a9)](),this[_0x493d97(0x3cc)][_0x493d97(0x272)]=0xa0;const _0x2bfc5d=ColorManager[_0x493d97(0x305)]();this[_0x493d97(0x3cc)][_0x493d97(0x1b5)](_0xa16846+0x1,_0x59dd28+0x1,_0x19da94-0x2,_0x11e62c-0x2,_0x2bfc5d),this[_0x493d97(0x3cc)][_0x493d97(0x272)]=0xff;}}},ColorManager[_0x292660(0x305)]=function(){const _0x21b3c8=_0x292660,_0x3b0bd1=VisuMZ[_0x21b3c8(0x448)][_0x21b3c8(0x465)][_0x21b3c8(0xbe)];let _0x2127b1=_0x3b0bd1[_0x21b3c8(0xa1)]!==undefined?_0x3b0bd1[_0x21b3c8(0xa1)]:0x13;return ColorManager[_0x21b3c8(0x174)](_0x2127b1);},VisuMZ[_0x292660(0x448)][_0x292660(0x27f)]=Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0x442)],Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0x442)]=function(_0x30190c){const _0x860c5b=_0x292660;VisuMZ['ItemsEquipsCore']['Window_EquipCommand_initialize']['call'](this,_0x30190c),this[_0x860c5b(0x4d4)](_0x30190c);},Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0x4d4)]=function(_0x3b6a29){const _0x2f4287=_0x292660,_0xebd3f7=new Rectangle(0x0,0x0,_0x3b6a29['width'],_0x3b6a29[_0x2f4287(0x12e)]);this[_0x2f4287(0x124)]=new Window_Base(_0xebd3f7),this[_0x2f4287(0x124)][_0x2f4287(0x417)]=0x0,this['addChild'](this[_0x2f4287(0x124)]),this[_0x2f4287(0x1e2)]();},Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0x3f1)]=function(){const _0x46c741=_0x292660;Window_HorzCommand[_0x46c741(0x3c3)][_0x46c741(0x3f1)][_0x46c741(0x1ef)](this);if(this[_0x46c741(0x124)])this[_0x46c741(0x1e2)]();},Window_EquipCommand['prototype'][_0x292660(0x1e2)]=function(){const _0x1d91e3=_0x292660,_0x220de4=this[_0x1d91e3(0x124)];_0x220de4['contents'][_0x1d91e3(0x3a7)]();const _0x2ae005=this['commandStyleCheck'](this[_0x1d91e3(0x267)]());if(_0x2ae005===_0x1d91e3(0x194)){if(_0x1d91e3(0x1c2)!==_0x1d91e3(0x1c2)){function _0xe340a8(){const _0x3924b9=_0x1d91e3;_0x326354=this[_0x3924b9(0xc1)]['param'](_0x75955c),_0x29082d=this[_0x3924b9(0x4e7)]['param'](_0x23d7e0),_0x5dbfdb=_0x42abf8%0x1!==0x0||_0x4a0a74%0x1!==0x0;}}else{const _0x1f44c1=this['itemLineRect'](this[_0x1d91e3(0x267)]());let _0xc72fb5=this[_0x1d91e3(0xae)](this['index']());_0xc72fb5=_0xc72fb5[_0x1d91e3(0x32a)](/\\I\[(\d+)\]/gi,''),_0x220de4[_0x1d91e3(0x204)](),this['commandNameWindowDrawBackground'](_0xc72fb5,_0x1f44c1),this[_0x1d91e3(0x4e4)](_0xc72fb5,_0x1f44c1),this[_0x1d91e3(0x243)](_0xc72fb5,_0x1f44c1);}}},Window_EquipCommand['prototype'][_0x292660(0x146)]=function(_0x1cc9ca,_0x1dfeaf){},Window_EquipCommand[_0x292660(0x3c3)]['commandNameWindowDrawText']=function(_0x46ec8b,_0x47537e){const _0xc903e0=_0x292660,_0xd12e41=this['_commandNameWindow'];_0xd12e41[_0xc903e0(0x4f6)](_0x46ec8b,0x0,_0x47537e['y'],_0xd12e41[_0xc903e0(0x143)],'center');},Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0x243)]=function(_0x465b84,_0x30f7ac){const _0x3ec19a=_0x292660,_0x3f5dcb=this['_commandNameWindow'],_0x299c8a=$gameSystem['windowPadding'](),_0x178532=_0x30f7ac['x']+Math[_0x3ec19a(0x4d8)](_0x30f7ac[_0x3ec19a(0x294)]/0x2)+_0x299c8a;_0x3f5dcb['x']=_0x3f5dcb[_0x3ec19a(0x294)]/-0x2+_0x178532,_0x3f5dcb['y']=Math['floor'](_0x30f7ac['height']/0x2);},Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0x2ac)]=function(){const _0x54f0c6=_0x292660;return Imported[_0x54f0c6(0x2de)]&&Window_HorzCommand[_0x54f0c6(0x3c3)][_0x54f0c6(0x2ac)][_0x54f0c6(0x1ef)](this);},Window_EquipCommand[_0x292660(0x3c3)]['playOkSound']=function(){const _0x4f9d1f=_0x292660;if(this[_0x4f9d1f(0x227)]()===_0x4f9d1f(0xba))Window_HorzCommand[_0x4f9d1f(0x3c3)][_0x4f9d1f(0x3b5)][_0x4f9d1f(0x1ef)](this);},Window_EquipCommand['prototype'][_0x292660(0x345)]=function(){const _0x285964=_0x292660;!this[_0x285964(0x41c)]()&&Window_HorzCommand[_0x285964(0x3c3)][_0x285964(0x345)][_0x285964(0x1ef)](this);},Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0x41c)]=function(){const _0x5dd1c5=_0x292660;if(!this['isCursorMovable']())return![];if(SceneManager[_0x5dd1c5(0x4d6)]['constructor']!==Scene_Equip)return![];if(Input[_0x5dd1c5(0x3cd)](_0x5dd1c5(0x4af))){if('RrnoX'==='RrnoX')this['playCursorSound'](),SceneManager[_0x5dd1c5(0x4d6)][_0x5dd1c5(0x200)](),SceneManager['_scene'][_0x5dd1c5(0xf9)][_0x5dd1c5(0x4fb)](-0x1);else{function _0x552361(){const _0x10e719=_0x5dd1c5,_0x1fc919=this['_commandWindow']['y']+this[_0x10e719(0x3d0)]['height'],_0x5e25c6=_0xf32a6f[_0x10e719(0x164)]-this[_0x10e719(0x3ef)](),_0x595532=this['isRightInputMode']()?_0x2a39b4['boxWidth']-_0x5e25c6:0x0,_0x15196e=this[_0x10e719(0x368)]()-this[_0x10e719(0x3d0)][_0x10e719(0x12e)];return new _0x4c9ea2(_0x595532,_0x1fc919,_0x5e25c6,_0x15196e);}}}return![];},Window_EquipCommand[_0x292660(0x3c3)]['maxCols']=function(){const _0x31f0d4=_0x292660;return this[_0x31f0d4(0x3ee)]?this[_0x31f0d4(0x3ee)]['length']:0x3;},Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0x136)]=function(){const _0xf7e26c=_0x292660;if(this[_0xf7e26c(0x297)]()&&this['visible']&&SceneManager[_0xf7e26c(0x4d6)][_0xf7e26c(0x20e)]===Scene_Equip){if(this['isHoverEnabled']()&&TouchInput['isHovered']())this['onTouchSelectModernControls'](![]);else{if(TouchInput[_0xf7e26c(0x3cd)]()){if(_0xf7e26c(0x42a)!==_0xf7e26c(0x42a)){function _0x49eb8b(){const _0x4046e6=_0xf7e26c;this[_0x4046e6(0x204)]();const _0xc4c6c7=_0x5b7bea[_0x4046e6(0x448)]['Settings'][_0x4046e6(0x34a)],_0x2e1b6f=_0xc4c6c7[_0x4046e6(0x177)],_0x119786=_0x2e1b6f[_0x4046e6(0x169)](_0x5df427[_0x4046e6(0x1c4)](_0x3d3547));this[_0x4046e6(0x3cc)][_0x4046e6(0x269)]=_0xc4c6c7[_0x4046e6(0x29a)],this[_0x4046e6(0x4f6)](_0x119786,_0xcd4007,_0x4ec8cd,_0x3f9fe0,_0x4046e6(0x2b3)),this['resetFontSettings']();}}else this[_0xf7e26c(0x3a5)](!![]);}}if(TouchInput[_0xf7e26c(0x123)]()){if('nayaA'!==_0xf7e26c(0x225))this[_0xf7e26c(0x21a)]();else{function _0x76c817(){const _0x26321a=_0xf7e26c;!this[_0x26321a(0x41c)]()&&_0x539226[_0x26321a(0x3c3)][_0x26321a(0x345)]['call'](this);}}}else TouchInput[_0xf7e26c(0x2c6)]()&&this[_0xf7e26c(0x48e)]();}},Window_EquipCommand['prototype']['onTouchSelectModernControls']=function(_0x5a8a43){const _0x7c6a8c=_0x292660;this[_0x7c6a8c(0x325)]=![];const _0x52e2c0=this['index'](),_0x12baa7=this[_0x7c6a8c(0x258)](),_0x55402a=SceneManager[_0x7c6a8c(0x4d6)]['_slotWindow'];if(_0x55402a['isOpen']()&&_0x55402a[_0x7c6a8c(0x3da)]){if(_0x7c6a8c(0x254)!==_0x7c6a8c(0x254)){function _0x1f2ad8(){_0x3589ad=_0x4ff8ff(_0x1e06ca['$1']),_0x8d2c45=_0x732c8c(_0x2a1ee1['$2']);}}else{if(_0x12baa7>=0x0){if(_0x12baa7===this['index']()){if(_0x7c6a8c(0x42d)!==_0x7c6a8c(0xd6))this[_0x7c6a8c(0x325)]=!![];else{function _0x231fd1(){const _0x4b0f06=_0x7c6a8c,_0x2ff7f1=this[_0x4b0f06(0x31a)](_0x46592d),_0x5e7dcb=this[_0x4b0f06(0xae)](_0x47e504),_0x4b3488=this['textSizeEx'](_0x5e7dcb)['width'];this[_0x4b0f06(0x202)](this[_0x4b0f06(0x114)](_0x394a18));const _0x36af96=this[_0x4b0f06(0x4bc)]();if(_0x36af96===_0x4b0f06(0x2b3))this['drawTextEx'](_0x5e7dcb,_0x2ff7f1['x']+_0x2ff7f1['width']-_0x4b3488,_0x2ff7f1['y'],_0x4b3488);else{if(_0x36af96==='center'){const _0xd33b7f=_0x2ff7f1['x']+_0x121a7b['floor']((_0x2ff7f1[_0x4b0f06(0x294)]-_0x4b3488)/0x2);this[_0x4b0f06(0x483)](_0x5e7dcb,_0xd33b7f,_0x2ff7f1['y'],_0x4b3488);}else this['drawTextEx'](_0x5e7dcb,_0x2ff7f1['x'],_0x2ff7f1['y'],_0x4b3488);}}}}this[_0x7c6a8c(0x413)](),this[_0x7c6a8c(0x108)](_0x12baa7);}else{if(_0x55402a[_0x7c6a8c(0x258)]()>=0x0){if(_0x7c6a8c(0x330)===_0x7c6a8c(0x330))this[_0x7c6a8c(0x23a)](),this[_0x7c6a8c(0x496)]();else{function _0x1f4449(){const _0x336f19=_0x7c6a8c,_0x54b262=_0x58105a['ItemsEquipsCore'][_0x336f19(0x465)]['EquipScene'];let _0x213c11=_0x54b262[_0x336f19(0xa1)]!==_0x65102?_0x54b262[_0x336f19(0xa1)]:0x13;return _0x5a6f9e[_0x336f19(0x174)](_0x213c11);}}}}}}_0x5a8a43&&this[_0x7c6a8c(0x267)]()!==_0x52e2c0&&this['playCursorSound']();},Window_EquipCommand['prototype']['makeCommandList']=function(){const _0x5d68eb=_0x292660;this[_0x5d68eb(0x410)](),this['addOptimizeCommand'](),this[_0x5d68eb(0x4c0)]();},Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0x4e9)]=function(){const _0x498e4c=_0x292660;Window_HorzCommand['prototype'][_0x498e4c(0x4e9)]['call'](this),this[_0x498e4c(0x4dd)]();},Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0x410)]=function(){const _0x1f58ff=_0x292660;if(!this[_0x1f58ff(0x10e)]())return;const _0xe6ec0d=this[_0x1f58ff(0x372)](),_0x220ef4=VisuMZ['ItemsEquipsCore'][_0x1f58ff(0x465)][_0x1f58ff(0xbe)][_0x1f58ff(0xd1)],_0x163c0b=_0xe6ec0d===_0x1f58ff(0x19d)?TextManager[_0x1f58ff(0x130)]:_0x1f58ff(0x181)[_0x1f58ff(0x169)](_0x220ef4,TextManager['equip2']),_0x171585=this[_0x1f58ff(0x505)]();this[_0x1f58ff(0x4ee)](_0x163c0b,'equip',_0x171585);},Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0x10e)]=function(){return!this['isUseModernControls']();},Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0x505)]=function(){return!![];},Window_EquipCommand[_0x292660(0x3c3)]['addOptimizeCommand']=function(){const _0x2c7d1a=_0x292660;if(!this['isOptimizeCommandAdded']())return;const _0xf1661f=this[_0x2c7d1a(0x372)](),_0x535851=VisuMZ[_0x2c7d1a(0x448)]['Settings']['EquipScene'][_0x2c7d1a(0x2a1)],_0x16bb77=_0xf1661f===_0x2c7d1a(0x19d)?TextManager[_0x2c7d1a(0x402)]:_0x2c7d1a(0x181)[_0x2c7d1a(0x169)](_0x535851,TextManager[_0x2c7d1a(0x402)]),_0x1aaa63=this['isOptimizeCommandEnabled']();this[_0x2c7d1a(0x4ee)](_0x16bb77,'optimize',_0x1aaa63);},Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0x2b7)]=function(){const _0x205873=_0x292660;return VisuMZ[_0x205873(0x448)][_0x205873(0x465)][_0x205873(0xbe)]['CommandAddOptimize'];},Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0xd4)]=function(){return!![];},Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0x4c0)]=function(){const _0x56318d=_0x292660;if(!this[_0x56318d(0x1ec)]())return;const _0x7e6b1e=this[_0x56318d(0x372)](),_0x13442e=VisuMZ[_0x56318d(0x448)][_0x56318d(0x465)][_0x56318d(0xbe)][_0x56318d(0x183)],_0x145d35=_0x7e6b1e===_0x56318d(0x19d)?TextManager[_0x56318d(0x3a7)]:_0x56318d(0x181)[_0x56318d(0x169)](_0x13442e,TextManager[_0x56318d(0x3a7)]),_0x4a2f3d=this[_0x56318d(0xe7)]();this[_0x56318d(0x4ee)](_0x145d35,_0x56318d(0x3a7),_0x4a2f3d);},Window_EquipCommand[_0x292660(0x3c3)]['isClearCommandAdded']=function(){const _0x408b39=_0x292660;return VisuMZ['ItemsEquipsCore'][_0x408b39(0x465)][_0x408b39(0xbe)][_0x408b39(0x156)];},Window_EquipCommand['prototype'][_0x292660(0xe7)]=function(){return!![];},Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0x4bc)]=function(){const _0x4d4724=_0x292660;return VisuMZ['ItemsEquipsCore'][_0x4d4724(0x465)]['EquipScene'][_0x4d4724(0x10f)];},Window_EquipCommand['prototype']['drawItem']=function(_0x3c0886){const _0x2cd1a2=_0x292660,_0x17eea4=this['commandStyleCheck'](_0x3c0886);if(_0x17eea4==='iconText'){if(_0x2cd1a2(0xdb)===_0x2cd1a2(0xdb))this[_0x2cd1a2(0x2d9)](_0x3c0886);else{function _0x1caa6b(){const _0x11bdbf=_0x2cd1a2;this[_0x11bdbf(0x274)]();}}}else{if(_0x17eea4==='icon'){if('zoCnO'!==_0x2cd1a2(0x317))this['drawItemStyleIcon'](_0x3c0886);else{function _0x1e52fd(){const _0x52b6a3=_0x2cd1a2;return _0x26d056[_0x52b6a3(0x37a)][_0x52b6a3(0x465)][_0x52b6a3(0x350)][_0x52b6a3(0x4a7)];}}}else{if('lTjSG'===_0x2cd1a2(0x37f)){function _0x44d901(){const _0x561bef=_0x2cd1a2;_0x326840[_0x561bef(0x448)]['Scene_Shop_doSell']['call'](this,_0xb2ad24);if(_0x3c67aa<=0x0)return;const _0x39d154=_0x6bbfb3['ItemsEquipsCore']['Settings'][_0x561bef(0x25a)];_0x39d154[_0x561bef(0x3ca)]&&_0x56a4ad[_0x561bef(0x464)](_0x39d154['SwitchSell'],!![]);}}else Window_HorzCommand['prototype'][_0x2cd1a2(0x337)][_0x2cd1a2(0x1ef)](this,_0x3c0886);}}},Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0x372)]=function(){const _0x4ae721=_0x292660;return VisuMZ[_0x4ae721(0x448)][_0x4ae721(0x465)][_0x4ae721(0xbe)][_0x4ae721(0x2ab)];},Window_EquipCommand['prototype'][_0x292660(0x1b4)]=function(_0x6704ad){const _0x26c346=_0x292660;if(_0x6704ad<0x0)return _0x26c346(0x19d);const _0x1141d9=this[_0x26c346(0x372)]();if(_0x1141d9!==_0x26c346(0x251))return _0x1141d9;else{if(this['maxItems']()>0x0){const _0x1cc060=this[_0x26c346(0xae)](_0x6704ad);if(_0x1cc060[_0x26c346(0x35a)](/\\I\[(\d+)\]/i)){const _0x36d2d2=this[_0x26c346(0x31a)](_0x6704ad),_0x4df7f5=this[_0x26c346(0x28b)](_0x1cc060)['width'];if(_0x4df7f5<=_0x36d2d2[_0x26c346(0x294)]){if(_0x26c346(0x1f7)==='oepbx'){function _0x439926(){const _0x1e28c7=_0x26c346;return this[_0x1e28c7(0x4d6)]&&this['_scene'][_0x1e28c7(0x20e)]===_0x32cdbf;}}else return'iconText';}else return _0x26c346(0x194);}}}return _0x26c346(0x19d);},Window_EquipCommand[_0x292660(0x3c3)][_0x292660(0x2d9)]=function(_0x471cf6){const _0x1264b0=_0x292660,_0x708de7=this[_0x1264b0(0x31a)](_0x471cf6),_0x17b27a=this[_0x1264b0(0xae)](_0x471cf6),_0x362131=this['textSizeEx'](_0x17b27a)[_0x1264b0(0x294)];this[_0x1264b0(0x202)](this[_0x1264b0(0x114)](_0x471cf6));const _0x386e4d=this[_0x1264b0(0x4bc)]();if(_0x386e4d===_0x1264b0(0x2b3))this[_0x1264b0(0x483)](_0x17b27a,_0x708de7['x']+_0x708de7[_0x1264b0(0x294)]-_0x362131,_0x708de7['y'],_0x362131);else{if(_0x386e4d===_0x1264b0(0x31b)){const _0x147b44=_0x708de7['x']+Math[_0x1264b0(0x4d8)]((_0x708de7[_0x1264b0(0x294)]-_0x362131)/0x2);this[_0x1264b0(0x483)](_0x17b27a,_0x147b44,_0x708de7['y'],_0x362131);}else this['drawTextEx'](_0x17b27a,_0x708de7['x'],_0x708de7['y'],_0x362131);}},Window_EquipCommand[_0x292660(0x3c3)]['drawItemStyleIcon']=function(_0x10c3da){const _0x2c1caf=_0x292660;this[_0x2c1caf(0xae)](_0x10c3da)[_0x2c1caf(0x35a)](/\\I\[(\d+)\]/i);const _0x13c389=Number(RegExp['$1'])||0x0,_0x46bb29=this[_0x2c1caf(0x31a)](_0x10c3da),_0x3e7d11=_0x46bb29['x']+Math[_0x2c1caf(0x4d8)]((_0x46bb29['width']-ImageManager[_0x2c1caf(0x45e)])/0x2),_0x2fc960=_0x46bb29['y']+(_0x46bb29[_0x2c1caf(0x12e)]-ImageManager[_0x2c1caf(0x281)])/0x2;this[_0x2c1caf(0x2ed)](_0x13c389,_0x3e7d11,_0x2fc960);},Window_EquipSlot[_0x292660(0x3c3)][_0x292660(0x2ac)]=function(){const _0x1a94e1=_0x292660;return Imported[_0x1a94e1(0x2de)]&&Window_HorzCommand[_0x1a94e1(0x3c3)]['isUseModernControls'][_0x1a94e1(0x1ef)](this);},Window_EquipSlot[_0x292660(0x3c3)][_0x292660(0x413)]=function(){const _0x1a55d7=_0x292660;Window_StatusBase['prototype'][_0x1a55d7(0x413)][_0x1a55d7(0x1ef)](this),this[_0x1a55d7(0x3f1)]();},Window_EquipSlot[_0x292660(0x3c3)][_0x292660(0x3de)]=function(){const _0x369005=_0x292660;Window_StatusBase[_0x369005(0x3c3)]['processCursorMove'][_0x369005(0x1ef)](this),this[_0x369005(0x18f)]();},Window_EquipSlot[_0x292660(0x3c3)][_0x292660(0x18f)]=function(){const _0x50d514=_0x292660;if(!this[_0x50d514(0x244)]())return;if(Input[_0x50d514(0x3cd)](_0x50d514(0x4ab))&&this[_0x50d514(0x378)]()){if(_0x50d514(0x3a2)!==_0x50d514(0x3a2)){function _0x489b25(){const _0x2461d7=_0x50d514;this[_0x2461d7(0x483)](_0x92611d,_0x219915['x']+_0x2ff79a[_0x2461d7(0x294)]-_0xd00d6e,_0x2a470f['y'],_0x2d8ead);}}else{const _0x16002e=SceneManager[_0x50d514(0x4d6)][_0x50d514(0xc1)];if(_0x16002e){if(this[_0x50d514(0x3ba)](this[_0x50d514(0x267)]()))this[_0x50d514(0x46b)](),this[_0x50d514(0xb8)]();else{if(_0x50d514(0xc8)===_0x50d514(0x19f)){function _0x561857(){const _0x509993=_0x50d514;return _0x5d0de1[_0x509993(0x435)](_0x509993(0x4ab));}}else this[_0x50d514(0x44c)]();}}}}},Window_EquipSlot[_0x292660(0x3c3)]['canShiftRemoveEquipment']=function(_0xd853bb){const _0x21fece=_0x292660,_0x285170=SceneManager['_scene']['_actor'];if(!_0x285170)return;if(!_0x285170['isEquipChangeOk'](this[_0x21fece(0x267)]())){if(_0x21fece(0x19b)===_0x21fece(0x19b))return![];else{function _0x424594(){const _0x17fb1e=_0x21fece;if(this['currentSymbol']()===_0x17fb1e(0xba))_0x2b8bc0[_0x17fb1e(0x3c3)]['playOkSound']['call'](this);}}}const _0x55b47b=_0x285170[_0x21fece(0x3f9)]()[this[_0x21fece(0x267)]()];if(_0x285170[_0x21fece(0x115)]()[_0x21fece(0x261)](_0x55b47b))return![];return!![];;},Window_EquipSlot[_0x292660(0x3c3)]['processShiftRemoveShortcut']=function(){const _0x2fbe9c=_0x292660;SoundManager['playEquip']();const _0x4c5651=SceneManager[_0x2fbe9c(0x4d6)][_0x2fbe9c(0xc1)];_0x4c5651[_0x2fbe9c(0x1f5)](this[_0x2fbe9c(0x267)](),null),this[_0x2fbe9c(0x4e9)](),this['_itemWindow'][_0x2fbe9c(0x4e9)](),this[_0x2fbe9c(0x3f1)]();const _0x491b8a=SceneManager[_0x2fbe9c(0x4d6)][_0x2fbe9c(0x175)];if(_0x491b8a)_0x491b8a[_0x2fbe9c(0x4e9)]();},Window_EquipSlot[_0x292660(0x3c3)]['isShiftRemoveShortcutEnabled']=function(){const _0x983199=_0x292660;if(!this[_0x983199(0x2e6)])return![];if(!VisuMZ[_0x983199(0x448)][_0x983199(0x465)][_0x983199(0xbe)][_0x983199(0x13c)])return![];return!![];},Window_EquipSlot['prototype'][_0x292660(0x345)]=function(){const _0xd21023=_0x292660;!this[_0xd21023(0x41c)]()&&Window_StatusBase['prototype'][_0xd21023(0x345)]['call'](this);},Window_EquipSlot[_0x292660(0x3c3)][_0x292660(0x41c)]=function(){const _0x592431=_0x292660;if(!this['isCursorMovable']())return![];if(SceneManager[_0x592431(0x4d6)][_0x592431(0x20e)]!==Scene_Equip)return![];if(this[_0x592431(0x18a)]())return this[_0x592431(0x274)](),Input[_0x592431(0x3a7)](),SceneManager[_0x592431(0x4d6)][_0x592431(0x279)](),![];else{if(Input[_0x592431(0x21e)](_0x592431(0x4af))){const _0x17db1b=this['index']();return Input[_0x592431(0x15d)](_0x592431(0x4ab))?this[_0x592431(0x2a4)]():this[_0x592431(0x2f9)](Input[_0x592431(0x3cd)](_0x592431(0x4af))),this[_0x592431(0x267)]()!==_0x17db1b&&this[_0x592431(0x274)](),!![];}else{if(this[_0x592431(0x3b2)]()&&Input[_0x592431(0x3cd)](_0x592431(0x4ab)))return!![];}}return![];},Window_EquipSlot[_0x292660(0x3c3)][_0x292660(0x18a)]=function(){const _0x1f0927=_0x292660;if(this[_0x1f0927(0x267)]()!==0x0)return![];const _0x538435=VisuMZ[_0x1f0927(0x448)]['Settings']['EquipScene'];if(!_0x538435['CommandAddOptimize']&&!_0x538435['CommandAddClear'])return![];return Input[_0x1f0927(0x3cd)]('up');},Window_EquipSlot[_0x292660(0x3c3)][_0x292660(0x3b2)]=function(){const _0x2fb4e6=_0x292660;return VisuMZ[_0x2fb4e6(0x448)][_0x2fb4e6(0x465)]['EquipScene'][_0x2fb4e6(0x13c)];},Window_EquipSlot[_0x292660(0x3c3)][_0x292660(0x136)]=function(){const _0x5b9194=_0x292660;if(this[_0x5b9194(0x297)]()&&this[_0x5b9194(0x3da)]&&SceneManager[_0x5b9194(0x4d6)][_0x5b9194(0x20e)]===Scene_Equip){if(this['isHoverEnabled']()&&TouchInput[_0x5b9194(0x2ef)]())this['onTouchSelectModernControls'](![]);else TouchInput[_0x5b9194(0x3cd)]()&&this[_0x5b9194(0x3a5)](!![]);if(TouchInput[_0x5b9194(0x123)]()){if(_0x5b9194(0x36e)==='RCECB'){function _0x4cc85a(){const _0x8e55f5=_0x5b9194;return _0x1a05ca[_0x8e55f5(0x448)][_0x8e55f5(0x465)][_0x8e55f5(0x126)][_0x8e55f5(0x4a8)];}}else this['onTouchOk']();}else{if(TouchInput[_0x5b9194(0x2c6)]()){if(_0x5b9194(0x2f6)!=='REulI'){function _0x4398f5(){const _0x11a13f=_0x5b9194;return!this[_0x11a13f(0x356)];}}else this['onTouchCancel']();}}}},Window_EquipSlot[_0x292660(0x3c3)]['onTouchSelectModernControls']=function(_0x2457d2){const _0x39db18=_0x292660;this[_0x39db18(0x325)]=![];const _0x2cf91f=this[_0x39db18(0x267)](),_0x31410f=this[_0x39db18(0x258)](),_0x67acd7=SceneManager[_0x39db18(0x4d6)][_0x39db18(0x3d0)];if(_0x67acd7[_0x39db18(0x297)]()&&_0x67acd7[_0x39db18(0x3da)]){if(_0x31410f>=0x0)_0x31410f===this[_0x39db18(0x267)]()&&(this[_0x39db18(0x325)]=!![]),this[_0x39db18(0x413)](),this['select'](_0x31410f);else _0x67acd7[_0x39db18(0x258)]()>=0x0&&(this[_0x39db18(0x23a)](),this['deselect']());}if(_0x2457d2&&this[_0x39db18(0x267)]()!==_0x2cf91f){if(_0x39db18(0x328)===_0x39db18(0x328))this[_0x39db18(0x274)]();else{function _0x2fd590(){const _0x4d3414=_0x39db18;return _0x2f244d[_0x4d3414(0x448)][_0x4d3414(0x465)][_0x4d3414(0xbe)][_0x4d3414(0x2c7)];}}}},Window_EquipSlot[_0x292660(0x3c3)][_0x292660(0x252)]=function(){const _0x2cb2a6=_0x292660;return this[_0x2cb2a6(0x267)]();},VisuMZ[_0x292660(0x448)][_0x292660(0x112)]=Window_EquipItem[_0x292660(0x3c3)][_0x292660(0x261)],Window_EquipItem[_0x292660(0x3c3)][_0x292660(0x261)]=function(_0x64520a){const _0x5abf2a=_0x292660;return _0x64520a===null&&this['nonRemovableEtypes']()['includes'](this['etypeId']())?![]:VisuMZ[_0x5abf2a(0x448)][_0x5abf2a(0x112)][_0x5abf2a(0x1ef)](this,_0x64520a);},VisuMZ[_0x292660(0x448)][_0x292660(0x2f8)]=Window_EquipItem[_0x292660(0x3c3)][_0x292660(0x47e)],Window_EquipItem[_0x292660(0x3c3)][_0x292660(0x47e)]=function(_0x491cf7){const _0xa6284f=_0x292660;if(_0x491cf7&&this[_0xa6284f(0xc1)]){if(_0xa6284f(0x2db)!==_0xa6284f(0x2db)){function _0x42d2d4(){return this['commandWindowRectItemsEquipsCore']();}}else{if(this['itemHasEquipLimit'](_0x491cf7))return![];if(this[_0xa6284f(0x3a1)](_0x491cf7))return![];if(this['isSoleArmorType'](_0x491cf7))return![];}}if(!_0x491cf7)return!this[_0xa6284f(0x115)]()[_0xa6284f(0x261)](this[_0xa6284f(0x2b6)]());return VisuMZ[_0xa6284f(0x448)]['Window_EquipItem_isEnabled'][_0xa6284f(0x1ef)](this,_0x491cf7);},Window_EquipItem['prototype'][_0x292660(0x2fd)]=function(_0x50543f){const _0x40f9b7=_0x292660,_0x21b0ca=_0x50543f[_0x40f9b7(0x445)];if(_0x21b0ca[_0x40f9b7(0x35a)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){if('ctyPF'===_0x40f9b7(0xf8)){const _0x5b2fe7=Number(RegExp['$1'])||0x1;let _0xef32d=0x0;const _0x392d9b=this[_0x40f9b7(0xc1)][_0x40f9b7(0x307)](),_0x3ae7b0=SceneManager['_scene']['_slotWindow']['equipSlotIndex']();_0x392d9b[_0x3ae7b0]=null;for(const _0x498525 of _0x392d9b){if(!_0x498525)continue;if(DataManager[_0x40f9b7(0x1cd)](_0x50543f)===DataManager[_0x40f9b7(0x1cd)](_0x498525)){if(_0x40f9b7(0x14e)===_0x40f9b7(0x14e)){if(_0x50543f['id']===_0x498525['id'])_0xef32d+=0x1;}else{function _0x44ddf5(){const _0xc22bdc=_0x40f9b7,_0x5dc7b4=_0x28490b[_0xc22bdc(0x2e4)]['indexOf'](_0x109aa9(_0x253789['$1'])[_0xc22bdc(0x508)]());return _0x870bdf['isArmor'](_0x448343)&&_0x59c279[_0xc22bdc(0x228)]===_0x5dc7b4;}}}}return _0xef32d>=_0x5b2fe7;}else{function _0x1bd881(){const _0x2a5dc7=_0x40f9b7;_0x42e7a7[_0x2a5dc7(0x3c3)]['resetFontSettings'][_0x2a5dc7(0x1ef)](this),this[_0x2a5dc7(0x3cc)][_0x2a5dc7(0x269)]=this['_resetFontSize']||this[_0x2a5dc7(0x3cc)][_0x2a5dc7(0x269)],this[_0x2a5dc7(0x3cc)][_0x2a5dc7(0x3ea)]=this[_0x2a5dc7(0xb6)]||this[_0x2a5dc7(0x3cc)][_0x2a5dc7(0x3ea)];}}}else{if('GAloB'!=='GAloB'){function _0x327870(){const _0x4432be=_0x40f9b7;_0x44d30a[_0x4432be(0x448)][_0x4432be(0x2e2)]['call'](this,_0x364716,_0x3a694e);}}else return![];}},Window_EquipItem[_0x292660(0x3c3)]['isSoleWeaponType']=function(_0x1dd6eb){const _0x2603bf=_0x292660;if(!DataManager[_0x2603bf(0x1cd)](_0x1dd6eb))return![];const _0x11be72=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x45d0ce=0x0;const _0x478df1=this[_0x2603bf(0xc1)]['equips'](),_0xbb885e=SceneManager['_scene'][_0x2603bf(0xf9)][_0x2603bf(0x252)]();_0x478df1[_0xbb885e]=null;for(const _0x58a472 of _0x478df1){if(_0x2603bf(0x119)===_0x2603bf(0x4be)){function _0x5a8afc(){const _0x2aaea3=_0x2603bf;_0x51d546=this[_0x2aaea3(0x1eb)]-_0x212353;}}else{if(!_0x58a472)continue;if(!DataManager[_0x2603bf(0x1cd)](_0x58a472))continue;if(_0x1dd6eb[_0x2603bf(0x161)]===_0x58a472['wtypeId']){_0x45d0ce+=0x1;if(_0x1dd6eb['note']['match'](_0x11be72)){const _0x1aba06=Number(RegExp['$1'])||0x1;if(_0x45d0ce>=_0x1aba06)return!![];}if(_0x58a472['note'][_0x2603bf(0x35a)](_0x11be72)){const _0x437973=Number(RegExp['$1'])||0x1;if(_0x45d0ce>=_0x437973)return!![];}}}}return![];},Window_EquipItem[_0x292660(0x3c3)][_0x292660(0x37b)]=function(_0xcab902){const _0xabefe4=_0x292660;if(!DataManager['isArmor'](_0xcab902))return![];const _0x4c6b0f=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x356c4f=0x0;const _0x4421c3=this['_actor'][_0xabefe4(0x307)](),_0x1554b9=SceneManager[_0xabefe4(0x4d6)]['_slotWindow']['equipSlotIndex']();_0x4421c3[_0x1554b9]=null;for(const _0x3e1f07 of _0x4421c3){if(!_0x3e1f07)continue;if(!DataManager[_0xabefe4(0x33b)](_0x3e1f07))continue;if(_0xcab902[_0xabefe4(0x228)]===_0x3e1f07['atypeId']){if('iFEQY'!==_0xabefe4(0x196)){function _0x3c415a(){const _0x4b8984=_0xabefe4,_0x1cb1c1=_0x4b8984(0x19e);if(this['_customItemInfo'][_0x1cb1c1])return this[_0x4b8984(0x2fb)][_0x1cb1c1];let _0x5b275f='';return _0x5b275f+=_0x4b8984(0x457)[_0x4b8984(0x169)](this[_0x4b8984(0x211)][_0x4b8984(0xec)]),_0x5b275f;}}else{_0x356c4f+=0x1;if(_0xcab902[_0xabefe4(0x445)][_0xabefe4(0x35a)](_0x4c6b0f)){const _0x553b09=Number(RegExp['$1'])||0x1;if(_0x356c4f>=_0x553b09)return!![];}if(_0x3e1f07[_0xabefe4(0x445)][_0xabefe4(0x35a)](_0x4c6b0f)){const _0x3d76ac=Number(RegExp['$1'])||0x1;if(_0x356c4f>=_0x3d76ac)return!![];}}}}return![];},Window_EquipItem[_0x292660(0x3c3)][_0x292660(0x115)]=function(){const _0x34ce59=_0x292660;return VisuMZ['ItemsEquipsCore'][_0x34ce59(0x465)][_0x34ce59(0xbe)][_0x34ce59(0x1c0)];},Window_EquipItem[_0x292660(0x3c3)][_0x292660(0x337)]=function(_0x17bd84){const _0x34b94f=_0x292660,_0x1cc19a=this[_0x34b94f(0x310)](_0x17bd84);_0x1cc19a?Window_ItemList[_0x34b94f(0x3c3)]['drawItem'][_0x34b94f(0x1ef)](this,_0x17bd84):this[_0x34b94f(0x44a)](_0x17bd84);},Window_EquipItem[_0x292660(0x3c3)]['drawRemoveItem']=function(_0x519f59){const _0x8279d9=_0x292660;this[_0x8279d9(0x202)](this[_0x8279d9(0x47e)](null));const _0x4bc1cc=VisuMZ['ItemsEquipsCore'][_0x8279d9(0x465)]['EquipScene'],_0x321656=this['itemLineRect'](_0x519f59),_0x5dc72d=_0x321656['y']+(this[_0x8279d9(0x1a9)]()-ImageManager[_0x8279d9(0x281)])/0x2,_0x19bf2a=ImageManager[_0x8279d9(0x45e)]+0x4,_0x2f189a=Math['max'](0x0,_0x321656['width']-_0x19bf2a);this[_0x8279d9(0x473)](),this[_0x8279d9(0x2ed)](_0x4bc1cc[_0x8279d9(0x12d)],_0x321656['x'],_0x5dc72d),this[_0x8279d9(0x4f6)](_0x4bc1cc[_0x8279d9(0x286)],_0x321656['x']+_0x19bf2a,_0x321656['y'],_0x2f189a),this[_0x8279d9(0x202)](!![]);},Window_EquipItem[_0x292660(0x3c3)][_0x292660(0xb8)]=function(){const _0x15d0e0=_0x292660;Window_ItemList[_0x15d0e0(0x3c3)]['updateHelp']['call'](this);if(this[_0x15d0e0(0xc1)]&&this[_0x15d0e0(0x175)]&&this[_0x15d0e0(0x3e2)]>=0x0){if(_0x15d0e0(0x1d9)!==_0x15d0e0(0x1d9)){function _0x58d648(){const _0x2d77ff=_0x15d0e0;_0x336c86+='%1'[_0x2d77ff(0x169)](this[_0x2d77ff(0x211)][_0x2d77ff(0x23e)]);}}else{const _0x46352c=JsonEx['makeDeepCopy'](this[_0x15d0e0(0xc1)]);_0x46352c[_0x15d0e0(0x4e7)]=!![],_0x46352c[_0x15d0e0(0x373)](this[_0x15d0e0(0x3e2)],this[_0x15d0e0(0x378)]()),this[_0x15d0e0(0x175)][_0x15d0e0(0x158)](_0x46352c);}}},VisuMZ[_0x292660(0x448)]['Window_ShopCommand_initialize']=Window_ShopCommand[_0x292660(0x3c3)][_0x292660(0x442)],Window_ShopCommand[_0x292660(0x3c3)][_0x292660(0x442)]=function(_0x3cca2a){const _0x2ddca9=_0x292660;VisuMZ[_0x2ddca9(0x448)][_0x2ddca9(0x255)][_0x2ddca9(0x1ef)](this,_0x3cca2a),this[_0x2ddca9(0x4d4)](_0x3cca2a);},Window_ShopCommand['prototype'][_0x292660(0x4d4)]=function(_0x2233a3){const _0x41ba88=_0x292660,_0x408d72=new Rectangle(0x0,0x0,_0x2233a3[_0x41ba88(0x294)],_0x2233a3[_0x41ba88(0x12e)]);this[_0x41ba88(0x124)]=new Window_Base(_0x408d72),this[_0x41ba88(0x124)][_0x41ba88(0x417)]=0x0,this[_0x41ba88(0x4e2)](this[_0x41ba88(0x124)]),this[_0x41ba88(0x1e2)]();},Window_ShopCommand['prototype'][_0x292660(0x3f1)]=function(){const _0x1f3a98=_0x292660;Window_HorzCommand[_0x1f3a98(0x3c3)][_0x1f3a98(0x3f1)][_0x1f3a98(0x1ef)](this);if(this[_0x1f3a98(0x124)])this[_0x1f3a98(0x1e2)]();},Window_ShopCommand['prototype']['updateCommandNameWindow']=function(){const _0x3c58c2=_0x292660,_0x5f07a0=this[_0x3c58c2(0x124)];_0x5f07a0[_0x3c58c2(0x3cc)][_0x3c58c2(0x3a7)]();const _0xe7d149=this[_0x3c58c2(0x1b4)](this[_0x3c58c2(0x267)]());if(_0xe7d149===_0x3c58c2(0x194)){const _0x3e85d3=this['itemLineRect'](this[_0x3c58c2(0x267)]());let _0xc6b39=this[_0x3c58c2(0xae)](this[_0x3c58c2(0x267)]());_0xc6b39=_0xc6b39[_0x3c58c2(0x32a)](/\\I\[(\d+)\]/gi,''),_0x5f07a0[_0x3c58c2(0x204)](),this[_0x3c58c2(0x146)](_0xc6b39,_0x3e85d3),this[_0x3c58c2(0x4e4)](_0xc6b39,_0x3e85d3),this[_0x3c58c2(0x243)](_0xc6b39,_0x3e85d3);}},Window_ShopCommand[_0x292660(0x3c3)][_0x292660(0x146)]=function(_0x5bc177,_0x503dd4){},Window_ShopCommand['prototype'][_0x292660(0x4e4)]=function(_0x328eba,_0x447c52){const _0x1b7968=_0x292660,_0x16188d=this[_0x1b7968(0x124)];_0x16188d[_0x1b7968(0x4f6)](_0x328eba,0x0,_0x447c52['y'],_0x16188d['innerWidth'],'center');},Window_ShopCommand[_0x292660(0x3c3)][_0x292660(0x243)]=function(_0x1fe802,_0x32bce5){const _0x2d6ea9=_0x292660,_0x51101d=this[_0x2d6ea9(0x124)],_0x5859fe=$gameSystem[_0x2d6ea9(0x39e)](),_0xf0c1ec=_0x32bce5['x']+Math[_0x2d6ea9(0x4d8)](_0x32bce5[_0x2d6ea9(0x294)]/0x2)+_0x5859fe;_0x51101d['x']=_0x51101d[_0x2d6ea9(0x294)]/-0x2+_0xf0c1ec,_0x51101d['y']=Math[_0x2d6ea9(0x4d8)](_0x32bce5['height']/0x2);},Window_ShopCommand['prototype']['maxCols']=function(){const _0x6b2308=_0x292660;return this['_list']?this[_0x6b2308(0x3ee)][_0x6b2308(0x205)]:0x3;},Window_ShopCommand['prototype']['hideDisabledCommands']=function(){const _0xafa9ae=_0x292660;return VisuMZ[_0xafa9ae(0x448)]['Settings']['ShopScene'][_0xafa9ae(0x4b7)];},Window_ShopCommand[_0x292660(0x3c3)][_0x292660(0x48d)]=function(){const _0x121a75=_0x292660;this['addBuyCommand'](),this['addSellCommand'](),this[_0x121a75(0x3bd)]();},Window_ShopCommand[_0x292660(0x3c3)][_0x292660(0x4e9)]=function(){const _0x3fba63=_0x292660;Window_HorzCommand[_0x3fba63(0x3c3)][_0x3fba63(0x4e9)][_0x3fba63(0x1ef)](this),this['refreshCursor']();},Window_ShopCommand[_0x292660(0x3c3)][_0x292660(0x36f)]=function(){const _0x1967bc=_0x292660,_0x344d00=this[_0x1967bc(0x372)](),_0x41d952=VisuMZ[_0x1967bc(0x448)]['Settings'][_0x1967bc(0x25a)]['CmdIconBuy'],_0x1415f6=_0x344d00===_0x1967bc(0x19d)?TextManager[_0x1967bc(0x125)]:_0x1967bc(0x181)['format'](_0x41d952,TextManager[_0x1967bc(0x125)]),_0x1a53dc=this[_0x1967bc(0xb1)]();if(this[_0x1967bc(0x2fa)]()&&!_0x1a53dc)return;this[_0x1967bc(0x4ee)](_0x1415f6,_0x1967bc(0x125),_0x1a53dc);},Window_ShopCommand[_0x292660(0x3c3)][_0x292660(0xb1)]=function(){const _0x4186e0=_0x292660;if(SceneManager[_0x4186e0(0x4d6)][_0x4186e0(0x20e)]===Scene_Shop){if(_0x4186e0(0x4c3)===_0x4186e0(0x48b)){function _0x208f36(){const _0x1845eb=_0x4186e0;this['isUseModernControls']()?this['onTouchSelectModern'](!![]):_0x13fdf9['prototype'][_0x1845eb(0x3f8)][_0x1845eb(0x1ef)](this,_0x20c206);}}else return SceneManager[_0x4186e0(0x4d6)][_0x4186e0(0x3e5)]>0x0;}else return!![];},Window_ShopCommand[_0x292660(0x3c3)]['addSellCommand']=function(){const _0x34f93f=_0x292660,_0x16666d=this['commandStyle'](),_0x5c91f2=VisuMZ[_0x34f93f(0x448)][_0x34f93f(0x465)][_0x34f93f(0x25a)]['CmdIconSell'],_0x540374=_0x16666d==='text'?TextManager[_0x34f93f(0x4c6)]:_0x34f93f(0x181)['format'](_0x5c91f2,TextManager[_0x34f93f(0x4c6)]),_0x1032f9=this[_0x34f93f(0xaa)]();if(this[_0x34f93f(0x2fa)]()&&!_0x1032f9)return;this[_0x34f93f(0x4ee)](_0x540374,_0x34f93f(0x4c6),_0x1032f9);},Window_ShopCommand[_0x292660(0x3c3)][_0x292660(0xaa)]=function(){const _0x4adc35=_0x292660;return!this[_0x4adc35(0x356)];},Window_ShopCommand[_0x292660(0x3c3)][_0x292660(0x3bd)]=function(){const _0x5bc377=_0x292660,_0xe7700d=this[_0x5bc377(0x372)](),_0xedb3b4=VisuMZ[_0x5bc377(0x448)][_0x5bc377(0x465)][_0x5bc377(0x25a)]['CmdIconCancel'],_0xef2eef=VisuMZ['ItemsEquipsCore'][_0x5bc377(0x465)][_0x5bc377(0x25a)][_0x5bc377(0x4cf)],_0x1efa44=_0xe7700d===_0x5bc377(0x19d)?_0xef2eef:'\x5cI[%1]%2'['format'](_0xedb3b4,_0xef2eef);this[_0x5bc377(0x4ee)](_0x1efa44,'cancel');},Window_ShopCommand[_0x292660(0x3c3)][_0x292660(0x4bc)]=function(){const _0x1c14db=_0x292660;return VisuMZ[_0x1c14db(0x448)][_0x1c14db(0x465)][_0x1c14db(0x25a)][_0x1c14db(0x10f)];},Window_ShopCommand[_0x292660(0x3c3)][_0x292660(0x337)]=function(_0x4f6eb2){const _0x33a0ca=_0x292660,_0x47472f=this[_0x33a0ca(0x1b4)](_0x4f6eb2);if(_0x47472f===_0x33a0ca(0x306)){if(_0x33a0ca(0x45f)==='jwYLE'){function _0x1fa4b0(){const _0x4a0b58=_0x33a0ca;return _0x484406[_0x4a0b58(0x448)][_0x4a0b58(0x21b)]['call'](this);}}else this[_0x33a0ca(0x2d9)](_0x4f6eb2);}else{if(_0x47472f==='icon'){if('VbWtL'===_0x33a0ca(0x22a))this['drawItemStyleIcon'](_0x4f6eb2);else{function _0x3362ae(){const _0x5c6255=_0x33a0ca;this[_0x5c6255(0x3e5)]=0x0;for(const _0x35d87c of this['_goods']){this[_0x5c6255(0x132)](_0x35d87c)?this[_0x5c6255(0x3e5)]++:_0x35d87c[0x0]=-0x1;}}}}else Window_HorzCommand[_0x33a0ca(0x3c3)][_0x33a0ca(0x337)]['call'](this,_0x4f6eb2);}},Window_ShopCommand[_0x292660(0x3c3)][_0x292660(0x372)]=function(){const _0x954fd7=_0x292660;return VisuMZ[_0x954fd7(0x448)]['Settings']['ShopScene']['CmdStyle'];},Window_ShopCommand['prototype'][_0x292660(0x1b4)]=function(_0x498b35){const _0x305782=_0x292660;if(_0x498b35<0x0)return _0x305782(0x19d);const _0xdbbd9b=this[_0x305782(0x372)]();if(_0xdbbd9b!==_0x305782(0x251)){if(_0x305782(0x334)===_0x305782(0x334))return _0xdbbd9b;else{function _0x15f3ed(){const _0x41ab4a=_0x305782;_0x1caf4b=_0x41ab4a(0x181)['format'](_0x3af58b,_0x2dbab0);}}}else{if(this[_0x305782(0x32c)]()>0x0){const _0xf4b955=this[_0x305782(0xae)](_0x498b35);if(_0xf4b955[_0x305782(0x35a)](/\\I\[(\d+)\]/i)){if(_0x305782(0x10b)===_0x305782(0x16d)){function _0x2e8cf4(){const _0x36fe48=_0x305782;_0x128141===this[_0x36fe48(0x267)]()&&(this[_0x36fe48(0x325)]=!![]),this[_0x36fe48(0x413)](),this[_0x36fe48(0x108)](_0x3ab019);}}else{const _0x29b09d=this[_0x305782(0x31a)](_0x498b35),_0x35fdbe=this[_0x305782(0x28b)](_0xf4b955)[_0x305782(0x294)];return _0x35fdbe<=_0x29b09d['width']?_0x305782(0x306):_0x305782(0x194);}}}}return _0x305782(0x19d);},Window_ShopCommand['prototype'][_0x292660(0x2d9)]=function(_0x146695){const _0x56e480=_0x292660,_0xa5b04=this[_0x56e480(0x31a)](_0x146695),_0x5343d4=this[_0x56e480(0xae)](_0x146695),_0x2ab69f=this[_0x56e480(0x28b)](_0x5343d4)[_0x56e480(0x294)];this[_0x56e480(0x202)](this[_0x56e480(0x114)](_0x146695));const _0x3b35d2=this[_0x56e480(0x4bc)]();if(_0x3b35d2===_0x56e480(0x2b3))this['drawTextEx'](_0x5343d4,_0xa5b04['x']+_0xa5b04[_0x56e480(0x294)]-_0x2ab69f,_0xa5b04['y'],_0x2ab69f);else{if(_0x3b35d2==='center'){const _0x35ba0d=_0xa5b04['x']+Math[_0x56e480(0x4d8)]((_0xa5b04[_0x56e480(0x294)]-_0x2ab69f)/0x2);this['drawTextEx'](_0x5343d4,_0x35ba0d,_0xa5b04['y'],_0x2ab69f);}else this[_0x56e480(0x483)](_0x5343d4,_0xa5b04['x'],_0xa5b04['y'],_0x2ab69f);}},Window_ShopCommand[_0x292660(0x3c3)][_0x292660(0x39f)]=function(_0x271844){const _0x422b08=_0x292660;this[_0x422b08(0xae)](_0x271844)[_0x422b08(0x35a)](/\\I\[(\d+)\]/i);const _0x5a253c=Number(RegExp['$1'])||0x0,_0x444241=this['itemLineRect'](_0x271844),_0x45d80a=_0x444241['x']+Math['floor']((_0x444241['width']-ImageManager[_0x422b08(0x45e)])/0x2),_0x4ceec3=_0x444241['y']+(_0x444241[_0x422b08(0x12e)]-ImageManager[_0x422b08(0x281)])/0x2;this[_0x422b08(0x2ed)](_0x5a253c,_0x45d80a,_0x4ceec3);},VisuMZ[_0x292660(0x448)]['Window_ShopBuy_refresh']=Window_ShopBuy[_0x292660(0x3c3)][_0x292660(0x4e9)],Window_ShopBuy[_0x292660(0x3c3)][_0x292660(0x4e9)]=function(){const _0x121640=_0x292660;this[_0x121640(0xe2)](),VisuMZ[_0x121640(0x448)][_0x121640(0x1d4)][_0x121640(0x1ef)](this);},Window_ShopBuy[_0x292660(0x3c3)]['updateMoneyAmount']=function(){const _0x38d810=_0x292660;SceneManager[_0x38d810(0x4d6)][_0x38d810(0x20e)]===Scene_Shop&&(this[_0x38d810(0x159)]=SceneManager['_scene'][_0x38d810(0x2c3)]());},VisuMZ[_0x292660(0x448)][_0x292660(0x3ec)]=Window_ShopBuy['prototype'][_0x292660(0xed)],Window_ShopBuy[_0x292660(0x3c3)][_0x292660(0xed)]=function(_0x48df2f){const _0x4b45cd=_0x292660;if(!_0x48df2f)return 0x0;const _0x50af0f=VisuMZ[_0x4b45cd(0x448)][_0x4b45cd(0x3ec)][_0x4b45cd(0x1ef)](this,_0x48df2f);return this[_0x4b45cd(0x2ea)](_0x48df2f,_0x50af0f);},Window_ShopBuy['prototype'][_0x292660(0x2ea)]=function(_0x351964,_0x41ed4b){const _0xd7a4f4=_0x292660,_0x44d235=_0x351964[_0xd7a4f4(0x445)];if(_0x44d235[_0xd7a4f4(0x35a)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){if('EzuAs'===_0xd7a4f4(0xb9)){function _0x38d5c5(){const _0x4cab5f=_0xd7a4f4;if(this[_0x4cab5f(0xf3)](_0x2c5092))this[_0x4cab5f(0x1f5)](_0x31c961,null);}}else{const _0x31ca68=String(RegExp['$1']);try{eval(_0x31ca68);}catch(_0x30d037){if(_0xd7a4f4(0x11d)===_0xd7a4f4(0x11d)){if($gameTemp[_0xd7a4f4(0x31c)]())console[_0xd7a4f4(0x322)](_0x30d037);}else{function _0x5a7b11(){this['postCreateSlotWindowItemsEquipsCore']();}}}}}_0x41ed4b=VisuMZ['ItemsEquipsCore'][_0xd7a4f4(0x465)][_0xd7a4f4(0x25a)][_0xd7a4f4(0x13d)][_0xd7a4f4(0x1ef)](this,_0x351964,_0x41ed4b);if(isNaN(_0x41ed4b))_0x41ed4b=0x0;return Math['floor'](_0x41ed4b);},Window_ShopBuy['prototype'][_0x292660(0x337)]=function(_0xb25262){const _0x4c2b7e=_0x292660;this[_0x4c2b7e(0x204)]();const _0x460cad=this[_0x4c2b7e(0x310)](_0xb25262),_0x463e41=this[_0x4c2b7e(0x31a)](_0xb25262),_0x3d1bca=_0x463e41[_0x4c2b7e(0x294)];this['changePaintOpacity'](this[_0x4c2b7e(0x47e)](_0x460cad)),this[_0x4c2b7e(0x365)](_0x460cad,_0x463e41['x'],_0x463e41['y'],_0x3d1bca),this[_0x4c2b7e(0x1d6)](_0x460cad,_0x463e41),this['changePaintOpacity'](!![]);},Window_ShopBuy[_0x292660(0x3c3)][_0x292660(0x1d6)]=function(_0x4f11fd,_0x26f1fd){const _0x2eb2ff=_0x292660,_0x499327=this[_0x2eb2ff(0xed)](_0x4f11fd);this['drawCurrencyValue'](_0x499327,TextManager[_0x2eb2ff(0x35d)],_0x26f1fd['x'],_0x26f1fd['y'],_0x26f1fd['width']);},Window_ShopSell[_0x292660(0x3c3)][_0x292660(0x35e)]=function(){const _0x5793d0=_0x292660;return SceneManager[_0x5793d0(0x4d6)]['isUseItemsEquipsCoreUpdatedLayout']()?0x1:0x2;},VisuMZ[_0x292660(0x448)][_0x292660(0x360)]=Window_ShopSell[_0x292660(0x3c3)][_0x292660(0x47e)],Window_ShopSell[_0x292660(0x3c3)][_0x292660(0x47e)]=function(_0x1f6b54){const _0xa2b0a0=_0x292660;if(!_0x1f6b54)return![];const _0x32ab69=_0x1f6b54['note'];if(_0x32ab69[_0xa2b0a0(0x35a)](/<CANNOT SELL>/i))return![];if(_0x32ab69[_0xa2b0a0(0x35a)](/<CAN SELL>/i))return!![];if(_0x32ab69[_0xa2b0a0(0x35a)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xf1643d=JSON[_0xa2b0a0(0x11c)]('['+RegExp['$1'][_0xa2b0a0(0x35a)](/\d+/g)+']');for(const _0x552344 of _0xf1643d){if(_0xa2b0a0(0x207)!==_0xa2b0a0(0x4d0)){if(!$gameSwitches[_0xa2b0a0(0x188)](_0x552344))return![];}else{function _0x5b5c30(){const _0x1ef185=_0xa2b0a0;this[_0x1ef185(0x3b4)](0x0,0x0);}}}}if(_0x32ab69[_0xa2b0a0(0x35a)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x53d228=JSON['parse']('['+RegExp['$1'][_0xa2b0a0(0x35a)](/\d+/g)+']');for(const _0x155499 of _0x53d228){if('qwdkm'==='mpqJt'){function _0x260817(){const _0x487567=_0xa2b0a0;return _0xee024f[_0x487567(0x41a)]('pageup',_0x487567(0x450));}}else{if(!$gameSwitches['value'](_0x155499))return![];}}}if(_0x32ab69[_0xa2b0a0(0x35a)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xa2b0a0(0x245)===_0xa2b0a0(0x4b5)){function _0xf5b721(){const _0x1d1102=_0xa2b0a0,_0x392055=this[_0x1d1102(0x3f9)]()[_0x1d1102(0x205)];for(let _0x4b5935=0x0;_0x4b5935<_0x392055;_0x4b5935++){if(this[_0x1d1102(0x3f5)](_0x4b5935))this[_0x1d1102(0x1f5)](_0x4b5935,null);}for(let _0x12a2a7=0x0;_0x12a2a7<_0x392055;_0x12a2a7++){if(this[_0x1d1102(0x3f5)](_0x12a2a7))this[_0x1d1102(0x1f5)](_0x12a2a7,this[_0x1d1102(0x141)](_0x12a2a7));}}}else{const _0x1a3076=JSON[_0xa2b0a0(0x11c)]('['+RegExp['$1'][_0xa2b0a0(0x35a)](/\d+/g)+']');for(const _0x3293c4 of _0x1a3076){if(_0xa2b0a0(0x192)===_0xa2b0a0(0x4a9)){function _0x451f22(){const _0x3d79b0=_0xa2b0a0;this[_0x3d79b0(0x2a4)]();}}else{if($gameSwitches['value'](_0x3293c4))return![];}}}}return VisuMZ['ItemsEquipsCore'][_0xa2b0a0(0x360)][_0xa2b0a0(0x1ef)](this,_0x1f6b54);},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x434)]=function(){return![];},Window_ShopStatus['prototype'][_0x292660(0x335)]=function(){const _0x2548fe=_0x292660;Window_StatusBase[_0x2548fe(0x3c3)][_0x2548fe(0x335)][_0x2548fe(0x1ef)](this);for(const _0x517a5f of $gameParty[_0x2548fe(0x422)]()){ImageManager['loadCharacter'](_0x517a5f[_0x2548fe(0xb0)]());}},Window_ShopStatus['prototype']['translucentOpacity']=function(){const _0x174040=_0x292660;return VisuMZ[_0x174040(0x448)][_0x174040(0x465)]['StatusWindow'][_0x174040(0x4fc)];},Window_ShopStatus[_0x292660(0x3c3)]['refresh']=function(){const _0x44cdc1=_0x292660;this['contents'][_0x44cdc1(0x3a7)](),this[_0x44cdc1(0x2d4)][_0x44cdc1(0x3a7)](),this[_0x44cdc1(0x237)]&&(this[_0x44cdc1(0x204)](),this[_0x44cdc1(0x202)](!![]),this[_0x44cdc1(0x282)](),this['isEquipItem']()?this['drawEquipData']():this['drawItemData'](),this[_0x44cdc1(0x399)]());},Window_ShopStatus['prototype'][_0x292660(0x3ce)]=function(_0x56b164,_0x10a8a6){const _0x35dda6=_0x292660;if(!this['isEquipItem']()&&!DataManager[_0x35dda6(0x292)](this[_0x35dda6(0x237)]))return;const _0x4ee4aa=this[_0x35dda6(0x143)]-this[_0x35dda6(0x2f2)]()-_0x56b164,_0xde7165=this[_0x35dda6(0xd5)](_0x35dda6(0x34e));this[_0x35dda6(0x162)](ColorManager[_0x35dda6(0x2c9)]()),this[_0x35dda6(0x4f6)](TextManager[_0x35dda6(0x117)],_0x56b164+this[_0x35dda6(0x2f2)](),_0x10a8a6,_0x4ee4aa-_0xde7165),this['resetTextColor'](),this[_0x35dda6(0x1f2)](this[_0x35dda6(0x237)],_0x56b164,_0x10a8a6,_0x4ee4aa);},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x138)]=function(_0x3ec0b1,_0x2086b5,_0x4244f1,_0x21bc9d,_0x57b947){const _0x59ae10=_0x292660;if(VisuMZ[_0x59ae10(0x448)][_0x59ae10(0x465)][_0x59ae10(0x126)][_0x59ae10(0x2ba)]===![])return;_0x57b947=Math['max'](_0x57b947||0x1,0x1);while(_0x57b947--){_0x21bc9d=_0x21bc9d||this[_0x59ae10(0x1a9)](),this['contentsBack']['paintOpacity']=0xa0;const _0x2e2d07=ColorManager[_0x59ae10(0x3ac)]();this[_0x59ae10(0x2d4)]['fillRect'](_0x3ec0b1+0x1,_0x2086b5+0x1,_0x4244f1-0x2,_0x21bc9d-0x2,_0x2e2d07),this[_0x59ae10(0x2d4)][_0x59ae10(0x272)]=0xff;}},ColorManager['getItemsEquipsCoreBackColor1']=function(){const _0x173eb6=_0x292660,_0x13a2ea=VisuMZ[_0x173eb6(0x448)][_0x173eb6(0x465)][_0x173eb6(0x126)];let _0x4178c8=_0x13a2ea[_0x173eb6(0xa1)]!==undefined?_0x13a2ea[_0x173eb6(0xa1)]:0x13;return ColorManager[_0x173eb6(0x174)](_0x4178c8);},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x157)]=function(){const _0x1b8820=_0x292660;if(VisuMZ[_0x1b8820(0x448)]['Settings'][_0x1b8820(0x126)][_0x1b8820(0x47a)]){VisuMZ['ItemsEquipsCore'][_0x1b8820(0x465)][_0x1b8820(0x126)][_0x1b8820(0x47a)]['call'](this);return;}const _0xa1188a=this[_0x1b8820(0x1a9)](),_0x242cec=this['gaugeLineHeight']()+0x8;let _0x4ca9ea=0x0,_0x412b48=0x0,_0x550861=this[_0x1b8820(0x143)],_0x1b2eb1=this[_0x1b8820(0x1eb)],_0x345bfe=Math['floor'](_0x550861/0x2),_0xe87e7c=_0x4ca9ea+_0x550861-_0x345bfe;this['drawItemName'](this['_item'],_0x4ca9ea+this[_0x1b8820(0x2f2)](),_0x412b48,_0x550861-this[_0x1b8820(0x2f2)]()*0x2),this['drawItemDarkRect'](_0x4ca9ea,_0x412b48,_0x550861),_0x412b48+=_0xa1188a;if(this[_0x1b8820(0x4c4)](_0x4ca9ea,_0x412b48,_0x345bfe))_0x412b48+=0x0;if(this[_0x1b8820(0x29c)](_0xe87e7c,_0x412b48,_0x345bfe))_0x412b48+=_0xa1188a;const _0x2bf333=this[_0x1b8820(0xc6)](),_0x14d76f=_0x412b48;_0x412b48=_0x1b2eb1-_0x2bf333[_0x1b8820(0x205)]*_0x242cec-0x4;let _0x26d15d=_0x4ca9ea,_0x409bd0=0x0,_0x24fa1a=_0x412b48;for(const _0x4fc874 of _0x2bf333){_0x409bd0=Math[_0x1b8820(0x2d3)](this['drawParamName'](_0x4fc874,_0x4ca9ea+0x4,_0x412b48+0x4,_0x550861),_0x409bd0),_0x412b48+=_0x242cec;}const _0x5b5b7f=$gameParty[_0x1b8820(0x4bd)](),_0x39d075=Math[_0x1b8820(0x4d8)]((_0x550861-_0x409bd0)/_0x5b5b7f);_0x409bd0=_0x550861-_0x39d075*_0x5b5b7f;for(const _0x33e894 of $gameParty[_0x1b8820(0x20b)]()){const _0x5577b7=$gameParty[_0x1b8820(0x20b)]()['indexOf'](_0x33e894),_0x59c430=_0x26d15d+_0x409bd0+_0x5577b7*_0x39d075;this['changePaintOpacity'](_0x33e894[_0x1b8820(0x111)](this[_0x1b8820(0x237)])),this['drawActorCharacter'](_0x33e894,_0x59c430+_0x39d075/0x2,_0x24fa1a);let _0x15fb06=_0x24fa1a;for(const _0x1fe82a of _0x2bf333){const _0x2c0241=_0x15fb06-(_0xa1188a-_0x242cec)/0x2;this[_0x1b8820(0x3e7)](_0x33e894,_0x1fe82a,_0x59c430,_0x2c0241,_0x39d075),_0x15fb06+=_0x242cec;}}this['drawItemDarkRect'](_0x26d15d,_0x14d76f,_0x409bd0,_0x24fa1a-_0x14d76f);for(let _0x5581f4=0x0;_0x5581f4<_0x5b5b7f;_0x5581f4++){if(_0x1b8820(0x4a4)!==_0x1b8820(0x4b2)){const _0x1dd810=_0x26d15d+_0x409bd0+_0x5581f4*_0x39d075;this[_0x1b8820(0x138)](_0x1dd810,_0x14d76f,_0x39d075,_0x24fa1a-_0x14d76f);}else{function _0x2c2108(){const _0x1dd7d8=_0x1b8820;return _0x22deb7[_0x1dd7d8(0x448)][_0x1dd7d8(0x2a6)][_0x1dd7d8(0x1ef)](this);}}}for(const _0x5b08c7 of _0x2bf333){this[_0x1b8820(0x138)](_0x26d15d,_0x24fa1a,_0x409bd0,_0x242cec);for(let _0x30595c=0x0;_0x30595c<_0x5b5b7f;_0x30595c++){if(_0x1b8820(0x3f2)===_0x1b8820(0x3f2)){const _0x468372=_0x26d15d+_0x409bd0+_0x30595c*_0x39d075;this[_0x1b8820(0x138)](_0x468372,_0x24fa1a,_0x39d075,_0x242cec);}else{function _0x3ea7fe(){const _0x4aa739=_0x1b8820;if(this[_0x4aa739(0xf7)]())return _0x4b0e85['ItemsEquipsCore'][_0x4aa739(0x465)][_0x4aa739(0x34a)][_0x4aa739(0x15e)];else{if(this[_0x4aa739(0x1ca)]&&this[_0x4aa739(0x1ca)][_0x4aa739(0x2e6)])return _0x3ad85b[_0x4aa739(0x448)][_0x4aa739(0x465)]['ShopScene'][_0x4aa739(0x494)];}return _0x2d17ee[_0x4aa739(0x3c3)][_0x4aa739(0x2c8)][_0x4aa739(0x1ef)](this);}}}_0x24fa1a+=_0x242cec;}},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x4c4)]=function(_0x57380b,_0x5224eb,_0x56c4e0){const _0x14549b=_0x292660;if(!this['isEquipItem']())return![];const _0x2a8057=$dataSystem[_0x14549b(0x1e5)][this[_0x14549b(0x237)][_0x14549b(0x2b6)]];return this[_0x14549b(0x1c5)](_0x2a8057,_0x57380b,_0x5224eb,_0x56c4e0,!![]),this['drawItemDarkRect'](_0x57380b,_0x5224eb,_0x56c4e0),this[_0x14549b(0x204)](),!![];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x2e5)]=function(){const _0x4354b6=_0x292660,_0x477952=VisuMZ[_0x4354b6(0x448)]['Settings'][_0x4354b6(0x34a)]['ItemQuantityFmt'];return _0x477952[_0x4354b6(0x169)]($gameParty[_0x4354b6(0x1c4)](this['_item']));},Window_ShopStatus[_0x292660(0x3c3)]['actorParams']=function(){const _0x2fd587=_0x292660;if(Imported[_0x2fd587(0x2de)])return VisuMZ[_0x2fd587(0x37a)]['Settings']['Param'][_0x2fd587(0x4a7)];else{if(_0x2fd587(0x389)===_0x2fd587(0x45b)){function _0x20ff87(){const _0x2cafc2=_0x2fd587;return this[_0x2cafc2(0x4ed)]()?this[_0x2cafc2(0x1b1)]():_0x47c6c7[_0x2cafc2(0x3c3)][_0x2cafc2(0xf0)][_0x2cafc2(0x1ef)](this);}}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x2b9)]=function(){const _0x16748f=_0x292660;return VisuMZ[_0x16748f(0x448)][_0x16748f(0x465)][_0x16748f(0x126)]['ParamChangeFontSize'];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x3c2)]=function(_0x1b7afd,_0x4ca94c,_0x51a827,_0x1dd87c){const _0x998d6e=_0x292660;this[_0x998d6e(0x204)](),this[_0x998d6e(0x3cc)][_0x998d6e(0x269)]=this[_0x998d6e(0x2b9)]();let _0x491ca8=this[_0x998d6e(0xd5)](TextManager[_0x998d6e(0x3fd)](_0x1b7afd))+0x4+_0x4ca94c;if(Imported[_0x998d6e(0x2de)]){this[_0x998d6e(0x339)](_0x4ca94c,_0x51a827,_0x1dd87c,_0x1b7afd,!![]);if(VisuMZ[_0x998d6e(0x37a)][_0x998d6e(0x465)][_0x998d6e(0x350)]['DrawIcons']){if(_0x998d6e(0x2e9)!==_0x998d6e(0x2e9)){function _0x423358(){const _0x57df00=_0x998d6e;_0x4d94aa=_0x1c434a(_0x47162a['$1'])[_0x57df00(0x313)]()[_0x57df00(0x508)]();}}else _0x491ca8+=ImageManager[_0x998d6e(0x45e)]+0x4;}}else this[_0x998d6e(0x162)](ColorManager[_0x998d6e(0x2c9)]()),this['drawText'](TextManager['param'](_0x1b7afd),_0x4ca94c,_0x51a827,_0x1dd87c);return this[_0x998d6e(0x204)](),_0x491ca8;},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x3e7)]=function(_0x32f334,_0x1c476f,_0x1cc1c4,_0xb51ce,_0x43bd1e){const _0x44a33d=_0x292660;_0x1cc1c4+=this['itemPadding'](),_0x43bd1e-=this['itemPadding']()*0x2;const _0x5c8862=VisuMZ[_0x44a33d(0x448)][_0x44a33d(0x465)][_0x44a33d(0x126)];this[_0x44a33d(0x3cc)]['fontSize']=_0x5c8862['ParamChangeFontSize'],this[_0x44a33d(0x202)](_0x32f334[_0x44a33d(0x111)](this['_item']));if(_0x32f334['isEquipped'](this[_0x44a33d(0x237)])){if(_0x44a33d(0x186)===_0x44a33d(0x186)){const _0x33c0ad=_0x5c8862[_0x44a33d(0x2a7)];this[_0x44a33d(0x4f6)](_0x33c0ad,_0x1cc1c4,_0xb51ce,_0x43bd1e,_0x44a33d(0x31b));}else{function _0x11b056(){const _0x4a60d6=_0x2c6ac6(_0x5e2380['$1'])||0x1;if(_0x4d1ff4>=_0x4a60d6)return!![];}}}else{if(_0x32f334['canEquip'](this[_0x44a33d(0x237)])){const _0xd6b1b9=JsonEx['makeDeepCopy'](_0x32f334);_0xd6b1b9[_0x44a33d(0x4e7)]=!![];const _0x3c2f12=_0xd6b1b9['equipSlots']()[_0x44a33d(0x291)](this[_0x44a33d(0x237)][_0x44a33d(0x2b6)]);if(_0x3c2f12>=0x0)_0xd6b1b9[_0x44a33d(0x373)](_0x3c2f12,this[_0x44a33d(0x237)]);let _0x3a7dc1=0x0,_0x55039e=0x0,_0x233188=0x0;Imported[_0x44a33d(0x2de)]?(_0x3a7dc1=_0xd6b1b9[_0x44a33d(0x34d)](_0x1c476f),_0x55039e=_0x3a7dc1-_0x32f334[_0x44a33d(0x34d)](_0x1c476f),this['changeTextColor'](ColorManager['paramchangeTextColor'](_0x55039e)),_0x233188=(_0x55039e>=0x0?'+':'')+VisuMZ[_0x44a33d(0x140)](_0x55039e,0x0,_0x1c476f)):(_0x3a7dc1=_0xd6b1b9['param'](_0x1c476f),_0x55039e=_0x3a7dc1-_0x32f334['param'](_0x1c476f),this[_0x44a33d(0x162)](ColorManager[_0x44a33d(0x380)](_0x55039e)),_0x233188=(_0x55039e>=0x0?'+':'')+_0x55039e);if(_0x233188==='+0')_0x233188=_0x5c8862[_0x44a33d(0x2bb)];this[_0x44a33d(0x4f6)](_0x233188,_0x1cc1c4,_0xb51ce,_0x43bd1e,_0x44a33d(0x31b));}else{const _0x4a4848=_0x5c8862[_0x44a33d(0x326)];this[_0x44a33d(0x4f6)](_0x4a4848,_0x1cc1c4,_0xb51ce,_0x43bd1e,_0x44a33d(0x31b));}}this[_0x44a33d(0x204)](),this[_0x44a33d(0x202)](!![]);},Window_ShopStatus[_0x292660(0x3c3)]['drawItemData']=function(){const _0x7fd58b=_0x292660;VisuMZ[_0x7fd58b(0x448)][_0x7fd58b(0x465)]['StatusWindow']['DrawItemData'][_0x7fd58b(0x1ef)](this);},Window_ShopStatus['prototype']['prepareItemCustomData']=function(){const _0x2ff852=_0x292660;this[_0x2ff852(0x2fb)]={};if(!this[_0x2ff852(0x237)])return;const _0x2d11b1=this[_0x2ff852(0x237)][_0x2ff852(0x445)];if(_0x2d11b1['match'](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x57ab45=String(RegExp['$1'])[_0x2ff852(0x469)](/[\r\n]+/);for(const _0x48cd01 of _0x57ab45){if(_0x2ff852(0x1f3)==='YzvuP'){if(_0x48cd01[_0x2ff852(0x35a)](/(.*):[ ](.*)/i)){const _0x3eac26=String(RegExp['$1'])[_0x2ff852(0x1e6)]()[_0x2ff852(0x508)](),_0x18deac=String(RegExp['$2'])[_0x2ff852(0x508)]();this[_0x2ff852(0x2fb)][_0x3eac26]=_0x18deac;}}else{function _0x261f29(){const _0x4d762c=_0x2ff852,_0x2b2bf7=this[_0x4d762c(0x31a)](this[_0x4d762c(0x267)]());let _0x1690db=this['commandName'](this[_0x4d762c(0x267)]());_0x1690db=_0x1690db[_0x4d762c(0x32a)](/\\I\[(\d+)\]/gi,''),_0x34fd06[_0x4d762c(0x204)](),this['commandNameWindowDrawBackground'](_0x1690db,_0x2b2bf7),this[_0x4d762c(0x4e4)](_0x1690db,_0x2b2bf7),this[_0x4d762c(0x243)](_0x1690db,_0x2b2bf7);}}}}},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x23b)]=function(){const _0x5b706c=_0x292660;return Math[_0x5b706c(0x2d3)](0x1,$gameSystem[_0x5b706c(0xda)]()-0x4);},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x204)]=function(){const _0x2d85a7=_0x292660;Window_StatusBase[_0x2d85a7(0x3c3)]['resetFontSettings'][_0x2d85a7(0x1ef)](this),this['contents'][_0x2d85a7(0x269)]=this['_resetFontSize']||this[_0x2d85a7(0x3cc)][_0x2d85a7(0x269)],this[_0x2d85a7(0x3cc)]['textColor']=this[_0x2d85a7(0xb6)]||this[_0x2d85a7(0x3cc)][_0x2d85a7(0x3ea)];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x239)]=function(){const _0x19861b=_0x292660;return this[_0x19861b(0x3cc)]['fontSize']/$gameSystem[_0x19861b(0xda)]();},Window_ShopStatus[_0x292660(0x3c3)]['drawIcon']=function(_0x989ab8,_0x458c40,_0x5ba51b){const _0x57490e=_0x292660,_0x45ef9c=ImageManager[_0x57490e(0x4f4)](_0x57490e(0x4c9)),_0x518c10=ImageManager[_0x57490e(0x45e)],_0x45cea3=ImageManager[_0x57490e(0x281)],_0x195760=_0x989ab8%0x10*_0x518c10,_0x2bbabb=Math[_0x57490e(0x4d8)](_0x989ab8/0x10)*_0x45cea3,_0x3467fe=Math[_0x57490e(0x341)](_0x518c10*this['fontSizeRatio']()),_0x3e204b=Math[_0x57490e(0x341)](_0x45cea3*this[_0x57490e(0x239)]());this['contents'][_0x57490e(0x401)](_0x45ef9c,_0x195760,_0x2bbabb,_0x518c10,_0x45cea3,_0x458c40,_0x5ba51b,_0x3467fe,_0x3e204b);},Window_ShopStatus['prototype'][_0x292660(0x4fa)]=function(_0xbc79d4,_0x18ab7c){const _0x375081=_0x292660;if(_0x18ab7c[_0x375081(0x3aa)]){if(_0x375081(0x2dd)!==_0x375081(0x14a))this[_0x375081(0x2ed)](_0xbc79d4,_0x18ab7c['x'],_0x18ab7c['y']+0x2);else{function _0x17dd26(){const _0xfcc5fb=_0x375081;if(!_0xfc34d5[_0xfcc5fb(0x188)](_0xae8723))return![];}}}_0x18ab7c['x']+=Math[_0x375081(0x341)](ImageManager[_0x375081(0x45e)]*this[_0x375081(0x239)]());if(this[_0x375081(0x239)]()===0x1)_0x18ab7c['x']+=0x4;},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x1c5)]=function(_0x2f838e,_0x4e290c,_0x3d0c6e,_0x37db98,_0x177b93,_0x252ccb){const _0x3f29ec=_0x292660;_0x2f838e=_0x2f838e||'',_0x252ccb=_0x252ccb||'left',this[_0x3f29ec(0xd3)]=this[_0x3f29ec(0x23b)](),this[_0x3f29ec(0xb6)]=_0x177b93?ColorManager[_0x3f29ec(0x2c9)]():this[_0x3f29ec(0x3cc)][_0x3f29ec(0x3ea)],_0x4e290c+=this['itemPadding'](),_0x37db98-=this[_0x3f29ec(0x2f2)]()*0x2;const _0x8982b1=this[_0x3f29ec(0x28b)](_0x2f838e);if(_0x252ccb===_0x3f29ec(0x31b))_0x4e290c=_0x4e290c+Math['floor']((_0x37db98-_0x8982b1[_0x3f29ec(0x294)])/0x2);else{if(_0x252ccb==='right'){if(_0x3f29ec(0x367)==='ywSAz'){function _0x5b13bc(){const _0x55d006=_0x3f29ec;let _0x2c357e=0x0;const _0xe80449=this['equipSlots'](),_0x4257a0=this[_0x55d006(0x307)]();for(let _0x97e17e=0x0;_0x97e17e<_0xe80449['length'];_0x97e17e++){if(_0xe80449[_0x97e17e]===_0xc1c27a){_0x2c357e=_0x97e17e;if(!_0x4257a0[_0x97e17e])return _0x2c357e;}}return _0x2c357e;}}else _0x4e290c=_0x4e290c+_0x37db98-_0x8982b1[_0x3f29ec(0x294)];}}_0x3d0c6e+=(this[_0x3f29ec(0x1a9)]()-_0x8982b1['height'])/0x2,this[_0x3f29ec(0x483)](_0x2f838e,_0x4e290c,_0x3d0c6e,_0x37db98),this[_0x3f29ec(0xd3)]=undefined,this[_0x3f29ec(0xb6)]=undefined,this['resetFontSettings']();},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x28e)]=function(_0x7975ec,_0x5ba22b,_0x389d2b){const _0x1b6a3d=_0x292660;if(!DataManager[_0x1b6a3d(0x292)](this[_0x1b6a3d(0x237)]))return![];const _0x31258f=this[_0x1b6a3d(0xb4)]();this['drawItemKeyData'](_0x31258f,_0x7975ec,_0x5ba22b,_0x389d2b,!![]);const _0x5852c4=this['getItemConsumableText']();return this['drawItemKeyData'](_0x5852c4,_0x7975ec,_0x5ba22b,_0x389d2b,![],_0x1b6a3d(0x2b3)),this['drawItemDarkRect'](_0x7975ec,_0x5ba22b,_0x389d2b),this[_0x1b6a3d(0x204)](),!![];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0xb4)]=function(){const _0x444812=_0x292660;return VisuMZ[_0x444812(0x448)][_0x444812(0x465)][_0x444812(0x126)][_0x444812(0x4c7)];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x348)]=function(){const _0x4e1e5a=_0x292660,_0x2c9d66=_0x4e1e5a(0x387);if(this[_0x4e1e5a(0x2fb)][_0x2c9d66])return this['_customItemInfo'][_0x2c9d66];return this[_0x4e1e5a(0x49a)]()?VisuMZ[_0x4e1e5a(0x448)][_0x4e1e5a(0x465)][_0x4e1e5a(0x126)][_0x4e1e5a(0x1fe)]:VisuMZ[_0x4e1e5a(0x448)][_0x4e1e5a(0x465)]['StatusWindow'][_0x4e1e5a(0x45c)];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x49a)]=function(){const _0x38398c=_0x292660;if(VisuMZ['CoreEngine']&&VisuMZ[_0x38398c(0x37a)]['Settings'][_0x38398c(0x40b)]['KeyItemProtect']&&DataManager[_0x38398c(0xf1)](this['_item']))return![];else{if('ZOExU'!=='vpkvi')return this['_item'][_0x38398c(0x39d)];else{function _0x16412(){const _0x2fd19b=_0x38398c;_0xbae928['isRepeated']('right')&&this[_0x2fd19b(0x3db)](_0xf4336a['isTriggered'](_0x2fd19b(0x2b3))),_0x299e09['isRepeated'](_0x2fd19b(0xa6))&&this['cursorLeft'](_0x100d8d[_0x2fd19b(0x3cd)](_0x2fd19b(0xa6)));}}}},Window_ShopStatus[_0x292660(0x3c3)]['drawItemQuantity']=function(_0x5840b3,_0x230ff4,_0x5cd616){const _0x288044=_0x292660;if(!this[_0x288044(0xd0)]()&&!DataManager['isItem'](this[_0x288044(0x237)]))return![];if(DataManager[_0x288044(0xf1)](this[_0x288044(0x237)])&&!$dataSystem[_0x288044(0x43a)]){const _0x5e2f1e=TextManager['keyItem'];this['drawItemKeyData'](_0x5e2f1e,_0x5840b3,_0x230ff4,_0x5cd616,!![],_0x288044(0x31b));}else{const _0x436d1d=TextManager['possession'];this[_0x288044(0x1c5)](_0x436d1d,_0x5840b3,_0x230ff4,_0x5cd616,!![]);const _0x54de2=this[_0x288044(0x2e5)]();this['drawItemKeyData'](_0x54de2,_0x5840b3,_0x230ff4,_0x5cd616,![],_0x288044(0x2b3));}return this['drawItemDarkRect'](_0x5840b3,_0x230ff4,_0x5cd616),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x2e5)]=function(){const _0x2b4211=_0x292660,_0xa68f9c='QUANTITY';if(this[_0x2b4211(0x2fb)][_0xa68f9c])return this['_customItemInfo'][_0xa68f9c];const _0xc28ae5=VisuMZ[_0x2b4211(0x448)][_0x2b4211(0x465)][_0x2b4211(0x34a)][_0x2b4211(0x177)];return _0xc28ae5['format']($gameParty['numItems'](this[_0x2b4211(0x237)]));},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x206)]=function(_0x321e39,_0x1eee91,_0x7f3e45){const _0x280698=_0x292660,_0x1cc883=this[_0x280698(0x318)]();return this[_0x280698(0x1c5)](_0x1cc883,_0x321e39,_0x1eee91,_0x7f3e45,![],_0x280698(0x31b)),this['drawItemDarkRect'](_0x321e39,_0x1eee91,_0x7f3e45),this[_0x280698(0x204)](),!![];},Window_ShopStatus['prototype'][_0x292660(0x318)]=function(){const _0x1fa430=_0x292660,_0x563cf5=_0x1fa430(0x288);if(this['_customItemInfo'][_0x563cf5])return this['_customItemInfo'][_0x563cf5];const _0x5f0055=VisuMZ[_0x1fa430(0x448)][_0x1fa430(0x465)]['StatusWindow'],_0x1cd76c=_0x1fa430(0x358)[_0x1fa430(0x169)](this[_0x1fa430(0x237)][_0x1fa430(0x3fb)]);return _0x5f0055[_0x1cd76c];},Window_ShopStatus['prototype']['drawItemScope']=function(_0xd453ef,_0x42575a,_0x1bf5c1){const _0x30304e=_0x292660,_0xf88ca=this[_0x30304e(0xe4)]();return this[_0x30304e(0x1c5)](_0xf88ca,_0xd453ef,_0x42575a,_0x1bf5c1,![],_0x30304e(0x31b)),this[_0x30304e(0x138)](_0xd453ef,_0x42575a,_0x1bf5c1),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype']['getItemScopeText']=function(){const _0x4a9104=_0x292660,_0x545a3b='SCOPE';if(this['_customItemInfo'][_0x545a3b])return this[_0x4a9104(0x2fb)][_0x545a3b];const _0x5862c5=VisuMZ[_0x4a9104(0x448)][_0x4a9104(0x465)][_0x4a9104(0x126)];if(Imported[_0x4a9104(0x44f)]){const _0x502c52=this[_0x4a9104(0x237)][_0x4a9104(0x445)];if(_0x502c52[_0x4a9104(0x35a)](/<TARGET:[ ](.*)>/i)){const _0x5831d2=String(RegExp['$1']);if(_0x5831d2['match'](/(\d+) RANDOM ANY/i))return _0x5862c5[_0x4a9104(0x154)][_0x4a9104(0x169)](Number(RegExp['$1']));else{if(_0x5831d2[_0x4a9104(0x35a)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x5862c5[_0x4a9104(0x46a)][_0x4a9104(0x169)](Number(RegExp['$1']));else{if(_0x5831d2[_0x4a9104(0x35a)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x5862c5[_0x4a9104(0x363)][_0x4a9104(0x169)](Number(RegExp['$1']));else{if(_0x5831d2[_0x4a9104(0x35a)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i)){if(_0x4a9104(0x421)!==_0x4a9104(0x421)){function _0x23d57a(){const _0x2c7cb8=_0x4a9104,_0x237738=_0xc37d3['ItemsEquipsCore'][_0x2c7cb8(0x217)][_0x2c7cb8(0x1ef)](this);return this[_0x2c7cb8(0x4de)]()&&this[_0x2c7cb8(0x441)]()&&(_0x237738[_0x2c7cb8(0x294)]-=this['statusWidth']()),_0x237738;}}else return _0x5862c5[_0x4a9104(0xca)];}}}}}}const _0x1d0f13=_0x4a9104(0x351)[_0x4a9104(0x169)](this['_item']['scope']);return _0x5862c5[_0x1d0f13];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x409)]=function(_0x2025ec,_0xaa65b3,_0x5a697f){const _0x21f5f1=_0x292660,_0x2ce5e4=this[_0x21f5f1(0x390)]();this[_0x21f5f1(0x1c5)](_0x2ce5e4,_0x2025ec,_0xaa65b3,_0x5a697f,!![]);const _0x2649be=this['getItemSpeedText']();return this[_0x21f5f1(0x1c5)](_0x2649be,_0x2025ec,_0xaa65b3,_0x5a697f,![],'right'),this[_0x21f5f1(0x138)](_0x2025ec,_0xaa65b3,_0x5a697f),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x292660(0x3c3)]['getItemSpeedLabel']=function(){const _0x4d2fed=_0x292660;return VisuMZ['ItemsEquipsCore']['Settings'][_0x4d2fed(0x126)][_0x4d2fed(0x470)];},Window_ShopStatus['prototype']['getItemSpeedText']=function(){const _0x1341f5=_0x292660,_0x23cbda='SPEED';if(this[_0x1341f5(0x2fb)][_0x23cbda])return this['_customItemInfo'][_0x23cbda];const _0x33d7f3=this[_0x1341f5(0x237)][_0x1341f5(0x4fd)];if(_0x33d7f3>=0x7d0)return VisuMZ[_0x1341f5(0x448)]['Settings'][_0x1341f5(0x126)][_0x1341f5(0x4a5)];else{if(_0x33d7f3>=0x3e8){if(_0x1341f5(0x1c7)===_0x1341f5(0x386)){function _0x52aab4(){const _0x668380=_0x1341f5;_0x32d21c[_0x668380(0x448)]['Window_ItemList_drawItem'][_0x668380(0x1ef)](this,_0x403394),this[_0x668380(0x340)](_0x18789b);}}else return VisuMZ['ItemsEquipsCore'][_0x1341f5(0x465)]['StatusWindow'][_0x1341f5(0x168)];}else{if(_0x33d7f3>0x0){if('VAuVn'!=='TYpBs')return VisuMZ[_0x1341f5(0x448)][_0x1341f5(0x465)][_0x1341f5(0x126)]['Speed1'];else{function _0x292076(){const _0x18e8f2=_0x1341f5,_0x1d162f=this['_categoryWindow']['y']+this['_categoryWindow']['height'],_0xcce622=_0x162226[_0x18e8f2(0x164)]-this['statusWidth'](),_0x5cfa85=this[_0x18e8f2(0x368)]()-this[_0x18e8f2(0x4ce)][_0x18e8f2(0x12e)],_0x152430=this[_0x18e8f2(0x238)]()?_0x35148['boxWidth']-_0xcce622:0x0;return new _0x29ec1f(_0x152430,_0x1d162f,_0xcce622,_0x5cfa85);}}}else{if(_0x33d7f3===0x0)return VisuMZ['ItemsEquipsCore'][_0x1341f5(0x465)][_0x1341f5(0x126)][_0x1341f5(0x229)];else{if(_0x33d7f3>-0x3e8)return VisuMZ[_0x1341f5(0x448)][_0x1341f5(0x465)][_0x1341f5(0x126)][_0x1341f5(0x4a8)];else{if(_0x33d7f3>-0x7d0)return VisuMZ['ItemsEquipsCore'][_0x1341f5(0x465)][_0x1341f5(0x126)][_0x1341f5(0x13a)];else return _0x33d7f3<=-0x7d0?VisuMZ[_0x1341f5(0x448)]['Settings'][_0x1341f5(0x126)]['SpeedNeg2000']:_0x1341f5(0x431);}}}}}},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x500)]=function(_0x469374,_0x46e3db,_0x479228){const _0x563a87=_0x292660,_0x4a7f21=this[_0x563a87(0x32d)]();this['drawItemKeyData'](_0x4a7f21,_0x469374,_0x46e3db,_0x479228,!![]);const _0x20db27=this['getItemSuccessRateText']();return this['drawItemKeyData'](_0x20db27,_0x469374,_0x46e3db,_0x479228,![],_0x563a87(0x2b3)),this['drawItemDarkRect'](_0x469374,_0x46e3db,_0x479228),this[_0x563a87(0x204)](),!![];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x32d)]=function(){const _0x5879c9=_0x292660;return VisuMZ['ItemsEquipsCore'][_0x5879c9(0x465)][_0x5879c9(0x126)][_0x5879c9(0x49d)];},Window_ShopStatus['prototype'][_0x292660(0x36b)]=function(){const _0x5db19c=_0x292660,_0x5df185=_0x5db19c(0x25c);if(this[_0x5db19c(0x2fb)][_0x5df185])return this['_customItemInfo'][_0x5df185];if(Imported[_0x5db19c(0x44f)]){const _0x5a3e68=this['_item'][_0x5db19c(0x445)];if(_0x5a3e68[_0x5db19c(0x35a)](/<ALWAYS HIT>/i))return'100%';else{if(_0x5a3e68[_0x5db19c(0x35a)](/<ALWAYS HIT RATE: (\d+)([%％])>/i)){if(_0x5db19c(0x4f5)!=='QLJeu')return'%1%'['format'](Number(RegExp['$1']));else{function _0x58e23a(){const _0x5d30a3=_0x5db19c;this[_0x5d30a3(0x30c)][_0x5d30a3(0x4cd)](this[_0x5d30a3(0x175)]);}}}}}return _0x5db19c(0x139)[_0x5db19c(0x169)](this[_0x5db19c(0x237)][_0x5db19c(0x284)]);},Window_ShopStatus['prototype'][_0x292660(0x2a3)]=function(_0x3bb6b3,_0x9bed5d,_0x418ea2){const _0x5aa184=_0x292660,_0x36cd9a=this[_0x5aa184(0xe0)]();this[_0x5aa184(0x1c5)](_0x36cd9a,_0x3bb6b3,_0x9bed5d,_0x418ea2,!![]);const _0x202a38=this['getItemRepeatsText']();return this['drawItemKeyData'](_0x202a38,_0x3bb6b3,_0x9bed5d,_0x418ea2,![],_0x5aa184(0x2b3)),this[_0x5aa184(0x138)](_0x3bb6b3,_0x9bed5d,_0x418ea2),this[_0x5aa184(0x204)](),!![];},Window_ShopStatus['prototype'][_0x292660(0xe0)]=function(){const _0x42e6f4=_0x292660;return VisuMZ[_0x42e6f4(0x448)][_0x42e6f4(0x465)][_0x42e6f4(0x126)][_0x42e6f4(0x260)];},Window_ShopStatus['prototype'][_0x292660(0x42b)]=function(){const _0x5a75f6=_0x292660,_0x2a1532=_0x5a75f6(0x1bf);if(this[_0x5a75f6(0x2fb)][_0x2a1532])return this[_0x5a75f6(0x2fb)][_0x2a1532];const _0x56d7da=_0x5a75f6(0x48a);return _0x56d7da[_0x5a75f6(0x169)](this[_0x5a75f6(0x237)]['repeats']);},Window_ShopStatus['prototype'][_0x292660(0x1b7)]=function(_0x55240c,_0x3616eb,_0x320241){const _0x3ee365=_0x292660,_0x5e5a92=this[_0x3ee365(0x46d)]();this['drawItemKeyData'](_0x5e5a92,_0x55240c,_0x3616eb,_0x320241,!![]);const _0xc1f38e=this[_0x3ee365(0x116)]();return this[_0x3ee365(0x1c5)](_0xc1f38e,_0x55240c,_0x3616eb,_0x320241,![],_0x3ee365(0x2b3)),this[_0x3ee365(0x138)](_0x55240c,_0x3616eb,_0x320241),this[_0x3ee365(0x204)](),!![];},Window_ShopStatus['prototype'][_0x292660(0x46d)]=function(){const _0x548477=_0x292660;return VisuMZ[_0x548477(0x448)][_0x548477(0x465)][_0x548477(0x126)][_0x548477(0x213)];},Window_ShopStatus[_0x292660(0x3c3)]['getItemHitTypeText']=function(){const _0x411833=_0x292660,_0x20b6f5=_0x411833(0x485);if(this[_0x411833(0x2fb)][_0x20b6f5])return this['_customItemInfo'][_0x20b6f5];const _0x4984fe=VisuMZ[_0x411833(0x448)]['Settings'][_0x411833(0x126)],_0x52c4a0='HitType%1'[_0x411833(0x169)](this[_0x411833(0x237)][_0x411833(0x26f)]);return _0x4984fe[_0x52c4a0];},Window_ShopStatus['prototype'][_0x292660(0x2bf)]=function(_0x44ea61,_0x2dd44e,_0x17959f){const _0x606b71=_0x292660;if(this[_0x606b71(0x237)][_0x606b71(0x1ee)][_0x606b71(0x25b)]<=0x0)return _0x2dd44e;if(this['drawItemDamageElement'](_0x44ea61,_0x2dd44e,_0x17959f))_0x2dd44e+=this[_0x606b71(0x1a9)]();if(this[_0x606b71(0x222)](_0x44ea61,_0x2dd44e,_0x17959f))_0x2dd44e+=this[_0x606b71(0x1a9)]();return this['resetFontSettings'](),_0x2dd44e;},Window_ShopStatus[_0x292660(0x3c3)]['drawItemDamageElement']=function(_0x535f50,_0x4162b5,_0x5e278a){const _0x1c22ac=_0x292660,_0x4af2bd=this[_0x1c22ac(0x2c0)]();this['drawItemKeyData'](_0x4af2bd,_0x535f50,_0x4162b5,_0x5e278a,!![]);const _0x5eb3ae=this[_0x1c22ac(0x4db)]();return this[_0x1c22ac(0x1c5)](_0x5eb3ae,_0x535f50,_0x4162b5,_0x5e278a,![],_0x1c22ac(0x2b3)),this[_0x1c22ac(0x138)](_0x535f50,_0x4162b5,_0x5e278a),this[_0x1c22ac(0x204)](),!![];},Window_ShopStatus['prototype'][_0x292660(0x2c0)]=function(){const _0x50962f=_0x292660;return VisuMZ[_0x50962f(0x448)][_0x50962f(0x465)][_0x50962f(0x126)][_0x50962f(0x285)];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x4db)]=function(){const _0x39846a=_0x292660,_0x3216cd=_0x39846a(0xbc);if(this[_0x39846a(0x2fb)][_0x3216cd])return this[_0x39846a(0x2fb)][_0x3216cd];if(this[_0x39846a(0x237)][_0x39846a(0x1ee)]['elementId']<=-0x1)return VisuMZ[_0x39846a(0x448)]['Settings']['StatusWindow']['ElementWeapon'];else return this['_item']['damage'][_0x39846a(0x495)]===0x0?VisuMZ['ItemsEquipsCore'][_0x39846a(0x465)][_0x39846a(0x126)]['ElementNone']:$dataSystem['elements'][this[_0x39846a(0x237)][_0x39846a(0x1ee)]['elementId']];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x222)]=function(_0x33f818,_0x368885,_0x381f02){const _0x3e11b9=_0x292660,_0x153b45=this[_0x3e11b9(0x2d0)]();this[_0x3e11b9(0x1c5)](_0x153b45,_0x33f818,_0x368885,_0x381f02,!![]),this['setupItemDamageTempActors']();const _0x56938d=this['getItemDamageAmountText'](),_0x370e05=ColorManager[_0x3e11b9(0x2ca)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x3e11b9(0x237)]['damage']['type']]);return this[_0x3e11b9(0x162)](_0x370e05),this[_0x3e11b9(0x1c5)](_0x56938d,_0x33f818,_0x368885,_0x381f02,![],'right'),this[_0x3e11b9(0x138)](_0x33f818,_0x368885,_0x381f02),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x2d0)]=function(){const _0x33463d=_0x292660;return Imported[_0x33463d(0x44f)]&&DataManager['getDamageStyle'](this[_0x33463d(0x237)])!==_0x33463d(0x509)?this[_0x33463d(0x33e)]():this[_0x33463d(0x308)]();},Window_ShopStatus['prototype'][_0x292660(0x308)]=function(){const _0x306b52=_0x292660,_0x518671=VisuMZ[_0x306b52(0x448)][_0x306b52(0x465)]['StatusWindow'],_0x38519c=_0x306b52(0x15c)['format'](this['_item']['damage']['type']),_0x3d0a36=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x306b52(0x237)][_0x306b52(0x1ee)][_0x306b52(0x25b)]];return _0x518671[_0x38519c][_0x306b52(0x169)](_0x3d0a36);},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x1ae)]=function(){const _0x454895=_0x292660,_0xb947db=$gameActors[_0x454895(0x331)](0x1);this[_0x454895(0xe1)]=JsonEx['makeDeepCopy'](_0xb947db),this['_tempActorB']=JsonEx[_0x454895(0xfa)](_0xb947db);},Window_ShopStatus['prototype'][_0x292660(0x35f)]=function(){const _0x5a8d47=_0x292660,_0x428906=_0x5a8d47(0x17d);if(this[_0x5a8d47(0x2fb)][_0x428906])return this[_0x5a8d47(0x2fb)][_0x428906];return Imported[_0x5a8d47(0x44f)]&&DataManager[_0x5a8d47(0x266)](this[_0x5a8d47(0x237)])!=='MANUAL'?this['getItemDamageAmountTextBattleCore']():this[_0x5a8d47(0x26d)]();},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x26d)]=function(){const _0x1f0e93=_0x292660;window['a']=this[_0x1f0e93(0xe1)],window['b']=this[_0x1f0e93(0x355)],this[_0x1f0e93(0xe1)][_0x1f0e93(0xd7)](!![]),this[_0x1f0e93(0x355)][_0x1f0e93(0xd7)]([0x3,0x4][_0x1f0e93(0x261)](this[_0x1f0e93(0x237)][_0x1f0e93(0x1ee)][_0x1f0e93(0x25b)]));let _0x189d9f=this[_0x1f0e93(0x237)][_0x1f0e93(0x1ee)][_0x1f0e93(0x11f)];try{if(_0x1f0e93(0x18c)!=='hNtoP'){const _0xb11d2e=Math[_0x1f0e93(0x2d3)](eval(_0x189d9f),0x0)/window['a'][_0x1f0e93(0x171)];return this[_0x1f0e93(0x235)](),isNaN(_0xb11d2e)?_0x1f0e93(0x431):_0x1f0e93(0x139)[_0x1f0e93(0x169)](Math[_0x1f0e93(0x364)](_0xb11d2e*0x64));}else{function _0x28720a(){const _0x222037=_0x1f0e93;_0x4dd632[_0x222037(0x3c3)][_0x222037(0x23a)][_0x222037(0x1ef)](this),this[_0x222037(0x4ce)]&&this['_categoryWindow'][_0x222037(0x2ac)]()&&this['_categoryWindow'][_0x222037(0x23a)]();}}}catch(_0x5bd419){return $gameTemp['isPlaytest']()&&(console[_0x1f0e93(0x322)](_0x1f0e93(0x160)[_0x1f0e93(0x169)](this[_0x1f0e93(0x237)][_0x1f0e93(0xc0)])),console['log'](_0x5bd419)),this[_0x1f0e93(0x235)](),_0x1f0e93(0x431);}},Window_ShopStatus['prototype'][_0x292660(0x235)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x208)]=function(_0x4f5dbd,_0x1feded,_0x1dffb2){const _0x15b995=_0x292660;if(!this[_0x15b995(0x23f)]())return _0x1feded;if(this[_0x15b995(0xeb)](_0x4f5dbd,_0x1feded,_0x1dffb2))_0x1feded+=this[_0x15b995(0x1a9)]();if(this[_0x15b995(0x152)](_0x4f5dbd,_0x1feded,_0x1dffb2))_0x1feded+=this[_0x15b995(0x1a9)]();if(this[_0x15b995(0x1b6)](_0x4f5dbd,_0x1feded,_0x1dffb2))_0x1feded+=this[_0x15b995(0x1a9)]();if(this[_0x15b995(0xfb)](_0x4f5dbd,_0x1feded,_0x1dffb2))_0x1feded+=this[_0x15b995(0x1a9)]();if(this[_0x15b995(0x14c)](_0x4f5dbd,_0x1feded,_0x1dffb2))_0x1feded+=this[_0x15b995(0x1a9)]();if(this[_0x15b995(0x42c)](_0x4f5dbd,_0x1feded,_0x1dffb2))_0x1feded+=this[_0x15b995(0x1a9)]();if(this['drawItemEffectsSelfTpGain'](_0x4f5dbd,_0x1feded,_0x1dffb2))_0x1feded+=this['lineHeight']();if(this[_0x15b995(0x1d2)](_0x4f5dbd,_0x1feded,_0x1dffb2))_0x1feded+=this[_0x15b995(0x1a9)]();if(this['drawItemEffectsRemovedStatesBuffs'](_0x4f5dbd,_0x1feded,_0x1dffb2))_0x1feded+=this['lineHeight']();return this[_0x15b995(0x204)](),_0x1feded;},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x23f)]=function(){const _0x4cb068=_0x292660;let _0x153491=![];this['_itemData']={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};for(const _0x1c8f0b of this['_item'][_0x4cb068(0x492)]){switch(_0x1c8f0b[_0x4cb068(0x4bb)]){case Game_Action[_0x4cb068(0x4ec)]:this[_0x4cb068(0x211)]['rateHP']+=_0x1c8f0b[_0x4cb068(0x3e4)],this['_itemData']['flatHP']+=_0x1c8f0b[_0x4cb068(0x176)],_0x153491=!![];break;case Game_Action[_0x4cb068(0x2ad)]:this[_0x4cb068(0x211)][_0x4cb068(0x498)]+=_0x1c8f0b[_0x4cb068(0x3e4)],this[_0x4cb068(0x211)][_0x4cb068(0x3ab)]+=_0x1c8f0b['value2'],_0x153491=!![];break;case Game_Action[_0x4cb068(0x343)]:this[_0x4cb068(0x211)][_0x4cb068(0xec)]+=_0x1c8f0b[_0x4cb068(0x3e4)],_0x153491=!![];break;case Game_Action['EFFECT_ADD_STATE']:this[_0x4cb068(0x211)][_0x4cb068(0x48c)]['push'](_0x1c8f0b[_0x4cb068(0x190)]),_0x153491=!![];break;case Game_Action['EFFECT_REMOVE_STATE']:this[_0x4cb068(0x211)][_0x4cb068(0x461)][_0x4cb068(0x106)](_0x1c8f0b[_0x4cb068(0x190)]),this[_0x4cb068(0x211)][_0x4cb068(0x309)]=!![],_0x153491=!![];break;case Game_Action[_0x4cb068(0x109)]:this[_0x4cb068(0x211)][_0x4cb068(0x329)][_0x1c8f0b[_0x4cb068(0x190)]]+=0x1,_0x153491=!![];break;case Game_Action['EFFECT_ADD_DEBUFF']:this[_0x4cb068(0x211)][_0x4cb068(0x329)][_0x1c8f0b['dataId']]-=0x1,_0x153491=!![];break;case Game_Action[_0x4cb068(0x2a8)]:this['_itemData'][_0x4cb068(0x4ef)][_0x4cb068(0x106)](_0x1c8f0b['dataId']),this[_0x4cb068(0x211)][_0x4cb068(0x309)]=!![],_0x153491=!![];break;case Game_Action['EFFECT_REMOVE_DEBUFF']:this[_0x4cb068(0x211)][_0x4cb068(0x30e)]['push'](_0x1c8f0b[_0x4cb068(0x190)]),this['_itemData'][_0x4cb068(0x309)]=!![],_0x153491=!![];break;}}if(this['_itemData'][_0x4cb068(0x48c)][_0x4cb068(0x205)]>0x0)this['_itemData'][_0x4cb068(0x3d5)]=!![];for(let _0x1724ec=0x0;_0x1724ec<this[_0x4cb068(0x211)][_0x4cb068(0x329)][_0x4cb068(0x205)];_0x1724ec++){if(this[_0x4cb068(0x211)]['changeBuff'][_0x1724ec]!==0x0)this[_0x4cb068(0x211)][_0x4cb068(0x3d5)]=!![];}this['_item'][_0x4cb068(0xb2)]!==0x0&&(this[_0x4cb068(0x211)]['selfTP']=this['_item'][_0x4cb068(0xb2)],_0x153491=!![]);const _0x459e17=[_0x4cb068(0x230),_0x4cb068(0x46c),_0x4cb068(0x19e),_0x4cb068(0x44b),_0x4cb068(0x1fd),_0x4cb068(0x3fc),_0x4cb068(0xad),_0x4cb068(0x3a3),_0x4cb068(0x41d)];for(const _0x45aeeb of _0x459e17){if(this['_customItemInfo'][_0x45aeeb]){_0x153491=!![];break;}}return _0x153491;},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0xeb)]=function(_0x4b910d,_0x3f2d4d,_0x21543c){const _0x1ae288=_0x292660,_0x449fd9='HP\x20RECOVERY';if(this['_itemData'][_0x1ae288(0x1a4)]<=0x0&&this[_0x1ae288(0x211)][_0x1ae288(0x33c)]<=0x0&&!this[_0x1ae288(0x2fb)][_0x449fd9])return![];const _0x2c11d1=this[_0x1ae288(0x1be)]();this[_0x1ae288(0x1c5)](_0x2c11d1,_0x4b910d,_0x3f2d4d,_0x21543c,!![]);const _0x277ba1=this[_0x1ae288(0x1dd)]();return this['changeTextColor'](ColorManager['damageColor'](0x1)),this[_0x1ae288(0x1c5)](_0x277ba1,_0x4b910d,_0x3f2d4d,_0x21543c,![],_0x1ae288(0x2b3)),this[_0x1ae288(0x138)](_0x4b910d,_0x3f2d4d,_0x21543c),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x292660(0x1be)]=function(){const _0x598bf8=_0x292660,_0x5eaa89=VisuMZ['ItemsEquipsCore']['Settings'][_0x598bf8(0x126)]['LabelRecoverHP'];return _0x5eaa89[_0x598bf8(0x169)](TextManager['hp']);},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x1dd)]=function(){const _0x2945b8=_0x292660,_0xf815c3=_0x2945b8(0x230);if(this[_0x2945b8(0x2fb)][_0xf815c3])return this[_0x2945b8(0x2fb)][_0xf815c3];let _0x25cae5='';if(this['_itemData']['rateHP']>0x0)_0x25cae5+=_0x2945b8(0x4ba)[_0x2945b8(0x169)](Math['floor'](this[_0x2945b8(0x211)][_0x2945b8(0x1a4)]*0x64));if(this[_0x2945b8(0x211)]['rateHP']>0x0&&this['_itemData'][_0x2945b8(0x33c)]>0x0)_0x25cae5+='\x20';if(this['_itemData']['flatHP']>0x0)_0x25cae5+='+%1'[_0x2945b8(0x169)](this[_0x2945b8(0x211)][_0x2945b8(0x33c)]);return _0x25cae5;},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x152)]=function(_0x55c7e1,_0x1f491c,_0x36747d){const _0x23fdf0=_0x292660,_0x23e2e7=_0x23fdf0(0x46c);if(this['_itemData'][_0x23fdf0(0x498)]<=0x0&&this[_0x23fdf0(0x211)][_0x23fdf0(0x3ab)]<=0x0&&!this[_0x23fdf0(0x2fb)][_0x23e2e7])return![];const _0x55983b=this['getItemEffectsMpRecoveryLabel']();this[_0x23fdf0(0x1c5)](_0x55983b,_0x55c7e1,_0x1f491c,_0x36747d,!![]);const _0xb12580=this['getItemEffectsMpRecoveryText']();return this[_0x23fdf0(0x162)](ColorManager[_0x23fdf0(0x2ca)](0x3)),this[_0x23fdf0(0x1c5)](_0xb12580,_0x55c7e1,_0x1f491c,_0x36747d,![],'right'),this[_0x23fdf0(0x138)](_0x55c7e1,_0x1f491c,_0x36747d),this[_0x23fdf0(0x204)](),!![];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x321)]=function(){const _0x2f4424=_0x292660,_0x3d082a=VisuMZ[_0x2f4424(0x448)][_0x2f4424(0x465)][_0x2f4424(0x126)][_0x2f4424(0x24a)];return _0x3d082a[_0x2f4424(0x169)](TextManager['mp']);},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0xce)]=function(){const _0x663bd1=_0x292660,_0x18f02f=_0x663bd1(0x46c);if(this[_0x663bd1(0x2fb)][_0x18f02f])return this[_0x663bd1(0x2fb)][_0x18f02f];let _0x38938b='';if(this[_0x663bd1(0x211)][_0x663bd1(0x498)]>0x0)_0x38938b+=_0x663bd1(0x4ba)['format'](Math[_0x663bd1(0x4d8)](this[_0x663bd1(0x211)][_0x663bd1(0x498)]*0x64));if(this[_0x663bd1(0x211)][_0x663bd1(0x498)]>0x0&&this[_0x663bd1(0x211)][_0x663bd1(0x3ab)]>0x0)_0x38938b+='\x20';if(this['_itemData'][_0x663bd1(0x3ab)]>0x0)_0x38938b+=_0x663bd1(0x457)[_0x663bd1(0x169)](this[_0x663bd1(0x211)][_0x663bd1(0x3ab)]);return _0x38938b;},Window_ShopStatus['prototype']['drawItemEffectsTpRecovery']=function(_0x16fd0a,_0xbcbd21,_0x248c3b){const _0x136a89=_0x292660,_0x1b61f3=_0x136a89(0x19e);if(this[_0x136a89(0x211)][_0x136a89(0xec)]<=0x0&&!this['_customItemInfo'][_0x1b61f3])return![];const _0x1d4cae=this[_0x136a89(0x3e1)]();this['drawItemKeyData'](_0x1d4cae,_0x16fd0a,_0xbcbd21,_0x248c3b,!![]);const _0x295a1=this[_0x136a89(0x2ae)]();return this['changeTextColor'](ColorManager[_0x136a89(0x4b4)]()),this[_0x136a89(0x1c5)](_0x295a1,_0x16fd0a,_0xbcbd21,_0x248c3b,![],_0x136a89(0x2b3)),this[_0x136a89(0x138)](_0x16fd0a,_0xbcbd21,_0x248c3b),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x3e1)]=function(){const _0x5cd78a=_0x292660,_0x4bfa55=VisuMZ[_0x5cd78a(0x448)][_0x5cd78a(0x465)]['StatusWindow'][_0x5cd78a(0x466)];return _0x4bfa55[_0x5cd78a(0x169)](TextManager['tp']);},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x2ae)]=function(){const _0x1d87b4=_0x292660,_0x22ee86='TP\x20RECOVERY';if(this[_0x1d87b4(0x2fb)][_0x22ee86])return this['_customItemInfo'][_0x22ee86];let _0x52824e='';return _0x52824e+=_0x1d87b4(0x457)['format'](this['_itemData'][_0x1d87b4(0xec)]),_0x52824e;},Window_ShopStatus[_0x292660(0x3c3)]['drawItemEffectsSelfTpGain']=function(_0x35ce2a,_0x4f9c2f,_0x51ccd5){const _0x361cdc=_0x292660,_0x5e39d8=_0x361cdc(0xad);if(this[_0x361cdc(0x211)][_0x361cdc(0x23e)]===0x0&&!this[_0x361cdc(0x2fb)][_0x5e39d8])return![];const _0x273a31=this[_0x361cdc(0x223)]();this['drawItemKeyData'](_0x273a31,_0x35ce2a,_0x4f9c2f,_0x51ccd5,!![]);const _0x323519=this['getItemEffectsSelfTpGainText']();if(this[_0x361cdc(0x211)][_0x361cdc(0x23e)]>0x0){if(_0x361cdc(0x3cf)===_0x361cdc(0x2c4)){function _0x17435d(){const _0x10baf4=_0x361cdc;this[_0x10baf4(0x108)](_0x59e70b);}}else this[_0x361cdc(0x162)](ColorManager[_0x361cdc(0x4b4)]());}else this[_0x361cdc(0x162)](ColorManager['powerDownColor']());return this[_0x361cdc(0x1c5)](_0x323519,_0x35ce2a,_0x4f9c2f,_0x51ccd5,![],_0x361cdc(0x2b3)),this[_0x361cdc(0x138)](_0x35ce2a,_0x4f9c2f,_0x51ccd5),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x223)]=function(){const _0x38c05e=_0x292660,_0x2581e=VisuMZ[_0x38c05e(0x448)]['Settings'][_0x38c05e(0x126)]['LabelSelfGainTP'];return _0x2581e[_0x38c05e(0x169)](TextManager['tp']);},Window_ShopStatus[_0x292660(0x3c3)]['getItemEffectsSelfTpGainText']=function(){const _0x29657d=_0x292660,_0x5c23e5='USER\x20TP\x20GAIN';if(this[_0x29657d(0x2fb)][_0x5c23e5])return this[_0x29657d(0x2fb)][_0x5c23e5];let _0x1e2180='';if(this[_0x29657d(0x211)][_0x29657d(0x23e)]>0x0)_0x1e2180+=_0x29657d(0x457)['format'](this[_0x29657d(0x211)][_0x29657d(0x23e)]);else{if(_0x29657d(0x420)===_0x29657d(0x320)){function _0x17e259(){const _0x2cd6f3=_0x29657d;this[_0x2cd6f3(0x204)](),_0x1aca2d[_0x2cd6f3(0x448)][_0x2cd6f3(0x465)][_0x2cd6f3(0xbe)][_0x2cd6f3(0x1cc)]['call'](this);}}else _0x1e2180+='%1'[_0x29657d(0x169)](this[_0x29657d(0x211)]['selfTP']);}return _0x1e2180;},Window_ShopStatus[_0x292660(0x3c3)]['drawItemEffectsHpDamage']=function(_0x1f9451,_0x40e0ba,_0x455683){const _0x178e47=_0x292660,_0x236af1=_0x178e47(0x44b);if(this[_0x178e47(0x211)][_0x178e47(0x1a4)]>=0x0&&this[_0x178e47(0x211)][_0x178e47(0x33c)]>=0x0&&!this['_customItemInfo'][_0x236af1])return![];const _0x4a3847=this[_0x178e47(0x32b)]();this[_0x178e47(0x1c5)](_0x4a3847,_0x1f9451,_0x40e0ba,_0x455683,!![]);const _0x3eedeb=this[_0x178e47(0x276)]();return this[_0x178e47(0x162)](ColorManager[_0x178e47(0x2ca)](0x0)),this[_0x178e47(0x1c5)](_0x3eedeb,_0x1f9451,_0x40e0ba,_0x455683,![],_0x178e47(0x2b3)),this[_0x178e47(0x138)](_0x1f9451,_0x40e0ba,_0x455683),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x32b)]=function(){const _0x1e328a=_0x292660,_0x147be8=VisuMZ[_0x1e328a(0x448)]['Settings'][_0x1e328a(0x126)]['LabelDamageHP'];return _0x147be8[_0x1e328a(0x169)](TextManager['hp']);},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x276)]=function(){const _0x417a4b=_0x292660,_0x97b42d=_0x417a4b(0x44b);if(this[_0x417a4b(0x2fb)][_0x97b42d])return this[_0x417a4b(0x2fb)][_0x97b42d];let _0x2a1912='';if(this[_0x417a4b(0x211)][_0x417a4b(0x1a4)]<0x0)_0x2a1912+=_0x417a4b(0x139)[_0x417a4b(0x169)](Math[_0x417a4b(0x4d8)](this[_0x417a4b(0x211)][_0x417a4b(0x1a4)]*0x64));if(this[_0x417a4b(0x211)][_0x417a4b(0x1a4)]<0x0&&this[_0x417a4b(0x211)]['flatHP']<0x0)_0x2a1912+='\x20';if(this[_0x417a4b(0x211)]['flatHP']<0x0)_0x2a1912+='%1'[_0x417a4b(0x169)](this['_itemData']['flatHP']);return _0x2a1912;},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x14c)]=function(_0x886f83,_0x285ca8,_0x1dfb50){const _0x30285c=_0x292660,_0x528af1=_0x30285c(0x1fd);if(this[_0x30285c(0x211)][_0x30285c(0x498)]>=0x0&&this[_0x30285c(0x211)][_0x30285c(0x3ab)]>=0x0&&!this[_0x30285c(0x2fb)][_0x528af1])return![];const _0x4c5ff5=this[_0x30285c(0xa4)]();this[_0x30285c(0x1c5)](_0x4c5ff5,_0x886f83,_0x285ca8,_0x1dfb50,!![]);const _0x1df222=this[_0x30285c(0x40d)]();return this[_0x30285c(0x162)](ColorManager['damageColor'](0x2)),this[_0x30285c(0x1c5)](_0x1df222,_0x886f83,_0x285ca8,_0x1dfb50,![],_0x30285c(0x2b3)),this[_0x30285c(0x138)](_0x886f83,_0x285ca8,_0x1dfb50),this[_0x30285c(0x204)](),!![];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0xa4)]=function(){const _0x116b67=_0x292660,_0x1026de=VisuMZ[_0x116b67(0x448)]['Settings']['StatusWindow'][_0x116b67(0x3d4)];return _0x1026de[_0x116b67(0x169)](TextManager['mp']);},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x40d)]=function(){const _0x701967=_0x292660,_0x5dde8d=_0x701967(0x1fd);if(this['_customItemInfo'][_0x5dde8d])return this[_0x701967(0x2fb)][_0x5dde8d];let _0x3a315e='';if(this['_itemData'][_0x701967(0x498)]<0x0)_0x3a315e+=_0x701967(0x139)[_0x701967(0x169)](Math[_0x701967(0x4d8)](this[_0x701967(0x211)][_0x701967(0x498)]*0x64));if(this[_0x701967(0x211)]['rateMP']<0x0&&this[_0x701967(0x211)][_0x701967(0x3ab)]<0x0)_0x3a315e+='\x20';if(this['_itemData'][_0x701967(0x3ab)]<0x0)_0x3a315e+='%1'[_0x701967(0x169)](this['_itemData'][_0x701967(0x3ab)]);return _0x3a315e;},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x42c)]=function(_0x1e2d40,_0x43df5a,_0x1eb9ed){const _0x5d24f4=_0x292660,_0x5ad5c2='TP\x20DAMAGE';if(this[_0x5d24f4(0x211)][_0x5d24f4(0xec)]>=0x0&&!this['_customItemInfo'][_0x5ad5c2])return![];const _0x386b4b=this[_0x5d24f4(0x253)]();this[_0x5d24f4(0x1c5)](_0x386b4b,_0x1e2d40,_0x43df5a,_0x1eb9ed,!![]);const _0x3350b2=this[_0x5d24f4(0x411)]();return this[_0x5d24f4(0x162)](ColorManager[_0x5d24f4(0x49b)]()),this[_0x5d24f4(0x1c5)](_0x3350b2,_0x1e2d40,_0x43df5a,_0x1eb9ed,![],_0x5d24f4(0x2b3)),this[_0x5d24f4(0x138)](_0x1e2d40,_0x43df5a,_0x1eb9ed),this[_0x5d24f4(0x204)](),!![];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x253)]=function(){const _0x48a0a3=_0x292660,_0x178fdc=VisuMZ[_0x48a0a3(0x448)][_0x48a0a3(0x465)][_0x48a0a3(0x126)][_0x48a0a3(0xea)];return _0x178fdc[_0x48a0a3(0x169)](TextManager['tp']);},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x411)]=function(){const _0xd63595=_0x292660,_0x193dcf='TP\x20DAMAGE';if(this[_0xd63595(0x2fb)][_0x193dcf])return this['_customItemInfo'][_0x193dcf];let _0x48bb89='';return _0x48bb89+='%1'[_0xd63595(0x169)](this[_0xd63595(0x211)][_0xd63595(0xec)]),_0x48bb89;},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x1d2)]=function(_0x356be5,_0x117ccb,_0x2614ba){const _0x27fb16=_0x292660,_0x4b8c73='ADDED\x20EFFECTS';if(!this['_itemData'][_0x27fb16(0x3d5)]&&!this[_0x27fb16(0x2fb)][_0x4b8c73])return![];const _0x5ea464=this[_0x27fb16(0x314)]();this[_0x27fb16(0x1c5)](_0x5ea464,_0x356be5,_0x117ccb,_0x2614ba,!![]);const _0x12c304=this[_0x27fb16(0x4da)]();return this[_0x27fb16(0x1c5)](_0x12c304,_0x356be5,_0x117ccb,_0x2614ba,![],'right'),this[_0x27fb16(0x138)](_0x356be5,_0x117ccb,_0x2614ba),this[_0x27fb16(0x204)](),!![];},Window_ShopStatus['prototype']['getItemEffectsAddedStatesBuffsLabel']=function(){const _0x25e9de=_0x292660;return VisuMZ[_0x25e9de(0x448)][_0x25e9de(0x465)][_0x25e9de(0x126)]['LabelApply'];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x4da)]=function(){const _0xe29d=_0x292660,_0x111436=_0xe29d(0x3a3);if(this[_0xe29d(0x2fb)][_0x111436])return this['_customItemInfo'][_0x111436];let _0x53af80='',_0x49e987=0x0;const _0x4afc42=0x8;for(const _0x48fce6 of this[_0xe29d(0x211)][_0xe29d(0x48c)]){const _0x7885cf=$dataStates[_0x48fce6];if(_0x7885cf&&_0x7885cf[_0xe29d(0x2f7)]>0x0){if(_0xe29d(0xc9)!==_0xe29d(0x3a0)){_0x53af80+=_0xe29d(0x150)['format'](_0x7885cf[_0xe29d(0x2f7)]),_0x49e987++;if(_0x49e987>=_0x4afc42)return _0x53af80;}else{function _0x44f542(){return![];}}}}for(let _0x2a021a=0x0;_0x2a021a<this[_0xe29d(0x211)]['changeBuff'][_0xe29d(0x205)];_0x2a021a++){const _0x458b7a=this[_0xe29d(0x211)][_0xe29d(0x329)][_0x2a021a],_0x81ed22=Game_BattlerBase[_0xe29d(0x3c3)][_0xe29d(0x155)](_0x458b7a,_0x2a021a);if(_0x81ed22>0x0){_0x53af80+=_0xe29d(0x150)[_0xe29d(0x169)](_0x81ed22),_0x49e987++;if(_0x49e987>=_0x4afc42)return _0x53af80;}}return _0x53af80;},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x38b)]=function(_0xe3aea0,_0x1d052e,_0x371f14){const _0x2e5d66=_0x292660,_0x1d505c=_0x2e5d66(0x41d);if(!this['_itemData'][_0x2e5d66(0x309)]&&!this['_customItemInfo'][_0x1d505c])return![];const _0x4147d0=this[_0x2e5d66(0x113)]();this[_0x2e5d66(0x1c5)](_0x4147d0,_0xe3aea0,_0x1d052e,_0x371f14,!![]);const _0xa46f93=this[_0x2e5d66(0x1c9)]();return this['drawItemKeyData'](_0xa46f93,_0xe3aea0,_0x1d052e,_0x371f14,![],_0x2e5d66(0x2b3)),this['drawItemDarkRect'](_0xe3aea0,_0x1d052e,_0x371f14),this[_0x2e5d66(0x204)](),!![];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x113)]=function(){const _0x31d8f8=_0x292660;return VisuMZ[_0x31d8f8(0x448)]['Settings']['StatusWindow']['LabelRemove'];},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x1c9)]=function(){const _0x4ed940=_0x292660,_0x531f1d=_0x4ed940(0x41d);if(this[_0x4ed940(0x2fb)][_0x531f1d])return this[_0x4ed940(0x2fb)][_0x531f1d];let _0x46a6e5='',_0x282d20=0x0;const _0x17184e=VisuMZ[_0x4ed940(0x448)][_0x4ed940(0x465)][_0x4ed940(0x126)][_0x4ed940(0x41b)];for(const _0x556e2c of this[_0x4ed940(0x211)][_0x4ed940(0x461)]){if(_0x4ed940(0x2af)==='jwXlD'){const _0x41ddec=$dataStates[_0x556e2c];if(_0x41ddec&&_0x41ddec[_0x4ed940(0x2f7)]>0x0){_0x46a6e5+=_0x4ed940(0x150)[_0x4ed940(0x169)](_0x41ddec['iconIndex']),_0x282d20++;if(_0x282d20>=_0x17184e)return _0x46a6e5;}}else{function _0x541a57(){const _0x12f52d=_0x4ed940;this[_0x12f52d(0x274)]();}}}for(let _0x2bed7a=0x0;_0x2bed7a<this[_0x4ed940(0x211)][_0x4ed940(0x4ef)]['length'];_0x2bed7a++){if(_0x4ed940(0x323)===_0x4ed940(0x323)){const _0x27e229=Game_BattlerBase[_0x4ed940(0x3c3)][_0x4ed940(0x155)](0x1,_0x2bed7a);if(_0x27e229>0x0){_0x46a6e5+=_0x4ed940(0x150)[_0x4ed940(0x169)](_0x27e229),_0x282d20++;if(_0x282d20>=_0x17184e)return _0x46a6e5;}}else{function _0x32ff0b(){const _0x5f301e=_0x4ed940;_0x357955[_0x5f301e(0x448)][_0x5f301e(0x1c3)][_0x5f301e(0x1ef)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x5f301e(0x175)]['show'](),this[_0x5f301e(0x30c)]['updateHelp']();}}}for(let _0x218351=0x0;_0x218351<this[_0x4ed940(0x211)][_0x4ed940(0x30e)]['length'];_0x218351++){const _0x248e62=Game_BattlerBase['prototype'][_0x4ed940(0x155)](-0x1,_0x218351);if(_0x248e62>0x0){if(_0x4ed940(0x2c2)!==_0x4ed940(0x1f8)){_0x46a6e5+='\x5cI[%1]'[_0x4ed940(0x169)](_0x248e62),_0x282d20++;if(_0x282d20>=_0x17184e)return _0x46a6e5;}else{function _0x9a30(){const _0x21e1b8=_0x4ed940;if(_0x55f588){const _0x80f24c=_0x252724+(this['lineHeight']()-_0x1389ce[_0x21e1b8(0x281)])/0x2,_0x3cf592=_0x2794ac[_0x21e1b8(0x45e)]+0x4,_0xca4bcd=_0x5b7190[_0x21e1b8(0x2d3)](0x0,_0x2c590e-_0x3cf592);this[_0x21e1b8(0x162)](_0x442d75['getItemColor'](_0x4c0c2f)),this[_0x21e1b8(0x2ed)](_0x1247ea[_0x21e1b8(0x2f7)],_0x46f512,_0x80f24c),this[_0x21e1b8(0x4f6)](_0x541fb7[_0x21e1b8(0xc0)],_0x48bebd+_0x3cf592,_0x1abc74,_0xca4bcd),this[_0x21e1b8(0x473)]();}}}}}return _0x46a6e5;},Window_ShopStatus[_0x292660(0x3c3)]['drawItemCustomEntries']=function(_0x16dcb7,_0x4fa0fd,_0xb1d60d){const _0x2e3cff=_0x292660;if(this[_0x2e3cff(0x237)][_0x2e3cff(0x445)][_0x2e3cff(0x35a)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x45c2d9=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x48eac5 of _0x45c2d9){if(_0x48eac5[_0x2e3cff(0x35a)](/(.*):[ ](.*)/i)){if(_0x2e3cff(0x133)===_0x2e3cff(0x133)){const _0x465cd7=String(RegExp['$1'])['trim'](),_0x54fc29=String(RegExp['$2'])[_0x2e3cff(0x508)]();this[_0x2e3cff(0x2a9)](_0x465cd7,_0x54fc29,_0x16dcb7,_0x4fa0fd,_0xb1d60d),_0x4fa0fd+=this[_0x2e3cff(0x1a9)]();}else{function _0xb00e1(){const _0x1c6513=_0x2e3cff;this['_category']=_0x7b8592,this[_0x1c6513(0x4e9)](),this[_0x1c6513(0x4ce)]&&this['_categoryWindow'][_0x1c6513(0x2ac)]()?this['smoothSelect'](0x0):this['scrollTo'](0x0,0x0);}}}}}return this['resetFontSettings'](),_0x4fa0fd;},Window_ShopStatus['prototype'][_0x292660(0x2a9)]=function(_0x243425,_0x137001,_0x14e876,_0x4ea087,_0x4a75f4){const _0x1c10cd=_0x292660;this['drawItemKeyData'](_0x243425,_0x14e876,_0x4ea087,_0x4a75f4,!![]),this[_0x1c10cd(0x1c5)](_0x137001,_0x14e876,_0x4ea087,_0x4a75f4,![],_0x1c10cd(0x2b3)),this[_0x1c10cd(0x138)](_0x14e876,_0x4ea087,_0x4a75f4),this[_0x1c10cd(0x204)]();},Window_ShopStatus[_0x292660(0x3c3)]['drawCustomShopGraphic']=function(){const _0xc3428b=_0x292660;if(!this[_0xc3428b(0x237)])return;const _0xd23e40=this['_item']['note'],_0x566003=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x20090f=_0xd23e40['match'](_0x566003);if(_0x20090f)for(const _0x221141 of _0x20090f){_0x221141['match'](_0x566003);const _0x38b4a2=String(RegExp['$1'])[_0xc3428b(0x508)]()||'';if(_0x38b4a2==='')continue;const _0x5c3966=ImageManager[_0xc3428b(0x504)](_0x38b4a2);_0x5c3966['addLoadListener'](this[_0xc3428b(0x17c)][_0xc3428b(0x412)](this,_0x5c3966,this[_0xc3428b(0x237)]));}},Window_ShopStatus[_0x292660(0x3c3)][_0x292660(0x17c)]=function(_0x3da3de,_0x58f17d){const _0x611588=_0x292660;if(this['_item']!==_0x58f17d)return;if(!_0x3da3de)return;if(_0x3da3de[_0x611588(0x294)]<=0x0||_0x3da3de[_0x611588(0x12e)]<=0x0)return;const _0xc60072=_0x58f17d['note'];let _0x513cca=_0x611588(0x4c1);if(_0xc60072[_0x611588(0x35a)](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)){if('UlEiG'!==_0x611588(0xcb))_0x513cca='foreground';else{function _0x52d8b6(){const _0x3b90fb=_0x611588;return _0x12304e[_0x3b90fb(0x448)]['Settings'][_0x3b90fb(0x34a)]['buttonAssistCategory'];}}}const _0x1ad2eb=_0x513cca===_0x611588(0x4c1)?this[_0x611588(0x2d4)]:this['contents'];let _0x209b31=this['innerWidth'],_0x281006=this[_0x611588(0x1eb)];_0xc60072[_0x611588(0x35a)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&(_0x209b31=Number(RegExp['$1']));_0xc60072[_0x611588(0x35a)](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0x281006=Number(RegExp['$1']));_0xc60072['match'](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0x209b31=Number(RegExp['$1']),_0x281006=Number(RegExp['$2']));const _0x5c7023=Math[_0x611588(0x27b)](0x1,_0x209b31/_0x3da3de['width'],_0x281006/_0x3da3de[_0x611588(0x12e)]);let _0x133795=0x0,_0x1ee21e=0x0,_0x14eb13=Math['floor'](_0x3da3de[_0x611588(0x294)]*_0x5c7023),_0x160cbb=Math[_0x611588(0x4d8)](_0x3da3de[_0x611588(0x12e)]*_0x5c7023),_0xafcdeb=_0x611588(0x31b);_0xc60072[_0x611588(0x35a)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0xafcdeb=String(RegExp['$1'])[_0x611588(0x313)]()['trim']());if(_0xafcdeb===_0x611588(0xa6))_0x133795=0x0;else{if(_0xafcdeb===_0x611588(0x31b))_0x133795=Math[_0x611588(0x364)]((this[_0x611588(0x143)]-_0x14eb13)/0x2);else{if(_0x611588(0xf4)!==_0x611588(0xf4)){function _0x2465f8(){const _0x33c3d3=_0x611588;if(_0x138548[_0x33c3d3(0x188)](_0x501d46))return!![];}}else _0x133795=this[_0x611588(0x143)]-_0x14eb13;}}let _0x45d4fa=_0x611588(0x407);_0xc60072[_0x611588(0x35a)](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)&&(_0x45d4fa=String(RegExp['$1'])[_0x611588(0x313)]()[_0x611588(0x508)]());if(_0x45d4fa===_0x611588(0x502)){if(_0x611588(0x304)==='ADcoR')_0x1ee21e=0x0;else{function _0x5a5941(){const _0x205842=_0x611588;return _0x346cbb['prototype'][_0x205842(0x49f)][_0x205842(0x1ef)](this);}}}else _0x45d4fa===_0x611588(0x407)?_0x1ee21e=Math[_0x611588(0x364)]((this['innerHeight']-_0x160cbb)/0x2):_0x1ee21e=this['innerHeight']-_0x160cbb;_0xc60072[_0x611588(0x35a)](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x133795+=Number(RegExp['$1']));_0xc60072['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x1ee21e+=Number(RegExp['$1']));_0xc60072[_0x611588(0x35a)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)&&(_0x133795+=Number(RegExp['$1']),_0x1ee21e+=Number(RegExp['$2']));let _0x1b84c=0xff;if(_0xc60072[_0x611588(0x35a)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i))_0x1b84c=Number(RegExp['$1']);else _0xc60072[_0x611588(0x35a)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)&&(_0x1b84c=Math[_0x611588(0x364)](Number(RegExp['$1'])*0.01*0xff)[_0x611588(0x44d)](0x0,0xff));_0x1ad2eb[_0x611588(0x272)]=_0x1b84c,_0x1ad2eb['blt'](_0x3da3de,0x0,0x0,_0x3da3de[_0x611588(0x294)],_0x3da3de[_0x611588(0x12e)],_0x133795,_0x1ee21e,_0x14eb13,_0x160cbb),_0x1ad2eb[_0x611588(0x272)]=0xff;};