// import { motion, useInView } from 'framer-motion';
// import { useRef, useState, useEffect } from 'react';
// import {
//   Zap,
//   Leaf,
//   Users,
//   Award,
//   Target,
//   Heart,
//   Shield,
//   Sun,
//   Battery,
//   TrendingUp,
//   CheckCircle,
//   Star,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react';
// import about1 from '../assets/about1.jpg';
// import about2 from '../assets/about2.jpg';

// const AboutUs = () => {
//   const heroRef = useRef(null);
//   const aboutRef = useRef(null);
//   const valuesRef = useRef(null);
//   const statsRef = useRef(null);
//   const storyRef = useRef(null);

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [autoScroll, setAutoScroll] = useState(true);

//   const aboutImages = [about1, about2];

//   const heroInView = useInView(heroRef, { once: true, threshold: 0.1 });
//   const aboutInView = useInView(aboutRef, { once: true, threshold: 0.1 });
//   const valuesInView = useInView(valuesRef, { once: true, threshold: 0.1 });
//   const statsInView = useInView(statsRef, { once: true, threshold: 0.1 });
//   const storyInView = useInView(storyRef, { once: true, threshold: 0.1 });

//   // Auto-scroll effect
//   useEffect(() => {
//     if (!autoScroll) return;

//     const interval = setInterval(() => {
//       setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length);
//     }, 5000); // Change every 5 seconds

//     return () => clearInterval(interval);
//   }, [autoScroll, aboutImages.length]);

//   const handlePrevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + aboutImages.length) % aboutImages.length);
//     setAutoScroll(false);
//     setTimeout(() => setAutoScroll(true), 8000);
//   };

//   const handleNextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length);
//     setAutoScroll(false);
//     setTimeout(() => setAutoScroll(true), 8000);
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         duration: 0.6
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" }
//     }
//   };

//   const slideInLeft = {
//     hidden: { opacity: 0, x: -50 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.8, ease: "easeOut" }
//     }
//   };

//   const slideInRight = {
//     hidden: { opacity: 0, x: 50 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.8, ease: "easeOut" }
//     }
//   };
//   const values = [
//     {
//       icon: <Leaf className="w-8 h-8 text-[#39b54a]" />,
//       title: "Voluntary Sustainability",
//       description: "We see a world where energy flows in harmony with nature."
//     },
//     {
//       icon: <Star className="w-8 h-8 text-[#39b54a]" />,
//       title: "Elegant Innovation",
//       description: "Every solution we design is efficient, cutting-edge, and effortlessly stylish."
//     },
//     {
//       icon: <Users className="w-8 h-8 text-[#39b54a]" />,
//       title: "Empowered Communities",
//       description: "We believe solar energy isn’t just power—it’s possibility."
//     }
//   ];
//   const stats = [
//     {
//       icon: <Users className="w-12 h-12 text-white" />,
//       number: "2500+",
//       label: "consulted Clients",
//       color: "from-blue-500 to-blue-600"
//     },
//     {
//       icon: <Zap className="w-12 h-12 text-white" />,
//       number: "1800+",
//       label: "Project Success",
//       color: "from-green-500 to-green-600"
//     },
//     {
//       icon: <Award className="w-12 h-12 text-white" />,
//       number: "70+",
//       label: "Team Members",
//       color: "from-purple-500 to-purple-600"
//     },
//     {
//       icon: <TrendingUp className="w-12 h-12 text-white" />,
//       number: "99%",
//       label: "Client Satisfaction",
//       color: "from-orange-500 to-orange-600"
//     }
//   ];
//   const achievements = [
//     "Leading solar installer in Australia",
//     "Award-winning customer service",
//     "Certified Clean Energy Council installer",
//     // "25+ years combined industry experience",
//     "Premium Tier 1 solar panel partnerships",
//   ];

//   return (
//     <div className="min-h-screen bg-white">

