import React, { useEffect, useState } from 'react';
import api from '../services/api';
import HabitCard from '../components/HabitCard';
import { motion } from 'framer-motion';

export default function Home(){
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    api.get('/habits/latest')
      .then(res => setFeatured(res.data.habits || res.data || []))
      .catch(()=>{})
      .finally(()=>setLoading(false));
  },[]);

  return (
    <div>
      <motion.section initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-8">
        <div className="card p-8 flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-sky-500 to-indigo-600 text-white">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Build better habits — daily.</h1>
            <p className="mt-3">Track progress, maintain streaks, and grow consistently with HabitHub.</p>
          </div>
          <div>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </motion.section>

      <section className="mb-6">
        <h2 className="text-2xl mb-4">Featured Habits</h2>
        {loading ? <div>Loading...</div> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map(h => <HabitCard key={h._id || h.id} habit={h} />)}
          </div>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-2xl mb-4">Why build habits?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card">Better Focus</div>
          <div className="card">Reduced Stress</div>
          <div className="card">Consistent Progress</div>
          <div className="card">Long-term Growth</div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl mb-4">Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">Use reminders to stay on track.</div>
          <div className="card">Start small and scale gradually.</div>
        </div>
      </section>
    </div>
  );
}
