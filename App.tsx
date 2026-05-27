/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import DialogueSection from './DialogueSection';
import GamesHub from './GamesHub';
import { TENSE_EXPLANATIONS } from './data';
import { PlayerState, TenseType } from './types';
import { 
  Award, Sparkles, BookOpen, Settings, Zap, Compass, RotateCcw, 
  HelpCircle, Star, Users, Flame, UserCheck, ShieldQuestion 
} from 'lucide-react';

export default function App() {
  // Two Player score states
  const [player1, setPlayer1] = useState<PlayerState>({ name: 'ԳՈՌ (GOR)', score: 1250 });
  const [player2, setPlayer2] = useState<PlayerState>({ name: 'ԳԱՅԱՆԵ (GAYANE)', score: 1400 });
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);

  // Active navigation tab (Games vs Dialogue & Grammar explanations)
  const [activeTab, setActiveTab] = useState<'games' | 'dialogue' | 'grammar'>('games');

  const [renameP1, setRenameP1] = useState<string>('');
  const [renameP2, setRenameP2] = useState<string>('');
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const resetScores = () => {
    setPlayer1(prev => ({ ...prev, score: 0 }));
    setPlayer2(prev => ({ ...prev, score: 0 }));
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex flex-col justify-between selection:bg-[#FF5A5F]/20">
      
      {/* HEADER SECTION (Matching theme HTML title and header bar) */}
      <header className="h-[70px] bg-white border-b border-[#EBEBEB] flex items-center justify-between px-4 sm:px-8 shadow-sm shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF5A5F] rounded-xl flex items-center justify-center text-white font-black text-xl animate-pulse">
            ES
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#FF5A5F] leading-none tracking-tight">
              ISPANAREN LABORATORY
            </h1>
            <p className="text-[10px] text-gray-400 font-extrabold uppercase mt-1 tracking-widest hidden sm:block">
              Սովորում ենք Իսպաներեն Անցյալ Ժամանակները
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="bg-[#EBEBEB] text-[#484848] text-[10px] sm:text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider hidden md:block">
            Modo: 2 Jugadores / 2 Խաղացող
          </div>
          
          <button 
            onClick={() => setIsSettingOpen(!isSettingOpen)}
            className="p-2 bg-stone-50 border border-[#EBEBEB] rounded-xl hover:bg-stone-100 text-[#484848] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Կարգավորումներ</span>
          </button>
        </div>
      </header>

      {/* RENAME MODAL PANEL FOR CUSTOMIZING PLAYERS */}
      {isSettingOpen && (
        <div className="bg-[#FF5A5F]/5 border-b border-[#FF5A5F]/20 p-4 transition-all animate-fade-in font-sans">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-stone-500">P1 Անուն՝</span>
                <input 
                  type="text" 
                  value={renameP1}
                  placeholder={player1.name}
                  onChange={(e) => setRenameP1(e.target.value)}
                  className="bg-white border border-[#EBEBEB] rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#FF5A5F] font-bold text-stone-700"
                />
                <button 
                  onClick={() => { if (renameP1.trim()) { setPlayer1(p => ({ ...p, name: renameP1.toUpperCase() })); setRenameP1(''); } }}
                  className="bg-[#FF5A5F] text-white text-[10px] font-black px-2 py-1 rounded-md"
                >
                  Պահպանել
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-stone-500">P2 Անուն՝</span>
                <input 
                  type="text" 
                  value={renameP2}
                  placeholder={player2.name}
                  onChange={(e) => setRenameP2(e.target.value)}
                  className="bg-white border border-[#EBEBEB] rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#00A699] font-bold text-stone-700"
                />
                <button 
                  onClick={() => { if (renameP2.trim()) { setPlayer2(p => ({ ...p, name: renameP2.toUpperCase() })); setRenameP2(''); } }}
                  className="bg-[#00A699] text-white text-[10px] font-black px-2 py-1 rounded-md"
                >
                  Պահպանել
                </button>
              </div>
            </div>

            <button 
              onClick={resetScores}
              className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Զրոյացնել Միավորները
            </button>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* UPPER TAB NAVIGATION SWITCH */}
        <div className="flex justify-center">
          <div className="bg-white border border-[#EBEBEB] p-1.5 rounded-2xl flex shadow-sm">
            <button
              onClick={() => setActiveTab('games')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'games'
                  ? 'bg-[#FF5A5F] text-white shadow-md'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Zap className="w-4 h-4" />
              10 Խաղեր (Games Lab)
            </button>
            <button
              onClick={() => setActiveTab('dialogue')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'dialogue'
                  ? 'bg-[#00A699] text-white shadow-md'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Compass className="w-4 h-4" />
              Երկխոսություն & Վերլուծություն
            </button>
            <button
              onClick={() => setActiveTab('grammar')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'grammar'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Անցյալ Ժամանակներ (Grammar)
            </button>
          </div>
        </div>

        {/* TAB CONTENTS */}
        <div>
          {/* TAB 1: 10 ACTIVE INTERACTIVE GAMES */}
          {activeTab === 'games' && (
            <div className="animate-fade-in">
              <GamesHub 
                player1={player1} 
                player2={player2} 
                setPlayer1={setPlayer1} 
                setPlayer2={setPlayer2} 
                activePlayer={activePlayer} 
                setActivePlayer={setActivePlayer} 
              />
            </div>
          )}

          {/* TAB 2: INTERACTIVE CLICKABLE DIALOGUE */}
          {activeTab === 'dialogue' && (
            <div className="animate-fade-in space-y-6">
              <DialogueSection />
            </div>
          )}

          {/* TAB 3: SPANISH PAST TENSES GRAMMAR CARDS */}
          {activeTab === 'grammar' && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-white border border-[#EBEBEB] rounded-3xl p-6 shadow-sm">
                <div className="mb-6">
                  <span className="text-[10px] font-black text-[#00A699] uppercase tracking-widest bg-[#00A699]/10 px-3 py-1 rounded-md">
                    Քերականական Ուղեցույց
                  </span>
                  <h3 className="text-2xl font-black text-stone-800 mt-2 tracking-tight">
                    Իսպաներենի 4 Անցյալ Ժամանակները
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Մանրամասն բացատրություն, բանաձևեր և կիրառության կանոններ հատուկ երեխաների համար` հայերեն թարգմանությամբ:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(TENSE_EXPLANATIONS).map(([key, item]) => {
                    const isPlus = key === 'pluscuamperfecto';
                    return (
                      <div 
                        key={key} 
                        className={`border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                          isPlus 
                            ? 'border-[#FF5A5F]/30 bg-[#FF5A5F]/5' 
                            : 'border-[#EBEBEB] bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide ${
                              isPlus ? 'bg-[#FF5A5F] text-white' : 'bg-stone-100 text-stone-700'
                            }`}>
                              {key}
                            </span>
                            {isPlus && <span className="text-[10px] font-bold text-[#FF5A5F] uppercase tracking-wider">🌟 SPECIAL</span>}
                          </div>

                          <h4 className="text-base font-extrabold text-[#484848] tracking-tight">
                            {item.titleArm}
                          </h4>
                          <span className="text-xs italic text-gray-400 font-medium block mt-0.5">
                            {item.titleEsp}
                          </span>

                          <div className="my-4 bg-stone-900 text-white rounded-xl p-3 text-center">
                            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">ԲԱՆԱՁԵՎԸ</span>
                            <code className="text-xs sm:text-sm font-mono font-medium text-amber-200 mt-0.5 block break-all">
                              {item.formula}
                            </code>
                          </div>

                          <p className="text-xs text-stone-600 leading-relaxed pt-1">
                            {item.useArm}
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-dashed border-[#EBEBEB]">
                          <span className="text-[10px] font-black text-[#00A699] uppercase tracking-wider block mb-1.5">Օրինակներ՝</span>
                          <ul className="space-y-1.5">
                            {item.examples.map((ex, idx) => (
                              <li key={idx} className="text-xs text-[#484848] flex items-start gap-2 bg-stone-50 p-2 rounded-lg border border-stone-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00A699] mt-1.5 shrink-0" />
                                <span className="font-semibold">{ex}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

      </main>

      {/* FOOTER ACTION PROGRESS BAR (Highly polished visual spec, matching theme style) */}
      <footer className="h-[75px] bg-white border-t border-[#EBEBEB] flex items-center justify-between px-4 sm:px-8 shrink-0 sticky bottom-0 z-50">
        
        {/* Player 1 panel */}
        <div id="p1-hud" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#FF5A5F] border-2 border-[#FF5A5F] flex items-center justify-center text-white font-black text-sm shadow-md ring-2 ring-offset-2 ring-[#FF5A5F]/20">
            G
          </div>
          <div>
            <div className="text-[9px] font-black text-stone-500 tracking-wider">
              {player1.name} (P1)
            </div>
            <div className="text-xs sm:text-base font-black text-[#FF5A5F]">
              {player1.score.toLocaleString()} PTS
            </div>
          </div>
        </div>

        {/* Center state progress HUD */}
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
            Ակտիվ Մակարդակ
          </span>
          <span className="text-xs sm:text-sm font-black text-[#484848] font-mono">
            LEVEL 04 / 10
          </span>
        </div>

        {/* Player 2 panel */}
        <div id="p2-hud" className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[9px] font-black text-stone-500 tracking-wider">
              {player2.name} (P2)
            </div>
            <div className="text-xs sm:text-base font-black text-[#00A699]">
              {player2.score.toLocaleString()} PTS
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#00A699] border-2 border-[#00A699] flex items-center justify-center text-white font-black text-sm shadow-md ring-2 ring-offset-2 ring-[#00A699]/20">
            G
          </div>
        </div>

      </footer>

    </div>
  );
}
