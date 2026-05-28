/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DialogueLine, VerbItem } from './types';

export const DIALOGUE_DATA: DialogueLine[] = [
  {
    id: 1,
    speaker: 'Gor',
    textEsp: '¿Qué olor tan rico hay en la cocina?',
    textArm: 'Գոռ․ Գայանե, ի՜նչ համեղ հոտ կա խոհանոցում։',
    explanationArm: {
      title: '¿Qué olor tan rico hay en la cocina?',
      translation: 'Ի՜նչ համեղ հոտ կա խոհանոցում։',
      structure: '¿Qué + sustantivo + tan + adjetivo + hay + lugar?',
      breakdown: [
        'Qué olor — ինչ հոտ',
        'tan rico — այնքան համեղ / շատ հաճելի',
        'hay — կա (haber բայից)',
        'en la cocina — խոհանոցում'
      ],
      tenseInfo: 'Այստեղ hay-ը օգտագործվում է, որպեսզի ցույց տա ինչ-որ բանի գոյությունը նշված վայրում։'
    }
  },
  {
    id: 2,
    speaker: 'Gayane',
    textEsp: 'Mamá había preparado una sopa muy rica antes de salir.',
    textArm: 'Գայանե․ Մայրիկը դուրս գալուց առաջ շատ համեղ ապուր էր պատրաստել։',
    explanationArm: {
      title: 'Mamá había preparado una sopa muy rica antes de salir.',
      translation: 'Մայրիկը դուրս գալուց առաջ շատ համեղ ապուր էր պատրաստել։',
      structure: 'Sujeto + había + participio + objeto + antes de + infinitivo',
      breakdown: [
        'Mamá — մայրիկը',
        'había preparado — պատրաստել էր (Pluscuamperfecto)',
        'una sopa muy rica — շատ համեղ ապուր',
        'antes de salir — դուրս գալուց առաջ'
      ],
      tenseInfo: 'había preparado-ն Pluscuamperfecto է։ Կազմվում է había (haber-ի imperfecto) + preparado (participio) ձևով։ Ցույց է տալիս, որ գործողությունը տեղի է ունեցել նախքան մյուս անցյալ գործողությունը (այսինքն մայրիկը ապուրն ավելի շուտ էր պատրաստել, քան դուրս կգար)։'
    }
  },
  {
    id: 3,
    speaker: 'Gor',
    textEsp: '¿De verdad?',
    textArm: 'Գոռ․ Ճի՞շտ/Իսկապե՞ս։',
    explanationArm: {
      title: '¿De verdad?',
      translation: 'Իսկապե՞ս։',
      structure: '¿De verdad? (Կայուն արտահայտություն)',
      breakdown: [
        'De verdad — իսկապես, իրոք, ճիշտ'
      ],
      tenseInfo: 'Սա կարճ արտահայտություն է, որն օգտագործվում է զարմանք կամ հաստատում արտահայտելու համար։'
    }
  },
  {
    id: 4,
    speaker: 'Gor',
    textEsp: 'Yo pensé que no había cocinado nada hoy.',
    textArm: 'Գոռ․ Ես մտածեցի, որ նա այսօր ոչինչ չէր պատրաստել։',
    explanationArm: {
      title: 'Yo pensé que no había cocinado nada hoy.',
      translation: 'Ես մտածեցի, որ նա այսօր ոչինչ չէր պատրաստել։',
      structure: 'Sujeto + verbo en Indefinido + que + no + había + participio + nada',
      breakdown: [
        'Yo pensé — ես մտածեցի (Pretérito Indefinido)',
        'que — որ',
        'no había cocinado — չէր պատրաստել (Pluscuamperfecto)',
        'nada — ոչինչ',
        'hoy — այսօր'
      ],
      tenseInfo: 'pensé-ն Pretérito Indefinido է (կոնկրետ ավարտված պահ անցյալում)։ no había cocinado-ն Pluscuamperfecto է, որովհետև չպատրաստելը տեղի է ունեցել մտածելու պահից ավելի առաջ։'
    }
  },
  {
    id: 5,
    speaker: 'Gayane',
    textEsp: 'Sí, había cocinado temprano porque sabía que íbamos a tener hambre.',
    textArm: 'Գայանե․ Այո, նա շուտ էր պատրաստել, որովհետև գիտեր, որ մենք սոված ենք լինելու։',
    explanationArm: {
      title: 'Sí, había cocinado temprano porque sabía que...',
      translation: 'Այո, նա շուտ էր պատրաստել, որովհետև գիտեր, որ մենք սոված ենք լինելու։',
      structure: 'Sí + había + participio + tiempo + porque + imperfecto + que + íbamos a + infinitivo',
      breakdown: [
        'Sí — այո',
        'había cocinado — պատրաստել էր (Pluscuamperfecto)',
        'temprano — շուտ',
        'porque — որովհետև',
        'sabía — գիտեր (Pretérito Imperfecto)',
        'que íbamos a tener hambre — որ սոված էինք լինելու (անցյալում ապագա)'
      ],
      tenseInfo: 'había cocinado (Pluscuamperfecto) – պատրաստել էր ավելի շուտ: sabía-ն Imperfecto է (վիճակ/իմացություն անցյալում): íbamos a tener hambre-ն ցույց է տալիս անցյալի մեջ ապագայի իմաստ (ir a + infinitivo-ի անցյալ ձևը)։'
    }
  },
  {
    id: 6,
    speaker: 'Gor',
    textEsp: '¡Qué bien!',
    textArm: 'Գոռ․ Ի՜նչ լավ է։',
    explanationArm: {
      title: '¡Qué bien!',
      translation: 'Ի՜նչ լավ է։',
      structure: '¡Qué + adverbio/adjetivo!',
      breakdown: [
        'Qué bien — ինչ լավ'
      ],
      tenseInfo: 'Բացականչական զգացմունքային արտահայտություն է՝ ուրախություն կամ գոհունակություն արտահայտելու համար։'
    }
  },
  {
    id: 7,
    speaker: 'Gor',
    textEsp: 'Yo no había comido nada desde la mañana.',
    textArm: 'Գոռ․ Ես առավոտից ոչինչ չէի կերել։',
    explanationArm: {
      title: 'Yo no había comido nada desde la mañana.',
      translation: 'Ես առավոտից ոչինչ չէի կերել։',
      structure: 'Sujeto + no + había + participio + nada + desde + tiempo',
      breakdown: [
        'Yo — ես',
        'no había comido — չէի կերել (Pluscuamperfecto)',
        'nada — ոչինչ',
        'desde la mañana — առավոտից'
      ],
      tenseInfo: 'no había comido — Pluscuamperfecto է (չէի կերել մինչև տուն գալը)։ Կազմությունը՝ haber-ի imperfecto (había) + participio (comido)։'
    }
  },
  {
    id: 8,
    speaker: 'Gayane',
    textEsp: 'Yo tampoco.',
    textArm: 'Գայանե․ Ես էլ չէի կերել / Ես էլ ոչ։',
    explanationArm: {
      title: 'Yo tampoco.',
      translation: 'Ես էլ ոչ։',
      structure: 'Yo + tampoco',
      breakdown: [
        'Yo — ես',
        'tampoco — նույնպես ոչ / ես էլ ոչ'
      ],
      tenseInfo: 'Tampoco-ն օգտագործվում է ժխտական (բացասական) նախադասությանը համաձայնելու համար։ (օրինակ՝ No he comido -> Yo tampoco)։'
    }
  },
  {
    id: 9,
    speaker: 'Gayane',
    textEsp: 'Cuando llegué a casa, ya había puesto la mesa.',
    textArm: 'Գայանե․ Երբ տուն եկա, նա արդեն սեղանը գցել էր։',
    explanationArm: {
      title: 'Cuando llegué a casa, ya había puesto la mesa.',
      translation: 'Երբ ես տուն եկա, նա արդեն սեղանը գցել էր։',
      structure: 'Cuando + Indefinido, ya + había + participio + objeto',
      breakdown: [
        'Cuando llegué a casa — երբ ես տուն եկա',
        'llegué — եկա (Pretérito Indefinido - կոնկրետ ավարտված անցյալ գործողություն)',
        'ya — արդեն',
        'había puesto — դրել էր / գցել էր (Pluscuamperfecto)',
        'la mesa — սեղանը'
      ],
      tenseInfo: 'había puesto – Pluscuamperfecto: poner բայի անկանոն participio-ն է puesto: Այսինքն՝ նախ մայրիկը սեղանն էր գցել (նախորդող անցյալ), հետո Գայանեն եկավ տուն (հաջորդող անցյալ)։'
    }
  },
  {
    id: 10,
    speaker: 'Gor',
    textEsp: 'Mamá siempre piensa en nosotros.',
    textArm: 'Գոռ․ Մայրիկը միշտ մտածում է մեր մասին։',
    explanationArm: {
      title: 'Mamá siempre piensa en nosotros.',
      translation: 'Մայրիկը միշտ մտածում է մեր մասին։',
      structure: 'Sujeto + siempre + verbo en Presente + en + persona',
      breakdown: [
        'Mamá — մայրիկը',
        'siempre — միշտ',
        'piensa — մտածում է (Presente / Ներկա ժամանակ)',
        'en nosotros — մեր մասին'
      ],
      tenseInfo: 'piensa-ն Presente է (ներկա)։ Օգտագործվում է, քանի որ խոսվում է սովորության, մշտական հոգատարության կամ ընդհանուր ճշմարտության մասին։'
    }
  },
  {
    id: 11,
    speaker: 'Gayane',
    textEsp: 'Sí, y la comida había quedado muy sabrosa.',
    textArm: 'Գայանե․ Այո, ու ուտելիքը շատ համեղ էր ստացվել։',
    explanationArm: {
      title: 'Sí, y la comida había quedado muy sabrosa.',
      translation: 'Այո, և ուտելիքը շատ համեղ էր ստացվել։',
      structure: 'Sí + y + sujeto + había + participio + adjetivo',
      breakdown: [
        'Sí — այո',
        'y — և՛ / ու',
        'la comida — ուտելիքը',
        'había quedado — ստացվել էր / մնացել էր (Pluscuamperfecto)',
        'muy sabrosa — շատ համեղ'
      ],
      tenseInfo: 'había quedado – Pluscuamperfecto: quedar (մնալ/ստացվել) բայից։ Ցույց է տալիս, որ ուտելիքի պատրաստ լինելիս այն արդեն ստացվել էր շատ համեղ։'
    }
  }
];

