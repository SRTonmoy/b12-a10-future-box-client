import React from 'react';
import { Link } from 'react-router-dom';

export default function HabitCard({ habit }) {
  return (
    <div className="card">
      <img src={habit.imageUrl || 'https://via.placeholder.com/600x300'} alt={habit.title} className="w-full h-40 object-cover rounded" />
      <h3 className="font-bold mt-3">{habit.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{(habit.description||'').slice(0, 100)}{(habit.description||'').length>100?'...':''}</p>
      <p className="text-xs text-gray-500 mt-1">By {habit.userName || habit.userEmail || 'Unknown'}</p>
      <Link to={`/habits/${habit._id}`} className="btn btn-primary mt-3 inline-block">View Details</Link>
    </div>
  );
}
