import React, { useState, useEffect, useRef } from 'react';
import { CHAT_CONFIGS, HISTORY_LENGTH } from '../constants.ts';
import { fetchRoadmapAnswer, fetchStatsAnswer } from '../services/apiService.ts';
import { Message, HistoryTurn, ChatMode } from '../types.ts';

interface ChatProps {
    mode: ChatMode;
}

const HomeIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const SendIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);

// FIX: Explicitly type Chat component as React.FC<ChatProps> to allow for standard React props like `key`.
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
            botResponseText = `An error occurred: ${error.message}`;
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
    
    const handleRecommendedClick = (question: string) => {
        handleSendMessage(question);
    };

    return (
        <div className="flex flex-col h-screen max-w-3xl mx-auto bg-white shadow-2xl rounded-lg">
            <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <h1 className="text-xl font-bold text-gray-800">{config.title}</h1>
                <button 
                    onClick={() => window.location.hash = 'hub'} 
                    className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md p-1">
                    <HomeIcon className="w-5 h-5 mr-1" />
                    홈으로 돌아가기
                </button>
            </header>

            <main ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto space-y-6">
                {messages.length === 0 && !isLoading && (
                    <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">추천 질문:</h3>
                        <div className="flex flex-col space-y-2">
                            {config.recommendedQuestions.map((q, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => handleRecommendedClick(q)} 
                                    className="w-full text-left p-3 bg-white rounded-md shadow-sm hover:bg-gray-100 transition-colors text-sm text-gray-600 border border-gray-200"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md lg:max-w-lg p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-end gap-2 justify-start">
                         <div className="max-w-sm lg:max-w-md p-3 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none">
                             <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                <span className="text-sm text-gray-500">답변을 생성 중입니다...</span>
                             </div>
                         </div>
                    </div>
                )}
            </main>

            <footer className="p-4 bg-white border-t border-gray-200 rounded-b-lg">
                <form onSubmit={handleSubmit} className="flex items-center space-x-3">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="메시지를 입력하세요..."
                        className="flex-1 w-full px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        className="flex-shrink-0 w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <SendIcon className="w-5 h-5" />
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default Chat;