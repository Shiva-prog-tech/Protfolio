'use client'

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

interface EducationCardProps {
  year: string
  title: string
  institution: string
  description: string
  gradient: string
  index: number,
  url?:string,
  degree?: string
  score?: string
  location?: string
  duration?: string
  highlights?: string[]
  type: 'education' | 'certificate' | 'language'
  icon?: string
}

// Premium 4D Education Card Component
const Education4DCard = ({ 
  year,
  title,
  institution,
  description,
  gradient,
  index,
  degree,
  score,
  url,
  location,
  duration,
  highlights,
  type,
  icon = '🎓'
}: EducationCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, z: 0 })
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  // Check if mobile on mount and resize
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

  // Advanced 4D transforms
  const rotateX = useTransform(mouseYSpring, [-0.8, 0.8], isMobile ? ["5deg", "-5deg"] : ["25deg", "-25deg"])
  const rotateY = useTransform(mouseXSpring, [-0.8, 0.8], isMobile ? ["-5deg", "5deg"] : ["-25deg", "25deg"])
  const rotateZ = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? ["-2deg", "2deg"] : ["-5deg", "5deg"])
  
  const scale = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [0.99, 1.01] : [0.98, 1.02])
  const translateZ = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [-20, 20] : [-50, 50])

  // Separate transforms for different layers
  const layer1Z = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [10, 30] : [20, 80])
  const layer2Z = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [15, 40] : [40, 100])
  const layer3Z = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [20, 50] : [60, 120])
  const layer4Z = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [25, 60] : [80, 140])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return

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
      x: yPct * (isMobile ? 5 : 15),
      y: xPct * (isMobile ? 5 : 15),
      z: zPct * (isMobile ? 3 : 10)
    })
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    z.set(0)
    setIsHovered(false)
    setRotation({ x: 0, y: 0, z: 0 })
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isMobile) return

    const rect = cardRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    
    const touchX = touch.clientX - rect.left
    const touchY = touch.clientY - rect.top

    const xPct = (touchX / rect.width - 0.5) * 1.5
    const yPct = (touchY / rect.height - 0.5) * 1.5
    const zPct = Math.sin(xPct * Math.PI) * Math.cos(yPct * Math.PI) * 0.3

    x.set(xPct)
    y.set(yPct)
    z.set(zPct)
    
    setRotation({
      x: yPct * 5,
      y: xPct * 5,
      z: zPct * 3
    })
  }

  // Get icon based on type
  const getIcon = () => {
    if (type === 'education') return '🎓'
    if (type === 'certificate') return '🏆'
    if (type === 'language') return '🗣️'
    return icon
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: isMobile ? 0 : 30, rotateY: isMobile ? 0 : -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
      transition={{ 
        duration: isMobile ? 0.8 : 1.2, 
        delay: index * 0.1,
        type: "spring",
        stiffness: isMobile ? 60 : 80,
        damping: 15
      }}
      viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => {
        setIsHovered(false)
        x.set(0)
        y.set(0)
        z.set(0)
        setRotation({ x: 0, y: 0, z: 0 })
      }}
      style={{
        rotateX,
        rotateY,
        rotateZ,
        scale,
        translateZ,
        transformStyle: "preserve-3d",
      }}
      className={`relative group cursor-pointer perspective-2000 ${
        isMobile ? 'mb-6' : ''
      }`}
    >
      {/* Main card container with 4D depth */}
      <motion.div
        className="relative rounded-2xl md:rounded-3xl overflow-hidden"
        style={{
          transform: `translateZ(${isHovered && !isMobile ? 50 : 0}px)`,
        }}
      >
        {/* Ultra-premium glass base with crystalline effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-purple-900/30 to-black/90 backdrop-blur-xl md:backdrop-blur-2xl" />
        
        {/* 4D crystalline lattice structure */}
        <div className="absolute inset-0 opacity-20 md:opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)]" />
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 30%),
              repeating-linear-gradient(45deg, transparent 0px, transparent ${isMobile ? '15px' : '20px'}, rgba(255,255,255,0.02) ${isMobile ? '15px' : '20px'}, rgba(255,255,255,0.02) ${isMobile ? '30px' : '40px'})
            `
          }} />
        </div>

        {/* 4D floating orbs with depth */}
        <motion.div
          className={`absolute -top-20 md:-top-40 -right-20 md:-right-40 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r ${gradient} rounded-full opacity-10 md:opacity-20 blur-2xl md:blur-3xl`}
          animate={{
            x: isMobile ? 0 : rotation.x * 20,
            y: isMobile ? 0 : rotation.y * 20,
            z: isMobile ? 0 : rotation.z * 50,
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
            transform: isMobile ? 'none' : `translateZ(${layer1Z.get()}px)`,
          }}
        />
        
        <motion.div
          className={`absolute -bottom-20 md:-bottom-40 -left-20 md:-left-40 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r ${gradient} rounded-full opacity-10 md:opacity-20 blur-2xl md:blur-3xl`}
          animate={{
            x: isMobile ? 0 : rotation.x * -20,
            y: isMobile ? 0 : rotation.y * -20,
            z: isMobile ? 0 : rotation.z * -50,
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
            transform: isMobile ? 'none' : `translateZ(${layer2Z.get()}px)`,
          }}
        />

        {/* 4D energy field particles - reduced for mobile */}
        <AnimatePresence>
          {isHovered && !isMobile && (
            <>
              {[...Array(isMobile ? 5 : 20)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-gradient-to-r ${gradient} rounded-full`}
                  initial={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                    z: 0,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: mousePosition.x + (Math.random() - 0.5) * (isMobile ? 150 : 300),
                    y: mousePosition.y + (Math.random() - 0.5) * (isMobile ? 150 : 300),
                    z: (Math.random() - 0.5) * (isMobile ? 50 : 150),
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 1.5 + Math.random(),
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                  style={{
                    transform: isMobile ? 'none' : `translateZ(${Math.random() * 50}px)`,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* 4D floating geometric shapes - hidden on mobile */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-1/3 right-1/4 w-16 h-16 md:w-24 md:h-24 border border-white/5 rounded-xl md:rounded-2xl"
              animate={{
                rotateX: rotation.x * 2,
                rotateY: rotation.y * 2,
                rotateZ: rotation.z * 2,
                x: rotation.x * 20,
                y: rotation.y * 20,
              }}
              style={{
                transform: `translateZ(${layer3Z.get()}px)`,
              }}
            />
            
            <motion.div
              className="absolute bottom-1/3 left-1/4 w-14 h-14 md:w-20 md:h-20 border border-white/5 rotate-45 rounded-lg md:rounded-xl"
              animate={{
                rotateX: rotation.x * -2,
                rotateY: rotation.y * -2,
                rotateZ: rotation.z * -2,
                x: rotation.x * -20,
                y: rotation.y * -20,
              }}
              style={{
                transform: `translateZ(${layer4Z.get()}px)`,
              }}
            />
          </>
        )}

        {/* Premium top bar with 4D shimmer */}
        <div className="relative h-1 md:h-2 overflow-hidden">
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${gradient}`}
            initial={{ x: '-100%' }}
            whileInView={{ x: '0%' }}
            transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
            viewport={{ once: true }}
          />
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${gradient} blur-sm md:blur-md`}
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

        {/* Main content with 4D layering */}
        <div className="relative p-4 md:p-8">
          {/* 4D floating year */}
          <motion.div
            className="absolute -top-2 md:-top-5 -right-2 md:-right-5 text-4xl md:text-8xl font-black text-white/5 select-none"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              transform: isHovered && !isMobile ? 'translateZ(80px) rotate(10deg)' : 'translateZ(0px) rotate(0deg)',
              textShadow: isHovered && !isMobile ? '0 0 50px rgba(168,85,247,0.5)' : 'none',
            }}
            animate={{
              rotate: isMobile ? 0 : rotation.z * 2,
            }}
          >
            {year}
          </motion.div>

          {/* 4D type badge with depth */}
          <div className="relative z-20 flex flex-col md:flex-row justify-between items-start gap-3 mb-4 md:mb-6">
            <motion.div
              style={{
                transform: isHovered && !isMobile ? `translateZ(${layer3Z.get()}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'translateZ(0px)',
              }}
            >
              <motion.div
                className={`relative px-3 py-1.5 md:px-6 md:py-3 bg-gradient-to-r ${gradient} rounded-lg md:rounded-2xl overflow-hidden group/badge`}
                whileHover={{ scale: isMobile ? 1 : 1.05 }}
              >
                <div className="absolute inset-0 bg-white/20 blur-sm md:blur-md group-hover/badge:animate-shine" />
                <span className="relative text-xs md:text-sm font-bold text-white flex items-center gap-1 md:gap-3">
                  <motion.span
                    className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {url?
                  <Link href={url}  target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline">
                  {type === 'certificate' && 'CERTIFICATE' }
                  </Link>:
                  type === 'certificate' && 'CERTIFICATE' 
                  }
                  
                </span>
              </motion.div>
            </motion.div>

            {location && (
              <motion.div
                style={{
                  transform: isHovered && !isMobile ? `translateZ(${layer2Z.get()}px) rotateX(${rotation.x * -1}deg) rotateY(${rotation.y * -1}deg)` : 'translateZ(0px)',
                }}
              >
                <div className="px-3 py-1.5 md:px-6 md:py-3 bg-black/40 backdrop-blur-xl rounded-lg md:rounded-2xl border border-white/10">
                  <span className="text-xs md:text-sm text-gray-300">{location}</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Icon with 4D rotation */}
          <motion.div
            className="text-4xl md:text-7xl mb-2 md:mb-4 text-center"
            style={{
              transform: isHovered && !isMobile ? `translateZ(${layer4Z.get()}px) scale(1.1)` : 'translateZ(0px)',
            }}
            animate={{
              rotateY: isHovered && !isMobile ? [0, 360] : 0,
            }}
            transition={{
              rotateY: {
                duration: 3,
                repeat: isHovered && !isMobile ? Infinity : 0,
                ease: "linear",
              }
            }}
          >
            {getIcon()}
          </motion.div>

          {/* 4D title with depth */}
          <motion.h3
            className="text-xl md:text-4xl font-black mb-2 md:mb-3 text-center"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              transform: isHovered && !isMobile ? `translateZ(${layer4Z.get()}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'translateZ(0px)',
              textShadow: isHovered && !isMobile ? '0 20px 30px rgba(0,0,0,0.5)' : 'none',
            }}
          >
            <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {title}
            </span>
          </motion.h3>

          {/* Institution with 4D effect */}
          <motion.div
            className="text-center mb-2 md:mb-4"
            style={{
              transform: isHovered && !isMobile ? `translateZ(${layer2Z.get()}px)` : 'translateZ(0px)',
            }}
          >
            <span className="text-sm md:text-lg text-gray-300">{institution}</span>
          </motion.div>

          {/* Score/Duration badges */}
          {(score || duration) && (
            <motion.div
              className="flex justify-center gap-2 md:gap-3 mb-4 md:mb-6"
              style={{
                transform: isHovered && !isMobile ? `translateZ(${layer3Z.get()}px)` : 'translateZ(0px)',
              }}
            >
              {score && (
                <div className={`px-2 py-1 md:px-4 md:py-2 rounded-full bg-gradient-to-r ${gradient} bg-opacity-20 border border-white/10`}>
                  <span className="text-xs md:text-sm font-bold">{score}</span>
                </div>
              )}
              {duration && (
                <div className="px-2 py-1 md:px-4 md:py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
                  <span className="text-xs md:text-sm text-gray-300">{duration}</span>
                </div>
              )}
            </motion.div>
          )}

          {/* 4D description with floating effect */}
          <motion.p
            className="text-xs md:text-gray-400 mb-4 md:mb-6 leading-relaxed text-center px-2 md:px-0"
            style={{
              transform: isHovered && !isMobile ? `translateZ(${layer2Z.get()}px)` : 'translateZ(0px)',
            }}
          >
            {description}
          </motion.p>

          {/* 4D highlights grid with staggered depth */}
          {highlights && highlights.length > 0 && (
            <motion.div
              className={`grid ${highlights.length > 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-2 md:gap-3 mb-4 md:mb-6 px-2 md:px-0`}
              style={{
                transform: isHovered && !isMobile ? `translateZ(${layer2Z.get()}px)` : 'translateZ(0px)',
              }}
            >
              {highlights.slice(0, isMobile ? 3 : highlights.length).map((highlight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-1 md:gap-2"
                  style={{
                    transform: isHovered && !isMobile ? `translateZ(${10 + i * 3}px)` : 'translateZ(0px)',
                  }}
                >
                  <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r ${gradient} shadow-lg flex-shrink-0`} />
                  <span className="text-xs md:text-sm text-gray-300 line-clamp-1">{highlight}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Year display at bottom */}
          <motion.div
            className="text-center"
            style={{
              transform: isHovered && !isMobile ? `translateZ(${layer1Z.get()}px)` : 'translateZ(0px)',
            }}
          >
            <div className="inline-block px-3 py-1 md:px-6 md:py-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10">
              <span className="text-xs md:text-sm text-gray-400">{year}</span>
            </div>
          </motion.div>

          {/* 4D floating decorative elements */}
          {!isMobile && (
            <motion.div
              className="absolute bottom-0 right-0 w-16 h-16 md:w-32 md:h-32 opacity-10"
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
          className="absolute inset-0 border border-white/0 md:border-2 rounded-2xl md:rounded-3xl pointer-events-none"
          animate={{
            borderColor: isHovered && !isMobile ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0)',
            boxShadow: isHovered && !isMobile ? 'inset 0 0 30px rgba(168,85,247,0.2)' : 'none',
          }}
          style={{
            transform: isHovered && !isMobile ? 'translateZ(20px)' : 'translateZ(0px)',
          }}
        />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 md:w-16 md:h-16 border-l border-t border-white/5 rounded-tl-xl md:rounded-tl-3xl" />
        <div className="absolute top-0 right-0 w-8 h-8 md:w-16 md:h-16 border-r border-t border-white/5 rounded-tr-xl md:rounded-tr-3xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 md:w-16 md:h-16 border-l border-b border-white/5 rounded-bl-xl md:rounded-bl-3xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 md:w-16 md:h-16 border-r border-b border-white/5 rounded-br-xl md:rounded-br-3xl" />
      </motion.div>
    </motion.div>
  )
}

// Main Education Section Component
export default function Education4D({ language }: { language: boolean }) {
  const educationData = [
    // CERTIFICATE
    {
      year: '04/2023 - 09/2023',
      title: 'Certified MERN Stack Developer',
      institution: 'JSpiders, Bengaluru',
      description: 'Earned certification for completing comprehensive MERN Stack Development training. Demonstrated proficiency in building end-to-end web applications using MongoDB, Express.js, React.js, and Node.js.',
      gradient: 'from-amber-500 to-orange-600',
      type: 'certificate' as const,
      highlights: [
        'MERN Stack certification',
        'Full-stack proficiency',
        'Industry-recognized',
        'Hands-on assessment'
      ]
    },
    {
      year: '2022-2023',
      title: 'Advanced JavaScript: Complete Guide',
      institution: 'Udemy',
      description: 'Comprehensive advanced JavaScript certification covering modern ES6+ features, closures, prototypal inheritance, asynchronous programming, and performance optimization techniques.',
      gradient: 'from-yellow-500 to-amber-600',
      url:"https://www.udemy.com/certificate/UC-d1b0b019-1050-4f19-a200-9f99755ed403/",
      type: 'certificate' as const,
      highlights: [
        'ES6+ modern JavaScript',
        'Async/await & promises',
        'Closures & prototypes',
        'Performance optimization'
      ]
    },
    {
      year: '2023-2024',
      title: 'Advanced React and Redux',
      institution: 'Udemy',
      description: 'Advanced certification focused on React ecosystem including hooks, context API, Redux state management, Next.js fundamentals, and performance optimization.',
      gradient: 'from-blue-500 to-cyan-600',
      url:"https://www.udemy.com/certificate/UC-6cc993b6-6c5f-4338-98e1-5ead6718159f/",
      type: 'certificate' as const,
      highlights: [
        'React hooks & context',
        'Redux state management',
        'Next.js fundamentals',
        'Performance optimization'
      ]
    }
  ]

  const Language = [
    {
      year: 'Fluent',
      title: 'English',
      institution: 'Professional Proficiency',
      description: 'Fluent in English with excellent communication skills. Capable of technical discussions, documentation, and presentations.',
      gradient: 'from-blue-500 to-red-500',
      type: 'language' as const,
      icon: '🇬🇧',
      highlights: [
        'Technical communication',
        'Documentation',
        'Presentations',
        'Team collaboration'
      ]
    },
    {
      year: 'Fluent',
      title: 'Hindi',
      institution: 'Native Speaker',
      description: 'Native fluency in Hindi with strong verbal and written communication skills. Able to conduct technical discussions effectively.',
      gradient: 'from-orange-500 to-green-500',
      type: 'language' as const,
      icon: '🇮🇳',
      highlights: [
        'Native fluency',
        'Verbal communication',
        'Technical discussions',
        'Written proficiency'
      ]
    },
    {
      year: 'Fluent',
      title: 'Kannada',
      institution: 'Native Speaker',
      description: 'Native fluency in Kannada, the local language of Karnataka. Excellent communication skills for regional collaboration.',
      gradient: 'from-red-500 to-yellow-500',
      type: 'language' as const,
      icon: '🇮🇳',
      highlights: [
        'Native fluency',
        'Regional communication',
        'Local market expertise',
        'Client interactions'
      ]
    },
    {
      year: 'Fluent',
      title: 'Marathi',
      institution: 'Native Speaker',
      description: 'Native fluency in Marathi with strong communication abilities. Capable of conducting technical discussions.',
      gradient: 'from-purple-500 to-pink-500',
      type: 'language' as const,
      icon: '🇮🇳',
      highlights: [
        'Native fluency',
        'Technical communication',
        'Team collaboration',
        'Client relations'
      ]
    }
  ]

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const displayData = educationData
  const gridCols = isMobile ? 1 : (displayData.length === 1 ? 1 : (displayData.length === 2 ? 2 : 3))

  return (
    <section id="certificates" className="py-8 md:py-12 px-3 md:px-4 relative overflow-hidden min-h-screen">
      {/* Ultra-premium 4D background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/30 to-black" />
        
        {/* 4D quantum field */}
        <div className="absolute inset-0 opacity-20 md:opacity-30">
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(168,85,247,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(236,72,153,0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(59,130,246,0.1) 0%, transparent 50%)
            `
          }} />
        </div>
        
        {/* 4D floating orbs with parallax */}
        {[...Array(isMobile ? 3 : 7)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-[300px] md:w-[800px] h-[300px] md:h-[800px] rounded-full bg-gradient-to-r ${
              ['from-cyan-500/5', 'from-purple-500/5', 'from-pink-500/5', 'from-blue-500/5', 'from-indigo-500/5', 'from-violet-500/5', 'from-fuchsia-500/5'][i]
            } to-transparent blur-2xl md:blur-3xl`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, isMobile ? 100 : 300, 0],
              y: [0, isMobile ? 100 : 300, 0],
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: isMobile ? 15 : 25 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* 4D section header */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: isMobile ? 0 : -30 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-20 perspective-2000"
        >
          <h2 
            className="text-5xl md:text-8xl lg:text-9xl font-black mb-4 md:mb-6 perspective-2000"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 50, rotateX: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ml-2 md:ml-4"
              style={{
                transform: isMobile ? 'none' : 'translateZ(100px)',
              }}
            >
              {language ? "LANGUAGES" : "CERTIFICATION"}
            </motion.span>
          </h2>
        </motion.div>

        {/* 4D Cards Grid */}
        <div className={`grid grid-cols-1 ${gridCols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4 md:gap-8 lg:gap-12 perspective-3000`}>
          {displayData.map((item, index) => (
            <Education4DCard
              key={index}
              year={item.year}
              title={item.title}
              institution={item.institution}
              description={item.description}
              gradient={item.gradient}
              url={item.url&&item.url}
              index={index}
              highlights={item.highlights}
              type={item.type}
              // icon={item.icon}
            />
          ))}
        </div>
      </div>

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
        @media (max-width: 768px) {
          .line-clamp-1 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      `}</style>
    </section>
  )
}