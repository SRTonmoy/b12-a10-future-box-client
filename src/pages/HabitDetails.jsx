import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import defaultHabitImg from '../assets/defHabit.jpg';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
} from 'recharts';

export default function HabitDetails() {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    api.get(`/habits/${id}`)
      .then(res => setHabit(res.data.habit || res.data))
      .catch(() => Swal.fire('Error', 'Could not load habit details', 'error'))
      .finally(() => setLoading(false));
  }, [id]);

  const markComplete = async () => {
    if (!user) return Swal.fire('Login required', 'Please login to mark complete', 'info');
    try {
      const res = await api.post(`/habits/${id}/complete`);
      const updated = res.data.habit || res.data;
      setHabit(updated);
      Swal.fire('Done', res.data.message || 'Marked complete', 'success');
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || err.message, 'error');
    }
  };

  if (loading) return <div className="p-6"><Spinner size={6} /></div>;
  if (!habit) return <div className="p-6">Habit not found.</div>;

  // Calculate progress for last 30 days
  const progressPercent = (() => {
    const last30 = (habit.completionHistory || []).filter(d => {
      const dt = new Date(d);
      return (Date.now() - dt.getTime()) <= 1000 * 60 * 60 * 24 * 30;
    }).length;
    return Math.round((last30 / 30) * 100);
  })();

  // Prepare chart data (last 7 days)
  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const formatted = d.toISOString().split('T')[0];
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      completed: habit.completionHistory?.includes(formatted) ? 1 : 0,
    };
  });

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Habit Card */}
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden border border-yellow-200">
        <img
          src={habit.imageUrl || defaultHabitImg}
          alt={habit.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-extrabold text-gray-800">{habit.title}</h1>
          <p className="text-sm text-gray-500">By {habit.userName || habit.userEmail}</p>
          <p className="text-gray-700">{habit.description}</p>

          {/* Streak & Progress */}
          <div className="mt-4 space-y-3">
            <p className="font-semibold text-gray-700">
              🔥 Current Streak: <span className="text-green-600">{habit.currentStreak || 0}</span>
            </p>
            <p className="font-semibold text-gray-700">Progress (last 30 days):</p>
            <div
              className="w-full bg-gray-200 rounded h-4 overflow-hidden"
              data-tip={`Progress: ${progressPercent}%`}
            >
              <div className="bg-green-500 h-4 rounded" style={{ width: `${progressPercent}%` }} />
            </div>
            <ReactTooltip place="top" type="dark" effect="solid" />
          </div>

          {/* Recharts Line Chart */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2 text-center text-gray-800">Last 7 Days Completion</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="date" stroke="#555" />
                <YAxis stroke="#555" domain={[0, 1]} ticks={[0, 1]} />
                <RechartTooltip
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px' }}
                  labelStyle={{ fontWeight: 'bold', color: '#f59e0b' }}
                  formatter={(value) => value === 1 ? 'Completed' : 'Missed'}
                />
                <Line type="monotone" dataKey="completed" stroke="#f59e0b" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            {user && (
              <button
                onClick={markComplete}
                data-tip="Click to mark this habit as completed today!"
                className="btn bg-green-500 text-white hover:bg-green-600"
              >
                Mark Complete
              </button>
            )}
            {habit.userId === (user?.uid || user?.email) && (
              <Link
                to={`/update/${id}`}
                className="btn btn-secondary"
                data-tip="Update your habit details"
              >
                Update Habit
              </Link>
            )}
            <ReactTooltip place="top" type="dark" effect="solid" />
          </div>
        </div>
      </div>
    </div>
  );
}
