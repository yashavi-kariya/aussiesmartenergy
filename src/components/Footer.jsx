// import { useEffect, useRef } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import {
//   Phone, Mail, MapPin, ChevronRight, Send,
//   ShieldCheck, ArrowRight, Zap
// } from 'lucide-react'
// import { FaFacebookF, FaLinkedinIn, FaYoutube, FaXTwitter } from 'react-icons/fa6'
// import mainLogo from '../assets/Mainlogo.png'

// gsap.registerPlugin(ScrollTrigger)

// /* ──────────────────────────────────────────────────────────────
//    Sub-components
// ────────────────────────────────────────────────────────────── */

// /** Glowing social button */
// const SocialBtn = ({ Icon, href = '#', label, color }) => (
//   <a
//     href={href}
//     aria-label={label}
//     className="social-icon-btn group relative flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/5 overflow-hidden transition-all duration-300 hover:scale-110 hover:border-green-400/60"
//     style={{ '--glow': color }}
//   >
//     {/* glow ring on hover */}
//     <span
//       className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
//       style={{ background: `radial-gradient(circle, ${color}55 0%, transparent 70%)` }}
//     />
//     <Icon size={15} className="relative z-10 text-slate-300 group-hover:text-white transition-colors duration-200 group-hover:rotate-6 group-hover:scale-110" style={{ transition: 'all 0.3s ease' }} />
//   </a>
// )

// /** Animated link row used in Quick Links & Resources */
// const FooterLink = ({ children }) => (
//   <li>
//     <a
//       href="#"
//       className="footer-link group flex items-center gap-3 text-slate-400 text-sm py-1 transition-all duration-300 hover:text-green-400"
//     >
//       <span className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center bg-white/5 border border-white/5 group-hover:border-green-500/40 group-hover:bg-green-500/10 transition-all duration-300">
//         <ChevronRight size={11} className="text-slate-500 group-hover:text-green-400 group-hover:translate-x-0.5 transition-all duration-300" />
//       </span>
//       <span className="group-hover:translate-x-1.5 transition-transform duration-300 relative">
//         {children}
//         <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-green-400 group-hover:w-full transition-all duration-400" />
//       </span>
//     </a>
//   </li>
// )

// /** Contact row with glowing icon */
// const ContactRow = ({ Icon, children }) => (
//   <li className="flex items-start gap-3">
//     <span className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center bg-green-500/10 border border-green-500/20 text-green-400">
//       <Icon size={14} />
//     </span>
//     <span className="text-slate-400 text-sm leading-relaxed">{children}</span>
//   </li>
// )

// /** Column heading with icon badge */
// const ColHeading = ({ Icon, children }) => (
//   <div className="flex items-center gap-3 mb-6">
//     <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-green-500/15 border border-green-500/25 text-green-400">
//       <Icon size={15} />
//     </span>
//     <h4 className="text-white font-bold text-base tracking-wide">{children}</h4>
//   </div>
// )

// /* ──────────────────────────────────────────────────────────────
//    Wave SVGs
// ────────────────────────────────────────────────────────────── */
// const WaveLayers = () => (
//   <div className="absolute top-0 left-0 w-full pointer-events-none overflow-hidden" style={{ height: 220 }}>
//     {/* blur glow backdrop */}
//     <div className="absolute inset-0 blur-2xl opacity-30"
//       style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #0ea5e944 0%, transparent 70%)' }} />

//     {/* Layer 1 — Blue gradient wave, moves left */}
//     <svg
//       id="wave1"
//       className="absolute bottom-0 left-0 w-[200%] will-change-transform"
//       style={{ height: 180 }}
//       viewBox="0 0 2880 180"
//       preserveAspectRatio="none"
//     >
//       <defs>
//         <linearGradient id="waveBlue" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
//           <stop offset="0%" stopColor="#0369a1" stopOpacity="0.95" />
//           <stop offset="40%" stopColor="#0ea5e9" stopOpacity="0.85" />
//           <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.75" />
//           <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
//         </linearGradient>
//       </defs>
//       <path
//         d="M0,90 C240,160 480,20 720,90 C960,160 1200,20 1440,90 C1680,160 1920,20 2160,90 C2400,160 2640,20 2880,90 L2880,180 L0,180 Z"
//         fill="url(#waveBlue)"
//         opacity="0.9"
//       />
//     </svg>

