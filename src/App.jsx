import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import profileImage from './assets/profile.JPG';
import softwareEngineeringGif from './assets/software enginnering.gif';
import cvFile from './assets/Phyo Min Thein(CV).jpg';
import useContactForm from './hooks/useContactForm';
import useComments from './hooks/useComments';

// Tech Stack Icons
import htmlIcon from './assets/HTML Icon.svg';
import cssIcon from './assets/CSS Icon.svg';
import tailwindIcon from './assets/Tailwind Logo.svg';
import jsIcon from './assets/JavaScript Icon.svg';
import pythonIcon from './assets/Python.png';
import reactIcon from './assets/ReactJS Logo.svg';
import nodeIcon from './assets/Node.js logo.svg';
import viteIcon from './assets/Vite (1).svg';
import vueIcon from './assets/Vue from Saimyat Minhan Portfolio.png';
import flutterIcon from './assets/Flutte (1).svg';
import firebaseIcon from './assets/Firebase Icon.svg';
import mysqlIcon from './assets/MySQL logo.png';
import powerbiIcon from './assets/Power BI.png';
import tableauIcon from './assets/Tableau (1).svg';
import githubIcon from './assets/GitHub Logo.png';

// Project Images
import cafeZImage from './assets/cafe_z.png';
import curriculumImage from './assets/curriculum_statistic.png';
import lostFoundImage from './assets/Lost Found.png';
import portfolioImage from './assets/preview-image.jpg';

