
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export interface HistoryTurn {
  user: string;
  bot: string;
}

export interface RecommendedQuestion {
  icon: string;
  label: string;
  prompt: string;
}

export type ChatMode = 'roadmap' | 'stats';
