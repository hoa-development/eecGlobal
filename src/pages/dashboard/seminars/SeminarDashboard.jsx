import React, { useState, useMemo } from 'react';

const SeminarCard = ({ seminar, onEdit, onDelete }) => {
    const { title, date, speaker, time, price, image } = seminar;
    const formattedDate = new Date(date).toLocaleString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
    const formattedTime = time ? new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : '';
    const displayPrice = price > 0 ? `₹${price}` : 'Free';

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transform hover:-translate-y-1 transition-all duration-200">
            {image ? <img src={image} alt={title} className="h-40 w-full object-cover" /> : <div className="h-40 bg-gray-200" />}
            <div className="p-4 flex flex-col h-full">
                <h3 className="font-bold text-gray-900 truncate">{title}</h3>
                <div className="mt-2 text-sm text-gray-500 flex flex-col gap-2 flex-grow">
                    <span className="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>{formattedDate}</span>
                    <span className="flex items-center gap-1.5 truncate"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>{speaker}</span>
                    <span className="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{formattedTime}</span>
                </div>
                <div className="mt-4 flex gap-2"><button className="w-full text-center bg-red-600 text-white text-sm font-semibold py-2 rounded-md hover:bg-red-700 transition-colors">Register ({displayPrice})</button></div>
                <div className="mt-2 flex gap-2"><button onClick={() => onEdit(seminar)} className="w-full text-center bg-gray-100 border border-gray-300 text-gray-700 text-sm font-semibold py-2 rounded-md hover:bg-gray-200">Edit</button><button onClick={() => onDelete(seminar)} className="w-full text-center bg-red-50 border-red-200 text-red-700 text-sm font-semibold py-2 rounded-md hover:bg-red-100">Delete</button></div>
            </div>
        </div>
    );
};

export default function SeminarsDashboard({ seminars, onAddNew, onEdit, onDelete }) {
  const [activeTab, setActiveTab] = useState('upcoming');

  const { upcomingSeminars, pastSeminars } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!Array.isArray(seminars)) return { upcomingSeminars: [], pastSeminars: [] };
    
    const upcoming = seminars.filter(s => s && s.date && new Date(s.date) >= today);
    const past = seminars.filter(s => s && s.date && new Date(s.date) < today);
    
    upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
    past.sort((a, b) => new Date(b.date) - new Date(a.date));

    return { upcomingSeminars: upcoming, pastSeminars: past };
  }, [seminars]);

  const seminarsToDisplay = activeTab === 'upcoming' ? upcomingSeminars : pastSeminars;
  
  const TabButton = ({ tabName, label, count }) => (
      <button onClick={() => setActiveTab(tabName)} className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${ activeTab === tabName ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
        {label} <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">{count}</span>
      </button>
  );

  return (
    <div className="p-6 sm:p-8">
        <div className="flex justify-between items-center mb-4"><h1 className="text-2xl font-bold text-gray-800">Seminars Management</h1><button onClick={onAddNew} className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors">+ Add New Seminar</button></div>
        <div className="border-b border-gray-200"><nav className="flex space-x-6"><TabButton tabName="upcoming" label="Upcoming Seminars" count={upcomingSeminars.length} /><TabButton tabName="past" label="Past Seminars" count={pastSeminars.length} /></nav></div>
        <div className="mt-6">
            {seminarsToDisplay.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{seminarsToDisplay.map(seminar => (<SeminarCard key={seminar.id} seminar={seminar} onEdit={onEdit} onDelete={onDelete} />))}</div>) : (<div className="text-center py-16 bg-gray-50 rounded-lg"><h3 className="text-lg font-medium text-gray-800">No Seminars Found</h3><p className="text-gray-500 mt-1">There are no {activeTab} seminars to display.</p></div>)}
        </div>
    </div>
  );
}

