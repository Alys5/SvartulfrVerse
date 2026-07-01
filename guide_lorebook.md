What is a Lorebook?
1/8
The AI's cheat sheet
Imagine you're roleplaying in a fantasy world. You mention "the capital city" and suddenly the AI starts making stuff up - wrong names, contradicting what you established before, total chaos.

That's because the AI doesn't actually remember your world. It's just guessing.

A lorebook fixes this. It's basically a cheat sheet that automatically feeds the AI information whenever specific words come up in your chat.

How it works
Let's say you have a lorebook for your fantasy kingdom. You've written an entry about "Castle Ironhold" with all the details - where it is, what it looks like, who lives there, its history.

Now when you type "let's visit the castle" in your roleplay, the system sees the word "castle", checks your lorebook, finds the Castle Ironhold entry, and secretly sends all that info to the AI.

The AI now knows everything about Castle Ironhold without you having to explain it. Every. Single. Time.

It's like a wiki that reads itself
Think of Wikipedia, but instead of you having to look things up and copy-paste them into your chat, the system does it automatically based on keywords.

You write the entries once. The system handles the rest forever.

What goes in a lorebook?
Pretty much anything your AI needs to know:

Characters - Who they are, how they look, their personality, relationships, abilities

Places - Locations, buildings, cities, regions, what's there, what happened there

Items - Weapons, artifacts, important objects and their properties

History - Past events, wars, founding stories, important moments

Rules - How magic works, laws of your world, social systems

Lore - Anything that makes your world unique

The magic of keywords
Each entry has "keys" - trigger words that activate it. When any of these words appear in your conversation, boom, that entry gets injected into the AI's context.

Entry: Gandalf
Keys: "Gandalf", "grey wizard", "Mithrandir"
Content: detailed description of Gandalf

Now whether you say "Gandalf appeared" or "the grey wizard stood there" or "Mithrandir spoke" - the AI gets the same information.

Why this matters
Without lorebooks, you'd have to:

Remind the AI of facts constantly
Copy-paste descriptions into every conversation
Watch the AI contradict itself because it forgot
With lorebooks:

Write once, use forever
AI stays consistent across sessions
Your world actually feels like a world
Not just for worldbuilders
You don't need to create your own lorebook. The community has thousands of them - from popular fandoms like Harry Potter or Game of Thrones to completely original worlds.

Browse the library, find one you like, and your AI suddenly knows that entire universe.

Next, let's talk about something important: why you shouldn't go crazy adding everything as "always active."

Tokens and Efficiency
2/8
The token problem
Here's something nobody tells you: every word you send to an AI costs tokens. And tokens cost money.

When a lorebook entry triggers, its entire content gets added to your request. More content = more tokens = more expensive = slower responses.

Why "Always Active" is dangerous
Each entry has an option called "Always Active" (also called "constant"). When enabled, that entry gets included in every single message you send. No keywords needed.

Sounds convenient, right?

Here's the problem: if you have 50 entries set to Always Active, you're sending 50 entries worth of text with every. single. message. Even if you're just saying "hello."

Bad idea: 340 entries all set to constant because "I might need any of them"

Good idea: 2-3 core world rules as constant, everything else triggered by keywords

How to think about it
Ask yourself: "Does the AI need to know this ALL the time, or only when it's relevant?"

Always Active makes sense for:

Core world rules that affect everything ("magic doesn't exist in this world")
The main character's fundamental personality
A setting rule that changes how all conversations work
Keywords make sense for:

Specific characters (only needed when mentioned)
Locations (only needed when visiting)
Historical events (only needed when relevant)
Items (only needed when used)
The math
Let's say each entry averages 200 words (~50 tokens).

5 always-active entries = 250 tokens every message
50 always-active entries = 2,500 tokens every message
150 always-active entries = 7,500 tokens every message
That 7,500 tokens is eating into your context window before you've even said anything. Plus you're paying for it with every message.

Smart triggering
The whole point of keywords is that entries only appear when relevant. The system is smart enough to find them.

User says "the king" → King entry triggers
User says "let's go to the castle" → Castle entry triggers
User says "nice weather" → Nothing triggers (no tokens wasted)

