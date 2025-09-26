import React from 'react';

// A simple helper function to format the date nicely.
const formatDate = (dateString) => {
    if (!dateString) return null;
    // Replacing hyphens with slashes helps prevent timezone issues with the Date object.
    const date = new Date(dateString.replace(/-/g, '/'));
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const BlogPreview = ({ title, content, category, date, image }) => {
    return (
        <div className="bg-white p-8 sm:p-12 rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <article>
                {/* 1. Featured Image (conditionally rendered) */}
                {image && (
                    <img
                        src={image}
                        alt={title || 'Blog post image'}
                        className="w-full h-auto object-cover rounded-lg mb-8"
                    />
                )}

                {/* 2. Category Badge (conditionally rendered) */}
                {category && (
                     <span className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                        {category}
                    </span>
                )}

                <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 break-words">
                    {title || 'Your Blog Title Will Appear Here'}
                </h1>

                {/* 3. Date (formatted and conditionally rendered) */}
                {date && (
                    <p className="text-gray-500 mb-8">
                        Published on {formatDate(date)}
                    </p>
                )}
                
                <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
                    {content || 'Your blog content will be displayed here. Start writing in the editor!'}
                </div>
            </article>
        </div>
    );
};