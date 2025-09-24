import React, { useState, useEffect } from 'react';

function FAQEditor({ category, onSave, onCancel, initialFaq = null }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        // If we get an initial FAQ (for editing), populate the fields
        if (initialFaq) {
            setQuestion(initialFaq.question);
            setAnswer(initialFaq.answer);
        } else {
            // Otherwise, ensure fields are clear for a new entry
            setQuestion('');
            setAnswer('');
        }
    }, [initialFaq]);

    const handleSaveClick = () => {
        if (question.trim() && answer.trim()) {
            onSave({
                question,
                answer,
                category,
                status: 'Published' // Or manage status separately if needed
            });
        }
    };

    return (
        <div className="p-8 w-full">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-black">
                    {initialFaq ? `Edit ${category} FAQ` : `Add New ${category} FAQ`}
                </h1>
                <div className="flex items-center gap-4">
                    <button onClick={onCancel} className="font-semibold text-gray-600 hover:text-black">Cancel</button>
                    <button onClick={handleSaveClick} className="bg-red-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-700 transition-colors shadow-sm">
                        {initialFaq ? 'Save Changes' : 'Publish'}
                    </button>
                </div>
            </header>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <form>
                    <div className="mb-6">
                        <label htmlFor="question" className="block text-gray-700 font-medium mb-2 text-sm">Question</label>
                        <input 
                            type="text" 
                            id="question" 
                            value={question} 
                            onChange={(e) => setQuestion(e.target.value)} 
                            className="w-full text-xl px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
                            placeholder="e.g., What is the passing score?" 
                            required 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="answer" className="block text-gray-700 font-medium mb-2 text-sm">Answer</label>
                        <textarea 
                            id="answer" 
                            value={answer} 
                            onChange={(e) => setAnswer(e.target.value)} 
                            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
                            placeholder="Provide a clear and concise answer here..."
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FAQEditor;