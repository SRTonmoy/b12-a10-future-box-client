import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 p-6 mt-8">
      <div className="container mx-auto text-center">
        <h3 className="font-bold">HabitHub</h3>
        <p>Contact: example@example.com</p>
        <p className="text-sm mt-2">© {new Date().getFullYear()} HabitHub</p>
      </div>
    </footer>
  );
}
