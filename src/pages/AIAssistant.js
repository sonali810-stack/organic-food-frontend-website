import React, { useState } from 'react';
import { FiArrowUpRight, FiMessageSquare } from 'react-icons/fi';
import { sendChatMessage } from '../services/api';
import './AIAssistant.css';

const starterQuestions = [
    'Suggest a healthy breakfast',
    'What organic snacks should I buy?',
    'Give me a simple grocery list for a week'
];

function AIAssistant() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            text: 'Ask me simple questions about healthy foods, grocery ideas, or organic shopping suggestions.'
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState(starterQuestions);
    const [error, setError] = useState('');

    const submitMessage = async (messageText) => {
        const trimmedMessage = messageText.trim();

        if (!trimmedMessage || loading) {
            return;
        }

        setMessages((prev) => [...prev, { role: 'user', text: trimmedMessage }]);
        setInput('');
        setLoading(true);
        setError('');

        try {
            const requestHistory = [...messages, { role: 'user', text: trimmedMessage }];
            const data = await sendChatMessage(trimmedMessage, requestHistory);

            setMessages((prev) => [
                ...prev,
                { role: 'assistant', text: data.reply }
            ]);
            setSuggestions(data.suggestions || starterQuestions);
        } catch (err) {
            setError(err.message || 'Unable to get a response right now.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await submitMessage(input);
    };

    return (
        <div className="assistant-page">
            <section className="assistant-hero">
                <div className="assistant-hero-copy">
                    <span className="assistant-tag">Phase 1 Gemini Chatbot</span>
                    <h1>Your Organic Food Assistant</h1>
                    <p>
                        Start with simple food and grocery questions. This version gets answers directly from Gemini through your backend.
                    </p>
                </div>
                <div className="assistant-hero-card">
                    <FiMessageSquare />
                    <p>Good first use cases: breakfast ideas, snack suggestions, weekly shopping help.</p>
                </div>
            </section>

            <section className="assistant-shell">
                <div className="assistant-panel">
                    <div className="assistant-messages">
                        {messages.map((message, index) => (
                            <div key={`${message.role}-${index}`} className={`message-row ${message.role}`}>
                                <div className="message-bubble">
                                    <span className="message-role">{message.role === 'assistant' ? 'Assistant' : 'You'}</span>
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="message-row assistant">
                                <div className="message-bubble loading-bubble">
                                    <span className="message-role">Assistant</span>
                                    <p>Thinking...</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {error && <div className="assistant-error">{error}</div>}

                    <form className="assistant-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Ask about healthy foods, snacks, or grocery ideas"
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                        />
                        <button type="submit" disabled={loading || !input.trim()}>
                            Send <FiArrowUpRight />
                        </button>
                    </form>
                </div>

                <aside className="assistant-sidebar">
                    <div className="sidebar-card">
                        <h2>Try these questions</h2>
                        <div className="suggestion-list">
                            {suggestions.map((question) => (
                                <button
                                    key={question}
                                    type="button"
                                    className="suggestion-chip"
                                    onClick={() => submitMessage(question)}
                                    disabled={loading}
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-card">
                        <h2>What this version does</h2>
                        <ul>
                            <li>Answers general healthy food and shopping questions</li>
                            <li>Keeps your Gemini API key on the backend</li>
                            <li>Gives simple follow-up prompts after each reply</li>
                        </ul>
                    </div>
                </aside>
            </section>
        </div>
    );
}

export default AIAssistant;