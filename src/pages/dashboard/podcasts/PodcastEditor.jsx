import React, { useState, useEffect } from 'react';

const PodcastCardPreview = ({ heading, date, image }) => {
    const formattedDate = date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }) : 'Select a date';
    
    return (
        <div className="w-full max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
            {image ? <img src={image} alt={heading || 'Podcast preview'} className="h-40 w-full object-cover" /> : <div className="h-40 bg-gray-200 flex items-center justify-center"><span className="text-gray-400 text-sm">Podcast Image Preview</span></div>}
            <div className="p-5">
                <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span>15 mins</span>
                    <span>{formattedDate}</span>
                </div>
                <h3 className="font-bold text-gray-800 text-md mb-4 h-12">{heading || 'Your Podcast Heading'}</h3>
                <button 
                    disabled 
                    className="w-full text-center bg-gray-100 text-gray-400 text-sm font-semibold py-2.5 rounded-md cursor-not-allowed"
                >
                    Listen Now
                </button>
            </div>
        </div>
    );
};


export default function PodcastEditor({ initialPodcast, onSave, onCancel }) {
  const [podcastDetails, setPodcastDetails] = useState({
    heading: '',
    url: '',
    date: '',
    image: null,
  });

  const isEditing = !!initialPodcast;

  useEffect(() => {
    if (initialPodcast) {
      setPodcastDetails({
        id: initialPodcast.id,
        heading: initialPodcast.heading || '',
        url: initialPodcast.url || '',
        date: initialPodcast.date ? new Date(initialPodcast.date).toISOString().split('T')[0] : '',
        image: initialPodcast.image || null,
      });
    } else {
      setPodcastDetails({ heading: '', url: '', date: '', image: null });
    }
  }, [initialPodcast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPodcastDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPodcastDetails(prev => ({ ...prev, image: reader.result }));
        reader.readAsDataURL(file);
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();
    onSave(podcastDetails);
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{isEditing ? 'Edit Podcast' : 'Create & Preview Podcast'}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handlePublish} className="space-y-5">
            <div><label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-1">Heading</label><input type="text" id="heading" name="heading" value={podcastDetails.heading} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500" placeholder="e.g., Study in Canada: A Student's Journey" required /></div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Podcast Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"><div className="space-y-1 text-center"><svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"><span>Upload a file</span><input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/png, image/jpeg, image/webp" /></label><p className="pl-1">or drag and drop</p></div><p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p></div></div>
            </div>
            <div><label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">URL</label><input type="url" id="url" name="url" value={podcastDetails.url} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500" placeholder="https://example.com/podcast-episode" required /></div>
            <div><label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label><input type="date" id="date" name="date" value={podcastDetails.date} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500" required /></div>
            <div className="flex items-center gap-3 pt-2"><button type="button" onClick={onCancel} className="w-full bg-gray-100 text-gray-800 font-semibold py-2.5 px-4 rounded-md hover:bg-gray-200">Cancel</button><button type="submit" className="w-full bg-red-600 text-white font-bold py-2.5 px-4 rounded-md hover:bg-red-700">{isEditing ? 'Save Changes' : 'Publish Podcast'}</button></div>
          </form>
        </div>
        <div className="flex flex-col items-center"><h2 className="text-lg font-semibold text-gray-700 mb-4">Live Preview</h2><PodcastCardPreview {...podcastDetails} /></div>
      </div>
    </div>
  );
}

