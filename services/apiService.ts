import { HistoryTurn } from '../types.ts';

// Helper function to format the conversation history and the new prompt
const formatPromptWithHistory = (prompt: string, history: HistoryTurn[]): string => {
  const historyText = history
    .map(turn => `User: ${turn.user}\nBot: ${turn.bot}`)
    .join('\n\n');
  return historyText ? `${historyText}\n\nUser: ${prompt}` : `User: ${prompt}`;
};


export const fetchRoadmapAnswer = async (prompt: string, history: HistoryTurn[]): Promise<string> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 1 minute timeout

  try {
    const formattedPrompt = formatPromptWithHistory(prompt, history);

    const response = await fetch('https://ai.potens.ai/api/rag-lab', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 51376aa61986d0f2fc69468cdf386a61',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        uuid: 'f67cb875-e1c1-4caa-a51e-be5c10a63237',
        prompt: formattedPrompt,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Provide a more specific error for server-side issues
      throw new Error(`API 서버 오류: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // As requested, extract the 'message' field from the JSON response.
    if (data && typeof data.message === 'string') {
      return data.message;
    } else {
      // Fallback if the response format is unexpected
      return '응답 형식이 올바르지 않습니다. 받은 데이터: ' + JSON.stringify(data);
    }

  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      return 'API 요청 시간이 1분을 초과했습니다.';
    }
    // This will catch CORS errors, network failures, etc.
    return `API 호출에 실패했습니다: ${error.message}`;
  }
};


// The stats answer function remains a mock as per the original requirements.
export const fetchStatsAnswer = async (prompt: string): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const lowerCasePrompt = prompt.toLowerCase();
      if (lowerCasePrompt.includes('취업률') || lowerCasePrompt.includes('경영학과')) {
        resolve('[Mock Data] 2023년 취업 통계 기준 서강대학교 경영학과 취업률은 85.3%입니다.');
      } else if (lowerCasePrompt.includes('진학률') || lowerCasePrompt.includes('물리학과')) {
        resolve('[Mock Data] 2023년 취업 통계 기준 물리학과의 진학률은 45.1%이며, 이는 자연과학대학 평균 진학률(42.5%)과 비교하면 높은 수치입니다.');
      } else {
        resolve('[Mock Data] 통계 비교 API는 현재 준비 중입니다.');
      }
    }, 1000);
  });
};
