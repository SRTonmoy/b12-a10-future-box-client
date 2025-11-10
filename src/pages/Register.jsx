import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Register(){
  const { register, googleLogin } = useAuth();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [photo,setPhoto]=useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, photo);
      navigate('/');
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  const google = async () => {
    try {
      await googleLogin();
      navigate('/');
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="Photo URL (optional)" value={photo} onChange={e=>setPhoto(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="text-sm text-gray-500">Password must include uppercase, lowercase & be 6+ chars</div>
        <button className="btn btn-primary w-full">Register</button>
      </form>
      <button onClick={google} className="btn w-full mt-3">Sign up with Google</button>
      <p className="mt-3">Already have account? <Link to="/login" className="text-blue-600">Login</Link></p>
    </div>
  );
}
