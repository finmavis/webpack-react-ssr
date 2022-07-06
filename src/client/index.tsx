import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import App from './App';

const container = document.getElementById('root') as HTMLDivElement;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

loadableReady(() => {
  const root = hydrateRoot(container, app);
  root.render(app);
});

if (module.hot) {
  module.hot.accept();
}
