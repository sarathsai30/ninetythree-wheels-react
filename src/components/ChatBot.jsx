import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import CarBuyingGuide from './CarBuyingGuide';

const ChatBot = ({ onCarSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello, Welcome to 93Cars..! Which car are you looking for? Please enter car name",
            isBot: true,
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [showGuideOptions, setShowGuideOptions] = useState(false);
    const [showGuidePopup, setShowGuidePopup] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const addMessage = (text, isBot = false) => {
        const newMessage = {
            id: Date.now(),
            text,
            isBot,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        // Add user message
        addMessage(inputValue, false);

        // Trigger car search
        onCarSearch(inputValue);

        // Add bot response
        setTimeout(() => {
            addMessage(`I found cars matching "${inputValue}". Check the results above!`, true);
            setShowGuideOptions(true);
        }, 500);

        setInputValue('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleGuideResponse = (needsGuide) => {
        if (needsGuide) {
            setShowGuidePopup(true);
            addMessage("Great! Opening the car buying guide for you.", true);
        } else {
            addMessage("No problem! Feel free to search for more cars or ask if you need help.", true);
        }
        setShowGuideOptions(false);
    };

    const GuideOptions = () => (
        <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">Need car buying guide?</p>
            <div className="flex gap-2">
                <Button
                    size="sm"
                    onClick={() => handleGuideResponse(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    Yes
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleGuideResponse(false)}
                >
                    No
                </Button>
            </div>
        </div>
    );

    return (
        <>
            {/* Chat Toggle Button */}
            <div className="fixed bottom-6 right-6 z-50">
                {!isOpen && (
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg animate-pulse"
                    >
                        <MessageCircle className="w-6 h-6 text-white" />
                    </Button>
                )}

                {/* Chat Window */}
                {isOpen && (
                    <div className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col overflow-hidden border">
                        {/* Header */}
                        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <MessageCircle className="w-5 h-5" />
                                <span className="font-medium">93Cars Assistant</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-blue-700 p-1"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div
                                        className={`max-w-xs p-3 rounded-lg text-sm ${message.isBot
                                                ? 'bg-gray-100 text-gray-800'
                                                : 'bg-blue-600 text-white'
                                            }`}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}

                            {showGuideOptions && <GuideOptions />}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t bg-gray-50">
                            <div className="flex gap-2">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type a car name..."
                                    className="flex-1"
                                />
                                <Button
                                    onClick={handleSendMessage}
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Car Buying Guide Popup */}
            <CarBuyingGuide
                isOpen={showGuidePopup}
                onClose={() => setShowGuidePopup(false)}
            />
        </>
    );
};

export default ChatBot;