//       {/* Hero Section */}
//       <section
//         ref={heroRef}
//         className="relative pt-20 pb-16 bg-gradient-to-br from-[#1e2d53] via-[#2a3f6b] to-[#1e2d53] overflow-hidden"
//       >
//         {/* Background Pattern */}
//         < div className="absolute inset-0 opacity-10" >
//           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-3"></div>
//           <div className="absolute top-20 right-0 w-64 h-64 bg-[#39b54a]/20 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
//         </div >
//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate={heroInView ? "visible" : "hidden"}
//             className="space-y-8"
//           >
//             <motion.h1
//               variants={itemVariants}
//               className="text-5xl md:text-7xl font-extrabold text-white leading-tight"
//             >
//               About Us
//             </motion.h1>
//             <motion.p
//               variants={itemVariants}
//               className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
//             >
//               Pioneering Australia's sustainable energy future with innovative solar solutions
//             </motion.p>
//             <motion.div
//               variants={itemVariants}
//               className="flex justify-center space-x-8 pt-8"
//             >
//               {[Sun, Zap, Battery].map((Icon, index) => (
//                 <motion.div
//                   key={index}
//                   animate={{
//                     rotate: 360,
//                     scale: [1, 1.1, 1]
//                   }}
//                   transition={{
//                     rotate: { duration: 20, repeat: Infinity, ease: "linear" },
//                     scale: { duration: 2, repeat: Infinity, delay: index * 0.5 }
//                   }}
//                   className="w-16 h-16 bg-[#39b54a]/20 rounded-full flex items-center justify-center backdrop-blur-sm"
//                 >
//                   <Icon className="w-8 h-8 text-[#39b54a]" />
//                 </motion.div>
//               ))}
//             </motion.div>
//           </motion.div>
//         </div>
//       </section >

//       {/* About Company Section */}
//       < section ref={aboutRef} className="py-20 bg-white" >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">

//             {/* Left - Image Carousel */}
//             <motion.div
//               variants={slideInLeft}
//               initial="hidden"
//               animate={aboutInView ? "visible" : "hidden"}
//               className="relative"
//             >
//               <div className="relative overflow-hidden rounded-3xl shadow-2xl h-[500px]">
//                 {/* Image Carousel */}
//                 <motion.div
//                   key={currentImageIndex}
//                   initial={{ opacity: 0, scale: 1.05 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.95 }}
//                   transition={{ duration: 0.8 }}
//                   className="absolute inset-0"
//                 >
//                   <img
//                     src={aboutImages[currentImageIndex]}
//                     alt={`About us ${currentImageIndex + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </motion.div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>

//                 {/* Navigation Buttons */}
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handlePrevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#1e2d53] p-3 rounded-full shadow-lg transition-all"
//                 >
//                   <ChevronLeft className="w-6 h-6" />
//                 </motion.button>

//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleNextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#1e2d53] p-3 rounded-full shadow-lg transition-all"
//                 >
//                   <ChevronRight className="w-6 h-6" />
//                 </motion.button>

//                 {/* Dot Indicators */}
//                 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
//                   {aboutImages.map((_, index) => (
//                     <motion.button
//                       key={index}
//                       onClick={() => {
//                         setCurrentImageIndex(index);
//                         setAutoScroll(false);
//                         setTimeout(() => setAutoScroll(true), 8000);
//                       }}
//                       className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex
//                         ? 'bg-white w-8'
//                         : 'bg-white/60 hover:bg-white/80'
//                         }`}
//                       whileHover={{ scale: 1.2 }}
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* Floating Badge */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
//                 animate={aboutInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
//                 transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
//                 className="absolute -top-6 -right-6 bg-red-500 text-white p-4 rounded-2xl shadow-xl"
//               >
//                 <div className="text-center">
//                   <div className="text-xs font-bold uppercase tracking-wide">About Company</div>
//                   <div className="w-8 h-1 bg-white/60 mx-auto mt-2 rounded-full"></div>
//                 </div>
//               </motion.div>
//             </motion.div>

//             {/* Right - Content */}
//             <motion.div
//               variants={slideInRight}
//               initial="hidden"
//               animate={aboutInView ? "visible" : "hidden"}
//               className="space-y-8"
//             >
//               <div>
//                 <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1e2d53] mb-6 leading-tight">
//                   Innovating for a
//                   <span className="text-[#39b54a] block">Sustainable Future</span>
//                 </h2>
//                 <p className="text-lg text-gray-600 leading-relaxed mb-6">
//                   At Aussie Smart Energy, we transform sunlight into opportunity. Guided by a vision of a cleaner, greener future, we create innovative solar solutions that empower homes, businesses, and communities to thrive sustainably.                </p>
//                 <p className="text-lg text-gray-600 leading-relaxed">
//                   Blending cutting-edge technology with elegant design, we deliver systems that reduce carbon footprints while enhancing energy independence. More than a solar company, we’re your partner in building a brighter, more sustainable world—one powered by the sun.
//                 </p>
//               </div>