// Database of Armenian and Spanish Past Tenses explanation
export const TENSE_EXPLANATIONS = {
  perfecto: {
    titleArm: 'Pretérito Perfecto (Անցյալ Սահմանափակ/Կատարյալ)',
    titleEsp: 'Pretérito Perfecto de Indicativo',
    formula: 'he / has / ha / hemos / habéis / han + Participio (-ado / -ido)',
    useArm: 'Օգտագործվում է, երբ գործողությունը տեղի է ունեցել անցյալում, բայց կապված է ներկա ժամանակահատվածի հետ (օրինակ՝ այսօր, այս շաբաթ)։',
    examples: ['Este año he viajado a España (Այս տարի ես ճանապարհորդել եմ Իսպանիա)', 'Hoy hemos comido helado (Այսօր մենք պաղպաղակ ենք կերել)']
  },
  imperfecto: {
    titleArm: 'Pretérito Imperfecto (Անցյալ Անկատար)',
    titleEsp: 'Pretérito Imperfecto de Indicativo',
    formula: 'Verbos en -AR: -aba / Verbos en -ER/-IR: -ía',
    useArm: 'Օգտագործվում է անցյալում կրկնվող գործողությունների, սովորությունների, մարդկանց կամ իրավիճակների նկարագրության համար։',
    examples: ['Cuando era niño, jugaba mucho (Երբ երեխա էի, շատ էի խաղում)', 'Hacía mucho frío (Շատ ցուրտ էր)']
  },
  indefinido: {
    titleArm: 'Pretérito Indefinido (Անցյալ Կատարյալ Միանվագ)',
    titleEsp: 'Pretérito Indefinido de Indicativo',
    formula: '-AR: -é, -aste, -ó... / -ER -IR: -í, -iste, -ió...',
    useArm: 'Օգտագործվում է անցյալում ավարտված, կոնկրետ միանվագ գործողությունների համար, որոնք կապ չունեն ներկայի հետ (օրինակ՝ ayer (երեկ), el año pasado (անցյալ տարի))։',
    examples: ['Ayer fui al parque (Երեկ գնացի այգի)', 'Mamá cocinó una sopa (Մայրիկը ապուր պատրաստեց)']
  },
  pluscuamperfecto: {
    titleArm: 'Pretérito Pluscuamperfecto (Վաղակատար Անցյալ)',
    titleEsp: 'Pretérito Pluscuamperfecto de Indicativo',
    formula: 'había / habías / había / habíamos / habíais / habían + Participio',
    useArm: 'Ցույց է տալիս գործողություն, որն ավարտվել է մեկ այլ անցյալ գործողությունից ավելի առաջ։',
    examples: ['Cuando llegué, él ya había salido (Երբ ես եկա, նա արդեն դուրս էր եկել)', 'Yo no había comido nada (Ես ոչինչ չէի կերել)']
  }
};

