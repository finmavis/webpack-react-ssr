import http from 'http';
import app from './server';

const server = http.createServer(app);
let currentApp = app;

const PORT = process.env.PORT || 3000;

server
  .listen(PORT, function () {
    // eslint-disable-next-line no-console
    console.log(`Server running on http://localhost:${PORT}`);
  })
  .on('error', (error) => {
    console.error(error);
  });

if (module.hot) {
  module.hot.accept('./server', () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}
