import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import profileImage from './assets/profile.JPG';
import cvFile from './assets/Phyo Min Thein(CV).jpg';

export default function App() {
  const [dark, setDark] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [filter, setFilter] = useState("all");

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('home');
  const [particles, setParticles] = useState([]);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const projects = [
    {
      id: "curriculum",
      title: "Curriculum Statistics Website",
      tech: "HTML, CSS, Vue.js, Chart.js, Node.js, MySQL, Firebase",
      desc: "Developed for Mae Fah Luang University's School of Management to visualize academic statistics. Implemented interactive charts with Chart.js and responsive UI using Tailwind CSS.",
      url: "https://github.com/kweephyo-pmt/senior_project",
      category: "web",
      year: "2024"
    },
    {
      id: "cafez",
      title: "CafeZ Mobile App",
      tech: "Flutter, Firebase",
      desc: "Developed a cross-platform app for cafe management with authentication and real-time database integration. Used Firebase Authentication and Firestore for secure data handling.",
      url: "https://github.com/kweephyo-pmt/cafe_z",
      category: "mobile",
      year: "2023"
    },
    {
      id: "reclaimify",
      title: "Reclaimify Lost & Found App",
      tech: "Flutter, Firebase, GoogleMaps API",
      desc: "Created a lost-and-found platform with location tagging and image uploads. Implemented map-based item search using Google Maps API for enhanced user experience.",
      url: "https://github.com/kweephyo-pmt/lost_found",
      category: "mobile",
      year: "2023"
    },
  ];

  const workExperience = [
    {
      company: "Eternal",
      position: "Marketing Manager & Online Admin",
      period: "2020 - 2022",
      responsibilities: [
        "Planned and executed digital campaigns to promote products",
        "Managed and updated content on websites and social media platforms",
        "Handled customer queries and provided timely responses"
      ]
    },
    {
      company: "Thant-Purity Diamonds & Jewelry Shop",
      position: "Online Customer Service",
      period: "2017 - 2020",
      responsibilities: [
        "Answered customer questions via chat, email, and social media",
        "Resolved product/order issues and provided policy information"
      ]
    }
  ];

  const skills = {
    frontend: [
      { name: "Vue.js", level: 5 },
      { name: "Nuxt 3", level: 5 },
      { name: "JavaScript", level: 5 },
      { name: "HTML5", level: 5 },
      { name: "CSS3", level: 5 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Bootstrap", level: 5 }
    ],
    backend: [
      { name: "Node.js", level: 4 },
      { name: "Express.js", level: 4 },
      { name: "REST APIs", level: 3 },
      { name: "Firebase", level: 5 },
      { name: "MySQL", level: 4 }
    ],
    mobile: [
      { name: "Flutter", level: 5 },
      { name: "React", level: 3 }
    ],
    tools: [
      { name: "Git", level: 4 },
      { name: "GitHub", level: 5 },
      { name: "Google Cloud Platform", level: 4 },
      { name: "Firebase", level: 5 }
    ],
    databases: [
      { name: "MySQL", level: 4 },
      { name: "Firebase Firestore", level: 5 },
      { name: "CloudSQL", level: 4 }
    ],
    languages: [
      { name: "Burmese (Native)", level: 5 },
      { name: "English (Fluent)", level: 4 },
      { name: "Thai (Basic)", level: 2 },
      { name: "Chinese (Basic)", level: 2 }
    ]
  };

  const education = [
    {
      degree: "Bachelor of Software Engineering (4th Year)",
      school: "Mae Fah Luang University",
      period: "2022-2026",
      location: "Chiang Rai, Thailand"
    },
    {
      degree: "Bachelor of Environmental Studies (3rd Year)",
      school: "Yangon University",
      period: "2017-2020",
      location: "Yangon, Myanmar"
    }
  ];

  // Ensure page starts at top on load/refresh
  useEffect(() => {
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    
    // Prevent browser from restoring scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Clear any hash from URL on load
    if (window.location.hash) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      
      // Update current section based on scroll position
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      const sectionElements = sections.map(id => {
        if (id === 'home') {
          // For home, use the hero section or top of page
          return document.querySelector('section') || document.body;
        }
        return document.getElementById(id);
      });
      
      // Improved section detection to prevent flashing
      let current = 'home';
      let closestSection = 'home';
      let closestDistance = Infinity;
      
      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const centerY = window.innerHeight / 2;
          
          // Check if section is in viewport
          if (rect.top <= centerY && rect.bottom >= centerY) {
            current = sections[index];
          }
          
          // Find closest section to center for fallback
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(sectionCenter - centerY);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = sections[index];
          }
        }
      });
      
      // Use closest section if no section is directly in viewport center
      if (current === 'home' && scrollTop > 100) {
        current = closestSection;
      }
      
      setCurrentSection(current);
    };
    
    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  // Enhanced mouse tracking for custom cursor
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e) => {
      if (!e.target) return;
      
      const target = e.target;
      
      // Safely check for interactive elements
      const isButton = target.tagName === 'BUTTON';
      const isLink = target.tagName === 'A';
      const hasClosestLink = target.closest && typeof target.closest === 'function' && target.closest('a');
      const hasClosestButton = target.closest && typeof target.closest === 'function' && target.closest('button');
      const hasCursorPointerClass = target.classList && target.classList.contains && target.classList.contains('cursor-pointer');
      const hasPointerStyle = target.style && target.style.cursor === 'pointer';
      
      if (isButton || isLink || hasClosestLink || hasClosestButton || hasCursorPointerClass || hasPointerStyle) {
        setCursorVariant('hover');
      }
    };

    const handleMouseLeave = () => {
      setCursorVariant('default');
    };

    // Don't hide cursor on focus/blur events
    const preventCursorHide = (e) => {
      e.preventDefault();
      document.body.style.cursor = 'none';
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);
    document.addEventListener("focus", preventCursorHide, true);
    document.addEventListener("blur", preventCursorHide, true);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.removeEventListener("focus", preventCursorHide, true);
      document.removeEventListener("blur", preventCursorHide, true);
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Optimized particle system with reduced count
  useEffect(() => {
    // Reduce particles further for better performance
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      size: 1.5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: 0.3,
    }));
    setParticles(newParticles);
  }, []);

  // Typing effect for "Full-Stack Developer"
  useEffect(() => {
    const text = "Full-Stack Developer";
    let currentIndex = 0;
    
    const typeTimer = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeTimer);
      }
    }, 100);

    // Cursor blinking effect
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typeTimer);
      clearInterval(cursorTimer);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  const filtered = projects.filter((p) => filter === "all" || p.category === filter);



  return (
    <div className={`min-h-screen font-sans transition-all duration-700 ${dark ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900' : 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white'} relative overflow-hidden`}>
      
      {/* Enhanced Custom Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{ 
          x: mousePosition.x - (cursorVariant === 'hover' ? 20 : 12), 
          y: mousePosition.y - (cursorVariant === 'hover' ? 20 : 12) 
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 25, mass: 0.1 }}
      >
        {/* Main cursor */}
        <motion.div
          className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mix-blend-difference"
          animate={{
            width: cursorVariant === 'hover' ? 40 : 24,
            height: cursorVariant === 'hover' ? 40 : 24,
            opacity: cursorVariant === 'hover' ? 0.8 : 1
          }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Cursor trail */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-400/50"
          animate={{
            width: cursorVariant === 'hover' ? 60 : 40,
            height: cursorVariant === 'hover' ? 60 : 40,
            opacity: cursorVariant === 'hover' ? 0.6 : 0.3
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
      </motion.div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />

      {/* Floating Section Navigator */}
      <motion.div
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl">
          {[
            { id: 'home', icon: '🏠', label: 'Home' },
            { id: 'about', icon: '👨‍💻', label: 'About' },
            { id: 'experience', icon: '💼', label: 'Experience' },
            { id: 'skills', icon: '⚡', label: 'Skills' },
            { id: 'projects', icon: '🚀', label: 'Projects' },
            { id: 'contact', icon: '📧', label: 'Contact' }
          ].map((section) => (
            <motion.button
              key={section.id}
              className={`relative w-12 h-12 rounded-xl mb-2 flex items-center justify-center transition-all duration-300 group ${
                currentSection === section.id 
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg' 
                  : 'hover:bg-white/10 text-gray-400 hover:text-white'
              }`}
              onClick={() => {
                if (section.id === 'home') {
                  // Scroll to top for home
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  window.history.pushState({}, '', window.location.pathname);
                } else {
                  // Find the target section
                  const element = document.getElementById(section.id);
                  if (element) {
                    element.scrollIntoView({ 
                      behavior: 'smooth', 
                      block: 'start',
                      inline: 'nearest'
                    });
                    window.history.pushState({}, '', `#${section.id}`);
                  }
                }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <span className="text-lg">{section.icon}</span>
              
              {/* Tooltip */}
              <motion.div
                className="absolute right-full mr-4 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {section.label}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-y-4 border-y-transparent" />
              </motion.div>
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      {/* Optimized Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.slice(0, 15).map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            animate={{
              x: [particle.x, particle.x + 50],
              y: [particle.y, particle.y + 50],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }}
            style={{
              left: particle.x,
              top: particle.y,
            }}
          />
        ))}
      </div>

      {/* Glassmorphism Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-white/20 rounded-full px-8 py-3 shadow-2xl"
      >
        <div className="flex items-center gap-8">
          <motion.button 
            className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent cursor-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              // Update URL to remove hash fragments
              window.history.pushState({}, '', window.location.pathname);
            }}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            PMT
          </motion.button>
          <div className="hidden md:flex items-center gap-6">
            {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
              <motion.button
                key={item}
                className="relative text-sm font-medium hover:text-cyan-400 transition-colors cursor-none"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = item.toLowerCase();
                  const targetElement = document.getElementById(targetId);
                  
                  if (targetElement) {
                    // Smooth scroll to target section
                    targetElement.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest'
                    });
                    
                    // Update URL with hash
                    window.history.pushState({}, '', `#${targetId}`);
                  }
                }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>
          <motion.button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            {dark ? '🌙' : '☀️'}
          </motion.button>
        </div>
      </motion.nav>

      {/* Revolutionary Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0"
          style={{ y: yBg }}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Glitch Effect Name */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <h1 className="text-6xl lg:text-8xl font-black mb-4 relative">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                  PHYO
                </span>
                <br />
                <motion.span 
                  className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  MIN THEIN{" "}
                  <span className="text-cyan-400">(Leo)</span>
                </motion.span>
              </h1>
              

            </motion.div>

            {/* Static Professional Title */}
            <div className="h-20 flex items-center">
              <motion.div 
                className="text-2xl lg:text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  {typedText}
                  {showCursor && <span className="animate-pulse">|</span>}
                </span>
              </motion.div>
            </div>

            {/* Enhanced Description */}
            <motion.p 
              className="text-xl lg:text-2xl leading-relaxed text-gray-300 dark:text-gray-800 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Crafting digital experiences with{" "}
              <span className="text-cyan-400 font-semibold">Vue.js</span>,{" "}
              <span className="text-blue-400 font-semibold">Node.js</span>, and{" "}
              <span className="text-purple-400 font-semibold">Flutter</span>.
              <br />
              Transforming ideas into scalable solutions.
            </motion.p>

            {/* Interactive CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-6 pt-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.a
                href="#projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}

              >
                <span className="relative z-10">Explore My Work</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a
                href="#contact"
                className="group px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold rounded-2xl backdrop-blur-sm hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Connect
              </motion.a>

              <motion.a
href="mailto:phyominthein.leo@gmail.com"
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 shadow-lg border border-white/20"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                📧 Email Me
              </motion.a>

              <motion.a
                href={cvFile}
                download="Phyo_Min_Thein_CV.jpg"
                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                📄 Download CV
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Interactive Element */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: -30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Main 3D Card */}
              <motion.div
                className="relative w-96 h-96 perspective-1000"
                whileHover={{ rotateY: 10, rotateX: 5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Card Front */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl"
                  whileHover={{ z: 50 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Profile Photo */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <img
                      src={profileImage}
                      alt="Phyo Min Thein (Leo)"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>


              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Revolutionary About Section */}
      <section id="about" className="py-20 px-6 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Holographic Title */}
            <motion.h2 
              className="text-6xl lg:text-8xl font-black text-center mb-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              ABOUT ME
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Floating Text Cards */}
              <div className="space-y-8">
                {[
                  "4th-year Software Engineering student at Mae Fah Luang University with hands-on experience in full-stack development and cloud platforms. Skilled in building web, mobile, and backend applications using Vue.js, Nuxt 3, Node.js, Flutter, Firebase, GCP, and MySQL.",
                  "Passionate about solving problems, developing scalable solutions, and continuously learning emerging technologies. Eager to contribute to a development team and gain real-world industry experience."
                ].map((text, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.3, duration: 0.8 }}
                    whileHover={{ scale: 1.02, z: 20 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300">
                      <p className="text-xl leading-relaxed text-gray-200 dark:text-gray-800">
                        {text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Side - 3D Info Cards */}
              <div className="space-y-6">
                {[
                  { icon: "📍", title: "Location", value: "Chiang Rai, Thailand", color: "from-emerald-400 to-cyan-500" },
                  { icon: "🎓", title: "Education", value: "Software Engineering, Mae Fah Luang University", color: "from-blue-400 to-indigo-500" },
                  { icon: "💼", title: "Status", value: "Open to opportunities", color: "from-purple-400 to-pink-500" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="group relative"
                    initial={{ opacity: 0, x: 100, rotateY: -30 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: 5,
                      z: 30 
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-all duration-500`} />
                    
                    {/* Main Card */}
                    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 group-hover:border-white/40 transition-all duration-300">
                      <div className="flex items-center gap-6">
                        {/* 3D Icon */}
                        <motion.div
                          className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-2xl shadow-2xl`}
                          whileHover={{ 
                            rotateY: 180,
                            scale: 1.1 
                          }}
                          transition={{ duration: 0.6 }}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <span className="drop-shadow-lg">{item.icon}</span>
                        </motion.div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <motion.h3 
                            className="text-xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                            whileHover={{ scale: 1.05 }}
                          >
                            {item.title}
                          </motion.h3>
                          <p className="text-gray-300 dark:text-gray-800 leading-relaxed">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Futuristic Experience Timeline */}
      <section id="experience" className="py-20 px-6 relative overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Holographic Title */}
            <motion.h2 
              className="text-6xl lg:text-8xl font-black text-center mb-20 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              EXPERIENCE
            </motion.h2>

            {/* Futuristic Timeline */}
            <div className="relative">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 rounded-full" />
              
              <div className="space-y-20">
                {workExperience.map((job, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.3 }}
                  >
                    {/* Timeline Node */}
                    <motion.div
                      className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full z-20 shadow-2xl"
                      whileHover={{ scale: 1.5 }}
                      animate={{ 
                        boxShadow: [
                          "0 0 20px rgba(6, 182, 212, 0.5)",
                          "0 0 40px rgba(6, 182, 212, 0.8)",
                          "0 0 20px rgba(6, 182, 212, 0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Experience Card */}
                    <div className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'}`}>
                      {/* Content Side */}
                      <motion.div
                        className="lg:text-left lg:pl-16"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="relative group">
                          {/* Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                          
                          {/* Main Card */}
                          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-cyan-400/50 transition-all duration-300">
                            {/* Period Badge */}
                            <motion.div
                              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-lg"
                              whileHover={{ scale: 1.1 }}
                            >
                              {job.period}
                            </motion.div>

                            {/* Job Title */}
                            <motion.h3 
                              className="text-3xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                              whileHover={{ scale: 1.05 }}
                            >
                              {job.position}
                            </motion.h3>

                            {/* Company */}
                            <motion.p 
                              className="text-xl font-bold text-purple-400 mb-6"
                              whileHover={{ scale: 1.05 }}
                            >
                              {job.company}
                            </motion.p>

                            {/* Responsibilities */}
                            <div className="space-y-3">
                              {job.responsibilities.map((resp, idx) => (
                                <motion.div
                                  key={idx}
                                  className="flex items-start gap-3"
                                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                                >
                                  <motion.div
                                    className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2 flex-shrink-0"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                                  />
                                  <p className="text-gray-200 dark:text-gray-800 leading-relaxed">
                                    {resp}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Visual Side */}
                      <motion.div
                        className={`flex ${index % 2 === 0 ? 'justify-start lg:pl-16' : 'justify-start lg:pl-16 lg:order-1'}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                      >
                        <div className="relative">
                          {/* Floating Orb */}
                          <motion.div
                            className="w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-full backdrop-blur-xl border border-white/20 flex items-center justify-center text-4xl shadow-2xl"
                            animate={{ 
                              rotate: 360,
                              y: [0, -20, 0],
                            }}
                            transition={{ 
                              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                            }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {index === 0 ? '💼' : '💎'}
                          </motion.div>

                          {/* Orbiting Elements */}
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                              animate={{
                                rotate: 360,
                                x: [0, Math.cos(i * 120 * Math.PI / 180) * 60],
                                y: [0, Math.sin(i * 120 * Math.PI / 180) * 60],
                              }}
                              transition={{
                                duration: 8,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "linear"
                              }}
                              style={{
                                left: '50%',
                                top: '50%',
                                transformOrigin: '0 0'
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Holographic Education Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Optimized Floating Geometric Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 border border-cyan-400/15 rounded-lg"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${25 + i * 25}%`,
                top: `${20 + i * 30}%`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Holographic Title */}
            <motion.h2 
              className="text-6xl lg:text-8xl font-black text-center mb-20 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              EDUCATION
            </motion.h2>

            {/* 3D Education Cards */}
            <div className="grid lg:grid-cols-2 gap-12">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="relative group perspective-1000"
                  initial={{ opacity: 0, rotateY: index % 2 === 0 ? -90 : 90 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.3 }}
                  whileHover={{ 
                    rotateY: index % 2 === 0 ? 5 : -5,
                    scale: 1.05,
                    z: 50 
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Holographic Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                  
                  {/* Main Card */}
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-purple-400/50 transition-all duration-300 min-h-[300px] flex flex-col justify-between">
                    {/* University Icon */}
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-2xl mx-auto"
                      animate={{ 
                        rotateY: [0, 180, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      🎓
                    </motion.div>

                    {/* Content */}
                    <div className="text-center space-y-4">
                      <motion.h3 
                        className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.05 }}
                      >
                        {edu.degree}
                      </motion.h3>

                      <motion.p 
                        className="text-xl font-bold text-cyan-400"
                        whileHover={{ scale: 1.05 }}
                      >
                        {edu.school}
                      </motion.p>

                      <div className="space-y-2">
                        <motion.div
                          className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold"
                          whileHover={{ scale: 1.1 }}
                        >
                          {edu.period}
                        </motion.div>
                        
                        <p className="text-gray-300 dark:text-gray-800 flex items-center justify-center gap-2">
                          <span>📍</span>
                          {edu.location}
                        </p>
                      </div>
                    </div>

                    {/* Floating Particles */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                        animate={{
                          x: [0, Math.cos(i * 72 * Math.PI / 180) * 40],
                          y: [0, Math.sin(i * 72 * Math.PI / 180) * 40],
                          scale: [1, 0.5, 1],
                          opacity: [0.7, 0.3, 0.7],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        style={{
                          left: '50%',
                          top: '50%',
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional Skills Matrix */}
      <section id="skills" className="py-20 px-6 relative overflow-hidden bg-gradient-to-br from-slate-50/5 to-gray-100/5">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Professional Title */}
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl lg:text-6xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Technical <span className="text-cyan-400">Skills</span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Comprehensive expertise across modern development technologies
              </motion.p>
            </div>

            {/* Professional Skills Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList], categoryIndex) => {
                const getIcon = (index) => {
                  const icons = ['⚛️', '⚙️', '📱', '🛠️', '🗄️', '🌍'];
                  return icons[index] || '🔧';
                };
                
                const getColor = (index) => {
                  const colors = [
                    'from-emerald-500 to-teal-600',
                    'from-blue-500 to-indigo-600', 
                    'from-purple-500 to-violet-600',
                    'from-orange-500 to-red-600',
                    'from-pink-500 to-rose-600',
                    'from-cyan-500 to-blue-600'
                  ];
                  return colors[index] || 'from-gray-500 to-gray-600';
                };

                return (
                  <motion.div
                    key={category}
                    className="relative group"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  >
                    {/* Professional Card */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300 h-full">
                      {/* Header */}
                      <div className="flex items-center mb-6">
                        <div className={`w-12 h-12 bg-gradient-to-r ${getColor(categoryIndex)} rounded-xl flex items-center justify-center text-xl mr-4 shadow-lg`}>
                          {getIcon(categoryIndex)}
                        </div>
                        <h3 className="text-xl font-bold text-white capitalize">
                          {category}
                        </h3>
                      </div>

                      {/* Skills List */}
                      <div className="space-y-3">
                        {skillList.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 hover:border-cyan-400/20 transition-all duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ 
                              duration: 0.4, 
                              delay: 0.2 + skillIndex * 0.05
                            }}
                          >
                            <span className="text-gray-200 font-medium text-sm">
                              {skill.name}
                            </span>
                            
                            {/* Professional Skill Level Indicator */}
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <motion.div
                                  key={level}
                                  className={`w-2 h-2 rounded-full ${
                                    level <= skill.level 
                                      ? `bg-gradient-to-r ${getColor(categoryIndex)}` 
                                      : 'bg-white/20'
                                  }`}
                                  initial={{ scale: 0 }}
                                  whileInView={{ scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ 
                                    duration: 0.3, 
                                    delay: 0.4 + skillIndex * 0.05 + level * 0.02
                                  }}
                                />
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Professional Summary */}
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Technical Proficiency
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Experienced in full-stack development with expertise spanning modern frontend frameworks, 
                  robust backend systems, cross-platform mobile development, and cloud infrastructure. 
                  Committed to writing clean, maintainable code and following industry best practices.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Futuristic Projects Showcase */}
      <section id="projects" className="py-20 px-6 relative overflow-hidden">
        {/* Dynamic Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Holographic Title */}
            <motion.h2 
              className="text-6xl lg:text-8xl font-black text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              PROJECTS
            </motion.h2>

            {/* Futuristic Filter Controls */}
            <motion.div 
              className="flex justify-center mb-16"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
                <div className="flex gap-2">
                  {[
                    { key: "all", label: "All Projects", icon: "🚀" },
                    { key: "web", label: "Web Apps", icon: "🌐" },
                    { key: "mobile", label: "Mobile Apps", icon: "📱" },
                  ].map((filterOption) => (
                    <motion.button
                      key={filterOption.key}
                      onClick={() => setFilter(filterOption.key)}
                      className={`relative px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                        filter === filterOption.key
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="flex items-center gap-2">
                        <span>{filterOption.icon}</span>
                        {filterOption.label}
                      </span>
                      {filter === filterOption.key && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-xl blur-xl"
                          layoutId="activeFilter"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 3D Project Cards Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="group relative perspective-1000"
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: 5,
                      z: 50 
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Project Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                    
                    {/* Main Project Card */}
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-blue-400/50 transition-all duration-300 min-h-[500px] flex flex-col">
                      {/* Project Header */}
                      <div className="flex items-center justify-between mb-6">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold"
                          whileHover={{ scale: 1.1 }}
                        >
                          {project.year}
                        </motion.div>
                        
                        <motion.div
                          className="text-cyan-400 text-sm uppercase tracking-wider font-bold flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          {project.category === 'web' ? '🌐' : project.category === 'mobile' ? '📱' : '🚀'}
                          {project.category}
                        </motion.div>
                      </div>

                      {/* Project Title */}
                      <motion.h3 
                        className="text-2xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.02 }}
                      >
                        {project.title}
                      </motion.h3>

                      {/* Project Description */}
                      <p className="text-gray-300 dark:text-gray-800 mb-6 leading-relaxed flex-grow">
                        {project.desc}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.split(', ').map((tech, idx) => (
                          <motion.span
                            key={idx}
                            className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 backdrop-blur-sm border border-white/10 text-gray-200 px-3 py-1 rounded-full text-xs font-medium hover:border-blue-400/50 transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + idx * 0.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Project Link */}
                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>View Project</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          🚀
                        </motion.span>
                        
                        {/* Link Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover/link:opacity-100 transition-all duration-300" />
                      </motion.a>

                      {/* Floating Project Particles */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                          animate={{
                            x: [0, Math.cos(i * 120 * Math.PI / 180) * 30],
                            y: [0, Math.sin(i * 120 * Math.PI / 180) * 30],
                            scale: [1, 0.5, 1],
                            opacity: [0.7, 0.3, 0.7],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                          style={{
                            left: '50%',
                            top: '20%',
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quantum Contact Portal */}
      <section id="contact" className="py-20 px-6 relative overflow-hidden">
        {/* Optimized Quantum Field Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 1,
              }}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Holographic Title */}
            <motion.h2 
              className="text-6xl lg:text-8xl font-black text-center mb-8 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              CONTACT
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
              className="text-xl text-center mb-16 text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ready to build the future together? Let's connect and create something extraordinary! 
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-bold"> 
                🚀 The next innovation starts with a conversation.
              </span>
            </motion.p>
            
            <div className="max-w-5xl mx-auto">
              {/* Enhanced Contact Section */}
              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                {/* Main Contact Container */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12 hover:border-cyan-400/50 transition-all duration-500">
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl opacity-50" />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <motion.div 
                      className="text-center mb-12"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <motion.h3 
                        className="text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.05 }}
                        animate={{ 
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                      >
                        🌐 LET'S CONNECT
                      </motion.h3>
                      <motion.p 
                        className="text-xl text-gray-300 dark:text-gray-700 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        Ready to collaborate on exciting projects or discuss opportunities? 
                        <span className="text-cyan-400 font-semibold"> Reach out through any of these channels!</span>
                      </motion.p>
                    </motion.div>

                    {/* Contact Grid */}
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                      {[
                        { 
                          icon: "📧", 
                          label: "Primary Email", 
                          value: "phyominthein.leo@gmail.com", 
                          href: "mailto:phyominthein.leo@gmail.com",
                          color: "from-blue-400 to-cyan-500",
                          description: "Best for professional inquiries"
                        },
                        { 
                          icon: "🎓", 
                          label: "University Email", 
                          value: "6531503172@lamduan.mfu.ac.th", 
                          href: "mailto:6531503172@lamduan.mfu.ac.th",
                          color: "from-emerald-400 to-teal-500",
                          description: "Academic collaborations"
                        },
                        { 
                          icon: "📱", 
                          label: "Phone", 
                          value: "+66 804745234", 
                          href: "tel:+66804745234",
                          color: "from-purple-400 to-violet-500",
                          description: "Quick conversations"
                        },
                        { 
                          icon: "🚀", 
                          label: "GitHub", 
                          value: "github.com/kweephyo-pmt", 
                          href: "https://github.com/kweephyo-pmt",
                          color: "from-pink-400 to-rose-500",
                          description: "Check out my code"
                        },
                      ].map((contact, index) => (
                        <motion.div
                          key={index}
                          className="group/contact relative"
                          initial={{ opacity: 0, y: 50, rotateX: 45 }}
                          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                          whileHover={{ y: -5, scale: 1.02 }}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          {/* Contact Item Glow */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${contact.color} opacity-0 group-hover/contact:opacity-20 rounded-2xl blur-xl transition-all duration-500`} />
                          
                          <motion.a
                            href={contact.href}
                            target={contact.href.startsWith('http') ? '_blank' : undefined}
                            rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="relative block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 transition-all duration-300 group cursor-none"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                          >
                            <div className="flex items-start gap-4">
                              <motion.div
                                className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center text-2xl shadow-xl`}
                                whileHover={{ 
                                  rotate: [0, -10, 10, 0],
                                  scale: 1.1 
                                }}
                                transition={{ duration: 0.6 }}
                              >
                                <span className="drop-shadow-lg">{contact.icon}</span>
                              </motion.div>
                              
                              <div className="flex-1 min-w-0">
                                <motion.h4 
                                  className="text-lg font-bold text-white mb-1"
                                  whileHover={{ x: 5 }}
                                >
                                  {contact.label}
                                </motion.h4>
                                <p className="text-sm text-gray-400 mb-2">{contact.description}</p>
                                <motion.p
                                  className="text-cyan-400 hover:text-purple-400 font-semibold transition-colors duration-300 break-all text-sm"
                                  whileHover={{ scale: 1.02 }}
                                >
                                  {contact.value}
                                </motion.p>
                              </div>
                              
                              <motion.div
                                className="text-cyan-400/60 text-xl"
                                animate={{ 
                                  rotate: [0, 15, 0],
                                  scale: [1, 1.1, 1]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                ↗
                              </motion.div>
                            </div>
                            
                            {/* Hover Effect Line */}
                            <motion.div
                              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                              initial={{ width: 0 }}
                              whileHover={{ width: "100%" }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.a>
                        </motion.div>
                      ))}
                    </div>

                    {/* Call to Action */}
                    <motion.div 
                      className="text-center mt-12"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    >
                      <motion.div
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl border border-cyan-400/30 backdrop-blur-sm"
                        whileHover={{ scale: 1.05, y: -2 }}
                        animate={{ 
                          boxShadow: [
                            "0 0 20px rgba(6, 182, 212, 0.3)",
                            "0 0 40px rgba(168, 85, 247, 0.3)",
                            "0 0 20px rgba(6, 182, 212, 0.3)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <motion.span
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="text-2xl"
                        >
                          ⚡
                        </motion.span>
                        <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                          Available for exciting opportunities!
                        </span>
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-2xl"
                        >
                          🚀
                        </motion.span>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              

            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed right-6 bottom-6 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg z-50 font-bold"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* Futuristic Footer */}
      <footer className="relative py-16 px-6 overflow-hidden">
        {/* Footer Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-purple-900/10 to-pink-900/10" />
          
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }} />
          </div>

          {/* Floating Footer Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              animate={{
                y: [0, -50, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 1,
              }}
              style={{
                left: `${15 + i * 15}%`,
                bottom: `${10 + (i % 2) * 20}%`,
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Footer Content */}
            <div className="grid lg:grid-cols-3 gap-12 mb-12">
              {/* Brand Section */}
              <motion.div
                className="text-center lg:text-left"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h3 
                  className="text-3xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  PHYO MIN THEIN
                </motion.h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Full-Stack Developer crafting the future with innovative web solutions. 
                  <span className="text-cyan-400 font-semibold"> Ready to build tomorrow's technology today.</span>
                </p>
                
                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                  {['React', 'Node.js', 'Python', 'TypeScript'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-full text-xs font-bold text-cyan-400"
                      whileHover={{ scale: 1.1, y: -2 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Download CV Button */}
                <motion.div
                  className="flex justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.a
                    href={cvFile}
                    download="Phyo_Min_Thein_CV.jpg"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg 
                      className="w-5 h-5 mr-2 group-hover:animate-bounce" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                      />
                    </svg>
                    Download CV
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h4 className="text-xl font-bold mb-6 text-white">Quick Navigation</h4>
                <div className="space-y-3">
                  {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="block text-gray-300 hover:text-cyan-400 transition-colors font-medium"
                      whileHover={{ x: 10, scale: 1.05 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Connect Section */}
              <motion.div
                className="text-center lg:text-right"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h4 className="text-xl font-bold mb-6 text-white">Let's Connect</h4>
                
                {/* Social Links */}
                <div className="flex gap-4 justify-center lg:justify-end mb-6">
                  {[
                    { icon: '📧', href: 'mailto:phyominthein.leo@gmail.com', label: 'Email' },
                    { icon: '🚀', href: 'https://github.com/kweephyo-pmt', label: 'GitHub' },
                    { icon: '💼', href: '#contact', label: 'Contact' },
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group relative w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center text-xl hover:border-cyan-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: 0.8 + index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <span className="group-hover:scale-110 transition-transform">
                        {social.icon}
                      </span>
                      
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {social.label}
                      </div>
                    </motion.a>
                  ))}
                </div>

                <p className="text-gray-400 text-sm">
                  Available for exciting opportunities
                </p>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              <motion.div
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Copyright & Credits */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <p className="text-gray-400 mb-2">
                &copy; 2025 <span className="text-cyan-400 font-semibold">Phyo Min Thein</span>. 
                All rights reserved.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
