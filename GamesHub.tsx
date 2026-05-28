/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TenseType, PlayerState, GameDefinition 
} from './types';
import { 
  IRREGULAR_PARTICIPLES, TIME_TRIGGERS, PLUSCUAMPERFECTO_BUILDER_DATA,
  VERB_MATCH_ITEMS, BATTLE_QUESTIONS, RECIPE_STEPS, STORY_SLIDES,
  CONJUGATE_CHALLENGES, MEMORY_CARDS_BASE, TENSE_EXPLANATIONS
} from './data';
import { 
  Award, RefreshCw, Sparkles, Check, X, Swords, Trophy, Users, User, ArrowRight,
  Flame, Zap, Compass, HelpCircle, Star, Heart, FileText, CheckCircle2, RotateCcw
} from 'lucide-react';

interface GamesHubProps {
  player1: PlayerState;
  player2: PlayerState;
  setPlayer1: React.Dispatch<React.SetStateAction<PlayerState>>;
  setPlayer2: React.Dispatch<React.SetStateAction<PlayerState>>;
  activePlayer: 1 | 2;
  setActivePlayer: React.Dispatch<React.SetStateAction<1 | 2>>;
}

const GAMES: GameDefinition[] = [
  {
    id: 1,
    titleArm: 'Բայի Զույգեր',
    titleEsp: 'Parejas de Verbos',
    icon: '🧩',
    descriptionArm: 'Միացրու իսպաներեն անցյալի բայաձևը իր ճիշտ հայերեն թարգմանության հետ։',
    descriptionEsp: 'Une las conjugaciones en pasado con su respectiva traducción.'
  },
  {
    id: 2,
    titleArm: 'Խուզարկու Գոռ',
    titleEsp: 'Detective Gor',
    icon: '🕵️‍♂️',
    descriptionArm: 'Կառուցիր Pluscuamperfecto ժամանակը՝ միացնելով Haber օժանդակ բայը և հիմնական բայի Participio-ն։',
    descriptionEsp: 'Construye el Pluscuamperfecto uniendo el verbo auxiliar Haber y el participio.'
  },
  {
    id: 3,
    titleArm: 'Դինո Ճակատամարտ',
    titleEsp: 'Batalla de Dinos',
    icon: '🦖',
    descriptionArm: 'Imperfecto թե՞ Indefinido: Ընտրիր ճիշտ տարբերակը և օգնիր քո դինոզավրին հաղթել։',
    descriptionEsp: '¿Imperfecto o Indefinido? ¡Elige bien para ayudar a tu dinosaurio!'
  },
  {
    id: 4,
    titleArm: 'Փուչիկների Պայթյուն',
    titleEsp: 'Explosión de Globos',
    icon: '🎈',
    descriptionArm: 'Պայթեցրու սխալ ձևերը (օր․՝ escribido) և պահիր միայն ճիշտ անկանոն participio-ները (օր․՝ escrito)։',
    descriptionEsp: 'Explota las formas incorrectas y quédate con los participios correctos.'
  },
  {
    id: 5,
    titleArm: 'Մայրիկի Գաղտնի Ապուրը',
    titleEsp: 'Receta Secreta',
    icon: '🍲',
    descriptionArm: 'Օգնիր Գայանեին պատրաստել համեղ ապուրը՝ լրացնելով բաղադրատոմսի Pretérito Perfecto քայլերը։',
    descriptionEsp: 'Ayuda a Gayane con los pasos de la receta en Pretérito Perfecto.'
  },
  {
    id: 6,
    titleArm: 'Ժամանակի Ճանապարհորդ',
    titleEsp: 'Túnel del Tiempo',
    icon: '⏳',
    descriptionArm: 'Դասավորիր բանալի բառերը (Ayer, Hoy, Antes...) իրենց համապատասխան անցյալ ժամանակների մեջ։',
    descriptionEsp: 'Clasifica los marcadores temporales según el tiempo pasado correcto.'
  },
  {
    id: 7,
    titleArm: 'Թարգմանչական Դուել',
    titleEsp: 'Duelo de Traducción',
    icon: '⚔️',
    descriptionArm: 'Երկու խաղացողների մրցավազք։ Արագ թարգմանիր նախադասությունները և հավաքիր միավորներ։',
    descriptionEsp: 'Batalla veloz cara a cara para traducir oraciones del diálogo.'
  },
  {
    id: 8,
    titleArm: 'Գոռի Պատմությունը',
    titleEsp: 'Historia de Gor',
    icon: '📖',
    descriptionArm: 'Լրացրու պատմության դատարկ տեղերը՝ տիրապետելով անցյալ ժամանակների ճիշտ կիրառմանը։',
    descriptionEsp: 'Completa la historia eligiendo el verbo correcto en su contexto escolar.'
  },
  {
    id: 9,
    titleArm: 'Խոնարհման Չեմպիոն',
    titleEsp: 'Campeón de Conjugación',
    icon: '🏆',
    descriptionArm: 'Արագ արձագանքիր տարբերակներին և ապացուցիր, որ խոնարհման իսկական չեմպիոն ես։',
    descriptionEsp: 'Trivia rápida de conjugaciones entre todos los tiempos pasados.'
  },
  {
    id: 10,
    titleArm: 'Հիշողության Քարտեր',
    titleEsp: 'Cartas de Memoria',
    icon: '🃏',
    descriptionArm: 'Մարզիր հիշողությունդ՝ գտնելով իսպաներեն բայաձևերի և հայերեն թարգմանությունների զույգերը։',
    descriptionEsp: 'Encuentra las parejas de cartas en español y armenio con menos intentos.'
  }
];

