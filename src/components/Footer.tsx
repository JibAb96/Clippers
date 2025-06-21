"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faLinkedin,
  faGithub,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: faTwitter, href: "#", label: "Twitter" },
    { icon: faInstagram, href: "#", label: "Instagram" },
    { icon: faYoutube, href: "#", label: "YouTube" },
    { icon: faTiktok, href: "#", label: "TikTok" },
    { icon: faLinkedin, href: "#", label: "LinkedIn" },
    { icon: faGithub, href: "#", label: "GitHub" },
  ];

  

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div >
            {/* Brand section */}
            <div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Clippers
                </h2>
                <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                  Empowering creators and clippers with the ultimate platform
                  for content distribution. Join thousands of creators building
                  their communities through engaging clip content.
                </p>
              </div>

              {/* Social links */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-secondary 
                               rounded-full flex items-center justify-center transition-all duration-300 
                               transform hover:scale-110 hover:shadow-lg"
                    >
                      <FontAwesomeIcon icon={social.icon} className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-secondary rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faEnvelope} className="w-3 h-3" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Email</p>
                  <p className="text-white text-sm">support@clippers.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-secondary rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faPhone} className="w-3 h-3" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Phone</p>
                  <p className="text-white text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-secondary rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Address</p>
                  <p className="text-white text-sm">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>© {currentYear} Clippers. All rights reserved.</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>Made with</span>
                <FontAwesomeIcon
                  icon={faHeart}
                  className="w-3 h-3 text-secondary animate-pulse"
                />
                <span>for creators worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
