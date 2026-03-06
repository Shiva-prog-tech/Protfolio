'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

// Comprehensive AI knowledge base from resume
const knowledgeBase: { [key: string]: string } = {
  // Personal Information
  'name|who are you|your name': 'I am Shivaprasad Jokare, a Frontend Developer based in Bangalore, India. You can reach me at sshivaprasad5951@gmail.com or 📞 +91 8105471840.',
  
  'contact|email|phone|reach|linkedin': 'You can contact me through:\n📧 Email: sshivaprasad5951@gmail.com\n📞 Phone: +91 8105471840\n💼 LinkedIn: linkedin.com/in/shivaprasad-jokare\n🐙 GitHub: github.com/Shiva-prog-tech',
  
  // Professional Summary
  'summary|profile|about|overview': 'I am a results-driven Frontend Developer with 2+ years of experience architecting scalable, high-performance web applications using React, Next.js, and TypeScript. I have a proven track record of elevating search rankings by 27+ points, slashing page load times by 35-40%, and increasing user engagement by 25-30%. I have deep expertise in SSR/SSG, RESTful API integration, Redux Toolkit, and Core Web Vitals optimization.',
  
  // Skills - Frontend
  'skills|technologies|tech stack|tools': 'My technical skills include:\n\n🎨 Frontend: React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Material UI, SCSS\n\n🔌 State & APIs: Redux Toolkit, Context API, React Router, RESTful APIs, Axios, Real-time Data APIs\n\n⚡ Performance & SEO: SSR, SSG, Code Splitting, Lazy Loading, Core Web Vitals, Lighthouse Auditing\n\n🛠️ Tools & Testing: Git, GitHub, CI/CD Pipelines, Webpack, Vite, Jest, React Testing Library',
  
  'react|nextjs|frontend|ui': 'I specialize in React.js and Next.js development. I have deep expertise in:\n• React Hooks and Custom Hooks\n• Server-Side Rendering (SSR)\n• Static Site Generation (SSG)\n• Incremental Static Regeneration (ISR)\n• TypeScript integration\n• Modern UI libraries like Tailwind CSS and Material UI',
  
  'state management|redux|context': 'I work with multiple state management solutions:\n• Redux Toolkit for complex global state\n• Context API for simpler state needs\n• Zustand for lightweight state management\nI also use React Router for navigation and routing.',
  
  'api|backend integration|rest|graphql': 'I specialize in API integration:\n• RESTful APIs with Axios\n• Real-time data synchronization\n• JWT authentication\n• API caching strategies\n• Efficient data-fetching patterns',
  
  'performance|optimization|lighthouse|cwv': 'I focus heavily on performance optimization with proven results:\n• Improved search rankings by 27+ points\n• Reduced page load times by 35-40%\n• Increased user engagement by 25-30%\n• Consistent 90+ Lighthouse scores\nTechniques: Code splitting, lazy loading, image optimization, SSR/SSG, Core Web Vitals optimization',
  
  'testing|jest|rtl': 'I have experience with testing using:\n• Jest for unit testing\n• React Testing Library for component testing\n• Following testing best practices\n• Writing maintainable, testable code',
  
  // Work Experience
  'experience|work|job|career|globusssoft': 'I work at Globusssoft Technologies in Bangalore as a Frontend Developer (React.js & Next.js) from Sep 2023 to Jan 2026 (2+ years). My key achievements:\n\n🚀 Improved search rankings by 27 points through SSR/SSG implementation\n📈 Increased user engagement by 25% with scalable React/Next.js applications\n⚡ Reduced development time by 30% with reusable component libraries\n💨 Enhanced app performance by 40% through optimized API integration\n🎯 Accelerated page load times by 35% with code splitting and lazy loading\n✅ Maintained 90+ Lighthouse scores with Core Web Vitals compliance',
  
  // Projects - Main entry
  'Tell me about projects|projects|portfolio|work examples|what projects': 'I have worked on three major projects:\n\n✈️ Travls.io - Flight & Hotel Booking Platform (2025-2026)\n🤖 AdsGPT - AI-Powered Advertising Platform (2024-2025)\n🔗 PowerDAO - Web3 Decentralized App Platform (2023-2024)\n\nWhich project would you like to know more about? You can ask about:\n• Travls.io (flight/hotel booking)\n• AdsGPT (AI advertising platform)\n• PowerDAO (Web3 dApp platform)',
  
  // Travls.io Project - Multiple keyword variations
  'travls|travel booking|flight|hotel|travls.io|travel platform': `✈️ **Travls.io - Flight & Hotel Booking Platform** (2025-2026)

📊 **Key Achievements:**
• Boosted organic search traffic by 30% with Next.js SSR migration
• Reduced user drop-off by 25% with seamless multistep booking flows
• Increased conversions by 15% through optimized payment workflows
• Improved load performance by 40%, reducing Time-to-Interactive by 2 seconds
• Raised user engagement by 12% through performance optimization
• Reduced code complexity by 30% with Redux Toolkit architecture

🛠️ **Tech Stack:** Next.js, TypeScript, Tailwind CSS, Redux Toolkit, REST APIs

💡 **Key Features:**
• Server-side rendering for better SEO
• Multistep booking and payment workflows
• Real-time pricing integration
• Responsive design for all devices
• Optimized performance metrics`,

  // AdsGPT Project - Multiple keyword variations
  'adsgpt|advertising|ai platform|ads|gpt|adsgpt.io': `🤖 **AdsGPT - AI-Powered Advertising Platform** (2024-2025)

📊 **Key Achievements:**
• Achieved 30% uplift in user engagement with responsive dashboards
• Improved application performance by 40% with lazy loading
• Reduced production bugs by 20% with optimized Redux state management
• Enabled 15% increase in data-driven decisions through real-time APIs

🛠️ **Tech Stack:** React.js, Redux, Tailwind CSS, REST APIs, Real-time Data Visualization

💡 **Key Features:**
• Interactive campaign builder
• Real-time analytics dashboard
• Responsive data visualizations
• Optimized component loading
• Global state management with Redux`,

  // PowerDAO Project - Multiple keyword variations
  'powerdao|web3|blockchain|dao|decentralized|power dao': `🔗 **PowerDAO - Web3 Decentralized App Platform** (2023-2024)

📊 **Key Achievements:**
• Achieved 30% surge in user engagement with scalable Web3 interfaces
• Integrated 5+ blockchain and Web3 data sources for real-time sync
• Reduced development time by 25% with 20+ reusable UI components
• Decreased user complaints by 40% with streamlined navigation

🛠️ **Tech Stack:** React.js, Web3 libraries, Tailwind CSS, Blockchain APIs

💡 **Key Features:**
• Decentralized application interfaces
• Real-time blockchain data synchronization
• Reusable component library
• Browser-style dApp experience
• Multi-wallet integration`,

  // Education
  'education|degree|college|university|bachelor': 'I completed my Bachelor of Engineering in Computer Science from Government Engineering College, Ramanagaram (2019-2023) with a CGPA of 3.2/4.0.',
  
  // Certifications
  'certifications|certified|courses': 'I hold multiple certifications:\n• Certified MERN Stack Developer\n• Advanced React — Certified Developer (Udemy)\n• Advanced JavaScript — Certified Developer (Udemy)\n• Java Programming — Certified Developer (Udemy)',
  
  // Languages
  'languages|speak|communication': 'I am proficient in multiple languages:\n• English (Professional)\n• Hindi (Fluent)\n• Kannada (Native)\n• Marathi (Conversational)',
  
  // Location & Availability
  'location|bangalore|based|relocate': 'I am based in Bangalore, India. I am open to remote opportunities and can consider relocation for the right position.',
  
  'availability|notice period|start|join': 'I am currently employed at Globusssoft Technologies but open to new opportunities. I can discuss notice periods and start dates based on the opportunity.',
  
  'remote|work from home|wfh': 'Yes, I am open to remote work opportunities. I have experience working in distributed teams and using collaboration tools.',
  
  // Why Hire
  'why hire|hire me|strengths|what makes': 'Here\'s why you should hire me:\n\n🏆 Proven Track Record:\n• 2+ years production experience with React/Next.js\n• 27+ point improvement in search rankings\n• 35-40% faster page loads\n• 25-30% increase in user engagement\n\n💡 Technical Expertise:\n• Modern React/Next.js with TypeScript\n• Performance optimization & Core Web Vitals\n• Scalable component architecture\n• API integration & state management\n\n🤝 Soft Skills:\n• Agile/Scrum environment experience\n• Cross-functional collaboration\n• Clean, maintainable code\n• Continuous learning mindset',
  
  'achievements|accomplishments|results': 'My key achievements include:\n📊 27+ point improvement in search rankings\n⚡ 35-40% reduction in page load times\n📈 25-30% increase in user engagement\n🎯 90+ consistent Lighthouse scores\n🚀 30% reduction in development time with reusable components\n💪 40% performance improvement through optimization',
  
  // Salary & Compensation
  'salary|compensation|rate|pay': 'I am open to discussing competitive compensation based on the role, responsibilities, and location. I value opportunities that recognize frontend expertise and modern React/Next.js development skills.',
  
  // Learning & Growth
  'learning|growth|improve|future': 'I am passionate about continuous learning and staying updated with latest frontend technologies. I actively:\n• Follow React and Next.js updates\n• Explore advanced performance optimization techniques\n• Study modern web development trends\n• Work on side projects to experiment with new technologies',
  
  // Work Environment
  'agile|scrum|team|collaboration': 'I have experience working in Agile/Scrum environments, collaborating with cross-functional teams including designers, backend developers, and product managers. I participate in sprint planning, daily standups, and code reviews.',
  
  // Default responses
  'default': 'That\'s a great question! While I don\'t have a specific answer for that, I can tell you about my:\n• Experience and skills\n• Projects (Travls.io, AdsGPT, PowerDAO)\n• Technical expertise\n• Education and certifications\n• Contact information\n\nWhat would you like to know more about?',
  
  'greeting|hello|hi|hey': 'Hello! 👋 I\'m the AI assistant for Shivaprasad Jokare. I can answer questions about his:\n• Professional experience\n• Technical skills\n• Projects\n• Education & certifications\n• Contact information\n\nWhat would you like to know?',
}

