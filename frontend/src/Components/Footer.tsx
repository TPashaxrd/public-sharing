import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white pt-12 pb-6 px-8">
        {/* <div className="border mb-3 border-black"></div> */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <h1 className="text-2xl font-bold mb-4">Public Sharing</h1>
          <p className="text-gray-400 text-sm">
            Share your thoughts, posts, and ideas with the world. A modern platform to express yourself freely and safely.
          </p>
          <div className="flex gap-4 mt-4 text-gray-400">
            <a href="#" className="hover:text-blue-500 transition-colors"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-pink-500 transition-colors"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-blue-600 transition-colors"><FaLinkedin size={20} /></a>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
            <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Resources</h2>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li><Link to="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
            <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
            <li><Link to="/support" className="hover:text-blue-400 transition-colors">Support</Link></li>
            <li><Link to="/developers" className="hover:text-blue-400 transition-colors">Developers</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-300 text-sm mb-2">Email: support@publicsharing.com</p>
          <p className="text-gray-300 text-sm mb-2">Phone: +90 501 000 00 00</p>
          <p className="text-gray-300 text-sm">Address: 123 Main Street, Istanbul, Turkey</p>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
        © 2025 Public Sharing. All rights reserved.
      </div>
    </footer>
  )
}