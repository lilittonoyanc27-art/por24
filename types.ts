/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TenseType = 'perfecto' | 'imperfecto' | 'pluscuamperfecto' | 'indefinido';

export interface DialogueLine {
  id: number;
  speaker: 'Gor' | 'Gayane';
  textEsp: string;
  textArm: string;
  explanationArm: {
    title: string;
    translation: string;
    structure: string;
    breakdown: string[];
    tenseInfo?: string;
  };
}

export interface VerbItem {
  infinitive: string;
  tense: TenseType;
  pronoun: string;
  conjugation: string;
  translation: string;
}

export interface PlayerState {
  name: string;
  score: number;
}

export interface GameDefinition {
  id: number;
  titleArm: string;
  titleEsp: string;
  icon: string;
  descriptionArm: string;
  descriptionEsp: string;
}
