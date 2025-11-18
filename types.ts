export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export interface HistoryTurn {
  user: string;
  bot: string;
}

export type ChatMode = 'roadmap' | 'stats';
