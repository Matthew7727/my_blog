import React from 'react';
import { Outlet } from 'react-router-dom';
import MyHeader from './features/header/header';

const AppLayout = () => {
  return (
    <div>
      <MyHeader />
      <main style={{ paddingTop: '64px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;