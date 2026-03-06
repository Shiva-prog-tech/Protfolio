'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Atom, Code2, Rocket, Zap, Download, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaReact } from 'react-icons/fa';
import { RiNextjsFill } from 'react-icons/ri';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDownloadResume = () => {
    setIsDownloading(true);
    
    const link = document.createElement('a');
    link.href = '/resume/ShivaPrasad_Resume_v5.pdf';
    link.download = 'ShivaPrasad_Jokare_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      {/* Gradient orbs - Optimized for mobile */}
      <div className="absolute top-10 left-5 sm:top-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-cyber-blue/20 rounded-full blur-2xl sm:blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-cyber-purple/20 rounded-full blur-2xl sm:blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-cyber-pink/10 rounded-full blur-2xl sm:blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Profile Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`flex justify-center lg:justify-end order-1 ${isMobile ? 'mb-6' : ''}`}
          >
            <div className="relative group">
              {/* Animated gradient border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink rounded-full blur-lg sm:blur-xl opacity-75 group-hover:opacity-100 animate-gradient-xy transition duration-1000"></div>
              
              {/* Inner rotating ring - Hidden on mobile */}
              <div className="absolute -inset-2 border-2 border-transparent bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink rounded-full animate-spin-slow opacity-50 hidden sm:block"></div>
              
              {/* Profile image container */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden glass-effect p-1.5 sm:p-2">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image
                    src="/pic-profile.png"
                    alt="Shivaprasad Jokare - Frontend Developer"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 384px"
                  />
                </div>
              </div>

              {/* Floating badges - Simplified animations matching original */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-gradient-to-r from-cyber-blue to-cyber-purple p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl glass-effect shadow-xl sm:shadow-2xl"
              >
                <Code2 className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-gradient-to-r from-cyber-purple to-cyber-pink p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl glass-effect shadow-xl sm:shadow-2xl"
              >
                <FaReact className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -right-4 sm:-right-6 lg:-right-8 bg-gradient-to-r from-cyber-pink to-neon-green p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl glass-effect shadow-xl sm:shadow-2xl"
              >
                <RiNextjsFill className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left space-y-4 sm:space-y-5 lg:space-y-6 order-2"
          >
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-block w-full lg:w-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 rounded-full glass-effect border border-cyber-blue/30 mb-3 sm:mb-4">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-neon-green rounded-full animate-pulse"></span>
                <span className="text-xs sm:text-sm font-medium text-cyber-blue">Available for opportunities</span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <span className="block text-gradient animate-gradient-x">
                SHIVAPRASAD
              </span>
              <span className="block text-gradient animate-gradient-x" style={{ animationDelay: '0.5s' }}>
                R JOKARE
              </span>
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-2"
            >
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-cyber-blue font-semibold tracking-wide px-2 lg:px-0">
                Frontend Developer | React.js & Next.js | 2+ years of experience
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto lg:mx-0 px-3 sm:px-4 lg:px-0">
                {isMobile 
                  ? "Frontend Developer specializing in React, Next.js, and TypeScript. 2+ years of experience building high-performance web applications."
                  : "Results-driven Frontend Developer with 2+ years of experience architecting scalable, high-performance web applications using React, Next, and TypeScript. Proven track record of elevating search rankings by 27+ points, slashing page load times by 35-40%, and increasing user engagement by 25-30%."
                }
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-4 sm:pt-6 px-4 sm:px-0"
            >
              <a
                href="#projects"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full font-bold text-sm sm:text-base lg:text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                  View Projects
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple to-cyber-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              <a
                href="#contact"
                className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-cyber-blue rounded-full font-bold text-sm sm:text-base lg:text-lg hover:bg-cyber-blue hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center"
              >
                Get In Touch
              </a>

              <button
                onClick={handleDownloadResume}
                disabled={isDownloading}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-full font-bold text-sm sm:text-base lg:text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isDownloading ? (
                    <>
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
                      <span>Resume</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue to-cyber-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 px-4 sm:px-0"
            >
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gradient-blue-purple" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  2+
                </div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">Years Exp</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gradient-blue-purple" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  3+
                </div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">Projects</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gradient-blue-purple" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  100%
                </div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">Success</div>
              </div>
            </motion.div>

            {/* Tech stack badges */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start pt-4 px-4 sm:px-0"
            >
              {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Redux',].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs sm:text-sm bg-cyber-blue/10 border border-cyber-blue/30 rounded-full text-cyber-blue hover:bg-cyber-blue/20 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </motion.div> */}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 sm:bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-cyber-blue rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyber-blue rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}