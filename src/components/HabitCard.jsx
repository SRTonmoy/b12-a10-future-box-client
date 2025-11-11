import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function HabitCard({ habit: initialHabit }) {
  const [habit, setHabit] = useState(initialHabit);
  const { user } = useAuth();
  const navigate = useNavigate();

  const markComplete = async () => {
    if (!user) return Swal.fire('Login required', 'Please login to mark complete', 'info');
    try {
      const res = await api.post(`/habits/${habit._id}/complete`);
      const updated = res.data.habit || res.data;
      setHabit(updated);
      Swal.fire('Nice!', res.data.message || 'Marked complete for today', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || err.message, 'error');
    }
  };

  const handleViewDetails = () => {
    if (!user) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please login to view full habit details.',
        confirmButtonText: 'Login'
      }).then(() => navigate('/login'));
      return;
    }
    navigate(`/habits/${habit._id}`);
  };

  return (
    <div className="card p-4 shadow rounded bg-white">
      <img
        src={habit.imageUrl || 'https://picsum.photos/600/300'}
        alt={habit.title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="font-bold mt-3">{habit.title}</h3>
      <p className="text-sm text-gray-600 mt-1">
        {(habit.description || '').slice(0, 100)}
        {(habit.description || '').length > 100 ? '...' : ''}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        By {habit.userName || habit.userEmail || 'Unknown'}
      </p>
      <p className="text-sm mt-2 font-semibold text-green-600">
        🔥 Streak: {habit.currentStreak || 0}
      </p>

      <div className="mt-3 flex gap-2">
        <button
          onClick={handleViewDetails}
          className="btn btn-primary flex-1 text-center"
        >
          View Details
        </button>
        {user && (
          <button
            onClick={markComplete}
            className="btn flex-1 bg-green-500 text-white hover:bg-green-600"
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
}
