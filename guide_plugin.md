What is a Plugin?
1/17
Alright, let's talk about plugins. Think of them as little helpers that run alongside your roleplay, doing stuff automatically so you don't have to.

The Simple Version
A plugin is basically a set of rules: "When THIS happens, do THAT."

That's it. That's the core concept. When something specific happens in your chat (like you send a message, or a certain word appears, or 10 messages pass), the plugin jumps in and does something (adds a message, changes text, updates a number).

Why Would You Want One?
Great question. Here are some examples:

Random Events - Imagine a plugin that has a 10% chance to add a dramatic event to every scene. You're roleplaying a normal conversation and suddenly - boom - there's a thunderstorm, or someone knocks on the door, or your character stumbles. It keeps things unpredictable.

Mood Tracking - A plugin could watch for certain words or actions and track your character's mood. Say "I love you" and affection goes up. Get angry and tension increases. These values can then affect how the AI responds.

Time of Day - A plugin could check the actual real-world time and inject appropriate atmosphere. Morning scenes feel like morning. Night scenes are darker. Automatic.

OOC Commands - You could create a plugin that listens for specific commands like "/mood happy" and translates them into hidden instructions for the AI.

Relationship Points - Think dating sim style. Certain actions increase relationship levels. Maybe at level 5, your character unlocks special dialogue.

The Building Blocks
Every plugin is made of a few key parts:

Triggers - The "when" part. When does your plugin activate? Options include:

Always (every message)
Randomly (X% chance)
Keywords (specific words appear)
At intervals (every N messages)
Based on time
Based on variables you set
Actions - The "do what" part. What happens when triggered:

Add a message (from system, user, or bot)
Replace text in messages
Change a variable (add, subtract, set)
Flip a switch on/off
Variables & Switches - Memory. Plugins can remember things:

Variables store numbers or text (like "relationship: 50" or "mood: happy")
Switches are simple on/off flags (like "quest_started: true")
Real World Example
Let's say you want occasional rain in your story. Here's the logic:

Trigger: 5% random chance on each message
Action: Add a system message saying "[A gentle rain begins to fall outside]"
Done. Now 5% of the time, it'll rain. No manual intervention needed.

Or maybe you want a relationship system:

Variable: affection starts at 0
Trigger: Keywords like "kiss", "hug", "love"
Action: Add 5 to affection variable
Another Trigger: When affection reaches 100
Action: Add message "[Your bond has reached a new level. Something feels different between you.]"
Where Do Plugins Run?
Plugins run on the server, not in your browser. When you send a message, the server:

Receives your message
Checks all active plugins
For each plugin, evaluates triggers
Executes matching actions
Modifies the message history accordingly
Sends everything to the AI
Returns the response
This happens in milliseconds. You won't notice the delay.

The Bottom Line
Plugins are automation for roleplay. They handle the tedious stuff, inject randomness, track progress, and make your stories more dynamic without you having to micromanage everything.

They range from dead simple (random flavor text) to complex (full stat tracking systems with multiple variables and conditional logic). Start simple. Get fancy later.

Ready to make one? Let's move on to the Plugin Creator.

Next up: Plugin Creator Modes - Choosing between Blank Canvas and Guided Forge

Plugin Creator Modes
2/17
When you open the Plugin Creator for the first time (or hit "New Plugin"), you'll see a welcome screen asking you to pick your path. Two options, very different vibes.

Welcome Modal
Blank Canvas
This is the full editor. All the bells and whistles, all the complexity, all the power.

Who is it for?

People who know what they want to build
Returning users who've made plugins before
Those who want complete control over every setting
Anyone who prefers a more technical approach
What you get:

