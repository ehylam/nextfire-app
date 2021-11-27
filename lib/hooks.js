import { getAuth } from 'firebase/auth';
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from '../lib/hooks';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';


export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe; // Turn off realtime subscription

    if(user) {

      const ref = getDocs(collection(db, 'users')).doc(user.uid);
      unsubscribe = ref.onSnapshot(doc => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;


  },[user]);

  return { user, username };
}