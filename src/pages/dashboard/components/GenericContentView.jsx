import React from 'react';
import { PreviewIcon, EditIcon, DeleteIcon } from './icons';

export default function GenericContentView({ title, data, columns, newItemLabel, moduleType, onDelete, onEdit, onPreview, onAddNew }) {
    return (
        <div className="p-8 flex-grow">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-black">{title}</h1>
                {newItemLabel && <button onClick={onAddNew} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">+ {newItemLabel}</button>}
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    {data.length > 0 ? (
                        <table className="w-full text-left text-sm text-gray-800">
                            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                                <tr>
                                    {columns.map((col) => <th key={col.key} className="py-3 px-6 font-semibold">{col.header}</th>)}
                                    <th className="py-3 px-6 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        {columns.map((col) => ( <td key={col.key} className="py-4 px-6"> {col.key === 'status' ? ( <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${['Published', 'Live', 'Upcoming', 'Scheduled'].includes(item.status) ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item[col.key]}</span> ) : (item[col.key])} </td> ))}
                                        <td className="py-4 px-6 text-right">
                                            {moduleType === 'blogs' ? (
                                                <div className="flex items-center justify-end gap-4">
                                                    <button onClick={() => onPreview(item)} title="Preview" className="text-gray-500 hover:text-blue-600"><PreviewIcon /></button>
                                                    <button onClick={() => onEdit(item)} title="Edit" className="text-gray-500 hover:text-black"><EditIcon /></button>
                                                    <button onClick={() => onDelete(item)} title="Delete" className="text-gray-500 hover:text-red-600"><DeleteIcon /></button>
                                                </div>
                                            ) : moduleType === 'faq' ? (
                                                 <div className="flex items-center justify-end gap-4">
                                                     <button onClick={() => onEdit(item)} title="Edit" className="text-gray-500 hover:text-black"><EditIcon /></button>
                                                     <button onClick={() => onDelete(item)} title="Delete" className="text-gray-500 hover:text-red-600"><DeleteIcon /></button>
                                                 </div>
                                            ) : (
                                                <div className="space-x-4">
                                                    <button className="text-gray-600 hover:text-black font-medium">Edit</button>
                                                    <button className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : ( <div className="text-center py-16 px-6"> <h3 className="text-lg font-semibold text-gray-800">Your collection is empty.</h3> <p className="text-gray-500 mt-2">Add a new item to get started.</p> {newItemLabel && <button onClick={onAddNew} className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition-colors duration-300">+ Add New Item</button>} </div> )}
                </div>
            </div>
        </div>
    );
};