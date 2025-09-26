import React, { useState, useEffect, useRef } from 'react';

// --- ICONS (SVG components for the editor toolbar) ---
const BoldIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>;
const ItalicIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>;
const LinkIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>;
const ListIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const ImageIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;

const ToolbarButton = ({ children }) => (<button type="button" className="p-2 rounded-md text-gray-600 hover:bg-gray-200 hover:text-black transition-colors duration-200">{children}</button>);

// --- UPDATED BLOG PREVIEW COMPONENT ---
const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString.replace(/-/g, '/'));
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const BlogPreview = ({ title, content, category, date, image }) => {
    return (
        <div className="bg-white p-8 sm:p-12 rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <article>
                {image && (<img src={image} alt={title || 'Blog post image'} className="w-full h-auto object-cover rounded-lg mb-8" />)}
                {category && (<span className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">{category}</span>)}
                <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 break-words">{title || 'Your Blog Title Will Appear Here'}</h1>
                {date && (<p className="text-gray-500 mb-8">Published on {formatDate(date)}</p>)}
                <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
                    {content || 'Your blog content will be displayed here. Start writing in the editor!'}
                </div>
            </article>
        </div>
    );
};


// The main BlogWriter component
function BlogWriter({ onSave, onCancel, initialBlog = null }) {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [viewMode, setViewMode] = useState('edit');
    const [category, setCategory] = useState('');
    const [publishDate, setPublishDate] = useState(new Date().toISOString().slice(0, 10));

    // --- STATE FOR IMAGE HANDLING ---
    const [imageFile, setImageFile] = useState(null); // To hold the actual file
    const [imagePreview, setImagePreview] = useState(''); // To hold the preview URL
    const fileInputRef = useRef(null);

    const blogCategories = ['Study Abroad Tips', 'Visa Updates & Guidance', 'Test Preparation', 'Scholarships & Financial Aid', 'Student Life & Success Stories'];

    useEffect(() => {
        if (initialBlog) {
            setTitle(initialBlog.title || '');
            setSlug(initialBlog.slug || '');
            setContent(initialBlog.content || '');
            setCategory(initialBlog.category || '');
            setPublishDate(initialBlog.date || new Date().toISOString().slice(0, 10));
            if (initialBlog.image) {
                setImagePreview(initialBlog.image);
            }
        } else {
            // Reset all fields for a new post
            setTitle(''); setSlug(''); setContent(''); setCategory('');
            setPublishDate(new Date().toISOString().slice(0, 10));
            setImageFile(null); setImagePreview('');
        }
    }, [initialBlog]);

    useEffect(() => {
        if (!initialBlog || title !== initialBlog.title) {
            const generatedSlug = title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
            setSlug(generatedSlug);
        }
    }, [title, initialBlog]);
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImageFile(null);
            setImagePreview('');
        }
    };
    
    const removeImage = () => {
        setImageFile(null);
        setImagePreview('');
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // +++ HANDLER FOR SAVING (PUBLISH OR DRAFT) +++
    const handleSave = (status) => {
        const blogData = {
            // Include existing data like an ID if we are editing
            ...(initialBlog || {}), 
            title,
            slug,
            content,
            category,
            date: publishDate,
            imageFile, // The new file object for uploading, or null
            image: imagePreview, // The current preview URL to know if an image exists/was removed
            status, // 'published' or 'draft'
        };
        // Call the onSave prop passed from the parent component
        onSave(blogData);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <header className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold text-black">{initialBlog ? 'Edit Blog Post' : 'New Blog Post'}</h1>
                    <div className="flex items-center gap-1 bg-gray-200 p-1 rounded-lg">
                        <button onClick={() => setViewMode('edit')} className={`px-4 py-1 rounded-md text-sm font-semibold transition-all duration-200 ${viewMode === 'edit' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:bg-gray-300/50'}`}>Edit</button>
                        <button onClick={() => setViewMode('preview')} className={`px-4 py-1 rounded-md text-sm font-semibold transition-all duration-200 ${viewMode === 'preview' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:bg-gray-300/50'}`}>Preview</button>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={onCancel} className="text-gray-600 font-semibold hover:text-black transition-colors">Cancel</button>
                    
                    {/* +++ UPDATED: SAVE AS DRAFT BUTTON +++ */}
                    <button 
                        onClick={() => handleSave('draft')} 
                        className="bg-gray-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
                    >
                        Save as Draft
                    </button>
                    
                    {/* --- PUBLISH BUTTON --- */}
                    <button 
                        onClick={() => handleSave('published')} 
                        className="bg-red-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                    >
                        {initialBlog ? 'Save Changes' : 'Publish'}
                    </button>
                </div>
            </header>
            
            {viewMode === 'edit' ? (
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                    <form>
                        <div className="mb-6"><label htmlFor="title" className="block text-gray-700 font-medium mb-2 text-sm">Title</label><input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full text-2xl font-bold px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Your Awesome Blog Title" required /></div>
                        <div className="mb-6"><label htmlFor="slug" className="block text-gray-700 font-medium mb-2 text-sm">Slug</label><div className="flex items-center"><span className="bg-gray-100 border border-r-0 border-gray-300 text-gray-500 px-3 py-2 rounded-l-lg">yoursite.com/blog/</span><input type="text" id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="your-awesome-blog-title" required /></div></div>
                        
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2 text-sm">Featured Image</label>
                            {imagePreview ? (
                                <div>
                                    <img src={imagePreview} alt="Blog post preview" className="w-full h-auto max-h-80 object-cover rounded-lg border border-gray-300"/>
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="mt-2 text-sm text-red-600 hover:text-red-800 font-semibold"
                                    >
                                        Remove Image
                                    </button>
                                </div>
                            ) : (
                                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div><label htmlFor="category" className="block text-gray-700 font-medium mb-2 text-sm">Category</label><select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white" required><option value="" disabled>Select a category</option>{blogCategories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}</select></div>
                            <div><label htmlFor="publishDate" className="block text-gray-700 font-medium mb-2 text-sm">Publish Date</label><input type="date" id="publishDate" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" required /></div>
                        </div>

                        <div><label className="block text-gray-700 font-medium mb-2 text-sm">Content</label><div className="bg-gray-50 border border-gray-300 rounded-t-lg p-2 flex items-center gap-2"><ToolbarButton><BoldIcon /></ToolbarButton><ToolbarButton><ItalicIcon /></ToolbarButton><ToolbarButton><LinkIcon /></ToolbarButton><ToolbarButton><ListIcon /></ToolbarButton><ToolbarButton><ImageIcon /></ToolbarButton></div><textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-96 p-4 border border-t-0 border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Write your content here..."></textarea></div>
                    </form>
                </div>
            ) : (
                <BlogPreview 
                    title={title} 
                    content={content}
                    category={category}
                    date={publishDate}
                    image={imagePreview}
                />
            )}
        </div>
    );
}

export default BlogWriter;