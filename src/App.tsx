/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#d1d1d1] font-sans flex flex-col overflow-x-hidden select-none">
      <header className="h-16 border-b border-[#1a1a1a] flex flex-wrap md:flex-nowrap items-center justify-between px-4 md:px-8 bg-[#080808]">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm shrink-0">
            <div className="w-4 h-4 bg-black rotate-45"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold tracking-tight text-white leading-none">SvartulfrVerse</h1>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#666] mt-1 font-mono">
              Active Runtime Canon Repository
            </span>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-[#444]">Phase Status</span>
            <span className="text-xs text-[#00ff41] font-mono">BOOTSTRAP_COMPLETE</span>
          </div>
          <div className="h-8 w-[1px] bg-[#222]"></div>
          <div className="text-[11px] font-mono bg-[#111] px-3 py-1 border border-[#222] rounded">
            HASH: 4f8b9a2
          </div>
        </div>
      </header>
      
      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-px bg-[#1a1a1a]">
        <section className="md:col-span-3 bg-[#0a0a0a] flex flex-col p-6">
          <div className="mb-8">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#666] mb-4">Core Directory</h2>
            <ul className="space-y-3 font-mono text-xs">
              <li className="flex items-center text-[#999]">
                <span className="mr-2 opacity-30">├─</span> README.md
              </li>
              <li className="flex flex-col space-y-2">
                <div className="flex items-center text-white">
                  <span className="mr-2 opacity-30">├─</span> core/
                </div>
                <div className="pl-6 space-y-2 border-l border-[#222] ml-[7px]">
                  <div className="text-[#777]">ADR-000_Baseline</div>
                  <div className="text-[#777]">Architecture.md</div>
                  <div className="text-[#777]">Scope.md</div>
                </div>
              </li>
              <li className="flex flex-col space-y-2 pt-2">
                <div className="flex items-center text-white">
                  <span className="mr-2 opacity-30">└─</span> engines/
                </div>
                <div className="pl-6 space-y-2 border-l border-[#222] ml-[7px]">
                  <div className="text-[#00ff41] opacity-70 italic">En_Core.js</div>
                  <div className="text-[#00ff41] opacity-70 italic">state_engine.js</div>
                  <div className="text-[#00ff41] opacity-70 italic">family_engine.js</div>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-8 md:mt-auto p-4 bg-[#111] border border-[#222] rounded-sm">
            <div className="text-[10px] uppercase tracking-widest text-[#444] mb-2">Archival Source</div>
            <div className="text-xs font-serif italic text-[#888]">Progetti Repository</div>
            <div className="text-[9px] text-[#444] mt-1">Status: Read-Only / Frozen</div>
          </div>
        </section>

        <section className="md:col-span-6 bg-[#080808] p-6 md:p-8 flex flex-col">
          <div className="mb-10 text-center">
            <h3 className="font-serif text-3xl text-white font-light tracking-tight italic mb-2">Los Angeles Dynasty</h3>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#444] to-transparent mx-auto"></div>
            <p className="text-xs text-[#555] mt-4 uppercase tracking-[0.2em]">Only Human | Contemporary</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 border border-[#1a1a1a] bg-[#0a0a0a] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 text-[10px] text-[#222] font-mono">D-B LINE</div>
              <h4 className="font-serif text-lg text-white mb-4">Dynastic Union</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-[#1a1a1a] pb-1">
                  <span className="text-[#666]">Matriarch</span>
                  <span className="text-[#aaa]">Nixara Bloodmoon</span>
                </div>
                <div className="flex justify-between border-b border-[#1a1a1a] pb-1">
                  <span className="text-[#666]">Patriarch</span>
                  <span className="text-[#aaa]">Erik Douglas</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 border border-[#1a1a1a] bg-[#0a0a0a]">
              <h4 className="font-serif text-lg text-white mb-4 italic">First Generation Heirs</h4>
              <ul className="text-xs space-y-2 text-[#777] font-mono">
                <li>• Malachia D.B.</li>
                <li>• Noah D.B.</li>
                <li>• Jasper D.B.</li>
                <li>• Alyssa D.B.</li>
              </ul>
            </div>
          </div>
          
          <div className="flex-1 border-t border-[#1a1a1a] pt-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#444] mb-6 text-center">Canon Recovery Workflow</h4>
            <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-0 items-center justify-between px-2 md:px-4 text-[10px] font-mono text-[#555]">
              <div className="flex flex-col items-center w-full md:w-auto">
                <div className="w-8 h-8 rounded-full border border-[#333] flex items-center justify-center mb-2">01</div>
                <span>DISCOVERY</span>
              </div>
              <div className="hidden md:block h-[1px] flex-1 bg-[#222] mx-4"></div>
              <div className="flex flex-col items-center text-white w-full md:w-auto">
                <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center mb-2 bg-white text-black">02</div>
                <span>AUDIT</span>
              </div>
              <div className="hidden md:block h-[1px] flex-1 bg-[#222] mx-4"></div>
              <div className="flex flex-col items-center w-full md:w-auto">
                <div className="w-8 h-8 rounded-full border border-[#333] flex items-center justify-center mb-2">03</div>
                <span>DECISION</span>
              </div>
              <div className="hidden md:block h-[1px] flex-1 bg-[#222] mx-4"></div>
              <div className="flex flex-col items-center w-full md:w-auto">
                <div className="w-8 h-8 rounded-full border border-[#333] flex items-center justify-center mb-2">04</div>
                <span>IMPORT</span>
              </div>
            </div>
          </div>
        </section>

        <section className="md:col-span-3 bg-[#0a0a0a] p-6 border-t md:border-t-0 md:border-l border-[#1a1a1a]">
          <div className="space-y-8">
            <article>
              <h5 className="text-[10px] uppercase tracking-widest text-[#666] mb-3">Baseline Hierarchy</h5>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-[10px] font-mono text-[#444] mr-3 mt-1">01</div>
                  <p className="text-xs text-[#999] leading-relaxed">Runtime Validation Overrides Documentation</p>
                </div>
                <div className="flex items-start">
                  <div className="text-[10px] font-mono text-[#444] mr-3 mt-1">02</div>
                  <p className="text-xs text-[#999] leading-relaxed">Preserve Behavior Before Optimization</p>
                </div>
                <div className="flex items-start">
                  <div className="text-[10px] font-mono text-[#444] mr-3 mt-1">03</div>
                  <p className="text-xs text-[#999] leading-relaxed">Knowledge Layer Isolation (Family Authority)</p>
                </div>
              </div>
            </article>
            
            <article className="p-4 border border-[#222] rounded bg-[#0d0d0d]">
              <h5 className="text-[10px] uppercase tracking-widest text-white mb-2">Academic Timeline</h5>
              <div className="space-y-2 text-[10px] font-mono">
                <div className="flex justify-between">
                  <span className="text-[#555]">AGE 19</span>
                  <span className="text-[#888]">Sophomore</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555]">AGE 22</span>
                  <span className="text-[#888]">Graduate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555]">AGE 25</span>
                  <span className="text-[#888]">Early Career</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555]">AGE 31</span>
                  <span className="text-[#00ff41]">Marriage</span>
                </div>
              </div>
            </article>
          </div>
          <div className="mt-12 opacity-10 grayscale overflow-hidden h-40 hidden md:block">
            <div className="text-[60px] font-serif leading-none rotate-12 -ml-8">SVARTULFR</div>
          </div>
        </section>
      </main>

      <footer className="h-12 border-t border-[#1a1a1a] px-4 md:px-8 flex items-center justify-between bg-[#080808] text-[10px] font-mono text-[#444] w-full">
        <div className="truncate mr-4">CURRENT VALIDATION: LA_ONLYHUMAN_ACADEMIC_TIMELINE</div>
        <div className="hidden md:flex space-x-6">
          <span>STABILIZATION: 100%</span>
          <span>SYSTEMS: SKELETON</span>
          <span>COMMIT: SV-BSTR-01</span>
        </div>
      </footer>
    </div>
  );
}
