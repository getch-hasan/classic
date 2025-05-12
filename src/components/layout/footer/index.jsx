"use client"
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-5 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Exclusive */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Exclusive</h2>
          <p className="mb-2 font-semibold">Subscribe</p>
          <p className="text-sm mb-3">Get 10% off your first order</p>
          <div className="flex items-center border border-gray-600 rounded px-3 py-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent text-sm focus:outline-none flex-1"
            />
            <button className="ml-2">
              <svg
                fill="white"
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
              >
                <path d="M3.4,20.4L21,12L3.4,3.6L3,10L17,12L3,14L3.4,20.4Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Support */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Support</h2>
          <p className="text-sm mb-1">111 Bijoy sarani, Dhaka,</p>
          <p className="text-sm mb-1">DH 1515, Bangladesh.</p>
          <p className="text-sm mb-1 mt-3">exclusive@gmail.com</p>
          <p className="text-sm mt-1">+88015-88888-9999</p>
        </div>

        {/* Account */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Account</h2>
          <ul className="text-sm space-y-1">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        {/* Quick Link */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Quick Link</h2>
          <ul className="text-sm space-y-1">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Download App</h2>
          <p className="text-sm mb-2">Save $3 with App New User Only</p>
          <div className="flex space-x-2 mb-4">
            <img
              src="/qr.svg"
              alt="QR"
              className="h-20 w-20 object-contain"
            />
            <div className="flex flex-col justify-between">
              <img
                src="/googlePlay.svg"
                alt="Google Play"
                className="h-9"
              />
              <img
                src="/apple.svg"
                alt="App Store"
                className="h-9"
              />
            </div>
          </div>
          <div className="flex space-x-4 text-lg">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
        © Copyright Rimel 2022. All right reserved
      </div>
    </footer>
  );
};

export default Footer;
