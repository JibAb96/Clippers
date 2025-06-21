"use client";
import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faEye,
  faHeart,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

/**
 * About Section
 *
 * Shares the company's mission, vision, and values with engaging visuals
 * and compelling storytelling about the platform's purpose.
 */
const AboutSection = () => {
  const values = [
    {
      icon: faBullseye,
      title: "Our Mission",
      description:
        "To democratize content distribution by connecting creators with the right audiences through trusted clippers, making viral content accessible to everyone.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: faEye,
      title: "Our Vision",
      description:
        "To become the world's leading platform for content distribution, empowering millions of creators to reach their full potential through strategic partnerships.",
      color: "from-secondary to-pink-500",
    },
    {
      icon: faHeart,
      title: "Our Values",
      description:
        "Transparency, security, and community-driven growth. We believe in building lasting relationships between creators and clippers based on trust and mutual success.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const teamStats = [
    {
      number: "5+",
      label: "Years Experience",
      description: "Building content platforms",
    },
    {
      number: "50+",
      label: "Team Members",
      description: "Dedicated to your success",
    },
    {
      number: "24/7",
      label: "Support",
      description: "Always here to help",
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
            About{" "}
            <span className="text-secondary">
              Clippers
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;re on a mission to revolutionize how content creators
            connect with their audiences through innovative distribution
            strategies and trusted partnerships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Building the Future of Content Distribution
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Founded by content creators for content creators, Clippers was
                born from a simple observation: great content deserves great
                distribution. We recognized that many talented creators struggle
                to reach their full potential due to limited distribution
                channels.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our platform bridges this gap by connecting creators with
                verified social media clippers who have built engaged audiences
                in specific niches. This creates a win-win ecosystem where
                creators get exposure and clippers monetize their social media
                presence.
              </p>
            </div>

            {/* Key Features Highlight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="w-6 h-6 text-secondary"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Community First
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Built by creators, for creators
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="w-6 h-6 text-secondary"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Trust & Security
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Verified partnerships only
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-secondary/5 to-blue-500/5 rounded-3xl p-8 lg:p-12 border border-secondary/20">
              <div className="space-y-6">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 group"
                  >
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center 
                                    group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <FontAwesomeIcon
                        icon={value.icon}
                        className="w-8 h-8 text-white"
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {value.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to building the best content
              distribution platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div
                  className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 
                                group-hover:scale-110 transition-transform duration-300 shadow-lg"
                >
                  <span className="text-2xl font-bold text-white">
                    {stat.number}
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {stat.label}
                </h4>
                <p className="text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-secondary/10 to-secondary/5 px-8 py-4 rounded-full">
            <span className="w-3 h-3 bg-secondary rounded-full animate-pulse"></span>
            <span className="text-secondary font-semibold">
              Join thousands of creators already using Clippers
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
