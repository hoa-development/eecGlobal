import React, { useState, useEffect } from 'react';

// --- ICONS (SVG components for the editor toolbar) ---
const BoldIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>;
const ItalicIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>;
const LinkIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>;
const ListIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const ImageIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;

// A reusable button for the editor's toolbar
const ToolbarButton = ({ children }) => (
    <button type="button" className="p-2 rounded-md text-gray-600 hover:bg-gray-200 hover:text-black transition-colors duration-200">
        {children}
    </button>
);

// A dedicated component for the blog preview
const BlogPreview = ({ title, content }) => {
    return (
        <div className="bg-white p-8 sm:p-12 rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <article>
                <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 break-words">
                    {title || 'Your Blog Title Will Appear Here'}
                </h1>
                {/* To render newlines from the textarea, we use whitespace-pre-wrap */}
                <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
                    {content || 'Your blog content will be displayed here. Start writing in the editor!'}
                </div>
            </article>
        </div>
    );
};

// The main BlogWriter component
function BlogWriter() {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [viewMode, setViewMode] = useState('edit'); // 'edit' or 'preview'

    // Effect to auto-generate the slug from the title
    useEffect(() => {
        const generatedSlug = title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')       // Replace spaces with -
            .replace(/[^\w-]+/g, '')    // Remove all non-word chars
            .replace(/--+/g, '-');      // Replace multiple - with single -
        setSlug(generatedSlug);
    }, [title]);

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            {/* Header Section */}
            <header className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold text-black">
                        New Blog Post
                    </h1>
                     {/* View Toggler */}
                    <div className="flex items-center gap-1 bg-gray-200 p-1 rounded-lg">
                        <button 
                            onClick={() => setViewMode('edit')}
                            className={`px-4 py-1 rounded-md text-sm font-semibold transition-all duration-200 ${
                                viewMode === 'edit' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:bg-gray-300/50'
                            }`}
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => setViewMode('preview')}
                            className={`px-4 py-1 rounded-md text-sm font-semibold transition-all duration-200 ${
                                viewMode === 'preview' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:bg-gray-300/50'
                            }`}
                        >
                            Preview
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="text-gray-600 font-semibold hover:text-black transition-colors">
                        Save Draft
                    </button>
                    <button className="bg-red-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-700 transition-colors shadow-sm">
                        Publish
                    </button>
                </div>
            </header>
            
            {/* Conditional View: Editor or Preview */}
            {viewMode === 'edit' ? (
                 // --- EDITOR VIEW ---
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                    <form>
                        {/* Title Field */}
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-gray-700 font-medium mb-2 text-sm">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full text-2xl font-bold px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Your Awesome Blog Title"
                                required
                            />
                        </div>

                        {/* Slug Field */}
                        <div className="mb-6">
                            <label htmlFor="slug" className="block text-gray-700 font-medium mb-2 text-sm">
                                Slug
                            </label>
                            <div className="flex items-center">
                                <span className="bg-gray-100 border border-r-0 border-gray-300 text-gray-500 px-3 py-2 rounded-l-lg">
                                    yoursite.com/blog/
                                </span>
                                <input
                                    type="text"
                                    id="slug"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="your-awesome-blog-title"
                                    required
                                />
                            </div>
                        </div>

                        {/* Content Field (Rich Text Editor Simulation) */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2 text-sm">
                                Content
                            </label>
                            <div className="bg-gray-50 border border-gray-300 rounded-t-lg p-2 flex items-center gap-2">
                               <ToolbarButton><BoldIcon /></ToolbarButton>
                               <ToolbarButton><ItalicIcon /></ToolbarButton>
                               <ToolbarButton><LinkIcon /></ToolbarButton>
                               <ToolbarButton><ListIcon /></ToolbarButton>
                               <ToolbarButton><ImageIcon /></ToolbarButton>
                            </div>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-96 p-4 border border-t-0 border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Write your content here..."
                            />
                        </div>
                    </form>
                </div>
            ) : (
                // --- PREVIEW VIEW ---
                <BlogPreview title={title} content={content} />
            )}
        </div>
    );
}

export default BlogWriter;