Full access to all plugin features
Create multiple blocks (entry points)
Fine-tune every trigger condition
Set up complex action chains
Define variables and switches manually
Write custom script code (if you're into that)
Full handbook editor
Complete metadata control
If you pick Blank Canvas, you start with an empty plugin. A clean slate. You add blocks, configure triggers, set up actions, and build from scratch. It's more work, but you're in complete control.

Guided Forge
This is the easy mode. AI helps you build a plugin through a 3-step wizard.

Who is it for?

New users who are just starting out
Anyone who wants a quick prototype
People who know what they want but not how to build it
Those who prefer natural language over technical configuration
How it works:

Describe your vision - Write a plain English description of what you want your plugin to do. Be as detailed or vague as you want.

"A plugin that tracks relationship levels and triggers special events when certain milestones are reached."

Pick from 3 AI concepts - The AI generates three completely different approaches for your plugin. Each concept card shows:

A unique name and description
Core mechanics it will use (triggers, variables, switches, etc.)
A complexity indicator (Simple / Medium / Advanced)
A highlighted feature that makes the approach unique
Pick the one that sounds closest to what you want. You can also answer optional quick questions to refine the concept, add extra wishes, or regenerate all three if none fit.

Refine and generate - Review your chosen concept, add any last-minute adjustments, and hit Generate. The AI builds a complete plugin with triggers, actions, variables, and switches already set up. Ready to test.

Which Should You Choose?
Start with Guided Forge if:

This is your first plugin
You want to see how plugins are structured
You have an idea but don't know the technical details
You want something working in 2 minutes
Go with Blank Canvas if:

You've made plugins before
You have specific technical requirements
You want to learn by doing (the hard way)
You need precise control over behavior
Switching Between Modes
Here's the thing - you can always switch. If you start with Guided Forge and want more control, the generated plugin opens in the full editor. You can modify everything.

If you start with Blank Canvas but realize you're stuck, you can describe what you want and let the AI generate portions of your plugin.

There's no wrong choice. Just different starting points.

Pro Tip
If you're completely new, try Guided Forge first. Generate a simple plugin, then explore the editor to see how it's built. That's actually a great way to learn - see how the AI structures things, then understand the pattern.

Once you understand triggers, actions, and variables through examples, Blank Canvas becomes much less intimidating.

Next up: Metadata Settings - Naming your plugin and setting its properties

Metadata Settings
3/17
The Metadata tab is where you give your plugin an identity. Name it, describe it, categorize it. The boring administrative stuff that actually matters when people are browsing the library.

Metadata Editor
Plugin Name
The title of your creation. This shows up everywhere - in the library, on the gameboy card preview, in search results. Make it count.

Rules:

Maximum 50 characters
Required (you can't publish without one)
"Untitled Plugin" is the default shame placeholder
Pro tip: Be descriptive but concise. "Random Weather Events" tells people exactly what they get. "Cool Thing" does not.

There's also a Force Bary button next to the field. Click it and Bary (our AI assistant) will generate a name based on your plugin's content. Useful if you're feeling uncreative.

Category
Helps people find your plugin. Pick the one that fits best:

Category What it's for
Utility Tools and helper functions
Roleplay Enhances roleplay mechanics
Storytelling Narrative tools and plot helpers
System Core system modifications
Style Writing style adjustments
NSFW Adult content (18+)
SFW Safe for work content
Plot Story progression tools
NPC Handling Controls non-player characters
User Handling Affects user interactions
Emotions & Needs Mood and emotional tracking
Other Everything else
You must pick one. The system won't let you save without a category.

Description
Tell people what your plugin does. This is your sales pitch.

Rules:

Maximum 500 characters
Supports rich text formatting (bold, italic, lists)
Optional but highly recommended
The description shows in the plugin detail modal when people click on your plugin in the library. If it's blank, they have no idea what they're getting into.

Again, there's a Force Bary button to generate a description based on your plugin's triggers and actions. Let the AI do the marketing if you're stuck.

Tags
Search keywords. When someone types in the library search bar, tags help your plugin show up.

Rules:

Maximum 5 tags
Press Enter or comma to add each tag
Keep them relevant
Good tags: weather, random-events, atmosphere, immersion

Bad tags: awesome, best, cool, please-download

Bary can generate these too. Just click the button.

Cover Image (Plugin Case Preview)
The visual representation of your plugin. Shows as a stylized gameboy cartridge in the library.

Options:

Upload your own: Drag and drop or click to upload. Max 2MB.
Let Bary generate one: AI-generated art based on your plugin name and description.
Use default: Leave it empty for a generic placeholder.
The preview shows how your plugin will look in the library. Check it before publishing - first impressions matter.

Visibility & Access
These toggles control who can see and download your plugin.

Draft Mode
Only available when editing an existing plugin. Converts your published plugin back to a draft for private editing. Useful when you need to make major changes without people seeing half-finished work.

Public Toggle
ON: Anyone can see your plugin in the library
OFF: Only you can see it (private)
Private plugins are useful for personal use or when you're still testing. Make it public when you're ready for the world.

Allow Downloads
ON: Users can download/copy your plugin
OFF: They can view but not download
If you want credit without copying, turn this off. People can use your plugin but can't take the code.

Show Detailed View
Only appears when your plugin is public.

ON: Users see all trigger and action settings in the detail modal
OFF: Only shows block counts and basic info
Turn this off if you don't want people seeing exactly how your plugin works. Maybe you have secret sauce you want to protect. Maybe you're just paranoid. Either way, it's your call.

Description Images
You can upload up to 5 images to showcase your plugin. Screenshots of it in action, example outputs, visual guides - whatever helps people understand what they're getting.

How it works:

Scroll to the Description Images section in Metadata
Click to upload images (or drag and drop)
Optionally add a caption to each image
Reorder by dragging
These images appear in the plugin detail modal as a gallery. Users can click to enlarge them. A good set of screenshots is worth more than a paragraph of description.

Tips:

Show before/after examples of what your plugin does
Capture the Test Chamber output for proof
Keep images clean and readable
Delete Plugin / Delete Draft
At the bottom, there's a delete button. Does what it says.

Warning: This cannot be undone. The plugin is gone forever. No recovery. No "oops I changed my mind." Make sure you actually want to delete it.

For published plugins, deleting removes it from the library immediately. Anyone who downloaded it still has their copy, but no one new can get it.

For drafts, deleting just removes the draft. Less dramatic but still permanent.

Next up: Triggers Explained - When should your plugin activate?

Triggers Explained
4/17
Triggers are the "when" of your plugin. They define the conditions that must be met for your plugin's actions to execute. No trigger, no action. Simple as that.

Trigger Editor
The Basics
Every trigger is a condition. When that condition is true, the plugin fires. When it's false, nothing happens.

You can have multiple triggers in a single block. They can work together (AND logic) or independently (OR logic). More on that later.

Trigger Types
Let's go through each one.

Random Chance
What it does: Rolls the dice every message. If lucky, triggers.

Settings:

Chance: Percentage from 1-100
Example: Set to 5% - your plugin has a 5% chance to trigger on every single message.

Best for: Random events, occasional flavor text, surprise mechanics.

Pro tip: Low percentages (1-10%) for subtle effects. Higher percentages (50%+) for frequent triggers but be careful - too high and it becomes annoying.

Always Active
What it does: Triggers on every single message. No exceptions.

Settings: None. It just fires. Every. Time.

Best for: Plugins that need to constantly monitor or modify messages. System-level stuff.

Warning: If you have multiple "Always Active" triggers, they ALL fire. Make sure your actions don't conflict.

Keyword Detection
What it does: Watches for specific words or phrases in messages.

Settings:

Keywords: List of words to watch for (max 5)
Target: Where to look - User messages, Bot messages, or Both
Example: Keywords: rain, storm, weather - triggers when any of these appear.

Best for: Responding to specific topics, detecting commands, contextual triggers.

Pro tip: Keywords are case-insensitive. "RAIN" matches "rain" and "Rain".

Regex Pattern
What it does: Uses regular expressions to match complex patterns.

Settings:

Pattern: Your regex pattern
Match Against: User messages or Bot messages
Example: \d+\s\*(gold|coins?) matches "50 gold", "100 coins", etc.

Best for: Advanced pattern matching, detecting number ranges, complex text patterns.

Warning: Regex can be tricky. Test your patterns thoroughly. A bad regex can either match nothing or match everything.

Common patterns:

Pattern Matches
\d+ Any number
\[.\*\] Anything in brackets
^hello Lines starting with "hello"
bye$ Lines ending with "bye"
Time-based
What it does: Triggers based on the actual real-world time (user's local timezone).

Settings:

Mode: Exact time or Time range
Time: Hour and minute (24-hour format)
End Time: For ranges only
Example: Exact time 22:00 - triggers at 10 PM. Range 18:00-23:00 - triggers during evening hours.

Best for: Day/night atmosphere, time-specific events, scheduled content.

Note: Uses the user's local timezone, not server time.

Date-based
What it does: Triggers on specific dates.

Settings:

Mode: Exact date or Date range
Day: Day of month (1-31)
Month: Month (1-12)
End Date: For ranges only
Example: Day 25, Month 12 - triggers on Christmas. Range Dec 24-26 - triggers during Christmas period.

Best for: Holiday events, seasonal content, anniversary specials.

Note: Works every year on those dates.

Message Count
What it does: Triggers when the total message count meets a condition.

Settings:

Operator: Greater than (>), Less than (<), Equal to (==), etc.
Value: The number to compare against
Example: Operator >, Value 10 - triggers when more than 10 messages have been sent.

Best for: Tutorial triggers, progression systems, "after X messages" effects.

Message Count Interval
What it does: Triggers every X messages.

Settings:

Interval: How many messages between triggers
Example: Interval 5 - triggers on message 5, 10, 15, 20, etc.

Best for: Regular check-ins, periodic reminders, rhythm-based effects.

Variable
What it does: Triggers when a variable reaches a certain value.

Settings:

Variable: Which variable to check
Operator: How to compare (==, !=, >, <, >=, <=)
Value: What to compare against
Example: Variable affection, Operator >=, Value 100 - triggers when affection reaches 100 or higher.

Best for: Stat-based triggers, progression unlocks, conditional content.

Requirement: You need to create variables first in the Variables section.

Switch
What it does: Triggers when a switch is in a specific state.

Settings:

Switch: Which switch to check
State: ON or OFF
Example: Switch quest_started, State ON - triggers only when quest_started is true.

Best for: State-based logic, feature toggles, quest systems.

Requirement: You need to create switches first in the Variables section.

Message Length
What it does: Fires based on the character count of the last message.

Settings:

Operator: How to compare (>, <, >=, <=, ==, !=)
Characters: The character count threshold
Check In: Whose message to measure - User or Bot
Example: Operator >, Value 200, Target user - triggers when the user writes a message longer than 200 characters.

Best for: Detecting short vs. long responses, rewarding detailed writing, adjusting behavior based on message effort.

Pro tip: Combine with AND logic and a random trigger to occasionally react to long messages without being predictable.

Combining Triggers (AND/OR Logic)
When you have multiple triggers, you can choose how they interact:

OR Logic (Default)
Any trigger that matches will fire the plugin. Trigger 1 matches? Fire. Trigger 2 matches? Also fire. Independent checks.

Use case: "Trigger on keyword OR random chance" - either condition works.

AND Logic
ALL triggers must match for the plugin to fire. It's stricter.

Use case: "Only trigger if it's nighttime AND the keyword appears" - both conditions required.

Trigger Logic Toggle
Bot-Targeted Triggers: Timing
Keyword Detection, Regex Pattern, and Message Length all support targeting bot messages. Important thing to understand: plugins process before the AI generates its response. So "bot message" means the bot's previous reply, not the one it's about to write.

The flow:

User sends a message
Plugin checks triggers against chat history (including the bot's last reply)
If triggered, actions execute
AI generates its new response
In practice: If the bot says something angry on turn 5, your "detect anger" trigger fires on turn 6 (the next user message). The variable gets set, and the action runs alongside that next message.

In the Test Chamber: On your very first message, the only bot message is the Bary greeting. Send a second message to test against actual bot responses.

Best Practices
Start simple - One trigger is often enough. Add more only when needed.

Test thoroughly - Use the Test Chamber to make sure your triggers fire when expected.

Consider frequency - Random triggers at 50% + Always Active = chaos. Plan your trigger rates.

Combine wisely - AND logic for precision, OR logic for flexibility.

Name your blocks - When you have multiple blocks with different triggers, clear names help you remember what does what.

Next up: Actions Explained - What happens when your triggers fire

Actions Explained
5/17
Actions are the "do what" of your plugin. When a trigger fires, actions execute. They're the actual effects - adding messages, changing text, updating variables.

Actions Editor
The Basics
Each action does one thing. You can have multiple actions in a block, and they execute in order from top to bottom when triggered.

No actions = nothing happens when triggered. Kind of pointless, really.

Action Types
Let's go through each one.

Add Message
The most common action. Injects a message into the conversation.

Settings:

Message Role
Who "sends" this message:

Role What it does
System Hidden instruction to the AI. Users and the bot don't "see" it as a message, but the AI reads it.
Bot Appears as if the character/bot said it.
User Appears as if the user said it.
Message Mode (for User/Bot only)
Append to Last: Adds text to the end of the last message of that role. Seamless continuation.
New Message: Creates a brand new message. Shows up as separate.
Message Pool
Here's the cool part. You don't write just one message - you write several, and the plugin picks randomly.

Why? Variety. If your plugin triggers often, the same text gets boring fast. Multiple options keep things fresh.

Example pool for a random weather event:

[A gentle rain begins to fall outside.]
[Thunder rumbles in the distance.]
[The wind picks up, rustling through the trees.]
[Dark clouds gather overhead.]
Pool Count
By default, one message is selected from the pool. But you can change how many get picked using the count buttons next to the pool header:

1 - One random message (default)
2 - Two random messages
3 - Three random messages
🔀 - Random between 1-3 messages
Quick Buttons
OOC - Wraps your message in [OOC: ...] brackets. Out-of-character formatting.
SYS - Wraps your message in [SYSTEM NOTE: ...] brackets. System-level instructions.
VAR - Inserts a variable reference like {{variableName}}. The actual value replaces it when triggered.
Force Bary
Click the purple button to have AI generate message variations for your pool. Tell it what you want, it creates options.

Replace
Find and replace text in messages. Useful for dynamic content.

Settings:

Target Message
Which message type to search in:

User - Searches in user messages
Bot - Searches in bot messages
Find
The text to search for. Case-sensitive.

Replace With
What to replace it with. Can include variables with {{variableName}}.

Example:

Find: [PLAYER_NAME]
Replace: {{characterName}}
Now anywhere [PLAYER_NAME] appears, it gets replaced with the actual character name stored in that variable.

Pro tip: Great for placeholder systems. Write templates with placeholders, then replace them dynamically.

Set Variable
Changes a variable's value. The backbone of tracking systems.

Settings:

Variable Name
Select from your defined variables. If you haven't made any yet, you need to create them in the Variables section first.

You can also click "+ new variable" to create one inline.

Operation (Numbers only)
For number variables, you get three operations:

Operation What it does
Set Replace the value entirely
Plus Add to the current value
Minus Subtract from the current value
Example: Variable affection, Operation Plus, Value 5 - adds 5 to affection every time this action runs.

Value
What to set/add/subtract. Numbers for number variables, text for string variables.

String variables only have the Set operation (you can't add or subtract text meaningfully).

Set Switch
Flips a switch on or off. Binary state changes.

Settings:

Switch Name
Select from your defined switches. Create them in Variables section if you haven't.

Switch State
ON (Active) - Sets the switch to true
OFF (Inactive) - Sets the switch to false
Example: Action: Set Switch quest_started to ON. Now other triggers that check for quest_started = ON will fire.

Embed Image
Embeds a JanitorAI image URL in the chat at the top or bottom of the last bot message.

Settings:

Image URL: A JanitorAI Media Library image link
Position: Top or Bottom of the bot's message
Action Logic (AND/OR)
When you have multiple actions in a block, you can control how they execute:

AND Logic (Default)
All actions execute in order from top to bottom. Action 1 runs, then Action 2, then Action 3. Standard sequential execution.

OR Logic
One random action is picked and executed. The rest are skipped. Useful when you have several possible responses and only want one to fire.

Example: Three "Add Message" actions with different flavors:

[A cold wind blows through the room.]
[Thunder rumbles in the distance.]
[The candles flicker ominously.]
With OR logic, only one of these fires per trigger. Instant variety without multiple message pools.

Note: The toggle only appears when you have 2+ actions in a block.

Multiple Actions
You can have as many actions as you want in a single block. They execute in order (unless Action Logic is set to OR).

Example block:

Set Variable mood Plus 10
Add Message (System) The character is now happier.
Set Switch happy_threshold_reached to ON if mood > 50
Each action runs one after another when the triggers match.

Action Order Matters
If you set a variable in Action 1 and check that variable in Action 2's message, the new value is used.

Example:

Set Variable count Plus 1
Add Message This is interaction number {{count}}.
The message shows the updated count, not the old one.

The Message Pool Strategy
Don't write one message. Write five. Or ten. Here's why:

Scenario: Plugin triggers on keyword "hug"

Bad approach: One message: _smiles warmly_

After 3 hugs, it's repetitive. Boring. Immersion broken.

Good approach: Pool of 5 messages:

_returns the embrace gently_
_holds you close for a moment_
_wraps arms around you with a soft sigh_
_leans into the hug, savoring the warmth_
_squeezes you affectionately_
Now each hug feels different. Variety keeps the magic alive.

Variables in Messages
You can insert variable values directly into messages using {{variableName}} syntax.

Example message: Your relationship level is now {{affection}}. {{characterName}} seems to notice.

When triggered, this might output: Your relationship level is now 75. Luna seems to notice.

The variables are replaced with their current values at the moment of execution.

Next up: AI Instructions Guide - How to write instructions the AI actually follows

AI Instructions Guide
6/17
You've built triggers and actions. You know how to inject messages. But here's the thing: not all instructions are created equal. Where you place them, how you phrase them, and what format you use dramatically affects whether the AI actually listens.

This guide explains how AI reads your messages and how to make your instructions stick.

How AI Reads Context
When you send a message, the AI doesn't read your conversation like a human would. It processes the entire context window at once, but attention isn't distributed equally.

The Attention Curve
AI models pay the most attention to:

The very beginning - System prompts, character definitions
The very end - The most recent messages, especially the last user message
Recent exchanges - The last few back-and-forth messages
The middle of long conversations? That's where attention drops off. Instructions buried in message 47 of a 200-message chat will likely be ignored or forgotten.

Think of it like this: The AI has a spotlight. It shines brightest at the start and end, dimming in the middle.

Why This Matters for Plugins
If your plugin injects a message in the middle of a conversation, it might get overlooked. But if you append to the last user message or inject at the very start, the AI is far more likely to follow your instruction.

Message Pools
Before we dive into instruction formats, let's talk about message pools.

What Is a Message Pool?
Instead of sending the same message every time, a pool lets you define multiple variations. The system randomly picks one each time the action triggers.

Without pool:

"The character feels happy."

With pool:

"The character feels a warm glow of happiness."
"A smile crosses the character's face."
"The character's mood brightens noticeably."
"Something shifts - the character seems genuinely pleased."
Same intent, but varied execution. This keeps responses feeling fresh instead of robotic.

When to Use Pools
Mood indicators - Different ways to express the same emotion
Environmental changes - Various descriptions of weather, time, atmosphere
Random events - Multiple possible outcomes
Recurring instructions - Same goal, different phrasing
Pool Best Practices
Keep variations consistent in intent - All messages should achieve the same goal
Vary the wording, not the meaning - Don't mix "be happy" with "be sad" in one pool
Match the tone - If one message is formal, keep them all formal
Test each variation - Make sure all pool entries work individually
Why Models Differ
Here's an uncomfortable truth: different AI models follow instructions differently.

Model Personalities
Claude - Generally follows instructions well, respects boundaries, sometimes "too helpful"
GPT-4 - Strong instruction following, can be verbose
GPT-3.5 - Hit or miss with complex instructions
Local models - Wildly variable depending on training
An instruction that works perfectly on Claude might be ignored by a smaller model. A prompt that GPT-4 handles elegantly might confuse GPT-3.5.

What This Means for You
Test on multiple models if possible
Keep instructions simple - Complex multi-step commands fail more often
Be explicit - Don't assume the model will infer your intent
Use reinforcement - Important instructions benefit from repetition
Instruction Formats That Work
Now for the practical part. How should you actually write instructions?

The OOC Format
OOC stands for "Out of Character." It's a signal to the AI that this is a meta-instruction, not part of the story.

[OOC: {{char}} will now feel dizzy and need to sit down.]
Why it works:

Clear separation from narrative content
The brackets signal "this is different"
Direct and unambiguous
Feels like a stage direction, which AI models understand
System Note Format
Similar to OOC, but framed as a system-level instruction:

[System Note: The next response should include {{char}} noticing a strange sound outside.]
Author's Note Format
Common in creative writing contexts:

[Author's Note: Increase tension in this scene. {{char}} suspects something is wrong.]
Direct Instruction Format
Sometimes simple is best:

[{{char}} will cough nervously before responding.]
Where to Place Instructions
This is crucial. The same instruction can succeed or fail based on placement.

Best: Append to Last User Message
Why it's effective:

Last position in context = highest attention
Feels like a natural extension of user input
AI processes it right before generating response
Example:
User writes: "I walk into the room."
Plugin appends: "\n\n[OOC: {{char}} is startled by the sudden entrance and drops what they're holding.]"

The AI sees:

"I walk into the room.

[OOC: {{char}} is startled by the sudden entrance and drops what they're holding.]"

This almost always works better than a separate system message.

Good: System Message at Start
For persistent instructions that should apply throughout:

Character behavior rules
Setting information
Tone guidelines
These get high attention because they're at the beginning, but they can feel "far away" from the current moment.

Risky: Separate System Message Mid-Conversation
A standalone system message injected into the middle of a long conversation might:

Get less attention
Feel disconnected from the flow
Be treated as "old information"
If you must use this, keep it very short and direct.

Bad: Bot/Assistant Messages
This is a common mistake. Adding a message as "assistant" role creates problems:

It's not real - You're putting words in the AI's mouth it didn't say
Context pollution - The AI might think it already said this and avoid repeating
Inconsistency - If your injected message contradicts the AI's style, it creates confusion
Quality degradation - The AI tries to stay consistent with "its" previous messages, including your fake ones
Example of what NOT to do:

Adding an assistant message: "I feel very happy right now and want to hug the user."

Now the AI thinks it already expressed this. It might:

Not mention happiness again (already covered)
Act confused about why it said that
Generate responses that awkwardly reference this "memory"
Instead, use OOC appended to user:

[OOC: {{char}} feels overwhelming happiness and has an urge to hug {{user}}.]
The AI receives this as an instruction, not as something it already did.

Comparing Approaches
Let's say you want the character to sneeze. Here are different approaches ranked:

Best Approach
Append to user message:

[OOC: {{char}} will sneeze mid-sentence in their next response.]
Okay Approach
System message at conversation start:

[System: {{char}} has allergies and will sneeze occasionally.]
Poor Approach
Standalone system message mid-conversation:

The character sneezes now.
Worst Approach
Fake assistant message:

_sneezes_ Oh excuse me, I have allergies.
Writing Effective Instructions
Be Specific, Not Vague
Vague: "The character is sad."
Specific: "{{char}}'s voice wavers slightly. They avoid eye contact and give shorter responses."

Use Action Words
Weak: "The room is cold."
Strong: "{{char}} shivers and rubs their arms for warmth."

One Instruction Per Injection
Don't overload:

Too much:

[OOC: {{char}} will sneeze, then feel embarrassed, then change the topic to weather, then remember they left the stove on, then excuse themselves.]
Better:

[OOC: {{char}} sneezes unexpectedly and feels embarrassed about it.]
Use Placeholders
{{char}} - The AI character's name
{{user}} - The user's name
These get replaced with actual names, making instructions feel natural.

Common Mistakes

1. Instructions That Sound Like Narrative
   Bad: "Sarah walked to the window and sighed."
   Good: "[OOC: {{char}} will walk to the window and sigh.]"

The first sounds like story content. The second is clearly an instruction.

2. Contradicting the AI's Personality
   If your character is established as cheerful, injecting "[{{char}} feels deeply depressed]" might create jarring inconsistency. Build emotional changes gradually or provide context.

3. Over-Instructing
   Every message doesn't need a plugin injection. Sometimes the AI knows what to do. Over-directing makes responses feel scripted and removes natural flow.

4. Ignoring Model Limitations
   Some instructions are too complex for certain models:

"Write exactly 3 paragraphs" - Often ignored
"Use these specific words" - Sometimes followed, sometimes not
"Never mention X" - Negative instructions often fail 5. Using Bot Messages for Instructions
We covered this, but it bears repeating: don't inject assistant messages as instructions. It confuses the AI and degrades quality.

Quick Reference
Method Effectiveness Use Case
OOC append to user Excellent Immediate actions, reactions
System note append Very Good Same as OOC, different style
System message (start) Good Persistent rules, settings
System message (mid) Moderate Short, urgent instructions
Assistant message Poor Almost never recommended
Summary
AI attention is highest at start and end - Place important instructions there
Append to user messages - The most reliable method for immediate instructions
Use OOC or System Note format - Clear, unambiguous, respected by most models
Avoid assistant messages - They pollute context and confuse the AI
Be specific and direct - Vague instructions get vague results
Test on your target model - What works on one might not work on another
Use message pools - Variety keeps things fresh
Master these principles and your plugins will feel like magic. Ignore them and you'll wonder why your carefully crafted instructions get ignored.

Next up: Variables & Switches - Storing and tracking data

Variables & Switches
7/17
Variables and switches are your plugin's memory. They let you track things across messages - relationship points, mood states, quest progress, anything you want to remember.

Variables Editor
The Difference
Variables store values - numbers or text. They can change over time, be compared, be displayed in messages.

Switches are simpler - just ON or OFF. Binary flags. Either something is true or it isn't.

Both are shared across all blocks in your plugin. Set a variable in Block A, read it in Block B.

Variables
Creating a Variable
Go to the Variables tab in the creator
Click Add Variable
Give it a name (no spaces, use underscores)
Choose a type: Number or String
Set an initial value
Variable Types
Type What it stores Example values
Number Numeric values 0, 42, -5, 3.14
String Text "happy", "Luna", "Chapter 1"
Initial Value
This is what the variable starts at when the plugin first loads. Think of it as the default.

Number variables often start at 0
String variables might start empty or with a default like "neutral"
Using Variables
In Triggers:
Set up a Variable trigger to check when a variable reaches a certain value.

Example: Trigger when affection >= 100

In Actions:
Use Set Variable action to change values.

Example: Add 5 to affection when keyword "love" detected

In Messages:
Insert with {{variableName}} syntax.

Example: Your current mood: {{mood}}

Variable Operations
For number variables, you have three options:

Operation Formula Example
Set value = X affection = 50
Plus value = value + X affection = 45 + 5 = 50
Minus value = value - X affection = 55 - 5 = 50
String variables only support Set (replacing the entire text).

Naming Conventions
Good names are descriptive and consistent:

Good:

relationship_level
player_mood
current_chapter
trust_points
Bad:

x
thing
var1
asdfasdf
Future you will thank present you for clear names.

Switches
Creating a Switch
Go to the Variables tab
Click the Switches sub-tab
Click Add Switch
Give it a name
Set initial state (ON or OFF)
Initial State
ON - Switch starts as true/active
OFF - Switch starts as false/inactive
Most switches start OFF and get turned ON when something happens.

Using Switches
In Triggers:
Set up a Switch trigger to check if a switch is ON or OFF.

Example: Only trigger if quest_started is ON

In Actions:
Use Set Switch action to flip the state.

Example: Set first_meeting_done to ON after introduction

Common Switch Patterns
One-time events:

Switch: first_kiss_happened
Starts: OFF
Set to ON: After first kiss scene triggers
Use: Prevent the same "first kiss" from happening twice
Feature toggles:

Switch: dark_mode_enabled
Starts: OFF
Toggle: Based on user command or time of day
Use: Different behavior when ON vs OFF
Quest/story progress:

Switch: chapter_1_complete
Starts: OFF
Set to ON: When chapter 1 ends
Use: Unlock chapter 2 content
Practical Examples
Relationship System
Variables:

affection (Number, starts at 0)
trust (Number, starts at 0)
Triggers & Actions:

Keyword "love", "adore" → affection +5
Keyword "trust", "believe" → trust +3
Keyword "hate", "angry" → affection -10
Message using variables:
[Relationship Status: Affection {{affection}}, Trust {{trust}}]

Day/Night Cycle
Switches:

is_nighttime (starts OFF)
Triggers & Actions:

Time 20:00-06:00 → Set is_nighttime ON
Time 06:00-20:00 → Set is_nighttime OFF
Conditional content:

Trigger: is_nighttime ON + keyword "outside"
Action: Add message about stars and moonlight
Quest System
Switches:

quest_accepted (OFF)
quest_complete (OFF)
Variables:

enemies_defeated (Number, 0)
Flow:

Keyword "accept quest" → Set quest_accepted ON
Keyword "defeat" + quest_accepted ON → enemies_defeated +1
enemies_defeated >= 5 → Set quest_complete ON, add completion message
Tips
Keep it simple - Start with 1-2 variables. Add more as needed.

Test your math - Make sure +5 and -10 don't create weird states.

Consider boundaries - Should affection go below 0? Above 100? Handle edge cases.

Use switches for gates - Things that should only happen once? Use a switch.

Variables are persistent - Within a session, they remember. Between sessions depends on how the plugin is used.

Document your system - In the Handbook, explain what variables mean and how they work.

Next up: Plugin Handbook - Documenting your creation

Plugin Handbook
8/17
The Handbook is your plugin's user manual. It's where you explain what your plugin does, how to use it, and any quirks people should know about. Think of it as the instructions that come with furniture - except hopefully more readable.

Handbook Editor
Why Bother?
Three reasons:

People actually read it - When someone clicks on your plugin, the handbook shows in the detail modal. It's their first real look at how your creation works.

You'll forget - Come back in 6 months and you won't remember why you set that variable to 42. Write it down now.

Support requests - A good handbook means fewer "how does this work?" questions.

The Editor
The handbook has two main parts:

Title
The big headline at the top. Defaults to "How to Use This Plugin" but you can change it to whatever fits.

Good titles:

Weather System Guide
Relationship Tracker Manual
Quest Plugin Instructions
Content
Rich text editor. You can format text, add lists, make things bold or italic. Write like you're explaining to someone who's never seen your plugin before.

Character limit: 10,000 characters. That's a lot. Use it wisely.

What to Include

1. Quick Overview
   Start with a one-paragraph summary. What does this plugin do in plain English?

"This plugin adds random weather events to your roleplay. About 5% of messages will include weather descriptions - rain, sunshine, storms, etc."

2. How It Works
   Explain the mechanics without getting too technical:

"The plugin watches for certain keywords related to going outside. When detected, it has a chance to add weather flavor text. Indoor scenes are unaffected."

3. Variables (if any)
   If your plugin tracks things, explain what:

"mood_level - Tracks overall mood from 0-100. Starts at 50. Positive interactions increase it, negative ones decrease it."

4. Commands or Keywords
   If users need to say specific things:

"Say 'check weather' to get a weather status update. Use '/mood' to see current mood level."

5. Tips and Best Practices
   Help users get the most out of it:

"Works best in outdoor or travel scenes. For indoor settings, weather effects are minimal. Combine with location plugins for extra immersion."

6. Known Issues or Limitations
   Be honest about what doesn't work:

"Weather doesn't persist between sessions. Time-based features use your local timezone."

Polaroids & Sketches
You can add up to 3 images to your handbook. Screenshots, diagrams, or decorative art.

How to add:

Click the dashed box or drag-and-drop an image
Max size: 2MB per image
Add captions by clicking below each image
Good uses:

Screenshots showing the plugin in action
Diagrams explaining variable relationships
Example outputs
Image requirements:

Supported formats: PNG, JPG, GIF
Maximum 3 images total
Each image must be under 2MB
Force Bary
Don't want to write it yourself? Click the Force Bary button and let AI generate a handbook based on your plugin's structure.

It reads your:

Plugin name and description
Blocks and their triggers
Actions configured
Variables and switches
Then writes a draft handbook. Review and edit as needed - AI doesn't know all the nuances of your design.

Writing Tips
Be concise - People skim. Short paragraphs, bullet points, clear headers.

Use examples - Show, don't tell. "When you say 'hug', the plugin adds a warm response" is clearer than "The plugin responds to affectionate keywords."

Assume nothing - Don't assume users know what OOC means or how variables work. Brief explanations help.

Update it - Changed how your plugin works? Update the handbook too.

Template
Here's a structure you can copy:

## What This Does

[One paragraph overview]

## How to Use

[Step by step or explanation of triggers]

## Variables

- **variable_name** - What it tracks

## Tips

- Tip 1
- Tip 2

## Notes

[Any limitations or quirks]
Visibility
Your handbook is visible to anyone who can see your plugin. If the plugin is public, the handbook is public. Make sure there's nothing embarrassing in there.

Next up: Scripting Basics - Custom JavaScript for advanced logic

Scripting Basics
9/17
Scripts are for when the visual editor isn't enough. You want custom logic, conditional chains, math operations, or something the standard triggers and actions can't do. This is where you write actual JavaScript code.

Script Editor
Who Is This For?
Let's be honest: scripting isn't for everyone.

You should try scripting if:

You have some programming experience (even basic)
The visual triggers/actions feel limiting
You want complex conditional logic
You need mathematical calculations
You want to manipulate messages in ways the UI doesn't support
You probably don't need scripting if:

The visual editor does what you need
You've never written code before
Your plugin is simple (random triggers, basic messages)
That said, even non-programmers can learn. The syntax is straightforward, and there are examples below.

The Script Editor
Go to the Script tab in the Plugin Creator. You'll see a code editor with syntax highlighting, line numbers, and autocomplete.

Scripts run in addition to your configured triggers and actions. They don't replace the visual configuration - they extend it.

Editor Features
Syntax highlighting - Keywords, strings, numbers are color-coded
Autocomplete - Type a function name and suggestions appear
Error detection - Typos and syntax errors get underlined
Line numbers - Easier debugging
Search - Ctrl+F / Cmd+F to find text
Available Functions
These are the building blocks. Each function does one thing.

addMessage()
Adds a message to the conversation.

javascript
addMessage({
role: "system", // "user", "assistant", or "system"
content: "Hello!", // The message text
append: false // Optional: append to last message instead of new
})
Roles explained:

"user" - Appears as a user message
"assistant" - Appears as a bot message
"system" - Hidden instruction for the AI (gets injected at the start)
Append mode:
When append: true, the content is added to the last message of that role instead of creating a new one.

javascript
// Add system instruction
addMessage({ role: "system", content: "[The character feels happy]" })

// Add to the last user message
addMessage({ role: "user", content: "P.S. I forgot to mention...", append: true })
replaceMessage()
Find and replace text in messages.

javascript
replaceMessage({
find: "[PLAYER]", // Text to find
replace: "Alex", // Text to replace with
target: "user" // "user" or "bot"
})
Searches the last message of the target type and replaces all occurrences.

javascript
// Replace placeholder with variable value
replaceMessage({
find: "{{mood}}",
replace: variables.current_mood,
target: "bot"
})
setVariable()
Change a variable's value.

javascript
setVariable("health", 100) // Set to 100
setVariable("health", 10, "plus") // Add 10
setVariable("health", 5, "minus") // Subtract 5
setVariable("name", "Luna") // String variable
Operations:

"set" - Replace the value (default)
"plus" - Add to current value (numbers only)
"minus" - Subtract from current value (numbers only)
setSwitch()
Turn a switch on or off.

javascript
setSwitch("quest_started", true) // ON
setSwitch("quest_started", false) // OFF
getLastUserMessage()
Get the most recent user message.

javascript
const lastMsg = getLastUserMessage()
// Returns: { role: "user", content: "Hello there!" }

if (lastMsg) {
console.log(lastMsg.content)
}
getLastBotMessage()
Get the most recent assistant/bot message.

javascript
const lastBot = getLastBotMessage()
// Returns: { role: "assistant", content: "..." }
getMessageCount()
Get the total number of messages in the conversation.

javascript
const count = getMessageCount()
if (count > 10) {
addMessage({ role: "system", content: "[Story is progressing]" })
}
Global Variables
These are available in every script automatically.

Variable Type Description
messages Array All messages in the conversation
userMessage String Content of the last user message
lastUserIndex Number Index of the last user message
variables Object All plugin variables
switches Object All plugin switches
messageCount Number Total message count
Accessing variables and switches:

javascript
// Read a variable
const mood = variables.mood_level

// Read a switch
const questActive = switches.quest_started

// Use in conditions
if (variables.relationship >= 50 && switches.confession_available) {
addMessage({ role: "system", content: "[Unlock romantic dialogue]" })
}
Main Functions
Your script should define one of these entry point functions. The system calls it automatically.

processMessage()
The standard entry point.

javascript
function processMessage(messages, userMessage, variables) {
// Your logic here

if (userMessage.includes("hello")) {
addMessage({ role: "system", content: "[Greeting detected]" })
}

return messages
}
applyPlugin()
Alternative entry point with different parameters.

javascript
function applyPlugin(messages, lastUserIndex, variables) {
// Your logic here
return messages
}
getInjection()
If you only need to return a system message injection.

javascript
function getInjection() {
return "[Current mood: " + variables.mood + "]"
}
Console Logging
Debug your scripts with console output. Logs appear in the Test Chamber.

javascript
console.log("This is a log message")
console.warn("This is a warning")
console.error("This is an error")

// Debug values
console.log("Mood level:", variables.mood_level)
console.log("Message count:", getMessageCount())
Practical Examples
Example 1: Keyword Detection with Response
javascript
function processMessage(messages, userMessage, variables) {
const lowerMsg = userMessage.toLowerCase()

if (lowerMsg.includes("love") || lowerMsg.includes("adore")) {
setVariable("affection", 5, "plus")
addMessage({
role: "system",
content: "[Affectionate words detected. Increase warmth in response.]"
})
}

if (lowerMsg.includes("hate") || lowerMsg.includes("angry")) {
setVariable("affection", 10, "minus")
addMessage({
role: "system",
content: "[Negative emotions detected. Character becomes defensive.]"
})
}

return messages
}
Example 2: Random Event Generator
javascript
function processMessage(messages, userMessage, variables) {
// 5% chance for a random event
if (Math.random() < 0.05) {
const events = [
"[A sudden noise is heard in the distance.]",
"[The weather changes unexpectedly.]",
"[Someone new enters the scene.]",
"[An old memory surfaces.]"
]

    const randomEvent = events[Math.floor(Math.random() * events.length)]
    addMessage({ role: "system", content: randomEvent })
    console.log("Random event triggered:", randomEvent)

}

return messages
}
Example 3: Relationship Milestone System
javascript
function processMessage(messages, userMessage, variables) {
const affection = variables.affection || 0

// Check for milestone thresholds
if (affection >= 100 && !switches.milestone_100) {
setSwitch("milestone_100", true)
addMessage({
role: "system",
content: "[MILESTONE: Deep bond formed. Character now fully trusts the user.]"
})
}

if (affection >= 50 && !switches.milestone_50) {
setSwitch("milestone_50", true)
addMessage({
role: "system",
content: "[MILESTONE: Friendship established. Character opens up more.]"
})
}

if (affection <= -50 && !switches.milestone_negative) {
setSwitch("milestone_negative", true)
addMessage({
role: "system",
content: "[WARNING: Relationship severely damaged. Character becomes cold.]"
})
}

return messages
}
Example 4: Time-Based Atmosphere
javascript
function getInjection() {
const hour = new Date().getHours()

if (hour >= 6 && hour < 12) {
return "[Setting: Early morning. Soft light, fresh air, the day is beginning.]"
} else if (hour >= 12 && hour < 18) {
return "[Setting: Afternoon. Bright daylight, peak activity time.]"
} else if (hour >= 18 && hour < 22) {
return "[Setting: Evening. Golden hour fading, settling into night.]"
} else {
return "[Setting: Night. Darkness, quiet, perhaps mysterious.]"
}
}
Example 5: Message Counter Tracker
javascript
function processMessage(messages, userMessage, variables) {
const count = getMessageCount()

// Track in variable
setVariable("total_messages", count)

// Trigger events at certain counts
if (count === 10) {
addMessage({
role: "system",
content: "[10 messages exchanged. The conversation is warming up.]"
})
}

if (count === 50) {
addMessage({
role: "system",
content: "[50 messages! This is becoming a lengthy interaction.]"
})
}

if (count % 25 === 0 && count > 0) {
console.log("Checkpoint: " + count + " messages")
}

return messages
}
What You Can't Do
Scripts run in a secure sandbox. This keeps everyone safe, but it also means some things won't work:

No external connections - Your script can't reach the internet or load external files
No timers or delays - Everything runs synchronously
No infinite loops - The system stops scripts that run too long
Keep it reasonable - There are limits on how many variables and messages you can create
If your code does something it shouldn't, it simply won't run. You'll see an error message in the Test Chamber explaining what went wrong.

Tips for Writing Scripts
Start simple - Get one thing working before adding complexity.

Use console.log - Debug constantly. Print values, check conditions.

Test often - Use the Test Chamber after every change.

Handle edge cases - What if the variable doesn't exist? What if the message is empty?

javascript
// Safe variable access
const mood = variables.mood || "neutral"
const count = variables.count || 0
Keep it readable - Future you will thank present you.

Don't overcomplicate - If the visual editor can do it, use that instead.

Force Bary
Don't want to write code yourself? Click the Force Bary button and describe what you want. AI generates the script for you.

Example prompt: "A script that increases a relationship variable when the user says kind words, and decreases it when they're mean."

Review the generated code and tweak as needed.

Scripts are powerful but optional. Most plugins work fine without them. Use scripting when you need that extra control - not because it looks cool.

Next up: Regex Basics - Pattern matching for smarter keyword detection

Regex Basics
10/17
Regular expressions (regex) let you match patterns in text instead of exact words. Want to detect any greeting like "hi", "hello", "hey", or "hiya"? Regex can do that in one line.

What Is Regex?
A regular expression is a sequence of characters that defines a search pattern. Instead of searching for "hello" exactly, you can search for "any word starting with h and ending with o."

Think of it as a smarter version of find-and-replace.

Basic Syntax
In JavaScript, regex is written between forward slashes:

javascript
const pattern = /hello/
To test if a string matches:

javascript
const pattern = /hello/
pattern.test("hello world") // true
pattern.test("hi there") // false
Common Patterns
Match Multiple Words
Use the pipe | for "or":

javascript
const greetings = /hello|hi|hey|greetings/

greetings.test("hello there") // true
greetings.test("hey!") // true
greetings.test("goodbye") // false
Case Insensitive
Add i flag after the closing slash:

javascript
const pattern = /hello/i

pattern.test("Hello") // true
pattern.test("HELLO") // true
pattern.test("hElLo") // true
Match Any Character
The dot . matches any single character:

javascript
const pattern = /h.t/

pattern.test("hat") // true
pattern.test("hot") // true
pattern.test("hit") // true
pattern.test("heat") // false (two characters between h and t)
Match Multiple Characters

- - Zero or more of the previous character

* - One or more of the previous character
    ? - Zero or one of the previous character
    javascript
    /lo+l/.test("lol") // true
    /lo+l/.test("loool") // true
    /lo+l/.test("ll") // false (needs at least one 'o')

/colou?r/.test("color") // true
/colou?r/.test("colour") // true
Word Boundaries
Use \b to match whole words only:

javascript
const pattern = /\bhello\b/

pattern.test("hello world") // true
pattern.test("say hello") // true
pattern.test("helloworld") // false
pattern.test("sayhello") // false
Start and End
^ - Start of string
$ - End of string
javascript
/^hello/.test("hello world") // true (starts with hello)
/^hello/.test("say hello") // false

/world$/.test("hello world")  // true (ends with world)
/world$/.test("world peace") // false
Character Classes
Square brackets match any character inside them:

javascript
/[aeiou]/.test("hello") // true (contains a vowel)
/[0-9]/.test("room 42") // true (contains a digit)
/[A-Z]/.test("Hello") // true (contains uppercase)
Common shortcuts:

\d - Any digit (same as [0-9])
\w - Any word character (letters, digits, underscore)
\s - Any whitespace (space, tab, newline)
javascript
/\d+/.test("I have 3 cats") // true
/\w+/.test("hello") // true
Using Regex in Plugin Scripts
Keyword Detection
javascript
function processMessage(messages, userMessage, variables) {
const lowerMsg = userMessage.toLowerCase()

const lovePattern = /\b(love|adore|like|fancy)\b/i
const hatePattern = /\b(hate|dislike|loathe|despise)\b/i

if (lovePattern.test(lowerMsg)) {
setVariable("affection", 10, "plus")
addMessage({
role: "system",
content: "[Positive emotions detected]"
})
}

if (hatePattern.test(lowerMsg)) {
setVariable("affection", 10, "minus")
addMessage({
role: "system",
content: "[Negative emotions detected]"
})
}

return messages
}
Extracting Information
Use match() to extract matched text:

javascript
function processMessage(messages, userMessage, variables) {
const namePattern = /my name is (\w+)/i
const match = userMessage.match(namePattern)

if (match) {
const name = match[1]
setVariable("player_name", name)
console.log("Captured name:", name)
}

return messages
}
If user says "My name is Alex", the variable player_name gets set to "Alex".

Number Detection
javascript
function processMessage(messages, userMessage, variables) {
const numberPattern = /\b(\d+)\b/
const match = userMessage.match(numberPattern)

if (match) {
const num = parseInt(match[1])
setVariable("last_number", num)

    if (num > 100) {
      addMessage({
        role: "system",
        content: "[Large number mentioned: " + num + "]"
      })
    }

}

return messages
}
Action Commands
Detect commands like "/attack goblin" or "/go north":

javascript
function processMessage(messages, userMessage, variables) {
const attackPattern = /^\/attack\s+(\w+)/i
const goPattern = /^\/go\s+(north|south|east|west)/i

const attackMatch = userMessage.match(attackPattern)
if (attackMatch) {
const target = attackMatch[1]
addMessage({
role: "system",
content: "[Combat initiated against: " + target + "]"
})
}

const goMatch = userMessage.match(goPattern)
if (goMatch) {
const direction = goMatch[1]
setVariable("location", direction)
addMessage({
role: "system",
content: "[Moving " + direction + "]"
})
}

return messages
}
Regex Cheat Sheet
Pattern Matches
. Any single character
\d Any digit
\w Any word character
\s Any whitespace
\b Word boundary
^ Start of string
$ End of string
[abc] Any of a, b, or c
[^abc] Not a, b, or c
`a	b`
a\* Zero or more a's
a+ One or more a's
a? Zero or one a
a{3} Exactly 3 a's
a{2,4} 2 to 4 a's
(abc) Capture group
Tips
Start simple - Get a basic pattern working before adding complexity

Test your patterns - Use console.log(pattern.test(userMessage)) to debug

Use the i flag - Most of the time you want case-insensitive matching

Word boundaries matter - Without \b, "hello" matches "helloworld"

Escape special characters - To match a literal dot, use \.

javascript
/3\.14/.test("pi is 3.14") // true
/3.14/.test("pi is 3x14") // also true (. matches any char)
Don't overcomplicate - If you just need exact words, use includes() instead
javascript
// Simple approach - often good enough
if (userMessage.toLowerCase().includes("hello")) { ... }

// Regex - when you need pattern flexibility
if (/\b(hello|hi|hey)\b/i.test(userMessage)) { ... }
Regex takes practice. Start with simple patterns and build up. When in doubt, test in the Test Chamber.

Next up: Testing Your Plugin - Make sure everything works

Testing Your Plugin
11/17
The Test Chamber is where you make sure your plugin actually works before unleashing it on the world. It's a mini chat environment where you can see exactly what your triggers detect and what your actions do.

Test Chamber
What Is It?
A simulated chat window with Bary (our mascot) as the bot. You type messages, the plugin processes them, and you see the results in real-time. Variables update, actions fire, messages get modified - all visible.

Think of it as a sandbox. Nothing you do here affects anything outside the creator.

AI Test Suggestions
When you open the Test Chamber with an empty chat, the system analyzes your plugin's triggers and generates 3 smart starter messages as clickable bubbles.

These suggestions are tailored to your plugin's logic. If your plugin triggers on keywords like "fight" and "attack", the suggestions will include messages containing those words. If it uses message count triggers, you'll get messages designed to exercise that flow.

Just tap a suggestion to send it immediately. No need to think up test inputs yourself - the AI already figured out what would trigger your plugin.

The Interface
Header Bar
Shows your plugin stats at a glance:

Number of triggers
Trigger logic (AND/OR)
Number of actions
Number of variables
Also has a Show/Hide Effects toggle. More on that below.

Variable & Switch Display
If your plugin has variables or switches, they appear at the top of the chat. You can watch them change in real-time as you test.

Variables show as: variableName: value
Switches show as: switchName: ON/OFF
Chat Area
Where the conversation happens. You'll see:

Your messages (blue, right-aligned)
Bary's responses (gray, left-aligned)
Plugin-generated messages (color-coded when effects are visible)
Input Field
Type here, hit Enter or click Send. Your message goes through the plugin processing before Bary responds.

Show/Hide Effects
The Show Effects button is your x-ray vision.

Effects ON:

Plugin-generated messages are highlighted in purple
Modified messages show what changed
System messages appear (yellow, dashed border)
Appended text is clearly marked
You see exactly what the plugin is doing
Effects OFF:

Clean view of the conversation
No highlighting or markers
What users would actually see
Toggle between them to understand both perspectives.

What Gets Shown
Color Coding
Color What it means
Purple border Message was generated by the plugin
Green border Bot message was modified by plugin
Blue border User message was modified by plugin
Yellow dashed System message (hidden from AI context)
Red Error occurred
Modification Details
When a message is modified, you see:

The original text (struck through)
The new text
Whether it was replaced or appended
This helps debug "why is my replace action not working" situations.

Triggered Actions Log
After each message, if actions fired, you see a summary:

Which action types triggered
What they did
Script Logs
If your plugin uses advanced scripting (the Script tab), there's a collapsible Script Logs section.

Shows:

Console.log outputs from your script
Errors (in red)
Warnings (in yellow)
Success messages (in green)
Each log entry has a timestamp. Useful for debugging complex scripts.

Testing Workflow

1. Basic Function Test
   Start simple. Does the plugin do anything?

Send a message that should trigger your plugin
Check if the expected action happened
If nothing happens, check your trigger conditions 2. Trigger Testing
For each trigger type:

Random triggers: Send many messages. With 5% chance, you should see it trigger roughly 1 in 20 times. Keep spamming until it hits.

Keyword triggers: Type the exact keywords. Check different cases (KEYWORD, keyword, Keyword) to verify case-insensitivity.

Variable triggers: Watch the variable display. Manually work the values up/down to hit your threshold.

Time triggers: Check your system clock. For testing time-based triggers outside their window, you may need to temporarily change the trigger settings.

3. Action Verification
   For each action:

Add Message: Does it appear? In the right format? As the right role?

Replace: Type text containing your find string. Does it get replaced?

Set Variable: Watch the variable display. Does the value change correctly?

Set Switch: Watch the switch display. Does it flip?

4. Edge Cases
   Think about weird scenarios:

What if the variable goes negative?
What if two triggers fire at once?
What if the keyword appears twice in one message?
Test the boundaries of your logic.

Debugging Tips
"My trigger never fires"
Check trigger type matches your test
For keywords, make sure spelling is exact
For random, keep trying (5% means 1 in 20)
Check the trigger logic - AND requires ALL conditions
"Action fires but nothing visible"
System messages are hidden by default
Turn on Show Effects to see them
Check the message role setting
"Variable doesn't change"
Make sure variable name matches exactly
Check the operation (Set vs Plus vs Minus)
Look at the variable display after sending
"Replace doesn't work"
Check the Find text is exact (case-sensitive)
Make sure target message role is correct
The text must exist in a message to be replaced
Limitations
The Test Chamber is a simulation. A few things to know:

Session-based: Variables reset when you refresh or leave the creator.

Simplified AI: Bary gives generic responses. Real AI interactions may differ.

Single plugin: Only tests the current plugin. Multi-plugin interactions aren't simulated.

No persistence: Nothing is saved. It's purely for testing.

Security Checks
If your script contains suspicious code, the Test Chamber will block it. You'll see a security warning explaining why.

This protects both you and future users of your plugin. If you believe it's a false positive, contact support.

Next up: Saving & Sharing - Publishing your creation

Saving & Sharing
12/17
You've built your plugin. Tested it. Now what? Time to save it and decide who gets to see your creation.

Save Button
Saving Options
Look at the bottom of the creator. You'll see action buttons.

Save as Draft
Saves your work privately. Nobody else can see it. Perfect for:

Work in progress
Experimental ideas you're not sure about
Plugins you want to keep personal
Drafts appear in your Dashboard under "My Plugins" with a draft badge. You can return and edit them anytime.

Publish
Makes your plugin live. Depending on your visibility settings:

Public: Shows in the Plugin Library for everyone
Private: Only you can see and use it
Publishing generates a unique code for your plugin. This code can be shared, and others can find your plugin through search if it's public.

The Save Process
When you click Save or Publish:

Validation - System checks for required fields (name, category, at least one block)
Security scan - Script code is checked for suspicious patterns
Upload - Cover image and data are uploaded
Confirmation - Success toast appears with your plugin code
If something's missing, you'll get an error telling you what to fix.

Required Fields
Before you can publish:

Name - Can't be empty or "Untitled Plugin"
Category - Must select one
At least one block - Need something to actually do
Everything else is optional but recommended.

Visibility Settings Recap
In the Metadata tab, you configured:

Setting Effect
Public Appears in library search and browse
Private Only you see it
Allow Downloads Others can copy your plugin
Show Detailed View Others can inspect triggers/actions
These take effect immediately on save.

After Publishing
Your Plugin in the Library
If public, your plugin now appears in:

Library browse page (Plugin section)
Search results (if terms match)
Your profile's published plugins
The Plugin Code
Every plugin gets a unique code like PLG-ABC123. Users can:

Search by this code directly
Share the code with others
Use it to quickly find your specific plugin
Editing Published Plugins
Made a mistake? Want to add features? Click your plugin in the library or dashboard to edit.

Changes save immediately. No need to "re-publish" - just save and the live version updates.

Warning: If you break something, it breaks for everyone using it. Test before saving updates.

Drafts vs Published
Feature Draft Published
Visible to others No If public
Has plugin code No Yes
Can be used in chats No Yes
Counts toward limits No Yes
Appears in your dashboard Yes Yes
Managing Your Plugins
From your Dashboard > My Plugins:

See all your drafts and published plugins
Edit any of them
Delete ones you don't want anymore
Check download/usage stats
Sharing Your Work
Want to tell people about your plugin?

Share the code: "Try my weather plugin: PLG-ABC123"

Direct link: Each plugin has a detail page URL you can copy

Library visibility: Make it public with a good name, description, and tags for discoverability

Deleting Plugins
In the Metadata tab, scroll to the bottom. The delete button is there.

Important: Deletion is permanent. No undo. No recovery. The plugin is gone.

For published plugins:

Removes from library immediately
People who downloaded it keep their copy
The plugin code becomes invalid
For drafts:

Just removes the draft
No external impact
Tips for Success
Write a good description - People need to know what they're getting

Choose accurate tags - Helps with discoverability

Add a cover image - Visual appeal matters

Fill out the handbook - Reduces confusion and support requests

Test before publishing - Broken plugins get bad ratings

Update responsibly - Don't break things for existing users

Version History
Every time you save your plugin, the creator takes a snapshot. You can browse and restore up to 10 previous versions from the editor header.

Click the version indicator at the top of the creator to open the Version History panel. Each snapshot shows what changed and when. If an update went wrong, just restore a previous version and you're back on track.

Plugin Changelogs
When updating a published plugin, you can optionally write a changelog entry describing what changed. Users who view your plugin in the library see these entries with version numbers and dates.

How it works:

After making changes, click Save/Update
A dialog asks if you want to describe the changes
Write a short note (what you added, fixed, or changed)
The entry is stored with a version number
Good changelogs build trust. Users want to know what changed before updating.

Finetuning (Forking)
Other users can finetune your plugin if you allow downloads. This creates a draft copy under their account while crediting you as the original creator.

See the full guide: Finetuning Plugins

You made it. Your plugin is out there. Time to see how people use it - or move on to your next creation.

Next up: The Nexus - Visualize how your plugin blocks connect

The Nexus
13/17
The Nexus is a visual dashboard that shows you the full picture of your plugin. Instead of jumping between blocks to understand how they connect, the Nexus lays everything out as a pipeline flow.

What You See
Open the Nexus tab in the Plugin Creator. You'll see:

Header Stats
At the top, quick badges showing:

Block count - How many blocks your plugin has
Variable count - Active variables
Switch count - Active switches
AI Summary
The Nexus automatically generates an AI-powered summary of your plugin's logic. It reads through all your triggers, actions, and state, then explains what the plugin actually does in plain language. Useful for sanity-checking complex plugins or explaining your plugin to others.

State Bar
If your plugin uses variables or switches, the State Bar shows them as interactive tags. Click or hover over a tag to highlight every block that reads or writes that state. Instantly see which blocks depend on each other.

Block Cards
Each block appears as a card in the pipeline, showing:

Triggers - What activates this block (with icons for each trigger type)
Actions - What happens when triggered
Script indicator - Whether the block has custom code
State connections - Which variables and switches this block touches
Cards flow top to bottom, left to right, giving you a natural reading order of your plugin's execution.

How to Use It
Understanding Flow
The Nexus is about connections. When Block A sets a variable and Block B triggers on that variable, you'll see the relationship. This is especially helpful when you have 5+ blocks and can't keep the logic straight in your head.

Finding Issues
If a variable is written by one block but never read by another, something might be wrong. If two blocks both try to set the same switch, you might have a conflict. The Nexus makes these patterns visible at a glance.

AI Insights
The AI analysis doesn't just summarize - it points out potential issues. Maybe a trigger can never fire because the variable it watches is never set. Maybe two blocks would conflict in certain conditions. The AI flags these things so you can decide whether to fix them.

When to Check the Nexus
After building a plugin with 3+ blocks
When something isn't firing and you can't figure out why
Before publishing, as a final sanity check
When refactoring an existing plugin to make sure you didn't break connections
The Nexus is read-only. It doesn't change your plugin - it just helps you understand it. Make your edits in the block editors, then come back to the Nexus to verify the big picture.

Next up: Block Marketplace - Browse and share reusable block packs
Block Marketplace
14/17
The Block Marketplace is where plugin creators share pre-built blocks. Instead of building every trigger-action combination from scratch, you can browse the marketplace and import ready-made blocks into your plugin.

What Are Block Packs?
A block pack is a collection of one or more plugin blocks (triggers + actions) bundled together. Think of them as building blocks you can drop into any plugin.

Examples:

A "Relationship Tracker" pack with variable triggers and affection-tracking actions
A "Weather System" pack with random triggers and atmospheric messages
A "Combat Mechanics" pack with keyword triggers, HP variables, and damage calculations
Each pack has a name, description, category, tags, and version history.

Browsing the Marketplace
Open the Block Marketplace from the Plugin Creator sidebar.

Search and Filter
Search bar - Find packs by name or keyword
Categories - Filter by type: Tracker, Statusboard, UI Element, Dialogue, Logic & Flow, Combat, Environment, NPC Behavior, Formatting, Random Events
Sort - Popular, Newest, Recently Updated, A-Z
Tags - Click tags to filter by specific topics
Pack Cards
Each pack shows:

Name and author
Category badge
Block count
Favorites and import count
Click a card to see the full details.

Pack Detail View
The detail panel shows everything about a pack:

Left Side
Full description
Author info and badges
Stats (favorites, imports, views)
Changelog with version history
Right Side
Individual block previews
Each block shows its triggers and actions
You can inspect exactly what you're importing
Actions
Import - Adds the blocks to your current plugin
Favorite - Save for quick access later
Importing Blocks
When you click Import, all blocks from the pack are added to your current plugin. Variables and switches that the blocks need are created automatically.

After importing, you can modify the blocks however you want. They're yours now - edit triggers, change actions, adjust values. The imported blocks are independent copies.

Publishing Your Own Packs
Have blocks other creators might find useful? Publish them.

How to Publish
Open the Block Marketplace in the Plugin Creator
Click Upload Blocks in the "My Packs" tab
Select which blocks from your current plugin to include
Fill in metadata:
Name - What the pack is called
Description - What the blocks do
Category - Best fit from the list
Tags - Search keywords
Review the guidelines
Publish
Managing Published Packs
In the My Packs tab, you can:

Edit published packs (update metadata, add/remove blocks)
Push versioned updates with auto-generated changelogs
Unpublish packs you no longer want shared
Version Tracking
Every time you update a published pack, it gets a new version number. The changelog automatically tracks what blocks were added, removed, or modified. Users can see this history in the detail view.

Tips
Name packs clearly - "Combat HP System" tells people what they get. "Cool Stuff" doesn't.

Include all dependencies - If your blocks rely on specific variables, make sure they're included.

Test before publishing - Import your own pack into a fresh plugin to verify it works standalone.

Update responsibly - People depend on your packs. Don't break existing functionality in updates.

Next up: Finetuning Plugins - Fork and customize existing plugins

Finetuning Plugins
15/17
Finetuning lets you take someone else's public plugin and create your own version of it. Same idea as forking a project - you get a personal copy you can modify however you want, while the original stays untouched.

How It Works
For Users (Finetuning a Plugin)
Find a plugin in the library that you like
Open its detail modal
Click the Finetune button in the footer (next to Download and Use)
A draft copy is created in your Plugin Creator
Edit whatever you want - triggers, actions, variables, name, everything
Save as your own plugin
The finetune button only appears if:

You're logged in
The plugin allows downloads
You're not the original creator
What Gets Copied
Everything. All blocks, triggers, actions, variables, switches, metadata, handbook content. It's a complete clone loaded as a draft in your creator.

Attribution
Your finetuned plugin automatically shows a "Finetune of [Original Plugin] by [Original Author]" banner. This stays visible in your creator and in the library if you publish. Credit where credit is due.

The original plugin's detail page also shows a fork count - how many times it's been finetuned by the community.

For Creators (Your Plugins Being Finetuned)
When someone finetunes your plugin, you get a notification. That's it - your original plugin is completely unaffected.

Controlling Access
Finetuning requires that your plugin has Allow Downloads enabled in the Metadata settings. If you turn downloads off, nobody can finetune it either.

Fork Count
Your plugin card and detail view show how many times it's been finetuned. A high fork count is a sign that people find your work worth building on.

When to Finetune vs. Build from Scratch
Finetune when:

A plugin does 80% of what you want and you just need to tweak it
You want to learn how someone built something
You want a starting point for a similar concept
Build from scratch when:

Your idea is fundamentally different
You want full creative ownership
The plugin you found is overly complex for your needs
Etiquette
Finetuning is a feature, not a loophole. The attribution system exists for a reason.

Don't publish a finetune with zero changes just to claim it as your own
If you make significant improvements, great - that's the whole point
The original creator's name stays on the attribution. Respect it.
Ready to practice? How to build: Tracker Plugin - Step-by-step hands-on tutorial

How to build: Tracker Plugin
16/17
Time to put everything together. In this guide, we'll build a simple relationship tracker from scratch. You'll learn by doing - follow along step by step.

What We're Building
A plugin that:

Tracks "affection" points (a number)
Remembers if a "first meeting" happened (a switch)
Reacts when the user says nice or mean things
Tells the AI how the character should behave based on affection level
Simple. Effective. A foundation you can expand later.

Step 1: Create a New Plugin
Go to Lore Workshop in the sidebar
Click Plugin Creator
You're now in the Plugin Creator. The Welcome Modal appears - click Start from Scratch.

Step 2: Set Up Metadata
Click the Metadata tab on the left.

Fill in:

Name: Affection Tracker
Description: Tracks relationship points based on user messages
Category: Utility (or whatever fits)
Visibility: Private (for now)
Leave everything else as default. We'll add a cover image later.

Step 3: Create Variables
Click the Variables tab.

Add the Affection Variable
Click Add Variable
Fill in:
Name: affection
Type: Number
Default Value: 50
This starts the relationship at neutral (50 out of 100).

Add a Name Variable (Optional)
Click Add Variable again
Fill in:
Name: player_name
Type: Text
Default Value: User
This lets us personalize messages later.

Step 4: Create Switches
Still in the Variables tab, scroll down to Switches.

Add the First Meeting Switch
Click Add Switch
Fill in:
Name: first_meeting_done
Default: OFF
This tracks whether the introduction has happened.

Your Variables tab should now show:

affection: 50 (Number)
player_name: User (Text)
first_meeting_done: OFF (Switch)
Step 5: Build Block 1 - First Meeting
Click the Blocks tab. You'll see "Block 1" already there.

Name the Block
Click on "Block 1" to expand it. Rename it to First Meeting.

Set Up the Trigger
Under Triggers, click Add Trigger
Choose Switch Trigger
Set:
Switch: first_meeting_done
Condition: is OFF
This trigger fires when the switch is OFF (meaning they haven't met yet).

Set Up the Actions
Under Actions, click Add Action

Choose Add Message

Fill in:

Role: System
Content:
[OOC: This is {{user}}'s first time meeting {{char}}. {{char}} should introduce themselves warmly and make a good first impression. After this exchange, they will remember each other.]
Click Add Action again

Choose Set Switch

Set:

Switch: first_meeting_done
Value: ON
Now when they first meet:

The AI gets instructions for an introduction
The switch flips to ON so this doesn't repeat
Step 6: Build Block 2 - Nice Words
Click Add Block to create a new block. Name it Nice Words.

Set Up the Trigger
Add a Keyword Trigger
Set:
Keywords: love, adore, like, appreciate, thank, sweet, kind, cute, amazing
Target: User message
Match: Any keyword
Set Up the Actions
Add an Add Message action:

Role: System
Position: Append to last user message
Content:
[OOC: {{user}} said something kind. {{char}} feels appreciated and warms up slightly.]
Add a Set Variable action:

Variable: affection
Operation: Plus
Value: 5
Each nice word adds 5 affection points.

Step 7: Build Block 3 - Mean Words
Add another block. Name it Mean Words.

Set Up the Trigger
Add a Keyword Trigger
Set:
Keywords: hate, stupid, ugly, annoying, boring, shut up, go away, idiot
Target: User message
Match: Any keyword
Set Up the Actions
Add an Add Message action:

Role: System
Position: Append to last user message
Content:
[OOC: {{user}} said something hurtful. {{char}} feels hurt and becomes slightly more distant.]
Add a Set Variable action:

Variable: affection
Operation: Minus
Value: 10
Mean words cost 10 points - being mean hurts more than being nice helps.

Step 8: Build Block 4 - Affection Levels
This is where it gets interesting. We'll create different AI behaviors based on affection level.

Add a new block. Name it Low Affection Warning.

Set Up the Trigger
Add a Variable Trigger
Set:
Variable: affection
Condition: Less than
Value: 25
Set Up the Action
Add an Add Message action:
Role: System
Position: Append to last user message
Content:
[OOC: Affection is very low ({{affection}}/100). {{char}} is cold and distant. Short responses, avoids eye contact, clearly uncomfortable. {{char}} might leave if things don't improve.]
Step 9: Build Block 5 - High Affection
Add another block. Name it High Affection Bonus.

Set Up the Trigger
Add a Variable Trigger
Set:
Variable: affection
Condition: Greater than
Value: 75
Set Up the Action
Add an Add Message action:
Role: System
Position: Append to last user message
Content:
[OOC: Affection is high ({{affection}}/100). {{char}} is warm and affectionate. They smile often, lean in when talking, and seem genuinely happy to be with {{user}}. Occasional subtle flirting is appropriate.]
Step 10: Test It
Click the Test tab to open the Test Chamber.

Test 1: First Meeting
Type: "Hello there!"

Expected:

System message about first meeting appears
Switch first_meeting_done changes to ON
Test 2: Repeat Message
Type: "Hello again!"

Expected:

No first meeting message (switch is now ON)
Affection stays at 50
Test 3: Nice Words
Type: "You're really sweet and kind!"

Expected:

"Nice words" action triggers
Affection increases (50 → 55 → 60 if "sweet" and "kind" both matched)
Test 4: Mean Words
Type: "That was stupid and boring."

Expected:

"Mean words" action triggers
Affection decreases by 20 (two mean words)
Test 5: Low Affection
Keep saying mean things until affection drops below 25, then send any message.

Expected:

Low affection warning appears
AI should respond coldly
Test 6: High Affection
Reset and say nice things until affection is above 75.

Expected:

High affection bonus appears
AI should respond warmly
Step 11: Add Polish (Optional)
Message Pools
Go back to the "Nice Words" block. Instead of one message, use a pool:

Edit the Add Message action
Enable Message Pool
Add variations:
[OOC: {{char}} feels a warm flutter at the kind words.]
[OOC: The compliment makes {{char}} smile genuinely.]
[OOC: {{char}} appreciates the kindness and feels closer to {{user}}.]
Now each nice interaction feels different.

Caps on Affection
You might want to prevent affection from going below 0 or above 100. Add two more blocks:

Cap at Zero:

Trigger: Variable affection less than 0
Action: Set Variable affection to 0
Cap at 100:

Trigger: Variable affection greater than 100
Action: Set Variable affection to 100
Step 12: Save Your Plugin
Click Save at the bottom
Choose Save as Draft (to keep testing) or Publish (to use it)
Congratulations! You built a working relationship tracker.

The Complete Structure
Here's what you built:

VARIABLES:

- affection (Number, starts at 50)
- player_name (Text, starts as "User")

SWITCHES:

- first_meeting_done (starts OFF)

BLOCKS:

1. First Meeting
   - Trigger: first_meeting_done is OFF
   - Actions: Introduction message, set switch ON

2. Nice Words
   - Trigger: Keywords (love, kind, sweet, etc.)
   - Actions: Warm message, affection +5

3. Mean Words
   - Trigger: Keywords (hate, stupid, etc.)
   - Actions: Hurt message, affection -10

4. Low Affection Warning
   - Trigger: affection < 25
   - Action: Cold behavior instruction

5. High Affection Bonus
   - Trigger: affection > 75
   - Action: Warm behavior instruction

6. Cap at Zero (optional)
   - Trigger: affection < 0
   - Action: Set affection to 0

7. Cap at 100 (optional)
   - Trigger: affection > 100
   - Action: Set affection to 100
     What You Learned
     Variables store numbers and text that change over time
     Switches track yes/no states (has something happened?)
     Keyword Triggers detect specific words
     Variable Triggers react to number thresholds
     Switch Triggers check on/off states
     Add Message with Append puts instructions right where AI pays attention
     OOC format tells AI "this is an instruction, not story"
     Next Steps
     Now that you have a basic tracker, you can expand it:

Add more emotion keywords
Create milestone events (first hug at 60 affection, etc.)
Add time-based triggers (character is sleepy at night)
Track multiple relationships with different variables
Add a "reset" keyword that sets everything back to default
The foundation is there. Build on it.

You did it. Your first real plugin. Ready for more? How to build: Status Panel - AI-controlled dynamic displays

How to build: Status Panel
17/17
Want a status panel showing mood, location, or stats that updates every message? No scripts needed. Just tell the AI to do it.

What We're Building
A panel at the start of every AI response:

┌─────────────────────────┐
│ Mood: Happy │
│ Energy: 75% │
│ Location: Coffee Shop │
└─────────────────────────┘

_She smiled and waved._
The AI fills in the values based on what's happening in the story. That's it.

Step 1: Create the Plugin
Go to Lore Workshop in the sidebar
Click Plugin Creator
Click Start from Scratch
Step 2: Metadata
Name: Status Panel
Description: Shows character status at start of each response
Category: Utility
Step 3: Create One Block
Click the Blocks tab.

Trigger
Click Add Trigger
Choose Always
Action
Click Add Action
Choose Add Message
Set:
Role: System
Content:
Always begin your response with a status panel showing {{char}}'s current state. Use this exact format:

┌─────────────────────────┐
│ Mood: [current mood]
│ Energy: [0-100]%
│ Location: [where they are]
└─────────────────────────┘

Update the values based on what's happening in the story. After the panel, continue with your normal response.

Example moods: Happy, Sad, Anxious, Excited, Tired, Annoyed, Calm, Nervous, Angry, Content
Step 4: Done
That's it. Save your plugin.

The AI reads the instruction, outputs the panel with current values, then writes the response. Every message. Automatically updated based on story context.

Test It
Open the Test tab and send a few messages. Watch the panel change as the conversation evolves.

Message 1: "Good morning!"

┌─────────────────────────┐
│ Mood: Content
│ Energy: 80%
│ Location: Bedroom
└─────────────────────────┘

_She stretches and yawns._ "Morning..."
Message 2: "Let's go get coffee!"

┌─────────────────────────┐
│ Mood: Excited
│ Energy: 85%
│ Location: Walking to café
└─────────────────────────┘

_Her eyes light up._ "Yes! I need caffeine."
Message 3: "Actually, the café is closed."

┌─────────────────────────┐
│ Mood: Disappointed
│ Energy: 70%
│ Location: Outside café
└─────────────────────────┘

_She sighs._ "Of course it is..."
The AI tracks everything naturally.

Customization
Different Panel Styles
Minimal:

[ Mood | Energy | Location ]
RPG Style:

━━━━━━━━━━━━━━━━━━━━
STATUS
♥ HP: [health]
⚡ MP: [mana]
📍 [location]
━━━━━━━━━━━━━━━━━━━━
Simple:

_[mood] | [location]_
Just change the template in your system message.

Add More Stats
┌─────────────────────────┐
│ Mood: [mood]
│ Energy: [0-100]%
│ Hunger: [0-100]%
│ Location: [place]
│ Time: [morning/afternoon/evening/night]
│ Weather: [current weather]
│ Companion: [who's with them]
└─────────────────────────┘
For RPG/Game Feel
┌─────────────────────────┐
│ HP: [current]/[max]
│ Gold: [amount]
│ Quest: [active quest or "None"]
│ Party: [companions]
└─────────────────────────┘
Tips
Keep it short - 3-5 stats max, otherwise it clutters responses

Be specific about format - AI follows templates better than vague instructions

Give examples - Showing example moods/values helps AI pick appropriate ones

Test with your model - Some models follow formatting better than others

Position matters - "Begin your response with..." works better than "Include somewhere..."

Why This Works
The AI:

Reads your instruction every message
Understands story context
Fills in appropriate values
Maintains consistency across messages
No variables. No scripts. No parsing. The AI is smart enough to track state on its own.

When to Use Variables Instead
Use actual plugin variables when you need:

Exact number tracking (affection points that add up precisely)
Triggers based on values (do X when health < 20)
Persistence across sessions
User-controlled changes
For purely cosmetic status displays? Let the AI handle it.

Simple problems deserve simple solutions. Don't over-engineer.
