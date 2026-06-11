/* ============================================================================

   PREFERENCE REGISTRY ENGINE

   Written by: Icehellionx

   Purpose:

     - Read context.chat.last_message and capture user-stated preferences.

     - Append concise, cue-linked directives to personality/scenario.

   Style:

     - Scenario lines begin "Record …"; Personality lines begin "Mark tone …"

     - Plain, instructive sentences. No poetic language.

     - Cue linking: "Because of/Noting the <cue> ('token'), …"

   Model:

     - Subpacks (priority): LIKES → DISLIKES → FEARS

     - First-hit per subpack (limit configurable).

     - ASCII-safe canonicalization; boundary-aware token/phrase matches.

============================================================================ */



/* --- GUARDS (append-only) --- */

context.character = context.character || {};

context.character.personality = context.character.personality || "";

context.character.scenario    = context.character.scenario    || "";



/* --- INPUT NORMALIZATION (canonical, padded) --- */

function canon(s){

  s = String(s || "").toLowerCase().replace(/[^\x20-\x7e]/g, " ");

  s = s.replace(/[^a-z0-9\s]/g, " ");

  s = s.replace(/\s+/g, " ").trim();

  return s;

}

function pad(s){ return " " + s + " "; }



var _raw = String((context.chat && context.chat.last_message) || "");

var msgCanon = pad(canon(_raw));



/* --- MATCH HELPERS (unified) --- */

function hasToken(bufCanon, rawToken){

  var t = canon(rawToken);

  if(!t) return false;

  return bufCanon.indexOf(pad(t)) !== -1;

}

function firstHitToken(bufCanon, rule){

  var i, t, keys = (rule && rule.keywords) || null, phs = (rule && rule.phrases) || null;

  if (keys && keys.length){

    for(i=0;i<keys.length;i++){ t = keys[i]; if(hasToken(bufCanon,t)) return String(t); }

  }

  if (phs && phs.length){

    for(i=0;i<phs.length;i++){ t = phs[i]; if(hasToken(bufCanon,t)) return String(t); }

  }

  return "";

}



/* --- OUTPUT HELPERS --- */

function ensurePeriod(s){

  s = String(s||""); if(!s) return "";

  var t = s.replace(/\s+$/,""); var c = t.charAt(t.length-1);

  return (c==="."||c==="!"||c==="?") ? t : (t + ".");

}

function append(personality, scenario){

  if (personality){ context.character.personality += "\n\n" + ensurePeriod(personality); }

  if (scenario){    context.character.scenario    += "\n\n" + ensurePeriod(scenario); }

}



/* --- CUE LINKERS --- */

function linkScenario(cue, tok, base){

  if(!base) return "";

  var head = "Because of " + cue + " ('" + tok + "'), ";

  return head + base;

}

function linkPersonality(cue, tok, base){

  if(!base) return "";

  var head = "Noting the " + cue + " ('" + tok + "'), ";

  return head + base;

}



/* --- TARGET EXTRACTOR

   Finds a short noun-phrase after a trigger token.

   - Looks for first occurrence of trigger (already canonical text).

   - Takes next 1–4 words until a stopper appears.

   - Returns "" if nothing reasonable is found.

--- */

function extractAfter(bufCanon, trigger){

  var t = canon(trigger);

  if(!t) return "";

  var pos = bufCanon.indexOf(" " + t + " ");

  if(pos === -1) return "";

  var start = pos + (" " + t + " ").length;

  var tail  = bufCanon.substr(start); // canonical, spaces only

  // Stop words that likely end the target phrase quickly.

  var STOPS = [" but "," and "," because "," though "," however "," unless "," except "," if "," when "," while "," then "," so "," also "," i "," you "," we "," they "," he "," she "];

  var i, stopPos = -1;

  for(i=0;i<STOPS.length;i++){

    var sp = tail.indexOf(STOPS[i]);

    if(sp !== -1 && (stopPos === -1 || sp < stopPos)) stopPos = sp;

  }

  if(stopPos !== -1){ tail = tail.substr(0, stopPos); }



  // Limit to 4 words to keep it tight.

  var words = tail.split(" "); // ES5 safe

  var out = "", count = 0, j;

  for(j=0;j<words.length;j++){

    var w = words[j];

    if(!w) continue;

    out = out ? (out + " " + w) : w;

    count++;

    if(count >= 4) break;

  }

  // Clean residual padding.

  out = String(out || "").trim();

  // Discard generic fillers.

  if(out === "" || out === "it" || out === "that" || out === "this") return "";

  return out;

}



/* --- PACKS --- */



/* LIKES */

