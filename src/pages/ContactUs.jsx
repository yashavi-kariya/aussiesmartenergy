import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import api from '../utils/api';
import {
    Phone, Mail, MapPin, Clock3, Send, ArrowRight,
    CheckCircle2, MessageSquare, ShieldCheck
} from 'lucide-react';
const NAVY = '#1e2d53';
const GREEN = '#39b54a';

// Real business location — clicking the map opens this exact place in Google Maps
const MAP_LINK = 'https://www.google.com/maps/place/Aussie+Smart+Energy/@-24.1501978,148.5507008,3254937m/data=!3m2!1e3!4b1!4m6!3m5!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!8m2!3d-24.1501978!4d148.5507008!16s%2Fg%2F11y8snbby8?entry=ttu&g_ep=EgoyMDI2MDcwNi4wIKXMDSoASAFQAw%3D%3D';

// Shared elegant easing curve for a premium, unhurried feel
const EASE = [0.22, 1, 0.36, 1];

const ContactUs = () => {
    const heroRef = useRef(null);
    const formRef = useRef(null);
    const faqRef = useRef(null);
    const isFormInView = useInView(formRef, { once: true, threshold: 0.1 });
    const isFaqInView = useInView(faqRef, { once: true, threshold: 0.1 });

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', address: '', message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);

    // Subtle parallax drift on the hero background image as the page scrolls
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    });
    const heroImgY = useTransform(heroScroll, [0, 1], [0, 80]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await api.post('/enquiries', {
                ...formData,
                formType: 'contact',
            });
            setSubmitted(true);
            setFormData({ firstName: '', lastName: '', email: '', phone: '', address: '', message: '' });
            setTimeout(() => setSubmitted(false), 2000);
        } catch (err) {
            setError(err?.response?.data?.message || 'Unable to submit your enquiry right now.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12, duration: 0.5 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
    };

    const quickContact = [
        { icon: Phone, title: 'Call Us', value: '0468 331 724', href: 'tel:0468331724', color: GREEN },
        { icon: Mail, title: 'Email Us', value: 'info@aussiesmartenergy.com.au', href: 'mailto:info@aussiesmartenergy.com.au', color: NAVY },
        { icon: MapPin, title: 'Visit Us', value: '(Australia) Tarneit, VIC 3029', href: null, color: GREEN },
        { icon: Clock3, title: 'Working Hours', value: 'Mon-Fri, 9am - 5pm', href: null, color: NAVY }
    ];

    const faqs = [
        { q: 'How quickly will I hear back?', a: "Our team replies to every enquiry within one business day, and most people hear back the same afternoon." },
        { q: 'Do I need to have my details ready?', a: 'Just your address and a recent power bill help us give you an accurate quote faster, but they are not required to get started.' },
        { q: 'Can I request a site visit instead?', a: "Yes — mention it in your message and we'll arrange a free, no-obligation site assessment at a time that suits you." },
        { q: 'Is there a call-out fee for a quote?', a: 'No. Every consultation and quote from Aussie Smart Energy is completely free, with no obligation to proceed.' }
    ];

    return (
        <div className="min-h-screen bg-blue-50">

            {/* Hero Banner */}
            <section
                ref={heroRef}
                className="relative h-[360px] flex items-center overflow-hidden"
                style={{ backgroundColor: NAVY }}
            >
                <motion.img
                    src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=80"
                    alt="Contact Aussie Smart Energy"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    style={{ y: heroImgY }}
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: EASE }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(90deg, ${NAVY}e6, ${NAVY}b3, ${NAVY}80)` }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5"
                    >
                        <motion.span
                            animate={{ rotate: [0, -12, 12, 0] }}
                            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
                        >
                            <MessageSquare className="w-3.5 h-3.5" style={{ color: GREEN }} />
                        </motion.span>
                        We'd Love To Hear From You
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
                        className="text-4xl md:text-5xl font-extrabold text-white mb-3"
                    >
                        Contact Us
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-white/70 text-sm"
                    >
                        <span className="text-white/90 font-medium">Home</span>
                        <span className="mx-2">/</span>
                        <span style={{ color: GREEN }}>Contact Us</span>
                    </motion.p>
                </motion.div>
            </section>

            {/* Floating Quick-Contact Strip */}
            <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl -mt-16 grid grid-cols-2 lg:grid-cols-4 divide-y divide-gray-100 lg:divide-y-0 lg:divide-x"
                >
                    {quickContact.map((item, i) => {
                        const Icon = item.icon;
                        const content = (
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 + i * 0.1, duration: 0.5, ease: EASE }}
                                whileHover={{ y: -4 }}
                                className="flex flex-col items-center text-center gap-2 px-6 py-8"
                            >
                                <motion.div
                                    whileHover={{ rotate: 360, scale: 1.12 }}
                                    transition={{ duration: 0.6, ease: EASE }}
                                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
                                    style={{ backgroundColor: item.color }}
                                >
                                    <Icon className="w-5 h-5 text-white" />
                                </motion.div>
                                <h3 className="font-bold text-sm" style={{ color: NAVY }}>{item.title}</h3>
                                <p className="text-gray-500 text-sm">{item.value}</p>
                            </motion.div>
                        );
                        return item.href ? (
                            <a key={i} href={item.href} className="hover:bg-gray-50 transition-colors duration-200 rounded-2xl">
                                {content}
                            </a>
                        ) : (
                            <div key={i}>{content}</div>
                        );
                    })}
                </motion.div>
            </section>

            {/* Get in Touch Section (highlighted + full-section animation + decorative shapes) */}
            <motion.section
                ref={formRef}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                className="pt-20 pb-20 relative overflow-hidden"
            >
                {/* Decorative floating shapes */}
                <motion.div
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#dff7e6] to-[#e6f3ff] blur-3xl opacity-80 pointer-events-none"
                />
                <motion.div
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    transition={{ duration: 0.9, delay: 0.15 }}
                    className="absolute -bottom-28 -right-28 w-96 h-96 rounded-2xl bg-gradient-to-tr from-[#f0fbf4] to-[#d6eefc] blur-3xl opacity-70 pointer-events-none"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16">

                        {/* Left - Form */}
                        <motion.div variants={itemVariants} className="">
                            <motion.div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl ring-1 ring-[#39b54a]/10">
                                <motion.span
                                    variants={itemVariants}
                                    className="inline-block font-bold text-sm uppercase tracking-wider mb-3"
                                    style={{ color: GREEN }}
                                >
                                    Get in Touch
                                </motion.span>
                                <motion.h2
                                    variants={itemVariants}
                                    className="text-4xl md:text-5xl font-extrabold mb-4"
                                    style={{ color: NAVY }}
                                >
                                    Say Hello:
                                </motion.h2>
                                <motion.p variants={itemVariants} className="text-gray-500 mb-8">
                                    Your Path to Clean Energy Begins with a Conversation
                                </motion.p>

                                <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
                                    {submitted ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                                            className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                                        >
                                            <motion.div
                                                initial={{ scale: 0, rotate: -45 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
                                                className="w-16 h-16 rounded-full flex items-center justify-center"
                                                style={{ background: `${GREEN}18`, border: `2px solid ${GREEN}40` }}
                                            >
                                                <CheckCircle2 className="w-8 h-8" style={{ color: GREEN }} />
                                            </motion.div>
                                            <h3 className="text-2xl font-extrabold" style={{ color: NAVY }}>Message Sent!</h3>
                                            <p className="text-slate-500 text-sm max-w-xs">
                                                Thanks! Your enquiry has been received — we'll be in touch soon.
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <>
                                            {error && <p className="text-sm text-red-600">{error}</p>}
                                            {error && <p className="text-sm text-red-600">{error}</p>}
                                            <div className="grid grid-cols-2 gap-6">
                                                <motion.input
                                                    whileFocus={{ scale: 1.02 }}
                                                    transition={{ duration: 0.2 }}
                                                    type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                                                    placeholder="Enter First Name" required
                                                    className="w-full border-b-2 outline-none py-2 text-gray-700 placeholder-gray-400 transition-colors duration-200 focus:border-[#39b54a]"
                                                    style={{ borderColor: `${NAVY}33` }}
                                                />
                                                <motion.input
                                                    whileFocus={{ scale: 1.02 }}
                                                    transition={{ duration: 0.2 }}
                                                    type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                                                    placeholder="Enter Last Name" required
                                                    className="w-full border-b-2 outline-none py-2 text-gray-700 placeholder-gray-400 transition-colors duration-200 focus:border-[#39b54a]"
                                                    style={{ borderColor: `${NAVY}33` }}
                                                />
                                            </div>

                                            <motion.input
                                                whileFocus={{ scale: 1.02 }}
                                                transition={{ duration: 0.2 }}
                                                type="email" name="email" value={formData.email} onChange={handleChange}
                                                placeholder="Enter Email Address" required
                                                className="w-full border-b-2 outline-none py-2 text-gray-700 placeholder-gray-400 transition-colors duration-200 focus:border-[#39b54a]"
                                                style={{ borderColor: `${NAVY}33` }}
                                            />

                                            <motion.input
                                                whileFocus={{ scale: 1.02 }}
                                                transition={{ duration: 0.2 }}
                                                type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                                placeholder="Enter Phone"
                                                className="w-full border-b-2 outline-none py-2 text-gray-700 placeholder-gray-400 transition-colors duration-200 focus:border-[#39b54a]"
                                                style={{ borderColor: `${NAVY}33` }}
                                            />

                                            <motion.input
                                                whileFocus={{ scale: 1.02 }}
                                                transition={{ duration: 0.2 }}
                                                type="text" name="address" value={formData.address} onChange={handleChange}
                                                placeholder="Enter Address"
                                                className="w-full border-b-2 outline-none py-2 text-gray-700 placeholder-gray-400 transition-colors duration-200 focus:border-[#39b54a]"
                                                style={{ borderColor: `${NAVY}33` }}
                                            />

                                            <motion.textarea
                                                whileFocus={{ scale: 1.01 }}
                                                transition={{ duration: 0.2 }}
                                                name="message" value={formData.message} onChange={handleChange}
                                                placeholder="Enter Message" rows={4} required
                                                className="w-full border-2 outline-none rounded-md p-3 text-gray-700 placeholder-gray-400 resize-none transition-colors duration-200 focus:border-[#39b54a]"
                                                style={{ borderColor: `${NAVY}33` }}
                                            />

                                            <motion.button
                                                type="submit"
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                disabled={isSubmitting}
                                                animate={{
                                                    boxShadow: [
                                                        '0 4px 12px rgba(57,181,74,0.0)',
                                                        '0 4px 20px rgba(57,181,74,0.35)',
                                                        '0 4px 12px rgba(57,181,74,0.0)'
                                                    ]
                                                }}
                                                transition={{ boxShadow: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } }}
                                                className="text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 group disabled:opacity-70"
                                                style={{ backgroundColor: GREEN }}
                                            >
                                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                                <motion.span
                                                    animate={{ x: [0, 4, 0] }}
                                                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                                                    className="inline-flex"
                                                >
                                                    <Send className="w-4 h-4" />
                                                </motion.span>
                                            </motion.button>

                                            {submitted && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                    className="font-medium flex items-center gap-2"
                                                    style={{ color: GREEN }}
                                                >
                                                    <motion.span
                                                        initial={{ scale: 0, rotate: -45 }}
                                                        animate={{ scale: 1, rotate: 0 }}
                                                        transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
                                                    >
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </motion.span>
                                                    Thanks! Your message has been sent — we'll be in touch soon.
                                                </motion.p>
                                            )}
                                        </>
                                    )}
                                </motion.form>
                            </motion.div>
                        </motion.div>

                        {/* Right - Map with floating chips */}
                        <motion.div variants={itemVariants} className="relative">
                            <motion.span
                                variants={itemVariants}
                                className="inline-block font-bold text-sm uppercase tracking-wider mb-3"
                                style={{ color: GREEN }}
                            >
                                Find Us
                            </motion.span>
                            <motion.h2
                                variants={itemVariants}
                                className="text-4xl md:text-5xl font-extrabold mb-6"
                                style={{ color: NAVY }}
                            >
                                Our Location
                            </motion.h2>

                            <motion.a
                                href={MAP_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open Aussie Smart Energy location in Google Maps"
                                variants={itemVariants}
                                whileHover={{ scale: 1.015 }}
                                transition={{ duration: 0.3, ease: EASE }}
                                className="relative rounded-2xl overflow-hidden shadow-lg block cursor-pointer group"
                            >
                                <iframe
                                    title="Aussie Smart Energy Location"
                                    src="https://www.google.com/maps?q=Tarneit+VIC+3029+Australia&output=embed"
                                    className="w-full h-[420px] border-0"
                                    style={{ pointerEvents: 'none' }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />

                                {/* Transparent overlay so the whole card reliably opens the real map link */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.5, ease: EASE }}
                                    whileHover={{ scale: 1.06 }}
                                    className="absolute top-4 left-4 bg-white rounded-xl shadow-md px-4 py-2.5 flex items-center gap-2"
                                >
                                    <ShieldCheck className="w-4 h-4" style={{ color: GREEN }} />
                                    <span className="text-xs font-bold" style={{ color: NAVY }}>Approved Seller</span>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7, duration: 0.5, ease: EASE }}
                                    whileHover={{ scale: 1.06 }}
                                    className="absolute bottom-4 right-4 bg-white rounded-xl shadow-md px-4 py-2.5 flex items-center gap-2"
                                >
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-xs font-bold" style={{ color: NAVY }}>(Australia) Tarneit, VIC 3029</span>
                                </motion.div>
                            </motion.a>
                        </motion.div>

                    </div>
                </div>
            </motion.section>

            {/* CTA Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                        className="rounded-2xl p-10 relative overflow-hidden"
                        style={{ backgroundColor: GREEN }}
                    >
                        <span className="text-white/80 text-xs font-bold uppercase tracking-wider">Prefer To Talk?</span>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-2 mb-4">Call Our Team Directly</h3>
                        <motion.a
                            href="tel:0468331724"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 bg-white font-bold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                            style={{ color: GREEN }}
                        >
                            0468 331 724
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="inline-flex"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </motion.span>
                        </motion.a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.25)' }}
                        className="rounded-2xl p-10 relative overflow-hidden"
                        style={{ backgroundColor: NAVY }}
                    >
                        <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Free & No Obligation</span>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-2 mb-4">Request a Rebate Check</h3>
                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 font-bold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-white"
                            style={{ backgroundColor: GREEN }}
                        >
                            Check Rebate
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="inline-flex"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </motion.span>
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section ref={faqRef} className="bg-gray-50 py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <span className="font-bold text-sm uppercase tracking-wider" style={{ color: GREEN }}>FAQ</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mt-2" style={{ color: NAVY }}>
                            Common Questions
                        </h2>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => {
                            const isOpen = openFaq === i;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: i * 0.08 }}
                                    whileHover={{ scale: 1.01 }}
                                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? -1 : i)}
                                        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                                    >
                                        <span className="font-bold" style={{ color: NAVY }}>{faq.q}</span>
                                        <motion.span
                                            animate={{
                                                backgroundColor: isOpen ? NAVY : GREEN,
                                                rotate: isOpen ? 45 : 0
                                            }}
                                            transition={{ duration: 0.3, ease: EASE }}
                                            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-lg font-bold"
                                        >
                                            +
                                        </motion.span>
                                    </button>
                                    <motion.div
                                        initial={false}
                                        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                                        transition={{ duration: 0.3, ease: EASE }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ContactUs;