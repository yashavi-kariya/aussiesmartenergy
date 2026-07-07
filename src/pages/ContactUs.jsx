import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
    Phone, Mail, MapPin, Clock3, Send, ArrowRight,
    CheckCircle2, MessageSquare, ShieldCheck
} from 'lucide-react';

const NAVY = '#1e2d53';
const GREEN = '#39b54a';

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
    const [openFaq, setOpenFaq] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: wire this up to your backend / email service
        console.log('Contact form submitted:', formData);
        setSubmitted(true);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', address: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
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
        { icon: MapPin, title: 'Visit Us', value: 'Tarneit, VIC 3029', href: null, color: GREEN },
        { icon: Clock3, title: 'Working Hours', value: 'Mon-Fri, 9am - 5pm', href: null, color: NAVY }
    ];

    const faqs = [
        { q: 'How quickly will I hear back?', a: "Our team replies to every enquiry within one business day, and most people hear back the same afternoon." },
        { q: 'Do I need to have my details ready?', a: 'Just your address and a recent power bill help us give you an accurate quote faster, but they are not required to get started.' },
        { q: 'Can I request a site visit instead?', a: "Yes — mention it in your message and we'll arrange a free, no-obligation site assessment at a time that suits you." },
        { q: 'Is there a call-out fee for a quote?', a: 'No. Every consultation and quote from Aussie Smart Energy is completely free, with no obligation to proceed.' }
    ];

    return (
        <div className="min-h-screen bg-white">

            {/* Hero Banner */}
            <section
                ref={heroRef}
                className="relative h-[360px] flex items-center overflow-hidden"
                style={{ backgroundColor: NAVY }}
            >
                <img
                    src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=80"
                    alt="Contact Aussie Smart Energy"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
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
                    <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
                        <MessageSquare className="w-3.5 h-3.5" style={{ color: GREEN }} />
                        We'd Love To Hear From You
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Contact Us</h1>
                    <p className="text-white/70 text-sm">
                        <span className="text-white/90 font-medium">Home</span>
                        <span className="mx-2">/</span>
                        <span style={{ color: GREEN }}>Contact Us</span>
                    </p>
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
                            <div className="flex flex-col items-center text-center gap-2 px-6 py-8">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
                                    style={{ backgroundColor: item.color }}
                                >
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-sm" style={{ color: NAVY }}>{item.title}</h3>
                                <p className="text-gray-500 text-sm">{item.value}</p>
                            </div>
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

            {/* Get in Touch Section */}
            <section ref={formRef} className="pt-20 pb-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">

                        {/* Left - Form */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={isFormInView ? 'visible' : 'hidden'}
                        >
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
                                <div className="grid grid-cols-2 gap-6">
                                    <input
                                        type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                                        placeholder="Enter First Name" required
                                        className="w-full border-b-2 outline-none py-2 text-gray-700 placeholder-gray-400 transition-colors duration-200 focus:border-[#39b54a]"
                                        style={{ borderColor: `${NAVY}33` }}
                                    />
                                    <input
                                        type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                                        placeholder="Enter Last Name" required
                                        className="w-full border-b-2 outline-none py-2 text-gray-700 placeholder-gray-400 transition-colors duration-200 focus:border-[#39b54a]"
                                        style={{ borderColor: `${NAVY}33` }}
                                    />
                                </div>

                                <input
                                    type="email" name="email" value={formData.email} onChange={handleChange}
                                    placeholder="Enter Email Address" required
                                    className="w-full border-b-2 outline-none py-2 text-gray-700 placeholder-gray-400 transition-colors duration-200 focus:border-[#39b54a]"
                                    style={{ borderColor: `${NAVY}33` }}
                                />

                                <input
                                    type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                    placeholder="Enter Phone"
                                    className="w-full border-b-2 outline-none py-2 text-gray-700 placeholder-gray-400 transition-colors duration-200 focus:border-[#39b54a]"
                                    style={{ borderColor: `${NAVY}33` }}
                                />

                                <input
                                    type="text" name="address" value={formData.address} onChange={handleChange}
                                    placeholder="Enter Address"
                                    className="w-full border-b-2 outline-none py-2 text-gray-700 placeholder-gray-400 transition-colors duration-200 focus:border-[#39b54a]"
                                    style={{ borderColor: `${NAVY}33` }}
                                />

                                <textarea
                                    name="message" value={formData.message} onChange={handleChange}
                                    placeholder="Enter Message" rows={4} required
                                    className="w-full border-2 outline-none rounded-md p-3 text-gray-700 placeholder-gray-400 resize-none transition-colors duration-200 focus:border-[#39b54a]"
                                    style={{ borderColor: `${NAVY}33` }}
                                />

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                                    style={{ backgroundColor: GREEN }}
                                >
                                    Send Message
                                    <Send className="w-4 h-4" />
                                </motion.button>

                                {submitted && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="font-medium flex items-center gap-2"
                                        style={{ color: GREEN }}
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                        Thanks! Your message has been sent — we'll be in touch soon.
                                    </motion.p>
                                )}
                            </motion.form>
                        </motion.div>

                        {/* Right - Map with floating chips */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={isFormInView ? 'visible' : 'hidden'}
                            className="relative"
                        >
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

                            <motion.div variants={itemVariants} className="relative rounded-2xl overflow-hidden shadow-lg">
                                <iframe
                                    title="Aussie Smart Energy Location"
                                    src="https://www.google.com/maps?q=Tarneit+VIC+3029+Australia&output=embed"
                                    className="w-full h-[420px] border-0"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />

                                <div className="absolute top-4 left-4 bg-white rounded-xl shadow-md px-4 py-2.5 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" style={{ color: GREEN }} />
                                    <span className="text-xs font-bold" style={{ color: NAVY }}>Approved Seller</span>
                                </div>

                                <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-md px-4 py-2.5 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-xs font-bold" style={{ color: NAVY }}>Tarneit, VIC 3029</span>
                                </div>
                            </motion.div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl p-10 relative overflow-hidden"
                        style={{ backgroundColor: GREEN }}
                    >
                        <span className="text-white/80 text-xs font-bold uppercase tracking-wider">Prefer To Talk?</span>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-2 mb-4">Call Our Team Directly</h3>
                        <a
                            href="tel:0468331724"
                            className="inline-flex items-center gap-2 bg-white font-bold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                            style={{ color: GREEN }}
                        >
                            0468 331 724
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="rounded-2xl p-10 relative overflow-hidden"
                        style={{ backgroundColor: NAVY }}
                    >
                        <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Free & No Obligation</span>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-2 mb-4">Request a Rebate Check</h3>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 font-bold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-white"
                            style={{ backgroundColor: GREEN }}
                        >
                            Check Rebate
                            <ArrowRight className="w-4 h-4" />
                        </a>
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
                                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? -1 : i)}
                                        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                                    >
                                        <span className="font-bold" style={{ color: NAVY }}>{faq.q}</span>
                                        <span
                                            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-lg font-bold transition-transform duration-200"
                                            style={{ backgroundColor: isOpen ? NAVY : GREEN, transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                                        >
                                            +
                                        </span>
                                    </button>
                                    <motion.div
                                        initial={false}
                                        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                                        transition={{ duration: 0.25 }}
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