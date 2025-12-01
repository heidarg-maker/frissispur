export interface Question {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  difficulty: 'Auðvelt' | 'Miðlungs' | 'Erfitt';
}

export enum GameState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  WON = 'WON',
  GAME_OVER = 'GAME_OVER' // Not used currently as we just retry, but good practice
}