import '@fontsource-variable/albert-sans';
import '../styles/global.css';
import './room.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { classicFallbackUrl, hasWebGL2 } from '../lib/webgl';
import { App } from './App';

if (!hasWebGL2()) {
  // No WebGL2 means no 3D room: show the Classic view instead of a blank page.
  location.replace(classicFallbackUrl(import.meta.env.BASE_URL));
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
