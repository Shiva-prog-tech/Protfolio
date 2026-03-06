'use client'

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect, ReactNode } from 'react'

interface SkillCardProps {
  name: string
  logo?: ReactNode  
  color: string
  category: string
  index: number
}

import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiReactrouter,
  SiRedux,
  SiAxios,
  SiGraphql,
  SiJsonwebtokens,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiMui,
  SiJest,
  SiTestinglibrary,
  SiGit,
  SiGithub,
  SiPostman,
  SiJira,
  SiVercel
} from 'react-icons/si';
import { FaReact } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";
import { MdOutlineCable, MdFlashOn } from 'react-icons/md';
import { VscSymbolMethod } from 'react-icons/vsc';

// Quantum Particle Effect Component
const QuantumParticles = ({ isActive, color, isMobile }: { isActive: boolean; color: string; isMobile?: boolean }) => {
  const particleCount = isMobile ? 8 : 15; // Fewer particles on mobile
  
  return (
    <AnimatePresence>
      {isActive && (
        <>
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-gradient-to-r ${color}`}
              initial={{
                x: '50%',
                y: '50%',
                scale: 0,
                opacity: 0,
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * (isMobile ? 150 : 200)}%`,
                y: `${50 + (Math.random() - 0.5) * (isMobile ? 150 : 200)}%`,
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
              transition={{
                duration: isMobile ? 1 : 1.5 + Math.random(),
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  )
}

// 4D Skill Card Component
const SkillCard4D = ({ name, logo, color, category, index }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 4D Motion values with quantum spring physics (simplified for mobile)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const z = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { damping: isMobile ? 30 : 25, stiffness: isMobile ? 150 : 180, mass: isMobile ? 0.2 : 0.3 })
  const mouseYSpring = useSpring(y, { damping: isMobile ? 30 : 25, stiffness: isMobile ? 150 : 180, mass: isMobile ? 0.2 : 0.3 })
  const mouseZSpring = useSpring(z, { damping: isMobile ? 35 : 30, stiffness: isMobile ? 200 : 250, mass: isMobile ? 0.15 : 0.2 })

  // Advanced 4D transforms (reduced intensity on mobile)
  const rotateX = useTransform(mouseYSpring, [-0.8, 0.8], isMobile ? ["10deg", "-10deg"] : ["20deg", "-20deg"])
  const rotateY = useTransform(mouseXSpring, [-0.8, 0.8], isMobile ? ["-10deg", "10deg"] : ["-20deg", "20deg"])
  const rotateZ = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? ["-4deg", "4deg"] : ["-8deg", "8deg"])
  
  const scale = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [0.98, 1.03] : [0.95, 1.08])
  const translateZ = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [-15, 30] : [-30, 60])

  // Layer depths for 4D effect (reduced on mobile)
  const layer1Z = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [5, 20] : [10, 40])
  const layer2Z = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [10, 30] : [20, 60])
  const layer3Z = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [15, 40] : [30, 80])
  const layer4Z = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [20, 50] : [40, 100])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return // Disable 3D tilt on mobile

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Calculate 4D coordinates with quantum fluctuations
    const xPct = (mouseX / width - 0.5) * 2
    const yPct = (mouseY / height - 0.5) * 2
    const zPct = Math.sin(xPct * Math.PI) * Math.cos(yPct * Math.PI) * 0.8

    x.set(xPct)
    y.set(yPct)
    z.set(zPct)
    
    setMousePosition({ x: mouseX, y: mouseY })
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    z.set(0)
    setIsHovered(false)
  }

  const handleTouchStart = () => {
    if (isMobile) {
      setIsHovered(true)
      // Add a small random movement for mobile
      x.set((Math.random() - 0.5) * 0.3)
      y.set((Math.random() - 0.5) * 0.3)
      z.set((Math.random() - 0.5) * 0.2)
    }
  }

  const handleTouchEnd = () => {
    if (isMobile) {
      setIsHovered(false)
      x.set(0)
      y.set(0)
      z.set(0)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.8, rotateY: isMobile ? 0 : 30 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ 
        duration: isMobile ? 0.5 : 0.8, 
        delay: index * (isMobile ? 0.02 : 0.01),
        type: "spring",
        stiffness: isMobile ? 80 : 100,
        damping: isMobile ? 12 : 15
      }}
      viewport={{ once: true, margin: isMobile ? "-20px" : "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        rotateX,
        rotateY,
        rotateZ,
        scale,
        translateZ,
        transformStyle: "preserve-3d",
      }}
      className="relative group perspective-2000"
    >
      {/* Quantum field effect */}
      <motion.div
        className={`absolute -inset-2 md:-inset-4 bg-gradient-to-r ${color} rounded-xl md:rounded-3xl opacity-0 blur-xl md:blur-3xl`}
        animate={{
          opacity: isHovered ? (isMobile ? 0.2 : 0.3) : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Main card with crystalline structure */}
      <motion.div
        className="relative rounded-xl md:rounded-2xl overflow-hidden"
        style={{
          transform: `translateZ(${isHovered ? (isMobile ? 10 : 20) : 0}px)`,
        }}
      >
        {/* Premium glass base with quantum dots */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-purple-900/20 to-black/90 backdrop-blur-md md:backdrop-blur-xl" />
        
        {/* Quantum lattice pattern - simpler on mobile */}
        <div className="absolute inset-0 opacity-20 md:opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: isMobile 
              ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05) 0%, transparent 70%)'
              : `
                radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
                repeating-linear-gradient(45deg, transparent 0px, transparent 15px, rgba(255,255,255,0.02) 15px, rgba(255,255,255,0.02) 30px)
              `,
          }} />
        </div>

        {/* Floating quantum particles - fewer on mobile */}
        <QuantumParticles isActive={isHovered} color={color} isMobile={isMobile} />

        {/* 4D energy orbs - adjusted for mobile */}
        <motion.div
          className={`absolute -top-10 md:-top-20 -right-10 md:-right-20 w-20 h-20 md:w-40 md:h-40 bg-gradient-to-r ${color} rounded-full opacity-10 md:opacity-20 blur-xl md:blur-2xl`}
          animate={{
            x: isHovered ? (isMobile ? -10 : -20) : 0,
            y: isHovered ? (isMobile ? -10 : -20) : 0,
            scale: isHovered ? (isMobile ? 1.2 : 1.3) : 1,
          }}
          style={{
            transform: `translateZ(${layer1Z.get()}px)`,
          }}
        />
        
        <motion.div
          className={`absolute -bottom-10 md:-bottom-20 -left-10 md:-left-20 w-20 h-20 md:w-40 md:h-40 bg-gradient-to-r ${color} rounded-full opacity-10 md:opacity-20 blur-xl md:blur-2xl`}
          animate={{
            x: isHovered ? (isMobile ? 10 : 20) : 0,
            y: isHovered ? (isMobile ? 10 : 20) : 0,
            scale: isHovered ? (isMobile ? 1.2 : 1.3) : 1,
          }}
          style={{
            transform: `translateZ(${layer2Z.get()}px)`,
          }}
        />

        {/* 4D rotating ring - hidden on mobile */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              transform: `translateZ(${layer3Z.get()}px)`,
            }}
          >
            <div className="absolute inset-4 border border-white/10 rounded-2xl" />
            <div className="absolute inset-8 border border-white/5 rounded-2xl" />
          </motion.div>
        )}

        {/* Card content with 4D layering */}
        <div className="relative p-3 md:p-6">
          {/* Logo with 4D depth */}
          <motion.div
            className="relative flex justify-center mb-2 md:mb-4"
            style={{
              transform: isHovered ? `translateZ(${layer4Z.get()}px) scale(${isMobile ? 1.05 : 1.1})` : 'translateZ(0px)',
            }}
          >
            {/* Logo glow effect */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${color} rounded-full blur-md md:blur-xl opacity-0 group-hover:opacity-40 md:group-hover:opacity-50`}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            
            {/* Main logo with quantum spin */}
            <motion.div
              animate={{ 
                rotateY: isHovered && !isMobile ? [0, 360] : 0,
                scale: isHovered ? [1, 1.1, 1] : 1,
              }}
              transition={{ 
                rotateY: {
                  duration: 2,
                  repeat: isHovered && !isMobile ? Infinity : 0,
                  ease: "linear",
                },
                scale: {
                  duration: 1,
                  repeat: isHovered ? Infinity : 0,
                }
              }}
              className="text-4xl md:text-6xl filter drop-shadow-xl md:drop-shadow-2xl relative z-10"
            >
              {logo}
            </motion.div>
          </motion.div>

          {/* Skill name with 4D text effect */}
          <motion.h3
            className="text-sm md:text-xl font-bold text-center mb-1 md:mb-3"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              transform: isHovered ? `translateZ(${layer3Z.get()}px)` : 'translateZ(0px)',
              textShadow: isHovered ? `0 0 ${isMobile ? '10px' : '20px'} rgba(168,85,247,0.5)` : 'none',
            }}
          >
            <span className={`bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
              {name}
            </span>
          </motion.h3>

          {/* Category badge with 4D effect */}
          <motion.div
            className="flex justify-center"
            style={{
              transform: isHovered ? `translateZ(${layer2Z.get()}px)` : 'translateZ(0px)',
            }}
          >
            <motion.div
              whileHover={{ scale: isMobile ? 1 : 1.05 }}
              whileTap={{ scale: isMobile ? 0.95 : 1 }}
              className={`px-2 py-1 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-bold bg-gradient-to-r ${color} relative overflow-hidden group/badge`}
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/badge:translate-x-full transition-transform duration-700" />
              <span className="relative">{category}</span>
            </motion.div>
          </motion.div>

          {/* 4D corner accents - simpler on mobile */}
          <motion.div
            className="absolute top-1 left-1 md:top-2 md:left-2 w-3 h-3 md:w-6 md:h-6 border-l border-t md:border-l-2 md:border-t-2 border-white/10 rounded-tl-lg md:rounded-tl-xl"
            style={{
              transform: isHovered ? `translateZ(${layer2Z.get()}px)` : 'translateZ(0px)',
            }}
          />
          <motion.div
            className="absolute top-1 right-1 md:top-2 md:right-2 w-3 h-3 md:w-6 md:h-6 border-r border-t md:border-r-2 md:border-t-2 border-white/10 rounded-tr-lg md:rounded-tr-xl"
            style={{
              transform: isHovered ? `translateZ(${layer2Z.get()}px)` : 'translateZ(0px)',
            }}
          />
          <motion.div
            className="absolute bottom-1 left-1 md:bottom-2 md:left-2 w-3 h-3 md:w-6 md:h-6 border-l border-b md:border-l-2 md:border-b-2 border-white/10 rounded-bl-lg md:rounded-bl-xl"
            style={{
              transform: isHovered ? `translateZ(${layer2Z.get()}px)` : 'translateZ(0px)',
            }}
          />
          <motion.div
            className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-3 h-3 md:w-6 md:h-6 border-r border-b md:border-r-2 md:border-b-2 border-white/10 rounded-br-lg md:rounded-br-xl"
            style={{
              transform: isHovered ? `translateZ(${layer2Z.get()}px)` : 'translateZ(0px)',
            }}
          />

          {/* 4D floating particles - reduced for mobile */}
          {isHovered && !isMobile && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-0.5 h-0.5 bg-gradient-to-r ${color} rounded-full`}
                  initial={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                    scale: 0,
                  }}
                  animate={{
                    x: mousePosition.x + (Math.random() - 0.5) * 100,
                    y: mousePosition.y + (Math.random() - 0.5) * 100,
                    scale: [0, 1, 0],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* 4D edge glow */}
        <motion.div
          className="absolute inset-0 border border-white/0 rounded-xl md:rounded-2xl pointer-events-none"
          animate={{
            borderColor: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0)',
            boxShadow: isHovered ? `inset 0 0 ${isMobile ? '15px' : '30px'} rgba(168,85,247,0.2)` : 'none',
          }}
          style={{
            transform: isHovered ? `translateZ(${isMobile ? 5 : 10}px)` : 'translateZ(0px)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// 4D Quantum Filter Button
const QuantumFilterButton = ({ label, isActive, onClick, index }: any) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, rotateY: isMobile ? 0 : 45 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ scale: isMobile ? 1 : 1.05 }}
      whileTap={{ scale: isMobile ? 0.95 : 0.95 }}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      onTouchStart={() => isMobile && setIsHovered(true)}
      onTouchEnd={() => isMobile && setIsHovered(false)}
      onClick={onClick}
      className="relative perspective-1000"
    >
      <motion.div
        className="relative px-3 py-2 md:px-6 md:py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300"
        animate={{
          rotateX: isHovered && !isMobile ? 10 : 0,
          rotateY: isHovered && !isMobile ? 5 : 0,
        }}
      >
        {/* Quantum glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md md:blur-xl opacity-0"
          animate={{
            opacity: isHovered || isActive ? (isMobile ? 0.2 : 0.3) : 0,
            scale: isHovered ? 1.1 : 1,
          }}
        />
        
        {/* Button background */}
        <div className={`absolute inset-0 rounded-full ${
          isActive
            ? 'bg-gradient-to-r from-purple-500 to-pink-500'
            : 'bg-black/40 backdrop-blur-sm md:backdrop-blur-xl border border-white/10'
        }`} />
        
        {/* Inner glow */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full"
          animate={{
            opacity: isHovered ? 0.2 : 0,
          }}
        />
        
        {/* Button text */}
        <span className={`relative z-10 ${isActive ? 'text-white' : 'text-gray-300'}`}>
          {label}
        </span>

        {/* Floating particles on hover - only on desktop */}
        <AnimatePresence>
          {isHovered && !isMobile && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-purple-400 rounded-full"
                  initial={{
                    x: '50%',
                    y: '50%',
                    scale: 0,
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 100}%`,
                    y: `${50 + (Math.random() - 0.5) * 100}%`,
                    scale: [0, 1, 0],
                    opacity: [0, 0.5, 0],
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  )
}

