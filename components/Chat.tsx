
import React, { useState, useEffect, useRef } from 'react';
import { CHAT_CONFIGS, HISTORY_LENGTH } from '../constants.ts';
import { fetchRoadmapAnswer, fetchStatsAnswer } from '../services/apiService.ts';
import { Message, HistoryTurn, ChatMode } from '../types.ts';

interface ChatProps {
    mode: ChatMode;
}

const ArrowLeftIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const RefreshIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);

const SendIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);

const Chat: React.FC<ChatProps> = ({ mode }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [history, setHistory] = useState<HistoryTurn[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const config = CHAT_CONFIGS[mode];

    useEffect(() => {
        chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
    }, [messages, isLoading]);

    const handleSendMessage = async (messageText: string) => {
        if (!messageText.trim() || isLoading) return;

        const userMessage: Message = { id: Date.now(), text: messageText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        let botResponseText;
        try {
            if (mode === 'roadmap') {
                botResponseText = await fetchRoadmapAnswer(messageText, history);
            } else {
                botResponseText = await fetchStatsAnswer(messageText);
            }
        } catch (error: any) {
            botResponseText = `오류가 발생했습니다: ${error.message}`;
        }
        
        setIsLoading(false);
        
        const botMessage: Message = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);

        if (mode === 'roadmap') {
            const newTurn: HistoryTurn = { user: messageText, bot: botResponseText };
            setHistory(prev => [...prev, newTurn].slice(-HISTORY_LENGTH));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(inputValue);
    };

    // 전체 페이지 새로고침이 아닌, 채팅 상태만 초기화하는 함수
    const handleRefresh = () => {
        // 사용자 확인 없이 즉시 초기화 (요청 반영)
        setMessages([]);
        setHistory([]);
        setInputValue('');
        setIsLoading(false);
    };
    
    const handleRecommendedClick = (prompt: string) => {
        handleSendMessage(prompt);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm z-10">
                <button 
                    onClick={() => window.location.hash = 'hub'} 
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="홈으로 이동"
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                
                <div className="text-center">
                    <h1 className="text-[#9D2235] font-bold text-lg">{config.title}</h1>
                    <p className="text-xs text-gray-500 font-medium">{config.subtitle}</p>
                </div>

                <button 
                    onClick={handleRefresh}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="대화 초기화"
                >
                    <RefreshIcon className="w-5 h-5" />
                </button>
            </header>

            {/* Main Chat Area */}
            <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
                {/* Welcome Card & Recommended Chips (Only when no messages) */}
                {messages.length === 0 && !isLoading && (
                    <div className="space-y-6 mt-4 animate-fade-in-up">
                        <div className="bg-white p-6 rounded-3xl shadow-sm mx-2 text-center border border-gray-50">
                            <p className="text-gray-800 text-sm leading-relaxed">
                                안녕하세요! <strong>{config.title}</strong>입니다.
                                <br /><br />
                                서강대 학생들을 위한 맞춤형 진로 로드맵을 안내해 드릴게요.
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-2 px-2">
                            {config.recommendedQuestions.map((q, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => handleRecommendedClick(q.prompt)} 
                                    className="flex items-center space-x-1 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-indigo-200 transition-all text-xs text-gray-600 active:scale-95"
                                >
                                    <span>{q.icon}</span>
                                    <span>{q.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Messages */}
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] px-4 py-3 shadow-sm text-sm leading-relaxed
                            ${msg.sender === 'user' 
                                ? 'bg-[#9D2235] text-white rounded-2xl rounded-tr-sm' 
                                : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-100'
                            }`}
                        >
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                    <div className="flex justify-start animate-pulse">
                         <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm">
                             <div className="flex items-center space-x-1">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                             </div>
                         </div>
                    </div>
                )}
            </main>

            {/* Input Area */}
            <footer className="bg-white p-3 border-t border-gray-100">
                <div className="max-w-4xl mx-auto w-full">
                    <form onSubmit={handleSubmit} className="relative flex items-center">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="메시지를 입력하세요..."
                            className="w-full pl-5 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-[#9D2235] focus:bg-white transition-colors text-sm placeholder-gray-400"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !inputValue.trim()}
                            className="absolute right-2 p-2 bg-[#9D2235] text-white rounded-full hover:bg-[#8a1c2d] disabled:bg-gray-300 disabled:cursor-not-allowed transition-transform active:scale-90"
                        >
                            <SendIcon className="w-4 h-4 rotate-90" />
                        </button>
                    </form>
                </div>
            </footer>
        </div>
    );
};

export default Chat;
