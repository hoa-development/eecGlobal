import React, { useState, useEffect } from 'react';

// A static list of categories, as used in the blogs section.
const ANNOUNCEMENT_CATEGORIES = [
    'Scholarships & Financial Aid',
    'Study Abroad Tips',
    'Test Preparation',
    'University Updates',
    'Visa Updates & Guidance',
    'General News',
];

// +++ NEW: A reusable preview component for the announcement card +++
const AnnouncementCardPreview = ({ title, category, date, author }) => {
    const formattedDate = date 
        ? new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', timeZone: 'UTC' }) 
        : 'Select Date';

    return (
        <div className="w-full max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md p-5 flex flex-col justify-between transition-all duration-300">
            <div>
                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span className="font-semibold text-purple-600 bg-purple-100 py-1 px-2 rounded">
                        {category || 'Category'}
                    </span>
                    <span>{formattedDate}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-4 break-words">
                    {title || 'Your Announcement Title'}
                </h3>
            </div>
            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">
                    By {author || 'Author Name'}
                </span>
            </div>
        </div>
    );
};


export default function AnnouncementEditor({ initialAnnouncement, onSave, onCancel }) {
  const [announcementDetails, setAnnouncementDetails] = useState({
    title: '',
    category: ANNOUNCEMENT_CATEGORIES[0],
    date: '',
    author: '',
  });

  const isEditing = !!initialAnnouncement;

  useEffect(() => {
    if (initialAnnouncement) {
      setAnnouncementDetails({
        id: initialAnnouncement.id, 
        title: initialAnnouncement.title || '',
        category: initialAnnouncement.category || ANNOUNCEMENT_CATEGORIES[0],
        date: initialAnnouncement.date ? new Date(initialAnnouncement.date).toISOString().split('T')[0] : '',
        author: initialAnnouncement.author || '',
      });
    } else {
      setAnnouncementDetails({
        title: '',
        category: ANNOUNCEMENT_CATEGORIES[0],
        date: '',
        author: '',
      });
    }
  }, [initialAnnouncement]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePublish = (e) => {
    e.preventDefault();
    onSave(announcementDetails);
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center lg:text-left">
        {isEditing ? 'Edit Announcement' : 'Create New Announcement'}
      </h1>
      
      {/* +++ FIX: Changed to a two-column grid layout for form and preview +++ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Form Column */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handlePublish} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" id="title" name="title" value={announcementDetails.title} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500" placeholder="e.g., Budgeting Tips for International Students" required />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select id="category" name="category" value={announcementDetails.category} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500">
                {ANNOUNCEMENT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" id="date" name="date" value={announcementDetails.date} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500" required />
                </div>
                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author / Speaker</label>
                    <input type="text" id="author" name="author" value={announcementDetails.author} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500" placeholder="e.g., Renaud Bressand" required />
                </div>
            </div>
            
            <div className="flex items-center gap-3 pt-4">
                <button type="button" onClick={onCancel} className="w-full bg-gray-100 text-gray-800 font-semibold py-2.5 px-4 rounded-md hover:bg-gray-200">
                    Cancel
                </button>
                <button type="submit" className="w-full bg-red-600 text-white font-bold py-2.5 px-4 rounded-md hover:bg-red-700">
                    {isEditing ? 'Save Changes' : 'Publish Announcement'}
                </button>
            </div>
          </form>
        </div>

        {/* Live Preview Column */}
        <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Live Preview</h2>
            <AnnouncementCardPreview {...announcementDetails} />
        </div>

      </div>
    </div>
  );
}