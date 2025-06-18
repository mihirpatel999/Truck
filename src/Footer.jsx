import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1: About */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Lemon Software</h2>
          <p className="text-gray-400">
            Building smart ERP for smart businesses. Designed to streamline operations and grow your business with ease.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-yellow-400 transition text-xl"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-400 transition text-xl"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-400 transition text-xl"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-400 transition text-xl"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-300 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/HOME" className="hover:text-yellow-400 transition">Home</a></li>
            <li><a href="/plantmaster" className="hover:text-yellow-400 transition">Plant Master</a></li>
            <li><a href="/gate" className="hover:text-yellow-400 transition">Gate Keeper</a></li>
            <li><a href="/loader" className="hover:text-yellow-400 transition">Loader</a></li>
            <li><a href="/reports" className="hover:text-yellow-400 transition">Reports</a></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-300 mb-4">Contact Us</h3>
          <p className="text-gray-400">📍 Lemon Software Solution, Gujarat, India</p>
          <p className="text-gray-400">📞 +91 9723822139</p>
          <p className="text-gray-400">✉️ info@lemonsoft.com</p>
        </div>
      </div>

      <div className="mt-10 text-center border-t border-gray-700 pt-6 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Lemon Software Solution — Building Smart ERP for Smart Businesses.
      </div>
    </footer>
  );
}
