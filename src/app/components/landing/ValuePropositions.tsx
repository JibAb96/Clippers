"use client";
import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faShieldAlt,
  faChartLine,
  faUsers,
  faClock,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Value Propositions Section
 *
 * Highlights the key benefits and unique value propositions of the Clippers platform
 * with animated cards and engaging visuals.
 */
const ValuePropositions = () => {
  const valueProps = [
    {
      icon: faRocket,
      title: "Rapid Growth",
      description:
        "Scale your content reach exponentially through our network of verified social media influencers.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: faShieldAlt,
      title: "Secure Transactions",
      description:
        "Built-in payment protection and escrow services ensure safe and transparent financial transactions.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: faChartLine,
      title: "Analytics & Insights",
      description:
        "Track performance, engagement metrics, and ROI with our comprehensive analytics dashboard.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: faUsers,
      title: "Quality Network",
      description:
        "Access a curated network of professional clippers with proven track records and engaged audiences.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: faClock,
      title: "Quick Turnaround",
      description:
        "Fast clip submission and approval process with real-time communication between creators and clippers.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: faDollarSign,
      title: "Flexible Pricing",
      description:
        "Competitive pricing models that work for creators of all sizes, from emerging to established.",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
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
            Why Choose{" "}
            <span className="text-secondary">
              Clippers
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;ve built the most comprehensive platform for content
            distribution, connecting creators with the right audience through
            trusted clippers.
          </p>
        </motion.div>

        {/* Value Proposition Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {valueProps.map((prop, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 
                       border border-gray-100 hover:border-secondary/20 overflow-hidden"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${prop.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>

              {/* Icon */}
              <div className="relative z-10 mb-6">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${prop.color} rounded-2xl flex items-center justify-center 
                                group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <FontAwesomeIcon
                    icon={prop.icon}
                    className="w-8 h-8 text-white"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-secondary transition-colors duration-300">
                  {prop.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {prop.description}
                </p>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-secondary/20 transition-colors duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 bg-secondary/10 px-6 py-3 rounded-full">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
            <span className="text-secondary font-medium">
              Ready to get started?
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuePropositions;
