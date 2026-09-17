import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Quote,
  Check,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Loader2,
  PenLine,
  MapPin,
} from 'lucide-react';
import api from '../utils/api';
import johnDoeImg from '../assets/johndoe.jpg';
import lindaGeorgeImg from '../assets/linda george.jpg';
import marindaWilsonImg from '../assets/marinda wilson.jpg';

const AUSSIE_GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Aussie+Smart+Energy/@-22.6821199,150.7337371,4411103m/data=!3m1!1e3!4m8!3m7!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8?entry=ttu&g_ep=EgoyMDI2MDkxNC4wIKXMDSoASAFQAw%3D%3D';

const DEFAULT_WRITE_REVIEW_URL =
  'https://www.google.com/maps/place/Aussie+Smart+Energy/@-22.6821199,150.7337371,4411103m/data=!3m1!1e3!4m8!3m7!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8?entry=ttu&g_ep=EgoyMDI2MDkxNC4wIKXMDSoASAFQAw%3D%3D';

const defaultFallbackData = {
  businessName: 'Aussie Smart Energy',
  rating: 4.9,
  totalReviews: 47,
  placeUrl: AUSSIE_GOOGLE_MAPS_URL,
  writeReviewUrl: DEFAULT_WRITE_REVIEW_URL,
  reviews: [
    {
      authorName: 'John Doe',
      roleOrLocation: 'Homeowner, Sydney NSW',
      authorPhoto: johnDoeImg,
      authorUrl: AUSSIE_GOOGLE_MAPS_URL,
      rating: 5,
      text: 'Great to deal with from start to finish. Sales team and the installers were excellent. There was no dents on my color bond roof after the installation. Very Happy customer here. Would highly recommend Aussie Smart Energy to everyone.',
      publishedAt: new Date().toISOString(),
      relativeTime: '1 month ago',
      platform: 'google',
      isVerified: true,
    },
    {
      authorName: 'Linda George',
      roleOrLocation: 'Business Owner, Melbourne VIC',
      authorPhoto: lindaGeorgeImg,
      authorUrl: AUSSIE_GOOGLE_MAPS_URL,
      rating: 5,
      text: 'Very happy with the service provided by the whole team, Adam and John, patiently guided us to the right product, following up on time, tried their best to fulfill our needs, the installers are kind and professional as well, patiently answered our questions, help me set up the app while I had to hold my baby in arm, kids friendly and dog friendly also😊. Love the team!',
      publishedAt: new Date().toISOString(),
      relativeTime: '2 months ago',
      platform: 'google',
      isVerified: true,
    },
    {
      authorName: 'Marinda Wilson',
      roleOrLocation: 'Resident, Brisbane QLD',
      authorPhoto: marindaWilsonImg,
      authorUrl: AUSSIE_GOOGLE_MAPS_URL,
      rating: 5,
      text: 'Exceptional service from start to finish! Aussie Smart Energy has been fantastic, responding to all my queries promptly and professionally every step of the way. They went above and beyond by offering discounts wherever possible, which I truly appreciated. The installation process was seamless—quick, efficient, and handled with great expertise.',
      publishedAt: new Date().toISOString(),
      relativeTime: '3 months ago',
      platform: 'google',
      isVerified: true,
    },
  ],
};

const GoogleIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

const getAuthorImage = (review) => {
  if (review.authorPhoto && review.authorPhoto.trim() !== '') {
    return review.authorPhoto;
  }
  if (review.authorImage && review.authorImage.trim() !== '') {
    return review.authorImage;
  }
  const name = (review.authorName || '').toLowerCase();
  if (name.includes('john')) return johnDoeImg;
  if (name.includes('linda')) return lindaGeorgeImg;
  if (name.includes('marinda')) return marindaWilsonImg;
  return null;
};

