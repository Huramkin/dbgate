import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import NotLoggedPage from './pages/NotLoggedPage';
import './styles/globals.css';

function createApp() {
  const page = (window as any)['dbgate_page'];

  switch (page) {
    case 'login':
      return <LoginPage isAdminPage={false} />;
    case 'admin-login':
      return <LoginPage isAdminPage={true} />;
    case 'error':
      return <ErrorPage />;
    case 'not-logged':
      return <NotLoggedPage />;
    case 'admin':
      return <App isAdminPage={true} />;
    default:
      return <App />;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    {createApp()}
  </React.StrictMode>
);
