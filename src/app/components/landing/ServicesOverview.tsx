"use client";
import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faUserTie,
  faSearch,
  faHandshake,
  faCreditCard,
  faChartBar,
  faShieldAlt,
  faClock,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

/**
 * Services Overview Section
 *
 * Provides a comprehensive overview of the services offered to both creators and clippers,
 * with visual representations and clear explanations.
 */
const ServicesOverview = () => {
  const creatorServices = [
    {
      icon: faVideo,
      title: "Clip Submission",
      description:
        "Upload and submit your best clips for distribution through our network",
    },
    {
      icon: faSearch,
      title: "Clipper Discovery",
      description:
        "Find and connect with clippers that match your content niche and audience",
    },
    {
      icon: faChartBar,
      title: "Performance Tracking",
      description:
        "Monitor your clip performance and audience growth in real-time",
    },
  ];

  const clipperServices = [
    {
      icon: faUserTie,
      title: "Profile Management",
      description:
        "Create and maintain a professional profile showcasing your reach and expertise",
    },
    {
      icon: faHandshake,
      title: "Creator Collaboration",
      description:
        "Connect with creators and negotiate clip distribution opportunities",
    },
    {
      icon: faCreditCard,
      title: "Secure Payments",
      description:
        "Receive payments securely through our integrated payment system",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our{" "}
            <span className="text-secondary">
              Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive solutions for both content creators and
            social media clippers, ensuring a seamless experience for everyone
            involved in the content distribution ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* For Creators */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12 border border-blue-100">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-6">
                  <FontAwesomeIcon
                    icon={faVideo}
                    className="w-8 h-8 text-white"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    For Creators
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Amplify your content reach
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {creatorServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <FontAwesomeIcon
                        icon={service.icon}
                        className="w-6 h-6 text-blue-600"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Link href="/register">
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  Start Creating
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* For Clippers */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-3xl p-8 lg:p-12 border border-secondary/20">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl flex items-center justify-center mr-6">
                  <FontAwesomeIcon
                    icon={faUserTie}
                    className="w-8 h-8 text-white"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    For Clippers
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Monetize your social reach
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {clipperServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <FontAwesomeIcon
                        icon={service.icon}
                        className="w-6 h-6 text-secondary"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Link
                  href="/register"
                >
                <button className="w-full bg-secondary text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  Become a Clipper
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Platform Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Platform Benefits
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with security, transparency, and efficiency in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  className="w-8 h-8 text-secondary"
                />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Secure & Trusted
              </h4>
              <p className="text-gray-600">
                End-to-end encryption and verified user profiles
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon
                  icon={faClock}
                  className="w-8 h-8 text-secondary"
                />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Fast & Efficient
              </h4>
              <p className="text-gray-600">
                Streamlined processes for quick content distribution
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="w-8 h-8 text-secondary"
                />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Community Driven
              </h4>
              <p className="text-gray-600">
                Built by creators, for creators and clippers
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
 