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

    const [selectedOffice, setSelectedOffice] = useState('qld');
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', address: '', message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);

    const QLD_MAP_LINK = 'https://www.google.com/maps/place/29%2F97+Creek+St,+Brisbane+City+QLD+4000,+Australia/@-27.4663291,153.0286954,773m/data=!3m2!1e3!4b1!4m6!3m5!1s0x6b915a1d102d8fa1:0x8158bd93785c81c!8m2!3d-27.4663291!4d153.0286954!16s%2Fg%2F11xt042p3w?entry=ttu&g_ep=EgoyMDI2MDkyNy4xIKXMDSoASAFQAw%3D%3D';
    const NSW_MAP_LINK = 'https://www.google.com/maps/place/Unit+526%2F368+Sussex+St,+Sydney+NSW+2000,+Australia/data=!4m2!3m1!1s0x6b12ae3c9f56bffd:0xbb98a2932c04943?sa=X&ved=1t:242&ictx=111';
    const VIC_MAP_LINK = 'https://www.google.com/maps/place/117%2F530+Little+Collins+St,+Melbourne+VIC+3000,+Australia/@-37.8168803,144.9570922,688m/data=!3m2!1e3!4b1!4m6!3m5!1s0x6ad65d4c478de8e7:0x64afc8ae211acac8!8m2!3d-37.8168803!4d144.9570922!16s%2Fg%2F11qpkjchy5?entry=ttu&g_ep=EgoyMDI2MDkyNy4xIKXMDSoASAFQAw%3D%3D';

    const officeLocations = [
        {
            id: 'qld',
            state: 'QLD',
            city: 'Brisbane',
            title: 'QLD Office',
            address: '29/97 Creek St, Brisbane City QLD 4000',
            embedUrl: 'https://maps.google.com/maps?q=-27.4663291,153.0286954&t=&z=16&ie=UTF8&iwloc=&output=embed',
            dirUrl: QLD_MAP_LINK,
            color: GREEN,
            badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
            btnBg: 'bg-[#39b54a] text-white hover:bg-[#2fa03f]'
        },
        {
            id: 'nsw',
            state: 'NSW',
            city: 'Sydney',
            title: 'NSW Office',
            address: '526/368 Sussex St, Sydney NSW 2000',
            embedUrl: 'https://maps.google.com/maps?q=Unit+526%2F368+Sussex+St,+Sydney+NSW+2000,+Australia&t=&z=16&ie=UTF8&iwloc=&output=embed',
            dirUrl: NSW_MAP_LINK,
            color: '#2563eb',
            badge: 'bg-blue-100 text-blue-800 border-blue-300',
            btnBg: 'bg-blue-600 text-white hover:bg-blue-700'
        },
        {
            id: 'vic',
            state: 'VIC',
            city: 'Melbourne',
            title: 'VIC Office',
            address: '117/530 Little Collins St, Melbourne VIC 3000',
            embedUrl: 'https://maps.google.com/maps?q=-37.8168803,144.9570922&t=&z=16&ie=UTF8&iwloc=&output=embed',
            dirUrl: VIC_MAP_LINK,
            color: '#9333ea',
            badge: 'bg-purple-100 text-purple-800 border-purple-300',
            btnBg: 'bg-purple-600 text-white hover:bg-purple-700'
        }
    ];

    // Subtle parallax drift on the hero background image as the page scrolls
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    });
    const heroImgY = useTransform(heroScroll, [0, 1], [0, 80]);

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'firstName' || name === 'lastName') {
            value = value.replace(/[0-9]/g, '');
        } else if (name === 'phone') {
            let clean = value.replace(/[^\d+]/g, '');
            if (clean.startsWith('+61')) {
                clean = '0' + clean.slice(3);
            } else if (clean.startsWith('61') && clean.length > 10) {
                clean = '0' + clean.slice(2);
            }
            value = clean.replace(/\D/g, '').slice(0, 10);
        }

        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.phone) {
            const digits = formData.phone.replace(/\D/g, '');
            if (digits.length !== 10 || !/^(0[23478]\d{8}|1[38]00\d{6}|0\d{9})$/.test(digits)) {
                setError('Please enter a valid 10-digit Australian phone number (e.g. 04XX XXX XXX).');
                return;
            }
        }

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
        { icon: Phone, title: 'Call Us', value: '1300 959 170', actionText: 'Call Now', href: 'tel:1300959170', color: GREEN },
        { icon: Mail, title: 'Email Us', value: 'info@aussiesmartenergy.com.au', actionText: 'Send Email', href: 'mailto:info@aussiesmartenergy.com.au', color: NAVY },
        { icon: MapPin, title: 'QLD Office', value: '29/97 Creek St, Brisbane', actionText: 'Open Map ↗', href: QLD_MAP_LINK, color: GREEN },
        { icon: MapPin, title: 'NSW Office', value: '526/368 Sussex St, Sydney', actionText: 'Open Map ↗', href: NSW_MAP_LINK, color: NAVY },
        { icon: MapPin, title: 'VIC Office', value: '117/530 Little Collins St, Melbourne', actionText: 'Open Map ↗', href: VIC_MAP_LINK, color: GREEN },
        { icon: Clock3, title: 'Working Hours', value: 'Mon-Fri, 9am - 5pm', actionText: null, href: null, color: NAVY }
    ];
    const faqs = [
        { q: 'How quickly will I hear back?', a: "Our team replies to every enquiry within one business day, and most people hear back the same afternoon." },
        { q: 'Do I need to have my details ready?', a: 'Just your address and a recent power bill help us give you an accurate quote faster, but they are not required to get started.' },
        { q: 'Can I request a site visit instead?', a: "Yes — mention it in your message and we'll arrange a free, no-obligation site assessment at a time that suits you (metro areas only)." },
        { q: 'Is there a call-out fee for a quote?', a: 'No. Every consultation and quote from Aussie Smart Energy is completely free, with no obligation to proceed.' }
    ];

    return (
        <div className="min-h-screen bg-blue-50">

            {/* Hero Banner */}
            <section
                ref={heroRef}
                className="relative min-h-[380px] sm:min-h-[400px] pt-36 sm:pt-40 lg:pt-44 pb-12 flex items-center overflow-hidden"
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
                    className="bg-white rounded-2xl shadow-xl -mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 divide-y divide-gray-100 sm:divide-y-0 sm:divide-x"
                >
                    {quickContact.map((item, i) => {
                        const Icon = item.icon;
                        const isExternal = item.href?.startsWith('http');
                        const content = (
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 + i * 0.1, duration: 0.5, ease: EASE }}
                                whileHover={{ y: -4 }}
                                className="flex flex-col items-center text-center gap-2 px-4 py-8 h-full justify-between group"
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <motion.div
                                        whileHover={{ rotate: 360, scale: 1.12 }}
                                        transition={{ duration: 0.6, ease: EASE }}
                                        className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
                                        style={{ backgroundColor: item.color }}
                                    >
                                        <Icon className="w-5 h-5 text-white" />
                                    </motion.div>
                                    <h3 className="font-bold text-sm" style={{ color: NAVY }}>{item.title}</h3>
                                    <p className="text-gray-600 text-xs font-medium leading-relaxed">{item.value}</p>
                                </div>
                                {item.actionText && (
                                    <span className="text-[11px] font-bold text-[#39b54a] group-hover:underline flex items-center gap-1 mt-1">
                                        {item.actionText}
                                    </span>
                                )}
                            </motion.div>
                        );
                        return item.href ? (
                            <a
                                key={i}
                                href={item.href}
                                target={isExternal ? '_blank' : undefined}
                                rel={isExternal ? 'noopener noreferrer' : undefined}
                                className="hover:bg-gray-50/80 transition-colors duration-200 rounded-2xl block h-full"
                            >
                                {content}
                            </a>
                        ) : (
                            <div key={i} className="h-full">{content}</div>
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
                            <motion.div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl ring-1 ring-[#39b54a]/10">
                                <motion.span
                                    variants={itemVariants}
                                    className="inline-block font-bold text-sm uppercase tracking-wider mb-3"
                                    style={{ color: GREEN }}
                                >
                                    Get in Touch
                                </motion.span>
                                <motion.h2
                                    variants={itemVariants}
                                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"
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
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

                        {/* Right - Map with interactive Office Cards */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-5">
                            <div>
                                <motion.span
                                    variants={itemVariants}
                                    className="inline-block font-bold text-sm uppercase tracking-wider mb-2"
                                    style={{ color: GREEN }}
                                >
                                    Find Us
                                </motion.span>
                                <motion.h2
                                    variants={itemVariants}
                                    className="text-4xl md:text-5xl font-extrabold"
                                    style={{ color: NAVY }}
                                >
                                    Our Locations
                                </motion.h2>
                            </div>

                            {/* Office Filter Tabs */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                                {officeLocations.map((loc) => {
                                    const isSelected = selectedOffice === loc.id;
                                    return (
                                        <button
                                            key={loc.id}
                                            onClick={() => setSelectedOffice(loc.id)}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 border shadow-sm ${
                                                isSelected
                                                    ? 'bg-[#1e2d53] text-white border-[#1e2d53] ring-2 ring-[#1e2d53]/20 scale-[1.02]'
                                                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            <span className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: loc.color }} />
                                            <span>{loc.title}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Interactive Google Map Box */}
                            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
                                {officeLocations.map((loc) => {
                                    if (selectedOffice !== loc.id) return null;
                                    return (
                                        <iframe
                                            key={loc.id}
                                            title={`Aussie Smart Energy ${loc.title}`}
                                            src={loc.embedUrl}
                                            className="w-full h-[320px] sm:h-[350px] border-0 transition-opacity duration-300"
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    );
                                })}

                                {/* Approved Seller Badge */}
                                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-xl shadow-md px-3 py-1.5 flex items-center gap-2 border border-slate-200/80 pointer-events-none z-10">
                                    <ShieldCheck className="w-4 h-4 text-[#39b54a]" />
                                    <span className="text-xs font-bold text-[#1e2d53]">CEC Approved Seller</span>
                                </div>
                            </div>

                            {/* 3 Dedicated Office Location Cards */}
                            <div className="flex flex-col gap-3">
                                {officeLocations.map((loc) => {
                                    const isSelected = selectedOffice === loc.id;
                                    return (
                                        <div
                                            key={loc.id}
                                            onClick={() => setSelectedOffice(loc.id)}
                                            className={`rounded-2xl p-4 transition-all duration-300 cursor-pointer border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                                isSelected
                                                    ? 'bg-white border-[#39b54a] shadow-md ring-2 ring-[#39b54a]/20'
                                                    : 'bg-white/80 hover:bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                                            }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm"
                                                    style={{ backgroundColor: loc.color }}
                                                >
                                                    <MapPin className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-extrabold text-slate-900 text-sm">{loc.title}</h4>
                                                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${loc.badge}`}>
                                                            {loc.state}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-600 font-medium mt-0.5 leading-relaxed">
                                                        {loc.address}
                                                    </p>
                                                </div>
                                            </div>

                                            <a
                                                href={loc.dirUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-sm shrink-0 ${loc.btnBg}`}
                                            >
                                                Get Directions ↗
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
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
                            1300 959 170
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
            </section >

            {/* FAQ Section */}
            < section ref={faqRef} className="bg-gray-50 py-20" >
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
            </section >

        </div >
    );
};

export default ContactUs;