The sweet spot
Most experienced lorebook creators follow this pattern:

0-5 constant entries - Only absolute essentials
Everything else - Keyword triggered
Your lorebook can have 150 entries. That doesn't mean 150 should be active at once.

Order matters too
Entries have an "order" value (1-100). When multiple entries trigger, higher order values get priority.

If your context can only fit 15 entries and 20 triggered, the system picks the ones with higher order values.

Set your most important entries to order 80-100.
Set background fluff to order 20-40.

Now that you understand the theory, let's actually build one.

The Lorebook Creator
3/8
Welcome to the Forge
The Lorebook Creator is where you build, edit, and manage your lorebooks. You can find it at Lore Workshop → Lorebook Creator or directly at /lorebook-creator.

The Lorebook Creator workspace
The layout
The creator has three main areas:

Header bar (top)
This is your control center:

New - Start a fresh lorebook
Load - Open one of your existing lorebooks or drafts
Import - Upload a lorebook file (JSON format)
Export - Download your lorebook
Save - Publish or update your lorebook
You'll also see a token counter showing how much context your lorebook uses.

Sidebar (left)
Your entry list lives here:

Search bar to find entries
Filter by category
Sort options
All your entries listed with their names and status icons
"Add Entry" button at the bottom
Click any entry to edit it in the main panel.

Main panel (center)
This changes based on what you're doing:

Settings tab - Edit lorebook metadata (title, description, cover)
Entry tab - Edit the selected entry
Pinboard tab - Visual organization board
Preview tab - See how your lorebook looks to others
Test tab - Chat with Bary to test your entries
Two ways to start
When you first open the creator, you'll see a welcome modal with three options:

Guided Forge - Let Bary help you generate entries
Manual Forge - Build everything yourself
Resume Creation - Load an existing lorebook
We'll cover the welcome modal in detail next.

Autosave
The creator autosaves your work regularly. If your browser crashes or you accidentally close the tab, your progress isn't lost.

When you return, you'll see a prompt asking if you want to restore your autosaved work.

Drafts vs Published
Drafts are private works-in-progress. Only you can see them. They're stored for 30 days.

Published lorebooks have a shareable code (like A3B5C7D9) and can be:

Private (only you can use them)
Public (anyone can find and use them)
You can convert between drafts and published at any time.

The workflow
Most people follow this pattern:

Start - New or load existing
Metadata first - Set title, description, category, tags
Add entries - Build your world piece by piece
Test - Use the test chat to verify entries trigger correctly
Save - Publish when ready
Let's look at that welcome modal more closely.

The Welcome Modal
4/8
First steps
When you open the Lorebook Creator for the first time (or click "New"), you'll see the welcome modal. It gives you three ways to start.

Choose how you want to create
Option 1: Guided Forge
"Bary-Assisted Creation"

This is the easy mode. You describe your world in plain language, pick a genre and scope, and Bary (our AI assistant) generates entries for you.

Perfect if you:

Have a concept but don't want to write everything manually
Want to get started quickly
Need inspiration
Are new to lorebooks
How it works:

Describe your world ("A cyberpunk city ruled by corporate AIs")
Choose scope (compact, balanced, or comprehensive)
Bary generates entries based on your description
Review, edit, and keep what you like
The generated entries aren't perfect, but they're a solid starting point you can refine.

Option 2: Manual Forge
"Unrestricted Control"

This is for people who want to build everything themselves. No AI assistance, no generation - just you and the editor.

Perfect if you:

Know exactly what you want
Have existing content to organize
Want full control over every word
Are importing from another format
The creator opens with a blank lorebook. You add entries one by one, write everything yourself, and have complete control.

Option 3: Resume Creation
"Continue Your Journey"

Not starting fresh? This option lets you:

Load your lorebooks - Published ones you've made before
Load drafts - Works-in-progress you haven't published yet
Import files - Upload JSON files from LoreBary, SillyTavern, or other formats
Load by code - Enter a lorebook code directly
If you have autosaved work from a previous session, you'll see a separate prompt for that when you first load the page.

What happens after?
Whichever option you choose, you end up in the same creator. The only difference is your starting point:

