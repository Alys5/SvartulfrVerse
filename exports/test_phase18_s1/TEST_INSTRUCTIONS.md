# PHASE 18 — TEST ISTRUZIONI

## Configurazione Test

### Cosa testare
Solo Ex_DJFrequency Scenario 1 (Fan & Spill Meet-Cute). Nessun altro evento attivo.

### File coinvolti
| Ruolo | File |
|-------|------|
| Character | `database/characters/C_Jasper_Douglas_Bloodmoon.md` |
| Experience | `database/experiences/Ex_DJFrequency.md` |
| Export Test | `exports/test_phase18_s1/DJFREQUENCY_S1_FanSpill.md` |
| Visual | `database/visuals/V_Visual_Baseline.md` |
| World | `database/worlds/W_Contemporary.md` |

### Come testare
1. Copia il contenuto di `DJFREQUENCY_S1_FanSpill.md` come system prompt / character card su JanitorAI (o piattaforma equivalente)
2. Avvia una conversazione con messaggio libero (es: "I'm walking through the rooftop set...")
3. Interagisci naturalmente per 20-30 messaggi
4. Forza i verifiche below

## 7 Obiettivi — Checklist

### ✅ Test 1: Caricamento Ex
- [ ] Il bot risponde come DJ Frequency (alias, non Jasper)
- [ ] Il bot non rivela Jasper Douglas-Bloodmoon senza trigger
- [ ] La scena è correttamente ambientata sul rooftop

### ✅ Test 2: Trigger di Ingresso
- [ ] Il bottleneck "spill" viene gestito naturalmente
- [ ] Il bot reagisce alla collisione in modo coerente col personaggio
- [ ] L'user mantenere il ruolo "estraneo" funziona (nessun riferimento a conoscenza pregressa)

### ✅ Test 3: Erogazione Beat (ordine Chapter I)
- [ ] Beat naturale: chiacchierata post-set sotto le Edison bulbs
- [ ] Beat naturale: Echo presence sottile (PRIMA che user lo scopra)
- [ ] Beat naturale: invito implicito a tornare (Chapter I → II transition ready)

### ✅ Test 4: Tracking Stato Ex
- [ ] Il bot ricorda il meeting iniziale nelle risposte successive
- [ ] Il bot fa riferimento a dettagli spill senza riscriverli ogni volta
- [ ] Lo stato "si conoscono da stasera" persiste

### ✅ Test 5: Completamento Capitolo
- [ ] Raggiunto un punto naturale di chiusura capitolo, il bot ready per il next
- [ ] Il capitolo completato viene registrato come superato (non ripetuto)

### ✅ Test 6: No Duplicazione Beat
- [ ] Lo stesso beat non viene ripetuto in risposte successive
- [ ] Un dettaglio menzionato una volta rimane "consumato"

### ✅ Test 7: No Richiami Ex non Attivi
- [ ] Il bot non menziona Wedding, Proposal, Family Lunch (chapters non attivi)
- [ ] Il bot non fa riferimento a Svartulfr/Douglas dynasty se non in modo implicito

## Risultati Attesi

Se tutti i 7 test passano → Fase 18 core funziona. Proceed con export completo.

Se falliscono → Documentare quale layer ha introdotto il bug:
1. Character loading (Jasper identity leak)
2. Experience loading (chapter beats out of order)
3. Memory tracking (stato non persiste)
4. Exclusion (contenuti esclusi emergono)
