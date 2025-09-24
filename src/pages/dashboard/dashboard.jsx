import React, { useState, useEffect } from 'react';
import Logo from "../../assets/jpg/eecLogo.jpeg";

// --- ICONS (SVG components) ---
const FaqIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const BlogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5V4.5A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
const EventsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const WebinarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M15 12.5 8 16V9l7 3.5Z" /><path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" /></svg>;
const StudyMaterialIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5V4.5A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
const AnnouncementIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>;
const PodcastIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="4"></circle><path d="M16 12a4 4 0 1 1-8 0"></path><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m4.93 19.07 1.41-1.41"></path><path d="m17.66 6.34 1.41-1.41"></path></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
const ChevronDownIcon = ({ isOpen }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>;
const AddIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
const KebabMenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const PreviewIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;

// --- DATA STORE ---
const initialDataStore = {
    faq: [ { id: 1, question: 'What is the minimum score required for IELTS?', answer: 'The minimum score varies by institution, but a common requirement is an overall band score of 6.5.', category: 'IELTS', status: 'Published' }, { id: 2, question: 'How long is the TOEFL score valid?', answer: 'TOEFL scores are valid for two years from the test date.', category: 'TOEFL', status: 'Published' }, { id: 3, question: 'Can I retake the GMAT?', answer: 'Yes, you can retake the GMAT up to five times within a rolling 12-month period.', category: 'GMAT', status: 'Draft' }, ],
    blogs: [ { id: 1, title: 'Getting Started with React Hooks', content: 'This is the full content of the React Hooks blog post...', slug: 'react-hooks-guide', author: 'Jane Doe', date: '2025-10-22', status: 'Published' }, { id: 2, title: 'A Deep Dive into Tailwind CSS', content: 'Content for the Tailwind CSS blog post goes here...', slug: 'tailwind-css-deep-dive', author: 'John Smith', date: '2025-10-20', status: 'Published' }, { id: 3, title: 'The Future of Web Development', content: 'Exploring the future of web development...', slug: 'future-of-web-dev', author: 'Jane Doe', date: '2025-11-01', status: 'Draft' }, ],
    events: [], webinar: [], study_material: [], announcement: [], podcast: [],
};

// --- REUSABLE MODAL COMPONENTS ---
const CourseModal = ({ isOpen, onClose, onSubmit, initialValue = '', title }) => {
    const [name, setName] = useState(initialValue);
    useEffect(() => { setName(initialValue); }, [initialValue, isOpen]);
    if (!isOpen) return null;
    const handleSubmit = (e) => { e.preventDefault(); if (name.trim()) { onSubmit(name.trim()); onClose(); } };
    return ( <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"> <div className="flex justify-between items-center mb-4"> <h2 className="text-xl font-bold text-gray-800">{title}</h2> <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><CloseIcon /></button> </div> <form onSubmit={handleSubmit}> <label htmlFor="courseName" className="block text-gray-700 font-medium mb-2 text-sm">Course Name</label> <input id="courseName" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g., Pearson Test of English" required autoFocus /> <div className="flex justify-end gap-4 mt-6"> <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 font-semibold">Cancel</button> <button type="submit" className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold">Save</button> </div> </form> </div> </div> );
};

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;
    return ( <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"> <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2> <p className="text-gray-600 mb-6">{message}</p> <div className="flex justify-end gap-4"> <button onClick={onClose} className="px-4 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 font-semibold">Cancel</button> <button onClick={onConfirm} className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold">Delete</button> </div> </div> </div> );
};

