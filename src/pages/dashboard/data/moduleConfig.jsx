import React from 'react';
// +++ FIX: Add SeminarIcon to the import list from your components/icons file +++
import { FaqIcon, BlogIcon, EventsIcon, WebinarIcon, StudyMaterialIcon, AnnouncementIcon, PodcastIcon, AddIcon, SeminarIcon } from '../components/icons';

export const initialModules = {
    faq: { 
        name: 'FAQ', 
        icon: <FaqIcon />, 
        title: 'All FAQs', 
        newItemLabel: null, 
        columns: [{ key: 'question', header: 'Question' }, { key: 'category', header: 'Category' }, { key: 'status', header: 'Status' }], 
        subItems: [
            { id: 'faq_course', name: 'Course FAQ', children: [
                { id: 'faq_course_ielts', name: 'IELTS' }, { id: 'faq_course_toefl', name: 'TOEFL' }, { id: 'faq_course_duolingo', name: 'Duolingo' }, { id: 'faq_course_pte', name: 'PTE' }, { id: 'faq_course_sat', name: 'SAT' }, { id: 'faq_course_gre', name: 'GRE' }, { id: 'faq_course_gmat', name: 'GMAT' }, { id: 'faq_course_english', name: 'English' }, { id: 'faq_course_german', name: 'German' }, { id: 'faq_course_french', name: 'French' }, { id: 'faq_course_add_new', name: 'Add New Course', icon: <AddIcon/> },
            ]},
            { id: 'faq_country', name: 'Country FAQ', children: [
                { id: 'faq_country_usa', name: 'USA' }, { id: 'faq_country_uk', name: 'UK' }, { id: 'faq_country_canada', name: 'Canada' }, { id: 'faq_country_australia', name: 'Australia' }, { id: 'faq_country_new_zealand', name: 'New Zealand' }, { id: 'faq_country_dubai', name: 'Dubai' }, { id: 'faq_country_germany', name: 'Germany' }, { id: 'faq_country_ireland', name: 'Ireland' }, { id: 'faq_country_france', name: 'France' }, { id: 'faq_country_malta', name: 'Malta' }, { id: 'faq_country_add_new', name: 'Add New Country', icon: <AddIcon/> }
            ]}
        ]
    },
    blogs: { name: 'Blogs', icon: <BlogIcon />, title: 'All Blogs', newItemLabel: 'New Blog Post', columns: [{ key: 'title', header: 'Title' }, { key: 'category', header: 'Category'}, { key: 'author', header: 'Author' }, { key: 'date', header: 'Date' }, { key: 'status', header: 'Status' }], subItems: [{ id: 'blogs_write', name: 'Write new blog' },{ id: 'blogs_drafts', name: 'Drafts' },{ id: 'blogs_published', name: 'Published' }] },
    events: {
        name: 'Events',
        icon: <EventsIcon />,
        subItems: [
            { id: 'events_all', name: 'All Events' },
            { id: 'events_add', name: 'Add New Event' },
        ],
    },
    webinar: {
        name: 'Webinar',
        icon: <WebinarIcon />,
        subItems: [
            { id: 'webinar_all', name: 'All Webinars' },
            { id: 'webinar_add', name: 'Add New Webinar' },
        ],
    },
    seminars: {
        name: 'Seminars',
        icon: <SeminarIcon />,
        subItems: [
            { id: 'seminars_all', name: 'All Seminars' },
            { id: 'seminars_add', name: 'Add New Seminar' },
        ],
    },
    study_material: { name: 'Study Material', icon: <StudyMaterialIcon />, title: 'Study Materials', newItemLabel: 'New Material', columns: [{ key: 'title', header: 'Title' }, { key: 'type', header: 'Type' }, { key: 'status', header: 'Status' }] },
    announcement: {
        name: 'Announcement',
        icon: <AnnouncementIcon />,
        subItems: [
            { id: 'announcement_all', name: 'All Announcements' },
            { id: 'announcement_add', name: 'Add New' },
        ],
    },
    podcast: {
        name: 'Podcast',
        icon: <PodcastIcon />,
        subItems: [
            { id: 'podcast_all', name: 'All Podcasts' },
            { id: 'podcast_add', name: 'Add New Podcast' },
        ],
    },
};

