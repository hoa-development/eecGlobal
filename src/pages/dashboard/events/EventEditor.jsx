import React, { useState, useEffect } from 'react';

// A reusable preview component for the event card
const EventCardPreview = ({ title, date, city, state, image }) => {
    const formattedDate = date
        ? new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC'
          })
        : 'Select a date';
    const location = [city, state].filter(Boolean).join(', ');

    return (
        <div className="w-full max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden transition-all duration-300">
            {image ? (
                <img src={image} alt={title || 'Event preview'} className="h-40 w-full object-cover" />
            ) : (
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Event Image Preview</span>
                </div>
            )}
            <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg truncate mb-2">{title || 'Your Event Title'}</h3>
                <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 truncate">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span>{location || 'Location details'}</span>
                    </div>
                </div>
                 <button disabled className="mt-5 w-full text-center bg-gray-100 text-gray-400 text-sm font-semibold py-2 rounded-md cursor-not-allowed">
                    Register Free
                </button>
            </div>
        </div>
    );
};

export default function EventEditor({ initialEvent, onSave, onCancel }) {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: '',
    city: '',
    state: '',
    image: null,
  });

  const isEditing = !!initialEvent;

  useEffect(() => {
    if (initialEvent) {
      setEventDetails({
        id: initialEvent.id,
        title: initialEvent.title || '',
        date: initialEvent.date ? new Date(initialEvent.date).toISOString().split('T')[0] : '',
        city: initialEvent.city || '',
        state: initialEvent.state || '',
        image: initialEvent.image || null,
      });
    } else {
      setEventDetails({ title: '', date: '', city: '', state: '', image: null });
    }
  }, [initialEvent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setEventDetails(prev => ({
                ...prev,
                image: reader.result,
            }));
        };
        reader.readAsDataURL(file);
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();
    onSave(eventDetails);
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Edit Event' : 'Create & Preview Event'}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handlePublish} className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
              <input type="text" id="title" name="title" value={eventDetails.title} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500" placeholder="e.g., Study Abroad Guidance Session" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
              {/* +++ FIX: The uploader box will now show the selected image +++ */}
              <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md h-48">
                {eventDetails.image ? (
                    <div className="relative group w-full h-full">
                        <img src={eventDetails.image} alt="Event preview" className="h-full w-full object-contain rounded-md" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                            <label htmlFor="file-upload" className="cursor-pointer text-white text-sm font-semibold py-2 px-4 rounded-md bg-white bg-opacity-20 hover:bg-opacity-30">Change Image</label>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/png, image/jpeg, image/webp" />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/png, image/jpeg, image/webp" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                )}
              </div>
            </div>

            <div>
               <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date (Month, Day, Year)</label>
               <input type="date" id="date" name="date" value={eventDetails.date} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500" required />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" id="city" name="city" value={eventDetails.city} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500" placeholder="e.g., Pune" required />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input type="text" id="state" name="state" value={eventDetails.state} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500" placeholder="e.g., Maharashtra" required />
            </div>
            
            <div className="flex items-center gap-3 pt-2">
                <button type="button" onClick={onCancel} className="w-full bg-gray-100 text-gray-800 font-semibold py-2.5 px-4 rounded-md hover:bg-gray-200 transition-colors">
                    Cancel
                </button>
                <button type="submit" className="w-full bg-red-600 text-white font-bold py-2.5 px-4 rounded-md hover:bg-red-700 transition-colors">
                    {isEditing ? 'Save Changes' : 'Publish Event'}
                </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Live Preview</h2>
            <EventCardPreview {...eventDetails} />
        </div>

      </div>
    </div>
  );
}

