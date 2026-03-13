import React, { useEffect, useRef, useState } from 'react';
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi';
import { sendChatMessage } from '../services/api';
import './ChatbotWidget.css';

const defaultSuggestions = [
    'Suggest a healthy breakfast',
    'What organic snacks should I buy?',
    'Give me a simple grocery list for a week'
];

function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            text: 'Hi! I can help with healthy food ideas, grocery suggestions, and simple organic shopping tips.'
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState(defaultSuggestions);
    const [error, setError] = useState('');
    const messagesRef = useRef(null);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const submitMessage = async (messageText) => {
        const trimmedMessage = messageText.trim();

        if (!trimmedMessage || loading) {
            return;
        }

        setMessages((prev) => [...prev, { role: 'user', text: trimmedMessage }]);
        setInput('');
        setError('');
        setLoading(true);

        try {
            const requestHistory = [...messages, { role: 'user', text: trimmedMessage }];
            const data = await sendChatMessage(trimmedMessage, requestHistory);
            setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
            setSuggestions(data.suggestions || defaultSuggestions);
        } catch (err) {
            setError(err.message || 'Could not fetch response right now.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await submitMessage(input);
    };

    return (
        <>
            <button
                className="chatbot-launcher"
                type="button"
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {isOpen ? <FiX /> : <FiMessageCircle />}
            </button>

            <aside className={`chatbot-panel ${isOpen ? 'open' : ''}`}>
                <header className="chatbot-header">
                    <div>
                        <h3>Organic Assistant</h3>
                        <p>Ask food and shopping questions</p>
                    </div>
                    <button
                        type="button"
                        className="chatbot-close"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close chat panel"
                    >
                        <FiX />
                    </button>
                </header>

                <div className="chatbot-messages" ref={messagesRef}>
                    {messages.map((message, index) => (
                        <div key={`${message.role}-${index}`} className={`chatbot-row ${message.role}`}>
                            <div className="chatbot-bubble">{message.text}</div>
                        </div>
                    ))}

                    {loading && (
                        <div className="chatbot-row assistant">
                            <div className="chatbot-bubble">Thinking...</div>
                        </div>
                    )}
                </div>

                {error && <div className="chatbot-error">{error}</div>}

                <div className="chatbot-suggestions">
                    {suggestions.slice(0, 2).map((question) => (
                        <button
                            key={question}
                            type="button"
                            disabled={loading}
                            onClick={() => submitMessage(question)}
                        >
                            {question}
                        </button>
                    ))}
                </div>

                <form className="chatbot-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        placeholder="Ask anything about healthy food..."
                    />
                    <button type="submit" disabled={loading || !input.trim()} aria-label="Send message">
                        <FiSend />
                    </button>
                </form>
            </aside>
        </>
    );
}

export default ChatbotWidget;