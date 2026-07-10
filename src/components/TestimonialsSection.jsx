import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, Check, Plus, Minus, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import johnDoeImg from '../assets/johndoe.jpg';
import lindaGeorgeImg from '../assets/linda george.jpg';
import marindaWilsonImg from '../assets/marinda wilson.jpg';

const TestimonialsSection = () => {
    const ref = useRef(null);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [autoScroll, setAutoScroll] = useState(true);

    const testimonials = [
        {
            id: 1,
            name: 'John Doe',
            role: 'House owner',
            text: "Great to deal with from start to finish. Sales team and the installers were excellent. There was no dents on my color bond roof after the installation. Very Happy customer here. Would highly recommend Aussie Smart Energy to everyone.",
            image: johnDoeImg,
            rating: 5,
        },
        {
            id: 2,
            name: 'Linda George',
            role: 'Business owner',
            text: "Very happy with the service provided by the whole team, Adam and John, patiently guided us to the right product, following up on time, tried their best to fulfill our needs, the installers are kind and professional as well, patiently answered our questions, help me set up the app while I had to hold my baby in arm, kids friendly and dog friendly also😊. Love the team!",
            image: lindaGeorgeImg,
            rating: 5,
        },
        {
            id: 3,
            name: 'Marinda Wilson',
            role: 'House Owner',
            text: "Exceptional service from start to finish! Aussie Smart Energy has been fantastic, responding to all my queries promptly and professionally every step of the way. They went above and beyond by offering discounts wherever possible, which I truly appreciated. The installation process was seamless—quick, efficient, and handled with great expertise.",
            image: marindaWilsonImg,
            rating: 5,
        },
    ];

    useEffect(() => {
        if (!autoScroll) return;
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [autoScroll, testimonials.length]);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setAutoScroll(false);
        setTimeout(() => setAutoScroll(true), 8000);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setAutoScroll(false);
        setTimeout(() => setAutoScroll(true), 8000);
    };

    return (
        <section ref={ref} className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    <div>
                        <span className="text-[#39b54a] text-xs font-extrabold tracking-widest uppercase">WHAT OUR CUSTOMERS SAY</span>
                        <h2 className="mt-2 text-3xl lg:text-4xl font-extrabold text-[#1e2d53] leading-tight">
                            Real Stories.<br />Real Savings.
                        </h2>
                    </div>

                    <motion.div
                        key={currentTestimonial}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-5"
                    >
                        <div className="text-[#39b54a]">
                            <Quote size={42} className="fill-current opacity-15" />
                        </div>

                        <blockquote className="text-slate-700 text-base sm:text-lg font-semibold leading-relaxed">
                            "{testimonials[currentTestimonial].text}"
                        </blockquote>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="flex items-center space-x-3">
                                <motion.img
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    src={testimonials[currentTestimonial].image}
                                    alt={testimonials[currentTestimonial].name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-[#39b54a]"
                                />
                                <div>
                                    <div className="font-extrabold text-[#1e2d53] text-sm">{testimonials[currentTestimonial].name}</div>
                                    <div className="flex items-center space-x-1 text-[10px] text-[#39b54a] font-bold mt-0.5">
                                        <Check size={10} className="stroke-[3]" />
                                        <span>Verified Customer</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-0.5">
                                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                    <Star key={i} size={15} className="text-yellow-400 fill-current" />
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center space-x-3 pt-4 border-t border-slate-100">
                            <button
                                onClick={prevTestimonial}
                                className="w-9 h-9 bg-slate-100 hover:bg-[#39b54a]/10 rounded-full flex items-center justify-center transition-colors duration-300"
                            >
                                <ArrowLeft className="w-4 h-4 text-slate-600" />
                            </button>
                            <div className="flex space-x-2 items-center">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setCurrentTestimonial(index);
                                            setAutoScroll(false);
                                            setTimeout(() => setAutoScroll(true), 8000);
                                        }}
                                        className={`rounded-full transition-all duration-300 ${currentTestimonial === index
                                            ? 'bg-[#39b54a] w-3 h-3'
                                            : 'bg-slate-300 hover:bg-slate-400 w-2 h-2'
                                            }`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={nextTestimonial}
                                className="w-9 h-9 bg-slate-100 hover:bg-[#39b54a]/10 rounded-full flex items-center justify-center transition-colors duration-300"
                            >
                                <ArrowRight className="w-4 h-4 text-slate-600" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