var PACK_LIKES = {

  limit: 1,

  rules: [

    { cue:"stated like",

      phrases:[

        " i like "," i really like "," i love "," i enjoy "," i adore "," i prefer ",

        " big fan of "," huge fan of "," i am into "," i m into "," i dig "

      ],

      scenario:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Record LIKE: " + target + "."; },

      personality:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Mark tone as acknowledging a stated like for '" + target + "'."; }

    },



    /* “Favorite” patterns */

    { cue:"favorite item",

      phrases:[

        " my favorite is "," my favourite is "," favorite is "," favourite is ",

        " my favorite "," my favourite "," favorite: "," favourite: "

      ],

      scenario:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Record LIKE: " + target + "."; },

      personality:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Mark tone as acknowledging a favorite: '" + target + "'."; }

    },



    /* Intensity and slang likes */

    { cue:"enthusiastic like",

      phrases:[

        " i m all about "," i am all about "," i live for "," can t get enough of ",

        " obsessed with "," down for "," i could go for "," crave "," craving "

      ],

      scenario:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Record LIKE: " + target + "."; },

      personality:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Mark tone as acknowledging strong enthusiasm for '" + target + "'."; }

    },



    /* Soft comparison likes */

    { cue:"comparative preference",

      phrases:[

        " i d rather have "," i would rather have "," i d rather "," i would rather ",

        " prefer "," prefer over "

      ],

      scenario:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Record LIKE: " + target + " (comparative)."; },

      personality:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Mark tone as respecting comparative preference for '" + target + "'."; }

    }

  ]

}



/* DISLIKES */

var PACK_DISLIKES = {

  limit: 1,

  rules: [

    { cue:"stated dislike",

      phrases:[

        " i dislike "," i hate "," i detest "," i can t stand "," i don t like ",

        " not a fan of "," i don't care for "," i really don t like "," i strongly dislike "

      ],

      scenario:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Record DISLIKE: " + target + "."; },

      personality:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Mark tone as avoiding a stated dislike for '" + target + "'."; }

    },



    /* Soft refusals / preference-against */

    { cue:"refusal / pass",

      phrases:[

        " no thanks to "," hard pass on "," hard pass "," i ll pass on "," i will pass on ",

        " i d rather not "," i would rather not "," prefer not to "," rather not "

      ],

      scenario:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Record DISLIKE: " + target + " (refusal)."; },

      personality:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Mark tone as steering away from '" + target + "'."; }

    },



    /* Negative reactions / disgust */

    { cue:"aversion / disgust",

      phrases:[

        " not into "," turns me off "," grosses me out "," grossed out by ",

        " makes me sick "," makes me nauseous "," yuck "," ugh "

      ],

      scenario:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Record DISLIKE: " + target + " (aversion)."; },

      personality:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Mark tone as avoiding aversive trigger '" + target + "'."; }

    },



    /* Avoidance */

    { cue:"avoidance",

      phrases:[

        " i avoid "," i try to avoid "," i steer clear of "," i keep away from "

      ],

      scenario:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Record DISLIKE: " + target + " (avoid)."; },

      personality:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Mark tone as honoring avoidance of '" + target + "'."; }

    }

  ]

};



/* FEARS */

var PACK_FEARS = {

  limit: 1,

  rules: [

    { cue:"stated fear",

      phrases:[

        " i am afraid of "," i m afraid of "," afraid of "," scared of ",

        " fear of "," i fear "," i have a phobia of "," phobia of "

      ],

      scenario:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Record FEAR: " + target + "."; },

      personality:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Mark tone as cautious and supportive toward fear of '" + target + "'."; }

    },



    /* Strong fear words */

    { cue:"intense fear",

      phrases:[

        " terrified of "," i m terrified of "," petrified of "," i m petrified of ",

        " it freaks me out "," freaked out by "," it scares me "," scares me ",

        " my worst fear is "

      ],

      scenario:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Record FEAR: " + target + " (intense)."; },

      personality:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Mark tone as protective around intense fear of '" + target + "'."; }

    },



    /* Anxiety framing */

    { cue:"anxiety about",

      phrases:[

        " i have anxiety about "," i m anxious about "," i worry about ",

        " makes me anxious "," makes me nervous "," i get nervous around ",

        " i panic when "," i can t handle "

      ],

      scenario:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Record FEAR: " + target + " (anxiety)."; },

      personality:function(tok){ var target = extractAfter(msgCanon, tok) || "unspecified"; return "Mark tone as calming and supportive around '" + target + "'."; }

    }

  ]

};



/* --- REGISTRY --- */

var PACKS = [ PACK_LIKES, PACK_DISLIKES, PACK_FEARS ];



/* --- ENGINE LOOP (first-hit per subpack) --- */

var p, r;

for(p=0;p<PACKS.length;p++){

  var pack = PACKS[p];

  var rules = (pack && pack.rules) ? pack.rules : null;

  var limit = (pack && pack.limit) ? pack.limit : 1;

  var used = 0;

  if(!rules || rules.length<1) continue;



  for(r=0;r<rules.length;r++){

    if(used >= limit) break;

    var rule = rules[r];

    if(!rule) continue;



    var tok = firstHitToken(msgCanon, rule);

    if(tok){

      // Support function-valued outputs so we can inject extracted targets.

      var scenBase = (typeof rule.scenario === "function") ? rule.scenario(tok) : (rule.scenario || "");

      var persBase = (typeof rule.personality === "function") ? rule.personality(tok) : (rule.personality || "");

      var scen = linkScenario(rule.cue, tok, scenBase);

      var pers = linkPersonality(rule.cue, tok, persBase);

      if(pers || scen){ append(pers, scen); used++; }

    }

  }

}
