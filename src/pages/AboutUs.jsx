import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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
  Star
} from 'lucide-react';

const AboutUs = () => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const valuesRef = useRef(null);
  const statsRef = useRef(null);
  const storyRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, threshold: 0.1 });
  const aboutInView = useInView(aboutRef, { once: true, threshold: 0.1 });
  const valuesInView = useInView(valuesRef, { once: true, threshold: 0.1 });
  const statsInView = useInView(statsRef, { once: true, threshold: 0.1 });
  const storyInView = useInView(storyRef, { once: true, threshold: 0.1 });

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
  const values = [
    {
      icon: <Leaf className="w-8 h-8 text-[#39b54a]" />,
      title: "Voluntary Sustainability",
      description: "We champion environmental responsibility in everything we do, ensuring a greener future for generations to come."
    },
    {
      icon: <Star className="w-8 h-8 text-[#39b54a]" />,
      title: "Elegant Innovation",
      description: "Cutting-edge solar technology with elegant solutions that seamlessly integrate into your lifestyle and property."
    },
    {
      icon: <Users className="w-8 h-8 text-[#39b54a]" />,
      title: "Empowered Communities",
      description: "Building stronger communities through accessible renewable energy solutions and exceptional customer service."
    }
  ];
  const stats = [
    {
      icon: <Users className="w-12 h-12 text-white" />,
      number: "2500+",
      label: "Satisfied Clients",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Zap className="w-12 h-12 text-white" />,
      number: "1800+",
      label: "Solar Installs",
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
    "25+ years combined industry experience",
    "Premium Tier 1 solar panel partnerships",
    "Comprehensive warranty coverage"
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-20 pb-16 bg-gradient-to-br from-[#1e2d53] via-[#2a3f6b] to-[#1e2d53] overflow-hidden"
      >
        {/* Background Pattern */}
        < div className="absolute inset-0 opacity-10" >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-3"></div>
          <div className="absolute top-20 right-0 w-64 h-64 bg-[#39b54a]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
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
              About Us
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
            >
              Pioneering Australia's sustainable energy future with innovative solar solutions
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex justify-center space-x-8 pt-8"
            >
              {[Sun, Zap, Battery].map((Icon, index) => (
                <motion.div
                  key={index}
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, delay: index * 0.5 }
                  }}
                  className="w-16 h-16 bg-[#39b54a]/20 rounded-full flex items-center justify-center backdrop-blur-sm"
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

            {/* Left - Image */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate={aboutInView ? "visible" : "hidden"}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
                  alt="Solar installation team"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={aboutInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                className="absolute -top-6 -right-6 bg-red-500 text-white p-4 rounded-2xl shadow-xl"
              >
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-wide">About Company</div>
                  <div className="w-8 h-1 bg-white/60 mx-auto mt-2 rounded-full"></div>
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
                  <span className="text-[#39b54a] block">Sustainable Future</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  At Aussie Smart Energy, we believe in harnessing the power of innovation to build a
                  sustainable energy future. As Australia's leading solar installation company, we combine
                  cutting-edge technology with exceptional service to make sustainable living accessible to all.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Since our founding, we have been dedicated to transforming how Australians power their
                  homes and businesses. Our commitment to quality, reliability, and environmental stewardship
                  drives everything we do.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {achievements.slice(0, 4).map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-[#39b54a] flex-shrink-0" />
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
              variants={itemVariants}
              className="w-24 h-1 bg-red-500 mx-auto rounded-full mb-8"
            ></motion.div>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              At Aussie Smart Energy, we are guided by core values that drive us to deliver exceptional
              service and innovative solutions for every client.
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
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#39b54a] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
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
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={statsInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
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
                  {stat.number}
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
                <div className="text-red-500 text-sm font-bold uppercase tracking-wider mb-4">
                  OUR EXPERIENCE
                </div>
                <div className="w-16 h-1 bg-red-500 rounded-full mb-8"></div>
              </div>

              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1e2d53] leading-tight">
                Solar Passion
                <span className="text-[#39b54a] block">Unveiled Our Story</span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Our journey began with a simple yet powerful vision: to democratize access
                to clean, renewable energy across Australia. What started as a passion project
                has evolved into Australia's most trusted solar installation company.
              </p>

              <div className="space-y-4">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={storyInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[#1e2d53] font-bold">Solar Expertise</span>
                    <span className="text-[#1e2d53] font-bold">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-red-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={storyInView ? { width: "95%" } : {}}
                      transition={{ delay: 0.8, duration: 1 }}
                    ></motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={storyInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[#1e2d53] font-bold">Installation Quality</span>
                    <span className="text-[#1e2d53] font-bold">98%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-red-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={storyInView ? { width: "98%" } : {}}
                      transition={{ delay: 1, duration: 1 }}
                    ></motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
                  alt="Solar installation aerial view"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#39b54a]/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section >
    </div >
  );
};

export default AboutUs;