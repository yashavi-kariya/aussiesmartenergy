import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Star,
  Quote,
  ArrowLeft,
  ArrowRight,
  MapPin,
  DollarSign,
  Home
} from 'lucide-react';

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const testimonials = [
    {
      id: 1,
      name: "James Patterson",
      location: "Sydney, NSW",
      systemSize: "8.5kW System",
      rating: 5,
      savings: "$3,200/year",
      text: "Outstanding service from start to finish! The team at Aussie Smart Energy was professional, knowledgeable, and efficient. Our solar system has exceeded expectations, and our electricity bills are now almost zero. The installation was completed in just one day with minimal disruption. Highly recommend!",
      avatar: "JP"
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      location: "Melbourne, VIC",
      systemSize: "6.6kW System",
      rating: 5,
      savings: "$2,800/year",
      text: "Best decision we ever made! The consultation process was thorough and informative. The installation team was courteous and professional. Our energy bills have dropped by 85% and the monitoring system lets us track our savings in real-time. Fantastic service and quality products.",
      avatar: "SM"
    },
    {
      id: 3,
      name: "Michael Chen",
      location: "Brisbane, QLD",
      systemSize: "10.5kW System",
      rating: 5,
      savings: "$4,100/year",
      text: "Exceptional quality and service! From the initial assessment to the final installation, everything was handled professionally. The team explained the entire process clearly and delivered exactly what they promised. Our commercial property is now saving thousands annually. Excellent investment!",
      avatar: "MC"
    },
    {
      id: 4,
      name: "Emma Thompson",
      location: "Perth, WA",
      systemSize: "7.2kW System",
      rating: 5,
      savings: "$3,500/year",
      text: "Couldn't be happier with our solar system! The team was incredibly helpful throughout the process, answering all our questions and ensuring we understood everything. The installation was quick and clean, and we're already seeing significant savings on our power bills. Great experience!",
      avatar: "ET"
    },
    {
      id: 5,
      name: "David Wilson",
      location: "Adelaide, SA",
      systemSize: "12kW System",
      rating: 5,
      savings: "$4,800/year",
      text: "Professional service and fantastic results! The consultation was detailed and the quote was competitive. Installation was completed on time and the system has been performing excellently. Our business is now saving substantial amounts on energy costs. Would definitely recommend to others.",
      avatar: "DW"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="relative py-20 overflow-hidden bg-slate-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-6 py-3 bg-yellow-100 border border-yellow-200 rounded-full text-yellow-700 text-sm font-semibold mb-6"
          >
            CUSTOMER TESTIMONIALS
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-8 text-slate-800"
          >
            What Our{' '}
            <span className="text-emerald-600">Customers Say</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Real experiences from satisfied customers who have made the switch to clean, renewable energy
          </motion.p>
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200 max-w-4xl mx-auto relative"
            key={currentTestimonial}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-emerald-600" />
            </div>

            {/* Rating Stars */}
            <div className="flex justify-center mb-6">
              <div className="flex space-x-1">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-lg md:text-xl text-slate-700 leading-relaxed text-center mb-8 italic">
              "{testimonials[currentTestimonial].text}"
            </blockquote>

            {/* Customer Info */}
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {testimonials[currentTestimonial].avatar}
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-slate-800">
                  {testimonials[currentTestimonial].name}
                </h4>
                <div className="flex items-center justify-center space-x-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{testimonials[currentTestimonial].location}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <span className="text-2xl font-bold text-slate-800">
                    {testimonials[currentTestimonial].savings}
                  </span>
                </div>
                <div className="text-sm text-slate-600">Annual Savings</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Home className="w-5 h-5 text-blue-600" />
                  <span className="text-lg font-bold text-slate-800">
                    {testimonials[currentTestimonial].systemSize}
                  </span>
                </div>
                <div className="text-sm text-slate-600">System Size</div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center space-x-4 mt-8">
              <motion.button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </motion.button>
              <motion.button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight className="w-5 h-5 text-slate-600" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonial Indicators */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-3 mb-12"
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonial === index
                  ? 'bg-emerald-600 scale-125'
                  : 'bg-slate-300 hover:bg-slate-400'
                }`}
            />
          ))}
        </motion.div>

        {/* Customer Gallery */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Join 15,000+ Happy Customers
            </h3>
            <p className="text-slate-600">
              Trusted by homeowners and businesses across Australia
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className={`p-4 bg-white rounded-xl shadow-sm border border-slate-200 cursor-pointer transition-all duration-300 ${currentTestimonial === index ? 'border-emerald-300 shadow-lg' : 'hover:shadow-md'
                  }`}
                onClick={() => setCurrentTestimonial(index)}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">
                    {testimonial.avatar}
                  </div>
                  <div className="text-sm font-semibold text-slate-800 mb-1">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-slate-600 mb-2">
                    {testimonial.location}
                  </div>
                  <div className="flex justify-center">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;