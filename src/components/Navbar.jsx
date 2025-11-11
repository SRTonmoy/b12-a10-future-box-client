import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const defaultAvatar = 'https://i.ibb.co/1rH0P4J/default-avatar.png'; // fallback avatar

  return (
<nav className="sticky top-0 z-50 bg-black/20 backdrop-blur-md shadow-md">      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Left section */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-primary">HabitHub</Link>
          <Link to="/browse" className="text-sm text-gray-600 hover:text-primary">Browse Public Habits</Link>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <Link to="/add-habit" className="text-sm hover:text-primary">Add Habit</Link>
          <Link to="/my-habits" className="text-sm hover:text-primary">My Habits</Link>

          {/* Not Logged In */}
          {!user && (
            <>
              <button onClick={() => navigate('/login')} className="btn btn-outline btn-sm">Login</button>
              <button onClick={() => navigate('/register')} className="btn btn-primary btn-sm">Signup</button>
            </>
          )}

          {/* Logged In */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img
                  referrerPolicy="no-referrer"
                  src={user.photoURL || defaultAvatar}
                  alt={user.displayName || "User Avatar"}
                  className="w-10 h-10 rounded-full border"
                />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 p-3 bg-white border rounded shadow-lg w-56 z-20"
                  >
                    <p className="font-semibold">{user.displayName || 'User'}</p>
                    <p className="text-xs text-gray-500 mb-2">{user.email}</p>
                    <button
                      onClick={async () => {
                        await logout();
                        setOpen(false);
                        navigate('/');
                      }}
                      className="btn btn-sm w-full bg-red-100 hover:bg-red-200 text-red-600"
                    >
                      Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
