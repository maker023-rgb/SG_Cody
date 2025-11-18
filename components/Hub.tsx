import React from 'react';

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const ChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const Hub = () => {
    const handleNavigate = (hash: string) => {
        window.location.hash = hash;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, hash: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleNavigate(hash);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <main className="flex-grow flex items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">서강 커리어 플래너</h1>
                    <p className="text-lg md:text-xl text-gray-500 mb-12">AI 기반 맞춤형 진로 로드맵과 객관적인 취업 통계 분석을 제공합니다</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div 
                            role="button"
                            tabIndex={0}
                            onClick={() => handleNavigate('chat1')}
                            onKeyDown={(e) => handleKeyDown(e, 'chat1')}
                            className="cursor-pointer block p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <BriefcaseIcon />
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">AI 로드맵 코디</h2>
                            <p className="text-gray-600">개인별 맞춤 진로 로드맵 / 추천 프로그램 & FAQ</p>
                        </div>
                        <div 
                            role="button"
                            tabIndex={0}
                            onClick={() => handleNavigate('chat2')}
                            onKeyDown={(e) => handleKeyDown(e, 'chat2')}
                            className="cursor-pointer block p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <ChartBarIcon />
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">취업 통계 브리핑</h2>
                            <p className="text-gray-600">학과별 취업률/진학률 및 통계 비교 분석</p>
                        </div>
                    </div>
                </div>
            </main>
            
            <footer className="w-full text-center p-6 bg-gray-100 border-t border-gray-200">
                <p className="text-sm text-red-600 font-semibold mb-3">챗봇에 학번, 이름 등 개인 식별 정보는 절대 입력하지 마세요!</p>
                <p className="text-xs text-gray-500">운영/관리 부서: 서강대학교 학생지원처 취업지원팀</p>
                <p className="text-xs text-gray-500">
                    © 2024 Sogang University. All Rights Reserved.
                </p>
            </footer>
        </div>
    );
};

export default Hub;