export default function App() {
  const [dark, setDark] = useState(true);
  const [showTop, setShowTop] = useState(false);

  const [activeTab, setActiveTab] = useState("projects");
  const [selectedProject, setSelectedProject] = useState(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('home');
  const [particles, setParticles] = useState([]);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  // Contact form hook
  const { formData, loading, success, error, handleChange, submitForm } = useContactForm();
  
  // Comments hook
  const { comments, loading: commentsLoading, error: commentsError, addComment, formatTimeAgo } = useComments();
  
  // Notification state
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  
  // Show custom notification
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const projects = [
    {
      id: "curriculum",
      title: "Curriculum Statistics Website",
      tech: "HTML, CSS, Vue.js, Chart.js, Node.js, MySQL, Firebase",
      technologies: ["Vue.js", "Chart.js", "Node.js", "MySQL", "Firebase", "HTML", "CSS"],
      desc: "Developed for Mae Fah Luang University's School of Management to visualize academic statistics. Implemented interactive charts with Chart.js and responsive UI using Tailwind CSS.",
      url: "https://app.som-bi.work.gd/",
      githubUrl: "https://github.com/kweephyo-pmt/senior_project",
      category: "web",
      year: "2024",
      image: curriculumImage,
      features: [
        "Interactive data visualization with Chart.js for academic statistics",
        "Real-time database integration with MySQL and Firebase",
        "Responsive design optimized for various screen sizes",
        "User authentication and role-based access control"
      ]
    },
    {
      id: "cafez",
      title: "CafeZ Mobile App",
      tech: "Flutter, Firebase",
      technologies: ["Flutter", "Firebase"],
      desc: "Developed a cross-platform app for cafe management with authentication and real-time database integration. Used Firebase Authentication and Firestore for secure data handling.",
      url: "https://play.google.com/store/apps/details?id=com.cafez.app&hl=en",
      githubUrl: "https://github.com/kweephyo-pmt/cafe_z",
      category: "mobile",
      year: "2023",
      image: cafeZImage,
      features: [
        "Developed a user-friendly mobile app for ordering and paying for coffee seamlessly",
        "Built with Flutter for cross-platform mobile experience",
        "Integrated Firebase for real-time database and user authentication"
      ]
    },
    {
      id: "reclaimify",
      title: "Reclaimify Lost & Found App",
      tech: "Flutter, Firebase, GoogleMaps API",
      technologies: ["Flutter", "Firebase", "Google Maps API"],
      desc: "Created a lost-and-found platform with location tagging and image uploads. Implemented map-based item search using Google Maps API for enhanced user experience.",
      url: "https://github.com/kweephyo-pmt/lost_found",
      githubUrl: "https://github.com/kweephyo-pmt/lost_found",
      category: "mobile",
      year: "2023",
      image: lostFoundImage,
      features: [
        "Location-based item tracking with Google Maps integration",
        "Image upload and recognition for lost items",
        "Real-time notifications for matching lost and found items",
        "User-friendly interface for reporting and searching items"
      ]
    },
    {
      id: "portfolio",
      title: "Personal Portfolio Website",
      tech: "React, Tailwind CSS, Framer Motion, Vite",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
      desc: "Modern, responsive portfolio website showcasing projects and skills. Built with React and enhanced with smooth animations using Framer Motion. Features dark theme and optimized performance.",
      url: "https://phyominthein-portfolio.netlify.app/",
      githubUrl: "https://github.com/kweephyo-pmt/phyominthein-portfolio",
      category: "web",
      year: "2024",
      image: portfolioImage,
      features: [
        "Modern, responsive design with smooth animations",
        "Performance-optimized with Vite build system",
        "Interactive project showcase with live demos",
        "Dark theme with professional UI/UX design"
      ]
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

  const techStack = [
    { 
      name: "HTML", 
      icon: <img src={htmlIcon} alt="HTML" className="w-16 h-16 rounded-lg" />, 
      color: "from-orange-500 to-red-600" 
    },
    { 
      name: "CSS", 
      icon: <img src={cssIcon} alt="CSS" className="w-16 h-16 rounded-lg" />, 
      color: "from-blue-500 to-indigo-600" 
    },
    { 
      name: "Tailwind CSS", 
      icon: <img src={tailwindIcon} alt="Tailwind CSS" className="w-16 h-16 rounded-lg bg-cyan-400 p-3" />, 
      color: "from-cyan-500 to-blue-600" 
    },
    { 
      name: "JavaScript", 
      icon: <img src={jsIcon} alt="JavaScript" className="w-16 h-16 rounded-lg" />, 
      color: "from-yellow-500 to-orange-600" 
    },
    { 
      name: "Python", 
      icon: <img src={pythonIcon} alt="Python" className="w-16 h-16 rounded-lg" />, 
      color: "from-green-500 to-blue-600" 
    },
    { 
      name: "ReactJS", 
      icon: <img src={reactIcon} alt="ReactJS" className="w-16 h-16 rounded-lg" />, 
      color: "from-blue-500 to-cyan-600" 
    },
    { 
      name: "Node.JS", 
      icon: <img src={nodeIcon} alt="Node.JS" className="w-16 h-16 rounded-lg" />, 
      color: "from-green-500 to-emerald-600" 
    },
    { 
      name: "Vite", 
      icon: <img src={viteIcon} alt="Vite" className="w-16 h-16 rounded-lg" />, 
      color: "from-purple-500 to-pink-600" 
    },
    { 
      name: "Vue.js", 
      icon: <img src={vueIcon} alt="Vue.js" className="w-16 h-16 rounded-lg" />, 
      color: "from-emerald-500 to-green-600" 
    },
    { 
      name: "Flutter", 
      icon: <img src={flutterIcon} alt="Flutter" className="w-16 h-16 rounded-lg" />, 
      color: "from-blue-500 to-indigo-600" 
    },
    { 
      name: "Firebase", 
      icon: <img src={firebaseIcon} alt="Firebase" className="w-16 h-16 rounded-lg" />, 
      color: "from-orange-500 to-red-600" 
    },
    { 
      name: "MySQL", 
      icon: <img src={mysqlIcon} alt="MySQL" className="w-16 h-16 rounded-lg" />, 
      color: "from-blue-500 to-indigo-600" 
    },
    { 
      name: "Power BI", 
      icon: <img src={powerbiIcon} alt="Power BI" className="w-16 h-16 rounded-lg" />, 
      color: "from-yellow-500 to-orange-600" 
    },
    { 
      name: "Tableau", 
      icon: <img src={tableauIcon} alt="Tableau" className="w-16 h-16 rounded-lg" />, 
      color: "from-blue-500 to-purple-600" 
    },
    { 
      name: "GitHub", 
      icon: <img src={githubIcon} alt="GitHub" className="w-16 h-16 rounded-lg" />, 
      color: "from-gray-700 to-gray-900" 
    }
  ];

  const certificates = [
    { name: "Vue.js Certification", issuer: "Vue School", year: "2024" },
    { name: "Flutter Development", issuer: "Google", year: "2023" },
    { name: "Firebase Developer", issuer: "Google", year: "2023" }
  ];



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

    const handleMouseEnter = () => {
      // Cursor hover detection removed for simplicity
    };

    const handleMouseLeave = () => {
      // Cursor variant handling removed
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

  // Looping typing effect for roles
  useEffect(() => {
    const roles = ["Full-Stack Developer", "Data Analyst"];
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const typeEffect = () => {
      const currentRole = roles[currentRoleIndex];
      let typeSpeed = 100;
      
      if (isDeleting) {
        // Deleting characters
        setTypedText(currentRole.slice(0, currentCharIndex - 1));
        currentCharIndex--;
        typeSpeed = 50; // Faster deletion
        
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentRoleIndex = (currentRoleIndex + 1) % roles.length;
          typeSpeed = 500; // Pause before typing next role
        }
      } else {
        // Typing characters
        setTypedText(currentRole.slice(0, currentCharIndex + 1));
        currentCharIndex++;
        typeSpeed = 100; // Normal typing speed
        
        if (currentCharIndex === currentRole.length) {
          isDeleting = true;
          typeSpeed = 2000; // Pause when role is complete
        }
      }

      timeoutId = setTimeout(typeEffect, typeSpeed);
    };

    // Start the typing effect
    timeoutId = setTimeout(typeEffect, 1000); // Initial delay

    // Cursor blinking effect
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
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







  return (
    <div className={`min-h-screen font-sans transition-all duration-700 ${dark ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900'} relative overflow-hidden`}>
      
      {/* Custom Cursor - Hidden on Mobile */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

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
        className="fixed -right-2 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl">
          {[
            { id: 'home', icon: '🏠', label: 'Home' },
            { id: 'about', icon: '👨‍💻', label: 'About' },
            { id: 'experience', icon: '💼', label: 'Experience' },
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
          >
            LEO
          </motion.button>
          <div className="hidden md:flex items-center gap-6">
            {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
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
              <div className="relative">
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
                  </motion.span>
                </h1>
                
                {/* Reflection Effect */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <h1 className="text-6xl lg:text-8xl font-black mb-4 relative transform scale-y-[-1] translate-y-full opacity-30 blur-[1px] italic" 
                      style={{
                        background: 'linear-gradient(to bottom, transparent 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        filter: 'blur(1px) brightness(0.7)'
                      }}>
                    <span className="bg-gradient-to-r from-cyan-400/50 via-blue-500/50 to-purple-600/50 bg-clip-text text-transparent">
                      PHYO
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-purple-400/50 via-pink-500/50 to-red-500/50 bg-clip-text text-transparent">
                      MIN THEIN{" "}
                    </span>
                  </h1>
                </div>
              </div>
              

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
              className="text-xl lg:text-2xl leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl"
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
                className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Connect
              </motion.a>

              {/* Social Media Buttons */}
              <motion.div 
                className="flex gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                {/* GitHub Button */}
                <motion.a
                  href="https://github.com/kweephyo-pmt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.a>

                {/* LinkedIn Button */}
                <motion.a
                  href="https://www.linkedin.com/in/phyo-min-thein-605168361/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>

                {/* Instagram Button */}
                <motion.a
                  href="https://instagram.com/kweephyoe_pmt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-400 hover:to-purple-500 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </motion.a>
              </motion.div>

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
              {/* Software Engineering GIF with Hover Effects */}
              <motion.div
                className="relative w-96 h-96 group"
                initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: -5,
                  rotateX: 5,
                  z: 50
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Animated Glow Effect */}
                <motion.div
                  className="absolute -inset-6 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                
                {/* GIF Container */}
                <motion.div
                  className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl"
                  animate={{ 
                    y: [0, -8, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <motion.img
                    src={softwareEngineeringGif}
                    alt="Software Engineering Animation"
                    className="w-full h-full object-cover"
                    style={{ 
                      imageRendering: 'auto'
                    }}
                    whileHover={{
                      scale: 1.1,
                      filter: 'brightness(1.2) contrast(1.1) saturate(1.3)',
                      transition: { duration: 0.4 }
                    }}
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Decorative Corner Elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Animated Border on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-cyan-400/30 opacity-0 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none"
                    animate={{
                      borderColor: ['rgba(6, 182, 212, 0.3)', 'rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.3)', 'rgba(6, 182, 212, 0.3)']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
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
      <section id="about" className="py-32 px-6 relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-cyan-900/20" />
        
        {/* Multiple Floating Orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/15 to-blue-600/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-2xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [0, -40, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 30, repeat: Infinity }}
        />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
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
            {/* Enhanced Holographic Title */}
            <div className="text-center mb-20 relative">
              <motion.h2 
                className="text-7xl lg:text-9xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent relative z-10"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                ABOUT ME
              </motion.h2>
              
              {/* Glowing Underline */}
              <motion.div
                className="h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full mx-auto mt-6"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: '200px', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 1 }}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Side - Enhanced Floating Text Cards */}
              <div className="space-y-10">
                {[
                  {
                    title: "🎓 Academic Journey",
                    text: "4th-year Software Engineering student at Mae Fah Luang University with hands-on experience in full-stack development and cloud platforms. Skilled in building web, mobile, and backend applications using Vue.js, Nuxt 3, Node.js, Flutter, Firebase, GCP, and MySQL.",
                    gradient: "from-cyan-500/20 to-blue-600/20",
                    borderGradient: "from-cyan-400/50 to-blue-500/50"
                  },
                  {
                    title: "🚀 Passion & Vision",
                    text: "Passionate about solving problems, developing scalable solutions, and continuously learning emerging technologies. Eager to contribute to a development team and gain real-world industry experience.",
                    gradient: "from-purple-500/20 to-pink-600/20",
                    borderGradient: "from-purple-400/50 to-pink-500/50"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, x: -100, rotateY: -15 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.4, duration: 1, ease: "easeOut" }}
                    whileHover={{ 
                      scale: 1.03, 
                      z: 30,
                      rotateY: 2,
                      rotateX: 2
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Enhanced Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-3xl blur-xl group-hover:blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-500`} />
                    
                    {/* Main Card with Better Design */}
                    <div className="relative bg-white/8 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 group-hover:bg-white/12 transition-all duration-500 shadow-2xl">
                      {/* Card Header */}
                      <motion.h3 
                        className={`text-2xl font-bold mb-4 bg-gradient-to-r ${item.borderGradient} bg-clip-text text-transparent`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {item.title}
                      </motion.h3>
                      
                      {/* Enhanced Text */}
                      <p className="text-lg leading-relaxed text-gray-200 group-hover:text-white transition-colors duration-300">
                        {item.text}
                      </p>
                      
                      {/* Decorative Corner Elements */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                ))}
                
                {/* Download CV Button */}
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <motion.a
                    href={cvFile}
                    download="Phyo_Min_Thein_CV.jpg"
                    className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    📄 Download CV
                  </motion.a>
                </motion.div>
              </div>

              {/* Right Side - Profile Photo */}
              <div className="flex justify-center lg:justify-end">
                <motion.div
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: -5,
                    rotateX: 5,
                    z: 50
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Animated Glow Ring */}
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30 rounded-full blur-2xl"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                  
                  {/* Profile Photo Container */}
                  <motion.div
                    className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-400/20 to-purple-600/20 backdrop-blur-xl border border-white/20 shadow-2xl"
                    animate={{ 
                      y: [0, -10, 0]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    {/* Profile Image */}
                    <motion.img
                      src={profileImage}
                      alt="Phyo Min Thein"
                      className="w-full h-full object-cover"
                      whileHover={{
                        scale: 1.1,
                        filter: 'brightness(1.1) contrast(1.1) saturate(1.2)',
                        transition: { duration: 0.4 }
                      }}
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Decorative Corner Elements */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Animated Border */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl border-2 border-cyan-400/30 opacity-0 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"
                      animate={{
                        borderColor: ['rgba(6, 182, 212, 0.3)', 'rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.3)', 'rgba(6, 182, 212, 0.3)']
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </motion.div>
                </motion.div>
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
                                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
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

      {/* Enhanced Education Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated Grid */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5" />
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '50px 50px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Floating Orbs */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl"
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 100],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 100],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                width: `${60 + i * 20}px`,
                height: `${60 + i * 20}px`,
                left: `${20 + i * 12}%`,
                top: `${15 + i * 15}%`,
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
            {/* Enhanced Holographic Title */}
            <motion.h2 
              className="text-7xl lg:text-9xl font-black text-center mb-24 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent relative"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              EDUCATION
              {/* Glowing Underline */}
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "200px" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1.2 }}
              />
            </motion.h2>

            {/* Enhanced Education Cards */}
            <div className="grid lg:grid-cols-2 gap-16">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 100, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ 
                    y: -10,
                    rotateX: 5,
                    rotateY: index % 2 === 0 ? 3 : -3,
                    scale: 1.02
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Enhanced Glow Effects */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  
                  {/* Main Card with Glass Effect */}
                  <div className="relative bg-white/8 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 hover:border-cyan-400/50 transition-all duration-500 min-h-[380px] flex flex-col justify-between shadow-2xl">
                    
                    {/* Decorative Corner Elements */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50 rounded-tl-lg" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50 rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50 rounded-bl-lg" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50 rounded-br-lg" />

                    {/* Enhanced University Icon */}
                    <motion.div
                      className="relative mx-auto mb-8"
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.div
                        className="w-24 h-24 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl shadow-2xl relative overflow-hidden"
                        animate={{ 
                          rotateY: [0, 360],
                        }}
                        transition={{ 
                          duration: 8, 
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        🎓
                        {/* Inner Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                      </motion.div>
                      
                      {/* Rotating Ring */}
                      <motion.div
                        className="absolute inset-0 border-2 border-cyan-400/30 rounded-2xl"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>

                    {/* Content with Better Typography */}
                    <div className="text-center space-y-6 flex-1">
                      <motion.h3 
                        className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight"
                        whileHover={{ scale: 1.05 }}
                      >
                        {edu.degree}
                      </motion.h3>

                      <motion.p 
                        className="text-xl lg:text-2xl font-bold text-white/90 mb-6"
                        whileHover={{ scale: 1.02, color: "#06b6d4" }}
                        transition={{ duration: 0.3 }}
                      >
                        {edu.school}
                      </motion.p>

                      <div className="space-y-4">
                        <motion.div
                          className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {edu.period}
                        </motion.div>
                        
                        <motion.p 
                          className="text-white/70 flex items-center justify-center gap-3 text-lg"
                          whileHover={{ color: "#ffffff", scale: 1.05 }}
                        >
                          <span className="text-2xl">📍</span>
                          {edu.location}
                        </motion.p>
                      </div>
                    </div>

                    {/* Enhanced Floating Particles */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60"
                        animate={{
                          x: [0, Math.cos(i * 45 * Math.PI / 180) * 60],
                          y: [0, Math.sin(i * 45 * Math.PI / 180) * 60],
                          scale: [0.5, 1, 0.5],
                          opacity: [0.6, 0.2, 0.6],
                        }}
                        transition={{
                          duration: 6 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
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

      {/* Portfolio Showcase */}
      <section id="projects" className="py-20 px-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-blue-900/50" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Title */}
            <div className="text-center mb-12">
              <motion.h2 
                className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Portfolio Showcase
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path.
              </motion.p>
            </div>

            {/* Tab Navigation */}
            <motion.div 
              className="flex justify-center mb-12 px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-2 sm:p-3 w-full max-w-4xl overflow-x-auto">
                <div className="flex gap-2 sm:gap-3 min-w-max sm:min-w-0 justify-center">
                  {
                    [
                      { 
                        key: "projects", 
                        label: "Projects", 
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                          </svg>
                        )
                      },
                      { 
                        key: "certificates", 
                        label: "Certificates", 
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                            <circle cx="12" cy="8" r="6"></circle>
                          </svg>
                        )
                      },
                      { 
                        key: "techstack", 
                        label: "Tech Stack", 
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"></path>
                            <path d="m7 16.5-4.74-2.85"></path>
                            <path d="m7 16.5 5-3"></path>
                            <path d="M7 16.5v5.17"></path>
                            <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"></path>
                            <path d="m17 16.5-5-3"></path>
                            <path d="m17 16.5 4.74-2.85"></path>
                            <path d="M17 16.5v5.17"></path>
                            <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"></path>
                            <path d="M12 8 7.26 5.15"></path>
                            <path d="m12 8 4.74-2.85"></path>
                            <path d="M12 13.5V8"></path>
                          </svg>
                        )
                      }
                    ].map((tab) => (
                      <motion.button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`relative px-4 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 ${
                          activeTab === tab.key
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                          <span className="text-lg sm:text-xl lg:text-2xl">{tab.icon}</span>
                          <span className="hidden sm:inline">{tab.label}</span>
                        </span>
                      {activeTab === tab.key && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-xl blur-xl"
                          layoutId="activeTab"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "techstack" && (
                <motion.div
                  key="techstack"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-4">
                    {techStack.map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        className="group relative"
                        initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 100
                        }}
                        whileHover={{ 
                          scale: 1.05, 
                          rotateY: 5,
                          z: 50 
                        }}
                      >
                        {/* Tech Card Glow */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500`} />
                        
                        {/* Tech Card */}
                        <div className="relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 hover:border-blue-400/50 transition-all duration-300 text-center min-h-[120px] sm:min-h-[150px] lg:min-h-[180px] flex flex-col justify-center hover:bg-gray-700/50">
                          {/* Tech Icon */}
                          <motion.div
                            className="mb-4 flex justify-center"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {tech.icon}
                          </motion.div>
                          
                          {/* Tech Name */}
                          <h3 className="text-xs sm:text-sm lg:text-base font-bold text-gray-200 group-hover:text-white transition-colors duration-300">
                            {tech.name}
                          </h3>
                          
                          {/* Floating Particles */}
                          {[...Array(2)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`absolute w-1 h-1 bg-gradient-to-r ${tech.color} rounded-full opacity-0 group-hover:opacity-70`}
                              animate={{
                                x: [0, Math.cos(i * 180 * Math.PI / 180) * 20],
                                y: [0, Math.sin(i * 180 * Math.PI / 180) * 20],
                                scale: [1, 0.5, 1],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.5,
                              }}
                              style={{
                                left: '50%',
                                top: '30%',
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "certificates" && (
                <motion.div
                  key="certificates"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {certificates.map((cert, index) => (
                      <motion.div
                        key={cert.name}
                        className="group relative"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{ scale: 1.05, y: -10 }}
                      >
                        {/* Certificate Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        
                        {/* Certificate Card */}
                        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-yellow-400/50 transition-all duration-300">
                          <div className="text-center">
                            <div className="text-4xl mb-4">🏆</div>
                            <h3 className="text-lg font-bold text-white mb-2">{cert.name}</h3>
                            <p className="text-gray-300 text-sm mb-2">{cert.issuer}</p>
                            <span className="inline-block bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                              {cert.year}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "projects" && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        className="group relative"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        {/* Project Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        
                        {/* Project Card */}
                        <div className="relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden hover:border-blue-400/50 transition-all duration-300">
                          {/* Project Preview */}
                          <div className="h-80 bg-gradient-to-br from-blue-600/20 to-purple-600/20 overflow-hidden relative">
                            {project.image ? (
                              <img 
                                src={project.image} 
                                alt={project.title}
                                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                                  project.id === 'reclaimify' ? 'bg-gradient-to-br from-blue-50 to-gray-100 p-4' : ''
                                }`}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="text-6xl opacity-50">
                                  {project.category === 'web' ? '🌐' : '📱'}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Project Content */}
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-xl font-bold text-white">{project.title}</h3>
                              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                {project.year}
                              </span>
                            </div>
                            
                            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                              {project.desc}
                            </p>
                            
                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tech.split(', ').slice(0, 3).map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="bg-white/10 text-gray-300 px-2 py-1 rounded-lg text-xs"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              <motion.a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl font-bold text-center text-sm hover:shadow-lg transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Live Demo
                              </motion.a>
                              <motion.button
                                onClick={() => setSelectedProject(project)}
                                className="bg-white/10 text-gray-300 px-4 py-2 rounded-xl font-bold text-sm hover:bg-white/20 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Details
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>


      {/* Projects section is now integrated into the Portfolio Showcase above */}

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                <div className="flex items-center gap-4">
                  <motion.button
                    onClick={() => setSelectedProject(null)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    whileHover={{ x: -5 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </motion.button>
                  <div className="text-sm text-gray-400">
                    <span>Projects</span>
                    <span className="mx-2">›</span>
                    <span>{selectedProject.title}</span>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 p-6">
                {/* Left Column - Project Info */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-4">{selectedProject.title}</h1>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {selectedProject.desc}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">
                        {selectedProject.technologies.length}
                      </div>
                      <div className="text-sm text-gray-400">Total Technology</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-1">
                        {selectedProject.features.length}
                      </div>
                      <div className="text-sm text-gray-400">Features</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </motion.a>
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-800/50 text-gray-300 px-6 py-3 rounded-2xl font-bold hover:bg-gray-700/50 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </motion.a>
                  </div>

                  {/* Technologies Used */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Image and Features */}
                <div className="space-y-6">
                  {/* Project Image */}
                  <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl overflow-hidden">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className={`w-full h-80 object-cover ${
                        selectedProject.id === 'reclaimify' ? 'bg-gradient-to-br from-blue-50 to-gray-100 p-4' : ''
                      }`}
                    />
                  </div>

                  {/* Key Features */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Key Features
                    </h3>
                    <div className="space-y-3">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300 leading-relaxed">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6 overflow-hidden bg-gray-900">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-cyan-900/20" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }} />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Let's Connect
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to build something amazing together? Drop me a message and let's create the future!
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Contact Form */}
            <div className="space-y-8">
              {/* Contact Form */}
              <motion.div
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Contact Me</h3>
                  <p className="text-gray-400">Feel free to contact me. I'm excited to hear from you!</p>
                </div>
                <form 
                  className="space-y-6"
                  onSubmit={submitForm}
                >
                  {/* Success Message */}
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-600/20 border border-green-500/50 rounded-xl text-green-400 text-center"
                    >
                      ✅ Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                  
                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-600/20 border border-red-500/50 rounded-xl text-red-400 text-center"
                    >
                      ❌ {error}
                    </motion.div>
                  )}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="flex-1 px-4 py-4 bg-gray-700/30 border-0 rounded-xl text-white placeholder-gray-400 focus:bg-gray-700/50 focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="flex-1 px-4 py-4 bg-gray-700/30 border-0 rounded-xl text-white placeholder-gray-400 focus:bg-gray-700/50 focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <textarea
                      name="message"
                      rows="6"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="flex-1 px-4 py-4 bg-gray-700/30 border-0 rounded-xl text-white placeholder-gray-400 focus:bg-gray-700/50 focus:outline-none transition-all duration-300 resize-none"
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 ${loading ? 'bg-gray-600' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'} text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed`}
                    whileHover={!loading ? { scale: 1.02 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                  >
                    {loading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>

              {/* Connect With Me */}
              <motion.div
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                  <h3 className="text-2xl font-bold text-white">Connect With Me</h3>
                </div>

                {/* LinkedIn - Full Width */}
                <motion.a
                  href="https://www.linkedin.com/in/phyo-min-thein-605168361/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 mb-4 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">Let's Connect</h4>
                      <p className="text-gray-400 text-sm">on LinkedIn</p>
                    </div>
                  </div>
                </motion.a>

                {/* Bottom Row - 2x2 Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Instagram */}
                  <motion.a
                    href="https://instagram.com/kweephyoe_pmt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold group-hover:text-pink-400 transition-colors">Instagram</h4>
                        <p className="text-gray-400 text-sm">@kweephyoe_pmt</p>
                      </div>
                    </div>
                  </motion.a>

                  {/* GitHub */}
                  <motion.a
                    href="https://github.com/kweephyo-pmt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-start gap-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold group-hover:text-gray-300 transition-colors">Github</h4>
                        <p className="text-gray-400 text-sm">@kweephyo-pmt</p>
                      </div>
                    </div>
                  </motion.a>

                  {/* Personal Email */}
                  <motion.a
                    href="mailto:phyominthein.leo@gmail.com"
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-start gap-3">
                      <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold group-hover:text-red-400 transition-colors">Email</h4>
                        <p className="text-gray-400 text-sm">Personal</p>
                      </div>
                    </div>
                  </motion.a>

                  {/* University Email */}
                  <motion.a
                    href="mailto:6531503172@lamduan.mfu.ac.th"
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-start gap-3">
                      <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold group-hover:text-red-400 transition-colors">Email</h4>
                        <p className="text-gray-400 text-sm">University</p>
                      </div>
                    </div>
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Comments Section */}
            <motion.div
              className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Comments ({comments.length})</h3>
              </div>
              
              {/* Comment Form */}
              <form 
                className="mb-8"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target;
                  const formData = new FormData(form);
                  
                  // Handle photo upload
                  const photoFile = formData.get('photo');
                  let photoData = null;
                  
                  if (photoFile && photoFile.size > 0) {
                    // Check file size (5MB limit)
                    if (photoFile.size > 5 * 1024 * 1024) {
                      showNotification('Photo size must be less than 5MB', 'error');
                      return;
                    }
                    
                    // Convert to base64
                    try {
                      photoData = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(photoFile);
                      });
                    } catch (error) {
                      showNotification('Failed to process photo. Please try again.', 'error');
                      return;
                    }
                  }
                  
                  const commentData = {
                    name: formData.get('name'),
                    message: formData.get('message'),
                    photo: photoData
                  };
                  
                  if (!commentData.name || !commentData.message) {
                    showNotification('Please fill in both name and message fields.', 'error');
                    return;
                  }
                  
                  const result = await addComment(commentData);
                  
                  if (result.success) {
                    showNotification('Comment posted successfully!', 'success');
                    form.reset();
                    // Reset photo preview
                    const preview = form.querySelector('.photo-preview');
                    const placeholder = form.querySelector('.upload-placeholder');
                    if (preview && placeholder) {
                      preview.classList.add('hidden');
                      placeholder.classList.remove('hidden');
                    }
                  } else {
                    showNotification(result.message || 'Failed to post comment. Please try again.', 'error');
                  }
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      required
                      className="w-full px-4 py-3 bg-gray-700/30 border-0 rounded-xl text-white placeholder-gray-400 focus:bg-gray-700/50 focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                    <textarea
                      name="message"
                      rows="4"
                      placeholder="Write your message here.."
                      required
                      className="w-full px-4 py-3 bg-gray-700/30 border-0 rounded-xl text-white placeholder-gray-400 focus:bg-gray-700/50 focus:outline-none transition-all duration-300 resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Profile Photo (optional)</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-xl cursor-pointer bg-gray-700/20 hover:bg-gray-700/30 transition-colors overflow-hidden">
                        <div className="upload-placeholder flex flex-col items-center justify-center pt-5 pb-6 z-10">
                          <svg className="w-8 h-8 mb-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mb-2 text-sm text-purple-400 font-semibold">Choose Profile Photo</p>
                          <p className="text-xs text-gray-400">Max file size: 5MB (JPG, PNG, GIF)</p>
                        </div>
                        <input 
                          type="file" 
                          name="photo" 
                          accept="image/*" 
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const preview = e.target.parentElement.querySelector('.photo-preview');
                                const placeholder = e.target.parentElement.querySelector('.upload-placeholder');
                                if (preview && placeholder) {
                                  preview.src = event.target.result;
                                  preview.classList.remove('hidden');
                                  placeholder.classList.add('hidden');
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <img className="photo-preview hidden absolute inset-0 w-full h-full object-cover rounded-lg" alt="Preview" />
                      </label>
                    </div>
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Post Comment
                  </motion.button>
                </div>
              </form>

             
              
              {/* Recent Comments */}
              <div className={`space-y-4 ${comments.length > 5 ? 'max-h-96 overflow-y-auto pr-2 comments-scroll' : ''}`}>
                {commentsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-gray-400 text-sm">Loading comments...</p>
                  </div>
                ) : commentsError ? (
                  <div className="text-center py-8">
                    <p className="text-red-400 text-sm">Error loading comments: {commentsError}</p>
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-sm">No comments yet. Be the first to leave a comment!</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-xl p-4 border ${
                        comment.isPinned 
                          ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border-purple-500/50' 
                          : 'bg-gray-700/30 border-gray-600/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold overflow-hidden ${
                          comment.isPinned 
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                            : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                        }`}>
                          {comment.photo ? (
                            <img 
                              src={comment.photo} 
                              alt={`${comment.name}'s avatar`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            comment.avatar
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-white">{comment.name}</h4>
                            {comment.isPinned && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
                                </svg>
                                Pinned
                              </span>
                            )}
                            <span className="text-gray-400 text-sm">{formatTimeAgo(comment.createdAt)}</span>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">{comment.message}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
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
                  <span className="text-blue-600 dark:text-cyan-400 font-semibold"> Ready to build tomorrow's technology today.</span>
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
                <h4 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Quick Navigation</h4>
                <div className="space-y-3">
                  {['About', 'Experience', 'Projects', 'Contact'].map((item, index) => (
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
                <h4 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Let's Connect</h4>
                
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
      
      {/* Custom Notification */}
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className={`p-4 rounded-lg shadow-lg backdrop-blur-sm border ${
            notification.type === 'success' 
              ? 'bg-green-900/90 border-green-500/50 text-green-100' 
              : 'bg-red-900/90 border-red-500/50 text-red-100'
          }`}>
            <div className="flex items-center space-x-3">
              {notification.type === 'success' ? (
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              )}
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
