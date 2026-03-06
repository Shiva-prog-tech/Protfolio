import { motion } from 'framer-motion'

export default function Contact(){
    return (
        <section id="contact" className="py-16 md:py-24 px-4 relative overflow-hidden">
  {/* Animated Background Elements */}
  <div className="absolute top-0 left-0 w-full h-full">
    <div className="absolute top-10 right-10 w-48 md:w-96 h-48 md:h-96 bg-cyber-blue/20 rounded-full blur-3xl animate-pulse-slow" />
    <div className="absolute bottom-10 left-10 w-48 md:w-96 h-48 md:h-96 bg-cyber-purple/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-80 h-64 md:h-80 bg-cyber-pink/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
  </div>

  {/* Grid Pattern Overlay */}
  <div className="absolute inset-0 "></div>

  <div className="container mx-auto max-w-5xl relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className="text-center"
    >
      {/* Badge - Hidden on mobile, visible on tablet/desktop */}
      {/* <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        viewport={{ once: true }}
        className="hidden sm:inline-block mb-4"
      >
        <div className="px-4 md:px-6 py-2 md:py-3 glass-effect rounded-full border border-cyber-pink/30 hover:border-cyber-pink/60 transition-all">
          <span className="text-sm md:text-base text-cyber-pink font-bold tracking-wider">GET IN TOUCH</span>
        </div>
      </motion.div> */}

      {/* Main Heading */}
      <h2 
        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6 px-2"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        <span className="text-gradient block sm:inline">LET'S BUILD</span>
        <br className="hidden sm:block" />
        <span className="text-gradient block sm:inline"> SOMETHING AMAZING</span>
      </h2>

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
        I'm currently available for full-time opportunities, and collaborations.
      </p>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4 sm:px-0">
        {[
          { 
            icon: '📧', 
            title: 'Email', 
            value: 'sshivaprasad5951@gmail.com', 
            href: 'mailto:sshivaprasad5951@gmail.com', 
            gradient: 'from-cyber-blue to-cyan-600',
            shortValue: 'Email me'
          },
          { 
            icon: '📱', 
            title: 'Phone', 
            value: '+918105471840', 
            href: 'tel:+918105471840', 
            gradient: 'from-cyber-purple to-purple-600',
            shortValue: 'Call me'
          },
          { 
            icon: '📍', 
            title: 'Location', 
            value: 'Koramangala, Bengaluru', 
            href: 'https://maps.google.com/?q=Koramangala,Bengaluru', 
            gradient: 'from-cyber-pink to-pink-600',
            shortValue: 'View on map'
          },
        ].map((contact, index) => (
          <motion.a
            key={contact.title}
            href={contact.href}
            target={contact.title === 'Location' ? '_blank' : '_self'}
            rel={contact.title === 'Location' ? 'noopener noreferrer' : ''}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ 
              scale: 1.03, 
              y: -5,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            className="glass-effect p-4 md:p-6 rounded-xl group relative overflow-hidden cursor-pointer"
          >
            {/* Animated Gradient Border */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${contact.gradient} rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 group-hover:duration-300`}></div>
            
            {/* Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${contact.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
            
            {/* Content */}
            <div className="relative">
              {/* Icon with animation */}
              <motion.div 
                className="text-3xl md:text-4xl mb-2 md:mb-3"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {contact.icon}
              </motion.div>
              
              {/* Title */}
              <h3 className={`text-lg md:text-xl font-bold mb-1 md:mb-2 bg-gradient-to-r ${contact.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform`}>
                {contact.title}
              </h3>
              
              {/* Value - Hide on mobile, show on larger screens */}
              <p className="text-xs md:text-sm text-gray-400 hidden md:block truncate max-w-[200px] mx-auto">
                {contact.value}
              </p>
              
              {/* Short Value - Show on mobile */}
              <p className="text-sm text-gray-400 md:hidden">
                {contact.shortValue==='Call me'?contact.value:contact.shortValue}
              </p>
            </div>

            {/* Hover Effect Line */}
            <motion.div 
              className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${contact.gradient}`}
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        ))}
      </div>

      {/* Social Links - Optional (uncomment if needed) */}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="flex justify-center gap-3 md:gap-4 flex-wrap mb-6 md:mb-8"
      >
        {[
          { name: 'GitHub', gradient: 'from-gray-700 to-gray-900', icon: '💻' },
          { name: 'LinkedIn', gradient: 'from-blue-600 to-blue-800', icon: '🔗' },
          { name: 'Twitter', gradient: 'from-cyan-500 to-blue-600', icon: '🐦' },
          { name: 'Stack Overflow', gradient: 'from-orange-500 to-orange-700', icon: '⚡' }
        ].map((social, index) => (
          <motion.a
            key={social.name}
            href="#"
            whileHover={{ scale: 1.15, rotate: 5, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 md:w-14 md:h-14 flex flex-col items-center justify-center rounded-xl bg-gradient-to-r ${social.gradient} font-bold text-white shadow-lg hover:shadow-2xl transition-all group relative overflow-hidden`}
          >
            <span className="text-lg md:text-xl group-hover:scale-110 transition-transform">{social.icon}</span>
            <span className="text-[8px] md:text-[10px] mt-0.5 opacity-80">{social.name}</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </motion.a>
        ))}
      </motion.div> */}

      {/* CTA Button */}
      <motion.a
        href="mailto:sshivaprasad5951@gmail.com"
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 20px 40px -15px rgba(139, 92, 246, 0.5)"
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="relative inline-block px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink rounded-full font-bold text-sm md:text-lg text-white shadow-2xl hover:shadow-cyber-purple/30 transition-all overflow-hidden group"
      >
        {/* Button Glow Effect */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        
        {/* Button Content */}
        <span className="relative z-10 flex items-center gap-2">
          <span>Send Me a Message</span>
          <svg 
            className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </motion.a>

      {/* Bottom Decorative Line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="w-24 md:w-32 h-1 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink mx-auto mt-8 md:mt-12 rounded-full"
      />
    </motion.div>
  </div>
</section>
    )
}