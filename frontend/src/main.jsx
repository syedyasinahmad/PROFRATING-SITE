import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CompareProvider } from './context/CompareContext';

// Global error catcher for any unhandled script crashes
window.onerror = function(msg, url, line, col, error) {
  console.error("Global Error Caught:", msg, error);
  const container = document.getElementById('root') || document.body;
  if (container) {
    container.innerHTML = `
      <div style="padding: 40px; font-family: sans-serif; max-width: 650px; margin: 40px auto; background: #fff; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 1px solid #fed7aa;">
        <h2 style="color: #ea580c; margin-top: 0;">Application Notice</h2>
        <p style="color: #4b5563; font-size: 14px;">An issue occurred while initializing the page:</p>
        <pre style="background: #f8fafc; padding: 16px; border-radius: 8px; font-size: 12px; color: #dc2626; overflow: auto; white-space: pre-wrap;">${msg}\n${error ? error.stack : ''}</pre>
        <button onclick="localStorage.clear(); window.location.reload();" style="margin-top: 16px; padding: 10px 20px; background: #10b981; color: #fff; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
          Clear Cache & Reload
        </button>
      </div>
    `;
  }
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '650px', margin: '40px auto', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '1px solid #fee2e2' }}>
          <h2 style={{ color: '#e11d48', marginTop: 0 }}>Something went wrong loading this component.</h2>
          <pre style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '12px', color: '#b91c1c', whiteSpace: 'pre-wrap' }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            style={{ marginTop: '16px', padding: '10px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Clear Cache & Refresh
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const mount = () => {
  const rootEl = document.getElementById('root');
  if (rootEl) {
    ReactDOM.createRoot(rootEl).render(
      <React.StrictMode>
        <ErrorBoundary>
          <ThemeProvider>
            <AuthProvider>
              <CompareProvider>
                <App />
              </CompareProvider>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </React.StrictMode>,
    );
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