Guided Forge → Opens the AI wizard first, then the creator with generated entries
Manual Forge → Opens directly to a blank entry editor
Resume Creation → Opens your loaded lorebook ready to edit
You can always access AI generation later through the "Generate Entry" button, even if you started manually.

The "Back to Library" button
Notice the link at the bottom? If you opened the creator by accident or changed your mind, you can go straight back to the Lorebook Library.

Now let's dive into the real work: creating entries.

The heart of your lorebook
Entries are the building blocks. Each entry is a piece of information that can be injected into your AI's context. Let's go through every field.

The entry editor panel
Entry Name (Primary Keys)
This is the entry's identity and its main trigger keywords.

What to put here: The name of the thing (character, place, item) plus any alternate names.

Format: Separate multiple keys with commas.

Example: Gandalf, Grey Wizard, Mithrandir, Olorin

The first key becomes the entry's display name in lists.

How it triggers: If ANY of these words appear in the conversation, this entry activates.

Secondary Keys
Additional trigger words that also activate this entry.

What to put here: Nicknames, abbreviations, related terms, common misspellings.

Example: old man, the wizard, white wizard, stormcrow

Works exactly like primary keys for triggering - any match activates the entry.

Content
The actual information that gets sent to the AI.

What to write: Everything the AI needs to know about this topic. Be comprehensive but not wasteful.

Good entry content includes:

Physical appearance (for characters/places)
Personality/atmosphere
Background and history
Relationships and connections
Special abilities or properties
Current situation
Tips:

Write in third person ("Gandalf is..." not "I am...")
Stick to facts, not instructions
150-400 words is the sweet spot
Avoid repeating info that's in other entries
You can expand to fullscreen mode for long entries. Token count is shown below the field.

Comment (Notes)
Private notes only you can see.

Use it for:

TODO reminders
Why you made certain choices
References to other entries
Work-in-progress markers
This field is NEVER sent to the AI. It's purely for your organization.

Category
What type of content this entry represents. Helps with organization and filtering.

Category Icon Use for
Character Person icon People, creatures, NPCs
Place Map marker Locations, buildings, regions
Item Cube Objects, weapons, artifacts
Spell Magic wand Abilities, powers, magic
Letter Envelope Documents, messages, scrolls
Background Mountain History, backstory, past events
World Globe World mechanics, cosmology
Rule Gavel Laws, systems, regulations
Other Dots Anything else
Choosing the right category helps you filter entries later and helps others understand your lorebook structure.

Always Active (Constant)
When enabled, this entry is included in EVERY message. No keywords needed.

When to use:

Core world rules ("Magic doesn't exist here")
Main character essentials that always apply
Setting rules that affect everything
When NOT to use:

Specific characters (use keywords instead)
Locations (only needed when relevant)
Most entries (seriously, use this sparingly)
Remember the token efficiency lesson? This is where it matters most.

Selective Mode
Changes how keys work. Instead of "any key triggers", it becomes "ALL primary keys must match."

Normal mode: Keys ["romantic", "dinner"] - triggers if "romantic" OR "dinner" appears
Selective mode: Keys ["romantic", "dinner"] - triggers only if BOTH appear

Use for: Specific scenarios that need multiple conditions.

Example: An entry about "John and Mary's first date" with keys ["John", "Mary"] - only triggers when both characters are mentioned together.

Note: Selective mode ignores secondary keys entirely.

Disabled
Completely turns off this entry. It won't trigger no matter what.

Use for:

Entries you're still writing
Content you want to temporarily hide
Testing (disable to see what changes)
Disabled entries stay in your lorebook but do nothing.

Order (1-100)
Priority when multiple entries trigger.

The limit: Only 15 entries per lorebook can trigger per message. If more entries trigger, the system picks the ones with the highest order values and drops the rest.

So if you mention 20 different keywords and 20 entries want to trigger, only the top 15 by order make it through.

Guidelines:

80-100: Critical information (main characters, core rules)
50-70: Important content (major locations, key NPCs)
20-40: Background info (history, minor details)
Higher number = higher priority = more likely to be included.

Position (0-100)
Display order in your sidebar list. Purely visual organization.