// Irregular Participles for Balloon Pop Game (Game 4)
export const IRREGULAR_PARTICIPLES = [
  { verb: 'abrir', regular: 'abrido', correct: 'abierto', exp: 'abrir -> abierto (բացել -> բացված)' },
  { verb: 'decir', regular: 'decido', correct: 'dicho', exp: 'decir -> dicho (ասել -> ասված)' },
  { verb: 'escribir', regular: 'escribido', correct: 'escrito', exp: 'escribir -> escrito (գրել -> գրված)' },
  { verb: 'hacer', regular: 'hacido', correct: 'hecho', exp: 'hacer -> hecho (անել -> արված)' },
  { verb: 'morir', regular: 'morido', correct: 'muerto', exp: 'morir -> muerto (մահանալ -> մահացած)' },
  { verb: 'poner', regular: 'ponido', correct: 'puesto', exp: 'poner -> puesto (դնել -> դրված)' },
  { verb: 'romper', regular: 'rompido', correct: 'roto', exp: 'romper -> roto (կոտրել -> կոտրված)' },
  { verb: 'ver', regular: 'veído', correct: 'visto', exp: 'ver -> visto (տեսնել -> տեսած)' },
  { verb: 'volver', regular: 'volvido', correct: 'vuelto', exp: 'volver -> vuelto (վերադառնալ -> վերադարձած)' },
  { verb: 'resolver', regular: 'resolvido', correct: 'resuelto', exp: 'resolver -> resuelto (լուծել -> լուծված)' }
];

