"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faRocket,
  faShieldAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Call to Action Section
 *
 * Final section encouraging visitors to get started with the platform,
 * featuring compelling benefits and clear next steps.
 */
const CTASection = () => {
  const benefits = [
    {
      icon: faRocket,
      title: "Get Started in Minutes",
      description: "Quick setup process with guided onboarding",
    },
    {
      icon: faShieldAlt,
      title: "Secure & Trusted",
      description: "Enterprise-grade security and verified users",
    },
    {
      icon: faUsers,
      title: "Join the Community",
      description: "Connect with thousands of creators and clippers",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80 text-white overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center">
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Ready to Transform Your
              <br />
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Content Distribution?
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Join thousands of creators and clippers who are already growing
              their reach and building successful partnerships on our platform.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div
                  className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mx-auto mb-4 
                                group-hover:scale-110 transition-transform duration-300"
                >
                  <FontAwesomeIcon
                    icon={benefit.icon}
                    className="w-8 h-8 text-white"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-200">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link
              href="/register"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-secondary font-bold rounded-full 
                       shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 
                       hover:bg-gray-50 min-w-[200px] text-lg"
            >
              <span>Start Free Today</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Free to get started</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Cancel anytime</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-300 text-sm">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-white hover:text-gray-200 underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-white/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-6 h-6 bg-white/20 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-3 h-3 bg-white/40 rounded-full animate-pulse delay-500"></div>
    </section>
  );
};

export default CTASection;
 