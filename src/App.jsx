import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Login from './pages/dashboard/admin/login';

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
        
        {/* Route for the dashboard modules */}
        <Route path="/login" element={<Login />} />
      </>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;

