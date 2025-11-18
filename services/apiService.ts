import { HistoryTurn } from '../types.ts';

// IMPORTANT WORKAROUND:
// The actual API call to 'https://ai.potens.ai/api/rag-lab' is blocked by the browser's
// CORS policy in this development environment. To allow for continued development and testing
// of the application's UI and features, this function now returns a mock response that
// simulates a real API call. This should be replaced with the real `fetch` call once the
// server is configured to allow requests from this origin.
export const fetchRoadmapAnswer = async (prompt: string, history: HistoryTurn[]): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const mockResponse = {
        message: `This is a simulated AI response to your question: "${prompt}".\n\nI have considered the conversation history to provide this contextual answer. In a real environment, this would be a detailed roadmap. For now, here are some general tips:\n\n- **Explore:** Take diverse courses and join clubs.\n- **Network:** Talk to alumni and professors.\n- **Practice:** Work on personal projects or internships.\n\n*This mock response is for demonstration purposes due to CORS restrictions.*`,
      };
      resolve(mockResponse.message);
    }, 1500); // Simulate network delay
  });
};


// The stats answer function remains unchanged as per the requirements.
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