import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth, googleAuthProvider } from '../lib/firebase';


export default function EnterPage() {
  const { user, username } = useContext(UserContext);

  return (
    <main>
    {/* If user is true - username is not set, then output sign in form. Else output sign out button.
        Else if user is false, output sign in button.
    */}
    {user ?
      !username ? <UsernameForm /> : <SignOutButton />
      : <SignInButton />
    }
    </main>
  )
}



function SignInButton() {
  try {
    const signInWithGoogle = async () => {
      await auth.signInWithPopup(googleAuthProvider);
    }

    return (
      <button className="btn-google" onClick={signInWithGoogle}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" />
        Sign In with Google
      </button>
    )
  } catch (e) {
    console.error('Sign in with Google feature failed.. ' + e);
  }
}

function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>
}

function UsernameForm() {
  return (
    <form className="username-form">
      <label htmlFor="username">Enter your username:</label>
      <input type="text" id="username" />
      <button>Submit</button>
    </form>

  )
}