export default function Skills4D() {
  const [filter, setFilter] = useState('All')
  const [quantumField, setQuantumField] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    setQuantumField(true)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

const skills = [
    // Frontend Core
    { name: 'React.js', logo: <FaReact />, color: 'from-cyan-400 to-blue-500', category: 'Frontend' },
    { name: 'Next.js', logo: <SiNextdotjs />, color: 'from-black to-gray-800', category: 'Frontend' },
    { name: 'TypeScript', logo: <SiTypescript />, color: 'from-blue-500 to-blue-700', category: 'Frontend' },
    { name: 'JavaScript', logo: <SiJavascript />, color: 'from-yellow-400 to-yellow-600', category: 'Frontend' },
    { name: 'HTML5', logo: <SiHtml5 />, color: 'from-orange-500 to-red-500', category: 'Frontend' },
    { name: 'CSS3', logo: <IoLogoCss3 />, color: 'from-blue-400 to-blue-600', category: 'Frontend' },
    { name: 'React Router', logo: <SiReactrouter />, color: 'from-red-400 to-red-600', category: 'Frontend' },
    
    // State Management
    { name: 'Redux Toolkit', logo: <SiRedux />, color: 'from-purple-500 to-purple-700', category: 'State Management' },
    { name: 'Context API', logo: <FaReact />, color: 'from-blue-400 to-cyan-500', category: 'State Management' },
    { name: 'Zustand', logo: '🐻', color: 'from-amber-500 to-orange-600', category: 'State Management' },
    
    // API Integration
    { name: 'RESTful APIs', logo: <MdOutlineCable />, color: 'from-green-500 to-green-700', category: 'API Integration' },
    { name: 'Axios', logo: <SiAxios />, color: 'from-purple-500 to-indigo-600', category: 'API Integration' },
    { name: 'GraphQL', logo: <SiGraphql />, color: 'from-pink-500 to-purple-600', category: 'API Integration' },
    { name: 'JWT Auth', logo: <SiJsonwebtokens />, color: 'from-yellow-500 to-orange-600', category: 'API Integration' },
    { name: 'API Caching', logo: <MdFlashOn />, color: 'from-blue-500 to-teal-500', category: 'API Integration' },
    
    // Styling
    { name: 'Tailwind CSS', logo: <SiTailwindcss />, color: 'from-cyan-400 to-teal-500', category: 'Styling' },
    { name: 'Material UI', logo: <SiMui />, color: 'from-blue-500 to-indigo-600', category: 'Styling' },
    { name: 'Bootstrap', logo: <SiBootstrap />, color: 'from-purple-500 to-purple-700', category: 'Styling' },
    { name: 'SCSS', logo: <SiSass />, color: 'from-pink-500 to-rose-600', category: 'Styling' },
    
    // Performance
    { name: 'Lazy Loading', logo: <VscSymbolMethod />, color: 'from-yellow-500 to-amber-600', category: 'Performance' },
    { name: 'Lighthouse', logo: <VscSymbolMethod />, color: 'from-purple-500 to-pink-600', category: 'Performance' },
    
    // Testing
    { name: 'Jest', logo: <SiJest />, color: 'from-red-500 to-red-700', category: 'Testing' },
    { name: 'RTL', logo: <SiTestinglibrary />, color: 'from-green-500 to-teal-600', category: 'Testing' },
    
    // Tools
    { name: 'Git', logo: <SiGit />, color: 'from-orange-600 to-red-600', category: 'Tools' },
    { name: 'GitHub', logo: <SiGithub />, color: 'from-gray-800 to-gray-900', category: 'Tools' },
    { name: 'Postman', logo: <SiPostman />, color: 'from-orange-500 to-red-600', category: 'Tools' },
    { name: 'Jira', logo: <SiJira />, color: 'from-blue-600 to-blue-800', category: 'Tools' },
    { name: 'Vercel', logo: <SiVercel />, color: 'from-black to-gray-700', category: 'Tools' },
];

  const categories = ['All', 'Frontend', 'State Management', 'API Integration', 'Styling', 'Performance', 'Testing', 'Tools']
  
  const filteredSkills = filter === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === filter)

  return (
    <section id="skills" className="py-8 md:py-12 px-3 md:px-4 relative overflow-hidden min-h-screen">
      {/* Quantum background field - optimized for mobile */}
      <div className="absolute inset-0">
        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-purple-950/30 to-black/40" />
        
        {/* Quantum field particles - fewer on mobile */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(isMobile ? 40 : 100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-purple-400/20 rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: 0,
              }}
              animate={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: isMobile ? 3 + Math.random() * 3 : 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* 4D rotating quantum rings - simplified for mobile */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="relative w-[800px] h-[800px]">
              <div className="absolute inset-0 border-2 border-purple-500/10 rounded-full" />
              <div className="absolute inset-[100px] border-2 border-pink-500/10 rounded-full" />
              <div className="absolute inset-[200px] border-2 border-blue-500/10 rounded-full" />
              <div className="absolute inset-[300px] border-2 border-cyan-500/10 rounded-full" />
            </div>
          </motion.div>
        )}

        {/* Floating energy orbs - fewer on mobile */}
        {[...Array(isMobile ? 2 : 5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full bg-gradient-to-r ${
              ['from-purple-500/5', 'from-pink-500/5', 'from-blue-500/5', 'from-cyan-500/5', 'from-indigo-500/5'][i]
            } to-transparent blur-2xl md:blur-3xl`}
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
            }}
            animate={{
              x: isMobile ? [0, 100, 0] : [0, 200, 0],
              y: isMobile ? [0, 100, 0] : [0, 200, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: isMobile ? 10 + i * 2 : 15 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* 4D Section Header - mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 50 : 100, rotateX: isMobile ? 0 : -30 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: isMobile ? 0.8 : 1.2, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-20 perspective-2000"
        >
          {/* Main title with 4D effect */}
          <h2 
            className="text-3xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 perspective-2000 px-2"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
              className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent text-2xl md:text-6xl"
            >
              {isMobile ? 'TECH STACK' : 'SKILLS & TECHNOLOGIES'}
            </motion.span>
          </h2>
        </motion.div>

        {/* 4D Quantum Filters - scrollable on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-16 perspective-2000 px-2"
        >
          {categories.map((category, index) => (
            <QuantumFilterButton
              key={category}
              label={isMobile && category.length > 10 ? category.split(' ')[0] : category}
              isActive={filter === category}
              onClick={() => setFilter(category)}
              index={index}
            />
          ))}
        </motion.div>

        {/* 4D Skills Grid - responsive grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 lg:gap-6 perspective-3000 px-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <SkillCard4D
                key={skill.name}
                name={skill.name}
                logo={skill.logo}
                color={skill.color}
                category={skill.category}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .perspective-2000 {
          perspective: 2000px;
        }
        .perspective-3000 {
          perspective: 3000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }

        @media (max-width: 640px) {
          .perspective-2000 {
            perspective: 1000px;
          }
          .perspective-3000 {
            perspective: 1500px;
          }
        }
      `}</style>
    </section>
  )
}