import React, { useState } from 'react';

// --- Data & Config Imports ---
import { initialDataStore } from './data/initialData';
import { initialModules } from './data/moduleConfig';

// --- Component Imports ---
import Sidebar from './components/SideBar';
import GenericContentView from './components/GenericContentView';
import { CategoryModal, ConfirmModal } from './components/modals';
import BlogWriter from './blogs/blogWriter';
import { BlogPreview } from './blogs/BlogPreview';
import FAQManager from './faq/FAQManager';
import EventsDashboard from './events/EventsDashboard';
import EventEditor from './events/EventEditor';
import WebinarsDashboard from './webinars/WebinarsDashboard';
import WebinarEditor from './webinars/WebinarEditor';
import AnnouncementsDashboard from './announcements/AnnouncementsDashboard';
import AnnouncementEditor from './announcements/AnnouncementEditor';
import PodcastsDashboard from './podcasts/PodcastsDashboard';
import PodcastEditor from './podcasts/PodcastEditor';
import SeminarsDashboard from './seminars/SeminarDashboard';
import SeminarEditor from './seminars/SeminarEditor';


export default function Dashboard() {
    // --- Core State Management ---
    const [modules, setModules] = useState(initialModules);
    const [dataStore, setDataStore] = useState(initialDataStore);
    const [selectedModule, setSelectedModule] = useState('faq');
    const [openMenus, setOpenMenus] = useState({});
    const [modalState, setModalState] = useState({ type: null, data: null });
    const [viewState, setViewState] = useState({ type: 'list', data: null });

    // --- Category Handlers (Passed to Sidebar & Modals) ---
    const handleAddNewCategory = (categoryType) => setModalState({ type: 'add', data: { categoryType } });
    const handleRenameCategory = (categoryType, item) => setModalState({ type: 'rename', data: { ...item, categoryType } });
    const handleDeleteCategory = (categoryType, item) => setModalState({ type: 'delete-category', data: { ...item, categoryType } });

    const handleSaveCategory = (newName) => {
        const { categoryType } = modalState.data;
        const parentId = `faq_${categoryType}`;

        setModules(prevModules => {
            const parentCategoryIndex = prevModules.faq.subItems.findIndex(item => item.id === parentId);
            if (parentCategoryIndex === -1) return prevModules;
            let newChildren;
            if (modalState.type === 'add') {
                const slug = newName.toLowerCase().replace(/\s+/g, '_');
                const newCategory = { id: `faq_${categoryType}_${slug}`, name: newName };
                const originalChildren = prevModules.faq.subItems[parentCategoryIndex].children;
                newChildren = [
                    ...originalChildren.slice(0, originalChildren.length - 1),
                    newCategory,
                    originalChildren[originalChildren.length - 1]
                ];
            } else if (modalState.type === 'rename') {
                newChildren = prevModules.faq.subItems[parentCategoryIndex].children.map(child =>
                    child.id === modalState.data.id ? { ...child, name: newName } : child
                );
            } else {
                return prevModules;
            }
            const updatedParentCategory = {
                ...prevModules.faq.subItems[parentCategoryIndex],
                children: newChildren
            };
            const newSubItems = prevModules.faq.subItems.map((item, index) =>
                index === parentCategoryIndex ? updatedParentCategory : item
            );
            const newFaqModule = { ...prevModules.faq, subItems: newSubItems };
            return { ...prevModules, faq: newFaqModule };
        });

        setModalState({ type: null, data: null });
    };

    const handleConfirmDeleteCategory = () => {
        const { categoryType, id: categoryIdToDelete, name: categoryNameToDelete } = modalState.data;
        const parentId = `faq_${categoryType}`;

        setModules(prevModules => {
            const parentCategoryIndex = prevModules.faq.subItems.findIndex(item => item.id === parentId);
            if (parentCategoryIndex === -1) return prevModules;
            const newChildren = prevModules.faq.subItems[parentCategoryIndex].children.filter(
                item => item.id !== categoryIdToDelete
            );
            const updatedParentCategory = {
                ...prevModules.faq.subItems[parentCategoryIndex],
                children: newChildren
            };
            const newSubItems = prevModules.faq.subItems.map((item, index) =>
                index === parentCategoryIndex ? updatedParentCategory : item
            );
            const newFaqModule = { ...prevModules.faq, subItems: newSubItems };
            return { ...prevModules, faq: newFaqModule };
        });

        setDataStore(prevData => ({ ...prevData, faq: prevData.faq.filter(item => item.category !== categoryNameToDelete) }));
        setModalState({ type: null, data: null });
        if (selectedModule === categoryIdToDelete) setSelectedModule('faq');
    };

    // --- FAQ Handlers (Passed to FAQManager) ---
    const handleAddFaq = (newFaqData) => { setDataStore(prevData => ({ ...prevData, faq: [...prevData.faq, { ...newFaqData, id: Date.now() }] })); };
    const handleUpdateFaq = (updatedFaqData) => { setDataStore(prevData => ({ ...prevData, faq: prevData.faq.map(f => f.id === updatedFaqData.id ? updatedFaqData : f) })); };
    const handleDeleteFaq = (item) => setModalState({ type: 'delete-faq', data: item });
    const handleConfirmDeleteFaq = () => {
        setDataStore(prev => ({ ...prev, faq: prev.faq.filter(f => f.id !== modalState.data.id) }));
        setModalState({ type: null, data: null });
    };
    const handleEditFaq = (faq) => {
        const categorySlug = faq.category.toLowerCase().replace(/\s+/g, '_');
        const parentCategory = modules.faq.subItems.find(sub => sub.children.some(child => child.name === faq.category));
        
        if(parentCategory){
            const categoryType = parentCategory.id.split('_')[1];
            setSelectedModule(`faq_${categoryType}_${categorySlug}`);
            setOpenMenus(prev => ({...prev, faq: true, [parentCategory.id]: true}));
        }
    };
    
    // --- Blog Handlers (Passed to BlogWriter & GenericContentView) ---
    const handleWriteNewBlog = () => setViewState({ type: 'edit-blog', data: null });
    const handleEditBlog = (blog) => setViewState({ type: 'edit-blog', data: blog });
    const handlePreviewBlog = (blog) => setViewState({ type: 'preview-blog', data: blog });
    const handleDeleteBlog = (blog) => setModalState({ type: 'delete-blog', data: blog });
    const handleSaveBlog = (blogToSave) => {
        if (blogToSave.id) { setDataStore(prev => ({ ...prev, blogs: prev.blogs.map(b => b.id === blogToSave.id ? blogToSave : b) }));
        } else { setDataStore(prev => ({ ...prev, blogs: [...prev.blogs, { ...blogToSave, id: Date.now() }] })); }
        setViewState({ type: 'list', data: null });
        setSelectedModule('blogs_published');
    };
    const handleConfirmDeleteBlog = () => {
        setDataStore(prev => ({ ...prev, blogs: prev.blogs.filter(b => b.id !== modalState.data.id) }));
        setModalState({ type: null, data: null });
    };

    // --- Event Handlers ---
    const handleAddNewEvent = () => setViewState({ type: 'edit-event', data: null });
    const handleEditEvent = (event) => setViewState({ type: 'edit-event', data: event });
    const handleDeleteEvent = (event) => setModalState({ type: 'delete-event', data: event });
    const handleSaveEvent = (eventToSave) => {
        setDataStore(prev => {
            const events = prev.events || [];
            if (eventToSave.id) {
                return { ...prev, events: events.map(e => e.id === eventToSave.id ? eventToSave : e) };
            } else {
                return { ...prev, events: [...events, { ...eventToSave, id: Date.now() }] };
            }
        });
        setViewState({ type: 'list', data: null });
        setSelectedModule('events_all');
    };
    const handleConfirmDeleteEvent = () => {
        setDataStore(prev => ({
            ...prev,
            events: prev.events.filter(e => e.id !== modalState.data.id)
        }));
        setModalState({ type: null, data: null });
    };

    // --- Webinar Handlers ---
    const handleAddNewWebinar = () => setViewState({ type: 'edit-webinar', data: null });
    const handleEditWebinar = (webinar) => setViewState({ type: 'edit-webinar', data: webinar });
    const handleDeleteWebinar = (webinar) => setModalState({ type: 'delete-webinar', data: webinar });
    const handleSaveWebinar = (webinarToSave) => {
        setDataStore(prev => {
            const webinars = prev.webinar || [];
            if (webinarToSave.id) {
                return { ...prev, webinar: webinars.map(w => w.id === webinarToSave.id ? webinarToSave : w) };
            } else {
                return { ...prev, webinar: [...webinars, { ...webinarToSave, id: Date.now() }] };
            }
        });
        setViewState({ type: 'list', data: null });
        setSelectedModule('webinar_all');
    };
    const handleConfirmDeleteWebinar = () => {
        setDataStore(prev => ({
            ...prev,
            webinar: prev.webinar.filter(w => w.id !== modalState.data.id)
        }));
        setModalState({ type: null, data: null });
    };

    // --- Announcement Handlers ---
    const handleAddNewAnnouncement = () => setViewState({ type: 'edit-announcement', data: null });
    const handleEditAnnouncement = (announcement) => setViewState({ type: 'edit-announcement', data: announcement });
    const handleDeleteAnnouncement = (announcement) => setModalState({ type: 'delete-announcement', data: announcement });
    const handleSaveAnnouncement = (announcementToSave) => {
        setDataStore(prev => {
            const announcements = prev.announcement || [];
            if (announcementToSave.id) {
                return { ...prev, announcement: announcements.map(a => a.id === announcementToSave.id ? announcementToSave : a) };
            } else {
                return { ...prev, announcement: [...announcements, { ...announcementToSave, id: Date.now() }] };
            }
        });
        setViewState({ type: 'list', data: null });
        setSelectedModule('announcement_all');
    };
    const handleConfirmDeleteAnnouncement = () => {
        setDataStore(prev => ({
            ...prev,
            announcement: prev.announcement.filter(a => a.id !== modalState.data.id)
        }));
        setModalState({ type: null, data: null });
    };

    // --- Podcast Handlers ---
    const handleAddNewPodcast = () => setViewState({ type: 'edit-podcast', data: null });
    const handleEditPodcast = (podcast) => setViewState({ type: 'edit-podcast', data: podcast });
    const handleDeletePodcast = (podcast) => setModalState({ type: 'delete-podcast', data: podcast });
    const handleSavePodcast = (podcastToSave) => {
        setDataStore(prev => {
            const podcasts = prev.podcast || [];
            if (podcastToSave.id) {
                return { ...prev, podcast: podcasts.map(p => p.id === podcastToSave.id ? podcastToSave : p) };
            } else {
                return { ...prev, podcast: [...podcasts, { ...podcastToSave, id: Date.now() }] };
            }
        });
        setViewState({ type: 'list', data: null });
        setSelectedModule('podcast_all');
    };
    const handleConfirmDeletePodcast = () => {
        setDataStore(prev => ({
            ...prev,
            podcast: prev.podcast.filter(p => p.id !== modalState.data.id)
        }));
        setModalState({ type: null, data: null });
    };

    // --- Seminar Handlers ---
    const handleAddNewSeminar = () => setViewState({ type: 'edit-seminar', data: null });
    const handleEditSeminar = (seminar) => setViewState({ type: 'edit-seminar', data: seminar });
    const handleDeleteSeminar = (seminar) => setModalState({ type: 'delete-seminar', data: seminar });
    const handleSaveSeminar = (seminarToSave) => {
        setDataStore(prev => {
            const seminars = prev.seminars || [];
            if (seminarToSave.id) {
                return { ...prev, seminars: seminars.map(s => s.id === seminarToSave.id ? seminarToSave : s) };
            } else {
                return { ...prev, seminars: [...seminars, { ...seminarToSave, id: Date.now() }] };
            }
        });
        setViewState({ type: 'list', data: null });
        setSelectedModule('seminars_all');
    };
    const handleConfirmDeleteSeminar = () => {
        setDataStore(prev => ({
            ...prev,
            seminars: prev.seminars.filter(s => s.id !== modalState.data.id)
        }));
        setModalState({ type: null, data: null });
    };

    // --- Main Render Logic ---
    const navItems = Object.entries(modules).map(([id, config]) => ({ id, ...config }));
    
    const renderContent = () => {
        if (viewState.type === 'edit-blog') { return <BlogWriter initialBlog={viewState.data} onSave={handleSaveBlog} onCancel={() => setViewState({ type: 'list', data: null })} />; }
        if (viewState.type === 'edit-event') { return <EventEditor initialEvent={viewState.data} onSave={handleSaveEvent} onCancel={() => setViewState({ type: 'list', data: null })} />; }
        if (viewState.type === 'edit-webinar') { return <WebinarEditor initialWebinar={viewState.data} onSave={handleSaveWebinar} onCancel={() => setViewState({ type: 'list', data: null })} />; }
        if (viewState.type === 'edit-announcement') { return <AnnouncementEditor initialAnnouncement={viewState.data} onSave={handleSaveAnnouncement} onCancel={() => setViewState({ type: 'list', data: null })} />; }
        if (viewState.type === 'edit-podcast') { return <PodcastEditor initialPodcast={viewState.data} onSave={handleSavePodcast} onCancel={() => setViewState({ type: 'list', data: null })} />; }
        if (viewState.type === 'edit-seminar') { return <SeminarEditor initialSeminar={viewState.data} onSave={handleSaveSeminar} onCancel={() => setViewState({ type: 'list', data: null })} />; }

        const [mainModuleId, categoryType, ...slugParts] = selectedModule.split('_');
        
        if (mainModuleId === 'events') {
            if (selectedModule === 'events_add') { return <EventEditor initialEvent={null} onSave={handleSaveEvent} onCancel={() => setSelectedModule('events_all')} />; }
            return <EventsDashboard events={dataStore.events} onAddNew={handleAddNewEvent} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />;
        }
        if (mainModuleId === 'webinar') {
            if (selectedModule === 'webinar_add') { return <WebinarEditor initialWebinar={null} onSave={handleSaveWebinar} onCancel={() => setSelectedModule('webinar_all')} />; }
            return <WebinarsDashboard webinars={dataStore.webinar} onAddNew={handleAddNewWebinar} onEdit={handleEditWebinar} onDelete={handleDeleteWebinar} />;
        }
        if (mainModuleId === 'announcement') {
            if (selectedModule === 'announcement_add') { return <AnnouncementEditor initialAnnouncement={null} onSave={handleSaveAnnouncement} onCancel={() => setSelectedModule('announcement_all')} />; }
            return <AnnouncementsDashboard announcements={dataStore.announcement} onAddNew={handleAddNewAnnouncement} onEdit={handleEditAnnouncement} onDelete={handleDeleteAnnouncement} />;
        }
        if (mainModuleId === 'podcast') {
            if (selectedModule === 'podcast_add') { return <PodcastEditor initialPodcast={null} onSave={handleSavePodcast} onCancel={() => setSelectedModule('podcast_all')} />; }
            return <PodcastsDashboard podcasts={dataStore.podcast} onAddNew={handleAddNewPodcast} onEdit={handleEditPodcast} onDelete={handleDeletePodcast} />;
        }
        if (mainModuleId === 'seminars') {
            if (selectedModule === 'seminars_add') { return <SeminarEditor initialSeminar={null} onSave={handleSaveSeminar} onCancel={() => setSelectedModule('seminars_all')} />; }
            return <SeminarsDashboard seminars={dataStore.seminars} onAddNew={handleAddNewSeminar} onEdit={handleEditSeminar} onDelete={handleDeleteSeminar} />;
        }
        
        if (selectedModule === 'blogs_write') { return <BlogWriter initialBlog={null} onSave={handleSaveBlog} onCancel={() => setSelectedModule('blogs_published')} />; }

        if (!modules[mainModuleId]) { return <GenericContentView title="Not Found" data={[]} columns={[]} newItemLabel="" />; }
        const mainModule = modules[mainModuleId];

        if (mainModuleId === 'faq' && categoryType && slugParts.length > 0) {
            const parentCategory = mainModule.subItems.find(item => item.id === `faq_${categoryType}`);
            const categoryConfig = parentCategory?.children.find(item => item.id === selectedModule);
            const categoryName = categoryConfig ? categoryConfig.name : 'Not Found';
            const categoryFaqs = dataStore.faq.filter(f => f.category === categoryName);
            return <FAQManager categoryName={categoryName} faqs={categoryFaqs} onAdd={handleAddFaq} onUpdate={handleUpdateFaq} onDelete={(id) => handleDeleteFaq(dataStore.faq.find(f => f.id === id))} />;
        }
        
        let data = dataStore[mainModuleId] || [];
        let title = mainModule.title;
        if (mainModuleId === 'blogs') {
            const blogSubModule = selectedModule.split('_')[1];
            if (blogSubModule === 'drafts') { data = dataStore.blogs.filter(item => item.status === 'Draft'); title = 'Draft Blogs'; } 
            else if (blogSubModule === 'published') { data = dataStore.blogs.filter(item => item.status === 'Published'); title = 'Published Blogs'; }
        } else if (mainModuleId === 'faq') {
            data = dataStore.faq;
        }

        return <GenericContentView title={title} data={data} columns={mainModule.columns} newItemLabel={mainModule.newItemLabel} moduleType={mainModuleId} onAddNew={mainModuleId === 'blogs' ? handleWriteNewBlog : null} onDelete={mainModuleId === 'faq' ? handleDeleteFaq : handleDeleteBlog} onEdit={mainModuleId === 'faq' ? handleEditFaq : handleEditBlog} onPreview={handlePreviewBlog} />;
    };

    const modalInfo = {
        add: { title: `Add New ${modalState.data?.categoryType === 'course' ? 'Course' : 'Country'}`, label: `${modalState.data?.categoryType === 'course' ? 'Course' : 'Country'} Name`, placeholder: `e.g., ${modalState.data?.categoryType === 'course' ? 'Pearson Test of English' : 'Japan'}` },
        rename: { title: `Rename ${modalState.data?.categoryType === 'course' ? 'Course' : 'Country'}`, label: `${modalState.data?.categoryType === 'course' ? 'Course' : 'Country'} Name`, placeholder: '' },
    };

    return (
        <div className="bg-gray-100 font-sans flex h-screen">
            <CategoryModal isOpen={modalState.type === 'add' || modalState.type === 'rename'} onClose={() => setModalState({ type: null, data: null })} onSubmit={handleSaveCategory} initialValue={modalState.type === 'rename' ? modalState.data.name : ''} title={modalInfo[modalState.type]?.title} label={modalInfo[modalState.type]?.label} placeholder={modalInfo[modalState.type]?.placeholder} />
            <ConfirmModal isOpen={modalState.type === 'delete-category'} onClose={() => setModalState({ type: null, data: null })} onConfirm={handleConfirmDeleteCategory} title={`Delete ${modalState.data?.categoryType === 'course' ? 'Course' : 'Country'}`} message={`Delete "${modalState.data?.name}"? This will also remove all associated FAQs.`} />
            <ConfirmModal isOpen={modalState.type === 'delete-blog'} onClose={() => setModalState({ type: null, data: null })} onConfirm={handleConfirmDeleteBlog} title="Delete Blog Post" message={`Are you sure you want to delete "${modalState.data?.title}"?`} />
            <ConfirmModal isOpen={modalState.type === 'delete-faq'} onClose={() => setModalState({ type: null, data: null })} onConfirm={handleConfirmDeleteFaq} title="Delete FAQ" message={`Are you sure you want to delete this FAQ?`} />
            <ConfirmModal isOpen={modalState.type === 'delete-event'} onClose={() => setModalState({ type: null, data: null })} onConfirm={handleConfirmDeleteEvent} title="Delete Event" message={`Are you sure you want to delete the event "${modalState.data?.title}"?`} />
            <ConfirmModal isOpen={modalState.type === 'delete-webinar'} onClose={() => setModalState({ type: null, data: null })} onConfirm={handleConfirmDeleteWebinar} title="Delete Webinar" message={`Are you sure you want to delete the webinar "${modalState.data?.title}"?`} />
            <ConfirmModal isOpen={modalState.type === 'delete-announcement'} onClose={() => setModalState({ type: null, data: null })} onConfirm={handleConfirmDeleteAnnouncement} title="Delete Announcement" message={`Are you sure you want to delete the announcement "${modalState.data?.title}"?`} />
            <ConfirmModal isOpen={modalState.type === 'delete-podcast'} onClose={() => setModalState({ type: null, data: null })} onConfirm={handleConfirmDeletePodcast} title="Delete Podcast" message={`Are you sure you want to delete the podcast "${modalState.data?.heading}"?`} />
            <ConfirmModal isOpen={modalState.type === 'delete-seminar'} onClose={() => setModalState({ type: null, data: null })} onConfirm={handleConfirmDeleteSeminar} title="Delete Seminar" message={`Are you sure you want to delete the seminar "${modalState.data?.title}"?`} />

            {viewState.type === 'preview-blog' && ( <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={() => setViewState({ type: 'list', data: null })}> <div onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl max-h-full overflow-y-auto"><BlogPreview title={viewState.data.title} content={viewState.data.content} /></div> </div> )}
            
            <Sidebar navItems={navItems} selectedModule={selectedModule} setSelectedModule={setSelectedModule} openMenus={openMenus} setOpenMenus={setOpenMenus} onAddNewCategory={handleAddNewCategory} onRenameCategory={handleRenameCategory} onDeleteCategory={handleDeleteCategory} />
            <main className="flex-1 flex flex-col overflow-y-auto">{renderContent()}</main>
        </div>
    );
}

