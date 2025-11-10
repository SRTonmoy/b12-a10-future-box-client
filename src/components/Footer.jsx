import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-10 mt-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
        <h3 className="text-3xl font-extrabold text-white tracking-wide mb-2">
          HabitHub
        </h3>
        <p className="text-gray-400 mb-6">
          Build better habits, one step at a time 🌱
        </p>

        <div className="flex justify-center gap-6 mb-8">
          <a
            href="#"
            className="hover:text-blue-500 transition transform hover:-translate-y-1 duration-300"
            aria-label="Facebook"
          >
            <Facebook size={22} />
          </a>
          <a
            href="#"
            className="hover:text-sky-400 transition transform hover:-translate-y-1 duration-300"
            aria-label="Twitter"
          >
            <Twitter size={22} />
          </a>
          <a
            href="#"
            className="hover:text-pink-500 transition transform hover:-translate-y-1 duration-300"
            aria-label="Instagram"
          >
            <Instagram size={22} />
          </a>
          <a
            href="#"
            className="hover:text-blue-600 transition transform hover:-translate-y-1 duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
        </div>

        <p className="text-gray-400 text-sm">
          Contact us:{" "}
          <a
            href="mailto:example@example.com"
            className="text-blue-400 hover:underline"
          >
            example@example.com
          </a>
        </p>

        <div className="mt-6 border-t border-gray-700 pt-4 text-sm text-gray-500">
          © {new Date().getFullYear()} <span className="font-semibold text-white">HabitHub</span> — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
