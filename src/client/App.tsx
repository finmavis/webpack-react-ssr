import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';

import Head from './Head';

import './index.css';

const Home = loadable(() => import('./Home'));
const About = loadable(() => import('./About'));

export default function App() {
  return (
    <Fragment>
      <Head
        title='Server Side Rendering React'
        description='A boilerplate for Server Side Rendering React'
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Fragment>
  );
}
