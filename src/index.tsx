import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyMap from './components/MyMap';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import ContextMenu from './components/ContextMenu';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <Auth/>
    <MyMap/>
    <Sidebar/>
  </>
);

