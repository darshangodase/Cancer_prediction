import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import AnimatedWrapper from '../components/AnimatedWrapper';

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const featureRefs = [useRef(null), useRef(null), useRef(null)];
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.2 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.1 });
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  
  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 15 };
  const scaleSpring = useSpring(1, springConfig);
  
  useEffect(() => {
    if (isHeroInView) {
      scaleSpring.set(1);
    } else {
      scaleSpring.set(0.95);
    }
  }, [isHeroInView, scaleSpring]);
  
  // Auto-changing feature highlight
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % featureItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }
  };
  
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const featureItems = [
    {
      title: "Early Detection",
      description: "Our AI model analyzes your symptoms and medical history to provide early warnings of potential cancer indicators.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Personalized Analysis",
      description: "Get a personalized analysis based on your specific symptoms, age, gender, and medical history.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Immediate Results",
      description: "Receive your prediction results immediately, along with confidence levels and recommendations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <AnimatedWrapper>
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-50"
        style={{ 
          scale: scaleSpring,
          paddingTop: "5rem",
          paddingBottom: "5rem" 
        }}
      >
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-100 opacity-50"
            style={{ y, opacity }}
          />
          <motion.div
            className="absolute right-0 top-1/4 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-30"
            animate={{ 
              x: [50, -30, 50],
              y: [-50, 30, -50]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          <motion.div
            className="absolute left-1/4 bottom-1/4 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl opacity-20"
            animate={{ 
              x: [-40, 60, -40],
              y: [60, -40, 60]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        </div>

        <motion.div 
          className="container mx-auto px-4 md:px-6 z-10 pt-20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div 
              className="flex-1 z-10"
              initial={{ opacity: 0, x: -80 }}
              animate={{ 
                opacity: isHeroInView ? 1 : 0,
                x: isHeroInView ? 0 : -80
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
              }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                <motion.span className="block"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Early Cancer
                </motion.span>
                <motion.span 
                  className="block text-blue-600"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Detection with AI
                </motion.span>
              </h1>
              
              <motion.p 
                className="text-xl text-gray-600 mb-8 max-w-lg"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
Get personalized cancer risk predictions using advanced machine learning algorithms. Early detection saves lives.              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-5"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Link to="/predict">
                  <motion.button
                    className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Your Prediction
                  </motion.button>
                </Link>
                <Link to="/about">
                  <motion.button
                    className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                  </motion.button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="mt-10 flex items-center space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="flex -space-x-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white ${['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'][i]}`}></div>
                  ))}
                </div>
                <p className="text-gray-600 font-medium">Join <span className="text-blue-600 font-bold">2,500+</span> users who trust our AI</p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex-1 relative z-10"
              initial={{ opacity: 0, x: 80 }}
              animate={{ 
                opacity: isHeroInView ? 1 : 0,
                x: isHeroInView ? 0 : 80
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.5
              }}
            >
              <div className="grid grid-cols-2 gap-4 relative">
                {/* 3D Card Stack - Main Card */}
                <motion.div 
                  className="col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 shadow-2xl text-white overflow-hidden relative"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute -right-12 -top-12 w-40 h-40 bg-blue-400 opacity-20 rounded-full blur-xl"></div>
                  <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-indigo-400 opacity-20 rounded-full blur-xl"></div>
                  
                  <div className="flex items-start mb-4">
                    <div className="mr-4 bg-white/20 p-3 rounded-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">AI Cancer Detection</h3>
                      <p className="text-sm text-white/80">Our AI analyzes symptoms to identify potential warning signs early.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 h-36 rounded-xl flex items-center justify-center overflow-hidden relative">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      animate={{ 
                        x: ['-100%', '100%']
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        repeatType: "loop", 
                        ease: "linear" 
                      }}
                    />
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="relative z-10 flex flex-col items-center"
                    >
                      <svg viewBox="0 0 640 512" className="h-16 w-16 text-white" fill="currentColor">
                        <path d="M277.4 4.002C283.5-1.334 292.5-1.334 298.6 4.002L384 79.37V56C384 42.75 394.7 31.1 408 31.1H464C477.3 31.1 488 42.75 488 56V192.5L578.6 274C584.5 279.3 586.2 287.9 582.2 295.1C578.2 302.4 570.3 306.1 562.9 305.1C562.3 305.1 561.1 305.1 560.8 305.1L359.9 288.4C349.8 286.9 342.3 278.2 342.3 268V224C342.3 206.4 358.7 192 379.2 192C392.3 192 406.7 200.3 414.9 210.9L464 192.5V122.7L432 152.2V184C432 197.3 421.3 208 408 208H400C386.7 208 376 197.3 376 184V168.2L277.4 82.51L206.1 146.5C223.5 155.1 235.9 173.5 235.9 194.2C235.9 206.1 231.3 217.9 222.9 226.3L237.6 240.9C249.1 253.3 249.1 272.7 237.6 285.1C225.1 297.6 205.8 297.6 193.3 285.1L126.1 218.9C121.6 214.4 121.6 206.6 126.1 202.1C130.6 197.6 138.4 197.6 142.9 202.1L209.1 269.3C214.5 273.8 222.3 273.8 226.8 269.3C231.3 264.8 231.3 257 226.8 252.5L212.1 237.8C202.4 246.2 189.6 250.8 175.9 250.8C141.1 250.8 113.9 222.7 113.9 187.1C113.9 154.2 140.1 128 173.9 128C175.9 128 177.1 128.1 179.9 128.3L255.4 60.18L277.4 4.002zM173.9 144C149 144 129.9 164 129.9 187.1C129.9 212.9 149 231.1 173.9 231.1C198.8 231.1 217.8 212.9 217.8 187.1C217.8 164 198.8 144 173.9 144zM32 384C32 383.3 32.06 382.7 32.18 382.1L64 328.5V312C64 298.7 74.75 288 88 288H119.5L132.9 264.2C138.3 253.6 151.8 249.3 162.4 254.8C173.1 260.3 177.4 273.8 171.9 284.4L154.3 317.9C151.9 322.8 146.9 328.5 139.5 328.5H88V344.5L48.18 410.1C44.99 416 38.87 424.5 32 424.5C25.13 424.5 19.01 416 15.82 410.1L.8261 384H32zM205.7 328.5C191.5 328.5 179.7 317.1 178.1 303.1L175.2 271.1C174.4 264.4 178.3 255.9 184.5 252.2L229.1 224H235.5C249.7 224 261.5 235.4 263.1 249.4L266 281.4C266.8 288.1 262.9 297.5 256.7 301.2L211.2 328.5H205.7zM327.5 379.7C327.5 373.4 329.9 367.4 334 363.3L384 313.3V288.5H373.3C359.1 288.5 349.3 277.7 349.3 264.5V215.1C349.3 202.7 359.1 191.1 373.3 191.1H438.7C451.9 191.1 462.7 202.7 462.7 215.1V264.5C462.7 277.7 451.9 288.5 438.7 288.5H428V334.7C428 345.9 423.6 356.5 415.5 364.7L373.3 406.9C365.1 414.1 354.5 419.4 343.3 419.4H334.6C330.7 419.4 327.5 416.2 327.5 412.3V379.7zM514.1 287.5L574.2 296.8C584.4 298.1 591.1 306.8 591.1 317.2V342.5C591.1 376.5 564.5 403.1 530.5 403.1H464.2C457.3 403.1 451.5 398.2 451.5 391.2V299.8C451.5 292.8 457.3 286.1 464.2 286.1L514.1 287.5zM630.8 469.1L608.1 411.1C602.6 398.6 588.1 394.8 576.4 401.9C565.7 409 561.8 425.1 568.8 436.8L591.5 494.8C597.1 507.4 611.5 511.2 623.2 504.1C634.9 496.1 638.8 480.8 631.8 469.1H630.8z"/>
                      </svg>
                      <div className="text-sm font-semibold mt-2">Early Detection</div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Symptom Analysis Card */}
                <motion.div 
                  className="bg-white rounded-2xl p-5 shadow-xl border border-gray-100"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="bg-red-100 p-2 rounded-lg mr-3">
                        <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 16L10.879 13.121M10.879 13.121L12 12M10.879 13.121C10.3752 13.6249 10.0587 14.2859 10.0059 14.9888C9.95318 15.6918 10.1667 16.3879 10.6057 16.9563C11.0447 17.5247 11.6799 17.9368 12.3917 18.1161C13.1035 18.2955 13.8529 18.232 14.5203 17.9367C15.1877 17.6414 15.7343 17.1326 16.0645 16.4941C16.3947 15.8556 16.4896 15.1257 16.335 14.424C16.1804 13.7222 15.7842 13.0903 15.2146 12.626C14.645 12.1617 13.9346 11.8904 13.2 11.85M15 8C15 8.53043 14.7893 9.03914 14.4142 9.41421C14.0391 9.78929 13.5304 10 13 10C12.4696 10 11.9609 9.78929 11.5858 9.41421C11.2107 9.03914 11 8.53043 11 8C11 7.46957 11.2107 6.96086 11.5858 6.58579C11.9609 6.21071 12.4696 6 13 6C13.5304 6 14.0391 6.21071 14.4142 6.58579C14.7893 6.96086 15 7.46957 15 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <h3 className="font-bold text-gray-900">Symptom Analysis</h3>
                    </div>
                    <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Critical</div>
                  </div>
                  
                  <ul className="mb-3">
                    {[
                      "Persistent cough",
                      "Unexplained weight loss",
                      "Unusual fatigue"
                    ].map((symptom, i) => (
                      <motion.li 
                        key={i} 
                        className="text-xs flex items-center text-gray-600 mb-1.5"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + (i * 0.1) }}
                      >
                        <svg className="w-3 h-3 text-red-500 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        {symptom}
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.div 
                    className="h-2 bg-gray-200 rounded-full mb-1"
                    initial={{ width: "10%" }}
                    animate={{ width: "75%" }}
                    transition={{ delay: 1, duration: 1 }}
                  >
                    <div className="h-2 bg-red-500 rounded-full w-[75%]"></div>
                  </motion.div>
                  <div className="text-right text-xs text-gray-500">Risk Score: 75%</div>
                </motion.div>

                {/* Medical History Card */}
                <motion.div 
                  className="bg-blue-50 rounded-2xl p-5 shadow-xl border border-blue-100"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, type: "spring" }}
                >
                  <div className="flex items-center mb-3">
                    <div className="mr-3 bg-blue-100 p-2 rounded-lg">
                      <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 14L15 8M9.00001 8H9M15 14H15.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900">Medical Factors</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="bg-white rounded-lg p-2 border border-blue-100">
                      <div className="text-xs text-gray-500">Age</div>
                      <div className="font-bold text-gray-800">42</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-blue-100">
                      <div className="text-xs text-gray-500">Gender</div>
                      <div className="font-bold text-gray-800">Female</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-2 rounded-lg border border-blue-100 mb-1">
                    <div className="flex items-center text-xs text-gray-600">
                      <svg className="w-3 h-3 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span className="text-gray-500">Family history of cancer</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <p className="text-gray-500 mb-2">Scroll to explore</p>
            <motion.div
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1"
              initial={{ y: 0 }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div className="w-2 h-2 bg-blue-500 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-white" ref={featuresRef}>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              <span className="relative inline-block">
                Key Features
                <motion.div 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-500"
                  initial={{ width: 0 }}
                  animate={isFeaturesInView ? { width: "100%" } : {}}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines advanced AI technology with medical expertise to provide you with accurate cancer risk assessments.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate={isFeaturesInView ? "animate" : ""}
          >
            {featureItems.map((feature, index) => (
              <motion.div
                key={index}
                ref={featureRefs[index]}
                className={`bg-white p-8 rounded-xl border border-gray-100 transition-all duration-500 ${activeFeature === index ? 'shadow-2xl scale-105 border-blue-100 bg-gradient-to-br from-white to-blue-50' : 'shadow-md hover:shadow-xl'}`}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                onClick={() => setActiveFeature(index)}
              >
                <motion.div 
                  className="mb-6 flex justify-center"
                  animate={activeFeature === index ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
                
                <motion.div 
                  className="mt-6 flex justify-center"
                  initial={{ opacity: 0, height: 0 }}
                  animate={activeFeature === index ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <button className="text-blue-600 font-medium flex items-center space-x-1 group">
                    <span>Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              <motion.span 
                className="inline-block relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                How Cancer<span className="text-blue-600">Predict</span> Works
                <motion.svg 
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-blue-500 w-24 h-4"
                  viewBox="0 0 100 15"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <path
                    d="M0,5 C30,15 70,0 100,5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </motion.span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8">
              Our cancer prediction process is designed to be simple, accurate, and secure.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Process Step 1 */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0 }}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-6 px-6 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-4">
                    <div className="text-2xl font-bold text-blue-600">1</div>
                  </div>
                  <h3 className="text-xl font-bold text-white">Submit Your Information</h3>
                </div>
                
                <div className="p-6">
                  <div className="flex mb-4">
                    <div className="p-3 rounded-xl bg-blue-100 mr-4">
                      <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V13M17.5858 3.58579C18.3668 2.80474 19.6332 2.80474 20.4142 3.58579C21.1953 4.36683 21.1953 5.63316 20.4142 6.41421L11.8284 15H9L9 12.1716L17.5858 3.58579Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-gray-600">Input your symptoms, medical history, and demographic details into our secure form.</p>
                  </div>
                  
                  <ul className="space-y-2 mt-4">
                    {[
                      "Age, gender, and health metrics",
                      "Current and past symptoms",
                      "Family history of cancer",
                      "Lifestyle factors"
                    ].map((detail, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center text-sm text-gray-700"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                      >
                        <svg className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="px-6 pb-6">
                  <motion.div 
                    className="w-full h-1 bg-blue-100 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    <motion.div 
                      className="h-full bg-blue-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 1 }}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Process Step 2 */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 py-6 px-6 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-4">
                    <div className="text-2xl font-bold text-indigo-600">2</div>
                  </div>
                  <h3 className="text-xl font-bold text-white">AI Analysis</h3>
                </div>
                
                <div className="p-6">
                  <div className="flex mb-4">
                    <div className="p-3 rounded-xl bg-indigo-100 mr-4">
                      <svg className="w-8 h-8 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.5 3.5C14.5 3.5 14.5 5.5 12 5.5C9.5 5.5 9.5 3.5 9.5 3.5H7.5L4.5 6.5V18.5C4.5 19.0523 4.94772 19.5 5.5 19.5H18.5C19.0523 19.5 19.5 19.0523 19.5 18.5V6.5L16.5 3.5H14.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.5 6.5H19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.5 11.5L11 13L14.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-gray-600">Our advanced machine learning algorithms analyze your data against extensive medical databases.</p>
                  </div>
                  
                  <ul className="space-y-2 mt-4">
                    {[
                      "Pattern recognition technology",
                      "Comparison with medical research",
                      "Risk factor calculation",
                      "Precision diagnostics"
                    ].map((detail, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center text-sm text-gray-700"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + (i * 0.1) + 0.2 }}
                      >
                        <svg className="w-4 h-4 text-indigo-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="px-6 pb-6">
                  <motion.div 
                    className="w-full h-1 bg-indigo-100 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 + 0.2 }}
                  >
                    <motion.div 
                      className="h-full bg-indigo-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 1 + 0.2 }}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Process Step 3 */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 py-6 px-6 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-4">
                    <div className="text-2xl font-bold text-purple-600">3</div>
                  </div>
                  <h3 className="text-xl font-bold text-white">Get Detailed Results</h3>
                </div>
                
                <div className="p-6">
                  <div className="flex mb-4">
                    <div className="p-3 rounded-xl bg-purple-100 mr-4">
                      <svg className="w-8 h-8 text-purple-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13 3V7C13 8.10457 13.8954 9 15 9H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-gray-600">Receive a comprehensive assessment with risk scoring and personalized recommendations.</p>
                  </div>
                  
                  <ul className="space-y-2 mt-4">
                    {[
                      "Cancer risk percentage",
                      "Confidence level assessment",
                      "Recommended next steps",
                      "Doctor consultation guidance"
                    ].map((detail, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center text-sm text-gray-700"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + (i * 0.1) + 0.4 }}
                      >
                        <svg className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="px-6 pb-6">
                  <motion.div 
                    className="w-full h-1 bg-purple-100 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 + 0.4 }}
                  >
                    <motion.div 
                      className="h-full bg-purple-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 1 + 0.4 }}
                    />
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Connecting lines for desktop */}
              <motion.div 
                className="hidden md:block absolute top-1/3 left-[30%] w-[40%] h-0.5 bg-gray-200"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            </div>
            
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <Link to="/predict">
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Your Assessment
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials/Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "97%", text: "Accuracy in clinical trials" },
              { number: "2,500+", text: "Users trust our platform" },
              { number: "5 min", text: "Average time to get results" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-blue-50 rounded-xl p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <motion.h3 
                  className="text-5xl font-bold text-blue-600 mb-4"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.2 + index * 0.1 }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-xl text-gray-700">{stat.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <motion.div
          className="absolute -right-40 -top-40 w-96 h-96 bg-blue-500 opacity-20 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-500 opacity-20 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready for your cancer risk assessment?</h2>
            <p className="text-2xl mb-10 max-w-3xl mx-auto">
              Early detection can significantly improve treatment outcomes. Take the first step today.
            </p>
            <Link to="/predict">
              <motion.button
                className="px-10 py-5 bg-white text-blue-600 font-bold text-xl rounded-xl hover:bg-blue-50 transition-colors duration-300 shadow-lg"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Assessment Now
              </motion.button>
            </Link>
            
            <motion.div 
              className="mt-10 max-w-xl mx-auto bg-blue-500/30 rounded-lg p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-sm md:text-base">
                "This platform helped me identify early warning signs that led to a life-saving early diagnosis. I'm forever grateful."
                <span className="block mt-2 font-semibold">— Sarah, 42,Cancer Survivor</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </AnimatedWrapper>
  );
};

export default Home; 