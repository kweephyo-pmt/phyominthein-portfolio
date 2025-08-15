# Phyo Min Thein - Portfolio

A modern, interactive React portfolio website showcasing software engineering projects, skills, and professional experience. Built with performance-optimized animations, real-time features, and responsive design.

## 🌟 Features

- **Interactive Animations**: Smooth Framer Motion animations with performance optimizations
- **Dark/Light Theme**: Toggle between themes with seamless transitions
- **Real-time Comments**: PostgreSQL-powered commenting system with Netlify Functions
- **Contact Form**: Integrated email functionality using EmailJS
- **Particle System**: Dynamic background particles with GPU acceleration
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Throttled scroll handlers, CSS animations, and reduced motion support

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Framer Motion** - Advanced animations and transitions
- **Tailwind CSS** - Utility-first CSS framework
- **EmailJS** - Client-side email functionality

### Backend & Database
- **Netlify Functions** - Serverless backend functions
- **PostgreSQL (Neon)** - Cloud database for comments system
- **Nodemailer** - Server-side email handling

### Tools & Deployment
- **Vite** - Fast build tool and development server
- **Netlify** - Hosting and serverless functions
- **Git** - Version control

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- PostgreSQL database (Neon recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/phyominthein-portfolio.git
   cd phyominthein-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   DATABASE_URL=your-neon-postgresql-connection-string
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_SERVICE=gmail
   ```

4. **Database Setup**
   - Create a Neon PostgreSQL database
   - Run the schema from `database/schema.sql`

5. **Start Development Server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
phyominthein-portfolio/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, and media files
│   ├── hooks/             # Custom React hooks
│   │   ├── useComments.js # Comments functionality
│   │   └── useContactForm.js # Contact form logic
│   ├── App.jsx           # Main application component
│   └── index.css         # Global styles
├── netlify/
│   └── functions/        # Serverless functions
│       └── comments.js   # Comments API endpoints
├── database/
│   └── schema.sql        # Database schema
└── netlify.toml          # Netlify configuration
```

## 🎨 Key Components

### Performance Optimizations
- **Throttled Scroll Handlers**: Reduced from multiple listeners to single throttled handler
- **GPU Acceleration**: Using `transform3d` and `will-change` properties
- **Reduced Particle Count**: Optimized from 20 to 12 particles
- **CSS Animations**: Replaced heavy Framer Motion animations where appropriate
- **Accessibility**: `prefers-reduced-motion` support

### Interactive Features
- **Dynamic Typing Effect**: Animated text with cursor
- **Mouse Tracking**: Smooth cursor following animations
- **Scroll Progress**: Visual scroll indicator
- **Section Navigation**: Smooth scrolling between sections
- **Project Showcase**: Interactive project gallery with details

## 🚀 Deployment

### Netlify Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set environment variables in Netlify dashboard
   - Deploy automatically on push to main branch

### Environment Variables (Netlify)
Add these in your Netlify site settings:
- `DATABASE_URL`
- `EMAIL_USER`
- `EMAIL_PASS`
- `EMAIL_SERVICE`

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App (not recommended)

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Desktop**: Full interactive experience with animations
- **Tablet**: Adapted layouts and touch-friendly interactions
- **Mobile**: Simplified animations and optimized performance

## 🎯 Performance Features

- **Lazy Loading**: Images and components loaded on demand
- **Code Splitting**: Optimized bundle sizes
- **Caching**: Static assets cached with long expiration
- **Compression**: Gzip compression enabled
- **SEO Optimized**: Meta tags and semantic HTML

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Phyo Min Thein**
- Portfolio: [Your Portfolio URL]
- Email: [Your Email]
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

---

⭐ Star this repository if you found it helpful!
