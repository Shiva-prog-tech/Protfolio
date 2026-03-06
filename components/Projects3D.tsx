'use client'

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import Premium3DModal from './PremiumModal'

interface Project3DCardProps {
  number: string
  title: string
  description: string
  tags: string[]
  gradient: string
  image: string
  index: number
  url: string
  role: string
  duration: string
  highlights: string[]
}

// Premium 4D Card Component with Responsive Design
const Project4DCard = ({ 
  number, 
  title, 
  description, 
  tags, 
  gradient, 
  index,
  url,
  role,
  duration,
  highlights,
  onOpenModal 
}: Project3DCardProps & { onOpenModal: () => void }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, z: 0 })
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 4D Motion values with enhanced spring physics
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const z = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { damping: 30, stiffness: 200, mass: 0.5 })
  const mouseYSpring = useSpring(y, { damping: 30, stiffness: 200, mass: 0.5 })
  const mouseZSpring = useSpring(z, { damping: 40, stiffness: 300, mass: 0.3 })

  // Advanced 4D transforms - reduced for mobile
  const rotateX = useTransform(mouseYSpring, [-0.8, 0.8], isMobile ? ["10deg", "-10deg"] : ["25deg", "-25deg"])
  const rotateY = useTransform(mouseXSpring, [-0.8, 0.8], isMobile ? ["-10deg", "10deg"] : ["-25deg", "25deg"])
  const rotateZ = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? ["-2deg", "2deg"] : ["-5deg", "5deg"])
  
  const scale = useTransform(mouseZSpring, [-0.5, 0.5], [0.98, 1.02])
  const translateZ = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [-20, 20] : [-50, 50])

  // Separate transforms for different layers - reduced for mobile
  const layer1Z = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [10, 30] : [20, 80])
  const layer2Z = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [20, 40] : [40, 100])
  const layer3Z = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [30, 50] : [60, 120])
  const layer4Z = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [40, 60] : [80, 140])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return // Disable 3D tilt on mobile

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Calculate 4D coordinates
    const xPct = (mouseX / width - 0.5) * 2
    const yPct = (mouseY / height - 0.5) * 2
    const zPct = Math.sin(xPct * Math.PI) * Math.cos(yPct * Math.PI) * 0.5

    x.set(xPct)
    y.set(yPct)
    z.set(zPct)
    
    setMousePosition({ x: mouseX, y: mouseY, z: zPct })
    setRotation({
      x: yPct * (isMobile ? 8 : 15),
      y: xPct * (isMobile ? 8 : 15),
      z: zPct * (isMobile ? 5 : 10)
    })
  }

  const handleMouseLeave = () => {
    if (isMobile) return
    x.set(0)
    y.set(0)
    z.set(0)
    setIsHovered(false)
    setRotation({ x: 0, y: 0, z: 0 })
  }

  // Mobile touch handlers
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile) return
    if (e.touches.length > 0) {
      setIsHovered(true)
    }
  }

  const handleTouchEnd = () => {
    if (isMobile) {
      setIsHovered(false)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: 30, rotateY: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
      transition={{ 
        duration: 1.2, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 80,
        damping: 15
      }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        rotateX,
        rotateY,
        rotateZ,
        scale,
        translateZ,
        transformStyle: "preserve-3d",
      }}
      className="relative group cursor-pointer perspective-2000"
    >
      {/* Main card container with 4D depth */}
      <motion.div
        className="relative rounded-2xl md:rounded-3xl overflow-hidden"
        style={{
          transform: `translateZ(${isHovered ? (isMobile ? 20 : 50) : 0}px)`,
        }}
      >
        {/* Ultra-premium glass base with crystalline effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-purple-900/30 to-black/90 backdrop-blur-xl md:backdrop-blur-2xl" />
        
        {/* 4D crystalline lattice structure - reduced opacity on mobile */}
        <div className={`absolute inset-0 ${isMobile ? 'opacity-20' : 'opacity-30'}`}>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)]" />
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 30%),
              repeating-linear-gradient(45deg, transparent 0px, transparent 20px, rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 40px)
            `
          }} />
        </div>

        {/* 4D floating orbs with depth - smaller on mobile */}
        <motion.div
          className={`absolute -top-20 md:-top-40 -right-20 md:-right-40 w-48 md:w-96 h-48 md:h-96 bg-gradient-to-r ${gradient} rounded-full opacity-20 blur-2xl md:blur-3xl`}
          animate={{
            x: rotation.x * (isMobile ? 10 : 20),
            y: rotation.y * (isMobile ? 10 : 20),
            z: rotation.z * (isMobile ? 20 : 50),
            scale: isHovered ? [1, 1.2, 1] : 1,
          }}
          transition={{
            scale: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{
            transform: `translateZ(${layer1Z.get()}px)`,
          }}
        />
        
        <motion.div
          className={`absolute -bottom-20 md:-bottom-40 -left-20 md:-left-40 w-48 md:w-96 h-48 md:h-96 bg-gradient-to-r ${gradient} rounded-full opacity-20 blur-2xl md:blur-3xl`}
          animate={{
            x: rotation.x * (isMobile ? -10 : -20),
            y: rotation.y * (isMobile ? -10 : -20),
            z: rotation.z * (isMobile ? -20 : -50),
            scale: isHovered ? [1, 1.2, 1] : 1,
          }}
          transition={{
            scale: {
              duration: 4,
              repeat: Infinity,
              delay: 2,
              ease: "easeInOut"
            }
          }}
          style={{
            transform: `translateZ(${layer2Z.get()}px)`,
          }}
        />

        {/* 4D energy field particles - fewer on mobile */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(isMobile ? 10 : 30)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-0.5 md:w-1 h-0.5 md:h-1 bg-gradient-to-r ${gradient} rounded-full`}
                  initial={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                    z: 0,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: mousePosition.x + (Math.random() - 0.5) * (isMobile ? 200 : 400),
                    y: mousePosition.y + (Math.random() - 0.5) * (isMobile ? 200 : 400),
                    z: (Math.random() - 0.5) * (isMobile ? 100 : 200),
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                  style={{
                    transform: `translateZ(${Math.random() * (isMobile ? 50 : 100)}px)`,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* 4D floating geometric shapes - hide some on mobile */}
        {(!isMobile || (isMobile && index % 2 === 0)) && (
          <>
            <motion.div
              className="absolute top-1/4 right-1/4 w-16 md:w-32 h-16 md:h-32 border border-white/5 rounded-2xl md:rounded-3xl"
              animate={{
                rotateX: rotation.x * 2,
                rotateY: rotation.y * 2,
                rotateZ: rotation.z * 2,
                x: rotation.x * 30,
                y: rotation.y * 30,
              }}
              style={{
                transform: `translateZ(${layer3Z.get()}px)`,
              }}
            />
            
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-12 md:w-24 h-12 md:h-24 border border-white/5 rotate-45 rounded-xl md:rounded-2xl"
              animate={{
                rotateX: rotation.x * -2,
                rotateY: rotation.y * -2,
                rotateZ: rotation.z * -2,
                x: rotation.x * -30,
                y: rotation.y * -30,
              }}
              style={{
                transform: `translateZ(${layer4Z.get()}px)`,
              }}
            />
          </>
        )}

        {/* Premium top bar with 4D shimmer */}
        <div className="relative h-1.5 md:h-2 overflow-hidden">
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${gradient}`}
            initial={{ x: '-100%' }}
            whileInView={{ x: '0%' }}
            transition={{ duration: 1.2, delay: 0.5 + index * 0.1 }}
            viewport={{ once: true }}
          />
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${gradient} blur-md`}
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.2,
            }}
          />
        </div>

        {/* Main content with 4D layering - responsive padding */}
        <div className="relative p-4 md:p-8">
          {/* 4D floating project number - smaller on mobile */}
          <motion.div
            className="absolute -top-3 md:-top-5 -right-3 md:-right-5 text-6xl md:text-[10rem] font-black text-white/5 select-none"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              transform: isHovered ? `translateZ(${isMobile ? 80 : 200}px) rotate(10deg)` : 'translateZ(0px) rotate(0deg)',
              textShadow: isHovered ? '0 0 50px rgba(168,85,247,0.5)' : 'none',
            }}
            animate={{
              rotate: rotation.z * 2,
            }}
          >
            {number}
          </motion.div>

          {/* 4D project badges with depth layers - responsive layout */}
          <div className="relative z-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0 mb-4 md:mb-8">
            <motion.div
              style={{
                transform: isHovered ? `translateZ(${layer3Z.get()}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'translateZ(0px)',
              }}
              className="w-full md:w-auto"
            >
              <motion.div
                className={`relative px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r ${gradient} rounded-xl md:rounded-2xl overflow-hidden group/badge inline-block`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-white/20 blur-md group-hover/badge:animate-shine" />
                <span className="relative text-xs md:text-sm font-bold text-white flex items-center gap-2 md:gap-3">
                  <motion.span
                    className="w-1.5 md:w-2 h-1.5 md:h-2 bg-white rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {role}
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              style={{
                transform: isHovered ? `translateZ(${layer2Z.get()}px) rotateX(${rotation.x * -1}deg) rotateY(${rotation.y * -1}deg)` : 'translateZ(0px)',
              }}
              className="w-full md:w-auto"
            >
              <div className="px-4 md:px-6 py-2 md:py-3 bg-black/40 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/10 inline-block">
                <span className="text-xs md:text-sm text-gray-300">{duration}</span>
              </div>
            </motion.div>
          </div>

          {/* 4D title with depth - responsive sizing */}
          <motion.h3
            className="text-3xl md:text-5xl font-black mb-3 md:mb-6"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              transform: isHovered ? `translateZ(${layer4Z.get()}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'translateZ(0px)',
              textShadow: isHovered ? '0 20px 30px rgba(0,0,0,0.5)' : 'none',
            }}
          >
            <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {title}
            </span>
          </motion.h3>

          {/* 4D description with floating effect - responsive text */}
          <motion.p
            className="text-sm md:text-lg text-gray-400 mb-4 md:mb-8 leading-relaxed"
            style={{
              transform: isHovered ? `translateZ(${layer2Z.get()}px)` : 'translateZ(0px)',
            }}
          >
            {description}
          </motion.p>

          {/* 4D tech tags with individual depth - responsive */}
          <motion.div
            className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-8"
            style={{
              transform: isHovered ? `translateZ(${layer3Z.get()}px)` : 'translateZ(0px)',
            }}
          >
            {tags.slice(0, isMobile ? 4 : 6).map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="px-3 md:px-5 py-1.5 md:py-2.5 text-xs md:text-sm font-semibold rounded-lg md:rounded-xl bg-white/5 border border-white/10 text-white/80 hover:border-white/30 transition-all relative overflow-hidden group/tag"
                style={{
                  transform: isHovered ? `translateZ(${isMobile ? 10 + i * 3 : 20 + i * 5}px)` : 'translateZ(0px)',
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover/tag:opacity-20 transition-opacity`} />
                <span className="relative">{tag}</span>
              </motion.span>
            ))}
          </motion.div>

          {/* 4D highlights grid with staggered depth - responsive grid */}
          <motion.div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-8`}
            style={{
              transform: isHovered ? `translateZ(${layer2Z.get()}px)` : 'translateZ(0px)',
            }}
          >
            {highlights.slice(0, isMobile ? 3 : 4).map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 md:gap-3"
                style={{
                  transform: isHovered ? `translateZ(${isMobile ? 10 + i * 3 : 15 + i * 5}px)` : 'translateZ(0px)',
                }}
              >
                <div className={`w-2 md:w-3 h-2 md:h-3 rounded-full bg-gradient-to-r ${gradient} shadow-lg shadow-purple-500/50`} />
                <span className="text-xs md:text-sm text-gray-300 font-medium">{highlight}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* 4D action buttons with premium effects - responsive */}
          
             <motion.div
            className="flex flex-col sm:flex-row gap-3 md:gap-4"
            style={{
              transform: isHovered ? `translateZ(${layer4Z.get()}px)` : 'translateZ(0px)',
            }}
          >
            <motion.a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, rotateZ: 2 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-4 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg md:rounded-xl font-bold text-center relative overflow-hidden group/btn text-sm md:text-base"
              style={{
                boxShadow: isHovered ? '0 20px 40px -10px rgba(0,255,255,0.3)' : 'none',
              }}
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2 md:gap-3">
                Live Demo
              </span>
            </motion.a>
            
            <motion.button
              onClick={onOpenModal}
              whileHover={{ scale: 1.05, rotateZ: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-4 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg md:rounded-xl font-bold text-center relative overflow-hidden group/btn text-sm md:text-base"
              style={{
                boxShadow: isHovered ? '0 20px 40px -10px rgba(168,85,247,0.3)' : 'none',
              }}
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2 md:gap-3">
                Preview
              </span>
            </motion.button>
          </motion.div>
         

          {/* 4D floating decorative elements - hide on mobile */}
          {!isMobile && (
            <motion.div
              className="absolute bottom-0 right-0 w-48 h-48 opacity-10"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transform: `translateZ(${layer1Z.get()}px)`,
              }}
            >
              <div className={`w-full h-full bg-gradient-to-br ${gradient} rounded-tl-full`} />
            </motion.div>
          )}
        </div>

        {/* 4D edge highlights */}
        <motion.div
          className="absolute inset-0 border-2 border-white/0 rounded-2xl md:rounded-3xl pointer-events-none"
          animate={{
            borderColor: isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0)',
            boxShadow: isHovered ? 'inset 0 0 50px rgba(168,85,247,0.2)' : 'none',
          }}
          style={{
            transform: isHovered ? `translateZ(${isMobile ? 15 : 30}px)` : 'translateZ(0px)',
          }}
        />

        {/* 4D corner accents - smaller on mobile */}
        <div className="absolute top-0 left-0 w-10 md:w-20 h-10 md:h-20 border-l-2 border-t-2 border-white/5 rounded-tl-2xl md:rounded-tl-3xl" />
        <div className="absolute top-0 right-0 w-10 md:w-20 h-10 md:h-20 border-r-2 border-t-2 border-white/5 rounded-tr-2xl md:rounded-tr-3xl" />
        <div className="absolute bottom-0 left-0 w-10 md:w-20 h-10 md:h-20 border-l-2 border-b-2 border-white/5 rounded-bl-2xl md:rounded-bl-3xl" />
        <div className="absolute bottom-0 right-0 w-10 md:w-20 h-10 md:h-20 border-r-2 border-b-2 border-white/5 rounded-br-2xl md:rounded-br-3xl" />
      </motion.div>
    </motion.div>
  )
}

