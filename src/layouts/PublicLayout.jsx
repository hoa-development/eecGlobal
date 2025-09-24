import React from 'react';
import { Outlet } from 'react-router-dom';

function PublicLayout() {
  return (
    <div className="public-layout-container">
      <Outlet />
    </div>
  );
}

export default PublicLayout;

