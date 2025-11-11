import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

export default function HabitDetails() {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    api.get(`/habits/${id}`)
      .then(res => setHabit(res.data.habit || res.data))
      .catch(() => Swal.fire('Error', 'Could not load habit details', 'error'));
  }, [id]);

  const markComplete = async () => {
    try {
      const res = await api.post(`/habits/${id}/complete`, {}, {
        headers: { Authorization: `Bearer ${user?.accessToken}` }
      });
      setHabit(res.data.habit);
      Swal.fire('✅ Done!', 'You marked this habit complete for today!', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || err.message, 'error');
    }
  };

  if (!habit) return <div className="p-6">Loading...</div>;

  const progressPercent = (() => {
    const last30 = (habit.completionHistory || []).filter(d => {
      const dt = new Date(d);
      return (Date.now() - dt.getTime()) <= 1000 * 60 * 60 * 24 * 30;
    }).length;
    return Math.round((last30 / 30) * 100);
  })();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={habit.imageUrl || 'https://via.placeholder.com/800x350'}
        alt={habit.title}
        className="w-full h-64 object-cover rounded"
      />
      <h1 className="text-3xl mt-4">{habit.title}</h1>
      <p className="text-sm text-gray-500">By {habit.userName || habit.userEmail}</p>
      <p className="mt-4">{habit.description}</p>

      <div className="mt-6">
        <p className="mb-2 font-semibold text-gray-700">
          🔥 Current Streak: <span className="text-green-600">{habit.currentStreak || 0}</span>
        </p>
        <div className="mb-2">Progress (last 30 days):</div>
        <div className="w-full bg-gray-200 rounded h-4">
          <div className="bg-green-500 h-4 rounded" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        {user && (
          <button
            onClick={markComplete}
            className="btn bg-green-500 text-white hover:bg-green-600"
          >
            Mark Complete
          </button>
        )}
        {habit.userId === (user?.uid || user?.email) && (
          <Link to={`/update/${id}`} className="btn btn-secondary">
            Update Habit
          </Link>
        )}
      </div>
    </div>
  );
}
