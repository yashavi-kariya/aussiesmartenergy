import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Cpu, Wrench, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import solarSystemsData from '../data/solarSystems';

const CommercialSolarPage = ({ systemId }) => {
  const system = solarSystemsData[systemId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [systemId]);

  if (!system) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1e2d53]">System Not Found</h2>
          <p className="text-slate-500 mt-2">The requested solar system page does not exist.</p>
          <Link to="/" className="mt-4 inline-flex items-center text-blue-600 font-bold hover:underline">
            Go back Home
          </Link>
        </div>
      </div>
    );
  }

  const themeMap = {
    'commercial-20kw': { accent: '#7d7fcbff', cardBg: 'linear-gradient(135deg, #1a472a 0%, #0f2e1a 100%)' },
    'commercial-30kw': { accent: '#00fda0ff', cardBg: 'linear-gradient(135deg, #1a3a2a 0%, #0f2416 100%)' },
    'commercial-50kw': { accent: '#ff8c00', cardBg: 'linear-gradient(135deg, #3a2a1a 0%, #261a0f 100%)' },
    'commercial-100kw': { accent: '#b799c9ff', cardBg: 'linear-gradient(135deg, #2a1a3a 0%, #1a0f26 100%)' },
  };

  const theme = themeMap[systemId] || { accent: '#ede785ff', cardBg: 'linear-gradient(135deg, #1e2d53 0%, #15203c 100%)' };

  const icons = [Sun, Cpu, Wrench, ShieldCheck];

  const timelineItems = (system.timelineItems || []).map((item, idx) => ({
    ...item,
    icon: icons[idx] || Sun,
  }));

  return (
    <main className="min-h-screen text-[#1e2d53] pt-[70px]">
      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[360px] md:h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/rooftopsolar.png"
            alt="Commercial Solar Array"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1920&q=80";
            }}
          />
          <div className="absolute inset-0 bg-slate-950/72" />
          <div
            className="absolute bottom-0 left-0 right-0 h-24 opacity-40"
            style={{ background: `linear-gradient(to top, ${theme.accent}, transparent)` }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest mb-1"
            style={{ backgroundColor: `${theme.accent}30`, color: theme.accent, border: `1px solid ${theme.accent}60` }}
          >
            Commercial Solar
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, type: "spring", stiffness: 90 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-lg"
          >
            {system.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl font-semibold text-white/90 drop-shadow"
          >
            {system.subtitle}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto h-1 w-24 rounded-full"
            style={{ backgroundColor: theme.accent }}
          />
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 md:py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-block w-3 h-3 rounded-full mb-4" style={{ backgroundColor: theme.accent }} />
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium max-w-3xl mx-auto">
              The <strong>{system.title}</strong> is {system.description}.
              Aussie Smart Energy offers premium commercial solar solutions with industry-leading efficiency,
              reliability, and support. From design to commissioning, we deliver turnkey installations that maximize your energy savings.
            </p>
          </motion.div>
        </div>
      </section>



      {/* Timeline Section with Cards */}
      <section className="py-16 md:py-24" style={{ background: '#f8fafc' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e2d53]">
              What's <span style={{ color: theme.accent }}>Included</span>
            </h2>
            <div className="mt-3 mx-auto h-1 w-20 rounded-full" style={{ backgroundColor: theme.accent }} />
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
              style={{ backgroundColor: theme.accent, opacity: 0.2 }}
            />

            <div className="space-y-12">
              {timelineItems.map((item, idx) => {
                const Icon = item.icon;
                const isLeft = idx % 2 === 0;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="relative"
                  >
                    {/* Node */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="absolute left-8 md:left-1/2 top-0 w-12 h-12 rounded-full bg-white flex items-center justify-center -translate-x-1/2 z-20 shadow-lg"
                      style={{ border: `3px solid ${theme.accent}` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: theme.accent }} />
                    </motion.div>

                    {/* Card Container */}
                    <div className={`flex flex-col md:flex-row items-start ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                      <div className={`w-full md:w-[45%] ${isLeft ? 'md:text-right md:pr-12' : 'md:pl-12'} pl-16 md:pl-0`}>
                        <motion.div
                          whileHover={{ scale: 1.02, translateY: -5 }}
                          className="relative text-white p-6 sm:p-8 rounded-2xl shadow-lg"
                          style={{ background: theme.cardBg }}
                        >
                          {/* Top accent band */}
                          <div
                            className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl"
                            style={{ backgroundColor: theme.accent }}
                          />

                          {/* Title */}
                          <h3
                            className="text-xl sm:text-2xl font-bold pb-4 mb-4 border-b"
                            style={{ borderColor: `${theme.accent}40` }}
                          >
                            {item.title}
                          </h3>

                          {/* Items */}
                          <ul className="space-y-2.5 text-sm sm:text-base text-slate-100 font-medium">
                            {item.items.map((li, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: isLeft ? 10 : -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 + 0.3, duration: 0.4 }}
                                className="flex items-start gap-3"
                              >
                                <span
                                  className="text-lg leading-none mt-1 flex-shrink-0"
                                  style={{ color: theme.accent }}
                                >
                                  ✓
                                </span>
                                <span>{li}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      </div>

                      {/* Invisible spacer for desktop layout */}
                      <div className="hidden md:block w-[10%]" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>



          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <Link
              to="/contact"
              className="inline-block text-white font-bold px-16 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 uppercase text-sm tracking-widest"
              style={{ backgroundColor: theme.accent }}
            >
              Enquiry Now
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default CommercialSolarPage;
