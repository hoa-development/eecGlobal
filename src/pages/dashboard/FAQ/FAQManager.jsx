import React, { useState } from 'react';
import FAQEditor from './FAQEditor'; // Assumes FAQ.jsx is renamed or is the editor

// A simple icon for Edit/Delete actions
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;


function FAQManager({ categoryName, faqs, onAdd, onUpdate, onDelete }) {
    // 'list' shows published FAQs, 'edit' shows the editor for a specific FAQ, 'add' shows a blank editor
    const [view, setView] = useState('list'); 
    const [currentFaq, setCurrentFaq] = useState(null); // The FAQ being edited

    const handleEditClick = (faq) => {
        setCurrentFaq(faq);
        setView('edit');
    };

    const handleAddNewClick = () => {
        setCurrentFaq(null); // No initial data for a new FAQ
        setView('add');
    };

    const handleSave = (faqData) => {
        if (currentFaq) {
            // It's an update
            onUpdate({ ...faqData, id: currentFaq.id });
        } else {
            // It's a new addition
            onAdd(faqData);
        }
        setView('list');
        setCurrentFaq(null);
    };

    const handleCancel = () => {
        setView('list');
        setCurrentFaq(null);
    }

    // If we are in 'add' or 'edit' mode, render the editor
    if (view === 'add' || view === 'edit') {
        return (
            <FAQEditor 
                category={categoryName}
                initialFaq={currentFaq}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        );
    }
    
    // Default view: List of published FAQs
    return (
        <div className="p-8 w-full">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-black">{categoryName} FAQs</h1>
                <button 
                    onClick={handleAddNewClick}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                >
                    + Add New FAQ
                </button>
            </header>
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                {faqs.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {faqs.map(faq => (
                            <li key={faq.id} className="p-4 sm:p-6 hover:bg-gray-50 flex justify-between items-start">
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-gray-800 text-lg">{faq.question}</h3>
                                    <p className="text-gray-600 mt-2">{faq.answer}</p>
                                    <span className={`mt-3 inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                                        faq.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>{faq.status}</span>
                                </div>
                                <div className="flex-shrink-0 ml-4 flex items-center gap-4 mt-1">
                                    <button onClick={() => handleEditClick(faq)} className="text-gray-500 hover:text-black"><EditIcon /></button>
                                    <button onClick={() => onDelete(faq.id)} className="text-gray-500 hover:text-red-600"><DeleteIcon /></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-lg font-semibold text-gray-800">No FAQs found for this category.</h3>
                        <p className="text-gray-500 mt-2">Click "+ Add New FAQ" to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FAQManager;