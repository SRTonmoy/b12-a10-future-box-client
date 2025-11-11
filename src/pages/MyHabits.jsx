// src/pages/MyHabits.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

export default function MyHabits() {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    api.get('/habits/my')
      .then(res => setHabits(res.data.habits || res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const remove = async (id) => {
    const ok = await Swal.fire({ title:'Confirm', text:'Delete this habit?', showCancelButton:true }).then(r=>r.isConfirmed);
    if (!ok) return;
    await api.delete(`/habits/${id}`);
    setHabits(habits.filter(h=>h._id !== id));
    Swal.fire('Deleted','Habit removed','success');
  };

  const mark = async (id) => {
    try {
      const res = await api.post(`/habits/${id}/complete`);
      const updated = res.data.habit || res.data;
      setHabits(habits.map(h => h._id === id ? updated : h));
      Swal.fire('Nice', 'Marked complete', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || err.message, 'error');
    }
  };

  if (loading) return <div className="flex justify-center mt-20"><Spinner size={80} /></div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-wide">My Habits</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-gray-700 font-sans">
          <thead className="bg-gray-100">
            <tr>
              {["Title", "Category", "Streak", "Created", "Actions"].map((title) => (
                <th key={title} className="text-left p-3 border-b border-gray-300 uppercase tracking-wider text-gray-600">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map(h => (
              <tr key={h._id} className="border-t border-gray-300 hover:bg-gray-50 transition duration-200">
                <td className="p-3 font-medium">{h.title}</td>
                <td className="p-3">{h.category}</td>
                <td className="p-3">{h.currentStreak || 0}</td>
                <td className="p-3">{new Date(h.createdAt).toLocaleDateString()}</td>
                <td className="p-3 flex flex-wrap gap-2 items-center">
                  <Link 
                    to={`/update/${h._id}`} 
                    className="btn btn-sm bg-blue-400 text-white hover:bg-blue-500 transition"
                  >
                    Update
                  </Link>
                  <button 
                    onClick={() => remove(h._id)} 
                    className="btn btn-sm bg-red-400 text-white hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                  <button 
                    onClick={() => mark(h._id)} 
                    className="btn btn-sm bg-green-400 text-white hover:bg-green-500 transition"
                  >
                    Mark Complete
                  </button>
                </td>
              </tr>
            ))}
            {habits.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-500 italic">
                  No habits found. Start adding some habits!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
