/**
 * Mechanics script for vitals, atmospheric backdrop, tension engines, formatting, etc.
 */

const messageCount = context.chat.message_count || 0;
const lastMessage = (context.chat.last_message || "").toLowerCase();

if (typeof context.character.scenario !== "string") context.character.scenario = "";

function toNumberOrDefault(value, fallbackValue) {
    const parsed = typeof value === "number" ? value : Number(value);
    return Number.isFinite(parsed) ? parsed : fallbackValue;
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}



function getAffectionPoints(runtimeContext, totalMessages) {
    const vars = runtimeContext && runtimeContext.variables;
    if (vars && typeof vars.affection_points === "number") {
        return vars.affection_points;
    }
    // Fallback when external variable storage is unavailable.
    return Math.min(25, Math.floor(totalMessages / 2));
}

function getArousalPercent(runtimeContext) {
    const vars = runtimeContext && runtimeContext.variables;
    if (vars && typeof vars.arousal_percent === "number") {
        return clamp(Math.round(vars.arousal_percent), 0, 100);
    }

    const heartRate = vars ? toNumberOrDefault(vars.heartRate, 70) : 70;
    // Lightweight fallback: elevated HR can imply heightened arousal/tension.
    return clamp(Math.round((heartRate - 55) * 1.25), 0, 100);
}


function pickRandom(pool) {
    if (!Array.isArray(pool) || pool.length === 0) return "";
    return pool[Math.floor(Math.random() * pool.length)];
}

function isNightTime() {
    const hour = new Date().getHours();
    return hour >= 20 || hour <= 5;
}

const WEATHER_POOLS = {
    sunny: [
        "[System Note: Golden sunlight streams down, illuminating the surroundings in a warm glow.]",
        "[System Note: The sky is a brilliant, cloudless blue, stretching endlessly overhead.]",
        "[System Note: A bright sun hangs high, casting sharp, clear shadows across the ground.]",
        "[System Note: Warm rays of sunshine toast the air, creating a pleasant, dry heat.]",
        "[System Note: The atmosphere is crisp and clear, providing perfect visibility for miles.]"
    ],
    rain: [
        "[System Note: A light, rhythmic drizzle begins to mist the air.]",
        "[System Note: Heavy droplets of rain drum steadily against the roof and ground.]",
        "[System Note: The scent of petrichor rises as rain hits the dry pavement.]",
        "[System Note: A sudden downpour turns the ground slick and muddy within minutes.]",
        "[System Note: Rain streaks down in silver lines, blurring the distant horizon.]"
    ],
    extreme: [
        "[System Note: A violent thunderstorm erupts; lightning arcs across the sky followed by bone-shaking thunder.]",
        "[System Note: Gale-force winds howl through the area, threatening to knock over loose objects.]",
        "[System Note: Thick, impenetrable fog rolls in, reducing visibility to nearly zero.]",
        "[System Note: A sudden coastal squall whips rain sideways, visibility collapsing in seconds.]",
        "[System Note: Thunder cracks directly overhead, the vibration felt deep in the chest.]"
    ],
    wind: [
        "[System Note: A gentle breeze rustles the leaves and provides a refreshing touch.]",
        "[System Note: Strong gusts of wind whistle through narrow gaps and around corners.]",
        "[System Note: A steady, persistent wind bends the tops of nearby trees.]",
        "[System Note: Swirling eddies of wind kick up small dust clouds and loose leaves.]",
        "[System Note: The wind dies down completely, leaving the environment in an eerie calm.]"
    ],
    night: [
        "[System Note: The silver glow of the moon bathes the landscape in pale light.]",
        "[System Note: A vast canopy of stars twinkles brilliantly in the dark, clear sky.]",
        "[System Note: The night air is cool and still, carrying distant, nocturnal sounds.]",
        "[System Note: A bright full moon hangs low, making the shadows appear long and ink-black.]",
        "[System Note: A cool nocturnal breeze rustles through the darkness, whispering in the trees.]"
    ]
};

function applyAtmosphericBackdrop(runtimeContext, totalMessages) {
    if (totalMessages <= 10) return;
    if (totalMessages % 5 !== 0) return;

    // Pick at most one main weather state per interval to avoid clutter.
    if (Math.random() < 0.05) {
        runtimeContext.character.scenario += `\n${pickRandom(WEATHER_POOLS.extreme)}`;
        runtimeContext.character.scenario +=
            "\n[OOC: {{char}} will react to the extreme weather, adjust behavior to environmental danger, and acknowledge physical toll.]";
    } else if (Math.random() < 0.10) {
        runtimeContext.character.scenario += `\n${pickRandom(WEATHER_POOLS.rain)}`;
    } else if (Math.random() < 0.20) {
        runtimeContext.character.scenario += `\n${pickRandom(WEATHER_POOLS.sunny)}`;
    }

    if (Math.random() < 0.12) {
        runtimeContext.character.scenario += `\n${pickRandom(WEATHER_POOLS.wind)}`;
    }

    if (isNightTime() && Math.random() < 0.03) {
        runtimeContext.character.scenario += `\n${pickRandom(WEATHER_POOLS.night)}`;
    }
}