//     {/* Layer 2 — Green gradient wave, moves right (opposite), larger amplitude */}
//     <svg
//       id="wave2"
//       className="absolute bottom-0 left-0 w-[200%] will-change-transform"
//       style={{ height: 200 }}
//       viewBox="0 0 2880 200"
//       preserveAspectRatio="none"
//     >
//       <defs>
//         <linearGradient id="waveGreen" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
//           <stop offset="0%" stopColor="#16a34a" stopOpacity="0.6" />
//           <stop offset="35%" stopColor="#22c55e" stopOpacity="0.5" />
//           <stop offset="65%" stopColor="#4ade80" stopOpacity="0.4" />
//           <stop offset="100%" stopColor="#16a34a" stopOpacity="0.6" />
//         </linearGradient>
//       </defs>
//       <path
//         d="M0,110 C360,30 720,180 1080,110 C1440,40 1800,180 2160,110 C2520,40 2880,180 2880,110 L2880,200 L0,200 Z"
//         fill="url(#waveGreen)"
//         opacity="0.5"
//       />
//     </svg>

//     {/* Layer 3 — Thin glowing green stroke line */}
//     <svg
//       id="wave3"
//       className="absolute bottom-0 left-0 w-[200%] will-change-transform"
//       style={{ height: 160 }}
//       viewBox="0 0 2880 160"
//       preserveAspectRatio="none"
//     >
//       <defs>
//         <filter id="glow">
//           <feGaussianBlur stdDeviation="3" result="coloredBlur" />
//           <feMerge>
//             <feMergeNode in="coloredBlur" />
//             <feMergeNode in="SourceGraphic" />
//           </feMerge>
//         </filter>
//       </defs>
//       <path
//         id="glowLine"
//         d="M0,80 C480,20 960,140 1440,80 C1920,20 2400,140 2880,80"
//         fill="none"
//         stroke="#4ade80"
//         strokeWidth="2.5"
//         strokeLinecap="round"
//         filter="url(#glow)"
//         opacity="0.85"
//         strokeDasharray="12 6"
//       />
//     </svg>
//   </div>
// )

// /* ──────────────────────────────────────────────────────────────
//    Floating decorative particles
// ────────────────────────────────────────────────────────────── */
// const PARTICLES = [
//   { id: 'p1', x: '8%', y: '30%', size: 3, delay: 0 },
//   { id: 'p2', x: '14%', y: '65%', size: 2, delay: 1.2 },
//   { id: 'p3', x: '22%', y: '45%', size: 4, delay: 2.4 },
//   { id: 'p4', x: '75%', y: '25%', size: 3, delay: 0.8 },
//   { id: 'p5', x: '82%', y: '70%', size: 2, delay: 1.8 },
//   { id: 'p6', x: '90%', y: '50%', size: 3, delay: 3.0 },
//   { id: 'p7', x: '48%', y: '80%', size: 2, delay: 2.0 },
//   { id: 'p8', x: '60%', y: '35%', size: 3, delay: 1.5 },
// ]

// const FloatingParticles = () => (
//   <>
//     {PARTICLES.map((p) => (
//       <div
//         key={p.id}
//         className="particle absolute rounded-full bg-green-400/15 pointer-events-none"
//         style={{
//           left: p.x, top: p.y,
//           width: p.size * 2, height: p.size * 2,
//           animationDelay: `${p.delay}s`,
//         }}
//       />
//     ))}
//   </>
// )

// /* ──────────────────────────────────────────────────────────────
//    Main Footer
// ────────────────────────────────────────────────────────────── */
// function Footer() {
//   const footerRef = useRef(null)
//   const wave1Ref = useRef(null)
//   const wave2Ref = useRef(null)
//   const wave3Ref = useRef(null)
//   const col1Ref = useRef(null)
//   const col2Ref = useRef(null)
//   const col3Ref = useRef(null)
//   const col4Ref = useRef(null)
//   const socialsRef = useRef(null)
//   const newsletterRef = useRef(null)
//   const glowLineRef = useRef(null)

//   useEffect(() => {
//     const ctx = gsap.context(() => {

//       /* ── Continuous wave horizontal scrolls ── */
//       const w1 = document.getElementById('wave1')
//       const w2 = document.getElementById('wave2')
//       const w3 = document.getElementById('wave3')

//       if (w1) {
//         gsap.to(w1, {
//           x: '-50%',
//           duration: 20,
//           ease: 'none',
//           repeat: -1,
//         })
//       }
//       if (w2) {
//         gsap.fromTo(w2,
//           { x: '-50%' },
//           { x: '0%', duration: 26, ease: 'none', repeat: -1 }
//         )
//       }
//       if (w3) {
//         gsap.to(w3, {
//           x: '-50%',
//           duration: 14,
//           ease: 'none',
//           repeat: -1,
//         })
//       }

