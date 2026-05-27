/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DIALOGUE_DATA } from './data';
import { DialogueLine } from './types';
import { BookOpen, HelpCircle, ChevronRight, MessageSquare, Info, Star } from 'lucide-react';

interface DialogueSectionProps {
  onHighlightVerb?: (verb: string) => void;
}

export default function DialogueSection({ onHighlightVerb }: DialogueSectionProps) {
  const [selectedLine, setSelectedLine] = useState<DialogueLine | null>(DIALOGUE_DATA[1]); // Default to show line 2 (Pluscuamperfecto example)

  return (
    <div id="dialogue-section" className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-orange-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
            Թեմա — Pluscuamperfecto (Վաղակատար անցյալ)
          </span>
          <h2 className="text-2xl font-bold text-gray-800 mt-2 font-sans tracking-tight">
            Գոռ և Գայանե — եղբայր ու քույր
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Կտտացրու ցանկացած նախադասության վրա՝ թարգմանությունը և քերականական բացատրությունը տեսնելու համար։
          </p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1 bg-amber-50 text-amber-700 text-xs px-3 py-1.5 rounded-lg border border-amber-200">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            Սեղմելու հնարավորություն
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Dialogue Bubble Stream */}
        <div className="lg:col-span-7 space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {DIALOGUE_DATA.map((line) => {
            const isGor = line.speaker === 'Gor';
            const isSelected = selectedLine?.id === line.id;
            
            return (
              <div
                key={line.id}
                id={`dialogue-line-${line.id}`}
                onClick={() => setSelectedLine(line)}
                className={`group flex items-start gap-3 p-3.5 rounded-2xl cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'bg-amber-100/95 shadow-md border-2 border-amber-400 translate-x-1' 
                    : 'bg-stone-50 hover:bg-orange-50/70 border border-stone-200/60'
                }`}
              >
                {/* Speaker Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${
                  isGor
                    ? 'bg-orange-200 text-orange-800 border border-orange-300'
                    : 'bg-emerald-200 text-emerald-800 border border-emerald-300'
                }`}>
                  {isGor ? 'Գոռ' : 'Գայ'}
                </div>

                {/* Bubble Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-xs font-bold ${isGor ? 'text-orange-700' : 'text-emerald-700'}`}>
                      {isGor ? 'Gor (Գոռ)' : 'Gayane (Գայանե)'}
                    </span>
                    <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Բացատրություն 💡
                    </span>
                  </div>
                  <p className="text-gray-800 font-medium text-sm md:text-base font-sans leading-relaxed">
                    {line.textEsp}
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm mt-1 border-t border-gray-100 pt-1 font-sans">
                    {line.textArm}
                  </p>
                </div>
                
                <div className="self-center text-gray-400 group-hover:text-amber-500 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Grammatical Breakdown Drawer */}
        <div className="lg:col-span-5">
          {selectedLine ? (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl p-5 border border-amber-200 shadow-sm sticky top-4">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm uppercase mb-3 tracking-wide">
                <BookOpen className="w-4 h-4 text-orange-500" />
                <span>Մանրակրկիտ Վերլուծություն</span>
              </div>
              
              <div className="space-y-4">
                {/* Spanish sentence & Armenian Translation */}
                <div>
                  <h3 className="text-xs text-gray-400 font-medium uppercase">Իսպաներեն Նախադասություն</h3>
                  <p className="text-lg font-bold text-slate-800 mt-0.5">{selectedLine.explanationArm.title}</p>
                </div>

                <div>
                  <h3 className="text-xs text-gray-400 font-medium uppercase">Հայերեն Թարգմանություն</h3>
                  <p className="text-base font-semibold text-amber-900 mt-0.5">{selectedLine.explanationArm.translation}</p>
                </div>

                {/* Structure formula */}
                <div className="bg-white/90 rounded-xl p-3 border border-amber-200/70">
                  <h4 className="text-xs text-amber-800 font-bold uppercase mb-1 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-amber-500" />
                    Կառուցվածքային Բանաձև
                  </h4>
                  <p className="text-sm font-mono text-slate-700 font-medium break-all">{selectedLine.explanationArm.structure}</p>
                </div>

                {/* Words Breakdown list */}
                <div>
                  <h4 className="text-xs text-gray-400 font-medium uppercase mb-2">Բառ առ Բառ Բացատրություն</h4>
                  <ul className="space-y-1.5">
                    {selectedLine.explanationArm.breakdown.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 bg-white/40 p-2 rounded-lg border border-orange-100/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Extra grammatical notes */}
                {selectedLine.explanationArm.tenseInfo && (
                  <div className="border-t border-amber-200/50 pt-3">
                    <h4 className="text-xs text-orange-800 font-bold mb-1 flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                      Քերականական Կարևոր Նշում
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed bg-white/50 p-2.5 rounded-lg border border-amber-100">
                      {selectedLine.explanationArm.tenseInfo}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-stone-50 border border-stone-200 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
              <MessageSquare className="w-12 h-12 text-stone-300 mb-2" />
              <p className="text-stone-500 text-sm font-medium">
                Սեղմիր երկխոսության նախադասություններից մեկի վրա՝ կառուցվածքն ու բացատրությունը տեսնելու համար։
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tense Quick Formula Box for kids */}
      <div className="mt-8 bg-stone-900 text-amber-100 rounded-2xl p-5 shadow-inner flex flex-col md:flex-row items-center gap-4">
        <div className="bg-amber-400 text-stone-900 font-bold px-3 py-1.5 rounded-lg text-sm shrink-0 uppercase tracking-wider">
          💡 Շատ Պարզ Միտք
        </div>
        <p className="text-sm leading-relaxed text-slate-300">
          <strong className="text-white">Mamá había preparado una sopa</strong> նշանակում է՝ մայրիկը ապուրն արդեն պատրաստել էր ավելի շուտ (նախորդող անցյալ), իսկ հետո Գոռն ու Գայանեն եկան տուն (հաջորդող անցյալ)։
        </p>
      </div>
    </div>
  );
}
