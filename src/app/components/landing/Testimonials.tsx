"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faStar,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Testimonials Section
 *
 * Displays customer testimonials and success stories with a carousel interface
 * and engaging animations to showcase platform success.
 */
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Content Creator",
      platform: "YouTube & TikTok",
      avatar: "/avatars/sarah.jpg",
      rating: 5,
      quote:
        "Clippers transformed my content distribution strategy. I&apos;ve seen a 300% increase in my reach and engagement since joining. The platform is incredibly intuitive and the clippers are professional.",
      stats: "300% increase in reach",
    },
    {
      name: "Marcus Rodriguez",
      role: "Social Media Clipper",
      platform: "Instagram & Twitter",
      avatar: "/avatars/marcus.jpg",
      rating: 5,
      quote:
        "As a clipper, I've been able to monetize my social media presence effectively. The platform makes it easy to connect with quality creators and manage multiple campaigns seamlessly.",
      stats: "$15K+ earned this year",
    },
    {
      name: "Emma Thompson",
      role: "Gaming Content Creator",
      platform: "Twitch & YouTube",
      avatar: "/avatars/emma.jpg",
      rating: 5,
      quote:
        "The analytics and tracking features are game-changing. I can see exactly how my clips perform across different platforms and optimize my content strategy accordingly.",
      stats: "500K+ new followers",
    },
    {
      name: "David Kim",
      role: "Lifestyle Influencer",
      platform: "Instagram & TikTok",
      avatar: "/avatars/david.jpg",
      rating: 5,
      quote:
        "The security features give me peace of mind. I know my content and payments are protected, and the verification process ensures I'm working with legitimate clippers.",
      stats: "2M+ monthly impressions",
    },
    {
      name: "Lisa Wang",
      role: "Fitness Content Creator",
      platform: "YouTube & Instagram",
      avatar: "/avatars/lisa.jpg",
      rating: 5,
      quote:
        "Finding the right clippers for my fitness content was effortless. The search and filtering tools are excellent, and the quality of clippers on the platform is outstanding.",
      stats: "150% engagement boost",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            What Our{" "}
            <span className="bg-gradient-to-r from-secondary to-blue-400 bg-clip-text text-transparent">
              Community
            </span>
            <br />
            Says
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied creators and clippers who have
            transformed their content distribution with our platform.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/20"
            >
              {/* Quote Icon */}
              <div className="mb-8">
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className="w-12 h-12 text-secondary opacity-50"
                />
              </div>

              {/* Testimonial Content */}
              <div className="mb-8">
                <p className="text-xl lg:text-2xl text-gray-100 leading-relaxed mb-6">
                  &quot;{testimonials[currentIndex].quote}&quot;
                </p>

                {/* Stats */}
                <div className="inline-flex items-center px-4 py-2 bg-secondary/20 rounded-full">
                  <span className="text-secondary font-semibold">
                    {testimonials[currentIndex].stats}
                  </span>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonials[currentIndex].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-300">
                      {testimonials[currentIndex].role} •{" "}
                      {testimonials[currentIndex].platform}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className="w-5 h-5 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center 
                       transition-all duration-300 hover:scale-110 border border-white/20"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-secondary w-8"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center 
                       transition-all duration-300 hover:scale-110 border border-white/20"
            >
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary mb-2">10K+</div>
            <div className="text-gray-300">Happy Creators</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary mb-2">500+</div>
            <div className="text-gray-300">Verified Clippers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary mb-2">1M+</div>
            <div className="text-gray-300">Clips Distributed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary mb-2">4.9/5</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
