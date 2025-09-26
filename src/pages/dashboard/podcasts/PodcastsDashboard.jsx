import React from 'react';

const PodcastCard = ({ podcast, onEdit, onDelete }) => {
    const { heading, date, image, url } = podcast;
    const formattedDate = new Date(date).toLocaleString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transform hover:-translate-y-1 transition-all duration-200">
            {image ? <img src={image} alt={heading} className="h-40 w-full object-cover" /> : <div className="h-40 bg-gray-200" />}
            <div className="p-4 flex flex-col h-full">
                <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span>15 mins</span>
                    <span>{formattedDate}</span>
                </div>
                <h3 className="font-bold text-gray-800 text-md mb-4 flex-grow">{heading}</h3>
                
                <a href={url} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-gray-800 text-white text-sm font-semibold py-2.5 rounded-md hover:bg-gray-900 transition-colors">
                    Listen Now
                </a>

                <div className="mt-3 flex gap-2">
                    <button onClick={() => onEdit(podcast)} className="w-full text-center bg-gray-100 border border-gray-300 text-gray-700 text-sm font-semibold py-2 rounded-md hover:bg-gray-200">Edit</button>
                    <button onClick={() => onDelete(podcast)} className="w-full text-center bg-red-50 border-red-200 text-red-700 text-sm font-semibold py-2 rounded-md hover:bg-red-100">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default function PodcastsDashboard({ podcasts, onAddNew, onEdit, onDelete }) {
  return (
    <div className="p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold text-gray-800">Podcasts Management</h1><button onClick={onAddNew} className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700">+ Add New Podcast</button></div>
        <div>
            {podcasts && podcasts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {podcasts.map(item => (
                        <PodcastCard key={item.id} podcast={item} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800">No Podcasts Found</h3>
                    <p className="text-gray-500 mt-1">Click "Add New Podcast" to get started.</p>
                </div>
            )}
        </div>
    </div>
  );
}
