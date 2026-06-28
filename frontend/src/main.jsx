import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
        <Toaster
          position="top-right"
          gutter={12}
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--toast-bg)',
              color: 'var(--toast-color)',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
            },
            success: {
              iconTheme: { primary: '#10b981', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
          }}
        />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