// Time triggers for Game 6
export const TIME_TRIGGERS = [
  { word: 'Ayer', tense: 'indefinido', trans: 'Երեկ' },
  { word: 'Hoy', tense: 'perfecto', trans: 'Այսօր' },
  { word: 'Antes', tense: 'imperfecto', trans: 'Առաջ / Նախկինում' },
  { word: 'Ya había', tense: 'pluscuamperfecto', trans: 'Արդեն արել էր' },
  { word: 'El año pasado', tense: 'indefinido', trans: 'Անցյալ տարի' },
  { word: 'Esta semana', tense: 'perfecto', trans: 'Այս շաբաթ' },
  { word: 'Cuando era niño', tense: 'imperfecto', trans: 'Երբ երեխա էի' },
  { word: 'Antes de que llegaras, él ya', tense: 'pluscuamperfecto', trans: 'Մինչ քո գալը նա արդեն...' },
  { word: 'Hace dos días', tense: 'indefinido', trans: 'Երկու օր առաջ' },
  { word: 'Últimamente', tense: 'perfecto', trans: 'Վերջերս' }
];

// Verb conjugations for Game 2 (Detective Gor - Pluscuamperfecto builder)
export const PLUSCUAMPERFECTO_BUILDER_DATA = [
  { subject: 'Yo', verb: 'cantar', haber: 'había', participio: 'cantado', correct: 'había cantado' },
  { subject: 'Tú', verb: 'comer', haber: 'habías', participio: 'comido', correct: 'habías comido' },
  { subject: 'Él/Ella', verb: 'vivir', haber: 'había', participio: 'vivido', correct: 'había vivido' },
  { subject: 'Nosotros', verb: 'hacer', haber: 'habíamos', participio: 'hecho', correct: 'habíamos hecho' },
  { subject: 'Vosotros', verb: 'escribir', haber: 'habíais', participio: 'escrito', correct: 'habíais escrito' },
  { subject: 'Ellos/Ellas', verb: 'poner', haber: 'habían', participio: 'puesto', correct: 'habían puesto' },
  { subject: 'Tú', verb: 'decir', haber: 'habías', participio: 'dicho', correct: 'habías dicho' },
  { subject: 'Nosotros', verb: 'abrir', haber: 'habíamos', participio: 'abierto', correct: 'habíamos abierto' }
];

