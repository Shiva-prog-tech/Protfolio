'use client'

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { 
  Languages, 
  Speech
} from 'lucide-react'

interface SkillCardProps {
  name: string
  color: string
  index: number
}

// Quantum Particle Effect Component
const QuantumParticles = ({ isActive, color }: { isActive: boolean; color: string }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${color}`}
              initial={{
                x: '50%',
                y: '50%',
                scale: 0,
                opacity: 0,
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 200}%`,
                y: `${50 + (Math.random() - 0.5) * 200}%`,
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
              transition={{
                duration: 1.5 + Math.random(),
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

// 4D Skill Card Component - Optimized for mobile
const SkillCard4D = ({ name, color, index }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isTouched, setIsTouched] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 4D Motion values with quantum spring physics
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const z = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { damping: 25, stiffness: 180, mass: 0.3 })
  const mouseYSpring = useSpring(y, { damping: 25, stiffness: 180, mass: 0.3 })
  const mouseZSpring = useSpring(z, { damping: 30, stiffness: 250, mass: 0.2 })

  // Advanced 4D transforms - reduced intensity for mobile
  const rotateX = useTransform(mouseYSpring, [-0.8, 0.8], isMobile ? ["10deg", "-10deg"] : ["20deg", "-20deg"])
  const rotateY = useTransform(mouseXSpring, [-0.8, 0.8], isMobile ? ["-10deg", "10deg"] : ["-20deg", "20deg"])
  const rotateZ = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? ["-4deg", "4deg"] : ["-8deg", "8deg"])
  
  const scale = useTransform(mouseZSpring, [-0.5, 0.5], [0.98, 1.05])
  const translateZ = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [-10, 30] : [-30, 60])

  // Layer depths for 4D effect - reduced for mobile
  const layer1Z = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [5, 20] : [10, 40])
  const layer2Z = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [10, 30] : [20, 60])
  const layer3Z = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [15, 40] : [30, 80])
  const layer4Z = useTransform(mouseZSpring, [-0.5, 0.5], isMobile ? [20, 50] : [40, 100])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return

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

  const handleTouchStart = () => {
    if (isMobile) {
      setIsTouched(true)
      // Random subtle movement on touch
      x.set((Math.random() - 0.5) * 0.5)
      y.set((Math.random() - 0.5) * 0.5)
      z.set((Math.random() - 0.5) * 0.3)
    }
  }

  const handleTouchEnd = () => {
    if (isMobile) {
      setIsTouched(false)
      x.set(0)
      y.set(0)
      z.set(0)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    z.set(0)
    setIsHovered(false)
    setIsTouched(false)
  }

  const isActive = isHovered || isTouched

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.01,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      viewport={{ once: true, margin: "-50px" }}
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
      className="relative group perspective-2000 cursor-pointer"
    >
      {/* Quantum field effect */}
      <motion.div
        className={`absolute -inset-2 md:-inset-4 bg-gradient-to-r ${color} rounded-2xl md:rounded-3xl opacity-0 blur-2xl md:blur-3xl`}
        animate={{
          opacity: isActive ? 0.3 : 0,
          scale: isActive ? 1.2 : 1,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Main card with crystalline structure */}
      <motion.div
        className="relative rounded-xl md:rounded-2xl overflow-hidden"
        style={{
          transform: `translateZ(${isActive ? 20 : 0}px)`,
        }}
      >
        {/* Premium glass base with quantum dots */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-purple-900/20 to-black/90 backdrop-blur-xl" />
        
        {/* Quantum lattice pattern */}
        <div className="absolute inset-0 opacity-20 md:opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
              repeating-linear-gradient(45deg, transparent 0px, transparent 15px, rgba(255,255,255,0.02) 15px, rgba(255,255,255,0.02) 30px)
            `
          }} />
        </div>

        {/* Floating quantum particles - reduced for mobile */}
        {!isMobile && <QuantumParticles isActive={isActive} color={color} />}
        
        {/* Mobile particles - simpler version */}
        {isMobile && isActive && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r ${color}`}
                initial={{
                  x: '50%',
                  y: '50%',
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`,
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

        {/* 4D energy orbs - scaled for mobile */}
        <motion.div
          className={`absolute -top-10 md:-top-20 -right-10 md:-right-20 w-20 h-20 md:w-40 md:h-40 bg-gradient-to-r ${color} rounded-full opacity-20 blur-xl md:blur-2xl`}
          animate={{
            x: isActive ? (isMobile ? -10 : -20) : 0,
            y: isActive ? (isMobile ? -10 : -20) : 0,
            scale: isActive ? 1.2 : 1,
          }}
          style={{
            transform: `translateZ(${layer1Z.get()}px)`,
          }}
        />
        
        <motion.div
          className={`absolute -bottom-10 md:-bottom-20 -left-10 md:-left-20 w-20 h-20 md:w-40 md:h-40 bg-gradient-to-r ${color} rounded-full opacity-20 blur-xl md:blur-2xl`}
          animate={{
            x: isActive ? (isMobile ? 10 : 20) : 0,
            y: isActive ? (isMobile ? 10 : 20) : 0,
            scale: isActive ? 1.2 : 1,
          }}
          style={{
            transform: `translateZ(${layer2Z.get()}px)`,
          }}
        />

        {/* 4D rotating ring - hidden on mobile for performance */}
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
        <div className="relative p-4 md:p-6">
          {/* Logo with 4D depth */}
          <motion.div
            className="relative flex justify-center mb-3 md:mb-4"
            style={{
              transform: isActive ? `translateZ(${layer4Z.get()}px) scale(1.05)` : 'translateZ(0px)',
            }}
          >
            {/* Logo glow effect */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${color} rounded-full blur-lg md:blur-xl opacity-0 ${isActive ? 'opacity-50' : ''}`}
              animate={isActive ? {
                scale: [1, 1.2, 1],
              } : {}}
              transition={{
                duration: 2,
                repeat: isActive ? Infinity : 0,
              }}
            />
            
            {/* Main logo with quantum spin */}
            <motion.div
              animate={{ 
                rotateY: isActive && !isMobile ? [0, 360] : 0,
                scale: isActive ? [1, 1.1, 1] : 1,
              }}
              transition={{ 
                rotateY: {
                  duration: 2,
                  repeat: (isActive && !isMobile) ? Infinity : 0,
                  ease: "linear",
                },
                scale: {
                  duration: 1,
                  repeat: isActive ? Infinity : 0,
                }
              }}
              className="text-4xl md:text-6xl filter drop-shadow-xl md:drop-shadow-2xl relative z-10"
            >
              <Speech className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </motion.div>
          </motion.div>

          {/* Skill name with 4D text effect */}
          <motion.h3
            className="text-lg md:text-xl font-bold text-center mb-2 md:mb-3"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              transform: isActive ? `translateZ(${layer3Z.get()}px)` : 'translateZ(0px)',
              textShadow: isActive ? `0 0 20px rgba(168,85,247,0.5)` : 'none',
            }}
          >
            <span className={`bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
              {name}
            </span>
          </motion.h3>

          {/* 4D corner accents - scaled for mobile */}
          <motion.div
            className="absolute top-1 md:top-2 left-1 md:left-2 w-4 h-4 md:w-6 md:h-6 border-l-2 border-t-2 border-white/10 rounded-tl-lg md:rounded-tl-xl"
            style={{
              transform: isActive ? `translateZ(${layer2Z.get()}px)` : 'translateZ(0px)',
            }}
          />
          <motion.div
            className="absolute top-1 md:top-2 right-1 md:right-2 w-4 h-4 md:w-6 md:h-6 border-r-2 border-t-2 border-white/10 rounded-tr-lg md:rounded-tr-xl"
            style={{
              transform: isActive ? `translateZ(${layer2Z.get()}px)` : 'translateZ(0px)',
            }}
          />
          <motion.div
            className="absolute bottom-1 md:bottom-2 left-1 md:left-2 w-4 h-4 md:w-6 md:h-6 border-l-2 border-b-2 border-white/10 rounded-bl-lg md:rounded-bl-xl"
            style={{
              transform: isActive ? `translateZ(${layer2Z.get()}px)` : 'translateZ(0px)',
            }}
          />
          <motion.div
            className="absolute bottom-1 md:bottom-2 right-1 md:right-2 w-4 h-4 md:h-6 border-r-2 border-b-2 border-white/10 rounded-br-lg md:rounded-br-xl"
            style={{
              transform: isActive ? `translateZ(${layer2Z.get()}px)` : 'translateZ(0px)',
            }}
          />

          {/* 4D floating particles on hover/touch */}
          {isActive && mousePosition.x > 0 && (
            <>
              {[...Array(isMobile ? 3 : 5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-0.5 h-0.5 bg-gradient-to-r ${color} rounded-full`}
                  initial={{
                    x: mousePosition.x || '50%',
                    y: mousePosition.y || '50%',
                    scale: 0,
                  }}
                  animate={{
                    x: (mousePosition.x || 50) + (Math.random() - 0.5) * (isMobile ? 50 : 100),
                    y: (mousePosition.y || 50) + (Math.random() - 0.5) * (isMobile ? 50 : 100),
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
            borderColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0)',
            boxShadow: isActive ? 'inset 0 0 20px rgba(168,85,247,0.2)' : 'none',
          }}
          style={{
            transform: isActive ? `translateZ(${isMobile ? 5 : 10}px)` : 'translateZ(0px)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// 4D Quantum Filter Button - Optimized for mobile
const QuantumFilterButton = ({ label, isActive, onClick, index }: any) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="relative perspective-1000 w-full md:w-auto"
    >
      <motion.div
        className="relative px-4 md:px-6 py-2 md:py-3 rounded-full font-bold transition-all duration-300 text-sm md:text-base"
        animate={{
          rotateX: (isHovered && !isMobile) ? 10 : 0,
          rotateY: (isHovered && !isMobile) ? 5 : 0,
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
            : 'bg-white/5 backdrop-blur-sm border border-white/10'
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

        {/* Floating particles on hover - simplified for mobile */}
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

export default function Language() {
  const [filter, setFilter] = useState('All')
  const [quantumField, setQuantumField] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setQuantumField(true)
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const skills = [
    { name: 'English', color: 'from-blue-500 to-red-500' },
    { name: 'Hindi', color: 'from-orange-500 to-green-500' },
    { name: 'Kannada', color: 'from-red-500 to-yellow-500' },
    { name: 'Marathi', color: 'from-orange-500 to-green-500' },
  ]

  return (
    <section id="skills" className="py-8 md:py-16 px-3 md:px-4 relative overflow-hidden">
      {/* Quantum background field */}
      <div className="absolute inset-0">
        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-950/30 to-black/50" />
        
        {/* Quantum field particles - reduced for mobile */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(isMobile ? 30 : 100)].map((_, i) => (
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
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Floating energy orbs - simplified for mobile */}
        {[...Array(isMobile ? 2 : 5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full bg-gradient-to-r ${
              ['from-purple-500/5', 'from-pink-500/5', 'from-blue-500/5', 'from-cyan-500/5', 'from-indigo-500/5'][i]
            } to-transparent blur-xl md:blur-3xl`}
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
            }}
            animate={{
              x: [0, isMobile ? 100 : 200, 0],
              y: [0, isMobile ? 100 : 200, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* 4D Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -30 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-10 perspective-2000"
        >
          {/* Main title with 4D effect */}
          <h2 
            className="text-4xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-10 perspective-2000"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
              className="text-3xl md:text-6xl pb-4 md:pb-10 inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            >
              Languages
            </motion.span>
          </h2>
        </motion.div>

        {/* 4D Skills Grid - Responsive grid layout */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 perspective-3000 pb-8 md:pb-12 max-w-7xl mx-auto px-0 md:px-4"
        >
          <AnimatePresence mode="popLayout">
            {skills.map((skill, index) => (
              <SkillCard4D
                key={skill.name}
                name={skill.name}
                color={skill.color}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Quantum energy line */}
        {/* <motion.div
          className="absolute bottom-[-20px] md:bottom-[-40px] left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        /> */}
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
        
        @media (max-width: 768px) {
          .perspective-1000 {
            perspective: 800px;
          }
          .perspective-2000 {
            perspective: 1500px;
          }
          .perspective-3000 {
            perspective: 2000px;
          }
        }
      `}</style>
    </section>
  )
}