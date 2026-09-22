import { motion } from 'framer-motion';

const ApprovedSellerBadge = ({ className = "w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36" }) => (
  <svg
    viewBox="0 0 200 200"
    className={`${className} drop-shadow-md select-none`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer dark navy ring */}
    <circle cx="100" cy="100" r="95" fill="#0c2340" stroke="#0c2340" strokeWidth="2" />
    
    {/* Thin white gap ring */}
    <circle cx="100" cy="100" r="90" fill="#ffffff" />
    
    {/* Cyan / Blue main circle */}
    <circle cx="100" cy="100" r="84" fill="#00a8ea" />

    {/* Top Curved text: NEW ENERGY TECH */}
    <defs>
      {/* Path for text to wrap along the top circle arc */}
      <path
        id="badgeArcTop"
        d="M 45 92 A 62 62 0 0 1 155 92"
        fill="none"
      />
    </defs>
    <text
      fontSize="10"
      fontWeight="800"
      fill="#0c2340"
      letterSpacing="1.2"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    >
      <textPath href="#badgeArcTop" startOffset="50%" textAnchor="middle">
        NEW ENERGY TECH
      </textPath>
    </text>

    {/* Center Checkmark Circle */}
    <circle cx="100" cy="88" r="19" fill="#ffffff" stroke="#0c2340" strokeWidth="2.5" />
    <path
      d="M93 88 L98 93 L108 81"
      stroke="#0c2340"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* "Approved Seller" Text */}
    <text
      x="100"
      y="132"
      textAnchor="middle"
      fill="#0c2340"
      fontSize="19"
      fontWeight="900"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      letterSpacing="-0.3"
    >
      Approved
    </text>
    <text
      x="100"
      y="155"
      textAnchor="middle"
      fill="#0c2340"
      fontSize="19"
      fontWeight="900"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      letterSpacing="-0.3"
    >
      Seller
    </text>
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    className="w-5 h-5 sm:w-5 sm:h-5 text-[#00a8ea] flex-shrink-0 mt-0.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="8.5 12 11 14.5 15.5 9.5" />
  </svg>
);

const ApprovedSellerBanner = () => {
  const points = [
    'Designed by Peak industry and consumer bodies.',
    'Authorised by the ACCC.',
    'Standard for the complete customer journey.'
  ];

  return (
    <section className="relative w-full bg-[#f0f7fd] border-y border-[#d8eaf8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-7">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col md:flex-row items-center gap-5 sm:gap-7 lg:gap-10"
        >
          {/* Badge Icon on Left */}
          <div className="flex-shrink-0">
            <ApprovedSellerBadge />
          </div>

          {/* Text Content on Right */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0a385c] tracking-tight leading-tight">
              Proud to be a New Energy Tech Approved Seller
            </h2>
            <p className="text-sm sm:text-base font-semibold text-[#2572a7] mt-1 mb-4">
              Committed to Consumer Protection Standards
            </p>

            {/* 3 Checkpoints Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 pt-1">
              {points.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start justify-center md:justify-start gap-2.5"
                >
                  <CheckCircleIcon />
                  <span className="text-xs sm:text-[13.5px] font-medium text-[#1a3854] leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApprovedSellerBanner;