// Game 1: Verb Matching
export const VERB_MATCH_ITEMS = [
  { word: 'He cantado', tense: 'perfecto', trans: 'Ես երգել եմ' },
  { word: 'Canté', tense: 'indefinido', trans: 'Ես երգեցի' },
  { word: 'Cantaba', tense: 'imperfecto', trans: 'Ես երգում էի' },
  { word: 'Había cantado', tense: 'pluscuamperfecto', trans: 'Ես երգել էի' },
  { word: 'Has comido', tense: 'perfecto', trans: 'Դու կերել ես' },
  { word: 'Comiste', tense: 'indefinido', trans: 'Դու կերար' },
  { word: 'Comías', tense: 'imperfecto', trans: 'Դու ուտում էիր' },
  { word: 'Habías comido', tense: 'pluscuamperfecto', trans: 'Դու կերել էիր' }
];

// Game 3: Imperfecto vs Indefinido Battle
export const BATTLE_QUESTIONS = [
  {
    question: 'Ayer (ir) al cine.',
    opinions: ['iba', 'fui'],
    correct: 'fui',
    tense: 'indefinido',
    reasonArm: 'Ayer-ը (երեկ) ցույց է տալիս կոնկրետ ավարտված գործողություն անցյալում։'
  },
  {
    question: 'Todos los días (comer) manzana cuando era niño.',
    opinions: ['comía', 'comí'],
    correct: 'comía',
    tense: 'imperfecto',
    reasonArm: 'Todos los días-ը (ամեն օր) և "cuando era niño"-ն ցույց են տալիս սովորություն անցյալում։'
  },
  {
    question: 'De repente (empezar) a llover.',
    opinions: ['empezaba', 'empezó'],
    correct: 'empezó',
    tense: 'indefinido',
    reasonArm: 'De repente-ն (հանկարծ) ցույց է տալիս կտրուկ, միանվագ գործողություն անցյալում։'
  },
  {
    question: 'Mi abuela (ser) muy amable.',
    opinions: ['fue', 'era'],
    correct: 'era',
    tense: 'imperfecto',
    reasonArm: 'Նկարագրություն անցյալում (մարդու բնավորության գիծ)։'
  },
  {
    question: 'El domingo pasado (jugar) al fútbol.',
    opinions: ['jugaba', 'jugué'],
    correct: 'jugué',
    tense: 'indefinido',
    reasonArm: 'El domingo pasado-ն (անցյալ կիրակի) սահմանափակ ժամանակ է անցյալում։'
  }
];

// Game 5: Mom's Recipe cooking steps
export const RECIPE_STEPS = [
  { step: '1', task: 'Mamá (comprar) las verduras hoy.', options: ['ha comprado', 'había comprado'], correct: 'ha comprado', exp: 'Hoy (այսօր) նշանակում է Pretérito Perfecto:' },
  { step: '2', task: 'Nosotros (lavar) las patatas.', options: ['hemos lavado', 'habíamos lavado'], correct: 'hemos lavado', exp: 'Pretérito Perfecto hemos + lavado:' },
  { step: '3', task: 'Mamá (añadir) la sal hace un momento.', options: ['ha añadido', 'añadía'], correct: 'ha añadido', exp: 'Գործողություն, որը նոր է ավարտվել:' },
  { step: '4', task: 'La abuela (preparar) la mesa ya hoy.', options: ['ha preparado', 'preparó'], correct: 'ha preparado', exp: 'Hoy-ի մեջ ավարտված գործողություն:' }
];

