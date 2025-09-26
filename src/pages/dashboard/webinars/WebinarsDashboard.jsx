import React, { useState, useMemo } from 'react';

// Platform Icons
const ZoomIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-blue-500"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.89 12.26c0 .4-.33.74-.74.74H8.43c-.41 0-.74-.34-.74-.74V9.74c0-.4.33-.74.74-.74h7.71c.41 0 .74.34.74.74v4.52zM10.8 11.1v1.8l2.4-1.8h-2.4z"></path></svg>;
const GMeetIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-green-500"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5V14h-2.5v-4H9V7.5L14.5 12 9 16.5zm4.5-5H11v-1h2.5v1zm2 2H11v-1h4.5v1z"></path></svg>;

const WebinarCard = ({ webinar, onEdit, onDelete }) => {
    const { title, date, speaker, time, platform, image } = webinar;
    const formattedDate = new Date(date).toLocaleString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
    const formattedTime = time ? new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : '';

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transform hover:-translate-y-1">
            {image ? <img src={image} alt={title} className="h-40 w-full object-cover" /> : <div className="h-40 bg-gray-200" />}
            <div className="p-4 flex flex-col h-full">
                <h3 className="font-bold text-gray-900 truncate">{title}</h3>
                <div className="mt-2 text-sm text-gray-500 flex flex-col gap-2 flex-grow">
                    <span className="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>{formattedDate}</span>
                    <span className="flex items-center gap-1.5 truncate"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>{speaker}</span>
                    <div className="flex items-center justify-between">
                         <span className="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{formattedTime}</span>
                         <span className="flex items-center gap-1.5">{platform === 'gmeet' ? <GMeetIcon/> : <ZoomIcon/>} {platform === 'gmeet' ? 'Meet' : 'Zoom'}</span>
                    </div>
                </div>
                <div className="mt-4 flex gap-2"><button onClick={() => onEdit(webinar)} className="w-full text-center bg-gray-100 border border-gray-300 text-gray-700 text-sm font-semibold py-2 rounded-md hover:bg-gray-200">Edit</button><button onClick={() => onDelete(webinar)} className="w-full text-center bg-red-50 border-red-200 text-red-700 text-sm font-semibold py-2 rounded-md hover:bg-red-100">Delete</button></div>
            </div>
        </div>
    );
};

export default function WebinarsDashboard({ webinars, onAddNew, onEdit, onDelete }) {
  const [activeTab, setActiveTab] = useState('upcoming');

  const { upcomingWebinars, pastWebinars } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!Array.isArray(webinars)) return { upcomingWebinars: [], pastWebinars: [] };
    
    const upcoming = webinars.filter(w => w && w.date && new Date(w.date) >= today);
    const past = webinars.filter(w => w && w.date && new Date(w.date) < today);
    
    upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
    past.sort((a, b) => new Date(b.date) - new Date(a.date));

    return { upcomingWebinars: upcoming, pastWebinars: past };
  }, [webinars]);

  const webinarsToDisplay = activeTab === 'upcoming' ? upcomingWebinars : pastWebinars;
  
  const TabButton = ({ tabName, label, count }) => (
      <button onClick={() => setActiveTab(tabName)} className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm ${ activeTab === tabName ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
        {label} <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">{count}</span>
      </button>
  );

  return (
    <div className="p-6 sm:p-8">
        <div className="flex justify-between items-center mb-4"><h1 className="text-2xl font-bold text-gray-800">Webinars Management</h1><button onClick={onAddNew} className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700">+ Add New Webinar</button></div>
        <div className="border-b border-gray-200"><nav className="flex space-x-6"><TabButton tabName="upcoming" label="Upcoming Webinars" count={upcomingWebinars.length} /><TabButton tabName="past" label="Past Webinars" count={pastWebinars.length} /></nav></div>
        <div className="mt-6">
            {webinarsToDisplay.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{webinarsToDisplay.map(webinar => (<WebinarCard key={webinar.id} webinar={webinar} onEdit={onEdit} onDelete={onDelete} />))}</div>) : (<div className="text-center py-16 bg-gray-50 rounded-lg"><h3 className="text-lg font-medium text-gray-800">No Webinars Found</h3><p className="text-gray-500 mt-1">There are no {activeTab} webinars to display.</p></div>)}
        </div>
    </div>
  );
}