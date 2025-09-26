export const initialDataStore = {
    faq: [ { id: 1, question: 'What is the minimum score required for IELTS?', answer: 'The minimum score varies by institution, but a common requirement is an overall band score of 6.5.', category: 'IELTS', status: 'Published' }, { id: 2, question: 'How long is the TOEFL score valid?', answer: 'TOFL scores are valid for two years from the test date.', category: 'TOEFL', status: 'Published' }, { id: 3, question: 'Can I retake the GMAT?', answer: 'Yes, you can retake the GMAT up to five times within a rolling 12-month period.', category: 'GMAT', status: 'Draft' }, ],
    blogs: [ { id: 1, title: 'Getting Started with React Hooks', content: 'This is the full content of the React Hooks blog post...', slug: 'react-hooks-guide', author: 'Jane Doe', date: '2025-10-22', status: 'Published', category: 'Study Abroad Tips' }, { id: 2, title: 'A Deep Dive into Tailwind CSS', content: 'Content for the Tailwind CSS blog post goes here...', slug: 'tailwind-css-deep-dive', author: 'John Smith', date: '2025-10-20', status: 'Published', category: 'Test Preparation' }, { id: 3, title: 'The Future of Web Development', content: 'Exploring the future of web development...', slug: 'future-of-web-dev', author: 'Jane Doe', date: '2025-11-01', status: 'Draft', category: 'Visa Updates & Guidance' }, ],
    events: [
        // You can add some mock data here to start with
        { id: 1, title: 'Study Abroad Guidance Session', date: '2025-10-10', place: 'Maninagar', city: 'Ahmedabad' },
        { id: 2, title: 'IELTS Workshop (Past)', date: '2025-08-20', place: 'Vastrapur', city: 'Ahmedabad' },
    ], webinar: [
        { id: 1, title: 'Study Abroad Guidance Session', date: '2025-10-15', speaker: 'Somnesh Jaiswal', time: '17:00', platform: 'zoom', image: null },
    ],
     study_material: [], announcement: [
        { id: 1, title: 'Budgeting Tips for International Students in the USA', category: 'Scholarships & Financial Aid', date: '2025-07-24', author: 'Renaud Bressand' }
    ], podcast: [],
};