// Game 8: Fill the Gap Story
export const STORY_SLIDES = [
  {
    id: 1,
    titleArm: 'Գոռի արկածները այգում',
    descArm: 'Գոռը գնաց այգի։ Ընտրիր ճիշտ բայաձևը պատմությունը շարունակելու համար։',
    sentence: 'Ayer Gor _____ (ir) al parque para jugar con sus amigos.',
    options: ['iba', 'fui', 'fue'],
    correct: 'fue',
    explanation: 'Gor-ն երրորդ դեմք է, ayer-ի հետ օգտագործվում է Indefinido (fue)։'
  },
  {
    id: 2,
    titleArm: 'Եղանակը այգում',
    descArm: 'Այգում հրաշալի եղանակ էր։',
    sentence: 'En el parque _____ (hacer) mucho sol y los pájaros cantaban.',
    options: ['hizo', 'hacía', 'ha hecho'],
    correct: 'hacía',
    explanation: 'Եղանակի և մթնոլորտի նկարագրության համար օգտագործվում է Imperfecto (hacía)։'
  },
  {
    id: 3,
    titleArm: 'Անակնկալ տատիկից',
    descArm: 'Մինչ տուն գալը տատիկը արդեն տորթ էր պատրաստել։',
    sentence: 'Cuando Gor volvió a casa, la abuela ya _____ (preparar) un pastel rico.',
    options: ['había preparado', 'ha preparado', 'preparó'],
    correct: 'había preparado',
    explanation: 'Անցյալից առաջ տեղի ունեցած գործողություն (արդեն պատրաստել էր)՝ Pluscuamperfecto։'
  }
];

// Game 9: Verb Conjugator Pro
export const CONJUGATE_CHALLENGES = [
  {
    verb: 'Cantar',
    tense: 'imperfecto',
    pronoun: 'Nosotros',
    correct: 'cantábamos',
    options: ['cantamos', 'cantábamos', 'habíamos cantado', 'cantabais']
  },
  {
    verb: 'Comer',
    tense: 'perfecto',
    pronoun: 'Tú',
    correct: 'has comido',
    options: ['comiste', 'habías comido', 'has comido', 'comes']
  },
  {
    verb: 'Escribir',
    tense: 'indefinido',
    pronoun: 'Yo',
    correct: 'escribí',
    options: ['escribía', 'he escrito', 'escribí', 'escribió']
  },
  {
    verb: 'Poner',
    tense: 'pluscuamperfecto',
    pronoun: 'Ellos',
    correct: 'habían puesto',
    options: ['habían puesto', 'han puesto', 'pusieron', 'ponían']
  }
];

// Game 10: Memory Cards
export const MEMORY_CARDS_BASE = [
  { id: 1, text: 'He hablado', matchKey: 'A', lang: 'es' },
  { id: 2, text: 'Խոսել եմ', matchKey: 'A', lang: 'arm' },
  
  { id: 3, text: 'Hablaba', matchKey: 'B', lang: 'es' },
  { id: 4, text: 'Խոսում էի', matchKey: 'B', lang: 'arm' },
  
  { id: 5, text: 'Hablé', matchKey: 'C', lang: 'es' },
  { id: 6, text: 'Խոսեցի', matchKey: 'C', lang: 'arm' },
  
  { id: 7, text: 'Había hablado', matchKey: 'D', lang: 'es' },
  { id: 8, text: 'Խոսել էի', matchKey: 'D', lang: 'arm' },

  { id: 9, text: 'Comí', matchKey: 'E', lang: 'es' },
  { id: 10, text: 'Կերա', matchKey: 'E', lang: 'arm' },

  { id: 11, text: 'Comía', matchKey: 'F', lang: 'es' },
  { id: 12, text: 'Ուտում էի', matchKey: 'F', lang: 'arm' }
];
