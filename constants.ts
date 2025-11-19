
import { RecommendedQuestion } from './types.ts';

export const HISTORY_LENGTH = 3;

interface ChatConfig {
  title: string;
  subtitle: string;
  recommendedQuestions: RecommendedQuestion[];
}

export const CHAT_CONFIGS: Record<string, ChatConfig> = {
  roadmap: {
    title: 'SG Cody',
    subtitle: 'AI 로드맵 코디',
    recommendedQuestions: [
      { 
        icon: '🐣', 
        label: '저학년 진로 가이드', 
        prompt: '저학년인데 진로 준비는 언제부터 시작해야 하나요?' 
      },
      { 
        icon: '🤔', 
        label: '나의 강점 찾기', 
        prompt: '내가 뭘 잘할 수 있는지 모르겠어요.' 
      },
      { 
        icon: '😵', 
        label: '나도 나를 모르겠어', 
        prompt: '나도 나를 잘 모르겠어요. 어디서부터 시작하죠?' 
      },
      { 
        icon: '🏢', 
        label: '취지팀 방문 문의', 
        prompt: '아무것도 모르겠는데 취업진로지원팀에 가도 되나요?' 
      },
    ],
  },
  stats: {
    title: 'SG Cody',
    subtitle: '취업 통계 브리핑',
    recommendedQuestions: [
      { 
        icon: '📊', 
        label: '전체 취업률', 
        prompt: '작년 서강대학교 전체 취업률이 궁금해.' 
      },
      { 
        icon: '🆚', 
        label: '학과별 비교', 
        prompt: '경영학과랑 경제학과 취업률 비교해줘.' 
      },
      { 
        icon: '🔬', 
        label: '진출 분야', 
        prompt: '물리학과 졸업생들의 주요 진출 분야는 어디야?' 
      },
    ],
  },
};
