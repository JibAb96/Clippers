"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

/**
 * Hero Section Component
 *
 * A modern, visually striking hero section that introduces the Clippers platform
 * with animated elements, gradient backgrounds, and clear call-to-action buttons.
 */
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-quarternary to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#BCC6CC]/5 to-transparent"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-secondary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-secondary/8 rounded-full blur-lg animate-pulse delay-500"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-primary/10 border border-[#101010]/20 rounded-full text-[#101010] font-medium text-sm"
          >
            <span className="w-2 h-2 bg-[#101010] rounded-full mr-2 animate-pulse"></span>
            Revolutionizing Content Distribution
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight"
          >
            <span className="bg-gradient-to-r from-[#101010] via-[#101010] to-[#BCC6CC] bg-clip-text text-transparent">
              Connect Creators
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#BCC6CC] via-[#101010] to-[#101010] bg-clip-text text-transparent">
              with Clippers
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            The ultimate platform where content creators meet social media
            influencers. Submit your clips and reach millions through our
            network of verified clippers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Link
              href="/register"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-secondary text-white font-semibold rounded-full 
                       shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 
                       hover:bg-secondary/90 min-w-[200px]"
            >
              <span>Get Started Free</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-[#101010] mb-2">10K+</div>
              <div className="text-gray-600">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#101010] mb-2">500+</div>
              <div className="text-gray-600">Verified Clippers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#101010] mb-2">1M+</div>
              <div className="text-gray-600">Clips Distributed</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
