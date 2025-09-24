import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Login from './pages/dashboard/admin/login';
import Dashboard from './pages/dashboard/dashboard';

//sample
function Home() {
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}

// --- Main App Component ---

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Route for the Home page */}
        <Route path="/" element={<Home />} />
        
        {/* Routes for the dashboard modules */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;

