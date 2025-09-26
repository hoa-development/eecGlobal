import React, { useState, useEffect } from 'react';
import { CloseIcon } from './icons';

export const CategoryModal = ({ isOpen, onClose, onSubmit, initialValue = '', title, placeholder, label }) => {
    const [name, setName] = useState(initialValue);
    useEffect(() => { setName(initialValue); }, [initialValue, isOpen]);
    if (!isOpen) return null;
    const handleSubmit = (e) => { e.preventDefault(); if (name.trim()) { onSubmit(name.trim()); onClose(); } };
    return ( <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"> <div className="flex justify-between items-center mb-4"> <h2 className="text-xl font-bold text-gray-800">{title}</h2> <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><CloseIcon /></button> </div> <form onSubmit={handleSubmit}> <label htmlFor="categoryName" className="block text-gray-700 font-medium mb-2 text-sm">{label}</label> <input id="categoryName" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={placeholder} required autoFocus /> <div className="flex justify-end gap-4 mt-6"> <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 font-semibold">Cancel</button> <button type="submit" className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold">Save</button> </div> </form> </div> </div> );
};

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;
    return ( <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"> <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2> <p className="text-gray-600 mb-6">{message}</p> <div className="flex justify-end gap-4"> <button onClick={onClose} className="px-4 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 font-semibold">Cancel</button> <button onClick={onConfirm} className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold">Delete</button> </div> </div> </div> );
};