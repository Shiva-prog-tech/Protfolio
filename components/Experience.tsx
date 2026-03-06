import { motion } from 'framer-motion'

export default function Experience(){
    return(
        <section id="experience" className="py-16 md:py-24 px-4 relative overflow-hidden">
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 bg-electric-violet/10 rounded-full blur-3xl" />

  <div className="container mx-auto max-w-5xl relative z-10">
   <motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="text-center mb-12 md:mb-16"
>
  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gradient mb-4 px-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
    PROFESSIONAL<br />JOURNEY
  </h2>
</motion.div>

    <div className="relative">
      {/* Timeline line - hidden on mobile */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyber-blue via-cyber-purple to-cyber-pink hidden md:block"></div>

      {/* Mobile timeline line - vertical line on left */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-blue via-cyber-purple to-cyber-pink md:hidden"></div>

      <div className="space-y-8 md:space-y-12 relative">
        {[
          {
            year: '09/2023 - 01/2026',
            title: 'Software Developer (Frontend)',
            company: 'Globusssoft Technologies',
            description: 'Developed and maintained scalable frontend applications using React.js and Next.js. Implemented server-side rendering (SSR) and static site generation (SSG) to enhance performance and SEO. Built reusable UI components, integrated REST APIs, and managed application state using Redux/Context API. Optimized application performance through code splitting, lazy loading, and image optimization. Collaborated with cross-functional teams in Agile/Scrum environment.',
            side: 'left',
            gradient: 'from-cyan-500 to-blue-600',
            highlights: [
              'SSR/SSG implementation for SEO',
              'Performance optimization',
              'REST API integration',
              'Agile/Scrum methodology'
            ]
          },
          {
            year: '04/2023 - 09/2023',
            title: 'MERN Stack Development - Professional Training',
            company: 'JSpiders, Basavanagudi',
            description: 'Completed intensive 6-month professional training in MERN Stack Development. Mastered MongoDB, Express.js, React.js, and Node.js through hands-on projects and real-world scenarios. Built full-stack applications with modern web technologies.',
            side: 'right',
            gradient: 'from-green-500 to-teal-600',
            type: 'education',
            degree: 'Professional Certification',
            duration: '6 Months',
            location: 'Bengaluru, India',
            highlights: [
              'MongoDB, Express.js, React.js, Node.js',
              'Full-stack development',
              'RESTful APIs',
              'Hands-on projects'
            ]
          }
        ].map((exp, index) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative md:w-1/2 ${exp.side === 'right' ? 'md:ml-auto' : ''}`}
          >
            {/* Timeline dot - desktop */}
            <div className="absolute top-6 hidden md:block" style={{ [exp.side === 'left' ? 'right' : 'left']: '-25px' }}>
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className={`w-6 h-6 rounded-full bg-gradient-to-r ${exp.gradient} border-4 border-[#050814] shadow-2xl`}
              ></motion.div>
            </div>

            {/* Timeline dot - mobile */}
            <div className="absolute left-4 top-6 -translate-x-1/2 md:hidden">
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className={`w-4 h-4 rounded-full bg-gradient-to-r ${exp.gradient} border-2 border-[#050814] shadow-xl`}
              ></motion.div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className={`glass-effect p-5 md:p-6 rounded-xl hover-lift group relative overflow-hidden ${
                exp.side === 'right' ? 'md:ml-12' : 'md:mr-12'
              } ml-8 md:ml-0`}
            >
              {/* Gradient border on hover */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${exp.gradient} rounded-xl opacity-0 group-hover:opacity-50 blur transition duration-300`}></div>
              
              <div className="relative">
                <div className={`text-xs md:text-sm font-bold bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent mb-1 md:mb-2`}>
                  {exp.year}
                </div>
                
                <h3 className="text-lg md:text-2xl font-bold mb-1 text-gradient-blue-purple group-hover:scale-105 transition-transform" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {exp.title}
                </h3>
                
                <div className="text-sm md:text-lg text-cyber-blue mb-2 md:mb-3 font-semibold">{exp.company}</div>
                
                <p className="text-sm md:text-base text-gray-400 mb-4">{exp.description}</p>
                
                {/* Highlights section - visible on hover/click */}
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 pt-3 border-t border-white/10"
                >
                  <div className="text-xs md:text-sm font-semibold text-white mb-2">Key Achievements:</div>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`px-2 md:px-3 py-1 text-xs md:text-sm rounded-full bg-gradient-to-r ${exp.gradient} bg-opacity-10 text-white border border-white/10`}
                      >
                        {highlight}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>
    )
}