//               <div className="grid grid-cols-2 gap-6">
//                 {achievements.slice(0, 4).map((achievement, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={aboutInView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ delay: 0.6 + index * 0.1 }}
//                     className="flex items-center space-x-3"
//                   >
//                     <CheckCircle className="w-5 h-5 text-[#39b54a] flex-shrink-0" />
//                     <span className="text-sm font-medium text-gray-700">{achievement}</span>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section >

//       {/* Values Section */}
//       < section ref={valuesRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate={valuesInView ? "visible" : "hidden"}
//             className="text-center mb-16"
//           >
//             <motion.h2
//               variants={itemVariants}
//               className="text-4xl lg:text-5xl font-extrabold text-[#1e2d53] mb-6"
//             >
//               What Defines Us
//             </motion.h2>
//             <motion.div
//               variants={itemVariants}
//               className="w-24 h-1 bg-red-500 mx-auto rounded-full mb-8"
//             ></motion.div>
//             <motion.p
//               variants={itemVariants}
//               className="text-lg text-gray-600 max-w-3xl mx-auto"
//             >
//               At Aussie Smart Energy, we’re not just building solar systems—we’re illuminating the path to a more radiant future.
//               Join us, and let’s create something extraordinary under the sun.
//             </motion.p>
//           </motion.div>

//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate={valuesInView ? "visible" : "hidden"}
//             className="grid md:grid-cols-3 gap-8"
//           >
//             {values.map((value, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.05, y: -10 }}
//                 className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
//               >
//                 <motion.div
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                   className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#39b54a]/10"
//                 >
//                   {value.icon}
//                 </motion.div>
//                 <h3 className="text-xl font-bold text-[#1e2d53] mb-4">{value.title}</h3>
//                 <p className="text-gray-600 leading-relaxed">{value.description}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section >

//       {/* Stats Section */}
//       < section ref={statsRef} className="py-20 bg-gradient-to-br from-[#1e2d53] to-[#2a3f6b] relative overflow-hidden" >
//         {/* Background Pattern */}
//         < div className="absolute inset-0 opacity-10" >
//           <div className="absolute top-0 right-0 w-96 h-96 bg-[#39b54a] rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
//         </div >

//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate={statsInView ? "visible" : "hidden"}
//             className="grid md:grid-cols-4 gap-8"
//           >
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.05 }}
//                 className="text-center group"
//               >
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={statsInView ? { scale: 1 } : {}}
//                   transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
//                   className={`w-24 h-24 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-300`}
//                 >
//                   {stat.icon}
//                 </motion.div>
//                 <motion.h3
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={statsInView ? { opacity: 1, y: 0 } : {}}
//                   transition={{ delay: index * 0.2 + 0.3 }}
//                   className="text-4xl font-extrabold text-white mb-2"
//                 >
//                   {stat.number}
//                 </motion.h3>
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={statsInView ? { opacity: 1, y: 0 } : {}}
//                   transition={{ delay: index * 0.2 + 0.4 }}
//                   className="text-blue-200 font-medium"
//                 >
//                   {stat.label}
//                 </motion.p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section >

//       {/* Story Section */}
//       < section ref={storyRef} className="py-20 bg-white" >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">

//             {/* Left - Content */}
//             <motion.div
//               variants={slideInLeft}
//               initial="hidden"
//               animate={storyInView ? "visible" : "hidden"}
//               className="space-y-8"
//             >
//               <div>
//                 <div className="text-red-500 text-sm font-bold uppercase tracking-wider mb-4">
//                   OUR EXPERIENCE
//                 </div>
//                 <div className="w-16 h-1 bg-red-500 rounded-full mb-8"></div>
//               </div>

//               <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1e2d53] leading-tight">
//                 Solar Passion
//                 <span className="text-[#39b54a] block">Unveiled Our Story</span>
//               </h2>

//               <p className="text-lg text-gray-600 leading-relaxed">
//                 Our design philosophy is more than aesthetics; it’s a dynamic process That delves into the heart of each brand, understanding its story, Values, and aspirations. We believe in the
//               </p>

