import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './main.css';

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')!).render(<App />);