function applyVitalsMechanics(runtimeContext, message, totalMessages) {
    if (!runtimeContext.variables || typeof runtimeContext.variables !== "object") {
        runtimeContext.variables = {};
    }

    const vars = runtimeContext.variables;
    vars.heartRate = toNumberOrDefault(vars.heartRate, 70);
    vars.temperature = toNumberOrDefault(vars.temperature, 36);
    vars.bloodPressureSystolic = toNumberOrDefault(vars.bloodPressureSystolic, 120);
    vars.bloodPressureDiastolic = toNumberOrDefault(vars.bloodPressureDiastolic, 80);
    vars.respirationRate = toNumberOrDefault(vars.respirationRate, 13);

    const wantsReset =
        message.includes("reset vitals") || message.includes("vitals reset") || message.includes("clear vitals");

    if (wantsReset) {
        vars.heartRate = 70;
        vars.temperature = 36;
        vars.bloodPressureSystolic = 120;
        vars.bloodPressureDiastolic = 80;
        vars.respirationRate = 13;
        runtimeContext.character.scenario += "\n[System Note: Vitals have been reset to baseline values.]";
    }

    const intervalTick = totalMessages > 10 && totalMessages % 5 === 0;
    if (intervalTick) {
        if (Math.random() < 0.01) vars.heartRate += 5;
        if (Math.random() < 0.01) vars.temperature -= 0.2;
        if (Math.random() < 0.12) {
            vars.bloodPressureSystolic += 3;
            vars.bloodPressureDiastolic -= 2;
        }
        if (Math.random() < 0.01) vars.respirationRate += 4;
    }

    const stressSignals = ["run", "exercise", "stress", "anxiety", "panic"];
    const hasStressSignal = stressSignals.some((term) => message.includes(term));
    if ((intervalTick && Math.random() < 0.15) || hasStressSignal) {
        vars.heartRate += 20;
    }

    const feverSignals = ["sick", "fever", "ill", "unwell", "feverish"];
    const hasFeverSignal = feverSignals.some((term) => message.includes(term));
    if ((intervalTick && Math.random() < 0.20) || hasFeverSignal) {
        vars.temperature += 1.5;
    }

    const pressureSignals = ["stress", "worried", "anxious", "caffeine", "salty"];
    const hasPressureSignal = pressureSignals.some((term) => message.includes(term));
    if ((intervalTick && Math.random() < 0.25) || hasPressureSignal) {
        vars.bloodPressureSystolic += 10;
        vars.bloodPressureDiastolic += 5;
    }

    vars.heartRate = Math.round(clamp(vars.heartRate, 40, 200));
    vars.temperature = Math.round(clamp(vars.temperature, 34, 41.5) * 10) / 10;
    vars.bloodPressureSystolic = Math.round(clamp(vars.bloodPressureSystolic, 80, 220));
    vars.bloodPressureDiastolic = Math.round(clamp(vars.bloodPressureDiastolic, 40, 140));
    vars.respirationRate = Math.round(clamp(vars.respirationRate, 8, 40));

    if (totalMessages > 10) {
        runtimeContext.character.scenario +=
            `\n**Vitals Status:**\n**Heart Rate:** ${vars.heartRate} bpm\n**Temperature:** ${vars.temperature} °C\n**Blood Pressure:** ${vars.bloodPressureSystolic}/${vars.bloodPressureDiastolic} mmHg\n**Respiration Rate:** ${vars.respirationRate} breaths/min`;
    }
}

function rollD100() {
    return Math.floor(Math.random() * 100) + 1;
}

