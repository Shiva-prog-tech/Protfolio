import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

const Education = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Track mouse position for parallax effects (disable on mobile)
  useEffect(() => {
    if (isMobile) return
    
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  return (
    <section 
      ref={sectionRef}
      id="education" 
      className="py-16 md:py-32 px-4 relative overflow-hidden min-h-screen"
    >
      {/* 4D Quantum Field Background - Simplified for mobile */}
      <div className="absolute inset-0">
        {/* Deep space gradient with dynamic response */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/30 to-black"
          animate={!isMobile ? {
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(168,85,247,0.15) 0%, transparent 50%)`,
          } : {}}
          transition={{ type: "spring", damping: 30 }}
        />

        {/* Quantum particle field - Reduced count for mobile */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(isMobile ? 30 : 100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${
                  i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#ec4899' : '#3b82f6'
                }, transparent)`,
                boxShadow: `0 0 ${isMobile ? '5px' : '10px'} ${
                  i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#ec4899' : '#3b82f6'
                }`,
              }}
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: 0,
              }}
              animate={{
                x: [
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%',
                ],
                y: [
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%',
                  Math.random() * 100 + '%',
                ],
                scale: [0, 1, 0.5, 1, 0],
                opacity: [0, 0.8, 0.4, 0.8, 0],
              }}
              transition={{
                duration: isMobile ? 8 + Math.random() * 10 : 10 + Math.random() * 15,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* 4D rotating quantum rings - Hide on mobile or simplify */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              x: (mousePosition.x - 0.5) * 50,
              y: (mousePosition.y - 0.5) * 50,
            }}
            transition={{
              rotate: {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              },
              x: { type: "spring", damping: 30 },
              y: { type: "spring", damping: 30 },
            }}
          >
            <div className="relative w-[800px] h-[800px]">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: `2px solid ${i % 2 === 0 ? 'rgba(168,85,247,0.1)' : 'rgba(59,130,246,0.1)'}`,
                    margin: i * 50,
                  }}
                  animate={{
                    rotate: [0, i % 2 === 0 ? 360 : -360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 20 + i * 5,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    scale: {
                      duration: 5 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Floating energy orbs - Adjusted for mobile */}
        {[
          { color: 'from-purple-500/20', size: isMobile ? 'w-48 h-48' : 'w-96 h-96', delay: 0 },
          { color: 'from-pink-500/20', size: isMobile ? 'w-40 h-40' : 'w-80 h-80', delay: 2 },
          { color: 'from-blue-500/20', size: isMobile ? 'w-36 h-36' : 'w-72 h-72', delay: 4 },
          { color: 'from-cyan-500/20', size: isMobile ? 'w-32 h-32' : 'w-64 h-64', delay: 6 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className={`absolute ${orb.size} rounded-full bg-gradient-to-r ${orb.color} to-transparent blur-3xl`}
            style={{
              top: `${isMobile ? 10 + i * 15 : 20 + i * 15}%`,
              left: `${isMobile ? 5 + i * 15 : 10 + i * 20}%`,
            }}
            animate={{
              x: isMobile ? [0, 50, 0, -50, 0] : [0, 100, 0, -100, 0],
              y: isMobile ? [0, -50, 0, 50, 0] : [0, -100, 0, 100, 0],
              scale: [1, 1.2, 1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: isMobile ? 15 + i * 3 : 20 + i * 5,
              repeat: Infinity,
              delay: orb.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Ultra-Premium Section Header - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          {/* Main title with responsive sizing */}
          <div className="relative">
            {/* Back glow - Subtle on mobile */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-2xl md:blur-3xl"
              animate={!isMobile ? {
                scale: [1, 1.3, 1],
                rotateX: [0, 10, 0],
                rotateY: [0, 10, 0],
              } : {}}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              style={{ transform: !isMobile ? 'translateZ(-100px)' : 'none' }}
            />

            {/* Main text - Responsive typography */}
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 relative"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2"
              >
               ACADEMIC 
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="block text-3xl sm:text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                & PROFESSIONAL DEVELOPMENT
              </motion.span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Education Timeline - Mobile Optimized */}
        <div className="relative">
          {/* Quantum timeline line - Hidden on mobile */}
          {!isMobile && (
            <div className="absolute left-1/2 top-0 bottom-0 w-1 hidden md:block perspective-2000">
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(168,85,247,0.6)',
                    '0 0 60px rgba(236,72,153,0.6)',
                    '0 0 30px rgba(59,130,246,0.6)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transform: 'translateZ(20px)' }}
              />
              <motion.div
                className="absolute inset-0 bg-white/30 blur-md"
                animate={{
                  y: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 w-2 h-2 rounded-full bg-purple-400"
                  initial={{
                    y: `${i * 10}%`,
                    x: '-50%',
                  }}
                  animate={{
                    y: [`${i * 10}%`, `${i * 10 + 100}%`],
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "linear",
                  }}
                  style={{ transform: 'translateZ(40px)' }}
                />
              ))}
            </div>
          )}

          {/* Education Cards - Mobile Stacked Layout */}
          <div className="space-y-8 md:space-y-24">
            {[
              {
                year: '2019 - 2023',
                title: 'Bachelor of Engineering in Computer Science',
                institution: 'Government Engineering College Ramanagaram',
                description: 'Completed Bachelor of Engineering in Computer Science with a CGPA of 8.2. Gained strong foundation in computer science fundamentals, data structures, algorithms, and software engineering principles.',
                mobileDescription: 'B.E. in Computer Science with 8.2 CGPA. Strong foundation in CS fundamentals, DSA, and software engineering.',
                side: 'left',
                gradient: 'from-blue-500 to-indigo-600',
                degree: 'B.E. Computer Science',
                score: 'CGPA: 8.2',
                location: 'Karnataka, India',
                achievements: [
                  'Data Structures & Algorithms',
                  'Software Engineering',
                  'Database Management',
                  'Computer Networks'
                ],
                icon: '🎓',
                color: 'blue'
              },
              {
                year: '04/2023 - 09/2023',
                title: 'MERN Stack Development',
                institution: 'JSpiders, Basavanagudi',
                description: 'Completed intensive 6-month professional training in MERN Stack Development. Mastered MongoDB, Express.js, React.js, and Node.js through hands-on projects and real-world scenarios.',
                mobileDescription: '6-month intensive MERN stack training. Mastered full-stack development with hands-on projects.',
                side: 'right',
                gradient: 'from-green-500 to-teal-600',
                degree: 'Professional Certification',
                duration: '6 Months',
                location: 'Bengaluru, India',
                achievements: [
                  'Full-stack Development',
                  'RESTful APIs',
                  'Database Design',
                  'Deployment & DevOps'
                ],
                icon: '📚',
                color: 'green'
              }
            ].map((edu, index) => {
              const [isHovered, setIsHovered] = useState(false)
              const cardRef = useRef<HTMLDivElement>(null)

              // Motion values - Disable complex 3D on mobile
              const x = useMotionValue(0)
              const y = useMotionValue(0)
              const z = useMotionValue(0)
              
              const mouseXSpring = useSpring(x, { damping: 20, stiffness: 200, mass: 0.3 })
              const mouseYSpring = useSpring(y, { damping: 20, stiffness: 200, mass: 0.3 })
              const mouseZSpring = useSpring(z, { damping: 25, stiffness: 250, mass: 0.2 })

              // Advanced transforms - Simplified for mobile
              const rotateX = useTransform(mouseYSpring, [-0.8, 0.8], !isMobile ? ["12deg", "-12deg"] : ["0deg", "0deg"])
              const rotateY = useTransform(mouseXSpring, [-0.8, 0.8], !isMobile ? ["-12deg", "12deg"] : ["0deg", "0deg"])
              const rotateZ = useTransform(mouseZSpring, [-0.5, 0.5], !isMobile ? ["-4deg", "4deg"] : ["0deg", "0deg"])
              
              const scale = useTransform(mouseZSpring, [-0.5, 0.5], [0.98, 1.04])
              const translateZ = useTransform(mouseZSpring, [-0.5, 0.5], !isMobile ? [-20, 60] : [0, 0])

              // Layer depths - Disable on mobile
              const layer1Z = useTransform(mouseZSpring, [-0.5, 0.5], !isMobile ? [20, 80] : [0, 0])
              const layer2Z = useTransform(mouseZSpring, [-0.5, 0.5], !isMobile ? [40, 100] : [0, 0])
              const layer3Z = useTransform(mouseZSpring, [-0.5, 0.5], !isMobile ? [60, 120] : [0, 0])
              const layer4Z = useTransform(mouseZSpring, [-0.5, 0.5], !isMobile ? [80, 140] : [0, 0])

              const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                if (isMobile || !cardRef.current) return
                const rect = cardRef.current.getBoundingClientRect()
                const xPct = (e.clientX - rect.left) / rect.width - 0.5
                const yPct = (e.clientY - rect.top) / rect.height - 0.5
                const zPct = Math.sin(xPct * Math.PI) * Math.cos(yPct * Math.PI) * 0.5
                
                x.set(xPct * 1.2)
                y.set(yPct * 1.2)
                z.set(zPct)
              }

              const handleMouseLeave = () => {
                x.set(0)
                y.set(0)
                z.set(0)
                setIsHovered(false)
              }

              return (
                <motion.div
                  key={edu.title}
                  ref={cardRef}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 70,
                    damping: 15,
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => !isMobile && setIsHovered(true)}
                  onMouseLeave={handleMouseLeave}
                  style={!isMobile ? {
                    rotateX,
                    rotateY,
                    rotateZ,
                    scale,
                    translateZ,
                    transformStyle: "preserve-3d",
                  } : {}}
                  className={`relative ${!isMobile ? 'md:w-1/2' : 'w-full'} ${
                    !isMobile && (edu.side === 'right' ? 'md:ml-auto md:pl-16' : 'md:pr-16')
                  }`}
                >
                  {/* Quantum timeline dot - Hidden on mobile */}
                  {!isMobile && (
                    <div className="absolute top-8 hidden md:block" style={{ [edu.side === 'left' ? 'right' : 'left']: '-40px', transform: 'translateZ(100px)' }}>
                      <motion.div 
                        initial={{ scale: 0, rotateY: 360 }}
                        whileInView={{ scale: 1, rotateY: 0 }}
                        transition={{ duration: 1, delay: index * 0.3 + 0.5, type: "spring" }}
                        viewport={{ once: true }}
                        className="relative"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Outer rings */}
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className={`absolute -inset-${i * 3} rounded-full border-2 border-${edu.color}-500/30`}
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.3, 0.8, 0.3],
                              rotateZ: [0, 360],
                            }}
                            transition={{
                              duration: 3 + i,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                            style={{ transform: `translateZ(${10 + i * 10}px)` }}
                          />
                        ))}
                        
                        {/* Main dot */}
                        <div className={`relative w-10 h-10 rounded-full bg-gradient-to-r ${edu.gradient} border-4 border-[#050814] shadow-2xl`}>
                          <motion.div
                            className="absolute inset-0 bg-white/20 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>

                        {/* Energy field */}
                        <motion.div
                          className={`absolute -inset-6 bg-gradient-to-r ${edu.gradient} rounded-full blur-2xl`}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.2, 0.5, 0.2],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          style={{ transform: 'translateZ(-20px)' }}
                        />
                      </motion.div>
                    </div>
                  )}

                  {/* Education Card - Mobile Optimized */}
                  <motion.div 
                    className="relative group"
                    style={!isMobile ? { 
                      transformStyle: "preserve-3d",
                      transform: `translateZ(${isHovered ? 30 : 0}px)`,
                    } : {}}
                  >
                    {/* Quantum field effect - Subtle on mobile */}
                    <motion.div
                      className={`absolute -inset-3 md:-inset-6 bg-gradient-to-r ${edu.gradient} rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-20 md:group-hover:opacity-40 blur-xl md:blur-3xl`}
                      animate={{
                        scale: isHovered ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 3,
                        repeat: isHovered ? Infinity : 0,
                      }}
                    />

                    {/* Main card with responsive padding */}
                    <div className="relative glass-effect p-6 md:p-10 rounded-xl md:rounded-2xl overflow-hidden border border-white/10">
                      {/* 4D floating particles - Reduced for mobile */}
                      <AnimatePresence>
                        {isHovered && !isMobile && (
                          <>
                            {[...Array(10)].map((_, i) => (
                              <motion.div
                                key={i}
                                className={`absolute w-1 h-1 bg-gradient-to-r ${edu.gradient} rounded-full`}
                                initial={{
                                  x: '50%',
                                  y: '50%',
                                  scale: 0,
                                }}
                                animate={{
                                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                                  y: `${50 + (Math.random() - 0.5) * 100}%`,
                                  scale: [0, 1, 0],
                                  opacity: [0, 1, 0],
                                }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{
                                  duration: 2 + Math.random(),
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                }}
                                style={{ transform: `translateZ(${Math.random() * 100}px)` }}
                              />
                            ))}
                          </>
                        )}
                      </AnimatePresence>

                      {/* Gradient orbs - Simplified for mobile */}
                      <motion.div
                        className={`absolute -top-10 md:-top-20 -right-10 md:-right-20 w-24 h-24 md:w-48 md:h-48 bg-gradient-to-r ${edu.gradient} rounded-full opacity-20 md:opacity-30 blur-2xl md:blur-3xl`}
                        animate={!isMobile ? {
                          x: isHovered ? -30 : 0,
                          y: isHovered ? -30 : 0,
                          scale: isHovered ? 1.4 : 1,
                        } : {}}
                        style={!isMobile ? { transform: `translateZ(${layer1Z.get()}px)` } : {}}
                      />
                      
                      <motion.div
                        className={`absolute -bottom-10 md:-bottom-20 -left-10 md:-left-20 w-24 h-24 md:w-48 md:h-48 bg-gradient-to-r ${edu.gradient} rounded-full opacity-20 md:opacity-30 blur-2xl md:blur-3xl`}
                        animate={!isMobile ? {
                          x: isHovered ? 30 : 0,
                          y: isHovered ? 30 : 0,
                          scale: isHovered ? 1.4 : 1,
                        } : {}}
                        style={!isMobile ? { transform: `translateZ(${layer2Z.get()}px)` } : {}}
                      />

                      {/* Floating icon - Responsive size */}
                      <motion.div
                        className="absolute top-2 right-2 md:top-4 md:right-4 text-3xl md:text-5xl opacity-30 group-hover:opacity-60 transition-opacity"
                        animate={!isMobile ? {
                          rotateY: [0, 360],
                          rotateX: [0, 360],
                          scale: [1, 1.2, 1],
                        } : {
                          rotate: [0, 360],
                        }}
                        transition={{
                          rotateY: !isMobile ? {
                            duration: 6,
                            repeat: Infinity,
                            ease: "linear",
                          } : {},
                          rotateX: !isMobile ? {
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                          } : {},
                          rotate: isMobile ? {
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                          } : {},
                          scale: !isMobile ? {
                            duration: 3,
                            repeat: Infinity,
                          } : {},
                        }}
                        style={!isMobile ? { transform: `translateZ(${layer4Z.get()}px)` } : {}}
                      >
                        {edu.icon}
                      </motion.div>

                      {/* Year badge - Mobile optimized */}
                      <motion.div
                        className="inline-block mb-4 md:mb-6"
                        style={!isMobile ? { transform: `translateZ(${layer3Z.get()}px)` } : {}}
                      >
                        <motion.div
                          whileHover={!isMobile ? { scale: 1.1 } : {}}
                          className={`relative px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r ${edu.gradient} rounded-xl md:rounded-2xl overflow-hidden`}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/20"
                            animate={{
                              x: ['-100%', '200%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          <span className="relative flex items-center gap-2 md:gap-3 text-white font-bold text-sm md:text-base">
                            <motion.span
                              className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            {edu.year}
                          </span>
                        </motion.div>
                      </motion.div>

                      {/* Title - Responsive typography */}
                      <motion.h3 
                        className="text-xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3"
                        style={{ 
                          fontFamily: "'Orbitron', sans-serif",
                          ...(!isMobile ? { transform: `translateZ(${layer4Z.get()}px)` } : {}),
                        }}
                      >
                        <span className={`bg-gradient-to-r ${edu.gradient} bg-clip-text text-transparent`}>
                          {edu.title}
                        </span>
                      </motion.h3>

                      {/* Institution - Responsive */}
                      <motion.div 
                        className="text-sm md:text-xl text-cyber-blue mb-2 md:mb-4 font-semibold flex flex-wrap items-center gap-2"
                        style={!isMobile ? { transform: `translateZ(${layer2Z.get()}px)` } : {}}
                      >
                        <span>{edu.institution}</span>
                        <span className="text-xs md:text-sm text-gray-500">{edu.location}</span>
                      </motion.div>

                      {/* Degree details - Responsive grid */}
                      <motion.div 
                        className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6"
                        style={!isMobile ? { transform: `translateZ(${layer1Z.get()}px)` } : {}}
                      >
                        {edu.degree && (
                          <motion.div
                            whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
                            className="px-3 md:px-4 py-1 md:py-2 bg-white/5 backdrop-blur-sm rounded-full text-xs md:text-sm border border-white/10"
                          >
                            {edu.degree}
                          </motion.div>
                        )}
                        {edu.score && (
                          <motion.div
                            whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
                            className="px-3 md:px-4 py-1 md:py-2 bg-white/5 backdrop-blur-sm rounded-full text-xs md:text-sm border border-white/10"
                          >
                            {edu.score}
                          </motion.div>
                        )}
                        {edu.duration && (
                          <motion.div
                            whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
                            className="px-3 md:px-4 py-1 md:py-2 bg-white/5 backdrop-blur-sm rounded-full text-xs md:text-sm border border-white/10"
                          >
                            {edu.duration}
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Description - Mobile optimized with shorter text */}
                      <motion.p 
                        className="text-sm md:text-base text-gray-400 mb-4 md:mb-8 leading-relaxed"
                        style={!isMobile ? { transform: `translateZ(${layer2Z.get()}px)` } : {}}
                      >
                        {isMobile ? edu.mobileDescription : edu.description}
                      </motion.p>

                      {/* Achievements grid - Responsive */}
                      <motion.div 
                        className="grid grid-cols-2 gap-2 md:gap-4"
                        style={!isMobile ? { transform: `translateZ(${layer3Z.get()}px)` } : {}}
                      >
                        {edu.achievements.map((achievement, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={!isMobile ? { scale: 1.05, x: 5 } : {}}
                            className="flex items-center gap-1 md:gap-2 group/achievement"
                            style={!isMobile ? { transform: `translateZ(${10 + i * 5}px)` } : {}}
                          >
                            <motion.div
                              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r ${edu.gradient}`}
                              animate={{
                                scale: [1, 1.5, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                            <span className="text-xs md:text-sm text-gray-300 group-hover/achievement:text-white transition-colors">
                              {achievement}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Corner accents - Simplified on mobile */}
                      {!isMobile && ['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
                        <motion.div
                          key={i}
                          className={`absolute ${pos} w-8 h-8 md:w-16 md:h-16 border border-white/10 md:border-2 rounded-lg md:rounded-2xl`}
                          style={{
                            borderTopColor: i < 2 ? 'rgba(255,255,255,0.2)' : 'transparent',
                            borderBottomColor: i >= 2 ? 'rgba(255,255,255,0.2)' : 'transparent',
                            borderLeftColor: i % 2 === 0 ? 'rgba(255,255,255,0.2)' : 'transparent',
                            borderRightColor: i % 2 === 1 ? 'rgba(255,255,255,0.2)' : 'transparent',
                            transform: `translateZ(${layer2Z.get()}px)`,
                          }}
                          animate={{
                            scale: isHovered ? [1, 1.1, 1] : 1,
                          }}
                          transition={{
                            duration: 2,
                            repeat: isHovered ? Infinity : 0,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
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
        .perspective-4000 {
          perspective: 4000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        @media (max-width: 768px) {
          .glass-effect {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
          }
        }
      `}</style>
    </section>
  )
}

export default Education