import { HistoryTurn } from '../types';

const roadmapMockAnswers: { [key: string]: string } = {
  '저학년인데 진로 준비는 언제부터 시작해야 하나요?':
    '지금이 바로 시작할 때예요!\n- ‘진로탐색입문(1학점)’ 과목을 수강해보세요.\n- 진로상담을 통해 나를 더 잘 이해할 수 있어요.\n- 방학 중에는 진로캠프에 참여해보는 것도 추천해요.',
  '내가 뭘 잘할 수 있는지 모르겠어요.':
    '고민만 하지 말고 직접 부딪혀보세요!\n- 동아리 활동, 아르바이트, 학생회 등 다양한 경험을 통해 나의 강점을 발견할 수 있어요.\n- 행동 속에서 진로의 실마리를 찾을 수 있답니다.',
  '나도 나를 잘 모르겠어요. 어디서부터 시작하죠?':
    '자기이해가 진로의 출발점이에요.\n- 진로심리검사를 통해 나의 성향과 흥미를 파악해보세요.\n- 고용24, 취업지원팀, 학생생활상담연구소에서 도움을 받을 수 있어요.',
  '아무것도 모르겠는데 취업진로지원팀에 가도 되나요?':
    '물론이죠!\n- 개인상담을 통해 차근차근 방향을 잡아갈 수 있어요.\n- SGxBridge 동문 멘토링 특강도 큰 도움이 될 거예요.',
};

const defaultRoadmapAnswer = "[Mock Data] AI 전문가가 되기 위한 맞춤형 로드맵을 제안해 드립니다.\n\n**1학년:**\n- 기초 다지기: '컴퓨터 프로그래밍', '이산수학', '선형대수학' 과목을 통해 탄탄한 수학적, 논리적 기반을 마련하세요.\n\n**2학년:**\n- 핵심 이론: '자료구조', '알고리즘'을 깊이 있게 공부하고, '확률 및 통계'를 수강하여 데이터 분석의 기초를 쌓으세요.\n\n**3학년:**\n- 심화 학습: '머신러닝', '딥러닝', '인공지능' 등 본격적인 AI 과목을 수강하며, 'Sogang AI-Compete'와 같은 교내 경진대회에 참여해 실전 감각을 키우는 것을 추천합니다.\n\n**4학년:**\n- 실무 경험: '캡스톤 디자인' 프로젝트에서 AI 관련 주제를 선택하거나, IT 기업 AI 팀에서 인턴십을 경험하며 포트폴리오를 만드세요.\n\n서강대학교 취업지원팀에서는 관련 기업 채용 연계 프로그램도 운영하고 있으니 참고해 보세요.";


// NOTE: The original fetch call was replaced with a mock response
// to bypass a "Failed to fetch" error, which is likely due to
// the browser's CORS (Cross-Origin Resource Sharing) policy
// blocking the request to the external API.
export const fetchRoadmapAnswer = async (prompt: string, history: HistoryTurn[]): Promise<string> => {
  console.log("Using mock data for roadmap API due to fetch/CORS issues.");
  return new Promise(resolve => {
    setTimeout(() => {
      // Return a specific answer if the prompt is one of the recommended questions, otherwise return the default.
      const answer = roadmapMockAnswers[prompt] || defaultRoadmapAnswer;
      resolve(answer);
    }, 1200); // Simulate network delay
  });
};

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
    }, 1000); // Simulate network delay
  });
};
