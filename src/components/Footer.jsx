import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  // components/Footer.jsx

  return (
    <footer className="bg-[#1875c1] mt-20 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">GoDrop</h2>
          <p className="text-gray-100">
            Fast, safe, and trackable delivery service you can rely on.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-100">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-gray-100">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> support@godrop.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> 123 GoDrop Ave, FastCity, USA
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-500">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-sky-400">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-pink-500">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-100 text-sm">
        © {new Date().getFullYear()} GoDrop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
