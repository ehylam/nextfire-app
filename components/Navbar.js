import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';


export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/" passHref>
            <button className="btn-logo">Feed</button>
          </Link>
        </li>
        {username && (
          <>
            <li className="push-left">
              <Link href="/admin" passHref>
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`} passHref>
                <img src={user?.photoURL} width="200" height="200" alt="User Profile"/>
              </Link>
            </li>
          </>
        )}

        {!username && (
          <>
            <li>
              <Link href="/enter" passHref>
                <button className="btn-blue">Login</button>
              </Link>
            </li>
          </>
        )}

      </ul>
    </nav>
  )
}