0 = Top of list
100 = Bottom of list
Drag and drop entries in the sidebar to reorder them, or set this manually.

Key Match Mode
How strictly keywords are matched. This applies to both primary and secondary keys.

Partial (Contains) - Default
The key can appear anywhere in any word. Case insensitive.

Key Matches Also matches
"Tim" "Tim" "Timothy", "Timmy", "time", "timeless"
"castle" "castle" "castles", "sandcastle", "Newcastle"
"art" "art" "heart", "artist", "start", "party"
Good for: Most entries. Catches variations naturally.

Problem: Short keys can trigger too often.

Exact (Word Boundaries)
Only matches the exact word, not parts of other words. Still case insensitive.

Key Matches Does NOT match
"Tim" "Tim", "tim", "TIM" "Timothy", "Timmy", "time"
"art" "art", "Art" "heart", "artist", "start"
"the" "the" "there", "them", "other"
Good for:

Short names like "Al", "Ed", "Art"
Common words you want to match precisely
When partial matching causes false triggers
Tip: If your character is named "Al" and the entry keeps triggering when people type "also" or "always", switch to Exact mode.

The sidebar list

Entries in the sidebar
Your entries appear in the left sidebar with:

Entry name (first primary key)
Category icon
Status icons (star for constant, filter for selective, pause for disabled)
Token count
Click any entry to edit it. Use the search bar to find specific entries. Filter by category using the dropdown.

Adding and managing entries
Add entry: Click the "+ Add Entry" button at the bottom of the sidebar.

Delete entry: Select the entry, then click the delete button (trash icon).

Duplicate entry: Select the entry, click duplicate. Useful for similar entries.

Reorder entries: Drag and drop in the sidebar, or edit the position value.

Next up: the metadata that describes your lorebook as a whole.

Lorebook Settings
6/8
The Settings tab
Click "Settings" in the creator to edit your lorebook's metadata. This is what people see in the library and what describes your lorebook as a whole.

Lorebook settings panel
Title
The name of your lorebook.

Requirements:

Required for saving
Keep it descriptive but concise
Will appear in search results
Good titles:

"Kingdom of Valdoria - Complete World"
"Star Trek Universe Compendium"
"Modern Vampire Society Rules"
Bad titles:

"My Lorebook" (too generic)
"asdfasdf" (you know who you are)
"TEST DO NOT USE" (then don't publish it)
Author
Your username. Auto-filled when you save.

This shows up in the library so people know who made it. You can edit it, but it defaults to your account name.

Description
What your lorebook is about. This appears in the library detail view.

Write about:

What world/setting it covers
How many entries and what types
What it's good for
Any credits or sources
You can use basic formatting: bold, italic, underline.

Keep it under 1000 characters. People skim descriptions, so front-load the important stuff.

Category
The genre/type of your lorebook. Helps people filter in the library.

Category Best for
Fantasy Magic, medieval, mythology
Sci-Fi Space, technology, future
Horror Scary, dark, supernatural
Romance Relationship-focused
Adventure Action, exploration, quests
Mystery Detective, crime, investigation
Historical Period pieces, real history
Contemporary Modern day, real world
Other Everything else
Pick the one that fits best. If your lorebook spans multiple genres, choose the dominant one.

Tags
Up to 5 searchable keywords.

Good tags: specific terms people might search for

"harry potter"
"medieval"
"vampire"
"original world"
Bad tags: too generic to be useful

"good"
"lorebook"
"stuff"
Tags are lowercase and trimmed automatically. Separate with Enter or comma.

Cover Image
The visual that represents your lorebook in the library.

Options:

Upload - Use your own image (JPEG, PNG, WebP, GIF up to 5MB)
Generate - Let AI create one based on your description
None - Shows a default placeholder
A good cover makes your lorebook stand out. If you have art for your world, use it.

Tips:

Square or portrait orientation works best
Keep important details in the center (it gets cropped differently on mobile)
Dark backgrounds match LoreBary's theme
Public / Private
Controls who can find and use your lorebook.

Private:

Only you can see it in the library
Others can still use it if they have the code
Good for personal projects or testing
Public:

Appears in the library for everyone
Can be searched, rated, and commented on
Others can download it (if you allow)
You can change this anytime. Start private, go public when ready.

Allow Downloads
Controls whether others can download your lorebook.

Downloads allowed:

Users can save a copy to edit themselves
Your original isn't affected
Downloads disabled:

Users can only use it through LoreBary
Entry content is obfuscated in the detail view
Protects your original work
Even with downloads disabled, your entries still work when someone uses your lorebook code. They just can't copy the whole thing.

The shareable code
Once you save, your lorebook gets an 8-character code like A3B5C7D9.

This code is how people use your lorebook. They add <LOREBOOK=A3B5C7D9> to their system prompt and your entries become available.

You can share this code anywhere. The visibility settings (public/private) control library discovery, not code access.

Now let's look at the tools that help you build and test your lorebook.

Creator Tools
7/8
Beyond basic editing
The creator has several tools to help you build, test, and organize your lorebook.

Test Chat with Bary
The most useful tool for debugging. Click the "Test" tab to chat with Bary, our mascot squirrel.

Testing entries with Bary
How it works:

You type messages, and Bary responds using your lorebook. But the real value is seeing which entries trigger.

When you mention a keyword, you'll see exactly which entries activated. This helps you:

Verify keywords trigger correctly
Check that related entries don't conflict
Test selective mode combinations
See what the AI actually receives
Rate limit: 25 messages per hour. Pace yourself.

Tips:

Test edge cases ("What if I mention both X and Y?")
Try misspellings to see if partial matching works
Verify constant entries appear every time
Test that disabled entries don't trigger
AI Entry Generation
Don't want to write everything manually? The AI can help.

Click the magic wand icon (or "Generate Entry" button) to open the generation modal.

AI entry generation
How to use it:

Topic - Describe what you want an entry about

"A blacksmith NPC named Gorm"
"The capital city of my cyberpunk world"
"How magic works in my setting"
Tone - How the AI should write it

Tone Style
Professional Factual, encyclopedic
Creative Vivid, imaginative
Detailed Comprehensive, nuanced
Instructional Clear, systematic
Sexy Alluring, suggestive
Dark Humor Sarcastic, edgy
Image (optional) - Upload a character image and the AI describes them

Click generate and review the result

The AI creates a full entry with name, keys, content, and category. Review it, edit anything you don't like, then accept it.

Rate limit: 10 generations per 5 minutes.

Full Lorebook Generation (Guided Forge)
If you chose "Guided Forge" from the welcome modal, you get the full wizard:

Describe your world - Write a paragraph about your setting
Choose scope:
Compact (5-10 entries) - Quick start
Balanced (10-20 entries) - Good coverage
Comprehensive (20-40 entries) - Full world-building
Generate - AI creates all entries at once
Review - Edit, remove, or regenerate individual entries
Accept - Adds entries to your lorebook
This is great for getting started with a new world. You can always add more entries manually later.

Import
Load lorebooks from files. Click "Import" in the header.

Supported formats:

Format Source
LoreBary JSON Exported from LoreBary
SillyTavern JSON SillyTavern lorebook export
The importer detects the format automatically. Preview entries before importing, then choose to merge with existing or replace everything.

Export
Save your lorebook to a file. Click "Export" in the header.

Available formats:

Format Use for
JSON Standard format, can be re-imported
TXT Plain text, human-readable
JSON is recommended for backups. TXT is useful for reading on other devices or sharing the content itself.

Pinboard
A visual way to organize your entries. Click the "Pinboard" tab.

Visual organization
Think of it like sticky notes on a board:

Drag entries around to group them
Color-code related entries
Add standalone notes for planning
Connect entries visually
The pinboard is purely for organization. It doesn't affect how entries work.

Load Modal
Click "Load" to open existing work:

Your Lorebooks - Published lorebooks you own
Your Drafts - Unpublished works-in-progress
Load by Code - Enter any lorebook code to edit it (if it's yours)

Drafts auto-delete after 30 days of inactivity. Published lorebooks stay forever.

Save Modal
Click "Save" to publish your work:

Title - Required
Public/Private - Who can find it
Allow Downloads - Can others copy it
Save - Creates or updates the lorebook
If you're editing an existing lorebook, saving updates it in place. Same code, new content.

If you want a separate copy, use "Save as New" to get a fresh code.

Autosave Recovery
The creator autosaves every 30 seconds. If something goes wrong:

Reopen the creator
You'll see "Restore autosaved work?"
Click Yes to recover
Autosaves expire after 7 days. Don't rely on them for long-term storage - save properly.

Now that you know how to create lorebooks, let's see how to actually use them.

Using Lorebooks
8/8
From library to chat
You've made a lorebook (or found one you like). Now how do you actually use it?

The LOREBOOK tag
Every lorebook has an 8-character code like A3B5C7D9. To activate it, add this to your system prompt:

<LOREBOOK=A3B5C7D9>
That's it. The proxy reads this tag, loads your lorebook, and starts matching keywords against your messages.

Adding the lorebook tag
Where does it go?
Add the tag somewhere in your system prompt. Most people put it at the beginning or end:

<LOREBOOK=A3B5C7D9>

You are a helpful assistant in a fantasy world.
The user is a traveling merchant.
Or in the middle - doesn't matter. The proxy scans the whole prompt for tags.

Depth: scanning more messages
By default, lorebooks scan your last 2 messages (last user + assistant). Want to scan more?

<LOREBOOK=A3B5C7D9/10>
The number after the slash is the depth. This example scans the last 10 messages.

Depth options:

Default (no slash): 2 messages
/5: Last 5 messages
/10: Last 10 messages
/20: Maximum (20 messages)
Higher depth = keywords from older messages can still trigger entries.

When to increase depth:

Long conversations where old context matters
Story continuity (character mentioned 5 messages ago)
Complex worlds with many interconnected elements
When to keep it low:

Quick back-and-forth chats
When you want only recent context
Token efficiency (deeper scanning = more processing)
Multiple lorebooks
You can use several lorebooks at once:

<LOREBOOK=AAAAAAAA>
<LOREBOOK=BBBBBBBB/10>
<LOREBOOK=CCCCCCCC>
All three are processed. Each can have its own depth setting.

Limit: You can use up to 3 lorebooks per prompt. Each lorebook gets its own limit of 15 triggered entries, so you could have up to 45 entries total.

Checking what's loaded
Want to see which lorebooks are active and at what depth? Use the <MYSETTINGS> command in chat.

The response will show:

LOREBOOKS

1. A3B5C7D9 (depth: 5)
2. F1E2D3C4 (depth: 2)
   What happens behind the scenes
   You send a message
   Proxy extracts your recent messages (based on depth)
   Scans all entry keywords against that text
   Collects triggered entries (including all constant ones)
   Sorts by order value
   Takes top 15
   Formats them and injects into AI context
   AI sees the lore and uses it in the response
   All of this happens automatically. You just chat normally.

Entry output format
Curious what the AI actually receives? Triggered entries look like this:

<Lorebook>
[Gandalf=Gandalf is a wizard of great power and wisdom. He appears as an old man with a long grey beard and pointed hat. Known for his fireworks, his staff, and his habit of arriving precisely when he means to...]
[Rivendell=Rivendell is an elven refuge hidden in the mountains. It features elegant architecture integrated with natural waterfalls and ancient trees. Lord Elrond rules here...]
</Lorebook>
Each entry becomes [Name=Content] inside the Lorebook tags.

Tips for best results
Be specific with keywords
Don't use "the" as a key. Do use "Castle Ironhold" or "Ironhold".

Watch your constants
Every constant entry appears in every message. 3 constants is fine. 30 constants will eat your context.

Test before using
Use the test chat in the creator. Make sure entries trigger when you expect.

Layer sensibly
Multiple lorebooks work great, but don't go overboard. The 15-entry limit keeps things focused.

Match your depth to your use case
Quick chats: depth 2-3
Story roleplays: depth 5-10
Epic campaigns: depth 10-20

Limits recap
Limit Value
Entries per lorebook 150
Triggered entries per lorebook 15
Maximum depth 20
Lorebooks per prompt 3
You now know everything about lorebooks - what they are, how to build them, and how to use them.

Go make something cool.

---
