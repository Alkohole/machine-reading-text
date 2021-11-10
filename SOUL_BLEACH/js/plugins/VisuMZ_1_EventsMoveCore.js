//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.20;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.20] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x121d=['offsetX','getPose','horizontal\x20mirror','EnableTurnInPlace','iconIndex','PreCopyJS','Game_Message_setItemChoice','isEventClickTriggered','processMoveRouteAnimation','onOk','standing','changeSpeed','turnTowardPoint','_moveSynch','Window_NumberInput_processOk','length','VehicleAllow','_moveSpeed','PreMorphJS','disable','note','Game_Interpreter_executeCommand','MoveAllSynchTargets','Game_CharacterBase_screenY','charAt','template','execute','_spawnData','Game_Timer_initialize','TiltRight','SpawnEventAtTerrainTag','isPlaytest','Visibility','_lastPluginCommandInterpreter','Game_Event_event','OperateValues','delay','value','initEventsMoveCore','FollowerID','isShip','start','meetsConditions','forceDashing','isSupportDiagonalMovement','activationProximityType','isSpriteVS8dir','isDashingAndMoving','pageIndex','defaultFontSize','31SuVZLJ','Game_Event_locate','_paused','BULB','destinationY','_eventScreenX','processMoveRouteMoveToCharacter','isNormalPriority','setAllowEventAutoMovement','61051YbAhSe','Game_Timer_stop','getDirectionFromPoint','isSpawnedEvent','SPIN\x20CCW','Game_Follower_initialize','_visiblePlayerX','clearStepPattern','Game_Timer_start','Seconds','WalkAllow','getDirectionToPoint','_addedHitbox','needsUpdate','requestBalloon','processMoveRouteBalloon','setupDiagonalSupport','reserveCommonEvent','FollowerReset','canMove','setupSpawnedEvents','SuccessSwitchId','setupSpawnTest','setImage','initEventsMoveCoreSettings','Game_Character_processMoveCommand','SPIN\x20ACW','_selfTargetNumberInput','moveTypeRandom','_PlayerDiagonalSetting','LOWER\x20LEFT','%1%2','Sprite_Character_characterPatternY','setLastPluginCommandInterpreter','despawnEverything','updateTilt','randomInt','Window_EventItem_onCancel','initialize','MUSICNOTE','moveDiagonally','getPosingCharacterDirection','VariableGetSelfVariableID','deltaXFrom','EventTimerExpireEvent','processMoveRouteMoveRepeat','isEventOverloaded','setValue','checkExistingEntitiesAt','AllAllow','1ASKkpT','processMoveRouteFadeIn','processMoveSynchApproach','name','shadowX','clearPose','_lastMovedDirection','firstSpawnedEvent','Game_CharacterBase_characterIndex','VehicleForbid','hasCPCs','searchLimit','setup','_activationProximityAutoTriggerBypass','absDistance','Game_Event_findProperPageIndex','IconBlendMode','parse','vert\x20mirror','square','isAllowEventAutoMovement','_EventIcons','variables','_selfTargetItemChoice','LineHeight','_frames','_needsRefresh','ANGER','_patternLocked','characterPatternY','erase','refresh','processMoveRouteJumpForward','_diagonalSupport','Settings','resetFontSettings','_selfEvent','lineHeight','events','_stepPattern','Game_Variables_setValue','switch1Valid','deltaY','saveEventLocation','hasMoveOnlyRegions','roundY','drawing','StrictCollision','createSaveEventLocationData','PlayerForbid','deleteSavedEventLocation','Spriteset_Map_createLowerLayer','EnableDashTilt','PostSpawnJS','_eventIconSprite','setupEventsMoveCoreEffects','isDiagonalDirection','setupSpawn','RegionTouch','NOTE','_filename','STRUCT','prepareSpawnedEventAtRegion','processMoveRouteHugWall','getPlayerDiagonalSetting','TargetSwitchId','Map%1-Event%2','processMoveSynchMirrorHorz','refreshIfNeeded','processMoveRouteSetIndex','Game_Variables_value','_followerChaseOff','IconSet','findTargetSprite','frameCount','opacitySpeed','MoveRouteIndex','isPassableByAnyDirection','setCommonEvent','trigger','AutoBalloon','reverse\x20copy','EventId','page','Game_Timer_onExpire','Game_Map_unlockEvent','Game_Vehicle_isMapPassable','isDashDisabled','min','isOnLadder','mirror\x20horz','variableId','scale','isPassable','onCancel','_mapId','Forbid','JSON','round','$preloadedMap_%1','Setting','horz\x20mirror','getSelfTarget','_selfTarget','apply','shadowY','ROUTE_SCRIPT','pluginCommandCallEvent','Game_Map_setup','PosX','FollowerSetTargetChase','toUpperCase','processMoveRouteMoveTo','despawnTerrainTags','addLoadListener','jumpHeight','QUESTION','UPPER\x20LEFT','Game_Player_checkEventTriggerHere','DashingEnable','setEventLabelsVisible','initMoveSpeed','Window_NumberInput_start','forceMoveRoute','switches','_spriteOffsetX','meetActivationProximityConditions','FavorHorz','Toggle','MorphEventTo','loadCPC','_trigger','setBackgroundType','deltaX','FRUSTRATION','_eventOverload','VehicleDock','determineEventOverload','mapId','restoreSavedEventPosition','return\x20%1','boxWidth','CPCsMet','deleteIconsOnEventsDataKey','startMapCommonEventOnOK','539261MddzMg','SLEEP','PreloadedMaps','NORMAL','Game_Troop_meetsConditionsCPC','IconIndex','TurnInPlaceDelay','isLabelVisible','Spriteset_Map_createShadow','Game_CharacterBase_update','SelfSwitches','clearCarrying','realMoveSpeed','turnAwayFromPoint','update','Direction','setNumberInput','MUSIC','OFF','Walk','VisuMZ_0_CoreEngine','Step2MapId','checkEventTriggerEventsMoveCore','Region%1','unlockEvent','processMoveSynchReverseMimic','_eventSpawnData','startEncounterEffect','updatePattern','Window_Message_startMessage','fittingHeight','Game_Vehicle_initMoveSpeed','_pattern','moveSynchTarget','ANNOYED','_interpreter','eventLabelsVisible','distance','advancedFunc','setMovementSuccess','processMoveRouteSelfSwitch','_eventMorphData','_SavedEventLocations','character','startMapCommonEventOnTouch','clearSelfTarget','SelfVariableID','setBalloonPose','front','Self\x20Switch\x20%1','%1Dock','GetMoveSynchTarget','isMapPassable','labelWindowText','screenX','moveForward','list','some','clearPageSettings','convertVariableValuesInScriptCall','PlayerIconChange','processMoveRouteStepTo','KNEEL','hasEventIcon','_hidden','indexOf','Sprite_Character_setTileBitmap','lastMovedDirection','SILENCE','_speed','309mdVxTP','ITEM','ARRAYFUNC','parallelCommonEvents','registerSelfTarget','loadSystem','getEventIconData','createLowerLayer','processMoveRouteTeleportTo','SwitchGetSelfSwitchABCD','_shadowGraphic','makeDeepCopy','_characterSprites','setMoveSpeed','mirror\x20horizontal','_eventCopyData','outlineColor','VS8','direction','processOk','getPreservedMorphEventData','USER-DEFINED\x205','isSmartEventCollisionOn','morphInto','Scene_Load_onLoadSuccess','split','_screenZoomScale','setTileBitmap','processMoveRouteStepToCharacter','_comments','parameters','eraseEvent','StopAutoMoveMessages','PostCopyJS','shadowFilename','eventsXyNt','processMoveSynchRandom','map','processMoveCommandEventsMoveCore','createLabelWindowForTarget','isTargetEventValidForLabelWindow','processMoveSynchAway','_data','Disable','setupSaveEventLocations','createShadows','backY','isPlayerControlDisabled','Event','Game_Message_setNumberInput','shiftY','FALSE','moveTowardPoint','Hours','Sprite_Character_update','checkAdvancedSwitchVariablePresent','padZero','findDiagonalDirectionTo','splice','spriteId','AllForbid','isEventRunning','_commonEventId','Frames','away','left','Allow','mirror\x20vertical','isShadowVisible','setupEvents','bitmap','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ARRAYNUM','spawnPreserved','findDirectionTo','LEFT','isAllowCharacterTilt','selfValue','2kHyUOA','moveAwayFromCharacter','lastSpawnedEvent','_followerControlID','turnAwayFromCharacter','Enable','EventAutoMovement','processMoveSynchMirrorVert','createCharacterShadow','Game_Character_forceMoveRoute','Game_SelfSwitches_setValue','DefaultShadow','updatePose','Label','MorphEventRemove','isRegionForbidPass','processMoveRouteFadeOut','code','processMoveRoutePatternLock','Game_Temp_setDestination','activationRegionList','hasClickTrigger','removeChild','isWorking','_character','toLowerCase','_characterIndex','processDrawIcon','processMoveRouteJumpTo','updateEventIconSprite','EXCLAMATION','format','parent','deletePreservedMorphEventDataKey','setChaseOff','_saveEventLocation','isAdvancedSwitch','fontFace','Chase','roundYWithDirection','HURT','process_VisuMZ_EventsMoveCore_Switches_Variables','getInputDirection','getControlledFollowerID','Step2EventId','moveTowardCharacter','setFrames','Game_Troop_meetsConditions','isSaveEventLocations','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20<Copy\x20Event>\x20usage.','default','processMoveSynchCustom','setupMorphEvent','DashModifier','Game_Player_increaseSteps','PostMorphJS','PlayerAllow','isAirshipPassable','destinationX','visibleRange','setPattern','isCollidedWithEvents','isBusy','autosaveEventLocation','checkEventTriggerThere','179jZYJHY','fontSize','getEventIconIndex','SpawnEventDespawnRegions','Game_Event_meetsConditionsCPC','filter','vertical\x20mirror','ARRAYJSON','ConvertParams','processMoveRouteSelfVariable','Stop','executeMoveDir8','_eventIcon','IconSize','_commonEvents','_type','Game_Event_initialize','ARRAYSTR','onClickTrigger','Hidden','BufferX','BlendMode','SpawnEventDespawnAtXY','iconWidth','List','HMPH','PosY','Game_CharacterBase_moveStraight','setStopFollowerChasing','RemovePreserve','Game_Player_isDashing','EVAL','isValid','updatePatternEventsMoveCore','description','_seconds','checkEventTriggerAuto','4613QAzTAF','roundXWithDirection','labelWindowRange','meetsCPC','_needsPeriodicRefresh','Game_CharacterBase_hasStepAnime','_labelWindow','TerrainTags','regionId','blt','variableValid','isRegionAllowPass','eventsXy','Game_CharacterBase_moveDiagonally','_characterName','clear','_duration','_regionRules','Player','drawTextEx','_DisablePlayerControl','Sprite_Balloon_updatePosition','PageId','processMoveSynchMimic','SpawnEventAtRegion','correctFacingDirection','checkNeedForPeriodicRefresh','_forceDashing','_inputTime','morphIntoTemplate','isEventTest','_visibleEventY','updateText','_spawnedEvents','inBattle','isBigCharacter','_erased','canPassDiagonally','Game_CharacterBase_pattern','getPosingCharacterPattern','convertSelfVariableValuesInScriptCall','EventLabelVisible','Movement','exit','createShadow','terrainTag','type','CustomPageConditions','_visiblePlayerY','follower','posEventsMoveCore','setPlayerControlDisable','pageId','Game_CharacterBase_isDashing','USER-DEFINED\x202','EventIconDelete','region','_eventLabelOffsetY','ZZZ','VICTORY','FontSize','EnableDir8','isMovementSucceeded','RegionOk','processMoveRouteTeleportToCharacter','getSavedEventLocation','loadDataFile','AutoBuffer','canStartLocalEvents','updateRoutineMove','456041UqlZYv','TiltLeft','initFollowerController','zoomScale','createSpawnedEventWithData','startMessage','LIGHTBULB','isPressed','iconSize','EventTimerFramesSet','updateSelfMovement','setDestination','moveBackToRandomHome','createBitmap','clearDestination','_EventsMoveCoreSettings','_eventPageIndex','isPosing','TargetVariableId','bufferY','increaseSteps','Game_Map_events','smooth','setupRegionRestrictions','Value','moveSynchType','isSelfVariable','_randomHomeX','log','concat','AirshipSpeed','regionList','%1DockRegionOnly','deltaYFrom','turnRight90','isOnRope','create','isJumping','Game_Event_meetsConditions','Window_EventItem_onOk','despawnEventId','processMoveCommand','updateShadowChanges','All','OffsetX','IconBufferY','initMembersEventsMoveCore','backX','slice','Game_CharacterBase_setDirection','RIGHT','player','Name','EventLocationDelete','resizeWindow','timer','LOVE','radius','90001RPZtXE','CallEvent','max','row','_shadowOpacity','setDashingEnabled','followers','screenY','_poseDuration','_eventScreenY','COLLAPSE','removeTemporaryMapSpawnedEvents','isBattleTest','BufferY','_saveEventLocations','isShadowShrink','adjustDir8MovementSpeed','_event','checkActivationProximity','ShipSpeed','Scene_Map_startEncounterEffect','RandomMoveWeight','registerSelfEvent','PreloadMaps','FUNC','startMapCommonEventOnOKTarget','EventForbid','Ship','PreSpawnJS','_text','windowPadding','_eventErased','savePreservedMorphEventDataKey','frontY','isPreventSelfMovement','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','jump','clearEventCache','checkRegionEventTrigger','Scene_Boot_onDatabaseLoaded','isNearTheScreen','Region','Sprite_Balloon_setup','setEventIconData','contents','push','locate','_randomMoveWeight','2swGtyP','isDestinationValid','MapID','filename','StopAutoMoveEvents','trim','setFrame','DashEnableToggle','_spriteOffsetY','stop','setMoveRoute','setWaitMode','setPose','SelfVariables','Game_Event_start','setSelfValue','isSelfSwitch','TerrainTag','bind','UPPER\x20RIGHT','Speed','Game_Switches_value','processMoveRouteMoveUntilStop','approach','resume','updateMove','231622sxrRgm','Game_CharacterBase_direction','Template','opacity','Game_Event_moveTypeRandom','call','processMoveRouteStepFrom','_dragonbones','Game_Vehicle_isLandOk','CPC','checkValidEventerMap','meetsSwitchCondition','MUSIC\x20NOTE','FollowerSetGlobalChase','Game_Player_getInputDirection','setEventIconDataKey','AdvancedVariables','_eventOverloadThreshold','Game_CharacterBase_screenX','Game_Event_refresh','_moveRouteIndex','ARRAYSTRUCT','text','SpawnEventDespawnEverything','_expireCommonEvent','WalkForbid','_CPCs','_counter','despawnRegions','registerCommand','setupPageSettings','prepareSpawnedEventAtTerrainTag','Minutes','BitmapSmoothing','Collision','setupEventsMoveCoreCommentTags','enable','Game_Map_parallelCommonEvents','floor','constructor','add','VisuMZ_Setup_Preload_Map','_MapSpawnedEventData','turn180','_stopCount','Visible','updateWaitMode','LIGHT\x20BULB','Game_Switches_setValue','abs','_pageIndex','EventAllow','VariableId','isDashing','SWEAT','_pose','Game_Event_checkEventTriggerAuto','clearSpriteOffsets','setCharacterBitmap','characterPatternYVS8','updateParallel','blendMode','ADDITIVE','isRegionDockable','Game_Message_add','EventTemplates','bufferX','moveStraight','isStopFollowerChasing','Game_Character_setMoveRoute','isMoveOnlyRegionPassable','getLastPluginCommandInterpreter','deleteSavedEventLocationKey','turnLeft90','Game_Player_isMapPassable','gainFrames','DOWN','_advancedSwitchVariable','characterIndexVS8','pause','firstSpawnedEventID','_spriteset','Button','command357','posNt','HEART','_callEventData','onChange','isDashingEnabled','Operation','none','_moveOnlyRegions','getMapSpawnedEventData','Preserve','COBWEB','_opacity','_activationProximity','processMoveRouteJumpToCharacter','metCPC','ShowShadows','isAirship','unlock','Icon','Game_CharacterBase_initMembers','_PreservedEventMorphData','reverse','height','processMoveRouteStepToPlayer','iconHeight','updatePosition','NUM','%1Forbid','Game_CharacterBase_canPass','command108','isActive','EventTimerFramesGain','EventLocationCreate','EventLabelRefresh','right','event','clearDashing','MUSIC-NOTE','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','isAnyEventStarting','directionOnLadderSpriteVS8dir','contentsOpacity','clamp','visible','meetActivationRegionConditions','_forceCarrying','Game_Event_updateSelfMovement','updateEventsMoveCoreTagChanges','_clickTrigger','Game_Map_isDashDisabled','forceCarrying','canPass','updateMoveSynch','useCarryPoseForIcons','characterName','ARRAYEVAL','dir8','_eventCache','moveAwayFromPoint','_cacheVisibility','_eventLabelOffsetX','textSizeEx','isBoat','pattern','AdvancedSwitches','_eventId','moveRouteIndex','updateOpacity','BoatSpeed','USER-DEFINED\x203','mirror\x20vert','Game_SelfSwitches_value','addChild','advancedValue','random','Game_Player_executeMove','isTriggerIn','Letter','TemplateName','TRUE','EventTimerSpeed','rotation','moveByInput','pages','despawnAtXY','Game_Follower_chaseCharacter','_scene','isSpawnHitboxCollisionOk','hasAdvancedSwitchVariable','SpawnEventDespawnTerrainTags','getPosingCharacterIndex','initEventsMoveCoreEffects','VisuMZ_2_DragonbonesUnion','SelfSwitchABCD','Step1EventId','autoEventIconBuffer','updateVS8BalloonOffsets','_vehicleType','createIconSprite','Vehicle','characterIndex','removeMorph','OffsetY','chaseCharacter','onDatabaseLoaded','_alwaysUpdateMove','_visibleEventX','reverseDir','deleteIconsOnEventsData','RegionOkTarget','vehicle','updateScale','_working','Game_CharacterBase_increaseSteps','includes','onLoadSuccess','_callEventMap','isAutoBufferIcon','width','updatePeriodicRefresh','MapId','custom','setDirection','startCallEvent','initMembers','Rope','isAdvancedVariable','eventId','Sprite_Character_initMembers','activationProximityDistance','Game_Player_checkEventTriggerThere','LIGHT-BULB','frontX','3669dEDPdd','EventIconChange','setDiagonalDirection','checkEventsMoveCoreStringTags','_tilemap','executeCommand','innerWidth','getInputDir8','_periodicRefreshTimer','isSaveEventLocation','Game_Map_refresh','Self\x20Variable\x20%1','replace','checkSmartEventCollision','setControlledFollowerID','setItemChoice','anchor','hasStepAnime','Map%1.json','executeMove','Step1MapId','Sprite_Character_setCharacterBitmap','requestRefresh','RIGHT\x20TO\x20LEFT','Game_Map_update','_isObjectCharacter','findProperPageIndex','_shadowSprite','EventsMoveCore','Game_CharacterBase_updatePattern','isInVehicle','TiltVert','setOpacity','Game_System_initialize','SwitchId','spawnEventId','EventID','string','_encounterEffectDuration','EventTimerResume','prototype','_chaseOff','_labelWindows','Game_Event_clearPageSettings','setPlayerDiagonalSetting','PlayerMovementDiagonal','offsetY','DiagonalSpeedMultiplier','determineCommonEventsWithCPC','UNTITLED','checkEventTriggerHere','Passability','BalloonOffsetY','match','Game_CommonEvent_isActive','isMoving','setupCopyEvent','down'];const _0x1565=function(_0x157a11,_0x50e0c6){_0x157a11=_0x157a11-0x1d1;let _0x121d8b=_0x121d[_0x157a11];return _0x121d8b;};const _0x81ac0a=_0x1565;(function(_0x2d54d4,_0x4eef8e){const _0x2f4e83=_0x1565;while(!![]){try{const _0x1e91b6=-parseInt(_0x2f4e83(0x220))+-parseInt(_0x2f4e83(0x58a))*-parseInt(_0x2f4e83(0x1da))+-parseInt(_0x2f4e83(0x25a))*-parseInt(_0x2f4e83(0x549))+parseInt(_0x2f4e83(0x28a))*parseInt(_0x2f4e83(0x2a4))+parseInt(_0x2f4e83(0x4b5))*parseInt(_0x2f4e83(0x424))+-parseInt(_0x2f4e83(0x37d))*-parseInt(_0x2f4e83(0x4fb))+parseInt(_0x2f4e83(0x3e9))*-parseInt(_0x2f4e83(0x3f2));if(_0x1e91b6===_0x4eef8e)break;else _0x2d54d4['push'](_0x2d54d4['shift']());}catch(_0x5d971c){_0x2d54d4['push'](_0x2d54d4['shift']());}}}(_0x121d,0xc1af5));var label='EventsMoveCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x81ac0a(0x58f)](function(_0x2ce6d0){const _0x154ecf=_0x81ac0a;return _0x2ce6d0['status']&&_0x2ce6d0[_0x154ecf(0x1d7)][_0x154ecf(0x36a)]('['+label+']');})[0x0];VisuMZ[label][_0x81ac0a(0x446)]=VisuMZ[label][_0x81ac0a(0x446)]||{},VisuMZ[_0x81ac0a(0x592)]=function(_0x4ab714,_0x53abd6){const _0x3f993c=_0x81ac0a;for(const _0x304f11 in _0x53abd6){if(_0x304f11[_0x3f993c(0x3b2)](/(.*):(.*)/i)){const _0x192d44=String(RegExp['$1']),_0x241710=String(RegExp['$2'])[_0x3f993c(0x493)]()[_0x3f993c(0x28f)]();let _0x5a3aeb,_0x1d145d,_0x40dc3d;switch(_0x241710){case _0x3f993c(0x312):_0x5a3aeb=_0x53abd6[_0x304f11]!==''?Number(_0x53abd6[_0x304f11]):0x0;break;case _0x3f993c(0x543):_0x1d145d=_0x53abd6[_0x304f11]!==''?JSON[_0x3f993c(0x435)](_0x53abd6[_0x304f11]):[],_0x5a3aeb=_0x1d145d[_0x3f993c(0x520)](_0x52314b=>Number(_0x52314b));break;case _0x3f993c(0x1d4):_0x5a3aeb=_0x53abd6[_0x304f11]!==''?eval(_0x53abd6[_0x304f11]):null;break;case _0x3f993c(0x32f):_0x1d145d=_0x53abd6[_0x304f11]!==''?JSON[_0x3f993c(0x435)](_0x53abd6[_0x304f11]):[],_0x5a3aeb=_0x1d145d['map'](_0x587585=>eval(_0x587585));break;case _0x3f993c(0x485):_0x5a3aeb=_0x53abd6[_0x304f11]!==''?JSON['parse'](_0x53abd6[_0x304f11]):'';break;case _0x3f993c(0x591):_0x1d145d=_0x53abd6[_0x304f11]!==''?JSON[_0x3f993c(0x435)](_0x53abd6[_0x304f11]):[],_0x5a3aeb=_0x1d145d[_0x3f993c(0x520)](_0x339fcc=>JSON[_0x3f993c(0x435)](_0x339fcc));break;case _0x3f993c(0x272):_0x5a3aeb=_0x53abd6[_0x304f11]!==''?new Function(JSON[_0x3f993c(0x435)](_0x53abd6[_0x304f11])):new Function('return\x200');break;case _0x3f993c(0x4fd):_0x1d145d=_0x53abd6[_0x304f11]!==''?JSON[_0x3f993c(0x435)](_0x53abd6[_0x304f11]):[],_0x5a3aeb=_0x1d145d[_0x3f993c(0x520)](_0x5f47e6=>new Function(JSON[_0x3f993c(0x435)](_0x5f47e6)));break;case'STR':_0x5a3aeb=_0x53abd6[_0x304f11]!==''?String(_0x53abd6[_0x304f11]):'';break;case _0x3f993c(0x59b):_0x1d145d=_0x53abd6[_0x304f11]!==''?JSON[_0x3f993c(0x435)](_0x53abd6[_0x304f11]):[],_0x5a3aeb=_0x1d145d[_0x3f993c(0x520)](_0xfb95a4=>String(_0xfb95a4));break;case _0x3f993c(0x461):_0x40dc3d=_0x53abd6[_0x304f11]!==''?JSON[_0x3f993c(0x435)](_0x53abd6[_0x304f11]):{},_0x4ab714[_0x192d44]={},VisuMZ[_0x3f993c(0x592)](_0x4ab714[_0x192d44],_0x40dc3d);continue;case _0x3f993c(0x2b9):_0x1d145d=_0x53abd6[_0x304f11]!==''?JSON[_0x3f993c(0x435)](_0x53abd6[_0x304f11]):[],_0x5a3aeb=_0x1d145d[_0x3f993c(0x520)](_0x36adb6=>VisuMZ[_0x3f993c(0x592)]({},JSON[_0x3f993c(0x435)](_0x36adb6)));break;default:continue;}_0x4ab714[_0x192d44]=_0x5a3aeb;}}return _0x4ab714;},(_0x138532=>{const _0x1bdb59=_0x81ac0a,_0x410fd0=_0x138532['name'];for(const _0x51447e of dependencies){if(!Imported[_0x51447e]){alert(_0x1bdb59(0x27d)[_0x1bdb59(0x568)](_0x410fd0,_0x51447e)),SceneManager[_0x1bdb59(0x205)]();break;}}const _0x5e5228=_0x138532[_0x1bdb59(0x1d7)];if(_0x5e5228[_0x1bdb59(0x3b2)](/\[Version[ ](.*?)\]/i)){const _0x2fad4a=Number(RegExp['$1']);_0x2fad4a!==VisuMZ[label]['version']&&(alert(_0x1bdb59(0x542)[_0x1bdb59(0x568)](_0x410fd0,_0x2fad4a)),SceneManager['exit']());}if(_0x5e5228[_0x1bdb59(0x3b2)](/\[Tier[ ](\d+)\]/i)){const _0x41b001=Number(RegExp['$1']);_0x41b001<tier?(alert(_0x1bdb59(0x31e)['format'](_0x410fd0,_0x41b001,tier)),SceneManager[_0x1bdb59(0x205)]()):tier=Math['max'](_0x41b001,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x1bdb59(0x446)],_0x138532[_0x1bdb59(0x519)]);})(pluginData),VisuMZ['OperateValues']=function(_0x253a24,_0x36e222,_0x6c9399){switch(_0x6c9399){case'=':return _0x36e222;break;case'+':return _0x253a24+_0x36e222;break;case'-':return _0x253a24-_0x36e222;break;case'*':return _0x253a24*_0x36e222;break;case'/':return _0x253a24/_0x36e222;break;case'%':return _0x253a24%_0x36e222;break;}return _0x253a24;},PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],'AutoMoveEvents',_0x535239=>{const _0x2f4517=_0x81ac0a;VisuMZ[_0x2f4517(0x592)](_0x535239,_0x535239);switch(_0x535239[_0x2f4517(0x238)]){case _0x2f4517(0x53d):$gameSystem[_0x2f4517(0x3f1)](!![]);break;case _0x2f4517(0x594):$gameSystem['setAllowEventAutoMovement'](![]);break;case _0x2f4517(0x4a4):$gameSystem['setAllowEventAutoMovement'](!$gameSystem[_0x2f4517(0x438)]());break;}}),PluginManager['registerCommand'](pluginData['name'],_0x81ac0a(0x25b),_0x57f516=>{const _0x22f0e2=_0x81ac0a;VisuMZ[_0x22f0e2(0x592)](_0x57f516,_0x57f516);const _0x40fa04=$gameTemp[_0x22f0e2(0x2eb)](),_0xe6bcb0={'mapId':_0x57f516[_0x22f0e2(0x370)],'eventId':_0x57f516['EventId']||_0x40fa04[_0x22f0e2(0x377)](),'pageId':_0x57f516[_0x22f0e2(0x1f0)]};if(_0xe6bcb0[_0x22f0e2(0x4ae)]<=0x0)_0xe6bcb0['mapId']=$gameMap?$gameMap[_0x22f0e2(0x4ae)]():0x1;$gameTemp[_0x22f0e2(0x2eb)]()[_0x22f0e2(0x48f)](_0xe6bcb0);}),PluginManager['registerCommand'](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x291),_0x1faf04=>{const _0x3da904=_0x81ac0a;VisuMZ[_0x3da904(0x592)](_0x1faf04,_0x1faf04);switch(_0x1faf04[_0x3da904(0x238)]){case _0x3da904(0x54e):$gameSystem['setDashingEnabled'](!![]);break;case _0x3da904(0x526):$gameSystem[_0x3da904(0x25f)](![]);break;case _0x3da904(0x4a4):$gameSystem['setDashingEnabled'](!$gameSystem[_0x3da904(0x2fc)]());break;}}),PluginManager[_0x81ac0a(0x2c1)](pluginData['name'],_0x81ac0a(0x37e),_0x1c0b9b=>{const _0x417b59=_0x81ac0a;VisuMZ[_0x417b59(0x592)](_0x1c0b9b,_0x1c0b9b);const _0xdc58=$gameTemp[_0x417b59(0x2eb)]();_0x1c0b9b[_0x417b59(0x370)]=_0x1c0b9b[_0x417b59(0x370)]||$gameMap[_0x417b59(0x4ae)](),$gameSystem[_0x417b59(0x2b3)](_0x1c0b9b[_0x417b59(0x370)],_0x1c0b9b['EventId']||_0xdc58[_0x417b59(0x377)](),_0x1c0b9b[_0x417b59(0x4ba)],_0x1c0b9b['IconBufferX'],_0x1c0b9b['IconBufferY'],_0x1c0b9b[_0x417b59(0x434)]);}),PluginManager['registerCommand'](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x211),_0xc2d842=>{const _0x35be1d=_0x81ac0a;VisuMZ['ConvertParams'](_0xc2d842,_0xc2d842);const _0x88971e=$gameTemp[_0x35be1d(0x2eb)]();_0xc2d842[_0x35be1d(0x370)]=_0xc2d842['MapId']||$gameMap[_0x35be1d(0x4ae)](),$gameSystem[_0x35be1d(0x4b3)](_0xc2d842[_0x35be1d(0x370)],_0xc2d842['EventId']||_0x88971e[_0x35be1d(0x377)]());}),PluginManager['registerCommand'](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x319),_0xacb795=>{const _0x448697=_0x81ac0a;if($gameMap)for(const _0x1412e2 of $gameMap['events']()){_0x1412e2[_0x448697(0x443)]();}}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x203),_0x139423=>{const _0x4e1ce4=_0x81ac0a;VisuMZ[_0x4e1ce4(0x592)](_0x139423,_0x139423);switch(_0x139423[_0x4e1ce4(0x3d7)]){case _0x4e1ce4(0x2d1):$gameSystem[_0x4e1ce4(0x49c)](!![]);break;case _0x4e1ce4(0x59d):$gameSystem['setEventLabelsVisible'](![]);break;case _0x4e1ce4(0x4a4):$gameSystem[_0x4e1ce4(0x49c)](!$gameSystem[_0x4e1ce4(0x4d9)]());break;}}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],'EventLocationSave',_0x264526=>{const _0x1adbd4=_0x81ac0a;VisuMZ[_0x1adbd4(0x592)](_0x264526,_0x264526);const _0xbe4a6f=$gameTemp[_0x1adbd4(0x2eb)]();if(!$gameMap)return;const _0x52d925=$gameMap[_0x1adbd4(0x31b)](_0x264526[_0x1adbd4(0x476)]||_0xbe4a6f[_0x1adbd4(0x377)]());if(_0x52d925)_0x52d925['saveEventLocation']();}),PluginManager[_0x81ac0a(0x2c1)](pluginData['name'],_0x81ac0a(0x318),_0x535f22=>{const _0x1b5616=_0x81ac0a;VisuMZ['ConvertParams'](_0x535f22,_0x535f22);const _0x5906f4=$gameTemp[_0x1b5616(0x2eb)](),_0x48398c=_0x535f22[_0x1b5616(0x370)]||$gameMap[_0x1b5616(0x4ae)](),_0x259ad7=_0x535f22['EventId']||_0x5906f4[_0x1b5616(0x377)](),_0x1176e0=_0x535f22[_0x1b5616(0x491)]||0x0,_0x263c8f=_0x535f22[_0x1b5616(0x5a4)]||0x0,_0x8e4a81=_0x535f22[_0x1b5616(0x4c4)]||0x2,_0x122cd3=((_0x535f22['PageId']||0x1)-0x1)[_0x1b5616(0x322)](0x0,0x13),_0x4bc4f9=_0x535f22[_0x1b5616(0x470)]||0x0;$gameSystem['createSaveEventLocationData'](_0x48398c,_0x259ad7,_0x1176e0,_0x263c8f,_0x8e4a81,_0x122cd3,_0x4bc4f9);}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x255),_0xfa5bc0=>{const _0x340258=_0x81ac0a;VisuMZ[_0x340258(0x592)](_0xfa5bc0,_0xfa5bc0);const _0x394eed=$gameTemp[_0x340258(0x2eb)](),_0x2177e6=_0xfa5bc0[_0x340258(0x370)]||$gameMap[_0x340258(0x4ae)](),_0x123185=_0xfa5bc0[_0x340258(0x476)]||_0x394eed[_0x340258(0x377)]();$gameSystem[_0x340258(0x2ec)](_0x2177e6,_0x123185);}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x41e),_0x89172d=>{const _0x507286=_0x81ac0a;VisuMZ[_0x507286(0x592)](_0x89172d,_0x89172d);const _0x40c10e=_0x89172d['CommonEventID'];$gameTimer[_0x507286(0x472)](_0x40c10e);}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],'EventTimerExpireClear',_0x4bb2bb=>{const _0x3cdb72=_0x81ac0a;$gameTimer[_0x3cdb72(0x472)](0x0);}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x317),_0x26a1e3=>{const _0x334dca=_0x81ac0a;if(!$gameTimer['isWorking']())return;VisuMZ[_0x334dca(0x592)](_0x26a1e3,_0x26a1e3);let _0x15060a=0x0;_0x15060a+=_0x26a1e3[_0x334dca(0x53a)],_0x15060a+=_0x26a1e3[_0x334dca(0x3fb)]*0x3c,_0x15060a+=_0x26a1e3[_0x334dca(0x2c4)]*0x3c*0x3c,_0x15060a+=_0x26a1e3['Hours']*0x3c*0x3c*0x3c,$gameTimer[_0x334dca(0x2ef)](_0x15060a);}),PluginManager['registerCommand'](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x229),_0x4e5b16=>{const _0x47145f=_0x81ac0a;if(!$gameTimer['isWorking']())return;VisuMZ[_0x47145f(0x592)](_0x4e5b16,_0x4e5b16);let _0x9e7ed1=0x0;_0x9e7ed1+=_0x4e5b16[_0x47145f(0x53a)],_0x9e7ed1+=_0x4e5b16[_0x47145f(0x3fb)]*0x3c,_0x9e7ed1+=_0x4e5b16[_0x47145f(0x2c4)]*0x3c*0x3c,_0x9e7ed1+=_0x4e5b16[_0x47145f(0x530)]*0x3c*0x3c*0x3c,$gameTimer[_0x47145f(0x577)](_0x9e7ed1);}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],'EventTimerPause',_0x2bed4b=>{const _0x2bebd2=_0x81ac0a;if(!$gameTimer[_0x2bebd2(0x560)]())return;$gameTimer[_0x2bebd2(0x2f3)]();}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x3a4),_0x356855=>{const _0x3f4156=_0x81ac0a;if(!$gameTimer[_0x3f4156(0x560)]())return;$gameTimer[_0x3f4156(0x2a2)]();}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x348),_0x499690=>{const _0x2c80c2=_0x81ac0a;VisuMZ['ConvertParams'](_0x499690,_0x499690);const _0x443050=_0x499690[_0x2c80c2(0x29e)]||0x0;$gameTimer[_0x2c80c2(0x3c2)](_0x443050);}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x2b1),_0x7ef312=>{const _0x6a9870=_0x81ac0a;VisuMZ[_0x6a9870(0x592)](_0x7ef312,_0x7ef312);const _0x3ed309=!_0x7ef312[_0x6a9870(0x56f)];$gameSystem[_0x6a9870(0x1d1)](_0x3ed309);}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x492),_0x10eb9f=>{const _0x2aa45c=_0x81ac0a;VisuMZ[_0x2aa45c(0x592)](_0x10eb9f,_0x10eb9f);const _0xa35b27=(_0x10eb9f['FollowerID']||0x0)-0x1,_0x3f52d5=!_0x10eb9f[_0x2aa45c(0x56f)],_0x51da91=$gamePlayer[_0x2aa45c(0x260)]()[_0x2aa45c(0x20b)](_0xa35b27);if(_0x51da91)_0x51da91[_0x2aa45c(0x56b)](_0x3f52d5);}),PluginManager['registerCommand'](pluginData[_0x81ac0a(0x427)],'FollowerSetControl',_0x3bbf8b=>{const _0x3e4ee8=_0x81ac0a;VisuMZ[_0x3e4ee8(0x592)](_0x3bbf8b,_0x3bbf8b);const _0x675c55=_0x3bbf8b[_0x3e4ee8(0x3de)];$gameSystem[_0x3e4ee8(0x38b)](_0x675c55);}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x404),_0x2aa47f=>{const _0x4172a2=_0x81ac0a;VisuMZ[_0x4172a2(0x592)](_0x2aa47f,_0x2aa47f),$gameSystem[_0x4172a2(0x38b)](0x0),$gameSystem[_0x4172a2(0x1d1)](![]);for(const _0x570e39 of $gamePlayer['followers']()[_0x4172a2(0x525)]){if(_0x570e39)_0x570e39['setChaseOff'](![]);}}),PluginManager['registerCommand'](pluginData['name'],_0x81ac0a(0x504),_0x3dda2e=>{const _0x13e6ce=_0x81ac0a;VisuMZ[_0x13e6ce(0x592)](_0x3dda2e,_0x3dda2e);const _0x2e7be7=$gameTemp[_0x13e6ce(0x2eb)]();_0x3dda2e['MapId']=_0x3dda2e[_0x13e6ce(0x370)]||$gameMap['mapId']();const _0x1a5b39=[_0x3dda2e['MapId'],_0x3dda2e[_0x13e6ce(0x476)]||_0x2e7be7[_0x13e6ce(0x377)](),_0x3dda2e[_0x13e6ce(0x345)]],_0x19b0f8=_0x3dda2e[_0x13e6ce(0x465)],_0x4b2af4=$gameSelfSwitches[_0x13e6ce(0x3dc)](_0x1a5b39)||![];$gameSwitches[_0x13e6ce(0x421)](_0x19b0f8,_0x4b2af4);}),PluginManager['registerCommand'](pluginData[_0x81ac0a(0x427)],'SwitchGetSelfSwitchID',_0x365020=>{const _0x55dc93=_0x81ac0a;VisuMZ[_0x55dc93(0x592)](_0x365020,_0x365020);const _0x3efbe0=$gameTemp[_0x55dc93(0x2eb)]();_0x365020['MapId']=_0x365020['MapId']||$gameMap[_0x55dc93(0x4ae)]();const _0x333930=[_0x365020['MapId'],_0x365020['EventId']||_0x3efbe0['eventId'](),_0x55dc93(0x4e6)[_0x55dc93(0x568)](_0x365020[_0x55dc93(0x39f)])],_0x64edd2=_0x365020['TargetSwitchId'],_0x4bf99d=$gameSelfSwitches[_0x55dc93(0x3dc)](_0x333930)||![];$gameSwitches[_0x55dc93(0x421)](_0x64edd2,_0x4bf99d);}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x41c),_0x5a3210=>{const _0x5707a0=_0x81ac0a;VisuMZ[_0x5707a0(0x592)](_0x5a3210,_0x5a3210);const _0x15b4c6=$gameTemp[_0x5707a0(0x2eb)]();_0x5a3210[_0x5707a0(0x370)]=_0x5a3210['MapId']||$gameMap[_0x5707a0(0x4ae)]();const _0x3c9ab2=[_0x5a3210[_0x5707a0(0x370)],_0x5a3210[_0x5707a0(0x476)]||_0x15b4c6['eventId'](),_0x5707a0(0x388)[_0x5707a0(0x568)](_0x5a3210[_0x5707a0(0x2d8)])],_0x12bd68=_0x5a3210[_0x5707a0(0x232)],_0x3c0483=$gameSelfSwitches[_0x5707a0(0x3dc)](_0x3c9ab2)||![];$gameVariables['setValue'](_0x12bd68,_0x3c0483);}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x4a5),_0x2130fb=>{const _0x25114b=_0x81ac0a;VisuMZ[_0x25114b(0x592)](_0x2130fb,_0x2130fb);if(!$gameMap)return;const _0x345526=$gameTemp[_0x25114b(0x2eb)](),_0x4e616c=_0x2130fb['Step2Preserve'];_0x2130fb['Step1MapId']=_0x2130fb['Step1MapId']||$gameMap[_0x25114b(0x4ae)](),_0x2130fb[_0x25114b(0x4ca)]=_0x2130fb['Step2MapId']||$gameMap['mapId'](),_0x2130fb[_0x25114b(0x346)]=_0x2130fb[_0x25114b(0x346)][_0x25114b(0x493)]()['trim']();if(!_0x4e616c&&_0x2130fb[_0x25114b(0x391)]!==$gameMap[_0x25114b(0x4ae)]())return;if($gameMap[_0x25114b(0x4ae)]()===_0x2130fb[_0x25114b(0x391)]){const _0x1350c2=$gameMap[_0x25114b(0x31b)](_0x2130fb[_0x25114b(0x356)]||_0x345526[_0x25114b(0x377)]());if(!_0x1350c2)return;_0x2130fb[_0x25114b(0x346)]!=='UNTITLED'?_0x1350c2[_0x25114b(0x1f7)](_0x2130fb[_0x25114b(0x346)]):_0x1350c2[_0x25114b(0x512)](_0x2130fb[_0x25114b(0x4ca)],_0x2130fb[_0x25114b(0x575)]||_0x345526[_0x25114b(0x377)]());}_0x4e616c&&$gameSystem[_0x25114b(0x27a)](_0x2130fb[_0x25114b(0x391)],_0x2130fb[_0x25114b(0x356)],_0x2130fb[_0x25114b(0x346)],_0x2130fb['Step2MapId'],_0x2130fb[_0x25114b(0x575)]);}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x557),_0x49be03=>{const _0x5f0111=_0x81ac0a;VisuMZ[_0x5f0111(0x592)](_0x49be03,_0x49be03);if(!$gameMap)return;const _0x5a1c5f=$gameTemp[_0x5f0111(0x2eb)]();_0x49be03[_0x5f0111(0x370)]=_0x49be03[_0x5f0111(0x370)]||$gameMap['mapId']();if($gameMap['mapId']()===_0x49be03[_0x5f0111(0x370)]){const _0x535721=$gameMap[_0x5f0111(0x31b)](_0x49be03[_0x5f0111(0x476)]||_0x5a1c5f[_0x5f0111(0x377)]());_0x535721[_0x5f0111(0x35d)]();}_0x49be03[_0x5f0111(0x1d2)]&&$gameSystem['deletePreservedMorphEventDataKey'](_0x49be03[_0x5f0111(0x370)],_0x49be03[_0x5f0111(0x476)]||_0x5a1c5f[_0x5f0111(0x377)]());}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],'PlayerMovementChange',_0xc8bc35=>{const _0x14ed1c=_0x81ac0a;VisuMZ[_0x14ed1c(0x592)](_0xc8bc35,_0xc8bc35),$gameSystem[_0x14ed1c(0x20d)](!_0xc8bc35[_0x14ed1c(0x54e)]);}),PluginManager['registerCommand'](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x3aa),_0x5d3363=>{const _0x165671=_0x81ac0a;VisuMZ[_0x165671(0x592)](_0x5d3363,_0x5d3363),$gameSystem[_0x165671(0x3a9)](_0x5d3363[_0x165671(0x488)]);}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x4f1),_0x2e3c13=>{const _0x18ac6c=_0x81ac0a;VisuMZ[_0x18ac6c(0x592)](_0x2e3c13,_0x2e3c13),$gameSystem[_0x18ac6c(0x285)]($gamePlayer,_0x2e3c13[_0x18ac6c(0x4ba)],_0x2e3c13['IconBufferX'],_0x2e3c13[_0x18ac6c(0x24d)],_0x2e3c13[_0x18ac6c(0x434)]);}),PluginManager['registerCommand'](pluginData[_0x81ac0a(0x427)],'PlayerIconDelete',_0x152380=>{const _0xfa954e=_0x81ac0a;VisuMZ[_0xfa954e(0x592)](_0x152380,_0x152380),$gameSystem[_0xfa954e(0x364)]($gamePlayer);}),PluginManager[_0x81ac0a(0x2c1)](pluginData['name'],_0x81ac0a(0x355),_0x555f1b=>{const _0x64022c=_0x81ac0a;VisuMZ[_0x64022c(0x592)](_0x555f1b,_0x555f1b);const _0x3def66=$gameTemp['getLastPluginCommandInterpreter']();_0x555f1b[_0x64022c(0x370)]=_0x555f1b[_0x64022c(0x370)]||$gameMap['mapId']();const _0x180012=[_0x555f1b[_0x64022c(0x370)],_0x555f1b['EventId']||_0x3def66[_0x64022c(0x377)](),_0x555f1b[_0x64022c(0x345)]];switch(_0x555f1b[_0x64022c(0x238)]){case'ON':$gameSelfSwitches['setValue'](_0x180012,!![]);break;case _0x64022c(0x4c7):$gameSelfSwitches['setValue'](_0x180012,![]);break;case _0x64022c(0x4a4):$gameSelfSwitches[_0x64022c(0x421)](_0x180012,!$gameSelfSwitches['value'](_0x180012));break;}}),PluginManager['registerCommand'](pluginData['name'],'SelfSwitchID',_0x5850a4=>{const _0x15faf5=_0x81ac0a;VisuMZ[_0x15faf5(0x592)](_0x5850a4,_0x5850a4);const _0x2d3dcb=$gameTemp[_0x15faf5(0x2eb)]();_0x5850a4['MapId']=_0x5850a4[_0x15faf5(0x370)]||$gameMap[_0x15faf5(0x4ae)]();const _0x463d81=[_0x5850a4['MapId'],_0x5850a4['EventId']||_0x2d3dcb[_0x15faf5(0x377)](),_0x15faf5(0x4e6)[_0x15faf5(0x568)](_0x5850a4[_0x15faf5(0x39f)])];switch(_0x5850a4['Value']){case'ON':$gameSelfSwitches['setValue'](_0x463d81,!![]);break;case _0x15faf5(0x4c7):$gameSelfSwitches[_0x15faf5(0x421)](_0x463d81,![]);break;case _0x15faf5(0x4a4):$gameSelfSwitches[_0x15faf5(0x421)](_0x463d81,!$gameSelfSwitches[_0x15faf5(0x3dc)](_0x463d81));break;}}),PluginManager[_0x81ac0a(0x2c1)](pluginData['name'],_0x81ac0a(0x4e3),_0x52dd6b=>{const _0x416ab7=_0x81ac0a;VisuMZ['ConvertParams'](_0x52dd6b,_0x52dd6b);const _0x33cd6b=$gameTemp[_0x416ab7(0x2eb)]();_0x52dd6b[_0x416ab7(0x370)]=_0x52dd6b['MapId']||$gameMap[_0x416ab7(0x4ae)]();const _0x335036=[_0x52dd6b[_0x416ab7(0x370)],_0x52dd6b['EventId']||_0x33cd6b[_0x416ab7(0x377)](),_0x416ab7(0x388)['format'](_0x52dd6b[_0x416ab7(0x2d8)])],_0xefc2d6=VisuMZ[_0x416ab7(0x3da)]($gameSelfSwitches['value'](_0x335036),_0x52dd6b['Value'],_0x52dd6b[_0x416ab7(0x2fd)]);$gameSelfSwitches[_0x416ab7(0x421)](_0x335036,_0xefc2d6);}),PluginManager['registerCommand'](pluginData[_0x81ac0a(0x427)],'SpawnEventAtXY',_0x17f88e=>{const _0x54ad47=_0x81ac0a;VisuMZ['ConvertParams'](_0x17f88e,_0x17f88e);const _0x664e2c=$gameTemp['getLastPluginCommandInterpreter'](),_0x449638={'template':_0x17f88e[_0x54ad47(0x346)],'mapId':_0x17f88e[_0x54ad47(0x370)]||$gameMap[_0x54ad47(0x4ae)](),'eventId':_0x17f88e['EventId']||_0x664e2c[_0x54ad47(0x377)](),'x':_0x17f88e[_0x54ad47(0x491)],'y':_0x17f88e[_0x54ad47(0x5a4)],'spawnPreserved':_0x17f88e[_0x54ad47(0x301)],'spawnEventId':$gameMap[_0x54ad47(0x1fb)][_0x54ad47(0x3c6)]+0x3e8},_0x546e62=_0x17f88e[_0x54ad47(0x407)]||0x0,_0x4e7dfe=$gameMap['prepareSpawnedEventAtXY'](_0x449638,_0x17f88e[_0x54ad47(0x2c6)],_0x17f88e[_0x54ad47(0x3b0)]);_0x546e62&&$gameSwitches[_0x54ad47(0x421)](_0x546e62,!!_0x4e7dfe);}),PluginManager['registerCommand'](pluginData['name'],_0x81ac0a(0x1f2),_0x4a4c32=>{const _0x76978b=_0x81ac0a;VisuMZ[_0x76978b(0x592)](_0x4a4c32,_0x4a4c32);const _0x625ae9=$gameTemp[_0x76978b(0x2eb)](),_0x310501={'template':_0x4a4c32[_0x76978b(0x346)],'mapId':_0x4a4c32['MapId']||$gameMap['mapId'](),'eventId':_0x4a4c32[_0x76978b(0x476)]||_0x625ae9[_0x76978b(0x377)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x4a4c32['Preserve'],'spawnEventId':$gameMap[_0x76978b(0x1fb)][_0x76978b(0x3c6)]+0x3e8},_0x108086=_0x4a4c32[_0x76978b(0x407)]||0x0,_0x16dd60=$gameMap[_0x76978b(0x462)](_0x310501,_0x4a4c32[_0x76978b(0x283)],_0x4a4c32[_0x76978b(0x2c6)],_0x4a4c32[_0x76978b(0x3b0)]);_0x108086&&$gameSwitches[_0x76978b(0x421)](_0x108086,!!_0x16dd60);}),PluginManager['registerCommand'](pluginData['name'],_0x81ac0a(0x3d5),_0x238463=>{const _0x5b4c5b=_0x81ac0a;VisuMZ[_0x5b4c5b(0x592)](_0x238463,_0x238463);const _0x5bc38d=$gameTemp[_0x5b4c5b(0x2eb)](),_0x20f380={'template':_0x238463[_0x5b4c5b(0x346)],'mapId':_0x238463['MapId']||$gameMap[_0x5b4c5b(0x4ae)](),'eventId':_0x238463[_0x5b4c5b(0x476)]||_0x5bc38d['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x238463[_0x5b4c5b(0x301)],'spawnEventId':$gameMap[_0x5b4c5b(0x1fb)][_0x5b4c5b(0x3c6)]+0x3e8},_0x1d6256=_0x238463[_0x5b4c5b(0x407)]||0x0,_0x86f80b=$gameMap['prepareSpawnedEventAtTerrainTag'](_0x20f380,_0x238463['TerrainTags'],_0x238463[_0x5b4c5b(0x2c6)],_0x238463[_0x5b4c5b(0x3b0)]);_0x1d6256&&$gameSwitches[_0x5b4c5b(0x421)](_0x1d6256,!!_0x86f80b);}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],'SpawnEventDespawnEventID',_0x267bb2=>{const _0x2c7c2a=_0x81ac0a;VisuMZ[_0x2c7c2a(0x592)](_0x267bb2,_0x267bb2);const _0x5d45c7=$gameTemp[_0x2c7c2a(0x2eb)]();$gameMap[_0x2c7c2a(0x248)](_0x267bb2[_0x2c7c2a(0x3a1)]||_0x5d45c7[_0x2c7c2a(0x377)]());}),PluginManager['registerCommand'](pluginData['name'],_0x81ac0a(0x5a0),_0x1fc6b6=>{const _0x296dea=_0x81ac0a;VisuMZ[_0x296dea(0x592)](_0x1fc6b6,_0x1fc6b6);const _0x338f1c=_0x1fc6b6[_0x296dea(0x491)],_0x4578fb=_0x1fc6b6[_0x296dea(0x5a4)];$gameMap[_0x296dea(0x34c)](_0x338f1c,_0x4578fb);}),PluginManager['registerCommand'](pluginData['name'],_0x81ac0a(0x58d),_0x5db4b1=>{const _0x1441de=_0x81ac0a;VisuMZ[_0x1441de(0x592)](_0x5db4b1,_0x5db4b1),$gameMap[_0x1441de(0x2c0)](_0x5db4b1[_0x1441de(0x283)]);}),PluginManager['registerCommand'](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x351),_0x338629=>{const _0x8269b3=_0x81ac0a;VisuMZ[_0x8269b3(0x592)](_0x338629,_0x338629),$gameMap[_0x8269b3(0x495)](_0x338629[_0x8269b3(0x1e1)]);}),PluginManager[_0x81ac0a(0x2c1)](pluginData[_0x81ac0a(0x427)],_0x81ac0a(0x2bb),_0x4f5f78=>{VisuMZ['ConvertParams'](_0x4f5f78,_0x4f5f78),$gameMap['despawnEverything']();}),VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x281)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x81ac0a(0x3a5)][_0x81ac0a(0x360)]=function(){const _0x2bcbda=_0x81ac0a;VisuMZ[_0x2bcbda(0x399)][_0x2bcbda(0x281)][_0x2bcbda(0x2a9)](this),this['process_VisuMZ_EventsMoveCore_LoadTemplateMaps'](),this[_0x2bcbda(0x572)]();if(VisuMZ[_0x2bcbda(0x399)][_0x2bcbda(0x209)])VisuMZ[_0x2bcbda(0x399)][_0x2bcbda(0x209)]['initialize']();},VisuMZ['PreloadedMaps']=[],VisuMZ['EventTemplates']={},Scene_Boot[_0x81ac0a(0x3a5)]['process_VisuMZ_EventsMoveCore_LoadTemplateMaps']=function(){const _0x58822f=_0x81ac0a;if(DataManager['isBattleTest']()||DataManager[_0x58822f(0x1f8)]())return;const _0x1992ca=VisuMZ['EventsMoveCore'][_0x58822f(0x446)][_0x58822f(0x2a6)],_0x289dd7=_0x1992ca[_0x58822f(0x271)][_0x58822f(0x250)](0x0);for(const _0x48101a of _0x1992ca[_0x58822f(0x5a2)]){_0x48101a['Name']=_0x48101a[_0x58822f(0x254)]['toUpperCase']()[_0x58822f(0x28f)](),VisuMZ[_0x58822f(0x2e5)][_0x48101a[_0x58822f(0x254)]]=_0x48101a;if(!_0x289dd7[_0x58822f(0x36a)](_0x48101a[_0x58822f(0x28c)]))_0x289dd7[_0x58822f(0x287)](_0x48101a[_0x58822f(0x28c)]);}for(const _0x19eeeb of _0x289dd7){if(VisuMZ[_0x58822f(0x4b7)][_0x19eeeb])continue;const _0xcf5202=_0x58822f(0x38f)[_0x58822f(0x568)](_0x19eeeb['padZero'](0x3)),_0x124899=_0x58822f(0x487)[_0x58822f(0x568)](_0x19eeeb);DataManager[_0x58822f(0x21c)](_0x124899,_0xcf5202),setTimeout(this['VisuMZ_Setup_Preload_Map'][_0x58822f(0x29c)](this,_0x19eeeb,_0x124899),0x64);}},Scene_Boot[_0x81ac0a(0x3a5)][_0x81ac0a(0x2cd)]=function(_0x24d85a,_0x4de5e2){const _0x5e1d32=_0x81ac0a;window[_0x4de5e2]?(VisuMZ[_0x5e1d32(0x4b7)][_0x24d85a]=window[_0x4de5e2],window[_0x4de5e2]=undefined):setTimeout(this[_0x5e1d32(0x2cd)][_0x5e1d32(0x29c)](this,_0x24d85a,_0x4de5e2),0x64);},VisuMZ[_0x81ac0a(0x338)]=[],VisuMZ[_0x81ac0a(0x4bf)]=[],VisuMZ[_0x81ac0a(0x2b4)]=[],VisuMZ[_0x81ac0a(0x297)]=[],Scene_Boot['prototype'][_0x81ac0a(0x572)]=function(){const _0x1233b9=_0x81ac0a;for(let _0x48a340=0x1;_0x48a340<$dataSystem['switches'][_0x1233b9(0x3c6)];_0x48a340++){if($dataSystem[_0x1233b9(0x4a0)][_0x48a340][_0x1233b9(0x3b2)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x1233b9(0x338)]['push'](_0x48a340);if($dataSystem[_0x1233b9(0x4a0)][_0x48a340][_0x1233b9(0x3b2)](/<SELF>/i))VisuMZ[_0x1233b9(0x4bf)]['push'](_0x48a340);}for(let _0x1a9b4e=0x1;_0x1a9b4e<$dataSystem['variables'][_0x1233b9(0x3c6)];_0x1a9b4e++){if($dataSystem[_0x1233b9(0x43a)][_0x1a9b4e][_0x1233b9(0x3b2)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x1233b9(0x2b4)][_0x1233b9(0x287)](_0x1a9b4e);if($dataSystem['variables'][_0x1a9b4e][_0x1233b9(0x3b2)](/<SELF>/i))VisuMZ['SelfVariables'][_0x1233b9(0x287)](_0x1a9b4e);}},VisuMZ['EventsMoveCore'][_0x81ac0a(0x209)]={},VisuMZ[_0x81ac0a(0x399)]['CustomPageConditions'][_0x81ac0a(0x418)]=function(){const _0x4cf25=_0x81ac0a;this[_0x4cf25(0x4d8)]=new Game_CPCInterpreter(),this[_0x4cf25(0x3ad)]();},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x209)][_0x81ac0a(0x3ad)]=function(){const _0x352491=_0x81ac0a;this[_0x352491(0x598)]=[];for(const _0x2507f1 of $dataCommonEvents){if(!_0x2507f1)continue;VisuMZ['EventsMoveCore']['CustomPageConditions']['loadCPC'](_0x2507f1);if(_0x2507f1[_0x352491(0x2ad)][_0x352491(0x3c6)]>0x0)this[_0x352491(0x598)][_0x352491(0x287)](_0x2507f1['id']);}},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x209)][_0x81ac0a(0x306)]=function(_0x2dcccd,_0x267cbb){const _0x3e9aa4=_0x81ac0a;return this['_interpreter'][_0x3e9aa4(0x430)](_0x2dcccd,_0x267cbb),this[_0x3e9aa4(0x4d8)][_0x3e9aa4(0x3d1)](),this[_0x3e9aa4(0x4d8)]['_cpc'];},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x209)][_0x81ac0a(0x4a6)]=function(_0xbbec06){const _0x4e1171=_0x81ac0a;let _0x5b2ff8=![];_0xbbec06[_0x4e1171(0x2ad)]=[];for(const _0x1d0e91 of _0xbbec06[_0x4e1171(0x4ed)]){if([0x6c,0x198]['includes'](_0x1d0e91['code'])){const _0x2ebdd6=_0x1d0e91[_0x4e1171(0x519)][0x0];if(_0x2ebdd6[_0x4e1171(0x3b2)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x5b2ff8=!![];else _0x2ebdd6[_0x4e1171(0x3b2)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x5b2ff8=![]);}_0x5b2ff8&&_0xbbec06[_0x4e1171(0x2ad)][_0x4e1171(0x287)](_0x1d0e91);}},getSelfSwitchValue=function(_0x275069,_0x4c4a09,_0x2ff9ad){const _0xd83137=_0x81ac0a;let _0xaba72b=[_0x275069,_0x4c4a09,_0xd83137(0x4e6)[_0xd83137(0x568)](_0x2ff9ad)];return typeof _0x2ff9ad===_0xd83137(0x3a2)&&(_0xaba72b=[_0x275069,_0x4c4a09,_0x2ff9ad[_0xd83137(0x493)]()[_0xd83137(0x28f)]()]),$gameSelfSwitches[_0xd83137(0x3dc)](_0xaba72b);},getSelfVariableValue=function(_0x2adf6c,_0x356a66,_0x2c6de5){const _0x1827cd=_0x81ac0a,_0xbcc767=[_0x2adf6c,_0x356a66,'Self\x20Variable\x20%1'[_0x1827cd(0x568)](_0x2c6de5)];return $gameSelfSwitches[_0x1827cd(0x3dc)](_0xbcc767);},setSelfSwitchValue=function(_0x466557,_0xbb9aa3,_0x2180de,_0x406b10){const _0x460f44=_0x81ac0a;let _0x47055c=[_0x466557,_0xbb9aa3,_0x460f44(0x4e6)['format'](_0x2180de)];typeof _0x2180de===_0x460f44(0x3a2)&&(_0x47055c=[_0x466557,_0xbb9aa3,_0x2180de[_0x460f44(0x493)]()[_0x460f44(0x28f)]()]);},setSelfVariableValue=function(_0x89e7c4,_0x18a715,_0x1ab494,_0x274fe4){const _0x5e9bee=_0x81ac0a,_0xf6e4e0=[_0x89e7c4,_0x18a715,_0x5e9bee(0x388)[_0x5e9bee(0x568)](_0x1ab494)];},DataManager[_0x81ac0a(0x56d)]=function(_0x2503cd){const _0x5892ac=_0x81ac0a;if(SceneManager[_0x5892ac(0x34e)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x5892ac(0x338)][_0x5892ac(0x36a)](_0x2503cd);},DataManager[_0x81ac0a(0x376)]=function(_0x1e20ec){const _0x1809d2=_0x81ac0a;if(SceneManager[_0x1809d2(0x34e)][_0x1809d2(0x2cb)]===Scene_Debug)return![];return VisuMZ['AdvancedVariables'][_0x1809d2(0x36a)](_0x1e20ec);},DataManager[_0x81ac0a(0x29a)]=function(_0x276192){const _0x452a8e=_0x81ac0a;if(SceneManager[_0x452a8e(0x34e)][_0x452a8e(0x2cb)]===Scene_Debug)return![];return VisuMZ[_0x452a8e(0x4bf)]['includes'](_0x276192);},DataManager[_0x81ac0a(0x23a)]=function(_0x48cbab){const _0x2efdbd=_0x81ac0a;if(SceneManager[_0x2efdbd(0x34e)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x2efdbd(0x297)][_0x2efdbd(0x36a)](_0x48cbab);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x55c)]=Game_Temp[_0x81ac0a(0x3a5)]['setDestination'],Game_Temp[_0x81ac0a(0x3a5)][_0x81ac0a(0x22b)]=function(_0x475ecf,_0x3eabd3){const _0x5d3654=_0x81ac0a;if(this[_0x5d3654(0x3be)](_0x475ecf,_0x3eabd3))return;VisuMZ[_0x5d3654(0x399)]['Game_Temp_setDestination'][_0x5d3654(0x2a9)](this,_0x475ecf,_0x3eabd3);},Game_Temp[_0x81ac0a(0x3a5)][_0x81ac0a(0x3be)]=function(_0x4338dc,_0x2c929a){const _0x1b25e8=_0x81ac0a,_0x1be290=$gameMap[_0x1b25e8(0x1e6)](_0x4338dc,_0x2c929a);for(const _0x523303 of _0x1be290){if(_0x523303&&_0x523303[_0x1b25e8(0x55e)]())return _0x523303[_0x1b25e8(0x59c)](),!![];}return![];},Game_Temp['prototype'][_0x81ac0a(0x413)]=function(_0x4de5ea){const _0x3f201d=_0x81ac0a;this[_0x3f201d(0x3d8)]=_0x4de5ea;},Game_Temp['prototype'][_0x81ac0a(0x2eb)]=function(){const _0x4adbbb=_0x81ac0a;return this[_0x4adbbb(0x3d8)];},Game_Temp[_0x81ac0a(0x3a5)]['registerSelfTarget']=function(_0x46f8cd){const _0x5032c5=_0x81ac0a;this[_0x5032c5(0x48b)]=_0x46f8cd;},Game_Temp[_0x81ac0a(0x3a5)][_0x81ac0a(0x4e2)]=function(){const _0x1600d6=_0x81ac0a;this[_0x1600d6(0x48b)]=undefined;},Game_Temp[_0x81ac0a(0x3a5)]['getSelfTarget']=function(){const _0x69b510=_0x81ac0a;return this[_0x69b510(0x48b)];},VisuMZ['EventsMoveCore'][_0x81ac0a(0x39e)]=Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x418)],Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x418)]=function(){const _0x1ed8a8=_0x81ac0a;VisuMZ[_0x1ed8a8(0x399)]['Game_System_initialize']['call'](this),this[_0x1ed8a8(0x3dd)](),this[_0x1ed8a8(0x222)]();},Game_System['prototype']['initEventsMoveCore']=function(){const _0x32b5ed=_0x81ac0a;this[_0x32b5ed(0x22f)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x32b5ed(0x439)]={},this[_0x32b5ed(0x2ce)]=[],this[_0x32b5ed(0x30c)]={},this['_SavedEventLocations']={},this[_0x32b5ed(0x1ee)]=![],this['_PlayerDiagonalSetting']=_0x32b5ed(0x57b);},Game_System[_0x81ac0a(0x3a5)]['isDashingEnabled']=function(){const _0x4ecabb=_0x81ac0a;if(this[_0x4ecabb(0x22f)]===undefined)this['initEventsMoveCore']();if(this[_0x4ecabb(0x22f)][_0x4ecabb(0x49b)]===undefined)this[_0x4ecabb(0x3dd)]();return this['_EventsMoveCoreSettings'][_0x4ecabb(0x49b)];},Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x25f)]=function(_0x577bb8){const _0x1a0fc3=_0x81ac0a;if(this[_0x1a0fc3(0x22f)]===undefined)this['initEventsMoveCore']();if(this[_0x1a0fc3(0x22f)][_0x1a0fc3(0x49b)]===undefined)this[_0x1a0fc3(0x3dd)]();this[_0x1a0fc3(0x22f)][_0x1a0fc3(0x49b)]=_0x577bb8;},Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x438)]=function(){const _0x260f88=_0x81ac0a;if(this[_0x260f88(0x22f)]===undefined)this[_0x260f88(0x3dd)]();if(this[_0x260f88(0x22f)]['EventAutoMovement']===undefined)this['initEventsMoveCore']();return this['_EventsMoveCoreSettings'][_0x260f88(0x54f)];},Game_System['prototype'][_0x81ac0a(0x3f1)]=function(_0x364452){const _0x20ebe8=_0x81ac0a;if(this[_0x20ebe8(0x22f)]===undefined)this[_0x20ebe8(0x3dd)]();if(this[_0x20ebe8(0x22f)][_0x20ebe8(0x54f)]===undefined)this[_0x20ebe8(0x3dd)]();this[_0x20ebe8(0x22f)]['EventAutoMovement']=_0x364452;},Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x4d9)]=function(){const _0xca793=_0x81ac0a;if(this[_0xca793(0x22f)]===undefined)this[_0xca793(0x3dd)]();if(this[_0xca793(0x22f)]['VisibleEventLabels']===undefined)this[_0xca793(0x3dd)]();return this['_EventsMoveCoreSettings']['VisibleEventLabels'];},Game_System[_0x81ac0a(0x3a5)]['setEventLabelsVisible']=function(_0x5bab6f){const _0x26c21d=_0x81ac0a;if(this[_0x26c21d(0x22f)]===undefined)this[_0x26c21d(0x3dd)]();if(this[_0x26c21d(0x22f)]['VisibleEventLabels']===undefined)this[_0x26c21d(0x3dd)]();this[_0x26c21d(0x22f)]['VisibleEventLabels']=_0x5bab6f;},Game_System['prototype'][_0x81ac0a(0x52a)]=function(){const _0x45a0e4=_0x81ac0a;return this[_0x45a0e4(0x1ee)]===undefined&&(this[_0x45a0e4(0x1ee)]=![]),this[_0x45a0e4(0x1ee)];},Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x20d)]=function(_0x3588ad){const _0x2a4e07=_0x81ac0a;this[_0x2a4e07(0x1ee)]=_0x3588ad;},Game_System['prototype'][_0x81ac0a(0x464)]=function(){const _0x2f7e26=_0x81ac0a;return this[_0x2f7e26(0x40f)];},Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x3a9)]=function(_0x445a12){const _0x4beeff=_0x81ac0a;this['_PlayerDiagonalSetting']=String(_0x445a12)[_0x4beeff(0x562)]()[_0x4beeff(0x28f)]();},Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x501)]=function(_0x2d19ba){const _0x5b29e8=_0x81ac0a;if(this[_0x5b29e8(0x439)]===undefined)this['initEventsMoveCore']();if(!_0x2d19ba)return null;if(_0x2d19ba===$gamePlayer)return this[_0x5b29e8(0x439)][_0x5b29e8(0x1ec)];else{const _0x103495=VisuMZ[_0x5b29e8(0x399)][_0x5b29e8(0x446)],_0x51048a=_0x5b29e8(0x466)[_0x5b29e8(0x568)](_0x2d19ba[_0x5b29e8(0x483)],_0x2d19ba[_0x5b29e8(0x339)]);return this['_EventIcons'][_0x51048a]=this[_0x5b29e8(0x439)][_0x51048a]||{'iconIndex':0x0,'bufferX':_0x103495[_0x5b29e8(0x30a)]['BufferX'],'bufferY':_0x103495[_0x5b29e8(0x30a)]['BufferY'],'blendMode':_0x103495[_0x5b29e8(0x30a)][_0x5b29e8(0x59f)]},this[_0x5b29e8(0x439)][_0x51048a];}},Game_System['prototype'][_0x81ac0a(0x285)]=function(_0x588277,_0x1f4dfd,_0x44ac73,_0x1de7c8,_0x27eab7){const _0x397fba=_0x81ac0a;if(this[_0x397fba(0x439)]===undefined)this[_0x397fba(0x3dd)]();const _0x5e587a=_0x588277===$gamePlayer?_0x397fba(0x1ec):_0x397fba(0x466)[_0x397fba(0x568)](_0x588277[_0x397fba(0x483)],_0x588277[_0x397fba(0x339)]);this[_0x397fba(0x439)][_0x5e587a]={'iconIndex':_0x1f4dfd,'bufferX':_0x44ac73,'bufferY':_0x1de7c8,'blendMode':_0x27eab7};},Game_System['prototype'][_0x81ac0a(0x2b3)]=function(_0x484d8f,_0x10a746,_0x41ee09,_0x3276ac,_0x4b5691,_0xbaeeac){const _0x274237=_0x81ac0a;if(this[_0x274237(0x439)]===undefined)this[_0x274237(0x3dd)]();const _0x392230=_0x274237(0x466)[_0x274237(0x568)](_0x484d8f,_0x10a746);this[_0x274237(0x439)][_0x392230]={'iconIndex':_0x41ee09,'bufferX':_0x3276ac,'bufferY':_0x4b5691,'blendMode':_0xbaeeac};},Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x364)]=function(_0x3b3f52){const _0x1262fa=_0x81ac0a;if(this[_0x1262fa(0x439)]===undefined)this[_0x1262fa(0x3dd)]();if(!_0x3b3f52)return null;_0x3b3f52===$gamePlayer?delete this['_EventIcons'][_0x1262fa(0x1ec)]:this[_0x1262fa(0x4b3)](_0x3b3f52[_0x1262fa(0x483)],_0x3b3f52[_0x1262fa(0x339)]);},Game_System['prototype'][_0x81ac0a(0x4b3)]=function(_0xe6b022,_0x2ce967){const _0x5c03db=_0x81ac0a;if(this['_EventIcons']===undefined)this[_0x5c03db(0x3dd)]();const _0x1fa2a4=_0x5c03db(0x466)[_0x5c03db(0x568)](_0xe6b022,_0x2ce967);delete this[_0x5c03db(0x439)][_0x1fa2a4];},Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x21b)]=function(_0x862bdc){const _0x17fed4=_0x81ac0a;if(this[_0x17fed4(0x4df)]===undefined)this['initEventsMoveCore']();if(!_0x862bdc)return null;const _0x393c48=_0x17fed4(0x466)[_0x17fed4(0x568)](_0x862bdc[_0x17fed4(0x483)],_0x862bdc[_0x17fed4(0x339)]);return this[_0x17fed4(0x4df)][_0x393c48];},Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x44f)]=function(_0x5ef2b5){const _0x4226ec=_0x81ac0a;if(this['_SavedEventLocations']===undefined)this[_0x4226ec(0x3dd)]();if(!_0x5ef2b5)return;const _0x3d2b96=_0x4226ec(0x466)[_0x4226ec(0x568)](_0x5ef2b5[_0x4226ec(0x483)],_0x5ef2b5[_0x4226ec(0x339)]);this[_0x4226ec(0x4df)][_0x3d2b96]={'direction':_0x5ef2b5[_0x4226ec(0x50d)](),'x':Math['round'](_0x5ef2b5['x']),'y':Math[_0x4226ec(0x486)](_0x5ef2b5['y']),'pageIndex':_0x5ef2b5[_0x4226ec(0x2d6)],'moveRouteIndex':_0x5ef2b5[_0x4226ec(0x2b8)]};},Game_System[_0x81ac0a(0x3a5)]['deleteSavedEventLocation']=function(_0x49c05f){const _0x3e94f9=_0x81ac0a;if(this['_SavedEventLocations']===undefined)this[_0x3e94f9(0x3dd)]();if(!_0x49c05f)return;this[_0x3e94f9(0x2ec)](_0x49c05f[_0x3e94f9(0x483)],_0x49c05f[_0x3e94f9(0x339)]);},Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x2ec)]=function(_0x23de9a,_0x2a3d0c){const _0x5492ee=_0x81ac0a;if(this[_0x5492ee(0x4df)]===undefined)this[_0x5492ee(0x3dd)]();const _0x2a74d7=_0x5492ee(0x466)[_0x5492ee(0x568)](_0x23de9a,_0x2a3d0c);delete this['_SavedEventLocations'][_0x2a74d7];},Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x454)]=function(_0x11ef4e,_0x2fe20e,_0x553c55,_0x1873b7,_0xe368e3,_0xdb664e,_0x54ae5e){const _0x344b9c=_0x81ac0a;if(this[_0x344b9c(0x4df)]===undefined)this[_0x344b9c(0x3dd)]();const _0x53eecb=_0x344b9c(0x466)[_0x344b9c(0x568)](_0x11ef4e,_0x2fe20e);this[_0x344b9c(0x4df)][_0x53eecb]={'direction':_0xe368e3,'x':Math[_0x344b9c(0x486)](_0x553c55),'y':Math[_0x344b9c(0x486)](_0x1873b7),'pageIndex':_0xdb664e,'moveRouteIndex':_0x54ae5e};},Game_System[_0x81ac0a(0x3a5)]['getPreservedMorphEventData']=function(_0x7a74c6){const _0x1986cd=_0x81ac0a;if(this['_PreservedEventMorphData']===undefined)this[_0x1986cd(0x3dd)]();if(!_0x7a74c6)return;const _0x307a76=_0x1986cd(0x466)[_0x1986cd(0x568)](_0x7a74c6['_mapId'],_0x7a74c6[_0x1986cd(0x339)]);return this[_0x1986cd(0x30c)][_0x307a76];},Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x27a)]=function(_0x2a385c,_0xf7ebab,_0x462566,_0x53581d,_0x3bf746){const _0x5e15f8=_0x81ac0a;if(this[_0x5e15f8(0x30c)]===undefined)this['initEventsMoveCore']();const _0x4db6f4=_0x5e15f8(0x466)[_0x5e15f8(0x568)](_0x2a385c,_0xf7ebab);this[_0x5e15f8(0x30c)][_0x4db6f4]={'template':_0x462566,'mapId':_0x53581d,'eventId':_0x3bf746};},Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x56a)]=function(_0x5221c8,_0x55f464){const _0x429699=_0x81ac0a;if(this[_0x429699(0x30c)]===undefined)this['initEventsMoveCore']();const _0x4f155e=_0x429699(0x466)[_0x429699(0x568)](_0x5221c8,_0x55f464);delete this[_0x429699(0x30c)][_0x4f155e];},Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x300)]=function(_0x42328b){const _0x1ea164=_0x81ac0a;if(this[_0x1ea164(0x2ce)]===undefined)this['initEventsMoveCore']();return this['_MapSpawnedEventData'][_0x42328b]=this[_0x1ea164(0x2ce)][_0x42328b]||[],this[_0x1ea164(0x2ce)][_0x42328b];},Game_System[_0x81ac0a(0x3a5)]['removeTemporaryMapSpawnedEvents']=function(_0x25324a){const _0x2357f2=_0x81ac0a,_0x363b81=this['getMapSpawnedEventData'](_0x25324a);for(const _0x210922 of _0x363b81){if(!_0x210922)continue;if(_0x210922['_spawnPreserved'])continue;const _0x230ccf=_0x363b81[_0x2357f2(0x4f6)](_0x210922);_0x363b81[_0x230ccf]=null;}},Game_System[_0x81ac0a(0x3a5)]['initFollowerController']=function(){this['_followerControlID']=0x0,this['_followerChaseOff']=![];},Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x574)]=function(){const _0xedb5c4=_0x81ac0a;if(this[_0xedb5c4(0x54c)]===undefined)this[_0xedb5c4(0x222)]();return this[_0xedb5c4(0x54c)];},Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x38b)]=function(_0x59d2ee){const _0x152d49=_0x81ac0a;if(this[_0x152d49(0x54c)]===undefined)this[_0x152d49(0x222)]();this['_followerControlID']=_0x59d2ee;;},VisuMZ[_0x81ac0a(0x399)]['Game_Interpreter_character']=Game_Interpreter['prototype'][_0x81ac0a(0x4e0)],Game_Interpreter[_0x81ac0a(0x3a5)]['character']=function(_0x5e8ffd){const _0x23d351=_0x81ac0a;if(!$gameParty[_0x23d351(0x1fc)]()&&_0x5e8ffd<0x0){let _0x247dff=$gameSystem['getControlledFollowerID']();if(_0x247dff>0x0)return $gamePlayer[_0x23d351(0x260)]()[_0x23d351(0x20b)](_0x247dff-0x1);}return VisuMZ[_0x23d351(0x399)]['Game_Interpreter_character'][_0x23d351(0x2a9)](this,_0x5e8ffd);},Game_System[_0x81ac0a(0x3a5)][_0x81ac0a(0x2e8)]=function(){const _0x168b98=_0x81ac0a;if(this['_followerChaseOff']===undefined)this[_0x168b98(0x222)]();return this[_0x168b98(0x46b)];},Game_System['prototype'][_0x81ac0a(0x1d1)]=function(_0x11ac67){const _0x106400=_0x81ac0a;if(this[_0x106400(0x46b)]===undefined)this[_0x106400(0x222)]();this['_followerChaseOff']=_0x11ac67;;},VisuMZ['EventsMoveCore'][_0x81ac0a(0x3d3)]=Game_Timer['prototype']['initialize'],Game_Timer['prototype'][_0x81ac0a(0x418)]=function(){const _0x52baca=_0x81ac0a;VisuMZ['EventsMoveCore'][_0x52baca(0x3d3)]['call'](this),this[_0x52baca(0x3dd)]();},Game_Timer[_0x81ac0a(0x3a5)][_0x81ac0a(0x3dd)]=function(){const _0x13dd07=_0x81ac0a;this[_0x13dd07(0x3eb)]=![],this[_0x13dd07(0x4fa)]=-0x1,this[_0x13dd07(0x2bc)]=0x0;},Game_Timer['prototype'][_0x81ac0a(0x4c3)]=function(_0x2e90cf){const _0x29e3b1=_0x81ac0a;if(!_0x2e90cf)return;if(!this[_0x29e3b1(0x368)])return;if(this[_0x29e3b1(0x3eb)])return;if(this[_0x29e3b1(0x43d)]<=0x0)return;if(this[_0x29e3b1(0x4fa)]===undefined)this[_0x29e3b1(0x3dd)]();this[_0x29e3b1(0x43d)]+=this[_0x29e3b1(0x4fa)],this[_0x29e3b1(0x43d)]<=0x0&&this['onExpire']();},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x3fa)]=Game_Timer[_0x81ac0a(0x3a5)][_0x81ac0a(0x3e0)],Game_Timer[_0x81ac0a(0x3a5)][_0x81ac0a(0x3e0)]=function(_0x24653c){const _0xbe0ede=_0x81ac0a;VisuMZ[_0xbe0ede(0x399)][_0xbe0ede(0x3fa)][_0xbe0ede(0x2a9)](this,_0x24653c);if(this[_0xbe0ede(0x3eb)]===undefined)this['initEventsMoveCore']();this['_paused']=![];},VisuMZ['EventsMoveCore'][_0x81ac0a(0x3f3)]=Game_Timer[_0x81ac0a(0x3a5)]['stop'],Game_Timer['prototype'][_0x81ac0a(0x293)]=function(){const _0x510ae9=_0x81ac0a;VisuMZ[_0x510ae9(0x399)][_0x510ae9(0x3f3)][_0x510ae9(0x2a9)](this);if(this['_paused']===undefined)this['initEventsMoveCore']();this['_paused']=![];},Game_Timer[_0x81ac0a(0x3a5)]['pause']=function(){const _0x4f64da=_0x81ac0a;if(this[_0x4f64da(0x43d)]<=0x0)return;this['_paused']=!![],this[_0x4f64da(0x368)]=!![];},Game_Timer[_0x81ac0a(0x3a5)][_0x81ac0a(0x2a2)]=function(){const _0x246ec3=_0x81ac0a;if(this[_0x246ec3(0x43d)]<=0x0)return;this[_0x246ec3(0x3eb)]=![],this[_0x246ec3(0x368)]=!![];},Game_Timer[_0x81ac0a(0x3a5)]['gainFrames']=function(_0x33d5c9){const _0x4dcb78=_0x81ac0a;this[_0x4dcb78(0x43d)]=this[_0x4dcb78(0x43d)]||0x0,this[_0x4dcb78(0x43d)]+=_0x33d5c9,this['_working']=!![],this[_0x4dcb78(0x43d)]=Math[_0x4dcb78(0x25c)](0x1,this[_0x4dcb78(0x43d)]);},Game_Timer[_0x81ac0a(0x3a5)][_0x81ac0a(0x577)]=function(_0x468770){const _0xf21fb2=_0x81ac0a;this[_0xf21fb2(0x43d)]=this[_0xf21fb2(0x43d)]||0x0,this[_0xf21fb2(0x43d)]=_0x468770,this[_0xf21fb2(0x368)]=!![],this[_0xf21fb2(0x43d)]=Math[_0xf21fb2(0x25c)](0x1,this[_0xf21fb2(0x43d)]);},Game_Timer['prototype'][_0x81ac0a(0x3c2)]=function(_0x848ac8){const _0xc0ca8b=_0x81ac0a;this[_0xc0ca8b(0x4fa)]=_0x848ac8,this[_0xc0ca8b(0x368)]=!![],_0x848ac8>0x0&&(this['_frames']=Math[_0xc0ca8b(0x25c)](this[_0xc0ca8b(0x43d)],0x1));},Game_Timer['prototype'][_0x81ac0a(0x472)]=function(_0x3b232c){const _0x5c91b8=_0x81ac0a;if(this['_expireCommonEvent']===undefined)this[_0x5c91b8(0x3dd)]();this[_0x5c91b8(0x2bc)]=_0x3b232c;},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x478)]=Game_Timer[_0x81ac0a(0x3a5)]['onExpire'],Game_Timer['prototype']['onExpire']=function(){const _0x3df81b=_0x81ac0a;if(this[_0x3df81b(0x2bc)]===undefined)this[_0x3df81b(0x3dd)]();this['_expireCommonEvent']?$gameTemp['reserveCommonEvent'](this[_0x3df81b(0x2bc)]):VisuMZ[_0x3df81b(0x399)][_0x3df81b(0x478)][_0x3df81b(0x2a9)](this);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x2e4)]=Game_Message[_0x81ac0a(0x3a5)]['add'],Game_Message[_0x81ac0a(0x3a5)][_0x81ac0a(0x2cc)]=function(_0x46bce1){const _0x27e5a4=_0x81ac0a;VisuMZ[_0x27e5a4(0x399)][_0x27e5a4(0x2e4)]['call'](this,_0x46bce1),this[_0x27e5a4(0x448)]=$gameTemp[_0x27e5a4(0x48a)]();},Game_Message['prototype'][_0x81ac0a(0x270)]=function(){const _0x4d9ed3=_0x81ac0a;$gameTemp[_0x4d9ed3(0x4ff)](this[_0x4d9ed3(0x448)]);},VisuMZ[_0x81ac0a(0x399)]['Game_Switches_value']=Game_Switches[_0x81ac0a(0x3a5)][_0x81ac0a(0x3dc)],Game_Switches['prototype'][_0x81ac0a(0x3dc)]=function(_0x527d9e){const _0x223dfe=_0x81ac0a;if(DataManager[_0x223dfe(0x56d)](_0x527d9e))return!!this[_0x223dfe(0x341)](_0x527d9e);else return DataManager[_0x223dfe(0x29a)](_0x527d9e)?!!this['selfValue'](_0x527d9e):VisuMZ[_0x223dfe(0x399)][_0x223dfe(0x29f)][_0x223dfe(0x2a9)](this,_0x527d9e);},Game_Switches['advancedFunc']={},Game_Switches[_0x81ac0a(0x3a5)][_0x81ac0a(0x341)]=function(_0x1aa63d){const _0x23c67b=_0x81ac0a;if(!Game_Switches[_0x23c67b(0x4db)][_0x1aa63d]){$dataSystem[_0x23c67b(0x4a0)][_0x1aa63d][_0x23c67b(0x3b2)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x4d8317=_0x23c67b(0x4b0)[_0x23c67b(0x568)](String(RegExp['$1']));Game_Switches[_0x23c67b(0x4db)][_0x1aa63d]=new Function('switchId',_0x4d8317);}const _0x2a05d9=$gameTemp[_0x23c67b(0x48a)]()||this;return Game_Switches[_0x23c67b(0x4db)][_0x1aa63d]['call'](_0x2a05d9,_0x1aa63d);},Game_Switches[_0x81ac0a(0x3a5)][_0x81ac0a(0x548)]=function(_0x1575b9){const _0xfcc87d=_0x81ac0a,_0x21955b=$gameTemp[_0xfcc87d(0x48a)]()||this;if(_0x21955b['constructor']!==Game_Event)return VisuMZ[_0xfcc87d(0x399)][_0xfcc87d(0x29f)][_0xfcc87d(0x2a9)](this,_0x1575b9);else{const _0x127c4e=[_0x21955b['_mapId'],_0x21955b[_0xfcc87d(0x339)],'Self\x20Switch\x20%1'[_0xfcc87d(0x568)](_0x1575b9)];return $gameSelfSwitches['value'](_0x127c4e);}},VisuMZ[_0x81ac0a(0x399)]['Game_Switches_setValue']=Game_Switches[_0x81ac0a(0x3a5)]['setValue'],Game_Switches[_0x81ac0a(0x3a5)][_0x81ac0a(0x421)]=function(_0x2168dd,_0x37b6ce){const _0x128f35=_0x81ac0a;DataManager['isSelfSwitch'](_0x2168dd)?this['setSelfValue'](_0x2168dd,_0x37b6ce):VisuMZ[_0x128f35(0x399)][_0x128f35(0x2d4)][_0x128f35(0x2a9)](this,_0x2168dd,_0x37b6ce);},Game_Switches[_0x81ac0a(0x3a5)][_0x81ac0a(0x299)]=function(_0x48611d,_0x5021e3){const _0x300441=_0x81ac0a,_0x889f3b=$gameTemp[_0x300441(0x48a)]()||this;if(_0x889f3b[_0x300441(0x2cb)]!==Game_Event)VisuMZ[_0x300441(0x399)][_0x300441(0x2d4)]['call'](this,_0x48611d,_0x5021e3);else{const _0x440d16=[_0x889f3b[_0x300441(0x483)],_0x889f3b[_0x300441(0x339)],_0x300441(0x4e6)[_0x300441(0x568)](_0x48611d)];$gameSelfSwitches['setValue'](_0x440d16,_0x5021e3);}},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x46a)]=Game_Variables[_0x81ac0a(0x3a5)][_0x81ac0a(0x3dc)],Game_Variables[_0x81ac0a(0x3a5)][_0x81ac0a(0x3dc)]=function(_0x45de34){const _0x92bf08=_0x81ac0a;if(DataManager[_0x92bf08(0x376)](_0x45de34))return this[_0x92bf08(0x341)](_0x45de34);else return DataManager[_0x92bf08(0x23a)](_0x45de34)?this[_0x92bf08(0x548)](_0x45de34):VisuMZ['EventsMoveCore']['Game_Variables_value']['call'](this,_0x45de34);},Game_Variables[_0x81ac0a(0x4db)]={},Game_Variables[_0x81ac0a(0x3a5)][_0x81ac0a(0x341)]=function(_0x459808){const _0xbbfb4e=_0x81ac0a;if(!Game_Variables['advancedFunc'][_0x459808]){$dataSystem['variables'][_0x459808]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x2c38a1=_0xbbfb4e(0x4b0)['format'](String(RegExp['$1']));Game_Variables[_0xbbfb4e(0x4db)][_0x459808]=new Function(_0xbbfb4e(0x47f),_0x2c38a1);}const _0xc343aa=$gameTemp[_0xbbfb4e(0x48a)]()||this;return Game_Variables[_0xbbfb4e(0x4db)][_0x459808][_0xbbfb4e(0x2a9)](_0xc343aa,_0x459808);},Game_Variables['prototype']['selfValue']=function(_0x1fcf1d){const _0x5a51f9=_0x81ac0a,_0x4dac87=$gameTemp[_0x5a51f9(0x48a)]()||this;if(_0x4dac87[_0x5a51f9(0x2cb)]!==Game_Event)return VisuMZ[_0x5a51f9(0x399)]['Game_Variables_value'][_0x5a51f9(0x2a9)](this,_0x1fcf1d);else{const _0x201447=[_0x4dac87[_0x5a51f9(0x483)],_0x4dac87[_0x5a51f9(0x339)],'Self\x20Variable\x20%1'[_0x5a51f9(0x568)](_0x1fcf1d)];return $gameSelfSwitches['value'](_0x201447);}},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x44c)]=Game_Variables[_0x81ac0a(0x3a5)][_0x81ac0a(0x421)],Game_Variables['prototype'][_0x81ac0a(0x421)]=function(_0x2f84ba,_0x1333d6){const _0x1a5631=_0x81ac0a;DataManager[_0x1a5631(0x23a)](_0x2f84ba)?this[_0x1a5631(0x299)](_0x2f84ba,_0x1333d6):VisuMZ[_0x1a5631(0x399)][_0x1a5631(0x44c)][_0x1a5631(0x2a9)](this,_0x2f84ba,_0x1333d6);},Game_Variables[_0x81ac0a(0x3a5)]['setSelfValue']=function(_0x15dedc,_0x274811){const _0xa0798a=_0x81ac0a,_0x58bdde=$gameTemp['getSelfTarget']()||this;if(_0x58bdde[_0xa0798a(0x2cb)]!==Game_Event)VisuMZ['EventsMoveCore'][_0xa0798a(0x44c)][_0xa0798a(0x2a9)](this,_0x15dedc,_0x274811);else{const _0x206f41=[_0x58bdde['_mapId'],_0x58bdde[_0xa0798a(0x339)],'Self\x20Variable\x20%1'['format'](_0x15dedc)];$gameSelfSwitches[_0xa0798a(0x421)](_0x206f41,_0x274811);}},VisuMZ[_0x81ac0a(0x399)]['Game_SelfSwitches_value']=Game_SelfSwitches[_0x81ac0a(0x3a5)][_0x81ac0a(0x3dc)],Game_SelfSwitches[_0x81ac0a(0x3a5)][_0x81ac0a(0x3dc)]=function(_0x26c46c){const _0x1c557b=_0x81ac0a;if(_0x26c46c[0x2]['match'](/SELF/i))return this[_0x1c557b(0x548)](_0x26c46c);else{return VisuMZ[_0x1c557b(0x399)][_0x1c557b(0x33f)][_0x1c557b(0x2a9)](this,_0x26c46c);;}},Game_SelfSwitches[_0x81ac0a(0x3a5)][_0x81ac0a(0x548)]=function(_0x12a755){const _0x4eec96=_0x81ac0a;return _0x12a755[0x2][_0x4eec96(0x3b2)](/VAR/i)?this[_0x4eec96(0x525)][_0x12a755]||0x0:!!this['_data'][_0x12a755];},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x553)]=Game_SelfSwitches[_0x81ac0a(0x3a5)][_0x81ac0a(0x421)],Game_SelfSwitches[_0x81ac0a(0x3a5)]['setValue']=function(_0x1f4cdd,_0x442267){const _0x507065=_0x81ac0a;_0x1f4cdd[0x2][_0x507065(0x3b2)](/SELF/i)?this[_0x507065(0x299)](_0x1f4cdd,_0x442267):VisuMZ['EventsMoveCore'][_0x507065(0x553)]['call'](this,_0x1f4cdd,_0x442267);},Game_SelfSwitches[_0x81ac0a(0x3a5)]['setSelfValue']=function(_0x4e337b,_0x421add){const _0x144ee5=_0x81ac0a;this[_0x144ee5(0x525)][_0x4e337b]=_0x4e337b[0x2][_0x144ee5(0x3b2)](/VAR/i)?_0x421add:!!_0x421add,this[_0x144ee5(0x2fb)]();},VisuMZ[_0x81ac0a(0x399)]['Game_Enemy_meetsSwitchCondition']=Game_Enemy['prototype'][_0x81ac0a(0x2af)],Game_Enemy['prototype']['meetsSwitchCondition']=function(_0x85ceaa){const _0x2f0c6c=_0x81ac0a;$gameTemp[_0x2f0c6c(0x4ff)](this);const _0x32896e=VisuMZ[_0x2f0c6c(0x399)]['Game_Enemy_meetsSwitchCondition'][_0x2f0c6c(0x2a9)](this,_0x85ceaa);return $gameTemp[_0x2f0c6c(0x4e2)](),_0x32896e;},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x578)]=Game_Troop[_0x81ac0a(0x3a5)][_0x81ac0a(0x3e1)],Game_Troop[_0x81ac0a(0x3a5)][_0x81ac0a(0x3e1)]=function(_0x45ed74){const _0x1c8f46=_0x81ac0a;$gameTemp[_0x1c8f46(0x4ff)](this);const _0x340bae=VisuMZ[_0x1c8f46(0x399)][_0x1c8f46(0x578)]['call'](this,_0x45ed74);return $gameTemp['clearSelfTarget'](),_0x340bae;},VisuMZ['EventsMoveCore'][_0x81ac0a(0x490)]=Game_Map['prototype'][_0x81ac0a(0x430)],Game_Map[_0x81ac0a(0x3a5)]['setup']=function(_0x56d2ae){const _0x5b50e0=_0x81ac0a;this[_0x5b50e0(0x265)](_0x56d2ae),this['clearEventCache'](),VisuMZ[_0x5b50e0(0x399)][_0x5b50e0(0x490)]['call'](this,_0x56d2ae),this[_0x5b50e0(0x27f)](),this[_0x5b50e0(0x402)](),this[_0x5b50e0(0x237)](),this[_0x5b50e0(0x527)](),this[_0x5b50e0(0x406)](),this[_0x5b50e0(0x27f)]();},VisuMZ[_0x81ac0a(0x399)]['Game_Map_setupEvents']=Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x540)],Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x540)]=function(){const _0x2d1993=_0x81ac0a;VisuMZ[_0x2d1993(0x399)]['Game_Map_setupEvents'][_0x2d1993(0x2a9)](this),this[_0x2d1993(0x468)]();},Game_Map[_0x81ac0a(0x2b5)]=0xc8,Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x4ad)]=function(){const _0x3ff4ce=_0x81ac0a,_0x396b2e=Game_Map[_0x3ff4ce(0x2b5)];this[_0x3ff4ce(0x4ab)]=this['events']()[_0x3ff4ce(0x3c6)]>_0x396b2e;if(this[_0x3ff4ce(0x4ab)]&&$gameTemp[_0x3ff4ce(0x3d6)]()){}},Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x420)]=function(){return this['_eventOverload'];},Game_Map['prototype'][_0x81ac0a(0x27f)]=function(){const _0x3b6a11=_0x81ac0a;this[_0x3b6a11(0x331)]=undefined;},Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x402)]=function(){const _0x3c1767=_0x81ac0a;this['_diagonalSupport']=VisuMZ[_0x3c1767(0x399)][_0x3c1767(0x446)]['Movement'][_0x3c1767(0x217)];const _0x4418fd=$dataMap[_0x3c1767(0x3cb)]||'';if(_0x4418fd[_0x3c1767(0x3b2)](/<DIAGONAL MOVEMENT: ON>/i))this[_0x3c1767(0x445)]=!![];else _0x4418fd[_0x3c1767(0x3b2)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x3c1767(0x445)]=![]);},Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x3e3)]=function(){const _0x2573c3=_0x81ac0a,_0x55b575=$gameSystem[_0x2573c3(0x464)]();if(_0x55b575===_0x2573c3(0x2c8))return!![];if(_0x55b575===_0x2573c3(0x3ca))return![];if(this[_0x2573c3(0x445)]===undefined)this[_0x2573c3(0x402)]();return this['_diagonalSupport'];},Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x1db)]=function(_0x22c371,_0x4ee2d0){const _0x2fd938=_0x81ac0a;if([0x1,0x4,0x7][_0x2fd938(0x36a)](_0x4ee2d0))_0x22c371-=0x1;if([0x3,0x6,0x9][_0x2fd938(0x36a)](_0x4ee2d0))_0x22c371+=0x1;return this['roundX'](_0x22c371);},Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x570)]=function(_0x5135fe,_0x1f314e){const _0x3ee7fa=_0x81ac0a;if([0x1,0x2,0x3][_0x3ee7fa(0x36a)](_0x1f314e))_0x5135fe+=0x1;if([0x7,0x8,0x9][_0x3ee7fa(0x36a)](_0x1f314e))_0x5135fe-=0x1;return this[_0x3ee7fa(0x451)](_0x5135fe);},Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x432)]=function(_0x2cf127,_0x8e3651,_0x57b2c8,_0x5ab704){const _0xcfd3dc=_0x81ac0a;return Math[_0xcfd3dc(0x25c)](Math[_0xcfd3dc(0x2d5)](this[_0xcfd3dc(0x4a9)](_0x2cf127,_0x57b2c8)),Math['abs'](this[_0xcfd3dc(0x44e)](_0x8e3651,_0x5ab704)));},Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x237)]=function(){const _0x30d61d=_0x81ac0a,_0x4a3643=VisuMZ[_0x30d61d(0x399)][_0x30d61d(0x446)][_0x30d61d(0x283)],_0x388df7={},_0x1e31a4=['Allow',_0x30d61d(0x484),'Dock'],_0x5437cc=[_0x30d61d(0x24b),_0x30d61d(0x4c8),_0x30d61d(0x1ec),_0x30d61d(0x52b),_0x30d61d(0x35b),'Boat',_0x30d61d(0x275),'Airship'];for(const _0x362071 of _0x1e31a4){for(const _0x34e0ba of _0x5437cc){const _0xc18a2c='%1%2'['format'](_0x34e0ba,_0x362071);_0x4a3643[_0xc18a2c]&&(_0x388df7[_0xc18a2c]=_0x4a3643[_0xc18a2c]['slice'](0x0));}}const _0x2d5a4a=$dataMap[_0x30d61d(0x3cb)]||'',_0x53d6b5=_0x2d5a4a[_0x30d61d(0x3b2)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);if(_0x53d6b5)for(const _0x153f62 of _0x53d6b5){_0x153f62['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x40713d=String(RegExp['$1'])[_0x30d61d(0x562)]()[_0x30d61d(0x28f)](),_0x4a3605=String(RegExp['$2'])[_0x30d61d(0x562)]()[_0x30d61d(0x28f)]();const _0xdde365=JSON[_0x30d61d(0x435)]('['+RegExp['$3'][_0x30d61d(0x3b2)](/\d+/g)+']');_0x40713d=_0x40713d[_0x30d61d(0x3cf)](0x0)[_0x30d61d(0x493)]()+_0x40713d['slice'](0x1),_0x4a3605=_0x4a3605[_0x30d61d(0x3cf)](0x0)['toUpperCase']()+_0x4a3605[_0x30d61d(0x250)](0x1);const _0x3e45a2=_0x30d61d(0x411)['format'](_0x40713d,_0x4a3605);if(_0x388df7[_0x3e45a2])_0x388df7[_0x3e45a2]=_0x388df7[_0x3e45a2][_0x30d61d(0x23d)](_0xdde365);}this[_0x30d61d(0x1eb)]=_0x388df7;},Game_Map['prototype'][_0x81ac0a(0x1e5)]=function(_0x3ecc84,_0x4c11d6,_0x37aac2,_0x5b1fb6){const _0x1d9451=_0x81ac0a,_0x28b0b4=this['roundXWithDirection'](_0x3ecc84,_0x37aac2),_0x5e4f8c=this[_0x1d9451(0x570)](_0x4c11d6,_0x37aac2),_0x39d0f5=this['regionId'](_0x28b0b4,_0x5e4f8c),_0x4110ff=this[_0x1d9451(0x1eb)];if(_0x4110ff[_0x1d9451(0x423)][_0x1d9451(0x36a)](_0x39d0f5))return!![];else{if(_0x5b1fb6===_0x1d9451(0x253))return _0x4110ff[_0x1d9451(0x581)][_0x1d9451(0x36a)](_0x39d0f5)||_0x4110ff[_0x1d9451(0x3fc)][_0x1d9451(0x36a)](_0x39d0f5);else{if(_0x5b1fb6===_0x1d9451(0x31b))return _0x4110ff[_0x1d9451(0x2d7)][_0x1d9451(0x36a)](_0x39d0f5)||_0x4110ff['WalkAllow']['includes'](_0x39d0f5);else{if(_0x4110ff[_0x1d9451(0x3c7)][_0x1d9451(0x36a)](_0x39d0f5))return!![];else{const _0xaedb26='%1Allow'['format'](_0x5b1fb6[_0x1d9451(0x3cf)](0x0)['toUpperCase']()+_0x5b1fb6[_0x1d9451(0x250)](0x1));if(_0x4110ff[_0xaedb26])return _0x4110ff[_0xaedb26][_0x1d9451(0x36a)](_0x39d0f5);}}}}return![];},Game_Map[_0x81ac0a(0x3a5)]['isRegionForbidPass']=function(_0x5b266c,_0x3d4f1a,_0x3fcf44,_0x57af9c){const _0x2c136e=_0x81ac0a,_0x2e9449=this[_0x2c136e(0x1db)](_0x5b266c,_0x3fcf44),_0x9a6218=this['roundYWithDirection'](_0x3d4f1a,_0x3fcf44),_0x129d7c=this[_0x2c136e(0x1e2)](_0x2e9449,_0x9a6218),_0x59853f=this[_0x2c136e(0x1eb)];if(_0x59853f[_0x2c136e(0x537)][_0x2c136e(0x36a)](_0x129d7c))return!![];else{if(_0x57af9c==='player')return _0x59853f[_0x2c136e(0x455)][_0x2c136e(0x36a)](_0x129d7c)||_0x59853f[_0x2c136e(0x2bd)][_0x2c136e(0x36a)](_0x129d7c);else{if(_0x57af9c==='event')return _0x59853f[_0x2c136e(0x274)][_0x2c136e(0x36a)](_0x129d7c)||_0x59853f[_0x2c136e(0x2bd)][_0x2c136e(0x36a)](_0x129d7c);else{if(_0x59853f[_0x2c136e(0x42d)][_0x2c136e(0x36a)](_0x129d7c))return!![];else{const _0x412ad2=_0x2c136e(0x313)[_0x2c136e(0x568)](_0x57af9c['charAt'](0x0)[_0x2c136e(0x493)]()+_0x57af9c[_0x2c136e(0x250)](0x1));if(_0x59853f[_0x412ad2])return _0x59853f[_0x412ad2]['includes'](_0x129d7c);}}}}return![];},Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x2e3)]=function(_0x48b07f,_0x1b219f,_0x54f6a3,_0x38726d){const _0x527c02=_0x81ac0a;_0x54f6a3=_0x38726d==='airship'?0x5:_0x54f6a3;const _0x442f3b=this['roundXWithDirection'](_0x48b07f,_0x54f6a3),_0x556933=this[_0x527c02(0x570)](_0x1b219f,_0x54f6a3),_0x3955cb=this[_0x527c02(0x1e2)](_0x442f3b,_0x556933),_0x54123d=this['_regionRules'];if(_0x54123d[_0x527c02(0x4ac)][_0x527c02(0x36a)](_0x3955cb))return!![];else{const _0x5d65ab=_0x527c02(0x4e7)[_0x527c02(0x568)](_0x38726d[_0x527c02(0x3cf)](0x0)['toUpperCase']()+_0x38726d['slice'](0x1));if(_0x54123d[_0x5d65ab])return _0x54123d[_0x5d65ab][_0x527c02(0x36a)](_0x3955cb);}return![];},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x387)]=Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x443)],Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x443)]=function(){const _0x3aa052=_0x81ac0a;VisuMZ[_0x3aa052(0x399)][_0x3aa052(0x387)][_0x3aa052(0x2a9)](this),this[_0x3aa052(0x1f4)]();},Game_Map['prototype'][_0x81ac0a(0x1f4)]=function(){const _0x1a5a77=_0x81ac0a;this[_0x1a5a77(0x1de)]=![];if(this['events']()['some'](_0x19bd19=>_0x19bd19[_0x1a5a77(0x350)]())){this[_0x1a5a77(0x1de)]=!![];return;}if(this['events']()['some'](_0x3c22c1=>_0x3c22c1['hasCPCs']())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0x1a5a77(0x598)]['some'](_0x15bc5c=>_0x15bc5c[_0x1a5a77(0x350)]())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0x1a5a77(0x598)][_0x1a5a77(0x4ee)](_0x382b22=>_0x382b22[_0x1a5a77(0x42e)]())){this[_0x1a5a77(0x1de)]=!![];return;}},VisuMZ[_0x81ac0a(0x399)]['Game_Map_update']=Game_Map['prototype'][_0x81ac0a(0x4c3)],Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x4c3)]=function(_0x1c43ef){const _0x5605ae=_0x81ac0a;this[_0x5605ae(0x36f)](),VisuMZ[_0x5605ae(0x399)][_0x5605ae(0x395)]['call'](this,_0x1c43ef);},Game_Map['prototype'][_0x81ac0a(0x36f)]=function(){const _0x22fcd7=_0x81ac0a;if(!this['_needsPeriodicRefresh'])return;this[_0x22fcd7(0x385)]=this[_0x22fcd7(0x385)]||0x3c,this[_0x22fcd7(0x385)]--,this[_0x22fcd7(0x385)]<=0x0&&(this[_0x22fcd7(0x393)](),this[_0x22fcd7(0x385)]=0x3c);},VisuMZ['EventsMoveCore']['Game_Map_isDashDisabled']=Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x47b)],Game_Map['prototype']['isDashDisabled']=function(){const _0x3307b4=_0x81ac0a;if(!$gameSystem[_0x3307b4(0x2fc)]())return!![];return VisuMZ[_0x3307b4(0x399)][_0x3307b4(0x329)][_0x3307b4(0x2a9)](this);},Game_Map[_0x81ac0a(0x3a5)]['setupSaveEventLocations']=function(){const _0x41a4e3=_0x81ac0a;this[_0x41a4e3(0x268)]=![];const _0x352ec7=$dataMap[_0x41a4e3(0x3cb)]||'';_0x352ec7[_0x41a4e3(0x3b2)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocations']=!![]);},Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x579)]=function(){const _0x536b3b=_0x81ac0a;if(this[_0x536b3b(0x268)]===undefined)this[_0x536b3b(0x527)]();return this[_0x536b3b(0x268)];},Game_Map[_0x81ac0a(0x3a5)]['removeTemporaryMapSpawnedEvents']=function(_0x1823cc){const _0x1af555=_0x81ac0a;_0x1823cc!==this[_0x1af555(0x4ae)]()&&$gamePlayer&&$gameSystem[_0x1af555(0x265)](this[_0x1af555(0x4ae)]());},Game_Map['prototype'][_0x81ac0a(0x406)]=function(){const _0xa46be6=_0x81ac0a;this[_0xa46be6(0x1fb)]=$gameSystem[_0xa46be6(0x300)](this[_0xa46be6(0x4ae)]()),this[_0xa46be6(0x43e)]=!![];},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x235)]=Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x44a)],Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x44a)]=function(){const _0x5c504b=_0x81ac0a;if(this[_0x5c504b(0x331)])return this[_0x5c504b(0x331)];const _0x3ee3b4=VisuMZ['EventsMoveCore']['Game_Map_events'][_0x5c504b(0x2a9)](this),_0x3f76c7=_0x3ee3b4[_0x5c504b(0x23d)](this[_0x5c504b(0x1fb)]||[]);return this[_0x5c504b(0x331)]=_0x3f76c7['filter'](_0x537bcc=>!!_0x537bcc),this[_0x5c504b(0x331)];},VisuMZ['EventsMoveCore']['Game_Map_event']=Game_Map['prototype'][_0x81ac0a(0x31b)],Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x31b)]=function(_0x25498d){const _0x136ffc=_0x81ac0a;return _0x25498d>=0x3e8?(_0x25498d-=0x3e8,this[_0x136ffc(0x1fb)][_0x25498d]):VisuMZ['EventsMoveCore']['Game_Map_event']['call'](this,_0x25498d);},Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x51a)]=function(_0x21bdb2){const _0x3a4dbd=_0x81ac0a,_0xd58de=this['event'](_0x21bdb2);if(_0xd58de)_0xd58de[_0x3a4dbd(0x442)]();},Game_Map['prototype'][_0x81ac0a(0x408)]=function(){const _0x1cfe2e=_0x81ac0a,_0x534fd2={'template':_0x1cfe2e(0x2f6),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x1cfe2e(0x1fb)]['length']+0x3e8};this[_0x1cfe2e(0x224)](_0x534fd2);},Game_Map['prototype'][_0x81ac0a(0x422)]=function(_0x473c33,_0x52d036){const _0x53b4ab=_0x81ac0a;if(this[_0x53b4ab(0x1e6)](_0x473c33,_0x52d036)[_0x53b4ab(0x3c6)]>0x0)return!![];if($gamePlayer['x']===_0x473c33&&$gamePlayer['y']===_0x52d036)return!![];if(this['boat']()[_0x53b4ab(0x2f8)](_0x473c33,_0x52d036))return!![];if(this['ship']()[_0x53b4ab(0x2f8)](_0x473c33,_0x52d036))return!![];return![];},Game_Map[_0x81ac0a(0x3a5)]['isSpawnHitboxCollisionOk']=function(_0x12e8d0,_0x3cff51,_0x5b631c){const _0x17d38c=_0x81ac0a;$gameTemp['_spawnData']=_0x12e8d0;const _0x5cb446=new Game_Event(_0x12e8d0[_0x17d38c(0x4ae)],_0x12e8d0[_0x17d38c(0x377)]);$gameTemp[_0x17d38c(0x3d2)]=undefined,_0x5cb446[_0x17d38c(0x443)]();let _0x4ef1f6=_0x3cff51-_0x5cb446[_0x17d38c(0x3fe)][_0x17d38c(0x53c)],_0xe40bcd=_0x3cff51+_0x5cb446['_addedHitbox'][_0x17d38c(0x53c)],_0x1325f5=_0x5b631c-_0x5cb446[_0x17d38c(0x3fe)]['up'],_0x10f203=_0x5b631c+_0x5cb446[_0x17d38c(0x3fe)]['down'];for(let _0x55bdb6=_0x4ef1f6;_0x55bdb6<=_0xe40bcd;_0x55bdb6++){for(let _0x5d3154=_0x1325f5;_0x5d3154<=_0x10f203;_0x5d3154++){if(this[_0x17d38c(0x422)](_0x55bdb6,_0x5d3154))return![];}}return!![];},Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x224)]=function(_0x4b520f){const _0x4a8619=_0x81ac0a;$gameTemp[_0x4a8619(0x3d2)]=_0x4b520f;const _0x471106=new Game_Event(_0x4b520f[_0x4a8619(0x4ae)],_0x4b520f[_0x4a8619(0x377)]);$gameTemp[_0x4a8619(0x3d2)]=undefined,this[_0x4a8619(0x1fb)][_0x4a8619(0x287)](_0x471106),_0x471106[_0x4a8619(0x45d)](_0x4b520f),this['clearEventCache']();},Game_Map['prototype']['prepareSpawnedEventAtXY']=function(_0x40b469,_0x20c14d,_0x420f99){const _0x2204bd=_0x81ac0a,_0x28b29a=_0x40b469['x'],_0x15907c=_0x40b469['y'];if(!this[_0x2204bd(0x1d5)](_0x28b29a,_0x15907c))return![];if(_0x20c14d){if(this[_0x2204bd(0x422)](_0x28b29a,_0x15907c))return![];if(!this[_0x2204bd(0x34f)](_0x40b469,_0x28b29a,_0x15907c))return![];}if(_0x420f99){if(!this[_0x2204bd(0x471)](_0x28b29a,_0x15907c))return![];}return this[_0x2204bd(0x224)](_0x40b469),!![];},Game_Map['prototype'][_0x81ac0a(0x462)]=function(_0x5ec60f,_0x31b5b2,_0x4782fc,_0x27e33c){const _0x942d02=_0x81ac0a,_0x24100a=[],_0x43a390=this[_0x942d02(0x36e)](),_0x3a5295=this[_0x942d02(0x30e)]();for(let _0x539b6a=0x0;_0x539b6a<_0x43a390;_0x539b6a++){for(let _0x5f2281=0x0;_0x5f2281<_0x3a5295;_0x5f2281++){if(!_0x31b5b2[_0x942d02(0x36a)](this[_0x942d02(0x1e2)](_0x539b6a,_0x5f2281)))continue;if(!this[_0x942d02(0x1d5)](_0x539b6a,_0x5f2281))continue;if(_0x4782fc){if(this[_0x942d02(0x422)](_0x539b6a,_0x5f2281))continue;if(!this[_0x942d02(0x34f)](_0x5ec60f,_0x539b6a,_0x5f2281))continue;}if(_0x27e33c){if(!this['isPassableByAnyDirection'](_0x539b6a,_0x5f2281))continue;}_0x24100a[_0x942d02(0x287)]([_0x539b6a,_0x5f2281]);}}if(_0x24100a['length']>0x0){const _0x25a880=_0x24100a[Math[_0x942d02(0x416)](_0x24100a[_0x942d02(0x3c6)])];return _0x5ec60f['x']=_0x25a880[0x0],_0x5ec60f['y']=_0x25a880[0x1],this[_0x942d02(0x224)](_0x5ec60f),!![];}return![];},Game_Map['prototype'][_0x81ac0a(0x2c3)]=function(_0x55febb,_0x31f3aa,_0x5426ed,_0x3405d4){const _0x1deb62=_0x81ac0a,_0x2d627e=[],_0x4a3674=this[_0x1deb62(0x36e)](),_0x33074f=this[_0x1deb62(0x30e)]();for(let _0xfcbcc8=0x0;_0xfcbcc8<_0x4a3674;_0xfcbcc8++){for(let _0x4c1089=0x0;_0x4c1089<_0x33074f;_0x4c1089++){if(!_0x31f3aa[_0x1deb62(0x36a)](this[_0x1deb62(0x207)](_0xfcbcc8,_0x4c1089)))continue;if(!this[_0x1deb62(0x1d5)](_0xfcbcc8,_0x4c1089))continue;if(_0x5426ed){if(this[_0x1deb62(0x422)](_0xfcbcc8,_0x4c1089))continue;if(!this[_0x1deb62(0x34f)](_0x55febb,_0xfcbcc8,_0x4c1089))continue;}if(_0x3405d4){if(!this[_0x1deb62(0x471)](_0xfcbcc8,_0x4c1089))continue;}_0x2d627e['push']([_0xfcbcc8,_0x4c1089]);}}if(_0x2d627e[_0x1deb62(0x3c6)]>0x0){const _0x103ad0=_0x2d627e[Math[_0x1deb62(0x416)](_0x2d627e[_0x1deb62(0x3c6)])];return _0x55febb['x']=_0x103ad0[0x0],_0x55febb['y']=_0x103ad0[0x1],this[_0x1deb62(0x224)](_0x55febb),!![];}return![];},Game_Map['prototype'][_0x81ac0a(0x471)]=function(_0x480b4b,_0x97e56c){const _0x8ee494=_0x81ac0a;if(this[_0x8ee494(0x481)](_0x480b4b,_0x97e56c,0x2))return!![];if(this[_0x8ee494(0x481)](_0x480b4b,_0x97e56c,0x4))return!![];if(this['isPassable'](_0x480b4b,_0x97e56c,0x6))return!![];if(this[_0x8ee494(0x481)](_0x480b4b,_0x97e56c,0x8))return!![];return![];},Game_Map[_0x81ac0a(0x3a5)]['despawnEventId']=function(_0x42d76a){const _0x3b4360=_0x81ac0a;if(_0x42d76a<0x3e8)return;if(!this[_0x3b4360(0x1fb)])return;const _0x129478=this[_0x3b4360(0x31b)](_0x42d76a);_0x129478[_0x3b4360(0x288)](-0x1,-0x1),_0x129478[_0x3b4360(0x442)](),this[_0x3b4360(0x1fb)][_0x42d76a-0x3e8]=null,this[_0x3b4360(0x27f)]();},Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x42b)]=function(){const _0x3eabb4=_0x81ac0a;for(const _0x5e8f21 of this[_0x3eabb4(0x1fb)]){if(_0x5e8f21)return _0x5e8f21;}return null;},Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x2f4)]=function(){const _0x23bf34=_0x81ac0a,_0x28fe5c=this[_0x23bf34(0x42b)]();return _0x28fe5c?_0x28fe5c[_0x23bf34(0x339)]:0x0;},Game_Map['prototype']['lastSpawnedEvent']=function(){const _0x5f0bd2=_0x81ac0a,_0x272cef=this['_spawnedEvents'][_0x5f0bd2(0x250)](0x0)[_0x5f0bd2(0x30d)]();for(const _0x4073f2 of _0x272cef){if(_0x4073f2)return _0x4073f2;}return null;},Game_Map[_0x81ac0a(0x3a5)]['lastSpawnedEventID']=function(){const _0x2553e3=_0x81ac0a,_0x117c28=this[_0x2553e3(0x54b)]();return _0x117c28?_0x117c28[_0x2553e3(0x339)]:0x0;},Game_Map[_0x81ac0a(0x3a5)]['despawnAtXY']=function(_0x2527c6,_0x37bb3b){const _0x2c07f9=_0x81ac0a,_0x2c4297=this[_0x2c07f9(0x1e6)](_0x2527c6,_0x37bb3b);for(const _0xa2993b of _0x2c4297){if(!_0xa2993b)continue;if(_0xa2993b[_0x2c07f9(0x3f5)]())this[_0x2c07f9(0x248)](_0xa2993b['_eventId']);}},Game_Map['prototype'][_0x81ac0a(0x2c0)]=function(_0x16dc4d){const _0x45baf6=_0x81ac0a;for(const _0x1077f9 of this['_spawnedEvents']){if(!_0x1077f9)continue;_0x16dc4d[_0x45baf6(0x36a)](_0x1077f9[_0x45baf6(0x1e2)]())&&this[_0x45baf6(0x248)](_0x1077f9[_0x45baf6(0x339)]);}},Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x495)]=function(_0x222961){const _0x242435=_0x81ac0a;for(const _0x21a2c0 of this['_spawnedEvents']){if(!_0x21a2c0)continue;_0x222961[_0x242435(0x36a)](_0x21a2c0[_0x242435(0x207)]())&&this[_0x242435(0x248)](_0x21a2c0['_eventId']);}},Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x414)]=function(){const _0x3523c5=_0x81ac0a;for(const _0x601517 of this['_spawnedEvents']){if(!_0x601517)continue;this[_0x3523c5(0x248)](_0x601517[_0x3523c5(0x339)]);}},VisuMZ['EventsMoveCore']['Game_Map_unlockEvent']=Game_Map['prototype'][_0x81ac0a(0x4cd)],Game_Map['prototype'][_0x81ac0a(0x4cd)]=function(_0x2ca0a2){const _0x179e41=_0x81ac0a;VisuMZ[_0x179e41(0x399)][_0x179e41(0x479)][_0x179e41(0x2a9)](this,_0x2ca0a2);if(_0x2ca0a2>=0x3e8){const _0x170962=this[_0x179e41(0x31b)](_0x2ca0a2);if(_0x170962)_0x170962[_0x179e41(0x309)]();}},Game_CommonEvent[_0x81ac0a(0x3a5)]['hasAdvancedSwitchVariable']=function(){const _0x1ae35f=_0x81ac0a,_0x364d5d=this[_0x1ae35f(0x31b)]();return this[_0x1ae35f(0x316)]()&&_0x364d5d[_0x1ae35f(0x473)]>=0x1&&DataManager[_0x1ae35f(0x56d)](_0x364d5d['switchId']);},Game_CommonEvent[_0x81ac0a(0x3a5)][_0x81ac0a(0x42e)]=function(){const _0x473254=_0x81ac0a;return VisuMZ[_0x473254(0x399)][_0x473254(0x209)][_0x473254(0x598)][_0x473254(0x36a)](this[_0x473254(0x539)]);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x3b3)]=Game_CommonEvent['prototype'][_0x81ac0a(0x316)],Game_CommonEvent[_0x81ac0a(0x3a5)][_0x81ac0a(0x316)]=function(){const _0x49ef61=_0x81ac0a;return VisuMZ[_0x49ef61(0x399)]['Game_CommonEvent_isActive'][_0x49ef61(0x2a9)](this)?!![]:VisuMZ[_0x49ef61(0x399)][_0x49ef61(0x209)][_0x49ef61(0x306)](this['event']()[_0x49ef61(0x2ad)],this[_0x49ef61(0x539)]);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x2c9)]=Game_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x4fe)],Game_Map[_0x81ac0a(0x3a5)]['parallelCommonEvents']=function(){const _0x5c5698=_0x81ac0a,_0x4019e2=VisuMZ['EventsMoveCore'][_0x5c5698(0x2c9)][_0x5c5698(0x2a9)](this),_0x265e7a=VisuMZ[_0x5c5698(0x399)][_0x5c5698(0x209)][_0x5c5698(0x598)]['map'](_0x430f54=>$dataCommonEvents[_0x430f54]);return _0x4019e2[_0x5c5698(0x23d)](_0x265e7a)['filter']((_0x2a738b,_0x2ff1e6,_0x11ce82)=>_0x11ce82[_0x5c5698(0x4f6)](_0x2a738b)===_0x2ff1e6);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x30b)]=Game_CharacterBase['prototype'][_0x81ac0a(0x374)],Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x374)]=function(){const _0x175c95=_0x81ac0a;VisuMZ['EventsMoveCore'][_0x175c95(0x30b)][_0x175c95(0x2a9)](this),this[_0x175c95(0x40a)]();},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x40a)]=function(){const _0x370df9=_0x81ac0a;this['_patternLocked']=![],this[_0x370df9(0x429)](),this['clearDashing'](),this[_0x370df9(0x2dd)](),this[_0x370df9(0x3f9)]();},Game_CharacterBase['prototype'][_0x81ac0a(0x3e5)]=function(){const _0x24cf04=_0x81ac0a;if(this[_0x24cf04(0x2cb)]===Game_Player&&this[_0x24cf04(0x39b)]())return this['vehicle']()[_0x24cf04(0x32e)]()[_0x24cf04(0x3b2)](/\[VS8\]/i);else return Imported[_0x24cf04(0x354)]&&this['hasDragonbones']()?!![]:this[_0x24cf04(0x32e)]()[_0x24cf04(0x3b2)](/\[VS8\]/i);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x2a5)]=Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x50d)],Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x50d)]=function(){const _0x7a804f=_0x81ac0a;if(this['isOnLadder']()&&!this[_0x7a804f(0x245)]()&&this['isSpriteVS8dir']())return this[_0x7a804f(0x320)]();else{if(this[_0x7a804f(0x47d)]()&&!this[_0x7a804f(0x245)]())return 0x8;else return this['isPosing']()&&this['isSpriteVS8dir']()?this[_0x7a804f(0x41b)]():VisuMZ['EventsMoveCore'][_0x7a804f(0x2a5)][_0x7a804f(0x2a9)](this);}},VisuMZ['EventsMoveCore']['Game_CharacterBase_setDirection']=Game_CharacterBase[_0x81ac0a(0x3a5)]['setDirection'],Game_CharacterBase['prototype'][_0x81ac0a(0x372)]=function(_0x182937){const _0xcd9c67=_0x81ac0a;if(!this[_0xcd9c67(0x3e5)]())_0x182937=this[_0xcd9c67(0x1f3)](_0x182937);VisuMZ[_0xcd9c67(0x399)][_0xcd9c67(0x251)][_0xcd9c67(0x2a9)](this,_0x182937);},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x1f3)]=function(_0xbce457){const _0x25c59e=_0x81ac0a;if(_0xbce457===0x1)return this[_0x25c59e(0x32b)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0xbce457===0x3)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0xbce457===0x7)return this[_0x25c59e(0x32b)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0xbce457===0x9)return this[_0x25c59e(0x32b)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0xbce457;},Game_CharacterBase[_0x81ac0a(0x3a5)]['isDiagonalDirection']=function(_0x4db4f9){const _0x10c7b8=_0x81ac0a;return[0x1,0x3,0x5,0x7,0x9][_0x10c7b8(0x36a)](_0x4db4f9);},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x4f8)]=function(){const _0x530c46=_0x81ac0a;return this[_0x530c46(0x42a)]||0x0;},VisuMZ['EventsMoveCore'][_0x81ac0a(0x5a5)]=Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x2e7)],Game_CharacterBase[_0x81ac0a(0x3a5)]['moveStraight']=function(_0x5eba8c){const _0x3ebf84=_0x81ac0a;this[_0x3ebf84(0x42a)]=_0x5eba8c,VisuMZ[_0x3ebf84(0x399)][_0x3ebf84(0x5a5)][_0x3ebf84(0x2a9)](this,_0x5eba8c);},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x595)]=function(_0x1c5f30){const _0x455993=_0x81ac0a;if(!this[_0x455993(0x45c)](_0x1c5f30))return this[_0x455993(0x2e7)](_0x1c5f30);let _0x58c656=0x0,_0x4d0eef=0x0;switch(_0x1c5f30){case 0x1:_0x58c656=0x4,_0x4d0eef=0x2;break;case 0x3:_0x58c656=0x6,_0x4d0eef=0x2;break;case 0x7:_0x58c656=0x4,_0x4d0eef=0x8;break;case 0x9:_0x58c656=0x6,_0x4d0eef=0x8;break;}if(VisuMZ['EventsMoveCore'][_0x455993(0x446)][_0x455993(0x204)]['StrictCollision']){if(!this[_0x455993(0x32b)](this['_x'],this['_y'],_0x58c656))return this['moveStraight'](_0x4d0eef);if(!this[_0x455993(0x32b)](this['_x'],this['_y'],_0x4d0eef))return this[_0x455993(0x2e7)](_0x58c656);if(!this['canPassDiagonally'](this['_x'],this['_y'],_0x58c656,_0x4d0eef)){let _0x4e39fc=VisuMZ['EventsMoveCore'][_0x455993(0x446)][_0x455993(0x204)][_0x455993(0x4a3)]?_0x58c656:_0x4d0eef;return this[_0x455993(0x2e7)](_0x4e39fc);}}this[_0x455993(0x42a)]=_0x1c5f30,this['moveDiagonally'](_0x58c656,_0x4d0eef);},VisuMZ[_0x81ac0a(0x399)]['Game_CharacterBase_realMoveSpeed']=Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x4c1)],Game_CharacterBase['prototype']['realMoveSpeed']=function(){const _0x19aa88=_0x81ac0a;let _0x3fa7d5=this[_0x19aa88(0x3c8)];return this['isDashing']()&&(_0x3fa7d5+=this['dashSpeedModifier']()),this[_0x19aa88(0x26a)](_0x3fa7d5);},Game_CharacterBase[_0x81ac0a(0x3a5)]['dashSpeedModifier']=function(){const _0x33af0b=_0x81ac0a,_0x161471=VisuMZ[_0x33af0b(0x399)]['Settings'][_0x33af0b(0x204)];return _0x161471[_0x33af0b(0x57e)]!==undefined?_0x161471[_0x33af0b(0x57e)]:VisuMZ['EventsMoveCore']['Game_CharacterBase_realMoveSpeed']['call'](this)-this[_0x33af0b(0x3c8)];},Game_CharacterBase['prototype'][_0x81ac0a(0x26a)]=function(_0x2ab574){const _0x2562fb=_0x81ac0a,_0xf797e8=VisuMZ['EventsMoveCore'][_0x2562fb(0x446)][_0x2562fb(0x204)];if(!_0xf797e8['SlowerSpeed'])return _0x2ab574;return[0x1,0x3,0x7,0x9][_0x2562fb(0x36a)](this[_0x2562fb(0x42a)])&&(_0x2ab574*=_0xf797e8[_0x2562fb(0x3ac)]||0.01),_0x2ab574;},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x20f)]=Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x2d9)],Game_CharacterBase['prototype'][_0x81ac0a(0x2d9)]=function(){const _0x184b30=_0x81ac0a;if(this[_0x184b30(0x1f5)])return!![];return VisuMZ['EventsMoveCore'][_0x184b30(0x20f)][_0x184b30(0x2a9)](this);},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x3e6)]=function(){return this['isDashing']();},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x200)]=Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x337)],Game_CharacterBase[_0x81ac0a(0x3a5)]['pattern']=function(){const _0x5dd75e=_0x81ac0a;return this['isPosing']()?this[_0x5dd75e(0x201)]():VisuMZ[_0x5dd75e(0x399)][_0x5dd75e(0x200)][_0x5dd75e(0x2a9)](this);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x369)]=Game_CharacterBase['prototype'][_0x81ac0a(0x234)],Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x234)]=function(){const _0x327d65=_0x81ac0a;VisuMZ[_0x327d65(0x399)][_0x327d65(0x369)][_0x327d65(0x2a9)](this),this[_0x327d65(0x429)]();},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x42c)]=Game_CharacterBase[_0x81ac0a(0x3a5)]['characterIndex'],Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x35c)]=function(){const _0xbecfb1=_0x81ac0a;if(this[_0xbecfb1(0x3e5)]())return this[_0xbecfb1(0x2f2)]();return VisuMZ[_0xbecfb1(0x399)][_0xbecfb1(0x42c)][_0xbecfb1(0x2a9)](this);},Game_CharacterBase[_0x81ac0a(0x3a5)]['characterIndexVS8']=function(){const _0x22399e=_0x81ac0a,_0x408183=this['direction']();if(this['isJumping']()){if([0x2,0x4,0x6,0x8][_0x22399e(0x36a)](_0x408183))return 0x4;if([0x1,0x3,0x7,0x9][_0x22399e(0x36a)](_0x408183))return 0x5;}else{if(this[_0x22399e(0x47d)]())return 0x6;else{if(this['isPosing']())return this[_0x22399e(0x352)]();else{if(this[_0x22399e(0x325)]){if([0x2,0x4,0x6,0x8][_0x22399e(0x36a)](_0x408183))return 0x4;if([0x1,0x3,0x7,0x9][_0x22399e(0x36a)](_0x408183))return 0x5;}else{if(this[_0x22399e(0x4f4)]()&&this[_0x22399e(0x32d)]()){if([0x2,0x4,0x6,0x8][_0x22399e(0x36a)](_0x408183))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x408183))return 0x5;}else{if(this['isDashingAndMoving']()){if([0x2,0x4,0x6,0x8][_0x22399e(0x36a)](_0x408183))return 0x2;if([0x1,0x3,0x7,0x9][_0x22399e(0x36a)](_0x408183))return 0x3;}else{if([0x2,0x4,0x6,0x8][_0x22399e(0x36a)](_0x408183))return 0x0;if([0x1,0x3,0x7,0x9][_0x22399e(0x36a)](_0x408183))return 0x1;}}}}}}},Game_CharacterBase['prototype'][_0x81ac0a(0x32d)]=function(){const _0x4b95fb=_0x81ac0a;return VisuMZ[_0x4b95fb(0x399)][_0x4b95fb(0x446)][_0x4b95fb(0x50c)]['CarryPose'];},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x243)]=function(){const _0x8b2de8=_0x81ac0a;return this[_0x8b2de8(0x47d)]()&&this['terrainTag']()===VisuMZ[_0x8b2de8(0x399)][_0x8b2de8(0x446)][_0x8b2de8(0x29b)][_0x8b2de8(0x375)];},Game_CharacterBase[_0x81ac0a(0x3a5)]['directionOnLadderSpriteVS8dir']=function(){const _0x233464=_0x81ac0a;return this[_0x233464(0x243)]()?0x4:0x2;},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x4be)]=Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x4c3)],Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x4c3)]=function(){const _0x587917=_0x81ac0a;VisuMZ[_0x587917(0x399)]['Game_CharacterBase_update'][_0x587917(0x2a9)](this),this['updatePose']();},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x555)]=function(){const _0x2c3eb1=_0x81ac0a;this[_0x2c3eb1(0x262)]=this['_poseDuration']||0x0;if(this['_poseDuration']>0x0){this[_0x2c3eb1(0x262)]--;if(this[_0x2c3eb1(0x262)]<=0x0&&this[_0x2c3eb1(0x2db)]!==_0x2c3eb1(0x214))this[_0x2c3eb1(0x429)]();}},VisuMZ['EventsMoveCore'][_0x81ac0a(0x1e7)]=Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x41a)],Game_CharacterBase['prototype'][_0x81ac0a(0x41a)]=function(_0x274e7,_0x86916){const _0xe6ffbe=_0x81ac0a;VisuMZ[_0xe6ffbe(0x399)][_0xe6ffbe(0x1e7)][_0xe6ffbe(0x2a9)](this,_0x274e7,_0x86916);if(this[_0xe6ffbe(0x3e5)]())this[_0xe6ffbe(0x37f)](_0x274e7,_0x86916);},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x37f)]=function(_0x90293b,_0x5baa2b){const _0x3f1a21=_0x81ac0a;if(_0x90293b===0x4&&_0x5baa2b===0x2)this['setDirection'](0x1);if(_0x90293b===0x6&&_0x5baa2b===0x2)this['setDirection'](0x3);if(_0x90293b===0x4&&_0x5baa2b===0x8)this[_0x3f1a21(0x372)](0x7);if(_0x90293b===0x6&&_0x5baa2b===0x8)this[_0x3f1a21(0x372)](0x9);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x1df)]=Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x38e)],Game_CharacterBase[_0x81ac0a(0x3a5)]['hasStepAnime']=function(){const _0x4512dd=_0x81ac0a;if(this[_0x4512dd(0x231)]()&&this['getPose']()==='ZZZ')return!![];return VisuMZ[_0x4512dd(0x399)][_0x4512dd(0x1df)][_0x4512dd(0x2a9)](this);},Game_CharacterBase['prototype'][_0x81ac0a(0x296)]=function(_0x30c14f,_0x5164d3){const _0x1605d3=_0x81ac0a;if(_0x30c14f[_0x1605d3(0x3b2)](/Z/i))_0x30c14f=_0x1605d3(0x214);if(_0x30c14f[_0x1605d3(0x3b2)](/SLEEP/i))_0x30c14f=_0x1605d3(0x214);this[_0x1605d3(0x3e5)]()&&(this[_0x1605d3(0x2db)]=_0x30c14f[_0x1605d3(0x493)]()[_0x1605d3(0x28f)](),this[_0x1605d3(0x262)]=_0x5164d3||Infinity);},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x3b8)]=function(){const _0x40bf89=_0x81ac0a;return this[_0x40bf89(0x3e5)]()?(this['_pose']||'')['toUpperCase']()[_0x40bf89(0x28f)]():''['toUpperCase']()['trim']();},Game_CharacterBase['prototype'][_0x81ac0a(0x4e4)]=function(_0x3b6217,_0x3eac45){const _0x32c04a=_0x81ac0a;if(this[_0x32c04a(0x3e5)]()){const _0x1f5ae6=['',_0x32c04a(0x567),_0x32c04a(0x498),_0x32c04a(0x2b0),_0x32c04a(0x2f9),'ANGER',_0x32c04a(0x2da),_0x32c04a(0x302),_0x32c04a(0x4f9),_0x32c04a(0x2d3),'ZZZ','','','','',''][_0x3b6217];this['setPose'](_0x1f5ae6,_0x3eac45);}},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x429)]=function(){const _0x87403d=_0x81ac0a;this[_0x87403d(0x2db)]='',this[_0x87403d(0x262)]=0x0;},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x231)]=function(){const _0x9d8f48=_0x81ac0a;return this[_0x9d8f48(0x3e5)]()&&!!this['_pose'];},Game_CharacterBase['prototype'][_0x81ac0a(0x352)]=function(){const _0x397da1=_0x81ac0a,_0x381bbf=this[_0x397da1(0x2db)][_0x397da1(0x493)]();switch(this['_pose'][_0x397da1(0x493)]()[_0x397da1(0x28f)]()){case _0x397da1(0x4fc):case _0x397da1(0x5a3):case _0x397da1(0x215):case'HURT':case _0x397da1(0x4f3):case _0x397da1(0x264):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x41b)]=function(){const _0x43c9eb=_0x81ac0a;switch(this[_0x43c9eb(0x2db)][_0x43c9eb(0x493)]()){case'EXCLAMATION':case _0x43c9eb(0x498):case _0x43c9eb(0x2b0):case'!':case'?':return 0x2;break;case _0x43c9eb(0x2f9):case _0x43c9eb(0x43f):case _0x43c9eb(0x2da):return 0x4;break;case _0x43c9eb(0x4fc):case _0x43c9eb(0x5a3):case _0x43c9eb(0x215):case'COBWEB':case'SILENCE':case _0x43c9eb(0x2d3):return 0x6;break;case _0x43c9eb(0x571):case'KNEEL':case _0x43c9eb(0x264):case _0x43c9eb(0x214):case'SLEEP':return 0x8;break;default:return VisuMZ[_0x43c9eb(0x399)]['Game_CharacterBase_setDirection']['call'](this);break;}},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x201)]=function(){const _0x395433=_0x81ac0a;switch(this[_0x395433(0x2db)][_0x395433(0x493)]()){case _0x395433(0x4fc):case _0x395433(0x571):case _0x395433(0x567):case'!':case _0x395433(0x2f9):case _0x395433(0x302):return 0x0;break;case _0x395433(0x5a3):case _0x395433(0x4f3):case'QUESTION':case'?':case _0x395433(0x43f):case'SILENCE':return 0x1;break;case'VICTORY':case _0x395433(0x264):case'MUSIC\x20NOTE':case _0x395433(0x2da):case'LIGHT\x20BULB':return 0x2;break;default:return VisuMZ[_0x395433(0x399)][_0x395433(0x200)][_0x395433(0x2a9)](this);break;}},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x32a)]=function(){this['_forceCarrying']=!![];},Game_CharacterBase[_0x81ac0a(0x3a5)]['clearCarrying']=function(){const _0x2073b8=_0x81ac0a;this[_0x2073b8(0x325)]=![];},Game_CharacterBase['prototype'][_0x81ac0a(0x3e2)]=function(){const _0x3bffdc=_0x81ac0a;this[_0x3bffdc(0x1f5)]=!![];},Game_CharacterBase['prototype']['clearDashing']=function(){const _0x2bc1de=_0x81ac0a;this[_0x2bc1de(0x1f5)]=![];},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x53f)]=function(){const _0x33a6b9=_0x81ac0a;if(this['isTile']())return![];if(this[_0x33a6b9(0x396)])return![];if(this['_transparent'])return![];if(this[_0x33a6b9(0x1e8)]==='')return![];if(this[_0x33a6b9(0x2cb)]===Game_Vehicle)return![];return!![];},Game_CharacterBase['prototype']['isShadowShrink']=function(){const _0x70ecdd=_0x81ac0a;if(this[_0x70ecdd(0x47d)]())return!![];if(this['constructor']===Game_Player&&this[_0x70ecdd(0x39b)]())return!![];return![];},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x51d)]=function(){const _0x426dea=_0x81ac0a;return VisuMZ['EventsMoveCore']['Settings'][_0x426dea(0x204)][_0x426dea(0x554)];},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x428)]=function(){return this['screenX']();},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x48d)]=function(){const _0x674c12=_0x81ac0a;return this['screenY']()+this[_0x674c12(0x52d)]()+this[_0x674c12(0x497)]();},Game_Character[_0x81ac0a(0x3a5)]['findDiagonalDirectionTo']=function(_0x54480b,_0x1f7e6f){const _0x46914c=_0x81ac0a,_0x386dfb=this[_0x46914c(0x42f)](),_0x565c24=$gameMap['width'](),_0x212ef8=[],_0xd8a168=[],_0x4cac9f=[],_0x57eb07={};let _0x452a52=_0x57eb07;if(this['x']===_0x54480b&&this['y']===_0x1f7e6f)return 0x0;_0x57eb07[_0x46914c(0x569)]=null,_0x57eb07['x']=this['x'],_0x57eb07['y']=this['y'],_0x57eb07['g']=0x0,_0x57eb07['f']=$gameMap[_0x46914c(0x4da)](_0x57eb07['x'],_0x57eb07['y'],_0x54480b,_0x1f7e6f),_0x212ef8[_0x46914c(0x287)](_0x57eb07),_0xd8a168[_0x46914c(0x287)](_0x57eb07['y']*_0x565c24+_0x57eb07['x']);while(_0x212ef8[_0x46914c(0x3c6)]>0x0){let _0x2ba830=0x0;for(let _0x4bd87e=0x0;_0x4bd87e<_0x212ef8[_0x46914c(0x3c6)];_0x4bd87e++){_0x212ef8[_0x4bd87e]['f']<_0x212ef8[_0x2ba830]['f']&&(_0x2ba830=_0x4bd87e);}const _0x12d3d3=_0x212ef8[_0x2ba830],_0x19130d=_0x12d3d3['x'],_0x1b96ed=_0x12d3d3['y'],_0x5799ff=_0x1b96ed*_0x565c24+_0x19130d,_0x587095=_0x12d3d3['g'];_0x212ef8[_0x46914c(0x535)](_0x2ba830,0x1),_0xd8a168[_0x46914c(0x535)](_0xd8a168['indexOf'](_0x5799ff),0x1),_0x4cac9f[_0x46914c(0x287)](_0x5799ff);if(_0x12d3d3['x']===_0x54480b&&_0x12d3d3['y']===_0x1f7e6f){_0x452a52=_0x12d3d3;break;}if(_0x587095>=_0x386dfb)continue;const _0x51bea2=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0x1b7d91=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0x163ec3=0x1;_0x163ec3<0xa;_0x163ec3++){if(_0x163ec3===0x5)continue;const _0x463936=_0x163ec3,_0x18fa73=_0x51bea2[_0x163ec3],_0x4a8d86=_0x1b7d91[_0x163ec3],_0x15f528=$gameMap['roundXWithDirection'](_0x19130d,_0x463936),_0x46ea56=$gameMap['roundYWithDirection'](_0x1b96ed,_0x463936),_0x40d290=_0x46ea56*_0x565c24+_0x15f528;if(_0x4cac9f[_0x46914c(0x36a)](_0x40d290))continue;if(this[_0x46914c(0x2cb)]===Game_Player&&VisuMZ[_0x46914c(0x399)][_0x46914c(0x446)][_0x46914c(0x204)][_0x46914c(0x453)]){if(!this[_0x46914c(0x32b)](_0x19130d,_0x1b96ed,_0x18fa73))continue;if(!this[_0x46914c(0x32b)](_0x19130d,_0x1b96ed,_0x4a8d86))continue;}if(!this[_0x46914c(0x1ff)](_0x19130d,_0x1b96ed,_0x18fa73,_0x4a8d86))continue;const _0x37fe8=_0x587095+0x1,_0x4e2262=_0xd8a168[_0x46914c(0x4f6)](_0x40d290);if(_0x4e2262<0x0||_0x37fe8<_0x212ef8[_0x4e2262]['g']){let _0x363c38={};_0x4e2262>=0x0?_0x363c38=_0x212ef8[_0x4e2262]:(_0x212ef8['push'](_0x363c38),_0xd8a168[_0x46914c(0x287)](_0x40d290)),_0x363c38[_0x46914c(0x569)]=_0x12d3d3,_0x363c38['x']=_0x15f528,_0x363c38['y']=_0x46ea56,_0x363c38['g']=_0x37fe8,_0x363c38['f']=_0x37fe8+$gameMap[_0x46914c(0x4da)](_0x15f528,_0x46ea56,_0x54480b,_0x1f7e6f),(!_0x452a52||_0x363c38['f']-_0x363c38['g']<_0x452a52['f']-_0x452a52['g'])&&(_0x452a52=_0x363c38);}}}let _0x43caab=_0x452a52;while(_0x43caab[_0x46914c(0x569)]&&_0x43caab[_0x46914c(0x569)]!==_0x57eb07){_0x43caab=_0x43caab['parent'];}const _0x28d61a=$gameMap[_0x46914c(0x4a9)](_0x43caab['x'],_0x57eb07['x']),_0x1fd63b=$gameMap[_0x46914c(0x44e)](_0x43caab['y'],_0x57eb07['y']);if(_0x28d61a<0x0&&_0x1fd63b>0x0)return 0x1;if(_0x28d61a>0x0&&_0x1fd63b>0x0)return 0x3;if(_0x28d61a<0x0&&_0x1fd63b<0x0)return 0x7;if(_0x28d61a>0x0&&_0x1fd63b<0x0)return 0x9;if(_0x1fd63b>0x0)return 0x2;if(_0x28d61a<0x0)return 0x4;if(_0x28d61a>0x0)return 0x6;if(_0x1fd63b<0x0)return 0x8;const _0x3653b4=this[_0x46914c(0x41d)](_0x54480b),_0x36efb5=this[_0x46914c(0x241)](_0x1f7e6f);if(Math['abs'](_0x3653b4)>Math[_0x46914c(0x2d5)](_0x36efb5))return _0x3653b4>0x0?0x4:0x6;else{if(_0x36efb5!==0x0)return _0x36efb5>0x0?0x8:0x2;}return 0x0;},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x314)]=Game_CharacterBase['prototype'][_0x81ac0a(0x32b)],Game_CharacterBase['prototype'][_0x81ac0a(0x32b)]=function(_0x5c3b66,_0x5a63c1,_0x48ded9){const _0x7324e=_0x81ac0a;return this[_0x7324e(0x359)]==='airship'?this[_0x7324e(0x366)]()[_0x7324e(0x582)](_0x5c3b66,_0x5a63c1,_0x48ded9):VisuMZ['EventsMoveCore'][_0x7324e(0x314)][_0x7324e(0x2a9)](this,_0x5c3b66,_0x5a63c1,_0x48ded9);},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x2dd)]=function(){const _0x11de28=_0x81ac0a;this[_0x11de28(0x4a1)]=0x0,this[_0x11de28(0x292)]=0x0;},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x2b6)]=Game_CharacterBase['prototype'][_0x81ac0a(0x4eb)],Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x4eb)]=function(){const _0x4d27b0=_0x81ac0a;return VisuMZ[_0x4d27b0(0x399)][_0x4d27b0(0x2b6)][_0x4d27b0(0x2a9)](this)+(this[_0x4d27b0(0x4a1)]||0x0);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x3ce)]=Game_CharacterBase['prototype'][_0x81ac0a(0x261)],Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x261)]=function(){const _0x25ba0a=_0x81ac0a;return VisuMZ['EventsMoveCore']['Game_CharacterBase_screenY'][_0x25ba0a(0x2a9)](this)+(this[_0x25ba0a(0x292)]||0x0);},Game_CharacterBase[_0x81ac0a(0x3a5)]['clearStepPattern']=function(){this['_stepPattern']='';},VisuMZ['EventsMoveCore']['Game_CharacterBase_updatePattern']=Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x4d1)],Game_CharacterBase[_0x81ac0a(0x3a5)]['updatePattern']=function(){const _0x244b69=_0x81ac0a;if(this[_0x244b69(0x440)])return;if(this[_0x244b69(0x1d6)]())return;VisuMZ[_0x244b69(0x399)][_0x244b69(0x39a)][_0x244b69(0x2a9)](this);},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x1d6)]=function(){const _0x29c16a=_0x81ac0a;if(!this[_0x29c16a(0x38e)]()&&this[_0x29c16a(0x2d0)]>0x0)return![];switch(String(this[_0x29c16a(0x44b)])[_0x29c16a(0x493)]()['trim']()){case'LEFT\x20TO\x20RIGHT':this['_pattern']+=0x1;if(this[_0x29c16a(0x4d5)]>0x2)this[_0x29c16a(0x585)](0x0);break;case _0x29c16a(0x394):this['_pattern']-=0x1;if(this[_0x29c16a(0x4d5)]<0x0)this[_0x29c16a(0x585)](0x2);break;case'SPIN\x20CLOCKWISE':case'SPIN\x20CW':this[_0x29c16a(0x242)]();break;case'SPIN\x20COUNTERCLOCKWISE':case _0x29c16a(0x3f6):case'SPIN\x20ANTICLOCKWISE':case _0x29c16a(0x40c):this['turnLeft90']();break;default:return![];}return!![];},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x501)]=function(){const _0x143ad2=_0x81ac0a;return $gameSystem[_0x143ad2(0x501)](this);},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x4f4)]=function(){const _0x341ef3=_0x81ac0a,_0x32bf80=this[_0x341ef3(0x501)]();if(!_0x32bf80)return![];return _0x32bf80[_0x341ef3(0x3bb)]>0x0;},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x37c)]=function(){const _0x30247f=this['direction']();return $gameMap['roundXWithDirection'](this['x'],_0x30247f);},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x27b)]=function(){const _0x38f2a7=this['direction']();return $gameMap['roundYWithDirection'](this['y'],_0x38f2a7);},Game_CharacterBase['prototype'][_0x81ac0a(0x24f)]=function(){const _0x258cba=_0x81ac0a,_0x337168=this[_0x258cba(0x363)](this[_0x258cba(0x50d)]());return $gameMap['roundXWithDirection'](this['x'],_0x337168);},Game_CharacterBase[_0x81ac0a(0x3a5)][_0x81ac0a(0x529)]=function(){const _0x41b57c=_0x81ac0a,_0x169003=this['reverseDir'](this[_0x41b57c(0x50d)]());return $gameMap['roundYWithDirection'](this['y'],_0x169003);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x2e9)]=Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x294)],Game_Character['prototype']['setMoveRoute']=function(_0x59411f){const _0x250a3f=_0x81ac0a;route=JsonEx[_0x250a3f(0x506)](_0x59411f),VisuMZ['EventsMoveCore'][_0x250a3f(0x2e9)][_0x250a3f(0x2a9)](this,route);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x552)]=Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x49f)],Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x49f)]=function(_0x4590f2){const _0x255e82=_0x81ac0a;route=JsonEx[_0x255e82(0x506)](_0x4590f2),VisuMZ[_0x255e82(0x399)][_0x255e82(0x552)][_0x255e82(0x2a9)](this,route);},VisuMZ[_0x81ac0a(0x399)]['Game_Character_processMoveCommand']=Game_Character['prototype'][_0x81ac0a(0x249)],Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x249)]=function(_0x48d15f){const _0x28df90=_0x81ac0a,_0x6a8921=Game_Character,_0x3c7604=_0x48d15f[_0x28df90(0x519)];if(_0x48d15f[_0x28df90(0x55a)]===_0x6a8921[_0x28df90(0x48e)]){let _0xe8bea7=_0x48d15f[_0x28df90(0x519)][0x0];_0xe8bea7=this[_0x28df90(0x4f0)](_0xe8bea7),_0xe8bea7=this[_0x28df90(0x202)](_0xe8bea7),this[_0x28df90(0x521)](_0x48d15f,_0xe8bea7);}else VisuMZ[_0x28df90(0x399)][_0x28df90(0x40b)]['call'](this,_0x48d15f);},Game_Character['prototype'][_0x81ac0a(0x4f0)]=function(_0x17777c){const _0x51fe6e=_0x81ac0a,_0x2d7d99=/\$gameVariables\.value\((\d+)\)/gi,_0xb43a9a=/\\V\[(\d+)\]/gi;while(_0x17777c[_0x51fe6e(0x3b2)](_0x2d7d99)){_0x17777c=_0x17777c[_0x51fe6e(0x389)](_0x2d7d99,(_0x27c748,_0x288b46)=>$gameVariables[_0x51fe6e(0x3dc)](parseInt(_0x288b46)));}while(_0x17777c[_0x51fe6e(0x3b2)](_0xb43a9a)){_0x17777c=_0x17777c[_0x51fe6e(0x389)](_0xb43a9a,(_0x1ae38a,_0x2d825d)=>$gameVariables[_0x51fe6e(0x3dc)](parseInt(_0x2d825d)));}return _0x17777c;},Game_Character[_0x81ac0a(0x3a5)]['convertSelfVariableValuesInScriptCall']=function(_0x2863c0){const _0x34fa3c=_0x81ac0a,_0x16af7a=/\\SELFVAR\[(\d+)\]/gi;while(_0x2863c0[_0x34fa3c(0x3b2)](_0x16af7a)){_0x2863c0=_0x2863c0[_0x34fa3c(0x389)](_0x16af7a,(_0xa88fde,_0x3bfe05)=>getSelfVariableValue(this[_0x34fa3c(0x483)],this[_0x34fa3c(0x339)],parseInt(_0x3bfe05)));}return _0x2863c0;},Game_Character['prototype'][_0x81ac0a(0x521)]=function(_0x536d23,_0x36bdaf){const _0x2b2ffe=_0x81ac0a;if(_0x36bdaf[_0x2b2ffe(0x3b2)](/ANIMATION:[ ](\d+)/i))return this[_0x2b2ffe(0x3bf)](Number(RegExp['$1']));if(_0x36bdaf['match'](/BALLOON:[ ](.*)/i))return this['processMoveRouteBalloon'](String(RegExp['$1']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/FADE IN:[ ](\d+)/i))return this[_0x2b2ffe(0x425)](Number(RegExp['$1']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/FADE OUT:[ ](\d+)/i))return this[_0x2b2ffe(0x559)](Number(RegExp['$1']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0x2b2ffe(0x32a)]();if(_0x36bdaf[_0x2b2ffe(0x3b2)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x2b2ffe(0x4c0)]();if(_0x36bdaf[_0x2b2ffe(0x3b2)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this['forceDashing']();if(_0x36bdaf[_0x2b2ffe(0x3b2)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x2b2ffe(0x31c)]();if(_0x36bdaf['match'](/HUG:[ ]LEFT/i))return this[_0x2b2ffe(0x463)]('left');if(_0x36bdaf[_0x2b2ffe(0x3b2)](/HUG:[ ]RIGHT/i))return this[_0x2b2ffe(0x463)](_0x2b2ffe(0x31a));if(_0x36bdaf['match'](/INDEX:[ ](\d+)/i))return this[_0x2b2ffe(0x469)](Number(RegExp['$1']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/INDEX:[ ]([\+\-]\d+)/i)){const _0x44291c=this[_0x2b2ffe(0x563)]+Number(RegExp['$1']);return this[_0x2b2ffe(0x469)](_0x44291c);}if(_0x36bdaf['match'](/JUMP FORWARD:[ ](\d+)/i))return this[_0x2b2ffe(0x444)](Number(RegExp['$1']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x2b2ffe(0x565)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x3ce275=$gameMap[_0x2b2ffe(0x31b)](Number(RegExp['$1']));return this[_0x2b2ffe(0x305)](_0x3ce275);}if(_0x36bdaf['match'](/JUMP TO PLAYER/i))return this[_0x2b2ffe(0x305)]($gamePlayer);if(_0x36bdaf['match'](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x55ee77=String(RegExp['$1']);return this[_0x2b2ffe(0x2a0)](_0x55ee77);}if(_0x36bdaf[_0x2b2ffe(0x3b2)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x23867f=Number(RegExp['$1']),_0x2dd069=Number(RegExp['$2']);return this['processMoveRouteMoveTo'](_0x23867f,_0x2dd069);}if(_0x36bdaf[_0x2b2ffe(0x3b2)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x53b4cb=$gameMap[_0x2b2ffe(0x31b)](Number(RegExp['$1']));return this['processMoveRouteMoveToCharacter'](_0x53b4cb);}if(_0x36bdaf[_0x2b2ffe(0x3b2)](/MOVE TO PLAYER/i))return this[_0x2b2ffe(0x3ef)]($gamePlayer);if(_0x36bdaf[_0x2b2ffe(0x3b2)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x2b2ffe(0x41f)](0x1,Number(RegExp['$1']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/MOVE DOWN:[ ](\d+)/i))return this[_0x2b2ffe(0x41f)](0x2,Number(RegExp['$1']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x2b2ffe(0x41f)](0x3,Number(RegExp['$1']));if(_0x36bdaf['match'](/MOVE LEFT:[ ](\d+)/i))return this[_0x2b2ffe(0x41f)](0x4,Number(RegExp['$1']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/MOVE RIGHT:[ ](\d+)/i))return this[_0x2b2ffe(0x41f)](0x6,Number(RegExp['$1']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/MOVE UPPER LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x7,Number(RegExp['$1']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/MOVE UP:[ ](\d+)/i))return this[_0x2b2ffe(0x41f)](0x8,Number(RegExp['$1']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x2b2ffe(0x41f)](0x9,Number(RegExp['$1']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/OPACITY:[ ](\d+)([%％])/i)){const _0x1eb13c=Math['round'](Number(RegExp['$1'])/0x64*0xff);return this[_0x2b2ffe(0x39d)](_0x1eb13c[_0x2b2ffe(0x322)](0x0,0xff));}if(_0x36bdaf[_0x2b2ffe(0x3b2)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x45ca52=this[_0x2b2ffe(0x303)]+Math[_0x2b2ffe(0x486)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x45ca52[_0x2b2ffe(0x322)](0x0,0xff));}if(_0x36bdaf['match'](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x1b481e=this['_opacity']+Number(RegExp['$1']);return this['setOpacity'](_0x1b481e[_0x2b2ffe(0x322)](0x0,0xff));}if(_0x36bdaf['match'](/PATTERN LOCK:[ ](\d+)/i))return this[_0x2b2ffe(0x55b)](Number(RegExp['$1']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/PATTERN UNLOCK/i))return this[_0x2b2ffe(0x440)]=![];if(_0x36bdaf[_0x2b2ffe(0x3b2)](/POSE:[ ](.*)/i)){const _0xde5472=String(RegExp['$1'])[_0x2b2ffe(0x493)]()[_0x2b2ffe(0x28f)]();return this[_0x2b2ffe(0x296)](_0xde5472);}if(_0x36bdaf['match'](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x53cc6d=Number(RegExp['$1']),_0x1f6b95=Number(RegExp['$2']);return this[_0x2b2ffe(0x4f2)](_0x53cc6d,_0x1f6b95);}if(_0x36bdaf[_0x2b2ffe(0x3b2)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x2496ac=$gameMap[_0x2b2ffe(0x31b)](Number(RegExp['$1']));return this[_0x2b2ffe(0x517)](_0x2496ac);}if(_0x36bdaf[_0x2b2ffe(0x3b2)](/STEP TOWARD PLAYER/i))return this[_0x2b2ffe(0x30f)]($gamePlayer);if(_0x36bdaf['match'](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x2b2ffe(0x332)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x83cbc=$gameMap[_0x2b2ffe(0x31b)](Number(RegExp['$1']));return this[_0x2b2ffe(0x54a)](_0x83cbc);}if(_0x36bdaf[_0x2b2ffe(0x3b2)](/STEP AWAY FROM PLAYER/i))return this[_0x2b2ffe(0x54a)]($gamePlayer);if(_0x36bdaf[_0x2b2ffe(0x3b2)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x2b2ffe(0x52f)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/TURN TO EVENT:[ ](\d+)/i)){const _0x47e2fb=$gameMap[_0x2b2ffe(0x31b)](Number(RegExp['$1']));return this['turnTowardCharacter'](_0x47e2fb);}if(_0x36bdaf[_0x2b2ffe(0x3b2)](/TURN TO PLAYER/i))return this['turnTowardCharacter']($gamePlayer);if(_0x36bdaf[_0x2b2ffe(0x3b2)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x2b2ffe(0x4c2)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x513a68=$gameMap['event'](Number(RegExp['$1']));return this[_0x2b2ffe(0x54d)](_0x513a68);}if(_0x36bdaf[_0x2b2ffe(0x3b2)](/TURN AWAY FROM PLAYER/i))return this[_0x2b2ffe(0x54d)]($gamePlayer);if(_0x36bdaf[_0x2b2ffe(0x3b2)](/TURN LOWER LEFT/i))return this[_0x2b2ffe(0x372)](0x1);if(_0x36bdaf[_0x2b2ffe(0x3b2)](/TURN LOWER RIGHT/i))return this['setDirection'](0x3);if(_0x36bdaf['match'](/TURN UPPER LEFT/i))return this['setDirection'](0x7);if(_0x36bdaf[_0x2b2ffe(0x3b2)](/TURN UPPER RIGHT/i))return this[_0x2b2ffe(0x372)](0x9);if(_0x36bdaf[_0x2b2ffe(0x3b2)](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x2b2ffe(0x4dd)](RegExp['$1'],RegExp['$2']);if(_0x36bdaf['match'](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x2b2ffe(0x593)](RegExp['$1'],RegExp['$2']);if(_0x36bdaf[_0x2b2ffe(0x3b2)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x2b2ffe(0x503)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x36bdaf[_0x2b2ffe(0x3b2)](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x3c3c4e=$gameMap['event'](Number(RegExp['$1']));return this[_0x2b2ffe(0x21a)](_0x3c3c4e);}if(_0x36bdaf[_0x2b2ffe(0x3b2)](/TELEPORT TO PLAYER/i))return this[_0x2b2ffe(0x21a)]($gamePlayer);try{VisuMZ[_0x2b2ffe(0x399)][_0x2b2ffe(0x40b)][_0x2b2ffe(0x2a9)](this,_0x536d23);}catch(_0x56caf7){if($gameTemp['isPlaytest']())console[_0x2b2ffe(0x23c)](_0x56caf7);}},Game_Character['prototype'][_0x81ac0a(0x3bf)]=function(_0x58fbd8){$gameTemp['requestAnimation']([this],_0x58fbd8);},Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x401)]=function(_0x303afc){const _0x4ddf4f=_0x81ac0a;let _0x2b5211=0x0;switch(_0x303afc[_0x4ddf4f(0x493)]()[_0x4ddf4f(0x28f)]()){case'!':case'EXCLAMATION':_0x2b5211=0x1;break;case'?':case'QUESTION':_0x2b5211=0x2;break;case _0x4ddf4f(0x4c6):case _0x4ddf4f(0x45f):case _0x4ddf4f(0x2b0):case _0x4ddf4f(0x31d):case _0x4ddf4f(0x419):_0x2b5211=0x3;break;case _0x4ddf4f(0x2f9):case _0x4ddf4f(0x258):_0x2b5211=0x4;break;case _0x4ddf4f(0x43f):_0x2b5211=0x5;break;case _0x4ddf4f(0x2da):_0x2b5211=0x6;break;case _0x4ddf4f(0x302):case _0x4ddf4f(0x4d7):case _0x4ddf4f(0x4aa):_0x2b5211=0x7;break;case _0x4ddf4f(0x4f9):case'...':_0x2b5211=0x8;break;case'LIGHT':case _0x4ddf4f(0x3ec):case _0x4ddf4f(0x2d3):case _0x4ddf4f(0x37b):case _0x4ddf4f(0x226):_0x2b5211=0x9;break;case'Z':case'ZZ':case'ZZZ':case _0x4ddf4f(0x4b6):_0x2b5211=0xa;break;case'USER-DEFINED\x201':_0x2b5211=0xb;break;case _0x4ddf4f(0x210):_0x2b5211=0xc;break;case _0x4ddf4f(0x33d):_0x2b5211=0xd;break;case'USER-DEFINED\x204':_0x2b5211=0xe;break;case _0x4ddf4f(0x510):_0x2b5211=0xf;break;}$gameTemp[_0x4ddf4f(0x400)](this,_0x2b5211);},Game_Character[_0x81ac0a(0x3a5)]['processMoveRouteFadeIn']=function(_0x450369){const _0x5b7e58=_0x81ac0a;_0x450369+=this[_0x5b7e58(0x303)],this[_0x5b7e58(0x39d)](_0x450369[_0x5b7e58(0x322)](0x0,0xff));if(this[_0x5b7e58(0x303)]<0xff)this[_0x5b7e58(0x2b8)]--;},Game_Character[_0x81ac0a(0x3a5)]['processMoveRouteFadeOut']=function(_0x17850e){const _0x55518e=_0x81ac0a;_0x17850e=this['_opacity']-_0x17850e,this[_0x55518e(0x39d)](_0x17850e[_0x55518e(0x322)](0x0,0xff));if(this[_0x55518e(0x303)]>0x0)this[_0x55518e(0x2b8)]--;},Game_Character[_0x81ac0a(0x3a5)]['processMoveRouteHugWall']=function(_0x128cce){const _0x45e0fb=_0x81ac0a,_0x322b37=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x44b699=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x13604c=this[_0x45e0fb(0x50d)](),_0x324110=(_0x128cce===_0x45e0fb(0x53c)?_0x322b37:_0x44b699)[_0x13604c],_0x3ae07a=(_0x128cce===_0x45e0fb(0x53c)?_0x44b699:_0x322b37)[_0x13604c];if(this[_0x45e0fb(0x32b)](this['x'],this['y'],_0x324110))_0x128cce===_0x45e0fb(0x53c)?this[_0x45e0fb(0x2ed)]():this[_0x45e0fb(0x242)]();else!this[_0x45e0fb(0x32b)](this['x'],this['y'],this[_0x45e0fb(0x50d)]())&&(this[_0x45e0fb(0x32b)](this['x'],this['y'],_0x3ae07a)?_0x128cce==='left'?this['turnRight90']():this['turnLeft90']():this[_0x45e0fb(0x2cf)]());this['canPass'](this['x'],this['y'],this['direction']())&&this[_0x45e0fb(0x4ec)]();},Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x469)]=function(_0x200a19){const _0x270965=_0x81ac0a;if(ImageManager[_0x270965(0x1fd)](this[_0x270965(0x1e8)]))return;_0x200a19=_0x200a19[_0x270965(0x322)](0x0,0x7),this[_0x270965(0x409)](this[_0x270965(0x1e8)],_0x200a19);},Game_Character['prototype'][_0x81ac0a(0x444)]=function(_0xd0aab3){const _0xd79f04=_0x81ac0a;switch(this[_0xd79f04(0x50d)]()){case 0x1:this[_0xd79f04(0x27e)](-_0xd0aab3,_0xd0aab3);break;case 0x2:this[_0xd79f04(0x27e)](0x0,_0xd0aab3);break;case 0x3:this[_0xd79f04(0x27e)](_0xd0aab3,_0xd0aab3);break;case 0x4:this['jump'](-_0xd0aab3,0x0);break;case 0x6:this[_0xd79f04(0x27e)](_0xd0aab3,0x0);break;case 0x7:this[_0xd79f04(0x27e)](-_0xd0aab3,-_0xd0aab3);break;case 0x8:this[_0xd79f04(0x27e)](0x0,-_0xd0aab3);break;case 0x9:this[_0xd79f04(0x27e)](_0xd0aab3,-_0xd0aab3);break;}},Game_Character['prototype'][_0x81ac0a(0x565)]=function(_0x4ab75a,_0x22158f){const _0x1995ef=_0x81ac0a,_0x4a54aa=Math[_0x1995ef(0x486)](_0x4ab75a-this['x']),_0x2b8219=Math[_0x1995ef(0x486)](_0x22158f-this['y']);this[_0x1995ef(0x27e)](_0x4a54aa,_0x2b8219);},Game_Character['prototype']['processMoveRouteJumpToCharacter']=function(_0x217e1b){const _0xfb7105=_0x81ac0a;if(_0x217e1b)this[_0xfb7105(0x565)](_0x217e1b['x'],_0x217e1b['y']);},Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x4f2)]=function(_0x498d36,_0x50ef95){const _0x595058=_0x81ac0a;let _0x19e441=0x0;$gameMap[_0x595058(0x3e3)]()?_0x19e441=this[_0x595058(0x534)](_0x498d36,_0x50ef95):_0x19e441=this[_0x595058(0x545)](_0x498d36,_0x50ef95),this[_0x595058(0x595)](_0x19e441),this[_0x595058(0x4dc)](!![]);},Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x517)]=function(_0x61b50b){if(_0x61b50b)this['processMoveRouteStepTo'](_0x61b50b['x'],_0x61b50b['y']);},Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x2aa)]=function(_0x155938,_0x32b136){const _0x35ad96=_0x81ac0a,_0x50a402=this[_0x35ad96(0x41d)](_0x155938),_0x1a48f3=this['deltaYFrom'](_0x32b136);},Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x2a0)]=function(_0x833624){const _0x4cc622=_0x81ac0a,_0xb64e95=['',_0x4cc622(0x410),_0x4cc622(0x2f0),'LOWER\x20RIGHT',_0x4cc622(0x546),'',_0x4cc622(0x252),_0x4cc622(0x499),'UP',_0x4cc622(0x29d)],_0xfc709e=_0xb64e95['indexOf'](_0x833624[_0x4cc622(0x493)]()[_0x4cc622(0x28f)]());if(_0xfc709e<=0x0)return;this[_0x4cc622(0x32b)](this['x'],this['y'],_0xfc709e)&&(this['executeMoveDir8'](_0xfc709e),this[_0x4cc622(0x2b8)]-=0x1);},Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x494)]=function(_0x4bdf66,_0x441c9d){const _0x246b43=_0x81ac0a;this[_0x246b43(0x4f2)](_0x4bdf66,_0x441c9d);if(this['x']!==_0x4bdf66||this['y']!==_0x441c9d)this['_moveRouteIndex']--;},Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x3ef)]=function(_0x3513fc){const _0x85a3c6=_0x81ac0a;if(_0x3513fc)this[_0x85a3c6(0x494)](_0x3513fc['x'],_0x3513fc['y']);},Game_Character[_0x81ac0a(0x3a5)]['processMoveRouteMoveRepeat']=function(_0x5a7009,_0x529847){const _0xc2712b=_0x81ac0a;_0x529847=_0x529847||0x0;const _0x3be339={'code':0x1,'indent':null,'parameters':[]};_0x3be339[_0xc2712b(0x55a)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x5a7009],this['_moveRoute'][_0xc2712b(0x4ed)][this[_0xc2712b(0x2b8)]][_0xc2712b(0x519)][0x0]='';while(_0x529847--){this['_moveRoute'][_0xc2712b(0x4ed)][_0xc2712b(0x535)](this[_0xc2712b(0x2b8)]+0x1,0x0,_0x3be339);}},Game_Character['prototype']['processMoveRoutePatternLock']=function(_0x4b8a9b){const _0x23ce6e=_0x81ac0a;this[_0x23ce6e(0x440)]=!![],this['setPattern'](_0x4b8a9b);},Game_Character[_0x81ac0a(0x3a5)]['processMoveRouteSelfSwitch']=function(_0x368d08,_0x239ae4){const _0x3c8488=_0x81ac0a;if(this===$gamePlayer)return;const _0x47c242=[this[_0x3c8488(0x483)],this[_0x3c8488(0x339)],'A'];_0x368d08['match'](/\b[ABCD]\b/i)?_0x47c242[0x2]=String(_0x368d08)['charAt'](0x0)[_0x3c8488(0x493)]()[_0x3c8488(0x28f)]():_0x47c242[0x2]='Self\x20Switch\x20%1'['format'](_0x368d08);switch(_0x239ae4[_0x3c8488(0x493)]()[_0x3c8488(0x28f)]()){case'ON':case _0x3c8488(0x347):$gameSelfSwitches[_0x3c8488(0x421)](_0x47c242,!![]);break;case _0x3c8488(0x4c7):case _0x3c8488(0x52e):$gameSelfSwitches[_0x3c8488(0x421)](_0x47c242,![]);break;case _0x3c8488(0x4a4):$gameSelfSwitches[_0x3c8488(0x421)](_0x47c242,!$gameSelfSwitches[_0x3c8488(0x3dc)](_0x47c242));break;}},Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x593)]=function(_0xb324a,_0x24b3f1){const _0xc24bec=_0x81ac0a;if(this===$gamePlayer)return;const _0x27e620=[this['_mapId'],this[_0xc24bec(0x339)],'Self\x20Variable\x20%1'[_0xc24bec(0x568)](switchId)];$gameSelfSwitches[_0xc24bec(0x421)](_0x27e620,Number(_0x24b3f1));},Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x503)]=function(_0x447626,_0x5a95b0){const _0x40f063=_0x81ac0a;this[_0x40f063(0x288)](_0x447626,_0x5a95b0);},Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x21a)]=function(_0x158c22){const _0xf1f997=_0x81ac0a;if(_0x158c22)this[_0xf1f997(0x503)](_0x158c22['x'],_0x158c22['y']);},Game_Character['prototype'][_0x81ac0a(0x242)]=function(){const _0x46e9dc=_0x81ac0a;switch(this[_0x46e9dc(0x50d)]()){case 0x1:this[_0x46e9dc(0x372)](0x7);break;case 0x2:this[_0x46e9dc(0x372)](0x4);break;case 0x3:this[_0x46e9dc(0x372)](0x1);break;case 0x4:this[_0x46e9dc(0x372)](0x8);break;case 0x6:this[_0x46e9dc(0x372)](0x2);break;case 0x7:this['setDirection'](0x9);break;case 0x8:this[_0x46e9dc(0x372)](0x6);break;case 0x9:this['setDirection'](0x3);break;}},Game_Character[_0x81ac0a(0x3a5)]['turnLeft90']=function(){const _0x5c0280=_0x81ac0a;switch(this[_0x5c0280(0x50d)]()){case 0x1:this[_0x5c0280(0x372)](0x3);break;case 0x2:this[_0x5c0280(0x372)](0x6);break;case 0x3:this[_0x5c0280(0x372)](0x9);break;case 0x4:this[_0x5c0280(0x372)](0x2);break;case 0x6:this[_0x5c0280(0x372)](0x8);break;case 0x7:this[_0x5c0280(0x372)](0x1);break;case 0x8:this['setDirection'](0x4);break;case 0x9:this['setDirection'](0x7);break;}},Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x3fd)]=function(_0x10788b,_0x38bd14,_0x2f6b58){const _0x2f7882=_0x81ac0a,_0xfacdf5=this[_0x2f7882(0x41d)](_0x10788b),_0x290be5=this[_0x2f7882(0x241)](_0x38bd14);if($gameMap['isSupportDiagonalMovement']()){if(_0x2f6b58||this['isSpriteVS8dir']()){if(_0xfacdf5>0x0&&_0x290be5<0x0)return 0x1;if(_0xfacdf5<0x0&&_0x290be5<0x0)return 0x3;if(_0xfacdf5>0x0&&_0x290be5>0x0)return 0x7;if(_0xfacdf5<0x0&&_0x290be5>0x0)return 0x9;}}if(Math[_0x2f7882(0x2d5)](_0xfacdf5)>Math[_0x2f7882(0x2d5)](_0x290be5))return _0xfacdf5>0x0?0x4:0x6;else{if(_0x290be5!==0x0)return _0x290be5>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x3f4)]=function(_0x454b93,_0x4b6bbb,_0x172165){const _0x43131c=_0x81ac0a,_0x37a08f=this['deltaXFrom'](_0x454b93),_0x2b19e6=this[_0x43131c(0x241)](_0x4b6bbb);if($gameMap[_0x43131c(0x3e3)]()){if(_0x172165||this[_0x43131c(0x3e5)]()){if(_0x37a08f>0x0&&_0x2b19e6<0x0)return 0x9;if(_0x37a08f<0x0&&_0x2b19e6<0x0)return 0x7;if(_0x37a08f>0x0&&_0x2b19e6>0x0)return 0x3;if(_0x37a08f<0x0&&_0x2b19e6>0x0)return 0x1;}}if(Math[_0x43131c(0x2d5)](_0x37a08f)>Math[_0x43131c(0x2d5)](_0x2b19e6))return _0x37a08f>0x0?0x6:0x4;else{if(_0x2b19e6!==0x0)return _0x2b19e6>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x52f)]=function(_0x47d76f,_0xb0d878){const _0x2c0e02=_0x81ac0a,_0x5d3cc0=this[_0x2c0e02(0x3fd)](_0x47d76f,_0xb0d878,!![]);if(_0x5d3cc0)this[_0x2c0e02(0x595)](_0x5d3cc0);},Game_Character['prototype'][_0x81ac0a(0x332)]=function(_0x10d576,_0x3cbc11){const _0x38c588=_0x81ac0a,_0x5d9028=this[_0x38c588(0x3f4)](_0x10d576,_0x3cbc11,!![]);if(_0x5d9028)this[_0x38c588(0x595)](_0x5d9028);},Game_Character[_0x81ac0a(0x3a5)]['turnTowardPoint']=function(_0x235e0e,_0x5f146c){const _0x4b1357=_0x81ac0a,_0x113d34=this[_0x4b1357(0x3fd)](_0x235e0e,_0x5f146c,![]);if(_0x113d34)this[_0x4b1357(0x372)](_0x113d34);},Game_Character[_0x81ac0a(0x3a5)]['turnAwayFromPoint']=function(_0x244518,_0x4fdb7a){const _0x2cbd20=_0x81ac0a,_0x5a7bc7=this[_0x2cbd20(0x3f4)](_0x244518,_0x4fdb7a,![]);if(_0x5a7bc7)this[_0x2cbd20(0x372)](_0x5a7bc7);},Game_Character[_0x81ac0a(0x3a5)]['moveTowardCharacter']=function(_0x2e5ae8){const _0x2320ef=_0x81ac0a;if(_0x2e5ae8)this[_0x2320ef(0x52f)](_0x2e5ae8['x'],_0x2e5ae8['y']);},Game_Character[_0x81ac0a(0x3a5)]['moveAwayFromCharacter']=function(_0x55877b){const _0x10aa64=_0x81ac0a;if(_0x55877b)this[_0x10aa64(0x332)](_0x55877b['x'],_0x55877b['y']);},Game_Character['prototype']['turnTowardCharacter']=function(_0x40676b){const _0x54d734=_0x81ac0a;if(_0x40676b)this[_0x54d734(0x3c3)](_0x40676b['x'],_0x40676b['y']);},Game_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x54d)]=function(_0x20990f){const _0x4b6d2f=_0x81ac0a;if(_0x20990f)this[_0x4b6d2f(0x4c2)](_0x20990f['x'],_0x20990f['y']);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x1d3)]=Game_Player[_0x81ac0a(0x3a5)][_0x81ac0a(0x2d9)],Game_Player[_0x81ac0a(0x3a5)][_0x81ac0a(0x2d9)]=function(){const _0xc62595=_0x81ac0a;if(this['_forceDashing'])return!![];return VisuMZ[_0xc62595(0x399)][_0xc62595(0x1d3)]['call'](this);},Game_Player[_0x81ac0a(0x3a5)][_0x81ac0a(0x3e6)]=function(){const _0x7a59e5=_0x81ac0a;return this[_0x7a59e5(0x2d9)]()&&(this[_0x7a59e5(0x3b4)]()||this[_0x7a59e5(0x573)]()!==0x0&&this['canPass'](this['_x'],this['_y'],this[_0x7a59e5(0x573)]())||$gameTemp[_0x7a59e5(0x28b)]());},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x2b2)]=Game_Player[_0x81ac0a(0x3a5)][_0x81ac0a(0x573)],Game_Player['prototype'][_0x81ac0a(0x573)]=function(){const _0x29bbe0=_0x81ac0a;return $gameMap[_0x29bbe0(0x3e3)]()?this[_0x29bbe0(0x384)]():VisuMZ[_0x29bbe0(0x399)][_0x29bbe0(0x2b2)][_0x29bbe0(0x2a9)](this);},Game_Player['prototype']['getInputDir8']=function(){const _0xb39885=_0x81ac0a;return Input[_0xb39885(0x330)];},Game_Player[_0x81ac0a(0x3a5)][_0x81ac0a(0x34a)]=function(){const _0x17563e=_0x81ac0a;if($gameSystem[_0x17563e(0x52a)]())return 0x0;if(!this[_0x17563e(0x3b4)]()&&this[_0x17563e(0x405)]()){let _0x58ff29=this[_0x17563e(0x573)]();if(_0x58ff29>0x0)$gameTemp['clearDestination']();else{if($gameTemp[_0x17563e(0x28b)]()){const _0x3d59a0=$gameTemp[_0x17563e(0x583)](),_0x552f5=$gameTemp[_0x17563e(0x3ed)](),_0x26fab5=$gameMap[_0x17563e(0x3e3)](),_0x5ade6d=$gameMap[_0x17563e(0x471)](_0x3d59a0,_0x552f5),_0x3309a3=$gameMap[_0x17563e(0x51e)](_0x3d59a0,_0x552f5)[_0x17563e(0x3c6)]<=0x0;_0x26fab5&&_0x5ade6d&&_0x3309a3?_0x58ff29=this['findDiagonalDirectionTo'](_0x3d59a0,_0x552f5):_0x58ff29=this[_0x17563e(0x545)](_0x3d59a0,_0x552f5);}}_0x58ff29>0x0?(this[_0x17563e(0x1f6)]=this[_0x17563e(0x1f6)]||0x0,this['isTurnInPlace']()?this[_0x17563e(0x372)](_0x58ff29):this['executeMove'](_0x58ff29),this['_inputTime']++):this[_0x17563e(0x1f6)]=0x0;}},Game_Player[_0x81ac0a(0x3a5)]['isTurnInPlace']=function(){const _0x130103=_0x81ac0a,_0x22e0e0=VisuMZ[_0x130103(0x399)][_0x130103(0x446)][_0x130103(0x204)];if(!_0x22e0e0[_0x130103(0x3ba)])return![];if($gameTemp['isDestinationValid']())return![];if(this[_0x130103(0x2d9)]()||this[_0x130103(0x3b4)]()||this[_0x130103(0x47d)]())return![];return this[_0x130103(0x1f6)]<_0x22e0e0[_0x130103(0x4bb)];},VisuMZ['EventsMoveCore'][_0x81ac0a(0x343)]=Game_Player[_0x81ac0a(0x3a5)][_0x81ac0a(0x390)],Game_Player[_0x81ac0a(0x3a5)][_0x81ac0a(0x390)]=function(_0x57fd0f){const _0x4aadb1=_0x81ac0a;$gameMap['isSupportDiagonalMovement']()?this[_0x4aadb1(0x595)](_0x57fd0f):VisuMZ[_0x4aadb1(0x399)][_0x4aadb1(0x343)][_0x4aadb1(0x2a9)](this,_0x57fd0f);},VisuMZ['EventsMoveCore'][_0x81ac0a(0x2ee)]=Game_Player[_0x81ac0a(0x3a5)][_0x81ac0a(0x4e9)],Game_Player[_0x81ac0a(0x3a5)][_0x81ac0a(0x4e9)]=function(_0x409f46,_0x58c1c9,_0x3c2bca){const _0x499168=_0x81ac0a;if($gameMap[_0x499168(0x1e5)](_0x409f46,_0x58c1c9,_0x3c2bca,_0x499168(0x253)))return this[_0x499168(0x39b)]()&&this[_0x499168(0x366)]()?this[_0x499168(0x366)]()[_0x499168(0x4e9)](_0x409f46,_0x58c1c9,_0x3c2bca):!![];if($gameMap[_0x499168(0x558)](_0x409f46,_0x58c1c9,_0x3c2bca,_0x499168(0x253)))return![];return VisuMZ[_0x499168(0x399)][_0x499168(0x2ee)][_0x499168(0x2a9)](this,_0x409f46,_0x58c1c9,_0x3c2bca);},VisuMZ['EventsMoveCore'][_0x81ac0a(0x49a)]=Game_Player[_0x81ac0a(0x3a5)][_0x81ac0a(0x3af)],Game_Player[_0x81ac0a(0x3a5)][_0x81ac0a(0x3af)]=function(_0x25d392){const _0x3a57b6=_0x81ac0a;VisuMZ[_0x3a57b6(0x399)]['Game_Player_checkEventTriggerHere'][_0x3a57b6(0x2a9)](this,_0x25d392);if(this[_0x3a57b6(0x21e)]()){this[_0x3a57b6(0x4cb)](_0x25d392);if(_0x25d392[_0x3a57b6(0x36a)](0x0)&&this[_0x3a57b6(0x273)]()===_0x3a57b6(0x3c1))this['startMapCommonEventOnOK'](this['x'],this['y']);else(_0x25d392['includes'](0x1)||_0x25d392[_0x3a57b6(0x36a)](0x2))&&this[_0x3a57b6(0x4e1)]();}},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x37a)]=Game_Player[_0x81ac0a(0x3a5)]['checkEventTriggerThere'],Game_Player[_0x81ac0a(0x3a5)][_0x81ac0a(0x589)]=function(_0xe94a6c){const _0x5a9be0=_0x81ac0a;VisuMZ[_0x5a9be0(0x399)][_0x5a9be0(0x37a)][_0x5a9be0(0x2a9)](this,_0xe94a6c);if(this[_0x5a9be0(0x21e)]()&&_0xe94a6c[_0x5a9be0(0x36a)](0x0)&&this[_0x5a9be0(0x273)]()===_0x5a9be0(0x4e5)){const _0x375564=this[_0x5a9be0(0x50d)](),_0x136525=$gameMap[_0x5a9be0(0x1db)](this['x'],_0x375564),_0x280769=$gameMap[_0x5a9be0(0x570)](this['y'],_0x375564);this[_0x5a9be0(0x4b4)](_0x136525,_0x280769);}},Game_Player[_0x81ac0a(0x3a5)]['checkEventTriggerEventsMoveCore']=function(_0x31ab83){const _0x29f7a9=_0x81ac0a;if($gameMap[_0x29f7a9(0x538)]())return;if($gameMap[_0x29f7a9(0x31f)]())return;const _0x317f4d=$gameMap['events']();for(const _0x98c5f5 of _0x317f4d){if(!_0x98c5f5)continue;if(!_0x98c5f5[_0x29f7a9(0x344)](_0x31ab83))continue;if(this[_0x29f7a9(0x324)](_0x98c5f5))return _0x98c5f5['start']();if(this[_0x29f7a9(0x4a2)](_0x98c5f5))return _0x98c5f5[_0x29f7a9(0x3e0)]();}},Game_Player[_0x81ac0a(0x3a5)][_0x81ac0a(0x324)]=function(_0x47c78e){const _0x368ca7=_0x81ac0a;if($gameMap['isEventRunning']())return![];if($gameMap[_0x368ca7(0x31f)]())return![];return _0x47c78e[_0x368ca7(0x55d)]()[_0x368ca7(0x36a)](this[_0x368ca7(0x1e2)]());},Game_Player[_0x81ac0a(0x3a5)][_0x81ac0a(0x4a2)]=function(_0x538d88){const _0x282450=_0x81ac0a;if($gameMap[_0x282450(0x538)]())return![];if($gameMap[_0x282450(0x31f)]())return![];if([_0x282450(0x2fe),_0x282450(0x212)][_0x282450(0x36a)](_0x538d88[_0x282450(0x3e4)]()))return![];const _0x1661d7=_0x538d88[_0x282450(0x3e4)](),_0x489cf9=_0x538d88[_0x282450(0x379)]();switch(_0x1661d7){case _0x282450(0x259):const _0x43342f=$gameMap[_0x282450(0x4da)](this['x'],this['y'],_0x538d88['x'],_0x538d88['y']);return _0x538d88['activationProximityDistance']()>=_0x43342f;break;case _0x282450(0x437):return _0x489cf9>=Math['abs'](_0x538d88[_0x282450(0x41d)](this['x']))&&_0x489cf9>=Math[_0x282450(0x2d5)](_0x538d88[_0x282450(0x241)](this['y']));break;case _0x282450(0x25d):return _0x489cf9>=Math['abs'](_0x538d88[_0x282450(0x241)](this['y']));break;case'column':return _0x489cf9>=Math[_0x282450(0x2d5)](_0x538d88['deltaXFrom'](this['x']));break;case _0x282450(0x57b):return![];break;}},Game_Player[_0x81ac0a(0x3a5)][_0x81ac0a(0x4b4)]=function(_0x3e6d64,_0x3b0719){const _0xbf09d9=_0x81ac0a;if($gameMap[_0xbf09d9(0x538)]())return;if($gameMap['isAnyEventStarting']())return;let _0x44ab9e=VisuMZ[_0xbf09d9(0x399)][_0xbf09d9(0x446)][_0xbf09d9(0x219)],_0x4fabe5=$gameMap[_0xbf09d9(0x1e2)](_0x3e6d64,_0x3b0719);const _0xfd3319=_0xbf09d9(0x4cc)[_0xbf09d9(0x568)](_0x4fabe5);_0x44ab9e[_0xfd3319]&&$gameTemp['reserveCommonEvent'](_0x44ab9e[_0xfd3319]);},Game_Player[_0x81ac0a(0x3a5)][_0x81ac0a(0x273)]=function(){const _0x72192a=_0x81ac0a;return VisuMZ['EventsMoveCore'][_0x72192a(0x446)][_0x72192a(0x365)];},Game_Player['prototype']['startMapCommonEventOnTouch']=function(){const _0x8d49eb=_0x81ac0a;if($gameMap['isEventRunning']())return;if($gameMap[_0x8d49eb(0x31f)]())return;let _0x279215=VisuMZ[_0x8d49eb(0x399)][_0x8d49eb(0x446)][_0x8d49eb(0x45e)];const _0x110dc8=_0x8d49eb(0x4cc)['format'](this[_0x8d49eb(0x1e2)]());_0x279215[_0x110dc8]&&$gameTemp[_0x8d49eb(0x403)](_0x279215[_0x110dc8]);},VisuMZ[_0x81ac0a(0x399)]['Game_Player_increaseSteps']=Game_Player[_0x81ac0a(0x3a5)][_0x81ac0a(0x234)],Game_Player['prototype'][_0x81ac0a(0x234)]=function(){const _0x240e10=_0x81ac0a;VisuMZ[_0x240e10(0x399)][_0x240e10(0x57f)]['call'](this),VisuMZ['MoveAllSynchTargets'](0x0);},VisuMZ['EventsMoveCore'][_0x81ac0a(0x3f7)]=Game_Follower[_0x81ac0a(0x3a5)][_0x81ac0a(0x418)],Game_Follower[_0x81ac0a(0x3a5)]['initialize']=function(_0x52f49c){const _0x24ee1a=_0x81ac0a;VisuMZ[_0x24ee1a(0x399)]['Game_Follower_initialize'][_0x24ee1a(0x2a9)](this,_0x52f49c),this[_0x24ee1a(0x3a6)]=![];},Game_Follower[_0x81ac0a(0x3a5)][_0x81ac0a(0x2d9)]=function(){const _0x387de8=_0x81ac0a;return $gamePlayer[_0x387de8(0x2d9)]();},Game_Follower['prototype'][_0x81ac0a(0x3e6)]=function(){return $gamePlayer['isDashingAndMoving']();},Game_Follower[_0x81ac0a(0x3a5)][_0x81ac0a(0x4c1)]=function(){const _0x4b7e13=_0x81ac0a;return $gamePlayer[_0x4b7e13(0x4c1)]();},Game_Follower[_0x81ac0a(0x3a5)][_0x81ac0a(0x56b)]=function(_0x2341c9){const _0x56227e=_0x81ac0a;this[_0x56227e(0x3a6)]=_0x2341c9;},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x34d)]=Game_Follower['prototype'][_0x81ac0a(0x35f)],Game_Follower[_0x81ac0a(0x3a5)][_0x81ac0a(0x35f)]=function(_0x10f000){const _0x303a63=_0x81ac0a;if(this[_0x303a63(0x3a6)])return;if($gameSystem['isStopFollowerChasing']())return;VisuMZ[_0x303a63(0x399)][_0x303a63(0x34d)][_0x303a63(0x2a9)](this,_0x10f000);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x47a)]=Game_Vehicle['prototype'][_0x81ac0a(0x4e9)],Game_Vehicle['prototype'][_0x81ac0a(0x4e9)]=function(_0x4dbfd6,_0x169597,_0x48aded){const _0xa3b29b=_0x81ac0a;if($gameMap[_0xa3b29b(0x1e5)](_0x4dbfd6,_0x169597,_0x48aded,this[_0xa3b29b(0x599)]))return!![];if($gameMap[_0xa3b29b(0x558)](_0x4dbfd6,_0x169597,_0x48aded,this[_0xa3b29b(0x599)]))return![];return VisuMZ['EventsMoveCore'][_0xa3b29b(0x47a)][_0xa3b29b(0x2a9)](this,_0x4dbfd6,_0x169597,_0x48aded);},Game_Vehicle[_0x81ac0a(0x3a5)][_0x81ac0a(0x582)]=function(_0x304511,_0x49b883,_0xc99e63){const _0x48cbb3=_0x81ac0a;if($gameMap[_0x48cbb3(0x1e5)](_0x304511,_0x49b883,_0xc99e63,this[_0x48cbb3(0x599)]))return!![];if($gameMap['isRegionForbidPass'](_0x304511,_0x49b883,_0xc99e63,this[_0x48cbb3(0x599)]))return![];return VisuMZ[_0x48cbb3(0x399)][_0x48cbb3(0x314)][_0x48cbb3(0x2a9)]($gamePlayer,_0x304511,_0x49b883,_0xc99e63);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x2ac)]=Game_Vehicle[_0x81ac0a(0x3a5)]['isLandOk'],Game_Vehicle[_0x81ac0a(0x3a5)]['isLandOk']=function(_0x1659e3,_0x3f0e84,_0x489b91){const _0x472851=_0x81ac0a;if($gameMap['isRegionDockable'](_0x1659e3,_0x3f0e84,_0x489b91,this[_0x472851(0x599)]))return!![];const _0x397059=this[_0x472851(0x599)][_0x472851(0x3cf)](0x0)[_0x472851(0x493)]()+this['_type']['slice'](0x1),_0x30a8e0=_0x472851(0x240)[_0x472851(0x568)](_0x397059);return VisuMZ['EventsMoveCore'][_0x472851(0x446)][_0x472851(0x283)][_0x30a8e0]?![]:VisuMZ['EventsMoveCore'][_0x472851(0x2ac)][_0x472851(0x2a9)](this,_0x1659e3,_0x3f0e84,_0x489b91);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x4d4)]=Game_Vehicle[_0x81ac0a(0x3a5)][_0x81ac0a(0x49d)],Game_Vehicle[_0x81ac0a(0x3a5)]['initMoveSpeed']=function(){const _0x1ce087=_0x81ac0a;VisuMZ[_0x1ce087(0x399)][_0x1ce087(0x4d4)]['call'](this);const _0x322175=VisuMZ['EventsMoveCore'][_0x1ce087(0x446)][_0x1ce087(0x204)];if(this[_0x1ce087(0x336)]()){if(_0x322175[_0x1ce087(0x33c)])this[_0x1ce087(0x508)](_0x322175[_0x1ce087(0x33c)]);}else{if(this[_0x1ce087(0x3df)]()){if(_0x322175[_0x1ce087(0x26d)])this[_0x1ce087(0x508)](_0x322175[_0x1ce087(0x26d)]);}else{if(this[_0x1ce087(0x308)]()){if(_0x322175[_0x1ce087(0x23e)])this[_0x1ce087(0x508)](_0x322175[_0x1ce087(0x23e)]);}}}},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x59a)]=Game_Event['prototype'][_0x81ac0a(0x418)],Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x418)]=function(_0x494a1e,_0x20c175){const _0x4dbf6a=_0x81ac0a;VisuMZ[_0x4dbf6a(0x399)][_0x4dbf6a(0x59a)][_0x4dbf6a(0x2a9)](this,_0x494a1e,_0x20c175),this[_0x4dbf6a(0x3b5)](),this[_0x4dbf6a(0x57d)](),this[_0x4dbf6a(0x4af)]();},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x3d9)]=Game_Event[_0x81ac0a(0x3a5)]['event'],Game_Event[_0x81ac0a(0x3a5)]['event']=function(){const _0x1cc93f=_0x81ac0a;if(this[_0x1cc93f(0x4de)]!==undefined){const _0x49c2bb=this[_0x1cc93f(0x4de)][_0x1cc93f(0x4ae)],_0x47d1dd=this[_0x1cc93f(0x4de)]['eventId'];return VisuMZ[_0x1cc93f(0x4b7)][_0x49c2bb]['events'][_0x47d1dd];}if(this[_0x1cc93f(0x50a)]!==undefined){const _0x23f219=this['_eventCopyData']['mapId'],_0x4aaa65=this[_0x1cc93f(0x50a)][_0x1cc93f(0x377)];return VisuMZ[_0x1cc93f(0x4b7)][_0x23f219][_0x1cc93f(0x44a)][_0x4aaa65];}if(this[_0x1cc93f(0x4cf)]!==undefined){const _0x112072=this['_eventSpawnData'][_0x1cc93f(0x4ae)],_0x60a326=this['_eventSpawnData'][_0x1cc93f(0x377)];return VisuMZ[_0x1cc93f(0x4b7)][_0x112072][_0x1cc93f(0x44a)][_0x60a326];}if($gameTemp['_spawnData']!==undefined){const _0x3da998=$gameTemp['_spawnData']['mapId'],_0x11b9af=$gameTemp[_0x1cc93f(0x3d2)][_0x1cc93f(0x377)];return VisuMZ['PreloadedMaps'][_0x3da998][_0x1cc93f(0x44a)][_0x11b9af];}return VisuMZ[_0x1cc93f(0x399)][_0x1cc93f(0x3d9)]['call'](this);},Game_Event['prototype'][_0x81ac0a(0x2ae)]=function(_0x217605,_0x4e5344){const _0x37dbfe=_0x81ac0a;if(_0x217605===0x0||_0x4e5344===0x0)return![];if(!VisuMZ[_0x37dbfe(0x4b7)][_0x217605])return $gameTemp[_0x37dbfe(0x3d6)]()&&console[_0x37dbfe(0x23c)](_0x37dbfe(0x57a)[_0x37dbfe(0x568)](_0x217605)),![];return!![];},VisuMZ['EventsMoveCore'][_0x81ac0a(0x298)]=Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x3e0)],Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x3e0)]=function(){const _0x1a2f7d=_0x81ac0a;VisuMZ[_0x1a2f7d(0x399)][_0x1a2f7d(0x298)]['call'](this),Imported['VisuMZ_1_MessageCore']&&Input[_0x1a2f7d(0x227)](VisuMZ['MessageCore'][_0x1a2f7d(0x446)]['General']['FastForwardKey'])&&Input[_0x1a2f7d(0x1e9)]();},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x3b5)]=function(){const _0x2d0996=_0x81ac0a,_0x4ed019=this['event']()['note'];if(_0x4ed019==='')return;if(DataManager[_0x2d0996(0x266)]()||DataManager[_0x2d0996(0x1f8)]())return;const _0x133449=VisuMZ[_0x2d0996(0x399)][_0x2d0996(0x446)][_0x2d0996(0x2a6)];let _0x4be339=null,_0x5e9a80=0x0,_0x268125=0x0;if(_0x4ed019[_0x2d0996(0x3b2)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x5e9a80=Number(RegExp['$1']),_0x268125=Number(RegExp['$2']);else{if(_0x4ed019['match'](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x5e9a80=Number(RegExp['$1']),_0x268125=Number(RegExp['$2']);else{if(_0x4ed019[_0x2d0996(0x3b2)](/<COPY EVENT:[ ](.*?)>/i)){const _0x4c8635=String(RegExp['$1'])[_0x2d0996(0x493)]()[_0x2d0996(0x28f)]();_0x4be339=VisuMZ['EventTemplates'][_0x4c8635];if(!_0x4be339)return;_0x5e9a80=_0x4be339[_0x2d0996(0x28c)],_0x268125=_0x4be339[_0x2d0996(0x3a1)];}}}if(!this[_0x2d0996(0x2ae)](_0x5e9a80,_0x268125))return;_0x133449['PreCopyJS'][_0x2d0996(0x2a9)](this,_0x5e9a80,_0x268125,this);if(_0x4be339)_0x4be339[_0x2d0996(0x3bc)][_0x2d0996(0x2a9)](this,_0x5e9a80,_0x268125,this);this[_0x2d0996(0x50a)]={'mapId':_0x5e9a80,'eventId':_0x268125},this[_0x2d0996(0x2d6)]=-0x2,this['refresh'](),_0x133449['PostCopyJS'][_0x2d0996(0x2a9)](this,_0x5e9a80,_0x268125,this);if(_0x4be339)_0x4be339[_0x2d0996(0x51c)]['call'](this,_0x5e9a80,_0x268125,this);$gameMap[_0x2d0996(0x27f)]();},Game_Event[_0x81ac0a(0x3a5)]['setupMorphEvent']=function(){const _0x531148=_0x81ac0a,_0x492cc2=$gameSystem[_0x531148(0x50f)](this);if(!_0x492cc2)return;const _0x583526=_0x492cc2[_0x531148(0x3d0)]['toUpperCase']()[_0x531148(0x28f)]();_0x583526!==_0x531148(0x3ae)?this['morphIntoTemplate'](_0x583526,!![]):this[_0x531148(0x512)](_0x492cc2[_0x531148(0x4ae)],_0x492cc2[_0x531148(0x377)],!![]);},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x512)]=function(_0xfcaa31,_0x39ea42,_0x1f1552){const _0xf091ab=_0x81ac0a;if(!this[_0xf091ab(0x2ae)](_0xfcaa31,_0x39ea42))return;const _0x33c90a=VisuMZ['EventsMoveCore']['Settings'][_0xf091ab(0x2a6)];if(!_0x1f1552)_0x33c90a[_0xf091ab(0x3c9)][_0xf091ab(0x2a9)](this,_0xfcaa31,_0x39ea42,this);this[_0xf091ab(0x4de)]={'mapId':_0xfcaa31,'eventId':_0x39ea42},this[_0xf091ab(0x2d6)]=-0x2,this[_0xf091ab(0x443)]();if(!_0x1f1552)_0x33c90a[_0xf091ab(0x580)][_0xf091ab(0x2a9)](this,_0xfcaa31,_0x39ea42,this);$gameMap[_0xf091ab(0x27f)]();},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x1f7)]=function(_0x2e09e6,_0x5a0607){const _0x94b290=_0x81ac0a;_0x2e09e6=_0x2e09e6[_0x94b290(0x493)]()[_0x94b290(0x28f)]();const _0x711296=VisuMZ['EventTemplates'][_0x2e09e6];if(!_0x711296)return;const _0x4567e7=_0x711296[_0x94b290(0x28c)],_0x2a82c7=_0x711296['EventID'];if(!this[_0x94b290(0x2ae)](_0x4567e7,_0x2a82c7))return;if(!_0x5a0607)_0x711296['PreMorphJS'][_0x94b290(0x2a9)](this,_0x4567e7,_0x2a82c7,this);this[_0x94b290(0x512)](_0x4567e7,_0x2a82c7,_0x5a0607);if(!_0x5a0607)_0x711296[_0x94b290(0x580)][_0x94b290(0x2a9)](this,_0x4567e7,_0x2a82c7,this);this[_0x94b290(0x27f)]();},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x35d)]=function(){const _0x42d526=_0x81ac0a;this[_0x42d526(0x4de)]=undefined,this['_pageIndex']=-0x2,this[_0x42d526(0x443)]();},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x45d)]=function(_0x180096){const _0x30bdc0=_0x81ac0a,_0x3d3e32=VisuMZ[_0x30bdc0(0x399)][_0x30bdc0(0x446)][_0x30bdc0(0x2a6)],_0x33956a=_0x180096[_0x30bdc0(0x3d0)]['toUpperCase']()['trim'](),_0x14a612=!['',_0x30bdc0(0x3ae)][_0x30bdc0(0x36a)](_0x33956a);let _0x436095=0x0,_0x4e8b27=0x0;if(_0x14a612){const _0x563413=VisuMZ[_0x30bdc0(0x2e5)][_0x33956a];if(!_0x563413)return;_0x436095=_0x563413[_0x30bdc0(0x28c)],_0x4e8b27=_0x563413[_0x30bdc0(0x3a1)];}else _0x436095=_0x180096[_0x30bdc0(0x4ae)],_0x4e8b27=_0x180096[_0x30bdc0(0x377)];if(!this[_0x30bdc0(0x2ae)](_0x436095,_0x4e8b27))return;if(_0x14a612){const _0x27087c=VisuMZ[_0x30bdc0(0x2e5)][_0x33956a];_0x27087c[_0x30bdc0(0x276)][_0x30bdc0(0x2a9)](this,_0x436095,_0x4e8b27,this);}_0x3d3e32['PreSpawnJS'][_0x30bdc0(0x2a9)](this,_0x436095,_0x4e8b27,this),this[_0x30bdc0(0x4cf)]=_0x180096,this[_0x30bdc0(0x2d6)]=-0x2,this['_mapId']=$gameMap['mapId'](),this['_eventId']=_0x180096[_0x30bdc0(0x3a0)],this['_spawnPreserved']=_0x180096[_0x30bdc0(0x544)],this[_0x30bdc0(0x288)](_0x180096['x'],_0x180096['y']),this[_0x30bdc0(0x372)](_0x180096[_0x30bdc0(0x50d)]),this[_0x30bdc0(0x443)]();if(_0x14a612){const _0x5e7d33=VisuMZ[_0x30bdc0(0x2e5)][_0x33956a];if(!_0x5e7d33)return;_0x5e7d33['PostSpawnJS'][_0x30bdc0(0x2a9)](this,_0x436095,_0x4e8b27,this);}_0x3d3e32[_0x30bdc0(0x459)][_0x30bdc0(0x2a9)](this,_0x436095,_0x4e8b27,this);const _0x9adfff=SceneManager[_0x30bdc0(0x34e)];if(_0x9adfff&&_0x9adfff[_0x30bdc0(0x2f5)])_0x9adfff[_0x30bdc0(0x2f5)]['createSpawnedEvent'](this);},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x3f5)]=function(){return!!this['_eventSpawnData'];},VisuMZ[_0x81ac0a(0x399)]['Game_Event_refresh']=Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x443)],Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x443)]=function(){const _0x242224=_0x81ac0a,_0x2e1228=this[_0x242224(0x2d6)];VisuMZ[_0x242224(0x399)][_0x242224(0x2b7)][_0x242224(0x2a9)](this),_0x2e1228!==this[_0x242224(0x2d6)]&&this[_0x242224(0x45b)]();},VisuMZ[_0x81ac0a(0x399)]['Game_Event_clearPageSettings']=Game_Event[_0x81ac0a(0x3a5)]['clearPageSettings'],Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x4ef)]=function(){const _0x3b2181=_0x81ac0a;VisuMZ[_0x3b2181(0x399)][_0x3b2181(0x3a8)][_0x3b2181(0x2a9)](this),this[_0x3b2181(0x353)]();},VisuMZ['EventsMoveCore']['Game_Event_setupPageSettings']=Game_Event[_0x81ac0a(0x3a5)]['setupPageSettings'],Game_Event['prototype'][_0x81ac0a(0x2c2)]=function(){const _0x4886bb=_0x81ac0a;this[_0x4886bb(0x431)]=!![],VisuMZ[_0x4886bb(0x399)]['Game_Event_setupPageSettings']['call'](this),this[_0x4886bb(0x45b)](),this['_activationProximityAutoTriggerBypass']=![];},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x45b)]=function(){const _0x3cb019=_0x81ac0a;if(!this[_0x3cb019(0x31b)]())return;this[_0x3cb019(0x353)](),this['setupEventsMoveCoreNotetags'](),this[_0x3cb019(0x2c7)](),this[_0x3cb019(0x327)]();},Game_Event[_0x81ac0a(0x3a5)]['setupEventsMoveCoreNotetags']=function(){const _0x1c4cdd=_0x81ac0a,_0x304cb1=this[_0x1c4cdd(0x31b)]()['note'];if(_0x304cb1==='')return;this['checkEventsMoveCoreStringTags'](_0x304cb1);},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x2c7)]=function(){const _0x4db73d=_0x81ac0a;if(!this[_0x4db73d(0x477)]())return;const _0x16ef57=this[_0x4db73d(0x4ed)]();let _0x115b2f='';for(const _0x52ca47 of _0x16ef57){if([0x6c,0x198][_0x4db73d(0x36a)](_0x52ca47[_0x4db73d(0x55a)])){if(_0x115b2f!=='')_0x115b2f+='\x0a';_0x115b2f+=_0x52ca47['parameters'][0x0];}}this[_0x4db73d(0x380)](_0x115b2f);},Game_Event['prototype'][_0x81ac0a(0x353)]=function(){const _0x34dcb4=_0x81ac0a,_0x552ff0=VisuMZ[_0x34dcb4(0x399)]['Settings'];this[_0x34dcb4(0x304)]={'type':'none','distance':0x0,'regionList':[]},this['_alwaysUpdateMove']=![],this[_0x34dcb4(0x328)]=![],this[_0x34dcb4(0x3fe)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x34dcb4(0x596)]=$gameSystem[_0x34dcb4(0x501)](this),this[_0x34dcb4(0x1e0)]={'text':'','visibleRange':_0x552ff0[_0x34dcb4(0x556)]['VisibleRange'],'offsetX':_0x552ff0[_0x34dcb4(0x556)][_0x34dcb4(0x24c)],'offsetY':_0x552ff0[_0x34dcb4(0x556)][_0x34dcb4(0x35e)]},this[_0x34dcb4(0x2ff)]=[],this['_moveSynch']={'target':-0x1,'type':_0x34dcb4(0x342),'delay':0x1},this[_0x34dcb4(0x289)]=_0x552ff0[_0x34dcb4(0x204)][_0x34dcb4(0x26f)]??0x0,this['_saveEventLocation']=![],this[_0x34dcb4(0x505)]={'visible':!![],'filename':_0x552ff0[_0x34dcb4(0x204)]['DefaultShadow']},this[_0x34dcb4(0x2dd)](),this['clearStepPattern']();},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x380)]=function(_0x303cbb){const _0x196098=_0x81ac0a;if(_0x303cbb[_0x196098(0x3b2)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x196098(0x304)][_0x196098(0x23f)]=JSON[_0x196098(0x435)]('['+RegExp['$1'][_0x196098(0x3b2)](/\d+/g)+']'),this[_0x196098(0x304)]['type']='region';else _0x303cbb[_0x196098(0x3b2)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x196098(0x562)]()[_0x196098(0x28f)](),this[_0x196098(0x304)][_0x196098(0x208)]=type,this[_0x196098(0x304)]['distance']=Number(RegExp['$2']));_0x303cbb[_0x196098(0x3b2)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x196098(0x361)]=!![]);_0x303cbb['match'](/<CLICK TRIGGER>/i)&&(this[_0x196098(0x328)]=!![]);const _0x198598=_0x303cbb[_0x196098(0x3b2)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x198598)for(const _0x390166 of _0x198598){if(_0x390166['match'](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x1798ec=String(RegExp['$1'])['toLowerCase']()[_0x196098(0x28f)](),_0x43c2b3=Number(RegExp['$2']);this['_addedHitbox'][_0x1798ec]=_0x43c2b3;}}_0x303cbb[_0x196098(0x3b2)](/<ICON:[ ](\d+)>/i)&&(this[_0x196098(0x596)][_0x196098(0x3bb)]=Number(RegExp['$1']));_0x303cbb[_0x196098(0x3b2)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x196098(0x596)][_0x196098(0x2e6)]=Number(RegExp['$1']));_0x303cbb['match'](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x196098(0x596)][_0x196098(0x233)]=Number(RegExp['$1']));_0x303cbb[_0x196098(0x3b2)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x196098(0x2e6)]=Number(RegExp['$1']),this[_0x196098(0x596)]['bufferY']=Number(RegExp['$2']));if(_0x303cbb[_0x196098(0x3b2)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x7cf689=String(RegExp['$1'])[_0x196098(0x493)]()[_0x196098(0x28f)](),_0x8573c=[_0x196098(0x4b8),_0x196098(0x2e2),'MULTIPLY','SCREEN'];this[_0x196098(0x596)][_0x196098(0x2e1)]=_0x8573c[_0x196098(0x4f6)](_0x7cf689)[_0x196098(0x322)](0x0,0x3);}_0x303cbb[_0x196098(0x3b2)](/<LABEL:[ ](.*?)>/i)&&(this[_0x196098(0x1e0)][_0x196098(0x2ba)]=String(RegExp['$1'])[_0x196098(0x28f)]());_0x303cbb[_0x196098(0x3b2)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this[_0x196098(0x1e0)]['text']=String(RegExp['$1'])['trim']());_0x303cbb['match'](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow']['offsetX']=Number(RegExp['$1']));_0x303cbb[_0x196098(0x3b2)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x196098(0x1e0)][_0x196098(0x3ab)]=Number(RegExp['$1']));_0x303cbb[_0x196098(0x3b2)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x196098(0x1e0)][_0x196098(0x3b7)]=Number(RegExp['$1']),this['_labelWindow']['offsetY']=Number(RegExp['$2']));$gameTemp[_0x196098(0x4ff)](this);for(;;){if(this['_labelWindow']['text'][_0x196098(0x3b2)](/\\V\[(\d+)\]/gi))this['_labelWindow']['text']=this[_0x196098(0x1e0)][_0x196098(0x2ba)]['replace'](/\\V\[(\d+)\]/gi,(_0x4f642b,_0x3a8daf)=>$gameVariables['value'](parseInt(_0x3a8daf)));else break;}$gameTemp[_0x196098(0x4e2)]();_0x303cbb['match'](/<LABEL RANGE:[ ](\d+)>/i)&&(this['_labelWindow'][_0x196098(0x584)]=Number(RegExp['$1']));if(_0x303cbb['match'](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x102d6f=JSON[_0x196098(0x435)]('['+RegExp['$1'][_0x196098(0x3b2)](/\d+/g)+']');this['_moveOnlyRegions']=this[_0x196098(0x2ff)]['concat'](_0x102d6f),this['_moveOnlyRegions']['remove'](0x0);}if(_0x303cbb[_0x196098(0x3b2)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x171f8a=String(RegExp['$1']);if(_0x171f8a['match'](/PLAYER/i))this['_moveSynch']['target']=0x0;else _0x171f8a[_0x196098(0x3b2)](/EVENT[ ](\d+)/i)&&(this[_0x196098(0x3c4)]['target']=Number(RegExp['$1']));}_0x303cbb[_0x196098(0x3b2)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x196098(0x3c4)][_0x196098(0x208)]=String(RegExp['$1'])[_0x196098(0x562)]()[_0x196098(0x28f)]());_0x303cbb[_0x196098(0x3b2)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x196098(0x3c4)]['delay']=Number(RegExp['$1']));if(_0x303cbb[_0x196098(0x3b2)](/<TRUE RANDOM MOVE>/i))this[_0x196098(0x289)]=0x0;else _0x303cbb[_0x196098(0x3b2)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x196098(0x289)]=Number(RegExp['$1'])||0x0);_0x303cbb['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocation']=!![]),_0x303cbb[_0x196098(0x3b2)](/<HIDE SHADOW>/i)&&(this['_shadowGraphic']['visible']=![]),_0x303cbb[_0x196098(0x3b2)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x196098(0x505)][_0x196098(0x28d)]=String(RegExp['$1'])),_0x303cbb[_0x196098(0x3b2)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x196098(0x4a1)]=Number(RegExp['$1'])),_0x303cbb[_0x196098(0x3b2)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x196098(0x292)]=Number(RegExp['$1'])),_0x303cbb['match'](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x196098(0x4a1)]=Number(RegExp['$1']),this['_spriteOffsetY']=Number(RegExp['$2'])),_0x303cbb[_0x196098(0x3b2)](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x196098(0x44b)]=String(RegExp['$1'])[_0x196098(0x493)]()[_0x196098(0x28f)]());},Game_Event['prototype'][_0x81ac0a(0x327)]=function(){const _0xff7574=_0x81ac0a;this[_0xff7574(0x24a)]();},Game_Event[_0x81ac0a(0x3a5)]['isNearTheScreen']=function(){const _0x99a6ea=_0x81ac0a;if(this[_0x99a6ea(0x361)])return!![];return Game_Character[_0x99a6ea(0x3a5)][_0x99a6ea(0x282)]['call'](this);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x326)]=Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x22a)],Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x22a)]=function(){const _0x738539=_0x81ac0a;if(this[_0x738539(0x27c)]())return;VisuMZ[_0x738539(0x399)][_0x738539(0x326)][_0x738539(0x2a9)](this),this[_0x738539(0x3b4)]()&&VisuMZ[_0x738539(0x3cd)](this[_0x738539(0x339)]);},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x27c)]=function(){const _0x224f54=_0x81ac0a,_0x22f4a8=VisuMZ['EventsMoveCore'][_0x224f54(0x446)][_0x224f54(0x204)];if($gameMap['isEventRunning']()&&_0x22f4a8[_0x224f54(0x28e)])return!![];if($gameMessage[_0x224f54(0x587)]()&&_0x22f4a8[_0x224f54(0x51b)])return!![];if(!$gameSystem['isAllowEventAutoMovement']())return!![];if(this['moveSynchTarget']()>=0x0)return!![];return![];},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x24a)]=function(){const _0x52c797=_0x81ac0a,_0x54a7df=SceneManager['_scene'][_0x52c797(0x2f5)];if(_0x54a7df){const _0x1726c8=_0x54a7df[_0x52c797(0x46d)](this);_0x1726c8&&_0x1726c8[_0x52c797(0x398)]&&_0x1726c8[_0x52c797(0x398)]['_filename']!==this[_0x52c797(0x51d)]()&&(_0x1726c8[_0x52c797(0x398)][_0x52c797(0x460)]=this[_0x52c797(0x51d)](),_0x1726c8[_0x52c797(0x398)][_0x52c797(0x541)]=ImageManager[_0x52c797(0x500)](_0x1726c8[_0x52c797(0x398)][_0x52c797(0x460)]));}},Game_Event[_0x81ac0a(0x3a5)]['shadowFilename']=function(){const _0x56a806=_0x81ac0a;return this[_0x56a806(0x505)][_0x56a806(0x28d)];},Game_Event[_0x81ac0a(0x3a5)]['isShadowVisible']=function(){const _0x353dda=_0x81ac0a;if(!this[_0x353dda(0x505)][_0x353dda(0x323)])return![];return Game_CharacterBase[_0x353dda(0x3a5)]['isShadowVisible']['call'](this);},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x4ea)]=function(){const _0x500725=_0x81ac0a;return this['_labelWindow'][_0x500725(0x2ba)];},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x1dc)]=function(){const _0x237186=_0x81ac0a;return this[_0x237186(0x1e0)][_0x237186(0x584)];},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x4e9)]=function(_0x493389,_0x5116ff,_0x1b32ec){const _0x1b4f38=_0x81ac0a;if(this[_0x1b4f38(0x450)]())return this[_0x1b4f38(0x2ea)](_0x493389,_0x5116ff,_0x1b32ec);if($gameMap[_0x1b4f38(0x1e5)](_0x493389,_0x5116ff,_0x1b32ec,_0x1b4f38(0x31b)))return!![];if($gameMap[_0x1b4f38(0x558)](_0x493389,_0x5116ff,_0x1b32ec,'event'))return![];return Game_Character[_0x1b4f38(0x3a5)]['isMapPassable'][_0x1b4f38(0x2a9)](this,_0x493389,_0x5116ff,_0x1b32ec);},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x450)]=function(){const _0x402b58=_0x81ac0a;if(this['_moveOnlyRegions']===undefined)this[_0x402b58(0x353)]();return this[_0x402b58(0x2ff)][_0x402b58(0x3c6)]>0x0;},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x2ea)]=function(_0x33d32c,_0x3bf06d,_0x1eebe5){const _0x2b7b70=_0x81ac0a,_0x58aa93=$gameMap[_0x2b7b70(0x1db)](_0x33d32c,_0x1eebe5),_0x2021eb=$gameMap[_0x2b7b70(0x570)](_0x3bf06d,_0x1eebe5),_0x243ecc=$gameMap[_0x2b7b70(0x1e2)](_0x58aa93,_0x2021eb);return this['_moveOnlyRegions'][_0x2b7b70(0x36a)](_0x243ecc);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x433)]=Game_Event[_0x81ac0a(0x3a5)]['findProperPageIndex'],Game_Event['prototype'][_0x81ac0a(0x397)]=function(){const _0xc71be6=_0x81ac0a;return this[_0xc71be6(0x2f1)]=![],this[_0xc71be6(0x2be)]=![],this['event']()?VisuMZ[_0xc71be6(0x399)][_0xc71be6(0x433)]['call'](this):-0x1;},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x246)]=Game_Event[_0x81ac0a(0x3a5)]['meetsConditions'],Game_Event['prototype'][_0x81ac0a(0x3e1)]=function(_0x4a4ca8){const _0x4b29bf=_0x81ac0a;this[_0x4b29bf(0x532)](_0x4a4ca8),$gameTemp[_0x4b29bf(0x4ff)](this);const _0x1b8c25=VisuMZ[_0x4b29bf(0x399)][_0x4b29bf(0x246)]['call'](this,_0x4a4ca8);return $gameTemp['clearSelfTarget'](),_0x1b8c25;},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x350)]=function(){return this['_advancedSwitchVariable'];},Game_Event[_0x81ac0a(0x3a5)]['checkAdvancedSwitchVariablePresent']=function(_0x2cbca9){const _0x5ad729=_0x81ac0a,_0x59979c=_0x2cbca9['conditions'];if(_0x59979c[_0x5ad729(0x44d)]&&DataManager[_0x5ad729(0x56d)](_0x59979c['switch1Id']))this['_advancedSwitchVariable']=!![];else{if(_0x59979c['switch2Valid']&&DataManager[_0x5ad729(0x56d)](_0x59979c['switch2Id']))this[_0x5ad729(0x2f1)]=!![];else _0x59979c[_0x5ad729(0x1e4)]&&DataManager[_0x5ad729(0x376)](_0x59979c[_0x5ad729(0x47f)])&&(this[_0x5ad729(0x2f1)]=!![]);}},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x55e)]=function(){if(this['_erased'])return![];return this['_clickTrigger'];},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x59c)]=function(){const _0x4b8ef8=_0x81ac0a;$gameTemp[_0x4b8ef8(0x22e)](),this[_0x4b8ef8(0x3e0)]();},Game_Event[_0x81ac0a(0x3a5)]['pos']=function(_0xcba32c,_0x18474c){const _0x3bc71e=_0x81ac0a;return this[_0x3bc71e(0x3fe)]?this[_0x3bc71e(0x20c)](_0xcba32c,_0x18474c):Game_Character[_0x3bc71e(0x3a5)]['pos']['call'](this,_0xcba32c,_0x18474c);},Game_Event['prototype'][_0x81ac0a(0x20c)]=function(_0x2dd6de,_0x3e3c5f){const _0x1f291c=_0x81ac0a;var _0x53b920=this['x']-this[_0x1f291c(0x3fe)][_0x1f291c(0x53c)],_0x565115=this['x']+this['_addedHitbox'][_0x1f291c(0x31a)],_0x47b147=this['y']-this[_0x1f291c(0x3fe)]['up'],_0x1a2dcc=this['y']+this[_0x1f291c(0x3fe)][_0x1f291c(0x3b6)];return _0x53b920<=_0x2dd6de&&_0x2dd6de<=_0x565115&&_0x47b147<=_0x3e3c5f&&_0x3e3c5f<=_0x1a2dcc;},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x32b)]=function(_0x5b1fd7,_0x463576,_0xe4fd0b){const _0x1754bd=_0x81ac0a;for(let _0x4ee419=-this[_0x1754bd(0x3fe)][_0x1754bd(0x53c)];_0x4ee419<=this[_0x1754bd(0x3fe)][_0x1754bd(0x31a)];_0x4ee419++){for(let _0x37c3a8=-this[_0x1754bd(0x3fe)]['up'];_0x37c3a8<=this['_addedHitbox'][_0x1754bd(0x3b6)];_0x37c3a8++){if(!Game_Character['prototype'][_0x1754bd(0x32b)][_0x1754bd(0x2a9)](this,_0x5b1fd7+_0x4ee419,_0x463576+_0x37c3a8,_0xe4fd0b))return![];}}return!![];},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x586)]=function(_0x5d6553,_0x557fcc){const _0x1fbc3b=_0x81ac0a;if(Imported[_0x1fbc3b(0x4c9)]&&this[_0x1fbc3b(0x511)]())return this[_0x1fbc3b(0x38a)](_0x5d6553,_0x557fcc);else{const _0x33e9e6=$gameMap[_0x1fbc3b(0x51e)](_0x5d6553,_0x557fcc)[_0x1fbc3b(0x58f)](_0x4af6e4=>_0x4af6e4!==this);return _0x33e9e6['length']>0x0;}},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x38a)]=function(_0x27f591,_0x5155a2){const _0x5bfe4e=_0x81ac0a;if(!this[_0x5bfe4e(0x3f0)]())return![];else{const _0x2128f0=$gameMap[_0x5bfe4e(0x51e)](_0x27f591,_0x5155a2)[_0x5bfe4e(0x58f)](_0x38983b=>_0x38983b!==this&&_0x38983b[_0x5bfe4e(0x3f0)]());return _0x2128f0[_0x5bfe4e(0x3c6)]>0x0;}},Game_Event[_0x81ac0a(0x3a5)]['activationProximityType']=function(){const _0xafadce=_0x81ac0a;return this[_0xafadce(0x304)][_0xafadce(0x208)]||'none';},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x379)]=function(){const _0x1a9aa2=_0x81ac0a;return this[_0x1a9aa2(0x304)][_0x1a9aa2(0x4da)]||0x0;},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x55d)]=function(){const _0x5c356e=_0x81ac0a;return this[_0x5c356e(0x304)][_0x5c356e(0x23f)]||[];},Game_Event['prototype'][_0x81ac0a(0x234)]=function(){const _0x4074fc=_0x81ac0a;Game_Character[_0x4074fc(0x3a5)][_0x4074fc(0x234)][_0x4074fc(0x2a9)](this);if([_0x4074fc(0x2fe),_0x4074fc(0x212)]['includes'](this['activationProximityType']()))return;$gamePlayer[_0x4074fc(0x4cb)]([0x2]);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x2dc)]=Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x1d9)],Game_Event['prototype'][_0x81ac0a(0x1d9)]=function(){const _0x236eb8=_0x81ac0a;if(this[_0x236eb8(0x4a7)]!==0x3)return;if(this[_0x236eb8(0x431)])return;if(!this[_0x236eb8(0x280)](![]))return;if(!this[_0x236eb8(0x26c)](![]))return;VisuMZ['EventsMoveCore'][_0x236eb8(0x2dc)][_0x236eb8(0x2a9)](this);},VisuMZ['EventsMoveCore']['Game_Event_updateParallel']=Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x2e0)],Game_Event[_0x81ac0a(0x3a5)]['updateParallel']=function(){const _0x25c20d=_0x81ac0a;if(!this[_0x25c20d(0x4d8)])return;if(!this[_0x25c20d(0x280)](!![]))return;if(!this[_0x25c20d(0x26c)](!![]))return;VisuMZ[_0x25c20d(0x399)]['Game_Event_updateParallel'][_0x25c20d(0x2a9)](this);},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x280)]=function(_0x2b2cc5){const _0x1a4e50=_0x81ac0a;if(!_0x2b2cc5&&$gameMap[_0x1a4e50(0x538)]())return![];if(!_0x2b2cc5&&$gameMap[_0x1a4e50(0x31f)]())return![];if(this[_0x1a4e50(0x55d)]()<=0x0)return!![];return $gamePlayer[_0x1a4e50(0x324)](this);},Game_Event['prototype']['checkActivationProximity']=function(_0x673397){const _0xb318d0=_0x81ac0a;if(!_0x673397&&$gameMap[_0xb318d0(0x538)]())return![];if(!_0x673397&&$gameMap[_0xb318d0(0x31f)]())return![];if([_0xb318d0(0x2fe),'region'][_0xb318d0(0x36a)](this[_0xb318d0(0x3e4)]()))return!![];return $gamePlayer[_0xb318d0(0x4a2)](this);},VisuMZ['MoveAllSynchTargets']=function(_0x349ded){const _0x23cabe=_0x81ac0a;for(const _0x469fca of $gameMap[_0x23cabe(0x44a)]()){if(!_0x469fca)continue;_0x469fca['moveSynchTarget']()===_0x349ded&&_0x469fca[_0x23cabe(0x32c)]();}},VisuMZ[_0x81ac0a(0x4e8)]=function(_0x4ccfcc){const _0x2f05b7=_0x81ac0a;if(_0x4ccfcc===0x0)return $gamePlayer;return $gameMap[_0x2f05b7(0x31b)](_0x4ccfcc);},Game_Event[_0x81ac0a(0x3a5)]['moveSynchTarget']=function(){return this['_moveSynch']['target'];},Game_Event['prototype'][_0x81ac0a(0x239)]=function(){const _0x55cee0=_0x81ac0a;return this[_0x55cee0(0x3c4)]['type'];},Game_Event[_0x81ac0a(0x3a5)]['realMoveSpeed']=function(){const _0x3b9d0d=_0x81ac0a;if(this[_0x3b9d0d(0x4d6)]()>=0x0){const _0x1849d1=VisuMZ[_0x3b9d0d(0x4e8)](this[_0x3b9d0d(0x4d6)]());if(_0x1849d1)return _0x1849d1[_0x3b9d0d(0x4c1)]();}return Game_Character['prototype'][_0x3b9d0d(0x4c1)]['call'](this);},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x32c)]=function(){const _0x590ccf=_0x81ac0a;this['_moveSynch'][_0x590ccf(0x257)]=this[_0x590ccf(0x3c4)]['timer']||0x0,this[_0x590ccf(0x3c4)][_0x590ccf(0x257)]--;if(this[_0x590ccf(0x3c4)][_0x590ccf(0x257)]>0x0)return;this[_0x590ccf(0x3c4)][_0x590ccf(0x257)]=this[_0x590ccf(0x3c4)][_0x590ccf(0x3db)],this['processMoveSynch']();},Game_Event['prototype']['processMoveSynch']=function(){const _0x4bf658=_0x81ac0a;switch(this['moveSynchType']()){case _0x4bf658(0x342):this[_0x4bf658(0x51f)]();break;case _0x4bf658(0x2a1):this[_0x4bf658(0x426)]();break;case _0x4bf658(0x53b):this[_0x4bf658(0x524)]();break;case _0x4bf658(0x371):this['processMoveSynchCustom']();break;case'mimic':case'copy':this[_0x4bf658(0x1f1)]();break;case'reverse\x20mimic':case _0x4bf658(0x475):this[_0x4bf658(0x4ce)]();break;case _0x4bf658(0x509):case _0x4bf658(0x3b9):case _0x4bf658(0x47e):case _0x4bf658(0x489):this[_0x4bf658(0x467)]();break;case _0x4bf658(0x53e):case _0x4bf658(0x590):case _0x4bf658(0x33e):case _0x4bf658(0x436):this[_0x4bf658(0x550)]();break;default:this[_0x4bf658(0x51f)]();break;}this[_0x4bf658(0x4c3)]();},Game_Event[_0x81ac0a(0x3a5)]['processMoveSynchRandom']=function(){const _0x46718e=_0x81ac0a,_0x2a114e=[0x2,0x4,0x6,0x8];$gameMap['isSupportDiagonalMovement']()&&_0x2a114e[_0x46718e(0x287)](0x1,0x3,0x7,0x9);const _0x1307cb=[];for(const _0x3f079f of _0x2a114e){if(this['canPass'](this['x'],this['y'],_0x3f079f))_0x1307cb[_0x46718e(0x287)](_0x3f079f);}if(_0x1307cb['length']>0x0){const _0x3bc9f7=_0x1307cb[Math[_0x46718e(0x416)](_0x1307cb[_0x46718e(0x3c6)])];this[_0x46718e(0x595)](_0x3bc9f7);}},Game_Event['prototype'][_0x81ac0a(0x426)]=function(){const _0x5beded=_0x81ac0a,_0x2c82ff=VisuMZ['GetMoveSynchTarget'](this[_0x5beded(0x4d6)]());this[_0x5beded(0x576)](_0x2c82ff);},Game_Event['prototype'][_0x81ac0a(0x524)]=function(){const _0x37abd1=_0x81ac0a,_0x2b5636=VisuMZ[_0x37abd1(0x4e8)](this[_0x37abd1(0x4d6)]());this[_0x37abd1(0x54a)](_0x2b5636);},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x57c)]=function(){const _0x67344a=_0x81ac0a;this[_0x67344a(0x21f)]();},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x1f1)]=function(){const _0x3b6172=_0x81ac0a,_0x2f1e10=VisuMZ[_0x3b6172(0x4e8)](this[_0x3b6172(0x4d6)]());this['executeMoveDir8'](_0x2f1e10['lastMovedDirection']());},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x4ce)]=function(){const _0x2d9db7=_0x81ac0a,_0x52c197=VisuMZ[_0x2d9db7(0x4e8)](this[_0x2d9db7(0x4d6)]()),_0x298724=this[_0x2d9db7(0x363)](_0x52c197[_0x2d9db7(0x4f8)]());this[_0x2d9db7(0x595)](this[_0x2d9db7(0x363)](_0x52c197[_0x2d9db7(0x50d)]()));},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x467)]=function(){const _0x51df1d=_0x81ac0a,_0x19a155=VisuMZ[_0x51df1d(0x4e8)](this[_0x51df1d(0x4d6)]()),_0xe760ef=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x19a155[_0x51df1d(0x4f8)]()];this[_0x51df1d(0x595)](_0xe760ef);},Game_Event['prototype'][_0x81ac0a(0x550)]=function(){const _0x56a02d=_0x81ac0a,_0x4bd535=VisuMZ[_0x56a02d(0x4e8)](this[_0x56a02d(0x4d6)]()),_0x3fd1b0=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x4bd535['lastMovedDirection']()];this[_0x56a02d(0x595)](_0x3fd1b0);},Game_Event['prototype'][_0x81ac0a(0x4af)]=function(){const _0x1cbe6e=_0x81ac0a,_0x120969=$gameSystem['getSavedEventLocation'](this);if(!_0x120969)return;this[_0x1cbe6e(0x288)](_0x120969['x'],_0x120969['y']),this[_0x1cbe6e(0x372)](_0x120969[_0x1cbe6e(0x50d)]),this[_0x1cbe6e(0x2d6)]===_0x120969[_0x1cbe6e(0x3e7)]&&(this['_moveRouteIndex']=_0x120969[_0x1cbe6e(0x33a)]);},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x2a3)]=function(){const _0x5eab8b=_0x81ac0a;Game_Character[_0x5eab8b(0x3a5)][_0x5eab8b(0x2a3)]['call'](this),this['autosaveEventLocation']();},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x386)]=function(){const _0x4f70d0=_0x81ac0a;if($gameMap[_0x4f70d0(0x579)]())return!![];return this[_0x4f70d0(0x56c)];},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x588)]=function(){const _0x6a3935=_0x81ac0a;if(!this[_0x6a3935(0x386)]())return;this[_0x6a3935(0x44f)]();},Game_Event['prototype'][_0x81ac0a(0x44f)]=function(){const _0x31fb1e=_0x81ac0a;$gameSystem[_0x31fb1e(0x44f)](this);},Game_Event[_0x81ac0a(0x3a5)]['deleteEventLocation']=function(){const _0x3d530e=_0x81ac0a;$gameSystem[_0x3d530e(0x456)](this);},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x501)]=function(){const _0x353ea6=_0x81ac0a;return $gameSystem[_0x353ea6(0x501)](this)?Game_Character['prototype'][_0x353ea6(0x501)][_0x353ea6(0x2a9)](this):{'iconIndex':0x0,'bufferX':settings[_0x353ea6(0x30a)][_0x353ea6(0x59e)],'bufferY':settings[_0x353ea6(0x30a)][_0x353ea6(0x267)],'blendMode':settings['Icon']['BlendMode']};},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x42e)]=function(){const _0x3249e8=_0x81ac0a;return this[_0x3249e8(0x2be)];},VisuMZ['EventsMoveCore'][_0x81ac0a(0x58e)]=Game_Event[_0x81ac0a(0x3a5)]['meetsConditions'],Game_Event['prototype']['meetsConditions']=function(_0x5f26c4){const _0x489f3e=_0x81ac0a,_0xdbf739=VisuMZ[_0x489f3e(0x399)]['Game_Event_meetsConditionsCPC'][_0x489f3e(0x2a9)](this,_0x5f26c4);if(!_0xdbf739)return![];return this[_0x489f3e(0x1dd)](_0x5f26c4);},Game_Event['prototype'][_0x81ac0a(0x1dd)]=function(_0x439352){const _0x3386b5=_0x81ac0a;VisuMZ[_0x3386b5(0x399)][_0x3386b5(0x209)][_0x3386b5(0x4a6)](_0x439352),this[_0x3386b5(0x2be)]=_0x439352[_0x3386b5(0x2ad)]['length']>0x0;_0x439352['CPC']===undefined&&VisuMZ[_0x3386b5(0x399)][_0x3386b5(0x209)]['loadCPC'](_0x439352);if(_0x439352[_0x3386b5(0x2ad)]['length']>0x0)return $gameMap[_0x3386b5(0x31b)](this['_eventId'])&&VisuMZ[_0x3386b5(0x399)][_0x3386b5(0x209)][_0x3386b5(0x306)](_0x439352[_0x3386b5(0x2ad)],this[_0x3386b5(0x339)]);return!![];},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x4b9)]=Game_Troop['prototype']['meetsConditions'],Game_Troop[_0x81ac0a(0x3a5)]['meetsConditions']=function(_0x122648){const _0x710975=_0x81ac0a;var _0x2f386f=VisuMZ[_0x710975(0x399)]['Game_Troop_meetsConditionsCPC'][_0x710975(0x2a9)](this,_0x122648);return _0x2f386f&&this[_0x710975(0x4b2)](_0x122648);},Game_Troop[_0x81ac0a(0x3a5)][_0x81ac0a(0x4b2)]=function(_0x28e324){const _0x17e27e=_0x81ac0a;_0x28e324['CPC']===undefined&&VisuMZ[_0x17e27e(0x399)][_0x17e27e(0x209)][_0x17e27e(0x4a6)](_0x28e324);if(_0x28e324[_0x17e27e(0x2ad)][_0x17e27e(0x3c6)]>0x0)return VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x17e27e(0x306)](_0x28e324[_0x17e27e(0x2ad)],0x0);return!![];},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x3ea)]=Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x288)],Game_Event[_0x81ac0a(0x3a5)]['locate']=function(_0x1c8389,_0x425316){const _0x11fafa=_0x81ac0a;VisuMZ[_0x11fafa(0x399)]['Game_Event_locate'][_0x11fafa(0x2a9)](this,_0x1c8389,_0x425316),this[_0x11fafa(0x23b)]=_0x1c8389,this['_randomHomeY']=_0x425316;},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x2a8)]=Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x40e)],Game_Event['prototype'][_0x81ac0a(0x40e)]=function(){const _0x4b61b9=_0x81ac0a,_0x2eb5c4=$gameMap[_0x4b61b9(0x4da)](this['x'],this['y'],this[_0x4b61b9(0x23b)],this['_randomHomeY']),_0x15fac9=_0x2eb5c4*(this[_0x4b61b9(0x289)]||0x0);Math[_0x4b61b9(0x342)]()>=_0x15fac9?VisuMZ[_0x4b61b9(0x399)][_0x4b61b9(0x2a8)]['call'](this):this['moveBackToRandomHome']();},Game_Event[_0x81ac0a(0x3a5)][_0x81ac0a(0x22c)]=function(){const _0x5a7339=_0x81ac0a,_0x29a8da=this['deltaXFrom'](this[_0x5a7339(0x23b)]),_0x402190=this[_0x5a7339(0x241)](this['_randomHomeY']);if(Math[_0x5a7339(0x2d5)](_0x29a8da)>Math[_0x5a7339(0x2d5)](_0x402190))this[_0x5a7339(0x2e7)](_0x29a8da>0x0?0x4:0x6),!this[_0x5a7339(0x218)]()&&_0x402190!==0x0&&this[_0x5a7339(0x2e7)](_0x402190>0x0?0x8:0x2);else _0x402190!==0x0&&(this[_0x5a7339(0x2e7)](_0x402190>0x0?0x8:0x2),!this[_0x5a7339(0x218)]()&&_0x29a8da!==0x0&&this['moveStraight'](_0x29a8da>0x0?0x4:0x6));},VisuMZ[_0x81ac0a(0x399)]['Game_Interpreter_updateWaitMode']=Game_Interpreter[_0x81ac0a(0x3a5)][_0x81ac0a(0x2d2)],Game_Interpreter['prototype'][_0x81ac0a(0x2d2)]=function(){const _0x16499d=_0x81ac0a;if(this['_waitMode']==='CallEvent'){if(window[this[_0x16499d(0x36c)]])this['_waitMode']='',this['startCallEvent']();else return!![];}else return VisuMZ['EventsMoveCore']['Game_Interpreter_updateWaitMode']['call'](this);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x3cc)]=Game_Interpreter[_0x81ac0a(0x3a5)]['executeCommand'],Game_Interpreter[_0x81ac0a(0x3a5)][_0x81ac0a(0x382)]=function(){const _0x58732f=_0x81ac0a,_0x3c6020=$gameMap&&this[_0x58732f(0x339)]?$gameMap[_0x58732f(0x31b)](this[_0x58732f(0x339)]):null;$gameTemp[_0x58732f(0x4ff)](_0x3c6020);const _0x565077=VisuMZ['EventsMoveCore'][_0x58732f(0x3cc)][_0x58732f(0x2a9)](this);return $gameTemp['clearSelfTarget'](),_0x565077;},VisuMZ[_0x81ac0a(0x399)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x81ac0a(0x3a5)][_0x81ac0a(0x2f7)],Game_Interpreter['prototype'][_0x81ac0a(0x2f7)]=function(_0x48fed2){const _0xeaeea7=_0x81ac0a;return $gameTemp[_0xeaeea7(0x413)](this),VisuMZ['EventsMoveCore']['Game_Interpreter_PluginCommand'][_0xeaeea7(0x2a9)](this,_0x48fed2);},Game_Interpreter[_0x81ac0a(0x3a5)][_0x81ac0a(0x48f)]=function(_0x370a64){const _0x23fd2d=_0x81ac0a;this[_0x23fd2d(0x2fa)]=_0x370a64;const _0x3f8268=_0x23fd2d(0x38f)['format'](_0x370a64[_0x23fd2d(0x4ae)][_0x23fd2d(0x533)](0x3));this['_callEventMap']='$callEventMap'+Graphics[_0x23fd2d(0x46e)]+'_'+this['eventId'](),DataManager['loadDataFile'](this['_callEventMap'],_0x3f8268),window[this[_0x23fd2d(0x36c)]]?this[_0x23fd2d(0x373)]():this[_0x23fd2d(0x295)](_0x23fd2d(0x25b));},Game_Interpreter[_0x81ac0a(0x3a5)]['startCallEvent']=function(){const _0xe548a8=_0x81ac0a,_0x5fb9e7=this['_callEventData'],_0x2f5cbd=window[this[_0xe548a8(0x36c)]],_0x4fcf51=_0x2f5cbd[_0xe548a8(0x44a)][_0x5fb9e7['eventId']];if(_0x4fcf51&&_0x4fcf51[_0xe548a8(0x34b)][_0x5fb9e7[_0xe548a8(0x20e)]-0x1]){const _0x53c32f=_0x4fcf51['pages'][_0x5fb9e7['pageId']-0x1]['list'];this['setupChild'](_0x53c32f,this['eventId']());}window[this[_0xe548a8(0x36c)]]=undefined,this[_0xe548a8(0x36c)]=undefined,this[_0xe548a8(0x2fa)]=undefined;};function Game_CPCInterpreter(){const _0x355105=_0x81ac0a;this['initialize'][_0x355105(0x48c)](this,arguments);};Game_CPCInterpreter['prototype']=Object[_0x81ac0a(0x244)](Game_Interpreter['prototype']),Game_CPCInterpreter[_0x81ac0a(0x3a5)][_0x81ac0a(0x2cb)]=Game_CPCInterpreter,Game_CPCInterpreter['prototype'][_0x81ac0a(0x1e9)]=function(){const _0x784d04=_0x81ac0a;Game_Interpreter[_0x784d04(0x3a5)][_0x784d04(0x1e9)][_0x784d04(0x2a9)](this),this['_cpc']=![];},Game_CPCInterpreter['prototype']['execute']=function(){const _0xfb2e6b=_0x81ac0a;while(this['isRunning']()){this[_0xfb2e6b(0x382)]();}},Game_CPCInterpreter[_0x81ac0a(0x3a5)]['command108']=function(_0x308d03){const _0xfeda68=_0x81ac0a;return Game_Interpreter[_0xfeda68(0x3a5)][_0xfeda68(0x315)][_0xfeda68(0x2a9)](this,_0x308d03),this[_0xfeda68(0x518)]['some'](_0x16be52=>_0x16be52[_0xfeda68(0x3b2)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this['_cpc']=!![]),!![];},VisuMZ[_0x81ac0a(0x399)]['Scene_Map_startEncounterEffect']=Scene_Map[_0x81ac0a(0x3a5)]['startEncounterEffect'],Scene_Map['prototype'][_0x81ac0a(0x4d0)]=function(){const _0x3ce6b9=_0x81ac0a;VisuMZ['EventsMoveCore'][_0x3ce6b9(0x26e)][_0x3ce6b9(0x2a9)](this),this[_0x3ce6b9(0x2f5)]['hideShadows']();},VisuMZ['EventsMoveCore'][_0x81ac0a(0x513)]=Scene_Load['prototype'][_0x81ac0a(0x36b)],Scene_Load[_0x81ac0a(0x3a5)]['onLoadSuccess']=function(){const _0x430fdc=_0x81ac0a;if($gameMap)$gameMap['clearEventCache']();VisuMZ[_0x430fdc(0x399)][_0x430fdc(0x513)][_0x430fdc(0x2a9)](this);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x378)]=Sprite_Character[_0x81ac0a(0x3a5)]['initMembers'],Sprite_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x374)]=function(){const _0x3fc624=_0x81ac0a;VisuMZ[_0x3fc624(0x399)][_0x3fc624(0x378)][_0x3fc624(0x2a9)](this),this[_0x3fc624(0x24e)](),this[_0x3fc624(0x35a)]();},Sprite_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x24e)]=function(){const _0xf45c3b=_0x81ac0a;this[_0xf45c3b(0x25e)]=0xff;},Sprite_Character[_0x81ac0a(0x3a5)]['createIconSprite']=function(){const _0x11b294=_0x81ac0a;this['_eventIconSprite']=new Sprite(),this[_0x11b294(0x45a)][_0x11b294(0x541)]=ImageManager[_0x11b294(0x500)](_0x11b294(0x46c)),this[_0x11b294(0x45a)][_0x11b294(0x541)][_0x11b294(0x236)]=![],this[_0x11b294(0x45a)][_0x11b294(0x290)](0x0,0x0,0x0,0x0),this[_0x11b294(0x45a)][_0x11b294(0x38d)]['x']=0.5,this[_0x11b294(0x45a)][_0x11b294(0x38d)]['y']=0x1,this['addChild'](this[_0x11b294(0x45a)]);},Sprite_Character['prototype'][_0x81ac0a(0x3e5)]=function(){const _0x4bf6b=_0x81ac0a;return this['_characterName']&&this[_0x4bf6b(0x1e8)][_0x4bf6b(0x3b2)](/\[VS8\]/i);},Sprite_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x36d)]=function(){const _0x45b198=_0x81ac0a;return this[_0x45b198(0x3e5)]()&&VisuMZ[_0x45b198(0x399)]['Settings'][_0x45b198(0x50c)][_0x45b198(0x21d)];},VisuMZ['EventsMoveCore'][_0x81ac0a(0x531)]=Sprite_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x4c3)],Sprite_Character['prototype'][_0x81ac0a(0x4c3)]=function(){const _0x4044dd=_0x81ac0a;VisuMZ[_0x4044dd(0x399)][_0x4044dd(0x531)][_0x4044dd(0x2a9)](this),VisuMZ['EventsMoveCore'][_0x4044dd(0x446)][_0x4044dd(0x204)][_0x4044dd(0x458)]&&this[_0x4044dd(0x415)](),this[_0x4044dd(0x398)]&&this['updateShadow'](),this[_0x4044dd(0x45a)]&&this['updateEventIconSprite']();},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x4f7)]=Sprite_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x516)],Sprite_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x516)]=function(){const _0x5a80dc=_0x81ac0a;VisuMZ[_0x5a80dc(0x399)][_0x5a80dc(0x4f7)]['call'](this),this[_0x5a80dc(0x541)][_0x5a80dc(0x496)](this['updateBitmapSmoothing'][_0x5a80dc(0x29c)](this));},VisuMZ['EventsMoveCore']['Sprite_Character_setCharacterBitmap']=Sprite_Character['prototype'][_0x81ac0a(0x2de)],Sprite_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x2de)]=function(){const _0x56ab0a=_0x81ac0a;VisuMZ[_0x56ab0a(0x399)][_0x56ab0a(0x392)][_0x56ab0a(0x2a9)](this),this['bitmap'][_0x56ab0a(0x496)](this['updateBitmapSmoothing'][_0x56ab0a(0x29c)](this));},Sprite_Character[_0x81ac0a(0x3a5)]['updateBitmapSmoothing']=function(){const _0x15b1ec=_0x81ac0a;if(!this[_0x15b1ec(0x541)])return;this[_0x15b1ec(0x541)][_0x15b1ec(0x236)]=!!VisuMZ[_0x15b1ec(0x399)][_0x15b1ec(0x446)][_0x15b1ec(0x204)][_0x15b1ec(0x2c5)];},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x412)]=Sprite_Character['prototype'][_0x81ac0a(0x441)],Sprite_Character[_0x81ac0a(0x3a5)]['characterPatternY']=function(){const _0xd35ef=_0x81ac0a;return this[_0xd35ef(0x3e5)]()?this['characterPatternYVS8']():VisuMZ[_0xd35ef(0x399)]['Sprite_Character_characterPatternY'][_0xd35ef(0x2a9)](this);},Sprite_Character['prototype'][_0x81ac0a(0x2df)]=function(){const _0x29c525=_0x81ac0a,_0x2c92fb=this['_character'][_0x29c525(0x50d)](),_0x58f7b2=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return(_0x58f7b2[_0x2c92fb]-0x2)/0x2;},Sprite_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x415)]=function(){const _0x5dd630=_0x81ac0a;this['rotation']=0x0;if(this['isAllowCharacterTilt']()){const _0x28373e=VisuMZ[_0x5dd630(0x399)][_0x5dd630(0x446)][_0x5dd630(0x204)],_0xa49221=this[_0x5dd630(0x561)][_0x5dd630(0x50d)]();let _0x5c9190=0x0;if([0x1,0x4,0x7][_0x5dd630(0x36a)](_0xa49221))_0x5c9190=_0x28373e[_0x5dd630(0x221)];if([0x3,0x6,0x9][_0x5dd630(0x36a)](_0xa49221))_0x5c9190=_0x28373e[_0x5dd630(0x3d4)];[0x2,0x8][_0x5dd630(0x36a)](_0xa49221)&&(_0x5c9190=[-_0x28373e[_0x5dd630(0x39c)],0x0,_0x28373e[_0x5dd630(0x39c)]][this[_0x5dd630(0x561)][_0x5dd630(0x337)]()]);if(this['_reflection'])_0x5c9190*=-0x1;this[_0x5dd630(0x349)]=_0x5c9190;}},Sprite_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x547)]=function(){const _0x1dd9c8=_0x81ac0a;if(this[_0x1dd9c8(0x2ab)])return![];return this[_0x1dd9c8(0x561)][_0x1dd9c8(0x3e6)]()&&!this['_character'][_0x1dd9c8(0x47d)]()&&!this[_0x1dd9c8(0x561)][_0x1dd9c8(0x231)]()&&this['getEventIconIndex']()===0x0;},Sprite_Character[_0x81ac0a(0x3a5)]['updateShadow']=function(){const _0x132abd=_0x81ac0a;this[_0x132abd(0x398)]['x']=this['_character'][_0x132abd(0x428)](),this['_shadowSprite']['y']=this[_0x132abd(0x561)][_0x132abd(0x48d)](),this[_0x132abd(0x398)]['opacity']=this[_0x132abd(0x2a7)],this[_0x132abd(0x398)][_0x132abd(0x323)]=this[_0x132abd(0x561)][_0x132abd(0x53f)](),this[_0x132abd(0x398)][_0x132abd(0x4f5)]=this['_hidden'],!this[_0x132abd(0x561)][_0x132abd(0x269)]()?(this[_0x132abd(0x398)][_0x132abd(0x480)]['x']=Math[_0x132abd(0x47c)](0x1,this[_0x132abd(0x398)][_0x132abd(0x480)]['x']+0.1),this[_0x132abd(0x398)][_0x132abd(0x480)]['y']=Math['min'](0x1,this['_shadowSprite']['scale']['y']+0.1)):(this[_0x132abd(0x398)][_0x132abd(0x480)]['x']=Math[_0x132abd(0x25c)](0x0,this[_0x132abd(0x398)][_0x132abd(0x480)]['x']-0.1),this[_0x132abd(0x398)][_0x132abd(0x480)]['y']=Math[_0x132abd(0x25c)](0x0,this[_0x132abd(0x398)]['scale']['y']-0.1));},Sprite_Character['prototype'][_0x81ac0a(0x566)]=function(){const _0x4593b0=_0x81ac0a,_0x7f588a=this['_eventIconSprite'],_0x2ef3d5=this[_0x4593b0(0x58c)]();if(_0x2ef3d5<=0x0)return _0x7f588a[_0x4593b0(0x290)](0x0,0x0,0x0,0x0);else{const _0x547ac4=ImageManager[_0x4593b0(0x5a1)],_0x550c7d=ImageManager[_0x4593b0(0x310)],_0x5e67d6=_0x2ef3d5%0x10*_0x547ac4,_0x37f948=Math[_0x4593b0(0x2ca)](_0x2ef3d5/0x10)*_0x550c7d;_0x7f588a[_0x4593b0(0x290)](_0x5e67d6,_0x37f948,_0x547ac4,_0x550c7d),this[_0x4593b0(0x323)]=!![];}const _0x2451f3=this[_0x4593b0(0x561)][_0x4593b0(0x501)]();this[_0x4593b0(0x36d)]()?this[_0x4593b0(0x357)](_0x7f588a):(_0x7f588a['x']=_0x2451f3?_0x2451f3[_0x4593b0(0x2e6)]:0x0,_0x7f588a['y']=_0x2451f3?-this['height']+_0x2451f3[_0x4593b0(0x233)]:0x0),_0x7f588a[_0x4593b0(0x2e1)]=_0x2451f3?_0x2451f3[_0x4593b0(0x2e1)]:0x0,this[_0x4593b0(0x55f)](_0x7f588a),this[_0x4593b0(0x340)](_0x7f588a),_0x7f588a[_0x4593b0(0x349)]=-this['rotation'];},Sprite_Character['prototype'][_0x81ac0a(0x357)]=function(_0x540a3b){const _0x4cab79=_0x81ac0a;_0x540a3b['x']=0x0,_0x540a3b['y']=-this['height']+this[_0x4cab79(0x30e)]*0x2/0x5,this['_character'][_0x4cab79(0x337)]()!==0x1&&(_0x540a3b['y']+=0x1);},Sprite_Character[_0x81ac0a(0x3a5)][_0x81ac0a(0x58c)]=function(){const _0x2aaace=_0x81ac0a;if(!this['_character'])return 0x0;if(this[_0x2aaace(0x561)][_0x2aaace(0x1fe)])return 0x0;const _0x1570fa=this['_character']['getEventIconData']();return _0x1570fa?_0x1570fa[_0x2aaace(0x3bb)]||0x0:0x0;},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x284)]=Sprite_Balloon[_0x81ac0a(0x3a5)][_0x81ac0a(0x430)],Sprite_Balloon[_0x81ac0a(0x3a5)][_0x81ac0a(0x430)]=function(_0x598f56,_0x3ae3e8){const _0x272734=_0x81ac0a;VisuMZ[_0x272734(0x399)][_0x272734(0x284)][_0x272734(0x2a9)](this,_0x598f56,_0x3ae3e8),VisuMZ[_0x272734(0x399)]['Settings']['VS8'][_0x272734(0x474)]&&this['_target'][_0x272734(0x561)][_0x272734(0x4e4)](_0x3ae3e8,this[_0x272734(0x1ea)]);},VisuMZ['EventsMoveCore'][_0x81ac0a(0x1ef)]=Sprite_Balloon['prototype'][_0x81ac0a(0x311)],Sprite_Balloon['prototype'][_0x81ac0a(0x311)]=function(){const _0x3bb001=_0x81ac0a;VisuMZ[_0x3bb001(0x399)][_0x3bb001(0x1ef)][_0x3bb001(0x2a9)](this),this[_0x3bb001(0x358)]();},Sprite_Balloon[_0x81ac0a(0x3a5)][_0x81ac0a(0x358)]=function(){const _0x2028da=_0x81ac0a;this['_target']['_character'][_0x2028da(0x3e5)]()&&(this['x']+=VisuMZ[_0x2028da(0x399)][_0x2028da(0x446)][_0x2028da(0x50c)]['BalloonOffsetX'],this['y']+=VisuMZ[_0x2028da(0x399)][_0x2028da(0x446)][_0x2028da(0x50c)][_0x2028da(0x3b1)]);},Sprite_Timer['prototype'][_0x81ac0a(0x22d)]=function(){const _0x26536f=_0x81ac0a;this[_0x26536f(0x541)]=new Bitmap(Math[_0x26536f(0x486)](Graphics['boxWidth']/0x2),0x30),this[_0x26536f(0x541)][_0x26536f(0x56e)]=this[_0x26536f(0x56e)](),this['bitmap']['fontSize']=this[_0x26536f(0x58b)](),this['bitmap'][_0x26536f(0x50b)]=ColorManager[_0x26536f(0x50b)]();},Sprite_Timer[_0x81ac0a(0x3a5)]['timerText']=function(){const _0x4e4b8b=_0x81ac0a,_0x2d42d9=Math[_0x4e4b8b(0x2ca)](this[_0x4e4b8b(0x1d8)]/0x3c/0x3c),_0x26389a=Math[_0x4e4b8b(0x2ca)](this['_seconds']/0x3c)%0x3c,_0x17f63e=this[_0x4e4b8b(0x1d8)]%0x3c;let _0x576a0c=_0x26389a[_0x4e4b8b(0x533)](0x2)+':'+_0x17f63e[_0x4e4b8b(0x533)](0x2);if(_0x2d42d9>0x0)_0x576a0c='%1:%2'[_0x4e4b8b(0x568)](_0x2d42d9,_0x576a0c);return _0x576a0c;},VisuMZ['EventsMoveCore'][_0x81ac0a(0x457)]=Spriteset_Map['prototype'][_0x81ac0a(0x502)],Spriteset_Map['prototype']['createLowerLayer']=function(){const _0x4b1612=_0x81ac0a;VisuMZ[_0x4b1612(0x399)]['Spriteset_Map_createLowerLayer'][_0x4b1612(0x2a9)](this),this['createLabelWindows']();},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x4bd)]=Spriteset_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x206)],Spriteset_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x206)]=function(){const _0x55d305=_0x81ac0a;VisuMZ[_0x55d305(0x399)][_0x55d305(0x4bd)][_0x55d305(0x2a9)](this),this['createShadows']();},Spriteset_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x528)]=function(){const _0x198fe4=_0x81ac0a;if(!VisuMZ[_0x198fe4(0x399)][_0x198fe4(0x446)][_0x198fe4(0x204)][_0x198fe4(0x307)])return;for(const _0x4602ab of this[_0x198fe4(0x507)]){this['createCharacterShadow'](_0x4602ab);}},Spriteset_Map['prototype'][_0x81ac0a(0x551)]=function(_0x287652){const _0x3b56d6=_0x81ac0a;_0x287652[_0x3b56d6(0x398)]=new Sprite(),_0x287652[_0x3b56d6(0x398)][_0x3b56d6(0x460)]=_0x287652[_0x3b56d6(0x561)][_0x3b56d6(0x51d)](),_0x287652[_0x3b56d6(0x398)][_0x3b56d6(0x541)]=ImageManager[_0x3b56d6(0x500)](_0x287652[_0x3b56d6(0x398)][_0x3b56d6(0x460)]),_0x287652[_0x3b56d6(0x398)][_0x3b56d6(0x38d)]['x']=0.5,_0x287652['_shadowSprite'][_0x3b56d6(0x38d)]['y']=0x1,_0x287652['_shadowSprite']['z']=0x0,this[_0x3b56d6(0x381)][_0x3b56d6(0x340)](_0x287652[_0x3b56d6(0x398)]);},Spriteset_Map[_0x81ac0a(0x3a5)]['hideShadows']=function(){const _0x18bfa6=_0x81ac0a;if(!VisuMZ[_0x18bfa6(0x399)][_0x18bfa6(0x446)]['Movement'][_0x18bfa6(0x307)])return;for(const _0x1cc97e of this[_0x18bfa6(0x507)]){this[_0x18bfa6(0x381)][_0x18bfa6(0x55f)](_0x1cc97e['_shadowSprite']);}},Spriteset_Map[_0x81ac0a(0x3a5)]['createLabelWindows']=function(){const _0x37df5f=_0x81ac0a;this[_0x37df5f(0x3a7)]=[];for(const _0x2a3745 of $gameMap[_0x37df5f(0x44a)]()){this[_0x37df5f(0x522)](_0x2a3745);}},Spriteset_Map['prototype'][_0x81ac0a(0x522)]=function(_0x134af9){const _0x294aed=_0x81ac0a;if(!this[_0x294aed(0x523)](_0x134af9))return;const _0x503bcc=new Window_EventLabel(_0x134af9);_0x503bcc['z']=0x8,_0x503bcc[_0x294aed(0x536)]=Sprite[_0x294aed(0x2bf)]++,this[_0x294aed(0x381)][_0x294aed(0x340)](_0x503bcc),this[_0x294aed(0x3a7)]['push'](_0x503bcc);},Spriteset_Map[_0x81ac0a(0x3a5)][_0x81ac0a(0x523)]=function(_0x55394e){const _0x2e52fb=_0x81ac0a,_0x28dde8=_0x55394e['event']();if(_0x28dde8['note'][_0x2e52fb(0x3b2)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x28dde8['note'][_0x2e52fb(0x3b2)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x26e072 of _0x28dde8[_0x2e52fb(0x34b)]){let _0x26e276='';for(const _0x219958 of _0x26e072[_0x2e52fb(0x4ed)]){[0x6c,0x198][_0x2e52fb(0x36a)](_0x219958[_0x2e52fb(0x55a)])&&(_0x26e276+=_0x219958['parameters'][0x0]);}if(_0x26e276['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x26e276[_0x2e52fb(0x3b2)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0x81ac0a(0x3a5)]['createSpawnedEvent']=function(_0x357917){const _0x3f33e4=_0x81ac0a;this[_0x3f33e4(0x507)]=this[_0x3f33e4(0x507)]||[];const _0x3e9ea0=new Sprite_Character(_0x357917);this[_0x3f33e4(0x507)]['push'](_0x3e9ea0),this[_0x3f33e4(0x381)][_0x3f33e4(0x340)](_0x3e9ea0),this[_0x3f33e4(0x551)](_0x3e9ea0),this[_0x3f33e4(0x522)](_0x357917),_0x3e9ea0[_0x3f33e4(0x4c3)]();},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x52c)]=Game_Message[_0x81ac0a(0x3a5)][_0x81ac0a(0x4c5)],Game_Message[_0x81ac0a(0x3a5)][_0x81ac0a(0x4c5)]=function(_0x485511,_0x3b7508){const _0x367427=_0x81ac0a;this[_0x367427(0x40d)]=$gameTemp['getSelfTarget'](),VisuMZ[_0x367427(0x399)][_0x367427(0x52c)][_0x367427(0x2a9)](this,_0x485511,_0x3b7508);},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x49e)]=Window_NumberInput[_0x81ac0a(0x3a5)][_0x81ac0a(0x3e0)],Window_NumberInput[_0x81ac0a(0x3a5)][_0x81ac0a(0x3e0)]=function(){const _0xd38c0f=_0x81ac0a;$gameTemp[_0xd38c0f(0x4ff)]($gameMessage[_0xd38c0f(0x40d)]),VisuMZ[_0xd38c0f(0x399)][_0xd38c0f(0x49e)][_0xd38c0f(0x2a9)](this),$gameTemp[_0xd38c0f(0x4e2)]();},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x3c5)]=Window_NumberInput[_0x81ac0a(0x3a5)][_0x81ac0a(0x50e)],Window_NumberInput[_0x81ac0a(0x3a5)][_0x81ac0a(0x50e)]=function(){const _0x82fd3c=_0x81ac0a;$gameTemp[_0x82fd3c(0x4ff)]($gameMessage[_0x82fd3c(0x40d)]),VisuMZ['EventsMoveCore'][_0x82fd3c(0x3c5)][_0x82fd3c(0x2a9)](this),$gameTemp[_0x82fd3c(0x4e2)](),$gameMessage[_0x82fd3c(0x40d)]=undefined;},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x3bd)]=Game_Message[_0x81ac0a(0x3a5)][_0x81ac0a(0x38c)],Game_Message[_0x81ac0a(0x3a5)][_0x81ac0a(0x38c)]=function(_0x4ddcda,_0x1c2a86){const _0x7348c0=_0x81ac0a;this['_selfTargetItemChoice']=$gameTemp[_0x7348c0(0x48a)](),VisuMZ[_0x7348c0(0x399)][_0x7348c0(0x3bd)][_0x7348c0(0x2a9)](this,_0x4ddcda,_0x1c2a86);},VisuMZ['EventsMoveCore'][_0x81ac0a(0x247)]=Window_EventItem[_0x81ac0a(0x3a5)][_0x81ac0a(0x3c0)],Window_EventItem[_0x81ac0a(0x3a5)][_0x81ac0a(0x3c0)]=function(){const _0x1f4c7c=_0x81ac0a;$gameTemp['registerSelfTarget']($gameMessage['_selfTargetItemChoice']),VisuMZ['EventsMoveCore']['Window_EventItem_onOk'][_0x1f4c7c(0x2a9)](this),$gameTemp[_0x1f4c7c(0x4e2)](),$gameMessage[_0x1f4c7c(0x43b)]=undefined;},VisuMZ['EventsMoveCore'][_0x81ac0a(0x417)]=Window_EventItem[_0x81ac0a(0x3a5)][_0x81ac0a(0x482)],Window_EventItem['prototype']['onCancel']=function(){const _0x898aa2=_0x81ac0a;$gameTemp['registerSelfTarget']($gameMessage['_selfTargetItemChoice']),VisuMZ['EventsMoveCore'][_0x898aa2(0x417)][_0x898aa2(0x2a9)](this),$gameTemp[_0x898aa2(0x4e2)](),$gameMessage[_0x898aa2(0x43b)]=undefined;},VisuMZ[_0x81ac0a(0x399)][_0x81ac0a(0x4d2)]=Window_Message[_0x81ac0a(0x3a5)]['startMessage'],Window_Message[_0x81ac0a(0x3a5)]['startMessage']=function(){const _0x273c64=_0x81ac0a;$gameMessage[_0x273c64(0x270)](),VisuMZ[_0x273c64(0x399)][_0x273c64(0x4d2)][_0x273c64(0x2a9)](this),$gameTemp[_0x273c64(0x4e2)]();},VisuMZ['EventsMoveCore']['Window_ScrollText_startMessage']=Window_ScrollText[_0x81ac0a(0x3a5)]['startMessage'],Window_ScrollText[_0x81ac0a(0x3a5)][_0x81ac0a(0x225)]=function(){const _0x4d20ec=_0x81ac0a;$gameMessage[_0x4d20ec(0x270)](),VisuMZ[_0x4d20ec(0x399)]['Window_ScrollText_startMessage'][_0x4d20ec(0x2a9)](this),$gameTemp[_0x4d20ec(0x4e2)]();};function Window_EventLabel(){const _0x155766=_0x81ac0a;this[_0x155766(0x418)](...arguments);}Window_EventLabel['prototype']=Object[_0x81ac0a(0x244)](Window_Base[_0x81ac0a(0x3a5)]),Window_EventLabel[_0x81ac0a(0x3a5)][_0x81ac0a(0x2cb)]=Window_EventLabel,Window_EventLabel[_0x81ac0a(0x3a5)][_0x81ac0a(0x418)]=function(_0x1110c6){const _0x34626b=_0x81ac0a;this[_0x34626b(0x26b)]=_0x1110c6;const _0xf944ac=new Rectangle(0x0,0x0,Graphics[_0x34626b(0x4b1)]/0x4,this[_0x34626b(0x4d3)](0x1));this[_0x34626b(0x374)](),Window_Base[_0x34626b(0x3a5)][_0x34626b(0x418)]['call'](this,_0xf944ac),this['contentsOpacity']=0x0,this[_0x34626b(0x4a8)](0x2),this[_0x34626b(0x277)]='';},Window_EventLabel['prototype'][_0x81ac0a(0x374)]=function(){const _0x4059ee=_0x81ac0a;this[_0x4059ee(0x279)]=![],this[_0x4059ee(0x515)]=$gameScreen[_0x4059ee(0x223)](),this[_0x4059ee(0x3ee)]=this[_0x4059ee(0x26b)][_0x4059ee(0x4eb)](),this[_0x4059ee(0x263)]=this[_0x4059ee(0x26b)][_0x4059ee(0x261)](),this[_0x4059ee(0x334)]=this[_0x4059ee(0x26b)][_0x4059ee(0x1e0)][_0x4059ee(0x3b7)],this['_eventLabelOffsetY']=this[_0x4059ee(0x26b)]['_labelWindow'][_0x4059ee(0x3ab)],this['_eventPageIndex']=this['_event']['_pageIndex'],this['_cacheVisibility']=this[_0x4059ee(0x4bc)](),this['_visiblePlayerX']=$gamePlayer['x'],this[_0x4059ee(0x20a)]=$gamePlayer['y'],this['_visibleEventX']=this[_0x4059ee(0x26b)]['x'],this[_0x4059ee(0x1f9)]=this[_0x4059ee(0x26b)]['y'];},Window_EventLabel[_0x81ac0a(0x3a5)][_0x81ac0a(0x4c3)]=function(){const _0x284b28=_0x81ac0a;Window_Base['prototype']['update'][_0x284b28(0x2a9)](this);if(!this[_0x284b28(0x3ff)]())return;this[_0x284b28(0x1fa)](),this[_0x284b28(0x367)](),this['updatePosition'](),this[_0x284b28(0x33b)]();},Window_EventLabel[_0x81ac0a(0x3a5)][_0x81ac0a(0x3ff)]=function(){const _0x395970=_0x81ac0a;if(!this[_0x395970(0x26b)])return![];if(!this[_0x395970(0x26b)][_0x395970(0x1e0)])return![];if(this[_0x395970(0x230)]!==this[_0x395970(0x26b)]['_pageIndex'])return!![];if(this[_0x395970(0x26b)][_0x395970(0x1fe)]&&!this['_eventErased'])return!![];if(this[_0x395970(0x26b)]['_labelWindow']['text']==='')return![];if(this[_0x395970(0x515)]!==$gameScreen['zoomScale']())return!![];if(this[_0x395970(0x3ee)]!==this[_0x395970(0x26b)][_0x395970(0x4eb)]())return!![];if(this['_eventScreenY']!==this[_0x395970(0x26b)]['screenY']())return!![];if(this[_0x395970(0x334)]!==this[_0x395970(0x26b)][_0x395970(0x1e0)]['offsetX'])return!![];if(this[_0x395970(0x213)]!==this['_event']['_labelWindow'][_0x395970(0x3ab)])return!![];if(this['_visiblePlayerX']!==$gamePlayer['x'])return!![];if(this[_0x395970(0x20a)]!==$gamePlayer['y'])return!![];if(this[_0x395970(0x362)]!==this[_0x395970(0x26b)]['x'])return!![];if(this[_0x395970(0x1f9)]!==this[_0x395970(0x26b)]['y'])return!![];if(this['_cacheVisibility']&&this[_0x395970(0x321)]<0xff)return!![];if(!this[_0x395970(0x333)]&&this['contentsOpacity']>0x0)return!![];if(SceneManager[_0x395970(0x34e)][_0x395970(0x3a3)]>0x0)return!![];return![];},Window_EventLabel['prototype']['updateText']=function(){const _0x152638=_0x81ac0a;this[_0x152638(0x26b)][_0x152638(0x4ea)]()!==this[_0x152638(0x277)]&&(this['_text']=this[_0x152638(0x26b)][_0x152638(0x4ea)](),this[_0x152638(0x443)]());},Window_EventLabel[_0x81ac0a(0x3a5)][_0x81ac0a(0x367)]=function(){const _0xca4af2=_0x81ac0a;this[_0xca4af2(0x480)]['x']=0x1/$gameScreen[_0xca4af2(0x223)](),this[_0xca4af2(0x480)]['y']=0x1/$gameScreen['zoomScale'](),this[_0xca4af2(0x515)]=$gameScreen['zoomScale']();},Window_EventLabel[_0x81ac0a(0x3a5)][_0x81ac0a(0x311)]=function(){const _0x3c1c3c=_0x81ac0a;if(!SceneManager['_scene'])return;if(!SceneManager[_0x3c1c3c(0x34e)]['_spriteset'])return;const _0x3b2e81=SceneManager[_0x3c1c3c(0x34e)][_0x3c1c3c(0x2f5)][_0x3c1c3c(0x46d)](this[_0x3c1c3c(0x26b)]);if(!_0x3b2e81)return;this['x']=Math[_0x3c1c3c(0x486)](this[_0x3c1c3c(0x26b)]['screenX']()-Math[_0x3c1c3c(0x2ca)](this[_0x3c1c3c(0x36e)]*this[_0x3c1c3c(0x480)]['x']/0x2)),this['x']+=this[_0x3c1c3c(0x26b)][_0x3c1c3c(0x1e0)]['offsetX'],this['y']=this[_0x3c1c3c(0x26b)]['screenY']()-_0x3b2e81['height'],this['y']+=Math[_0x3c1c3c(0x486)]($gameSystem[_0x3c1c3c(0x278)]()*0.5),this['y']-=Math['round'](this[_0x3c1c3c(0x30e)]*this['scale']['y']),this['y']+=this[_0x3c1c3c(0x26b)][_0x3c1c3c(0x1e0)]['offsetY'],this[_0x3c1c3c(0x279)]=this[_0x3c1c3c(0x26b)]['_erased'],this[_0x3c1c3c(0x3ee)]=this[_0x3c1c3c(0x26b)]['screenX'](),this[_0x3c1c3c(0x263)]=this[_0x3c1c3c(0x26b)]['screenY'](),this['_eventLabelOffsetX']=this[_0x3c1c3c(0x26b)]['_labelWindow']['offsetX'],this[_0x3c1c3c(0x213)]=this['_event'][_0x3c1c3c(0x1e0)][_0x3c1c3c(0x3ab)],this[_0x3c1c3c(0x230)]=this['_event'][_0x3c1c3c(0x2d6)],this[_0x3c1c3c(0x279)]&&(this[_0x3c1c3c(0x321)]=0x0);},Window_EventLabel[_0x81ac0a(0x3a5)][_0x81ac0a(0x33b)]=function(){const _0x572d33=_0x81ac0a;if(this[_0x572d33(0x4bc)]())this[_0x572d33(0x321)]+=this[_0x572d33(0x46f)]();else SceneManager['_scene'][_0x572d33(0x3a3)]>0x0?this[_0x572d33(0x321)]=0x0:this[_0x572d33(0x321)]-=this[_0x572d33(0x46f)]();},Window_EventLabel[_0x81ac0a(0x3a5)][_0x81ac0a(0x4bc)]=function(){const _0x500a5f=_0x81ac0a;if(!$gameSystem['eventLabelsVisible']())return![];if(this[_0x500a5f(0x26b)]?.[_0x500a5f(0x1fe)])return![];if(SceneManager[_0x500a5f(0x34e)][_0x500a5f(0x3a3)]>0x0)return![];const _0x317713=$gamePlayer['x'],_0x487e6d=$gamePlayer['y'],_0x419ce7=this[_0x500a5f(0x26b)]['x'],_0x285f9f=this[_0x500a5f(0x26b)]['y'];if(this[_0x500a5f(0x3f8)]===_0x317713&&this[_0x500a5f(0x20a)]===_0x487e6d&&this['_visibleEventX']===_0x419ce7&&this['_visibleEventY']===_0x285f9f)return this[_0x500a5f(0x333)];this[_0x500a5f(0x3f8)]=$gamePlayer['x'],this[_0x500a5f(0x20a)]=$gamePlayer['y'],this['_visibleEventX']=this[_0x500a5f(0x26b)]['x'],this['_visibleEventY']=this['_event']['y'];if($gameMap[_0x500a5f(0x432)](_0x317713,_0x487e6d,_0x419ce7,_0x285f9f)>this[_0x500a5f(0x26b)][_0x500a5f(0x1dc)]())return this[_0x500a5f(0x333)]=![],![];return this['_cacheVisibility']=!![],!![];},Window_EventLabel['prototype']['opacitySpeed']=function(){return VisuMZ['EventsMoveCore']['Settings']['Label']['OpacitySpeed'];},Window_EventLabel[_0x81ac0a(0x3a5)][_0x81ac0a(0x256)]=function(){const _0x127b44=_0x81ac0a,_0x190e01=this[_0x127b44(0x335)](this[_0x127b44(0x277)]);this[_0x127b44(0x36e)]=_0x190e01[_0x127b44(0x36e)]+($gameSystem[_0x127b44(0x278)]()+this['itemPadding']())*0x2,this['height']=Math['max'](this[_0x127b44(0x449)](),_0x190e01[_0x127b44(0x30e)])+$gameSystem[_0x127b44(0x278)]()*0x2,this['createContents']();},Window_EventLabel[_0x81ac0a(0x3a5)][_0x81ac0a(0x449)]=function(){const _0x4138aa=_0x81ac0a;return VisuMZ[_0x4138aa(0x399)][_0x4138aa(0x446)][_0x4138aa(0x556)][_0x4138aa(0x43c)];},Window_EventLabel['prototype'][_0x81ac0a(0x447)]=function(){const _0x50411f=_0x81ac0a;Window_Base[_0x50411f(0x3a5)][_0x50411f(0x447)][_0x50411f(0x2a9)](this),this[_0x50411f(0x286)][_0x50411f(0x58b)]=this[_0x50411f(0x3e8)]();},Window_EventLabel[_0x81ac0a(0x3a5)]['defaultFontSize']=function(){const _0x5bc2d4=_0x81ac0a;return VisuMZ[_0x5bc2d4(0x399)]['Settings'][_0x5bc2d4(0x556)][_0x5bc2d4(0x216)];},Window_EventLabel['prototype'][_0x81ac0a(0x443)]=function(){const _0x5cb8af=_0x81ac0a;this[_0x5cb8af(0x256)](),this[_0x5cb8af(0x286)]['clear']();const _0x250a12=this['_text'][_0x5cb8af(0x514)](/[\r\n]+/);let _0x50e0db=0x0;for(const _0x27f2dd of _0x250a12){const _0x190b1c=this[_0x5cb8af(0x335)](_0x27f2dd),_0x5d2e4b=Math[_0x5cb8af(0x2ca)]((this[_0x5cb8af(0x383)]-_0x190b1c['width'])/0x2);this[_0x5cb8af(0x1ed)](_0x27f2dd,_0x5d2e4b,_0x50e0db),_0x50e0db+=_0x190b1c[_0x5cb8af(0x30e)];}},Window_EventLabel['prototype'][_0x81ac0a(0x564)]=function(_0x164640,_0x4a5a4f){const _0x10bb1b=_0x81ac0a;_0x4a5a4f[_0x10bb1b(0x452)]&&this['drawIcon'](_0x164640,_0x4a5a4f['x']+0x2,_0x4a5a4f['y']),_0x4a5a4f['x']+=Math[_0x10bb1b(0x47c)](this[_0x10bb1b(0x228)](),ImageManager[_0x10bb1b(0x5a1)])+0x4;},Window_EventLabel[_0x81ac0a(0x3a5)]['drawIcon']=function(_0x16db10,_0x19bc7c,_0x25976d){const _0x3bedd7=_0x81ac0a,_0x560b66=ImageManager[_0x3bedd7(0x500)](_0x3bedd7(0x46c)),_0x556a25=ImageManager['iconWidth'],_0x43b947=ImageManager[_0x3bedd7(0x310)],_0x4788e2=_0x16db10%0x10*_0x556a25,_0x4184a2=Math['floor'](_0x16db10/0x10)*_0x43b947,_0x3866d3=Math[_0x3bedd7(0x47c)](this[_0x3bedd7(0x228)]()),_0x3caee5=Math['min'](this[_0x3bedd7(0x228)]());this['contents'][_0x3bedd7(0x1e3)](_0x560b66,_0x4788e2,_0x4184a2,_0x556a25,_0x43b947,_0x19bc7c,_0x25976d,_0x3866d3,_0x3caee5);},Window_EventLabel['prototype'][_0x81ac0a(0x228)]=function(){const _0x4197aa=_0x81ac0a;return VisuMZ[_0x4197aa(0x399)]['Settings']['Label'][_0x4197aa(0x597)];};