//       /* ── Dashed line draw animation ── */
//       const glowLine = document.getElementById('glowLine')
//       if (glowLine) {
//         const length = 3000
//         gsap.set(glowLine, { strokeDasharray: length, strokeDashoffset: length })
//         gsap.to(glowLine, {
//           strokeDashoffset: 0,
//           duration: 3,
//           ease: 'power1.inOut',
//           repeat: -1,
//           yoyo: true,
//         })
//       }

//       /* ── Floating particles ── */
//       gsap.utils.toArray('.particle').forEach((p, i) => {
//         gsap.to(p, {
//           y: `-=${10 + i * 3}`,
//           x: `+=${5 + i * 2}`,
//           duration: 3 + i * 0.5,
//           ease: 'sine.inOut',
//           repeat: -1,
//           yoyo: true,
//           delay: i * 0.3,
//         })
//       })

//       /* ── Logo glow pulse ── */
//       gsap.to('.logo-glow', {
//         opacity: 0.6,
//         scale: 1.1,
//         duration: 2.5,
//         ease: 'sine.inOut',
//         repeat: -1,
//         yoyo: true,
//       })

//       /* ── Solar icon float ── */
//       gsap.to('.solar-float', {
//         y: -12,
//         rotation: 5,
//         duration: 3,
//         ease: 'sine.inOut',
//         repeat: -1,
//         yoyo: true,
//       })

//       /* ── Dotted grid drift ── */
//       gsap.to('.dot-grid', {
//         backgroundPosition: '20px 20px',
//         duration: 8,
//         ease: 'none',
//         repeat: -1,
//       })

//       /* ── ScrollTrigger: footer entrance ── */
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: footerRef.current,
//           start: 'top 90%',
//           once: true,
//         },
//       })

//       /* waves slide up */
//       tl.from('#wave1, #wave2, #wave3', {
//         y: 60,
//         opacity: 0,
//         duration: 1,
//         stagger: 0.15,
//         ease: 'power3.out',
//       })

//       /* columns stagger */
//       tl.from(
//         [col1Ref.current, col2Ref.current, col3Ref.current, col4Ref.current],
//         { y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
//         '-=0.5'
//       )

//       /* social icons bounce */
//       tl.from('.social-icon-btn', {
//         scale: 0,
//         opacity: 0,
//         duration: 0.5,
//         stagger: 0.07,
//         ease: 'back.out(1.7)',
//       }, '-=0.4')

//       /* newsletter fade */
//       tl.from(newsletterRef.current, {
//         y: 20,
//         opacity: 0,
//         duration: 0.7,
//         ease: 'power2.out',
//       }, '-=0.2')

//     }, footerRef)

//     return () => ctx.revert()
//   }, [])

//   return (
//     <footer
//       ref={footerRef}
//       className="relative overflow-hidden"
//       style={{ background: 'linear-gradient(180deg, #071A2D 0%, #0A223A 50%, #0D2B42 100%)' }}
//     >
//       {/* ── Wave section ───────────────────────────────────────── */}
//       <WaveLayers />

//       {/* ── Background decorative elements ─────────────────────── */}

//       {/* Dotted grids */}
//       <div
//         className="dot-grid absolute bottom-0 left-0 w-64 h-64 pointer-events-none opacity-10"
//         style={{
//           backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)',
//           backgroundSize: '18px 18px',
//         }}
//       />
//       <div
//         className="dot-grid absolute bottom-0 right-0 w-64 h-64 pointer-events-none opacity-10"
//         style={{
//           backgroundImage: 'radial-gradient(circle, #4ade80 1px, transparent 1px)',
//           backgroundSize: '18px 18px',
//         }}
//       />

//       {/* Floating particles */}
//       <FloatingParticles />

//       {/* Radial glow behind logo area */}
//       <div
//         className="logo-glow absolute pointer-events-none"
//         style={{
//           top: '18%', left: '2%',
//           width: 280, height: 280,
//           background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)',
//           filter: 'blur(30px)',
//         }}
//       />

//       {/* Floating solar panel icon */}
//       <div
//         className="solar-float absolute pointer-events-none opacity-10"
//         style={{ top: '28%', right: '3%' }}
//       >
//         <Zap size={48} className="text-green-400" strokeWidth={1} />
//       </div>