export default function GamesHub({ 
  player1, player2, setPlayer1, setPlayer2, activePlayer, setActivePlayer 
}: GamesHubProps) {
  const [selectedGameId, setSelectedGameId] = useState<number>(1);
  const [feedback, setFeedback] = useState<{ success: boolean; msg: string } | null>(null);
  const [streak, setStreak] = useState<number>(0);

  // Awards/Points helper
  const addPoints = (amount: number) => {
    if (activePlayer === 1) {
      setPlayer1(prev => ({ ...prev, score: prev.score + amount }));
    } else {
      setPlayer2(prev => ({ ...prev, score: prev.score + amount }));
    }
    setStreak(prev => prev + 1);
  };

  const resetStreak = () => {
    setStreak(0);
  };

  // State for Game 1: Verb Matcher
  const [g1LeftSelected, setG1LeftSelected] = useState<string | null>(null);
  const [g1RightSelected, setG1RightSelected] = useState<string | null>(null);
  const [g1Matches, setG1Matches] = useState<string[]>([]); // matched spanish words
  const [g1ShuffledLeft, setG1ShuffledLeft] = useState<typeof VERB_MATCH_ITEMS>([]);
  const [g1ShuffledRight, setG1ShuffledRight] = useState<typeof VERB_MATCH_ITEMS>([]);

  // State for Game 2: Pluscuamperfecto builder
  const [g2Round, setG2Round] = useState<number>(0);
  const [g2SelectedHaber, setG2SelectedHaber] = useState<string | null>(null);
  const [g2SelectedPart, setG2SelectedPart] = useState<string | null>(null);

  // State for Game 3: Dino Battle
  const [g3Round, setG3Round] = useState<number>(0);
  const [dinoHealth, setDinoHealth] = useState<number>(100);
  const [monsterHealth, setMonsterHealth] = useState<number>(100);

  // State for Game 4: Balloon Popper
  const [g4Balloons, setG4Balloons] = useState<typeof IRREGULAR_PARTICIPLES>([]);
  const [g4Popped, setG4Popped] = useState<string[]>([]); // correct ones collected
  const [g4Failed, setG4Failed] = useState<string[]>([]); // incorrect ones popped by mistake

  // State for Game 5: Mom's Recipe
  const [g5Step, setG5Step] = useState<number>(0);

  // State for Game 6: Trigger Words Sort
  const [g6Words, setG6Words] = useState<typeof TIME_TRIGGERS>([]);
  const [g6CurrentWordIdx, setG6CurrentWordIdx] = useState<number>(0);
  const [g6Score, setG6Score] = useState<number>(0);

  // State for Game 7: Translation Duel
  const [g7Turn, setG7Turn] = useState<1 | 2>(1);
  const [g7QuestionIdx, setG7QuestionIdx] = useState<number>(0);
  const [g7Selections, setG7Selections] = useState<string[]>([]);
  const [g7Points, setG7Points] = useState({ p1: 0, p2: 0 });

  // State for Game 8:story slides
  const [g8Slide, setG8Slide] = useState<number>(0);

  // State for Game 9: Conjugator Pro
  const [g9QuestionIdx, setG9QuestionIdx] = useState<number>(0);

  // State for Game 10: Memory MATCH
  const [memoryCards, setMemoryCards] = useState<{ id: number; text: string; matchKey: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState<number>(0);

  // Init/Reset triggers for game changes
  useEffect(() => {
    setFeedback(null);
    setStreak(0);
    
    // Game 1 Init
    const rawLeft = [...VERB_MATCH_ITEMS].sort(() => Math.random() - 0.5);
    const rawRight = [...VERB_MATCH_ITEMS].sort(() => Math.random() - 0.5);
    setG1ShuffledLeft(rawLeft);
    setG1ShuffledRight(rawRight);
    setG1Matches([]);
    setG1LeftSelected(null);
    setG1RightSelected(null);

    // Game 2 Init
    setG2Round(0);
    setG2SelectedHaber(null);
    setG2SelectedPart(null);

    // Game 3 Init
    setG3Round(0);
    setDinoHealth(100);
    setMonsterHealth(100);

    // Game 4 Init
    const balloonsData = [...IRREGULAR_PARTICIPLES].sort(() => Math.random() - 0.5);
    setG4Balloons(balloonsData);
    setG4Popped([]);
    setG4Failed([]);

    // Game 5 Init
    setG5Step(0);

    // Game 6 Init
    setG6Words([...TIME_TRIGGERS].sort(() => Math.random() - 0.5));
    setG6CurrentWordIdx(0);
    setG6Score(0);

    // Game 7 Init
    setG7QuestionIdx(0);
    setG7Points({ p1: 0, p2: 0 });

    // Game 8 Init
    setG8Slide(0);

    // Game 9 Init
    setG9QuestionIdx(0);

    // Game 10 Init
    const initialCards = [...MEMORY_CARDS_BASE]
      .sort(() => Math.random() - 0.5)
      .map((c, idx) => ({
        id: idx,
        text: c.text,
        matchKey: c.matchKey,
        isFlipped: false,
        isMatched: false
      }));
    setMemoryCards(initialCards);
    setSelectedCards([]);
    setMemoryMoves(0);

  }, [selectedGameId]);

  // Game 1: Verbs Matching Logic
  const handleG1Match = (leftWord: string | null, rightTrans: string | null) => {
    const lValue = leftWord || g1LeftSelected;
    const rValue = rightTrans || g1RightSelected;

    if (lValue && rValue) {
      // Find matching item
      const matchedItem = VERB_MATCH_ITEMS.find(item => item.word === lValue && item.trans === rValue);
      if (matchedItem) {
        setG1Matches(prev => [...prev, lValue]);
        addPoints(100);
        setFeedback({ success: true, msg: 'Ճիշտ է! ¡Excelente!' });
      } else {
        resetStreak();
        setFeedback({ success: false, msg: 'Փորձիր կրկին։ Սխալ զույգ է։' });
      }
      setG1LeftSelected(null);
      setG1RightSelected(null);
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  // Game 2: Pluscuamperfecto Builder logic
  const handleG2Choice = (type: 'haber' | 'part', value: string) => {
    if (type === 'haber') {
      setG2SelectedHaber(value);
    } else {
      setG2SelectedPart(value);
    }
  };

  useEffect(() => {
    if (g2SelectedHaber && g2SelectedPart) {
      const currentRoundData = PLUSCUAMPERFECTO_BUILDER_DATA[g2Round];
      const selectedConjugation = `${g2SelectedHaber} ${g2SelectedPart}`;
      
      if (selectedConjugation === currentRoundData.correct) {
        addPoints(150);
        setFeedback({ 
          success: true, 
          msg: `Հրաշալի է! "Había" + "${currentRoundData.participio}" = ${currentRoundData.correct} (Pluscuamperfecto)` 
        });
        setTimeout(() => {
          setG2SelectedHaber(null);
          setG2SelectedPart(null);
          setFeedback(null);
          if (g2Round < PLUSCUAMPERFECTO_BUILDER_DATA.length - 1) {
            setG2Round(prev => prev + 1);
          } else {
            setG2Round(0); // loop or finish
          }
        }, 3000);
      } else {
        resetStreak();
        setFeedback({ success: false, msg: `Ոչ, ${currentRoundData.subject}-ի համար օժանդակ բայը և participio-ն այլ կերպ են միանում։` });
        setTimeout(() => {
          setG2SelectedHaber(null);
          setG2SelectedPart(null);
          setFeedback(null);
        }, 3000);
      }
    }
  }, [g2SelectedHaber, g2SelectedPart]);

  // Game 3: Dino Battle Logic
  const handleG3Answer = (option: string) => {
    const currentQ = BATTLE_QUESTIONS[g3Round];
    if (option === currentQ.correct) {
      addPoints(200);
      setMonsterHealth(prev => Math.max(0, prev - 34));
      setFeedback({ success: true, msg: `Ճիշտ է! ${currentQ.reasonArm}` });
    } else {
      resetStreak();
      setDinoHealth(prev => Math.max(0, prev - 25));
      setFeedback({ success: false, msg: `Սխալ է: ${currentQ.reasonArm}` });
    }

    setTimeout(() => {
      setFeedback(null);
      if (g3Round < BATTLE_QUESTIONS.length - 1) {
        setG3Round(prev => prev + 1);
      } else {
        // game finished or restarted
        if (monsterHealth <= 34) {
          setFeedback({ success: true, msg: 'ՀԱՂԹԱՆԱԿ! Դուք հաղթեցիք վատ հրեշին և փրկեցիք դինոյին։ 🏆' });
        } else {
          setFeedback({ success: false, msg: 'Խաղն ավարտվեց։ Փորձիր կրկին։' });
        }
      }
    }, 4000);
  };

  // Game 4: Balloon Popper Logic
  const handleBalloonClick = (balloon: typeof IRREGULAR_PARTICIPLES[0], isCorrectForm: boolean) => {
    if (isCorrectForm) {
      if (!g4Popped.includes(balloon.correct)) {
        setG4Popped(prev => [...prev, balloon.correct]);
        addPoints(120);
        setFeedback({ success: true, msg: `Հրաշալի է! ${balloon.exp}` });
      }
    } else {
      if (!g4Failed.includes(balloon.regular)) {
        setG4Failed(prev => [...prev, balloon.regular]);
        resetStreak();
        setFeedback({ success: false, msg: `Սխալ է! "${balloon.regular}" գոյություն չունի: Ճիշտ անկանոն ձևը "${balloon.correct}"-ն է:` });
      }
    }
    setTimeout(() => setFeedback(null), 3000);
  };

  // Game 5: Mom's Recipe Steps Solver
  const handleG5Answer = (option: string) => {
    const step = RECIPE_STEPS[g5Step];
    if (option === step.correct) {
      addPoints(150);
      setFeedback({ success: true, msg: `Ճիշտ է! ${step.exp}` });
      setTimeout(() => {
        setFeedback(null);
        if (g5Step < RECIPE_STEPS.length - 1) {
          setG5Step(prev => prev + 1);
        } else {
          setFeedback({ success: true, msg: 'Ապուրը պատրաստ է` շատ համեղ ստացվեց: ¡Buen provecho! 🍜✨' });
        }
      }, 3000);
    } else {
      resetStreak();
      setFeedback({ success: false, msg: 'Սխալ քայլ. ապուրը կարող է փչանալ։ Փորձիր կրկին։' });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  // Game 6: Trigger Words sorting logic
  const handleG6Sort = (tense: TenseType) => {
    const current = g6Words[g6CurrentWordIdx];
    if (current.tense === tense) {
      addPoints(100);
      setG6Score(prev => prev + 1);
      setFeedback({ success: true, msg: `Ճիշտ է! "${current.word}" (${current.trans}) ցույց է տալիս ${tense}-ի գործողություն։` });
    } else {
      resetStreak();
      setFeedback({ success: false, msg: `Ոչ! "${current.word}" բանալի բառը սովորաբար օգտագործվում է ${current.tense}-ի հետ։` });
    }

    setTimeout(() => {
      setFeedback(null);
      if (g6CurrentWordIdx < g6Words.length - 1) {
        setG6CurrentWordIdx(prev => prev + 1);
      } else {
        setFeedback({ success: true, msg: `Ավարտեցիր: Դու ճիշտ դասավորեցիր ${g6Score + 1}/${g6Words.length} բառեր:` });
      }
    }, 3000);
  };

  // Game 7: Translation Duel Head-to-Head
  const handleG7Answer = (isCorrect: boolean) => {
    if (isCorrect) {
      if (g7Turn === 1) {
        setG7Points(prev => ({ ...prev, p1: prev.p1 + 200 }));
        setPlayer1(p => ({ ...p, score: p.score + 200 }));
      } else {
        setG7Points(prev => ({ ...prev, p2: prev.p2 + 200 }));
        setPlayer2(p => ({ ...p, score: p.score + 200 }));
      }
      setFeedback({ success: true, msg: 'Ճիշտ պատասխան! +200 միավոր' });
    } else {
      setFeedback({ success: false, msg: 'Ոչ ճիշտ պատասխան' });
    }

    setTimeout(() => {
      setFeedback(null);
      // Toggle turn
      setG7Turn(prev => prev === 1 ? 2 : 1);
      if (g7QuestionIdx < 2) {
        setG7QuestionIdx(prev => prev + 1);
      } else {
        setG7QuestionIdx(0); // reset or show winner
        setFeedback({ 
          success: true, 
          msg: `Դուելն ավարտվեց! Գոռ: ${g7Points.p1} միավոր, Գայանե: ${g7Points.p2} միավոր` 
        });
      }
    }, 2500);
  };

  // Game 8:story slides
  const handleG8Answer = (option: string) => {
    const currentSlide = STORY_SLIDES[g8Slide];
    if (option === currentSlide.correct) {
      addPoints(150);
      setFeedback({ success: true, msg: `Ճիշտ պատասխան! ${currentSlide.explanation}` });
      setTimeout(() => {
        setFeedback(null);
        if (g8Slide < STORY_SLIDES.length - 1) {
          setG8Slide(prev => prev + 1);
        } else {
          setFeedback({ success: true, msg: 'Հաջողությամբ ավարտեցիր Գոռի պատմությունը։ 👏📖' });
        }
      }, 3000);
    } else {
      resetStreak();
      setFeedback({ success: false, msg: 'Սխալ տարբերակ. կարդա բացատրությունը և փորձիր կրկին:' });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  // Game 9: Conjugator Pro quiz
  const handleG9Answer = (option: string) => {
    const challenge = CONJUGATE_CHALLENGES[g9QuestionIdx];
    if (option === challenge.correct) {
      addPoints(150);
      setFeedback({ success: true, msg: `Ճիշտ է! "${challenge.verb}" բայի "${challenge.tense}" ժամանակի "${challenge.pronoun}" ձևն է: ${challenge.correct}` });
      setTimeout(() => {
        setFeedback(null);
        if (g9QuestionIdx < CONJUGATE_CHALLENGES.length - 1) {
          setG9QuestionIdx(prev => prev + 1);
        } else {
          setG9QuestionIdx(0);
          setFeedback({ success: true, msg: 'Դուք անցաք բոլոր մարտահրավերները: Խոնարհման Չեմպիոն: 🏆' });
        }
      }, 3000);
    } else {
      resetStreak();
      setFeedback({ success: false, msg: `Սխալ է. ճիշտ ձևն է "${challenge.correct}"-ը` });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  // Game 10: Memory Match
  const handleCardClick = (cardId: number) => {
    const card = memoryCards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || selectedCards.length >= 2) return;

    // Flip card
    setMemoryCards(prev => prev.map(c => c.id === cardId ? { ...c, isFlipped: true } : c));
    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMemoryMoves(m => m + 1);
      const firstCard = memoryCards.find(c => c.id === newSelected[0])!;
      const secondCard = memoryCards.find(c => c.id === newSelected[1])!;

      if (firstCard.matchKey === secondCard.matchKey) {
        // MATCH found
        setTimeout(() => {
          setMemoryCards(prev => prev.map(c => 
            (c.id === newSelected[0] || c.id === newSelected[1]) 
              ? { ...c, isMatched: true } 
              : c
          ));
          addPoints(150);
          setSelectedCards([]);
          
          // Check if all matched
          const allMatched = memoryCards.every(c => c.id === newSelected[0] || c.id === newSelected[1] || c.isMatched);
          if (allMatched) {
            setFeedback({ success: true, msg: `Հիանալի է! Դուք գտաք բոլոր զույգերը ${memoryMoves + 1} քայլով:` });
          }
        }, 800);
      } else {
        // No match
        setTimeout(() => {
          setMemoryCards(prev => prev.map(c => 
            (c.id === newSelected[0] || c.id === newSelected[1]) 
              ? { ...c, isFlipped: false } 
              : c
          ));
          setSelectedCards([]);
        }, 1500);
      }
    }
  };

  const getActiveGame = () => GAMES.find(g => g.id === selectedGameId)!;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT SIDEBAR: Game selector (matching theme color scheme & layout) */}
      <div className="lg:col-span-3 bg-white border border-[#EBEBEB] rounded-2xl p-4 flex flex-col gap-2 shadow-sm">
        <div className="pb-3 border-b border-[#EBEBEB] mb-2 px-2">
          <span className="text-[10px] font-bold text-[#FF5A5F] tracking-widest uppercase">
            Խաղերի Լաբորատորիա
          </span>
          <h3 className="text-base font-bold text-gray-800 font-sans tracking-tight">
            10 Կրթական Խաղեր
          </h3>
        </div>

        <div className="space-y-1.5 overflow-y-auto max-h-[480px] custom-scrollbar pr-1">
          {GAMES.map((game, idx) => {
            const isActive = game.id === selectedGameId;
            return (
              <button
                key={game.id}
                onClick={() => setSelectedGameId(game.id)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all duration-200 flex items-center gap-3 group relative ${
                  isActive
                    ? 'bg-[#FF5A5F]/10 border-[#FF5A5F] text-[#FF5A5F]'
                    : 'bg-white border-transparent hover:bg-stone-50 text-[#484848]'
                }`}
              >
                <span className="text-xl shrink-0 filter drop-shadow">
                  {game.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-wider opacity-60">
                      GAME 0{game.id}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F] animate-ping" />
                    )}
                  </div>
                  <h4 className="font-bold text-xs truncate uppercase tracking-wide">
                    {game.titleArm}
                  </h4>
                  <p className="text-[10px] opacity-70 truncate italic">
                    {game.titleEsp}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CENTER: Dedicated Active Game Playfield Container */}
      <div className="lg:col-span-9 bg-white border border-[#EBEBEB] rounded-3xl p-6 shadow-xl relative min-h-[500px]">
        {/* Active Player Banner & Reset HUD */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-[#EBEBEB]">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#00A699]/10 text-[#00A699] text-[10px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest border border-[#00A699]/20">
                Խաղ {selectedGameId} / 10
              </span>
              {streak > 1 && (
                <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1 animate-bounce">
                  <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                  {streak} Շարք!
                </span>
              )}
            </div>
            <h2 className="text-2xl font-black text-[#484848] mt-1 tracking-tight">
              {getActiveGame().titleArm} <span className="text-sm font-normal text-gray-400">({getActiveGame().titleEsp})</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Player Quick Switcher */}
            <div className="bg-stone-50 border border-[#EBEBEB] p-1.5 rounded-xl flex gap-1">
              <button
                onClick={() => setActivePlayer(1)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activePlayer === 1 
                    ? 'bg-[#FF5A5F] text-white shadow-sm'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Գոռ
              </button>
              <button
                onClick={() => setActivePlayer(2)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activePlayer === 2 
                    ? 'bg-[#00A699] text-white shadow-sm'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Գայանե
              </button>
            </div>

            <button
              onClick={() => setSelectedGameId(selectedGameId)}
              title="Վերսկսել խաղը"
              className="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-500 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Feedback Panel */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`p-3.5 rounded-xl mb-4 flex items-start gap-2 text-xs font-bold font-sans tracking-wide border ${
                feedback.success
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}
            >
              <span className="text-lg">{feedback.success ? '🎉' : '💡'}</span>
              <div className="flex-1">
                <p>{feedback.msg}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Instruction Card */}
        <div className="bg-[#F9F9F9] rounded-2xl p-4 border border-[#EBEBEB] mb-5">
          <h4 className="text-xs uppercase font-extrabold text-[#484848] flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#FF5A5F]" />
            <span>Ինչպես խաղալ / Խաղի Կանոնները</span>
          </h4>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            {getActiveGame().descriptionArm}
          </p>
        </div>

        {/* GAME INTERACTIVE CONTAINERS */}
        <div className="p-1 min-h-[300px]">
          
          {/* GAME 1: Verb Match Pairs */}
          {selectedGameId === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Spanish Words Column */}
                <div className="space-y-3">
                  <h5 className="text-xs font-black uppercase text-stone-400 text-center">Español</h5>
                  {g1ShuffledLeft.map(item => {
                    const isMatched = g1Matches.includes(item.word);
                    const isSelected = g1LeftSelected === item.word;
                    return (
                      <button
                        key={item.word}
                        disabled={isMatched}
                        onClick={() => {
                          setG1LeftSelected(item.word);
                          handleG1Match(item.word, null);
                        }}
                        className={`w-full p-3 rounded-xl border font-bold text-center text-xs md:text-sm uppercase transition-all duration-200 flex items-center justify-between ${
                          isMatched
                            ? 'bg-stone-50 border-transparent text-stone-300 line-through'
                            : isSelected
                            ? 'bg-[#FF5A5F] border-[#FF5A5F] text-white ring-2 ring-offset-2 ring-[#FF5A5F]'
                            : 'bg-white border-[#EBEBEB] hover:border-[#FF5A5F] text-[#484848]'
                        }`}
                      >
                        <span>{item.word}</span>
                        {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      </button>
                    );
                  })}
                </div>

                {/* Armenian Translation Column */}
                <div className="space-y-3">
                  <h5 className="text-xs font-black uppercase text-stone-400 text-center font-sans">Հայերեն</h5>
                  {g1ShuffledRight.map(item => {
                    const isMatched = g1Matches.some(matchedWord => 
                      VERB_MATCH_ITEMS.find(v => v.word === matchedWord)?.trans === item.trans
                    );
                    const isSelected = g1RightSelected === item.trans;
                    return (
                      <button
                        key={item.trans}
                        disabled={isMatched}
                        onClick={() => {
                          setG1RightSelected(item.trans);
                          handleG1Match(null, item.trans);
                        }}
                        className={`w-full p-3 rounded-xl border font-bold text-center text-xs md:text-sm font-sans transition-all duration-200 flex items-center justify-between ${
                          isMatched
                            ? 'bg-stone-50 border-transparent text-stone-300 line-through'
                            : isSelected
                            ? 'bg-[#00A699] border-[#00A699] text-white ring-2 ring-offset-2 ring-[#00A699]'
                            : 'bg-white border-[#EBEBEB] hover:border-[#00A699] text-[#484848]'
                        }`}
                      >
                        <span className="truncate">{item.trans}</span>
                        {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {g1Matches.length === VERB_MATCH_ITEMS.length && (
                <div className="text-center p-6 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <span className="text-3xl">🏆</span>
                  <h4 className="text-md font-bold text-emerald-800 mt-2 font-sans">Հրաշալի աշխատանք:Բոլոր բայերը միացված են:</h4>
                </div>
              )}
            </div>
          )}

          {/* GAME 2: Pluscuamperfecto Builder (Detective Gor) */}
          {selectedGameId === 2 && (
            <div className="space-y-6">
              <div className="bg-stone-50 border border-[#EBEBEB] rounded-2xl p-4 text-center">
                <span className="text-xs text-[#FF5A5F] font-bold uppercase tracking-wider">Խնդրագիր</span>
                <p className="text-lg font-bold text-stone-800 mt-1">
                  Կառուցիր <span className="underline decoration-indigo-400 font-black">{PLUSCUAMPERFECTO_BUILDER_DATA[g2Round].subject}</span> դերանվան համար <span className="italic">"{PLUSCUAMPERFECTO_BUILDER_DATA[g2Round].verb}"</span> բայի Pluscuamperfecto ձևը:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Haber options */}
                <div className="space-y-2">
                  <h5 className="text-xs font-black uppercase text-stone-400 pb-1">Haber բայի imperfecto ձևեր</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {['había', 'habías', 'habíamos', 'habíais', 'habían'].map(h => (
                      <button
                        key={h}
                        onClick={() => handleG2Choice('haber', h)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          g2SelectedHaber === h
                            ? 'bg-[#FF5A5F] text-white border-[#FF5A5F]'
                            : 'bg-white border-[#EBEBEB] hover:bg-stone-50'
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Participio options */}
                <div className="space-y-2">
                  <h5 className="text-xs font-black uppercase text-stone-400 pb-1">Participio-ներ (դերբայներ)</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {['cantado', 'comido', 'vivido', 'hecho', 'escrito', 'puesto', 'dicho', 'abierto'].map(p => (
                      <button
                        key={p}
                        onClick={() => handleG2Choice('part', p)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          g2SelectedPart === p
                            ? 'bg-[#00A699] text-white border-[#00A699]'
                            : 'bg-white border-[#EBEBEB] hover:bg-stone-50'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Secret Equation Visualizer */}
              <div className="mt-6 p-4 rounded-xl border border-dashed border-[#EBEBEB] flex items-center justify-center gap-3">
                <span className="bg-stone-100 px-3 py-1.5 rounded-lg font-mono text-sm max-w-full text-stone-700 font-bold">
                  {g2SelectedHaber || 'HABER (había...)'}
                </span>
                <span className="font-bold text-stone-400 text-lg">+</span>
                <span className="bg-stone-100 px-3 py-1.5 rounded-lg font-mono text-sm max-w-full text-stone-700 font-bold">
                  {g2SelectedPart || 'PARTICIPIO (-ado / -ido / irregular)'}
                </span>
              </div>
            </div>
          )}

          {/* GAME 3: Dino Past Battle (Imperfecto vs Indefinido) */}
          {selectedGameId === 3 && (
            <div className="space-y-6">
              {/* Battle Arena Health Bars */}
              <div className="grid grid-cols-2 gap-4 pb-2">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                  <div className="flex justify-between text-xs font-black text-emerald-800">
                    <span>Դինո</span>
                    <span>{dinoHealth} HP</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-gradient-to-r from-emerald-400 to-green-500 h-full transition-all duration-500" style={{ width: `${dinoHealth}%` }} />
                  </div>
                </div>

                <div className="bg-rose-50 border border-rose-100 rounded-xl p-3">
                  <div className="flex justify-between text-xs font-black text-rose-800">
                    <span>Մինո</span>
                    <span>{monsterHealth} HP</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-gradient-to-r from-rose-400 to-red-500 h-full transition-all duration-500" style={{ width: `${monsterHealth}%` }} />
                  </div>
                </div>
              </div>

              {/* Interactive question card */}
              <div className="bg-stone-50 border border-[#EBEBEB] p-5 rounded-2xl text-center space-y-4">
                <span className="bg-blue-100 text-blue-800 text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-extrabold">
                  Փուլ {g3Round + 1} / {BATTLE_QUESTIONS.length}
                </span>
                
                <p className="text-xl font-bold font-mono text-slate-800 pt-1">
                  {BATTLE_QUESTIONS[g3Round].question}
                </p>

                <p className="text-xs text-gray-400 font-sans">
                  Ի՞նչ բայաձև է անհրաժեշտ օգտագործել նախադասությունն ավարտելու համար։
                </p>

                <div className="flex items-center justify-center gap-3 pt-2">
                  {BATTLE_QUESTIONS[g3Round].opinions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleG3Answer(opt)}
                      className="px-6 py-3 rounded-2xl border-2 border-[#EBEBEB] hover:border-[#FF5A5F] bg-white font-bold text-sm text-stone-700 shadow-sm transition-all hover:scale-105"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {monsterHealth <= 0 && (
                <div className="text-center p-6 bg-[#00A699]/10 border border-[#00A699] rounded-2xl font-sans">
                  <h4>🥳 Շնորհավորում ենք: Դուք ազատեցիք Դինոյին` սխալ ձևերը հաղթահարելով:</h4>
                </div>
              )}
            </div>
          )}

          {/* GAME 4: Balloon Popper (Irregular Participles) */}
          {selectedGameId === 4 && (
            <div className="space-y-6">
              <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs md:text-sm text-center">
                <strong className="text-[#FF5A5F]">Կանոն՝ </strong>
                Ընտրիր միայն ճիշտ անկանոն Participio-ները: Խուսափիր ոչ ճիշտ regularized ձևերից (օրինակ՝ *abrido* - սխալ է, *abierto* - ճիշտ է)։
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                {g4Balloons.map((balloon, idx) => {
                  const isCorrectPopped = g4Popped.includes(balloon.correct);
                  const isFailPopped = g4Failed.includes(balloon.regular);

                  return (
                    <div key={idx} className="space-y-2 border border-stone-100 p-2 rounded-xl bg-white shadow-sm flex flex-col justify-between">
                      <div className="text-center">
                        <span className="text-xs text-stone-400 font-bold uppercase block">Բայ: {balloon.verb}</span>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        {/* Incorrect balloon options */}
                        <button
                          disabled={isFailPopped || isCorrectPopped}
                          onClick={() => handleBalloonClick(balloon, false)}
                          className={`p-2.5 rounded-lg font-mono text-xs font-bold transition-all ${
                            isFailPopped
                              ? 'bg-rose-100 text-rose-700 border-transparent line-through'
                              : 'bg-rose-50 border border-rose-200 hover:bg-rose-100 text-[#484848]'
                          }`}
                        >
                          🎈 {balloon.regular}
                        </button>

                        {/* Correct balloon option */}
                        <button
                          disabled={isCorrectPopped || isFailPopped}
                          onClick={() => handleBalloonClick(balloon, true)}
                          className={`p-2.5 rounded-lg font-mono text-xs font-bold transition-all ${
                            isCorrectPopped
                              ? 'bg-emerald-100 text-emerald-800 border-transparent'
                              : 'bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-[#484848]'
                          }`}
                        >
                          🌟 {balloon.correct}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* GAME 5: Mom's Recipe Steps Solver (Pretérito Perfecto) */}
          {selectedGameId === 5 && (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center p-3 bg-stone-50 border border-[#EBEBEB] rounded-2xl text-center">
                <span className="text-3xl">🍲</span>
                <h4 className="font-bold text-stone-800 mt-2 font-sans text-sm">Մայրիկի համեղ ապուրի պատրաստման հաջորդականությունը</h4>
                <div className="w-1/2 bg-stone-200 h-1.5 rounded-full overflow-hidden mt-3">
                  <div className="bg-[#00A699] h-full transition-all duration-300" style={{ width: `${((g5Step + 1) / RECIPE_STEPS.length) * 100}%` }} />
                </div>
              </div>

              <div className="p-5 border border-[#EBEBEB] rounded-2xl bg-white space-y-4">
                <span className="bg-teal-50 text-teal-800 text-[10px] uppercase font-extrabold px-3 py-1 rounded-sm border border-teal-100">
                  Քայլ {RECIPE_STEPS[g5Step].step}
                </span>

                <p className="text-base font-bold text-stone-800 pt-1">
                  {RECIPE_STEPS[g5Step].task}
                </p>

                <div className="flex flex-col gap-2 pt-2">
                  {RECIPE_STEPS[g5Step].options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleG5Answer(opt)}
                      className="w-full p-3.5 rounded-xl border border-stone-200 hover:border-[#00A699] hover:bg-stone-50 font-bold font-mono text-left text-xs md:text-sm flex justify-between items-center text-stone-700 transition-all"
                    >
                      <span>{opt}</span>
                      <ArrowRight className="w-4 h-4 text-stone-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* GAME 6: Trigger Words sorting logic */}
          {selectedGameId === 6 && (
            <div className="space-y-6">
              <div className="bg-stone-50 border border-[#EBEBEB] p-5 rounded-2xl text-center space-y-3">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block">Տեղափոխիր ժամանակի մեջ</span>
                <p className="text-2xl font-black text-[#FF5A5F] uppercase tracking-wide">
                  {g6Words[g6CurrentWordIdx]?.word}
                </p>
                <p className="text-sm font-sans font-semibold text-gray-500">
                  Թարգմանություն՝ {g6Words[g6CurrentWordIdx]?.trans}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                {[
                  { key: 'perfecto', label: 'Perfecto', color: 'border-orange-200 text-orange-800 hover:bg-orange-50' },
                  { key: 'imperfecto', label: 'Imperfecto', color: 'border-teal-200 text-teal-800 hover:bg-teal-50' },
                  { key: 'indefinido', label: 'Indefinido', color: 'border-rose-200 text-rose-800 hover:bg-rose-50' },
                  { key: 'pluscuamperfecto', label: 'Pluscuamperfecto', color: 'border-indigo-200 text-indigo-800 hover:bg-indigo-50' }
                ].map(b => (
                  <button
                    key={b.key}
                    onClick={() => handleG6Sort(b.key as TenseType)}
                    className={`p-4 rounded-xl border-2 font-black uppercase text-xs md:text-sm tracking-widest bg-white shadow-sm transition-all hover:-translate-y-0.5 ${b.color}`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* GAME 7: Translation Duel Head-to-Head */}
          {selectedGameId === 7 && (
            <div className="space-y-6 font-sans">
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 rounded-xl border text-center ${g7Turn === 1 ? 'border-amber-400 bg-amber-50/50' : 'border-stone-100 opacity-60'}`}>
                  <span className="text-xs font-bold block text-orange-800">Գոռի հերթն է (P1)</span>
                  <span className="text-sm font-black text-amber-900">{g7Points.p1} միավոր</span>
                </div>
                <div className={`p-3 rounded-xl border text-center ${g7Turn === 2 ? 'border-teal-400 bg-teal-50/50' : 'border-stone-100 opacity-60'}`}>
                  <span className="text-xs font-bold block text-[#00A699]">Գայանեի հերթն է (P2)</span>
                  <span className="text-sm font-black text-teal-900">{g7Points.p2} միավոր</span>
                </div>
              </div>

              {/* Translation card */}
              <div className="p-5 border border-amber-200 bg-amber-50/10 rounded-2xl text-center space-y-4">
                <span className="text-xs font-bold text-orange-800 bg-orange-100/60 px-2.5 py-1 rounded-full uppercase">
                  Դուել - Ո՞րն է ճիշտ թարգմանությունը
                </span>

                <p className="text-lg font-black text-stone-800">
                  {g7QuestionIdx === 0 && 'Yo no había comido nada desde la mañana.'}
                  {g7QuestionIdx === 1 && 'Cuando llegué a casa, ya había puesto la mesa.'}
                  {g7QuestionIdx === 2 && 'Mamá había preparado una sopa muy rica antes de salir.'}
                </p>

                <div className="grid grid-cols-1 gap-2.5 pt-2">
                  {/* Options for Q0 */}
                  {g7QuestionIdx === 0 && (
                    <>
                      <button onClick={() => handleG7Answer(true)} className="p-3 bg-white hover:bg-stone-50 rounded-xl border hover:border-amber-400 text-xs font-bold text-left text-stone-700">
                        Ես առավոտից ոչինչ չէի կերել:
                      </button>
                      <button onClick={() => handleG7Answer(false)} className="p-3 bg-white hover:bg-stone-50 rounded-xl border hover:border-amber-400 text-xs font-bold text-left text-stone-700">
                        Ես այսօր ոչինչ չեմ կերել:
                      </button>
                    </>
                  )}
                  {/* Options for Q1 */}
                  {g7QuestionIdx === 1 && (
                    <>
                      <button onClick={() => handleG7Answer(false)} className="p-3 bg-white hover:bg-stone-50 rounded-xl border hover:border-amber-400 text-xs font-bold text-left text-stone-700">
                        Երբ տուն եկա, նա նոր պիտի սկսեր պատրաստել։
                      </button>
                      <button onClick={() => handleG7Answer(true)} className="p-3 bg-white hover:bg-stone-50 rounded-xl border hover:border-amber-400 text-xs font-bold text-left text-stone-700">
                        Երբ տուն եկա, նա արդեն սեղանը գցել էր:
                      </button>
                    </>
                  )}
                  {/* Options for Q2 */}
                  {g7QuestionIdx === 2 && (
                    <>
                      <button onClick={() => handleG7Answer(true)} className="p-3 bg-white hover:bg-stone-50 rounded-xl border hover:border-amber-400 text-xs font-bold text-left text-stone-700">
                        Մայրիկը դուրս գալուց առաջ շատ համեղ ապուր էր պատրաստել:
                      </button>
                      <button onClick={() => handleG7Answer(false)} className="p-3 bg-white hover:bg-stone-50 rounded-xl border hover:border-amber-400 text-xs font-bold text-left text-stone-700">
                        Մայրիկը տուն գալուց հետո համեղ ապուր պատրաստեց։
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* GAME 8: Story Space - Fill in the Blanks (Գոռի Պատմությունը) */}
          {selectedGameId === 8 && (
            <div className="space-y-6">
              <div className="border border-[#EBEBEB] bg-stone-50 p-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-[#FF5A5F]/10 rounded-lg text-lg">📖</span>
                  <div>
                    <h5 className="font-bold font-sans text-stone-800 text-sm">{STORY_SLIDES[g8Slide].titleArm}</h5>
                    <p className="text-[11px] text-gray-400 font-sans mt-0.5">{STORY_SLIDES[g8Slide].descArm}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 border border-[#EBEBEB] rounded-2xl bg-white space-y-4">
                <p className="text-base font-bold font-mono text-stone-800 text-center py-2 bg-stone-50/50 rounded-xl border border-dashed border-[#EBEBEB]">
                  {STORY_SLIDES[g8Slide].sentence}
                </p>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  {STORY_SLIDES[g8Slide].options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleG8Answer(opt)}
                      className="p-3.5 rounded-xl border border-stone-200 hover:border-[#FF5A5F] hover:bg-stone-50 font-bold font-mono text-center text-xs md:text-sm text-stone-700 transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* GAME 9: Conjugator Pro quiz */}
          {selectedGameId === 9 && (
            <div className="space-y-6">
              <div className="bg-stone-50 border border-[#EBEBEB] p-4 rounded-xl text-center">
                <span className="text-[10px] font-bold text-[#00A699] uppercase tracking-wider block">Խոնարհման Trivia</span>
                <p className="text-lg font-bold text-stone-800 mt-1">
                  Գտիր <span className="underline font-black">"{CONJUGATE_CHALLENGES[g9QuestionIdx].verb}"</span> բայի` <span className="text-[#FF5A5F] font-black">{CONJUGATE_CHALLENGES[g9QuestionIdx].tense}</span> ժամանակի <span className="italic font-bold">"{CONJUGATE_CHALLENGES[g9QuestionIdx].pronoun}"</span> դեմքի տարբերակը:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {CONJUGATE_CHALLENGES[g9QuestionIdx].options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleG9Answer(opt)}
                    className="p-3.5 rounded-xl border border-stone-200 hover:border-[#00A699] hover:bg-stone-50 bg-white font-bold font-mono text-xs md:text-sm text-stone-700 text-left flex justify-between items-center transition-all"
                  >
                    <span>{opt}</span>
                    <Sparkles className="w-4 h-4 text-stone-300 hover:text-amber-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* GAME 10: Memory Past Matcher cards */}
          {selectedGameId === 10 && (
            <div className="space-y-4 font-sans">
              <div className="flex justify-between items-center text-xs text-stone-500 pb-1">
                <span>Կատարված քայլեր՝ {memoryMoves}</span>
                <span>Գտիր համապատասխան բայերը</span>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-4 gap-2.5">
                {memoryCards.map((card) => {
                  const isFlippedOrMatched = card.isFlipped || card.isMatched;

                  return (
                    <button
                      key={card.id}
                      disabled={isFlippedOrMatched}
                      onClick={() => handleCardClick(card.id)}
                      className={`h-24 rounded-xl border-2 font-bold flex items-center justify-center p-2.5 text-center text-xs transition-all duration-300 select-none ${
                        card.isMatched
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                          : card.isFlipped
                          ? 'bg-amber-100 border-amber-400 text-stone-800 rotate-0'
                          : 'bg-stone-900 border-stone-900 text-white cursor-pointer hover:bg-stone-800'
                      }`}
                    >
                      {isFlippedOrMatched ? card.text : '❓'}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