// Premium 3D Modal - Keep the same but make it responsive


export default function Projects4D() {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const projects = [
    {
      number: '01',
      title: 'Travls.io',
      description: 'Flight and hotel booking platform with real-time pricing and availability. Built with Next.js SSR, achieving 40% faster loads and SEO score improvement from 65 to 92.',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'REST APIs', 'SSR'],
      gradient: 'from-cyan-500 to-blue-600',
      image: '/projects/travls.jpg',
      url: 'https://travls.io',
      role: 'Lead Frontend Developer',
      duration: '2025 - 2026',
      highlights: [
        '40% faster loading',
        'SEO 65 → 92',
        '10K+ users',
        'SSR architecture'
      ]
    },
    {
      number: '02',
      title: 'AdsGPT',
      description: 'AI-powered advertising platform with real-time analytics. Built responsive dashboard with campaign builders and data visualization components.',
      tags: ['React.js', 'Redux Toolkit', 'Tailwind CSS', 'AI/ML', 'Analytics'],
      gradient: 'from-purple-500 to-pink-600',
      image: '/projects/adsgpt.jpg',
      url: 'https://adsgpt.io',
      role: 'Frontend Developer',
      duration: '2024 - 2025',
      highlights: [
        'Real-time analytics',
        'AI campaign builder',
        'Lazy loading',
        'Responsive UI'
      ]
    },
    {
      number: '03',
      title: 'PowerDAO',
      description: 'Decentralized Web3 dApp platform with blockchain integration. Built dApp interfaces with Web3 data sources and reusable components.',
      tags: ['React.js', 'Web3.js', 'Solidity', 'Tailwind CSS', 'Blockchain'],
      gradient: 'from-indigo-500 to-purple-600',
      image: '/projects/powerdao.jpg',
      url: 'https://dapps.powerbrowser.app/',
      role: 'Frontend Developer',
      duration: '2023 - 2024',
      highlights: [
        'Web3 integration',
        'Smart contracts',
        'Reusable components',
        'dApp browser'
      ]
    }
  ]

  const handleOpenModal = (project: any) => {
    setSelectedProject(project)
    setShowModal(true)
  }

  return (
    <section id="projects" className="py-8 md:py-12 px-4 relative overflow-hidden min-h-screen">
      {/* Ultra-premium 4D background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/30 to-black" />
        
        {/* 4D quantum field */}
        <div className={`absolute inset-0 ${isMobile ? 'opacity-20' : 'opacity-30'}`}>
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(168,85,247,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(236,72,153,0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(59,130,246,0.1) 0%, transparent 50%)
            `
          }} />
        </div>
        
        {/* 4D floating orbs with parallax - fewer on mobile */}
        {[...Array(isMobile ? 3 : 7)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-[300px] md:w-[800px] h-[300px] md:h-[800px] rounded-full bg-gradient-to-r ${
              ['from-cyan-500/5', 'from-purple-500/5', 'from-pink-500/5', 'from-blue-500/5', 'from-indigo-500/5', 'from-violet-500/5', 'from-fuchsia-500/5'][i]
            } to-transparent blur-3xl`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(100px)',
            }}
            animate={{
              x: [0, isMobile ? 150 : 300, 0],
              y: [0, isMobile ? 150 : 300, 0],
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* 4D section header - responsive */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: -30 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20 perspective-2000"
        >
          <h2 
            className="text-5xl md:text-8xl lg:text-9xl font-black mb-4 md:mb-6 perspective-2000"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 100, rotateX: -45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ml-2 md:ml-4"
              style={{
                transform: `translateZ(${isMobile ? 50 : 150}px)`,
              }}
            >
              PROJECTS
            </motion.span>
          </h2>
        </motion.div>

        {/* 4D Cards Grid - responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-12 perspective-3000">
          {projects.map((project, index) => (
            <Project4DCard
              key={project.number}
              number={project.number}
              title={project.title}
              description={project.description}
              tags={project.tags}
              gradient={project.gradient}
              image={project.image}
              index={index}
              url={project.url}
              role={project.role}
              duration={project.duration}
              highlights={project.highlights}
              onOpenModal={() => handleOpenModal(project)}
            />
          ))}
        </div>
      </div>

      {/* Premium 3D Modal */}
      {selectedProject && (
        <Premium3DModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          project={selectedProject}
          url={selectedProject.url}
        />
      )}

      <style jsx>{`
        .perspective-2000 {
          perspective: 2000px;
        }
        .perspective-3000 {
          perspective: 3000px;
        }
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}