//       {/* ── Main content ────────────────────────────────────────── */}
//       <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-[240px] pb-14 lg:pt-[260px]">
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-14">

//           {/* ── Col 1 · Brand ─── */}
//           <div ref={col1Ref} className="flex flex-col gap-6">
//             {/* Logo with glow */}
//             <div className="relative w-fit">
//               <div
//                 className="absolute inset-0 blur-2xl pointer-events-none"
//                 style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%)', transform: 'scale(1.4)' }}
//               />
//               <img
//                 src={mainLogo}
//                 alt="Aussie Smart Energy"
//                 className="relative h-16 w-auto object-contain"
//               />
//             </div>

//             <p className="text-slate-400 text-sm leading-relaxed max-w-[260px]">
//               Delivering reliable, high-quality solar solutions across Australia.
//               Powering homes and businesses with clean, sustainable energy.
//             </p>

//             {/* Social icons */}
//             <div ref={socialsRef} className="flex items-center gap-3 mt-1">
//               <SocialBtn Icon={FaFacebookF} label="Facebook" color="#1877f2" />
//               <SocialBtn Icon={FaLinkedinIn} label="LinkedIn" color="#0a66c2" />
//               <SocialBtn Icon={FaYoutube} label="YouTube" color="#ff0000" />
//               <SocialBtn Icon={FaXTwitter} label="X" color="#e7e9ea" />
//             </div>
//           </div>

//           {/* ── Col 2 · Quick Links ─── */}
//           <div ref={col2Ref} className="flex flex-col">
//             <ColHeading Icon={ChevronRight}>Quick Links</ColHeading>
//             <ul className="space-y-1.5">
//               {['Solar Guide', 'About Us', 'Residential Solar', 'Commercial Solar', 'Blog', 'FAQ'].map(l => (
//                 <FooterLink key={l}>{l}</FooterLink>
//               ))}
//             </ul>
//           </div>

//           {/* ── Col 3 · Resources ─── */}
//           <div ref={col3Ref} className="flex flex-col">
//             <ColHeading Icon={ArrowRight}>Resources</ColHeading>
//             <ul className="space-y-1.5">
//               {['Rebates & Incentives', 'Financing Options', 'Solar Calculator', 'Installation Guide', 'Warranty Info'].map(l => (
//                 <FooterLink key={l}>{l}</FooterLink>
//               ))}
//             </ul>
//           </div>

//           {/* ── Col 4 · Contact + Newsletter ─── */}
//           <div ref={col4Ref} className="flex flex-col gap-5">
//             <ColHeading Icon={Phone}>Contact Us</ColHeading>
//             <ul className="space-y-3 mb-1">
//               <ContactRow Icon={Phone}>0468 331 724</ContactRow>
//               <ContactRow Icon={Mail}>info@aussiesmartenergy.com.au</ContactRow>
//               <ContactRow Icon={MapPin}>Sydney, NSW &amp; Australia</ContactRow>
//             </ul>

//             {/* Divider */}
//             <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

//             {/* Newsletter */}
//             <div ref={newsletterRef} className="flex flex-col gap-3">
//               <ColHeading Icon={Send}>Stay Updated</ColHeading>
//               <p className="text-slate-500 text-sm -mt-4 mb-1">
//                 Sign up for tips, updates and solar offers.
//               </p>

//               <form
//                 onSubmit={e => e.preventDefault()}
//                 className="newsletter-form relative flex items-stretch gap-0 rounded-[18px] overflow-hidden border border-white/10 focus-within:border-green-400/60 transition-all duration-400"
//                 style={{
//                   background: 'rgba(255,255,255,0.04)',
//                   backdropFilter: 'blur(12px)',
//                   boxShadow: '0 0 0 0 transparent',
//                 }}
//               >
//                 {/* focus glow handled by CSS */}
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   required
//                   className="flex-1 min-w-0 bg-transparent text-white text-sm px-4 py-3.5 outline-none placeholder:text-slate-600"
//                 />
//                 <button
//                   type="submit"
//                   className="newsletter-btn flex-shrink-0 flex items-center justify-center gap-1.5 px-4 text-white text-sm font-semibold transition-all duration-300 group"
//                   style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
//                 >
//                   <Send size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* ── Bottom bar ──────────────────────────────────────── */}
//         <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <div className="flex items-center gap-2.5 text-slate-500 text-sm">
//             <ShieldCheck size={15} className="text-green-500/70 flex-shrink-0" />
//             <span>© 2024 Aussie Smart Energy | All Rights Reserved</span>
//           </div>
//           <div className="flex items-center gap-5 text-slate-500 text-sm">
//             {['Privacy Policy', 'Terms of Use'].map((item, i) => (
//               <span key={item} className="flex items-center gap-5">
//                 {i > 0 && <span className="text-white/10">|</span>}
//                 <a
//                   href="#"
//                   className="relative group text-slate-500 hover:text-green-400 transition-colors duration-300"
//                 >
//                   {item}
//                   <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-green-400 group-hover:w-full transition-all duration-400" />
//                 </a>
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── Global inline styles for animations that Tailwind can't handle ── */}
//       <style>{`
//         @keyframes particleDrift {
//           0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; }
//           50%       { transform: translateY(-14px) translateX(6px) scale(1.3); opacity: 0.25; }
//         }
//         .particle {
//           animation: particleDrift 4s ease-in-out infinite;
//         }

