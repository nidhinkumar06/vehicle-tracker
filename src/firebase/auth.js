import { auth } from './firebase';

export const onSignin = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const onSignOut = () => auth.signOut();
