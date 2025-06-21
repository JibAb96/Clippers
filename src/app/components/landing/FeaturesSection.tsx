"use client";
import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faUserCircle,
  faSearch,
  faUpload,
  faShieldAlt,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Features Section
 *
 * Showcases the key features of the Clippers platform with interactive cards
 * and visual representations of the platform's capabilities.
 */
const FeaturesSection = () => {
  const features = [
    {
      icon: faDashboard,
      title: "Creator Dashboard",
      titleColor: "from-blue-600 to-indigo-600",
      description:
        "Comprehensive dashboard for managing your profile, tracking submissions, and monitoring performance metrics.",
      details: [
        "Profile management and optimization",
        "Clip submission tracking",
        "Performance analytics",
        "Revenue insights",
      ],
    },
    {
      icon: faUserCircle,
      title: "Clipper Profiles",
      titleColor: "from-secondary to-secondary",
      description:
        "Detailed profiles showcasing clipper expertise, audience demographics, and pricing information.",
      details: [
        "Niche and platform specialization",
        "Follower count and engagement rates",
        "Pricing per post",
        "Portfolio showcase",
      ],
    },
    {
      icon: faSearch,
      title: "Advanced Search & Filtering",
      titleColor: "from-green-600 to-emerald-600",
      description:
        "Powerful search tools to find the perfect clipper match based on categories, niches, and keywords.",
      details: [
        "Multi-criteria filtering",
        "Niche-based search",
        "Price range selection",
        "Performance-based ranking",
      ],
    },
    {
      icon: faUpload,
      title: "Streamlined Submission",
      titleColor: "from-purple-600 to-pink-600",
      description:
        "Easy-to-use interface for submitting clips directly to clippers with built-in approval workflows.",
      details: [
        "Drag-and-drop upload",
        "Batch submission support",
        "Approval workflows",
        "Revision management",
      ],
    },
    {
      icon: faShieldAlt,
      title: "Security Features",
      titleColor: "from-orange-600 to-red-600",
      description:
        "Enterprise-grade security protecting sensitive information and ensuring safe transactions.",
      details: [
        "End-to-end encryption",
        "Secure payment processing",
        "Identity verification",
        "Content protection",
      ],
    },
    {
      icon: faChartLine,
      title: "Analytics & Reporting",
      titleColor: "from-cyan-600 to-blue-600",
      description:
        "Comprehensive analytics dashboard providing insights into performance, reach, and ROI.",
      details: [
        "Real-time performance tracking",
        "Audience growth metrics",
        "Revenue analytics",
        "Custom reporting",
      ],
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
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
            Platform{" "}
            <span className="text-secondary">
              Features
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to succeed in content distribution, from
            powerful tools to comprehensive analytics and security features.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 
                       border border-gray-100 hover:border-gray-200 overflow-hidden"
            >
              {/* Icon */}
              <div className="mb-6">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.titleColor} rounded-2xl flex items-center justify-center 
                                group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <FontAwesomeIcon
                    icon={feature.icon}
                    className="w-8 h-8 text-white"
                  />
                </div>
              </div>

              {/* Title */}
              <h3
                className={`text-2xl font-bold bg-gradient-to-r ${feature.titleColor} bg-clip-text text-transparent mb-4`}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Feature Details */}
              <ul className="space-y-3">
                {feature.details.map((detail, detailIndex) => (
                  <motion.li
                    key={detailIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1 + detailIndex * 0.05,
                    }}
                    viewport={{ once: true }}
                    className="flex items-center text-gray-700"
                  >
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">{detail}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
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
              All features included in every plan
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
 