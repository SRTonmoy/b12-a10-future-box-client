import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        // Ensure latest user info (photoURL, displayName)
        await u.reload();
        setUser({ ...u });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const register = async (name, email, password, photoURL) => {
  if (!/(?=.*[A-Z])/.test(password) || !/(?=.*[a-z])/.test(password) || password.length < 6) {
    throw new Error('Password must include uppercase, lowercase and be at least 6 characters');
  }
  const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: name, photoURL: photoURL || null });
    await res.user.reload(); // <-- force reload profile info
    toast.success('Registered successfully');
    return res;
  }
const login = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  setUser(res.user); // ✅ update context
  toast.success('Logged in');
  return res;
};

const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    await res.user.reload(); // <-- ensures photoURL loads correctly
    toast.success('Logged in with Google');
    return res;
  };

  const logout = async () => {
    await signOut(auth);
    toast.success('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
