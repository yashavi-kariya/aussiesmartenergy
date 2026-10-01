import React from 'react';

export const VisaLogo = ({ className = "h-5 w-auto" }) => (
  <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="32" rx="4" fill="#0A2540" />
    <path
      d="M19.4 21.5H16.8L18.4 11.5H21L19.4 21.5ZM29.8 11.7C29.3 11.5 28.5 11.3 27.5 11.3C24.9 11.3 23.1 12.6 23.1 14.4C23.1 15.8 24.4 16.6 25.4 17.1C26.4 17.6 26.7 17.9 26.7 18.3C26.7 18.9 26 19.2 25.2 19.2C24.1 19.2 23.4 18.9 22.8 18.6L22.2 21.3C23 21.7 24.3 21.9 25.6 21.9C28.4 21.9 30.2 20.6 30.2 18.6C30.2 16.5 27.2 16.2 27.2 14.9C27.2 14.4 27.7 13.9 28.7 13.9C29.4 13.9 30.2 14.1 30.7 14.3L29.8 11.7ZM37.2 11.5H35.2C34.6 11.5 34.1 11.7 33.9 12.3L29 21.5H32.2L32.8 19.8H36.7L37.1 21.5H39.9L37.2 11.5ZM33.6 17.4L35.2 13.2L36.1 17.4H33.6ZM14.9 11.5L12.4 18.3L12.1 16.9C11.6 15.3 10.1 13.5 8.4 12.7L10.7 21.5H13.9L18.1 11.5H14.9Z"
      fill="#FFFFFF"
    />
    <path
      d="M10.2 11.5H6.1L6 11.7C9.3 12.5 11.5 14.5 12.4 16.9L11.3 11.9C11.1 11.6 10.7 11.5 10.2 11.5Z"
      fill="#F7B600"
    />
  </svg>
);

export const MastercardLogo = ({ className = "h-5 w-auto" }) => (
  <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="32" rx="4" fill="#1A1F71" />
    <circle cx="19" cy="16" r="9" fill="#EB001B" />
    <circle cx="29" cy="16" r="9" fill="#F79E1B" fillOpacity="0.92" />
    <path
      d="M24 9.77A8.96 8.96 0 0 0 20.66 16c0 2.5 1.02 4.77 2.67 6.23a8.96 8.96 0 0 0 3.34-6.23c0-2.5-1.02-4.77-2.67-6.23z"
      fill="#FF5F00"
    />
  </svg>
);

export const AmexLogo = ({ className = "h-5 w-auto" }) => (
  <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="32" rx="4" fill="#006FCF" />
    <path
      d="M7 19.5L9.5 12.5H12.5L15 19.5H13.2L12.6 17.8H9.4L8.8 19.5H7ZM9.9 16.4H12.1L11 13.2L9.9 16.4ZM15.5 19.5V12.5H18.2L19.7 16.7L21.2 12.5H23.9V19.5H22.2V14.6L20.4 19.5H19L17.2 14.6V19.5H15.5ZM24.8 19.5V12.5H30V13.9H26.6V15.2H29.6V16.6H26.6V18.1H30V19.5H24.8ZM31 19.5L33.7 15.9L31.2 12.5H33.3L34.7 14.6L36.1 12.5H38.2L35.7 15.9L38.4 19.5H36.3L34.7 17.2L33.1 19.5H31Z"
      fill="#FFFFFF"
    />
  </svg>
);

export const JcbLogo = ({ className = "h-5 w-auto" }) => (
  <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="32" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
    <rect x="8" y="8" width="10" height="16" rx="3" fill="#00377B" />
    <rect x="19" y="8" width="10" height="16" rx="3" fill="#E60012" />
    <rect x="30" y="8" width="10" height="16" rx="3" fill="#00873C" />
    <text x="13" y="19" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">J</text>
    <text x="24" y="19" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">C</text>
    <text x="35" y="19" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">B</text>
  </svg>
);

export const ApplePayLogo = ({ className = "h-5 w-auto" }) => (
  <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="32" rx="4" fill="#000000" />
    {/* Apple Logo */}
    <path
      d="M17.7 14.8C17.7 13.2 18.9 12.3 19 12.2C18.2 11.1 17 10.9 16.6 10.9C15.5 10.8 14.5 11.5 13.9 11.5C13.3 11.5 12.5 10.9 11.6 10.9C10.4 10.9 9.4 11.5 8.8 12.5C7.6 14.6 8.5 17.7 9.6 19.3C10.2 20.1 10.8 21 11.7 21C12.6 21 12.9 20.4 14 20.4C15 20.4 15.3 21 16.2 21C17.2 21 17.7 20.2 18.3 19.4C19 18.4 19.3 17.5 19.3 17.4C19.3 17.3 17.7 16.7 17.7 14.8Z"
      fill="#FFFFFF"
    />
    <path
      d="M15.8 9.9C16.3 9.3 16.6 8.5 16.5 7.6C15.7 7.6 14.8 8.1 14.3 8.7C13.8 9.2 13.4 10.1 13.5 10.9C14.4 11 15.3 10.4 15.8 9.9Z"
      fill="#FFFFFF"
    />
    {/* PAY text */}
    <text x="29" y="19.5" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif">
      Pay
    </text>
  </svg>
);

export const ANZWorldlineLogo = ({ className = "h-6 w-auto" }) => (
  <svg className={className} viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="36" rx="6" fill="#002B49" />
    <path d="M12 11L18 25H22L28 11H24L20 21.5L16 11H12Z" fill="#0072CE" />
    <text x="32" y="23" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">
      ANZ
    </text>
    <text x="68" y="23" fill="#00A3E0" fontSize="13" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.2">
      Worldline
    </text>
  </svg>
);

export const SupportedPaymentLogos = () => (
  <div className="flex items-center gap-2 flex-wrap">
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-colors" title="Visa">
      <VisaLogo className="h-5 w-8 object-contain" />
      <span className="text-[11px] font-bold text-slate-700">Visa</span>
    </div>
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-colors" title="Mastercard">
      <MastercardLogo className="h-5 w-8 object-contain" />
      <span className="text-[11px] font-bold text-slate-700">Mastercard</span>
    </div>
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-colors" title="American Express">
      <AmexLogo className="h-5 w-8 object-contain" />
      <span className="text-[11px] font-bold text-slate-700">Amex</span>
    </div>
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-colors" title="JCB">
      <JcbLogo className="h-5 w-8 object-contain" />
      <span className="text-[11px] font-bold text-slate-700">JCB</span>
    </div>
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-colors" title="Apple Pay">
      <ApplePayLogo className="h-5 w-8 object-contain" />
      <span className="text-[11px] font-bold text-slate-700">Apple Pay</span>
    </div>
  </div>
);
