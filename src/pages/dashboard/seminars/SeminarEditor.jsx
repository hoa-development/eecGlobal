import React, { useState, useEffect } from 'react';

const SeminarCardPreview = ({ title, date, speaker, time, price, image }) => {
    const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }) : 'Select a date';
    const displayPrice = price > 0 ? `₹${price}` : 'Free';
    const formattedTime = time ? new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : 'Select a time';

    return (
        <div className="w-full max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
            {image ? <img src={image} alt={title || 'Seminar preview'} className="h-40 w-full object-cover" /> : <div className="h-40 bg-gray-200 flex items-center justify-center"><span className="text-gray-400 text-sm">Seminar Image Preview</span></div>}
            <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg truncate mb-2">{title || 'Your Seminar Title'}</h3>
                <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg><span>{formattedDate}</span></div>
                    <div className="flex items-center gap-2 truncate"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg><span>{speaker || 'Speaker Name'}</span></div>
                    <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>{formattedTime}</span></div>
                </div>
                <button disabled className="mt-5 w-full text-center bg-red-600 text-white text-sm font-semibold py-2.5 rounded-md">
                    Register ({displayPrice})
                </button>
            </div>
        </div>
    );
};

export default function SeminarEditor({ initialSeminar, onSave, onCancel }) {
  const [seminarDetails, setSeminarDetails] = useState({
    title: '', date: '', speaker: '', time: '', price: '0', image: null,
  });

  const isEditing = !!initialSeminar;

  useEffect(() => {
    if (initialSeminar) {
      setSeminarDetails({
        id: initialSeminar.id,
        title: initialSeminar.title || '',
        date: initialSeminar.date ? new Date(initialSeminar.date).toISOString().split('T')[0] : '',
        speaker: initialSeminar.speaker || '',
        time: initialSeminar.time || '',
        price: initialSeminar.price || '0',
        image: initialSeminar.image || null,
      });
    } else {
      setSeminarDetails({ title: '', date: '', speaker: '', time: '', price: '0', image: null });
    }
  }, [initialSeminar]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSeminarDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setSeminarDetails(prev => ({ ...prev, image: reader.result }));
        reader.readAsDataURL(file);
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();
    onSave(seminarDetails);
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{isEditing ? 'Edit Seminar' : 'Create & Preview Seminar'}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handlePublish} className="space-y-5">
            <div><label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Seminar Title</label><input type="text" id="title" name="title" value={seminarDetails.title} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500" placeholder="e.g., Advanced Study Techniques" required /></div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seminar Image</label>
              {/* --- FIX 2: Image Uploader now shows the selected image --- */}
              <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md h-48">
                {seminarDetails.image ? (
                    <div className="relative group w-full h-full">
                        <img src={seminarDetails.image} alt="Seminar preview" className="h-full w-full object-contain rounded-md" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                            <label htmlFor="file-upload" className="cursor-pointer text-white text-sm font-semibold py-2 px-4 rounded-md bg-white bg-opacity-20 hover:bg-opacity-30">Change Image</label>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/png, image/jpeg, image/webp" />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-1 text-center"><svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"><span>Upload a file</span><input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/png, image/jpeg, image/webp" /></label><p className="pl-1">or drag and drop</p></div><p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p></div>
                )}
              </div>
            </div>
            <div><label htmlFor="speaker" className="block text-sm font-medium text-gray-700 mb-1">Speaker</label><input type="text" id="speaker" name="speaker" value={seminarDetails.speaker} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500" placeholder="e.g., Jane Doe" required /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label><input type="date" id="date" name="date" value={seminarDetails.date} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500" required /></div>
              <div><label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label><input type="time" id="time" name="time" value={seminarDetails.time} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500" required /></div>
            </div>
            <div><label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label><input type="number" id="price" name="price" value={seminarDetails.price} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500" placeholder="0 for free" min="0" required /></div>
            <div className="flex items-center gap-3 pt-2"><button type="button" onClick={onCancel} className="w-full bg-gray-100 text-gray-800 font-semibold py-2.5 px-4 rounded-md hover:bg-gray-200">Cancel</button><button type="submit" className="w-full bg-red-600 text-white font-bold py-2.5 px-4 rounded-md hover:bg-red-700">{isEditing ? 'Save Changes' : 'Publish Seminar'}</button></div>
          </form>
        </div>
        <div className="flex flex-col items-center"><h2 className="text-lg font-semibold text-gray-700 mb-4">Live Preview</h2><SeminarCardPreview {...seminarDetails} /></div>
      </div>
    </div>
  );
}