//               <div className="space-y-4">
//                 <motion.div
//                   className="space-y-2"
//                   initial={{ opacity: 0, x: -30 }}
//                   animate={storyInView ? { opacity: 1, x: 0 } : {}}
//                   transition={{ delay: 0.5 }}
//                 >
//                   <div className="flex justify-between items-center">
//                     <span className="text-[#1e2d53] font-bold">Solar Panel</span>
//                     <span className="text-[#1e2d53] font-bold">90%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <motion.div
//                       className="bg-red-500 h-2 rounded-full"
//                       initial={{ width: 0 }}
//                       animate={storyInView ? { width: "90%" } : {}}
//                       transition={{ delay: 0.8, duration: 1 }}
//                     ></motion.div>
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   className="space-y-2"
//                   initial={{ opacity: 0, x: -30 }}
//                   animate={storyInView ? { opacity: 1, x: 0 } : {}}
//                   transition={{ delay: 0.7 }}
//                 >
//                   <div className="flex justify-between items-center">
//                     <span className="text-[#1e2d53] font-bold">Storage Battery</span>
//                     <span className="text-[#1e2d53] font-bold">75%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <motion.div
//                       className="bg-red-500 h-2 rounded-full"
//                       initial={{ width: 0 }}
//                       animate={storyInView ? { width: "75%" } : {}}
//                       transition={{ delay: 1, duration: 1 }}
//                     ></motion.div>
//                   </div>
//                 </motion.div>
//               </div>
//             </motion.div>

//             {/* Right - Image */}
//             <motion.div
//               variants={slideInRight}
//               initial="hidden"
//               animate={storyInView ? "visible" : "hidden"}
//               className="relative"
//             >
//               <div className="relative overflow-hidden rounded-3xl shadow-2xl">
//                 <img
//                   src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
//                   alt="Solar installation aerial view"
//                   className="w-full h-[500px] object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
//               </div>

//               {/* Decorative Elements */}
//               <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#39b54a]/20 rounded-full blur-xl"></div>
//               <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
//             </motion.div>
//           </div>
//         </div>
//       </section >
//     </div >
//   );
// };

// export default AboutUs;

import { motion, useInView, useScroll, useTransform, useMotionValue, animate } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  Zap,
  Leaf,
  Users,
  Award,
  Target,
  Heart,
  Shield,
  Sun,
  Battery,
  TrendingUp,
  CheckCircle,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import about1 from '../assets/about1.jpg';
import about2 from '../assets/about2.jpg';

// Shared elegant easing curve for a premium, unhurried feel
const EASE = [0.22, 1, 0.36, 1];

// Small helper: animates a numeric stat (e.g. "2500+", "99%") counting up
// from 0 once its section scrolls into view.
const CountUp = ({ value, inView, duration = 1.6, delay = 0 }) => {
  const spanRef = useRef(null);
  const hasRun = useRef(false);
  const numeric = parseFloat(value) || 0;
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    if (!inView || hasRun.current || !spanRef.current) return;
    hasRun.current = true;
    const controls = animate(0, numeric, {
      duration,
      delay,
      ease: EASE,
      onUpdate(v) {
        if (spanRef.current) {
          spanRef.current.textContent = `${Math.round(v)}${suffix}`;
        }
      }
    });
    return () => controls.stop();
  }, [inView]);

  return <span ref={spanRef}>0{suffix}</span>;
};