const GoogleReviews = () => {
  const [data, setData] = useState(defaultFallbackData);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchGoogleReviews = async () => {
      try {
        setLoading(true);
        const res = await api.get('/google-reviews');
        if (isMounted && res.data) {
          const apiData = res.data;
          const reviewsList =
            Array.isArray(apiData.reviews) && apiData.reviews.length > 0
              ? apiData.reviews
              : defaultFallbackData.reviews;

          setData({
            businessName: apiData.businessName || defaultFallbackData.businessName,
            rating:
              typeof apiData.rating === 'number' && apiData.rating > 0
                ? apiData.rating
                : defaultFallbackData.rating,
            totalReviews:
              typeof apiData.totalReviews === 'number' && apiData.totalReviews > 0
                ? apiData.totalReviews
                : defaultFallbackData.totalReviews,
            placeUrl: apiData.placeUrl || defaultFallbackData.placeUrl,
            writeReviewUrl: apiData.writeReviewUrl || defaultFallbackData.writeReviewUrl,
            reviews: reviewsList,
          });
        }
      } catch (err) {
        console.warn('Could not fetch live Google Reviews, using verified fallback reviews.', err);
        if (isMounted) {
          setData(defaultFallbackData);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGoogleReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const reviews = data.reviews || [];

  useEffect(() => {
    if (!autoPlay || reviews.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoPlay, reviews.length]);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const activeReview = reviews[currentIndex] || reviews[0];
  const activeImage = activeReview ? getAuthorImage(activeReview) : null;
  const targetLink =
    activeReview?.authorUrl ||
    activeReview?.reviewLink ||
    data.placeUrl ||
    AUSSIE_GOOGLE_MAPS_URL;

  const isGooglePlatform = !activeReview?.platform || activeReview?.platform === 'google';

  return (
    <div
      className="space-y-6"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* ── Top Header with Google Business Rating Summary ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/60 shadow-xs mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#39b54a]" />
            <span className="text-[#39b54a] text-xs font-extrabold tracking-widest uppercase">
              WHAT OUR CUSTOMERS SAY
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1e2d53] leading-tight">
            Real Stories. Real Savings.
          </h2>
        </div>

        {/* Action Badges: Live Google Rating + Write a Review */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          {/* Google Rating Summary Link */}
          <a
            href={data.placeUrl || AUSSIE_GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Click to view our Google Business profile and reviews"
            className="group inline-flex items-center gap-3 bg-white/95 hover:bg-white backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/80 hover:border-[#39b54a]/40 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-50 group-hover:bg-[#39b54a]/10 flex items-center justify-center border border-slate-200 group-hover:border-[#39b54a]/30 shadow-xs transition-colors">
              <GoogleIcon />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-extrabold text-[#1e2d53]">
                  {data.rating.toFixed(1)} / 5.0
                </span>
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={`${
                        i < Math.round(data.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
                <span>{data.totalReviews} Google Reviews</span>
                <ExternalLink size={10} className="text-slate-400 group-hover:text-[#39b54a] transition-colors" />
              </p>
            </div>
          </a>

          {/* Write a Review Button */}
          <a
            href={data.writeReviewUrl || data.placeUrl || AUSSIE_GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white/90 hover:bg-[#39b54a] text-[#1e2d53] hover:text-white border border-white/80 hover:border-[#39b54a] text-xs font-bold shadow-md hover:shadow-lg transition-all duration-300"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Write a Review</span>
          </a>
        </div>
      </div>

      {/* ── Active Review Card / Loading State ── */}
      {loading && reviews.length === 0 ? (
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/80 shadow-xl p-10 flex flex-col items-center justify-center min-h-[260px] text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-[#4285F4] mb-3" />
          <p className="text-sm font-semibold">Loading Google Reviews...</p>
        </div>
      ) : activeReview ? (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/80 shadow-xl p-6 sm:p-8 space-y-5 relative overflow-hidden"
        >
          {/* Header Inside Card */}
          <div className="flex items-center justify-between">
            <div className="text-[#39b54a]">
              <Quote size={36} className="fill-current opacity-20" />
            </div>

            {/* Platform Badge */}
            <div
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 border shadow-xs ${
                isGooglePlatform
                  ? 'bg-blue-50/90 text-[#4285F4] border-blue-100'
                  : 'bg-emerald-50 text-[#39b54a] border-emerald-100'
              }`}
            >
              {isGooglePlatform ? (
                <>
                  <GoogleIcon />
                  <span>Google Review</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#39b54a]" />
                  <span className="capitalize">{activeReview.platform || 'Customer Review'}</span>
                </>
              )}
            </div>
          </div>

          {/* Review Text Quote */}
          <blockquote className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed italic">
            "{activeReview.text || activeReview.reviewText}"
          </blockquote>

          {/* Author Details & Rating */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-center space-x-3.5">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={activeReview.authorName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#39b54a] shadow-xs"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
              ) : null}

              <div
                className={`w-12 h-12 rounded-full bg-[#39b54a]/15 text-[#39b54a] font-extrabold items-center justify-center text-base border-2 border-[#39b54a] ${
                  activeImage ? 'hidden' : 'flex'
                }`}
              >
                {activeReview.authorName?.charAt(0)?.toUpperCase() || 'U'}
              </div>

              <div>
                <div className="font-extrabold text-[#1e2d53] text-sm sm:text-base">
                  {activeReview.authorName}
                </div>
                <div className="flex items-center space-x-1 text-[11px] text-[#39b54a] font-bold mt-0.5">
                  <Check size={11} className="stroke-[3]" />
                  <span>
                    {activeReview.roleOrLocation || 'Verified Customer'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={`${
                      i < (activeReview.rating || 5)
                        ? 'text-yellow-400 fill-current'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                {activeReview.relativeTime || activeReview.reviewDate || 'Recently'}
              </span>
            </div>
          </div>

          {/* Direct Link to Google Review */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <a
              href={targetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e2d53] hover:text-[#39b54a] transition-colors py-1 group"
            >
              <span>
                View Original Review on {isGooglePlatform ? 'Google Maps' : 'Platform'}
              </span>
              <ExternalLink size={13} className="text-[#39b54a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={data.placeUrl || AUSSIE_GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-slate-600 transition-colors"
            >
              <MapPin size={12} className="text-slate-400" />
              <span>Aussie Smart Energy Profile</span>
            </a>
          </div>

          {/* Carousel Navigation Buttons & Indicators */}
          {reviews.length > 1 && (
            <div className="flex justify-center items-center gap-4 pt-4 border-t border-slate-100">
              <button
                onClick={prevReview}
                aria-label="Previous review"
                className="w-9 h-9 bg-slate-100 hover:bg-[#39b54a]/15 hover:text-[#39b54a] rounded-full flex items-center justify-center transition-colors shadow-xs"
              >
                <ArrowLeft className="w-4 h-4 text-slate-700" />
              </button>

              <div className="flex space-x-2 items-center">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setAutoPlay(false);
                      setTimeout(() => setAutoPlay(true), 10000);
                    }}
                    aria-label={`Slide ${index + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? 'bg-[#39b54a] w-5 h-2'
                        : 'bg-slate-300 hover:bg-slate-400 w-2 h-2'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextReview}
                aria-label="Next review"
                className="w-9 h-9 bg-slate-100 hover:bg-[#39b54a]/15 hover:text-[#39b54a] rounded-full flex items-center justify-center transition-colors shadow-xs"
              >
                <ArrowRight className="w-4 h-4 text-slate-700" />
              </button>
            </div>
          )}
        </motion.div>
      ) : null}
    </div>
  );
};

export default GoogleReviews;
