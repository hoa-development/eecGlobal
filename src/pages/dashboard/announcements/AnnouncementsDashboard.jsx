import React, { useState, useMemo } from 'react';

const AnnouncementCard = ({ announcement, onEdit, onDelete }) => {
    const { title, category, date, author } = announcement;
    const formattedDate = new Date(date).toLocaleString('en-US', { day: 'numeric', month: 'short', timeZone: 'UTC' });

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 flex flex-col justify-between transform hover:-translate-y-1 transition-all duration-200">
            <div>
                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span className="font-semibold text-purple-600 bg-purple-100 py-1 px-2 rounded">{category}</span>
                    <span>{formattedDate}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-4">{title}</h3>
            </div>
            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">By {author}</span>
                <div className="flex gap-2">
                    <button onClick={() => onEdit(announcement)} className="text-xs font-semibold text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => onDelete(announcement)} className="text-xs font-semibold text-red-600 hover:underline">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default function AnnouncementsDashboard({ announcements, onAddNew, onEdit, onDelete }) {
  const [activeTab, setActiveTab] = useState('upcoming');

  const { upcomingAnnouncements, pastAnnouncements } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!Array.isArray(announcements)) return { upcomingAnnouncements: [], pastAnnouncements: [] };
    
    const upcoming = announcements.filter(a => a && a.date && new Date(a.date) >= today);
    const past = announcements.filter(a => a && a.date && new Date(a.date) < today);
    
    upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
    past.sort((a, b) => new Date(b.date) - new Date(a.date));

    return { upcomingAnnouncements: upcoming, pastAnnouncements: past };
  }, [announcements]);

  const announcementsToDisplay = activeTab === 'upcoming' ? upcomingAnnouncements : pastAnnouncements;
  
  const TabButton = ({ tabName, label, count }) => (
      <button onClick={() => setActiveTab(tabName)} className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${ activeTab === tabName ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
        {label} <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">{count}</span>
      </button>
  );

  return (
    <div className="p-6 sm:p-8">
        <div className="flex justify-between items-center mb-4"><h1 className="text-2xl font-bold text-gray-800">Announcements Management</h1><button onClick={onAddNew} className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700">+ Add New Announcement</button></div>
        <div className="border-b border-gray-200"><nav className="flex space-x-6"><TabButton tabName="upcoming" label="Active Announcements" count={upcomingAnnouncements.length} /><TabButton tabName="past" label="Past Announcements" count={pastAnnouncements.length} /></nav></div>
        <div className="mt-6">
            {announcementsToDisplay.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{announcementsToDisplay.map(item => (<AnnouncementCard key={item.id} announcement={item} onEdit={onEdit} onDelete={onDelete} />))}</div>) : (<div className="text-center py-16 bg-gray-50 rounded-lg"><h3 className="text-lg font-medium text-gray-800">No Announcements Found</h3><p className="text-gray-500 mt-1">There are no {activeTab} announcements to display.</p></div>)}
        </div>
    </div>
  );
}