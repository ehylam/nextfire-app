import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/context';
import { auth, googleAuthProvider, firestore } from '../lib/firebase';
import debounce from 'lodash.debounce';


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
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if(val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if(re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  }

  const checkUsername = useCallback(debounce(async (username) => {
    if(username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log('Firestore read executed!');
        setIsValid(!exists);
        setLoading(false);
      }
    },500),
  []);


  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents.
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    const batch = firestore.batch();
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  }


  function UsernameMessage({ username, isValid, loading }) {
    if(loading) {
      return <p>Checking username...</p>;
    } else if(isValid) {
      return <p className="text-success">Username is available!</p>;
    } else if(username && !isValid) {
      return <p className="text-danger">Username is taken!</p>;
    } else {
      return <p></p>;
    }
  }



  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input name="username" placeholder="Username" value={formValue} onChange={onChange} />
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          <button type="submit" className="btn-green" disabled={!isValid}>Choose</button>
        </form>
      </section>
    )

  )
}