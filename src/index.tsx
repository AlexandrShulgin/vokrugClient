import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyMap from './components/MyMap';
import Auth from './components/UI/Auth';
import Sidebar from './components/UI/Sidebar';
import ContextMenu from './components/UI/ContextMenu';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <Auth/>
    <MyMap/>
  </>
);

