/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Markdown from 'react-markdown';
import { useLorebooks } from './lib/useLorebooks';

export default function App() {
  const [openFolders, setOpenFolders] = useState({ core: true, engines: true });
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const { files: fileContents, loading, user, publishToFirebase } = useLorebooks();

  const toggleFolder = (folder: 'core' | 'engines') => {
    setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-[#d1d1d1] font-sans flex flex-col overflow-x-hidden select-none">
      <header className="h-16 border-b border-[#333333] flex flex-wrap md:flex-nowrap items-center justify-between px-4 md:px-8 bg-[#0A0A0A]">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-[#D4AF37] flex items-center justify-center rounded-sm shrink-0">
            <div className="w-4 h-4 bg-[#0A0A0A] rotate-45"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-serif font-semibold tracking-tight text-[#D4AF37] leading-none">SvartulfrVerse</h1>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#CD7F32] mt-1 font-mono">
              Active Runtime Canon Repository
            </span>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={publishToFirebase}
            className="text-[10px] uppercase tracking-widest text-[#0A0A0A] bg-[#CD7F32] hover:bg-[#D4AF37] px-3 py-1.5 rounded transition-colors"
          >
            {user ? 'Sync to Cloud' : 'Connect Cloud'}
          </button>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-[#CD7F32]">Phase Status</span>
            <span className="text-xs text-[#A5F2F3] font-mono">BOOTSTRAP_COMPLETE</span>
          </div>
          <div className="h-8 w-[1px] bg-[#333333]"></div>
          <div className="text-[11px] font-mono bg-[#2A3439] text-[#A5F2F3] px-3 py-1 border border-[#333333] rounded">
            HASH: 4f8b9a2
          </div>
        </div>
      </header>
      
      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-px bg-[#333333]">
        <section className="md:col-span-3 bg-[#0A0A0A] flex flex-col p-6">
          <div className="mb-8">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#CD7F32] mb-4">Core Directory</h2>
            <ul className="space-y-3 font-mono text-xs">
              <li 
                onClick={() => setActiveFile(activeFile === 'README.md' ? null : 'README.md')}
                className={`flex items-center cursor-pointer transition-colors ${activeFile === 'README.md' ? 'text-[#D4AF37] font-bold' : 'text-[#d1d1d1] hover:text-white'}`}
              >
                <span className="mr-2 opacity-30 text-[#CD7F32]">├─</span> README.md
              </li>
              <li className="flex flex-col space-y-2">
                <div 
                  onClick={() => toggleFolder('core')}
                  className="flex items-center text-[#d1d1d1] cursor-pointer hover:text-[#D4AF37] transition-colors"
                >
                  <span className="mr-2 opacity-30 text-[#CD7F32]">├─</span> 
                  <span className="mr-2 w-3 text-center">{openFolders.core ? '-' : '+'}</span> core/
                </div>
                {openFolders.core && (
                  <div className="pl-6 space-y-2 border-l border-[#333333] ml-[7px] animate-in slide-in-from-top-1 fade-in duration-200">
                    <div 
                      onClick={() => setActiveFile(activeFile === 'ADR-000_Baseline' ? null : 'ADR-000_Baseline')}
                      className={`cursor-pointer transition-colors ${activeFile === 'ADR-000_Baseline' ? 'text-[#A5F2F3] font-bold' : 'text-[#a1a1a1] hover:text-white'}`}
                    >ADR-000_Baseline</div>
                    <div 
                      onClick={() => setActiveFile(activeFile === 'ADR-001_Dynastic_Origins' ? null : 'ADR-001_Dynastic_Origins')}
                      className={`cursor-pointer transition-colors ${activeFile === 'ADR-001_Dynastic_Origins' ? 'text-[#A5F2F3] font-bold' : 'text-[#a1a1a1] hover:text-white'}`}
                    >ADR-001_Dynastic_Origins</div>
                    <div 
                      onClick={() => setActiveFile(activeFile === 'ADR-002_Family_Authority' ? null : 'ADR-002_Family_Authority')}
                      className={`cursor-pointer transition-colors ${activeFile === 'ADR-002_Family_Authority' ? 'text-[#A5F2F3] font-bold' : 'text-[#a1a1a1] hover:text-white'}`}
                    >ADR-002_Family_Authority</div>
                    <div 
                      onClick={() => setActiveFile(activeFile === 'ADR_002_Report' ? null : 'ADR_002_Report')}
                      className={`cursor-pointer transition-colors ${activeFile === 'ADR_002_Report' ? 'text-[#A5F2F3] font-bold' : 'text-[#a1a1a1] hover:text-white'}`}
                    >ADR_002_Report.md</div>
                    <div 
                      onClick={() => setActiveFile(activeFile === 'Architecture.md' ? null : 'Architecture.md')}
                      className={`cursor-pointer transition-colors ${activeFile === 'Architecture.md' ? 'text-[#A5F2F3] font-bold' : 'text-[#a1a1a1] hover:text-white'}`}
                    >Architecture.md</div>
                    <div 
                      onClick={() => setActiveFile(activeFile === 'Scope.md' ? null : 'Scope.md')}
                      className={`cursor-pointer transition-colors ${activeFile === 'Scope.md' ? 'text-[#A5F2F3] font-bold' : 'text-[#a1a1a1] hover:text-white'}`}
                    >Scope.md</div>
                  </div>
                )}
              </li>
              <li className="flex flex-col space-y-2 pt-2">
                <div 
                  onClick={() => toggleFolder('engines')}
                  className="flex items-center text-[#D4AF37] cursor-pointer hover:text-white transition-colors"
                >
                  <span className="mr-2 opacity-30 text-[#CD7F32]">└─</span> 
                  <span className="mr-2 w-3 text-center">{openFolders.engines ? '-' : '+'}</span> engines/
                </div>
                {openFolders.engines && (
                  <div className="pl-6 space-y-2 border-l border-[#333333] ml-[7px] animate-in slide-in-from-top-1 fade-in duration-200">
                    <div 
                      onClick={() => setActiveFile(activeFile === 'En_Core.js' ? null : 'En_Core.js')}
                      className={`opacity-80 italic cursor-pointer transition-opacity text-[#A5F2F3] ${activeFile === 'En_Core.js' ? 'opacity-100 font-bold' : 'hover:opacity-100'}`}
                    >En_Core.js</div>
                    <div 
                      onClick={() => setActiveFile(activeFile === 'state_engine.js' ? null : 'state_engine.js')}
                      className={`opacity-80 italic cursor-pointer transition-opacity text-[#A5F2F3] ${activeFile === 'state_engine.js' ? 'opacity-100 font-bold' : 'hover:opacity-100'}`}
                    >state_engine.js</div>
                    <div 
                      onClick={() => setActiveFile(activeFile === 'family_engine.js' ? null : 'family_engine.js')}
                      className={`opacity-80 italic cursor-pointer transition-opacity text-[#A5F2F3] ${activeFile === 'family_engine.js' ? 'opacity-100 font-bold' : 'hover:opacity-100'}`}
                    >family_engine.js</div>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div className="mt-8 md:mt-auto p-4 bg-[#0A0A0A] border border-[#3E2723] rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 text-[10px] text-[#3E2723] font-mono">FRZN</div>
            <div className="text-[10px] uppercase tracking-widest text-[#CD7F32] mb-2">Archival Source</div>
            <div className="text-xs font-serif italic text-[#D4AF37]">Progetti Repository</div>
            <div className="text-[9px] text-[#A5F2F3] mt-1 opacity-70">Status: Read-Only / Frozen</div>
          </div>
        </section>

        <section className="md:col-span-6 bg-[#0A0A0A] p-0 md:p-0 flex flex-col relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111] to-[#0A0A0A] opacity-30 pointer-events-none"></div>
          {activeFile && fileContents[activeFile] ? (
            <div className="relative flex flex-col h-full bg-[#0A0A0A] border-x border-[#333333]">
              <div className="px-6 py-4 bg-[#111111] border-b border-[#333333] flex items-center space-x-3">
                <span className="text-[#CD7F32] flex items-center justify-center w-4 h-4">
                  {fileContents[activeFile].type === 'js' ? '{;}' : '≡'}
                </span>
                <span className="text-[#D4AF37] font-mono text-sm tracking-wide">{fileContents[activeFile].title}</span>
                <button 
                  onClick={() => setActiveFile(null)} 
                  className="ml-auto text-[#777] hover:text-white transition-colors flex items-center justify-center w-6 h-6 rounded hover:bg-[#333333]"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 md:p-8 flex-1 overflow-auto">
                 {fileContents[activeFile].type === 'js' ? (
                   <div className="font-mono text-xs md:text-sm text-[#A5F2F3] bg-[#0A0A0A] overflow-x-auto text-left">
                     {fileContents[activeFile].content.split('\n').map((line, i) => (
                       <div key={i} className="flex">
                         <span className="w-8 text-right opacity-30 text-[#CD7F32] mr-4 shrink-0 select-none block">{i + 1}</span>
                         <span className="whitespace-pre">{line || ' '}</span>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="markdown-body text-left">
                     <Markdown
                       components={{
                         h1: ({node, ...props}) => <h1 className="text-2xl font-serif text-[#D4AF37] mb-4" {...props} />,
                         h2: ({node, ...props}) => <h2 className="text-xl font-serif text-[#D4AF37] mt-6 mb-3" {...props} />,
                         p: ({node, ...props}) => <p className="text-sm text-[#d1d1d1] mb-4 leading-relaxed" {...props} />,
                         ul: ({node, ...props}) => <ul className="list-disc pl-5 text-sm text-[#d1d1d1] mb-4 space-y-1" {...props} />,
                         li: ({node, ...props}) => <li className="marker:text-[#CD7F32]" {...props} />
                       }}
                     >
                       {fileContents[activeFile].content}
                     </Markdown>
                   </div>
                 )}
                 {fileContents[activeFile].type === 'md' && (
                   <div className="mt-8 pt-4 border-t border-[#333333] border-dashed text-[#777] text-[10px] uppercase tracking-widest text-right">
                     End of document
                   </div>
                 )}
              </div>
            </div>
          ) : (
            <div className="relative p-6 md:p-8 h-full flex flex-col">
              <div className="mb-10 text-center">
                <h3 className="font-serif text-3xl text-[#D4AF37] font-light tracking-tight italic mb-2">Los Angeles Dynasty</h3>
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto opacity-50"></div>
                <p className="text-xs text-[#CD7F32] mt-4 uppercase tracking-[0.2em]">Only Human | Contemporary</p>
              </div>
              
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="p-6 border border-[#3E2723] bg-[#0A0A0A] relative overflow-hidden shadow-[0_0_15px_rgba(62,39,35,0.2)]">
                  <div className="absolute top-0 right-0 p-2 text-[10px] text-[#D4AF37] opacity-30 font-mono">D-B LINE</div>
                  <h4 className="font-serif text-lg text-[#D4AF37] mb-4">Dynastic Union</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-[#333333] pb-1">
                      <span className="text-[#CD7F32]">Matriarch</span>
                      <span className="text-[#d1d1d1]">Nixara Bloodmoon</span>
                    </div>
                    <div className="flex justify-between border-b border-[#333333] pb-1 border-transparent">
                      <span className="text-[#CD7F32]">Patriarch</span>
                      <span className="text-[#d1d1d1]">Erik Douglas</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border border-[#333333] bg-[#0A0A0A]">
                  <h4 className="font-serif text-lg text-[#D4AF37] mb-4 italic">First Generation Heirs</h4>
                  <ul className="text-xs space-y-2 text-[#d1d1d1] font-mono">
                    <li><span className="text-[#CD7F32] mr-2">•</span> Malachia D.B.</li>
                    <li><span className="text-[#CD7F32] mr-2">•</span> Noah D.B.</li>
                    <li><span className="text-[#CD7F32] mr-2">•</span> Jasper D.B.</li>
                    <li><span className="text-[#CD7F32] mr-2">•</span> Alyssa D.B.</li>
                  </ul>
                </div>
              </div>
              
              <div className="relative flex-1 border-t border-[#333333] pt-8">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#CD7F32] mb-6 text-center">Canon Recovery Workflow</h4>
                <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-0 items-center justify-between px-2 md:px-4 text-[10px] font-mono text-[#a1a1a1]">
                  <div className="flex flex-col items-center w-full md:w-auto">
                    <div className="w-8 h-8 rounded-full border border-[#3E2723] flex items-center justify-center mb-2 text-[#CD7F32]">01</div>
                    <span>DISCOVERY</span>
                  </div>
                  <div className="hidden md:block h-[1px] flex-1 bg-[#333333] mx-4"></div>
                  <div className="flex flex-col items-center text-[#0A0A0A] w-full md:w-auto">
                    <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center mb-2 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.3)]">02</div>
                    <span className="text-[#D4AF37]">AUDIT</span>
                  </div>
                  <div className="hidden md:block h-[1px] flex-1 bg-[#333333] mx-4"></div>
                  <div className="flex flex-col items-center w-full md:w-auto">
                    <div className="w-8 h-8 rounded-full border border-[#333333] flex items-center justify-center mb-2 text-[#777]">03</div>
                    <span>DECISION</span>
                  </div>
                  <div className="hidden md:block h-[1px] flex-1 bg-[#333333] mx-4"></div>
                  <div className="flex flex-col items-center w-full md:w-auto">
                    <div className="w-8 h-8 rounded-full border border-[#333333] flex items-center justify-center mb-2 text-[#777]">04</div>
                    <span>IMPORT</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="md:col-span-3 bg-[#0A0A0A] p-6 border-t md:border-t-0 md:border-l border-[#333333]">
          <div className="space-y-8 relative z-10">
            <article>
              <h5 className="text-[10px] uppercase tracking-widest text-[#CD7F32] mb-3">Baseline Hierarchy</h5>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-[10px] font-mono text-[#D4AF37] mr-3 mt-1">01</div>
                  <p className="text-xs text-[#d1d1d1] leading-relaxed">Runtime Validation Overrides Documentation</p>
                </div>
                <div className="flex items-start">
                  <div className="text-[10px] font-mono text-[#D4AF37] mr-3 mt-1">02</div>
                  <p className="text-xs text-[#d1d1d1] leading-relaxed">Preserve Behavior Before Optimization</p>
                </div>
                <div className="flex items-start">
                  <div className="text-[10px] font-mono text-[#D4AF37] mr-3 mt-1">03</div>
                  <p className="text-xs text-[#d1d1d1] leading-relaxed">Knowledge Layer Isolation (Family Authority)</p>
                </div>
              </div>
            </article>
            
            <article className="p-4 border border-[#3E2723] rounded bg-[#0A0A0A] shadow-[0_0_15px_rgba(62,39,35,0.1)]">
              <h5 className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-3 border-b border-[#333333] pb-2">Academic Timeline</h5>
              <div className="space-y-3 text-[10px] font-mono mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#CD7F32]">AGE 19</span>
                  <span className="text-[#a1a1a1]">Sophomore</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#CD7F32]">AGE 22</span>
                  <span className="text-[#a1a1a1]">Graduate</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#CD7F32]">AGE 25</span>
                  <span className="text-[#a1a1a1]">Early Career</span>
                </div>
                <div className="flex justify-between items-center bg-[#3E2723] bg-opacity-30 -mx-2 px-2 py-1 rounded">
                  <span className="text-[#D4AF37] font-semibold">AGE 31</span>
                  <span className="text-[#FFBF00]">Marriage</span>
                </div>
              </div>
            </article>
          </div>
          <div className="mt-12 opacity-10 overflow-hidden h-40 hidden md:block relative pointer-events-none">
            <div className="text-[60px] font-serif leading-none rotate-12 -ml-8 text-[#3E2723] font-bold">SVARTULFR</div>
          </div>
        </section>
      </main>

      <footer className="h-12 border-t border-[#333333] px-4 md:px-8 flex items-center justify-between bg-[#0A0A0A] text-[10px] font-mono text-[#CD7F32] w-full">
        <div className="truncate mr-4 opacity-80">CURRENT VALIDATION: LA_ONLYHUMAN_ACADEMIC_TIMELINE</div>
        <div className="hidden md:flex space-x-6 opacity-60 text-[#a1a1a1]">
          <span>STABILIZATION: <span className="text-[#D4AF37]">100%</span></span>
          <span>SYSTEMS: <span className="text-[#A5F2F3]">SKELETON</span></span>
          <span>COMMIT: SV-BSTR-01</span>
        </div>
      </footer>
    </div>
  );
}