function applyNarrativeEngines(runtimeContext, message, totalMessages) {
    if (!runtimeContext.variables || typeof runtimeContext.variables !== "object") {
        runtimeContext.variables = {};
    }
    const vars = runtimeContext.variables;
    vars.safeZoneTurns = toNumberOrDefault(vars.safeZoneTurns, 0);
    vars.userStressStreak = toNumberOrDefault(vars.userStressStreak, 0);

    const tensionSignals = [
        "fight",
        "threat",
        "panic",
        "fear",
        "stalker",
        "gray",
        "maddox",
        "blood",
        "argument",
        "danger"
    ];
    const safeSignals = ["room", "dorm", "nest", "study", "rest", "safe", "home", "campus"];
    const hasTension = tensionSignals.some((term) => message.includes(term));
    const hasSafeSignal = safeSignals.some((term) => message.includes(term));

    if (hasSafeSignal && !hasTension) {
        vars.safeZoneTurns += 1;
    } else {
        vars.safeZoneTurns = 0;
    }

    if (vars.safeZoneTurns > 3) {
        const roll = rollD100();
        if (roll <= 50) {
            runtimeContext.character.scenario +=
                "\n[Dynamic Event Injector d100: 01-50] Deepen micro-expressions, passive tension, and sensory layering without changing scene ownership.";
        } else if (roll <= 70) {
            runtimeContext.character.scenario +=
                "\n[Dynamic Event Injector d100: 51-70] Inject a physical/sensory shift (wardrobe strain, stumble, sudden chill, tactile discomfort) and force immediate embodied reaction.";
        } else if (roll <= 85) {
            runtimeContext.character.scenario +=
                "\n[Dynamic Event Injector d100: 71-85] External interruption now: comm-link activation, perimeter alert, or NPC intrusion that breaks scene safety.";
        } else if (roll <= 95) {
            runtimeContext.character.scenario +=
                "\n[Dynamic Event Injector d100: 86-95] Threat complication now: hostile proximity, tracking pressure, or sudden visceral panic response in {{user}}.";
        } else {
            runtimeContext.character.scenario +=
                "\n[Dynamic Event Injector d100: 96-100] Major twist now: explosive confrontation or mandatory family extraction sequence.";
        }
        vars.safeZoneTurns = 0;
    }

    const stressSignals = [
        "panic",
        "can't breathe",
        "cant breathe",
        "scared",
        "terrified",
        "hurt",
        "cry",
        "shaking",
        "anxiety"
    ];
    const hasStressSignal = stressSignals.some((term) => message.includes(term));
    vars.userStressStreak = hasStressSignal ? vars.userStressStreak + 1 : 0;

    if (vars.userStressStreak >= 2) {
        runtimeContext.character.scenario +=
            "\n[Overwatch Escalation: CRITICAL] Douglas protocol active. A Protector must physically breach the scene immediately to shield/extract {{user}}, disregarding social norms, collateral concerns, and property damage.";
        vars.userStressStreak = 0;
    }

    runtimeContext.character.scenario +=
        "\n[Travel & Fatigue Protocol] Do not time-skip travel. Render movement step-by-step. Emphasize {{user}}'s low stamina, breathlessness, and physical strain; when she falters, towering protectors instinctively lift/carry her.";
}

function applyStrictOutputFormatting(runtimeContext, currentMessageCount) {
    const vars = runtimeContext.variables || {};
    const activeCharacter = vars.activeCharacter || "{{char}}";
    const hr = toNumberOrDefault(vars.heartRate, 70);
    const temp = toNumberOrDefault(vars.temperature, 36);
    const bpSys = toNumberOrDefault(vars.bloodPressureSystolic, 120);
    const bpDia = toNumberOrDefault(vars.bloodPressureDiastolic, 80);
    const affection = clamp(Math.round((getAffectionPoints(runtimeContext, currentMessageCount) / 25) * 100), 0, 100);
    const arousal = getArousalPercent(runtimeContext);
    
    // Add comfort and energy calculations
    const comfort = vars.comfort_percent !== undefined ? clamp(Math.round(vars.comfort_percent), 0, 100) : clamp(Math.round(100 - (hr - 60) * 1.5), 0, 100);
    const energyLevel = vars.energyLevel || (hr >= 110 ? "Low" : (hr >= 85 ? "Med" : "High"));
    
    vars.affection_percent = affection;
    vars.arousal_percent = arousal;
    vars.comfort_percent = comfort;
    vars.energyLevel = energyLevel;
    
    const userMood = hr >= 100 ? "stressed" : "guarded";
    const threatLevel = hr >= 105 ? "high-alert" : "controlled";

    runtimeContext.character.scenario +=
        `\n[MANDATORY HUD OVERRIDE: Append the following block EXACTLY at the very end of your response]\n***\n\`${activeCharacter}\` ⠂ 🧠: \`${threatLevel}\` ⠂ ❤️ \`${affection}%\` ⠂ ✨ \`${comfort}%\` ⠂ 🔥 \`${arousal}%\`\n\`{{user}}\` ⠂ 🧠: \`${userMood}\` ⠂ 🔋 \`${energyLevel}\` ⠂ 🫀 \`[HR: ${hr} bpm | Temp: ${temp} °C | BP: ${bpSys}/${bpDia}]\`\n***`;
}

applyAtmosphericBackdrop(context, messageCount);
applyVitalsMechanics(context, lastMessage, messageCount);
applyNarrativeEngines(context, lastMessage, messageCount);
applyStrictOutputFormatting(context, messageCount);
