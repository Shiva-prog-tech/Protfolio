'use client'

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { X, ExternalLink, RefreshCw, Shield, Maximize2, Minimize2, Smartphone, Monitor } from 'lucide-react'

interface Project {
  title: string
  role: string
  gradient: string
  tags: string[]
  description?: string
}

interface Premium3DModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project
  url: string
}

export default function Premium3DModal({ isOpen, onClose, project, url }: Premium3DModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [isLandscape, setIsLandscape] = useState(false)
  const [iframeError, setIframeError] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop')
  const [show3DLoader, setShow3DLoader] = useState(false)
  const [showModal, setShowModal] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], isMobile ? ["1deg", "-1deg"] : ["3deg", "-3deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], isMobile ? ["-1deg", "1deg"] : ["-3deg", "3deg"])

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setIsLandscape(window.innerWidth > window.innerHeight && window.innerWidth < 1024)
    }
    
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // Sequence: First show loader, then show modal after 2.5 seconds
      setShow3DLoader(true)
      setShowModal(false)
      setIframeLoaded(false)
      setIframeError(false)
      
      // Show loader for 2.5 seconds
      const loaderTimer = setTimeout(() => {
        setShow3DLoader(false)
        setShowModal(true)
      }, 2500)
      
      return () => {
        clearTimeout(loaderTimer)
        document.body.style.overflow = 'unset'
      }
    } else {
      document.body.style.overflow = 'unset'
      setShow3DLoader(false)
      setShowModal(false)
    }
  }, [isOpen])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current || isMobile || fullscreen) return
    const rect = modalRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
    setRotation({ x: x * 5, y: y * 5 })
  }

  const handleMouseLeave = () => {
    if (isMobile || fullscreen) return
    mouseX.set(0)
    mouseY.set(0)
    setRotation({ x: 0, y: 0 })
  }

  const handleIframeError = () => {
    setIframeError(true)
    setIframeLoaded(true)
  }

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen)
  }

  const toggleDeviceMode = () => {
    setDeviceMode(prev => prev === 'desktop' ? 'mobile' : 'desktop')
  }

  const reloadIframe = () => {
    setIframeLoaded(false)
    setIframeError(false)
    const iframe = document.querySelector('iframe')
    if (iframe) {
      iframe.src = iframe.src
    }
  }

  // Responsive sizing classes
  const getModalSize = () => {
    if (isMobile) {
      return 'w-full h-full rounded-0'
    }
    if (fullscreen) {
      return 'w-[95vw] h-[95vh] rounded-3xl'
    }
    return 'w-[90vw] max-w-7xl h-[85vh] rounded-3xl'
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.98) 0%, rgba(0,0,0,1) 100%)',
            backdropFilter: 'blur(20px)',
          }}
          onClick={onClose}
        >
          {/* Background particles - always visible */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(isMobile ? 20 : 50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 md:w-1 h-0.5 md:h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                  scale: 0,
                }}
                animate={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                  scale: [0, 1, 0],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 8 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Rotating rings - always visible */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="relative w-[300px] md:w-[800px] h-[300px] md:h-[800px]">
              <div className="absolute inset-0 border-2 border-purple-500/20 rounded-full" />
              <div className="absolute inset-[40px] md:inset-[100px] border-2 border-pink-500/20 rounded-full" />
              <div className="absolute inset-[80px] md:inset-[200px] border-2 border-blue-500/20 rounded-full" />
            </div>
          </motion.div>

          {/* 3D Loading Effect - Shows first */}
          <AnimatePresence mode="wait">
            {show3DLoader && (
              <motion.div
                key="loader"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative perspective-1000">
                  {/* 3D Cube Loader */}
                  <motion.div
                    className="relative w-24 h-24 md:w-32 md:h-32"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{
                      rotateX: [0, 360],
                      rotateY: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {/* Cube faces */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-30 rounded-lg`} style={{ transform: 'translateZ(40px)' }} />
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-30 rounded-lg`} style={{ transform: 'translateZ(-40px)' }} />
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-30 rounded-lg`} style={{ transform: 'rotateY(90deg) translateZ(40px)' }} />
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-30 rounded-lg`} style={{ transform: 'rotateY(90deg) translateZ(-40px)' }} />
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-30 rounded-lg`} style={{ transform: 'rotateX(90deg) translateZ(40px)' }} />
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-30 rounded-lg`} style={{ transform: 'rotateX(90deg) translateZ(-40px)' }} />
                    
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-xl opacity-50" />
                  </motion.div>

                  {/* Orbiting rings */}
                  <motion.div
                    className="absolute -inset-8 md:-inset-12"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute inset-0 border-2 border-purple-500/30 rounded-full" />
                  </motion.div>

                  <motion.div
                    className="absolute -inset-12 md:-inset-16"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute inset-0 border-2 border-pink-500/30 rounded-full" />
                  </motion.div>

                  {/* Loading text */}
                  <motion.div
                    className="absolute -bottom-12 md:-bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                    animate={{
                      textShadow: [
                        '0 0 10px rgba(168,85,247,0.5)',
                        '0 0 20px rgba(236,72,153,0.5)',
                        '0 0 10px rgba(168,85,247,0.5)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-white font-bold text-sm md:text-lg tracking-widest">
                      PREPARING EXPERIENCE
                    </span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-1"
                    >
                      ...
                    </motion.span>
                  </motion.div>

                  {/* Floating particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-gradient-to-r ${project.gradient}`}
                      animate={{
                        x: [0, Math.cos(i * 45 * Math.PI / 180) * 60, 0],
                        y: [0, Math.sin(i * 45 * Math.PI / 180) * 60, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Main Modal - Shows after loader */}
            {showModal && (
              <motion.div
                key="modal"
                ref={modalRef}
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    damping: 25,
                    stiffness: 200,
                    duration: 0.6
                  }
                }}
                exit={{ 
                  scale: 0.9, 
                  opacity: 0, 
                  y: 50,
                  transition: { duration: 0.3 }
                }}
                style={{
                  rotateX: !fullscreen ? rotateX : 0,
                  rotateY: !fullscreen ? rotateY : 0,
                  transformStyle: "preserve-3d",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => e.stopPropagation()}
                className={`relative ${getModalSize()} overflow-hidden shadow-2xl bg-gray-900/95 backdrop-blur-xl border border-white/10`}
              >
                {/* Modal content (same as before) */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-black" />
                
                {/* Gradient orbs */}
                <motion.div
                  className={`absolute -top-20 md:-top-40 -right-20 md:-right-40 w-48 md:w-80 h-48 md:h-80 bg-gradient-to-r ${project.gradient} rounded-full opacity-20 blur-2xl md:blur-3xl`}
                  animate={{
                    x: rotation.x * 10,
                    y: rotation.y * 10,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    scale: { duration: 4, repeat: Infinity }
                  }}
                />
                
                <motion.div
                  className={`absolute -bottom-20 md:-bottom-40 -left-20 md:-left-40 w-48 md:w-80 h-48 md:h-80 bg-gradient-to-r ${project.gradient} rounded-full opacity-20 blur-2xl md:blur-3xl`}
                  animate={{
                    x: rotation.x * -10,
                    y: rotation.y * -10,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    scale: { duration: 4, repeat: Infinity, delay: 2 }
                  }}
                />

                {/* Header with controls */}
                <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-2 md:p-4 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">
                  {/* Left side - Project info */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 md:gap-4"
                  >
                    <div className={`px-2 md:px-4 py-1 md:py-2 bg-gradient-to-r ${project.gradient} rounded-lg md:rounded-xl shadow-lg`}>
                      <span className="text-xs md:text-sm font-bold text-white flex items-center gap-1 md:gap-2">
                        <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-white rounded-full animate-pulse" />
                        <span className="truncate max-w-[120px] md:max-w-none">{project.title}</span>
                      </span>
                    </div>
                    
                    {/* Device toggle */}
                    {!isMobile && (
                      <button
                        onClick={toggleDeviceMode}
                        className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      >
                        {deviceMode === 'desktop' ? (
                          <Smartphone className="w-4 h-4" />
                        ) : (
                          <Monitor className="w-4 h-4" />
                        )}
                        <span className="text-xs">{deviceMode === 'desktop' ? 'Mobile view' : 'Desktop view'}</span>
                      </button>
                    )}
                  </motion.div>

                  {/* Right side - Controls */}
                  <div className="flex items-center gap-1 md:gap-2">
                    {/* Refresh button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={reloadIframe}
                      className="w-8 h-8 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
                    >
                      <RefreshCw className="w-3 h-3 md:w-4 md:h-4" />
                    </motion.button>

                    {/* Fullscreen toggle */}
                    {!isMobile && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleFullscreen}
                        className="w-8 h-8 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
                      >
                        {fullscreen ? (
                          <Minimize2 className="w-3 h-3 md:w-4 md:h-4" />
                        ) : (
                          <Maximize2 className="w-3 h-3 md:w-4 md:h-4" />
                        )}
                      </motion.button>
                    )}

                    {/* External link */}
                    <motion.a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 md:w-10 md:h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
                    >
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                    </motion.a>

                    {/* Close button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="w-8 h-8 md:w-10 md:h-10 bg-red-500/20 hover:bg-red-500/40 rounded-lg flex items-center justify-center backdrop-blur-sm ml-1 md:ml-2"
                    >
                      <X className="w-3 h-3 md:w-4 md:h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Loading indicator for iframe */}
                <AnimatePresence>
                  {!iframeLoaded && !iframeError && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-xl"
                    >
                      <div className="relative">
                        <motion.div
                          className="w-12 h-12 md:w-16 md:h-16 border-3 border-purple-500/30 border-t-purple-500 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <span className="text-white text-xs md:text-sm font-bold">Loading</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error state */}
                <AnimatePresence>
                  {iframeError && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-40 flex items-center justify-center bg-black/90 backdrop-blur-xl"
                    >
                      <div className="text-center p-4 md:p-8">
                        <Shield className="w-12 h-12 md:w-16 md:h-16 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2">Unable to load preview</h3>
                        <p className="text-sm text-gray-400 mb-4">The website might have security restrictions</p>
                        <div className="flex gap-3 justify-center">
                          <motion.a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-sm font-medium"
                          >
                            Open in new tab
                          </motion.a>
                          <motion.button
                            onClick={reloadIframe}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-white/10 rounded-lg text-white text-sm font-medium"
                          >
                            Try again
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Browser window */}
                <div className={`relative w-full h-full pt-12 md:pt-16 ${deviceMode === 'mobile' && !isMobile ? 'max-w-[375px] mx-auto border-x-4 border-gray-800' : ''}`}>
                  {/* Browser chrome */}
                  <div className="absolute top-0 left-0 right-0 h-12 md:h-16 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center px-3 md:px-4 border-b border-white/10">
                    {/* Window controls */}
                    <div className="flex gap-1.5 md:gap-2 mr-3 md:mr-4">
                      <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-red-500/80" />
                      <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-green-500/80" />
                    </div>

                    {/* URL bar */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full px-3 md:px-4 py-1 md:py-1.5 flex items-center gap-2 w-full max-w-md border border-white/10">
                        <span className="text-green-400 text-xs">🔒</span>
                        <span className="text-gray-300 text-xs md:text-sm truncate">{url}</span>
                      </div>
                    </div>

                    {/* Status indicator */}
                    <div className="ml-3 md:ml-4 flex items-center gap-1 md:gap-2">
                      <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-500 text-xs hidden sm:inline">Live</span>
                    </div>
                  </div>

                  {/* Iframe */}
                  <iframe
                    src={url}
                    className="w-full h-full bg-white"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    loading="lazy"
                    onLoad={() => setIframeLoaded(true)}
                    onError={handleIframeError}
                    title={`${project.title} preview`}
                  />
                </div>

                {/* Bottom bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-0 left-0 right-0 z-50 p-2 md:p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent backdrop-blur-sm"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {project.tags.slice(0, isMobile ? 3 : 6).map((tag: string, i: number) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                          className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs bg-white/10 rounded-full text-gray-300"
                        >
                          {tag}
                        </motion.span>
                      ))}
                      {project.tags.length > (isMobile ? 3 : 6) && (
                        <span className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs bg-white/5 rounded-full text-gray-500">
                          +{project.tags.length - (isMobile ? 3 : 6)}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    {project.description && !isMobile && (
                      <p className="text-xs text-gray-400 max-w-md truncate">{project.description}</p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}