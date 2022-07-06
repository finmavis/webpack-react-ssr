import { Link } from 'react-router-dom';

import logo from './logo.svg';
import './Home.css';

export default function Home() {
  return (
    <div className='Home'>
      <header className='Home-header'>
        <img src={logo} className='Home-logo' alt='logo' />
        <p>
          Edit <code>src/client/components/Home.js</code> and save to reload.
        </p>
        <a
          className='Home-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <Link to='/about' className='Home-link'>
          About
        </Link>
      </header>
    </div>
  );
}
