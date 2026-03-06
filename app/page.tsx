'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Skills3D from '@/components/Skills3D'
import Projects3D from '@/components/Projects3D'
import AIChatbot from '@/components/AIChatbot'
import { motion } from 'framer-motion'
import Education4DCard from '@/components/Education4DCard'
import Education from '@/components/Education'
import Language from '@/components/Language'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
// import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="relative bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:48px_48px]">
      {/* <Background3D /> */}
      <Navigation />
      
      <div id="home">
        <Hero />
      </div>
      <Education/>
      {/* Skills Section with 3D Cards */}
      <Skills3D />
      <Education4DCard language={false} />

        {/* Experience Section */}
      <Experience/>


      

      {/* Projects Section with 3D Cards */}
      <Projects3D />
      {/* <Education4DCard language={true} /> */}
      <Language/>
      {/* Case Studies Section */}
      {/* <CaseStudies /> */}

      {/* Live Code Playground */}
      {/* <CodePlayground /> */}

      {/* Interactive Coding Challenges */}
      {/* <CodingChallenges /> */}

      {/* Interactive Resume */}
      {/* <InteractiveResume /> */}

      {/* GitHub Activity Dashboard */}
      {/* <GitHubDashboard /> */}

      {/* Skill Assessment Quiz */}
      {/* <SkillAssessment /> */}

      {/* Performance Metrics Dashboard */}
      {/* <PerformanceMetrics /> */}

      {/* System Design Visualizer */}
      {/* <SystemDesignVisualizer /> */}

    

      {/* Contact Section */}
      <Contact/>

      {/* Footer */}
      {/* <footer className="py-8 px-4 border-t border-cyber-blue/20">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-center md:text-left">
              © 2026 Software Developer Portfolio. Crafted with passion and cutting-edge tech.
            </p>
            <div className="flex gap-4">
              <a href="#home" className="text-gray-500 hover:text-cyber-blue transition-colors">Home</a>
              <a href="#skills" className="text-gray-500 hover:text-cyber-blue transition-colors">Skills</a>
              <a href="#projects" className="text-gray-500 hover:text-cyber-blue transition-colors">Projects</a>
              <a href="#contact" className="text-gray-500 hover:text-cyber-blue transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer> */}
      <Footer/>

      {/* AI Chatbot - Floating */}
      <AIChatbot />
    </main>
  )
}