//         .newsletter-form:focus-within {
//           box-shadow: 0 0 0 2px rgba(34,197,94,0.35), 0 0 24px rgba(34,197,94,0.15);
//         }

//         .newsletter-btn:hover {
//           background: linear-gradient(135deg, #16a34a, #15803d) !important;
//           box-shadow: 0 4px 20px rgba(34,197,94,0.4);
//         }

//         .footer-link:hover .link-icon {
//           transform: rotate(90deg);
//         }
//       `}</style>
//     </footer>
//   )
// }

// export default Footer

import React, { useState } from 'react';
import './Footer.css';
import mainLogo from '../assets/Mainlogo.png';
import bannerLogo from '../assets/banner-logo-1024x365.png';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed successfully with email: ${email}`);
    setEmail('');
  };

  return (
    <footer className="site-footer">

      {/* Parallax Waves Divider */}
      <div className="footer-waves-container">
        <svg className="waves-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
          <defs>
            {/* Wave Gradient 1 (deep blue -> teal) */}
            <linearGradient id="wave-grad-blue1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#01213f" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#0066cc" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00a6ff" stopOpacity="0.7" />
            </linearGradient>

            {/* Wave Gradient 2 (mid blue) */}
            <linearGradient id="wave-grad-blue2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#013055" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0077e6" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#023a6b" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Wave 1: Background Gradient Wave (moving) */}
          <path d="M 0,70 Q 360,30 720,80 T 1440,70 Q 1800,30 2160,80 T 2880,70 L 2880,165 L 0,165 Z" fill="url(#wave-grad-blue1)">
            <animateTransform attributeName="transform" type="translate" from="-1440, 0" to="0, 0" dur="22s" repeatCount="indefinite" />
          </path>

          {/* Wave 2: Middle translucent blue wave */}
          <path d="M 0,80 Q 360,110 720,60 T 1440,80 Q 1800,110 2160,60 T 2880,80 L 2880,165 L 0,165 Z" fill="url(#wave-grad-blue2)" opacity="0.85">
            <animateTransform attributeName="transform" type="translate" from="0, 0" to="-1440, 0" dur="18s" repeatCount="indefinite" />
          </path>

          {/* Wave 3: Foreground dark navy blend */}
          <path d="M 0,90 Q 360,130 720,80 T 1440,90 Q 1800,130 2160,80 T 2880,90 L 2880,165 L 0,165 Z" fill="#03142a" opacity="0.95">
            <animateTransform attributeName="transform" type="translate" from="0, 0" to="-1440, 0" dur="13s" repeatCount="indefinite" />
          </path>

          {/* Thin blue stroke lines */}
          <path d="M 0,60 Q 360,20 720,70 T 1440,60 Q 1800,20 2160,70 T 2880,60" fill="none" stroke="#0077e6" strokeWidth="2" opacity="0.6">
            <animateTransform attributeName="transform" type="translate" from="0, 0" to="-1440, 0" dur="20s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      {/* Side Dot Matrices */}
      <div className="dot-pattern dot-pattern-left"></div>
      <div className="dot-pattern dot-pattern-right"></div>

      {/* Footer Content Container */}
      <div className="footer-container">

        <div className="footer-grid">
          {/* Column 1: Logo & Brand Pitch */}
          <div className="footer-col brand-section">
            <div className="logo-container">
              <div className="logo-glow"></div>
              <img src={mainLogo} alt="Aussie Smart Energy" className="footer-main-logo" />
            </div>
            <p className="brand-description">Delivering reliable, high quality solar solutions across Australia. Powering homes and businesses with clean, sustainable energy.</p>

            {/* Social Icons (Facebook, LinkedIn, YouTube, X) */}
            <div className="social-links">
              <a href="#" className="social-icon facebook" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="#" className="social-icon linkedin" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 1-2-2 2 2 0 0 1 2 2z" /></svg>
              </a>
              <a href="#" className="social-icon youtube" aria-label="YouTube">
                <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M9.75 15.02V8.48L15.5 11.75z" /></svg>
              </a>
              <a href="#" className="social-icon x-twitter" aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Phone & Email (matches provided design) */}
          <div className="footer-col">
            <h3>
              <svg className="header-icon" viewBox="0 0 24 24" fill="none" stroke="#0055ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v6" />
              </svg>
              Phone
            </h3>
            <div className="contact-info" style={{ marginBottom: 6 }}>
              <a href="tel:0468331724" className="contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                0468 331 724
              </a>
            </div>

            <h3 style={{ marginTop: 6 }}>
              <svg className="header-icon" viewBox="0 0 24 24" fill="none" stroke="#0055ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16v12H4z" />
              </svg>
              Email
            </h3>
            <div className="contact-info">
              <a href="mailto:info@aussiesmartenergy.com.au" className="contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                info@aussiesmartenergy.com.au
              </a>
            </div>
          </div>

          {/* Column 3: Resources */}
          <div className="footer-col">
            <h3>
              {/* Book Outline Icon */}
              <svg className="header-icon" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              Resources
            </h3>
            <ul className="links-list">
              <li>
                <a href="#">
                  Rebates & Incentives
                  <svg className="link-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
              </li>
              <li>
                <a href="#">
                  Financing Options
                  <svg className="link-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
              </li>
              <li>
                <a href="#">
                  Solar Calculator
                  <svg className="link-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
              </li>
              <li>
                <a href="#">
                  Installation Guide
                  <svg className="link-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
              </li>
              <li>
                <a href="#">
                  Warranty Info
                  <svg className="link-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="footer-col solar-logo-col">

            {/* Green Solar Panel Outline Icon centered at top */}
            <svg className="solar-icon-large" width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="#78d85c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 38 L22 18 L42 18 L54 38 Z" fill="rgba(120, 216, 92, 0.05)" />
              <line x1="26" y1="18" x2="18" y2="38" strokeWidth="1.5" />
              <line x1="38" y1="18" x2="46" y2="38" strokeWidth="1.5" />
              <line x1="16" y1="28" x2="48" y2="28" strokeWidth="1.5" />
              <path d="M32 38 L32 48 M24 48 L40 48" />
              {/* Leaves popping out behind */}
              <path d="M22 18 C 16 11, 23 4, 30 11 C 25 15, 23 18, 22 18 Z" fill="rgba(120, 216, 92, 0.2)" strokeWidth="1.5" />
              <path d="M42 18 C 48 11, 41 4, 34 11 C 39 15, 41 18, 42 18 Z" fill="rgba(120, 216, 92, 0.2)" strokeWidth="1.5" />
            </svg>

            <h3>
              {/* Telephone Outline Icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="#78d85c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Contact Us
            </h3>

            <div className="contact-info">
              <a href="tel:0468331724" className="contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                0468 331 724
              </a>
              <a href="mailto:info@aussiesmartenergy.com.au" className="contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                info@aussiesmartenergy.com.au
              </a>
              <div className="contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Sydney, NSW & Australia
              </div>
            </div>

            <hr className="col-divider" />

            {/* Stay Updated Section */}
            <div className="newsletter-section" style={{ width: '100%' }}>
              <h4>
                {/* Paper Plane Outline Icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="#78d85c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                Stay Updated
              </h4>
              <p className="newsletter-desc">Sign up for tips, updates and special offers on solar.</p>
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="email-input"
                  placeholder="Enter your email"
                  required
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="submit-btn red" aria-label="Subscribe">
                  {/* Arrow Right Icon */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
              {/* Badges area (placeholder images) */}
              <div className="footer-banner" aria-hidden="true">
                <img src={bannerLogo} alt="partner banner" />
              </div>
            </div>

          </div>

        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <div className="copyright-text">
            {/* Shield Icon with Check */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 11 11 13 15 9" />
            </svg>
            © 2024 Aussie Smart Energy | All Rights Reserved
          </div>
          <div className="bottom-links">
            <a href="#">Privacy Policy</a>
            <span className="bottom-divider">|</span>
            <a href="#">Terms of Use</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

