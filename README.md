# 🚀 3D Portfolio - Next.js (Ultimate Edition)

An **absolutely stunning**, enterprise-grade portfolio website built with Next.js 14, Three.js, and Framer Motion. Features cutting-edge 3D animations, interactive elements, live code playground, GitHub integration, case studies, and much more!

## ✨ Complete Feature List

### 🎨 3D Visual Design
- **3D Animated Background** - 8000+ particles, floating geometric shapes, mouse parallax
- **3D Skill Cards** - 32+ tech cards with flip animation, rotating logos
- **3D Project Cards** - Mouse-tracking 3D tilt with depth layers
- **Profile Picture** - Rotating gradient borders, floating emoji badges (💻🚀⚡)
- **Glassmorphism UI** - Modern frosted glass effects everywhere
- **Gradient Magic** - Dynamic color gradients (Cyber Blue, Purple, Pink, Neon Green)
- **Smooth Animations** - Framer Motion for 60fps buttery transitions

### 💻 Interactive Features

#### 1. **Live Code Playground** ⚡
- 4 pre-loaded code examples (React, TypeScript, Algorithms)
- Real-time code execution
- Syntax highlighting
- Output console
- Edit and run code instantly

#### 2. **Interactive Resume/CV** 📄
- Downloadable PDF resume
- Animated skill proficiency bars (10 skills)
- Expandable work experience timeline
- 4 professional certifications with badges
- Category filtering for skills
- Beautiful hover effects and animations

#### 3. **GitHub Activity Dashboard** 📊
- 365-day contribution heatmap
- Live repository stats (stars, forks, languages)
- Top 5 repositories showcase
- Recent commits feed
- Language usage statistics with visual bars
- Streak tracking (current & longest)
- Total contributions counter

#### 4. **Case Studies** 💼
- 3 detailed project breakdowns
- Problem-Solution-Result format
- Before/After comparison toggle
- Client logos and information
- Success metrics dashboard
- Tech stack display
- Duration and team size

### 📋 Core Sections

1. **Hero Section**
   - Animated profile with 3D effects
   - Floating badges
   - Status indicator (Available)
   - Quick stats (Years, Projects, Clients)
   - CTA buttons

2. **Skills (32+ Technologies)**
   - React, Next.js, Vue.js
   - TypeScript, JavaScript, Python
   - Node.js, Django, GraphQL
   - AWS, Docker, Kubernetes
   - MongoDB, PostgreSQL, Redis
   - TensorFlow, PyTorch
   - And 20+ more with flip cards

3. **Projects (6 Featured)**
   - Cloud E-Commerce Platform
   - AI Analytics Dashboard
   - Real-Time Collaboration
   - Blockchain DeFi
   - IoT Smart Home
   - Healthcare Management

4. **Experience Timeline**
   - 4 professional positions
   - Expandable achievements
   - Company details
   - Period and duration

5. **Contact Section**
   - Email, Phone, Location
   - Social media links
   - 3D hover effects
   - Gradient cards

### 🔥 Technical Stack
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Three.js** for 3D graphics (r128)
- **Framer Motion** for advanced animations
- **Tailwind CSS** with custom configurations
- Real-time code execution sandbox
- 3D transforms and perspectives
- Mouse parallax tracking
- Scroll-triggered animations
- Gradient animations
- Glassmorphism effects

### 📊 Portfolio Statistics
- **10 Sections** - Hero, Skills, Projects, Case Studies, Code Playground, Resume, GitHub, Experience, Contact, Footer
- **32+ Skills** - Technology cards with interactive elements
- **6 Projects** - Detailed showcases with 3D effects
- **3 Case Studies** - Complete before/after analysis
- **4 Code Examples** - Runnable in playground
- **10 Skill Bars** - Animated proficiency indicators
- **4 Certifications** - Professional credentials
- **365 Days** - GitHub contribution heatmap
- **5 Top Repos** - Repository showcase

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1. **Extract the portfolio-nextjs folder**

2. **Install dependencies**
\`\`\`bash
cd portfolio-nextjs
npm install
\`\`\`

3. **Run development server**
\`\`\`bash
npm run dev
\`\`\`

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Add Your Profile Picture

Replace the placeholder in `components/Hero.tsx`:

\`\`\`tsx
// Remove this placeholder div
<div className="w-full h-full bg-gradient-to-br from-cyber-blue/20 via-cyber-purple/20 to-cyber-pink/20 flex items-center justify-center">
  <div className="text-8xl font-bold text-gradient">DEV</div>
</div>

// Uncomment and use this instead
<Image
  src="/profile.jpg"  // Add your image to /public folder
  alt="Profile"
  fill
  className="object-cover"
  priority
/>
\`\`\`

### Update Personal Information

Edit `app/page.tsx` to customize:
- Name and title
- Skills and technologies
- Project details
- Work experience
- Contact information

### Change Colors

Modify colors in `tailwind.config.js`:
\`\`\`js
colors: {
  'cyber-blue': '#00f3ff',
  'cyber-purple': '#b829ff',
  'cyber-pink': '#ff2e97',
  'neon-green': '#39ff14',
  'electric-violet': '#8b00ff',
}
\`\`\`

## 📦 Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy with one click

### Netlify
1. Build the project: \`npm run build\`
2. Deploy the \`out\` folder to Netlify

### Other Platforms
Compatible with any platform that supports Next.js:
- AWS Amplify
- Azure Static Web Apps
- Cloudflare Pages
- GitHub Pages (with static export)

## 📁 Project Structure

\`\`\`
portfolio-nextjs/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page (all sections)
├── components/
│   ├── Background3D.tsx     # Three.js background
│   ├── Hero.tsx             # Hero section with profile
│   └── Navigation.tsx       # Navigation bar
├── public/
│   └── profile.jpg          # Add your profile image here
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
\`\`\`

## 🎯 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🔧 Troubleshooting

### Three.js not loading
Make sure to install dependencies:
\`\`\`bash
npm install three @types/three
\`\`\`

### Animations choppy
- Enable hardware acceleration in browser
- Close other tabs/applications
- Try on a different device

### Build errors
\`\`\`bash
rm -rf node_modules .next
npm install
npm run dev
\`\`\`

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Credits

- **Three.js** - 3D graphics library
- **Framer Motion** - Animation library
- **Next.js** - React framework
- **Tailwind CSS** - Utility-first CSS

## 💼 For LinkedIn

To showcase on LinkedIn:
1. Deploy to Vercel/Netlify
2. Add the URL to your LinkedIn profile
3. Feature in "Featured" section
4. Share as a post with screenshots

## 🤝 Support

For questions or issues:
- Open an issue on GitHub
- Contact via email (update in contact section)

---

**Made with ❤️ and cutting-edge technology**
