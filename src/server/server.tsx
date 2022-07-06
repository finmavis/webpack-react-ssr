/**
 * Express Server Dependencies
 */
import path from 'path';
import express from 'express';
//  import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { createProxyMiddleware as proxy } from 'http-proxy-middleware';
import expressStaticGzip from 'express-static-gzip';
import { html as htmlTemplate, oneLineTrim } from 'common-tags';
import morgan from 'morgan';

/**
 * SSR React Dependencies
 */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Helmet } from 'react-helmet';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import apiRoutes from './routes/api';
import App from 'client/App';

const isDevelopment = process.env.NODE_ENV === 'development';
const app = express();

app.set('trust proxy', true);
//  app.use(helmet());
app.use(compression());
app.use(morgan('common'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
  '/static',
  isDevelopment
    ? proxy({
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      })
    : expressStaticGzip('build/static', {
        enableBrotli: true,
        orderPreference: ['br', 'gz'],
        serveStatic: {
          maxAge: '1y',
        },
      })
);
app.use('/static/*', function (req, res) {
  res.status(404).end();
});
app.use('/api', apiRoutes);
app.get('/*', function (req, res) {
  const extractor = new ChunkExtractor({
    publicPath: process.env.PUBLIC_PATH,
    statsFile: path.resolve('build/static/loadable-stats.json'),
  });
  // const context = {};
  const view = renderToString(
    <ChunkExtractorManager extractor={extractor}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </ChunkExtractorManager>
  );
  const { htmlAttributes, title, meta, link, bodyAttributes } =
    Helmet.renderStatic();
  const html = htmlTemplate`
     <!doctype html>
     <html ${htmlAttributes.toString()}>
       <head>
         <meta charset="utf-8" />
         ${title.toString()}
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         ${meta.toString()}
         ${link.toString()}
         ${extractor.getLinkTags()}
         ${extractor.getStyleTags()}
       </head>
       <body ${bodyAttributes.toString()}>
         <noscript>You need to enable JavaScript to run this app.</noscript>
         <main id="root">${view}</main>
         ${extractor.getScriptTags()}
       </body>
     </html>
   `;
  res.status(200).send(oneLineTrim(html));
});

export default app;