const quickQuestions = [
  'What projects have you worked on?',
  'Tell me about Travls.io',
  'About AdsGPT project',
  'About PowerDAO project',
  'What are your main skills?',
  'What is your experience?',
  'Your key achievements?',
  'How to contact you?',
]

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '👋 Hi there! I\'m an AI assistant for Shivaprasad Jokare. I have access to his complete resume and can answer any questions about his experience, skills, projects, education, and more! Feel free to ask me anything.',
      isBot: true,
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const findAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase()
    
    // Check for greetings first
    if (lowerQuestion.match(/^(hello|hi|hey|greetings)/i)) {
      return knowledgeBase['greeting|hello|hi|hey']
    }
    
    // Specific project questions - Direct matching for better accuracy
    if (lowerQuestion.includes('travls') || 
        (lowerQuestion.includes('travel') && lowerQuestion.includes('booking')) ||
        (lowerQuestion.includes('flight') && lowerQuestion.includes('hotel'))) {
      return knowledgeBase['travls|travel booking|flight|hotel|travls.io|travel platform']
    }
    
    if (lowerQuestion.includes('adsgpt') || 
        (lowerQuestion.includes('ad') && lowerQuestion.includes('platform')) ||
        (lowerQuestion.includes('ai') && lowerQuestion.includes('advertising'))) {
      return knowledgeBase['adsgpt|advertising|ai platform|ads|gpt|adsgpt.io']
    }
    
    if (lowerQuestion.includes('powerdao') || 
        lowerQuestion.includes('power dao') ||
        lowerQuestion.includes('web3') ||
        lowerQuestion.includes('blockchain') ||
        lowerQuestion.includes('dao') ||
        lowerQuestion.includes('decentralized')) {
      return knowledgeBase['powerdao|web3|blockchain|dao|decentralized|power dao']
    }
    
    // Search through knowledge base
    for (const [keywords, answer] of Object.entries(knowledgeBase)) {
      const keywordList = keywords.split('|')
      if (keywordList.some(keyword => lowerQuestion.includes(keyword))) {
        return answer
      }
    }
    
    return knowledgeBase['default']
  }

  const handleSend = (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking and respond
    setTimeout(() => {
      const answer = findAnswer(messageText)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: answer,
        isBot: true,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleQuickQuestion = (question: string) => {
    handleSend(question)
    if (isMobile) {
      // Keep keyboard from blocking view on mobile
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <>
      {/* Floating Chat Button - Responsive positioning */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full shadow-2xl z-50 flex items-center justify-center text-2xl sm:text-3xl hover:shadow-cyber-blue/50 transition-all"
      >
        {isOpen ? '✕' : '🤖'}
      </motion.button>

      {/* Notification Badge - Responsive */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-16 right-4 sm:bottom-20 sm:right-8 px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full text-[10px] sm:text-xs font-bold z-50 shadow-lg"
        >
          📄 Ask me!
        </motion.div>
      )}

      {/* Chat Window - Fully Responsive */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`fixed z-50 glass-effect rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/20
              ${isMobile 
                ? 'inset-4 top-auto bottom-20 h-[70vh] w-auto' // Mobile full width with margins
                : 'bottom-24 right-8 w-96 h-[600px]' // Desktop fixed size
              }`}
          >
            {/* Header - Responsive padding */}
            <div className="bg-gradient-to-r from-cyber-blue to-cyber-purple p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-xl sm:text-2xl">
                  🤖
                </div>
                <div>
                  <div className="font-bold text-white text-sm sm:text-base">Shiva's AI Assistant</div>
                  <div className="text-[10px] sm:text-xs text-white/80 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Resume Expert
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 sm:w-8 sm:h-8 hover:bg-white/20 rounded-full transition-colors text-sm sm:text-base"
              >
                ✕
              </button>
            </div>

            {/* Quick Questions - Scrollable on mobile */}
            <div className="p-2 sm:p-3 border-b border-white/10 bg-black/20">
              <div className="text-[10px] sm:text-xs text-gray-400 mb-1 sm:mb-2">Quick questions:</div>
              <div className="flex flex-wrap gap-1 sm:gap-2 max-h-16 sm:max-h-24 overflow-y-auto">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickQuestion(q)}
                    className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs bg-white/10 hover:bg-white/20 rounded-full transition-colors whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages - Responsive spacing */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-xl sm:rounded-2xl ${
                      message.isBot
                        ? 'bg-white/10 text-white rounded-tl-none'
                        : 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white rounded-tr-none'
                    }`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    <div className="text-[8px] sm:text-xs opacity-50 mt-0.5 sm:mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 p-2 sm:p-3 rounded-xl sm:rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyber-blue rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyber-purple rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyber-pink rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input - Responsive with keyboard handling */}
            <div className="p-2 sm:p-4 border-t border-white/10 bg-black/20">
              <div className="flex gap-1 sm:gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isMobile ? "Ask me..." : "Ask about experience, skills, projects..."}
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:border-cyber-blue transition-colors"
                />
                <motion.button
                  onClick={() => handleSend()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={!input.trim()}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  ➤
                </motion.button>
              </div>
              <div className="text-[8px] sm:text-xs text-gray-500 text-center mt-1 sm:mt-2">
                📋 Ask me anything from Shiva's resume
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}