import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // +++ IMPORT useNavigate
import Logo from "../../../assets/jpg/eecLogo.jpeg";
import { LogoutIcon, ChevronDownIcon, KebabMenuIcon } from './icons';

export default function Sidebar({ navItems, selectedModule, setSelectedModule, openMenus, setOpenMenus, onAddNewCategory, onRenameCategory, onDeleteCategory }) {
    const [activeKebabMenu, setActiveKebabMenu] = useState(null);
    const navigate = useNavigate(); // +++ INITIALIZE useNavigate

    useEffect(() => { const handleClickOutside = () => { if (activeKebabMenu) setActiveKebabMenu(null); }; document.addEventListener('click', handleClickOutside); return () => document.removeEventListener('click', handleClickOutside); }, [activeKebabMenu]);
    const toggleMenu = (id) => setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));

    // +++ CREATE a handler function for logging out +++
    const handleLogout = () => {
        // In a real application, you might also clear user tokens or session data here
        navigate('/login'); // Navigate to the login route
    };

    const KebabMenu = ({ categoryType, item }) => (
        <div className="relative ml-auto">
            <button onClick={(e) => { e.stopPropagation(); setActiveKebabMenu(activeKebabMenu === item.id ? null : item.id); }} className="p-1 rounded-full hover:bg-gray-200" title="More options"><KebabMenuIcon /></button>
            {activeKebabMenu === item.id && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border z-20">
                    <a href="#" onClick={(e) => { e.preventDefault(); onRenameCategory(categoryType, item); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Rename</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); onDeleteCategory(categoryType, item); }} className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete</a>
                </div>
            )}
        </div>
    );

    return (
        <aside className="w-64 bg-white text-gray-800 flex flex-col p-4 border-r border-gray-200">
            <div className="flex items-center gap-3 px-2 mb-8 h-10"><img src={Logo} alt="Company Logo" className="h-full object-contain" /></div>
            <nav className="flex-grow">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">EEC Collections</h2>
                <ul>
                    {navItems.map(item => (
                        <li key={item.id}>
                            <div 
                                onClick={() => {
                                    setSelectedModule(item.id);
                                    if (item.subItems) {
                                        toggleMenu(item.id);
                                    } else {
                                        setOpenMenus({});
                                    }
                                }} 
                                className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer ${(selectedModule.startsWith(item.id) || openMenus[item.id]) ? 'bg-red-100 text-red-600 font-semibold' : 'hover:bg-gray-100'}`}
                            >
                                <div className="flex items-center gap-3">{item.icon}<span>{item.name}</span></div>
                                {item.subItems && <ChevronDownIcon isOpen={openMenus[item.id]} />}
                            </div>
                            {item.subItems && openMenus[item.id] && (
                                <ul className="pl-4 pt-1 pb-1">
                                    {item.subItems.map(subItem => (
                                        <li key={subItem.id}>
                                            <div onClick={() => { subItem.children ? toggleMenu(subItem.id) : setSelectedModule(subItem.id); }} className={`flex items-center justify-between gap-3 px-3 py-2 text-sm rounded-lg transition-colors duration-200 cursor-pointer ${ (selectedModule.startsWith(subItem.id) || openMenus[subItem.id]) ? 'text-red-600 font-semibold' : 'hover:bg-gray-100'}`}>
                                                <span>{subItem.name}</span>
                                                {subItem.children && <ChevronDownIcon isOpen={openMenus[subItem.id]} />}
                                            </div>
                                            {subItem.children && openMenus[subItem.id] && (
                                               <ul className="pl-4 pt-1 pb-1">
                                                  {subItem.children.map(childItem => {
                                                      const isAddButton = childItem.id.endsWith('_add_new');
                                                      const categoryType = subItem.id.split('_')[1];
                                                      return (
                                                          <li key={childItem.id} className="flex items-center group">
                                                              <a href="#" onClick={(e) => { e.preventDefault(); isAddButton ? onAddNewCategory(categoryType) : setSelectedModule(childItem.id); }} className={`flex-grow flex items-center gap-3 text-sm py-2 px-4 rounded-md transition-colors w-full ${selectedModule === childItem.id ? 'text-red-600 font-semibold' : 'hover:bg-gray-100'}`}>
                                                                  {childItem.icon && <span className="text-gray-500">{childItem.icon}</span>}
                                                                  <span>{childItem.name}</span>
                                                              </a>
                                                              {!isAddButton && (<div className="opacity-0 group-hover:opacity-100 transition-opacity"><KebabMenu categoryType={categoryType} item={childItem} /></div>)}
                                                          </li>
                                                      )
                                                  })}
                                               </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            {/* +++ ADDED onClick handler to the button +++ */}
            <div className="mt-auto"><button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-sm"><LogoutIcon /><span>Logout</span></button></div>
        </aside>
    );
};

