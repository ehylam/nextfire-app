import { auth } from '../lib/firebase';

export default function SignOutButton() {
  return <button className="btn-signout" onClick={() => auth.signOut()}>Sign Out</button>
}