const AboutUs = () => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const valuesRef = useRef(null);
  const statsRef = useRef(null);
  const storyRef = useRef(null);
  const storyImgRef = useRef(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  const aboutImages = [about1, about2];

  const heroInView = useInView(heroRef, { once: true, threshold: 0.1 });
  const aboutInView = useInView(aboutRef, { once: true, threshold: 0.1 });
  const valuesInView = useInView(valuesRef, { once: true, threshold: 0.1 });
  const statsInView = useInView(statsRef, { once: true, threshold: 0.1 });
  const storyInView = useInView(storyRef, { once: true, threshold: 0.1 });

  // Subtle parallax on the story image as the section scrolls through view
  const { scrollYProgress: storyScroll } = useScroll({
    target: storyImgRef,
    offset: ['start end', 'end start']
  });
  const storyImgY = useTransform(storyScroll, [0, 1], [30, -30]);

  // Mouse-tracked parallax for the hero icons — drifts gently toward the cursor
  const heroIconX = useMotionValue(0);
  const heroIconY = useMotionValue(0);
  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / 25;
    const relY = (e.clientY - rect.top - rect.height / 2) / 25;
    animate(heroIconX, relX, { duration: 0.6, ease: EASE });
    animate(heroIconY, relY, { duration: 0.6, ease: EASE });
  };
  const handleHeroMouseLeave = () => {
    animate(heroIconX, 0, { duration: 0.8, ease: EASE });
    animate(heroIconY, 0, { duration: 0.8, ease: EASE });
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [autoScroll, aboutImages.length]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + aboutImages.length) % aboutImages.length);
    setAutoScroll(false);
    setTimeout(() => setAutoScroll(true), 8000);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length);
    setAutoScroll(false);
    setTimeout(() => setAutoScroll(true), 8000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // New: gentle fade+rise for achievement rows, with a bit of bounce
  const achievementVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.96 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.6 + i * 0.12, duration: 0.55, ease: EASE }
    })
  };

  // New: slow ambient float for hero background blobs
  const floatBlob = {
    animate: (custom) => ({
      y: [0, custom, 0],
      x: [0, custom / 2, 0],
      transition: {
        duration: 8 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  const values = [
    {
      icon: <Leaf className="w-8 h-8 text-[#39b54a]" />,
      title: "Voluntary Sustainability",
      description: "We see a world where energy flows in harmony with nature."
    },
    {
      icon: <Star className="w-8 h-8 text-[#39b54a]" />,
      title: "Elegant Innovation",
      description: "Every solution we design is efficient, cutting-edge, and effortlessly stylish."
    },
    {
      icon: <Users className="w-8 h-8 text-[#39b54a]" />,
      title: "Empowered Communities",
      description: "We believe solar energy isn’t just power—it’s possibility."
    }
  ];
  const stats = [
    {
      icon: <Users className="w-12 h-12 text-white" />,
      number: "2500+",
      label: "consulted Clients",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Zap className="w-12 h-12 text-white" />,
      number: "1800+",
      label: "Project Success",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Award className="w-12 h-12 text-white" />,
      number: "70+",
      label: "Team Members",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-white" />,
      number: "99%",
      label: "Client Satisfaction",
      color: "from-orange-500 to-orange-600"
    }
  ];
  const achievements = [
    "Leading solar installer in Australia",
    "Award-winning customer service",
    "Certified Clean Energy Council installer",
    // "25+ years combined industry experience",
    "Premium Tier 1 solar panel partnerships",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="min-h-screen bg-white"
    >

      {/* Hero Section */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative pt-20 pb-16 bg-gradient-to-br from-[#1e2d53] via-[#2a3f6b] to-[#1e2d53] overflow-hidden"
      >
        {/* Background Pattern */}
        < div className="absolute inset-0 opacity-10" >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-3"></div>
          <motion.div
            variants={floatBlob}
            animate="animate"
            custom={24}
            className="absolute top-20 right-0 w-64 h-64 bg-[#39b54a]/20 rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            variants={floatBlob}
            animate="animate"
            custom={-20}
            className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"
          ></motion.div>
        </div >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-extrabold text-white leading-tight"
            >
              {"About Us".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.03, duration: 0.5, ease: EASE }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
            >
              {"Pioneering Australia's sustainable energy future with innovative solar solutions"
                .split(" ")
                .map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.035, duration: 0.5, ease: EASE }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex justify-center space-x-8 pt-8"
              style={{ x: heroIconX, y: heroIconY }}
            >
              {[Sun, Zap, Battery].map((Icon, index) => (
                <motion.div
                  key={index}
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 0px rgba(57,181,74,0.0)",
                      "0 0 18px rgba(57,181,74,0.45)",
                      "0 0 0px rgba(57,181,74,0.0)"
                    ]
                  }}
                  whileHover={{ scale: 1.25, backgroundColor: "rgba(57,181,74,0.35)" }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, delay: index * 0.5 },
                    boxShadow: { duration: 2.4, repeat: Infinity, delay: index * 0.5, ease: "easeInOut" }
                  }}
                  className="w-16 h-16 bg-[#39b54a]/20 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer"
                >
                  <Icon className="w-8 h-8 text-[#39b54a]" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section >

      {/* About Company Section */}
      < section ref={aboutRef} className="py-20 bg-white" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left - Image Carousel */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate={aboutInView ? "visible" : "hidden"}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="relative overflow-hidden rounded-3xl shadow-2xl h-[500px]"
              >
                {/* Image Carousel */}
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="absolute inset-0"
                >
                  <motion.img
                    src={aboutImages[currentImageIndex]}
                    alt={`About us ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.15, x: 0, y: 0 }}
                    animate={{ scale: [1.15, 1.05, 1.15], x: [0, -12, 0], y: [0, 8, 0] }}
                    transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>

                {/* Navigation Buttons */}
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={aboutInView ? { opacity: 1, x: [0, -3, 0] } : {}}
                  transition={{
                    opacity: { delay: 0.4, duration: 0.5 },
                    x: { delay: 1.2, duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover={{ scale: 1.15, x: 0 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#1e2d53] p-3 rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={aboutInView ? { opacity: 1, x: [0, 3, 0] } : {}}
                  transition={{
                    opacity: { delay: 0.4, duration: 0.5 },
                    x: { delay: 1.2, duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover={{ scale: 1.15, x: 0 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#1e2d53] p-3 rounded-full shadow-lg transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                  {aboutImages.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setAutoScroll(false);
                        setTimeout(() => setAutoScroll(true), 8000);
                      }}
                      layout
                      transition={{ duration: 0.35, ease: EASE }}
                      className={`w-3 h-3 rounded-full transition-colors ${index === currentImageIndex
                        ? 'bg-white w-8'
                        : 'bg-white/60 hover:bg-white/80'
                        }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={aboutInView ? {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  y: [0, -8, 0]
                } : {}}
                transition={{
                  opacity: { delay: 0.5, duration: 0.6, type: "spring" },
                  scale: { delay: 0.5, duration: 0.6, type: "spring" },
                  rotate: { delay: 0.5, duration: 0.6, type: "spring" },
                  y: { delay: 1.2, duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.08 }}
                className="absolute -top-6 -right-6 bg-red-500 text-white p-4 rounded-2xl shadow-xl"
              >
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-wide">About Company</div>
                  <motion.div
                    className="w-8 h-1 bg-white/60 mx-auto mt-2 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={aboutInView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
                  ></motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate={aboutInView ? "visible" : "hidden"}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1e2d53] mb-6 leading-tight">
                  Innovating for a
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
                    className="text-[#39b54a] block"
                  >
                    Sustainable Future
                  </motion.span>
                </h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={aboutInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="text-lg text-gray-600 leading-relaxed mb-6"
                >
                  At Aussie Smart Energy, we transform sunlight into opportunity. Guided by a vision of a cleaner, greener future, we create innovative solar solutions that empower homes, businesses, and communities to thrive sustainably.                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={aboutInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.65, duration: 0.7 }}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  Blending cutting-edge technology with elegant design, we deliver systems that reduce carbon footprints while enhancing energy independence. More than a solar company, we’re your partner in building a brighter, more sustainable world—one powered by the sun.
                </motion.p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {achievements.slice(0, 4).map((achievement, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={achievementVariants}
                    initial="hidden"
                    animate={aboutInView ? "visible" : "hidden"}
                    whileHover={{ x: 4 }}
                    className="flex items-center space-x-3"
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.3,
                        rotate: 10,
                        boxShadow: "0 0 0 6px rgba(57,181,74,0.15)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="rounded-full"
                    >
                      <CheckCircle className="w-5 h-5 text-[#39b54a] flex-shrink-0" />
                    </motion.div>
                    <span className="text-sm font-medium text-gray-700">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section >

      {/* Values Section */}
      < section ref={valuesRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-extrabold text-[#1e2d53] mb-6"
            >
              What Defines Us
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={valuesInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
              className="w-24 h-1 bg-red-500 mx-auto rounded-full mb-8 origin-center"
            ></motion.div>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              {"At Aussie Smart Energy, we’re not just building solar systems—we’re illuminating the path to a more radiant future. Join us, and let’s create something extraordinary under the sun."
                .split(" ")
                .map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.012, duration: 0.4, ease: EASE }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
              >
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: index * 0.4, ease: "easeInOut" }}
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#39b54a]/10"
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-[#1e2d53] mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section >

      {/* Stats Section */}
      < section ref={statsRef} className="py-20 bg-gradient-to-br from-[#1e2d53] to-[#2a3f6b] relative overflow-hidden" >
        {/* Background Pattern */}
        < div className="absolute inset-0 opacity-10" >
          <motion.div
            variants={floatBlob}
            animate="animate"
            custom={18}
            className="absolute top-0 right-0 w-96 h-96 bg-[#39b54a] rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            variants={floatBlob}
            animate="animate"
            custom={-16}
            className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 rounded-full blur-3xl"
          ></motion.div>
        </div >

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            className="grid md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -6 }}
                className="text-center group"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={statsInView ? {
                    scale: [0, 1.1, 1],
                    rotate: 0,
                    boxShadow: [
                      "0 10px 25px rgba(0,0,0,0.25)",
                      "0 10px 35px rgba(255,255,255,0.25)",
                      "0 10px 25px rgba(0,0,0,0.25)"
                    ]
                  } : {}}
                  whileHover={{ rotate: 8, scale: 1.12 }}
                  transition={{
                    scale: { delay: index * 0.2, type: "spring", stiffness: 100 },
                    rotate: { delay: index * 0.2, type: "spring", stiffness: 100 },
                    boxShadow: { delay: index * 0.2 + 0.6, duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className={`w-24 h-24 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-300`}
                >
                  {stat.icon}
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className="text-4xl font-extrabold text-white mb-2"
                >
                  <CountUp value={stat.number} inView={statsInView} delay={index * 0.2 + 0.35} />
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2 + 0.4 }}
                  className="text-blue-200 font-medium"
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section >

      {/* Story Section */}
      < section ref={storyRef} className="py-20 bg-white" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left - Content */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
              className="space-y-8"
            >
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={storyInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-red-500 text-sm font-bold uppercase tracking-wider mb-4"
                >
                  OUR EXPERIENCE
                </motion.div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={storyInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
                  className="w-16 h-1 bg-red-500 rounded-full mb-8 origin-left"
                ></motion.div>
              </div>

              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1e2d53] leading-tight">
                <motion.span
                  initial={{ opacity: 0, y: 16 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
                  className="inline-block"
                >
                  Solar Passion
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 16 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
                  className="text-[#39b54a] block"
                >
                  Unveiled Our Story
                </motion.span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Our design philosophy is more than aesthetics; it’s a dynamic process That delves into the heart of each brand, understanding its story, Values, and aspirations. We believe in the
              </p>

              <div className="space-y-4">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={storyInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[#1e2d53] font-bold">Solar Panel</span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={storyInView ? { opacity: 1 } : {}}
                      transition={{ delay: 1.6, duration: 0.3 }}
                      className="text-[#1e2d53] font-bold"
                    >
                      90%
                    </motion.span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-red-500 h-2 rounded-full relative overflow-hidden"
                      initial={{ width: 0 }}
                      animate={storyInView ? { width: "90%" } : {}}
                      transition={{ delay: 0.8, duration: 1, ease: EASE }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/30"
                        initial={{ x: "-100%" }}
                        animate={storyInView ? { x: "100%" } : {}}
                        transition={{ delay: 1.8, duration: 0.8, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={storyInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[#1e2d53] font-bold">Storage Battery</span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={storyInView ? { opacity: 1 } : {}}
                      transition={{ delay: 1.8, duration: 0.3 }}
                      className="text-[#1e2d53] font-bold"
                    >
                      75%
                    </motion.span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-red-500 h-2 rounded-full relative overflow-hidden"
                      initial={{ width: 0 }}
                      animate={storyInView ? { width: "75%" } : {}}
                      transition={{ delay: 1, duration: 1, ease: EASE }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/30"
                        initial={{ x: "-100%" }}
                        animate={storyInView ? { x: "100%" } : {}}
                        transition={{ delay: 2, duration: 0.8, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              ref={storyImgRef}
              variants={slideInRight}
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
              className="relative"
            >
              <motion.div
                style={{ y: storyImgY, perspective: 1000 }}
                whileHover={{ scale: 1.02, rotateX: -2, rotateY: 3 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative overflow-hidden rounded-3xl shadow-2xl"
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
                  alt="Solar installation aerial view"
                  className="w-full h-[500px] object-cover"
                  initial={{ scale: 1.1 }}
                  animate={storyInView ? { scale: 1 } : {}}
                  transition={{ duration: 1.2, ease: EASE }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                variants={floatBlob}
                animate="animate"
                custom={14}
                className="absolute -top-8 -left-8 w-24 h-24 bg-[#39b54a]/20 rounded-full blur-xl"
              ></motion.div>
              <motion.div
                variants={floatBlob}
                animate="animate"
                custom={-12}
                className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section >
    </motion.div >
  );
};

export default AboutUs;