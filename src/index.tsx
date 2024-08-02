import './index.css';

import ReactDOM from 'react-dom/client';
import MyMap from './components/MyMap';
import YLoginButton from './components/Auth/YLoginButton';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import YAuthCallback from './components/Auth/YAuthCallback';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyMap/>,
  },
  {
    path: "/auth/callback",
    element: <YAuthCallback/>
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <RouterProvider router={router} />
  </>
);

