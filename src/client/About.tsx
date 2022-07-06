import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className='Home'>
      <header className='Home-header'>
        <p>About</p>
        <a
          className='Home-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <Link to='/' className='Home-link'>
          Home
        </Link>
      </header>
    </div>
  );
}