// --- FAQ COMPONENTS ---
function FAQEditor({ category, onSave, onCancel, initialFaq = null }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    useEffect(() => { if (initialFaq) { setQuestion(initialFaq.question); setAnswer(initialFaq.answer); } else { setQuestion(''); setAnswer(''); } }, [initialFaq]);
    const handleSaveClick = () => { if (question.trim() && answer.trim()) { onSave({ question, answer, category, status: 'Published' }); } };
    return ( <div className="p-8 w-full"> <header className="flex justify-between items-center mb-6"> <h1 className="text-3xl font-bold text-black">{initialFaq ? `Edit ${category} FAQ` : `Add New ${category} FAQ`}</h1> <div className="flex items-center gap-4"> <button onClick={onCancel} className="font-semibold text-gray-600 hover:text-black">Cancel</button> <button onClick={handleSaveClick} className="bg-red-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-700 transition-colors shadow-sm">{initialFaq ? 'Save Changes' : 'Publish'}</button> </div> </header> <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200"> <form onSubmit={(e) => e.preventDefault()}> <div className="mb-6"> <label htmlFor="question" className="block text-gray-700 font-medium mb-2 text-sm">Question</label> <input type="text" id="question" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full text-xl px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g., What is the passing score?" required /> </div> <div> <label htmlFor="answer" className="block text-gray-700 font-medium mb-2 text-sm">Answer</label> <textarea id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Provide a clear and concise answer here..."></textarea> </div> </form> </div> </div> );
}

function FAQManager({ categoryName, faqs, onAdd, onUpdate, onDelete }) {
    const [view, setView] = useState('list');
    const [currentFaq, setCurrentFaq] = useState(null);
    const handleEditClick = (faq) => { setCurrentFaq(faq); setView('edit'); };
    const handleAddNewClick = () => { setCurrentFaq(null); setView('add'); };
    const handleSave = (faqData) => { if (currentFaq) { onUpdate({ ...faqData, id: currentFaq.id }); } else { onAdd(faqData); } setView('list'); setCurrentFaq(null); };
    const handleCancel = () => { setView('list'); setCurrentFaq(null); }
    if (view === 'add' || view === 'edit') { return <FAQEditor category={categoryName} initialFaq={currentFaq} onSave={handleSave} onCancel={handleCancel} />; }
    return (
        <div className="p-8 w-full">
            <header className="flex justify-between items-center mb-6"> <h1 className="text-3xl font-bold text-black">{categoryName} FAQs</h1> <button onClick={handleAddNewClick} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">{`+ Add New ${categoryName} FAQ`}</button> </header>
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                {faqs.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {faqs.map(faq => (
                            <li key={faq.id} className="p-4 sm:p-6 hover:bg-gray-50 flex justify-between items-start">
                                <div className="flex-grow mr-4">
                                    <h3 className="font-semibold text-gray-800 text-lg">{faq.question}</h3>
                                    <p className="text-gray-600 mt-2">{faq.answer}</p>
                                    <span className={`mt-3 inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${faq.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{faq.status}</span>
                                </div>
                                <div className="flex-shrink-0 ml-4 flex items-center gap-4 mt-1">
                                    <button onClick={() => handleEditClick(faq)} title="Edit FAQ" className="text-gray-500 hover:text-black"><EditIcon /></button>
                                    <button onClick={() => onDelete(faq.id)} title="Delete FAQ" className="text-gray-500 hover:text-red-600"><DeleteIcon /></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : ( <div className="text-center py-16"><h3 className="text-lg font-semibold text-gray-800">No FAQs found.</h3><p className="text-gray-500 mt-2">Click "+ Add New..." to get started.</p></div> )}
            </div>
        </div>
    );
}

// --- BLOG COMPONENTS & ICONS ---
const BoldIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>;
const ItalicIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>;
const LinkIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>;
const ListIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const ImageIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;

const ToolbarButton = ({ children }) => (<button type="button" className="p-2 rounded-md text-gray-600 hover:bg-gray-200 hover:text-black transition-colors duration-200">{children}</button>);

const BlogPreview = ({ title, content }) => {
    return ( <div className="bg-white p-8 sm:p-12 rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto"> <article> <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 break-words">{title || 'Your Blog Title Will Appear Here'}</h1> <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap break-words">{content || 'Your blog content will be displayed here. Start writing in the editor!'}</div> </article> </div> );
};

function BlogWriter({ onSave, onCancel, initialBlog = null }) {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [viewMode, setViewMode] = useState('edit');

    useEffect(() => {
        if (initialBlog) {
            setTitle(initialBlog.title);
            setSlug(initialBlog.slug);
            setContent(initialBlog.content || '');
        } else {
            setTitle(''); setSlug(''); setContent('');
        }
    }, [initialBlog]);

    useEffect(() => {
        if (!initialBlog || title !== initialBlog.title) {
            const generatedSlug = title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
            setSlug(generatedSlug);
        }
    }, [title, initialBlog]);

    const handleSaveClick = () => {
        const blogData = { id: initialBlog?.id, title, slug, content, author: initialBlog?.author || 'Admin', date: new Date().toISOString().split('T')[0], status: 'Published' };
        onSave(blogData);
    };

    return (
        <div className="p-8 w-full">
            <header className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold text-black">{initialBlog ? 'Edit Blog Post' : 'New Blog Post'}</h1>
                    <div className="flex items-center gap-1 bg-gray-200 p-1 rounded-lg">
                        <button onClick={() => setViewMode('edit')} className={`px-4 py-1 rounded-md text-sm font-semibold transition-all duration-200 ${viewMode === 'edit' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:bg-gray-300/50'}`}>Edit</button>
                        <button onClick={() => setViewMode('preview')} className={`px-4 py-1 rounded-md text-sm font-semibold transition-all duration-200 ${viewMode === 'preview' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:bg-gray-300/50'}`}>Preview</button>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={onCancel} className="font-semibold text-gray-600 hover:text-black">Cancel</button>
                    <button onClick={handleSaveClick} className="bg-red-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-700 transition-colors shadow-sm">{initialBlog ? 'Save Changes' : 'Publish'}</button>
                </div>
            </header>
            
            {viewMode === 'edit' ? (
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                    <form>
                        <div className="mb-6"><label htmlFor="title" className="block text-gray-700 font-medium mb-2 text-sm">Title</label><input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full text-2xl font-bold px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Your Awesome Blog Title" required /></div>
                        <div className="mb-6"><label htmlFor="slug" className="block text-gray-700 font-medium mb-2 text-sm">Slug</label><div className="flex items-center"><span className="bg-gray-100 border border-r-0 border-gray-300 text-gray-500 px-3 py-2 rounded-l-lg">yoursite.com/blog/</span><input type="text" id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="your-awesome-blog-title" required /></div></div>
                        <div><label className="block text-gray-700 font-medium mb-2 text-sm">Content</label><div className="bg-gray-50 border border-gray-300 rounded-t-lg p-2 flex items-center gap-2"><ToolbarButton><BoldIcon /></ToolbarButton><ToolbarButton><ItalicIcon /></ToolbarButton><ToolbarButton><LinkIcon /></ToolbarButton><ToolbarButton><ListIcon /></ToolbarButton><ToolbarButton><ImageIcon /></ToolbarButton></div><textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-96 p-4 border border-t-0 border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Write your content here..."></textarea></div>
                    </form>
                </div>
            ) : ( <BlogPreview title={title} content={content} /> )}
        </div>
    );
}

// --- GENERIC & LAYOUT COMPONENTS ---
const GenericContentView = ({ title, data, columns, newItemLabel, moduleType, onDelete, onEdit, onPreview, onAddNew }) => {
    return (
        <div className="p-8 flex-grow">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-black">{title}</h1>
                {newItemLabel && <button onClick={onAddNew} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">+ {newItemLabel}</button>}
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    {data.length > 0 ? (
                        <table className="w-full text-left text-sm text-gray-800">
                            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                                <tr>
                                    {columns.map((col) => <th key={col.key} className="py-3 px-6 font-semibold">{col.header}</th>)}
                                    <th className="py-3 px-6 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        {columns.map((col) => ( <td key={col.key} className="py-4 px-6"> {col.key === 'status' ? ( <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${['Published', 'Live', 'Upcoming', 'Scheduled'].includes(item.status) ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item[col.key]}</span> ) : (item[col.key])} </td> ))}
                                        <td className="py-4 px-6 text-right">
                                            {moduleType === 'blogs' ? (
                                                <div className="flex items-center justify-end gap-4">
                                                    <button onClick={() => onPreview(item)} title="Preview" className="text-gray-500 hover:text-blue-600"><PreviewIcon /></button>
                                                    <button onClick={() => onEdit(item)} title="Edit" className="text-gray-500 hover:text-black"><EditIcon /></button>
                                                    <button onClick={() => onDelete(item)} title="Delete" className="text-gray-500 hover:text-red-600"><DeleteIcon /></button>
                                                </div>
                                            ) : moduleType === 'faq' ? (
                                                <div className="flex items-center justify-end gap-4">
                                                    <button onClick={() => onEdit(item)} title="Edit" className="text-gray-500 hover:text-black"><EditIcon /></button>
                                                    <button onClick={() => onDelete(item)} title="Delete" className="text-gray-500 hover:text-red-600"><DeleteIcon /></button>
                                                </div>
                                            ) : (
                                                <div className="space-x-4">
                                                    <button className="text-gray-600 hover:text-black font-medium">Edit</button>
                                                    <button className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : ( <div className="text-center py-16 px-6"> <h3 className="text-lg font-semibold text-gray-800">Your collection is empty.</h3> <p className="text-gray-500 mt-2">Add a new item to get started.</p> {newItemLabel && <button onClick={onAddNew} className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition-colors duration-300">+ Add New Item</button>} </div> )}
                </div>
            </div>
        </div>
    );
};

const Sidebar = ({ navItems, selectedModule, setSelectedModule, openMenu, setOpenMenu, onAddNewCourse, onRenameCourse, onDeleteCourse }) => {
    const [activeKebabMenu, setActiveKebabMenu] = useState(null);
    useEffect(() => { const handleClickOutside = () => { if (activeKebabMenu) setActiveKebabMenu(null); }; document.addEventListener('click', handleClickOutside); return () => document.removeEventListener('click', handleClickOutside); }, [activeKebabMenu]);
    const KebabMenu = ({ course }) => ( <div className="relative ml-auto"> <button onClick={(e) => { e.stopPropagation(); setActiveKebabMenu(activeKebabMenu === course.id ? null : course.id); }} className="p-1 rounded-full hover:bg-gray-200" title="More options"><KebabMenuIcon /></button> {activeKebabMenu === course.id && ( <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border z-20"> <a href="#" onClick={(e) => { e.preventDefault(); onRenameCourse(course); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Rename</a> <a href="#" onClick={(e) => { e.preventDefault(); onDeleteCourse(course); }} className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete</a> </div> )} </div> );
    return (
        <aside className="w-64 bg-white text-gray-800 flex flex-col p-4 border-r border-gray-200">
            <div className="flex items-center gap-3 px-2 mb-8 h-10"><img src={Logo} alt="Company Logo" className="h-full object-contain" /></div>
            <nav className="flex-grow">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">EEC Collections</h2>
                <ul>
                    {navItems.map(item => (
                        <li key={item.id}>
                            <div onClick={() => { if (item.subItems) { const isOpening = openMenu !== item.id; setOpenMenu(isOpening ? item.id : null); if (isOpening) { const firstSubItem = item.subItems.find(sub => !sub.id.endsWith('_add_new')); if (firstSubItem) setSelectedModule(firstSubItem.id); } } else { setSelectedModule(item.id); setOpenMenu(null); } }} className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer ${(selectedModule.startsWith(item.id) || openMenu === item.id) ? 'bg-red-100 text-red-600 font-semibold' : 'hover:bg-gray-100'}`}>
                                <div className="flex items-center gap-3">{item.icon}<span>{item.name}</span></div>
                                {item.subItems && <ChevronDownIcon isOpen={openMenu === item.id} />}
                            </div>
                            {item.subItems && openMenu === item.id && (
                                <ul className="pl-6 pt-1 pb-1">
                                    {item.subItems.map(subItem => {
                                        const isAddButton = subItem.id.endsWith('_add_new');
                                        return ( <li key={subItem.id} className="flex items-center group"> <a href="#" onClick={(e) => { e.preventDefault(); if (isAddButton) { onAddNewCourse(); } else { setSelectedModule(subItem.id); }}} className={`flex-grow flex items-center gap-3 text-sm py-2 px-4 rounded-md transition-colors w-full ${selectedModule === subItem.id ? 'text-red-600 font-semibold' : 'hover:bg-gray-100'}`}> {subItem.icon && <span className="text-gray-500">{subItem.icon}</span>} <span>{subItem.name}</span> </a> {item.id === 'faq' && !isAddButton && (<div className="opacity-0 group-hover:opacity-100 transition-opacity"><KebabMenu course={subItem} /></div>)} </li> )
                                    })}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="mt-auto"><button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-sm"><LogoutIcon /><span>Logout</span></button></div>
        </aside>
    );
};

// --- INITIAL CONFIGURATION ---
const initialModules = {
    faq: { name: 'FAQ', icon: <FaqIcon />, title: 'All FAQs', newItemLabel: null, columns: [{ key: 'question', header: 'Question' }, { key: 'category', header: 'Category' }, { key: 'status', header: 'Status' }], subItems: [ { id: 'faq_ielts', name: 'IELTS FAQ' }, { id: 'faq_toefl', name: 'TOEFL FAQ' }, { id: 'faq_duolingo', name: 'Duolingo FAQ' }, { id: 'faq_pte', name: 'PTE FAQ' }, { id: 'faq_sat', name: 'SAT FAQ' }, { id: 'faq_gre', name: 'GRE FAQ' }, { id: 'faq_gmat', name: 'GMAT FAQ' }, { id: 'faq_english', name: 'English FAQ' }, { id: 'faq_german', name: 'German FAQ' }, { id: 'faq_french', name: 'French FAQ' }, { id: 'faq_add_new', name: 'Add New Course', icon: <AddIcon/> }, ] },
    blogs: { name: 'Blogs', icon: <BlogIcon />, title: 'All Blogs', newItemLabel: 'New Blog Post', columns: [{ key: 'title', header: 'Title' }, { key: 'author', header: 'Author' }, { key: 'date', header: 'Date' }, { key: 'status', header: 'Status' }], subItems: [{ id: 'blogs_write', name: 'Write new blog' },{ id: 'blogs_drafts', name: 'Drafts' },{ id: 'blogs_published', name: 'Published' }] },
    events: { name: 'Events', icon: <EventsIcon />, title: 'Events', newItemLabel: 'New Event', columns: [{ key: 'name', header: 'Event Name' }, { key: 'date', header: 'Date' }, { key: 'location', header: 'Location' }, { key: 'status', header: 'Status' }] },
    webinar: { name: 'Webinar', icon: <WebinarIcon />, title: 'Webinars', newItemLabel: 'New Webinar', columns: [{ key: 'title', header: 'Title' }, { key: 'speaker', header: 'Speaker' }, { key: 'date', header: 'Date' }, { key: 'status', header: 'Status' }] },
    study_material: { name: 'Study Material', icon: <StudyMaterialIcon />, title: 'Study Materials', newItemLabel: 'New Material', columns: [{ key: 'title', header: 'Title' }, { key: 'type', header: 'Type' }, { key: 'status', header: 'Status' }] },
    announcement: { name: 'Announcement', icon: <AnnouncementIcon />, title: 'Announcements', newItemLabel: 'New Announcement', columns: [{ key: 'title', header: 'Title' }, { key: 'date', header: 'Date' }, { key: 'status', header: 'Status' }] },
    podcast: { name: 'Podcast', icon: <PodcastIcon />, title: 'Podcasts', newItemLabel: 'New Podcast', columns: [{ key: 'title', header: 'Title' }, { key: 'duration', header: 'Duration' }, { key: 'releaseDate', header: 'Release Date' }, { key: 'status', header: 'Status' }] },
};

// --- MAIN APP COMPONENT ---
export default function Dashboard() {
    const [modules, setModules] = useState(initialModules);
    const [dataStore, setDataStore] = useState(initialDataStore);
    const [selectedModule, setSelectedModule] = useState('faq');
    const [openMenu, setOpenMenu] = useState(null);
    const [modalState, setModalState] = useState({ type: null, data: null });
    const [viewState, setViewState] = useState({ type: 'list', data: null });

    const handleAddNewCourse = () => setModalState({ type: 'add', data: null });
    const handleRenameCourse = (course) => setModalState({ type: 'rename', data: course });
    const handleDeleteCourse = (course) => setModalState({ type: 'delete-course', data: course });
    const handleSaveCourse = (newName) => {
        setModules(prevModules => {
            const newFaq = { ...prevModules.faq };
            const newSubItems = [...newFaq.subItems];
            if (modalState.type === 'add') {
                const slug = newName.toLowerCase().replace(/\s+/g, '_');
                const newCourse = { id: `faq_${slug}`, name: `${newName} FAQ` };
                newSubItems.splice(newSubItems.length - 1, 0, newCourse);
            } else if (modalState.type === 'rename') {
                const courseIndex = newSubItems.findIndex(item => item.id === modalState.data.id);
                if (courseIndex > -1) newSubItems[courseIndex] = { ...newSubItems[courseIndex], name: `${newName} FAQ` };
            }
            newFaq.subItems = newSubItems;
            return { ...prevModules, faq: newFaq };
        });
        setModalState({ type: null, data: null });
    };

    const handleConfirmDeleteCourse = () => {
        const courseToDelete = modalState.data;
        setModules(prevModules => {
            const newFaq = { ...prevModules.faq };
            newFaq.subItems = newFaq.subItems.filter(item => item.id !== courseToDelete.id);
            return { ...prevModules, faq: newFaq };
        });
        setDataStore(prevData => ({ ...prevData, faq: prevData.faq.filter(item => item.category.toUpperCase() !== courseToDelete.name.replace(' FAQ', '').toUpperCase()) }));
        setModalState({ type: null, data: null });
        if (selectedModule === courseToDelete.id) setSelectedModule('faq');
    };

    const handleAddFaq = (newFaqData) => { setDataStore(prevData => ({ ...prevData, faq: [...prevData.faq, { ...newFaqData, id: Date.now() }] })); };
    const handleUpdateFaq = (updatedFaqData) => { setDataStore(prevData => ({ ...prevData, faq: prevData.faq.map(f => f.id === updatedFaqData.id ? updatedFaqData : f) })); };
    const handleDeleteFaq = (item) => setModalState({ type: 'delete-faq', data: item });
    const handleConfirmDeleteFaq = () => {
        setDataStore(prev => ({ ...prev, faq: prev.faq.filter(f => f.id !== modalState.data.id) }));
        setModalState({ type: null, data: null });
    };

    const handleEditFaq = (faq) => {
        const categorySlug = faq.category.toLowerCase().replace(/\s+/g, '_');
        setSelectedModule(`faq_${categorySlug}`);
        setOpenMenu('faq');
        setViewState({ type: 'edit-faq', data: faq });
    };

    useEffect(() => {
        if (viewState.type === 'edit-faq' && selectedModule.startsWith('faq_')) {
            const timeoutId = setTimeout(() => {
                const faqManager = document.querySelector('.faq-manager-container'); // You'd need to add this class
                if (faqManager) {
                    const managerInstance = faqManager.__reactInternalInstance$.return.stateNode;
                    managerInstance.handleEditClick(viewState.data);
                }
                setViewState({ type: 'list', data: null }); 
            }, 10);
            return () => clearTimeout(timeoutId);
        }
    }, [viewState, selectedModule]);

    const handleWriteNewBlog = () => setViewState({ type: 'edit-blog', data: null });
    const handleEditBlog = (blog) => setViewState({ type: 'edit-blog', data: blog });
    const handlePreviewBlog = (blog) => setViewState({ type: 'preview-blog', data: blog });
    const handleDeleteBlog = (blog) => setModalState({ type: 'delete-blog', data: blog });
    const handleSaveBlog = (blogToSave) => {
        if (blogToSave.id) { setDataStore(prev => ({ ...prev, blogs: prev.blogs.map(b => b.id === blogToSave.id ? blogToSave : b) }));
        } else { setDataStore(prev => ({ ...prev, blogs: [...prev.blogs, { ...blogToSave, id: Date.now() }] })); }
        setViewState({ type: 'list', data: null });
        setSelectedModule('blogs_published');
    };
    const handleConfirmDeleteBlog = () => {
        setDataStore(prev => ({ ...prev, blogs: prev.blogs.filter(b => b.id !== modalState.data.id) }));
        setModalState({ type: null, data: null });
    };

    const navItems = Object.entries(modules).map(([id, config]) => ({ id, ...config }));
    
    const renderContent = () => {
        if (viewState.type === 'edit-blog') { return <BlogWriter initialBlog={viewState.data} onSave={handleSaveBlog} onCancel={() => setViewState({ type: 'list', data: null })} />; }
        if (selectedModule === 'blogs_write') { return <BlogWriter initialBlog={null} onSave={handleSaveBlog} onCancel={() => setSelectedModule('blogs_published')} />; }

        const [mainModuleId, ...subModuleParts] = selectedModule.split('_');
        const subModuleId = subModuleParts.join('_');
        if (!modules[mainModuleId]) { return <GenericContentView title="Not Found" data={[]} columns={[]} newItemLabel="" />; }
        const mainModule = modules[mainModuleId];

        if (mainModuleId === 'faq' && subModuleId) {
            const subItemConfig = mainModule.subItems.find(item => item.id === selectedModule);
            const categoryName = subItemConfig ? subItemConfig.name.replace(' FAQ', '') : 'New Course';
            const categoryFaqs = dataStore.faq.filter(f => f.category === categoryName);
            return <FAQManager categoryName={categoryName} faqs={categoryFaqs} onAdd={handleAddFaq} onUpdate={handleUpdateFaq} onDelete={(id) => handleDeleteFaq(dataStore.faq.find(f => f.id === id))} />;
        }
        
        let data = dataStore[mainModuleId] || [];
        let title = mainModule.title;
        if (mainModuleId === 'blogs') {
             if (subModuleId === 'drafts') { data = dataStore.blogs.filter(item => item.status === 'Draft'); title = 'Draft Blogs'; } 
             else if (subModuleId === 'published') { data = dataStore.blogs.filter(item => item.status === 'Published'); title = 'Published Blogs'; }
        } else if (mainModuleId === 'faq') {
            data = dataStore.faq;
        }

        return <GenericContentView title={title} data={data} columns={mainModule.columns} newItemLabel={mainModule.newItemLabel} moduleType={mainModuleId} onAddNew={mainModuleId === 'blogs' ? handleWriteNewBlog : null} onDelete={mainModuleId === 'faq' ? handleDeleteFaq : handleDeleteBlog} onEdit={mainModuleId === 'faq' ? handleEditFaq : handleEditBlog} onPreview={handlePreviewBlog} />;
    };

    return (
        <div className="bg-gray-100 font-sans flex h-screen">
            <CourseModal isOpen={modalState.type === 'add' || modalState.type === 'rename'} onClose={() => setModalState({ type: null, data: null })} onSubmit={handleSaveCourse} initialValue={modalState.type === 'rename' ? modalState.data.name.replace(' FAQ', '') : ''} title={modalState.type === 'add' ? 'Add New Course' : 'Rename Course'} />
            <ConfirmModal isOpen={modalState.type === 'delete-course'} onClose={() => setModalState({ type: null, data: null })} onConfirm={handleConfirmDeleteCourse} title="Delete Course" message={`Delete "${modalState.data?.name}"? This will also remove all associated FAQs.`} />
            <ConfirmModal isOpen={modalState.type === 'delete-blog'} onClose={() => setModalState({ type: null, data: null })} onConfirm={handleConfirmDeleteBlog} title="Delete Blog Post" message={`Are you sure you want to delete "${modalState.data?.title}"?`} />
             <ConfirmModal
                isOpen={modalState.type === 'delete-faq'}
                onClose={() => setModalState({ type: null, data: null })}
                onConfirm={handleConfirmDeleteFaq}
                title="Delete FAQ"
                message={`Are you sure you want to delete this FAQ?`}
                />

            {viewState.type === 'preview-blog' && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setViewState({ type: 'list', data: null })}>
                    <div onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl max-h-full overflow-y-auto"><BlogPreview title={viewState.data.title} content={viewState.data.content} /></div>
                </div>
            )}
            <Sidebar navItems={navItems} selectedModule={selectedModule} setSelectedModule={setSelectedModule} openMenu={openMenu} setOpenMenu={setOpenMenu} onAddNewCourse={handleAddNewCourse} onRenameCourse={handleRenameCourse} onDeleteCourse={handleDeleteCourse} />
            <main className="flex-1 flex flex-col overflow-y-auto">{renderContent()}</main>
        </div>
    );
}
