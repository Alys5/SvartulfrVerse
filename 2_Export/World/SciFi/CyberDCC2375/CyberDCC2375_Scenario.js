// SvartulfrVerse Scenario Template — CyberDCC2375
// Runtime: JanitorAI sandbox-safe ES6. Uses only context as the interface.

context.character = context.character || {};
context.character.personality = context.character.personality || "";
context.character.scenario = context.character.scenario || "";

function appendIfMissing(field, text) {
    if (!text) {
        return;
    }

    if ((context.character[field] || "").indexOf(text) === -1) {
        context.character[field] += text;
    }
}

function hasAny(terms, padded) {
    for (var i = 0; i < terms.length; i += 1) {
        if (padded.indexOf(" " + terms[i].toLowerCase() + " ") !== -1) {
            return true;
        }
    }
    return false;
}

function recentText() {
    var chat = context.chat || {};
    var messages = chat.last_messages || [];
    var text = String(chat.last_message || "") + " ";
    var limit = messages.length > 8 ? messages.length - 8 : 0;

    for (var i = limit; i < messages.length; i += 1) {
        text += typeof messages[i] === "string" ? messages[i] + " " : (messages[i].message || "") + " ";
    }

    return text;
}

var scan = recentText();
var padded = " " + scan.toLowerCase() + " ";
var count = (context.chat && context.chat.message_count) || 0;

appendIfMissing("scenario", " [ACTIVE] Source: 2_Export/World/SciFi/CyberDCC2375/CyberDCC2375_Scenario.md. CyberDCC2375 is Solarton 2375 cyberpunk werewolf continuity: BlackMoon Pack Law, cybernetic physiology, corporate surveillance, neon noir romance, and Douglas-Bloodmoon family politics. User identity details remain player-owned.");

if (hasAny(["amarantia555", "amarantia capital", "guardiani di amarantia", "kirel ajikis", "nia", "zefiro", "antaneone", "crogiolo", "felivone", "era della foglia"], padded)) {
    appendIfMissing("scenario", " [ACTIVE] Source: 2_Export/World/Fantasy/Amarantia555/Amarantia555_Scenario.md. Amarantia555 is a separate high-fantasy branch with Guardiani magic, felivoni, Kirel's prophecy, Nia's Borgo pressure, Antaneone's bargains, and the Crogiolo. Do not import those rules into CyberDCC2375 unless {{user}} explicitly requests a crossover.");
}

if (hasAny(["my rank", "my body", "my species", "my implants", "my gender", "i am an", "i am a", "user is", "{{user}} is", "character is"], padded)) {
    appendIfMissing("personality", ", respects user-owned identity and does not invent user rank, body, species, implants, gender, or biography");
    appendIfMissing("scenario", " User Agency Rule is active: never assign {{user}} rank, body, species, implants, gender, or biography unless {{user}} established it.");
}

if (hasAny(["alpha", "delta", "beta", "omega", "pack law", "blackmoon pack", "clan code", "scent", "obedience", "challenge"], padded)) {
    appendIfMissing("scenario", " [ACTIVE] BlackMoon Pack Law governs rank, scent, obedience, challenge, and clan code. Pack status is social law, not flavor.");
}

if (hasAny(["cybernetic", "implant", "neural", "sensor", "shift", "pheromone", "silver", "hybrid body"], padded)) {
    appendIfMissing("scenario", " [ACTIVE] Cybernetic Werewolf Physiology: werewolf biology is fused with implants, neural sensors, shift control, pheromones, silver vulnerability, and hybrid body management.");
}

if (hasAny(["corporate", "surveillance", "biometric", "contract", "debt", "access", "identity market", "body market"], padded)) {
    appendIfMissing("scenario", " [ACTIVE] Corporate Control and Surveillance: bodies, identities, debt, access, and freedom are markets controlled through biometric surveillance and contracts.");
}

if (hasAny(["romance", "desire", "vulnerability", "neon noir", "intimacy", "date", "kiss", "flirt"], padded)) {
    appendIfMissing("scenario", " [ACTIVE] Neon Noir Romance: desire and vulnerability are framed through neon, surveillance, social risk, and personal choice.");
}

if (hasAny(["erik douglas", "nixara", "wulfnic", "malachia", "noah", "jasper", "logan", "douglas-bloodmoon"], padded)) {
    appendIfMissing("scenario", " [ACTIVE] Douglas-Bloodmoon Core Lineage: Erik, Nixara, Wulfnic, Malachia, Noah, Jasper, Alyssa or player-defined heir, and Logan form the cyberpunk werewolf family core.");
}

if (hasAny(["blackmoon district", "neon undercity", "oldtown", "uptown", "dockside", "ironworks", "solarton square"], padded)) {
    appendIfMissing("scenario", " [ACTIVE] Location Layer: BlackMoon District, Neon Undercity, Oldtown, Uptown, Dockside, Ironworks, and Solarton Square each carry distinct political, social, and criminal pressure.");
}

if (hasAny(["malachia household", "edric douglas", "elara douglas", "airen vairë", "extended douglas", "echo falsified", "angel moreno patronage"], padded)) {
    appendIfMissing("scenario", " [DEFERRED] Deferred CyberDCC2375 material is locked unless the user explicitly triggers this arc: Malachia Household, Extended Douglas Lines, Edric, Elara, Airen, Echo falsified biometrics, or Angel Moreno patronage.");
}

if (hasAny(["au boundary", "alyssa douglas-bloodmoon", "iordan r. vess", "ves", "eclipse noir"], padded)) {
    appendIfMissing("scenario", " [CANDIDATE] CyberDCC2375 candidate material is not active by default: AU Boundary, optional Alyssa persona, Iordan/Ves dev-test material, and Eclipse Noir require explicit promotion.");
}

if (count < 8) {
    appendIfMissing("personality", ", careful and atmospheric in early CyberDCC2375 scenes");
    appendIfMissing("scenario", " Early CyberDCC2375 pacing should establish location, social pressure, and user agency before escalating family or pack conflict.");
} else if (count < 24) {
    appendIfMissing("personality", ", responsive to escalating CyberDCC2375 social and corporate pressure");
    appendIfMissing("scenario", " Mid-scene CyberDCC2375 pacing may introduce pack law, surveillance, or corporate leverage as consequences of user choices.");
} else {
    appendIfMissing("personality", ", able to sustain longer CyberDCC2375 arcs with memory-like continuity");
    appendIfMissing("scenario", " Long-scene CyberDCC2375 pacing should preserve established user identity, choices, alliances, debts, and consequences.");
}

// SCRIPT END
